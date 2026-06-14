import { ToolConfig } from './types';

export const imageToBase64Config: ToolConfig = {
  slug: "image-to-base64",
  title: "Image to Base64 Converter",
  shortDescription: "Convert images to Base64 and generate Data URIs instantly in your browser. Paste, drop, or upload images (PNG, JPG, WEBP, SVG, and more) to generate HTML, CSS, JSON, and React code. 100% local and private.",
  category: "Developer Tools",
  keywords: [
    "image to base64",
    "base64 image converter",
    "convert image to base64",
    "image encoder",
    "image to data uri",
    "base64 encoder",
    "online base64 converter",
    "base64 html image",
    "base64 css background",
    "bulk image base64"
  ],
  features: [
    "Instant, browser-based encoding with zero server uploads for maximum privacy",
    "Supports PNG, JPG, JPEG, WEBP, GIF, SVG, BMP, ICO, and AVIF formats",
    "Generates raw Base64 strings, Data URIs, HTML tags, CSS backgrounds, and React / Next.js code",
    "Includes a VS Code-inspired output panel with copy buttons, download options, and line wrap toggles",
    "Performs detailed size audits, analyzing base64 overhead, percentage increase (+33.3%), and bandwidth impact",
    "Supports batch processing to upload multiple images at once, with ZIP exporting",
    "Provides a live verification preview displaying both the original source image and the base64-decoded result",
    "Maintains local conversion history and drafts to quickly recover past encodes"
  ],
  useCases: [
    "Reducing HTTP requests by inline-embedding small icons and graphics directly into HTML and CSS files",
    "Generating Data URIs for CSS background-image rules to package standalone stylesheets",
    "Structuring image payloads for JSON REST APIs and GraphQL requests without managing public assets URLs",
    "Bundling graphics inside single-file distributions like HTML emails and offline documentation",
    "Converting vector SVGs to Base64 to bypass browser layout parser problems and prevent XML validation issues"
  ],
  howToSteps: [
    "Upload one or more images using browse, drag & drop, clipboard paste, or touch.",
    "The tool will instantly encode your files locally in your browser RAM.",
    "View file parameters (resolution, file size, MIME type) in the Developer Analytics Dashboard.",
    "Select your preferred tab (Data URI, Raw, HTML, CSS, React, JSON) in the Output Panel.",
    "Click Copy to copy the snippet, or click Download to save the text output.",
    "Optional: For bulk uploads, click 'Download ZIP' to export all encoded strings as individual text files."
  ],
  relatedTools: [
    { name: "Base64 to Image", slug: "base64-to-image" },
    { name: "Image Compressor", slug: "compress-image" },
    { name: "Image Converter", slug: "image-converter" },
    { name: "SVG Optimizer", slug: "svg-optimizer" },
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "URL Encoder Decoder", slug: "url-encoder-decoder" }
  ],
  examples: [],
  faq: [
    {
      question: "What is Base64 encoding?",
      answer: "Base64 is a binary-to-text encoding scheme that translates binary data (like images or files) into a sequence of 64 ASCII characters. It is commonly used to embed media directly inside text documents such as HTML, CSS, or JSON."
    },
    {
      question: "Why should I convert an image to Base64?",
      answer: "Converting images to Base64 allows you to embed them directly into HTML, CSS, or JSON. This reduces the number of HTTP requests a browser has to make to load your web page, which can speed up page loads for small icons."
    },
    {
      question: "What is a Data URI?",
      answer: "A Data URI (Uniform Resource Identifier) is a scheme that allows content creators to embed files inline in web pages. It takes the format: data:[mediatype][;base64],<data>. For example, data:image/png;base64,iVBORw..."
    },
    {
      question: "Does Base64 increase the size of my image?",
      answer: "Yes. Base64 encoding maps 3 bytes of binary data to 4 characters of text. This introduces a mathematical overhead that increases the file size by exactly 33.3%. Additionally, if the string is transferred without compression, the payload will be larger than the original binary."
    },
    {
      question: "Is it safe to upload my images to this tool?",
      answer: "Yes, this tool is 100% secure and private. All encoding, parsing, and rendering take place locally in your web browser. No files are uploaded to our servers, ensuring your images never leave your computer."
    },
    {
      question: "Which image formats are supported?",
      answer: "Our converter supports PNG, JPG, JPEG, WEBP, GIF, SVG, BMP, ICO, and AVIF formats."
    },
    {
      question: "How do I embed a Base64 image in HTML?",
      answer: "You can embed a Base64 image using a Data URI inside the src attribute of an image tag: <img src=\"data:image/png;base64,iVBORw...\" alt=\"Embedded Image\">."
    },
    {
      question: "How do I embed a Base64 image in CSS?",
      answer: "You can embed a Base64 image inside a CSS background-image property: background-image: url('data:image/png;base64,iVBORw...');"
    },
    {
      question: "Can I use Base64 images in React or Next.js?",
      answer: "Yes, you can pass the Data URI directly to the src prop of standard <img> tags or Next.js <Image /> components: <img src={base64String} />."
    },
    {
      question: "What is the maximum image size I should convert to Base64?",
      answer: "As a rule of thumb, you should only convert small icons, logos, and vector shapes under 4KB to Base64. Larger images will bloat your HTML/CSS files, bypassing browser caching and slowing down load speeds."
    },
    {
      question: "Does Base64 affect browser caching?",
      answer: "Yes. When an image is embedded directly in HTML or CSS, it cannot be cached independently of the stylesheet or page. If the page is reloaded, the browser must parse the entire string again, whereas external images are cached separately."
    },
    {
      question: "What is the difference between raw Base64 and a Data URI?",
      answer: "Raw Base64 is only the encoded alphanumeric string (e.g. iVBORw...). A Data URI prepends the MIME type metadata header (e.g. data:image/png;base64,) so browsers know how to render the string as an image."
    },
    {
      question: "How does the Base64 encoding algorithm work?",
      answer: "The Base64 algorithm groups binary data into sets of 24 bits (3 bytes). These 24 bits are split into four 6-bit segments. Each 6-bit value (ranging from 0 to 63) is mapped to a character in the Base64 index table (A-Z, a-z, 0-9, +, /)."
    },
    {
      question: "Why does Base64 use padding (=)?",
      answer: "Base64 encoding requires the input byte sequence to be a multiple of 3. If the input data has 1 extra byte, it is padded with two '=' characters at the end. If it has 2 extra bytes, it is padded with one '=' character."
    },
    {
      question: "Can I convert SVG images to Base64?",
      answer: "Yes. Converting SVGs to Base64 creates a clean Data URI. However, since SVGs are already text-based XML, they can also be embedded directly in HTML without Base64 encoding, which is often more efficient."
    },
    {
      question: "Can I convert animated GIFs to Base64?",
      answer: "Yes, animated GIFs can be converted to Base64. The resulting Data URI will preserve the animation when rendered in a browser."
    },
    {
      question: "How do I download the encoded Base64 string?",
      answer: "In our output panel, you can click the 'Download TXT' button to save the entire Data URI or Raw Base64 string as a text file, or click 'Download JSON' to save it as a structured payload."
    },
    {
      question: "What is bulk image encoding?",
      answer: "Bulk image encoding allows you to upload multiple files at once. Our tool will process them in parallel and allow you to copy individual outputs or download all of them inside a single ZIP file."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes. Once the page is loaded, the application uses local browser scripts to perform the encoding. You can disconnect from the internet and continue using the tool."
    },
    {
      question: "How do I copy a Data URI quickly?",
      answer: "Click the 'Copy' button on the output panel. It will copy the complete Data URI (including the metadata header) to your system clipboard instantly."
    },
    {
      question: "Can I send Base64 images through JSON APIs?",
      answer: "Yes, this is one of the primary use cases for developers. You can put the Base64 string inside a JSON property (e.g., { \"avatar\": \"data:image/png;base64,...\" }) and send it in a POST request."
    },
    {
      question: "Is Base64 SEO friendly?",
      answer: "Search engines can parse and index inline Data URIs. However, page speed is a significant SEO ranking factor. If you use too many Base64 images, your HTML size will increase, slowing down page loads and potentially harming your SEO rankings."
    },
    {
      question: "How does Base64 impact mobile bandwidth?",
      answer: "Since Base64 increases the data size by 33.3%, mobile users will consume more cellular data loading the page. If the page uses GZIP or Brotli compression, the transfer size increase is reduced to around 3-5%, but decoding still takes CPU cycles."
    },
    {
      question: "Can I convert favicons (.ico) to Base64?",
      answer: "Yes, you can encode ICO files to Base64. This is useful for embedding a favicon directly in the HTML head to avoid an extra network request: <link rel=\"icon\" href=\"data:image/x-icon;base64,...\" />."
    },
    {
      question: "What is the bandwidth impact of Base64?",
      answer: "Base64 increases the size of the payload. While HTML compression (GZIP/Brotli) helps minimize this on the wire, the browser still has to decompress and parse the larger string in memory, which increases CPU usage."
    },
    {
      question: "How do I verify the Base64 string is correct?",
      answer: "Our tool includes a 'Decoded Preview' panel. It decodes the generated Base64 string back into an image and renders it, allowing you to visually verify the accuracy and resolution of the encoding."
    },
    {
      question: "Does Base64 support transparent images?",
      answer: "Yes. Transparent PNGs or WEBP files will maintain their transparency channel when encoded. The transparent regions will render correctly in the browser."
    },
    {
      question: "What is MIME Type detection?",
      answer: "When you upload an image, our tool reads the file header to detect its MIME Type (e.g., image/jpeg, image/png, image/svg+xml). This MIME type is then prepended to the Data URI metadata prefix automatically."
    },
    {
      question: "Can I use Base64 in emails?",
      answer: "Yes. Many HTML email clients support inline Base64 images. However, some clients (like Outlook or Gmail webmail) block or strip Data URIs for security reasons, so using external image links is generally safer for newsletters."
    },
    {
      question: "What is the limit of Data URI length in browsers?",
      answer: "Older browsers like Internet Explorer 8 capped Data URIs at 32KB. Modern browsers (Chrome, Safari, Firefox, Edge) support strings up to several megabytes, though large strings can still freeze the browser parser."
    },
    {
      question: "How do I encode a local image file on my computer?",
      answer: "You can drag and drop the image file directly onto the upload zone on our page, or click to open your file manager, select the file, and convert it instantly."
    },
    {
      question: "Does converting to Base64 compress the image?",
      answer: "No, encoding does not perform any compression. If you want to compress the image, you should use our Image Compressor first, then convert the compressed file to Base64."
    },
    {
      question: "Can I convert WebP images to Base64?",
      answer: "Yes. WebP is a highly efficient image format. Converting WebP to Base64 generates a smaller string than PNG or JPEG, which is ideal for inlining."
    },
    {
      question: "What happens to metadata like EXIF when converting to Base64?",
      answer: "The encoder converts the exact binary bytes of the file. Any metadata (EXIF, geolocation, camera type) embedded in the original image file will be preserved in the Base64 string."
    },
    {
      question: "Does Base64 bypass CORS?",
      answer: "Yes. Because Base64 images are embedded inline as text, the browser does not need to perform an external HTTP request, which bypasses Cross-Origin Resource Sharing (CORS) security restrictions."
    },
    {
      question: "How do I make a background image scale when using Base64 in CSS?",
      answer: "You apply standard CSS properties to the element as if it were a normal image: background-size: cover; background-position: center;."
    },
    {
      question: "Is there a limit on how many images I can upload at once?",
      answer: "There is no hard limit on the number of files. However, converting hundreds of large files simultaneously may consume significant browser memory."
    },
    {
      question: "What is the performance impact of Base64 on rendering?",
      answer: "When the browser encounters a Base64 string in HTML, it must decode it block by block. For very large strings, this decoding process can block the main thread, causing minor lag or rendering delays."
    },
    {
      question: "Can I save my converted Base64 files?",
      answer: "Yes, you can save your conversions as drafts or view them in the 'Recent Conversions' log in the sidebar to retrieve them later."
    },
    {
      question: "Can I convert BMP images to Base64?",
      answer: "Yes, BMP files are fully supported. However, BMP is uncompressed, so the resulting Base64 string will be extremely large."
    },
    {
      question: "Does Base64 support lazy loading?",
      answer: "No. Because inline Base64 images are part of the HTML or CSS document, they load immediately with the document itself, bypassing native lazy-loading behaviors."
    },
    {
      question: "How do I copy only the raw Base64 string?",
      answer: "Click on the 'Raw Base64' tab in the output panel and click the Copy button. This will copy the string without the 'data:image/png;base64,' metadata prefix."
    },
    {
      question: "Is Base64 the same as binary?",
      answer: "No. Binary is base-2 (consisting of 0s and 1s). Base64 is base-64 (representing data using 64 printable characters). Base64 acts as a bridge to transfer binary data over text-only protocols."
    },
    {
      question: "Can I use Base64 strings in database fields?",
      answer: "Yes. You can store Base64 strings in database text fields (like VARCHAR or TEXT). This allows you to store images directly in the database without managing external storage buckets, though it can slow down query performance."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes, the interface is fully responsive. You can upload images from your mobile gallery or camera roll, view the analysis, and copy the generated snippets."
    },
    {
      question: "Can I convert AVIF images to Base64?",
      answer: "Yes, AVIF is supported. Since AVIF provides extremely high compression ratios, it is excellent for creating very short Base64 strings."
    },
    {
      question: "What is the security risk of Data URIs?",
      answer: "Because Data URIs can contain arbitrary content, malicious scripts could theoretically be embedded in them (e.g., data:text/html). However, for image MIME types (e.g., image/png), modern browsers only parse the data as image pixels, which is secure."
    },
    {
      question: "How do I convert Base64 back to an image?",
      answer: "If you have a Base64 string and want to recover the original image, you can use our companion 'Base64 to Image' tool to decode it back to a downloadable binary file."
    },
    {
      question: "Does this tool use cookies?",
      answer: "No, this tool does not use tracking cookies. Your drafts and history are stored locally in your browser's LocalStorage, and all operations run locally in your browser."
    },
    {
      question: "How do I clear my drafts and history?",
      answer: "You can click the 'Clear All' button in the Recent Conversions panel to wipe your history from your browser cache."
    },
    {
      question: "Why does my browser freeze when converting a 50MB image?",
      answer: "Large files create massive strings (over 66 million characters for 50MB). Generating, rendering, and syntax-highlighting strings of this size requires substantial CPU and RAM, which can temporarily freeze the browser thread."
    },
    {
      question: "Is this tool completely free?",
      answer: "Yes, the Image to Base64 tool is 100% free with no features locked behind paywalls, subscription models, or registration."
    }
  ],
  longDescription: `
# Image to Base64: Technical Architecture, Performance Implications, and Implementation Guide

In modern web development, optimizing page load times and asset delivery pipelines is key. One technique frequently discussed is the conversion of binary image files into text-based **Base64 strings** and **Data URIs**. 

By inlining images directly into HTML documents or CSS stylesheets, developers can eliminate HTTP requests, prevent layout thrashing, and distribute self-contained assets. However, this method introduces a mathematical overhead that affects bandwidth, parsing speeds, and browser memory.

This guide provides a comprehensive technical overview of the Base64 encoding algorithm, details the structure of Data URIs, analyzes the performance and SEO trade-offs of inline assets, and provides ready-to-use integration snippets for developers.

---

## 1. How Base64 Image Encoding Works

Base64 is a binary-to-text encoding scheme that converts arbitrary sequences of 8-bit bytes into a restricted set of 6-bit characters. The target alphabet consists of 64 printable US-ASCII characters, which are safe for transmission over systems that might otherwise misinterpret binary control codes.

### The Mathematical Mapping Algorithm

Computers store images as binary streams (sequences of bytes, where each byte is 8 bits). The Base64 encoding algorithm processes this stream in groups of three bytes (24 bits total). It then divides these 24 bits into four 6-bit chunks. Each 6-bit chunk represents an index value between 0 and 63.

This index is mapped to a character using the standard Base64 alphabet:
*   **Indices 0–25**: Uppercase letters (\`A-Z\`)
*   **Indices 26–51**: Lowercase letters (\`a-z\`)
*   **Indices 52–61**: Numeric digits (\`0-9\`)
*   **Index 62**: Plus sign (\`+\`)
*   **Index 63**: Forward slash (\`/\`)

\`\`\`
Binary Input:    [ 8 bits ] [ 8 bits ] [ 8 bits ]  (Total: 24 bits)
                   \    /     \    /     \    /
Divided 6-bits:   [6bits]   [6bits]   [6bits]   [6bits]
                    |         |         |         |
Base64 Alphabet:   'A'       'm'       '5'       't'
\`\`\`

### The 33.3% Overhead Calculation

Because Base64 represents 3 bytes of binary data using 4 text characters, it introduces a constant mathematical overhead. The file size increase can be calculated as follows:

$$\text{Increase} = \frac{4 \text{ characters}}{3 \text{ bytes}} = 1.3333...$$

Thus, encoding an image into Base64 **increases its file size by exactly 33.3%**. For example, a 30KB PNG icon will produce a Base64 string that is approximately 40KB in length. If transferred uncompressed, this extra 10KB represents wasted bandwidth.

### Padding and the Equals Sign (\`=\`)

If the total number of bytes in the input stream is not a multiple of three, the encoding process will have left-over bytes at the end. The algorithm handles this by padding the output:
*   If **1 byte** remains: The encoder outputs 2 characters followed by two padding characters (\`==\`).
*   If **2 bytes** remain: The encoder outputs 3 characters followed by one padding character (\`=\`).

These padding characters inform the decoder of the exact byte length of the original binary stream, preventing corruption during decompression.

---

## 2. Anatomy of a Data URI

A **Data URI** is a Uniform Resource Identifier that embeds a file inline in a document, rather than linking to an external resource. 

### The Protocol Syntax

The structural format of a Data URI is defined by RFC 2397:

$$\texttt{data:[<mediatype>][;base64],<data>}$$

Where:
*   \`data:\`: The schema prefix that instructs the browser to parse the string as an inline asset.
*   \`[<mediatype>]\`: The MIME type indicating the file format (e.g., \`image/png\`, \`image/jpeg\`, \`image/svg+xml\`, \`image/webp\`). If omitted, it defaults to \`text/plain\`.
*   \`;base64\`: The parameter indicating that the data is Base64-encoded. If omitted, the data must be URL-encoded (common for plain-text SVGs).
*   \`<data>\`: The Base64 character string representing the image binary.

### Example Construction

Below is a complete Data URI for a small red dot in PNG format:

$$\texttt{data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==}$$

When a browser encounters this string inside an \`href\` or \`src\` attribute, it decodes the Base64 sequence back into binary bytes, determines the format is a PNG image, and renders it directly on the screen.

---

## 3. Performance Trade-Offs: When to Use (and Avoid) Base64

While Base64 image embedding is convenient, it is not a silver bullet. Understanding the architectural trade-offs is essential to maintaining high Core Web Vitals and PageSpeed scores.

### Advantages of Inline Base64

1.  **Reduction of HTTP Requests**: Every external asset (like an \`<img src="icon.png" />\`) requires the browser to open a separate HTTP request. For websites using older HTTP/1.1 protocols, this can create connection bottlenecks. Inlining assets eliminates this round-trip delay.
2.  **No Layout Thrashing (Reflow)**: When an image loads asynchronously, the page layout may shift if the dimensions are not defined. Inline images are processed immediately as the HTML parses, ensuring the browser knows the layout requirements upfront.
3.  **Standalone Document Bundling**: Base64 is ideal for creating self-contained documents. Single-file HTML newsletters, offline documentation, and exported report drafts can contain all necessary images without external hosting dependencies.
4.  **Bypassing CORS Issues**: Because the image data is part of the document text, it is not subject to Cross-Origin Resource Sharing restrictions, simplifying cross-domain widget embedding.

### Disadvantages of Inline Base64

1.  **Cache Bypassing**: When an image is hosted externally (e.g., \`/images/logo.png\`), the browser caches it. On subsequent page visits, the image is loaded from local storage instantly. When inlined in HTML, the image data must be parsed and loaded with every page request.
2.  **HTML and CSS Bloat**: Because Base64 adds 33.3% to the file size, inlining large images can inflate a 50KB HTML file into a 5MB document. This delays the **First Contentful Paint (FCP)** and **Time to Interactive (TTI)**, especially on mobile networks.
3.  **Main Thread Blocking**: Decoding Base64 strings is CPU-intensive. If a page contains multiple megabytes of Base64 strings, the browser’s main rendering thread can freeze while parsing the strings, degrading scrolling and interaction performance.
4.  **Bypassing Lazy Loading**: Modern browsers support lazy loading (\`loading="lazy"\`), which defers image downloads until they enter the viewport. Inline Base64 images load immediately with the document text, wasting bandwidth on images that may never be seen.

### The Rule of Thumb for Developers

*   **Embed**: Icons, small logos, loaders, and SVG shapes under **4KB**.
*   **Link**: High-resolution photographs, banners, hero graphics, and assets larger than **10KB**.

---

## 4. Developer Integration Snippets

Once an image is converted to Base64, it can be integrated across various platforms. Below are the standard templates for implementing inline Base64 graphics.

### HTML Implementation
Insert the Data URI directly into the \`src\` attribute of an image tag:
\`\`\`html
<img src="data:image/png;base64,iVBORw0KGgoAAAANS..." alt="Inline Logo" width="32" height="32">
\`\`\`

### CSS Implementation
Set the Data URI as the background image source inside a stylesheet. This is useful for UI icons:
\`\`\`css
.icon-button {
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0...");
  background-size: contain;
  background-repeat: no-repeat;
}
\`\`\`

### React / Next.js Integration
In modern React ecosystems, pass the Base64 string directly as the source. Next.js supports Data URIs, though you must define sizes or placeholder patterns:
\`\`\`tsx
import React from 'react';
import Image from 'next/image';

const base64Avatar = "data:image/webp;base64,UklGRkAAAAD...";

export function UserProfile() {
  return (
    <div className="flex items-center gap-3">
      {/* Standard Image */}
      <img src={base64Avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
      
      {/* Next.js Image Component */}
      <div className="relative w-10 h-10">
        <Image 
          src={base64Avatar} 
          alt="User Avatar" 
          fill
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
}
\`\`\`

### API payload (JSON)
When transmitting images via APIs, wrapping the file in a Base64 JSON payload is often cleaner than multipart form uploads:
\`\`\`json
{
  "userId": "usr_9481a7d",
  "action": "update_avatar",
  "payload": {
    "mimeType": "image/jpeg",
    "filename": "avatar_main.jpg",
    "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
  }
}
\`\`\`

---

## 5. Network Optimization and Compression

While Base64 increases raw file sizes, its impact on actual network transmission is heavily mitigated by web servers using GZIP or Brotli compression.

### Text Compression (Brotli/GZIP)

Server compression algorithms are designed to find repeating patterns in text. Base64 strings, while appearing random, contain repetitive structures that compress extremely well. 

$$\text{Wire Size (Compressed Base64)} \approx \text{Original Binary Size} + 3\% \text{ to } 5\%$$

If your web server correctly compresses HTML and CSS responses, the network transfer size of a Base64-inlined asset is almost identical to the binary file. However, keep in mind:
1.  **Decompression Cost**: The client's browser must still decompress the stream and allocate memory to decode the Base64 string.
2.  **Uncompressed Transfer**: If your CDN or origin server fails to apply compression, the full 33.3% size penalty will be transferred to the client.

### SEO Considerations

Search engine crawlers (like Googlebot) parse HTML and index inline Data URIs. However, page speed and response times are crucial ranking factors. If you bloat your page with excessive Base64 data, the slower load times may indirectly harm your search engine rankings.
`
};
