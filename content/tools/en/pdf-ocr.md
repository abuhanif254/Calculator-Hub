---
metaTitle: "PDF OCR Online Free — Convert Scanned PDF to Text Locally"
metaDescription: "Run client-side Tesseract OCR on scanned PDFs in your browser. Extract text, parse tables, or build searchable PDFs in 16 languages with zero uploads."
metaKeywords: "PDF OCR, OCR PDF, convert scanned PDF to text, searchable PDF converter, PDF text recognition, Tesseract OCR PDF, extract text from PDF image, make PDF searchable, free PDF OCR local"
title: "PDF OCR"
shortDescription: "Extract selectable text from scanned PDFs, parse tabular grids, and assemble searchable sandwich PDFs across 16 languages directly in your browser using WebAssembly."
faqs:
  - question: "How does a searchable PDF preserve the original scan while allowing text selection?"
    answer: "A searchable (sandwich) PDF retains each original raster page as the visible background and overlays recognized words at their exact bounding-box coordinates using zero-opacity text operators. Viewers display the authentic scan while Ctrl+F search, copy-paste, and screen readers operate on the invisible foreground text layer."
  - question: "What is the difference between Balanced and Max accuracy modes during PDF OCR?"
    answer: "Balanced mode rasterizes pages at 1.5x viewport scale (roughly 108 to 150 DPI equivalent) with default LSTM recognition for faster throughput. Max mode upsamples pages to 2.2x scale and applies an ASCII character whitelist, which improves small-print Latin text fidelity but should be avoided for non-Latin scripts such as Arabic, Bengali, or CJK."
  - question: "When should I enable Binarization instead of Auto-Contrast preprocessing?"
    answer: "Use Auto-Contrast for clean gray-toned scans with faint ink, as it stretches pixel luminance linearly around the midpoint without discarding subtle antialiasing. Switch to Binarization when scanning yellowed paper, uneven shadows, or photocopy bleed-through that confuses glyph segmentation."
  - question: "Can this OCR tool process password-protected scanned PDFs without uploading them?"
    answer: "Yes. When an encrypted PDF is detected, the tool prompts for the document password and decrypts the byte buffer locally in memory before passing the pages to PDF.js and the Tesseract.js WebAssembly worker. Neither the file nor the password ever leaves your device."
  - question: "Why does the first OCR run pause briefly before recognizing page one?"
    answer: "On first execution for a given language, the browser downloads the Tesseract WebAssembly binary and the compressed LSTM traineddata dictionary for your selected language codes (for example eng or deu) and caches them locally. Subsequent runs reuse those cached models immediately."
features:
  - "Client-side Tesseract.js WebAssembly LSTM recognition with zero server uploads"
  - "Searchable sandwich PDF assembly overlaying invisible text via pdf-lib coordinate projection"
  - "Multi-language recognition across 16 scripts with combined language stacking (such as eng+spa)"
  - "Canvas preprocessing filters for ITU-R BT.601 grayscale binarization and 1.6x linear contrast boost"
  - "Targeted page processing supporting all pages, visual selection checkboxes, or custom page ranges"
  - "Local password decryption plus side-by-side confidence scoring and TXT, CSV, or JSON export"
useCases:
  - "Converting scanned legal discovery bundles and court exhibits into Ctrl+F searchable archives without violating client confidentiality"
  - "Extracting line items and totals from photographed vendor invoices or paper receipts into structured text and CSV rows"
  - "Digitizing bilingual academic papers or archival monographs using stacked multi-language Tesseract models"
  - "Making legacy engineering manuals and hardware schematics searchable on local tablets or air-gapped workstations"
  - "Auditing OCR quality page-by-page using per-page confidence percentages before ingesting documents into enterprise search indexes"
  - "Running targeted OCR on specific appendix pages of a 200-page scanned report to conserve memory and processing time"
howToSteps:
  - "Drop your scanned PDF into the workspace or browse locally; enter the password if the document is encrypted."
  - "Pick one or more document languages (for example English plus French) to load the matching LSTM traineddata dictionaries."
  - "Choose your output workflow (Text Extract, Searchable PDF, or Table mode) and select Fast, Balanced, or Max accuracy."
  - "Configure Auto-Contrast or Binarization preprocessing and restrict processing to specific page ranges if needed."
  - "Click Run OCR to rasterize pages via PDF.js and recognize characters locally inside the browser worker."
  - "Inspect recognized text alongside the original page preview, review confidence scores, and download TXT, CSV, JSON, or your searchable PDF."
---

Portable Document Format files fall into two distinct categories: digital-native documents storing glyph streams alongside embedded font tables, and scanned PDFs where each page is a compressed JPEG, JBIG2, or CCITT Group 4 image wrapped inside a page container. Standard copy-paste and desktop search fail on scanned files because no character codes exist in the content stream—only pixels. NexusCalculator's **PDF OCR** engine bridges that gap inside your browser by pairing PDF.js rasterization, canvas preprocessing, Tesseract.js WebAssembly LSTM inference, and `pdf-lib` coordinate projection, keeping sensitive medical, financial, or legal scans local to your device.

If your PDF already holds selectable fonts and you only need raw paragraphs without neural recognition, use [PDF to Text](/en/tools/pdf-to-text) instead.

## From Pixel Buffers to Selectable Glyphs

Because Tesseract reads raster bitmaps rather than PDF vector operators, the browser pipeline renders each target page to an off-screen HTML5 `<canvas>` first. PDF.js decodes the compressed image XObjects at a configurable viewport multiplier: `1.5x` for Balanced or Fast passes and `2.2x` for Max detail passes.

Before pixels reach the WebAssembly recognizer, two deterministic filters clean degraded paper scans directly on the `ImageData` RGBA array:

- **Auto-Contrast Stretching**: Multiplies RGB deviation from midpoint 128 by a `1.6` gain—`clamp(1.6 * (c - 128) + 128, 0, 255)`—deepening faint ink while pushing off-white backgrounds toward pure white.
- **Luminance Binarization**: Converts RGB pixels using ITU-R BT.601 luma weights (`Y = 0.299R + 0.587G + 0.114B`) and thresholds above `130` to `255` (white) and at or below `130` to `0` (black), removing shadow gradients and bleed-through noise.

A dedicated Web Worker then instantiates Tesseract.js with the concatenated language string (such as `eng+deu` or `eng+chi_sim`). Modern Tesseract 4/5 engines evaluate each text line through a bidirectional Long Short-Term Memory (LSTM) recurrent neural network, using sequence context to disambiguate homoglyphs like `0` versus `O`, or `1`, `l`, and `I`.

## OCR Modes, Resolution Scaling, and Language Trade-Offs

Choosing the right viewport scale, accuracy profile, and preprocessing filter depends on scan quality, typography, and script family. Higher raster scales enlarge small serif glyphs so ascenders stay distinct, though memory usage and inference time scale quadratically with the viewport multiplier.

| Configuration Axis | Option | Technical Behavior | Best-Fit Scenario | Known Caveat |
| :--- | :--- | :--- | :--- | :--- |
| **Accuracy Profile** | `Fast` | `1.5x` canvas scale; `tessedit_ocr_engine_mode = 1` | High-contrast modern laser prints at 300+ DPI | Lower recall on degraded photocopies or skewed lines |
| **Accuracy Profile** | `Balanced` | `1.5x` canvas scale; default LSTM recognition | General business contracts, invoices, multi-script PDFs | Very small footnotes (< 8 pt) may drop punctuation |
| **Accuracy Profile** | `Max` | `2.2x` canvas scale; strict ASCII character whitelist | Dense English/numeric ledgers, serial codes, small print | Whitelist strips accented Latin, Cyrillic, Arabic, and CJK |
| **Preprocessing** | `Auto-Contrast` | Linear `1.6x` RGB contrast stretch around 128 | Faint toner, light pencil notes, low-contrast mobile scans | Can amplify dark paper specks on noisy backgrounds |
| **Preprocessing** | `Binarization` | BT.601 luma threshold at 130 (pure black/white) | Aged yellow paper, uneven book-spine shadows | Erases very light watermarked or colored text |
| **Output Mode** | `Searchable PDF` | Draws zero-opacity words onto original PDF pages | Archival compliance, Ctrl+F search, visual fidelity | Output retains original raster size unless compressed |

## Projecting Bounding Boxes onto ISO 32000 User Space

Generating a searchable sandwich PDF requires translating coordinates between two opposing geometric conventions. HTML5 Canvas and Tesseract return word bounding boxes `{ x0, y0, x1, y1 }` measured in raster pixels from a **top-left origin**, whereas ISO 32000 PDF user space places `(0, 0)` at the **bottom-left corner** of the page measured in PostScript points (`1 pt = 1/72 inch`).

During recognition, every word box is first divided by the canvas rendering `scale` so coordinates normalize back to the PDF page's native point dimensions. When compiling the final PDF with `pdf-lib`, the vertical axis flips using the page height:

```js
// Normalize Tesseract raster pixel bbox back to ISO 32000 PDF point space
const wordHeight = word.bbox.y1 - word.bbox.y0;
const pdfX = word.bbox.x0;
const pdfY = pageHeight - word.bbox.y0 - wordHeight;

// Overlay selectable text with zero opacity over the original raster scan
page.drawText(word.text, {
  x: pdfX,
  y: pdfY,
  size: Math.max(2, wordHeight * 0.82),
  opacity: 0,
});
```

In lower-level PDF content streams, desktop tools like Ghostscript or `ocrmypdf` accomplish the same invisible sandwich effect using text rendering mode `3 Tr` (neither fill nor stroke) inside a `BT ... ET` text object. Because the original scan image remains untouched beneath the text overlay, handwritten signatures, corporate stamps, and complex charts stay visually identical to the paper source. If you photographed paper pages on a phone first, assemble them cleanly with [Scan to PDF](/en/tools/scan-to-pdf) before running OCR, and shrink oversized multi-page searchable archives afterward using [Compress PDF](/en/tools/compress-pdf).

## Diagnosing Recognition Errors and CLI Cross-Checks

When per-page confidence drops below 80%, the root cause is almost always upstream image geometry rather than the neural weights:

- **Sub-150 DPI Scans and JPEG Ringing**: Characters shorter than roughly 20 pixels in cap height lack enough stroke pixels for LSTM feature extraction. Rescanning at 300 DPI grayscale (avoiding aggressive JPEG compression) usually lifts accuracy from ~72% to 98%+.
- **Script Mismatch with Max Mode**: Because `Max` mode restricts recognition to printable ASCII characters, switch back to `Balanced` whenever processing accented European text (`spa`, `fra`, `deu`), right-to-left Arabic (`ara`), Indic scripts (`hin`, `ben`), or East Asian scripts (`chi_sim`, `chi_tra`, `jpn`, `kor`).
- **Multi-Language Stacking Overhead**: Selecting four or five languages simultaneously expands the LSTM search beam and slows inference significantly. Stack only the exact two languages present on the page (for example `eng+fra`).

Developers validating OCR pipelines or automating large server-side archives can benchmark browser results against native desktop CLI tooling:

```bash
# Rasterize page 1 at 300 DPI and run Tesseract with TSV confidence output
pdftoppm -png -r 300 -f 1 -l 1 scanned.pdf page
tesseract page-1.png stdout -l eng --psm 3 tsv | head -n 15

# Verify whether a searchable PDF actually contains an embedded text stream
pdftotext searchable_output.pdf - | head -n 20
```

For quick ad-hoc verification without CLI installation, simply open the downloaded searchable PDF in any modern browser, press `Ctrl+F` (or `Cmd+F`), and highlight a phrase directly across the scanned pixels—if the highlight rectangle hugs the printed words accurately, your coordinate projection and text layer succeeded.
