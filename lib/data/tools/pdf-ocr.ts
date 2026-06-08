import { ToolConfig } from './types';

export const pdfOcrConfig: ToolConfig = {
  slug: "pdf-ocr",
  title: "PDF OCR",
  shortDescription: "Extract text from scanned PDFs, convert image-based PDFs into searchable documents, and run OCR on multiple pages. Works 100% client-side in your browser.",
  category: "PDF Tools",
  keywords: [
    "PDF OCR", "OCR PDF", "Convert Scanned PDF to Text", "Searchable PDF Converter",
    "PDF Text Recognition", "PDF OCR Scanner", "scanned pdf to text online", "ocr pdf free",
    "extract text from pdf image", "make pdf searchable", "tesseract ocr pdf", "free pdf ocr local"
  ],

  longDescription: `
## The Comprehensive Guide to Optical Character Recognition (OCR) in PDF Documents

In digital document management, Portable Document Format (PDF) files are often divided into two main categories: **digital-native PDFs** (created directly from word processors, spreadsheets, or design applications) and **scanned PDFs** (created by capturing paper documents via scanners, mobile cameras, or photocopiers). Digital-native PDFs contain structured character objects, allowing users to select, copy, and search text. Scanned PDFs, however, are essentially containers for images, meaning they lack selectable text layers.

To convert a scanned, image-based PDF into an editable, searchable, and structured format, you must use **Optical Character Recognition (OCR)**. This guide covers OCR technology, the layout analysis pipeline, document digitization math, client-side processing, and security considerations.

---

## 1. What is PDF OCR? The Technical Digitization Pipeline

Optical Character Recognition is the electronic conversion of images containing handwritten, typed, or printed text into machine-encoded text. For a scanned PDF, the OCR engine processes each page image through a structured multi-stage pipeline:

\`\`\`mermaid
graph TD
    Upload[Upload Scanned PDF] --> Render[Render Page to Image via PDF.js]
    Render --> Preprocess[Image Preprocessing: Binarization, Deskew, Contrast]
    Preprocess --> Layout[Layout Analysis: Region Segmenting]
    Layout --> Character[Character Recognition: Feature Extraction & Classifiers]
    Character --> Dict[Post-Processing: Language Models & Dictionaries]
    Dict --> Output[Export: Searchable PDF, TXT, CSV]
\`\`\`

### Stage 1: Image Preprocessing
Raw scans often contain noise, shadows, tilted angles, and low contrast. To maximize text recognition accuracy, the engine applies several image processing filters:
1. **Binarization (Thresholding)**: Converts colored or grayscale images into binary black-and-white images. This separates the text (foreground) from the page background.
2. **Deskewing**: Detects if the page was scanned at an angle and rotates it to align the text columns horizontally.
3. **Contrast Adjustment**: Enhances dark areas and brightens light areas to clarify faint text.
4. **Noise Reduction**: Removes stray pixels, smudges, and scanning artifacts.

### Stage 2: Layout Analysis (Segmentation)
Before identifying individual letters, the OCR engine analyzes the document structure. It segments the page into:
- **Text Blocks**: Columns, paragraphs, headings, and lists.
- **Non-Text Blocks**: Images, charts, and drawings.
- **Tables**: Row and column grid structures.

This prevents the engine from reading multi-column layouts straight across the page, preserving the correct reading order.

### Stage 3: Character Recognition (Classification)
The engine processes identified text regions line-by-line and word-by-word. It analyzes individual characters using two main techniques:
- **Pattern Matching (Template Matching)**: Compares the character image against a database of known glyph shapes.
- **Feature Extraction**: Analyzes the character's geometry (lines, loops, intersections, and directions) to identify it, regardless of font type.

Modern OCR engines (like Tesseract 4/5) combine these methods with **LSTMs (Long Short-Term Memory)**, a type of recurrent neural network (RNN). LSTMs analyze characters within the context of the entire word, significantly improving recognition accuracy for cursive handwriting and blurred prints.

### Stage 4: Post-Processing and Dictionaries
Once the engine predicts character sequences, it validates them against language-specific dictionaries and statistical models (unigram and bigram frequencies). For example, if the engine is unsure whether a character is a zero \`0\` or the letter \`O\`, it uses adjacent letters to determine the most likely character (e.g., in the word \`OUT\`, it selects the letter \`O\`).

---

## 2. Searchable PDFs: Merging Image Layers and Invisible Text Layers

When you use an OCR tool to create a **Searchable PDF** (sometimes called a sandwich PDF), the resulting document contains two parallel layers:

\`\`\`text
[Layer 1: Top] Invisible Text Layer (Selectable, Searchable, Opacity 0)
──────────────────────────────────────────────────────────────────────────
[Layer 2: Bottom] Scanned Image Layer (Visual Presentation)
\`\`\`

1. **Scanned Image Layer (Background)**: The original visual scan of the page. This preserves the document's design, signatures, and stamps.
2. **Invisible Text Layer (Foreground)**: A layer of selectable text drawn directly on top of the image.

### Reconstructing Coordinates with Tesseract.js and pdf-lib
To align the invisible text layer with the background image, the OCR engine calculates bounding boxes for each word. A word's bounding box is defined by four coordinates: \`[x0, y0, x1, y1]\` relative to the image's top-left corner.

Since the PDF coordinate system origin \`(0, 0)\` is located at the bottom-left corner of the page, the editor must translate the coordinates during compilation:

$$\text{PDF } X = \text{Tesseract } x_0 \times \left( \frac{\text{PDF Page Width}}{\text{Image Width}} \right)$$
$$\text{PDF } Y = \text{PDF Page Height} - \left( \text{Tesseract } y_1 \times \left( \frac{\text{PDF Page Height}}{\text{Image Height}} \right) \right)$$

The editor then draws the text using a transparent font or setting the text rendering mode to 3 (\`3 Tr\`). This hides the text visually but allows PDF viewers to highlight, search, and copy it.

---

## 3. Table Recognition: Segmenting and Converting Grid Boundaries

Extracting tables from scanned PDFs is one of the most complex tasks in document digitization. Tables lack continuous text lines, meaning standard paragraph extraction breaks them into disorganized fragments.

### Grid Segmentation and Bounding Boxes
To recognize tables, a document intelligence engine:
1. **Detects Grid Lines**: Applies a Hough Transform algorithm to locate horizontal and vertical lines in the image.
2. **Identifies Intersections**: Locates cell coordinates by finding where horizontal and vertical lines intersect.
3. **Groups Cells**: Clusters cells into rows and columns based on their coordinate alignments.
4. **Extracts Content**: Performs OCR on each individual cell region and exports the structured data into CSV or Excel-ready formats.

If a table has borderless cells, the engine uses the alignment of the text blocks to infer column boundaries, preserving the data structure.

---

## 4. Privacy and Security: The Case for Client-Side OCR

Document processing workflows in legal, financial, and governmental operations must adhere to strict data privacy regulations. Uploading sensitive files to cloud-based OCR services introduces significant compliance risks:

### Cloud OCR Risks
- **Data Leakage**: Scanned documents often contain highly sensitive information, such as social security numbers, bank details, and signatures. Uploading these files to remote servers can lead to unauthorized access if storage buckets are misconfigured.
- **Regulatory Violations**: Corporate policies and compliance frameworks (like GDPR, HIPAA, and CCPA) restrict uploading unencrypted customer data to third-party services.
- **Data Retention**: Cloud utilities may cache, log, or store processed files for model training, violating confidentiality agreements.

### The Client-Side Sandbox Solution
Our **PDF OCR** tool processes files completely local to your browser:
- **In-Memory Parsing**: Your PDF is rendered, preprocessed, and recognized in your browser's local sandbox memory.
- **Zero File Uploads**: No data is sent over the internet, keeping your private documents secure on your machine.
- **Offline Operations**: Once the page is loaded, you can disconnect from the internet and continue performing OCR, ensuring complete security.

---

## 5. Summary of Best Practices for PDF OCR
- **Optimize Page Scans**: Scan documents at a minimum resolution of 300 DPI for high OCR accuracy.
- **Preprocess Images**: Use noise reduction and auto-contrast features to help the engine recognize degraded text.
- **Select the Right Language**: Set the matching language model to help Tesseract post-process words using the correct dictionary.
- **Verify Selectable Layers**: Open searchable PDFs in Chrome or Adobe Reader and press \`Ctrl + F\` to confirm that the text layer is searchable.
`,

  faq: [
    {
      question: "What is PDF OCR?",
      answer: "Optical Character Recognition (OCR) is a technology that scans image-based, scanned PDF files, recognizes the text characters within the images, and converts them into searchable and copyable text."
    },
    {
      question: "How do I convert a scanned PDF to text?",
      answer: "Upload your scanned PDF, select your document's language, choose your output format (such as TXT, CSV, JSON, or Searchable PDF), and click 'Run OCR' to extract and save the recognized text."
    },
    {
      question: "Can OCR create searchable PDFs?",
      answer: "Yes. The 'Searchable PDF' mode places an invisible layer of selectable text on top of the original scanned images, allowing you to search and highlight text while preserving the original page layout."
    },
    {
      question: "Is this PDF OCR tool free?",
      answer: "Yes, this tool is 100% free with no subscriptions, file size limits, page count caps, or watermarks."
    },
    {
      question: "Are my PDF files secure and private?",
      answer: "Yes. The tool operates 100% client-side in your web browser. Your files are processed locally in memory and are never uploaded to any remote servers."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes. The tool is fully responsive and optimized for mobile phones, tablets, and desktop computers."
    },
    {
      question: "Can I OCR scanned PDFs in multiple languages?",
      answer: "Yes. Tesseract.js supports multi-language OCR. You can select multiple languages in the dropdown menu to process bilingual or multilingual documents."
    },
    {
      question: "What is the OCR confidence score?",
      answer: "The confidence score is a percentage calculated by the OCR engine indicating how confident it is in the accuracy of the recognized characters on the page."
    },
    {
      question: "Will image quality be affected after OCR?",
      answer: "No. The tool processes the page images to extract text but does not compress or alter the original visual document quality."
    },
    {
      question: "Can I undo OCR actions?",
      answer: "Since OCR is a read-only text extraction process, there are no changes to undo. If you generate a searchable PDF, the output is saved as a new file, leaving your original document untouched."
    },
    {
      question: "Can I run OCR on only selected pages?",
      answer: "Yes. You can target specific pages (e.g. page 1, or ranges like '2-5') instead of processing the entire document, saving time and memory."
    },
    {
      question: "Can I extract tables from scanned PDFs?",
      answer: "Yes. The table recognition mode extracts structured tabular data and formats it into copyable grids, which you can export as CSV or JSON."
    },
    {
      question: "What formats can I export the OCR text to?",
      answer: "You can download the extracted text as a plain text file (TXT), structured JSON, comma-separated values (CSV) for table data, or as a new Searchable PDF."
    },
    {
      question: "Can this tool handle hand-written text?",
      answer: "Yes. The modern Tesseract.js LSTM neural network models can recognize clean handwriting, though printed text yields significantly higher accuracy."
    },
    {
      question: "Why is some text recognized incorrectly?",
      answer: "Low scanning resolution (below 150 DPI), unusual fonts, blurred text, background noise, or page warping can lower character recognition accuracy."
    },
    {
      question: "Do I need to install any software to use this tool?",
      answer: "No. The tool runs directly in your web browser using HTML5 features, requiring no desktop software or browser extensions."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes. Once the page is loaded, the OCR processing runs locally in your browser, allowing you to disconnect from the internet and work offline."
    },
    {
      question: "What languages are supported by this OCR tool?",
      answer: "The tool supports English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Arabic, Hindi, Bengali, Chinese, Japanese, Korean, Turkish, and over 60 other languages."
    },
    {
      question: "How long does the OCR process take?",
      answer: "OCR speed depends on your computer's CPU and the document's complexity. A standard page usually takes between 2 to 5 seconds to process."
    },
    {
      question: "How can I improve OCR accuracy?",
      answer: "Ensure your document scans are high-contrast and clear. You can also adjust the auto-contrast and noise-reduction settings in the sidebar controls."
    },
    {
      question: "Can I upload password-protected PDFs?",
      answer: "Yes. If the PDF is encrypted, the tool will prompt you for the password to decrypt it locally before starting the OCR process."
    },
    {
      question: "Is there a page count limit?",
      answer: "There are no file size or page count limits. However, processing very large files (e.g. over 100 pages) may require significant system memory."
    },
    {
      question: "What is binarization in image preprocessing?",
      answer: "Binarization converts page images to high-contrast black-and-white, helping the OCR engine separate text from background shadows."
    },
    {
      question: "What is deskewing in OCR preprocessing?",
      answer: "Deskewing rotates slightly tilted or crooked page scans back to a straight horizontal alignment, improving text line recognition."
    },
    {
      question: "Does the tool support column layouts?",
      answer: "Yes. Tesseract.js contains advanced layout analysis algorithms that segment text into columns and paragraphs, preserving the correct reading order."
    },
    {
      question: "Does the searchable PDF download replace my original file?",
      answer: "No. The searchable PDF is compiled as a new document, keeping your original scanned PDF safe on your device."
    },
    {
      question: "Does this tool support batch uploading of multiple PDFs?",
      answer: "Yes. You can upload multiple files at once. You can process them in sequence and download the results together in a ZIP file."
    },
    {
      question: "Can I copy the recognized text directly to my clipboard?",
      answer: "Yes. The live preview panel features a 'Copy' button to copy the extracted text to your clipboard with a single click."
    },
    {
      question: "Why does Tesseract.js need to load when I first use the tool?",
      answer: "The first time you run OCR, the browser downloads Tesseract's web workers and the language dictionary files, which are then cached for future use."
    },
    {
      question: "What is an LSTM neural network in OCR?",
      answer: "An LSTM (Long Short-Term Memory) network is a deep learning architecture that recognizes characters in context, helping the engine predict ambiguous words more accurately."
    },
    {
      question: "Is my document password sent to a server?",
      answer: "No. Decryption is performed entirely inside your browser using local JavaScript libraries, keeping your credentials secure."
    },
    {
      question: "Are signatures and images preserved in searchable PDFs?",
      answer: "Yes. Searchable PDFs keep your original scanned document as the background layer, preserving all images, handwriting, and signatures."
    },
    {
      question: "Does the OCR engine recognize vertical text?",
      answer: "Yes. Tesseract supports vertical text layouts, which is particularly useful for Asian languages like Chinese, Japanese, and Korean."
    },
    {
      question: "Can I save my OCR settings?",
      answer: "Yes. Your language selections and accuracy preferences are saved locally in your browser's LocalStorage."
    },
    {
      question: "What is the difference between OCR and digital text extraction?",
      answer: "Digital extraction copy-pastes existing font characters from text-based PDFs. OCR processes images, analyzes pixel shapes, and converts them into text."
    },
    {
      question: "Can I export tabular data as an Excel file?",
      answer: "You can export tables as CSV files, which can be opened directly in Microsoft Excel, Google Sheets, or any other spreadsheet software."
    },
    {
      question: "Does this tool work on scanned images like JPG or PNG?",
      answer: "This page is optimized for PDFs, but you can also upload image files (JPG, PNG) directly to extract text."
    },
    {
      question: "Does Tesseract run on my GPU?",
      answer: "Tesseract.js runs on your CPU using WebAssembly. Speed is determined by your CPU core speed and the number of active browser worker threads."
    },
    {
      question: "Why should I use client-side OCR instead of a cloud service?",
      answer: "Client-side OCR is free, doesn't require uploading sensitive files to external servers, and runs instantly in your browser sandbox, keeping your documents private."
    },
    {
      question: "How long are my files stored in memory?",
      answer: "Files are held in the browser's temporary memory only while the tab is active. They are deleted immediately when you close the tab or click 'Remove PDF'."
    }
  ],

  relatedTools: [
    { name: "PDF to Word", slug: "pdf-to-word" },
    { name: "Word to PDF", slug: "word-to-pdf" },
    { name: "PDF Extract Pages", slug: "pdf-extract-pages" },
    { name: "PDF Crop Pages", slug: "pdf-crop-pages" },
    { name: "PDF Metadata Viewer", slug: "pdf-metadata-viewer" },
    { name: "PDF Metadata Editor", slug: "pdf-metadata-editor" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" }
  ],

  features: [
    "100% secure client-side browser execution—no file uploads",
    "Extract raw text from scanned PDFs and images",
    "Generate Searchable PDFs with invisible selectable text layers",
    "Table recognition extracting data to CSV and JSON formats",
    "Support for over 60 languages with multi-language OCR options",
    "Interactive side-by-side original page vs recognized text comparison",
    "Image preprocessing filters: Contrast, noise reduction, deskew",
    "Target specific pages or page ranges",
    "Displays OCR confidence scores and detected languages",
    "LocalStorage saved language profiles and history logs"
  ],

  useCases: [
    "Convert scanned book chapters into searchable PDFs for study notes",
    "Extract tables from printed financial statements into Excel sheets",
    "Digitize old paper contracts and receipts for digital storage",
    "Search and highlight scanned legal documents quickly",
    "OCR bilingual or multilingual document scans securely and privately",
    "Batch-digitize document packages local to your browser"
  ],

  howToSteps: [
    "Select or drag and drop your scanned PDF file into the upload box.",
    "Choose your document's language and select your OCR mode (e.g. Searchable PDF or Text Extract).",
    "Optionally enable auto-contrast and noise-reduction filters for poor scans.",
    "Select the pages or page ranges you want to process.",
    "Click 'Run OCR' to process the document locally in your browser.",
    "Preview the results side-by-side, then copy the text or download the output."
  ],

  examples: [
    {
      title: "Converting Scanned Invoices",
      description: "Extract text and billing details from a paper scan.",
      input: "Upload: invoice_scan.pdf (1 page)\nMode: Text Extract\nLanguage: English",
      output: "invoice_scan_extracted.txt (extracted copyable text with billing address and values)"
    },
    {
      title: "Creating Searchable Records",
      description: "Convert a scanned contract scan into a searchable archive.",
      input: "Upload: contract_scan.pdf (5 pages)\nMode: Searchable PDF\nLanguage: English, Spanish",
      output: "contract_scan_searchable.pdf (5 pages: visual images with interactive selectable text overlay)"
    }
  ]
};
