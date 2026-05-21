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
  
  // Normalize IPv6-mapped IPv4 addresses (e.g., ::ffff:127.0.0.1)
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

// Cookie parser utility
interface CookieInfo {
  name: string;
  value: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: string;
  expires: string;
}

function parseCookie(cookieStr: string): CookieInfo {
  const parts = cookieStr.split(';').map(p => p.trim());
  const [keyValue, ...directives] = parts;
  
  let name = '';
  let value = '';
  const eqIdx = keyValue.indexOf('=');
  if (eqIdx > 0) {
    name = keyValue.slice(0, eqIdx);
    value = keyValue.slice(eqIdx + 1);
  } else {
    name = keyValue;
  }

  let secure = false;
  let httpOnly = false;
  let sameSite = 'None';
  let expires = 'Session';

  directives.forEach(dir => {
    const lower = dir.toLowerCase();
    if (lower === 'secure') {
      secure = true;
    } else if (lower === 'httponly') {
      httpOnly = true;
    } else if (lower.startsWith('samesite=')) {
      sameSite = dir.split('=')[1] || 'None';
    } else if (lower.startsWith('expires=')) {
      expires = dir.split('=')[1] || '';
    } else if (lower.startsWith('max-age=')) {
      const seconds = Number(dir.split('=')[1]);
      if (!isNaN(seconds)) {
        expires = new Date(Date.now() + seconds * 1000).toUTCString();
      }
    }
  });

  return { name, value, secure, httpOnly, sameSite, expires };
}

// Main check headers POST handler
export async function POST(req: NextRequest) {
  // Client IP lookup
  const ip = req.headers.get('x-forwarded-for') || (req as any).ip || 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded. Please try again in a minute.' }, { status: 429 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { url, method = 'GET', userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid URL is required.' }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    let currentUrl = targetUrl;
    const redirectChain: any[] = [];
    let hops = 0;
    const maxHops = 5;
    let finalResponse: Response | null = null;

    while (hops <= maxHops) {
      const parsed = new URL(currentUrl);

      // Verify protocol
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return NextResponse.json({ success: false, error: `Forbidden protocol: ${parsed.protocol}` }, { status: 400 });
      }

      // DNS resolve and validation
      const hostname = parsed.hostname;
      let resolvedIps: string[] = [];
      
      try {
        const lookupResult = await dnsLookup(hostname, { all: true });
        resolvedIps = lookupResult.map(r => r.address);
      } catch (err) {
        return NextResponse.json({ success: false, error: `Failed to resolve DNS hostname: ${hostname}` }, { status: 400 });
      }

      for (const ipAddr of resolvedIps) {
        if (isIpPrivateOrLoopback(ipAddr)) {
          return NextResponse.json({ success: false, error: `Access blocked to private network destination: ${ipAddr}` }, { status: 403 });
        }
      }

      // Execute request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const startTime = Date.now();

      let response: Response;
      try {
        response = await fetch(currentUrl, {
          method: method === 'HEAD' ? 'HEAD' : 'GET',
          headers: {
            'User-Agent': userAgent,
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          },
          redirect: 'manual',
          signal: controller.signal,
        });
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return NextResponse.json({ success: false, error: 'Connection timed out after 6 seconds' }, { status: 504 });
        }
        return NextResponse.json({ success: false, error: `Fetch failed: ${err.message}` }, { status: 500 });
      } finally {
        clearTimeout(timeoutId);
      }

      const duration = Date.now() - startTime;
      const status = response.status;
      const headersObj = Object.fromEntries(response.headers.entries());

      redirectChain.push({
        url: currentUrl,
        status: status,
        statusText: response.statusText,
        responseTimeMs: duration,
        headers: headersObj,
      });

      // Handle redirect status codes (300-399 range)
      if (status >= 300 && status < 400) {
        const location = response.headers.get('location');
        if (!location) {
          finalResponse = response;
          break;
        }

        const nextUrl = new URL(location, currentUrl).toString();

        // Redirect Loop Guard
        if (redirectChain.some(s => s.url === nextUrl)) {
          return NextResponse.json({ success: false, error: 'Circular redirect loop detected', redirectChain }, { status: 400 });
        }

        currentUrl = nextUrl;
        hops++;
      } else {
        finalResponse = response;
        break;
      }
    }

    if (hops > maxHops) {
      return NextResponse.json({ success: false, error: 'Maximum redirect limit exceeded (5 redirects)', redirectChain }, { status: 400 });
    }

    if (!finalResponse) {
      return NextResponse.json({ success: false, error: 'Unable to retrieve final destination response' }, { status: 500 });
    }

    // Extract headers and parse structures
    const finalHeaders = Object.fromEntries(finalResponse.headers.entries());
    
    // Retrieve multiple cookies safely using response.headers.getSetCookie if available
    let rawCookies: string[] = [];
    if (typeof finalResponse.headers.getSetCookie === 'function') {
      rawCookies = finalResponse.headers.getSetCookie();
    } else {
      const setCookieVal = finalResponse.headers.get('set-cookie');
      if (setCookieVal) {
        rawCookies = [setCookieVal];
      }
    }
    const cookiesList = rawCookies.map(parseCookie);

    // Caching/Compression diagnostics
    const contentEncoding = finalHeaders['content-encoding'] || '';
    const cacheControl = finalHeaders['cache-control'] || '';
    
    const compression = {
      supported: /gzip|br|deflate/i.test(contentEncoding),
      type: contentEncoding || 'none',
    };

    // Rate limits, server details, connection stats
    const serverInfo = finalHeaders['server'] || 'Unknown';
    const xPoweredBy = finalHeaders['x-powered-by'] || 'None';

    // ─────────────────────────────────────────────────────────────
    // COMPREHENSIVE HEURISTIC AUDIT SCHEME
    // ─────────────────────────────────────────────────────────────
    
    let securityScore = 100;
    const securityChecks: any[] = [];

    // CSP
    const csp = finalHeaders['content-security-policy'];
    if (csp) {
      const hasUnsafe = /'unsafe-inline'|'\*'/i.test(csp);
      securityChecks.push({
        name: 'Content-Security-Policy',
        present: true,
        scoreEffect: 0,
        status: hasUnsafe ? 'warning' : 'pass',
        message: hasUnsafe ? 'CSP enabled but contains unsafe-inline or wildcards' : 'CSP configured correctly',
        value: csp,
      });
    } else {
      securityScore -= 20;
      securityChecks.push({
        name: 'Content-Security-Policy',
        present: false,
        scoreEffect: -20,
        status: 'fail',
        message: 'Protects site from Cross-Site Scripting (XSS) injections.',
        value: null,
      });
    }

    // HSTS (Strict-Transport-Security)
    const hsts = finalHeaders['strict-transport-security'];
    if (hsts) {
      const isSub = /includesubdomains/i.test(hsts);
      securityChecks.push({
        name: 'Strict-Transport-Security',
        present: true,
        scoreEffect: 0,
        status: isSub ? 'pass' : 'info',
        message: isSub ? 'HSTS enabled including subdomains' : 'HSTS active but does not enforce subdomains',
        value: hsts,
      });
    } else {
      securityScore -= 20;
      securityChecks.push({
        name: 'Strict-Transport-Security',
        present: false,
        scoreEffect: -20,
        status: 'fail',
        message: 'Enforces encrypted HTTPS connections at all times.',
        value: null,
      });
    }

    // X-Frame-Options (XFO)
    const xfo = finalHeaders['x-frame-options'];
    if (xfo) {
      securityChecks.push({
        name: 'X-Frame-Options',
        present: true,
        scoreEffect: 0,
        status: 'pass',
        message: `Configured to block iframe overlay hijacking: ${xfo}`,
        value: xfo,
      });
    } else {
      securityScore -= 15;
      securityChecks.push({
        name: 'X-Frame-Options',
        present: false,
        scoreEffect: -15,
        status: 'fail',
        message: 'Prevents clickjacking frame exploits.',
        value: null,
      });
    }

    // X-Content-Type-Options (XCTO)
    const xcto = finalHeaders['x-content-type-options'];
    if (xcto && xcto.toLowerCase().includes('nosniff')) {
      securityChecks.push({
        name: 'X-Content-Type-Options',
        present: true,
        scoreEffect: 0,
        status: 'pass',
        message: 'Blocks MIME-type sniffing.',
        value: xcto,
      });
    } else {
      securityScore -= 15;
      securityChecks.push({
        name: 'X-Content-Type-Options',
        present: false,
        scoreEffect: -15,
        status: 'fail',
        message: 'Stops browsers from loading files as incorrect MIME types.',
        value: xcto || null,
      });
    }

    // Referrer-Policy
    const refPolicy = finalHeaders['referrer-policy'];
    if (refPolicy) {
      securityChecks.push({
        name: 'Referrer-Policy',
        present: true,
        scoreEffect: 0,
        status: 'pass',
        message: `Privacy controls set: ${refPolicy}`,
        value: refPolicy,
      });
    } else {
      securityScore -= 10;
      securityChecks.push({
        name: 'Referrer-Policy',
        present: false,
        scoreEffect: -10,
        status: 'fail',
        message: 'Protects secure query strings from leaking to exit links.',
        value: null,
      });
    }

    // Permissions-Policy
    const permPolicy = finalHeaders['permissions-policy'];
    if (permPolicy) {
      securityChecks.push({
        name: 'Permissions-Policy',
        present: true,
        scoreEffect: 0,
        status: 'pass',
        message: 'Hardware sensor integrations restricted.',
        value: permPolicy,
      });
    } else {
      securityScore -= 10;
      securityChecks.push({
        name: 'Permissions-Policy',
        present: false,
        scoreEffect: -10,
        status: 'fail',
        message: 'Locks client microphone, webcam, and geolocation scopes.',
        value: null,
      });
    }

    // Server Info Exposure check
    const leaksServer = /apache|nginx|iis|php|asp/i.test(serverInfo) || xPoweredBy !== 'None';
    if (leaksServer) {
      securityScore -= 10;
      securityChecks.push({
        name: 'Server Signatures Exposure',
        present: true,
        scoreEffect: -10,
        status: 'warning',
        message: `Leaks server version info (${serverInfo} / X-Powered-By: ${xPoweredBy})`,
        value: `Server: ${serverInfo}, X-Powered-By: ${xPoweredBy}`,
      });
    } else {
      securityChecks.push({
        name: 'Server Signatures Exposure',
        present: false,
        scoreEffect: 0,
        status: 'pass',
        message: 'Server application tags hidden cleanly.',
        value: null,
      });
    }

    securityScore = Math.max(0, securityScore);

    // SEO SCORE CALCULATION
    let seoScore = 100;
    const seoChecks: any[] = [];

    // Robots meta tag header check
    const xRobots = finalHeaders['x-robots-tag'];
    seoChecks.push({
      name: 'X-Robots-Tag',
      present: !!xRobots,
      status: xRobots ? 'info' : 'pass',
      message: xRobots ? `Search crawler rules set: ${xRobots}` : 'No global HTTP crawl blocks defined (site relies on robots.txt)',
      value: xRobots || null,
    });

    // Canonical link tag header check
    const canonicalLink = finalHeaders['link'] && finalHeaders['link'].includes('rel="canonical"');
    seoChecks.push({
      name: 'Link Canonical Header',
      present: !!canonicalLink,
      status: canonicalLink ? 'pass' : 'info',
      message: canonicalLink ? 'Canonical link declared' : 'No link-level canonical header (uses standard HTML canonical tag)',
      value: finalHeaders['link'] || null,
    });

    // HTTPS Redirect Check
    const hadHttpsRedirect = redirectChain.length > 1 && redirectChain[0].url.startsWith('http://') && redirectChain[redirectChain.length - 1].url.startsWith('https://');
    const firstWasHttp = redirectChain.length > 0 && redirectChain[0].url.startsWith('http://');
    if (firstWasHttp && !hadHttpsRedirect) {
      seoScore -= 30;
      seoChecks.push({
        name: 'HTTPS Redirection',
        present: false,
        status: 'fail',
        message: 'Insecure URL does not redirect to HTTPS. Bad for user safety and Google indexing.',
      });
    } else if (hadHttpsRedirect) {
      seoChecks.push({
        name: 'HTTPS Redirection',
        present: true,
        status: 'pass',
        message: 'HTTP calls successfully auto-redirected to secure HTTPS.',
      });
    } else {
      seoChecks.push({
        name: 'HTTPS Redirection',
        present: true,
        status: 'pass',
        message: 'Initiated check directly via secure HTTPS connection.',
      });
    }

    // Vary: Accept-Encoding
    const vary = finalHeaders['vary'] || '';
    const hasVaryAe = /accept-encoding/i.test(vary);
    if (!hasVaryAe && compression.supported) {
      seoScore -= 10;
      seoChecks.push({
        name: 'Vary Header configuration',
        present: false,
        status: 'warning',
        message: 'Compression active but Vary: Accept-Encoding is missing. CDNs could serve uncompressed bundles to legacy browsers.',
        value: vary || null,
      });
    } else {
      seoChecks.push({
        name: 'Vary Header Configuration',
        present: !!vary,
        status: 'pass',
        message: vary ? `Vary rules configured: ${vary}` : 'No Vary headers configured.',
        value: vary || null,
      });
    }

    seoScore = Math.max(0, seoScore);

    // PERFORMANCE / CACHING SCORE
    let perfScore = 100;
    const perfChecks: any[] = [];

    // Cache-Control Caching Audit
    if (cacheControl) {
      const isImmutable = /immutable/i.test(cacheControl);
      const hasMaxAge = /max-age=/i.test(cacheControl);
      const isNoStore = /no-store|no-cache/i.test(cacheControl);

      if (isNoStore) {
        perfChecks.push({
          name: 'Caching Policy',
          status: 'info',
          message: 'Endpoint explicitly blocks caching (no-store/no-cache). Suitable for real-time APIs.',
          value: cacheControl,
        });
      } else if (hasMaxAge) {
        perfChecks.push({
          name: 'Caching Policy',
          status: 'pass',
          message: isImmutable ? 'Optimized browser cache configured (immutable)' : 'Local caching configured via max-age directive',
          value: cacheControl,
        });
      } else {
        perfChecks.push({
          name: 'Caching Policy',
          status: 'warning',
          message: 'Cache-Control header present but no cache rules configured.',
          value: cacheControl,
        });
      }
    } else {
      perfScore -= 30;
      perfChecks.push({
        name: 'Caching Policy',
        status: 'fail',
        message: 'Missing Cache-Control header. Browsers won\'t know if they can store assets locally.',
        value: null,
      });
    }

    // Compression verification
    if (compression.supported) {
      perfChecks.push({
        name: 'Payload Compression',
        status: 'pass',
        message: `Asset served using compression format: ${compression.type}`,
      });
    } else {
      perfScore -= 20;
      perfChecks.push({
        name: 'Payload Compression',
        status: 'warning',
        message: 'Payload served in raw, uncompressed text. Enable Gzip or Brotli on server.',
      });
    }

    // ETag/Last-Modified conditional checks
    const etag = finalHeaders['etag'];
    const lastMod = finalHeaders['last-modified'];
    if (!etag && !lastMod) {
      perfScore -= 10;
      perfChecks.push({
        name: 'Conditional Requests validation',
        status: 'warning',
        message: 'ETag and Last-Modified are missing. Browsers cannot validate expired caches, forcing full downloads.',
      });
    } else {
      perfChecks.push({
        name: 'Conditional Requests validation',
        status: 'pass',
        message: `Validators present: ${[etag ? 'ETag' : null, lastMod ? 'Last-Modified' : null].filter(Boolean).join(', ')}`,
      });
    }

    perfScore = Math.max(0, perfScore);

    // CORS Checks
    const corsOrigin = finalHeaders['access-control-allow-origin'] || 'Not Set';
    const corsMethods = finalHeaders['access-control-allow-methods'] || 'Not Set';
    const corsHeaders = finalHeaders['access-control-allow-headers'] || 'Not Set';
    
    const corsInfo = {
      allowOrigin: corsOrigin,
      allowMethods: corsMethods,
      allowHeaders: corsHeaders,
      isPublic: corsOrigin === '*',
    };

    // Timings
    const connectionTimeMs = redirectChain.reduce((sum, step) => sum + step.responseTimeMs, 0);

    return NextResponse.json({
      success: true,
      url: targetUrl,
      finalUrl: currentUrl,
      status: finalResponse.status,
      statusText: finalResponse.statusText,
      httpVersion: '1.1', // Default Node fetch HTTP protocol representation
      responseTimeMs: connectionTimeMs,
      redirectChain,
      headers: finalHeaders,
      cookies: cookiesList,
      compression,
      cors: corsInfo,
      ratings: {
        securityScore,
        seoScore,
        perfScore,
      },
      audits: {
        securityChecks,
        seoChecks,
        perfChecks,
      }
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Internal server error executing audit' }, { status: 500 });
  }
}
