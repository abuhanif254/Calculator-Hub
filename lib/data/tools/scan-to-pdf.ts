import { ToolConfig } from './types';

export const scanPdfConfig: ToolConfig = {
  slug: "scan-to-pdf",
  title: "Scan to PDF",
  shortDescription: "Turn your smartphone or webcam into a professional document scanner. Capture, enhance, and convert images into a high-quality PDF entirely in your browser.",
  category: "Image Tools",
  keywords: [
    "Scan to PDF", "Document Scanner Online", "Camera to PDF", 
    "Mobile PDF Scanner", "Image Scan Converter", "Digital Document Scanner", 
    "PDF Scanner Tool", "Online Scan App", "Paper to PDF", "Receipt Scanner"
  ],

  longDescription: `
## The Ultimate Browser-Based Document Scanner: Turn Your Camera into a Mobile PDF Engine

In the era of remote work, digital archiving, and paperless offices, the ability to rapidly digitize physical documents is no longer a luxury—it's an absolute necessity. However, downloading bulky, ad-filled scanner apps or paying expensive monthly subscriptions for premium PDF software is inefficient and often compromises your privacy.

Our **Scan to PDF** tool revolutionizes document digitization by bringing enterprise-grade scanning capabilities directly into your web browser. Whether you are using a smartphone, a tablet, or a laptop webcam, you can instantly capture, crop, enhance, and compile physical papers into a polished, professional PDF.

---

## Why Digitize? The Death of the Filing Cabinet

The modern business landscape moves at the speed of digital. Physical paper is fragile, easily lost, highly flammable, and impossible to search. By converting your receipts, contracts, lecture notes, and whiteboards into universally compatible PDF files, you unlock a multitude of benefits:

### 1. Instant Global Accessibility
A physical contract sitting on your desk in New York is useless to your business partner in Tokyo. By scanning it to a PDF, you instantly convert a physical object into a digital asset that can be emailed, securely uploaded to a cloud drive, or submitted to a digital portal in seconds.

### 2. Legal and Financial Compliance
Tax authorities (such as the IRS or HMRC) and corporate accounting departments mandate strict record-keeping. Faded, crumpled receipts are frequently rejected. Scanning your expense receipts into crisp, black-and-white PDFs ensures they remain legible and compliant for decades, surviving long after the thermal ink on the physical receipt has faded away.

### 3. Disaster Recovery and Security
Paper is highly susceptible to fire, flood, and theft. Digitizing your critical documents—birth certificates, property deeds, tax returns, and medical records—allows you to apply the 3-2-1 backup strategy (three copies, two different media types, one off-site location). A digital PDF can be encrypted, password-protected, and backed up to multiple secure servers worldwide.

---

## How Our Web-Based Scanner Technology Works

Traditional scanner apps require installation from an app store, requiring you to grant them pervasive permissions to your device. Our tool is built on modern Web APIs, meaning it operates entirely within the secure sandbox of your browser.

### 1. The \`getUserMedia\` API
When you click the camera button, your browser utilizes the \`getUserMedia\` API. This securely requests temporary access to your device's camera. You retain total control. We do not (and cannot) access your camera without your explicit, real-time consent. This API streams high-resolution video directly to an HTML5 Canvas element on your screen.

### 2. High-Performance Canvas Image Processing
Capturing a photo of a document usually results in a file with poor lighting, gray backgrounds, and washed-out text. To simulate the results of a physical flatbed scanner, our tool utilizes the HTML5 Canvas API to apply complex matrix transformations to the image pixels in real-time.
- **Grayscale Conversion:** Strips away color data, drastically reducing the file size and removing background color casts.
- **Dynamic Contrast Enhancement (B&W Document Mode):** Mathematically pushes light gray pixels toward pure white and dark gray pixels toward pure black, making text crisp and highly legible while deleting background noise.

### 3. Client-Side PDF Generation (\`pdf-lib\`)
Once you have captured and enhanced your images, the tool uses the highly optimized \`pdf-lib\` JavaScript library. It generates a mathematically valid PDF structure, embeds your compressed Canvas images into standardized page sizes (like A4 or US Letter), and outputs a final file. 

Because all of this processing happens in the RAM of your local device, it is incredibly fast and completely offline-capable once the page has loaded.

---

## Security and Privacy: The Zero-Upload Guarantee

The most critical feature of our Scan to PDF tool is what it *doesn't* do. **It does not upload your sensitive documents to our servers.**

When you use other free online scanner tools, your images are transmitted over the internet to a remote server. The server processes the images, creates the PDF, and sends it back to you. This creates a massive security vulnerability. What if you are scanning a signed NDA, a patient's medical chart, or your passport? You have no guarantee that the remote server won't retain a copy of your highly sensitive data.

Our tool is engineered with a strict **Zero-Upload Architecture**. The camera feed, the image enhancement, and the PDF generation all execute entirely within your device's web browser using local processing. Your data never touches our network. This architecture ensures complete compliance with global privacy regulations, including GDPR, HIPAA, and CCPA.

---

## Step-by-Step Guide to Professional Mobile Scanning

To get the best possible results from your smartphone or webcam, follow these professional scanning techniques:

### Step 1: Optimize Your Environment
- **Lighting is King:** Place your document in a well-lit area. Natural sunlight from a window is best. Avoid harsh, direct overhead lights that create hard shadows from your phone or your hand.
- **Contrast matters:** Place your white paper on a dark surface (like a dark wooden table). This high contrast helps the camera lens focus properly and makes manual cropping significantly easier later on.
- **Flatten the document:** Smooth out any folds or wrinkles. If the paper is curved, the text will appear distorted in the final PDF.

### Step 2: Capture the Image
- Open our **Scan to PDF** tool and grant camera access.
- Hold your device perfectly parallel to the document. Do not scan at a severe angle.
- Ensure the entire document is visible within the frame.
- Tap the capture button. You can capture multiple pages in rapid succession to create a multi-page PDF.

### Step 3: Enhance and Organize
- Once captured, review your images in the dashboard.
- If you took photos of standard paper documents, apply the **B&W Document** filter. This will immediately strip out shadows and make the text look like it was photocopied.
- If the image is upside down, use the rotate controls.
- You can drag and drop the page thumbnails to easily reorder them.

### Step 4: Generate and Export
- Select your desired page size (A4 is standard globally; US Letter is standard in North America; "Fit to Image" maintains the original aspect ratio).
- Click "Generate PDF". Within milliseconds, your multi-page document will be compiled and downloaded securely to your local device.

---

## Beyond the Basics: Advanced Use Cases

Our browser-based scanner is highly versatile. Consider these advanced applications:

- **Whiteboard Capture:** After a crucial meeting, take a photo of the whiteboard. Apply the contrast enhancement filter to turn the reflective whiteboard surface pure white and make the marker ink pop. Save it as a PDF and distribute it to the team.
- **Receipt Archiving:** Turn your phone into a dedicated expense tracker. Snap photos of every receipt during a business trip. Compile them all into a single, multi-page PDF expense report before you even board your flight home.
- **Student Notes Digitization:** Quickly scan textbook pages or handwritten lecture notes. Exporting them as a PDF allows you to annotate them later on your tablet or laptop.

Ditch the heavy desktop scanners and the invasive mobile apps. Experience the speed, privacy, and quality of our browser-based Scan to PDF engine today.
  `,

  features: [
    "Live Camera Capture: Access your device's camera directly in the browser to snap photos of documents instantly.",
    "Zero-Upload Privacy: All image processing and PDF compilation occurs locally on your device. Your sensitive documents are never uploaded to a remote server.",
    "B&W Document Enhancement: Apply advanced Canvas-based contrast filters to remove shadows, whiten backgrounds, and make text razor-sharp.",
    "Multi-Page Assembly: Snap dozens of photos in a row and compile them all into a single, cohesive PDF document.",
    "Drag-and-Drop Reordering: Easily organize your scanned pages by dragging the thumbnails into the correct sequence.",
    "Standardized Page Sizes: Export your PDF with standardized dimensions like A4 or US Letter, ensuring perfect printing later.",
    "Fallback Image Upload: Don't have a camera? Simply upload existing JPEGs or PNGs from your hard drive to convert them into a scanned PDF.",
    "No App Installation Required: Enjoy enterprise-grade mobile scanning without downloading bulky apps from the App Store or Google Play."
  ],

  useCases: [
    "Expense Reporting: Snap photos of business receipts while traveling and instantly compile them into a single PDF expense report.",
    "Contract Digitization: Scan signed physical contracts or NDAs and securely email them to clients without needing a physical flatbed scanner.",
    "Lecture Note Archiving: Photograph handwritten notes or textbook pages to create easily shareable, digital study guides.",
    "Whiteboard Archiving: Capture meeting notes from a whiteboard, enhance the contrast to remove glare, and distribute the PDF to the team.",
    "ID and Passport Scanning: Securely digitize sensitive identification documents using a zero-upload tool that guarantees your data remains private."
  ],

  howToSteps: [
    "Select your input method: Grant camera access to snap a live photo, or click to upload existing images from your device.",
    "Position your document on a contrasting background, ensure good lighting, and tap 'Capture' to take the photo.",
    "Repeat the capture process for as many pages as you need.",
    "Review your scanned pages in the dashboard. Use the 'Enhance' options to apply Grayscale or High-Contrast B&W filters to improve text legibility.",
    "Drag the page thumbnails to reorder them if they were captured out of sequence.",
    "Use the rotate buttons to fix any pages that were captured upside down.",
    "Select your preferred final page size (e.g., A4, US Letter, or Fit to Image).",
    "Click 'Download PDF' to locally generate and save your optimized document."
  ],

  examples: [
    {
      title: "Scanning a Multi-Page Contract",
      description: "A user photographs a 5-page legal contract using their smartphone camera. They apply the B&W filter to remove shadows, reorder page 3 and 4 via drag-and-drop, and instantly download a professional PDF.",
      input: "5 Camera Photos of Paper",
      output: "1 Clean, Multi-Page PDF"
    },
    {
      title: "Archiving Expense Receipts",
      description: "A business traveler uploads 10 separate photos of crumpled taxi and restaurant receipts. The tool enhances the contrast to make the faded ink legible and compiles them into a single PDF for HR.",
      input: "10 Receipt JPEGs",
      output: "1 Optimized Expense PDF"
    }
  ],

  faq: [
    {
      question: "Is it safe to scan sensitive documents like passports?",
      answer: "Yes, it is completely safe. Our tool uses a Zero-Upload architecture. The image processing and PDF creation happen entirely within your local browser. Your passport image is never sent over the internet."
    },
    {
      question: "Why does the browser ask for camera permissions?",
      answer: "To allow you to take live photos of your documents, the browser must request explicit permission to access your device's camera hardware via the getUserMedia API."
    },
    {
      question: "Do you store my scanned images?",
      answer: "No. Because all processing is handled locally on your device's RAM, we do not receive, process, or store your images or the resulting PDF on our servers."
    },
    {
      question: "What is the 'B&W Document' filter?",
      answer: "This is a specialized image enhancement filter that dramatically increases contrast. It forces light gray backgrounds to pure white and dark text to pure black, mimicking a high-quality photocopy."
    },
    {
      question: "Can I use this on my iPhone or Android?",
      answer: "Yes, the tool is heavily optimized for mobile devices. Simply open the web page on your smartphone browser, grant camera access, and start scanning."
    },
    {
      question: "Why is my scanned PDF file size so large?",
      answer: "Photos taken with modern smartphones are extremely high resolution (often 12+ megapixels). To reduce PDF size, apply the Grayscale or B&W filters, which discard heavy color data."
    },
    {
      question: "Can I upload images instead of using the camera?",
      answer: "Absolutely. If you already took photos using your phone's native camera app, you can use the 'Upload Images' button to import them into the PDF compiler."
    },
    {
      question: "Will it automatically crop the edges of my paper?",
      answer: "Currently, you must frame the document carefully when capturing. Advanced AI edge-detection and auto-cropping is a feature planned for a future upgrade."
    },
    {
      question: "What page size should I choose?",
      answer: "If you plan to print the document, choose A4 (Global Standard) or US Letter (North American Standard). If you just want to view it digitally, 'Fit to Image' works best."
    },
    {
      question: "Can I rearrange the order of the pages?",
      answer: "Yes, the dashboard features a drag-and-drop interface. Simply click and drag a page thumbnail to move it earlier or later in the document sequence."
    },
    {
      question: "Does this tool perform OCR (Optical Character Recognition)?",
      answer: "No, this tool converts images into a flattened PDF. To extract searchable text from the scanned PDF, you would need to run the output file through our dedicated PDF OCR tool."
    },
    {
      question: "Why is the camera feed blurry?",
      answer: "Blurry camera feeds are usually caused by the physical lens on your device being smudged, or your browser defaulting to a low-resolution camera stream. Try cleaning your lens and ensuring bright lighting."
    },
    {
      question: "Can I delete a page if I made a mistake?",
      answer: "Yes, every captured page thumbnail has a 'Trash' icon allowing you to easily delete mistakes before compiling the final PDF."
    },
    {
      question: "Is there a limit to how many pages I can scan?",
      answer: "The only limit is your device's available RAM. Modern smartphones can easily handle scanning and compiling 50+ pages into a single PDF."
    },
    {
      question: "What happens if I lose internet connection while scanning?",
      answer: "Because the tool relies on client-side processing, you can continue scanning, enhancing, and generating your PDF even if your internet connection drops entirely."
    },
    {
      question: "Can I scan multiple receipts onto one page?",
      answer: "Currently, the tool places one captured image per PDF page. To place multiple receipts on a single page, you would need to use a layout or collage tool prior to upload."
    },
    {
      question: "Does it support double-sided scanning?",
      answer: "You can easily scan double-sided documents by simply flipping the physical page over and taking a second photo. You can then reorder the pages digitally if needed."
    },
    {
      question: "Why do I get a camera error on my desktop?",
      answer: "If your desktop does not have a webcam, or if another application (like Zoom or Teams) is currently exclusively using the webcam, the browser cannot access it."
    },
    {
      question: "Does the PDF have a watermark?",
      answer: "No, we do not add any watermarks, logos, or branding to your generated PDFs. They are completely clean and professional."
    },
    {
      question: "Is this tool free?",
      answer: "Yes, our web-based document scanning utility is completely free to use with no hidden subscriptions or paywalls."
    },
    {
      question: "How do I fix a scanned page that is sideways?",
      answer: "Every page in the dashboard has rotate buttons. Simply click the rotate icon until the text is oriented correctly before generating the PDF."
    },
    {
      question: "What formats can I upload if I don't use the camera?",
      answer: "You can upload standard image formats including JPEG, PNG, WebP, and BMP."
    },
    {
      question: "How does the tool compress the PDF?",
      answer: "When compiling the PDF, the tool automatically utilizes internal JPEG compression on the embedded images to ensure the final PDF is a manageable size for emailing."
    },
    {
      question: "Can I add more pages to an existing PDF?",
      answer: "This tool generates a brand new PDF from images. To add pages to an existing PDF, you would use our Merge PDF tool."
    },
    {
      question: "Why is the background of my scan gray instead of white?",
      answer: "Cameras naturally expose for average lighting, which turns white paper gray. Use our 'B&W Document' enhancement filter to force the gray background to pure white."
    },
    {
      question: "Does it work on iPads?",
      answer: "Yes, the Safari browser on iPad supports the getUserMedia API, allowing you to use your iPad's rear camera to scan documents seamlessly."
    },
    {
      question: "Are the generated PDFs standard compliant?",
      answer: "Yes, we utilize the industry-standard pdf-lib library to generate ISO-compliant PDF files that will open perfectly in Adobe Acrobat, Chrome, or any standard viewer."
    },
    {
      question: "Can I switch between front and back cameras?",
      answer: "If your device has multiple cameras (like a smartphone), the tool will typically default to the high-resolution rear 'environment' camera."
    },
    {
      question: "What is the difference between Grayscale and B&W?",
      answer: "Grayscale retains 256 shades of gray, useful for scanning photos or complex diagrams. B&W pushes all pixels to extreme black or extreme white, perfect for pure text documents."
    },
    {
      question: "Can I use this offline?",
      answer: "Once the web application has initially loaded and cached in your browser, the scanning and processing functions do not require an active internet connection."
    },
    {
      question: "What if my camera permissions are blocked?",
      answer: "If you previously denied camera access, you must click the lock icon in your browser's URL bar, allow camera permissions for this site, and refresh the page."
    },
    {
      question: "Can I rename the output PDF?",
      answer: "Yes, your browser will prompt you to save the file when it downloads, allowing you to rename it to whatever you desire."
    },
    {
      question: "Does it remove shadows automatically?",
      answer: "The 'B&W Document' filter aggressively reduces shadows by blowing out mid-tones, but severe, hard shadows caused by bad lighting may still be visible."
    },
    {
      question: "Can I edit the text after scanning?",
      answer: "No, a scanned PDF is essentially a photograph of text. To edit the text, you must use OCR software to recognize the characters."
    },
    {
      question: "Why did my browser crash while scanning?",
      answer: "Scanning dozens of ultra-high-resolution images can consume massive amounts of RAM. If your device has low memory, try scanning in smaller batches (e.g., 10 pages at a time)."
    },
    {
      question: "How do I get the best scan quality?",
      answer: "Place the document on a dark background, ensure bright, even lighting, hold your phone perfectly steady and parallel to the paper, and tap the screen to focus before capturing."
    },
    {
      question: "Can I scan a book?",
      answer: "Yes, but scanning bound books can be difficult due to the curvature of the pages. Try to press the book as flat as possible without damaging the spine."
    },
    {
      question: "What happens to the image metadata?",
      answer: "When we process the Canvas image and embed it into the PDF, any EXIF metadata (like GPS location tags) from your original camera photo is permanently stripped out."
    },
    {
      question: "Can I share the PDF immediately?",
      answer: "Once downloaded to your device, you can instantly attach the PDF to an email, message, or upload it to your preferred cloud storage provider."
    },
    {
      question: "Are the scans legally binding?",
      answer: "A scanned PDF is generally accepted as a digital copy of an original document for most business and legal purposes, but you should consult local regulations for specific compliance."
    },
    {
      question: "Will it scan barcodes?",
      answer: "The tool will capture a visual image of the barcode, but it does not actively read or decode barcode data."
    },
    {
      question: "Can I scan business cards?",
      answer: "Yes, you can snap photos of business cards and compile them into a digital PDF rolodex."
    },
    {
      question: "Is there a maximum file size for image uploads?",
      answer: "Since processing is local, there are no hard server limits, but uploading images larger than 20MB each may cause your browser to lag during Canvas processing."
    },
    {
      question: "How do I print the scanned document?",
      answer: "Simply open the downloaded PDF in any standard PDF viewer (like Chrome or Acrobat) and select Print. If you chose A4 or Letter page sizes, it will format perfectly on standard printer paper."
    },
    {
      question: "What if the text looks jagged?",
      answer: "If the text looks overly jagged, the B&W contrast filter may be too aggressive for that specific document. Try using the Grayscale filter or 'Original' mode instead."
    },
    {
      question: "Does it support flash photography?",
      answer: "Our web app cannot explicitly force the device's hardware flash to fire. It relies on the ambient lighting and the camera's auto-exposure settings."
    },
    {
      question: "Can I scan glossy photos?",
      answer: "Yes, but glossy photos are highly prone to glare. Ensure you are in a brightly lit room but avoid direct light reflecting off the surface of the photo."
    },
    {
      question: "Is the PDF searchable on a Mac?",
      answer: "Not out of the box, as the PDF contains images, not text. However, macOS features built-in 'Live Text' which can sometimes recognize text inside images."
    },
    {
      question: "Can I scan a whiteboard from an angle?",
      answer: "You can, but currently, the tool does not perform perspective correction (un-skewing). For the best results, try to stand directly in front of the whiteboard."
    },
    {
      question: "How long does PDF generation take?",
      answer: "For a 5-page document, PDF compilation usually takes less than 1 second on a modern smartphone."
    }
  ],

  relatedTools: [
    { name: "Flatten PDF", slug: "flatten-pdf" },
    { name: "Image to PDF", slug: "image-to-pdf" },
    { name: "Compress Image", slug: "compress-image" },
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Merge PDF", slug: "merge-pdf" }
  ]
};
