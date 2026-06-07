import { ToolConfig } from './types';

export const addPageNumbersPdfConfig: ToolConfig = {
  slug: "add-page-numbers-pdf",
  title: "Add Page Numbers to PDF",
  shortDescription: "Insert custom page numbers, headers, or footers into your PDF documents. Configure positions, offsets, fonts, styling, starting indices, and selective ranges locally in your browser.",
  category: "PDF Tools",
  keywords: [
    "Add Page Numbers to PDF", "PDF Page Numbering", "Number PDF Pages", "PDF Pagination Tool",
    "Insert Page Numbers in PDF", "PDF Page Number Generator", "add page numbers to document",
    "number pdf pages online", "free pdf page numbering", "customize pdf page numbers",
    "add headers to pdf", "add footers to pdf", "pdf page number positioning",
    "bates numbering pdf", "roman numerals pdf numbering", "batch number pdf files"
  ],

  longDescription: `
## The Complete Guide to Professional PDF Pagination and Document Structuring

In both academic research and professional business environments, document structure is a cornerstone of clarity, credibility, and compliance. The Portable Document Format (PDF), governed by the ISO 32000 standard, is the global format of choice for distributing official reports, legal briefs, scientific papers, and corporate contracts. However, when multiple documents are merged, edited, or compiled from diverse sources, they frequently lose their original page ordering. 

Adding page numbers—a process formally known as document pagination—re-establishes structure, making it possible to cite references, index tables of contents, and navigate voluminous files efficiently. Our **Add Page Numbers to PDF** utility offers a premium, browser-based, client-side solution that enables you to format, position, and burn custom page numbers directly into the binary layout of your documents. 

This comprehensive technical guide covers the inner structure of PDF pagination, standards across industries, design and placement strategies, and the critical security advantages of using local, client-side web compilers.

---

## 1. Under the Hood: How Page Numbering Works in PDF Objects

To understand how page numbers are applied to a PDF, we must examine the internal architecture of PDF objects. A PDF is not simply a static canvas; it is a serialized object database containing dictionaries, streams, and arrays. When you use our tool, the compilation engine does not draw on an image layer; it modifies the underlying object graph.

### The Catalog and Page Tree
Every PDF has a root object called the **Catalog** (the \`/Catalog\` dictionary). This catalog contains a reference to the **Page Tree** (the \`/Pages\` dictionary). The Page Tree is a balanced tree containing nodes representing each page in the document (the \`/Page\` dictionaries). Each page dictionary defines:
- **\`/MediaBox\`**: The physical dimensions of the page (usually in PostScript points, where 1 inch = 72 points).
- **\`/Resources\`**: References to resources required to render the page, including fonts, images, and graphics states.
- **\`/Contents\`**: A content stream (or array of streams) containing sequential drawing instructions.

### Appending Drawing Instructions
When inserting page numbers, our tool performs the following low-level modifications on each target page:
1. **Font Registration**: The tool embeds the chosen font (such as Helvetica, Times Roman, or Courier) into the page's \`/Resources /Font\` dictionary if it is not already present.
2. **Graphics State Modification**: It appends a set of graphics instructions to the end of the page's \`/Contents\` stream. These instructions save the current graphics state, define a fill color, specify font and font size operators, translate the cursor to the target coordinate, and render the page number text.
3. **Rotation Compatibility**: Many PDF pages contain a \`/Rotate\` property, which specifies that the page should be rotated (90, 180, or 270 degrees) during rendering. If text is written normally to a rotated page, it will appear sideways. Our engine analyzes the page's \`/Rotate\` parameter and mathematically transforms the drawing coordinates and text rotation angles so that the numbers are always placed in the correct visual corner and read horizontally.

---

## 2. Industry Standards for PDF Page Numbering

Pagination is not just a matter of personal preference; it is governed by formal formatting guidelines across various industries. Adhering to these conventions is critical for ensuring compliance and professional credibility.

### Academic Formatting Standards (APA, MLA, Chicago)
In scholarly writing, the position and style of page numbers are highly standardized:
- **APA Style**: Requires page numbers to be placed in the header (top-right corner) of every page. The number should be a simple Arabic numeral (1, 2, 3), and it must be positioned at least 1 inch from the page edge.
- **MLA Style**: Requires the page number to be placed in the header, right-aligned, preceded by the author's last name (e.g., "Smith 1"). It should be placed 0.5 inches from the top margin.
- **Chicago Style**: Offers flexibility, but commonly places page numbers in the footer (bottom-center) or header (top-right), omitting pagination on the title page.

### Legal and Court Filings (Bates Numbering)
In legal discovery and litigation, documents must be systematically indexed to prevent tampering and ensure clear cross-referencing. This is done using **Bates Numbering**:
- Bates numbering involves applying a unique, sequential identifier to each page of a legal document collection (e.g., "PLAINTIFF_000001", "PLAINTIFF_000002").
- Our tool supports custom numbering prefixes, suffixes, padding options (e.g., leading zeros like "001"), and starting offsets, allowing legal professionals to apply Bates-like indexing directly from their browser.

### Corporate and Financial Reports
Corporate financial declarations, annual reports, and marketing decks utilize pagination to improve navigation:
- **Dual-Numbering**: Frequently uses the "Page X of Y" format (e.g., "Page 4 of 24") in the footer, right-aligned or centered, to give readers immediate context on the document's total length.
- **Section Exclusions**: Excludes page numbers on cover sheets, executive summaries, or appendix dividers. The first page of the actual report is designated as Page 1, even if it is physically the second or third page in the PDF stream.

---

## 3. Design and Placement Best Practices

When configuring your page numbering settings, consider readability, printing constraints, and aesthetic harmony.

### Choosing the Right Position
Our tool supports 6 layout presets:
- **Footers (Bottom Left, Bottom Center, Bottom Right)**: The most common choice for business proposals, novels, and invoices. Bottom-center pagination is highly readable and keeps the page number out of the way of text content.
- **Headers (Top Left, Top Center, Top Right)**: Ideal for research manuscripts, academic papers, and multi-page letters. 
- **Binding Considerations**: If a document is intended for double-sided printing and binding (such as a book or manual), page numbers should alternate (e.g., top-left on even pages, top-right on odd pages). Our tool supports applying different page numbers to odd and even page ranges, allowing you to run two sequential pagination passes to support alternate-side layouts.

### Font and Color Settings
- **Typography**: Page numbers should match or complement the document's primary body font. Helvetica is a safe sans-serif choice for modern reports, while Times Roman offers a classic, authoritative feel for academic papers.
- **Sizing**: Keep numbers unobtrusive. A font size of 9pt to 11pt is professional. Avoid large text sizes that distract from the main page content.
- **Color and Opacity**: Pure black (#000000) is standard, but you can use dark grey (#333333) or adjust the opacity slider to 60-70% to make the numbers look softer and integrate better with the background.

---

## 4. Why 100% Client-Side Processing is Essential for PDF Security

Traditional online PDF converters require you to upload your files to their web servers, where they are queued, processed, and cached. This poses significant privacy risks for sensitive files:
- **Corporate Contracts**: Invoices, trade secrets, and non-disclosure agreements should never be transmitted to third-party endpoints.
- **Legal Discovery Files**: Sensitive client litigation material is subject to strict confidentiality laws.
- **Academic Research**: Pre-publication findings and dissertation drafts are intellectual property that must remain secure.

Our **Add Page Numbers to PDF** tool resolves these security issues by executing 100% in local browser memory.
- **Zero Uploads**: Your files never leave your computer. The WebAssembly or JavaScript engines running in your browser compile the PDF bytes locally.
- **No Data Retention**: Because there is no backend server caching your files, there is zero risk of data leaks, security breaches, or unauthorized file access.
- **Instant Processing**: Without network upload or download latencies, large PDF files are parsed and numbered in milliseconds.

---

## Conclusion

Structured pagination is essential for creating professional documents. By using our client-side **Add Page Numbers to PDF** tool, you can apply industry-standard page indexing, customize layouts, configure selective page ranges, and preserve document metadata—all while maintaining absolute file privacy in your local browser sandbox.
`,
  relatedTools: [
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Organize PDF", slug: "organize-pdf" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Watermark PDF", slug: "watermark-pdf" },
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Unlock PDF", slug: "unlock-pdf" }
  ],
  features: [
    "100% secure client-side PDF page numbering in local browser memory",
    "Choose formatting styles: Arabic numbers, padded values, prefix labels, Roman numerals, and Alphabetical sequences",
    "6 coordinate positioning grid presets with precise X/Y pixel offset adjustments",
    "Adjust appearance settings: font size, font family, hex color, opacity, bold, and italic weights",
    "Target page options: apply numbering to all pages, odd pages, even pages, or a custom page range",
    "Start numbering configuration (start from 1, 10, 100, etc.)",
    "Set margin exclusions: option to skip first (cover) or last pages",
    "Interactive live preview screen displaying rendered PDF canvases using PDF.js via CDN",
    "Real-time visual HTML page number overlay for precise alignment feedback",
    "Multi-file batch uploading with ZIP packaging or sequential downloading",
    "Maintains source PDF metadata fields including author, title, subject, and creation dates"
  ],
  useCases: [
    "Insert page numbers in the header of research articles to meet APA or MLA guidelines.",
    "Add 'Page X of Y' footers to corporate reports for clear length indicators.",
    "Sequence legal documents with padded numeric stamps for courtroom submissions.",
    "Banish page numbering from the first page to keep cover sheets professional.",
    "Prepare ebooks or guides with soft grey Roman numerals in preface sections."
  ],
  howToSteps: [
    "Upload one or more PDF files into our secure browser-based dropzone.",
    "Select page numbering styles: choose Arabic, Roman numerals, or Alphabetical sequences.",
    "Set position presets (e.g., bottom-center or top-right) and adjust spacing margins.",
    "Configure typography: pick font sizes, colors, opacity, and weight formats.",
    "Specify your target page range, start index number, and cover page exclusions.",
    "Click the 'Add Page Numbers' button to compile the pagination locally and download your files."
  ],
  examples: [
    {
      title: "Academic Manuscript Prep",
      description: "Insert right-aligned headers on every page of a scientific article.",
      input: "A 20-page dissertation manuscript with no page numbering.",
      output: "A 20-page document with Helvetica page numbers (1-20) right-aligned in the top header on every page."
    },
    {
      title: "Corporate Proposal Pagination",
      description: "Apply 'Page X of Y' centered footer numbers, skipping the cover sheet.",
      input: "A 12-page business proposal containing a cover sheet.",
      output: "A 12-page PDF where the cover page has no numbering, and pages 2 through 12 show centered footers reading 'Page 2 of 12' through 'Page 12 of 12'."
    }
  ],
  faq: [
    {
      question: "Is this Add Page Numbers tool free to use?",
      answer: "Yes, our page numbering tool is completely free. There are no fees, subscriptions, or hidden charges."
    },
    {
      question: "Are my files uploaded to your servers to be numbered?",
      answer: "No. The entire numbering process takes place locally inside your browser using pdf-lib and PDF.js. Your document bytes never leave your device."
    },
    {
      question: "Which page numbering styles are supported?",
      answer: "We support standard Arabic numerals (1, 2, 3), padded zeros (01, 02, 03), prefixed ('Page 1'), total indicators ('Page 1 of 10'), uppercase Roman numerals (I, II, III), lowercase Roman numerals (i, ii, iii), and Alphabetical letters (A, B, C)."
    },
    {
      question: "Can I skip putting page numbers on the first page?",
      answer: "Yes. You can select the 'Skip First Page' option to prevent page numbers from appearing on cover pages or title sheets."
    },
    {
      question: "Can I skip putting page numbers on the last page?",
      answer: "Yes. There is a 'Skip Last Page' option which is ideal for ignoring back cover sheets, appendix dividers, or blank ending pages."
    },
    {
      question: "Can I target page numbers to odd or even pages only?",
      answer: "Yes. You can apply numbering exclusively to odd pages, even pages, or specify a custom range (like 2-10)."
    },
    {
      question: "How do I specify a custom page range?",
      answer: "You can write standard page sequence expressions. For example, '2-10' applies numbering from page 2 to page 10, while '2-5, 8, 11-15' applies it selectively to those specific page indices."
    },
    {
      question: "Which font families can I choose from?",
      answer: "We support the standard PDF fonts: Helvetica, Times Roman, and Courier. These fonts are universally supported by PDF readers and compile extremely quickly."
    },
    {
      question: "Can I change the font size and color?",
      answer: "Yes. You can customize the font size (using a slider), color (via a hex color picker), opacity (transparency slider), and toggle bold or italic styles."
    },
    {
      question: "Can I choose where on the page the numbers go?",
      answer: "Yes. You can choose from 6 layout presets: Top Left, Top Center, Top Right, Bottom Left, Bottom Center, and Bottom Right."
    },
    {
      question: "What does the offset adjustment do?",
      answer: "The X and Y offset sliders allow you to fine-tune the page numbers' margins in pixels/points. You can shift the numbers further away from or closer to the edges."
    },
    {
      question: "Can I choose my starting page number?",
      answer: "Yes. You can define any starting index (like 1, 10, 100, or 1000) under the 'Start From' setting."
    },
    {
      question: "Does this tool work on scanned PDF documents?",
      answer: "Yes. Since page numbers are applied as a fresh vector overlay text layer, it will render cleanly over both text-heavy and scanned image-based PDFs."
    },
    {
      question: "Will adding page numbers affect the original quality of my images?",
      answer: "No. The document's original elements, images, and text content are preserved at 100% resolution. We only append numbering stream commands without compressing pages."
    },
    {
      question: "Does the tool support batch uploading?",
      answer: "Yes. You can select multiple PDF files at once. The tool applies your pagination styling to all files in the batch."
    },
    {
      question: "How are batch files exported?",
      answer: "If you upload a single file, it downloads directly. If you process multiple files, the tool packages all numbered PDFs into a single ZIP archive for easy download."
    },
    {
      question: "Does it work with rotated pages?",
      answer: "Yes. Our engine checks the /Rotate dictionary of each page and adjusts the drawing coordinate system so that the page numbers are placed upright in the visual corners."
    },
    {
      question: "Can I use this page numbering tool on my mobile phone?",
      answer: "Yes. Our responsive design operates fully on smartphones, tablets, laptops, and desktop browsers."
    },
    {
      question: "Will adding page numbers break links or bookmarks?",
      answer: "No. The original link references, annotations, interactive forms, and table-of-contents bookmarks are preserved intact."
    },
    {
      question: "What is the maximum file size limit?",
      answer: "Since processing happens locally on your computer, there is no fixed server upload limit. The only constraint is your device's browser memory."
    },
    {
      question: "Why does pdf-lib fail with some encrypted PDFs?",
      answer: "Password-protected files are encrypted to prevent unauthorized modification. You must unlock them using our Unlock PDF tool before page numbers can be added."
    },
    {
      question: "How does the live preview work?",
      answer: "We render the PDF pages onto an HTML5 canvas using PDF.js via CDN. We then draw a matching visual overlay representing where the page numbers will sit based on your configurations."
    },
    {
      question: "Can I zoom in or out in the live preview?",
      answer: "Yes, the live preview features zoom buttons (Zoom In, Zoom Out, Fit) to help you check formatting details."
    },
    {
      question: "Are custom font files (.ttf, .otf) supported?",
      answer: "To ensure fast rendering, low bundle size, and offline speed, we restrict choices to the standard built-in PDF fonts (Helvetica, Times, Courier) which load instantly."
    },
    {
      question: "What does the opacity setting do?",
      answer: "It allows you to make the page numbers semi-transparent, so they do not block header or footer text that they might overlap."
    },
    {
      question: "Does it support adding prefixes like 'Draft Page'?",
      answer: "Yes. Our styles include formatting options that let you prefix custom terms, or you can write standard numbering templates."
    },
    {
      question: "Can I use alphabetical pagination for preface sheets?",
      answer: "Yes. You can use 'Alphabetical (A, B, C)' or Roman numerals for prefaces, and then run a second numbering pass with Arabic numerals for the rest of the book."
    },
    {
      question: "Does it preserve PDF metadata?",
      answer: "Yes. Existing document metadata fields (Title, Creator, Author, Subject) are retained during compilation."
    },
    {
      question: "Is there any software installation required?",
      answer: "No. The tool is 100% web-based and runs in any modern browser (Chrome, Firefox, Safari, Edge) without extensions or plugins."
    },
    {
      question: "Will it work if I am offline?",
      answer: "Yes. Once the page is loaded, the logic is stored in your local browser sandbox. You can disconnect from the internet and still paginate PDFs."
    },
    {
      question: "What should I do if my PDF has different sized pages?",
      answer: "Our tool checks the size of each page dynamically. The page numbers are placed relative to each page's specific dimensions, keeping pagination aligned on mixed letter/A4 documents."
    },
    {
      question: "Can I use Roman numerals for some pages and Arabic for others?",
      answer: "Yes. You can run one numbering pass with Roman numerals targeted at a custom page range, download it, and then run a second pass with Arabic numbers on the remaining pages."
    }
  ]
};
