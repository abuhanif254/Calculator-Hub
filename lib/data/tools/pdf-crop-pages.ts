import { ToolConfig } from './types';

export const pdfCropPagesConfig: ToolConfig = {
  slug: "pdf-crop-pages",
  title: "PDF Crop Pages",
  shortDescription: "Crop page margins, remove white space, trim scanned borders, and crop selected pages in a PDF document. Process everything locally in your browser.",
  category: "PDF Tools",
  keywords: [
    "PDF Crop Pages", "Crop PDF", "PDF Margin Remover", "PDF Page Cropper", "Trim PDF Pages",
    "PDF White Space Remover", "remove margins from pdf", "crop pdf pages online", "crop pdf tool free",
    "trim pdf edges", "auto crop pdf", "crop pdf selected pages", "crop scanned pdf margins", "pdf crop box editor"
  ],

  longDescription: `
## The Ultimate Guide to PDF Page Geometry, Coordinate Systems, and Margins Cropping

When editing documents, formatting layout and adjusting margins is a critical step in finalizing files for publishing, printing, and sharing. While word processors make it easy to change margins, editing page boundaries in a Portable Document Format (PDF) file requires specialized tools. The Portable Document Format is designed to freeze layout information, preventing content from shifting across different devices. 

To crop a PDF page, an editor must manipulate the low-level geometric boundaries defined in the PDF standard (ISO 32000). Rather than altering the underlying visual elements, cropping adjusts the visible viewports of the document's structure.

This comprehensive guide covers PDF page boundary systems, coordinate mathematics, client-side auto-detection algorithms, margins cropping, security implications, and best practices for managing PDF page dimensions.

---

## 1. The Geometry of a PDF Page: Understanding the Five Page Boundaries

Under the ISO 32000-1 specifications, a PDF page is not a simple canvas with a single width and height. Instead, every page is defined by up to five nested bounding boxes, known as **Page Boundaries** or **Page Boxes**. Each boundary serves a specific purpose in document display, printing, and trimming:

\`\`\`mermaid
graph TD
    MediaBox[MediaBox: Physical Page Dimensions] --> CropBox[CropBox: Visible Area in PDF Viewers]
    CropBox --> BleedBox[BleedBox: Safety Margin for Printing]
    BleedBox --> TrimBox[TrimBox: Final Trimmed Page Dimensions]
    TrimBox --> ArtBox[ArtBox: Meaningful Content Bounding Box]
\`\`\`

### The MediaBox
The **MediaBox** defines the physical boundaries of the medium on which the page is to be displayed or printed. For example, in a standard US Letter document, the MediaBox is set to 612 by 792 points (8.5 by 11 inches). Every page must contain a MediaBox definition. If other boxes are not defined, they inherit their values from the MediaBox by default.

### The CropBox
The **CropBox** defines the region of the page that is displayed in PDF readers, web browsers, and print previews. When you open a PDF file in Adobe Acrobat or Google Chrome, the viewer hides anything outside the CropBox. When cropping a PDF, setting or modifying the CropBox is the primary way to adjust the visible page area.

### The BleedBox
The **BleedBox** (introduced in PDF 1.3) defines the region to which all page content should be clipped when the document is printed in a professional production environment. This includes extra space around the edges for colors and images to bleed over the page boundaries, ensuring no white margins remain after trimming.

### The TrimBox
The **TrimBox** (introduced in PDF 1.3) defines the final, physical dimensions of the page after printing and trimming. It represents the actual size of the finished product, such as a book page, leaflet, or business card.

### The ArtBox
The **ArtBox** (introduced in PDF 1.3) defines the boundaries of the page's meaningful content, such as text columns or illustrations. It is used by design programs to place PDF files inside other layouts.

### How Boundary Inheritance Works
In the PDF file structure, these boxes are defined as arrays of four numbers representing coordinates \`[lower-left x, lower-left y, upper-right x, upper-right y]\`. 

If a box is omitted from the page dictionary, the PDF specification dictates the following fallback inheritance hierarchy:
| Target Box | Fallback Parent |
|---|---|
| **CropBox** | MediaBox |
| **BleedBox** | CropBox |
| **TrimBox** | CropBox |
| **ArtBox** | CropBox |

---

## 2. The PDF Coordinate System: Bottom-Left Origins and Scaling Mathematics

To crop pages accurately, you must understand the PDF coordinate system. Unlike standard web browsers and design programs that place the origin \`(0, 0)\` at the top-left corner, PDF document space places the coordinate origin \`(0, 0)\` at the **bottom-left corner** of the page.

\`\`\`text
(0, Height) [Top-Left] ────────────────────────── (Width, Height) [Top-Right]
                       │                          │
                       │                          │
                       │                          │
                       │                          │
                       │                          │
                       │                          │
                       │                          │
(0, 0) [Bottom-Left]   ────────────────────────── (Width, 0) [Bottom-Right]
\`\`\`

### PDF Measurement Units: Points
Under the PDF standard, all coordinates are expressed in **points**. The default user space unit is defined as exactly **1/72 of an inch**. 

To convert points to other units, you can use the following conversions:
- **1 inch** = 72 points
- **1 millimeter** = 2.8346 points (72 / 25.4)
- **1 centimeter** = 28.346 points
- **1 pixel (at standard 96 DPI)** = 0.75 points (72 / 96)

### The Mathematics of Margin Cropping
When you crop a page by applying margins (Top, Bottom, Left, and Right), you calculate new coordinates for the CropBox. 

Let the original page size be defined by \`[0, 0, Width, Height]\`. If a user wants to apply margins \`L\` (Left), \`R\` (Right), \`T\` (Top), and \`B\` (Bottom), the new CropBox coordinates are calculated as follows:

$$\text{New } X_1 = L$$
$$\text{New } Y_1 = B$$
$$\text{New } X_2 = \text{Width} - R$$
$$\text{New } Y_2 = \text{Height} - T$$

Thus, the cropped boundary array is represented as:

$$\text{CropBox} = [L, B, \text{Width} - R, \text{Height} - T]$$

If the resulting width ($X_2 - X_1$) or height ($Y_2 - Y_1$) is zero or negative, the crop coordinates are invalid and the edit is rejected.

---

## 3. Scanned PDF Crop Hazards: Scanner Artifacts and Auto Margin Detection

Scanned documents present unique challenges for cropping. Unlike digital PDFs with clean vector shapes, scanned pages are large images. This introduces visual noise, black borders, and alignment issues.

### The Problem of Scanner Artifacts
When paper documents are scanned into PDF files, they often contain:
- **Black Borders**: Dark shadows around the edges caused by the scanner lid being open or misaligned.
- **Skewed Angles**: Pages scanned at slight angles, creating irregular white triangles on the borders.
- **Binding Shadows**: Dark streaks running down the center or sides of pages from book spines.

If a tool crops the page without accounting for scanner artifacts, the output may cut off text or leave unsightly dark borders on the edges.

### How Client-Side Auto Margin Detection Works
To detect and crop margins automatically, a professional crop engine analyzes the page's pixels:

\`\`\`text
[Step 1] Render Page to Offscreen Canvas (PDF.js)
                      │
                      ▼
[Step 2] Retrieve ImageData (Uint8ClampedArray)
                      │
                      ▼
[Step 3] Scan Rows/Columns from Edges inwards (White Check)
                      │
                      ▼
[Step 4] Locate Content Bounding Box [minX, minY, maxX, maxY]
                      │
                      ▼
[Step 5] Apply Suggestion Coordinates to CropBox Overlay
\`\`\`

1. **Render page to canvas**: The engine renders the page onto a temporary canvas at a standard resolution (typically 150 DPI) using \`pdfjs-dist\`.
2. **Access pixel array**: The tool retrieves the pixel values using \`canvasContext.getImageData(0, 0, width, height)\`. This returns a one-dimensional array of RGBA color values.
3. **Scan edges inwards**: The algorithm scans columns from left-to-right, right-to-left, and rows from top-to-bottom, bottom-to-top:
   - For each pixel, it checks if it is close to white: $R > 248$, $G > 248$, and $B > 248$.
   - It also checks for black scanner artifacts: $R < 25$, $G < 25$, and $B < 25$.
4. **Identify content box**: The scan stops when it hits a row or column containing non-background color (e.g. text or images). This defines the boundaries of the actual page content.
5. **Adjust crop suggestion**: The tool adds a small safety buffer (e.g., 10 points) around the content box to prevent clipping descenders or headers.

---

## 4. Privacy, Compliance, and Zero-Trust Execution

Document cropping is common in legal, financial, and healthcare workflows. However, uploading documents to online servers for processing introduces significant security risks:

### The Risks of Server-Side Processing
1. **PII Exposure**: PDFs often contain personally identifiable information (PII), such as names, social security numbers, and medical histories. Uploading these files to remote servers violates data privacy regulations.
2. **Regulatory Compliances**: Corporate security policies and compliance frameworks (like GDPR, HIPAA, and CCPA) restrict uploading sensitive files to third-party services.
3. **Data Retention**: Many cloud-based PDF tools store documents in temporary storage buckets. If these buckets are misconfigured, your sensitive files could be exposed to the public.

### The Zero-Trust Client-Side Solution
Our **PDF Crop Pages** tool utilizes client-side web technologies (\`pdf-lib\` and \`pdfjs-dist\`) to process everything locally in your browser:
- **No File Uploads**: Your files are loaded from your hard drive directly into the browser's sandbox memory.
- **Instant Processing**: Because there are no upload or download queues, cropping operations finish in milliseconds.
- **Offline Mode**: The tool works completely offline. Once loaded, you can disconnect from the internet and continue cropping files.

---

## 5. Crop Modes and Multi-Page Targeting Options

Different workflows require different cropping options. A professional tool must support multiple modes and targeting settings:

### Crop Modes
1. **Manual Crop**: The user draws a crop box over a page. They can drag the corners to resize it and move the box to position it.
2. **Auto Crop**: The system scans the page and suggests crop boundaries by automatically removing empty white borders and black scanner artifacts.
3. **Uniform Crop**: The user crops one page, and the same dimensions are applied to all other pages in the document.

### Multi-Page Targeting Options
To handle large documents efficiently, you must be able to target specific pages:
- **All Pages**: Applies the crop settings to every page in the PDF.
- **Selected Pages**: Applies the crop only to pages selected in the grid preview.
- **Odd / Even Pages**: Applies the crop only to odd or even pages. This is ideal for double-sided books where the left and right margins alternate on opposite pages.
- **Custom Page Range**: Applies the crop to a comma-separated list of ranges (e.g., \`1-10, 15, 20-30\`).

---

## Summary of PDF Page Cropping Best Practices
- **Verify with Previews**: Always check page previews after applying crop settings to make sure no content is cut off.
- **Use the Right Units**: Use millimeters (mm) for printed sheets, points (pt) for digital documents, and pixels (px) for web layouts.
- **Check Document Metadata**: Make sure cropping does not delete important file metadata or document outlines.
- **Prioritize Client-Side Safety**: Protect sensitive corporate data by using client-side tools that process files locally.
`,

  faq: [
    {
      question: "How do I crop a PDF page?",
      answer: "Upload your PDF file, draw a crop box over the page preview, adjust the margins using the handles, select which pages you want to apply the crop to, and click 'Crop PDF' to save and download the cropped file."
    },
    {
      question: "Can I remove margins from a PDF?",
      answer: "Yes. The tool allows you to trim the white margins off all four sides of a PDF page. You can adjust the margins manually or use the 'Auto Crop' button to detect and remove them automatically."
    },
    {
      question: "Can I crop all pages in a PDF at once?",
      answer: "Yes. By selecting the 'All Pages' target option, the crop box dimensions you set will be applied to every page in the document."
    },
    {
      question: "Is this PDF Page Cropper tool free?",
      answer: "Yes. The tool is 100% free with no registration requirements, premium subscriptions, file size limits, or watermarks."
    },
    {
      question: "Are my PDF files secure and private?",
      answer: "Yes. This tool runs entirely in your web browser. Your files are processed locally on your device and are never uploaded to any remote servers, ensuring complete privacy."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes. The user interface is fully responsive, allowing you to crop pages and adjust margins on mobile phones, tablets, and desktop computers."
    },
    {
      question: "Can I crop scanned PDFs?",
      answer: "Yes. The tool renders scanned pages as images and allows you to crop them. The 'Auto Crop' feature can also detect and remove dark scanner artifacts on scanned edges."
    },
    {
      question: "Will the image quality be affected after cropping?",
      answer: "No. The tool changes the page's CropBox boundaries without re-compressing or altering the images or text inside the document, preserving the original quality."
    },
    {
      question: "Can I undo or redo crop adjustments?",
      answer: "Yes. The editor features an undo and redo history stack. You can use the toolbar buttons or press 'Ctrl + Z' to undo and 'Ctrl + Y' to redo your changes."
    },
    {
      question: "Can I crop only selected pages?",
      answer: "Yes. You can select specific pages in the grid preview, apply the crop settings only to those pages, and leave the other pages unchanged."
    },
    {
      question: "What is a CropBox in PDF coordinates?",
      answer: "The CropBox defines the visible region of a page displayed in PDF readers. Content outside the CropBox is hidden but remains in the file structure."
    },
    {
      question: "What is the difference between CropBox and MediaBox?",
      answer: "The MediaBox defines the physical page size (e.g. US Letter or A4). The CropBox defines the visible area of the page. Cropping typically adjusts the CropBox while keeping the MediaBox intact."
    },
    {
      question: "Can I crop odd and even pages differently?",
      answer: "Yes. You can choose to apply a crop only to odd pages, and then set a different crop for even pages. This is useful for double-sided book layouts."
    },
    {
      question: "Can I enter margin dimensions manually?",
      answer: "Yes. You can input exact margin values for the Top, Bottom, Left, and Right edges using the sidebar control panel."
    },
    {
      question: "What units of measurement are supported?",
      answer: "The tool supports Points (pt, the native PDF measurement), Millimeters (mm), and Pixels (px)."
    },
    {
      question: "How do I use keyboard shortcuts in this tool?",
      answer: "You can use 'Ctrl + Z' to undo, 'Ctrl + Y' to redo, 'Ctrl + S' to download the cropped PDF, and the 'Arrow Keys' to adjust the crop box coordinates in 1-point increments."
    },
    {
      question: "Does cropping reduce the PDF file size?",
      answer: "Cropping can slightly reduce file size by removing empty page areas, but because it hides content rather than deleting it from the file structure, the size reduction is usually minimal."
    },
    {
      question: "How do I crop multiple PDFs at once?",
      answer: "You can upload multiple files into the uploader. The crop settings you define will be applied to all uploaded documents, which you can then download in a single ZIP file."
    },
    {
      question: "Can I save my crop settings as a template?",
      answer: "Yes. You can save your margin settings as custom presets in your browser's LocalStorage, allowing you to quickly apply them to future files."
    },
    {
      question: "What happens if my PDF is password-protected?",
      answer: "The tool will prompt you to enter the password. Once decrypted locally in your browser, the page previews will be generated and you can proceed with cropping."
    },
    {
      question: "Can I restore cropped content later?",
      answer: "Once you download the cropped PDF, the hidden content remains in the file structure. You can open the PDF in an editor and reset the CropBox to restore the hidden areas."
    },
    {
      question: "Is there a page count limit?",
      answer: "No. The client-side engine can process documents containing hundreds of pages. Large files are handled efficiently using lazy rendering for page thumbnails."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes. Once the web page is fully loaded in your browser, the entire cropping engine runs locally, allowing you to use it without an internet connection."
    },
    {
      question: "Will the PDF hyperlinks remain active after cropping?",
      answer: "Yes. All hyperlinks, bookmarks, annotations, and interactive form fields are preserved, though their active click areas will adjust to match the cropped page boundaries."
    },
    {
      question: "Why does my cropped PDF look unchanged in some programs?",
      answer: "Some basic PDF viewers ignore the CropBox and display the entire MediaBox. If this happens, you can crop both the MediaBox and CropBox in our tool's advanced settings."
    },
    {
      question: "How does 'Auto Crop' detect margins?",
      answer: "It renders the page to an offscreen canvas and scans the pixel colors from the edges inward. It identifies where the white margins end and the content begins, suggesting crop boundaries automatically."
    },
    {
      question: "Does the tool support PDF/A compliance?",
      answer: "Yes. The tool updates the page boundaries without altering the underlying structures, maintaining PDF/A archiving standards."
    },
    {
      question: "Can I crop pages to fit standard sizes like A4 or Letter?",
      answer: "Yes. You can choose from standard size presets (A4, US Letter, A3, Legal) in the sidebar menu to crop your pages to exact dimensions."
    },
    {
      question: "What is the minimum margin I can set?",
      answer: "You can set margins to 0, which keeps the original page edges. The tool prevents setting margins that would reduce the page size to 0 or negative values."
    },
    {
      question: "Can I remove black borders from scanned pages?",
      answer: "Yes. The 'Auto Crop' algorithm is designed to detect and remove both white margins and dark scanner shadows on page edges."
    },
    {
      question: "Are my document password and decrypted data sent to your servers?",
      answer: "No. The password decryption process is executed entirely client-side using WebAssembly or local JavaScript libraries, keeping your credentials secure."
    },
    {
      question: "Does this tool support standard page rotations?",
      answer: "Yes. The crop overlay adjusts automatically to accommodate landscape, portrait, and rotated page orientations."
    },
    {
      question: "How long are my files kept in memory?",
      answer: "Files are stored in the browser's temporary memory while the tab is active. They are deleted immediately when you close the tab or click 'Remove PDF'."
    },
    {
      question: "Is there a limit to how many files I can upload?",
      answer: "There are no server-imposed file limits. The number of files you can process is limited only by your device's available memory."
    },
    {
      question: "Why should I use this tool instead of Adobe Acrobat?",
      answer: "Acrobat requires a paid subscription and desktop software installation. Our tool is free, requires no setup, and processes files locally in your browser with the same level of security and privacy."
    }
  ],

  relatedTools: [
    { name: "PDF Extract Pages", slug: "pdf-extract-pages" },
    { name: "Organize PDF", slug: "organize-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Watermark PDF", slug: "watermark-pdf" },
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Unlock PDF", slug: "unlock-pdf" }
  ],

  features: [
    "100% secure client-side browser execution—no file uploads",
    "Interactive crop editor with draggable box overlays",
    "Auto-crop margin detection removing white margins and scanner artifacts",
    "Precise numeric margin trims in Points, Millimeters, or Pixels",
    "Target specific pages: All, Selected, Odd, Even, or custom ranges",
    "Grid and Single Page preview views with lazy rendering",
    "Unlimited Undo / Redo history state stack",
    "Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+S, Arrow keys)",
    "LocalStorage saved margin presets and recent file history",
    "High-fidelity exports preserving original layouts and text searchability"
  ],

  useCases: [
    "Remove large empty margins from an academic PDF to make it readable on e-readers",
    "Trim dark scanner borders and artifacts from scanned paper documents",
    "Crop a multi-page PDF presentation to fit widescreen 16:9 layouts",
    "Apply uniform margins to contract documents for clean print binds",
    "Isolate specific columns or diagram details from large map sheets",
    "Batch-crop document packages using saved margin presets"
  ],

  howToSteps: [
    "Select or drag and drop your PDF file into the upload area.",
    "Choose between Grid View and Single Page View to inspect your document.",
    "Draw and resize the crop box overlay, or click 'Auto Detect' to find margins.",
    "Fine-tune the margin coordinates in Points, Millimeters, or Pixels in the sidebar.",
    "Select the pages to apply the crop to (e.g. All, Odd, or a custom range).",
    "Click 'Crop PDF' to process the pages locally and download the cropped file."
  ],

  examples: [
    {
      title: "Trimming White Space",
      description: "Remove excessive white margins from an academic paper.",
      input: "Upload: paper.pdf (12 pages)\nMode: Auto Crop\nTarget: All Pages",
      output: "paper_cropped.pdf (12 pages: text content fits tightly to page margins)"
    },
    {
      title: "Cropping Scanner Artifacts",
      description: "Trim dark shadows and binding marks from a scanned page archive.",
      input: "Upload: archive.pdf (50 pages)\nMode: Manual Crop (Top: 20pt, Bottom: 20pt, Left: 35pt, Right: 35pt)\nTarget: All Pages",
      output: "archive_cropped.pdf (50 pages: visual scanner border shadows completely removed)"
    }
  ]
};
