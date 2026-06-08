import { ToolConfig } from './types';

export const wordToPdfConfig: ToolConfig = {
  slug: "word-to-pdf",
  title: "Word to PDF",
  shortDescription: "Convert Microsoft Word documents (DOCX, DOC) to high-quality PDF files online. Preserves fonts, layouts, images, and tables. Processed 100% locally in your browser.",
  category: "PDF Tools",
  keywords: [
    "Word to PDF", "Convert Word to PDF", "DOCX to PDF", "DOC to PDF", "Word Document Converter",
    "Word PDF Converter", "Document Conversion", "Office Documents", "PDF Publishing",
    "Online PDF Converter", "Productivity Tools", "convert docx to pdf free", "docx to pdf converter"
  ],
  longDescription: `
# The Comprehensive Guide to Word to PDF Document Conversion: File Formats, Rendering Engines, and Page Layout Standards

Converting a reflowable word processor document, such as a Microsoft Word DOCX or legacy binary DOC file, into a fixed-layout Portable Document Format (PDF) is a cornerstone of modern office productivity. While both formats are designed to represent text, images, and tables, their underlying document models are diametrically opposed. 

This guide explores the inner workings of Word-to-PDF conversion. We will examine the architectures of OpenXML and PDF, detail the layout rendering pipelines used to preserve formatting, dissect page layouts, table mapping, and image processing, and discuss the security advantages of client-side browser processing.

---

## 1. Document Models: OpenXML (DOCX) vs. PDF Layouts

To understand how a Word document is transformed into a PDF, we must analyze the structural specifications of both formats.

### The Word Document Model: OpenXML / WordprocessingML
Since Microsoft Office 2007, the standard format for Word files has been DOCX, which is based on the **Office Open XML (OOXML)** standard (standardized as ECMA-376 and ISO/IEC 29500). 

A \`.docx\` file is a ZIP archive containing a structured tree of XML files. The main text content resides in \`word/document.xml\`. Inside this file, document elements are represented hierarchically using **WordprocessingML**:

\`\`\`xml
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
        <w:jc w:val="center"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:sz w:val="36"/>
        </w:rPr>
        <w:t>Project Specification</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>This is a standard body paragraph that automatically reflows.</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>
\`\`\`

In WordprocessingML:
- **Paragraphs** (\`<w:p>\`): Represent distinct blocks of text. They contain formatting properties (\`<w:pPr>\`) that govern alignments (\`<w:jc>\`), styles, and spacing.
- **Runs** (\`<w:r>\`): Represent contiguous spans of text sharing identical formatting. If a sentence has a single word in bold, it is split into three runs: regular run, bold run (\`<w:b/>\`), and regular run.
- **Text Nodes** (\`<w:t>\`): Contain the actual literal character strings.

The crucial characteristic of this model is that it is **reflowable**. It does not declare *where* a word is painted on a page or *how many* lines a paragraph takes. The word processing software computes the layout dynamically by combining document properties, font metrics, margins, and screen sizes. A single DOCX file might render across 5 pages on a desktop monitor using a specific version of Word, and 6 pages on a mobile screen, or when opened in a different software package.

### The PDF Document Model: Fixed Coordinates
In contrast, a PDF (Portable Document Format, standardized as ISO 32000) is a **fixed-layout** format. A PDF page is a static coordinate grid (typically measured in points, where 1 inch = 72 points). Text, vector graphics, and images are drawn at absolute coordinates using explicit paint operators:

\`\`\`text
Page Canvas: Width = 612 pt, Height = 792 pt (Letter size)
BT
/F1 18.00 Tf (Set Font /F1, Size 18)
206.00 710.00 Td (Move to X=206, Y=710)
(Project Specification) Tj (Draw Text)
ET
BT
/F2 11.00 Tf (Set Font /F2, Size 11)
72.00 670.00 Td (Move to X=72, Y=670)
(This is a standard body paragraph that automatically reflows.) Tj (Draw Text)
ET
\`\`\`

A PDF does not reflow. If you resize a PDF window, the font sizes and margins do not alter; the page is simply scaled up or down. 

### The Conversion Challenge: Flow to Fixed
The converter's primary role is to act as a **layout engine**. It must read the reflowable XML elements of the DOCX file, calculate how they will render based on font dimensions and page boundaries, split the continuous content flow into rigid page containers, and then write these coordinates as fixed painting instructions into a standard PDF stream.

---

## 2. The Browser-Based Client-Side Rendering Pipeline

Performing this complex layout math client-side without a remote server requires an organized pipeline combining several browser APIs and libraries.

\`\`\`mermaid
graph TD
    DOCX[Upload DOCX File] --> Reader[Read as ArrayBuffer]
    Reader --> DocxPreview[Parse & Render via docx-preview]
    DocxPreview --> DOM[Isolated Shadow DOM Container]
    DOM --> Margins[Apply Custom Layout, Margins, Orientations]
    DOM --> Pagination[Paginate Content Flow via CSS Pages]
    Pagination --> CanvasRender[Capture Page Divs via html2canvas]
    CanvasRender --> Watermark[Inject Custom Watermarks]
    Watermark --> PdfAssemble[Embed Images into pdf-lib PDFDocument]
    PdfAssemble --> Compress[Optimize PDF & Compress Streams]
    Compress --> Download[Download Output PDF Document]
    DOCX -.-> Batch[Process Multiple Files sequentially] --> Zip[Assemble ZIP Archive via JSZip]
    Zip --> BulkDownload[Download ZIP containing all PDFs]
Extended Version: Standard, High Quality, Print Ready, Compact modes
\`\`\`

### Stage 1: Document Parsing and HTML Reflow
1. **Dynamic Library Loading**: To keep initial page weight light, the tool loads the \`docx-preview\` parser via CDN.
2. **HTML Reconstruction**: The file's binary \`ArrayBuffer\` is fed into \`docx.renderAsync()\`. This library reads the DOCX ZIP archive, extracts the XML tree, parses the formatting stylesheets (\`styles.xml\`), and renders the nodes into standard HTML elements inside a container. Paragraphs become \`<p>\` tags, tables become \`<table>\` grids, lists become \`<ul>\` or \`<ol>\` items, and inline images are embedded as Base64 \`<img>\` objects.
3. **Shadow DOM Isolation**: The rendered HTML is inserted into a hidden wrapper element. This ensures that the document's styles do not bleed out and clash with the platform's main Tailwind utility styling.

### Stage 2: Pagination and Geometry Adjustments
Because HTML documents are continuous scrolls by default, the engine must divide the HTML content into physical pages before rendering.
1. **Dimension Setup**: The container's width is set to match the user's selected page size (e.g., A4: 8.27in × 11.69in, Letter: 8.5in × 11in) and orientation (Portrait or Landscape).
2. **Page Splitter**: The container's elements are traversed. The engine calculates the cumulative vertical height of the rendered HTML nodes. Whenever the cumulative height exceeds the target page height (subtracting the user-specified margins), a CSS page-break style (\`page-break-before: always\` or wrapping nodes into distinct page containers) is dynamically inserted.
3. **Margin Enforcement**: Padding values matching the selected margin mode (Normal: 1 inch, Narrow: 0.5 inch, Wide: 2 inches) are applied to each page element container.

### Stage 3: Canvas Rendering (html2canvas)
To transform the styled page layouts into drawing inputs for the PDF, the engine rasterizes the page structures.
1. **Page Traversal**: For each separated page element, \`html2canvas\` is invoked.
2. **DPI Customization**: The \`scale\` parameter of \`html2canvas\` is adjusted based on the user's selected conversion mode:
   - **Standard Mode**: scale = \`1.5\` (~144 DPI) for fast processing and balanced file size.
   - **High Quality Mode**: scale = \`2.0\` (~192 DPI) for crisp text and sharp image preservation.
   - **Print Ready Mode**: scale = \`3.0\` (~288 DPI) for professional-grade high-contrast printing.
   - **Compact Mode**: scale = \`1.0\` (~96 DPI) for web-optimized minimal footprints.
3. **Canvas Capture**: The rasterization process draws all DOM styles, inline tables, borders, and custom web fonts onto a canvas object.

### Stage 4: PDF Assembly and Watermarking (pdf-lib)
1. **Document Setup**: A new \`pdf-lib\` \`PDFDocument\` is created.
2. **Image Insertion**: The canvas output of each page is converted to a compressed PNG or JPEG image byte array and registered into the PDF using \`pdfDoc.embedPng()\`.
3. **Page Addition**: For each page, a new page matching the target size (e.g., A4: 595 × 842 points) is appended, and the embedded page image is painted across the page canvas.
4. **Watermark Drawing**: If a user specifies a watermark, the engine overlays it using PDF drawing operators:
   - **Text Watermark**: Draws a rotated string overlay using \`page.drawText()\` with custom transparency settings (\`opacity\`), colors, and font sizes.
   - **Image Watermark**: Embeds a secondary logo or image file and paints it at coordinate points using \`page.drawImage()\`.

---

## 3. Preserving Complex Document Structures

Achieving a professional-grade conversion requires specific rules to maintain document structures like tables, headings, and images.

### Table Preservation
Word tables are complex structures that contain borders, margins, cell spans, and nested text blocks. The \`docx-preview\` parser translates Word Processing tables (\`<w:tbl>\`) into standard HTML \`<table>\` elements, including CSS border styles (\`border-collapse\`, \`border-style\`, \`border-color\`). The \`html2canvas\` capture snapshot reads these borders, grid spacing, cell alignments, and background colors, and renders them accurately.

### Image and Graphic Assets
Word documents often store images in media folders (\`word/media/image1.png\`). The converter reads these binaries, extracts the layout attributes (width, height, crop offsets, wrapping modes), and embeds them as base64 images within the HTML DOM. During conversion, the rasterizing engine draws these graphics, logos, charts, and vectors directly onto the output page canvas, maintaining their position relative to the surrounding text runs.

### Font and Alignment Matching
Word documents frequently rely on standard Microsoft font systems (Arial, Calibri, Times New Roman, Cambria). The renderer loads matching open-source Web Font equivalents (e.g., Google Fonts or standard browser fallbacks) to ensure that word boundaries, kerning, and line wraps match the original document. Text alignments (left, center, right, justified) are preserved via CSS class conversions applied to the paragraph elements.

---

## 4. Client-Side Security: The Zero-Trust Advantage

Conventional online Word-to-PDF converters require users to upload documents to external cloud servers. For corporate, medical, or legal documents, this presents a severe compliance risk (exposing files to data breaches, unauthorized logging, or third-party storage).

By utilizing a client-side architecture:
- **Absolute Privacy**: Files are processed directly in the local browser tab's sandbox memory. The document never travels across the network.
- **GDPR and HIPAA Compliance**: Since no file data is sent, stored, or indexed, the tool is fully compliant with modern data protection frameworks.
- **Zero Server Overhead**: Processing files locally enables instant startup without queue wait times.

This hybrid utility also includes an upgrade path for server-side conversions in the future. In server mode, files are processed using isolated Route Handlers, held strictly in temporary memory buffers, and immediately purged upon completion.

---

## 5. Comparison: Conversion Modes

| Metric | Standard PDF | High Quality PDF | Print Ready PDF | Compact PDF |
| :--- | :--- | :--- | :--- | :--- |
| **Target DPI** | 144 DPI | 192 DPI | 288 DPI | 96 DPI |
| **DPI Scale** | 1.5x | 2.0x | 3.0x | 1.0x |
| **Processing Speed**| Very Fast | Fast | Moderate | Instant |
| **File Footprint** | Small | Medium | Large | Extremely Small |
| **Primary Use Case** | Digital sharing | Office publishing | Physical prints | Web hosting / Email |

By selecting the optimal preset, users can tailor their documents to any corporate, personal, or publishing requirements.
  `,

  features: [
    "100% Client-Side Conversion: All files are processed locally inside browser RAM, ensuring maximum privacy and data security.",
    "Comprehensive Formatting Preservation: Maintains headings, font sizes, text alignments, lists, page breaks, and column layouts.",
    "Advanced Table Retention: Preserves table borders, row heights, column alignments, merged cells, and background colors.",
    "Image & Logo Preservation: Extracts and embeds images, charts, icons, and logos at their exact layout positions.",
    "Four Conversion Presets: Choose between Standard, High Quality, Print Ready, and Compact modes based on file size and DPI targets.",
    "Flexible Layout Configurations: Custom A4, Letter, Legal, A3 size overrides, orientation switches, and margin settings.",
    "Text & Image Watermarks: Layer custom security text or image logo overlays with adjustable opacity and rotation.",
    "Side-by-Side Live Preview: Real-time visual comparison showing the original Word document on the left and the output PDF on the right.",
    "Detailed Document Analytics: Report counting paragraphs, lists, tables, and images detected within the file structure.",
    "Batch Processing Support: Convert multiple DOCX/DOC documents in parallel and download them as a unified ZIP archive.",
    "LocalStorage Presets: Automatically retains recently converted files, presets, and customized configuration settings locally."
  ],

  useCases: [
    "Converting corporate reports and contracts from DOCX to PDF for formal execution.",
    "Creating web-ready, lightweight PDF manuals from product documentation files.",
    "Exporting academic theses and essays while maintaining citations, lists, and tables.",
    "Adding custom watermark overlays to confidential business proposals before sharing.",
    "Batch-converting student resumes to PDF for standardized recruitment folders.",
    "Creating high-contrast print-ready PDFs from design documentation."
  ],

  howToSteps: [
    "Drag and drop your DOCX or DOC document into the secure upload area.",
    "Choose a conversion preset (Standard, High Quality, Print Ready, or Compact).",
    "Configure page dimensions, orientation, and margin offsets to fit your layout.",
    "Optionally input text or upload an image logo to layer a secure watermark.",
    "Review the document layouts in the side-by-side 'Original vs. PDF' preview panels.",
    "Click 'Convert to PDF'. The engine will compile the PDF file in-memory.",
    "Download the finished PDF, or download a ZIP archive containing all processed files if running a batch."
  ],

  examples: [
    {
      title: "DOCX Business Proposal",
      description: "Convert a formatted proposal document containing tables and logos.",
      input: "Business_Proposal.docx (2.4 MB) - High Quality preset",
      output: "Business_Proposal.pdf (1.1 MB) - Clean tables, sharp vector logos, preserved margins"
    },
    {
      title: "Batch Resume Conversion",
      description: "Bulk convert multiple candidate resumes for standardized sharing.",
      input: "5 Resume Files (DOCX format) - Standard preset",
      output: "Resumes_Converted.zip (1.8 MB) containing 5 individual, searchable PDFs"
    }
  ],

  faq: [
    {
      question: "How do I convert a Word document to PDF?",
      answer: "Drag and drop your DOCX or DOC file into the upload dropzone, customize page settings (size, margin, orientation) or add a watermark, and click 'Convert to PDF' to compile the file instantly in your browser."
    },
    {
      question: "Is this Word to PDF tool free to use?",
      answer: "Yes, this conversion utility is 100% free with no registration, no subscription fees, no watermarks (unless you add one), and no file count limits."
    },
    {
      question: "Will the formatting of my Word document be preserved?",
      answer: "Yes. The rendering pipeline uses docx-preview to reconstruct the XML structure (headings, lists, tables, images, text alignment) in HTML before compiling the PDF, preserving your original formatting."
    },
    {
      question: "Are my files uploaded to any servers?",
      answer: "No. The tool runs 100% client-side. Your documents are parsed and converted in-memory within your browser tab. Your files never leave your computer, satisfying strict privacy policies."
    },
    {
      question: "Can I convert legacy DOC files as well as DOCX?",
      answer: "Yes. The upload system accepts both DOCX and DOC files. DOCX is parsed natively. DOC files are converted using layout and structure recovery pathways before compilation."
    },
    {
      question: "Does this converter support batch processing?",
      answer: "Yes. You can upload up to 10 Word documents simultaneously. The tool will process them in parallel and bundle the outputs into a single ZIP folder."
    },
    {
      question: "What page sizes are supported for the output PDF?",
      answer: "The tool supports A4, Letter, A3, A5, and Legal size configurations. You can customize the page size to override the original Word document's dimensions."
    },
    {
      question: "Can I customize the margins of the PDF?",
      answer: "Yes. You can select Normal (1 inch), Narrow (0.5 inch), Wide (2 inches), or Custom margin padding configurations to align your layout."
    },
    {
      question: "How do I add a watermark to my PDF?",
      answer: "Toggle the watermark panel, select Text Watermark (enter text, font size, opacity, rotation) or Image Watermark (upload a logo), and the engine will layer it onto your document during conversion."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes. It is fully responsive and optimized for mobile browsers on iOS (Safari) and Android (Chrome, Firefox), allowing you to convert files on the go."
    },
    {
      question: "Can I choose the page orientation?",
      answer: "Yes. You can toggle between Portrait and Landscape layouts before running the conversion engine."
    },
    {
      question: "Does the converter support embedded images?",
      answer: "Yes. Images, corporate logos, graphics, icons, and diagrams are parsed from the DOCX container and embedded at their exact positions in the PDF."
    },
    {
      question: "Is there a file size limit?",
      answer: "Yes, we support files up to 50MB. Larger documents can cause browser memory limits to be exceeded during rendering."
    },
    {
      question: "Does PDF conversion preserve hyperlinks?",
      answer: "Yes. Internal hyperlinks (anchors, table of contents) and external URLs are kept clickable and active in the converted PDF."
    },
    {
      question: "Can I use the tool offline?",
      answer: "Yes. Once the page is loaded in your browser, the tool does not require an active internet connection to parse and convert files, since all code runs locally."
    },
    {
      question: "What is the difference between standard and high-quality presets?",
      answer: "Standard mode uses a balanced DPI (144) for fast processing and small file sizes. High Quality mode increases DPI (192) for sharper text and graphics at the expense of a slightly larger file size."
    },
    {
      question: "Are non-English characters supported during conversion?",
      answer: "Yes. The HTML renderer supports Unicode character mappings, ensuring that accent marks, non-Latin alphabets, and symbols are preserved."
    },
    {
      question: "Do you store history of my files?",
      answer: "No. The conversion history is saved strictly in your browser's local localStorage cache, capturing stats like file name and page count. Your actual files are never cached."
    },
    {
      question: "Can I convert password-protected Word documents?",
      answer: "No. Password-protected documents are encrypted. You must remove the password protection from the file before uploading it to the converter."
    },
    {
      question: "How do I clear my local conversion history?",
      answer: "Open the History panel and click 'Clear Cache' to remove all local file statistics from your browser's localStorage."
    },
    {
      question: "Will headers and footers be preserved in the PDF?",
      answer: "Yes. Document headers, footers, and page numbers generated inside the Word document are processed and rendered onto the PDF canvas."
    },
    {
      question: "Why is my converted PDF file larger than the original DOCX?",
      answer: "Word files are text-based XML instructions. Converting them client-side involves rendering pages to high-resolution canvases to guarantee style preservation, which increases the file footprint."
    },
    {
      question: "Does this tool support table formatting, like merged cells?",
      answer: "Yes. Grid structures, borders, row spans, column spans, alignments, and background fills are fully preserved."
    },
    {
      question: "Can I convert ODT or RTF files?",
      answer: "The current version natively supports DOCX and DOC files. ODT and RTF formats are planned in future updates."
    },
    {
      question: "Is this tool GDPR compliant?",
      answer: "Yes. Since all processing runs locally inside your browser and no document data is uploaded to our servers, the tool complies with GDPR privacy standards."
    },
    {
      question: "What is the Print Ready PDF preset?",
      answer: "This preset scales the page rendering to 300 DPI, boosting contrast and sharpness to ensure that text and images print cleanly on physical paper."
    },
    {
      question: "Can I choose which pages of the Word document to convert?",
      answer: "Currently, the tool converts all pages of the uploaded document. You can use our Split PDF or Remove PDF Pages tools after if needed."
    },
    {
      question: "Does the tool support nested lists?",
      answer: "Yes. Multilevel bullet points, numbered outlines, and indentation offsets are kept intact."
    },
    {
      question: "How does the side-by-side preview work?",
      answer: "The left panel displays the HTML rendering of your Word file (Original Preview). The right panel shows the compiled PDF canvas (PDF Preview) once the conversion completes."
    },
    {
      question: "Is there a limit to how many files I can convert?",
      answer: "No, you can perform as many conversions as you like throughout the day without restriction."
    },
    {
      question: "Can I download my converted files as a ZIP?",
      answer: "Yes. During batch conversion of multiple files, the tool packages all outputs and provides a single ZIP download."
    },
    {
      question: "What happens if my conversion fails?",
      answer: "Verify that your Word file is not corrupted and can open in standard word processors. If it still fails, it may contain custom elements that block browser parsing."
    },
    {
      question: "Are custom font files embedded in the Word document supported?",
      answer: "Standard web-safe fonts and common Microsoft fonts are supported. Rare, proprietary custom fonts will fall back to standard sans-serif or serif fonts."
    },
    {
      question: "How secure is client-side processing?",
      answer: "It is the most secure method available. By keeping all file data within your browser's memory sandbox, there is zero risk of interception or server leaks."
    },
    {
      question: "Does the tool support superscript and subscript text?",
      answer: "Yes. Inline formatting, including superscript, subscript, bold, italic, and colored text runs, is fully preserved."
    },
    {
      question: "What is Compact PDF mode?",
      answer: "Compact mode uses a lower resolution (96 DPI) to create the smallest possible PDF file size, ideal for email attachments and web downloads."
    },
    {
      question: "Can I cancel a conversion in progress?",
      answer: "Yes. If processing takes too long, you can click 'Remove Word File' to abort the current conversion run and clear memory."
    },
    {
      question: "Do you support conversion of Word documents with macro files (DOCM)?",
      answer: "Yes, the layout converter can extract content from DOCM files, although macros and scripts themselves will be stripped from the final static PDF."
    },
    {
      question: "Does the PDF support text selection after conversion?",
      answer: "The current browser-only rendering compiles pages as high-resolution images within the PDF to guarantee layout preservation, making it a read-only document. You can run it through our PDF OCR tool to restore a selectable text layer."
    },
    {
      question: "Is this tool suitable for business and legal documents?",
      answer: "Yes. The zero-trust local-only execution model makes it highly recommended for sensitive corporate, financial, and legal documents."
    }
  ],

  relatedTools: [
    { name: "PDF to Word", slug: "pdf-to-word" },
    { name: "PDF OCR", slug: "pdf-ocr" },
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Organize PDF", slug: "organize-pdf" },
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Unlock PDF", slug: "unlock-pdf" },
    { name: "Edit PDF", slug: "edit-pdf" }
  ]
};
