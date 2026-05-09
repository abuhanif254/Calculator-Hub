import { ToolConfig } from './types';

export const jsonFormatterConfig: ToolConfig = {
  slug: "json-formatter",
  title: "JSON Formatter & Validator",
  shortDescription: "Format, validate, and minify your JSON data instantly. Our free online JSON Formatter makes your code readable, helps debug syntax errors, and optimizes data for production.",
  category: "Text & Formatting",
  keywords: ["JSON formatter", "JSON validator", "format JSON", "minify JSON", "beautify JSON", "JSON parser", "JSON lint", "debug JSON", "online JSON tool"],
  
  longDescription: `
JSON (JavaScript Object Notation) has become the de facto standard for data exchange on the web. However, raw JSON data is often minified or completely unformatted, making it incredibly difficult for humans to read and debug. 

Our **JSON Formatter & Validator** is a powerful, browser-based developer tool designed to instantly transform messy, unreadable JSON strings into cleanly indented, perfectly formatted data structures. Whether you are building complex REST APIs, debugging frontend applications, or working with NoSQL databases, having a reliable JSON parser is essential.

### Why Use Our JSON Formatter?
Unlike basic text editors, our tool doesn't just indent code. It acts as a strict **JSON Linter and Validator**. When you paste your data, our engine parses the structure in real-time. If there is a missing comma, an unclosed bracket, or a misplaced quote, the tool will immediately highlight the error, saving you hours of frustrating debugging. 

### Security & Privacy First
We understand that you often work with sensitive data, API keys, and private customer information. **This JSON Formatter processes everything locally in your browser.** Your data is never sent to our servers, ensuring 100% privacy and security for your development workflow.
  `,

  features: [
    "Instant real-time formatting as you paste",
    "Strict JSON syntax validation and error highlighting",
    "Minification tool to compress JSON for production payloads",
    "One-click copy and download functionality",
    "100% Client-side processing (Secure & Private)",
    "Mobile-friendly interface for on-the-go debugging",
    "Native Dark Mode support to reduce eye strain"
  ],

  useCases: [
    "Debugging API responses and webhooks from third-party integrations",
    "Cleaning up and formatting minified JSON logs from production servers",
    "Validating configuration files (e.g., package.json, manifest.json)",
    "Preparing structured data for NoSQL databases like MongoDB or Firebase",
    "Formatting JSON Web Tokens (JWT) payload data for readability",
    "Beautifying mocked API data for frontend development",
    "Converting single-line JSON strings into hierarchical tree views",
    "Testing and validating REST API request bodies before sending",
    "Teaching and demonstrating JSON data structures to beginners"
  ],

  howToSteps: [
    "Paste your raw or minified JSON string into the left 'Input' editor.",
    "Click the 'Format' button to automatically beautify the JSON with proper indentation.",
    "Review the 'Output' editor to see your cleanly formatted data.",
    "If your JSON contains syntax errors, the tool will immediately alert you so you can fix them.",
    "Click 'Validate' to run a strict linting check against JSON standards.",
    "Need to compress data? Click 'Minify' to remove all whitespace and line breaks.",
    "Use the 'Copy' button to quickly copy the result to your clipboard.",
    "Use the 'Download' button to save the formatted output as a .json file locally.",
    "Click 'Clear' if you want to wipe the editors and start over with new data."
  ],

  examples: [
    {
      title: "Minified to Formatted",
      description: "Convert a single-line minified JSON string into a readable format.",
      input: `{"name":"John Doe","age":30,"city":"New York","skills":["JavaScript","React","Node.js"]}`,
      output: `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "skills": [
    "JavaScript",
    "React",
    "Node.js"
  ]
}`
    },
    {
      title: "Nested Objects",
      description: "Format complex, deeply nested JSON structures for easier analysis.",
      input: `{"company":{"name":"TechCorp","employees":[{"id":1,"role":"Developer"},{"id":2,"role":"Designer"}]}}`,
      output: `{
  "company": {
    "name": "TechCorp",
    "employees": [
      {
        "id": 1,
        "role": "Developer"
      },
      {
        "id": 2,
        "role": "Designer"
      }
    ]
  }
}`
    }
  ],

  faq: [
    {
      question: "Is this JSON Formatter secure to use with private data?",
      answer: "Yes, absolutely. Our JSON Formatter is 100% client-side. This means the formatting and validation happen directly inside your web browser. We do not transmit, save, or store your JSON data on our servers."
    },
    {
      question: "What is the difference between formatting and minifying JSON?",
      answer: "Formatting (or beautifying) JSON adds whitespace, tabs, and line breaks to make the data easily readable for humans. Minifying JSON does the exact opposite—it strips out all unnecessary whitespace to make the file size as small as possible for efficient network transfer."
    },
    {
      question: "Why is my JSON invalid?",
      answer: "Common reasons for invalid JSON include: using single quotes instead of double quotes, trailing commas after the last item in an array or object, missing quotes around keys, or unclosed brackets. Our validator will help point out where the syntax breaks."
    },
    {
      question: "Can I format large JSON files?",
      answer: "Yes, our browser-based editor is optimized to handle large JSON payloads efficiently. However, extremely massive files (e.g., hundreds of megabytes) might slow down your browser tab depending on your device's memory."
    }
  ],

  relatedTools: [
    { name: "JSON Validator", slug: "json-validator" },
    { name: "Base64 Encode", slug: "base64-encode" },
    { name: "XML Formatter", slug: "xml-formatter" },
    { name: "JWT Decoder", slug: "jwt-decoder" }
  ]
};
