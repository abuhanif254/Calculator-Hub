---
metaTitle: "QR Code Generator — Custom Vector SVG, PNG, WiFi & Logos"
metaDescription: "Design offline QR codes for URLs, WiFi, vCards, and crypto with custom gradients, logos, Reed-Solomon controls, and instant SVG, PNG, or ZIP export."
metaKeywords: "qr code generator, generate qr code, custom qr code generator, free qr creator, qr code with logo, bulk qr code generator, wifi qr code generator, vcard qr code, svg qr code download, qr code styling, client side qr code, vector qr code"
title: "QR Code Generator & Designer"
shortDescription: "Create permanent, non-expiring QR codes for URLs, WiFi networks, vCards, events, and crypto addresses with custom colors, gradients, rounded modules, embedded logos, and instant SVG, PNG, or batch ZIP downloads."
faqs:
  - question: "Do QR codes created with this generator ever expire or require a subscription?"
    answer: "No. Every matrix generated here is a static ISO/IEC 18004 QR code that embeds your exact URL, WiFi credentials, or vCard payload directly in the symbol rather than routing through a paid redirect server. As long as your target link or data remains valid, the QR code works indefinitely."
  - question: "Which error correction level is required when placing a brand logo in the center?"
    answer: "Always select Level H (High, 30% codeword recovery) when adding a center logo, and keep the logo overlay at or below 20% of the total matrix width. The scanner treats the occluded center modules as damaged data and mathematically reconstructs them using Reed-Solomon parity blocks."
  - question: "When should I export SVG instead of PNG for a QR code?"
    answer: "Download SVG whenever the QR code is going into print layouts (business cards, packaging, signage, posters) or Illustrator/Figma workflows, because vector paths scale cleanly to any DPI without anti-aliasing blur. Choose high-resolution PNG (512px to 1024px) for websites, slide decks, and messaging apps."
  - question: "Why won't my styled QR code scan on some smartphone cameras?"
    answer: "Scan failures almost always stem from one of four causes: insufficient luminance contrast between modules and background, inverted polarity (light dots on a dark surface), trimming the mandatory 4-module quiet zone margin, or shrinking a dense payload below roughly 0.4 mm per physical module."
  - question: "How do special characters inside WiFi SSIDs or passwords work in WiFi QR codes?"
    answer: "The standard WIFI: URI schema uses semicolons, colons, and commas as field delimiters. If your network name or passphrase contains ';', ':', ',', or '\\', those characters must be backslash-escaped (for example, '\\;') so iOS and Android camera parsers do not split the password prematurely."
features:
  - "12 structured payload builders covering URL, plain text, WiFi, vCard 3.0, email, SMS, phone, WhatsApp, GPS, iCalendar events, social handles, and crypto wallets"
  - "Configurable ISO/IEC 18004 Reed-Solomon error correction (L, M, Q, H), module resolution up to 1024px, and adjustable quiet-zone margins"
  - "Custom module geometries (square, circular dots, rounded capsules) and independent Finder Eye shapes and dual-tone colors"
  - "Solid or linear/radial gradient foreground fills, transparent background export, and centered logo overlays with adjustable scale and corner radius"
  - "Lossless vector SVG and raster PNG export, clipboard image copy, built-in scan verification, and local history storage"
  - "Multi-line Batch Mode that renders dozens of styled QR codes client-side and packages them into a single ZIP archive"
useCases:
  - "Generating zero-typing guest WiFi cards for offices, cafes, vacation rentals, and conference rooms without exposing passphrases to external servers"
  - "Printing crisp vector SVG vCard contact codes on business cards, exhibitor badges, and speaker slides"
  - "Embedding branded logo QR codes on product packaging, instruction manuals, and restaurant menus"
  - "Creating batch ZIP archives of asset-tracking labels, warehouse bin identifiers, or event check-in tickets from a line-separated list"
  - "Encoding verifiable Bitcoin or Ethereum payment URIs on invoices and donation signage to eliminate manual address typos"
  - "Linking physical flyers, real-estate signs, and invitations directly to GPS coordinates or one-tap calendar events"
howToSteps:
  - "Select one of the 12 payload tabs (such as URL, WiFi, vCard, Event, or Crypto) and enter your structured fields."
  - "Set the Error Correction level (keep Level H active if you plan to embed a logo) alongside your desired pixel size and quiet-zone margin."
  - "Style the matrix using solid colors or linear/radial gradients, choose square, dot, or rounded module shapes, and customize Finder Eye styling if needed."
  - "Upload an optional center logo via click or drag-and-drop, adjusting its scale (~15% to 20%) and background padding to preserve scan reliability."
  - "Verify the live preview and test scanning with a phone camera, then download the final asset as vector SVG or PNG — or switch to Batch Mode to export a ZIP bundle."
---

A **Quick Response (QR) code** compresses arbitrary digital payloads into an optically scannable two-dimensional matrix standardized under **ISO/IEC 18004**. Unlike third-party "dynamic" QR SaaS platforms that route every scan through proprietary redirect links — creating tracking logs, subscription lock-in, and dead links if the vendor folds — this generator calculates every Reed-Solomon codeword, draws the canvas or vector SVG, and packages batch ZIP exports entirely inside your local browser memory. Sensitive payloads such as WPA2/WPA3 WiFi passphrases, private contact cards, and cryptocurrency wallet addresses never leave your device.

## ISO/IEC 18004 Matrix Geometry, Encoding Modes, and Version Sizing

Every QR symbol is built on a square grid of binary cells called **modules**. Symbol dimensions scale across 40 standardized versions according to the exact formula $\text{modules} = 4V + 17$, starting at **Version 1 (21×21)** and reaching **Version 40 (177×177)**.

Before payload bits fill the matrix, fixed functional structures claim deterministic coordinates:

- **Three Finder Patterns**: Placed at the top-left, top-right, and bottom-left corners, each 7×7 marker maintains an unmistakable `1:1:3:1:1` dark-light-dark-light-dark scan-line ratio from any 360-degree rotation.
- **Separators & Timing Patterns**: Single-module light separators isolate the finder eyes, while alternating dark/light timing strips along row 6 and column 6 let optical decoders lock onto the exact module pitch.
- **Alignment Patterns (Version 2+)**: Smaller 5×5 targets distributed across the interior compensate for lens distortion and curved surfaces (such as bottles or tubes).
- **Format Information & Masking**: Two redundant 15-bit BCH(15,5) format strips record the error-correction level and whichever of the **8 XOR mask patterns** produced the lowest penalty score (eliminating large monochrome blobs or false finder-like sequences that confuse cameras).

Payload compactness also depends heavily on the **encoding mode** selected by the encoder: **Numeric** packs three digits into 10 bits (3.33 bits/char), **Alphanumeric** (`0–9`, uppercase `A–Z`, and 9 punctuation symbols) uses 5.5 bits/char, **Byte (UTF-8)** consumes 8 bits/char, and **Kanji** compresses Shift JIS double-byte characters into 13 bits each. Keeping URLs short and clean — and percent-encoding unsafe query characters cleanly via the [URL Encoder](/en/tools/url-encoder) beforehand — reduces the matrix version, producing larger, faster-scanning modules at the exact same physical print size.

## Reed-Solomon Error Correction and Logo Occlusion Budget

QR resilience comes from **Reed-Solomon error correction over Galois Field $\text{GF}(2^8)$**. The encoder splits data bytes into blocks, computes polynomial parity codewords, and interleaves them across the grid so localized scratches, glare, or a center brand logo can be reconstructed cleanly.

| Level | Recoverable Codewords | Max Version 40 Capacity (Bytes) | Max Version 40 Capacity (Alphanumeric) | Safe Center Logo Area | Recommended Deployment |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **L (Low)** | ~7% | 2,953 bytes | 4,296 chars | None | High-density digital screens, short clean displays |
| **M (Medium)** | ~15% | 2,331 bytes | 3,391 chars | Up to 10% | Standard brochures, receipts, web links |
| **Q (Quartile)** | ~25% | 1,663 bytes | 2,420 chars | Up to 15% | Retail labels, outdoor flyers, light wear |
| **H (High)** | ~30% | 1,273 bytes | 1,852 chars | Up to 20% | Branded center-logo codes, industrial/harsh surfaces |

When embedding a logo, never exceed roughly 20% of the total matrix area even on Level `H`, and leave a crisp light padding border around the badge so edge modules do not visually fuse into the artwork. Keep logos strictly centered so they never overlap the three finder eyes or the 15-bit format strips hugging them.

## Standardized QR Payload Grammars (WiFi, vCard 3.0, Calendar, Crypto)

Modern iOS and Android camera apps trigger native OS actions when they detect recognized URI or structured-text grammars inside a QR payload. For WiFi auto-join credentials, escape any literal `\`, `;`, `,`, or `:` inside the SSID or passphrase with a backslash so the mobile OS parser does not truncate the field early:

```text
WIFI:T:WPA;S:Studio\;Guest;P:CorrectHorse\:2026;H:false;;
```

Contact cards use the RFC 2426 **vCard 3.0** structure, while calendar invites rely on **iCalendar `VEVENT`** blocks with ISO 8601 UTC timestamps (`YYYYMMDDTHHMMSSZ`), and direct payment or messaging triggers use compact URI schemes such as `SMSTO:`, `mailto:`, `geo:`, and BIP-21 `bitcoin:`:

```text
BEGIN:VCARD
VERSION:3.0
N:Patel;Priya;;;
FN:Priya Patel
ORG:Northstar Labs
TEL;TYPE=CELL:+15551234567
EMAIL;TYPE=INTERNET:priya@northstar.example
END:VCARD
```

```text
SMSTO:+15559876543:Check-in confirmed
geo:37.7749,-122.4194
bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.015
```

Because vCard and `VEVENT` iCalendar payloads grow rapidly in byte count, include only essential fields (full name, mobile number, email, URL, or event start/end time and room) so the matrix stays below Version 8–10 and scans smoothly even on compact 25 mm business cards or lanyard badges.

## Print Production, Contrast Ratios, Vector SVG Export, and Batch Workflows

Physical print reliability follows straightforward optical engineering thresholds:

1. **10:1 Scan-Distance Rule**: Size the printed symbol width to at least one-tenth of the expected scanning distance (a poster scanned from 1.5 meters needs at least a 15 cm QR code). Keep individual modules at **0.4 mm or wider** for offset printing and **0.5 mm+** on low-DPI thermal label printers.
2. **Preserve the 4-Module Quiet Zone**: Never crop flush to the outer finder eyes. Camera binarization algorithms rely on a clean, uniform 4-module margin around all four sides to isolate the symbol from background typography.
3. **Dark Foreground on Light Background**: Maintain high luminance contrast across every gradient stop. Inverted polarity (white modules on black packaging) works on modern phones but still fails on many handheld warehouse scanners and older retail POS terminals.
4. **Vector Export and Bulk Packaging**: Export **SVG** for press-ready scalability — and strip redundant path metadata before embedding inline on web pages with the [SVG Optimizer](/en/tools/svg-optimizer). For high-volume operational jobs (conference badges, inventory stickers, classroom links), switch into **Batch Mode** to generate an entire line-separated list as a client-side ZIP bundle. If you want additional frame callouts and campaign presets, explore the companion [QR Code Studio](/en/tools/qr-code-studio).
