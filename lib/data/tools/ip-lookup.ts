import { ToolConfig } from './types';

export const ipLookupConfig: ToolConfig = {
  slug: "ip-lookup",
  title: "IP Lookup Tool & Geolocation Analyzer",
  shortDescription: "Inspect any IP address (IPv4/IPv6) to discover details about its geolocation, ISP network provider, ASN registration, reverse DNS hostname, proxy/VPN status, and threat metrics.",
  category: "Web Dev Utilities",
  keywords: [
    "ip lookup", "ip checker", "ip geolocation", "check my ip", "what is my ip",
    "asn lookup", "isp checker", "reverse dns lookup", "vpn checker", "proxy detector",
    "ipv6 lookup", "ip address details"
  ],

  longDescription: `
## What is an IP Lookup Tool?

An **IP Lookup Tool** is a web-based network utility designed to query database registries and retrieve metadata associated with a specific Internet Protocol (IP) address. Every device connected to the internet requires an IP address to communicate. By querying these addresses, developers, network engineers, and cybersecurity professionals can determine the physical geolocation, network service provider (ISP), Autonomous System Number (ASN), hostnames via Reverse DNS, and the connection type of any remote client or server.

Whether you are debugging server logs, analyzing visitor traffic patterns, detecting malicious API abuse, or checking your own public connectivity properties, an IP lookup tool provides real-time visibility into the routing endpoints that structure the global web.

---

## Understanding IP Address Versions: IPv4 vs. IPv6

Internet routing relies on two distinct protocol versions to handle traffic delivery across the globe.

### IPv4 (Internet Protocol Version 4)
- **Format:** 32-bit numerical address written in dot-decimal format, consisting of four octets separated by periods (e.g., \`8.8.8.8\` or \`192.168.1.1\`).
- **Capacity:** Supports roughly 4.3 billion unique addresses. Because of the rapid expansion of connected devices, the global pool of unallocated IPv4 addresses was officially exhausted in the 2010s, forcing network providers to implement workarounds like Network Address Translation (NAT).

### IPv6 (Internet Protocol Version 6)
- **Format:** 128-bit hexadecimal address grouped into eight blocks separated by colons (e.g., \`2001:4860:4860::8888\` or \`2606:4700:4700::1111\`).
- **Capacity:** Supports an astronomical number of unique addresses (approximately $3.4 \times 10^{38}$), ensuring that every single device on earth can have its own public routing interface without needing NAT routers. IPv6 also integrates security protocols (IPsec) and auto-configuration directly into the standard protocol stack.

---

## Public vs. Private IP Addresses

IP addresses are divided into two operational realms: **Public** and **Private**.

1.  **Public IP Addresses:** These are unique, globally routable addresses assigned to routers, servers, or firewalls directly facing the open internet. Any public IP can be queried using our lookup tool to find its associated registry metadata.
2.  **Private IP Addresses:** These are reserved blocks used within local networks (LANs) like home Wi-Fi or office intranets. Private IPs are never routed on the public internet. The Internet Assigned Numbers Authority (IANA) reserves specific ranges for private configurations under **RFC 1918**:
    - \`10.0.0.0\` to \`10.255.255.255\` (Class A)
    - \`172.16.0.0\` to \`172.31.255.255\` (Class B)
    - \`192.168.0.0\` to \`192.168.255.255\` (Class C)
    - Loopback address \`127.0.0.1\` (used by your local system to talk to itself).
    
    If you enter a private or loopback IP into this tool, it recognizes it as a local network range and restricts external lookups, preventing Server-Side Request Forgery (SSRF) and ensuring system integrity.

---

## How IP Geolocation Works

**IP Geolocation** is the practice of mapping an IP address to its real-world physical location. Geolocation does not track down a physical device or a specific user's home address; instead, it matches the IP against commercial databases compiled from ISP allocations, latency testing, routing data, and user agent queries.

### Accuracy of Geolocation
- **Country Level:** Extremely accurate (greater than 99% accuracy).
- **Region / State Level:** Highly accurate (ranging between 85% and 95%).
- **City Level:** Generally accurate (50% to 80% accuracy). The city returned is often the location of the ISP's local routing exchange or gateway center, rather than the user's exact coordinates. For instance, if you live in a suburb, your geolocation lookup might display the nearest large metropolitan center where your ISP aggregates its trunk lines.

---

## Autonomous Systems (AS) and ASN Explained

An **Autonomous System (AS)** is a collection of IP routing prefixes under the control of a single administrative entity (such as an ISP, a university, or a major tech corporation like Google, Amazon, or Cloudflare). The internet is a "network of networks," and Autonomous Systems are the individual networks that connect to form it.

### Autonomous System Numbers (ASN)
Every Autonomous System is assigned a unique identifier called an **ASN** (e.g., \`AS15169\` for Google LLC, or \`AS13335\` for Cloudflare). 
- **BGP Routing:** Networks use the Border Gateway Protocol (BGP) to share routing tables with other ASNs. 
- **ISP Identification:** When you run an IP lookup, identifying the ASN tells you who controls the infrastructure handling the IP's internet traffic. If you query an IP with \`AS16509\`, you instantly know the server is hosted within Amazon Web Services (AWS).

---

## ISP and Hosting Provider Detection

When examining network metadata, the tool distinguishes between the **Internet Service Provider (ISP)** and the **Hosting Provider**:
- **ISP:** The telecom company or carrier providing consumer or commercial internet access (such as Comcast, AT&T, Vodafone, or Deutsche Telekom).
- **Hosting / Cloud Provider:** A data center operator hosting servers, websites, or virtual machines (such as DigitalOcean, Vercel, Linode, AWS, or Google Cloud). 
- **Hosting IP detection** is valuable because it indicates whether incoming traffic originates from a human user at home (using a residential ISP) or an automated script, web scraper, or server application running in a datacenter.

---

## Reverse DNS Lookup (PTR Records)

While standard DNS maps a domain name to an IP address (using A or AAAA records), **Reverse DNS (rDNS)** maps an IP address back to its associated hostname using a **PTR (Pointer) record**.

### Why Reverse DNS Matters
1.  **Mail Server Verification:** Spam filters run rDNS lookups on the IP addresses of incoming mail servers. If the sending IP's PTR record does not match the domain name claimed in the email headers, the message is flagged or rejected.
2.  **Network Diagnostics:** Tools like traceroute use reverse DNS to display human-readable names for the intermediary routing hops, helping engineers pinpoint where packet loss or congestion is occurring.

---

## Security Intelligence: VPN, Proxy, and Tor Detection

In modern cybersecurity, determining if an IP belongs to an anonymizer is critical for fraud prevention and access control.

1.  **VPN (Virtual Private Network):** Users connect to VPNs to encrypt their traffic and mask their real location. VPN IPs are shared by hundreds of users, making them a common indicator for multi-account abuse or bypass attempts.
2.  **Proxy Server:** Proxies act as intermediaries, forwarding web requests from a client to a server. Proxies are often used to bypass geographic restrictions or hide user origins.
3.  **Tor Exit Node:** The Tor network encrypts traffic and routes it randomly through multiple nodes. The final hop—the exit node—places request packets onto the public web. Tor is commonly used for absolute privacy, but its exit nodes are public knowledge and frequently monitored by web security firewalls.
4.  **Reputation Scoring:** If an IP is flagged as a public proxy, Tor node, or hosting server, security systems can adjust their risk calculations, prompting secondary checks (like CAPTCHAs) before processing payments or allowing access.

---

## Networking and Cybersecurity Use Cases

1.  **Fraud Prevention:** E-commerce stores match the billing address of a credit card against the geolocation of the client IP. If a card from the US is used by an IP address in another continent, the transaction can be flagged for review.
2.  **Log File Analysis:** System administrators monitor access logs for suspicious activity. Knowing the geolocation and ISP of IPs attempting brute-force logins helps isolate attacks.
3.  **Content Delivery Networks (CDNs):** CDNs use IP intelligence to route requests to the nearest edge cache server, minimizing load times.
4.  **DDoS Mitigation:** Firewall rules can block entire ASN blocks or geolocations during a Distributed Denial of Service (DDoS) attack to maintain site stability.
`,

  features: [
    "Detect public/private IP addresses instantly and determine IP version (IPv4/IPv6)",
    "Full geolocation mapping including country, region, city, zip code, and coordinates",
    "Identify Internet Service Provider (ISP), Autonomous System Number (ASN), and organization details",
    "Perform automated reverse DNS (rDNS) queries to fetch authoritative PTR hostnames",
    "Anonymizer intelligence: detects active VPN tunnels, public proxy relays, and Tor exit nodes",
    "SSRF defense mechanism: blocks private local ranges (RFC 1918) safely on the server side",
    "Interactive geolocation mapping utilizing zero-dependency, lazy-loaded OpenStreetMap layers",
    "One-click exports supporting raw JSON copies, JSON downloads, and formatted TXT summaries"
  ],

  useCases: [
    "Security teams verifying server logs to block malicious bot networks and scrapers",
    "Developers troubleshooting incoming client IP contexts and proxy forwarding headers",
    "Network engineers inspecting routing paths, PTR records, and Autonomous Systems (ASNs)",
    "Ad-tech platforms detecting click fraud and invalid traffic from hosting datacenters",
    "Curious users identifying their own public connection properties and proxy leakage status"
  ],

  howToSteps: [
    "Enter any public IPv4 or IPv6 address in the search box, or leave it blank and click 'Detect My IP' to inspect your current connection.",
    "Click the 'Query IP Address' button to run the secure server-side analysis.",
    "Review the Overview Dashboard showing flag coordinates, network host, and reputation rating.",
    "Inspect the Geolocation and Interactive Map sections to visualize the approximate server location.",
    "Analyze the Security & Threat panel to check if the IP is running VPNs, proxies, or public hosting relays.",
    "Export your report by copying the data clipboard or downloading the TXT/JSON records directly."
  ],

  faq: [
    {
      question: "What is an IP lookup tool?",
      answer: "An IP lookup tool is an online utility that queries registry databases to find metadata associated with an IP address, such as geographic location, internet service provider (ISP), Autonomous System (ASN), and security configuration status."
    },
    {
      question: "What is my IP address?",
      answer: "Your IP address is a unique numerical label assigned to your device (or home router) by your ISP. Clicking the 'Detect My IP' button on this tool will dynamically read your request headers and show you your current public address."
    },
    {
      question: "What is IPv4?",
      answer: "IPv4 is Internet Protocol Version 4. It uses 32-bit addresses formatted as four numbers separated by dots (e.g., 8.8.8.8) and is the most widely deployed protocol version, supporting 4.3 billion addresses."
    },
    {
      question: "What is IPv6?",
      answer: "IPv6 is Internet Protocol Version 6, designed to replace IPv4. It uses 128-bit addresses represented as hexadecimal groups separated by colons (e.g., 2001:4860:4860::8888), solving the address exhaustion crisis."
    },
    {
      question: "Can IP lookup detect my exact location?",
      answer: "No, IP lookup cannot find your home address, street name, or exact GPS coordinates. It only identifies the region or city gateway where your ISP routes your traffic, which is typically accurate within a few miles."
    },
    {
      question: "What is ASN?",
      answer: "An ASN (Autonomous System Number) is a unique identifier assigned to a massive network (like an ISP or cloud company) that manages routing protocols (BGP) to link up with the rest of the global internet."
    },
    {
      question: "What is reverse DNS?",
      answer: "Reverse DNS (rDNS) maps an IP address back to its host domain name using a PTR record. This is the inverse of forward DNS, which maps domain hostnames to IP addresses."
    },
    {
      question: "Can an IP reveal personal identity?",
      answer: "No, an IP address itself does not contain your name, email, or personal identity. Only your ISP can link an IP address to a specific account or billing contract, which typically requires a legal warrant to obtain."
    },
    {
      question: "What is a VPN IP?",
      answer: "A VPN IP belongs to a Virtual Private Network provider. When you connect, your traffic is encrypted, and your real IP is masked behind one of the VPN's shared server IPs."
    },
    {
      question: "What is a proxy IP?",
      answer: "A proxy IP acts as an intermediate routing server that fetches web pages on your behalf. Like VPNs, proxies hide your real IP address from the websites you visit."
    },
    {
      question: "Why does my IP show another city?",
      answer: "Your IP address might show another city if your ISP routes your connection through a central hub or data center located in a nearby metro area, or if the geolocation database is not fully updated."
    },
    {
      question: "How accurate is IP geolocation?",
      answer: "IP geolocation is nearly 99% accurate for identifying countries, around 90% accurate for states or regions, and roughly 50% to 80% accurate for cities depending on the ISP setup."
    },
    {
      question: "Can IP addresses affect SEO?",
      answer: "IP addresses can affect SEO if your web server's IP is blacklisted for spam, if your hosting provider suffers frequent downtime, or if slow DNS/IP routing degrades Core Web Vitals (TTFB)."
    },
    {
      question: "Can I lookup IPv6 addresses?",
      answer: "Yes! Our IP Lookup Tool supports both IPv4 and IPv6 addresses. Simply enter the hexadecimal string in the lookup field and the tool will resolve it instantly."
    }
  ],

  relatedTools: [
    { name: "DNS Lookup", slug: "dns-lookup" },
    { name: "HTTP Header Checker", slug: "http-header-checker" },
    { name: "Redirect Checker", slug: "redirect-checker" },
    { name: "Website Screenshot Tool", slug: "website-screenshot-tool" },
    { name: "Robots.txt Generator", slug: "robots-txt-generator" }
  ],

  examples: [
    {
      title: "Google Public DNS Lookup",
      description: "Lookup analysis of Google's primary DNS address showing US location and network flags.",
      input: "8.8.8.8",
      output: "IP: 8.8.8.8\nVersion: IPv4\nISP: Google LLC\nASN: AS15169\nCountry: United States\nCity: Mountain View\nSecurity: Datacenter Hosting"
    },
    {
      title: "Cloudflare Public DNS Lookup",
      description: "IP details for Cloudflare's core public resolver network.",
      input: "1.1.1.1",
      output: "IP: 1.1.1.1\nVersion: IPv4\nISP: Cloudflare, Inc.\nASN: AS13335\nCountry: Australia\nCity: Sydney\nHostname: one.one.one.one"
    },
    {
      title: "Google Public DNS IPv6 Address",
      description: "IPv6 format lookup details verifying native IPv6 geolocation.",
      input: "2001:4860:4860::8888",
      output: "IP: 2001:4860:4860::8888\nVersion: IPv6\nISP: Google LLC\nASN: AS15169\nCountry: United States\nCity: Mountain View"
    }
  ]
};
export default ipLookupConfig;
