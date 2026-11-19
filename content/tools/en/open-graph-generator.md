---
metaTitle: "Open Graph Generator & Multi-Platform Social Previewer"
metaDescription: "Build and validate Open Graph meta tags with real-time Facebook, LinkedIn, Slack, Discord, and WhatsApp previews plus local image ratio checks."
metaKeywords: "open graph generator, og tags generator, open graph previewer, facebook share preview, linkedin post simulator, slack attachment simulator, discord rich embed generator, whatsapp link preview, og image size validation, social media tag generator, website metadata generator, og:image generator"
title: "Open Graph Generator & Social Previewer"
shortDescription: "Design, validate, and preview Open Graph (OG) metadata across Facebook, LinkedIn, Discord, Slack, WhatsApp, Telegram, and iMessage with local image dimension and payload analysis."
faqs:
  - question: "Why must Open Graph tags use the property attribute instead of the name attribute?"
    answer: "The Open Graph Protocol is grounded in RDFa (Resource Description Framework in Attributes), which defines metadata predicates using property='og:*' rather than HTML's standard name attribute. Strict unfurlers such as Facebook's crawler and LinkedInBot can ignore tags written with name='og:title'."
  - question: "Why does WhatsApp fail to show my Open Graph thumbnail even when Facebook displays it?"
    answer: "WhatsApp fetches link previews directly from the sender's device under a strict payload ceiling of roughly 300 KB and crops thumbnails into a 1:1 square. If your og:image exceeds 300 KB, loads slowly over redirects, or uses an unsupported format like SVG, WhatsApp strips the image completely."
  - question: "What happens when I drag and drop a local image into the previewer?"
    answer: "The browser reads your image via the local FileReader API to measure natural pixel dimensions, aspect ratio, and kilobyte weight without uploading the file anywhere. In the exported HTML code, data: URIs are automatically replaced with a placeholder URL so you remember to substitute your hosted HTTPS asset path."
  - question: "Why should I include og:image:width and og:image:height tags?"
    answer: "When a brand-new URL is shared for the first time, Facebook's scraper fetches the HTML before asynchronously downloading and decoding the image. Declaring explicit pixel dimensions lets the platform render the full-bleed card immediately on the very first share instead of dropping the thumbnail until a second scrape."
  - question: "How do I force Facebook, LinkedIn, or Slack to refresh a cached Open Graph preview?"
    answer: "Social platforms aggressively cache parsed OG objects by og:url. After updating your HTML, invalidate the cache using Meta's Sharing Debugger or LinkedIn's Post Inspector, and change the og:image filename or append a version query string such as ?v=2 so CDN and scraper image caches fetch the new graphic."
features:
  - "Seven real-time platform simulators modeling Facebook, LinkedIn, Discord, Slack, WhatsApp, Telegram, and Apple iMessage link unfurls"
  - "Local drag-and-drop image inspector measuring natural pixel dimensions, aspect ratio (1.91:1 validation), and WhatsApp's 300 KB size threshold"
  - "Six Open Graph object type builders covering website, article, product, profile, video, and music metadata namespaces"
  - "Automated 100-point completeness scorer flagging missing absolute URLs, truncated headlines (40–60 chars), long descriptions (60–90 chars), and missing og:image:alt text"
  - "Seven one-click presets for SaaS, Blog Article, Product Shop, Portfolio, Corporate, News, and Developer Tools"
  - "JSON configuration import/export, HTML snippet download, and 30-slot localStorage session history running completely in-browser"
useCases:
  - "Verifying that hero typography and brand logos survive both Facebook's 1.91:1 banner crop and WhatsApp's central 1:1 square thumbnail crop"
  - "Generating e-commerce product:price:amount, currency, availability, and retailer_item_id tags for social shopping catalogs"
  - "Adding ISO 8601 article:published_time, article:author, and multi-tag article:tag metadata to editorial and Substack-style publishing templates"
  - "Auditing pre-release launch banners locally in the browser without exposing embargoed campaign visuals to third-party preview servers"
  - "Building consistent Slack and Discord rich link embeds for developer documentation, API changelogs, and GitHub release notes"
  - "Exporting standardized JSON Open Graph templates for multi-brand design systems and marketing operations handoffs"
howToSteps:
  - "Pick a starter template (SaaS Web, Blog Article, Product Shop, Portfolio, Business, News, or Developer Tool) or enter custom values in the Core Metadata tab."
  - "Keep og:title within 40–60 characters and og:description within 60–90 characters while setting an absolute HTTPS og:url and locale code (for example, en_US)."
  - "Open the Image & Visuals tab to paste a hosted HTTPS image URL or drag and drop a local PNG, JPEG, or WebP file to inspect its exact dimensions, ratio, and KB size."
  - "Add descriptive og:image:alt text for screen readers and LinkedIn compliance, and verify the 1.91:1 ratio and sub-300 KB payload checks."
  - "If your og:type is article, product, profile, video, or music, switch to the Specialized Namespace tab to populate type-specific metadata properties."
  - "Cycle through all seven live platform previews, check the 100-point validation panel, and copy or download your production opengraph-meta-tags.html block."
---

When someone pastes a URL into Slack, LinkedIn, Facebook, Discord, or WhatsApp, the platform does not wait for a human to explain what sits behind that link. An automated unfurler bot issues a lightweight HTTP `GET` request, parses the raw HTML `<head>` without running client-side JavaScript, and builds a rich preview card from **Open Graph Protocol (OGP)** tags. Because every messenger and social network enforces its own aspect ratios, truncation rules, and byte limits, guessing at metadata leads to cropped headlines, missing thumbnails, and broken shares. This Open Graph Generator & Social Previewer lets you author, inspect, and validate multi-platform cards locally—even inspecting local draft images through your browser's `FileReader` API so unreleased launch assets never touch an external server.

## How Social Unfurlers Render Open Graph Payloads

Originally specified by Facebook in 2010 on top of **RDFa** (Resource Description Framework in Attributes), the Open Graph specification mandates four baseline properties—`og:title`, `og:type`, `og:image`, and `og:url`—declared via `property="og:*"` attributes. Beyond those four predicates, however, major platforms diverge sharply in how they fetch, crop, and cache social cards:

| Platform & Crawler | Preferred Image Size & Ratio | Crop & Card Layout | Payload / Caching Constraint | Practical Truncation Window |
| :--- | :--- | :--- | :--- | :--- |
| **Facebook** (`facebookexternalhit`) | 1200 × 630 px (`1.91:1`); min 600 × 315 px | Full-width top banner; shrinks to small square below 600 px wide | Up to 8 MB; caches aggressively until Sharing Debugger re-scrape | Title ~60 chars; description ~65–90 chars |
| **LinkedIn** (`LinkedInBot`) | 1200 × 627 px (`1.91:1`); min 200 px wide | Widescreen card; drops preview entirely under 200 px wide | Up to 5 MB; caches ~7 days (flush via Post Inspector) | Title ~70 chars; description hidden on feed cards |
| **Discord** (`Discordbot`) | 1200 × 630 px (`1.91:1`) | Dark embed with left accent bar (`theme-color`); large image if `summary_large_image` set | Follows `og:site_name`, `og:title`, `og:description` | Title ~256 chars; description ~350 chars |
| **Slack** (`Slackbot-LinkExpanding`) | 1200 × 630 px (`1.91:1`) | Compact left-bordered unfurl; optional reading time / author fields | Caches image URLs heavily across workspace channels | Title ~70 chars; description ~150 chars |
| **WhatsApp** (Client / `WhatsApp`) | 1200 × 630 px with central `1:1` safe zone | Square thumbnail on mobile chats; large preview on newer clients | **Strict ~300 KB image ceiling**; silently omits image if heavier | Title ~60 chars; description ~80–100 chars |
| **Telegram** (`TelegramBot`) | 1200 × 630 px (`1.91:1`) | Chat bubble card; Instant View supported on configured domains | Refreshable on demand via `@WebpageBot` | Title ~65 chars; description ~140 chars |
| **Apple iMessage** (`LPLinkMetadata`) | 1200 × 630 px (`1.91:1`) | Rounded rich link bubble prioritizing `og:title` and `og:image` | Fetched on sender device; cached locally per conversation | Title ~50–60 chars; description omitted |

## Image Geometry, Safe Zones, and Cold-Cache Pre-Allocation

Designing one Open Graph banner that survives both widescreen feeds and square chat thumbnails comes down to geometry and compression:

1. **Maintain a `1.91:1` Canvas with a Central `1:1` Safe Zone**: Export banners at `1200 × 630` pixels (ratio `1.905`). Keep logos, headlines, and focal portraits centered inside an imaginary `630 × 630` inner square so WhatsApp and narrow mobile surfaces never slice off words along the left or right edges.
2. **Stay Below WhatsApp's 300 KB Ceiling**: High-resolution PNG banners with photographic gradients routinely exceed 800 KB—guaranteeing a blank thumbnail in WhatsApp chats. Resize canvases cleanly with our [Image Resizer](/en/tools/resize-image) and optimize them into lightweight JPEG or WebP assets using our [Image Compressor](/en/tools/compress-image) before uploading to your CDN.
3. **Declare `og:image:width` and `og:image:height`**: When a brand-new article is shared for the very first time, Facebook's crawler parses HTML synchronously but decodes new image assets asynchronously. Without explicit pixel dimensions, the first share often renders text-only. Providing `width`, `height`, and accessible `og:image:alt` markup solves cold-cache misses immediately.
4. **Avoid SVG and `data:` URIs in Production**: Neither Facebook, LinkedIn, nor WhatsApp rasterizes SVG Open Graph images, and embedded Base64 data URIs are ignored by remote unfurlers. When you drop a local mockup into this tool's workspace, the preview renders instantaneously via `FileReader`, while the exported HTML automatically inserts a clean `https://` placeholder URL as a deployment reminder.

## Object Type Namespaces Beyond `og:type="website"`

Although `website` covers homepages and tool landing pages, switching `og:type` unlocks structured vertical namespaces that social catalogs, news aggregators, and link-enrichment pipelines parse directly:

```html
<!-- Open Graph Core + Product Namespace -->
<meta property="og:type" content="product" />
<meta property="og:title" content="Zenith Pro Ergonomic Mechanical Keyboard" />
<meta property="og:description" content="Hot-swappable gasket-mounted tactile keyboard in CNC aluminum. Ships worldwide." />
<meta property="og:url" content="https://ergokeys.com/products/zenith-pro" />
<meta property="og:image" content="https://ergokeys.com/og/zenith-pro-v2.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Top-down view of the Zenith Pro aluminum ergonomic keyboard" />
<meta property="og:site_name" content="ErgoKeys" />
<meta property="og:locale" content="en_US" />

<meta property="product:price:amount" content="189.99" />
<meta property="product:price:currency" content="USD" />
<meta property="product:availability" content="instock" />
<meta property="product:condition" content="new" />
<meta property="product:retailer_item_id" content="EK-ZENITH-PRO" />
```

Editorial pages using `og:type="article"` benefit from ISO 8601 UTC timestamps (`article:published_time`, `article:modified_time`), author profile URLs (`article:author`), taxonomy (`article:section`), and repeatable `article:tag` lines—one `<meta>` element per tag rather than a single comma-delimited string. Similarly, `video`, `music`, and `profile` objects emit repeatable `video:actor`, `video:director`, and `music:musician` predicates cleanly.

## Debugging Scraper Caches and Common Markup Failures

Even valid tags fail in production due to four recurring infrastructure issues:

- **`name` vs. `property` Confusion**: Open Graph uses `property="og:..."`, whereas X's native namespace uses `name="twitter:..."`. To layer custom X cards (`summary_large_image`, `player`, or `app`) cleanly alongside Open Graph, use our [Twitter Card Generator](/en/tools/twitter-card-generator).
- **WAF Rules Blocking Unfurlers**: Strict firewall rules that challenge headless user agents often return `403` or CAPTCHA screens to `LinkedInBot` and `Slackbot-LinkExpanding`. Allowlist legitimate social crawler user agents and ASNs.
- **Unversioned Image Overwrites**: Replacing `/og/home.jpg` in place rarely refreshes existing shares because platforms cache binaries separately from HTML. Version your asset path (`/og/home-v2.jpg` or `?v=2`) before triggering a re-scrape.
- **Client-Side-Only Tag Injection**: Single-page apps that inject `<meta property="og:*">` inside client lifecycle hooks look blank to static HTML scrapers; emit Open Graph tags on the server or at the edge so they ship inside the initial response.
