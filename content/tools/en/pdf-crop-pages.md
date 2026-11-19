---
metaTitle: "Crop PDF Pages & Trim Margins Locally | Free PDF Tool"
metaDescription: "Trim white margins, remove dark scan borders, and edit PDF CropBox and MediaBox bounds locally in your browser. Auto-detect edges with zero uploads."
metaKeywords: "PDF Crop Pages, Crop PDF, PDF Margin Remover, PDF Page Cropper, Trim PDF Pages, PDF White Space Remover, remove margins from pdf, crop pdf pages online, crop pdf tool free, trim pdf edges, auto crop pdf, crop pdf selected pages"
title: "PDF Crop Pages"
shortDescription: "Crop page margins, strip dark scanner borders, and update PDF CropBox and MediaBox boundaries across all or selected pages locally in your browser."
faqs:
  - question: "What is the difference between CropBox and MediaBox when cropping a PDF?"
    answer: "CropBox defines the visible viewport displayed by modern PDF viewers, while MediaBox defines the physical sheet dimensions. This tool updates both /CropBox and /MediaBox together so strict print drivers, mobile viewers, and browser renderers all enforce identical trimmed boundaries."
  - question: "How does automatic white-space and border detection work?"
    answer: "Auto-Crop renders the active page to an offscreen HTML5 Canvas at 1.5x scale, inspects RGBA pixel values from all four edges to ignore near-white paper margins (RGB > 240) and dark flatbed scanner shadows (RGB < 35), and adds a 15-point safety buffer so text ascenders and serifs stay intact."
  - question: "Does cropping a PDF permanently erase confidential text outside the crop rectangle?"
    answer: "No. Standard ISO 32000 box cropping is non-destructive visual clipping: objects outside the new MediaBox and CropBox remain hidden in the underlying content stream and can still be extracted by PDF parsers. Use a dedicated Redact PDF tool to permanently destroy sensitive data."
  - question: "Can I apply different crop margins to individual pages or only odd and even pages?"
    answer: "Yes. You can configure global document margins, override margins for specific pages individually, or restrict export to All Pages, Selected Pages, Odd Pages, Even Pages, or custom expressions such as 1-4, 7, 10-12."
  - question: "Does PDF Crop Pages support password-protected PDF documents?"
    answer: "Yes. When an encrypted PDF is detected, the tool prompts for its user password and decrypts the file strictly in local browser memory via client-side decryption before rendering previews and writing the cropped output."
features:
  - "Synchronized /CropBox and /MediaBox updates via pdf-lib for consistent clipping across all viewers"
  - "Automated pixel-matrix edge scanner that trims both blank white margins and dark scanner borders"
  - "Interactive 8-handle visual crop marquee with full-box repositioning and 1 pt / 10 pt arrow-key nudging"
  - "Real-time unit conversion across PDF points (pt), millimeters (mm), and 96-DPI pixels (px)"
  - "Selective targeting for All, Selected, Odd, Even, or custom page ranges plus per-page overrides"
  - "Local preset manager (0.5 in, 1.0 in, 15 mm A4 defaults), Undo/Redo stacks, and encrypted PDF support"
useCases:
  - "Trimming wide academic journal margins so two-column papers remain readable on e-ink tablets and phones"
  - "Stripping black shadows and skewed scanner edges from bound book photocopies and archival scans"
  - "Removing shipping label whitespace to format 4x6 thermal labels from full US Letter carrier PDFs"
  - "Standardizing asymmetric left/right gutter margins on odd and even spreads before duplex re-printing"
  - "Cropping presentation handouts and slide decks down to clean full-bleed graphics for embedding"
  - "Batch-trimming repetitive invoice or bank statement headers locally using saved custom margin presets"
howToSteps:
  - "Drop a PDF file into the upload zone or browse from your device; if the document is encrypted, enter its password to unlock it locally."
  - "Choose your preferred measurement unit (pt, mm, or px) and switch between single-page Edit view or multi-page Grid view."
  - "Drag the eight visual crop handles on the page preview, type exact Top, Bottom, Left, and Right values, click Auto-Detect Margins, or pick a saved preset."
  - "Fine-tune placement using Arrow keys (1 pt increments) or Shift+Arrow (10 pt increments), and optionally save custom per-page overrides."
  - "Select the target scope (All, Selected, Odd, Even, or a custom range such as 2-8, 12) and click Crop PDF (or press Ctrl+S) to download the trimmed file."
---

Oversized page margins waste screen space on tablets, ruin thermal label alignment, and leave unsightly black bands around flatbed book scans. Fixing them by exporting pages to images and slicing them in a photo editor destroys crisp vector typography and balloons file sizes. **PDF Crop Pages** trims margins natively at the ISO 32000 geometry layer—modifying each target page's boundary-box rectangles right inside your browser so fonts stay sharp, text remains selectable, and confidential files never traverse a remote server.

## Inside ISO 32000 Page Boundary Boxes

Rather than cropping pixels, the PDF specification governs page geometry through five nested rectangles stored as four-number arrays `[llx lly urx ury]` (lower-left X, lower-left Y, upper-right X, upper-right Y) inside every Page Object dictionary. All coordinates use **PDF User Space points**, where `1 pt = 1/72 inch` exactly (`72 pt = 1 in`, `2.8346 pt = 1 mm`).

| Boundary Box Key | Specification Role | Default Fallback | Impact in Print & Viewers |
| :--- | :--- | :--- | :--- |
| `/MediaBox` | Physical sheet dimensions (required on page or ancestor `/Pages`) | None (mandatory) | Enforces outer paper size in RIPs, browsers, and legacy tools |
| `/CropBox` | Visible clip boundary for on-screen display and standard printing | Inherits `/MediaBox` | Clips rendered content in Adobe Acrobat, Chrome, Safari, PDF.js |
| `/BleedBox` | Production press clip region including ink overhang beyond cut lines | Inherits `/CropBox` | Used by commercial prepress workflows during imposition |
| `/TrimBox` | Intended physical dimensions of the finished page after guillotining | Inherits `/CropBox` | Guides commercial bindery cut marks and PDF/X validation |
| `/ArtBox` | Meaningful content bounding box chosen by page layout software | Inherits `/CropBox` | Referenced when placing PDFs as embedded graphics in DTP apps |

A frequent cause of broken crops in third-party utilities is updating `/CropBox` alone while leaving `/MediaBox` untouched. Although desktop viewers honor `/CropBox`, numerous print queues, automated thumbnailers, and mobile readers default back to `/MediaBox`, causing trimmed whitespace to mysteriously reappear. PDF Crop Pages writes identical clipped coordinates to **both** `/CropBox` and `/MediaBox` (`page.setCropBox` and `page.setMediaBox`), ensuring strict visual parity everywhere the document opens.

### Bottom-Left User Space vs. Top-Left Screen Coordinates

Translating interactive drag handles in a web browser into accurate PDF geometry requires reconciling two inverted coordinate systems. HTML5 `<canvas>` and DOM overlays place `(0, 0)` at the **top-left** corner with Y increasing downward, whereas PDF User Space anchors `(0, 0)` at the **bottom-left** corner with Y increasing upward.

Given an original US Letter sheet (`612 × 792 pt`) and user margins `{ top: 54, bottom: 72, left: 36, right: 36 }`, the exported page rectangle computes as:

```text
newX      = left                       = 36
newY      = bottom                     = 72
newWidth  = origWidth  - left - right  = 612 - 36 - 36 = 540
newHeight = origHeight - top  - bottom = 792 - 54 - 72 = 666

% Written into the Page Object dictionary:
/MediaBox [36 72 576 738]
/CropBox  [36 72 576 738]
```

To prevent degenerate zero-area pages that crash PDF readers, the workspace enforces a hard minimum remaining canvas of `20 × 20 pt` during interactive dragging and `10 × 10 pt` during final serialization. If a scanned document is also rotated sideways before you trim it, align its orientation first with [Rotate PDF](/en/tools/rotate-pdf) so Top, Bottom, Left, and Right margins match your visual expectations.

## How Client-Side Auto-Crop Detects Scanned Borders

Manually dialing in four margin fields on every scan slows down repetitive cleanup. The built-in **Auto-Detect Margins** routine analyzes page imagery directly on your device without server-side computer vision:

1. **High-resolution offscreen render**: PDF.js rasterizes the current page onto an offscreen canvas at `1.5×` scale (`108 DPI`) to capture thin hairlines, footnotes, and faint punctuation.
2. **Four-edge inward scan**: The algorithm pulls the raw RGBA `Uint8ClampedArray` via `getImageData()` and walks inward from left, right, top, and bottom borders until it encounters the first non-background pixel.
3. **Dual-threshold classification**: Pixels with `R > 240, G > 240, B > 240` classify as white/off-white paper background, while pixels with `R < 35, G < 35, B < 35` classify as dark scanner-lid shadows—allowing the scanner to punch past black photocopy borders automatically.
4. **Safety buffer and sanity floor**: Detected pixel bounds scale back to PDF points and subtract a `15 pt` breathing buffer on every side so serif edges and descenders never touch the trim line, rejecting degenerate detections narrower than `40 pt`.

Because scanning relies purely on pixel luminance, pages containing solid dark header banners or tiny dust speckles in the outer margin can occasionally halt an edge scan early; simply nudge the relevant handle afterward or tap the Arrow keys (`1 pt` per press, or `10 pt` with `Shift` held) for exact positioning.

## Working with Points, Millimeters, and Reusable Margin Presets

Different industries standardize margins in different units—academic publishers specify inches (`36 pt = 0.5 in`, `72 pt = 1.0 in`), European engineering packs measure ISO A4 (`595.3 × 841.9 pt`) in millimeters (`15 mm ≈ 42.5 pt`), and UI/web teams think in 96-DPI CSS pixels (`1 px = 0.75 pt`). Switching the unit selector recalculates all four numeric inputs cleanly on the fly without rounding drift in the underlying point state.

For recurring workflows—such as trimming carrier shipping labels or stripping uniform 1-inch margins from weekly legal briefs—you can store named custom presets in your browser's `localStorage` and reapply them in one click. Paired with Odd/Even page targeting, this makes correcting alternating inner binding gutters across 100-page duplex scans straightforward: apply one asymmetric preset to Odd pages, export, and apply the mirrored preset to Even pages.

## Visual Clipping vs. Permanent Content Removal: Security Pitfalls

Engineers, paralegals, and compliance officers must keep one critical PDF specification behavior in mind: **modifying `/CropBox` and `/MediaBox` does not delete objects outside the visible rectangle**. Text runs, account numbers, author watermarks, and high-resolution raster graphics positioned outside `[llx lly urx ury]` still exist inside the page's `/Contents` stream and remain trivial to recover with `pdftotext` or any hex/object inspector.

- If your goal is **layout formatting** (better mobile readability, print sizing, cleaner scan edges), box cropping is ideal because it executes in milliseconds with zero quality loss.
- If your goal is **hiding confidential headers, SSNs, or pricing tables**, never rely on cropping alone—permanently purge sensitive areas with [Redact PDF](/en/tools/redact-pdf).
- If cropped pages still carry oversized high-DPI background scans that inflate email attachments, run the trimmed output through [Compress PDF](/en/tools/compress-pdf) to downsample embedded image streams afterward.
