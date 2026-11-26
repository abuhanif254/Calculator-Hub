---
title: "HEIC vs JPG: Why iPhones Use HEIC and How to Convert Them"
description: "Compare HEIC (HEIF/H.265) and JPG (JPEG) compression, bit depth, file size, and compatibility, and learn how to convert iPhone photos locally in your browser without losing quality."
category: "Design & Media"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "heic-to-jpg"
relatedType: "tool"
faqs:
  - question: "Does converting HEIC to JPG reduce image quality?"
    answer: "Because both HEIC and standard JPG use lossy compression, transcoding from HEIC to JPG introduces a small amount of re-encoding loss. Converting once at high JPG quality (88 to 95) keeps structural similarity (SSIM) above 0.98 and preserves all pixel detail for web and print use, though 10-bit Display P3 gradients are quantized down to 8-bit sRGB."
  - question: "Why are HEIC files roughly half the size of JPG files?"
    answer: "HEIC encodes still images inside a HEIF container using HEVC (H.265) intra-frame compression with variable Coding Tree Units up to 64x64 pixels, 35 directional prediction modes, and CABAC entropy coding. JPG relies on 1992-era fixed 8x8 Discrete Cosine Transform blocks and simpler Huffman coding, requiring roughly twice the bitrate to avoid blocking artifacts."
  - question: "How do I stop my iPhone from saving or transferring photos as HEIC?"
    answer: "On iPhone, open Settings > Camera > Formats and choose Most Compatible to shoot directly in JPG instead of High Efficiency (HEIC), though this disables some high-resolution ProRAW/HEIF storage savings. Alternatively, keep shooting in HEIC and set Settings > Photos > Transfer to Mac or PC to Automatic so iOS converts photos to JPG only during USB export."
  - question: "Why won't Windows or older web portals open HEIC files natively?"
    answer: "HEVC (H.265) is patent-encumbered, so Microsoft does not bundle the decoder free in default Windows builds—requiring users to install the HEVC Video Extensions codec or convert the file. Many government portals, university systems, and legacy CMS uploaders also restrict MIME types strictly to image/jpeg and image/png."
  - question: "Are GPS coordinates and camera EXIF metadata kept when converting HEIC to JPG?"
    answer: "Most converters can either preserve or strip EXIF metadata (camera model, shutter speed, ISO, and GPS latitude/longitude). If you are uploading converted JPGs to public classifieds, job portals, or forums, stripping GPS location tags protects physical privacy, whereas archiving personal albums benefits from keeping capture timestamps."
---

Apple adopted **HEIC** (High-Efficiency Image Container) as the default iPhone camera format in iOS 11 because modern `12 MP`, `24 MP`, and `48 MP` smartphone sensors rapidly exhaust device storage when saved as legacy **JPG** files. By pairing the ISO-standard HEIF container with modern **H.265 (HEVC)** intra-frame compression, HEIC cuts file sizes by **45% to 55%** compared to JPG while supporting `10-bit` color, wide-gamut Display P3, depth maps, and HDR gain maps.

Despite its technical superiority, HEIC fails on universal compatibility: countless Windows machines, Android browsers, enterprise CRMs, and government upload portals still reject `.heic` files. When you need universal playback without uploading private photos to remote servers, transcode batches locally in browser memory using our zero-cloud [HEIC to JPG Converter](/en/tools/heic-to-jpg).

## Compression Architecture: HEIC (HEVC) vs. Baseline JPG

Understanding why HEIC outperforms JPG requires separating the **container** from the **codec**:

- **HEIC (`ISO/IEC 23008-12` + `H.265`):** `.heic` is Apple's extension for High-Efficiency Image File Format (HEIF), an ISOBMFF container storing still frames compressed with **HEVC** intra-frame prediction alongside depth maps, Live Photo clips, alpha masks, and HDR gain maps.
- **JPG (`ISO/IEC 10918-1`):** Baseline JPEG converts RGB pixels to `YCbCr` (`4:2:0` subsampling), partitions frames into rigid `8×8` pixel blocks, applies a **Discrete Cosine Transform (DCT)**, quantizes frequencies, and encodes streams with Huffman tables.

HEIC achieves roughly double the compression efficiency of JPG through three structural upgrades:

```text
Compression Ratio = Uncompressed RGB Size / Encoded File Size
Bitrate Savings   = (Size_JPG − Size_HEIC) / Size_JPG × 100%
Color Precision   = 2^Bits_per_Channel  (JPG 8-bit = 256 levels vs. HEIC 10-bit = 1,024 levels)
```

First, HEVC replaces fixed `8×8` blocks with adaptive **Coding Tree Units (CTUs)** ranging from `4×4` up to `64×64` pixels—encoding smooth skies or skin tones in large blocks without visible grid boundaries. Second, HEVC evaluates `35` directional intra-prediction modes per block rather than JPEG's basic DC/vertical/horizontal prediction. Third, **CABAC** (Context-Adaptive Binary Arithmetic Coding) packs quantized residuals `10% to 15%` tighter than static Huffman tables.

## Worked Example: Storage and Bandwidth for a 200-Photo 24 MP Album

Consider exporting a `200`-photo travel album captured on an iPhone `15`/`16`/`17` at the default `24 MP` resolution (`5712 × 4284` pixels = `24,470,208` pixels per image). Compare uncompressed RGB memory against HEIC and two practical JPG export targets:

1. **Uncompressed 24-bit RGB Baseline:** Each pixel requires `3` bytes (`R`, `G`, `B`). One frame occupies `24,470,208 × 3 = 73,410,624` bytes (`~73.4 MB` decimal, or `70.0 MiB`). Storing `200` raw frames would consume `14.68 GB`.
2. **Native 10-bit HEIC Archive:** At an average `2.4 MB` per `24 MP` photo (`30.6:1` compression vs. uncompressed RGB), `200` HEIC photos require `200 × 2.4 MB = 480 MB` (`0.48 GB`).
3. **High-Quality JPG Conversion (`Q = 92`):** Matching the perceptual sharpness of the original HEIC requires roughly `5.2 MB` per `24 MP` JPG (`2.17×` larger than HEIC). Total album size climbs to `200 × 5.2 MB = 1,040 MB` (`1.04 GB`)—adding `560 MB` (`+116.7%`) of storage overhead for just `200` shots, or `28 GB` across a `10,000`-photo library.
4. **Portal-Friendly JPG Conversion (`Q = 80`):** Many immigration, university, and insurance portals enforce a `3.0 MB` per-file upload ceiling. Dropping export quality from `Q = 92` to `Q = 80` reduces the average `24 MP` JPG to `2.6 MB` (`50.0%` smaller than `Q = 92` and safely under `3.0 MB`) while maintaining structural similarity (`SSIM > 0.96`) and cutting the `200`-photo batch down to `520 MB`.

## Image Format and Quality Benchmark Table

The table below benchmarks standard smartphone photo formats and export targets for a typical `12 MP` (`4032 × 3024`) and `24 MP` (`5712 × 4284`) outdoor photograph.

| Format / Export Preset | Codec & Bit Depth | Typical 12 MP Size | Typical 24 MP Size | Alpha / HDR Support | Compatibility & Best Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HEIC (iPhone Default)** | HEVC (`H.265`), `10-bit` | `1.3 – 1.8 MB` | `2.1 – 2.7 MB` | Alpha + HDR gain map | Apple ecosystem; primary on-device archival |
| **JPG (`Q = 92`, Print/Archive)** | DCT Huffman, `8-bit` | `2.8 – 3.8 MB` | `4.8 – 5.8 MB` | None (sRGB flat) | Universal; photo printing, client delivery, editing |
| **JPG (`Q = 80`, Web/Portal)** | DCT Huffman, `8-bit` | `1.4 – 1.9 MB` | `2.3 – 2.9 MB` | None (sRGB flat) | Universal; forms with `2–3 MB` upload limits |
| **WebP (Lossy `Q = 82`)** | VP8/VP8L, `8-bit` | `1.1 – 1.6 MB` | `1.8 – 2.5 MB` | Alpha transparency | Modern web apps (`97%+` browser support) |
| **PNG (Lossless)** | DEFLATE, `8/16-bit` | `14 – 20 MB` | `26 – 38 MB` | Full 8-bit/16-bit alpha | UI screenshots, line art; never ideal for camera photos |
| **AVIF (High Efficiency)** | AV1, `10/12-bit` | `0.9 – 1.3 MB` | `1.5 – 2.1 MB` | Alpha + HDR | Cutting-edge web delivery; slower encode/legacy gaps |

## Conversion Pitfalls, Color Management, and Privacy Caveats

When converting iPhone photos at scale, four technical pitfalls commonly degrade output quality or leak metadata:

- **Generation Loss:** Never convert HEIC to a low-quality `Q = 70` JPG, crop it, and re-save as JPG; repeated DCT quantization adds ringing noise. Keep `.heic` masters intact and export once at `Q = 90–92`.
- **Display P3 Color Clipping:** Modern iPhones capture **Display P3** (`25%` larger gamut than sRGB). Stripping the ICC profile without gamut-mapping P3 to `8-bit` sRGB oversaturates reds and greens on Windows monitors and browsers.
- **EXIF & GPS Exposure:** `.heic` files embed timestamps, camera specs, and GPS coordinates—strip location tags before submitting JPGs to public forms.
- **Client-Side Privacy:** Sensitive IDs, receipts, and family photos should never hit remote servers. Converting locally with our [HEIC to JPG Converter](/en/tools/heic-to-jpg) runs inside your browser with zero uploads.
