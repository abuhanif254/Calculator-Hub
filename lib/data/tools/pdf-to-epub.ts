import { ToolConfig } from './types';

export const pdfToEpubConfig: ToolConfig = {
  slug: "pdf-to-epub",
  title: "Convert PDF to EPUB | Free Reflowable Ebook Creator",
  shortDescription: "Convert static PDF documents into responsive, reflowable EPUB3 ebooks directly in your browser. Seamless reading on Kindle, Kobo, Apple Books, and mobile devices with 100% privacy.",
  category: "PDF Tools",
  keywords: [
    "pdf to epub", "convert pdf to epub", "pdf to ebook", "create epub from pdf",
    "pdf to kindle", "pdf to kobo", "reflowable epub converter",
    "offline pdf to epub", "client side pdf to epub", "turn pdf into ebook",
    "epub3 ebook generator", "read pdf on ereader"
  ],

  longDescription: `
## Turn Fixed-Layout PDFs into Comfortable, Reflowable EPUB Ebooks

While the Portable Document Format (PDF) is celebrated for locking visual elements into a permanent, print-ready coordinate grid, reading a multi-page PDF on a portable e-reader (such as an Amazon Kindle, Kobo Clara, or reMarkable) or a smartphone is an exhausting physical experience. Because PDFs freeze font sizes, line lengths, and margins to fixed dimensions (like A4 or US Letter), readers on compact 6-inch screens are forced into an endless cycle of pinching, zooming, and scrolling horizontally across every single line of text.

Our **PDF to EPUB Converter** transforms rigid, unyielding PDF documents into fluid, reflowable EPUB3 ebooks right inside your web browser. By discarding rigid coordinate bounding boxes and reconstructing continuous semantic text flows, this tool lets you read your favorite documents with customizable typefaces, adjustable font sizes, dynamic margins, and effortless page-turning across any dedicated e-reader or mobile reading application.

---

### Architectural Comparison: Digital Reading Formats

Evaluating digital reading formats illustrates why converting fixed-layout PDFs into reflowable EPUB3 files is essential for handheld devices:

| Reading Metric | EPUB 3 (Reflowable - Our Tool) | Fixed-Layout PDF | MOBI (Legacy Kindle) | AZW3 / KFX (Modern Kindle) |
| :--- | :--- | :--- | :--- | :--- |
| **Screen Adaptability** | **Dynamic fluid reflow**; fits any screen size | Rigid; requires constant pinch-and-zoom | Dynamic fluid reflow | Dynamic fluid reflow |
| **Typographic Customization** | Reader-controlled (Bookerly, Georgia, sizing) | Author-locked; cannot change font/size | Limited font selection | Kindle system font selection |
| **E-Ink Device Battery Drain** | Minimal; renders clean text glyphs | Heavy; CPU drains redrawing vector maps | Minimal | Minimal |
| **Highlighting & Annotation** | Native word-level selection & dictionary | Clunky coordinate box dragging | Basic text selection | Enhanced text selection |
| **Chapter Navigation** | Interactive NCX/NavDoc table of contents | Bookmark outlines (viewer dependent) | Basic chapter links | Native Kindle chapter scrub bar |
| **Open Standard Support** | Universal open W3C/IDPF standard | Universal ISO standard | Deprecated proprietary Amazon binary | Proprietary closed Amazon format |
| **Data Privacy & Uploads** | **100% In-Browser**; zero server uploads | 100% In-Browser | Server conversion | Cloud Whispernet sync |

---

### The Engineering Pipeline: How In-Browser PDF to EPUB3 Compilation Works

Converting a print-oriented PDF into a standards-compliant EPUB3 ebook involves an extensive reverse-engineering and compilation pipeline executed entirely within client-side memory:

1. **Text Stream Parsing & Spatial Coordinate Clustering**: Using Mozilla's \`pdfjs-dist\` engine compiled for WebAssembly, the converter reads individual character glyphs and spatial matrices. Characters sharing common line baselines are grouped into words, and words are assembled into coherent sentences.
2. **Column & Gutter Detection**: In multi-column publications (such as academic research papers or periodicals), reading text strictly left-to-right across the page width scrambles sentences across column dividers. Our parser detects vertical gutters using horizontal projection analysis, ensuring each column is fully read in its natural linear order before moving to the next.
3. **Semantic Chapter Boundary Inference**: By analyzing relative font scales, line-height jumps, and bold weights across the document, the engine identifies chapter titles and major section headings. Rather than generating a single monolithic 500-page file, the tool partitions the document into modular XHTML chapter files, ensuring rapid loading on e-reader hardware.
4. **Header, Footer & Boilerplate Stripping**: Running headers, document titles, and repeating page numbers that appear at identical coordinates at the top and bottom of each PDF page are detected and removed so they do not disrupt the narrative flow on every screen.
5. **Open Container EPUB3 Packaging**: The engine compiles the individual XHTML chapters, CSS stylesheets, embedded images, and navigation metadata into an official EPUB3 container using \`JSZip\`. The package is assembled with an uncompressed \`mimetype\` file, \`META-INF/container.xml\`, and a structured \`content.opf\` manifest, producing a valid, DRM-free \`.epub\` file ready for immediate transfer.

---

### In-Depth Troubleshooting Guide for PDF to EPUB Conversion

Transforming print-oriented documents into reflowable ebooks can present unique layout quirks. Here is how our engine overcomes common hurdles:

#### 1. Handling Scanned Books and Image-Only PDFs
If your PDF consists of scanned pages or photocopied books without an underlying digital text layer, the converter will find zero character glyphs.
- **Diagnosis**: Attempt to highlight words with your mouse inside the PDF. If you cannot select text, the document is an image scan.
- **Solution**: The file must pass through an Optical Character Recognition (OCR) engine first to generate digital text coordinates before reflowable EPUB conversion can take place.

#### 2. Resolving Multi-Column Reading Order Glitches
In documents with sidebars, callout boxes, or two-column academic formats, text flow can sometimes become interleaved.
- **Solution**: Enable the **Strict Multi-Column Isolation** toggle in the converter options. This forces the spatial parser to calculate vertical gutters before extracting text, ensuring columns are read independently.

#### 3. Preserving Diagrams, Charts, and Embedded Illustrations
Heavily illustrated books or scientific papers often feature figures accompanied by text captions.
- **Solution**: The converter extracts embedded raster images, scales them with CSS responsive max-width rules (\`max-width: 100%; height: auto;\`), and binds them directly to their adjacent caption paragraphs inside semantic \`<figure>\` and \`<figcaption>\` tags.

#### 4. Handling Non-Latin Scripts and Right-to-Left (BiDi) Text
Books in Arabic, Hebrew, Chinese, Japanese, or Cyrillic require strict character encoding declarations.
- **Solution**: All generated XHTML chapters are explicitly encoded in UTF-8 with standard XML declarations and language tags (\`xml:lang="ar"\`), guaranteeing that reading apps render complex scripts correctly without unreadable character corruption.

---

### Enterprise Compliance & The Zero-Upload Privacy Guarantee

Unpublished book manuscripts, proprietary company training guides, sensitive academic preprints, and confidential legal documents must be protected against piracy and data interception.

Our PDF to EPUB Converter operates under an uncompromising **Zero-Upload Security Model**:
- **100% In-Browser Execution**: All coordinate extraction, XHTML formatting, image unbundling, and EPUB3 ZIP compilation take place entirely within your browser's local sandbox memory.
- **Zero Cloud Footprint**: Your documents never leave your computer, are never sent across the internet, and are never saved on remote cloud servers.
- **Enterprise Regulatory Compliance**: Fully compliant with strict data protection frameworks including GDPR, HIPAA, CCPA, and corporate Non-Disclosure Agreements (NDAs).
`,

  features: [
    "100% Client-Side Privacy: Your documents never leave your computer or upload to external servers",
    "True Reflowable Text: Converts rigid PDF pages into responsive EPUB chapters that adapt to any screen",
    "Intelligent Chapter Detection: Inferred heading hierarchy creates an organized e-reader table of contents",
    "Header & Footer Filtering: Automatically removes repetitive page numbers and running headers",
    "Standards-Compliant EPUB3: Fully compatible with Apple Books, Kobo, Google Play Books, and Kindle",
    "Embedded Image Preservation: Extracts and optimizes illustrations, charts, and cover images",
    "Multi-Column Layout Awareness: Accurately parses two-column academic papers without scrambled text",
    "Custom Ebook Metadata: Set custom book titles, author names, language codes, and cover art before export"
  ],

  useCases: [
    "Readers converting long PDF books, articles, and research papers for comfortable reading on e-ink devices",
    "Self-publishing authors converting formatted PDF manuscripts into reflowable EPUB drafts for digital distribution",
    "Students converting academic PDF papers and lecture notes into mobile-friendly ebooks for study commutes",
    "Corporate trainers converting technical manuals and compliance guides into searchable ebooks for company tablets",
    "Book collectors digitizing out-of-print PDF documents into flexible modern ebook libraries",
    "Legal professionals reading lengthy appellate briefs on portable e-readers during travel"
  ],

  howToSteps: [
    "Select or drag-and-drop your PDF document into the converter dropzone.",
    "The client-side engine parses text coordinates, strips headers/footers, and infers chapter breaks.",
    "Configure your ebook metadata, including Title, Author Name, and language preference.",
    "Click 'Convert to EPUB' to compile the reflowable EPUB3 package in your browser's local memory.",
    "Download your .epub file and transfer it to your e-reader or open it directly in your favorite reading app."
  ],

  examples: [
    {
      title: "Academic Research Monograph",
      description: "Converting a 60-page fixed-layout economics paper into a reflowable EPUB for Kindle reading.",
      input: "monetary-policy-analysis.pdf (60 pages, fixed layout)",
      output: "monetary-policy-analysis.epub (Reflowable text, adjustable font size, interactive chapter TOC)"
    },
    {
      title: "Fiction Novel Manuscript Proof",
      description: "Transforming an author's PDF proof into a reflowable EPUB file for beta reader review on mobile devices.",
      input: "fantasy-novel-draft.pdf (240 pages)",
      output: "fantasy-novel-draft.epub (Clean typography, chapter navigation, comfortable mobile reading)"
    },
    {
      title: "Technical Software Guide",
      description: "Converting a software reference PDF into an EPUB for offline reading on an iPad mini.",
      input: "cloud-native-devops-guide.pdf (112 pages)",
      output: "cloud-native-devops-guide.epub (Preserved code snippets, responsive diagrams, modular chapters)"
    }
  ],

  relatedTools: [
    { name: "EPUB to PDF", slug: "epub-to-pdf" },
    { name: "PDF to Text", slug: "pdf-to-text" },
    { name: "PDF to Word", slug: "pdf-to-word" },
    { name: "Compress PDF", slug: "compress-pdf" }
  ],

  faq: [
    {
      question: "Are my PDF files uploaded to any cloud server during conversion?",
      answer: "No. The entire conversion process runs 100% locally inside your web browser using client-side JavaScript and WebAssembly. Your files never leave your computer."
    },
    {
      question: "Can I read the converted EPUB on an Amazon Kindle?",
      answer: "Yes. Modern Kindles support EPUB files natively. You can send the downloaded .epub file to your Kindle using Amazon's 'Send to Kindle' service or transfer it via USB."
    },
    {
      question: "Will text reflow automatically when I change the font size?",
      answer: "Yes. Unlike fixed-layout PDFs, the generated EPUB is fully reflowable. Text automatically recalculates line wraps and page boundaries to fit any screen size, font, or orientation."
    },
    {
      question: "How does the tool generate the table of contents?",
      answer: "The engine analyzes relative font sizes, weights, and spatial breaks to identify major chapter titles and section headings, automatically building an interactive e-reader navigation document."
    },
    {
      question: "What happens to page numbers and running headers from the PDF?",
      answer: "The tool detects repetitive headers, footers, and page numbers appearing at identical coordinates and filters them out so they do not disrupt your reading flow on an e-reader."
    },
    {
      question: "Can I convert scanned book PDFs?",
      answer: "This tool extracts digital text and vector layers already present in the PDF. If your PDF is a scanned photocopy without digital text layers, it will require Optical Character Recognition (OCR) first."
    },
    {
      question: "Will images and illustrations from the PDF be preserved in the EPUB?",
      answer: "Yes. All embedded raster images and diagrams are extracted and inserted into the respective chapter XHTML files with responsive CSS scaling."
    },
    {
      question: "Can I customize the ebook title, author name, and cover?",
      answer: "Yes. You can edit the ebook metadata fields before compiling the EPUB, ensuring your e-reader displays the proper book title and author in your digital library."
    },
    {
      question: "How does the tool handle two-column documents like research papers?",
      answer: "The spatial parser detects vertical gutters between columns, ensuring that the left column is completely transcribed before the right column begins, preventing scrambled sentences."
    },
    {
      question: "Does the converted EPUB support dark mode?",
      answer: "Yes. Because the output uses clean, semantic XHTML without hardcoded background colors, your e-reader or reading app can seamlessly apply dark mode or sepia themes."
    },
    {
      question: "Is there a limit on how long the PDF can be?",
      answer: "Documents with hundreds of pages convert smoothly on modern computers. Because processing occurs directly in your browser's local RAM, performance depends on your device's available memory."
    },
    {
      question: "Can I use this tool offline without an active internet connection?",
      answer: "Yes. Once the web application is loaded in your browser, all PDF parsing and EPUB compilation take place entirely offline without requiring internet access."
    }
  ]
};
