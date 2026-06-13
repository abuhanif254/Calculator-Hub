import { ToolConfig } from './types';

export const svgOptimizerToolConfig: ToolConfig = {
  slug: "svg-optimizer",
  title: "SVG Optimizer",
  shortDescription: "Compress, minify, and optimize SVG vector graphics entirely in-browser. Remove comments, clean up metadata, simplify path coordinates, and reduce asset sizes safely.",
  category: "Developer Tools",
  keywords: [
    "svg optimizer",
    "svg compressor",
    "svg minifier",
    "optimize svg",
    "compress svg online",
    "reduce svg file size",
    "svg cleanup",
    "svg performance optimization",
    "svg for web performance",
    "svg compression tool"
  ],
  features: [
    "Locally compress and minify SVG graphics entirely inside your browser (zero files uploaded)",
    "Four performance-focused presets: Safe, Standard, Aggressive, and Maximum Compression",
    "Clean metadata, XML namespaces, sodipodi nodes, and Adobe/Inkscape editor markup",
    "Decimal precision tuner (0 to 10 decimals) to round coordinates in SVG path d attributes",
    "Structural cleanup: remove empty groups, empty paths, unused definitions, and unused IDs",
    "Live side-by-side comparison, visual split-slider, and line-by-line diff inspector",
    "React/Next.js integration code converter translating SVG markup to TSX camelCase components",
    "Queue-based batch processing with automatic zip packaging using JSZip"
  ],
  useCases: [
    "Reducing SVG image file sizes to improve LCP (Largest Contentful Paint) and website load times",
    "Cleaning up exports from Adobe Illustrator, Figma, and Inkscape to strip editor metadata",
    "Converting static SVG files into optimized inline components for React and Next.js applications",
    "Preparing vector shapes for icons, animations, and responsive site layouts",
    "Batch-compressing asset folders for repositories and frontend asset libraries",
    "Validating transparency layers and shape coordinates of SVGs before embedding in codebases"
  ],
  howToSteps: [
    "Upload one or more SVG files by dragging and dropping them, pasting code, or clicking browse.",
    "Choose your preferred optimization preset (Safe, Standard, Aggressive, or Maximum).",
    "Fine-tune the Decimal Precision slider to find the perfect balance between file size and shape quality.",
    "Toggle structural cleanup settings like removing comments, metadata, and empty tags.",
    "Verify coordinate integrity using the synchronized zoom side-by-side or split-screen sliders.",
    "Review the XML diff to see removed elements and exact byte savings.",
    "Copy the optimized code, download the clean SVG, or export the entire batch queue as a ZIP file."
  ],
  relatedTools: [
    { name: "PNG to SVG", slug: "png-to-svg" },
    { name: "SVG to PNG", slug: "svg-to-png" },
    { name: "Favicon Generator", slug: "favicon-generator" },
    { name: "Compress Image", slug: "compress-image" },
    { name: "Image Converter", slug: "image-converter" },
    { name: "Resize Image", slug: "resize-image" }
  ],
  examples: [],
  faq: [
    {
      question: "What is SVG optimization?",
      answer: "SVG optimization is the process of cleaning up and minifying Scalable Vector Graphics markup. This involves stripping out comments, editor-specific metadata, unused styles, empty groups, and rounding path coordinate coordinates to reduce file size without losing visual quality."
    },
    {
      question: "Does SVG optimization reduce image quality?",
      answer: "No, as long as it is done with appropriate settings. The primary setting affecting visual quality is coordinate precision. Keeping a precision of 3 or 4 decimal places ensures coordinates remain visually identical to the original, while setting it to 1 or 0 may result in slight shape distortion."
    },
    {
      question: "How much can an SVG file be compressed?",
      answer: "Depending on how the SVG was created, compression rates can range from 30% to over 80%. SVGs exported from editor software like Illustrator or Figma usually contain significant metadata, namespaces, and high-precision coordinates that compress dramatically."
    },
    {
      question: "Is this SVG optimization process safe?",
      answer: "Yes. Our tool runs 100% locally in your web browser. No files are uploaded to any external servers, ensuring your designs, brand icons, and source codes remain completely private."
    },
    {
      question: "What is SVGO?",
      answer: "SVGO (SVG Optimizer) is a popular Node.js command-line tool for optimizing vector files. Our tool builds upon similar principles, translating and executing these rules directly in the browser's native engine to achieve similar optimization scores instantly."
    },
    {
      question: "Why should I optimize SVG files?",
      answer: "Optimizing SVG files reduces payload sizes, which leads to faster page load speeds, better Core Web Vitals (especially Largest Contentful Paint), lower bandwidth costs, and clean markup when embedding inline SVGs into codebases."
    },
    {
      question: "What is decimal precision in SVG optimization?",
      answer: "Decimal precision controls the number of digits kept after the decimal point for coordinate parameters in `<path d=\"...\">` and shape attributes. Reducing precision yields shorter numbers (e.g. from 123.45678 to 123.457), which significantly reduces file sizes."
    },
    {
      question: "Why does editor software export such large SVG files?",
      answer: "Vector editors (Illustrator, Inkscape, Sketch) embed metadata so that the file can be reopened with all editable configurations intact. This includes editor workspaces, grid alignments, private namespaces, and layer details that browsers ignore."
    },
    {
      question: "What is the difference between an inline SVG and a linked SVG?",
      answer: "An inline SVG is embedded directly into the HTML markup (`<svg>...</svg>`), which saves an HTTP request and allows CSS manipulation. A linked SVG is referenced using an `<img>` tag or CSS background, which enables browser caching but restricts CSS styling."
    },
    {
      question: "Can I convert optimized SVGs directly into React components?",
      answer: "Yes. Our tool features an integrated Developer Dashboard that converts optimized SVG markup into clean, camelCase React TSX components (e.g., changing `stroke-width` to `strokeWidth` and `fill-rule` to `fillRule`)."
    },
    {
      question: "Is there a limit on file size or quantity for uploads?",
      answer: "There are no hard limits, but we recommend uploads under 20MB to ensure smooth local browser execution. Our batch queue allows processing dozens of files concurrently."
    },
    {
      question: "Does this optimizer support SVG sprites?",
      answer: "Yes, our future-ready architecture supports exporting files in clean shapes ready for inclusion in consolidated SVG sprite sheets using `<symbol>` nodes."
    },
    {
      question: "What empty elements are removed during optimization?",
      answer: "The optimizer removes empty container tags like `<g></g>`, empty `<defs></defs>`, and paths that have empty or missing `d` coordinates, as they render nothing but consume DOM size."
    },
    {
      question: "How does group collapsing work?",
      answer: "Group collapsing merges redundant nested `<g>` tags. If a group has no attributes of its own or only attributes that can be inherited, we can collapse it and apply the styling attributes directly to its children, reducing DOM depth."
    },
    {
      question: "Will CSS styled SVGs break after optimization?",
      answer: "In 'Safe' mode, styling remains intact. In 'Aggressive' or 'Maximum' mode, we clean up unused inline classes and merge styles, so you should verify visual fidelity if your SVGs rely heavily on external style sheets."
    },
    {
      question: "What is SVG Zipping (SVGZ)?",
      answer: "SVGZ files are standard SVG files compressed using Gzip. The browser extracts and renders them natively. Our tool accepts SVGZ files and outputs optimized standard SVGs or minified codes."
    },
    {
      question: "Does this tool remove XML declarations?",
      answer: "Yes, XML declarations like `<?xml version=\"1.0\" encoding=\"utf-8\"?>` are optional in HTML5 contexts and are stripped during standard and aggressive optimizations to save bytes."
    },
    {
      question: "Why does the performance score change?",
      answer: "The performance score is calculated based on path coordinate minification, removal of metadata, and the ratio of file size reduction. High scores indicate very lean vectors."
    },
    {
      question: "What coordinates are rounded during path simplification?",
      answer: "Coordinates within path commands (M/m, L/l, H/h, V/v, C/c, S/s, Q/q, T/t, A/a) are parsed and rounded based on the decimal precision slider."
    },
    {
      question: "How do I use optimized SVGs in Next.js?",
      answer: "You can import optimized SVGs as static assets in Next.js, use them inside `next/image`, or copy the React code snippet from our dashboard to paste them directly as component functions."
    },
    {
      question: "Is there an offline mode for this SVG compressor?",
      answer: "Yes. Once the web page is fully loaded, all compression routines run completely client-side. You can disconnect your internet and continue optimizing files offline."
    },
    {
      question: "What are XML namespaces and why are they removed?",
      answer: "Namespaces (e.g., `xmlns:sodipodi` or `xmlns:inkscape`) tell parsing systems which program generated the vector. They are not needed for browser rendering and are stripped to optimize code."
    },
    {
      question: "Can I revert coordinates back to high precision?",
      answer: "Yes, you can adjust the precision slider back to a higher value (like 5 or 6) at any time, and click re-optimize to restore coordinate accuracy."
    },
    {
      question: "What are hidden elements?",
      answer: "Hidden elements are tags with attributes like `display=\"none\"` or `opacity=\"0\"`. Unless they are animated via script, they render nothing and are safely removed in standard optimization."
    },
    {
      question: "Why does the optimizer shorten HEX colors?",
      answer: "HEX colors like `#FFFFFF` can be shortened to 3 characters (`#FFF`). Colors like `#000000` can be written as `black` or `#000`. Shortening these values saves code characters."
    },
    {
      question: "How does the side-by-side zoom synchronization work?",
      answer: "Both containers share the exact same scale and translation matrix, so panning or zooming on either the original or optimized window pans the other symmetrically."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes, the interface is fully responsive and optimized for mobile browsers, tablets, and desktop workstations."
    },
    {
      question: "Can I optimize icons in bulk?",
      answer: "Yes, upload multiple files to the batch queue. They will process sequentially, and you can download the clean SVGs individually or packed in a single ZIP folder."
    },
    {
      question: "What structured data schemas are supported?",
      answer: "We output standard schema JSON structures including WebApplication, FAQPage, HowTo, and SoftwareApplication to help index the tool page on Google Search."
    },
    {
      question: "Does the tool support color conversion from RGB to HEX?",
      answer: "Yes, the minifier automatically detects styles or attributes defined as `rgb(...)` and translates them into shorter HEX strings."
    },
    {
      question: "What happens to text elements in the SVG?",
      answer: "Text elements `<text>` and `<tspan>` are preserved. In standard modes, spacing attributes are cleaned, but letter paths are kept unchanged to protect fonts."
    },
    {
      question: "Can I inspect XML differences before exporting?",
      answer: "Yes, the 'Code Markup Diff' panel displays a line-by-line comparison highlighting removed lines in red and optimized lines in green."
    },
    {
      question: "Why is Largest Contentful Paint (LCP) improved by SVG compression?",
      answer: "LCP measures when the main content of a page is loaded. Smaller SVG files download faster, meaning logos, icons, and hero graphics render earlier."
    },
    {
      question: "What are empty paths?",
      answer: "Empty paths are `<path>` tags with empty or absent coordinate attributes (`d=\"\"`). They do not draw anything and are safely deleted during cleanup."
    },
    {
      question: "Are external font stylesheets removed?",
      answer: "External styling stylesheets or `@import` rules inside `<style>` are kept in Safe mode, but can be stripped in Aggressive/Maximum mode if they are not active."
    },
    {
      question: "Does the SVG viewport change during compression?",
      answer: "No. The `viewBox` coordinates and overall height and width attributes are preserved, ensuring the vector retains its exact aspect ratios."
    },
    {
      question: "Does this tool support high contrast dark mode?",
      answer: "Yes, the workspace seamlessly switches styling to integrate with your system's light or dark mode themes."
    },
    {
      question: "What is SVG code minification?",
      answer: "Minification strips all formatting tabs, carriage returns, and spaces from the final XML file, condensing the SVG into a single, compact line of code."
    },
    {
      question: "Can I save my custom optimization presets?",
      answer: "Yes. You can save your favorite settings (precision, toggles) as custom presets to automatically apply them to future uploads."
    },
    {
      question: "How do I check for transparency problems?",
      answer: "Our visual preview displays SVGs against a checkerboard grid backdrop, making transparent areas immediately visible."
    },
    {
      question: "Does it support nested linear gradients?",
      answer: "Yes, definitions inside `<defs>` like linear gradients, radial gradients, and patterns are preserved if they are referenced by shape fills."
    },
    {
      question: "Can I edit the optimized SVG code directly?",
      answer: "Yes, our Code markup tab features an interactive code editor where you can tweak paths and see visual updates in real-time."
    },
    {
      question: "Is it possible to automate this tool using an API?",
      answer: "Our tool runs client-side in the browser. For CLI automation, we recommend using SVGO in your node development pipelines."
    },
    {
      question: "Why does the tool show a performance score?",
      answer: "The performance score rates your vector graphic's efficiency. Lower scores mean the SVG contains heavy markup; higher scores mean it is optimized for rendering."
    },
    {
      question: "Will inline scripts in the SVG be deleted?",
      answer: "Inline scripts `<script>` are removed in Aggressive and Maximum modes for security and optimization, but can be retained in Safe mode."
    },
    {
      question: "What is an XML declaration?",
      answer: "An XML declaration is a header line like `<?xml version=\"1.0\"?>`. It is redundant inside HTML pages and is stripped during standard minification."
    },
    {
      question: "Can I optimize SVGs for vinyl cutting or engraving?",
      answer: "Yes. Use 'Safe' or 'Standard' presets to optimize coordinates while keeping all path definitions and shape nodes completely intact."
    },
    {
      question: "How do I view removed tags?",
      answer: "You can click on the 'Code Markup Diff' tab to review the exact elements and attributes that were stripped during the optimization."
    },
    {
      question: "Why should I convert style attributes to CSS properties?",
      answer: "Converting style attributes (like `style=\"fill:red\"`) to presentation attributes (like `fill=\"red\"`) makes the SVG code shorter and easier to manage."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, our SVG Optimizer is 100% free with no limits on file sizes, batch quantities, or premium features."
    }
  ],
  longDescription: `
# SVG Optimizer: The Ultimate Developer Guide to Vector Graphic Compression and Optimization

Vector graphics have revolutionized web design. Scalable Vector Graphics (SVG) allow designers and developers to create crisp, resolution-independent icons, illustrations, and UI patterns that scale beautifully from tiny mobile screens to ultra-high-definition retina monitors. However, because SVGs are represented as raw XML code documents rather than fixed pixel grids, they can quickly balloon in file size. 

Unoptimized SVGs often contain thousands of redundant path coordinates, editor-specific metadata, unused styling selectors, and bloated layouts. To maintain an excellent Largest Contentful Paint (LCP) score and speed up page load speeds, optimizing your SVGs is an essential requirement.

This comprehensive guide explores how SVG optimization works, why file sizes grow, and how to use our browser-based SVG Compressor to clean and minify your vector assets safely.

---

## 1. What is an SVG File and Why Does it Need Optimization?

Unlike raster graphics (like PNG, JPG, or WEBP) which represent images as static grids of colored pixels, SVGs are XML documents. They define shapes, lines, curves, gradients, and texts using mathematical formulas.

For example, a simple circle in an SVG might look like this:
\`\`\`xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#ff0000" />
</svg>
\`\`\`

Because SVGs are written in text, modern browsers read and compile them into DOM elements inside the rendering tree. While this text-based structure offers flexibility, it also means that SVGs are prone to bloat. When you export an SVG from popular design software (such as Figma, Adobe Illustrator, or Sketch), the exporting engines embed numerous configuration namespaces and editor metadata:

*   **XML Declarations**: Declarations like \`<?xml version="1.0" encoding="utf-8"?>\` are added at the top. These are redundant when SVGs are embedded inline in HTML5 documents.
*   **Editor Metadata**: Private namespaces like \`xmlns:sodipodi\` or \`xmlns:inkscape\` along with tags like \`<metadata>\`, \`<sodipodi:namedview>\`, or \`<adobe:ns>\` are added. These elements are only useful if you plan to reopen the file in that specific design editor.
*   **High-Precision Coordinates**: Path attributes (\`d="M10.123456789... C20.987654321..."\`) are exported with up to 10 or 15 digits after the decimal point. The human eye cannot detect these sub-pixel differences, yet they consume significant byte space.
*   **Redundant Container Elements**: Extra nested groups (\`<g>\`) are created to maintain the layers panel of the design tool, complicating the DOM hierarchy.

Optimizing an SVG means removing these non-rendering characters and structural containers, resulting in smaller files that render faster.

---

## 2. Deep Dive: Key Optimization Rules

Our SVG Minifier applies several structural and mathematical passes to clean your vectors:

### 2.1 Metadata and Namespace Removal
We strip out namespaces, creator comments, editor settings, and layout tags. The browser only requires standard vector shape elements (\`<path>\`, \`<rect>\`, \`<circle>\`, \`<g>\`, etc.) to render the graphic. Removing this metadata typically reduces file sizes by 10% to 30% immediately.

### 2.2 Path Coordinate Precision Control
The coordinate precision is the single most effective setting for reducing vector sizes. A path coordinate represented as \`12.3456789\` can be rounded to \`12.346\` (3 decimals) or \`12.3\` (1 decimal). By parsing and rebuilding the \`d\` path commands, we truncate these numbers, which dramatically reduces the string length in files that contain hundreds of complex shapes.

### 2.3 Structural Cleanup
*   **Collapsing Redundant Groups**: If a group (\`<g>\`) contains only one child, or has no styles that cannot be moved to its children, we merge or delete the group.
*   **Removing Empty Containers**: Empty tags like \`<g></g>\`, \`<defs></defs>\`, and paths without coordinate attributes are deleted.
*   **Unused Definitions Cleanup**: Designers often create gradients, symbols, or patterns that are not utilized. Our engine scans definitions inside the \`<defs>\` block and removes any element that is not referenced by a shape fill or stroke.

### 2.4 Color Optimization
Colors inside SVGs are minified to their shortest representation:
*   Convert \`rgb(255, 255, 255)\` or \`rgba(255, 255, 255, 1)\` to \`#fff\`.
*   Convert full 6-digit HEX values like \`#ffcc00\` to their 3-digit shorthand \`#fc0\`.
*   Convert color names like \`#ff0000\` to standard shorter equivalents like \`red\`.

---

## 3. Core Web Vitals and SVG Performance

Google's Core Web Vitals measure user experience benchmarks like loading speed, interactivity, and visual stability. Optimizing SVGs has a direct impact on these metrics:

1.  **Largest Contentful Paint (LCP)**: If your hero graphic, site banner, or main logo is an unoptimized SVG, it can delay LCP. Compressing the SVG ensures it downloads and renders sooner.
2.  **Cumulative Layout Shift (CLS)**: Always specify a \`viewBox\` attribute. Our optimizer preserves this aspect ratio container to ensure that browser layouts remain stable while assets load.
3.  **DOM Node Count**: Large SVGs embedded inline add hundreds of nodes to the browser's DOM tree. Running standard group-collapsing reduces the overall DOM depth, improving memory and scroll performance.

---

## 4. How to Safely Optimize SVG Code for Production

To ensure your vector shapes remain intact, follow this simple production workflow:

1.  **Select standard presets**: Start with our **Standard** or **Safe** presets. These profiles preserve IDs, fonts, and stylesheets while cleaning metadata.
2.  **Verify precision visually**: Zoom in (up to 500%) on corners and fine curves in the side-by-side comparison screen. If lines look distorted, increase the decimal precision slider.
3.  **Check transparency**: Ensure your vector stands out against our checkerboard pattern overlay.
4.  **Minify final output**: Use the minified output format to strip whitespace for production code, or download the optimized SVG directly for asset folders.
`
};
