---
metaTitle: "PDF Metadata Editor — Edit or Strip Properties Locally"
metaDescription: "Edit Title, Author, Keywords, BCP 47 language, and custom PDF properties or scrub hidden XMP streams in Privacy Mode. Batch process files locally."
metaKeywords: "PDF metadata editor, edit PDF metadata, remove PDF metadata, strip PDF properties, clean PDF metadata, PDF privacy cleaner, PDF custom metadata, bulk edit PDF metadata, PDF XMP metadata editor"
title: "PDF Metadata Editor"
shortDescription: "Modify standard PDF properties, author UTF-8 custom fields, apply reusable templates, or wipe sensitive timestamps and XMP streams completely locally in your browser."
faqs:
  - question: "Why do deleted Author or Creator values sometimes remain visible inside a PDF after editing in other apps?"
    answer: "Many desktop PDF editors save modifications as incremental updates appended after the original %%EOF marker, leaving prior /Info objects intact in earlier byte ranges of the file. Performing a full binary re-serialization with Privacy Mode replaces the trailer and removes the Catalog /Metadata XMP stream rather than appending a patch."
  - question: "What exactly does Privacy Mode remove when sanitizing a PDF?"
    answer: "Privacy Mode clears Author, Creator, Producer, deletes both CreationDate and ModDate keys from the /Info dictionary, removes all custom properties, and deletes the Catalog's /Metadata XML XMP stream so software versions, local usernames, and editing histories are stripped from the exported file."
  - question: "Will stripping XMP metadata affect PDF/A archival compliance?"
    answer: "Yes. ISO 19005 (PDF/A-1, PDF/A-2, and PDF/A-3) strictly requires a valid XMP /Metadata stream synchronized with document properties. Use Privacy Mode for anonymous public distribution, but avoid deleting the XMP stream when preserving certified PDF/A archival validity."
  - question: "How are international characters and custom metadata keys stored inside the PDF binary?"
    answer: "Custom key-value pairs (such as DocumentID, Department, or Bates prefixes) are written into the /Info dictionary using UTF-16BE hexadecimal strings via PDFHexString.fromText(), preserving accented Latin, Cyrillic, Arabic, and CJK text without mojibake across Windows, macOS, and Linux viewers."
  - question: "Can I apply standardized corporate metadata across dozens of PDFs at once?"
    answer: "Yes. Upload multiple PDFs into the batch queue, configure or load a saved metadata template stored in your browser's LocalStorage, verify changes in the live before-and-after diff panel, and export every updated document together as a single ZIP archive."
features:
  - "Full editing of standard /Info properties (Title, Author, Subject, Keywords, Creator, Producer) plus Creation and Modification dates"
  - "BCP 47 Catalog /Lang selector supporting 13+ language locales to improve screen-reader pronunciation and SEO indexing"
  - "Custom property editor with UTF-16BE hex encoding and one-click presets (DocumentID, Department, ProjectName, SecurityClass)"
  - "One-click Privacy Mode that purges Author, Creator, Producer, timestamps, custom keys, and the Catalog /Metadata XMP packet"
  - "Reusable LocalStorage metadata templates and batch multi-PDF processing with automatic JSZip archive download"
  - "Live before-and-after comparison view plus local decryption for password-protected PDFs with zero server uploads"
useCases:
  - "Anonymizing whistleblower submissions, blind academic peer-review manuscripts, and public RFP responses before external release"
  - "Standardizing Title, Keywords, Author, and BCP 47 language tags across marketing whitepapers for stronger Google PDF indexing"
  - "Tagging litigation productions with custom CaseNumber, BatesRange, and SecurityClass properties across batches of court exhibits"
  - "Removing macOS Quartz, Microsoft Word version strings, and local user accounts leaked by office export pipelines"
  - "Reusing saved corporate publishing templates so every quarterly financial report carries identical brand attribution"
  - "Cleaning timestamps and custom CRM properties from exported client invoices without installing paid desktop software"
howToSteps:
  - "Drop one or more PDF documents into the editor workspace and unlock any password-protected files locally if prompted."
  - "Inspect the parsed current values for Title, Author, Subject, Keywords, dates, language tag, and custom properties."
  - "Edit fields directly, select a saved metadata template, or add custom key-value pairs using the preset dropdown."
  - "Click Privacy Mode if your goal is complete anonymization—clearing identity fields, deleting date keys, and stripping XMP."
  - "Verify every modification in the live before-and-after comparison panel to catch typos or unwanted residual keys."
  - "Click Export PDF to re-serialize clean binary bytes locally and download the _updated.pdf file or batch ZIP archive."
---

Controlling what a PDF reveals about its origin is just as important as controlling what appears on its pages. Publishing teams need accurate `Title`, `Keywords`, and BCP 47 language tags so search engines index whitepapers properly and assistive screen readers pick the right pronunciation rules. Conversely, legal counsel, journalists, and security engineers frequently need the exact opposite—wiping every trace of employee usernames, workstation software builds, revision dates, and embedded XMP revision lineages before a file leaves the organization. NexusCalculator's **PDF Metadata Editor** handles both workflows directly inside your browser via `pdf-lib` full-object re-serialization, giving you surgical control over standard properties, UTF-16BE custom fields, reusable templates, and one-click Privacy Mode scrubbing without transmitting sensitive files to third-party servers.

## Eliminating Metadata Ghosting: Full Rewrites vs. Incremental Updates

A surprisingly common privacy failure occurs when users clear the "Author" field in a desktop PDF reader and hit **Save**. Under ISO 32000 §7.5.6, many applications default to **Incremental Updates**: rather than rewriting the binary file from scratch, they append a new `/Info` object, a delta `xref` subsection, and a second `%%EOF` marker onto the end of the file. Viewers display the blank new field, yet the original author's full name and corporate directory path remain sitting in plain ASCII bytes halfway up the file—trivially recoverable with `strings` or any hex viewer.

Our browser editor avoids incremental ghosting by parsing the document into an in-memory object graph, mutating the `/Info` dictionary and root `/Catalog` nodes directly, deleting cleared date keys (`CreationDate`, `ModDate`) and obsolete custom keys, and compiling a fresh non-incremental byte stream with `pdfDoc.save()`. When **Privacy Mode** is enabled, the engine additionally deletes the root catalog's `/Metadata` reference (`pdfDoc.catalog.delete(PDFName.of('Metadata'))`), ensuring orphaned XML XMP packets are unlinked and excluded from the re-serialized PDF output.

## Field Encoding Reference and Privacy Mode Sanitization Scope

Understanding how each metadata field maps onto low-level PDF objects prevents unexpected viewer behavior—especially when switching between enrichment workflows and strict anonymization:

| Property / Container | PDF Spec Location | Binary Encoding Strategy | Standard Edit Mode | One-Click Privacy Mode |
| :--- | :--- | :--- | :--- | :--- |
| **`/Title` & `/Subject`** | Trailer `/Info` Dict | `PDFString` / UTF-16BE `PDFHexString` | Writable; boosts SERP & tab display | Preserved or manually clearable |
| **`/Author`, `/Creator`, `/Producer`** | Trailer `/Info` Dict | `PDFString` / UTF-16BE `PDFHexString` | Editable for brand attribution | Cleared to empty strings `""` |
| **`/Keywords`** | Trailer `/Info` Dict | Tokenized array joined cleanly | Add/remove individual keyword chips | Editable or clearable |
| **`/CreationDate` & `/ModDate`** | Trailer `/Info` Dict | `D:YYYYMMDDHHmmSSOHH'mm'` | Editable via date picker | Keys completely deleted via `infoDict.delete()` |
| **`/Lang` (Locale)** | Catalog `/Root` | BCP 47 code (e.g., `en-US`, `fr`, `ja`) | Selectable across 13+ locales | Deleted if left unspecified |
| **Custom Key-Value Pairs** | Trailer `/Info` Dict | `PDFHexString.fromText()` (full UTF-8/16) | Custom keys + 8 corporate presets | All non-standard keys purged |
| **XMP XML Stream** | Catalog `/Metadata` | RDF/XML inside `<?xpacket?>` | Retained when not sanitizing | Deleted from Catalog before full save |

If you want to audit an incoming document's full security bitmask, embedded font list, and Privacy Risk Score before deciding what to modify, open it first in [PDF Metadata Viewer](/en/tools/pdf-metadata-viewer).

## Scaling Document Tagging with Reusable Templates and Batch ZIP Exports

Manual field-by-field editing breaks down quickly when preparing 30 quarterly filings, product datasheets, or e-discovery exhibits. To eliminate repetitive typing without creating cloud accounts, the editor persists named **Metadata Templates** in your browser's `localStorage` (pre-seeded with *Anonymous / Clean Properties* and *Corporate Standard Template*).

Custom properties use clean alphanumeric keys—presets include `DocumentID`, `Department`, `ProjectName`, `Company`, `Version`, `ReferenceNumber`, `SecurityClass`, and `AuthorOrg`—written directly as UTF-16BE hex strings so non-ASCII corporate names or regional classifications render faithfully across platforms:

```text
% Serialized custom properties written into trailer /Info object
19 0 obj
<<
  /Title (Q4 2026 Compliance Audit)
  /Author (Nexus Legal Operations)
  /Keywords (audit, compliance, SOC2, 2026)
  /DocumentID <FEFF004E0058002D0032003000320036002D003000390034>
  /SecurityClass <FEFF0043006F006E0066006900640065006E007400690061006C>
>>
endobj
```

When multiple PDFs are loaded into the session, every ready file compiles locally in sequence and exports either individually (`<name>_updated.pdf`) or bundled via JSZip. For documents that also carry interactive reviewer comments or fillable fields alongside hidden metadata, pair sanitization with [Flatten PDF](/en/tools/flatten-pdf)—and if you build PDFs from camera photos or scanned graphics, strip GPS and camera EXIF tags upfront using [Image Metadata Remover](/en/tools/image-metadata-remover).

## Archival Constraints (PDF/A) and Post-Scrub Verification

Before deploying metadata cleanup in regulated environments, account for two specification boundaries:

- **PDF/A Conformance (ISO 19005)**: Long-term archival standards PDF/A-1, PDF/A-2, and PDF/A-3 mandate an embedded XMP `/Metadata` stream whose `dc:title`, `dc:creator`, and `pdf:Producer` values match the `/Info` dictionary (and PDF/A-2/3 require XMP extension schemas for custom attributes). Deleting `/Metadata` via Privacy Mode produces a clean, valid ISO 32000 PDF ideal for public sharing, but intentionally breaks strict PDF/A validation—so skip Privacy Mode on legally mandated archival masters.
- **Cryptographic Signatures**: Modifying `/Info` or rewriting the trailer alters byte offsets and invalidates existing PKCS#7 digital signatures. Always finalize metadata before signing.

For high-assurance operational security releases, verify your exported PDF locally from the terminal to confirm zero leftover strings or XMP packets survived:

```bash
# Confirm no residual XMP packet or author strings remain in raw bytes
exiftool -a -G1 -s document_updated.pdf
strings document_updated.pdf | grep -iE "xpacket|CreatorTool|Microsoft|Quartz"

# Optional linearization pass for fast web view after metadata edits
qpdf --linearize document_updated.pdf document_final.pdf
```

Combining a full client-side binary rewrite with quick post-export inspection ensures every document leaves your organization carrying only the exact attribution—or complete anonymity—you intended.
