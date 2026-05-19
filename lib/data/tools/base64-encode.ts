import { ToolConfig } from './types';

export const base64EncodeConfig: ToolConfig = {
  slug: "base64-encode",
  title: "Base64 Encode & Decode Tool",
  shortDescription: "Advanced Base64 encoder and decoder with UTF-8 support, URL-safe options, file conversion, and real-time live preview. Fast, secure, and fully client-side.",
  category: "Encoding & Security",
  keywords: [
    "base64 encode", "base64 decode", "base64 encoder", "base64 decoder", "base64 to text",
    "text to base64", "base64 file encoder", "image to base64", "url safe base64",
    "base64 to image", "base64 string converter", "online base64 tool", "base64 utility",
    "base64 image preview", "base64 json format", "utf-8 base64 encoding", "unicode base64",
    "base64 security", "base64 dev tool"
  ],

  longDescription: `
## What is Base64?

**Base64** is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It works by translating data into a radix-64 representation, meaning it uses a specific set of 64 characters (A-Z, a-z, 0-9, +, and /) to represent the binary information. 

Originally designed to carry data stored in binary formats across channels that only reliably support text content, Base64 is practically ubiquitous on the web today. It ensures that data remains intact without modification during transport.

---

## How Base64 Encoding Works

At its core, Base64 works by taking the binary data (a sequence of 8-bit bytes) and breaking it down into 6-bit chunks. Since a 6-bit chunk can hold 64 distinct values (2^6 = 64), each chunk is mapped to one of the 64 characters in the standard Base64 alphabet.

If the original data is not perfectly divisible by 3 bytes (which equals 24 bits, or exactly four 6-bit chunks), padding characters (\`=\`) are added to the end of the encoded string to satisfy the padding requirements of the specification. 

This conversion means that the encoded output is typically 33% larger than the original input, because every 3 bytes of binary data become 4 bytes of text.

---

## What is Base64 Decoding?

Base64 decoding is the exact reverse process of encoding. The decoder reads the string of ASCII characters, maps each character back to its 6-bit binary value, and then stitches those bits together to reconstruct the original 8-bit bytes. 

Decoding restores the exact binary state of the original file or string. If you encode an image and then decode it, you get back the exact same image, byte-for-byte. 

---

## Why Developers Use Base64

Base64 is a fundamental utility for modern software development. Some primary reasons developers rely on it include:

**Safe Data Transport**: Many legacy systems and text-based protocols (like SMTP or HTTP headers) can easily corrupt raw binary data by misinterpreting null bytes, line breaks, or special control characters. Base64 converts this data into harmless ASCII text.

**Data Embedding**: Developers often embed small images or fonts directly into CSS or HTML files using Base64 Data URIs. This reduces the number of HTTP requests a browser needs to make, speeding up initial page loads.

**Configuration & JSON**: JSON is a strictly text-based format and cannot natively hold binary data. When passing files or encrypted payloads inside JSON, encoding the payload to Base64 first is the standard practice.

---

## Base64 in APIs

REST and GraphQL APIs frequently use JSON for payloads. Since JSON only supports text strings, any binary file uploaded through an API (like a user's avatar) or binary data returned by the server (like a generated PDF) must be encoded as a Base64 string. 

Our tool helps developers debug API payloads by letting them easily paste a long Base64 string received from an API to see what it actually contains, or encode a test file to paste into an API request body.

---

## Base64 in Authentication

Basic Authentication, one of the oldest web authentication schemes, relies heavily on Base64. In Basic Auth, the client sends the username and password joined by a colon (e.g., \`username:password\`), which is then Base64 encoded and sent in the HTTP header: \`Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=\`.

*Note: Because Base64 is encoding, not encryption, Basic Authentication must always be transmitted over a secure HTTPS connection to prevent credential theft.*

---

## Base64 for Images

Converting images to Base64 Data URIs is incredibly common in frontend web development. A Data URI looks like this: \`data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...\`.

Using our Base64 encode tool, you can upload an image (PNG, JPG, SVG, WebP) and instantly get its Data URI. By placing this URI directly into an \`<img src="...">\` tag or a CSS \`background-image\` property, the browser renders the image immediately without fetching a separate file.

---

## Base64 in Email Systems

Email was originally designed to handle only 7-bit ASCII text. To send binary attachments (like a PDF or photo) over email, the MIME standard was created. MIME heavily utilizes Base64 to encode attachments so they can safely pass through SMTP servers without corruption.

---

## Base64 Security Considerations

A critical distinction every developer must understand is: **Base64 is NOT encryption**. 

Encoding data in Base64 obscures it from casual reading, but it provides absolutely zero cryptographic security. Anyone with a Base64 decoder can immediately retrieve the original data. Never use Base64 to secure sensitive information like passwords, secrets, or API keys without wrapping it in strong encryption first.

---

## UTF-8 and Unicode Support

One of the biggest challenges with Base64 encoding in modern web apps is handling international characters (Unicode/UTF-8). The native JavaScript \`btoa()\` function fails with an error if you pass it characters outside the Latin1 range (like emojis or foreign alphabets). 

Our advanced Base64 tool properly converts the string into a UTF-8 byte array before encoding, ensuring that emojis (🚀), symbols, and all international characters encode and decode perfectly without data loss.

---

## URL-Safe Base64

Standard Base64 uses the characters \`+\` and \`/\`. Unfortunately, these characters have special meaning in URLs. If you put a standard Base64 string in a URL query parameter, the server might misinterpret the \`+\` as a space or the \`/\` as a path separator.

URL-safe Base64 is a variant that replaces \`+\` with \`-\` (hyphen) and \`/\` with \`_\` (underscore). It also typically omits the \`=\` padding characters. Our tool provides a simple toggle to generate URL-safe Base64 strings, perfect for passing data in web links or creating JWT tokens.

---

## Common Base64 Errors

When working with Base64, developers often encounter a few common errors:
1. **Invalid Character Errors**: Occur when the encoded string contains whitespace, line breaks, or characters not in the Base64 alphabet. Our decoder automatically cleanses whitespace before decoding.
2. **Padding Errors**: Missing \`=\` signs at the end of the string. Our decoder handles missing padding gracefully.
3. **Unicode Extraction Errors**: Attempting to decode UTF-8 data using legacy ASCII decoders will result in garbled text (like \`Ã©\` instead of \`é\`). Our tool ensures proper UTF-8 decoding.

---

## Best Practices and Performance

- **Use for Small Files**: Base64 increases data size by 33%. While great for small icons, encoding a 5MB image will result in a ~6.6MB string, which can cause significant browser memory bloat and slow down page parsing.
- **Cache Strings**: If generating Base64 dynamically in a web app, memoize the results to prevent unnecessary CPU overhead.
- **Always Validate**: Before passing Base64 data to a backend system, run a quick regex check to ensure it strictly conforms to the Base64 alphabet to prevent injection issues or parsing crashes.
  `,

  features: [
    "Instant real-time bidirectional Base64 encode and decode",
    "Full UTF-8, Unicode, and Emoji support without crashes",
    "Toggle for standard vs URL-Safe Base64 variant",
    "File upload encoding for TXT, JSON, HTML, CSS, JS, and more",
    "Image-to-Base64 generator with live preview and MIME type detection",
    "Auto-detection of pasted Base64 strings to suggest decoding",
    "Detailed character, line, and size statistics for inputs and outputs",
    "One-click copy and download functionality for outputs",
    "Graceful handling of missing padding and invalid whitespace",
    "100% client-side processing — secure, private, and fast"
  ],

  useCases: [
    "Converting images into Data URIs to embed directly into CSS or HTML",
    "Decoding JSON Web Tokens (JWT) or API payloads to inspect their contents",
    "Encoding binary files for transport via JSON REST APIs",
    "Encoding credentials for Basic Authentication headers",
    "Creating URL-safe strings to pass complex data within query parameters",
    "Debugging garbled email attachments or raw MIME text",
    "Safely storing multiline or special character data in simple text databases"
  ],

  howToSteps: [
    "Select the operation you want: 'Encode' (Text → Base64) or 'Decode' (Base64 → Text).",
    "Type, paste, or upload a file into the input panel. The tool will instantly process your data.",
    "If you uploaded an image, you will see a live preview alongside the generated Data URI.",
    "Toggle 'URL-Safe' if you plan to use the generated string in a web link or URL parameter.",
    "View the analytics panel to see the exact size of your input versus the Base64 output.",
    "Click the 'Copy' or 'Download' buttons on the output panel to save your results."
  ],

  examples: [
    {
      title: "Standard Text Encode",
      description: "Encoding a simple English string.",
      input: "Hello World!",
      output: "SGVsbG8gV29ybGQh"
    },
    {
      title: "Unicode & Emoji Encode",
      description: "Properly handling UTF-8 emojis and special characters.",
      input: "I ❤️ Web Dev!",
      output: "SSDimqQgV2ViIERldiE="
    },
    {
      title: "JSON Payload Encode",
      description: "Encoding a JSON object for API transport.",
      input: '{"user":"admin","role":"superuser"}',
      output: "eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoic3VwZXJ1c2VyIn0="
    }
  ],

  faq: [
    {
      question: "What is Base64 used for?",
      answer: "Base64 is used to convert binary data (like images, documents, or encrypted payloads) into a safe, readable ASCII text string. This is essential for transporting data over text-based protocols like HTTP, email (SMTP), or inside JSON objects, preventing corruption of the binary data."
    },
    {
      question: "Is Base64 encryption?",
      answer: "No. Base64 is an encoding format, not encryption. It does not use a secret key, and anyone with access to the Base64 string can instantly decode it back to the original data. It provides zero cryptographic security."
    },
    {
      question: "Can Base64 store images?",
      answer: "Yes, Base64 is very commonly used to store images. By converting an image into a Base64 'Data URI', you can embed the image directly into an HTML file or a CSS file without needing to link to an external image file."
    },
    {
      question: "How do I decode Base64?",
      answer: "Simply paste your Base64 string into our tool and click the 'Decode' tab. The tool will automatically translate the string back into readable text or allow you to download it as a binary file."
    },
    {
      question: "Why use Base64 in APIs?",
      answer: "Many modern APIs communicate using JSON, which only supports text. If you need to upload a file or transmit binary data through a JSON API, you must encode it to Base64 first so it becomes a valid text string."
    },
    {
      question: "What is URL-safe Base64?",
      answer: "Standard Base64 uses the '+' and '/' characters, which have special meanings in URLs. URL-safe Base64 replaces the '+' with a '-' (hyphen) and the '/' with an '_' (underscore) so the string can be safely placed in a web address."
    },
    {
      question: "Can Base64 increase file size?",
      answer: "Yes, encoding data in Base64 increases the file size by exactly 33%. Every 3 bytes of binary data requires 4 bytes of Base64 text to represent it. This is why you should avoid encoding very large files."
    },
    {
      question: "Does Base64 support Unicode?",
      answer: "Standard JavaScript Base64 functions (btoa/atob) crash on Unicode. However, our advanced tool properly translates the text to UTF-8 bytes before encoding, ensuring complete support for Unicode, foreign languages, and emojis."
    },
    {
      question: "Is Base64 reversible?",
      answer: "Yes, Base64 is 100% reversible. Because it is an encoding scheme rather than a hashing algorithm, you will always get back the exact same data you put in when you decode it."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "JWT Decoder", slug: "jwt-decoder" },
    { name: "URL Encoder", slug: "url-encoder" },
    { name: "Hash Generator", slug: "hash-generator" },
    { name: "XML Formatter", slug: "xml-formatter" },
    { name: "HTML Formatter", slug: "html-formatter" }
  ]
};
