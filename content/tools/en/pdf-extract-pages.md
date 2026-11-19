---
metaTitle: "Extract PDF Pages & Ranges Locally | Free Online Tool"
metaDescription: "Extract selected PDF pages or ranges into one combined PDF, individual files, or range ZIPs locally in your browser. Fast, lossless, and zero uploads."
metaKeywords: "PDF Extract Pages, Extract PDF Pages, PDF Page Extractor, Save PDF Pages, Extract Pages from PDF, PDF Page Separator, Save Selected PDF Pages, split pdf ranges, extract pages pdf free, extract pages from pdf locally, extract page range pdf, select pdf pages and save"
title: "PDF Extract Pages"
shortDescription: "Extract specific pages, custom ranges, or multi-block selections from a PDF into a single combined PDF, individual page files, or separate range ZIPs locally."
faqs:
  - question: "What is the difference between Single Combined PDF, Separate Pages, and Separate Ranges?"
    answer: "Single Combined PDF compiles every selected page into one continuous PDF file. Separate Pages generates one standalone PDF per selected page inside a ZIP archive. Separate Ranges automatically groups contiguous selected blocks (such as 1-3 and 8-12) into individual chapter PDFs bundled inside a ZIP."
  - question: "Why is my extracted 5-page PDF sometimes larger than 5% of a 100-page original?"
    answer: "PDF resources such as embedded TrueType fonts, ICC color profiles, and shared letterhead Form XObjects are cloned in full whenever any extracted page references them. Unreferenced images and content streams from excluded pages are pruned, so actual savings depend on resource sharing."
  - question: "Can I extract pages from a password-protected PDF without uploading it?"
    answer: "Yes. When you open an encrypted document, PDF Extract Pages prompts for the password and decrypts the binary payload locally in browser RAM before rendering page thumbnails and building your extracted files."
  - question: "How do I quickly select non-contiguous pages or alternating spreads in a large document?"
    answer: "Type range expressions like 1-4, 9, 14-20 or keywords such as odd and even into the range bar, click quick filters (First N, Last N, Odd, Even), or click a starting thumbnail and Shift-click an ending thumbnail. Every selection method stays bidirectionally synced."
  - question: "Will extracting pages preserve original vector graphics, selectable text, and page sizes?"
    answer: "Yes. Extraction uses pdf-lib copyPages to clone the exact indirect Page Objects, content streams, and physical MediaBox dimensions (displayed in inches on each thumbnail) without rasterizing or altering text encoding."
features:
  - "Three client-side export topologies: Single Combined PDF, Individual Page ZIP, and Contiguous Range ZIP"
  - "Lossless object-graph cloning via pdf-lib copyPages that prunes unreferenced pages and rebuilds XRef tables"
  - "Grid and List workspace views displaying real-time page dimensions in inches (width/72 x height/72)"
  - "Bidirectional range syntax engine supporting 1-5, 10, 15-20, odd, even, Shift-click ranges, and saved presets"
  - "Local decryption for password-protected PDFs alongside Ctrl+A, Delete, and Ctrl+S keyboard shortcuts"
  - "In-memory JSZip bundling with live estimated output size and localStorage extraction history"
useCases:
  - "Pulling signed signature pages and execution schedules out of 150-page M&A agreements for filing"
  - "Extracting individual chapter ranges from multi-unit textbooks and technical manuals for study distribution"
  - "Separating multi-invoice supplier PDFs into one standalone PDF per page for ERP accounting ingestion"
  - "Isolating audited balance sheets and footnotes from annual 10-K financial filings for analyst memos"
  - "Saving only odd or even pages from single-sided scan batches before duplex re-assembly"
  - "Archiving specific architectural sheet ranges from master blueprint sets without cloud exposure"
howToSteps:
  - "Drag and drop a PDF into the browser dropzone or select a file from your device; supply the password if the file is encrypted."
  - "Browse pages in Grid or List mode, adjusting thumbnail zoom as needed to verify page content and physical dimensions."
  - "Mark target pages by clicking thumbnails, Shift-clicking ranges, typing an expression like 1-3, 7, 12-15, or applying presets like Odd, Even, or First 3 Pages."
  - "Choose your export mode: Single Combined PDF, Separate Pages (ZIP), or Separate Contiguous Ranges (ZIP)."
  - "Click Extract Pages (or press Ctrl+S) to clone the selected page objects locally and save your new PDF or ZIP archive."
---

Large PDF packets routinely bundle far more information than a single recipient needs—an entire 120-page property closing package when an insurer only asks for the two-page certificate, or a consolidated monthly billing run containing forty separate client invoices. Printing selected pages to a virtual OS PDF driver is a common workaround, yet virtual print pipelines routinely re-distill fonts, flatten transparency layers, and alter page dimensions. **PDF Extract Pages** avoids re-distillation altogether by copying selected Page Objects directly at the ISO 32000 object-tree level inside your browser.

## What Happens Inside the PDF Object Graph During Page Extraction

A PDF file does not store pages sequentially like frames in a raw video stream. Instead, the document's `/Catalog` dictionary points to a root `/Pages` node forming a balanced tree whose `/Kids` arrays reference either intermediate `/Pages` branches or leaf `/Page` dictionaries. Each leaf `/Page` dictionary holds indirect references (`N 0 R`) to its drawing commands (`/Contents`), font dictionaries, image XObjects, color spaces, and extended graphics states (`/Resources`).

### Deep Cloning Transitive Resources and Rebuilding the XRef Table

When you extract pages `[0, 1, 4]` from a 50-page source document, `pdf-lib` instantiates an empty target `PDFDocument` and executes a transitive graph traversal (`copyPages`) starting at each requested leaf `/Page` object:

```pdf
% Source Document Fragment (50 pages total)
2 0 obj  << /Type /Pages /Count 50 /Kids [10 0 R 11 0 R 12 0 R 13 0 R 14 0 R ...] >> endobj
10 0 obj << /Type /Page /Parent 2 0 R /Resources 30 0 R /Contents 31 0 R >> endobj
14 0 obj << /Type /Page /Parent 2 0 R /Resources 30 0 R /Contents 45 0 R >> endobj

% Extracted Output Document (only pages 1 and 5 cloned + renumbered)
2 0 obj  << /Type /Pages /Count 2 /Kids [4 0 R 5 0 R] >> endobj
4 0 obj  << /Type /Page /Parent 2 0 R /Resources 6 0 R /Contents 7 0 R >> endobj
5 0 obj  << /Type /Page /Parent 2 0 R /Resources 6 0 R /Contents 8 0 R >> endobj
```

Notice two crucial details in that output graph:

1. **Shared resource deduplication**: Both page 1 (`10 0 R`) and page 5 (`14 0 R`) referenced the same `/Resources` dictionary (`30 0 R`). The cloning map tracks visited object numbers so shared resources are serialized **once** (`6 0 R`) in the destination file rather than duplicated per page.
2. **Orphan pruning and fresh XRef construction**: Content streams, high-DPI scans, and font subsets referenced solely by unselected pages (`11 0 R`, `12 0 R`, `13 0 R`) are never reached during traversal. The serializer then writes a brand-new cross-reference (`xref`) byte-offset table and trailer tailored exclusively to the reachable objects.

### Why Extracted File Sizes Are Rarely Linear

The workspace displays a quick size estimate (`originalSize × selectedCount / totalPages`) to help gauge download weight before exporting. In practice, actual file size diverges whenever resource distribution is uneven:

- **Smaller than estimated**: Extracting text-only summary pages out of a photo-heavy catalog leaves behind megabytes of unreferenced `/DCTDecode` JPEG streams, yielding dramatic reductions.
- **Larger than estimated**: Extracting a single page that references a large embedded CJK Unicode font (`CIDFontType2`) or a shared multi-megabyte vector corporate template retains the entire font/template object inside the new file.

## Choosing Between Combined, Individual, and Contiguous-Range Outputs

Different document workflows demand different output packaging. PDF Extract Pages provides three extraction modes—and differs intentionally from sibling page-manipulation utilities:

| Mode / Tool | Selection Input | Output Packaging | Contiguous Grouping Logic | Best-Fit Workflow |
| :--- | :--- | :--- | :--- | :--- |
| **Single Combined PDF** | Any pages (e.g. `1, 4-6, 12`) | One `{name}_extracted.pdf` | Preserves ascending selected order in one `/Pages` tree | Pulling exhibits into a focused review brief |
| **Separate Pages (ZIP)** | Any pages (e.g. `1-25`) | `{name}_pages_separate.zip` (`_page_N.pdf`) | Emits one standalone `PDFDocument` per selected page | Splitting batch invoices or certificates per recipient |
| **Separate Ranges (ZIP)** | Disjoint spans (e.g. `1-3, 7-9, 14`) | `{name}_ranges_separate.zip` (`_range_A-B.pdf`) | Coalesces adjacent `true` indices into distinct range PDFs | Breaking a manual into independent chapter files |
| [Split PDF](/en/tools/split-pdf) | Fixed intervals or cut points | Multi-part PDFs / ZIP | Divides an entire document by chunk size or markers | Chopping a 500-page archive into 50-page chunks |
| [Remove PDF Pages](/en/tools/remove-pdf-pages) | Pages to *exclude* | Single trimmed PDF | Deletes unwanted indices from original sequence | Dropping blank sheets or cover pages quickly |

Bundling multi-file outputs locally through `JSZip` avoids browser multi-download security prompts that block pages attempting to fire dozens of simultaneous `blob:` downloads. If you later need to combine extracted chapters from multiple source files into one master deliverable, feed them straight into [Merge PDF](/en/tools/merge-pdf).

## Range Expression Syntax and Keyboard-Driven Selection

Selection controls stay bidirectionally synchronized across visual clicks and textual expressions. Clicking thumbnails—or holding `Shift` to toggle an entire span between your anchor page and target page—automatically collapses consecutive selections into compact range strings (for example, pages 1, 2, 3, 5, 8, 9 become `1-3, 5, 8-9`).

Conversely, typing directly into the range box accepts comma-separated integers, reversed or forward hyphenated intervals (`10-5` normalizes cleanly to `5-10`), and parity keywords:

```text
1-3, 7, 12-18     # Extracts pages 1, 2, 3, 7, and 12 through 18
odd               # Selects all odd-numbered pages (1, 3, 5, ...)
even              # Selects all even-numbered pages (2, 4, 6, ...)
```

Built-in presets (`First 3 Pages`, `Odd Pages Only`, `Even Pages Only`) can be extended with your own recurring range templates stored in `localStorage`. Power users can toggle Grid or List view (to inspect each page's physical dimensions in inches), press `Ctrl+A` to select every page, `Delete` to clear the selection, and `Ctrl+S` to compile immediately.

## Handling Encrypted Sources, Interactive Forms, and Outline Bookmarks

Two structural nuances are worth verifying after extraction:

- **Encrypted PDFs**: When a source file carries a user password, the tool intercepts encryption errors and unlocks the byte stream locally inside browser RAM via `@pdfsmaller/pdf-decrypt`, producing standard unencrypted extracted copies without ever transmitting your password over the network.
- **Document-level metadata and bookmarks**: Because `copyPages` copies leaf Page Objects into a fresh `/Catalog`, document-wide outline trees (`/Outlines` bookmarks), JavaScript actions, and cross-page AcroForm calculation scripts do not automatically remap to truncated page indices. Always spot-check extracted form sections—and keep your original file untouched as your archival master.
