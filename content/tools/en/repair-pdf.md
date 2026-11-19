---
metaTitle: "Repair Corrupted PDF Online — Free Local Recovery Tool"
metaDescription: "Diagnose broken PDF headers, rebuild damaged XRef tables, or salvage raw text directly in your browser. Fast local recovery without file uploads."
metaKeywords: "repair PDF, fix PDF file, recover PDF, corrupted PDF repair, restore damaged PDF, PDF recovery tool, PDF error repair, broken PDF fix, rebuild PDF XRef, recover PDF pages"
title: "Repair PDF"
shortDescription: "Inspect broken PDF byte structures, reconstruct damaged cross-reference tables, and salvage readable text from corrupted documents completely locally in your browser."
faqs:
  - question: "Why does an interrupted download make an entire PDF unreadable even when 98% of the bytes arrived?"
    answer: "PDF readers parse documents backwards from the end of the file, looking for the %%EOF sentinel, the startxref byte offset, and the Cross-Reference (XRef) table. When a download truncates near the end, those trailer structures vanish, causing strict viewers like Adobe Acrobat to abort before displaying intact earlier pages."
  - question: "What is the difference between Structural Rebuild and Content Extraction recovery modes?"
    answer: "Structural Rebuild parses surviving indirect objects with pdf-lib and writes a fresh, spec-compliant XRef table and trailer so visual layout, fonts, and images return intact. Content Extraction uses PDF.js tolerant parsing as a fallback to pull raw text strings page-by-page when the catalog or object hierarchy is too damaged to reconstruct."
  - question: "Will repairing a corrupted PDF preserve its existing digital signatures?"
    answer: "No. Cryptographic PDF signatures hash exact byte ranges defined by the /ByteRange array. Rebuilding the cross-reference table and re-serializing indirect objects changes those byte offsets, which invalidates any prior cryptographic signature even when visual signature appearances remain visible."
  - question: "Why does the diagnostic report say Excellent even though my PDF viewer refuses to open the file?"
    answer: "A valid %PDF- header, startxref pointer, and %%EOF marker confirm that the outer framing is intact, meaning the open failure is likely caused by user-password encryption, an unsupported PDF 2.0 feature, or corruption inside a single compressed FlateDecode content stream rather than file truncation."
  - question: "Which kinds of PDF corruption are mathematically impossible to recover?"
    answer: "Zero-byte (0 KB) files contain no payload, and files overwritten with null bytes, random ransomware ciphertext, or corrupted AES-256 encryption dictionaries cannot be reconstructed because the original object streams and key-derivation metadata no longer exist."
features:
  - "Instant binary ArrayBuffer triage scanning %PDF- magic headers, startxref pointers, and %%EOF sentinels"
  - "Automated Health Score classification (Excellent, Recoverable, Severely Damaged) with specific error logs"
  - "Tier-1 structural XRef reconstruction via pdf-lib that re-indexes surviving objects and prunes broken orphans"
  - "Tier-2 deep content salvage via PDF.js tolerant parsing to rescue plain text when structural rebuild fails"
  - "Built-in live canvas preview to verify recovered page rendering before saving the repaired PDF"
  - "100% browser-sandboxed execution supporting local files up to 150 MB with zero remote uploads"
useCases:
  - "Rescuing large architectural drawings or annual reports truncated during flaky Wi-Fi or mobile downloads"
  - "Normalizing non-compliant PDFs exported by legacy ERP, CRM, or medical billing systems rejected by Adobe Acrobat"
  - "Fixing PDF email attachments whose byte offsets shifted after legacy MIME gateways altered line endings"
  - "Salvaging text content from damaged legal exhibits or archived invoices recovered from failing USB drives"
  - "Closing unfinalized scanner output files left without %%EOF markers after a sudden power loss"
  - "Pre-triaging unreadable client submissions locally to distinguish encryption locks from true file corruption"
howToSteps:
  - "Drag and drop the damaged PDF (up to 150 MB) into the workspace to load its raw bytes into browser memory."
  - "Review the instant Diagnostic Report showing file size, %PDF- header check, startxref status, %%EOF check, and Health Score."
  - "Run Structural Rebuild (Quick Repair) to re-parse surviving indirect objects and compile a fresh cross-reference table."
  - "Page through the built-in canvas preview to confirm that text, layout, and graphics rendered cleanly."
  - "Download the newly rebuilt PDF (saved with a _repaired suffix so your original file stays untouched)."
  - "If structural reconstruction fails due to severe catalog damage, switch to Content Extraction to salvage readable text per page."
---

A PDF file is far closer to a random-access binary database than a sequential document stream. Rather than reading top to bottom, compliant viewers jump straight to the tail of the file, locate an exact byte offset index, and seek directly to individual fonts, page dictionaries, and compressed graphics streams. Because of that architecture, losing a handful of trailing bytes or shifting a single newline during email transit can cause Adobe Acrobat, Chrome, or Preview to report a fatal corruption error even while 99% of the document's payload sits intact on disk. NexusCalculator's **Repair PDF** tool inspects the raw `ArrayBuffer` locally in your browser, diagnoses structural breaks, and executes a two-tier recovery pipeline without transmitting confidential files to external servers.

## Anatomy of a Broken PDF Byte Stream

Under ISO 32000-1 and ISO 32000-2, every valid PDF consists of four physical regions: a magic header (`%PDF-1.4` through `%PDF-2.0`), a body of numbered indirect objects (`N G obj ... endobj`), a Cross-Reference section (`xref` table or PDF 1.5+ compressed `/Type /XRef` stream), and a trailer ending with `%%EOF`.

```text
xref
0 6
0000000000 65535 f 
0000000015 00000 n 
0000000142 00000 n 
trailer
<< /Size 6 /Root 1 0 R /Info 5 0 R >>
startxref
48219
%%EOF
```

Each 20-byte entry in a traditional `xref` table records the exact 10-digit decimal byte offset of an indirect object from byte zero of the file, while `startxref` tells the parser the exact byte position where the `xref` keyword begins. When a legacy SMTP mail relay translates `CRLF` (`\r\n`) sequences into Unix `LF` (`\n`) inside an improperly MIME-encoded attachment, every subsequent byte offset drifts by one byte per stripped `\r`. The viewer seeks to byte `48219`, lands mid-stream instead of at `xref`, and throws an immediate parse error—such as Chrome's `Failed to load PDF document` or Acrobat's `Error 109` / `Root object is missing or invalid`.

## Common Corruption Signatures and Recovery Outcomes

Before rewriting anything, the browser diagnostic scanner reads the opening header bytes and trailing 1,024 bytes of the `Uint8Array` buffer to classify damage severity. Different failure causes produce distinct structural signatures and realistic recovery ceilings:

| Failure Mode | Typical Binary Symptom | Diagnostic Classification | Tier-1 Rebuild Outcome | Tier-2 Text Salvage |
| :--- | :--- | :--- | :--- | :--- |
| **Truncated HTTP/FTP Download** | Valid `%PDF-` header; missing `startxref` and `%%EOF` | `Recoverable` | Rebuilds intact prefix pages; trailing unreceived pages cannot be conjured | Recovers text from all fully downloaded content streams |
| **SMTP / ASCII-Mode FTP Corruption** | Valid markers present, but byte offsets shifted by CR/LF conversion | `Recoverable` / `Excellent` | High success: sequential object scan ignores broken offsets and writes new XRef | Full text recovery unless `FlateDecode` binary streams were altered |
| **Buggy ERP / Web-to-PDF Generator** | Invalid `/Length` stream keys, duplicate object IDs, or sloppy syntax | `Recoverable` | High success: re-serialization emits strict ISO 32000 object framing | Full text recovery |
| **Damaged `/Root` Catalog or Page Tree** | Header intact, but root `/Pages` tree or `FlateDecode` dictionary broken | `Severely Damaged` | Structural rebuild usually throws parse exception | Partial-to-full raw text extraction via tolerant PDF.js parser |
| **Corrupted Encryption Dictionary / 0 KB File** | Missing `%PDF-` header, 0 bytes, or damaged `/Encrypt` `/O` & `/U` keys | `Severely Damaged` | Unrecoverable (missing ciphertext or key derivation parameters) | Unrecoverable |

If the diagnostic panel grades a file `Excellent` yet viewers refuse to display it, verify whether the document is actually password-encrypted rather than structurally broken. You can inspect its encryption headers in [PDF Metadata Viewer](/en/tools/pdf-metadata-viewer) or remove known user/owner restrictions with [Unlock PDF](/en/tools/unlock-pdf).

## Structural Rebuild vs. Raw Text Salvage

NexusCalculator separates recovery into two deliberate passes so you never sacrifice formatting unnecessarily, yet still have an escape hatch for catastrophic failures:

1. **Tier 1 — Structural Rebuild (Quick Repair)**: Uses `pdf-lib` loaded with `ignoreEncryption: true` and `updateMetadata: false` to walk the document's object graph, discard unreferenced orphan objects, recalculate every stream's byte `/Length`, and emit a fresh, mathematically exact cross-reference table and `%%EOF` trailer. Because the repaired bytes are immediately passed to an embedded PDF.js canvas renderer, you can page through the result and verify fonts, vector diagrams, and raster images before saving `<filename>_repaired.pdf`.
2. **Tier 2 — Content Extraction (Deep Recovery)**: When structural re-serialization aborts because the `/Root` catalog or page tree is mangled beyond `pdf-lib`'s parser tolerance, Tier 2 invokes `pdfjs-dist` (`3.11.174`). PDF.js implements aggressive browser-grade fallback scanning—similar to Firefox's resilient built-in PDF viewer—to locate surviving page streams and concatenate every readable `textContent` item into page-delimited plain text. For healthy documents where you want routine text export rather than forensic salvage, use [PDF to Text](/en/tools/pdf-to-text).

## Forensic Caveats and Command-Line Verification

Rebuilding a damaged PDF is a transformative operation rather than a bit-identical patch, which introduces three practical engineering constraints:

- **Invalidated Digital Signatures**: Any PKCS#7 / CAdES signature embedded in a `/Sig` dictionary hashes explicit byte spans declared in `/ByteRange`. Because writing a clean XRef table changes object offsets and SHA-256 digests, always retain the original damaged file alongside the repaired copy for legal chain-of-custody records.
- **Corrupted Compressed Streams**: Standard PDF content and image streams use zlib `FlateDecode` compression. A single flipped bit inside a deflated stream corrupts the Huffman decoding state for every remaining byte in that stream, which can cause one blank page or a garbled graphic even when the surrounding pages recover cleanly.
- **Local CLI Second Opinions**: When troubleshooting severely damaged enterprise archives on a workstation, you can cross-check structural diagnostics and force deep linear rewrites using open-source command-line tools:

```bash
# Inspect syntax errors, XRef tables, and stream integrity with QPDF
qpdf --check damaged.pdf

# Attempt a clean structural rewrite via QPDF or MuPDF
qpdf --replace-input damaged.pdf
mutool clean -ggg damaged.pdf repaired_mupdf.pdf
```

Running local browser diagnostics first lets you see immediately whether a broken file is a simple truncated tail that rebuilds cleanly in milliseconds or a severely damaged binary requiring raw text extraction and backup restoration.
