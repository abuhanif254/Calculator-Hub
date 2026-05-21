import { ToolConfig } from './types';

export const dnsLookupConfig: ToolConfig = {
  slug: "dns-lookup",
  title: "DNS Lookup Tool & Domain Analyzer",
  shortDescription: "Inspect DNS records (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA, SRV, PTR), analyze SPF/DMARC mail security, detect hosting/nameserver providers, and diagnose resolution issues.",
  category: "Web Dev Utilities",
  keywords: [
    "dns lookup", "dns checker", "dns records lookup", "check dns records",
    "spf record checker", "dmarc lookup", "nameserver lookup", "mx records check",
    "domain dns propagation", "reverse dns lookup", "txt records check"
  ],

  longDescription: `
## Introduction to the Domain Name System (DNS)

The **Domain Name System (DNS)** is the cornerstone of modern internet communication. Often referred to as the "phonebook of the internet," DNS translates human-readable domain names (such as \`example.com\`) into machine-readable IP addresses (like \`93.184.216.34\` or \`2606:2800:220:1:248:1893:25c8:1946\`). Without DNS, users would have to memorize complex numerical strings to visit websites, send emails, or connect to remote servers.

When a user types a URL into their browser, a multi-step resolution process begins behind the scenes. This developer tool allows you to perform live, server-side DNS queries directly against authoritative DNS resolvers. By analyzing various DNS records, you can troubleshoot website outages, audit email security settings, check domain propagation status, and gain critical insights into any domain's infrastructure.

---

## Detailed Breakdown of DNS Record Types

DNS is organized into distinct record types, each serving a unique role in routing traffic and verifying configuration details. Understanding these records is vital for web administrators, developers, and security professionals:

### 1. A Records (IPv4 Address)
The **A record** (Address record) is the most fundamental DNS record. It maps a hostname directly to a 32-bit IPv4 address. 
*   **Example:** \`example.com. IN A 93.184.216.34\`
*   **Role:** Points your domain name to the web server hosting your website. A single domain can have multiple A records for redundancy or load balancing.

### 2. AAAA Records (IPv6 Address)
The **AAAA record** (Quad-A record) functions identically to the A record but maps hostnames to 128-bit IPv6 addresses.
*   **Example:** \`example.com. IN AAAA 2606:2800:220:1:248:1893:25c8:1946\`
*   **Role:** Essential for supporting modern IPv6-only networks and clients. Implementing dual-stack (both A and AAAA records) ensures maximum accessibility.

### 3. CNAME Records (Canonical Name)
A **CNAME record** maps an alias domain to the canonical (real) domain name. It acts as a redirect at the DNS level.
*   **Example:** \`www.example.com. IN CNAME example.com.\`
*   **Role:** Allows you to point subdomains to a root domain or external host (like AWS CloudFront, Shopify, or GitHub Pages) without maintaining separate IP addresses. *Note: RFC standards prohibit setting a CNAME on the root domain, as it conflicts with MX and NS records.*

### 4. MX Records (Mail Exchanger)
**MX records** specify the mail servers responsible for receiving emails sent to your domain.
*   **Example:** \`example.com. IN MX 10 mail.example.com.\`
*   **Role:** Directs mail delivery. Each MX record includes a priority value (lower numbers represent higher priority). If a server fails, the sending mail transfer agent (MTA) falls back to lower priority servers.

### 5. TXT Records (Text Records)
**TXT records** contain human-readable and machine-readable text data associated with a domain.
*   **Example:** \`example.com. IN TXT "v=spf1 include:_spf.google.com ~all"\`
*   **Role:** Primarily used for domain ownership validation (Google Search Console, Microsoft 365) and email security frameworks (SPF, DKIM, and DMARC).

### 6. NS Records (Nameserver)
**NS records** define which servers are authoritative for handling DNS queries for your domain.
*   **Example:** \`example.com. IN NS ns1.cloudflare.com.\`
*   **Role:** Directs DNS resolvers to the provider that hosts your DNS zone file (e.g., Cloudflare, Route 53, GoDaddy).

### 7. SOA Records (Start of Authority)
The **SOA record** contains administrative details about a DNS zone, including the primary nameserver, the administrator's email, and cache parameters.
*   **Example:** \`example.com. IN SOA ns1.provider.com. hostmaster.example.com. 2026052201 7200 3600 1209600 3600\`
*   **Role:** Essential for zone transfers between primary and secondary nameservers. The serial number updates every time a zone file changes.

### 8. CAA Records (Certification Authority Authorization)
**CAA records** specify which Certificate Authorities (CAs), such as Let's Encrypt or DigiCert, are permitted to issue SSL/TLS certificates for the domain.
*   **Example:** \`example.com. IN CAA 0 issue "letsencrypt.org"\`
*   **Role:** Prevents unauthorized certificate issuance, protecting your brand from man-in-the-middle attacks and fraudulent SSL requests.

### 9. SRV Records (Service Locator)
**SRV records** define the hostname and port number for specific services (like SIP, XMPP, or LDAP).
*   **Example:** \`_sip._tcp.example.com. IN SRV 10 60 5060 sipserver.example.com.\`
*   **Role:** Allows client applications to locate network services automatically without knowing the exact port or server name beforehand.

### 10. PTR Records (Pointer Record)
A **PTR record** maps an IP address back to a domain name, representing the exact reverse of an A record.
*   **Example:** \`34.216.184.93.in-addr.arpa. IN PTR example.com.\`
*   **Role:** Used in Reverse DNS (rDNS) lookups. Mail servers run PTR checks on incoming server IPs to verify they aren't spam sources.

---

## The DNS Resolution Process Explained

When a client queries a domain name, the request goes through a hierarchical resolution tree:

1.  **Stub Resolver (Client):** Your computer checks its local cache and \`hosts\` file.
2.  **Recursive Resolver (ISP / Public DNS):** If not cached, the request goes to resolvers like Cloudflare (\`1.1.1.1\`) or Google (\`8.8.8.8\`).
3.  **Root Nameservers (\`.\`):** The resolver asks the root servers where to find the TLD nameserver.
4.  **TLD Nameservers (e.g., \`.com\`):** The root server directs the query to the TLD registry.
5.  **Authoritative Nameservers:** The TLD server directs the query to the domain's specific nameservers (defined in the NS records), which return the final IP address.

---

## TTL (Time to Live) and DNS Propagation

Every DNS record contains a **Time-To-Live (TTL)** value, expressed in seconds. The TTL tells recursive DNS resolvers how long they should cache the record before fetching a fresh copy from the authoritative nameservers.
*   **Low TTL (e.g., 300 seconds / 5 mins):** Allows changes to take effect almost immediately. Ideal during server migrations or site maintenance.
*   **High TTL (e.g., 86400 seconds / 24 hours):** Reduces DNS server load and improves site loading speed since recursive resolvers hit their cache. Ideal for stable, static setups.

When you edit a DNS record, **DNS propagation** begins. This is the period during which DNS caches worldwide expire their old data and cache the new record. Propagation can take anywhere from a few minutes to 48 hours, depending on the TTL of the previous record.

---

## Critical Email Security Standards: SPF, DKIM, and DMARC

Email is inherently vulnerable to spoofing, allowing bad actors to send emails pretending to come from your domain. To protect your brand and improve email deliverability, you must configure three key records in your TXT DNS settings:

### 1. SPF (Sender Policy Framework)
An **SPF record** lists all the authorized IP addresses and mail servers allowed to send outbound emails on behalf of your domain.
*   **Syntax Example:** \`v=spf1 include:_spf.google.com -all\`
*   **Meaning:** Only servers matching Google's SPF range are authorized. The \`-all\` flag indicates that any other sender should be hard-rejected.

### 2. DKIM (DomainKeys Identified Mail)
**DKIM** adds a cryptographic digital signature to the headers of outbound emails. The public key is published in a DNS TXT record at a specific selector.
*   **Syntax Example:** \`google._domainkey.example.com IN TXT "v=DKIM1; k=rsa; p=MIIB..."\`
*   **Meaning:** Receivers use this public key to verify that the email was sent by the domain owner and wasn't altered in transit.

### 3. DMARC (Domain-based Message Authentication, Reporting, and Conformance)
**DMARC** ties SPF and DKIM together. It tells receiving servers how to handle emails that fail SPF or DKIM checks.
*   **Syntax Example:** \`_dmarc.example.com IN TXT "v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com"\`
*   **Meaning:** If an email fails SPF/DKIM validation, the receiver must reject it (\`p=reject\`). Aggregated reports are sent to the specified email (\`rua\`).

---

## Troubleshooting Common DNS Issues

If your domain isn't resolving, you might be facing one of these typical issues:
*   **NXDOMAIN (Non-Existent Domain):** The domain does not exist or has expired. Check your domain registration status.
*   **SERVFAIL (Server Failure):** The authoritative nameservers failed to respond or there is a DNSSEC validation error. Check nameserver health.
*   **Incorrect CNAME Setup:** Setting a CNAME record on the root domain, causing other records (like MX) to stop functioning.
*   **Propagation Delay:** A recent DNS change is still propagating because old records are cached under a high TTL.

---

## SEO and Performance Impact of DNS

Your DNS configuration directly impacts search engine optimization (SEO) in several ways:
*   **Website Latency:** Slow DNS resolution increases Time to First Byte (TTFB). Slow sites are penalized by Google's Core Web Vitals ranking criteria.
*   **Site Availability:** If your DNS provider suffers downtime, search bots cannot crawl your site, leading to dropped rankings and indexation errors. Using a high-performance Anycast DNS network (like Cloudflare or Route 53) ensures 100% uptime.
*   **Domain Trust and Security:** Missing SPF, DKIM, or DMARC records can land your outgoing emails in spam folders, damage your domain reputation, and negatively affect search indexing if your domain gets blacklisted for phishing.
`,

  features: [
    "Lookup 10 core DNS record types concurrently (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA, SRV, PTR)",
    "Validates and inspects outbound email security configs (SPF strength, DMARC presence, DKIM selectability)",
    "Lightweight RDAP-based WHOIS analyzer for domain registration date, expiry, and registrar details",
    "Detects DNS hosting networks (Cloudflare, AWS Route 53, GoDaddy) and web host servers automatically",
    "Reverse DNS (PTR) scanner for looking up hostnames connected to specific IP addresses",
    "Secure Node.js-based resolution with SSRF checks, timeout handlers, and query isolation",
    "Allows sharing search results via URL query parameters (?domain=example.com)",
    "One-click reports download as formatted TXT file or raw JSON payload"
  ],

  useCases: [
    "Developers troubleshooting local network redirects and domain mappings",
    "System administrators auditing mail configurations to prevent domain spoofing",
    "SEO specialists diagnosing domain latency and checking DNSSEC/nameserver setups",
    "Web hosts migrating websites and checking global propagation status",
    "Security auditors scanning domains for missing SSL authorization (CAA records)"
  ],

  howToSteps: [
    "Enter a domain name (e.g., example.com) or an IP address in the search input field.",
    "Click the 'Query DNS' button to begin secure server-side inspection.",
    "Review the Overview cards showing nameserver and web hosting provider names.",
    "Navigate between the Record Tabs to examine individual record entries, TTLs, and priorities.",
    "Check the Security Diagnostics card for alerts on missing SPF or DMARC protection.",
    "Click the Export button to copy the table, download a raw JSON configuration, or save a TXT report."
  ],

  faq: [
    {
      question: "What is DNS lookup?",
      answer: "DNS lookup is the process of querying DNS servers to find the DNS records associated with a domain. This includes mapping domain names to IP addresses (A/AAAA records), finding mail servers (MX records), nameservers (NS), and security records (TXT/CAA)."
    },
    {
      question: "What is an A record?",
      answer: "An A record (Address record) maps a domain name to a physical IPv4 address of the web server hosting the website. It is the most common and essential DNS record type."
    },
    {
      question: "What is an MX record?",
      answer: "An MX record (Mail Exchanger record) points to the mail servers responsible for receiving emails sent to your domain. It includes a priority number; mail servers with lower priority numbers are tried first."
    },
    {
      question: "What is DNS propagation?",
      answer: "DNS propagation is the timeframe during which changes to DNS records spread globally across recursive resolver caches. Because resolvers store records based on their TTL, propagation can take anywhere from a few minutes up to 48 hours."
    },
    {
      question: "Why are TXT records important?",
      answer: "TXT records hold plain text strings associated with your domain. They are widely used for security verification, such as proving domain ownership to web consoles and configuring email frameworks like SPF, DKIM, and DMARC."
    },
    {
      question: "What is SPF?",
      answer: "SPF (Sender Policy Framework) is a DNS TXT record listing all the IP addresses and servers allowed to send emails from your domain. It prevents spammers from spoofing your domain name."
    },
    {
      question: "What is DKIM?",
      answer: "DKIM (DomainKeys Identified Mail) is an email security protocol that signs outbound emails cryptographically. The receiver uses the public key published in your DNS TXT record to verify the email's sender integrity."
    },
    {
      question: "What is DMARC?",
      answer: "DMARC (Domain-based Message Authentication, Reporting, and Conformance) is a DNS record that dictates how receivers should handle emails that fail SPF or DKIM checks. It can instruct receivers to monitor, quarantine, or reject unauthorized emails."
    },
    {
      question: "How long do DNS changes take?",
      answer: "DNS changes take as long as the TTL (Time-To-Live) set on the old record. A TTL of 3600 seconds means recursive servers cache the old record for 1 hour. Lowering the TTL before making changes can speed up propagation."
    },
    {
      question: "Why is my domain not resolving?",
      answer: "Domain resolution issues can occur due to propagation delays, expired domain registration, incorrect nameserver settings, server outages, DNSSEC mismatch, or setting conflicting records (like CNAME on root)."
    },
    {
      question: "What causes DNS issues?",
      answer: "Common causes of DNS errors include typo errors in IP addresses, duplicate conflicting records, missing MX/SPF entries, slow hosting providers, network cache lockups, and security firewalls blocking queries."
    },
    {
      question: "Can DNS affect SEO?",
      answer: "Yes, DNS performance affects SEO. Slow nameservers increase website latency (Time to First Byte), which degrades user experience and Core Web Vitals scores. Frequent DNS outages prevent search engine bots from index crawling your pages."
    }
  ],

  relatedTools: [
    { name: "HTTP Header Checker", slug: "http-header-checker" },
    { name: "Redirect Checker", slug: "redirect-checker" },
    { name: "Website Screenshot Tool", slug: "website-screenshot-tool" },
    { name: "Robots.txt Generator", slug: "robots-txt-generator" },
    { name: "Sitemap.xml Generator", slug: "sitemap-xml-generator" }
  ],

  examples: [
    {
      title: "Google Workspace Mail Setups",
      description: "Sample DNS query returns showing standard Google mail and SPF/DMARC records.",
      input: "google.com",
      output: "A Records:\n- 142.250.190.46 (TTL: 300)\nMX Records:\n- smtp.google.com (Priority: 10)\nTXT Records:\n- v=spf1 include:_spf.google.com ~all\n_dmarc.google.com TXT:\n- v=DMARC1; p=reject; rua=mailto:mailauth-reports@google.com"
    },
    {
      title: "Cloudflare Proxy Network Check",
      description: "Typical DNS configuration with Cloudflare proxy active, showing Anycast IPs and Nameservers.",
      input: "cloudflare.com",
      output: "A Records:\n- 104.16.124.96 (TTL: 300)\n- 104.16.123.96 (TTL: 300)\nNS Records:\n- ns3.cloudflare.com\n- ns4.cloudflare.com\n- ns5.cloudflare.com\nDNS Provider:\n- Cloudflare"
    },
    {
      title: "Reverse DNS IP Resolution",
      description: "Performing rDNS on a public DNS IP to identify its host controller.",
      input: "8.8.8.8",
      output: "PTR Records:\n- dns.google"
    }
  ]
};
