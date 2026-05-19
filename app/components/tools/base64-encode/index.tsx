"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Copy, Download, Trash2, Upload, Settings2, Image as ImageIcon,
  ArrowRightLeft, CheckCircle, AlertTriangle, FileText, MonitorDown,
  RefreshCw, ClipboardCheck, Info, MonitorUp, Zap
} from "lucide-react";
import { useTheme } from "next-themes";
import Editor from "@monaco-editor/react";
import {
  encodeTextToBase64, decodeBase64ToText, isValidBase64,
  copyToClipboard, downloadFile, formatBytes, bytesToBase64
} from "./utils";

type Mode = "encode" | "decode";
type FileData = { name: string; type: string; size: number; base64: string; isImage: boolean };

export function Base64EncodeTool() {
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  // State
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // File State
  const [uploadedFile, setUploadedFile] = useState<FileData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // UI State
  const [toast, setToast] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("base64_tool_input");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.input) setInput(parsed.input);
        if (parsed.mode) setMode(parsed.mode);
        if (parsed.urlSafe !== undefined) setUrlSafe(parsed.urlSafe);
      } catch (e) {}
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input || mode || urlSafe) {
        localStorage.setItem("base64_tool_input", JSON.stringify({ input, mode, urlSafe }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [input, mode, urlSafe]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleCopy = async (text: string, key: string) => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Copied to clipboard!");
    }
  };

  const handleDownload = (content: string, filename: string) => {
    if (!content) return;
    downloadFile(content, filename);
    showToast("Downloaded!");
  };

  // Processing logic
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    if (mode === "encode") {
      try {
        const result = encodeTextToBase64(input, urlSafe);
        setOutput(result);
        setError(null);
      } catch (e: any) {
        setOutput("");
        setError("Failed to encode input.");
      }
    } else {
      const { text, error: decErr } = decodeBase64ToText(input);
      if (decErr) {
        setOutput("");
        setError(decErr);
      } else {
        setOutput(text);
        setError(null);
      }
    }
  }, [input, mode, urlSafe]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const processFile = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const reader = new FileReader();
    
    if (isImage) {
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        // The dataUrl is already Data URI: "data:image/png;base64,....."
        setUploadedFile({
          name: file.name,
          type: file.type,
          size: file.size,
          base64: dataUrl,
          isImage: true
        });
        setMode("encode");
        setInput(""); // clear text input
        showToast("Image loaded successfully");
      };
      reader.readAsDataURL(file);
    } else {
      // For text files, read as ArrayBuffer and convert
      reader.onload = (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        const bytes = new Uint8Array(buffer);
        
        // Attempt to read as text to populate the input box if we want
        try {
          const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
          setInput(text);
          setMode("encode");
          setUploadedFile(null); // Just populate text box
          showToast("File text loaded");
        } catch {
          // It's binary, can't show in text box safely, so treat as file
          const b64 = bytesToBase64(bytes, urlSafe);
          setUploadedFile({
            name: file.name,
            type: file.type,
            size: file.size,
            base64: `data:${file.type || 'application/octet-stream'};base64,${b64}`,
            isImage: false
          });
          setInput("");
          showToast("Binary file processed");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        if (isValidBase64(text) && !text.includes(" ")) {
          setMode("decode");
          showToast("Detected Base64 - Switched to Decode");
        }
        setInput(text);
      }
    } catch {
      showToast("Could not paste from clipboard");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
    setUploadedFile(null);
    localStorage.removeItem("base64_tool_input");
    showToast("Cleared");
  };

  const swapModes = () => {
    setMode(m => m === "encode" ? "decode" : "encode");
    if (output && !error) {
      setInput(output);
    }
  };

  // Stats
  const inputStats = useMemo(() => {
    return {
      chars: input.length,
      lines: input.split('\n').length,
      bytes: new Blob([input]).size
    };
  }, [input]);

  const outputStats = useMemo(() => {
    return {
      chars: output.length,
      lines: output.split('\n').length,
      bytes: new Blob([output]).size
    };
  }, [output]);

  return (
    <div className="w-full flex flex-col gap-4">
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2 bg-[#518231] text-white rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          {toast}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex items-center">
            <button onClick={() => setMode("encode")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === "encode" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
              Encode
            </button>
            <button onClick={() => setMode("decode")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === "decode" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
              Decode
            </button>
          </div>
          <button onClick={swapModes} title="Swap Mode & Content" className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowRightLeft size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          
          <button onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-slate-200 dark:border-slate-700">
            <Upload size={16} /> <span className="hidden sm:inline">Upload File</span>
          </button>
          <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />

          <button onClick={handlePaste}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-slate-200 dark:border-slate-700">
            <ClipboardCheck size={16} /> <span className="hidden sm:inline">Paste</span>
          </button>

          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
            <input type="checkbox" checked={urlSafe} onChange={e => setUrlSafe(e.target.checked)} className="rounded text-[#518231] focus:ring-[#518231]" />
            URL Safe
          </label>

          <button onClick={clearAll} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      {!uploadedFile ? (
        <div 
          onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-4 transition-colors ${isDragging ? "ring-2 ring-[#518231] bg-[#518231]/5 rounded-xl" : ""}`}>
          
          {/* Input Panel */}
          <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px]">
            <div className="flex justify-between items-center px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <FileText size={14}/> {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {inputStats.chars} chars · {formatBytes(inputStats.bytes)}
              </span>
            </div>
            <div className="flex-1 relative">
              <textarea 
                value={input} onChange={e => setInput(e.target.value)}
                placeholder={mode === "encode" ? "Type or paste text here...\n(UTF-8 & Emojis supported 🎉)" : "Paste Base64 string here..."}
                className="absolute inset-0 w-full h-full p-4 resize-none outline-none bg-transparent text-slate-800 dark:text-slate-200 font-mono text-sm custom-scrollbar"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px]">
            <div className="flex justify-between items-center px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#518231] flex items-center gap-2">
                <Zap size={14}/> {mode === "encode" ? "Base64 Output" : "Decoded Text Output"}
              </span>
              <div className="flex gap-2">
                {output && !error && (
                  <>
                    <button onClick={() => handleCopy(output, "output")} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400">
                      {copiedKey === "output" ? <span className="text-green-500">Copied!</span> : <><Copy size={12} /> Copy</>}
                    </button>
                    <button onClick={() => handleDownload(output, mode === "encode" ? "encoded.txt" : "decoded.txt")} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400">
                      <Download size={12} /> TXT
                    </button>
                  </>
                )}
                {!error && output && (
                  <span className="text-xs text-slate-400 font-mono ml-2 border-l border-slate-300 dark:border-slate-600 pl-2">
                    {outputStats.chars} chars · {formatBytes(outputStats.bytes)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 relative bg-slate-50/50 dark:bg-[#1e1e1e]/50">
              {error ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center text-red-500">
                  <AlertTriangle size={32} className="mb-2 opacity-80" />
                  <p className="font-medium text-sm">{error}</p>
                </div>
              ) : (
                <textarea 
                  value={output} readOnly
                  className="absolute inset-0 w-full h-full p-4 resize-none outline-none bg-transparent text-slate-800 dark:text-slate-200 font-mono text-sm custom-scrollbar"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        /* File & Image Preview Panel */
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 relative">
          <button onClick={clearAll} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Trash2 size={16} />
          </button>
          
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            {uploadedFile.isImage ? <ImageIcon className="text-[#518231]" /> : <FileText className="text-[#518231]" />}
            File Processed
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Filename</div>
                <div className="font-medium text-slate-900 dark:text-slate-100 break-all">{uploadedFile.name}</div>
                
                <div className="mt-3 text-sm text-slate-500 dark:text-slate-400 mb-1">MIME Type</div>
                <div className="font-medium text-slate-900 dark:text-slate-100">{uploadedFile.type || "Unknown"}</div>

                <div className="mt-3 text-sm text-slate-500 dark:text-slate-400 mb-1">Original Size</div>
                <div className="font-medium text-slate-900 dark:text-slate-100">{formatBytes(uploadedFile.size)}</div>

                <div className="mt-3 text-sm text-slate-500 dark:text-slate-400 mb-1">Base64 Size</div>
                <div className="font-medium text-[#518231]">{formatBytes(new Blob([uploadedFile.base64]).size)} (+{Math.round(((new Blob([uploadedFile.base64]).size - uploadedFile.size) / uploadedFile.size) * 100)}%)</div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleCopy(uploadedFile.base64, "file_b64")} className="flex-1 py-2 bg-[#518231] text-white rounded-lg font-medium hover:bg-[#436a28] transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
                  {copiedKey === "file_b64" ? <ClipboardCheck size={16} /> : <Copy size={16} />} Copy Data URI
                </button>
                <button onClick={() => handleCopy(uploadedFile.base64.split(',')[1], "file_b64_raw")} className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm border border-slate-200 dark:border-slate-700">
                  Copy Raw B64
                </button>
              </div>
            </div>

            <div>
              {uploadedFile.isImage ? (
                <div className="h-64 w-full bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 overflow-hidden checkered-bg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={uploadedFile.base64} alt="Preview" className="max-h-full max-w-full object-contain drop-shadow-md rounded" />
                </div>
              ) : (
                <div className="h-64 w-full bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col">
                  <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex justify-between items-center text-xs text-slate-500">
                    <span>Base64 Preview</span>
                  </div>
                  <div className="flex-1 p-4 font-mono text-xs text-slate-600 dark:text-slate-400 overflow-auto break-all custom-scrollbar">
                    {uploadedFile.base64}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {uploadedFile.isImage && (
            <style dangerouslySetInnerHTML={{__html: `
              .checkered-bg {
                background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
                background-size: 20px 20px;
                background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
              }
              .dark .checkered-bg {
                background-image: linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%);
              }
            `}} />
          )}
        </div>
      )}
    </div>
  );
}
