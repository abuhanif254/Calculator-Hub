import { ToolConfig } from './types';

export const twitterCardGeneratorConfig: ToolConfig = {
  slug: "twitter-card-generator",
  title: "Twitter Card Generator & X Social Preview",
  shortDescription: "Generate valid Twitter/X Card meta tags with live social previews. Build Summary, App, and Player cards with real-time rendering and HTML export.",
  category: "Web Dev Utilities",
  keywords: [
    "twitter card generator", "twitter meta tags", "x card generator", "social preview generator",
    "twitter seo tool", "twitter preview tool", "social media meta tags", "twitter card validator",
    "summary card generator", "twitter og tags", "x meta tags", "twitter card markup",
    "twitter share preview", "social card generator"
  ],

  longDescription: `
## Introduction to Twitter Cards and the X Platform

When users share links on Twitter (now rebranded as **X**), the platform does not simply display a raw URL string in the timeline feed. Instead, X automatically expands shared links into visually rich preview cards containing a title, description, thumbnail image, and domain attribution. These rich expansions are known as **Twitter Cards**. They transform ordinary text tweets into media-enhanced social posts that dramatically increase user engagement, click-through rates, and brand recognition across the platform.

Twitter Cards are powered by a set of specialized HTML \`<meta>\` tags that website developers embed inside the \`<head>\` section of their web pages. When the X crawler (known internally as **Twitterbot**) fetches a URL, it parses these meta tags to construct the preview card displayed alongside the tweet. Without these tags, shared links appear as plain text URLs with no visual context, reducing engagement by up to 40% according to multiple social media marketing studies.

Our **Twitter Card Generator & X Social Preview** tool allows developers, marketers, and content creators to build, preview, validate, and export production-ready Twitter Card markup without writing a single line of HTML by hand. The tool renders pixel-accurate live previews directly in your browser so you can see exactly how your content will appear in the X timeline before publishing.

---

## The History of Twitter Cards

Twitter first introduced the Cards system in **June 2012** as part of a broader push to make the platform more media-rich and developer-friendly. Before Cards existed, sharing a link on Twitter meant users would see nothing more than the URL text itself. There were no previews, no thumbnails, and no descriptions—just a bare hyperlink lost among hundreds of competing tweets.

The initial rollout included two card types: **Summary Card** and **Photo Card**. These early cards required developers to apply for approval through the Twitter Card Validator before their markup would render on the platform. By **2013**, Twitter expanded the system with the **Summary Large Image Card**, **Player Card** (for embedded video and audio), and the **App Card** (for mobile application installs). The approval requirement was gradually relaxed and eventually removed entirely, making Cards accessible to every website on the internet.

In **2023**, Twitter was acquired and rebranded to **X**. Despite the rebrand, the underlying Cards infrastructure remained largely unchanged. The meta tag namespace still uses the \`twitter:\` prefix, the Twitterbot crawler continues to fetch and parse tags the same way, and the Card Validator tool remains available at \`cards-dev.x.com\`. The X platform continues to support all four primary card types, and the fallback behavior to Open Graph tags remains fully operational.

---

## Why Twitter Cards Matter for SEO and Social CTR

While Twitter Cards do not directly influence Google search rankings, they have a profound indirect impact on SEO and digital marketing performance through several key mechanisms:

1. **Dramatically Higher Click-Through Rates**: Tweets with rich card previews receive significantly more clicks than tweets containing plain-text URLs. The combination of a compelling headline, concise description, and eye-catching thumbnail image creates a visual anchor in the timeline that draws users to engage. Studies by Buffer and Hootsuite have shown that tweets with images and cards receive **150–200% more engagement** than text-only tweets.

2. **Brand Control and Messaging Consistency**: Without Twitter Cards, the X platform may attempt to auto-generate a preview using whatever metadata it can scrape from the page—often pulling incorrect titles, random body text, or unrelated images. By explicitly setting \`twitter:title\`, \`twitter:description\`, and \`twitter:image\`, you maintain full control over your brand presentation across every shared link.

3. **Increased Referral Traffic and Link Authority**: Higher engagement on social platforms drives more referral traffic to your website. This increased traffic volume sends positive behavioral signals to search engines, contributing to improved domain authority and organic rankings over time.

4. **Mobile App Distribution**: The App Card type provides a direct install pathway from the X timeline, complete with app icon, rating, description, and a deep link to the App Store or Google Play Store. This is a powerful acquisition channel for mobile-first businesses.

5. **Video and Rich Media Distribution**: The Player Card allows embedding playable video and audio content directly inside tweets, enabling media companies, podcasters, and video creators to distribute content natively within the X feed without requiring users to leave the platform.

---

## The Four Twitter Card Types

Twitter supports four distinct card types, each designed for a specific content format and use case:

### 1. Summary Card
The default and most widely used card type. Displays a small square thumbnail on the left, with the title, description, and domain name on the right. Best for articles, blog posts, product pages, and general web content.

\`\`\`html
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Your Page Title" />
<meta name="twitter:description" content="A brief page description." />
<meta name="twitter:image" content="https://example.com/thumb.jpg" />
\`\`\`

### 2. Summary Large Image Card
Similar to the Summary Card but features a prominent, full-width banner image above the title and description. Ideal for visual content, photography portfolios, news articles with hero images, and landing pages where the image is a key part of the content story.

\`\`\`html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Page Title" />
<meta name="twitter:description" content="A brief page description." />
<meta name="twitter:image" content="https://example.com/hero.jpg" />
\`\`\`

### 3. App Card
Designed specifically for mobile application promotion. Displays the app icon, name, rating, price, and a direct install button. Supports both iOS and Android with separate tag sets for each platform.

\`\`\`html
<meta name="twitter:card" content="app" />
<meta name="twitter:site" content="@YourHandle" />
<meta name="twitter:app:id:iphone" content="123456789" />
<meta name="twitter:app:id:googleplay" content="com.example.app" />
\`\`\`

### 4. Player Card
Enables embedding of video, audio, or other rich media players directly inside the tweet. Requires a secure (HTTPS) iframe-compatible player URL. Used by platforms like YouTube, Vimeo, Spotify, and SoundCloud.

\`\`\`html
<meta name="twitter:card" content="player" />
<meta name="twitter:player" content="https://example.com/player.html" />
<meta name="twitter:player:width" content="480" />
<meta name="twitter:player:height" content="270" />
\`\`\`

---

## Detailed Tag Reference: All twitter:* Meta Tags

Here is a comprehensive reference table of every supported Twitter Card meta tag:

| Tag Name | Required | Applies To | Description |
| :--- | :--- | :--- | :--- |
| **\`twitter:card\`** | Yes | All types | The card type: \`summary\`, \`summary_large_image\`, \`app\`, or \`player\`. |
| **\`twitter:title\`** | Yes | All types | The title of your content. Maximum **70 characters**. Falls back to \`og:title\`. |
| **\`twitter:description\`** | Yes | All types | A concise content summary. Maximum **200 characters**. Falls back to \`og:description\`. |
| **\`twitter:image\`** | Yes | summary, summary_large_image | Absolute URL to the preview image. Falls back to \`og:image\`. |
| **\`twitter:image:alt\`** | Recommended | summary, summary_large_image | Alt text for the image. Maximum **420 characters**. Critical for accessibility. |
| **\`twitter:site\`** | Recommended | All types | The @username of the website or publisher account. |
| **\`twitter:creator\`** | Optional | All types | The @username of the individual content author. |
| **\`twitter:player\`** | Yes | player | HTTPS URL to the iframe-compatible media player. |
| **\`twitter:player:width\`** | Yes | player | Width of the player iframe in pixels. |
| **\`twitter:player:height\`** | Yes | player | Height of the player iframe in pixels. |
| **\`twitter:player:stream\`** | Optional | player | Direct URL to the raw video stream file (MP4, WebM). |
| **\`twitter:app:id:iphone\`** | Yes | app (iOS) | The numeric App Store ID for the iPhone application. |
| **\`twitter:app:id:ipad\`** | Optional | app (iOS) | The numeric App Store ID for the iPad application. |
| **\`twitter:app:id:googleplay\`** | Yes | app (Android) | The Google Play Store package name (e.g., \`com.example.app\`). |
| **\`twitter:app:name:iphone\`** | Optional | app (iOS) | Display name of the iPhone app. |
| **\`twitter:app:name:googleplay\`** | Optional | app (Android) | Display name of the Android app. |
| **\`twitter:app:url:iphone\`** | Optional | app (iOS) | Custom deep link scheme for the iPhone app. |
| **\`twitter:app:url:googleplay\`** | Optional | app (Android) | Custom deep link scheme for the Android app. |

---

## Comparison: Twitter Cards vs Open Graph Tags

A common question among developers is whether they need both Twitter Card tags and Open Graph tags. The answer depends on your optimization goals:

**Fallback Behavior**: The X platform is designed to fall back to Open Graph tags when Twitter-specific tags are not present. For example, if \`twitter:title\` is missing, X will use \`og:title\` instead. Similarly, \`twitter:description\` falls back to \`og:description\`, and \`twitter:image\` falls back to \`og:image\`. The only tag that has **no fallback** is \`twitter:card\`—without it, X defaults to the \`summary\` card type.

**When to use both**: If you want the same title, description, and image on both Facebook and X, you can rely on Open Graph tags alone (plus \`twitter:card\`). However, if you want platform-specific optimization—such as a shorter title on X or a different image crop—you should define both tag sets independently.

**Key difference**: Open Graph tags use the \`property\` attribute (\`<meta property="og:title" ...>\`), while Twitter Card tags use the \`name\` attribute (\`<meta name="twitter:title" ...>\`). Mixing these up can cause parsers to ignore your tags entirely.

---

## Platform Behavior: How X Renders Cards

When a URL is shared in a tweet, X processes the card in the following sequence:

1. **Twitterbot Crawl**: The X crawler (User-Agent: \`Twitterbot\`) sends an HTTP GET request to the shared URL. It follows redirects (up to 5 hops) and reads the HTML response.
2. **Meta Tag Parsing**: Twitterbot extracts all \`<meta name="twitter:*">\` tags first. For any missing fields, it falls back to \`<meta property="og:*">\` tags.
3. **Image Fetching**: The crawler downloads the image specified in \`twitter:image\` (or \`og:image\`). Images must be accessible without authentication and served over HTTPS.
4. **Card Assembly**: The parsed metadata is assembled into the appropriate card layout based on the \`twitter:card\` value.
5. **Caching**: X caches the card data aggressively. Once a card is rendered, changes to the source page metadata will not be reflected until the cache is manually purged using the Card Validator tool or until the cache expires naturally (typically 7 days).

---

## Best Practices for Twitter Card Images

Image quality and dimensions are critical for high-performing Twitter Cards. Follow these guidelines:

- **Summary Card thumbnail**: Minimum **144 x 144 pixels**, maximum **4096 x 4096 pixels**. Displayed as a square crop. Use a **1:1 aspect ratio** for best results.
- **Summary Large Image banner**: Minimum **300 x 157 pixels**, recommended **1200 x 628 pixels** (approximately **1.91:1 aspect ratio**). This matches the Open Graph standard, allowing you to reuse the same image asset.
- **File size limit**: Images must be **under 5 MB**. However, for optimal performance and fast rendering on mobile devices, keep images **under 1 MB** and ideally below **300 KB**.
- **Supported formats**: JPEG, PNG, GIF, and WebP. SVG images are **not supported** by the X crawler.
- **Animated GIFs**: Supported for Summary Large Image cards but only the first frame is used for Summary cards.
- **Safe zone**: For Summary cards, ensure all critical visual content (logos, text, faces) is centered within the image since the card crops to a square. For Summary Large Image cards, content should be horizontally centered with no critical elements at the extreme edges.

---

## Implementation Guide: Next.js Integration

Modern web frameworks like Next.js provide built-in metadata APIs that simplify Twitter Card implementation.

### Next.js App Router Metadata

\`\`\`typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'A brief description of your page content.',
  twitter: {
    card: 'summary_large_image',
    title: 'Your Page Title',
    description: 'A brief description of your page content.',
    site: '@YourSiteHandle',
    creator: '@AuthorHandle',
    images: [
      {
        url: 'https://example.com/twitter-card.png',
        width: 1200,
        height: 628,
        alt: 'Preview image description',
      },
    ],
  },
};
\`\`\`

### Static HTML Implementation

For non-framework websites, add the following tags directly inside your \`<head>\` element:

\`\`\`html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@YourSiteHandle" />
<meta name="twitter:creator" content="@AuthorHandle" />
<meta name="twitter:title" content="Your Page Title" />
<meta name="twitter:description" content="A brief description." />
<meta name="twitter:image" content="https://example.com/twitter-card.png" />
<meta name="twitter:image:alt" content="Preview image description" />
\`\`\`

---

## Common Mistakes Developers Make

1. **Forgetting the \`twitter:card\` tag**: This is the only tag with no OG fallback. Without it, X defaults to a basic \`summary\` card, which may not match your intent if you wanted a large image layout.
2. **Using relative image URLs**: The X crawler fetches your page externally. Relative paths like \`/images/card.png\` cannot be resolved. Always use fully-qualified absolute URLs beginning with \`https://\`.
3. **Exceeding character limits**: Titles over 70 characters are truncated with an ellipsis, potentially cutting off your key messaging. Descriptions over 200 characters are similarly clipped.
4. **Serving images over HTTP**: X requires all image assets to be served over **HTTPS**. HTTP image URLs will be silently ignored by the crawler.
5. **Blocking Twitterbot in robots.txt**: If your \`robots.txt\` file disallows the \`Twitterbot\` user agent, X cannot crawl your page and no card will be generated. Ensure Twitterbot has crawl access.
6. **Not testing with the Card Validator**: Many developers deploy their tags without testing them in the official Card Validator tool. This tool is the only way to verify exactly how X will render your card and to purge cached metadata.

---

## Card Validation and Debugging Tips

- **Use the Official Validator**: Visit \`cards-dev.x.com/validator\` and enter your URL to preview exactly how your card will render on X. This is the definitive testing tool.
- **Check Twitterbot Access**: Verify that your server responds correctly to the \`Twitterbot\` user agent. Some CDN configurations or security plugins block unknown bots, which prevents card rendering.
- **Inspect Response Headers**: Ensure your page returns a \`200 OK\` status code and that the \`Content-Type\` header is \`text/html\`. Non-HTML responses (like JSON API endpoints) will not be parsed for card tags.
- **Purge Cached Cards**: If you have updated your tags but the old card still appears, use the Card Validator to force a re-scrape. Alternatively, append a cache-busting query parameter to the URL (e.g., \`?v=2\`).
- **Monitor Error Logs**: X provides error details in the Card Validator when tags are malformed, images are unreachable, or required fields are missing. Always review these error messages before reaching out for support.

---

## Use Cases by Industry

**Media and Publishing**: News organizations use Summary Large Image cards to display headline photography alongside breaking news articles, driving massive click-through from the X timeline.

**E-Commerce and Retail**: Online stores use Summary cards to preview product images, prices, and reviews, creating a seamless shopping discovery experience within social feeds.

**Mobile App Development**: App developers leverage the App Card to promote their iOS and Android applications with direct install links, app store ratings, and branded icons without requiring users to leave the X platform.

**Video and Entertainment**: Content creators and streaming platforms use Player cards to embed trailers, clips, and audio previews directly in tweets, maximizing media consumption and watch time.

**SaaS and B2B Technology**: Software companies use Twitter Cards to share blog content, case studies, and product landing pages with professional preview cards that build trust and authority.

**Personal Branding and Portfolios**: Freelancers, designers, and developers use Summary Large Image cards to showcase portfolio pieces, project screenshots, and professional content when sharing their work on X.

Using our Twitter Card Generator, you can build, preview, and export production-ready markup for any of these card types in seconds—completely free and entirely client-side.
  `,

  features: [
    "Interactive builder supporting all four Twitter Card types: Summary, Summary Large Image, App, and Player",
    "Pixel-accurate live preview rendering that mirrors exactly how cards appear in the X timeline",
    "Automatic OG fallback detection showing which fields will inherit from Open Graph tags when twitter-specific tags are omitted",
    "Image dimension analyzer with aspect ratio validation, file size checks, and safe zone crop preview",
    "One-click Copy HTML and Download HTML export for seamless deployment into any website or CMS",
    "Built-in character counters for title (70 max) and description (200 max) with real-time truncation warnings",
    "App Card builder with separate iOS and Android configuration panels for app ID, name, and deep link URL",
    "100% client-side execution with no server uploads, guaranteeing complete privacy and data security"
  ],

  useCases: [
    "Generating optimized Twitter Card markup to maximize click-through rates and engagement on shared links in the X timeline",
    "Building App Card meta tags with iOS App Store and Google Play Store IDs for mobile app install campaigns",
    "Previewing how Summary Large Image cards will render before deploying to production, ensuring images are not cropped or distorted",
    "Creating Player Card markup for embedding video and audio content directly inside tweets for media companies and podcasters",
    "Comparing Twitter Card tags against existing Open Graph tags to identify redundancies and optimize page header size",
    "Validating image dimensions, file sizes, and aspect ratios against X platform requirements before publishing content"
  ],

  howToSteps: [
    "Select the Twitter Card type from the dropdown: Summary, Summary Large Image, App, or Player.",
    "Enter your page title (max 70 characters) and description (max 200 characters). Watch the live character counters for truncation warnings.",
    "Provide the absolute HTTPS URL to your preview image, or drag and drop an image to validate its dimensions and aspect ratio.",
    "Optionally add the @site and @creator Twitter handles for publisher and author attribution.",
    "For App Cards, enter your iOS App Store ID and/or Google Play package name along with optional deep link URLs.",
    "Review the live preview panel to verify exactly how your card will render in the X timeline feed.",
    "Click 'Copy HTML' or 'Download HTML' to export the generated meta tags and paste them into your page's <head> section."
  ],

  faq: [
    {
      question: "What is the difference between a Summary Card and a Summary Large Image Card on X?",
      answer: "A Summary Card displays a small square thumbnail (144x144 minimum) on the left side alongside the title and description text. A Summary Large Image Card displays a large, full-width banner image (recommended 1200x628) above the title and description. The large image variant is better for visually-driven content like news articles, photography, and landing pages where the hero image is a critical part of the content."
    },
    {
      question: "Do I need both Twitter Card tags and Open Graph tags on my pages?",
      answer: "Not necessarily. The X platform falls back to Open Graph tags when Twitter-specific tags are missing. If you want the same preview on both Facebook and X, you can use Open Graph tags plus just 'twitter:card' to specify the card type. However, if you want platform-specific optimization (different titles, descriptions, or images), you should define both tag sets independently."
    },
    {
      question: "What is the recommended image size for Twitter Cards on X?",
      answer: "For Summary Cards, use a minimum of 144x144 pixels with a 1:1 aspect ratio. For Summary Large Image Cards, the recommended size is 1200x628 pixels with a 1.91:1 aspect ratio. All images must be under 5 MB, served over HTTPS, and in JPEG, PNG, GIF, or WebP format. SVG images are not supported by the X crawler."
    },
    {
      question: "Why is my Twitter Card not showing up when I share a link on X?",
      answer: "Common causes include: 1) Missing the 'twitter:card' meta tag, which is required and has no OG fallback. 2) Using relative image URLs instead of absolute HTTPS URLs. 3) Blocking the Twitterbot crawler in your robots.txt file. 4) Serving images over HTTP instead of HTTPS. 5) The X cache is showing stale data—use the Card Validator at cards-dev.x.com to force a re-scrape."
    },
    {
      question: "How do I clear the cached Twitter Card preview on X?",
      answer: "X caches card metadata aggressively, typically for about 7 days. To force a refresh, visit the Card Validator tool at cards-dev.x.com/validator, enter your URL, and click 'Preview card.' This forces Twitterbot to re-crawl your page and update the cached metadata. You can also append a cache-busting query parameter to your URL (e.g., '?v=2') as a workaround."
    },
    {
      question: "Can I use Twitter Card tags with Next.js or React frameworks?",
      answer: "Yes. Next.js 13+ (App Router) provides a built-in metadata API where you can export a 'metadata' object with a 'twitter' property from any layout or page file. This automatically generates the correct meta tags at build time. For React SPAs without server-side rendering, you can use libraries like 'react-helmet' or 'next-seo' to inject meta tags into the document head dynamically."
    }
  ],

  relatedTools: [
    { name: "Meta Tag Generator", slug: "meta-tag-generator" },
    { name: "Open Graph Generator", slug: "open-graph-generator" },
    { name: "URL Encoder", slug: "url-encoder" },
    { name: "QR Code Generator", slug: "qr-code-generator" }
  ],

  examples: [
    {
      title: "Summary Card Meta Tags",
      description: "Standard Summary Card with a small square thumbnail, suitable for articles, blog posts, and general web pages.",
      input: "Card Type: 'summary'\nTitle: 'Nexus Calculator - Free Developer Tools'\nDescription: 'A comprehensive hub of free online developer and productivity tools.'\nImage: 'https://nexuscalculator.net/twitter-thumb.jpg'\nSite: '@nexuscalculator'",
      output: "<meta name=\"twitter:card\" content=\"summary\" />\n<meta name=\"twitter:site\" content=\"@nexuscalculator\" />\n<meta name=\"twitter:title\" content=\"Nexus Calculator - Free Developer Tools\" />\n<meta name=\"twitter:description\" content=\"A comprehensive hub of free online developer and productivity tools.\" />\n<meta name=\"twitter:image\" content=\"https://nexuscalculator.net/twitter-thumb.jpg\" />\n<meta name=\"twitter:image:alt\" content=\"Nexus Calculator Preview\" />"
    },
    {
      title: "Summary Large Image Card Meta Tags",
      description: "Large image card with a full-width banner image, ideal for news articles, landing pages, and visually-driven content.",
      input: "Card Type: 'summary_large_image'\nTitle: 'The Complete Guide to Web Metadata'\nDescription: 'Learn how to optimize meta tags for SEO and social sharing.'\nImage: 'https://nexuscalculator.net/blog-hero.png'\nSite: '@nexuscalculator'\nCreator: '@johndoe'",
      output: "<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<meta name=\"twitter:site\" content=\"@nexuscalculator\" />\n<meta name=\"twitter:creator\" content=\"@johndoe\" />\n<meta name=\"twitter:title\" content=\"The Complete Guide to Web Metadata\" />\n<meta name=\"twitter:description\" content=\"Learn how to optimize meta tags for SEO and social sharing.\" />\n<meta name=\"twitter:image\" content=\"https://nexuscalculator.net/blog-hero.png\" />\n<meta name=\"twitter:image:alt\" content=\"Blog hero image for the Complete Guide to Web Metadata\" />"
    },
    {
      title: "App Card Meta Tags",
      description: "App Card promoting a mobile application with both iOS and Android install links.",
      input: "Card Type: 'app'\nSite: '@nexuscalculator'\niPhone App ID: '123456789'\niPhone App Name: 'Nexus Tools'\nGoogle Play ID: 'net.nexuscalculator.tools'\nGoogle Play Name: 'Nexus Tools'",
      output: "<meta name=\"twitter:card\" content=\"app\" />\n<meta name=\"twitter:site\" content=\"@nexuscalculator\" />\n<meta name=\"twitter:app:name:iphone\" content=\"Nexus Tools\" />\n<meta name=\"twitter:app:id:iphone\" content=\"123456789\" />\n<meta name=\"twitter:app:url:iphone\" content=\"nexustools://home\" />\n<meta name=\"twitter:app:name:googleplay\" content=\"Nexus Tools\" />\n<meta name=\"twitter:app:id:googleplay\" content=\"net.nexuscalculator.tools\" />\n<meta name=\"twitter:app:url:googleplay\" content=\"https://nexuscalculator.net/app\" />"
    }
  ]
};
