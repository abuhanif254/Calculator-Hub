import { ToolConfig } from './types';

export const contrastCheckerConfig: ToolConfig = {
  slug: "contrast-checker",
  title: "Contrast Checker",
  shortDescription: "Visually audit color contrast ratios between text overlays and backgrounds under WCAG 2.1 specifications, simulate color blindness, and auto-correct to accessible values.",
  category: "Color Tools",
  keywords: [
    "wcag contrast checker", "color contrast calculator", "web accessibility checker",
    "tailwind accessibility tools", "color blindness simulator online", "a11y contrast analyzer",
    "aa aaa compliance checker", "smart color suggestions accessibility", "ui contrast checker",
    "design system contrast tokens", "text legibility test web", "inclusive web design"
  ],

  longDescription: `
In user interface (UI) and user experience (UX) design, color is more than a branding element—it is a functional vehicle for transferring information. If page typography lacks sufficient contrast against its backing canvas, the interface becomes difficult or impossible to read. Accessibility is a fundamental pillar of modern front-end engineering. Creating inclusive designs ensures that websites are fully usable by individuals with varying degrees of vision impairment, including color vision deficiencies, low vision, and age-related visual degradation.

Our **Contrast Checker** is a professional-grade web utility designed to simplify the audit and correction of UI color combinations. Built for front-end developers, product managers, web accessibility specialists, and UI/UX designers, it calculates WCAG 2.1 compliance parameters, simulates multiple types of color blindness in real time, automatically suggests conforming colors, and exports clean design tokens.

---

## 1. What is Color Contrast?
Color contrast represents the difference in luminance (reflected light) between two adjacent colors—specifically, the foreground text color and the background color. Web browsers render typography on top of containers, and if the luminance difference is too narrow, the letters blur into the background.

To formalize this, the World Wide Web Consortium (W3C) established the Web Content Accessibility Guidelines (WCAG). Contrast compliance is measured as a mathematical ratio ranging from **\`1:1\`** (zero contrast, e.g. white text on a white background) to **\`21:1\`** (maximum contrast, e.g. solid black text on a solid white background).

---

## 2. Understanding WCAG Compliance Levels
The WCAG 2.0/2.1 standards establish three main levels of compliance—A, AA, and AAA. For color contrast, focus is directed on levels **AA** and **AAA**:

### WCAG Level AA (Minimum Standard)
This is the baseline standard for most commercial, corporate, and educational websites. To pass level AA:
*   **Normal Text:** Typography smaller than \`18pt\` (or \`14pt\` bold) must have a contrast ratio of at least **\`4.5:1\`**.
*   **Large Text:** Typography that is \`18pt\` (approx. \`24px\`) and larger, or \`14pt\` (approx. \`18.66px\`) bold and larger, must have a contrast ratio of at least **\`3.0:1\`**.
*   **Graphical Objects & User Interface Components:** Active inputs, buttons, and decorative graphs require a contrast ratio of at least **\`3.0:1\`** against surrounding pixels.

### WCAG Level AAA (Enhanced Standard)
This is a more stringent standard, required for public services, government platforms, and highly inclusive products. To pass level AAA:
*   **Normal Text:** Typography smaller than \`18pt\` (or \`14pt\` bold) must have a contrast ratio of at least **\`7.0:1\`**.
*   **Large Text:** Typography that is \`18pt\` (approx. \`24px\`) and larger, or \`14pt\` (approx. \`18.66px\`) bold and larger, must have a contrast ratio of at least **\`4.5:1\`**.

---

## 3. Mathematical Formula for Relative Luminance
The contrast ratio between two colors is computed using their **relative luminance**. Luminance is a measure of the perceived brightness of a color, normalized between \`0\` (darkest black) and \`1\` (brightest white).

### Step 1: Normalize RGB Channels
For each channel (Red, Green, Blue) in a color, normalize the values between \`0\` and \`1\` by dividing by \`255\`:
\`\`\`javascript
const sR = R / 255;
const sG = G / 255;
const sB = B / 255;
\`\`\`

### Step 2: Apply Gamma Correction
Human eyes do not perceive color brightness linearly. Adjust the normalized channels:
\`\`\`javascript
const r = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
const g = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
const b = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);
\`\`\`

### Step 3: Compute Relative Luminance
Use the weighted spectral sensitivities of the human eye for Red, Green, and Blue light:
\`\`\`javascript
const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
\`\`\`

### Step 4: Calculate the Contrast Ratio
Given the luminance values of the lighter color (\`L1\`) and the darker color (\`L2\`), the ratio is:
\`\`\`javascript
const ratio = (L1 + 0.05) / (L2 + 0.05);
\`\`\`
The constant addition of \`0.05\` acts as a visual threshold, simulating light scattering in the eye and preventing divide-by-zero errors when dealing with black.

---

## 4. Visual Impairment & Color Blindness Simulations
Web accessibility must account for vision deficiencies. Roughly 8% of men and 0.5% of women worldwide have some form of color vision deficiency (CVD).

Our tool simulates four major types of color blindness directly over components using hardware-accelerated SVG matrix filters:
1.  **Protanopia (Red-blind):** A complete lack of red photoreceptors. Red colors appear dark, greenish, or brown, while green and red blends look yellow.
2.  **Deuteranopia (Green-blind):** A complete lack of green photoreceptors. This is the most common form of color blindness. Reds and greens are highly confused.
3.  **Tritanopia (Blue-blind):** A complete lack of blue photoreceptors. Blue appears greenish, and yellow looks pink or violet.
4.  **Achromatopsia (Monochrome):** Complete color blindness. The user perceives only grayscale values of lightness and shadow. Contrast checking is critical here, as legibility relies entirely on luminance difference.

---

## 5. Smart Contrast Correction Algorithms
When a color combination fails WCAG compliance, designers shouldn't have to guess how to fix it. Our tool implements a **Smart Suggestions Algorithm** that programmatically shifts colors to the closest compliant shade.

### The Correction Process:
*   The algorithm converts the foreground or background color to HSL (Hue, Saturation, Lightness).
*   If the background color is light (\`L >= 50%\`), the algorithm decreases the lightness of the foreground color progressively (e.g. by 1% steps) until the target ratio (4.5 or 7.0) is hit.
*   If the background color is dark (\`L < 50%\`), it increases the lightness of the foreground color until it conforms.
*   This finds the mathematically closest conforming color, preserving the original hue and saturation as much as possible.

---

## 6. Tailwind CSS & Inclusive Design Tokens
Tailwind CSS makes it simple to construct accessible color tokens. Avoid assigning colors ad-hoc (like \`text-gray-400 bg-white\`). Instead, configure cohesive, audited design tokens inside your Tailwind config:
\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        accessible: {
          body: '#1e293b',       // Audited 10.4:1 contrast against white
          muted: '#64748b',      // Audited 4.6:1 contrast against white (passes AA)
          bg: '#f8fafc',
          brand: '#16a34a'       // Audited green passing AA on dark backgrounds
        }
      }
    }
  }
}
\`\`\`
Using verified variables guarantees compliance across components, headers, buttons, and alert states.
  `,

  features: [
    "Precise color contrast ratio calculator under WCAG 2.0 / 2.1 compliance algorithms",
    "Dual color panels supporting native color sliders, custom HEX inputs, RGB controls, and HSL levels",
    "W3C level AA and level AAA compliance indicators for normal text, large headings, and graphical elements",
    "Smart Suggestions auto-correcting color lightness to conforming contrast levels with one click",
    "Color vision deficiencies simulator representing Protanopia, Deuteranopia, Tritanopia, and Achromatopsia",
    "Sandbox component previews displaying the color pair on headings, buttons, forms, tables, pricing plans, and mobile app UI",
    "Font customization tools adjusting preview text sizes and weights to audit typography variations",
    "History logger and favorites bookmarking system saving audited palettes in local storage",
    "Exports snippets for CSS variables, SCSS variables, JSON configs, and Tailwind CSS configuration parameters",
    "EyeDropper API color sampler integration for supported desktop web browsers"
  ],

  useCases: [
    "Auditing brand color palettes to verify level AA standard compliance before launch",
    "Finding the closest accessible gray shade for secondary text fields on light landing pages",
    "Simulating how a SaaS dashboard layout appears to users with Deuteranopia or Achromatopsia",
    "Generating contrast-safe background-foreground pairs for web buttons and active states",
    "Exporting a compliant color tokens system into Tailwind CSS extend configurations",
    "Prototyping responsive typography sizes and weights while testing readability ranges",
    "Restoring previous accessibility audits from local history logs during design reviews"
  ],

  howToSteps: [
    "Input your text foreground color and background color using the HEX boxes or RGB/HSL sliders.",
    "Inspect the resulting Contrast Ratio score (e.g. 5.6:1) and the WCAG AA/AAA compliance checkmarks.",
    "If any test fails, click the 'Fix to AA' or 'Fix to AAA' button to auto-shift the color to the nearest conforming HSL value.",
    "Navigate between the preview tabs (Typography, SaaS Form, Dashboard, Buttons) to inspect legibility.",
    "Use the Color Blindness dropdown to simulate how the color scheme is perceived by color-deficient users.",
    "Adjust font sizes and weights in the Typography preview to check large text threshold rules.",
    "Copy the accessible hex color codes, copy Tailwind class mappings, or export the SCSS variables to your project."
  ],

  examples: [
    {
      title: "Accessible Light Mode Text",
      description: "Standard body text color designed to pass level AAA standards on a white page.",
      input: "Foreground: #27272a, Background: #ffffff",
      output: "Contrast Ratio: 13.5:1 (Passes WCAG AA Normal, WCAG AAA Normal, AA Large, AAA Large)"
    },
    {
      title: "Compliant Muted Muted Gray Link",
      description: "A secondary gray link color designed to pass minimum level AA contrast thresholds.",
      input: "Foreground: #64748b, Background: #ffffff",
      output: "Contrast Ratio: 4.6:1 (Passes WCAG AA Normal, WCAG AA Large, WCAG AAA Large; Fails WCAG AAA Normal)"
    }
  ],

  faq: [
    {
      question: "What is color contrast in web accessibility?",
      answer: "Color contrast is the difference in light reflectance (luminance) between the foreground text and the background color. Sufficient contrast is required for users with vision deficiencies to read content."
    },
    {
      question: "What is the relative luminance formula?",
      answer: "Relative luminance measures color brightness normalized between 0 (black) and 1 (white). It is computed by applying gamma correction to RGB channels and weighting them based on human eye sensitivities."
    },
    {
      question: "What is the difference between WCAG AA and AAA standards?",
      answer: "Level AA is the standard compliance level for most websites, requiring a 4.5:1 ratio for normal text and 3.0:1 for large text. Level AAA is more strict, requiring a 7.0:1 ratio for normal text and 4.5:1 for large text."
    },
    {
      question: "What text size qualifies as 'Large Text' under WCAG rules?",
      answer: "Large text is defined as typography 18pt (approximately 24px) or larger, or 14pt (approximately 18.66px) bold or larger. Large text requires lower contrast ratios (3.0:1 for AA, 4.5:1 for AAA)."
    },
    {
      question: "How does the smart contrast suggestion feature work?",
      answer: "The suggestion algorithm shifts the HSL lightness channel of the foreground color progressively (darker for light backgrounds, lighter for dark backgrounds) until it hits the target WCAG contrast threshold."
    },
    {
      question: "How do I use color blindness simulations?",
      answer: "Select a simulation from the dropdown. The preview container will apply hardware-accelerated SVG matrix filters that mimic Protanopia, Deuteranopia, Tritanopia, and Achromatopsia."
    },
    {
      question: "Why does neumorphic UI design fail contrast guidelines?",
      answer: "Neumorphic components match their canvas background color exactly (1:1 contrast) and use low-contrast shadows to simulate depth. This fails minimum WCAG AA standards, making high-contrast text outlines essential."
    },
    {
      question: "Can I use alpha transparency colors in this tool?",
      answer: "Yes, the generator supports alpha opacity sliders. It calculates the resulting solid RGB blend overlay against the background to evaluate final contrast ratio compliances."
    },
    {
      question: "How do I register accessible colors in my Tailwind CSS project?",
      answer: "You can define your audited color hex codes inside the tailwind.config.js extension file, allowing you to use them as standard utility classes like text-accessible-body."
    },
    {
      question: "Is this checker mobile-friendly?",
      answer: "Yes. The interface is fully responsive, supporting full visual color adjustments, presets selection, and mockups testing on desktop, tablet, and mobile browsers."
    }
  ],

  relatedTools: [
    { name: "Color Picker", slug: "color-picker" },
    { name: "Tailwind Color Palette", slug: "tailwind-color-palette" },
    { name: "RGB to HEX", slug: "rgb-to-hex" },
    { name: "HEX to RGB", slug: "hex-to-rgb" },
    { name: "Gradient Generator", slug: "gradient-generator" },
    { name: "Glassmorphism Generator", slug: "glassmorphism-generator" }
  ]
};
