"use client";

import React, { useState } from "react";
import { Copy, Check, X, Code, ExternalLink, Sun, Moon, Monitor, LayoutTemplate } from "lucide-react";

interface EmbedCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  title: string;
  locale?: string;
}

export function EmbedCalculatorModal({
  isOpen,
  onClose,
  slug,
  title,
  locale = "en",
}: EmbedCalculatorModalProps) {
  const [theme, setTheme] = useState<"auto" | "light" | "dark">("auto");
  const [hideHeader, setHideHeader] = useState(false);
  const [height, setHeight] = useState(650);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const baseUrl = "https://www.nexuscalculator.net";
  
  // Construct embed URL with query params
  const embedParams = new URLSearchParams();
  if (theme !== "auto") embedParams.set("theme", theme);
  if (hideHeader) embedParams.set("hideHeader", "true");
  const queryStr = embedParams.toString() ? `?${embedParams.toString()}` : "";
  
  const embedUrl = `${baseUrl}/${locale}/embed/calculators/${slug}${queryStr}`;
  const canonicalPageUrl = `${baseUrl}/${locale}/calculators/${slug}`;

  // Generated iframe snippet with clean dofollow SEO attribution
  const embedSnippet = `<iframe src="${embedUrl}" width="100%" height="${height}" frameborder="0" style="border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);" title="${title}"></iframe>
<p style="font-size:11px;color:#64748b;margin-top:6px;text-align:right;">Powered by <a href="${canonicalPageUrl}" target="_blank" rel="noopener" style="color:#518231;font-weight:600;text-decoration:underline;">Nexus Calculator</a></p>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Failed to copy embed snippet:", e);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/60 dark:bg-slate-800/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] flex items-center justify-center shrink-0">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Embed {title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Add this free, responsive calculator to your website or blog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* Customization Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Theme Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Theme
              </label>
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                <button
                  onClick={() => setTheme("auto")}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    theme === "auto"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Auto</span>
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    theme === "light"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    theme === "dark"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Height Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Height
              </label>
              <select
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#518231]"
              >
                <option value={550}>Compact (550px)</option>
                <option value={650}>Standard (650px)</option>
                <option value={800}>Tall (800px)</option>
                <option value={1000}>Extra Tall (1000px)</option>
              </select>
            </div>

            {/* Header Display Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Header Style
              </label>
              <button
                onClick={() => setHideHeader(!hideHeader)}
                className={`w-full py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 border transition-colors ${
                  hideHeader
                    ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                    : "bg-[#518231]/10 border-[#518231]/30 text-[#518231] dark:text-[#6fa844]"
                }`}
              >
                <LayoutTemplate className="w-4 h-4" />
                <span>{hideHeader ? "Header: Hidden" : "Header: Visible"}</span>
              </button>
            </div>
          </div>

          {/* HTML Snippet Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                HTML Embed Code
              </label>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Paste directly into WordPress, Webflow, Squarespace, or HTML
              </span>
            </div>
            <div className="relative">
              <textarea
                readOnly
                rows={4}
                value={embedSnippet}
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-mono text-slate-800 dark:text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#518231]"
              />
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Live Widget Preview
              </label>
              <a 
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#518231] hover:underline"
              >
                Open in new tab
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 shadow-inner">
              <iframe
                src={embedUrl}
                width="100%"
                height="320"
                className="w-full bg-white dark:bg-slate-900 border-0"
                title={`${title} Live Preview`}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between gap-4 shrink-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            Includes free calculation engine &amp; automatic updates.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-md ${
                copied
                  ? "bg-[#436a28] shadow-[#436a28]/20"
                  : "bg-[#518231] hover:bg-[#436a28] shadow-[#518231]/20"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Code Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Embed Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
