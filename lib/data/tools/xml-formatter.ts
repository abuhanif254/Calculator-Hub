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
Working with raw, unformatted XML can be incredibly frustrating. Whether you are dealing with API responses, configuration files, RSS feeds, or sitemaps, finding errors or understanding the data hierarchy is difficult when everything is compressed onto a single line. Our **XML Formatter & Beautifier** solves this problem instantly.

### Why Use an XML Formatter?
XML (eXtensible Markup Language) relies heavily on nested tags to represent data structures. When this nesting loses its indentation, the code becomes nearly impossible to read. A reliable XML Formatter restructures your document by adding appropriate line breaks and indentation level for every parent and child element. It reconstructs the visual hierarchy so you can easily trace data flows and locate specific nodes.

### Powerful XML Validation
Our formatter doesn't just make your code look pretty; it actively checks it for correctness. Built-in validation parses your XML in real-time, instantly detecting malformed tags, unclosed elements, or invalid characters. If an error is found, the tool highlights the exact line and column so you can fix your syntax before deploying your configuration or sending your payload.

### Fast XML Minification
Sometimes you need the opposite of beautification. When transmitting XML over a network or storing it in a database, extra spaces and line breaks just consume unnecessary bandwidth and storage. This tool includes a robust **XML Minifier** that safely strips out all extraneous whitespace between tags, compressing your XML into a single dense string without corrupting the data structure.

### XML to JSON Conversion
Need to transform your XML data into JSON format? Our built-in **XML to JSON Converter** parses your XML document and outputs clean, properly formatted JSON. This is invaluable when migrating between data formats, integrating with REST APIs, or when you simply prefer JSON's more lightweight syntax.

### Interactive Tree View
Visualize the hierarchical structure of your XML with our **Tree View** mode. Every element, attribute, and text node is displayed in an expandable/collapsible tree, making it easy to navigate deeply nested documents and understand complex data relationships at a glance.

### XPath Query Tester
Test XPath expressions against your XML documents in real-time. Our **XPath Tester** lets you write queries, instantly see matching nodes, and debug your selectors — perfect for web scraping, XSLT development, and data extraction workflows.

### Format Presets
Choose from predefined formatting styles — Compact, Readable, Pretty Print, 2 Spaces, 4 Spaces, or Tabs — to match your project's coding standards without manual configuration.

### 100% Client-Side and Secure
Privacy is critical when working with proprietary data feeds, API keys, or enterprise configurations. That's why our XML Formatter processes everything directly within your web browser. Your data is never transmitted to or stored on any external servers. You get instant, secure formatting with zero latency.
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
