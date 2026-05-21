import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

const dnsLookup = promisify(dns.lookup);

// Simple memory-based rate limiter (30 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 30;
const WINDOW_MS = 60 * 1000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (record.count >= LIMIT) {
    return false;
  }

  record.count += 1;
  return true;
}

// SSRF Protection: Checks if IP address belongs to loopback, private ranges, or local subnets
function isIpPrivateOrLoopback(ip: string): boolean {
  let cleanIp = ip.trim();
  
  if (cleanIp.startsWith('::ffff:')) {
    cleanIp = cleanIp.slice(7);
  }

  // IPv4 validation
  if (/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/.test(cleanIp)) {
    const parts = cleanIp.split('.').map(Number);
    if (parts.some(isNaN) || parts.length !== 4) return true;

    const [p0, p1, p2, p3] = parts;

    // Loopback: 127.0.0.0/8
    if (p0 === 127) return true;
    
    // RFC 1918 Private networks:
    // 10.0.0.0/8
    if (p0 === 10) return true;
    // 172.16.0.0/12
    if (p0 === 172 && p1 >= 16 && p1 <= 31) return true;
    // 192.168.0.0/16
    if (p0 === 192 && p1 === 168) return true;

    // Link-local: 169.254.0.0/16
    if (p0 === 169 && p1 === 254) return true;

    // Shared address space (RFC 6598): 100.64.0.0/10
    if (p0 === 100 && p1 >= 64 && p1 <= 127) return true;

    // Broadcast / Unspecified / Test nets
    if (p0 === 0) return true;
    if (p0 === 255 && p1 === 255 && p2 === 255 && p3 === 255) return true;
    if (p0 === 192 && p1 === 0 && p2 === 2) return true; // RFC 5737
    if (p0 === 198 && p1 === 51 && p2 === 100) return true;
    if (p0 === 203 && p1 === 0 && p2 === 113) return true;

    return false;
  }

  // IPv6 validation
  if (cleanIp.includes(':')) {
    const normalized = cleanIp.toLowerCase();
    
    // Loopback (::1) and Unspecified (::)
    if (normalized === '::' || normalized === '::1' || normalized === '::0' || normalized === '0:0:0:0:0:0:0:0' || normalized === '0:0:0:0:0:0:0:1') {
      return true;
    }

    // Link-local unicast fe80::/10
    if (normalized.startsWith('fe80:')) return true;

    // Unique Local Address fc00::/7
    if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true;

    // Documentation prefix 2001:db8::/32
    if (normalized.startsWith('2001:db8')) return true;

    return false;
  }

  return true;
}

// Check hostname IP before fetch to prevent SSRF
async function validateUrlHost(urlStr: string): Promise<void> {
  const parsed = new URL(urlStr);
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`Forbidden protocol: ${parsed.protocol}`);
  }

  const hostname = parsed.hostname;
  let resolvedIps: string[] = [];
  
  try {
    const lookupResult = await dnsLookup(hostname, { all: true });
    resolvedIps = lookupResult.map(r => r.address);
  } catch (err) {
    throw new Error(`Failed to resolve DNS hostname: ${hostname}`);
  }

  for (const ipAddr of resolvedIps) {
    if (isIpPrivateOrLoopback(ipAddr)) {
      throw new Error(`Access blocked to private network destination: ${ipAddr}`);
    }
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || (req as any).ip || 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded. Please try again in a minute.' }, { status: 429 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid URL is required.' }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    // Validate Host to prevent SSRF
    try {
      await validateUrlHost(targetUrl);
    } catch (err: any) {
      return NextResponse.json({ success: false, error: err.message || 'Host validation failed' }, { status: 403 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    let response: Response;
    let methodUsed = 'HEAD';

    try {
      // Attempt HEAD request first to save resources
      response = await fetch(targetUrl, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*'
        },
        signal: controller.signal
      });

      // If server blocks HEAD or errors, fallback to GET (reading headers only)
      if (!response.ok || response.status >= 400) {
        methodUsed = 'GET';
        response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': '*/*'
          },
          signal: controller.signal
        });
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      return NextResponse.json({ success: false, error: `Connection failed: ${err.message || 'Network error'}` }, { status: 500 });
    } finally {
      clearTimeout(timeoutId);
    }

    // Capture standard MIME headers
    const contentTypeHeader = response.headers.get('content-type') || '';
    const contentDisposition = response.headers.get('content-disposition') || 'inline';
    const contentEncoding = response.headers.get('content-encoding') || 'none';
    const cacheControl = response.headers.get('cache-control') || 'none';
    const xContentTypeOptions = response.headers.get('x-content-type-options') || 'none';

    // Parse Content-Type details: e.g. text/html; charset=utf-8
    let mimeType = 'unknown';
    let charset = 'unknown';

    if (contentTypeHeader) {
      const parts = contentTypeHeader.split(';');
      mimeType = parts[0].trim().toLowerCase();
      
      const charsetPart = parts.find(p => p.trim().toLowerCase().startsWith('charset='));
      if (charsetPart) {
        charset = charsetPart.split('=')[1].trim();
      }
    }

    const headersObj = Object.fromEntries(response.headers.entries());

    // Security warning analysis
    const securityWarnings: string[] = [];
    if (!xContentTypeOptions.toLowerCase().includes('nosniff')) {
      securityWarnings.push('Missing X-Content-Type-Options: nosniff header. Browsers might perform MIME sniffing and execute unauthorized files as scripts.');
    }

    const dangerousTypes = [
      'application/x-msdownload', // .exe
      'application/x-sh',          // .sh
      'application/x-bat',         // .bat
      'text/javascript',           // scripts inside image tags
      'text/html'                  // scripts in files
    ];

    if (dangerousTypes.includes(mimeType) && contentDisposition.includes('inline')) {
      if (mimeType === 'text/html' || mimeType === 'text/javascript') {
        // Warning only if served from unexpected user sources, but let's warn generally
        securityWarnings.push(`Serving ${mimeType} inline can execute scripts in the site's security origin.`);
      } else {
        securityWarnings.push(`Executable MIME type (${mimeType}) served inline. High security vulnerability.`);
      }
    }

    return NextResponse.json({
      success: true,
      url: targetUrl,
      status: response.status,
      statusText: response.statusText,
      methodUsed,
      mimeType,
      charset,
      contentTypeHeader,
      contentDisposition,
      contentEncoding,
      cacheControl,
      xContentTypeOptions,
      securityWarnings,
      rawHeaders: headersObj
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}
