import { ToolConfig } from './types';

export const hexToRgbConfig: ToolConfig = {
  slug: "hex-to-rgb",
  title: "HEX to RGB Converter",
  shortDescription: "Convert HEX color codes to RGB, RGBA, HSL, HSLA, and HSV instantly. Verify WCAG contrast accessibility, generate CSS variables, Tailwind classes, dynamic color harmonies, gradients, and export your specs.",
  category: "Color Tools",
  keywords: [
    "hex to rgb", "hex to rgba", "hex to hsl", "hex converter", "color converter",
    "hex to hsv", "css variable generator", "tailwind color converter",
    "wcag contrast checker", "8-digit hex converter", "color palette generator"
  ],

  longDescription: `
In digital design, web development, branding, and frontend engineering, color is one of the most powerful communication channels available. A well-crafted palette guides users, establishes visual hierarchy, and reinforces brand identity. However, rendering colors on digital screens requires translating visual choices into precise mathematical formats that web browsers and operating systems can understand. Among the most popular color formats are HEX (hexadecimal) and RGB (Red, Green, Blue). While designers frequently use HEX codes for their compactness, developers often need to convert them to RGB or RGBA to manipulate opacity, apply overlays, or write dynamic styling scripts.

Our **HEX to RGB Converter** is a professional-grade, browser-based utility designed to streamline this conversion process. By providing real-time parsing, accessibility analysis, custom code exports, and palette generation, this tool eliminates context switching and ensures your colors are production-ready.

---

## 1. What are HEX Colors?
HEX (hexadecimal) color codes are the default representation of colors in HTML, CSS, SVG, and design software like Figma or Sketch. A HEX code represents Red, Green, and Blue light channels as hexadecimal values (base-16), ranging from \`00\` (minimum intensity, representing 0 in decimal) to \`FF\` (maximum intensity, representing 255 in decimal).

A standard 6-character HEX code (e.g., \`#518231\`) is composed of three 2-digit channels:
*   **Red Channel:** The first pair (\`51\` in hex, which converts to \`81\` in decimal).
*   **Green Channel:** The second pair (\`82\` in hex, which converts to \`130\` in decimal).
*   **Blue Channel:** The third pair (\`31\` in hex, which converts to \`49\` in decimal).

Shorthand 3-character HEX codes (e.g., \`#FFF\`) are also widely supported. Browsers expand these by doubling each character, so \`#FFF\` becomes \`#FFFFFF\`. Modern CSS also supports 8-character HEX codes (HEXA), where the last two characters represent the Alpha (opacity) channel. For instance, \`#51823180\` represents the same forest green but with \`80\` hex (128 in decimal, or roughly 50%) opacity.

## 2. The RGB Color Model
The RGB color model is an additive color space based on human visual biology. Computer screens display colors by mixing red, green, and blue light. Each pixel on a screen contains three sub-pixels that emit these primary colors at varying intensities.

In code, RGB values are represented as integers ranging from \`0\` to \`255\`:
*   \`rgb(255, 255, 255)\` represents pure white (all lights at full intensity).
*   \`rgb(0, 0, 0)\` represents pure black (all lights turned off).
*   \`rgb(81, 130, 49)\` represents our custom forest green color.

The **RGBA** variation extends this by introducing a fourth parameter: Alpha. Expressed as a decimal between \`0.0\` (completely transparent) and \`1.0\` (completely opaque), Alpha allows developers to layer elements, create realistic shadows, and style semi-transparent backdrops.

## 3. Difference Between HEX and RGB
While HEX and RGB represent colors in the exact same additive color space, they differ in syntax, readability, and utility:
*   **Syntax & Portability:** HEX is highly compact and portable. Copying \`#518231\` is cleaner than copying \`rgb(81, 130, 49)\`. This makes HEX the standard for design style guides.
*   **Human Readability:** RGB is slightly easier for humans to decode. If you see \`rgb(250, 10, 10)\`, you instantly know it is a highly saturated red. In contrast, reading \`#FA0A0A\` requires a quick hexadecimal translation.
*   **Programmatic Control:** Modifying colors dynamically in JavaScript is easier with RGB. Formulas that blend colors, adjust brightness, or manipulate transparency operate on decimal values, making RGB the ideal format for canvas animations, charts, and interactive web elements.

## 4. Web Development Color Systems
Modern frontend frameworks and browser specifications support several color representation systems:
*   **HEX / HEXA:** Best for static declarations and configuration files.
*   **RGB / RGBA:** Essential for opacity manipulation and legacy browser support.
*   **HSL / HSLA (Hue, Saturation, Lightness):** A developer-favorite format because it aligns with human intuition. By representing hue as an angle (0° to 360°) and saturation/lightness as percentages, HSL makes it simple to generate matching dark/light shades or hover states by adjusting the lightness value.
*   **HSV (Hue, Saturation, Value):** Also known as HSB (Brightness), this model is used inside graphics tools like Figma. While not natively supported by CSS, converting design files to HSV helps programmers write advanced color algorithms.

## 5. CSS Color Usage
In CSS, colors are applied to properties like \`color\`, \`background-color\`, and \`border-color\`. Modern CSS layouts leverage CSS Custom Properties (variables) to implement color tokens. For instance, declaring your colors in \`:root\` enables simple global themes:
\`\`\`css
:root {
  --primary-color: rgb(81, 130, 49);
  --primary-color-hover: rgb(67, 106, 40);
}
\`\`\`
By mapping these variables, you can easily implement a global dark mode toggle by swapping out the variable declarations under a \`.dark\` class selector.

## 6. UI/UX Color Theory
Colors establish the emotional tone of a web application and guide users through workflows:
*   **Primary Colors:** Drive action. Used on primary buttons, active tabs, and main call-to-actions.
*   **Secondary/Neutral Colors:** Create structure. Greys, slates, and borders establish bounds without competing for the user's attention.
*   **Semantic Colors:** Provide status. Red represents errors, green represents success, orange warns users, and blue shares information.

Using harmonious relationships (like monochromatic or complementary colors) ensures the interface feels unified and balanced.

## 7. Accessibility and Contrast
A beautiful website is useless if users cannot read the text. The Web Content Accessibility Guidelines (WCAG 2.1) specify strict contrast standards to support users with low vision, color blindness, or situational impairments (like reading in bright sunlight):
*   **Contrast Ratio:** The luminance difference between text (foreground) and background, ranging from \`1:1\` to \`21:1\`.
*   **WCAG AA Rating (Minimum):** Requires a contrast ratio of at least \`4.5:1\` for normal body text and \`3:1\` for large text (18pt+ or 14pt+ bold).
*   **WCAG AAA Rating (Enhanced):** Requires a contrast ratio of at least \`7:1\` for normal text and \`4.5:1\` for large text.
Our tool includes a real-time relative luminance analyzer that instantly displays WCAG AA and AAA pass/fail statuses, allowing you to tweak HEX codes until they meet accessibility requirements.

## 8. Tailwind CSS Workflows
Tailwind CSS relies on utility classes to build interfaces. Developers can declare custom colors in \`tailwind.config.js\`, or use arbitrary values directly in their markup.
*   **Arbitrary Class Syntax:** If you need to use a color once without adding it to your config, you can write \`bg-[#518231]\`, \`text-[#518231]\`, or \`border-[#518231]\`.
*   **Utility Exporter:** Our converter automatically generates these Tailwind snippets, enabling you to copy the exact classes you need with a single click.

## 9. Branding Systems
Branding guidelines document a company's visual assets, specifying core colors in HEX, Pantone, or CMYK. Developers are responsible for translating these static design coordinates into web code.
When building a web platform, storing color coordinates as RGB triplets allows you to apply overlays or shadows of the brand color using CSS variables, ensuring brand integrity while maximizing layout flexibility.

## 10. Frontend Developer Workflows
Context switching is the enemy of productivity. In a typical workflow, a developer:
1. Copies a HEX value from a Figma canvas.
2. Pastes it into a converter to retrieve the RGB values.
3. Evaluates if the white text on that background color passes WCAG accessibility.
4. Generates a CSS gradient or Tailwind snippet.
5. Saves it to a local history cache for future reference.
Our converter gathers all these tasks into a single screen, helping you convert and validate your colors without leaving your browser tab.

## 11. Browser Compatibility
All major browsers (Chrome, Safari, Firefox, Edge) have 100% native support for HEX, RGB, RGBA, HSL, and HSLA formats.
Furthermore, modern browsers support the CSS Color Module Level 4 standard, which permits space-separated parameters (e.g., \`rgb(81 130 49 / 0.8)\`) and programmatic color mixing. Our tool exports standard comma-separated formats to guarantee perfect backwards compatibility.

## 12. Design Systems
Large teams maintain consistency through design systems. Design tokens represent atomic values—like colors or spacing—abstracted as variables.
By defining tokens like \`--color-button-primary\` using RGB variables, design systems can automatically manage hovers, active states, and dark mode variations programmatically. This converter lets you download your colors as structured JSON files, making it easy to import new color variables directly into your design system configuration.
  `,

  features: [
    "Real-time instant HEX to RGB, RGBA, HSL, HSLA, and HSV conversion",
    "Support for 3-digit (#FFF), 6-digit (#FFFFFF), and 8-digit alpha (#FFFFFFFF) HEX formats",
    "Smart input handling that automatically strips leading hashes and handles partial codes",
    "Live color preview box that auto-adjusts foreground text color for maximum readability",
    "Interactive WCAG 2.1 Contrast Checker calculating exact ratios with AA/AAA pass/fail indicators",
    "Dynamic color palette suggestions including Complementary, Analogous, Triadic, and Monochromatic sets",
    "CSS Custom Properties (Variables) and Tailwind CSS arbitrary class generator",
    "Live linear gradient preview with angle sliders and copyable CSS gradient code",
    "LocalStorage persistent color history to quickly save, restore, or clear recent colors",
    "Export systems to copy the entire palette or download structured JSON files",
    "100% client-side execution, ensuring maximum privacy and data security"
  ],

  useCases: [
    "Converting mock design tokens (e.g. from Figma) into CSS-ready RGB/RGBA strings",
    "Verifying that primary brand colors meet WCAG accessibility standards for body text",
    "Creating translucent UI elements by converting HEX codes to RGBA with customized transparency",
    "Quickly generating matching color palettes (complementary or analogous) for new web sections",
    "Exporting color schemes as CSS variables to inject directly into stylesheet files",
    "Creating Tailwind arbitrary utility classes for quick inline color styling",
    "Restoring previous color conversions from history logs during layout design sessions",
    "Validating color code syntax errors by pasting questionable strings into the parser"
  ],

  howToSteps: [
    "Type or paste your HEX color code in the primary input field. The hash (#) is optional.",
    "For semi-transparent colors, paste an 8-digit HEX code (e.g. #FFFFFF80) or adjust the Alpha slider.",
    "Observe all color conversions (RGB, RGBA, HSL, HSLA, HSV) update instantly.",
    "Check the Accessibility section to verify contrast ratios against black and white text.",
    "Review the suggested color palettes (Analogous, Complementary, etc.) for design options.",
    "Adjust the angle slider in the Gradient Preview box to check the color in a gradient flow.",
    "Click the copy button next to any code format to copy it to your clipboard.",
    "Download your color values as a JSON file or copy the CSS variable declarations."
  ],

  examples: [
    {
      title: "6-Digit HEX to RGB Conversion",
      description: "Convert a standard solid hex code to RGB and HSL formats.",
      input: "#518231",
      output: "RGB: rgb(81, 130, 49) | HSL: hsl(96, 45%, 35%)"
    },
    {
      title: "8-Digit HEX to RGBA (Alpha)",
      description: "Convert a hex code with built-in transparency to RGBA format.",
      input: "#3B82F680",
      output: "RGBA: rgba(59, 130, 246, 0.5) | HSLA: hsla(217, 91%, 60%, 0.5)"
    }
  ],

  faq: [
    {
      question: "What is a HEX color code?",
      answer: "A HEX color code is a six-character hexadecimal representation of red, green, and blue light components. For example, #518231 represents the red channel as 51 (81 in decimal), green as 82 (130 in decimal), and blue as 31 (49 in decimal)."
    },
    {
      question: "How does HEX convert to RGB?",
      answer: "Conversion splits the hex string into three pairs of characters (red, green, blue). Each pair is converted from base-16 (hexadecimal) to base-10 (decimal). For example, hex 'FF' equals decimal 255, and '80' equals decimal 128."
    },
    {
      question: "Why use RGB instead of HEX in CSS?",
      answer: "RGB is often preferred when programmatically manipulating colors via JavaScript, or when you need to apply alpha opacity (using RGBA). It is also highly useful when defining CSS variable channels to generate dynamic opacity variants."
    },
    {
      question: "What is the difference between HEX and RGBA?",
      answer: "HEX represents red, green, and blue values. RGBA is the decimal format that includes a fourth value for Alpha (opacity), ranging from 0.0 (transparent) to 1.0 (opaque). Modern browsers also support 8-digit HEX codes (HEXA) which include alpha transparency."
    },
    {
      question: "Can a HEX color code include transparency (Alpha)?",
      answer: "Yes, by using an 8-digit HEX code. The first 6 characters represent the red, green, and blue channels, and the final 2 characters represent the alpha opacity channel. For example, #FFFFFF80 represents white at 50% opacity."
    },
    {
      question: "Which format (HEX or RGB) is better for web performance?",
      answer: "Browsers parse both formats at nearly identical speeds. The performance difference is microscopic. Developers choose between them based on code readability, workflow preferences, and design system architectures."
    },
    {
      question: "What is HSL, and how does it relate to HEX and RGB?",
      answer: "HSL stands for Hue (color wheel angle), Saturation (color purity), and Lightness. Unlike HEX and RGB which are based on hardware color emission, HSL is designed around human visual perception, making it easier to manually adjust color brightness and saturation."
    },
    {
      question: "How does the WCAG contrast ratio calculation work?",
      answer: "It measures the difference in relative luminance between two colors, calculated based on the sRGB color space. Ratios range from 1:1 (no contrast) to 21:1 (maximum contrast). WCAG AA requires 4.5:1 for normal text; AAA requires 7:1."
    },
    {
      question: "How can I use the converted colors in Tailwind CSS?",
      answer: "You can copy the generated arbitrary class snippets (e.g. bg-[#518231]) and paste them directly into your HTML or React JSX files. Alternatively, you can add the values to your tailwind.config.js theme settings."
    },
    {
      question: "Are my colors processed securely on your servers?",
      answer: "Yes, 100%. Our tool performs all color parsing, conversions, and computations locally in your web browser. No color data, palettes, or inputs are sent to our servers, ensuring your branding specs remain private and secure."
    }
  ],

  relatedTools: [
    { name: "RGB to HEX Converter", slug: "rgb-to-hex" },
    { name: "Advanced Color Picker", slug: "color-picker" },
    { name: "CSS Gradient Generator", slug: "gradient-generator" },
    { name: "WCAG Contrast Checker", slug: "contrast-checker" },
    { name: "Color Palette Generator", slug: "color-palette-generator" }
  ]
};
