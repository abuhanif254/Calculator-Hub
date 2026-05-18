"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Copy, Download, Upload, Trash2, Eye, EyeOff, Columns, FileText,
  Bold, Italic, Heading, Link2, Image, Code, Quote, List, ListOrdered,
  CheckSquare, Minus, Table, WrapText, ClipboardCheck, Type,
  ChevronDown, Hash, Clock, AlignLeft, FileDown, Printer
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

// ── Sample Markdown ──
const SAMPLE_MD = `# Welcome to Markdown Previewer

Write **Markdown** on the left, see the *live preview* on the right.

## Features

- [x] GitHub Flavored Markdown
- [x] Live preview
- [x] Syntax highlighting
- [ ] Your next great doc

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`

## Table

| Feature | Status |
|---------|--------|
| Tables  | ✅     |
| Tasks   | ✅     |
| Code    | ✅     |

## Blockquote

> Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

---

Made with ❤️ using **NexusCalculator**
`;

// ── Types ──
type ViewMode = "split" | "editor" | "preview";

// ── Stats helper ──
function getStats(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const lines = text.split("\n").length;
  const headings = (text.match(/^#{1,6}\s/gm) || []).length;
  const readMin = Math.max(1, Math.ceil(words / 200));
  return { words, chars, lines, headings, readMin };
}

// ── TOC extractor ──
function extractToc(text: string) {
  const matches = text.match(/^(#{1,6})\s+(.+)$/gm) || [];
  return matches.map((m) => {
    const level = m.match(/^(#+)/)![1].length;
    const title = m.replace(/^#+\s+/, "");
    return { level, title, id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-") };
  });
}

// ── Toolbar actions ──
const toolbarActions = [
  { icon: Heading, label: "Heading", prefix: "## ", suffix: "" },
  { icon: Bold, label: "Bold", prefix: "**", suffix: "**" },
  { icon: Italic, label: "Italic", prefix: "*", suffix: "*" },
  { icon: Code, label: "Code", prefix: "`", suffix: "`" },
  { icon: Link2, label: "Link", prefix: "[", suffix: "](url)" },
  { icon: Image, label: "Image", prefix: "![alt](", suffix: ")" },
  { icon: Quote, label: "Quote", prefix: "> ", suffix: "" },
  { icon: List, label: "Bullet List", prefix: "- ", suffix: "" },
  { icon: ListOrdered, label: "Numbered List", prefix: "1. ", suffix: "" },
  { icon: CheckSquare, label: "Task List", prefix: "- [ ] ", suffix: "" },
  { icon: Minus, label: "Horizontal Rule", prefix: "\n---\n", suffix: "" },
  { icon: Table, label: "Table", prefix: "\n| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n", suffix: "" },
];

// ── Component ──
export function MarkdownPreviewerTool() {
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  const [markdown, setMarkdown] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [wordWrap, setWordWrap] = useState<"on" | "off">("on");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showToc, setShowToc] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  const handleEditorMount = useCallback((editor: any) => {
    editorRef.current = editor;
  }, []);

  // ── Auto-save / restore ──
  useEffect(() => {
    const saved = localStorage.getItem("md_previewer_content");
    if (saved) setMarkdown(saved);
    else setMarkdown(SAMPLE_MD);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("md_previewer_content", markdown);
    }, 800);
    return () => clearTimeout(timer);
  }, [markdown]);

  // ── Stats ──
  const stats = useMemo(() => getStats(markdown), [markdown]);
  const toc = useMemo(() => extractToc(markdown), [markdown]);

  // ── Clipboard ──
  const copyText = useCallback(async (text: string, key: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  }, []);

  // ── Toolbar insert (uses Monaco API for cursor-position insertion) ──
  const insertSyntax = useCallback((prefix: string, suffix: string) => {
    const editor = editorRef.current;
    if (editor) {
      const selection = editor.getSelection();
      const model = editor.getModel();
      if (selection && model) {
        const selectedText = model.getValueInRange(selection);
        const placeholder = selectedText || (suffix ? "text" : "");
        const insertText = prefix + placeholder + suffix;
        editor.executeEdits("", [{
          range: selection,
          text: insertText,
          forceMoveMarkers: true,
        }]);
        // Position cursor after prefix if we inserted a placeholder
        if (!selectedText && suffix) {
          const pos = editor.getPosition();
          if (pos) {
            const newCol = pos.column - suffix.length - placeholder.length;
            editor.setPosition({ lineNumber: pos.lineNumber, column: newCol });
            editor.setSelection({
              startLineNumber: pos.lineNumber,
              startColumn: newCol,
              endLineNumber: pos.lineNumber,
              endColumn: newCol + placeholder.length,
            });
          }
        }
        editor.focus();
        return;
      }
    }
    // Fallback: append to end
    setMarkdown((prev) => {
      const placeholder = suffix ? "text" : "";
      return prev + prefix + placeholder + suffix;
    });
  }, []);

  // ── File upload ──
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) setMarkdown(ev.target.result as string);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ── Drag & Drop ──
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith(".md") || file.name.endsWith(".markdown") || file.name.endsWith(".txt"))) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setMarkdown(ev.target.result as string);
      };
      reader.readAsText(file);
    }
  }, []);

  // ── Download helpers ──
  const downloadFile = useCallback((content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const exportMd = useCallback(() => downloadFile(markdown, "document.md", "text/markdown"), [markdown, downloadFile]);

  const exportHtml = useCallback(() => {
    const html = previewRef.current?.innerHTML || "";
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Markdown Export</title><style>body{font-family:system-ui,sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.7;color:#1e293b}pre{background:#f1f5f9;padding:1rem;border-radius:8px;overflow-x:auto}code{font-size:0.9em}table{border-collapse:collapse;width:100%}th,td{border:1px solid #e2e8f0;padding:8px 12px;text-align:left}th{background:#f8fafc}img{max-width:100%}blockquote{border-left:4px solid #518231;margin:1rem 0;padding:0.5rem 1rem;color:#475569;background:#f8fafc}</style></head><body>${html}</body></html>`;
    downloadFile(fullHtml, "document.html", "text/html");
  }, [downloadFile]);

  const exportPdf = useCallback(async () => {
    if (!previewRef.current) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;
      const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true } as any);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW - 20;
      const imgH = (canvas.height * imgW) / canvas.width;
      let yPos = 10;
      let remaining = imgH;
      // First page
      pdf.addImage(imgData, "PNG", 10, yPos, imgW, imgH);
      remaining -= (pageH - 20);
      while (remaining > 0) {
        pdf.addPage();
        yPos = yPos - (pageH - 20);
        pdf.addImage(imgData, "PNG", 10, yPos, imgW, imgH);
        remaining -= (pageH - 20);
      }
      pdf.save("document.pdf");
    } catch (e) {
      console.error("PDF export failed", e);
    }
  }, []);

  // ── Rendered HTML for copy ──
  const getRenderedHtml = useCallback(() => {
    return previewRef.current?.innerHTML || "";
  }, []);

  // ── View mode buttons ──
  const viewModes: { mode: ViewMode; icon: React.ElementType; label: string }[] = [
    { mode: "split", icon: Columns, label: "Split" },
    { mode: "editor", icon: FileText, label: "Editor" },
    { mode: "preview", icon: Eye, label: "Preview" },
  ];

  return (
    <div className="w-full flex flex-col gap-4" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      {/* ── Primary Toolbar ── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Left: Markdown toolbar */}
        <div className="flex flex-wrap items-center gap-1">
          {toolbarActions.map((action) => (
            <button
              key={action.label}
              onClick={() => insertSyntax(action.prefix, action.suffix)}
              className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={action.label}
              aria-label={action.label}
            >
              <action.icon size={16} />
            </button>
          ))}
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />
          <button
            onClick={() => setWordWrap((w) => (w === "on" ? "off" : "on"))}
            className={`p-2 rounded-lg transition-colors ${wordWrap === "on" ? "bg-[#518231]/10 text-[#518231]" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}
            title="Word Wrap"
            aria-label="Toggle word wrap"
          >
            <WrapText size={16} />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-1">
          {/* View modes */}
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 mr-1">
            {viewModes.map((vm) => (
              <button
                key={vm.mode}
                onClick={() => setViewMode(vm.mode)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5 font-medium ${
                  viewMode === vm.mode
                    ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
                aria-label={vm.label}
              >
                <vm.icon size={14} /> <span className="hidden sm:inline">{vm.label}</span>
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          <input type="file" accept=".md,.markdown,.txt" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Upload file" aria-label="Upload markdown file">
            <Upload size={16} />
          </button>

          {/* Export dropdown */}
          <div className="relative group">
            <button className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1" title="Export" aria-label="Export options">
              <FileDown size={16} /> <ChevronDown size={12} />
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 min-w-[160px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button onClick={exportMd} className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                <FileText size={14} /> Download .md
              </button>
              <button onClick={exportHtml} className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                <Code size={14} /> Download HTML
              </button>
              <button onClick={exportPdf} className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                <Printer size={14} /> Export PDF
              </button>
            </div>
          </div>

          <button onClick={() => copyText(markdown, "md")} className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Copy Markdown" aria-label="Copy markdown">
            {copiedKey === "md" ? <ClipboardCheck size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
          <button onClick={() => copyText(getRenderedHtml(), "html")} className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Copy HTML" aria-label="Copy rendered HTML">
            {copiedKey === "html" ? <ClipboardCheck size={16} className="text-green-500" /> : <Code size={16} />}
          </button>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />
          <button onClick={() => setShowToc(!showToc)} className={`p-2 rounded-lg transition-colors ${showToc ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`} title="Table of Contents" aria-label="Toggle table of contents">
            <Hash size={16} />
          </button>
          <button onClick={() => { setMarkdown(""); }} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400" title="Clear" aria-label="Clear editor">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="flex flex-wrap items-center gap-4 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1"><Type size={12} /> {stats.words} words</span>
        <span className="flex items-center gap-1"><AlignLeft size={12} /> {stats.chars} chars</span>
        <span className="flex items-center gap-1"><FileText size={12} /> {stats.lines} lines</span>
        <span className="flex items-center gap-1"><Heading size={12} /> {stats.headings} headings</span>
        <span className="flex items-center gap-1"><Clock size={12} /> ~{stats.readMin} min read</span>
      </div>

      {/* ── TOC Panel ── */}
      {showToc && toc.length > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/30 rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2 text-sm"><Hash size={14} /> Table of Contents</h4>
          <nav className="space-y-1">
            {toc.map((item, i) => (
              <div key={i} style={{ paddingLeft: `${(item.level - 1) * 16}px` }}>
                <button
                  onClick={() => {
                    const el = previewRef.current?.querySelector(`#${CSS.escape(item.id)}`);
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="text-sm text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 hover:underline transition-colors text-left"
                >
                  {item.title}
                </button>
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* ── Main Editor + Preview ── */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden" style={{ height: 650 }}>
        <div className={`h-full ${viewMode === "split" ? "grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800" : "flex flex-col"}`}>
          {/* Editor Panel */}
          {viewMode !== "preview" && (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Markdown Editor</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setFontSize(f => Math.max(10, f - 1))} className="text-xs px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300" aria-label="Decrease font size">A-</button>
                  <span className="text-xs text-slate-500">{fontSize}px</span>
                  <button onClick={() => setFontSize(f => Math.min(24, f + 1))} className="text-xs px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300" aria-label="Increase font size">A+</button>
                </div>
              </div>
              <div className="flex-1 relative" style={{ minHeight: 0 }}>
                <Editor
                  height="100%"
                  language="markdown"
                  theme={monacoTheme}
                  value={markdown}
                  onChange={(val) => setMarkdown(val || "")}
                  onMount={handleEditorMount}
                  options={{
                    minimap: { enabled: false },
                    wordWrap: wordWrap,
                    fontSize,
                    lineNumbers: "on",
                    renderLineHighlight: "line",
                    scrollBeyondLastLine: false,
                    padding: { top: 16 },
                    autoClosingBrackets: "always",
                    bracketPairColorization: { enabled: true },
                  }}
                />
              </div>
            </div>
          )}

          {/* Preview Panel */}
          {viewMode !== "editor" && (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#518231]">Preview</span>
              </div>
              <div
                ref={previewRef}
                className="flex-1 overflow-auto p-6 lg:p-8 prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-4 prose-a:text-[#518231] prose-code:text-[#518231] prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-img:rounded-xl prose-img:max-w-full custom-scrollbar"
                style={{ minHeight: 0 }}
              >
                {markdown.trim() ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                      h1: ({ children, ...props }) => {
                        const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        return <h1 id={id} {...props}>{children}</h1>;
                      },
                      h2: ({ children, ...props }) => {
                        const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        return <h2 id={id} {...props}>{children}</h2>;
                      },
                      h3: ({ children, ...props }) => {
                        const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        return <h3 id={id} {...props}>{children}</h3>;
                      },
                      h4: ({ children, ...props }) => {
                        const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        return <h4 id={id} {...props}>{children}</h4>;
                      },
                      img: ({ src, alt, ...props }) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt={alt || ""} loading="lazy" className="rounded-xl max-w-full h-auto" {...props} />
                      ),
                      pre: ({ children, ...props }) => {
                        const preRef = React.createRef<HTMLPreElement>();
                        return (
                          <div className="relative group">
                            <pre ref={preRef} {...props}>{children}</pre>
                            <button
                              onClick={() => {
                                const text = preRef.current?.textContent || "";
                                copyText(text, "code");
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-slate-200/80 dark:bg-slate-700/80 rounded text-xs text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Copy code"
                            >
                              {copiedKey === "code" ? <ClipboardCheck size={12} className="text-green-500" /> : <Copy size={12} />}
                            </button>
                          </div>
                        );
                      },
                      a: ({ href, children, ...props }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
                      ),
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
                    <Eye size={48} className="opacity-20" />
                    <p className="text-sm">Start typing Markdown to see a live preview</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
