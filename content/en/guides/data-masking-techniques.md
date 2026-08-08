---
title: "Data Masking Techniques: Hashing, Tokenization, Redaction & More"
description: "Compare the most effective data masking techniques — including hashing, tokenization, redaction, pseudonymisation, and format-preserving encryption — with real-world use cases."
category: "Privacy & Security"
readingTime: 8
lastUpdated: "2026-08-08"
relatedCalculator: "database-privacy"
---

## What Is Data Masking?

Data masking is the process of replacing real sensitive data with realistic but fictitious values that cannot be reverse-engineered to reveal the original. It is a critical tool for:

- **Development and testing** — developers need realistic data structures without exposing real customer information
- **Analytics and reporting** — business intelligence teams need data patterns without identifying individuals
- **Vendor sharing** — third-party systems can receive masked data with the same structure as production
- **Regulatory compliance** — GDPR, HIPAA, and PCI DSS require protection of personal data outside production

The key distinction between masking techniques is **reversibility** — some techniques allow the original value to be recovered (reversible), while others permanently transform the data (irreversible).

---

## Technique 1 — Data Redaction

**Reversibility:** Irreversible  
**Performance:** Very fast  
**Format preserved:** Partial

Redaction replaces all or part of a value with a fixed character (usually `*` or `X`). It is the simplest masking technique.

### Types of Redaction

**Full redaction** — entire value replaced:
```
Original:  john.smith@company.com
Redacted:  **************************
```

**Partial redaction** — preserve structural context:
```
Original email:     john.smith@company.com
Partial redaction:  j***.s****@c******.com

Original card:      4532 1234 5678 9012
Partial redaction:  **** **** **** 9012   (last 4 preserved — PCI DSS standard)

Original phone:     +1 (555) 867-5309
Partial redaction:  +1 (***) ***-5309
```

### When to Use Redaction
- **Display masking** in UIs (showing partial card numbers in payment screens)
- **Log file sanitisation** (strip PII from application logs)
- **API responses** (return masked values to unauthorised callers)

### Limitation
Redaction destroys analytical utility. A column of `*****` values tells you nothing about data distributions or value patterns. Do not use redaction when the data will be used for testing query logic.

---

## Technique 2 — Data Hashing

**Reversibility:** Irreversible (by design)  
**Performance:** Very fast  
**Format preserved:** No (fixed-length hex/base64 output)

Hashing transforms a value using a one-way cryptographic function. The same input always produces the same output (deterministic), but the output cannot be reversed to recover the input.

```
SHA-256("john.smith@company.com") =
  "5d41402abc4b2a76b9719d911017c592..."
```

### Consistent Hashing for Referential Integrity

Because hashing is deterministic, the same email address in the `users` table and the `orders` table will hash to the same value. This preserves foreign key relationships — a critical requirement for testing database joins.

```sql
-- Mask email while preserving referential integrity
UPDATE users SET email = encode(sha256(email::bytea), 'hex') || '@masked.invalid';
UPDATE orders SET customer_email = encode(sha256(customer_email::bytea), 'hex') || '@masked.invalid';
-- JOIN on email still works in test environment
```

### Salted Hashing

Unsalted hashes are vulnerable to **rainbow table attacks** — precomputed tables of hash values for common inputs. A salt (random value appended before hashing) defeats this:

```sql
-- Use a fixed salt per environment (store in secret manager, not in DB)
SELECT encode(sha256(('fixed-salt-' || email)::bytea), 'hex') FROM users;
```

### When to Use Hashing
- **Referential integrity preservation** across multiple tables
- **Consistent masking** where the same value must produce the same masked output
- **One-way anonymisation** where recovery is never needed

### Limitation
Hashed values don't look realistic. An email address like `5d41402abc4b...@masked.invalid` will fail format validation in many applications.

---

## Technique 3 — Tokenization

**Reversibility:** Reversible (with token vault)  
**Performance:** Moderate (requires vault lookup)  
**Format preserved:** Yes (format-preserving tokenization)

Tokenization replaces a sensitive value with a randomly generated token. The token itself contains no mathematical relationship to the original — it is simply an index into a secure vault that stores the real value.

```
Original:  4532 1234 5678 9012
Token:     4823 9012 3847 1029   ← looks like a real card number
Vault:     { "4823 9012 3847 1029" → "4532 1234 5678 9012" }
```

### Format-Preserving Tokenization

Format-preserving tokenization (FPT) generates tokens that match the format and length of the original value. This means:
- A 16-digit card number → a 16-digit token (passes Luhn check)
- An email address → a valid-looking email address
- A date of birth → a valid date in the same decade

FPT is ideal for systems where existing validation logic must continue to work in test environments.

### PCI DSS and Tokenization

PCI DSS explicitly recognises tokenization as a method for **descoping** card data from compliance requirements. If your application only ever sees tokens (never real PANs), the scope of your PCI DSS audit shrinks dramatically — potentially eliminating the requirement for annual PCI assessment for entire system components.

### When to Use Tokenization
- **Payment card data** (PCI DSS descoping)
- **Systems requiring re-identification** (support lookups, data access requests)
- **Long-term data preservation** where original values may be needed years later

### Limitation
Requires a secure, highly-available token vault. If the vault is lost or compromised, all tokenized data is either permanently lost or exposed. Vault infrastructure adds operational complexity.

---

## Technique 4 — Pseudonymisation

**Reversibility:** Reversible (with mapping table)  
**Performance:** Fast after initial mapping  
**Format preserved:** Configurable

Pseudonymisation replaces real identifiers with pseudonyms — artificial identifiers that have no inherent meaning. The mapping between real identifiers and pseudonyms is stored separately with strict access controls.

```
Real data:     { email: "alice@example.com", name: "Alice Johnson" }
Pseudonymised: { user_id: "usr_a7f2c9d1", name: "User 10042" }
Mapping table: { "usr_a7f2c9d1" → "alice@example.com" }
```

GDPR explicitly recognises pseudonymisation (Article 4(5)) as a privacy-enhancing technique that reduces risk. Unlike anonymisation, pseudonymised data is still personal data under GDPR — because re-identification is possible with the mapping table — but the reduced risk may satisfy Article 32 requirements with less stringent controls.

### When to Use Pseudonymisation
- **Analytics systems** where patterns matter but identity does not
- **Research datasets** requiring reversible de-identification
- **Multi-tenant systems** where internal IDs should not expose real identifiers

---

## Technique 5 — Data Substitution

**Reversibility:** Irreversible  
**Performance:** Moderate  
**Format preserved:** Yes (realistic fake data)

Substitution replaces real values with realistic fake values drawn from a curated dictionary. Unlike hashing, substituted values look completely authentic.

| Original | Substituted |
|---|---|
| Alice Johnson | Maria Chen |
| +1 (555) 867-5309 | +1 (412) 293-0048 |
| 123 Main St, Boston | 847 Oak Ave, Portland |
| alice@example.com | michael.torres@gmail.com |

Substitution is generated using **fake data libraries** (Faker.js, Faker (Python)) that produce region-appropriate names, addresses, phone numbers, and email addresses.

### When to Use Substitution
- **Development and QA environments** requiring realistic test data
- **Demo databases** for customer demonstrations
- **Training data** for machine learning models

### Limitation
Substitution breaks referential integrity if the same real value appears in multiple tables (two tables with the same customer email will get different fake emails). Consistent substitution requires building a substitution map — which effectively becomes tokenization.

---

## Technique 6 — Generalisation / Data Aggregation

**Reversibility:** Irreversible  
**Performance:** Very fast  
**Format preserved:** Partial

Generalisation reduces the precision of a value without removing it entirely, making individual identification harder while preserving statistical utility.

| Original | Generalised |
|---|---|
| Date of birth: 1987-03-15 | Birth year: 1987 |
| Age: 34 | Age range: 30–39 |
| Income: $78,400 | Income bracket: $75k–$100k |
| Postcode: SW1A 2AA | Postcode area: SW1 |

Generalisation is the core technique used in **k-anonymity** — a privacy model where every individual in a dataset is indistinguishable from at least k-1 others based on their quasi-identifiers.

### When to Use Generalisation
- **Statistical reporting** and dashboards
- **Public data releases** (government open data)
- **Compliance with HIPAA Safe Harbor** (which requires generalising geographic data to regional level)

---

## Choosing the Right Technique

| Requirement | Recommended Technique |
|---|---|
| Test data that looks real | Substitution |
| Preserving joins across tables | Consistent hashing or tokenization |
| PCI DSS card data descoping | Tokenization |
| GDPR analytics pipeline | Pseudonymisation or generalisation |
| UI display of partial values | Partial redaction |
| Permanent anonymisation | Hashing or substitution |
| Re-identification needed later | Tokenization or pseudonymisation |

In practice, most platforms combine multiple techniques — for example, substituting names, hashing emails (for consistent joins), and partially redacting card numbers (last 4 digits visible).

---

## Frequently Asked Questions

**Q: Is data masking the same as encryption?**
A: No. Encryption transforms data into ciphertext that can be decrypted with a key — the original value is recoverable. Masking (particularly irreversible techniques like hashing and substitution) destroys the original value. Encryption protects data in transit and at rest; masking protects data when shared beyond the production security boundary.

**Q: Can masked data be unmasked?**
A: It depends on the technique. Tokenization and pseudonymisation are reversible. Hashing, redaction, and substitution are irreversible — the original cannot be recovered from the masked value alone.

**Q: Does data masking satisfy GDPR anonymisation?**
A: Irreversible masking (hashing, substitution, generalisation to the point of non-re-identification) can constitute anonymisation under GDPR, exempting the data from the regulation. However, the standard is high — the ICO and EDPB have stated that the risk of re-identification must be "impossible in practice."

**Q: What is format-preserving encryption (FPE)?**
A: FPE is a cryptographic technique that encrypts data while preserving its format and length. Unlike standard encryption (which produces fixed-length ciphertext), FPE of a 16-digit number produces a 16-digit encrypted number. It is similar to format-preserving tokenization but uses cryptographic algorithms (AES-FF1, AES-FF3-1) rather than a vault.

---

## Apply Masking Directly from Your Browser

The [Nexus Data Privacy Platform](/en/database-privacy) includes a built-in masking rule engine with 30+ pre-built masking strategies. Connect your database, scan for PII, and apply the right masking technique to each column — without writing any SQL. All processing happens in your browser; no data leaves your device.
