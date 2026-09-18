import { ToolConfig } from './types';

export const pngToPdfConfig: ToolConfig = {
  slug: "png-to-pdf",
  title: "Convert PNG to PDF | Merge Images into PDF Online",
  shortDescription: "Combine single or multiple PNG images into a clean, professional PDF document directly in your browser. Reorder pages with drag-and-drop, set custom margins, and maintain 100% privacy.",
  category: "PDF Tools",
  keywords: [
    "png to pdf", "convert png to pdf", "merge png into pdf", "image to pdf converter",
    "png to pdf online", "combine pngs into one pdf", "save png as pdf",
    "offline png to pdf", "client side png to pdf", "batch png to pdf",
    "lossless png to pdf", "merge photos to pdf document"
  ],

  longDescription: `
## Combine and Convert PNG Images into Standardized PDF Documents

The PNG (Portable Network Graphics) format is celebrated across digital design, software development, and administrative workflows for its lossless compression, pixel-perfect sharp edges, and transparent background capabilities. It is the premier choice for UI mockups, system architecture diagrams, scanned certificates, and legal receipts.

However, when you need to distribute an expense claim, submit a multi-page job application portfolio, or present a series of wireframes to an executive board, sending a chaotic flurry of disconnected \`.png\` files via email or messaging platforms looks disorganized and creates recipient friction. Images arrive out of order, open in different default viewers, and frequently distort when sent to physical desktop printers.

Our **PNG to PDF Converter** resolves this challenge, seamlessly binding one or dozens of PNG files into a clean, unified, and professionally structured PDF document directly in your web browser. Featuring interactive drag-and-drop page reordering, margin presets, and adaptive orientation modes, you can compile print-ready documents in seconds without risking data privacy.

---

### Architectural Comparison: Image-to-Document Packaging Methods

Consolidating raster images into shared documents can be handled through multiple technologies, each presenting critical tradeoffs in quality, speed, and security:

| Packaging Approach | Direct In-Browser Engine (Our Tool) | Native OS Print-to-PDF | Cloud-Based Conversion APIs | Office Suites (Word / Docs) |
| :--- | :--- | :--- | :--- | :--- |
| **Fidelity Preservation** | **100% Lossless**; preserves exact pixel data | Moderate; often re-samples images | Variable; often applies lossy JPEG | Variable; compresses images by default |
| **Alpha Transparency Handling** | Clean white matte normalization | Often defaults to dark gray or black | Inconsistent alpha handling | Composited on white document page |
| **Page Ordering & Sequencing** | Interactive drag-and-drop thumbnail grid | Rigid; manual file numbering needed | Rigid; file upload order | Manual image dragging per page |
| **Data Privacy & Uploads** | **Zero uploads**; 100% local device memory | 100% local | Uploads private images to cloud | Local desktop or cloud (Docs/365) |
| **Mixed Orientation Support** | Adaptive per-page orientation (Portrait/Landscape) | Uniform single orientation | Uniform or manual flags | Manual section break insertion |
| **Cross-Platform Consistency** | Identical output across all browsers | Differs across Windows, macOS, Linux | Dependent on API provider | Requires software licenses |

---

### The Engineering Pipeline: How In-Browser PNG to PDF Compilation Works

Unlike simple converter scripts that blindly decode and re-compress PNG images into lossy JPEGs (causing fuzzy text and blurred lines), our browser-based engine uses a precision PDF compilation pipeline powered by modern WebAssembly and \`pdf-lib\`:

1. **Header Inspection & Metadata Parsing**: When PNG files are dropped into the converter, the engine reads the binary IHDR chunks to extract exact pixel dimensions, bit depth, and color type (Grayscale, Truecolor, Indexed, or RGBA with alpha channel).
2. **Interactive Drag-and-Drop Sequencing**: Users can rearrange pages on an interactive visual grid, rotate oriented scans by 90-degree increments, and discard accidental duplicates before triggering final document compilation.
3. **Aspect Ratio Preservation & Page Geometry Calculation**:
   - **Fit to Standard Paper (A4 / US Letter)**: The engine calculates the aspect ratio of each image against the printable area of the target sheet, scaling proportionally so no content is stretched, cropped, or clipped.
   - **Fit to Natural Image Size**: The engine dynamically configures the PDF's internal \`/MediaBox\` for each page to match the exact mathematical pixel dimensions of the source PNG, ideal for digital art portfolios and wide infographics.
4. **Alpha Channel & White Matte Normalization**: Because physical paper is opaque white, transparent areas in PNG graphics can cause rendering bugs in legacy PDF readers. Our compiler composites transparent pixels against a clean solid white base layer (\`#FFFFFF\`) before writing the image dictionary.
5. **Direct XObject Stream Embedding**: The raster bitmap stream is compressed using the PDF standard \`/FlateDecode\` filter and encapsulated into a high-level PDF \`/XObject\` image dictionary. Pages, cross-reference tables (XRef), and catalog dictionaries are assembled and exported as a valid, standard PDF binary.

---

### In-Depth Troubleshooting Guide for PNG to PDF Conversion

Merging diverse images into a unified document can occasionally present layout and file size quirks. Here is how our engine resolves common issues:

#### 1. Managing Very Large Output PDF File Sizes
Because PNG is a lossless format, packaging twenty 12-megapixel PNG screenshots into a single document can produce a PDF exceeding 50 MB.
- **Solution**: If the document is intended strictly for email submission or web viewing, toggle the **Smart Web Optimization** preset. This downsamples high-density scans to 150 DPI while preserving razor-sharp text readability, reducing file sizes by up to 70% without visible quality loss.

#### 2. Handling Mixed Portrait and Landscape Images
Combining portrait phone photos of receipts with landscape architectural schematics often leads to awkward letterboxing or cutoffs.
- **Solution**: Select the **Adaptive Orientation** mode. The converter analyzes each image independently, generating portrait pages for vertical images and landscape pages for wide graphics, ensuring every image fills its sheet naturally.

#### 3. Eliminating Awkward Margins and Uneven White Borders
When images have varying aspect ratios, standard margins can create uneven white spacing along the edges.
- **Solution**: Choose **No Margins (Full Bleed)** to let the image expand to the absolute edge of the page, or select **Uniform Margins (10mm)** to enforce a consistent frame around every slide and document.

#### 4. Correcting Upside-Down or Sideways Scans
Phone scans often retain orientation flags that some viewers fail to parse, resulting in sideways pages.
- **Solution**: Use the rotation icon on any thumbnail in the interactive grid to rotate the image 90, 180, or 270 degrees before compiling the final PDF.

---

### Enterprise Compliance & The Zero-Upload Privacy Guarantee

Expense receipts containing corporate credit card digits, scanned passports and identity badges, confidential medical invoices, and proprietary design wireframes must never be exposed to external cloud databases.

Our PNG to PDF Converter enforces a strict **Zero-Upload Privacy Architecture**:
- **100% In-Browser Computation**: File reading, image embedding, page layout, and PDF compilation take place exclusively within your device's local memory.
- **Zero Remote Storage**: Your images never leave your computer, are never transmitted over external networks, and are never saved on remote servers.
- **Complete Regulatory Compliance**: Fully adheres to strict corporate data protection standards, including GDPR, HIPAA, CCPA, and enterprise Non-Disclosure Agreements (NDAs).
`,

  features: [
    "100% Client-Side Privacy: Your images are never uploaded to any remote server or third-party host",
    "Lossless Graphic Precision: Embeds PNG files directly into PDF streams without lossy compression noise",
    "Interactive Drag-and-Drop Sequencing: Easily reorder, rotate, or remove pages before compilation",
    "Adaptive Page Orientation: Automatically matches page orientation (Portrait or Landscape) to each image",
    "Standard Paper Sizes: Supports international A4, North American US Letter, Legal, and Natural Image sizing",
    "Custom Margin Controls: Choose between No Margins (Full Bleed), Narrow Margins, or Standard Office Margins",
    "Clean White Matte Normalization: Composites transparent PNG layers over clean white paper backgrounds",
    "Fast Multi-Image Processing: Merge dozens of high-resolution images in seconds directly on your device"
  ],

  useCases: [
    "UI/UX designers compiling app screen mockups, wireframes, and branding assets into client presentation decks",
    "Employees consolidating multiple receipt screenshots and expense photos into a single monthly reimbursement claim",
    "Students organizing whiteboard lecture photos, textbook diagrams, and study notes into a printable study guide",
    "Job applicants merging certificates, diplomas, reference letters, and identification into one cohesive dossier",
    "Real estate brokers and surveyors assembling property photographs, floor plans, and site maps into a client booklet",
    "Contractors and engineers compiling project progress photos and site inspection images into formal audit reports"
  ],

  howToSteps: [
    "Select or drag-and-drop your PNG image files into the converter dropzone.",
    "Drag the image thumbnails to arrange your pages into the exact desired sequence.",
    "Use the rotation button on any thumbnail to correct sideways or inverted images.",
    "Choose your page size (A4, US Letter, or Fit to Image) and configure your preferred margin spacing.",
    "Click 'Create PDF' to compile all images into a unified, high-resolution document.",
    "Save the generated PDF file directly to your local computer without waiting for server processing."
  ],

  examples: [
    {
      title: "Monthly Expense Reimbursement Claim",
      description: "Merging 8 PNG receipts and hotel invoices into an organized A4 PDF document for accounting.",
      input: "receipt-01.png through receipt-08.png (Total 7.2 MB)",
      output: "august-travel-expenses.pdf (8 pages, centered with neat 10mm margins, ready for payroll approval)"
    },
    {
      title: "Mobile App Wireframe Presentation",
      description: "Combining 14 high-resolution mobile UI mockups into an adaptive landscape PDF presentation.",
      input: "wireframe-screen-01.png through 14.png",
      output: "mobile-banking-wireframes.pdf (14 pages, lossless pixel clarity, natural aspect ratio)"
    },
    {
      title: "Professional Certification Dossier",
      description: "Merging scanned educational diplomas and professional accreditation certificates into one file.",
      input: "degree-certificate.png, pmp-certification.png, aws-badge.png",
      output: "professional-credentials.pdf (3 pages, uniform A4 size, crisp text and vector seals)"
    }
  ],

  relatedTools: [
    { name: "PDF to PNG", slug: "pdf-to-png" },
    { name: "JPG to PDF", slug: "jpg-to-pdf" },
    { name: "PDF to JPG", slug: "pdf-to-jpg" },
    { name: "Compress PDF", slug: "compress-pdf" }
  ],

  faq: [
    {
      question: "Are my images uploaded to any cloud server during conversion?",
      answer: "No. The entire conversion and PDF compilation pipeline executes 100% locally inside your web browser using client-side JavaScript. Your images never leave your computer."
    },
    {
      question: "Will converting PNG to PDF reduce image sharpness or quality?",
      answer: "No. Our converter embeds PNG image streams directly into the PDF structure without applying lossy compression, preserving 100% of the original sharpness, text clarity, and color accuracy."
    },
    {
      question: "Can I rearrange the order of pages before creating the PDF?",
      answer: "Yes. Simply drag and drop the image thumbnail cards in the visual grid to organize them into your preferred sequence before clicking the convert button."
    },
    {
      question: "What happens to transparent areas in my PNG images?",
      answer: "Because standard printed paper is white, transparent pixels are automatically composited over a solid white backdrop, preventing black voids or display errors in older PDF viewers."
    },
    {
      question: "Can I combine both portrait and landscape images in the same document?",
      answer: "Yes. By selecting the 'Adaptive Orientation' option, each page will automatically match the orientation of its respective image, ensuring that wide images remain landscape and tall images stay portrait."
    },
    {
      question: "What paper size options are available?",
      answer: "You can select international A4, North American US Letter, Legal format, or choose 'Fit to Image' which sizes each page to match the exact mathematical dimensions of your source image."
    },
    {
      question: "Can I rotate individual images that were scanned sideways?",
      answer: "Yes. Each image thumbnail includes a rotation control that lets you turn the image 90 degrees clockwise until it is oriented correctly."
    },
    {
      question: "Is there a limit on how many PNG files I can merge?",
      answer: "You can merge dozens of images in a single session. Because processing runs in your local browser memory, capacity depends on your device's available RAM."
    },
    {
      question: "How do margins work in the output PDF?",
      answer: "You can choose 'No Margins' for full-bleed edge-to-edge images, 'Narrow Margins' (5mm) for a compact frame, or 'Standard Margins' (15mm) for formal corporate printing."
    },
    {
      question: "Why is the resulting PDF file size similar to the sum of my PNG images?",
      answer: "Because our tool preserves lossless fidelity without degrading your images, the resulting PDF file size naturally mirrors the total size of your source PNG files."
    },
    {
      question: "Does this tool work offline without an active internet connection?",
      answer: "Yes. Once the page is loaded in your browser, all image parsing and PDF generation happen entirely offline without requiring internet access."
    },
    {
      question: "Can I merge JPG and PNG images together?",
      answer: "Yes. The uploader accepts both PNG and JPG image files simultaneously, allowing you to combine mixed format screenshots and camera photos into a single PDF."
    }
  ]
};
