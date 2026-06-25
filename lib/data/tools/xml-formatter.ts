import { ToolConfig } from './types';

export const xmlFormatterConfig: ToolConfig = {
  slug: "xml-formatter",
  title: "XML Formatter & Beautifier",
  shortDescription: "Format, beautify, minify, validate, and convert XML documents instantly. Features syntax highlighting, tree view, XPath testing, XML-to-JSON conversion, and format presets — all client-side.",
  category: "Text & Formatting",
  keywords: [
    "xml formatter", "xml beautifier", "xml pretty print", "xml minifier", "format xml online",
    "xml parser", "xml validator", "beautify xml", "minify xml", "xml syntax checker",
    "format xml", "clean xml", "xml to single line", "online xml editor",
    "xml to json converter", "xpath tester", "xml tree viewer", "xml syntax highlighting",
    "xml validation tool", "xml format presets", "xml url import"
  ],

  longDescription: `
Working with raw, unformatted XML (eXtensible Markup Language) can be incredibly frustrating, tedious, and error-prone. Whether you are dealing with legacy SOAP API responses, massive enterprise configuration files, RSS feeds, or complex website sitemaps, finding syntax errors or simply understanding the underlying data hierarchy is nearly impossible when everything is compressed onto a single, infinite line. 

Our **XML Formatter & Beautifier** solves this problem instantly. It is a professional-grade, highly robust browser utility designed to instantly parse, validate, and beautify complex XML documents.

### Why Use a Dedicated XML Formatter?

XML relies heavily on nested tags to represent structured data. Unlike JSON, which uses lightweight brackets, XML requires opening and closing tags for every single node (e.g., \`<EmployeeName>John Doe</EmployeeName>\`). This inherently makes XML files much more verbose and visually dense. When this nesting loses its indentation—often due to minification for network transport—the code becomes an unreadable wall of text.

A reliable XML Formatter restructures your document by adding appropriate line breaks and precise indentation levels for every parent and child element. It reconstructs the visual hierarchy so you can easily trace data flows, locate specific nodes, and understand the schema without getting lost in the markup.

#### 1. Debugging Legacy APIs and SOAP Web Services
While REST and GraphQL use JSON, many enterprise systems, banking infrastructures, and legacy web services still communicate exclusively via SOAP (Simple Object Access Protocol) and XML. When an API call fails, the server often returns a massive XML error trace. Pasting that payload into our beautifier allows you to instantly visualize the envelope, the header, and the specific fault node, cutting your debugging time in half.

#### 2. Managing Configuration Files
Many popular software frameworks and enterprise applications rely on XML for configuration (such as Java's Maven \`pom.xml\`, Android's \`AndroidManifest.xml\`, or Microsoft .NET configs). A single misplaced closing tag or a forgotten quotation mark around an attribute will crash the entire application on startup. By formatting the configuration file, structural anomalies and syntax errors become glaringly obvious.

#### 3. Analyzing RSS Feeds and Sitemaps
Digital marketers and SEO specialists frequently need to inspect \`sitemap.xml\` files to ensure search engines are properly crawling their websites. Sitemaps for large e-commerce stores can contain up to 50,000 URLs, making them massive files. Our tool allows you to format these feeds to verify that \`<loc>\`, \`<lastmod>\`, and \`<priority>\` tags are correctly structured.

### Powerful Real-Time XML Validation

Our formatter doesn't just make your code look pretty; it acts as a strict compiler and actively checks your code for correctness. XML is famously unforgiving—if a document is not "well-formed," a standard XML parser will refuse to process it entirely.

Built-in validation parses your XML in real-time, instantly detecting malformed tags, unclosed elements, mismatched case sensitivity (e.g., \`<Note>\` closed by \`</note>\`), or invalid characters. If an error is found, the tool halts formatting and explicitly highlights the exact line and column where the parsing failed, so you can fix your syntax before deploying your configuration or sending your payload.

### Fast XML Minification for Production

Sometimes you need the exact opposite of beautification. When transmitting XML over a network or storing it in a database, extra spaces, tabs, and line breaks just consume unnecessary bandwidth and storage capacity. 

This tool includes a robust **XML Minifier** that safely strips out all extraneous whitespace between tags, compressing your XML into a single dense string without corrupting the data structure or altering the inner text nodes. Minifying XML payloads before transmission is a standard best practice for optimizing backend network performance and reducing API latency.

### Seamless XML to JSON Conversion

The modern web runs on JSON. If you are migrating a legacy system, building a bridge between an old SOAP API and a new React frontend, or simply prefer JSON's more lightweight syntax, converting data formats is a frequent chore.

Our built-in **XML to JSON Converter** instantly parses your XML document and outputs clean, properly formatted JSON. It intelligently handles attributes, nested nodes, and arrays, providing a frictionless way to modernize your data payloads without writing complex parsing scripts from scratch.

### Interactive Tree View & XPath Query Tester

- **Interactive Tree View:** Visualize the hierarchical structure of your XML. Every element, attribute, and text node is displayed in an expandable/collapsible tree, making it easy to navigate deeply nested documents and understand complex data relationships at a glance.
- **XPath Query Tester:** Test XPath expressions against your XML documents in real-time. Our XPath Tester lets you write queries, instantly see matching nodes, and debug your selectors—perfect for web scraping, XSLT development, and data extraction workflows.

### 100% Client-Side Privacy and Security

Enterprise XML files frequently contain highly sensitive information, including database connection strings, proprietary business logic, financial transaction records, and user data. Uploading this data to a random internet tool is a severe security vulnerability.

**We built our XML Formatter with a strict zero-data-retention policy.** All parsing, validation, formatting, and conversion algorithms are executed entirely via Client-Side JavaScript within your local browser. 

Your data never leaves your computer. It is never transmitted to our servers, it is never stored in a database, and we cannot access it. You can confidently format confidential enterprise configurations and secure payloads with absolute peace of mind.

### Conclusion

Whether you are a Java developer maintaining a massive enterprise application, an Android developer tweaking UI layouts, or a data analyst extracting records from an old database dump, working with XML is an unavoidable reality. 

Bookmark this XML Formatter & Beautifier as your primary utility for handling markup languages. With its combination of lightning-fast client-side formatting, strict syntax validation, minification, and JSON conversion capabilities, it is the only XML tool you will ever need.
  `,

  features: [
    "Instant XML beautification with configurable indentation (2 spaces, 4 spaces, or tabs)",
    "XML Minification to compress payloads and reduce file size",
    "Real-time XML validation with line and column error reporting",
    "Professional code editor with full XML syntax highlighting (Monaco Editor)",
    "Interactive Tree View for visual XML hierarchy exploration",
    "XML to JSON conversion with copy and download support",
    "XPath query tester with live result matching",
    "Format presets: Compact, Readable, Pretty, 2-Space, 4-Space, Tabs",
    "Import XML from URL with CORS-safe fetching",
    "Undo/Redo support and Word Wrap toggle",
    "File upload and download capabilities",
    "Dark mode and light mode support",
    "Keyboard accessible with ARIA labels",
    "100% Client-side processing for absolute data privacy and security"
  ],

  useCases: [
    "Formatting complex SOAP API or REST API XML responses for debugging",
    "Cleaning up auto-generated sitemaps or RSS feeds for manual review",
    "Minifying large XML configuration files before application deployment",
    "Validating manually edited XML to ensure there are no unclosed tags",
    "Converting XML data to JSON for use in modern JavaScript applications",
    "Testing XPath expressions for web scraping and XSLT transformations",
    "Visualizing complex XML hierarchies in tree view for documentation",
    "Extracting and reading XML payloads embedded within log files"
  ],

  howToSteps: [
    "Paste your raw or minified XML into the 'Input' editor on the left, or use the 'Upload' button to load an .xml file, or import from a URL.",
    "The tool instantly validates your XML and displays a status badge — green for valid, red for errors with line/column details.",
    "Select your preferred indentation size or format preset from the dropdown menu.",
    "Click 'Format' to beautify or 'Minify' to compress the XML.",
    "Switch to 'Tree View' to visually explore the XML hierarchy with expand/collapse controls.",
    "Use the 'XML to JSON' tab to convert your document to JSON format.",
    "Use the 'XPath Tester' tab to query specific nodes in your XML.",
    "Copy or download the output using the toolbar buttons."
  ],

  examples: [
    {
      title: "Beautify Minified XML",
      description: "Convert a single-line XML payload into a readable hierarchy.",
      input: "<?xml version=\"1.0\"?><catalog><book id=\"bk101\"><author>Gambardella, Matthew</author><title>XML Developer's Guide</title><price>44.95</price></book></catalog>",
      output: `<?xml version="1.0"?>\n<catalog>\n  <book id="bk101">\n    <author>Gambardella, Matthew</author>\n    <title>XML Developer's Guide</title>\n    <price>44.95</price>\n  </book>\n</catalog>`
    },
    {
      title: "Detecting XML Errors",
      description: "Identifying an unclosed tag in an XML document.",
      input: "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</note>",
      output: `Error: Malformed XML. Opening and ending tag mismatch: body line 1 and note.`
    }
  ],

  faq: [
    {
      question: "What is an XML formatter?",
      answer: "An XML formatter is a tool that takes raw, minified, or poorly indented XML code and restructures it with proper indentation, line breaks, and nesting to make it easy to read and debug. It can also minify XML by removing unnecessary whitespace."
    },
    {
      question: "Is this XML formatter safe?",
      answer: "Yes, absolutely. All formatting, validation, conversion, and querying are performed locally in your web browser using client-side JavaScript. Your XML data is never sent to any server, ensuring complete privacy and security."
    },
    {
      question: "How do I validate XML?",
      answer: "Simply paste your XML into the editor. The tool automatically validates your XML in real-time using the browser's native DOMParser. If any errors are found, a detailed error message is displayed with the exact line number and column number of the issue."
    },
    {
      question: "Can I minify XML?",
      answer: "Yes. Click the 'Minify' button in the toolbar to strip all unnecessary whitespace and line breaks from your XML, compressing it into a single dense line. This is useful for reducing payload size in API transmissions and storage."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes. Since all processing happens client-side in your browser, the XML Formatter works fully offline once the page is loaded. No internet connection is required for formatting, validation, or conversion operations."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "HTML Formatter", slug: "html-formatter" },
    { name: "CSS Beautifier", slug: "css-beautifier" },
    { name: "JavaScript Beautifier", slug: "js-beautifier" },
    { name: "Diff Checker", slug: "diff-checker" }
  ]
};
