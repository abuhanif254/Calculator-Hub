"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Upload, Trash2, Settings, AlertCircle, Loader2, Download, 
  RefreshCw, History, Check, ZoomIn, ZoomOut, FileImage, 
  Eye, Sliders, Info, ShieldAlert, ArrowRight, ShieldCheck, X, FileText
} from "lucide-react";
import JSZip from "jszip";

// PDF.js dynamic loading configuration
const PDFJS_VERSION = '3.11.174';

interface QueueFile {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number;
  pdfjsDoc: any; // PDFJS Document instance
  status: "parsing" | "idle" | "rendering" | "completed" | "error";
  progress: number; // percentage
  estimatedSize: number; // in bytes
  selectedPages: number[]; // page numbers (1-indexed)
  results: { pageNum: number; blob: Blob; url: string; width: number; height: number }[];
  errorMessage?: string;
}

interface ConversionHistoryItem {
  id: string;
  timestamp: number;
  inputNames: string[];
  totalPageCount: number;
  exportedCount: number;
  dpi: number;
  quality: number;
  totalSize: number;
}

// ─────────────────────────────────────────────────────────
// THUMBNAIL SUB-COMPONENT (Lazy-rendered Canvas)
// ─────────────────────────────────────────────────────────
interface ThumbnailProps {
  pageNumber: number;
  pdfDoc: any; // PDFJS Document
  zoom: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  bgColor: string;
}

const Thumbnail = React.memo(({ pageNumber, pdfDoc, zoom, isSelected, onToggleSelect, bgColor }: ThumbnailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderStatus, setRenderStatus] = useState<"idle" | "rendering" | "done" | "error">("idle");
  const renderTaskRef = useRef<any>(null);

  useEffect(() => {
    let active = true;
    let observer: IntersectionObserver | null = null;

    const renderPage = async () => {
      if (!canvasRef.current || !pdfDoc) return;
      setRenderStatus("rendering");
      try {
        const page = await pdfDoc.getPage(pageNumber);
        
        // Base viewport scaled for a 140px thumbnail width
        const originalViewport = page.getViewport({ scale: 1.0 });
        const scale = (130 * zoom) / originalViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not get canvas context");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Cancel previous rendering if any
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        // Fill background color
        if (bgColor === "transparent" || bgColor === "#ffffff") {
          context.fillStyle = "#ffffff";
        } else {
          context.fillStyle = bgColor;
        }
        context.fillRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;
        
        await renderTask.promise;
        
        if (active) {
          setRenderStatus("done");
        }
      } catch (err: any) {
        if (err.name === "RenderingCancelledException") return;
        console.error("Error rendering thumbnail:", err);
        if (active) {
          setRenderStatus("error");
        }
      }
    };

    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          if (entries[0].isIntersecting) {
            obs.unobserve(entries[0].target);
            renderPage();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      active = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
      if (observer && containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [pageNumber, pdfDoc, zoom, bgColor]);

  return (
    <div
      ref={containerRef}
      onClick={onToggleSelect}
      className={`relative rounded-xl border-2 p-2 flex flex-col items-center gap-2 transition-all cursor-pointer bg-slate-50 dark:bg-slate-950/40 select-none group/thumb ${
        isSelected
          ? "border-[#518231] bg-green-50/20 dark:bg-green-950/10 shadow-[0_0_12px_-2px_rgba(81,130,49,0.25)]"
          : "border-slate-200 dark:border-slate-800 hover:border-[#518231]/40 dark:hover:border-[#518231]/40 hover:bg-slate-100/40 dark:hover:bg-slate-900/40"
      }`}
    >
      {/* Visual Checkbox */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleSelect();
        }}
        className={`absolute top-3 right-3 z-10 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
          isSelected 
            ? "bg-[#518231] border-[#518231] text-white" 
            : "bg-white/80 dark:bg-slate-900/80 border-slate-300 dark:border-slate-600 text-transparent"
        }`}
        aria-label={`Select page ${pageNumber}`}
      >
        <Check size={12} strokeWidth={3} />
      </button>

      {/* Page Canvas Box */}
      <div className="w-32 h-44 flex items-center justify-center bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-800/50 relative shadow-xs">
        {renderStatus === "idle" && (
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium animate-pulse">Pending...</div>
        )}
        {renderStatus === "rendering" && (
          <div className="flex flex-col items-center gap-1.5">
            <Loader2 className="animate-spin text-[#518231]" size={16} />
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Rendering</span>
          </div>
        )}
        {renderStatus === "error" && (
          <div className="text-[10px] text-red-500 font-bold flex flex-col items-center gap-1">
            <AlertCircle size={14} /> Error
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain ${
            renderStatus === "done" ? "opacity-100" : "opacity-0 absolute pointer-events-none"
          } transition-opacity duration-300`}
        />

        {/* Hover Highlight */}
        {renderStatus === "done" && (
          <div className="absolute inset-0 bg-[#518231]/5 dark:bg-[#518231]/10 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div className="bg-[#518231] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
              Page {pageNumber}
            </div>
          </div>
        )}
      </div>

      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
        Page {pageNumber}
      </span>
    </div>
  );
});

Thumbnail.displayName = "Thumbnail";

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export function PdfToJpgTool() {
  const [pdfjsLoaded, setPdfjsLoaded] = useState<boolean>(false);
  const [queue, setQueue] = useState<QueueFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  // Global settings
  const [quality, setQuality] = useState<number>(85); // 10 - 100
  const [dpi, setDpi] = useState<number>(150); // 72, 150, 300, 600, 0 (custom)
  const [customDpi, setCustomDpi] = useState<string>("200");
  const [filenamePattern, setFilenamePattern] = useState<string>("[name]-page-[num]");
  const [bgColor, setBgColor] = useState<string>("#ffffff"); // hex or transparent
  const [rangeInput, setRangeInput] = useState<string>("all"); // "all", "selected", or custom text

  // UI States
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"convert" | "history">("convert");
  const [historyList, setHistoryList] = useState<ConversionHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1); // 0.6 - 1.8
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Load PDFJS CDN script
  const loadPdfJs = useCallback((): Promise<any> => {
    return new Promise((resolve, reject) => {
      const windowAny = window as any;
      if (windowAny.pdfjsLib) {
        resolve(windowAny.pdfjsLib);
        return;
      }
      const existingScript = document.getElementById("pdfjs-cdn-script");
      if (existingScript) {
        const checkInterval = setInterval(() => {
          if (windowAny.pdfjsLib) {
            clearInterval(checkInterval);
            resolve(windowAny.pdfjsLib);
          }
        }, 100);
        return;
      }

      const script = document.createElement("script");
      script.id = "pdfjs-cdn-script";
      script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
      script.onload = () => {
        const pdfjsLib = windowAny.pdfjsLib;
        if (pdfjsLib) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
          resolve(pdfjsLib);
        } else {
          reject(new Error("pdfjsLib not found after CDN script load"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load PDFJS script from CDN"));
      document.body.appendChild(script);
    });
  }, []);

  // Initialize history list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pdf_to_jpg_history");
    if (saved) {
      try {
        setHistoryList(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Parse custom range string (e.g. "1-5, 8, 11-13")
  const parseRangeString = (rangeStr: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const clean = rangeStr.replace(/\s+/g, "");
    if (!clean || clean.toLowerCase() === "all") {
      return Array.from({ length: maxPages }, (_, i) => i + 1);
    }
    const parts = clean.split(",");
    for (const part of parts) {
      if (part.includes("-")) {
        const [startStr, endStr] = part.split("-");
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const s = Math.max(1, Math.min(start, end));
          const e = Math.min(maxPages, Math.max(start, end));
          for (let i = s; i <= e; i++) {
            pages.add(i);
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= maxPages) {
          pages.add(num);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  // Estimate output image file size based on DPI, Quality & Count
  const getDpiValue = (): number => {
    if (dpi === 0) {
      const val = parseInt(customDpi, 10);
      return isNaN(val) || val <= 0 ? 150 : val;
    }
    return dpi;
  };

  const getEstimatedSize = (pageCount: number): number => {
    const activeDpi = getDpiValue();
    // Empirical baseline: a 150 DPI page at 85% quality is ~150KB.
    // Scales quadratically with DPI and linearly with Quality.
    const dpiFactor = Math.pow(activeDpi / 150, 2);
    const qualityFactor = quality / 85;
    const bytesPerPage = 150 * 1024 * dpiFactor * qualityFactor;
    return Math.round(bytesPerPage * pageCount);
  };

  // Handle uploaded files parsing
  const addFilesToQueue = async (files: FileList | File[]) => {
    const pdfFiles = Array.from(files).filter(f => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
    if (pdfFiles.length === 0) return;

    // Load PDFJS once
    let pdfjs: any;
    try {
      pdfjs = await loadPdfJs();
      setPdfjsLoaded(true);
    } catch (e) {
      console.error(e);
      alert("Failed to initialize PDF parsing library. Check your internet connection.");
      return;
    }

    const newItems: QueueFile[] = pdfFiles.map(file => {
      const id = Math.random().toString(36).substring(2, 11);
      return {
        id,
        file,
        name: file.name,
        size: file.size,
        pageCount: 0,
        pdfjsDoc: null,
        status: "parsing",
        progress: 0,
        estimatedSize: 0,
        selectedPages: [],
        results: []
      };
    });

    setQueue(prev => [...prev, ...newItems]);
    
    // Set the first uploaded file as selected
    setSelectedFileId(prev => prev || newItems[0].id);

    // Parse each file asynchronously
    for (const item of newItems) {
      try {
        const arrayBuffer = await item.file.arrayBuffer();
        const doc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
        const pageCount = doc.numPages;
        const selected = Array.from({ length: pageCount }, (_, i) => i + 1);

        setQueue(prev => prev.map(q => q.id === item.id ? {
          ...q,
          status: "idle",
          pageCount,
          pdfjsDoc: doc,
          selectedPages: selected,
          estimatedSize: getEstimatedSize(selected.length)
        } : q));
      } catch (err: any) {
        console.error("Parsing failed for", item.name, err);
        setQueue(prev => prev.map(q => q.id === item.id ? {
          ...q,
          status: "error",
          errorMessage: err.message || "Corrupted PDF or decryption failed."
        } : q));
      }
    }
  };

  // Drag and drop events
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.add("border-[#518231]", "bg-green-50/10", "dark:bg-green-950/5");
    }
  };

  const onDragLeave = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.remove("border-[#518231]", "bg-green-50/10", "dark:bg-green-950/5");
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDragLeave();
    if (e.dataTransfer.files) {
      addFilesToQueue(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setQueue(prev => {
      const filtered = prev.filter(q => q.id !== id);
      // Clean up dynamic result URLs from memory
      const removed = prev.find(q => q.id === id);
      if (removed) {
        removed.results.forEach(r => URL.revokeObjectURL(r.url));
      }
      return filtered;
    });

    if (selectedFileId === id) {
      setSelectedFileId(prev => {
        const remaining = queue.filter(q => q.id !== id);
        return remaining.length > 0 ? remaining[0].id : null;
      });
    }
  };

  const clearQueue = () => {
    queue.forEach(q => q.results.forEach(r => URL.revokeObjectURL(r.url)));
    setQueue([]);
    setSelectedFileId(null);
  };

  // Toggle page selection for thumbnails
  const togglePageSelect = (fileId: string, pageNum: number) => {
    setQueue(prev => prev.map(q => {
      if (q.id !== fileId) return q;
      const isSelected = q.selectedPages.includes(pageNum);
      const updated = isSelected 
        ? q.selectedPages.filter(p => p !== pageNum) 
        : [...q.selectedPages, pageNum].sort((a, b) => a - b);
      return {
        ...q,
        selectedPages: updated,
        estimatedSize: getEstimatedSize(updated.length)
      };
    }));
  };

  // Utility page selections (All, Even, Odd, None)
  const setPageSelectionType = (type: "all" | "none" | "even" | "odd") => {
    if (!selectedFileId) return;
    setQueue(prev => prev.map(q => {
      if (q.id !== selectedFileId) return q;
      let pages: number[] = [];
      if (type === "all") pages = Array.from({ length: q.pageCount }, (_, i) => i + 1);
      else if (type === "even") pages = Array.from({ length: q.pageCount }, (_, i) => i + 1).filter(p => p % 2 === 0);
      else if (type === "odd") pages = Array.from({ length: q.pageCount }, (_, i) => i + 1).filter(p => p % 2 !== 0);
      return {
        ...q,
        selectedPages: pages,
        estimatedSize: getEstimatedSize(pages.length)
      };
    }));
  };

  // Sync settings updates to file estimated sizes
  useEffect(() => {
    setQueue(prev => prev.map(q => ({
      ...q,
      estimatedSize: getEstimatedSize(q.selectedPages.length)
    })));
  }, [quality, dpi, customDpi]);

  // Handle custom range manual text input updates
  const handleRangeInputChange = (val: string) => {
    setRangeInput(val);
    if (!selectedFileId) return;

    const currentFile = queue.find(q => q.id === selectedFileId);
    if (!currentFile || currentFile.pageCount === 0) return;

    if (val.trim() === "") return;

    let targetPages: number[] = [];
    if (val === "all") {
      targetPages = Array.from({ length: currentFile.pageCount }, (_, i) => i + 1);
    } else {
      targetPages = parseRangeString(val, currentFile.pageCount);
    }

    setQueue(prev => prev.map(q => q.id === selectedFileId ? {
      ...q,
      selectedPages: targetPages,
      estimatedSize: getEstimatedSize(targetPages.length)
    } : q));
  };

  // Helper naming parsing
  const resolveFilename = (pattern: string, originalName: string, pageNum: number): string => {
    const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
    const now = new Date();
    const dateStr = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0');
    
    let resolved = pattern
      .replace("[name]", baseName)
      .replace("[num]", String(pageNum))
      .replace("[date]", dateStr);

    if (!pattern.includes("[num]")) {
      resolved += `-${pageNum}`;
    }

    if (!resolved.toLowerCase().endsWith(".jpg") && !resolved.toLowerCase().endsWith(".jpeg")) {
      resolved += ".jpg";
    }
    return resolved;
  };

  // ─────────────────────────────────────────────────────────
  // CONVERSION CORE ENGINE
  // ─────────────────────────────────────────────────────────
  const startConversion = async () => {
    if (queue.length === 0) return;
    const idleFiles = queue.filter(q => q.status === "idle" && q.selectedPages.length > 0);
    if (idleFiles.length === 0) {
      alert("No files in queue or no pages selected for conversion.");
      return;
    }

    setIsProcessing(true);

    const activeDpi = getDpiValue();
    const scale = activeDpi / 72;
    const jpegQuality = quality / 100;

    let overallPagesExported = 0;
    let overallSizeSum = 0;
    const inputNames = idleFiles.map(f => f.name);
    let totalInputPages = idleFiles.reduce((acc, f) => acc + f.selectedPages.length, 0);

    for (const item of queue) {
      if (item.status !== "idle" || item.selectedPages.length === 0) continue;

      // Update status to rendering
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "rendering", progress: 0 } : q));

      const resultsList: { pageNum: number; blob: Blob; url: string; width: number; height: number }[] = [];
      let pagesProcessed = 0;

      // Process pages sequentially per file to manage browser RAM safely
      for (const pageNum of item.selectedPages) {
        try {
          const page = await item.pdfjsDoc.getPage(pageNum);
          const originalViewport = page.getViewport({ scale: 1.0 });
          const viewport = page.getViewport({ scale });

          // Off-screen canvas rendering
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const context = canvas.getContext("2d");
          if (!context) throw new Error("Could not construct 2D context");

          // Background painting
          if (bgColor === "transparent") {
            context.fillStyle = "#ffffff";
          } else {
            context.fillStyle = bgColor;
          }
          context.fillRect(0, 0, canvas.width, canvas.height);

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          
          await page.render(renderContext).promise;

          // Convert to blob
          const result: { blob: Blob; width: number; height: number } = await new Promise((resolve, reject) => {
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve({ blob, width: viewport.width, height: viewport.height });
                } else {
                  reject(new Error("Canvas blob extraction failed."));
                }
              },
              "image/jpeg",
              jpegQuality
            );
          });

          // Free canvas memory immediately
          canvas.width = 0;
          canvas.height = 0;

          const blobUrl = URL.createObjectURL(result.blob);
          resultsList.push({
            pageNum,
            blob: result.blob,
            url: blobUrl,
            width: result.width,
            height: result.height
          });

          pagesProcessed++;
          overallPagesExported++;
          overallSizeSum += result.blob.size;

          const progressPercent = Math.round((pagesProcessed / item.selectedPages.length) * 100);
          setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: progressPercent } : q));
        } catch (err) {
          console.error("Rendering failed for page", pageNum, err);
        }
      }

      setQueue(prev => prev.map(q => q.id === item.id ? {
        ...q,
        status: "completed",
        progress: 100,
        results: resultsList
      } : q));
    }

    // Register in history
    if (overallPagesExported > 0) {
      const historyItem: ConversionHistoryItem = {
        id: Math.random().toString(36).substring(2, 11),
        timestamp: Date.now(),
        inputNames,
        totalPageCount: totalInputPages,
        exportedCount: overallPagesExported,
        dpi: activeDpi,
        quality,
        totalSize: overallSizeSum
      };

      const updatedHistory = [historyItem, ...historyList].slice(0, 20);
      setHistoryList(updatedHistory);
      localStorage.setItem("pdf_to_jpg_history", JSON.stringify(updatedHistory));
    }

    setIsProcessing(false);
    triggerAutoDownload();
  };

  // Automatic downloader trigger once completed
  const triggerAutoDownload = () => {
    // Collect all generated page results across all files
    const allResults: { name: string; blob: Blob; filename: string }[] = [];
    queue.forEach(item => {
      item.results.forEach(res => {
        const outName = resolveFilename(filenamePattern, item.name, res.pageNum);
        allResults.push({
          name: item.name,
          blob: res.blob,
          filename: outName
        });
      });
    });

    if (allResults.length === 0) return;

    if (allResults.length === 1) {
      // Direct download JPG
      const link = document.createElement("a");
      link.href = URL.createObjectURL(allResults[0].blob);
      link.download = allResults[0].filename;
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      // Build ZIP file using JSZip
      const zip = new JSZip();
      allResults.forEach(res => {
        zip.file(res.filename, res.blob);
      });
      zip.generateAsync({ type: "blob" }).then(content => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "nexus-converted-images.zip";
        link.click();
        URL.revokeObjectURL(link.href);
      });
    }
  };

  // Download individual page thumbnail
  const downloadSinglePage = (file: QueueFile, res: any) => {
    const outName = resolveFilename(filenamePattern, file.name, res.pageNum);
    const link = document.createElement("a");
    link.href = res.url;
    link.download = outName;
    link.click();
  };

  // Clear history items
  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your device history?")) {
      setHistoryList([]);
      localStorage.removeItem("pdf_to_jpg_history");
    }
  };

  const selectedFile = queue.find(q => q.id === selectedFileId);

  // Bytes size formatter
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* ── Tabs Navigation ── */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab("convert")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all outline-none ${
            activeTab === "convert"
              ? "border-[#518231] text-[#518231]"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Sliders size={16} />
          Convert PDF
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all outline-none ${
            activeTab === "history"
              ? "border-[#518231] text-[#518231]"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <History size={16} />
          Recent Conversions
          {historyList.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
              {historyList.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === "history" ? (
        // ── HISTORY COMPONENT PANEL ──
        <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History size={18} className="text-[#518231]" />
              Conversion History (On This Device)
            </h3>
            {historyList.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-bold transition-all"
              >
                Clear History
              </button>
            )}
          </div>

          {historyList.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">No conversion history found on this device.</p>
              <button
                onClick={() => setActiveTab("convert")}
                className="text-xs text-[#518231] hover:underline font-bold"
              >
                Start your first conversion now
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[480px] overflow-y-auto custom-scrollbar pr-2">
              {historyList.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 break-all">
                      {item.inputNames.join(", ")}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span>DPI: <strong>{item.dpi}</strong></span>
                      <span>Quality: <strong>{item.quality}%</strong></span>
                      <span>Converted: <strong>{item.exportedCount} images</strong></span>
                      <span>Size: <strong>{formatBytes(item.totalSize)}</strong></span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-400 dark:text-slate-500 shrink-0">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // ── CONVERT COMPONENT PANEL ──
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: UPLOAD & SETTINGS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* DROPZONE AREA */}
            <div
              ref={dropzoneRef}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231]/70 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-50/50 dark:bg-slate-900/10 hover:bg-green-50/5 dark:hover:bg-green-950/5 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                className="hidden"
                onChange={(e) => e.target.files && addFilesToQueue(e.target.files)}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800/80 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Upload className="text-[#518231]" size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">
                    Drag & Drop PDF files here
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    or click to browse from device (Multiple PDFs supported)
                  </p>
                </div>
              </div>
            </div>

            {/* FILE QUEUE */}
            {queue.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    Queue list ({queue.length} files)
                  </h4>
                  <button
                    onClick={clearQueue}
                    disabled={isProcessing}
                    className="text-[11px] font-bold text-red-500 hover:underline disabled:opacity-50"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                  {queue.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => !isProcessing && item.status !== "parsing" && setSelectedFileId(item.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        selectedFileId === item.id
                          ? "border-[#518231]/80 bg-green-50/10 dark:bg-green-950/5"
                          : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          item.status === "error" ? "bg-red-50 text-red-500 dark:bg-red-950/20" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        }`}>
                          <FileText size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">
                            {item.name}
                          </p>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {formatBytes(item.size)}
                            {item.pageCount > 0 && ` • ${item.pageCount} pages`}
                          </span>
                        </div>
                      </div>

                      {/* Status / Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {item.status === "parsing" && (
                          <Loader2 className="animate-spin text-[#518231]" size={14} />
                        )}
                        {item.status === "rendering" && (
                          <div className="flex items-center gap-1.5 text-[#518231] text-[10px] font-bold">
                            <span>{item.progress}%</span>
                            <Loader2 className="animate-spin" size={12} />
                          </div>
                        )}
                        {item.status === "completed" && (
                          <span className="text-[10px] bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 font-bold px-2 py-0.5 rounded-full">
                            Success
                          </span>
                        )}
                        {item.status === "error" && (
                          <span className="text-[10px] bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 font-bold px-2 py-0.5 rounded-full">
                            Failed
                          </span>
                        )}
                        {!isProcessing && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(item.id);
                            }}
                            className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            aria-label="Remove file"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS PANEL */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-5">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Settings size={14} className="text-[#518231]" /> Output Conversion Options
              </h4>

              {/* Quality Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700 dark:text-slate-300">JPEG Compression Quality</label>
                  <span className="font-extrabold text-[#518231]">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                  disabled={isProcessing}
                  className="w-full accent-[#518231]"
                />
                <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-bold">
                  <button
                    onClick={() => setQuality(30)}
                    disabled={isProcessing}
                    className={`py-1 rounded border transition-all ${quality === 30 ? "bg-[#518231]/10 text-[#518231] border-[#518231]" : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                  >
                    Low (30%)
                  </button>
                  <button
                    onClick={() => setQuality(60)}
                    disabled={isProcessing}
                    className={`py-1 rounded border transition-all ${quality === 60 ? "bg-[#518231]/10 text-[#518231] border-[#518231]" : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                  >
                    Med (60%)
                  </button>
                  <button
                    onClick={() => setQuality(85)}
                    disabled={isProcessing}
                    className={`py-1 rounded border transition-all ${quality === 85 ? "bg-[#518231]/10 text-[#518231] border-[#518231]" : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                  >
                    High (85%)
                  </button>
                  <button
                    onClick={() => setQuality(100)}
                    disabled={isProcessing}
                    className={`py-1 rounded border transition-all ${quality === 100 ? "bg-[#518231]/10 text-[#518231] border-[#518231]" : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                  >
                    Max (100%)
                  </button>
                </div>
              </div>

              {/* Resolution DPI Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">DPI Resolution</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[72, 150, 300, 600].map(val => (
                    <button
                      key={val}
                      onClick={() => setDpi(val)}
                      disabled={isProcessing}
                      className={`py-1.5 rounded-lg border text-[11px] font-extrabold transition-all ${
                        dpi === val 
                          ? "bg-[#518231] border-[#518231] text-white" 
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {val} DPI
                    </button>
                  ))}
                  <button
                    onClick={() => setDpi(0)}
                    disabled={isProcessing}
                    className={`py-1.5 rounded-lg border text-[11px] font-extrabold transition-all ${
                      dpi === 0 
                        ? "bg-[#518231] border-[#518231] text-white" 
                        : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Custom
                  </button>
                </div>
                {dpi === 0 && (
                  <div className="flex items-center gap-2 pt-1.5">
                    <input
                      type="number"
                      min="50"
                      max="1200"
                      value={customDpi}
                      disabled={isProcessing}
                      onChange={(e) => setCustomDpi(e.target.value)}
                      placeholder="e.g. 200"
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-[#518231]"
                    />
                    <span className="text-xs text-slate-500 shrink-0">Custom DPI (50-1200)</span>
                  </div>
                )}
              </div>

              {/* Background Color Painting */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Background Canvas Color</label>
                <div className="flex items-center gap-2">
                  {[
                    { hex: "#ffffff", name: "White" },
                    { hex: "#f3f4f6", name: "Light Grey" },
                    { hex: "#fefcbf", name: "Yellowish" },
                    { hex: "#000000", name: "Black" },
                    { hex: "transparent", name: "Transparent" }
                  ].map(color => (
                    <button
                      key={color.name}
                      onClick={() => setBgColor(color.hex)}
                      disabled={isProcessing}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                        bgColor === color.hex ? "border-[#518231] scale-110 shadow-md" : "border-slate-200 dark:border-slate-700 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex === "transparent" ? "#ffffff" : color.hex }}
                      title={color.name}
                    >
                      {bgColor === color.hex && (
                        <Check size={12} className={color.hex === "#ffffff" || color.hex === "#fefcbf" || color.hex === "transparent" ? "text-slate-900" : "text-white"} />
                      )}
                      {color.hex === "transparent" && (
                        <div className="w-full h-full bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[size:6px_6px] bg-[position:0_0,0_3px,3px_-3px,-3px_0] opacity-30 rounded-full" />
                      )}
                    </button>
                  ))}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-2 uppercase">
                    {bgColor === "transparent" ? "White Fallback (transparent)" : bgColor}
                  </span>
                </div>
              </div>

              {/* Filename Suffix Pattern */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Naming Pattern Prefix</label>
                <input
                  type="text"
                  value={filenamePattern}
                  disabled={isProcessing}
                  onChange={(e) => setFilenamePattern(e.target.value)}
                  placeholder="e.g. [name]-page-[num]"
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-[#518231]"
                />
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-tight">
                  Supports variables: <strong>[name]</strong> (original filename), <strong>[num]</strong> (page number), <strong>[date]</strong> (today's date).
                </span>
              </div>
            </div>

            {/* SECURITY/PRIVACY ASSURANCE BANNERS */}
            <div className="bg-green-50/20 dark:bg-green-950/5 border border-green-200/50 dark:border-green-950/20 p-4 rounded-xl flex items-start gap-3">
              <ShieldCheck size={20} className="text-[#518231] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">100% Client-Side Conversion</h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  Your files never leave your device. All rendering, compression, and compiling are performed locally inside your browser sandbox.
                </p>
              </div>
            </div>

            {/* PROCESS TRIGGER BUTTON */}
            {queue.length > 0 && (
              <button
                onClick={startConversion}
                disabled={isProcessing || queue.some(q => q.status === "parsing")}
                className="w-full bg-[#518231] hover:bg-[#436e29] disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#518231]/10 hover:shadow-xl hover:shadow-[#518231]/15 active:scale-98 transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Converting Pages...
                  </>
                ) : (
                  <>
                    <FileImage size={18} />
                    Convert PDF to JPG
                  </>
                )}
              </button>
            )}

          </div>

          {/* RIGHT COLUMN: PAGE PREVIEWS / COMPLETED RESULTS */}
          <div className="lg:col-span-7 space-y-6">
            {!selectedFile ? (
              // Empty State
              <div className="h-full min-h-[350px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-600 bg-slate-50/5 dark:bg-slate-900/5">
                <FileImage size={38} className="stroke-1 mb-3 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No active document</h4>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 max-w-[280px]">
                  Upload a PDF document on the left to display visual page previews and select specific pages.
                </p>
              </div>
            ) : (
              // Active Previews & Conversion Outputs
              <div className="space-y-6">
                
                {/* Visual Options Bar */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      Page Selection Controls
                    </h4>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Selected: <span className="text-[#518231] font-extrabold">{selectedFile.selectedPages.length}</span> of {selectedFile.pageCount} pages ({formatBytes(selectedFile.estimatedSize)} estimated size)
                    </p>
                  </div>

                  {/* Actions & Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setPageSelectionType("all")}
                      disabled={isProcessing}
                      className="px-2.5 py-1.5 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold rounded-lg transition-all"
                    >
                      All
                    </button>
                    <button
                      onClick={() => setPageSelectionType("even")}
                      disabled={isProcessing}
                      className="px-2.5 py-1.5 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold rounded-lg transition-all"
                    >
                      Even Pages
                    </button>
                    <button
                      onClick={() => setPageSelectionType("odd")}
                      disabled={isProcessing}
                      className="px-2.5 py-1.5 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold rounded-lg transition-all"
                    >
                      Odd Pages
                    </button>
                    <button
                      onClick={() => setPageSelectionType("none")}
                      disabled={isProcessing}
                      className="px-2.5 py-1.5 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold rounded-lg transition-all text-red-500 hover:text-red-600"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                {/* Range Manual Selection & Zoom Toolbar */}
                <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Manual Range Input */}
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Custom Page Range</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={rangeInput}
                        disabled={isProcessing}
                        onChange={(e) => handleRangeInputChange(e.target.value)}
                        placeholder="e.g. 1-5, 8, 10-15"
                        className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:border-[#518231]"
                      />
                    </div>
                  </div>

                  {/* Zoom controls */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Zoom</span>
                    <button
                      onClick={() => setZoom(prev => Math.max(0.6, prev - 0.2))}
                      className="p-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                      title="Zoom Out"
                    >
                      <ZoomOut size={14} />
                    </button>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 w-10 text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={() => setZoom(prev => Math.min(1.8, prev + 0.2))}
                      className="p-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                      title="Zoom In"
                    >
                      <ZoomIn size={14} />
                    </button>
                  </div>

                </div>

                {selectedFile.status === "completed" && selectedFile.results.length > 0 ? (
                  // ── COMPLETED RESULTS VIEW ──
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Check size={14} className="text-green-500" /> Converted JPG Outputs ({selectedFile.results.length} images)
                      </h4>
                      <button
                        onClick={triggerAutoDownload}
                        className="text-xs text-[#518231] hover:underline font-extrabold flex items-center gap-1.5"
                      >
                        <Download size={13} />
                        Download ZIP Again
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {selectedFile.results.map((res) => (
                        <div key={res.pageNum} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-col items-center gap-3 relative shadow-xs group/item">
                          
                          <div className="w-full h-40 bg-slate-50 dark:bg-slate-950/40 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
                            <img
                              src={res.url}
                              alt={`Page ${res.pageNum}`}
                              className="w-full h-full object-contain"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <a
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-white text-slate-800 rounded-full hover:bg-slate-100 shadow-lg"
                                title="Open full resolution in new tab"
                              >
                                <Eye size={14} />
                              </a>
                              <button
                                onClick={() => downloadSinglePage(selectedFile, res)}
                                className="p-2 bg-[#518231] text-white rounded-full hover:bg-[#436e29] shadow-lg"
                                title="Download individual JPG"
                              >
                                <Download size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="w-full flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-bold px-1">
                            <span>Page {res.pageNum}</span>
                            <span>{res.width}x{res.height} px</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // ── GRID GALLERY THUMBNAILS ──
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[460px] overflow-y-auto custom-scrollbar pr-2 p-1">
                    {selectedFile.pageCount > 0 && Array.from({ length: selectedFile.pageCount }, (_, i) => i + 1).map((pageNum) => (
                      <Thumbnail
                        key={pageNum}
                        pageNumber={pageNum}
                        pdfDoc={selectedFile.pdfjsDoc}
                        zoom={zoom}
                        isSelected={selectedFile.selectedPages.includes(pageNum)}
                        bgColor={bgColor}
                        onToggleSelect={() => togglePageSelect(selectedFile.id, pageNum)}
                      />
                    ))}
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
