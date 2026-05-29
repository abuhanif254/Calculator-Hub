import { ToolConfig } from './types';

export const photoEditorConfig: ToolConfig = {
  slug: "photo-editor",
  title: "Photo Editor",
  shortDescription: "Edit photos online with professional filters, visual adjustments, text overlays, drawing tools, and layer configurations client-side.",
  category: "Image Tools",
  keywords: [
    "online photo editing", "free photo editor", "browser-based image editing", "image editing tools",
    "crop and resize photos", "professional image editing", "social media image editing", "SEO image optimization",
    "creative photo workflows", "modern image editing", "Canva alternatives", "Photopea alternatives",
    "image enhancement", "online graphic design tools", "image filters and effects", "browser-based creative tools",
    "web-based photo editing", "responsive image editing", "mobile photo editing", "creative productivity tools",
    "image optimization workflows", "content creator image editing", "digital image enhancement", "online design software",
    "website image optimization"
  ],

  longDescription: `
## The Mechanics of Web-Based Photo Editing and Canvas Rendering

Modern web standards have evolved to allow desktop-grade creative applications to execute directly inside browser tabs. Our **online photo editing** platform leverages the HTML5 Canvas API and WebGL pipelines to render graphics overlays, filter matrices, and vector annotations client-side. This architecture ensures complete user privacy, avoids heavy server load latencies, and yields instantaneous rendering feedback.

### How Layer Compositing Works in the Browser

When editing a multi-layer composition (e.g. an image background overlaid with brush highlights and vector text), the browser maintains a structured state tree representing these elements. Rather than flattening the image immediately, the canvas rendering loop redraws each layer in order from bottom to top (known as the **painter's algorithm**):

1. **Background Layer**: The base raster image, scaled and cropped to match target aspect ratios.
2. **Adjustment and Filter Pipeline**: Pixels are manipulated using hardware-accelerated 2D context filters.
3. **Vector Annotations / Drawing Layers**: Geometric brush strokes and arrows drawn as math curves.
4. **Text Overlays**: Typographic lines rendered using CSS font faces and matrix rotations.

Compositing these layers in real-time requires the browser to manage alpha channels (transparency) carefully. Every canvas redrawing cycle clears the screen and redraws each layer with its associated transparency ($A$) and blend mode parameters, calculated at 60 frames per second for smooth, lag-free dragging and rotation.

---

## Math Behind Hardware-Accelerated Adjustments

Image adjustments (like contrast, temperature, and vibrance) work by mathematically modifying the Red ($R$), Green ($G$), and Blue ($B$) color channels of every individual pixel.

### 1. Brightness Adjustment
Brightness modification adds or subtracts a constant offset ($C$) to all three color values:

$$R_{\text{new}} = R + C$$

$$G_{\text{new}} = G + C$$

$$B_{\text{new}} = B + C$$

If $C > 0$, the overall image shifts toward white; if $C < 0$, it darkens toward black.

### 2. Contrast Modification
Contrast increases or decreases the distance between light and dark pixel ranges. This is calculated relative to a midpoint color value (usually $128$ in 8-bit color channels):

$$R_{\text{new}} = 128 + \text{contrastFactor} \times (R - 128)$$

Where the $\text{contrastFactor}$ is determined by the slider level. Factors $> 1$ stretch highlight and shadow distances, whereas factors $< 1$ flatten gradients into a uniform gray.

### 3. Saturation and Luminance
To adjust saturation, the color must be separated from its luminance (brightness). The relative luminance ($Y$) of a pixel is computed using standard ITU-R coefficients:

$$Y = 0.299R + 0.587G + 0.114B$$

The saturation slider interpolates between this grayscale luminance value and the original color value using a saturation factor ($S$):

$$R_{\text{new}} = Y + S \times (R - Y)$$

$$G_{\text{new}} = Y + S \times (G - Y)$$

$$B_{\text{new}} = Y + S \times (B - Y)$$

Setting $S = 0$ removes all color, converting the image into a grayscale photograph; settings $S > 1$ amplify hues.

Our **free photo editor** handles these calculations via hardware-accelerated GPU filters (\`ctx.filter\`), which translates CSS adjustment values directly into graphic card instructions, preventing CPU main-thread blocking.

---

## The Typography System: Rendering Vector Text and Google Fonts

Adding text overlays onto social media graphics requires high-density font rendering. Our editor handles text as vector parameters:

- **Dynamic Font Loading**: Integrates system standard fonts and loads Google Fonts dynamically into the browser's document stylesheet.
- **Stroke and Fill Vectors**: Canvas renders text outlines and fills separately, allowing users to configure custom text borders, text border thickness, and solid color text values.
- **Transformation Matrices**: Rotations and translations are calculated relative to the text center point using:

\`\`\`javascript
ctx.translate(textX, textY);
ctx.rotate((rotationDegrees * Math.PI) / 180);
ctx.fillText(textString, 0, 0);
\`\`\`

This vector-based text rendering remains razor-sharp regardless of zoom levels, unlike standard rasterized image text, which blurs during upscaling.

---

## Creative Photo Workflows for Social Media and Web Content Creators

### 1. Instagram Post Preparation
Instagram feeds are highly visual and require clean crops.
- **Ratio**: Choose a 1:1 square ratio (1080x1080) or 4:5 portrait ratio (1080x1350).
- **Style**: Use a subtle Cinematic or Vintage filter to unify image tones. Apply Vignette adjustments to darken margins, naturally drawing focus toward the center subjects.

### 2. YouTube Thumbnail Composition
YouTube thumbnails require high readability on mobile screens.
- **Ratio**: Standard 16:9 ratio (1280x720).
- **Text Layer**: Add a thick, high-contrast text overlay (e.g. bold sans-serif fonts in yellow or white) with a black stroke shadow (5px border width) to ensure text readability against varying video scenes.
- **Enhancement**: Increase Contrast and Vibrance sliders by 10-15% to help the thumbnail stand out in search recommendations.

### 3. Website Hero Banners
Web page headers demand horizontal layouts and fast loading times.
- **Dimensions**: Resize to 1920x1080 or 1200w.
- **Contrast**: Lower exposure slightly if you plan to overlay white body copy on top.
- **Export**: Save as WEBP or AVIF at 75-80% quality to optimize Largest Contentful Paint (LCP) performance scores.

---

## 10 Steps to a Professional Photo Editing Workflow
1. Upload your base high-resolution image to the canvas dropzone.
2. Crop and straighten the composition to match your desired social or web aspect ratio.
3. Configure core Adjustments: fix exposure issues, boost brightness, or balance contrast.
4. Adjust Temperature: shift warm tones (amber) for sunny photos, or cool tones (blue) for snowy scenes.
5. Apply a stylized visual filter (e.g. HDR for landscape details, Cinematic for portrait depths).
6. Adjust filter intensity to prevent over-saturation.
7. Overlay annotations (arrows, highlights) if designing tutorial graphics.
8. Add text layers with customized fonts, borders, and dropshadow structures.
9. Adjust layer ordering and opacity to blend overlays correctly.
10. Click Export, select WEBP or AVIF, and set compression parameters to optimize output size.
  `,

  features: [
    "100% Offline Creative Studio: Photos process in browser memory, ensuring privacy and data protection.",
    "Hardware-Accelerated Adjustments: Sliders for Exposure, Contrast, Brightness, Saturation, Temp, Tint, Vibrance, Blur, Vignette.",
    "Creative Filters Dashboard: Apply Cinematic, Vintage, Black & White, Sepia, HDR, Pixelate, Retro, and Sketch effects.",
    "Vector Annotation Tools: Sketch, draw brush paths, erase, choose line widths, opacity levels, and brush colors.",
    "Rich Text Overlays: Customize font family, colors, shadows, borders/strokes, font sizes, and layer rotations.",
    "Multi-Layer Management: Reorder layer stacks, duplicate, delete, and adjust individual layer opacities.",
    "Transform & Crop presets: Crop to standard aspect ratios (1:1, 16:9, 4:5, 9:16), rotate 90°, flip horizontally/vertically.",
    "Autosave System: Retains your workspace progress locally so you don't lose changes on page reloads.",
    "Real-Time Undo & Redo: Multi-step historical state stack recovery.",
    "Lossless & Optimized Exports: Convert to JPG, PNG, WEBP, or AVIF with custom quality compression sliders."
  ],

  useCases: [
    "Designing high-contrast YouTube thumbnails with text overlays and drop shadows.",
    "Applying consistent retro/cinematic filters to photography portfolios.",
    "Annotating web screenshots with arrows, highlights, and text callouts.",
    "Adjusting exposure, brightness, and contrast of dark photos.",
    "Preparing web banners in AVIF and WebP formats to speed up page delivery."
  ],

  howToSteps: [
    "Select or drag & drop an image to load it onto the editing workspace.",
    "Use Crop, Rotate, or Flip tools under the Basic Transforms panel to fix composition issues.",
    "Use the Adjustments panel to fine-tune brightness, contrast, exposure, temperature, and vignettes.",
    "Browse the Filters section to overlay cinematic, vintage, or artistic styles onto your photos.",
    "Select the Text Tool to insert customizable text layers with custom fonts, colors, and thick borders.",
    "Activate the Brush / Drawing tool to annotate, sketch, highlight, or erase elements.",
    "Reorder, duplicate, or hide layers using the Layers panel on the right side.",
    "Use Undo (Ctrl+Z) or Redo (Ctrl+Y) to navigate through editing history steps.",
    "Click the Export button to configure your output format (PNG, JPEG, WebP, AVIF) and compression quality.",
    "Download the finished image directly to your local device."
  ],

  examples: [
    {
      title: "Social Media Card Design",
      description: "Convert a plain photo into a structured social media graphic with banners. Input: GraphicPhoto.jpg (Original, raw landscape). Output: InstagramSquare.webp (Cropped 1:1, cinematic filter applied, text overlay with yellow borders)",
      input: "GraphicPhoto.jpg (Original, raw landscape)",
      output: "InstagramSquare.webp (Cropped 1:1, cinematic filter applied, text overlay with yellow borders)"
    },
    {
      title: "Tutorial Screenshot Callout",
      description: "Draw annotations and arrows on a screenshot to highlight features. Input: RawScreenshot.png (1920x1080, unmodified). Output: AnnotatedGuide.png (Resized, red vector arrows drawing focus to buttons, text labels)",
      input: "RawScreenshot.png (1920x1080, unmodified)",
      output: "AnnotatedGuide.png (Resized, red vector arrows drawing focus to buttons, text labels)"
    }
  ],

  faq: [
    {
      question: "How do I edit photos online?",
      answer: "Upload your photo, adjust core exposure and color settings, apply filters, overlay text or draw annotations, manage your layered edits, and click Export to save the finished asset."
    },
    {
      question: "Is this online photo editor free?",
      answer: "Yes, our creative editor is 100% free with no registrations, no subscription tiers, and no watermark additions."
    },
    {
      question: "Are my photos secure?",
      answer: "Absolutely. The editor runs entirely inside your browser's local sandbox memory. No image files are uploaded to remote servers, ensuring absolute privacy."
    },
    {
      question: "Can I edit photos on mobile devices?",
      answer: "Yes. Our editor layout adapts to mobile devices and tablets, allowing you to crop, adjust, filter, and overlay text using mobile touch controls."
    },
    {
      question: "Does the editor support layers?",
      answer: "Yes. The editor features a layer manager that lets you add text, draw annotations, and load secondary graphics. You can reorder, duplicate, adjust opacity, and delete layers individually."
    },
    {
      question: "Can I add custom text to photos?",
      answer: "Yes. You can add multiple text overlays, customize Google Fonts, change colors, adjust sizes, rotate, and add thick outline strokes or text shadows."
    },
    {
      question: "What image formats are supported?",
      answer: "The editor supports JPEG, PNG, WEBP, AVIF, GIF, BMP, and SVG formats for loading and editing."
    },
    {
      question: "Can I export edited photos as WebP or AVIF?",
      answer: "Yes. You can choose to convert and export your edited layouts directly to next-generation formats like WEBP and AVIF to optimize website speeds."
    },
    {
      question: "Does the photo editor preserve image quality?",
      answer: "Yes. The editor renders layers onto high-resolution canvases. You can configure the export quality slider to 100% to maximize output quality."
    },
    {
      question: "Can I crop and resize images here?",
      answer: "Yes. The editor includes standard cropping presets (1:1, 16:9, 4:5, 9:16) and allows custom dimension inputs to resize the canvas before exporting."
    },
    {
      question: "Can I undo changes?",
      answer: "Yes. The editor features a multi-step history stack, allowing you to undo (Ctrl+Z) or redo (Ctrl+Y) edits, brush strokes, text additions, and adjustments."
    },
    {
      question: "Can I create transparent backgrounds?",
      answer: "Yes. When exporting to formats that support transparency (like PNG or WEBP), transparent backgrounds are preserved."
    },
    {
      question: "How do adjustments differ from filters?",
      answer: "Adjustments (like brightness, contrast) let you tune specific channel metrics manually. Filters are pre-configured lookup combinations that apply cohesive color grading in one click."
    },
    {
      question: "Does the editor support EXIF metadata removal?",
      answer: "Yes. By exporting your images through browser Canvas rendering, camera models, GPS data, and timestamps are stripped automatically, saving file space."
    },
    {
      question: "Can I draw on my photos?",
      answer: "Yes. The editor has a Brush tool with adjustable brush sizes, transparency levels, and a full color picker, as well as an Eraser."
    }
  ],

  relatedTools: [
    { name: "Resize Image", slug: "resize-image" },
    { name: "Compress Image", slug: "compress-image" },
    { name: "Crop Image", slug: "crop-image" },
    { name: "Image Converter", slug: "image-converter" },
    { name: "WebP Converter", slug: "webp-converter" },
    { name: "JPG to PNG", slug: "jpg-to-png" },
    { name: "PNG to WebP", slug: "png-to-webp" },
    { name: "QR Code Generator", slug: "qr-code-generator" }
  ]
};
