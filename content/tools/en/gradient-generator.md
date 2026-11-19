---
metaTitle: "CSS Gradient Generator: Linear, Radial, Conic & Tailwind"
metaDescription: "Build linear, radial, and conic CSS gradients with live WCAG checks, blend layers, and animations. Export Tailwind, SVG, or PNG locally in-browser."
metaKeywords: "css gradient generator, tailwind gradient maker, radial gradient css, conic gradient generator, linear gradient css, animated gradient code, mesh gradient simulation, gradient color palette, glassmorphism builder, web design gradients, ui design color tools, gradient css exporter"
title: "Gradient Generator"
shortDescription: "Design multi-stop linear, radial, conic, and repeating CSS gradients with blend-mode layering, noise grain, live WCAG text contrast sampling, and instant CSS, Tailwind, SVG, or PNG exports."
faqs:
  - question: "Why does a CSS gradient fading to 'transparent' sometimes look muddy or gray in the middle?"
    answer: "The CSS keyword 'transparent' resolves to rgba(0, 0, 0, 0). In non-premultiplied or naive sRGB interpolation, blending a bright color toward black-at-zero-alpha darkens the RGB channels mid-ramp. Setting the final stop to the exact same RGB hue at 0 opacity—such as rgba(124, 58, 237, 0)—keeps the fade clean and luminous."
  - question: "How does the built-in WCAG contrast analyzer evaluate a multi-color gradient?"
    answer: "Because text spans across shifting background pixels, checking only a single stop is misleading. The tool linearly interpolates the exact gradient color at 10%, 50%, and 90% along the ramp and computes WCAG relative luminance contrast against both pure white (#ffffff) and deep slate (#0f172a) at all three checkpoints."
  - question: "When does the Tailwind export generate standard utility classes instead of arbitrary bracket syntax?"
    answer: "Single-layer linear gradients with up to three stops snap to Tailwind's native directional classes (such as bg-gradient-to-br from-[#7c3aed] via-[#db2777] to-[#facc15]). Radial, conic, repeating, or dual-layered blend-mode compositions automatically serialize into valid arbitrary bracket syntax using underscores for spaces."
  - question: "Can conic gradients be exported accurately to both PNG and SVG?"
    answer: "PNG export uses the HTML5 Canvas 2D createConicGradient() API at 1200x630 pixels for pixel-accurate conic rendering. Because the SVG 1.1/2 specification lacks a native conicGradient element, SVG exports map linear gradients to exact vector coordinates and fall back to radialGradient for non-linear sweeps."
  - question: "How do I animate a CSS gradient smoothly without high CPU usage?"
    answer: "CSS cannot directly transition between arbitrary gradient stop lists without Houdini @property declarations. The reliable cross-browser pattern scales background-size to 200% 200% and animates background-position via @keyframes, paired with a prefers-reduced-motion media query for motion-sensitive visitors."
features:
  - "Full CSS Images Level 3 and Level 4 support for linear, radial, conic, repeating-linear, and repeating-radial gradients"
  - "Interactive 360-degree angle dial, click-to-insert color stop bar, and synchronized HEX, RGB, HSL, and alpha opacity controls"
  - "Dual-gradient layer compositing with background-blend-mode controls (overlay, screen, multiply, color-dodge, difference) for mesh-style depth"
  - "Optional SVG turbulence noise overlay, frosted backdrop blur preview, and configurable CSS keyframe animation speed"
  - "Automated three-point WCAG 2.1 contrast auditing at 10%, 50%, and 90% stop positions for white and dark text overlays"
  - "One-click export to production CSS, Tailwind utilities, scalable vector SVG files, 1200x630 Open Graph PNG images, and JSON tokens"
useCases:
  - "Replacing 300 KB hero background JPEGs with sub-kilobyte declarative CSS gradients that stay crisp on Retina and 4K monitors"
  - "Crafting metallic dial rings, donut charts, and angular shader effects using CSS conic-gradient syntax"
  - "Layering semi-transparent radial and linear gradients with blend modes to simulate Apple-style mesh backgrounds without WebGL overhead"
  - "Auditing hero headlines and CTA buttons over vibrant gradients to verify AA text contrast across the entire banner width"
  - "Generating 1200x630 gradient PNG backdrops locally for Open Graph social cards, slide decks, and SaaS changelog headers"
  - "Converting designer gradient specs directly into Tailwind CSS utility classes or inline SVG defs for React components"
howToSteps:
  - "Pick a gradient function (Linear, Radial, Conic, Repeating Linear, or Repeating Radial) or load one of the curated presets."
  - "Rotate the 360-degree angle dial or select a directional anchor, then click anywhere along the stop track to add, drag, or recolor stops."
  - "Fine-tune individual stop colors in HEX, RGB, or HSL, adjust alpha opacity, or sample hues directly from your screen using the EyeDropper."
  - "Optionally enable a second blended gradient layer, SVG grain overlay, frosted blur, or smooth keyframe animation to build richer atmospheres."
  - "Review the 10%, 50%, and 90% WCAG contrast readouts to decide whether light or dark typography reads cleanly across your surface."
  - "Copy the generated CSS, Tailwind classes, or JSON config, or download a resolution-independent SVG or 1200x630 PNG directly from your browser."
---

Declarative CSS gradients let front-end engineers replace bulky hero bitmaps with resolution-independent graphics that weigh a few dozen bytes, render crisply at any device pixel ratio, and require zero extra HTTP requests. Yet hand-authoring multi-stop `conic-gradient()` angles, layered `background-blend-mode` stacks, and Tailwind arbitrary values quickly becomes error-prone without live visual feedback. The **Gradient Generator** runs entirely inside your browser's CSS rendering engine and Canvas 2D API—meaning custom palettes, animated hero canvases, and exported PNG or SVG assets are computed locally without uploading design work to remote servers.

## CSS Gradient Function Syntax and Coordinate Geometry

CSS Images Module Level 3 and Level 4 define five distinct gradient primitives, each governed by its own coordinate projection. Choosing the wrong function forces awkward hacks with extra wrapper elements or pseudo-element rotations.

| Gradient Function | Geometry & Origin | Canonical CSS Syntax | Repeating Behavior | Native Tailwind Utility vs. Arbitrary |
| :--- | :--- | :--- | :--- | :--- |
| `linear-gradient()` | Straight axis passing through box center; `0deg` points upward (north) | `linear-gradient(135deg, #7c3aed 0%, #db2777 100%)` | Clamps terminal stop colors past `0%` and `100%` | Native (`bg-gradient-to-br from-[...] to-[...]`) for 2–3 stops |
| `radial-gradient()` | Concentric `circle` or `ellipse` expanding from a `position` anchor | `radial-gradient(circle at center, #b91c1c 0%, #1e1b4b 100%)` | Clamps final color to container corners | Arbitrary bracket (`bg-[radial-gradient(...)]`) |
| `conic-gradient()` | Angular sweep rotated clockwise around a center point from `from <angle>` | `conic-gradient(from 0deg at center, #e2e8f0 0%, #94a3b8 50%, #e2e8f0 100%)` | Wraps `0deg` to `360deg` seamlessly when first/last stops match | Arbitrary bracket (`bg-[conic-gradient(...)]`) |
| `repeating-linear-gradient()` | Tiled parallel bands defined by the span between first and last stops | `repeating-linear-gradient(45deg, #0ea5e9 0%, #1e293b 20%)` | Infinitely repeats the stop interval across the axis | Arbitrary bracket (`bg-[repeating-linear-gradient(...)]`) |
| `repeating-radial-gradient()` | Concentric ripple bands radiating from the focal point | `repeating-radial-gradient(circle at center, #6366f1 0%, #0f172a 15%)` | Repeats radial rings from origin to farthest corner | Arbitrary bracket (`bg-[repeating-radial-gradient(...)]`) |

### Angle Conventions Between CSS, SVG, and Canvas 2D

A classic cross-format bug surfaces when engineers port a CSS `linear-gradient(135deg, ...)` into an `<svg>` or HTML5 `<canvas>` export. In CSS, `0deg` points straight up (12 o'clock) and rotates clockwise (`90deg` = right, `180deg` = down). Standard Cartesian trigonometry—used by SVG `<linearGradient x1 y1 x2 y2>` and Canvas `createLinearGradient(x0, y0, x1, y1)`—starts at 3 o'clock (`0 rad`). Converting a CSS angle `theta` into Canvas or SVG vectors requires subtracting `90deg` before applying `cos()` and `sin()`, and sizing the CSS gradient line to `|W * sin(rad)| + |H * cos(rad)|` so the start and end stops align cleanly with the bounding rectangle's corners rather than clipping prematurely on wide aspect ratios.

## Avoiding Banding, Muddy Midpoints, and Transparent Gray Zones

Default sRGB interpolation between complementary hues (such as cyan `#00f0ff` directly into warm red `#ff5e62`) cuts straight across the desaturated center of the RGB cube, producing a dull gray band in the middle of the ramp. Inserting an intermediate harmonic stop around `50%`—shifted slightly along the hue wheel—routes the transition through saturated territory and restores vibrancy.

A related artifact appears when fading a solid brand color into the CSS keyword `transparent`. Because `transparent` is defined as `rgba(0, 0, 0, 0)`, naive channel interpolation drags RGB values toward black while alpha drops to zero, creating a dirty shadow fringe. Always fade toward the **same RGB color at zero alpha** (`rgba(124, 58, 237, 0)`), which this editor enforces automatically whenever you pull a stop's opacity slider to `0`.

For wide dark gradients on 8-bit sRGB displays (such as `#111827` to `#065f46`), limited luminance steps can produce visible contour striping ("color banding"). Enabling the subtle SVG noise turbulence layer introduces micro-grain dithering that breaks up quantization steps cleanly. To simulate modern mesh gradients without WebGL shaders, stack a second directional gradient layer over your primary ramp and set `background-blend-mode` to `overlay`, `screen`, or `color-dodge`. When pairing luminous gradients with translucent frosted cards on top, combine your backdrop with our [Glassmorphism Generator](/en/tools/glassmorphism-generator) to calibrate border highlights and `backdrop-filter` blur radii.

## Multi-Point Contrast Auditing and GPU-Friendly Animation

### Sampling Legibility Across Variable Backgrounds

Text laid over a gradient does not face a uniform background luminance. A white headline might achieve `8.2:1` over the indigo start of a banner and collapse to `2.1:1` over a bright yellow highlight near the right edge. To catch legibility failures early, the Gradient Generator evaluates linearly interpolated RGB values at **10%**, **50%**, and **90%** along your stop array, scoring each point against both white (`#ffffff`) and dark slate (`#0f172a`) text. If a section dips below WCAG 2.1 AA (`4.5:1` for normal copy, `3.0:1` for large headings), darken the offending stop or verify exact foreground alternatives in our [Contrast Checker](/en/tools/contrast-checker).

### Animating Gradients Without Layout Thrashing

Browsers treat `background-image` as a discrete image type rather than an animatable number, so standard CSS transitions cannot interpolate gradient stops directly without registering custom properties via CSS Houdini `@property`. The most reliable, zero-JavaScript cross-browser technique expands the painted canvas to `200% 200%` and slides `background-position` on a smooth loop:

```css
.hero-ambient-gradient {
  background-image: linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #facc15 100%);
  background-size: 200% 200%;
  animation: gradientFlow 10s ease infinite;
}

@keyframes gradientFlow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-ambient-gradient {
    animation: none;
    background-size: 100% 100%;
  }
}
```

Including the `prefers-reduced-motion` guard respects OS-level accessibility settings and prevents vestibular discomfort on full-bleed landing sections.

## Production Output Formats: Tailwind, Vector SVG, and OG-Ready PNG

Different pipelines demand different deliverables. For standard 2- or 3-stop linear gradients, the Tailwind exporter snaps your dial angle to the nearest 45-degree utility (`bg-gradient-to-t`, `bg-gradient-to-tr`, `bg-gradient-to-br`, etc.) with `from-[#...]`, `via-[#...]`, and `to-[#...]` stops. Multi-layer, radial, repeating, and conic gradients serialize into valid Tailwind arbitrary bracket syntax with whitespace escaped as underscores (`bg-[conic-gradient(from_0deg_at_center,...)]`).

When you need standalone assets outside CSS—such as email headers, Open Graph previews, or Figma fills—download a `1200x630` PNG rendered through Canvas 2D (`createLinearGradient`, `createRadialGradient`, or `createConicGradient`) or an `800x600` vector SVG `<defs>` file. If you intend to inline the exported SVG directly into HTML or React JSX, run it through our [SVG Optimizer](/en/tools/svg-optimizer) to minify attributes and strip redundant whitespace.
