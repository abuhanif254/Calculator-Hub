---
metaTitle: "Database Dump Anonymizer | Mask PII in CSV, JSON & SQL"
metaDescription: "Detect 31 PII types and anonymize CSV, TSV, JSON, or SQL table exports locally in your browser with 10 masking strategies and zero server uploads."
metaKeywords: "database anonymizer, sql dump anonymizer, csv pii masking, data anonymization tool, mask pii online, gdpr data masking, hipaa safe harbor, synthetic test data, client-side data masker"
title: "Enterprise Database Dump Anonymizer"
shortDescription: "Automatically detect 31 PII and secret patterns in CSV, TSV, JSON, and SQL table exports and sanitize them locally in your browser using 10 configurable masking strategies with zero server uploads."
faqs:
  - question: "Does this Database Dump Anonymizer upload my production data to any server?"
    answer: "No. File ingestion, PII profiling, column masking, and CSV, JSON, or TSV export execute completely inside your local browser memory. Once the page loads, you can disconnect from the network and sanitize datasets offline with zero server storage or telemetry."
  - question: "How do I anonymize a raw SQL dump file from PostgreSQL or MySQL?"
    answer: "Export target tables from your database or dump into CSV, TSV, or JSON format using utilities like PostgreSQL COPY TO STDOUT or MySQL SELECT INTO OUTFILE, mask the sensitive columns in this workspace, and reload the sanitized output into staging. Line-oriented .txt and .log extracts are also supported directly."
  - question: "Which PII types and sensitive credentials can the scanner detect automatically?"
    answer: "The hybrid detector scans for 31 identifier classes across High, Medium, and Low risk tiers, including emails, phone numbers, SSNs, credit card PANs, IBANs, dates of birth, street addresses, IPv4 and IPv6 addresses, medical record IDs, password hashes, API keys, and JWT tokens."
  - question: "Which masking strategy preserves join relationships and statistical distributions?"
    answer: "Use Tokenize or Deterministic Hash to preserve one-to-one equality for foreign-key joins and deduplication across rows. Choose Shuffle Within Column when analytics queries or UI pagination require the original value distribution, cardinality, and null rate without linking records to real individuals."
  - question: "What file size and row limits apply to browser-side anonymization?"
    answer: "The browser engine accepts files up to 50 MB and parses up to 50,000 rows per session across CSV, TSV, JSON, TXT, and LOG inputs. For multi-gigabyte production dumps, extract a representative staging slice with LIMIT or TABLESAMPLE before masking."
features:
  - "100% client-side browser execution with zero cloud uploads, disk persistence, or external API calls"
  - "Hybrid PII detection engine scanning 31 identifier and credential classes using regex match rates, column-header aliases, and specificity scoring"
  - "10 per-column masking strategies including Partial Mask, Synthetic Data, Deterministic Hashing, Tokenization, Format-Preserving, Fisher-Yates Shuffle, Date Shift, Generalization, Redact, and Nullify"
  - "Automatic format detection and parsing for RFC 4180 quoted CSV, TSV, JSON object arrays, and line-oriented TXT or LOG files up to 50 MB and 50,000 rows"
  - "Risk-tiered column profiling (High, Medium, Low) with per-column confidence meters, sample mask previews, and granular enable/disable toggles"
  - "Side-by-side Original vs. Anonymized data preview table with one-click export to CSV, JSON, or TSV"
useCases:
  - "Sanitizing PostgreSQL, MySQL, or SQLite table exports before seeding local developer laptops and CI/CD staging databases"
  - "Masking customer emails, SSNs, and payment card numbers in CRM or ERP CSV extracts shared with external QA contractors"
  - "Applying Fisher-Yates column shuffling and 10-unit numeric generalization to prepare GDPR- and HIPAA-aligned analytics datasets"
  - "Scrubbing accidentally captured JWT tokens, API keys, password hashes, and client IPs from TXT and LOG files before attaching them to bug reports"
  - "Generating realistic synthetic staging fixtures from MongoDB or REST API JSON arrays without breaking UI components or schema validators"
  - "Building join-consistent tokenized test tables where recurring customer identifiers remain linkable across rows without exposing real identities"
howToSteps:
  - "Export the target database tables as CSV, TSV, JSON, or line-delimited TXT (up to 50 MB and 50,000 rows), or click Try with sample data to load a realistic built-in fixture."
  - "Drag and drop your file into the upload zone to trigger automatic format detection and client-side column parsing."
  - "Inspect the automated PII scan summary showing total rows, flagged PII columns, High/Medium/Low risk badges, and percentage confidence scores."
  - "Toggle columns on or off and assign a masking strategy to each field, such as Synthetic Data for emails, Format-Preserving for IP addresses, or Tokenize for join keys."
  - "Click Run Anonymization to process all rows in memory and switch between Original and Anonymized views in the Data Preview table to verify your rules."
  - "Select CSV, JSON, or TSV from the export dropdown and download the sanitized dataset for safe staging ingestion or team sharing."
---

Copying raw production database dumps into staging servers, CI pipelines, or developer laptops invites data breaches, accidental emails to live customers, and GDPR data-minimization violations. Writing ad-hoc Python or SQL scrubbing scripts for every schema change is brittle and slow. The **Enterprise Database Dump Anonymizer** parses CSV, TSV, JSON, and line-delimited TXT/LOG exports directly inside your browser tab—handling files up to 50 MB and 50,000 rows with zero network upload—detecting 31 classes of Personally Identifiable Information (PII) and credentials, and applying per-column masking rules locally.

## Hybrid PII Detection and Parsing Internals

Before profiling begins, the parser auto-detects syntax from extensions and structural cues (leading `[` or `{` tokens for JSON, header tab-versus-comma frequency for TSV/CSV, or single-column mode for logs). Its RFC 4180 CSV reader preserves commas inside quoted strings, decodes doubled-quote escapes (`""`), and pads ragged rows to header width, while the JSON parser computes the full key union across heterogeneous object arrays so optional fields are never dropped.

Simple header filters miss sensitive columns labeled `attr_1` or `payload`, whereas regex-only scanners misflag order IDs as phone numbers. To curb false positives, the profiling engine combines two weighted signals:

1. **Sampled Pattern Density (up to 60 points):** Up to 200 non-empty cells per column are tested against 31 compiled expressions spanning nine domains: Contact (`email`, `phone`, `url`, `username`), Identity (`full_name`, `first_name`, `last_name`), Government ID (`ssn`, `passport`, `national_id`, `drivers_license`), Financial (`credit_card`, `bank_account`, `iban`, `tax_id`), Network (`ip_address`, `ipv6`, `mac_address`, `device_id`), Demographics (`date_of_birth`, `gender`, `age`), Location (`address`, `zip_code`, `coordinates`), Medical (`medical_record`), and Security/System (`password_hash`, `api_key`, `jwt_token`, `vin`, `uuid`).
2. **Header Aliases and Specificity Boosts:** Normalized column names matching schema dictionaries—such as `pan`, `card_no`, `remote_addr`, `mrn`, `ein`, or `passwd`—earn a **+35 bonus** (or trigger a 65% header-only match on sparse columns). Strict patterns receive tie-breaking weight (**+20** for SSNs and Visa/Mastercard/Amex/Discover PAN prefixes; **+15** for emails) so generic numeric rules never shadow stricter identifiers.

Columns scoring at least 20% receive a `High`, `Medium`, or `Low` risk badge and a default strategy: `Synthetic / Fake Data` for emails and names, `Partial Mask` for SSNs and cards, `Format-Preserving` for IPv4/IPv6, `Tokenize` for UUIDs and device IDs, and `Date Shift` for birth dates.

## Comparing All 10 Column Masking Strategies

Selecting the right strategy balances re-identification risk against schema constraints, join integrity, and analytical utility.

| Strategy | Example Output | Joinable | Distribution Fidelity | Best Engineering Use |
| :--- | :--- | :--- | :--- | :--- |
| **Redact** | `[REDACTED]` | No | None | Scrubbing notes, tokens, or secrets |
| **Nullify** | *(empty string)* | No | None | Clearing optional nullable fields |
| **Partial Mask** | `****-****-****-1111` | No | Boundary only | Testing masked receipt UIs |
| **Deterministic Hash** | `64-char hex digest` | Yes | Cardinality only | Deduplication and key matching |
| **Synthetic Data** | `Bob Johnson` | No | Format only | Realistic staging UI fixtures |
| **Format-Preserving** | `847.392.4.615` | No | Length & syntax | Columns with regex `CHECK` rules |
| **Tokenize** | `TOK_000001` | Yes | Cardinality only | Intra-file foreign-key consistency |
| **Shuffle Column** | Swaps existing cells | No | Exact (100%) | BI histograms and query plans |
| **Date Shift (±30d)** | `1990-04-02` | No | Approximate | Preserving rough event intervals |
| **Generalize** | `30-40` or `1990` | Bucketed | Coarse bins | Reducing quasi-identifier risk |

Two algorithmic behaviors matter during security review. **Shuffle Column** runs an unbiased **Fisher-Yates** permutation across the entire column, keeping exact cardinality, extrema, and null frequency intact while breaking row-level linkage to real individuals. **Tokenize** maintains an ephemeral in-memory map (`TOK_000001`, `TOK_000002`) during execution so duplicate values map consistently across rows without writing any reversal key to disk.

## Extracting, Sanitizing, and Re-Importing SQL Dumps

Because multi-gigabyte `.sql` dumps mix DDL statements with raw data blocks, export bounded table slices to CSV or JSON, sanitize them locally, and load the masked output into staging:

```bash
# 1. PostgreSQL: export a 50,000-row slice with CSV headers
psql "$PROD_REPLICA_URL" -c \
  "\copy (SELECT id, first_name, last_name, email, phone, dob, ip_address \
          FROM users ORDER BY id DESC LIMIT 50000) \
   TO 'users_slice.csv' WITH (FORMAT csv, HEADER true)"

# 2. MongoDB: export a JSON array for NoSQL collections
mongoexport --uri="$PROD_MONGO_RO" --collection=customers \
  --limit=50000 --jsonArray --out=customers_slice.json

# 3. Reload the downloaded anonymized CSV into staging
psql "$STAGING_DB_URL" -c \
  "\copy users(id, first_name, last_name, email, phone, dob, ip_address) \
   FROM 'anonymized_users_slice.csv' WITH (FORMAT csv, HEADER true)"
```

Before downloading, toggle the interactive five-row **Data Preview** between `Original` and `Anonymized` views to verify every rule without corrupting delimiters. CSV export wraps fields containing commas, quotes, or newlines in RFC 4180 double quotes, TSV aligns cleanly with Unix utilities, and indented JSON arrays load directly into `mongoimport`. You can also audit delimiter health in the [CSV Viewer](/en/tools/csv-viewer), tidy extraction joins in the [SQL Formatter](/en/tools/sql-formatter), inspect arrays in the [JSON Formatter](/en/tools/json-formatter), or build synthetic greenfield fixtures with the [Fake User Data Generator](/en/tools/fake-user-data-generator).

## Compliance Boundaries and Security Caveats

### GDPR Anonymization vs. Pseudonymization and HIPAA Safe Harbor

Under GDPR Recital 26, records exit regulatory scope only when re-identification is no longer reasonably likely using auxiliary datasets. Deterministic hashes and surrogate tokens represent **pseudonymization** under Article 4(5): they shrink staging exposure dramatically, yet remain regulated personal data whenever linkage keys or correlation tables exist. Under HIPAA Safe Harbor (45 CFR §164.514(b)(2)), neutralize all 18 identifiers—including exact birth dates (use `Generalize` for year-only values), full ZIP codes, medical record numbers, and client IPs.

### Low-Entropy Hashes and Composite Quasi-Identifiers

Avoid unsalted deterministic hashing on small keyspaces like 9-digit SSNs or corporate email directories, which brute-force tables can invert rapidly. When automated ETL jobs require cross-table joins, prefer a secret-keyed construction—testable in the [HMAC Generator](/en/tools/hmac-generator)—over bare digests. Finally, review **quasi-identifier combinations** (`zip_code` + `date_of_birth` + `gender` often single out individuals after names are stripped) and inspect flagged `jwt_token` payloads in the [JWT Decoder](/en/tools/jwt-decoder) before choosing `Redact` or `Nullify`.
