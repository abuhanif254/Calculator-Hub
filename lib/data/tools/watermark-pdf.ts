import { ToolConfig } from './types';

export const watermarkPdfConfig: ToolConfig = {
  slug: "watermark-pdf",
  title: "Watermark PDF",
  shortDescription: "Add text, image, or logo watermarks to your PDF documents. Customize opacity, rotation, font, and positioning with a 100% secure client-side editor.",
  category: "PDF Tools",
  keywords: [
    "Watermark PDF", "Add Watermark to PDF", "PDF Watermark Tool", "PDF Branding Tool",
    "PDF Copyright Protection", "PDF Stamp Tool", "pdf watermark creator", "watermark pdf online",
    "free pdf watermarker", "add logo to pdf", "copyright pdf documents", "confidential stamp pdf",
    "secure local pdf watermarking", "custom stamp pdf pages", "bulk watermark pdf"
  ],

  longDescription: `
## The Complete Technical Guide to Digital PDF Watermarking

In the modern digital information ecosystem, protecting intellectual property, establishing corporate branding, and securing sensitive business records are critical operational goals. The Portable Document Format (PDF), governed by the International Organization for Standardization (ISO 32000), is the default file format for sharing official contracts, designs, invoices, and blueprints. However, because PDFs are designed for visual fidelity across all platforms, once a document is shared, it can easily be copied, distributed, or modified without authorization.

To deter copyright infringement, indicate draft status, or display branding, digital watermarking is an essential technique. Our **Watermark PDF** tool offers a premium, 100% browser-based utility that allows you to add custom text, logos, and image stamps to your documents without uploading them to remote servers. This article explores the technical mechanics of PDF watermarking, the advantages of local browser processing, and best practices for securing your corporate files.

---

## The Mechanics of PDF Watermarking: How Overlays Work

To understand how a watermark is applied, we must look at the binary structure of a PDF document. A PDF file is not just a layout template; it is a structured tree of objects compiled into a serialized data stream. When you insert a watermark, you are not simply drawing pixels on the screen; you are appending new visual elements directly into the document's structure.

### The Page Content Stream and Graphics State
In a PDF document, each page is represented by a dictionary object containing references to its resources (fonts, images, colorspaces) and a '/Contents' stream. The '/Contents' stream contains a sequence of graphics instructions (written in PDF operator syntax) that describe where to draw text, vectors, and raster graphics on the page canvas.

When drawing a watermark, there are two primary approaches:
1. **Overlay (Foreground Watermark)**: The watermark graphics instructions are appended at the very end of the page '/Contents' stream. This places the watermark on top of all existing page contents, rendering it clearly over text and images. This is the standard method for 'CONFIDENTIAL' stamps.
2. **Underlay (Background Watermark)**: The graphics instructions are prepended at the beginning of the page '/Contents' stream. This places the watermark underneath the page text, which is ideal for textured backgrounds or subtle letterheads. However, if the page contains solid colored backgrounds or scanned full-page images, the underlay watermark may be hidden.

Our **Watermark PDF** tool defaults to **Foreground Overlay** with adjustable opacity, ensuring that the watermark is visible without fully blocking the readability of the underlying text.

### Font Management: Standard Fonts vs. Subsets
Text watermarks require fonts to render correctly. To avoid bloated file sizes, the PDF specification identifies a set of **Standard 14 Fonts** that every compliant PDF reader must support natively. These include:
- **Helvetica** (Regular, Bold, Oblique, Bold-Oblique)
- **Times-Roman** (Regular, Bold, Italic, Bold-Italic)
- **Courier** (Regular, Bold, Oblique, Bold-Oblique)
- **Symbol**
- **ZapfDingbats**

By using the Standard 14 Fonts (like Helvetica or Times-Roman), our tool can compile text watermarks in milliseconds without needing to download and embed massive TrueType (.ttf) or OpenType (.otf) font files, keeping the output PDF size minimal.

### Image Watermarks as Form XObjects
When you apply an image or logo watermark, the image data is embedded in the PDF dictionary as an '/XObject' (specifically a Form XObject or an Image XObject). This '/XObject' is defined once in the document resource dictionary and referenced on each page where the watermark is applied. This page-reference architecture ensures that even if you watermark a 500-page document with a high-resolution logo, the image data is only stored once in the file, preventing the file size from growing with each watermarked page.

---

## Mathematical Transformations: Rotation, Scaling, and Bounding Boxes

PDF pages do not use screen pixels; they use a physical coordinate system defined in **points** (where 1 inch = 72 points). The origin point '(0, 0)' is located at the **bottom-left corner** of the page. This coordinate system is called **User Space**.

To position and rotate watermarks accurately, the tool applies mathematical coordinate transformations using a 2D Transformation Matrix.

### Calculating Bounding Boxes
Before placing a watermark, we must calculate its dimensions:
- **Text Watermarks**: The width of the text is computed dynamically using the font's character metrics: 'Width = font.widthOfTextAtSize(text, fontSize)'. The height is estimated based on the font size.
- **Image Watermarks**: The dimensions of the image '/XObject' are extracted, and scaled using the user-defined percentage scale.

### Coordinate Translation
To place the watermark, we map the selected grid position (e.g. Top-Right or Center) to User Space coordinates:
- **Center**:
  $$X = \frac{PageWidth - WatermarkWidth}{2} + OffsetX$$
  $$Y = \frac{PageHeight - WatermarkHeight}{2} + OffsetY$$
- **Top-Left**:
  $$X = Margin + OffsetX$$
  $$Y = PageHeight - WatermarkHeight - Margin + OffsetY$$
- **Bottom-Right**:
  $$X = PageWidth - WatermarkWidth - Margin + OffsetX$$
  $$Y = Margin + OffsetY$$

### Rotation Angles
When a rotation angle (in degrees) is specified, the PDF viewer renders the watermark using a transformation matrix that rotates the graphics coordinate system around the center point of the watermark. Our tool computes this matrix automatically, allowing you to angle text watermarks (commonly at 45° or -45° diagonal) to cover the page and deter cropping.

---

## Client-Side Security: Ensuring Privacy, GDPR, and HIPAA Compliance

Most online PDF utilities require you to upload documents to their cloud servers, where watermarking is processed. This architecture introduces significant data security risks:
- **Data Protection Violations**: Transmitting internal business reports, employee records, financial sheets, or copies of IDs to a remote server exposes PII (Personally Identifiable Information) and corporate secrets.
- **Regulatory Penalties**: Under compliance frameworks like GDPR (General Data Protection Regulation) and HIPAA (Health Insurance Portability and Accountability Act), uploading documents containing patient records or citizen data to unverified servers constitutes a compliance breach, exposing organizations to massive fines.
- **Network Latency**: Processing large documents on remote servers wastes cellular bandwidth and introduces upload/download bottlenecks.

### The local sandbox architecture
Our **Watermark PDF** tool eliminates these risks by running **100% locally in your web browser**:
1. **Local Memory Sandbox**: The tool loads the compiled JS libraries ('pdf-lib' and 'pdfjs-dist') directly into your browser's local sandbox memory.
2. **Offline File Handling**: When you drop a PDF, it is parsed directly as an 'ArrayBuffer' in your system's RAM. No files are transmitted to our servers or any cloud services.
3. **Local Compiling**: The CPU on your device applies the watermark layers, updates the PDF stream, and outputs the result as a local Blob URL for download.
4. **Complete Privacy**: Since no network transmission takes place, your documents remain private. You can verify this by loading the page, disconnecting your internet, and watermarking files offline.

---

## Step-by-Step Guide to Watermarking PDFs Local in the Browser

Our visual dashboard is designed to make watermarking quick, intuitive, and highly customizable:

### Step 1: Upload Your Documents
Drag and drop your PDF files into the secure dashed upload zone, or click the browse button to select files from your computer or mobile device. You can queue multiple files to process them in a single batch session.

### Step 2: Configure Your Watermark Layers
You can combine multiple watermarks by adding layers. Click 'Add Text Layer' or 'Add Image Layer':
- **Text Layer**: Enter custom text (e.g. "INTERNAL USE ONLY") or select a smart preset. Customize the font family (Helvetica, Times, Courier), adjust the size, set the color, and modify the opacity.
- **Image Layer**: Click to upload your company logo or a custom stamp (supports PNG, JPG, WebP, and SVG formats). Adjust the scale and opacity.

### Step 3: Choose Position and Rotation
Select a preset position from the grid (Center, Top-Left, Bottom-Right, etc.) or use the offset sliders to position the watermark precisely. Adjust the rotation slider (typically -45° for a diagonal stamp) to cover the document area.

### Step 4: Define Page Targeting
Select which pages should receive the watermark:
- **Presets**: All Pages, First Page Only, Last Page Only, Odd Pages, Even Pages.
- **Page Gallery**: Click on thumbnails in the page viewer to toggle watermarks page-by-page.
- **Custom Page Range**: Enter page numbers and ranges (e.g., '1-3, 5, 8-10') in the input box.

### Step 5: Export and Save
Type your preferred output name pattern, toggle metadata preservation, and click the **Watermark PDF** button. Your files are watermarked locally in milliseconds. Download the finished PDF directly, or download a ZIP folder if you processed multiple files.

---

## Professional Best Practices for Document Protection

To maximize the effectiveness of your PDF watermarks, follow these professional tips:
1. **Optimize Opacity**: Keep watermark opacity between **0.15 and 0.30**. This makes the watermark clearly visible for copyright protection while ensuring the underlying document text remains legible.
2. **Use Diagonal Rotation**: A diagonal watermark (rotated at -45° or 45°) is much harder to crop or edit out without destroying the layout of the document.
3. **Upload Transparent PNGs**: For logo watermarks, always use a transparent PNG or SVG format. This prevents the logo from displaying a white bounding box, keeping your branding clean and integrated.
4. **Encrypt Sensitive Files**: Watermarking deters visual copying, but it does not prevent users from editing or copying text from the file. Combine watermarking with our **Protect PDF** tool to add password encryption and restrict editing permissions.
`,
  faq: [
    {
      question: "How do I add a watermark to a PDF?",
      answer: "Upload your PDF by dragging and dropping it into the upload zone or clicking browse. Add a text or image layer, customize its size, font, color, opacity, and position, select the target pages, and click 'Watermark PDF' to download your document."
    },
    {
      question: "Can I add my company logo as a watermark?",
      answer: "Yes. Add an 'Image Layer' and upload your company logo in PNG, JPG, WebP, or SVG format. You can then adjust the scale, opacity, rotation, and position of the logo on the PDF."
    },
    {
      question: "Can I watermark only specific pages in a PDF?",
      answer: "Yes. You can choose to apply the watermark to All Pages, First Page Only, Last Page Only, Odd Pages, Even Pages, or input a custom page range like '1-3, 5, 8-10'."
    },
    {
      question: "Is this PDF watermarking tool free?",
      answer: "Yes, our tool is 100% free with no file size limits, page count restrictions, daily usage caps, or registration required."
    },
    {
      question: "Are my PDF files secure and private?",
      answer: "Absolutely. Our watermarker processes documents entirely client-side. The file loading, rendering, and compiling happen in your local browser sandbox. No files are uploaded to our servers, ensuring complete privacy."
    },
    {
      question: "Does it support transparent PNG logo watermarks?",
      answer: "Yes. Transparent PNG files preserve their transparency layers perfectly when embedded, showing only the logo without any white background boxes."
    },
    {
      question: "Can I add multiple watermarks to the same PDF?",
      answer: "Yes. Our layer system allows you to add multiple text and image watermarks simultaneously. You can place a diagonal text watermark in the center and a logo in the top corner of the same pages."
    },
    {
      question: "What image formats are supported for logo watermarks?",
      answer: "We support PNG, JPG, JPEG, SVG, and WebP formats. For SVG and WebP, we use a client-side canvas fallback to render them cleanly before embedding."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes, the tool is fully responsive and optimized for mobile browsers. You can upload files from your phone, adjust watermark settings, view the live preview, and download the finished PDF."
    },
    {
      question: "Are files stored on your servers?",
      answer: "No. Since all processing runs locally on your device, your files never leave your browser and are never uploaded, stored, or processed on our servers."
    },
    {
      question: "Can I customize the watermark opacity?",
      answer: "Yes, you can adjust the opacity slider from 10% (very subtle) to 100% (fully solid) to find the perfect balance between security and readability."
    },
    {
      question: "Which fonts can I use for text watermarks?",
      answer: "You can use standard, high-performance web-safe fonts: Helvetica, Times New Roman, and Courier, including Bold and Italic weight variations."
    },
    {
      question: "How do I make a diagonal watermark?",
      answer: "Use the rotation angle slider or input field to set a custom angle. A setting of -45 degrees or 45 degrees is commonly used for diagonal stamps."
    },
    {
      question: "Can I adjust the margins and offset of the watermark?",
      answer: "Yes. When you choose a position preset (like Top Left), you can use the X and Y offset sliders to move the watermark precisely relative to that position."
    },
    {
      question: "What are smart presets?",
      answer: "Presets are ready-to-use text watermarks with pre-configured settings for common stamps like 'CONFIDENTIAL', 'DRAFT', 'APPROVED', 'SAMPLE', and 'COPY'."
    },
    {
      question: "Can I download my watermarked files in a ZIP folder?",
      answer: "Yes. If you upload and process multiple PDF files in a batch, the tool will package all watermarked files into a single, compressed ZIP folder for easy download."
    },
    {
      question: "Does watermarking affect the quality of my PDF?",
      answer: "No. The tool adds the watermark as a vector or image layer overlay without modifying the original text vector content, maintaining the original document quality."
    },
    {
      question: "Are links and bookmarks inside the PDF preserved?",
      answer: "Yes. The watermarking pipeline preserves the original PDF catalog, including hyperlinks, annotations, form fields, and document outlines."
    },
    {
      question: "Can I run this watermarker offline?",
      answer: "Yes, once the web application loads, the tool operates entirely offline since all rendering and compilation run locally on your device."
    },
    {
      question: "Can I remove watermarks using this tool?",
      answer: "No, this tool is designed to apply permanent watermarks. To protect your copyright, once watermarks are merged into the PDF content stream, they cannot easily be removed."
    },
    {
      question: "How does the live preview work?",
      answer: "The preview panel renders the first page of your PDF using PDF.js. It then overlays a dynamic HTML layer representing your watermarks, updating instantly as you adjust the options."
    },
    {
      question: "Can I customize the output file names?",
      answer: "Yes, you can define a naming pattern in the settings panel (such as adding '_watermarked' or the current date) to differentiate your output files."
    },
    {
      question: "What is the file size limit?",
      answer: "Since processing happens locally in your browser, there is no set server limit. However, performance depends on your device's memory; we recommend keeping files under 150MB."
    },
    {
      question: "Can I adjust the text alignment?",
      answer: "Yes. For multi-line text watermarks, you can set the text alignment (Left, Center, Right) and customize the line height and letter spacing."
    },
    {
      question: "Does the watermark appear behind the text?",
      answer: "By default, the watermark is placed as a foreground overlay with opacity to keep it visible. If you require it behind text, you can adjust the opacity to make it more subtle."
    },
    {
      question: "Is there a limit on how many pages a PDF can have?",
      answer: "No, there is no page count limit. For large documents, the tool renders thumbnails lazily to save browser memory and ensure a smooth editing experience."
    },
    {
      question: "Can I use standard keyboard shortcuts?",
      answer: "Yes, the editor supports hotkeys: you can press Delete to reset watermarks, or use Ctrl+S to trigger the local PDF compiler."
    },
    {
      question: "Does this tool work on tablets?",
      answer: "Yes, the tool is fully responsive and compatible with tablets, allowing you to upload, edit, preview, and download PDFs on iPadOS and Android tablets."
    },
    {
      question: "Does it preserve PDF metadata?",
      answer: "Yes. You can toggle 'Preserve PDF Metadata' in settings to retain fields like Title, Author, Subject, and Creator, or write custom metadata tags."
    },
    {
      question: "Can I save my watermark styles for later use?",
      answer: "Yes, watermark configurations are saved locally in your browser's history log so you can quickly re-apply the same styles to future documents."
    },
    {
      question: "Do I need to sign up or log in?",
      answer: "No signup, login, or subscriptions are required. The tool is immediately accessible and works fully without an account."
    },
    {
      question: "Can I watermark password-protected PDFs?",
      answer: "If the PDF is encrypted, you must decrypt it using a password-removal tool first before uploading it, as the watermarker cannot edit locked files."
    },
    {
      question: "Why should I rotate my text watermark?",
      answer: "Rotating text watermarks diagonally (usually at 45 degrees) makes it much harder for users to crop out the copyright stamp without altering the core content of the page."
    },
    {
      question: "Can I preview all pages of the watermarked PDF?",
      answer: "The live editor provides a detailed rendering of the first page to preview styles. You can also select other pages or verify targeting rules in the page targeting gallery."
    },
    {
      question: "Does the tool support color codes?",
      answer: "Yes. You can use the built-in color picker to choose any shade, or type hex color codes directly to match your corporate brand guidelines."
    },
    {
      question: "Does it support watermarking multiple files at the same time?",
      answer: "Yes. You can upload multiple PDFs in a batch, apply the same watermark configuration to all of them, and compile them simultaneously in one click."
    }
  ],
  relatedTools: [
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Rotate PDF", slug: "rotate-pdf" },
    { name: "Remove PDF Pages", slug: "remove-pdf-pages" },
    { name: "PDF to JPG", slug: "pdf-to-jpg" },
    { name: "JPG to PDF", slug: "jpg-to-pdf" }
  ],
  features: [
    "100% secure client-side PDF watermarking in local browser memory",
    "Support for both text watermarks and image/logo uploads",
    "Smart text presets (Confidential, Draft, Sample, Approved, Copyright)",
    "Image uploader supporting PNG, JPG, JPEG, SVG, and WebP fallbacks",
    "Multiple watermarks layer management (add, toggle, remove layers)",
    "Appearance styling: font size, color, opacity, letter-spacing, line-height, scale",
    "Positioning grid presets and precise X/Y coordinate offset sliders",
    "Live preview system with canvas renderings and real-time visual HTML overlays",
    "Page targeting options (All, Odd, Even, Page Ranges, Selected)",
    "Batch processing for multiple documents with automated ZIP download packaging",
    "Preserve PDF document metadata fields (Title, Author, Subject, Creator)"
  ],
  useCases: [
    "Protect legal contracts and financial statements with draft and confidential stamps.",
    "Add corporate logo branding to marketing material and reports before public sharing.",
    "Overlay copyright text watermarks on digital ebooks and manuals to prevent theft.",
    "Mark project designs, invoices, and blueprints with a paid or sample watermark.",
    "Watermark student submissions, research papers, and portfolios for grading security."
  ],
  howToSteps: [
    "Upload one or more PDF files into the secure web dropzone.",
    "Add a watermark layer: choose custom text or upload a branding image/logo.",
    "Configure options: select fonts, change colors, adjust opacity, and set custom rotation.",
    "Set the watermark position using the alignment grid and offset sliders.",
    "Choose target pages: apply to all pages, odds, evens, or a custom page range.",
    "Click the 'Watermark PDF' button to compile the changes client-side, and save your document."
  ],
  examples: [
    {
      title: "Corporate Document Branding",
      description: "Embed transparent PNG corporate logos into business reports for brand recognition.",
      input: "A 15-page financial PDF report in plain black and white text.",
      output: "A 15-page branded PDF with your company logo embedded cleanly in the top-right corner of every page."
    },
    {
      title: "Securing Sensitive Drafts",
      description: "Apply diagonal, semi-transparent text stamps to deter copying and indicate confidentiality.",
      input: "A 5-page draft agreement.",
      output: "A 5-page PDF with 'INTERNAL USE ONLY' written diagonally across the center of all pages at 20% opacity."
    }
  ]
};
