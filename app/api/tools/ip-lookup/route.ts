import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns/promises';
import { isIP } from 'net';

// Memory-based rate limiter (30 requests per minute per IP)
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

// SSRF / Private network checker
function checkIsPrivateOrLoopback(ipStr: string): boolean {
  const cleanIp = ipStr.trim();

  // IPv4 check
  if (/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/.test(cleanIp)) {
    const parts = cleanIp.split('.').map(Number);
    if (parts.some(isNaN) || parts.length !== 4) return true;

    const [p0, p1, p2] = parts;

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

    // Test networks/broadcast/unspecified
    if (p0 === 0 || p0 >= 224) return true;

    return false;
  }

  // IPv6 check
  if (cleanIp.includes(':')) {
    const normalized = cleanIp.toLowerCase();

    // Loopback (::1) and Unspecified (::)
    if (normalized === '::' || normalized === '::1' || normalized.startsWith('::0')) {
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

// Get client IP address from request headers
function getClientIp(req: NextRequest): string {
  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',').map(ip => ip.trim());
    return ips[0];
  }
  const xRealIp = req.headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();
  
  return (req as any).ip || '127.0.0.1';
}

// Fetch geolocation with primary + fallback architecture
async function fetchGeolocation(ip: string) {
  // 1. Try ipwho.is (Primary provider)
  try {
    const res = await fetch(`https://ipwho.is/${ip}`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        return {
          country: data.country || 'Unknown',
          countryCode: data.country_code || 'US',
          region: data.region || 'Unknown',
          city: data.city || 'Unknown',
          zip: data.postal || 'N/A',
          lat: data.latitude || 0,
          lon: data.longitude || 0,
          timezone: data.timezone?.id || 'UTC',
          timezoneOffset: data.timezone?.utc || '+00:00',
          currentTime: data.timezone?.current_time || '',
          isp: data.connection?.isp || data.connection?.org || 'Unknown ISP',
          asn: data.connection?.asn ? `AS${data.connection.asn}` : 'N/A',
          org: data.connection?.org || 'Unknown Organization',
          cidr: data.connection?.cidr || 'N/A',
          connectionType: data.connection?.type || 'Unknown',
          security: {
            isVpn: !!data.security?.vpn,
            isProxy: !!data.security?.proxy,
            isTor: !!data.security?.tor,
            isHosting: !!data.security?.hosting,
          }
        };
      }
    }
  } catch (err) {
    // Fail silently to fall back
  }

  // 2. Try freeipapi.com (Secondary provider)
  try {
    const res = await fetch(`https://freeipapi.com/api/json/${ip}`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data) {
        return {
          country: data.countryName || 'Unknown',
          countryCode: data.countryCode || 'US',
          region: data.regionName || 'Unknown',
          city: data.cityName || 'Unknown',
          zip: data.zipCode || 'N/A',
          lat: data.latitude || 0,
          lon: data.longitude || 0,
          timezone: 'UTC', // freeipapi doesn't return full TZ info, default to UTC
          timezoneOffset: data.timeZone || '+00:00',
          currentTime: '',
          isp: 'Unknown ISP',
          asn: 'N/A',
          org: 'Unknown Organization',
          cidr: 'N/A',
          connectionType: 'Unknown',
          security: {
            isVpn: !!data.isProxy, // freeipapi returns proxy info
            isProxy: !!data.isProxy,
            isTor: false,
            isHosting: false,
          }
        };
      }
    }
  } catch (err) {
    // Fail silently to fall back
  }

  // 3. Try ip-api.com (Tertiary provider - HTTP free tier)
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.status === 'success') {
        const asnMatch = data.as ? data.as.match(/^(AS\d+)/) : null;
        return {
          country: data.country || 'Unknown',
          countryCode: data.countryCode || 'US',
          region: data.regionName || 'Unknown',
          city: data.city || 'Unknown',
          zip: data.zip || 'N/A',
          lat: data.lat || 0,
          lon: data.lon || 0,
          timezone: data.timezone || 'UTC',
          timezoneOffset: '+00:00', // ip-api doesn't give offset directly, default
          currentTime: '',
          isp: data.isp || 'Unknown ISP',
          asn: asnMatch ? asnMatch[1] : 'N/A',
          org: data.org || 'Unknown Organization',
          cidr: 'N/A',
          connectionType: 'Unknown',
          security: {
            isVpn: false,
            isProxy: false,
            isTor: false,
            isHosting: false,
          }
        };
      }
    }
  } catch (err) {
    // Fall back to null
  }

  return null;
}

export async function POST(req: NextRequest) {
  const requesterIp = getClientIp(req);
  
  if (!rateLimit(requesterIp)) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded. Please wait a minute.' }, { status: 429 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    let targetIp = body.ip ? body.ip.trim() : '';

    let isDemo = false;
    let originalPrivateIp: string | null = null;

    // Detect if client requested their own IP
    if (!targetIp) {
      targetIp = requesterIp;
      
      // Clean up IPv6-mapped IPv4 addresses
      if (targetIp.startsWith('::ffff:')) {
        targetIp = targetIp.slice(7);
      }

      // If client IP is a local subnet or loopback, substitute with demo IP 8.8.8.8
      if (checkIsPrivateOrLoopback(targetIp)) {
        isDemo = true;
        originalPrivateIp = targetIp;
        targetIp = '8.8.8.8'; // Substitute Google DNS for demonstration
      }
    }

    // IP Format Validation
    const ipVer = isIP(targetIp);
    if (ipVer === 0) {
      return NextResponse.json({ success: false, error: 'Invalid IP address format. Please enter a valid IPv4 or IPv6 address.' }, { status: 400 });
    }

    const ipVersionLabel = ipVer === 4 ? 'IPv4' : 'IPv6';
    const isPrivate = checkIsPrivateOrLoopback(targetIp);

    // If it's a private subnet, bypass external calls to prevent SSRF
    if (isPrivate) {
      return NextResponse.json({
        success: true,
        ip: targetIp,
        ipVersion: ipVersionLabel,
        isPrivate: true,
        isDemo: false,
        originalPrivateIp: null,
        geolocation: {
          country: 'Private Network',
          countryCode: 'LOCAL',
          region: 'Local LAN',
          city: 'Internal Address',
          zip: 'N/A',
          lat: 0,
          lon: 0,
          timezone: 'N/A',
          timezoneOffset: 'N/A',
          currentTime: ''
        },
        network: {
          isp: 'Local Area Network',
          asn: 'N/A',
          org: 'Private IP Subnet (RFC 1918 / RFC 4193)',
          cidr: targetIp.startsWith('10.') ? '10.0.0.0/8' : targetIp.startsWith('192.168.') ? '192.168.0.0/16' : 'Local Range',
          connectionType: 'LAN'
        },
        security: {
          isVpn: false,
          isProxy: false,
          isTor: false,
          isHosting: false,
          reputationScore: 'Secure (Local)',
          warnings: ['This is a private/local IP address. It is not routable on the public internet.']
        },
        reverseDns: []
      });
    }

    // Run Geolocation Fetch and Reverse DNS concurrently
    const [geo, rDns] = await Promise.all([
      fetchGeolocation(targetIp),
      dns.reverse(targetIp).catch(() => [] as string[])
    ]);

    if (!geo) {
      return NextResponse.json({ success: false, error: 'Unable to query geolocation details. The lookup servers are temporarily unavailable.' }, { status: 500 });
    }

    // Determine reputation based on threat indicators
    let reputationScore = 'Good';
    const warnings: string[] = [];
    if (geo.security.isTor) {
      reputationScore = 'High Risk';
      warnings.push('Flagged: Public Tor exit node detected. Traffic originates from anonymous onion routers.');
    } else if (geo.security.isProxy) {
      reputationScore = 'Medium';
      warnings.push('Warning: Public proxy endpoint detected. User identity might be masked.');
    } else if (geo.security.isVpn) {
      reputationScore = 'Medium';
      warnings.push('Note: VPN IP address detected. Connection routed through an encrypted anonymizer tunnel.');
    } else if (geo.security.isHosting) {
      reputationScore = 'Medium';
      warnings.push('Info: Datacenter or hosting network range. Often used by bots, servers, or cloud tasks.');
    }

    return NextResponse.json({
      success: true,
      ip: targetIp,
      ipVersion: ipVersionLabel,
      isPrivate: false,
      isDemo,
      originalPrivateIp,
      geolocation: {
        country: geo.country,
        countryCode: geo.countryCode,
        region: geo.region,
        city: geo.city,
        zip: geo.zip,
        lat: geo.lat,
        lon: geo.lon,
        timezone: geo.timezone,
        timezoneOffset: geo.timezoneOffset,
        currentTime: geo.currentTime
      },
      network: {
        isp: geo.isp,
        asn: geo.asn,
        org: geo.org,
        cidr: geo.cidr,
        connectionType: geo.connectionType
      },
      security: {
        isVpn: geo.security.isVpn,
        isProxy: geo.security.isProxy,
        isTor: geo.security.isTor,
        isHosting: geo.security.isHosting,
        reputationScore,
        warnings
      },
      reverseDns: rDns
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'An internal error occurred during IP query.' }, { status: 500 });
  }
}
