---
metaTitle: "Scan to PDF Online: Camera Document Scanner in Browser"
metaDescription: "Turn your phone camera or webcam into a private document scanner. Capture paper pages, enhance B&W text contrast, reorder scans, and save as PDF."
metaKeywords: "scan to pdf, online document scanner, camera to pdf, mobile pdf scanner, paper to pdf, receipt scanner, webcam document scanner, black and white scan filter, browser pdf scanner"
title: "Scan to PDF"
shortDescription: "Turn your smartphone rear camera or desktop webcam into a zero-upload document scanner with real-time luminance enhancement, B&W contrast filtering, page rotation, and multi-page PDF compilation."
faqs:
  - question: "Why does the browser ask for camera permission, and is video streamed anywhere?"
    answer: "Accessing your rear smartphone lens or webcam requires explicit permission through the W3C MediaDevices.getUserMedia() API on an HTTPS connection. The live video feed stays strictly inside your local browser tab; frames are snapped onto an offscreen HTML5 canvas in memory and never streamed or uploaded to a server."
  - question: "How does the Black & White Document filter make gray paper backgrounds look crisp white?"
    answer: "The scanner converts every captured RGBA pixel to perceived luminance using the ITU-R BT.601 formula (0.299R + 0.587G + 0.114B). Pixels brighter than the luminance threshold of 140 clip straight to pure white (255), bleaching off-white paper and light shadows, while darker ink strokes multiply by 0.7 to sharpen contrast."
  - question: "Can I switch a page's filter from B&W back to Original color after capturing it?"
    answer: "Yes. Every scanned page retains its original raw frame in memory alongside the processed preview. Changing a page between Original, Grayscale, and B&W—or rotating it in 90-degree increments—always re-processes cleanly from the untouched original capture to prevent cumulative quality loss."
  - question: "What is the difference between A4, US Letter, and Fit page sizing for camera scans?"
    answer: "A4 (595.28 x 841.89 pt) and US Letter (612 x 792 pt) place each scanned page centered inside a standardized print sheet with a 20-point margin so multi-page contracts print uniformly. Fit mode creates a custom PDF page matching each frame's exact captured aspect ratio with zero borders—ideal for long thermal receipts."
  - question: "Can I upload existing photos of paper documents instead of using a live camera?"
    answer: "Yes. Alongside live camera capture, you can batch-import existing document photos from your phone gallery or desktop drive. Imported images pass through the exact same luminance enhancement, rotation, drag-and-drop page reordering, and pdf-lib compilation pipeline."
features:
  - "Direct HTML5 camera capture via navigator.mediaDevices.getUserMedia() targeting rear environment lenses at 1920x1080 Full HD"
  - "Real-time ITU-R BT.601 luminance processing with three non-destructive filter modes: High-Contrast B&W Document, Grayscale, and Original Color"
  - "Hybrid capture workflow combining live multi-shot camera scanning with gallery or desktop image uploads in a single document queue"
  - "Per-page 90-degree rotation, instant filter toggling, deletion, and HTML5 drag-and-drop page reordering"
  - "Client-side pdf-lib compilation outputting standardized A4, US Letter (with 20 pt margins), or zero-margin exact-fit PDF sheets"
  - "Private local execution ensuring sensitive tax forms, receipts, identification cards, and signed contracts never touch external servers"
useCases:
  - "Digitizing stacks of thermal retail receipts and expense vouchers into high-contrast B&W PDFs before ink fades"
  - "Scanning multi-page signed rental leases, NDAs, and tax returns directly from a phone browser without installing native apps"
  - "Capturing handwritten whiteboard notes, lecture handouts, and textbook diagrams in Grayscale or Original color"
  - "Photographing government IDs, passports, and insurance cards locally without risking cloud storage exposure"
  - "Assembling mixed desktop webcam captures and mobile gallery photos into a unified US Letter or A4 submission packet"
  - "Preparing clean, high-contrast paper scans ready for downstream OCR text extraction or digital signature placement"
howToSteps:
  - "Click Start Camera and grant browser camera access (or click Upload Photos to import existing document images from disk or gallery)."
  - "Choose a default Scan Filter (B&W Document for text and receipts, Grayscale for shaded forms, or Original for color stamps and IDs)."
  - "Align each paper sheet under even lighting and tap the shutter button repeatedly to capture all pages into your local queue."
  - "Drag page thumbnails into the right reading order, rotate sideways shots in 90-degree steps, and override individual page filters if needed."
  - "Select A4, US Letter, or Fit page sizing, click Compile PDF, and download your timestamped multi-page PDF document."
---

Dedicated mobile scanning apps routinely gate multi-page exports behind subscriptions or upload private financial paperwork, tax statements, and identity documents to remote cloud pipelines for enhancement. Modern web browsers already expose the hardware sensors and pixel-manipulation primitives needed to digitize physical paperwork locally. NexusCalculator's Scan to PDF engine combines the W3C Media Capture API, pixel-level luminance filtering on HTML5 Canvas, and `pdf-lib` binary compilation to turn any smartphone rear camera or desktop webcam into a zero-upload document scanner.

## Camera Acquisition Through the Web MediaDevices API

When you activate live capture, the scanner invokes `navigator.mediaDevices.getUserMedia()` with hardware constraints tailored for physical documents:

- **`facingMode: "environment"`**: Requests the high-resolution autofocus rear lens on Android and iOS handsets instead of the lower-resolution front selfie camera, while falling back automatically to the default webcam on laptops and desktops.
- **`width: { ideal: 1920 }, height: { ideal: 1080 }`**: Negotiates a 1080p Full HD video stream (roughly 2.07 megapixels per frame) whenever the camera sensor supports it, ensuring 10-point contract body copy remains legible after scaling onto A4 or US Letter paper.

Tapping the shutter snaps the live `<video>` element directly at its native `video.videoWidth × video.videoHeight` sensor dimensions—not the smaller CSS viewport size—preventing accidental downsampling before filtering begins. Closing camera mode or navigating away invokes `track.stop()` on every active `MediaStreamTrack` so the hardware camera LED switches off immediately.

## Luminance Weighting and Document Contrast Enhancement

Raw camera photos of white paper rarely look white: ambient tungsten bulbs tint sheets yellow, fluorescent overheads cast greenish-gray gradients, and smartphone auto-exposure settles paper luminance near 180–210 instead of pure 255. Sending unenhanced snapshots straight to a printer wastes toner on gray backgrounds and reduces readability.

### Inside the B&W Thresholding Pipeline

Every captured or uploaded page runs through an offscreen Canvas 2D pixel loop using ITU-R BT.601 luma coefficients (`0.299`, `0.587`, `0.114`) that reflect human eye sensitivity to red, green, and blue light:

```javascript
for (let i = 0; i < data.length; i += 4) {
  const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;

  if (filter === "grayscale") {
    data[i] = data[i + 1] = data[i + 2] = gray;
  } else if (filter === "bw") {
    // High-contrast document mode: bleach paper above 140, deepen ink by 30%
    const value = gray > 140 ? 255 : gray * 0.7;
    data[i] = data[i + 1] = data[i + 2] = value;
  }
}
```

Rather than hard 1-bit binary thresholding (which turns anti-aliased letter edges jagged), multiplying dark pixels below `140` by `0.7` deepens ink density while preserving subtle edge anti-aliasing—simulating a clean office photocopier without shattering serif fonts.

## Choosing the Right Scan Filter for Receipts, Contracts, and IDs

Because different physical media respond differently to fixed luminance clipping, you can set a global default filter and still override individual pages non-destructively:

| Scan Filter Mode | Pixel Transformation | Background Noise Removal | Relative PDF Size | Best Physical Source Documents |
| :--- | :--- | :--- | :--- | :--- |
| **B&W Document (`bw`)** | BT.601 luma; `> 140 → 255`, `≤ 140 → 0.7 × gray` | High — clips off-white paper to `#FFFFFF` | Smallest (flat white runs compress efficiently) | Laser contracts, invoices, faded thermal receipts, black ink notes |
| **Grayscale (`grayscale`)** | Continuous 8-bit BT.601 luminance (`0–255`) | Moderate — strips color casts, keeps shading | Medium | Pencil drawings, shaded tables, watermarks, unevenly lit book pages |
| **Original (`original`)** | Untouched 24-bit RGB sensor capture | None — preserves exact ink and photo hues | Largest | Passports, driver's licenses, blue wet-ink signatures, color stamps |

Once you compile a scanned document into a PDF, remember that camera captures contain raster pixels rather than selectable text. To index or copy text from scanned contracts, run the exported file through [PDF OCR](/en/tools/pdf-ocr). If your scan captures a driver's license or bank statement containing account numbers you need to hide permanently before emailing, apply opaque blackouts with [Redact PDF](/en/tools/redact-pdf).

## Non-Destructive Page Management and Print-Ready Compilation

Each entry in the scanner queue stores two distinct buffers: `originalDataUrl` (the pristine captured frame) and `processedDataUrl` (the rendered JPEG at `0.85` quality). Whenever you rotate a page by 90 degrees or toggle between `B&W`, `Grayscale`, and `Original`, the engine recomputes from `originalDataUrl`. That non-destructive architecture eliminates generational JPEG degradation even if you rotate and re-filter a page multiple times.

Drag-and-drop sequence ordering lets you interleave newly snapped pages with uploaded gallery images effortlessly. During export, `pdf-lib` embeds every processed page into a fresh PDF container: `A4` and `US Letter` modes scale each scan proportionally inside a consistent `20 pt` margin for clean office printing, whereas `Fit` mode creates zero-margin pages matching exact pixel dimensions—preventing tall narrow store receipts from shrinking into tiny slivers. Need to countersign a paper agreement right after scanning it? Drop the compiled PDF directly into [Sign PDF](/en/tools/sign-pdf).

## Field Capture Best Practices and Camera Troubleshooting

- **Prevent Shadow Clipping Under B&W Mode**: If a heavy phone shadow crosses a page and drops local paper luminance below `140`, the B&W filter will darken that shadowed patch instead of bleaching it white. Shoot near indirect window light or tilt the sheet slightly away from overhead lamps—or toggle that specific page to `Grayscale`.
- **Fill the Frame and Hold Parallel**: On a `1920 × 1080` capture, framing an A4 sheet so it fills 90% of the height yields roughly `150–165` effective PPI, which stays crisp for both print and OCR. Hold your phone parallel to the tabletop and wait half a second for continuous autofocus to lock before tapping capture, avoiding keystone distortion and motion blur on fine print.
- **HTTPS Context Requirement**: Modern browsers block `navigator.mediaDevices.getUserMedia()` on insecure `http://` origins or when embedded inside restrictive cross-origin iframes without `allow="camera"`. If a corporate laptop lacks a webcam or restricts permissions, use the Upload button to batch-process photos transferred from your phone instead.
