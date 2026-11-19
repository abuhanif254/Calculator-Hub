---
metaTitle: "Redact PDF Permanently | Destroy Sensitive Text & Metadata"
metaDescription: "Irreversibly black out sensitive PDF text via full-page rasterization. Purge hidden data and metadata locally in your browser for GDPR and HIPAA."
metaKeywords: "redact pdf, pdf redaction tool, remove sensitive data from pdf, secure pdf redactor, pdf privacy tool, permanent pdf data removal, gdpr pdf compliance, hipaa pdf compliance, hide text in pdf, black out text in pdf, sanitize pdf document"
title: "Redact PDF"
shortDescription: "Permanently destroy sensitive PDF text, images, and hidden document metadata using full-page high-DPI rasterization directly inside your browser."
faqs:
  - question: "Why is drawing a black rectangle in a regular PDF editor unsafe for redaction?"
    answer: "Drawing a black shape on top of a PDF page only adds a new vector layer in front of the existing text stream. Anyone who drags a cursor across the black box, presses Ctrl+C, runs pdftotext, or opens the file in a text editor can extract the hidden Social Security numbers, names, or financial figures intact."
  - question: "How does this tool guarantee redacted information cannot be recovered?"
    answer: "During export, every page is rendered onto an offscreen HTML5 Canvas at 3.0x scale (~216 DPI), your solid redaction boxes overwrite those exact RGB pixels directly on the bitmap, and the flattened pages are embedded into a brand-new PDF container. The original text streams, hidden layers, annotations, and metadata never enter the exported file."
  - question: "Does the redaction process also strip hidden PDF metadata and revision history?"
    answer: "Yes. Because the tool constructs a fresh PDFDocument from scratch rather than modifying the original container in place, Info dictionary fields (Author, Creator, Title), XMP XML packets, comments, AcroForm values, JavaScript actions, and incremental %%EOF revision snapshots are completely discarded."
  - question: "Why is the redacted PDF no longer text-selectable, and can I make the remaining text searchable again?"
    answer: "Eliminating the underlying text layer via full-page rasterization is what guarantees zero residual character leakage beneath or adjacent to redaction zones. If you need searchability on the unredacted portions afterward, run the clean sanitized PDF through an OCR pass so only visible, non-redacted pixels are indexed."
  - question: "Does uploading a 50-page confidential medical record send any data to a remote server?"
    answer: "Never. Both the PDF.js preview renderer and the offscreen high-DPI rasterization and PDF reconstruction run exclusively inside your browser's local memory. For extremely large files (100+ pages), process them in smaller chunks so browser canvas memory stays fast and responsive."
features:
  - "True destructive redaction via 3.0x (~216 DPI) offscreen canvas rasterization and direct pixel-buffer overwrite"
  - "Clean-room PDF container reconstruction via PDFDocument.create() that purges Info, XMP metadata, and incremental history"
  - "Interactive click-and-drag rectangular redaction drawing with mouse and touch support across every page"
  - "Customizable redaction fill colors (classic solid black, whiteout, or custom hex swatches) for legal or archival styling"
  - "Per-page redaction list management allowing review and removal of boxes before committing permanent sanitization"
  - "Zero-upload browser execution supporting local PDFs up to 150 MB for HIPAA, GDPR, and FOIA privacy workflows"
useCases:
  - "Sanitizing legal discovery exhibits, court filings, and witness depositions to prevent accidental PII or privileged-counsel leaks"
  - "Removing the 18 HIPAA Safe Harbor identifiers from patient discharge summaries and clinical records before research sharing"
  - "Redacting personal bank account numbers, tax IDs, and home addresses from KYC verification packets and loan applications"
  - "Preparing Freedom of Information Act (FOIA) and GDPR Data Subject Access Request (DSAR) disclosures that exclude third-party personal data"
  - "Stripping proprietary pricing tables, vendor rates, and client identities from sample case studies or RFP templates"
  - "Eliminating hidden author identities, revision comments, and embedded document history prior to public press or whistleblower releases"
howToSteps:
  - "Drop an unencrypted PDF (up to 150 MB) into the workspace or select a confidential file from your local drive."
  - "Select your redaction fill color (solid black #000000 by default) and navigate to the page containing sensitive information."
  - "Click and drag across every text passage, table cell, signature, or image region you need to destroy permanently."
  - "Review placed boxes across all pages and delete any misplaced overlay from the sidebar before final export."
  - "Click Export Redacted PDF to rasterize every page, burn redactions directly into the pixel buffer, and download the sanitized _redacted.pdf."
---

Improper PDF redaction is one of the most notorious causes of high-profile legal and government data leaks. Over the past two decades, court filings, intelligence briefings, and corporate disclosures have repeatedly exposed confidential names, account numbers, and strategic figures—not because the black boxes failed to render visually, but because the redactor merely layered an opaque shape over untouched underlying text. **Redact PDF** eliminates that failure mode entirely by pairing interactive browser-based selection with **full-page rasterization and clean-room container reconstruction**, irreversibly destroying both masked content and hidden document metadata without ever transmitting your file to a remote server.

## Why Drawing a Black Box Is Not Redaction

In a standard **ISO 32000** PDF content stream, text rendering and vector shapes are independent painting commands executed sequentially like sheets of acetate stacked on an overhead projector:

```pdf
BT
  /F1 11 Tf
  72 680 Td
  (Account Routing: 021000021  SSN: 123-45-6789) Tj   % Text stream stays intact!
ET
0 0 0 rg                    % Set solid black fill
68 674 280 18 re f          % Paint black rectangle ON TOP of the text
```

Visually, the screen displays a crisp black bar. Forensically, the string `(Account Routing: 021000021  SSN: 123-45-6789)` remains 100% intact inside the `FlateDecode` object stream. Any recipient can drag a selection cursor over the black box, press `Ctrl+C`, extract the text programmatically, or search for the hidden digits.

Even worse, PDF files routinely conceal sensitive data outside the visible page stream altogether:

- **Incremental Update History (`%%EOF`):** Many desktop editors append changes to the end of a file rather than rewriting earlier object revisions, leaving deleted paragraphs recoverable in prior cross-reference sections.
- **Document & XMP Metadata:** `/Info` dictionaries and embedded XML (`/Metadata`) streams frequently expose internal author usernames, workstation paths, software versions, and edit timestamps.
- **Hidden Layers & Artifacts:** Optional Content Groups (`/OCG`), invisible annotations, AcroForm defaults, embedded page thumbnails, and cropped regions outside the `/CropBox` (yet still present inside the `/MediaBox`) survive naive visual masking.

## Comparison of PDF Redaction Approaches

| Sanitization Method | Underlying Text Destroyed? | Metadata & `%%EOF` History Purged? | Vector Text Preserved Outside Boxes? | Relative Output Size | Residual Leakage Risk |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **Visual Black Rectangle Overlay** | **No** — copyable & searchable | **No** | Yes | Minimal | **Critical** — fails every privacy audit |
| **Vector Content-Stream Scrubbing** | Partial — depends on glyph bounding-box parser | Only if explicit sanitizer runs | Yes | Small | **Moderate** — kerned glyphs, overlapping XObjects, or `/CropBox` bleed can leak |
| **Full-Page Rasterization + Clean Container (This Tool)** | **Yes** — pixels overwritten permanently | **Yes** — brand-new `PDFDocument` built from scratch | No (flattened ~216 DPI image pages) | Medium (JPEG 0.90 compression) | **Minimal** — zero original object graph survives |

## The Destructive Rasterization Pipeline Explained

When you trigger export, **Redact PDF** executes a six-stage clean-room sanitization loop entirely inside your browser tab's memory:

1. **Blank Container Initialization:** Calls `PDFDocument.create()` in `pdf-lib`, instantiating an empty PDF binary with zero inherited XRef history, zero `/Info` metadata, zero comments, and zero hidden attachments.
2. **High-DPI Offscreen Rendering:** Iterates through every page via **PDF.js** at `scale: 3.0` (approximately **216 DPI** relative to standard 72 pt/in PDF User Space), painting onto an opaque white offscreen HTML5 Canvas so transparent regions never turn black.
3. **Destructive Pixel Overwrite:** Converts each normalized redaction rectangle (`x%`, `y%`, `width%`, `height%`) into exact high-resolution pixel coordinates and executes `ctx.fillRect()` directly over the rendered framebuffer—physically replacing the original character pixels with solid fill bytes.
4. **Balanced Image Compression:** Encodes each sanitized framebuffer to JPEG at `0.90` quality (`offscreenCanvas.toDataURL('image/jpeg', 0.90)`), keeping typography crisp for legal reading and office printing while avoiding multi-hundred-megabyte lossless PNG bloat.
5. **Original Geometry Preservation:** Queries each page's unscaled `scale: 1.0` viewport dimensions and embeds the flattened JPEG edge-to-edge on a matching new PDF page so print margins and aspect ratios remain faithful to the source.
6. **Direct Local Download:** Serializes the newly forged binary as `_redacted.pdf` and releases the temporary object URL immediately.

## Forensic Verification Before Document Release

High-stakes legal, medical, and government disclosures should never rely on visual inspection alone. Before redacting a source file, inspect what hidden fields exist using the [PDF Metadata Viewer](/en/tools/pdf-metadata-viewer). After exporting your `_redacted.pdf`, run a three-command forensic check locally to confirm zero residual strings or metadata survived:

```bash
# 1. Confirm zero extractable text stream remains
pdftotext filing_redacted.pdf - | wc -c
# Expected output: 0 (or whitespace-only page breaks)

# 2. Audit document metadata and XMP streams
exiftool filing_redacted.pdf

# 3. Search raw uncompressed binary strings for a redacted keyword
strings filing_redacted.pdf | grep -i "123-45-6789"
# Expected output: (no matches)
```

## Regulatory Alignment and Trade-Offs (GDPR, HIPAA, FOIA)

Destructive rasterization aligns cleanly with **HIPAA Safe Harbor** de-identification (45 CFR § 164.514(b)(2), covering all 18 identifiers including names, dates, SSNs, and medical record numbers), **GDPR Article 17 / Article 32** technical safeguards during Data Subject Access Requests, and **FOIA** exemption workflows where accidental disclosure creates statutory liability.

Keep three practical operational nuances in mind when deploying rasterized redaction at scale:

- **Restoring Safe Searchability:** Because rasterization removes the entire text layer, recipients cannot highlight or search unredacted paragraphs. If your court or agency mandates searchable PDFs, run the *already redacted* output through [PDF OCR](/en/tools/pdf-ocr)—since the masked pixels are solid black, OCR only indexes the remaining safe content.
- **Browser Memory Ceiling:** Rendering pages at `3.0×` scale allocates roughly 15–25 MB of transient RGBA canvas buffer per page while encoding. Documents up to ~80–120 pages finish smoothly on modern desktops; for massive 500-page discovery binders, split the document into manageable batches first.
- **Defense in Depth:** Once sensitive fields are destroyed, consider wrapping external distribution copies with AES-256 open credentials using [Protect PDF](/en/tools/protect-pdf) so access remains restricted to authorized counsel or recipients.
