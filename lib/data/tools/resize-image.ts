import { ToolConfig } from './types';

export const resizeImageConfig: ToolConfig = {
  slug: "resize-image",
  title: "Resize Image",
  shortDescription: "Resize images online to custom dimensions or social media presets. Shrink dimensions, crop, fit, convert format, and optimize photos client-side.",
  category: "Image Tools",
  keywords: [
    "resize image", "image resizer", "photo resizer", "image dimension changer", "resize photos online",
    "resize image online", "resize image without losing quality", "image optimization", "social media image sizes",
    "website image optimization", "SEO image optimization", "responsive images", "image dimensions",
    "WebP image optimization", "resize images for websites", "resize images for social media",
    "mobile image optimization", "blogging image optimization", "e-commerce image resizing", "fast image delivery",
    "responsive web design", "modern image formats", "compression and resizing", "digital image workflows",
    "creative image editing", "high-quality image scaling", "retina image optimization", "performance optimization",
    "Core Web Vitals image optimization"
  ],

  longDescription: `
## The Science of Digital Image Resizing and Pixel Interpolation

When you resize a raster image, you are not simply stretching a canvas — you are fundamentally modifying a matrix of pixel data. Every digital photograph is composed of thousands or millions of colored blocks (pixels) arranged on a grid. Increasing or decreasing the size of this grid requires the browser to calculate new color values for new coordinates. This process is governed by mathematical algorithms known as **pixel interpolation**.

Understanding how these algorithms function is crucial to achieving **high-quality image scaling** without losing sharpness or introducing visual artifacts.

### Common Interpolation Algorithms

1. **Nearest Neighbor Interpolation**
   - **How it works**: This is the simplest algorithm. To determine the color of a new pixel, it selects the value of the single closest pixel in the original image.
   - **Pros**: Extremely fast; generates zero blur; preserves high-contrast edges in pixel art.
   - **Cons**: Produces severe blocky, jagged edges (aliasing) in high-resolution photographs.

2. **Bilinear Interpolation**
   - **How it works**: It calculates the color of a new pixel by taking a weighted average of the four surrounding pixels in the original image.
   - **Pros**: Balanced processing speed; significantly smoother transitions than Nearest Neighbor.
   - **Cons**: Can cause slight softening or blurriness, particularly in fine details, text, and hair textures.

3. **Bicubic Interpolation**
   - **How it works**: This algorithm evaluates a 4x4 matrix of 16 surrounding pixels, using cubic splines or polynomials to calculate a smooth transition curve.
   - **Pros**: Excellent detail retention; preserves edge contrast; produces minimal pixelation.
   - **Cons**: Demands more processing power (easily handled by modern client-side devices).

Our client-side **image resizer** utilizes browser-native canvas rendering context controls, which default to bilinear or bicubic algorithms depending on browser optimization, ensuring that your resized photos look incredibly sharp.

---

## Aspect Ratios: Math, Calculations, and Locking

The **aspect ratio** of an image represents the proportional relationship between its width and its height. It is expressed as two numbers separated by a colon, such as **16:9** or **4:3**. 

### Calculating Aspect Ratios
The mathematical formula for aspect ratio ($AR$) is:

$$AR = \frac{\text{Width}}{\text{Height}}$$

For example, a standard Full HD image measuring 1920x1080 pixels has an aspect ratio of:

$$\frac{1920}{1080} = \frac{16}{9} \approx 1.777$$

When you lock the aspect ratio in our **photo resizer**, the tool guarantees that this proportional relationship remains constant. If you modify the Width ($W_{\text{new}}$), the Height ($H_{\text{new}}$) is automatically computed using:

$$H_{\text{new}} = \frac{W_{\text{new}}}{AR}$$

Conversely, if you change the Height, the new Width is calculated using:

$$W_{\text{new}} = H_{\text{new}} \times AR$$

### Visual Modes: Fit, Fill, and Stretch

If you need to fit an image into strict dimensions that do not match the original aspect ratio (for instance, making a 16:9 landscape photo fit a 1:1 square Instagram box), you must choose how to resolve the aspect ratio discrepancy:

- **Fit (Contain)**: Resizes the entire image so it is fully visible inside the target container. If the aspect ratios do not match, it creates empty borders (letterboxing or pillarboxing). Our tool lets you fill these borders with a background color picker.
- **Fill (Cover/Crop)**: Resizes the image to fully cover the target dimensions. Any parts of the image that exceed the boundaries are cropped out. This is ideal for generating thumbnails and uniform grids.
- **Stretch**: Forces the image to match the exact target width and height by squeezing or pulling the pixels, completely ignoring aspect ratio. This typically distorts faces and objects.

---

## Social Media Image Sizes Guide

Every social media platform enforces strict dimensions for profiles, covers, posts, and ads. Serving images with incorrect dimensions causes platforms to compress and crop them aggressively, resulting in blurry graphics.

Use this quick-reference table for common **social media image sizes**:

| Platform | Placement | Best Dimensions (px) | Aspect Ratio |
| :--- | :--- | :--- | :--- |
| **Instagram** | Square Post | 1080 x 1080 | 1:1 |
| **Instagram** | Portrait Post | 1080 x 1350 | 4:5 |
| **Instagram** | Story / Reel | 1080 x 1920 | 9:16 |
| **Facebook** | Profile Photo | 180 x 180 (renders 170x170)| 1:1 |
| **Facebook** | Cover Banner | 820 x 312 (Desktop) / 640 x 360 (Mobile)| 16:9 approx |
| **YouTube** | Video Thumbnail | 1280 x 720 | 16:9 |
| **YouTube** | Channel Banner | 2560 x 1440 | 16:9 |
| **TikTok** | Video Thumbnail | 1080 x 1920 | 9:16 |
| **X (Twitter)** | Post Image | 1200 x 675 | 16:9 |
| **LinkedIn** | Personal Cover | 1584 x 396 | 4:1 |
| **LinkedIn** | Post Image | 1200 x 627 | 1.91:1 |
| **Pinterest** | Standard Pin | 1000 x 1500 | 2:3 |

---

## Website and E-commerce Image Resizing Strategies

In **responsive web design**, one size does not fit all. Large images take too long to download on mobile networks, while small images look pixelated on 4K screens.

### 1. Blog Image Optimization
Blog banners and inline graphics should fit the article layout container. Most blog layouts restrict maximum content widths to 800px. Uploading a 5000px raw photo from a DSLR wastes bandwidth and slows down rendering.
- **Rule of Thumb**: Resize inline blog images to a maximum width of 1200px. This provides crisp rendering on standard devices and looks sharp on high-density screens.

### 2. E-commerce Image Resizing
E-commerce grids demand uniformity. Product listings should look identical in height and width.
- **Strategy**: Crop product photos to a 1:1 square or 3:4 portrait ratio. Combine resizing with **WebP image optimization** to keep product payloads under 50KB each, ensuring rapid page loads.

### 3. Responsive Web Delivery and \`srcset\`
Rather than serving a single large image, modern developers generate multiple sizes of the same asset and define them using the HTML \`srcset\` property:

\`\`\`html
<picture>
  <source srcset="hero-large.webp 1920w, hero-medium.webp 1200w, hero-small.webp 600w" type="image/webp">
  <img src="hero-large.jpg" alt="Hero banner" loading="lazy">
</picture>
\`\`\`

This instructs the browser to download the smallest file that fits the screen width, saving mobile data. Our tool supports batch resizing, allowing you to generate these alternate sizes easily.

---

## Technical Performance: DPI, EXIF, and Web Vitals

### Custom DPI (Dots Per Inch)
DPI represents the pixel density for physical prints. While high-resolution prints require 300 DPI, screens render pixels directly, meaning DPI is ignored. Resizing for digital displays only requires updating the pixel dimensions.

### EXIF Metadata Stripping
EXIF data contains digital footprints such as camera models, GPS coordinates, dates, and color profiles. While color profiles should be preserved, GPS and camera signatures add up to 25KB of metadata per file. Stripping metadata helps minimize file sizes for production websites.

### SEO Image Optimization and Core Web Vitals
Google evaluates search rankings based on **Core Web Vitals**. 
- **Largest Contentful Paint (LCP)**: The rendering time of the largest visual block (usually a hero image) on the screen. Serving a 2MB hero banner instead of a resized, optimized 100KB WebP banner increases LCP, directly hurting search rankings.
- **Cumulative Layout Shift (CLS)**: The shifting of layouts during page load. Always specify explicit \`width\` and \`height\` attributes on HTML image tags so the browser can reserve appropriate space before the image is downloaded. Resizing images to match these exact aspect ratios ensures zero CLS.
  `,

  features: [
    "100% Client-Side Processing: Photos are resized inside the browser, ensuring complete privacy and security.",
    "Comprehensive Aspect Ratios: Toggle ratio locking or apply custom constraints (1:1, 16:9, 4:3, 9:16).",
    "Crop & Fit Modes: Supports Contain (Fit with padding color picker), Cover (Fill with smart centering), and Stretch.",
    "Built-in Templates: Presets database covering Instagram, Facebook, YouTube, TikTok, mobile screens, and 4K displays.",
    "Interactive Before/After Slider: Real-time visual comparison of crops and quality using clip-path overlays.",
    "Bulk Batch Processing: Select, resize, convert, and compress multiple images simultaneously.",
    "Format Conversion: Resize and export to JPG, PNG, WEBP, or AVIF layouts directly.",
    "EXIF Metadata Control: Toggle metadata stripping to reduce extra payload sizes.",
    "DPI Configurations: Adjust dots-per-inch signatures for printing and layout compatibility.",
    "ZIP Bundling: Export bulk queues into single zip files using JSZip.",
    "Persistent Settings: Restores your last used configuration and presets using localStorage."
  ],

  useCases: [
    "Resizing camera photos to match social media dimension restrictions.",
    "Creating uniform square thumbnails for e-commerce listings.",
    "Shrinking hero banners to optimize Lighthouse Largest Contentful Paint (LCP) scores.",
    "Converting and resizing heavy screenshots for developers and blog writers.",
    "Preparing responsive picture assets for web apps."
  ],

  howToSteps: [
    "Drag & drop one or multiple images or click the dropzone to browse your local device.",
    "Select your target resize mode: Custom Dimensions or preset templates.",
    "If using Custom Dimensions, input Width and Height (in pixels) and toggle the aspect ratio lock.",
    "If using presets, select a platform (e.g. YouTube Thumbnail) to apply the dimensions automatically.",
    "Choose a Fit Mode: 'Fill' (crops to fit constraints), 'Fit' (fits inside and pads empty space), or 'Stretch'.",
    "Optional: Configure format conversion, compression quality, and EXIF stripping parameters.",
    "Click the visual thumbnail card in the queue to preview before/after visual crops.",
    "Click 'Resize Images' to process your files in the browser.",
    "Download images individually, or click 'Download All as ZIP' to save all optimized files instantly."
  ],

  examples: [
    {
      title: "Blog Cover Image Crop",
      description: "Convert a standard 4:3 camera picture to a sleek 16:9 blog banner.",
      input: "CameraPhoto.jpg (4000x3000, 4:3 aspect ratio, 3.4 MB)",
      output: "BannerPhoto.webp (1200x675, 16:9 ratio, 85 KB WebP format)"
    },
    {
      title: "Instagram Post Bulk Preparation",
      description: "Batch scale and center-crop multiple photos for Instagram feeds.",
      input: "3 miscellaneous landscape photos (various sizes)",
      output: "3 square photos (1080x1080, 1:1 aspect ratio, packaged in a single ZIP)"
    }
  ],

  faq: [
    {
      question: "How do I resize an image online?",
      answer: "Upload your photo, input target width/height dimensions or select a social preset (e.g., Instagram, YouTube), choose a crop mode (Fill, Fit, or Stretch), and click Resize to download the optimized output."
    },
    {
      question: "Can I resize images without losing quality?",
      answer: "Yes. Downscaling reducing pixel dimensions keeps images sharp. For best results, use our resizer with high-quality formats like WEBP or AVIF and maintain visual quality sliders above 80%."
    },
    {
      question: "Is this image resizer free?",
      answer: "Yes, our image resizer is 100% free with no account registrations, no watermarks, and no usage limits."
    },
    {
      question: "Are my images secure?",
      answer: "Absolutely. All scaling and cropping operations occur locally in your browser using HTML5 Canvas. Your images are never uploaded to any remote servers, maintaining total security."
    },
    {
      question: "What image size is best for websites?",
      answer: "Keep full-screen banners at 1920x1080 under 150KB. Keep standard blog graphics at 1200w under 80KB. Resize images to the exact dimensions they are displayed in to speed up layouts."
    },
    {
      question: "How do I resize images for Instagram?",
      answer: "Upload your photos, click on Social Presets, select Instagram Post (1080x1080 for square, 1080x1350 for portrait, or 1080x1920 for Stories), set your crop mode to Fill (Cover) to crop out edges, and download."
    },
    {
      question: "What is the best format for resized images?",
      answer: "We recommend WEBP or AVIF. They provide superior compression, support transparency, and are supported by all modern browsers, making them ideal for web pages."
    },
    {
      question: "Can I resize multiple images at once?",
      answer: "Yes. Our tool supports batch queue loading. You can adjust settings globally, process the queue, and download the entire resized set inside a single ZIP file."
    },
    {
      question: "What is aspect ratio?",
      answer: "Aspect ratio is the proportional relationship between the width and height of an image (e.g., a square has a 1:1 ratio, a widescreen monitor is 16:9). Locking aspect ratios prevents images from looking distorted."
    },
    {
      question: "Does resizing reduce image quality?",
      answer: "Shrinking dimensions does not reduce sharpness, it just reduces file footprints. Upscaling an image beyond its original boundaries can introduce blurriness as the browser interpolates new pixel points."
    },
    {
      question: "Can I resize images on mobile?",
      answer: "Yes. This tool is fully responsive and runs on mobile browsers on iOS and Android without any app installations."
    },
    {
      question: "What is the difference between Fit and Fill modes?",
      answer: "Fit (Contain) resizes the entire image to display inside your limits, adding borders if ratios differ. Fill (Cover) crops out excess margins to fit dimensions without leaving empty gaps."
    },
    {
      question: "Should I strip EXIF metadata?",
      answer: "Yes, for web usage. Stripping metadata removes GPS, camera profiles, and date logs, saving file sizes by up to 20KB per image without affecting appearance."
    },
    {
      question: "How does resizing help SEO?",
      answer: "Sizing images to their display dimensions improves Largest Contentful Paint (LCP) times and helps Core Web Vitals, which is a search engine ranking factor."
    },
    {
      question: "Is this tool browser-based?",
      answer: "Yes, this tool is 100% browser-based. Once loaded, it works completely offline without requiring any server calculations."
    }
  ],

  relatedTools: [
    { name: "Compress Image", slug: "compress-image" },
    { name: "Image Converter", slug: "image-converter" },
    { name: "Crop Image", slug: "crop-image" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "WebP Converter", slug: "webp-converter" },
    { name: "JPG to PNG", slug: "jpg-to-png" },
    { name: "PNG to WebP", slug: "png-to-webp" },
    { name: "QR Code Generator", slug: "qr-code-generator" }
  ]
};
