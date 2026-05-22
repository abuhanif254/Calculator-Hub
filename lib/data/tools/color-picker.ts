import { ToolConfig } from './types';

export const colorPickerConfig: ToolConfig = {
  slug: "color-picker",
  title: "Advanced Color Picker Tool",
  shortDescription: "A professional-grade, browser-based Color Picker and converter. Generate HEX, RGB, HSL, and HSV codes, evaluate WCAG accessibility contrast, create color harmonies, and export CSS/Tailwind variables instantly.",
  category: "Color Tools",
  keywords: [
    "color picker", "color converter", "hex code finder", "rgb to hsl", 
    "hex to rgb", "color harmony generator", "wcag contrast checker", 
    "color palette exporter", "css variable generator", "tailwind color picker",
    "online color picker", "design color tools", "html color picker"
  ],

  longDescription: `
In digital design, web development, and branding, color is one of the most powerful tools at your disposal. It establishes hierarchy, sets the emotional tone, guides user interactions, and makes interfaces memorable. However, working with colors in code requires translating visual choices into precise mathematical formats.

Our **Advanced Color Picker Tool** is a comprehensive, client-side workstation designed to help developers, UI/UX designers, and digital artists bridge the gap between design theory and production code. Whether you need to pick a precise hex code, convert between color formats, generate harmonized palettes, check WCAG accessibility compliance, or export Tailwind CSS tokens, this page provides a unified, zero-install workspace.

---

## Understanding Digital Color Formats

Digital screens display colors by mixing Red, Green, and Blue light (the additive color model). In code, we represent these mixtures through various color spaces, each optimized for different workflows.

### 1. Hexadecimal (HEX & HEXA)
The **HEX format** is the default color representation in HTML and CSS. It represents Red, Green, and Blue channels as three 2-digit hexadecimal numbers (base 16), ranging from \`00\` (minimum intensity) to \`ff\` (maximum intensity).
*   **Structure:** \`#RRGGBB\` or \`#RRGGBBAA\` for transparency.
*   **Example:** \`#518231\` (a forest green).
*   **When to use:** Ideal for copy-pasting directly into stylesheets, SVG files, and graphic design tools.

### 2. RGB & RGBA (Red, Green, Blue)
The **RGB model** represents colors using decimal integers from \`0\` to \`255\` for each channel. The **RGBA** extension adds an Alpha channel (a decimal from \`0.0\` to \`1.0\`) representing opacity.
*   **Structure:** \`rgb(red, green, blue)\` or \`rgba(red, green, blue, alpha)\`.
*   **Example:** \`rgb(81, 130, 49)\`.
*   **When to use:** Useful when you need to programmatically manipulate color intensity or opacity via JavaScript.

### 3. HSL & HSLA (Hue, Saturation, Lightness)
While HEX and RGB are optimized for machine rendering, **HSL** is designed for human intuition. It models color based on how we perceive light:
*   **Hue:** The base color shade represented as an angle on the color wheel (\`0°\` to \`360°\`). Red is \`0°\`, Green is \`120°\`, Blue is \`240°\`.
*   **Saturation:** The purity or intensity of the color from \`0%\` (greyscale) to \`100%\` (full color).
*   **Lightness:** The brightness of the color from \`0%\` (pure black) to \`100%\` (pure white).
*   **When to use:** Perfect for creating color variations (e.g., hover states) by simply adjusting the lightness slider in CSS.

### 4. HSV (Hue, Saturation, Value)
Also known as **HSB** (Hue, Saturation, Brightness), this model is popular in graphic software like Photoshop and Figma. While Hue maps identically to HSL, **Value** measures the intensity of light, whereas **Lightness** measures the balance between black and white. Understanding HSV is critical when building 2D saturation-brightness canvas pickers.

---

## Designing Accessible Interfaces (WCAG Contrast Standards)

Web accessibility is no longer optional; it is a legal and moral requirement for modern products. The Web Content Accessibility Guidelines (WCAG) dictate that text must maintain a minimum contrast ratio against its background to remain readable by users with low vision or color blindness.

### The Contrast Math
Contrast ratios range from \`1:1\` (white text on a white background) to \`21:1\` (black text on a white background). The calculation is based on the relative luminance of the colors, which measures how bright a color appears to the human eye.

### WCAG 2.1 Conformance Levels:
*   **AA Rating (Minimum):** Requires a contrast ratio of at least \`4.5:1\` for normal body text and \`3:1\` for large text (over 18pt or bold 14pt).
*   **AAA Rating (Enhanced):** Requires a contrast ratio of at least \`7:1\` for normal text and \`4.5:1\` for large text.
*   **Fail:** Any contrast ratio below \`3:1\` is considered inaccessible for body text.

Our tool includes a **real-time WCAG 2.1 contrast checker**. As you pick or paste a background color, it automatically tests white and black text readability, displaying the exact ratio and assigning a clear status badge (AA, AAA, or Fail). This allows you to fine-tune your color values directly in the workspace to meet accessibility compliance.

---

## Applying Color Theory: Harmony Generators

Choosing colors that look pleasing together is made easy using geometric relationships on the color wheel. Our tool dynamically computes five types of color harmonies for any base color you select:

1.  **Complementary:** Colors directly opposite each other on the color wheel (e.g., green and magenta). This creates high contrast and vibrant designs.
2.  **Analogous:** Three colors adjacent to each other (within 30 degrees). This results in serene, cohesive palettes common in nature.
3.  **Triadic:** Three colors spaced evenly at 120-degree intervals. This offers vibrant color contrast while maintaining balance.
4.  **Monochromatic:** Variations of the same hue, achieved by adjusting saturation and lightness. Perfect for subtle, professional layouts.
5.  **Split-Complementary:** A base color combined with the two colors adjacent to its complement. This provides high contrast without the jarring quality of a direct complementary pair.

---

## Modern Developer Workflows: CSS Variables & Tailwind

### CSS Custom Properties (Variables)
Modern web design relies heavily on CSS variables to manage themes. Instead of hardcoding values like \`#518231\` throughout a codebase, you define them at the root:
\`\`\`css
:root {
  --primary-color: #518231;
  --primary-color-rgb: 81, 130, 49;
}
\`\`\`
This enables quick dark mode switches and simple theme modifications.

### Tailwind CSS Workflows
Tailwind CSS relies on utility classes. Our snippet generator automatically exports Tailwind-ready classes for the selected color, such as \`bg-[#518231]\`, \`text-[#518231]\`, and \`border-[#518231]\`. This lets you paste colors directly into your components without manually editing your tailwind configuration file.

### Security and Client-Side Execution
We believe that developers shouldn't have to upload proprietary design specifications to external servers. **Our tool performs all color math and palette generation 100% locally in your browser.** No network requests are made, ensuring that your branding coordinates, client specifications, and UI colors remain completely secure and private.
  `,

  features: [
    "Interactive color spectrum (saturation/brightness) picker",
    "Dedicated sliders for Hue, Saturation, Lightness, and Alpha/Opacity",
    "Real-time synchronized inputs for HEX, HEXA, RGB, RGBA, HSL, HSLA, and HSV",
    "WCAG 2.1 Contrast Checker with AA/AAA compliance badges",
    "Dynamic Color Harmony Generator (Complementary, Analogous, Triadic, Monochromatic, Split-Complementary)",
    "CSS Gradient Preview with angle slider and copyable linear gradient code",
    "Tailwind CSS custom arbitrary class generator",
    "CSS Variable Custom Properties snippet exporter",
    "LocalStorage-backed Recent Colors History log",
    "Export system supporting JSON download, CSS variable list, and clipboard copies",
    "100% client-side computations (zero server tracking)"
  ],

  useCases: [
    "Converting mock design tokens (e.g. from Figma) into CSS-ready codes",
    "Verifying if a branding color meets WCAG contrast criteria for accessibility",
    "Creating interactive UI color variations (such as hover or disabled states)",
    "Generating quick color palette presets for new websites or marketing pages",
    "Designing gradients with exact angle alignments and copying the resulting CSS",
    "Copying Tailwind-ready utility classes for arbitrary colors",
    "Restoring previous color codes from historical picks when designing pages",
    "Debugging color code syntax errors by pasting and validating strings"
  ],

  howToSteps: [
    "Paste any valid color string (like HEX, RGB, or HSL) in the corresponding input box, or drag the color picker indicator and sliders.",
    "Observe all color value formats update simultaneously in real time.",
    "Verify accessibility rating (AA/AAA) to ensure text on this color remains readable.",
    "Explore color harmony blocks at the bottom to find matching theme shades.",
    "Adjust the angle slider to see the color rendered inside a linear gradient.",
    "Click the copy icon next to any format to save it to your clipboard.",
    "Export CSS variables or download the full palette configuration as a JSON file.",
    "Click any swatch in the 'Recent Colors' section to restore a previous selection."
  ],

  examples: [
    {
      title: "HEX to HSL & RGBA Conversion",
      description: "Convert a HEX value to HSL for manual theme tweaking, and RGBA to set semi-transparency in CSS.",
      input: "#518231",
      output: "HSL: 96°, 45%, 35% | RGBA: rgba(81, 130, 49, 1)"
    },
    {
      title: "WCAG Accessibility Validation",
      description: "Evaluate contrast ratio for light text against dark background color.",
      input: "#0f172a (Slate 900)",
      output: "White Text: 15.9:1 (AAA Pass) | Black Text: 1.3:1 (Fail)"
    }
  ],

  faq: [
    {
      question: "What is a HEX color code?",
      answer: "A HEX color code is a six-character hexadecimal representation of red, green, and blue light components. For example, #518231 represents the red channel as 51 (81 in decimal), green as 82 (130 in decimal), and blue as 31 (49 in decimal)."
    },
    {
      question: "What is the difference between HSL and HSV?",
      answer: "While both represent color using Hue and Saturation, HSL measures Lightness (shading from black to white), whereas HSV measures Value/Brightness (the amount of light emitted). In HSL, a lightness of 100% is always pure white. In HSV, a value of 100% can be a bright color if saturation is also high."
    },
    {
      question: "How do I choose WCAG accessible colors?",
      answer: "Ensure your text and background colors have a contrast ratio of at least 4.5:1 for normal text (AA) or 7:1 for enhanced accessibility (AAA). For large headers, a ratio of 3:1 (AA) or 4.5:1 (AAA) is acceptable. Our built-in accessibility panel calculates this ratio automatically."
    },
    {
      question: "What is a complementary color harmony?",
      answer: "Complementary colors sit directly opposite each other on the 360-degree color wheel (separated by 180 degrees). Examples include red and cyan, or blue and yellow. This combination provides high contrast and visual energy."
    },
    {
      question: "What are analogous colors?",
      answer: "Analogous colors are grouped adjacent to each other on the color wheel (within 30-45 degrees of each other). They share a dominant hue and are visually soothing, making them popular for background and secondary elements."
    },
    {
      question: "How do developers use color pickers?",
      answer: "Developers use color pickers to extract color codes from digital designs, translate HEX values into CSS-friendly formats like RGBA or HSL, test text readability, and create reusable color variables for stylesheets and design configurations."
    },
    {
      question: "What is the Alpha channel in RGBA and HSLA?",
      answer: "The Alpha channel determines the opacity of a color. It ranges from 0.0 (completely transparent) to 1.0 (completely opaque). This allows background content or gradients to show through your element."
    },
    {
      question: "How does the linear gradient generator work?",
      answer: "It creates a CSS gradient background using your selected color as a primary shade, blending it with secondary shades at a specified angle. You can copy the 'background: linear-gradient(...)' CSS code to use in your stylesheet."
    },
    {
      question: "Are my color selections saved?",
      answer: "Yes. Your picked colors are saved locally to your browser's LocalStorage. This means your color history remains intact even if you refresh or close the tab, and the data remains 100% private to you."
    },
    {
      question: "Can I copy Tailwind utility classes directly?",
      answer: "Yes. The tool generates arbitrary value Tailwind utility classes like bg-[#518231], text-[#518231], and border-[#518231], which you can paste directly into your HTML/JSX code."
    }
  ],

  relatedTools: [
    { name: "Gradient Generator", slug: "gradient-generator" },
    { name: "HEX to RGB", slug: "hex-to-rgb" },
    { name: "RGB to HEX", slug: "rgb-to-hex" },
    { name: "Contrast Checker", slug: "contrast-checker" },
    { name: "Color Palette Generator", slug: "color-palette-generator" }
  ]
};
