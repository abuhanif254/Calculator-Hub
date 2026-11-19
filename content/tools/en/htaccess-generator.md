---
metaTitle: ".htaccess Generator & Apache mod_rewrite Rule Builder"
metaDescription: "Generate Apache 2.4 and 2.2 .htaccess files for 301 redirects, HTTPS, Gzip, browser caching, and security hardening—built locally in your browser."
metaKeywords: "htaccess generator, apache htaccess generator, redirect generator, rewrite rule generator, apache config generator, seo redirect tool, htaccess redirect creator, apache rewrite rules, gzip compression htaccess, browser caching htaccess, block bad bots htaccess, force https htaccess"
title: ".htaccess Generator & Apache Rewrite Builder"
shortDescription: "Build production-ready Apache 2.4 and 2.2 .htaccess configurations covering canonical 301/302 redirects, HTTPS enforcement, mod_deflate compression, caching headers, IP blocking, and 503 maintenance windows."
faqs:
  - question: "Why did my Apache 2.4 server return a 500 Internal Server Error after pasting older .htaccess security rules?"
    answer: "Apache 2.4 replaced the legacy mod_access_compat directives (Order Allow,Deny and Deny from all) with mod_authz_core syntax (Require all denied and RequireAll blocks). Switching the generator's compatibility toggle to Apache 2.4 outputs native mod_authz_core directives that work without relying on deprecated compatibility modules."
  - question: "Should I use 301, 302, or 503 status codes during redirects and maintenance?"
    answer: "Use 301 Moved Permanently for canonical domain shifts, HTTPS upgrades, and permanent URL migrations so search engines transfer link equity and index the new URL. Reserve 302 for short-term routing experiments, and always use 503 Service Unavailable during maintenance outages so search crawlers retry later instead of de-indexing your pages."
  - question: "Why does placing a <Directory> block inside .htaccess cause an Apache syntax error?"
    answer: "Apache only permits <Directory> containers inside main server or VirtualHost files (httpd.conf / apache2.conf). When enabling HTTP Basic Authentication inside a .htaccess file, remove the <Directory> wrapper lines and place AuthType, AuthName, AuthUserFile, and Require valid-user directly inside a .htaccess file located in the target folder."
  - question: "What is the performance difference between .htaccess rules and httpd.conf configuration?"
    answer: "When AllowOverride is enabled, Apache checks every directory segment from the document root down to the requested file for .htaccess files on every incoming HTTP request. On shared hosting .htaccess is essential because you lack root access; on dedicated VPS instances, moving finalized rules into your VirtualHost block and setting AllowOverride None removes per-request filesystem overhead."
  - question: "Do my whitelisted IPs, .htpasswd server paths, or custom redirect maps leave my computer?"
    answer: "No. Rule compilation, redirect-loop detection, line-by-line directive explanations, and .htaccess downloads execute exclusively inside client-side JavaScript, keeping internal filesystem paths and server IP lists completely private."
features:
  - "Dedicated Apache 2.4 (mod_authz_core) and legacy Apache 2.2 (mod_access_compat) syntax switcher preventing HTTP 500 module mismatches"
  - "Canonical URL builder for Force HTTPS, WWW vs. non-WWW host normalization, trailing-slash hygiene, and custom 301/302 exact, wildcard (RedirectMatch), or regex (RewriteRule) redirects"
  - "Security hardening suite covering Options -Indexes, dotfile protection (.env, .git, .htpasswd), image hotlink referer blocking, query-string injection filters, IP bans, and bad-bot user-agent blocking"
  - "Three-layer performance optimizer generating mod_expires lifetimes, mod_deflate Gzip MIME filters, and split mod_headers Cache-Control directives"
  - "IP-whitelisted HTTP 503 maintenance mode, custom ErrorDocument 404/500 routing, and HTTP Basic Auth (.htpasswd) scaffolding"
  - "Real-time Security, SEO, and Performance scores (0–100) with redirect-loop warnings, line-by-line directive annotations, six stack presets, and direct .htaccess download"
useCases:
  - "Consolidating http://, https://, www, and trailing-slash URL variants into a single canonical HTTPS host without multi-hop redirect chains"
  - "Migrating legacy site URLs with exact 301 Redirect, RedirectMatch wildcard, or mod_rewrite regular expressions while preserving organic rankings"
  - "Hardening shared-hosting WordPress, Next.js static export, and PHP directories against directory listing, .env/.git leaks, and bandwidth hotlinking"
  - "Configuring 1-year immutable asset caching via mod_expires and Cache-Control while keeping HTML and JSON documents fresh with must-revalidate"
  - "Deploying an SEO-safe HTTP 503 maintenance overlay that serves maintenance.html to visitors while whitelisting engineering office IPs"
  - "Auditing inherited Apache 2.2 .htaccess files and upgrading access-control directives cleanly to modern Apache 2.4 syntax"
howToSteps:
  - "Select Apache 2.4 (Modern) or Apache 2.2 (Legacy) and set your target environment (Production, Staging, or Development) at the top of the workspace."
  - "Apply one of the six starter presets (Next.js Static Export, WordPress, E-Commerce, SaaS, Portfolio, or Developer Tools) or configure modules manually."
  - "Under URL Rewrites & Redirects, enable HTTPS enforcement, WWW/non-WWW canonicalization, trailing-slash normalization, and any custom 301/302 redirects."
  - "Switch to Security, Performance & Caching, and Error Pages / Maintenance tabs to toggle dotfile protection, Gzip compression, browser caching, hotlink whitelists, or IP-exempt 503 maintenance."
  - "Inspect the live Security, SEO, and Performance scores along with the line-by-line rule breakdown to verify zero self-redirect loops or missing IP whitelists."
  - "Copy the compiled configuration or download it directly as .htaccess (or htaccess-config.txt for staging review) before uploading to your Apache web root."
---

Apache HTTP Server remains one of the most widely deployed web servers across shared hosting, managed WordPress stacks, and enterprise Linux virtual hosts. Its per-directory `.htaccess` file lets engineers rewrite URLs, enforce TLS, compress responses, set HTTP caching policies, and block abusive traffic without editing root-owned `httpd.conf` files or restarting the server daemon. Because Apache evaluates `.htaccess` rules on every matching request—and rejects a single invalid directive with a site-wide `500 Internal Server Error`—precision matters. Our `.htaccess` Generator compiles version-aware Apache 2.4 and 2.2 directives, flags redirect loops, and annotates every line locally in your browser so private server paths, `.htpasswd` locations, and admin IP allowlists never leave your device.

## Apache 2.4 vs. Apache 2.2 Authorization Syntax

The single most common source of `.htaccess` outages when migrating hosting environments is mixing Apache 2.2 `mod_access_compat` rules with Apache 2.4's `mod_authz_core` authorization engine. When blocking sensitive dotfiles (`.env`, `.git`, `.htaccess`, `.htpasswd`) or blacklisting abusive IPs, syntax differs fundamentally between versions:

```apache
# Apache 2.4 (mod_authz_core — Recommended)
<FilesMatch "^\.(htaccess|htpasswd|env|git|ini)$">
  Require all denied
</FilesMatch>

<RequireAll>
  Require all granted
  Require not ip 203.0.113.42
</RequireAll>

# Apache 2.2 (Legacy mod_access_compat)
<FilesMatch "^\.(htaccess|htpasswd|env|git|ini)$">
  Order Allow,Deny
  Deny from all
</FilesMatch>
```

On modern Apache 2.4 hosts where `mod_access_compat` is disabled, pasting legacy `Order Allow,Deny` directives triggers an immediate HTTP 500 failure. Selecting the **Apache 2.4 (Modern)** toggle ensures every generated `<FilesMatch>` and IP block uses valid `Require` containers.

## `mod_rewrite` Flags, Variables, and Canonical Redirects

URL canonicalization prevents search engines from splitting link equity across `http://`, `https://`, `www`, non-`www`, and trailing-slash duplicates. Apache's `mod_rewrite` evaluates `RewriteCond` predicates against live server variables (`%{HTTPS}`, `%{HTTP_HOST}`, `%{REQUEST_URI}`, `%{REQUEST_FILENAME}`, `%{REMOTE_ADDR}`, `%{HTTP_REFERER}`, `%{QUERY_STRING}`) and modifies execution through bracketed flags:

| `mod_rewrite` Flag | Behavior & Execution Semantics | Typical Production Usage |
| :--- | :--- | :--- |
| **`[L]`** | Stops processing further rules in the *current* per-directory rewrite pass | Paired with redirects and `403` blocks to prevent cascading rewrites |
| **`[R=301]`** | Issues an external HTTP `301 Moved Permanently` redirect (RFC 9110) | HTTPS upgrades, host canonicalization, permanent URL migrations |
| **`[R=302]`** | Issues an external HTTP `302 Found` temporary redirect | Short-term promotions, A/B routing, temporary geo-redirects |
| **`[R=503]`** | Returns HTTP `503 Service Unavailable` without altering search index URLs | Planned maintenance overlays combined with `%{REMOTE_ADDR}` IP exemptions |
| **`[NC]`** | Case-insensitive regex matching (`NoCase`) | Matching `%{HTTP_HOST}`, file extensions, or `%{HTTP_USER_AGENT}` |
| **`[OR]`** | Combines adjacent `RewriteCond` lines with logical OR instead of default AND | Blocking multiple bad bots or query-string XSS signatures |
| **`[F]`** | Immediately terminates the request with `403 Forbidden` | Hotlink protection, scraper blocking, script-injection filtering |
| **`[QSA]`** | Appends incoming query strings onto a substitution that defines its own query | Preserving tracking or pagination parameters during internal rewrites |

When mixing simple `Redirect 301` (`mod_alias`) statements with `RewriteRule` (`mod_rewrite`) blocks in the same `.htaccess`, remember that `mod_rewrite` runs earlier in Apache's request pipeline than `mod_alias`. Notice also that firing a separate HTTP-to-HTTPS redirect followed by a second non-WWW-to-WWW redirect forces two round-trips on `http://example.com`. If your site enforces both HTTPS and a preferred `www` host, you can collapse both checks into a single-hop redirect:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteCond %{HTTP_HOST} ^(?:www\.)?(.+)$ [NC]
RewriteRule ^ https://www.%1%{REQUEST_URI} [L,R=301]
```

After uploading canonicalization or migration rules, trace every hop with our [Redirect Checker](/en/tools/redirect-checker) to confirm you never create multi-hop chains (`http://site.com` → `https://site.com` → `https://www.site.com/`) or accidental self-redirect loops.

## Compression and Dual-Layer HTTP Caching Pipelines

Fast Core Web Vitals depend on reducing transfer bytes and eliminating redundant network round-trips for returning visitors. The Performance module wraps each subsystem inside `<IfModule ...>` guards so your site stays online even if a shared host omits an optional module:

- **Wire Compression (`mod_deflate`)**: Applies Gzip compression selectively to compressible text and vector MIME types (`text/html`, `text/css`, `application/javascript`, `image/svg+xml`, `font/ttf`) while skipping already-compressed binary formats (`JPEG`, `PNG`, `WebP`) that waste CPU cycles when re-compressed.
- **Asset vs. Document Cache Split (`mod_expires` + `mod_headers`)**: Static assets (`css`, `js`, `webp`, `png`, `ico`) receive `max-age=31536000, public, no-transform` (1 year), whereas dynamic markup and APIs (`html`, `xml`, `json`) emit `max-age=0, private, must-revalidate` so browsers always validate fresh deployments. After deploying, confirm live `Content-Encoding` and `Cache-Control` response headers using our [HTTP Header Checker](/en/tools/http-header-checker).

## Security Hardening, 503 Maintenance Windows, and Deployment Pitfalls

Beyond disabling directory listings (`Options -Indexes`), blocking image hotlinking via `%{HTTP_REFERER}`, and returning `403 Forbidden` to bandwidth-heavy scrapers that ignore [robots.txt rules](/en/tools/robots-txt-generator), keep three operational details in mind before pushing `.htaccess` to production:

1. **Always Allowlist Your Own IP During 503 Maintenance**: Enabling Maintenance Mode without adding your workstation IP under `%{REMOTE_ADDR}` locks you out of testing your own release alongside public traffic. Returning `503` instead of a `200 OK` placeholder page tells Googlebot the outage is temporary and protects rankings.
2. **Scope `AuthType Basic` Without `<Directory>` Inside `.htaccess`**: Apache forbids `<Directory>` blocks inside `.htaccess` files—they are valid only in server-wide `httpd.conf` / VirtualHost configs. When using the Basic Auth generator on shared hosting, place the four inner lines (`AuthType Basic`, `AuthName`, `AuthUserFile`, `Require valid-user`) inside a dedicated `.htaccess` file stored in the protected folder itself, pointing `AuthUserFile` to an absolute server path outside the public web root.
3. **Preserve Backups and Test in Staging First**: Rename your existing `.htaccess` to `.htaccess.bak` via SFTP or SSH before overwriting it, and on VPS/dedicated servers run `apachectl configtest` when migrating finalized rules into your VirtualHost configuration with `AllowOverride None` for maximum throughput.
