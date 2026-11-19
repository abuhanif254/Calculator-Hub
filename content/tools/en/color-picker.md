---
metaTitle: "Online Color Picker — HSV, HSL, RGB, HEX & Gradient Lab"
metaDescription: "Pick and fine-tune colors on a 2D HSV canvas with real-time HEX, RGB, HSL, and alpha sync, WCAG contrast checks, 5 harmonies, and instant CSS export."
metaKeywords: "color picker, color converter, hex code finder, rgb to hsl, hex to rgb, color harmony generator, wcag contrast checker, color palette exporter, css variable generator, tailwind color picker, online color picker, design color tools"
title: "Advanced Color Picker Tool"
shortDescription: "Explore colors interactively on a 2D saturation-brightness spectrum with synchronized HEX, RGB, HSL, and HSV controls, live WCAG contrast testing, five harmony models, and gradient generation."
faqs:
  - question: "Why does the 2D color canvas use HSV instead of HSL?"
    answer: "In HSV (Hue, Saturation, Value), the top-right corner always represents the purest, brightest hue (S=100%, V=100%), the top-left is pure white, and the entire bottom edge is pure black. That square slice maps naturally to pointer dragging, whereas an HSL slice washes out to white along the entire top edge."
  - question: "Why do Figma HSB values differ from CSS hsl() percentages for the same hex code?"
    answer: "Figma and Photoshop display HSB (identical to HSV), where Brightness/Value equals the maximum RGB channel. CSS hsl() uses Lightness, which equals the midpoint between the highest and lowest RGB channels. Pure saturated blue is hsv(240, 100%, 100%) in Figma but hsl(240, 100%, 50%) in CSS."
  - question: "What color string formats can I paste directly into the HEX/color input field?"
    answer: "The bidirectional parser detects 3-, 4-, 6-, and 8-digit HEX/HEXA strings, legacy comma-separated rgb()/rgba(), hsl()/hsla(), and hsv()/hsva() functions, as well as CSS Color Level 4 space-separated slash syntax such as rgb(38 115 191 / 0.8) and hsl(210 67% 45% / 0.8)."
  - question: "How does complementary sync work in the Gradient tab?"
    answer: "When gradient sync is enabled, the secondary stop automatically tracks your active color at a 180-degree opposite hue while preserving saturation, value, and alpha. Disabling sync lets you decouple the second stop while adjusting the linear-gradient angle from 0 to 360 degrees."
  - question: "Does the picker remember recently chosen swatches after I reload the page?"
    answer: "Yes. Every completed drag or selection updates an 18-swatch Recent Colors tray stored strictly in your browser's localStorage under your device profile, without transmitting color choices or custom palettes to any remote server."
features:
  - "Interactive 2D Saturation-Brightness (HSV) canvas with Pointer Capture dragging, 360-degree Hue rail, and checkerboard-backed Alpha slider"
  - "Focus-locked bidirectional synchronization across HEX/HEXA, RGB/RGBA, HSL/HSLA, and HSV/HSVA numeric inputs without overwriting active typing"
  - "Five geometric color harmony tabs covering Complementary, Analogous, Triadic, Split-Complementary, and 5-step Monochromatic schemes"
  - "Integrated linear-gradient builder with optional 180-degree complementary stop sync, 0-360 degree bearing control, and copyable CSS output"
  - "Editable live WCAG 2.1 accessibility tester displaying exact white and black text contrast ratios with AA and AAA normal/large badges"
  - "Instant clipboard export for CSS :root variables, Tailwind arbitrary utility classes, and downloadable JSON color profile specs"
useCases:
  - "Dialing in hover, active, and focus-ring states by nudging HSL lightness or HSV value while inspecting live contrast ratios"
  - "Translating Photoshop or Figma HSB/HSV sliders into exact CSS hsl() and rgba() declarations for frontend stylesheets"
  - "Exploring Split-Complementary and Triadic accent candidates around an existing brand color without leaving the browser"
  - "Prototyping angled two-stop linear gradients with semi-transparent HEXA stops for hero banners and card overlays"
  - "Validating whether custom button labels remain WCAG AA compliant against freshly picked background colors"
  - "Maintaining an 18-swatch local browser palette tray during multi-page UI styling sprints"
howToSteps:
  - "Drag the reticle across the 2D Saturation-Brightness field and slide the 360-degree Hue and Alpha bars to locate your target color."
  - "Or paste any existing HEX, RGB, HSL, or HSV string directly into the synchronized input boxes to inspect and refine its channels."
  - "Check the WCAG Accessibility card and type custom preview copy to verify AA and AAA pass status for white and black foreground text."
  - "Open the Harmonies tab to switch between Complementary, Analogous, Triadic, Split-Complementary, and Monochromatic swatches."
  - "Use the Gradient tab to adjust the linear-gradient bearing angle or toggle complementary secondary-stop synchronization."
  - "Copy individual format codes, CSS :root variables, or Tailwind utility classes, or click Download JSON to export the complete profile."
---

Selecting a color visually on a screen and expressing that exact shade cleanly in production CSS require two very different mental models. Visual art direction thrives on spatial intuition — sliding toward richer chroma, lighter tints, or deeper shadows — whereas browser rendering engines demand deterministic HEX, RGB, or HSL syntax. This **Advanced Color Picker Tool** bridges both worlds inside a single browser workspace, pairing a pointer-captured 2D HSV spectrum plane with focus-locked numeric inputs, WCAG 2.1 contrast auditing, five harmony models, and a synced CSS gradient workbench.

## Inside the 2D Saturation-Brightness Spectrum and Pointer Mechanics

When you drag the reticle inside the main square canvas, you are navigating a vertical cross-section of the **HSV (Hue, Saturation, Value)** cylinder frozen at the Hue slider's current angle (`0°–360°`). Two stacked linear gradients render that plane accurately: a horizontal base layer transitioning from pure white (`#FFFFFF`) on the left (`S = 0%`) to the fully saturated pure hue on the right (`S = 100%`), topped by a vertical mask transitioning from transparent at the top (`V = 100%`) to pure black (`#000000`) at the bottom (`V = 0%`).

Pointer coordinates translate directly into normalized color coordinates:

```typescript
const s = Math.round((clamp(clientX - rect.left, 0, rect.width) / rect.width) * 100);
const v = Math.round((1 - clamp(clientY - rect.top, 0, rect.height) / rect.height) * 100);
```

Because the canvas calls `setPointerCapture(pointerId)` on pointer-down, dragging outside the box edges smoothly clamps at `0%` or `100%` so hitting pure white, pure black, or maximum saturation never requires pixel-perfect cursor precision. Underneath the canvas, a checkerboard SVG backdrop reveals alpha transparency (`0.00` to `1.00`) in real time.

When editing numeric boxes directly, focus-lock guards prevent feedback loops: while you are typing in the HEX, RGB, HSL, or HSV fields, only the *other* color-space inputs re-sync from the updated internal HSVa state, preventing mid-keystroke formatting jumps. If you instead need to pull exact pixels from a static photograph or mockup PNG, jump over to our [Color Picker From Image](/en/tools/color-picker-from-image).

## HSV vs. HSL vs. RGB: Color Model Geometry and Trade-Offs

Designers moving between Figma, Photoshop, and CSS frequently trip over the difference between **HSB/HSV** and **HSL**. Although both models share an identical `0°–360°` hue wheel, their saturation and vertical axes diverge mathematically:

| Color Space | Coordinate Geometry | Native CSS Syntax | Pure Hue Position | White & Black Behavior | Primary Strength |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HEX / HEXA** | Cartesian (Base-16 RGB) | `#2673BF` / `#2673BF80` | Max channel `FF`, min `00` | `#FFFFFF` / `#000000` | Compact design tokens, SVG attributes, Git diffs |
| **RGB / RGBA** | Additive Cube (`0–255`) | `rgb(38 115 191 / 0.8)` | At least one `255` and one `0` | `(255,255,255)` / `(0,0,0)` | Canvas APIs, alpha compositing, shader math |
| **HSL / HSLA** | Bi-Hexcone / Cylinder | `hsl(210 67% 45% / 0.8)` | `S = 100%`, `L = 50%` | `L = 100%` (all white) / `L = 0%` | Authoring CSS hover states and tint ladders |
| **HSV / HSB** | Hexcone / Cylinder | *Not native in CSS* | `S = 100%`, `V = 100%` | `S = 0%, V = 100%` / `V = 0%` | 2D visual pickers in Figma, Illustrator, Photoshop |

Converting directly between HSV (`S_v`, `V` in `[0, 1]`) and HSL (`S_l`, `L` in `[0, 1]`) without round-tripping through integer RGB avoids cumulative quantization drift:

```javascript
// Direct HSV -> HSL projection (H remains invariant)
const l = v * (1 - sV / 2);
const sL = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
```

This explains why a vivid sky blue at `hsv(210, 80%, 75%)` reports `hsl(210, 67%, 45%)` — its HSL lightness drops to `45%` because white sits at `L = 100%`, whereas HSV places pure color at the top (`V = 100%`).

## Geometric Harmonies and Synced Linear Gradients

Beyond single-swatch selection, the **Harmonies** tab computes five classical color-wheel sets dynamically from the active HSV hue:

- **Complementary**: Base hue paired with `(H + 180°) mod 360°` for maximum chromatic tension on call-to-action elements.
- **Analogous**: Flanking neighbors at `H - 30°` and `H + 30°` for cohesive surface groupings and background washes.
- **Triadic**: Equilateral spacing at `H + 120°` and `H + 240°` for multi-category charts and energetic brand accents.
- **Split-Complementary**: Base hue paired with `H + 150°` and `H + 210°`, preserving visual contrast without the harsh vibration of direct complements.
- **Monochromatic**: Five tonal steps shifting HSL lightness by `-30%`, `-15%`, `0%`, `+15%`, and `+30%` clamped safely inside `[5%, 95%]`.

Switching to the **Gradient** tab feeds your active color and a synced complementary secondary stop into a live CSS `linear-gradient()` preview. Note that CSS gradient angles use compass bearings (`0deg` points upward toward north, `90deg` runs left-to-right, and `135deg` sweeps diagonally from top-left to bottom-right), unlike standard math polar angles:

```css
.hero-surface {
  background: linear-gradient(135deg, #2673bfff 0%, #bf7226ff 100%);
}
```

When you need three or more color stops, radial spotlights, or conic sweeps, move your chosen hex stops into our dedicated [CSS Gradient Generator](/en/tools/gradient-generator).

## Live WCAG Contrast Testing and Offline Profile Export

Every reticle move recalculates WCAG 2.1 relative luminance using sRGB gamma linearization (`0.2126 R + 0.7152 G + 0.0722 B`) against both pure white (`#FFFFFF`) and pure black (`#000000`). An editable preview sentence lets you verify real micro-copy before exporting, surfacing AA (`4.5:1` normal / `3.0:1` large) and AAA (`7.0:1` normal / `4.5:1` large) pass indicators instantly. For arbitrary two-color foreground/background brand combinations, pair this workflow with our [WCAG Contrast Checker](/en/tools/contrast-checker).

From the **Export** tab, copy ready-to-paste `:root` CSS Custom Properties, Tailwind arbitrary classes (`bg-[#2673bf]`, `text-[#2673bf]`, `border-[#2673bf]`), or download a structured `.json` file containing every color space, contrast score, harmony array, and gradient string. All math executes locally in your browser with zero network calls, preserving up to 18 recent swatches privately in `localStorage`.
