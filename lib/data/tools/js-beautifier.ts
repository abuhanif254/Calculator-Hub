import { ToolConfig } from './types';

export const jsBeautifierConfig: ToolConfig = {
  slug: "js-beautifier",
  title: "JavaScript Beautifier & Formatter",
  shortDescription: "Format, beautify, and minify your JavaScript, TypeScript, and JSX code instantly. Clean up minified scripts, detect syntax errors, and normalize indentation with our fast client-side formatter.",
  category: "Text & Formatting",
  keywords: [
    "javascript beautifier", "js formatter", "format javascript", "beautify js", "minify js",
    "javascript code formatter", "typescript formatter", "jsx formatter", "es6 formatter",
    "online js formatter", "js indenter", "js minifier", "javascript optimizer",
    "format tsx", "clean javascript code", "js lint", "react jsx formatter"
  ],

  longDescription: `
Working with raw, unformatted JavaScript is a nightmare for debugging and code reviews. Whether you are dealing with a minified production bundle, extracting an inline script from a webpage, or cleaning up hastily written code, our **JavaScript Beautifier & Formatter** restores readability instantly. 

### Why Use a JS Formatter?
When JavaScript loses its indentation and line breaks, it becomes practically impossible to trace execution flow, understand scope chains, or debug asynchronous callbacks. A reliable JS Formatter reconstructs the logical structure of your code. It adds appropriate spacing around operators, properly indents nested loops and conditional statements, and aligns brackets so you can instantly identify syntax errors or logic flaws.

### Full ES6+, TypeScript, and JSX Support
Modern web development isn't just vanilla JavaScript. Our formatter is built to handle the complexities of modern frontend and backend development. It seamlessly supports **ES6+ features** (like arrow functions, destructuring, and async/await), **TypeScript** type definitions and interfaces, and **React JSX/TSX** syntax. No matter what framework you use—React, Vue, Node.js, or Angular—this tool will format your logic correctly.

### Production-Ready JS Minification
Beyond making code pretty, this tool includes a powerful **JavaScript Minifier**. Minification is the process of safely stripping out all unnecessary whitespace, line breaks, and comments from your source code without altering its behavior. Minifying your JS files before deployment reduces bundle size, accelerates parsing time, and significantly improves your website's performance and Core Web Vitals.

### Secure, Private, and Blazing Fast
All formatting, parsing, and minification processes happen locally in your browser. Your proprietary algorithms, sensitive API keys, and business logic are never uploaded to any server. This ensures 100% absolute data privacy, making this the perfect tool for enterprise developers and security-conscious engineers.
  `,

  features: [
    "Instant JavaScript beautification with custom indentation (2, 3, 4 spaces, or tabs)",
    "Production-ready JS Minifier to compress code for faster browser execution",
    "Full support for modern ES6+, TypeScript (.ts), and React JSX/TSX syntax",
    "Real-time syntax highlighting for variables, keywords, strings, and functions",
    "Format-on-paste support for frictionless developer workflows",
    "Smart detection and highlighting of unbalanced braces and syntax errors",
    "Side-by-side editor layout with synchronized scrolling and line numbering",
    "Copy, download, and file upload integrations to streamline your pipeline",
    "Dark mode support for reduced eye strain during late-night coding sessions",
    "Keyboard shortcuts support (Ctrl+Enter to format, Ctrl+Shift+M to minify)",
    "100% Client-side processing ensuring strict code privacy and security"
  ],

  useCases: [
    "De-minifying production JavaScript files to trace bugs and performance bottlenecks",
    "Formatting complex React components (JSX/TSX) to enforce clean component structure",
    "Standardizing indentation and spacing for team code reviews",
    "Minifying raw JavaScript functions before embedding them inline in HTML files",
    "Cleaning up messy JSON payloads and configuration objects inside JS files",
    "Formatting poorly structured callback hell or deep async/await chains for readability"
  ],

  howToSteps: [
    "Paste your raw, minified, or messy JavaScript into the 'Input JS' editor on the left. You can also click 'Upload' to load a file.",
    "Select your preferred indentation style (2, 3, 4 spaces, or tabs) from the dropdown in the toolbar.",
    "Click the 'Beautify' button to format your code into a clean, readable structure.",
    "Alternatively, click the 'Minify' button to compress the code for production deployment.",
    "Review your perfectly formatted or minified code in the 'Output' panel on the right.",
    "Use the 'Compare' button to see a line-by-line diff of what changed during formatting.",
    "Click 'Copy' or 'Download' to save the resulting code back to your project."
  ],

  examples: [
    {
      title: "Beautify Minified ES6",
      description: "Convert an unreadable, single-line arrow function with destructuring into clean code.",
      input: "const fetchUser=async({id,token})=>{try{const res=await fetch(\`/api/users/\${id}\`,{headers:{Authorization:\`Bearer \${token}\`}});if(!res.ok)throw new Error('Failed');return await res.json()}catch(e){console.error(e);return null}};",
      output: `const fetchUser = async ({ id, token }) => {\n  try {\n    const res = await fetch(\`/api/users/\${id}\`, {\n      headers: {\n        Authorization: \`Bearer \${token}\`\n      }\n    });\n    if (!res.ok) throw new Error('Failed');\n    return await res.json()\n  } catch (e) {\n    console.error(e);\n    return null\n  }\n};`
    },
    {
      title: "Format React JSX",
      description: "Beautify a messy React component with inline props and nested elements.",
      input: "function Button({text,onClick}){return(<button className=\"btn btn-primary\" onClick={onClick} disabled={!text}><span>{text}</span></button>)}",
      output: `function Button({ text, onClick }) {\n  return (\n    <button \n      className="btn btn-primary" \n      onClick={onClick} \n      disabled={!text}\n    >\n      <span>{text}</span>\n    </button>\n  )\n}`
    }
  ],

  faq: [
    {
      question: "Is my JavaScript code uploaded to a server?",
      answer: "No. All formatting, minification, and validation are executed entirely within your web browser using JavaScript. We do not store, track, or intercept any of the code you format. This tool is 100% secure for proprietary enterprise source code."
    },
    {
      question: "Does the JS Beautifier support TypeScript and JSX?",
      answer: "Yes! Our formatter is designed for modern web development. It gracefully handles TypeScript type definitions, interfaces, decorators, and React JSX/TSX tags without breaking the syntax."
    },
    {
      question: "What is the difference between Beautifying and Minifying JS?",
      answer: "Beautifying (or formatting) adds spaces, line breaks, and indentation to make the code human-readable and easy to debug. Minifying does the exact opposite—it removes all unnecessary whitespace and comments to make the file size as small as possible for faster browser downloading and parsing."
    },
    {
      question: "Can I use keyboard shortcuts?",
      answer: "Yes. While focused on the tool, you can press Ctrl+Enter (or Cmd+Enter on Mac) to instantly beautify your code, and Ctrl+Shift+M to minify it."
    },
    {
      question: "Does it preserve my code comments?",
      answer: "Yes, when beautifying, your single-line (//) and multi-line (/* */) comments are preserved and properly indented alongside your code. When minifying, comments are completely stripped out to save space."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "HTML Formatter", slug: "html-formatter" },
    { name: "CSS Beautifier", slug: "css-beautifier" },
    { name: "Diff Checker", slug: "diff-checker" }
  ]
};
