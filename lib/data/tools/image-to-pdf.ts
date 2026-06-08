import { ToolConfig } from './types';

export const imageToPdfConfig: ToolConfig = {
  slug: "image-to-pdf",
  title: "Image to PDF",
  shortDescription: "Convert JPG, PNG, WEBP, GIF, and BMP images to high-quality PDF documents online. Reorder pages, customize margins, add watermarks, and compress images. Processed 100% locally.",
  category: "PDF Tools",
  keywords: [
    "Image to PDF", "Convert Image to PDF", "JPG to PDF", "PNG to PDF", "WEBP to PDF",
    "Photo to PDF", "Picture to PDF", "Convert Images to PDF", "PDF Creator", "Online PDF Converter",
    "PDF Generator", "Document Creation", "jpeg to pdf online", "bulk image to pdf"
  ],
  longDescription: `
# The Comprehensive Guide to Image-to-PDF Conversion: Binary Wrapping, Aspect Ratio Calculations, and Client-Side Optimization

In today's digital workflow, the conversion of raster images (such as JPEGs, PNGs, and WebPs) into Portable Document Format (PDF) files is a fundamental task. Whether you are archiving receipts for business expense reports, compiling a design portfolio, formatting scanned identification documents, or bundling lecture notes, the process of mapping images to pages must balance resolution, file size, page geometry, and data privacy.

This guide details the technical aspects of browser-based client-side image-to-pdf conversion. We will examine the binary structure of raster images, dissect the coordinate geometry of PDF page envelopes (measured in PostScript points), analyze the mathematics of aspect ratio scaling, examine client-side optimization and memory management, and demonstrate the security benefits of local, Zero-Trust execution.

---

## 1. Document Models: Raster Pixels vs. PDF Vector Canvas

Understanding the conversion process requires analyzing the structural differences between raster image formats and the Portable Document Format.

### Raster Image Formats: The Grid of Pixels
Raster images represent visual data using a rectangular grid of colored pixels. Each pixel stores color values using channels (typically Red, Green, Blue, and optionally Alpha for transparency).
- **JPEG (Joint Photographic Experts Group)**: Standardized as ISO/IEC 10918, JPEG uses lossy discrete cosine transform (DCT) compression. It is designed for photographs, yielding compact file sizes by discarding visual data less noticeable to the human eye. JPEGs do not support transparency or multiple frames.
- **PNG (Portable Network Graphics)**: Standardized as ISO/IEC 15948, PNG uses lossless DEFLATE compression. It is designed for web graphics, diagrams, and text screenshots, supporting full 8-bit transparency (alpha channel). Because it is lossless, PNG file sizes can be very large for photographic content.
- **WEBP**: Developed by Google, WebP supports both lossy and lossless compression, alongside transparency and animation. It achieves 25% to 35% smaller file sizes than JPEGs or PNGs at equivalent quality.
- **GIF (Graphics Interchange Format)**: Mapped to a limited palette of 256 colors, supporting basic binary transparency and frame animation.
- **BMP (Bitmap)**: An uncompressed, raw raster format storing pixel arrays directly, resulting in extremely large file sizes.

### The Portable Document Format (PDF) Canvas
PDF (standardized as ISO 32000) is a page-based vector coordinate container. Rather than storing a grid of pixels, a PDF maps objects (text fonts, vector lines, form fields, and external raster objects) onto an absolute physical coordinate system measured in **points**:

$$1 \\text{ point} = \\frac{1}{72} \\text{ inch}$$

Under this model:
- An **A4 page** ($210 \\times 297$ mm) measures exactly $595.28 \\times 841.89$ points.
- A **Letter page** ($8.5 \\times 11$ inches) measures exactly $612.00 \\times 792.00$ points.

### The Conversion Mechanics: Binary Wrapping
When you convert an image to a PDF, the engine does not convert the pixel grid into vector paths. Instead, it performs **binary wrapping**:
1. **File Ingestion**: The engine reads the image file as an \`ArrayBuffer\` or \`Uint8Array\`.
2. **Object Registration**: The image bytes are registered in the PDF document as an \`XObject\` (specifically a \`/Subtype /Image\` stream object). The image's metadata (width, height, color space, and bits per component) are declared in the object's dictionary.
3. **Content Stream Insertion**: The engine inserts drawing commands into the page's content stream. It uses the coordinate transformation matrix (\`cm\` operator) to position, scale, and rotate the image, and the \`Do\` operator to render the registered image object.
4. **Binary Compilation**: The cross-reference table (\`xref\`) and file trailer are compiled to specify the byte offset of each object.

This process wraps the compressed image stream directly inside the PDF envelope, preserving the original pixel data and color profile without loss.

---

## 2. Page Setup Geometry: The Mathematics of Scaling and Aspect Ratios

Because images come in various orientations and dimensions while PDFs target standardized physical page sizes, the conversion engine must calculate dimensions dynamically to prevent stretching, distortion, or overflow.

### Aspect Ratio Calculations
The aspect ratio ($R$) of an image is the ratio of its width ($W_{img}$) to its height ($H_{img}$):

$$R = \\frac{W_{img}}{H_{img}}$$

Similarly, the aspect ratio of the target printable cell ($R_{cell}$) is calculated using the page dimensions minus margins:

$$R_{cell} = \\frac{W_{page} - 2 \\cdot M}{H_{page} - 2 \\cdot M}$$

Where:
- $W_{page}, H_{page}$ are the physical dimensions of the PDF page in points.
- $M$ is the margin thickness in points.

### Fit Options and Matrix Transformations

Our engine supports five primary layout scaling modes:

#### 1. Fit to Page (Aspect Ratio Preserved)
The image scales to fit within the cell boundary without clipping. The scaling factor ($S$) is calculated as:

$$S = \\min\\left(\\frac{W_{page} - 2 \\cdot M}{W_{img}}, \\frac{H_{page} - 2 \\cdot M}{H_{img}}\\right)$$

The final dimensions on the page are:

$$W_{draw} = W_{img} \\cdot S$$
$$H_{draw} = H_{img} \\cdot S$$

If $R \\neq R_{cell}$, white space margins appear on the sides of the image.

#### 2. Fill Page (Stretch & Crop)
The image scales to cover the entire cell. Any parts of the image that extend beyond the cell boundaries are cropped. The scaling factor ($S$) is:

$$S = \\max\\left(\\frac{W_{page} - 2 \\cdot M}{W_{img}}, \\frac{H_{page} - 2 \\cdot M}{H_{img}}\\right)$$

The final dimensions are:

$$W_{draw} = W_{img} \\cdot S$$
$$H_{draw} = H_{img} \\cdot S$$

The draw offsets ($X_{off}, Y_{off}$) are centered to crop the overflow evenly:

$$X_{off} = M + \\frac{(W_{page} - 2 \\cdot M) - W_{draw}}{2}$$
$$Y_{off} = M + \\frac{(H_{page} - 2 \\cdot M) - H_{draw}}{2}$$

#### 3. Stretch (Distortion Allowed)
The image scales to match the width and height of the cell exactly, ignoring the aspect ratio:

$$W_{draw} = W_{page} - 2 \\cdot M$$
$$H_{draw} = H_{page} - 2 \\cdot M$$

This mode can cause visual distortion (squeezing or stretching) and is generally used only for solid backgrounds or patterns.

#### 4. Original Size (No Scaling)
The image is drawn using its physical size calculated from its pixel dimensions and resolution. If the dimensions exceed the page boundaries, the image overflow will bleed past the margins.

#### 5. Center Image (Original Size Centered)
The image is rendered at its original size and centered on the page. If the image is larger than the page, it is scaled down using the **Fit to Page** algorithm to prevent clipping.

---

## 3. Client-Side Image Compression and Memory Optimization

Converting multiple high-resolution images in the browser can cause high memory usage. A standard smartphone image of 12 megapixels occupies about 36MB of raw uncompressed RGBA pixel data in RAM:

$$\\text{Raw Size} = 4000 \\times 3000 \\text{ pixels} \\times 4 \\text{ bytes per pixel} = 48,000,000 \\text{ bytes} \\approx 45.77 \\text{ MB}$$

If a user uploads 50 images, the browser tab must allocate over 2.2GB of RAM just to hold the uncompressed image buffers, which can cause the browser tab to crash.

### The Client-Side Optimization Pipeline
To manage this, our engine runs a local optimization pipeline:
1. **Dynamic Canvas Resampling**: Images are loaded sequentially using the \`Image\` object and drawn onto an offscreen canvas element.
2. **Sub-sampling and Resizing**: If the image resolution is higher than necessary for the target print DPI (typically 300 DPI), the canvas scales the pixel grid down. For example, a $4000 \\times 3000$ image on an A4 page ($8.27 \\times 11.69$ inches) at 300 DPI only needs a resolution of:
   $$W_{target} = 8.27 \\text{ inches} \\times 300 \\text{ DPI} \\approx 2480 \\text{ pixels}$$
   This downsampling reduces the raw pixel data size by 60%.
3. **JPEG Compression**: The canvas is serialized to a binary stream using \`canvas.toDataURL("image/jpeg", qualityPreset)\` or \`canvas.toBlob()\`. Serializable quality values range from 0.40 (Compressed) to 1.00 (Original Quality). This step utilizes the browser's hardware-accelerated JPEG encoders to compress PNG, BMP, or WebP inputs into optimized JPEG bytes.
4. **Garbage Collection and Memory Cleanup**: Blob URLs are revoked immediately after the image object is loaded using \`URL.revokeObjectURL()\`, and canvas dimensions are set to $0 \\times 0$ to release memory buffers back to the operating system.

---

## 4. Visual Reordering, Batch Processing, and Layout Options

Our PDF creator provides visual and layout options to structure documents professionally.

### Grid Sorting and Visual Organizer
Users can rearrange, duplicate, rotate, and delete pages using an interactive workspace:
- **Visual Reordering**: Users can drag and drop page thumbnails to rearrange the document structure before compilation.
- **Rotation Transformations**: Images can be rotated in 90-degree increments. Rotating an image swaps its width and height parameters in the layout calculations.
- **Crop Adjustments**: A canvas-based crop tool lets users select a sub-region of an image, cropping out background clutter or scanning borders.

### Page and Margin Settings
- **Page Size**: Support for A4, A3, A5, Letter, and Legal. The **Auto** setting scales each page size to match the dimensions of its corresponding image.
- **Orientation**: Supports Portrait, Landscape, and Auto-Detect. In **Auto-Detect** mode, the engine evaluates the aspect ratio of each processed image to determine page orientation, creating a landscape page for landscape images and a portrait page for portrait images.
- **Custom Margins**: Users can add Small (15pt), Medium (36pt), or Large (54pt) margins, or define custom margins using numerical inputs.

### Export Outputs
- **Single PDF**: Compiles all images into one multi-page PDF document.
- **Separate PDFs**: Creates individual PDF documents for each image. For batch uploads, the individual PDFs are bundled into a single ZIP archive using \`JSZip\`.

---

## 5. Security & Privacy: Client-Side Zero-Trust Conversion

Uploading sensitive documents like passports, medical records, financial sheets, or signed agreements to external servers introduces security risks:
- **Network Interception**: Files travel over public networks, risking interception.
- **Server Cache Retention**: Files can remain stored in server temporary folders or logs indefinitely.
- **Data Harvesting**: Some free converters analyze document metadata or archive inputs.

### The Zero-Trust Browser Sandbox
Our platform uses client-side execution to keep data private. Once the webpage loads, all processing, compression, page layout calculations, and PDF compiles run inside your browser's sandboxed RAM.
- **No File Transmission**: Files are read locally using the browser's \`FileReader\` API. No data is ever transmitted over the network.
- **Offline Compatibility**: You can load the page, disconnect your internet connection, and convert files offline.
- **Metadata Cleaning**: The compiler strips original camera EXIF metadata (GPS location, device details, timestamps) during canvas drawing, keeping output files private.
- **Compliance**: This local execution model complies with strict privacy regulations, including **GDPR, HIPAA, and CCPA**.

---

## 6. Comparison: Image Fit Options

| Fit Mode | Aspect Ratio | Dimensions | Overflow Handling | Best Used For |
| :--- | :--- | :--- | :--- | :--- |
| **Fit to Page** | Preserved | Scaled to fit within cell | Empty margins appear on sides | Scanned receipts, text documents |
| **Fill Page** | Preserved | Scaled to cover entire cell | Overflow cropped evenly | Full-page photographs, cover sheets |
| **Stretch** | Distorted | Matches cell width & height exactly | No overflow or margins | Solid colors, background patterns |
| **Original Size** | Preserved | Original pixel dimensions | May bleed past margins | High-res graphics, blueprints |
| **Center Image** | Preserved | Original dimensions centered | May scale down if too large | Small photos, business cards |

---

## 7. Frequently Asked Questions (FAQs)

### 1. How do I convert images to a PDF?
Upload your images by dragging them into the drop zone or clicking to browse. Arrange the pages using the thumbnail grid, configure your page size, margins, and quality presets in the settings panel, and click 'Download PDF' to compile and download your document.

### 2. Can I combine multiple images into a single PDF?
Yes. You can upload multiple images (JPG, PNG, WebP, GIF, or BMP) and compile them into a single multi-page PDF document, or export them as separate PDF files.

### 3. Is my document data secure when using this converter?
Yes. The conversion engine runs entirely locally in your web browser. Your images and documents are never uploaded to any server, keeping your personal data private.

### 4. What image formats are supported?
The converter supports JPG, JPEG, PNG, WebP, GIF, and BMP formats. It is also designed to support HEIC, TIFF, and SVG files in future updates.

### 5. Can I rearrange the order of pages before creating the PDF?
Yes. Simply drag and drop the image thumbnails in the visual editor panel to rearrange the page order.

### 6. Does this tool work on mobile devices?
Yes. The interface is responsive and works in Safari, Chrome, and Firefox on iOS and Android devices, allowing you to convert photos directly from your camera roll.

### 7. How do I fit widescreen images onto portrait pages?
Select 'Fit to Page' under the fit options. This scales the image to fit within the page margins while preserving its original aspect ratio, preventing clipping.

### 8. Can I add custom margins to the pages?
Yes. You can choose from No Margin, Small, Medium, or Large presets, or enter custom margins in millimeters using the numerical settings.

### 9. What are the quality presets available?
The converter offers four presets:
- **Original Quality**: Preserves the original image resolution and quality.
- **High Quality**: High-resolution output with light compression.
- **Balanced**: A balance between image clarity and compact file size.
- **Compressed**: Applies higher compression to create small file sizes for sharing.

### 10. Does this tool support OCR?
The current version embeds images as flat visual pages. An OCR (Optical Character Recognition) update is planned to enable searchable text in the PDF output.

### 11. Can I add a custom text watermark?
Yes. Check the 'Text Watermark' option in the settings panel to add a custom text overlay, and adjust its color, font size, opacity, and rotation angle.

### 12. Can I use a company logo as an image watermark?
Yes. You can upload a PNG or JPG logo file in the watermark settings, adjust its opacity and scale, and it will overlay on every page of your PDF.

### 13. How does the 'Auto' page size setting work?
The 'Auto' page size setting scales each PDF page's dimensions to match the pixel dimensions of its corresponding image, preventing cropping or empty margins.

### 14. What is the limit on image file sizes?
Because processing occurs inside your device's memory, the limit depends on your browser's RAM capacity. We recommend keeping total uploads under 200MB.

### 15. Can I convert images to separate PDF documents in bulk?
Yes. Choose 'Separate PDFs' in the compilation mode. The converter will process the images in sequence and package the individual PDFs into a single ZIP archive.

### 16. Will animations in GIF files be preserved in the PDF?
PDF is a static format, so only the first frame of animated GIF files will be rendered on the page.

### 17. How do I rotate images that are sideways?
Each image thumbnail has a rotation button. Click it to rotate the image in 90-degree increments before generating the PDF.

### 18. Does this tool require an internet connection?
Once loaded, the page operates entirely offline in your browser. All file processing, rendering, and PDF generation work offline.

### 19. Can I save my favorite export settings?
Yes. Your customized layout profile (margins, orientations, watermarks) is saved in LocalStorage for future conversions.

### 20. Is the tool free to use?
Yes. All features, batch modes, watermarking, and ZIP exports are 100% free with no limits or watermarks forced on your files.

### 21. Why does the PDF size differ from the original image size?
This difference is caused by the chosen compression preset. The 'Balanced' and 'Compressed' presets compress the image streams to create smaller PDF file sizes for sharing.

### 22. Can I edit document properties like Title and Author?
Yes. Under the advanced settings panel, you can enter custom values for the PDF Title, Author, Subject, and Keywords.

### 23. Does this tool support password protection?
The current version focus on layout configuration and compilation. To encrypt your PDF, you can use our upcoming 'Protect PDF' tool on the platform.

### 24. How do I crop my images before converting?
Click the 'Edit' button on any image thumbnail to open the crop tool. Adjust the crop boundary box and click 'Apply Crop' to trim the image.

### 25. Will transparency in PNG or WebP files be preserved?
PDF pages have a solid white background, so transparent areas in PNG or WebP files will render as white inside the PDF document.

### 26. Can I duplicate pages in the editor?
Yes. Click the duplicate button on any image thumbnail to create an exact copy of that page.

### 27. Why did my conversion fail?
Large batches of high-resolution images can exceed browser memory limits. If this occurs, try selecting the 'Compressed' preset or processing your images in smaller batches.

### 28. Does the tool store copies of my files on a server?
No. All conversions happen client-side. No files are sent to any server, making this tool completely secure.

### 29. Can I convert HEIC photos from my iPhone?
The current version supports JPG, PNG, and WebP. We recommend converting HEIC files to JPG before uploading, and HEIC support is planned for future updates.

### 30. How are page numbers added to the PDF?
Under the layout settings, check the 'Page Numbers' option to append dynamic page counters (e.g. 'Page 3 of 12') to the margins.

### 31. Can I convert TIFF files?
TIFF support is planned for future releases. For now, please convert TIFF files to JPG or PNG before uploading.

### 32. Does the tool support SVG vector graphics?
SVG vector support is planned for a future update. Currently, SVG files will be rasterized to pixels before conversion.

### 33. Can I use the tool to create print-ready documents?
Yes. Select the 'Original Quality' preset and set page size and margins to match your print requirements.

### 34. How do I clear my conversion history?
In the history panel, click the 'Clear History' button to remove all saved task logs from your browser's local storage.

### 35. Can I paste images from my clipboard?
Yes. You can paste images directly into the workspace using the standard paste command (Ctrl+V or Cmd+V).

### 36. Why does the preview render slowly?
The preview renders using PDF.js to show the exact layout of the PDF. For large files or slow devices, this process can take a few seconds.

### 37. Will my image metadata be preserved in the PDF?
Original camera EXIF metadata (GPS tags, device model, camera settings) is stripped during canvas rendering to protect your privacy.

### 38. Does this tool support GDPR and HIPAA compliance?
Yes. Because it uses client-side sandboxed execution, no data leaves your browser, ensuring GDPR and HIPAA compliance.

### 39. Can I use custom page dimensions?
Yes. Select 'Custom' under page sizes and enter your target width and height in millimeters.

### 40. How do I download my converted PDF?
Once the compilation is complete, click the 'Download PDF' button to save the file to your device.

### 41. Can I cancel a conversion in progress?
Yes. You can cancel the compilation process at any time by clicking the 'Cancel' button.

### 42. Are PDF forms supported?
No. This tool is designed for converting image layouts to static PDF pages. Interactive form fields are not supported.

### 43. Why are some images compressed automatically?
The engine automatically compresses PNG, BMP, or WebP files to JPEG format when using the Balanced or Compressed presets to prevent large PDF file sizes.

### 44. Can I add page titles or headers?
Yes. In the Headers and Footers settings panel, you can enter custom text to display at the top of each page.

### 45. What happens if I close the browser tab during conversion?
All active data is held in temporary browser memory. Closing the tab will cancel the process and discard any uploaded files.
`,

  features: [
    "100% Client-Side Processing: Conversion and compression are executed inside browser RAM for absolute data privacy.",
    "Visual Page Organizer: Rearrange page sequences, rotate orientations, duplicate sheets, and crop boundaries.",
    "Fit Custom Settings: Fit to Page, Fill Page, Stretch layout parameters, and centered configurations.",
    "Geometry Formatting: Custom margins (none, small, medium, large, custom numeric mm) and page sizes (A4, A3, Letter, Legal, Auto).",
    "Compression Optimization: Original Quality, High, Balanced, and Compressed preset controls using browser canvas subsampling.",
    "Dual Output Schemes: Export all images into a single PDF, or create separate PDFs packaged in a ZIP archive.",
    "Document Metadata Editor: Set PDF Title, Author, Subject, and Keywords in document properties.",
    "Local History Logs: Save configuration profiles and track recent conversion statistics in LocalStorage.",
    "Interactive Watermarks: Add custom text watermarks or upload company logos with opacity, scale, and angle parameters.",
    "Live PDF Previewer: Drag-sort visual editor alongside a page-by-page PDF.js viewer preview.",
    "Responsive UX Layout: Desktop, tablet, and mobile interface alignments with keyboard controls."
  ],

  useCases: [
    "Compiling smartphone receipts and expense photos into a single PDF for corporate filing.",
    "Bundling scanned passport pages, driver's licenses, and tax records into a secure document.",
    "Packaging digital illustrations, WebP portfolios, or photos into a PDF presentation deck.",
    "Combining textbook snapshots and notes pages into a unified study guide.",
    "Converting mockups and design drafts into structured documents for client review.",
    "Archiving physical document photographs into standardized, lightweight PDF files."
  ],

  howToSteps: [
    "Upload your images by dragging and dropping them into the zone or clicking to browse files.",
    "Rearrange page order by dragging and dropping thumbnails in the visual editor grid.",
    "Click the rotate, duplicate, or edit buttons on any thumbnail to adjust individual images.",
    "Select page size, orientation, margins, fit modes, and compression presets in the sidebar.",
    "Optionally configure watermarks, headers, footers, and custom document metadata.",
    "Review document pages inside the live PDF preview pane.",
    "Click 'Download PDF' (or 'Download ZIP' for separate PDFs) to decompile and export your file."
  ],

  examples: [
    {
      title: "Corporate Expense Record Pack",
      description: "Compile several PNG/JPG invoice images into a lightweight A4 PDF for accounting.",
      input: "4 Receipt images (PNG/JPG), Page Size: A4, Layout: Fit to Page, Quality: Balanced",
      output: "Expense_Receipts.pdf (4 pages, file size ~280 KB, text and borders sharp)"
    },
    {
      title: "Art Portfolio Compilation",
      description: "Bundle high-resolution illustration files into a borderless portfolio PDF.",
      input: "8 Portfolio illustrations (WebP), Page Size: Letter, Layout: Fill Page, Quality: Original",
      output: "Art_Portfolio_2026.pdf (8 pages, borderless Letter Landscape layout preserving color profiles)"
    }
  ],

  relatedTools: [
    { name: "PDF to Word", slug: "pdf-to-word" },
    { name: "Word to PDF", slug: "word-to-pdf" },
    { name: "Excel to PDF", slug: "excel-to-pdf" },
    { name: "PowerPoint to PDF", slug: "powerpoint-to-pdf" },
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "PDF OCR", slug: "pdf-ocr" }
  ],

  faq: [
    {
      question: "How do I convert images to a PDF?",
      answer: "Upload your images by dragging them into the drop zone or clicking to browse. Arrange the pages using the thumbnail grid, configure your page size, margins, and quality presets in the settings panel, and click 'Download PDF' to compile and download your document."
    },
    {
      question: "Can I combine multiple images into a single PDF?",
      answer: "Yes. You can upload multiple images (JPG, PNG, WebP, GIF, or BMP) and compile them into a single multi-page PDF document, or export them as separate PDF files."
    },
    {
      question: "Is my document data secure when using this converter?",
      answer: "Yes. The conversion engine runs entirely locally in your web browser. Your images and documents are never uploaded to any server, keeping your personal data private."
    },
    {
      question: "What image formats are supported?",
      answer: "The converter supports JPG, JPEG, PNG, WebP, GIF, and BMP formats. It is also designed to support HEIC, TIFF, and SVG files in future updates."
    },
    {
      question: "Can I rearrange the order of pages before creating the PDF?",
      answer: "Yes. Simply drag and drop the image thumbnails in the visual editor panel to rearrange the page order."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes. The interface is responsive and works in Safari, Chrome, and Firefox on iOS and Android devices, allowing you to convert photos directly from your camera roll."
    },
    {
      question: "How do I fit widescreen images onto portrait pages?",
      answer: "Select 'Fit to Page' under the fit options. This scales the image to fit within the page margins while preserving its original aspect ratio, preventing clipping."
    },
    {
      question: "Can I add custom margins to the pages?",
      answer: "Yes. You can choose from No Margin, Small, Medium, or Large presets, or enter custom margins in millimeters using the numerical settings."
    },
    {
      question: "What are the quality presets available?",
      answer: "The converter offers four presets: Original Quality (preserves the original image resolution and quality), High Quality (high-resolution output with light compression), Balanced (a balance between image clarity and compact file size), and Compressed (applies higher compression to create small file sizes for sharing)."
    },
    {
      question: "Does this tool support OCR?",
      answer: "The current version embeds images as flat visual pages. An OCR (Optical Character Recognition) update is planned to enable searchable text in the PDF output."
    },
    {
      question: "Can I add a custom text watermark?",
      answer: "Yes. Check the 'Text Watermark' option in the settings panel to add a custom text overlay, and adjust its color, font size, opacity, and rotation angle."
    },
    {
      question: "Can I use a company logo as an image watermark?",
      answer: "Yes. You can upload a PNG or JPG logo file in the watermark settings, adjust its opacity and scale, and it will overlay on every page of your PDF."
    },
    {
      question: "How does the 'Auto' page size setting work?",
      answer: "The 'Auto' page size setting scales each PDF page's dimensions to match the pixel dimensions of its corresponding image, preventing cropping or empty margins."
    },
    {
      question: "What is the limit on image file sizes?",
      answer: "Because processing occurs inside your device's memory, the limit depends on your browser's RAM capacity. We recommend keeping total uploads under 200MB."
    },
    {
      question: "Can I convert images to separate PDF documents in bulk?",
      answer: "Yes. Choose 'Separate PDFs' in the compilation mode. The converter will process the images in sequence and package the individual PDFs into a single ZIP archive."
    },
    {
      question: "Will animations in GIF files be preserved in the PDF?",
      answer: "PDF is a static format, so only the first frame of animated GIF files will be rendered on the page."
    },
    {
      question: "How do I rotate images that are sideways?",
      answer: "Each image thumbnail has a rotation button. Click it to rotate the image in 90-degree increments before generating the PDF."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes. Once the webpage loads, all code runs locally on your device. You can disconnect from the internet and continue converting images to PDF without interruption."
    },
    {
      question: "Can I save my favorite export settings?",
      answer: "Yes. Your customized layout profile (margins, orientations, watermarks) is saved in LocalStorage for future conversions."
    },
    {
      question: "Is the tool free to use?",
      answer: "Yes. All features, batch modes, watermarking, and ZIP exports are 100% free with no limits or watermarks forced on your files."
    },
    {
      question: "Why does the PDF size differ from the original image size?",
      answer: "This difference is caused by the chosen compression preset. The 'Balanced' and 'Compressed' presets compress the image streams to create smaller PDF file sizes for sharing."
    },
    {
      question: "Can I edit document properties like Title and Author?",
      answer: "Yes. Under the advanced settings panel, you can enter custom values for the PDF Title, Author, Subject, and Keywords."
    },
    {
      question: "Does this tool support password protection?",
      answer: "The current version focus on layout configuration and compilation. To encrypt your PDF, you can use our upcoming 'Protect PDF' tool on the platform."
    },
    {
      question: "How do I crop my images before converting?",
      answer: "Click the 'Edit' button on any image thumbnail to open the crop tool. Adjust the crop boundary box and click 'Apply Crop' to trim the image."
    },
    {
      question: "Will transparency in PNG or WebP files be preserved?",
      answer: "PDF pages have a solid white background, so transparent areas in PNG or WebP files will render as white inside the PDF document."
    },
    {
      question: "Can I duplicate pages in the editor?",
      answer: "Yes. Click the duplicate button on any image thumbnail to create an exact copy of that page."
    },
    {
      question: "Why did my conversion fail?",
      answer: "Large batches of high-resolution images can exceed browser memory limits. If this occurs, try selecting the 'Compressed' preset or processing your images in smaller batches."
    },
    {
      question: "Does the tool store copies of my files on a server?",
      answer: "No. All conversions happen client-side. No files are sent to any server, making this tool completely secure."
    },
    {
      question: "Can I convert HEIC photos from my iPhone?",
      answer: "The current version supports JPG, PNG, and WebP. We recommend converting HEIC files to JPG before uploading, and HEIC support is planned for future updates."
    },
    {
      question: "How are page numbers added to the PDF?",
      answer: "Under the layout settings, check the 'Page Numbers' option to append dynamic page counters (e.g. 'Page 3 of 12') to the margins."
    },
    {
      question: "Can I convert TIFF files?",
      answer: "TIFF support is planned for future releases. For now, please convert TIFF files to JPG or PNG before uploading."
    },
    {
      question: "Does the tool support SVG vector graphics?",
      answer: "SVG vector support is planned for a future update. Currently, SVG files will be rasterized to pixels before conversion."
    },
    {
      question: "Can I use the tool to create print-ready documents?",
      answer: "Yes. Select the 'Original Quality' preset and set page size and margins to match your print requirements."
    },
    {
      question: "How do I clear my conversion history?",
      answer: "In the history panel, click the 'Clear History' button to remove all saved task logs from your browser's local storage."
    },
    {
      question: "Can I paste images from my clipboard?",
      answer: "Yes. You can paste images directly into the workspace using the standard paste command (Ctrl+V or Cmd+V)."
    },
    {
      question: "Why does the preview render slowly?",
      answer: "The preview renders using PDF.js to show the exact layout of the PDF. For large files or slow devices, this process can take a few seconds."
    },
    {
      question: "Will my image metadata be preserved in the PDF?",
      answer: "Original camera EXIF metadata (GPS tags, device model, camera settings) is stripped during canvas rendering to protect your privacy."
    },
    {
      question: "Does this tool support GDPR and HIPAA compliance?",
      answer: "Yes. Because it uses client-side sandboxed execution, no data leaves your browser, ensuring GDPR and HIPAA compliance."
    },
    {
      question: "Can I use custom page dimensions?",
      answer: "Yes. Select 'Custom' under page sizes and enter your target width and height in millimeters."
    },
    {
      question: "How do I download my converted PDF?",
      answer: "Once the compilation is complete, click the 'Download PDF' button to save the file to your device."
    },
    {
      question: "Can I cancel a conversion in progress?",
      answer: "Yes. You can cancel the compilation process at any time by clicking the 'Cancel' button."
    },
    {
      question: "Are PDF forms supported?",
      answer: "No. This tool is designed for converting image layouts to static PDF pages. Interactive form fields are not supported."
    },
    {
      question: "Why are some images compressed automatically?",
      answer: "The engine automatically compresses PNG, BMP, or WebP files to JPEG format when using the Balanced or Compressed presets to prevent large PDF file sizes."
    },
    {
      question: "Can I add page titles or headers?",
      answer: "Yes. In the Headers and Footers settings panel, you can enter custom text to display at the top of each page."
    },
    {
      question: "What happens if I close the browser tab during conversion?",
      answer: "All active data is held in temporary browser memory. Closing the tab will cancel the process and discard any uploaded files."
    }
  ]
};
