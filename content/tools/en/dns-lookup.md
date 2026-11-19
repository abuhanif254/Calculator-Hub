---
metaTitle: "DNS Lookup Tool — Check A, MX, TXT, SPF, DMARC & PTR"
metaDescription: "Query live A, AAAA, MX, TXT, NS, SOA, CAA, SRV, and PTR DNS records instantly. Audit SPF/DMARC mail security, detect hosts, and inspect RDAP."
metaKeywords: "dns lookup, dns checker, dns records lookup, check dns records, spf record checker, dmarc lookup, nameserver lookup, mx records check, domain dns propagation, reverse dns lookup, txt records check"
title: "DNS Lookup Tool & Domain Analyzer"
shortDescription: "Inspect DNS records (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA, SRV, PTR), analyze SPF/DMARC mail security, detect hosting/nameserver providers, and diagnose resolution issues."
faqs:
  - question: "Why cannot a CNAME record coexist with MX or NS records at the zone apex?"
    answer: "RFC 1034 Section 3.6.2 forbids any other resource record type alongside a CNAME at the same owner name because resolvers follow the alias exclusively and ignore sibling records. Since every domain apex requires SOA and NS records, pointing a root domain to a CDN requires an A/AAAA record or provider-side ALIAS/ANAME flattening instead of a raw CNAME."
  - question: "What causes an SPF permerror when my TXT record syntax looks valid?"
    answer: "RFC 7208 Section 4.6.4 enforces a strict cap of 10 DNS-querying mechanisms (include, a, mx, ptr, exists, and redirect) per SPF evaluation, including nested includes inside third-party providers. Exceeding 10 lookups forces receiving mail servers to return a permerror, which often causes DMARC alignment and delivery failures."
  - question: "Why do DNS edits still return old IP addresses after I save my zone file?"
    answer: "Global recursive resolvers cache answers for the duration of the prior record's Time to Live (TTL) in seconds, while missing-record responses are cached according to the SOA record's negative caching minimum TTL (RFC 2308). Lowering the TTL to 60 or 300 seconds at least 24 hours before a server migration minimizes stale cache windows."
  - question: "How does this tool detect DNS and hosting providers without full WHOIS access?"
    answer: "The analyzer matches authoritative NS hostnames against known provider footprints (such as Cloudflare, Amazon Route 53, Google Cloud DNS, and Azure DNS), runs a reverse PTR lookup on the primary resolved IPv4 address alongside anycast prefix heuristics to infer the hosting layer, and queries standardized RDAP JSON endpoints for registrar and domain age."
  - question: "Why does the lookup reject localhost or private RFC 1918 targets?"
    answer: "Because browsers cannot open raw UDP/TCP port 53 sockets directly, live DNS queries execute through our server-side resolver. Before querying external records or RDAP endpoints, the backend validates resolved addresses and blocks loopback (127.0.0.0/8, ::1), RFC 1918 private subnets, RFC 6598 CGNAT space, and link-local ranges to prevent SSRF abuse."
features:
  - "Parallel resolution of A, AAAA, CNAME, MX, TXT, NS, SOA, SRV, CAA, and reverse PTR records with live TTL values"
  - "Automated SPF policy validation flagging missing records, overly permissive +all qualifiers, and neutral ?all directives"
  - "Dedicated _dmarc subdomain inspection and common DKIM selector probing (google and default _domainkey records)"
  - "Authoritative nameserver fingerprinting and reverse-PTR hosting provider identification across major cloud platforms"
  - "Lightweight RDAP (RFC 7480) domain metadata extraction reporting registrar identity, creation timestamp, and domain age"
  - "Built-in SSRF protection rejecting loopback, private RFC 1918, and non-routable IP ranges before resolution"
useCases:
  - "Verifying A, AAAA, and CNAME cutovers across recursive caches during zero-downtime cloud or CDN migrations"
  - "Diagnosing bounced transactional emails by auditing MX priority ordering, SPF qualifiers, and DMARC enforcement policies"
  - "Checking CAA records before automated ACME certificate renewal to confirm Let's Encrypt or DigiCert issuance rights"
  - "Running reverse DNS (PTR) checks on outbound mail server IPs to satisfy receiving MTA anti-spam verification"
  - "Confirming third-party TXT ownership verification tokens for Google Search Console, Microsoft 365, and SaaS integrations"
  - "Auditing authoritative NS redundancy and SOA serial synchronization after delegating a domain to a new DNS host"
howToSteps:
  - "Enter a domain name, full URL, or public IPv4/IPv6 address into the query input; schemes, paths, and ports are stripped automatically."
  - "Trigger the lookup to resolve all supported forward resource record types in parallel or execute a reverse PTR query for an IP address."
  - "Inspect the structured record tabs to verify IPv4/IPv6 targets, TTL countdowns, MX priority ranks, SOA timers, and CAA rules."
  - "Review the Email & Security Diagnostics panel for SPF, DMARC, DKIM selector, and single-nameserver redundancy warnings."
  - "Check the detected DNS host, hosting provider hint, and RDAP registration age summary to map the domain's infrastructure."
  - "Copy individual record values or export the complete lookup payload for incident tickets, migration runbooks, or client audits."
---

Every HTTP request, SMTP handshake, and TLS certificate validation begins with a Domain Name System lookup. When a website fails to resolve, an email lands in spam, or an automated ACME certificate renewal stalls, the root cause almost always lives inside one of a domain's authoritative resource records. Because browser security sandboxes prohibit direct UDP/TCP port 53 sockets, this tool executes parallel server-side DNS queries alongside RDAP registry lookups and presents parsed records, TTL timers, and mail-authentication diagnostics directly in your browser without storing query payloads.

## Resource Record Anatomy and Resolution Semantics

A DNS zone is a structured collection of Resource Records (RRs) defined across RFC 1035 and subsequent protocol extensions. Recursive resolvers walk the delegation hierarchy from the root zone (`.`) to the Top-Level Domain (such as `.com` or `.org`) down to the domain's authoritative nameservers, caching every answer for its declared Time to Live (TTL).

| Record Type | RFC | Zone Example | Operational Role & Constraint |
| :--- | :--- | :--- | :--- |
| `A` | 1035 | `example.com. 300 IN A 93.184.216.34` | Maps hostname to 32-bit IPv4; multiple rows distribute load. |
| `AAAA` | 3596 | `example.com. 300 IN AAAA 2606:2800:220:1::` | Maps hostname to 128-bit IPv6 for dual-stack reachability. |
| `CNAME` | 1034 | `www.example.com. IN CNAME edge.cdn.net.` | Aliases to a canonical host; forbidden at zone apex with `NS`/`SOA`. |
| `MX` | 5321 | `example.com. IN MX 10 mail1.example.com.` | Routes SMTP mail by lowest preference; target cannot be a CNAME. |
| `TXT` | 1035 | `example.com. IN TXT "v=spf1 -all"` | Carries SPF, DKIM, DMARC, and ownership tokens (255-byte wire chunks). |
| `NS` | 1035 | `example.com. IN NS ns1.cloudflare.com.` | Declares authoritative nameservers; use at least two diverse hosts. |
| `SOA` | 2308 | `ns1.host. admin.host. 2026111901 7200 3600 1209600 300` | Holds primary NS, serial, transfer timers, and negative-cache TTL. |
| `CAA` | 8659 | `example.com. IN CAA 0 issue "letsencrypt.org"` | Authorizes Certificate Authorities for standard or wildcard TLS certs. |
| `SRV` | 2782 | `_sip._tcp.example.com. IN SRV 10 60 5060 sip.example.com.` | Publishes priority, weight, port, and target for service discovery. |
| `PTR` | 1035 | `34.216.184.93.in-addr.arpa. IN PTR host.example.com.` | Maps an IPv4 or IPv6 address back to its reverse DNS hostname. |

When auditing an apex redirect or TLS issue after checking `A`, `AAAA`, and `CAA` rows, pair your DNS findings with the [HTTP Header Checker](/en/tools/http-header-checker) or trace multi-hop domain forwarding using the [Redirect Checker](/en/tools/redirect-checker).

## Auditing Email Authentication: SPF, DKIM, and DMARC

SMTP carries no native sender identity proof, making misconfigured TXT records the top cause of spoofed domains and rejected transactional mail. Modern mail receivers evaluate three interlocking DNS standards before deciding whether to deliver, quarantine, or reject a message:

```text
; Apex SPF policy (strict fail on unauthorized IPs, <= 10 DNS lookups)
example.com.              300 IN TXT "v=spf1 include:_spf.google.com ip4:198.51.100.24 -all"

; Selector-scoped DKIM RSA/Ed25519 public key
google._domainkey.example.com. 300 IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."

; Subdomain DMARC enforcement policy with aggregate RUA telemetry
_dmarc.example.com.       300 IN TXT "v=DMARC1; p=reject; sp=reject; adkim=r; aspf=r; pct=100; rua=mailto:dmarc@example.com"
```

### Common Mail-Security Failure Modes

1. **SPF Qualifier Weaknesses**: Ending an SPF record with `+all` authorizes every host on the internet to forge mail from your domain, while `?all` declares neutral status that bypasses strict anti-spoofing defenses. Production domains should converge on `~all` (softfail during rollout) and `-all` (hardfail once all legitimate senders are enumerated).
2. **The 10-Lookup SPF Ceiling (RFC 7208 §4.6.4)**: Every `include`, `a`, `mx`, `exists`, and `redirect` mechanism triggers recursive DNS lookups, and nested includes inside SaaS mailers count toward the same budget of 10. Crossing that threshold triggers a `permerror`, breaking SPF validation even if the sending IP appears in the list.
3. **Monitor-Only DMARC (`p=none`)**: Publishing `_dmarc` with `p=none` collects aggregate XML reports (`rua`) without blocking forged messages. Once reports verify that legitimate traffic passes aligned SPF or DKIM checks, graduate to `p=quarantine` and ultimately `p=reject`.
4. **Custom DKIM Selectors**: Unlike `_dmarc`, DKIM public keys live at `<selector>._domainkey.<domain>`. Because DNS provides no wildcard enumeration of arbitrary selectors, this analyzer probes widely used selectors such as `google` and `default`; providers using custom selectors (for example `s1`, `k1`, or `selector1`) should be verified directly against the `s=` tag inside a received message's `DKIM-Signature` header.

## TTL Caching, SOA Serials, and Global Propagation Lag

"DNS propagation" is frequently misunderstood as an active push across the internet. In reality, DNS is pull-based: when you update a zone file and increment the SOA serial number (conventionally formatted `YYYYMMDDnn` under RFC 1912), secondary nameservers pull the delta via `AXFR`/`IXFR`, while third-party recursive resolvers continue serving their cached copy until the old record's TTL reaches zero.

Negative answers (`NXDOMAIN` or `NODATA`) are cached too, governed by the smaller of the SOA record's own TTL and its final `MINTTL` field (RFC 2308). If you test a brand-new subdomain before creating its `A` record and your SOA minimum TTL is `86400`, resolvers that observed the `NXDOMAIN` may cache the absence for hours.

To compare authoritative answers directly against public recursive caches from a terminal, use `dig`:

```bash
# Bypass recursive caches and query the authoritative nameserver directly
dig @ns1.example.net example.com A +norecurse +noall +answer

# Compare remaining TTLs across Cloudflare and Google resolvers
dig @1.1.1.1 example.com MX +noall +answer
dig @8.8.8.8 _dmarc.example.com TXT +short
```

## Reverse DNS, Provider Fingerprinting, and SSRF Safeguards

Entering a raw IPv4 or IPv6 address instead of a domain name automatically switches this analyzer into reverse DNS mode, querying `in-addr.arpa` or `ip6.arpa` for authoritative `PTR` records. For forward domain lookups, the backend also performs a secondary `PTR` lookup on the primary `A` record alongside nameserver pattern matching and RDAP JSON retrieval (`https://rdap.org/domain/<domain>`, RFC 7480) to surface registrar identity, domain age, DNS host, and cloud infrastructure hints. To dig deeper into the network ASN, CIDR prefix, and geolocation behind a resolved `A` or `AAAA` address, pass that IP straight into our [IP Lookup Tool](/en/tools/ip-lookup).

Finally, because live resolution runs server-side, strict hostname validation and IP filtering run prior to every outbound lookup. Any hostname resolving to loopback (`127.0.0.0/8`, `::1`), RFC 1918 private blocks (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), RFC 6598 shared carrier space (`100.64.0.0/10`), link-local ranges, or IPv6 Unique Local Addresses (`fc00::/7`) is blocked immediately to prevent Server-Side Request Forgery against internal networks.
