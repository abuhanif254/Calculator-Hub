import { ToolConfig } from './types';

export const csvViewerConfig: ToolConfig = {
  slug: "csv-viewer",
  title: "CSV Viewer & CSV Analyzer",
  shortDescription: "View, edit, analyze, validate, and convert CSV files online. Professional spreadsheet-style interface with sorting, filtering, search, column management, CSV-to-JSON conversion, and data analytics — all processed locally in your browser.",
  category: "Data & Analytics",
  keywords: [
    "csv viewer", "csv viewer online", "csv file viewer", "csv editor", "csv editor online",
    "csv analyzer", "csv parser", "csv reader", "view csv file", "open csv file online",
    "csv to json", "json to csv", "csv converter", "csv formatter", "csv validator",
    "csv data viewer", "csv spreadsheet", "csv table viewer", "csv explorer",
    "csv file editor", "csv column viewer", "csv data analyzer", "csv data inspector",
    "csv file reader online", "free csv viewer", "csv sorter", "csv filter",
    "csv search", "csv export", "csv download", "csv import", "csv paste",
    "csv drag and drop", "csv validation tool", "csv encoding", "csv utf-8",
    "csv large file viewer", "csv data cleaning", "tsv viewer", "csv to tsv",
    "csv column types", "csv analytics", "csv statistics", "csv duplicate finder"
  ],

  longDescription: `
## What Is CSV?

**CSV** (Comma-Separated Values) is one of the oldest and most universally supported data interchange formats in computing. A CSV file stores tabular data — rows and columns — as plain text, with each line representing a data record and each field within a record separated by a delimiter, most commonly a comma. Despite being decades old, CSV remains the lingua franca of data exchange because virtually every application that handles structured data can read and write CSV.

The simplicity of CSV is both its greatest strength and its primary limitation. There is no formal, universally enforced specification for CSV. While RFC 4180 provides guidelines, real-world CSV files vary enormously in their use of delimiters, quoting rules, line endings, and encoding. This is precisely why a robust CSV viewer and parser is essential — it must handle the messy reality of CSV files as they exist in production, not just the idealized specification.

---

## What Is a CSV Viewer?

A **CSV Viewer** is a specialized tool designed to render CSV data as a structured, human-readable table. Unlike opening a CSV file in a text editor — where you see raw comma-delimited text that is difficult to scan — a CSV viewer parses the data and presents it in a spreadsheet-style grid with aligned columns, sortable headers, and visual formatting that makes patterns and anomalies immediately visible.

Modern CSV viewers go far beyond simple display. They include interactive features such as inline editing, column filtering, global search, data type detection, statistical analysis, validation, and export capabilities. Our CSV Viewer provides a full-featured data inspection platform that runs entirely in your browser, with no data ever leaving your machine.

---

## Why CSV Files Are Important

CSV files serve as the universal connector between disparate systems. Their importance stems from several key properties:

**Universal compatibility**: Every spreadsheet application (Excel, Google Sheets, LibreOffice Calc), every database system (MySQL, PostgreSQL, MongoDB), every programming language (Python, R, JavaScript, Java), and every data platform (Tableau, Power BI, Looker) can import and export CSV. No other format has this breadth of support.

**Human readability**: Unlike binary formats such as .xlsx or .parquet, CSV files can be opened and understood in any text editor. This makes them invaluable for debugging, quick inspection, and manual data correction.

**Simplicity**: CSV requires no special libraries to generate. A simple loop that writes comma-separated values to a file produces valid CSV. This low barrier to creation means CSV is often the first choice for data export in applications of all sizes.

**Streaming capability**: CSV files can be processed line by line without loading the entire file into memory. This makes them suitable for datasets that are too large for spreadsheet applications, which typically load everything at once.

---

## CSV Formatting Basics

Understanding CSV formatting rules is essential for anyone working with data:

### Fields and Delimiters
Each line in a CSV file represents one record. Fields within a record are separated by a delimiter character — most commonly a comma, but semicolons, tabs, and pipes are also used. The delimiter choice often depends on locale: European countries frequently use semicolons because commas serve as decimal separators in those regions.

### Quoted Fields
When a field value contains the delimiter character, a line break, or a quotation mark, the entire field must be enclosed in double quotes. For example, a field containing \`New York, NY\` must be written as \`"New York, NY"\` to prevent the comma from being interpreted as a field separator.

### Escaped Quotes
If a quoted field itself contains a double quote, the quote is escaped by doubling it: \`"She said ""hello"""\` represents the value \`She said "hello"\`.

### Header Row
By convention, the first row of a CSV file contains column headers that name each field. While not technically required by the format, headers are nearly universal in practice and are essential for data interpretation.

### Line Endings
CSV files may use different line ending conventions depending on the operating system that created them: CRLF (\\r\\n) on Windows, LF (\\n) on Unix/macOS, or rarely CR (\\r) on legacy systems. A robust CSV parser must handle all three.

---

## How CSV Works

At its core, CSV parsing is a state machine that processes characters one at a time:

1. **Start of field**: The parser checks if the first character is a double quote. If so, the field is "quoted" and the parser enters quoted mode.
2. **Quoted mode**: Characters are accumulated until an unescaped closing double quote is found. Inside quoted mode, commas and line breaks are literal characters, not delimiters.
3. **Unquoted mode**: Characters are accumulated until a comma (field separator) or line break (record separator) is encountered.
4. **End of field**: When a delimiter is found, the accumulated characters become the field value, and the parser starts the next field.
5. **End of record**: When a line break is found outside of quoted mode, the current record is complete.

This seemingly simple process becomes complex when handling edge cases: fields with embedded line breaks, consecutive delimiters representing empty fields, files with inconsistent quoting, or files with trailing commas.

---

## CSV Delimiters Explained

While "CSV" literally means "Comma-Separated Values," the term is used loosely to describe any delimited text format:

- **Comma (,)**: The standard delimiter in English-speaking countries
- **Semicolon (;)**: Common in European locales where commas are decimal separators
- **Tab (\\t)**: Used in TSV (Tab-Separated Values) files, popular in bioinformatics and legacy data systems
- **Pipe (|)**: Sometimes used when data frequently contains commas and semicolons

Our CSV viewer auto-detects the delimiter by analyzing the first few lines of the file, so you rarely need to specify it manually.

---

## CSV Viewer Benefits

A dedicated CSV viewer provides substantial advantages over using a text editor or even a spreadsheet application:

1. **Instant rendering**: No waiting for Excel to load its entire application framework just to view a data file
2. **Large file handling**: Spreadsheet applications often crash on files with hundreds of thousands of rows; a specialized viewer handles them efficiently
3. **Data integrity**: Text editors don't understand CSV structure and can corrupt data during editing; a CSV viewer preserves field boundaries correctly
4. **Privacy**: Our tool processes everything locally — your data never leaves your browser, unlike cloud-based spreadsheet services
5. **Validation**: Instantly detect malformed rows, missing values, and structural inconsistencies
6. **Type detection**: Automatically identify which columns contain numbers, dates, booleans, or text

---

## CSV for Spreadsheets

CSV is the primary interchange format between spreadsheet applications. When you need to move data from Excel to Google Sheets, from Numbers to LibreOffice Calc, or from any application to any spreadsheet, CSV is almost always the first option.

Key considerations when using CSV with spreadsheets:
- **Encoding matters**: Excel on Windows defaults to Windows-1252 encoding, while most modern applications expect UTF-8. This causes garbled characters for non-ASCII text
- **Date formatting**: Different spreadsheet applications interpret date strings differently. What looks like a date in one application may become a number or text in another
- **Leading zeros**: Phone numbers, ZIP codes, and product codes with leading zeros lose those zeros when opened in a spreadsheet that interprets them as numbers
- **Formula injection**: Cells starting with \`=\`, \`+\`, \`-\`, or \`@\` may be interpreted as formulas, which poses a security risk

---

## CSV for Analytics and Data Science

CSV is the default format for sharing datasets in data science and analytics:

- **Kaggle datasets**: The majority of competition and community datasets are distributed as CSV
- **Government open data**: Census data, economic indicators, and public health data are commonly published as CSV
- **API exports**: Many analytics platforms export query results as CSV for further analysis
- **Machine learning pipelines**: Training data is frequently stored and loaded from CSV files using libraries like pandas (Python), readr (R), or D3 (JavaScript)

When working with CSV for analytics, validation is critical. Missing values, inconsistent formatting, and encoding errors can silently corrupt analyses and produce misleading results.

---

## CSV for Developers

Developers encounter CSV in numerous contexts:

- **Database imports/exports**: Loading seed data, migrating between systems, and creating backups
- **Configuration files**: Some applications use CSV for simple configuration tables
- **Log analysis**: Server logs and application metrics are often exported as CSV for analysis
- **API testing**: Creating test fixtures and mock data in CSV format
- **ETL pipelines**: Extract-Transform-Load processes frequently use CSV as an intermediate format

Our CSV viewer's JSON conversion feature is particularly valuable for developers who need to transform CSV data into the JSON format used by REST APIs and modern applications.

---

## CSV for Databases

CSV serves as the universal import/export format for relational databases:

- **MySQL**: \`LOAD DATA INFILE\` reads CSV directly into tables
- **PostgreSQL**: \`COPY\` command handles CSV import/export efficiently
- **SQLite**: The \`.import\` command accepts CSV files
- **MongoDB**: \`mongoimport\` can ingest CSV data
- **BigQuery**: Supports CSV as a primary import format

Before importing CSV into a database, validation is essential. Data type mismatches, unexpected null values, and encoding issues can cause import failures or data corruption. Our validation system catches these problems before they reach your database.

---

## CSV Import/Export Workflows

Professional data workflows involving CSV typically follow this pattern:

1. **Export**: Extract data from the source system as CSV
2. **Inspect**: Open the CSV in a viewer to verify structure and content
3. **Validate**: Check for missing values, type consistency, and formatting errors
4. **Transform**: Clean, filter, and restructure the data as needed
5. **Convert**: Transform to the target format (JSON, TSV, SQL, etc.)
6. **Import**: Load the cleaned data into the destination system

Our CSV viewer supports every step of this workflow, from initial inspection through validation, transformation, and export.

---

## CSV Validation

CSV validation checks whether a file conforms to expected structure and content rules:

- **Structural validation**: Do all rows have the same number of columns? Are quoted fields properly closed? Are delimiters consistent?
- **Content validation**: Are values in the expected format? Are required fields populated? Are numeric fields actually numeric?
- **Encoding validation**: Is the file consistently encoded in UTF-8 or another expected encoding?
- **Referential validation**: Do foreign key values reference valid primary keys in related tables?

Our validation system performs structural and content validation in real-time, providing clear, actionable error messages for every issue found.

---

## CSV Parsing Explained

CSV parsing is more complex than splitting strings on commas. A production-grade parser must handle:

- **Quoted fields**: Fields wrapped in double quotes can contain commas, line breaks, and other special characters
- **Escaped quotes**: Double quotes within quoted fields are escaped by doubling them
- **Empty fields**: Consecutive delimiters represent empty string values
- **Whitespace**: Some CSV files include whitespace around delimiters; a parser must decide whether to trim it
- **BOM markers**: UTF-8 files may start with a byte order mark that must be stripped
- **Inconsistent line endings**: A single file may mix CRLF and LF line endings

Our parser handles all of these cases correctly, providing reliable parsing even for the messiest real-world CSV files.

---

## CSV to JSON Conversion

Converting CSV to JSON is one of the most common data transformation tasks:

- Each CSV row becomes a JSON object
- Column headers become object keys
- Field values become object values
- The entire CSV becomes a JSON array of objects

This transformation is essential for web development, where JSON is the standard data format for APIs, configuration files, and client-side data storage. Our converter produces well-formatted, valid JSON with proper type inference — numbers remain numbers, booleans remain booleans, and strings are properly quoted.

---

## CSV vs Excel

CSV and Excel (.xlsx) serve different purposes, and understanding their differences prevents common data handling errors:

| Feature | CSV | Excel (.xlsx) |
|---------|-----|---------------|
| Format | Plain text | Binary/XML ZIP |
| File size | Smaller | Larger (includes formatting metadata) |
| Formulas | Not supported | Full formula engine |
| Multiple sheets | Not supported | Supported |
| Formatting | None | Rich formatting (colors, fonts, borders) |
| Charts | Not supported | Embedded charts |
| Data types | All text (inferred) | Explicit typed cells |
| Compatibility | Universal | Requires Excel or compatible application |
| Version control | Git-friendly | Not diffable |
| Encoding | Configurable | Fixed internal encoding |

Choose CSV when you need maximum compatibility, version control friendliness, or when working with large datasets that don't require formatting. Choose Excel when you need formulas, charts, formatting, or multiple sheets.

---

## Common CSV Mistakes

These errors appear repeatedly in CSV handling, regardless of experience level:

1. **Not quoting fields with commas**: A city like \`Washington, D.C.\` without quotes breaks the column structure
2. **Inconsistent column counts**: Rows with different numbers of fields indicate missing or extra delimiters
3. **Encoding mismatch**: Saving as ANSI instead of UTF-8 corrupts international characters
4. **Missing header row**: Without headers, columns can only be referenced by index, making data fragile
5. **Trailing comma**: An extra comma at the end of each line creates a phantom empty column
6. **Line breaks in fields**: Unquoted fields with line breaks split a single record across multiple lines
7. **Leading/trailing whitespace**: Invisible spaces around values cause string comparison failures

---

## CSV Encoding Issues

Character encoding is the most common source of CSV data corruption:

- **UTF-8**: The universal encoding that supports all Unicode characters. Always prefer UTF-8 for new files
- **Windows-1252**: The default encoding on Windows systems. Conflicts with UTF-8 for characters like é, ñ, ü
- **ISO-8859-1 (Latin-1)**: Common in European data files. Similar to Windows-1252 but not identical
- **BOM (Byte Order Mark)**: UTF-8 files may include an invisible BOM character at the start that can cause parsing errors
- **ASCII**: The subset shared by all encodings. Files containing only ASCII characters work everywhere

When you encounter garbled characters in a CSV file, the cause is almost always an encoding mismatch between the file's actual encoding and what the reader expects.

---

## Handling Large CSV Files

Working with large CSV files (100MB+, millions of rows) requires specific techniques:

- **Streaming parsers**: Process the file line by line instead of loading everything into memory
- **Virtual scrolling**: Render only the visible rows in the browser, not the entire dataset
- **Indexed searching**: Build indexes for frequently searched columns
- **Chunked processing**: Break large operations into smaller batches to prevent UI freezing
- **Web Workers**: Move parsing and analysis off the main thread to keep the UI responsive

Our CSV viewer employs virtual rendering and memoized computations to handle large files smoothly in the browser.

---

## CSV Best Practices

Follow these guidelines for reliable CSV handling:

1. **Always use UTF-8 encoding** — it's the only encoding that supports all characters universally
2. **Always include a header row** — column names make data self-documenting
3. **Always quote fields containing special characters** — commas, quotes, and line breaks must be quoted
4. **Use consistent delimiters** — don't mix commas and semicolons in the same file
5. **Trim whitespace** — trailing spaces cause subtle bugs in data processing
6. **Validate before importing** — check structure and content before loading into production systems
7. **Use ISO 8601 for dates** — YYYY-MM-DD avoids ambiguity between US and European date formats
8. **Document your format** — include a README or data dictionary alongside your CSV files

---

## CSV Data Cleaning Concepts

Data cleaning is the process of detecting and correcting errors in data. For CSV files, common cleaning tasks include:

- **Removing duplicates**: Identifying and eliminating identical rows
- **Standardizing formats**: Ensuring consistent date formats, phone number formats, and address formats
- **Handling missing values**: Deciding whether to remove rows with missing data, fill with defaults, or flag for review
- **Trimming whitespace**: Removing invisible characters that cause matching failures
- **Type conversion**: Converting string representations of numbers and dates to their proper types
- **Outlier detection**: Identifying values that are statistically unusual and may indicate data entry errors

---

## CSV Use Cases in Business and Technology

CSV files play critical roles across industries:

- **Finance**: Stock market data, transaction records, and financial reporting all use CSV extensively
- **Healthcare**: Patient records, lab results, and insurance claims are frequently exchanged as CSV
- **E-commerce**: Product catalogs, order histories, and customer lists are managed in CSV
- **Marketing**: Campaign data, email lists, and analytics exports are standard CSV
- **Science**: Research datasets, experimental results, and sensor data often start as CSV
- **Government**: Census data, election results, and public records are published as CSV
- **Education**: Student records, grade books, and assessment data use CSV for portability
- **Logistics**: Shipping manifests, inventory counts, and route data are CSV staples

The ubiquity of CSV ensures that skills in viewing, editing, validating, and converting CSV files remain essential for professionals across every field that works with data.
  `,

  features: [
    "Instant CSV parsing with spreadsheet-style table rendering",
    "Inline cell editing with full undo/redo support",
    "Drag-and-drop file upload with paste support",
    "Multi-column sorting (ascending/descending)",
    "Advanced column filtering with search, exact match, and empty value filters",
    "Global search with case-sensitive toggle and match navigation",
    "Column resizing, reordering, hide/show, and automatic type detection",
    "Data analytics panel with row count, column count, duplicates, and type statistics",
    "CSV validation with malformed row detection and column mismatch warnings",
    "Bidirectional CSV ↔ JSON conversion with pretty-printed output",
    "Export to CSV, JSON, TSV, and TXT formats",
    "Built-in sample datasets (Employee, Product, Financial, Analytics, Student)",
    "Auto-save with debounced localStorage persistence and session restore",
    "Word wrap toggle, dark/light theme support, and responsive layout",
    "Keyboard-navigable table with full accessibility (ARIA labels, focus states)",
    "100% client-side processing — your data never leaves your browser"
  ],

  useCases: [
    "Inspecting CSV exports from databases before importing into another system",
    "Validating CSV data files for structural errors before processing",
    "Converting CSV datasets to JSON for use in web applications and APIs",
    "Cleaning and editing CSV data without installing spreadsheet software",
    "Analyzing CSV datasets to understand column types, missing values, and duplicates",
    "Viewing large CSV files that crash or are slow in Excel",
    "Sorting and filtering CSV data to find specific records quickly",
    "Preparing CSV data for machine learning pipelines and analytics workflows"
  ],

  howToSteps: [
    "Upload a CSV file using drag-and-drop, the Upload button, or paste CSV data directly. You can also load a built-in sample dataset.",
    "The tool instantly parses and renders your CSV as a sortable, filterable spreadsheet table with sticky headers.",
    "Click any cell to edit its value inline. Use Ctrl+Z to undo and Ctrl+Shift+Z to redo changes.",
    "Click column headers to sort ascending or descending. Use the filter icon to filter columns by value.",
    "Use the Search bar to find specific values across all columns. Toggle case sensitivity and navigate between matches.",
    "Switch to the Analytics tab to see row/column counts, data types, duplicate rows, and empty cell statistics.",
    "Switch to the CSV → JSON tab to convert your data to JSON, or JSON → CSV to go the other direction.",
    "Export your data as CSV, JSON, TSV, or TXT using the export buttons in the toolbar."
  ],

  examples: [
    {
      title: "Standard CSV Data",
      description: "A typical CSV file with headers, text, and numeric columns.",
      input: "Name,Age,City,Salary\nAlice Johnson,34,New York,85000\nBob Smith,28,San Francisco,92000\nCarol Williams,41,Chicago,78000",
      output: "| Name           | Age | City          | Salary |\n|----------------|-----|---------------|--------|\n| Alice Johnson  | 34  | New York      | 85000  |\n| Bob Smith      | 28  | San Francisco | 92000  |\n| Carol Williams | 41  | Chicago       | 78000  |"
    },
    {
      title: "CSV to JSON Conversion",
      description: "Convert structured CSV data into a JSON array of objects.",
      input: "id,product,price,stock\n1,Laptop,999.99,45\n2,Keyboard,79.99,200\n3,Monitor,349.50,78",
      output: `[\n  { "id": "1", "product": "Laptop", "price": "999.99", "stock": "45" },\n  { "id": "2", "product": "Keyboard", "price": "79.99", "stock": "200" },\n  { "id": "3", "product": "Monitor", "price": "349.50", "stock": "78" }\n]`
    }
  ],

  faq: [
    {
      question: "What is a CSV Viewer?",
      answer: "A CSV Viewer is a tool that parses CSV (Comma-Separated Values) files and displays them as structured, interactive tables. Unlike text editors that show raw comma-delimited text, a CSV viewer renders data in a spreadsheet-style grid with aligned columns, sortable headers, filterable rows, and visual formatting that makes data easy to read and analyze."
    },
    {
      question: "Is this CSV Viewer free?",
      answer: "Yes, this CSV Viewer is completely free with no usage limits. There are no sign-ups, no premium tiers, and no restrictions on file size or number of files. View, edit, validate, and convert as many CSV files as you need."
    },
    {
      question: "Can I edit CSV files?",
      answer: "Yes. Click any cell in the table to edit its value inline. The editor supports full undo/redo functionality (Ctrl+Z / Ctrl+Shift+Z), and all changes can be exported back to CSV, JSON, TSV, or TXT format."
    },
    {
      question: "Can I convert CSV to JSON?",
      answer: "Yes. Switch to the 'CSV → JSON' tab to instantly convert your CSV data into a pretty-printed JSON array. Each row becomes a JSON object with column headers as keys. You can also convert JSON back to CSV using the 'JSON → CSV' tab."
    },
    {
      question: "Is my CSV processed locally?",
      answer: "Yes, absolutely. All parsing, editing, validation, analysis, and conversion are performed entirely in your browser using client-side JavaScript. Your CSV data is never uploaded to any server, ensuring complete privacy and data security."
    },
    {
      question: "Can this tool handle large CSV files?",
      answer: "Yes. The viewer uses optimized rendering techniques including memoized computations and efficient DOM management to handle files with thousands of rows smoothly. For extremely large files, the tool displays data in a scrollable view that keeps the interface responsive."
    },
    {
      question: "What is the difference between CSV and Excel?",
      answer: "CSV is a plain text format that stores data as comma-separated values without any formatting, formulas, or multiple sheets. Excel (.xlsx) is a binary format that supports rich formatting, formulas, charts, and multiple worksheets. CSV offers universal compatibility and smaller file sizes, while Excel provides richer features for complex data work."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "XML Formatter", slug: "xml-formatter" },
    { name: "YAML Formatter", slug: "yaml-formatter" },
    { name: "SQL Formatter", slug: "sql-formatter" },
    { name: "Markdown Previewer", slug: "markdown-previewer" },
    { name: "Diff Checker", slug: "diff-checker" }
  ]
};
