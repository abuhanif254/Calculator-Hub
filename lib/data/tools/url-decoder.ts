import { ToolConfig } from './types';

export const urlDecoderConfig: ToolConfig = {
  slug: "url-decoder",
  title: "URL Decoder Tool",
  shortDescription: "Advanced URL decoding utility. Parse percent-encoded strings, inspect query parameters, handle Unicode/UTF-8 gracefully, and detect double-encoded URLs.",
  category: "Encoding & Security",
  keywords: [
    "url decoder", "url decode online", "decode url string", "percent decoding", 
    "decodeURIComponent", "decodeURI", "url query parser", "query string decoder",
    "utf8 url decode", "unicode url decoder", "decode percent encoded", 
    "url structure analyzer", "double encoding detector"
  ],

  longDescription: `
## What is URL Decoding?

**URL Decoding** is the process of reverting a percent-encoded Uniform Resource Identifier (URI) back into its original, human-readable format. When data is sent over the internet via URLs, certain characters—like spaces, emojis, and structural symbols—cannot be safely transmitted. They are "encoded" into a percent sign (\`%\`) followed by a two-digit hexadecimal number.

URL decoding scans a string for these percent sequences and translates them back into their literal characters. For example, the sequence \`%20\` is converted back into a standard space, and \`%3F\` is converted back into a question mark (\`?\`).

---

## What is Percent Encoding?

Percent encoding is the technical standard (defined in RFC 3986) used to encode data within URLs. Because URLs must be written using the standard ASCII character set, any character outside of this set must be percent-encoded.

This includes:
- **Reserved Characters**: Characters that have structural meaning in a URL, such as \`/\` (path separator), \`?\` (query string initiator), and \`&\` (query parameter separator). If these characters are meant to be data, they are encoded (e.g., \`%2F\`, \`%3F\`, \`%26\`).
- **Unsafe Characters**: Characters that can be misinterpreted by web browsers, servers, or email clients, such as spaces (\`%20\`), quotation marks (\`%22\`), and angle brackets (\`%3C\`, \`%3E\`).
- **Unicode / Non-ASCII Characters**: Any character from international languages (like Arabic, Chinese, or Cyrillic) or Emojis.

---

## How URL Decoding Works

When our decoder receives a string, it parses the text sequentially. Every time it encounters a \`%\` symbol, it looks at the next two characters. Assuming they form a valid hexadecimal pair, it translates that byte.

If the original text contained standard ASCII characters, the translation is 1-to-1. However, if the original text contained Unicode characters (like an Emoji), the decoding process is more complex. Modern URLs use UTF-8 encoding, meaning a single Unicode character might be represented by three or four percent-encoded bytes. 

For instance, the "Rocket" emoji 🚀 is encoded as \`%F0%9F%9A%80\`. A robust URL decoder reads these four consecutive bytes and perfectly reconstructs the original UTF-8 character.

---

## Reserved URL Characters

A critical part of understanding URL decoding is knowing the reserved characters. These are the characters that are usually decoded back into symbols:

- \`%3A\` decodes to \`:\` (Colon)
- \`%2F\` decodes to \`/\` (Slash)
- \`%3F\` decodes to \`?\` (Question Mark)
- \`%23\` decodes to \`#\` (Hash/Pound)
- \`%40\` decodes to \`@\` (At Symbol)
- \`%26\` decodes to \`&\` (Ampersand)
- \`%3D\` decodes to \`=\` (Equals Sign)
- \`%2B\` decodes to \`+\` (Plus Sign)

---

## Query Parameter Decoding

The most common use case for URL decoding is parsing query parameters. Query strings are the portions of a URL that come after the question mark (\`?\`), typically used to pass data to the server. They are formatted as key-value pairs separated by ampersands (\`&\`).

For example: \`?name=John%20Doe&email=john%40example.com\`

Our URL Decoder features an advanced **Query Parameter Inspector**. When you paste a URL containing a query string, the tool automatically parses it, decodes the individual keys and values, and presents them in a clean, readable table format.

---

## URL Decoding vs Encoding

While **encoding** is the act of safely packaging data for transport over the web, **decoding** is the act of unpacking that data upon receipt. 

Frontend developers encode data before placing it into API requests or hyperlinks. Backend developers and servers decode that data to interact with the database or process business logic. However, during debugging, developers frequently need to manually decode strings to inspect the payload, track affiliate links, or analyze tracking parameters.

---

## Double Encoding Problems

One of the most frustrating bugs in web development is **double encoding**. This occurs when an application accidentally encodes a string that has already been encoded.

For example, a space becomes \`%20\`. If the application encodes it again, the \`%\` character itself is encoded into \`%25\`, resulting in \`%2520\`. When a backend system attempts to decode this once, it turns back into \`%20\` (instead of a space) and breaks the logic.

Our decoder can help you identify double-encoded strings by allowing you to manually decode the output multiple times, revealing the layers of redundant encoding.

---

## Common URL Decoding Errors

1. **Malformed URI Sequence**: This is a critical JavaScript error (\`URIError: malformed URI sequence\`). It occurs when the string contains a \`%\` sign that is not followed by two valid hexadecimal characters, or when a UTF-8 byte sequence is incomplete. Our tool gracefully catches these errors and warns you.
2. **Literal Plus Signs**: In the query string of a URL (after the \`?\`), spaces are historically encoded as plus signs (\`+\`). However, in the path of a URL, spaces are encoded as \`%20\`, and a \`+\` is treated as a literal plus sign. Misinterpreting this distinction is a common source of bugs.
3. **Improper Character Sets**: Attempting to decode strings that were originally encoded using legacy character sets (like ISO-8859-1) using modern UTF-8 decoders can result in garbled text (replacement characters like ).

---

## Security Considerations

It is absolutely crucial to understand that **URL Encoding is not Encryption**. 

Decoding a URL requires no password, no private key, and no special permissions. Anyone who intercepts a URL can instantly decode it. If you are building a web application, never pass sensitive information—like passwords, authentication tokens, API keys, or Personally Identifiable Information (PII)—in the URL query parameters. Always use HTTPS and pass sensitive data in the HTTP POST body.

Furthermore, failing to properly handle decoded URL parameters can lead to Cross-Site Scripting (XSS) vulnerabilities. Never reflect decoded user input directly into HTML without sanitizing it first.

---

## URL Decoding in APIs

When developing RESTful APIs, you often need to inspect the exact payload being sent to your endpoints. Because GET requests must pass all their parameters through the URL, complex JSON objects or arrays are often heavily serialized and percent-encoded. 

Pasting these massive, unreadable blocks of \`%22\`, \`%7B\`, and \`%3A\` into our decoder will instantly convert them back into clean, formatted JSON or XML strings, drastically speeding up your debugging workflow.
  `,

  features: [
    "Instant real-time URL decoding and string unwrapping",
    "Smart Query Parameter Inspector for editing and viewing parsed key-value pairs",
    "Support for full UTF-8 and complex Unicode emoji sequence decoding",
    "Graceful handling of 'Malformed URI Sequence' errors",
    "Toggle between decodeURI and decodeURIComponent algorithms",
    "Automatic translation of legacy '+' characters to spaces in query modes",
    "Detailed character analytics and length comparisons",
    "100% client-side local execution for absolute privacy and security",
    "Mobile-responsive UI with integrated dark mode and clipboard utilities"
  ],

  useCases: [
    "Decoding obfuscated affiliate, marketing, or tracking links",
    "Inspecting heavily encoded JSON payloads sent via API GET requests",
    "Debugging double-encoded server responses where spaces turn into '%2520'",
    "Extracting query parameters from OAuth redirect callbacks",
    "Restoring internationalized URLs and Emoji paths to their readable format"
  ],

  howToSteps: [
    "Paste your percent-encoded URL or string into the top input panel.",
    "The tool will instantly parse the string and display the human-readable text in the output box.",
    "If your URL contains a query string (e.g., ?key=value), scroll down to the 'Query Inspector' to view the decoded parameters in a clean table.",
    "If you encounter a 'URI Error', check if your string contains stray '%' signs that are not valid hex codes.",
    "Use the toolbar to copy the output or download it as a text file for further analysis."
  ],

  examples: [
    {
      title: "Standard Space Decoding",
      description: "Decoding a string containing percent-encoded spaces.",
      input: "Hello%20World%21",
      output: "Hello World!"
    },
    {
      title: "Query Parameter Decoding",
      description: "Decoding an email address containing an encoded '@' symbol.",
      input: "user%40example.com",
      output: "user@example.com"
    },
    {
      title: "Unicode & Emoji Decoding",
      description: "Decoding a modern UTF-8 multi-byte string.",
      input: "https://shop.com/search?q=t-shirt%20%F0%9F%91%95",
      output: "https://shop.com/search?q=t-shirt 👕"
    }
  ],

  faq: [
    {
      question: "What is URL decoding?",
      answer: "URL decoding is the process of translating a percent-encoded string (where unsafe characters are replaced by a '%' and a hex code) back into a standard, human-readable format."
    },
    {
      question: "How do I decode a URL?",
      answer: "Simply paste your encoded string into our tool. It will automatically detect the percent sequences and instantly translate them back to their original characters."
    },
    {
      question: "What is percent encoding?",
      answer: "Percent encoding is the formal technical term for URL encoding. It dictates how reserved or unsafe characters must be formatted to survive transmission over HTTP."
    },
    {
      question: "Why are URLs encoded?",
      answer: "URLs must be written using standard ASCII characters. Any character outside this set, or any character that has special meaning in a URL (like slashes or ampersands), must be encoded to prevent structural errors."
    },
    {
      question: "What causes invalid URL encoding?",
      answer: "A 'Malformed URI Sequence' error occurs when the text contains a '%' sign that is not followed by two valid hexadecimal characters, or when a multi-byte UTF-8 sequence is unexpectedly truncated."
    },
    {
      question: "What is double encoding?",
      answer: "Double encoding happens when a string is accidentally encoded twice. For example, a space (' ') becomes '%20', and if encoded again, the '%' becomes '%25', resulting in '%2520'. You must decode it twice to restore the space."
    },
    {
      question: "Can Unicode URLs be decoded?",
      answer: "Yes. Our tool correctly interprets modern UTF-8 byte sequences. It can effortlessly reconstruct emojis, international languages, and complex Unicode symbols."
    },
    {
      question: "What is the difference between decodeURI and decodeURIComponent?",
      answer: "decodeURI is used for full URLs and ignores certain structural characters. decodeURIComponent is strict and attempts to decode every percent sequence it finds. It is generally the safest choice for query parameters."
    },
    {
      question: "Is URL decoding safe?",
      answer: "Yes, decoding a string in our tool is 100% safe as it runs entirely in your browser. However, URL encoding itself is not encryption, so you should never pass sensitive information in a URL."
    },
    {
      question: "What is the difference between URL encoding and decoding?",
      answer: "Encoding converts unsafe characters into percent-sequences for safe internet transit. Decoding is the reverse process, converting those percent-sequences back into readable text."
    }
  ],

  relatedTools: [
    { name: "URL Encoder Tool", slug: "url-encoder" },
    { name: "Base64 Decode Tool", slug: "base64-decode" },
    { name: "Base64 Encode Tool", slug: "base64-encode" },
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "JWT Decoder", slug: "jwt-decoder" },
    { name: "Hash Generator", slug: "hash-generator" }
  ]
};
