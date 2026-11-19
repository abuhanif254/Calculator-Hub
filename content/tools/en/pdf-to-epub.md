---
metaTitle: "PDF to EPUB Converter — Free Reflowable Ebook Creator"
metaDescription: "Convert fixed-layout PDFs into reflowable EPUB3 ebooks locally in your browser. Edit Dublin Core metadata, split chapters cleanly, and read on Kindle."
metaKeywords: "pdf to epub, convert pdf to epub, pdf to ebook, create epub from pdf, pdf to kindle, pdf to kobo, reflowable epub converter, offline pdf to epub, client side pdf to epub, turn pdf into ebook, epub3 ebook generator, read pdf on ereader"
title: "PDF to EPUB Converter"
shortDescription: "Transform static PDF documents into reflowable EPUB3 ebooks directly inside your browser. Edit Dublin Core book metadata, configure page-based chapter chunking, and generate clean archives for Kindle, Kobo, and Apple Books."
features:
  - "Standards-aligned EPUB 3.0 Open Container Format (OCF) assembly including mimetype, META-INF/container.xml, and OEBPS/content.opf"
  - "Editable Dublin Core metadata controls for Book Title, Author, Publisher, and ISO 639-1 Language tags (en, fr, es, de)"
  - "Configurable chapter chunking from 1 to 100 pages per XHTML file to keep e-ink reader memory usage fast and responsive"
  - "Automatic DAISY toc.ncx navigation map generation paired with cryptographic UUID v4 book identifiers via crypto.randomUUID"
  - "Well-formed XHTML5 chapter compilation with XML entity escaping and uppercase short-line H2 section heading detection"
  - "Zero-upload browser compilation using local PDF.js text extraction and JSZip packaging for private manuscripts and research papers"
useCases:
  - "Converting long-form PDF whitepapers, technical manuals, and public-domain books for eye-friendly reading on 6-inch Kindle or Kobo e-ink screens"
  - "Packaging unpublished draft manuscripts into clean EPUB files for beta readers without sending files to third-party conversion servers"
  - "Transforming university lecture notes and policy reports into reflowable ebooks with customizable font sizes and dark-mode support on Apple Books"
  - "Splitting 300-page reference PDFs into lightweight 15-page chapter chunks so older e-readers paginate smoothly without freezing"
  - "Attaching proper Author, Publisher, and Language Dublin Core tags so side-loaded documents organize cleanly inside Calibre libraries"
  - "Preparing readable smartphone editions of landscape or small-print PDF documents for offline commuting without horizontal scrolling"
howToSteps:
  - "Drag and drop your PDF document into the upload box, or click Select PDF File to load it locally and detect the total page count."
  - "Review and edit the Book Title (auto-filled from your filename), Author, and Publisher inside the EPUB Metadata sidebar."
  - "Choose the document Language code (English, French, Spanish, or German) so e-readers apply the right hyphenation and dictionary rules."
  - "Adjust Chunk (Pages) between 1 and 100 (default 15) to control how many PDF pages combine into each XHTML chapter file."
  - "Click Export EPUB to extract text streams, assemble the OCF XML structure, and download your .epub ebook directly from browser memory."
faqs:
  - question: "Will the generated EPUB work with Amazon Kindle Send to Kindle?"
    answer: "Yes. Amazon retired legacy MOBI email ingestion in favor of standard EPUB uploads through Send to Kindle. Because this converter produces well-formed XHTML chapters, Dublin Core metadata in content.opf, and a valid toc.ncx navigation map, Kindle converts and syncs the file cleanly across devices."
  - question: "Why does the tool split my PDF into chunks of 15 pages per chapter by default?"
    answer: "Dedicated e-ink readers run on low-power CPUs and limited RAM. Putting a 400-page book inside one massive XHTML file causes sluggish page turns or crashes. Splitting content into 10 to 20 page XHTML chunks keeps each document node compact so pagination and font resizing stay instantaneous."
  - question: "Why did my scanned PDF produce an almost empty EPUB file?"
    answer: "EPUB conversion extracts selectable text runs from the PDF content stream. Scanned documents stored purely as page photographs contain no underlying text layer. Run optical character recognition on the scanned PDF first, then feed the text-searchable PDF into this EPUB converter."
  - question: "Does the current converter extract inline PDF images into the EPUB package?"
    answer: "The current V1 engine focuses strictly on clean, fast, text-first reflowable XHTML compilation for maximum e-reader compatibility. Extracting embedded raster images and running built-in OCR are intentionally marked as upcoming V2 options in the interface."
  - question: "How does editing the Language dropdown affect reading on an e-reader?"
    answer: "Setting the ISO 639-1 dc:language tag inside OEBPS/content.opf tells Kindle, Kobo, and Apple Books which built-in dictionary, hyphenation engine, and text-to-speech voice model to activate when you tap a word or enable justified alignment."
---

Reading an A4 or US Letter PDF on a 6-inch e-ink display turns every paragraph into an exercise in pinching, panning, and squinting. Fixed-layout pages cannot enlarge fonts or adapt line lengths to pocket screens. This **PDF to EPUB Converter** extracts selectable text layers from static PDFs and compiles a reflowable **EPUB 3.0** archive right inside your browser—allowing authors, researchers, and commuters to transform private manuscripts and lengthy technical reports into native e-reader editions without transmitting a single page to an external server.

## Inside the EPUB 3 Open Container Format (OCF) Package

Under the hood, an `.epub` file is a rigorously structured ZIP archive governed by the W3C EPUB 3 and IDPF **Open Container Format (OCF)** specifications. Rather than dumping raw text into a flat blob, this converter assembles all five structural layers expected by compliant reading systems:

1. **`mimetype`:** Declares `application/epub+zip` at the container root so operating systems and reading apps identify the package immediately.
2. **`META-INF/container.xml`:** Points the reader's XML parser to the root OPF package manifest at `OEBPS/content.opf`.
3. **`OEBPS/content.opf`:** The Open Packaging Format 3.0 spine and metadata record containing Dublin Core fields (`dc:identifier`, `dc:title`, `dc:creator`, `dc:publisher`, `dc:language`), a `<manifest>` listing every chapter XHTML resource, and a `<spine toc="ncx">` defining linear reading order.
4. **`OEBPS/toc.ncx`:** A DAISY Navigation Control file (`navMap` / `navPoint` entries) stamped with a browser-generated `crypto.randomUUID()` UID, ensuring chapter jumps work reliably even on older Kindle and Kobo firmware.
5. **`OEBPS/Text/chapter-N.html`:** Individual well-formed XHTML5 content documents declaring both the `http://www.w3.org/1999/xhtml` and `http://www.idpf.org/2007/ops` namespaces.

Below is an example of the package XML skeleton compiled inside `OEBPS/content.opf`, alongside the standard CLI check indie publishers use before uploading ebooks to retail storefronts:

```xml
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="BookId">9f3c2d8a-4e17-4b6f-9a21-8c7b1e4d0f12</dc:identifier>
    <dc:title>Distributed Systems Field Notes</dc:title>
    <dc:creator>Elena Rostova</dc:creator>
    <dc:publisher>Nexus Utilities</dc:publisher>
    <dc:language>en</dc:language>
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="chapter1" href="Text/chapter-1.html" media-type="application/xhtml+xml"/>
  </manifest>
  <spine toc="ncx">
    <itemref idref="chapter1"/>
  </spine>
</package>
```

```bash
# Optional local validation using W3C EPUBCheck before storefront submission
java -jar epubcheck.jar "Distributed Systems Field Notes.epub"
```

## E-Reader Compatibility and Chapter Chunking Strategy

Every ebook ecosystem ingests EPUB packages slightly differently. Choosing an appropriate **Chunk (Pages)** value—how many PDF pages merge into a single `chapter-N.html` file—directly controls pagination smoothness and RAM usage on dedicated hardware:

| Reading Platform | EPUB Ingestion Path | Transfer Workflow | Metadata & TOC Behavior | Recommended Chunk Size |
| :--- | :--- | :--- | :--- | :--- |
| **Amazon Kindle** | Cloud conversion to KFX/AZW3 | Send to Kindle web, app, or email | Reads `dc:title`, `dc:creator`, and `toc.ncx` cleanly | 10 – 15 pages |
| **Rakuten Kobo** | Native EPUB / KePub engine | USB sideload or Calibre driver | Strict XHTML parsing; honors `dc:language` hyphenation | 10 – 20 pages |
| **Apple Books** | Native WebKit EPUB 3 renderer | AirDrop, Finder sync, or iCloud | Strict XML validation; instant CSS typography reflow | 15 – 25 pages |
| **Google Play Books** | Cloud EPUB processor | Web upload or mobile app import | Syncs reading position across Android, iOS, and Web | 15 – 20 pages |
| **Calibre / KOReader** | Direct local EPUB rendering | Local library or Wi-Fi transfer | Exposes full OPF metadata editing and custom stylesheets | 10 – 30 pages |

Keep chunk sizes between **10 and 20 pages** for dense novels or technical reports so individual XHTML payloads stay under 150 KB—well below the 260 KB threshold where older e-ink processors slow down while recalculating page numbers after a font-size change. Equally important is setting the right ISO 639-1 **Language** code (`en`, `fr`, `es`, or `de`) in the metadata panel: reading apps inspect `<dc:language>` inside `OEBPS/content.opf` to load matching soft-hyphenation dictionaries, tap-to-define lexicons, and assistive text-to-speech pronunciation models. When packaging unpublished manuscripts or confidential legal dossiers, compiling the entire OCF ZIP structure directly in local browser RAM ensures sensitive drafts never pass through third-party cloud conversion queues.

## How Text Stream Reflow and Heading Detection Work

Because PDFs store glyphs by absolute coordinates rather than flowing paragraphs, `pdf.js` inspects each text item's vertical baseline transform (`item.transform[5]`). Consecutive runs sharing the same vertical baseline join onto one line, while vertical shifts close the current line and append it to the page's paragraph buffer.

During XHTML assembly, two lightweight safeguards keep output clean and valid:

- **Strict XML Entity Escaping:** Unlike forgiving HTML5 browser parsers, EPUB readers invoke strict XML parsers. A single bare `&` or `<` inside a technical manual can cause an entire chapter to fail rendering with a yellow XML parse error. Every extracted string escapes `&`, `<`, `>`, `'`, and `"` into valid entities automatically.
- **Heading Heuristic:** Short lines under 50 characters formatted entirely in uppercase are automatically promoted to `<h2>` tags rather than `<p>` tags, giving section breaks visual breathing room across reader themes.

## Preparing Complex PDFs for Clean Ebook Output

Text-stream extraction shines on single-column books, essays, policy reports, and legal briefs, while certain PDF types benefit from quick preprocessing:

- **Scanned Image-Only Books:** PDFs created by camera apps or flatbed scanners lack embedded Unicode text streams. Run your scan through our [PDF OCR Tool](/en/tools/pdf-ocr) first so every page carries a clean selectable text layer before building your EPUB.
- **Manual Cleanup for Academic Papers:** Two-column journals with repeating running headers, footers, or margin line numbers can inject noisy lines mid-paragraph when reflowed automatically. If you want full editorial control over stripping headers or formatting chapters, pull raw copy with our [PDF to Text Converter](/en/tools/pdf-to-text) before assembling your final manuscript.
- **Returning to Print-Locked Layout:** Once an ebook is finalized and you need a fixed-margin archival copy for printing or formal distribution, our [EPUB to PDF Converter](/en/tools/epub-to-pdf) reverses the pipeline cleanly.
