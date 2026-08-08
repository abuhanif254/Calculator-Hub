---
title: "GDPR Database Compliance: A Technical Guide for Developers"
description: "A practical technical guide to GDPR Articles 25 and 32 — covering data minimisation, encryption, pseudonymisation, and audit logging requirements for databases."
category: "Privacy & Security"
readingTime: 9
lastUpdated: "2026-08-08"
relatedCalculator: "database-privacy"
---

## Why GDPR Applies to Your Database

The General Data Protection Regulation (GDPR) is not just a legal document — it imposes direct technical requirements on how databases store, process, and protect personal data. Violations can result in fines of up to **€20 million or 4% of global annual turnover**, whichever is higher.

For developers and database administrators, two articles define the majority of technical obligations:

- **Article 25 — Data Protection by Design and by Default**
- **Article 32 — Security of Processing**

This guide translates those articles into actionable database practices.

---

## Article 25 — Data Protection by Design

Article 25 requires that privacy protections be built into your systems from the ground up, not bolted on later. For databases, this means:

### 1. Data Minimisation

Collect and retain only the data strictly necessary for the specified purpose. In database terms:

- **Remove unused columns.** If your `users` table has a `date_of_birth` column that no feature actually uses, drop it.
- **Separate sensitive data into dedicated tables** with stricter access controls. Store payment details in a separate schema from general user data.
- **Use soft-delete carefully.** Marking records as `deleted = true` still retains the personal data. For erasure requests under Article 17, you may need to physically delete or anonymise rows.
- **Set retention policies.** Add a `created_at` column to all tables containing personal data and automate deletion or anonymisation after the retention period.

```sql
-- Example: automated cleanup job for expired records
DELETE FROM user_sessions
WHERE created_at < NOW() - INTERVAL '90 days';

-- Example: anonymise rather than delete (preserves referential integrity)
UPDATE users SET
  email = 'deleted_' || id || '@anonymised.invalid',
  full_name = 'Deleted User',
  phone = NULL,
  date_of_birth = NULL
WHERE deleted_at < NOW() - INTERVAL '30 days'
  AND is_anonymised = false;
```

### 2. Purpose Limitation

Data collected for one purpose must not be repurposed without consent. Implement this at the database layer by:

- Documenting the processing purpose in a `data_catalog` table or external record.
- Using **row-level security (RLS)** to prevent analytical queries from accessing operational PII.
- Separating analytics databases from operational ones (ETL pipelines should strip or pseudonymise PII before loading to analytics systems).

### 3. Pseudonymisation

Replace direct identifiers with non-identifying tokens. The original mapping is stored separately and securely.

```sql
-- Store a pseudonym instead of a real email
CREATE TABLE user_pseudonyms (
  pseudonym_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  real_email TEXT NOT NULL,  -- Stored encrypted
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Application tables use pseudonym_id instead of email
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  pseudonym_id UUID REFERENCES user_pseudonyms(pseudonym_id),
  amount NUMERIC,
  created_at TIMESTAMPTZ
);
```

Pseudonymisation is explicitly recognised in GDPR Recital 26 as a privacy-enhancing technique that reduces risk — though pseudonymised data is still considered personal data under the regulation.

---

## Article 32 — Security of Processing

Article 32 requires implementing "appropriate technical and organisational measures" to ensure security proportionate to the risk. The article lists four specific techniques:

### 1. Encryption at Rest

All personal data stored in databases must be encrypted at rest. This protects against physical media theft and cloud provider access.

**Implementation options:**

| Approach | Protection Level | Granularity |
|---|---|---|
| Full-disk encryption (FDE) | Protects against physical theft | Entire disk |
| Transparent Data Encryption (TDE) | Database-level, automatic | Entire database |
| Column-level encryption | Application-managed | Per column |
| Application-level encryption | Most control, highest security | Per value |

For maximum GDPR compliance, **column-level or application-level encryption** of sensitive fields is recommended, as it ensures data is protected even if an attacker gains database access credentials.

```sql
-- PostgreSQL: using pgcrypto for column encryption
-- Install extension first: CREATE EXTENSION pgcrypto;

-- Store encrypted email
UPDATE users SET
  email_encrypted = pgp_sym_encrypt(email, 'your-encryption-key')
WHERE id = $1;

-- Retrieve and decrypt
SELECT pgp_sym_decrypt(email_encrypted::bytea, 'your-encryption-key') AS email
FROM users WHERE id = $1;
```

### 2. Encryption in Transit

All connections to the database must use TLS/SSL. Verify this is enforced:

```sql
-- PostgreSQL: check SSL status
SHOW ssl;                        -- Should return 'on'
SELECT ssl FROM pg_stat_ssl WHERE pid = pg_backend_pid();

-- Force SSL connections in pg_hba.conf:
-- hostssl all all 0.0.0.0/0 scram-sha-256
```

For cloud databases (AWS RDS, Google Cloud SQL, Supabase), enforce SSL in connection strings:
```
postgresql://user:pass@host:5432/db?sslmode=require
```

### 3. Ensuring Confidentiality, Integrity, and Availability

**Confidentiality** — Row-Level Security (RLS):

```sql
-- Supabase/PostgreSQL RLS example
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users see own data only"
ON user_data FOR ALL
USING (auth.uid() = user_id);
```

**Integrity** — Prevent unauthorised modification:

```sql
-- Audit trigger: log all changes to sensitive tables
CREATE OR REPLACE FUNCTION audit_personal_data_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (table_name, operation, old_data, new_data, changed_by, changed_at)
  VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), row_to_json(NEW), current_user, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_users_changes
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION audit_personal_data_changes();
```

**Availability** — Point-in-time recovery, automated backups with encrypted backup storage.

### 4. Regular Testing and Assessment

Article 32(1)(d) requires "a process for regularly testing, assessing and evaluating the effectiveness of technical and organisational measures." For databases this means:

- **Quarterly vulnerability scans** of database instances
- **Annual penetration testing** targeting database access paths
- **Automated PII discovery scans** after schema changes (to catch new personal data accumulation)
- **Access review logs** — who queried personal data tables in the past 90 days?

---

## Record of Processing Activities (Article 30)

Article 30 requires organisations to maintain a written record of all processing activities involving personal data. For each database table containing personal data, document:

| Field | Example |
|---|---|
| Table name | `users` |
| Processing purpose | User authentication and account management |
| Categories of personal data | Name, email, phone number, date of birth |
| Legal basis | Contract (Article 6(1)(b)) |
| Recipients | Internal engineering team, payment processor |
| Retention period | Active accounts + 2 years post-deletion |
| Security measures | AES-256 encryption, RLS, TLS in transit |

The Nexus Data Privacy Platform can automatically generate a draft Record of Processing Activities by scanning your connected databases and cataloguing all discovered PII by table and column.

---

## Data Subject Rights and Database Design

GDPR gives individuals rights that have direct database implications:

| Right | Article | Database Implementation |
|---|---|---|
| Right of Access | 15 | Export all data for a given user ID across all tables |
| Right to Rectification | 16 | Allow updates to personal data fields |
| Right to Erasure ("Right to be Forgotten") | 17 | Delete or anonymise all records linked to a user ID |
| Right to Data Portability | 20 | Export data in machine-readable format (JSON/CSV) |
| Right to Restrict Processing | 18 | Flag records as restricted; exclude from processing jobs |

Implementing these rights requires knowing where personal data lives — which is exactly what a PII scan provides.

---

## Frequently Asked Questions

**Q: Does GDPR apply to databases outside the EU?**
A: Yes. GDPR applies to any organisation that processes personal data of EU residents, regardless of where the organisation or database is located.

**Q: Is anonymised data exempt from GDPR?**
A: Truly anonymised data — where re-identification is impossible — is exempt. However, pseudonymised data (re-identification possible with a separate key) is still subject to GDPR.

**Q: Do backups need to be encrypted under GDPR?**
A: Yes. Backups contain the same personal data as production systems and must have equivalent protection, including encryption at rest.

**Q: What is the difference between a data controller and data processor?**
A: The controller determines the purposes and means of processing (usually your organisation). The processor processes data on behalf of the controller (your database vendor, cloud provider). Both have obligations under GDPR.

**Q: How long can we retain personal data?**
A: GDPR does not specify fixed retention periods. Data must be kept no longer than necessary for the purpose for which it was collected. You must define retention periods based on your specific purposes and legal obligations.

---

## Next Steps

The [Nexus Data Privacy Platform](/en/database-privacy) provides a free GDPR compliance dashboard that:

- Scans your database for personal data and maps it to GDPR categories
- Tracks compliance checkpoints for Articles 25, 30, and 32
- Applies masking rules to protect PII in non-production environments
- Generates audit-ready reports for Data Protection Officers

Start your free GDPR compliance scan today — no data leaves your browser.
