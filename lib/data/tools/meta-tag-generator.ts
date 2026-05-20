import { ToolConfig } from './types';

export const metaTagGeneratorConfig: ToolConfig = {
  slug: "meta-tag-generator",
  title: "Meta Tag Generator & SEO Simulator",
  shortDescription: "Create SEO-optimized HTML meta tags, Open Graph properties, Twitter Cards, PWA configurations, and JSON-LD schemas. Analyze character limits and preview snippets in real-time.",
  category: "Web Dev Utilities",
  keywords: [
    "meta tag generator", "seo meta tags", "open graph generator", "twitter card generator",
    "json-ld schema generator", "seo preview tool", "pwa meta tags", "robots meta generator",
    "hreflang tag generator", "website schema generator", "google snippet simulator",
    "social preview simulator", "meta tags checker", "search engine preview", "verification meta tags"
  ],

  longDescription: `
## Introduction to Meta Tags: The Silent Architects of the Web

In the vast landscape of the World Wide Web, search engine crawlers and social media bots are constantly scanning billions of pages to index content and present it to human searchers. While humans interact with the styled visual elements of a webpage, web crawlers, search bots, and social sharing platforms read a different layer: the **metadata**.

**Meta tags** are snippets of text and HTML code that describe a page's content. They do not appear on the webpage itself, but rather in the page's source code, specifically within the HTML header (\`<head>\`) element. Meta tags tell search engines what a webpage is about, how it should be indexed, and how it should look when shared on platforms like Facebook, X (formerly Twitter), LinkedIn, and Slack.

Understanding and generating optimized meta tags is one of the most critical aspects of Technical Search Engine Optimization (SEO). In this guide, we will unpack everything there is to know about meta tags, explore their history, understand all major categories, and learn how to optimize them to maximize click-through rates (CTR) and search engine rankings.

---

## The Evolution of Metadata: From Keyword Stuffing to Semantics

In the early days of search engines during the 1990s, web indexes like AltaVista and Yahoo relied heavily on simple keyword matching. Webmasters discovered they could manipulate their rankings by inserting hundreds of unrelated keywords into the \`<meta name="keywords" content="..." />\` tag, a practice known as **keyword stuffing**. 

As search algorithms matured—most notably with the introduction of Google's PageRank—search engines shifted their focus to link equity, content quality, and user behavior. In 2009, Google officially announced that the keywords meta tag is ignored in web search rankings. 

Today, metadata is no longer about tricking search engines. It is about **clarity, semantic accuracy, and visual presentation**. Modern search engines use advanced Natural Language Processing (NLP) models (like Google's RankBrain, BERT, and MUM) to understand page context. Meta tags now serve to guide the crawler, provide explicit structured signals, and, most importantly, optimize how the page is presented in Search Engine Result Pages (SERPs) and social feeds. A compelling title and description can significantly boost your organic Click-Through Rate (CTR), driving more traffic to your site even if your position remains the same.

---

## The Categories of Modern Metadata

To build a fully optimized website, you need to understand the different types of meta tags. They can be divided into six major categories:

1. **Basic SEO & Page Information Tags**
2. **Social Media Metadata (Open Graph and Twitter Cards)**
3. **Structured Data (JSON-LD Schema)**
4. **Robot & Crawler Directives**
5. **Mobile & Progressive Web App (PWA) Tags**
6. **Platform Verification Tags**

Let's dive deep into each category to see how they operate.

---

## 1. Basic SEO & Page Information Tags

These are the fundamental tags required for any page seeking indexing in Google, Bing, Yandex, or Baidu.

| Tag | Purpose | Ideal Length / Value |
| :--- | :--- | :--- |
| **Title (\`<title>\`)** | The name of the page shown in browser tabs and SERP headers. | 50–60 characters (max 600px width) |
| **Meta Description** | A summary of the page's contents shown under the title in search results. | 120–160 characters |
| **Canonical URL** | Points crawlers to the authoritative version of the page, preventing duplicate content issues. | Absolute URL (e.g., \`https://site.com/page\`) |
| **Keywords** | Historically used for search matching, now largely ignored but used in internal site searches. | 5–10 comma-separated terms |
| **Author** | Declares the creator or publisher of the article or page. | Author name or Organization |
| **Language** | Declares the character set and primary language of the page content. | e.g., \`UTF-8\`, \`en\`, \`es\` |
| **Viewport** | Tells browsers how to scale the page for mobile screen sizes. | \`width=device-width, initial-scale=1\` |

### Title Tag Optimization
The title tag is the single most important on-page SEO element. It should contain your primary target keyword, a secondary keyword if natural, and your brand name at the end (e.g., \`Primary Keyword - Secondary Keyword | Brand\`). Keep it under 60 characters to prevent truncation in Google search results.

### Meta Description Copywriting
While meta descriptions are not a direct ranking factor, they are your sales pitch in the SERPs. Write a compelling, action-oriented description with a clear Call to Action (CTA) like "Learn more," "Read our guide," or "Start saving today." Include relevant keywords naturally, as search engines will bold them when they match a user's search query.

### Canonical URLs: Preventing Duplicate Content
Duplicate content is a major issue for large sites, particularly e-commerce platforms where products can be accessed via multiple URLs (e.g., with sorting, category filters, or tracking parameters). By specifying a canonical URL, you tell search engines: "No matter what URL you found this on, this is the original version that should receive the link equity and be indexed."

---

## 2. Social Media Metadata: Open Graph & Twitter Cards

When someone shares your content on social networks, the platform doesn't just display a plain link. Instead, it crawls the link to render a rich snippet containing a preview image, page title, description, and source domain. This behavior is governed by two metadata protocols:

### The Open Graph Protocol (OG)
Created by Facebook, the Open Graph protocol is now the industry standard for metadata on social platforms. It is used by Facebook, LinkedIn, Pinterest, Slack, Discord, and Telegram.

- **\`og:type\`**: The type of content (e.g., \`website\`, \`article\`, \`product\`, \`profile\`).
- **\`og:title\`**: The title of the post (should be short and engaging, without brand names if unnecessary).
- **\`og:description\`**: A 2-to-3 sentence description of the content.
- **\`og:image\`**: The URL of an image that will represent the page. The ideal size is **1200 x 630 pixels** (aspect ratio 1.91:1) to ensure full-bleed image displays on high-resolution displays.
- **\`og:url\`**: The canonical URL of the webpage.
- **\`og:site_name\`**: The overall name of the site.

### Twitter Cards
While Twitter (now X) will fall back to Open Graph tags if Twitter-specific tags are missing, it supports its own metadata namespace for custom card formats.

- **\`twitter:card\`**: The card type, typically \`summary\` (small square image) or \`summary_large_image\` (large widescreen image). Large images get significantly more engagement on X.
- **\`twitter:title\`**: The title of the card (max 70 characters).
- **\`twitter:description\`**: The description of the card (max 200 characters).
- **\`twitter:image\`**: The preview image URL.
- **\`twitter:site\`**: The @username of the website owner.
- **\`twitter:creator\`**: The @username of the individual content creator.

---

## 3. Structured Data: JSON-LD Schemas

While HTML meta tags describe page properties in flat key-value pairs, **Structured Data** provides a fully qualified, nested, semantic vocabulary. The standard format endorsed by Google is **JSON-LD** (JavaScript Object Notation for Linked Data), which is embedded inside a \`<script type="application/ld+json">\` block.

Structured data helps search engines understand the exact entities on your webpage. For example, it tells Google that a page isn't just talking about "Google Pixel 9", but that it is a *Product* with a *Price* of $799, has 45 *Reviews*, is in stock, and is sold by a specific *Merchant*.

By implementing structured data, you become eligible for **Rich Results** (formerly Rich Snippets), which include:
- Stars and review ratings in search results.
- Price, stock availability, and shipping info.
- Event dates and locations.
- FAQ lists directly under your search result.
- Site search boxes (Sitelinks Searchbox).
- Breadcrumb trails showing page hierarchy.

---

## 4. Robot & Crawler Directives

Webmasters need control over how crawlers behave. The robots meta tag provides page-level instructions to all search engines (or specific user agents).

\`\`\`html
<meta name="robots" content="index, follow, max-image-preview:large" />
\`\`\`

### Key Directives:
- **\`index\` / \`noindex\`**: Instructs crawlers whether to include the page in search results. Use \`noindex\` for admin pages, login forms, search results pages, and checkout pages.
- **\`follow\` / \`nofollow\`**: Tells crawlers whether to follow the links on this page to discover other pages.
- **\`noarchive\`**: Prevents search engines from saving a cached copy of your page.
- **\`nosnippet\`**: Prevents a text snippet or video preview from appearing in search results.
- **\`max-image-preview:large\`**: Tells search engines they can display high-resolution images in search snippets (crucial for appearing in Google Discover).
- **\`max-snippet:[number]\`**: Specifies the maximum number of characters Google should display in search snippets.

---

## 5. Mobile & Progressive Web App (PWA) Tags

Optimizing for mobile devices goes beyond media queries in CSS. Meta tags play a crucial role in how browsers scale text, how web apps integrate into mobile operating systems, and how mobile links connect to native store apps.

### Viewport Scaling
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
\`\`\`
This is a standard tag. Setting \`width=device-width\` scales the layout to match the width of the physical screen. Setting \`initial-scale=1\` prevents browsers from rendering the page at a desktop scale and zooming out.

### PWA and Native App Shell Meta Tags
If your website operates as a Progressive Web App (PWA), you can instruct iOS and Android to display the site without the browser address bar, making it look like a native application:

- **\`apple-mobile-web-app-capable\`**: Set to \`yes\` to launch in full-screen standalone mode.
- **\`apple-mobile-web-app-status-bar-style\`**: Configures the status bar color on iOS (e.g., \`black-translucent\`, \`default\`).
- **\`theme-color\`**: Sets the color of the browser menu bar on Android Chrome.
- **\`apple-itunes-app\`**: Connects your website to a native iOS application. If a user visits your site on Safari, they will see a banner encouraging them to install or open your app:
  \`<meta name="apple-itunes-app" content="app-id=MY_APP_ID, affiliate-data=MY_AFFILIATE_DATA, app-argument=MY_DEEP_LINK" />\`
- **\`google-play-app\`**: Standardized metadata linking to an Android app.

---

## 6. Localized SEO with Hreflang Tags

If your website serves content in multiple languages or target regions, you must implement \`hreflang\` tags. These tags tell search engines that a page exists in alternative languages, ensuring that a Spanish user sees the Spanish version of your site, while a German user sees the German version.

\`\`\`html
<link rel="alternate" hreflang="es" href="https://nexuscalculator.net/es/tools/meta-tag-generator" />
<link rel="alternate" hreflang="de" href="https://nexuscalculator.net/de/tools/meta-tag-generator" />
<link rel="alternate" hreflang="x-default" href="https://nexuscalculator.net/tools/meta-tag-generator" />
\`\`\`

### The Importance of \`x-default\`
The \`x-default\` hreflang link signals to search engines the default path when no other language matches. This is typically used for landing pages that show language selectors or automatically redirect users based on IP addresses.

---

## Common SEO Meta Tag Pitfalls

1. **Character Truncation**: Writing titles longer than 60 characters or descriptions longer than 160 characters will result in search engines truncating your text with an ellipsis (...), which can ruin your message and lower CTR.
2. **Missing Canonical Tags**: Leaving out canonical tags leads to index bloating if your site uses search pages or UTM parameters. Crawlers will see them as different pages with identical content, diluting page authority.
3. **Double Encoding**: Encoding URL-based metadata multiple times. If your image URL has spaces and is converted to \`%2520\` instead of \`%20\`, it will fail to load in social shares.
4. **Social Cache Issues**: If you update your Open Graph tags, Facebook and Twitter will continue to display the old cached versions. You must use tools like the **Facebook Sharing Debugger** or **X Card Validator** to force the platforms to clear their cache.
5. **Noindex Conflicts**: Declaring \`noindex\` on a page that is also in your \`sitemap.xml\` or has internal links pointing to it. This sends conflicting signals to crawler algorithms.

---

## Future of Search: Meta Metadata in the Age of AI Search Agents

With the rapid emergence of AI-driven search engines like Google Gemini, OpenAI SearchGPT, and Perplexity AI, the way users find information is shifting. AI engines do not merely present a list of links; they synthesize answers from multiple web sources and cite their references.

How do you optimize your site for AI engines?
1. **Explicit Semantic Structure**: AI crawlers rely heavily on clean heading structures and schema.org JSON-LD to accurately parse data.
2. **Rich Snippets & Summaries**: Writing concise summaries in your meta descriptions and introductory paragraphs makes it easier for AI models to select your content as a direct quote or summary text.
3. **Clear Robots.txt and Metadata Declarations**: If you want to prevent AI engines from training on your content but still want to be listed in search results, understanding how to configure robots directives is critical.

Optimizing your website's meta tags remains one of the highest leverage activities for developers and digital marketers. Using our advanced Meta Tag Generator, you can easily design, analyze, preview, and build all standard and advanced tags in seconds, ensuring your web applications are search engine and social media ready.
  `,

  features: [
    "Interactive inputs for Basic SEO, Open Graph, Twitter Cards, PWAs, and Verification tags",
    "Real-time SERP Simulation (Google Search) showing Title, Breadcrumbs, and Description with length metrics",
    "Real-time Facebook Card simulation with responsive layout, widescreen preview image, and title card",
    "Real-time Twitter/X Card simulator with large image summary formats",
    "SEO Quality Score indicator dynamically calculated based on metadata presence and character lengths",
    "Automated warning and recommendations panel highlighting missing tags and length issues",
    "One-click Copy and Download buttons for generated HTML block and JSON-LD schema blocks",
    "Support for multiple website presets (Blog, E-commerce, SaaS, Portfolio, Business, Web App)",
    "Structured JSON-LD schema generator (Website, Organization, Article, FAQ, Breadcrumbs)",
    "Local history logging and backup import/export support for generation sessions",
    "100% client-side execution keeping website parameters secure and private"
  ],

  useCases: [
    "Generating optimized title tags and meta descriptions for new landing pages",
    "Previewing social media share cards to ensure images are aligned and texts are engaging before publishing",
    "Creating structured JSON-LD schemas to earn rich results and review stars on Google SERPs",
    "Generating robots directives and indexation controls for administration or staging websites",
    "Structuring multi-language alternate links (hreflang) to resolve country-specific SEO signals",
    "Exporting metadata configurations for reuse across client websites"
  ],

  howToSteps: [
    "Select a Website Preset that closely matches your project (e.g., Blog or E-commerce) to pre-populate relevant fields.",
    "Fill in the Page Title, Description, and Canonical URL. Check the character counter to keep them within SEO limits.",
    "Add details for Open Graph and Twitter Card tabs. Input an image URL to preview how the card will look when shared.",
    "Configure Advanced tags including Robots directives, Multi-language hreflangs, and Search Engine Verification codes.",
    "If needed, toggle on specific JSON-LD schemas (such as Article, WebSite, or FAQ) and fill in structured properties.",
    "Verify your SEO Score and resolve any warnings in the checklist panel.",
    "Click 'Copy HTML' or 'Download HTML' to copy the code block and paste it directly into your website's <head> section."
  ],

  faq: [
    {
      question: "Do meta keywords still matter for SEO?",
      answer: "No. Major search engines like Google, Bing, and Yahoo announced years ago that they ignore the meta keywords tag in web search rankings due to historical spamming. However, some internal site search scripts or legacy regional engines (like Baidu) may still reference them."
    },
    {
      question: "What are the ideal lengths for Title and Meta Description tags?",
      answer: "For Title tags, the ideal length is between 50 and 60 characters (or under 600 pixels in display width). For Meta Descriptions, stay between 120 and 160 characters. Keeping text within these limits prevents search engines from truncating your snippets with an ellipsis (...) in search results."
    },
    {
      question: "Why isn't my social preview image updating on Facebook?",
      answer: "Social media platforms cache metadata to optimize performance. When you change your Open Graph tags, it won't update immediately in new posts. You must use the Facebook Sharing Debugger (or X Card Validator) to enter your URL and click 'Scrape Again' to clear their server-side cache."
    },
    {
      question: "What is the difference between Robots.txt and robots meta tags?",
      answer: "Robots.txt is a text file at the root of your domain that defines access limits for crawlers (i.e. which folders they are allowed to visit). Robots meta tags are page-level directives (like 'noindex') that instruct search engines whether to index that specific page. A crawler must be allowed to access the page in robots.txt to read its robots meta tag."
    },
    {
      question: "Why should I use JSON-LD instead of Microdata formats?",
      answer: "Google officially recommends using the JSON-LD format for structured data because it is easier to maintain, can be injected dynamically via JavaScript, and separates the page data layout from the visual HTML design. Microdata requires adding custom attributes directly within HTML elements, which can clutter your layout."
    },
    {
      question: "What is the x-default hreflang value used for?",
      answer: "The 'x-default' hreflang attribute value is used to point search engines to a default page when no other localized version matches the user's browser language. It is commonly implemented on language selection pages or homepages that redirect users dynamically based on IP detection."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "HTML Formatter", slug: "html-formatter" },
    { name: "Diff Checker", slug: "diff-checker" }
  ],

  examples: [
    {
      title: "Basic SEO & Robots Directives",
      description: "Standard HTML tags for indexing, canonical mapping, and crawler directives.",
      input: "Title: 'Nexus Calculator - Dev Tools'\nDescription: 'A free online platform with calculators and developer utilities.'\nCanonical: 'https://nexuscalculator.net'\nRobots: 'index, follow'",
      output: "<title>Nexus Calculator - Dev Tools</title>\n<meta name=\"description\" content=\"A free online platform with calculators and developer utilities.\" />\n<link rel=\"canonical\" href=\"https://nexuscalculator.net\" />\n<meta name=\"robots\" content=\"index, follow, max-image-preview:large\" />"
    },
    {
      title: "Open Graph & Twitter Cards Integration",
      description: "Social media meta configuration for Facebook timeline and X post simulation.",
      input: "Title: 'JSON Formatter Tool'\nDescription: 'Instantly format, validate, and minify JSON data.'\nImage URL: 'https://nexuscalculator.net/og-json.png'\nCard Style: 'summary_large_image'",
      output: "<meta property=\"og:type\" content=\"website\" />\n<meta property=\"og:title\" content=\"JSON Formatter Tool\" />\n<meta property=\"og:description\" content=\"Instantly format, validate, and minify JSON data.\" />\n<meta property=\"og:image\" content=\"https://nexuscalculator.net/og-json.png\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<meta name=\"twitter:title\" content=\"JSON Formatter Tool\" />\n<meta name=\"twitter:description\" content=\"Instantly format, validate, and minify JSON data.\" />\n<meta name=\"twitter:image\" content=\"https://nexuscalculator.net/og-json.png\" />"
    },
    {
      title: "JSON-LD Structured Data Schema",
      description: "Structured metadata block defining a WebSite schema with search capabilities.",
      input: "Site Name: 'Nexus Calculator'\nURL: 'https://nexuscalculator.net'\nQuery Parameter: 'search_term_string'",
      output: "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"WebSite\",\n  \"name\": \"Nexus Calculator\",\n  \"url\": \"https://nexuscalculator.net\",\n  \"potentialAction\": {\n    \"@type\": \"SearchAction\",\n    \"target\": {\n      \"@type\": \"EntryPoint\",\n      \"urlTemplate\": \"https://nexuscalculator.net/en/search?q={search_term_string}\"\n    },\n    \"query-input\": \"required name=search_term_string\"\n  }\n}\n</script>"
    }
  ]
};
