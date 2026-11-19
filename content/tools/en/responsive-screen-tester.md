---
metaTitle: "Responsive Screen Tester — Multi-Device Viewport Preview"
metaDescription: "Preview websites across mobile, tablet, laptop, and custom CSS viewports in real time with zoom, grid overlays, and breakpoint checks locally."
metaKeywords: "responsive screen tester, responsive website tester, mobile responsive checker, responsive design tool, responsive preview tool, device simulator, screen size tester, responsive web testing, tailwind breakpoint tester, bootstrap breakpoint viewer, mobile usability checker, viewport simulator"
title: "Responsive Screen Tester & Multi-Device Simulator"
shortDescription: "Test how your website appears across mobile, tablet, laptop, and custom screen sizes in real-time. Features zoom controls, grid guides, and side-by-side device comparisons."
faqs:
  - question: "Why does an iPhone with a 1179x2556 display render web pages at 393x852 CSS pixels?"
    answer: "High-DPI smartphones apply a Device Pixel Ratio (DPR) of 2x or 3x so text and UI controls remain physically legible rather than microscopic. Media queries like @media (min-width: 768px) evaluate CSS reference pixels (393px wide), while the GPU rasterizes each CSS pixel onto a 3x3 physical hardware pixel grid."
  - question: "Why do some websites show a blank or refused-to-connect screen inside the preview frame?"
    answer: "Sites that emit X-Frame-Options: DENY, X-Frame-Options: SAMEORIGIN, or Content-Security-Policy: frame-ancestors 'none' instruct your browser to block cross-origin iframe embedding as a clickjacking defense. You can preview your own localhost, staging, or framing-enabled URLs directly, or use a headless capture tool when testing strict third-party origins."
  - question: "What happens if a page omits the HTML meta viewport tag on mobile devices?"
    answer: "Without <meta name='viewport' content='width=device-width, initial-scale=1'>, mobile browsers fall back to a virtual desktop layout viewport around 980px wide and scale the entire page down to fit the handset. As a result, mobile CSS media queries never trigger and body copy becomes unreadable without pinch-zooming."
  - question: "Why does height: 100vh overflow on mobile Safari and Chrome when the address bar is visible?"
    answer: "Classic vh units are calculated against the largest possible viewport height (with browser toolbars retracted), causing bottom action bars or hero footers to clip below the fold on initial load. Replacing 100vh with CSS dynamic viewport units (100dvh) or small viewport units (100svh) keeps full-height layouts aligned with visible chrome."
  - question: "Can an iframe-based viewport simulator completely replace testing on physical phones?"
    answer: "No. In-browser iframe simulation catches layout overflow, breakpoint wrapping, grid alignment, and WCAG 320px reflow issues rapidly using your local browser engine, but it cannot emulate iOS WebKit font rendering, rubber-band momentum scrolling, virtual keyboard viewport resizing, or throttled mobile GPU compositing."
features:
  - "Instant viewport switching across smartphone, tablet, laptop, desktop, and arbitrary custom width-by-height dimensions"
  - "Side-by-side multi-device comparison workspace to inspect responsive transitions simultaneously across breakpoints"
  - "One-click portrait and landscape orientation toggling to catch short-height modal and sticky-header clipping"
  - "Interactive zoom scaling and optional alignment grid overlays for auditing fluid typography and column symmetry"
  - "Built-in Tailwind CSS and Bootstrap breakpoint awareness to verify exact pixel boundaries as you resize"
  - "Direct client-side browser rendering with zero server proxying, preserving fast local iteration on staging URLs"
useCases:
  - "Auditing Tailwind CSS sm/md/lg/xl/2xl and Bootstrap grid transitions across real smartphone and tablet CSS widths"
  - "Checking WCAG 2.1 SC 1.4.10 Reflow compliance at 320px width to eliminate accidental horizontal overflow scrollbars"
  - "Comparing mobile, tablet, and widescreen views side by side during frontend pull-request reviews and design sign-offs"
  - "Verifying portrait-to-landscape orientation changes on sticky navigation drawers, cookie banners, and checkout modals"
  - "Testing responsive images (<picture>, srcset, sizes) and fluid clamp() typography scales across intermediate widths"
  - "Diagnosing overlapping touch targets and clipped table columns on staging builds before mobile QA handoff"
howToSteps:
  - "Enter the live or staging URL you want to preview into the tester address bar and load it directly in your browser."
  - "Choose a preset smartphone, tablet, laptop, or desktop viewport—or type custom CSS pixel dimensions to test edge breakpoints."
  - "Rotate between portrait and landscape orientations to verify vertical spacing, fixed footers, and responsive navigation menus."
  - "Enable grid guides and adjust viewport zoom controls when inspecting wide desktop canvases on smaller laptop screens."
  - "Switch to multi-device side-by-side mode to spot visual inconsistencies across mobile and desktop breakpoints simultaneously."
  - "Verify scrolling, interactive controls, and horizontal overflow at 320px before capturing snapshots or testing on real hardware."
---

Layout regressions rarely show up neatly on a 1920px developer monitor; they lurk in the awkward widths between nominal breakpoints—320px compact handsets, 640px landscape phones, 820px split-screen tablets, and 1280px laptops. This simulator mounts your target page inside dynamically sized `<iframe>` viewports directly inside your browser—with zero server-side proxying—giving you live zoom controls, orientation switches, grid overlays, and side-by-side device comparisons to catch CSS overflow and wrapping bugs in seconds.

## CSS Pixels, Device Pixel Ratio, and Viewport Mechanics

Responsive CSS never measures raw physical hardware pixels directly. Instead, CSS media queries evaluate **CSS reference pixels**—a device-independent unit mapped to physical screen dots through `window.devicePixelRatio` (DPR):

$$\text{CSS Width} = \frac{\text{Physical Screen Width}}{\text{Device Pixel Ratio}}$$

For example, an iPhone 14 Pro ships with a `1179 × 2556` physical OLED panel at a `3×` DPR, which translates to a `393 × 852` CSS pixel viewport. Without the viewport meta directive inside `<head>`, mobile browsers ignore that CSS width and synthesize a ~980px desktop layout viewport scaled down to microscopic text:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Avoid adding `user-scalable=no` or `maximum-scale=1.0`: blocking pinch-to-zoom violates WCAG 2.1 Success Criterion 1.4.4 (Resize Text) and modern iOS Safari ignores the restriction anyway.

Two additional viewport subtleties regularly trip up production layouts:
- **Layout Viewport vs. Visual Viewport**: Pinch-zooming or opening an on-screen mobile keyboard shrinks the *visual viewport* without always changing the *layout viewport*, which can push `position: fixed` chat widgets or action bars out of reach.
- **Dynamic Viewport Units (`dvh`, `svh`, `lvh`)**: On mobile browsers where address bars retract on scroll, `100vh` maps to the *largest* height (`100lvh`) and overflows the initial screen. Using `min-height: 100svh` for above-the-fold heroes or `100dvh` for full-screen modals prevents bottom buttons from disappearing beneath browser chrome.

## Cross-Framework Breakpoint & Accessibility Reference

Design systems divide the viewport continuum slightly differently. Testing across the exact boundary pixels—plus `1px` below each threshold—reveals broken grids that slip past standard device presets.

| Width Band (CSS px) | Tailwind CSS | Bootstrap 5 | Material Design 3 | Representative Viewports | Key UX / WCAG Constraint |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `320–575 px` | Default (base) | `xs` (`<576px`) | Compact (`<600px`) | iPhone SE (`375`), Pixel (`412`) | WCAG 2.1 SC 1.4.10 Reflow requires zero 2D horizontal scroll at `320px`. |
| `576–639 px` | Default (base) | `sm` (`>=576px`) | Compact | Large phones in landscape | Short vertical height (`360–412px`) clips tall modals and sticky headers. |
| `640–767 px` | `sm` (`>=640px`) | `sm` | Medium (`>=600px`) | Phablets, small tablets | Maintain WCAG 2.2 SC 2.5.8 target size (`>=24×24px`; `44–48px` ideal). |
| `768–1023 px` | `md` (`>=768px`) | `md` (`>=768px`), `lg` (`>=992px`) | Expanded (`>=840px`) | iPad Mini (`768`), iPad Air (`820`) | Ideal width to transition single-column stacks into two-column grids. |
| `1024–1279 px` | `lg` (`>=1024px`) | `lg`, `xl` (`>=1200px`) | Expanded / Large | iPad Pro landscape, small laptops | Expose full navigation bars; verify hover states have keyboard equivalents. |
| `1280–1535 px` | `xl` (`>=1280px`) | `xl`, `xxl` (`>=1400px`) | Large (`>=1200px`) | 13–15" laptops (`1280–1440`) | Constrain reading prose to `60–75ch` so line lengths stay scannable. |
| `>= 1536 px` | `2xl` (`>=1536px`) | `xxl` (`>=1400px`) | Extra-Large (`>=1600px`) | Full HD (`1920`), ultrawide | Center max-width containers so grids do not stretch across wide displays. |

When verifying mobile readability alongside layout reflow, audit your foreground-to-background text contrast ratios with our [Contrast Checker](/en/tools/contrast-checker) to ensure legibility under outdoor glare.

## Modern Layout Queries: Media Range Syntax and Container Queries

Modern CSS moves beyond verbose `min-width`/`max-width` viewport rules. **Media Queries Level 4** introduces mathematical range syntax, while **CSS Container Queries** let reusable cards and widgets adapt to their *parent container width* rather than the global window width:

```css
/* Declare a layout containment context on the parent slot */
.card-grid-slot {
  container-type: inline-size;
  container-name: product-slot;
}

/* Switch card orientation based on available slot width, not screen width */
@container product-slot (inline-size >= 28rem) {
  .product-card {
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 1.25rem;
  }
}

/* Media Queries Level 4 range syntax for page-level shell shifts */
@media (48rem <= width < 80rem) {
  .page-shell {
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}
```

Notice `minmax(0, 1fr)` on the Grid track: without a `0` minimum, wide code blocks or unbroken URLs inside a grid item expand its intrinsic `min-content` size and trigger horizontal page overflow even when `overflow-x` looks clean elsewhere. When clamping stray decorative elements that bleed past the viewport edge, prefer `overflow-x: clip` over `overflow-x: hidden` on page wrappers—unlike `hidden`, `clip` does not create a new scroll container and therefore keeps nested `position: sticky` headers and sidebars working reliably. Likewise, pair fluid images with explicit `srcset` width descriptors and accurate `sizes` hints so high-DPR phones fetch appropriately sized assets rather than multi-megabyte desktop hero photos.

## Troubleshooting Iframe Embedding Blocks and Real-Device Gaps

Because this simulator loads your target URL inside a standard browser `<iframe>`, target servers that set `X-Frame-Options: DENY`, `X-Frame-Options: SAMEORIGIN`, or `Content-Security-Policy: frame-ancestors 'self'` will refuse to render inside a cross-origin preview pane. That refusal is intentional browser clickjacking protection—not a broken site. On staging environments you control, temporarily allow framing during QA or capture full-page server renders of strict third-party origins with our [Website Screenshot Tool](/en/tools/website-screenshot-tool).

Remember also that an `<iframe>` inherits your desktop browser's rendering engine and `User-Agent` header. If a site performs server-side adaptive serving based on `User-Agent` tokens rather than pure CSS responsiveness, inspect how the server classifies mobile versus desktop headers in our [User Agent Parser](/en/tools/user-agent-parser) and validate final releases on physical iOS WebKit and Android Chromium hardware.
