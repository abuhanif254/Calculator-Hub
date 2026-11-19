---
metaTitle: "PDF Metadata Viewer — Inspect Properties & Security Locally"
metaDescription: "Inspect PDF Info fields, XMP presence, encryption permissions, fonts, and page sizes locally. Score privacy risks, diff files, and export reports."
metaKeywords: "PDF metadata viewer, view PDF metadata, PDF metadata inspector, PDF properties viewer, inspect PDF properties, check PDF security, PDF metadata analyzer, detect hidden metadata PDF, PDF custom properties"
title: "PDF Metadata Viewer"
shortDescription: "Audit PDF Info dictionaries, XMP flags, encryption ciphers, permission bitmasks, embedded fonts, and page dimensions in read-only mode directly inside your browser."
faqs:
  - question: "What is the difference between the Creator and Producer fields in a PDF?"
    answer: "Creator identifies the authoring application that drafted the source document—such as Microsoft Word, Adobe InDesign, or LaTeX—whereas Producer identifies the PDF rendering library or virtual printer that serialized the binary PDF stream, such as macOS Quartz PDFContext, Adobe PDF Library, or pdf-lib."
  - question: "How does this viewer calculate the Privacy Risk Score and Document Health Score?"
    answer: "The Privacy Risk Score audits whether personally identifying or environment-leaking fields (Author usernames, Creator/Producer build strings, timestamps, custom properties, and XMP streams) are exposed. The Document Health Score evaluates search and accessibility readiness by checking for a populated Title, Subject, Keywords, and Catalog /Lang tag."
  - question: "Does inspecting a PDF in this viewer alter its timestamps, hashes, or binary structure?"
    answer: "No. PDF Metadata Viewer performs strictly read-only parsing of the file's ArrayBuffer inside browser RAM. It never writes back to your disk or re-serializes the document, so SHA-256 checksums, digital signatures, and modification dates on your local file remain untouched."
  - question: "How can I check whether a PDF restricts printing, editing, or copying text?"
    answer: "Open the document and inspect the Security section. The parser reads the trailer's /Encrypt dictionary to identify the cipher version (/V 1 through 5, spanning RC4-40 up to AES-256) and decodes the 32-bit signed /P permission bitmask for Printing (Bit 3), Modifying (Bit 4), and Copying (Bit 5)."
  - question: "Why do embedded font names start with six random uppercase letters followed by a plus sign?"
    answer: "Prefixes like BCDGEE+HelveticaNeue indicate font subsetting under ISO 32000. Rather than embedding an entire multi-megabyte font family, the PDF generator embeds only the glyphs used in the document and prepends a random six-letter tag to prevent name collisions when PDFs are merged."
features:
  - "Read-only extraction of trailer /Info fields, custom key-value pairs, trailer /ID fingerprints, Catalog /Lang, and XMP stream presence"
  - "Encryption dictionary analyzer decoding /V cipher algorithms (RC4-40, RC4-128, AES-128, AES-256) and /P permission bitflags"
  - "Embedded font inventory via PDF.js operator-list scanning (OPS.setFont) plus bookmark outline tree inspection"
  - "Multi-unit page geometry calculator converting 72 pt/in MediaBox dimensions to inches, millimeters, orientation, and ISO/ANSI sizes"
  - "Automated Privacy Risk Score, SEO/Accessibility Health Score, and two-file side-by-side Metadata Comparison Mode"
  - "One-click audit report exports in JSON, CSV, plain TXT, and printable PDF formats with zero server uploads"
useCases:
  - "Pre-publication OSINT audits checking whether leaked employee usernames, macOS build numbers, or internal paths lurk in public whitepapers"
  - "Verifying client contract encryption ciphers and permission flags before ingesting files into automated processing pipelines"
  - "Diffing two revisions of a legal exhibit or financial filing side-by-side to spot tampered Producer strings or timestamp anomalies"
  - "Confirming font embedding and ISO A4 versus US Letter MediaBox dimensions prior to submitting manuscripts to print publishers"
  - "Checking corporate SEO and WCAG accessibility readiness by verifying Title, Keywords, and BCP 47 /Lang tags across reports"
  - "Generating structured JSON or CSV metadata inventories for compliance logs and e-discovery intake folders"
howToSteps:
  - "Drag and drop one or multiple PDF files into the local workspace (supply the password if prompted for an encrypted file)."
  - "Review the Dashboard overview displaying PDF version, page count, file size, Privacy Risk Score, and Document Health Score."
  - "Switch to the Properties tab to inspect standard /Info entries, custom dictionary fields, and filter keys via the search bar."
  - "Open the Advanced tab to verify Catalog XMP presence, trailer /ID hashes, embedded font names, outline bookmarks, and page dimensions."
  - "Load a second PDF and open the Comparison tab to highlight field-by-field differences between two versions."
  - "Export the full forensic inspection report as JSON, CSV, TXT, or a printable PDF summary."
---

Every PDF distributed over email, uploaded to an investor portal, or published on a corporate website carries an invisible forensic dossier alongside its visible pages. Inside the file's trailer, root catalog, and resource dictionaries sit software build strings, local account usernames, cryptographic cipher flags, embedded font subsets, and unique document lineage IDs. Operating system file explorers such as Windows Properties or macOS Finder expose only a fraction of those keys—and frequently display stale cached values. NexusCalculator's **PDF Metadata Viewer** parses the raw binary directly inside your browser in strict read-only mode, giving security analysts, publishers, and legal teams complete visibility into both legacy and modern metadata containers without uploading confidential files anywhere.

## Dual Metadata Containers: Trailer /Info vs. XMP Packets

ISO 32000 permits PDF producers to store descriptive metadata in two independent structures simultaneously, which is why superficial viewers often miss hidden disclosures:

1. **Legacy Document Information Dictionary (`/Info`)**: Referenced directly from the file's `trailer` dictionary (for example `/Info 7 0 R`), this flat dictionary holds standard keys (`/Title`, `/Author`, `/Subject`, `/Keywords`, `/Creator`, `/Producer`, `/CreationDate`, `/ModDate`, `/Trapped`) plus arbitrary custom keys added by enterprise software. Strings appear as literal parentheses `(...)` in PDFDocEncoding or UTF-16BE hexadecimal strings `<FEFF...>` with a byte-order mark, while timestamps follow the strict `D:YYYYMMDDHHmmSSOHH'mm'` grammar.
2. **Extensible Metadata Platform (`/Metadata` XMP Stream)**: Introduced in PDF 1.4 and mandated for PDF/A archiving, XMP attaches an uncompressed UTF-8 XML/RDF stream to the root `/Catalog` wrapped in `<?xpacket ...?>` markers. Namespaces such as Dublin Core (`dc:creator`), XMP Basic (`xmp:CreatorTool`), Adobe PDF (`pdf:Producer`), and Media Management (`xmpMM:DocumentID`, `xmpMM:InstanceID`) can retain editing lineages and network template paths even after someone clears the `/Info` dictionary.

Beyond those two containers, our inspector reads two additional structural fingerprints that most basic viewers ignore: the catalog's `/Lang` entry (a BCP 47 tag like `en-US` essential for screen readers) and the trailer's `/ID` array—two 16-byte MD5 hex digests representing the document's permanent birth ID and its latest revision instance ID. If inspection reveals sensitive provenance tags you need to scrub or correct, open the file next in [PDF Metadata Editor](/en/tools/pdf-metadata-editor).

## Decoding Encryption Headers and Permission Bitflags

When a PDF carries password protection or usage restrictions, the trailer references an `/Encrypt` dictionary defining the cryptographic algorithm and a 32-bit signed integer `/P` bitmask governing viewer permissions (ISO 32000-1 Table 22). Note that PDF permission bits use **1-based bit numbering** in the specification, meaning Bit 3 corresponds to `1 << 2` in zero-indexed bitwise operations:

| Security Field / Bit | Raw PDF Value | Decoded Meaning | Practical Impact for Users & Pipelines |
| :--- | :--- | :--- | :--- |
| **`/V = 1`** | Standard V1 | RC4 (40-bit) cipher | Obsolete legacy encryption; trivially breakable |
| **`/V = 2`** | Standard V2 | RC4 (128-bit) cipher | Legacy PDF 1.4 compatibility; weak by modern standards |
| **`/V = 4`** | Standard V4 | RC4 or AES-128 (`/CFM /AESV2`) | Widely supported mid-tier document security |
| **`/V = 5`** | Standard V5 | AES-256 (`/CFM /AESV3`, R5/R6) | Current ISO 32000-2 enterprise encryption standard |
| **`/P` Bit 3 (`& 4`)** | `0` vs `1` | Print permission flag | Determines whether compliant viewers allow printing |
| **`/P` Bit 4 (`& 8`)** | `0` vs `1` | Content modification flag | Governs editing pages, forms, or metadata in strict readers |
| **`/P` Bit 5 (`& 16`)** | `0` vs `1` | Text & graphics extraction flag | Controls clipboard copy-paste and extraction permissions |

```text
% Example trailer /Encrypt dictionary inspected locally
12 0 obj
<<
  /Filter /Standard
  /V 5 /R 6 /Length 256
  /P -1852          % Binary ...100011000100 -> Bit 3 (Print)=1, Bit 4 (Modify)=0, Bit 5 (Copy)=0
>>
endobj
```

Remember that when a PDF sets an **owner password** with an empty user password, compliant readers honor the `/P` flags voluntarily, whereas inspecting or decrypting a **user-password** locked file requires entering the password—handled entirely locally via `@pdfsmaller/pdf-decrypt`.

## Font Subsets, MediaBox Geometry, and Side-by-Side Diffs

Metadata audits frequently extend beyond text labels into typographic and print-production telemetry. By combining `pdf-lib` dictionary inspection with `pdfjs-dist` page operator traversal, the viewer extracts three technical diagnostics automatically:

- **Embedded Font Discovery**: Iterates across page operator lists looking for `OPS.setFont` instructions and inspects `page.commonObjs` to enumerate loaded font names across the initial pages—making it immediate to spot missing embeddings or six-letter subset prefixes such as `QXLMNP+Inter-Bold`.
- **Page Dimension Normalization**: Reads each page's viewport size in PostScript points (`1 in = 72 pt`, `1 mm = 72 / 25.4 pt`), computes portrait vs. landscape orientation, and classifies standard sheets (`612 × 792 pt` = US Letter, `595 × 842 pt` = ISO A4, `612 × 1008 pt` = Legal, `842 × 1191 pt` = A3, `792 × 1224 pt` = Tabloid) within a ±10 pt tolerance.
- **Two-File Comparison Mode**: Load two PDFs into the same session and switch to **Comparison** to place every standard property, custom field, security setting, and technical metric side-by-side—ideal for verifying whether a vendor altered a contract or whether a sanitization pass succeeded.

If your privacy audit also uncovers visible confidential content on the page itself, follow up with [Redact PDF](/en/tools/redact-pdf), or inspect standalone source photographs with [Image Metadata Viewer](/en/tools/image-metadata-viewer) before embedding them into reports.

## Cross-Checking Browser Audits with Desktop CLI Tools

Every audit displayed in the browser can be downloaded directly as machine-readable **JSON**, spreadsheet-ready **CSV**, plain **TXT**, or a printable **PDF Report** for compliance tickets. Security engineers working inside terminal or CI/CD workflows can reproduce the exact same inspection checks locally with Poppler and ExifTool:

```bash
# Inspect standard /Info fields, PDF version, encryption, and page size
pdfinfo -meta -isodates audit_target.pdf

# List every embedded or unembedded font and subset status
pdffonts audit_target.pdf

# Dump both /Info and raw XMP namespaces with group labels
exiftool -a -G1 -s audit_target.pdf
```

Keeping inspection local—whether in a browser sandbox or via workstation CLI utilities—guarantees that sensitive draft documents are never exposed to external telemetry while verifying every byte of hidden provenance.
