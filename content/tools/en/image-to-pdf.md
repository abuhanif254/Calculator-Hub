---
metaTitle: "Image to PDF Converter: Merge JPG, PNG, WebP & BMP Online"
metaDescription: "Convert JPG, PNG, WebP, GIF, and BMP files to PDF locally in your browser. Customize page sizes, margins, watermarks, compression, and metadata."
metaKeywords: "image to pdf, convert image to pdf, jpg to pdf, png to pdf, webp to pdf, bmp to pdf, gif to pdf, photo to pdf, picture to pdf, online pdf creator, multi-format pdf generator, watermark image pdf"
title: "Image to PDF"
shortDescription: "Convert JPG, PNG, WebP, GIF, and BMP images into print-ready PDF documents locally in your browser with page layout controls, watermarks, compression, and live PDF.js preview."
faqs:
  - question: "Which raster formats can be combined inside a single PDF compilation?"
    answer: "You can mix JPG, PNG, WebP, GIF, and BMP files in the same queue—including screenshots pasted directly from your system clipboard. During compilation, each raster is normalized onto an HTML5 canvas, rotated or cropped as configured, and embedded as a compliant PDF Image XObject."
  - question: "How does the Auto page size option translate image pixels into PDF points?"
    answer: "PDF MediaBox dimensions use PostScript points where 72 points equal one inch. In Auto mode, the tool converts each image's post-rotation width and height from standard 96 PPI CSS pixels to PDF points using a 72/96 (0.75) multiplier so each page tightly wraps its source graphic without margins unless specified."
  - question: "When does a PNG remain lossless instead of being transcoded to JPEG inside the PDF?"
    answer: "When you select the Original quality preset and supply a PNG source, the compiler writes a PNG stream via pdf-lib's embedPng() method using lossless FlateDecode compression. Choosing High, Balanced, or Compressed routes images through Web Worker compression and JPEG DCTDecode encoding to shrink output size."
  - question: "What is the difference between compiling a single PDF versus separate PDFs?"
    answer: "Single-document mode merges every image in your visual queue into one ordered multi-page PDF file. Separate mode compiles each queued image into its own standalone PDF document with matching page, watermark, and metadata settings, then packages all generated files into a downloadable ZIP archive via JSZip."
  - question: "Are my uploaded photos or clipboard screenshots ever transmitted to an external server?"
    answer: "No. File decoding, Web Worker image compression, canvas cropping, pdf-lib object serialization, and PDF.js page previews execute entirely inside your browser's local memory sandbox. No raw image bytes or compiled PDFs leave your device."
features:
  - "Multi-format ingestion supporting JPG, PNG, WebP, GIF, BMP, drag-and-drop uploads, and direct system clipboard pasting"
  - "Precision MediaBox presets for A3, A4, A5, US Letter, US Legal, Auto pixel-fit, and custom millimeter dimensions"
  - "Five geometric placement modes (Fit, Fill, Stretch, Original, and Center) with independent portrait, landscape, or auto orientation"
  - "Web Worker image optimization presets (Original, High, Balanced, Compressed) plus per-image percentage cropping and 90-degree rotation"
  - "Vector text and PNG/JPEG logo watermarking with configurable color, point size, opacity, angle, headers, footers, and automatic page numbering"
  - "Custom PDF Document Info Dictionary fields (Title, Author, Subject, Keywords) with live PDF.js canvas preview and single-PDF or ZIP export"
useCases:
  - "Bundling mixed-format product photography (WebP, PNG, and JPG assets) into a watermarked client proof sheet with custom margins"
  - "Archiving pasted browser screenshots and bug captures into a paginated QA incident report with running headers and page numbers"
  - "Converting legacy Windows BMP diagrams and static GIF charts into standardized A4 technical appendices for print distribution"
  - "Batch-converting a folder of design deliverables into individual standalone PDFs packaged inside a single ZIP archive for client handoff"
  - "Preparing standardized US Letter or Legal exhibits with embedded Author, Subject, and Keyword metadata for document management indexing"
  - "Compressing oversized smartphone photos into email-friendly PDF portfolios using Balanced or Compressed Web Worker presets"
howToSteps:
  - "Drag and drop JPG, PNG, WebP, GIF, or BMP files onto the upload zone, select them from disk, or paste screenshots directly with Ctrl+V / Cmd+V."
  - "Reorder thumbnails by dragging cards across the grid, or use alphabetical and file-size sorting alongside per-image crop, rotate, and duplicate controls."
  - "Configure Page Size (A4, A3, A5, Letter, Legal, Auto, or custom mm), Orientation, Layout Mode, and Margins under the General tab."
  - "Select a Quality Preset matching your file-size budget and optionally enable running headers, footers, page numbers, or text/logo watermarks."
  - "Populate PDF Title, Author, Subject, and Keywords under the Metadata tab, inspect pages in the live PDF.js preview pane, and click Compile & Download."
---

Assembling heterogeneous raster assets into a print-ready document requires more than wrapping raw bytes inside a container. Visual workflows combine camera JPEGs, alpha-enabled PNGs, web-exported WebP files, indexed GIF frames, and uncompressed BMP bitmaps—each with distinct pixel densities and color encodings. NexusCalculator's Image to PDF compiler unifies these sources locally inside your browser using `pdf-lib`, Web Worker compression, and a live `PDF.js` preview canvas, outputting ISO 32000-1 documents with zero network transmission.

## Raster Normalization and PDF XObject Encoding

While web browsers ship decoders for WebP, GIF, and BMP, the PDF specification natively supports only narrow image stream filters—principally `DCTDecode` for JPEG bitstreams and `FlateDecode` for zlib-compressed pixel arrays (embedded PNGs). Injecting raw WebP or BMP bytes directly into a PDF `/XObject` stream creates an unreadable file.

To bridge that gap cleanly, each queued file runs through a deterministic two-stage normalization pass in browser memory:

1. **Web Worker Resampling**: Under `High`, `Balanced`, or `Compressed`, `browser-image-compression` offloads resizing and bitrate reduction to a background Web Worker, keeping the UI responsive while enforcing pixel and byte caps.
2. **Canvas Transform & Stream Serialization**: Each raster paints onto an offscreen HTML5 2D canvas applying user crop bounds (`0–100%`) and orthogonal rotation (`0°`, `90°`, `180°`, `270°`). PNG inputs under `Original` serialize losslessly via `pdfDoc.embedPng`, whereas other inputs and compressed presets serialize as baseline JPEG streams via `pdfDoc.embedJpg`.

If your source photographs carry sensitive camera serial numbers, timestamps, or GPS coordinates before normalization, you can inspect or strip them upfront with the [Image Metadata Remover](/en/tools/image-metadata-remover).

## Page Geometry, PostScript Points, and Scaling Modes

Every PDF page defines a coordinate grid measured in PostScript points (`1 pt = 1/72 inch = 0.352778 mm`). Standard paper presets map directly to exact ISO 216 and ANSI MediaBox dimensions: A4 (`595.28 × 841.89 pt`), A3 (`841.89 × 1190.55 pt`), A5 (`419.53 × 595.28 pt`), US Letter (`612 × 792 pt`), and US Legal (`612 × 1008 pt`). Custom dimensions entered in millimeters convert via `mm × 72 / 25.4`, while `Auto` page sizing derives page width and height from rotated image pixels multiplied by `72 / 96` (the standard CSS-pixel-to-point ratio).

### Layout Mode Behavior Across Aspect Ratios

Once margins (`0 pt`, `15 pt`, `36 pt`, `54 pt`, or custom millimeter offsets) carve out the printable client box (`clientW × clientH`), the engine compares `imgAspect = imgW / imgH` against `clientAspect = clientW / clientH` according to your chosen layout mode:

- **Fit**: Scales proportionally until the image touches either the horizontal or vertical margin bounds, centering any remaining whitespace with zero cropping or distortion.
- **Fill**: Scales proportionally to cover the entire client box edge-to-edge, allowing overhanging edges to bleed past the frame without altering aspect ratio.
- **Stretch**: Forces `drawW = clientW` and `drawH = clientH`, intentionally warping aspect ratio to eliminate whitespace on fixed-grid layouts.
- **Original**: Places the raster at native `72/96` point dimensions centered on the page—ideal for 1:1 UI mockups where scaling introduces resampling softness.
- **Center**: Renders at native size when smaller than the client box, automatically falling back to proportional `Fit` downscaling only if the image overflows page margins.

## Supported Image Formats and Compression Presets

Choosing the right quality preset governs both the Web Worker bounding limits and the final PDF stream filter:

| Input Format | Native Codec & Bit Depth | Embedded PDF Stream Filter | Recommended Preset | Compression Target Limits |
| :--- | :--- | :--- | :--- | :--- |
| **JPG / JPEG** | Lossy 8-bit DCT (YCbCr) | `/DCTDecode` | Balanced or High | Balanced: ≤ 1.0 MB, 1800 px max, Q 0.70 |
| **PNG** | Lossless DEFLATE (RGB/RGBA) | `/FlateDecode` (Original) or `/DCTDecode` | Original (UI/text) or High | Original: No downscale, Q 0.95 / lossless PNG |
| **WebP** | VP8 Lossy / VP8L Lossless | Normalized to `/DCTDecode` | High or Balanced | High: ≤ 3.0 MB, 2500 px max, Q 0.85 |
| **GIF** | 8-bit LZW Indexed (256 colors) | First frame normalized to `/DCTDecode` | Original or High | Preserves crisp flat graphics at Q 0.85–0.95 |
| **BMP** | Uncompressed DIB RGB array | Normalized to `/DCTDecode` | Balanced or Compressed | Compressed: ≤ 0.3 MB, 1200 px max, Q 0.45 |

## Branded Overlays, Metadata, and Batch Packaging

Beyond raw raster placement, the engine layers true PDF vector objects over every compiled page. Text headers, footers, and dynamic `Page X of N` counters render using embedded Type 1 `StandardFonts.Helvetica` vectors so page typography remains crisp at any zoom factor. Watermarks support either rotated vector text (with configurable hex color, point size, opacity, and tilt angle) or uploaded PNG/JPEG brand marks positioned over the page center. For stamping existing PDFs that are already compiled, use the dedicated [Watermark PDF](/en/tools/watermark-pdf) tool.

Document properties populated in the Metadata tab populate the PDF Trailer's Document Info Dictionary (`/Title`, `/Author`, `/Subject`, `/Keywords`), enabling macOS Spotlight, Windows Search, and enterprise DMS crawlers to index the exported file reliably. Switching Compilation Mode from `Single` to `Separate` compiles each queued image into an isolated PDF and streams all outputs into a single `.zip` bundle via `JSZip`.

## Auditing Output PDFs and Avoiding Common Print Pitfalls

Before sending a multi-image PDF to a commercial print shop or archival repository, developers and prepress operators can inspect the exact embedded image resolutions, color spaces, and encoding filters with Poppler's `pdfimages` and `pdfinfo` CLI utilities:

```bash
# Inspect Document Info metadata and exact MediaBox dimensions
pdfinfo converted-images.pdf

# List every embedded Image XObject, its encoding filter, and effective PPI
pdfimages -list converted-images.pdf
```

Watch out for three recurring visual pitfalls when assembling mixed-source compilations:

- **Low-PPI Upscaling**: Placing a `640 × 480 px` web thumbnail onto an A4 sheet in `Fit` mode stretches it to roughly 60 PPI, yielding visible pixelation in print. Switch to `Center` or `Auto` page sizing for small graphics.
- **Mixed Portrait and Landscape Batches**: Leaving Orientation locked to `Portrait` forces wide landscape charts into narrow horizontal bands. Setting Orientation to `Auto` rotates each page's MediaBox individually to match its image aspect ratio.
- **Oversized Archival Exports**: Compiling dozens of 12-megapixel phone images under the `Original` preset can quickly push file size past 25 MB email attachment caps. Either pick the `Balanced` preset before compiling or run a secondary optimization pass through [Compress PDF](/en/tools/compress-pdf).
