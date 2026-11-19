---
metaTitle: "IP Lookup & Geolocation Tool — ASN, ISP, rDNS & VPN Check"
metaDescription: "Inspect any IPv4 or IPv6 address for geolocation, ASN, ISP, CIDR, reverse DNS, and VPN, proxy, or Tor flags with instant SSRF-safe validation."
metaKeywords: "ip lookup, ip checker, ip geolocation, check my ip, what is my ip, asn lookup, isp checker, reverse dns lookup, vpn checker, proxy detector, ipv6 lookup, ip address details"
title: "IP Lookup Tool & Geolocation Analyzer"
shortDescription: "Inspect any IP address (IPv4/IPv6) to discover details about its geolocation, ISP network provider, ASN registration, reverse DNS hostname, proxy/VPN status, and threat metrics."
faqs:
  - question: "Why does IP geolocation show a nearby metro city instead of my exact street address?"
    answer: "IP geolocation maps routing prefixes to Regional Internet Registry allocations, ISP peering hubs, and latency measurements rather than GPS coordinates. Country accuracy exceeds 99%, but city-level results typically resolve to the ISP's regional Broadband Network Gateway (BNG) or aggregation point, which can sit tens of kilometers from the subscriber."
  - question: "What happens if I look up an RFC 1918 private IP like 192.168.1.1 or 10.0.0.5?"
    answer: "Private, loopback, link-local, and CGNAT addresses are not globally routable on the public internet and carry no public geolocation or ASN ownership. The lookup backend detects these reserved subnets immediately, short-circuits external queries to prevent SSRF, and returns the corresponding RFC classification instead."
  - question: "Why do Anycast IP addresses like 8.8.8.8 or 1.1.1.1 display unexpected locations?"
    answer: "Anycast announces the exact same IP prefix via BGP from hundreds of Points of Presence worldwide so routers forward traffic to the topologically nearest edge node. Because a single prefix has no single physical site, geolocation databases typically assign it to the operator's headquarters or a default central country coordinate."
  - question: "How does Forward-Confirmed Reverse DNS (FCrDNS) validate legitimate servers?"
    answer: "FCrDNS performs a reverse PTR lookup on an IP address to obtain a hostname and then runs a forward A or AAAA lookup on that hostname to confirm it resolves back to the exact original IP. Mail servers and WAFs rely on FCrDNS to distinguish genuine MTAs and search crawlers from spoofed PTR records."
  - question: "Does a Hosting or VPN flag automatically mean an IP address is malicious?"
    answer: "No. Hosting flags simply indicate that the IP prefix belongs to a cloud or datacenter ASN (such as AWS, GCP, or DigitalOcean) rather than a residential ISP, while VPN flags indicate shared privacy tunnels. Security teams treat these indicators as risk-scoring inputs for step-up authentication rather than blanket block triggers."
features:
  - "Dual-stack IPv4 and IPv6 format validation with automatic detection of your current public client IP"
  - "Multi-provider geolocation fallback pipeline reporting country, region, city, postal code, coordinates, and IANA timezone"
  - "Autonomous System Number (ASN), ISP, organization, CIDR prefix, and connection-type attribution"
  - "Concurrent reverse DNS (rDNS) lookup resolving in-addr.arpa and ip6.arpa PTR hostnames"
  - "Anonymizer and network classification flagging Tor exit nodes, public proxies, VPN endpoints, and hosting datacenters"
  - "Built-in RFC 1918, RFC 6598, RFC 4193, and loopback detection with server-side SSRF safeguards and JSON/TXT export"
useCases:
  - "Investigating brute-force login attempts, API scraping spikes, and suspicious source IPs in reverse-proxy access logs"
  - "Verifying that outbound corporate or mail-server IPs expose matching reverse DNS PTR hostnames before launch"
  - "Auditing VPN tunnel routing and split-tunnel egress IPs across IPv4 and IPv6 endpoints during network troubleshooting"
  - "Cross-checking e-commerce billing countries against transaction IP geolocation and proxy/Tor risk indicators"
  - "Identifying the cloud provider ASN and CIDR range behind an unknown third-party webhook or integration callback"
  - "Confirming whether an IP address in a firewall alert belongs to a residential ISP, mobile CGNAT pool, or cloud datacenter"
howToSteps:
  - "Load the tool to inspect your own detected public IP address automatically, or enter any target IPv4 or IPv6 address."
  - "Submit the query to trigger parallel geolocation attribution, anonymizer screening, and reverse DNS PTR resolution."
  - "Review the Location & Map panel for country, region, city, approximate coordinates, and IANA timezone offset."
  - "Examine the Network & Routing card to inspect the ASN, ISP name, owning organization, and announced CIDR block."
  - "Check the Security Intelligence and Reverse DNS panels for VPN, proxy, Tor, hosting warnings, and PTR hostnames."
  - "Copy the structured summary or export the complete JSON or TXT report directly from your browser."
---

Every packet traversing the public internet carries a source and destination IP address, yet raw octets or hexadecimal groups tell an engineer very little on their own. Turning an opaque address into actionable intelligence requires correlating three independent infrastructure layers: BGP routing and Autonomous System registries, commercial geolocation feeds, and reverse DNS pointer zones. This analyzer performs those lookups in parallel behind SSRF-protected server endpoints, handles multi-provider failover automatically, and renders interactive maps, routing metadata, and exportable reports directly in your browser.

## IPv4 Exhaustion, IPv6 Canonical Form, and Reserved Blocks

Internet routing operates concurrently across 32-bit IPv4 (`4,294,967,296` theoretical addresses) and 128-bit IPv6 (`3.4 × 10^38` addresses). Because IPv6 addresses can be written in dozens of equivalent text representations, RFC 5952 defines a strict canonical format: lowercase hexadecimal digits, stripped leading zeros within each 16-bit hextet, and a single `::` replacement for the longest consecutive run of two or more all-zero hextets (for example, `2001:4860:4860::8888`). Dual-stack servers also frequently log IPv4 clients as IPv4-mapped IPv6 addresses using the `::ffff:0:0/96` prefix (such as `::ffff:203.0.113.45`), which must be unwrapped before querying IPv4 databases.

Not every syntactically valid IP is globally routable. IANA reserves special-purpose address blocks across both protocol families that must never be forwarded across public BGP peers:

| CIDR Block | IP Family | Standard / RFC | Scope & Operational Behavior |
| :--- | :--- | :--- | :--- |
| `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | IPv4 | RFC 1918 | Private enterprise and home LAN space; translated via NAT at internet gateways. |
| `100.64.0.0/10` | IPv4 | RFC 6598 | Carrier-Grade NAT (CGNAT) shared space between ISP core and subscriber CPEs. |
| `127.0.0.0/8` / `::1/128` | IPv4 / IPv6 | RFC 1122 / 4291 | Host loopback interface; traffic stays entirely inside the local OS network stack. |
| `169.254.0.0/16` / `fe80::/10` | IPv4 / IPv6 | RFC 3927 / 4291 | Link-local unicast; auto-configured on a single broadcast segment and non-routable. |
| `fc00::/7` (`fd00::/8`) | IPv6 | RFC 4193 | Unique Local Addresses (ULA) for private internal IPv6 routing without global reachability. |
| `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` | IPv4 | RFC 5737 | Documentation and test-net ranges (`TEST-NET-1/2/3`) excluded from global routing tables. |
| `2001:db8::/32` | IPv6 | RFC 3849 | Documentation prefix reserved for examples and configuration templates. |

When a reserved or private subnet is submitted here, the backend classifies it locally and skips external HTTP and DNS calls completely—protecting internal infrastructure against Server-Side Request Forgery (SSRF).

## Autonomous Systems, BGP Prefixes, and RIR Attribution

The public internet is a mesh of roughly 75,000 active **Autonomous Systems (AS)**—independently administered networks that exchange reachability announcements using the Border Gateway Protocol (BGP). Each network receives a unique **Autonomous System Number (ASN)**—originally 16-bit (`1–65535`) and expanded to 32-bit integers under RFC 6793—from one of five Regional Internet Registries (RIRs):

- **ARIN** (North America and parts of the Caribbean)
- **RIPE NCC** (Europe, Middle East, and parts of Central Asia)
- **APNIC** (Asia-Pacific)
- **LACNIC** (Latin America and the Caribbean)
- **AFRINIC** (Africa)

Routers forward packets using **longest-prefix match** against announced CIDR blocks (typically `/24` or larger in IPv4 and `/48` or larger in IPv6). Identifying the ASN behind a client IP often reveals far more than a city pin: seeing `AS16509` (Amazon AWS) or `AS14061` (DigitalOcean) in a login log immediately signals automated or proxied server traffic, whereas a regional telecom ASN points to residential broadband or mobile subscribers.

## Why IP Geolocation Drifts: Anycast, CGNAT, and Edge PoPs

Engineering teams frequently overestimate the spatial precision of IP geolocation and build brittle fraud rules or geo-fences as a result. Understanding the physical network causes of geolocation drift prevents false positives:

1. **ISP Aggregation & Mobile CGNAT**: Cellular carriers routinely multiplex tens of thousands of handsets behind a handful of regional NAT gateways. A subscriber standing in one city often egresses through a carrier packet core located 150 km away.
2. **Anycast Prefixes**: Public DNS resolvers (`8.8.8.8`, `1.1.1.1`) and global CDNs advertise identical prefixes from hundreds of data centers simultaneously. Because BGP routes each user to the closest edge PoP, no single latitude/longitude exists for the prefix; geolocation feeds fall back to the organization's registered corporate headquarters.
3. **IPv4 Leasing Markets**: Because free IPv4 pools are exhausted, operators frequently lease `/24` blocks across continents. Until geofeed CSV files (RFC 8805) propagate across geolocation vendors, leased space can show its previous country for weeks.

## Reverse DNS (FCrDNS) and Anonymizer Threat Signals

Reverse DNS translates an IP back into a hostname by reversing its address components under dedicated arpa zones. IPv4 reverses decimal octets under `.in-addr.arpa`, while IPv6 expands every zero-compressed block to all 32 hexadecimal nibbles in reverse order under `.ip6.arpa`. You can verify PTR records and Forward-Confirmed Reverse DNS (FCrDNS) from any Unix or macOS shell:

```bash
# IPv4 reverse lookup (queries 8.8.8.8.in-addr.arpa PTR)
dig -x 8.8.8.8 +short
# -> dns.google.

# IPv6 reverse lookup (queries 32 reversed hex nibbles under ip6.arpa)
dig -x 2606:4700:4700::1111 +short
# -> one.one.one.one.

# Forward-confirm that the returned PTR hostname maps back to the original IP
dig +short A dns.google
# -> 8.8.8.8 / 8.8.4.4
```

To inspect forward domain records, MX preferences, or SPF/DMARC policies associated with a discovered PTR hostname, continue your investigation in our [DNS Lookup Tool](/en/tools/dns-lookup).

On the threat-intelligence axis, IP lookup pipelines distinguish four distinct traffic classes: **Tor exit nodes** (publicly enumerated consensus exits carrying anonymous onion traffic), **open proxies** (HTTP/SOCKS relays frequently abused for credential stuffing), **commercial VPN endpoints** (encrypted shared consumer tunnels), and **hosting/datacenter ranges** (cloud compute IPs running bots, monitors, or SaaS webhooks). Correlating these network flags with HTTP request fingerprints in the [User Agent Parser](/en/tools/user-agent-parser) and response diagnostics in the [HTTP Header Checker](/en/tools/http-header-checker) gives incident responders a complete view of both transport origin and application-layer identity.
