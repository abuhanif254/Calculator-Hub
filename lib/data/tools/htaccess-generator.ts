import { ToolConfig } from './types';

export const htaccessGeneratorConfig: ToolConfig = {
  slug: "htaccess-generator",
  title: ".htaccess Generator & Apache Rewrite Builder",
  shortDescription: "Generate optimized Apache .htaccess configurations. Configure clean URLs, 301/302 redirects, security headers, hotlink protection, browser caching, Gzip compression, and custom error pages.",
  category: "Web Dev Utilities",
  keywords: [
    "htaccess generator", "apache htaccess generator", "redirect generator", "rewrite rule generator",
    "apache config generator", "seo redirect tool", "htaccess redirect creator", "apache rewrite rules",
    "gzip compression htaccess", "browser caching htaccess", "block bad bots htaccess", "force https htaccess"
  ],

  longDescription: `
## What is a .htaccess File?

A **.htaccess** (hypertext access) file is a directory-level configuration file supported by several web servers, most notably the **Apache HTTP Server**. It allows administrators and web developers to alter server configuration details on a per-directory basis. This means you can apply specific rules—such as redirections, access controls, performance optimizations, and security policies—to a specific folder and all of its subdirectories without needing to edit the main server configuration files (like \`httpd.conf\` or \`apache2.conf\`).

The filename starts with a dot (\`.\`) because in Unix-like operating systems, files starting with a period are treated as hidden files. The server detects this file in any directory it is crawling to serve web requests and parses its commands on the fly.

---

## How Apache Servers Work with .htaccess

When a client requests a file or page from an Apache web server, the server checks the directory hierarchy from the system root down to the requested subdirectory for any \`.htaccess\` files. If it finds one, the directives inside it are read and applied in order.

\`\`\`
[ Request Received ] ──> [ Check Root / ] ──> [ Check Subfolder /blog/ ] ──> [ Apply Combined Rules ] ──> [ Serve Response ]
\`\`\`

* **On-the-Fly Configuration**: Unlike main server files that require a server reload to take effect, \`.htaccess\` updates are parsed instantly for every incoming HTTP request. This makes it highly flexible, particularly in shared hosting environments where users do not have administrative access to the main Apache service.
* **Performance Considerations**: Because Apache must scan every directory path for \`.htaccess\` files for *every* request, it introduces a small latency. In high-performance dedicated environments, administrators often disable \`.htaccess\` and write rules directly in the \`<Directory>\` blocks of the main configuration files.
* **Override Controls**: The ability of a directory to support \`.htaccess\` is governed by the \`AllowOverride\` directive in the main Apache configuration. If set to \`None\`, the server will ignore all \`.htaccess\` files entirely.

---

## Why .htaccess Matters for SEO and Performance

A well-configured \`.htaccess\` file is a fundamental pillar of both technical SEO and web performance optimization. It allows you to:
1. **Enforce Canonical URLs**: Prevent duplicate content issues by forcing a single canonical URL structure (e.g. forcing HTTPS and choosing between WWW or non-WWW).
2. **Speed Up Page Loading**: Declare browser caching policies and enable compression, directly improving Core Web Vitals scores.
3. **Execute Clean Migrations**: Use 301 redirects to pass link equity (PageRank) from old URLs to new structures, avoiding broken links (404 errors).
4. **Secure Server Access**: Protect sensitive configuration files, block malicious bots, and prevent directory listings.

---

## URL Rewriting and Redirection Principles

URL rewriting and redirection are powered by Apache's \`mod_rewrite\` module. This engine translates user-friendly URLs into server-side file systems.

### The Rewrite Engine Directive
To enable URL rewriting, you must declare:
\`\`\`apache
RewriteEngine On
\`\`\`

### Rewrite Conditions (\`RewriteCond\`) and Rules (\`RewriteRule\`)
- **\`RewriteCond\`**: Defines the conditions under which a rewrite rule should be executed. For example, checking if a file does not exist on disk, or if the request is coming over HTTP instead of HTTPS.
- **\`RewriteRule\`**: Specifies the pattern to match, the substitution target, and flags that alter execution behavior.

---

## 301 vs 302 Redirects: SEO Implications

Understanding the difference between HTTP redirect status codes is critical for search engine crawling behavior:

| Redirect Type | Status Code | SEO Link Equity | Use Case |
| :--- | :--- | :--- | :--- |
| **Permanent Redirect** | 301 | Passes 90-99% PageRank | URL migrations, domain changes, canonicalizing protocols. |
| **Temporary Redirect** | 302 | Passes 0% PageRank | System maintenance, temporary promotional campaigns, A/B testing. |

Search engine crawlers index the destination URL of a 301 redirect and drop the source URL. For a 302 redirect, search engines keep the source URL in their index since they expect the redirect to be removed shortly.

---

## Standard Protocol Enforcements

### 1. Forcing HTTPS
To secure traffic and benefit from Google's HTTPS ranking signal, redirect all HTTP traffic to HTTPS:
\`\`\`apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
\`\`\`

### 2. WWW vs Non-WWW Canonicalization
To prevent search engines from indexing two identical versions of your site:
* **Force WWW**:
  \`\`\`apache
  RewriteCond %{HTTP_HOST} !^www\. [NC]
  RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  \`\`\`
* **Remove WWW (Force Non-WWW)**:
  \`\`\`apache
  RewriteCond %{HTTP_HOST} ^www\.(.+) [NC]
  RewriteRule ^(.*)$ https://%1%{REQUEST_URI} [L,R=301]
  \`\`\`

---

## Browser Caching and Static Assets Optimization

By leveraging the \`mod_expires\` module, you instruct user browsers to cache static resources (images, stylesheets, scripts) locally, saving bandwidth and reducing load times on subsequent visits.

\`\`\`apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
\`\`\`

---

## Gzip Compression via mod_deflate

Compressing files before sending them over the network reduces transmission size, leading to significantly faster page paint benchmarks:

\`\`\`apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
\`\`\`

---

## Essential Security Hardening Rules

1. **Disable Directory Browsing**: Prevent users from viewing files inside a folder that lacks an \`index.html\` or page handler.
   \`\`\`apache
   Options -Indexes
   \`\`\`
2. **Protect Sensitive Files**: Hide configurations, environment parameters, and codebase details:
   \`\`\`apache
   <FilesMatch "^\.">
     Order Allow,Deny
     Deny from all
   </FilesMatch>
   \`\`\`
3. **Prevent Hotlinking**: Stop third-party sites from embedding your hosted images directly onto their pages, consuming your server bandwidth.
   \`\`\`apache
   RewriteCond %{HTTP_REFERER} !^$
   RewriteCond %{HTTP_REFERER} !^https://(www\.)?yourdomain.com [NC]
   RewriteRule \.(jpg|jpeg|png|gif|svg)$ - [F]
   \`\`\`

---

## Next.js and Apache Hosting Integration

Next.js applications deployed using static export (\`next export\` or \`output: 'export'\`) output a set of static HTML, JS, and CSS files. To ensure client-side routing works without returning 404 errors on reload, use this configuration:

\`\`\`apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
\`\`\`

This acts as a fallback router, sending all virtual routes back to the root entry point, allowing Next.js to handle path resolution client-side.

---

## Common .htaccess Mistakes and Troubleshooting

* **Internal Server Error (500)**: Usually caused by syntax errors, typos in directives, or referencing Apache modules that are not enabled on your server (e.g., using \`RewriteRule\` when \`mod_rewrite\` is disabled). Always wrap module-specific directives inside \`<IfModule>\` tags.
* **Redirect Loops**: Occur when rules conflict (e.g., forcing HTTPS on port 80 while another rule forces HTTP). Use browser Developer Tools under the Network tab to trace redirect chains.
* **Incorrect File Permissions**: Ensure the \`.htaccess\` file permission is set to **644** (read and write for owner, read-only for group and others). If set to writeable by all (777), the server will block execution for safety.

---

## Frequently Asked Questions

### Where should I place the .htaccess file?
Typically, the file should be uploaded directly into the public root directory of your website (often named \`public_html\`, \`www\`, \`web\`, or \`htdocs\`).

### Can I have multiple .htaccess files?
Yes. You can place different \`.htaccess\` files in subdirectories. Rules in a subdirectory override rules specified in the parent or root folder.

### What is the maximum file size for .htaccess?
There is no hard size limit, but because the server reads this file on every request, keeping the file size small (ideally under 10KB) is optimal for processing performance.
`,

  features: [
    "Supports URL rewriting, protocol enforcements (HTTPS/WWW), and canonical structures",
    "Generates robust 301/302 redirects, wildcards, folder redirections, and custom regex rules",
    "Hardens Apache servers with hotlink limits, directory listing blocks, and SQL injection protections",
    "Enhances speeds through Gzip mod_deflate rules and mod_expires browser cache intervals",
    "Provides quick presets for Next.js, WordPress, E-Commerce, SaaS, and custom blogs",
    "Audits configurations with real-time Security, SEO, and Performance scoring meters",
    "Detects dangerous circular redirect loops, conflicts, and duplicate declarations automatically",
    "Bridges compatibility syntax matching between legacy Apache 2.2 and modern Apache 2.4 rules"
  ],

  useCases: [
    "Redirecting old page paths permanently (301) to new locations after an SEO redesign",
    "Forcing secure HTTPS encryption and resolving WWW vs non-WWW canonical duplication",
    "Enabling browser caching and Gzip compression to satisfy PageSpeed Insights audits",
    "Securing configuration folders and disabling directory browsing to stop manual crawlers",
    "Enabling fallback client routing configurations for static Next.js Single Page Applications",
    "Quickly copy-pasting customized Apache blueprints for dev, staging, or production environments"
  ],

  howToSteps: [
    "Choose a preset template (like Next.js fallback, WordPress, or SaaS) to quickly populate base rules.",
    "Toggle Redirect rules under the Rewrites tab, including Force HTTPS, WWW preferences, and custom paths.",
    "Enable security flags like disabling directory indexes, hotlink blocks, and protection of critical files.",
    "Adjust Gzip compression and browser cache expirations for HTML, CSS, JavaScript, and Image types.",
    "Configure custom error documents (like 404.html) or activate maintenance mode overlays.",
    "Select your target server compatibility level: Apache 2.2 or Apache 2.4.",
    "Check the Real-time Warning Panel for loop alerts and review the Security / SEO scores.",
    "Copy the generated text, or download it directly as a .htaccess or config.txt file."
  ],

  faq: [
    {
      question: "What is the difference between Apache 2.2 and Apache 2.4 configuration?",
      answer: "The primary difference lies in the authorization syntax. Apache 2.2 uses 'Order Allow,Deny' and 'Deny from all' to restrict access. Apache 2.4 deprecates this syntax, replacing it with the simpler 'Require all denied' directive. Mixing these syntax formats can result in 500 Internal Server errors."
    },
    {
      question: "Will .htaccess slow down my website?",
      answer: "Yes, slightly. Because Apache has to check for the existence of .htaccess files in each directory of the request path, it adds a minor overhead. For highest performance on production servers, administrators turn off AllowOverride and place configurations directly inside virtual hosts."
    },
    {
      question: "How do I fix a 500 Internal Server Error after editing .htaccess?",
      answer: "A 500 error almost always means there is a typo or unsupported directive. Check the Apache error log file for the exact line causing the crash. You can also comment out lines one-by-one by placing a '#' symbol at the start of the line to isolate the failure."
    },
    {
      question: "Can I protect a directory with a password via .htaccess?",
      answer: "Yes. By declaring 'AuthType Basic' and referencing an external '.htpasswd' file that contains hashed credentials, you can enforce user login screens for specific folders without writing application-level authentication code."
    },
    {
      question: "Does search engine crawling count as hotlinking?",
      answer: "No. Standard search engine spiders do not request images to render them in a third-party frame, they simply index the image URL. Hotlink protection blocks web pages loaded in other user browsers from using your server's image source links."
    }
  ],

  relatedTools: [
    { name: "Robots.txt Generator", slug: "robots-txt-generator" },
    { name: "Sitemap.xml Generator", slug: "sitemap-xml-generator" },
    { name: "Meta Tag Generator", slug: "meta-tag-generator" },
    { name: "Open Graph Generator", slug: "open-graph-generator" }
  ],

  examples: [
    {
      title: "Force HTTPS & WWW Canonical Redirect",
      description: "Standard redirect ensuring all traffic passes securely through a unified www.domain.com path.",
      input: "Force HTTPS: True\nForce WWW: True",
      output: "RewriteEngine On\nRewriteCond %{HTTPS} off [OR]\nRewriteCond %{HTTP_HOST} !^www\\. [NC]\nRewriteRule ^(.*)$ https://www.yourdomain.com/$1 [R=301,L]"
    },
    {
      title: "Clean Next.js Static Export Fallback Routing",
      description: "Forwards all non-file client requests to the root index.html to allow dynamic routing.",
      input: "Next.js Static Fallback Router: True",
      output: "RewriteEngine On\nRewriteBase /\nRewriteRule ^index\\.html$ - [L]\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . /index.html [L]"
    },
    {
      title: "Security Hardening and Folder Protection",
      description: "Blocks directory lists, shields sensitive files, and stops scripting injection attempts.",
      input: "Directory Listings: False\nScript Injection Protection: True",
      output: "Options -Indexes\n\nRewriteCond %{QUERY_STRING} (<|%3C).*script.*(>|%3E) [NC,OR]\nRewriteCond %{QUERY_STRING} GLOBALS(=|\\[|\\%) [OR]\nRewriteCond %{QUERY_STRING} _REQUEST(=|\\[|\\%) [NC]\nRewriteRule ^(.*)$ - [F,L]"
    }
  ]
};
