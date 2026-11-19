---
metaTitle: "RGB to HEX Converter — RGBA to HEX8, Bulk Mode & SCSS"
metaDescription: "Convert RGB and RGBA values to 6- or 8-digit HEX codes offline in your browser. Features bulk batch parsing, EyeDropper sampling, WCAG checks, and SCSS."
metaKeywords: "rgb to hex, rgba to hex, rgb to hex converter, color converter, rgb to rgba, hexa color code, 8-digit hex converter, wcag contrast checker, color palette generator, css color converter, tailwind color code, color design utilities"
title: "RGB to HEX Converter"
shortDescription: "Encode RGB and RGBA color channels into 6-digit HEX and 8-digit HEXA strings individually or in bulk, with EyeDropper sampling, live UI previews, and CSS/SCSS token exports."
faqs:
  - question: "What RGB string formats does the smart parser accept?"
    answer: "Both single mode and Bulk Conversion Mode parse four grammars automatically: legacy CSS comma notation like rgba(59, 130, 246, 0.5), modern CSS Color 4 slash syntax like rgb(59 130 246 / 50%), raw CSV integers such as 81, 130, 49, and space-delimited triplets like 81 130 49."
  - question: "How is a decimal alpha value converted into the last two digits of an 8-digit HEXA code?"
    answer: "The alpha fraction between 0.0 and 1.0 is multiplied by 255, rounded to the nearest integer, converted to base-16, and zero-padded to two characters. For example, 0.5 becomes Math.round(127.5) = 128, which encodes to 80 in hexadecimal."
  - question: "Why must single-digit hex channels be zero-padded when converting RGB to HEX?"
    answer: "Every RGB channel occupies a fixed 2-character byte slot in a 6-digit hex code. If decimal 5, 10, and 15 were concatenated without padding, the invalid string #5AF would be misinterpreted as shorthand #55AAFF (85, 170, 255) instead of the true dark color #050A0F."
  - question: "How does Bulk Conversion Mode handle invalid rows in a pasted list?"
    answer: "Each newline-delimited row is validated independently against the 0-255 channel bounds and 0.0-1.0 alpha range. Valid rows render live color swatches and hex outputs while malformed lines are clearly marked as Invalid format and excluded when downloading bulk-colors.json."
  - question: "Which browsers support the built-in desktop EyeDropper button?"
    answer: "The native W3C EyeDropper API works in Chromium-based desktop browsers including Chrome, Edge, Opera, and Brave over HTTPS. In Firefox or Safari, you can still use the native HTML5 color input or sample pixel values directly from screenshots using our image eyedropper tool."
features:
  - "Real-time RGB and RGBA sliders paired with a multi-grammar parser for CSS Color 3, CSS Color 4 slash syntax, CSV, and space-separated triplets"
  - "Dedicated Bulk Conversion Mode for newline-delimited batch RGB lists with copy-all output and clean bulk-colors.json downloads"
  - "Native W3C EyeDropper API integration to sample desktop screen pixels directly into sRGB channels"
  - "Live UI component preview rendering buttons, badges, and cards in both light and dark containers with automatic foreground legibility"
  - "Integrated WCAG 2.1 relative luminance audit, four geometric color harmonies, and an angle-controlled CSS gradient preview"
  - "One-click clipboard copy and file downloads for CSS Custom Properties (.css), Sass tokens (.scss), Tailwind arbitrary classes, and JSON specs"
useCases:
  - "Converting computed getComputedStyle() rgb() values copied from Chrome or Firefox DevTools into clean HEX design tokens"
  - "Batch-migrating hundreds of CSV or spreadsheet RGB rows into normalized #RRGGBB and #RRGGBBAA arrays for a new theme release"
  - "Encoding translucent rgba() modal overlays into 8-digit HEXA strings for compact SVG attributes and modern CSS stylesheets"
  - "Generating matching Sass ($color-primary-hex) and CSS (:root) variables from a single set of brand RGB channels"
  - "Sampling on-screen brand accents with the EyeDropper tool and validating WCAG AA/AAA text contrast on live UI cards"
  - "Translating HTML5 Canvas ImageData Uint8ClampedArray triplets into Tailwind arbitrary classes like bg-[#518231]"
howToSteps:
  - "Enter Red, Green, and Blue integers (0-255) via the numeric fields or sliders, or paste a full rgb()/rgba() string into the smart parser."
  - "Drag the Alpha slider when you need an 8-digit HEXA code with embedded transparency, or click the EyeDropper icon to sample from your screen."
  - "Inspect the synchronized HEX, HEXA, HSL, HSLA, and Tailwind outputs alongside the live light and dark UI component previews."
  - "Verify WCAG 2.1 AA and AAA contrast badges against white and black text and review generated Complementary, Analogous, Triadic, and Monochromatic palettes."
  - "Download .css, .scss, or .json token files from the Export hub, or switch to Bulk Conversion Mode to process multi-line RGB lists at once."
---

Browser DevTools, HTML5 Canvas `ImageData` arrays, charting libraries, and legacy stylesheets routinely expose colors as decimal `rgb()` or `rgba()` triplets. When those values need to go back into a design system specification, SVG fill attribute, Tailwind config, or Sass variable sheet, hexadecimal notation is far cleaner to store, diff, and share. This **RGB to HEX Converter** encodes individual channels or entire newline-separated batches into 6-digit `#RRGGBB` and 8-digit `#RRGGBBAA` strings right inside your browser, complete with Sass/CSS exporters and live component previews.

## Encoding 8-Bit Channel Integers and Alpha Fractions into Base-16

Converting an additive RGB color into hexadecimal is a deterministic radix-16 encoding of three unsigned 8-bit integers (`0–255`). Each channel divides by `16`: the integer quotient selects the high hex digit (`0–9`, `A–F`), and the remainder selects the low digit. In JavaScript or build tooling, bit-packing all three channels into a 24-bit integer produces an identical result in a single expression:

```javascript
function rgbToHex(r, g, b) {
  const clamp = (n) => Math.min(255, Math.max(0, Math.round(n)));
  const packed = (clamp(r) << 16) | (clamp(g) << 8) | clamp(b);
  return `#${packed.toString(16).padStart(6, "0").toUpperCase()}`;
}

// Preserves required leading zeros: rgb(5, 10, 15) -> "#050A0F"
```

Omitting `.padStart(2, "0")` per channel (or `.padStart(6, "0")` on the packed integer) is a classic source of silent bugs: `rgb(5, 10, 15)` would collapse into `#5AF`, which browsers expand to `#55AAFF` (`rgb(85, 170, 255)`) — an entirely different sky blue.

When transparency is present, the converter appends an alpha byte calculated as `Math.round(clamp(alpha, 0, 1) * 255)` formatted to two uppercase hex digits. Because 8 bits provide 256 discrete levels (`~0.392%` per step), common percentage opacities map to the standardized HEXA suffixes below:

| Opacity (%) | CSS `rgba()` Alpha | Scaled Integer `round(a × 255)` | HEXA Alpha Suffix | Effective Rendered Opacity |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | `1.0` | `255` | `FF` | `100.00%` |
| **90%** | `0.9` | `230` | `E6` | `90.20%` |
| **80%** | `0.8` | `204` | `CC` | `80.00%` |
| **75%** | `0.75` | `191` | `BF` | `74.90%` |
| **60%** | `0.6` | `153` | `99` | `60.00%` |
| **50%** | `0.5` | `128` | `80` | `50.20%` |
| **40%** | `0.4` | `102` | `66` | `40.00%` |
| **25%** | `0.25` | `64` | `40` | `25.10%` |
| **10%** | `0.1` | `26` | `1A` | `10.20%` |
| **0%** | `0.0` | `0` | `00` | `0.00%` |

Need to reverse the pipeline and inspect how existing 4- or 8-digit hex strings unpack into decimal channels and relative luminance? Open our companion [HEX to RGB Converter](/en/tools/hex-to-rgb).

## Multi-Grammar Parsing and Bulk Batch Conversion

Real-world color data rarely arrives in one tidy syntax. A developer auditing a legacy repository might pull `rgba(59, 130, 246, 0.5)` from older CSS, `rgb(59 130 246 / 50%)` from CSS Color Module Level 4 rules, and raw `81, 130, 49` columns from a CSV brand sheet. The smart parser recognizes all four grammars automatically — comma-separated CSS functions, space-separated slash notation (including percentage alphas), raw comma triplets, and space-delimited integers — while enforcing strict `[0, 255]` channel and `[0, 1]` opacity bounds.

Switching to **Bulk Conversion Mode** applies that same parser line by line across pasted tables or stylesheet extracts:

```text
255, 255, 255              => #FFFFFF
81, 130, 49                => #518231
rgba(59, 130, 246, 0.5)    => #3B82F680
rgb(15 23 42 / 80%)        => #0F172ACC
```

Valid entries render side-by-side color chips and can be copied in one click or exported cleanly as `bulk-colors.json` with malformed rows automatically filtered out. Once your tokens are compiled into stylesheets, you can normalize indentation or inspect minified vendor CSS with our [CSS Beautifier](/en/tools/css-beautifier).

## Live UI Previews, Screen Sampling, and SCSS/CSS Exports

Judging an isolated swatch is misleading because human color perception shifts dramatically against light versus dark backgrounds. The workspace renders your active color across realistic header bars, primary buttons, and surface cards while automatically flipping foreground typography between dark slate and pure white at the WCAG relative luminance midpoint (`L > 0.179`). Alongside the preview, the accessibility gauge reports exact AA and AAA pass/fail grades and builds Complementary, Analogous, Triadic, and Monochromatic companion sets.

On Chromium desktop browsers, clicking the **EyeDropper** button invokes the native `window.EyeDropper().open()` API so you can capture any pixel outside the browser window straight into RGB sliders. If you are working on Firefox or Safari — or need a 40x pixel grid magnifier to avoid anti-aliased edge artifacts on a screenshot — our [Color Picker From Image](/en/tools/color-picker-from-image) provides canvas-level extraction across every browser.

From the Export hub, download standalone `.css`, `.scss`, or `.json` files pre-formatted for both native CSS Custom Properties and Sass pipelines:

```scss
// Exported Sass token block
$color-primary-hex: #518231;
$color-primary-rgb: rgb(81, 130, 49);
$color-primary-rgba: rgba(81, 130, 49, 1);
$color-primary-hsl: hsl(96, 45%, 35%);
```

## Troubleshooting RGB-to-HEX Migration Pitfalls

Watch for four recurring snags when normalizing RGB inputs across codebases:

- **Percentage RGB channels**: Legacy CSS allows `rgb(100%, 50%, 0%)`, which maps `50%` to `128` (`0x80`). Convert percentage arguments to `0–255` integers before batch encoding.
- **Email client compatibility with 8-digit HEXA**: While all evergreen browsers support `#RRGGBBAA`, several desktop email clients (notably older Outlook engines) strip 8-digit hex declarations entirely. Keep 6-digit `#RRGGBB` fallbacks or solid blended colors for HTML newsletters.
- **Sub-pixel floating-point channels**: CSS transitions and WebGL shaders often emit non-integer channels like `rgb(81.4, 129.8, 49.1)`. Round each component prior to base-16 conversion to prevent off-by-one hex mismatches across browsers.
- **Wide-gamut clipping**: Channels captured from Display P3 or Rec. 2020 color profiles cannot be faithfully represented in 8-bit sRGB HEX without gamut mapping.

Every parsing pass, batch loop, EyeDropper read, and file blob download executes locally in browser memory — no brand palettes or batch files are uploaded anywhere, and up to 30 pinned colors remain stored privately in `localStorage`.
