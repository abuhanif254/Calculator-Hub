import { ToolConfig } from './types';

export const memeGeneratorConfig: ToolConfig = {
  slug: "meme-generator",
  title: "Meme Generator",
  shortDescription: "Create viral custom memes online using popular templates or your own images. Add draggable captions, custom fonts, emojis, canvas filters, and crop ratios. 100% free and local.",
  category: "Image Tools",
  keywords: [
    "meme generator",
    "meme maker",
    "create meme online",
    "funny meme creator",
    "free meme generator",
    "image meme maker",
    "social media meme creator",
    "meme templates",
    "viral meme generator",
    "online meme editor"
  ],
  features: [
    "Dozens of classic and trending meme templates pre-loaded with automated caption positioning",
    "Upload custom images (PNG, JPG, WEBP) or create from scratch with a blank canvas",
    "Interactive Canvas Workspace supporting dragging, scaling, rotating, and stacking text layers and emoji stickers",
    "Multiple layout styles: Classic Impact overlay, Modern (Reddit/Instagram) top-text, and TikTok rounded pill boxes",
    "Complete text customization: Font Family, size, weight, color, outline stroke, shadow, and opacity",
    "Comprehensive canvas filters: Brightness, Contrast, Saturation, Blur, Rotation, and Flips",
    "Social media crops: Instagram 1:1, Stories 9:16, Facebook 1200x630, Twitter 16:9, and custom presets",
    "Export to PNG, JPG, or WEBP at full resolution matching original upload sizes",
    "100% Client-Side privacy—your images are processed locally, never uploaded to any server"
  ],
  useCases: [
    "Creating humorous engaging content for social media channels (Twitter/X, Instagram, Reddit)",
    "Generating custom memes, inside jokes, and reaction templates for group chats and developer teams",
    "Prototyping mockups, marketing graphics, and custom illustration compositions in browser",
    "Redacting and annotating images with text bubbles, arrows, and custom shapes locally",
    "Deconstructing classic templates to study visual communication structures and layouts"
  ],
  howToSteps: [
    "Select a popular meme template from the library, or upload your own image file.",
    "Choose your preferred Layout Style (e.g. Classic Impact Overlay, Modern Top-Text, or TikTok style).",
    "Type your top and bottom captions inside the text editor fields, or click 'Add Text Layer' for custom text blocks.",
    "Drag the captions directly on the canvas to reposition them. Adjust fonts, outlines, and colors using the customization panel.",
    "Optional: Stamp emoji stickers, shapes, or speech bubbles onto the canvas and adjust their scale and rotation.",
    "Apply image adjustments like brightness or blur, select your social crop preset, and click 'Download Meme'."
  ],
  relatedTools: [
    { name: "Watermark Image", slug: "watermark-image" },
    { name: "Crop Image", slug: "crop-image" },
    { name: "Resize Image", slug: "image-resizer" },
    { name: "Compress Image", slug: "compress-image" },
    { name: "AI Image Generator", slug: "ai-image-generator" }
  ],
  examples: [],
  faq: [
    {
      question: "What is a Meme Generator?",
      answer: "A meme generator is an interactive image editing tool that allows users to quickly add text captions, emojis, stamps, or layouts to popular templates or custom uploaded images, producing humorous or satirical graphics for sharing online."
    },
    {
      question: "How do I make a meme online for free?",
      answer: "You can make a meme for free using this tool. Simply choose a template or drag and drop your own image. Type your captions, drag them to the desired position, style the text, and click 'Download Meme'. No registration or payment is required."
    },
    {
      question: "Is my uploaded image saved on a server?",
      answer: "No. Your privacy is our priority. This tool operates 100% locally in your web browser. No files are uploaded to our servers. All drawing, filtering, and exporting happen in your browser's local sandbox memory."
    },
    {
      question: "Which image formats are supported?",
      answer: "We support uploading PNG, JPG, JPEG, WEBP, and static GIF formats. You can also export your finished meme as a PNG, JPG, or WEBP file."
    },
    {
      question: "Can I paste an image from my clipboard?",
      answer: "Yes, you can copy any image from the web or your device (Ctrl+C) and press paste (Ctrl+V) directly on our tool page. It will automatically load the pasted image into the editing canvas."
    },
    {
      question: "What is the Classic Meme style?",
      answer: "The Classic Meme style overlays white, bold text on the top and bottom of the image. It traditionally uses the 'Impact' font in uppercase, outlined with a thick black stroke to make the letters readable on any background color."
    },
    {
      question: "What is the Modern Meme style?",
      answer: "The Modern Meme style (popularized on Reddit, Instagram, and Twitter) places a clean white block above the image, containing the joke or caption in black, sans-serif font (such as Arial or Inter). The original image is displayed below the text."
    },
    {
      question: "What is the TikTok Style?",
      answer: "The TikTok Style overlays text in a rounded, semi-transparent black rectangular capsule directly on the image, simulating the native look of text boxes in short-form mobile videos."
    },
    {
      question: "Can I add multiple text layers?",
      answer: "Yes, you are not limited to just top and bottom text. You can click the 'Add Text Block' button to create new individual text layers, which can be dragged, resized, and colored independently."
    },
    {
      question: "How do I move text or stickers on the canvas?",
      answer: "Simply click and drag the text or sticker directly on the preview canvas. If you are on a mobile device, you can use standard touch gestures to drag, scale, or rotate elements."
    },
    {
      question: "How do I adjust image settings like brightness or contrast?",
      answer: "Select the 'Adjustments' panel in the sidebar. You will find sliders to alter Brightness, Contrast, Saturation, Blur, Rotation, and Flips. These adjustments are applied immediately in real-time."
    },
    {
      question: "Can I crop or rotate my background image?",
      answer: "Yes, the editor supports cropping, rotating, and flipping the background image before you add captions and stickers, ensuring your canvas fits standard aspect ratios."
    },
    {
      question: "What are social media presets?",
      answer: "Social media presets are pre-set crop ratios that match standard dimensions for major networks, including Instagram Post (1:1), Stories (9:16), Facebook Post (1200x630), Twitter/X Post (16:9), and LinkedIn."
    },
    {
      question: "How do I make a meme transparent?",
      answer: "If you upload a transparent PNG as your background image or choose the 'Blank Canvas' mode, you can select the transparent background setting in the canvas configuration. The transparent regions will be preserved when you export as a PNG."
    },
    {
      question: "What is the Blank Canvas mode?",
      answer: "Blank Canvas mode creates a clean solid-color or transparent background of custom dimensions, allowing you to design text layouts, collages, or vector illustrations from scratch."
    },
    {
      question: "Can I use this tool on my phone?",
      answer: "Yes, the interface is fully mobile-responsive. Editing panels collapse into a swipeable menu on mobile devices, and the canvas supports standard mobile touch drag gestures."
    },
    {
      question: "Can I use custom fonts?",
      answer: "We support a variety of classic web-safe and Google Fonts, including Impact, Arial, Inter, Comic Sans, Montserrat, Playfair Display, and Courier Prime, covering styles from retro to elegant."
    },
    {
      question: "How do I export my meme in high resolution?",
      answer: "Our export system renders your canvas on an offscreen high-resolution buffer matching the original dimensions of your uploaded image. This ensures your downloaded file retains maximum clarity and does not look blurry."
    },
    {
      question: "Does this tool support animated GIFs or MP4 videos?",
      answer: "The current version supports static images. Support for importing and exporting animated GIFs and MP4 video clips is planned for future updates."
    },
    {
      question: "What is the Impact font and why is it used for memes?",
      answer: "Impact is a sans-serif typeface designed by Geoffrey Lee in 1965. It is known for its thick, bold, and compressed letterforms, which were highly legible when overlaid on television screens. In the early 2000s, it became the default font for internet memes due to its high visibility on image-sharing platforms."
    },
    {
      question: "How do I copy my finished meme to my clipboard?",
      answer: "After editing, you can click the 'Copy to Clipboard' button. The tool converts the canvas into an image blob and copies it to your system clipboard, allowing you to paste it directly into Discord, Slack, or social media chats."
    },
    {
      question: "Are there any watermarks on the downloaded images?",
      answer: "No. Unlike other meme creators, our tool does not add any watermarks. Your downloads are clean, unbranded images."
    },
    {
      question: "How do I reload a draft I was working on?",
      answer: "The tool automatically saves your current canvas state in your browser's LocalStorage. If you reload the page, you can click 'Resume Project' to reload your active layers, image, and settings."
    },
    {
      question: "Can I create meme templates of my own?",
      answer: "Yes, you can upload your custom base image, set up the text layers, and then save it to your local 'Favorite Templates' archive. This allows you to quickly load it as a starter template in future sessions."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes. Once the page is loaded and cached in your browser, all assets, scripts, fonts, and emojis run locally. You can disconnect from the internet and still create, edit, and export memes."
    },
    {
      question: "How do I align text layers perfectly?",
      answer: "The canvas features automatic snap guides and alignment buttons (Center horizontally, Center vertically, Align top, Align bottom) to help you position your captions with pixel-perfect precision."
    },
    {
      question: "What is a meme template library?",
      answer: "It is a collection of popular blank meme formats (e.g. Drake Hotline, Distracted Boyfriend, Two Buttons) that users commonly download to overlay their own custom captions."
    },
    {
      question: "Can I add emojis to my memes?",
      answer: "Yes, we provide an Emoji Library picker that lets you stamp common emojis (smileys, reactions, icons) onto the canvas as draggable sticker layers."
    },
    {
      question: "Why is my text outline so thick?",
      answer: "You can adjust the Stroke Width slider in the Text Settings panel to reduce the thickness of the caption borders, or turn off outlines completely."
    },
    {
      question: "How do I bring a layer to the front?",
      answer: "Open the Layers Panel on the right side. You will see a list of all text and sticker layers. Drag the layer items up or down to change their stacking order (z-index)."
    },
    {
      question: "What is the optimal aspect ratio for Instagram memes?",
      answer: "Instagram posts are best optimized at a 1:1 square ratio (1080x1080 pixels). Instagram stories and Reels are optimized at 9:16 vertical ratio (1080x1920 pixels)."
    },
    {
      question: "What is the optimal size for Twitter memes?",
      answer: "Twitter (X) displays images best at a 16:9 landscape aspect ratio (typically 1600x900 pixels) to prevent crop preview distortion on the feed."
    },
    {
      question: "Can I use these memes in advertisements?",
      answer: "Yes, you have full ownership of your exported images. However, if your meme utilizes copyrighted media (like frames from movies, video games, or stock images), using it in paid advertisements carries copyright infringement risks depending on fair use laws."
    },
    {
      question: "What is Fair Use in the context of memes?",
      answer: "Fair Use is a legal doctrine in copyright law that permits limited use of copyrighted material without acquiring permission from the rights holders. Memes generally fall under 'parody', 'commentary', or 'transformative' use, which are covered by Fair Use, especially for non-commercial sharing."
    },
    {
      question: "How do search engines index my meme?",
      answer: "We automatically generate structured metadata (SoftwareApplication, WebApplication, HowTo, FAQPage) for our generator page to make it indexable and optimized for search engine featured snippets."
    },
    {
      question: "Is there any limit on how many memes I can create?",
      answer: "No. Since all processing happens in your browser RAM without hitting remote server thresholds, there are no generation limits, daily quotas, or paywalls."
    },
    {
      question: "How do I clear my history in this tool?",
      answer: "Go to the Settings panel and click 'Clear History'. This will purge all saved drafts, favorite templates, and history entries from your browser's local memory."
    },
    {
      question: "What is the difference between PNG and JPEG export?",
      answer: "PNG is a lossless format that supports transparent backgrounds, making it best for high-quality edits. JPEG is a compressed format that results in smaller file sizes, which is ideal for sharing on networks with strict size limits."
    },
    {
      question: "What is WEBP export?",
      answer: "WEBP is a modern image format developed by Google that provides superior lossless and lossy compression. It supports transparent backgrounds and produces smaller file sizes than PNG, making it excellent for web loading."
    },
    {
      question: "Can I write text in multiple lines?",
      answer: "Yes. The text input box supports multiline typing. You can press Enter to start a new line of text, and the canvas will wrap and center the text accordingly."
    },
    {
      question: "What is the Drake Hotline meme?",
      answer: "The Drake Hotline meme is a classic two-panel template showing rapper Drake turning away in disgust in the top panel, and smiling in approval in the bottom panel. It is used to compare two options."
    },
    {
      question: "What is the Distracted Boyfriend meme?",
      answer: "The Distracted Boyfriend meme is a viral stock photograph showing a man looking back at another woman while his girlfriend looks on in disapproval. It is used to symbolize temptation or distraction."
    },
    {
      question: "What is the Two Buttons meme?",
      answer: "The Two Buttons meme shows a cartoon character sweating while trying to decide between two red buttons. It is used to illustrate a difficult decision."
    },
    {
      question: "How do I reset my text position?",
      answer: "You can click the 'Reset Layout' or 'Center' alignment buttons in the text settings drawer to instantly return a caption to its default centered location."
    },
    {
      question: "Why do some fonts not render correctly?",
      answer: "Some custom Google Fonts require a network connection to load on the initial page load. Once loaded, they are cached and can be used offline. Web-safe fonts like Arial, Courier, and Impact will always render correctly."
    },
    {
      question: "Can I add speech bubbles to characters?",
      answer: "Yes, you can select Speech Bubbles from our Stickers and Elements library, position them over a character's head, and add a custom text layer inside the bubble."
    },
    {
      question: "Does this tool support AI captions?",
      answer: "Our current release focuses on manual layout tools. AI-assisted caption generation and layout suggestions are planned for future updates."
    },
    {
      question: "What is the maximum file size for uploaded images?",
      answer: "There is no strict limit, but we recommend keeping uploads under 20MB to prevent browser tab performance degradation during canvas operations."
    },
    {
      question: "Can I undo or redo my edits?",
      answer: "Yes, the editor maintains a history stack of your operations (adding text, moving layers, applying filters). You can click 'Undo' or 'Redo' to revert edits."
    },
    {
      question: "Is this tool accessible for screen readers?",
      answer: "Yes, the page is built using semantic HTML5 elements, keyboard tab indexing, and clear ARIA labels for all interactive sliders, inputs, and preset buttons."
    }
  ],
  longDescription: `
# Complete Guide to Online Meme Creation: Visual Communication, Typography, and Local Web Editors

Internet memes have evolved from simple forum jokes into a dominant form of global visual communication. Used by individual creators, digital marketers, corporate brands, and developers, memes summarize complex social commentaries, inside jokes, and educational explanations into a single, easily shareable image. Designing memes that go viral requires a balance of timing, humor, and layout design.

This guide provides a comprehensive, highly technical analysis of internet iconography, deconstructs popular layouts, details the typography choices behind viral content, and explains the client-side canvas architecture of our **Meme Generator Studio**.

---

## 1. The Anatomy of a Viral Meme: Layouts and Aesthetics

A meme's visual structure determines how quickly a reader comprehends the joke as they scroll through their feed. Different layouts evoke different social contexts and are suited for different platforms.

### The Classic Overlay (Impact Style)
The oldest standardized layout overlays text directly on top of the image. The text is placed at the absolute top and bottom of the frame.
*   **Visual Style**: Uppercase, thick black outlines, centered alignment.
*   **Font**: Impact.
*   **Best For**: Classic templates, reaction faces, and quick jokes.

### The Modern Top-Text Layout (Reddit/Twitter Style)
This layout adds a solid white border or header block above the image. The text is left-aligned or centered inside this block.
*   **Visual Style**: Clean, high-contrast black text on a white background.
*   **Font**: Sans-serif (such as Arial, Helvetica, or Inter).
*   **Best For**: Conversational jokes, situational stories, and screenshots.

### The TikTok Capsule Style
Popularized by short-form mobile videos, this layout overlays text inside a dark, semi-transparent capsule with rounded corners.
*   **Visual Style**: Inline styling directly over the center of the image.
*   **Font**: Clean sans-serif.
*   **Best For**: Direct labeling, mobile screens, and quick visual callouts.

### Social Media Presets Table

When designing memes, matching the correct aspect ratio prevents platforms from cropping out your text:

| Platform | Recommended Aspect | Dimensions (Pixels) | Application |
| :--- | :--- | :--- | :--- |
| **Instagram Post** | \`1:1\` | 1080 x 1080 | Grid Feed |
| **Instagram Story** | \`9:16\` | 1080 x 1920 | Full-screen Mobile |
| **Facebook Post** | \`1200:630\` | 1200 x 630 | Shared Link / Image |
| **Twitter/X Feed** | \`16:9\` | 1600 x 900 | Timeline Image |
| **LinkedIn Post** | \`1200:627\` | 1200 x 627 | Article Thumbnail |

---

## 2. Typography in Memes: Why Font Choices Matter

A meme's font is as much a part of its message as the words themselves. Using the wrong font can make a meme feel outdated or out of place.

### The Rise of Impact
The **Impact** font was designed in 1965 by Geoffrey Lee. It is a sans-serif typeface characterized by its thick stroke widths, tight letter spacing, and tall x-height. These attributes maximize readability, even when superimposed over busy backgrounds. In the early 2000s, standard internet sharing forums adopted it because of its high legibility. Today, it remains the standard symbol of classic web humor.

### The Transition to Clean Sans-Serifs
As memes transitioned to platforms like Twitter and Instagram, the aesthetic shifted toward a cleaner look. Modern creators prefer **Arial**, **Helvetica**, or **Inter**. These fonts mimic the native text layouts of mobile applications, making the meme feel like a natural screenshot or message rather than a heavily edited image.

### Creative Alternatives
For specific aesthetics, creators use:
*   **Comic Sans**: Used to evoke irony, childishness, or playfulness (standard in the "Doge" meme).
*   **Courier Prime**: Monospaced font used to simulate terminal code printouts or retro typewriters, popular in developer and tech memes.
*   **Playfair Display**: Elegant serif font used to mock luxury, mock high-status, or simulate historical documents.

---

## 3. Image Editing and Canvas Filters in the Browser

Creating a meme often requires adjusting the source image to match the mood of the caption. Our Meme Generator provides built-in canvas filters that run directly in your browser:

### Brightness & Contrast
Adjusting brightness and contrast can heighten the emotional impact of a template. For example, high-contrast, over-saturated adjustments (often called "deep-fried") are popular in surreal memes.

### Saturation & Desaturation
Desaturating an image to grayscale is a standard way to represent sadness, defeat, or dramatic tension (common in reaction memes).

### Radial and Linear Blurs
Applying a blur to specific layers or the background can create a sense of motion or depth, helping to draw attention to your text overlays.

---

## 4. Canvas Architecture: How Client-Side Rendering Works

Our **Meme Generator Studio** operates entirely inside your local browser sandbox, using HTML5 Canvas APIs and React state synchronization:

1.  **Image Loading**: The user selects a template or uploads their own file. The \`File\` object is read into local memory as a data URL, and an offscreen \`HTMLImageElement\` is initialized.
2.  **Layer Stacking**: The editor maintains an array of layers (background image, custom text layers, and sticker objects) stored in the React state.
3.  **Real-Time Compositing**: Whenever a slider value, text field, or coordinate changes, the tool clears the offscreen canvas and redraws the layers in order (z-index):
    *   **Step 1**: Draws the background image, applying any active CSS filters (e.g. \`ctx.filter = "brightness(110%)"\`).
    *   **Step 2**: Draws guides and grid lines if active.
    *   **Step 3**: Draws emoji stickers, applying scale and rotation vectors using canvas transformations (\`ctx.translate\`, \`ctx.rotate\`).
    *   **Step 4**: Draws text layers, calculating line wraps, custom stroke offsets, and drop shadows.
4.  **Interactive Mouse/Touch Handlers**: The canvas element is overlayed with transparent trigger areas that track mouse movements and touch gestures. When a user clicks near a layer's bounding box, it registers as selected, enabling real-time dragging, resizing, or deletion.
5.  **High-Resolution Export**: When the user clicks download, the compositing pipeline executes on a full-size offscreen canvas matching the original file's metadata instead of the screen preview size, ensuring a sharp, pixel-perfect PNG or JPEG download.

---

## 5. Legality, Fair Use, and Copyright Safety

A common concern for creators and brands is: *Is it legal to use memes?*

### Fair Use Doctrine
In copyright law, **Fair Use** permits the unauthorized use of copyrighted materials for purposes such as criticism, commentary, news reporting, teaching, scholarship, or research. Memes are generally considered a form of parody, critique, or transformation, which places them under the protection of Fair Use.

### Guidelines for Brand Marketing
While individual creators face minimal copyright risks, brands using memes for commercial advertisements should follow these guidelines:
1.  **Avoid Movie/TV Frames**: Using frames from movies or video games in paid advertisements carries copyright risks.
2.  **Use Public Domain or Custom Images**: Upload your own custom imagery or royalty-free templates.
3.  **Add Significant Transformation**: Combine templates with custom text overlays to ensure the final output is a transformative parodic commentary.
`
};
