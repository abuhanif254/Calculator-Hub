import { ToolConfig } from './types';

export const gradientGeneratorConfig: ToolConfig = {
  slug: "gradient-generator",
  title: "Gradient Generator",
  shortDescription: "A professional-grade CSS gradient generator and editor. Create, customize, and animate linear, radial, and conic gradients, analyze WCAG contrast accessibility, and export CSS, SCSS, SVG, and Tailwind code.",
  category: "Color Tools",
  keywords: [
    "css gradient generator", "tailwind gradient maker", "radial gradient css",
    "conic gradient generator", "linear gradient css", "animated gradient code",
    "mesh gradient simulation", "gradient color palette", "glassmorphism builder",
    "web design gradients", "ui design color tools", "gradient css exporter"
  ],

  longDescription: `
Gradients are one of the most powerful visual elements in modern web design. They bridge the gap between flat, solid colors and photorealistic textures, creating depth, lighting simulation, and dynamic energy on digital screens. In code, a gradient is not an image but a mathematical transition between multiple colors rendered natively by the browser's graphics engine.

Our **Gradient Generator** is a professional-grade, browser-based design workstation built for front-end developers, UI/UX designers, and brand managers. Whether you need to craft a subtle hero background, generate Tailwind utility classes, verify text contrast, or export SVG code, this tool provides a unified, zero-install workspace that operates 100% client-side.

---

## 1. What Are CSS Gradients?
In CSS, gradients are classified as \`<image>\` data types, meaning they can be applied to any property that accepts background images, such as \`background\`, \`background-image\`, \`list-style-image\`, or \`border-image\`. Because the browser calculates and renders these transitions dynamically, they are infinitely scalable without losing resolution, consume negligible network bandwidth, and can adjust dynamically based on viewport dimensions.

A gradient consists of a starting point, a direction or shape, and a series of **color stops**. A color stop defines a specific color at a specific percentage or length along the gradient line. The browser then computes intermediate colors between these stops using interpolation.

---

## 2. Linear Gradients: Direction and Flow
The **linear gradient** is the most common type. It transitions colors along a straight line. By default, linear gradients transition from top to bottom, but CSS allows you to define any custom direction.

### Defining Angles and Paths
You can specify the direction of a linear gradient in two ways:
*   **Keywords:** \`to top\`, \`to bottom\`, \`to right\`, \`to left\`, \`to top right\`, \`to bottom left\`, etc.
*   **Angles:** A degree value from \`0deg\` to \`360deg\`.
    *   \`0deg\` points straight up (bottom to top).
    *   \`90deg\` points straight to the right (left to right).
    *   \`180deg\` points straight down (top to bottom - the default).
    *   \`270deg\` points straight to the left (right to left).

### Repeating Linear Gradients
For stripe patterns, hatching, or zebra lines, CSS offers \`repeating-linear-gradient()\`. Instead of stretching the stops to fit the entire width, it loops them continuously based on the specified stop distances.

---

## 3. Radial Gradients: Depth and Highlights
A **radial gradient** transitions colors outwards from a central point (the origin), mimicking three-dimensional spheres, radial light cones, or glowing highlights.

### Shapes and Sizes
Radial gradients support two basic shapes:
*   **Circle:** The gradient maintains a perfect 1:1 aspect ratio.
*   **Ellipse:** (Default) The gradient stretches to match the width and height of the container.

You can also specify where the gradient terminates (its size):
*   \`closest-side\`: Ends at the edge closest to the center.
*   \`farthest-side\`: Ends at the edge farthest from the center.
*   \`closest-corner\`: Ends at the corner closest to the center.
*   \`farthest-corner\`: (Default) Ends at the corner farthest from the center.

### Custom Positions
The center of the radial gradient can be placed anywhere using keywords or coordinates, such as \`circle at center\`, \`ellipse at 20% 30%\`, or \`circle at top left\`. This makes it easy to align glow highlights behind interactive cards or buttons.

---

## 4. Conic Gradients: Angular Sweep
A **conic gradient** (or color sweep) transitions colors around a central point, similar to the colors on a pie chart, a color wheel, or the reflective sheen on a metallic CD surface.

Unlike radial gradients where colors transition from the inside out, conic gradients start at an angle (usually straight up, 12:00) and rotate 360 degrees clockwise.
*   **Use Cases:** Ideal for circular progress wheels, color wheels, pie graphs, and shiny metallic textures.
*   **CSS Syntax:** \`conic-gradient(from 0deg at center, red, yellow, green, blue, red)\`. Note that to make the seam seamless, the first and last colors should be identical.

---

## 5. Modern UI Design Trends: The Renaissance of Gradients
Web aesthetics shift periodically, and gradients have experienced a major renaissance. During the early web, gradients were used to simulate physical buttons (skeuomorphism) with heavy, dark-to-light transitions. In the flat-design era of the 2010s, they were discarded in favor of flat colors.

Today, gradients are used in **semi-flat and immersive designs** to build premium brand narratives:
*   **Aurora Effects:** Large, blurred, low-opacity radial shapes that simulate northern lights.
*   **Glow Backdrops:** Placing a subtle radial gradient behind a container to separate it from a dark page.
*   **Gradient Text:** Clipping a gradient background to text characters using \`-webkit-background-clip: text\`.
*   **Glassmorphism:** Combining transparent gradient backdrops, backdrop-filters (blur), and white semi-transparent gradient borders to make components look like frosted glass panels.

---

## 6. Color Systems and Design Workflows
Selecting colors for a gradient requires careful planning. If you pick random colors, the middle of the transition may look muddy or gray. This occurs because the browser interpolates colors in the default sRGB color space.

### Selecting Harmonious Palettes
To create beautiful, bright gradients:
1.  **Analogous Colors:** Select adjacent colors on the color wheel (e.g., violet, magenta, and orange). Since they share undertones, the interpolation is vibrant and natural.
2.  **Add a Midpoint (Via Stop):** If you must use complementary colors (opposites, like blue and orange), add a third color as a midpoint stop (e.g., purple or pink) to bridge the gap and prevent a dull gray center.
3.  **Adjust Opacity:** Use transparency (Alpha channels) to blend the gradient smoothly into the page's background.

---

## 7. Mastering Tailwind CSS Gradients
Tailwind CSS provides utilities to build gradients directly in HTML utility classes. By default, Tailwind uses three primary utility keywords to direct gradients:
*   **Direction:** \`bg-gradient-to-r\` (right), \`bg-gradient-to-tr\` (top right), \`bg-gradient-to-b\` (bottom), etc.
*   **Stops:** \`from-[color]\` (starting), \`via-[color]\` (middle), and \`to-[color]\` (ending).

For example, a gradient from pink to red to yellow is written as:
\`\`\`html
<div class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
\`\`\`

### Arbitrary Brackets for Complex Gradients
If your gradient uses more than three stops, custom angles, opacity, or is a radial/conic gradient, Tailwind's standard classes are insufficient. In this case, you can use Tailwind's arbitrary bracket syntax to drop in raw CSS:
\`\`\`html
<div class="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-900"></div>
\`\`\`
Our tool compiles both standard Tailwind classes (when possible) and custom arbitrary bracket codes, making copy-pasting into your JSX/HTML files immediate and error-free.

---

## 8. Gradient Accessibility (WCAG Compliance)
A common pitfall in web design is placing readable text on top of gradients without checking accessibility. If parts of the gradient are light and other parts are dark, some words might disappear or cause eye strain.

The Web Content Accessibility Guidelines (WCAG 2.1) require:
*   **AA Rating:** A contrast ratio of at least \`4.5:1\` for body text, and \`3:1\` for headings.
*   **AAA Rating:** A contrast ratio of at least \`7:1\` for body text, and \`4.5:1\` for headings.

### How to Calculate Gradient Contrast
Because a gradient changes values across the canvas, checking contrast at a single point is inaccurate. Our tool calculates the contrast of your text color (white and black) against the colors at multiple intervals of the gradient (start, middle, and end). It alerts you if any section drops below the readable threshold, helping you adjust stop positions or opacities until you achieve compliance.

---

## 9. Dynamic Motion: Gradient Animation Techniques
Static gradients are beautiful, but animating them adds a level of premium interactivity that catches the eye. There are two primary techniques to animate gradients using pure CSS:

### Technique A: Background Size Shift
Because you cannot directly transition the colors of a gradient using standard CSS transitions, you scale the background size to 200% and move the background position:
\`\`\`css
.animated-gradient {
  background: linear-gradient(120deg, #ff007f, #7f00ff, #00f0ff);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
\`\`\`

### Technique B: CSS Custom Properties (@property)
In modern browsers, you can define custom color properties as variables and transition them directly:
\`\`\`css
@property --gradient-start {
  syntax: '<color>';
  inherits: false;
  initial-value: #ff007f;
}

.animated-colors {
  background: linear-gradient(to right, var(--gradient-start), #7f00ff);
  transition: --gradient-start 0.5s ease;
}

.animated-colors:hover {
  --gradient-start: #00f0ff;
}
\`\`\`

Our generator provides a toggle to preview animated states and automatically outputs the necessary CSS code snippets.

---

## 10. Designing Professional Assets: SVG and Canvas Exports
In addition to CSS code, developers often require gradients as standalone assets for graphic layouts, vector illustrations, or background image sources:
*   **SVG Gradients:** Scalable Vector Graphics can embed gradient coordinates inside the \`<defs>\` tag, allowing you to fill vector shapes, icons, or text elements.
*   **PNG Previews:** Perfect for uploading as thumbnail previews, hero image fallbacks, or templates in graphic design applications.

Our workspace handles these conversions in real time, rendering vector nodes dynamically and enabling instant, high-quality downloads.
  `,

  features: [
    "Interactive stops track supporting unlimited add, remove, and drag controls",
    "Linear, Radial, and Conic gradient rendering engines with real-time browser preview",
    "Circular angle dial dial and button direction presets (to top, bottom, diagonals)",
    "Color picker system supporting HEX, RGB, HSL, alpha opacity, and EyeDropper API",
    "Real-world mock previews: Hero Banner, Cards, Buttons, Text clipping, and Mobile viewport",
    "WCAG contrast checking analyzing text readability against gradient coordinates",
    "One-click exports: CSS background, SCSS variables, JSON config, and Tailwind classes",
    "Scalable Vector Graphics (SVG) asset creation and PNG image canvas rendering",
    "Preset library featuringSunset, Cyberpunk, Glassmorphism, and Gaming schemes",
    "Randomizer engine generating palettes based on style tags (dark, pastel, neon)",
    "Advanced settings: SVG noise filters, backdrop blur, glass overlays, and motion preview",
    "Recent items log stored locally via LocalStorage"
  ],

  useCases: [
    "Creating vibrant, high-fidelity hero banner backgrounds for landing pages",
    "Developing accessible contrast-compliant card components with text overlays",
    "Generating Tailwind bracket class configurations for custom angle gradients",
    "Designing animated color-shifting backgrounds for modern landing pages",
    "Exporting SVG linear/radial code snippets to color vector illustrations",
    "Creating glassmorphic cards with frosted glass backing and gradient borders",
    "Building consistent brand color palettes by exporting JSON configurations",
    "Simulating mesh gradients using overlapping alpha-blended radial nodes"
  ],

  howToSteps: [
    "Select your desired gradient type (Linear, Radial, or Conic) from the top control row.",
    "Configure direction settings using the circular angle dial or preset direction buttons.",
    "Click anywhere on the color stops slider to add new color stops, or drag existing indicators left/right to adjust transitions.",
    "Select a stop indicator and use the color pickers to modify its hex value, opacity slider, or coordinates.",
    "Toggle the 'Advanced' options to preview animations, backdrop blur, glass panels, or svg noise texturing.",
    "Review the accessibility panel to check if black or white text passes WCAG contrast compliance.",
    "Explore the presets panel to apply professionally designed color combinations instantly.",
    "Click the export tabs to copy CSS/Tailwind styles or download SVG/PNG files."
  ],

  examples: [
    {
      title: "Vibrant Linear Sunset Gradient",
      description: "A three-stop warm transition commonly used for tech startup hero backdrops.",
      input: "Linear gradient (135 degrees), Stop 1: #ff007f (0%), Stop 2: #ff7f00 (50%), Stop 3: #ffff00 (100%)",
      output: "background: linear-gradient(135deg, rgba(255, 0, 127, 1) 0%, rgba(255, 127, 0, 1) 50%, rgba(255, 255, 0, 1) 100%);"
    },
    {
      title: "Glassmorphic Card Radial Highlights",
      description: "A soft, centered radial glow that highlights elements without distracting from readability.",
      input: "Radial gradient (circle at center), Stop 1: rgba(124, 58, 237, 0.4) 0%, Stop 2: rgba(15, 23, 42, 1) 100%",
      output: "background: radial-gradient(circle at center, rgba(124, 58, 237, 0.4) 0%, rgba(15, 23, 42, 1) 100%);"
    }
  ],

  faq: [
    {
      question: "What is a CSS gradient?",
      answer: "A CSS gradient is a dynamic transition between colors computed and rendered by the web browser. Since they are computed algorithmically rather than stored as raster images, they scale infinitely without blurring and load instantaneously."
    },
    {
      question: "How do I add and remove color stops in the generator?",
      answer: "To add a stop, click anywhere along the stops bar. To edit a stop, click its handle indicator. To remove a stop, select its handle and click the 'Delete Stop' trash icon, or drag the handle downwards off the slider bar."
    },
    {
      question: "Can I export my gradient to Tailwind CSS?",
      answer: "Yes. The generator compiles both standard Tailwind classes (like 'bg-gradient-to-r from-blue-500 to-indigo-500') and custom arbitrary brackets (like 'bg-[linear-gradient(135deg,#ff007f_0%,#7f00ff_100%)]') for more complex multi-stop layouts."
    },
    {
      question: "What is the difference between Linear, Radial, and Conic gradients?",
      answer: "Linear gradients transition colors along a straight line. Radial gradients radiate color outward from a single center point in a circular or elliptical shape. Conic gradients rotate color transitions around a center point clockwise in a 360-degree sweep."
    },
    {
      question: "How does the WCAG accessibility contrast check work?",
      answer: "The tool samples colors at several intervals along the gradient path and evaluates the relative luminance against black and white text. It then determines if the contrast ratio meets WCAG 2.1 AA (4.5:1) or AAA (7:1) readability guidelines, alerting you if text contrast is insufficient in any section."
    },
    {
      question: "Can I generate animated gradients?",
      answer: "Yes. Enabling the 'Animation' toggle scales the background gradient to 200% and cycles its coordinate positions using a CSS keyframe loop. The generator provides both the background styles and keyframe definitions for you to copy."
    },
    {
      question: "What is the 'Noise' filter option?",
      answer: "Digital gradients can suffer from 'banding'—visible lines where colors transition. Enabling the Noise overlay injects a subtle, low-opacity SVG turbulence filter over the gradient. This diffuses the color boundaries, making the gradient appear smooth, high-fidelity, and organic."
    },
    {
      question: "How do I export my gradient as an SVG file?",
      answer: "Click the Export tab, navigate to the SVG section, and click 'Download SVG'. The tool creates a vector document containing a rect filled with a linear/radial gradient definition, which you can import directly into vector tools like Illustrator or Figma."
    },
    {
      question: "How does the random gradient generator work?",
      answer: "Click the Random button to generate new palettes. You can choose specific themes: 'Dark' generates deep backgrounds, 'Pastel' creates soft, low-saturation blends, and 'Neon' constructs high-contrast, glowing color pairings."
    },
    {
      question: "Is my gradient history saved between visits?",
      answer: "Yes. The generator automatically caches your recent gradient designs inside your browser's LocalStorage. The data is kept entirely private to your device, ensuring no server-side logging occurs."
    }
  ],

  relatedTools: [
    { name: "Color Picker", slug: "color-picker" },
    { name: "RGB to HEX", slug: "rgb-to-hex" },
    { name: "HEX to RGB", slug: "hex-to-rgb" },
    { name: "Color Palette Generator", slug: "color-palette-generator" },
    { name: "Contrast Checker", slug: "contrast-checker" },
    { name: "Tailwind Color Palette", slug: "tailwind-color-palette" }
  ]
};
