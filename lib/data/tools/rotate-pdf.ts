import { ToolConfig } from './types';

export const rotatePdfConfig: ToolConfig = {
  slug: "rotate-pdf",
  title: "Rotate PDF",
  shortDescription: "Rotate individual pages or entire PDF documents permanently. 100% secure client-side browser processing. No uploads required.",
  category: "PDF Tools",
  keywords: [
    "Rotate PDF", "PDF Rotator", "Rotate PDF Pages", "Fix PDF Orientation",
    "PDF Page Rotation Tool", "rotate PDF online", "free PDF rotator", "delete PDF rotation",
    "rotate scanned PDF pages", "PDF document cleanup", "rotate landscape pages", "rotate portrait pages",
    "secure document rotation", "browser-based PDF rotator", "bulk PDF page rotator", "PDF alignment tool"
  ],

  longDescription: `
## The Ultimate Guide to Rotating PDF Documents and Pages Locally

In the modern digital workspace, the Portable Document Format (PDF) has established itself as the absolute standard for representing documents. Originally developed by Adobe Systems and codified as an open ISO standard (ISO 32000), the PDF excels at preserving visual layouts, vector details, fonts, and images across diverse operating systems and devices.

However, because PDFs are compiled with static layout coordinates, fixing pages that have been scanned upside down, rotated sideways, or misoriented is notoriously difficult without expensive software. Scanned document packets, scanned contracts, mobile snapshots, and CAD blueprints frequently present pages in the wrong orientation, making them difficult to read or compile.

Whether you need to rotate a single upside-down page in a contract, correct landscape pages in an audit report, or rotate all pages in a document at once, our **Rotate PDF** tool is the perfect browser-based utility. Operating 100% locally in your browser, your files never leave your device, ensuring complete privacy, high processing speed, and compatibility with any device.

---

## Technical Insights: How PDF Page Rotation Works

To understand how pages are rotated, we must look at how page orientations are defined within the PDF file structure.

### The /Rotate Attribute in the Page Dictionary
In the PDF specification, every page is defined by a Page Object (a dictionary containing references to page contents, media boundaries, and resource files). The orientation of a page is controlled by a specific key within this Page Object called the '/Rotate' attribute:
- **Default State**: If the '/Rotate' key is missing, the PDF reader displays the page at 0 degrees.
- **Angle Values**: The '/Rotate' attribute accepts values that are multiples of 90 degrees: '0', '90', '180', and '270'.
- **Clockwise Rotation**: These angles specify the clockwise rotation in degrees that must be applied when rendering the page. For example, a value of '90' rotates the page 90 degrees clockwise, while a value of '270' rotates it 90 degrees counter-clockwise.

### Visual CSS Rotation vs. Permanent Binary Rotation
When you use an online editor, there is an important distinction to make:
- **Visual CSS Rotation**: The browser uses CSS transforms (such as 'transform: rotate(90deg)') to turn the page thumbnail on your screen. This is a temporary visual effect; the file itself is not modified.
- **Permanent Binary Rotation**: The tool parses the PDF binary structure, updates the '/Rotate' dictionary key of the specified Page Objects, writes the modified structure back into a new PDF stream, and preserves all other layout metrics.

Our **Rotate PDF** tool uses **Permanent Binary Rotation**. When you apply a rotation and download your file, the '/Rotate' attribute is written directly into the PDF structure, ensuring that the page remains correctly oriented when opened in any PDF viewer, web browser, or printed.

---

## Security, Privacy, and GDPR Compliance: Why Local Processing Matters

Most online PDF rotators require you to upload your files to their cloud servers. This architecture introduces severe risks to security, privacy, and regulatory compliance:
- **Data Privacy Violations**: Transmitting sensitive contracts, legal documents, financial reports, or personal IDs to a remote server exposes your data to interception, database leaks, or unverified storage.
- **Compliance Regulations**: Under frameworks like GDPR (General Data Protection Regulation), HIPAA (Health Insurance Portability and Accountability Act), and CCPA (California Consumer Privacy Act), transmitting sensitive personally identifiable information (PII) or protected health information (PHI) to remote servers without explicit data processing agreements is a direct violation, exposing individuals and companies to heavy fines.
- **Processing Latency**: Uploading huge files, waiting in server queues, and downloading the results wastes bandwidth and time, especially on mobile connections or restricted enterprise networks.

### Our Privacy-First Architecture
Our **Rotate PDF** tool resolves these issues by processing files completely **client-side in your web browser**:
1. **Local Sandbox Execution**: The tool loads the required parsing libraries ('pdf-lib' and 'pdfjs-dist') directly into your browser's local sandbox memory.
2. **Zero File Uploads**: When you select a PDF, it is loaded into your local RAM as an ArrayBuffer. It is never sent to our servers or any third-party cloud.
3. **Instant Compilation**: Page rotations are processed locally on your device's CPU, taking only milliseconds.
4. **Offline Capability**: Once the page is loaded, you can disconnect your internet entirely, drop a PDF, rotate pages, and download the finished file. Your files stay where they belong — on your machine.

---

## Step-by-Step Guide to Rotating PDF Pages

Our user interface is designed to make page rotation simple and accessible on both desktop and mobile browsers:

### Step 1: Upload Your Documents
Drag and drop your PDF files directly into the dashed upload dropzone, or click the browse button to select files from your computer or mobile device. You can upload multiple PDFs at once to rotate pages across different documents in a single batch session.

### Step 2: Select Pages to Rotate
Once uploaded, the tool parses the file structure and displays a visual grid of page thumbnails.
- **Visual Selection**: Click a page thumbnail to select it. You can select multiple individual pages, or hold 'Shift' to select a range.
- **Bulk Filters**: Use the selection tools toolbar to automatically highlight specific pages:
  - *Select All*: Highlights every page in the document.
  - *Select Odd Pages*: Highlights pages 1, 3, 5, etc.
  - *Select Even Pages*: Highlights pages 2, 4, 6, etc.
  - *Select Landscape / Portrait*: Automatically detects and highlights landscape or portrait pages.

### Step 3: Apply Rotation Angles
Use the rotation toolbar or the quick-rotation buttons on each page thumbnail to rotate the highlighted pages:
- **Rotate Left**: Rotates selected pages 90° counter-clockwise.
- **Rotate Right**: Rotates selected pages 90° clockwise.
- **180° Rotation**: Flips selected pages upside down.
- **Reset**: Resets page orientations back to their original states.

### Step 4: Export and Save
Type a custom output name if desired, choose whether to preserve metadata, and click the 'Rotate PDF' button to compile the new document.
- For single PDFs, click the download button to save the file directly.
- For multiple PDFs, click 'Download ZIP' to download a compressed folder containing all processed files.

---

## Pro-Tips for Managing and Fixing PDF Orientations

To ensure your rotated documents are clean and professional, follow these best practices:

### 1. Leverage Keyboard Shortcuts
If you process large documents frequently, keyboard shortcuts can speed up your workflow significantly. Select page thumbnails and use:
- **Left Arrow** to rotate selected pages counter-clockwise.
- **Right Arrow** to rotate selected pages clockwise.
- **Delete** to reset page rotations.
- **Ctrl + S** to compile and download.

### 2. Auto-Detect Scanner Orientation Mistakes
Scanners often save landscape pages as portrait layout sideways. Use our **Smart Orientation Detector** to select only the landscape or portrait pages with a single click, allowing you to rotate and fix entire document scans instantly.

### 3. Check for Hidden Metadata
Always verify if your documents contain outdated tags. Our settings panel allows you to retain or edit global PDF metadata fields (Title, Author, Creator, Subject) before exporting, helping you keep your shared files clean.

### 4. Secure Your Clean Files
If you are rotating pages containing sensitive legal or financial details, consider protecting the remaining document. After rotating, utilize our **Protect PDF** tool to apply strong AES password encryption.
`,
  faq: [
    {
      question: "How do I rotate a PDF?",
      answer: "Upload your PDF by dragging and dropping it into the zone or clicking browse. Select the pages you want to rotate by clicking their thumbnails or entering a page range, then click 'Rotate Left' or 'Rotate Right'. Once satisfied with the preview, click 'Rotate PDF' to download your file."
    },
    {
      question: "Can I rotate only one page of a PDF?",
      answer: "Yes. Simply click the specific page thumbnail you want to fix, use the rotation buttons to adjust its orientation, and export. Only that page will be rotated; the rest of the document remains unchanged."
    },
    {
      question: "Can I rotate multiple pages at once?",
      answer: "Yes. You can select multiple pages by clicking them in the visual gallery, using filters (like Odd, Even, Landscape, Portrait), or entering ranges (like '2-5, 8') and applying a bulk rotation."
    },
    {
      question: "Is this PDF rotation tool free?",
      answer: "Yes. Our tool is 100% free with no file size limits, page counts, daily restrictions, or registration required."
    },
    {
      question: "Are my PDFs secure?",
      answer: "Absolutely. Our rotator runs entirely client-side. The file processing, thumbnail rendering, and rotation happen in your local browser sandbox. No files are uploaded to our servers, ensuring complete privacy."
    },
    {
      question: "Can I rotate scanned PDF pages?",
      answer: "Yes. The tool parses scanned images and text blocks within the PDF, displaying thumbnails of each scanned page so you can easily orient them correctly."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes. The page is fully responsive. You can upload files from your mobile storage, tap thumbnails to rotate them, and download the finished PDF on iOS Safari or Android Chrome."
    },
    {
      question: "Are files stored on your servers after rotation?",
      answer: "No. Since all processing runs locally on your machine, your files never reach our servers and are never stored anywhere in our databases."
    },
    {
      question: "Can I undo page rotations?",
      answer: "Yes. You can click 'Reset Rotation' on selected pages, use the undo/redo buttons in the toolbar, or press the 'Delete' key to discard your changes and return to the original layout."
    },
    {
      question: "Can I rotate large PDFs with hundreds of pages?",
      answer: "Yes. The tool features an optimized, chunked rendering engine and lazy-loaded thumbnails using an IntersectionObserver, which prevents browser memory lag when handling large documents."
    },
    {
      question: "Can I rotate the entire PDF at once?",
      answer: "Yes. Click the 'Select All' button, then click the Rotate Left or Rotate Right button in the bulk toolbar. This will apply the rotation to every page in the document."
    },
    {
      question: "What rotation angles are supported?",
      answer: "You can rotate pages by 90° clockwise (Rotate Right), 90° counter-clockwise (Rotate Left), 180° (upside down), and 270° clockwise. You can also reset them back to 0°."
    },
    {
      question: "Can I detect and fix misoriented scanner pages automatically?",
      answer: "Yes. Our smart orientation detector allows you to filter and highlight all landscape or portrait pages in the document with one click, letting you rotate and align them instantly."
    },
    {
      question: "How can I customize the filename of the output PDF?",
      answer: "In the Output Settings panel, you can type a custom filename pattern. If left blank, it defaults to the original filename appended with '_rotated'."
    },
    {
      question: "Is document metadata preserved during rotation?",
      answer: "Yes, by default, the original metadata (Title, Author, Creator, Subject) is preserved. You can also choose to edit or strip this metadata in the settings panel."
    },
    {
      question: "Does rotating PDF pages reduce the quality of images inside?",
      answer: "No. The tool performs a layout rotation on the metadata index level without compressing or re-encoding the embedded graphics, meaning image quality remains 100% untouched."
    },
    {
      question: "Can I rotate pages in multiple PDF files simultaneously?",
      answer: "Yes. You can upload multiple PDFs in a batch list, configure rotation parameters for each document, and download them all at once in a ZIP archive."
    },
    {
      question: "Does this tool support password-protected PDFs?",
      answer: "You must decrypt password-protected PDFs before uploading them. If your file is encrypted, please unlock it using a decryption utility first."
    },
    {
      question: "Do I need to install any software or extensions?",
      answer: "No. The utility is 100% web-based and runs in any modern web browser without requiring any downloads or plugin installations."
    },
    {
      question: "What is the maximum file size supported?",
      answer: "We support files up to 150MB. Larger files might take slightly longer to render depending on your computer's RAM and CPU."
    },
    {
      question: "Can I rotate pages using keyboard shortcuts?",
      answer: "Yes. You can use the Left/Right arrow keys to rotate selected pages, the Delete key to reset, and Ctrl + S to compile and download."
    },
    {
      question: "Will the formatting of text or fonts change after rotation?",
      answer: "No. The formatting, embedded fonts, vector paths, and layout are copied byte-for-byte in their original state. Only the page's orientation index is updated."
    },
    {
      question: "Can I download my rotated PDFs as a ZIP archive?",
      answer: "Yes. When batch processing multiple PDFs, you can download all output files at once in a single compressed ZIP folder."
    },
    {
      question: "Does the tool log my file history?",
      answer: "We log a local history list of your past file conversions, which is saved locally in your browser's `localStorage` for your convenience. This data is private and never shared."
    },
    {
      question: "Are hyperlinked URLs inside the pages preserved?",
      answer: "Yes. All hyperlinks, annotations, form fields, and digital elements are copied and remain fully functional after rotation."
    },
    {
      question: "How long are my files stored if I choose to download them later?",
      answer: "Since your files are processed locally in your browser, they are never uploaded to our servers in the first place, meaning there is no data stored on our end."
    },
    {
      question: "What libraries are used to process the PDFs?",
      answer: "We use standard open-source libraries: `pdf-lib` for compiling and structuring the PDF files, and `pdfjs-dist` (PDF.js) for high-performance canvas page rendering."
    },
    {
      question: "Can I recover original pages after completing the rotation?",
      answer: "As long as you do not close your browser tab or delete the original file on your computer, you can modify rotations and download a new copy. Once the tab is closed, you will need to re-upload the original file."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes. Once the web application is loaded in your browser, the tool operates 100% offline, allowing you to process documents without an active internet connection."
    },
    {
      question: "Can I rotate pages in different angles like 45 degrees?",
      answer: "The PDF specification only supports page rotations in multiples of 90 degrees (90°, 180°, 270°). Angle rotations like 45° are not supported by the standard PDF format."
    }
  ],
  relatedTools: [
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Remove PDF Pages", slug: "remove-pdf-pages" },
    { name: "PDF to JPG", slug: "pdf-to-jpg" },
    { name: "JPG to PDF", slug: "jpg-to-pdf" }
  ],
  features: [
    "100% Secure Client-Side Browser PDF Page Rotation",
    "Batch Upload and Rotation for Multiple PDF Documents",
    "Visual Thumbnail Grid with IntersectionObserver Lazy Loading",
    "Rotate Left, Rotate Right, 180° Flip, and Reset Angles",
    "Smart Orientation Detector (Filter Landscape vs. Portrait pages)",
    "Text Range Selection Sync (e.g., '1-5, 8, 12-14')",
    "Keyboard Shortcuts (Arrows for rotation, Del to reset, Ctrl+S to save)",
    "Preserved or Customizable Document Metadata Panel",
    "Individual File Downloads and Batch ZIP Archive Exports",
    "Local History Logs saved in browser localStorage"
  ],
  useCases: [
    "Rotate upside-down scanned documents and receipts in bulk.",
    "Correct landscape pages in financial audits or spreadsheets to match portrait orientation.",
    "Adjust landscape blueprint orientations for architects and construction workers.",
    "Realign mobile photos exported to PDF that have incorrect metadata orientation tags.",
    "Fix incorrect page directions inside academic journals and books."
  ],
  howToSteps: [
    "Drag and drop one or more PDF files into the secure browser upload panel.",
    "Review the visual thumbnail grid of all pages loaded into your session.",
    "Click pages directly, select filter shortcuts, or enter page ranges in the text field.",
    "Click the Rotate Left, Rotate Right, or 180° buttons to adjust page directions.",
    "Optionally enter a custom output name or edit PDF metadata fields in settings.",
    "Click the 'Rotate PDF' button to compile the new document, then download your optimized PDF."
  ],
  examples: [
    {
      title: "Correcting Scanned Documents",
      description: "Rotate pages scanned upside-down (180°) or sideways (90°).",
      input: "10-page scanned document with page 3 upside-down and page 5 landscape.",
      output: "10-page correctly aligned PDF with all pages displaying portrait read-direction."
    },
    {
      title: "Aligning Blueprint Layouts",
      description: "Rotate landscape blueprint layouts for engineering project sharing.",
      input: "5-page report with landscape diagrams showing vertical.",
      output: "5-page report with diagrams rotated 90° clockwise for landscape readers."
    }
  ]
};
