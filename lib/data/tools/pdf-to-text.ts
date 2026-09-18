import { ToolConfig } from './types';

export const pdfToTextConfig: ToolConfig = {
  slug: "pdf-to-text",
  title: "Convert PDF to Text | Fast Plain Text Extractor",
  shortDescription: "Extract clean, unformatted plain text from any PDF document directly in your browser. Reconstructs reading order, removes page breaks, and guarantees 100% privacy.",
  category: "PDF Tools",
  keywords: [
    "pdf to text", "convert pdf to text", "extract text from pdf", "pdf to txt",
    "copy text from pdf", "pdf text reader", "batch pdf to text",
    "offline pdf to text", "client side pdf text extraction", "clean text from pdf",
    "pdf to llm text", "pdf text scraper"
  ],

  longDescription: `
## Extract Clean, Formatted Text from Any PDF Document

Copying text from a PDF document in a conventional PDF viewer frequently leads to frustrating formatting nightmares: hard line breaks terminating every sentence halfway across the screen, hyphenated words split into fragments across lines, running page numbers and copyright notices interrupting paragraphs, and multi-column articles merging into incomprehensible garble. Because the Portable Document Format is designed exclusively for visual placement rather than logical flow, manual copy-pasting often requires hours of tedious cleanup.

Our **PDF to Text Converter** resolves these issues at the algorithmic level. By analyzing character coordinate matrices, font metrics, and geometric layout rules, the tool reconstructs natural paragraph boundaries, respects true reading order, and extracts clean, unformatted plain text (\`.txt\`) ready for automated data pipelines, Large Language Model (LLM) prompts, or research note-taking.

---

### Architectural Comparison: Text Extraction Formats for Downstream Workflows

When extracting data from PDFs for analysis, selecting the right output representation determines processing speed, token efficiency, and scriptability:

| Metric / Dimension | Plain Text (.txt - Our Tool) | Markdown (.md) | Structured JSON | Word (.docx) |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Purpose** | Raw NLP, LLM context, search indexing | Web documentation, note-taking apps | Programmatic data pipelines, APIs | Human editing and re-formatting |
| **Token Economy (LLM Context)** | **Optimal** (zero syntax overhead) | Moderate (includes markdown syntax) | High overhead (keys, brackets, commas) | N/A (binary container) |
| **Regex & Grep Friendly** | 100% native command-line compatible | High (standard text search) | Requires JSON query tools (jq) | Requires unzip / parsing libraries |
| **Formatting Retention** | Pure body content without styles | Headings, bold, italics, links | Key-value pairs and coordinate tags | Full typography, margins, styles |
| **File Weight** | Minimal (a few kilobytes per 50 pages) | Minimal (slight markup overhead) | Moderate (nested object structures) | Heavy (ZIP container with XML) |
| **In-Browser Privacy** | **100% Local RAM**; zero cloud uploads | Client-side or server | Client-side or server | Typically requires server engine |

---

### The Engineering Pipeline: How In-Browser PDF Text Extraction Works

A PDF does not contain continuous paragraphs. Internally, a PDF page is a sequence of drawing commands where individual characters or short text fragments are positioned on a 2D Cartesian plane using operators like \`BT\` (Begin Text), \`Tf\` (Set Font), \`Tm\` (Set Text Matrix), and \`Tj\` / \`TJ\` (Show Text). Reconstructing readable text requires an advanced reverse-engineering pipeline:

1. **Content Stream Tokenization & CMap Decoding**: The parser scans the PDF's binary object streams to locate text showing operators. When a PDF uses subsetted or custom-encoded fonts, characters are represented by internal glyph indices rather than standard ASCII values. The engine parses the embedded \`ToUnicode\` character map (CMap) table, translating internal glyph indices back into valid UTF-8 characters and resolving combined ligatures (such as \`fi\`, \`fl\`, \`ffi\`, and \`ffl\`).
2. **Spatial Coordinate Clustering & Column Isolation**: The parser sorts text objects by vertical (Y) and horizontal (X) coordinates. In multi-column documents (like academic papers or newspapers), reading strictly top-to-bottom across the full page width merges lines from column 1 into column 2. Our engine calculates horizontal projection histograms to identify vertical gutters, ensuring the left column is completely transcribed before the right column begins.
3. **De-Hyphenation & Flow Re-Assembly**: Words split at the end of lines with trailing hyphens (e.g. \`trans- / portation\`) are algorithmically evaluated. Using linguistic heuristics, the engine strips trailing hyphens and merges the halves into a single unified word, while preserving legitimate compound words (e.g., \`state-of-the-art\`).
4. **Header & Footer Suppression**: Running headers, document titles, and repeating page numbers that appear at identical coordinates at the top and bottom of each page can be detected and filtered out, preventing boilerplate text from breaking up narrative paragraphs.
5. **Whitespace & Paragraph Normalization**: Soft line breaks within a single flowing sentence are replaced with standard spaces, while distinct headings, lists, and paragraph boundaries receive double-line breaks for pristine readability.

---

### In-Depth Troubleshooting Guide for PDF to Text Extraction

Different PDF generators produce vastly different internal structures. Below are practical solutions to the most common extraction challenges:

#### 1. Empty Text Output on Scanned Documents
If a PDF file produces zero text or returns completely blank output, the document is likely a scanned bitmap image without a digital text layer.
- **Diagnosis**: Open the PDF and try selecting words with your mouse cursor. If you can only drag a blue selection box over the whole page like an image, the file lacks an embedded text stream.
- **Solution**: The document must be processed through an Optical Character Recognition (OCR) engine first to generate digital text coordinates before plain text extraction can take place.

#### 2. Garbled Characters and Broken Encodings (Mojibake)
Occasionally, extracting text produces nonsensical strings of symbols or unreadable question marks (e.g., \`▯▯▯▯\` or \`!@#$%\`).
- **Diagnosis**: This occurs when a PDF was created with a custom subsetted font that omitted the standard \`ToUnicode\` character map. The PDF viewer knows how to draw the vector glyphs, but has discarded the mapping from glyph to character code.
- **Solution**: Our engine applies heuristic font-family fallbacks and common Unicode mapping tables to reconstruct characters wherever possible.

#### 3. Preserving Tabular Data Alignment
When financial balance sheets or data tables are converted to plain text, columns can collapse into a single vertical stream.
- **Solution**: Switch to the **Tab-Delimited Layout** mode in the extraction settings. This mode measures horizontal character distances and injects tab stops (\`\\t\`) between spaced columns, allowing you to paste the output directly into Excel or Google Sheets.

#### 4. Handling Left-to-Right and Right-to-Left (BiDi) Scripts
Documents containing Arabic, Hebrew, or mixed bilingual scripts can suffer from reversed character ordering.
- **Solution**: The engine incorporates the Unicode Bidirectional Algorithm (UAX #9) to ensure that directional changes are handled correctly, preserving natural reading order in bidirectional texts.

---

### Enterprise Compliance & The Zero-Upload Privacy Guarantee

Legal deposition transcripts, clinical trial protocols, proprietary financial balance sheets, and internal memos demand rigorous data security. Uploading these documents to public cloud converters creates severe regulatory non-compliance risks.

Our PDF to Text Converter operates under an uncompromising **Zero-Upload Security Model**:
- **100% In-Browser Execution**: Text extraction, CMap decoding, and coordinate clustering happen exclusively inside your browser's local sandbox memory.
- **Zero Cloud Footprint**: Your documents never leave your computer, are never sent across the internet, and are never saved to external databases.
- **Enterprise Regulatory Compliance**: Fully compliant with strict corporate privacy mandates, including GDPR, HIPAA, SOC 2 Type II, and corporate Non-Disclosure Agreements (NDAs).
`,

  features: [
    "100% Client-Side Privacy: Your PDF documents are never uploaded to any remote server",
    "Intelligent Reading Order: Accurately parses multi-column layouts without merging text across gutters",
    "Unicode CMap & Ligature Resolution: Cleanly decodes subsetted fonts and combined glyphs (fi, fl, ffi)",
    "Automatic De-Hyphenation: Reassembles words split across line breaks into continuous text",
    "Running Header & Footer Filtering: Automatically suppresses repeated page numbers and boilerplate headers",
    "One-Click Copy & Download: Instantly copy extracted text to your clipboard or download as a .txt file",
    "Instant Character & Word Counts: View live statistics on extracted word and character density",
    "Token-Optimized Output: Formats text cleanly for direct use in Large Language Models (LLMs) and RAG pipelines"
  ],

  useCases: [
    "Data scientists and AI engineers preparing clean training data and prompt context for LLMs and RAG systems",
    "Legal assistants extracting testimony, clauses, and case details from court filings and PDF contracts",
    "Researchers and students transcribing quotes, citations, and literature from academic papers",
    "Software developers converting PDF software documentation and API guides into Markdown wikis",
    "Journalists and investigators quickly searching and reviewing large leaked PDF document dumps",
    "Financial analysts extracting earnings call transcripts and quarterly disclosures for NLP sentiment analysis"
  ],

  howToSteps: [
    "Select or drag-and-drop your PDF document into the converter dropzone.",
    "The client-side engine immediately extracts the text stream and reconstructs paragraph hierarchy.",
    "Inspect the extracted text in the live editor window and review word and character counts.",
    "Toggle formatting options such as preserving original line breaks or flowing continuous paragraphs.",
    "Click 'Copy Text' to copy to your clipboard, or click 'Download TXT' to save the file to your computer."
  ],

  examples: [
    {
      title: "Academic Paper Extraction for LLM Summarization",
      description: "Extracting a two-column research paper into clean, flowing paragraphs for an AI prompt.",
      input: "quantum-computing-advances.pdf (14 pages, 2 columns)",
      output: "quantum-computing-advances.txt (7,420 words, continuous paragraphs, no split words)"
    },
    {
      title: "Commercial Lease Agreement Review",
      description: "Extracting specific clauses and terms from a 30-page legal PDF for contract review.",
      input: "commercial-lease-contract.pdf (30 pages)",
      output: "commercial-lease-contract.txt (Clean text ready for keyword search and legal analysis)"
    },
    {
      title: "Financial Earnings Transcript Extraction",
      description: "Extracting executive commentary from an earnings call presentation for NLP sentiment analysis.",
      input: "q3-earnings-presentation.pdf (22 pages)",
      output: "q3-earnings-transcript.txt (Filtered of slide headers and footers, ready for NLP pipelines)"
    }
  ],

  relatedTools: [
    { name: "PDF to Word", slug: "pdf-to-word" },
    { name: "Word Counter", slug: "word-counter" },
    { name: "PDF to HTML", slug: "pdf-to-html" },
    { name: "Case Converter", slug: "case-converter" }
  ],

  faq: [
    {
      question: "Are my PDF files uploaded to any server during text extraction?",
      answer: "No. The entire extraction pipeline runs 100% locally inside your web browser using client-side JavaScript and WebAssembly. Your files never leave your computer."
    },
    {
      question: "Why does standard copying from a PDF introduce random line breaks?",
      answer: "PDFs store text as individual visual fragments at coordinate positions rather than continuous paragraphs. Our tool analyzes character coordinates and line heights to reconstruct natural flowing paragraphs without unwanted breaks."
    },
    {
      question: "How does the tool handle two-column or multi-column documents?",
      answer: "Our parser detects vertical gutters between columns using spatial coordinate analysis, ensuring that the left column is completely read before moving to the right column, preventing text scrambling."
    },
    {
      question: "Can I extract text from scanned documents or photographs of pages?",
      answer: "This tool extracts digital text and vector layers already present in the PDF. If your PDF is a scanned image without a digital text layer, it will require Optical Character Recognition (OCR) first."
    },
    {
      question: "How does the tool handle hyphenated words split across line breaks?",
      answer: "The engine uses intelligent de-hyphenation rules to reassemble split words (e.g. 'com- / puter' becomes 'computer') while preserving genuine compound words like 'user-friendly'."
    },
    {
      question: "Can I remove repeated headers, footers, and page numbers?",
      answer: "Yes. The tool can automatically detect and filter out repeated text blocks that appear at identical coordinates at the top and bottom of each page, providing clean body copy."
    },
    {
      question: "Is the extracted text suitable for Large Language Models (LLMs)?",
      answer: "Yes. By stripping binary overhead, vector paths, and formatting noise, the extracted plain text maximizes token efficiency and eliminates prompt formatting errors in LLMs like Gemini, ChatGPT, or Claude."
    },
    {
      question: "How does the tool handle ligatures like 'fi', 'fl', and 'ffi'?",
      answer: "The parser reads the embedded ToUnicode CMap table and maps composite font ligatures back to individual standard characters so words remain fully searchable."
    },
    {
      question: "Can I copy the extracted text directly to my clipboard?",
      answer: "Yes. Simply click the 'Copy Text' button to copy the entire extracted text to your clipboard with a single click."
    },
    {
      question: "Is there a limit on document length or file size?",
      answer: "Because processing occurs directly in your browser's local RAM, documents with hundreds of pages convert smoothly on modern computers. Processing time depends on your device's CPU and memory."
    },
    {
      question: "Does the tool support non-English languages and right-to-left scripts?",
      answer: "Yes. The converter supports full UTF-8 Unicode decoding, including Cyrillic, Greek, CJK (Chinese, Japanese, Korean), and bidirectional scripts like Arabic and Hebrew."
    },
    {
      question: "Can I use this tool offline without an active internet connection?",
      answer: "Yes. Once the web page is loaded in your browser, all PDF parsing and text extraction occur completely offline without requiring internet connectivity."
    }
  ]
};
