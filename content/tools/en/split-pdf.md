---
metaTitle: "Split PDF Online Free | Extract & Divide Pages Locally"
metaDescription: "Split PDF documents by page ranges, fixed intervals, or single pages right in your browser. Preview thumbnails locally and export clean PDFs or ZIPs."
metaKeywords: "Split PDF, PDF splitter, PDF page splitter, extract PDF pages, separate PDF pages, online PDF split tool, PDF page extractor, split PDF pages free, cut PDF files, divide PDF document, secure PDF splitter, browser-based PDF tools"
title: "Split PDF"
shortDescription: "Split PDF pages into separate documents or extract specific pages securely. 100% browser-based processing ensures absolute document privacy."
faqs:
  - question: "What is the difference between Extract Pages and Custom Ranges mode?"
    answer: "Extract Pages combines all checked thumbnails or typed page numbers into one single output PDF. Custom Ranges lets you define multiple independent start-to-end spans so each span exports as its own separate PDF inside a ZIP bundle."
  - question: "Why is my single extracted page sometimes larger than expected compared to the original PDF?"
    answer: "If every page in the source PDF shares a large embedded font file, high-resolution background watermark, or un-subsetted CJK typeface, the extracted page must carry that shared resource object to render accurately."
  - question: "Does splitting a PDF degrade text sharpness or rasterize vector graphics?"
    answer: "No. Canvas rendering is used strictly to draw thumbnail previews in the browser interface. The actual split engine copies original vector content streams, fonts, and images directly from the source PDF object tree."
  - question: "How are multiple output files delivered when I split every page or split by fixed interval?"
    answer: "Whenever a split operation generates two or more PDFs, the tool packages them automatically into a single DEFLATE-compressed ZIP archive in your browser using your chosen filename prefix."
  - question: "Can I inspect a PDF's specification version and embedded metadata before splitting it?"
    answer: "Yes. Upon loading a document up to 150 MB, the parser inspects the raw '%PDF-x.y' header bytes alongside Title, Author, Creator, Producer, and Subject fields directly in memory before you configure split rules."
features:
  - "Four dedicated splitting engines: visual page extraction, multi-range separation, burst every page, and fixed-interval chunking"
  - "Lazy-rendered PDF.js thumbnail grid using IntersectionObserver and zoom controls for smooth navigation on large files"
  - "One-click selection presets including Odd Pages, Even Pages, First Half, Second Half, Select All, and Invert Selection"
  - "Automatic client-side ZIP bundling with custom filename prefixes when generating multiple output documents"
  - "Lossless object-graph cloning with optional PDF 1.5+ object-stream optimization to minimize exported file overhead"
  - "100% in-browser binary parsing supporting PDFs up to 150 MB with local metadata inspection and recent job history"
useCases:
  - "Bursting a multi-customer monthly billing ledger into individual one-page invoices for automated client distribution"
  - "Extracting a single signed signature page or exhibit from a 120-page commercial real estate closing binder"
  - "Dividing a textbook or technical specification manual into chapter-level PDFs using multiple custom page ranges"
  - "Chunking oversized compliance submissions into fixed 10-page packets to satisfy strict government portal limits"
  - "Separating odd and even sheets from a duplex scanner batch that interleaved two distinct physical forms"
  - "Pulling high-resolution architectural elevations out of a master permit set for subcontractor bidding packages"
howToSteps:
  - "Drop a PDF file up to 150 MB onto the workspace or browse your local disk to parse headers and render page thumbnails."
  - "Select one of the four operation tabs: Extract Pages, Custom Ranges, Split Every Page, or Fixed Interval."
  - "Click thumbnails directly, apply a preset such as Odd/Even or Half splits, or type explicit spans like '1-4, 9, 12-15'."
  - "Set a clean output filename prefix and keep object-stream optimization enabled for compact cross-reference storage."
  - "Click 'Split PDF' to clone only the reachable objects for each target document locally inside your browser."
  - "Download your standalone extracted PDF or the compiled ZIP archive containing all numbered output segments."
---

Breaking apart a sprawling multi-page PDF into targeted standalone documents is essential when sharing confidential subsets, submitting chapter-sized filings, or dispatching individual invoices from a batch export. Rather than uploading sensitive 100-page packets to third-party servers, NexusCalculator's **Split PDF** utility combines two complementary client-side engines inside your browser: Mozilla `PDF.js` renders fast, zoomable visual thumbnails on demand, while a low-level structural parser slices the underlying ISO 32000 object tree into clean, standards-compliant PDF files or a packaged ZIP archive.

## Choosing a Slicing Strategy Across Four Split Modes

Different administrative and engineering workflows demand fundamentally different output topologies—sometimes one consolidated subset, other times dozens of discrete files. Choosing the right mode upfront avoids repetitive manual slicing.

| Split Mode | Input Specification | Output Structure | Filename Pattern | Ideal Operational Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Extract Pages** | Clicked thumbnails, presets (`Odd`, `Even`, `Half 1/2`), or range string (`1-3, 7`) | 1 combined PDF | `{prefix}_extracted.pdf` | Pulling specific exhibits, tables, or executive pages into one shareable brief |
| **Custom Ranges** | Multiple independent `start`–`end` range cards | Multiple separate PDFs in `.zip` (or 1 PDF if 1 range) | `{prefix}_range_{start}-{end}.pdf` | Dividing a manual or annual report into clean chapter-by-chapter files |
| **Split Every Page** | Automatic across pages `1..total` | One single-page PDF per page in `.zip` | `{prefix}_page_{i}.pdf` | Bursting batch-exported payroll stubs, certificates, or vendor invoices |
| **Fixed Interval** | Integer chunk size `k >= 1` (default `5`) | `ceil(total / k)` PDFs in `.zip` | `{prefix}_part_{start}-{end}.pdf` | Partitioning large filings into equal blocks to meet upload size caps |

If your goal is simply removing a handful of unwanted pages from an otherwise intact document—or batch-pruning multiple files simultaneously—[Remove PDF Pages](/en/tools/remove-pdf-pages) provides blacklist and whitelist deletion workflows designed specifically for cleanup. For straightforward single-subset page pulls, you can also explore [PDF Extract Pages](/en/tools/pdf-extract-pages).

## Reachability Pruning: How Page Extraction Handles Embedded Resources

When you slice pages 12 through 15 out of a 240-page catalog, a proper PDF splitter does not merely hide the other 236 pages. Doing so would leak confidential data inside the file body and keep the file size bloated. Instead, the local engine instantiates a fresh empty `PDFDocument` for each target segment and runs a graph traversal starting strictly from the requested `/Page` nodes.

For each copied page, the engine walks its `/Resources` dictionary—tracking referenced `/Font` objects, `/XObject` bitmaps or vector forms, `/ExtGState` transparency dictionaries, `/ColorSpace` profiles, and `/Pattern` definitions. Only objects reachable from the selected pages are serialized into the new document's cross-reference stream. Unreferenced pages, unused raster images from other chapters, and dead incremental-save revisions are discarded completely.

### Why a Single Extracted Page Can Still Be Unexpectedly Large

Engineers occasionally notice that splitting a 10 MB, 50-page PDF into 50 single-page PDFs does not always produce fifty 200 KB files; instead, each 1-page file might weigh 900 KB. Two structural quirks in the ISO 32000 specification explain this behavior:

- **Shared Embedded Fonts**: If the authoring tool (such as LibreOffice, Chrome Headless, or LaTeX) embedded a complete 700 KB Unicode or CJK TrueType font (`/FontFile2`) rather than per-page subsets, every page's `/Resources` dictionary points to that same font stream. Reachability copying must include that font in every split file so glyphs render accurately.
- **Shared Form XObjects and Master Backgrounds**: Corporate slide decks and invoice templates often store a high-DPI letterhead logo or full-bleed background as one shared `/XObject` referenced by every page. Each split PDF receives its own copy of that master object.

## High-Speed Visual Triage with Lazy Canvas Rendering

Rendering 150 high-resolution PDF pages onto HTML5 `<canvas>` elements simultaneously would freeze most browser tabs and spike GPU memory. To keep thumbnail navigation responsive even on dense engineering manuals, the preview grid attaches an `IntersectionObserver` (`threshold: 0.05`) to every page card.

Pages remain dormant until scrolled into the viewport, at which point `PDF.js` fetches only that page's display list and computes an exact viewport scale (`(140 * zoom) / originalViewport.width`). Rapidly adjusting the zoom level cleanly aborts in-flight rasterization tasks via `renderTask.cancel()`—catching `RenderingCancelledException` gracefully—so stale canvas draws never race against fresh zoom states. Crucially, these `<canvas>` bitmaps exist strictly for visual inspection; your exported PDFs come straight from the untouched binary `ArrayBuffer`.

## Batch Packaging, Range Grammar, and Filename Conventions

Typing explicit page expressions in **Extract Pages** mode is often faster than clicking through dozens of thumbnails. The parser strips whitespace, accepts mixed discrete numbers and inclusive ranges, reverses accidental descending spans (`10-7` normalizes to `7-10`), removes duplicates, and sorts the final indices ascending:

```text
Input range string:   1, 4-6, 12-10, 4, 18
Resolved 1-based set: [1, 4, 5, 6, 10, 11, 12, 18]
Exported PDF length:  8 pages (preserving native order)
```

For multi-file operations (**Custom Ranges**, **Split Every Page**, and **Fixed Interval**), compiling dozens of separate browser downloads would trigger browser popup blockers. Instead, all output byte buffers are fed directly into `JSZip` using standard DEFLATE compression (`level: 5`) and delivered as a single `{prefix}_split_bundle.zip` file. Developers comparing browser outputs against command-line pipelines can think of **Split Every Page** as the zero-install browser equivalent of Poppler's `pdfseparate` or `qpdf --split-pages`, with instant visual verification beforehand.

## Handling Protected, Linearized, and Oversized Source Files

Because the entire binary buffer loads inside your local browser tab, the tool enforces a 150 MB ceiling per file to keep heap allocation stable across desktop and mobile browsers. Upon upload, the parser slices the first 32 bytes (`TextDecoder`) to report the `%PDF-1.4` through `%PDF-2.0` header version and inspects the `/Info` dictionary.

Note two common edge cases when dividing complex enterprise documents:

1. **Linearization Stripping**: Fast Web View (linearized) PDFs rely on a specialized hint table at byte offset zero tailored to the original page count. Rebuilding split segments naturally produces clean non-linearized PDFs with fresh object streams (`useObjectStreams: true`).
2. **Re-Assembling Split Fragments**: If you split a vendor packet into separate chapters, edit or share individual segments, and later need to compile selected pieces back together, drop those segments directly into [Merge PDF](/en/tools/merge-pdf) to rebuild a single indexed master document.
