/**
 * Edge/Cloudflare-Workers-compatible DNS-over-HTTPS (DoH) resolver using Cloudflare 1.1.1.1 JSON API.
 * Replaces Node-only `dns` / `dns/promises` so network diagnostic tools run identically on
 * Cloudflare Workers, Edge runtimes, and Node.js.
 */

export interface DohAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface DohResponse {
  Status: number;
  Answer?: DohAnswer[];
}

export async function queryDoh(name: string, type: string): Promise<DohAnswer[]> {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`;
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/dns-json' },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as DohResponse;
    if (!data || data.Status !== 0 || !Array.isArray(data.Answer)) return [];
    return data.Answer;
  } catch {
    return [];
  }
}

export async function lookupAllIps(hostname: string): Promise<string[]> {
  // If already an IP literal, return directly
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname) || hostname.includes(':')) {
    return [hostname];
  }
  const [a, aaaa] = await Promise.all([queryDoh(hostname, 'A'), queryDoh(hostname, 'AAAA')]);
  const ips: string[] = [];
  for (const r of a) {
    if (r.type === 1 && r.data) ips.push(r.data.trim());
  }
  for (const r of aaaa) {
    if (r.type === 28 && r.data) ips.push(r.data.trim());
  }
  return ips;
}

export async function reverseIp(ip: string): Promise<string[]> {
  const clean = ip.trim();
  let ptrName = '';
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(clean)) {
    ptrName = `${clean.split('.').reverse().join('.')}.in-addr.arpa`;
  } else if (clean.includes(':')) {
    // Expand IPv6 for ip6.arpa reverse lookup
    const parts = clean.split('::');
    const left = parts[0] ? parts[0].split(':') : [];
    const right = parts[1] ? parts[1].split(':') : [];
    const missing = 8 - (left.length + right.length);
    if (missing < 0) return [];
    const full = [...left, ...Array(missing).fill('0'), ...right]
      .map((g) => g.padStart(4, '0'))
      .join('');
    ptrName = `${full.split('').reverse().join('.')}.ip6.arpa`;
  } else {
    return [];
  }
  const ans = await queryDoh(ptrName, 'PTR');
  return ans
    .filter((r) => r.type === 12 && r.data)
    .map((r) => r.data.replace(/\.$/, ''));
}

export function isValidIpAddress(ip: string): 0 | 4 | 6 {
  const s = ip.trim();
  if (/^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/.test(s)) {
    return 4;
  }
  if (s.includes(':') && /^[0-9a-fA-F:]+$/.test(s) && s.split(':').length >= 3 && s.split(':').length <= 8) {
    return 6;
  }
  return 0;
}
