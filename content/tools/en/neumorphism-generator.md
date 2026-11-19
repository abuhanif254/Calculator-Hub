---
metaTitle: "Neumorphism CSS Generator | Soft UI Box-Shadow & Tailwind"
metaDescription: "Build tactile neumorphic CSS, Tailwind, and SCSS soft-UI components in-browser with directional light math, inset states, and WCAG contrast audits."
metaKeywords: "neumorphism css generator, soft ui css generator, neumorphic box shadow css, tailwind neumorphism css, skeuomorphic design generator, pressed glass shadow, extruded plastic ui css, soft shadow button maker, inset box shadow config, minimal soft dashboard design, neumorphism accessibility guidelines, flat soft ui design"
title: "Neumorphism Generator"
shortDescription: "Generate soft, extruded, and inset neumorphic UI styles in real time with directional shadow geometry, interactive widget previews, and ready-to-copy CSS, Tailwind, SCSS, and JSON tokens."
faqs:
  - question: "Why does neumorphism fail on pure white (#FFFFFF) or pure black (#000000) backgrounds?"
    answer: "Soft UI depends on casting two opposing shadows from the base surface: a lighter highlight and a darker cast shadow. Pure white has 100% lightness with zero headroom for a brighter specular edge, while pure black has 0% lightness with no room for a deeper cast shadow. Mid-light (#E0E5EC) or deep-slate (#1E293B) bases provide balanced tonal room in both directions."
  - question: "What is the mathematical relationship between shadow distance and blur radius?"
    answer: "A reliable optical baseline sets the box-shadow blur radius to roughly 2x the X/Y offset distance (for example, 9px offset with 18px blur). Smaller blur-to-distance ratios produce sharp, cut-paper steps, while ratios above 2.5x flatten the tactile extrusion into a hazy glow."
  - question: "How do concave and convex neumorphic shapes differ in CSS?"
    answer: "Both profiles keep the same outer dual box-shadow, but they apply an opposing 10% lightness linear-gradient across the element face aligned to the light source angle. Concave starts darker near the light and brightens toward the opposite corner to mimic a recessed dish; convex reverses the stops to simulate a domed button."
  - question: "How can I make neumorphic buttons accessible under WCAG 2.1 guidelines?"
    answer: "WCAG 2.1 Success Criterion 1.4.11 requires at least a 3:1 contrast ratio for interactive UI component boundaries, which subtle monochrome shadows rarely satisfy alone. Enable the optional thin border outline, pair icons with 4.5:1+ text labels, and add an explicit :focus-visible outline ring for keyboard users."
  - question: "How should I animate a raised neumorphic button into a pressed inset state?"
    answer: "Transitioning directly between outer box-shadow and inset box-shadow cannot be smoothly interpolated by CSS engines—the browser snaps halfway through the animation. Instead, keep both outer and inset shadows declared in a single comma-separated box-shadow list and animate their alpha channels between 0 and target opacity."
features:
  - "Trigonometric light-source positioning across four cardinal corners plus continuous 0°–360° custom angle projection"
  - "Automatic HSL lightness derivation (+13% specular highlight, -13% cast shadow, ±5% curved surface gradients)"
  - "Four distinct tactile surface profiles: Flat raised, Concave recessed dish, Convex domed cap, and Pressed inset well"
  - "Interactive component sandbox testing cards, clickable buttons, toggles, range sliders, audio consoles, and keypads"
  - "Live WCAG 2.1 text contrast audit and optional accessibility border outline toggle for low-vision legibility"
  - "Instant code export across CSS, Tailwind arbitrary utilities, tailwind.config.js raised/pressed shadow pairs, SCSS, and JSON"
useCases:
  - "Crafting tactile media players, synthesizer knobs, and smart-home thermostat controls"
  - "Designing minimal calculator keypads, toggle switches, and range sliders with physical depth"
  - "Building dual-state Tailwind shadow tokens (neumorph-raised and neumorph-pressed) for component libraries"
  - "Testing dark-mode hardware console interfaces on slate and zinc surfaces without harsh borders"
  - "Auditing monochrome card surfaces for WCAG 2.1 text contrast and subtle hairline separation"
  - "Prototyping soft-UI dashboard widgets with synchronized parent canvas and element base hues"
howToSteps:
  - "Pick a starting theme preset (Light Neumorphism, Dark Soft Console, iOS Soft UI, or Pressed Inset) or enter a base Hex, RGB, or HSL color."
  - "Keep background locking enabled so the preview canvas automatically matches the component's base surface, preserving the seamless extrusion illusion."
  - "Choose a surface geometry—Flat, Concave, Convex, or Pressed—and set the virtual light direction or custom angle in degrees."
  - "Adjust elevation distance, blur radius, border radius, and independent light/dark shadow opacities to dial in physical depth."
  - "Click and drag inside the Card, Button, Toggle, Slider, Music Player, and Calculator previews to verify tactile interaction states and WCAG contrast scores."
  - "Switch to the CSS, Tailwind, Tailwind Config, SCSS, or JSON export tab and copy the generated tokens directly into your stylesheet."
---

**Neumorphism** (short for *new skeuomorphism*, often called *Soft UI*) creates the illusion that interface controls are pressed out of—or recessed directly into—the same continuous sheet of matte material as their surrounding canvas. Rather than separating cards with drop shadows hovering over a contrasting backdrop, neumorphic geometry relies on synchronized base colors and twin directional shadows. Running entirely client-side in your browser, this **Neumorphism Generator** calculates physically coherent highlight and shadow coordinates, derives curved surface gradients automatically, and compiles clean CSS, Tailwind, SCSS, and JSON design tokens.

## Directional Lighting Geometry Behind Soft Extrusion

Human depth perception interprets a monochrome shape as elevated whenever one rim catches bright ambient light and the opposing rim casts a soft shadow. CSS achieves this dual-light illusion with a single comma-separated `box-shadow` declaration: a positive offset `(dx, dy)` carrying a darkened shade of the parent surface, paired with an exact mirror offset `(-dx, -dy)` carrying a lightened specular tint.

When you select a custom light angle $\theta$ (in degrees) at elevation distance $d$, the generator computes integer pixel offsets via standard polar projection:

$$dx = \operatorname{round}(\cos(\theta) \cdot d), \qquad dy = \operatorname{round}(\sin(\theta) \cdot d)$$

To prevent shadows from looking dirty or mismatched against colored surfaces, neutral gray `#000000` / `#FFFFFF` overlays are avoided in favor of **HSL lightness derivation**. Starting from the base canvas hue $H$, saturation $S$, and lightness $L$, the engine shifts lightness upward by `+13%` (clamped at `100%`) for the highlight vector and downward by `-13%` (clamped at `0%`) for the cast shadow vector, while keeping the original hue and saturation intact.

## Surface Profiles: Flat, Concave, Convex, and Pressed States

A complete soft-UI system requires more than raised rectangles; interactive controls must communicate affordance—indicating whether a widget can be tapped, slid, or toggled—through subtle shifts in surface curvature and shadow inversion.

| Shape Profile | Shadow Declaration | Face Gradient Rule | Physical Illusion & Ideal UI Role |
| :--- | :--- | :--- | :--- |
| **Flat** | Outer `+dx +dy` dark, `-dx -dy` light | Solid base color (`L`) | Level plateau extruded cleanly from the canvas; ideal for summary cards, containers, and idle buttons. |
| **Concave** | Outer `+dx +dy` dark, `-dx -dy` light | `linear-gradient` from `L - 5%` to `L + 5%` | Gently scooped saucer catching light on its far lip; effective for tactile press pads and icon wells. |
| **Convex** | Outer `+dx +dy` dark, `-dx -dy` light | `linear-gradient` from `L + 5%` to `L - 5%` | Softly domed cap brightest near the light source; suits primary action pills, knobs, and play buttons. |
| **Pressed** | `inset +dx +dy` dark, `inset -dx -dy` light | Solid base color (`L`) | Carved cavity recessed below the canvas plane; ideal for active toggles, text inputs, slider tracks, and `:active` clicks. |

Notice that Concave and Convex profiles keep their outer shadows unchanged while inverting the internal `±5%` lightness gradient along the active light angle (`145deg` for top-left lighting, `225deg` for top-right, `45deg` for bottom-left, `315deg` for bottom-right).

## Implementing Interactive Tactile States in CSS and Tailwind

A common CSS gotcha occurs when engineers try to animate `box-shadow` directly from an outer shadow to an `inset` shadow on `:active`. Per the CSS Backgrounds and Borders specification, browsers cannot interpolate between an outset shadow list and an inset shadow list; the shadow abruptly pops at the 50% animation keyframe.

To achieve a silky physical depression on click, declare **all four shadow layers** in both states and transition only their alpha channels:

```css
.soft-button {
  background: #e0e5ec;
  border-radius: 16px;
  color: #0f172a;
  box-shadow:
    9px 9px 18px rgba(163, 177, 198, 0.45),
    -9px -9px 18px rgba(255, 255, 255, 0.90),
    inset 0 0 0 rgba(163, 177, 198, 0),
    inset 0 0 0 rgba(255, 255, 255, 0);
  transition: box-shadow 180ms cubic-bezier(0.4, 0, 0.2, 1), transform 180ms ease;
}

.soft-button:active,
.soft-button[aria-pressed="true"] {
  box-shadow:
    0 0 0 rgba(163, 177, 198, 0),
    0 0 0 rgba(255, 255, 255, 0),
    inset 6px 6px 12px rgba(163, 177, 198, 0.45),
    inset -6px -6px 12px rgba(255, 255, 255, 0.90);
}

.soft-button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 3px;
}
```

When using Tailwind CSS, the tool's **Tailwind Config** tab automatically outputs paired `neumorph-raised` and `neumorph-pressed` box-shadow tokens so you can compose `shadow-neumorph-raised active:shadow-neumorph-pressed` across your entire component library.

## Navigating WCAG 2.1 Non-Text Contrast and Usability Limits

Pure neumorphism has a well-documented accessibility blind spot: low-contrast soft edges often fall short of **WCAG 2.1 Success Criterion 1.4.11 (Non-Text Contrast)**, which mandates a minimum `3:1` luminance ratio for interactive control boundaries, alongside **SC 1.4.3** (`4.5:1` for normal text). On low-end TN monitors, bright outdoor mobile screens, or for users with reduced contrast sensitivity, borderless soft buttons can blend into the background.

Mitigate this risk without abandoning the aesthetic:

1. **Enable the subtle hairline border:** Toggling the tool's accessibility border outline adds a crisp `1px` edge highlight that delineates clickable hit areas cleanly.
2. **Reserve soft extrusion for high-signal widgets:** Use neumorphic styling selectively for audio decks, numeric pads, or theme toggles while keeping dense forms and data tables cleanly bordered.
3. **Verify foreground labels rigorously:** Rely on the generator's real-time WCAG relative luminance readout and double-check colored icon or accent pairings in the [Color Contrast Checker](/en/tools/contrast-checker).

## Calibrating Base Hues for Light and Dark Interfaces

Because specular highlights need upward lightness headroom and cast shadows need downward depth, the viable sRGB lightness window for soft UI is narrower than in flat design. Light themes perform best between **`82%` and `92%` HSL lightness** (such as cool `#E2E8F0` or warm `#F0EFEA`), whereas dark-mode soft consoles shine between **`12%` and `22%` lightness** (such as `#1E293B` or `#18181B`) with stronger dark shadow opacity (`0.50`–`0.80`) and restrained specular highlights (`0.60`–`0.80`) to avoid glowing neon halos.

If you are building a broader visual language around your soft base color, generate harmonized accent swatches with the [Color Palette Generator](/en/tools/color-palette-generator), or explore translucent layered elevation as a complementary aesthetic in the [Glassmorphism Generator](/en/tools/glassmorphism-generator). Every calculation, color-space conversion, and bookmark save executes locally inside your browser session with zero external dependencies.
