import { ToolConfig } from './types';

export const httpHeaderCheckerConfig: ToolConfig = {
  slug: "http-header-checker",
  title: "HTTP Header Checker & Security Analyzer",
  shortDescription: "Inspect and analyze HTTP response headers, verify CORS policies, test redirects, check SSL/HSTS configuration, and audit security headers in real-time.",
  category: "Web Dev Utilities",
  keywords: [
    "http header checker", "response header checker", "security header analyzer", "seo header checker",
    "cors checker", "website header inspector", "http response analyzer", "server header checker",
    "csp auditor", "hsts checker", "redirect checker", "http timing inspect", "gzip compression test"
  ],

  longDescription: `
## What are HTTP Headers?

When you browse the web, your browser communicates with web servers using **HTTP (Hypertext Transfer Protocol)**. This communication consists of requests (sent by your client/browser) and responses (sent back by the server). While the main payload of this exchange is typically HTML, CSS, JavaScript, or images, there is an invisible metadata envelope that accompanies every single request and response. These metadata packages are known as **HTTP Headers**.

HTTP headers are simple, colon-separated name-value pairs sent in cleartext at the beginning of an HTTP message. They enable the client and server to negotiate how to handle connection settings, security rules, caching behavior, content formats, and session states. Without HTTP headers, browsers wouldn't know how to render websites, secure connections, or cache files efficiently.

---

## Request vs. Response Headers

HTTP headers are broadly divided into two categories depending on which direction the metadata is traveling:

### 1. Request Headers
These are sent by the client (browser or API client) to the server. They provide context about the client's system, preferences, and authorization credentials. Common request headers include:
* **\`User-Agent\`**: Identifies the client browser, operating system, and rendering engine.
* **\`Accept-Encoding\`**: Informs the server which compression algorithms (like Gzip or Brotli) the client supports.
* **\`Authorization\`**: Passes credentials (like Bearer tokens or Basic auth) to authenticate the client.
* **\`Cookie\`**: Sends saved state cookies back to the server to maintain sessions.

### 2. Response Headers
These are sent by the server back to the client. They contain metadata about the resource being delivered, the server application itself, and security restrictions. Examples include:
* **\`Content-Type\`**: Tells the browser if it's receiving an HTML file, a JSON payload, or a JPEG image (e.g., \`text/html; charset=UTF-8\`).
* **\`Cache-Control\`**: Controls how long the browser should store the file locally before asking the server for updates.
* **\`Strict-Transport-Security\`**: Mandates that the browser only communicate with the website over secure HTTPS.

---

## Why HTTP Headers Matter

HTTP headers form the backbone of modern web operations. A misconfigured header can lead to critical failures in three primary areas:

1. **Security**: Missing headers (like \`Content-Security-Policy\`) can expose a website to Cross-Site Scripting (XSS), clickjacking, and mime-type sniffing attacks.
2. **Performance**: Inefficient cache headers cause browsers to re-download unchanged static assets on every page load, bloating bandwith consumption and slowing down user experiences.
3. **SEO & Crawlability**: If search engines encounter incorrect redirect headers (e.g., a temporary 302 redirect instead of a permanent 301), crawl budget is wasted, and index authority can become diluted.

---

## Security Headers Explained

Security headers are specific HTTP response directives that instruct the browser to activate built-in defense frameworks. Here is a summary of the most critical security headers:

### Content-Security-Policy (CSP)
CSP is the ultimate defense against Cross-Site Scripting (XSS) and data injection attacks. It restricts the origins from which the browser is allowed to load scripts, stylesheets, images, and frames. A strict CSP prevents attackers from running unauthorized malicious code on your site.

### Strict-Transport-Security (HSTS)
HSTS ensures that a website can never be loaded over an unencrypted HTTP connection. Once a browser receives this header, it automatically converts all future HTTP requests to HTTPS, protecting users against man-in-the-middle (MITM) and SSL-stripping attacks.

### X-Frame-Options (XFO)
XFO prevents your website from being embedded inside an \`<iframe>\` or \`<frame>\` on other domains. This blocks clickjacking attacks, where an attacker overlays invisible elements of your site on a malicious page to trick users into clicking buttons they didn't intend to.

### X-Content-Type-Options (XCTO)
This header forces the browser to strictly adhere to the \`Content-Type\` header sent by the server. Setting \`X-Content-Type-Options: nosniff\` prevents browsers from guessing (sniffing) the mime-type of a file, blocking attacks where a user uploads a malicious script disguised as a harmless image.

### Referrer-Policy
Referrer-Policy controls how much information (such as the full path or query parameters) is passed in the \`Referer\` request header when a user clicks a link that leaves your website. Setting this protects user privacy.

### Permissions-Policy
Formerly known as Feature-Policy, this header allows you to control which hardware and browser APIs (like the camera, microphone, geolocation, or USB devices) can be accessed by the website and nested iframes.

---

## SEO Impact of HTTP Headers

Search engine crawlers (like Googlebot) evaluate response headers to understand how they should index your content.

* **Canonical Headers**: While canonical tags are usually placed in HTML metadata, you can also serve them as HTTP headers (e.g., \`Link: <https://example.com/page>; rel="canonical"\`). This is highly useful for indexing non-HTML files like PDFs.
* **X-Robots-Tag**: Like the robots meta tag, this header instructs search engine crawlers whether they can index a page or follow links. For example, \`X-Robots-Tag: noindex, nofollow\` blocks search engines from scanning administrative routes or file downloads.
* **Redirection Statuses**: Google consolidates link juice (ranking authority) differently depending on redirect headers. 301 redirects pass ranking value, whereas 302 redirects indicate temporary relocations and retain authority on the original URL.

---

## CORS (Cross-Origin Resource Sharing) Headers

CORS is a browser security mechanism that blocks scripts running on one domain from fetching APIs or resources on another domain. To bypass this restriction safely, servers return specific CORS response headers:

| Header | Purpose | Example |
| :--- | :--- | :--- |
| **\`Access-Control-Allow-Origin\`** | Specifies which domains are allowed to access the API. | \`Access-Control-Allow-Origin: https://myclient.com\` |
| **\`Access-Control-Allow-Methods\`** | Declares HTTP verbs allowed during the request. | \`Access-Control-Allow-Methods: GET, POST, OPTIONS\` |
| **\`Access-Control-Allow-Headers\`** | Defines headers permitted in the actual API call. | \`Access-Control-Allow-Headers: Content-Type, Authorization\` |

---

## Cache-Control Best Practices

Caching headers determine how browsers and Content Delivery Networks (CDNs) store static resources.

* **\`Cache-Control: max-age=31536000, immutable\`**: Ideal for versioned static assets (like Webpack or Vite JS/CSS bundles). Instructs the browser to store the file for a full year without checking for updates.
* **\`Cache-Control: no-cache, no-store, must-revalidate\`**: Essential for dynamic dashboards, user settings, or API endpoints. Tells the browser never to store the response and to fetch fresh data every time.
* **\`Vary\`**: Informs caches that the response changes depending on client request headers (e.g., \`Vary: Accept-Encoding\` ensures that Gzipped responses are not served to browsers that cannot decompress them).

---

## Compression Headers

Serving uncompressed assets degrades page speeds. Web servers use compression headers to deliver lightweight, compressed assets over the network:

* **\`Content-Encoding\`**: Identifies the algorithm used to compress the response payload. The most popular are **Brotli** (\`br\`) and **Gzip** (\`gzip\`). Brotli provides up to 20% better compression than Gzip for text assets.
* **\`Transfer-Encoding\`**: Used to stream data chunks safely (e.g., \`Transfer-Encoding: chunked\`), enabling the browser to start rendering the top of a page before the server has finished building the entire response.

---

## HTTP/1.1 vs. HTTP/2 vs. HTTP/3

The protocol version used to negotiate headers determines network concurrency:

1. **HTTP/1.1 (1997)**: Uses text-based headers and suffers from "head-of-line blocking," where a browser can only request a limited number of files concurrently over a single TCP connection.
2. **HTTP/2 (2015)**: Introduces binary framing and header compression (**HPACK**). Allows multiplexing, letting browsers request hundreds of files simultaneously over a single connection.
3. **HTTP/3 (2020)**: Replaces TCP with **QUIC** (UDP-based). Minimizes handshake latency and solves packet loss blockage, keeping headers and payloads flowing smoothly on unstable mobile networks.

---

## Server Hardening and Common Mistakes

Many developers inadvertently leak sensitive server details through default header configurations.

### 1. Leakage of Server Signatures
By default, platforms like IIS, Apache, and Nginx append explicit signatures:
* \`Server: nginx/1.18.0 (Ubuntu)\`
* \`X-Powered-By: PHP/7.4.3\`
* \`X-AspNet-Version: 4.0.30319\`

*Fix*: Turn off server tokens in Nginx (\`server_tokens off;\`), strip headers in Apache, or remove PHP signatures (\`expose_php = Off\` in \`php.ini\`). Leaking version details makes it easy for attackers to scan for known CVE security exploits.

### 2. Improper HTTPS Redirection
Failing to redirect traffic immediately to HTTPS, or setting a 302 temporary redirect instead of a 301 permanent redirect, leaves connections vulnerable to sniffing and splits SEO link authority.

### 3. Weak CSP Directives
Using \`unsafe-inline\` or \`*\` wildcards in a Content Security Policy bypasses the security benefits, leaving your site exposed to malicious inline script injections.

---

## Header Debugging Workflow

To audit and optimize your site's headers, follow this best-practice checklist:
1. **Analyze Response Codes**: Confirm that successful loads return a \`200 OK\` status and redirects map to proper paths (e.g. \`301 Moved Permanently\`).
2. **Review Caching Policies**: Ensure static assets have long cache expiration times and dynamic endpoints block storage.
3. **Audit Security Grades**: Check for the presence of CSP, HSTS, XFO, and XCTO headers.
4. **Inspect CORS Declarations**: Make sure origins are locked down to specific domains rather than wildcards (\`*\`) unless the API is meant to be completely public.
5. **Verify Compression**: Validate that payloads are served with \`Content-Encoding: br\` or \`gzip\` to minimize byte transfer sizes.
`,

  features: [
    "Checks responses over secure HTTP and HTTPS connections safely",
    "Analyzes security compliance for CSP, HSTS, XFO, Referrer-Policy, and Permissions-Policy",
    "Traces redirect chains step-by-step to identify circular loops and redirect hops",
    "Parses and audits cookies for security flags (Secure, HttpOnly, SameSite, Expiry)",
    "Measures response timing latency and displays HTTP protocol versions",
    "Validates caching policies and detects Gzip, Brotli, or Deflate compression",
    "Enables side-by-side comparison of headers from two different URLs or configurations",
    "Generates command templates for curl, javascript fetch, and python requests"
  ],

  useCases: [
    "Security engineers auditing websites for missing security headers",
    "SEO specialists inspecting redirect chains and X-Robots indexing tags",
    "Backend developers checking CORS header compliance during API integrations",
    "Frontend engineers verifying Cache-Control behavior and bundle gzip compression",
    "DevOps engineers hardening server signatures (Nginx/Apache) to prevent version leaks",
    "Debugging local APIs or web apps safely using custom headers and methods"
  ],

  howToSteps: [
    "Enter the target URL (e.g., https://example.com) in the address input field.",
    "Choose the HTTP Request Method (GET to analyze full responses, HEAD for headers only).",
    "Select a User-Agent template (Desktop Chrome, Mobile Safari, Googlebot, or Custom).",
    "Click 'Check Headers' to trigger the secure server-side analysis.",
    "Review the Header Grades (Security, SEO, Caching) and timing breakdown.",
    "Click tabs (Security, Cookies, Raw Headers) to inspect specific categories.",
    "Use the Compare URLs tab to perform a side-by-side comparison of two configurations.",
    "Copy the results, download the JSON payload, or export the report as a TXT file."
  ],

  faq: [
    {
      question: "Why can't I check HTTP headers directly from my browser using JavaScript?",
      answer: "Browsers enforce a security mechanism called CORS (Cross-Origin Resource Sharing). If you attempt to make a JavaScript fetch request to a third-party domain from your browser, the browser blocks access to the response headers unless the target server explicitly sends CORS headers permitting it. To solve this, our tool performs the request securely on our server-side backend, parses the headers, and sends them back to your browser."
    },
    {
      question: "How is my URL checked safely against SSRF vulnerabilities?",
      answer: "Server-Side Request Forgery (SSRF) is an exploit where an attacker forces a server to perform HTTP requests to local, private, or internal systems. Our backend implements strict URL checking: it rejects non-web protocols, resolves the hostname DNS, and blocks private IP ranges (like RFC 1918 subnets, localhost, loopbacks, and link-locals) before initiating the request."
    },
    {
      question: "What is the difference between GET and HEAD requests in this tool?",
      answer: "A GET request asks the server to return both the response headers and the body payload (e.g. the HTML text). A HEAD request asks the server to return only the response headers, without downloading the actual content. HEAD requests are faster and save bandwidth, which makes them ideal for quickly verifying header configurations."
    },
    {
      question: "What does a 'Missing Strict-Transport-Security (HSTS)' warning mean?",
      answer: "HSTS (Strict-Transport-Security) tells the browser that the website should only be accessed using HTTPS. If this header is missing, a user could theoretically access your site over an insecure HTTP connection, leaving them vulnerable to session hijacking or SSL stripping attacks."
    },
    {
      question: "How do I hide my Nginx or Apache server version from HTTP headers?",
      answer: "Leaking server software versions gives hackers easy access to known vulnerabilities. In Nginx, add 'server_tokens off;' to your HTTP config blocks. In Apache, set 'ServerTokens ProductOnly' and 'ServerSignature Off' in your configuration file. In PHP, set 'expose_php = Off' in php.ini."
    }
  ],

  relatedTools: [
    { name: "Responsive Screen Tester", slug: "responsive-screen-tester" },
    { name: ".htaccess Generator", slug: "htaccess-generator" },
    { name: "Robots.txt Generator", slug: "robots-txt-generator" },
    { name: "Sitemap.xml Generator", slug: "sitemap-xml-generator" }
  ],

  examples: [
    {
      title: "Secure Production Site Header",
      description: "Typical headers returned by a highly hardened web server.",
      input: "URL: https://nexuscalculator.net, Method: HEAD",
      output: "Content-Type: text/html; charset=utf-8\nStrict-Transport-Security: max-age=63072000; includeSubDomains; preload\nContent-Security-Policy: default-src 'self' ...\nX-Frame-Options: DENY\nX-Content-Type-Options: nosniff\nReferrer-Policy: strict-origin-when-cross-origin"
    },
    {
      title: "Standard HTTP to HTTPS Redirect",
      description: "Redirect tracing sequence showing canonical path resolution.",
      input: "URL: http://github.com, Method: GET",
      output: "Step 1: http://github.com -> 301 Moved Permanently (Location: https://github.com/)\nStep 2: https://github.com/ -> 200 OK\nFinal: https://github.com/"
    },
    {
      title: "API Endpoint Response headers",
      description: "CORS and cache validation settings for a public REST API.",
      input: "URL: https://api.github.com, Method: GET",
      output: "Access-Control-Allow-Origin: *\nAccess-Control-Expose-Headers: ETag, Link, RateLimit-Limit...\nCache-Control: public, max-age=60, s-maxage=60\nContent-Type: application/json; charset=utf-8"
    }
  ]
};
