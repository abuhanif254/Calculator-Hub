import { ToolConfig } from './types';

export const splitPdfConfig: ToolConfig = {
  slug: "split-pdf",
  title: "Split PDF",
  shortDescription: "Split PDF pages into separate documents or extract specific pages securely. 100% browser-based processing ensures absolute document privacy.",
  category: "PDF Manipulation Tools",
  keywords: [
    "Split PDF", "PDF splitter", "PDF page splitter", "extract PDF pages", "separate PDF pages",
    "online PDF split tool", "PDF page extractor", "split PDF pages free", "cut PDF files",
    "divide PDF document", "secure PDF splitter", "browser-based PDF tools", "PDF document management",
    "extract pages from PDF", "how to split a PDF", "PDF divider", "PDF organizer", "business document workflows",
    "extract custom page ranges", "compress and split PDF", "client-side PDF splitting", "mobile PDF editor"
  ],

  longDescription: `
## Comprehensive Guide to Splitting PDF Documents

In the modern digital workspace, the Portable Document Format (PDF) stands as the universal standard for sharing documents. Created by Adobe in the early 1990s, the PDF format was designed to present documents—including text formatting and images—in a manner independent of application software, hardware, and operating systems. This consistency is exactly what makes PDFs so powerful, but it also makes them notoriously difficult to modify. 

Often, you will receive a massive PDF document containing hundreds of pages, only a fraction of which are relevant to your current task. Whether it is a giant textbook, a corporate annual report, a legal contract packet, or a scanned set of financial statements, you frequently need to divide the document into smaller, more manageable parts. 

Our **Split PDF** utility is engineered to solve this exact problem. Operating entirely within your web browser, this tool allows you to slice, dice, extract, and partition any PDF file with professional-grade precision—completely free, with no signup, and with ironclad privacy.

---

## The Core Mechanisms of PDF Splitting Explained

To understand how our tool divides a document, it is helpful to look under the hood of a PDF's file structure. A PDF file is not just a collection of images or a continuous text flow; it is an organized database of objects. These objects include:
- **Catalog**: The root of the document's object hierarchy.
- **Pages tree**: A node-based structure that defines the order and attributes of every page in the document.
- **Content streams**: The actual instructions that draw text, shapes, and images on each page.
- **Resources**: Shared assets such as fonts, color spaces, and images used by the pages.

When you use a generic online PDF splitter, many systems will simply render the pages as raster images and recombine them. This destructive process ruins text searchability (OCR), breaks hyperlinks, degrades image quality, and inflates the file size.

**Our tool uses binary stream extraction.** It leverages \\\`pdf-lib\\\` to read the document's structure at a byte level. When you specify a split configuration, our engine performs the following actions:
1. It loads the source PDF as an array buffer.
2. It parses the object tree to identify the target pages.
3. It copies the precise page objects, content streams, and underlying resources (like embedded fonts and vector shapes) directly into a new, empty PDF container.
4. It updates the document catalog, cross-reference tables, and page pointers to ensure the new file is fully compliant with the ISO 32000 standard.
5. It outputs the compiled binary stream as a downloadable file.

By manipulating the object tree directly instead of rendering the document, **the visual layout, text searchability, forms, annotations, and original image resolutions are preserved at 100% fidelity.**

---

## 100% Browser-Based Processing: A Revolution in Privacy

The greatest drawback of traditional online file converters is the security risk. When you upload a document containing sensitive tax documents, medical records, or business contracts to a server-based utility, you surrender control of that data. Your file travels across the internet, is stored on a remote server, processed, and then kept in cache memory for minutes or hours. This opens up vulnerabilities for data breaches, unauthorized logs, and compliance violations.

**Our Split PDF tool is 100% client-side.** Once the webpage is loaded in your browser, the entire file parsing, rendering, and rebuilding process occurs locally within your computer's RAM. 
- **No file upload**: Your document is read by the local JavaScript engine. It is never sent over the network.
- **Instant execution**: Because there is no network transfer delay, files split in milliseconds.
- **Offline operation**: You can disconnect your internet entirely after loading the page and the tool will continue to split files flawlessly.
- **Strict compliance**: This local architecture makes our tool naturally compliant with data privacy frameworks like **GDPR, HIPAA, and CCPA**, as no personal data is collected or transmitted.

---

## Four Powerful Splitting Modes to Streamline Workflows

Different tasks require different splitting methods. To cover every possible use case, our utility features four distinct operational modes:

### 1. Extract Specific Pages
This mode is perfect for pulling a few selective pages out of a larger file. For example, if you have a 50-page brochure and only want pages 2, 7, and 12-15, you can enter \\\`2, 7, 12-15\\\` into the input field or visually click those thumbnails in our interactive grid. The tool will bundle only those selected pages into a single, cohesive new PDF.

### 2. Split by Page Ranges
Often, you need to divide a document into multiple sections. For instance, you might want to split a report into three parts: Range 1 (\\\`1-10\\\`), Range 2 (\\\`11-25\\\`), and Range 3 (\\\`26-50\\\`). Our tool will generate three separate, clean PDF files matching these boundaries and package them into a single, compressed ZIP download.

### 3. Split Every Page (Separate All Pages)
For scanning workflows or document archiving, you may need to break a multi-page document into individual, single-page PDFs. Our engine will split a 10-page document into 10 separate PDFs named sequentially (e.g., \\\`document-part-1.pdf\\\` through \\\`document-part-10.pdf\\\`) and compress them into a ZIP archive for immediate bulk download.

### 4. Split by Page Interval
If you have a massive PDF containing monthly invoices or weekly worksheets where each document is exactly 5 pages long, you can use the interval splitter. Setting the interval to \\\`5\\\` will instruct the tool to automatically divide a 100-page document into 20 separate 5-page PDFs, saving you from entering dozens of custom ranges manually.

---

## Advanced Output Customization & Optimization

A professional utility must provide options to organize and optimize the output. Our tool includes several advanced settings:
- **Custom Filename Prefix**: Define the naming pattern for your output files. You can enter a base name like \\\`Q3_Financials_Page\\\` and the tool will automatically append sequence numbers (e.g., \\\`Q3_Financials_Page_1.pdf\\\`, \\\`Q3_Financials_Page_2.pdf\\\`).
- **File Size Optimization**: Our compiler automatically detects duplicate fonts, styling dictionaries, and layout descriptors across pages. When you split or extract pages, the engine consolidates these shared structures, stripping out redundant overhead to keep the resulting file sizes as lightweight as possible.
- **Dynamic Previews**: Thanks to our integrated canvas-based rendering engine, you can visually inspect every page before splitting. You can zoom in to read small print, select pages visually, and drag your cursor to select multiple pages in a grid, making manual page number typing a thing of the past.

---

## Essential for Every Profession

Optimized document handling is a cornerstone of productivity across multiple fields:

### Business and Finance
Corporate departments routinely handle compiled documents such as board packs, audit files, and accounting ledgers. When presenting to clients, developers, or stakeholders, sharing a bloated file looks unprofessional and can expose confidential internal pages. Splitting the PDF lets you package only the relevant summaries, invoices, or slide decks, keeping your communications targeted and secure.

### Legal and Real Estate
Law firms and real estate agents deal with massive contracts, mortgage deeds, disclosure packets, and title deeds. These documents must be signed, notarized, and filed with different government registries or client portals that enforce strict size limits. Splitting large agreements into individual exhibits or single disclosures is a daily requirement.

### Academics and Students
Students and academic researchers navigate massive textbooks, research journals, and syllabus guides. Reading a 600-page textbook on a mobile device or e-reader can lag the device and make navigation difficult. By splitting the book into chapters, students can load only the current week's readings onto their tablets, keeping their study workflows fast and focused.

Enhance your productivity, safeguard your document privacy, and master your file layouts today using our professional, client-side **Split PDF** tool.
  `,

  features: [
    "100% Secure Client-Side Splitting: Your files never leave your device, ensuring maximum privacy and offline security.",
    "Interactive Page Previews: High-fidelity thumbnail rendering lets you see pages visually before executing changes.",
    "Flexible Page Extraction: Select individual pages or custom ranges (e.g., '1, 3, 5-8') to form a new document.",
    "Multi-Range Slicing: Split a single document into multiple custom page range files in one operation.",
    "Split All Pages: Automatically decompose a document into separate single-page PDF files.",
    "Split by Intervals: Break long documents down by recurring page groups (e.g., every 5 pages).",
    "Output Naming System: Customize filenames with automatic sequential suffixing for better organization.",
    "Zip Compilation: Automatically packages multiple output PDFs into a single ZIP file for quick downloads.",
    "Automatic Performance Tuning: Employs chunked rendering for files with 500+ pages to prevent browser memory slowdowns.",
    "Local History Log: Review your processing history locally to keep track of recent tasks.",
    "Fully Responsive: Optimized dashboard layout works smoothly on desktop, tablet, and mobile devices."
  ],

  useCases: [
    "Dividing a 50-page scanned lease agreement into separate disclosure, terms, and signature sections.",
    "Extracting specific research pages from a massive academic journal to cite in a bibliography.",
    "Splitting a combined invoice PDF into separate files for individual vendor or client billing.",
    "Decomposing a digital presentation deck into single-page assets for marketing or reference.",
    "Extracting only the active pages of a tax return packet to upload to a portal.",
    "Breaking a giant digital textbook into individual chapters for lightweight reading on mobile devices."
  ],

  howToSteps: [
    "Upload your PDF by dragging and dropping it into the designated drop zone or clicking to browse files.",
    "Once loaded, review the document info panel and page thumbnail grid.",
    "Select your operation tab: Extract Pages, Split by Ranges, Split Every Page, or Split by Interval.",
    "Use the visual grid checkboxes or enter custom ranges (e.g., '1-3, 7') to define the split structure.",
    "Configure output options such as custom filename prefix and sequential file sorting.",
    "Click the 'Split PDF' button. The processing will complete locally in seconds.",
    "Download the individual PDF file or download the automatically compiled ZIP file containing all parts."
  ],

  examples: [
    {
      title: "Page Extraction Run",
      description: "Extract page 1 and pages 5 through 7 from an annual report.",
      input: "Annual_Report_2025.pdf (12 pages), Page selection: '1, 5-7'",
      output: "Annual_Report_2025_extracted.pdf (A new 4-page PDF containing pages 1, 5, 6, and 7)"
    },
    {
      title: "Interval Split Run",
      description: "Split a 15-page document containing invoices into separate files of 5 pages each.",
      input: "Monthly_Invoices.pdf (15 pages), Split interval: '5'",
      output: "Invoices_part_1.pdf (pages 1-5), Invoices_part_2.pdf (pages 6-10), Invoices_part_3.pdf (pages 11-15) packed in a ZIP"
    }
  ],

  faq: [
    {
      question: "How do I split a PDF file?",
      answer: "Upload your PDF by dragging and dropping it or browsing. Select one of the split methods (Extract Pages, Split by Ranges, Split Every Page, or Split by Interval), configure your ranges or click pages visually in the preview grid, and click 'Split PDF' to download the results."
    },
    {
      question: "Is this Split PDF tool free to use?",
      answer: "Yes, this tool is 100% free with no registration, no subscription fees, no watermarks, and no usage limits."
    },
    {
      question: "Are my uploaded PDF files safe and secure?",
      answer: "Absolutely. Our tool operates completely in your client browser. Your files are read and processed locally in your device's memory; they are never uploaded to our servers, keeping your documents entirely private."
    },
    {
      question: "Can I split a PDF on my phone or tablet?",
      answer: "Yes. The tool is fully responsive and works in mobile web browsers (Safari, Chrome, Firefox) on iOS and Android devices. You can select files from local storage, iCloud, or Google Drive."
    },
    {
      question: "What is the maximum file size or page limit?",
      answer: "To ensure browser tab stability and protect your device's RAM, we support files up to 150MB. There is no strict page count limit, and the tool uses chunked processing to safely handle files with 500+ pages."
    },
    {
      question: "Can I extract specific non-sequential pages?",
      answer: "Yes. In the 'Extract Pages' mode, you can select custom non-sequential pages either visually by checking the boxes on the thumbnail grid or by entering values separated by commas (e.g., '1, 4, 7-9')."
    },
    {
      question: "Can I split a password-protected PDF?",
      answer: "For privacy and safety reasons, encrypted or password-protected PDFs must be unlocked before you upload them. The browser-based engine cannot decrypt restricted structures without prior authentication."
    },
    {
      question: "How does the 'Split Every Page' option work?",
      answer: "This mode takes your uploaded PDF and splits it so that every single page becomes its own separate PDF document. A 10-page PDF will result in 10 individual files, which are automatically downloaded together in a single ZIP folder."
    },
    {
      question: "What is a PDF page interval split?",
      answer: "Interval splitting allows you to partition a document by a recurring number of pages. For example, setting an interval of 3 on a 12-page PDF will output 4 separate files: pages 1-3, 4-6, 7-9, and 10-12."
    },
    {
      question: "Will the text inside my split PDFs remain searchable?",
      answer: "Yes. Because our tool performs binary-level tree operations on the PDF structure instead of flattening page content into images, all text layers, embedded fonts, forms, and vector geometries remain completely searchable and interactive."
    },
    {
      question: "Why do I get a ZIP file download?",
      answer: "If your split settings generate more than one output PDF file (e.g., when splitting by ranges, splitting every page, or using intervals), the tool bundles all the files into a single ZIP archive so you can download them all together in one click."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes. Once the webpage has fully loaded in your browser, all processing code runs locally. You can disconnect from the internet and continue using the tool without interruption."
    },
    {
      question: "Can I change the order of pages before splitting?",
      answer: "This tool is designed to split pages based on the original layout order. If you want to rearrange, reorder, or organize pages before exporting, you can use our upcoming 'Organize PDF' tool."
    },
    {
      question: "Is there a limit to how many pages I can extract at once?",
      answer: "No. You can extract any number of pages from a single page up to the total page count of your uploaded document."
    },
    {
      question: "Does splitting a PDF reduce the file size?",
      answer: "Yes, because the resulting files contain fewer pages. Additionally, our compile engine optimizes output files by stripping out unused layout data and consolidates shared resources."
    },
    {
      question: "Are my original files modified or deleted?",
      answer: "No. Your original file remains completely untouched on your device. The tool only reads the file data and generates new PDF files based on your configurations."
    },
    {
      question: "Does the tool support high-resolution PDF blueprints or scans?",
      answer: "Yes. The tool handles high-resolution drawings, vector shapes, and graphics. However, processing very large files with high DPI images might take a few extra seconds depending on your browser and computer performance."
    },
    {
      question: "How is the output ZIP file named?",
      answer: "The ZIP archive is named using your custom filename prefix followed by '_split_files.zip' (e.g., 'document_split_files.zip')."
    },
    {
      question: "Can I split multiple PDF files at the same time?",
      answer: "Currently, you upload and configure one PDF document at a time. This allows you to visually select pages and set custom ranges for that specific document. Once completed, you can click 'Reset' to process another file."
    },
    {
      question: "Does the output file retain hyperlinks and bookmarks?",
      answer: "Yes, standard hyperlinks, annotations, and form fields associated with the extracted pages are kept intact in the output files."
    },
    {
      question: "Is it safe to split financial or legal documents here?",
      answer: "Yes. Since all processing runs inside your local browser sandbox and no files are uploaded to our servers, it is as safe as using a desktop application. It meets strict privacy demands for corporate and legal documents."
    },
    {
      question: "What happens to the browser memory after processing?",
      answer: "Our tool automatically triggers garbage collection references and revokes local blob URLs once processing is complete, preventing browser tabs from leaking memory or slowing down."
    },
    {
      question: "Can I enter overlapping ranges in 'Split by Ranges'?",
      answer: "Yes. You can define overlapping ranges (e.g. Range 1: '1-5', Range 2: '4-8') and the engine will build separate documents containing those pages accordingly."
    },
    {
      question: "Does this PDF tool work on Mac and Linux?",
      answer: "Yes, it is browser-based and works perfectly across Windows, macOS, Linux, ChromeOS, iOS, and Android systems."
    },
    {
      question: "Why should I use this tool instead of desktop software?",
      answer: "This tool provides the speed and features of professional desktop apps like Adobe Acrobat without requiring installations, software licensing fees, user account sign-ups, or running background update daemons."
    }
  ],

  relatedTools: [
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "Rotate PDF", slug: "rotate-pdf" },
    { name: "PDF to Word", slug: "pdf-to-word" },
    { name: "JPG to PDF", slug: "jpg-to-pdf" },
    { name: "PDF to JPG", slug: "pdf-to-jpg" }
  ]
};
