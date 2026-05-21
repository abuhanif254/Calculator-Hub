import { ToolConfig } from './types';

export const responsiveScreenTesterConfig: ToolConfig = {
  slug: "responsive-screen-tester",
  title: "Responsive Screen Tester & Multi-Device Simulator",
  shortDescription: "Test how your website appears across mobile, tablet, laptop, and custom screen sizes in real-time. Features zoom controls, grid guides, and side-by-side device comparisons.",
  category: "Web Dev Utilities",
  keywords: [
    "responsive screen tester", "responsive website tester", "mobile responsive checker", "responsive design tool",
    "responsive preview tool", "device simulator", "screen size tester", "responsive web testing",
    "tailwind breakpoint tester", "bootstrap breakpoint viewer", "mobile usability checker", "viewport simulator"
  ],

  longDescription: `
## What is Responsive Web Design?

In the early days of the internet, websites were built for a single screen size: desktop computers. Designing pages meant choosing a fixed width—often 960 or 1020 pixels—and hoping users wouldn't have to scroll horizontally. However, with the launch of smartphones, tablets, and a massive variety of screen form factors, this one-size-fits-all approach became obsolete.

**Responsive Web Design (RWD)** is a modern development approach where a website's layout dynamically adjusts, scales, and repositions itself to fit the screen size, orientation, and resolution of the user's device. Coined by Ethan Marcotte in 2010, responsive design is built on three key technical pillars:

1. **Fluid Grids**: Page elements are sized in relative units like percentages (\`%\`), viewport width (\`vw\`), or root-relative units (\`rem\`), rather than fixed pixels (\`px\`).
2. **Flexible Images**: Media assets are styled to scale within their containing elements so they never overflow their boundaries (e.g., using \`max-width: 100%; height: auto;\`).
3. **Media Queries**: CSS rules that apply specific styles only when the user's device matches certain criteria, such as a maximum width or orientation.

---

## Why Responsive Testing Matters

Building a responsive website is only the first step. You must verify that it renders correctly under all real-world circumstances. If a user lands on your site and encounters a broken menu, overlapping text, or buttons they cannot click, they will immediately leave.

Responsive testing is the process of loading your layouts across different viewport dimensions to audit visual structure and usability. It matters because:

* **UX Integrity**: Small details like font sizes, padding, and form fields need to remain comfortable and readable.
* **Conversion Preservation**: If your checkout button is pushed off-screen or hidden behind a cookie banner on mobile, your sales will crash.
* **Brand Authority**: A broken mobile view looks unprofessional and reduces consumer trust.

---

## Mobile-First Design Principles

For years, developers built the desktop version of a site first and then tried to shrink it to fit mobile screens. This often led to bloated stylesheets and cluttered mobile layouts.

The **Mobile-First** approach flips this workflow:
1. **Design for the Smallest Screen First**: Start with the core features, content, and single-column layout optimized for mobile viewports (e.g., 320px to 480px).
2. **Progressive Enhancement**: As the screen size increases, write media queries to introduce columns, sidebars, larger images, and advanced animations.
3. **Optimized Loading**: Mobile devices have limited processing speeds and battery capacities. Mobile-first forces you to prioritize clean, lightweight assets and code.

---

## CSS Breakpoints Explained

A **breakpoint** is a specific pixel width threshold where a website's layout transitions. Breakpoints are defined in stylesheets using CSS Media Queries.

Here is how a standard media query looks:

\`\`\`css
/* Styles applied to tablets and larger screens */
@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
\`\`\`

When choosing breakpoints, the best practice is to design based on your **content**, not specific device models. When your text starts looking too stretched or your columns start feeling squished, that is exactly where you should insert a breakpoint.

---

## Responsive SEO Benefits

Search engines aim to deliver the best possible experience to their users. If a search engine recommends a website that is unreadable on mobile, it hurts the search engine's reputation. Therefore, responsiveness is a direct search ranking factor.

* **Single URL Indexing**: Responsive sites use the same URL for desktop and mobile, unlike legacy \`m.domain.com\` setups. This consolidates link authority (PageRank) and prevents duplicate content penalties.
* **Reduced Bounce Rates**: Users stay longer on sites that are easy to browse, sending positive signals to search algorithms.
* **Simplified Crawling**: Googlebot only needs to crawl a single page layout, optimizing your server's crawl budget.

---

## Mobile Usability and Google Ranking

Google uses **Mobile-First Indexing**. This means Google predominantly crawls and indexes the mobile version of your website's content to determine its search rank. If your desktop version is perfect but your mobile site is missing key sections, Google will evaluate your ranking based on the incomplete mobile version.

Google's search console flags several mobile usability errors:
* **Viewport Not Set**: Missing the meta viewport tag.
* **Content Wider Than Screen**: Causes horizontal scrolling.
* **Text Too Small to Read**: Requires zooming.
* **Clickable Elements Too Close Together**: Leads to accidental clicks.

---

## Common Responsive Design Mistakes

Even experienced frontend developers can fall into responsive design traps:

| Mistake | Consequence | How to Fix It |
| :--- | :--- | :--- |
| **Horizontal Scrolling** | Broken layouts on mobile. | Avoid hardcoded pixel widths on containers; use \`max-width: 100%\` and inspect element overflow. |
| **Fixed Touch Elements** | Users can't tap buttons. | Keep interactive targets at least 48x48 pixels with sufficient margins. |
| **Neglecting Landscape Orientation** | Content gets clipped. | Test your layout by rotating the device; adjust heights on modals and side navigation bars. |
| **Hidden Critical Content** | Desktop users see features that are completely hidden from mobile users. | Use responsive layout shifts rather than hiding key structures with \`display: none\`. |

---

## Tailwind Responsive Breakpoints

Tailwind CSS provides a mobile-first responsive design system using simple prefix classes. Instead of writing custom CSS media queries, you append the breakpoint name directly to your utility classes.

Tailwind's default breakpoints are:

* **\`sm\`** (min-width: 640px): Standard smartphones in landscape.
* **\`md\`** (min-width: 768px): Tablets.
* **\`lg\`** (min-width: 1024px): Laptops.
* **\`xl\`** (min-width: 1280px): Desktop monitors.
* **\`2xl\`** (min-width: 1536px): Wide screens.

Example:
\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- 1 column on mobile, 2 on tablet, 4 on laptop -->
</div>
\`\`\`

---

## Bootstrap Responsive System

Bootstrap uses a responsive 12-column grid system built on Flexbox. Like Tailwind, it uses abbreviations to control layouts across breakpoints:

* **\`xs\`** (<576px): Portrait phones.
* **\`sm\`** (>=576px): Landscape phones.
* **\`md\`** (>=768px): Tablets.
* **\`lg\`** (>=992px): Small desktops.
* **\`xl\`** (>=1200px): Standard desktops.
* **\`xxl\`** (>=1400px): Wide monitors.

Example:
\`\`\`html
<div class="col-12 col-md-6 col-lg-3">
  <!-- Layout automatically reflows dynamically -->
</div>
\`\`\`

---

## Responsive Testing Workflow

A robust testing cycle ensures a bug-free launch:
1. **Local Sandbox Development**: Build your components inside a workspace like Chrome DevTools, using hot reloading to watch dimensions shift.
2. **Virtual Simulator Audit**: Use our **Multi-Device Simulator** to check how the layouts render on exact device presets (like iPhone, iPad, and monitors) side-by-side.
3. **Accessibility Verification**: Turn on high-contrast overlays, test text magnification, and make sure screen readers have access to tap targets.
4. **Physical Device Testing**: Before deployment, test the staging link on a physical smartphone and tablet to feel the touch responsiveness first-hand.

---

## Accessibility and Responsiveness

Responsive design and web accessibility (WCAG) go hand-in-hand. According to WCAG success criteria:
* **Reflow (1.4.10)**: Content must reflow without loss of information or functionality, and without requiring scrolling in two dimensions for vertical scroll content (down to 320px width).
* **Text Spacing (1.4.12)**: Increasing line heights and letter spacing shouldn't cause text elements to clip or overlap.
* **Touch Target Sizes**: Buttons and links must be large enough to be easily tapped with a thumb without accidentally clicking adjacent targets.

---

## Performance Optimization for Mobile

Mobile devices often operate on slower cellular networks (3G/4G) with high latency. Optimization is essential:
* **Responsive Images**: Use the HTML \`<picture>\` element or \`srcset\` attribute to serve smaller, optimized images to mobile viewports instead of downloading full desktop assets.
* **Minimize Render-Blocking JS**: Keep JS bundles split so mobile devices can display the page structure immediately.
* **Lazy Loading**: Delay loading of off-screen images and components until the user scrolls close to them.

---

## Viewport Meta Tags

To make a website responsive, you must instruct the browser how to scale the layout to fit the screen. This is done using the viewport meta tag inside your HTML \`<head>\`:

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

Without this tag, mobile browsers will assume they are loading a desktop site and render it at 980px width, scaling the entire page down until the text is microscopic.

---

## Device Simulation Limitations

Our simulator renders pages inside an HTML \`<iframe>\` styled to match specific device resolutions. This is incredibly useful for visual layout checks, but it is important to know the limits:
* **User Agent**: The simulator runs in your native desktop browser, meaning it uses your desktop browser engine (Chrome, Safari, Firefox). Physical devices use mobile rendering engines (like iOS WebKit), which can display fonts or form fields slightly differently.
* **Hardware Accel**: Simulators cannot reproduce the CPU/GPU limits of older mobile chips.
* **Iframe Blocks**: Sites that restrict embedding via \`X-Frame-Options\` or CSP headers won't display inside the iframe unless you run a local proxy or browser extension. If a site is blocked, our tool provides an automatic warning and a quick button to test same-origin layouts.

---

## Responsive UI Best Practices

1. **Use Relative Units**: Prefer \`rem\`, \`em\`, \`%\`, and CSS variables over hardcoded pixels.
2. **Establish Content Breakpoints**: Place breakpoints where your design breaks, not just to match popular phone sizes.
3. **Use CSS Flexbox and Grid**: Modern layout models make multi-column adjustments easy.
4. **Avoid Text in Images**: Always write text as markup so it can wrap and scale legibly.
5. **Always Set Viewport Tags**: Ensure the viewport metadata is declared on every page.
`,

  features: [
    "Supports live interactive iframe previews of any secure website URL",
    "Provides quick presets for mobile, tablet, laptop, and desktop dimensions",
    "Enables rotation (portrait/landscape) and custom width/height inputs",
    "Includes zoom scaling (50% - 150%) to fit large monitors on small screens",
    "Draws horizontal and vertical pixel rulers directly around device previews",
    "Simulates accessibility modes including high-contrast, greyscale, and text zoom",
    "Allows side-by-side multi-device comparison with synchronized scrolling support",
    "Features a built-in mobile usability and SEO SEO-friendly auditor checker"
  ],

  useCases: [
    "Frontend developers auditing layout flow when resizing across CSS breakpoints",
    "UI/UX designers checking how mockups translate to real browser viewports",
    "SaaS founders verifying checkout page usability on mobile device screens",
    "Brogger / content editors checking text legibility and wrapping on smartphones",
    "SEO specialists inspecting mobile-first index readiness and viewport declarations",
    "Testing local server endpoints (localhost) dynamically during web development"
  ],

  howToSteps: [
    "Type your website URL in the URL input bar and press Enter or click the load button.",
    "Select a device preset from the toolbar (like iPhone 15, iPad, or MacBook).",
    "Or, enter your own custom width and height dimensions in the custom fields.",
    "Toggle the grid guides or rulers to inspect alignments and container boundaries.",
    "Click the Rotate button to swap between Portrait and Landscape orientation.",
    "Activate accessibility or dark mode simulation filters to review visual comfort.",
    "Use the side-by-side comparison tab to test two different resolutions at the same time.",
    "Review the SEO and Usability panel for optimization suggestions for your site."
  ],

  faq: [
    {
      question: "Why does my website say 'Refused to connect' or block loading in the preview?",
      answer: "This is a browser security measure. Many websites configure headers like X-Frame-Options or Content-Security-Policy (CSP) to prevent their pages from being embedded in iframes on other domains to prevent clickjacking attacks. If a site blocks framing, you can test it locally by disabling headers, using browser extensions, or clicking our 'Open in New Tab' fallback."
    },
    {
      question: "How do I test my local server (localhost) in this simulator?",
      answer: "Since your local server runs on your machine, you can type 'http://localhost:3000' (or your local port) into the URL bar. Localhost configurations do not block iframe embedding, making it easy to preview and live-reload your layouts during development."
    },
    {
      question: "Does this screen tester simulate actual iOS or Android operating systems?",
      answer: "No. This tool is a viewport simulator. It adjusts the iframe size and applies CSS filters to mock device layouts. It uses your desktop browser engine. To test platform-specific bugs, you should use official tools like Apple Xcode Simulator, Android Studio Emulator, or real devices."
    },
    {
      question: "What is the benefit of using CSS scale zoom in the simulator?",
      answer: "If you want to test a 2K (2560px) or 4K (3840px) screen, it wouldn't fit on your laptop monitor. Our tool applies CSS 'transform: scale()' to shrink the preview, allowing you to view wide screen layouts in their entirety inside your normal workspace."
    },
    {
      question: "How do I capture a full-size screenshot of my website?",
      answer: "Because of cross-origin security rules, JavaScript cannot take screenshots of third-party websites loaded inside an iframe. However, you can easily take a pixel-perfect screenshot by opening your browser DevTools (F12), pressing Ctrl+Shift+P (or Cmd+Shift+P on Mac), typing 'Capture full size screenshot', and pressing Enter."
    }
  ],

  relatedTools: [
    { name: ".htaccess Generator", slug: "htaccess-generator" },
    { name: "Sitemap.xml Generator", slug: "sitemap-xml-generator" },
    { name: "Robots.txt Generator", slug: "robots-txt-generator" },
    { name: "Meta Tag Generator", slug: "meta-tag-generator" }
  ],

  examples: [
    {
      title: "Standard Mobile Viewport",
      description: "Typical responsive width and height settings for a modern mobile device.",
      input: "Width: 393px, Height: 852px, Device: iPhone 14",
      output: "Renders layout in a compact single-column format with collapsed mobile hamburger menu."
    },
    {
      title: "Tablet Portrait Viewport",
      description: "Medium screen breakpoint for viewing responsive column layouts.",
      input: "Width: 768px, Height: 1024px, Device: iPad Mini",
      output: "Transitions menu to side list or fits double-column flex layouts side-by-side."
    },
    {
      title: "Desktop scaled 1080p Screen",
      description: "Checks wide-screen elements using a zoom factor of 75% to fit inside the tester layout.",
      input: "Width: 1920px, Height: 1080px, Zoom: 75%",
      output: "Displays full multi-column grid, wide banners, and desktop navigation menu."
    }
  ]
};
