---
metaTitle: "CSS Shadow Generator: Layered Box, Text & Neumorphism"
metaDescription: "Craft multi-layer CSS box shadows, text shadows, and neumorphic surfaces in a live sandbox. Export CSS, SCSS, JSON, or Tailwind classes in-browser."
metaKeywords: "css box shadow generator, text shadow generator, layered shadows css, neumorphism shadow maker, glassmorphism box shadow, soft shadows web design, tailwind shadow generator, custom box shadow configs, design system elevation, frontend styling tool, ui ux shadow presets, box shadow copy paste"
title: "CSS Shadow Generator"
shortDescription: "Build realistic multi-layer CSS box shadows, crisp text shadows, and directional neumorphic Soft UI surfaces in an interactive UI sandbox with instant CSS, SCSS, JSON, and Tailwind exports."
faqs:
  - question: "Why do multi-layered CSS box shadows look more realistic than a single shadow?"
    answer: "Physical light creates both a sharp, dark contact occlusion directly beneath an object and a wide, diffused ambient penumbra cast across the surrounding surface. Stacking two to four comma-separated CSS shadow layers with progressively larger vertical offsets, blur radii, negative spread values, and lower alpha mimics that natural optical falloff."
  - question: "What does a negative spread-radius do in CSS box-shadow?"
    answer: "A negative spread-radius shrinks the shadow's initial box footprint inward on all four sides before Gaussian blurring is applied. Pairing a large vertical y-offset and blur with a negative spread (such as 0 20px 25px -5px rgba(0,0,0,0.1)) keeps the shadow anchored below the card and eliminates unwanted dark halos spilling out past the left and right edges."
  - question: "Why can I not use inset or spread-radius inside CSS text-shadow?"
    answer: "The CSS Text Decoration specification defines text-shadow using only four values: offset-x, offset-y, blur-radius, and color. Unlike rectangular element boxes, glyph vector outlines vary continuously in stroke thickness, so browsers intentionally omit spread-radius and inset keywords from text-shadow syntax."
  - question: "How does the Neumorphism mode calculate opposing highlight and shadow colors?"
    answer: "The generator converts your chosen surface hex color to HSL, shifts lightness +12% to derive the directional highlight and -12% for the cast shadow, and mirrors their X/Y offsets across your selected light angle. Concave and convex modes also generate a matching 145-degree linear gradient (+/-5% lightness) to curve the card face."
  - question: "Does animating box-shadow directly on hover hurt frame rates?"
    answer: "Yes. Mutating box-shadow triggers main-thread repainting on every animation frame, which causes stutter on complex grids and mobile GPUs. For 60fps hover elevation, place the deeper shadow on an opacity: 0 ::after pseudo-element and transition its opacity to 1 so the animation runs exclusively on the GPU compositor."
features:
  - "Three dedicated authoring modes: Multi-Layer Box Shadows, Layered Text Shadows, and directional Neumorphism (Soft UI) geometry"
  - "Independent per-layer controls for X/Y offsets, blur radius, spread radius, inset toggle, color/alpha opacity, visibility, and layer duplication"
  - "Curated elevation presets spanning Soft SaaS Cards, Material Elevation 1 & 4, Double Neon Glow, Deep Floating Modals, and 3D Retro text stacks"
  - "Neumorphic light-source matrix (top-left, top-right, bottom-left, bottom-right) with automatic flat, pressed (inset), concave, and convex surface shaders"
  - "Live light-mode and dark-mode UI sandbox previewing shadows across component kits, dashboard widgets, and alert cards with customizable surface radii"
  - "Instant code serialization to vanilla CSS, Tailwind arbitrary shadow-[...] / text-shadow-[...] classes, SCSS variables, and structured JSON configs"
useCases:
  - "Establishing a consistent 4-tier SaaS elevation token hierarchy (card, dropdown, popover, modal) across a design system"
  - "Tuning subtle, low-alpha dark-mode border highlights and inset shadows where black drop shadows lose visibility against dark slate surfaces"
  - "Creating readable hero typography over photography or glowing cyberpunk neon headings using stacked CSS text-shadow layers"
  - "Prototyping tactile Soft UI control pads, audio knobs, and pressed toggle buttons with mathematically matched neumorphic highlight/shadow pairs"
  - "Generating zero-blur hard-offset shadows (4px 4px 0px #000) for neo-brutalist landing pages and editorial badges"
  - "Converting hand-tuned visual elevation mockups directly into Tailwind CSS arbitrary utility strings and JSON tokens without manual escaping"
howToSteps:
  - "Choose Box Shadow, Text Shadow, or Neumorphism mode, or jumpstart from a preset like Soft SaaS Card or Material Elevation."
  - "Adjust X/Y offsets, blur radius, spread radius (for box shadows), hex color, and alpha opacity—or drag the interactive offset pad."
  - "Click Add Layer or Duplicate Layer to stack tight contact shadows with broad low-opacity ambient penumbras, toggling individual layers to compare depth."
  - "In Neumorphism mode, pick a surface background hex, choose one of four light angles, and switch between Flat, Pressed, Concave, and Convex profiles."
  - "Preview your shadow live across the UI Kit, Widgets, and Alerts tabs in both Light and Dark canvas environments to verify edge contrast."
  - "Copy the compiled CSS declaration, Tailwind arbitrary class, SCSS variable, or JSON token payload directly into your stylesheet."
---

Elevation turns flat HTML rectangles into a scannable spatial hierarchy: modals float above backdrops, dropdowns detach from toolbars, and pressed controls recede into the canvas. Yet single-layer CSS shadows almost always look harsh or muddy because real-world lighting never casts a single uniform blur. The **CSS Shadow Generator** lets you compose multi-layer `box-shadow` stacks, stacked `text-shadow` typography effects, and mathematically balanced neumorphic surfaces inside a real-time browser sandbox—computing every RGBA layer, HSL light offset, and `localStorage` preset snapshot locally with zero round-trips.

## Parameter Grammar: `box-shadow` vs. `text-shadow` vs. Neumorphism

Although `box-shadow` and `text-shadow` look superficially similar, they belong to separate CSS specifications (Backgrounds & Borders Level 3 versus Text Decoration Level 3) and diverge in paint order, supported keywords, and layout impact. Neither property alters element box dimensions or triggers reflow.

| Specification Detail | CSS `box-shadow` | CSS `text-shadow` | Neumorphic Surface (Dual `box-shadow`) |
| :--- | :--- | :--- | :--- |
| Canonical Value Order | `[inset] <x> <y> <blur> [<spread>] <color>` | `<x> <y> [<blur>] <color>` | `<-d> <-d> <blur> <highlight>, <+d> <+d> <blur> <shadow>` |
| `spread-radius` Support | Yes (`-100px` to `+100px` shrinks or expands box) | Not supported by CSS specification | Typically omitted (`0`) for smooth surface extrusion |
| `inset` Keyword | Yes (renders shadow inside padding box) | Not supported by CSS specification | Used in `pressed` state (`inset` on both layers) |
| Multi-Layer Paint Order | First listed shadow paints on **top**; last paints deepest | First listed shadow paints on **top**; last paints deepest | Opposing highlight and shadow vectors do not overlap |
| Surface Background Requirement | Independent of parent background color | Independent; inherits glyph vector contour | Surface hex **must match** parent canvas background |
| Tailwind Arbitrary Syntax | `shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]` | `text-shadow-[0px_2px_4px_rgba(0,0,0,0.25)]` | `shadow-[-8px_-8px_16px_...,8px_8px_16px_...]` |

## Optical Depth Through Multi-Layer Shadow Stacking

Browser rendering engines approximate CSS `blur-radius` using a separable Gaussian blur whose standard deviation is roughly half the specified blur (`sigma ≈ blur-radius / 2`). A single wide blur (`0 20px 40px rgba(0, 0, 0, 0.2)`) creates an unnatural dark fog around the upper corners of a card while leaving the base edge detached.

Photorealistic UI elevation follows a **key-plus-ambient** stacking recipe—combining a tight, slightly denser contact layer with progressively softer, wider ambient layers whose `spread-radius` turns negative to pull lateral spillover inward:

```css
/* Three-layer Soft SaaS Card Elevation */
.card-elevated {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow:
    0px 1px 3px 0px rgba(15, 23, 42, 0.06),     /* Tight contact edge */
    0px 10px 20px -5px rgba(15, 23, 42, 0.05),  /* Mid-range key shadow */
    0px 20px 25px -10px rgba(15, 23, 42, 0.04); /* Soft ambient penumbra */
}
```

Notice two subtle upgrades over naive presets: using a cool dark slate tint (`rgba(15, 23, 42, ...)`) instead of pure black prevents shadows from looking chalky over tinted backgrounds, and stepping `spread-radius` to `-5px` and `-10px` concentrates visual weight underneath the card rather than muddying its top border. In dark mode, where dark drop shadows vanish against `#0f172a` backgrounds, adding a crisp `inset 0 1px 0 0 rgba(255, 255, 255, 0.08)` top-edge rim layer restores perceived separation immediately.

## Engineering Neumorphic Surfaces from HSL Luminance Offsets

Neumorphism (Soft UI) creates the illusion that a button or tile is extruded seamlessly out of its backing canvas. Because the card shares the exact base color of its parent container, depth relies entirely on opposing directional light and cast shadows computed directly from the surface's HSL lightness:

1. **Derive Paired Tones:** Given a mid-tone surface hex such as `#e0e0e0` (`L = 88%`), shifting lightness `+12%` produces the specular highlight (`#ffffff`) while `-12%` produces the cast shadow (`#c2c2c2`), attenuated by an intensity alpha (`0.15`–`0.25`).
2. **Mirror Directional Vectors:** For a top-left light source at distance `d` and blur `b` (commonly `b = 2 * d`), the highlight sits at `(-d, -d)` and the cast shadow sits at `(+d, +d)`. Switching to top-right, bottom-left, or bottom-right flips the signs accordingly.
3. **Sculpt Surface Profiles:** `flat` keeps a solid fill; `pressed` prefixes both layers with `inset` to carve a recessed well; `concave` and `convex` overlay a directional `linear-gradient()` (`145deg`, `225deg`, `45deg`, or `315deg`) running between `-5%` and `+5%` surface lightness to curve the interior face.

Two practical caveats govern production Soft UI: pure white (`#ffffff`) and pure black (`#000000`) canvases cannot produce symmetric `+12%` / `-12%` highlights and shadows, and low-contrast extruded edges can fail WCAG 2.1 Non-Text Contrast (`3.0:1`) unless paired with explicit focus outlines. For dedicated Soft UI surface experimentation or frosted translucent layering, explore our standalone [Neumorphism Generator](/en/tools/neumorphism-generator) and [Glassmorphism Generator](/en/tools/glassmorphism-generator).

## Compositor Performance and Tailwind Utility Integration

### Animating Elevation Without Paint Bottlenecks

Animating `box-shadow` directly inside a `:hover` transition forces the browser to rasterize a fresh Gaussian blur mask on the main thread every frame. Across a dashboard of 30 cards, that repaint cost drops frame rates noticeably on integrated GPUs. Instead, render the resting shadow on the element, place the hover shadow on a `::after` pseudo-element positioned behind it at `opacity: 0`, and transition only `opacity` and `transform`—both of which stay exclusively on the GPU compositor thread. Similarly, when shadowing non-rectangular transparent PNGs or SVG icons, remember that `box-shadow` follows the rectangular bounding box whereas CSS `filter: drop-shadow()` traces the alpha silhouette.

### Escaping Whitespace in Tailwind Arbitrary Shadow Classes

Tailwind CSS parses utility tokens by whitespace, so injecting raw multi-layer CSS shadow strings into an arbitrary class breaks compilation unless every space is replaced with an underscore:

```html
<div class="rounded-2xl bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),_0px_2px_4px_-1px_rgba(0,0,0,0.06)]">
  Layered elevation without editing tailwind.config.js
</div>
```

The exporter handles underscore escaping automatically for both `shadow-[...]` and `text-shadow-[...]`, alongside copy-ready SCSS variables (`$custom-box-shadow`) and JSON elevation definitions. If you want to test interactive hover transitions, pseudo-element opacity tricks, and layered shadows alongside live HTML and JavaScript, paste your exported CSS directly into our [HTML/CSS/JS Playground](/en/tools/html-css-js-playground).
