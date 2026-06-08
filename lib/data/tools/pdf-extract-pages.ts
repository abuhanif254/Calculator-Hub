import { ToolConfig } from './types';

export const pdfExtractPagesConfig: ToolConfig = {
  slug: "pdf-extract-pages",
  title: "PDF Extract Pages",
  shortDescription: "Extract specific pages, page ranges, or multiple selections from a PDF file. Save selections as a single combined PDF, separate files, or separate ranges locally.",
  category: "PDF Tools",
  keywords: [
    "PDF Extract Pages", "Extract PDF Pages", "PDF Page Extractor", "Save PDF Pages",
    "Extract Pages from PDF", "PDF Page Separator", "Save Selected PDF Pages", "split pdf ranges",
    "extract pages pdf free", "extract pages from pdf locally", "extract page range pdf",
    "select pdf pages and save", "save single pages from pdf", "pdf page splitter ranges"
  ],

  longDescription: `
## The Comprehensive Guide to PDF Page Extraction: Document Object Model, Serialization, and Security

In standard digital publishing, PDF (Portable Document Format) is the gold standard for presenting documents consistently across different operating systems. However, the monolithic nature of a PDF often means that users need to separate, segment, or isolate specific portions of a large file for distribution, archival, or editing. PDF page extraction is the technical process of parsing a source PDF's internal object tree, identifying target page references, resolving resource mappings, and serializing a new document containing only the desired pages.

Under the ISO 32000 specification governing the PDF format, page extraction requires careful structural manipulation. It is not as simple as cutting binary chunks of a file; instead, it is a complex operation involving the traversal of parent-child node relationships in the document catalog.

This guide provides an in-depth analysis of PDF page tree structures, page cloning algorithms, resource inheritance models, the privacy hazards of un-sanitized document histories, and the security benefits of client-side web browser processing.

---

## 1. Under the Hood: The PDF Document Object Model and Page Trees

To understand how pages are extracted from a PDF, one must understand how a PDF represents pages at a structural level.

A PDF is essentially a structured tree of indirect objects. The root of this tree is the **Catalog** object (referenced in the trailer). The catalog contains references to all top-level structures, including outlines (bookmarks), forms, interactive fields, and the **Page Tree**.

\`\`\`mermaid
graph TD
    Catalog[Catalog Dictionary /Root] --> PagesNode[Pages Node /Type /Pages]
    PagesNode --> Page1[Page 1 Object /Type /Page]
    PagesNode --> Page2[Page 2 Object /Type /Page]
    PagesNode --> PagesSubNode[Sub-Pages Node /Type /Pages]
    PagesSubNode --> Page3[Page 3 Object /Type /Page]
    PagesSubNode --> Page4[Page 4 Object /Type /Page]
\`\`\`

### The \`/Pages\` and \`/Page\` Objects
Under the specification, the page tree is built from two types of nodes:
1. **Intermediate Nodes (\`/Pages\`)**: These act as folders. They contain a list of children (under the \`/Kids\` array) and a count of all pages in their descendant sub-tree (under the \`/Count\` key).
2. **Leaf Nodes (\`/Page\`)**: These represent individual pages. They contain the page contents (text, vector graphics, images) and references to resources needed to draw them.

A typical leaf page object looks like this:
\`\`\`text
4 0 obj
<<
  /Type /Page
  /Parent 3 0 R
  /Resources 5 0 R
  /MediaBox [0 0 612 792]
  /Contents 6 0 R
>>
endobj
\`\`\`

- **\`/Parent\`**: A reference back to the parent intermediate node.
- **\`/Resources\`**: A dictionary referencing the fonts, images, and color spaces used on the page.
- **\`/MediaBox\`**: An array defining the physical boundaries of the page in points (e.g., 612 x 792 points is standard Letter size).
- **\`/Contents\`**: A stream object containing the low-level rendering instructions (operators) for placing text and drawing images.

### Resource Inheritance
One of the complexities of page extraction is **Resource Inheritance**. To save space, PDF writers often specify resources (like fonts or margins) at the parent intermediate node level instead of repeating them in every leaf page object. 

If an extraction engine simply copies a page object without resolving resources defined in its parents, the page will fail to render, showing missing text or generic fonts. A professional extraction engine must traverse up the parent tree, collect all inherited resources, and merge them directly into the extracted page's resource dictionary.

---

## 2. Page Extraction Algorithms: Cloning, Page Trees, and Cross-Document Reference Matching

When extracting pages (e.g. pages 2 and 4) to create a new PDF, the extraction engine performs several steps:

### Traversal and Identification
The engine starts at the catalog root and follows the kids array to locate page indices 2 and 4. It retrieves their indirect object numbers.

### Deep Cloning and Reference Mapping
A PDF object cannot simply be copy-pasted because objects are cross-referenced using unique numbers (object numbers and generation numbers, e.g., \`4 0 obj\`). If we copy object 4 into a new document, its references to fonts (object 5) and contents (object 6) must be mapped to new unique object numbers in the target document.

The engine performs a **Deep Clone** of the page object:
1. It copies the page dictionary.
2. If it encounters a reference to another object (like a font stream or image), it creates a copy of that referenced object in the new document's body.
3. It keeps a translation map to ensure that if multiple pages reference the same font, it is only copied once to prevent file size bloat.

### Constructing the New Page Tree
Once all selected pages and their dependent resources are cloned, the engine creates a new catalog root and a new \`/Pages\` intermediate node. The kids array of this new node is populated with the cloned page objects, the count is set to the number of extracted pages, and the trailer is compiled with a cross-reference table matching all new object offsets.

\`\`\`text
% New PDF trailer mapping
trailer
<<
  /Size 15
  /Root 1 0 R
>>
\`\`\`

---

## 3. Privacy, Security, and Compliance Risks in PDF Segmenting

Splitting or extracting pages is common in legal, financial, and corporate workflows. However, if not performed using professional tools, page extraction can leak sensitive information.

### Un-Sanitized Object References
When pages are extracted, some PDF tools only remove the visual page references from the kids array but leave the actual page objects and contents streams in the file body. Although the page is invisible in standard readers, the raw text and images are still present in the binary file and can be recovered easily. 

A professional extraction tool must perform **Garbage Collection**, ensuring that any objects not referenced in the new page tree are completely deleted from the exported file.

### Structural Annotation Leakage
PDF annotations, form fields, and digital signatures are often stored in document-wide arrays in the catalog root. If a tool extracts pages but forgets to strip or filter the annotation references, confidential comments or signatures from non-extracted pages may remain attached to the new file.

### Metadata Synchronization
Like standard documents, extracted PDFs must have their metadata checked. Timestamps, author names, and custom tracking parameters should be synchronized with the new smaller document to ensure version control compliance (such as ISO 19005 digital archiving standards).

---

## 4. Extraction Modes: Designing Multi-Purpose Workflows

An enterprise-grade extraction tool must support different extraction modes to fit various business requirements:

### Extract as a Single Combined PDF
The user selects specific pages (e.g., pages 1, 3, 5) and page ranges (e.g., 8-10). The tool compiles these selected pages into a single new document. This is ideal for extracting a chapter of a book or assembling an invoice bundle.

### Extract Each Page Separately
The user selects a set of pages, and the tool compiles every page into its own individual PDF. For a 10-page selection, this generates 10 separate PDFs. This is perfect for splitting a bulk batch of scanned receipts or individual employee payslips.

### Extract Ranges Separately
The user defines distinct ranges (e.g., \`1-3, 5-8, 12-15\`). Each range is compiled into its own document, resulting in three separate files: one with pages 1-3, one with pages 5-8, and one with pages 12-15. This is useful for splitting a multi-section contract into its component modules.

---

## 5. Local Client-Side Processing: Zero-Trust Document Processing

Many online PDF utilities require users to upload their documents to a remote server. While convenient, this model introduces massive security, legal, and operational vulnerabilities.

### Corporate Governance and NDAs
Uploading financial reports, trade secrets, patient health records, or legal drafts to a third-party server violates non-disclosure agreements (NDAs) and corporate information security policies.

### Regulatory Compliances
Uploading documents containing personally identifiable information (PII) violates strict regulatory frameworks like the General Data Protection Regulation (GDPR), the Health Insurance Portability and Accountability Act (HIPAA), and local data privacy laws.

### The Client-Side Solution
Our **PDF Extract Pages** tool operates on a zero-trust model. By utilizing local compilation inside your web browser:
1. **No Data Leakage**: Your PDF files are read from your disk straight into the browser's sandbox memory. They are never sent over the internet or cached on any remote servers.
2. **Lightning-Fast Speed**: Large documents containing hundreds of pages can be parsed, rendered, and extracted in milliseconds because there is no network latency.
3. **Offline Reliability**: Since the processing code runs locally, you can disconnect from the internet and continue extracting pages offline, ensuring maximum productivity.

---

## Summary of Core Best Practices
- **Inspect Thumbnails**: Always preview page thumbnails before extraction to ensure correct page alignments.
- **Clean Unused Objects**: Ensure your extraction tool performs thorough garbage collection to delete residual content from deleted pages.
- **Match the Right Mode**: Use Combined mode for compilations, and Separate or Range mode for parsing multi-recipient documents.
- **Choose Client-Side Tools**: Protect sensitive PII by performing all document splitting locally inside your private network perimeter.
`,

  faq: [
    {
      question: "How do I extract pages from a PDF?",
      answer: "Select or drag and drop your PDF file into the uploader, click on the thumbnails of the pages you wish to extract (or type the page ranges into the text input box), choose your extraction mode (Single PDF, Separate PDFs, or Separate Ranges), and click 'Extract Pages' to download your new documents instantly."
    },
    {
      question: "Can I select multiple pages for extraction?",
      answer: "Yes. You can click on as many individual page thumbnails as you like. You can also use Shift + Click to select page ranges, or type comma-separated values (e.g., '1,3,5,7') in the selection input box."
    },
    {
      question: "Can I save extracted pages as separate PDF files?",
      answer: "Yes. By choosing the 'Extract Each Page Separately' mode, the tool will compile every selected page into its own individual PDF document. If you select multiple pages, they will be downloaded together inside a ZIP archive."
    },
    {
      question: "Is this PDF Page Extractor tool free?",
      answer: "Yes, this tool is 150% free. There are no subscriptions, registration requirements, file size limits, page count restrictions, or watermark additions."
    },
    {
      question: "Are my PDF files secure and private?",
      answer: "Yes, absolutely. This tool operates 100% client-side inside your web browser. Your PDFs are never uploaded to any remote server; they are parsed, rendered, and compiled locally on your device, ensuring complete privacy."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes, the PDF Extract Pages tool is fully responsive and optimized for mobile phones, tablets, and desktop computers. Mobile uploads can be selected via your system file manager."
    },
    {
      question: "Are my files stored on your servers?",
      answer: "No. Since all operations run locally in your web browser, our servers have no access to your files. Once you close the tab, the document data is completely cleared from your browser's temporary memory."
    },
    {
      question: "Can I extract pages from large PDFs containing hundreds of pages?",
      answer: "Yes. The client-side parser easily handles large PDFs containing hundreds of pages. The rendering system uses lazy loading for thumbnails, ensuring smooth scrolling and fast processing."
    },
    {
      question: "Can I preview pages before extracting them?",
      answer: "Yes. The tool generates high-quality thumbnails for every page in your PDF. You can zoom in/out, fit to screen, and switch between grid and list layouts to inspect page details before extracting."
    },
    {
      question: "Can I extract custom page ranges?",
      answer: "Yes. You can enter custom page ranges using standard range syntax (e.g., '1-5', '10-20', '35-50') or combined syntaxes (e.g., '1-5,8,12-15') in the range selection input box."
    },
    {
      question: "What is the difference between extracting pages and splitting a PDF?",
      answer: "Extracting pages allows you to select specific pages (e.g., pages 2 and 5) and save only those pages. Splitting a PDF typically means cutting a PDF at fixed intervals (e.g., every 5 pages) or dividing the entire document into equal parts."
    },
    {
      question: "Does page extraction preserve the original formatting and layout?",
      answer: "Yes. The extraction engine deep-copies the selected page structures, including their content streams, embedded fonts, vectors, and image resources. The visual formatting, text searchability, and layouts remain identical to the original."
    },
    {
      question: "Can I extract pages from password-protected PDFs?",
      answer: "Yes. If a PDF is encrypted or password-protected, the tool will prompt you to enter the document password before it can parse the file and display thumbnails."
    },
    {
      question: "What is the 'Extract Ranges Separately' mode?",
      answer: "This mode compiles each defined range into its own separate PDF. For example, if you input '1-3, 5-8', it will generate two PDFs: one containing pages 1-3, and another containing pages 5-8."
    },
    {
      question: "How do I select all pages quickly?",
      answer: "You can click the 'Select All' button in the toolbar, or use the keyboard shortcut 'Ctrl + A' to select all pages instantly."
    },
    {
      question: "Is there a shortcut to clear my current selection?",
      answer: "Yes. You can click the 'Deselect All' button in the toolbar, or use the 'Delete' key on your keyboard to clear all selections."
    },
    {
      question: "Does the extracted PDF retain the hyperlinks from the original?",
      answer: "Yes. Page-specific annotations, including hyperlinks and internal navigation links, are copied along with the selected pages."
    },
    {
      question: "Can I filter pages by odd or even numbers?",
      answer: "Yes. The tool features smart filters to select all 'Odd Pages' or 'Even Pages' with a single click."
    },
    {
      question: "Can I select pages using keyboard shortcuts?",
      answer: "Yes, you can use 'Ctrl + A' to select all pages, 'Delete' to clear selections, 'Ctrl + S' to trigger the extraction process, and hold 'Shift' while clicking thumbnails to select ranges visually."
    },
    {
      question: "What happens to the metadata of the extracted PDF?",
      answer: "By default, the tool copies standard metadata (Title, Author, Subject, Keywords) from the original PDF to the newly created document."
    },
    {
      question: "Will the size of my extracted PDF be smaller?",
      answer: "Yes. Since you are only saving a subset of pages, the resulting PDF file size will be significantly smaller than the original document."
    },
    {
      question: "Does this tool support batch processing of multiple PDFs?",
      answer: "Yes. You can upload multiple PDFs at once. You can select pages and extract them from each file in the batch list individually, and download the results together in a ZIP file."
    },
    {
      question: "Can I extract pages from scanned PDFs?",
      answer: "Yes. Scanned PDFs are structured in the same way as text-searchable PDFs. The tool will render page thumbnails and extract pages without altering the scanned images."
    },
    {
      question: "Does the extractor compress the images inside the PDF?",
      answer: "No. To preserve the original quality, the tool does not compress or alter the images. If you need a smaller file size, you can use our 'Compress PDF' tool after extraction."
    },
    {
      question: "Can I save my selection settings as a preset?",
      answer: "Yes. You can save your current page ranges as a selection preset in your browser's LocalStorage, making it easy to apply the same ranges to future documents."
    },
    {
      question: "Is there a limit on the number of PDFs I can upload?",
      answer: "There is no hard limit on the number of files you can process. However, because processing runs client-side, batch size is limited only by your device's memory."
    },
    {
      question: "What happens if a PDF is corrupted?",
      answer: "If the PDF's internal object structure is severely corrupted, the parser will throw an error and display a user-friendly alert, rather than crashing."
    },
    {
      question: "Does the tool support PDF/A conformance?",
      answer: "Yes, standard pages from a PDF/A document are cloned with their original color profiles and font references, preserving PDF/A conformance."
    },
    {
      question: "Can I work offline with this tool?",
      answer: "Yes. Once the web page is loaded, the entire extraction engine runs locally in your browser, allowing you to disconnect from the internet and work offline."
    },
    {
      question: "Why should I use a client-side extractor instead of Acrobat?",
      answer: "Adobe Acrobat is a premium, paid desktop application. Our tool offers a fast, free, web-based alternative that runs in any browser on any device. It processes files locally in seconds, offering the same security and privacy as a desktop app without requiring any software installation."
    },
    {
      question: "What is a page content stream in PDF structure?",
      answer: "A content stream is a binary stream containing a sequence of vector instructions, text placements, and image draw operators that define the visual layout of a page."
    },
    {
      question: "Can I undo or clear my visual selection?",
      answer: "Yes. You can click on a selected thumbnail again to deselect it, or click 'Deselect All' to clear your entire selection."
    },
    {
      question: "How does the tool handle outline bookmarks when pages are extracted?",
      answer: "Standard extraction copies page objects and keeps page-level links. Document-wide bookmarks that point to non-extracted pages are automatically pruned to prevent broken navigation."
    },
    {
      question: "Are metadata presets saved on your servers?",
      answer: "No. Any selection presets or local history items are stored securely in your browser's LocalStorage and are never uploaded."
    },
    {
      question: "How long are my files kept in memory?",
      answer: "Files are held in the browser's temporary heap memory only while the tab is open. They are destroyed immediately when you close the browser tab or click 'Clear Files'."
    }
  ],

  relatedTools: [
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Organize PDF", slug: "organize-pdf" },
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Remove PDF Pages", slug: "remove-pdf-pages" },
    { name: "Rotate PDF", slug: "rotate-pdf" },
    { name: "Watermark PDF", slug: "watermark-pdf" },
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Unlock PDF", slug: "unlock-pdf" }
  ],

  features: [
    "100% secure client-side browser execution—no file uploads",
    "Extract specific pages, page ranges, or multiple selections",
    "Define selections visually by clicking thumbnails or textually using ranges",
    "Three extraction modes: Combined PDF, Separate PDFs, or Separate Ranges",
    "Render high-quality thumbnails with zoom controls and layout switchers",
    "Smart page filters: Odd, Even, First N, Last N pages",
    "Shift + Click range selection and keyboard shortcuts support",
    "Local history log and saved selection presets (LocalStorage)",
    "Automatic output optimization preserving original quality and layouts",
    "Zip packaging for separate page outputs"
  ],

  useCases: [
    "Extract a specific chapter or range of pages from a large academic textbook",
    "Separate a bulk batch of scanned receipts into individual separate PDF files",
    "Isolate specific pages of a legal contract containing signatures for distribution",
    "Extract the summary sections of a corporate annual report for stakeholder review",
    "Parse multi-recipient invoice PDFs into individual invoices securely and privately",
    "Automate standard page-splitting templates using saved selection presets"
  ],

  howToSteps: [
    "Select or drag and drop your PDF files into the upload box.",
    "View the generated page thumbnails in the workspace.",
    "Click thumbnails to select pages, hold Shift to select ranges, or type range text (e.g. '1-3,5').",
    "Apply smart filters like 'Odd Pages' or 'Even Pages' if needed.",
    "Choose your extraction mode: Combined PDF, Separate PDFs, or Separate Ranges.",
    "Click 'Extract Pages' to process your files locally and download the output."
  ],

  examples: [
    {
      title: "Isolating Specific Pages",
      description: "Extract only page 2 and page 5 to share with a client.",
      input: "Upload: proposal.pdf (8 pages)\nSelection: 2, 5\nMode: Single PDF",
      output: "proposal_extracted.pdf (2 pages: containing original pages 2 and 5)"
    },
    {
      title: "Splitting Pages Separately",
      description: "Separate a scanned ledger into individual page records.",
      input: "Upload: ledger.pdf (3 pages)\nSelection: 1-3\nMode: Separate PDFs",
      output: "ledger_extracted.zip containing:\n- ledger_page_1.pdf\n- ledger_page_2.pdf\n- ledger_page_3.pdf"
    }
  ]
};
