import { ToolConfig } from './types';

export const markdownPreviewerConfig: ToolConfig = {
  slug: "markdown-previewer",
  title: "Markdown Previewer & Editor",
  shortDescription: "Write and preview Markdown in real-time with a professional split-screen editor. Supports GitHub Flavored Markdown, syntax highlighting, table of contents, export to HTML/PDF/MD, and live statistics — 100% free and client-side.",
  category: "Text & Formatting",
  keywords: [
    "markdown previewer", "markdown editor", "markdown live preview", "markdown to html",
    "github flavored markdown", "gfm editor", "markdown renderer", "markdown viewer",
    "markdown syntax highlighter", "online markdown editor", "markdown tool",
    "markdown export html", "markdown export pdf", "markdown table of contents",
    "markdown code highlighting", "free markdown editor", "markdown preview online",
    "markdown beautifier", "markdown converter", "markdown writer", "readme editor",
    "markdown cheat sheet", "markdown table generator", "markdown list generator",
    "markdown to pdf", "markdown preview tool", "wysiwyg markdown", "md editor online"
  ],

  longDescription: `
Markdown is a lightweight markup language that lets you format text using simple, readable syntax. Our **Markdown Previewer & Editor** provides a professional-grade writing environment with real-time preview, making it the ideal tool for developers, writers, and content creators who need instant visual feedback while composing documents.

### What is Markdown?

Markdown was created by John Gruber in 2004 as a way to write formatted text that remains readable in its raw form. Today, it is the universal standard for documentation on GitHub, GitLab, Bitbucket, Stack Overflow, Reddit, Discord, and countless other platforms. It uses intuitive characters like \`#\`, \`*\`, \`-\`, and \`>\` to create headings, bold text, lists, blockquotes, and more.

Unlike rich text editors such as Microsoft Word or Google Docs, Markdown separates content from presentation. You write in plain text with simple formatting markers, and a Markdown parser converts it to clean, semantic HTML. This approach offers portability, version-control friendliness, and long-term durability that proprietary formats cannot match.

### What is a Markdown Previewer?

A Markdown Previewer is a specialized tool that renders your raw Markdown text into fully formatted HTML in real-time. As you type Markdown syntax in the editor panel, the preview panel instantly shows you how the final document will look — complete with headings, tables, code blocks, task lists, images, and hyperlinks.

Our previewer goes beyond basic rendering by offering a **professional Monaco code editor** with syntax highlighting, line numbers, auto-indentation, and bracket matching — the same editor engine that powers Visual Studio Code. This ensures a seamless writing experience whether you're drafting a quick README or composing a 10,000-word technical guide.

### Benefits of Markdown

Markdown offers significant advantages over traditional word processors and rich text editors:

- **Platform Independence**: Markdown files (.md) are plain text. They open on any operating system, any text editor, and any device — no proprietary software required.
- **Version Control Friendly**: Because Markdown is plain text, it works perfectly with Git and other version control systems. You can track every change, diff between versions, and merge contributions seamlessly.
- **Clean Semantic HTML**: Markdown produces well-structured, semantic HTML output. This is ideal for web publishing, CMS integration, and search engine optimization.
- **Focus on Content**: Without complex toolbars and formatting palettes, you can concentrate on writing. Markdown's minimalist syntax keeps you in the flow.
- **Tiny File Sizes**: Markdown documents are orders of magnitude smaller than Word documents or PDFs, making them fast to load, easy to share, and economical to store.
- **Future-Proof**: Plain text will be readable in 50 years. Proprietary binary formats may not be.

### GitHub Flavored Markdown (GFM)

This editor fully supports **GitHub Flavored Markdown (GFM)**, which extends standard Markdown with powerful features that developers and teams rely on every day:

- **Task Lists**: Create interactive checklists with \`- [x]\` and \`- [ ]\` syntax, perfect for project tracking, pull request descriptions, and to-do lists.
- **Tables**: Build structured data tables using pipe characters (\`|\`) and hyphens (\`-\`), with alignment control for each column.
- **Strikethrough**: Mark text as deleted or deprecated with \`~~double tildes~~\`.
- **Autolinked URLs**: Paste a URL and it automatically becomes a clickable hyperlink.
- **Fenced Code Blocks**: Wrap code in triple backticks with an optional language identifier for beautiful syntax highlighting across 30+ programming languages.
- **Emoji Support**: Express yourself with emoji shortcodes recognized across GitHub, GitLab, and other platforms.

### Markdown Syntax Quick Reference

Here is a comprehensive reference for the most commonly used Markdown syntax elements:

**Text Formatting:**
- \`# Heading 1\` through \`###### Heading 6\` — six levels of headings
- \`**bold text**\` — strong emphasis
- \`*italic text*\` — emphasis
- \`~~strikethrough~~\` — deleted text
- \`\\\`inline code\\\`\` — code within a paragraph

**Lists:**
- \`- item\` or \`* item\` — unordered (bullet) lists
- \`1. item\` — ordered (numbered) lists
- \`- [x] done\` / \`- [ ] todo\` — task lists with checkboxes
- Indent with 2 or 4 spaces for nested lists

**Links and Images:**
- \`[link text](https://example.com)\` — hyperlinks
- \`![alt text](image-url.jpg)\` — images
- \`[text](url "title")\` — links with hover titles

**Code:**
- Inline code: surround with single backticks
- Code blocks: surround with triple backticks, optionally specify language
- Supported languages: JavaScript, TypeScript, Python, HTML, CSS, JSON, Bash, Java, C++, Ruby, Go, Rust, SQL, YAML, and more

**Other Elements:**
- \`> blockquote\` — quoted text with a vertical bar
- \`---\` — horizontal rule (thematic break)
- \`| col | col |\` — tables with pipe syntax

### Common Markdown Mistakes to Avoid

1. **Forgetting blank lines before lists**: Markdown requires a blank line before the first list item to properly render a list.
2. **Missing space after heading markers**: \`#Heading\` won't render — you need \`# Heading\` (note the space).
3. **Inconsistent indentation in nested lists**: Use exactly 2 or 4 spaces for each nesting level.
4. **Not escaping special characters**: Use a backslash (\`\\\\\`) before characters like \`*\`, \`_\`, \`#\` when you want them to display literally.
5. **Breaking table alignment**: Every row in a table must have the same number of pipe separators as the header row.

### Who Uses Markdown?

Markdown is used by millions of people across every industry:

- **Software Developers**: README files, API documentation, code comments, commit messages, issue descriptions, and pull request templates.
- **Technical Writers**: Product documentation, user guides, knowledge bases, and release notes.
- **Bloggers & Content Creators**: Blog posts, newsletters, and articles for static site generators like Jekyll, Hugo, Gatsby, and Next.js.
- **Students & Academics**: Lecture notes, research papers, and lab reports with LaTeX-compatible Markdown extensions.
- **Project Managers**: Sprint planning documents, meeting notes, and status reports with task lists and tables.

### 100% Client-Side and Secure

Privacy is paramount when working with sensitive documentation, internal knowledge bases, or proprietary content. Our Markdown Previewer processes everything directly within your web browser using JavaScript. Your text is never transmitted to, processed by, or stored on any external server. The auto-save feature uses your browser's localStorage, so your drafts remain on your device and persist between sessions. You get instant, private Markdown editing with zero latency and zero data exposure.
  `,

  features: [
    "Real-time split-screen Markdown preview with instant rendering",
    "Monaco Editor with Markdown syntax highlighting, line numbers, and bracket matching",
    "Full GitHub Flavored Markdown (GFM) support including tables, task lists, and strikethrough",
    "Syntax-highlighted code blocks for JavaScript, TypeScript, Python, HTML, CSS, JSON, Bash, and more",
    "Smart toolbar that inserts Markdown syntax at cursor position with selection wrapping",
    "Export to Markdown (.md), clean HTML, and PDF formats with one click",
    "File upload and drag-and-drop import for .md, .markdown, and .txt files",
    "Multiple view modes: Split View, Editor Only, Preview Only",
    "Live document statistics: word count, character count, line count, heading count, estimated reading time",
    "Auto-generated clickable Table of Contents from document headings",
    "Auto-save to localStorage with seamless session restore",
    "Copy raw Markdown or rendered HTML to clipboard with visual feedback",
    "Adjustable editor font size for comfortable reading and writing",
    "Dark mode and light mode with automatic theme detection",
    "Keyboard accessible with full ARIA labels for screen readers",
    "Copy-code button on every code block in the preview",
    "Drag-and-drop file support — drop a .md file directly onto the editor",
    "100% client-side processing — your content never leaves your browser"
  ],

  useCases: [
    "Writing README files for GitHub, GitLab, and Bitbucket repositories",
    "Drafting blog posts and articles for static site generators (Jekyll, Hugo, Gatsby, Next.js)",
    "Previewing Markdown before committing to version control",
    "Creating formatted notes, meeting minutes, and project documentation",
    "Converting Markdown to clean, semantic HTML for web publishing",
    "Generating PDF documents from Markdown content for sharing or printing",
    "Learning Markdown syntax with instant visual feedback",
    "Editing documentation for REST APIs, SDKs, and developer tools",
    "Composing newsletters, changelogs, and release notes in Markdown",
    "Building knowledge bases and internal wikis with structured Markdown"
  ],

  howToSteps: [
    "Type or paste Markdown into the editor panel on the left. A sample document is loaded by default to help you get started.",
    "See the rendered preview instantly in the right panel — headings, bold, italic, code blocks, tables, and images render in real-time.",
    "Use the toolbar buttons to quickly insert Markdown syntax. Select text first to wrap it with bold, italic, link, or code formatting.",
    "Switch between Split View, Editor Only, or Preview Only using the view mode toggle in the toolbar.",
    "Check live document statistics in the stats bar: word count, character count, line count, heading count, and estimated reading time.",
    "Click the Table of Contents button to generate a navigable outline from your document's headings.",
    "Export your document as a .md file, a self-contained HTML file, or a PDF using the export dropdown.",
    "Copy the raw Markdown or the rendered HTML to your clipboard using the copy buttons.",
    "Your work is automatically saved to your browser's local storage — close the tab and pick up where you left off anytime."
  ],

  examples: [
    {
      title: "Basic Markdown Formatting",
      description: "Common Markdown syntax and their rendered output.",
      input: "# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item one\n- Item two\n\n```js\nconsole.log('Hello!');\n```",
      output: "<h1>Hello World</h1><p>This is <strong>bold</strong> and <em>italic</em> text.</p><ul><li>Item one</li><li>Item two</li></ul><pre><code>console.log('Hello!');</code></pre>"
    },
    {
      title: "GFM Table",
      description: "Creating tables with GitHub Flavored Markdown.",
      input: "| Feature | Status |\n|---------|--------|\n| Tables  | ✅     |\n| Tasks   | ✅     |",
      output: "<table><thead><tr><th>Feature</th><th>Status</th></tr></thead><tbody><tr><td>Tables</td><td>✅</td></tr><tr><td>Tasks</td><td>✅</td></tr></tbody></table>"
    },
    {
      title: "Task List",
      description: "Interactive checkboxes for project tracking.",
      input: "## Sprint Tasks\n\n- [x] Set up project\n- [x] Write tests\n- [ ] Deploy to production",
      output: "<h2>Sprint Tasks</h2><ul><li><input type=\"checkbox\" checked disabled> Set up project</li><li><input type=\"checkbox\" checked disabled> Write tests</li><li><input type=\"checkbox\" disabled> Deploy to production</li></ul>"
    }
  ],

  faq: [
    {
      question: "What is Markdown?",
      answer: "Markdown is a lightweight markup language created by John Gruber in 2004. It allows you to format text using simple, readable syntax that can be converted to HTML. It's the standard for documentation on GitHub, GitLab, Stack Overflow, and many other platforms. Common syntax includes # for headings, ** for bold, * for italic, and - for lists."
    },
    {
      question: "How does Markdown Previewer work?",
      answer: "The Markdown Previewer parses your raw Markdown text in real-time using a client-side Markdown parser (react-markdown with remark-gfm) and renders it as formatted HTML in the preview panel. Changes appear instantly as you type. The editor uses Monaco Editor (the same engine as VS Code) for professional-grade syntax highlighting and editing features."
    },
    {
      question: "Is this Markdown tool free?",
      answer: "Yes, this Markdown Previewer is completely free to use with no registration, no account, and no usage limits. It runs entirely in your browser with no server-side processing. You can use it as many times as you want for personal, educational, or commercial purposes."
    },
    {
      question: "Can I export Markdown to HTML?",
      answer: "Yes. You can export your Markdown document in three formats: as a raw .md Markdown file, as a self-contained HTML file with embedded styles, or as a PDF document. Simply click the export dropdown button in the toolbar and choose your preferred format."
    },
    {
      question: "Is my Markdown processed locally?",
      answer: "Yes, all Markdown parsing, rendering, and storage happens entirely in your browser using client-side JavaScript. Your content is never sent to any server. The auto-save feature uses your browser's localStorage, so your drafts stay on your device. This ensures complete privacy and security for sensitive documents."
    },
    {
      question: "What is GitHub Flavored Markdown (GFM)?",
      answer: "GitHub Flavored Markdown (GFM) is an extension of standard Markdown used by GitHub. It adds support for tables, task lists (checkboxes), strikethrough text, fenced code blocks with syntax highlighting, and autolinked URLs. Our editor fully supports all GFM features."
    },
    {
      question: "What programming languages are supported for code highlighting?",
      answer: "Our Markdown Previewer supports syntax highlighting for JavaScript, TypeScript, Python, HTML, CSS, JSON, Bash/Shell, Java, C/C++, Ruby, Go, Rust, SQL, YAML, PHP, and many more languages. Simply specify the language after the opening triple backticks in a fenced code block."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes. Once the page is loaded in your browser, the Markdown Previewer works fully offline. All parsing and rendering happens client-side with no internet connection required. Your auto-saved drafts also persist locally in your browser."
    },
    {
      question: "How do I create a table in Markdown?",
      answer: "Use the pipe character (|) to separate columns and hyphens (-) for the header divider. For example: | Column 1 | Column 2 | followed by |----------|----------| and then your data rows. You can also click the Table button in the toolbar to insert a table template automatically."
    },
    {
      question: "Does this editor support images?",
      answer: "Yes. You can add images using the Markdown image syntax: ![alt text](image-url). Images are rendered in the preview panel with lazy loading and responsive sizing. Click the Image button in the toolbar to insert the image syntax at your cursor position."
    }
  ],

  relatedTools: [
    { name: "HTML Formatter", slug: "html-formatter" },
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "XML Formatter", slug: "xml-formatter" },
    { name: "CSS Beautifier", slug: "css-beautifier" },
    { name: "JavaScript Beautifier", slug: "js-beautifier" },
    { name: "Diff Checker", slug: "diff-checker" }
  ]
};
