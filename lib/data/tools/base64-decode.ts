import { ToolConfig } from './types';

export const base64DecodeConfig: ToolConfig = {
  slug: "base64-decode",
  title: "Base64 Decode Tool",
  shortDescription: "Advanced Base64 decoder with real-time conversion, URL-safe support, image previewing, and precise error handling. Fully client-side and secure.",
  category: "Encoding & Security",
  keywords: [
    "base64 decode", "base64 decoder", "base64 to text", "base64 to image",
    "decode base64", "base64 string decoder", "base64 data uri decoder",
    "url safe base64 decoder", "online base64 decoder", "utf-8 base64 decode",
    "base64 security", "base64 to json", "decode base64 file"
  ],

  longDescription: `
## What is Base64 Decoding?

**Base64 Decoding** is the process of converting a Base64-encoded ASCII string back into its original binary or text format. Because Base64 is an encoding scheme designed to safely transport data across text-based systems, it is not a one-way hash or an encryption algorithm. Any data encoded into Base64 can be 100% losslessly decoded back to its original state.

When you decode a Base64 string, the decoder translates the specific 64-character alphabet (A-Z, a-z, 0-9, +, and /) back into 6-bit chunks, and then reassembles those chunks into standard 8-bit bytes. 

---

## How Base64 Decoding Works

The Base64 alphabet consists of exactly 64 characters. Because $2^6 = 64$, each character in a Base64 string represents exactly 6 bits of data. However, modern computers operate on 8-bit bytes. 

To decode Base64, the decoder reads the string four characters at a time. Four Base64 characters contain 24 bits of data ($4 \\times 6 = 24$). The decoder takes these 24 bits and splits them into three 8-bit bytes ($24 / 8 = 3$). 

If the original data wasn't a multiple of 3 bytes, the encoder adds padding characters (\`=\`) to the end of the string. A standard decoder recognizes these padding characters and knows exactly how many bytes to discard to produce the exact original file.

---

## Base64 Encoding vs Decoding

While encoding takes raw binary data (like an image or a PDF) and blows it up into a safe ASCII string (increasing its size by ~33%), decoding does the exact opposite. Decoding takes that inflated text string and condenses it back into the raw, efficient binary representation.

For developers, you typically encode data when you need to send it safely over a network, and you decode data when you receive it and need to process or display it.

---

## Why Developers Decode Base64

There are countless scenarios where developers must decode Base64 data:

**API Responses**: Many APIs wrap binary data (like generated PDF reports or user avatars) inside JSON payloads. Because JSON strictly supports text, the API sends a Base64 string. The frontend developer must decode this string to present the file to the user.

**Authentication & JWTs**: JSON Web Tokens (JWTs) are heavily reliant on Base64. A JWT consists of three parts separated by dots, where the header and payload are Base64Url encoded. Developers frequently decode these segments to inspect user roles, token expiration dates, and authentication scopes.

**Debugging Legacy Systems**: Older email protocols (SMTP) and data systems use MIME attachments encoded in Base64. System administrators often need to manually decode raw MIME blocks to investigate corrupted files or analyze system logs.

---

## Base64 Image Decoding

One of the most popular uses for our Base64 Decoder is converting Data URIs back into viewable images. A Data URI typically looks like this: \`data:image/png;base64,iVBORw0K...\`

If you paste a Data URI into our tool, it will instantly detect the MIME type (\`image/png\`) and render a live preview of the image. This is incredibly helpful for frontend developers who find long Data URIs embedded inside CSS files or minified JavaScript bundles and need to extract the original graphic.

---

## Base64 in JSON and XML

When databases or APIs transport complex objects using JSON or XML, they are forced to use Base64 for any non-text fields. 

If you are inspecting a massive XML SOAP response or a nested JSON payload and you encounter a massive block of random-looking alphanumeric characters, it is almost certainly Base64. Copying that block into our decoder allows you to instantly reveal whether it's an embedded image, a nested JSON string, or a proprietary binary file.

---

## UTF-8 Support and Unicode Compatibility

A notorious issue with native browser decoding (using the JavaScript \`atob()\` function) is its inability to handle UTF-8 data. If a Base64 string contains emojis (🎉) or international characters (ñ, ü, 你好), the native \`atob()\` function will either crash entirely or return corrupted garble.

Our advanced Base64 Decoder utilizes the modern \`TextDecoder\` API. It safely converts the Base64 string into a raw byte array, and then carefully decodes it using a strict UTF-8 charset. This guarantees that all Unicode characters, emojis, and multi-byte language symbols are restored perfectly.

---

## URL-Safe Base64

Standard Base64 uses the plus (\`+\`) and slash (\`/\`) characters. Unfortunately, these characters break web URLs. To solve this, "URL-safe Base64" was created, which replaces \`+\` with a hyphen (\`-\`) and \`/\` with an underscore (\`_\`).

Our decoder features a smart toggle for URL-safe decoding. If you are trying to decode a routing parameter, an OAuth state token, or a JWT payload, simply ensure the URL-Safe toggle is active to prevent parsing errors.

---

## Common Decoding Errors

When using our tool, you might encounter a few standard errors:
1. **Invalid Characters**: The string contains characters outside the standard Base64 alphabet (A-Z, a-z, 0-9, +, /, =, -, _). Our tool automatically attempts to strip out whitespace and line-breaks before throwing an error.
2. **Missing Padding**: The string is missing the \`=\` padding characters at the end. Our decoder will attempt to auto-pad the string to gracefully recover the data.
3. **Corrupted Data**: If the string was truncated during a network transfer, the decoder will fail because the 24-bit chunk alignment is broken.

---

## Security Considerations: Base64 vs Encryption

We cannot stress this enough: **Base64 is not encryption**. 

Encoding data in Base64 offers zero confidentiality. It is simply a different way of writing the exact same data. Never assume that because a string looks like unreadable gibberish, it is secure. If you find API keys, passwords, or PII (Personally Identifiable Information) stored merely as Base64 strings in a database or cookie, it is a critical security vulnerability. 

Always use strong cryptography (like AES-256) to secure data, and only use Base64 to transport that encrypted ciphertext.

---

## Best Practices for Decoding

- **Sanitize Input**: Before decoding programmatic input in a production app, run it against a regex pattern to ensure it only contains valid Base64 characters to prevent crash loops.
- **Handle Large Files Carefully**: Decoding massive Base64 strings (10MB+) requires loading both the string and the resulting byte array into RAM simultaneously. Use streaming decoders on backend servers if you expect massive files.
- **Client-Side Privacy**: Always use client-side tools (like this one!) to decode sensitive strings. Because our tool runs entirely in your browser via JavaScript, your decoded data is never sent to our servers.
  `,

  features: [
    "Instant real-time Base64 to Text decoding",
    "Complete UTF-8 and Unicode emoji support via TextDecoder",
    "URL-Safe Base64 variant support for JWTs and URL params",
    "Live Image Preview for embedded Base64 Data URIs",
    "File download support for exporting decoded binary payloads",
    "Smart auto-padding and whitespace sanitization to recover broken strings",
    "Detailed file size and character statistics",
    "100% client-side local execution for total privacy",
    "Mobile-responsive UI with dark mode support"
  ],

  useCases: [
    "Extracting and saving images embedded in CSS or HTML source code",
    "Decoding JSON Web Tokens (JWT) to inspect payload claims",
    "Investigating raw MIME attachments in email server logs",
    "Debugging API responses that wrap binary data in JSON",
    "Recovering URL-safe state tokens in OAuth redirection flows",
    "Analyzing malicious payloads or obfuscated scripts in security audits"
  ],

  howToSteps: [
    "Paste your Base64 encoded string into the input panel.",
    "If your string is a standard Base64 string, the decoded text will appear instantly in the right panel.",
    "If the string is a Data URI containing an image, a visual preview will automatically render below.",
    "If the decoded data is binary (like a PDF or Zip file), you can click 'Download' to save the raw file to your computer.",
    "Toggle 'URL-Safe' if the string came from a web link or JWT and uses hyphens and underscores.",
    "Check the analytics panel to see the exact size comparison of the encoded string vs the decoded data."
  ],

  examples: [
    {
      title: "Simple Text Decode",
      description: "Decoding a basic greeting.",
      input: "SGVsbG8gV29ybGQh",
      output: "Hello World!"
    },
    {
      title: "Emoji / UTF-8 Decode",
      description: "Safely decoding multi-byte Unicode characters.",
      input: "SSDimqQgV2ViIERldiE=",
      output: "I ❤️ Web Dev!"
    },
    {
      title: "URL-Safe JWT Payload Decode",
      description: "Decoding a URL-safe Base64 string from a JSON Web Token.",
      input: "eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoic3VwZXJ1c2VyIn0",
      output: '{"user":"admin","role":"superuser"}'
    }
  ],

  faq: [
    {
      question: "What is Base64 decoding?",
      answer: "Base64 decoding is the process of converting a Base64-encoded ASCII string back into its original raw binary or text format."
    },
    {
      question: "How do I decode Base64?",
      answer: "Paste your Base64 string into our tool's input box. The tool will instantly parse the string and present the decoded text or allow you to download the decoded binary file."
    },
    {
      question: "Is Base64 encrypted?",
      answer: "No. Base64 is merely an encoding format designed for safe data transport, not a cryptographic function. Anyone can instantly decode a Base64 string without a password or key."
    },
    {
      question: "Why is my Base64 invalid?",
      answer: "Invalid Base64 usually happens because the string was truncated, contains characters outside the Base64 alphabet, or uses URL-safe characters (hyphens/underscores) when the decoder expects standard characters (pluses/slashes)."
    },
    {
      question: "Can Base64 decode images?",
      answer: "Yes. If the decoded data is an image format (like PNG or JPEG), our tool will automatically render a visual preview of the image on your screen."
    },
    {
      question: "What is URL-safe Base64?",
      answer: "URL-safe Base64 replaces the '+' and '/' characters with '-' (hyphen) and '_' (underscore) respectively, allowing the string to be passed safely in web URLs without causing routing errors."
    },
    {
      question: "Does Base64 support Unicode?",
      answer: "Our decoder fully supports Unicode (UTF-8). Unlike native browser functions that crash on emojis, our tool safely parses the byte array using modern TextDecoder APIs to perfectly restore international characters."
    },
    {
      question: "Why does Base64 increase file size?",
      answer: "Because Base64 maps 3 bytes of raw binary data into 4 bytes of ASCII text, the resulting encoded string is always roughly 33% larger than the original file."
    },
    {
      question: "Can corrupted Base64 be fixed?",
      answer: "Sometimes. If the corruption is simply missing '=' padding characters or added line breaks, our tool auto-fixes it. However, if actual character data is missing, the original file cannot be recovered."
    },
    {
      question: "Is Base64 reversible?",
      answer: "Yes, Base64 is completely lossless and 100% reversible. Decoding a string will return the exact, byte-for-byte original data."
    }
  ],

  relatedTools: [
    { name: "Base64 Encode Tool", slug: "base64-encode" },
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "JWT Decoder", slug: "jwt-decoder" },
    { name: "URL Encoder", slug: "url-encoder" },
    { name: "Hash Generator", slug: "hash-generator" },
    { name: "CSV Viewer", slug: "csv-viewer" }
  ]
};
