---
metaTitle: "Sign PDF Online Free | Draw, Type & Place E-Signatures"
metaDescription: "Electronically sign PDF contracts in your browser. Draw, type, or upload a signature, add dates and text, and export locally without uploads."
metaKeywords: "sign pdf, pdf signature tool, electronically sign pdf, add signature to pdf, e-sign pdf, pdf signing tool, digital signature pdf, draw signature, type signature, upload signature, pdf editor, sign documents online"
title: "Sign PDF"
shortDescription: "Draw, type, or upload your signature, place ink stamps, dates, and text fields directly onto PDF pages, and export signed copies locally in your browser."
faqs:
  - question: "What is the difference between an electronic signature and a cryptographic digital signature (PAdES)?"
    answer: "An electronic signature embeds a visual handwritten, typed, or uploaded signature image along with date and text fields directly onto PDF pages—satisfactory for most NDAs, leases, and vendor agreements under ESIGN, UETA, and EU eIDAS Simple Electronic Signature rules. A cryptographic digital signature (PAdES) adds an X.509 PKI certificate and a SHA-256 ByteRange hash to detect post-signing tampering."
  - question: "Are signatures created in this tool legally binding for business contracts?"
    answer: "For most commercial agreements, employment offer letters, rental leases, and consent forms, visual electronic signatures are legally enforceable under the US ESIGN Act, UETA, and EU eIDAS Regulation when paired with clear signer intent and an audit trail (such as emailed delivery confirmation). Regulated deeds, notarized filings, or EU Qualified Electronic Signature mandates still require an accredited Trust Service Provider."
  - question: "How does the tool keep my handwritten signature background transparent on the PDF?"
    answer: "Drawn and typed signatures are exported from an HTML5 Canvas as 32-bit RGBA PNG images containing an alpha transparency channel. When embedded into the PDF via pdf-lib, the alpha mask (/SMask) is preserved so your ink strokes sit cleanly over signature lines without a white opaque box covering nearby text."
  - question: "Where are my saved signatures stored if I reuse them later?"
    answer: "Up to your 10 most recent signatures are cached exclusively in your browser's localStorage under your device profile—never on an external server. Clearing site storage or removing individual stamps deletes them immediately."
  - question: "Why can I not export a signed version of a password-protected PDF?"
    answer: "Encrypted PDFs lock their internal page streams and cross-reference tables against modification. If your source contract has an open password or editing restriction, decrypt it first with the authorized password, apply your signature overlays, and optionally re-lock the finalized copy."
features:
  - "Three signature creation modes: freehand mouse/touch drawing, styled cursive typography, and transparent PNG/JPG image upload"
  - "Interactive multi-page PDF.js canvas preview with zoom controls and drag-and-drop placement on any page"
  - "Support for unlimited signature stamps alongside custom Helvetica text labels and formatted signing dates"
  - "Exact coordinate projection translating top-left viewport positions into bottom-left 72 pt/in PDF User Space"
  - "Local browser signature vault storing up to 10 reusable signatures privately in localStorage"
  - "100% in-browser binary assembly up to 150 MB with zero cloud storage, account walls, or document uploads"
useCases:
  - "Executing freelance statements of work, non-disclosure agreements, and independent contractor contracts in seconds without printing and scanning"
  - "Signing and dating HR onboarding packets, direct-deposit authorizations, and employee handbook acknowledgments across multiple pages"
  - "Adding transparent wet-ink signature scans and initials to residential leases, real estate disclosures, and purchase orders"
  - "Approving vendor invoices, expense reimbursements, and change orders locally on confidential corporate networks where cloud e-sign SaaS is restricted"
  - "Completing school permission slips, medical release forms, and insurance claim packets from desktop or touch-screen devices"
  - "Preparing signed project deliverables before locking or flattening the final PDF archive for client distribution"
howToSteps:
  - "Drag and drop an unencrypted PDF (up to 150 MB) into the signing workspace or browse your local device."
  - "Open the signature creator to draw freehand ink, type your name in a cursive script font, or upload an existing PNG/JPG signature image."
  - "Click any saved signature, date stamp, or custom text field to place it onto the active page."
  - "Drag each placed element directly over the target signature line and navigate through additional pages as needed."
  - "Click Export Signed PDF to embed your overlays into the binary document and download the _signed.pdf file instantly."
---

Printing a contract just to scribble ink across the final page and feed it back through an office scanner degrades text sharpness, inflates file sizes, and breaks searchable content. **Sign PDF** eliminates that round-trip by combining a live **PDF.js** page renderer with direct **pdf-lib** binary embedding—letting you draw, type, or upload a signature, position date and text fields with pixel accuracy, and export a crisp `_signed.pdf` directly from your browser without uploading private contracts to a third-party SaaS platform.

## Electronic Signatures vs. Cryptographic Digital Signatures (PAdES)

Engineers, legal teams, and procurement officers frequently conflate visual **electronic signatures** with PKI-backed **cryptographic digital signatures**. Understanding the exact distinction keeps your signing workflow both efficient and legally compliant.

Browser-based visual e-signing inserts an image XObject (your handwritten, typed, or scanned signature) plus optional text and date operators directly into the page content stream. Under the **U.S. ESIGN Act (15 U.S.C. § 7001)**, **UETA**, and **EU eIDAS Regulation (No 910/2014)**, this constitutes a **Simple Electronic Signature (SES)**—legally valid for the overwhelming majority of everyday business contracts, NDAs, offer letters, leases, and invoices when accompanied by clear intent to sign and mutual consent.

By contrast, a **PDF Advanced Electronic Signature (PAdES / ISO 32000-2 `/Type /Sig`)** computes a cryptographic digest (typically SHA-256) over the entire file's byte range excluding the signature hex placeholder, encrypts that digest using an X.509 private key issued by a Certificate Authority, and embeds a CMS/PKCS#7 detached container plus an optional RFC 3161 trusted timestamp.

## Signature Assurance Tiers Compared

| Assurance Level | Technical Mechanism | Tamper Detection | Legal Framework Fit | Typical Workflows |
| :--- | :--- | :--- | :--- | :--- |
| **Simple Electronic Signature (SES — This Tool)** | Embedded RGBA PNG/JPEG `/Image` XObject + PDF text/date operators | External (email/Git/DMS audit trail or SHA-256 file hash) | ESIGN Act, UETA, eIDAS Art. 25(1) | NDAs, vendor SOWs, HR forms, leases, invoices, consent forms |
| **Advanced Electronic Signature (AdES / PAdES-B)** | X.509 certificate + `/ByteRange` SHA-256 CMS/PKCS#7 signature | Native cryptographic verification in Acrobat / PDF viewers | eIDAS Art. 26 | Regulated enterprise procurement, software compliance sign-offs |
| **Qualified Electronic Signature (QES / PAdES-LTA)** | Hardware-backed QSCD certificate from EU Trust Service Provider + RFC 3161 TSA | Long-term archival validation (LTV / OCSP / CRL) | eIDAS Art. 25(2) — legal equivalent of handwritten ink across EU | Government tenders, cross-border statutory filings, banking deeds |

## Coordinate Projection: Mapping Browser Canvas to PDF User Space

Accurately placing a signature across arbitrary page dimensions (US Letter `612 × 792 pt`, A4 `595.28 × 841.89 pt`, or landscape engineering sheets) requires translating between two opposing coordinate systems:

- **Browser DOM / Canvas Space:** Origin `(0, 0)` resides in the **top-left** corner, measured in CSS pixels scaled to the responsive viewport.
- **PDF User Space (ISO 32000):** Origin `(0, 0)` resides in the **bottom-left** corner, measured in typographic points (`1 pt = 1/72 inch`).

During placement, every signature, date, and text item stores normalized percentages (`x`, `y`, `width`, `height` in `0–100%`) relative to the rendered viewport so zooming in or out never introduces drift. At export time, the exporter loads the untouched source bytes via `PDFDocument.load()` and maps each overlay onto its exact page coordinate rectangle:

```ts
const { width: pdfPageW, height: pdfPageH } = targetPage.getSize();
const itemWPt = (item.width / 100) * pdfPageW;
const itemHPt = (item.height / 100) * pdfPageH;
const xPt = (item.x / 100) * pdfPageW;
const yTopDownPt = (item.y / 100) * pdfPageH;

// Invert vertical axis from top-down DOM space to bottom-up PDF User Space
const yPt = pdfPageH - yTopDownPt - itemHPt;
```

For PNG signatures—whether drawn freehand on the HTML5 canvas, rendered from cursive script fonts, or uploaded as a transparent scan—`embedPng()` separates the RGB color channels from the alpha channel into a native PDF `/SMask` soft-mask stream. That keeps your signature strokes crisp and transparent over ruled form lines, whereas JPEG uploads embed directly through `/DCTDecode` without unnecessary re-encoding.

## Capturing Clean Signatures: Draw, Type, and Image Upload

Every workflow favors a different input style, and all three normalize cleanly into reusable assets:

- **Freehand Ink Drawing:** Uses pressure-responsive Bézier stroke smoothing across mouse, trackpad, stylus, and mobile touch events, exporting lossless RGBA PNG bytes in your chosen ink color (such as archival slate-black or classic dark blue).
- **Cursive Typed Signatures:** Renders your typed name onto an offscreen canvas using calligraphic web fonts (*Caveat*, *Dancing Script*, or *Pacifico*) before rasterizing it into a transparent PNG stamp—ensuring the visual appearance stays identical on every recipient's machine without depending on local system fonts.
- **Scanned Wet-Ink Uploads:** Imports existing PNG or JPEG signature images directly via the browser `FileReader` API. For the cleanest look on shaded forms, upload a transparent-background PNG rather than a white-boxed phone photo.

### Local Signature Vault and Ink Styling

Up to ten created signatures persist automatically inside your browser's `localStorage`, letting you reuse your standard signature and initials across multi-contract sessions without creating an account or syncing biometrics to a cloud database.

## Legal Enforceability, Audit Trails, and Post-Signing Hygiene

Because visual overlays live as discrete objects appended to the page content stream, a sophisticated recipient with a PDF editor could technically extract or reposition an unflattened signature graphic. Follow three practical safeguards for high-value agreements:

1. **Flatten Before Distribution:** Pass the exported `_signed.pdf` through [Flatten PDF](/en/tools/flatten-pdf) to fuse interactive form fields and visual layers permanently into the page surface.
2. **Lock Finalized Agreements:** Apply AES-256 permissions via [Protect PDF](/en/tools/protect-pdf) to prevent casual edits, and retain the original signing email thread alongside a cryptographic hash of the final file as tamper evidence.
3. **Decrypt Restricted Templates First:** If a counterparty sends a permission-locked agreement that rejects modification on export, clear the restrictions with [Unlock PDF](/en/tools/unlock-pdf) (using the authorized password) before signing. Also double-check visually on documents containing non-zero `/Rotate` page dictionary entries (`90°` or `270°` rotated scans), ensuring your stamp aligns cleanly with the rendered orientation before sending.
