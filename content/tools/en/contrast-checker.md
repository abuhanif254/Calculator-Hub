---
metaTitle: "WCAG 2.1 Contrast Checker & Color Blindness Simulator"
metaDescription: "Audit WCAG 2.1 AA/AAA color contrast ratios, simulate color blindness, and auto-fix failing shades locally in your browser with CSS and Tailwind exports."
metaKeywords: "wcag contrast checker, color contrast calculator, web accessibility checker, tailwind accessibility tools, color blindness simulator online, a11y contrast analyzer, aa aaa compliance checker, smart color suggestions accessibility, ui contrast checker, design system contrast tokens, text legibility test web, inclusive web design"
title: "Contrast Checker"
shortDescription: "Audit foreground and background luminance ratios against WCAG 2.1 AA/AAA criteria, preview four SVG color-vision deficiency filters live, and auto-remediate failing colors into accessible design tokens."
faqs:
  - question: "What is the minimum contrast ratio required for WCAG 2.1 Level AA compliance?"
    answer: "WCAG 2.1 Level AA mandates at least 4.5:1 for normal body text (under 18pt or under 14pt bold), 3.0:1 for large headings (18pt/24px regular or 14pt/18.66px bold and above), and 3.0:1 for non-text UI components such as form borders, focus rings, and chart indicators under Success Criterion 1.4.11."
  - question: "How does the smart auto-correction algorithm preserve brand identity?"
    answer: "Rather than jumping straight to pure black or pure white, the remediation engine converts your failing foreground or background color to HSL, locks its original hue and saturation, and steps lightness by 1% increments away from the opposing surface until the exact 4.5:1 (AA) or 7.0:1 (AAA) threshold is met."
  - question: "How accurate are the built-in color blindness simulations?"
    answer: "The preview workbench applies real-time SVG feColorMatrix linear transformations modeling protanopia (red-cone absence), deuteranopia (green-cone absence), tritanopia (blue-cone absence), and complete achromatopsia directly over live typography, buttons, dashboard cards, and pricing tables."
  - question: "Why does WCAG 2.1 still fail some colors that look readable on a bright monitor?"
    answer: "WCAG 2.1 evaluates relative luminance in linearized sRGB without accounting for ambient room glare, font weight optical thickness, or dark-mode polarity. High-saturation blues and oranges often pass casual visual inspection on OLED screens yet fall below 4.5:1 for users with low vision or presbyopia."
  - question: "Can I sample colors directly from Figma or another desktop window?"
    answer: "Yes. On Chromium-based browsers that implement the native EyeDropper API, clicking the eyedropper control lets you sample any pixel on your screen into the foreground or background channel, with all contrast math and audit history stored locally in your browser."
features:
  - "Real-time WCAG 2.1 contrast ratio computation across AA Normal (4.5:1), AAA Normal (7.0:1), AA Large (3.0:1), AAA Large (4.5:1), and UI Components (3.0:1)"
  - "Synchronized HEX, RGB, and HSL channel editors with native browser EyeDropper sampling for both foreground and background colors"
  - "Hardware-accelerated SVG feColorMatrix simulations for Protanopia, Deuteranopia, Tritanopia, and Achromatopsia"
  - "One-click HSL lightness-stepping auto-remediation generating nearest compliant AA and AAA foreground or background alternatives"
  - "Interactive four-view UI preview workbench covering Typography scales, interactive Widgets, Dashboard KPIs, and Pricing cards"
  - "Instant design token export in CSS Custom Properties, Tailwind arbitrary utility classes, SCSS variables, and structured WCAG JSON audit payloads"
useCases:
  - "Auditing primary button labels, error banners, and form field borders before an ADA, Section 508, or European Accessibility Act compliance review"
  - "Validating dark-mode surface and text token pairs so muted secondary copy stays above 4.5:1 on slate or charcoal backgrounds"
  - "Verifying that red/green financial charts and status badges remain distinguishable for protanopic and deuteranopic readers"
  - "Remediating marketing brand colors that fail WCAG AA without drifting off-hue from corporate style guidelines"
  - "Sampling live colors off staging builds or Figma prototypes via the EyeDropper API during QA triage"
  - "Generating verified JSON accessibility reports and CSS variables to commit directly into a component library pull request"
howToSteps:
  - "Enter your foreground and background colors using HEX codes, RGB/HSL numeric inputs, the visual swatch picker, or the screen EyeDropper."
  - "Read the live contrast ratio badge (from 1:1 to 21:1) and inspect Pass/Fail indicators across WCAG 2.1 AA, AAA, Large Text, and UI Component rules."
  - "Switch between Typography, Widgets, Dashboard, and Pricing preview tabs to test how the pairing behaves across realistic interface hierarchy."
  - "Toggle the Protanopia, Deuteranopia, Tritanopia, or Achromatopsia filters to verify legibility under color-vision deficiencies."
  - "If a pair fails, click the auto-suggested AA (4.5:1) or AAA (7.0:1) swatch to lock in the nearest hue-preserving compliant shade."
  - "Copy the verified pair as CSS variables, Tailwind utilities, SCSS variables, or a JSON compliance object for your codebase."
---

Color contrast is a measurable engineering threshold that determines whether text, controls, and data visualizations remain usable for people with low vision, cataracts, color-vision deficiency, or screen glare. The **Contrast Checker** evaluates foreground and background pairs locally using WCAG 2.1 luminance equations, live SVG color-blindness filters, and automated hue-preserving correction. Every calculation, EyeDropper sample, and `localStorage` audit bookmark runs strictly client-side, so unreleased brand palettes never cross a network boundary.

## WCAG 2.1 Contrast Thresholds and Typography Math

WCAG 2.1 defines visual contrast across three Success Criteria: **1.4.3 Contrast (Minimum)**, **1.4.6 Contrast (Enhanced)**, and **1.4.11 Non-text Contrast**. Because browsers map `1pt` to `1.3333px` at standard 96 CSS DPI, the "Large Text" cutoff lands at exact CSS pixel boundaries where the minimum requirement drops from `4.5:1` to `3.0:1`.

| WCAG 2.1 Criterion | Level | Min Ratio | CSS Scope | Typical UI Elements |
| :--- | :--- | :--- | :--- | :--- |
| SC 1.4.3 (Normal Text) | AA | `4.5:1` | Under `24px` (`18pt`) regular or `18.66px` (`14pt`) bold | Body copy, table cells, nav links, form labels |
| SC 1.4.3 (Large Text) | AA | `3.0:1` | `24px` (`18pt`) regular or `18.66px` (`14pt`) bold+ | Page titles, hero headings, display KPIs |
| SC 1.4.11 (Non-Text UI) | AA | `3.0:1` | Graphical objects and interactive boundaries | Input borders, toggle tracks, focus rings, charts |
| SC 1.4.6 (Normal Text) | AAA | `7.0:1` | Under `24px` (`18pt`) regular or `18.66px` (`14pt`) bold | Government portals, medical docs, reading modes |
| SC 1.4.6 (Large Text) | AAA | `4.5:1` | `24px` (`18pt`) regular or `18.66px` (`14pt`) bold+ | High-accessibility banners and headers |

Ratios span `1:1` (identical luminance) to `21:1` (`#000000` on `#ffffff`). In formal audits, bold means `font-weight: 700` or heavier; semi-bold `600` headings at `19px` still require `4.5:1`.

## Inside the sRGB Relative Luminance Equation

Raw 8-bit RGB channels cannot be averaged to estimate brightness because sRGB applies a non-linear gamma curve. Each channel must first be normalized to `[0, 1]` and linearized via the sRGB electro-optical transfer function (EOTF), then weighted using ITU-R BT.709 luminous efficiency—where green drives over 71% of perceived brightness while blue contributes just 7.2%.

```javascript
function linearize(c) {
  const s = c / 255;
  // WCAG 2.0/2.1 published cutoff (errata updated to 0.04045; delta < 0.0001)
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function getContrastRatio(a, b) {
  const lum = ({ r, g, b }) =>
    0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  const l1 = lum(a), l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
```

Adding `0.05` prevents division by zero on pure black (`L = 0`) and models ambient screen glare. To convert raw hex tokens into 8-bit channels for custom scripts, pair this workflow with our [HEX to RGB Converter](/en/tools/hex-to-rgb).

## Simulating Dichromacy and Monochrome Vision with SVG Matrices

A passing luminance ratio does not guarantee clear color-coded states for users with color-vision deficiency (CVD), affecting roughly 8% of males and 0.5% of females. Crimson errors and emerald badges of equal brightness can collapse into identical olive tones for dichromatic readers.

The Contrast Checker applies inline SVG `<feColorMatrix type="matrix">` 4×5 affine transforms live across the preview workbench. Each row linearly remaps incoming red, green, and blue display channels to model absent retinal photopigments without degrading layout crispness or text anti-aliasing:

- **Protanopia (L-cone loss):** Deep reds darken sharply while red-green pairs compress into yellow-brown (`R' = 0.567R + 0.433G`).
- **Deuteranopia (M-cone loss):** The most common red-green deficiency; greens shift beige and merge with warm reds (`R' = 0.625R + 0.375G`).
- **Tritanopia (S-cone loss):** Blues lean cyan-teal while yellows desaturate toward pale pink or light gray.
- **Achromatopsia (Monochromacy):** Zero chromatic discrimination; legibility depends strictly on luminance separation across adjacent pixels.

Testing your tokens inside the interactive **Widgets**, **Dashboard**, and **Pricing** tabs immediately exposes interfaces that rely on hue alone instead of reinforcing meaning with icons, pattern fills, or underlines.

## Algorithmic Auto-Remediation and Common Audit Pitfalls

### Preserving Brand Hue via HSL Lightness Stepping

Electric blue (`#3b82f6`) on white (`#ffffff`) scores `3.68:1`—acceptable for large headings, but failing AA for `16px` body links. Guessing darker hex codes manually often drifts off-hue. Our remediation routine converts the target color to HSL, checks whether the opposing background has luminance below `0.5`, and steps lightness in `1%` increments upward or downward until `getContrastRatio()` clears `4.5:1` or `7.0:1` while keeping hue and saturation fixed. To expand a remediated brand anchor across a full 11-stop scale, move it into our [Tailwind Color Palette Generator](/en/tools/tailwind-color-palette).

### Pitfalls: Alpha Compositing, Focus Rings, and Dark-Mode Polarity

Four recurring mistakes break production accessibility audits even when headline tokens pass:

1. **Translucent foregrounds:** Black text at `opacity: 0.45` over `#ffffff` composites to `#8c8c8c` (`3.38:1`), silently failing AA. Audit the final composited pixel using the EyeDropper or our [Color Picker](/en/tools/color-picker).
2. **Default placeholders:** Browsers render `<input placeholder="...">` near `0.54` opacity, almost always failing `4.5:1`. Style placeholders explicitly with a verified neutral token.
3. **Unchecked focus rings and borders:** Under WCAG 2.1 SC 1.4.11, keyboard `:focus-visible` outlines and input borders must hit `3.0:1` against their immediate adjacent background—not merely against the page body.
4. **Dark-mode halation and APCA:** WCAG 2.1 treats polarity symmetrically, whereas WCAG 3's draft APCA algorithm accounts for light-on-black halation. Pairing softened dark canvases (`#0f172a`) with `>= 6.0:1` text improves comfort while clearing WCAG 2.1 AA.

## Exporting Verified Accessibility Tokens

Once a pair clears your conformance target and vision filters, copy it straight from the export panel as `:root` CSS Custom Properties (`--accessible-foreground`, `--accessible-background`, `--contrast-ratio-verified`), Tailwind arbitrary utilities (`text-[#...] bg-[#...]`), SCSS variables, or a structured JSON audit report capturing every WCAG 2.0/2.1 `PASS`/`FAIL` status for CI records.
