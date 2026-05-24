import { ToolConfig } from './types';

export const glassmorphismGeneratorConfig: ToolConfig = {
  slug: "glassmorphism-generator",
  title: "Glassmorphism Generator",
  shortDescription: "Visually design, refine, and generate CSS and Tailwind snippets for stunning translucent, frosted-glass UI elements with interactive component previews.",
  category: "Color Tools",
  keywords: [
    "glassmorphism css generator", "frosted glass css generator", "backdrop filter blur css",
    "tailwind glassmorphism css", "translucent card styling", "fluent design glass css",
    "macos style glass panels", "neon glassmorphism generator", "ambient glow glass",
    "modern saas dashboard design", "glassmorphism accessibility checker", "frosted glass html maker"
  ],

  longDescription: `
Glassmorphism is one of the most prominent styling paradigms in modern digital user interface (UI) and user experience (UX) design. Embodying a translucent, "frosted glass" aesthetic, it establishes spatial depth and vertical separation by layering semi-transparent panels on top of vivid backgrounds, colored blobs, or ambient motion gradients. The visual metaphor creates a clean, premium, and futuristic atmosphere that has been widely adopted by industry leaders, most notably in Apple's macOS (Big Sur onwards), iOS, and Microsoft’s Windows Fluent Design system (under the "Acrylic" and "Mica" branding).

Our **Glassmorphism Generator** is a comprehensive visual design workspace built for front-end developers, product engineers, web designers, and Tailwind CSS practitioners. Instead of manually guessing pixel values, alpha weights, backdrop filters, and border colors, this utility provides real-time dials and responsive mockups. This allows you to prototype elements instantly and export production-ready code with complete cross-browser safety.

---

## 1. What is Glassmorphism?
At its core, Glassmorphism is a styling technique that makes container elements resemble polished, frosted sheets of glass suspended over a background canvas. Unlike traditional flat cards or simple solid drop-shadow cards, glass panels are dynamic. They inherit the color palette and textures of whatever sits directly beneath them, creating an organic integration between page elements and backgrounds.

This aesthetic paradigm relies on four fundamental design pillars:
1.  **Translucency (Semi-transparent background):** Multi-layered fills (typically white or light gray for light mode, dark gray or black for dark mode) configured with low alpha opacity (between \`0.05\` and \`0.30\`).
2.  **Backdrop Blur:** A CSS filter applied to the area *behind* the element, softening and blending the background colors underneath.
3.  **High-Contrast Refractive Borders:** A thin, high-opacity, semi-transparent border that mimics the refractive, illuminated outer edge of a glass pane.
4.  **Ambient Dropshadows:** Soft, highly diffused shadows that cast light onto background assets, visually elevating the glass panel and anchoring it in three-dimensional space.

---

## 2. The CSS Backdrop-Filter Property
In the early days of web design, creating glass effects required static, pre-rendered blurred background images or heavy JavaScript canvas blur libraries. This increased bandwidth consumption and slowed down layout recalculation loops. The introduction of the CSS \`backdrop-filter\` property revolutionized web styling.

Unlike standard \`filter\`, which applies visual modifications (like blur or grayscale) to the element itself and its children, \`backdrop-filter\` applies these operations exclusively to the **graphical pixels directly behind the element's bounding box**.

### Standard CSS Syntax
\`\`\`css
.glass-container {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%); /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
}
\`\`\`

### Key Backdrop Filter Properties:
*   **\`blur()\`**: Determines the softness of the background diffusion. Values between \`8px\` and \`20px\` generally provide the most realistic glass effect.
*   **\`saturate()\`**: Amplifies or dampens the colors showing through the frosted glass. Boosting saturation (e.g., \`150%\` to \`200%\`) ensures that the glass remains colorful and doesn't look gray or muddy.
*   **\`brightness()\`**: Slightly dims or illuminates the underlying colors, making it easier to read text overlays on highly dynamic background images.
*   **\`contrast()\`**: Modifies the luminance scale of the background layer, helping to sharpen visual details in complex mesh patterns.

---

## 3. Designing for Light Mode vs. Dark Mode
A robust design system must translate glass aesthetics seamlessly across color schemas.
*   **Light Mode Glass:** Requires a white tint base (e.g. \`rgba(255, 255, 255, 0.2)\`) with a light, semi-transparent white border. This creates a frosted pane that catches ambient reflections.
*   **Dark Mode Glass:** Uses a dark charcoal or deep blue tint base (e.g. \`rgba(15, 23, 42, 0.45)\`) with a dark, subtle border (e.g. \`rgba(255, 255, 255, 0.08)\`). This simulates smoke-tinted glass or obsidian material, popular in cyberpunk and dashboard interfaces.

Our generator lets you toggle dark preview modes, inspect contrast scores, and configure tint variables to ensure brand readability across any background context.

---

## 4. Glassmorphism in Modern UI Frameworks
Major design languages utilize glass structures to convey hierarchy:
*   **Apple macOS (Big Sur/Monterey/Sonoma):** Leverages heavy backdrop blurs in window sidebars, toolbars, and system menus. It creates a tactile sense of layering, letting desktop wallpaper colors bleed into app borders.
*   **Windows Fluent Design System:** Features "Acrylic Material" for transient elements (context menus, tooltips, flyers) and "Mica" (a performance-optimized material that samples the desktop background color once) for long-lived app window backings.
*   **iOS UI System:** Extensively incorporates translucent overlays, notification bubbles, control sliders, and lock screen widgets. It ensures text readability by combining blur with high-contrast text rendering.
*   **SaaS Dashboard Trends:** Modern web panels use frosted navigation cards, floating control knobs, and glass charts to reduce visual noise while maintaining an open, spacious layout.

---

## 5. Tailwind CSS Glassmorphism Integration
Tailwind CSS provides native support for backdrop filters. Standard styling for a frosted glass card in Tailwind utilizes classes like:
\`\`\`html
<div class="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
  <!-- Content -->
</div>
\`\`\`
Tailwind’s slash-opacity utilities (\`bg-white/10\`, \`border-white/20\`) make adjusting transparency incredibly easy. For custom filters, you can extend the config:
\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        'xs': '2px',
        '3xl': '40px',
      }
    }
  }
}
\`\`\`
The Glassmorphism Generator automatically generates complete Tailwind class lists, custom CSS custom properties, and v3/v4 config files, saving you time when setting up utility projects.

---

## 6. Accessibility & Performance Considerations

### Accessibility Guidelines (WCAG Compliancy)
Frosted glass can easily fail contrast requirements if background graphics contain high-frequency details (e.g., text directly overlapping complex image details).
*   **Readability overlays:** Always place text on a container with sufficient opacity or boost the backdrop saturation/brightness to separate typography from the background.
*   **Contrast Checker:** The generator contains a real-time WCAG calculator that monitors estimated text contrast. If contrast drops below the \`4.5:1\` standard (for normal text) or \`3:1\` (for large headings), the tool alerts you with warning flags.
*   **Focus outlines:** Interactive elements inside glass components (such as buttons or form fields) must still feature solid, high-visibility keyboard focus rings.

### Rendering Performance
Backdrop-blur is a highly demanding pixel-shader operation. For every frame, the GPU must copy the backbuffer, apply a multi-pass Gaussian blur filter, and composite it with the foreground glass elements.
*   **Optimization tips:**
    *   Limit the size and number of overlapping glass elements.
    *   Avoid animating the \`backdrop-filter\` property directly during page scroll (which triggers recalculation loops).
    *   Use static frosted containers on low-powered mobile devices or disable backdrop filters using a media query checking media capability:
    \`\`\`css
    @media (prefers-reduced-motion: reduce) or (max-width: 768px) {
      .glass-container {
        backdrop-filter: none;
        background: rgba(255, 255, 255, 0.95); /* Fallback to solid */
      }
    }
    \`\`\`
  `,

  features: [
    "Interactive sliders for background transparency, blur strength, saturation, and contrast",
    "Tint controls supporting custom hex colors, RGB sliders, and HSL settings with alpha transparency",
    "Borders customizer adjusting edge thickness, edge opacity, and double-layered refract highlights",
    "Outer and inner shadow parameters simulating natural light source depth and neon glow effects",
    "Professional presets including macOS menu, Fluent UI Acrylic, iOS widget, and Cyberpunk glass",
    "Visual background canvas switcher with mesh gradients, dynamic animated blobs, grids, and noise textures",
    "Component preview system displaying layouts for pricing tables, login fields, navbar menus, chat windows, and stats cards",
    "WCAG contrast checker giving real-time readability feedback and font scaling advice",
    "Downloadable assets supporting SVG vector formats and high-quality PNG canvas renders",
    "Instant exporters compiling standard CSS rules, SCSS variables, Tailwind utility classes, and v3/v4 configuration code",
    "EyeDropper API color sampler integration for desktop browsers",
    "Design history logger storing bookmarks and recent configurations in local storage"
  ],

  useCases: [
    "Building premium, floating navigation bars that blend beautifully over video backgrounds",
    "Designing sleek glass cards for modern software-as-a-service (SaaS) homepage sections",
    "Styling context menus, dropdown widgets, and tooltips in desktop-grade web applications",
    "Creating dark smoke-tinted glass panels for futuristic cyberpunk gaming dashboards",
    "Optimizing responsive mobile card elements with high-performance CSS fallbacks",
    "Auditing text readability on frosted containers before pushing design tokens to production",
    "Exporting modular Tailwind styles to quickly scale design systems across landing pages",
    "Preserving an editor workspace history to review design iterations across team reviews"
  ],

  howToSteps: [
    "Select a pre-designed template from the Presets panel (e.g., iOS Glass Card) to establish a base style.",
    "Adjust background color tint and alpha transparency to control the primary glass shading.",
    "Use the Backdrop Blur slider to determine how heavily the background elements are diffused.",
    "Fine-tune Saturation, Brightness, and Contrast to make colors bleed through the glass vividly.",
    "Customize the border thickness and color opacity to simulate reflective glass edge refraction.",
    "Configure outer shadow offset, blur, and color opacity to lift the glass card off the canvas.",
    "Choose a preview layout (e.g., Navbar, Form, Chat UI) to inspect how the style adapts to actual components.",
    "Review the WCAG accessibility checker to ensure contrast and readability standards are met.",
    "Copy the CSS snippet, copy the Tailwind classes, or download the card as an SVG/PNG asset."
  ],

  examples: [
    {
      title: "macOS Frost Sidebar",
      description: "A clean, highly blurred white panel designed for application sidebar navigations.",
      input: "Color: #ffffff (10%), Blur: 24px, Saturation: 150%, Border: 1px solid rgba(255,255,255,0.15)",
      output: "background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(24px) saturate(150%); border: 1px solid rgba(255, 255, 255, 0.15);"
    },
    {
      title: "Cyberpunk Smoke Console",
      description: "A dark smoke-tinted panel with a subtle neon outline shadow, optimized for gaming consoles.",
      input: "Color: #09090b (60%), Blur: 16px, Border: 1.5px solid rgba(236,72,153,0.3), Shadow Glow: #ec4899 (25% opacity)",
      output: "background: rgba(9, 9, 11, 0.6); backdrop-filter: blur(16px); border: 1.5px solid rgba(236, 72, 153, 0.3); box-shadow: 0 0 15px rgba(236, 72, 153, 0.25);"
    }
  ],

  faq: [
    {
      question: "What is glassmorphism in UI design?",
      answer: "Glassmorphism is a design trend characterized by translucent, frosted glass aesthetics. It uses semi-transparent backgrounds combined with CSS backdrop-blur and thin borders to create multi-layered visual depth."
    },
    {
      question: "How does the backdrop-filter property work?",
      answer: "Unlike standard filters that affect the element itself, CSS backdrop-filter applies visual filters (such as blur, brightness, or saturation) to the area directly behind the element's bounding box."
    },
    {
      question: "Why isn't backdrop-filter working in my browser?",
      answer: "Most modern browsers support backdrop-filter. However, Safari requires the vendor-prefixed version: `-webkit-backdrop-filter`. The code generated by our tool automatically includes this prefix for full compatibility."
    },
    {
      question: "Is glassmorphism good for mobile devices?",
      answer: "Backdrop blurs are pixel-shader operations calculated by the GPU. Large blurs or too many overlapping glass panels can trigger scroll lag on older mobile devices. Using media queries to disable blur on small viewports is recommended."
    },
    {
      question: "How do I implement glassmorphism in Tailwind CSS?",
      answer: "You can use Tailwind's built-in opacity and backdrop utilities. For example: `bg-white/20 backdrop-blur-md border border-white/30`. The tool provides complete Tailwind code snippets representing your custom designs."
    },
    {
      question: "What is the difference between Fluent Design and glassmorphism?",
      answer: "Fluent Design is Microsoft's formal design system. It includes 'Acrylic' (frosted, texture-blended glass) and 'Mica' (a solid-back material sampling the desktop background once). Glassmorphism is a broader design trend referencing these styles."
    },
    {
      question: "How can I ensure glass cards are accessible?",
      answer: "Always ensure the text overlaying a glass panel has high contrast. Avoid placing white text on a very light, highly transparent glass layer. Our generator includes a WCAG contrast calculator to help audit readability."
    },
    {
      question: "Can I use images or gradients behind the glass panels?",
      answer: "Yes. The frosted glass effect is only visible if there is a colorful background under it. Our preview canvas supports custom mesh gradients, colored spheres, dynamic blobs, and dark grid backgrounds."
    },
    {
      question: "What is the EyeDropper API?",
      answer: "The EyeDropper API allows web apps to open a native browser tool to sample colors directly from any pixel on the user's screen. If supported by your browser, a dropper button will appear next to color sliders."
    },
    {
      question: "Can I download the designed glass card as an asset?",
      answer: "Yes, you can export your styled glass card either as a vector SVG file or download a high-res PNG swatch directly from the export section."
    }
  ],

  relatedTools: [
    { name: "CSS Shadow Generator", slug: "css-shadow-generator" },
    { name: "Gradient Generator", slug: "gradient-generator" },
    { name: "Tailwind Color Palette", slug: "tailwind-color-palette" },
    { name: "Color Picker", slug: "color-picker" },
    { name: "RGB to HEX", slug: "rgb-to-hex" },
    { name: "HEX to RGB", slug: "hex-to-rgb" }
  ]
};
