---
metaTitle: "UUID Generator Online | Bulk RFC 9562 v1, v4, v6 & v7"
metaDescription: "Generate up to 10,000 RFC 9562 UUIDs (v1, v4, v6, v7) client-side with Web Crypto API. Format, validate, and export as JSON, CSV, or TXT."
metaKeywords: "UUID generator, GUID generator, UUID v4, UUID v7, bulk UUID, generate UUIDs, online UUID tool, database IDs, unique identifier, RFC 9562, UUID validator"
title: "UUID Generator"
shortDescription: "Generate cryptographically secure RFC 9562 UUIDs (v1, v4, v6, and time-ordered v7) individually or in batches up to 10,000, with instant validation, custom formatting, and language snippets."
faqs:
  - question: "Why does UUID v7 outperform UUID v4 as a PostgreSQL or MySQL primary key?"
    answer: "UUID v4 is completely random, so new inserts scatter across random leaf pages of a B-Tree index, triggering page splits, write amplification, and buffer-pool cache misses. UUID v7 places a 48-bit millisecond Unix timestamp in the most significant bits, keeping inserts monotonically ordered at the right edge of the B-Tree."
  - question: "What changed when RFC 9562 replaced the older RFC 4122 UUID specification?"
    answer: "Published by the IETF in May 2024, RFC 9562 officially standardized time-ordered UUID v6, Unix-epoch UUID v7, and custom-layout UUID v8, while deprecating MAC-based v1 for privacy-sensitive designs and defining formal monotonicity methods for sub-millisecond v7 bursts."
  - question: "How should I store UUIDs in SQL databases to save disk space and RAM?"
    answer: "Avoid storing 36-character ASCII strings in VARCHAR(36) or CHAR(36) columns, which consume 36+ bytes and bloat every secondary index. Use native 16-byte UUID columns in PostgreSQL, UNIQUEIDENTIFIER in SQL Server, or BINARY(16) with UUID_TO_BIN() in MySQL 8."
  - question: "Does the built-in UUID Validator accept uppercase, braced, or hyphenless GUIDs?"
    answer: "Yes. Before verifying canonical RFC structure, version nibble, and variant bits, the Validator tab strips optional curly braces ({...}) and surrounding quotes, and automatically normalizes 32-character unhyphenated hexadecimal strings back into standard 8-4-4-4-12 layout."
  - question: "How likely is a UUID v4 or v7 collision in a high-throughput distributed system?"
    answer: "UUID v4 carries 122 random bits (5.3 x 10^36 states), requiring roughly 2.71 x 10^18 IDs to reach a 50% birthday-paradox collision risk. UUID v7 embeds 74 bits of randomness (or monotonic counter plus random bits) per millisecond, making accidental collisions negligible even across globally distributed write clusters."
features:
  - "Full RFC 9562 generation across four versions: v1 (Gregorian/MAC), v4 (CSPRNG random), v6 (reordered time), and v7 (Unix epoch time-sorted)"
  - "High-speed bulk batch engine producing up to 10,000 formatted UUIDs in a single client-side pass"
  - "Granular string formatters for uppercase hex, hyphen removal (32-char compact), Microsoft {braces}, and double-quote wrapping"
  - "Dedicated Validator tab that normalizes wrapped or unhyphenated strings and checks RFC structural validity"
  - "Copy-ready Developer Snippets tab covering JavaScript/TypeScript, Node.js, Python, Java, C#/.NET, and PostgreSQL"
  - "One-click clipboard export and file downloads in TXT, JSON array, and CSV formats with local 10-batch session history"
useCases:
  - "Designing high-throughput PostgreSQL, MySQL, or CockroachDB schemas with B-Tree-friendly UUID v7 primary keys"
  - "Generating unguessable UUID v4 resource identifiers to eliminate sequential IDOR enumeration vulnerabilities in REST APIs"
  - "Seeding staging tables, integration fixtures, and load-test payloads with up to 10,000 bulk unique IDs"
  - "Creating Microsoft .NET, COM, or SQL Server braced uppercase GUID literals for registry and config migrations"
  - "Assigning distributed trace and correlation IDs across microservices, message queues, and offline-first mobile clients"
  - "Validating incoming third-party webhook identifiers and legacy database keys for RFC compliance"
howToSteps:
  - "Choose your target specification on the Generator tab: v4 for pure unpredictability, v7 for chronological database indexing, or v1/v6 for legacy time-based pipelines."
  - "Pick a single ID or configure a bulk count up to 10,000 identifiers using the quick presets or custom numeric input."
  - "Toggle formatting modifiers as needed—Uppercase, Remove Hyphens, Add Braces, or Add Quotes—to match your target language or SQL syntax."
  - "Click Generate to mint fresh identifiers locally, then copy individual rows or download the full batch as TXT, CSV, or JSON."
  - "Switch to the Validator tab to verify external UUID strings, or open Developer Snippets to copy native library code for your backend stack."
---

Distributed systems cannot rely on a single database sequence without introducing a coordination bottleneck, and exposing sequential integers (`/orders/4019`) leaks business volume while inviting Insecure Direct Object Reference (IDOR) scraping. **Universally Unique Identifiers (UUIDs)**—called GUIDs in Microsoft `.NET` and Win32 ecosystems—solve both problems by packing globally collision-resistant identity into a fixed 128-bit structure standardized under **IETF RFC 9562** (which obsoleted RFC 4122 in May 2024). This workspace generates, formats, and validates `v1`, `v4`, `v6`, and `v7` UUIDs locally inside your browser using native Web Crypto entropy, keeping production identifiers private and off the wire.

## Canonical 128-Bit Layout and Variant Encoding

Every canonical UUID prints as 32 hexadecimal nibbles separated into five hyphenated groups (`8-4-4-4-12`, 36 ASCII characters total):

```text
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
              ^    ^
              |    └── Variant nibble: 8, 9, a, or b (binary 10xx = RFC 9562)
              └─────── Version nibble: 1, 4, 6, or 7
```

Six bits are reserved as structural metadata across standard RFC versions: the 4-bit `ver` field at octet 6 high nibble, and the 2-bit `var` field (`10` in binary) at octet 8 high bits. That leaves **122 variable bits** whose internal allocation differs sharply between versions.

| UUID Version | Time Representation | Random / Node Bits | Lexicographically Sortable | Privacy / MAC Exposure | Primary Engineering Fit |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **UUID v1** | 60-bit 100ns ticks since `1582-10-15` (low bits first) | 14-bit `clock_seq` + 48-bit MAC/node | No (time fields split) | High if real MAC used | Legacy distributed systems and audit compatibility |
| **UUID v4** | None | 122 CSPRNG random bits | No (uniformly scattered) | None | Public API URLs, correlation IDs, opaque tokens |
| **UUID v6** | 60-bit Gregorian 100ns ticks (big-endian reordered) | 14-bit `clock_seq` + 48-bit node | Yes | Moderate (use random node) | Drop-in sortable migration path from legacy v1 |
| **UUID v7** | 48-bit big-endian Unix Epoch milliseconds (`1970-01-01`) | 12-bit `rand_a` (or counter) + 62-bit `rand_b` | Yes (native chronological) | None (timestamp only) | Modern relational/NoSQL primary keys, event logs |

## Why UUID v7 Fixes B-Tree Index Fragmentation

In relational storage engines such as PostgreSQL heap/B-Tree indexes and MySQL InnoDB clustered primary keys, key ordering dictates physical disk I/O. Inserting millions of random **UUID v4** primary keys forces the database to locate and mutate seemingly random leaf pages across the entire index tree:

1. **Page Splits & Write Amplification**: Half-filled B-Tree pages split continuously, inflating index size by 30%–50% and doubling PostgreSQL Write-Ahead Log (WAL) full-page image writes.
2. **Buffer-Pool Thrashing**: Because active writes hit cold pages scattered across gigabytes of index data rather than only the rightmost leaf page, cache hit ratios plummet once the index outgrows RAM.

**UUID v7** resolves this cleanly. Its top 48 bits encode Unix epoch milliseconds in big-endian byte order (valid through the year 10889 AD), followed by 74 random or monotonic counter bits. Consecutive records append cleanly to the trailing edge of the B-Tree—delivering insert throughput close to 64-bit `BIGINT` sequences while remaining stateless and globally unique across multi-region writers. Keep one security nuance in mind: because v7 reveals record creation time down to the millisecond, prefer **UUID v4** for security-sensitive bearer identifiers or URLs where creation timestamps must stay hidden.

## Birthday-Paradox Collision Math

Collision probability for uniformly random $k$-bit identifiers follows the birthday approximation:

$$P(\text{collision}) \approx 1 - \exp\!\left(-\frac{n^2}{2 \cdot 2^k}\right)$$

For **UUID v4** ($k = 122$, $2^{122} \approx 5.32 \times 10^{36}$), generating $n = 10^{12}$ (one trillion) identifiers produces a collision probability below $10^{-13}$. Reaching a 50% collision chance requires $n \approx 2.71 \times 10^{18}$ IDs—equivalent to minting 1 billion UUIDs every second for more than 85 years. For **UUID v7**, the 74 random bits per millisecond yield $2^{74} \approx 1.89 \times 10^{22}$ distinct states inside every single millisecond window, and RFC 9562 §6.2 permits using the 12-bit `rand_a` field as a monotonic counter for deterministic same-millisecond ordering.

## Database Storage, Validation Regex, and Endianness Gotchas

Never store UUIDs as `VARCHAR(36)` in production tables; binary storage halves memory footprint and accelerates index comparisons dramatically:

```sql
-- PostgreSQL: native 16-byte uuid type (v4 built-in; v7 native in PG 18 / extensions)
CREATE TABLE events (
  id UUID PRIMARY KEY,
  payload JSONB NOT NULL
);

-- MySQL 8: compact 16-byte storage (pass swap_flag=1 only for v1, NOT v7)
CREATE TABLE events (
  id BINARY(16) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO events (id) VALUES (UUID_TO_BIN('019345a2-8c1d-7f2e-9a41-3b7e2f8c1d09', 0));
```

Watch out for two subtle cross-platform pitfalls:
- **MySQL `UUID_TO_BIN(uuid, 1)` trap**: The second argument `1` rearranges UUID **v1** time octets for sorting. Never pass `1` for **UUID v7**, which is already big-endian sorted—doing so scrambles its timestamp prefix!
- **Microsoft `.NET` GUID Byte Order**: `Guid.ToByteArray()` in C# encodes the first three groups (`Data1`, `Data2`, `Data3`) in **little-endian** order while leaving the final two groups big-endian. When exchanging raw 16-byte blobs between C# and PostgreSQL or Go, use `Guid.ToByteArray(bigEndian: true)` (.NET 8+) or serialize via canonical strings.

For strict RFC 9562 input validation (matching versions 1, 4, 6, or 7 and variant `8/9/a/b`), use:

```regex
^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1467][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$
```

### Handling Nil, Max, and Clock-Drift Edge Cases
RFC 9562 also reserves two sentinel values that developers should recognize in schema migrations and boundary tests: the **Nil UUID** (`00000000-0000-0000-0000-000000000000`), commonly used to represent an unset foreign key without nullable columns, and the **Max UUID** (`ffffffff-ffff-ffff-ffff-ffffffffffff`), useful as an exclusive upper range bound in partitioned B-Tree queries. When deploying UUID v7 across fleet nodes synchronized via NTP, ensure your library implements RFC 9562 monotonic counter handling so backward clock adjustments or burst writes within the same millisecond never invert sort order or collide across threads.

## Pairing UUIDs Across Your Development Pipeline

After exporting a bulk JSON array of up to 10,000 IDs, you can pretty-print or merge them into larger API payloads with our [JSON Formatter](/en/tools/json-formatter) or build realistic multi-field test fixtures in the [API Mock Data Generator](/en/tools/api-mock-data-generator). If your schema requires URL-compact NanoID-style keys shorter than 36 characters or custom prefix patterns like `usr_...`, switch to the [Random String Generator](/en/tools/random-string-generator).
