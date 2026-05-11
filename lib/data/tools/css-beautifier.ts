import { ToolConfig } from './types';

export const cssBeautifierConfig: ToolConfig = {
  slug: "css-beautifier",
  title: "CSS Beautifier & Formatter",
  shortDescription: "Format, beautify, and minify your CSS code instantly. Transform minified stylesheets into clean, readable code with smart indentation, syntax validation, and modern CSS support.",
  category: "Text & Formatting",
  keywords: [
    "css beautifier", "css formatter", "format css", "beautify css", "minify css",
    "css prettifier", "css indenter", "css cleaner", "css code formatter",
    "online css formatter", "css pretty print", "css minifier", "css optimizer",
    "css validator", "format stylesheet", "clean css code", "css lint",
    "tailwind css formatter", "scss formatter", "css variables formatter"
  ],

  longDescription: `
Working with CSS in modern web development often means dealing with minified production bundles, deeply nested media queries, and complex custom property hierarchies. Our **CSS Beautifier & Formatter** is a professional-grade tool built for developers who need to quickly transform unreadable, minified CSS into a clean, properly structured stylesheet.

### Why CSS Formatting Matters
Unformatted CSS is a productivity killer. When stylesheets lose their indentation — whether from build tools, copy-pasting from browser DevTools, or receiving compressed API payloads — it becomes nearly impossible to trace selector specificity, debug cascading issues, or identify redundant declarations. A reliable CSS Formatter reconstructs the logical hierarchy of your rules so you can instantly see parent-child relationships between selectors, media queries, and nested at-rules.

### Modern CSS Support
Our formatter is built for 2024+ CSS. It gracefully handles **CSS Custom Properties** (\`--variable\` declarations), **CSS Nesting** (the native \`&\` selector), **Container Queries** (\`@container\`), **CSS Layers** (\`@layer\`), \`@supports\` blocks, \`@keyframes\` animations, and complex \`@media\` queries with nested conditions. Whether you're writing vanilla CSS, utility-first frameworks like Tailwind CSS, or preprocessor output from Sass and Less, this tool formats it correctly.

### CSS Minification for Production
Beyond beautification, our tool includes an aggressive **CSS Minifier**. Minification strips every unnecessary byte from your stylesheets — whitespace, comments, trailing semicolons, and redundant syntax — producing the smallest possible file for production deployment. Smaller CSS files mean faster First Contentful Paint (FCP), better Largest Contentful Paint (LCP) scores, and a direct improvement to your Core Web Vitals and search engine rankings.

### Privacy-First & Blazing Fast
Every character of your CSS is processed entirely within your browser using client-side JavaScript. We do not store, track, or transmit your code to any server. This makes our CSS Beautifier 100% safe for proprietary enterprise stylesheets, design system tokens, and confidential client projects.
  `,

  features: [
    "Instant CSS beautification with configurable indentation (2, 3, or 4 spaces, or tabs)",
    "Production-ready CSS Minifier to compress stylesheets and boost page speed",
    "Full support for modern CSS: Custom Properties, Nesting, Container Queries, Layers",
    "Real-time syntax highlighting with CSS-specific color coding for selectors, properties, and values",
    "Smart bracket matching and validation to catch unclosed blocks instantly",
    "Auto-detect minified CSS and prompt for formatting on paste",
    "Format-on-paste for instant beautification when pasting compressed code",
    "Side-by-side editor layout with synchronized scrolling",
    "Copy, download, and upload workflows for seamless integration into your dev pipeline",
    "Dark mode support that adapts to your system or app theme preference",
    "100% client-side processing for absolute data privacy and security",
    "Keyboard shortcuts (Ctrl+Enter to format, Ctrl+Shift+M to minify)"
  ],

  useCases: [
    "Formatting minified CSS files downloaded from production websites using browser DevTools",
    "Cleaning up auto-generated stylesheets from CSS-in-JS libraries, Tailwind JIT, or PostCSS pipelines",
    "Debugging complex specificity conflicts by revealing the full selector hierarchy",
    "Preparing CSS code for team code reviews by enforcing consistent indentation standards",
    "Minifying hand-written CSS before deploying to production to reduce bundle size",
    "Formatting vendor CSS libraries to understand their internal structure and override patterns",
    "Quickly beautifying CSS snippets pasted from Stack Overflow, documentation, or AI code assistants"
  ],

  howToSteps: [
    "Paste your raw, messy, or minified CSS into the 'Input CSS' editor on the left. You can also click 'Upload' to load a .css file directly from disk.",
    "Select your preferred indentation style — 2, 3, or 4 spaces, or tabs — from the dropdown in the toolbar.",
    "Click the 'Beautify' button to format your CSS, or click 'Minify' to compress it for production.",
    "Review the 'Output' panel on the right showing your perfectly formatted CSS with syntax highlighting.",
    "Use the 'Copy' button to copy the result to your clipboard, or 'Download' to save it as a .css file.",
    "Toggle 'Word Wrap' to control how long lines are displayed. Toggle dark mode for comfortable viewing.",
    "Use the keyboard shortcut Ctrl+Enter (or Cmd+Enter) to instantly format without clicking."
  ],

  examples: [
    {
      title: "Beautify Minified CSS",
      description: "Transform a single-line minified stylesheet into a clean, indented structure.",
      input: "body{margin:0;padding:0;font-family:sans-serif}.container{max-width:1200px;margin:0 auto;padding:0 16px}@media(max-width:768px){.container{padding:0 8px}}.btn{display:inline-flex;align-items:center;padding:8px 16px;border-radius:6px;font-weight:600;transition:all .2s ease}",
      output: `body {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 16px;\n}\n\n@media (max-width: 768px) {\n  .container {\n    padding: 0 8px;\n  }\n}\n\n.btn {\n  display: inline-flex;\n  align-items: center;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-weight: 600;\n  transition: all .2s ease;\n}`
    },
    {
      title: "Format CSS Custom Properties",
      description: "Beautify a design system's CSS variable declarations with proper nesting.",
      input: ":root{--color-primary:#518231;--color-secondary:#3b82f6;--spacing-sm:8px;--spacing-md:16px;--radius-lg:12px}.dark{--color-primary:#6ba340;--color-secondary:#60a5fa}",
      output: `:root {\n  --color-primary: #518231;\n  --color-secondary: #3b82f6;\n  --spacing-sm: 8px;\n  --spacing-md: 16px;\n  --radius-lg: 12px;\n}\n\n.dark {\n  --color-primary: #6ba340;\n  --color-secondary: #60a5fa;\n}`
    }
  ],

  faq: [
    {
      question: "Is my CSS code sent to any server?",
      answer: "No. All formatting, minification, and validation algorithms run entirely within your web browser using JavaScript. We do not store, track, or intercept any of the code you format, making this tool 100% secure for proprietary stylesheets and design system tokens."
    },
    {
      question: "Does the CSS Beautifier support modern CSS features?",
      answer: "Yes. Our formatter fully supports CSS Custom Properties (--variables), CSS Nesting (& selector), @container queries, @layer declarations, @supports blocks, @keyframes animations, and complex nested @media queries. It is built for 2024+ CSS standards."
    },
    {
      question: "What is the difference between beautifying and minifying CSS?",
      answer: "Beautifying (formatting) adds indentation, line breaks, and spacing to make your CSS human-readable and easy to debug. Minifying does the opposite — it strips all unnecessary whitespace, comments, and formatting to produce the smallest possible file for production deployment, which directly improves page load speed and Core Web Vitals."
    },
    {
      question: "Can I use this tool with Tailwind CSS or SCSS output?",
      answer: "Absolutely. Our CSS Beautifier works with any valid CSS syntax, including output generated by Tailwind CSS JIT, PostCSS, Sass/SCSS compilers, Less, and CSS-in-JS libraries like styled-components or Emotion. It formats the compiled CSS output regardless of the preprocessor used."
    },
    {
      question: "What keyboard shortcuts are supported?",
      answer: "Press Ctrl+Enter (or Cmd+Enter on Mac) to instantly format your CSS. Press Ctrl+Shift+M to minify. These shortcuts work when the input editor is focused, allowing you to format code without reaching for the mouse."
    },
    {
      question: "Does this tool validate my CSS for errors?",
      answer: "Yes. The formatter includes basic structural validation that detects unclosed brackets, mismatched braces, and malformed at-rules. If an issue is found, an amber warning banner will appear above the output, pinpointing the structural problem."
    }
  ],

  relatedTools: [
    { name: "HTML Formatter", slug: "html-formatter" },
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "Diff Checker", slug: "diff-checker" }
  ]
};
