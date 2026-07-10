import { ToolConfig } from './types';

export const faviconGeneratorToolConfig: ToolConfig = {
  slug: "favicon-generator",
  title: "Favicon Generator",
  shortDescription: "Generate professional website favicons and complete PWA asset packages locally in your browser. Creates ICO, multi-size PNGs, Apple Touch icons, and Web Manifests.",
  category: "Developer Tools",
  keywords: [
    "favicon generator",
    "create favicon",
    "png to ico",
    "svg to ico",
    "website icon generator",
    "browser icon creator",
    "app icon generator",
    "favicon maker",
    "free favicon generator",
    "pwa icon generator",
    "favicon generator from image free",
    "create favicon ico file online",
    "pwa manifest icon generator online"
  ],
  features: [
    "Generate multi-resolution favicon.ico files containing 16x16, 32x32, and 48x48 pixel densities",
    "Create a complete suite of standard PNG favicons ranging from 16x16 to 512x512 pixels",
    "Generate Apple touch icons (152x152, 180x180) optimized for iOS Home Screens",
    "Create Android Chrome-specific icons (192x192, 512x512) and auto-formatted Web Manifests",
    "Customize background colors, padding margins, border-radius rounding, and dropshadow depths",
    "Advanced vector/raster placement—zoom, scale, and adjust horizontal/vertical offsets",
    "Preview mockups in real-time across standard device contexts: browser tabs, bookmarks, and mobile home screens",
    "Export code snippets for HTML head links, Next.js metadata objects, and React configurations",
    "100% browser-based processing—your logo files and design properties are processed locally and never uploaded"
  ],
  useCases: [
    "Generating standard multi-size favicon.ico packages for launching new corporate websites",
    "Designing and packaging web app icons (Web Manifest icons) for Progressive Web Apps (PWAs)",
    "Creating customized, themed bookmarks and home screen shortcuts for SaaS applications",
    "Converting square SVG icons into properly formatted favicon packages for modern framework templates",
    "Enforcing brand consistency across desktop, mobile, and web interfaces by generating optimized Apple and Android launch icons",
    "Generating HTML and Next.js copy-paste link tags to quickly configure headers in modern web projects"
  ],
  howToSteps: [
    "Upload your brand logo file (SVG, PNG, JPG, or WEBP) into the dashboard uploader.",
    "Adjust styling properties: change background style (transparent, solid, or gradient), configure border radius, padding, and dropshadows.",
    "Align your logo icon: use the scale slider or offset controls to center or shift elements inside the icon bounds.",
    "Preview your icon across standard mockups (browser tabs, bookmarks, iOS and Android home screen panels).",
    "Enter metadata properties for PWA support (app name, short name, theme color, background color, display mode).",
    "Click 'Download Complete Package (ZIP)' to retrieve all generated icons and the manifest, or download files individually."
  ],
  relatedTools: [
    { name: "SVG to PNG", slug: "svg-to-png" },
    { name: "Convert to PNG", slug: "convert-to-png" },
    { name: "Image Converter", slug: "image-converter" },
    { name: "Image to Base64", slug: "image-to-base64" },
    { name: "SVG Optimizer", slug: "svg-optimizer" },
    { name: "QR Code Studio", slug: "qr-code-studio" },
    { name: "Gradient Generator", slug: "gradient-generator" },
    { name: "Color Picker From Image", slug: "color-picker-from-image" },
    { name: "Color Palette Generator From Image", slug: "color-palette-generator-from-image" }
  ],
  examples: [],
  faq: [
    {
      question: "What is a favicon?",
      answer: "A favicon, short for 'favorite icon', is a small shortcut icon associated with a particular website or web page. It is displayed in browser address bars, history logs, bookmark lists, tabs, and as mobile app launcher shortcuts."
    },
    {
      question: "Why does my website need a favicon?",
      answer: "A favicon is essential for professional branding and user experience. It helps users visually identify your website tabs in browsers with dozens of open pages, improves brand recognition on bookmarks and mobile home screens, and prevents 404 page errors from browsers requesting '/favicon.ico' by default."
    },
    {
      question: "What sizes are generated in a standard favicon package?",
      answer: "A standard favicon package includes: favicon.ico (containing 16x16, 32x32, 48x48), PNG icons in various sizes (16x16, 32x32, 48x48, 96x96, 192x192, 512x512), Apple touch icons (180x180), Android Chrome icons (192x192, 512x512), and a manifest.json file referencing these assets."
    },
    {
      question: "Can I convert an SVG file into a favicon?",
      answer: "Yes. Our Favicon Generator fully supports SVG (Scalable Vector Graphics) files. It parses the vector code, loads it onto our canvas, and rasterizes it at the correct pixel densities, ensuring the exported icons look clean and crisp."
    },
    {
      question: "Are my logo files uploaded to a server?",
      answer: "No. The Favicon Generator operates entirely in your web browser. All parsing, canvas composition, scaling, and ZIP packaging are performed locally on your device. No files are ever sent to our servers, giving you complete data privacy."
    },
    {
      question: "What is the difference between a favicon.ico and a PNG favicon?",
      answer: "The `.ico` format is a legacy container that houses multiple sizes (e.g. 16x16, 32x32, 48x48) in a single file, which older browsers (like Internet Explorer) require. Modern browsers support PNG favicons, which use standard PNG compression and support clean transparency. We generate both to ensure maximum compatibility."
    },
    {
      question: "How do I install the generated favicons on my website?",
      answer: "Extract the generated ZIP package and upload the files to your website's root directory. Then, copy and paste the generated HTML link tags (provided in our Developer Dashboard) into your site's `<head>` section."
    },
    {
      question: "How do I configure favicons in Next.js projects?",
      answer: "In Next.js (App Router), you can place `favicon.ico`, `icon.png`, and `apple-icon.png` in your project's `app/` folder. Next.js will automatically detect these files and generate the appropriate HTML link headers. Alternatively, configure them in the `metadata` object of your root `layout.tsx` file."
    },
    {
      question: "What is an Apple Touch Icon?",
      answer: "The Apple Touch Icon is a high-resolution PNG icon that Apple iOS devices (iPhones and iPads) use when a user adds a website bookmark link to their Home Screen. It is typically sized at 180x180 pixels and should be square without transparency (iOS adds the rounded corners automatically)."
    },
    {
      question: "What is a Web App Manifest?",
      answer: "A Web App Manifest (`manifest.webmanifest` or `manifest.json`) is a JSON file that provides information about a web application in a Progressive Web App (PWA) context. It details the app name, start URL, theme colors, display style, and references the grid of launcher icons so the browser knows how to install the app on a device."
    },
    {
      question: "What is the recommended size for a master favicon image?",
      answer: "We recommend uploading a high-resolution square image, ideally 512x512 pixels or larger, in PNG or SVG formats. This provides enough source details to scale down to tiny sizes like 16x16 without losing clarity."
    },
    {
      question: "Can I generate favicons with a transparent background?",
      answer: "Yes. If your uploaded image has a transparent background (like transparent PNGs or SVGs), our generator will maintain the transparency. You can also manually add solid background colors, custom gradients, or adjust paddings to frame your icon."
    },
    {
      question: "Why should Apple Touch Icons not have transparent backgrounds?",
      answer: "iOS displays home screen icons on a black screen background. If your Apple Touch Icon contains transparency, the transparent areas will render as black, which can ruin the look of your design. We recommend using a solid background color or gradient for Apple Touch Icons."
    },
    {
      question: "What size is required for Android Chrome launch icons?",
      answer: "Android Chrome utilizes launcher icons sized at 192x192 pixels and 512x512 pixels. These are defined in the PWA Web App Manifest file."
    },
    {
      question: "How do I use media queries for dark-mode favicons?",
      answer: "You can write HTML headers that link different favicon files based on the user's active theme: `<link rel='icon' href='/favicon-light.ico' media='(prefers-color-scheme: light)'>` and `<link rel='icon' href='/favicon-dark.ico' media='(prefers-color-scheme: dark)'>`."
    },
    {
      question: "Is this Favicon Generator completely free?",
      answer: "Yes. The tool is 100% free with no limits on the number of generated files, no subscription requirements, and no watermarks added to your assets."
    },
    {
      question: "Does the tool support offline operation?",
      answer: "Yes. Once the page is loaded, all processing is performed locally. You can disconnect from the internet and continue generating and downloading favicons offline."
    },
    {
      question: "What is the PWA logo safe area?",
      answer: "Android and other platforms display PWA icons in different shapes (circle, square, rounded rect). The safe area is the inner 80% circle of the icon bounds. Keeping your logo inside this safe area ensures it won't be clipped when the OS applies mask shapes."
    },
    {
      question: "What does the padding slider do?",
      answer: "The padding slider inserts space between the border of the icon and your logo. This is useful for scaling down large logos so they don't touch the edges, keeping them within the safe area."
    },
    {
      question: "Can I rotate or move my logo inside the icon?",
      answer: "Yes. The generator provides position offset controls (X and Y coordinates) and zoom scaling sliders, allowing you to position your logo inside the favicon container."
    },
    {
      question: "Why is the ICO file size larger than standard PNGs?",
      answer: "Because a `.ico` file is a container that holds multiple PNG or BMP images of different sizes (e.g. 16x16, 32x32, and 48x48) in a single binary payload. The file size is the sum of all contained images plus directory tables."
    },
    {
      question: "Do you support gradient backgrounds?",
      answer: "Yes. The styling panel supports linear and radial gradients with customizable color stops. You can enter hex colors to generate gradients for your icon backgrounds."
    },
    {
      question: "Can I upload JPEG files?",
      answer: "Yes. The generator accepts PNG, JPG, JPEG, SVG, and WEBP files. Note that JPEG does not support transparency, so any white background in your JPEG will be rendered as a solid color unless you strip it."
    },
    {
      question: "How do I check if my favicon is installed correctly?",
      answer: "You can check by opening your website in a browser and looking at the tab. You can also view the HTML page source to check if the link tags are pointing to the correct root paths, or check using audit tools like Lighthouse."
    },
    {
      question: "Will my favicon show up on Google search results?",
      answer: "Yes. Google crawls and displays favicons next to search results. To ensure indexing, place the `favicon.ico` in the root directory and ensure your home page includes a `<link rel='icon' ...>` tag."
    },
    {
      question: "What is PWA theme_color and background_color?",
      answer: "In the Web App Manifest, `theme_color` defines the color of the browser's status bar and navigation UI on mobile. The `background_color` is used on the splash screen before the web app stylesheet loads. Our generator prompts you for these colors and writes them into the manifest."
    },
    {
      question: "How does the browser select which favicon size to display?",
      answer: "Browsers select the most appropriate size based on context: 16x16 for tabs, 32x32 for bookmarks, and higher densities for high-DPI (Retina) screens. Providing a list of sizes in link tags allows the browser to download the most optimal size, saving bandwidth."
    },
    {
      question: "What is a multi-resolution ICO?",
      answer: "A multi-resolution ICO contains several images of different sizes inside one file. Windows and browsers read the file directory, locate the exact size needed, and load only those bytes, preventing blurred stretching."
    },
    {
      question: "Can I generate favicons for subdomains?",
      answer: "Yes. Subdomains can host their own unique favicons. Place the files in the subdomain's root directory and update its header HTML tags to point to the subdomain URL."
    },
    {
      question: "Does the generator support border-radius rounding?",
      answer: "Yes. You can use the border-radius slider to round the corners of the background color or shape, creating circles, rounded rectangles, or standard squares."
    },
    {
      question: "What is msapplication-TileImage?",
      answer: "This is a legacy metadata tag used by Microsoft Windows (Windows 8 and 10) to define the icon displayed on Windows Start menu tiles when a user pins the website. It is typically a 144x144 or 150x150 PNG file."
    },
    {
      question: "Can I download files individually?",
      answer: "Yes. The Developer Dashboard displays a table listing every generated file name. You can click the download button on any row to save a specific size without downloading the entire ZIP archive."
    },
    {
      question: "Why does my browser still show the old favicon after I updated it?",
      answer: "Browsers cache favicons aggressively to save requests. To force an update, clear your browser cache, open the favicon URL directly (e.g. `yourwebsite.com/favicon.ico`) and refresh, or add a query parameter to your HTML links (e.g. `href='/favicon.ico?v=2'`)."
    },
    {
      question: "Is PNG to ICO conversion lossless?",
      answer: "Yes. Modern ICO containers embed the source PNG files directly without re-compression, meaning the image quality of your PNGs is preserved inside the `.ico` file."
    },
    {
      question: "Can I generate favicons for WordPress sites?",
      answer: "Yes. You can upload the generated PNGs to your WordPress media library and select them under Appearance > Customize > Site Identity. Alternatively, upload them via FTP to the root folder and edit the theme's header templates."
    },
    {
      question: "What is the recommended filename for the Web App Manifest?",
      answer: "The W3C specification recommends using the `.webmanifest` extension (e.g., `site.webmanifest`), though `manifest.json` is also widely supported by all browsers and platforms."
    },
    {
      question: "Does this tool use third-party APIs?",
      answer: "No. The entire process runs locally inside your browser's thread, meaning your images are never sent to external servers or third-party APIs, keeping your brand assets secure."
    },
    {
      question: "What is a favicon Quality Score?",
      answer: "Our image analysis panel computes a Quality Score based on the uploaded image's resolution, aspect ratio (ideally 1:1), format, and transparency. This score helps you confirm if your logo is optimized for conversion."
    },
    {
      question: "Can I upload HEIC files?",
      answer: "This version is client-side and optimized for PNG, JPG, SVG, and WEBP. Support for Apple HEIC files will be introduced in a future update once browser HEVC decoding libraries are fully standardized."
    },
    {
      question: "How does the preview mockup work?",
      answer: "The preview panel uses CSS elements to build mockups of browser tabs, bookmark bars, and iOS/Android home screens, and renders your customized logo inside them so you can see how it looks in real-world contexts."
    },
    {
      question: "Can I save my customized preset configurations?",
      answer: "Yes. The settings panel caches your styling preferences (like paddings, border radius, background gradients, and shadow offsets) in local storage, restoring them when you reload the page."
    },
    {
      question: "What is the standard size of a Safari pinned tab icon?",
      answer: "Safari pinned tabs use a monochrome SVG vector icon with a solid fill color, defined by `<link rel='mask-icon' href='...' color='...'>`. While this tool focus on standard raster outputs, you can use your raw SVG in Safari setups."
    },
    {
      question: "Does the ZIP package include next.js configurations?",
      answer: "The ZIP package includes the compiled icon files and PWA manifest. The Next.js configuration code is displayed on the dashboard for you to copy and paste into your project's layouts."
    },
    {
      question: "How do I configure the favicon for React Native?",
      answer: "React Native is for mobile apps. Mobile apps use app store launcher icons. You can use the high-resolution 512x512 PNG from the ZIP package as the source asset for iOS/Android icon builders."
    },
    {
      question: "What does msapplication-TileColor do?",
      answer: "This is a Microsoft header tag specifying the background tile color of your pinned site on the Windows Start menu, matching your brand's theme color."
    },
    {
      question: "Why do we include multiple sizes in favicon.ico?",
      answer: "Windows desktop shortcuts and legacy browsers extract different sizes from the `.ico` file depending on the view style (e.g. 16x16 for address bars, 32x32 for desktop grids, and 48x48 for explorer details)."
    },
    {
      question: "Can I batch convert multiple logo assets at once?",
      answer: "Yes. You can upload multiple logo images to the queue, configure settings for each, and generate individual packages or a combined ZIP archive."
    },
    {
      question: "What is the PWA display mode?",
      answer: "The display mode in the manifest specifies how the app opens: 'standalone' hides browser URL bars to feel like a native app, while 'browser' opens it inside standard browser tabs."
    },
    {
      question: "How do I configure a PWA splash screen?",
      answer: "Chrome and iOS generate splash screens dynamically using the PWA manifest's `name`, `background_color`, and the `512x512` icon. Providing these parameters in our generator ensures your splash screens look correct."
    },
    {
      question: "Can I keep my favicons in a subdirectory instead of the root?",
      answer: "Yes, you can save them in a subfolder like `/assets/icons/`. If you do so, update the paths in your HTML link tags to point to the correct subfolder (e.g. `href='/assets/icons/favicon-32x32.png'`). However, keep a fallback copy of `favicon.ico` in the root folder, as some crawlers only check the root path."
    }
  ],
  longDescription: `
# The Definitive Engineering Guide to Web Iconography: Favicons, Touch Assets, and Web Manifests

In the early days of the internet, website identity was represented solely by text URLs. In 1999, Microsoft introduced Internet Explorer 5, which checked a website's root directory for a file named \`favicon.ico\`. If present, the browser displayed a 16x16 pixel icon next to the address bar and in bookmark lists. 

This simple feature marked the beginning of web iconography. Over the next two decades, web interfaces shifted from desktop monitors to high-DPI mobile screens, tablets, and Progressive Web Apps (PWAs). The single 16x16 icon has evolved into a system of icon specifications, touch assets, and manifest descriptors required to display correctly across all browsers, operating systems, and platforms.

This guide provides an engineering analysis of the favicon ecosystem, detailing ICO container structures, high-DPI scaling, PWA integration, safe area guidelines, and secure client-side asset compilation.

---

## 1. The ICO Container: Legacy Binary Architecture

While standard web displays use JPEG, PNG, or SVG formats, the core favicon standard relies on the **ICO** container format. Originally designed for Microsoft Windows application icons, the ICO format acts as a resource folder containing one or more sub-images of varying resolutions and color depths.

### The Binary Structure of an ICO File
An ICO file is composed of three sections: the Header, the Directory Entries Table, and the Image Data segments.

\`\`\`
┌────────────────────────────────────────────────────────┐
│                      ICO HEADER                        │
│   Reserved (2B)  │  Type (1=ICO) (2B) │  Count (2B)    │
├────────────────────────────────────────────────────────┤
│                  DIRECTORY ENTRIES TABLE               │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Directory Entry 1 (16B): W, H, Offset, DataSize  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Directory Entry 2 (16B): W, H, Offset, DataSize  │  │
│  └──────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────┤
│                       IMAGE DATA                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Image Data 1 (Raw PNG ArrayBuffer bytes)         │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Image Data 2 (Raw PNG ArrayBuffer bytes)         │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
\`\`\`

#### 1. Header (6 Bytes)
*   **Reserved (2 Bytes)**: Must always be 0.
*   **Type (2 Bytes)**: Specifies the resource type. Value is 1 for \`.ico\` files and 2 for \`.cur\` (cursor) files.
*   **Image Count (2 Bytes)**: Specifies the number of distinct images contained within the file.

#### 2. Directory Entry Table (16 Bytes per Entry)
For each image included in the container, a 16-byte directory descriptor defines its specifications:
*   **Width (1 Byte)**: Image width in pixels. A value of 0 indicates 256 pixels.
*   **Height (1 Byte)**: Image height in pixels. A value of 0 indicates 256 pixels.
*   **Color Palette (1 Byte)**: Number of colors in the color palette. Set to 0 if the image does not use a color palette (e.g. 24-bit/32-bit images).
*   **Reserved (1 Byte)**: Must be 0.
*   **Color Planes (2 Bytes)**: Typically set to 1.
*   **Bits Per Pixel (2 Bytes)**: The color depth of the image (typically 32 bits for RGBA PNGs).
*   **Data Size (4 Bytes)**: The exact size of the raw image data in bytes.
*   **Offset (4 Bytes)**: The byte offset from the beginning of the ICO file where the raw image data begins.

#### 3. Image Data
Traditionally, raw image data was stored as uncompressed BMP (device-independent bitmap) streams. However, since Windows XP, Microsoft has allowed sub-images to be stored as raw **PNG** files compressed with DEFLATE. 
Our custom client-side binary compiler leverages this PNG compression. Instead of converting images to complex BMP streams, we compress each sub-image as a PNG and write the raw PNG bytes directly into the ICO container, keeping file sizes small and ensuring clean alpha-channel transparency.

---

## 2. Favicon Sizes and Target Specifications

To support all operating systems, devices, and browser interfaces, you need to generate a suite of icon files:

| File Name | Resolution (px) | Targeted Client / Device Context |
| :--- | :--- | :--- |
| **favicon.ico** | Multi-size (16, 32, 48) | Legacy browsers, Windows desktop shortcuts, root fallback requests. |
| **favicon-16x16.png** | 16 × 16 | Standard browser tab favicon display. |
| **favicon-32x32.png** | 32 × 32 | Bookmarks bar, high-DPI desktop viewports. |
| **favicon-48x48.png** | 48 × 48 | Windows shortcut desktop grid display. |
| **favicon-96x96.png** | 96 × 96 | Google Search result snippet listings. |
| **favicon-192x192.png** | 192 × 192 | Android Chrome home screen shortcuts. |
| **favicon-512x512.png** | 512 × 512 | PWA splash screens, developer source mockups. |
| **apple-touch-icon.png** | 180 × 180 | Apple iOS home screens (Safari bookmarks). |

### PWA Manifest Integration
Progressive Web Apps require a Web App Manifest (\`manifest.webmanifest\`) referencing the icons. This file is parsed by mobile operating systems during app installation:
\`\`\`json
{
  "name": "My Progressive Web App",
  "short_name": "My PWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#518231",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
\`\`\`

---

## 3. Client-Side Image Composition: Canvas Mechanics

Our Favicon Generator uses an offline, client-side canvas rendering pipeline to generate these assets. This approach relies on HTML5 Canvas manipulation:

### 1. Creating the Canvas
The generator initializes a 512x512 pixel canvas context to serve as the master resolution. 
\`\`\`javascript
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');
\`\`\`

### 2. Rendering Background Gradients
If the user selects a solid color or gradient background, the context is filled. For gradients, we calculate color stop vectors:
\`\`\`javascript
const gradient = ctx.createLinearGradient(0, 0, 512, 512);
gradient.addColorStop(0, '#518231');
gradient.addColorStop(1, '#436a28');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 512, 512);
\`\`\`

### 3. Corner Rounding (Border Radius)
To round the corners of the background, we define a path using a clipping mask:
Let \\(R\\) represent the border radius value (0 to 256 pixels, where 256 yields a perfect circle). The path is defined as:
\`\`\`javascript
ctx.beginPath();
ctx.moveTo(R, 0);
ctx.arcTo(512, 0, 512, 512, R);
ctx.arcTo(512, 512, 0, 512, R);
ctx.arcTo(0, 512, 0, 0, R);
ctx.arcTo(0, 0, 512, 0, R);
ctx.closePath();
ctx.clip();
\`\`\`

### 4. Dropshadow Composition
If dropshadows are enabled, we configure the drawing context parameters before drawing the logo:
\`\`\`javascript
ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
ctx.shadowBlur = shadowBlurSlider;
ctx.shadowOffsetX = shadowOffset;
ctx.shadowOffsetY = shadowOffset;
\`\`\`

### 5. Drawing and Positioning the Logo
The logo image is drawn on top of the background. Let \\(W_{logo}\\) and \\(H_{logo}\\) represent the original image dimensions, \\(Z\\) represent the zoom scale factor, and \\(DX, DY\\) represent the horizontal and vertical offset translations. The logo is drawn at:

\\[X_{draw} = 256 - \frac{W_{draw}}{2} + DX\\]
\\[Y_{draw} = 256 - \frac{H_{draw}}{2} + DY\\]

Where \\(W_{draw} = W_{logo} \times Z\\) and \\(H_{draw} = H_{logo} \times Z\\).

---

## 4. Logo Design Guidelines: Safe Areas & PWA Compliance

When designing website icons and PWAs, keep in mind how different operating systems display app icons.

### Icon Masking on Mobile OS
Mobile operating systems mask home screen icons into different shapes: circles, squircles, or rounded rectangles.
*   **Android (Adaptive Icons)**: Android applies a circular mask to home screen icons. Any details placed in the corners of a square icon will be clipped.
*   **iOS (Squircle Icons)**: iOS crops icons into a squircle shape.

### The PWA Safe Area
To prevent critical logo details from being clipped by OS masks, PWA standards define a **Safe Area**. The Safe Area is the inner 80% circle of the icon. 

Let \\(C_{center} = (256, 256)\\) represent the center coordinate of a 512x512 icon, and \\(R_{safe} = 205\\) pixels represent the safe area radius (40% of the overall width). 

All primary branding elements, texts, and logos should fall within this circle:

\\[(X - 256)^2 + (Y - 256)^2 \le 205^2\\]

Our generator displays an overlay of this circular safe area boundary on the preview dashboard, helping you verify that your logo won't be cropped on mobile devices.

---

## 5. Deployment Guide: Link Tags & Framework Mappings

Once you have generated your favicon package, insert the correct metadata headers into your site to ensure browsers discover the assets.

### Standard HTML Setup
Place the generated icon files in your website's root directory and insert these tags into your HTML page's \`<head>\`:
\`\`\`html
<!-- Generic Link Headers -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
<link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- PWA Manifest Link -->
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#518231">
\`\`\`

### Next.js Metadata Setup
For modern Next.js configurations, you can export a metadata object from your root \`layout.tsx\` file:
\`\`\`typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Web Application',
  description: 'An enterprise web application.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};
\`\`\`
Alternatively, Next.js supports file-based metadata. Simply place \`favicon.ico\`, \`icon.png\` (512x512), and \`apple-icon.png\` (180x180) in the root of your \`app/\` directory, and the framework will automatically generate the appropriate tags at build time.
    `
};


