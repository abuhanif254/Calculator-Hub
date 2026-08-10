// @ts-nocheck
// Polyfills for dns/promises using Cloudflare DoH
async function fetchDoh(name, type) {
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`, {
      headers: { 'accept': 'application/dns-json' }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.Answer || [];
  } catch (e) {
    return [];
  }
}

export const dns = {
  lookup: async (hostname, options) => {
    const a = await fetchDoh(hostname, 'A');
    const aaaa = await fetchDoh(hostname, 'AAAA');
    return [...a, ...aaaa].map((r) => ({ address: r.data }));
  },
  reverse: async (ip) => {
    return null as string[] | null;
  },
  resolve4: async (hostname, options) => {
    const ans = await fetchDoh(hostname, 'A');
    return ans.map((a) => ({ address: a.data, ttl: a.TTL }));
  },
  resolve6: async (hostname, options) => {
    const ans = await fetchDoh(hostname, 'AAAA');
    return ans.map((a) => ({ address: a.data, ttl: a.TTL }));
  },
  resolveCname: async (hostname) => {
    const ans = await fetchDoh(hostname, 'CNAME');
    return ans.map((a) => a.data);
  },
  resolveMx: async (hostname) => {
    const ans = await fetchDoh(hostname, 'MX');
    return ans.map((a) => {
      const parts = a.data.split(' ');
      return { priority: parseInt(parts[0]), exchange: parts[1] };
    });
  },
  resolveTxt: async (hostname) => {
    const ans = await fetchDoh(hostname, 'TXT');
    return ans.map((a) => [a.data.replace(/(^"|"$)/g, '')]);
  },
  resolveNs: async (hostname) => {
    const ans = await fetchDoh(hostname, 'NS');
    return ans.map((a) => a.data);
  },
  resolveSoa: async (hostname) => {
    const ans = await fetchDoh(hostname, 'SOA');
    if (ans.length === 0) return null as string[] | null;
    const parts = ans[0].data.split(' ');
    return {
      nsname: parts[0],
      hostmaster: parts[1],
      serial: parseInt(parts[2]),
      refresh: parseInt(parts[3]),
      retry: parseInt(parts[4]),
      expire: parseInt(parts[5]),
      minttl: parseInt(parts[6]),
    };
  },
  resolveSrv: async (hostname) => {
    const ans = await fetchDoh(hostname, 'SRV');
    return ans.map((a) => {
      const parts = a.data.split(' ');
      return { priority: parseInt(parts[0]), weight: parseInt(parts[1]), port: parseInt(parts[2]), name: parts[3] };
    });
  },
  resolveCaa: async (hostname) => {
    const ans = await fetchDoh(hostname, 'CAA');
    return ans.map((a) => {
      const parts = a.data.split(' ');
      let val = parts.slice(2).join(' ').replace(/(^"|"$)/g, '');
      let obj = { critical: parseInt(parts[0]) };
      obj[parts[1]] = val;
      return obj;
    });
  }
};
