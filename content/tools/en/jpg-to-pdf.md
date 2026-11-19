---
metaTitle: "JPG to PDF Converter: Combine Photos & N-Up Grids Locally"
metaDescription: "Combine JPG, JPEG, PNG, and WebP photos into a compact PDF right in your browser. Crop, rotate, tune JPEG quality, and build 2-up or 4-up grids."
metaKeywords: "jpg to pdf, jpeg to pdf, convert jpg to pdf, photo to pdf, merge jpg into pdf, images per page pdf, n-up photo pdf, free jpg to pdf converter, secure offline jpg to pdf"
title: "JPG to PDF Converter"
shortDescription: "Compile JPG, PNG, and WebP photographs into compact, print-aligned PDF documents in your browser with custom JPEG quality scaling, interactive cropping, and 1-up, 2-up, or 4-up page grids."
faqs:
  - question: "How does the 2-up and 4-up Images Per Page layout arrange photographs on each sheet?"
    answer: "Selecting 2 images per page divides the printable area inside your margins into a 1-column by 2-row vertical stack. Selecting 4 images per page creates a balanced 2x2 contact sheet grid. Each photograph is independently scaled and centered within its own grid cell so aspect ratios remain undistorted."
  - question: "Why can setting JPEG quality to 100% produce a larger PDF than the original JPG files?"
    answer: "Re-encoding an existing lossy JPEG through an HTML5 canvas at 100% quality disables aggressive high-frequency quantization, forcing the encoder to preserve existing compression noise at a higher bitrate. For standard camera photos, High (85%) or Balanced (65%) delivers near-identical sharpness at a fraction of the byte size."
  - question: "Can I mix portrait and landscape photographs in the same JPG to PDF batch?"
    answer: "Yes. When Orientation is set to Auto, the compiler evaluates the post-rotation width and height of the first image assigned to each page and dynamically switches that page between portrait and landscape dimensions before rendering."
  - question: "How does the interactive Crop tool affect original file resolution?"
    answer: "The crop editor maps your percentage-based bounding handles (left, right, top, bottom) directly onto the image's full naturalWidth and naturalHeight pixel coordinates rather than the scaled preview thumbnail. Only the selected sub-region is extracted onto an offscreen canvas at 0.95 JPEG quality."
  - question: "Does the live PDF preview require uploading my photos to a cloud rendering service?"
    answer: "No. Every preview refresh compiles a real binary PDF byte array locally via jsPDF and renders the pages directly onto an HTML5 canvas using PDF.js in your browser. Your photos and metadata stay strictly on your own machine."
features:
  - "Native jsPDF document engine with real-time PDF.js canvas preview and page-by-page zoom inspection"
  - "Multi-photo N-up grid composition supporting 1, 2 (1x2 vertical), or 4 (2x2 contact sheet) images per PDF page"
  - "Granular JPEG quantization presets (Max 100%, High 85%, Balanced 65%, Compressed 40%) plus a custom 10% to 100% quality slider"
  - "Interactive percentage-bounded canvas crop editor, 90-degree incremental rotation, item duplication, and drag-and-drop sequence sorting"
  - "One-click alphabetical and file-size queue sorting paired with ISO (A3, A4, A5), US (Letter, Legal), and custom millimeter page sizes"
  - "Local conversion history log and embedded PDF document properties for Title, Author, Subject, and Keywords"
useCases:
  - "Creating 4-up photographic inspection reports and real-estate contact sheets for compact office printing"
  - "Compiling photographed receipts, whiteboard notes, and expense slips into a single monthly reimbursement PDF"
  - "Submitting multi-page handwritten assignments or portfolio boards in standardized A4 or US Letter format"
  - "Packaging high-resolution DSLR or smartphone product shots into email-ready PDF lookbooks under strict megabyte limits"
  - "Cropping distracting edges off photographed certificates and IDs before assembling an application packet"
  - "Organizing chronologically named camera exports with alphabetical sorting into a cleanly sequenced travel or event booklet"
howToSteps:
  - "Drop JPG, JPEG, PNG, or WebP photos into the workspace or browse local folders to load multiple images into the visual queue."
  - "Drag photo cards into your desired sequence, or sort the entire batch alphabetically or by file size; crop or rotate individual shots as needed."
  - "Choose your target Page Size (A4, A3, A5, Letter, Legal, or Custom mm), Orientation (Auto, Portrait, or Landscape), and Margin preset."
  - "Pick an Images Per Page grid (1, 2, or 4) and tune JPEG compression using Max, High, Balanced, Compressed, or the custom 10-100% slider."
  - "Enter optional PDF metadata and filename, verify pagination and zoom in the live PDF.js preview panel, and click Download PDF."
---

Photographs captured on smartphones and digital cameras optimize for continuous-tone color depth rather than fixed pagination. Wrapping a sequenced set of shots—whether a 4-up field inspection sheet, portfolio lookbook, or photographed paperwork—into a reliable PDF demands precise control over quantization, grid geometry, and page orientation. NexusCalculator's JPG to PDF Converter compiles JPG, PNG, and WebP photos locally inside your browser via `jsPDF`, combining interactive cropping, N-up multi-image grids, granular JPEG quality tuning, and live `PDF.js` previews with zero uploads.

## How DCTDecode Streams and JPEG Re-Quantization Affect PDF Size

Inside PDF files, continuous-tone photographs live inside Image XObject streams using the `/DCTDecode` filter, corresponding directly to Baseline JPEG Discrete Cosine Transform compression. Because each queued photo renders through a local HTML5 2D canvas to apply cropping and 90-degree rotations before entering `jsPDF`, the canvas `toDataURL("image/jpeg", quality)` step controls the exact quantization matrix applied across every 8×8 pixel block.

Lowering the quality parameter widens quantization steps in high-frequency luminance and chrominance channels (typically using 4:2:0 chroma subsampling). That trade-off explains why dialing quality down from `100%` to `85%` frequently cuts PDF byte size by 50–65% with virtually imperceptible differences on photographic textures, whereas pushing below `40%` introduces visible 8×8 macroblocking around high-contrast edges and small printed lettering.

If your source photographs come straight from an Apple device in `.heic` / `.heif` format, convert them first using [HEIC to JPG](/en/tools/heic-to-jpg) before compiling your PDF sequence.

## Designing 1-Up, 2-Up, and 4-Up Multi-Photo Page Grids

Standard single-image converters force one photograph onto every page, wasting paper and bloating multi-photo reports. Here, the `Images Per Page` layout engine subdivides the printable client area (`activeWidth - 2 × marginPt` by `activeHeight - 2 × marginPt`) into uniform geometric cells:

- **1 Image Per Page (`1×1`)**: Dedicates the entire margin-bounded frame to a single hero photo, certificate, or full-page scan.
- **2 Images Per Page (`1×2` vertical stack)**: Splits each sheet into two stacked horizontal bands—ideal for comparing before-and-after site photos or pairing front-and-back document shots.
- **4 Images Per Page (`2×2` contact sheet)**: Arranges up to four photos per sheet in two columns and two rows, cutting physical print consumption by 75% for proof sheets and evidence logs.

Within each grid cell, `Fit` mode guarantees complete visibility by computing `cellAspect = cellWidth / cellHeight` and centering the photo along the shorter axis, `Fill` mode maximizes coverage across the cell boundary, and `Original` mode respects native pixel-to-point bounds while scaling down automatically if a high-megapixel image exceeds its assigned cell.

## JPEG Quality Presets and Effective Print Resolution Matrix

Selecting a quality tier balances visual fidelity against attachment ceilings and print sharpness:

| Quality Preset | Canvas Q Factor | Typical Payload (12 MP Photo) | Visual Artifact Profile | Best-Fit Workflow |
| :--- | :--- | :--- | :--- | :--- |
| **Max** | `1.00` (100%) | 2.8 – 4.5 MB / photo | Minimal quantization; preserves sensor grain | Archival photo proofs and fine-art printouts |
| **High** | `0.85` (85%) | 0.9 – 1.6 MB / photo | Clean edges; negligible chroma loss | Client decks, real-estate packets, high-detail print |
| **Balanced** | `0.65` (65%) | 0.45 – 0.85 MB / photo | Slight softening on micro-text; smooth photos | Everyday office reports, multi-photo PDFs, web sharing |
| **Compressed** | `0.40` (40%) | 0.18 – 0.38 MB / photo | Mild 8×8 blocking in flat skies and sharp text | Email-constrained batches (20+ photos under 10 MB) |
| **Custom** | `0.10 – 1.00` | Linearly tunable | User-controlled via live PDF.js preview | Strict portal upload limits (e.g., 2 MB government forms) |

### Calculating Effective Print PPI on Multi-Image Sheets

Because PDF placement happens in physical PostScript points (`72 pt = 1 inch`), shrinking a photo into a 4-up grid cell actually *increases* its effective print density (PPI). You can verify whether your photos meet commercial 300 PPI print standards before exporting using this quick calculation:

```javascript
// Effective print density for a placed image in a jsPDF grid cell
const placedWidthInches = targetWidthPt / 72;
const effectivePPI = naturalImageWidthPx / placedWidthInches;

// Example: 3000px wide camera photo placed inside one quadrant of an A4 page (262 pt wide)
// placedWidthInches = 262 / 72 = 3.64 in  =>  effectivePPI = 3000 / 3.64 ≈ 824 PPI
```

Even a modest `1200 × 900 px` smartphone photo exceeds 300 PPI when placed in a 4-up A4 grid, meaning you can safely pre-downscale massive 48 MP camera exports with [Compress Image](/en/tools/compress-image) before assembling multi-dozen photo sheets to keep browser memory usage low.

## Cropping, Rotation, Orientation Detection, and Batch Sorting

Raw photos rarely arrive in perfect print framing. Clicking the crop control opens a dedicated canvas editor whose percentage bounds (`cropLeft`, `cropRight`, `cropTop`, `cropBottom`) map back to the source image's full `naturalWidth` and `naturalHeight`, extracting a full-resolution cropped blob without degrading pixel density. Incremental 90-degree rotation updates the effective aspect ratio dynamically, which feeds directly into `Auto` orientation detection so rotated landscape shots automatically trigger landscape PDF pages (`activeWidth = pageHeightPt`, `activeHeight = pageWidthPt`).

For sequential batches exported from digital cameras (`IMG_001.jpg`, `IMG_002.jpg`), the one-click alphabetical sort restores chronological ordering immediately, while HTML5 drag-and-drop cards let you rearrange cover images manually. Each layout change debounces cleanly into the live `PDF.js` preview panel so you can step through pages and zoom in on margins before downloading.

## Preventing Generation Loss, Color Shifts, and Margin Clipping

When preparing final photographic PDFs, keep three technical edge cases in mind:

- **Avoid Repeated Re-Saving Cycles**: Every JPEG encode-decode cycle compounds quantization loss. Keep your original JPG files intact as masters, and if you later need individual frames extracted from an existing PDF, use [PDF to JPG](/en/tools/pdf-to-jpg) instead of screenshotting a viewer window.
- **Account for Physical Printer Margins**: Selecting `None (0 pt)` margins enables edge-to-edge digital slides, but most office laser and inkjet printers enforce a `12–18 pt` (`4–6 mm`) non-printable hardware margin. Use `Small (15 pt)` or `Medium (36 pt)` when compiling sheets meant for physical paper output.
- **Transparency on PNG/WebP Inputs**: Because JPEG streams cannot encode an alpha channel, transparent pixels from PNG or WebP files flatten onto the opaque canvas background during JPEG serialization. When true alpha preservation is required, embed source PNGs losslessly rather than transcoding to DCT.
