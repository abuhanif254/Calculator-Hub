---
metaTitle: "HEX to RGB Converter Online — HEXA, RGBA, HSL & WCAG"
metaDescription: "Convert 3, 4, 6, and 8-digit HEX codes to RGB, RGBA, HSL, and HSV locally in your browser. Includes WCAG 2.1 contrast, Tailwind classes, and JSON export."
metaKeywords: "hex to rgb, hex to rgba, hex to hsl, hex converter, color converter, hex to hsv, css variable generator, tailwind color converter, wcag contrast checker, 8-digit hex converter, color palette generator"
title: "HEX to RGB Converter"
shortDescription: "Decode 3-, 4-, 6-, and 8-digit hexadecimal color codes into RGB, RGBA, HSL, HSLA, and HSV values with real-time WCAG 2.1 contrast scoring and CSS or Tailwind output."
faqs:
  - question: "How do 3-digit and 4-digit shorthand HEX codes expand into full RGB values?"
    answer: "Browsers expand each shorthand hexadecimal character by duplicating its nibble, which is mathematically equivalent to multiplying the single hex digit by 17. For instance, #3A7 expands to #33AA77, yielding rgb(51, 170, 119), while #3A78 expands to #33AA7788 with an alpha byte of 0x88 (136/255, or roughly 0.533 opacity)."
  - question: "Why does an 8-digit CSS HEXA code look different when pasted from Android XML?"
    answer: "CSS Color Module Level 4 places the alpha byte at the end of an 8-digit code (#RRGGBBAA), whereas Android XML and Flutter place the alpha channel first (#AARRGGBB). A semi-transparent blue written as #803B82F6 in Android must be reordered to #3B82F680 before using it in web stylesheets."
  - question: "Why does #FFFFFF80 convert to 0.502 opacity instead of an exact 0.50?"
    answer: "An 8-bit alpha channel stores 256 discrete integer steps from 0 (0x00) to 255 (0xFF). Because 255 is odd, there is no exact midpoint integer: 0x7F equals 127/255 (0.498) and 0x80 equals 128/255 (0.502). Our converter rounds the displayed RGBA fraction cleanly while preserving exact byte precision."
  - question: "When should I store CSS Custom Properties as raw RGB triplets instead of HEX?"
    answer: "Storing an unwrapped triplet such as --color-primary-rgb: 81, 130, 49 lets stylesheets compose arbitrary translucent surfaces on the fly with rgba(var(--color-primary-rgb), 0.12) without declaring separate HEXA tokens for every opacity step."
  - question: "Does the converter send proprietary brand HEX codes to a remote server?"
    answer: "No. Every hex-parsing routine, color-space transformation, WCAG luminance calculation, and JSON download runs inside your browser tab via client-side JavaScript, and saved swatches reside exclusively in your browser's localStorage."
features:
  - "Instant parsing of 3-digit (#RGB), 4-digit (#RGBA), 6-digit (#RRGGBB), and 8-digit (#RRGGBBAA) hex strings with optional leading hash"
  - "Synchronized conversion to RGB, RGBA, HSL, HSLA, and HSV formats plus interactive Red, Green, Blue, and Alpha sliders"
  - "Real-time WCAG 2.1 relative luminance and contrast ratio evaluation against white and black text with customizable sample copy and font size"
  - "Automatic color harmony derivation for Complementary, Analogous, Triadic, and 5-step Monochromatic schemes"
  - "Copy-ready CSS Custom Properties, Tailwind arbitrary utility classes (bg, text, border), and angle-adjustable CSS linear gradients"
  - "Structured JSON specification file export alongside a 30-entry browser localStorage color history drawer"
useCases:
  - "Translating 6-digit Figma or Sketch brand hex codes into RGBA overlays for modals, glass panels, and hover backdrops"
  - "Decoding 8-digit #RRGGBBAA tokens exported from modern design tools to verify exact numeric opacity fractions"
  - "Auditing whether white or dark slate typography passes WCAG AA (4.5:1) or AAA (7.0:1) contrast on a candidate button fill"
  - "Generating unwrapped --color-primary-rgb custom properties to power dynamic CSS alpha utilities across light and dark themes"
  - "Producing drop-in Tailwind arbitrary utility snippets like bg-[#518231] during rapid component prototyping"
  - "Exporting complete multi-space color specs and luminance metrics as JSON files for automated design-token pipelines"
howToSteps:
  - "Paste or type any 3-, 4-, 6-, or 8-character hexadecimal string into the HEX input field; the leading # prefix is handled automatically."
  - "Adjust the Alpha slider or edit an 8-digit HEXA code when you need translucent RGBA and HSLA output values."
  - "Review the instant multi-format conversion cards for RGB, RGBA, HSL, HSLA, and HSV and click any value to copy it."
  - "Inspect the WCAG 2.1 Accessibility panel, customize the preview text size or weight, and confirm AA or AAA contrast badges."
  - "Switch to the Harmonies, Gradient Preview, or Code Export panels to grab Tailwind utilities, CSS :root variables, or a JSON spec file."
  - "Click Save Color to pin the active hex and alpha state into your local browser history for later sessions."
---

Hexadecimal color strings remain the default interchange notation across Figma canvases, SVG assets, and brand guidelines because six base-16 characters encode over 16.7 million sRGB colors in a compact, copy-friendly token. Yet the moment a design enters frontend code, engineers frequently need decimal channel values for canvas pixel buffers, CSS opacity math, programmatic tinting, or accessibility audits. This **HEX to RGB Converter** parses 3-, 4-, 6-, and 8-digit hexadecimal notations directly in your browser and translates them simultaneously into RGB, RGBA, HSL, HSLA, and HSV representations alongside live WCAG 2.1 contrast scoring.

## How Hexadecimal Color Encoding Maps to 8-Bit RGB Channels

Every standard web color lives inside the additive sRGB space, where a display drives red, green, and blue sub-pixels at integer intensities from `0` to `255`. Because `256 = 16^2`, a single 8-bit channel fits neatly into two hexadecimal digits (`00` through `FF`). Parsing a 6-character code like `#518231` splits the string into three byte pairs and evaluates each pair in base-16 (`16 × high_nibble + low_nibble`):

- **Red (`0x51`)**: `(5 × 16) + 1 = 81`
- **Green (`0x82`)**: `(8 × 16) + 2 = 130`
- **Blue (`0x31`)**: `(3 × 16) + 1 = 49`

Shorthand 3-digit (`#RGB`) and 4-digit (`#RGBA`) notations compress repeating-nibble colors by duplicating each character before decoding, effectively multiplying each nibble value by `17` (`0x11`). Thus `#4B9` expands deterministically to `#44BB99`, or `rgb(68, 187, 153)`. When an 8-digit `#RRGGBBAA` string is supplied under CSS Color Module Level 4, the trailing octet maps onto the `[0.0, 1.0]` alpha interval by dividing its base-10 value by `255`.

| Hex Notation | Example Input | Expanded Form | Decoded Output | Alpha Channel Semantics | Standard / Platform |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **3-Digit (`#RGB`)** | `#5A3` | `#55AA33` | `rgb(85, 170, 51)` | Implicitly opaque (`1.0`) | CSS1+, HTML, SVG |
| **4-Digit (`#RGBA`)** | `#5A38` | `#55AA3388` | `rgba(85, 170, 51, 0.533)` | Duplicated nibble (`0x88 / 255`) | CSS Color Level 4 |
| **6-Digit (`#RRGGBB`)** | `#518231` | `#518231` | `rgb(81, 130, 49)` | Implicitly opaque (`1.0`) | CSS1+, universal web |
| **8-Digit (`#RRGGBBAA`)** | `#3B82F680` | `#3B82F680` | `rgba(59, 130, 246, 0.502)` | Trailing byte (`0x80 / 255`) | CSS Color Level 4 |
| **Android (`#AARRGGBB`)** | `#803B82F6` | *Byte-order swap* | Incompatible with CSS as-is | Leading byte (`0x80 / 255`) | Android XML / Flutter |

If your workflow starts with decimal RGB channels or a batch of spreadsheet rows that need hexadecimal encoding instead, switch over to our [RGB to HEX Converter](/en/tools/rgb-to-hex) for reverse and bulk translation.

## Translating Decoded Channels to HSL, HSV, and WCAG Luminance

Once the parser extracts `(R, G, B)` bytes, it normalizes each component to `[0, 1]` and derives both cylindrical perceptual models and accessibility luminance in a single pass. In **HSL**, hue is projected onto a `0°–360°` angle from the dominant channel delta (`max - min`), lightness takes the midpoint `(max + min) / 2`, and saturation scales the chroma relative to lightness. **HSV** preserves the same hue angle while defining brightness directly as `V = max(r, g, b)`, which matches how visual pickers operate in graphics suites. For interactive 2D spectrum exploration across all four models, see the [Advanced Color Picker](/en/tools/color-picker).

Accessibility compliance cannot rely on HSL lightness alone because human cones are dramatically more sensitive to green wavelengths than blue. Following the WCAG 2.1 specification, the converter linearizes each gamma-encoded sRGB channel before applying ITU-R BT.709 luminance coefficients:

```javascript
function relativeLuminance(r, g, b) {
  const linearize = (channel) => {
    const s = channel / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

// Contrast ratio ranges from 1:1 (identical) to 21:1 (#FFFFFF vs #000000)
const contrastRatio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
```

Because green carries `71.52%` of perceived luminance while blue carries only `7.22%`, `#00FF00` and `#0000FF` both sit at `50%` HSL lightness yet yield vastly different readability scores against white text (`1.37:1` vs. `8.59:1`). The built-in preview card automatically evaluates your decoded hex against `#FFFFFF` and `#000000` for normal (`4.5:1` AA / `7.0:1` AAA) and large (`3.0:1` AA / `4.5:1` AAA) typography. To test two custom brand hues against each other rather than pure black or white, run them through our dedicated [WCAG Contrast Checker](/en/tools/contrast-checker).

## CSS Custom Properties, Tailwind Utilities, and Alpha Composition

Modern design systems rarely hardcode hex strings directly inside component rules. Exporting unwrapped RGB channels into `:root` custom properties unlocks flexible alpha composition while retaining CSS Color Level 3 fallback compatibility alongside newer CSS Color Level 4 space-separated slash notation:

```css
:root {
  --color-primary-hex: #518231;
  --color-primary-rgb: 81, 130, 49;
  --color-primary-hsl: 96, 45%, 35%;
  --color-primary-alpha: rgba(81, 130, 49, 0.5);
}

/* Dynamic opacity without creating extra HEXA tokens */
.badge-soft {
  color: var(--color-primary-hex);
  background-color: rgba(var(--color-primary-rgb), 0.14);
  border: 1px solid rgb(var(--color-primary-rgb) / 35%);
}
```

For Tailwind CSS projects, the converter also generates ready-to-paste arbitrary value classes (`bg-[#518231]`, `text-[#518231]`, `border-[#518231]`), angle-tunable `linear-gradient()` declarations, and a downloadable `.json` specification bundling every format, luminance value, and harmony swatch.

## Common HEX Decoding Pitfalls in Production

Even experienced frontend engineers run into subtle edge cases when migrating hex strings across toolchains:

1. **Alpha byte-order inversion between mobile and web**: Pasting an 8-digit Android `colors.xml` value (`#CC1E293B`) into CSS treats `CC` as red and `3B` as alpha. Move the alpha octet to positions 7–8 (`#1E293BCC`) before shipping to browsers.
2. **Quantization drift on 50% opacity**: Because `0.5 × 255 = 127.5`, rounding to `128` (`0x80`) decodes back as `0.50196`. Though visually imperceptible, strict visual-regression snapshots comparing `rgba(..., 0.5)` against `#...80` may report a 1-step alpha difference.
3. **Malformed string lengths**: Five- or seven-character strings from partial copy-pastes are rejected by browsers and flagged immediately by the live validator instead of silently truncated.
4. **Wide-gamut sRGB bounds**: Hex notation strictly addresses 8-bit sRGB coordinates; OLED Display P3 targets require pairing sRGB hex fallbacks with CSS `color(display-p3 r g b)` rules.

All hex parsing, slider updates, gradient rendering, and JSON exports run strictly in your local browser with zero server calls, storing up to 30 saved colors privately in `localStorage`.
