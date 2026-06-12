import { ToolConfig } from './types';

export const imageMetadataRemoverToolConfig: ToolConfig = {
  slug: "image-metadata-remover",
  title: "Image Metadata Remover",
  shortDescription: "Securely remove hidden EXIF data, GPS location, and camera settings from your images. 100% free, browser-based, privacy-first photo cleaner.",
  category: "Image Tools",
  keywords: [
    "image metadata remover",
    "exif remover",
    "remove metadata from image",
    "remove exif data",
    "photo metadata cleaner",
    "image privacy cleaner",
    "remove gps from photos",
    "exif cleaner online",
    "delete photo metadata",
    "strip image metadata"
  ],
  features: [
    "Completely strip EXIF, GPS, and camera metadata",
    "100% Client-side processing (no files uploaded)",
    "Supports JPG, PNG, WEBP, and TIFF files",
    "Zero quality loss for metadata removal",
    "Batch processing for multiple images simultaneously",
    "Detailed Privacy Score analysis before and after",
    "Before & After metadata comparison view",
    "Export privacy reports"
  ],
  useCases: [
    "Protecting your home address by removing GPS data before sharing photos",
    "Anonymizing images before uploading to public forums or social media",
    "Reducing file size slightly by stripping unnecessary embedded data",
    "Removing camera serial numbers and author information for complete anonymity",
    "Cleaning multiple files at once for digital publishing workflows"
  ],
  howToSteps: [
    "Drag and drop one or more images into the upload area.",
    "The tool will instantly analyze the images and display the existing metadata and Privacy Risk Score.",
    "Review the detected metadata fields (such as GPS, Camera Make, Date).",
    "Click 'Remove Metadata' to securely clean the image entirely within your browser.",
    "Download the cleaned, privacy-safe image."
  ],
  relatedTools: [
    { name: "Image Metadata Viewer", slug: "image-metadata-viewer" },
    { name: "Compress Image", slug: "compress-image" },
    { name: "Image Converter", slug: "image-converter" }
  ],
  examples: [],
  faq: [
    {
      question: "What is image metadata?",
      answer: "Image metadata is hidden information embedded inside an image file. It can include the date and time the photo was taken, the camera model, exposure settings, and exact GPS coordinates."
    },
    {
      question: "What is EXIF data?",
      answer: "EXIF (Exchangeable Image File Format) is the specific standard used by digital cameras and smartphones to store technical data alongside the visual image."
    },
    {
      question: "Can metadata reveal my location?",
      answer: "Yes. If your phone's location services are enabled for the camera, the exact latitude and longitude of where the photo was taken are saved in the EXIF data. This can easily reveal your home address or workplace."
    },
    {
      question: "Does removing metadata reduce image quality?",
      answer: "No. Removing metadata only strips the text-based information embedded in the file headers. The visual pixel data remains completely untouched, so there is zero loss in visual quality."
    },
    {
      question: "Is my image uploaded to your servers?",
      answer: "Absolutely not. Our Image Metadata Remover is a 100% client-side tool. Your images are processed entirely within your web browser. No files are ever uploaded, stored, or transmitted, ensuring total privacy."
    },
    {
      question: "Will GPS coordinates be removed?",
      answer: "Yes, all GPS coordinate blocks, altitude data, and location-based EXIF tags are permanently stripped from the file during the cleaning process."
    },
    {
      question: "Can I remove metadata from multiple images at once?",
      answer: "Yes, our tool supports batch processing. You can select or drag-and-drop multiple images, and the tool will clean all of them simultaneously."
    },
    {
      question: "What file formats are supported?",
      answer: "The tool currently supports JPG (JPEG), PNG, WEBP, and TIFF image formats. JPG is the most common format containing heavy EXIF data."
    },
    {
      question: "Why do social media sites strip metadata?",
      answer: "Major platforms like Facebook, Twitter, and Instagram strip metadata automatically when you upload an image to protect user privacy and reduce server storage costs. However, if you share a file via email, direct messaging, or cloud storage, the metadata remains intact."
    },
    {
      question: "What is the Privacy Risk Score?",
      answer: "Our tool calculates a Privacy Risk Score based on the sensitivity of the hidden data. High-risk data includes exact GPS coordinates and unique device serial numbers. The cleaner removes this data, returning your score to 'Safe'."
    },
    {
      question: "Can metadata be recovered once removed?",
      answer: "No. Once you use our tool to remove the metadata and save the new file, that embedded data is permanently deleted from the new file and cannot be recovered by forensic tools."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, our Image Metadata Remover is completely free with no usage limits, no watermarks, and no sign-up required."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes. Since it is browser-based, you can use it on any modern smartphone or tablet (iOS or Android) to clean photos directly from your camera roll."
    },
    {
      question: "Will the image resolution change?",
      answer: "No. The width and height (resolution) of the image remain exactly the same. Only the invisible metadata is altered."
    },
    {
      question: "Why should I care about camera settings being public?",
      answer: "While camera settings (like ISO, shutter speed) aren't necessarily a privacy risk, some professional photographers prefer to keep their specific techniques and setups private."
    },
    {
      question: "Can I selectively remove only GPS data?",
      answer: "Our default and most secure mode is 'Remove All Metadata', which ensures no hidden or proprietary tags are left behind. We recommend full removal for maximum privacy."
    },
    {
      question: "Does screenshots have EXIF data?",
      answer: "Usually, screenshots taken natively on a phone or computer do not contain EXIF data like GPS or camera settings, because they are generated by the OS, not a camera sensor."
    },
    {
      question: "What happens to the ICC Color Profile?",
      answer: "By default, standard metadata removal tools may strip color profiles, reverting to sRGB. For standard web use, this is perfectly fine. If you require strict color management, ensure your original file was converted to sRGB before stripping."
    },
    {
      question: "Can metadata contain viruses?",
      answer: "In rare cases, malicious scripts can be hidden in metadata text fields (steganography). Removing metadata neutralizes this risk, which is why many corporate environments scrub incoming images."
    },
    {
      question: "What does EXIF stand for?",
      answer: "EXIF stands for Exchangeable Image File Format. It is the international standard for storing metadata in digital photography."
    },
    {
      question: "Can I view the metadata before removing it?",
      answer: "Yes, our tool automatically displays a summary of the detected metadata (like Camera Make, Date, and GPS status) as soon as you select a file."
    },
    {
      question: "Is there a file size limit?",
      answer: "Because processing happens entirely on your device's memory (RAM), the file size limit is determined by your browser. Most modern browsers easily handle images up to 50MB."
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
      answer: "Our tool appends '-cleaned' to the original filename so you don't accidentally overwrite your original, unedited photo."
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
    }
  ],
  longDescription: `
<h2>The Ultimate Guide to Removing Image Metadata</h2>

<p>Every time you take a photo with a smartphone or digital camera, you capture much more than just the visual scene. Hidden within the file's code is a vast array of information known as <strong>Metadata</strong> (or EXIF data). This invisible text can include the exact date and time the photo was taken, the specific make and model of your device, and most concerning of all—the precise GPS coordinates of your location.</p>

<p>While this data is useful for organizing your personal photo library, it poses a severe security risk when shared online. Our <strong>Image Metadata Remover</strong> is a professional, 100% client-side privacy tool designed to instantly and permanently scrub this hidden data from your photos before you share them.</p>

<h3>The Hidden Dangers of Image Metadata</h3>

<p>Most people are unaware that their photos are broadcasting their personal information. Here is a breakdown of the sensitive data commonly found in standard JPEG files:</p>

<ul>
<li><strong>Exact GPS Coordinates:</strong> By default, most smartphones embed the latitude, longitude, and altitude of where a photo was taken. If you take a picture in your living room and post it to a public forum or send it via email, anyone can extract the GPS data and find your home address.</li>
<li><strong>Device Serial Numbers:</strong> Many professional cameras embed a unique hardware serial number into the metadata. This can be used to track every photo you upload across the internet back to your specific device.</li>
<li><strong>Date and Time:</strong> EXIF data records the exact second the shutter was pressed. This can be used to track your daily routines and habits.</li>
<li><strong>Software History:</strong> Metadata can reveal if an image has been manipulated in Photoshop or other editing software.</li>
</ul>

<h3>Why You Must Use an EXIF Remover</h3>

<p>In an age of increasing digital surveillance and data scraping, protecting your privacy is paramount. While major social media platforms (like Facebook and Instagram) automatically strip metadata during the upload process to save storage space, <em>many other communication methods do not.</em></p>

<p>You absolutely must use an EXIF cleaner if you are:</p>
<ol>
<li><strong>Sending Photos via Email:</strong> Email attachments preserve 100% of the original file, including all hidden GPS data.</li>
<li><strong>Uploading to Forums or Blogs:</strong> Many independent websites, Reddit (in some cases), and private forums do not scrub EXIF data.</li>
<li><strong>Sharing Files via Cloud Storage:</strong> Sending a Dropbox or Google Drive link gives the recipient access to the untouched original file.</li>
<li><strong>Working as a Journalist or Whistleblower:</strong> Protecting your anonymity and the location of your sources requires absolute metadata sanitization.</li>
<li><strong>Selling Items Online:</strong> Posting photos of items for sale on classified sites can inadvertently reveal your exact home location to strangers.</li>
</ol>

<h3>How Our Client-Side Metadata Cleaner Works</h3>

<p>The biggest irony of most "privacy tools" on the internet is that they require you to upload your sensitive files to their remote servers to clean them. This defeats the entire purpose of privacy!</p>

<p>Our <strong>Image Metadata Remover</strong> uses revolutionary <em>client-side processing</em>. We utilize modern WebAssembly and JavaScript File APIs to read the binary code of your image directly inside your web browser's memory. When you click "Remove Metadata," our script physically deletes the EXIF (Exchangeable Image File Format), IPTC, and XMP byte blocks from the file locally.</p>

<p><strong>The file never leaves your device. No data is transmitted over the internet. No servers are involved.</strong></p>

<h3>Zero Quality Loss Guarantee</h3>

<p>A common misconception is that altering an image file will degrade its quality. Because our tool interacts strictly with the <em>header metadata blocks</em> and not the compressed pixel data payload, removing metadata from JPEG files results in <strong>zero visual quality loss</strong> and no re-compression artifacts. It is mathematically identical visually to the original, just a few kilobytes smaller due to the removed text.</p>

<h3>Understanding the Privacy Risk Score</h3>

<p>When you load an image into our tool, it performs an instant forensic analysis and generates a <strong>Privacy Risk Score</strong>.</p>
<ul>
<li><strong>High Risk (Red):</strong> The image contains exact GPS coordinates. Sharing this file is highly dangerous.</li>
<li><strong>Moderate Risk (Yellow):</strong> The image contains identifiable device information (like a unique camera serial number) or specific date/time patterns.</li>
<li><strong>Safe (Green):</strong> The image has been scrubbed. It contains no EXIF, no GPS, and no identifiable tracking markers.</li>
</ul>

<h3>Batch Processing for Efficiency</h3>

<p>If you are a photographer preparing a large gallery for a client, or a webmaster optimizing assets for a website, scrubbing images one by one is tedious. Our tool fully supports batch processing. Simply select or drag multiple files into the drop zone, and our local engine will scrub the metadata from all of them simultaneously, allowing you to download the cleaned files in a ZIP archive or individually.</p>

<h3>Conclusion</h3>

<p>Digital privacy requires proactive measures. You cannot rely on third-party platforms to protect your identity and location. By making the <strong>Image Metadata Remover</strong> a standard part of your digital workflow, you ensure that every photo you share online is stripped of hidden tracking data, keeping your exact location, device history, and personal habits completely anonymous.</p>
  `
};
