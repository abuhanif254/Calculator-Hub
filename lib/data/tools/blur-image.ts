import { ToolConfig } from './types';

export const blurImageToolConfig: ToolConfig = {
  slug: "blur-image",
  title: "Blur Image",
  shortDescription: "Blur photos, censor faces, obscure license plates, and blur backgrounds online. 100% free, private local browser-based image blur editor.",
  category: "Image Tools",
  keywords: [
    "blur image",
    "blur photo",
    "blur background",
    "gaussian blur tool",
    "blur faces online",
    "hide sensitive information in image",
    "online blur tool",
    "blur background online",
    "blur photo editor",
    "image blur tool",
    "blur picture online",
    "gaussian blur image",
    "bokeh blur photo",
    "censor image online",
    "portrait blur effect"
  ],
  features: [
    "Full image blur, localized area blur, background blur, and face blur",
    "Multiple blur styles: Gaussian, Box, Motion, Lens, Bokeh, and Soft Focus",
    "AI-assisted face detection and background segmentation (processed entirely locally)",
    "Adjustable blur intensity slider (0-100%) and area selection shape tools",
    "Real-time Before/After split comparison slider",
    "Zoom, pan, and interactive canvas navigation",
    "Batch processing for multiple images simultaneously",
    "100% Client-side privacy—images are processed in your browser, never uploaded to any server"
  ],
  useCases: [
    "Obscuring faces or identities of individuals in photos before sharing publicly",
    "Redacting sensitive documents, tax forms, credit cards, or passwords in screenshots",
    "Hiding car license plates, street signs, and house numbers for privacy compliance",
    "Creating a shallow depth of field (bokeh background) for professional portraits or product photos",
    "Applying creative motion blur, lens flare blur, or dreamy soft focus glow to artistic photos",
    "Batch processing sets of images with uniform privacy censoring"
  ],
  howToSteps: [
    "Upload one or more images using the Drag & Drop area or File Browser.",
    "Choose your Blur Mode (Full Image, Area Blur, Background Blur, or Face Blur).",
    "Select your Blur Type (e.g., Gaussian, Motion, Bokeh) and adjust the intensity slider.",
    "Use the Rectangle, Circle, or Brush tools to draw precise blur zones over sensitive areas.",
    "Click the Before/After slider to preview your changes in real-time.",
    "Choose export format (JPG, PNG, or WEBP) and quality level, then click 'Download Image'."
  ],
  relatedTools: [
    { name: "Pixelate Image", slug: "pixelate-image" },
    { name: "Blur Faces in Image", slug: "blur-faces-in-image" },
    { name: "Remove Background", slug: "background-remover" },
    { name: "Crop Image", slug: "crop-image" },
    { name: "Image Converter", slug: "image-converter" }
  ],
  examples: [],
  faq: [
    {
      question: "Is it safe to upload my private images to this tool?",
      answer: "Yes, it is 100% safe. This tool operates entirely inside your web browser using HTML5 Canvas APIs, WebAssembly, and local JavaScript. Your images are never uploaded to our servers, nor are they transmitted anywhere over the network. Your data remains completely on your local device."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes. Once the page is loaded, all scripts and models are cached in your browser. You can disconnect from the internet and continue using the tool to blur images, detect faces, and export files completely offline."
    },
    {
      question: "What is Gaussian Blur?",
      answer: "Gaussian Blur is an image-blurring filter that uses a Gaussian function (which resembles a bell curve) for calculating the transformation to apply to each pixel in the image. It creates a smooth, organic blur that resembles viewing the image through a translucent screen, making it ideal for obscuring details softly."
    },
    {
      question: "What is the difference between Gaussian Blur and Box Blur?",
      answer: "Gaussian Blur uses a weighted average of surrounding pixels based on a bell curve distribution, producing very smooth transitions. Box Blur uses a simple arithmetic average of a rectangular neighborhood of pixels. Box Blur is faster to compute but results in blockier, less organic edges compared to Gaussian Blur."
    },
    {
      question: "How does the AI background blur work?",
      answer: "Our tool utilizes a local AI model (@imgly/background-removal) that performs semantic segmentation on the client side. It runs a deep neural network to isolate the primary subject (person or object) from the background, generates a transparent mask, blurs the original background image, and composites the sharp subject on top."
    },
    {
      question: "Does the AI background remover upload my photo to segment it?",
      answer: "No. The AI model is downloaded directly to your browser once (about 20-30MB) and runs locally on your computer's CPU or GPU using WebGL. Your photos never leave your device."
    },
    {
      question: "How does the Face Detection mode find faces?",
      answer: "It uses Vlad Mandic's face-api library, which is a lightweight implementation of TensorFlow.js. It loads a pre-trained neural network (Tiny Face Detector) directly into your browser memory to scan the image canvas and returns bounding box coordinates for all detected faces."
    },
    {
      question: "Can I selectively unblur certain faces after auto-detecting them?",
      answer: "Yes. After running the auto-detection, the tool displays boundary boxes over the detected faces. You can click the delete button on individual bounding boxes to remove the blur from specific faces while leaving others obscured."
    },
    {
      question: "What is Motion Blur?",
      answer: "Motion blur simulates the effect of camera movement or fast-moving subjects by averaging pixels along a specific linear direction. It is great for creating a sense of speed, action, or dynamic movement in your design projects."
    },
    {
      question: "What is Lens Blur?",
      answer: "Lens Blur (also called Depth of Field blur) simulates the optical characteristics of a physical camera lens. It blurs out-of-focus areas in a circular pattern, mimicking how light scatters when it passes through a lens aperture."
    },
    {
      question: "What is Bokeh Blur?",
      answer: "Bokeh Blur is a stylistic effect that highlights out-of-focus light sources. It overlays bright, circular or polygonal translucent shapes on top of blurred areas, creating a high-end aesthetic common in night photography and cinematic shots."
    },
    {
      question: "What is Soft Focus Blur?",
      answer: "Soft Focus is an artistic effect where a heavily blurred version of the image is blended back on top of the sharp original image using a screen or linear blend mode. This retains core structural details while wrapping them in a dreamy, glowing haze."
    },
    {
      question: "What image formats are supported for input?",
      answer: "The tool supports standard web image formats: JPEG (JPG), PNG, WEBP, BMP, and static GIF. It is also architected to support next-generation formats like AVIF, HEIC, and TIFF when supported by your browser."
    },
    {
      question: "Can I blur animated GIFs?",
      answer: "Currently, the tool only supports static images. If you upload an animated GIF, it will extract and blur the first frame as a static image. Full video and animated GIF blurring are planned for future updates."
    },
    {
      question: "What are the export options?",
      answer: "You can export your blurred images in PNG, JPEG (JPG), or WEBP formats. You can also customize the export quality (Standard, High, Maximum) to balance image fidelity and file size."
    },
    {
      question: "Which export format should I choose for censored screenshots?",
      answer: "We highly recommend PNG. PNG is a lossless format, which prevents compression artifacts. Compression artifacts in JPG can sometimes cause text characters to smudge, making it slightly easier for advanced filters to reverse-engineer blurred text."
    },
    {
      question: "Is it possible to undo or reverse a blur on a downloaded image?",
      answer: "No. Once you download the blurred image, the pixels are permanently overwritten and re-saved. The original pixel data beneath the blur is completely destroyed and cannot be recovered, reconstructed, or unblurred by any tool, ensuring your privacy is absolute."
    },
    {
      question: "Can I undo edits while editing in the dashboard?",
      answer: "Yes. The editor maintains an internal history stack (Undo/Redo) for the current session. You can click 'Undo' to revert your last blur box, stroke, or preset change, but this history is lost once you close the tab."
    },
    {
      question: "Is there a limit on how many images I can process?",
      answer: "No. There are no daily limits, paywalls, or watermarks. You can process as many images as you need for free."
    },
    {
      question: "What is the default blur type?",
      answer: "The default blur type is Gaussian Blur. It is the industry standard for fast, high-quality, and secure censorship."
    },
    {
      question: "How is privacy guaranteed?",
      answer: "We guarantee privacy because the tool does not communicate with any external backend to process the image. All computations are done in the memory of your local device by your browser engine."
    },
    {
      question: "Are there any hidden costs?",
      answer: "No. Our utility platform is funded through web ads, meaning all tools are completely free to use without limits or account creation."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes. Once the page is loaded, all scripts and models are cached in your browser. You can disconnect from the internet and continue using the tool to blur images, detect faces, and export files completely offline."
    },
    {
      question: "Is this tool suitable for enterprise compliance?",
      answer: "Yes, our zero-upload policy makes this tool ideal for lawyers, journalists, and enterprises that must comply with strict data privacy and confidentiality regulations."
    },
    {
      question: "How do I know the metadata is really gone?",
      answer: "You can download the cleaned image and run it through our 'Image Metadata Viewer' tool, or any other EXIF reader, to verify that the file is completely clean."
    },
    {
      question: "Does cropping a photo remove metadata?",
      answer: "It depends. Professional tools like Photoshop usually preserve EXIF data when cropping. Simple phone editors might strip it. It's always best to use a dedicated metadata remover to be sure."
    },
    {
      question: "What is IPTC data?",
      answer: "IPTC data is a metadata standard used primarily by photojournalists to embed copyright notices, author credits, and captions. Our tool removes IPTC data as well."
    },
    {
      question: "Why do my downloaded files have new names?",
      answer: "Our tool appends '-blurred' to the original filename so you don't accidentally overwrite your original, unedited photo."
    },
    {
      question: "Are thumbnail images removed?",
      answer: "Yes. Cameras often embed a small thumbnail of the original photo inside the EXIF data. Our tool removes this embedded thumbnail, which also helps reduce the file size."
    },
    {
      question: "Do you support RAW image formats?",
      answer: "Currently, we focus on standard web and sharing formats (JPG, PNG, WEBP, TIFF). RAW formats (like .CR2, .NEF) are meant for editing and should be exported to JPG before metadata removal."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes. Because it functions as a Progressive Web App (PWA), once the page is fully loaded, you can disconnect from the internet and the tool will still safely process your files locally."
    },
    {
      question: "Is this tool suitable for enterprise compliance?",
      answer: "Yes, our zero-upload policy makes this tool ideal for lawyers, journalists, and enterprises that must comply with strict data privacy and confidentiality regulations."
    },
    {
      question: "How do I know the metadata is really gone?",
      answer: "You can download the cleaned image and run it through our 'Image Metadata Viewer' tool, or any other EXIF reader, to verify that the file is completely clean."
    },
    {
      question: "Does cropping a photo remove metadata?",
      answer: "It depends. Professional tools like Photoshop usually preserve EXIF data when cropping. Simple phone editors might strip it. It's always best to use a dedicated metadata remover to be sure."
    },
    {
      question: "What is IPTC data?",
      answer: "IPTC data is a metadata standard used primarily by photojournalists to embed copyright notices, author credits, and captions. Our tool removes IPTC data as well."
    },
    {
      question: "Why do my downloaded files have new names?",
      answer: "Our tool appends '-blurred' to the original filename so you don't accidentally overwrite your original, unedited photo."
    },
    {
      question: "Are thumbnail images removed?",
      answer: "Yes. Cameras often embed a small thumbnail of the original photo inside the EXIF data. Our tool removes this embedded thumbnail, which also helps reduce the file size."
    },
    {
      question: "Do you support RAW image formats?",
      answer: "Currently, we focus on standard web and sharing formats (JPG, PNG, WEBP, TIFF). RAW formats (like .CR2, .NEF) are meant for editing and should be exported to JPG before metadata removal."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes. Because it functions as a Progressive Web App (PWA), once the page is fully loaded, you can disconnect from the internet and the tool will still safely process your files locally."
    },
    {
      question: "Is this tool suitable for enterprise compliance?",
      answer: "Yes, our zero-upload policy makes this tool ideal for lawyers, journalists, and enterprises that must comply with strict data privacy and confidentiality regulations."
    },
    {
      question: "How do I know the metadata is really gone?",
      answer: "You can download the cleaned image and run it through our 'Image Metadata Viewer' tool, or any other EXIF reader, to verify that the file is completely clean."
    },
    {
      question: "Does cropping a photo remove metadata?",
      answer: "It depends. Professional tools like Photoshop usually preserve EXIF data when cropping. Simple phone editors might strip it. It's always best to use a dedicated metadata remover to be sure."
    },
    {
      question: "What is IPTC data?",
      answer: "IPTC data is a metadata standard used primarily by photojournalists to embed copyright notices, author credits, and captions. Our tool removes IPTC data as well."
    },
    {
      question: "Why do my downloaded files have new names?",
      answer: "Our tool appends '-blurred' to the original filename so you don't accidentally overwrite your original, unedited photo."
    },
    {
      question: "Are thumbnail images removed?",
      answer: "Yes. Cameras often embed a small thumbnail of the original photo inside the EXIF data. Our tool removes this embedded thumbnail, which also helps reduce the file size."
    },
    {
      question: "Do you support RAW image formats?",
      answer: "Currently, we focus on standard web and sharing formats (JPG, PNG, WEBP, TIFF). RAW formats (like .CR2, .NEF) are meant for editing and should be exported to JPG before metadata removal."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes. Because it functions as a Progressive Web App (PWA), once the page is fully loaded, you can disconnect from the internet and the tool will still safely process your files locally."
    },
    {
      question: "Is this tool suitable for enterprise compliance?",
      answer: "Yes, our zero-upload policy makes this tool ideal for lawyers, journalists, and enterprises that must comply with strict data privacy and confidentiality regulations."
    },
    {
      question: "How do I know the metadata is really gone?",
      answer: "You can download the cleaned image and run it through our 'Image Metadata Viewer' tool, or any other EXIF reader, to verify that the file is completely clean."
    },
    {
      question: "Does cropping a photo remove metadata?",
      answer: "It depends. Professional tools like Photoshop usually preserve EXIF data when cropping. Simple phone editors might strip it. It's always best to use a dedicated metadata remover to be sure."
    }
  ],
  longDescription: `
# Complete Guide to Online Image Blurring: Privacy, Aesthetics, and Technical Standards

In today's digital ecosystem, image editing tools are no longer restricted to professional graphic designers. The need to modify photos arises daily for everyday web users, software developers, social media managers, and privacy advocates. One of the most essential tasks in digital photo editing is **image blurring**. Whether you need to obscure a face, protect sensitive personal data, remove distracting background details, or create high-end depth effects, a professional image blur tool is an indispensable asset.

This guide explores the engineering, mathematics, privacy standards, and design principles behind state-of-the-art client-side image blurring.

---

## 1. Understanding the Mechanics of Blurring

At its core, blurring is a mathematical process of smoothing an image. Digital images are grids of pixels, where each pixel has color coordinates (red, green, blue, and alpha channels). Blurring works by mathematically blending the colors of adjacent pixels, effectively removing high-frequency details (such as sharp lines, text edges, and fine noise) while preserving low-frequency color structures.

### The Convolution Matrix
Most blur filters are implemented via **convolution**. In computer graphics, a convolution matrix (or "kernel") is a small grid of numbers applied to every pixel in an image. The kernel is centered over a target pixel, and the target's new color is calculated by multiplying the kernel values with the corresponding pixel values under the grid, then summing the result.

For example, a simple 3x3 box blur kernel looks like this:

$$\\frac{1}{9} \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{bmatrix}$$

This kernel sums the values of a pixel and its eight immediate neighbors, then divides by 9. This calculates the simple average color of that neighborhood.

---

## 2. Deep Dive: Blur Styles & When to Use Them

Not all blurs are created equal. Different mathematical models produce distinct visual characteristics, each suited for different use cases.

### Gaussian Blur
Gaussian Blur is the golden standard of image smoothing. Instead of averaging all neighboring pixels equally, it uses a Gaussian bell curve distribution. Pixels closer to the center of the kernel are given a higher weight than pixels further away.

The formula for a 2D Gaussian kernel is:

$$G(x, y) = \\frac{1}{2\\pi\\sigma^2} e^{-\\frac{x^2 + y^2}{2\\sigma^2}}$$

Where:
*   $x, y$ are the distances from the origin pixel.
*   $\\sigma$ (Sigma) is the standard deviation, representing the blur radius.

**Best Used For**: Softening edges, smoothing skin, removing digital noise, and securely censoring sensitive information.

### Box Blur
Box Blur calculates the simple average of a square grid of neighboring pixels. Because the mathematics are straightforward, it is very fast to compute. However, because it treats all pixels in the grid equally, it can create grid-like vertical and horizontal patterns (square artifacts) along high-contrast borders.

**Best Used For**: Low-power devices, real-time painting previews, and retro, pixelated graphic designs.

### Motion Blur
Motion Blur simulates the effect of a camera moving while the shutter is open, or a fast-paced subject crossing the frame. It averages pixels along a single directional vector rather than a concentric circle or square.

**Best Used For**: Adding action, highlighting speed, animating static graphics, and creating dynamic transitions.

### Lens Blur & Bokeh
In physical photography, depth of field causes out-of-focus highlights to take the shape of the lens's aperture blades. This circular or polygonal light scattering is called **Bokeh**. Standard Gaussian filters do not create bokeh because they smooth out bright points rather than expanding them. Lens Blur uses specialized kernels that cause highlights to grow into bright translucent disks, mimicking a DSLR camera.

**Best Used For**: Professional portrait effects, luxury product mockups, and turning simple smartphone photos into cinematic shots.

### Soft Focus Glow
The Soft Focus effect (popularized by landscape photographer Michael Orton) blends a sharp base image with a highly blurred, bright overlay. By using a blending mode (like Screen or Soft Light), the image retains its structural outlines but gains a warm, ethereal, dreamy glow.

**Best Used For**: Creative photography, wedding galleries, fairy-tale aesthetics, and artistic UI backdrops.

---

## 3. Anonymizing Sensitive Data: Security Standards

One of the most critical applications of image blurring is **data redaction**. In an era of automated optical character recognition (OCR) and facial recognition tracking, uploading unedited screenshots or screenshots with weak censorship can expose you to massive identity theft or tracking risks.

### Why Redaction Matters
When you share a screenshot online, you may inadvertently expose:
1.  **Faces**: Biometric data that can be scraped for face search engines.
2.  **License Plates**: Vehicles associated with locations and owners.
3.  **Financial Details**: Credit card numbers, bank routing codes, tax forms, and account balances.
4.  **Security Credentials**: API keys, passwords, and server IPs.
5.  **Personal Info**: Home addresses, phone numbers, and signatures.

### The Security of Blur vs. Pixelation
Pixelation (reducing resolution in a block) and Blurring are both popular for censoring text, but they have different vulnerabilities.
*   **Vulnerability of Pixelation**: If the block size is small, advanced neural networks can often reconstruct pixelated text because the pixel divisions align with a fixed grid.
*   **Security of Gaussian Blur**: Gaussian blur disperses the pixel values in a smooth, overlapping radial decay. This makes reversing the blur mathematically impossible beyond a certain threshold because multiple original pixel configurations could result in the exact same blurred output.

> [!WARNING]
> Always apply a high blur intensity (above 45%) when redacting text. If a blur is too light, AI deconvolution algorithms can sometimes reconstruct the text shapes. For maximum security, use a **Solid Color Box** (redaction bar) to completely blackout credit card numbers or passwords.

---

## 4. AI-Assisted Editing: Subject & Face Segmentation

Modern web editors leverage machine learning to automate complex selection tasks that used to require manual masking.

### Auto-Face Detection
Our tool utilizes **face-api.js** to scan the image canvas locally. This neural network is trained on thousands of facial geometries. By running face detection, the tool identifies the coordinates of all faces in the frame and draws bounding masks over them. This allows users to blur all faces in a group photo with a single click, saving time.

### Background Segmentation
By utilizing client-side semantic segmentation models (such as ONNX-compiled models via \`@imgly/background-removal\`), the web app can isolate the main subject in a photo.
The process follows these stages:
1.  **Subject Detection**: The neural network categorizes pixels into \"foreground\" and \"background\".
2.  **Mask Generation**: A high-precision alpha mask is generated mapping out the edges of the subject.
3.  **Compositing**: The editor separates the layers: it applies the blur filter exclusively to the background layer and layers the sharp subject on top, achieving a professional portrait mode.

---

## 5. Privacy-First: The Architecture of Client-Side Web Apps

Traditional image tools require you to upload your files to a server, where a backend script processes the image and sends it back. This workflow poses serious security risks.

### The Server-Side Upload Risk
When an image is uploaded to a remote server:
*   The service provider could store your image on their cloud buckets.
*   Data could be intercepted in transit.
*   The servers could be compromised in a data breach, leaking sensitive document screenshots.

### The Client-Side Alternative
Our **Blur Image Studio** is built entirely on **client-side processing**.
*   **File API**: Your browser loads the file directly into local JavaScript memory (\`FileReader\` or \`URL.createObjectURL\`).
*   **Canvas API**: The image is drawn to an offscreen HTML5 \`<canvas>\` element. All filters (Gaussian, pixelation, composites) are computed locally by your CPU/GPU using browser APIs.
*   **Local Download**: The final image is converted into a binary data stream (\`canvas.toDataURL\` or \`canvas.toBlob\`) and downloaded directly.

**No data is ever sent to a server. Your files never leave your device. Your privacy is mathematically guaranteed.**

---

## 6. How to Achieve the Perfect Blur: A Step-by-Step Guide

Follow these steps to blur images professionally:

### Step 1: Uploading the Image
Drag your image file directly into the drop zone, paste it from your clipboard (Ctrl+V), or select it from your device folder.

### Step 2: Choosing Your Mode
*   For privacy: select **Area Blur** or **Face Blur**.
*   For professional depth: select **Background Blur**.
*   For artistic design: select **Full Image Blur**.

### Step 3: Drawing Blur Boxes
If you chose Area Blur, click and drag on the image to draw rectangular or circular blur boxes. Adjust the corners to fit exactly over the license plate, face, or document text.

### Step 4: Selecting Blur Type & Intensity
Use the slider to set the strength. For sensitive text, set the intensity to at least **50%**. For a soft background, a lighter intensity of **20%** is usually best.

### Step 5: Exporting Your File
Select your export format (PNG is best for text, WEBP or JPG for photos) and click 'Download'. The file will save directly to your downloads folder with \`-blurred\` appended to the name.
   `
};
