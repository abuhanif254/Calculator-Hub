import { ToolConfig } from './types';

export const sitemapXmlGeneratorConfig: ToolConfig = {
  slug: "sitemap-xml-generator",
  title: "Sitemap.xml Generator & Index Builder",
  shortDescription: "Generate valid standard, image, video, and news XML sitemaps. Create sitemap indexes, partition large sites, utilize presets for Next.js, and analyze your crawl configuration with real-time validation.",
  category: "Web Dev Utilities",
  keywords: [
    "sitemap xml generator", "xml sitemap builder", "sitemap creator", "nextjs sitemap generator",
    "seo sitemap tool", "xml sitemap creator", "website sitemap generator", "google sitemap generator",
    "image sitemap generator", "video sitemap creator", "news sitemap builder", "sitemap index generator"
  ],

  longDescription: `
## What is a Sitemap.xml File?

A **sitemap.xml** file is an XML document designed specifically to guide search engine crawlers (such as Googlebot, Bingbot, YandexBot, and Baiduspider) to all the indexable pages of your website. It acts as an authoritative roadmap of your site's architecture. Instead of relying solely on crawlers discovering pages by following links (which is prone to missing orphaned pages or deeply nested nodes), a sitemap lists all canonical URLs in one centralized location.

Sitemaps are defined by the **Sitemaps XML Protocol**, which was introduced by Google in 2005 and subsequently standardized by the joint backing of Yahoo and Microsoft in 2006. Today, it is governed by the sitemaps.org schema standard, ensuring universal compatibility across all major search engines.

---

## Why XML Sitemaps Matter for SEO

While search engine spiders are excellent at crawling hyperlinks, they do not guarantee full coverage. An XML sitemap is a core element of technical search engine optimization (SEO) for several reasons:

1. **Faster Indexation of New Content**: When you publish a new page or update an existing one, listing it in your sitemap alerts search engines immediately, especially when linked from a sitemap index or declared in your robots.txt file.
2. **Orphaned Page Discovery**: Orphaned pages are those that do not have any internal links pointing to them. Without a sitemap, search engines might never discover these pages.
3. **Crawl Efficiency (Crawl Budget)**: By specifying modification times (\`lastmod\`), change frequencies (\`changefreq\`), and relative priorities (\`priority\`), you tell search engines which pages are critical and which ones haven't changed, saving server resources.
4. **Topical Authority**: A structured sitemap shows search engines the depth and topical hierarchy of your website, helping them understand how your pages relate to one another.
5. **Rich Media Indexation**: Standard HTML links might not represent embedded images, videos, or news articles optimally. Specialized sitemaps ensure these elements appear in Google Image, Video, and News search results.

---

## How Search Engines Use Sitemaps

Search engines process sitemaps asynchronously using background queues:

\`\`\`
[ Sitemap Discovered ] ──> [ Download XML ] ──> [ Extract & Filter URLs ] ──> [ Crawl Queue ] ──> [ Indexing ]
\`\`\`

1. **Discovery**: Search engines find your sitemap from your Robots.txt declaration, Google Search Console, or Bing Webmaster Tools.
2. **Parsing**: The crawler downloads the XML file and validates it against the sitemaps.org schema definitions.
3. **Prioritization**: URLs within the sitemap are checked against indexing criteria. Non-canonical pages, redirects (3xx), and error pages (4xx/5xx) are filtered out.
4. **Queueing**: Allowed URLs are added to the crawler’s scheduling queue based on metadata flags like the last modified date (\`lastmod\`).

---

## The Sitemap Indexing Process

Submitting a sitemap does not guarantee indexing; it is a *hint* rather than a command. Google uses sitemaps to build its discovery queue. Once a URL is discovered from a sitemap, it must still pass Google's quality and canonicalization checks before it is displayed in search results. You can monitor the progress inside Google Search Console under the **Sitemaps** report, which displays the status of submitted sitemaps, last read times, and the number of discovered URLs.

---

## Sitemap vs. Robots.txt: What's the Difference?

A common point of confusion is the difference between a robots.txt file and a sitemap.xml file. They serve opposing but complementary functions:

| Feature | Robots.txt | Sitemap.xml |
| :--- | :--- | :--- |
| **Primary Purpose** | Restrict crawler access to specific directories/pages. | Direct crawlers to all pages that should be indexed. |
| **Nature of Directives** | Mandatory rules (Disallow/Allow) that bots must follow. | Suggestions and hints (URLs, priority, modification dates). |
| **Ideal for...** | Hiding admin panels, query parameters, private APIs. | Showcasing landing pages, blog posts, product catalogs. |
| **Search Engine Support** | Universally enforced by all major search engines. | Universally read to optimize discovery pipelines. |

---

## Standard XML Sitemap Structure

A valid standard XML sitemap uses the sitemaps.org schema namespace. Below is an example of a basic sitemap with a single URL:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nexuscalculator.net/</loc>
    <lastmod>2026-05-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
\`\`\`

* **\`<urlset>\`**: The root element enclosing all URLs in the sitemap. It references the XML schema namespace.
* **\`<url>\`**: The container element for each individual URL.
* **\`<loc>\`**: The absolute URL of the page. It must begin with the correct protocol (http/https).

---

## Sitemap Priority & Change Frequency Explanation

### The Priority (\`<priority>\`) Tag
The priority tag tells search engines how important a specific page is relative to other pages *on your own site*. Values range from \`0.0\` (lowest) to \`1.0\` (highest). 
* **1.0 - 0.8**: Homepage, major category hubs, key landing pages.
* **0.7 - 0.4**: Subcategories, blog posts, product pages, utility tools.
* **0.3 - 0.1**: Terms of service, archive pages, contact pages, legal disclosures.
* *Note: Setting all pages to 1.0 does not improve rankings; search engines will ignore the priority tag if it is abused.*

### The Change Frequency (\`<changefreq>\`) Tag
Suggests how frequently the page content is likely to change. Spiders use this to adjust their return rate:
* **always**: Real-time stock tickers, currency tables, active forums.
* **hourly / daily**: News homepages, blog index pages, weather portals.
* **weekly / monthly**: Product listing pages, standard blog articles.
* **yearly / never**: Contact pages, static documentation, archive folders.

---

## Specialized Sitemap Extensions

Search engines support schema extensions to catalog multimedia and real-time news content:

### 1. Image Sitemaps
Allows search engines to discover images embedded in JS galleries or CSS containers.
* **Namespace**: \`xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\`
* **Elements**: \`<image:image>\`, \`<image:loc>\` (URL of the image), \`<image:title>\`, \`<image:caption>\`.

### 2. Video Sitemaps
Crucial for helping Google understand rich video content layout.
* **Namespace**: \`xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"\`
* **Elements**: \`<video:video>\`, \`<video:thumbnail_loc>\`, \`<video:title>\`, \`<video:description>\`, \`<video:content_loc>\` (raw media URL), \`<video:player_loc>\` (iframe URL).

### 3. News Sitemaps
Allows you to display articles in Google News and the "Top Stories" carousel.
* **Namespace**: \`xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\`
* **Constraints**: Must only contain articles published within the last 48 hours. URLs must be removed or updated after 48 hours.
* **Elements**: \`<news:news>\`, \`<news:publication>\` (name and language), \`<news:publication_date>\`, \`<news:title>\`.

---

## Sitemap Index Files

A single sitemap file is limited by search engine protocols to a maximum of **50,000 URLs** and an uncompressed file size of **50 Megabytes (MB)**. If your website exceeds either limit, you must split your URLs into multiple sitemaps and list them in a **Sitemap Index** file:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://nexuscalculator.net/sitemap-calculators.xml</loc>
    <lastmod>2026-05-21T14:32:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://nexuscalculator.net/sitemap-tools.xml</loc>
    <lastmod>2026-05-21T14:32:00Z</lastmod>
  </sitemap>
</sitemapindex>
\`\`\`

---

## Crawl Budget Optimization Tips

To make the most of the crawl budget allotted to your site:
1. **Exclude Non-Canonical URLs**: Never include URL parameters, session IDs, redirects, or canonical link tag targets that point to other pages.
2. **Update the \`lastmod\` Time Dynamically**: Only update the last modification time when a meaningful text change occurs. Faking updates causes search engines to stop trusting your sitemap.
3. **Partition by Section**: Group sitemaps by category (e.g. \`product-sitemap.xml\`, \`blog-sitemap.xml\`). If indexation drops, you can isolate which group has crawl blocks.

---

## Next.js Sitemap Generation Guide

In modern Next.js applications (App Router), sitemap generation can be automated by creating a \`sitemap.ts\` file inside the \`app\` directory. Here is a simple dynamic generation setup:

\`\`\`typescript
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch('https://api.yoursite.com/products');
  const products = await response.json();

  const productEntries = products.map((prod: any) => ({
    url: \`https://yoursite.com/products/\${prod.slug}\`,
    lastModified: new Date(prod.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...productEntries,
  ];
}
\`\`\`

---

## Common Sitemap Mistakes to Avoid

* **Relative URLs**: Sitemaps must contain fully-qualified absolute URLs (e.g., \`https://example.com/page\` rather than \`/page\`).
* **Trailing Slash Mismatches**: If your page canonicalizes to \`https://example.com/page/\`, do not write \`https://example.com/page\` in your sitemap.
* **404s and 301s**: Spiders will waste crawl budget navigating pages that redirect or return errors, hurting indexing speed.
* **Capitalization Inconsistencies**: Ensure the casing in your sitemap URLs matches the live website exactly.

---

## Large-Scale Website Sitemap Strategies

For platforms with millions of pages (like large e-commerce directories or databases):
* **Automate Splitting**: Establish a pipeline that automatically groups every 45,000 URLs into a distinct child sitemap and registers them in the main index.
* **Prioritize High-Margin URLs**: Put high-performing and new listings in sitemaps that get submitted first, separating legacy archives to save crawl budget.

---

## International SEO: Hreflang in Sitemaps

If your website serves multiple languages, you can map translations directly in your sitemap using hreflang alternates:

\`\`\`xml
<url>
  <loc>https://nexuscalculator.net/en/tools/sitemap-xml-generator</loc>
  <xhtml:link rel="alternate" hreflang="es" href="https://nexuscalculator.net/es/herramientas/sitemap-xml-generator" />
  <xhtml:link rel="alternate" hreflang="fr" href="https://nexuscalculator.net/fr/outils/sitemap-xml-generator" />
  <xhtml:link rel="alternate" hreflang="en" href="https://nexuscalculator.net/en/tools/sitemap-xml-generator" />
</url>
\`\`\`
`,

  features: [
    "Supports Standard, Image, Video, and News XML schema standards",
    "Generates sitemap index structures for partitioning large website catalogs",
    "Pre-populated presets for Next.js App Router, Pages Router, Blogs, E-Commerce, and SaaS",
    "Real-time validation engine flagging duplicate paths, syntax errors, and missing homepages",
    "Interactive code editor with formatted, beautified, or minified output options",
    "Estimates dynamic XML file size and monitors maximum URL limits (50,000 URLs / 50MB)",
    "Export files directly via download, copy to clipboard, or packaged ZIP formats",
    "Robots.txt integration guide with search engine compatibility audit dashboards"
  ],

  useCases: [
    "Generating an initial XML sitemap for a new Next.js 15 app or static website",
    "Creating specialized sitemaps for Google Images or embedded product videos",
    "Structuring a sitemap index file to split pages by category and optimize crawl budget",
    "Validating existing sitemap configurations for canonical tag conflicts and redirects",
    "Quickly copy-pasting presets to deploy staging or dev server crawling restrictions",
    "Submitting news articles with specialized tags to rank in Google News carousels"
  ],

  howToSteps: [
    "Select a pre-configured Preset (like Next.js or E-Commerce) or begin adding URLs manually.",
    "Add URLs manually using the form fields or use the Bulk Paste text area to import paths in bulk.",
    "Configure individual URL metadata options, including Last Modified Date, Change Frequency, and Relative Priority.",
    "For rich media pages, change the URL type to Image, Video, or News and enter the respective metadata values.",
    "Audit the Validation Panel for warning and error alerts, making sure you have no duplicate links or non-HTTPS routes.",
    "Choose to Beautify or Minify the generated XML inside the Code Preview panel.",
    "Click Copy XML to copy the code, or download files as sitemap.xml or as a compressed ZIP file."
  ],

  faq: [
    {
      question: "What is the maximum limit of an XML sitemap?",
      answer: "A single XML sitemap can hold a maximum of 50,000 URLs and must not exceed an uncompressed file size of 50 Megabytes (MB). If your website exceeds either of these thresholds, you must use a sitemap index file that links to multiple sub-sitemaps."
    },
    {
      question: "Should I include redirected or blocked URLs in my sitemap?",
      answer: "No. You should only list indexable, canonical URLs that return a 200 OK HTTP status code. Including redirected (301/302), broken (404), or robots-blocked pages wastes your crawl budget and can confuse search engine indexing algorithms."
    },
    {
      question: "Does having a sitemap guarantee my pages will be indexed?",
      answer: "No. Sitemaps are crawl hints, not directives. They help search engines discover your pages faster, but the page must still satisfy quality guidelines, have unique content, and be free of indexation blocks (like 'noindex' meta tags) to be indexed."
    },
    {
      question: "How do I submit my sitemap to search engines?",
      answer: "You should submit your sitemap URL directly in Google Search Console's 'Sitemaps' menu and Bing Webmaster Tools' equivalent section. Additionally, adding a line like 'Sitemap: https://yourdomain.com/sitemap.xml' to your robots.txt file helps crawlers locate it automatically."
    },
    {
      question: "What is a sitemap index file?",
      answer: "A sitemap index is a parent XML file that lists multiple child sitemap URLs. It is used to group sitemaps on large sites, letting you organize URLs by content type (e.g. blogs, products, categories) and keep each child file within standard limits."
    },
    {
      question: "Do search engines respect the priority tag?",
      answer: "Google has stated that it currently ignores the priority (<priority>) and change frequency (<changefreq>) tags in standard sitemaps, relying instead on its own algorithms to schedule crawling. However, other search engines (like Bing, Yandex, and Baidu) still use them, and they remain part of the official sitemaps.org protocol."
    }
  ],

  relatedTools: [
    { name: "Robots.txt Generator", slug: "robots-txt-generator" },
    { name: "Meta Tag Generator", slug: "meta-tag-generator" },
    { name: "Open Graph Generator", slug: "open-graph-generator" },
    { name: "Twitter Card Generator", slug: "twitter-card-generator" }
  ],

  examples: [
    {
      title: "Standard Sitemap URL Entry",
      description: "Basic entry listing the homepage with daily updates and maximum priority.",
      input: "URL: https://nexuscalculator.net/\nLast Modified: 2026-05-21\nChange Frequency: daily\nPriority: 1.0",
      output: "<url>\n  <loc>https://nexuscalculator.net/</loc>\n  <lastmod>2026-05-21</lastmod>\n  <changefreq>daily</changefreq>\n  <priority>1.0</priority>\n</url>"
    },
    {
      title: "Image Sitemap Extension",
      description: "URL entry featuring an embedded image attachment mapping for Google Images.",
      input: "URL: https://nexuscalculator.net/tools/sitemap-xml-generator\nImage URL: https://nexuscalculator.net/images/sitemap-preview.png\nImage Title: Sitemap Generator Preview",
      output: "<url>\n  <loc>https://nexuscalculator.net/tools/sitemap-xml-generator</loc>\n  <image:image>\n    <image:loc>https://nexuscalculator.net/images/sitemap-preview.png</image:loc>\n    <image:title>Sitemap Generator Preview</image:title>\n  </image:image>\n</url>"
    },
    {
      title: "Sitemap Index File",
      description: "Index structure pointing search engines to localized category sitemap segments.",
      input: "Sitemap 1: https://nexuscalculator.net/sitemap-calculators.xml\nSitemap 2: https://nexuscalculator.net/sitemap-tools.xml",
      output: "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <sitemap>\n    <loc>https://nexuscalculator.net/sitemap-calculators.xml</loc>\n  </sitemap>\n  <sitemap>\n    <loc>https://nexuscalculator.net/sitemap-tools.xml</loc>\n  </sitemap>\n</sitemapindex>"
    }
  ]
};
