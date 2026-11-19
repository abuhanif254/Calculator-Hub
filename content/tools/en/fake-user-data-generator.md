---
metaTitle: "Fake User Data Generator — Seeded JSON, SQL & CSV Data"
metaDescription: "Generate deterministic, GDPR-safe fake user profiles in your browser. Export localized test identities to JSON, PostgreSQL, MySQL, CSV, XML, or YAML."
metaKeywords: "fake user generator, dummy data generator, mock data generator, random identity generator, database seeder, API mock data, test data generation, fake profiles, JSON user generator, SQL seeder"
title: "Fake User Data Generator"
shortDescription: "Generate deterministic, privacy-safe synthetic user records localized across 8 regions for database seeding, UI layout testing, and API fixtures. Export directly to JSON, CSV, PostgreSQL, MySQL, XML, and YAML."
faqs:
  - question: "How does the custom seed produce reproducible fake user datasets?"
    answer: "When you supply a seed string, the generator folds it into a signed 32-bit integer hash and initializes a Mulberry32 pseudorandom number generator. Running the same seed with identical locale, record count, and field toggles yields byte-identical user records every time, making automated regression tests deterministic."
  - question: "Are the generated email addresses and websites safe for staging environments?"
    answer: "Yes. Every generated email uses non-routable or synthetic test domains such as example.com (reserved under RFC 2606) alongside mock-domain.net and test-email.org, and personal sites point to subdomains of example.com so misconfigured staging mailers never contact real people."
  - question: "Why are generated dates of birth always between the 1st and 28th of the month?"
    answer: "Clamping the day component to 01 through 28 guarantees every ISO 8601 date string (YYYY-MM-DD) is valid across all 12 calendar months without requiring leap-year checks or triggering database DATE parsing rejections on February 29 or April 31."
  - question: "How does SQL export protect against syntax errors in names or bios?"
    answer: "Both PostgreSQL and MySQL export modes emit multi-row INSERT INTO users statements with ANSI SQL single-quote doubling ('') for string literals and unquoted NULL tokens for missing values, preventing broken queries when importing into psql or mysql clients."
  - question: "Can this tool handle non-ASCII European characters for database collation testing?"
    answer: "Yes. Selecting German, French, or Spanish locales generates diacritic-bearing names and cities such as Müller, Schäfer, Raphaël, Lucía, and Düsseldorf, allowing you to verify UTF-8 and utf8mb4 encoding pipelines before production deployment."
features:
  - "Deterministic Mulberry32 PRNG seeded by custom strings for repeatable CI and QA fixtures"
  - "Eight regional locales (US, UK, CA, DE, FR, ES, IN, BD) plus a mixed Global mode with region-specific phone and postal formats"
  - "Seventeen individually toggleable profile attributes including IDs, ISO 8601 dates of birth, configurable passwords, bios, and initial avatars"
  - "Multi-format serializer outputting formatted JSON, RFC 4180 CSV, PostgreSQL SQL, MySQL SQL, UTF-8 XML, and YAML"
  - "Instant interactive table preview with live cross-field search and raw code inspection tabs"
  - "Zero-upload browser execution that synthesizes and downloads fixture files directly from local memory"
useCases:
  - "Seeding local PostgreSQL, MySQL, and SQLite databases with multi-row INSERT scripts during feature development"
  - "Supplying deterministic synthetic identities to Playwright, Cypress, and Jest end-to-end test suites"
  - "Stress-testing UTF-8 database collations, CSV importers, and UI truncation with diacritics and variable-length names"
  - "Populating staging environments under GDPR, HIPAA, and CCPA compliance without copying production PII"
  - "Importing tabular CSV fixtures into spreadsheet models, BI dashboards, or ETL validation pipelines"
  - "Prototyping authentication screens, user directories, and CRM profiles before backend endpoints exist"
howToSteps:
  - "Choose a regional locale (such as US, UK, DE, FR, IN, or Random Global) to match your target audience."
  - "Adjust the record slider or quick preset buttons to generate between 1 and 100 synthetic profiles."
  - "Enter an optional seed phrase if you need reproducible output across runs, or leave it blank for fresh entropy."
  - "Toggle the exact schema attributes required (such as fullName, email, password, phone, dob, and address) and set password rules."
  - "Inspect results in the searchable table view or switch to the code tab to choose JSON, CSV, SQL, XML, or YAML."
  - "Copy the formatted payload to your clipboard or download the ready-to-import fixture file directly."
---

Populating development databases, staging environments, and UI prototypes with real customer exports is one of the fastest ways to trigger a compliance incident under GDPR, CCPA, or SOC 2 controls. Conversely, typing repetitive placeholders like `Test User 1` hides real layout overflow, character-encoding bugs, and parser edge cases until code reaches production. This Fake User Data Generator synthesizes complete, multi-locale fictional identities entirely inside browser memory—requiring zero server round-trips and touching zero real personally identifiable information (PII)—so engineering and QA teams can seed realistic datasets on demand.

## Deterministic Synthetic Identities with Mulberry32 Seeding

Random test data is useful for exploratory testing, yet non-deterministic fixtures often cause flaky snapshot tests and hard-to-reproduce bug reports. To solve this, the generator separates entropy from structure through a 32-bit **Mulberry32** pseudorandom number generator (PRNG).

When you supply a text seed such as `sprint-42-staging`, the engine folds the UTF-16 code units into a signed 32-bit integer using a shift-and-subtract hash (`h = ((h << 5) - h) + charCode | 0`). That integer initializes the Mulberry32 state, which advances on every draw by adding the Weyl constant `0x6D2B79F5` and applying three unsigned bitwise XOR-multiply avalanching stages via `Math.imul`, before normalizing by $2^{32}$ (`4294967296`). Because every downstream selection—locale choice in Global mode, name pairing, date of birth, phone digits, and password characters—consumes from the same PRNG stream, sharing a single seed string with a teammate guarantees identical test rows across machines without committing bulky seed files to version control.

When the seed input is left blank, a fresh randomized seed is drawn per click so each batch yields distinct records. If your schema requires cryptographic-grade random primary keys instead of 12-character alphanumeric IDs, pair these profiles with our [UUID Generator](/en/tools/uuid-generator) for RFC 4122 Version 4 identifiers.

## Multi-Locale Formatting Rules and UTF-8 Edge Cases

An application validated exclusively against 5-digit US ZIP codes and pure ASCII names frequently breaks during international rollout. Selecting among the eight regional dictionaries (`US`, `UK`, `CA`, `DE`, `FR`, `ES`, `IN`, `BD`) or `Random` Global mode injects realistic formatting diversity across three common failure surfaces:

- **Unicode Diacritics and Collation Integrity**: German (`Müller`, `Schäfer`, `Düsseldorf`), French (`Léo`, `Raphaël`, `Maël`), and Spanish (`Lucía`, `Sofía`, `García`, `Málaga`) entries exercise multi-byte UTF-8 serialization. Passing these records through your ORM, API layer, and CSV exporter immediately exposes legacy `latin1` database tables or Windows-1252 Excel import mismatches (mojibake).
- **International Dialing and Postal Grammars**: Phone numbers follow country-prefixed formats (`+1`, `+44`, `+49`, `+33`, `+34`, `+91`, `+880`), while postal codes mirror regional structures—alphanumeric outward/inward spacing for the UK (`AB4 7CD`), alternating letter-digit FSA/LDU pairs for Canada (`K1A 0B1`), 6-digit Indian PIN codes, 4-digit Bangladeshi codes, and 5-digit US/EU numeric codes. Hardcoding an `INTEGER` database column for postal codes will immediately fail against UK and Canadian exports, catching schema flaws early.
- **RFC 2606 Safe Domains and Valid Calendar Dates**: Generated emails target reserved or synthetic domains led by `example.com` (formally reserved for documentation and testing by RFC 2606) so an accidental staging email dispatch cannot bounce against real mailboxes. Dates of birth follow strict ISO 8601 format (`YYYY-MM-DD`) spanning 1960–2005 with days bounded between `01` and `28`, eliminating Gregorian month-length validation errors.

## Export Format Escaping and Ingestion Reference

Each export target enforces format-specific escaping rules so downloaded files ingest cleanly into databases, parsers, and CI runners without manual cleanup:

| Export Format | Standard / Dialect | Escaping & Quoting Rules | Primary Ingestion Workflow |
| :--- | :--- | :--- | :--- |
| **JSON** | RFC 8259 (2-space indented) | Native `JSON.stringify` escaping for quotes, backslashes, and UTF-8 | REST/GraphQL fixtures, MongoDB `mongoimport`, Jest/Vitest mocks |
| **CSV** | RFC 4180 | Fields containing `,`, `"`, or `\n` are wrapped in double quotes with `""` escaping | Excel, Google Sheets, PostgreSQL `\copy`, Pandas `read_csv` |
| **SQL (PostgreSQL)** | ANSI Multi-Row `INSERT` | Single quotes doubled (`''`); missing fields emitted as unquoted `NULL` | `psql -f fake_users.sql`, Prisma/Drizzle local seed scripts |
| **SQL (MySQL)** | Multi-Row `INSERT` | Single quotes doubled (`''`); safe with `utf8mb4` tables | `mysql < fake_users.sql`, Docker Compose init scripts |
| **XML** | XML 1.0 (`UTF-8` prolog) | Encodes `&`, `<`, `>`, `"`, and `'` to the five predefined XML entities | SOAP test harnesses, enterprise ERP/EDI import queues |
| **YAML** | YAML 1.2 Sequence | Double-quotes scalars containing `:`, `#`, quotes, or newlines | Kubernetes test fixtures, Rails/Symfony fixture loaders, CI configs |

For schemas requiring deeply nested objects, arrays, custom enum distributions, or simulated HTTP status codes and latency, switch to our [API Mock Data Generator](/en/tools/api-mock-data-generator).

## Seeding Relational Databases Without Collation or PII Traps

Before piping a downloaded `.sql` file into a local database, ensure your target table matches the toggled field names and declares explicit UTF-8 support—particularly in MySQL, where legacy `utf8` (3-byte `utf8mb3`) truncates 4-byte characters and `latin1` corrupts accented letters:

```sql
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(16) PRIMARY KEY,
  fullName VARCHAR(120) NOT NULL,
  username VARCHAR(80) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(32),
  dob DATE,
  city VARCHAR(80),
  zipCode VARCHAR(16),
  country VARCHAR(64)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Once the schema exists, you can load a 100-row download directly from the shell without leaving the terminal:

```bash
# PostgreSQL (ensure client encoding is UTF8)
PGCLIENTENCODING=UTF8 psql -d app_dev -f fake_users.sql

# MySQL / MariaDB
mysql --default-character-set=utf8mb4 app_dev < fake_users.sql
```

When you must inspect bugs that only occur in real production datasets rather than freshly synthesized records, avoid copying raw dumps altogether—scrub sensitive columns first using our [Database Anonymizer](/en/tools/database-anonymizer) before bringing data into a non-production network.

## Troubleshooting Fixture Collisions and Schema Drift

- **Duplicate Emails in Large Batches**: Because each regional dictionary draws from curated name lists paired with five safe domains, generating 100 rows within a single locale can occasionally produce duplicate `email` entries under strict `UNIQUE` constraints. Append `ON CONFLICT (email) DO NOTHING` in PostgreSQL (`INSERT IGNORE` in MySQL) or switch to `Random` Global mode to expand the name pool across all eight regions.
- **Column Header Alignment**: Disable unused toggles—such as `website`, `bio`, or `avatar`—before exporting SQL or CSV so emitted column lists match your target table schema.
- **Air-Gapped CI Snapshots**: The `avatar` toggle emits initial-based `ui-avatars.com` URLs; disable it in offline containers where outbound requests fail visual snapshot checks.
