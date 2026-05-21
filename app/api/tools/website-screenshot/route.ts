import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import dns from 'dns';
import { promisify } from 'util';

const dnsLookup = promisify(dns.lookup);

// Simple memory-based rate limiter (15 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 15;
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
    if (p0 === 192 && p1 === 0 && p2 === 2) return true;
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

const dnsCache = new Map<string, string[]>();

// Check hostname IP before fetch to prevent SSRF
async function validateUrlHost(urlStr: string): Promise<void> {
  const parsed = new URL(urlStr);
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`Forbidden protocol: ${parsed.protocol}`);
  }

  const hostname = parsed.hostname;
  let resolvedIps: string[] = [];

  // Check cache
  if (dnsCache.has(hostname)) {
    resolvedIps = dnsCache.get(hostname)!;
  } else {
    try {
      const lookupResult = await dnsLookup(hostname, { all: true });
      resolvedIps = lookupResult.map(r => r.address);
      dnsCache.set(hostname, resolvedIps);
    } catch (err) {
      throw new Error(`Failed to resolve DNS hostname: ${hostname}`);
    }
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
    const {
      url,
      width = 1920,
      height = 1080,
      isFullPage = false,
      darkMode = false,
      deviceScaleFactor = 1,
      delay = 0,
      format = 'png',
      userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid URL is required.' }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    // SSRF validation for starting URL
    try {
      await validateUrlHost(targetUrl);
    } catch (err: any) {
      return NextResponse.json({ success: false, error: err.message || 'Host validation failed' }, { status: 403 });
    }

    // Clamp width/height/delay/scale factor for safety
    const finalWidth = Math.max(320, Math.min(2560, Number(width) || 1920));
    const finalHeight = Math.max(320, Math.min(2560, Number(height) || 1080));
    const finalScaleFactor = Math.max(1, Math.min(3, Number(deviceScaleFactor) || 1));
    const finalDelay = Math.max(0, Math.min(5000, Number(delay) || 0));
    const finalFormat = format === 'jpeg' ? 'jpeg' : 'png';

    // Start browser session
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const context = await browser.newContext({
      viewport: { width: finalWidth, height: finalHeight },
      deviceScaleFactor: finalScaleFactor,
      userAgent: userAgent,
      colorScheme: darkMode ? 'dark' : 'light',
      ignoreHTTPSErrors: true
    });

    // Intercept redirect routes to prevent SSRF
    await context.route('**/*', async (route) => {
      const request = route.request();
      const requestUrl = request.url();
      try {
        const parsed = new URL(requestUrl);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          await route.abort('blockedbyclient');
          return;
        }
        await validateUrlHost(requestUrl);
        await route.continue();
      } catch (err) {
        await route.abort('blockedbyclient');
      }
    });

    const page = await context.newPage();
    
    // Set Navigation Timeout
    page.setDefaultNavigationTimeout(25000); // 25 seconds max

    const startLoadTime = Date.now();
    let response;
    
    try {
      response = await page.goto(targetUrl, {
        waitUntil: 'load'
      });
    } catch (e: any) {
      await browser.close();
      return NextResponse.json({
        success: false,
        error: `Failed to load page: ${e.message || 'Timeout/Network Error'}`
      }, { status: 500 });
    }

    const loadTimeMs = Date.now() - startLoadTime;

    // Inject Dark Theme class modifiers
    if (darkMode) {
      await page.evaluate(() => {
        try {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        } catch (_) {}
      });
    }

    // Additional settle delay if requested
    if (finalDelay > 0) {
      await page.waitForTimeout(finalDelay);
    }

    // Extract SEO Snapshot metrics
    const seo = await page.evaluate(() => {
      try {
        const title = document.title || '';
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || null;
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;
        const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || null;
        const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || null;
        
        const h1s = Array.from(document.querySelectorAll('h1'))
          .map(el => el.innerText.trim())
          .filter(Boolean);

        return {
          title,
          description,
          canonical,
          ogTitle,
          robots,
          h1Count: h1s.length,
          h1s: h1s.slice(0, 5)
        };
      } catch {
        return {
          title: '',
          description: null,
          canonical: null,
          ogTitle: null,
          robots: null,
          h1Count: 0,
          h1s: []
        };
      }
    });

    // Estimate Page Transfer Size
    const pageSizeEstimateBytes = await page.evaluate(() => {
      try {
        const resources = performance.getEntriesByType('resource') as any[];
        const navigation = performance.getEntriesByType('navigation')[0] as any;
        
        let total = 0;
        if (navigation && navigation.transferSize) {
          total += navigation.transferSize;
        }
        resources.forEach(r => {
          if (r.transferSize) {
            total += r.transferSize;
          } else if (r.decodedBodySize) {
            total += r.decodedBodySize;
          }
        });
        return total || 120 * 1024; // fallback 120KB
      } catch {
        return 120 * 1024;
      }
    });

    // Take the screenshot
    const startRenderTime = Date.now();
    const screenshotBuffer = await page.screenshot({
      type: finalFormat,
      fullPage: isFullPage,
      quality: finalFormat === 'jpeg' ? 80 : undefined
    });
    const renderDurationMs = Date.now() - startRenderTime;

    const base64Screenshot = `data:image/${finalFormat};base64,${screenshotBuffer.toString('base64')}`;

    // Clean up session
    await page.close();
    await context.close();
    await browser.close();

    return NextResponse.json({
      success: true,
      screenshot: base64Screenshot,
      seo,
      performance: {
        loadTimeMs,
        renderTimeMs: renderDurationMs,
        pageSizeEstimateBytes
      }
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Internal server error while capturing screenshot.'
    }, { status: 500 });
  }
}
