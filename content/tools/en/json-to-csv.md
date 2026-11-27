---
metaTitle: "JSON to CSV Converter — RFC-4180 Flattening & Excel BOM"
metaDescription: "Convert nested JSON arrays to RFC-4180 CSV in your browser. Supports dot-notation flattening, semicolon delimiters, and UTF-8 BOM for clean Excel imports."
metaKeywords: "json to csv converter, rfc 4180 csv escaping, nested json flattening, utf-8 bom excel, european semicolon delimiter, client side json parser"
title: "JSON to CSV Converter"
shortDescription: "Flatten nested JSON objects and arrays into RFC-4180 compliant CSV spreadsheets with configurable delimiters and UTF-8 BOM encoding directly in your browser."
faqs:
  - question: "Why does Microsoft Excel scramble UTF-8 characters or put all columns into column A?"
    answer: "Excel on Windows defaults to your system ANSI code page and localized list separator unless guided. Prepending a UTF-8 Byte Order Mark (0xEF 0xBB 0xBF) forces Excel to decode Unicode characters accurately, while choosing a semicolon delimiter matches European regional locales."
  - question: "How does dot-notation flattening handle deeply nested JSON objects?"
    answer: "Each nested object key is joined to its parent key with a period, turning hierarchical paths like 'customer.billing.city' into distinct column headers. Every object in the input array is scanned so sparse keys still receive dedicated columns."
  - question: "How are JSON arrays inside object properties serialized into CSV cells?"
    answer: "Primitive arrays such as tags or roles can be joined into a single delimited string or expanded via indexed keys like 'tags.0' and 'tags.1'. Objects nested inside arrays are recursively flattened with their zero-based array index."
  - question: "What happens if a JSON string value contains commas, newlines, or double quotes?"
    answer: "Under RFC 4180, any field containing the active delimiter, a carriage return, a line feed, or a double quote is wrapped in double quotes. Literal double quotes inside the value are escaped by doubling them."
  - question: "Is my JSON payload uploaded to a server during conversion?"
    answer: "No. Parsing, schema discovery, flattening, and CSV serialization run exclusively inside your browser's JavaScript engine, making the tool safe for production API logs, PII exports, and internal financial data."
features:
  - "Strict RFC-4180 quoting and double-quote escaping for commas, line breaks, and special characters"
  - "Recursive dot-notation flattening across heterogeneous and sparse JSON object arrays"
  - "Configurable comma, semicolon, and tab delimiters for US and European Excel locales"
  - "Optional UTF-8 Byte Order Mark (BOM) prefix for lossless multi-byte Unicode spreadsheet imports"
  - "Zero-upload client-side execution with instant file download and clipboard copy"
useCases:
  - "Exporting paginated REST API or GraphQL JSON responses into spreadsheets for product analysts"
  - "Preparing MongoDB or DynamoDB document dumps for BI tools like Power BI, Looker, or Excel"
  - "Auditing structured webhook payloads and error logs in tabular form during incident response"
  - "Generating regional semicolon-delimited CSV reports for European finance and operations teams"
  - "Converting JSON configuration catalogs into flat seed files for legacy ERP imports"
howToSteps:
  - "Paste a JSON array of objects or upload a .json file into the input editor."
  - "Choose your field delimiter (comma, semicolon, or tab) and enable UTF-8 BOM if targeting Microsoft Excel."
  - "Select how nested objects and arrays should be flattened into dot-notation header columns."
  - "Copy the RFC-4180 output to your clipboard or download the generated .csv file."
---

Converting hierarchical JSON payloads into flat tabular spreadsheets requires more than joining property values with commas. Real-world API responses contain nested sub-objects, sparse optional keys, embedded newlines, and international UTF-8 strings that break naive string-concatenation scripts. This converter transforms arbitrary JSON arrays into clean, standards-compliant CSV files engineered for spreadsheets, SQL bulk loaders, and business intelligence pipelines.

All parsing, key-union discovery, recursive flattening, and RFC-4180 escaping execute 100% client-side inside your browser's JavaScript runtime. Zero bytes are transmitted to external servers, allowing you to safely inspect customer records, billing exports, and confidential telemetry payloads without violating data-residency or compliance boundaries.

## Under-the-Hood Architecture and Specification

A production-grade JSON-to-CSV pipeline operates in three deterministic passes: schema union discovery, recursive path flattening, and RFC-4180 cell serialization. Because JSON objects inside an array do not share a fixed schema, the engine must scan every record before writing the header row. If record zero omits an optional `shipping.postalCode` property that appears in record forty, a single-pass serializer would either drop the column or misalign subsequent rows.

During flattening, nested plain objects are traversed depth-first, concatenating parent and child keys with a dot separator (for example, `user.address.country`). Arrays of primitives can be joined inline or indexed deterministically (`items.0.sku`), while `null` and `undefined` values map to empty cells rather than literal `"null"` strings so numeric columns remain clean in downstream spreadsheets.

Once the tabular matrix is assembled, every cell passes through an RFC-4180 quoting state machine. Any cell containing the active delimiter, a double quote (`"`), a carriage return (`\r`), or a line feed (`\n`) is enclosed in double quotes, and every internal double quote is escaped as `""`. Finally, when targeting Microsoft Excel on Windows or European locales, the serializer can prepend the three-byte UTF-8 Byte Order Mark (`0xEF 0xBB 0xBF`) and switch the separator from `,` to `;`.

## Step-by-Step Developer Walkthrough

Consider a typical e-commerce order payload retrieved from a Stripe or Shopify webhook. Notice the nested `customer` object, sparse `discount` key on only one item, embedded comma in the company name, and multi-byte currency label:

```json
[
  {
    "orderId": "ORD-9041",
    "customer": { "name": "Acme, GmbH", "country": "DE" },
    "discount": { "code": "SPRING20", "amount": 15.5 },
    "tags": ["priority", "b2b"],
    "note": "Deliver to \"Dock B\"\nCall on arrival"
  },
  {
    "orderId": "ORD-9042",
    "customer": { "name": "Müller & Söhne", "country": "AT" },
    "tags": ["standard"],
    "note": "=SUM(A1:A2)"
  }
]
```

1. **Schema Union Pass:** The converter inspects both objects and establishes the unified header order: `orderId`, `customer.name`, `customer.country`, `discount.code`, `discount.amount`, `tags`, `note`.
2. **Flattening & Sparse Alignment:** Record two lacks `discount`, so its `discount.code` and `discount.amount` cells emit empty values while preserving column alignment.
3. **Regional Delimiter & BOM:** Selecting the semicolon (`;`) delimiter and enabling UTF-8 BOM ensures Excel in Germany or Austria splits columns cleanly and renders `Müller & Söhne` without mojibake.

The resulting RFC-4180 output (with comma delimiter selected) preserves every quote and newline verbatim:

```csv
orderId,customer.name,customer.country,discount.code,discount.amount,tags,note
ORD-9041,"Acme, GmbH",DE,SPRING20,15.5,"priority, b2b","Deliver to ""Dock B""
Call on arrival"
ORD-9042,Müller & Söhne,AT,,,standard,=SUM(A1:A2)
```

Notice how `Acme, GmbH` is quoted because of the embedded comma, `Dock B` doubles its quotes, and the newline stays inside a single quoted cell.

## Specification and Excel Compatibility Reference

| Feature / Edge Case | Standard / Behavior | Comma Locale (US/UK) | Semicolon Locale (EU) | Engineering Impact |
| :--- | :--- | :--- | :--- | :--- |
| Field Quoting | RFC 4180 Section 2 | Wraps `,`, `"`, `\r`, `\n` | Wraps `;`, `"`, `\r`, `\n` | Prevents column shifting on embedded punctuation |
| Quote Escaping | RFC 4180 Rule 7 | `""` inside `"..."` | `""` inside `"..."` | Preserves literal quotes across Excel and Postgres `COPY` |
| Unicode Encoding | UTF-8 + Optional BOM | `0xEF 0xBB 0xBF` prefix | `0xEF 0xBB 0xBF` prefix | Stops Windows Excel from misreading UTF-8 as Windows-1252 |
| Nested Objects | Dot-notation flattening | `a.b.c` header columns | `a.b.c` header columns | Maps arbitrary tree depth into relational columns |
| Sparse Keys | Full-array schema scan | Empty cell `""` | Empty cell `""` | Guarantees identical column counts across every row |
| Line Endings | CRLF (`\r\n`) or LF (`\n`) | `\r\n` recommended | `\r\n` recommended | Matches strict RFC-4180 parsers and legacy Windows tools |

## Production Pitfalls, Security, and Performance Edge Cases

The most dangerous security vulnerability in CSV exports is **CSV Formula Injection** (also known as CWE-1236). If an untrusted user submits a profile name or order note starting with `=`, `+`, `-`, `@`, a tab (`\t`), or a carriage return (`\r`), Excel or LibreOffice Calc may evaluate that cell as a dynamic spreadsheet formula—as illustrated by `=SUM(A1:A2)` in the example above. When generating CSVs for human operators rather than machine-to-machine ingestion, sanitize leading trigger characters by prefixing an apostrophe (`'`) or inspecting untrusted columns before opening them in desktop spreadsheet software.

A second common pitfall involves **type loss and leading zeros**. CSV is an untyped text format: identifiers like ZIP codes (`02139`), tracking numbers (`000491820`), or 18-digit snowflake IDs (`9007199254740993`) are stored cleanly in CSV, yet Excel immediately strips leading zeros and rounds integers beyond IEEE-754 53-bit precision (`Number.MAX_SAFE_INTEGER`) into scientific notation upon double-click. If analysts must preserve exact IDs, import via Excel's **Data > From Text/CSV** wizard and explicitly set those columns to Text.

Finally, keep **memory amplification** in mind when flattening wide documents in the browser. A 50 MB JSON array containing thousands of uniquely named dynamic keys (such as UUID keys inside an object map) explodes the column count across every row (`rows * uniqueKeys`). Before exporting map-like objects, normalize dynamic key-value dictionaries into explicit `[{ key, value }]` arrays so your spreadsheet remains concise and fast to parse. Similarly, standardize `CRLF` (`\r\n`) versus `LF` (`\n`) line endings before running `COPY` commands in PostgreSQL or loading files into legacy Windows parsers, because mixed line endings inside unquoted cells can cause subtle row-boundary mismatches during automated batch ingestion.
