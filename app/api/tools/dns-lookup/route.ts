import { NextRequest, NextResponse } from 'next/server';
import { queryDoh, lookupAllIps, reverseIp } from '@/lib/utils/dohLookup';

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

// Check hostname IP before querying other services to prevent SSRF
async function validateHostname(hostname: string): Promise<void> {
  let resolvedIps: string[] = [];

  try {
    resolvedIps = await lookupAllIps(hostname);
    if (resolvedIps.length === 0) throw new Error('No DNS records');
  } catch (err) {
    throw new Error(`Failed to resolve DNS hostname: ${hostname}`);
  }

  for (const ipAddr of resolvedIps) {
    if (isIpPrivateOrLoopback(ipAddr)) {
      throw new Error(`Access blocked to private network destination: ${ipAddr}`);
    }
  }
}

async function safeResolve<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (err) {
    return null;
  }
}

// Query RDAP info for lightweight WHOIS-like insights
async function fetchRdapInfo(domain: string) {
  try {
    const res = await fetch(`https://rdap.org/domain/${domain}`, {
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(3000), // 3s timeout
    });
    if (!res.ok) return null;
    const data = await res.json();

    let registrar = 'Unknown';
    if (data.entities && Array.isArray(data.entities)) {
      const registrarEntity = data.entities.find((e: any) => e.roles && e.roles.includes('registrar'));
      if (registrarEntity) {
        if (registrarEntity.vcardArray && Array.isArray(registrarEntity.vcardArray[1])) {
          const fnProperty = registrarEntity.vcardArray[1].find((prop: any) => prop[0] === 'fn');
          if (fnProperty && fnProperty[3]) {
            registrar = fnProperty[3];
          }
        }
        if (registrar === 'Unknown' && registrarEntity.handle) {
          registrar = registrarEntity.handle;
        }
      }
    }

    let createdDate = '';
    if (data.events && Array.isArray(data.events)) {
      const regEvent = data.events.find((e: any) => e.eventAction === 'registration');
      if (regEvent && regEvent.eventDate) {
        createdDate = regEvent.eventDate;
      }
    }

    let domainAge = '';
    if (createdDate) {
      try {
        const created = new Date(createdDate);
        const diffMs = Date.now() - created.getTime();
        const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
        
        const years = Math.floor(diffYears);
        const months = Math.floor((diffYears - years) * 12);
        
        if (years > 0) {
          domainAge = `${years} year${years > 1 ? 's' : ''} ${months > 0 ? `and ${months} month${months > 1 ? 's' : ''}` : ''} ago`;
        } else if (months > 0) {
          domainAge = `${months} month${months > 1 ? 's' : ''} ago`;
        } else {
          domainAge = 'Less than a month ago';
        }
      } catch (e) {
        domainAge = '';
      }
    }

    return {
      registrar,
      createdDate,
      domainAge,
    };
  } catch (err) {
    return null;
  }
}

// Helper to check DNS Host provider based on NS records
function detectDnsProvider(nsRecords: string[]): string {
  if (!nsRecords || nsRecords.length === 0) return 'Unknown Nameservers';
  const providers = [
    { name: 'Cloudflare', keywords: ['cloudflare'] },
    { name: 'Amazon Route 53', keywords: ['awsdns'] },
    { name: 'Google Cloud DNS', keywords: ['googledomains', 'google'] },
    { name: 'GoDaddy', keywords: ['domaincontrol'] },
    { name: 'Hostinger', keywords: ['hostinger', 'dns-srv'] },
    { name: 'Ionos (1&1)', keywords: ['oneandone', '1and1'] },
    { name: 'Namecheap', keywords: ['registrar-servers'] },
    { name: 'DigitalOcean', keywords: ['digitalocean'] },
    { name: 'Azure DNS', keywords: ['azure-dns'] },
    { name: 'Bluehost', keywords: ['bluehost'] },
    { name: 'SiteGround', keywords: ['siteground'] },
    { name: 'OVH', keywords: ['ovh'] },
    { name: 'Linode', keywords: ['linode'] }
  ];
  for (const ns of nsRecords) {
    const nsLower = ns.toLowerCase();
    for (const p of providers) {
      if (p.keywords.some(k => nsLower.includes(k))) {
        return p.name;
      }
    }
  }
  return 'Custom / Private DNS';
}

// Helper to check Web Host provider based on PTR records
function detectHostingProvider(ips: string[], ptrRecords: string[]): string {
  if (ips && ips.some(ip => ip.startsWith('104.') || ip.startsWith('172.64.') || ip.startsWith('172.67.') || ip.startsWith('188.114.') || ip.startsWith('162.159.'))) {
    return 'Cloudflare CDN / Proxy';
  }
  if (!ptrRecords || ptrRecords.length === 0) return 'Generic Cloud Host / VPS';
  const providers = [
    { name: 'Amazon Web Services (AWS)', keywords: ['amazonaws.com', 'aws'] },
    { name: 'Google Cloud Platform (GCP)', keywords: ['googleusercontent.com', 'google'] },
    { name: 'Vercel', keywords: ['vercel.app', 'vercel.com', 'vercel-dns'] },
    { name: 'Netlify', keywords: ['netlify.app', 'netlify.com'] },
    { name: 'DigitalOcean', keywords: ['digitalocean.com', 'digitalocean'] },
    { name: 'Linode', keywords: ['linode.com', 'linode'] },
    { name: 'Heroku', keywords: ['heroku.com', 'herokudns'] },
    { name: 'Fastly', keywords: ['fastly.net', 'fastly'] },
    { name: 'GitHub Pages', keywords: ['github.io', 'github.com'] },
    { name: 'OVH', keywords: ['ovh.net', 'ovh'] },
  ];
  for (const ptr of ptrRecords) {
    const ptrLower = ptr.toLowerCase();
    for (const p of providers) {
      if (p.keywords.some(k => ptrLower.includes(k))) {
        return p.name;
      }
    }
  }
  return 'Generic Cloud Host / VPS';
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || (req as any).ip || 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded. Please try again in a minute.' }, { status: 429 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { input } = body;

    if (!input || typeof input !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid domain name or IP address is required.' }, { status: 400 });
    }

    let cleaned = input.trim();
    // Strip protocol if present
    cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/i, '');
    // Strip path, query params, etc.
    cleaned = cleaned.split('/')[0].split('?')[0].split('#')[0];
    cleaned = cleaned.split(':')[0]; // strip port
    cleaned = cleaned.toLowerCase();

    if (!cleaned) {
      return NextResponse.json({ success: false, error: 'Empty hostname/IP provided.' }, { status: 400 });
    }

    // Check if input is IP address (v4 or v6)
    const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const ipv6Regex = /^[a-fA-F0-9:]+$/;
    const isIp = ipv4Regex.test(cleaned) || (cleaned.includes(':') && ipv6Regex.test(cleaned));

    if (isIp) {
      // Validate IP (SSRF check)
      if (isIpPrivateOrLoopback(cleaned)) {
        return NextResponse.json({ success: false, error: 'Forbidden Destination: Private / loopback IP address.' }, { status: 400 });
      }

      // Perform Reverse DNS (PTR) Lookup
      const ptr = await safeResolve(() => reverseIp(cleaned));
      
      return NextResponse.json({
        success: true,
        type: 'ip',
        input: cleaned,
        records: {
          PTR: ptr ? ptr.map(val => ({ value: val })) : []
        },
        diagnostics: [],
        whois: null
      });
    }

    // Otherwise, handle as Domain name lookup
    // Strict domain regex validation (no local domains/localhost)
    const domainRegex = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})+$/;
    if (!domainRegex.test(cleaned)) {
      return NextResponse.json({ success: false, error: 'Malformed domain name or invalid characters.' }, { status: 400 });
    }

    // SSRF lookup validation
    try {
      await validateHostname(cleaned);
    } catch (err: any) {
      return NextResponse.json({ success: false, error: err.message || 'Host resolution failed' }, { status: 403 });
    }

    // Run Resolutions in parallel via Cloudflare DNS-over-HTTPS
    const [aAns, aaaaAns, cnameAns, mxAns, txtAns, nsAns, soaAns, srvAns, caaAns, dmarcAns, dkimGoogleAns, dkimDefaultAns, whois] = await Promise.all([
      queryDoh(cleaned, 'A'),
      queryDoh(cleaned, 'AAAA'),
      queryDoh(cleaned, 'CNAME'),
      queryDoh(cleaned, 'MX'),
      queryDoh(cleaned, 'TXT'),
      queryDoh(cleaned, 'NS'),
      queryDoh(cleaned, 'SOA'),
      queryDoh(cleaned, 'SRV'),
      queryDoh(cleaned, 'CAA'),
      queryDoh(`_dmarc.${cleaned}`, 'TXT'),
      queryDoh(`google._domainkey.${cleaned}`, 'TXT'),
      queryDoh(`default._domainkey.${cleaned}`, 'TXT'),
      fetchRdapInfo(cleaned),
    ]);

    const a = aAns.filter((r) => r.type === 1).map((r) => ({ address: r.data.trim(), ttl: r.TTL }));
    const aaaa = aaaaAns.filter((r) => r.type === 28).map((r) => ({ address: r.data.trim(), ttl: r.TTL }));
    const cname = cnameAns.filter((r) => r.type === 5).map((r) => r.data.replace(/\.$/, ''));
    const mx = mxAns.filter((r) => r.type === 15).map((r) => {
      const [prio, ...rest] = r.data.trim().split(/\s+/);
      return { priority: Number(prio) || 0, exchange: rest.join(' ').replace(/\.$/, '') };
    });
    const stripQuotes = (s: string) => s.replace(/^"|"$/g, '').replace(/"\s+"/g, '');
    const txt = txtAns.filter((r) => r.type === 16).map((r) => [stripQuotes(r.data)]);
    const ns = nsAns.filter((r) => r.type === 2).map((r) => r.data.replace(/\.$/, ''));
    const soaRow = soaAns.find((r) => r.type === 6);
    const soaParts = soaRow ? soaRow.data.trim().split(/\s+/) : null;
    const soa = soaParts && soaParts.length >= 7 ? {
      nsname: soaParts[0].replace(/\.$/, ''),
      hostmaster: soaParts[1].replace(/\.$/, ''),
      serial: Number(soaParts[2]) || 0,
      refresh: Number(soaParts[3]) || 0,
      retry: Number(soaParts[4]) || 0,
      expire: Number(soaParts[5]) || 0,
      minttl: Number(soaParts[6]) || 0,
    } : null;
    const srv = srvAns.filter((r) => r.type === 33).map((r) => {
      const p = r.data.trim().split(/\s+/);
      return { priority: Number(p[0]) || 0, weight: Number(p[1]) || 0, port: Number(p[2]) || 0, name: (p[3] || '').replace(/\.$/, '') };
    });
    const caa = caaAns.filter((r) => r.type === 257).map((r) => {
      const m = r.data.match(/^(\d+)\s+(\S+)\s+"?([^"]*)"?$/);
      if (m) {
        return { critical: Number(m[1]) || 0, [m[2]]: m[3] };
      }
      return { critical: 0, issue: r.data };
    });
    const dmarc = dmarcAns.filter((r) => r.type === 16).map((r) => [stripQuotes(r.data)]);
    const dkimGoogle = dkimGoogleAns.filter((r) => r.type === 16).map((r) => [stripQuotes(r.data)]);
    const dkimDefault = dkimDefaultAns.filter((r) => r.type === 16).map((r) => [stripQuotes(r.data)]);

    // Format results
    const records: Record<string, any[]> = {};

    if (a.length > 0) {
      records['A'] = a.map(r => ({ value: r.address, ttl: r.ttl }));
    }
    if (aaaa.length > 0) {
      records['AAAA'] = aaaa.map(r => ({ value: r.address, ttl: r.ttl }));
    }
    if (cname.length > 0) {
      records['CNAME'] = cname.map(val => ({ value: val }));
    }
    if (mx.length > 0) {
      records['MX'] = mx.map(r => ({ value: r.exchange, priority: r.priority }));
    }
    if (txt.length > 0) {
      records['TXT'] = txt.map(val => ({ value: val.join(' ') }));
    }
    if (ns.length > 0) {
      records['NS'] = ns.map(val => ({ value: val }));
    }
    if (soa) {
      records['SOA'] = [{
        value: `Primary NS: ${soa.nsname}, Admin: ${soa.hostmaster}, Serial: ${soa.serial}, Refresh: ${soa.refresh}, Retry: ${soa.retry}, Expire: ${soa.expire}, MinTTL: ${soa.minttl}`,
        details: soa
      }];
    }
    if (srv.length > 0) {
      records['SRV'] = srv.map(r => ({
        value: `${r.name}:${r.port} (Priority: ${r.priority}, Weight: ${r.weight})`,
        details: r
      }));
    }
    if (caa.length > 0) {
      records['CAA'] = caa.map(r => {
        let val = '';
        if ('issue' in r) val = `issue: ${r.issue}`;
        else if ('issuewild' in r) val = `issuewild: ${r.issuewild}`;
        else if ('iodef' in r) val = `iodef: ${r.iodef}`;
        else val = JSON.stringify(r);
        return { value: val, critical: r.critical };
      });
    }

    // Query PTR for the first resolved A record IP to detect hosting provider hints
    let firstA_Ip = a && a.length > 0 ? a[0].address : null;
    let ptrsForA: string[] | null = null;
    if (firstA_Ip) {
      ptrsForA = await safeResolve(() => reverseIp(firstA_Ip!));
    }

    // Detect Providers
    const dnsProvider = detectDnsProvider(ns || []);
    const hostingProvider = detectHostingProvider(
      (a || []).map(r => r.address),
      ptrsForA || []
    );

    // Diagnostics and warnings calculation
    const diagnostics: { type: 'spf' | 'dmarc' | 'dkim' | 'general'; status: 'secure' | 'warning' | 'error'; message: string }[] = [];

    // SPF Audits
    const spfRecord = txt ? txt.map(v => v.join(' ')).find(str => str.startsWith('v=spf1')) : null;
    if (!spfRecord) {
      diagnostics.push({
        type: 'spf',
        status: 'error',
        message: 'Missing SPF record. Anyone can spoof emails from this domain!'
      });
    } else {
      if (spfRecord.endsWith('+all')) {
        diagnostics.push({
          type: 'spf',
          status: 'error',
          message: 'Weak SPF Record: The "+all" directive authorizes any server on the internet to send mail for your domain.'
        });
      } else if (spfRecord.endsWith('?all')) {
        diagnostics.push({
          type: 'spf',
          status: 'warning',
          message: 'Neutral SPF Record: The "?all" configuration states the server does not declare validity, which weakens spoofing checks.'
        });
      } else {
        diagnostics.push({
          type: 'spf',
          status: 'secure',
          message: `SPF Record is secure: ${spfRecord}`
        });
      }
    }

    // DMARC Audits
    const dmarcRecord = dmarc ? dmarc.map(v => v.join(' ')).find(str => str.startsWith('v=DMARC1')) : null;
    if (!dmarcRecord) {
      diagnostics.push({
        type: 'dmarc',
        status: 'error',
        message: 'Missing DMARC record. Receiving mail servers have no guidelines on handling spoofed messages.'
      });
    } else {
      if (dmarcRecord.includes('p=none')) {
        diagnostics.push({
          type: 'dmarc',
          status: 'warning',
          message: 'DMARC monitor-only mode: The "p=none" policy does not block or quarantine unauthorized emails.'
        });
      } else {
        diagnostics.push({
          type: 'dmarc',
          status: 'secure',
          message: `DMARC Record is active and secure: ${dmarcRecord}`
        });
      }
    }

    // DKIM selector hints (best effort)
    const hasGoogleDkim = dkimGoogle && dkimGoogle.length > 0;
    const hasDefaultDkim = dkimDefault && dkimDefault.length > 0;
    if (hasGoogleDkim || hasDefaultDkim) {
      diagnostics.push({
        type: 'dkim',
        status: 'secure',
        message: `DKIM record detected on active selectors (${hasGoogleDkim ? 'google' : ''}${hasGoogleDkim && hasDefaultDkim ? ', ' : ''}${hasDefaultDkim ? 'default' : ''}).`
      });
    } else {
      diagnostics.push({
        type: 'dkim',
        status: 'warning',
        message: 'DKIM records could not be auto-discovered on default selectors. Ensure your mail provider selectors are published.'
      });
    }

    // Nameservers checks
    if (ns && ns.length === 1) {
      diagnostics.push({
        type: 'general',
        status: 'warning',
        message: 'Only 1 Nameserver record found. A minimum of 2 is recommended for redundancy.'
      });
    }

    return NextResponse.json({
      success: true,
      type: 'domain',
      input: cleaned,
      dnsProvider,
      hostingProvider,
      records,
      diagnostics,
      whois
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Internal server error resolving DNS.' }, { status: 500 });
  }
}
