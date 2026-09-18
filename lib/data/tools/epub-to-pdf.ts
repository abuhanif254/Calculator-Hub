import { ToolConfig } from './types';

export const epubToPdfConfig: ToolConfig = {
  slug: "epub-to-pdf",
  title: "Convert EPUB to PDF | Free Client-Side Ebook Converter",
  shortDescription: "Convert EPUB ebooks into beautifully formatted, print-ready PDF documents directly in your browser. Preserves typography, chapters, images, and metadata with 100% client-side privacy.",
  category: "PDF Tools",
  keywords: [
    "epub to pdf", "convert epub to pdf", "ebook to pdf", "epub pdf converter",
    "epub reader to pdf", "digital book conversion", "online epub converter",
    "pdf ebook export", "client side ebook converter", "convert book to pdf",
    "epub to printable pdf", "format epub for printing"
  ],

  longDescription: `
## Transform Reflowable Ebooks into Fixed-Layout, Printable PDFs

The EPUB (Electronic Publication) format has long served as the open standard for digital reading across dedicated e-readers (such as Kobo and PocketBook), mobile applications (like Apple Books and Google Play Books), and desktop reading software. Built on the philosophy of reflowable content, an EPUB file dynamically recalculates its text layout based on the reader's chosen font size, screen orientation, line spacing, and viewport width.

While reflowable text is ideal for reading a novel on a 6-inch e-ink screen or a smartphone, it creates substantial hurdles when your objective requires visual immutability and fixed page geometry. If you are an independent author preparing review copies for beta readers, an academic citing specific page coordinates in a research paper, a legal professional archiving reference documentation, or a student printing a digital textbook on a physical desktop printer, you need a fixed-layout document where every line, diagram, and page boundary remains permanent.

Our **EPUB to PDF Converter** bridges this divide, transforming fluid digital publications into standardized, beautifully formatted PDF documents that render identically across every operating system, screen resolution, and physical printer.

---

### Architectural Comparison: EPUB vs. PDF vs. MOBI vs. AZW3

Understanding the structural differences between digital book formats helps you determine when to preserve reflowability and when to compile into a fixed-layout PDF:

| Feature / Metric | EPUB 3 | PDF (Portable Document Format) | MOBI (Legacy Kindle) | AZW3 / KFX (Modern Kindle) |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Philosophy** | Reflowable, screen-responsive | Fixed-layout, print-identical | Reflowable (HTML 3.2 baseline) | Reflowable with enhanced typesetting |
| **Underlying Tech** | HTML5, CSS3, XML manifests in ZIP | PostScript-derived 2D vector canvas | Proprietary compiled binary | Compiled HTML5 / proprietary container |
| **Print Fidelity** | Variable; depends on device margins | 100% exact mathematical millimeter precision | Poor; no native pagination | Poor; dynamic pagination |
| **Typography Control** | User-controlled (variable fonts/sizes) | Author-locked (embedded vector glyphs) | Limited to device defaults | Kindle font selection |
| **Diagrams & Tables** | Can break awkwardly across screens | Strict geometric bounding boxes | Tables frequently degrade | Basic responsive table support |
| **Citation Stability** | Locations vary by font scale | Permanent page numbers (Page 42 is always Page 42) | Location numbers (e.g. Loc 1420) | Hybrid page numbering |
| **Cross-Platform Compatibility** | Requires specialized reader software | Universally supported natively by every browser & OS | Deprecated by Amazon | Tied to Amazon Kindle ecosystem |

---

### The Engineering Pipeline: How In-Browser EPUB to PDF Conversion Works

An EPUB package is essentially a structured ZIP archive containing XHTML chapters, CSS stylesheets, raster and vector images, and an XML packaging manifest (the Open Packaging Format, or OPF file). Converting this structure into a cohesive, paginated PDF is an intensive engineering challenge executed entirely inside your browser's local memory:

1. **Archive Decompression & Container Resolution**: The engine reads the binary stream of your \`.epub\` file using fast client-side WebAssembly decompression routines. It parses \`META-INF/container.xml\` to locate the root \`.opf\` package file, which dictates the strict linear reading order (the spine) and lists every internal asset manifest.
2. **Metadata & Table of Contents Extraction**: Book metadata—including title, creator/author, publisher, language code, ISBN, and embedded cover art—is parsed from the package metadata. The navigation document (\`nav.xhtml\` in EPUB 3 or \`toc.ncx\` in legacy EPUB 2) is scanned to extract the multi-level hierarchical table of contents.
3. **CSS Normalization & Cascade Emulation**: Ebooks frequently carry legacy CSS intended for low-resolution e-ink screens or vendor-specific styling rules. Our parser strips problematic CSS overrides (such as forced negative margins or device-specific height restrictions) while preserving typographic hierarchies, heading weights, italic emphasis, blockquotes, and code styling.
4. **Intelligent Pagination & Page-Budgeting**: Unlike simple browser printing that blindly slices through text lines and diagrams, our layout engine performs spatial budgeting:
   - **Widow and Orphan Control**: Prevents a single lonely line of a paragraph from appearing at the top or bottom of a page.
   - **Heading Attachment**: Ensures section titles (\`<h1>\` through \`<h3>\`) remain attached to their subsequent introductory paragraph, never stranding a heading at the absolute bottom of a page.
   - **Figure & Table Encapsulation**: Enforces \`break-inside: avoid\` rules around data tables and captioned illustrations, preventing diagrams from being sliced in half across a page divide.
5. **PDF Assembly & Interactive Bookmark Injection**: The formatted pages are compiled into a standards-compliant PDF file. The extracted table of contents is converted into native interactive PDF bookmarks (outlines), allowing readers to jump between chapters with a single click in any PDF viewer.

---

### In-Depth Troubleshooting Guide for EPUB Conversion

While standard EPUB files convert seamlessly, complex or improperly packaged publications may encounter formatting quirks. Here is how our engine resolves common issues:

#### 1. Handling Missing or Unlinked Cover Images
In some self-published EPUBs, the cover image is designated only in the metadata manifest but omitted from the spine reading order. Our converter automatically detects orphaned cover items in the manifest (\`properties="cover-image"\`) and prepends a dedicated, full-bleed title page featuring the book cover before Chapter 1 begins.

#### 2. Managing Font Encoding and Non-Latin Characters (CJK, Cyrillic, Arabic)
Certain technical or international publications embed customized font subsets. If a font file inside the EPUB is corrupted or lacks specific Unicode glyphs, our engine falls back to universal system typography stacks (such as Noto Sans and standard system serif fonts) to ensure characters in Chinese, Japanese, Korean, Arabic, and Eastern European languages render without rendering empty square boxes ('tofu').

#### 3. Large Ebooks with High-Resolution Photography (>50 MB)
For heavily illustrated textbooks or photography guides, parsing dozens of high-resolution images in browser memory can cause memory pressure. Our engine streams image decoding sequentially using Canvas downsampling heuristics, allowing modern laptops and smartphones to comfortably process multi-hundred-page illustrated books without crashing.

#### 4. Avoiding Split Code Blocks and Preformatted Text
In technical programming manuals, code blocks wrapped in \`<pre>\` tags can easily overflow narrow PDF margins. The converter automatically applies soft wrapping and horizontal scroll budgeting, shrinking font sizes slightly for wide code lines to preserve indentation and syntax readability.

---

### Enterprise Compliance & The Zero-Upload Privacy Guarantee

Whether you are an independent novelist protecting your unpublished intellectual property from piracy or a corporate legal team formatting confidential internal operating procedures, uploading documents to third-party cloud servers creates significant security risks.

Our converter operates under a strict **Zero-Upload Architecture**:
- **100% In-Browser Execution**: All file unzipping, text parsing, CSS rendering, and PDF compilation take place within your web browser's local sandbox memory via WebAssembly and modern JavaScript.
- **Zero Server Footprint**: Your book files never leave your computer, are never sent across the network, and are never logged or stored on external cloud infrastructure.
- **Enterprise Regulatory Compliance**: Because no data is transferred, our tool complies with strict corporate data governance frameworks, including GDPR, CCPA, HIPAA, and corporate Non-Disclosure Agreements (NDAs).
`,

  features: [
    "100% Client-Side Privacy: Your files never leave your device or upload to external servers",
    "Intelligent Chapter Pagination: Honors page-break declarations and eliminates orphaned headings",
    "Interactive PDF Bookmarks: Reconstructs the EPUB table of contents into clickable PDF navigation outlines",
    "Custom Page Geometries: Choose between international A4, North American US Letter, or compact Digest (5.5 x 8.5 in)",
    "Typography Preservation: Retains custom font styling, italics, blockquotes, code blocks, and lists",
    "Full-Bleed Cover Art Extraction: Automatically detects and formats book cover images on page 1",
    "Widow & Orphan Suppression: Keeps paragraphs visually balanced across page margins",
    "Fast Local WebAssembly Engine: Converts 300+ page books in seconds directly on your device"
  ],

  useCases: [
    "Authors converting draft EPUB manuscripts into paginated PDFs for proofreading, beta readers, and editors",
    "Students formatting digital textbooks into printable documents with permanent page numbers for academic citations",
    "Legal and compliance professionals archiving digital publications into stable, non-reflowable PDF records",
    "Independent publishers creating physical print-on-demand (POD) book interiors from digital EPUB source files",
    "Engineers and developers printing long-form technical documentation and programming guides for offline reference",
    "Researchers extracting and annotating chapters from open-access digital monographs on tablets"
  ],

  howToSteps: [
    "Select or drag-and-drop your .epub file into the secure in-browser conversion dropzone.",
    "The tool automatically unpacks the archive and parses book metadata, chapter titles, and cover art.",
    "Choose your target page format (Standard A4, US Letter, or compact Digest) and set your preferred base font size.",
    "Configure margin padding and toggle whether to include running headers and page number footers.",
    "Click 'Convert to PDF' to initiate the local pagination and rendering pipeline.",
    "Preview the generated document and click 'Download PDF' to save your file instantly to your device."
  ],

  examples: [
    {
      title: "Technical Documentation Ebook",
      description: "Converting a reflowable developer handbook with code blocks and diagrams into an A4 PDF document.",
      input: "guide-to-distributed-systems.epub (3.4 MB)",
      output: "guide-to-distributed-systems.pdf (4.1 MB, 142 pages with interactive chapter navigation)"
    },
    {
      title: "Academic Research Monograph",
      description: "Transforming an open-access thesis into a fixed-layout PDF for academic citation and printing.",
      input: "thesis-modern-macroeconomics.epub (1.8 MB)",
      output: "thesis-modern-macroeconomics.pdf (2.2 MB, 86 pages formatted with standard margins)"
    },
    {
      title: "Literary Novel for Beta Readers",
      description: "Formatting a 300-page fiction manuscript into a clean Digest-size PDF for proofreading.",
      input: "novel-draft-final.epub (1.1 MB)",
      output: "novel-draft-final.pdf (312 pages, Digest 5.5x8.5, elegant book typography)"
    }
  ],

  relatedTools: [
    { name: "PDF to EPUB", slug: "pdf-to-epub" },
    { name: "Text to PDF", slug: "text-to-pdf" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "PDF to Word", slug: "pdf-to-word" }
  ],

  faq: [
    {
      question: "Are my book files uploaded to any server during conversion?",
      answer: "No. All conversion logic runs entirely inside your web browser using client-side JavaScript and WebAssembly. Your files remain completely private on your local computer and are never transmitted across the internet."
    },
    {
      question: "Does the converter support DRM-protected EPUB files?",
      answer: "No. The converter can only process standard, DRM-free EPUB files. Books purchased with proprietary digital locks (such as Adobe Digital Editions or Apple Books DRM) must have their digital locks removed before they can be parsed."
    },
    {
      question: "Will embedded images and illustrations be preserved in the PDF?",
      answer: "Yes. All JPEG, PNG, GIF, and SVG images included in the EPUB package are extracted and scaled proportionally to fit within your selected page margins without distortion or cropping."
    },
    {
      question: "Can I click on the table of contents in the generated PDF?",
      answer: "Yes. The tool parses the EPUB navigation document (TOC) and embeds native PDF bookmark outlines, allowing you to jump directly to any chapter in standard PDF readers like Adobe Acrobat, Preview, or Chrome."
    },
    {
      question: "What page sizes are supported for the output PDF?",
      answer: "You can choose from standard international paper sizes like A4, North American formats like US Letter, or compact book-publishing dimensions such as Digest (5.5 x 8.5 inches)."
    },
    {
      question: "How does the converter prevent headings from appearing at the bottom of a page?",
      answer: "Our layout engine enforces strict 'keep-with-next' rules. If a heading element (h1, h2, h3) appears too close to the bottom margin, the engine automatically pushes it to the top of the subsequent page along with its first paragraph."
    },
    {
      question: "Will font styling like bold, italics, and code blocks be preserved?",
      answer: "Yes. The converter parses the source CSS and HTML tags, faithfully preserving typographic hierarchy, inline formatting, blockquotes, bulleted lists, and monospaced code blocks."
    },
    {
      question: "Can I print the generated PDF as a physical book?",
      answer: "Yes. By selecting the Digest (5.5 x 8.5 inch) or standard US Trade paper size with normal margins, the resulting PDF is ready for physical desktop printing or submission to Print-on-Demand (POD) book services."
    },
    {
      question: "Is there a file size limit for EPUB conversion?",
      answer: "Because processing happens directly in your browser's memory, files up to 100 MB typically convert without issue on modern computers. Processing time depends on your device's CPU and available memory."
    },
    {
      question: "What is the difference between EPUB 2 and EPUB 3 conversion?",
      answer: "EPUB 2 is based on older XHTML 1.1 and NCX navigation files, whereas EPUB 3 uses modern HTML5, CSS3, and NavDoc navigation. Our converter supports both standards, automatically detecting the version and normalizing the content."
    },
    {
      question: "Does the tool support non-Latin languages like Japanese, Chinese, or Arabic?",
      answer: "Yes. The rendering engine incorporates comprehensive Unicode font fallbacks, ensuring characters in CJK, Cyrillic, Greek, and right-to-left scripts like Arabic and Hebrew render clearly."
    },
    {
      question: "Can I convert multiple EPUB files at once?",
      answer: "Yes. You can queue multiple books in the batch uploader, and our client-side engine will process and export each publication sequentially."
    }
  ]
};
