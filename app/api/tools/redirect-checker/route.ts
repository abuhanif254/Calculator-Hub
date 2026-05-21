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

// Parse Canonical link from HTML text
function parseCanonicalFromHtml(html: string): string | null {
  const linkMatches = html.match(/<link\s+[^>]*>/gi) || [];
  for (const link of linkMatches) {
    if (/rel=["']canonical["']/i.test(link)) {
      const hrefMatch = link.match(/href=["']([^"']+)["']/i);
      if (hrefMatch) {
        return hrefMatch[1];
      }
    }
  }
  return null;
}

// Parse Meta Refresh redirect from HTML text
function parseMetaRefreshFromHtml(html: string): { delay: number; url: string } | null {
  const metaMatches = html.match(/<meta\s+[^>]*>/gi) || [];
  for (const meta of metaMatches) {
    if (/http-equiv=["']refresh["']/i.test(meta)) {
      const contentMatch = meta.match(/content=["']([^"']+)["']/i);
      if (contentMatch) {
        const content = contentMatch[1];
        const parts = content.split(';');
        const delay = parseInt(parts[0], 10) || 0;
        let targetUrl = '';
        if (parts[1]) {
          const urlMatch = parts[1].match(/url=\s*([^"'\s]+)/i) || parts[1].match(/url=\s*["']([^"']+)["']/i);
          if (urlMatch) {
            targetUrl = urlMatch[1].trim();
          }
        } else {
          // Sometimes it's just "delay, url=target"
          const urlMatch = content.match(/url=\s*([^"'\s]+)/i) || content.match(/url=\s*["']([^"']+)["']/i);
          if (urlMatch) {
            targetUrl = urlMatch[1].trim();
          }
        }
        return { delay, url: targetUrl };
      }
    }
  }
  return null;
}

// Parse JavaScript redirect from HTML script tags (best effort)
function parseJsRedirectFromHtml(html: string): string | null {
  const scriptBlocks = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const block of scriptBlocks) {
    const match = block.match(/(?:window\.)?location(?:\.href)?\s*=\s*["']([^"']+)["']/i) ||
                  block.match(/(?:window\.)?location\.replace\(\s*["']([^"']+)["']\s*\)/i);
    if (match && match[1]) {
      const dest = match[1].trim();
      if (!dest.startsWith('//') && (dest.includes('/') || dest.includes('.'))) {
        return dest;
      }
    }
  }
  return null;
}

// Human readable status code explanations
const STATUS_EXPLANATIONS: Record<number, string> = {
  200: 'OK - The request was successful and the resource has been fetched successfully.',
  301: 'Moved Permanently - The target resource has been assigned a new permanent URL. Ranking authority is transferred.',
  302: 'Found (Temporary Redirect) - The resource resides temporarily under a different URL. Link equity is usually retained on the original URL.',
  307: 'Temporary Redirect - Similar to 302 Found, but mandates that the HTTP request method remains unchanged (e.g. POST remains POST).',
  308: 'Permanent Redirect - Similar to 301 Moved Permanently, but mandates that the HTTP request method remains unchanged.',
  404: 'Not Found - The server cannot find the requested resource. This breaks user experience and crawls.',
  410: 'Gone - The resource is permanently deleted and will not be available again. Good for signaling index removal to crawlers.',
  500: 'Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request.',
  503: 'Service Unavailable - The server is temporarily unable to handle the request due to maintenance or overload.'
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || (req as any).ip || 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded. Please try again in a minute.' }, { status: 429 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { url, userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } = body;

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
    const maxHops = 10;
    let loopDetected = false;

    while (hops <= maxHops) {
      // Validate IP to prevent SSRF
      try {
        await validateUrlHost(currentUrl);
      } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message || 'Host validation failed' }, { status: 403 });
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const startTime = Date.now();

      let response: Response;
      try {
        response = await fetch(currentUrl, {
          method: 'GET',
          headers: {
            'User-Agent': userAgent,
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
          redirect: 'manual',
          signal: controller.signal,
        });
      } catch (err: any) {
        const duration = Date.now() - startTime;
        redirectChain.push({
          url: currentUrl,
          status: 0,
          statusText: `Connection Failed: ${err.message || 'Network Error'}`,
          responseTimeMs: duration,
          headers: {},
          type: 'none',
          cookies: [],
          canonical: null,
        });
        clearTimeout(timeoutId);
        break;
      } finally {
        clearTimeout(timeoutId);
      }

      const duration = Date.now() - startTime;
      const status = response.status;
      const headersObj = Object.fromEntries(response.headers.entries());

      // Read response cookies
      let rawCookies: string[] = [];
      if (typeof response.headers.getSetCookie === 'function') {
        rawCookies = response.headers.getSetCookie();
      } else {
        const setCookieVal = response.headers.get('set-cookie');
        if (setCookieVal) {
          rawCookies = [setCookieVal];
        }
      }

      // Check for canonical in HTTP Headers Link
      let canonicalUrl: string | null = null;
      const linkHeader = response.headers.get('link');
      if (linkHeader) {
        const canonicalMatch = linkHeader.match(/<([^>]+)>;\s*rel=["']canonical["']/i);
        if (canonicalMatch) {
          canonicalUrl = new URL(canonicalMatch[1], currentUrl).toString();
        }
      }

      let bodyHtml = '';
      const contentType = response.headers.get('content-type') || '';
      
      // If response is HTML, read text body for client-side redirect searches or canonical tags
      if (contentType.includes('text/html') && response.body) {
        try {
          // Read max 100KB to avoid excessive memory usage
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          let bytesRead = 0;
          const maxBytes = 100 * 1024;
          
          while (bytesRead < maxBytes) {
            const { value, done } = await reader.read();
            if (done) break;
            bodyHtml += decoder.decode(value, { stream: true });
            bytesRead += value.byteLength;
          }
          reader.releaseLock();
        } catch (e) {
          console.error("Failed to read html response body", e);
        }
      }

      // Search HTML for canonical URL if not already found in Link header
      if (!canonicalUrl && bodyHtml) {
        const parsedCanonical = parseCanonicalFromHtml(bodyHtml);
        if (parsedCanonical) {
          canonicalUrl = new URL(parsedCanonical, currentUrl).toString();
        }
      }

      let redirectType = 'none';
      let nextUrl: string | null = null;

      // Check HTTP 3xx Redirection
      if (status >= 300 && status < 400) {
        redirectType = (status === 301 || status === 308) ? 'permanent' : 'temporary';
        const location = response.headers.get('location');
        if (location) {
          nextUrl = new URL(location, currentUrl).toString();
        }
      } else if (status === 200 && bodyHtml) {
        // If 200 OK, check for HTML Meta Refresh redirects
        const metaRefresh = parseMetaRefreshFromHtml(bodyHtml);
        if (metaRefresh && metaRefresh.url) {
          redirectType = 'meta-refresh';
          nextUrl = new URL(metaRefresh.url, currentUrl).toString();
        } else {
          // If no meta refresh, check for JS Redirects
          const jsRedirect = parseJsRedirectFromHtml(bodyHtml);
          if (jsRedirect) {
            redirectType = 'javascript';
            nextUrl = new URL(jsRedirect, currentUrl).toString();
          }
        }
      }

      redirectChain.push({
        url: currentUrl,
        status,
        statusText: response.statusText || (STATUS_EXPLANATIONS[status] ? STATUS_EXPLANATIONS[status].split(' - ')[0] : 'Unknown'),
        responseTimeMs: duration,
        headers: headersObj,
        cookies: rawCookies,
        type: redirectType,
        canonical: canonicalUrl,
      });

      // Redirect Loop Guard
      if (nextUrl) {
        if (redirectChain.some(s => s.url === nextUrl)) {
          loopDetected = true;
          redirectChain.push({
            url: nextUrl,
            status: 0,
            statusText: 'Circular Redirect Loop Detected',
            responseTimeMs: 0,
            headers: {},
            type: 'loop',
            cookies: [],
            canonical: null,
          });
          break;
        }
        currentUrl = nextUrl;
        hops++;
      } else {
        break;
      }
    }

    const finalHop = redirectChain[redirectChain.length - 1];

    // Compute Diagnostics
    const warnings: string[] = [];
    const hasHttpsToHttp = redirectChain.some((step, index) => {
      if (index === 0) return false;
      const prev = redirectChain[index - 1];
      return prev.url.startsWith('https://') && step.url.startsWith('http://');
    });

    if (loopDetected) {
      warnings.push('Loop: An infinite redirect loop was detected, which blocks search engine indexation and users.');
    }
    if (hops > maxHops) {
      warnings.push('Max Hops: Redirect chain exceeded maximum allowed redirect hops limit (10).');
    }
    if (redirectChain.length > 3 && !loopDetected) {
      warnings.push(`Chain Length: Redirect chain too long (${redirectChain.length - 1} hops). Search engines may stop crawling it and ranking authority will decay.`);
    }
    if (hasHttpsToHttp) {
      warnings.push('Insecure Redirect: HTTPS URL redirects back to insecure HTTP. This breaks security integrity.');
    }
    if (finalHop && finalHop.url.startsWith('http://')) {
      warnings.push('Insecure Destination: Final destination URL is unencrypted HTTP. We highly recommend migrating to secure HTTPS.');
    }

    // Check incorrect temporary redirects
    const hasIncorrectTemp = redirectChain.some(step => {
      return (step.status === 302 || step.status === 307) && step.type === 'temporary';
    });
    if (hasIncorrectTemp && finalHop && finalHop.status === 200) {
      warnings.push('Temporary Redirect: Temporary redirects (302/307) used in the chain. If these redirects are permanent, use 301/308 redirects instead to ensure search crawlers transfer ranking values properly.');
    }

    // Check canonical mismatch
    if (finalHop && finalHop.status === 200 && finalHop.canonical) {
      if (finalHop.canonical !== finalHop.url) {
        warnings.push(`Canonical Mismatch: Final URL differs from its self-declared canonical URL. Destination: ${finalHop.url} vs Canonical: ${finalHop.canonical}. This can cause duplicate content issues and dilute authority.`);
      }
    }

    return NextResponse.json({
      success: true,
      url: targetUrl,
      finalUrl: finalHop ? finalHop.url : currentUrl,
      loopDetected,
      redirectChain,
      warnings,
      statusExplanations: STATUS_EXPLANATIONS,
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Internal server error executing redirect audit' }, { status: 500 });
  }
}
