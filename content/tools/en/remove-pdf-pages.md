---
metaTitle: "Remove PDF Pages Online Free | Delete Pages Securely"
metaDescription: "Delete unwanted pages from one or multiple PDFs right in your browser. Choose visual thumbnails, odd/even filters, or page ranges with zero uploads."
metaKeywords: "Remove PDF Pages, Delete PDF Pages, PDF Page Deletion, Remove Pages from PDF, PDF Page Remover, PDF Page Deletion Tool, PDF Cleaner, delete pages from PDF online, free PDF page remover, delete PDF pages free, remove PDF pages securely, online PDF page deletion"
title: "Remove PDF Pages"
shortDescription: "Delete unwanted pages from your PDF documents instantly. 100% secure client-side browser processing. No uploads required."
faqs:
  - question: "Are deleted pages completely purged from the output PDF binary, or just hidden?"
    answer: "They are completely purged. The tool creates a brand-new PDF document and copies only the kept pages and their reachable resources into it, discarding all deleted page streams, embedded images, and text objects at the byte level."
  - question: "Can I remove pages from multiple PDF files in one batch session?"
    answer: "Yes. You can load multiple PDFs (up to 150 MB each), configure page selections per file or apply global odd/even deletion rules, and export the cleaned set together as a single DEFLATE-compressed ZIP archive."
  - question: "How do Remove Selected and Keep Selected modes differ?"
    answer: "Remove Selected works as a blacklist: every page you check or enter in the range box is deleted, and unchecked pages remain. Keep Selected flips the logic into a whitelist so only highlighted pages survive in the final file."
  - question: "Does deleting pages strip my document's Title, Author, and Subject metadata?"
    answer: "You control that behavior directly. Enabling Preserve Metadata copies Title, Author, Creator, Subject, and Producer fields from the original Info dictionary into the cleaned PDF; disabling it outputs a clean document free of author headers."
  - question: "Why won't the tool let me delete every single page in a PDF?"
    answer: "The ISO 32000 PDF specification requires every valid document catalog to contain at least one page node. The validator blocks zero-page exports automatically so you never produce an unreadable or corrupted PDF."
features:
  - "True copy-on-rebuild page deletion purging unreferenced text, images, and orphan streams from output bytes"
  - "Five targeted cleanup modes: Remove Selected, Keep Selected, Remove Odd Pages, Remove Even Pages, and Blank Page triage"
  - "Bidirectional sync between lazy-rendered PDF.js thumbnail checkboxes and text page-range syntax ('1-3, 6, 9-12')"
  - "Multi-file batch queue supporting PDFs up to 150 MB with dynamic filename templates using {filename} and {date} tokens"
  - "Toggleable Info-dictionary metadata preservation plus automatic PDF 1.5+ object-stream compression on export"
  - "100% browser-sandbox execution with automatic ZIP archiving for multi-file batches and a 50-entry local job log"
useCases:
  - "Stripping blank even-numbered back sides created when single-sided paper stacks are fed through a duplex office scanner"
  - "Deleting confidential internal pricing sheets or draft comments from a client proposal before external distribution"
  - "Pruning obsolete appendix pages, separator cover sheets, and disclaimer footers across a batch of monthly vendor reports"
  - "Removing blank trailing overflow pages exported accidentally from Excel spreadsheets or web-to-PDF printouts"
  - "Cleaning multi-page tax packets or insurance claims so only required schedules remain prior to portal upload"
  - "Standardizing batch output filenames with ISO date stamps like 'quarterly_report_2026-11-19.pdf' during compliance archiving"
howToSteps:
  - "Drag and drop one or multiple PDF files (up to 150 MB each) into the browser dropzone to render page thumbnails."
  - "Pick your deletion mode: Remove Selected (blacklist), Keep Selected (whitelist), Remove Odd, or Remove Even."
  - "Click thumbnails visually, apply bulk helpers like Invert or Odd/Even, or type exact page numbers like '2, 5-8' in the range bar."
  - "Customize the output filename pattern with '{filename}' and '{date}' tokens and choose whether to preserve document metadata."
  - "Click 'Remove Pages' to rebuild clean object-stream-compressed PDFs locally in your browser without uploading files."
  - "Download your cleaned PDF directly—or grab 'cleaned_documents.zip' automatically when processing multiple files at once."
---

Every office and engineering team deals with bloated PDFs cluttered by stray separator sheets, blank Excel overflow pages, duplicate fax headers, or confidential internal appendices that must vanish before a file goes external. Deleting those pages looks trivial on the surface, yet *how* a PDF editor executes deletion directly affects both file size and data security. NexusCalculator's **Remove PDF Pages** tool runs a full copy-on-rebuild sanitization pass inside your browser tab, permanently excising unwanted pages from the binary stream while preserving vector crispness across every surviving sheet.

## Why Naive Page Deletion Leaves Ghost Data Behind (Incremental Saves vs. Graph Rebuild)

Many desktop PDF viewers perform page deletion using **incremental updates**—a PDF feature originally invented to make rapid appends efficient on slow disks. When an editor relies on incremental updates, deleting page 4 simply appends a tiny replacement `/Pages` dictionary whose `/Kids` array omits page 4's object reference, followed by an updated `xref` trailer.

Critically, the raw bytes of page 4—its text streams, embedded salary tables, or scanned passport bitmap—**remain physically intact inside the file body**. Anyone running a basic hex viewer, forensic parser, or decompression tool can recover "deleted" content in seconds.

NexusCalculator avoids incremental unlinking entirely. Instead, the local browser engine executes a **fresh-catalog graph rebuild**:

1. It reads the source binary into local memory (`ArrayBuffer`) and resolves the exact array of zero-based `keptIndices`.
2. It instantiates an empty destination `PDFDocument` with zero inherited history.
3. It copies *only* the kept `/Page` dictionaries and their reachable `/Resources` dependencies (fonts, images, graphics states) into the new graph.
4. It serializes the resulting tree with PDF 1.5+ compressed object streams (`useObjectStreams: true`).

Because deleted pages are never traversed into the new catalog, their text operators and raster XObjects cannot leak into the exported file—and reclaiming those dead image streams shrinks file size immediately.

## Deletion Modes and Whitelist vs. Blacklist Selection Logic

Cleaning a 3-page invoice and stripping 80 blank backsides from a duplex scan call for completely different selection mental models. The workspace provides five operational modes synchronized in real time with both thumbnail checkboxes and text range expressions.

| Deletion Mode | Selection Logic | Range Bar Sync | Primary Document Cleanup Scenario | Built-In Safeguard |
| :--- | :--- | :--- | :--- | :--- |
| **Remove Selected** | Blacklist (checked pages deleted) | Bidirectional (`1-3, 6`) | Pruning scattered cover sheets, outdated slides, or stray trailing pages | Blocks deleting all pages (`kept >= 1`) |
| **Keep Selected** | Whitelist (unchecked pages deleted) | Bidirectional | Retaining 4 key exhibits out of a 90-page packet without clicking 86 times | Requires at least 1 kept page |
| **Remove Odd Pages** | Automatic (`page % 2 !== 0`) | Auto-applied across file | Eliminating alternating instruction sheets or odd separator slips | Ensures `pageCount >= 2` |
| **Remove Even Pages** | Automatic (`page % 2 === 0`) | Auto-applied across file | Fixing single-sided stacks accidentally scanned in double-sided duplex mode | Preserves all odd content sheets |
| **Blank Page Triage** | Visual identification + blacklist | Bidirectional | Auditing and purging empty spacer or scanner feed-error sheets manually | Flags live kept/removed count |

Clicking any thumbnail automatically re-computes a compact canonical range string (for instance, selecting pages 2, 3, 4, and 9 writes `2-4, 9`), while typing a range string immediately highlights the corresponding visual thumbnails. If you need to divide removed and kept sections into multiple separate documents rather than discarding unwanted pages permanently, switch to [Split PDF](/en/tools/split-pdf).

## Batch Multi-Document Pruning, Token Naming, and Metadata Control

When auditing a folder of quarterly PDFs, opening and saving files one by one wastes significant time. This remover supports loading multiple PDFs (up to 150 MB per document) into a single tabbed queue. Clicking a filename in the sidebar switches the `PDF.js` thumbnail canvas to that document so you can set distinct page selections on File A and File B—or apply a uniform **Remove Even Pages** pass across the entire queue at once.

Two export settings streamline enterprise archiving:

- **Dynamic Filename Patterns**: Output naming accepts `{filename}` (base name without `.pdf`) and `{date}` (current ISO `YYYY-MM-DD` date) tokens. For example:

```text
Pattern:  {filename}_cleaned_{date}
Input:    Q4_Board_Deck.pdf  (processed on 2026-11-19)
Output:   Q4_Board_Deck_cleaned_2026-11-19.pdf
```

- **Metadata Preservation Toggle**: Keeping **Preserve Metadata** enabled copies `Title`, `Author`, `Creator`, `Subject`, and `Producer` entries from the source `/Info` dictionary into the rebuilt catalog. Turning it off produces an anonymized header—useful alongside [PDF Metadata Editor](/en/tools/pdf-metadata-editor) when sanitizing internal author names prior to external release. Multi-file runs bundle cleanly inside `cleaned_documents.zip` using DEFLATE compression (`level: 6`).

### Verifying Byte-Level Removal on Sensitive Documents

Security-conscious developers preparing regulatory or legal disclosures often verify that sensitive text from removed pages no longer resides in compressed streams. After exporting from your browser, you can uncompress streams locally with `qpdf` and grep for a unique phrase from a deleted page:

```bash
# Expand FlateDecode streams locally and confirm deleted-page keywords return zero matches
qpdf --qdf --object-streams=disable report_edited.pdf unpacked.pdf
grep -i "CONFIDENTIAL_APPENDIX_TOKEN" unpacked.pdf || echo "Verified: purged from binary"
```

Keep one critical security boundary in mind: deleting a whole page eliminates that page completely, whereas hiding a single social security number or pricing row *on a page you keep* requires true content-stream destruction via [Redact PDF](/en/tools/redact-pdf)—never black rectangle overlays.

## Avoiding Broken Internal Bookmarks, Links, and Zero-Page Errors

Rebuilding a pruned page tree inevitably changes page numbering for every sheet appearing after a deletion point. Before distributing a heavily trimmed specification manual, double-check two structural details: printed "See page 14" cross-references inside body text will still display their original static numbers, and internal outline bookmarks pointing to deleted pages are dropped cleanly rather than left dangling. Finally, because ISO 32000 prohibits empty zero-page documents, the tool runs a pre-flight check across every queued file and halts with a clear warning if your selection would eliminate 100% of a file's pages.
