import { ToolConfig } from './types';

export const colorPaletteGeneratorConfig: ToolConfig = {
  slug: "color-palette-generator",
  title: "Color Palette Generator",
  shortDescription: "Intelligently generate color palettes using HSL harmony math, build custom 50–950 color scales, evaluate accessibility ratings, and export CSS or Tailwind configs.",
  category: "Color Tools",
  keywords: [
    "color palette generator", "color scheme maker", "custom color harmony generator",
    "tailwind CSS palette builder", "hex color palette creator", "accessible UI colors tool",
    "monochromatic palette math", "design system color scales", "sass branding colors generator",
    "ux palette previewer", "complementary color matching", "brand color strategy"
  ],

  longDescription: `
Color is one of the most powerful communicative vectors in graphic design, product branding, and user interface (UI) engineering. A well-crafted color scheme establishes visual hierarchy, guides user attention, defines state changes, and reinforces brand identity. Conversely, a poorly balanced palette can introduce visual noise, degrade readability, and alienate users with vision deficiencies.

Our **Color Palette Generator** is a professional-grade web utility built for front-end developers, product owners, brand strategists, UI/UX designers, and Tailwind CSS programmers. It utilizes mathematical HSL color harmony models to construct cohesive color relationships, generates full 50-950 Tailwind tint and shade scales, evaluates WCAG 2.1 accessibility parameters, and exports copyable CSS custom properties, SCSS variables, JSON configs, and SVG/PNG swatch files.

---

## 1. The Physics of Color Harmonies
To generate colors that look visually balanced together, designers rely on **color theory**—a set of principles dating back to Isaac Newton's color wheel in 1666. Rather than picking hex codes at random, professional palettes are built on mathematical relationships:

### Harmony Models:
1.  **Monochromatic:** Variations of a single base hue. Saturation and lightness levels are scaled to create clean, low-contrast UI systems.
2.  **Analogous:** Colors positioned adjacent to each other on the color wheel (e.g. within \`30°\` of the base hue). It creates a harmonious, natural feel resembling patterns in nature.
3.  **Complementary:** Two opposite colors (separated by \`180°\`). This offers high visual contrast, making it perfect for call-to-actions, warning badges, or brand anchors.
4.  **Split Complementary:** The base hue combined with the two colors adjacent to its complement (separated by \`150°\` and \`210°\`). It delivers the dynamic pop of contrast but with less harshness than a direct complementary pair.
5.  **Triadic:** Three colors spaced equally around the color wheel (separated by \`120°\`). It creates vibrant, playful schemes that require careful weight balancing to avoid visual noise.
6.  **Tetradic (Double Complementary):** Four colors arranged in two complementary pairs. This is a rich, complex scheme that works best when one color dominates.
7.  **Square:** Four colors spaced equally around the wheel (separated by \`90°\`). Excellent for colorful branding systems and gamified dashboards.

---

## 2. Mathematical Shading: 50–950 Scales
In utility-first frameworks like Tailwind CSS, colors are not single points; they are **scales** representing a spectrum of shades and tints. A scale typically spans from \`50\` (lightest tint, used for card backings and input highlights) to \`950\` (darkest shade, used for text and deep borders), with \`500\` acting as the base color.

### The Scaling Math
To generate a 50–950 scale programmatically:
*   We convert the selected color to HSL (Hue, Saturation, Lightness).
*   **Tints (50 to 400):** We scale the Lightness parameter upwards towards \`98%\` while slightly decreasing Saturation to prevent the color from looking overly saturated.
*   **Shades (600 to 950):** We scale the Lightness downwards towards \`8%\` while adjusting Saturation to ensure the colors maintain a rich, deep brand undertone instead of turning muddy gray.

---

## 3. Designing Accessible Color Systems (WCAG)
Visual design must remain inclusive. Every generated color palette should undergo contrast auditing before it is pushed to production.

Under Web Content Accessibility Guidelines (WCAG 2.1):
*   **Minimum Contrast (AA):** Foreground text against background must reach at least **\`4.5:1\`** contrast ratio for normal body copy and **\`3.0:1\`** for large headers.
*   **Enhanced Contrast (AAA):** Requires a contrast ratio of **\`7.0:1\`** for normal text.
*   Our generator integrates a real-time WCAG checker. It analyzes all foreground-background combinations within the palette, suggesting compliant combinations and indicating whether a shade requires a white or black text overlay.

---

## 4. Modern Branding & SaaS Visual Strategy
In SaaS design, a balanced color system utilizes a **60-30-10 distribution rule**:
*   **60% Dominant (Neutral background):** Usually a soft, low-saturation white, cream, or deep slate/navy (for dark mode). It sets the visual canvas.
*   **30% Secondary (Brand base):** The primary brand color (e.g. deep blue, purple, or green) used for sidebars, cards, and headings.
*   **10% Accent (Call-to-action):** A high-contrast complementary color (e.g. vibrant amber, orange, or rose) reserved strictly for buttons, progress trackers, and critical alerts.

Our tool helps you generate these visual relations, suggesting gradient pairs and computing secondary accents dynamically.

---

## 5. Tailwind CSS Color Token Integration
Tailwind CSS relies on theme extensions inside \`tailwind.config.js\`. To incorporate your generated palette, you can output custom CSS custom variables or define them as javascript modules:
\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
          950: '#032338',
        }
      }
    }
  }
}
\`\`\`
Defining colors as nested objects creates utility classes (e.g. \`bg-brand-500\`, \`text-brand-900\`, \`border-brand-50\`) instantly across your project, ensuring consistency.
  `,

  features: [
    "Automatic HSL color harmony generator supporting Monochromatic, Analogous, Complementary, Triadic, Tetradic, and Square math",
    "Custom scale builders producing 2, 3, 5, or 10+ color systems based on a custom seed color",
    "Tailwind-compatible 50–950 tint and shade interpolator for all generated colors",
    "Live component preview canvas: rendering palettes on dashboards, pricing cards, hero segments, inputs, and navbars",
    "W3C compliance checker verifying contrast ratios (AA/AAA) for foreground text overlays on every shade",
    "Dual color sliders supporting HEX inputs, RGB controls, and HSL lightness settings with native dropper support",
    "One-click exporters compiling CSS custom properties, SCSS variables, JSON schemes, and Tailwind configurations",
    "Graphic asset downloader supporting vector SVG swatches and PNG palette cards",
    "EyeDropper API color picker integration for desktop browsers",
    "Local history logging storing up to 10 recent design setups in browser cache logs"
  ],

  useCases: [
    "Designing cohesive brand guidelines and corporate color systems from a single primary logo color",
    "Generating compliant, utility-ready 50-950 color ranges for a custom Tailwind theme extension",
    "Auditing text legibility on secondary branding accents before deploying styles to production",
    "Building high-contrast complementary color sets for SaaS buttons, alert boxes, and notifications",
    "Exporting a unified JSON design tokens file to sync color parameters across Figma and codebase files",
    "Preserving color design variations in local history to compare iterations during team reviews"
  ],

  howToSteps: [
    "Choose a primary seed color using the HEX color picker or the RGB/HSL sliders.",
    "Select your color harmony logic (e.g., Analogous or Complementary) from the drop-down menu.",
    "Determine the number of core colors you want in the palette (2, 3, 5, or 10).",
    "Review the generated colors list and check the automatically generated 50–950 Tailwind color scales.",
    "Navigate through the preview tabs (Dashboard, Hero, Pricing) to verify how the colors look on actual components.",
    "Look at the Contrast compliance table to ensure background-foreground pairs pass WCAG standards.",
    "Copy the CSS variables, copy the Tailwind theme block, or download the palette as an SVG swatch file."
  ],

  examples: [
    {
      title: "Tactile Blue SaaS Palette",
      description: "A clean analogous blue-to-teal branding palette designed for software dashboards.",
      input: "Base Hue: 210 (Blue), Saturation: 85%, Mode: Analogous",
      output: "Base Colors: #1e3a8a, #0d9488, #0f766e; CSS: var(--primary-500) = #3b82f6"
    },
    {
      title: "Vibrant Accent Palette",
      description: "A complementary purple-and-gold scheme optimized for high-contrast gaming landing pages.",
      input: "Base Hue: 270 (Purple), Mode: Complementary",
      output: "Base Colors: #6d28d9, #eab308; Contrast Ratio: 7.4:1 (Passes WCAG AAA)"
    }
  ],

  faq: [
    {
      question: "What is a color palette?",
      answer: "A color palette is a curated selection of colors used in branding, UI/UX design, and illustration. A balanced palette establishes visual hierarchy, brand recognition, and text legibility."
    },
    {
      question: "How does mathematical color harmony work?",
      answer: "Color harmony math uses geometric angles on the 360-degree color wheel (often using HSL hue coordinates). For example, a complementary color is found at 180 degrees opposite the base hue, while analogous colors are 30 degrees adjacent."
    },
    {
      question: "What is a 50–950 color scale?",
      answer: "A 50–950 color scale is a design token convention (standardized by Tailwind CSS) mapping a color from its lightest tint (50) to its darkest shade (950). The middle shade (500) represents the base value."
    },
    {
      question: "How do I generate accessible color palettes?",
      answer: "Make sure that foreground text on background cards has a contrast ratio of at least 4.5:1 (WCAG AA). The checker indicates compliance for all combinations in your generated palette."
    },
    {
      question: "What is the 60-30-10 design rule?",
      answer: "The 60-30-10 rule is a visual balance guideline: 60% of the canvas is a dominant neutral color (backgrounds), 30% is a secondary brand color (cards, panels), and 10% is a high-contrast accent (CTA buttons, status lights)."
    },
    {
      question: "Can I copy these colors directly into Tailwind CSS?",
      answer: "Yes. The exporter tab compiles your custom HSL and hex scales into a nested theme object that you can paste directly into your tailwind.config.js file."
    },
    {
      question: "What is a triadic color palette?",
      answer: "A triadic palette uses three colors spaced equally on the color wheel (120 degrees apart). It provides high visual vibrancy and is popular in retro, educational, and creative branding."
    },
    {
      question: "How do HSL color selectors work?",
      answer: "HSL stands for Hue (color angle 0-360), Saturation (color purity 0-100%), and Lightness (brightness 0-100%). It is much more intuitive than Hex or RGB for generating smooth shading ranges."
    },
    {
      question: "Does this tool support browser color eyedroppers?",
      answer: "Yes. If your browser supports the native EyeDropper API, a color sampler icon will appear next to color sliders to sample pixels from any coordinate on your desktop screen."
    },
    {
      question: "Can I save my generated palettes?",
      answer: "Yes. The tool saves your recent palette combinations in LocalStorage, allowing you to reload previous swatches and design configurations upon page refresh."
    }
  ],

  relatedTools: [
    { name: "Color Picker", slug: "color-picker" },
    { name: "Gradient Generator", slug: "gradient-generator" },
    { name: "Tailwind Color Palette", slug: "tailwind-color-palette" },
    { name: "Contrast Checker", slug: "contrast-checker" },
    { name: "RGB to HEX", slug: "rgb-to-hex" },
    { name: "HEX to RGB", slug: "hex-to-rgb" }
  ]
};
