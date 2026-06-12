import { ToolConfig } from './types';

export const svgToPngToolConfig: ToolConfig = {
  slug: "svg-to-png",
  title: "SVG to PNG",
  shortDescription: "Convert SVG and SVGZ vector graphics to high-resolution transparent PNG images. Custom sizing, aspect ratio locking, batch queue processing, and online optimization.",
  category: "Image Tools",
  keywords: [
    "svg to png",
    "convert svg to png",
    "svg converter",
    "vector to png",
    "svg export tool",
    "transparent png generator",
    "svg rendering",
    "svg image converter",
    "online svg converter",
    "free svg to png tool",
    "export svg as png",
    "svg to transparent png",
    "high quality svg to png"
  ],
  features: [
    "Convert standard SVG and compressed SVGZ files to PNG formats locally",
    "Select transparent backgrounds or fill with white, black, or custom hexadecimal colors",
    "High-DPI resolution scaling—export at original size, 2x, 4x, or 8x Retina density",
    "Custom dimension controls—change width and height with optional aspect ratio locking",
    "Interactive SVG code editor—paste markup, validate structure, and preview edits in real time",
    "Vector analysis dashboard—get element count, viewBox coordinates, paths, and complexity metrics",
    "Automated SVG optimization—detect and strip editor metadata, empty tags, and comments",
    "Batch processing queue—convert multiple files simultaneously and download as a ZIP bundle",
    "100% browser-based operations—your design assets never touch external servers"
  ],
  useCases: [
    "Converting vector UI icons into transparent raster PNG assets for mobile application codebases",
    "Generating high-resolution raster screenshots of SVG diagrams for inclusion in PDF slides or print reports",
    "Rasterizing web-designed SVGs with custom dimensions for social media profile pics or header banners",
    "Stripping proprietary editor metadata (from Illustrator or Inkscape) and exporting clean PNG drafts",
    "Batch-processing icon sets to standard transparent PNG sizes (e.g. 16x16, 32x32, 64x64, 128x128)",
    "Editing SVG raw coordinates inline and converting the updated design into a PNG snapshot"
  ],
  howToSteps: [
    "Drag & drop your SVG files into the upload box, or click to browse your folders.",
    "Alternatively, paste raw SVG code directly into the code viewer panel to activate the editor.",
    "Choose your Output Settings: choose transparent, solid white, black, or enter a custom hex color.",
    "Configure Output Resolution: select a multiplier (1x, 2x, 4x, 8x) or type custom width/height values.",
    "Review Vector Stats in the analysis panel to inspect layers, viewBox, and complexity.",
    "Download your rasterized PNG instantly, or click 'Download All (ZIP)' to retrieve the entire queue."
  ],
  relatedTools: [
    { name: "Image Converter", slug: "image-converter" },
    { name: "Compress Image", slug: "compress-image" },
    { name: "Resize Image", slug: "resize-image" },
    { name: "Image Metadata Viewer", slug: "image-metadata-viewer" },
    { name: "Image Metadata Remover", slug: "image-metadata-remover" }
  ],
  examples: [],
  faq: [
    {
      question: "What is an SVG file?",
      answer: "SVG stands for Scalable Vector Graphics. It is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation. Unlike pixel-based raster graphics (like JPEGs or PNGs), SVGs use mathematical formulas to draw lines, curves, and shapes, making them infinitely scalable without losing quality."
    },
    {
      question: "Why should I convert an SVG to a PNG?",
      answer: "While SVGs are ideal for responsive web design, many platforms and software packages do not support them natively. You need to convert SVGs to PNGs for compatibility with social media sites, presentation tools (like PowerPoint), image editors, email clients, and native mobile applications that mandate raster assets."
    },
    {
      question: "Will my converted PNG have a transparent background?",
      answer: "Yes. PNG supports an alpha channel for transparency. By default, our converter maintains the transparency of your SVG. If your SVG doesn't define a background shape, the final PNG will be transparent. You can also manually configure solid backgrounds (white, black, or custom colors) if desired."
    },
    {
      question: "Does converting SVG to PNG reduce image quality?",
      answer: "Vector graphics are mathematically crisp. Converting them to PNG (a raster format) bakes the design into static pixels. To prevent loss of quality, our converter lets you choose scaling multipliers (2x, 4x, 8x) or custom dimensions. Exporting at higher resolutions ensures the PNG remains sharp even on high-DPI screens."
    },
    {
      question: "Are my files uploaded to a server during conversion?",
      answer: "No. Our SVG to PNG converter operates entirely on the client side. The parsing, scaling, rendering, and export are performed directly within your browser's execution context. No image data is sent to our servers, assuring complete privacy for sensitive design assets."
    },
    {
      question: "Can I batch convert multiple SVGs at once?",
      answer: "Yes. The tool contains a queue-based batch engine. You can select and drop dozens of SVG files into the upload area. The queue will process them sequentially in real-time, allowing you to download them individually or bundle them all into a single ZIP archive."
    },
    {
      question: "What is a viewBox in an SVG?",
      answer: "The viewBox is an attribute of the `<svg>` element that defines the coordinate system of the canvas. It is represented as four numbers: min-x, min-y, width, and height. It specifies the aspect ratio and boundary limits of the vector shapes, which our rasterizer uses to calculate target PNG aspect ratios."
    },
    {
      question: "What is the difference between SVG and PNG?",
      answer: "SVG is a vector format that uses XML text to describe geometry (points, lines, paths, colors), allowing files to scale infinitely without pixelation. PNG is a raster format that stores images as a grid of colored pixels. SVG is best for logos, icons, and illustrations; PNG is best for photos and cases requiring wide compatibility."
    },
    {
      question: "Can I convert compressed SVGZ files?",
      answer: "Yes. SVGZ files are standard SVG files compressed using GZIP. Modern browsers natively decompress SVGZ files during loading. If you upload an SVGZ file, our local reader will decompress the content and render it to PNG just like a standard SVG."
    },
    {
      question: "Can I edit the SVG code before converting it?",
      answer: "Yes. The converter features an inline SVG Code Editor (powered by Monaco Editor). You can paste XML code directly, edit coordinate values, shapes, colors, or styles in real time, view the updated render live, and convert the edited version to PNG."
    },
    {
      question: "How does the scaling multiplier work?",
      answer: "The scaling multiplier (1x, 2x, 4x, 8x) increases the canvas rendering dimensions relative to the SVG's original bounding size. For example, if your SVG has a base size of 100x100 pixels, selecting 4x will render the output PNG at 400x400 pixels, yielding a sharp, high-DPI asset."
    },
    {
      question: "What is Retina or High-DPI export?",
      answer: "Retina and High-DPI screens use more physical pixels to render elements, demanding higher-resolution images to look sharp. Exporting your SVG as a 2x or 4x PNG provides the extra pixels needed to keep icons looking crisp on modern smartphones, tablets, and Retina laptops."
    },
    {
      question: "Can I lock the aspect ratio during custom sizing?",
      answer: "Yes. The resolution settings include an 'Aspect Ratio Lock' checkbox. When checked, changing the output width will automatically recalculate the height (and vice versa) based on the original SVG's viewBox or width/height attributes, preventing distortion."
    },
    {
      question: "What is the vector complexity score?",
      answer: "The vector complexity is a metric computed by analyzing the SVG's DOM tree. It counts the number of total elements, path commands, and gradients. SVGs with under 50 elements are classified as 'Simple', 50-500 as 'Medium', and over 500 as 'Complex'. This helps predict rendering overhead."
    },
    {
      question: "What optimization recommendations does the tool offer?",
      answer: "The developer console analyzes the SVG code for bloating artifacts. It flags editor metadata (from Adobe Illustrator, Sketch, or Inkscape), XML declarations, embedded editor attributes, empty groups, and inline styles that can be minified, helping you clean the code."
    },
    {
      question: "How does the client-side SVG optimizer work?",
      answer: "Clicking the 'Optimize SVG' button cleans the markup by stripping comments, namespaces, metadata sections, and empty tags. It shows the resulting code and details the exact percentage of file size saved, allowing you to copy the optimized vector code."
    },
    {
      question: "Can I import an SVG from an external web URL?",
      answer: "Yes. The import menu allows you to paste a remote URL pointing to an SVG file. The tool fetches the vector content via client-side fetch, loads it into the editor, and readies it for custom conversion."
    },
    {
      question: "Does this tool support CSS styles inside the SVG?",
      answer: "Yes. If your SVG contains embedded `<style>` blocks or inline style attributes, modern browser rendering engines deconstruct and apply those styles to the canvas context, ensuring they render correctly in the output PNG."
    },
    {
      question: "Will custom fonts render correctly in the PNG?",
      answer: "If your SVG relies on system fonts (like Arial or Helvetica), they will render correctly. However, if it uses custom web fonts (like Google Fonts) without embedding them as Base64 data-URIs or importing them inside the SVG styles, they may fall back to default fonts. For absolute accuracy, convert text elements to paths before exporting."
    },
    {
      question: "What happens if my SVG contains external images?",
      answer: "If your SVG embeds raster images (using `<image xlink:href='...' />`), the browser will render them, provided they are hosted on a server that allows cross-origin requests (CORS). Otherwise, security restrictions (tainted canvas) may block browser export."
    },
    {
      question: "Is there a limit to the size of SVG I can convert?",
      answer: "There is no hard limit, but extremely large SVG files containing hundreds of thousands of path coordinates can tax your system's RAM and CPU during rendering. Most standard designs, diagrams, and complex illustrations convert in milliseconds."
    },
    {
      question: "Can I convert inline SVG markup directly?",
      answer: "Yes. You can copy any SVG tag directly from a website's inspect panel, paste it into our code editor, customize your settings, and convert it to a PNG immediately."
    },
    {
      question: "Can I use this tool on a mobile device?",
      answer: "Yes. The interface is fully responsive and touch-optimized. You can upload files from your phone's camera roll or file manager, inspect previews, and download the PNGs directly to your device."
    },
    {
      question: "How do I download my converted images as a ZIP file?",
      answer: "Once you have uploaded multiple files to the queue, a 'Download All (ZIP)' button will become active. Clicking it will compress all successfully converted PNGs into a single ZIP archive on the fly and trigger the file download."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes. Once the web application is loaded in your browser, all processing happens locally. You can disconnect from the internet and continue using the converter, editor, and optimizer offline."
    },
    {
      question: "Why does my SVG look correct in the preview but cuts off in the PNG?",
      answer: "This usually happens if the SVG has vector coordinates that fall outside the defined width/height boundaries or viewBox boundaries. Adjusting the viewBox or checking 'Aspect Ratio Lock' can align the coordinates with the canvas grid."
    },
    {
      question: "Why do we use PNG instead of JPEG for vector exports?",
      answer: "Vector graphics consist of sharp lines and text. PNG uses lossless compression, preserving those sharp edges perfectly. JPEG uses lossy compression, which creates blurred artifacts around contrasting borders. PNG also supports background transparency, whereas JPEG does not."
    },
    {
      question: "Are custom gradients and patterns supported?",
      answer: "Yes. Linear gradients, radial gradients, and tile patterns defined inside the `<defs>` section of your SVG are fully supported and drawn accurately by the browser's rendering engine onto the canvas."
    },
    {
      question: "Can this tool convert PNG back to SVG?",
      answer: "No. Converting PNG (pixels) to SVG (vectors) requires vectorization (image tracing), which requires a different type of algorithm. This converter focuses on rasterizing vector SVGs into PNGs."
    },
    {
      question: "Can I select custom presets for social media sizes?",
      answer: "Yes. The settings panel provides a quick-select menu for common export sizes, including social media icons (YouTube, Twitter, Instagram profile pictures) and favicon sizes."
    },
    {
      question: "What is an XML parsing error in SVG?",
      answer: "Because SVG is a strict XML format, any missing closing tags, unquoted attributes, or mismatched brackets will trigger a parser error. The inline editor validates your markup and highlights the error line so you can correct it."
    },
    {
      question: "Does this tool support inline base64 images inside the SVG?",
      answer: "Yes. If your SVG includes embedded raster images formatted as base64 data-URIs, the browser can decode and render them without cross-origin CORS security restrictions."
    },
    {
      question: "What does the 'Tainted Canvas' error mean?",
      answer: "A tainted canvas occurs if the SVG references external images or resources from a different domain that lacks CORS permissions. Browsers block exporting a tainted canvas to protect user security. Use local SVGs or base64 resource URIs to prevent this."
    },
    {
      question: "Can I adjust the DPI of the output PNG?",
      answer: "DPI (dots per inch) is a metadata tag. Modern displays render images based on pixel dimensions. To get high-DPI prints or retina assets, scale the image dimensions (e.g. 300% or 4x size) before exporting."
    },
    {
      question: "What are XML namespaces in SVG?",
      answer: "XML namespaces (like `xmlns='http://www.w3.org/2000/svg'`) tell the XML parser that the tags inside the document represent SVG elements. Our parser preserves standard namespaces while removing redundant editor-specific ones to optimize code size."
    },
    {
      question: "Can I convert SVG animations to PNG?",
      answer: "PNG is a static image format. If your SVG contains CSS or SMIL animations, the converter will capture and rasterize the initial frame (the static state at time zero) onto the canvas."
    },
    {
      question: "Is there any charge for using this converter?",
      answer: "No. The SVG to PNG converter is 100% free. There are no limits on the number of conversions, file sizes, or batch lengths, and we add no watermarks to your exported PNGs."
    },
    {
      question: "Does the tool support clip-path and masking?",
      answer: "Yes. Complex masking, clipping paths, and clipping bounds defined inside the SVG are supported and executed by the browser canvas rendering context."
    },
    {
      question: "Will inline scripts run during conversion?",
      answer: "No. For security reasons and to conform with standard image loading protocols, browsers disable JavaScript execution within SVG files loaded as images, meaning any inline scripts are ignored."
    },
    {
      question: "What browser is recommended for this tool?",
      answer: "The tool works on all modern web browsers supporting HTML5, CSS3, and the Canvas API, including Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge."
    },
    {
      question: "How do I clear the batch conversion queue?",
      answer: "You can clear the conversion queue by clicking the 'Clear All' trash icon on the queue panel, which resets the state and clears the temporary blob URLs from the browser memory."
    },
    {
      question: "What is an SVG element count?",
      answer: "The SVG element count represents the total number of HTML nodes inside the `<svg>` container, including paths, groups, defs, gradients, and shapes. Higher counts indicate a more complex file."
    },
    {
      question: "Why does my converted image have a black background?",
      answer: "If you select the transparent background setting and view the resulting PNG in an image viewer that doesn't support transparency (or defaults its viewport background to black), it might appear black. Opening it in a browser or editing software will confirm transparency."
    },
    {
      question: "Can I save my favorite dimension settings?",
      answer: "Yes. The tool features a 'Saved Settings' option that caches your export preferences (like transparency, default scaling multipliers, and custom widths) locally in your browser storage for future visits."
    },
    {
      question: "Can I convert SVGs with multiple nested layers?",
      answer: "Yes. Nested `<g>` groups and layered shapes are rendered in the order they are defined in the XML document (painters algorithm, where subsequent layers paint on top of previous layers)."
    },
    {
      question: "What are editor metadata namespaces?",
      answer: "Graphics software packages like Adobe Illustrator and Inkscape add custom tags and metadata (like `<sodipodi:namedview>` or `illustrator:type`) to SVGs to save editor states. These tags are useless for web displays and are cleaned by our optimizer."
    },
    {
      question: "Does this tool support the SVG 'use' element?",
      answer: "Yes. The `<use>` element clone references from the `<defs>` section (like reusable icons or symbol shapes) and renders them across the canvas at specified coordinates."
    },
    {
      question: "What is the standard aspect ratio of web icons?",
      answer: "Web icons are typically square, maintaining a 1:1 aspect ratio (e.g. 24x24, 32x32, or 512x512). Our custom controls help lock these standard scales easily."
    },
    {
      question: "How can I verify the output PNG file size before downloading?",
      answer: "The queue list display updates immediately after a file finishes rendering, showing the output PNG file size in kilobytes alongside the compression savings."
    },
    {
      question: "What is a GZIP or SVGZ compression ratio?",
      answer: "GZIP compression reduces text-based SVG file sizes by 50% to 80% by encoding repeating patterns. Our tool handles this compression seamlessly."
    }
  ],
  longDescription: `
# The Comprehensive Guide to SVG and PNG Formats: Rendering, Custom Resolution Scaling, and Client-Side Optimization

In the field of digital design and web engineering, images are split into two primary architectures: **vector graphics** and **raster graphics**. While both paradigms exist to render visual interfaces on screens, they use entirely different mathematical principles to store and represent coordinate data. 

For developers, designers, and digital artists, the need to transition between these formats—specifically, converting **Scalable Vector Graphics (SVG)** into **Portable Network Graphics (PNG)**—is a frequent requirements. Whether you are generating assets for a native iOS application, formatting graphics for a corporate slide presentation, or optimizing web logos for legacy browsers, understanding the conversion pipeline is key.

This guide provides an engineering analysis of SVG and PNG format specifications, detailing client-side canvas rasterization, high-DPI retina rendering, viewBox coordinate translation, metadata sanitization, and the benefits of local browser-based execution.

---

## 1. Vector vs. Raster: The Core Graphic Divide

To understand the SVG-to-PNG conversion process, we must first analyze the math behind vector and raster file types.

### Vector Graphics (SVG)
SVG is an XML-based file format defined by the World Wide Web Consortium (W3C). Instead of defining a grid of colored pixels, an SVG describes shapes, paths, lines, and text using coordinate geometry:
*   **Mathematical Precision**: A line is stored as a start coordinate \\(x1, y1\\) and end coordinate \\(x2, y2\\) with attributes for color, stroke-width, and opacity.
*   **Resolution Independence**: Because the geometry is defined mathematically, the browser can scale the coordinate system infinitely. Whether rendered on a small watch face or a massive billboard, the lines, curves, and corners remain perfectly sharp.
*   **DOM Integration**: Since SVGs are formatted as XML, they are parsed into the browser's Document Object Model (DOM). This allows developers to style vector nodes using standard CSS and manipulate coordinates dynamically using JavaScript.

### Raster Graphics (PNG)
PNG is a raster graphic format developed as a patent-free replacement for GIF. Unlike vector files, PNGs store images as a two-dimensional grid of pixels, where each cell contains specific color data:
*   **Alpha Channel Support**: PNG supports 24-bit TrueColor (RGB) alongside an 8-bit Alpha channel (RGBA), allowing for varying levels of transparency.
*   **Lossless Compression**: PNG uses the DEFLATE compression algorithm (combining LZ77 and Huffman coding), ensuring that no pixel detail is discarded during file saving.
*   **Resolution Dependence**: Because raster graphics are composed of a fixed pixel grid (e.g., 800x600 pixels), stretching or scaling the image forces the display engine to interpolate pixels, resulting in blurred edges, pixelation, and visual artifacts.

---

## 2. Why SVG to PNG Conversion is Essential

Despite the scalability and performance benefits of vector formats, they are not universally compatible. Converting SVG to PNG is necessary in several scenarios:

### Native Platform Integration
*   **iOS Development**: Apple's Xcode accepts vector assets (in PDF or SVG formats), but during build compilation, the asset manager rasterizes them into native 1x, 2x, and 3x PNG assets.
*   **Android Development**: While Android supports vector drawables, complex SVGs containing gradients and filters can degrade rendering performance. Converting them to PNG format is common practice for complex graphics.
*   **Email Clients**: Most HTML email engines (such as legacy versions of Microsoft Outlook) actively block inline SVG code or remote SVG files due to script injection vulnerabilities, making PNG the safest choice.

### Web Publishing Compatibility
*   **Social Media Sharing**: Social sharing networks (like Facebook, Twitter, LinkedIn, and Pinterest) do not support SVG files for profile photos, post graphics, or header banners. These platforms require JPEG or PNG formats.
*   **Government and Job Portals**: Many legacy portals restrict document and logo uploads to JPEG/PNG, actively blocking vector formats.

### Visual Consistency
Vector rendering engines can vary between browsers. An SVG featuring complex CSS filters, nested masks, or specialized fonts may render beautifully in Google Chrome but look broken in Safari or Edge. Rasterizing the design to a static, flattened PNG guarantees that the design displays identically across all hardware configurations.

---

## 3. How Client-Side SVG Rasterization Works

Our SVG to PNG Converter Studio processes files entirely in your browser. This client-side approach relies on browser-native APIs: the **DOMParser**, the **XMLSerializer**, and the **HTML5 Canvas API**.

### The Conversion Pipeline
The process of translating XML math into a grid of colored pixels follows a structured sequence:

\`\`\`
[Raw SVG Code / File]
          │
          ▼
    [DOMParser] ───────► Extracts dimensions, viewBox, and element statistics
          │
          ▼
[XMLSerializer] ───────► Builds sanitized XML text representation
          │
          ▼
   [SVG Blob URL] ─────► Serializes code into an in-memory image source
          │
          ▼
    [HTMLImage] ───────► Decodes vector graphic in the browser engine
          │
          ▼
   [HTML5 Canvas] ─────► Paints uncompressed RGBA pixels with scale overrides
          │
          ▼
    [Export PNG] ──────► Compresses pixels into local PNG bytes
\`\`\`

### Detailed Pipeline Breakdown
1.  **Parsing XML**: The tool reads the SVG string (either uploaded from a file or pasted into the editor). The browser's \\\`DOMParser\\\` parses the string, producing a DOM tree. This stage validates that the XML is well-formed, flagging any syntax errors.
2.  **Stat Extraction**: The parser reads the \\\`width\\\`, \\\`height\\\`, and \\\`viewBox\\\` attributes to determine the vector's native dimensions and aspect ratio. It also walks the DOM tree to count paths, shapes, and group elements.
3.  **Blob Generation**: The cleaned SVG document is converted to a string using \\\`XMLSerializer\\\`. This string is wrapped in a \\\`Blob\\\` object:
    \`\`\`javascript
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    \`\`\`
4.  **Rasterizing via Image Loading**: An offscreen HTML \\\`Image\\\` object is created, and its \\\`src\\\` is set to the generated Blob URL. The browser's graphics engine decodes the SVG code and draws it onto a virtual canvas.
5.  **Rendering on Canvas**: A <canvas> context is initialized. The dimensions are set to the target size (scaled to 1x, 2x, 4x, or custom overrides).
    *   If a background option (white, black, custom color) is selected, the canvas is filled.
    *   If transparency is selected, the canvas background remains clear.
6.  **Drawing**: The images are drawn onto the canvas:
    \`\`\`javascript
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    \`\`\`
7.  **PNG Compilation**: The canvas is serialized using \\\`canvas.toBlob()\\\` with the \\\`image/png\\\` MIME type, compressing the raw pixel data into local file bytes.

---

## 4. Resolution Sizing: Presets and DPI Math

One of the challenges when converting vector assets to raster graphics is choosing the target dimensions. Since SVGs are resolution-independent, they do not have a fixed pixel footprint. Our tool provides several resolution settings:

### Presets and Social Media Templates
To streamline asset creation, we include dimensions optimized for print and social media layouts:
*   **Favicon Dimensions**: 16x16, 32x32, 48x48, 128x128 pixels (common standard icons).
*   **App Icons**: 512x512 pixels (standard size for Google Play or App Store submissions).
*   **YouTube Channel Icon**: 800x800 pixels.
*   **Instagram Profile Photo**: 320x320 pixels.
*   **Twitter Profile Picture**: 400x400 pixels.

### The Math Behind Custom Scale Ratios
If you want to maintain the aspect ratio of the SVG while scaling up details, choose a scale multiplier.
Let \\(W_{orig}\\) and \\(H_{orig}\\) represent the native width and height declared in the SVG metadata, and \\(S\\) represent the scaling multiplier (e.g., 2, 4, 8). The target dimensions \\(W_{target}\\) and \\(H_{target}\\) are calculated as:

\\[W_{target} = W_{orig} \times S\\]
\\[H_{target} = H_{orig} \times S\\]

If the SVG lacks explicit \\\`width\\\` and \\\`height\\\` attributes but contains a \\\`viewBox\\\` attribute (e.g., \\\`viewBox=\"0 0 X Y\"\\\`), the values of \\(X\\) and \\(Y\\) are used as the original width and height:

\\[W_{target} = X \times S\\]
\\[H_{target} = Y \times S\\]

By scaling up the output dimensions before rasterization, you increase the pixel density of the target PNG, ensuring it remains sharp on high-DPI (Retina) screens.

---

## 5. Security, Metadata, and SVG Optimization

As XML files, SVGs can contain a large amount of non-visual markup. When converting to PNG or saving the vector code, optimization is essential.

### The Security Risks of SVG
Because SVGs are XML documents, they are subject to typical web vulnerabilities:
*   **Cross-Site Scripting (XSS)**: An SVG can contain inline JavaScript using the <script> tag. When displayed inside a browser, this script can run in the context of the host domain. Our parser disables script execution, ensuring secure rendering.
*   **External Resource Injection**: SVGs can import external image assets or fonts. Loading external URLs can track user IPs. Our tool loads all SVG files locally, blocking external assets that violate CORS or tracking policies.

### Cleaning Up Editor Metadata
Graphics software (like Adobe Illustrator or Inkscape) embeds large blocks of proprietary markup to help reload the file's editing state. This can include:
*   XML Comments detailing creation dates, authors, and software versions.
*   Special editor namespaces (e.g., \\\`xmlns:sodipodi\\\` or \\\`xmlns:inkscape\\\`).
*   Empty group containers (\\\`<g>\\\`) and unused ID references.
*   Visual grid configurations and coordinate snap lines.

These elements increase file sizes without adding any visual value. Our built-in SVG optimizer parses the DOM tree, stripping comments, editor attributes, metadata headers, and redundant IDs. This can reduce file sizes by up to 60%, leaving you with clean vector code.

---

## 6. How to Use the SVG to PNG Converter

To convert your vector files, follow these instructions:

### Step 1: Upload Vector Assets
*   **Drag and Drop**: Select one or more SVG files and drag them into the upload box.
*   **Pasted Code**: If you have inline SVG markup, paste it directly into the code window.
*   **URL Import**: Paste a web URL pointing to a remote SVG file to download it.

### Step 2: Configure Background and Canvas Sizing
*   **Background Style**: Choose transparency if you want transparent backgrounds, or fill with white, black, or custom colors.
*   **Output Resolution**: Choose a scaling multiplier (1x, 2x, 4x, 8x) or enter custom dimensions with the aspect ratio lock checked to maintain proportions.

### Step 3: Run Diagnostics and Optimize
*   Check the Developer Console to view element counts and optimize the vector markup.
*   Review the side-by-side preview window to inspect formatting, transparency grids, and paths.

### Step 4: Export png
*   Click the green **Download** button on a file's row to export it.
*   For batch lists, click **Download All (ZIP)** to compile all converted PNGs into a single ZIP file.
    `
};
