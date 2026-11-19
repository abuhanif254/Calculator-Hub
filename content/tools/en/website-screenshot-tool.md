---
metaTitle: "Website Screenshot Tool — Full-Page & Mobile Capture"
metaDescription: "Capture full-page and mobile website screenshots across custom viewports, emulate dark mode, inspect SEO meta tags, and measure load timings."
metaKeywords: "website screenshot tool, capture webpage screenshot, responsive design testing, full page screenshot, website preview generator, mobile website simulator, SEO snapshot audit, website renderer, page load time checker, developer screenshot tool"
title: "Website Screenshot Tool"
shortDescription: "Capture pixel-perfect screenshots of any website in multiple device resolutions. Generate full-page captures, test responsiveness, analyze SEO meta tags, and measure page load performance."
faqs:
  - question: "Why do client-side libraries like html2canvas produce broken screenshots compared to headless browsers?"
    answer: "Client-side libraries attempt to repaint DOM nodes onto an HTML5 <canvas> in JavaScript, which fails whenever cross-origin images taint the canvas under CORS, external web fonts are blocked, or modern CSS like backdrop-filter, Shadow DOM, and subgrid are used. A headless Chromium engine executes the real browser layout and compositor pipeline."
  - question: "Why do sticky headers sometimes repeat or overlap during full-page webpage screenshots?"
    answer: "Elements styled with position: fixed or position: sticky remain anchored to the viewport during scroll-stitched captures, or expand unpredictably when a headless browser resizes the viewport height to match document.body.scrollHeight. Full-page mode requires careful layout handling and sometimes an extra settle delay."
  - question: "When should I add a custom capture delay (500ms to 5000ms) before taking a screenshot?"
    answer: "Single-page applications built with React, Next.js, or Vue often fire the browser load event while client-side data fetches, skeleton loaders, hero animations, or lazy-loaded images are still pending. Adding a 1000ms to 2500ms settle delay gives hydration and network requests time to paint final content."
  - question: "Should I export website captures as PNG or JPEG?"
    answer: "Choose lossless PNG for UI regression audits, crisp typography, thin 1px borders, and high-contrast interfaces because JPEG's 4:2:0 chroma subsampling introduces ringing artifacts around sharp text edges. Choose compressed JPEG when you need smaller file weights for long full-page marketing previews or slide decks."
  - question: "Why are localhost, 192.168.x.x, or Cloudflare-protected pages rejected during capture?"
    answer: "Server-side headless rendering validates resolved DNS targets against SSRF filters and blocks loopback, RFC 1918 private networks, and cloud metadata ranges to protect internal infrastructure. Separately, third-party websites guarded by strict WAF rules, bot challenges, or CAPTCHAs may serve an interstitial block page to automated headless browsers."
features:
  - "Headless browser rendering across Desktop HD, Laptop, Tablet, Mobile Retina, and custom 320px-to-2560px viewports"
  - "Above-the-fold and full-page capture modes spanning the complete scrollable height of long landing pages and articles"
  - "Color-scheme emulation toggling prefers-color-scheme: dark to audit dark-mode contrast and theme tokens"
  - "Configurable post-load settle delay (up to 5000ms) for SPA hydration, chart libraries, and lazy-loaded media"
  - "Hydrated SEO DOM audit extracting rendered Meta Title, Description, Canonical URL, Open Graph tags, and H1 count"
  - "Lossless PNG and compressed JPEG exports with SSRF IP filtering, zero permanent server storage, and local browser history"
useCases:
  - "Capturing full-page mobile and desktop visual snapshots before and after CSS refactors to detect layout regressions"
  - "Auditing how JavaScript-heavy React or Next.js pages render final meta titles, canonical links, and H1 tags after hydration"
  - "Generating crisp lossless UI previews for product release notes, technical documentation, and client design reviews"
  - "Verifying prefers-color-scheme: dark styling, inverted logos, and chart legibility without changing host OS settings"
  - "Checking third-party origins that block iframe embedding via X-Frame-Options or strict CSP frame-ancestors headers"
  - "Archiving timestamped visual evidence of landing page experiments, banner campaigns, and competitor layout updates"
howToSteps:
  - "Paste any publicly reachable URL into the capture bar; missing HTTP/HTTPS schemes are normalized automatically."
  - "Pick a standard viewport preset (Desktop Full HD, Laptop, Tablet, or Mobile) or enter custom width and height dimensions."
  - "Configure capture options: toggle Full-Page mode, enable Dark Mode emulation, and choose PNG or JPEG output."
  - "Set an optional post-load settle delay in milliseconds if the target relies on asynchronous API calls or entrance animations."
  - "Run the capture to render the page, inspect the visual preview, and review extracted SEO tags alongside load timing."
  - "Download the generated PNG or JPEG image directly to disk or revisit recent captures stored in your browser's local history."
---

Taking a trustworthy screenshot of a modern web page is far harder than snapping a static HTML snapshot. Single-page frameworks hydrate asynchronously, responsive art direction swaps image sources based on viewport width and pixel density, and CSS custom properties shift completely under `prefers-color-scheme: dark`. A server-side website screenshot workflow drives a real headless browser engine through the entire Critical Rendering Path—capturing pixel-accurate raster images alongside post-hydration SEO metadata and page load timings—while returning captures ephemerally without persisting target images on remote disks.

## Headless Rendering Pipeline vs. Client-Side DOM Capture

Browser-side screenshot scripts such as `html2canvas` attempt to walk the DOM tree in JavaScript and redraw elements onto a `<canvas>` surface. That approach breaks down rapidly on production sites: cross-origin images without CORS headers taint the canvas and trigger `SecurityError`, external `@font-face` files fall back to system fonts, and newer layout features (`backdrop-filter`, CSS subgrid, SVG filters, closed Shadow DOM) render inconsistently or vanish entirely.

A headless Chromium pipeline avoids those approximations by executing the genuine browser engine stages in sequence:

1. **DNS Resolution & SSRF Gate**: Resolve the target hostname and verify every IP against loopback, RFC 1918, and link-local blocklists before opening a socket.
2. **Navigation & TLS Handshake**: Fetch the initial document using the chosen viewport geometry, `deviceScaleFactor`, and mobile or desktop `User-Agent`.
3. **DOM, CSSOM & Script Hydration**: Parse markup, load stylesheets and web fonts (`document.fonts.ready`), and run synchronous/asynchronous JavaScript.
4. **Layout & Compositor Paint**: Compute box geometry, apply media queries (`prefers-color-scheme`), rasterize layers onto an off-screen GPU/Skia surface, and encode the frame buffer as PNG or JPEG.

Because captures are returned directly as temporary image payloads and recent session entries live exclusively inside your browser's `localStorage`, your screenshots are never indexed or stored permanently on our servers.

## Capture Modes, DPR, and Output Format Trade-Offs

Selecting the wrong viewport or encoder settings can distort text sharpness or bloat file sizes needlessly. Use these trade-offs when configuring a capture:

| Capture Setting | Primary Option | Alternative Option | Technical Impact & Recommended Use |
| :--- | :--- | :--- | :--- |
| **Capture Scope** | Viewport Only (above the fold) | Full Page (`fullPage: true`) | Viewport captures match initial LCP paint and avoid sticky-element quirks; full-page captures document complete scrollable layouts. |
| **Image Codec** | PNG (lossless Deflate RGB) | JPEG (lossy YCbCr 4:2:0) | PNG preserves crisp subpixel font edges and 1px UI lines for QA diffs; JPEG cuts file weight 60–80% on photography-heavy landing pages. |
| **Pixel Density (DPR)** | `1×` Standard | `2×` / `3×` Retina emulation | Higher `deviceScaleFactor` triggers `<img srcset="... 2x">` assets and razor-sharp text at 4× the raw pixel count. |
| **Color Scheme** | Light (`prefers-color-scheme: light`) | Dark (`prefers-color-scheme: dark`) | Emulates OS media-feature state natively without modifying page CSS, surfacing unreadable low-contrast icons or borders. |
| **Wait Strategy** | `load` event only | `load` + 500–3000ms settle delay | Extra settle time lets SPA fetches, charting canvases, and fade-in hero animations reach steady state before rasterization. |

## Solving Full-Page Capture Artifacts and SPA Hydration Timing

Even real headless engines expose subtle CSS layout edge cases when capturing tall full-page screenshots:

- **`100vh` Hero Expansion**: Some full-page capture drivers expand the virtual viewport height to equal `document.documentElement.scrollHeight`. Any section styled with `height: 100vh` suddenly stretches to 9,000px tall. Prefer fixed-max heights or `min-height: 640px` for hero containers when building screenshot-friendly marketing pages.
- **Sticky & Fixed Overlay Duplication**: Scroll-and-stitch engines keep `position: fixed` cookie banners or floating chat launchers locked in place, stamping them repeatedly across every stitched tile.
- **Lazy-Loaded Image Gaps (`loading="lazy"`)**: Images far below the fold may never enter the `IntersectionObserver` threshold if the page is captured without scrolling or settling. Adding a capture delay—or triggering an explicit scroll sweep in automated CI pipelines—forces deferred assets to decode.
- **Network Idle Stalls & Web-Font FOUT**: Pages that keep persistent WebSockets, Server-Sent Events (SSE), or frequent analytics heartbeat polls open may never reach a strict `networkidle` state, causing captures to hit timeout ceilings. Waiting for the `load` event, `document.fonts.ready` (to eliminate Flash of Unstyled Text), and a bounded settle window provides deterministic visual output across both static and streaming web apps.

When automating visual regression baselines locally or in GitHub Actions with Playwright, mirror those exact viewport and settle controls explicitly:

```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  colorScheme: 'dark',
});
const page = await context.newPage();
await page.goto('https://example.com', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'mobile-dark-full.png', fullPage: true, type: 'png' });
await browser.close();
```

For fast interactive resizing, scroll testing, and live multi-device grid inspection on URLs that allow framing, pair headless snapshots with our client-side [Responsive Screen Tester](/en/tools/responsive-screen-tester).

## Auditing Rendered SEO Metadata and SSRF Guardrails

Inspecting raw HTML with `curl` only shows what the server returned before client-side JavaScript executed. Capturing SEO metadata from the rendered headless DOM reveals what search engines like Googlebot actually observe after hydration: missing `<title>` updates, duplicate `<h1>` tags injected by component libraries, mismatched `<link rel="canonical">` targets, or broken Open Graph social tags. When an audit surfaces missing social cards or poorly structured head metadata, generate clean compliant tags with our [Meta Tag Generator](/en/tools/meta-tag-generator) and [Open Graph Generator](/en/tools/open-graph-generator), then re-capture to confirm the rendered DOM matches your intended preview.

Finally, keep two operational boundaries in mind during automated captures: private RFC 1918 subnets, `localhost`, and cloud link-local endpoints (`169.254.169.254`) are strictly blocked by SSRF checks before navigation begins, and public websites guarded by aggressive WAF rules or interactive bot challenges may serve a challenge screen instead of the destination layout.
