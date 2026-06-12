import { ToolConfig } from './types';

export const imageMetadataViewerToolConfig: ToolConfig = {
  slug: "image-metadata-viewer",
  title: "Image Metadata Viewer",
  shortDescription: "View hidden EXIF data, camera settings, GPS location, and privacy risks inside your photos. Fast, secure, 100% client-side processing.",
  category: "Image Tools",
  keywords: [
    "image metadata viewer",
    "exif viewer online",
    "photo metadata reader",
    "view image exif data",
    "gps metadata checker",
    "image information viewer",
    "camera settings viewer",
    "check photo metadata",
    "exif data extraction",
    "privacy metadata check"
  ],
  features: [
    "Comprehensive EXIF data extraction (Camera, Lens, Settings)",
    "GPS coordinate detection with maps integration",
    "Privacy Risk Score analyzer",
    "Detailed ICC Color Profile and format analysis",
    "Secure, 100% client-side in-browser parsing",
    "Export metadata to JSON, CSV, or TXT"
  ],
  useCases: [
    "Checking photos for hidden GPS data before posting online",
    "Analyzing camera settings (ISO, Aperture) to learn photography techniques",
    "Verifying copyright and author information",
    "Ensuring privacy compliance for digital assets",
    "Extracting metadata for forensics or professional analysis"
  ],
  howToSteps: [
    "Upload your image by dragging and dropping it into the viewer, or click to browse.",
    "The tool will instantly parse the file entirely within your browser.",
    "Navigate through the categorized tabs: General Info, Camera EXIF, GPS Location, and Color Profile.",
    "Check your 'Privacy Score' to see if your image contains sensitive identifiable data.",
    "Use the Export buttons to download the metadata as a JSON, CSV, or TXT file."
  ],
  relatedTools: [
    { name: "Crop Image", slug: "crop-image" },
    { name: "Image Converter", slug: "image-converter" },
    { name: "Compress Image", slug: "compress-image" }
  ],
  examples: [],
  faq: [
    {
      question: "What is image metadata?",
      answer: "Image metadata is hidden text information embedded within an image file. It acts as a digital fingerprint, storing details about how the image was created, what device captured it, the software used to edit it, and sometimes where it was taken."
    },
    {
      question: "What does EXIF stand for?",
      answer: "EXIF stands for Exchangeable Image File Format. It is the standard format used by digital cameras and smartphones to store technical data (like shutter speed, aperture, and ISO) alongside the image itself."
    },
    {
      question: "Can anyone view my image metadata?",
      answer: "Yes. If you upload an original photo to the internet (such as sending it via email, or uploading to certain uncompressed file hosts), anyone who downloads that file can use a tool like this to read the metadata."
    },
    {
      question: "Is it safe to use this tool?",
      answer: "Absolutely. Our Image Metadata Viewer runs entirely client-side. Your images are parsed directly inside your browser and are never uploaded, stored, or transmitted to our servers."
    },
    {
      question: "Can metadata reveal my location?",
      answer: "Yes. If your phone or camera has GPS location tagging enabled, the exact latitude and longitude where the photo was taken will be saved in the EXIF data. This can reveal your home address or current location if shared."
    },
    {
      question: "Does social media strip metadata?",
      answer: "Major social platforms like Instagram, Facebook, and Twitter typically strip metadata (including GPS) when you upload a photo to protect user privacy and save space. However, if you share photos via email, messaging apps as 'files', or cloud storage, the metadata remains intact."
    },
    {
      question: "What is a Privacy Risk Score?",
      answer: "Our tool analyzes your image for sensitive information such as exact GPS coordinates, unique camera serial numbers, and software editing footprints. A higher score indicates a higher risk of personal identification or location tracking."
    },
    {
      question: "How do I remove metadata from my images?",
      answer: "To remove metadata, you can use our upcoming 'Image Metadata Remover' tool, or manually strip it using image editing software by exporting for the web without including EXIF data."
    },
    {
      question: "What file formats does this tool support?",
      answer: "The viewer supports JPG, JPEG, PNG, WEBP, TIFF, HEIC, and AVIF formats, as long as your browser supports reading them."
    },
    {
      question: "What is an ICC Profile?",
      answer: "An ICC profile is data embedded in an image that defines its color space (like sRGB, Adobe RGB, or ProPhoto RGB). This ensures the colors look accurate across different monitors and printers."
    },
    {
      question: "Why is the camera model shown in the metadata?",
      answer: "Camera manufacturers embed the Make and Model into the EXIF data so photographers know exactly what gear was used. This data is permanent unless intentionally wiped."
    },
    {
      question: "What does 'Focal Length' mean in EXIF data?",
      answer: "Focal Length indicates how 'zoomed in' the lens was when the picture was taken, measured in millimeters (e.g., 50mm, 24mm). This is useful for photographers analyzing techniques."
    },
    {
      question: "Can metadata tell me if a photo has been photoshopped?",
      answer: "Often, yes. Programs like Adobe Photoshop or Lightroom write their names into the 'Software' or 'Processing' tags within the metadata when saving an edited file."
    },
    {
      question: "Why does my image have no metadata?",
      answer: "If your image has no metadata, it was likely downloaded from social media (which strips it), saved via a screenshot tool, or intentionally scrubbed by the author."
    },
    {
      question: "What is IPTC data?",
      answer: "IPTC data is a standard used by news agencies and photographers to embed copyright information, author credits, and captions directly into the image file."
    },
    {
      question: "How do I download the metadata?",
      answer: "Once the tool parses your image, click the 'Export' buttons at the top of the dashboard. You can download the complete raw data as a formatted JSON, a plain TXT file, or a spreadsheet-ready CSV."
    },
    {
      question: "What is 'Exposure Time'?",
      answer: "Exposure time, or shutter speed, is the length of time the camera's sensor was exposed to light. It is usually represented as a fraction of a second, such as 1/200."
    },
    {
      question: "What does F-Number mean?",
      answer: "The F-Number (or Aperture) indicates how wide the lens opening was. A lower number (like f/1.8) means a wider opening, which creates a blurry background (shallow depth of field)."
    },
    {
      question: "What is ISO speed rating?",
      answer: "ISO represents the camera sensor's sensitivity to light. A higher ISO (e.g., 3200) allows shooting in the dark but introduces 'noise' or grain to the image."
    },
    {
      question: "Does my iPhone save GPS data?",
      answer: "Yes, by default, iPhones save exact GPS coordinates to photos. You can turn this off in your iPhone's Settings under Privacy > Location Services > Camera."
    },
    {
      question: "What is the difference between Date Created and Date Modified?",
      answer: "Date Created (or DateTimeOriginal) is when the shutter was pressed. Date Modified changes when you edit the file in software like Photoshop or rotate it."
    },
    {
      question: "Can I edit the metadata with this tool?",
      answer: "No, this specific tool is an 'Analyzer' and 'Viewer'. It is strictly read-only to ensure accuracy and forensics integrity."
    },
    {
      question: "What does the 'Orientation' tag do?",
      answer: "The Orientation tag tells image viewers whether to display the photo normally, or rotate it 90, 180, or 270 degrees. This is why sometimes photos look sideways on older computers."
    },
    {
      question: "Why do my screenshots have no EXIF data?",
      answer: "Screenshots are generated by your operating system, not a camera sensor, so they do not contain camera settings or GPS coordinates. They only contain basic file properties."
    },
    {
      question: "What is 'Metering Mode'?",
      answer: "Metering mode tells you how the camera decided what the correct exposure should be—for example, measuring the whole scene (Matrix/Evaluative) or just the center (Spot)."
    },
    {
      question: "What does 'Flash Fired' mean?",
      answer: "The Flash EXIF tag indicates whether the camera's flash went off during the photo. It can also tell if the flash was forced on, forced off, or fired automatically."
    },
    {
      question: "What is a MIME type?",
      answer: "MIME type stands for Multipurpose Internet Mail Extensions. For images, it looks like 'image/jpeg' or 'image/png' and tells the browser exactly what kind of file it is reading."
    },
    {
      question: "Can metadata hold viruses?",
      answer: "While highly unlikely to execute directly just by viewing an image, malicious code can technically be hidden inside metadata fields. Our viewer safely reads and sanitizes text strings to prevent cross-site scripting."
    },
    {
      question: "Why is the file size listed differently in my OS than in the tool?",
      answer: "Operating systems calculate size in slightly different ways (Base-10 vs Base-2). We report standard formatting using standard 1024-byte kilobyte structures."
    },
    {
      question: "What is 'White Balance' in EXIF?",
      answer: "White balance shows whether the camera automatically adjusted color temperatures, or if the photographer manually set it for daylight, cloudy, or fluorescent lighting."
    },
    {
      question: "What is XMP data?",
      answer: "XMP (Extensible Metadata Platform) is an XML-based metadata format developed by Adobe. It can store edits, raw development settings, and advanced copyright info."
    },
    {
      question: "Why can't I see metadata on an image from WhatsApp?",
      answer: "WhatsApp aggressively compresses images and scrubs all metadata (including EXIF and GPS) before sending them to save server bandwidth and protect user privacy."
    },
    {
      question: "Can I use this tool on my mobile phone?",
      answer: "Yes. Our tool is fully responsive. You can open your phone's browser, select an image from your camera roll, and analyze its metadata instantly."
    },
    {
      question: "Is EXIF data legally binding for copyright?",
      answer: "EXIF/IPTC data helps establish a presumption of authorship, but true copyright protection requires registering the image with a government copyright office."
    },
    {
      question: "Does cropping an image remove EXIF data?",
      answer: "It depends on the software. Professional tools (like Photoshop) preserve it. Simple web croppers might strip it. Our 'Crop Image' tool explicitly retains original color profiles."
    },
    {
      question: "What is the 'Lens Make' and 'Lens Model'?",
      answer: "Interchangeable lens cameras (like DSLRs) write the exact lens attached to the camera into the metadata. This is great for figuring out how a specific look was achieved."
    },
    {
      question: "Can metadata show altitude?",
      answer: "Yes. If the camera has a GPS and altimeter (like an iPhone or a drone), the EXIF data will record the altitude above sea level."
    },
    {
      question: "What is the 'Color Space' tag?",
      answer: "Color Space tells you the gamut of colors the image supports. Most web images are sRGB. Professional print images might be Adobe RGB."
    },
    {
      question: "Why does the tool show a map?",
      answer: "If we detect GPS Latitude and Longitude in the metadata, we generate a convenient 'Open in Maps' link so you can immediately see where the photo was taken."
    },
    {
      question: "Can I upload RAW photos (.CR2, .NEF)?",
      answer: "Currently, our tool supports standard web formats (JPG, PNG, TIFF, WEBP, HEIC). Native RAW files are massive and highly complex, but support is planned for a future update."
    },
    {
      question: "What is Bit Depth?",
      answer: "Bit depth refers to the color information stored in an image. Standard JPGs are 8-bit. High-end TIFFs or RAW files might be 16-bit, allowing for billions of colors."
    },
    {
      question: "How accurate is the GPS data?",
      answer: "GPS data from a modern smartphone is incredibly accurate, usually down to a few meters. This is why checking images before uploading them publicly is critical."
    },
    {
      question: "What is the JFIF segment?",
      answer: "JFIF (JPEG File Interchange Format) is a minimal standard for JPEGs. It stores basic resolution (DPI/PPI) and aspect ratio data separately from EXIF."
    },
    {
      question: "What does a high Privacy Risk Score mean?",
      answer: "A high score (e.g., 80-100/100) means the image contains exact GPS coordinates and unique device identifiers. Do not post this image publicly if you want to remain anonymous."
    },
    {
      question: "How do I read a downloaded CSV file?",
      answer: "You can open the CSV (Comma Separated Values) file in Microsoft Excel, Google Sheets, or Apple Numbers to view the metadata in a structured spreadsheet format."
    },
    {
      question: "Does the viewer work offline?",
      answer: "Yes, because the tool relies on a Progressive Web App (PWA) architecture and client-side JavaScript, if the page is loaded, it will analyze images without an internet connection."
    },
    {
      question: "What is DPI?",
      answer: "DPI (Dots Per Inch) or PPI (Pixels Per Inch) indicates print resolution. A standard web image is 72 DPI, while print-quality images are usually 300 DPI."
    },
    {
      question: "Can metadata show if a flash fired?",
      answer: "Yes, the 'Flash' tag records whether the flash fired, whether red-eye reduction was used, and sometimes even the flash energy output."
    },
    {
      question: "Can I batch process images for metadata?",
      answer: "Currently, our Image Metadata Viewer is designed for deep-dive analysis of a single image at a time to ensure clarity and detailed reporting."
    },
    {
      question: "Is this tool completely free?",
      answer: "Yes, the Image Metadata Viewer is 100% free, unlimited, and runs entirely in your browser with no subscription required."
    }
  ],
  longDescription: `
<h2>The Ultimate Guide to Image Metadata and EXIF Data</h2>

<p>Every photograph you take with a smartphone or digital camera contains a hidden treasure trove of information. Beyond the visual pixels that make up the image, files store complex data structures known as <strong>Metadata</strong>. For photographers, developers, and privacy-conscious users, understanding how to read, analyze, and manage this data is absolutely critical.</p>

<p>Our professional <strong>Image Metadata Viewer</strong> is an enterprise-grade, client-side tool designed to instantly extract and display this hidden data directly in your browser. Whether you are learning photography techniques by analyzing <em>camera settings</em> or performing a security audit by checking for hidden <em>GPS coordinates</em>, our EXIF reader provides an unparalleled, secure experience.</p>

<h3>What is Image Metadata?</h3>

<p>Metadata, in the simplest terms, is "data about data." In the context of images, it is text-based information injected into the binary code of the file. It provides context about the image's origin, technical specifications, and editing history.</p>

<p>Metadata is broken down into several major industry standards:</p>

<ol>
<li><strong>EXIF (Exchangeable Image File Format):</strong> The most common type. Created by the camera hardware at the moment the shutter clicks. It contains technical photography data.</li>
<li><strong>IPTC (International Press Telecommunications Council):</strong> Used primarily by photojournalists and news agencies. It stores copyright notices, author credits, and captions.</li>
<li><strong>XMP (Extensible Metadata Platform):</strong> Developed by Adobe, this format is highly flexible and stores editing history, RAW development parameters, and complex structural data.</li>
<li><strong>ICC Profiles:</strong> Stores color space data (e.g., sRGB vs Adobe RGB) to ensure colors render identically across different screens and printers.</li>
</ol>

<h3>Why Should You Check Image Metadata?</h3>

<p>Using a <strong>photo metadata viewer</strong> isn't just for tech-savvy developers; it has massive implications for everyday internet users.</p>

<h4>1. Privacy and Security (The Dangers of GPS)</h4>
<p>Most modern smartphones have location services enabled for the camera application by default. When you take a photo at home, your phone writes the exact latitude, longitude, and altitude into the EXIF data. If you upload that original file to a public forum, a blog, or send it directly via email, anyone who downloads the file can use an <em>EXIF Viewer Online</em> to find your exact home address. Our tool calculates a <strong>Privacy Risk Score</strong> to alert you to these dangers before you share a photo.</p>

<h4>2. Learning Photography Techniques</h4>
<p>Have you ever looked at a stunning photograph and wondered how the photographer achieved such a perfectly blurred background or sharp freeze-frame motion? By running the photo through an <em>image information viewer</em>, you can read the "Exposure Triangle" settings used at that exact moment:</p>
<ul>
<li><strong>Aperture (F-Stop):</strong> Determines depth of field (e.g., f/1.8).</li>
<li><strong>Shutter Speed:</strong> Determines motion blur (e.g., 1/1000s).</li>
<li><strong>ISO:</strong> Determines sensor sensitivity to light.</li>
<li><strong>Focal Length:</strong> The zoom factor (e.g., 50mm or 85mm).</li>
</ul>

<h4>3. Verifying Copyright and Authenticity</h4>
<p>In an era of digital theft, proving ownership of an image can be difficult. Professional photographers inject their name, contact information, and copyright warnings into the IPTC metadata block. If you are licensing an image or trying to find the original owner of a piece of digital art, checking the metadata is step one.</p>

<h3>How Our Client-Side Metadata Analyzer Works</h3>

<p>There are hundreds of <em>metadata viewers</em> on the internet, but the vast majority of them require you to upload your sensitive personal photographs to their remote servers. This poses an immense security risk—you are trusting an unknown server with photos that may contain your location, family, or confidential documents.</p>

<p>Our tool revolutionizes this process by using advanced <strong>client-side parsing technology</strong>.</p>

<p>When you drag and drop a file into our tool, JavaScript running <em>locally on your machine</em> reads the binary headers of the file (such as the JPEG APP1 markers). It parses the complex byte structures locally and immediately renders the output to your screen. <strong>No bytes ever leave your device.</strong></p>

<h3>Key Features of the Analyzer Dashboard</h3>

<p>Our dashboard provides a clean, professional, and dense layout to explore metadata:</p>

<ul>
<li><strong>General Information:</strong> Instantly verify file type, MIME string, exact byte size, and aspect ratios.</li>
<li><strong>Camera EXIF Dashboard:</strong> Beautifully formatted readouts for Make, Model, Lens Model, and exposure values.</li>
<li><strong>GPS Map Integration:</strong> If latitude and longitude are found, they are converted from raw GPS format (Degrees, Minutes, Seconds) into decimal format, paired with a dynamic "Open in Maps" button for instant geographic verification.</li>
<li><strong>Data Exporting:</strong> For digital forensics or professional archiving, click a single button to download the entire extracted metadata payload as formatted JSON, a flat TXT file, or a CSV spreadsheet.</li>
</ul>

<h3>How to Strip Metadata for Privacy</h3>

<p>If you use our tool and discover your image contains a Privacy Risk Score of 100/100 due to embedded GPS data, how do you fix it?</p>

<p>The easiest method is to pass the image through a compression tool or use an explicitly designed "Save for Web" feature in a photo editor. When Photoshop or similar programs save for the web, they strip all extraneous EXIF blocks to reduce file size, inadvertently solving the privacy issue. You can also use dedicated mobile apps designed to "Scrub" metadata from your camera roll before sharing.</p>

<h3>Conclusion</h3>

<p>Understanding the invisible data attached to your photographs empowers you to take control of your digital footprint and improve your photography skills. Bookmark our secure, free, and lightning-fast <strong>Image Metadata Viewer</strong> and always check your files before distributing them across the web.</p>
  `
};
