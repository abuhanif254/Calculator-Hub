import { ToolConfig } from './types';

export const excelToPdfConfig: ToolConfig = {
  slug: "excel-to-pdf",
  title: "Excel to PDF",
  shortDescription: "Convert Excel spreadsheets (XLSX, XLS) to high-quality PDF files online. Preserves grid lines, fonts, merges, alignments, and formulas. Processed 100% locally in your browser.",
  category: "PDF Tools",
  keywords: [
    "Excel to PDF", "Convert Excel to PDF", "XLSX to PDF", "XLS to PDF", "Spreadsheet to PDF",
    "Excel PDF Converter", "Convert Excel Files", "Business Reporting", "Financial Reports",
    "Spreadsheet Publishing", "Online PDF Converter", "excel to pdf converter free", "xlsx to pdf online"
  ],
  longDescription: `
# The Definitive Technical Guide to Excel-to-PDF Conversion: Tabular Layout Reconstruction, Dynamic Grid Pagination, and Client-Side Zero-Trust Rendering Pipelines

Converting dynamic grid-based spreadsheets (such as Microsoft Excel XLSX or legacy binary XLS files) into a static, layout-fixed format like Portable Document Format (PDF) is one of the most complex tasks in document publishing. While a word processor uses a flowable line-and-paragraph model, a spreadsheet is a multi-dimensional, infinite Cartesian coordinate system. It does not possess a natural concept of a "page" or "margin" until it is formatted explicitly for physical output.

This comprehensive guide details the technical execution of Excel-to-PDF conversion. We will examine the structures of OpenXML SpreadsheetML and PDF, detail the layout engines used to map styles, cells, columns, and rows, dissect the mathematics of layout scaling (such as "Fit to Page"), and discuss the security advantages of local client-side browser processing.

---

## 1. Document Models: OpenXML SpreadsheetML (XLSX) vs. PDF fixed Canvas

To understand how a spreadsheet is converted into a PDF, we must analyze the structural specifications of both formats.

### The Spreadsheet Document Model: OpenXML / SpreadsheetML
Since Microsoft Office 2007, Excel spreadsheets have been saved under the **Office Open XML (OOXML)** standard (ISO/IEC 29500). An \`.xlsx\` file is a ZIP package containing multiple XML files representing the workbook structure.

The core data is stored in a hierarchical structure:
1. **\`[Content_Types].xml\`**: Defines the content type of each XML part inside the package.
2. **\`xl/workbook.xml\`**: Contains sheet definitions, worksheet relationship IDs, and global workbook parameters.
3. **\`xl/worksheets/sheet1.xml\`**: Contains the cell values, formulas, dimensions, merges, and column widths of sheet 1.
4. **\`xl/sharedStrings.xml\`**: Stores unique string values referenced in cell nodes to reduce redundancy and file footprint.
5. **\`xl/styles.xml\`**: Defines cell styles, including fills (backgrounds), borders, fonts, number formatting, alignments, and custom themes.

Here is a simplified example of sheet data inside \`xl/worksheets/sheet1.xml\`:

\`\`\`xml
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="A1:C3"/>
  <cols>
    <col min="1" max="1" width="15.5" customWidth="1"/>
    <col min="2" max="2" width="22.0" customWidth="1"/>
  </cols>
  <sheetData>
    <row r="1" ht="28" customHeight="1">
      <c r="A1" s="2" t="s">
        <v>0</v> <!-- References sharedStrings[0]: "Q1 Sales Report" -->
      </c>
    </row>
    <row r="2" ht="20">
      <c r="A2" s="1" t="n">
        <v>1420.50</v> <!-- Number value: 1420.50 -->
      </c>
      <c r="B2" s="1">
        <f>A2*1.15</f> <!-- Formula definition -->
        <v>1633.58</v> <!-- Cached computed value -->
      </c>
    </row>
  </sheetData>
  <mergeCells count="1">
    <mergeCell ref="A1:C1"/>
  </mergeCells>
</worksheet>
</xml>
\`\`\`

In SpreadsheetML:
- **Worksheets** contain a grid size range (\`<dimension>\`) specifying the boundaries of active data (e.g. \`A1:C3\`).
- **Columns** (\`<cols>\` and \`<col>\`) specify absolute column widths.
- **Rows** (\`<row>\`) declare row heights and contain collections of cells.
- **Cells** (\`<c>\`) contain a cell coordinate coordinate label (e.g. \`A2\`), a reference style index (\`s="1"\`), a content type identifier (\`t\`), and a value (\`<v>\`). If the cell contains a formula, the formula structure is stored inside the \`<f>\` element, alongside its cached calculated result in \`<v>\`.
- **Merged Cells** (\`<mergeCells>\`) specify rectangular coordinates that should be combined into a single display node (e.g. \`A1:C1\`).

The core characteristic of this model is that it is **open-ended and coordinate-free**. Unlike a word document that flows down, an Excel sheet can grow infinitely down (up to 1,048,576 rows) and right (up to 16,384 columns). It has no page headers, page footers, or margins by default unless explicit "Print Titles" or "Page Setup" metadata is defined.

### The PDF Document Model: Static Vector Grids
A PDF (Portable Document Format, standardized as ISO 32000) represents pages as fixed vector canvasses. Text runs, cell borders, background fills, and grid lines must be drawn at absolute coordinate points using drawing operators:

\`\`\`text
Page Canvas: Width = 792 pt, Height = 612 pt (Letter Landscape)
1 w (Set border line width = 1)
0.2 0.2 0.2 RG (Set gray color for borders)
72.00 540.00 m 720.00 540.00 l S (Draw horizontal line top of row)
72.00 500.00 m 720.00 500.00 l S (Draw horizontal line bottom of row)
BT
/F1 10.00 Tf
75.00 515.00 Td
(Q1 Sales Report) Tj
ET
\`\`\`

A PDF does not possess a grid structure. The table grid lines, cell background fills, and textual contents are completely separate vector operations that are painted onto a blank canvas page.

### The Converter's Challenge: Grid Segmentation and Scaling
The converter must calculate sheet dimensions, column widths, row heights, and layout rules, map merged ranges, resolve colors and borders, segment the infinite grid into page-sized blocks, apply optional scaling metrics (like fitting all columns to page width), and draw the result onto a fixed PDF coordinate stream.

---

## 2. Spreadsheet Style Reconstruction: Fonts, Fills, Borders, and Merges

Preserving the exact visual aesthetic of an Excel sheet requires extracting dynamic formatting stylesheets from \`xl/styles.xml\`.

### Cell Fills (Background Colors)
Excel supports solid background fills, gradients, and pattern fills. These are defined inside the styles table:
- **Solid Colors**: Defined in ARGB hex formats (e.g. \`FFF2F2F2\` for light gray) or as theme references (e.g. \`theme="1" tint="-0.15"\`). The converter must resolve theme references to absolute RGB colors.
- **Rendering Fills**: In the HTML DOM generation phase, background colors are translated to inline CSS style rules: \`background-color: rgb(242, 242, 242)\`.

### Borders and Grid Lines
Spreadsheet cells can have unique top, bottom, left, and right borders with different styles (thin, medium, thick, double, dashed) and colors. 
1. **Gridlines Toggle**: By default, spreadsheets show gray grid lines between empty cells. If active, the renderer must apply a default border (e.g. \`0.5px solid #d4d4d8\`) to all cells in the sheet.
2. **Custom Borders**: If a cell declares explicit borders, the renderer overrides the default grid lines. Border styles are translated:
   - \`thin\` $\rightarrow$ \`1px solid\`
   - \`medium\` $\rightarrow$ \`2px solid\`
   - \`thick\` $\rightarrow$ \`3px solid\`
   - \`double\` $\rightarrow$ \`3px double\`
3. **Border Collapsing**: To avoid double-thick borders between adjacent cells, the rendering table must use \`border-collapse: collapse\`.

### Cell Merging
When cells are merged (e.g., \`A1:C1\`), Excel only stores data and styles in the top-left cell (\`A1\`). The other cells (\`B1\`, \`C1\`) exist as blank placeholders.
During conversion:
1. The renderer parses the \`mergeCell\` references list.
2. The HTML builder sets the \`rowspan\` and \`colspan\` attributes on the cell matching the merge coordinates: \`<td colspan="3" rowspan="1">\`.
3. The placeholder cells that fall within the merge range are skipped to prevent table layout distortion.

---

## 3. The Browser-Based Client-Side Conversion Pipeline

Converting Excel files client-side without sending them to a server requires a modular, pipeline-based architecture utilizing dynamic browser canvas rasterization.

\`\`\`mermaid
graph TD
    Excel[Upload XLSX/XLS File] --> Reader[Read as ArrayBuffer]
    Reader --> Parser{File Format XLSX or XLS?}
    Parser -->|XLSX| ExcelJS[Parse Styles & Grid via exceljs]
    Parser -->|XLS| SheetJS[Parse Grid via xlsx fallback]
    ExcelJS --> RenderHTML[Construct Styled HTML Table Grid]
    SheetJS --> RenderHTML
    RenderHTML --> ScaleEngine[Apply Scale/Fit Layout Settings]
    ScaleEngine --> Pagination[Segment grid into Page Viewports]
    Pagination --> CanvasRender[Capture Page Divs via html2canvas]
    CanvasRender --> Watermark[Overlay Custom Watermarks]
    Watermark --> PdfAssemble[Embed Images into pdf-lib PDFDocument]
    PdfAssemble --> Compress[Optimize PDF & Compress Streams]
    Compress --> Download[Download Output PDF Document]
    Excel -.-> Batch[Process Multiple Files sequentially] --> Zip[Assemble ZIP Archive via JSZip]
    Zip --> BulkDownload[Download ZIP containing all PDFs]
Extended Version: Fit Sheet, Fit Columns, Fit Rows, Custom scale presets
\`\`\`

### Stage 1: File Parsing and Structure Inspection
- **XLSX Files (exceljs)**: The file is loaded via \`exceljs\`'s \`Workbook.load()\`. The parser reads the ZIP archive, extracts style nodes, merges list, cell alignments, custom widths, and sheets data.
- **XLS Files (xlsx fallback)**: For legacy binary files, SheetJS is used to parse the workbook and convert worksheet cells to row/column matrix arrays.

### Stage 2: HTML Page Pagination and Grid Wrapping
Spreadsheets cannot be printed as a single continuous block because they are too wide or tall. The pagination engine splits the grid:
1. **Dimensions**: The page target boundaries are set based on selected paper sizes (e.g. Letter: 8.5in × 11in) and orientation (Portrait or Landscape).
2. **Column Width Calculation**: Excel column widths are converted to absolute pixels (1 character width $\approx$ 8 pixels).
3. **Horizontal Segmentation (Column Splitting)**: If the cumulative width of the columns exceeds the page width (subtracting margins), the column range is split. For example, columns A to F print on page 1, and columns G to L print on page 2.
4. **Vertical Segmentation (Row Splitting)**: If the cumulative row heights exceed the page height, row breaks are inserted.
5. **Print Titles**: If configured, column headers (e.g. row 1) are duplicated at the top of every generated PDF page.

### Stage 3: Scale Fitting Algorithms
To fit tabular grids onto pages without cutting off columns or rows, the engine calculates custom CSS scale transformations:
- **Fit Columns to Page**: Fits all columns horizontally.
  $$\\text{Scale Factor } (S) = \\frac{\\text{Page Width} - 2 \\times \\text{Margin}}{\\text{Total Columns Width}}$$
- **Fit Rows to Page**: Fits all rows vertically.
  $$\\text{Scale Factor } (S) = \\frac{\\text{Page Height} - 2 \\times \\text{Margin}}{\\text{Total Rows Height}}$$
- **Fit Sheet to Page**: Fits the entire active range onto a single page.
  $$S = \\min\\left(\\frac{\\text{Page Width} - 2 \\times \\text{Margin}}{\\text{Total Width}}, \\frac{\\text{Page Height} - 2 \\times \\text{Margin}}{\\text{Total Height}}\\right)$$

### Stage 4: Rasterization (html2canvas)
1. The paginated page wrapper elements are rendered inside a hidden DOM container.
2. \`html2canvas\` is invoked with the OKLCH color polyfill active to convert CSS styles and borders into absolute pixels.
3. The page scale factor determines the canvas resolution (e.g. 2.0x for High Quality, 3.0x for Print Ready).

### Stage 5: PDF Assembly and Publishing (pdf-lib)
1. A new \`PDFDocument\` is created.
2. The canvas frames are compressed as JPEG/PNG bytes and embedded as pages.
3. Custom text/image watermarks are drawn using coordinate transforms.
4. Custom Headers & Footers are drawn at top/bottom margins, inserting dynamic text variables (e.g., \`[Page] of [Pages]\`, File Name, current Date).

---

## 4. Mathematics of Layout Scaling and Transformation Matrixes

To fit a massive spreadsheet onto a PDF page without altering font properties, the engine applies scaling transformations on the container nodes before capturing them.

When rendering, the HTML container is styled with:
\`\`\`css
transform: scale(S);
transform-origin: top left;
width: (Target Width / S)px;
height: (Target Height / S)px;
\`\`\`

By scaling the parent container:
1. The browser's layout engine recalculates the text flows, wraps, and alignments inside the cells at a high resolution.
2. The font styles, cell padding, and borders scale down proportionally.
3. \`html2canvas\` reads the computed scale and captures a crisp snapshot matching the target resolution.

---

## 5. Excel Formula Handling: Formula Expressions vs. Cached Results

A common issue when converting spreadsheets is showing formula values correctly. Inside \`sheet1.xml\`, formula cells store both the calculation rule and the computed value:
\`\`\`xml
<c r="C2">
  <f>A2+B2</f> <!-- Formula -->
  <v>425.80</v> <!-- Cached computed value -->
</c>
\`\`\`

### Calculated Results Mode (Default)
By default, the converter extracts the content of the \`<v>\` tag (the value). This displays the evaluated result (e.g. \`425.80\`) formatted according to the cell's number format (e.g., currency, date, or percentage). This ensures the output PDF matches the layout seen in Excel.

### Formula Outputs Mode
For developer audit purposes, the converter can be toggled to show formulas. In this mode, the converter extracts the contents of the \`<f>\` tag (e.g. \`A2+B2\`), prefixing it with an equals sign (\`=\`). Cell dimensions are automatically adjusted to wrap the formula text.

---

## 6. Client-Side Security: The Zero-Trust Advantage

Conventional online Excel-to-PDF converters require uploading files to remote servers. Spreadsheet files often contain sensitive business metrics, employee salaries, financial balances, and proprietary charts. Uploading these files exposes them to security risks.

By executing the conversion pipeline 100% locally in-browser:
- **Files Never Leave Your Browser**: All parsing, style mapping, canvas rendering, and PDF generation occur in the browser tab's isolated sandboxed memory.
- **No Data Retention**: Closing the browser tab destroys all document residues.
- **Corporate Privacy Compliance**: Fully compliant with ISO 27001, GDPR, and HIPAA frameworks.

---

## 7. Comparison: Spreadsheet Scaling Modes

| Metric | Fit Columns to Page | Fit Rows to Page | Fit Sheet to Page | Automatic Scaling |
| :--- | :--- | :--- | :--- | :--- |
| **Scaling Target** | Fits all columns horizontally | Fits all rows vertically | Fits entire sheet on 1 page | No scaling; breaks naturally |
| **Vertical Pages** | Multiple pages (rows flow down) | Single page | Single page | Multiple pages |
| **Horizontal Pages**| Single page | Multiple pages | Single page | Multiple pages |
| **Best Used For** | Wide tables, ledgers | Tall single-column lists | Executive dashboard charts | Standard simple tables |
| **Fidelity Impact** | Excellent readability | Moderate readability | Low readability (small text)| High readability |

---

## 8. Frequently Asked Questions (FAQs)

### 1. Does the tool support both .xlsx and legacy .xls files?
Yes. Modern \`.xlsx\` files are parsed using \`exceljs\` to extract rich styles, cell fonts, background colors, and merges. Legacy \`.xls\` binary files are parsed using SheetJS (\`xlsx\`) as a fallback to extract values and structural merges, rendering them inside a clean grid layout.

### 2. Are my spreadsheets secure when converting online?
Yes. The conversion executes entirely inside your browser's sandboxed RAM. No data is ever uploaded to a remote server.

### 3. Does it support charts?
Yes. Embedded image charts in worksheets are extracted and rendered in their exact grid positions. Future versions will support canvas-based reconstruction of SVG chart components.

### 4. How do I fit all columns of a wide ledger onto a single page width?
Choose **Fit Columns to Page** in the settings panel. This automatically scales columns down to fit within the width of your target page (A4, Letter, etc.).

### 5. Can I convert multiple Excel files at once?
Yes. In **Batch Uploads** mode, you can drop multiple Excel files. They are processed sequentially and compiled into a single ZIP archive for download.

### 6. Will the PDF preserve hidden sheets?
No. By default, hidden sheets are ignored. You can choose to convert only the active sheet or select specific sheets using the worksheet checkboxes.

### 7. Does the converter display formula results or the formula text?
By default, the converter displays the calculated results. You can toggle "Display Formulas" in settings to show the raw formula strings (e.g. \`=SUM(A1:A10)\`) in the PDF.

### 8. What page sizes are supported for export?
You can export to standard paper sizes including A4, Letter, Legal, A3, and A5.

### 9. Can I customize the page orientation?
Yes. You can toggle between **Portrait** and **Landscape** orientations to match your sheet layout.

### 10. Does it support custom cell colors and styling?
Yes. Cell fills, borders, font weights (bold, italic), alignments, and font sizes are parsed from the spreadsheet styles and mapped to the PDF page canvas.

### 11. Can I add custom page numbers to the PDF?
Yes. Toggle the "Page Numbers" checkbox in the headers/footers settings panel to add page numbers (e.g., "Page 1 of 5") to the bottom of each page.

### 12. Does the converter support merged cells?
Yes. The converter reads merged cell ranges from the spreadsheet dimensions and renders them as standard merged nodes (colspan/rowspan) in the PDF.

### 13. Will images inside the sheet be included in the PDF?
Yes. Inline images are extracted from the workbook media folder, converted to base64, and rendered at their correct coordinates.

### 14. What are the quality differences between standard and print-ready modes?
Standard mode renders at 144 DPI for fast processing and small file size. Print Ready mode renders at 288 DPI for crisp text and high-contrast vector lines suitable for physical printing.

### 15. Can I add a custom text watermark?
Yes. You can overlay a custom text watermark with adjustable font size, color, opacity, and rotation angle across all pages.

### 16. Does this tool require an internet connection?
Once the page is loaded in your browser, all conversions happen offline in your browser's local sandbox memory.

### 17. Can I upload password-protected spreadsheets?
No. Password-protected spreadsheets must be decrypted first. Please remove the password protection in Excel before uploading.

### 18. Does it preserve conditional formatting?
Basic conditional formatting rules (such as cell background color changes) are preserved because the cached formatting is read directly from the cell style mappings.

### 19. How are empty columns and rows handled?
Columns and rows that fall outside the active data range are ignored to prevent empty white space in the generated PDF.

### 20. Does it support gridlines?
Yes. You can toggle gridlines on or off in the settings panel. If enabled, the converter draws light borders between all cells.

### 21. Does this tool store temporary copies of my files?
No. The conversion is entirely client-side. No files are uploaded to any server.

### 22. Can I add a custom logo watermark?
Yes. You can upload a custom logo (PNG/JPG) and set it as a watermark overlay with custom scaling and opacity.

### 23. What happens if my sheet has very long text in a single cell?
If text wrapping is enabled in Excel, the cell height is auto-adjusted to wrap the text. If wrapping is disabled, the text overflows horizontally, matching Excel's display behavior.

### 24. Can I customize header and footer text?
Yes. You can specify custom header and footer text to print at the margins of each page, along with the file name and current date.

### 25. Will the generated PDF have selectable text?
Because the current client-side rendering pipeline uses canvas rasterization for layout fidelity, the text in the PDF is rendered as a high-resolution image. An upgrade path using native vector text overlays is planned.

### 26. Does it support custom margins?
Yes. You can choose from Narrow, Normal, Wide, or None (no margins) to optimize the page layout area.

### 27. What is the maximum file size supported?
Since processing happens locally, the file size limit depends on your device's RAM. We recommend files under 50MB for smooth performance.

### 28. Are formatting rules like currency and dates preserved?
Yes. The converter reads the formatted string representation (e.g. \`$1,420.50\`) stored in the spreadsheet nodes rather than the raw number.

### 29. Does it support multiple fonts?
Yes. It maps common Microsoft fonts (Calibri, Arial, Times New Roman) to standard web-safe font equivalents.

### 30. How can I fit a small sheet onto the page without scaling?
Choose **Automatic Scaling** or set a custom scale factor of **100%** to render the cells at their original size.

### 31. Does the tool support CSV files?
This version supports XLSX and XLS spreadsheets. CSV and ODS formats will be supported in a future update.

### 32. Does the converter preserve cell comments?
No. Cell comments and notes are ignored during PDF publishing to keep page layouts clean.

### 33. Why is my PDF preview blank?
Ensure you have uploaded a valid spreadsheet. If the spreadsheet contains no active worksheets or is corrupted, the rendering pipeline will not generate a preview.

### 34. Can I save my export profiles?
Yes. Your customized configurations (such as margins, watermarks, and scaling modes) are saved locally using LocalStorage.

### 35. Does this tool work on mobile devices?
Yes. The interface is responsive and allows converting spreadsheets directly from your phone or tablet.

### 36. Will gridlines render clearly in print?
Yes. In Print Ready mode, borders and grid lines are rendered at high contrast for clear printing.

### 37. Can I select which worksheets to convert?
Yes. If the workbook has multiple worksheets, a sheet checklist will appear. You can check the sheets you want to convert.

### 38. How is the print area handled?
If a print area is defined in Excel metadata, the converter limits the layout mapping to that range. Otherwise, it converts the active data range.

### 39. Can I redact confidential cells before converting?
You can customize which columns and worksheets are converted, but we recommend blanking out confidential data in Excel before uploading.

### 40. Does it support GDPR data portability compliance?
Yes. Since no file data is sent to a server, using this client-side tool is fully compliant with GDPR privacy standards.
`,

  features: [
    "100% Client-Side Conversion: Spreads are parsed and converted locally in your browser's RAM, keeping your files completely secure and private.",
    "Dual XLSX & XLS Engines: Parses modern styles using exceljs, and legacy xls layouts using SheetJS (xlsx) fallbacks.",
    "Smart Grid Scaling: Fits sheets, columns, or rows to a single page width/height automatically to prevent clipped data columns.",
    "Page Overrides: Supports customization of Page Sizes (A4, Letter, Legal, A3, A5), Portrait/Landscape orientation, and margins.",
    "Formula Toggles: Option to display either evaluated calculated values or raw formula string structures.",
    "Worksheet Selection: Convert the entire workbook, selected sheets, or a single sheet to PDF.",
    "Visual Style Retention: Preserves font weights, background fills, border styles, merged cell ranges, and alignments.",
    "Headers, Footers & Margins: Adds custom text headers, footers, file name metadata, dates, and dynamic page numbering.",
    "Text & Image Watermarks: Layer custom security text or logo image overlays with transparency and rotation settings.",
    "Side-by-Side Live Preview: Real-time visual comparison showing the spreadsheet grid on the left and the output PDF on the right.",
    "Batch Processing Support: Convert multiple spreadsheets simultaneously and compile the results into a ZIP archive."
  ],

  useCases: [
    "Converting monthly sales spreadsheets and ledgers to print-ready PDF reports.",
    "Publishing financial balance sheets to share with board members securely.",
    "Exporting project checklists and schedules from Excel to readable PDF manuals.",
    "Adding watermarks like 'CONFIDENTIAL' or company logos to audit sheets before export.",
    "Batch-converting invoices and purchase orders from XLSX to PDF for record-keeping.",
    "Auditing sheets by converting them to PDF with raw formula expressions displayed."
  ],

  howToSteps: [
    "Drag and drop your Excel spreadsheet (XLSX or XLS) into the secure upload area.",
    "Choose a grid auto-scaling rule (e.g. Fit Columns to Page, Fit Sheet to Page, etc.).",
    "Customize page dimensions (A4, Letter, etc.), orientation, and margin settings.",
    "Configure custom page headers, footers, watermark labels, and date/time stamps.",
    "Optionally choose to display raw formulas instead of calculated results.",
    "Select the specific worksheets you want to include in the output PDF document.",
    "Review layouts inside the side-by-side 'Original Grid vs. Generated PDF' preview panels.",
    "Click 'Convert to PDF' to render and download your compiled PDF file."
  ],

  examples: [
    {
      title: "XLSX Financial Ledger",
      description: "Convert a multi-column balance sheet to PDF fitting all columns horizontally.",
      input: "Quarterly_Ledger.xlsx (1.2 MB) - Fit Columns mode",
      output: "Quarterly_Ledger.pdf (650 KB) - Styled tables, aligned headers, clean borders"
    },
    {
      title: "Batch Invoice Publishing",
      description: "Bulk convert multiple spreadsheets to individual PDFs compiled into a ZIP archive.",
      input: "12 Invoice Spreadsheets - Fit Sheet to Page mode",
      output: "Invoices_PDFs.zip (3.5 MB) containing 12 standalone, print-ready PDFs"
    }
  ],

  relatedTools: [
    { name: "Word to PDF", slug: "word-to-pdf" },
    { name: "PDF to Word", slug: "pdf-to-word" },
    { name: "PDF OCR", slug: "pdf-ocr" },
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Organize PDF", slug: "organize-pdf" },
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Unlock PDF", slug: "unlock-pdf" }
  ],

  faq: [
    {
      question: "Does the tool support both .xlsx and legacy .xls files?",
      answer: "Yes. Modern XLSX files are parsed using exceljs to extract rich styles, cell fonts, background colors, and merges. Legacy XLS binary files are parsed using SheetJS (xlsx) as a fallback to extract values and structural merges, rendering them inside a clean grid layout."
    },
    {
      question: "Are my spreadsheets secure when converting online?",
      answer: "Yes. The conversion executes entirely inside your browser's sandboxed RAM. No data is ever uploaded to a remote server, satisfying a strict zero-trust policy."
    },
    {
      question: "Does it support charts?",
      answer: "Yes. Embedded image charts in worksheets are extracted and rendered in their exact grid positions. Future versions will support canvas-based reconstruction of SVG chart components."
    },
    {
      question: "How do I fit all columns of a wide ledger onto a single page width?",
      answer: "Choose 'Fit Columns to Page' in the settings panel. This automatically scales columns down to fit within the width of your target page (A4, Letter, etc.)."
    },
    {
      question: "Can I convert multiple Excel files at once?",
      answer: "Yes. In Batch Uploads mode, you can drop multiple Excel files. They are processed sequentially and compiled into a single ZIP archive for download."
    },
    {
      question: "Will the PDF preserve hidden sheets?",
      answer: "No. By default, hidden sheets are ignored. You can choose to convert only the active sheet or select specific sheets using the worksheet checkboxes."
    },
    {
      question: "Does the converter display formula results or the formula text?",
      answer: "By default, the converter displays the calculated results. You can toggle 'Display Formulas' in settings to show the raw formula strings (e.g. =SUM(A1:A10)) in the PDF."
    },
    {
      question: "What page sizes are supported for export?",
      answer: "The tool supports A4, Letter, Legal, A3, and A5 size configurations."
    },
    {
      question: "Can I customize the page orientation?",
      answer: "Yes. You can toggle between Portrait and Landscape orientations to match your sheet layout."
    },
    {
      question: "Does it support custom cell colors and styling?",
      answer: "Yes. Cell fills, borders, font weights (bold, italic), alignments, and font sizes are parsed from the spreadsheet styles and mapped to the PDF page canvas."
    },
    {
      question: "Can I add custom page numbers to the PDF?",
      answer: "Yes. Toggle the 'Page Numbers' checkbox in the headers/footers settings panel to add page numbers (e.g., 'Page 1 of 5') to the bottom of each page."
    },
    {
      question: "Does the converter support merged cells?",
      answer: "Yes. The converter reads merged cell ranges from the spreadsheet dimensions and renders them as standard merged nodes (colspan/rowspan) in the PDF."
    },
    {
      question: "Will images inside the sheet be included in the PDF?",
      answer: "Yes. Inline images are extracted from the workbook media folder, converted to base64, and rendered at their correct coordinates."
    },
    {
      question: "What are the quality differences between standard and print-ready modes?",
      answer: "Standard mode renders at 144 DPI for fast processing and small file size. Print Ready mode renders at 288 DPI for crisp text and high-contrast vector lines suitable for physical printing."
    },
    {
      question: "Can I add a custom text watermark?",
      answer: "Yes. You can overlay a custom text watermark with adjustable font size, color, opacity, and rotation angle across all pages."
    },
    {
      question: "Does this tool require an internet connection?",
      answer: "Once the page is loaded in your browser, all conversions happen offline in your browser's local sandbox memory."
    },
    {
      question: "Can I upload password-protected spreadsheets?",
      answer: "No. Password-protected spreadsheets must be decrypted first. Please remove the password protection from the file before uploading."
    },
    {
      question: "Does it preserve conditional formatting?",
      answer: "Basic conditional formatting rules (such as cell background color changes) are preserved because the cached formatting is read directly from the cell style mappings."
    },
    {
      question: "How are empty columns and rows handled?",
      answer: "Columns and rows that fall outside the active data range are ignored to prevent empty white space in the generated PDF."
    },
    {
      question: "Does it support gridlines?",
      answer: "Yes. You can toggle gridlines on or off in the settings panel. If enabled, the converter draws light borders between all cells."
    },
    {
      question: "Does this tool store temporary copies of my files?",
      answer: "No. The conversion is entirely client-side. No files are uploaded to any server."
    },
    {
      question: "Can I add a custom logo watermark?",
      answer: "Yes. You can upload a custom logo (PNG/JPG) and set it as a watermark overlay with custom scaling and opacity."
    },
    {
      question: "What happens if my sheet has very long text in a single cell?",
      answer: "If text wrapping is enabled in Excel, the cell height is auto-adjusted to wrap the text. If wrapping is disabled, the text overflows horizontally, matching Excel's display behavior."
    },
    {
      question: "Can I customize header and footer text?",
      answer: "Yes. You can specify custom header and footer text to print at the margins of each page, along with the file name and current date."
    },
    {
      question: "Will the generated PDF have selectable text?",
      answer: "Because the current client-side rendering pipeline uses canvas rasterization for layout fidelity, the text in the PDF is rendered as a high-resolution image. An upgrade path using native vector text overlays is planned."
    },
    {
      question: "Does it support custom margins?",
      answer: "Yes. You can choose from Narrow, Normal, Wide, or None (no margins) to optimize the page layout area."
    },
    {
      question: "What is the maximum file size supported?",
      answer: "Since processing happens locally, the file size limit depends on your device's RAM. We recommend files under 50MB for smooth performance."
    },
    {
      question: "Are formatting rules like currency and dates preserved?",
      answer: "Yes. The converter reads the formatted string representation (e.g. $1,420.50) stored in the spreadsheet nodes rather than the raw number."
    },
    {
      question: "Does it support multiple fonts?",
      answer: "Yes. It maps common Microsoft fonts (Calibri, Arial, Times New Roman) to standard web-safe font equivalents."
    },
    {
      question: "How can I fit a small sheet onto the page without scaling?",
      answer: "Choose 'Automatic Scaling' or set a custom scale factor of '100%' to render the cells at their original size."
    },
    {
      question: "Does the tool support CSV files?",
      answer: "This version supports XLSX and XLS spreadsheets. CSV and ODS formats will be supported in a future update."
    },
    {
      question: "Does the converter preserve cell comments?",
      answer: "No. Cell comments and notes are ignored during PDF publishing to keep page layouts clean."
    },
    {
      question: "Why is my PDF preview blank?",
      answer: "Ensure you have uploaded a valid spreadsheet. If the spreadsheet contains no active worksheets or is corrupted, the rendering pipeline will not generate a preview."
    },
    {
      question: "Can I save my export profiles?",
      answer: "Yes. Your customized configurations (such as margins, watermarks, and scaling modes) are saved locally using LocalStorage."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes. The interface is responsive and allows converting spreadsheets directly from your phone or tablet."
    },
    {
      question: "Will gridlines render clearly in print?",
      answer: "Yes. In Print Ready mode, borders and grid lines are rendered at high contrast for clear printing."
    },
    {
      question: "Can I select which worksheets to convert?",
      answer: "Yes. If the workbook has multiple worksheets, a sheet checklist will appear. You can check the sheets you want to convert."
    },
    {
      question: "How is the print area handled?",
      answer: "If a print area is defined in Excel metadata, the converter limits the layout mapping to that range. Otherwise, it converts the active data range."
    },
    {
      question: "Can I redact confidential cells before converting?",
      answer: "You can customize which columns and worksheets are converted, but we recommend blanking out confidential data in Excel before uploading."
    },
    {
      question: "Is this tool GDPR compliant?",
      answer: "Yes. Since all processing runs locally inside your browser and no document data is uploaded to our servers, the tool complies with GDPR privacy standards."
    }
  ]
};
