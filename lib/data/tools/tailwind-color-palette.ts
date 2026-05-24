import { ToolConfig } from './types';

export const tailwindColorPaletteConfig: ToolConfig = {
  slug: "tailwind-color-palette",
  title: "Tailwind Color Palette Generator",
  shortDescription: "Generate custom, production-ready Tailwind CSS color scales (50-950) from any base color. Preview palettes in functional UI kit mockups, evaluate WCAG accessibility, and export configurations instantly.",
  category: "Color Tools",
  keywords: [
    "tailwind color generator", "tailwind palette maker", "tailwind shade generator",
    "tailwind configuration editor", "design token system", "color contrast checker",
    "saas color palette", "custom tailwind colors", "css variables generator",
    "frontend developer tools", "web design palettes", "tailwind.config.js exporter"
  ],

  longDescription: `
In modern frontend engineering, building a consistent, scalable design system is one of the most critical steps to ensuring product quality. Colors define the visual hierarchy, convey brand values, represent interactive states, and guide user workflows. However, manually crafting a cohesive scale of eleven distinct shades (from 50 to 950) for multiple functional colors is time-consuming and prone to visual inconsistencies.

Our **Tailwind Color Palette Generator** is a comprehensive, client-side workstation designed to help developers and UI/UX designers generate, customize, preview, and export Tailwind-compatible color tokens instantly. By inputting a single base color, the tool computes perceptually balanced shades, tests them for WCAG contrast compliance, renders them inside responsive dashboard mockups, and compiles configuration snippets—operating 100% locally in your browser.

---

## 1. What Is Tailwind CSS?
**Tailwind CSS** is a utility-first CSS framework that has revolutionized how developers build modern web interfaces. Rather than writing custom CSS rules in separate stylesheets, Tailwind provides low-level utility classes like \`flex\`, \`pt-4\`, \`text-center\`, and \`bg-blue-500\`. This allows developers to style components directly in HTML or React JSX.

### The Power of Utility-First CSS
The utility-first workflow offers significant advantages:
*   **Reduced File Sizes:** Tailwind ships a highly optimized, pre-compiled CSS bundle. By using reusable class utilities, your stylesheets stop growing linearly with the size of your codebase.
*   **Rapid Prototyping:** Developers can build complex layouts without writing a single line of custom CSS, speeding up mock-to-code cycles.
*   **Design System Constraints:** Tailwind enforces a strict set of design tokens—pre-selected values for spacing, typography, shadows, and colors—ensuring consistency across pages.

---

## 2. Understanding Tailwind's Color Systems
Tailwind's default theme features a curated palette of colors (such as slate, red, amber, emerald, blue, indigo, and violet). Each color family contains eleven numbered shades:
*   **Light End (50–300):** Primarily used for subtle backgrounds, border dividers, hover cards, and light mode disabled states.
*   **Mid-Range (400–600):** Used for primary buttons, active state indicators, brand icons, and main visual focus points. The 500 shade is typically the standard base.
*   **Dark End (700–950):** Applied to body text, headings, dark mode backgrounds, borders, and high-contrast layouts.

This numerical scaling allows developers to intuitively match shades across different color families. For instance, a border on an alert box can be styled as \`border-red-200\` with a light backing of \`bg-red-50\` and dark warning text of \`text-red-800\`.

---

## 3. Customizing the Tailwind Theme
While default colors are excellent for bootstrapping projects, production applications require brand-specific custom palettes. Customizing these colors in Tailwind requires modifying the \`tailwind.config.js\` (or \`tailwind.config.ts\`) configuration file:
\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          // ...
          500: '#8b5cf6',
          // ...
          950: '#0c0a09',
        },
      },
    },
  },
}
\`\`\`
Defining these blocks manually is tedious. Our generator takes any color input, calculates all intermediate shade steps, and outputs the exact copy-pasteable JS/TS configuration object, saving developers time and ensuring mathematical scaling.

---

## 4. Shade Generation Mechanics: Perceptual Balance
Calculating color scales mathematically by adjusting hex numbers linearly often yields unsatisfactory results. Pure linear adjustments (e.g. adding or subtracting constant RGB values) can make intermediate shades look muddy, desaturated, or overly harsh.

To solve this, our generator utilizes **HSL (Hue, Saturation, Lightness) interpolation**.
1.  **Lightness Mapping:** We analyze the base input color's lightness and place it on its corresponding index (e.g., a color with 50% lightness maps to 500, whereas a light pastel color with 80% lightness maps to 200).
2.  **Lighter Interpolation (50–400):** We interpolate between the base color and a bright white limit (L=98%, S=10%), dynamically scaling saturation to maintain color richness.
3.  **Darker Interpolation (600–950):** We interpolate between the base color and a dark black limit (L=5%, S=25%), preventing the dark colors from turning into flat, lifeless charcoal grays.

This produces a smooth, natural transition that mirrors real light reflections and shadow behaviors.

---

## 5. Designing Coordinated Brand Themes
A design system requires more than just one primary brand color. To build cohesive web interfaces, you need complementary, accent, and semantic palettes:
*   **Primary Palette:** The dominant color family that establishes the application's core identity (e.g., indigo for developer tooling, emerald for finance).
*   **Secondary & Accent Palettes:** Colors that stand adjacent or opposite on the color wheel. Accent colors are used sparingly for active highlights, checkmarks, notifications, or sale badges.
*   **Neutral Palette:** Grayscale scales (Slate, Zinc, Gray) tinted with a tiny fraction of the primary hue. This ties backgrounds, panels, and borders to the brand's tone.
*   **Semantic Palettes:** Standardized indicators for application states: **Success** (green), **Warning** (yellow/amber), **Danger** (red), and **Info** (blue).

Our tool generates all eight of these scales simultaneously from a single base color using mathematical relationships, establishing a complete palette system in one click.

---

## 6. Accessiblity: Compliance and the WCAG
Creating accessible products is a core requirement of modern web development. Text must have sufficient contrast against its background to remain readable for users with visual impairments.

The Web Content Accessibility Guidelines (WCAG 2.1) specify:
*   **AA Compliance (Minimum):** Requires a contrast ratio of at least \`4.5:1\` for body text, and \`3:1\` for large header typography.
*   **AAA Compliance (Enhanced):** Requires a contrast ratio of at least \`7:1\` for body text, and \`4.5:1\` for headers.

### Contrast Mapping in Tailwind Scales
Because Tailwind scales transition from light to dark, text readability changes per shade. Typically:
*   **Shades 50–400:** Have low lightness contrast against white text. They require **dark text** (e.g., \`text-slate-900\` or shade 900) to remain readable.
*   **Shades 500–950:** Have low contrast against dark text. They require **light text** (e.g., \`text-white\` or shade 50) for compliance.

Our tool checks the relative luminance of black and white text against all eleven generated shades, displaying exact ratios and compatibility ratings. This helps you select conforming background-text pairings instantly.

---

## 7. SaaS Dashboards and Component Design Previews
To evaluate if a color palette works, designers must see it applied to real components. Static grid swatches are insufficient to test how colors look behind text, inside button borders, or as navigation hover states.

To solve this, our generator renders the custom palettes directly onto a live **Design System Preview Workspace**. This interactive dashboard displays:
*   **Buttons:** Standard, active, hover, disabled, outlines, and text link button states.
*   **Alert Dialogs:** Compact alert boxes styled with semantic colors.
*   **Widgets:** Statistical KPI cards showing chart lines and active status tags.
*   **Forms:** Input boxes, checkboxes, radio selections, and active focus state indicators.
*   **Navigation & Navbar:** Header configurations showing hover selectors.
*   **Tables:** Striped lists showing hover rows.

This lets you audit the color scale's effectiveness in real-world scenarios before copying the code to your editor.

---

## 8. Theme Exporters: CSS Variables and JSON Tokens
Modern front-end frameworks use multiple styling pipelines. Our tool accommodates these configurations by providing multiple export formats:

### A. CSS Custom Properties (Variables)
CSS variables allow you to build themes that can change dynamically at runtime:
\`\`\`css
:root {
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-950: #172554;
}
\`\`\`
This facilitates simple dark mode toggling by simply redefining variables inside a \`.dark\` class selector.

### B. SCSS Variables
For legacy or enterprise systems using SASS/SCSS, variables are formatted as:
\`\`\`scss
$primary-50: #eff6ff;
$primary-500: #3b82f6;
$primary-950: #172554;
\`\`\`

### C. JSON Design Tokens
For integrations with cross-platform design systems (e.g., Style Dictionary for iOS and Android), you can export the full palette configuration as a structured JSON file.
  `,

  features: [
    "Generates a complete 11-step Tailwind CSS color scale (50-950) from a single color",
    "Smart shade generation mapped to the base color's natural perceptual lightness",
    "Visual color picker supporting HEX, RGB, and HSL values with eye-dropper integration",
    "Eight coordinated scales generated automatically: Primary, Secondary, Accent, Success, Warning, Danger, Info, and Neutral",
    "Interactive UI Kit component preview displaying buttons, forms, tables, and alerts",
    "WCAG 2.1 accessibility checker testing contrast ratios for black/white text against all shades",
    "Pre-designed theme configurations: Modern SaaS, Cyberpunk, Material, Grayscale, Neon, and Dark premium",
    "Multi-format exporters: tailwind.config.js (v3/v4), CSS custom variables, SCSS variables, and JSON design tokens",
    "Palette randomizer with theme constraints (pastel, neon, dark, any)",
    "PNG preview downloader drawing the swatches onto a canvas image",
    "Interactive gradient builder generating CSS linear gradients from palette swatches",
    "LocalStorage integration saving palette history log and bookmarked favorites"
  ],

  useCases: [
    "Generating brand-specific Tailwind configuration classes for a new SaaS platform",
    "Auditing design systems to ensure all text-background colors pass accessibility contrast checks",
    "Creating mock dashboards to preview theme shifts between dark and light modes",
    "Translating design tokens (from Figma specs) into copy-pasteable CSS custom variables",
    "Generating primary, secondary, and accent palettes based on classic color wheel harmonies",
    "Prototyping component button states (active, hover, disabled) in a sandbox before writing code",
    "Creating neutral grayscale shades tinted with the primary brand color to match themes",
    "Downloading visual palette PNG swatch cards to share in design system channels"
  ],

  howToSteps: [
    "Paste your primary base color (HEX, RGB, HSL) in the input form, or select it using the visual color picker spectrum.",
    "Observe the scale auto-calculate all eleven shades from 50 to 950.",
    "Click any individual swatch to select it and copy its hex code to your clipboard.",
    "Switch between the tabs (Buttons, Dashboard, Forms, Alerts) to preview how the shades look on real components.",
    "Check the WCAG accessibility badges under each swatch to verify if black or white text is compliant.",
    "Explore color relationships (Complementary, Analogous, Monochrome) to build supplementary scales.",
    "Choose from the preset list to load popular color combinations like 'Modern SaaS' or 'Cyberpunk'.",
    "Click the Export Config tab to copy tailwind.config.js code, CSS variables, or download PNG/JSON assets."
  ],

  examples: [
    {
      title: "SaaS Indigo Theme Customization",
      description: "Generate a custom indigo scale for a SaaS dashboard and copy the Tailwind theme extensions.",
      input: "Base color: #4f46e5 (Indigo 600)",
      output: "tailwind.config.js extend colors object with brand-50 (#eef2ff) through brand-950 (#0f0e17)"
    },
    {
      title: "Semantic Danger Palette Compliance check",
      description: "Verify contrast safety for warning alerts using dark text against custom generated red shades.",
      input: "Base color: #ef4444 (Red 500)",
      output: "Red-50: Contrast 18.2:1 (AAA Pass with Black Text) | Red-900: Contrast 9.4:1 (AAA Pass with White Text)"
    }
  ],

  faq: [
    {
      question: "What is a Tailwind color palette?",
      answer: "A Tailwind color palette is a set of eleven structured shades (ranging from 50, 100, 200, to 900 and 950) grouped under a single color family. It ensures visual consistency across spacing, backgrounds, borders, and text."
    },
    {
      question: "How does the generator calculate shades from a single color?",
      answer: "The tool converts the input color to HSL. It maps the base color's lightness to the closest standard shade index (e.g. 500). Then, it interpolates H, S, and L parameters towards a bright limit (white) for lighter shades, and a dark limit (black) for darker shades, creating a smooth scale."
    },
    {
      question: "Can I export this palette directly into my tailwind.config.js?",
      answer: "Yes. In the Export section, the tool compiles the exact JavaScript object code for tailwind.config.js. You can copy and paste this inside the theme.extend.colors block of your Tailwind config."
    },
    {
      question: "What are CSS custom properties (variables) in palettes?",
      answer: "CSS variables are dynamic design tokens defined in stylesheets (e.g. --color-primary-500: #3b82f6). They are useful for runtime theme switches, such as dark mode, by simply redefining the variable values inside a .dark selector."
    },
    {
      question: "Is this color generator compatible with Tailwind v4?",
      answer: "Yes. Tailwind v4 supports CSS variables directly in themes using @theme directives. You can copy the exported CSS variables code block and place it inside your main CSS stylesheet under the @theme directive."
    },
    {
      question: "How do I ensure my design system is WCAG compliant?",
      answer: "Check the accessibility contrast ratings generated for each shade. Ensure you pair light shades (50-400) with dark text, and dark shades (500-950) with white or light text. The WCAG requires a contrast ratio of at least 4.5:1 for standard body text."
    },
    {
      question: "What are secondary and accent palettes?",
      answer: "Secondary colors are analogous shades that sit adjacent to the primary color on the color wheel. Accent colors sit opposite (complementary) or at a triadic angle, providing high-contrast markers for buttons, icons, or badges."
    },
    {
      question: "Can I lock specific colors when generating random palettes?",
      answer: "Yes. Click the padlock icon next to any palette tab (Primary, Secondary, Accent, Success, etc.) to lock it. This prevents the randomizer from modifying those colors while regenerating others."
    },
    {
      question: "How do I download the swatches as a PNG image?",
      answer: "Click the Export tab, navigate to the PNG section, and click 'Export PNG Asset'. The tool draws the swatches and labels onto a HTML5 canvas and triggers a browser download for the resulting image."
    },
    {
      question: "Are my generated palettes saved locally?",
      answer: "Yes. The generator saves your design configurations locally to your browser's LocalStorage. This allows you to restore recent palettes and favorites without uploading data to external servers."
    }
  ],

  relatedTools: [
    { name: "Color Picker", slug: "color-picker" },
    { name: "Gradient Generator", slug: "gradient-generator" },
    { name: "HEX to RGB", slug: "hex-to-rgb" },
    { name: "RGB to HEX", slug: "rgb-to-hex" },
    { name: "Contrast Checker", slug: "contrast-checker" }
  ]
};
