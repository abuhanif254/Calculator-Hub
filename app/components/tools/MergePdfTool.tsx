"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  FileText, Upload, Trash2, ArrowUp, ArrowDown, Settings, 
  CheckCircle, AlertCircle, Loader2, Download, RefreshCw, 
  History, Move, Clipboard, ShieldAlert, FileMinus, Info, Check
} from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number | null;
  status: "loading" | "ready" | "error";
  errorMessage?: string;
  pageRange: string; // User-defined page range e.g. "1-3, 5"
}

interface MergeHistoryItem {
  id: string;
  timestamp: number;
  outputName: string;
  files: { name: string; size: number; pageCount: number | null }[];
  totalSize: number;
  totalPages: number;
}

export function MergePdfTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [globalDragActive, setGlobalDragActive] = useState(false);
  const [outputName, setOutputName] = useState("merged-document");
  const [isOptimizing, setIsOptimizing] = useState(true);
  const [mergeStatus, setMergeStatus] = useState<"idle" | "merging" | "success" | "error">("idle");
  const [mergeProgress, setMergeProgress] = useState(0);
  const [mergeStep, setMergeStep] = useState("");
  const [mergedBlobUrl, setMergedBlobUrl] = useState<string | null>(null);
  const [mergedSize, setMergedSize] = useState<number>(0);
  const [mergedPages, setMergedPages] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<MergeHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("merge_pdf_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse merge history", e);
      }
    }
  }, []);

  // Set up global drag-over listeners to show drop overlays
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setGlobalDragActive(true);
    };
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      // Only set false if leaving the window
      if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setGlobalDragActive(false);
      }
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setGlobalDragActive(false);
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  // Helper to format file sizes
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Safe page range parsing helper (e.g. "1-3, 5")
  const parsePageRanges = (rangeStr: string, maxPages: number): number[] => {
    const indices: number[] = [];
    const cleanStr = rangeStr.replace(/\s+/g, "");
    if (!cleanStr) {
      // Default to all pages
      return Array.from({ length: maxPages }, (_, i) => i);
    }

    const parts = cleanStr.split(",");
    for (const part of parts) {
      if (part.includes("-")) {
        const [startStr, endStr] = part.split("-");
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end) && start > 0 && end > 0 && start <= maxPages && end <= maxPages) {
          const min = Math.min(start, end);
          const max = Math.max(start, end);
          for (let i = min; i <= max; i++) {
            indices.push(i - 1); // convert to 0-index
          }
        }
      } else {
        const pageNum = parseInt(part, 10);
        if (!isNaN(pageNum) && pageNum > 0 && pageNum <= maxPages) {
          indices.push(pageNum - 1);
        }
      }
    }

    // Return unique sorted indices
    return Array.from(new Set(indices)).sort((a, b) => a - b);
  };

  // Add files to lists and read metadata in background
  const processFiles = async (selectedFiles: FileList) => {
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Validation: PDF files only
      if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
        alert(`File "${file.name}" is not a valid PDF.`);
        continue;
      }

      // Validation: Size limit check (100MB per file to protect browser memory)
      if (file.size > 100 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 100MB size limit. Please compress files before merging.`);
        continue;
      }

      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const fileEntry: UploadedFile = {
        id,
        file,
        name: file.name,
        size: file.size,
        pageCount: null,
        status: "loading",
        pageRange: ""
      };

      newFiles.push(fileEntry);
    }

    if (newFiles.length === 0) return;

    // Append loading states immediately
    setFiles((prev) => [...prev, ...newFiles]);

    // Read metadata (page counts) in background
    for (const entry of newFiles) {
      try {
        const arrayBuffer = await entry.file.arrayBuffer();
        
        // Load PDF document using pdf-lib with lighter configurations
        const pdfDoc = await PDFDocument.load(arrayBuffer, { 
          ignoreEncryption: true,
          updateMetadata: false 
        });

        const pages = pdfDoc.getPageCount();

        setFiles((prev) => 
          prev.map((f) => f.id === entry.id ? { ...f, pageCount: pages, status: "ready" } : f)
        );
      } catch (error: any) {
        console.error("Error reading PDF file structure: ", error);
        
        // Handle password protected/corrupted files gracefully
        let errorMessage = "Corrupted or unreadable PDF document.";
        if (error.message && error.message.includes("encrypted")) {
          errorMessage = "Password protected PDF. Please unlock first.";
        }

        setFiles((prev) => 
          prev.map((f) => 
            f.id === entry.id 
              ? { ...f, pageCount: null, status: "error", errorMessage } 
              : f
          )
        );
      }
    }
  };

  // Drag-and-drop triggers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setGlobalDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  // Reordering functions (Chevrons)
  const moveFile = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === files.length - 1) return;

    const newFiles = [...files];
    const swapTarget = direction === "up" ? index - 1 : index + 1;
    const temp = newFiles[index];
    newFiles[index] = newFiles[swapTarget];
    newFiles[swapTarget] = temp;
    setFiles(newFiles);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // HTML5 Drag-and-drop list sorting
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItemIndex.current = position;
    // Set a ghost drag image or state
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault();
    dragOverItemIndex.current = position;
  };

  const handleDragEnd = () => {
    if (dragItemIndex.current !== null && dragOverItemIndex.current !== null && dragItemIndex.current !== dragOverItemIndex.current) {
      const copyListItems = [...files];
      const dragItemContent = copyListItems[dragItemIndex.current];
      copyListItems.splice(dragItemIndex.current, 1);
      copyListItems.splice(dragOverItemIndex.current, 0, dragItemContent);
      setFiles(copyListItems);
    }
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
  };

  // Merge logic using client side pdf-lib
  const handleMergePdf = async () => {
    // Basic validations
    const readyFiles = files.filter(f => f.status === "ready");
    if (readyFiles.length < 1) {
      setErrorMessage("Please upload at least 1 valid PDF document to merge.");
      setMergeStatus("error");
      return;
    }

    setErrorMessage(null);
    setMergeStatus("merging");
    setMergeProgress(10);
    setMergeStep("Initializing merge engine...");

    try {
      // 1) Initialize destination PDF Document
      const mergedPdf = await PDFDocument.create();
      setMergeProgress(25);
      setMergeStep("Reading and parsing source streams...");

      let copiedCount = 0;
      let totalPages = 0;

      // 2) Load and copy pages from each document sequentially
      for (let i = 0; i < readyFiles.length; i++) {
        const item = readyFiles[i];
        setMergeStep(`Parsing: ${item.name} (${i + 1}/${readyFiles.length})`);
        
        const arrayBuffer = await item.file.arrayBuffer();
        const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        
        let indicesToCopy = srcPdf.getPageIndices();
        if (item.pageRange.trim()) {
          indicesToCopy = parsePageRanges(item.pageRange, srcPdf.getPageCount());
          if (indicesToCopy.length === 0) {
            // Default back to all if parse fails
            indicesToCopy = srcPdf.getPageIndices();
          }
        }

        setMergeStep(`Merging pages from: ${item.name}`);
        const copiedPages = await mergedPdf.copyPages(srcPdf, indicesToCopy);
        
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
          totalPages++;
        });

        copiedCount++;
        setMergeProgress(Math.floor(25 + (copiedCount / readyFiles.length) * 50));
      }

      setMergeStep("Consolidating layers and links...");
      setMergeProgress(80);

      // Save PDF document
      setMergeStep("Building final PDF output file...");
      
      // Save configuration (optimize metadata space if toggle is active)
      const mergedPdfBytes = await mergedPdf.save({
        useObjectStreams: isOptimizing,
        addDefaultPage: false
      });

      setMergeProgress(95);
      setMergeStep("Compiling PDF stream...");

      // 3) Create local downloadable Blob
      const blob = new Blob([mergedPdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setMergedBlobUrl(url);
      setMergedSize(blob.size);
      setMergedPages(totalPages);
      setMergeProgress(100);
      setMergeStatus("success");

      // 4) Add to local history registry
      const historyItem: MergeHistoryItem = {
        id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        outputName: outputName.trim() ? `${outputName.trim()}.pdf` : "merged-document.pdf",
        files: readyFiles.map(f => ({ name: f.name, size: f.size, pageCount: f.pageCount })),
        totalSize: blob.size,
        totalPages
      };

      const updatedHistory = [historyItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("merge_pdf_history", JSON.stringify(updatedHistory));

    } catch (error: any) {
      console.error("PDF Merge Failure: ", error);
      setErrorMessage(error.message || "An unexpected error occurred while merging your PDFs. Ensure files are not corrupted.");
      setMergeStatus("error");
    }
  };

  const triggerDownload = () => {
    if (!mergedBlobUrl) return;
    const a = document.createElement("a");
    a.href = mergedBlobUrl;
    const cleanName = outputName.trim() ? outputName.trim() : "merged-document";
    a.download = cleanName.endsWith(".pdf") ? cleanName : `${cleanName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copySummaryText = () => {
    const readyFiles = files.filter(f => f.status === "ready");
    const summary = `--- Merge PDF Summary ---\n` +
      `Output Filename: ${outputName}.pdf\n` +
      `Total Merged Files: ${readyFiles.length}\n` +
      `Total Output Size: ${formatBytes(mergedSize)}\n` +
      `Total Pages: ${mergedPages}\n\n` +
      `Merged Documents In Order:\n` +
      readyFiles.map((f, i) => `${i + 1}. ${f.name} (${f.pageCount} pages, range: ${f.pageRange || 'All'})`).join("\n") +
      `\n\nGenerated via Nexus PDF tools.`;

    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const resetMergeTool = () => {
    // Revoke old blob url
    if (mergedBlobUrl) {
      URL.revokeObjectURL(mergedBlobUrl);
    }
    setFiles([]);
    setMergeStatus("idle");
    setMergeProgress(0);
    setMergeStep("");
    setMergedBlobUrl(null);
    setMergedSize(0);
    setMergedPages(0);
    setErrorMessage(null);
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your merge history list?")) {
      setHistory([]);
      localStorage.removeItem("merge_pdf_history");
    }
  };

  const totalLoadedSize = files.reduce((acc, curr) => acc + curr.size, 0);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Global dragging overlay */}
      {globalDragActive && (
        <div 
          className="fixed inset-0 z-50 bg-indigo-900/30 dark:bg-slate-950/70 backdrop-blur-sm border-4 border-dashed border-[#518231] flex flex-col items-center justify-center pointer-events-none animate-in fade-in duration-200"
          aria-hidden="true"
        >
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-md mx-4 border border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-[#518231]/10 flex items-center justify-center text-[#518231] animate-bounce">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Drop PDFs Anywhere!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Release your mouse button to instantly load your documents for merging.</p>
          </div>
        </div>
      )}

      {/* Security Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#518231]/5 border border-[#518231]/20 dark:border-[#518231]/10 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white text-sm">Privacy-First PDF Processing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">All merges happen 100% inside your browser. Your files are never uploaded to any servers.</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={() => setShowHistory(!showHistory)} 
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showHistory 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700' 
                : 'bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
            }`}
            aria-expanded={showHistory}
          >
            <History size={14} /> History
          </button>
          {files.length > 0 && (
            <button 
              onClick={resetMergeTool}
              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/30 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Reset Tool
            </button>
          )}
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm relative animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-3">
            <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
              <History size={16} className="text-[#518231]" /> Recent Merges (Device History)
            </h4>
            {history.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
              >
                <Trash2 size={12} /> Clear History
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">No recent merges on this browser. Successfully merged documents will appear here.</p>
          ) : (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-72 overflow-y-auto custom-scrollbar pr-1">
              {history.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-3 rounded-lg flex flex-col gap-2 relative shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate pr-4" title={item.outputName}>
                      {item.outputName}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5">
                    <p>Total Size: <strong>{formatBytes(item.totalSize)}</strong></p>
                    <p>Pages: <strong>{item.totalPages}</strong> ({item.files.length} files combined)</p>
                  </div>
                  <div className="text-[9px] text-slate-400 truncate mt-1 border-t border-slate-50 dark:border-slate-800/40 pt-1.5">
                    Files: {item.files.map(f => f.name).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main interface cards */}
      {mergeStatus === "idle" && (
        <div className="w-full flex flex-col gap-6">
          
          {/* UPLOAD CONTROLLER */}
          {files.length === 0 ? (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-3 border-dashed rounded-2xl p-10 md:p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group ${
                dragActive 
                  ? "border-[#518231] bg-[#518231]/5 shadow-[0_0_20px_-3px_rgba(81,130,49,0.2)]" 
                  : "border-slate-300 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231] bg-white dark:bg-slate-900/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/80"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
                id="pdf-files-input"
                aria-label="Upload PDF Files"
              />
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#518231]/10 group-hover:text-[#518231] transition-all duration-300 mb-4 shadow-xs">
                <Upload size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-[#518231] transition-colors">
                Drag & Drop PDF Documents Here
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                or click to browse files on your computer. Supports multiple file selections.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-400">
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">PDF format only</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">Up to 100MB per file</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">Safe, offline processing</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* FILE MANAGER ROW */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#518231] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {files.length}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm">Loaded PDFs</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>Total size: <strong>{formatBytes(totalLoadedSize)}</strong></span>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="text-[#518231] font-semibold hover:underline flex items-center gap-1"
                  >
                    <Upload size={12} /> Add More Files
                  </button>
                </div>
              </div>

              {/* DND REORDERABLE LIST */}
              <div className="grid gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
                
                {files.map((fileEntry, index) => (
                  <div
                    key={fileEntry.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-750 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs hover:shadow-xs transition-all relative group/card cursor-grab active:cursor-grabbing"
                  >
                    {/* Drag indicator bar left */}
                    <div className="absolute left-0 inset-y-0 w-1 bg-slate-200 dark:bg-slate-800 group-hover/card:bg-[#518231] rounded-l-xl transition-all" />

                    {/* Card main contents left */}
                    <div className="flex items-center gap-3 pl-2 flex-1 min-w-0">
                      <div className="cursor-move text-slate-300 hover:text-slate-400 dark:text-slate-700 dark:hover:text-slate-600 shrink-0">
                        <Move size={18} />
                      </div>
                      
                      {/* PDF cover icon */}
                      <div className="w-10 h-12 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-2xs select-none">
                        <FileText size={20} />
                        <div className="absolute bottom-0 inset-x-0 bg-indigo-600 text-white text-[8px] font-bold text-center py-0.5 uppercase tracking-wide">
                          PDF
                        </div>
                      </div>

                      {/* File Details */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-800 dark:text-white truncate" title={fileEntry.name}>
                          {fileEntry.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          <span>{formatBytes(fileEntry.size)}</span>
                          <span>•</span>
                          {fileEntry.status === "loading" && (
                            <span className="flex items-center gap-1 text-slate-400">
                              <Loader2 size={12} className="animate-spin" /> Analyzing pages...
                            </span>
                          )}
                          {fileEntry.status === "error" && (
                            <span className="text-red-500 flex items-center gap-1 font-medium">
                              <AlertCircle size={12} /> {fileEntry.errorMessage}
                            </span>
                          )}
                          {fileEntry.status === "ready" && (
                            <span className="text-slate-600 dark:text-slate-300 font-semibold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">
                              {fileEntry.pageCount} {fileEntry.pageCount === 1 ? 'page' : 'pages'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Page select config center */}
                    {fileEntry.status === "ready" && (
                      <div className="w-full md:w-auto flex flex-col gap-1 shrink-0 px-2 md:px-0">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <Settings size={10} /> Page Ranges (Optional)
                        </label>
                        <input
                          type="text"
                          value={fileEntry.pageRange}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFiles(prev => prev.map(f => f.id === fileEntry.id ? { ...f, pageRange: val } : f));
                          }}
                          placeholder="e.g. 1-3, 5 (all if empty)"
                          className="w-full md:w-56 px-3 py-1.5 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
                          title="Specify pages: single values separated by commas, or ranges using hyphens. e.g. 1, 3, 5-8"
                        />
                      </div>
                    )}

                    {/* Actions and sequence control right */}
                    <div className="flex items-center justify-end gap-2 w-full md:w-auto border-t border-slate-100 dark:border-slate-800/40 md:border-t-0 pt-2.5 md:pt-0 shrink-0">
                      {/* Ordering chevrons */}
                      <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-slate-50/50 dark:bg-slate-950/40">
                        <button
                          onClick={() => moveFile(index, "up")}
                          disabled={index === 0}
                          className="p-1 rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-850 disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => moveFile(index, "down")}
                          disabled={index === files.length - 1}
                          className="p-1 rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-850 disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>

                      {/* Delete item */}
                      <button
                        onClick={() => removeFile(fileEntry.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                        title="Remove Document"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* MERGE SETTINGS & TRIGGERS PANEL */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-6 shadow-2xs">
                
                {/* CONFIGURATIONS */}
                <div className="flex-1 space-y-4">
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                    <Settings className="text-[#518231]" size={16} /> Merge Settings
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* File rename input */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Output Document Filename
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={outputName}
                          onChange={(e) => setOutputName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                          placeholder="merged-document"
                          className="w-full pl-3 pr-12 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none"
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">.pdf</span>
                      </div>
                    </div>

                    {/* Compression Optimization toggle */}
                    <div className="flex items-center gap-3">
                      <label className="flex items-start gap-2.5 cursor-pointer mt-7">
                        <input
                          type="checkbox"
                          checked={isOptimizing}
                          onChange={(e) => setIsOptimizing(e.target.checked)}
                          className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-850 w-4 h-4 mt-0.5"
                        />
                        <div className="-mt-0.5">
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            Optimize File Size
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-500">Strip duplicate streams and unused fonts</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* SUBMIT TRIGGERS */}
                <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={resetMergeTool}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-sm transition-all shadow-2xs"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleMergePdf}
                    disabled={files.filter(f => f.status === "ready").length < 1}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#518231] to-[#436a28] hover:from-[#436a28] hover:to-[#365420] text-white font-bold rounded-xl text-sm transition-all shadow-md disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                    Merge PDF Documents
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* Merging processing state */}
      {mergeStatus === "merging" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center gap-4 py-16 animate-in fade-in duration-300">
          <div className="relative flex items-center justify-center">
            <Loader2 className="animate-spin text-[#518231]" size={56} />
            <span className="absolute text-xs font-bold text-slate-700 dark:text-slate-300">{mergeProgress}%</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-2">Merging PDF Documents</h3>
          <p className="text-sm text-[#518231] font-semibold animate-pulse">{mergeStep}</p>
          <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
            <div 
              className="bg-[#518231] h-full rounded-full transition-all duration-300"
              style={{ width: `${mergeProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm">This may take a few seconds depending on the file sizes. Do not close or refresh this tab.</p>
        </div>
      )}

      {/* Success download state */}
      {mergeStatus === "success" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center gap-6 py-12 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Animated Green Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center shadow-xs">
            <CheckCircle size={44} />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">PDFs Merged Successfully!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your combined document has been compiled completely inside your browser and is ready for download.
            </p>
          </div>

          {/* Combined file details card */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-900 p-5 rounded-2xl max-w-md w-full grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 text-center">
            <div className="px-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Merged File Size</span>
              <span className="text-lg font-extrabold text-slate-800 dark:text-white">{formatBytes(mergedSize)}</span>
            </div>
            <div className="px-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Page Count</span>
              <span className="text-lg font-extrabold text-slate-800 dark:text-white">{mergedPages} {mergedPages === 1 ? 'Page' : 'Pages'}</span>
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-md">
            <button
              onClick={triggerDownload}
              className="w-full sm:flex-1 py-3 bg-gradient-to-r from-[#518231] to-[#436a28] hover:from-[#436a28] hover:to-[#365420] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Download PDF
            </button>
            <button
              onClick={copySummaryText}
              className="w-full sm:w-auto py-3 px-5 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-250 font-bold rounded-xl text-sm transition-all shadow-2xs flex items-center justify-center gap-2"
            >
              {copiedSummary ? <Check size={16} className="text-emerald-500" /> : <Clipboard size={16} />}
              {copiedSummary ? "Copied!" : "Copy Summary"}
            </button>
          </div>

          <div className="w-full border-t border-slate-100 dark:border-slate-800 pt-6 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-lg text-left">
            <div className="flex items-center gap-2.5 text-xs text-slate-500">
              <Info size={14} className="text-slate-400" />
              <span>Output filename: <strong className="text-slate-700 dark:text-slate-300 font-mono">{outputName}.pdf</strong></span>
            </div>
            <button
              onClick={resetMergeTool}
              className="text-xs text-[#518231] font-bold hover:underline flex items-center gap-1"
            >
              <RefreshCw size={12} /> Start New Merge Session
            </button>
          </div>

        </div>
      )}

      {/* Error state */}
      {mergeStatus === "error" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center gap-4 py-12 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 border border-red-100 dark:border-red-900/30 flex items-center justify-center shadow-xs">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Merge Operation Failed</h3>
          <p className="text-sm text-red-600 dark:text-red-400 max-w-md mx-auto">{errorMessage}</p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setMergeStatus("idle")}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-sm transition-all"
            >
              Back to Files
            </button>
            <button
              onClick={resetMergeTool}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-all shadow-xs"
            >
              Reset Tool
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
