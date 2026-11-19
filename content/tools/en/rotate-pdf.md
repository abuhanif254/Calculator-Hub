---
metaTitle: "Rotate PDF Pages Permanently Online | Private & Free"
metaDescription: "Rotate individual or batch PDF pages 90, 180, or 270 degrees permanently in your browser. Zero uploads, lossless /Rotate updates, instant ZIP export."
metaKeywords: "Rotate PDF, PDF Rotator, Rotate PDF Pages, Fix PDF Orientation, PDF Page Rotation Tool, rotate PDF online, free PDF rotator, delete PDF rotation, rotate scanned PDF pages, PDF document cleanup, rotate landscape pages, rotate portrait pages"
title: "Rotate PDF"
shortDescription: "Rotate individual pages or entire PDF documents permanently in your browser using lossless ISO 32000 page-dictionary updates with zero server uploads."
faqs:
  - question: "Does rotating a PDF reduce image quality or rasterize selectable text?"
    answer: "No. This tool updates the integer /Rotate entry inside each target Page Object dictionary and re-serializes the document using pdf-lib. Embedded JPEG/FlateDecode images, vector paths, and selectable text streams remain completely untouched."
  - question: "Why did my PDF revert to sideways after rotating it in a standard browser viewer?"
    answer: "Built-in browser viewers only apply a temporary viewport transform for display and never write the updated /Rotate angle back to disk. Exporting through Rotate PDF writes the new multiple-of-90 angle permanently into the binary PDF structure."
  - question: "How do I rotate only the sideways landscape pages in a mixed portrait report?"
    answer: "Load your PDF and click the Landscape orientation filter in the selection toolbar. The tool measures every page viewport aspect ratio via PDF.js, selects only pages where width exceeds height, and lets you rotate them together in one click."
  - question: "Can I batch-rotate multiple PDF documents at once?"
    answer: "Yes. Drop multiple PDF files into the workspace, switch between them to adjust per-page or whole-document orientations, configure an optional filename pattern such as {filename}_rotated, and export all processed documents in a single ZIP archive."
  - question: "What happens if my PDF already had a 90-degree or 270-degree rotation stored internally?"
    answer: "During compilation, the tool reads each page's existing /Rotate angle and computes the modular sum (originalAngle + offsetAngle) % 360. This guarantees the final saved orientation matches your on-screen preview regardless of inherited viewer metadata."
features:
  - "Lossless ISO 32000 /Rotate page-dictionary mutation with compressed object streams (useObjectStreams)"
  - "Lazy-rendered PDF.js thumbnail grid via IntersectionObserver for smooth handling of large packets"
  - "Smart orientation and parity filters for Landscape, Portrait, Odd, Even, and Inverted selections"
  - "Bidirectional page-range parser supporting expressions like 1-3, 5, 7-8 alongside Shift-click selection"
  - "Per-file Undo/Redo rotation stacks plus keyboard shortcuts (ArrowLeft, ArrowRight, Delete, Ctrl+S)"
  - "Multi-PDF batch queue with custom {filename}/{date} naming templates, metadata toggle, and ZIP export"
useCases:
  - "Correcting upside-down or 90-degree sideways sheets from duplex office ADF scanners"
  - "Normalizing landscape CAD drawings, Gantt charts, and wide spreadsheets inserted into portrait reports"
  - "Fixing rotated mobile receipt captures and field inspection photos before expense filing"
  - "Standardizing legal discovery bundles and court exhibits prior to Bates stamping or archiving"
  - "Batch-orienting multi-file supplier invoice packs locally without violating GDPR or HIPAA data policies"
  - "Resetting broken /Rotate flags left behind by legacy print-to-PDF drivers before print imposition"
howToSteps:
  - "Drag and drop one or more PDF files into the browser workspace, or click to select local files."
  - "Inspect the rendered thumbnail grid and highlight target pages by clicking thumbnails, holding Shift for ranges, typing a range such as 2-6, 9, or using the Landscape, Portrait, Odd, or Even filters."
  - "Apply 90-degree clockwise, 90-degree counter-clockwise, or 180-degree turns using the toolbar, hover buttons on individual thumbnails, or Left and Right arrow keys."
  - "Optionally customize the output filename pattern (such as {filename}_{date}) and toggle Info-dictionary metadata preservation."
  - "Click Rotate PDF (or press Ctrl+S) to compile the updated binary locally and download the resulting PDF or batch ZIP archive."
---

Misoriented pages create constant friction in document workflows. Duplex document feeders invert backsides, spreadsheet exports flip wide tables sideways, and mobile scanners record portrait captures with conflicting orientation flags. Turning a page inside a browser viewer only rotates your temporary screen viewport—once emailed or ingested downstream, every page snaps back. **Rotate PDF** writes permanent page-orientation metadata directly inside your browser using `pdf-lib` and `PDF.js`, keeping confidential files off external servers.

## How the PDF /Rotate Key Changes Orientation Without Re-Encoding

Under ISO 32000-1 and ISO 32000-2, a PDF organizes content as a directed graph of indirect objects anchored by a `/Catalog` and a `/Pages` tree. Each leaf Page Object dictionary links its `/Contents` drawing streams, `/Resources`, `/MediaBox`, and an optional integer entry named `/Rotate`. When rendering, viewers read `/Rotate` (inheriting from an ancestor `/Pages` node if omitted, or defaulting to `0`). The specification requires `/Rotate` to be an integer multiple of 90—`0`, `90`, `180`, or `270`—indicating clockwise degrees applied to the page coordinate space.

### Modular Angle Composition vs. Destructive Rasterization

Naive scripts fix PDF orientation by rasterizing pages into bitmaps, rotating the pixels, and re-wrapping them inside a new PDF—destroying vector sharpness, stripping searchable text, and inflating file size. Rotate PDF instead keeps preview and serialization decoupled. Thumbnails render lazily via `IntersectionObserver` using lightweight CSS `transform: rotate()` animations for instant feedback, then export loads the raw `ArrayBuffer` into `pdf-lib` and computes each page's modular sum:

```text
finalAngle = (existingRotate + relativeDelta) mod 360
```

Because only the dictionary entry changes and the document saves with PDF 1.5+ compressed object streams (`useObjectStreams: true`), embedded font subsets, vector curves, and FlateDecode or DCTDecode image streams pass through byte-for-byte with zero generational loss.

### Inspecting Page Dictionary Mutations

Running a 90-degree clockwise turn on an unrotated US Letter page mutates the Page Object dictionary cleanly:

```pdf
% Before: implicit /Rotate 0
14 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 22 0 R >> endobj

% After: permanent 90° clockwise /Rotate entry
14 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Rotate 90 /Contents 22 0 R >> endobj
```

Notice that `/MediaBox [0 0 612 792]` does not swap its width and height numbers when `/Rotate 90` is written; instead, compliant renderers rotate the coordinate axes clockwise when presenting the page, producing a visual 792 × 612 landscape canvas. If you also need to trim excess white scanner borders after fixing orientation, follow up with [PDF Crop Pages](/en/tools/pdf-crop-pages).

## Rotation Angles, Axis Swaps, and Viewer Behavior

Understanding how each `/Rotate` value maps to visual dimensions and downstream printing prevents surprises when combining rotated documents with other tools:

| `/Rotate` Value | Visual Direction | Effect on 612 × 792 pt Sheet | Unrotated Origin `(0, 0)` Moves To | Typical Repair Scenario |
| :--- | :--- | :--- | :--- | :--- |
| `0` | Upright (default) | 612 × 792 pt (Portrait) | Bottom-left corner | Resetting previously misflagged pages |
| `90` | 90° clockwise | 792 × 612 pt (Landscape) | Top-left corner | Fixing spreadsheets rotated counter-clockwise |
| `180` | Upside down | 612 × 792 pt (Portrait) | Top-right corner | Correcting inverted duplex ADF backsides |
| `270` | 90° counter-clockwise | 792 × 612 pt (Landscape) | Bottom-right corner | Turning landscape blueprints saved sideways left |

## Selecting Pages Efficiently in Mixed-Orientation Packets

Long scanned contracts and engineering submittals rarely require a uniform global turn—often only appendix diagrams or even-numbered duplex pages are misaligned. When a file loads, the workspace reads each page's viewport dimensions (`viewport.width > viewport.height`) and builds an orientation index alongside your selection state.

- **Orientation and parity filters**: Target all `Landscape`, `Portrait`, `Odd`, or `Even` pages in one click, or invert an active selection to isolate exceptions.
- **Bidirectional range syntax**: Clicking thumbnails (or Shift-clicking between two endpoints) updates the range box automatically into compact notation such as `1-3, 5, 11-14`; typing a custom range immediately syncs back to the visual checkboxes.
- **Keyboard-driven triage**: With pages selected, press `ArrowLeft` for 90° counter-clockwise, `ArrowRight` for 90° clockwise, `Delete` to clear unsaved turns on selected pages, and `Ctrl+S` to export immediately. Every adjustment pushes to a per-file Undo/Redo stack so mistakes reverse cleanly.

If your cleanup workflow also requires reordering chapters, duplicating dividers, or deleting blank separator sheets alongside rotation, use [Organize PDF](/en/tools/organize-pdf) for full structural page rearrangement.

## Troubleshooting Rotated Annotations, Duplex Scans, and Legacy Print Drivers

While updating `/Rotate` is the cleanest, ISO-compliant method for permanent orientation fixes, three real-world edge cases deserve attention:

1. **Password-protected documents**: Encrypted PDFs with restricted modification permissions cannot be re-serialized cleanly until decrypted. If the parser flags a locked file, strip its restriction first using [Unlock PDF](/en/tools/unlock-pdf) before applying orientation changes.
2. **Duplex tumble mismatches**: Duplex scanners configured for short-edge binding flip every even page 180 degrees relative to long-edge reading order. Select **Even Pages**, apply a single `180°` flip, and verify consecutive spreads before saving.
3. **Interactive form widgets and stamp annotations**: Interactive AcroForm fields carry an independent `/MK << /R angle >>` appearance rotation dictionary. Modern viewers automatically align most widgets with the page's `/Rotate` value, though certain legacy government forms hardcode field rotations and should be spot-checked after export.

### Verifying Saved Orientation from the Command Line

Developers integrating rotated PDFs into automated publishing or archival pipelines can confirm persisted `/Rotate` values using `pdfinfo` (Poppler) or `qpdf`:

```bash
# Inspect per-page dimensions and persisted /Rotate angles
pdfinfo -f 1 -l 10 report_rotated.pdf | grep -E "Page.*(size|rot)"

# Optional: bake /Rotate into page content matrices if a legacy RIP ignores /Rotate
qpdf --rotate=+0:1-z --flatten-rotation report_rotated.pdf report_normalized.pdf
```

Because every byte is parsed and re-written inside local browser RAM—and optional Info-dictionary fields (Title, Author, Creator, Subject, Producer) can be preserved or cleared before download—sensitive contracts, medical charts, audit workpapers, and architectural sets remain strictly on your device throughout single-file or multi-PDF ZIP exports.
