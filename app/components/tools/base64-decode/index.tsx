"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Copy, Download, Trash2, Upload, ImageIcon, ArrowRightLeft,
  AlertTriangle, FileText, ClipboardCheck, MonitorDown, FileImage
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  decodeBase64ToText, isValidBase64, copyToClipboard, downloadFile,
  formatBytes, base64ToBytes, encodeTextToBase64
} from "../base64-encode/utils";

// Detects image mime type from magic bytes
function detectMimeType(bytes: Uint8Array): string | null {
  if (!bytes || bytes.length < 8) return null;
  const hex = Array.from(bytes.slice(0, 12))
    .map(b => b.toString(16).padStart(2, '0').toUpperCase())
    .join('');

  if (hex.startsWith('89504E47')) return 'image/png';
  if (hex.startsWith('FFD8FF')) return 'image/jpeg';
  if (hex.startsWith('47494638')) return 'image/gif';
  if (hex.startsWith('52494646') && hex.substring(16, 24) === '57454250') return 'image/webp';
  
  // Basic SVG check (starts with <svg or <?xml)
  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes.slice(0, 100));
    if (text.includes('<svg') || text.includes('<?xml')) return 'image/svg+xml';
  } catch {}

  return null;
}

export function Base64DecodeTool() {
  const { resolvedTheme } = useTheme();

  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Image detection state
  const [imageData, setImageData] = useState<{ mime: string; dataUrl: string; rawBytes: Uint8Array } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [toast, setToast] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("base64_decode_input");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.input) setInput(parsed.input);
        if (parsed.urlSafe !== undefined) setUrlSafe(parsed.urlSafe);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input || urlSafe) {
        localStorage.setItem("base64_decode_input", JSON.stringify({ input, urlSafe }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [input, urlSafe]);

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

  const handleDownloadText = () => {
    if (!output) return;
    downloadFile(output, "decoded.txt");
    showToast("Downloaded text file!");
  };

  const handleDownloadBinary = () => {
    if (!imageData) return;
    const ext = imageData.mime.split('/')[1] || 'bin';
    const blob = new Blob([imageData.rawBytes], { type: imageData.mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decoded_image.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded image file!");
  };

  // Live Processing
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      setImageData(null);
      return;
    }

    // Check if it's already a Data URI
    let b64Str = input.trim();
    let prefixMime = null;
    const dataUriMatch = b64Str.match(/^data:([a-zA-Z0-9/+-]+);base64,(.+)$/);
    if (dataUriMatch) {
      prefixMime = dataUriMatch[1];
      b64Str = dataUriMatch[2];
    }

    try {
      const bytes = base64ToBytes(b64Str);
      
      // Attempt image detection
      const detectedMime = prefixMime || detectMimeType(bytes);
      
      if (detectedMime && detectedMime.startsWith('image/')) {
        // It's an image
        setImageData({
          mime: detectedMime,
          dataUrl: `data:${detectedMime};base64,${bytesToBase64(bytes)}`, // Re-encode to ensure standard B64 for data url
          rawBytes: bytes
        });
        setOutput("");
        setError(null);
      } else {
        // Try to decode as text
        setImageData(null);
        const { text, error: decErr } = decodeBase64ToText(b64Str);
        if (decErr) {
          setOutput("");
          setError(decErr);
        } else {
          setOutput(text);
          setError(null);
        }
      }
    } catch (e: any) {
      setImageData(null);
      setOutput("");
      setError("Invalid Base64 format or padding.");
    }
  }, [input, urlSafe]);

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
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setInput(text);
      showToast("File loaded");
    };
    reader.readAsText(file);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
        showToast("Pasted from clipboard");
      }
    } catch {
      showToast("Could not paste from clipboard");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
    setImageData(null);
    localStorage.removeItem("base64_decode_input");
    showToast("Cleared");
  };

  const inputStats = useMemo(() => {
    return {
      chars: input.length,
      bytes: new Blob([input]).size,
      estDecodedBytes: Math.floor((input.replace(/[^A-Za-z0-9+/=-]/g, '').length * 3) / 4)
    };
  }, [input]);

  const outputStats = useMemo(() => {
    if (imageData) return { chars: 0, bytes: imageData.rawBytes.length };
    return {
      chars: output.length,
      bytes: new Blob([output]).size
    };
  }, [output, imageData]);

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
           <span className="bg-[#518231]/10 text-[#518231] px-4 py-1.5 rounded-lg font-bold text-sm tracking-wide">
             Decode Mode
           </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-slate-200 dark:border-slate-700">
            <Upload size={16} /> <span className="hidden sm:inline">Upload Base64 File</span>
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

      <div 
        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-4 transition-colors ${isDragging ? "ring-2 ring-[#518231] bg-[#518231]/5 rounded-xl" : ""}`}>
        
        {/* Input Panel */}
        <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px]">
          <div className="flex justify-between items-center px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <FileText size={14}/> Base64 Input
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {inputStats.chars} chars · Est. {formatBytes(inputStats.estDecodedBytes)}
            </span>
          </div>
          <div className="flex-1 relative">
            <textarea 
              value={input} onChange={e => setInput(e.target.value)}
              placeholder="Paste Base64 string or Data URI here..."
              className="absolute inset-0 w-full h-full p-4 resize-none outline-none bg-transparent text-slate-800 dark:text-slate-200 font-mono text-sm custom-scrollbar"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px]">
          <div className="flex justify-between items-center px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#518231] flex items-center gap-2">
              {imageData ? <FileImage size={14} /> : <MonitorDown size={14}/>} 
              {imageData ? "Image Preview" : "Decoded Output"}
            </span>
            <div className="flex gap-2">
              {imageData ? (
                <button onClick={handleDownloadBinary} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 font-medium">
                  <Download size={12} /> Download Image
                </button>
              ) : output && !error ? (
                <>
                  <button onClick={() => handleCopy(output, "output")} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 font-medium">
                    {copiedKey === "output" ? <span className="text-green-500">Copied!</span> : <><Copy size={12} /> Copy</>}
                  </button>
                  <button onClick={handleDownloadText} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 font-medium">
                    <Download size={12} /> TXT
                  </button>
                </>
              ) : null}
              
              {!error && (imageData || output) && (
                <span className="text-xs text-slate-400 font-mono ml-2 border-l border-slate-300 dark:border-slate-600 pl-2 flex items-center">
                  {formatBytes(outputStats.bytes)}
                </span>
              )}
            </div>
          </div>
          <div className="flex-1 relative bg-slate-50/50 dark:bg-[#1e1e1e]/50 flex flex-col">
            {error ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center text-red-500">
                <AlertTriangle size={32} className="mb-3 opacity-80" />
                <p className="font-semibold text-sm">{error}</p>
                <p className="text-xs mt-2 opacity-70">Make sure the input is a valid Base64 string. Check for missing padding or invalid characters.</p>
              </div>
            ) : imageData ? (
              <div className="flex-1 flex flex-col p-4 gap-4">
                <div className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden checkered-bg relative">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={imageData.dataUrl} alt="Decoded" className="max-h-full max-w-full object-contain drop-shadow-md rounded z-10" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                  <div className="flex-1">
                    <span className="text-slate-500 block text-xs mb-0.5">Detected Type</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{imageData.mime}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                  <div className="flex-1">
                    <span className="text-slate-500 block text-xs mb-0.5">Size</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{formatBytes(imageData.rawBytes.length)}</span>
                  </div>
                </div>
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
    </div>
  );
}
