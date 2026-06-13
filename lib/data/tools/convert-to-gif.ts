import { ToolConfig } from './types';

export const convertToGifToolConfig: ToolConfig = {
  slug: "convert-to-gif",
  title: "Convert to GIF",
  shortDescription: "Convert PNG, JPG, JPEG, WEBP, and BMP images into animated or static GIF files entirely in-browser. Control frame durations, loops, captions, watermarks, crop margins, and download zip queues.",
  category: "Image Tools",
  keywords: [
    "convert to gif",
    "gif converter",
    "image to gif",
    "jpg to gif",
    "png to gif",
    "animated gif creator",
    "gif maker",
    "create gif online",
    "free gif converter",
    "social media gif creator"
  ],
  features: [
    "Convert JPG, PNG, WEBP, BMP, AVIF, and HEIC images into animated or slideshow GIFs entirely locally",
    "Interactive Frame Timeline: reorder, delete, duplicate, and set individual frame delays",
    "Custom playback console: play/pause, step forward/backward, and adjust global delays",
    "Dynamic dynamic HEIC dynamic format support for importing iOS live photos on-the-fly",
    "Advanced color quantization presets (Low, Medium, High, Max) and custom quality level mapping",
    "Frame editing canvas: rotate (90/180/270), flip, scale/resize, crop margins, add text captions, or add text watermarks",
    "Social media size presets matching Instagram, Facebook, Twitter/X, Discord, and Reddit ratios",
    "Privacy-first processing: all computations run locally on the client canvas; no server uploads",
    "Sequential queue processor with zip batch package exporter built on JSZip"
  ],
  useCases: [
    "Creating animated product slideshow GIFs from separate e-commerce camera photos for eBay or Shopify",
    "Generating funny meme GIFs with top and bottom Impact font text overlays to share on social media",
    "Combining sequential screenshots or design mockups into step-by-step tutorial animations",
    "Converting transparent PNG sequence frames into lightweight animated graphics for developer UI design",
    "Scaling heavy photographs down into lightweight Discord animated emojis or Slack custom reactions",
    "Safely creating private business presentation slideshows locally without exposing media to cloud servers"
  ],
  howToSteps: [
    "Upload your images (PNG, JPG, WEBP, BMP, GIF, HEIC) by dragging and dropping them, or browsing.",
    "Arrange your uploaded frames in the timeline panel below the preview window.",
    "Select your preset conversion mode (e.g. Animated GIF, Slideshow, or Meme GIF).",
    "Customize settings: set frame delays (ms), loop repeat counts, and color quantization levels.",
    "Tweak frame visuals: crop, rotate, flip, add text overlays, or add watermarks if required.",
    "Preview the animation, check the file analytics, and download your finished GIF file."
  ],
  relatedTools: [
    { name: "Convert to JPG", slug: "convert-to-jpg" },
    { name: "Convert to PNG", slug: "convert-to-png" },
    { name: "Convert to WebP", slug: "convert-to-webp" },
    { name: "Compress Image", slug: "compress-image" },
    { name: "Resize Image", slug: "resize-image" },
    { name: "Crop Image", slug: "crop-image" },
    { name: "Watermark Image", slug: "watermark-image" }
  ],
  examples: [],
  faq: [
    {
      question: "What is the GIF format?",
      answer: "GIF stands for Graphics Interchange Format. Developed by CompuServe in 1987, it is an 8-bit bitmap image format that supports up to 256 colors per frame. It uses LZW lossless data compression and is widely known for its ability to support simple animations and looping sequences without sound."
    },
    {
      question: "How does the Image to GIF converter work?",
      answer: "The tool works 100% locally in your browser. When you upload multiple images, they are loaded onto a hidden HTML5 canvas. The engine applies color quantization to group each frame's colors into a 256-color index table, applies LZW compression to the color indexes, constructs GIF graphic control extensions to set frame durations, and compiles the final binary data into an animated GIF blob."
    },
    {
      question: "Are my files uploaded to your servers?",
      answer: "No. Privacy is our top priority. All frame loading, canvas drawing, resizing, rotation, text rendering, and GIF compilation are processed locally on your device within your web browser. No files are uploaded to our servers, meaning your confidential graphics and photos are kept 100% safe."
    },
    {
      question: "How many colors can a GIF contain?",
      answer: "A standard GIF is limited to a maximum of 256 unique colors per frame. If you upload a photograph with thousands of colors, the color quantizer will compress them down into the best matching 256 colors. While this can result in slight color banding, it keeps file sizes small."
    },
    {
      question: "What is LZW compression in GIFs?",
      answer: "LZW (Lempel-Ziv-Welch) is a lossless data compression algorithm. It works by building a dictionary of repeated color sequences in the pixel grid, substituting long pixel strings with short codes. This allows GIFs to compress flat-color designs and drawings exceptionally well."
    },
    {
      question: "Can I convert static images to GIF?",
      answer: "Yes. You can upload a single image to convert it to a static GIF file. You can also upload a sequence of static images (such as PNGs or JPEGs) to compile them into an animated slideshow GIF."
    },
    {
      question: "How do I control the speed of the GIF animation?",
      answer: "Under the 'Animation Settings' panel, you can adjust the **Frame Delay** slider (in milliseconds). This defines the duration that each individual image frame stays visible on the screen. A lower delay makes the animation faster, while a higher delay slows it down."
    },
    {
      question: "What does 'Loop Count' mean?",
      answer: "Loop Count defines the number of times the GIF animation will repeat. Setting the Loop Count to 'Infinite' (or 0) means the GIF will loop forever. Setting it to 1, 2, or 5 means it will stop playing after completing that number of cycles."
    },
    {
      question: "Does this GIF converter support transparent backgrounds?",
      answer: "Yes. The GIF specification supports a single transparent color index. If you upload transparent PNG or WEBP files, our encoder will identify transparent pixels, map them to a transparent index, and preserve transparency in the output GIF."
    },
    {
      question: "Can I convert Apple HEIC photos to GIF?",
      answer: "Yes. Our tool dynamically imports a HEIC decoder (`heic2any`) in the browser. If you upload iPhone HEIC files, the system decodes them to standard image frames locally, allowing you to create animations from iOS photos."
    },
    {
      question: "What is the difference between a slideshow GIF and an animated GIF?",
      answer: "Technically, they are the same format. However, in our workspace presets, 'Slideshow Mode' uses longer delays (e.g. 1 to 3 seconds per frame) to transition slowly between photos, whereas 'Animated GIF' uses rapid frame delays (e.g. 50ms to 200ms) to create smooth video-like motion."
    },
    {
      question: "How can I make my GIF file size smaller?",
      answer: "To reduce the file size of a GIF, you can:\n1. Lower the **Resolution** (dimensions in pixels).\n2. Reduce the **Total Frames** (remove unnecessary intermediate frames).\n3. Lower the **Quality/Color count** (using fewer colors creates smaller LZW dictionary entries).\n4. Tweak the frame disposal parameters to merge static pixels across layers."
    },
    {
      question: "Can I edit individual frames in the timeline?",
      answer: "Yes. The bottom timeline editor lets you select any frame. Once selected, you can rotate, crop, flip, add text overlays, duplicate, or delete that specific frame without affecting other parts of the animation."
    },
    {
      question: "What does 'Disposal Method' mean in GIF settings?",
      answer: "The disposal method defines how a browser should handle the previous frame after rendering the current one. Methods include: 'Not Specified' (keep current pixels), 'Do Not Dispose' (overlap frames, useful for transparent overlays), and 'Restore Background' (clear the canvas before drawing the next frame)."
    },
    {
      question: "Can I add text captions to create memes?",
      answer: "Yes. We provide a built-in 'Meme Editor' mode. When enabled, you can enter text which is overlayed in the classic white Impact font with a black border at the top or bottom of the active frame or the entire animation."
    },
    {
      question: "How do I add a watermark to my GIF?",
      answer: "In the watermark panel, you can type your watermark text, select its opacity (transparency), set the font size, and choose its placement (center, top-right, bottom-left, etc.). The text will be drawn over every frame."
    },
    {
      question: "Can I drag and drop frames to reorder them?",
      answer: "Yes. The timeline bar features drag-and-drop handles. You can click and drag frames left or right to change their chronological order in the animation."
    },
    {
      question: "Is there a limit on the number of frames I can upload?",
      answer: "We do not enforce a strict frame limit. However, because all processing is performed in your local browser memory, converting sequences with more than 200 high-resolution frames might consume significant RAM. We recommend keeping resolutions under 800px when creating large animations."
    },
    {
      question: "Does the output GIF contain audio?",
      answer: "No. The GIF file format specification does not support audio tracks. If you need sound, you must export your project as a video format (like MP4 or WebM)."
    },
    {
      question: "What are the social media presets?",
      answer: "Our social media panel features presets for Discord emoji (128x128), Slack icon (128x128), Instagram (square/portrait), Facebook post, Twitter/X post, and Reddit. Selecting a preset will automatically scale or letterbox crop your frames to match the target aspect ratios."
    },
    {
      question: "What browser compatibility is required?",
      answer: "The tool works on all modern web browsers supporting HTML5 Canvas, typed arrays, and ES6 JavaScript, including Chrome, Safari, Firefox, Edge, and mobile platforms."
    },
    {
      question: "Can I paste an image directly from the clipboard?",
      answer: "Yes. If you have an image in your clipboard, you can press `Ctrl+V` (or `Cmd+V` on Mac) while on the page to paste it directly as a new frame in the timeline."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes. Our GIF converter is 100% free with no hidden charges, watermarks, or sign-up requirements."
    },
    {
      question: "Can I batch convert multiple separate folders?",
      answer: "Yes. You can upload several batches. The sequential converter lets you download each completed GIF individually or package them together into a single ZIP file."
    },
    {
      question: "Why does my transparent GIF have black borders?",
      answer: "This happens if the transparency index matches a black pixel color in your palette or if the 'Dispose Method' overlaps transparent pixels over dark backgrounds. Ensure you enable 'Transparent Background' and select 'Restore to Background' disposal to clear frame outlines."
    },
    {
      question: "What is dither in GIF conversion?",
      answer: "Dithering is a technique used to simulate high color depth in low-color images. It arranges pixel patterns to blend colors visually, reducing the appearance of harsh color bands, though it can slightly increase LZW file sizes."
    },
    {
      question: "How do I download the generated GIF?",
      answer: "Once the progress bar hits 100%, an 'Export Options' card will appear. Click the 'Download GIF' button to save the file to your device's download folder."
    },
    {
      question: "What is an estimated download size?",
      answer: "It is a performance estimate that calculates how long it will take a visitor to download the GIF on various mobile connections (such as 3G or 4G) based on the computed file size."
    },
    {
      question: "Can I use the tool offline?",
      answer: "Yes. Once the page is loaded, the entire conversion, rendering, LZW compression, and download routines run offline, allowing you to create GIFs without internet access."
    },
    {
      question: "Can I convert WEBP images to GIF?",
      answer: "Yes. You can upload static WebP files, and the browser will draw them onto the canvas frames to compile them into an animated GIF."
    },
    {
      question: "Can I convert BMP files to GIF?",
      answer: "Yes. BMP files are completely uncompressed and very large. Converting them to GIF will drastically reduce their file size while making them compatible with web browsers."
    },
    {
      question: "How does the 'Meme GIF' mode differ?",
      answer: "Meme GIF mode automatically applies impact font styling and expands the canvas margins slightly to accommodate top and bottom text layouts, similar to popular meme formats."
    },
    {
      question: "Who invented the GIF format?",
      answer: "The GIF format was created by CompuServe in 1987, led by computer scientist Steve Wilhite. It was initially designed as a lightweight image format for downloading files across slow dial-up connections."
    },
    {
      question: "Is GIF lossless?",
      answer: "Yes, the compression algorithm (LZW) is lossless. However, the color reduction (from millions of colors down to 256) is lossy, which means image color detail is permanently discarded when creating the palette."
    },
    {
      question: "Can I duplicate frames?",
      answer: "Yes. In the timeline frame list, clicking the 'Duplicate' button on a frame will copy all its canvas data, rotation state, and text overlays, adding it as a consecutive new frame."
    },
    {
      question: "What are the common frame durations?",
      answer: "Websites and ads typically run at 10 to 15 frames per second (FPS), which equals a frame delay of 70ms to 100ms. Slideshows typically use a delay of 1000ms to 3000ms per frame."
    },
    {
      question: "Does the tool support mobile gesture drag and drop?",
      answer: "Yes. The timeline bar supports mobile touch gestures, allowing you to rearrange, edit, and duplicate frames on tablets and smartphones."
    },
    {
      question: "Why does my browser freeze during conversion?",
      answer: "Since processing happens locally, encoding large files or many frames consumes CPU power. We run the encoding loop asynchronously with yielding timeouts to prevent browser lockups."
    },
    {
      question: "Can I customize the color palette?",
      answer: "Our quantizer automatically extracts the best color palette. You can adjust the quality presets to configure how detailed the palette sampling should be."
    },
    {
      question: "What is an animated GIF's aspect ratio?",
      answer: "The aspect ratio is determined by your canvas dimensions. By default, it adapts to the first uploaded frame's size. You can apply crop presets to enforce specific dimensions."
    },
    {
      question: "Can I add borders to my GIF?",
      answer: "Currently, our editor supports text overlays, watermarks, resizing, and cropping. Frame borders can be added by editing the canvas backgrounds before importing."
    },
    {
      question: "Does the GIF loop automatically on websites?",
      answer: "Yes, as long as the repeat count is set to 'Infinite' (default), standard web browsers and image viewers will loop the GIF automatically."
    },
    {
      question: "Is there a limit to the image resolution?",
      answer: "We support photos up to 4K resolution. However, high resolutions will slow down LZW encoding. We recommend resizing frames to 600px-800px width for fast loading."
    },
    {
      question: "Can I convert video files to GIF?",
      answer: "This version is designed specifically for image-to-GIF conversion. Video file decoding (MP4/WebM) is part of our future roadmap and will be included in subsequent updates."
    },
    {
      question: "What is a global color table?",
      answer: "The global color table is a master list of colors that applies to the entire GIF file. If a frame has custom colors that are not present in the global table, it must define a local color table, which increases file size."
    },
    {
      question: "What is a local color table?",
      answer: "A local color table is an independent color list stored inside a specific frame block. It allows that frame to display colors outside of the global palette, but adds 768 bytes of metadata per frame."
    },
    {
      question: "How do I copy my GIF directly to clipboard?",
      answer: "Once generated, you can right-click the preview image and select 'Copy Image' to copy the GIF directly, allowing you to paste it into chat apps or documents."
    },
    {
      question: "Does the tool support dark theme layout?",
      answer: "Yes. The interface matches your system's light/dark system, adjusting background colors and borders automatically."
    },
    {
      question: "Can I restore my progress if I close the tab?",
      answer: "No. Since all operations run locally in temporary browser memory, closing the tab clears the active queue. Save your work before leaving the page."
    },
    {
      question: "Where can I view the project guidelines?",
      answer: "Documentation regarding advanced features, presets, sitemaps, and integrations is stored in the workspace repository."
    }
  ],
  longDescription: `
## The Definitive Guide to Animated GIF Creation: Formats, Compression, and Optimization

The Graphics Interchange Format (GIF) holds a unique place in web history. Despite being decades old, it remains the universal standard for looping animations, short memes, and lightweight web graphics. This guide details the structural specifications, compression algorithms, and design workflows required to create optimized, high-fidelity GIFs directly in the browser.

---

### Anatomy of a GIF: Understanding the Specifications

A GIF file is not a single contiguous image but a structured stream of binary data blocks. Under the **GIF89a specification**, the file structure is laid out sequentially:

\`\`\`mermaid
graph TD
    A[GIF Header - GIF89a] --> B[Logical Screen Descriptor]
    B --> C[Global Color Table]
    C --> D[Netscape Application Looping Extension]
    D --> E[Graphic Control Extension Frame 1]
    E --> F[Image Descriptor Frame 1]
    F --> G[LZW Compressed Raster Data Frame 1]
    G --> H[Graphic Control Extension Frame 2]
    H --> I[Image Descriptor Frame 2]
    I --> J[LZW Compressed Raster Data Frame 2]
    J --> K[GIF Trailer - 0x3B]
\`\`\`

#### 1. The Header and descriptors
- **Header**: The first 6 bytes specify the format signature (always \`GIF\`) and version (either \`87a\` or \`89a\`).
- **Logical Screen Descriptor**: Specifies the width and height of the canvas, global color table flags, and aspect ratio parameters.
- **Global Color Table (GCT)**: A list of RGB values defining the color palette used by default across all frames.

#### 2. Frame Extensions and blocks
- **Graphic Control Extension (GCE)**: Precedes each frame descriptor. It defines the frame's delay time (in 1/100ths of a second), transparency index, and disposal method.
- **Image Descriptor**: Specifies the frame's coordinates (left, top) and dimensions (width, height) on the canvas, as well as optional local color tables.
- **Raster Data**: The actual pixel indices, compressed using the **LZW algorithm**.
- **Trailer**: A single byte (\`0x3B\`) indicating the end of the file.

---

### Lossless LZW Compression: How It Works

GIF files use the **Lempel-Ziv-Welch (LZW) algorithm** to compress image data. LZW is a lossless dictionary-based compression method:

1. **Dictionary Initialization**: The encoder initializes a dictionary containing all possible single-pixel color index values (0 to 255).
2. **String Matching**: As the encoder scans pixels sequentially, it searches the dictionary for the longest color index sequence that matches the input.
3. **Index Writing**: If the sequence is found, it updates the active string. If it encounters a new sequence, it outputs the code for the existing match and adds the new combination to the dictionary.
4. **Variable Bit Lengths**: Codes start at 3 to 9 bits and expand dynamically up to 12 bits as the dictionary grows. When the dictionary reaches 4096 entries, the encoder writes a Clear Code to reset the dictionary.

Because LZW relies on repeating patterns, flat color designs and horizontal stripes compress exceptionally well. High-noise images (like photos with grain or gradients) create few repeating sequences, resulting in much larger file sizes.

---

### Optimization Techniques: Reducing GIF File Size

Because animated GIFs can quickly grow to several megabytes, optimization is critical for web performance and SEO:

#### 1. Frame Disposal Methods
The Graphic Control Extension defines what to do with the previous frame before drawing the next one:
- **Disposal Method 1 (Do Not Dispose)**: The new frame is drawn on top of the previous one. This is ideal for optimizing animations with static backgrounds—you only need to render the changing pixels in subsequent frames, leaving the rest of the canvas untouched, which significantly reduces file sizes.
- **Disposal Method 2 (Restore to Background)**: The canvas is cleared to the background color before rendering the next frame. Required for moving transparent objects.

#### 2. Color Quantization and Dithering
Since GIFs are limited to 256 colors, converting a full-color image requires quantization:
- **Quantization**: Maps millions of colors to a smaller palette. Techniques like **K-Means clustering** or **Median Cut** yield the best visual representation.
- **Dithering**: Blends pixel colors to hide banding artifacts. However, dithering introduces high-frequency noise, which disrupts LZW patterns and increases file size. For web optimization, minimal dithering is recommended.

| Optimization Parameter | Impact on File Size | Visual Tradeoff |
| :--- | :--- | :--- |
| **Lowering Frame Count** | Linear reduction | Less fluid animation (choppy FPS) |
| **Reducing Color Count (e.g. 64)** | High reduction (up to 50%) | Simpler colors, potential color banding |
| **Crop/Resize Dimensions** | Quadratic reduction | Smaller display dimensions |
| **No Dithering** | Moderate reduction (10-20%) | Flat colors, sharp gradient transitions |
| **Using 'Do Not Dispose'** | High reduction on static templates | None (preserves background pixels) |

---

### Step-by-Step GIF Creation Guide

Follow these steps to create optimized animated GIFs:

1. **Upload Source Frames**: Drop your PNG, JPG, or WebP files into the timeline drop zone.
2. **Arrange the Sequence**: Drag and drop frames in the bottom timeline bar to adjust the animation order.
3. **Set Timing Parameters**:
   - For fluid web graphics, use a delay of **80ms to 100ms** (10-12 FPS).
   - For slideshows, increase the delay to **1500ms to 3000ms**.
4. **Configure Dimensions**: Choose a social media aspect ratio preset or crop/resize manually.
5. **Apply Captions or Watermarks**: Enter text inside the Meme panel or Watermark panel to draw overlays onto the canvas.
6. **Compile and Download**: Choose the target quality level, let the local LZW encoder process the queue, and save the resulting animated GIF.
`
};
