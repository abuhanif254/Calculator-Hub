---
metaTitle: "Markdown Previewer & Live GFM Editor Online | Free Tool"
metaDescription: "Write and preview GitHub Flavored Markdown live in a split-screen Monaco editor. Export clean HTML, PDF, or .md files with 100% browser privacy."
metaKeywords: "markdown previewer, markdown editor, markdown live preview, markdown to html, github flavored markdown, gfm editor, markdown renderer, markdown viewer, markdown syntax highlighter, online markdown editor, markdown tool, markdown export html"
title: "Markdown Previewer & Editor"
shortDescription: "Write and preview GitHub Flavored Markdown in real time inside a split-screen Monaco editor. Supports syntax highlighting, interactive table of contents, live statistics, and HTML, PDF, or .md export locally in your browser."
faqs:
  - question: "Which Markdown specification does the live previewer follow?"
    answer: "The preview renderer parses CommonMark extended with GitHub Flavored Markdown (GFM) through remark-gfm, supporting pipe tables, task list checkboxes, strikethrough, and bare URL autolinks alongside fenced code block syntax highlighting via Highlight.js."
  - question: "Does the editor allow raw inline HTML elements inside Markdown documents?"
    answer: "Yes. The preview pipeline includes rehype-raw so inline HTML such as <details>, <kbd>, custom badges, or aligned <img> tags renders natively. Because raw HTML executes in the preview DOM, avoid pasting untrusted third-party scripts."
  - question: "How does automatic draft recovery work if I close my browser tab?"
    answer: "Every edit is debounced for 800 milliseconds and persisted locally to your browser's localStorage under a client-only key. Your document restores automatically on reload without ever syncing to a remote server."
  - question: "What is the difference between copying rendered HTML and downloading an HTML file?"
    answer: "Copying rendered HTML places the bare body fragment from the preview container onto your clipboard so you can paste it into a CMS or email template. Downloading HTML wraps that fragment in a standalone UTF-8 HTML5 document with clean embedded typography and table styles."
  - question: "How are multi-page PDF exports generated from long Markdown files?"
    answer: "PDF export runs entirely in your browser by rasterizing the rendered preview panel at 2x resolution via html2canvas and slicing the output into paginated A4 portrait pages using jsPDF."
features:
  - "Monaco Editor engine with cursor-aware toolbar insertion, bracket pair colorization, line numbers, word wrap, and adjustable 10px to 24px font scaling"
  - "GitHub Flavored Markdown rendering supporting pipe tables, task lists, strikethrough, autolinks, and inline HTML passthrough"
  - "Automatic fenced code block syntax highlighting with one-click per-block code copy buttons"
  - "Toggleable interactive Table of Contents extracted from H1 through H6 headings with smooth anchor scrolling"
  - "Real-time telemetry bar tracking word count, character count, line count, heading count, and estimated reading time at 200 words per minute"
  - "Local file drag-and-drop for .md, .markdown, and .txt files plus instant export to .md, styled standalone .html, and paginated A4 .pdf"
useCases:
  - "Drafting and reviewing GitHub README.md files, CHANGELOG entries, and pull request templates before committing to Git"
  - "Authoring technical RFCs, architecture decision records, and API usage guides with syntax-highlighted code snippets"
  - "Converting Markdown drafts into clean, styled HTML snippets for static site generators, headless CMS editors, or newsletters"
  - "Exporting structured meeting notes, release summaries, and project specs directly into shareable A4 PDF handouts"
  - "Auditing long-form documentation hierarchy and section flow using the interactive Table of Contents outline"
  - "Inspecting raw Markdown files received from collaborators without installing a desktop editor or IDE plugin"
howToSteps:
  - "Type directly into the Monaco editor pane, paste existing Markdown, or drag and drop a local .md, .markdown, or .txt file onto the workspace."
  - "Use the formatting toolbar to wrap selected text in bold, italics, inline code, links, blockquotes, lists, task items, or GFM table templates at your exact cursor position."
  - "Switch between Split, Editor-only, and Preview-only modes, or toggle Word Wrap and adjust editor font size for comfortable long-form writing."
  - "Click the hash icon to open the auto-generated Table of Contents and jump smoothly to any heading in long documents."
  - "Verify document length, heading structure, and reading duration in the live statistics strip above the editor."
  - "Copy raw Markdown or rendered HTML with one click, or open the Export menu to download a .md source file, standalone .html page, or A4 .pdf document."
---

Plain-text markup became the lingua franca of software documentation because it stays legible in a terminal, diffs cleanly in Git, and survives decades of tooling churn. Yet writing complex nested lists, pipe-delimited tables, and multi-language code blocks blindly in raw text quickly introduces subtle formatting errors that only surface after you push a commit. The **Markdown Previewer & Editor** pairs a full Monaco code editor with an instant GitHub Flavored Markdown (GFM) renderer inside your browser, letting you inspect rendered typography, verify syntax highlighting, navigate long outlines, and ship HTML or PDF artifacts without uploading confidential drafts to an external backend.

## Inside the Markdown-to-HTML Rendering Pipeline

Rather than running brittle regular-expression string replacements, the preview pane compiles your document through a structured Abstract Syntax Tree (AST) pipeline modeled on the unified ecosystem:

1. **Markdown Lexing and Parsing (`mdast`):** Raw text is tokenized according to the CommonMark specification, with `remark-gfm` enabling GitHub's tabular, strikethrough, task-list, and autolink grammar rules.
2. **HTML Tree Transformation (`hast`):** The Markdown AST maps onto an HTML tree. Passing the tree through `rehype-raw` reparses embedded inline HTML tags (such as `<kbd>`, `<details>`, or `<figure>`) into proper DOM nodes instead of escaping them as literal text.
3. **Syntax Highlighting (`rehype-highlight`):** Fenced code blocks declaring an info string (such as `typescript`, `python`, `bash`, or `sql`) are tokenized by Highlight.js into semantic `<span>` classes before React mounts the output.

On the authoring side, the left pane runs the Monaco Editor — the same text buffer engine that powers VS Code. Clicking any formatting toolbar button invokes Monaco's `executeEdits` API against the active selection range, wrapping highlighted text in markers or inserting a pre-selected placeholder rather than naively appending syntax to the bottom of the file. Every modification is debounced by 800 milliseconds and cached in browser `localStorage`, preserving your work across refreshes while keeping proprietary specifications strictly on your local device.

## CommonMark Core vs. GitHub Flavored Markdown Reference

Many formatting surprises stem from assuming every Markdown parser handles extensions identically. The reference matrix below outlines how standard CommonMark differs from the GFM superset supported in the live previewer.

| Syntax Feature | CommonMark 0.31 | GFM Extension | Rendered HTML Element | Key Parsing Rule |
| :--- | :--- | :--- | :--- | :--- |
| ATX Headings (`## Title`) | Supported | Supported | `<h1>`–`<h6>` with slug `id` | Requires a space after `#`; `##Title` stays a paragraph |
| Fenced Code (` ```lang `) | Supported | Supported | `<pre><code class="hljs">` | Info string after opening backticks triggers Highlight.js |
| Pipe Tables (`\| A \| B \|`) | Not supported | Supported | `<table>`, `<thead>`, `<tbody>` | Header separator row needs at least three hyphens per column |
| Task Lists (`- [x] Done`) | Not supported | Supported | `<li><input type="checkbox">` | Requires lowercase `x` or space inside brackets after list marker |
| Strikethrough (`~~old~~`) | Not supported | Supported | `<del>` | Single or double tildes in GFM; avoid spaces adjacent to delimiters |
| Bare Autolinks | Requires `<...>` | Supported | `<a target="_blank">` | Matches `https://` and `www.` prefixes without angle brackets |
| Raw Inline HTML | Supported | Supported | Native DOM node | Block HTML needs blank lines around it to resume Markdown parsing |

## Authoring Clean Syntax and Exporting Deliverables

Small whitespace conventions decide whether nested structures render predictably across GitHub, static site generators, and documentation portals. For example, indenting a fenced code block inside a numbered list requires aligning the fence with the first character of the list item's content, and literal pipe characters inside a GFM table cell must be backslash-escaped (`\|`):

````markdown
1. Configure the build script before deployment:

   ```bash
   npm run build && npm run lint
   ```

| Flag | Behavior | Example |
| :--- | :---: | :--- |
| `--strict` | Fails on warnings | `lint --strict` |
| `A \| B` | Escaped pipe inside cell | `echo "ok"` |
````

When building wide multi-column data matrices, hand-aligning Markdown pipes becomes tedious. You can visually assemble complex layouts or import spreadsheet rows in the [HTML Table Generator](/en/tools/html-table-generator) and export ready-to-paste GFM table markup straight into this editor.

### Standalone HTML Export vs. Paginated PDF Rendering

The Export menu supports three local output paths tailored to different publishing targets:

- **Source `.md` download:** Emits the exact UTF-8 buffer from Monaco via a client-side `Blob` URL with `text/markdown` MIME metadata.
- **Standalone `.html` export:** Captures the compiled preview DOM and wraps it inside a complete HTML5 skeleton containing clean system-stack typography, responsive image constraints, bordered table styles, and accent blockquotes. If you need to inspect tag nesting, adjust indentation, or strip whitespace before embedding the output in a web page, pass the exported file into the [HTML Formatter](/en/tools/html-formatter).
- **Paginated A4 `.pdf` export:** Dynamically loads `html2canvas` at `2x` pixel density and slices the rendered document canvas across portrait A4 sheets using `jsPDF`. Because rasterization captures exact visual styling, tables and syntax-highlighted code blocks keep their proportions without relying on inconsistent browser print dialogs.

For long technical handbooks, toggle the Table of Contents panel to verify heading depth (`H1`–`H6`) and click any anchor to scroll directly to that section in the preview. The statistics strip recalculates words, characters, lines, headings, and approximate reading time (computed at 200 words per minute) on every keystroke. When revising existing specifications or release notes, comparing your updated `.md` export against the previous version in the [Diff Checker](/en/tools/diff-checker) highlights line-level edits before opening a pull request.

## Practical Pitfalls and HTML Sanitization Hygiene

Three recurring edge cases catch even seasoned technical writers:

- **Hard line breaks vs. soft wraps:** A single newline inside a paragraph collapses into a space under CommonMark. Force a `<br>` element intentionally by appending either a trailing backslash (`\`) or two spaces at the end of the line.
- **Underscores inside code identifiers:** GFM disables intraword emphasis for underscores (`my_variable_name` stays literal), whereas some older CommonMark parsers italicize `_variable_`. Wrapping every identifier in backticks guarantees portable rendering everywhere.
- **Inline HTML security boundaries:** Because `rehype-raw` faithfully renders raw HTML tags, this editor is ideal for solo authoring and trusted repository documentation on your own device. If you ever embed copied HTML output into a multi-user web application that accepts untrusted input, always run the HTML through a strict allowlist sanitizer such as DOMPurify server-side or client-side to strip `<script>` tags and `on*` event attributes.
