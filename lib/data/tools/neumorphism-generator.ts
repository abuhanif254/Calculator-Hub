import { ToolConfig } from './types';

export const neumorphismGeneratorConfig: ToolConfig = {
  slug: "neumorphism-generator",
  title: "Neumorphism Generator",
  shortDescription: "Visually generate, inspect, and copy code snippets for soft, extruded neumorphic UI elements with real-time skeuomorphic component testing.",
  category: "Color Tools",
  keywords: [
    "neumorphism css generator", "soft ui css generator", "neumorphic box shadow css",
    "tailwind neumorphism css", "skeuomorphic design generator", "pressed glass shadow",
    "extruded plastic ui css", "soft shadow button maker", "inset box shadow config",
    "minimal soft dashboard design", "neumorphism accessibility guidelines", "flat soft ui design"
  ],

  longDescription: `
Neumorphism—often referred to as **Soft UI** or soft plastic design—is an influential aesthetic trend in modern user interface (UI) and user experience (UX) design. Derived from skeuomorphism, which simulated real-world objects like physical knobs and textured sliders, Neumorphism blends realistic depth shadows with flat, minimalist colors. The visual result is a collection of components (like buttons, toggle cards, sliders, and form fields) that appear to be formed out of the page background itself, either extruded (raised) from the canvas or hollowed (pressed/inset) into it.

Our **Neumorphism Generator** is a professional visual editor designed for front-end developers, product managers, designers, and Tailwind CSS creators. It calculates highlight and shadow color codes, handles light directions, adjusts distance and blur coordinates, and outputs clean CSS, SCSS, JSON, and Tailwind config styles for dark and light layouts.

---

## 1. What is Neumorphism?
Unlike traditional web design where cards appear to "float" above the page using a dark drop-shadow, neumorphic components are connected to the page backing. The element matches the canvas background color exactly, and depth is achieved entirely by using two opposite shadows representing a single light source:
*   **The Highlight Shadow:** A light or white shadow offset towards the light source, representing reflected ambient light.
*   **The Shadow Cast:** A dark shadow offset away from the light source, representing the shadow cast by the extruded component.

By positioning these two shadows symmetrically, the browser's graphics rendering engine tricks the human eye into perceiving three-dimensional elevation.

---

## 2. Mathematical Shading Formula
To create the neumorphic illusion, the background color must be solid, and you must compute the highlight and shadow colors relative to this base. Here is the standard math for a light-source coordinates calculation:

### Light source coordinates
For a light source coming from the top-left, the shadows are:
*   **Light Shadow Offset:** Negative X, Negative Y (e.g. \`-8px -8px\`).
*   **Dark Shadow Offset:** Positive X, Positive Y (e.g. \`8px 8px\`).

### Shading lightness calculations
Using HSL color scales is the most effective way to scale highlights:
1.  **Light Shadow:** HSL base with Lightness increased by 10% to 15% (e.g., base lightness 88% becomes 98% to 100%).
2.  **Dark Shadow:** HSL base with Lightness decreased by 10% to 15% (e.g., base lightness 88% becomes 76% to 78%).

### Standard CSS Syntax
\`\`\`css
.neumorphic-flat {
  background: #e0e0e0;
  box-shadow: 
    8px 8px 16px #bebebe, 
    -8px -8px 16px #ffffff;
}

.neumorphic-pressed {
  background: #e0e0e0;
  box-shadow: 
    inset 8px 8px 16px #bebebe, 
    inset -8px -8px 16px #ffffff;
}
\`\`\`

---

## 3. Raised vs. Pressed Modes
One of Neumorphism's key capabilities is visual feedback when users interact with elements.
*   **Raised (Flat Extruded):** Standard state for clickable cards or buttons. Represents an elevated panel.
*   **Pressed (Inset Shadow):** Active state triggered on button click or input focus. The shadow values transition to \`inset\`, making the element appear sunken or hollowed into the canvas.
*   **Concave Gradients:** The element has a linear gradient running from light to dark, making the shape look curved and hollowed.
*   **Convex Gradients:** The element has a linear gradient running from dark to light, making the shape look curved and bulging outwards.

---

## 4. Neumorphism vs. Glassmorphism
While both trends arose in the same era, their styling rules are opposites:
*   **Neumorphism:** Relies on matching base colors exactly, opaque fills, soft dual-shadow pairs, and skeuomorphic plastic structures. It is clean and minimal, but can look flat without color variations.
*   **Glassmorphism:** Relies on translucent layers (usually white at 15% opacity), heavy backdrop-filter blur, high-contrast white borders, and colorful backgrounds. It works over any vibrant background, whereas Neumorphism only works on solid backgrounds.

---

## 5. Tailwind CSS Neumorphism Customization
Tailwind doesn't support dual opposite shadows out-of-the-box (like shadow-sm, shadow-md, etc.). To use them, you must output arbitrary brackets or extend your theme config:
\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'soft-raised': '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
        'soft-pressed': 'inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff',
      }
    }
  }
}
\`\`\`
Our generator builds Tailwind configs, CSS, and copyable utility-first class lists automatically based on the color and size attributes you customize.

---

## 6. Accessibility & Performance Considerations

### Accessibility Challenges (WCAG compliance)
Because Neumorphic components use the exact same color as the background, contrast borders are absent. This poses a major barrier for users with low vision or color-blindness who need clear visual cues to identify buttons and form fields.
*   **Contrast Audit:** The relative contrast ratio between the component body and background in Neumorphism is \`1:1\`. This fails WCAG standard body requirements.
*   **Readability tips:**
    *   Do not rely solely on the shadow to indicate input bounds. Include clear placeholder labels or thin borders.
    *   Add high-contrast accents, such as colored indicator lights (e.g. blue or green dot) on toggles, active button outlines, and bold icons.
    *   Implement high-contrast focus indicators using \`outline: 2px solid #518231\` or custom focus-visible borders.

### Performance Rendering
CSS box-shadow draws two multi-pass Gaussian blur layers. Since these calculations are rendered dynamically on the GPU, animating box-shadow depth during page scroll or layout resizing can degrade performance.
*   **Optimization tip:** Keep blur radius below \`40px\` for interactive items. For buttons, limit transitions to simple raised-to-pressed states using hardware-accelerated transforms rather than dynamically modifying shadow sizes on active loops.
  `,

  features: [
    "Draggable light source direction controller adjusting cardinal lighting angles from top-left to bottom-right",
    "Sliders for element depth, shadow distance, blur radius, border radius, background color tint, and shadow opacity",
    "Supported styles: Flat Soft UI, Concave (bulging hollow), Convex (bulging bubble), and Pressed Inset layout",
    "Component preview system showing active click feedback for buttons, inputs, slider bars, toggle sliders, and music console components",
    "Skeuomorphic mini widgets: calculator key pads and animated audio player UI cards",
    "Accessibility helper explaining WCAG constraints and checking contrast ratios",
    "One-click exporters compiling box-shadow CSS rule, inset variables, SCSS variables, JSON configs, and Tailwind CSS code",
    "Tailwind configuration extend block snippets for v3/v4 config files",
    "Color picker interface supporting HSL, RGB, HEX, and alpha values, with EyeDropper sampler API integration",
    "Bookmarking tool saving favorite soft templates to local storage logs"
  ],

  useCases: [
    "Designing tactile buttons and custom toggle controls for a futuristic IoT smart home app console",
    "Creating minimal, plastic-looking card layouts for a personal finance dashboard homepage",
    "Styling inset input text fields to denote active focused form inputs in soft visual themes",
    "Exporting custom design tokens into Tailwind config modules to ensure branding layout consistency",
    "Testing accessibility compliance for low-vision users and implementing subtle high-contrast borders",
    "Saving custom soft layouts in LocalStorage to review designs during frontend pairing reviews"
  ],

  howToSteps: [
    "Set the primary background color using the HEX input or RGB sliders. The preview canvas will sync to match this base color.",
    "Select your soft shape mode from the options: Flat, Concave, Convex, or Pressed (inset).",
    "Use the Light Source Direction selector to angle the light coordinates (e.g., Top-Left).",
    "Adjust Shadow Distance to scale the component's elevation, and Blur to soften the shadow boundaries.",
    "Tune the Shadow Intensity to make light/dark shadows blend seamlessly into the background color.",
    "Test hover and active states on real components like the Interactive Button or Toggle slider.",
    "Review contrast warnings and add indicators (like bold icons or dot accents) to satisfy readability rules.",
    "Copy the CSS code, copy Tailwind classes, or download the styled card SVG asset directly."
  ],

  examples: [
    {
      title: "Extruded Soft Card",
      description: "A standard neumorphic card raised from a soft gray background.",
      input: "Base Color: #e0e0e0, Distance: 9px, Blur: 18px, Light Source: Top-Left",
      output: "background: #e0e0e0; box-shadow: 9px 9px 18px #bebebe, -9px -9px 18px #ffffff;"
    },
    {
      title: "Pressed Form Input",
      description: "An inset soft UI text container ideal for form fields.",
      input: "Base Color: #f0f4f8, Distance: 4px, Blur: 8px, Style: Pressed (Inset)",
      output: "background: #f0f4f8; box-shadow: inset 4px 4px 8px #cbd5e1, inset -4px -4px 8px #ffffff;"
    }
  ],

  faq: [
    {
      question: "What is neumorphism (soft UI)?",
      answer: "Neumorphism is a web design style characterized by clean, flat color panels that appear extruded or hollowed out of the page background. It uses opposite highlight and shadow pairs to simulate light casting."
    },
    {
      question: "How does neumorphism generate shadows?",
      answer: "Neumorphism requires the element color and background color to be exactly the same. It uses a light-colored shadow offset towards the light source, and a dark-colored shadow offset away from the light source."
    },
    {
      question: "Why is the canvas background locked to the element color?",
      answer: "For neumorphism to work, the element must look like it is extruded from the background material. If the colors do not match, the extruded plastic illusion is broken. You can unlock it for custom designs if needed."
    },
    {
      question: "Is neumorphism accessible under WCAG guidelines?",
      answer: "Neumorphism is generally low contrast because elements match their background colors, which can make it hard for low-vision users to find inputs or buttons. It is recommended to add icons, high-contrast focus rings, or thin borders."
    },
    {
      question: "What is the difference between concave and convex styles?",
      answer: "Flat shapes use a solid background color. Concave shapes apply a gradient running from light to dark to look curved inwards (hollow). Convex shapes use a gradient from dark to light to look curved outwards (bulging)."
    },
    {
      question: "How do I implement neumorphic shadows in Tailwind?",
      answer: "Since Tailwind doesn't have standard utilities for double opposite shadows, you must write them using arbitrary brackets, e.g. `shadow-[9px_9px_18px_#bebebe,-9px_-9px_18px_#ffffff]`, or extend the custom shadow theme config."
    },
    {
      question: "What is an inset shadow?",
      answer: "An inset shadow shifts the shadow from the outside to the inside of the container's border. In soft UI, this makes elements look pressed, sunken, or hollowed out, which is perfect for active states or text inputs."
    },
    {
      question: "Can I use Neumorphism with dark mode themes?",
      answer: "Yes. The generator handles dark colors like charcoal (#1e293b) or midnight slate, computing matching highlights and dark shadow values to create a dark soft UI aesthetic."
    },
    {
      question: "Does the blur radius affect web performance?",
      answer: "CSS box-shadow is calculated dynamically by the GPU. Large blurs (>40px) or animating multiple shadows during scrolling can degrade scroll performance. Keeping layers simple is recommended."
    },
    {
      question: "How do I download my custom soft UI components?",
      answer: "You can download your customized card as a vector SVG file or export a high-res PNG swatch directly from the exporter panel."
    }
  ],

  relatedTools: [
    { name: "Glassmorphism Generator", slug: "glassmorphism-generator" },
    { name: "CSS Shadow Generator", slug: "css-shadow-generator" },
    { name: "Gradient Generator", slug: "gradient-generator" },
    { name: "Color Picker", slug: "color-picker" },
    { name: "RGB to HEX", slug: "rgb-to-hex" },
    { name: "HEX to RGB", slug: "hex-to-rgb" }
  ]
};
