import { ToolConfig } from './types';

export const robotsTxtGeneratorConfig: ToolConfig = {
  slug: "robots-txt-generator",
  title: "Robots.txt Generator & Crawl Budget Optimizer",
  shortDescription: "Create, optimize, and validate your website's robots.txt file. Generate user-agent rules, disallow paths, manage crawl delays, and optimize your crawl budget with real-time validation and preset templates.",
  category: "Web Dev Utilities",
  keywords: [
    "robots.txt generator", "robots txt builder", "robots file generator", "seo robots generator",
    "nextjs robots txt", "website crawler rules", "crawl budget optimization", "robots.txt example",
    "disallow rules", "user agent directives", "sitemap declaration", "search engine crawling"
  ],

  longDescription: `
## What is Robots.txt?

At its core, a **robots.txt** file is a simple text file placed in the root directory of your website. It acts as a gatekeeper, communicating with web robots (most notably search engine crawlers like Googlebot, Bingbot, and Yandex) to tell them which parts of your site they are allowed to request and index, and which parts they should ignore.

Historically, the robots.txt file was defined by the **Robots Exclusion Protocol (REP)**, created in 1994 by Martijn Koster while working on one of the web's first search engines. Though it began as an informal standard, Google and other major search engines officially adopted and codified it in 2019, turning the REP into an internet standard (RFC 8555).

When a search engine crawler visits a website, the very first file it looks for is the robots.txt file (located strictly at \`https://yourdomain.com/robots.txt\`). If this file exists, the crawler parses its instructions before fetching any other page or resource. If no robots.txt file is present, crawlers assume they have permission to scan the entire public facing interface of your website.

---

## Why Robots.txt Matters for SEO

Having a correctly configured robots.txt file is critical for successful Search Engine Optimization (SEO). It does not directly raise your rankings in the sense of a backlink or a well written article, but it performs the essential housekeeping that allows search engines to discover and prioritize your most valuable content.

Here is why your robots.txt file is a cornerstone of technical SEO:

1. **Prevents Crawl Bloat**: Large websites with dynamic URLs, search filter queries, page sorts, and administrative logins can create millions of low value pages. Without robots.txt, crawlers waste resources downloading duplicate versions of pages, preventing them from discovering your new or updated content.
2. **Protects System Resources**: When automated bots crawl your website, they generate web traffic and database queries. Aggressive crawlers can slow down your hosting server, causing performance degradation for real human visitors. By limiting crawler access to intensive sections of your site (like database search pages), you protect your server load.
3. **Restricts Private & Staging Directories**: Development or staging areas, admin dashboards (like \`/wp-admin/\` or \`/admin/\`), and internal APIs do not belong on public search engine indices. Declaring them in your robots.txt keeps search engine results clean.
4. **Links Your Sitemap**: Adding your sitemap URL directly inside the robots.txt file ensures that every search engine bot knows exactly where to find your complete list of indexable pages the moment they land on your domain.

---

## How Search Engine Crawlers Work

To understand robots.txt syntax, you must first understand how web search crawlers operate. The crawling lifecycle consists of three distinct phases: **discovery, crawling, and indexing**.

\`\`\`
[ Discovery ] ──> [ Robots.txt Check ] ──> [ Crawling (Fetching) ] ──> [ Rendering & Indexing ]
\`\`\`

1. **Discovery**: The search engine finds links pointing to your website from other websites, or reads your submitted sitemaps.
2. **Robots.txt Check**: The crawler attempts to download \`https://yourdomain.com/robots.txt\`.
   - If the server returns a **200 OK**, the crawler reads the file and obeys its rules.
   - If the server returns a **404 Not Found**, the crawler assumes no restrictions apply and proceeds.
   - If the server returns a **5xx Server Error**, the crawler will temporarily stop crawling your site to avoid overloading an already failing server. It will try again later.
3. **Crawling (Fetching)**: The crawler downloads the HTML, CSS, JS, and image assets of allowed pages.
4. **Rendering & Indexing**: The search engine renders the page (interpreting JavaScript) and adds the contents to its database index to display in search results.

---

## Understanding Crawl Budget

Every website is allocated a **crawl budget** by search engines. A crawl budget is the limit on the number of pages a search engine bot will crawl on your website during a given timeframe.

Google calculates your crawl budget based on two main criteria:

* **Crawl Rate Limit (Server Capacity)**: How fast your website can respond to requests without slowing down. If your site is fast, Googlebot crawls more. If your server starts returning errors or high latencies, Googlebot backs off.
* **Crawl Demand (Popularity)**: How often Google *wants* to crawl your site. Frequently updated news sites and popular retail brands have a high crawl demand, whereas static portfolios have lower demand.

If your crawl budget is wasted on duplicate pages (such as tracking parameters like \`?utm_source=\`, sorting filters like \`?sort=price_desc\`, or infinite search grids), crawlers may hit their budget limit before discovering your new blog posts or high margin products. 

Using **Disallow** rules in robots.txt to cut off bots from scanning these infinite parameters is the single most effective way to optimize your crawl budget.

---

## Robots.txt Syntax: Directives Explained

A robots.txt file is structured as a series of blocks. Each block begins by targeting a specific crawler (the **User-agent**) and is followed by one or more instructions (directives).

### 1. User-agent Directive
This directive specifies which bot the rules apply to.
* Syntax: \`User-agent: [Bot Name]\`
* To target all crawlers: \`User-agent: *\`
* To target Googlebot: \`User-agent: Googlebot\`

### 2. Disallow Directive
Instructs the targeted bot not to access a specific path or file type.
* Syntax: \`Disallow: [Path]\`
* To block the entire website: \`Disallow: /\`
* To block a specific folder: \`Disallow: /admin/\`
* To block a specific file: \`Disallow: /private-document.pdf\`

### 3. Allow Directive
Overrides a Disallow directive. This is useful for permitting access to a specific subfolder or file within a blocked parent folder.
* Syntax: \`Allow: [Path]\`
* Example:
  \`\`\`text
  User-agent: *
  Disallow: /assets/
  Allow: /assets/public-images/
  \`\`\`

### 4. Crawl-delay Directive
Specifies the number of seconds a crawler should wait between successive requests.
* Syntax: \`Crawl-delay: [Seconds]\`
* **Note**: Googlebot and Baidu ignore this directive. If you need to slow down Googlebot, you must configure this within Google Search Console. However, Bingbot, Yandex, and Yahoo respect this directive.

### 5. Sitemap Directive
Points crawlers to the XML Sitemap location. Unlike user agent rules, this directive is global and can be placed anywhere in the file.
* Syntax: \`Sitemap: [Absolute URL]\`
* Example: \`Sitemap: https://nexuscalculator.net/sitemap.xml\`

### 6. Host Directive
Historically used by Yandex to define the preferred domain alias. Today it is largely deprecated, as search engines rely on canonical tags and HTTPS redirections.

---

## Comparison of Directive Support Across Major Search Engines

| Feature / Directive | Google | Bing | Yandex | Baidu |
| :--- | :--- | :--- | :--- | :--- |
| **Wildcards (\`*\`)** | Yes | Yes | Yes | Limited |
| **End anchors (\`$\`)** | Yes | Yes | Yes | No |
| **Crawl-delay** | No | Yes | Yes | No |
| **Allow** | Yes | Yes | Yes | Yes |
| **Sitemap** | Yes | Yes | Yes | Yes |

---

## Common Robots.txt Mistakes to Avoid

1. **Blocking CSS and JavaScript Assets**: Search engines render pages like modern browsers. If you block directories containing your CSS files or JavaScript bundles (e.g. \`Disallow: /_next/static/\` or \`Disallow: /js/\`), search engines cannot see your layout, causing indexation issues and lower mobile responsiveness rankings.
2. **Accidentally Blocking the Entire Site**: A single trailing slash in \`Disallow: /\` under \`User-agent: *\` tells all search engines to delete your entire website from their index. Double check that this rule is never live on your production environment.
3. **Using Robots.txt to De-index Pages**: If a page is already indexed in search results, blocking it in robots.txt will *not* remove it. It simply prevents crawlers from reading the page again. To de-index a page, you must keep the page accessible to crawlers and add a \`<meta name="robots" content="noindex" />\` tag to the page header.
4. **Listing Private Directories as Security**: Since the robots.txt file is publicly readable at \`yourdomain.com/robots.txt\`, listing your secret folders there exposes their names to attackers. Protect sensitive folders with password authentication instead.
5. **Multiple User-Agent Sections overlapping**: If you declare rules for \`User-agent: *\` and later declare rules for \`User-agent: Googlebot\`, Googlebot will *only* read the rules under the Googlebot block, completely ignoring the generic rules. Ensure all global rules are duplicated or integrated properly.

---

## Robots.txt Examples by Platform

### 1. Next.js Robots.txt Example
In Next.js, static assets are stored in static folders, and page routing is handled dynamically.
\`\`\`text
User-agent: *
Allow: /_next/static/
Disallow: /_next/
Disallow: /api/
Disallow: /admin/

Sitemap: https://nexuscalculator.net/sitemap.xml
\`\`\`

### 2. WordPress Robots.txt Example
WordPress contains dynamic search feeds and administrative scripts that should be kept clear of crawlers.
\`\`\`text
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /search/
Disallow: /*?s=

Sitemap: https://yourwebsite.com/wp-sitemap.xml
\`\`\`

### 3. Ecommerce Robots.txt Example
Ecommerce sites require careful management of checkout routes, shopping carts, and dynamic filters to protect their crawl budget.
\`\`\`text
User-agent: *
Disallow: /checkout/
Disallow: /cart/
Disallow: /my-account/
Disallow: /search/
Disallow: /*?sort=
Disallow: /*?filter_color=
Disallow: /*?utm_source=

Sitemap: https://yourstore.com/sitemap.xml
\`\`\`
`,

  features: [
    "Flexible user-agent rule block generation (Allows multiple crawlers per block)",
    "Real-time visual editor with syntax highlighting and mobile-responsive layout",
    "Dynamic rule validator alerting on duplicate rules, syntax errors, and broken URLs",
    "Preset templates for WordPress, Next.js, E-commerce, SaaS, Blogs, and more",
    "Multi-environment support (Production, Staging, Development targets)",
    "Search engine compatibility check for Google, Bing, Yandex, and Baidu bots",
    "Crawl budget optimization tips and Google-friendly warnings dashboard",
    "Copy, download, and template config export/import in one click"
  ],

  useCases: [
    "Creating a search-engine friendly robots.txt file for a new Next.js or WordPress site",
    "Blocking aggressive scrapers (like SemrushBot or AhrefsBot) to reduce server traffic",
    "Declaring XML sitemap paths for search engine discovery and index scheduling",
    "Preventing staging/development environments from appearing in search results",
    "Optimizing crawl budgets on large ecommerce sites by blocking filter parameters",
    "Reviewing existing robots.txt configurations for conflicts and standard compliance"
  ],

  howToSteps: [
    "Choose a preset template matching your platform (e.g. Next.js, Ecommerce, or WordPress) or start from scratch.",
    "Set the Target Environment (Production allows indexation; Staging/Development blocks it).",
    "Add, edit, or reorder rule blocks. Specify user agents like '*' (all bots) or specific search crawlers.",
    "Add 'Allow' or 'Disallow' directives to define path access rules, and set crawl delays if targeting Bing/Yandex.",
    "Enter your XML sitemap URL and Preferred host URL in the settings panel.",
    "Check the Validation Panel for warnings (e.g. blocking CSS assets or blocking the entire site).",
    "Copy the output, or click 'Download robots.txt' to save it and place it in the root folder of your website."
  ],

  faq: [
    {
      question: "Where should the robots.txt file be located?",
      answer: "The robots.txt file must be placed in the absolute root directory of your website's domain. For example: https://yourdomain.com/robots.txt. It will not be parsed if placed in a subdirectory like https://yourdomain.com/assets/robots.txt."
    },
    {
      question: "Does robots.txt guarantee that a page will not be indexed?",
      answer: "No. Robots.txt only controls crawler access, not indexation. If search engine bots find links from other websites pointing to your page, they may still index it without fetching its content. To guarantee a page is not indexed, keep it crawlable and use a 'noindex' meta tag or HTTP response header."
    },
    {
      question: "Will robots.txt protect my website from bad bots and scrapers?",
      answer: "No. Robots.txt is a voluntary protocol. Good bots (Google, Bing) obey it, but malicious scrapers, email harvesters, and vulnerability scanners will ignore it completely. Sensitive data should be secured using passwords, firewalls, and rate-limiting, rather than robots.txt."
    },
    {
      question: "Why does Googlebot ignore the Crawl-delay directive?",
      answer: "Googlebot uses sophisticated crawling algorithms that adapt dynamically based on your server response latency and load capacity. To change Googlebot's crawl rate, you must log into Google Search Console and adjust the crawl rate settings in the site configuration menu."
    },
    {
      question: "What is the difference between a wildcard (*) and a dollar sign ($) in robots.txt?",
      answer: "A wildcard (*) matches any sequence of characters (e.g., '/images/*' blocks all files in the images directory). A dollar sign ($) matches the end of a URL string (e.g., '/*.xls$' blocks only URLs ending exactly in .xls, while allowing a URL like /catalog.xls/view)."
    },
    {
      question: "How do I test if my robots.txt is valid?",
      answer: "You can copy your output and paste it into Google Search Console's Robots Testing Tool (or use the equivalent validator in Bing Webmaster Tools). Our built-in validator also runs standard syntax checks and flags immediate Google-friendly issues dynamically."
    }
  ],

  relatedTools: [
    { name: "Meta Tag Generator", slug: "meta-tag-generator" },
    { name: "Open Graph Generator", slug: "open-graph-generator" },
    { name: "Twitter Card Generator", slug: "twitter-card-generator" }
  ],

  examples: [
    {
      title: "Standard Production Configuration",
      description: "Default robots.txt config for blogs and standard sites, including sitemap linking.",
      input: "Environment: Production\nSitemap: https://example.com/sitemap.xml\nBlock: User-agent: *, Disallow: /admin/, Disallow: /api/",
      output: "User-agent: *\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://example.com/sitemap.xml"
    },
    {
      title: "Complete Staging/Development Block",
      description: "Block all crawlers from accessing staging websites to prevent Google index bloating.",
      input: "Environment: Staging\nSitemap: none",
      output: "User-agent: *\nDisallow: /"
    },
    {
      title: "SEO Scraper Block",
      description: "Block commercial SEO indexing bots from crawling and draining your server bandwidth.",
      input: "Environment: Production\nBlock 1: User-agent: AhrefsBot, SemrushBot, DotBot, Disallow: /\nBlock 2: User-agent: *, Disallow: /admin/",
      output: "User-agent: AhrefsBot\nUser-agent: SemrushBot\nUser-agent: DotBot\nDisallow: /\n\nUser-agent: *\nDisallow: /admin/"
    }
  ]
};
