---
metaTitle: "Flatten PDF Online Free — Lock Forms & Annotations Locally"
metaDescription: "Flatten AcroForm fields and clear interactive PDF annotations locally in your browser. Keep crisp vector text with batch ZIP export and zero uploads."
metaKeywords: "flatten PDF, PDF flattener, flatten PDF forms, make PDF non editable, lock PDF layout, flatten annotations, convert fillable PDF to flat, remove interactive elements PDF, AcroForm flattener"
title: "Flatten PDF"
shortDescription: "Permanently bake interactive AcroForm fields onto the page canvas, purge editable annotations, and optionally clear metadata headers locally in your browser."
faqs:
  - question: "What happens to filled text boxes and checkboxes when a PDF is flattened?"
    answer: "Flattening copies each AcroForm widget's visual appearance stream directly onto the underlying page content stream as standard vector paths and static text, then deletes the interactive /AcroForm field tree. Your typed values and checkmarks remain visible and selectable, but no viewer can click into or modify the fields."
  - question: "Why does native vector flattening produce cleaner output than Print to PDF?"
    answer: "Operating system Print to PDF drivers often rasterize vector fonts, alter page media boxes, degrade embedded color profiles, or strip text searchability. Native structural flattening via pdf-lib merges appearance streams directly into vector PDF operators while preserving original page dimensions, crisp typography, and full text selection."
  - question: "Should I flatten a PDF before or after applying a cryptographic digital signature?"
    answer: "Always flatten interactive form fields before applying a cryptographic signature. Running a flattener after signing rewrites object streams and cross-reference offsets, which breaks the signature's /ByteRange hash verification and causes viewers to flag the document as tampered."
  - question: "How does Remove Annotations handle sticky notes, comments, and hyperlinks?"
    answer: "After form widgets are baked into the static canvas, enabling Remove Annotations clears each page's remaining /Annots array. This strips review comments, pop-up sticky notes, markup overlays, and clickable link boxes so no hidden reviewer commentary leaks into final client distributions."
  - question: "Why do dynamic XFA tax or government forms behave differently from standard AcroForms?"
    answer: "XML Forms Architecture (XFA) stores form layouts inside an XML packet rather than standard ISO 32000 PDF widget dictionaries, and was officially deprecated in PDF 2.0 (ISO 32000-2). Standard client-side AcroForm flatteners convert traditional PDF form widgets cleanly, whereas dynamic XFA templates require specialized Adobe-compatible rendering engines."
features:
  - "Native AcroForm vector flattening via pdf-lib that bakes text inputs, checkboxes, radios, and dropdown selections into static content"
  - "Automated pre-flatten document inspection counting pages, interactive form fields, and non-form page annotations"
  - "Granular toggles to independently flatten form fields, purge page /Annots arrays, and wipe standard metadata headers"
  - "Batch multi-file processing up to 150 MB per PDF with automatic single-click JSZip archive packaging"
  - "Legacy-compatible serialization (useObjectStreams: false) engineered for commercial print RIPs and strict enterprise viewers"
  - "Zero-upload browser sandbox execution with live page-one canvas preview and local operation history"
useCases:
  - "Locking completed W-9, W-4, direct-deposit, and HR onboarding forms before emailing so recipients cannot alter SSNs or routing numbers"
  - "Resolving Apple Preview versus Adobe Acrobat form-rendering bugs where typed AcroForm values appear blank on another OS"
  - "Preparing multi-layered architectural sheets and marketing proofs for commercial offset or plotter RIP queues"
  - "Stripping internal reviewer sticky notes and draft markup annotations before publishing external legal contracts"
  - "Batch-finalizing dozens of signed tenant leases or insurance applications into immutable archive packages"
  - "Finalizing filled interactive worksheets prior to uploading them into a DocuSign or cryptographic signing workflow"
howToSteps:
  - "Drop one or more interactive PDFs (up to 150 MB each) into the workspace to run instant client-side structural analysis."
  - "Check the inspection summary showing detected page counts, AcroForm fields, and non-form annotation counts."
  - "Toggle Flatten Forms, Remove Annotations, and optional Strip Metadata according to your distribution requirements."
  - "Preview page one directly in the local PDF.js canvas viewer to confirm visual layout before processing."
  - "Click Flatten PDF to bake appearance streams into static page operators and serialize clean output bytes in memory."
  - "Download each finalized _flattened.pdf individually or grab the bundled ZIP archive for multi-file batches."
---

Interactive PDFs are convenient during data entry and peer review, yet they create notorious failure modes once a document leaves your team. A fillable W-9 completed in macOS Preview frequently opens with blank text boxes in Windows Adobe Reader because different viewers synthesize missing field appearance streams inconsistently; worse, leaving active form widgets or review comments inside a finalized contract lets recipients silently alter dollar amounts or read internal sticky-note commentary. NexusCalculator's **Flatten PDF** utility eliminates those hazards inside your local browser sandbox by baking AcroForm field appearances directly into static page drawing streams and clearing residual interactive dictionaries before the file ever touches an email server or print queue.

## How AcroForm Appearance Streams Merge into the Page Canvas

Under ISO 32000, interactive form fields do not live inside a page's normal graphic content stream. Instead, the document catalog maintains an `/AcroForm` dictionary listing logical fields (`/FT /Tx` for text boxes, `/Btn` for checkboxes and radio buttons, `/Ch` for choice dropdowns, and `/Sig` for signatures), while each page dictionary holds an `/Annots` array referencing visual `/Subtype /Widget` annotations positioned at specific `/Rect [llx lly urx ury]` coordinates.

Each populated widget typically carries a normal appearance stream (`/AP << /N ... >>`) encoded as a reusable PDF Form XObject containing the exact font, glyphs, border strokes, and background fill for the field's current state. When `pdf-lib`'s `form.flatten()` executes locally in browser memory, it performs four structural mutations:

1. **Appearance Synthesis**: Updates or generates missing `/AP /N` streams for fields whose values were edited without cached visual graphics.
2. **Coordinate Matrix Projection**: Wraps each widget's Form XObject inside `q ... cm /XObj Do Q` graphics-state operators mapped to the widget's `/Rect` bounding box and appends them to the page's static `/Contents` stream.
3. **Widget Detachment**: Removes the widget entries from each page's `/Annots` array and strips the top-level `/AcroForm` dictionary from the catalog.
4. **Annotation Cleanup**: When **Remove Annotations** is active, the tool resets each page's remaining `/Annots` array to an empty `PDFArray`, permanently excising sticky notes, draft callouts, highlights, and interactive link boxes that were not part of the form tree.

```text
Before Flattening:
  /Catalog -> /AcroForm -> /Fields [ 14 0 R (/FT /Tx, /V (Acme Corp)) ]
  /Page    -> /Contents [ 9 0 R ]
           -> /Annots   [ 14 0 R (/Subtype /Widget, /AP << /N 22 0 R >>) ]

After Structural Flattening:
  /Catalog -> (no /AcroForm dictionary)
  /Page    -> /Contents [ 9 0 R, 35 0 R (q 1 0 0 1 72 640 cm /Widget22 Do Q) ]
           -> /Annots   [ ]
```

## Structural Flattening Compared to Print-to-PDF and Rasterization

Many users attempt to lock a fillable PDF by routing it through their operating system's virtual PDF printer or exporting every page to JPEG and re-wrapping it. Those workarounds introduce silent quality and usability regressions compared to native vector flattening:

| Technical Criterion | Native Vector Flattening (This Tool) | OS Virtual Print-to-PDF | Full-Page Rasterization (PDF -> Image -> PDF) |
| :--- | :--- | :--- | :--- |
| **Typography & Vector Sharpness** | Lossless vector glyphs and paths preserved | Often outlined, subset-mangled, or downsampled | Converted to fixed-DPI bitmap pixels; blurs on zoom |
| **Ctrl+F Text Search & Copy** | Retained for base text and flattened fields | Unpredictable; frequently broken by print drivers | Destroyed completely unless re-OCR'd |
| **Original Page Geometry (`MediaBox`)** | Preserved exactly (Letter, A4, custom bleed) | Often cropped or scaled to default printer margins | Depends on export DPI and aspect rounding |
| **File Size Overhead** | Minimal; drops redundant `/AcroForm` trees | Frequently 2x–5x larger due to spooler expansion | Often 5x–15x larger at 300 DPI |
| **Commercial RIP Compatibility** | High (`useObjectStreams: false` classic XRef) | Moderate; printer drivers inject non-standard fonts | High visually, but poor hairline/barcode fidelity |
| **Reversibility / Tamper Resistance** | Non-editable in form tools; text remains vector | Non-editable | Visually baked bitmap; hardest for casual edits |

## Serialization Choices, Print RIPs, and Batch Workflows

Commercial print shops and enterprise document ingestion pipelines run legacy PostScript/PDF Raster Image Processors (RIPs) that occasionally choke on PDF 1.5+ compressed object streams (`/Type /ObjStm`) or unflattened interactive transparency groups. To maximize downstream compatibility, our flattening engine writes final output bytes via `pdfDoc.save({ useObjectStreams: false })`, emitting classic uncompressed cross-reference tables that even older RIP hardware, archival validators, and embedded mobile viewers parse reliably.

When you drop an entire folder of HR packets or signed agreements into the workspace, each file is inspected and flattened sequentially in memory, then packaged via JSZip into a single `flattened_files.zip` archive. If you also need to restrict text copying or require a password after locking form fields, pass the output into [Protect PDF](/en/tools/protect-pdf); if flattening complex annotations enlarged an already graphic-heavy deck, optimize delivery size afterward with [Compress PDF](/en/tools/compress-pdf).

## Ordering Rules for Signatures, Accessibility, and XFA Forms

Three edge cases routinely trip up document workflows when flattening PDFs in production:

- **Flatten Before Signing, Never After**: Digital signatures verify a cryptographic digest over raw file bytes. Always flatten fillable fields *before* sending a document to [Sign PDF](/en/tools/sign-pdf) or an e-signature provider—never flatten an already cryptographically signed agreement unless you intend to discard its verification chain.
- **PDF/UA Accessibility Trade-Off**: Screen readers rely on interactive form field tags (`/TU` tooltips and structure tree bindings) to guide users filling out a form. Flattening removes interactive form semantics while leaving static readable text; distribute an unflattened tagged master whenever recipients must complete the form with assistive technology.
- **Deprecated XFA Templates**: Government agencies still circulate older LiveCycle XFA forms whose layout lives inside XML rather than ISO 32000 AcroForm dictionaries. Because PDF 2.0 deprecated XFA, check whether a file uses AcroForms or XFA before batch flattening, and verify flattened output on the command line when automating audits:

```bash
# Confirm zero interactive form fields and zero annotations remain
pdfinfo contract_flattened.pdf | grep -E "Form:|Pages:|PDF version:"
qpdf --json contract_flattened.pdf | grep -E '"acroform"|"annots"'
```

Finally, because removing `/AcroForm` and `/Annots` dictionaries is irreversible, always retain an unflattened master copy in your archive whenever future edits or corrections might be required.
