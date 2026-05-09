"use client";

import React, { useState, useEffect } from "react";
import { GitCompare, Trash2, ArrowRightLeft, Edit3, ArrowLeft } from "lucide-react";
import { Link } from "../../../i18n/routing";

export function DiffCheckerTool() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [hasCompared, setHasCompared] = useState(false);
  const [source, setSource] = useState("json-formatter");

  useEffect(() => {
    // Pick up data sent from JSON Formatter or other tools via localStorage
    const savedLeft = localStorage.getItem("diff_checker_left");
    const savedRight = localStorage.getItem("diff_checker_right");
    const savedSource = localStorage.getItem("diff_checker_source");
    
    if (savedLeft) setLeft(savedLeft);
    if (savedRight) setRight(savedRight);
    if (savedSource) setSource(savedSource);
    
    // Auto-compare if we came from another tool with data
    if (savedLeft || savedRight) {
      setHasCompared(true);
    }
  }, []);

  const handleClear = () => {
    setLeft("");
    setRight("");
    setHasCompared(false);
    localStorage.removeItem("diff_checker_left");
    localStorage.removeItem("diff_checker_right");
  };

  const renderDiff = () => {
    const leftLines = left.split('\n');
    const rightLines = right.split('\n');
    const maxLines = Math.max(leftLines.length, rightLines.length);
    
    const rows = [];
    for (let i = 0; i < maxLines; i++) {
      const l = leftLines[i] ?? "";
      const r = rightLines[i] ?? "";
      const isDiff = l !== r;
      
      rows.push(
        <div key={i} className="flex border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
          <div className={`flex-1 p-1 px-3 font-mono text-sm break-all ${isDiff ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300' : 'text-slate-600 dark:text-slate-400'}`}>
            <span className="opacity-40 select-none mr-3 inline-block w-8 text-right border-r border-slate-200 dark:border-slate-700 pr-2">{i+1}</span>
            {l}
          </div>
          <div className="w-px bg-slate-200 dark:bg-slate-700 shrink-0"></div>
          <div className={`flex-1 p-1 px-3 font-mono text-sm break-all ${isDiff ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'text-slate-600 dark:text-slate-400'}`}>
            <span className="opacity-40 select-none mr-3 inline-block w-8 text-right border-r border-slate-200 dark:border-slate-700 pr-2">{i+1}</span>
            {r}
          </div>
        </div>
      );
    }
    
    return (
      <div className="w-full border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
        {rows}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Bar Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Link href={(`/tools/${source}`) as any} className="px-3 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm">
            <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to {source === "html-formatter" ? "HTML" : "JSON"} Formatter</span>
          </Link>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>
          {!hasCompared ? (
            <button onClick={() => setHasCompared(true)} className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm">
              <GitCompare size={16} /> Run Compare
            </button>
          ) : (
            <button onClick={() => setHasCompared(false)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm">
              <Edit3 size={16} /> Edit Inputs
            </button>
          )}
        </div>
        <button onClick={handleClear} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400 flex items-center gap-2 text-sm" title="Clear All">
          <Trash2 size={18} /> <span className="hidden sm:inline">Clear All</span>
        </button>
      </div>

      {!hasCompared ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px] min-h-[500px]">
          <div className="flex flex-col h-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 font-semibold text-sm text-slate-700 dark:text-slate-300">Original Text</div>
            <textarea
              value={left}
              onChange={(e) => setLeft(e.target.value)}
              placeholder="Paste original content here..."
              className="flex-1 w-full p-4 resize-none focus:outline-none bg-transparent font-mono text-sm text-slate-800 dark:text-slate-200 custom-scrollbar whitespace-pre"
              spellCheck={false}
            />
          </div>
          <div className="flex flex-col h-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 font-semibold text-sm text-slate-700 dark:text-slate-300">Modified Text</div>
            <textarea
              value={right}
              onChange={(e) => setRight(e.target.value)}
              placeholder="Paste modified content here..."
              className="flex-1 w-full p-4 resize-none focus:outline-none bg-transparent font-mono text-sm text-slate-800 dark:text-slate-200 custom-scrollbar whitespace-pre"
              spellCheck={false}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg font-semibold text-sm text-slate-700 dark:text-slate-300 shadow-sm">
            <div className="flex-1 text-center text-red-600 dark:text-red-400">Original</div>
            <ArrowRightLeft size={16} className="text-slate-400 mx-4" />
            <div className="flex-1 text-center text-green-600 dark:text-green-400">Modified</div>
          </div>
          <div className="overflow-x-auto custom-scrollbar pb-2">
            {renderDiff()}
          </div>
        </div>
      )}
    </div>
  );
}
