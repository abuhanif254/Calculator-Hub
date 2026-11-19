---
metaTitle: "Edit PDF Online Locally | Annotate, Draw & Sign PDFs"
metaDescription: "Add text, vector shapes, freehand ink, images, sticky notes, and signatures to PDFs right in your browser. Reorder pages privately with zero uploads."
metaKeywords: "Edit PDF, PDF editor, online PDF editor, add text to PDF, annotate PDF, highlight PDF, sign PDF, modify PDF, PDF productivity, free PDF editor, draw on PDF, insert image into PDF"
title: "Edit PDF"
shortDescription: "Annotate, draw, sign, insert images and text, search content, and reorder pages in PDF documents directly inside your browser with 100% local compilation."
faqs:
  - question: "Can I edit existing paragraphs in a PDF like a Word document?"
    answer: "PDF files store fixed-position glyph coordinates rather than reflowable text paragraphs. Edit PDF lets you place new text boxes anywhere on the page and cover existing lines with opaque white masks, though long prose revisions are best performed in the original word processor before re-exporting to PDF."
  - question: "Is covering sensitive text with a white box or shape inside Edit PDF secure redaction?"
    answer: "No. Drawing a white rectangle over original text only hides it visually; the underlying characters remain intact inside the PDF content stream and can still be copied or extracted programmatically. Use a dedicated Redact PDF tool whenever confidential information must be permanently purged."
  - question: "What signature creation methods are built into the PDF editor?"
    answer: "The signature modal offers three local workflows: freehand drawing on an HTML5 canvas, typing your name rendered in a calligraphic script typeface, or uploading an existing transparent PNG or JPEG scan of your handwritten signature."
  - question: "How does Edit PDF protect my edits if I accidentally close or refresh my browser tab?"
    answer: "Every edit action pushes a snapshot onto a 50-level Undo/Redo history stack (Ctrl+Z / Ctrl+Y) and automatically saves your annotation object array and page ordering into localStorage so work-in-progress layouts can be recovered locally."
  - question: "Can I reorder, rotate, duplicate, or delete pages while annotating the same document?"
    answer: "Yes. The thumbnail sidebar supports drag-and-drop page reordering, per-page 90-degree rotation, page duplication, and deletion. Moving or removing a page automatically remaps all overlay objects to follow their corresponding page index cleanly."
features:
  - "Full vector annotation suite: text boxes, rectangles, ellipses, lines, arrowheads, checkmarks, crossmarks, and freehand pencil/marker paths"
  - "Three-mode local signature studio (Draw, Type, Upload) plus PNG and JPEG image embedding via pdf-lib"
  - "Interactive page manager supporting drag-and-drop reordering, 90-degree rotation, duplication, and deletion"
  - "Object layer stack controls (Bring to Front, Send to Back, Move Up/Down) and full-text PDF.js search across pages"
  - "50-step Undo/Redo history, Copy/Paste clipboard (Ctrl+C/Ctrl+V), Delete, Ctrl+S export, and localStorage draft autosave"
  - "Rotation-aware coordinate normalization that burns percentage-placed overlays accurately into ISO 32000 content streams"
useCases:
  - "Filling out non-interactive PDF onboarding packets, tax worksheets, and vendor registration forms"
  - "Marking up engineering blueprints, UI wireframes, and marketing proofs with arrows, callouts, and sticky notes"
  - "Adding handwritten or typed signatures, dates, and company logos to client proposals and NDAs locally"
  - "Reviewing multi-page contracts with full-text search, checkmarks, crossmarks, and margin commentary"
  - "Assembling custom client decks by duplicating template pages, dropping obsolete slides, and rotating charts"
  - "Annotating confidential medical, HR, or legal PDFs in air-gapped or compliance-restricted browser sessions"
howToSteps:
  - "Drag and drop a PDF file into the editor workspace (or click to browse) to parse pages locally with PDF.js and pdf-lib."
  - "Choose a tool from the top toolbar: Select, Text, Shapes (Rectangle, Ellipse, Line, Arrow, Checkmark, Crossmark), Pencil/Marker, Sticky Note, Image, or Signature."
  - "Customize stroke width, fill and border colors, opacity, font size, and object rotation; manage overlapping items in the Layers sidebar tab."
  - "Use the Thumbnails sidebar to drag-reorder, rotate, duplicate, or delete pages, or switch to the Search tab to locate text across the entire document."
  - "Use Ctrl+Z/Ctrl+Y for undo/redo and Ctrl+C/Ctrl+V to duplicate annotations across pages."
  - "Click Export PDF (or press Ctrl+S) to compile your reordered pages and vector/image overlays into a fresh local PDF download."
---

Unlike `.docx` or HTML files, PDFs were engineered as fixed-layout digital paper designed to render identically on every screen and press. That immutability makes PDFs indispensable for contracts and engineering packets, yet awkward whenever you need to type into a flat form, mark a revision with an arrow, place a signature, or reorder misplaced pages. **Edit PDF** pairs a `PDF.js` canvas stage with a `pdf-lib` binary compiler directly inside your browser so you can annotate, sign, and restructure files privately with zero cloud uploads.

## Why Editing a PDF Differs Fundamentally from Editing a Word Processor File

Inside a PDF file, there is no paragraph flow or responsive grid. Every text run lives inside a compressed `/FlateDecode` content stream as explicit positioning operators (`Td`, `Tm`) followed by character-code strings (`Tj`, `TJ`). Changing a sentence in place does not reflow subsequent lines—doing so would collide with adjacent glyphs or shatter multi-column layouts.

To guarantee consistent visual output across files produced by LaTeX, Illustrator, CAD software, or office scanners, Edit PDF relies on a **non-destructive two-layer pipeline**:

1. **Interactive Canvas Stage (`PDF.js`)**: Renders pages from `50%` to `200%` (plus `Fit Width` and `Fit Page`), extracts searchable text via `page.getTextContent()`, and tracks draggable, resizable overlay objects in resolution-independent percentage coordinates `(0%–100%)`.
2. **Binary Compiler (`pdf-lib`)**: On export, the engine builds a clean destination `PDFDocument`, copies source pages in your modified `pagesOrder`, writes per-page `/Rotate` updates, and draws each overlay directly into the page content stream.

## Mapping Interactive Canvas Objects to Native PDF Primitives

Rather than flattening your whole workspace into a heavy, blurry raster image, the export engine translates each annotation object into its closest ISO 32000 vector or image primitive:

| Editor Tool / Object | Serialized PDF Primitive | Styling & Transparency Support | Post-Export Sharpness & Behavior |
| :--- | :--- | :--- | :--- |
| **Text Box (`text`)** | `drawText` (`BT ... Tj ET`, Standard Helvetica) | Font size, hex `DeviceRGB` color, arbitrary degree rotation | Selectable vector text; resolution-independent |
| **Rectangle (`rect`)** | `drawRectangle` (`re` path + fill/stroke) | Fill color, transparent fill, border color/width, `/ExtGState` opacity | Crisp vector box; rotatable around centroid |
| **Circle / Ellipse (`circle`)** | `drawEllipse` (cubic Bezier approximation) | Independent X/Y radii, fill/border color, opacity, rotation | Smooth vector curves at any zoom level |
| **Line & Arrow (`line`, `arrow`)** | `drawLine` + closed triangular `drawSvgPath` tip | Stroke thickness, hex color, opacity, proportional arrowhead sizing | Vector callouts with sharp miters |
| **Checkmark / Crossmark** | Dual rotated vector `drawLine` segments | Default green (`#22c55e`) or red (`#ef4444`), customizable stroke | Clean review stamps for forms and QA audits |
| **Freehand Drawing (`drawing`)** | Parsed SVG `M` / `L` polyline segments -> `drawLine` | Pencil or translucent Marker highlight opacity + width | Native vector strokes instead of jagged bitmaps |
| **Image & Signature** | `embedPng` (`/FlateDecode` + `/SMask`) or `embedJpg` (`/DCTDecode`) | Drag-resizable bounding box, opacity, rotation | Embedded Image XObject preserving PNG transparency |

### Coordinate Normalization and Centroid-Pivoted Rotations

Because users can both zoom the browser viewport and rotate individual pages inside the same session, raw screen pixel coordinates would drift immediately on export. Every object is therefore tracked in normalized visual fractions `u = x / 100`, `v = y / 100`, `uw = width / 100`, and `vh = height / 100`.

During export, `getPdfCoords()` maps normalized top-left screen boxes into unrotated bottom-left PDF User Space (`pageW × pageH`) across all four page rotations (`0°`, `90°`, `180°`, `270°`). For an unrotated page, box projection and centroid-pivoted rotation around `(cx, cy)` work as follows:

```ts
// Convert top-left percentage box to bottom-left PDF points
const x = u * pageW, y = (1 - v - vh) * pageH;
const width = uw * pageW, height = vh * pageH;

// Rotate object around bounding-box centroid (cx, cy)
const rad = (((obj.rotation || 0) - pageConfig.rotation) * Math.PI) / 180;
const cx = x + width / 2, cy = y + height / 2;
const originX = cx - ((width / 2) * Math.cos(rad) - (height / 2) * Math.sin(rad));
const originY = cy - ((width / 2) * Math.sin(rad) + (height / 2) * Math.cos(rad));
```

Freehand ink paths go through an equivalent per-vertex projection (`parseSvgPath` + `getPdfPoint`), converting relative `M`/`L` stroke coordinates cleanly into native vector segments.

## Managing Layers, Page Order, Signatures, and Draft Recovery

Complex document markups quickly accumulate overlapping shapes, callout arrows, and signatures. Four built-in studio systems keep larger editing sessions orderly:

- **Layer Z-order management**: The **Layers** sidebar lists objects on the active page and exposes **Bring to Front**, **Send to Back**, **Move Up**, and **Move Down** actions, which directly determine the painter's-algorithm drawing order written into the exported PDF content stream.
- **Synchronized page manipulation**: Dragging a thumbnail to reorder pages, rotating a page 90°, duplicating a template sheet, or deleting an obsolete page automatically updates `pageIndex` references across your `objects` array so annotations stay pinned to their intended pages.
- **Flexible signatures**: Capture quick approval signatures via freehand canvas drawing, typed script rendering, or PNG/JPEG upload; if you need a streamlined dedicated signing flow with multi-placement templates, try [Sign PDF](/en/tools/sign-pdf).
- **50-level Undo/Redo & Autosave**: Every state transition snapshots both `objects` and `pagesOrder` into an in-memory history stack (`Ctrl+Z` / `Ctrl+Y`) and persists drafts to `localStorage`, while `Ctrl+C` / `Ctrl+V` copies annotations onto the current page with a slight offset for rapid form filling.

## Text Cover-Ups, Font Encoding Limits, and True Redaction

Understanding three technical boundaries ensures your exported PDF behaves reliably across compliance checks and downstream readers:

1. **White cover-ups are NOT cryptographic redaction**: When replacing or hiding original page text via an opaque white rectangle (`rgb(1, 1, 1)`), the original glyphs remain inside the source page's `/Contents` stream beneath the white patch. Anyone using `Ctrl+F`, text selection, or `pdftotext` can still read the hidden string. Whenever legal, medical, or financial text must be irreversibly destroyed, process the document through [Redact PDF](/en/tools/redact-pdf) instead.
2. **Standard font character coverage**: Exported text boxes embed ISO Standard 14 `Helvetica` (`WinAnsiEncoding`). Standard English and Western European characters render cleanly, whereas unsupported Unicode symbols or non-Latin glyphs should be inserted as transparent PNGs or typed canvas signatures if required.
3. **Locking interactive layers for archival distribution**: If your source PDF contains fillable AcroForm widgets or markup annotations that must be merged into a non-editable archival snapshot after your edits are complete, run the final file through [Flatten PDF](/en/tools/flatten-pdf).
