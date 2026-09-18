import { ToolConfig } from './types';

export const pdfToExcelConfig: ToolConfig = {
  slug: "pdf-to-excel",
  title: "Convert PDF to Excel | Extract Tables to XLSX & CSV",
  shortDescription: "Accurately extract tables, financial spreadsheets, and invoices from PDF documents into editable Microsoft Excel (XLSX) or CSV files directly in your browser with 100% privacy.",
  category: "PDF Tools",
  keywords: [
    "pdf to excel", "convert pdf to excel", "extract table from pdf", "pdf to xlsx",
    "pdf to csv", "bank statement to excel", "invoice to spreadsheet",
    "offline pdf to excel", "client side pdf to excel", "pdf table scraper",
    "financial pdf to excel", "convert statement to xlsx"
  ],

  longDescription: `
## Extract Complex Tables from Locked PDFs into Editable Excel Spreadsheets

In modern corporate finance, auditing, data science, and business operations, data is your most valuable asset. However, an enormous percentage of critical business information—quarterly earnings statements, bank transaction registers, tax filings, vendor invoices, inventory manifests, and clinical trial results—is trapped inside static PDF files. While PDFs excel at visual presentation, copy-pasting tables from a standard PDF viewer into Microsoft Excel or Google Sheets almost always results in a broken mess: multi-line descriptions create phantom rows, columns collapse into a single stream, and numbers get imported as un-calculable text strings.

Our **PDF to Excel Converter** reconstructs the underlying table geometry, transforming flat document pages into clean, multi-column Microsoft Excel (\`.xlsx\`) and CSV spreadsheets directly inside your browser. With intelligent numeric parsing and automated row baseline alignment, your data is formula-ready the moment you open it.

---

### Architectural Comparison: Data Extraction Formats for Tabular Documents

Choosing the right format when liberating tabular data from static documents determines how quickly your team can build models, execute formulas, and automate workflows:

| Technical Feature | Microsoft Excel (.xlsx - Our Tool) | Raw Comma-Separated (.csv) | Programmatic JSON | Manual Copy-Paste |
| :--- | :--- | :--- | :--- | :--- |
| **Formula & Math Readiness** | **Immediate**; numbers formatted as numeric types | Requires manual column formatting | Requires custom parser script | Broken; strings often un-calculable |
| **Multi-Sheet Workbooks** | Supports multi-tab sheets per PDF page | Single flat table only | Nested object arrays | Single clipboard buffer |
| **Merged Cell Handling** | Preserves \`colspan\` and merged header bands | Collapses or duplicates into empty commas | Key-value hierarchy | Merged text pastes into random cells |
| **Column Width Adaptation** | Auto-calculated column widths based on content | Plain text stream without geometry | Geometric coordinate metadata | Distorted cell widths |
| **Data Cleaning Time** | Zero; ready for immediate \`SUM\` and \`VLOOKUP\` | Minimal; easy import into Python/pandas | Moderate; developer pipeline needed | Extreme; hours of manual re-typing |
| **Data Privacy & Uploads** | **100% In-Browser**; zero server uploads | 100% In-Browser | Dependent on script/API | Local clipboard |

---

### The Engineering Pipeline: How In-Browser PDF Table Extraction Operates

A PDF does not contain semantic \`<table>\`, \`<tr>\`, or \`<td>\` tags. In fact, a PDF has zero inherent concept of a spreadsheet. It merely contains individual drawing instructions placing character glyphs and vector lines at arbitrary X and Y coordinates.

Transforming this raw coordinate soup into structured Excel worksheets requires advanced spatial heuristics executed in client-side memory:

1. **Vector Grid Line & Border Recognition**: The engine scans the PDF's vector stream to detect horizontal and vertical path strokes. By locating intersections (corners, T-junctions, and crosses), it establishes the explicit cell bounding boxes of bordered tables.
2. **Whitespace Gutter Projection (Borderless Tables)**: For financial reports that format balance sheets without visible lines, the parser calculates horizontal and vertical projection histograms across character bounding boxes. Peaks of whitespace identify natural column gutters, defining column boundaries without relying on visible borders.
3. **Baseline Alignment & Multi-Line Cell Grouping**: Text segments sharing the same vertical baseline are grouped into rows. When a cell contains wrapped text (such as an itemized product description spanning two lines), our algorithm checks vertical proximity and column boundaries, keeping multi-line text encapsulated within a single spreadsheet cell rather than splitting it into multiple disjointed rows.
4. **Type Casting & Numeric Sanitization**: Raw text strings representing currency values (e.g. \`$1,249.50\`), percentages (\`14.2%\`), or accounting negatives (e.g. \`(450.00)\`) are parsed. The engine extracts clean numeric floats while applying standard Excel number formatting, allowing financial analysts to immediately run formulas like \`SUM(C2:C50)\` without green "number stored as text" error flags.
5. **OpenXML Workbook Assembly**: The extracted tables are compiled into an OpenXML Spreadsheet (\`.xlsx\`) file using client-side JavaScript libraries. Column widths are calculated automatically to prevent truncated cells (\`###\` errors), and the binary file is exported directly to your computer.

---

### In-Depth Troubleshooting Guide for PDF to Excel Conversion

Financial documents and legacy reports present unique tabular complexities. Below are solutions to common extraction hurdles:

#### 1. Preventing Numbers from Being Stored as Text Strings
When numbers are stored as plain strings in Excel, formulas like \`=SUM()\` return \`0\` or throw errors.
- **Solution**: Our converter features an automatic type-casting engine that detects currency symbols (\$, €, £), thousand-separators (commas), and accounting parentheses (denoting negative numbers), normalizing them into standard numeric cell values while applying appropriate display formatting.

#### 2. Resolving Multi-Line Cell Row Splitting
In invoices or purchase orders, an item description like *"Heavy-Duty Industrial Steel Bearings (Model 402)"* can wrap across two lines, causing naive extractors to create two separate rows where the second row has an empty price.
- **Solution**: The layout engine calculates row bounding envelopes. If adjacent text segments share a column envelope and have vertical line spacing smaller than the standard row gap, they are joined with an in-cell line break (\`Alt+Enter\`), preserving single-row integrity.

#### 3. Handling Multi-Page Financial Tables
Corporate annual reports and bank statements often span multiple pages with repeating column headers on every sheet.
- **Solution**: Select **Merge Multi-Page Tables** in the export settings. The parser detects identical column layouts across consecutive pages, stripping duplicate header rows and compiling the entire transaction history into a single continuous worksheet.

#### 4. Handling Scanned Statements (Image-Only PDFs)
If your PDF is a scanned photocopy of a paper invoice without selectable text, the coordinate parser cannot read character positions.
- **Solution**: Scanned documents must be processed with an Optical Character Recognition (OCR) engine first to generate digital text coordinates before tabular reconstruction can take place.

---

### Enterprise Compliance & The Zero-Upload Privacy Guarantee

Corporate bank statements, executive payroll registers, customer billing histories, and confidential audit ledgers contain trade secrets and personally identifiable information (PII). Uploading these documents to public cloud converters violates fundamental data governance standards and exposes your organization to regulatory penalties.

Our PDF to Excel Converter adheres to an uncompromised **Zero-Upload Privacy Architecture**:
- **100% Local In-Browser Processing**: All coordinate mapping, text clustering, and OpenXML Excel compilation occur entirely inside your browser's local memory.
- **Zero Cloud Footprint**: Your financial files never leave your computer, are never sent across the internet, and are never saved in remote databases.
- **Complete Enterprise Compliance**: Safely satisfies strict regulatory frameworks including GDPR, HIPAA, SOC 2, and corporate Non-Disclosure Agreements (NDAs).
`,

  features: [
    "100% Client-Side Privacy: Your confidential financial data never uploads to any external server",
    "Spatial Table Detection: Accurately identifies columns and rows in both bordered and borderless tables",
    "Dual Export Formats: Download formula-ready Microsoft Excel (.xlsx) workbooks or universal CSV files",
    "Smart Type Casting: Automatically converts currency, dates, and percentages into true numeric values",
    "Multi-Line Cell Grouping: Keeps wrapped descriptions inside single rows without creating phantom lines",
    "Multi-Page Table Stitching: Merges long continuous tables across multiple pages into one continuous sheet",
    "Auto-Fit Column Widths: Eliminates annoying Excel truncated cell errors (###) automatically",
    "Fast WebAssembly Engine: Converts dense financial reports in seconds directly within your device's memory"
  ],

  useCases: [
    "Accountants and bookkeepers extracting transaction registers from PDF bank and credit card statements",
    "Financial analysts pulling quarterly income statements and balance sheets into Excel valuation models",
    "Procurement teams converting vendor invoices, purchase orders, and supplier price lists into spreadsheets",
    "Data scientists transforming published academic and census data tables into clean CSV datasets",
    "Tax professionals digitizing W-2, 1099, and corporate tax schedules for accounting software import",
    "Operations managers converting shipping manifests and inventory packing slips into stock databases"
  ],

  howToSteps: [
    "Select or drag-and-drop your PDF document into the secure local converter dropzone.",
    "The client-side engine scans page geometry, identifying column gutters and table row baselines.",
    "Inspect the interactive table preview to verify columns, headers, and numeric cell alignments.",
    "Choose your preferred export format: Microsoft Excel (.xlsx) or Universal Comma-Separated (.csv).",
    "Click 'Download Excel' to save your fully editable, formula-ready spreadsheet directly to your device."
  ],

  examples: [
    {
      title: "Commercial Bank Statement Extraction",
      description: "Converting a 6-page corporate checking statement into an Excel spreadsheet with clean date, memo, and balance columns.",
      input: "corporate-checking-statement-august.pdf (6 pages)",
      output: "corporate-checking-statement-august.xlsx (Formatted table with 240 categorized transaction rows, formula-ready)"
    },
    {
      title: "Vendor Invoice Line Items",
      description: "Extracting an itemized hardware equipment bill into a structured spreadsheet for accounting entry.",
      input: "equipment-invoice-inv782.pdf (1 page)",
      output: "equipment-invoice-inv782.xlsx (Columns: Item Code, Description, Qty, Unit Price, Total, formatted as currency)"
    },
    {
      title: "Academic Research Census Table",
      description: "Extracting a multi-column demographic data table from an academic study into a clean CSV file.",
      input: "demographic-study-appendix.pdf (Table on page 18)",
      output: "demographic-data.csv (Clean comma-separated values ready for import into Python pandas or R)"
    }
  ],

  relatedTools: [
    { name: "PDF to Text", slug: "pdf-to-text" },
    { name: "Excel to PDF", slug: "excel-to-pdf" },
    { name: "PDF to Word", slug: "pdf-to-word" },
    { name: "CSV Viewer", slug: "csv-viewer" }
  ],

  faq: [
    {
      question: "Are my bank statements or financial documents uploaded to any server?",
      answer: "No. The entire conversion process runs 100% locally inside your web browser using client-side JavaScript. Your files never leave your computer and are never transmitted over the internet."
    },
    {
      question: "Will numbers in the exported Excel file work with formulas like SUM and AVERAGE?",
      answer: "Yes. Our engine sanitizes currency symbols, commas, and negative accounting parentheses, formatting cells as true numeric values so that formulas calculate immediately without error."
    },
    {
      question: "How does the tool handle tables without visible grid lines?",
      answer: "The parser calculates vertical whitespace projection histograms across text coordinates. Gaps where no characters exist establish natural column gutters, accurately reconstructing borderless tables."
    },
    {
      question: "Can I convert multi-page statements into a single continuous Excel sheet?",
      answer: "Yes. The converter detects identical column structures across consecutive pages, removes redundant page headers, and appends all rows into a single continuous Excel worksheet."
    },
    {
      question: "How does the tool prevent wrapped text from creating extra rows?",
      answer: "Our baseline alignment algorithm measures vertical line spacing within column boundaries. Wrapped text lines belonging to the same row are grouped into a single cell using in-cell line breaks."
    },
    {
      question: "What is the difference between exporting as XLSX versus CSV?",
      answer: "XLSX preserves auto-calculated column widths, multi-sheet workbooks, and explicit cell data types. CSV exports raw comma-separated text, which is ideal for importing into programming scripts (Python, R)."
    },
    {
      question: "Can I extract tables from scanned paper documents?",
      answer: "This tool extracts digital text and vector lines already present in the PDF. If your PDF is a scanned photocopy without selectable text, it requires Optical Character Recognition (OCR) first."
    },
    {
      question: "Does the tool support password-protected PDF statements?",
      answer: "Yes. If your bank statement has an open password, your browser will prompt you to enter the password locally to decrypt the document. The password is never sent anywhere."
    },
    {
      question: "Can I choose which pages to convert?",
      answer: "Yes. In the page selection settings, you can choose to convert all pages, specify a custom page range (e.g., 2-5), or select individual pages."
    },
    {
      question: "Why do some columns appear merged when copying manually from a PDF?",
      answer: "Standard PDF viewers copy text in linear stream order without understanding 2D spatial layout. Our converter analyzes geometric coordinates to ensure columns remain strictly separated."
    },
    {
      question: "Is there a limit on file size or row count?",
      answer: "You can convert documents with dozens of pages and thousands of rows on modern desktop computers. Because processing occurs in your device's memory, capacity is governed by your computer's RAM."
    },
    {
      question: "Can I use this tool offline without an active internet connection?",
      answer: "Yes. Once the tool page is loaded in your browser, all PDF parsing and Excel compilation happen entirely offline without requiring internet access."
    }
  ]
};
