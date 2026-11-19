---
metaTitle: "Add Page Numbers to PDF Locally | Headers & Footers"
metaDescription: "Insert vector page numbers, headers, or footers into PDFs directly in your browser. Supports Roman numerals, custom ranges, rotated pages, zero uploads."
metaKeywords: "Add Page Numbers to PDF, PDF Page Numbering, Number PDF Pages, PDF Pagination Tool, Insert Page Numbers in PDF, PDF Page Number Generator, add page numbers to document, number pdf pages online, free pdf page numbering, customize pdf page numbers, add headers to pdf, add footers to pdf"
title: "Add Page Numbers to PDF"
shortDescription: "Insert custom vector page numbers, Bates-style headers, or footers into single or batch PDFs with full control over typography, ranges, offsets, and rotated pages locally."
faqs:
  - question: "Will page numbers land upright on PDFs that mix portrait and rotated landscape pages?"
    answer: "Yes. For every page, the compiler reads both the physical page dimensions and the ISO 32000 /Rotate angle (0, 90, 180, or 270 degrees), swaps visual width and height for landscape rotations, and applies an inverse coordinate transform plus text rotation so stamps always appear upright in the visual corner you selected."
  - question: "How do I skip the cover page and start numbering from page 1 on the second sheet?"
    answer: "Enable the Skip First Page toggle and leave Start From Number set to 1. Because sequential indices count only across targeted pages, page 1 stays blank while physical page 2 receives number 1, physical page 3 receives number 2, and so on."
  - question: "Can I add custom Bates prefixes or headers like Exhibit A - Page 01?"
    answer: "Yes. Combine the Prefix and Suffix text inputs with any built-in numbering style—such as Zero-Padded (01, 02), Roman (I, II / i, ii), Alphabetical (A, B, AA), or Page X of Y—and place the label in any of the six header or footer anchor positions."
  - question: "Does adding page numbers increase PDF file size significantly?"
    answer: "No. Pagination uses the PDF Standard 14 Type 1 font families (Helvetica, Times-Roman, and Courier variants), whose glyph metrics are built into every compliant PDF reader. Appending crisp vector text operators adds only a few dozen bytes per page with zero font-file bloat."
  - question: "Can I number Roman front matter (i-iv) and Arabic body pages (1-50) in one PDF?"
    answer: "Yes, in two quick passes. First target custom range 2-5 with Lowercase Roman style starting at 1 and download; then load that output, target custom range 6-55 with Standard Arabic style starting at 1, and export the finalized book."
features:
  - "Native vector typography stamping via pdf-lib using all 12 Standard 14 Helvetica, Times-Roman, and Courier font weights"
  - "Rotation-aware affine coordinate engine that keeps labels upright across 0, 90, 180, and 270 degree pages"
  - "Eight numbering formats: Arabic, zero-padded (01), Upper/Lower Roman, Upper/Lower Alpha, Page X, and Page X of Y"
  - "Six header/footer anchor presets with custom margin distance, X/Y point offsets, hex color, and opacity"
  - "Selective page targeting (All, Odd, Even, custom ranges like 2-10, 15) plus Skip First and Skip Last switches"
  - "Real-time PDF.js live preview, persistent localStorage styling preferences, and multi-PDF batch ZIP export"
useCases:
  - "Adding legal Bates numbers and exhibit prefixes (such as DEF-001) to court discovery packets locally"
  - "Paginating multi-source board packs compiled from spreadsheets, slides, and Word exports before meetings"
  - "Formatting theses and books with separate lowercase Roman preface numerals and Arabic chapter numbering"
  - "Stamping confidential document control footers (Draft Rev 3 - Page X of Y) onto engineering specifications"
  - "Batch-numbering dozens of supplier compliance PDFs in one browser session with uniform corporate typography"
  - "Placing mirrored or offset page folios outside punch-hole and spiral-binding margins prior to print production"
howToSteps:
  - "Drag and drop one or more PDF files into the browser dropzone; switch between uploaded files in the queue to inspect each document."
  - "Select a numbering style (Standard, Zero-Padded, Roman, Alphabetical, Page X, or Page X of Y) and enter optional Prefix or Suffix text."
  - "Pick one of six header or footer anchor positions, then adjust margin distance and fine X/Y point offsets while watching the live canvas preview."
  - "Configure font family (Sans-Serif, Serif, or Monospace), Bold/Italic weights, point size, color, and opacity."
  - "Set page targeting (All, Odd, Even, or a custom range such as 2-20) alongside Start From Number and Skip First/Last Page toggles."
  - "Click Add Page Numbers to compile vector text streams locally and download the numbered PDF or batch ZIP archive."
---

Merging financial appendices, legal exhibits, and scanned PDFs from multiple authors almost always leaves you with broken or missing pagination—one section starts at page 4, another carries no numbers at all, and an inserted landscape spreadsheet flips the footer onto the side margin. **Add Page Numbers to PDF** solves pagination cleanly inside your browser by appending resolution-independent vector text operators directly into each target page's ISO 32000 content stream, keeping confidential documents strictly on your local machine.

## Vector Pagination Streams and the PDF Standard 14 Fonts

Rather than overlaying blurry raster PNG stamps onto your pages, the compiler embeds native PDF font references and appends lightweight text-drawing operators via `pdf-lib`. Every label remains selectable, searchable, and razor-sharp even at 1200 DPI commercial print resolution.

To keep file sizes minimal across 500-page packets, the typography engine maps Sans-Serif, Serif, and Monospace choices—combined with Bold and Italic toggles—directly to the ISO 32000 **Standard 14 Type 1 base fonts**:

- **Sans-Serif**: `Helvetica`, `Helvetica-Bold`, `Helvetica-Oblique`, `Helvetica-BoldOblique`
- **Serif**: `Times-Roman`, `Times-Bold`, `Times-Italic`, `Times-BoldItalic`
- **Monospace**: `Courier`, `Courier-Bold`, `Courier-Oblique`, `Courier-BoldOblique`

Because every conforming PDF viewer ships built-in glyph outlines and width metrics for these base fonts, zero external font binaries need to be embedded. Note one practical implication of Standard 14 fonts: they use **WinAnsiEncoding** (`Windows-1252`), which covers Latin letters, digits, punctuation, and standard Western European diacritics, while non-Latin scripts (such as Cyrillic, Greek, or CJK prefixes) are outside WinAnsi range.

### Anatomy of an Appended Pagination Operator Block

When stamping a centered 12 pt dark-gray footer onto an unrotated A4 sheet (`595.28 × 841.89 pt`), the serialized page content stream appends an isolated graphics-state block (`q ... Q`) so your pagination never leaks color or font state into existing page artwork:

```pdf
q                           % Push isolated graphics state
/GS1 gs                     % Apply ExtGState opacity (e.g., /ca 0.85)
BT                          % Begin Text object
/F1 12 Tf                   % Select Standard 14 font (/Helvetica) at 12 pt
0.20 0.20 0.20 rg           % Set DeviceRGB fill color (#333333)
1 0 0 1 262.4 30.0 Tm       % Position text matrix at centered visual (x, y)
(Exhibit A - Page 1 of 12) Tj  % Render literal string glyphs
ET                          % End Text object
Q                           % Restore original page graphics state
```

Using `embeddedFont.widthOfTextAtSize(text, fontSize)`, the engine measures the exact horizontal advance width of each formatted string before computing `vx`—ensuring `top-center`, `bottom-center`, `top-right`, and `bottom-right` labels stay pixel-accurate even as single-digit pages (`9`) widen into triple digits (`100`).

## Pagination Styles, Numeral Systems, and Formatting Templates

Eight distinct formatting modes cover everything from academic monographs to legal Bates numbering, with optional prefix and suffix strings concatenated around the computed token:

| Style Preset | Sample Sequence (`start = 1`) | Underlying Algorithm & Editorial Notes |
| :--- | :--- | :--- |
| `standard` | `1, 2, 3, ..., 100` | Sequential base-10 integer offset by `startFromNumber` |
| `padded` | `01, 02, ..., 09, 10` | Two-digit zero-padded string (`padStart(2, '0')`) ideal for Bates exhibits |
| `roman-upper` | `I, II, III, IV, ..., MMMCMXCIX` | Subtractive Roman encoder (`1`–`3999`); falls back to decimal beyond `3999` |
| `roman-lower` | `i, ii, iii, iv, v` | Standard lowercase front-matter numerals for prefaces and tables of contents |
| `alpha` | `A, B, ..., Z, AA, AB` | Bijective base-26 sequence (no zero digit) suited to appendix dividers |
| `alpha-lower` | `a, b, ..., z, aa, ab` | Lowercase bijective base-26 labels for sub-exhibits and schedules |
| `prefix` | `Page 1, Page 2, Page 3` | Built-in `Page N` label combinable with custom document title prefixes |
| `of-total` | `Page 1 of 24, Page 2 of 24` | Displays sequential index against total PDF page count for tamper-evident packets |

## Solving the Rotated-Page Coordinate Trap

One of the most notorious bugs in DIY PDF numbering scripts occurs on mixed-orientation packets. Suppose page 7 of a portrait report is a landscape chart stored physically as `612 × 792 pt` with `/Rotate 90`. If a script naively stamps `bottom-center` at `(width / 2, 30)`, the viewer rotates the whole canvas 90° clockwise—throwing the page number vertically sideways onto the left margin.

Add Page Numbers to PDF avoids this trap by computing visual layout coordinates `(vx, vy)` inside the **post-rotation visual frame** (swapping width and height whenever `/Rotate` is `90` or `270`), then mapping `(vx, vy)` back into unrotated physical User Space `(px, py)` alongside a matching glyph rotation:

```text
Rotate   0° -> px = vx,                py = vy,                glyphRotate =   0°
Rotate  90° -> px = visualHeight - vy, py = vx,                glyphRotate =  90°
Rotate 180° -> px = visualWidth  - vx, py = visualHeight - vy, glyphRotate = 180°
Rotate 270° -> px = vy,                py = visualWidth  - vx, glyphRotate = 270°
```

Every page number therefore lands upright at the exact visual edge you expect, regardless of how individual sheets were originally scanned or exported.

### Two-Pass Pagination for Roman Front Matter and Arabic Body Sections

Academic dissertations and formal publications commonly leave the cover page blank, number introductory pages `i`–`iv`, and restart Arabic numbering at `1` on Chapter 1. Because each run only stamps targeted ranges, you can produce publisher-grade pagination in two clean passes:

1. Upload your compiled manuscript (if built from separate chapters, combine them first via [Merge PDF](/en/tools/merge-pdf)).
2. **Pass 1**: Set Range to `2-5`, Style to `Lowercase Roman`, Start Number to `1`, and export.
3. **Pass 2**: Reload the downloaded PDF, set Range to `6-80`, Style to `Standard`, Start Number to `1`, and export.

## Precision Placement, Selective Exclusions, and Batch Numbering

Fine-tuning margins (`customMargin`) together with independent horizontal (`X`) and vertical (`Y`) point offsets lets you steer numbers cleanly away from existing document footers, legal disclaimers, or 3-hole punch zones—verified immediately against the real-time PDF.js canvas overlay before committing changes.

- **Exclusion switches**: Toggle **Skip First Page** to keep title covers clean, **Skip Last Page** to omit back covers, or filter to **Odd** / **Even** pages when preparing staggered outer-corner folios for duplex bookbinding.
- **Batch processing**: Upload multiple PDFs simultaneously to stamp consistent typography across an entire folder; single files download directly as `*_numbered.pdf`, while multi-file batches bundle into `numbered_pdfs.zip` in memory.
- **Prerequisites and finishing**: Encrypted files with modification locks must first be cleared via [Unlock PDF](/en/tools/unlock-pdf). If your final release also needs diagonal `DRAFT` or `CONFIDENTIAL` background stamps alongside page headers, layer them afterward with [Watermark PDF](/en/tools/watermark-pdf).
