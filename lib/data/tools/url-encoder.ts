import { ToolConfig } from './types';

export const urlEncoderConfig: ToolConfig = {
  slug: "url-encoder",
  title: "URL Encoder & Decoder Tool",
  shortDescription: "Advanced percent-encoding utility for URLs. Supports encodeURI, encodeURIComponent, query string parsing, real-time decoding, and Unicode conversion.",
  category: "Encoding & Security",
  keywords: [
    "url encoder", "url decoder", "percent encoding", "encodeURIComponent", "encodeURI",
    "url encode online", "url safe encoding", "decode url string", "url query parser",
    "query string encoder", "utf8 url encode", "unicode url encoder", "web url encode",
    "http url encoder", "parse query parameters"
  ],

  longDescription: `
## What is URL Encoding?

**URL Encoding**, formally known as percent-encoding, is a mechanism for encoding information in a Uniform Resource Identifier (URI). URLs can only be sent over the Internet using the ASCII character set. Because URLs often contain characters outside the ASCII set (like spaces, emojis, or international characters), those characters must be converted into a valid ASCII format. 

URL encoding replaces unsafe ASCII characters with a \`%\` followed by two hexadecimal digits representing the character's numeric value. For instance, a simple space character is replaced by \`%20\`.

---

## What is Percent Encoding?

Percent-encoding is the exact technical term for URL encoding defined by RFC 3986. The concept is simple: if a character is reserved or not allowed in a URI, the browser or server replaces it with a percent sign \`%\` and its hexadecimal byte value.

For example, the exclamation mark \`!\` becomes \`%21\`, and the hash symbol \`#\` becomes \`%23\`. This prevents web servers from confusing the data within a URL with the structural components of the URL itself (like fragments or query delimiters).

---

## How URL Encoding Works

When a browser encounters a URL, it needs to parse it into distinct parts: protocol, domain, path, query parameters, and fragments. Certain characters are "reserved" because they are used as delimiters to separate these parts.

If you want to pass a reserved character as actual data (for instance, passing the string \`user@domain.com\` as a query parameter), the \`@\` symbol must be encoded to \`%40\` so the browser doesn't mistakenly think it's part of an authentication string.

When encoding a string, the system processes it byte by byte. If it's a standard ASCII character, it checks if it's reserved or unsafe. If it is, it applies percent-encoding. For modern Unicode characters (like Emojis or foreign languages), the character is first converted into a UTF-8 byte sequence, and then each byte is percent-encoded.

---

## URL Encoding vs Decoding

- **URL Encoding** translates unsafe or reserved characters into percent-encoded hexadecimal representations to ensure safe transit over HTTP.
- **URL Decoding** is the reverse process. It scans the string for \`%\` symbols followed by two hex digits and converts them back into their original characters. 

Developers encode URLs when sending data via API requests, redirecting users, or building query strings. They decode URLs when receiving data on the server side to read the actual intended values.

---

## Why Developers Encode URLs

Encoding URLs is non-negotiable for modern web development. Some critical reasons include:

**Query Parameters**: Search engines and APIs rely heavily on query strings (e.g., \`?query=hello+world\`). If a user searches for something containing an ampersand (like "AT&T"), the \`&\` must be encoded as \`%26\`. Otherwise, the server will interpret it as the start of a brand new parameter.

**Form Submissions**: When HTML forms are submitted via the GET method, the browser automatically URL-encodes the input fields. Understanding how this works is vital for backend developers parsing form data.

**Cross-Site Scripting (XSS) Prevention**: Encoding user input before placing it into a URL prevents malicious users from injecting JavaScript into the address bar.

---

## Reserved URL Characters

RFC 3986 defines a set of "reserved" characters that have special meaning in URLs. If you intend to use these characters as data, they **must** be encoded:

- \`:\` (Colon) -> \`%3A\`
- \`/\` (Slash) -> \`%2F\`
- \`?\` (Question Mark) -> \`%3F\`
- \`#\` (Hash/Pound) -> \`%23\`
- \`[\` and \`]\` (Brackets) -> \`%5B\` and \`%5D\`
- \`@\` (At Symbol) -> \`%40\`
- \`!\`, \`$\`, \`&\`, \`'\`, \`(\`, \`)\`, \`*\`, \`+\`, \`,\`, \`;\`, \`=\`

---

## Unsafe URL Characters

In addition to reserved characters, there are "unsafe" characters that should always be encoded because different systems handle them unpredictably. This includes the Space character (\`%20\` or \`+\`), quotation marks (\`"\`), angle brackets (\`<\`, \`>\`), and the percent sign itself (\`%25\`).

---

## encodeURI vs encodeURIComponent

If you are a JavaScript developer, you will frequently use two built-in functions: \`encodeURI()\` and \`encodeURIComponent()\`. Understanding the difference is crucial.

**encodeURI()**: Used to encode a completely functional, full URL. It ignores protocol prefixes (like \`http://\`) and domain separators. It will NOT encode characters like \`?\`, \`=\`, \`&\`, \`/\`, or \`:\` because doing so would break the URL structure.

**encodeURIComponent()**: Used to encode a specific component of a URL, typically a query parameter value. It encodes almost everything, including \`?\`, \`=\`, \`&\`, and \`/\`. 

*Rule of Thumb: If you are building a query string like \`?name=\${value}\`, always use \`encodeURIComponent(value)\`.*

---

## UTF-8 URL Encoding and Unicode

In the early days of the web, URLs only supported basic ASCII characters. Today, Internationalized Resource Identifiers (IRIs) allow URLs to contain characters from almost any language on Earth.

When a browser encounters a Unicode character (like the Japanese character "本" or a smiley face emoji "😀"), it converts that character into UTF-8 bytes, and then percent-encodes each byte. 

For example, the smiley face emoji requires four bytes in UTF-8. Therefore, URL encoding it results in a massive 12-character string: \`%F0%9F%98%80\`. Our advanced encoder perfectly handles complex Unicode sequences seamlessly.

---

## Common URL Encoding Mistakes

1. **Double Encoding**: Encoding an already-encoded string. For instance, encoding a space (\` \`) turns it into \`%20\`. Encoding it again turns the \`%\` into \`%25\`, resulting in \`%2520\`. This breaks backend parsing. Our tool highlights potential double-encoded segments.
2. **Encoding the Full URL Incorrectly**: Using \`encodeURIComponent\` on a full URL turns \`https://google.com\` into \`https%3A%2F%2Fgoogle.com\`, which a browser cannot navigate to.
3. **Mishandling Spaces**: In query parameters, a space is traditionally encoded as a plus sign (\`+\`), while in URL paths, it is encoded as \`%20\`. 

---

## URL Encoding in APIs

Modern REST APIs send and receive data primarily through URLs and JSON. When designing an API endpoint like \`/api/users/{username}\`, if a username contains a slash (e.g., \`john/doe\`), the server will misinterpret it as two separate folder paths (\`/api/users/john/doe\`). The frontend must encode the username to \`john%2Fdoe\` so the API router matches the endpoint correctly.

---

## Security Considerations

URL encoding is crucial for avoiding injection attacks. When reflecting user input directly into a hyperlink or an image \`src\` tag, failing to URL-encode the string allows attackers to break out of the HTML attribute by injecting quotation marks. 

However, remember that URL encoding is **not** encryption. It provides zero confidentiality and is completely reversible by anyone. Do not pass sensitive information (like passwords or API keys) in URLs, as they will be saved in browser history, proxy logs, and server access logs—even if they are encoded.

---

## Browser Compatibility

URL encoding is universally supported across every modern and legacy browser. All browsers implicitly encode Unicode domains (via Punycode) and paths automatically when a user hits enter in the address bar. Our tool replicates this standard behavior, ensuring the strings you generate here will behave identically in Chrome, Safari, Firefox, and Edge.
  `,

  features: [
    "Instant real-time bidirectional URL Encode and Decode",
    "Toggle between encodeURI (full URLs) and encodeURIComponent (parameters)",
    "Interactive Query Parameter Inspector to visually edit key-value pairs",
    "Full UTF-8 and Unicode emoji percent-encoding support",
    "Smart detection of double-encoded characters and invalid URI formats",
    "Detailed character counts, encoded sizes, and reserved character stats",
    "One-click copy and download functionality for parsed strings",
    "Graceful error handling for malformed percent-encoded sequences",
    "100% client-side local execution for absolute privacy and security",
    "Mobile-responsive UI with integrated dark mode"
  ],

  useCases: [
    "Preparing user input to safely pass as URL query parameters in API requests",
    "Decoding obfuscated affiliate tracking links to see the original destination",
    "Debugging double-encoded server responses where spaces turn into '%2520'",
    "Visually inspecting and editing massive query strings from marketing campaigns",
    "Converting Unicode characters and emojis into valid web-safe ASCII links",
    "Creating safe mailto: links with predefined subject and body parameters"
  ],

  howToSteps: [
    "Select the operation mode: 'Encode' or 'Decode'.",
    "Paste your URL or text string into the input panel.",
    "If encoding, choose between 'Component' (strict encoding for query params) or 'Full URL' (ignores structural characters like slashes).",
    "Watch the output panel instantly generate the safe, percent-encoded string.",
    "If your URL contains a query string (e.g., ?key=value), scroll down to the 'Query Inspector' to edit individual parameters visually.",
    "Use the toolbar to copy the output or download it as a text file."
  ],

  examples: [
    {
      title: "Query Parameter Encoding",
      description: "Encoding an email address containing an '@' symbol.",
      input: "user@example.com",
      output: "user%40example.com"
    },
    {
      title: "Full URL Encoding",
      description: "Encoding an entire URL containing spaces (using encodeURI).",
      input: "https://example.com/my folder/file.txt",
      output: "https://example.com/my%20folder/file.txt"
    },
    {
      title: "Unicode & Emoji URL",
      description: "Encoding a modern UTF-8 string.",
      input: "https://shop.com/search?q=t-shirt 👕",
      output: "https://shop.com/search?q=t-shirt%20%F0%9F%91%95"
    }
  ],

  faq: [
    {
      question: "What is URL encoding?",
      answer: "URL encoding (percent-encoding) is a mechanism for converting characters that are not allowed in URLs (like spaces or emojis) into a web-safe format using a '%' sign followed by hexadecimal digits."
    },
    {
      question: "Why do URLs need encoding?",
      answer: "URLs can only be sent over the internet using the basic ASCII character set. Any character outside this set, or characters that have special structural meaning in a URL (like '?' or '&'), must be encoded so the web server parses the URL correctly."
    },
    {
      question: "What is percent encoding?",
      answer: "Percent encoding is the formal technical term for URL encoding. It refers to the practice of substituting an unsafe character with a percent sign (%) and its 2-digit hex byte value."
    },
    {
      question: "How do I decode a URL?",
      answer: "Simply paste your encoded URL into our tool and ensure the 'Decode' tab is selected. The tool will automatically parse the string and revert all % sequences back to their original readable characters."
    },
    {
      question: "What is the difference between encodeURI and encodeURIComponent?",
      answer: "encodeURI is meant for encoding an entire, fully functional URL; it leaves structural characters like 'http://' and '/' alone. encodeURIComponent is strict—it encodes almost everything, including slashes and equals signs. It should only be used to encode individual query parameter values."
    },
    {
      question: "What characters must be encoded?",
      answer: "All reserved characters (like /, ?, #, &, =, @) must be encoded if they are used as data. Additionally, all unsafe characters (like spaces, quotes, <, >) and all Unicode/Emoji characters must be encoded."
    },
    {
      question: "Can Unicode URLs be encoded?",
      answer: "Yes. Our tool correctly translates Unicode characters (like emojis or foreign languages) into UTF-8 bytes first, and then percent-encodes each byte, ensuring perfect compatibility with modern web standards."
    },
    {
      question: "What causes double encoding?",
      answer: "Double encoding happens when a string that is already URL-encoded is accidentally passed through an encoding function a second time. This causes the '%' signs in the string to be encoded into '%25'."
    },
    {
      question: "Is URL encoding secure?",
      answer: "No. URL encoding is strictly for structural parsing and transport compatibility. It provides absolutely no security or encryption. Never put sensitive data like passwords in a URL, even if encoded."
    },
    {
      question: "What is the difference between URI and URL?",
      answer: "A URI (Uniform Resource Identifier) is a general string that identifies a resource. A URL (Uniform Resource Locator) is a specific type of URI that not only identifies the resource but also provides a way to locate it (e.g., via http or ftp)."
    }
  ],

  relatedTools: [
    { name: "Base64 Encode Tool", slug: "base64-encode" },
    { name: "Base64 Decode Tool", slug: "base64-decode" },
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "JWT Decoder", slug: "jwt-decoder" },
    { name: "Hash Generator", slug: "hash-generator" },
    { name: "URL Encoder", slug: "url-encoder" }
  ]
};
