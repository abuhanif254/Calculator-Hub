import { ToolConfig } from './types';

export const xmlFormatterConfig: ToolConfig = {
  slug: "xml-formatter",
  title: "XML Formatter & Beautifier",
  shortDescription: "Format, beautify, and minify your XML documents instantly. Validate XML structure, auto-indent tags, and identify syntax errors with this fast client-side tool.",
  category: "Text & Formatting",
  keywords: [
    "xml formatter", "xml beautifier", "xml pretty print", "xml minifier", "format xml online",
    "xml parser", "xml validator", "beautify xml", "minify xml", "xml syntax checker",
    "format xml", "clean xml", "xml to single line", "online xml editor"
  ],

  longDescription: `
Working with raw, unformatted XML can be incredibly frustrating. Whether you are dealing with API responses, configuration files, RSS feeds, or sitemaps, finding errors or understanding the data hierarchy is difficult when everything is compressed onto a single line. Our **XML Formatter & Beautifier** solves this problem instantly.

### Why Use an XML Formatter?
XML (eXtensible Markup Language) relies heavily on nested tags to represent data structures. When this nesting loses its indentation, the code becomes nearly impossible to read. A reliable XML Formatter restructures your document by adding appropriate line breaks and indentation level for every parent and child element. It reconstructs the visual hierarchy so you can easily trace data flows and locate specific nodes.

### Powerful XML Validation
Our formatter doesn't just make your code look pretty; it actively checks it for correctness. Built-in validation parses your XML in real-time, instantly detecting malformed tags, unclosed elements, or invalid characters. If an error is found, the tool highlights it so you can fix your syntax before deploying your configuration or sending your payload.

### Fast XML Minification
Sometimes you need the opposite of beautification. When transmitting XML over a network or storing it in a database, extra spaces and line breaks just consume unnecessary bandwidth and storage. This tool includes a robust **XML Minifier** that safely strips out all extraneous whitespace between tags, compressing your XML into a single dense string without corrupting the data structure.

### 100% Client-Side and Secure
Privacy is critical when working with proprietary data feeds, API keys, or enterprise configurations. That's why our XML Formatter processes everything directly within your web browser. Your data is never transmitted to or stored on any external servers. You get instant, secure formatting with zero latency.
  `,

  features: [
    "Instant XML beautification with configurable indentation (2 spaces, 4 spaces, or tabs)",
    "XML Minification to compress payloads and reduce file size",
    "Real-time XML validation that detects syntax errors and malformed tags",
    "Preservation of XML declarations, attributes, and CDATA sections",
    "Format-on-paste support for a seamless workflow",
    "Side-by-side editor layout for clear input/output comparison",
    "Built-in file upload and download capabilities",
    "Keyboard shortcuts (Ctrl+Enter to format, Ctrl+Shift+M to minify)",
    "Dark mode support and responsive design",
    "100% Client-side processing for absolute data privacy and security"
  ],

  useCases: [
    "Formatting complex SOAP API or REST API XML responses for debugging",
    "Cleaning up auto-generated sitemaps or RSS feeds for manual review",
    "Minifying large XML configuration files before application deployment",
    "Validating manually edited XML to ensure there are no unclosed tags",
    "Standardizing indentation across a team's configuration repositories",
    "Extracting and reading XML payloads embedded within log files"
  ],

  howToSteps: [
    "Paste your raw or minified XML into the 'Input' editor on the left, or use the 'Upload' button to load an .xml file.",
    "Select your preferred indentation size (2 spaces, 4 spaces, or tabs) from the dropdown menu.",
    "Click the 'Beautify' button to format the XML with proper nesting and line breaks.",
    "To compress the XML, click the 'Minify' button to strip out all unnecessary whitespace.",
    "If your XML contains syntax errors, the tool will display an alert with details about the malformed structure.",
    "Once formatted or minified, use the 'Copy' or 'Download' buttons to save your processed XML."
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
      question: "Is my XML data sent to a server for formatting?",
      answer: "No. All formatting, minification, and validation are performed locally in your browser. We do not store, track, or intercept any of your XML data."
    },
    {
      question: "Can this tool handle very large XML files?",
      answer: "Yes, because it runs entirely in your browser, it can handle large files up to the memory limits of your device. However, extremely large files (e.g., hundreds of megabytes) might cause your browser to slow down."
    },
    {
      question: "Does the minifier remove XML comments?",
      answer: "Standard minification typically removes unnecessary whitespace between tags but preserves the tags themselves. You can configure options to strip comments if needed."
    },
    {
      question: "What happens if my XML is invalid?",
      answer: "The tool uses your browser's native XML parser to validate the document. If it encounters a syntax error (like a missing closing tag), it will display an error message and prevent formatting until the issue is resolved."
    },
    {
      question: "Does it support CDATA sections?",
      answer: "Yes, CDATA sections (<![CDATA[ ... ]]>) are fully supported and will be preserved exactly as they are during formatting and minification."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "HTML Formatter", slug: "html-formatter" },
    { name: "Diff Checker", slug: "diff-checker" }
  ]
};
