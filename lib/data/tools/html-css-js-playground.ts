import { ToolConfig } from './types';

export const htmlCssJsPlaygroundConfig: ToolConfig = {
  slug: "html-css-js-playground",
  title: "HTML / CSS / JavaScript Playground",
  shortDescription: "A powerful, browser-based online IDE to write, run, and share HTML, CSS, and JavaScript. Features real-time live preview, console debugging, and Monaco editor.",
  category: "Developer Tools",
  keywords: [
    "HTML editor", "CSS playground", "JavaScript playground", "online IDE", 
    "live code editor", "web development sandbox", "frontend playground", 
    "HTML CSS JS editor", "browser IDE", "coding sandbox", "run HTML online",
    "test javascript online", "interactive web playground",
    "free online html editor with live preview", "html css javascript playground online", "test javascript code online free"
  ],
  
  longDescription: `
In modern web development, having a fast, reliable, and feature-rich environment to quickly test out frontend code is absolutely essential. The **HTML / CSS / JavaScript Playground** is a professional-grade online IDE built to provide the exact same editing experience you expect from desktop editors like VS Code, directly in your browser. 

Whether you are a seasoned frontend engineer prototyping a complex React component, a designer experimenting with CSS Grid and Tailwind, or a student learning the fundamentals of web development, our playground provides a secure, sandboxed, and instantaneous development environment without the need to install a single piece of software.

### The Power of Monaco Editor
At the heart of this tool is the **Monaco Editor**—the exact same code editor that powers Microsoft's Visual Studio Code. This means you aren't just typing into a basic text box; you are getting a world-class coding experience. The editor supports advanced features such as:
- **IntelliSense and Auto-Completion:** Get smart suggestions for HTML tags, CSS properties, and JavaScript functions as you type.
- **Syntax Highlighting & Error Validation:** Spot missing brackets, syntax errors, or invalid properties instantly.
- **Code Formatting:** Automatically beautify and indent your code with a single shortcut (Ctrl+Shift+F).
- **Multi-Cursor Editing:** Edit multiple lines simultaneously for rapid refactoring.
- **Code Folding:** Collapse sections of HTML or massive JSON objects to keep your workspace clean.

### Real-Time Sandboxed Preview
Speed is critical when iterating on web design. As you type in the HTML, CSS, or JS panes, the preview window updates automatically in real-time. Our preview system operates inside a **secure, sandboxed iframe**. This ensures that any JavaScript you run is safely contained, preventing conflicts with the main application while still allowing you to execute complex logic, fetch external APIs, and manipulate the DOM just like you would on a real web server.

### Integrated Developer Console
Debugging JavaScript in an online playground can often be frustrating if you have to constantly open your browser's native developer tools. We have solved this by building an **integrated Console Panel**. 
- Any \`console.log()\`, \`console.warn()\`, or \`console.error()\` executed in your preview is mirrored directly into the playground UI.
- Uncaught runtime exceptions and syntax errors are caught and displayed clearly, allowing you to trace bugs back to the exact line of code.

### Responsive Design Testing
Building modern websites means ensuring your layout works flawlessly across all devices. Our playground features built-in **Device Preview Modes**. With a single click, you can resize the execution iframe to simulate Desktop, Laptop, Tablet, and Mobile resolutions, allowing you to perfect your CSS media queries in real-time.

### Flexible Layout Management
Every developer has their own preferred way of working. Our playground offers multiple layout configurations:
- **Vertical Split:** Code editors stacked on the left, with the live preview on the right (ideal for widescreen monitors).
- **Horizontal Split:** Code editors on top, preview on the bottom (great for laptops).
- **Focus Modes:** Maximize the code editor when writing complex logic, or maximize the preview window to see your final masterpiece in full screen.

### External Libraries and Frameworks
Modern frontend development rarely relies on vanilla HTML/CSS alone. Our playground allows you to effortlessly inject popular third-party libraries into your project with a single click. You can easily test out:
- **Tailwind CSS:** Rapidly prototype designs using the utility-first CSS framework via CDN.
- **Bootstrap:** Drop in classic UI components effortlessly.
- **Alpine.js, Vue, or React (via UMD):** Experiment with reactive data binding without spinning up a complex build step.
- **GSAP & Three.js:** Create stunning 3D experiences and complex animations.

### Auto-Save and Local Persistence
Never lose your work. The playground utilizes browser \`localStorage\` to automatically save your active session. If you accidentally close the tab or your browser crashes, simply reopen the tool, and your HTML, CSS, and JS code will be restored exactly as you left it. 

This playground is more than just a tool; it is a complete, lightweight, offline-capable development environment designed to supercharge your workflow.
  `,

  features: [
    "Powered by Monaco Editor (the engine behind VS Code)",
    "Real-time, instant iframe preview with sandbox security",
    "Separate dedicated editors for HTML, CSS, and JavaScript",
    "Integrated developer console for standard output and error logging",
    "Auto-save functionality via browser LocalStorage",
    "Support for external library injection (Tailwind, Bootstrap, etc.)",
    "Responsive device testing (Mobile, Tablet, Desktop viewports)",
    "Built-in code beautifier and formatter",
    "Flexible layouts (Vertical, Horizontal, Focus modes)",
    "Intelligent syntax highlighting, auto-completion, and linting",
    "100% Client-side execution (Fast, Private, and Secure)"
  ],

  useCases: [
    "Prototyping responsive web designs and CSS layouts quickly",
    "Debugging complex JavaScript algorithms or DOM manipulations",
    "Testing isolated frontend code snippets before pushing to production",
    "Learning web development through immediate, visual feedback",
    "Experimenting with new CSS features like Grid, Flexbox, or Subgrid",
    "Creating shareable code examples for tutorials, blogs, or forums",
    "Testing API endpoints using the Fetch API directly in the browser",
    "Building and testing animations with CSS keyframes or JS libraries",
    "Preparing code for technical interviews and coding assessments"
  ],

  howToSteps: [
    "Navigate to the HTML, CSS, or JS tabs to write your corresponding code.",
    "The code will automatically execute, and the 'Preview' panel will update in real-time.",
    "To view JavaScript output or debug errors, toggle the 'Console' panel located below or beside the preview.",
    "Use the top toolbar to switch between layout modes (Vertical or Horizontal) depending on your screen size.",
    "To test mobile responsiveness, click the 'Device' icon in the preview header to cycle through Mobile, Tablet, and Desktop resolutions.",
    "If your code gets messy, right-click inside any editor and select 'Format Document' or press 'Ctrl+Shift+F' to beautify it.",
    "Your work is auto-saved locally. Simply return to the page later to continue where you left off.",
    "Use the Settings menu to inject external libraries like Tailwind CSS or Bootstrap into your project."
  ],

  examples: [
    {
      title: "Interactive Button (Vanilla JS)",
      description: "A simple counter button demonstrating HTML structure, CSS styling, and JavaScript interactivity.",
      input: `<!-- HTML -->
<button id="counterBtn">Clicks: 0</button>

/* CSS */
button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.1s;
}
button:active { transform: scale(0.95); }

// JavaScript
let count = 0;
const btn = document.getElementById('counterBtn');
btn.addEventListener('click', () => {
  count++;
  btn.textContent = \`Clicks: \${count}\`;
  console.log('Button clicked! Current count:', count);
});`,
      output: "A blue button that increments its number on click and logs the count to the integrated console."
    },
    {
      title: "CSS Grid Layout",
      description: "Testing a responsive CSS grid layout without writing any JavaScript.",
      input: `<!-- HTML -->
<div class="grid">
  <div class="card">1</div>
  <div class="card">2</div>
  <div class="card">3</div>
</div>

/* CSS */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  padding: 16px;
}
.card {
  background: #10b981;
  color: white;
  padding: 32px;
  text-align: center;
  border-radius: 12px;
  font-size: 24px;
  font-family: sans-serif;
}`,
      output: "Three green cards arranged horizontally that automatically wrap to new rows as the viewport gets smaller."
    }
  ],

  faq: [
    {
      question: "What is an HTML playground?",
      answer: "An HTML playground is an interactive online code editor that allows you to write HTML, CSS, and JavaScript in your browser and instantly see the rendered output without needing to set up a local development environment or web server."
    },
    {
      question: "How do I run HTML online?",
      answer: "Simply type your HTML markup into the HTML editor panel in our playground. The live preview engine will automatically compile and render your code in real-time in the adjacent preview window."
    },
    {
      question: "Can I test CSS without installing software?",
      answer: "Yes! The playground includes a dedicated CSS editor. Any styles you write are instantly applied to the HTML in the preview panel, making it the perfect tool for testing layouts, colors, and animations."
    },
    {
      question: "Is JavaScript supported?",
      answer: "Absolutely. The playground features a full JavaScript execution environment. You can write complex logic, manipulate the DOM, and use modern ES6+ features."
    },
    {
      question: "Does it work on mobile devices?",
      answer: "Yes, the interface is fully responsive. While coding on a mobile keyboard can be challenging, the playground will adapt its layout to fit smaller screens, making it possible to tweak code on the go."
    },
    {
      question: "Is my code private?",
      answer: "Yes. The playground executes entirely client-side within your browser. We do not store your code on our servers, ensuring your experiments and projects remain completely private."
    },
    {
      question: "Can I save my projects?",
      answer: "Currently, your code is auto-saved to your browser's local storage. If you refresh or close the tab, your work will be restored automatically upon returning. Cloud saving is a planned future feature."
    },
    {
      question: "How does the live preview work?",
      answer: "The live preview creates a secure iframe in your browser. It dynamically combines your HTML, CSS, and JS into a single virtual document and renders it, allowing for instant updates without full page reloads."
    },
    {
      question: "Does the playground support Tailwind CSS?",
      answer: "Yes, you can easily inject Tailwind CSS into your playground session by enabling it in the settings or manually linking the Tailwind CDN in the HTML editor."
    },
    {
      question: "Does it support Bootstrap?",
      answer: "Yes, similar to Tailwind, you can link Bootstrap via CDN to quickly build responsive layouts using Bootstrap classes."
    },
    {
      question: "Can I learn coding here?",
      answer: "Definitely. Our playground is highly recommended for beginners. The immediate visual feedback makes it much easier to understand how HTML elements, CSS rules, and JS functions work together."
    },
    {
      question: "Is this tool free?",
      answer: "Yes, the HTML/CSS/JS Playground is 100% free to use."
    },
    {
      question: "How do I format my code?",
      answer: "You can format your code using the built-in Monaco editor formatter. Right-click in the editor and select 'Format Document', or use the keyboard shortcut (Ctrl+Shift+F on Windows, Cmd+Shift+F on Mac)."
    },
    {
      question: "How do I see JavaScript console logs?",
      answer: "We provide an integrated Developer Console. If you write 'console.log(\"Hello\")' in the JS editor, you will see 'Hello' output in the Console panel below the preview."
    },
    {
      question: "What happens if I write an infinite loop in JavaScript?",
      answer: "Because the code executes in real-time within your browser tab, an infinite loop can potentially freeze the preview iframe. We recommend disabling auto-run if you are writing complex loops, and manually running the code instead."
    },
    {
      question: "Can I use ES modules (import/export)?",
      answer: "By default, the JavaScript runs as a standard script. If you need to use ES modules, you would need to specify type=\"module\" in a script tag within the HTML editor directly, though CDN imports may be subject to CORS restrictions."
    },
    {
      question: "Does it support preprocessors like SASS or TypeScript?",
      answer: "Currently, the playground supports vanilla HTML, CSS, and JS. Preprocessor support is planned for future updates."
    },
    {
      question: "How secure is the execution environment?",
      answer: "The live preview runs inside a sandboxed iframe. This isolates the execution of your code from the main website, preventing malicious scripts from accessing your parent session data or local storage outside the sandbox."
    },
    {
      question: "Can I fetch data from external APIs?",
      answer: "Yes! You can use the native 'fetch()' API in the JavaScript editor to request data from public APIs. Note that the API must support CORS (Cross-Origin Resource Sharing) for the request to succeed in a browser environment."
    },
    {
      question: "Is there a dark mode?",
      answer: "Yes, the playground respects your system or platform-level theme settings. The Monaco editor will automatically switch to a sleek dark theme to reduce eye strain during late-night coding sessions."
    },
    {
      question: "Can I use multiple cursors like in VS Code?",
      answer: "Yes! Because the playground is powered by the Monaco Editor, you can use standard VS Code shortcuts. Hold Alt (or Option) and click to place multiple cursors, or use Ctrl+D to select multiple instances of the same word."
    },
    {
      question: "Can I collapse large sections of code?",
      answer: "Yes, code folding is fully supported. You will see small arrows next to line numbers for block-level elements or functions, allowing you to collapse them for easier reading."
    },
    {
      question: "Why isn't my preview updating?",
      answer: "Ensure that auto-run is enabled, or try clicking the 'Refresh' button manually. Also, check the Console for any JavaScript syntax errors that might be halting execution."
    },
    {
      question: "Can I test how my site looks on an iPhone?",
      answer: "Yes, you can use the viewport resizing tool in the preview toolbar. Selecting the 'Mobile' option will resize the iframe to simulate the width of a standard mobile device."
    },
    {
      question: "Does it have auto-complete?",
      answer: "Yes, the editor provides intelligent auto-completion for HTML tags, CSS properties, and standard JavaScript APIs, drastically speeding up your workflow."
    },
    {
      question: "Can I export my code?",
      answer: "Yes, you can manually copy the code from each editor, or use the 'Export' feature (if enabled) to download a ZIP file containing your index.html, styles.css, and script.js files."
    },
    {
      question: "Can I share my code with others?",
      answer: "Currently, you would need to copy and paste your code to share it. In the future, we will support generating shareable URLs that encode your project data."
    },
    {
      question: "What is the difference between this and CodePen?",
      answer: "This playground offers a streamlined, locally-focused experience. It boots instantly, saves locally without requiring an account, and utilizes the powerful Monaco Editor for a true desktop IDE feel."
    },
    {
      question: "Can I use LocalStorage inside the preview?",
      answer: "Yes, the sandboxed iframe has its own localized storage. Keep in mind that this storage is ephemeral and specific to the sandbox origin, so it won't persist across different playground sessions."
    },
    {
      question: "Does it support keyboard shortcuts?",
      answer: "Yes, it supports all standard VS Code shortcuts, such as Ctrl+Z (Undo), Ctrl+Y (Redo), Ctrl+F (Find), and Ctrl+/ (Toggle Comment)."
    }
  ],

  relatedTools: [
    { name: "HTML Formatter", slug: "html-formatter" },
    { name: "CSS Beautifier", slug: "css-beautifier" },
    { name: "JS Beautifier", slug: "js-beautifier" },
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "CSS Shadow Generator", slug: "css-shadow-generator" },
    { name: "Gradient Generator", slug: "gradient-generator" },
    { name: "Responsive Screen Tester", slug: "responsive-screen-tester" }
  ]
};
