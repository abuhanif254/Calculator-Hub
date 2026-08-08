---
title: "HIPAA Data De-Identification: Safe Harbor vs Expert Determination"
description: "Understand HIPAA de-identification requirements under 45 CFR §164.514 — comparing the Safe Harbor and Expert Determination methods with guidance on which 18 identifiers must be removed."
category: "Privacy & Security"
readingTime: 8
lastUpdated: "2026-08-08"
relatedCalculator: "database-privacy"
---

## What Is HIPAA De-Identification?

Under HIPAA (the Health Insurance Portability and Accountability Act), Protected Health Information (PHI) is subject to strict privacy protections. However, the HIPAA Privacy Rule provides a pathway to use and disclose health data without individual authorisation: **de-identification**.

De-identified information is no longer considered PHI and therefore falls outside HIPAA's privacy protections. This enables healthcare organisations to:

- Share data with researchers and public health authorities
- Publish population health statistics
- Train machine learning models on clinical data
- Provide de-identified data to business partners and analytics platforms

The regulation specifies two acceptable methods for de-identifying PHI, defined in **45 CFR §164.514(b)**.

---

## Method 1 — Safe Harbor

The Safe Harbor method is the more prescriptive of the two approaches. It requires the removal or generalisation of **18 specific categories of identifiers** from the PHI.

### The 18 Safe Harbor Identifiers

| # | Category | Examples |
|---|---|---|
| 1 | Names | Patient name, relative name, employer name |
| 2 | Geographic subdivisions smaller than state | Street address, city, county, ZIP code (first 3 digits may be retained for areas with population >20,000) |
| 3 | Dates (other than year) | Birth date, admission date, discharge date, death date |
| 4 | Phone numbers | All telephone/fax numbers |
| 5 | Fax numbers | (included with phone) |
| 6 | Email addresses | All email addresses |
| 7 | Social Security numbers | Full or partial SSN |
| 8 | Medical record numbers | Hospital or clinic MRN |
| 9 | Health plan beneficiary numbers | Insurance member ID |
| 10 | Account numbers | Bank or financial account numbers |
| 11 | Certificate/license numbers | Driver's license, medical license |
| 12 | Vehicle identifiers | License plates, VINs |
| 13 | Device identifiers | Serial numbers, IMEIs |
| 14 | Web URLs | Specific website addresses |
| 15 | IP addresses | IPv4 and IPv6 addresses |
| 16 | Biometric identifiers | Fingerprints, retinal scans, voiceprints |
| 17 | Full-face photographs | Photos that could identify an individual |
| 18 | Any other unique identifier | Any code, number, or characteristic that could identify the individual |

### ZIP Code Rules Under Safe Harbor

ZIP codes deserve special attention because they are frequently used in health research. Safe Harbor allows the first 3 digits of a ZIP code to be retained, **unless** the geographic unit formed by those 3 digits contains fewer than 20,000 people. Currently, 17 ZIP code prefixes in the US must be changed to `000` due to low population density.

```sql
-- PostgreSQL: Safe Harbor ZIP anonymisation
UPDATE patients SET
  zip_code = CASE
    -- ZIP prefixes with population < 20,000 must be fully removed
    WHEN LEFT(zip_code, 3) IN ('036', '059', '102', '203', '556', '692',
                                '790', '821', '823', '830', '831', '878',
                                '879', '884', '890', '893', '000')
    THEN '000'
    -- Others: retain first 3 digits only
    ELSE LEFT(zip_code, 3) || '00'
  END;
```

### Dates Under Safe Harbor

All dates more specific than year must be removed or generalised:

- ❌ `1987-03-15` (date of birth) → ✅ `1987` (year only)
- ❌ `2024-01-08` (admission date) → ✅ `2024`
- ❌ `2024-01-12` (discharge date) → ✅ `2024`

**Age exception:** Ages under 90 may be retained. Ages of 90 and above must be aggregated into a single category (e.g., "90 or older") to protect the relatively small population of super-centenarians.

```sql
-- Anonymise dates: keep year only, handle age 90+
UPDATE patients SET
  birth_date = DATE_TRUNC('year', birth_date),
  age_at_admission = CASE
    WHEN age_at_admission >= 90 THEN '90+'
    ELSE age_at_admission::TEXT
  END;
```

### The "No Actual Knowledge" Requirement

Safe Harbor also requires that the covered entity "does not have actual knowledge that the information could be used alone or in combination with other information to identify an individual who is a subject of the information." This means Safe Harbor is not purely mechanical — if an organisation knows a combination of retained fields (e.g., rare disease + small county + year) is sufficient to identify a patient, they must take additional steps.

---

## Method 2 — Expert Determination

The Expert Determination method is more flexible but requires statistical expertise. Under this method, a qualified statistician applies "generally accepted statistical and scientific principles and methods" to analyse the data and determine that "the risk is very small that the information could be used, alone or in combination with other reasonably available information, by an anticipated recipient to identify an individual."

### What "Very Small Risk" Means

The HHS has not defined a specific numerical threshold for "very small risk." In practice, the privacy and biostatistics community typically interprets this as:

- **Re-identification risk below 5%** using state-of-the-art linkage attacks
- **k-anonymity ≥ 5** (each record is indistinguishable from at least 4 others)
- **l-diversity** for sensitive attributes (multiple sensitive values within each equivalence class)

### Expert Determination Process

1. **Data inventory** — Catalogue all variables, their types, and their distributions
2. **Identify quasi-identifiers** — Variables that, in combination, could re-identify individuals (age, diagnosis, region, dates)
3. **Linkage risk analysis** — Model the probability of re-identification using available external databases (census data, insurance records, public datasets)
4. **Apply privacy transformations** — Generalisation, suppression, noise addition until risk falls below threshold
5. **Document the analysis** — Produce a written report that the covered entity retains

The expert must document their methods and conclusions. This documentation must be retained and is subject to audit.

### Expert Determination vs Safe Harbor

| Aspect | Safe Harbor | Expert Determination |
|---|---|---|
| Flexibility | Low — fixed list of 18 identifiers | High — any variables, statistically validated |
| Data utility | Lower — broad removal of fields | Higher — retain more fields if risk is low |
| Expertise required | Minimal — mechanical application | High — biostatistician or privacy expert required |
| Documentation | Minimal | Extensive written report required |
| Best for | Simple datasets, standard research | Complex datasets, high analytical value required |
| Audit risk | Low | Moderate — depends on quality of documentation |

---

## Implementing HIPAA De-Identification in Databases

### Step 1 — Scan for PHI

Before de-identifying, you need a complete inventory of where PHI exists across your database systems. The Nexus Data Privacy Platform can automatically detect all 18 Safe Harbor identifiers across your PostgreSQL, MySQL, MongoDB, or other connected databases.

### Step 2 — Apply Transformations

```sql
-- Complete Safe Harbor de-identification example for a patient table

UPDATE patients SET
  -- Category 1: Names
  first_name = 'REDACTED',
  last_name = 'REDACTED',

  -- Category 2: Geographic (retain 3-digit ZIP prefix for high-population areas)
  address_street = NULL,
  address_city = NULL,
  address_zip = LEFT(address_zip, 3) || '00',
  address_state = address_state,  -- State level is OK

  -- Category 3: Dates (year only)
  date_of_birth = DATE_TRUNC('year', date_of_birth),
  admission_date = DATE_TRUNC('year', admission_date),
  discharge_date = DATE_TRUNC('year', discharge_date),

  -- Category 4-6: Contact
  phone = NULL,
  email = NULL,

  -- Category 7: SSN
  ssn = NULL,

  -- Category 8: MRN (replace with internal de-identified ID)
  medical_record_number = 'DEID-' || EXTRACT(YEAR FROM date_of_birth)::TEXT || '-' || id,

  -- Category 15: IP address
  last_login_ip = NULL;
```

### Step 3 — Validate De-identification

After applying transformations, validate that:
- No direct identifiers remain (spot-check a sample of rows)
- Dates have been truncated to year
- ZIP codes are 5 digits with last 2 as `00`
- Age ranges are used for patients 90+
- No combination of remaining fields is sufficient to identify specific individuals

### Step 4 — Document and Maintain

Maintain a record of:
- Which Safe Harbor method was applied (or which expert performed Expert Determination)
- The date of de-identification
- Which fields were removed, generalised, or transformed
- Any exceptions or edge cases handled

---

## Common Mistakes in HIPAA De-Identification

**1. Forgetting metadata and audit logs**  
Audit logs, system logs, and change history tables often contain identifiers (user IDs, email addresses, IP addresses) that are overlooked. De-identification must cover all data stores, not just primary tables.

**2. Retaining age over 90**  
This is a common error. Any age field showing 90 or above must be generalised to "90+" or equivalent.

**3. Assuming ZIP-3 is always safe**  
The 17 low-population ZIP prefixes must be zeroed out entirely, not just truncated to 3 digits.

**4. Not considering combinations**  
A dataset with year of birth + 3-digit ZIP + rare diagnosis may be re-identifiable even with all 18 identifiers removed, due to the small population within that intersection.

**5. Treating de-identification as one-time**  
Patient data changes. De-identification must be re-applied when new data is added, and the analysis must be updated when the external landscape changes (new public datasets become available that could be used for linkage).

---

## Frequently Asked Questions

**Q: Is de-identified data completely exempt from HIPAA?**
A: Yes — once data is properly de-identified using Safe Harbor or Expert Determination, it is no longer PHI and HIPAA's Privacy Rule no longer applies. However, other laws (state privacy laws, IRB requirements for research) may still apply.

**Q: Can we use de-identified data for machine learning?**
A: Yes, this is one of the primary use cases. De-identified clinical data is widely used to train diagnostic models, population health models, and clinical decision support systems.

**Q: What is a Limited Data Set?**
A: A Limited Data Set is an intermediate option under HIPAA — not fully de-identified, but with most direct identifiers removed (16 of the 18; dates and geographic data at region level may be retained). It requires a Data Use Agreement (DUA) with the recipient.

**Q: Who qualifies as an "expert" for Expert Determination?**
A: The HHS has not defined specific qualifications. In practice, this is typically a biostatistician, epidemiologist, or privacy scientist with demonstrated experience in re-identification risk analysis.

---

## De-Identify Your Healthcare Database for Free

The [Nexus Data Privacy Platform](/en/database-privacy) includes a HIPAA-mode scanner that automatically detects all 18 Safe Harbor identifiers across your connected databases, generates a compliance report, and applies Safe Harbor transformations with one click. Your data never leaves your browser.
