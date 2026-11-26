---
title: "How to Use PDF OCR: Extract Text from Scanned Documents"
description: "Learn how Optical Character Recognition (OCR) works, how to extract text from scanned PDFs, and why browser-based OCR is better for privacy."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "pdf-ocr"
relatedType: "tool"
faqs:
  - question: "What is the difference between a native digital PDF and a scanned image-only PDF?"
    answer: "A native digital PDF stores embedded font glyphs, vector paths, and Unicode character mappings (ToUnicode CMap), allowing instant text selection and search with zero recognition errors. A scanned PDF wraps rasterized bitmap images—such as JPEG or CCITT Group 4 streams—inside a PDF container, meaning no character codes exist until an OCR engine analyzes the pixel patterns."
  - question: "What DPI resolution produces the best PDF OCR accuracy without excessive memory use?"
    answer: "For standard 10-point to 12-point printed documents, 300 DPI provides the optimal balance between glyph clarity and memory footprint, yielding roughly 42 pixels of vertical cap height per letter. Below 200 DPI, small punctuation and thin serifs break apart; above 400 to 600 DPI is beneficial only for dense 6-point footnotes, legal fine print, or archival microfilm."
  - question: "Why is client-side WebAssembly OCR safer than cloud upload converters?"
    answer: "Uploading contracts, tax returns, medical charts, or identity scans to remote OCR servers creates network transit risk, third-party retention exposure, and compliance friction under HIPAA or GDPR. A WebAssembly OCR engine runs entirely inside local browser RAM after downloading static model weights, ensuring document pages never leave your device."
  - question: "How does OCR handle multi-column layouts, tables, and skewed scans?"
    answer: "Modern OCR pipelines run layout analysis to segment columns, paragraphs, and margins before reading lines in sequence, while geometric deskewing corrects tilted scans up to roughly 15 degrees. However, dense financial spreadsheets and multi-row grid tables often lose cell alignment in plain-text OCR output and are better handled with dedicated table extractors."
  - question: "Can standard PDF OCR recognize handwritten notes or cursive signatures?"
    answer: "Standard OCR engines such as Tesseract LSTM are trained on printed typefaces and structured typography. While neat block lettering on high-contrast forms may parse partially, cursive handwriting, signatures, and doctor prescriptions require specialized Handwritten Text Recognition (HTR) or Intelligent Character Recognition (ICR) models."
---

**Optical Character Recognition (OCR)** converts rasterized page images inside scanned PDFs—such as photographed contracts, flatbed office scans, and legacy faxes—into searchable, selectable Unicode text. Because scanned PDFs store flat pixel arrays rather than character codes, standard copy-paste, full-text indexing, translation, and screen readers fail until OCR reconstructs the text layer.

Modern browser tools compile neural recognition engines directly to **WebAssembly (Wasm)** so extraction executes inside local RAM with zero server uploads. When extracting text from confidential invoices, legal filings, or medical charts, process pages locally through our zero-cloud [PDF OCR Tool](/en/tools/pdf-ocr).

## The Four-Stage OCR Pipeline and Accuracy Formulas

Production engines like **Tesseract 5** convert each scanned PDF page through four sequential stages:

1. **Rasterization and Pre-processing**: The renderer decodes embedded streams into grayscale bitmaps. Adaptive thresholding (Otsu or Sauvola binarization) separates dark ink from shaded paper, projection-profile or Hough-transform **deskewing** straightens tilted scans, and morphological filters strip noise speckles.
2. **Layout Segmentation**: Connected-component analysis detects margins, headers, and multi-column gutters so adjacent columns read top-to-bottom rather than merging across lines.
3. **LSTM Sequence Recognition**: Rather than slicing individual characters—which breaks on touching ligatures—modern engines feed normalized horizontal line strips into a **Long Short-Term Memory (LSTM)** neural network trained across thousands of typefaces.
4. **Dictionary Post-processing**: Beam-search decoding scores candidate words against language lexicons and n-gram priors, disambiguating similar shapes like `1` vs `l`, `0` vs `O`, or `rn` vs `m`.

Three equations govern OCR compute footprint and recognition quality:

```text
pixel_count = (width_in × DPI) × (height_in × DPI)
CER = [(S + D + I) / N_chars] × 100%
WER = [(S_w + D_w + I_w) / N_words] × 100%
```

**CER** (Character Error Rate) and **WER** (Word Error Rate) tally substitutions (`S`), deletions (`D`), and insertions (`I`) against ground-truth counts (`N_chars`, `N_words`).

## Worked Resolution, Pixel Budget, and Accuracy Example

Consider scanning a 10-page US Letter contract (`8.5 in × 11.0 in`) set in `10-point` body copy (`1 pt = 1/72 in`) with `6-point` footnotes.

1. **Compute 300 DPI pixel budget and RAM**:
   - Width: `8.5 × 300 = 2,550 px`; height: `11.0 × 300 = 3,300 px`.
   - Pixels per page: `2,550 × 3,300 = 8,415,000 px` (`8.42 MP`).
   - Uncompressed 8-bit grayscale buffer (`1 byte/px`): `8,415,000 / 1,048,576 = 8.03 MiB/page` (`80.3 MiB` across 10 pages, or ~`241 MiB` as 24-bit RGB).
2. **Check glyph pixel height**: LSTM recognizers need roughly `20–30 px` minimum character height for reliable decoding.
   - At `300 DPI`: `10 pt` text spans `(10 / 72) × 300 = 41.67 px`, and `6 pt` footnotes span `(6 / 72) × 300 = 25.00 px`—both above the `20 px` floor.
   - At `150 DPI`: `10 pt` drops to `20.83 px` (borderline) and `6 pt` shrinks to `12.50 px`, causing broken stems and merged serifs.
3. **Calculate empirical CER**: On a `2,500`-character page, auditing `5` substitutions, `2` deletions, and `1` insertion gives:
   - `CER = [(5 + 2 + 1) / 2,500] × 100% = 0.32%` (`99.68%` character accuracy).

## Scan Resolution and Source Quality Benchmark Table

Capture settings balance glyph detail against WebAssembly browser memory limits:

| Input Source Profile | Resolution (8.5 × 11 in) | Grayscale Buffer / Page | 10 pt Height | Typical Accuracy | Recommended Workflow |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Smartphone photo (uneven light) | ~1,275 × 1,650 px (150 DPI) | 2.01 MiB | 20.8 px | 88% – 94% | Flatten page, remove glare, re-shoot closer |
| Legacy office fax (CCITT G3/G4) | 1,728 × 2,156 px (~200 DPI) | 3.55 MiB | 27.8 px | 93% – 97% | Enable de-speckle; audit all numeric totals |
| Clean flatbed scan (300 DPI) | 2,550 × 3,300 px (300 DPI) | 8.03 MiB | 41.7 px | 99.0% – 99.8% | Optimal default for contracts and invoices |
| Dense legal / 6 pt footnotes | 3,400 × 4,400 px (400 DPI) | 14.27 MiB | 55.6 px | 99.3% – 99.9% | Best for dense multi-column fine print |
| Archival / faded paper (600 DPI) | 5,100 × 6,600 px (600 DPI) | 32.10 MiB | 83.3 px | 98.5% – 99.6% | Split large batches to prevent browser OOM |
| Native digital PDF (vector text) | Resolution-free paths | < 0.20 MiB | Exact Unicode | 100.0% | Copy directly; OCR is unnecessary |

## Privacy Architecture, Formatting Limits, and Optimization Tips

Executing OCR inside a **zero-cloud WebAssembly sandbox** removes the main compliance risk of digitization: sending sensitive documents to external servers. Once the browser caches the Wasm runtime and `.traineddata` weights, pages process offline in local memory—protecting HIPAA records, tax filings, attorney-client exhibits, and NDAs from third-party retention.

Follow three operational practices for clean output:

- **Select the exact language pack**: Language dictionaries drive diacritic recovery (`é`, `ü`, `ñ`, `ç`). Running an English model on French or Spanish scans corrupts accented letters into ASCII symbols.
- **Avoid heavy JPEG recompression**: Scanning at `300 DPI` and saving below `70%` JPEG quality introduces ringing artifacts around letter strokes that hurt binarization more than slightly lower resolution. Prefer lossless PNG, TIFF, or high-quality PDF streams.
- **Match tools to document structure**: Plain-text OCR preserves paragraphs well, whereas multi-page bank ledgers and bordered tables lose column alignment when flattened. Extract structured spreadsheets with [PDF to Excel](/en/tools/pdf-to-excel), use specialized ICR/HTR models for cursive handwriting, and always verify extracted numbers, IBANs, and dates manually because dictionaries cannot spell-check arbitrary digits.
