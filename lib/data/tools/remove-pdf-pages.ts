import { ToolConfig } from './types';

export const removePdfPagesConfig: ToolConfig = {
  slug: "remove-pdf-pages",
  title: "Remove PDF Pages",
  shortDescription: "Delete unwanted pages from your PDF documents instantly. 100% secure client-side browser processing. No uploads required.",
  category: "PDF Tools",
  keywords: [
    "Remove PDF Pages", "Delete PDF Pages", "PDF Page Deletion", "Remove Pages from PDF",
    "PDF Page Remover", "PDF Page Deletion Tool", "PDF Cleaner", "delete pages from PDF online",
    "free PDF page remover", "delete PDF pages free", "remove PDF pages securely", "online PDF page deletion",
    "shrink PDF size by removing pages", "split PDF pages", "PDF document cleanup", "remove odd pages PDF",
    "remove even pages PDF", "clean PDF metadata", "secure document editing", "browser-based PDF editor"
  ],

  longDescription: `
## The Complete Guide to Removing Pages from PDF Documents Locally

In the modern enterprise, legal, academic, and creative workflow landscape, the Portable Document Format (PDF) is the absolute standard for preserving visual consistency across varying hardware, operating systems, and viewport sizes. Created by Adobe Systems and codified as an open ISO standard (ISO 32000), the PDF retains exact fonts, layout coordinates, vector lines, and image compressions regardless of how or where it is opened. 

However, because PDFs are compiled as static page objects, deleting or modifying specific pages is notoriously difficult without specialized software. It is common to receive massive PDF reports, corporate presentations, legal binders, or scanned records where certain pages are redundant, blank, confidential, or simply out of order. 

Whether you need to extract a single sheet, eliminate sensitive annexes before sending a contract to a client, delete blank pages from a scanner queue, or crop out bulk sections of a digital textbook, using a specialized, secure **PDF page deletion tool** is the most efficient solution. Our tool runs 100% in your local web browser, meaning your private files are never sent to external servers, providing an enterprise-grade document editing workspace that is fast, accessible, and completely private.

---

## Technical Insights: How PDF Page Deletion Works Under the Hood

To understand how pages are removed, we must understand how a PDF file is structured internally. A PDF is not just a linear stream of pixels or characters; it is a complex tree structure of cross-referenced data objects. 

### The PDF Catalog and the Pages Tree
At the root of every PDF document is a dictionary called the 'Catalog'. The Catalog contains a reference to the 'Pages' tree (known as the /Pages dictionary). This tree structure organizes the pages in a hierarchical node system:
1. **Intermediate Nodes**: Group branches of the document together.
2. **Leaf Nodes (Page Objects)**: Represent the individual pages (known as /Page dictionaries).

Each Page Object contains keys specifying its contents, media boundaries (/MediaBox), resource dictionaries (/Resources for fonts, color profiles, and images), and contents streams (/Contents containing the visual instructions to draw vector curves, shapes, text, and images).

### Physical Deletion vs. Reference Deletion
When a standard PDF editor deletes a page, it can do so in two ways:
- **Reference Deletion**: The page is simply removed from the /Pages tree list, but the visual assets (such as high-resolution images or fonts declared in that page) remain embedded in the file's binary stream. This results in no reduction in file size, and the "removed" data can sometimes still be recovered by data extraction tools.
- **Physical Deletion (Auto-Optimization)**: The page is removed from the /Pages tree, and the tool performs a traversal of the document's cross-reference table (xref) to locate and permanently delete all orphan objects (fonts, forms, and images) that were solely referenced by the deleted page.

Our browser-based utility utilizes **Physical Deletion**. By using advanced client-side compilers, it clones the source PDF structure, replicates only the specified pages into a brand-new PDF container, preserves the document's global catalog structure, and executes a clean garbage-collection routine to purge unreferenced data streams. This guarantees that your output PDF is as small and optimized as possible, with no leftover hidden information.

---

## Client-Side vs. Cloud-Based PDF Tools: The Privacy and Security Imperative

Most online PDF utilities require you to upload your files to their remote cloud servers, where a server-side script parses and modifies the files. While convenient, this architecture presents severe security, privacy, and compliance risks:
- **Corporate Espionage and Data Leaks**: Uploading contracts, financial audits, medical records, or strategic blueprints to a third-party server exposes that data to interception, server vulnerabilities, or unauthorized access by the platform's administrators.
- **Regulatory Penalties**: Under compliance frameworks like GDPR (General Data Protection Regulation), HIPAA (Health Insurance Portability and Accountability Act), CCPA (California Consumer Privacy Act), and PCI-DSS, transmitting sensitive personally identifiable information (PII) or protected health information (PHI) to unverified third-party processing servers is a direct violation, exposing your organization to heavy audits and fines.
- **Network Dependency**: Uploading a 100MB file, waiting for server queues to process it, and downloading the output consumes significant bandwidth and is slow on mobile or restricted corporate networks.

### The Security Architecture of Our Tool
Our **Remove PDF Pages** tool completely eliminates these concerns by using a **100% client-side computing engine**:
1. **Local Sandbox Execution**: The tool loads the PDF parsing libraries directly into your browser's local sandbox memory.
2. **Zero Network Transmission**: When you drag and drop a PDF, the file is read as an ArrayBuffer in your local RAM. It is never transmitted across the internet.
3. **Instantaneous Compilation**: Page manipulation takes place on your physical CPU core, running in milliseconds.
4. **Complete Offline Support**: Once the page is loaded, you can disconnect your internet entirely, drop a file, delete pages, and download the finished document. Your data stays where it belongs — on your machine.

---

## Detailed Step-by-Step Workflow for Page Removal

Our professional user interface is designed to make page removal intuitive, regardless of whether you are on a desktop workstation or a mobile device:

### Step 1: Upload Your Documents
Drag and drop your PDF files directly into the dashed upload dropzone. You can also click the browse link to select documents from your device's filesystem. Our tool supports uploading multiple PDFs at once, allowing you to batch-delete pages from different documents simultaneously.

### Step 2: Analyze Pages and Configure Deletion
Once uploaded, our tool will read the document structure and present a beautiful visual grid of all pages. Each page thumbnail is rendered in real-time, allowing you to see the actual content of the page.
- **Visual Multi-Select**: Click directly on a thumbnail to highlight it for deletion. Clicking it again will unmark it.
- **Select Page Ranges**: Enter specific pages or page ranges in the text entry field using a standardized syntax (e.g., '1-5, 9, 12-15'). The visual checkbox grid and text range box automatically sync in real-time.
- **Delete Modes**: Use our smart filters to perform bulk selections:
  - *Remove Selected Pages*: Delete only the files you have explicitly highlighted.
  - *Keep Selected Pages*: Keep only the highlighted pages, deleting the rest (ideal when extracting a small section from a large manual).
  - *Remove Odd Pages*: Mark pages 1, 3, 5, etc., for deletion.
  - *Remove Even Pages*: Mark pages 2, 4, 6, etc., for deletion.

### Step 3: Preview the Final Structure
In the statistics panel, review the before and after document specifications:
- Original file name and size.
- Original page count.
- Count of pages marked for removal.
- Remaining page count.
- Estimated output file size.

### Step 4: Export and Download
Click the compile button to run the deletion engine. Once finished:
- For single PDF files, click 'Download PDF' to save the optimized file directly to your downloads folder.
- For multiple PDF files, click 'Download ZIP' to fetch a compressed folder containing all your processed, individual PDFs, or download each file one-by-one.

---

## Best Practices for Optimizing and Cleaning Your PDF Files

To get the absolute best results when cleaning up your documents, consider these expert tips:

### 1. Optimize Filenames for Organization
When downloading your output files, choose descriptive naming conventions. If you are preparing a document for a client, append tags like '_final', '_clean', or '_optimized' to distinguish the new version from the bloated original. Our settings panel allows you to customize output name presets easily.

### 2. Double-Check Page References in Page Flow
Always scroll through the visual preview gallery before clicking export. If a PDF contains internal page links, cross-references, or a Table of Contents, deleting pages in the middle of the document will cause those page pointers to shift. Verify that you have adjusted your index or page numbering references if the document is destined for official publication.

### 3. Maintain Document Security
If you are removing pages containing confidential information (such as personal credit numbers, signatures, or trade secrets) before sharing the document, remember that deleting the pages does not encrypt the rest of the document. If you need to lock down the remaining pages, utilize our **Protect PDF** tool afterward to append strong AES-256 password encryption.

### 4. Review Metadata Fields
Page deletion is the perfect time to clean up hidden document tags. Our settings panel allows you to retain or edit global PDF metadata fields (Title, Subject, Author, Keywords, and Creator). Removing legacy software logs from the metadata is highly recommended before sharing documents publicly.
`,
  faq: [
    {
      question: "How do I remove pages from a PDF?",
      answer: "Upload your PDF file by dragging and dropping it into the zone or clicking browse. In the page gallery, click on the thumbnails of the pages you want to remove, or type a page range (e.g., '2-5, 8') in the text box. Choose your delete mode, and click 'Remove Pages' to compile and download your clean PDF."
    },
    {
      question: "Can I delete multiple pages at the same time?",
      answer: "Yes. You can select as many pages as you want by clicking their thumbnails in the visual gallery, or by entering multiple ranges separated by commas (such as '1-4, 7, 10-15') in the range selection field."
    },
    {
      question: "Is this PDF page removal tool completely free?",
      answer: "Yes. Our tool is 100% free with no hidden charges, trial limits, page counts, file size limits, or registration required."
    },
    {
      question: "Are my PDF files secure and private?",
      answer: "Absolutely. Our utility uses a privacy-first hybrid client-side architecture. The PDF parsing, rendering, and page deletion happen entirely inside your browser's local sandboxed memory. Your files are never uploaded to any remote servers, ensuring absolute confidentiality."
    },
    {
      question: "Can I remove page ranges (e.g., pages 5 to 10)?",
      answer: "Yes. Simply input '5-10' in the range selection box. The corresponding pages in the grid will be highlighted automatically, and clicking the export button will delete those pages from the final output."
    },
    {
      question: "Does this page remover work on mobile devices?",
      answer: "Yes. The interface is fully responsive and optimized for mobile browsers, including iOS Safari and Android Chrome. You can upload files directly from your mobile files app, select pages, and download the finished PDF."
    },
    {
      question: "Can I preview the pages before deleting them?",
      answer: "Yes. Our system uses a high-performance rendering engine (PDF.js) to generate a clear visual thumbnail preview of every page in your document, ensuring you can review the content of each page before confirming deletion."
    },
    {
      question: "Are my files stored on your servers?",
      answer: "No. Since all operations run locally in your web browser, your files are never transmitted to our servers or stored in any database. The moment you close the tab, all local memory is automatically released."
    },
    {
      question: "Can I process large PDFs with hundreds of pages?",
      answer: "Yes. The tool features an optimized chunked loading pipeline and lazy-rendered thumbnails using an IntersectionObserver, which prevents browser tabs from freezing when handling large files."
    },
    {
      question: "Can I undo page selections?",
      answer: "Yes. If you make a mistake, you can simply click a highlighted thumbnail again to unmark it, edit the range string directly, or click 'Deselect All' to reset the entire canvas selection."
    },
    {
      question: "What is the difference between 'Remove Selected' and 'Keep Selected' modes?",
      answer: "'Remove Selected' deletes the pages you have highlighted and keeps everything else. 'Keep Selected' extracts only the pages you have highlighted and discards all others."
    },
    {
      question: "Can I remove odd or even pages automatically?",
      answer: "Yes. We have built-in preset filters. Clicking 'Remove Odd Pages' will automatically highlight pages 1, 3, 5, etc., for deletion, while 'Remove Even Pages' targets pages 2, 4, 6, etc."
    },
    {
      question: "How can I remove blank pages from a scanned document?",
      answer: "You can identify blank pages visually in our thumbnail gallery and click them to mark them for deletion. We are also preparing a future feature that will automatically detect and suggest the removal of blank pages based on pixel analysis."
    },
    {
      question: "Can I customize the filename of the output PDF?",
      answer: "Yes. In the Settings Panel, you can type a custom filename. If left blank, it defaults to the original filename appended with '_edited'."
    },
    {
      question: "Is document metadata preserved during page deletion?",
      answer: "Yes, by default, the original document metadata (Title, Author, Creator, Subject) is preserved. You can also choose to edit or strip this metadata in the settings panel before exporting."
    },
    {
      question: "Does deleting pages reduce the file size of the PDF?",
      answer: "Yes. Our compiler performs physical page deletion, meaning it drops the page coordinates from the document catalog and ignores unreferenced images, fonts, and metadata stream assets, resulting in a cleaner, lighter file."
    },
    {
      question: "Can I process multiple PDF documents at once?",
      answer: "Yes. You can upload multiple PDFs in a batch list. You can select and customize deletion parameters for each file, and then download them individually or package them into a single ZIP file."
    },
    {
      question: "Does this tool support password-protected PDFs?",
      answer: "For security reasons, you must decrypt password-protected PDFs before uploading them. If your file is encrypted, please unlock it first using a decryption tool."
    },
    {
      question: "Do I need to install any plugins or software?",
      answer: "No. The tool is 100% web-based and runs in any modern browser (Chrome, Firefox, Safari, Edge) without requiring any downloads, plugins, or registration."
    },
    {
      question: "What image formats are supported in PDF page preview?",
      answer: "The page thumbnails are generated directly from the PDF vector data using canvas rendering, so all standard embedded formats (JPG, PNG, TIFF, JBIG2, JPX) are supported."
    },
    {
      question: "Can I zoom in on page thumbnails?",
      answer: "Yes. We provide zoom controls (Zoom In / Zoom Out sliders) so you can increase the thumbnail size to clearly inspect page details and text."
    },
    {
      question: "Can I select pages using keyboard shortcuts?",
      answer: "Yes. The interface is built with accessibility guidelines (ARIA-compliant) and supports keyboard navigation for page selection and controls."
    },
    {
      question: "Will the formatting of the remaining pages change?",
      answer: "No. The remaining pages are copied byte-for-byte in their original vector formatting, preserving fonts, layout, links, and styling perfectly."
    },
    {
      question: "Can I download my processed PDF files as a ZIP archive?",
      answer: "Yes. When batch processing multiple PDFs, you can download all output files at once in a single compressed ZIP folder by clicking 'Download ZIP'."
    },
    {
      question: "Does the tool log my search or file history?",
      answer: "We log a local history list of your past file conversions, which is saved locally in your own browser's `localStorage`. This data is private to you and never shared with our servers."
    },
    {
      question: "Are files deleted immediately after processing?",
      answer: "Since your files are processed locally inside your browser's memory, they are never uploaded to our servers in the first place, meaning there is no data to delete or store."
    },
    {
      question: "What is the maximum file size I can upload?",
      answer: "We support files up to 150MB. Larger files might take slightly longer to process depending on your computer's RAM and CPU capabilities."
    },
    {
      question: "Does page deletion remove hyperlinked URLs within pages?",
      answer: "No, hyperlinks, annotations, and form fields on the remaining pages are copied and preserved exactly as they were in the original document."
    },
    {
      question: "What libraries are used to process the PDFs?",
      answer: "We use standard open-source libraries: `pdf-lib` for document compilation and structuring, and `pdfjs-dist` (PDF.js) for high-performance canvas page rendering."
    },
    {
      question: "Can I recover pages after deleting them?",
      answer: "As long as you do not close your browser tab or delete the original file on your computer, you can re-select or modify pages and download a new copy. Once the tab is closed, you will need to re-upload the original file."
    }
  ],
  relatedTools: [
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Rotate PDF", slug: "rotate-pdf" },
    { name: "PDF to JPG", slug: "pdf-to-jpg" },
    { name: "JPG to PDF", slug: "jpg-to-pdf" }
  ],
  features: [
    "100% Secure Client-Side Browser PDF Page Deletion",
    "Batch Upload and Deletion for Multiple PDF Documents",
    "Visual Thumbnail Grid with IntersectionObserver Lazy Loading",
    "Interactive Select and Delete Modes (Remove/Keep Selected, Odd, Even, Blank)",
    "Text Range Selection Sync (e.g., '1-5, 8, 12-14')",
    "DPI-accurate Real-time Page Gallery Zoom Controls",
    "Preserved or Customizable Document Metadata Panel",
    "Individual File Downloads and Batch ZIP Archive Exports",
    "Local History Logs saved in browser localStorage"
  ],
  useCases: [
    "Clean scanned documents by deleting blank or double-fed sheets.",
    "Remove confidential pages or private schedules before sharing reports with clients.",
    "Extract specific sections or chapters from large manuals and textbooks.",
    "Remove redundant cover pages or annex pages to reduce PDF file size.",
    "Edit bulk PDF print jobs to remove trailing blank template pages."
  ],
  howToSteps: [
    "Drag and drop one or more PDF files into the secure browser upload panel.",
    "Review the visual thumbnail grid of all pages loaded into your session.",
    "Click pages directly to highlight them, or enter page ranges in the text field.",
    "Select your preferred delete mode (Remove Selected, Keep Selected, etc.) in the options panel.",
    "Optionally enter a custom output name or edit PDF metadata fields in settings.",
    "Click the 'Remove Pages' button to compile the new document, then download your optimized PDF."
  ],
  examples: [
    {
      title: "Removing cover pages",
      description: "Delete the introductory blank/advertisement page of a corporate manual.",
      input: "12-page PDF with cover advertisements on pages 1 and 2.",
      output: "10-page optimized PDF starting directly with page 3 content."
    },
    {
      title: "Extracting contract sections",
      description: "Keep only pages 5 through 8 of a long contract for a client summary.",
      input: "25-page legal contract PDF document.",
      output: "4-page extracted contract PDF containing pages 5, 6, 7, and 8."
    }
  ]
};
