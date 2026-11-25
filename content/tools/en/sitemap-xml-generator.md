---
metaTitle: "Sitemap.xml Generator & Index Builder | SEO XML Validator"
metaDescription: "Build standard, image, video, and news XML sitemaps and sitemap indexes with Next.js presets, 45k-URL ZIP splitting, and live SEO validation."
metaKeywords: "sitemap xml generator, sitemap index builder, xml sitemap validator, google image sitemap, video sitemap generator, google news sitemap, nextjs sitemap xml, seo sitemap tool"
title: "Sitemap.xml Generator & Index Builder"
shortDescription: "Build valid standard, image, video, and news XML sitemaps or multi-file sitemap indexes with framework presets, real-time protocol validation, and automatic 45,000-URL ZIP partitioning — 100% client-side."
faqs:
  - question: "What are the hard URL count and byte-size limits for a single XML sitemap?"
    answer: "Under Sitemaps Protocol 0.9, a single sitemap XML file can declare at most 50,000 URLs and must not exceed 50 MB (52,428,800 bytes) uncompressed. When your site crosses either ceiling, split URLs into child sitemaps and reference them from a root sitemap index file."
  - question: "How do Google and Bing treat <lastmod>, <changefreq>, and <priority> tags today?"
    answer: "Google and Bing both ignore <priority> and <changefreq> values because site owners routinely set every page to 1.0 and daily. By contrast, both engines actively use accurate W3C Datetime <lastmod> timestamps to schedule recrawls whenever a page undergoes meaningful content updates."
  - question: "When should you switch from a single <urlset> sitemap to a <sitemapindex> file?"
    answer: "Switch to a sitemap index once your URL inventory approaches 50,000 entries, nears 50 MB uncompressed, or spans distinct content types (such as products, blog posts, and videos) that benefit from isolated Google Search Console indexing diagnostics."
  - question: "Which XML namespaces are required for Image, Video, and Google News sitemaps?"
    answer: "Standard URLs use xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'. Adding rich media requires declaring xmlns:image='http://www.google.com/schemas/sitemap-image/1.1', xmlns:video='http://www.google.com/schemas/sitemap-video/1.1', or xmlns:news='http://www.google.com/schemas/sitemap-news/0.9' on the root <urlset> element—handled automatically by this generator."
  - question: "Why does the live validator flag query parameters, duplicate URLs, or non-HTTPS host URLs?"
    answer: "Search engines expect sitemaps to list only canonical, HTTPS, 200 OK destination URLs. Duplicate paths waste crawl budget, query parameters (?utm_, ?sort=) introduce duplicate-content conflicts, and plain HTTP hosts split indexing signals away from your secure canonical origin."
features:
  - "Dual-mode XML builder outputting Sitemaps 0.9 <urlset> files and multi-file <sitemapindex> master indexes in beautified or minified XML"
  - "Automatic namespace declaration and structured forms for Google Image (1.1), Video (1.1), and News (0.9) sitemap extensions"
  - "Four ready-to-edit framework and site presets covering Next.js App Router, E-Commerce Catalog, Blog/Magazine Hub, and SaaS Landing & Docs"
  - "Bulk newline-delimited URL importer with automatic host normalization, live search filtering, paginated entry management, and local storage persistence"
  - "Real-time SEO validation engine auditing HTTPS origins, 50,000-URL and 50 MB thresholds, homepage coverage, duplicate paths, query parameters, and required extension fields"
  - "Client-side ZIP partitioning (via JSZip) that automatically chunks inventories above 45,000 URLs into numbered child sitemaps plus a master index"
useCases:
  - "Generating a clean canonical sitemap.xml baseline for new Next.js 15 App Router, Astro, or static websites prior to public launch"
  - "Partitioning large e-commerce product catalogs exceeding 50,000 SKUs into compliant child sitemaps under a root sitemap-index.xml"
  - "Attaching <image:image> loc, title, and caption nodes to product galleries and photography pages to accelerate Google Images discovery"
  - "Declaring <video:video> thumbnail, player, and content stream URLs for JS-rendered landing pages whose embeds crawlers might otherwise miss"
  - "Publishing Google News <news:news> sitemaps with ISO 639 language codes and publication timestamps for breaking articles within the 48-hour window"
  - "Auditing bulk-exported CMS URL lists to eliminate duplicate paths and tracking query strings before submission to Google Search Console and Bing Webmaster Tools"
howToSteps:
  - "Enter your canonical HTTPS base host URL (such as https://example.com) and select either Standard Sitemap (<urlset>) or Sitemap Index (<sitemapindex>) mode."
  - "Start from one of the four built-in presets (Next.js App Router, E-Commerce, Blog, or SaaS), paste URLs via Bulk Import, or add individual route entries."
  - "Configure optional <lastmod>, <changefreq>, and <priority> values, and select Image, Video, or News entry types when attaching specialized Google extension metadata."
  - "Inspect the real-time validation panel to confirm HTTPS protocol compliance, zero duplicate or parameterized URLs, complete extension fields, and safe byte size."
  - "Choose Beautify (2-space indented XML) or Minify output, then copy the markup or download sitemap.xml or sitemap-index.xml locally."
  - "For large URL inventories, click Download Partitioned ZIP to generate 45,000-URL child sitemaps and an index file, deploy them to your domain root, and declare the index in robots.txt."
---

An XML sitemap is not a direct ranking signal—it is a machine-readable **canonical URL inventory** governed by **Sitemaps Protocol 0.9**, jointly adopted by Google, Bing, Yandex, and Yahoo. On small brochure sites with flat navigation, search bots eventually find most pages through internal links alone. On newly launched domains, large e-commerce catalogs, JavaScript-rendered Next.js applications, or media publishers with deep pagination, a validated `sitemap.xml` speeds up URL discovery and directs crawlers immediately to updated content. Generating and auditing sitemaps entirely inside your browser also prevents unreleased route hierarchies and pre-launch product slugs from leaking to third-party web servers.

## Sitemaps 0.9 Protocol Constraints and Crawler Signal Reality

Search engine parsers enforce strict structural constraints on XML sitemaps and drop non-compliant files with Search Console fetch errors:

- **Hard URL and Size Ceilings**: Every uncompressed sitemap file is limited to **50,000 `<url>` elements** and **50 MB (52,428,800 bytes)**. A `<sitemapindex>` file may likewise reference up to 50,000 child sitemaps, scaling cleanly to 2.5 billion canonical URLs. To protect deployments from edge overflows, this generator's ZIP partitioner chunks inventories at **45,000 URLs per child file**, leaving a 5,000-URL safety buffer below the protocol cap.
- **UTF-8 Encoding and XML Escaping**: Files must begin with `<?xml version="1.0" encoding="UTF-8"?>`, declare fully qualified absolute URLs (`https://...`), and escape reserved XML entities (`&amp;`, `&apos;`, `&quot;`, `&lt;`, `&gt;`).
- **Host and Directory Scope**: A sitemap published at `https://example.com/blog/sitemap.xml` is only authoritative for paths beneath `/blog/`. Deploy your primary `sitemap.xml` or `sitemap-index.xml` at the domain root so it covers every route across that origin.
- **Signals Crawlers Actually Honor**: Both Googlebot and Bingbot **ignore `<priority>` and `<changefreq>`** because legacy CMS plugins inflated every URL to `1.0` and `daily`. Both engines actively evaluate **`<lastmod>`** (encoded in W3C Datetime format, such as `2026-11-24` or `2026-11-24T14:30:00+00:00`)—provided timestamps change only when substantive page content changes rather than on every automated CI rebuild.

## XML Namespaces and Extension Specification Matrix

Beyond core web URLs, Google defines XML namespace extensions that nest directly inside `<url>` blocks to surface images, embedded video streams, and breaking news articles without waiting for full JavaScript rendering:

| Sitemap Schema | Root / Node Element | Required Namespace URI (`xmlns`) | Mandatory Child Tags | Protocol Limits & Operational Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Core Sitemap 0.9** | `<urlset>` / `<url>` | `http://www.sitemaps.org/schemas/sitemap/0.9` | `<loc>` | Max 50,000 URLs or 50 MB uncompressed; `<lastmod>` strongly recommended |
| **Sitemap Index 0.9** | `<sitemapindex>` / `<sitemap>` | `http://www.sitemaps.org/schemas/sitemap/0.9` | `<loc>` | Max 50,000 child sitemaps; `<lastmod>` tracks newest child update |
| **Google Image 1.1** | `<image:image>` | `http://www.google.com/schemas/sitemap-image/1.1` | `<image:loc>` | Up to 1,000 images per `<url>`; surfaces CDN or lazy-loaded images |
| **Google Video 1.1** | `<video:video>` | `http://www.google.com/schemas/sitemap-video/1.1` | `<video:thumbnail_loc>`, `<video:title>`, `<video:description>`, plus `content_loc` or `player_loc` | Exposes stream locations, players, and thumbnails for video indexing |
| **Google News 0.9** | `<news:news>` | `http://www.google.com/schemas/sitemap-news/0.9` | `<news:publication>` (`name`, `language`), `<news:publication_date>`, `<news:title>` | Limited to articles published within the last **48 hours**; max 1,000 URLs |

## Production XML Patterns: Extensions and Index Partitioning

When combining standard URLs with image metadata, declare only the XML namespaces actually present in the file so downstream validators parse cleanly:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://example.com/products/ergonomic-chair</loc>
    <lastmod>2026-11-20</lastmod>
    <image:image>
      <image:loc>https://cdn.example.com/images/ergonomic-chair-front.webp</image:loc>
      <image:title>Ergonomic Mesh Office Chair</image:title>
      <image:caption>Adjustable lumbar support chair in matte slate</image:caption>
    </image:image>
  </url>
</urlset>
```

Once your catalog surpasses 45,000 URLs—or when you want isolated Search Console indexation telemetry across blog posts, documentation, and product catalogs—group child feeds inside a root `<sitemapindex>` file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-part-1.xml</loc>
    <lastmod>2026-11-24</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-part-2.xml</loc>
    <lastmod>2026-11-24</lastmod>
  </sitemap>
</sitemapindex>
```

### Deployment Verification, Gzip Compression, and Discovery

After copying your generated XML—or extracting the partitioned ZIP archive—into your static `/public` folder or CDN bucket, confirm the live endpoint responds with `HTTP/2 200` and `content-type: application/xml; charset=utf-8` rather than an HTML fallback page:

```bash
curl -I https://example.com/sitemap.xml
```

Large production feeds are frequently compressed with gzip (`.xml.gz`) to slash egress bandwidth; keep in mind that Google enforces the **50 MB ceiling against the uncompressed XML size**, not the compressed download size. If you host sitemap shards on an external object-storage host such as S3 or Cloudflare R2, authorize cross-domain ownership by verifying both origins in Search Console and declaring the absolute CDN sitemap URL inside your primary domain's `/robots.txt` (`Sitemap: https://example.com/sitemap-index.xml`) via our [Robots.txt Generator](/en/tools/robots-txt-generator). For dynamic Next.js 15 App Router projects, export the built-in starter preset here to verify static routes before wiring database queries into `app/sitemap.ts` or `generateSitemaps()`.

## Pre-Submission Crawl Hygiene and Technical SEO Integration

A noisy sitemap erodes crawler trust and wastes crawl capacity on non-indexable endpoints. Enforce four hygiene checks before submitting your feed to Google Search Console and Bing Webmaster Tools:

1. **List Only `200 OK` Self-Canonical URLs**: Exclude `301`/`302` redirects, `404`/`410` error paths, and alternate non-canonical URLs. Audit migrated slugs in our [Redirect Checker](/en/tools/redirect-checker) to eliminate redirect chains before export.
2. **Avoid `noindex` and `Disallow` Contradictions**: Listing a URL in `sitemap.xml` while blocking it via `robots.txt` or sending an `X-Robots-Tag: noindex` response creates conflicting crawl directives. Inspect server responses with our [HTTP Header Checker](/en/tools/http-header-checker) and keep HTML canonical tags consistent using our [Meta Tag Generator](/en/tools/meta-tag-generator).
3. **Exclude Parameterized Facets and Tracking Tags**: Query strings like `?sort=price`, `?color=slate`, or `?utm_source=email` trigger live warnings in this tool's validator and should never dilute your canonical sitemap.
4. **Re-Validate XML After Manual Edits**: Whenever you merge CI-generated chunks or adjust metadata by hand, verify well-formed XML syntax and proper entity escaping inside our [XML Formatter](/en/tools/xml-formatter) prior to release.
