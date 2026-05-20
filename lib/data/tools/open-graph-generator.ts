import { ToolConfig } from './types';

export const openGraphGeneratorConfig: ToolConfig = {
  slug: "open-graph-generator",
  title: "Open Graph Generator & Social Previewer",
  shortDescription: "Design, preview, and generate Open Graph (OG) metadata tags for Facebook, LinkedIn, Slack, Discord, and WhatsApp. Preview sharing cards in real-time.",
  category: "Web Dev Utilities",
  keywords: [
    "open graph generator", "og tags generator", "open graph previewer", "facebook share preview",
    "linkedin post simulator", "slack attachment simulator", "discord rich embed generator",
    "whatsapp link preview", "og image size validation", "social media tag generator",
    "website metadata generator", "og:image generator", "article open graph tags", "product og tags"
  ],

  longDescription: `
## Introduction to the Open Graph Protocol: Linking Web Pages to the Social Graph

In the modern web ecosystem, content is not just discovered through traditional search engine query results. A massive portion of digital traffic is driven by user sharing on social media platforms, communication channels, and chat applications. When someone shares a link to a website on Facebook, LinkedIn, X, Slack, Discord, or WhatsApp, they rarely see a plain text URL. Instead, they see a rich, interactive, visually compelling preview card that displays a title, a brief description, a thumbnail, and the site's name.

This rich visual interaction is governed by the **Open Graph Protocol**. Originally created by Facebook in 2010, the Open Graph Protocol (OGP) was designed to make it simple for web pages to become rich objects in a social graph. By placing standard \`<meta>\` tags in the HTML header (\`<head>\`) of a webpage, developers can explicitly control how their websites are represented, formatted, and displayed on social and messaging networks.

Implementing optimized Open Graph metadata is a crucial pillar of Search Engine Optimization (CTR optimization) and modern marketing. In this exhaustive guide, we will break down the mechanics of Open Graph, explore why it matters, detail platform-specific behaviors, analyze image dimension requirements, and provide developer best practices to ensure your site is completely ready for the social web.

---

## The History and Origin of Open Graph

Before the Open Graph Protocol was introduced, when a user shared a link on a social platform, the platform's scraper bot had to make a guess about what the page was about. The scraper would scan the DOM, pull the page's HTML title tag, select a random snippet of body text for the description, and grab the first image it could find—often an advertisement, navigation arrow icon, or unrelated logo. This resulted in messy, inaccurate, and unappealing shared posts that users were hesitant to click.

Facebook recognized this limitation and introduced the Open Graph Protocol at their F8 conference in 2010. The goal was to establish a unified standard that webmasters could easily implement, turning any web page into a node on the "social graph"—allowing it to have the same features and identity as a native Facebook page or profile.

Over the next few years, the web development community and competing social networks quickly adopted the standard. Although Twitter (now X) introduced its own custom protocol called **Twitter Cards**, its scraper was built to automatically fall back to Open Graph tags if Twitter-specific tags were missing. Today, almost every digital communication platform, from corporate collaboration channels like Slack to peer-to-peer applications like WhatsApp and iMessage, depends on the Open Graph Protocol to generate shared previews.

---

## Why Open Graph Matters: Social CTR & Social Proof

While Open Graph tags do not directly influence your organic ranking positions on Google Search or Bing, they have a massive, indirect impact on SEO and business conversion rates through several mechanisms:

1. **Click-Through Rate (CTR) Optimization**: A beautifully formatted preview card with a high-resolution image and a clear, descriptive headline is far more likely to get clicked than a plain URL or a broken preview. A higher CTR on social networks increases traffic volume to your site, which in turn signals search engines that your content is valuable and engaging.
2. **Brand Protection & Control**: By specifying the \`og:image\`, \`og:title\`, and \`og:description\`, you ensure that you control your brand's messaging. You prevent social platforms from selecting generic placeholder logos or random footer texts as the preview.
3. **Enhanced Shareability and Virality**: Content that looks professional and interesting when shared encourages users to share it further within their own networks. This builds natural backlinks, increases referral traffic, and builds brand authority.
4. **Instant Trust and Social Proof**: Rich previews make shared links look legitimate. Spammers and malicious sites often ignore metadata, so a complete, clean preview card reassures users that clicking the link is safe and that the destination is professional.

---

## Social Platform Preview Behaviors: A Comparative Analysis

Different communication and social platforms parse and render Open Graph tags in distinct ways. Developers and marketers must understand these platform-specific behaviors to optimize previews across all platforms.

### 1. Facebook: The Gold Standard
Facebook’s parser is the most strict. It supports all standard and custom Open Graph metadata namespaces. 
- **Aspect Ratio**: Recommends a **1.91:1 aspect ratio**. If your image matches this, it will render as a large, full-bleed card above the title block.
- **Minimum Resolution**: The image must be at least **600 x 315 pixels** to render a large card, but Facebook strongly recommends **1200 x 630 pixels** for high-density (Retina) screens. Images smaller than 600 x 315 pixels will automatically shrink to a small square thumbnail aligned to the left of the text, reducing visibility by up to 70%.

### 2. LinkedIn: The B2B Hub
LinkedIn is the primary channel for business, professional, and career content. Its crawler is historically slow and caches metadata heavily.
- **Image Requirements**: LinkedIn uses a similar widescreen card layout (1.91:1) and prefers **1200 x 627 pixels**. If the image is smaller than 200 pixels wide, it will not display a preview card at all.
- **Truncation**: LinkedIn truncates titles at approximately **70 characters** and descriptions at around **150 characters**, so keep your key messaging near the beginning.

### 3. Slack & Discord: The Developer and Community Channels
Collaborative workspaces use rich preview embeds to give context to shared links inside chat threads.
- **Discord Preview**: Discord renders a dark-themed card containing the site name, page title, description, and preview image. It also supports a vertical color accent bar on the left margin, which can be configured via the HTML theme-color meta tag.
- **Slack Preview**: Slack crawls pages and presents metadata with a gray border block. Slack supports showing authors, reading times, and custom article labels. It caches images aggressively, which can be cleared using specialized query parameters.

### 4. WhatsApp: Peer-to-Peer Thumbnail Sharing
WhatsApp generates previews directly on the sender's device before sending the message.
- **Aspect Ratio**: Unlike Facebook's widescreen card, WhatsApp displays a small, square thumbnail (1:1 aspect ratio) on the left side of the description block.
- **Constraint**: If your \`og:image\` is not crop-safe, critical details (such as text or logos) will be cut off on the sides. Make sure the central 1:1 area of your image contains the most important elements.
- **Size Limitation**: WhatsApp has a small payload limit. If your OG image file size exceeds **300 KB**, WhatsApp will fail to display any preview image. Keep your preview images highly optimized and compressed!

### 5. Telegram: The Instant Messaging Feed
Telegram renders shared previews as balloon blocks inside chats. It supports both large widescreen banner cards and square thumb layouts, depending on your \`twitter:card\` settings and the configuration of your page metadata.

### 6. Apple iMessage: iOS Rich Links
On iOS devices, iMessage translates shared text links into visual bubble bubbles. It uses standard Open Graph tags, prioritizing the \`og:title\` and \`og:image\`. It caches previews per-device, making local testing tricky.

---

## Detailed Guide to the Core Open Graph Tags

To configure a basic, valid Open Graph integration, you must include the four required properties in your HTML header:

\`\`\`html
<meta property="og:title" content="The Page Title" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page-url" />
\`\`\`

Here is a look at all core tags and their structural definitions:

| Tag Property | Type | Purpose & Technical Guidelines |
| :--- | :--- | :--- |
| **\`og:title\`** | string | The headline of your content. Keep it under **60 characters**. Avoid including your brand name unless it adds value; focus on engagement. |
| **\`og:description\`** | string | A short, enticing summary. The ideal length is **60–90 characters**, which is shorter than Google's 160-character meta description limit. |
| **\`og:image\`** | URL | The URL of the image that represents the page. Must be an absolute URL (e.g., beginning with \`https://\`). |
| **\`og:url\`** | URL | The canonical URL of your page. This defines its identity in the social graph. Likes and shares accrue to this URL. |
| **\`og:type\`** | string | The object type (e.g., \`website\`, \`article\`, \`product\`, \`profile\`). Controls how the object appears in search feeds. |
| **\`og:site_name\`** | string | The global name of your website or brand (e.g., "Nexus Calculator"). |
| **\`og:locale\`** | string | The language locale code (e.g., \`en_US\`, \`es_ES\`). Defaults to \`en_US\` if missing. |

### Image Metadata Extensions
To speed up crawling and rendering, you can specify dimensions explicitly:
- **\`og:image:width\`**: The width of the image in pixels (e.g., \`1200\`).
- **\`og:image:height\`**: The height of the image in pixels (e.g., \`630\`).
- **\`og:image:alt\`**: A text description of the image. Crucial for web accessibility (screen readers) and required by LinkedIn and search algorithms.

---

## Specialized Open Graph Object Types

By default, most pages use the type \`website\`. However, Open Graph supports multiple specialized namespaces that unlock custom fields and features on social feeds.

### 1. The Article Object (\`og:type="article"\`)
Used for blog posts, news stories, and technical guides. This structure adds timeline and authorship details:
- **\`article:published_time\`**: ISO 8601 date format (e.g., \`2026-05-21T00:00:00Z\`).
- **\`article:modified_time\`**: The date the article was last updated.
- **\`article:author\`**: Links to the author's social profile or author bio page.
- **\`article:section\`**: The high-level category of the article (e.g., "Web Development").
- **\`article:tag\`**: Specific tags or keywords describing the content.

### 2. The Product Object (\`og:type="product"\`)
Used for e-commerce catalog items. Social media platforms can display pricing, currency, and stock status:
- **\`product:price:amount\`**: The numerical price (e.g., \`49.99\`).
- **\`product:price:currency\`**: Three-letter currency code (e.g., \`USD\`, \`EUR\`).
- **\`product:availability\`**: Stock status (e.g., \`instock\`, \`oos\`, \`preorder\`).
- **\`product:condition\`**: The physical condition of the item (\`new\`, \`used\`, \`refurbished\`).

### 3. The Profile Object (\`og:type="profile"\`)
Used for user biography pages or member profiles:
- **\`profile:first_name\`**: First name of the profile subject.
- **\`profile:last_name\`**: Last name.
- **\`profile:username\`**: Social username.
- **\`profile:gender\`**: Gender (\`male\` or \`female\`).

---

## Open Graph Image Best Practices: Checklist for Developers

Images are the most important part of social shares. A broken, blurry, or misaligned image will ruin your click-through rates. Follow this checklist:

- **Dimensions**: Target **1200 x 630 pixels** for widescreen layouts.
- **Aspect Ratio**: Maintain exactly **1.91:1**.
- **File Format**: Use **PNG**, **JPEG**, or **WebP**. SVG is not widely supported by social scrapers.
- **Safe Zone**: Ensure that all critical text, logos, or faces are located inside a central **630 x 630 square** safe zone. This prevents WhatsApp or mobile square trims from cropping out important information.
- **File Size**: Compress your images to keep them **under 300 KB** so that mobile platforms (like WhatsApp) can fetch and render them instantly without timing out.
- **Caching**: Social networks cache images heavily. If you change a page's image, update the URL (e.g., add a query parameter like \`?v=2\`) or use debuggers to scrape the URL again.

---

## Technical Integration Guide: Next.js 15 & Static Layouts

If you are building websites using React, Next.js, or standard HTML, here are code examples to integrate Open Graph correctly.

### Next.js App Router Metadata Object
In Next.js 15, you do not need to write raw HTML meta tags. Instead, export a metadata object from your layout or page:

\`\`\`typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Awesome SEO Tool',
  description: 'Manage and optimize your website metadata.',
  openGraph: {
    title: 'Awesome SEO Tool',
    description: 'Manage and optimize your website metadata.',
    url: 'https://nexuscalculator.net/tools/open-graph-generator',
    siteName: 'Nexus Calculator',
    images: [
      {
        url: 'https://nexuscalculator.net/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'SEO Preview Tool Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
\`\`\`

---

## Common Open Graph Mistakes to Avoid

1. **Relative Image URLs**: Writing \`og:image\` as \`/assets/preview.png\`. Social scrapers read your tags from outside your server, so they cannot resolve relative paths. Always use fully-qualified absolute URLs like \`https://nexuscalculator.net/assets/preview.png\`.
2. **Missing Alt Descriptions**: Omitting \`og:image:alt\`. This hurts screen reader users and can cause your shared posts to be penalized by LinkedIn's business feed algorithms.
3. **Huge Image File Sizes**: Uploading raw 4 MB camera images. They will fail to display on messaging platforms and slow down page performance.
4. **Caching Inconsistencies**: Forgetting to update the canonical URL in \`og:url\` after copying templates across different landing pages.
5. **Noindex Conflicts**: Adding Open Graph tags to a page that contains a \`<meta name="robots" content="noindex" />\` tag. If a page shouldn't be indexed, there is no need to optimize it for social shares.

Using our advanced, client-side Open Graph Generator, you can easily select your presets, fill in properties, upload and analyze your preview images, and generate clean HTML blocks ready to paste directly into your header elements.
  `,

  features: [
    "Interactive builder supporting standard and specialized OG properties (Article, Product, Profile, Video, Music)",
    "Drag & drop image uploader with automatic aspect ratio, dimension check, and size optimization alerts",
    "Realistic live previews for Facebook, LinkedIn, Discord, Slack, WhatsApp, Telegram, and iMessage",
    "Open Graph Completeness Scorer with a dynamically updated recommendation checklist",
    "One-click Copy HTML and Download HTML options for easy deployment",
    "Pre-built presets (SaaS, Blog, E-commerce, Business, News, Portfolio, Dev Tool)",
    "Local history persistence and JSON import/export for saving and resuming configuration sessions",
    "100% client-side execution guaranteeing privacy and security for all input data"
  ],

  useCases: [
    "Optimizing shared link previews on Facebook and LinkedIn to increase CTR and viral traffic",
    "Creating professional e-commerce product rich embeds showing pricing, currency, and stock levels",
    "Formatting technical blog articles with publication dates, section tags, and author profiles",
    "Testing and correcting cropped social preview card layouts on WhatsApp and other messaging apps",
    "Validating image resolutions and aspect ratios before uploading resources to production CDN channels",
    "Saving, exporting, and managing multiple client metadata layouts from one interface"
  ],

  howToSteps: [
    "Select an Open Graph Preset template from the configuration bar or start from scratch.",
    "Input your Page Title, Description, and Canonical URL. Check the character counter to match platform standards.",
    "Upload a preview image via drag-and-drop or insert a direct URL. Check the dimensions and aspect ratio analyzer.",
    "Under the 'OG Object Type' dropdown, select the schema type (e.g., Article, Product, or Profile) to reveal custom fields.",
    "Check the SEO Score and resolve any checklist warnings (like missing width/height properties or cropped titles).",
    "Toggle between the social media tabs (Facebook, LinkedIn, Slack, etc.) to review and verify the preview cards.",
    "Click 'Copy HTML' or 'Download HTML' to copy the code block and paste it into your application's header."
  ],

  faq: [
    {
      question: "What is the difference between standard HTML meta tags and Open Graph tags?",
      answer: "Standard HTML meta tags (like 'title' and 'description') are designed specifically for search engines (like Google and Bing) to display snippets on search engine result pages (SERPs). Open Graph tags (prefixed with 'og:') are designed for social sharing platforms (like Facebook, LinkedIn, Slack, and Discord) to render rich card embeds when users share links in chats or posts."
    },
    {
      question: "What is the ideal dimension for an Open Graph image?",
      answer: "The recommended dimension for a widescreen Open Graph image is 1200 x 630 pixels. This matches the standard 1.91:1 aspect ratio. If you want to ensure your image displays correctly on messaging apps like WhatsApp (which crop previews into a square), keep the key content centered inside a 630 x 630 pixel square safe zone."
    },
    {
      question: "Why is the preview image not showing up on WhatsApp?",
      answer: "This is usually caused by two common issues: 1) The image URL is relative (e.g., '/images/og.png') instead of absolute (e.g., 'https://domain.com/images/og.png'). Scrapers require absolute URLs. 2) The image file size exceeds 300 KB. WhatsApp ignores images that exceed this payload size to save bandwidth."
    },
    {
      question: "How do I clear the cached Open Graph preview on Facebook or LinkedIn?",
      answer: "Social networks cache previews to optimize feed loading times. If you update your tags, the preview won't change immediately. You must visit the Facebook Sharing Debugger or LinkedIn Post Inspector, enter your page URL, and click 'Scrape Again' or 'Inspect' to force their servers to clear the cache."
    },
    {
      question: "Does Google use Open Graph tags for ranking web pages?",
      answer: "No, Google does not use Open Graph tags as a direct ranking signal. However, implementing them increases social shares, click-through rates, and traffic, which indirectly helps your SEO by boosting domain traffic, engagement metrics, and organic link building."
    },
    {
      question: "Can I use SVG images for my Open Graph image tag?",
      answer: "No. Most social crawler parsers (including Facebook, X, and LinkedIn) do not support SVG files because they are vector-based and require rendering sandboxes. Use raster formats like PNG, JPEG, or optimized WebP images for your 'og:image' tags."
    }
  ],

  relatedTools: [
    { name: "Meta Tag Generator", slug: "meta-tag-generator" },
    { name: "Sitemap Generator", slug: "sitemap-generator" },
    { name: "HTML Minifier", slug: "html-minifier" },
    { name: "URL Encoder", slug: "url-encoder" }
  ],

  examples: [
    {
      title: "Basic WebSite Open Graph Meta Tags",
      description: "Standard properties for websites, portfolios, and main homepages.",
      input: "Title: 'Nexus Calculator - Developer Tools'\nDescription: 'A free hub of dev tools.'\nImage: 'https://nexuscalculator.net/og.png'\nCanonical: 'https://nexuscalculator.net'",
      output: "<meta property=\"og:type\" content=\"website\" />\n<meta property=\"og:title\" content=\"Nexus Calculator - Developer Tools\" />\n<meta property=\"og:description\" content=\"A free hub of dev tools.\" />\n<meta property=\"og:image\" content=\"https://nexuscalculator.net/og.png\" />\n<meta property=\"og:image:width\" content=\"1200\" />\n<meta property=\"og:image:height\" content=\"630\" />\n<meta property=\"og:image:alt\" content=\"Nexus Calculator Preview Image\" />\n<meta property=\"og:url\" content=\"https://nexuscalculator.net\" />\n<meta property=\"og:site_name\" content=\"Nexus Calculator\" />"
    },
    {
      title: "Article Open Graph Schema",
      description: "Additional article parameters defining author links, section categories, and publication dates.",
      input: "Title: 'Guide to Web Metadata'\nDescription: 'Learn how to optimize meta tags.'\nImage: 'https://nexuscalculator.net/blog-og.png'\nType: 'article'\nAuthor: 'John Doe'\nSection: 'SEO'\nPublished Time: '2026-05-21'",
      output: "<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"Guide to Web Metadata\" />\n<meta property=\"og:description\" content=\"Learn how to optimize meta tags.\" />\n<meta property=\"og:image\" content=\"https://nexuscalculator.net/blog-og.png\" />\n<meta property=\"og:url\" content=\"https://nexuscalculator.net/blog/metadata\" />\n<meta property=\"article:published_time\" content=\"2026-05-21T00:00:00Z\" />\n<meta property=\"article:author\" content=\"https://nexuscalculator.net/authors/john-doe\" />\n<meta property=\"article:section\" content=\"SEO\" />\n<meta property=\"article:tag\" content=\"SEO, Metadata, HTML\" />"
    },
    {
      title: "Product Open Graph Schema",
      description: "Product metadata layout detailing pricing, currency, availability, and item ID.",
      input: "Title: 'Developer Pro Keycap Set'\nDescription: 'Ergonomic layout keycaps.'\nImage: 'https://nexuscalculator.net/product.png'\nType: 'product'\nPrice: '79.99'\nCurrency: 'USD'\nAvailability: 'instock'",
      output: "<meta property=\"og:type\" content=\"product\" />\n<meta property=\"og:title\" content=\"Developer Pro Keycap Set\" />\n<meta property=\"og:description\" content=\"Ergonomic layout keycaps.\" />\n<meta property=\"og:image\" content=\"https://nexuscalculator.net/product.png\" />\n<meta property=\"product:price:amount\" content=\"79.99\" />\n<meta property=\"product:price:currency\" content=\"USD\" />\n<meta property=\"product:availability\" content=\"instock\" />\n<meta property=\"product:condition\" content=\"new\" />"
    }
  ]
};
