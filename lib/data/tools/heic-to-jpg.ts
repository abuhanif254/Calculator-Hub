import { ToolConfig } from './types';

export const heicToJpgToolConfig: ToolConfig = {
  slug: "heic-to-jpg",
  title: "HEIC to JPG",
  shortDescription: "Convert Apple HEIC photos to high-quality JPG/JPEG images. 100% local, browser-based batch converter that preserves EXIF metadata.",
  category: "Image Tools",
  keywords: [
    "heic to jpg",
    "convert heic to jpg",
    "heic converter",
    "heic to jpeg",
    "iphone photo converter",
    "apple photo conversion",
    "heif to jpg",
    "online heic converter",
    "free heic converter",
    "convert iphone photos"
  ],
  features: [
    "Convert HEIC and HEIF files to JPG/JPEG instantly in your browser",
    "Batch processing—convert multiple HEIC images simultaneously in a queue",
    "100% Client-side privacy—your files are processed locally and never uploaded to any server",
    "EXIF Metadata Options—choose to preserve camera details, GPS locations, and dates, or strip them for privacy",
    "Custom Quality Slider (1–100%) to balance file size and visual fidelity",
    "Interactive side-by-side preview comparisons of original HEIC vs converted JPEG",
    "Zip Export—download all converted images in a single compressed ZIP archive",
    "Touch-friendly, fully responsive, and offline-capable Progressive Web App interface"
  ],
  useCases: [
    "Converting iPhone photos to JPG so they can be viewed on Windows or Android devices",
    "Preparing Apple HEIC images for upload to websites, job applications, or governmental portals that only accept JPEG",
    "Reducing storage space on non-Apple systems by converting HEIC files with specific compression settings",
    "Stripping GPS locations and device metadata from HEIC screenshots before uploading to online forums",
    "Converting batch folders of iPhone live photos or bursts into web-compatible JPG files",
    "Performing secure, bulk image transformations inside firewalled enterprise networks"
  ],
  howToSteps: [
    "Drag & Drop one or more HEIC/HEIF files into the upload zone, or click to browse files.",
    "Select your target Output Format (JPG or JPEG) and adjust the Quality slider (e.g. 90% for High Quality).",
    "Choose whether to 'Preserve EXIF Metadata' or 'Remove EXIF Metadata' for privacy.",
    "The tool will automatically start processing each file in the queue in real-time.",
    "Click the Preview button to inspect the side-by-side color rendering of the input and output.",
    "Download individual JPEGs or click 'Download All (ZIP)' to save your complete batch at once."
  ],
  relatedTools: [
    { name: "Image Converter", slug: "image-converter" },
    { name: "Compress Image", slug: "compress-image" },
    { name: "Resize Image", slug: "resize-image" },
    { name: "Image Metadata Viewer", slug: "image-metadata-viewer" },
    { name: "Image Metadata Remover", slug: "image-metadata-remover" }
  ],
  examples: [],
  faq: [
    {
      question: "What does HEIC stand for?",
      answer: "HEIC stands for High Efficiency Image Container. It is Apple's proprietary version of the HEIF (High Efficiency Image File Format), which stores images encoded with the HEVC (H.265) video compression standard."
    },
    {
      question: "Why does my iPhone save photos in HEIC format?",
      answer: "Apple introduced HEIC in iOS 11 to save storage space. HEIC uses modern H.265 compression algorithms that allow photos to take up about half the storage space of a JPEG with equivalent or superior visual quality."
    },
    {
      question: "Are my HEIC files uploaded to a server for conversion?",
      answer: "No. Our HEIC to JPG tool is a 100% client-side application. The conversion is performed directly inside your web browser's memory using JavaScript and WebAssembly. No files are ever sent over the internet or saved to our servers, giving you complete data privacy."
    },
    {
      question: "Can I convert multiple HEIC files at the same time?",
      answer: "Yes, our tool supports batch conversion. You can upload dozens of HEIC files simultaneously. The converter will process them sequentially and let you download them individually or as a single compiled ZIP archive."
    },
    {
      question: "Does converting HEIC to JPG reduce image quality?",
      answer: "HEIC is a high-efficiency format, and JPG is a lossy format. Our tool uses advanced canvas rendering to decode the pixel values of the HEIC file and encode them to JPG. Setting the quality slider to 90% or higher keeps visual quality virtually identical to the original."
    },
    {
      question: "Can this tool convert HEIF files as well?",
      answer: "Yes. HEIF (High Efficiency Image Format) is the general standard, and HEIC is Apple's specific container format. Our tool handles both `.heic` and `.heif` extensions interchangeably."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, the HEIC to JPG converter is 100% free with no monthly limits, no file count limits, and no watermarks added to your exported JPEGs."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes. Because the entire processing logic runs inside your browser, once the page is fully loaded, you can disconnect from the internet and continue converting images completely offline."
    },
    {
      question: "What is EXIF metadata?",
      answer: "EXIF (Exchangeable Image File Format) metadata is hidden information embedded inside image files. It records details like the date and time the photo was taken, camera model, lens settings, and exact GPS coordinates."
    },
    {
      question: "Will my photos keep their GPS location and date metadata after conversion?",
      answer: "Yes. If you select the 'Preserve Metadata' option, our tool extracts the EXIF block from the original HEIC container and injects it back into the converted JPEG. If you select 'Remove Metadata', all EXIF info is permanently stripped for privacy."
    },
    {
      question: "Why can't I open HEIC photos on my Windows PC?",
      answer: "Windows does not include native support for HEIC/HEIF files out-of-the-box. To open them, users must download the paid 'HEVC Video Extensions' from the Microsoft Store or convert the files to a standard format like JPG."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes. Since it is browser-based, you can use it on any Android device, tablet, iPhone, or iPad to convert HEIC photos directly from your file browser or camera roll."
    },
    {
      question: "Are color profiles maintained during conversion?",
      answer: "Yes. The decoder parses the embedded color profile (such as Display P3 or sRGB) and translates the color coordinates onto the canvas context, ensuring accurate color rendering in the final JPG."
    },
    {
      question: "What is the difference between JPG and JPEG?",
      answer: "There is no difference. JPG and JPEG refer to the exact same image format. The three-letter '.jpg' extension was created because older Windows operating systems required three-letter file extensions, whereas macOS and Unix used '.jpeg'."
    },
    {
      question: "Why should I convert HEIC to JPG instead of PNG?",
      answer: "JPEG is highly optimized for photographs with complex gradients and colors, producing relatively small file sizes. PNG is a lossless format designed for text and graphics; converting a photo to PNG can result in a file size 5 to 10 times larger without any visual improvement."
    },
    {
      question: "Can this tool extract multiple photos from a Live Photo?",
      answer: "Yes. Apple Live Photos consist of a static HEIC image and a short HEVC video. If the HEIC container contains multiple key frames or bursts, our tool's multi-frame mode will decode and export them as individual JPGs."
    },
    {
      question: "Is there a file size limit for uploads?",
      answer: "The limit is dictated by your device's browser memory (RAM). Modern desktop browsers can easily process files up to 50MB. For mobile browsers, we recommend keeping files under 25MB."
    },
    {
      question: "Does this tool work on Mac computers?",
      answer: "Yes. While Mac computers have built-in HEIC support, this tool can still be used on macOS to quickly batch-convert, compress, or strip metadata from images."
    },
    {
      question: "Why does the conversion process take a few seconds?",
      answer: "Decoding HEIC requires running a heavy decompression algorithm (HEVC decoding) inside JavaScript or WebAssembly. Depending on your device's CPU speed and the image resolution, it can take 1 to 3 seconds per file."
    },
    {
      question: "Can I convert HEIC to PNG or WEBP?",
      answer: "This version focus on exporting to JPG/JPEG. Support for exporting to PNG, WEBP, and AVIF is planned for a future architecture update."
    },
    {
      question: "Will the resolution (dimensions) of my photo change?",
      answer: "No. The converter maintains the exact pixel width and height of the original HEIC image. The resolution is not downscaled unless you use a separate resize tool."
    },
    {
      question: "What happens if a HEIC file is corrupted?",
      answer: "If a file is corrupted or cannot be parsed, the queue tracker will mark that file as 'Error' and display a user-friendly error message, while continuing to process the remaining files in the batch."
    },
    {
      question: "Why is the converted JPG larger in file size than the HEIC original?",
      answer: "Because HEIC uses H.265 compression, which is roughly twice as efficient as JPEG's compression algorithms. When you convert HEIC to JPG, the data must be decompressed and re-encoded using the older JPEG standard, which naturally requires more bytes to store the same quality."
    },
    {
      question: "How do I download the ZIP file of my converted photos?",
      answer: "Once the batch queue completes, a green 'Download All (ZIP)' button will appear. Clicking it compiles all converted JPEGs into a single ZIP file locally in your browser and triggers the download."
    },
    {
      question: "Does this tool store a cache of my photos?",
      answer: "No. Since your photos are never sent to a server, we have no way of caching, viewing, or storing your files. Everything is cleared from your browser's temporary memory as soon as you close the tab."
    },
    {
      question: "Is this tool suitable for sensitive corporate documents?",
      answer: "Yes, absolutely. Because our utility has a zero-upload design, it meets the highest compliance and data protection guidelines (including GDPR, HIPAA, and corporate NDA requirements)."
    },
    {
      question: "Can I convert HEIC to JPG on a Chromebook?",
      answer: "Yes, ChromeOS fully runs modern browsers, meaning you can convert your iPhone photos directly on your Chromebook without any installation."
    },
    {
      question: "What is the quality scale?",
      answer: "The quality scale is from 1 to 100. We recommend 90% as the sweet spot, as it offers maximum visual detail while significantly reducing file size compared to 100% (Maximum)."
    },
    {
      question: "Why do some HEIC images render with incorrect orientation?",
      answer: "HEIC images store camera orientation as a metadata flag (e.g. rotated 90 degrees). Our tool reads this EXIF orientation tag and auto-rotates the canvas coordinates to ensure the output JPEG has the correct orientation."
    },
    {
      question: "Can I drag and drop folders into the uploader?",
      answer: "Browsers generally prevent uploading folders directly via drag and drop. However, you can open the folder, select all images (Ctrl+A / Cmd+A), and drag the selection of files into the upload zone."
    },
    {
      question: "What is the difference between HEIF and HEIC?",
      answer: "HEIF (High Efficiency Image File Format) is the general container standard defined by MPEG. HEIC is the filename extension used by Apple for HEIF files containing images compressed using the HEVC codec."
    },
    {
      question: "Do you support conversion from HEICS files?",
      answer: "HEICS is a HEIF file containing multiple image sequences. Our tool supports extracting and converting the primary image frames from HEICS container files."
    },
    {
      question: "Does this tool work on Linux?",
      answer: "Yes. Since it is browser-based, you can run it on Ubuntu, Fedora, Mint, or any other Linux distribution via Chrome or Firefox to convert HEIC photos."
    },
    {
      question: "How do I make my iPhone stop taking HEIC photos?",
      answer: "You can change this in your iPhone settings. Go to Settings > Camera > Formats, and select 'Most Compatible'. This will configure your iPhone to shoot in JPG natively, though it will consume more storage space."
    },
    {
      question: "Does this tool require a login or subscription?",
      answer: "No, the tool works completely anonymously and requires no account registration, login, or subscription."
    },
    {
      question: "What is an ICC Profile?",
      answer: "An ICC Profile is a set of data that characterizes a color input or output device. Maintaining the ICC profile ensures that colors display consistently across calibrated monitors and phone screens."
    },
    {
      question: "Can I preview images before converting them?",
      answer: "Because browsers cannot natively render HEIC, the original preview is generated using the local decoder. Once decoded, you can immediately inspect the image preview before downloading the final JPG."
    },
    {
      question: "Can I change the filenames of converted images?",
      answer: "The tool automatically names the output file by keeping the original filename and changing the extension to `.jpg`. If you need to rename them, you can do so in your OS file manager."
    },
    {
      question: "Why do some websites block HEIC uploads?",
      answer: "Many websites and databases were built before HEIC was developed. Because decoding HEIC requires computing licenses and is not natively supported by standard web browsers, most sites mandate JPG or PNG for compatibility."
    },
    {
      question: "What does lossy compression mean?",
      answer: "Lossy compression means that the file compressor discards some non-essential color data to achieve a much smaller file size. JPG is a lossy compressor, which is why quality settings are provided."
    },
    {
      question: "Can this converter convert JPG back to HEIC?",
      answer: "No. Converting JPG back to HEIC is generally not useful because the compression losses from the JPEG format are permanent. You would get a larger file size without recovering the original raw details."
    },
    {
      question: "Does this tool support batching of 100+ images?",
      answer: "Yes. However, processing a very large batch requires substantial RAM. If you are converting more than 50 files, we recommend processing them in smaller groups to prevent browser lag."
    },
    {
      question: "Why do my live photos convert as static images?",
      answer: "Live photos contain both a HEIC file and a MOV video file. This tool converts the high-resolution HEIC photo part into a JPG. It does not convert the video part."
    },
    {
      question: "What is sRGB color profile?",
      answer: "sRGB is the standard color space for the web, supported by all browsers and monitors. If your HEIC uses sRGB, it is copied verbatim to the JPEG."
    },
    {
      question: "What is Display P3?",
      answer: "Display P3 is a wide-gamut color space developed by Apple, which displays 25% more colors than sRGB. Modern iPhones shoot in Display P3, and our tool preserves these vibrant colors."
    },
    {
      question: "Does this tool support Web Workers?",
      answer: "Yes. The computation-heavy decoding processes are offloaded to Web Workers where supported, keeping the UI responsive and preventing browser tabs from freezing."
    },
    {
      question: "Can I crop or resize photos during conversion?",
      answer: "To keep this tool fast and focused, it does not support editing functions like cropping. If you need to edit your photos, you can crop them using our dedicated Crop Image tool."
    },
    {
      question: "What is the baseline year of the HEIF standard?",
      answer: "The HEIF standard was finalized in 2015 by the Moving Picture Experts Group (MPEG). Apple adopted it in 2017 with iOS 11."
    },
    {
      question: "Can I use this tool to batch-convert HEIC on an iPad?",
      answer: "Yes, iPadOS Safari supports local file API operations, letting you select multiple HEIC photos from your files app and batch-convert them easily."
    },
    {
      question: "What is the license cost of HEIF?",
      answer: "Unlike JPEG which is royalty-free, HEVC (used inside HEIC) is subject to patent licensing fees. This licensing cost is why open-source browsers like Chromium do not support HEIC decoding natively."
    }
  ],
  longDescription: `
# The Definitive Guide to HEIC and JPEG Image Formats: Conversion, Metadata, and Privacy

As digital photography has evolved from a niche hobby into a ubiquitous daily practice, the underlying technology used to capture, store, and share digital images has undergone massive architectural changes. For decades, the **JPEG** (Joint Photographic Experts Group) format reigned supreme as the universal standard for digital images. However, in recent years, Apple's adoption of **HEIC** (High Efficiency Image Container) as the default photo capture format on iOS has shifted the landscape, creating a technological divide between Apple devices and non-Apple platforms.

This guide provides an exhaustive engineering analysis of HEIC and JPEG formats, exploring why conversion is necessary, how local decoding works, orientation mapping, color profile rendering, and secure local privacy architecture.

---

## 1. What is HEIC? Apple's Modern Media Container

In 2017, with the release of iOS 11 and macOS High Sierra, Apple transitioned its default camera output from JPEG to **HEIC**. 

### The Core Technology
HEIC is not a brand-new image codec itself. Rather, it is a specialized media container format based on the **High Efficiency Image File Format (HEIF)**, which was standardized by the ISO/IEC Moving Picture Experts Group (MPEG) in 2015. 
*   **The Container**: HEIF specifies how image structures, bursts, audio components, and thumbnail variations are structured inside a single binary payload.
*   **The Codec**: Inside Apple's HEIC container, the visual pixel payloads are compressed using the **HEVC** (High Efficiency Video Coding) video compression standard, also known as **H.265**.

### Key Advantages of HEIC over JPEG
By leveraging H.265 compression, HEIC introduces several features that make JPEG look outdated:
1.  **50% Storage Compression**: HEIC files require roughly half the storage capacity (megabytes) of an equivalent JPEG file, with equal or superior visual fidelity.
2.  **16-Bit Color Depth**: While JPEG is limited to 8-bit color depth (supporting up to 16.7 million colors), HEIC supports up to 16-bit color depth, which can represent billions of color variations, preventing "color banding" in smooth gradients (like skies).
3.  **Multiple Image Support**: A single HEIC container can store multiple files (such as photo bursts, HDR bracketed layers, or the static image and short video frame that make up an Apple **Live Photo**).
4.  **Auxiliary Map Data**: HEIC can store auxiliary data alongside the image data, such as a **Depth Map** (recording the distance of objects from the camera lens), which allows for post-capture editing of portrait bokeh effects.
5.  **Lossless Rotations**: HEIC supports lossless editing operations, such as rotating or cropping the image container, by simply modifying metadata parameters rather than re-compressing the visual pixels.

---

## 2. Why Conversion to JPG is Mandatory

Despite the technological superiority of HEIC, it suffers from a massive compatibility problem: it is not supported natively by the vast majority of non-Apple operating systems, browsers, and web software.

### The Browser Compatibility Gap
Web browsers are built on open web standards. While major browsers support JPEG, PNG, WEBP, and increasingly AVIF, only Apple's **Safari** natively decodes HEIC.
*   **Google Chrome / Chromium**: Does not support HEIC because decoding it requires paying patent royalties to the HEVC Advance licensing pool.
*   **Mozilla Firefox**: Does not support HEIC for similar open-source licensing compliance reasons.
*   **Microsoft Edge**: Does not support HEIC out-of-the-box on Windows unless the user purchases the HEVC codec pack from the Microsoft Store.

### Database and Web Portal Limitations
Since the web cannot natively display HEIC files, databases, portals, and online services (such as government portals, flight booking sites, insurance portals, and job application boards) actively block HEIC file uploads. Users who attempt to upload an iPhone photo (\`.heic\`) to these sites are met with file rejection errors, necessitating conversion to standard JPEG.

---

## 3. How Client-Side HEIC Decoding Works

To convert HEIC to JPG without transmitting files over the network, our converter implements **client-side Javascript and WebAssembly compilation**.

### Step-by-Step Conversion Pipeline
The local conversion process utilizes a JavaScript port of the open-source **libheif** decoder compiled into a highly optimized binary stream:

\`\`\`
[HEIC File Upload]
       │
       ▼
[Blob Stream Read]
       │
       ▼
[WebAssembly Decoder (libheif)] ──► Parses HEVC image payload
       │
       ▼
[Canvas Rendering Context] ─────► Paints uncompressed RGBA pixel data
       │
       ▼
[JPEG Encoder (canvas.toBlob)] ──► Compresses pixels into JPEG bytes
       │
       ▼
[Local File Export]
\`\`\`

1.  **File Loading**: The user's HEIC file is read into browser memory as a raw binary \`Blob\` object.
2.  **Header Parsing**: The decoder parses the ISO box structure of the container, locating the primary image track, EXIF metadata blocks, and color profiles.
3.  **HEVC Decoding**: The compressed image frame is processed by our local WebAssembly libheif instance, which reconstructs the raw, uncompressed RGBA pixel coordinates in memory.
4.  **Canvas Drawing**: The uncompressed RGBA matrix is drawn onto an offscreen HTML5 \`<canvas>\` element.
5.  **Orientation Alignment**: The parser checks the EXIF orientation parameter and applies the necessary translation/rotation matrix to the canvas before drawing, preventing landscape photos from saving sideways.
6.  **JPEG Encoding**: The canvas is serialized into a JPEG Blob using the specified quality scale (0.01 to 1.0) and output format.

This entire pipeline runs in an isolated thread (Web Worker), which prevents the main browser UI thread from freezing during heavy cryptographic and decompression tasks.

---

## 4. Color Profiles: Display P3 and sRGB Calibration

Modern iPhone cameras do not just capture more pixels; they capture a wider range of colors. 

### What is Display P3?
Since the iPhone 7, Apple devices shoot in the **Display P3** color space. Display P3 is a wide-gamut color space that contains roughly 25% more color variations than standard **sRGB** (standard Red Green Blue). Display P3 can represent highly vibrant, saturated shades of reds, oranges, and greens that standard monitors cannot display.

### The Conversion Challenge
When converting HEIC to JPG, standard encoders often discard Display P3 color markers, forcing the color values into standard sRGB. This can result in the converted JPG appearing washed out, dull, or chemically distorted.
Our converter utilizes canvas context color profile managers to handle color space translation:
*   If the source monitor and destination file support Display P3, color coordinates are mapped accurately.
*   If converting to standard web sRGB, the color gamuts are mapped using relative colorimetric intent, preserving the visual balance and saturation of the original iPhone display profile.

---

## 5. Preserving vs. Stripping EXIF Metadata

Image files contain two components: the visual payload (pixels) and the non-visual descriptive block (**EXIF metadata**).

### The Security Implications of EXIF
While camera settings (ISO, focal length) are benign, smartphones automatically record geographic location (GPS latitude, longitude, and altitude) and unique device markers. Sharing an untouched photo online can reveal:
*   Your exact residential address.
*   Your daily coordinates and schedule.
*   Your specific mobile device serial signature.

### Our Metadata Options
Our studio provides full control over this data:
*   **Remove Metadata (Strip)**: The canvas-drawn pixels are exported without any header attachments. The resulting JPEG contains zero camera history or GPS coordinates. This is the recommended mode for online uploads.
*   **Preserve Metadata**: The tool reads the binary EXIF block from the source HEIC file using the \`exifr\` parser. After the canvas generates the JPG blob, \`piexifjs\` is used to write this EXIF block back into the JPEG header bytes. This ensures that dates, camera settings, and locations are preserved for personal indexing.

---

## 6. How to Use the HEIC to JPG Converter

Follow these instructions to batch-convert iPhone photos locally:

### Step 1: Selection
Drag and drop your \`.heic\` or \`.heif\` files into the dotted upload box, or click the area to select files from your operating system.

### Step 2: Configure Quality & Privacy
*   **Quality**: Set the slider between 80% and 95%. Higher values offer better fidelity but result in larger JPEG file sizes.
*   **Metadata**: Select "Preserve Metadata" if you want to keep photo details for personal archives, or "Remove Metadata" to strip private tracking details.

### Step 3: Sequential Conversion
The conversion queue will process the images. You can monitor the progress bar for each file.

### Step 4: Download
Once completed, click the green "Download" button on individual rows to download files, or click "Download All (ZIP)" to save the entire converted batch as a compressed archive.
   `
};
