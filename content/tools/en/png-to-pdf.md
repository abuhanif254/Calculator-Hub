---
metaTitle: "PNG to PDF Converter: Lossless Merge With Alpha Support"
metaDescription: "Merge up to 50 PNG images into a lossless PDF directly in your browser. Preserve crisp text, alpha transparency, custom margins, and full privacy."
metaKeywords: "png to pdf, convert png to pdf, merge png into pdf, lossless png to pdf, transparent png to pdf, combine pngs into one pdf, batch png to pdf, client side png to pdf, save png as pdf"
title: "PNG to PDF Converter"
shortDescription: "Combine up to 50 PNG files into a lossless PDF document or separate zipped PDFs directly in your browser while preserving pixel precision and alpha channel transparency."
faqs:
  - question: "Does this PNG to PDF converter re-compress images into lossy JPEG format?"
    answer: "No. Unlike canvas-based converters that re-encode screenshots as JPEG, this tool reads each PNG's raw ArrayBuffer bytes and calls pdf-lib's embedPng() parser directly. Color channels remain losslessly compressed using PDF FlateDecode (zlib) streams with zero JPEG ringing or chroma subsampling."
  - question: "Will transparent backgrounds in my PNG logos or UI mockups be preserved inside the PDF?"
    answer: "Yes. When a PNG contains an 8-bit alpha channel or tRNS transparency chunk, pdf-lib extracts the opacity plane into a dedicated PDF Soft Mask (/SMask) XObject. Transparent regions composite cleanly against the PDF page canvas without turning into black boxes."
  - question: "What is the maximum batch size and individual file limit supported in the browser?"
    answer: "You can load up to 50 PNG files per conversion session, with each individual file capped at 20 MB. Because all binary parsing and PDF assembly happen inside local client memory, these guardrails prevent browser tab memory exhaustion on mobile and desktop devices."
  - question: "How does Auto page sizing differ from A4 and US Letter modes?"
    answer: "A4 (595.28 x 841.89 pt) and US Letter (612 x 792 pt) scale each PNG proportionally to fit cleanly inside the fixed print sheet minus your chosen margins. Auto mode sets each page's MediaBox to the exact native PNG pixel dimensions in PDF points plus twice the margin value, avoiding any aspect-ratio whitespace."
  - question: "When should I pick Separate PDFs (ZIP) instead of Merge into Single PDF?"
    answer: "Choose Merge when creating one unified deliverable such as a UI design deck, comic strip, or invoice pack. Choose Separate PDFs (ZIP) when you need each PNG converted into its own identically named .pdf file—such as individual architectural plates or asset sheets—bundled into one downloadable ZIP archive."
features:
  - "Direct binary PNG ingestion via pdf-lib embedPng() with zero lossy JPEG transcoding or HTML5 canvas downsampling"
  - "Full alpha transparency support writing ISO 32000-1 /SMask soft-mask streams alongside lossless FlateDecode color planes"
  - "Batch processing of up to 50 PNG files (up to 20 MB each) with checkerboard transparency thumbnails for visual inspection"
  - "Precision sequence controls allowing one-click up/down reordering and instant item removal prior to PDF assembly"
  - "Flexible page geometry supporting A4, US Letter (portrait or landscape), and Auto native-dimension pages with 0, 20, or 40 pt margins"
  - "Dual export pipeline compiling either one merged PDF document or individual per-image PDFs archived cleanly via JSZip"
useCases:
  - "Assembling high-DPI software UI screenshots and Figma exports into crisp client review decks without blurred typography"
  - "Packaging transparent PNG product cutouts, icons, and brand stickers into print-ready spec sheets with intact alpha masks"
  - "Converting technical CAD plots, circuit schematics, and matplotlib charts into lossless A4 engineering documentation"
  - "Batch-converting up to 50 scanned PNG workbook pages into individual standalone PDF files zipped for LMS upload"
  - "Bundling crisp monochrome wireframe diagrams into US Letter landscape packets for design critique meetings"
  - "Creating pixel-accurate Auto-sized PDF proofs of web graphics and banner designs with zero aspect-ratio cropping"
howToSteps:
  - "Drag and drop up to 50 PNG files (max 20 MB each) into the upload dropzone or click Select Images to pick files from your device."
  - "Verify transparency against the built-in checkerboard preview grid and use the up/down arrows on each card to set exact page order."
  - "Select your Page Size (A4, US Letter, or Auto to match each image's exact dimensions) and choose Portrait or Landscape orientation."
  - "Pick your preferred margin spacing (0 pt borderless, 20 pt narrow, or 40 pt standard print margin) and choose Merge or Separate ZIP output."
  - "Click Create PDF to assemble the lossless binary streams locally in your browser, then save your merged PDF or ZIP bundle immediately."
---

Portable Network Graphics (`PNG`) exist for visual precision: sharp 1-pixel UI typography, anti-aliased icons, CAD linework, scientific charts, and layered alpha transparency. Passing those assets through a generic online converter that flattens everything onto an opaque canvas and re-encodes it as JPEG destroys the exact attributes you chose PNG for—introducing 4:2:0 chroma bleed around colored text and mosquito noise along high-contrast borders. NexusCalculator's PNG to PDF Converter avoids re-rasterization altogether by feeding raw PNG binary buffers directly into `pdf-lib` inside your browser, creating genuinely lossless PDF documents while preserving transparency and keeping sensitive design files strictly local.

## Lossless FlateDecode Embedding vs. Canvas Re-Encoding

Standard web-based PDF builders commonly paint images onto an offscreen `<canvas>` and call `toDataURL('image/jpeg')`. That shortcut forces lossy Discrete Cosine Transform compression and discards alpha channels permanently.

By contrast, this tool reads each selected `File` directly via `imgObj.file.arrayBuffer()` and invokes `pdfDoc.embedPng(pngImageBytes)`. Rather than altering pixel values, the PNG parser unpacks the file's `IHDR` header and zlib-compressed `IDAT` image payloads, separates the color channels from the opacity plane when present, and serializes them into ISO 32000-1 compliant PDF Image XObjects encoded with `/Filter /FlateDecode`. Every single pixel value in your source screenshot or diagram survives intact byte-for-byte.

If your source graphics originate as scalable vectors such as logos or engineering schematics, render them cleanly to high-DPI rasters first with [SVG to PNG](/en/tools/svg-to-png), or isolate transparent product cutouts upfront using the [Background Remover](/en/tools/background-remover) before bundling them into a lossless PDF specification sheet.

## How PNG Color Types and Alpha Channels Map to PDF Soft Masks

The PNG specification (ISO/IEC 15948) defines five pixel storage layouts in the `IHDR` chunk. Because PDF does not interleave RGBA bytes inside a single `/XObject` stream, the embedding engine splits transparency into a sibling grayscale `/SMask` (Soft Mask) object referenced by the primary image dictionary:

| PNG Color Type (`IHDR`) | Channel Layout | Transparency Mechanism | Resulting PDF `/ColorSpace` | PDF Stream & Alpha Handling | Ideal Source Material |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Type 0 (Grayscale)** | 1 channel (L) | Optional `tRNS` key color | `/DeviceGray` | `/FlateDecode` (+ `/Mask` or `/SMask`) | Monochrome line art, fax sheets, diagrams |
| **Type 2 (Truecolor)** | 3 channels (RGB) | Optional `tRNS` key color | `/DeviceRGB` | `/FlateDecode` RGB stream | Opaque UI screenshots, data plots, slides |
| **Type 3 (Indexed)** | 1-byte palette index | `PLTE` + `tRNS` alpha table | `/Indexed` or `/DeviceRGB` | Palette-mapped `/FlateDecode` (+ `/SMask`) | Quantized web sprites, 8-bit charts |
| **Type 4 (Gray + Alpha)** | 2 channels (L + A) | Full 8-bit alpha channel | `/DeviceGray` | Split luminance + 8-bit `/SMask` stream | Transparent monochrome watermarks & icons |
| **Type 6 (RGBA)** | 4 channels (R, G, B, A) | Full 8-bit alpha channel | `/DeviceRGB` | Split RGB `/FlateDecode` + 8-bit `/SMask` | Transparent logos, stickers, Figma exports |

### Verifying True Lossless Streams With qpdf

Engineers and prepress teams who want cryptographic certainty that a compiled PDF contains lossless `/FlateDecode` objects rather than hidden JPEG re-compression can unpack the PDF object tree locally using `qpdf`:

```bash
# Decompress PDF object streams into readable QDF syntax and inspect XObject headers
qpdf --qdf --object-streams=disable merged-document.pdf inspected.pdf
grep -E "/Subtype /Image|/Filter|/ColorSpace|/SMask" inspected.pdf
```

A genuine lossless transparent PNG page will display `/Filter /FlateDecode`, `/ColorSpace /DeviceRGB`, and an explicit `/SMask <obj> 0 R` reference pointing to the separated 8-bit alpha stream.

## Page Dimensions, Uniform Scaling, and Margin Geometry

When compiling onto fixed print paper (`A4` at `595.28 × 841.89 pt` or `US Letter` at `612 × 792 pt`, toggled between Portrait and Landscape), the layout engine subtracts twice the chosen margin (`0 pt`, `20 pt`, or `40 pt`) to define the drawable area (`drawW × drawH`). It then computes an isotropic scale factor:

`scaleRatio = Math.min(drawW / pngWidth, drawH / pngHeight)`

Multiplying both dimensions by `scaleRatio` guarantees zero stretching or aspect-ratio distortion, while `(pageW - finalW) / 2` and `(pageH - finalH) / 2` center the PNG cleanly on both axes. Switching Page Size to `Auto` bypasses fixed paper constraints completely: each PDF page takes the exact width and height of its PNG (`pngDims.width + margin * 2` by `pngDims.height + margin * 2`), which is especially effective for long vertical webpage captures or ultrawide dashboards that would become unreadably tiny when forced onto A4.

## Merged Portfolio vs. Separate Zipped PDF Exports

Two packaging modes cover both collaborative and automated filing needs:

- **Merge into Single PDF**: Iterates sequentially through your ordered visual queue—adjusted with the card-level up/down controls—appending one page per PNG into a single `merged-document.pdf` download.
- **Separate PDFs (ZIP)**: Instantiates a fresh `PDFDocument` for every queued PNG, strips the `.png` suffix to produce matching `<basename>.pdf` filenames, and bundles every standalone document into `pdf-documents.zip` via `JSZip`.

If you ever need to reverse this workflow and extract crisp, lossless raster frames back out of an existing PDF document, use [PDF to PNG](/en/tools/pdf-to-png).

## Handling Large PNG Batches, Interlacing, and 16-Bit Exports

Because lossless PNG streams carry significantly higher entropy than heavily compressed JPEGs, client-side memory management matters on large batches:

- **Browser Memory Guardrails**: Capping batches at 50 files and 20 MB per PNG prevents V8/WebKit `ArrayBuffer` allocation spikes while decoding large `IDAT` streams. If a 4K screenshot approaches 20 MB, running an indexed palette pass (PNG-8) or trimming dead canvas space before upload cuts both RAM usage and resulting PDF size dramatically.
- **16-Bit PNG Compatibility**: Most web browsers and `pdf-lib` expect standard 8-bit-per-channel PNGs (`bitDepth: 8`). Scientific exports saved as 16-bit-per-channel PNGs should be quantized to 8-bit RGB/RGBA prior to embedding to ensure uniform rendering across macOS Preview, Acrobat, and Chrome PDFium.
- **White vs. Transparent Print Appearance**: Although `/SMask` transparency renders cleanly over white paper in every PDF viewer, commercial print RIPs occasionally prefer explicit white backing on dark-mode UI screenshots—check the checkerboard preview cards carefully before finalizing print jobs.
