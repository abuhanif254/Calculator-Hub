import { ToolConfig } from './types';

export const redirectCheckerConfig: ToolConfig = {
  slug: "redirect-checker",
  title: "Redirect Checker & SEO Chain Analyzer",
  shortDescription: "Trace the path of redirected URLs, inspect 301/302 status codes, analyze response times, detect circular loops, find canonical mismatches, and view raw HTTP headers.",
  category: "Web Dev Utilities",
  keywords: [
    "redirect checker", "redirect tracer", "301 redirect checker", "302 redirect tracer",
    "redirect chain analyzer", "canonical mismatch checker", "meta refresh checker",
    "http redirect audit", "redirect loop detector", "website redirect tracker"
  ],

  longDescription: `
## Introduction to HTTP Redirections

An **HTTP redirect** is a mechanism used by web servers to forward a client (such as a browser or search engine crawler) from one URL to another. Whenever a resource is moved, restructured, or renamed, redirects are essential to keep the web functional. They prevent broken links (404 errors), maintain search engine indexing authority, and guide visitors to the correct destination.

However, behind the scenes, redirects introduce extra network roundtrips. When misconfigured, they can form long **redirect chains** or infinite **redirect loops**, which drastically slow down web performance, waste crawler budgets, and degrade search engine optimization (SEO) performance. This developer tool allows you to trace redirections step-by-step, inspect the underlying headers, and analyze SEO health.

---

## How Redirections Work Under the Hood

When you enter a URL in a browser, the browser makes an HTTP request to the server. If the server decides that the requested resource resides elsewhere, it returns a special **3xx redirect status code** along with a **Location** header. The Location header specifies the target URL.

The process follows these steps:
1. **Client Request:** The client sends an HTTP GET request to \`http://example.com\`.
2. **Server Response:** The server responds with an HTTP status code \`301 Moved Permanently\` and header \`Location: https://example.com/\`.
3. **Subsequent Request:** The client reads the Location header and immediately sends a new request to the new URL \`https://example.com/\`.
4. **Final Response:** The server processes the new request and returns \`200 OK\` along with the HTML payload.

This complete cycle represents a single **redirect hop**. If the second URL redirects to a third URL, it creates a redirect chain.

---

## 301 vs. 302 vs. 307 vs. 308: Choosing the Right Status Code

Not all redirects are created equal. Using the wrong HTTP status code can mislead search engine crawlers and negatively impact user flow. The most common redirect status codes are categorized by their permanence and how they handle HTTP methods:

### 1. Permanent Redirects
Permanent redirects inform clients that the target resource has been relocated indefinitely. Search engines transfer the link equity (often called "link juice") from the old URL to the new one.

* **301 Moved Permanently:** The original standard for permanent redirects. Historically, when a browser receives a 301, it is allowed to change the request method from POST to GET on the subsequent request. This is the most common status code used for domain migrations and URL restructuring.
* **308 Permanent Redirect:** The modern equivalent of 301. It mandates that the request method *must not* change. If the original request was a POST containing payload data, the browser must resend that POST request to the new location.

### 2. Temporary Redirects
Temporary redirects indicate that the resource is temporarily located at a different URL. Search engines are instructed to keep the original URL indexed and not to transfer link equity, as the relocation is expected to revert.

* **302 Found (Temporary Redirect):** The original temporary redirect standard. Similar to 301, browsers often change POST requests to GET on the redirected request, which can cause unexpected behavior during form submissions.
* **307 Temporary Redirect:** The modern equivalent of 302. It enforces that the request method and payload *must not* change on subsequent requests, ensuring transaction data remains secure.

### Comparison Table of Redirection Codes

| Status Code | Meaning | Type | Method Preserved | Link Equity Transferred |
| :--- | :--- | :--- | :--- | :--- |
| **301** | Moved Permanently | Permanent | No (may change to GET) | Yes (~90-99%) |
| **308** | Permanent Redirect | Permanent | Yes (strictly preserved) | Yes (~90-99%) |
| **302** | Found | Temporary | No (may change to GET) | No |
| **307** | Temporary Redirect | Temporary | Yes (strictly preserved) | No |

---

## Hidden Redirection Types: Client-Side Redirects

While standard redirects happen at the HTTP network level, redirects can also happen after the HTML payload has been sent to the browser. These are called **client-side redirects**:

### 1. HTML Meta Refresh Redirects
A meta refresh tag is a directive placed inside the \`<head>\` of an HTML document. It instructs the browser to reload the page or load a new URL after a specified delay.
Example:
\`\`\`html
<meta http-equiv="refresh" content="3; url=https://example.com/new-page">
\`\`\`
*SEO Impact:* Search engines generally discourage meta refresh redirects because they disrupt the user experience (especially when set with a delay) and are sometimes associated with spam tactics (doorway pages). If the delay is 0 seconds, search engines may treat it similarly to a 301 redirect, but HTTP-level redirects are always preferred.

### 2. JavaScript Redirections
JavaScript can trigger redirection by modifying the window location object.
Example:
\`\`\`javascript
window.location.href = "https://example.com/new-page";
// Or
window.location.replace("https://example.com/new-page");
\`\`\`
*SEO Impact:* While modern search engine crawlers (such as Googlebot) are highly advanced and execute JavaScript, they might not run scripts on every crawl due to resource limitations. If Googlebot fails to execute the script, the redirect will go unnoticed, leading to indexing errors. JavaScript redirects should only be used when HTTP redirects are impossible.

---

## The SEO and Performance Pitfalls of Bad Redirects

Poorly implemented redirects are a major source of crawl inefficiency and user frustration. The main issues include:

### 1. Redirect Chains
A redirect chain occurs when a URL redirects to another URL, which in turn redirects to another, and so on (e.g., A → B → C → D). 
* **Wasted Crawl Budget:** Search engines assign a crawl budget to every site. Each hop in a chain consumes a request, leaving fewer resources to discover new content.
* **Link Equity Loss:** While modern search engines are better at preserving authority, research shows that ranking power decays slightly with each redirect hop.
* **Latency:** Each hop adds DNS lookups, TCP handshakes, TLS negotiations, and server processing times. A chain of 4-5 redirects can easily add 2-3 seconds of delay.

### 2. Redirect Loops
A redirect loop is a circular sequence of redirects where a URL points back to an earlier URL in the chain (e.g., A → B → C → A). 
* **User Impact:** Browsers will attempt to follow the redirects until they reach a threshold (usually 10-20 hops) and display an error page (e.g., "ERR_TOO_MANY_REDIRECTS").
* **Crawler Impact:** Search engines will abandon the crawl entirely, flag the URL as broken, and eventually remove it from search results.

### 3. Canonical Mismatches
The **canonical tag** (\`<link rel="canonical" href="...">\`) tells search engines which version of a URL is the master version. A canonical mismatch occurs when the final URL of a redirect chain declares a *different* URL as canonical, or if a redirect points to a canonical URL that redirects elsewhere.
This creates indexing confusion, split ranking signals, and duplicate content flags. The final destination URL of a redirect should always point to a self-referential canonical URL.

---

## Technical Guide: Implementing Clean Redirects

### 1. Apache Configuration (\`.htaccess\`)
Apache uses the \`mod_rewrite\` engine for URL manipulation. Make sure to specify the \`R=301\` flag for permanent redirects:
\`\`\`apache
# Redirect single page
Redirect 301 /old-page.html /new-page.html

# Force HTTPS and WWW
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteRule ^(.*)$ https://www.example.com/$1 [L,R=301]
\`\`\`

### 2. Nginx Configuration
Nginx uses server blocks to handle redirections. It is highly efficient:
\`\`\`nginx
# Redirect single page
location = /old-page {
    return 301 /new-page;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://example.com$request_uri;
}
\`\`\`

### 3. Next.js Configuration (\`next.config.ts\`)
Next.js provides a built-in redirects array in its configuration:
\`\`\`typescript
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/old-path/:slug',
        destination: '/new-path/:slug',
        permanent: true, // Returns 308 (Permanent Redirect)
      },
    ];
  },
};

export default nextConfig;
\`\`\`

### 4. Cloudflare Page Rules
Cloudflare lets you manage redirects at the edge without hitting your server:
1. Go to **Rules** > **Page Rules** in the Cloudflare Dashboard.
2. Create a rule matching: \`http://*example.com/*\`
3. Select setting: **Forwarding URL**
4. Status Code: **301 - Permanent Redirect**
5. Destination URL: \`https://example.com/$2\`
`,

  features: [
    "Traces redirect chains up to 10 hops recursively",
    "Identifies response codes (301, 302, 307, 308, 200, 404, etc.)",
    "Detects client-side redirects (HTML Meta Refresh and JS redirects)",
    "Audits canonical metadata matching for SEO compliance",
    "Identifies insecure HTTP-to-HTTPS fallback steps",
    "Extracts crucial response headers (Cache-Control, X-Robots-Tag, Server)",
    "Guards against Server-Side Request Forgery (SSRF) and private IP ranges",
    "Allows custom User-Agent selection to inspect crawler-specific redirects"
  ],

  useCases: [
    "SEO specialists tracing link equity decay and canonical inconsistencies",
    "Web developers auditing domain migration rules and redirect behaviors",
    "Security professionals testing for SSL strip actions and insecure redirections",
    "Site administrators locating circular loops causing browser crash errors",
    "Content managers verifying legacy URLs resolve correctly post-restructuring"
  ],

  howToSteps: [
    "Input your starting URL (e.g., example.com) in the address input box.",
    "Select a User-Agent from the dropdown (Desktop Chrome, Googlebot, or Bingbot).",
    "Click 'Analyze Redirects' to launch the secure trace.",
    "Observe the chain flowchart showing status codes and roundtrip latency times.",
    "Check the SEO diagnostics panel for issues like chains, loops, or insecure hops.",
    "Open the accordion for any hop to view detailed HTTP headers and cookie profiles.",
    "Download the redirect trace report as a JSON or TXT file for documentation."
  ],

  faq: [
    {
      question: "Why should I care about redirect chain lengths?",
      answer: "Every redirect hop adds latency, as the browser has to make a brand-new connection request. Additionally, search engine crawlers (like Googlebot) have a limited amount of time to crawl your site. If they encounter chains longer than 3-4 hops, they may stop following the chain, resulting in indexation failure."
    },
    {
      question: "Can this tool detect JavaScript redirections?",
      answer: "Yes, our tool performs a best-effort HTML parser match. If the server returns a 200 OK but contains script elements setting window.location.href or utilizing location.replace(), the parser extracts the target URL and treats it as a client-side JavaScript redirect hop."
    },
    {
      question: "What is a canonical mismatch warning?",
      answer: "A canonical mismatch occurs when the final URL reached in the redirect chain points to a different URL in its canonical metadata link. Search engines use canonical links to identify the master source page. If it doesn't match the URL, search engines can get confused, potentially leading to indexing issues."
    },
    {
      question: "How does the tool prevent Server-Side Request Forgery (SSRF)?",
      answer: "To secure our servers, the backend resolves the target domain's DNS and verifies the matching IP address. If the IP address falls into a private network range (like localhost, loopbacks, link-locals, or private subnets defined in RFC 1918), the backend blocks the connection."
    },
    {
      question: "What is the difference between a 301 and a 308 redirect?",
      answer: "Both represent permanent redirects. However, under a 301 redirect, browsers are historically permitted to convert a POST request into a GET request on the redirected URL. Under a 308 redirect, the browser is strictly forbidden from changing the request method or payload."
    }
  ],

  relatedTools: [
    { name: "HTTP Header Checker", slug: "http-header-checker" },
    { name: "Robots.txt Generator", slug: "robots-txt-generator" },
    { name: "Sitemap.xml Generator", slug: "sitemap-xml-generator" },
    { name: ".htaccess Generator", slug: "htaccess-generator" }
  ],

  examples: [
    {
      title: "Secure Domain Force",
      description: "Typical secure trace configuration forcing HTTPS and trailing slash removal.",
      input: "http://nexuscalculator.net",
      output: "Step 1: http://nexuscalculator.net -> 301 Moved Permanently\nStep 2: https://nexuscalculator.net/ -> 200 OK (Final Destination)"
    },
    {
      title: "Subfolder and Path Remap",
      description: "Redirect tracking sequence remapping a blog directory.",
      input: "https://example.com/blog",
      output: "Step 1: https://example.com/blog -> 302 Found\nStep 2: https://example.com/news/ -> 200 OK (Final Destination)"
    },
    {
      title: "Circular Loop Detection",
      description: "Traces a recursive circular loop until blocked to prevent server overload.",
      input: "https://example.com/loop1",
      output: "Step 1: https://example.com/loop1 -> 301 Moved Permanently (Location: /loop2)\nStep 2: https://example.com/loop2 -> 301 Moved Permanently (Location: /loop1)\nResult: Circular Redirect Loop Detected (Aborted)"
    }
  ]
};
