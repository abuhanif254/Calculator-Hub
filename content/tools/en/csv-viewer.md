---
metaTitle: "CSV Viewer, Editor & Analyzer Online | Free CSV to JSON"
metaDescription: "Open, edit, validate, and analyze CSV files in a local spreadsheet grid. Auto-detect delimiters, spot row errors, and convert CSV to JSON fast."
metaKeywords: "csv viewer, csv viewer online, csv file viewer, csv editor, csv editor online, csv analyzer, csv parser, csv reader, view csv file, open csv file online, csv to json, json to csv"
title: "CSV Viewer & CSV Analyzer"
shortDescription: "Inspect, edit, validate, and analyze CSV files locally in your browser with a spreadsheet-grade grid. Includes RFC 4180 parsing, delimiter detection, sorting, filtering, search, data quality diagnostics, and bidirectional CSV-to-JSON conversion."
faqs:
  - question: "Why does this CSV Viewer preserve leading zeros and ISO dates that Excel corrupts?"
    answer: "Spreadsheet suites aggressively coerce numeric-looking strings such as ZIP codes, SKUs, or long account IDs into floating-point numbers and reformat ISO dates on import. This parser stores every cell as its exact raw string while running type inference separately for analytics."
  - question: "Which delimiters and line endings can the parser auto-detect?"
    answer: "The delimiter heuristic inspects the first five non-empty lines while ignoring separators inside double-quoted fields, automatically distinguishing commas, semicolons, tabs, and pipes across both Windows CRLF and Unix LF line endings."
  - question: "How does the tool protect exported CSV files against spreadsheet formula injection?"
    answer: "During CSV and TSV serialization, any cell beginning with =, +, -, @, a tab, or a carriage return is automatically prefixed with a leading single apostrophe so Microsoft Excel and LibreOffice Calc treat the value as literal text instead of executing an embedded formula."
  - question: "Can I convert nested or inconsistent JSON arrays into a flat CSV table?"
    answer: "Yes. The JSON-to-CSV converter scans every object in the input array to collect the complete union of property keys as headers, leaves missing properties blank, and serializes nested objects or arrays as escaped JSON strings."
  - question: "Are sensitive financial or HR CSV files uploaded to a remote server?"
    answer: "No. File reading, RFC 4180 tokenization, column profiling, inline editing, and format exports execute completely inside your local browser tab, and the workspace persists edits only in your browser's localStorage."
features:
  - "RFC 4180 state-machine CSV parser handling quoted fields, doubled-quote escapes, multiline cell values, and UTF-8 BOM stripping"
  - "Automatic delimiter detection across comma, semicolon, tab, and pipe-separated datasets"
  - "Interactive spreadsheet grid with double-click inline cell editing, 20-step Undo/Redo history, natural numeric sorting, and column visibility toggles"
  - "Case-sensitive global cell search with match cycling and real-time row filtering"
  - "Automated data quality validator and analytics dashboard reporting column types, empty cells, duplicate rows, and ragged column-count errors"
  - "Bidirectional CSV-to-JSON and JSON-to-CSV conversion plus formula-safe export to CSV, TSV, JSON, and pipe-delimited TXT"
useCases:
  - "Auditing Stripe billing exports, bank ledgers, or CRM dumps without Excel silently reformatting account numbers or timestamps"
  - "Diagnosing malformed rows, missing column headers, and duplicate records before running a PostgreSQL COPY or Snowflake bulk load"
  - "Converting raw API JSON responses into clean CSV spreadsheets for finance, operations, or marketing stakeholders"
  - "Transforming tabular product catalogs or configuration matrices into structured JSON arrays for frontend seed files"
  - "Quickly editing individual cell values and filtering subsets of European semicolon-delimited CSV exports"
  - "Inspecting server-generated tab-separated logs and exporting clean ASCII pipe tables for engineering tickets"
howToSteps:
  - "Upload a local .csv or .tsv file, paste raw text from your clipboard, or load one of the built-in sample datasets to explore the workspace."
  - "Inspect the parsed grid in the Viewer tab, clicking column headers to sort numerically or alphabetically and typing in the filter bar to narrow matching rows."
  - "Use the global search bar with optional case sensitivity to highlight and jump directly to matching cells across large tables."
  - "Double-click any cell to edit its value inline, and press Ctrl+Z or Ctrl+Shift+Z to undo or redo up to 20 revision states."
  - "Open the Analytics and Validation tabs to review inferred column types, empty cell counts, duplicate rows, and line-numbered column-count mismatches."
  - "Switch to CSV to JSON or JSON to CSV for schema conversion, or download the cleaned dataset as CSV, TSV, JSON, or aligned TXT."
---

Comma-Separated Values (CSV) remains the universal interchange format across databases, ERP platforms, analytics warehouses, and SaaS exports — yet opening a raw CSV in a desktop spreadsheet program is notoriously risky. Excel silently strips leading zeros from postal codes (`02138` becomes `2138`), truncates 16-digit transaction IDs into scientific notation, and misparses European semicolon-delimited exports into a single unreadable column. The **CSV Viewer & CSV Analyzer** parses your files directly in browser memory using a strict RFC 4180 state machine, preserving raw cell fidelity while giving you spreadsheet-style sorting, search, inline editing, validation diagnostics, and instant JSON conversion without transmitting proprietary records over the network.

## RFC 4180 Tokenization, UTF-8 BOMs, and Delimiter Scoring

Real-world CSV exports rarely consist of simple comma-separated words. Naive `line.split(',')` parsers shatter the moment a product description contains a comma, an address spans two lines, or a title includes quotation marks. This tool runs a character-by-character finite state machine that honors every edge case in RFC 4180:

- **UTF-8 Byte Order Mark (BOM) Stripping:** Excel and many Windows reporting tools prepend `0xFEFF` to UTF-8 files. If left intact, that invisible prefix corrupts the first header name (turning `ID` into `\uFEFFID`) and breaks downstream key lookups in JavaScript or Python. The parser strips leading BOM bytes automatically before tokenization begins.
- **Quoted Fields and Doubled Quotes:** Entering a double quote toggles quote mode so embedded delimiters and `CRLF`/`LF` line breaks remain inside the active cell rather than splitting columns or rows. Adjacent double quotes (`""`) inside a quoted string decode cleanly to a single literal `"`.
- **Heuristic Delimiter Detection:** Before parsing, the engine samples the first five non-empty lines and counts unquoted occurrences of `,`, `;`, `\t`, and `|`. Candidate separators that produce an identical positive count on every sampled row receive a `10x` consistency bonus, reliably separating European semicolon exports and tab-delimited database dumps from standard comma CSVs.

Consider how a single malformed quote breaks naive parsers while RFC 4180 state tracking handles it cleanly:

```csv
SKU,Product Name,Notes,Price
PRD-004,"27"" 4K Monitor","Includes HDMI, DP
and USB-C cables",549.99
PRD-012,"34"" Ultrawide Monitor","Ships flat-packed",899.99
```

Here, `27""` decodes to `27"`, and the multiline `Notes` field stays intact as column 3 of row 1 rather than creating a broken extra row.

## Delimited and Structured Export Formats Compared

Different downstream consumers impose strict expectations on quoting, whitespace, and schema representation. Use the matrix below to choose the right export target for your pipeline.

| Export Format | MIME Type | Field Separation & Quoting | Schema Fidelity | Best Downstream Use |
| :--- | :--- | :--- | :--- | :--- |
| **CSV (`.csv`)** | `text/csv` | Comma-separated; RFC 4180 double-quote escaping | Flat string grid; uniform column width | Database `COPY`, CRM imports, spreadsheets |
| **TSV (`.tsv`)** | `text/tab-separated-values` | Tab-separated (`\t`); quotes only when needed | Flat string grid; fewer comma collisions | Bioinformatics, Unix `awk`/`cut` pipelines |
| **JSON (`.json`)** | `application/json` | Array of key-value objects indented 2 spaces | Header-mapped keys per record | REST APIs, NoSQL seeds, JS/Python apps |
| **Pipe TXT (`.txt`)** | `text/plain` | Space-padded ` \| ` columns with divider row | Visual fixed-width alignment | Jira tickets, Slack messages, plain-text logs |

## Automated Column Profiling, Validation, and Grid Workflows

Loading a file immediately triggers two diagnostic passes alongside the interactive table view.

### Type Inference and Anomaly Detection

To profile column homogeneity, the analyzer evaluates every non-empty cell in each column against boolean literals (`true`, `false`, `yes`, `no`), numeric parsing, and five common calendar date signatures (`YYYY-MM-DD`, `MM/DD/YYYY`, `MM-DD-YYYY`, `YYYY/MM/DD`, and `D Mon YYYY`). When at least **80%** of non-empty values match a single category, the column is classified accordingly; columns spanning multiple structured types register as `mixed`, alerting data engineers to dirty entries before ingestion.

Simultaneously, the validator scans for structural defects that break ETL pipelines:
- **Ragged row lengths:** Rows with fewer fields than the header count emit a `warning` (padded with empty strings in the normalized grid), while rows exceeding the header count emit an `error` with the exact 1-based source line number.
- **Header integrity:** Blank column headers and case-insensitive duplicate header names are flagged immediately so JSON object keys do not silently overwrite each other during conversion.
- **Exact duplicate rows:** Each row is fingerprinted using a null-byte (`\x00`) join key inside a hash set to report exact duplicate records alongside total empty-cell counts and estimated byte size.

### Bidirectional JSON Conversion and Companion Tools

Switching to the **CSV to JSON** or **JSON to CSV** tabs lets you pivot between tabular and document formats without writing throwaway Python scripts. When converting heterogeneous JSON arrays where optional keys appear only on certain objects, the converter computes the complete key union across all elements so no fields are dropped, while nested objects are stringified safely into cells. If you want to minify, validate, or fold deeply nested JSON outputs afterward, inspect them in the [JSON Formatter](/en/tools/json-formatter). Need to publish a cleaned dataset as a responsive web pricing or comparison matrix? Paste the exported CSV directly into the [HTML Table Generator](/en/tools/html-table-generator). And when reconciling extracted database dumps against the warehouse query that produced them, keep your extraction SQL legible with the [SQL Formatter](/en/tools/sql-formatter).

## Guarding Against CSV Formula Injection on Export

A frequently overlooked vulnerability in web-generated CSV files is **CSV Injection** (also called Formula or DDE Injection). If an untrusted user enters `=HYPERLINK("https://example.com","Click")` or `+cmd|' /C calc'!A0` into a web form that later gets exported to CSV, opening that spreadsheet in Microsoft Excel or LibreOffice Calc can execute formulas or exfiltrate cell data.

During `.csv` and `.tsv` serialization, this tool neutralizes formula injection automatically by inspecting the first character of every field: any value starting with `=`, `+`, `-`, `@`, `\t`, or `\r` is prefixed with a single leading apostrophe (`'`) before RFC 4180 quoting is applied. Keep one practical trade-off in mind: if your dataset contains legitimate negative numbers (such as `-42.50`) destined for an automated SQL or Python numerical loader rather than Excel, export as **JSON** or verify your ingest parser strips display prefixes where appropriate.
