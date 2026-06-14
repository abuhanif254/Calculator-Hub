import { ToolConfig } from './types';

export const base64ToImageConfig: ToolConfig = {
  slug: "base64-to-image",
  title: "Base64 to Image",
  shortDescription: "Decode Base64 strings or Data URIs back to images instantly in your browser. Supports PNG, JPG, WEBP, GIF, and SVG formats with live preview, zoom controls, developer statistics, and bulk ZIP export. 100% private and secure.",
  category: "Developer Tools",
  keywords: [
    "base64 to image",
    "base64 image decoder",
    "decode base64 image",
    "convert base64 to png",
    "convert base64 to jpg",
    "data uri to image",
    "base64 decoder",
    "online base64 decoder",
    "base64 converter",
    "decode image data",
    "base64 image viewer"
  ],
  features: [
    "Instant browser-based decoding with 100% local processing in RAM (your data never leaves your computer)",
    "Auto-detects image formats (PNG, JPG, WEBP, GIF, SVG) and outputs Data URIs or raw streams",
    "Interactive preview workspace featuring transparency grid, zoom-in, zoom-out, and fullscreen viewing",
    "Comprehensive image metadata analyzer displaying width, height, aspect ratio, MIME type, and exact file size",
    "Developer dashboard comparing encoded (base64) size vs. decoded binary size with percentage savings details",
    "Code snippet generators for HTML <img>, CSS background-image, React components, and Next.js Image usages",
    "Batch decoding capabilities supporting multiple Base64 items, drag-and-drop text/JSON files, and ZIP exports",
    "Decoded image exporter supporting direct download of original format, or conversion to PNG, JPG, and WEBP"
  ],
  useCases: [
    "Extracting raster and vector graphics embedded in CSS files, stylesheets, or minified JavaScript bundles",
    "Viewing and verifying image payloads parsed from JSON REST APIs or database queries without public asset URLs",
    "Recovering user avatars, documents, and reports embedded as inline Data URIs inside HTML emails or offline docs",
    "Debugging base64 string transfers, API requests, and web applications locally without uploading assets",
    "Converting embedded SVG markup or base64 streams into standard downloadable PNG, JPG, or WEBP formats"
  ],
  howToSteps: [
    "Paste your Base64 string or Data URI directly into the text editor, or drag and drop a .txt/.json file.",
    "The decoding engine will instantly validate the input, parse the headers, and display the image preview.",
    "Inspect image statistics, resolution, and data overhead in the Developer Analytics Dashboard.",
    "Use preview tools to zoom, rotate, inspect on responsive layouts, or toggle transparent backgrounds.",
    "Copy generated integration snippets (HTML, CSS, React, Next.js, JSON) from the Code Exporter panel.",
    "Click 'Download Image' to save the file locally, or select another format (PNG, JPG, WEBP) for instant conversion."
  ],
  relatedTools: [
    { name: "Image to Base64", slug: "image-to-base64" },
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "URL Encoder Decoder", slug: "url-encoder-decoder" },
    { name: "Image Converter", slug: "image-converter" },
    { name: "SVG Optimizer", slug: "svg-optimizer" },
    { name: "JWT Decoder", slug: "jwt-decoder" }
  ],
  examples: [
    {
      title: "Transparent Red 1x1 Pixel",
      description: "A simple 1x1 transparent red PNG pixel Base64 Data URI.",
      input: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      output: "Format: PNG\nWidth: 1px\nHeight: 1px\nSize: 70 bytes"
    },
    {
      title: "Blue Dot PNG",
      description: "A standard 5x5 blue square PNG represented as a Base64 Data URI.",
      input: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
      output: "Format: PNG\nWidth: 5px\nHeight: 5px\nSize: 85 bytes"
    }
  ],
  longDescription: `
## Comprehensive Guide to Base64 to Image Decoding

Welcome to the ultimate developer's resource for Base64 to Image decoding. Base64 encoding is an essential technology utilized across modern web development, database management, mobile application design, and API architectures. This guide provides a deep dive into the mathematical mechanisms, practical applications, performance trade-offs, and troubleshooting procedures involved in converting Base64-encoded strings back into visual image formats.

---

## What is Base64 Encoding?

Base64 is a binary-to-text encoding scheme. It represents binary data (such as an image, PDF file, or audio track) in an ASCII string format. The encoding process translates every 3 bytes of binary data into 4 characters of ASCII text.

The name \"Base64\" refers to the 64-character alphabet used to represent the data. This alphabet consists of:
- **Uppercase Letters**: A-Z (indices 0 to 25)
- **Lowercase Letters**: a-z (indices 26 to 51)
- **Digits**: 0-9 (indices 52 to 61)
- **Special Characters**: Plus sign \`+\` and slash \`/\` (indices 62 and 63)

By using characters that are universally safe across transport layers, protocols, and text formats (like HTML, XML, CSS, and JSON), Base64 prevents data corruption that could occur when raw binary data is processed as plain text.

---

## Understanding the Base64 Decoding Algorithm

Decoding Base64 strings back to images is the inverse of the encoding process. Computers handle text character by character, but under the hood, they convert these characters to binary representation before mapping them to image canvases.

### The Bitwise Transition

Because the Base64 alphabet contains $2^6 = 64$ symbols, each character represents exactly 6 bits of binary information. By comparison, a standard byte consists of 8 bits. To reconstruct bytes from a Base64 string, the decoder performs the following steps:

1. **Read Symbols**: The decoder reads four consecutive Base64 symbols from the string (e.g., \`iVBO\`).
2. **Translate to Values**: Each symbol is looked up in the Base64 alphabet to retrieve its 6-bit value:
   - \`i\` = 34 (\`100010\`)
   - \`V\` = 21 (\`010101\`)
   - \`B\` = 1  (\`000001\`)
   - \`O\` = 14 (\`001110\`)
3. **Concatenate Bits**: The four 6-bit chunks are combined into a single 24-bit stream:
   - \`10001001 01010000 01001110\`
4. **Split into Bytes**: The 24-bit stream is partitioned into three 8-bit bytes (which represent the original binary data):
   - Byte 1: \`10001001\` (Decimal 137, hex \`89\`)
   - Byte 2: \`01010000\` (Decimal 80, hex \`50\`)
   - Byte 3: \`01001110\` (Decimal 78, hex \`4E\`)
   - In hexadecimal, \`89 50 4E\` represents the signature characters \`\\x89PNG\` at the start of a PNG file.

### Dealing with Padding

If the original binary file size is not a multiple of 3 bytes, the encoding algorithm appends padding characters to align the stream.
- If **1 byte** remains at the end of the input stream, the encoder converts it to two Base64 symbols and appends two padding characters (\`==\`).
- If **2 bytes** remain, the encoder converts them to three Base64 symbols and appends one padding character (\`=\`).
- During decoding, the presence of \`=\` signals the engine to discard the corresponding empty bytes so that the reconstructed image file size exactly matches the original.

---

## What is a Data URI?

A Data URI (Uniform Resource Identifier) is a mechanism that allows you to embed files inline within web pages. It combines the raw Base64 string with metadata that informs the browser how to parse and render the data.

### The Anatomy of a Data URI

A typical image Data URI is structured as follows:

\`\`\`
data:[mediatype][;base64],[encoded data]
\`\`\`

1. **data:**: The scheme identifier, indicating to the browser that the following string contains inline data.
2. **mediatype**: The MIME type of the file. For images, this tells the browser which rendering engine to initialize. Examples include:
   - \`image/png\` (Portable Network Graphics)
   - \`image/jpeg\` (Joint Photographic Experts Group)
   - \`image/webp\` (Google WebP)
   - \`image/gif\` (Graphics Interchange Format)
   - \`image/svg+xml\` (Scalable Vector Graphics)
3. **;base64**: An optional token indicating that the data payload is encoded in Base64 (as opposed to being URL-encoded text).
4. **, (Comma)**: The separator that denotes the end of the metadata headers and the start of the Base64 payload.
5. **encoded data**: The raw Base64 alphanumeric string representing the image.

For example, a complete Data URI for a simple 1x1 black pixel looks like this:
\`\`\`html
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=
\`\`\`

---

## Raw Base64 vs. Data URI

It is important to distinguish between a raw Base64 string and a complete Data URI:

- **Raw Base64**: Contains only the alphanumeric payload (e.g., \`iVBORw0KGgoAAA...\`). It contains no indicator of what format the file was originally in, or what media type it represents.
- **Data URI**: Wraps the raw Base64 string inside a metadata header that defines its MIME type and content format, making it instantly renderable in HTML/CSS contexts.

Our **Base64 to Image Decoder** accepts both raw Base64 strings and complete Data URIs. If raw Base64 is pasted, our engine scans the magic bytes at the beginning of the binary stream to auto-detect the image format (MIME type) and display it correctly.

---

## Performance Audits: Base64 Overhead and Trade-offs

While Base64 is incredibly convenient for developers, it introduces specific performance implications that must be understood to prevent bloating website payloads.

### The 33% Inflation Penalty

By design, Base64 maps 3 bytes of binary data into 4 characters of ASCII text. Because ASCII characters are represented as single bytes in typical transmission encodings, this translates to a mathematical overhead of exactly **33.3%**.

For example, if you encode a **75KB** JPEG image, the resulting Base64 string will consume approximately **100KB** of characters. If this string is embedded directly inside an HTML or CSS file, the size of that text asset increases by 100KB.

### Compression Mitigations (GZIP and Brotli)

In production environments, web servers compress text assets (HTML, CSS, JS) before sending them to users using algorithms like **GZIP** or **Brotli**.
- Because Base64 strings contain repeating ASCII character patterns, compression algorithms are highly effective at compressing them.
- When transferred with compression, the transfer size of a Base64 string typically drops to around **3% to 5%** above the original binary size.
- **Warning**: While transfer size is mitigated, the browser must still download the inflated file, extract it in memory, decode the Base64 stream, and parse the resulting bytes. This incurs CPU overhead, particularly on lower-end mobile devices.

### Caching Considerations

One of the largest performance drawbacks of inline Base64 images is the loss of independent browser caching:
- When an image is referenced as an external link (\`<img src=\"logo.png\" />\`), the browser fetches it once and stores it in its local cache. On subsequent page loads, the browser loads the image directly from the disk.
- When an image is embedded inside an HTML document as a Base64 string, it must be downloaded and parsed on every single page request unless the parent HTML file itself is cached.
- Similarly, embedding images inside external stylesheets (\`.css\` files) allows the stylesheet to be cached, but if the CSS file contains large Base64 images, its loading is blocked, delaying the **First Contentful Paint (FCP)**.

### Best Practices: When to Inline

| Use Base64 Inlining | Avoid Base64 Inlining |
|:---|:---|
| Small icons and shapes under **4KB** | Photos, graphics, or backgrounds over **10KB** |
| Critical CSS rules required for immediate display | Dynamic assets loaded conditionally |
| Single-file HTML packages, newsletters, or email templates | High-resolution illustrations |
| Packaging standalone widgets or design systems | Assets that change frequently, requiring cache invalidation |

---

## Image Formats and MIME Type Auto-Detection

Different image formats require distinct parsing parameters. Our Base64 decoding engine detects these formats by analyzing the first few bytes (the signature or \"magic bytes\") of the decoded file:

### 1. PNG (Portable Network Graphics)
- **MIME Type**: \`image/png\`
- **Decoded Header Signature**: \`89 50 4E 47 0D 0A 1A 0A\` (translates to ASCII as \`\\x89PNG\\r\\n\\x1a\\n\`)
- **Key Features**: Lossless compression, support for alpha-channel transparency. Excellent for screenshots, UI icons, and technical schematics.

### 2. JPEG / JPG (Joint Photographic Experts Group)
- **MIME Type**: \`image/jpeg\`
- **Decoded Header Signature**: \`FF D8 FF\` (prefixed bytes representing SOI, Start of Image)
- **Key Features**: Lossy compression. Ideal for continuous-tone photographic imagery. Does not support transparency.

### 3. WEBP (Google WebP)
- **MIME Type**: \`image/webp\`
- **Decoded Header Signature**: Checks for \`52 49 46 46\` at offset 0 (ASCII \`RIFF\`) and \`57 45 42 50\` at offset 8 (ASCII \`WEBP\`).
- **Key Features**: High-efficiency compression (both lossy and lossless), supporting transparency and animation. Frequently outperforms JPEG and PNG in size optimization.

### 4. GIF (Graphics Interchange Format)
- **MIME Type**: \`image/gif\`
- **Decoded Header Signature**: Starts with \`47 49 46 38 37 61\` or \`47 49 46 38 39 61\` (ASCII \`GIF87a\` or \`GIF89a\`).
- **Key Features**: Supports simple frame animations and a 256-color palette.

### 5. SVG (Scalable Vector Graphics)
- **MIME Type**: \`image/svg+xml\`
- **Decoded Header Signature**: Raw XML structure containing XML declarations or \`<svg\` tags.
- **Key Features**: XML-based vector graphics. Scalable to any resolution without loss of clarity. Extremely lightweight for logos and geometric shapes.

---

## Troubleshooting Common Base64 Decoding Failures

When decoding Base64 strings, you may run into errors. Here is how to diagnose and resolve them:

### 1. Invalid Characters (DOM Exception 5: Invalid character)
- **Cause**: The Base64 string contains characters outside the allowed alphabet (\`A-Z\`, \`a-z\`, \`0-9\`, \`+\network\`, \`/\`, and the \`=\` padding symbol). Common culprits include spaces, URLs, or HTML elements wrapping the string.
- **Resolution**: Clean the string by stripping whitespace, carriage returns (\`\\r\`), and newlines (\`\\n\`). If you copied the string from a rich text editor, check for smart quotes or hidden formatting symbols.

### 2. Truncated Strings / Corrupt Data
- **Cause**: The Base64 string was copied incompletely, or was split by a buffer limits bottleneck.
- **Resolution**: Check the source of the string. A valid Base64 string length must be a multiple of 4. If it is not, the data is incomplete or has lost its padding.

### 3. URL-Safe Conversion Failures
- **Cause**: Standard decoders expect \`+\` and \`/\` characters. In URL-safe Base64, these are replaced by \`-\` (hyphen) and \`_\` (underscore). Passing a URL-safe string to a standard decoder will crash if those characters are present.
- **Resolution**: Before decoding, replace all hyphens (\`-\`) with pluses (\`+\\network\`), and all underscores (\`_\`) with slashes (\`/\`).

### 4. Raw Bytes vs. UTF-8 Characters
- **Cause**: Standard browser JavaScript methods like \`atob()\` read strings as binary strings. If the decoded binary represents UTF-8 text or complex metadata, it can corrupt, causing encoding discrepancies.
- **Resolution**: Convert characters to Uint8Arrays before writing them out to files or canvasses.

---

## Secure Local Data Workflows

In an era of rising security vulnerabilities, data privacy is paramount. Many online base64 converters upload your inputs to their remote cloud servers for processing. This presents significant security risks if you are decoding sensitive documents, proprietary design layouts, user photos, or security credentials.

Our **Base64 to Image Decoder** operates with a **Zero-Server architecture**:
- **100% In-Browser Execution**: All string checks, array parsing, byte mapping, and file assembly take place within your browser's sandboxed environment.
- **No Remote Uploads**: No network requests containing your data are sent.
- **Offline Compatibility**: You can completely disconnect your device from the internet, paste your Base64 payload, and download the reconstructed image.

---

## Advanced Developer Integration and Code Exporters

Integrating Base64 images into application layers requires formatting them according to specific language templates. Our tool generates these snippets automatically:

### 1. Standard HTML integration
For static websites or content pages, insert the Data URI directly into an image tag:
\`\`\`html
<img src=\"data:image/png;base64,iVBORw0KGgoAAA...\" alt=\"App Graphic\" width=\"200\" height=\"200\" />
\`\`\`

### 2. CSS Backgrounds
To package CSS files independently of image subfolders, embed graphics as backgrounds:
\`\`\`css
.header-icon {
  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAA...\");
  background-size: contain;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
}
\`\`\`

### 3. React Functional Components
In modular frameworks, Base64 is often declared as a local string constant:
\`\`\`jsx
import React from 'react';

const LOGO_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAA...';

export function CompanyLogo() {
  return <img src={LOGO_BASE64} alt=\"Company logo\" />;
}
\`\`\`

### 4. Next.js Image Optimization
When utilizing Next.js, Base64 Data URIs are particularly useful as lightweight placeholders for lazy loading blurred images:
\`\`\`jsx
import Image from 'next/image';

export function OptimizedAvatar() {
  return (
    <Image
      src=\"/profile.png\"
      alt=\"User profile picture\"
      width={128}
      height={128}
      placeholder=\"blur\"
      blurDataURL=\"data:image/png;base64,iVBORw0KGgoAAA...\"
    />
  );
}
\`\`\`
`,
  faq: [
    {
      question: "What is Base64 to Image decoding?",
      answer: "Base64 to Image decoding is the process of translating an ASCII text representation of an image back into its original binary file format (such as PNG, JPEG, WebP, or GIF) so that it can be downloaded, stored, or displayed."
    },
    {
      question: "What is a Data URI?",
      answer: "A Data URI is a scheme that allows you to embed media files directly inside HTML documents or stylesheets. It consists of the 'data:' prefix, the media MIME type (like 'image/png'), an optional 'base64' identifier, and the encoded alphanumeric string."
    },
    {
      question: "What is the difference between raw Base64 and a Data URI?",
      answer: "Raw Base64 is only the encoded text string (e.g. 'iVBORw0KGg...'). A Data URI contains metadata preceding the Base64 payload (e.g. 'data:image/png;base64,iVBORw0KGg...'), which explicitly tells the browser how to render the data as an image."
    },
    {
      question: "Can I convert raw Base64 strings to images using this tool?",
      answer: "Yes. Our tool automatically detects if you have pasted a raw Base64 string or a complete Data URI. If it's a raw string, it parses the binary signature to determine the image format (PNG, JPEG, WebP, GIF, or SVG) and previews it instantly."
    },
    {
      question: "Is my data uploaded to your servers when I decode images?",
      answer: "No, absolutely not. All decoding, validation, analytics, and file generation happen locally in your web browser. Your inputs and files are never transmitted to any external server, ensuring complete privacy."
    },
    {
      question: "How do I download a decoded image?",
      answer: "Once you paste your Base64 string or load a text file, a preview of the decoded image will appear. Click the 'Download Original' button to save the file, or select 'Download PNG', 'Download JPG', or 'Download WEBP' to export the image in a different format."
    },
    {
      question: "Which image formats are supported by the decoder?",
      answer: "We support PNG, JPG, JPEG, WEBP, GIF, and SVG formats. The tool will analyze the header signature of the decoded bytes to auto-detect the image type."
    },
    {
      question: "Why does the tool show an 'Invalid Base64' error?",
      answer: "This error occurs when the input contains characters outside the standard Base64 alphabet (A-Z, a-z, 0-9, +, /, and =). Ensure you have removed any wrapper code, HTML markup, or formatting spaces before decoding."
    },
    {
      question: "Can I decode multiple Base64 strings at once?",
      answer: "Yes, you can toggle the 'Batch Mode'. This allows you to paste multiple Base64 inputs (separated by line breaks) or drag and drop multiple .txt and .json files. You can preview all decoded images and download them individually or as a single ZIP archive."
    },
    {
      question: "What is the performance overhead of using Base64 images?",
      answer: "Base64 encoding increases the file size of your image by exactly 33.3% because it represents 3 binary bytes as 4 text characters. For web performance, it is best to only inline small images (under 4KB) to avoid bloating HTML/CSS bundles."
    },
    {
      question: "Can I convert Base64 back to a vector SVG?",
      answer: "Yes. If the Base64 string was originally encoded from an SVG file, the decoder will reconstruct the raw XML text and render the vector graphic without loss of resolution. You can download it directly as an SVG."
    },
    {
      question: "Does the tool support URL-safe Base64 strings?",
      answer: "Yes. Our tool supports URL-safe Base64 strings, which replace the standard '+' and '/' characters with '-' (hyphen) and '_' (underscore). The decoder auto-detects and decodes these characters seamlessly."
    },
    {
      question: "What are the magic bytes in an image header?",
      answer: "Magic bytes are the initial signature bytes at the start of a binary file that identify its format. For instance, PNG files always start with '89 50 4E 47' and JPEGs start with 'FF D8 FF'. Our tool uses these signatures to identify the image type."
    },
    {
      question: "How do I embed a decoded image in HTML?",
      answer: "Use the generated HTML output snippet from the exporter panel. It places the complete Data URI inside the src attribute: <img src=\"data:image/png;base64,...\" alt=\"Decoded Image\" />."
    },
    {
      question: "How do I use Base64 images in CSS?",
      answer: "You can embed a Base64 image directly in a CSS file using the background-image property. For example: background-image: url('data:image/png;base64,...'). This allows you to package stylesheets without relying on external image paths."
    },
    {
      question: "How do I embed Base64 images in React?",
      answer: "You can pass the Base64 Data URI directly as a string to the src attribute of an img tag: <img src={base64String} alt=\"React Base64 Image\" />."
    },
    {
      question: "How does Next.js use Base64 placeholder images?",
      answer: "Next.js allows developers to supply a low-resolution Base64 Data URI to the 'blurDataURL' prop of the Image component. This provides a smooth, blurred placeholder image while the high-resolution source asset is lazy-loading."
    },
    {
      question: "Can I inspect the dimensions and size of the decoded image?",
      answer: "Yes. Our analyzer dashboard displays the image width, height, aspect ratio, file size in bytes, and MIME type of the decoded image file."
    },
    {
      question: "Why is a transparent background represented as a grid?",
      answer: "The checkerboard grid is a design convention representing transparent pixels. If your decoded PNG, WebP, or SVG has transparency, this grid allows you to clearly see transparent areas without showing a solid background."
    },
    {
      question: "Can I zoom in and out of the decoded image preview?",
      answer: "Yes, our preview workspace includes interactive zoom controls. You can zoom in up to 500%, zoom out, fit the image to the workspace, or reset it to its actual size."
    },
    {
      question: "Does the tool support animated GIF decoding?",
      answer: "Yes. If you decode a Base64 string that represents an animated GIF, the preview container will render the animation and you can download the working GIF file."
    },
    {
      question: "Can I decode Base64 data embedded in a JSON file?",
      answer: "Yes. In batch mode or single mode, you can upload a JSON file containing Base64 payloads. The tool parses the JSON and decodes any found Base64 strings."
    },
    {
      question: "What happens if a Base64 string is missing padding (=)?",
      answer: "If a Base64 string is missing the necessary '=' characters at the end, our engine will automatically pad it to align the 4-character block before running the decoding process."
    },
    {
      question: "Can I convert a transparent PNG to JPG?",
      answer: "Yes. When downloading the decoded image as a JPG (which does not support transparency), the tool allows you to select a background fill color (defaulting to white) to merge behind the transparent pixels."
    },
    {
      question: "Why should I avoid converting large images to Base64?",
      answer: "Large Base64 strings increase page load times because they block HTML and CSS parsing, bypass browser cache mechanisms, and require client-side CPU cycles to decode. It is better to load files over 10KB as external assets."
    },
    {
      question: "Can I use the tool offline?",
      answer: "Yes. Once the page is loaded, all processing takes place locally. You can disconnect your internet and continue to decode Base64 strings and download images."
    },
    {
      question: "How do I extract images from a Base64-encoded PDF?",
      answer: "This tool is designed to decode direct image assets. To extract images from a PDF, you should first convert or split the PDF file using our specialized PDF tools, and then decode the images."
    },
    {
      question: "Is there a limit to the file size I can decode?",
      answer: "Since all operations run in your browser's memory (RAM), the limit is determined by your system's hardware. The tool can comfortably decode images up to 50MB."
    },
    {
      question: "How do I copy only the raw Base64 content?",
      answer: "Use the 'Code Exporter' panel and click on the 'Raw Base64' tab, then click the copy icon. This will copy the payload excluding the MIME type headers."
    },
    {
      question: "Can I export my batch decodes as a ZIP?",
      answer: "Yes. If you upload multiple files or decode in bulk, click the 'Download ZIP' button. The tool will compress all decoded image files into a single ZIP package."
    },
    {
      question: "What is the difference between Base64 and hexadecimal?",
      answer: "Base64 uses 64 characters to represent 6 bits per character, while Hexadecimal uses 16 characters (0-9, A-F) to represent 4 bits per character. Base64 is more compact, resulting in smaller text strings for binary data."
    },
    {
      question: "Can I decode Base64 images on mobile devices?",
      answer: "Yes. Our tool is fully responsive and works on smartphones, tablets, laptops, and desktop browsers."
    },
    {
      question: "How do I verify the security of my data on this tool?",
      answer: "You can verify that no network requests are sent by opening your browser's Developer Tools (F12) and checking the Network tab when pasting and decoding data."
    },
    {
      question: "Can I load a text file containing a Base64 string?",
      answer: "Yes, you can drop or upload any .txt file. The tool will read the file content as text and attempt to decode it immediately."
    },
    {
      question: "What is MIME type auto-detection?",
      answer: "It is a process where the decoder scans the header bytes of the decoded file (like JPEG's FF D8 FF) to determine the file type, even if the source input was a raw Base64 string with no metadata."
    },
    {
      question: "Can I drag and drop files onto the tool?",
      answer: "Yes, you can drag and drop text files, JSON files, or images directly onto the input workspace to start processing them."
    },
    {
      question: "Does GZIP/Brotli compression reduce Base64 size?",
      answer: "Yes, GZIP and Brotli compress Base64 strings inside HTML/CSS files very effectively, reducing the transfer size to only about 3% to 5% larger than the original binary."
    },
    {
      question: "Why does Base64 use '=' as padding?",
      answer: "Base64 requires characters to be grouped in sets of four. The '=' padding character is used to fill in missing slots if the binary data doesn't align with the 3-byte boundary."
    },
    {
      question: "How does the browser render a Data URI?",
      answer: "The browser's network parser decodes the Base64 stream inside the Data URI, places the raw bytes in browser RAM, and assigns a temporary URL reference to render the image in the DOM."
    },
    {
      question: "Can I decode Base64 data from email MIME attachments?",
      answer: "Yes. Emails often encode attachments (like images) in Base64 blocks. Copying the raw block from the email source into our tool will decode it and show the image."
    },
    {
      question: "Does WebP support transparent Base64 images?",
      answer: "Yes, WebP supports transparency. If you decode a transparent WebP Base64 string, the transparent details will display correctly."
    },
    {
      question: "How do I convert Base64 to a JPG with a solid background?",
      answer: "Decode your image, click 'Download JPG', and select your preferred background fill color in the color picker. The tool will flatten the transparency over that solid color."
    },
    {
      question: "What is standard Base64 encoding standard?",
      answer: "Standard Base64 is defined in RFC 4648. It uses the standard A-Z, a-z, 0-9, '+', and '/' character set."
    },
    {
      question: "Can I save my decoded images back to local history?",
      answer: "Yes, the tool maintains a local history of your recent decodes. You can quickly reload them from your dashboard without pasting the string again."
    },
    {
      question: "Can I clear my decode history?",
      answer: "Yes, click 'Clear History' in the history dashboard. This will remove all stored items from your browser's local storage."
    },
    {
      question: "Is there any risk of cross-site scripting (XSS) with Base64?",
      answer: "Inlining unverified user-supplied Base64 files can be risky if they contain SVG payloads with embedded JavaScript. Our tool parses and renders images securely to prevent scripts from running."
    },
    {
      question: "What is an estimated resolution?",
      answer: "It is the width and height of the decoded image. Our tool measures these dimensions by rendering the image inside a temporary, sandbox image object."
    },
    {
      question: "Can I copy the HTML code directly?",
      answer: "Yes. In the Code Exporter panel, go to the 'HTML' tab and click the copy icon to get a complete, ready-to-use image tag."
    },
    {
      question: "Does inlining Base64 affect SEO?",
      answer: "Search engines can index inline image data. However, page speed is a ranking factor, so bloating your HTML with large Base64 strings can negatively impact search rankings."
    },
    {
      question: "Can I decode Base64 data from a SOAP/XML request?",
      answer: "Yes. Copy the text block inside the XML node (e.g. <image>base64String</image>) and paste it into the tool to decode it."
    },
    {
      question: "Is this tool suitable for API testing?",
      answer: "Yes. It is ideal for API developers who need to inspect base64 image strings returned by endpoints to verify if the output is correct."
    },
    {
      question: "How do I toggle line wrap in the output panel?",
      answer: "Click the 'Line Wrap' checkbox or button above the text panel to switch between wrapping long Base64 strings or showing a horizontal scrollbar."
    }
  ]
};
