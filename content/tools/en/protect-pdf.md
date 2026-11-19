---
metaTitle: "Protect PDF with AES-256 Password Encryption | Free Online"
metaDescription: "Encrypt PDF files with AES-256 or RC4 passwords and granular print, copy, and edit restrictions. Fast 100% client-side locking with zero uploads."
metaKeywords: "protect pdf, password protect pdf, encrypt pdf, secure pdf, lock pdf, pdf security, pdf privacy, pdf encryption, aes-256 pdf encryption, pdf permission restrictions, confidential files, online pdf protection"
title: "Protect PDF"
shortDescription: "Encrypt PDF documents locally with AES-256 or RC4 passwords and granular owner permission controls, keeping confidential files entirely inside your browser."
faqs:
  - question: "What is the difference between a User Password and an Owner Password in a PDF?"
    answer: "A User Password (open password) encrypts the file so readers cannot view the document without typing the secret key. An Owner Password (permissions password) controls the 32-bit PDF permission flags for printing, copying text, modifying pages, or annotating; if set alone, viewers open the file without a prompt but enforce the restricted capabilities."
  - question: "Should I select AES-256 or RC4 encryption when locking a PDF?"
    answer: "Choose AES-256 (PDF 2.0 / ISO 32000-2 Revision 6) for virtually all modern documents. AES-256 combines a 256-bit symmetric cipher with hardened SHA-256/384/512 key derivation, whereas legacy RC4-128 relies on MD5 key schedules with known cryptographic weaknesses and should only be used for archaic viewers that cannot parse PDF 1.7 ExtensionLevel 3 or PDF 2.0."
  - question: "Why does the tool reject a PDF that is already password-protected?"
    answer: "ISO 32000 forbids stacking a second encryption dictionary on top of already encrypted object streams. If your source document already carries an Encrypt trailer dictionary, you must strip the existing protection first with an authorized decryption pass before applying new ciphers or updated permission flags."
  - question: "Can someone bypass PDF print or copy restrictions if I only set an Owner Password?"
    answer: "Yes, in non-compliant tools. When no User Password is set, the File Encryption Key is derived from an empty string so any viewer can decrypt the streams to render the pages; permission flags rely on viewer compliance. For strict confidentiality against extraction, always assign a high-entropy User Password alongside your Owner Password."
  - question: "Do my confidential PDFs or passwords leave my computer during encryption?"
    answer: "No. File parsing, Web Crypto random password generation, and AES-256/RC4 stream encryption all run inside your browser tab's memory. Neither the source PDF bytes nor the derived encryption keys are ever uploaded to a remote server."
features:
  - "ISO 32000-2 AES-256 and legacy RC4-128 encryption selection per batch"
  - "Dual User (open) and Owner (permissions) password configuration with automatic owner-key generation"
  - "Granular 7-flag permission controls covering printing, high-resolution print, copying, editing, annotations, forms, and page assembly"
  - "One-click security presets for Basic, Business, Maximum, and Custom restriction profiles"
  - "Built-in CSPRNG password generator using window.crypto.getRandomValues with real-time Shannon entropy meter"
  - "Multi-file batch encryption with individual PDF downloads or bundled ZIP archive export"
useCases:
  - "Locking quarterly financial statements and M&A term sheets with AES-256 open passwords prior to email or virtual data room distribution"
  - "Issuing legal contracts and NDAs that permit commenting and form filling while blocking structural page edits and text extraction"
  - "Securing employee payroll stubs, W-2 forms, and HR onboarding packets in batches before archiving or portal delivery"
  - "Distributing proprietary engineering schematics and intellectual property briefs with printing disabled to curb casual hard-copy leaks"
  - "Protecting medical intake reports and client tax returns locally in compliance-sensitive environments where cloud PDF uploads are prohibited"
  - "Preparing read-only courseware, audit workpapers, and board decks with automated high-entropy owner credentials"
howToSteps:
  - "Drop one or more unencrypted PDF files into the upload area or select them from your local drive."
  - "Choose AES-256 for modern security or RC4 for legacy compatibility in the encryption algorithm panel."
  - "Enter a User Password to require a login prompt when opening the file, or click the built-in generator to create a high-entropy key."
  - "Select a security preset (Basic, Business, or Maximum) or toggle individual permission switches for printing, copying, editing, forms, and assembly."
  - "Optionally specify a custom Owner Password to lock down permission changes independently of the open password."
  - "Click Protect PDF to encrypt every queued file in your browser and download the output individually or as a single ZIP bundle."
---

Securing sensitive Portable Document Format files requires more than hiding a link behind an email attachment. Standard PDF encryption operates directly on the binary object graph of the file, scrambling individual content streams, embedded strings, and font payloads before any viewer can decode a single glyph. NexusCalculator's **Protect PDF** utility applies ISO-compliant cryptographic wrappers and fine-grained usage permissions directly inside your browser memory, eliminating the security contradiction of uploading confidential contracts to a third-party server just to lock them.

## Inside the ISO 32000-2 Encryption Dictionary

When you encrypt a PDF, the underlying structure described in **ISO 32000-2 (PDF 2.0)** inserts an indirect `/Encrypt` dictionary referenced from the file trailer alongside a unique document `/ID` array. Rather than encrypting the entire file as one opaque blob—which would break incremental cross-reference (`xref`) lookups and byte-range streaming—the Standard Security Handler encrypts every string and stream object individually (excluding the `/Encrypt` dictionary itself and, optionally, unencrypted XMP metadata streams).

Under **AES-256 (V=5, R=6)**, the encoder generates a random 32-byte **File Encryption Key (FEK)**. Each encrypted stream receives a unique 16-byte Initialization Vector (IV) prepended to the ciphertext and is encrypted with AES-256-CBC and PKCS#7 padding. The FEK is wrapped twice via Algorithm 2.A—an iterative key-derivation loop combining SHA-256, SHA-384, SHA-512, and AES-128-CBC rounds—producing the `/UE` and `/OE` dictionary entries. Because the FEK is wrapped independently for both secrets, either password unlocks the identical streams without re-encrypting the document body.

## AES-256 (R6) vs. Legacy RC4-128: Cryptographic Comparison

| Specification | PDF Standard | Cipher & Mode | Key Derivation | Minimum Viewer Support | Security Posture |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **V=1, R=2 (RC4-40)** | PDF 1.1 | 40-bit RC4 | MD5 (1 pass) | Acrobat 3.0+ | **Broken** — trivial brute-force recovery |
| **V=2, R=3 (RC4-128)** | PDF 1.4 | 128-bit RC4 | MD5 (50 iterations) | Acrobat 5.0+, legacy readers | **Legacy only** — weak against GPU cracking |
| **V=4, R=4 (AES-128)** | PDF 1.6 | 128-bit AES-CBC | MD5 (50 iterations) | Acrobat 7.0+ | **Transitional** — fast MD5 key schedule |
| **V=5, R=6 (AES-256)** | PDF 2.0 (ISO 32000-2) | 256-bit AES-CBC | Algorithm 2.A (SHA-2 + AES loop) | Acrobat X+, Chrome, Edge, Safari, PDF.js | **Recommended** — resists offline GPU cracking |

Keep **AES-256** enabled unless a legacy ingestion pipeline strictly requires PDF 1.4 headers.

## Dual-Password Architecture: User vs. Owner Keys

PDF encryption separates two secrets governing distinct threat models:

- **User Password (Open Password):** Required to unwrap the File Encryption Key and render pages. Without it, `FlateDecode` streams, embedded images, and text operators remain indistinguishable from random noise.
- **Owner Password (Permissions Password):** Grants administrative authority over security settings and enforces the `/P` bitmask whenever a reader opens the document with the User Password or no open password.

### Entropy and Browser-Native CSPRNG Key Generation

Even AES-256 cannot defend a short dictionary word against offline guessing. The built-in generator avoids `Math.random()` and draws uniform integers from `window.crypto.getRandomValues()`, shuffling mandatory character classes before computing Shannon entropy as $H = L \times \log_2(N)$, where $L$ is length and $N$ is the active symbol pool (up to 94 printable ASCII characters). A 16-character mixed-charset key yields ~105 bits of entropy. For standalone passphrases across external vaults, use the [Strong Password Generator](/en/tools/strong-password-generator).

## Permission Bitmask Mechanics (`/P` Flags)

Usage restrictions live in the signed 32-bit `/P` integer inside `/Encrypt`, where 1-indexed bits grant or deny capabilities across the Basic, Business, Maximum, and Custom presets:

- **Bit 3 (`0x0004`)**: Low-resolution printing (150 DPI raster output).
- **Bit 4 (`0x0008`)**: Document modification outside annotations and form fields.
- **Bit 5 (`0x0010`)**: Copying or extracting text and graphics.
- **Bit 6 (`0x0020`)**: Adding annotations and filling AcroForm fields.
- **Bit 9 (`0x0100`)**: Filling existing form fields independently of Bit 6.
- **Bit 11 (`0x0400`)**: Document assembly (inserting, rotating, or deleting pages).
- **Bit 12 (`0x0800`)**: High-resolution printing when Bit 3 is also enabled.

After downloading `_protected.pdf` (or `protected_pdfs.zip` when locking a multi-file batch), security teams can audit the cryptographic handler, key length, and `/P` flag state locally using `qpdf`:

```bash
qpdf --show-encryption contract_protected.pdf
# Expected output highlights:
# R = 6
# P = -3904
# User password = (non-empty)
# extract for accessibility: allowed
# extract for any purpose: not allowed
# print low resolution: not allowed
# print high resolution: not allowed
# modify document assembly: not allowed
# modify forms: allowed
# stream encryption method: AESv3 (256-bit)
```

### Mapping Security Presets to Real-World Workflows

Rather than forcing every author to calculate bitmasks manually, the interface maps four presets onto combinations of `/P` flags and automated owner credentials:

- **Basic:** Requires only the open password while leaving printing, copying, annotating, and editing enabled for trusted recipients.
- **Business:** Disables printing, text extraction, structural modification, and page assembly while keeping **Annotations** and **Form Filling** active—ideal for interactive contract redlines and client intake packets—and automatically generates a 12-character alphanumeric Owner Password if none is entered.
- **Maximum:** Clears all seven operational permission flags and auto-provisions a 16-character full-symbol Owner Password to lock the container down to strict read-only viewing.
- **Custom:** Activates automatically whenever you toggle any individual capability switch.

## Operational Constraints and Edge Cases

Understanding where PDF encryption ends prevents risky compliance assumptions:

1. **Already Encrypted Input Files:** The browser-side parser validates incoming files using strict decryption checks and halts if a file already contains an `/Encrypt` trailer entry. To rotate credentials or upgrade an older RC4 file to AES-256, strip existing protection first via [Unlock PDF](/en/tools/unlock-pdf), then re-encrypt the clean binary.
2. **Owner-Only Locks Are Advisory:** Leaving the User Password blank lets non-compliant utilities derive the File Encryption Key from an empty string and strip `/P` flags. Always assign a strong User Password whenever confidentiality matters.
3. **Encryption Does Not Sanitize Hidden Content:** Locking controls who can open the container, not what resides inside it once opened. Permanently destroy sensitive text, images, and XMP metadata beforehand with [Redact PDF](/en/tools/redact-pdf).
4. **PDF/A Archival Conflicts:** ISO 19005 (PDF/A-1, PDF/A-2, and PDF/A-3) forbids encryption because long-term archival readability cannot rely on key custody. Store unencrypted archival masters separately from encrypted distribution copies.
