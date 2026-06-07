import { ToolConfig } from './types';

export const compressPdfConfig: ToolConfig = {
  slug: "compress-pdf",
  title: "Compress PDF",
  shortDescription: "Reduce PDF file size while maintaining maximum quality. 100% secure processing with hybrid client-server smart routing.",
  category: "PDF Manipulation Tools",
  keywords: [
    "Compress PDF", "PDF compressor", "reduce PDF size", "shrink PDF", "PDF optimization",
    "online PDF compressor", "free PDF compression", "PDF file size reduction", "PDF productivity",
    "document management", "business PDFs", "academic PDFs", "secure PDF compression",
    "fast PDF compression", "best PDF compressor", "optimize PDF for web", "downsample PDF images",
    "remove PDF metadata", "reduce PDF megabytes", "shrink PDF document free", "make PDF smaller"
  ],

  longDescription: `
## The Ultimate Guide to PDF Compression and Document Optimization

In the contemporary digital landscape, the Portable Document Format (PDF) has established itself as the absolute standard for business, legal, and academic document exchange. Developed by Adobe in the early 1990s and formalized as an open ISO standard (ISO 32000), the PDF excels at maintaining exact visual fidelity across any device, operating system, or printer. 

However, this precision comes at a cost. High-resolution scanned documents, embedded vector graphics, corporate branding, and multiple high-fidelity images can quickly bloat a PDF file. It is common to find PDF reports, portfolios, or ebooks that are 50MB, 100MB, or even 200MB in size. 

These bloated file sizes create severe operational bottlenecks:
- **Email limits**: Most email clients restrict attachments to 20MB or 25MB.
- **Upload constraints**: Government portals, academic databases, and job application websites frequently enforce strict limit thresholds (often 5MB to 10MB).
- **Web load latency**: Large PDFs load slowly on mobile devices, consuming unnecessary bandwidth and frustrating users.

Our **Compress PDF** utility provides a premium, hybrid-architecture solution designed to optimize, condense, and shrink your files without sacrificing readable quality. Operating with a privacy-first approach, it is 100% free, requires no signup, and delivers professional-grade results.

---

## Lossless vs. Lossy PDF Compression: How the Engines Work

To achieve meaningful size reduction without ruining readability, our platform employs a dual-compression architecture. When you upload a document, the engine evaluates its content structure and applies two levels of optimization:

### 1. Lossless Structural Optimization
Every PDF file contains internal metadata, structural hierarchies, and duplicate resources that are not visible to the naked eye. Structural compression targets these objects directly:
- **Metadata stripping**: Removing author tags, creator details, indexing tags, and software creation logs.
- **Resource consolidation**: Merging duplicate fonts, color space definitions, and graphic templates that are repeatedly declared on multiple pages.
- **Unreferenced object cleanup**: Locating and deleting orphan object nodes, historical file revisions, and deleted page fragments.
- **Object stream compression**: Compressing the underlying page hierarchy and content instructions using Flate/LZW algorithms into highly compact object streams.

*This process is completely lossless.* Selectable text, vector geometries, hyperlinks, form fields, and fonts are preserved at 100% of their original visual quality.

### 2. Lossy Image Recompression (Downsampling)
Image assets (like photos, diagrams, and scans) are the primary cause of bloated PDFs. This lossy engine recompresses these images:
- **DPI Downsampling**: Reducing the resolution of embedded images to standard web benchmarks. High-resolution print files (300 DPI) are scaled down to standard desktop (150 DPI) or mobile screen (96 DPI) sizes.
- **JPEG Re-encoding**: Compressing images using highly efficient lossy compression algorithms. Users can customize the JPEG quality target from 10% (maximum compression) to 100% (maximum quality).

By blending these two engines, **our utility can reduce scanned documents by up to 90% and standard vector PDFs by 20% to 50%**, striking the perfect balance between quality and footprint.

---

## Hybrid Architecture: Smart Routing for Fast and Secure Processing

Unlike other web-based compressors that upload all your documents to third-party clouds, our tool uses a **smart hybrid routing architecture**:

- **Client-Side Mode (Files < 15MB)**: Smaller files are processed directly inside your browser using standard HTML5 APIs and JavaScript. The files never leave your device. The process takes milliseconds and runs entirely in local RAM.
- **Server-Side Mode (Files > 15MB)**: Large documents require massive CPU cycles and RAM allocation. Attempting to process a 100MB scanned PDF locally in a browser tab can cause memory leaks, freeze the browser, or crash the page. The smart router detects large files and securely routes them to our Next.js API Route Handler. The server processes the file efficiently in chunks, streams the result back, and immediately purges all trace files from memory.

### Security and GDPR Compliance
We take security seriously. For client-side compression, **files never leave your browser.** For server-side compression, **files are kept strictly in temporary memory (buffers) during execution and are never written to permanent disk storage.** No persistent logs, backups, or database entries are created, guaranteeing compliance with GDPR, HIPAA, and CCPA standards.

---

## Advanced Compression Presets and Custom Tuning

Different scenarios demand different compression targets. Our tool provides four customizable presets:

### 1. Extreme Compression (High Reduction)
- **Quality**: ~50% JPEG quality, downscaled to 96 DPI.
- **Use Case**: Best when you need to meet tight upload limits (like job applications or tax portals) where file size is critical and minor image degradation is acceptable.

### 2. Recommended Compression (Medium / Balanced)
- **Quality**: ~70% JPEG quality, downscaled to 150 DPI.
- **Use Case**: The ideal preset for everyday sharing, email attachments, and web uploads. It maintains excellent text readability and sharp images while reducing size by 60-80%.

### 3. High Quality Compression (Low Reduction)
- **Quality**: ~90% JPEG quality, keeping high resolution.
- **Use Case**: Perfect for portfolios, presentations, and vector documents where maintaining visual appeal, clean typography, and image detail is paramount.

### 4. Custom Compression
- **Control**: Allows you to adjust the quality slider (10% to 100%) and DPI settings manually.
- **Use Case**: Ideal for power users who want to fine-tune files to meet exact target sizes.

---

## Streamlining Enterprise and Academic Workflows

Optimized document size is essential for smooth workflows in many professions:

### Business and Legal
HR managers, accountants, and legal professionals process thousands of contracts, resumes, and invoices. Compressing these files speeds up document loading, saves storage space, and ensures attachments never get blocked by client email servers.

### Academic Research
Students and academics constantly compile research journals, theses, and reference books. Using our PDF compressor allows researchers to combine and compress resource-heavy files, creating lightweight study materials that load instantly on e-readers and tablets.

Optimize your file sharing speeds, keep your sensitive data secure, and save storage space today using our professional-grade **Compress PDF** tool.
  `,

  features: [
    "Hybrid Smart Processing: Instantly routes small files to local browser memory and large files to secure server-side handlers.",
    "Dual Compression Engines: Combines lossless structural tree compilation with lossy canvas-based image re-encoding.",
    "Multiple Compression Levels: Features preset levels (Low, Recommended, High) and manual quality/DPI sliders.",
    "Side-by-Side Quality Preview: Split-screen visual comparison lets you review original vs. compressed quality before downloading.",
    "Batch Compression Support: Upload and compress up to 10 PDF documents simultaneously to save time.",
    "Automatic ZIP Packaging: Automatically bundles multiple compressed outputs into a single, clean ZIP folder.",
    "Compression Analytics: Detailed statistics showing original size, compressed size, MB saved, and reduction percentage.",
    "Smart Recommendations: Automatically recommends optimal settings based on file structures and images.",
    "Local History Logs: Keeps a local, secure history of your recently compressed files for easy access.",
    "Mobile-First Design: Fully responsive dashboard layout works beautifully on phones, tablets, and desktops.",
    "Privacy Guaranteed: Zero file storage, zero tracking, and fully compliant with data privacy frameworks."
  ],

  useCases: [
    "Shrinking a high-resolution design portfolio to meet agency upload guidelines.",
    "Compressing scanned tax returns and bank statements for secure mortgage portals.",
    "Downsampling massive academic textbooks to read comfortably on mobile e-readers.",
    "Optimizing monthly sales pitch presentations to send as email attachments.",
    "Batch compressing multiple medical reports to store in a patient archive.",
    "Reducing the size of scanned contracts for faster digital signature processing."
  ],

  howToSteps: [
    "Upload your PDF by dragging it into the upload box or clicking to browse your device.",
    "Select your compression level (Low, Recommended, High, or Custom).",
    "Review the Smart Recommendation panel for expected size savings.",
    "Use the Before/After quality comparison preview to verify readability and layout.",
    "Click the 'Compress PDF' button. The tool will process your file locally or route it securely based on size.",
    "Review your final analytics: check the reduction percentage and space saved.",
    "Download your optimized PDF, or download a ZIP file containing the batch results if you uploaded multiple files."
  ],

  examples: [
    {
      title: "Scanned Document Compression",
      description: "Compress a heavy scanned contract file containing page images.",
      input: "Scanned_Agreement.pdf (18.4 MB) - Medium Compression selected",
      output: "Scanned_Agreement_compressed.pdf (3.2 MB) - 82% reduction, sharp text"
    },
    {
      title: "Vector Presentation Slide Deck",
      description: "Optimize a vector slides PDF containing graphs and images.",
      input: "Sales_Deck_2026.pdf (12.1 MB) - Recommended Compression selected",
      output: "Sales_Deck_2026_compressed.pdf (4.8 MB) - 60% reduction, clean layout"
    }
  ],

  faq: [
    {
      question: "How do I compress a PDF file?",
      answer: "Upload your document to our tool, select your preferred compression level (Low, Medium, High, or Custom), and click 'Compress PDF'. The optimized file will download automatically."
    },
    {
      question: "Is this Compress PDF tool free to use?",
      answer: "Yes, this utility is 100% free with no registration, no watermarks, and no usage limits."
    },
    {
      question: "Will compression reduce the visual quality of my PDF?",
      answer: "It depends on the mode. Lossless structural compression keeps quality at 100%. Image recompression downsamples images, which may cause slight quality loss at higher compression levels (like High/Extreme), but recommended settings keep text and images very sharp."
    },
    {
      question: "What is the hybrid processing architecture?",
      answer: "Our tool processes files under 15MB locally in your browser so they never leave your device. Files over 15MB are routed securely to our server actions to prevent browser tabs from running out of memory and crashing."
    },
    {
      question: "Are my PDF files safe and secure?",
      answer: "Yes. Files processed client-side never leave your computer. Files processed server-side are held strictly in temporary memory buffers during execution and deleted instantly; we never store files permanently."
    },
    {
      question: "Can I compress multiple PDFs at once?",
      answer: "Yes, you can upload up to 10 files for batch compression. The tool will process them and bundle the results into a single ZIP folder."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes, it is fully responsive and works in mobile browsers on iOS (Safari) and Android (Chrome, Firefox)."
    },
    {
      question: "What compression level should I choose?",
      answer: "We recommend 'Medium Compression' (balanced mode). It reduces size significantly (up to 70%) while keeping text and images clear and readable."
    },
    {
      question: "Can I compress scanned PDF files?",
      answer: "Yes. Scanned PDFs are typically large because pages are saved as images. Recompressing these images using our lossy engine yields massive size savings."
    },
    {
      question: "Can I compress password-protected PDFs?",
      answer: "No. For security compliance, password-protected PDFs must be unlocked before uploading so the parser can read and optimize the file contents."
    },
    {
      question: "Why is my PDF file so large?",
      answer: "PDFs are usually large due to high-resolution images, embedded fonts, vector graphics, metadata logs, or because scanned pages were saved without optimization."
    },
    {
      question: "Does PDF compression affect text selectability?",
      answer: "No. If you choose structural or balanced compression, the text layer remains intact and fully searchable. Only rasterizing at high levels converts text to flat images."
    },
    {
      question: "How much space can I save?",
      answer: "Scanned PDFs and image-heavy files can often be reduced by 60% to 90%. Text-only vector PDFs typically see size reductions of 20% to 50%."
    },
    {
      question: "Can I process PDFs offline?",
      answer: "Yes. Once the page is loaded, files under 15MB run entirely client-side, allowing you to compress them without an internet connection."
    },
    {
      question: "What does DPI mean in custom compression?",
      answer: "DPI (Dots Per Inch) determines image resolution. 300 DPI is for print, 150 DPI is for standard screens, and 96 DPI is for fast web loading."
    },
    {
      question: "What happens to metadata after compression?",
      answer: "The tool strips out unused metadata tags, editing histories, and creator logs to reduce file size and improve your privacy."
    },
    {
      question: "Does compressing a PDF delete annotations or comments?",
      answer: "By default, structural compression preserves standard annotations, links, and forms. High compression modes may flatten these elements to save space."
    },
    {
      question: "Why does the compression fail on some files?",
      answer: "Failures are rare but can happen if a file is corrupted, encrypted, or contains non-standard object structures that block parsing."
    },
    {
      question: "Is there a limit on file size?",
      answer: "We support files up to 150MB. Larger files can cause browser or server memory limits to be exceeded."
    },
    {
      question: "Can I cancel a compression run in progress?",
      answer: "Yes, you can click the 'Reset' or 'Cancel' button to halt processing and clear memory buffers instantly."
    },
    {
      question: "What format are the compressed downloads?",
      answer: "Single files download as optimized PDFs. Batch files download as a ZIP archive containing all your compressed PDFs."
    },
    {
      question: "Are hyperlinks inside the PDF preserved?",
      answer: "Yes. Active web links, page anchors, and table of contents links are preserved during optimization."
    },
    {
      question: "Does the tool support color-profile preservation?",
      answer: "Yes. Standard sRGB color profiles are kept intact, though high compression may convert some print color spaces (CMYK) to RGB to save space."
    },
    {
      question: "How does the side-by-side preview work?",
      answer: "It displays a rendering of the first page of your PDF before and after compression. Drag the slider to compare details."
    },
    {
      question: "What is object stream compression?",
      answer: "It is an ISO standard feature where PDF objects are packed together and compressed using gzip algorithms, rather than written individually."
    },
    {
      question: "Can I use this tool for commercial projects?",
      answer: "Yes, the tool is free for personal, commercial, academic, and business use without restriction."
    },
    {
      question: "Will compressing a PDF alter the page size layout?",
      answer: "No. Page dimensions (like Letter, A4) and layouts remain identical; only image pixels and structural data are optimized."
    },
    {
      question: "Does the tool use external APIs?",
      answer: "No. All processing is handled by our own client-side engines and secure server Route Handlers, with no third-party APIs involved."
    },
    {
      question: "What is the local history trace?",
      answer: "It is a log saved in your browser's localStorage that keeps track of your recent file savings statistics. It does not store actual files."
    },
    {
      question: "How do I clear the local compression history?",
      answer: "Open the History panel and click 'Clear Logs' to delete all compression statistics from your browser."
    }
  ],

  relatedTools: [
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Rotate PDF", slug: "rotate-pdf" },
    { name: "PDF to Word", slug: "pdf-to-word" },
    { name: "JPG to PDF", slug: "jpg-to-pdf" },
    { name: "PDF to JPG", slug: "pdf-to-jpg" }
  ]
};
