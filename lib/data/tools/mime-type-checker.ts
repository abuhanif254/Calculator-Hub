import { ToolConfig } from './types';

export const mimeTypeCheckerConfig: ToolConfig = {
  slug: "mime-type-checker",
  title: "MIME Type Checker & Content-Type Inspector",
  shortDescription: "Detect, inspect, validate, and convert MIME types (Content-Types) for files, extensions, and URLs in real-time. Debug HTTP headers, inspect upload magic bytes, and audit security configurations.",
  category: "Web Dev Utilities",
  keywords: [
    "mime type checker", "content-type lookup", "detect mime type", "file extension check",
    "http headers lookup", "magic bytes validator", "mime sniffing test", "nosniff header check",
    "validate file upload", "media type database", "mime comparison", "file format verification"
  ],

  longDescription: `
## What is a MIME Type?

A **MIME Type** (Multipurpose Internet Mail Extensions), also frequently referred to as a **Media Type** or **Content-Type**, is a standardized two-part identifier used on the internet to define the format and nature of a file, document, or data stream. Originally designed in 1992 to support non-ASCII text attachments in email transmissions, MIME types have since evolved to become the foundational mechanism for media classification and transfer protocol negotiations across the World Wide Web.

MIME types consist of a primary **type** and a **subtype**, separated by a forward slash (\`/\`). For example, in the MIME type \`text/html\`, \`text\` is the type (indicating a textual category), and \`html\` is the subtype (defining the specific HTML structure). Similarly, \`image/png\`, \`audio/mpeg\`, \`video/mp4\`, and \`application/json\` represent distinct document classifications.

Whenever a web server delivers a file to a browser, it transmits an HTTP response header called \`Content-Type\`. The browser relies on this header—not the file's extension—to determine how to handle and render the arriving content.

---

## Content-Type Headers Explained

In client-server HTTP communications, the **Content-Type** header plays a critical role. When a client makes an HTTP request, it may include a Content-Type header to tell the server how to parse the request payload (for instance, \`application/json\` in an API POST request). Conversely, when the server returns a resource, it includes a Content-Type response header stating the resource's media type.

A typical Content-Type header looks like this:
\`\`\`http
Content-Type: text/html; charset=UTF-8
\`\`\`

Here, the header specifies the MIME type as \`text/html\` and includes an optional parameter, \`charset=UTF-8\`, which informs the browser that the character encoding of the HTML payload is UTF-8. Without this Content-Type header, browsers would be forced to guess the structure of the data, leading to character encoding corruption, broken graphics, or failed scripts.

---

## File Extensions vs. MIME Types: The Core Difference

A common point of confusion is the relationship between **file extensions** and **MIME types**. While they both describe the format of a file, they function at different layers of the operating system and networking stacks:

1.  **File Extensions** (e.g., \`.jpg\`, \`.pdf\`, \`.html\`) are suffix naming conventions appended to files in a local filesystem. Operating systems use them to associate files with desktop applications.
2.  **MIME Types** (e.g., \`image/jpeg\`, \`application/pdf\`, \`text/html\`) are standardized network labels transmitted inside HTTP packets. 

File extensions are fragile; a user can easily rename \`dangerous_script.exe\` to \`avatar.png\`. However, the underlying structure of the file remains a PE binary. A web server that blindly trusts extensions when handling uploads is vulnerable to server compromise. A security-conscious application validates both the claimed extension and the actual MIME type of the file.

---

## Browser Rendering Behavior & Media Streaming

When a browser receives a file, the Content-Type header dictates its rendering engine pipeline. Browser behaviors can be broadly categorized into three actions:

*   **Inline Rendering**: If a browser receives a supported media type (like \`text/html\`, \`image/svg+xml\`, \`application/pdf\`, or \`text/css\`), it attempts to parse and display it directly in the viewport.
*   **Automatic Download**: For unknown or binary types (such as \`application/zip\`, \`application/octet-stream\`, or \`application/x-msdownload\`), the browser bypasses the rendering window and downloads the file directly to local storage.
*   **Media Streaming**: Modern media formats like \`video/mp4\` or \`audio/mpeg\` are directed to hardware-accelerated decoders, allowing the browser to stream and playback content incrementally without waiting for the full file to download.

---

## What is MIME Sniffing?

**MIME Sniffing** is a technique where a web browser inspects the raw byte structure of an incoming file payload (its "magic bytes") to guess its file format, ignoring the Content-Type header sent by the server. 

In the early days of the web, many servers were misconfigured and served images as \`text/plain\` or stylesheets as \`application/octet-stream\`. To prevent broken pages, browser vendors implemented sniffing algorithms to detect the actual format.

While MIME sniffing improved usability for misconfigured sites, it introduced severe **security vulnerabilities**. If an attacker uploads a malicious HTML/JavaScript file disguised as an image (e.g., \`malicious.jpg\`), and a misconfigured server serves it, a sniffing browser might execute the embedded scripts, leading to Cross-Site Scripting (XSS) and session hijacking.

### The Shield: X-Content-Type-Options: nosniff

To protect websites from MIME sniffing exploits, security engineers introduced the \`X-Content-Type-Options\` HTTP response header. When configured to \`nosniff\`, the browser is instructed to strictly respect the Content-Type declared by the server and refuse to render files if the header does not match:
\`\`\`http
X-Content-Type-Options: nosniff
\`\`\`
This header is a security requirement for modern web applications, blocking unauthorized executable code execution from user uploads.

---

## Safe File Upload Validation & Security Diagnostics

Securing user file uploads is one of the most difficult challenges in web development. Relying on client-side extension validation is bypassable. Robust systems employ a multi-step validation check:

1.  **File Header / Magic Bytes Inspection**: Every file format starts with a specific sequence of bytes. For example, a PNG file always starts with \`89 50 4E 47 0D 0A 1A 0A\` (in hex), and a PDF starts with \`25 50 44 46\` (\`%PDF\`). Checking these magic bytes reveals if a file's extension was spoofed.
2.  **MIME Type Check**: Inspect the MIME type supplied by the browser during upload, but verify it on the server using a lookup utility.
3.  **Sanitize Filenames**: Strip path traversal tokens (\`../\`) and special characters to prevent local file inclusion exploits.
4.  **Isolate Storage**: Store uploaded files on an isolated CDN domain (e.g., \`user-content.net\`) with \`X-Content-Type-Options: nosniff\` enabled, preventing script execution in the main site's origin.

---

## MIME Configurations on Popular Web Servers

To serve files correctly, web servers must map file extensions to their corresponding MIME types. Here are examples of how to configure MIME types on common web servers:

### Apache (.htaccess)
Use the \`AddType\` directive to declare new associations:
\`\`\`apache
AddType video/webm .webm
AddType application/wasm .wasm
AddType image/webp .webp
\`\`\`

### Nginx (mime.types)
Nginx utilizes a structured configuration block. In \`nginx.conf\`, the \`include mime.types;\` statement imports the default mapping file. You can add custom overrides inside the \`types\` block:
\`\`\`nginx
types {
    text/html                             html htm shtml;
    text/css                              css;
    image/gif                             gif;
    image/jpeg                            jpeg jpg;
    application/javascript                js;
    application/atom+xml                  atom;
    application/rss+xml                   rss;
}
\`\`\`

### IIS (web.config)
In Windows IIS servers, add mime mappings inside the \`staticContent\` system node:
\`\`\`xml
<configuration>
   <system.webServer>
      <staticContent>
         <mimeMap fileExtension=".webp" mimeType="image/webp" />
      </staticContent>
   </system.webServer>
</configuration>
\`\`\`

---

## Common MIME Mistakes and SEO Implications

*   **Serving JavaScript with incorrect MIME types**: Serving script files with MIME types other than \`text/javascript\` (such as \`text/plain\` or \`application/octet-stream\`) will trigger blocking errors in browsers that respect the \`nosniff\` directive.
*   **Missing Content-Encoding Headers**: Confusing MIME type with compression wrappers can lead to issues. Serving a gzipped file requires keeping the original MIME type (e.g. \`text/html\`) and declaring \`Content-Encoding: gzip\` rather than renaming the MIME type itself.
*   **SEO Crawler Blocks**: Search engine crawlers (like Googlebot) inspect MIME types when crawling assets. If your CSS is served with an invalid MIME type, Googlebot may fail to render the page layout, leading to poor mobile-friendliness scores and degraded organic search rankings.
`,

  features: [
    "Instant file extension MIME lookup with browser handling behavior guides",
    "Secure server-side URL inspector to inspect Content-Type, charset, and server headers",
    "SSRF-protected request pipeline preventing internal IP leakage",
    "Client-side file upload validator inspecting raw magic bytes signatures",
    "File extension spoofing detector identifying execution mismatches",
    "Searchable and filterable MIME database explorer spanning 60+ common file types",
    "MIME comparative analysis workspace (Expected vs. Actual MIME)",
    "Comprehensive security audits flagging missing 'X-Content-Type-Options' and dangerous MIME types",
    "Export reports via JSON file downloads or formatted TXT diagnostics"
  ],

  useCases: [
    "Web developers troubleshooting CSS/JS loading issues caused by MIME mismatch errors",
    "Security engineers auditing file upload validation forms for extension spoofing risks",
    "System administrators configuring Nginx, Apache, or IIS static asset mappings",
    "SEO specialists diagnosing rendering errors caused by invalid Content-Type headers on stylesheets",
    "API designers validating Content-Type headers for JSON, XML, and multipart data streams"
  ],

  howToSteps: [
    "Enter a file extension (e.g. '.png') in the Search Input to look up official MIME definitions.",
    "Paste a remote URL in the URL Inspector to fetch response headers and view security audits.",
    "Drag and drop any file into the Upload Panel to parse its hex magic bytes client-side.",
    "Verify the validation status indicator to check for extension mismatches.",
    "Toggle the comparison tab to run an audit of expected vs actual headers.",
    "Explore the reference database explorer to search through file type categories.",
    "Export your diagnostics as a JSON payload or download a raw TXT report."
  ],

  faq: [
    {
      question: "What is a MIME type?",
      answer: "A MIME type (Multipurpose Internet Mail Extensions), or media type, is a standardized label used to identify the format of a file or data stream sent over the internet, allowing browsers to render it correctly."
    },
    {
      question: "What does Content-Type mean?",
      answer: "Content-Type is an HTTP header field that specifies the MIME type and character encoding (charset) of the transmitted resource payload, guiding client rendering or API parsing logic."
    },
    {
      question: "Why are MIME types important?",
      answer: "They instruct browsers how to handle data. Incorrect MIME types can cause CSS to be ignored, scripts to fail execution, or images to download instead of displaying inline."
    },
    {
      question: "What is MIME sniffing?",
      answer: "MIME sniffing is a browser behavior where it inspects the actual byte contents of a resource to guess its file format, overriding the MIME type declared in the server's Content-Type header."
    },
    {
      question: "What happens if MIME types are wrong?",
      answer: "Websites can break. Security-strict browsers will refuse to execute JavaScript files served as text/plain, media streams will fail to load, and style layouts will not render."
    },
    {
      question: "What is application/json?",
      answer: "It is the official MIME type for JSON (JavaScript Object Notation) data payloads, used extensively in RESTful and GraphQL APIs for transferring structured text variables."
    },
    {
      question: "What is text/html?",
      answer: "It is the standard MIME type for HTML document files, telling browsers to interpret the payload as markup structure and execute any embedded scripting scripts."
    },
    {
      question: "Why are file uploads rejected?",
      answer: "Uploads are rejected when files exceed size limits, contain forbidden extensions, or when their internal magic bytes do not match the expected signature (extension spoofing check)."
    },
    {
      question: "Can MIME types affect SEO?",
      answer: "Yes. If search engine crawlers encounter invalid MIME types on critical assets like CSS or JS, they may fail to render the site's layout, harming mobile usability scores and rankings."
    },
    {
      question: "What is X-Content-Type-Options?",
      answer: "It is a security header. Setting it to 'nosniff' prevents browsers from performing MIME sniffing, forcing them to strictly follow the MIME type defined in the Content-Type header."
    },
    {
      question: "Why do browsers download some files?",
      answer: "Browsers download files when the Content-Type is unknown, binary (like application/octet-stream), or when the server specifies 'Content-Disposition: attachment' to bypass inline rendering."
    },
    {
      question: "How do servers detect MIME types?",
      answer: "Servers detect MIME types by checking the file extension against a local database map (like Nginx's mime.types file) or by scanning the file's header signature (magic bytes) on-disk."
    },
    {
      question: "What is the difference between extension and MIME type?",
      answer: "An extension is a local file suffix used by operating systems (e.g. '.pdf'), while a MIME type is a standardized networking media label sent inside HTTP headers (e.g. 'application/pdf')."
    },
    {
      question: "Why is Content-Type missing?",
      answer: "Content-Type is missing when web servers are misconfigured, when resources are generated dynamically by scripts that fail to write headers, or during raw TCP packet transfers."
    }
  ],

  relatedTools: [
    { name: "HTTP Header Checker", slug: "http-header-checker" },
    { name: "Redirect Checker", slug: "redirect-checker" },
    { name: "User Agent Parser", slug: "user-agent-parser" },
    { name: "Website Screenshot Tool", slug: "website-screenshot-tool" },
    { name: "DNS Lookup", slug: "dns-lookup" }
  ],

  examples: [
    {
      title: "PNG Image Lookup",
      description: "Typical metadata lookup parameters for a standard PNG graphics file.",
      input: "png",
      output: "MIME Type: image/png\nCategory: Image\nBrowser Behavior: Renders inline as static/animated image\nMagic Bytes: 89 50 4E 47 0D 0A 1A 0A\nSecurity status: Safe"
    },
    {
      title: "PDF Document Lookup",
      description: "Lookup configuration indicating how browsers manage PDF assets.",
      input: ".pdf",
      output: "MIME Type: application/pdf\nCategory: Application\nBrowser Behavior: Renders inline with built-in viewer or prompts download\nMagic Bytes: 25 50 44 46\nSecurity status: Warning (Active scripting risk)"
    },
    {
      title: "JSON Data File",
      description: "Metadata specs for JSON APIs and configuration files.",
      input: "json",
      output: "MIME Type: application/json\nCategory: Application\nBrowser Behavior: Displays as raw text structure or triggers parser parsing\nMagic Bytes: 7B (character '{')\nSecurity status: Safe"
    }
  ]
};

export default mimeTypeCheckerConfig;
