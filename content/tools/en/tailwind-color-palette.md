---
metaTitle: "Tailwind Color Palette Generator (50-950 Scales & v4 CSS)"
metaDescription: "Generate custom 50-950 Tailwind color scales from any hex, preview live UI kits with WCAG AA contrast checks, and export v3/v4 configs in-browser."
metaKeywords: "tailwind color generator, tailwind palette maker, tailwind shade generator, tailwind configuration editor, design token system, color contrast checker, saas color palette, custom tailwind colors, css variables generator, frontend developer tools, web design palettes, tailwind.config.js exporter"
title: "Tailwind Color Palette Generator"
shortDescription: "Derive cohesive 11-step Tailwind CSS color scales (50-950) across eight semantic UI roles from a single base color, validate WCAG AA legibility on live component mockups, and export Tailwind v3, Tailwind v4 @theme, CSS, SCSS, or JSON tokens."
faqs:
  - question: "Does my exact brand hex code stay intact inside the generated 50-950 scale?"
    answer: "Yes. Instead of forcing every input onto shade 500 and distorting very light or very dark brand hues, the algorithm locates the target luminance slot (50 through 950) closest to your input color's lightness, pins your exact hex code into that anchor stop, and interpolates lighter tints and darker shades asymmetrically outward."
  - question: "What is the difference between the Tailwind v3 and Tailwind v4 export tabs?"
    answer: "Tailwind CSS v3 registers custom palettes inside module.exports.theme.extend.colors in tailwind.config.js. Tailwind CSS v4 adopts a CSS-first configuration using @theme { --color-primary-500: #3b82f6; }, which automatically exposes bg-primary-500, text-primary-500, and border-primary-500 utilities without a JavaScript config file."
  - question: "Why do darker shades (700-950) include a subtle hue shift?"
    answer: "Simply decreasing HSL lightness toward black often makes blues look muddy and yellows turn olive-brown. Applying a gradual +4-degree hue drift along the dark tail keeps deep 800-950 stops visually crisp and chromatic, mirroring how professional design systems calibrate shadows and dark-mode surfaces."
  - question: "How can I prevent changing my primary color from overwriting my custom secondary or neutral scale?"
    answer: "Each of the eight semantic tabs—Primary, Secondary, Accent, Neutral, Success, Warning, Danger, and Info—features an individual lock toggle. Locking any role pins its current hex value while letting the harmonic generator recalculate unlocked families from a new primary seed."
  - question: "Which shades on a 50-950 scale are generally safe for white button text under WCAG AA?"
    answer: "Each swatch badge reports its exact contrast ratio against both pure white (#ffffff) and dark slate (#0f172a). For mid-luminance hues like indigo, blue, or emerald, shades 600 through 950 typically clear the 4.5:1 WCAG AA threshold with white text, whereas bright amber or cyan scales often need dark slate text on 400-500 buttons."
features:
  - "Dynamic anchor-slot 11-step scale generation (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950) that preserves exact brand hex values"
  - "Eight synchronized semantic design-system roles (Primary, Secondary, Accent, Neutral, Success, Warning, Danger, Info) with per-role lock controls"
  - "Real-time WCAG AA contrast badges computed on every generated swatch against pure white (#ffffff) and dark slate (#0f172a)"
  - "Live light-mode and dark-mode UI kit sandbox rendering buttons, SaaS widgets, inputs, alerts, and navigation surfaces using your active tokens"
  - "Automatic color-theory harmony explorer displaying Complementary, Analogous, Triadic, and Split-Complementary pairings plus native EyeDropper sampling"
  - "Multi-format production export covering Tailwind v3 config, Tailwind v4 @theme CSS, :root variables, SCSS maps, JSON tokens, and 1200x630 PNG swatch sheets"
useCases:
  - "Translating a client's single brand-guideline hex code into a complete 88-token SaaS design system in under two minutes"
  - "Migrating legacy tailwind.config.js color objects into Tailwind CSS v4 @theme stylesheets while verifying dark-mode elevation stops"
  - "Building custom brand-tinted neutral grays (low-saturation slate/zinc alternatives) that harmonize subtly with a primary accent hue"
  - "Auditing button, badge, and alert status states across light and dark UI mockups before handing tokens off to frontend engineers"
  - "Exporting structured JSON color token dictionaries for Style Dictionary, Figma Tokens Studio, or cross-platform React Native themes"
  - "Downloading high-resolution 1200x630 PNG palette reference sheets for stakeholder brand decks and design-system documentation"
howToSteps:
  - "Select a curated SaaS preset or input your brand hex, RGB, or HSL color into the Primary Brand tab (or sample one with the EyeDropper)."
  - "Lock any semantic role you want to preserve, then refine Secondary, Accent, Neutral, or status colors (Success, Warning, Danger, Info) individually."
  - "Inspect the 11-step 50-950 scale and check the automatic WCAG AA white-text and dark-text contrast ratios printed on each shade card."
  - "Switch to the UI Kit, Widgets, and Alerts preview tabs—and toggle Dark Mode—to validate visual hierarchy on realistic interface components."
  - "Choose your target export format: Tailwind v3 JS config, Tailwind v4 @theme block, CSS Custom Properties, SCSS variables, or JSON tokens."
  - "Copy the code directly into your repository or download a 1200x630 PNG swatch sheet rendered locally on an HTML5 Canvas."
---

Shipping a cohesive Tailwind CSS interface requires far more than picking one attractive primary hex code. Production apps rely on an 11-step luminance ladder (`50` through `950`) across primary actions, secondary accents, subtle tinted neutrals, and semantic status states so hover rings, soft badge tints, dark-mode cards, and accessible body links all snap into predictable visual hierarchy. The **Tailwind Color Palette Generator** computes all eight semantic families—88 individual tokens—locally inside your browser, pairing live component previews and per-swatch WCAG AA contrast audits with zero-latency `localStorage` theme bookmarks.

## Anatomy of the 11-Step Tailwind Luminance Ramp

Tailwind CSS standardized the `50`–`950` numeric naming scale (with `950` introduced in Tailwind v3.3 for ultra-deep dark-mode canvases) so developers can reason about contrast and elevation by number rather than memorizing arbitrary color names. Understanding the intended functional role of each stop prevents over-saturating backgrounds or losing border definition across light and dark themes.

| Shade Token | Target Lightness Anchor | Light-Mode UI Role | Dark-Mode UI Role | Typical WCAG AA Text Pairing |
| :--- | :--- | :--- | :--- | :--- |
| `50` | `97%` | Subtle page wash, soft alert fill, hover row tint | Ultra-crisp primary headings on `950` surfaces | Dark ink (`#0f172a` / `900`–`950`) |
| `100` | `93%` | Soft pill badges, secondary button fills, tag surfaces | High-emphasis body copy and icon fills | Dark ink (`#0f172a` / `800`–`950`) |
| `200` | `85%` | Card borders, input dividers, subtle focus halos | Muted emphasis labels and hover text | Dark ink (`#0f172a` / `800`–`950`) |
| `300` | `75%` | Hover border states, disabled outlines, chart gridlines | Secondary accents, inline links on `900`–`950` | Dark ink (`#0f172a` / `900`–`950`) |
| `400` | `63%` | Decorative icons, active dark-mode brand accents | Primary interactive links and glowing focus rings | Hue-dependent (verify AA ratio) |
| `500` | `50%` | Canonical brand midpoint, primary fills, chart series | Active brand buttons, solid badges, progress bars | Hue-dependent (verify AA ratio) |
| `600` | `40%` | Accessible primary CTA buttons, text links on white | Hover state for `500` primary dark-mode buttons | White ink (`#ffffff`) on most hues |
| `700` | `30%` | Hover/pressed state for `600` buttons, strong badges | Elevated dark-mode borders and active nav pills | White ink (`#ffffff`) |
| `800` | `20%` | High-contrast dark labels inside `50`–`100` alert banners | Raised dark cards, dropdown menus, input surfaces | White ink (`#ffffff`) |
| `900` | `12%` | Primary editorial headings, footer surfaces | Main dark-mode application containers | White ink (`#ffffff`) |
| `950` | `6%` | Maximum-depth ink, crisp monochrome accents | Deepest dark-mode viewport backdrop (`bg-neutral-950`) | White ink (`#ffffff`) |

## Dynamic Base-Slot Anchoring and Dark-End Hue Shifting

A notorious flaw in basic shade generators is hard-coding the user's input color onto slot `500`. If a brand's signature color is a bright electric lime (`L = 68%`) or a deep executive navy (`L = 22%`), forcing it into `500` compresses half the scale into clipped near-white or muddy near-black duplicates—or worse, mutates the brand hex so it never appears verbatim in the output.

Instead, this generator inspects the input color's HSL lightness and matches it to the nearest anchor in the 11-stop table (`97, 93, 85, 75, 63, 50, 40, 30, 20, 12, 6`). Your exact brand hex is pinned verbatim at that anchor index (`isBase: true`). From there, two asymmetric curves radiate outward:

1. **Tint Interpolation (Lighter Stops):** Steps from the anchor toward `L = 98%` while tapering saturation gently down toward `S = 10%`, yielding airy `50` and `100` tints that never look neon-washed behind alert text.
2. **Shade Interpolation (Darker Stops):** Steps from the anchor toward `L = 5%` with controlled saturation retention (`S = 25%` floor) and a progressive `+4°` cool hue rotation across the dark tail. That slight hue curve prevents deep `800`–`950` shades from turning dull brown or charcoal-gray while maintaining smooth perceptual separation.

If your starting inspiration is a photograph, mood board, or screenshot rather than an existing hex specification, extract your base brand swatches first with our [Color Palette Generator From Image](/en/tools/color-palette-generator-from-image), then feed the dominant hue here to build its complete 50–950 scale.

## Orchestrating Multi-Role Semantic Palettes

Changing the `Primary Brand` seed automatically derives a balanced multi-family system using classical color-wheel intervals—unless you explicitly pin a family with its lock button:

- **Secondary (`+30°` analogous):** Harmonizes beside primary CTAs for multi-series charts and secondary badges.
- **Accent (`+150°` split-complementary):** Creates energetic visual contrast for promotional highlights without clashing aggressively like a raw `180°` complement.
- **Neutral (Primary Hue at `4%–12%` saturation):** Generates a bespoke brand-tinted neutral ramp (like Tailwind's `slate` or `stone`, but mathematically tuned to your brand hue).
- **Status Families (`Success`, `Warning`, `Danger`, `Info`):** Anchored to high-clarity semantic hues (`142°` emerald, `38°` amber, `0°` red, `200°` cyan) so operational feedback remains unmistakable.

## Migrating Between Tailwind v3 JavaScript Configs and Tailwind v4 `@theme`

Tailwind CSS v4 replaced JavaScript configuration objects with CSS-native `@theme` blocks, turning design tokens directly into standard CSS variables that both utility classes and runtime scripts can reference. Exporting both formats side-by-side removes tedious manual reformatting during upgrades:

```javascript
// Tailwind CSS v3 — tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef6ff",
          500: "#3b82f6",
          600: "#2563eb",
          950: "#0b1528",
        },
      },
    },
  },
};
```

```css
/* Tailwind CSS v4 — app.css */
@import "tailwindcss";

@theme {
  --color-primary-50: #eef6ff;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-950: #0b1528;
}
```

Beyond Tailwind v3 and v4, you can export standard `:root` CSS Custom Properties, SCSS variables (`$primary-500`), W3C-compatible JSON token trees, or a `1200x630` PNG swatch board rendered on an offscreen HTML5 Canvas for brand handbooks. If you merge exported custom properties into an existing stylesheet, our [CSS Beautifier](/en/tools/css-beautifier) keeps formatting and indentation clean across team commits.

## Validating Scales in Real UI Contexts Before Shipping

Swatches arranged in neat horizontal grids often hide real usability issues—most commonly white labels sitting on bright `500` yellows, cyans, or greens that dip around `2.2:1`–`3.4:1` contrast. Inspect the `AA` pass badges printed on every stop, then flip between the **UI Kit**, **Widgets**, and **Alerts** mockups in both Light and Dark preview modes. Whenever a borderline button or secondary caption needs granular compliance verification or dichromacy screening, run the exact foreground/background pair through our [Contrast Checker](/en/tools/contrast-checker) before freezing your design tokens.
