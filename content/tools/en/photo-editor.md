---
metaTitle: "Online Photo Editor | Free Browser Layers, Filters & Crop"
metaDescription: "Edit photos locally in your browser with color filters, text overlays, vector drawing, aspect-ratio crops, and PNG, JPEG, WebP, or AVIF export."
metaKeywords: "online photo editing, free photo editor, browser-based image editing, image editing tools, crop and resize photos, professional image editing, social media image editing, SEO image optimization, creative photo workflows, modern image editing, Canva alternatives, Photopea alternatives"
title: "Photo Editor"
shortDescription: "Retouch, crop, annotate, and layer raster images directly inside your browser with real-time HTML5 Canvas compositing, undo/redo history, and multi-format export."
faqs:
  - question: "Does this online photo editor reduce image resolution while I zoom in or out?"
    answer: "No. Viewport zoom (from 20% to 400%) only scales CSS presentation dimensions on screen. The underlying HTML5 Canvas backing store stays locked to your photo's native naturalWidth and naturalHeight until you explicitly invoke a custom resize or aspect-ratio crop."
  - question: "Are color adjustments and filter presets destructive to my layers?"
    answer: "Color adjustments (brightness, contrast, saturation, hue rotation, sepia, grayscale, blur, and radial vignette) are applied dynamically to the base image layer during each composite pass, leaving text overlays, dragged-in stickers, and vector annotations sharp and independently editable."
  - question: "Which export format should I pick between PNG, JPEG, WebP, and AVIF?"
    answer: "Pick PNG for lossless UI screenshots, sharp text graphics, or assets requiring transparent regions created with the eraser. Pick WebP or AVIF at 80%–90% quality for web publishing and Core Web Vitals optimization, and JPEG when broad legacy compatibility is required."
  - question: "How does the Eraser brush interact with the underlying image and layers?"
    answer: "The eraser records a vector stroke rendered with the Porter-Duff destination-out compositing mode, knocking out pixel alpha along the stroke path. Export as PNG or WebP to preserve those transparent cutouts rather than flattening them onto a solid background."
  - question: "Are my photos uploaded to a cloud server for editing or autosave?"
    answer: "Never. Decoding, Canvas 2D compositing, layer transformations, and binary Blob encoding all execute locally inside your browser tab. Workspace recovery snapshots are stored strictly in localStorage on your own device and never cross a network boundary."
features:
  - "Native-resolution HTML5 Canvas 2D compositing engine with 20%–400% viewport zoom and alignment grid overlay"
  - "Real-time color grading sliders (brightness, contrast, saturation, exposure, warmth, hue rotate, blur, and radial vignette)"
  - "Seven one-click editorial presets including Vintage Sepia, Cinematic Film, High Contrast B&W, HDR Color Pop, and Cool Iceberg"
  - "Independent layer stack supporting styled text overlays (fill, stroke, rotation, flip), drag-and-drop image overlays, and duplication"
  - "Vector annotation suite with freehand pen, destination-out eraser, straight line, directional arrow, rectangle, and circle tools"
  - "Aspect-ratio center cropping (1:1, 4:3, 16:9, 9:16, 4:5, 2:3), 90° rotation, flips, custom pixel resize, and PNG/JPEG/WebP/AVIF export"
useCases:
  - "Annotating product screenshots with directional arrows, callout boxes, and stroked labels for bug reports and documentation"
  - "Cropping and color-grading hero photography into 16:9 widescreen, 4:5 Instagram portrait, and 9:16 vertical story dimensions"
  - "Converting raw camera JPEGs into lightweight WebP or AVIF assets to improve Largest Contentful Paint (LCP) SEO metrics"
  - "Pasting clipboard captures via Ctrl+V to redact details, drop in brand watermarks, and export immediately without launching desktop software"
  - "Compositing multi-layer social media thumbnails by dragging transparent logos and bold Impact display titles over graded backdrops"
  - "Performing quick NDA-safe visual edits on confidential pitch decks, mockups, and legal exhibits without cloud upload exposure"
howToSteps:
  - "Upload an image (PNG, JPG, WebP, AVIF, SVG, GIF, or BMP) via drag-and-drop, file picker, or direct clipboard paste (Ctrl+V)."
  - "Open the Adjust or Filters tab to dial in brightness, contrast, saturation, hue shift, Gaussian blur, and radial vignette falloff."
  - "Switch to Text or Draw to add stroked typography, drag-and-drop image overlays, arrows, rectangles, or freehand annotations directly onto the canvas."
  - "Use the Transform tab to crop to standard social aspect ratios, rotate 90°, mirror horizontally or vertically, or enter exact output pixel dimensions."
  - "Manage layer ordering, opacity, rotation, duplication, or deletion inside the Layers panel, stepping backward or forward anytime with Ctrl+Z and Ctrl+Y."
  - "Open Export, pick PNG, JPEG, WebP, or AVIF along with a compression quality level, and download the flattened high-resolution raster."
---

Lightweight browser-based image editing used to mean trading away layer control, color precision, or privacy to sluggish server-side web apps. Powered by the native **HTML5 Canvas 2D rendering pipeline**, this **Photo Editor** delivers multi-layer compositing, non-destructive color grading, vector annotations, and modern WebP/AVIF encoding directly inside your local browser memory—making it a fast, zero-signup alternative to heavy cloud design suites for daily developer, marketing, and editorial workflows.

## Inside the HTML5 Canvas 2D Compositing Pipeline

Rather than mutating your original raster on every slider drag, the editor maintains a structured scene graph consisting of the base photograph, an active adjustment configuration, and an ordered stack of independent layers. On every redraw frame, `CanvasRenderingContext2D` executes four deterministic passes at the image's full native backing-store resolution (`naturalWidth × naturalHeight`):

1. **Base Filter Pass:** Applies the CSS Filter Effects pipeline (`brightness()`, `contrast()`, `saturate()`, `hue-rotate()`, `sepia()`, `grayscale()`, `blur()`) to the base bitmap inside an isolated `ctx.save()` / `ctx.restore()` context state so overlays remain crisp.
2. **Layer Compositing Pass:** Iterates upward through every text overlay, dragged image overlay, and vector stroke, honoring per-layer `globalAlpha` opacity (`0.0–1.0`).
3. **Optical Vignette Pass:** Synthesizes a smooth radial falloff via `createRadialGradient` from `30%` to `70%` of the longest canvas dimension, darkening frame corners to pull viewer focus inward.
4. **Interactive Selection Overlay:** Draws a zoom-compensated dashed bounding box around the active layer during editing, then strips it cleanly prior to binary export.

### Non-Destructive Layer Transforms and Porter-Duff Erasure

Each text and image overlay carries its own center-anchored affine transformation pipeline (`ctx.translate(cx, cy) → ctx.rotate(rad) → ctx.scale(flipX, flipY)`). Rotating or mirroring a watermark or sticker never degrades its pixel sharpness until final flattening. Pointer events on zoomed or responsive viewports are mapped back into exact backing-store pixel coordinates via:

```ts
const rect = canvas.getBoundingClientRect();
const canvasX = Math.round(((e.clientX - rect.left) / rect.width) * canvas.width);
const canvasY = Math.round(((e.clientY - rect.top) / rect.height) * canvas.height);
```

This ratio projection guarantees sub-pixel alignment for freehand brushes, geometric callouts (lines, arrowheads computed with `Math.atan2`, rectangles, circles), and the **Eraser** tool. Internally, eraser paths switch `ctx.globalCompositeOperation` to `"destination-out"`, using Porter-Duff alpha compositing to punch clean transparent voids through the canvas rather than painting opaque white over pixels.

## Choosing the Right Export Codec for Web and Print

When you click **Export**, the flattened canvas serializes directly through `HTMLCanvasElement.toBlob(callback, mimeType, quality)`. Selecting the right output codec directly impacts page-load speed, Core Web Vitals **Largest Contentful Paint (LCP)**, and visual fidelity.

| Export Format | MIME Type | Compression Architecture | Alpha Transparency | Quality Slider Behavior | Best Production Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PNG** | `image/png` | Lossless DEFLATE filtering | Full 8-bit alpha | Ignored (always lossless) | UI screenshots, crisp vector callouts, diagrams, and assets with erased transparent cutouts. |
| **JPEG** | `image/jpeg` | Lossy 8×8 DCT + YCbCr 4:2:0 | None (flattens alpha) | `0.10–1.00` quantization scale | Universal photo sharing, legacy email clients, and print workflows needing wide compatibility. |
| **WebP** | `image/webp` | VP8 lossy / VP8L predictive | Full 8-bit alpha | `0.10–1.00` rate-distortion target | High-speed SEO blog imagery, e-commerce thumbnails, and hero banners (25%–35% smaller than JPEG). |
| **AVIF** | `image/avif` | AV1 intra-frame block coding | Full 8-bit alpha | `0.10–1.00` perceptual quantizer | Next-generation responsive web delivery offering top compression ratios on Chromium and Firefox. |

Note that browsers omit EXIF camera tags, GPS coordinates, and ICC thumbnails when re-encoding via `canvas.toBlob()`, providing automatic privacy sanitization on export. If you need explicit metadata inspection or standalone stripping without re-encoding pixels, run source files through the [Image Metadata Remover](/en/tools/image-metadata-remover).

## Filter Presets, Color Grading, and Aspect-Ratio Geometry

Seven built-in presets combine multiple adjustment axes into repeatable starting points—for instance, **Cinematic Film** pairs `120%` contrast with a subtle `350°` hue shift and cooler temperature bias, **High Contrast B&W** locks `100%` grayscale at `125%` contrast, **Vintage Sepia** blends `40%` sepia with softened `80%` saturation and warm bias, and **HDR Color Pop** lifts contrast (`130%`), saturation (`120%`), and brightness (`105%`) simultaneously. Because presets simply populate the non-destructive adjustment state, you can immediately fine-tune any individual slider afterward or inspect composition alignment with the toggleable rule-of-thirds grid overlay.

For social and editorial layouts, one-click aspect ratio crops (`1:1` Square, `4:3` Standard, `16:9` Widescreen, `9:16` Vertical Reels/Shorts, `4:5` Instagram Portrait, and `2:3` Editorial) compute center-weighted bounding boxes that maximize retained pixel area while avoiding aspect-ratio distortion. Geometric transforms also include lossless `90°` clockwise rotation (swapping canvas width and height cleanly without clipping corners) and horizontal or vertical mirroring for selfie correction and symmetrical layouts. For specialized prep tasks before compositing, you can isolate foreground subjects cleanly using the [AI Background Remover](/en/tools/background-remover) and then drag the resulting transparent cutout straight onto your active workspace as an image layer, or run final batch weight reduction with the [Image Compressor](/en/tools/compress-image).

## Local Session Persistence, Clipboard Workflows, and Memory Limits

Speed matters most during repetitive engineering and content workflows: pressing `Ctrl+V` pastes any screenshot straight from your system clipboard onto a fresh canvas, dragging a second image onto an open workspace adds it automatically as a movable overlay layer, and `Ctrl+Z` / `Ctrl+Y` traverse a deep-cloned history stack across adjustments, layer mutations, crops, and rotations.

Active projects automatically snapshot into browser `localStorage` so accidental refreshes do not wipe out work in progress. Keep in mind that most browsers cap `localStorage` origins at roughly `5 MB`–`10 MB`; when editing multi-megapixel DSLR photographs (`4000px+`), resize or export promptly so large base64 canvas snapshots do not exceed local quota limits. Because zero bytes ever leave your machine, sensitive wireframes, internal dashboards, and pre-release marketing creatives stay strictly confidential from start to finish.
