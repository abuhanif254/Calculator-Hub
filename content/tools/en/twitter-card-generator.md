---
metaTitle: "Twitter Card Generator & X Live Social Preview Builder"
metaDescription: "Create valid X/Twitter Card meta tags for Summary, Large Image, App, and Player cards with desktop/mobile previews and instant local validation."
metaKeywords: "twitter card generator, twitter meta tags, x card generator, social preview generator, twitter seo tool, twitter preview tool, social media meta tags, twitter card validator, summary card generator, twitter og tags, x meta tags, twitter card markup"
title: "Twitter Card Generator & X Social Preview"
shortDescription: "Generate standards-compliant X (Twitter) Card meta tags for Summary, Summary Large Image, App, and Player formats with desktop/mobile previews, Open Graph sync, and live quality scoring."
faqs:
  - question: "Do I still use twitter:* meta tags after Twitter rebranded to X?"
    answer: "Yes. X retained the original twitter:* meta tag namespace and the Twitterbot crawler user-agent for backward compatibility across the web. Writing x:card or x:title is invalid and will be ignored by X's parser."
  - question: "If my page already has Open Graph tags, which Twitter Card tag is still required?"
    answer: "You must still declare <meta name='twitter:card' content='summary_large_image' /> (or summary, app, or player). X falls back to og:title, og:description, and og:image when Twitter-specific equivalents are absent, but twitter:card has no Open Graph equivalent."
  - question: "Why must Twitter Card tags use the name attribute instead of property?"
    answer: "Unlike Open Graph's RDFa property attribute, the Twitter Card specification defines every directive under the standard HTML name attribute (for example, <meta name='twitter:title' content='...' />). Although Twitterbot occasionally tolerates property attributes, strict validators and downstream parsers expect name."
  - question: "What technical requirements apply to X Player Cards?"
    answer: "Player Cards require an HTTPS iframe endpoint (twitter:player), explicit pixel dimensions (twitter:player:width and twitter:player:height), and permissive framing headers so X can embed the player safely. Video or audio players must avoid auto-playing unmuted audio and must stay responsive inside mobile feeds."
  - question: "Can I generate matching Open Graph tags at the same time?"
    answer: "Yes. Enabling the Sync with Open Graph toggle emits matching og:title, og:description, og:url, og:image, og:image:alt, and og:type tags right beneath your Twitter Card block, and all generation, previews, and 30-slot session storage run strictly locally in your browser."
features:
  - "Full markup generator covering all four official X Card types: Summary, Summary Large Image, App Card (iPhone/iPad/Google Play), and Player Card"
  - "Real-time Desktop and Mobile X timeline card simulator reflecting character truncation and image aspect-ratio framing"
  - "100-point Quality Analyzer validating twitter:title (<=70 chars), twitter:description (<=200 chars), absolute HTTPS URLs, @-prefixed handles, and card-specific mandatory tags"
  - "Optional one-click Open Graph Sync toggle emitting paired property='og:*' tags for Facebook, LinkedIn, and Slack fallback coverage"
  - "Per-tag clipboard copying, complete .txt export, JSON configuration import/export, and 30-session localStorage history"
  - "Five industry presets (Blog Post, Product Page, SaaS Landing Page, Portfolio, and News Article) with instant attribute quote escaping"
useCases:
  - "Testing high-contrast 1200x628 hero headlines on Summary Large Image cards before publishing technical blog posts or product launches"
  - "Configuring App Cards with Apple App Store numeric IDs and Android package names to drive direct mobile app installs from X threads"
  - "Embedding playable podcasts, interactive demos, or video streams inside X timelines using HTTPS Player Card iframes"
  - "Auditing @site publisher attribution and @creator bylines across multi-author newsrooms and engineering blogs"
  - "Eliminating duplicate maintenance by syncing Twitter Card fields to Open Graph fallback tags for single-page launch campaigns"
  - "Sharing reusable JSON card templates between social media managers and frontend developers without uploading draft assets"
howToSteps:
  - "Load one of the five starter presets or choose a card type (Summary, Summary Large Image, App Card, or Player Card) in the Editor tab."
  - "Enter your headline (within 70 characters), summary copy (within 200 characters), canonical URL, and an absolute HTTPS image URL with accessible alt text."
  - "Provide @-prefixed twitter:site and twitter:creator handles for publisher and author attribution."
  - "For App or Player cards, populate the conditional iOS/Android store identifiers or HTTPS iframe player URL and pixel dimensions."
  - "Toggle Sync with Open Graph if you want matching og:* fallback tags appended, then inspect Desktop and Mobile renders in the Preview tab."
  - "Check the Analyzer tab for a 100/100 score and copy individual tags, the complete HTML snippet, or an exported JSON config."
---

When a link is posted to X (formerly Twitter), bare URLs blend into fast-moving timelines and lose visual hierarchy. **Twitter Cards** instruct X's crawler (`Twitterbot`) to expand a hyperlink into a structured media card—ranging from a compact square thumbnail to a full-bleed editorial banner, a native mobile app install unit, or an embedded HTML5 media player. Despite the platform's rebrand to X, the underlying metadata specification still relies exclusively on the `twitter:*` namespace and strict HTML `<meta name="...">` syntax. This generator compiles valid card markup, simulates both desktop and mobile timeline renders, and scores metadata completeness entirely in client-side JavaScript—keeping pre-launch headlines, app store IDs, and saved session configs inside your browser.

## Comparing the Four X Card Formats

Selecting the right `twitter:card` value determines how X allocates viewport real estate and which supplementary tags `Twitterbot` requires before rendering a preview:

| Card Type (`twitter:card`) | Image Geometry & Bounds | Mandatory Tags | Best Fit & Timeline Behavior |
| :--- | :--- | :--- | :--- |
| **`summary`** | `1:1` square; min `144 × 144` px (ideal `400 × 400` px), max 5 MB | `twitter:card`, `twitter:title` (or `og:title`) | Compact left thumbnail with title & domain; ideal for profiles, portfolios, and documentation pages |
| **`summary_large_image`** | `2:1` / `1.91:1` landscape; min `300 × 157` px (ideal `1200 × 628` px), max 5 MB | `twitter:card`, `twitter:title`, `twitter:image` (or OG fallbacks) | Full-width hero image dominating timeline height; highest click-through rate for articles, SaaS, and e-commerce |
| **`app`** | Pulled automatically from App Store / Google Play icon metadata | `twitter:card`, `twitter:app:id:iphone` and/or `twitter:app:id:googleplay` | Native install card displaying store icon, rating, price, and direct deep-link CTA on mobile clients |
| **`player`** | Fallback poster image matching iframe ratio; min `262 × 262` px | `twitter:card`, `twitter:title`, `twitter:player`, `twitter:player:width`, `twitter:player:height`, `twitter:image` | Sandboxed HTTPS iframe playing video, audio, or interactive media natively inside the X feed |

All image assets must be encoded as **JPEG, PNG, WebP, or static GIF** (for animated GIFs, X renders only the first frame). **SVG files are unsupported** and cause `Twitterbot` to drop the visual preview entirely.

## Tag Resolution Order and Open Graph Fallback Mechanics

Developers frequently duplicate every Open Graph and Twitter tag unnecessarily—or, conversely, omit `twitter:card` assuming Open Graph alone is enough. `Twitterbot` resolves metadata through a deterministic precedence chain:

1. **Card Type Lookup**: The parser checks `<meta name="twitter:card">` first. There is **no Open Graph fallback** for card type; without it, X either suppresses the card or falls back to a minimal link preview depending on feed context.
2. **Primary `twitter:*` Lookup**: For title, description, image, and alt text, X reads `name="twitter:title"`, `name="twitter:description"`, `name="twitter:image"`, and `name="twitter:image:alt"`.
3. **Open Graph Fallback**: Whenever a Twitter-specific field is missing, X falls back gracefully to `property="og:title"`, `property="og:description"`, `property="og:image"`, and `property="og:image:alt"`.

That fallback architecture gives you two clean patterns: enable this tool's **Sync with Open Graph** toggle when you want identical copy across X, LinkedIn, Slack, and Facebook, or author independent X-specific copy (for example, a punchy 60-character X title alongside a longer editorial headline managed in our [Open Graph Generator](/en/tools/open-graph-generator)). Always preserve the attribute distinction—Open Graph uses `property="..."` while Twitter Cards use `name="..."`—and quote-escape internal double quotes as `&quot;`.

## Deep-Linking Mobile Installs and Sandboxed Media Players

While `summary_large_image` powers most web publishing, App and Player cards unlock high-intent interactive workflows when configured with exact store and security parameters:

```html
<!-- X App Card (iOS + Android Store Attribution) -->
<meta name="twitter:card" content="app" />
<meta name="twitter:site" content="@acmeapp" />
<meta name="twitter:description" content="Track sprints, offline notes, and deploys from iOS and Android." />
<meta name="twitter:app:name:iphone" content="Acme Workspace" />
<meta name="twitter:app:id:iphone" content="1498765432" />
<meta name="twitter:app:name:ipad" content="Acme Workspace" />
<meta name="twitter:app:id:ipad" content="1498765432" />
<meta name="twitter:app:name:googleplay" content="Acme Workspace" />
<meta name="twitter:app:id:googleplay" content="com.acme.workspace" />

<!-- X Player Card (Sandboxed HTTPS Media Embed) -->
<meta name="twitter:card" content="player" />
<meta name="twitter:title" content="Episode 42: Zero-Downtime Postgres Migrations" />
<meta name="twitter:player" content="https://media.example.com/embed/ep-42" />
<meta name="twitter:player:width" content="640" />
<meta name="twitter:player:height" content="360" />
<meta name="twitter:image" content="https://media.example.com/posters/ep-42-1200x675.jpg" />
<meta name="twitter:image:alt" content="Audio waveform cover graphic for Episode 42" />
```

For **Player Cards**, your `twitter:player` endpoint must be served strictly over HTTPS and must *not* send `X-Frame-Options: DENY` or a restrictive Content Security Policy `frame-ancestors 'self'` header, or X's iframe container will render a blank error box. Verify your live embed endpoint's response headers with our [HTTP Header Checker](/en/tools/http-header-checker) before shipping.

## Why Cards Fail to Unfurl on X: Crawler Troubleshooting

When a published tweet shows a plain URL instead of a rich card, check five infrastructure bottlenecks in order:

- **`robots.txt` Blocking `Twitterbot`**: Because `Twitterbot` strictly obeys the Robots Exclusion Protocol, an overly broad `Disallow: /` rule—or blocking your `/images/` or `/_next/image` asset directory—prevents card assembly. Inspect or explicitly allow `User-agent: Twitterbot` in our [Robots.txt Generator](/en/tools/robots-txt-generator).
- **Redirect Chains and Timeouts**: `Twitterbot` follows a limited number of HTTP redirects (typically up to 5 hops) and enforces tight fetch timeouts. Point `twitter:image` directly to a fast CDN asset returning `200 OK`.
- **Missing `@` Prefix on Attribution Handles**: Both `twitter:site` (brand publisher account) and `twitter:creator` (individual author) must include the leading `@` symbol (e.g., `@nexuscalc`) so X links analytics and author attribution properly.
- **Unescaped Alt Text or Missing Accessibility**: Adding `twitter:image:alt` (up to 420 characters) serves screen-reader users across X web and mobile apps and provides clean fallback text when images fail on slow cellular networks.
- **Sticky Edge Caches (~7 Days)**: X caches rendered card metadata per URL for roughly a week. After fixing broken tags or swapping a banner image, append a new query parameter to the image URL (such as `?v=3`) and re-test via X's compose preview so the crawler fetches the updated graphic immediately.
