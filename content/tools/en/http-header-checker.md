---
metaTitle: "HTTP Header Checker — Security, CORS, Cache & Redirects"
metaDescription: "Inspect live HTTP response headers, trace up to 5 redirect hops, audit CSP, HSTS, cookies, CORS, and Brotli/Gzip caching with instant scoring."
metaKeywords: "http header checker, response header checker, security header analyzer, seo header checker, cors checker, website header inspector, http response analyzer, server header checker, csp auditor, hsts checker, redirect checker, http timing inspect"
title: "HTTP Header Checker & Security Analyzer"
shortDescription: "Inspect and analyze HTTP response headers, verify CORS policies, test redirects, check SSL/HSTS configuration, and audit security headers in real-time."
faqs:
  - question: "Why cannot client-side browser JavaScript read all HTTP response headers of a remote website?"
    answer: "The Fetch standard enforces the Same-Origin Policy and exposes only CORS-safelisted response headers (such as Content-Type and Cache-Control) unless the target explicitly lists extra headers in Access-Control-Expose-Headers. Running the probe through an SSRF-hardened server route captures every raw header, Set-Cookie directive, and 3xx redirect hop."
  - question: "What is the difference between HTTP 301/302 and 307/308 redirects?"
    answer: "Under RFC 9110 Section 15.4, user agents historically rewrote POST requests into GET requests when following 301 or 302 redirects. Status codes 307 (Temporary Redirect) and 308 (Permanent Redirect) strictly forbid changing the HTTP method or body, making them essential for API endpoints and form submissions."
  - question: "Why does Access-Control-Allow-Origin: * fail when a frontend sends cookies or credentials?"
    answer: "The Fetch specification prohibits combining the wildcard origin '*' with Access-Control-Allow-Credentials: true because doing so would allow any arbitrary site to issue authenticated requests on a user's behalf. Servers handling credentialed requests must echo an allowlisted Origin header dynamically and include Vary: Origin."
  - question: "Why does missing Vary: Accept-Encoding cause problems when Brotli or Gzip is enabled?"
    answer: "Shared CDNs and reverse proxies key cached responses by URL plus headers listed in Vary. Without Vary: Accept-Encoding, a cache that stores a Brotli-compressed object for one browser could mistakenly serve binary compressed bytes to a legacy client or bot that only requested uncompressed text."
  - question: "What makes Cache-Control: no-cache different from Cache-Control: no-store?"
    answer: "Despite its name, no-cache permits browsers and proxies to store a response copy locally as long as they revalidate it with the origin via ETag or Last-Modified before reuse. By contrast, no-store forbids writing the response to volatile or disk caches altogether and should be used for sensitive banking, auth, or PII endpoints."
features:
  - "Manual hop-by-hop redirect tracing (up to 5 hops) with per-hop latency measurements and circular-loop detection"
  - "Weighted security header scoring auditing CSP, HSTS, X-Frame-Options, XCTO, Referrer-Policy, Permissions-Policy, and server banner leaks"
  - "Granular Set-Cookie attribute parsing checking Secure, HttpOnly, SameSite, Expires, and Max-Age directives across multiple cookies"
  - "SEO and crawlability header verification covering X-Robots-Tag, HTTP Link rel=canonical, HTTPS upgrades, and Vary: Accept-Encoding"
  - "Caching and payload compression diagnostics inspecting Cache-Control directives, ETag/Last-Modified validators, and Brotli/Gzip encoding"
  - "Customizable GET/HEAD request methods and User-Agent overrides protected by per-hop DNS and SSRF private-IP filtering"
useCases:
  - "Validating newly deployed Content-Security-Policy and Strict-Transport-Security headers before enabling HSTS preloading"
  - "Debugging broken cross-origin API calls by checking Access-Control-Allow-Origin, Methods, and Headers directly on live endpoints"
  - "Auditing CDN cache-hit behavior, immutable asset lifetimes, and conditional ETag validation after modifying reverse-proxy rules"
  - "Verifying that legacy HTTP and www URLs resolve cleanly to canonical HTTPS destinations without redirect loops"
  - "Confirming that authentication Set-Cookie headers enforce HttpOnly, Secure, and appropriate SameSite flags in production"
  - "Checking X-Robots-Tag and HTTP Link canonical headers on non-HTML assets like PDFs, images, and API feeds for technical SEO"
howToSteps:
  - "Paste any public HTTP or HTTPS URL into the target field; missing schemes default automatically to HTTPS."
  - "Select GET or HEAD as the probe method and optionally override the User-Agent string to mimic desktop, mobile, or crawler clients."
  - "Run the inspection to follow redirects manually hop by hop while recording status codes, response times, and raw headers."
  - "Review the Security, SEO, and Performance scorecards to spot missing hardening headers, unsafe CSP wildcards, or uncompressed payloads."
  - "Expand the Cookies, CORS, and Raw Headers panels to verify Set-Cookie security flags and cross-origin access directives."
  - "Re-test immediately after updating Nginx, Apache, Cloudflare, or application middleware rules to confirm header compliance."
---

Every HTTP exchange starts with a status line and a block of colon-delimited header fields governed by RFC 9110 (HTTP Semantics). Those response headers dictate browser security boundaries, TLS downgrade protection, cross-origin script access, CDN caching efficiency, and search engine indexing behavior—often overriding HTML `<meta>` tags inside the document body. Because browser `fetch()` APIs mask `Set-Cookie` headers and strip non-safelisted cross-origin fields under CORS rules, inspecting a remote endpoint faithfully requires a live server-side HTTP probe that captures each redirect hop and raw header line intact.

## Security Header Hardening and Scoring Benchmarks

Modern browsers ship powerful exploit-mitigation engines that remain dormant unless an origin opts in through explicit response headers. Auditing these directives catches misconfigurations such as permissive `'unsafe-inline'` CSP fallbacks or leaky `Server` and `X-Powered-By` banners that advertise exact software versions to automated scanners.

| Response Header | Spec / Standard | Recommended Production Baseline | Primary Threat Mitigated |
| :--- | :--- | :--- | :--- |
| `Content-Security-Policy` | W3C CSP Level 3 | `default-src 'self'; script-src 'self' 'nonce-{rand}'; object-src 'none'; frame-ancestors 'none'` | Cross-Site Scripting (XSS), inline script injection, data exfiltration. |
| `Strict-Transport-Security` | RFC 6797 | `max-age=31536000; includeSubDomains; preload` | SSL-stripping and man-in-the-middle HTTP protocol downgrades. |
| `X-Frame-Options` | RFC 7034 | `DENY` or `SAMEORIGIN` (paired with CSP `frame-ancestors`) | UI redressing and cross-origin iframe clickjacking overlays. |
| `X-Content-Type-Options` | Fetch Standard | `nosniff` | Drive-by MIME sniffing executing uploaded text/images as JavaScript. |
| `Referrer-Policy` | W3C Referrer Policy | `strict-origin-when-cross-origin` | Leakage of sensitive URL paths or reset tokens in outbound `Referer` headers. |
| `Permissions-Policy` | W3C Permissions Policy | `camera=(), microphone=(), geolocation=()` | Unauthorized third-party iframe access to browser hardware sensors. |
| `Set-Cookie` Flags | RFC 6265bis | `Secure; HttpOnly; SameSite=Lax; Path=/` | Cookie theft via XSS (`HttpOnly`), plaintext sniffing (`Secure`), and CSRF (`SameSite`). |

Pay particular attention to `Set-Cookie` parsing when an endpoint sets multiple cookies in one response: naive string splitting on commas breaks on `Expires=Thu, 19 Nov 2026 ...` dates. Compliant HTTP clients read each `Set-Cookie` header field independently via `headers.getSetCookie()`.

## Tracing Redirect Chains and Status-Code Method Semantics

When a client follows redirects silently, intermediate headers disappear—hiding unnecessary 302 hops, missing `http://` to `https://` upgrades, or `Set-Cookie` writes dropped along the chain. Running requests in manual redirect mode exposes every intermediate status code, `Location` target, and per-hop latency.

Understanding RFC 9110 §15.4 redirect semantics prevents subtle SEO and API bugs:
- **`301 Moved Permanently` vs. `308 Permanent Redirect`**: Both signal search engines to consolidate canonical signals onto the target URL, but `301` permits clients to convert `POST` to `GET`, whereas `308` guarantees method and body preservation.
- **`302 Found` vs. `307 Temporary Redirect`**: Both indicate temporary relocation; `307` preserves non-GET methods strictly.
- **Circular Loop & SSRF Guards**: A production inspector must re-resolve DNS and block private RFC 1918, loopback (`127.0.0.0/8`, `::1`), and link-local destinations on *every* hop—not just the initial URL—because an attacker can host a public URL that returns `302 Location: http://169.254.169.254/`.

For dedicated multi-hop link audits across canonical matrices, pair this tool with the [Redirect Checker](/en/tools/redirect-checker), or verify the underlying host resolution first in our [DNS Lookup Tool](/en/tools/dns-lookup).

## Caching Validators, Compression, and CORS Preflight Pitfalls

### Freshness, Revalidation, and Vary Keys

High-throughput web applications balance cache hit rates against stale content using two RFC 9111 mechanisms:
1. **Freshness Lifetimes**: Content-hashed static bundles (for example `app.9f3a2c.js`) should ship `Cache-Control: public, max-age=31536000, immutable`, eliminating conditional network round-trips entirely. HTML documents and dynamic APIs should rely on `Cache-Control: no-cache` (store, but revalidate before reuse) or `private, no-store` (never persist sensitive payloads).
2. **Conditional Validators**: Returning a strong `ETag: "a84f91c2"` (or weak `W/"..."` when byte-for-byte identity changes under dynamic compression) alongside `Last-Modified` enables clients to send `If-None-Match` and receive lightweight `304 Not Modified` responses.
3. **Compression & `Vary`**: Serving Brotli (`Content-Encoding: br`) typically shrinks text assets 15–20% further than `gzip`, but always pair compression with `Vary: Accept-Encoding` so CDN edge caches segregate compressed and uncompressed variants cleanly.

### Diagnosing Cross-Origin Resource Sharing (CORS) and SEO Directives

When a browser initiates a cross-origin request with custom headers (such as `Authorization` or `Content-Type: application/json`), it transmits an `OPTIONS` preflight first. Common production failures surface immediately during header inspection: returning `Access-Control-Allow-Origin: *` breaks credentialed `fetch(..., { credentials: 'include' })` calls, omitting `Access-Control-Expose-Headers` hides custom rate-limit or pagination headers from frontend JavaScript even when they arrive on the wire, and failing to emit `Access-Control-Max-Age` forces browsers to repeat preflight round-trips before every API mutation.

Response headers also govern search engine crawl directives independently of HTML `<head>` markup. For binary assets such as PDF brochures, downloadable archives, or JSON feeds where `<meta name="robots">` cannot be embedded, servers emit `X-Robots-Tag: noindex, nofollow` to prevent accidental search indexing and `Link: <https://example.com/guide>; rel="canonical"` to consolidate duplicate URL signals cleanly at the transport layer. Always verify that staging environments sending `X-Robots-Tag: noindex` do not leak that directive onto production origins after deployment.

## Reproducing Header Audits in CI and Terminal Pipelines

To reproduce the exact hop-by-hop response headers from a terminal or CI smoke test, use `curl` with `-D -` (dump headers to stdout) and `-sSL` (follow redirects silently while surfacing errors):

```bash
# Inspect full redirect chain, status lines, and response headers with Brotli/Gzip requested
curl -sSL -D - -o /dev/null --compressed \
  -A "Mozilla/5.0 (compatible; HeaderAudit/1.0)" \
  https://example.com

# Test a CORS preflight OPTIONS request explicitly
curl -i -X OPTIONS https://api.example.com/v1/items \
  -H "Origin: https://app.example.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Authorization, Content-Type"
```

If you manage Apache origins and need ready-to-deploy `.htaccess` directives for HTTPS canonical redirects, `Header always set` security policies, and compression rules, generate the configuration syntax cleanly using our [HTAccess Generator](/en/tools/htaccess-generator) and re-run a live header inspection here to confirm every directive takes effect.
