import { ToolConfig } from './types';

export const htmlFormatterConfig: ToolConfig = {
  slug: "html-formatter",
  title: "HTML Formatter & Beautifier",
  shortDescription: "Format, beautify, and minify your HTML code instantly. Clean up messy HTML tags, detect unclosed elements, and live-preview your code with our fast, browser-based HTML formatter.",
  category: "Text & Formatting",
  keywords: ["html formatter", "html beautifier", "format html", "minify html", "clean html code", "html validator", "fix unclosed tags", "html live preview"],
  
  longDescription: `
Writing and maintaining HTML can quickly become difficult when tags are nested deeply without proper indentation. Our **HTML Formatter & Beautifier** is designed to take messy, unreadable, or minified HTML code and instantly format it into a clean, properly indented structure.

### Why Use an HTML Formatter?
In modern web development, clean HTML is critical for readability, debugging, and collaboration. When you copy HTML code from templates, inspect elements in the browser, or receive stringified HTML from backend APIs, it often loses its formatting. A reliable HTML Formatter acts as a code beautifier, reconstructing the hierarchical DOM structure so you can easily identify parent-child relationships, locate missing closing tags, and streamline your frontend development workflow.

### Advanced HTML Minification & Performance
Beyond beautification, our tool includes a powerful **HTML Minifier**. Minification is the process of stripping out unnecessary whitespace, line breaks, and comments from your source code. Minifying your HTML before deploying it to a production environment can drastically reduce file sizes, decrease page load times, and significantly boost your website's SEO performance and Core Web Vitals.

### Privacy-First Developer Tools
Whether you are formatting sensitive corporate web pages or debugging local projects, security is paramount. Our HTML Formatter provides a blazing-fast, 100% secure client-side solution. Your HTML data never leaves your browser, ensuring absolute privacy for your web projects.
  `,

  features: [
    "Instant HTML beautification with custom indentation (2, 3, or 4 spaces)",
    "Production-ready HTML Minifier to compress code and boost page speed",
    "Live Preview Mode to render and test your HTML output instantly",
    "Real-time Syntax Highlighting with VS Code-style color coding",
    "Smart Unclosed Tag Detection to catch syntax errors immediately",
    "Advanced Formatting Options to strip comments, scripts, or CSS styles",
    "Auto-copy to clipboard for frictionless developer workflows",
    "100% Client-side processing for absolute data privacy and security"
  ],

  useCases: [
    "Cleaning up and formatting minified HTML source code copied from live websites",
    "Debugging nested div structures and locating missing closing tags in complex layouts",
    "Formatting raw HTML payloads returned from API endpoints or database queries",
    "Minifying HTML files before deploying to production to optimize bandwidth and SEO",
    "Stripping out heavy inline scripts or styles from HTML templates for cleaner markup",
    "Live-testing custom HTML snippets safely inside a sandboxed iframe preview"
  ],

  howToSteps: [
    "Paste your raw, messy, or minified HTML into the 'Input HTML' editor on the left. You can also click 'Upload' to directly load an .html file.",
    "Click the 'Advanced Options' button if you want to automatically strip out comments, <script> tags, or <style> tags during the formatting process.",
    "Select your preferred indentation level from the dropdown (2, 3, or 4 spaces).",
    "Click the 'Format' button to instantly beautify the code, or click 'Minify' to compress it.",
    "Check the 'Output' editor on the right to see your perfectly formatted syntax. If there are any unclosed tags, an amber warning will alert you.",
    "Toggle to 'Preview' mode to see a live visual render of your HTML code.",
    "Use the 'Copy' or 'Download' buttons to export your optimized HTML back to your project."
  ],

  examples: [
    {
      title: "Format Messy & Minified HTML",
      description: "Convert an unreadable, single-line HTML string into a clean, hierarchical structure.",
      input: "<div class=\"wrapper\"><header><h1>Title</h1></header><main><p>Content goes here.</p></main></div>",
      output: `<div class="wrapper">\n  <header>\n    <h1>Title</h1>\n  </header>\n  <main>\n    <p>Content goes here.</p>\n  </main>\n</div>`
    },
    {
      title: "Minify HTML with Comment Removal",
      description: "Compress formatted HTML and strip out comments for production deployment.",
      input: `<div class="container">\n  <!-- Main header -->\n  <h1>Welcome</h1>\n</div>`,
      output: `<div class="container"><h1>Welcome</h1></div>`
    }
  ],
  
  faq: [
    {
      question: "Is my HTML code sent to a server?",
      answer: "No. All formatting, minification, and validation algorithms run entirely within your web browser using JavaScript. We do not store, track, or intercept any of the code you format, making this tool 100% secure for proprietary enterprise code."
    },
    {
      question: "Why is HTML formatting important for SEO?",
      answer: "While search engines can read minified HTML perfectly fine, clean and well-structured HTML is crucial for developers to maintain semantic markup. Using proper semantic tags (like <article>, <nav>, <main>) improves accessibility and helps search engine crawlers understand your page structure better."
    },
    {
      question: "What does HTML Minification do?",
      answer: "Minification is the process of aggressively removing unnecessary characters from source code without altering its functionality. Our minifier strips out tabs, spaces, line breaks, and optionally removes comments. This reduces the final file size, leading to faster download speeds, better Core Web Vitals, and improved mobile SEO rankings."
    },
    {
      question: "Can this tool find unclosed HTML tags?",
      answer: "Yes! Our HTML formatter includes a built-in tag validator. If you accidentally leave a <div> open or misplace a closing tag, the tool will instantly alert you with an amber warning banner, highlighting exactly which tag is causing the structural issue."
    },
    {
      question: "How do I remove inline CSS and JavaScript from my HTML?",
      answer: "Click the 'Advanced Options' button in the toolbar. From there, you can check 'Remove Scripts' and 'Remove Styles'. When you format the code, our engine will automatically strip out all <script> and <style> blocks, leaving you with pure, clean HTML markup."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "Diff Checker", slug: "diff-checker" }
  ]
};
