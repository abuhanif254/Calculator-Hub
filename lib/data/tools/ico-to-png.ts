import { ToolConfig } from './types';

export const icoToPngConfig: ToolConfig = {
  slug: "ico-to-png",
  title: "ICO to PNG",
  shortDescription: "Extract high-quality PNG images from ICO favicon files. Supports batch processing, transparency preservation, multiple size detection, and Retina upscaling. 100% private and local.",
  category: "Image Tools",
  keywords: [
    "ico to png",
    "convert ico to png",
    "favicon to png",
    "ico converter",
    "extract ico images",
    "icon extraction tool",
    "png icon converter",
    "online ico converter",
    "website favicon conversion",
    "ico file viewer",
    "extract png from favicon",
    "ico to png batch converter",
    "export all icon sizes",
    "retina icon generator"
  ],
  features: [
    "Multi-size detection and extraction for all embedded ICO sub-images",
    "Batch processing support to convert multiple ICO files simultaneously",
    "Preserves alpha channel transparency and original image edges with zero compression artifacts",
    "Retina display exports at 1x, 2x, 3x, and 4x upscaling",
    "Four extraction modes: All Sizes, Selected Sizes, Largest Size, Smallest Size",
    "Live preview with browser tab mock, mobile bookmark mock, and search result preview",
    "Local ZIP export for batch downloads using JSZip",
    "Developer tools including Favicon Analysis, Browser Compatibility, and Next.js integration guidelines",
    "100% client-side security—files are processed in your browser, never uploaded to any server"
  ],
  useCases: [
    "Extracting source PNG files from an existing website favicon.ico for reuse",
    "Deconstructing legacy application icon sets to modernize asset directories",
    "Inspecting multi-resolution ICO files to ensure they contain correct sizes for deployment",
    "Generating Retina-ready high-dpi icon alternatives from standard desktop icon files",
    "Previewing how a favicon will look in real-world environments like browser tabs and home screens",
    "Converting batch icon libraries securely without leaking proprietary artwork to remote servers"
  ],
  howToSteps: [
    "Upload your ICO files by dragging and dropping them into the designated area or using the file browser.",
    "Inspect the ICO Analyzer panel to view all available sizes, bit depth, and transparency info.",
    "Choose your extraction mode (e.g., Extract All Sizes, Extract Selected, Largest, or Smallest).",
    "Adjust export settings such as scale factor (1x to 4x Retina) and scale rendering filter (Smooth or Pixelated).",
    "Toggle the Interactive Website Previews (Browser Tab, Bookmark, PWA) to verify visual alignment.",
    "Click 'Download PNG' for individual sizes, or click 'Export All as ZIP' to download the entire set in one package."
  ],
  relatedTools: [
    { name: "Favicon Generator", slug: "favicon-generator" },
    { name: "Convert to PNG", slug: "convert-to-png" },
    { name: "SVG to PNG", slug: "svg-to-png" },
    { name: "PNG to SVG", slug: "png-to-svg" },
    { name: "Image Converter", slug: "image-converter" },
    { name: "Resize Image", slug: "image-resizer" }
  ],
  examples: [],
  faq: [
    {
      question: "What is an ICO file?",
      answer: "An ICO file is an image file format specifically designed for holding computer icons on Microsoft Windows and as favicons on the web. A key characteristic of the ICO format is its ability to pack multiple sub-images of varying dimensions (typically from 16x16 up to 256x256 pixels) and color depths into a single file, allowing the operating system or browser to dynamically scale and select the most appropriate resolution for display."
    },
    {
      question: "What is a PNG file?",
      answer: "A PNG (Portable Network Graphics) file is a raster graphics file format that supports lossless data compression. PNG was created as an improved, non-patented replacement for Graphics Interchange Format (GIF) and is widely used on the web due to its high-quality rendering, lossless compression, and native support for 8-bit alpha channel transparency (gradients of transparency)."
    },
    {
      question: "Why should I convert ICO to PNG?",
      answer: "While ICO files are great for bundle packaging icons, they are generally not well-supported by standard image viewers, graphic design software, or mobile applications. Converting ICO to PNG extracts the individual high-resolution assets into a universally compatible, lightweight format, making it easy to edit, import into design libraries like Figma, or use directly in mobile and web development."
    },
    {
      question: "How do I convert an ICO to a PNG for free?",
      answer: "You can convert ICO to PNG easily and for free using this tool. Simply drag and drop your ICO file into the upload box. The tool parses the file locally in your browser, displays all available sizes, and lets you download them as individual PNGs or a single ZIP package. No accounts or registrations are required."
    },
    {
      question: "Does converting ICO to PNG lose quality?",
      answer: "No, the conversion is completely lossless. PNG is a lossless format, and since the tool extracts the original compressed PNG or BMP sub-images directly from the binary data of the ICO container, the pixels, color depth, and transparency channels remain exactly identical to their source properties."
    },
    {
      question: "Can an ICO file store multiple sizes?",
      answer: "Yes, this is the primary feature of the ICO container. A single ICO file can contain dozens of sub-images at different dimensions. Common sizes include 16x16, 24x24, 32x32, 48x48, 64x64, 128x128, and 256x256 pixels. Our tool automatically detects and displays all embedded sizes so you can extract them individually."
    },
    {
      question: "How does the browser choose which size to display from an ICO?",
      answer: "Browsers query the favicon.ico file and select the sub-image size that matches the display context. For example, a standard browser tab on a non-Retina desktop displays the 16x16 icon, while a high-density (Retina) display will request the 32x32 icon. Desktop shortcuts usually display the 32x32 or 48x48 versions."
    },
    {
      question: "Does PNG preserve transparency?",
      answer: "Yes, PNG has native support for alpha channel transparency. This means it can render fully opaque pixels, fully transparent pixels, and semi-transparent pixels (such as smooth anti-aliased shadows and glowing edges). This tool fully preserves these transparency channels during the extraction process."
    },
    {
      question: "Is my file uploaded to a server?",
      answer: "No, your files are never uploaded to our servers. All parsing, extraction, and conversion take place 100% locally in your web browser. The tool utilizes client-side libraries (like `icojs`) and browser HTML5 Canvas APIs, ensuring absolute privacy and data security."
    },
    {
      question: "Can I convert multiple ICO files at once?",
      answer: "Yes, our tool supports full batch processing. You can select or drag and drop multiple ICO files at the same time. They will be added to a conversion queue where you can inspect them individually or click to export all extracted frames into a single ZIP archive."
    },
    {
      question: "What is a favicon?",
      answer: "A favicon (short for 'favorite icon') is a small icon associated with a particular website or web page. It is displayed in the browser's address bar, next to the page title in browser tabs, in bookmarks lists, and on mobile home screen shortcuts."
    },
    {
      question: "Can I use PNG directly as a favicon instead of ICO?",
      answer: "Yes, modern browsers fully support using PNG files as favicons. You can declare them in your HTML using the `<link rel=\"icon\" type=\"image/png\" href=\"/favicon.png\">` tag. However, having a legacy `favicon.ico` in the root folder of your website is still recommended as a fallback for older crawlers and browsers."
    },
    {
      question: "What is the standard favicon size?",
      answer: "The classic standard favicon size is 16x16 pixels. However, modern standards require multiple sizes. For desktop web, 16x16 and 32x32 are standard. For mobile and modern platforms, larger sizes like 180x180 (Apple Touch Icon) and 192x192 / 512x512 (Android/PWA) are required."
    },
    {
      question: "Why do some old ICO files fail to convert?",
      answer: "Older ICO files sometimes contain non-standard header formats, corrupted directories, or use ancient compression algorithms (like uncompressed 1-bit or 4-bit BMP variations) that do not strictly comply with modern browser canvas requirements. Our tool attempts to decode them using advanced fallback parsing, but extremely corrupted legacy assets may fail."
    },
    {
      question: "What are CUR and ICNS files?",
      answer: "CUR files are Windows cursor files. They are structurally identical to ICO files, with the only difference being a directory flag indicating it is a cursor and the presence of 'hotspot' coordinates indicating where the click point is. ICNS is Apple's macOS equivalent of the ICO format, designed to hold multiple resolutions for Mac app icons."
    },
    {
      question: "How do I make a favicon for my Next.js website?",
      answer: "In Next.js (App Router), you can place an `icon.png` or `icon.ico` file directly in the `/app` directory. Next.js will automatically detect this file and generate the correct `<link>` tags in the page metadata. We recommend using a 32x32 PNG or a multi-resolution ICO for general icons."
    },
    {
      question: "What is Retina support in this tool?",
      answer: "Retina support allows you to upscale the extracted PNG sub-images. High-density screens (like Apple's Retina displays) require double (2x) or triple (3x) the physical pixels to display sharp graphics. By choosing Retina upscaling, the tool multiplies the canvas resolution and draws the icon scaled up, preserving sharpness."
    },
    {
      question: "How do I extract only the largest icon from an ICO?",
      answer: "Under the Extraction Settings, choose the 'Extract Largest Size' mode. The tool will parse the ICO file, sort the sub-images by resolution, isolate the largest resolution available (e.g., 256x256), and prepare it for instant download."
    },
    {
      question: "How do I extract only the smallest icon from an ICO?",
      answer: "Choose 'Extract Smallest Size' mode in the settings. The tool will identify the lowest resolution sub-image (usually 16x16 pixels) and make it available for download, which is helpful if you are searching for minimalist representations."
    },
    {
      question: "Can I download all extracted icon sizes in a single ZIP file?",
      answer: "Yes, you can click the 'Download ZIP' or 'Export All' button. The tool runs `jszip` in the browser, compresses all extracted PNG sub-images, and triggers a local browser download for a single `.zip` file."
    },
    {
      question: "What is the difference between 8-bit, 24-bit, and 32-bit icons?",
      answer: "8-bit icons support up to 256 colors and are used for legacy compatibility. 24-bit icons support 16.7 million colors (True Color) but lack transparency gradients. 32-bit icons support True Color along with an 8-bit alpha transparency channel, permitting translucent elements like soft drop shadows."
    },
    {
      question: "What is an alpha channel in PNG?",
      answer: "An alpha channel is a color channel that controls the transparency of pixels in an image. While RGB channels define the amounts of Red, Green, and Blue, the Alpha (A) channel defines opacity from 0% (fully transparent) to 100% (fully opaque)."
    },
    {
      question: "Why does my icon have a black background instead of transparent?",
      answer: "This happens when an image editor or converter fails to parse the AND transparency mask of older BMP-based icons, replacing transparent pixels with black. Our tool uses `icojs` which is optimized to accurately parse both modern PNG-compressed ICO blocks and legacy BMP AND masks to guarantee transparency preservation."
    },
    {
      question: "How do I verify that transparency was preserved?",
      answer: "Our tool displays extracted PNGs on top of an interactive checkerboard background. This visual grid allows you to easily identify transparent regions, semi-transparent edges, and fully opaque sections."
    },
    {
      question: "What is the difference between ICO and CUR formats?",
      answer: "Structurally, they are nearly identical. The header's type field is `1` for ICO and `2` for CUR. Additionally, in CUR files, the two bytes normally representing color planes and bits per pixel represent the X and Y cursor hotspots."
    },
    {
      question: "Does this tool support CUR files?",
      answer: "Yes, because CUR is structurally equivalent to ICO, our browser parser can decode CUR files and extract their frames as transparent PNGs, which is useful for extracting cursor graphic assets."
    },
    {
      question: "How does this tool process files locally?",
      answer: "It uses JavaScript's `FileReader` API to read the uploaded ICO file as an `ArrayBuffer`. This binary buffer is then passed to our local JavaScript parser, which decodes the directory and structures. The raw pixel arrays are drawn onto HTML5 `<canvas>` elements, which are exported as PNGs via `canvas.toBlob()`."
    },
    {
      question: "What technologies does this tool use?",
      answer: "It is built with Next.js 15, TypeScript, Tailwind CSS, `icojs` (binary parser), `jszip` (zip generation), and HTML5 Canvas APIs. All libraries execute entirely inside the user's browser runtime."
    },
    {
      question: "Does this tool support mobile devices?",
      answer: "Yes, the interface is completely mobile-responsive. You can tap to upload files from your mobile device, analyze their embedded frames, preview how they look, and download the PNGs directly to your device."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes, because it is built on a Progressive Web App (PWA) framework, once the website and scripts are loaded, they are cached in your browser. You can disconnect from the internet and the tool will continue to process files locally."
    },
    {
      question: "What are the best practices for favicon design?",
      answer: "Ensure your design is simple, uses high contrast, and remains legible at small sizes like 16x16. Align your design elements to pixel grids to avoid blurriness, and test how it looks on both light and dark browser themes."
    },
    {
      question: "What is the Apple Touch Icon size?",
      answer: "The recommended size for an Apple Touch Icon is 180x180 pixels. This icon is used when a website is saved to the home screen of an iOS device (iPhone/iPad)."
    },
    {
      question: "What is the PWA icon size requirement?",
      answer: "For a Progressive Web App (PWA), Google Chrome requires at least two standard resolutions in the manifest file: 192x192 pixels and 512x512 pixels. These icons should be exported as PNGs."
    },
    {
      question: "How do I convert PNG back to ICO?",
      answer: "You can use our companion tool 'Favicon Generator'. It takes PNG or SVG images and builds a multi-resolution ICO file packed with standard sizes (16x16, 32x32, 48x48) automatically."
    },
    {
      question: "How many sizes can an ICO file contain?",
      answer: "An ICO file can theoretically contain up to 65,535 sub-images (since the image count is stored in a 2-byte unsigned integer). In practice, most ICO files contain between 1 and 6 standard resolutions."
    },
    {
      question: "Why is ICO still used if PNG is more modern?",
      answer: "ICO is kept primarily for backward compatibility. Internet Explorer and older desktop systems require it. It is also convenient because it acts as a single package containing different files, which simplifies web configuration."
    },
    {
      question: "What is a 32-bit color depth with alpha transparency?",
      answer: "It is a configuration of pixel data containing 8 bits of Red, 8 bits of Green, 8 bits of Blue, and 8 bits of Alpha transparency. This allows 256 levels of transparency for every color coordinate, creating smooth shadows."
    },
    {
      question: "Can I upscale a small icon size to a larger size?",
      answer: "Yes, the tool supports upscaling. However, upscaling a small raster image (like a 16x16 icon) to a larger size (like 256x256) will result in pixelation or blurriness unless you use nearest-neighbor scaling for retro designs."
    },
    {
      question: "Does upscaling make the image blurry?",
      answer: "If you use bilinear or bicubic interpolation, upscaling small raster images will make them blurry. If you use 'Nearest Neighbor' scaling, it will maintain sharp pixel edges, which is great for pixel-art styles."
    },
    {
      question: "How do I use the website previews?",
      answer: "After uploading an ICO, our page generates dynamic mockups. You can see your icon in a mockup of a browser tab, a mobile bookmark list, or a search snippet to inspect its visibility before deploying."
    },
    {
      question: "What is the browser tab preview?",
      answer: "It is a visual mockup mimicking a desktop browser tab (Chrome/Safari style). It displays the extracted icon alongside the site title, helping you preview how it fits in a crowded tab bar."
    },
    {
      question: "What is the mobile bookmark preview?",
      answer: "It is a mockup of a mobile home screen grid. It shows your icon on a phone layout with an app label, allowing you to preview it as a web clip or bookmark icon."
    },
    {
      question: "What is the PWA preview?",
      answer: "It is a visual simulation of a mobile splash screen or app interface using your icon, useful for evaluating progressive web applications."
    },
    {
      question: "How does the Favicon Analysis work?",
      answer: "It scans the ICO directory for essential standards. It reports if standard resolutions (16x16, 32x32, 48x48) are present, evaluates color depth, and gives recommendations for improvement."
    },
    {
      question: "Why is my favicon not showing up in search results?",
      answer: "Google requires your favicon file to be indexable, have a stable URL, be a multiple of 48x48 pixels (e.g. 48x48, 96x96, 144x144), and strictly follow content guidelines. Converting your favicon to these standard sizes helps."
    },
    {
      question: "How does Google index website favicons?",
      answer: "Google's user agent (`Googlebot-Image`) crawls the homepage of a website, finds the favicon `<link>` tag, downloads the asset, scales it to 16x16 pixels, and stores it in its cache to display in mobile and desktop search results."
    },
    {
      question: "How long does it take to convert an ICO to PNG locally?",
      answer: "It takes less than a second. Because the conversion is done entirely in memory using JavaScript and local CPU calculations, there are no transmission delays or server queues, providing instant results."
    },
    {
      question: "Are there any hidden fees or limitations?",
      answer: "No, there are no fees, limitations, or watermarks. You can convert as many files as you need, at any file size, completely free of charge."
    },
    {
      question: "Do I need an account to use this tool?",
      answer: "No, you do not need an account or email address. We prioritize user privacy, so all features are immediately open and run entirely in your local browser sandbox."
    },
    {
      question: "What browsers are compatible with this tool?",
      answer: "This tool is compatible with all modern browsers, including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, Opera, and mobile browsers on iOS and Android."
    },
    {
      question: "Can I use this tool in automated scripts?",
      answer: "This is an interactive web-based utility. For automated environments, we recommend using command-line tools like ImageMagick or Node.js scripts using the npm `icojs` library directly."
    },
    {
      question: "Does this tool support batch uploading of large ICO files?",
      answer: "Yes, you can upload dozens of files at once. However, because everything is processed in your browser's local RAM, uploading hundreds of very large files might temporarily slow down your browser tab."
    }
  ],
  longDescription: `
# Complete Guide to ICO to PNG Conversion: Technical Structures, Web Standards, and Local Workflows

In modern web development and graphic design, managing image assets across different devices, platforms, and resolutions is a critical challenge. Among the standard image formats, the **ICO (Icon)** file format is one of the oldest yet most persistent, particularly due to its deep integration with Microsoft Windows and web browsers. However, as web ecosystems shift toward modern, lightweight, and versatile formats like PNG, WebP, and SVG, deconstructing and converting legacy ICO containers is a frequent necessity.

This guide provides a comprehensive, highly technical analysis of the ICO and PNG file formats, explores their inner binary structures, outlines the best practices for web favicon deployment, and details how our client-side **ICO to PNG Conversion Studio** extracts and upscaled these files securely.

---

## 1. What is the ICO File Format? A Deep Technical Analysis

The **ICO** file format is a dedicated graphic container format designed specifically for computer icons. First introduced in Windows 1.0, the format has undergone several evolutions, culminating in its current structure which has been stable since Windows Vista.

The defining characteristic of an ICO file is its ability to pack **multiple sub-images** of varying dimensions and color depths into a single file. This design solves a key user experience problem: a computer icon must look sharp whether it is displayed as a tiny 16x16 pixel thumbnail in a detailed list, a 32x32 icon in a browser tab, or a massive 256x256 asset on a high-definition desktop grid. By wrapping all these resolutions inside a single file container, the operating system or browser can automatically select and render the optimal size without relying on real-time scaling filters that cause pixel blur.

### Standard Resolutions and Applications

A production-grade ICO file typically bundles the following standard resolutions:

*   **16x16**: The classic web favicon size. Used in browser tabs, address bars, and legacy desktop detail lists.
*   **24x24**: Used on Windows toolbar items and specialized mobile layouts.
*   **32x32**: Used for desktop shortcuts, file listings, and Retina web favicons.
*   **48x48**: Used for large desktop icons and file explorers.
*   **64x64**: Used for higher-density Explorer layouts and custom applications.
*   **128x128**: High-resolution application icons for Windows systems.
*   **256x256**: The modern maximum standard for desktop icons. Often compressed using PNG compression inside the ICO file to reduce file size.
*   **512x512**: A next-generation size occasionally found in custom application templates, though more common in Apple's \`.icns\` format.

---

## 2. The Anatomy of an ICO File

To understand how our tool extracts PNGs from an ICO file, it is helpful to look at the binary structure of the file format. An ICO file consists of three main components:
1.  **Header (Icon Directory)**: A 6-byte structure defining the format type and number of embedded images.
2.  **Image Directory Entry (List of Entries)**: A series of 16-byte records providing metadata for each sub-image (dimensions, offsets, size).
3.  **Image Data**: The raw binary payloads of the images, which can be either BMP or PNG streams.

### Binary Layout Table

Below is a map of the binary layout of a standard ICO file header and directory:

| Byte Offset | Data Type | Field Name | Description |
| :--- | :--- | :--- | :--- |
| **0 - 1** | \`uint16\` | Reserved | Must always be \`0\`. |
| **2 - 3** | \`uint16\` | Type | Specifies format: \`1\` for ICO, \`2\` for CUR (cursor). |
| **4 - 5** | \`uint16\` | Count | Number of sub-images packed inside the file. |
| **6 - 21** | \`16-byte struct\` | Directory Entry 1 | Metadata for the first sub-image (width, height, offset). |
| **22 - 37** | \`16-byte struct\` | Directory Entry 2 | Metadata for the second sub-image (if Count > 1). |

### The 16-Byte Directory Entry Structure

For each image specified in the \`Count\` field, there is a corresponding 16-byte directory entry:

1.  **Width** (1 byte): Image width in pixels. A value of \`0\` represents \`256\` pixels.
2.  **Height** (1 byte): Image height in pixels. A value of \`0\` represents \`256\` pixels.
3.  **Color Count** (1 byte): Number of colors in the color table. Set to \`0\` if the image doesn't use a palette.
4.  **Reserved** (1 byte): Must always be \`0\`.
5.  **Color Planes** (2 bytes): Number of color planes. Usually set to \`1\` or \`0\`.
6.  **Bits per Pixel (BPP)** (2 bytes): The color depth. Common values are \`4\` (16 colors), \`8\` (256 colors), \`24\` (True Color), or \`32\` (True Color with Alpha).
7.  **Size of Data** (4 bytes): The total size of the image payload in bytes.
8.  **Offset** (4 bytes): The starting byte position of the image data from the beginning of the file.

### BMP vs PNG Payloads

Older ICO files store image data using the **BMP (Bitmap)** format, specifically a headerless \`BITMAPINFOHEADER\` followed by the color table and pixel maps. Modern ICO files (especially those containing 256x256 icons) often embed a standard **PNG** file instead of a BMP to take advantage of PNG's superior compression.

Our client-side tool reads the offset and data size from the directory entries, jumps directly to the payload, and determines if it starts with the PNG magic number: \`\\x89\\x50\\x4E\\x47\\x0D\\x0A\\x1A\\x0A\`. If the signature is present, the sub-image is already a valid PNG, and the tool extracts the raw bytes directly. If it is a BMP, the tool parses the bitmap structure, creates an offscreen HTML5 \`<canvas>\`, draws the pixel map onto the canvas (resolving the transparency masks), and exports it as a PNG.

---

## 3. PNG vs ICO: A Technical Comparison

When deciding which format to use for your application assets, understanding the tradeoffs between PNG and ICO is essential:

### 1. File Type and Purpose
*   **ICO**: A container format that packs multiple resolutions. It is designed to act as a single source of truth for applications and operating systems to fetch icons.
*   **PNG**: A single-image format. It cannot contain multiple sub-images. Instead, it holds a single raster image.

### 2. Compression and File Size
*   **ICO**: Legacy BMP payloads are uncompressed, leading to large file sizes. Modern PNG-compressed payloads fix this, but the file size is still the sum of all embedded images.
*   **PNG**: Uses DEFLATE compression, making it highly optimized for web delivery.

### 3. Transparency Support
*   **ICO**: Supports simple binary transparency via an AND bitmask. Modern 32-bit ICOs support alpha transparency, but older applications may fail to render it.
*   **PNG**: Features native 8-bit alpha channel support, allowing 255 levels of transparency for every pixel. This enables smooth gradients, soft shadows, and anti-aliased rounded edges.

### 4. Compatibility
*   **ICO**: Native to Windows and web browser favicons. Not supported by mobile platforms, Linux desktops, or standard design software.
*   **PNG**: Universally supported by every modern operating system, web browser, mobile application, email client, and design tool.

---

## 4. The History of Web Favicons: From 16x16 to Responsive PWAs

The concept of a \"favicon\" was introduced in 1999 by Microsoft in Internet Explorer 5. If a user bookmarked a website, Internet Explorer would request a file named \`favicon.ico\` from the root directory of the server. If found, the icon was displayed next to the site name in the browser's Favorites menu.

Because this feature was not initially standardized, browsers would look for the file in the root directory even without any HTML tags. As a result, the \`favicon.ico\` file became a permanent fixture of web standards.

### The Modern Multi-Device Challenge

Today, web applications are accessed on smartphones, tablets, high-DPI desktop displays, smart TVs, and desktop environments. A single 16x16 pixel icon is no longer sufficient.

1.  **Apple iOS Devices**: iPhones and iPads use the Apple Touch Icon (typically 180x180 pixels) to display icons when a user adds a website shortcut to their home screen.
2.  **Android Devices**: Android Chrome uses the Web App Manifest (\`manifest.json\`) file to fetch high-resolution icons (typically 192x192 and 512x512 pixels) for Progressive Web Apps (PWA).
3.  **Search Engine Indexers**: Google crawls website favicons to display next to search results. To ensure your icon is indexable, it must be a multiple of 48x48 pixels.

---

## 5. Implementing Favicons: Developer Deployment Guide

For modern web projects, deploying a clean, responsive icon system requires configuring several files. Here is the recommended layout for a production website:

### Standard HTML Head Integration

Add the following tags to the \`<head>\` of your website to support both modern and legacy browsers:

\`\`\`html
<!-- Legacy fallback -->
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">

<!-- Standard web favicons -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">

<!-- Apple iOS home screen icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Web App Manifest for PWAs -->
<link rel="manifest" href="/site.webmanifest">
\`\`\`

### The Web App Manifest (\`site.webmanifest\`)

For Progressive Web Apps, define your icon set in the manifest JSON file:

\`\`\`json
{
  "name": "My Professional App",
  "short_name": "ProApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#518231",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
\`\`\`

### Next.js 15 Metadata API Configuration

If you are using Next.js 15 (App Router), place your icon files directly in the root of your \`/app\` directory:

*   \`/app/icon.png\` (used for standard favicons, Next.js generates the different sizes automatically)
*   \`/app/apple-icon.png\` (used for Apple Touch Icons)
*   \`/app/favicon.ico\` (fallback for older browsers)

Next.js will automatically scan these files and inject the correct \`<link>\` tags into your HTML headers at build time.

---

## 6. How to Extract PNGs from ICO Files (Client-Side implementation)

Our **ICO to PNG Conversion Studio** parses files locally in your browser using the following technical workflow:

1.  **Binary Reading**: The user uploads an ICO file. The file is read into RAM as a raw \`ArrayBuffer\` using the HTML5 \`FileReader\` API.
2.  **Directory Parsing**: The parser reads the 6-byte header to verify the file is a valid ICO format, then loops through the 16-byte directory entries to map out each sub-image.
3.  **Payload Extraction**:
    *   If a sub-image uses PNG compression, the parser extracts the raw byte range and creates a new \`Blob\` with the MIME type \`image/png\`.
    *   If a sub-image uses the legacy BMP format, the parser reads the header parameters, color table, and pixel array, then draws them onto an offscreen canvas element pixel-by-pixel, preserving transparency masks.
4.  **Retina Upscaling**: If the user selects upscaling (e.g. 2x or 3x), the tool creates a new canvas with multiplied dimensions, sets the scaling filter (\`imageSmoothingEnabled\` to \`false\` for nearest-neighbor scaling or \`true\` for smooth scaling), and redraws the image.
5.  **Local Download**: The canvas is converted to a PNG blob using \`canvas.toBlob()\`. If a single file is requested, the browser triggers a local download. If multiple files are processed, \`jszip\` compiles them into a ZIP package entirely in memory.

**This client-side architecture guarantees complete privacy—your files are never uploaded to any remote server.**
   `
};
