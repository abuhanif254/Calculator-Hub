import { ToolConfig } from './types';

export const cssShadowGeneratorConfig: ToolConfig = {
  slug: "css-shadow-generator",
  title: "CSS Shadow Generator",
  shortDescription: "Visually generate, customize, and layer box shadows, text shadows, and neumorphism effects. Preview custom designs in a UI sandbox, copy styles instantly, and export Tailwind configs.",
  category: "Color Tools",
  keywords: [
    "css box shadow generator", "text shadow generator", "layered shadows css",
    "neumorphism shadow maker", "glassmorphism box shadow", "soft shadows web design",
    "tailwind shadow generator", "custom box shadow configs", "design system elevation",
    "frontend styling tool", "ui ux shadow presets", "box shadow copy paste"
  ],

  longDescription: `
In user interface (UI) and user experience (UX) design, depth and elevation are crucial tools for guiding a user's attention. Shadows simulate the physical properties of light, creating a three-dimensional hierarchy on a flat, two-dimensional screen. A card with a soft shadow appears closer to the user, suggesting interactivity, while a flat element recedes into the background.

Our **CSS Shadow Generator** is a professional-grade, browser-based design workstation built for front-end developers, UI/UX designers, and digital product creators. Whether you need to build a soft, multi-layered Material-style card shadow, design a neumorphic button, create neon glowing text effects, or export custom Tailwind config variables, this tool provides a unified, zero-install workspace that operates 100% client-side.

---

## 1. What Are CSS Shadows?
In web styling, shadows are natively drawn by the browser's graphics rendering engine. Instead of using static image files which increase network load and do not scale dynamically, CSS allows developers to apply shadows directly to HTML elements. There are two primary CSS properties for creating shadows:
*   **\`box-shadow\`**: Applies shadows to the outer or inner borders of an element (such as cards, buttons, or dialog boxes).
*   **\`text-shadow\`**: Renders shadows directly behind text characters, useful for glowing headers, 3D text effects, or enhancing readability over busy backgrounds.

---

## 2. Anatomy of the CSS Box-Shadow
The CSS \`box-shadow\` property accepts up to six parameters:
\`\`\`css
box-shadow: [horizontal-offset] [vertical-offset] [blur-radius] [spread-radius] [color] [inset];
\`\`\`

Let's dissect each property in detail:
1.  **Horizontal Offset (X-Axis):** Determines how far the shadow shifts to the right (positive values) or left (negative values). A positive value implies a light source positioned on the left side of the element.
2.  **Vertical Offset (Y-Axis):** Determines how far the shadow shifts downwards (positive values) or upwards (negative values). Positive values imply a light source positioned above the element.
3.  **Blur Radius:** Controls the sharpness of the shadow. A value of \`0\` makes the shadow's edge sharp and solid. Higher values make the shadow softer, more diffused, and semi-transparent.
4.  **Spread Radius:** Expands or contracts the shadow's overall size. A positive spread makes the shadow larger than the element itself, while a negative spread shrinks it.
5.  **Color & Transparency:** Usually defined in Hex, RGB, or HSL. Using alpha transparency (e.g. RGBA) is critical. Solid black shadows look harsh and artificial; soft shadows should use low-opacity black (e.g., \`rgba(0, 0, 0, 0.08)\`) to blend naturally with the page background.
6.  **Inset (Optional):** Shifting the shadow from the outside to the inside of the element's border. This turns the element into a hollowed-out shape or pressed container, which is key for form inputs and active button states.

---

## 3. Layered Shadows: The Secret to Smooth, Soft Shadows
One of the most common mistakes in web design is using a single, heavy box shadow with a large blur radius. In nature, light is diffused and reflected by surroundings, creating a series of overlapping shadows with different levels of hardness.

To mimic this in CSS, you can **layer multiple box-shadows** by separating them with commas:
\`\`\`css
box-shadow: 
  0 1px 2px rgba(0,0,0,0.05), 
  0 4px 8px rgba(0,0,0,0.05), 
  0 12px 24px rgba(0,0,0,0.05);
\`\`\`
By layering three or four low-opacity shadows with increasing offsets and blur values, you achieve a smooth, premium, "ambient" shadow effect that looks organic and high-fidelity. Our tool supports **unlimited layered shadows**, allowing you to add, edit, reorder, duplicate, and toggle individual layers with real-time updates.

---

## 4. Text-Shadows: Creative Typography & Glows
Unlike \`box-shadow\`, the \`text-shadow\` property does not support a spread radius or the \`inset\` keyword. Its syntax is:
\`\`\`css
text-shadow: [horizontal-offset] [vertical-offset] [blur-radius] [color];
\`\`\`

Text shadows are highly effective for specific design styles:
*   **Glow & Neon Effects:** Using a zero offset (\`0 0 [blur] [color]\`) with a vibrant primary color (like cyan or neon pink) creates a luminous aura around headings. You can layer multiple glow shadows to make the neon effect intensely bright.
*   **3D Text Effects:** By layering multiple text-shadows with small increments in offsets (e.g. \`1px 1px\`, \`2px 2px\`, \`3px 3px\`) using solid colors, you can simulate 3D block lettering.
*   **Contrast Enhancement:** A subtle, low-blur dark text shadow (e.g., \`0 1px 2px rgba(0,0,0,0.3)\`) helps white headings stand out clearly when placed on top of photographic backgrounds.

---

## 5. Neumorphism: The Skeuomorphic Flat Design
**Neumorphism** (or soft UI) is a visual trend that simulates physical plastic shapes extruding from or pressed into the page background. Instead of floating on top of the canvas, neumorphic elements appear to be formed out of the background material itself.

### The Physics of Neumorphism
Neumorphic shapes are created using **two opposite shadows** representing light and shadow:
1.  **A Highlight Shadow:** A white or light-tinted shadow offset towards the light source (usually top-left, e.g., \`-8px -8px 16px rgba(255, 255, 255, 0.85)\`).
2.  **A Shadow Cast:** A dark-tinted shadow offset away from the light source (usually bottom-right, e.g., \`8px 8px 16px rgba(0, 0, 0, 0.08)\`).

For neumorphism to work, **the element color must match the background color exactly**. Our neumorphism generator automatically computes the highlight and shadow values based on the background color you input, allowing you to choose between flat, concave, convex, or pressed shapes.

---

## 6. Glassmorphism: The Translucent Acrylic Look
**Glassmorphism** is a design trend characterized by a translucent, frosted glass aesthetic. It creates depth by layering transparent panels on top of colorful, blurred background gradients.

Glassmorphic panels rely on a specific combination of styles:
*   **Translucent Backdrop:** A semi-transparent background color (usually white with 10% to 30% opacity, e.g., \`rgba(255, 255, 255, 0.15)\`).
*   **Backdrop Filter Blur:** Frosted glass effect created using CSS \`backdrop-filter: blur(10px)\`.
*   **Thin Borders:** A semi-transparent white border that simulates the reflective edge of glass.
*   **Soft Box Shadow:** A very diffused, low-opacity dark shadow that helps lift the glass panel off the colorful background graphics, preventing it from getting lost.

---

## 7. Tailwind CSS Custom Shadows
Tailwind CSS includes pre-configured utility classes for shadows, such as \`shadow-sm\`, \`shadow\`, \`shadow-md\`, \`shadow-lg\`, \`shadow-xl\`, and \`shadow-inner\`. These are excellent for standard layouts.

However, when you need custom brand elevations, you must extend the Tailwind theme:
\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'brand-soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.03)',
        'neon': '0 0 15px rgba(236, 72, 153, 0.7)',
      }
    }
  }
}
\`\`\`
Our tool compiles both standard Tailwind classes (when applicable) and custom theme extensions, making it simple to drop visual styles straight into your Tailwind projects.

---

## 8. Accessibility and Performance in Shadow Design

### Shadow Accessibility (WCAG Guidelines)
While shadows are excellent aesthetic assets, they must be used responsibly:
*   **Interactivity Clues:** Shadows should help clarify which elements are clickable (buttons, cards) versus static panels. Removing shadows or flattening them on hover provides a tactile cue that an element is being pressed.
*   **Contrast Compliancy:** Do not rely *solely* on a box-shadow to outline inputs or buttons. Screen reader users and users with low vision require clear, high-contrast borders or text labels to navigate forms.

### Performance Considerations
CSS shadows are calculated dynamically on the GPU. Large blur radii, complex layered shadow stacks, and inset shadows can cause layout recalculation bottlenecks, slowing down scrolling performance on low-end mobile devices.
*   **Optimization tip:** Limit layered shadows to 3-4 steps. Avoid applying heavy, animating shadows to many elements on the same page. If a shadow must animate on hover, animate the \`opacity\` of a pseudo-element containing the shadow instead of transitioning the \`box-shadow\` property directly. This enables the browser to perform hardware-accelerated compositing.
  `,

  features: [
    "Box shadow editor supporting horizontal/vertical offsets, blur, spread, colors, and opacity",
    "Text shadow editor generating block lettering, 3D text, and neon glow effects",
    "Multi-layer shadow stacking with unlimited layers, duplication, toggling, and reordering",
    "Neumorphic design system calculator adjusting highlights and shadow cast coordinates based on light angle",
    "Glassmorphic shadow templates with backdrop-filter blur and white border reflection previews",
    "Live component preview board: buttons, alert modals, input fields, navigation, dropdown popovers, and dashboard cards",
    "WCAG contrast preview analyzing text legibility on shadowed containers",
    "Theme preset library featuring Material Design, Soft SaaS, Cyberpunk, and Neumorphic cards",
    "Copy-pasteable code outputs for CSS, SCSS variables, CSS custom properties, and JSON tokens",
    "Tailwind CSS configurator extending custom theme tokens in tailwind.config.js (v3/v4)",
    "Color picker interface supporting HEX, RGB, HSL, and Alpha opacity with EyeDropper support",
    "LocalStorage tracker logging recent shadow designs and bookmarks"
  ],

  useCases: [
    "Designing soft, floating card modules for a modern SaaS product dashboard",
    "Creating glowing neon text headers for gaming or cyberpunk websites",
    "Simulating pressed button behaviors in interactive form fields using inner (inset) shadows",
    "Building neumorphic soft-plastic layouts with balanced dark-to-light highlights",
    "Exporting custom elevations into Tailwind theme configurations",
    "Prototyping responsive navigation dropdowns with layered elevation shadows",
    "Debugging scroll bottlenecks by testing shadow performance across different viewport sizes",
    "Saving custom elevation tokens inside LocalStorage to preserve consistent styling across design sessions"
  ],

  howToSteps: [
    "Choose your editor mode (Box Shadow, Text Shadow, or Neumorphism) from the top selector.",
    "Click 'Add Layer' to create a new shadow layer, or select an existing layer to customize its values.",
    "Adjust horizontal/vertical offsets, blur radius, spread, opacity, and color using the control sliders.",
    "Toggle 'Inset' to shift the shadow inside the container border for input fields or pressed states.",
    "Test your shadow on different mock UI components (Buttons, Dropdowns, Cards, Modals) using the preview tabs.",
    "Enable Dark Preview mode to inspect shadow legibility against deep background colors.",
    "Explore the presets panel to apply classic elevations like 'Soft SaaS' or 'Material Card' instantly.",
    "Copy the CSS code snippet or export the Tailwind theme configuration into your project."
  ],

  examples: [
    {
      title: "Soft Ambient SaaS Card Shadow",
      description: "A three-layered shadow providing clean elevation without harsh black outlines.",
      input: "Layer 1: 0px 1px 2px (opacity 0.05), Layer 2: 0px 4px 8px (opacity 0.04), Layer 3: 0px 12px 24px (opacity 0.03)",
      output: "box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 12px 24px rgba(0, 0, 0, 0.03);"
    },
    {
      title: "Neumorphic Extruded Flat Button",
      description: "A dual-direction shadow blending highlight and cast values for soft-plastic aesthetics.",
      input: "Background: #e0e0e0, Distance: 8px, Blur: 16px, Direction: Top-Left",
      output: "box-shadow: -8px -8px 16px #ffffff, 8px 8px 16px #bebebe; background: #e0e0e0;"
    }
  ],

  faq: [
    {
      question: "What is the difference between box-shadow and text-shadow?",
      answer: "Box-shadow draws shadows along the outer or inner borders of rectangular/rounded container elements (cards, buttons). Text-shadow renders shadows directly behind text characters. Text-shadow does not support spread radius or the inset keyword."
    },
    {
      question: "How do I create soft, realistic CSS shadows?",
      answer: "Instead of using one heavy, dark shadow, layer 3 or 4 shadows with increasing blur/offsets and low opacity (5% or less). This simulates how light diffuses in natural environments, creating a soft transition."
    },
    {
      question: "What does the 'spread-radius' parameter do?",
      answer: "Spread radius expands or shrinks the size of the shadow. Positive values make the shadow larger than the parent element, while negative values shrink it. It is useful for creating tight, floating shadows beneath elements."
    },
    {
      question: "What is an inset shadow?",
      answer: "An inset shadow shifts the shadow from the outside to the inside of the element's border. This makes the element look hollow, sunken, or pressed, which is commonly used for input text fields and active button states."
    },
    {
      question: "How do I write custom shadows in my Tailwind config?",
      answer: "You can extend Tailwind's default tokens inside your tailwind.config.js file by adding custom key-value pairs inside the theme.extend.boxShadow object. The generator compiles this snippet for you automatically."
    },
    {
      question: "What is neumorphism (soft UI)?",
      answer: "Neumorphism is a design trend where elements match the page background color exactly and use two complementary shadows: a light highlight (facing the light source) and a dark cast (facing away) to appear extruded from the background."
    },
    {
      question: "Are CSS shadows bad for web page performance?",
      answer: "CSS shadows are rendered dynamically by the GPU. Large blur radii, heavy layered stacks, and animations transitioning the box-shadow property can cause lag, especially on mobile devices. Optimizing layers to 3-4 steps is recommended."
    },
    {
      question: "How does glassmorphism styling work?",
      answer: "Glassmorphism creates a frosted-glass look using a semi-transparent white backdrop (rgba(255,255,255,0.1)), a CSS backdrop-filter blur, a thin translucent border, and a soft outer shadow to separate the glass panel from background graphics."
    },
    {
      question: "Can I copy the SCSS variables for my project?",
      answer: "Yes. The generator provides export tabs that compile your custom shadows into SCSS variables, CSS Custom Properties, and JSON tokens."
    },
    {
      question: "Is this shadow generator compatible with dark mode themes?",
      answer: "Yes. Toggling the dark mode simulator shifts preview backgrounds and adjusts shadow tones so you can audit how elevations behave in both light and dark environments."
    }
  ],

  relatedTools: [
    { name: "Gradient Generator", slug: "gradient-generator" },
    { name: "Tailwind Color Palette", slug: "tailwind-color-palette" },
    { name: "Color Picker", slug: "color-picker" },
    { name: "RGB to HEX", slug: "rgb-to-hex" },
    { name: "HEX to RGB", slug: "hex-to-rgb" },
    { name: "Contrast Checker", slug: "contrast-checker" }
  ]
};
