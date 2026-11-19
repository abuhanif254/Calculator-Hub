---
metaTitle: "Watermark PDF Online | Custom Text, Logo & Layer Stamps"
metaDescription: "Stamp PDFs with multi-layer text, PNG, JPG, or SVG watermarks. Control opacity, angle, and page ranges locally in your browser without uploads."
metaKeywords: "watermark pdf, add watermark to pdf, pdf watermark tool, pdf branding tool, pdf copyright protection, pdf stamp tool, pdf watermark creator, watermark pdf online, free pdf watermarker, add logo to pdf, copyright pdf documents, confidential stamp pdf"
title: "Watermark PDF"
shortDescription: "Apply customizable multi-layer text and logo watermarks to single or batch PDFs with exact opacity, rotation, and page-range targeting inside your browser."
faqs:
  - question: "Can I stack multiple watermarks on the same PDF page, such as a diagonal stamp and a footer logo?"
    answer: "Yes. The editor supports an unlimited stack of independent text and image layers. You can combine a translucent -45-degree CONFIDENTIAL diagonal stamp across the center with a crisp company logo or copyright notice anchored along the bottom margin in a single export pass."
  - question: "What image formats can I upload for a logo watermark, and is transparency preserved?"
    answer: "You can upload PNG, JPG/JPEG, SVG, and WebP logos. Native PNG files retain full alpha transparency via PDF /SMask streams, while SVG and WebP assets are converted locally through an offscreen HTML5 Canvas into transparent PNG bytes before embedding."
  - question: "How do I apply a watermark to specific pages instead of the entire document?"
    answer: "Use the page targeting selector to stamp all pages, first page only, last page only, odd or even spreads, a custom syntax range such as '1-3, 5, 8-12', or individually toggled pages inside the preview grid."
  - question: "Will watermarking degrade vector text or strip existing PDF metadata?"
    answer: "No. Text watermarks are appended as pure vector PDF drawing instructions using Standard 14 fonts, and existing page vectors remain untouched. You can also toggle the Preserve Metadata option to retain or clear Info dictionary fields like Title, Author, and Subject during export."
  - question: "Can a recipient remove a standard PDF watermark with an editing program?"
    answer: "Standard vector and image watermarks live inside the PDF content stream so your document remains crisp and searchable, which means advanced PDF editors can isolate and delete those stream objects. For tamper-resistant distribution, flatten the stamped PDF afterward so the watermark merges directly into page artwork."
features:
  - "Multi-layer compositing engine supporting simultaneous text stamps and transparent image/logo overlays"
  - "Full typographic controls across PDF Standard 14 families (Helvetica, Times, Courier) with bold, italic, size, color, line height, and rotation (-180° to +180°)"
  - "Native PNG/JPEG embedding plus automatic browser-side Canvas rasterization for SVG and WebP brand logos"
  - "Seven page-targeting modes: all, first, last, odd, even, custom ranges (e.g., 1-3, 7), and manual per-page checkboxes"
  - "Live PDF.js interactive preview with zoom, 8-point coordinate anchoring, custom X/Y percentages, and point offsets"
  - "Batch multi-PDF stamping up to 150 MB per file with customizable {filename} output templates and ZIP archive export"
useCases:
  - "Stamping draft legal agreements, architectural bids, and clinical proposals with translucent diagonal DRAFT or CONFIDENTIAL banners"
  - "Adding subtle corporate logos and bottom-margin copyright notices across multi-chapter whitepapers, ebooks, and training manuals"
  - "Applying unique recipient identifiers or COPY markers to pre-release investor decks and M&A due-diligence files"
  - "Branding photography portfolios, real estate brochures, and design proofs with scaled semi-transparent SVG or PNG marks"
  - "Watermarking only odd or even pages—or skipping cover sheets via custom page ranges—when preparing duplex-printed handouts"
  - "Batch-stamping entire folders of vendor specification sheets locally without exposing unpublished product specs to external cloud services"
howToSteps:
  - "Drag and drop one or more PDF files (up to 150 MB each) into the workspace to render live page previews."
  - "Start from a one-click preset (Confidential, Draft, Sample, Approved, Copy, Copyright) or configure a custom text or image watermark layer."
  - "Adjust font family, opacity (10% to 100%), rotation angle, scale, anchor position, and fine X/Y point offsets while inspecting the live preview."
  - "Add extra layers if you want to combine a centered diagonal text stamp with a corner logo or footer notice."
  - "Choose your page targeting mode (All, First, Last, Odd, Even, Custom Range, or Selected Pages) and set your output filename pattern."
  - "Click Apply Watermark to compile the PDFs locally in your browser and download the stamped document or batch ZIP bundle."
---

Distributing unbranded drafts, pre-release proposals, or copyrighted technical manuals invites version confusion and unauthorized reuse. **Watermark PDF** embeds vector typography and transparent logo graphics directly into PDF page content streams inside your browser—delivering multi-layer precision, exact opacity control, and batch stamping across documents up to 150 MB without sending proprietary files over the network.

## PDF Graphics State, Opacity, and Vector Rendering

Rather than converting your entire document into blurry page bitmaps, **Watermark PDF** appends structured drawing commands directly to each targeted page's content stream via `pdf-lib`. In **ISO 32000**, every visual stamp executes inside an isolated graphics state block delimited by `q` (push graphics state) and `Q` (pop graphics state) so transparency, rotation, and color changes never bleed into the underlying document's text or illustrations.

Opacity values from `0.1` to `1.0` are encoded through an Extended Graphics State (`/ExtGState`) resource dictionary using `/ca` (non-stroking alpha constant) and `/CA` (stroking alpha constant). Because PDF renderers composite alpha natively in floating-point color space, a `0.20` opacity red `CONFIDENTIAL` banner remains legible while keeping dense legal clauses or financial tables underneath completely readable.

### Affine Rotation Matrices and Coordinate Anchoring

Rotating text or an image by angle $\theta$ (from $-180^\circ$ to $+180^\circ$) applies a 2D affine Current Transformation Matrix (`cm` operator) in PDF User Space (72 points per inch, origin at bottom-left):

$$\begin{bmatrix} \cos\theta & \sin\theta & 0 \\ -\sin\theta & \cos\theta & 0 \\ t_x & t_y & 1 \end{bmatrix}$$

Inside the compiled page content stream, a centered diagonal text watermark translates roughly to the following operator sequence:

```pdf
q                           % Save current graphics state
/GS_Alpha20 gs              % Apply ExtGState with /ca 0.20 opacity
0.937 0.267 0.267 rg        % Set RGB fill color (#EF4444)
BT                          % Begin text object
  /F_HelvBold 60 Tf         % Select embedded Standard 14 Helvetica-Bold at 60 pt
  0.707 -0.707 0.707 0.707 184 520 cm   % Rotate -45 deg and translate (tx, ty)
  (CONFIDENTIAL) Tj         % Paint vector glyph string
ET                          % End text object
Q                           % Restore graphics state cleanly
```

Because positioning recalculates `baseX` and `baseY` against each individual page's `MediaBox` (`page.getSize()`), anchors like `center`, `top-right`, `bottom-center`, or `custom` (`0–100%` coordinates plus exact point offsets `offsetX` / `offsetY`) remain geometrically aligned even inside hybrid PDFs that mix portrait US Letter sheets (`612 × 792 pt`) with landscape A4 diagrams (`841.89 × 595.28 pt`).

## Standard 14 Fonts vs. Raster Image Watermark Layers

Selecting the right layer format controls both visual crispness and final file weight, especially on 200-page reports.

| Watermark Layer Format | Underlying PDF Encoding | Transparency Support | Zoom Sharpness | Per-File Size Overhead | Best Use Case |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Standard 14 Text (Helvetica, Times, Courier)** | Vector Type 1 font reference + text operators | Native `/ExtGState` alpha | Infinite (pure vector) | Negligible (~1–3 KB total) | Diagonal `DRAFT` / `CONFIDENTIAL` stamps, legal copyright footers |
| **PNG Image Logo** | `/FlateDecode` RGB stream + separate `/SMask` alpha stream | Full 8-bit alpha channel | Resolution-dependent | Shared single XObject across all pages | Transparent brand logos, official seals, signature emblems |
| **JPEG Image Stamp** | Direct `/DCTDecode` stream passthrough | Uniform layer opacity only (no per-pixel alpha) | Resolution-dependent | Smallest raster footprint; shared XObject | Rectangular badges, photographic marks on solid backgrounds |
| **SVG / WebP Upload** | Client-side HTML5 Canvas rasterization -> PNG `/SMask` | Full alpha preserved during conversion | High-DPI rasterized snapshot | Single shared PNG XObject per document | Modern web brand kits exported as `.svg` or `.webp` |

One major structural advantage of PDF XObjects is **resource deduplication**: when you apply a 120 KB transparent PNG company logo across a 300-page catalog, the image bytes are embedded **once** in the document's object table and merely referenced (`Do` operator) on each page, avoiding 300× file bloat.

## Precision Page Targeting and Mixed-Dimension Layouts

Real publishing workflows rarely stamp every page uniformly—cover artwork, full-bleed appendices, or signature pages often need to remain clean. The page selector compiles target zero-based page indices per file using seven modes:

- **Structural presets:** `all`, `first` (cover stamp), `last` (back-page notice), `odd`, and `even` (ideal for mirrored duplex binding margins).
- **Range syntax parser:** Accepts comma-separated pages and hyphenated spans such as `1-3, 5, 10-14`—automatically deduplicating overlaps, sorting ascending indices, and safely clamping out-of-bounds page numbers.
- **Per-page manual selection:** Lets you toggle individual pages on or off directly from the loaded document overview.

If your publication also needs sequential folios alongside its watermark stamp, run the clean output through [Add Page Numbers to PDF](/en/tools/add-page-numbers-pdf) so header/footer typography stays visually balanced.

## Batch Stamping, Metadata Preservation, and Naming Templates

Queueing multiple PDFs applies your full layer stack consistently across every document in one run. You can customize output filenames using the `{filename}` token (defaulting to `{filename}_watermarked`) and decide whether to keep existing `/Info` dictionary fields (`Title`, `Author`, `Subject`, `Creator`) via the **Preserve Metadata** toggle. When stamping large image-heavy decks for email delivery, follow up with [Compress PDF](/en/tools/compress-pdf) to trim redundant object streams before sending.

## Security Boundaries: Visual Deterrence vs. Tamper Resistance

Vector and XObject watermarks keep text selectable, file sizes compact, and typography razor-sharp—making them the gold standard for branding and version control. However, because the watermark commands reside as clean appended operators inside the page content stream, a determined user with Illustrator, Acrobat Pro, or a command-line script can isolate and strip that layer. Whenever a watermark must act as a tamper-resistant visual deterrent on external review copies, bake the layers permanently into the page artwork using [Flatten PDF](/en/tools/flatten-pdf) before distribution.
