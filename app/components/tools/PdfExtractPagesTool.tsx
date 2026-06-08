"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download,
  RefreshCw, History, ShieldCheck, Check, Columns, Layers, CheckSquare,
  ZoomIn, ZoomOut, Plus, X, List, Grid, Filter, Bookmark, Keyboard, ShieldAlert,
  Lock, Unlock
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { decryptPDF } from "@pdfsmaller/pdf-decrypt";

// --- Types ---

interface PdfMetadata {
  title?: string;
  author?: string;
  creator?: string;
  producer?: string;
  version?: string;
}

interface ExtractHistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
  originalPageCount: number;
  extractedPageCount: number;
  mode: "single" | "separate" | "ranges";
  outputSize: number;
}

interface SelectionPreset {
  id: string;
  name: string;
  rangeText: string;
}

const PDFJS_VERSION = '3.11.174';

// ─────────────────────────────────────────────────────────
// THUMBNAIL SUB-COMPONENT (Lazy-rendered Canvas)
// ─────────────────────────────────────────────────────────
interface ThumbnailProps {
  pageNumber: number;
  pdfDoc: any; // PDFJS Document
  zoom: number;
  isSelected: boolean;
  onToggleSelect: (isShiftKey: boolean) => void;
  viewMode: "grid" | "list";
}

function Thumbnail({ pageNumber, pdfDoc, zoom, isSelected, onToggleSelect, viewMode }: ThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderStatus, setRenderStatus] = useState<"idle" | "rendering" | "done" | "error">("idle");
  const renderTaskRef = useRef<any>(null);
  const [pageSizeInfo, setPageSizeInfo] = useState<string>("Loading size...");

  useEffect(() => {
    let active = true;
    let observer: IntersectionObserver | null = null;

    const renderPage = async () => {
      if (!canvasRef.current || !pdfDoc) return;
      setRenderStatus("rendering");
      try {
        const page = await pdfDoc.getPage(pageNumber);
        
        // Dimensions info
        const view = page.getViewport({ scale: 1.0 });
        const widthIn = view.width / 72;
        const heightIn = view.height / 72;
        setPageSizeInfo(`${widthIn.toFixed(1)} x ${heightIn.toFixed(1)} in`);

        // Base viewport scaled for thumbnail width (130px for grid, 60px for list)
        const baseWidth = viewMode === "grid" ? 130 : 60;
        const scale = (baseWidth * zoom) / view.width;
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
        { threshold: 0.02 }
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
  }, [pageNumber, pdfDoc, zoom, viewMode]);

  if (viewMode === "list") {
    return (
      <div
        ref={containerRef}
        onClick={(e) => onToggleSelect(e.shiftKey)}
        className={`flex items-center justify-between p-3 border rounded-xl transition-all cursor-pointer select-none ${
          isSelected 
            ? "border-[#518231] bg-green-50/15 dark:bg-green-950/10" 
            : "border-slate-200 dark:border-slate-800 hover:border-[#518231]/40 bg-white dark:bg-slate-900"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-14 bg-slate-50 dark:bg-slate-950 rounded border flex items-center justify-center shrink-0 overflow-hidden">
            <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Page {pageNumber}</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{pageSizeInfo}</p>
          </div>
        </div>
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(e.shiftKey);
          }}
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
            isSelected 
              ? "bg-[#518231] border-[#518231] text-white" 
              : "bg-white dark:bg-slate-900 border-slate-350 dark:border-slate-700 text-transparent"
          }`}
        >
          <Check size={12} strokeWidth={3} />
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={(e) => onToggleSelect(e.shiftKey)}
      className={`relative rounded-xl border-2 p-2.5 flex flex-col items-center gap-2.5 transition-all cursor-pointer bg-slate-50 dark:bg-slate-950/40 select-none group/thumb ${
        isSelected
          ? "border-[#518231] bg-green-50/20 dark:bg-green-950/10 shadow-sm"
          : "border-slate-200 dark:border-slate-850 hover:border-[#518231]/40 dark:hover:border-[#518231]/40 hover:bg-slate-100/40"
      }`}
    >
      {/* Checkbox badge */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleSelect(e.shiftKey);
        }}
        className={`absolute top-2.5 right-2.5 z-10 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
          isSelected 
            ? "bg-[#518231] border-[#518231] text-white" 
            : "bg-white/90 dark:bg-slate-900/90 border-slate-300 dark:border-slate-700 text-transparent"
        }`}
      >
        <Check size={12} strokeWidth={3} />
      </button>

      {/* Canvas container */}
      <div className="w-32 h-44 flex items-center justify-center bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-800/50 relative shadow-2xs">
        {renderStatus === "idle" && (
          <div className="text-[10px] text-slate-400 font-semibold">Loading</div>
        )}
        {renderStatus === "rendering" && (
          <Loader2 className="animate-spin text-[#518231]" size={16} />
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
        
        {renderStatus === "done" && (
          <div className="absolute inset-0 bg-[#518231]/5 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div className="bg-[#518231] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow">
              Page {pageNumber}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center leading-none">
        <span className="text-[11px] font-black text-slate-700 dark:text-slate-350">
          Page {pageNumber}
        </span>
        <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold mt-1">
          {pageSizeInfo}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export function PdfExtractPagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [fileSize, setFileSize] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "reading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [requiresPassword, setRequiresPassword] = useState<boolean>(false);

  // PDFJS Objects
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);

  // Selection states
  const [selectedPages, setSelectedPages] = useState<boolean[]>([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);
  const [rangeInputText, setRangeInputText] = useState<string>("");
  const [zoom, setZoom] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extraction Options
  const [extractionMode, setExtractionMode] = useState<"single" | "separate" | "ranges">("single");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Presets and local logs
  const [history, setHistory] = useState<ExtractHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [presets, setPresets] = useState<SelectionPreset[]>([]);
  const [showSavePresetModal, setShowSavePresetModal] = useState<boolean>(false);
  const [newPresetName, setNewPresetName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Load Saved Presets & History
  useEffect(() => {
    const savedHistory = localStorage.getItem("pdf_extract_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.warn("Failed to load extract history", e);
      }
    }

    const savedPresets = localStorage.getItem("pdf_extract_presets");
    if (savedPresets) {
      try {
        setPresets(JSON.parse(savedPresets));
      } catch (e) {
        console.warn("Failed to load presets", e);
      }
    } else {
      const defaultPresets: SelectionPreset[] = [
        { id: "p-first3", name: "First 3 Pages", rangeText: "1-3" },
        { id: "p-odd", name: "Odd Pages Only", rangeText: "odd" },
        { id: "p-even", name: "Even Pages Only", rangeText: "even" }
      ];
      setPresets(defaultPresets);
      localStorage.setItem("pdf_extract_presets", JSON.stringify(defaultPresets));
    }
  }, []);

  // Sync presets
  const savePresets = (updated: SelectionPreset[]) => {
    setPresets(updated);
    localStorage.setItem("pdf_extract_presets", JSON.stringify(updated));
  };

  // Bidirectional Range Text Sync: Selected Array -> Textbox string
  useEffect(() => {
    if (pageCount === 0) return;
    const ranges: string[] = [];
    let start: number | null = null;
    
    for (let i = 0; i < selectedPages.length; i++) {
      if (selectedPages[i]) {
        if (start === null) {
          start = i + 1;
        }
      } else {
        if (start !== null) {
          const end = i;
          if (start === end) {
            ranges.push(`${start}`);
          } else {
            ranges.push(`${start}-${end}`);
          }
          start = null;
        }
      }
    }
    
    if (start !== null) {
      const end = selectedPages.length;
      if (start === end) {
        ranges.push(`${start}`);
      } else {
        ranges.push(`${start}-${end}`);
      }
    }

    const rangeText = ranges.join(", ");
    setRangeInputText(rangeText);
  }, [selectedPages, pageCount]);

  // Handle Drag / Drop events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => true);
    } else if (e.type === "dragleave") {
      setDragActive(prev => false);
    }
  }, []);

  const [dragActive, setDragActive] = useState<boolean>(false);

  // Setup Document details via pdf-lib and PDF.js
  const loadPdfDocument = async (targetFile: File, pass = "") => {
    setUploadStatus("reading");
    setErrorMessage(null);
    setRequiresPassword(false);

    try {
      const arrayBuffer = await targetFile.arrayBuffer();
      let loadTarget: ArrayBuffer | Uint8Array = arrayBuffer;

      if (pass) {
        loadTarget = await decryptPDF(new Uint8Array(arrayBuffer), pass);
      }

      // Check encryption on load
      const pdfLibDoc = await PDFDocument.load(loadTarget, { ignoreEncryption: true });
      const pagesCount = pdfLibDoc.getPageCount();

      // Load PDF.js Doc
      const pdfjsLib = await loadPdfJs();
      const docData = new Uint8Array(loadTarget.slice(0));
      const loadingTask = pdfjsLib.getDocument({
        data: docData,
        password: pass
      });
      const jsDoc = await loadingTask.promise;

      setPdfjsDoc(jsDoc);
      setPageCount(pagesCount);
      setFileSize(targetFile.size);
      setFile(targetFile);
      setSelectedPages(new Array(pagesCount).fill(true)); // Select all by default
      setUploadStatus("ready");
    } catch (err: any) {
      const isEncrypted = err.message && (
        err.message.includes("encrypted") || 
        err.message.includes("password") || 
        err.message.includes("decrypt")
      );

      if (isEncrypted) {
        setRequiresPassword(true);
        setUploadStatus("idle");
      } else {
        console.error("Error loading PDF document:", err);
        setErrorMessage(err.message || "Failed to parse document. File might be corrupted.");
        setUploadStatus("error");
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadPdfDocument(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadPdfDocument(e.dataTransfer.files[0]);
    }
  };

  const handleLockedPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      loadPdfDocument(file, password);
    }
  };

  // Visual thumbnail click toggles
  const handlePageToggle = (index: number, isShiftKey = false) => {
    setSelectedPages(prev => {
      const updated = [...prev];
      const targetState = !updated[index];
      
      if (isShiftKey && lastSelectedIndex !== null) {
        const start = Math.min(lastSelectedIndex, index);
        const end = Math.max(lastSelectedIndex, index);
        for (let i = start; i <= end; i++) {
          updated[i] = targetState;
        }
      } else {
        updated[index] = targetState;
        setLastSelectedIndex(index);
      }
      return updated;
    });
  };

  // Text Selection ranges (e.g. 1-5,10,15-20)
  const applyRangeTextSelection = (text: string) => {
    if (!text.trim()) {
      setSelectedPages(new Array(pageCount).fill(false));
      return;
    }

    const lower = text.toLowerCase().trim();
    if (lower === "odd") {
      setSelectedPages(prev => prev.map((_, idx) => idx % 2 === 0));
      return;
    }
    if (lower === "even") {
      setSelectedPages(prev => prev.map((_, idx) => idx % 2 !== 0));
      return;
    }

    const selected = new Array(pageCount).fill(false);
    const blocks = text.split(",");
    
    blocks.forEach(block => {
      const trimmed = block.trim();
      if (!trimmed) return;
      
      if (trimmed.includes("-")) {
        const parts = trimmed.split("-");
        const start = parseInt(parts[0], 10);
        const end = parseInt(parts[1], 10);
        if (!isNaN(start) && !isNaN(end)) {
          const sIdx = Math.min(start, end) - 1;
          const eIdx = Math.max(start, end) - 1;
          for (let i = Math.max(0, sIdx); i <= Math.min(pageCount - 1, eIdx); i++) {
            selected[i] = true;
          }
        }
      } else {
        const pageNum = parseInt(trimmed, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pageCount) {
          selected[pageNum - 1] = true;
        }
      }
    });
    
    setSelectedPages(selected);
  };

  // Smart Filters
  const applySelectAll = () => setSelectedPages(new Array(pageCount).fill(true));
  const applySelectNone = () => setSelectedPages(new Array(pageCount).fill(false));
  const applySelectOdd = () => setSelectedPages(prev => prev.map((_, i) => i % 2 === 0));
  const applySelectEven = () => setSelectedPages(prev => prev.map((_, i) => i % 2 !== 0));
  const applySelectFirstN = (n: number) => {
    setSelectedPages(prev => prev.map((_, i) => i < n));
  };
  const applySelectLastN = (n: number) => {
    setSelectedPages(prev => prev.map((_, i) => i >= pageCount - n));
  };

  // Keyboard Shortcuts Setup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (uploadStatus !== "ready") return;
      
      // Don't intercept shortcuts when editing inputs/textareas
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.getAttribute("contenteditable") === "true")) {
        return;
      }

      // Ctrl + A
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        applySelectAll();
      }
      // Delete
      if (e.key === "Delete") {
        e.preventDefault();
        applySelectNone();
      }
      // Ctrl + S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleExtractPages();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [uploadStatus, selectedPages, extractionMode]);

  // Core Page Extraction via pdf-lib
  const handleExtractPages = async () => {
    const selectedIndices = selectedPages
      .map((sel, idx) => (sel ? idx : -1))
      .filter(i => i !== -1);

    if (selectedIndices.length === 0) {
      alert("Please select at least one page to extract.");
      return;
    }

    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      let loadTarget: ArrayBuffer | Uint8Array = arrayBuffer;
      if (password) {
        loadTarget = await decryptPDF(new Uint8Array(arrayBuffer), password);
      }

      const srcDoc = await PDFDocument.load(loadTarget, { ignoreEncryption: true });
      
      // Helper to generate filename based on modes
      const baseName = file.name.replace(/\.[^/.]+$/, "");

      if (extractionMode === "single") {
        const subDoc = await PDFDocument.create();
        const copiedPages = await subDoc.copyPages(srcDoc, selectedIndices);
        copiedPages.forEach(p => subDoc.addPage(p));
        
        const bytes = await subDoc.save();
        const blob = new Blob([bytes as any], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${baseName}_extracted.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        saveHistoryItem(selectedIndices.length, "single", bytes.length);

      } else if (extractionMode === "separate") {
        const zip = new JSZip();
        
        for (let i = 0; i < selectedIndices.length; i++) {
          const pageIdx = selectedIndices[i];
          const subDoc = await PDFDocument.create();
          const [copiedPage] = await subDoc.copyPages(srcDoc, [pageIdx]);
          subDoc.addPage(copiedPage);
          const bytes = await subDoc.save();
          zip.file(`${baseName}_page_${pageIdx + 1}.pdf`, bytes);
        }

        const zipContent = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(zipContent);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${baseName}_pages_separate.zip`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        saveHistoryItem(selectedIndices.length, "separate", zipContent.size);

      } else if (extractionMode === "ranges") {
        // Find contiguous page ranges from selectedPages
        const zip = new JSZip();
        let rangeStart: number | null = null;
        const rangesList: { start: number; end: number }[] = [];

        for (let i = 0; i < selectedPages.length; i++) {
          if (selectedPages[i]) {
            if (rangeStart === null) {
              rangeStart = i;
            }
          } else {
            if (rangeStart !== null) {
              rangesList.push({ start: rangeStart, end: i - 1 });
              rangeStart = null;
            }
          }
        }
        if (rangeStart !== null) {
          rangesList.push({ start: rangeStart, end: selectedPages.length - 1 });
        }

        for (let idx = 0; idx < rangesList.length; idx++) {
          const r = rangesList[idx];
          const subDoc = await PDFDocument.create();
          const indicesInRange = Array.from({ length: r.end - r.start + 1 }, (_, index) => r.start + index);
          const copiedPages = await subDoc.copyPages(srcDoc, indicesInRange);
          copiedPages.forEach(p => subDoc.addPage(p));
          const bytes = await subDoc.save();
          zip.file(`${baseName}_range_${r.start + 1}-${r.end + 1}.pdf`, bytes);
        }

        const zipContent = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(zipContent);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${baseName}_ranges_separate.zip`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        saveHistoryItem(selectedIndices.length, "ranges", zipContent.size);
      }

    } catch (e: any) {
      console.error("Page extraction failed", e);
      alert("Extraction failed: " + (e.message || e));
    } finally {
      setIsProcessing(false);
    }
  };

  const saveHistoryItem = (extractedCount: number, mode: "single" | "separate" | "ranges", bytesSize: number) => {
    if (!file) return;
    const historyItem: ExtractHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      fileName: file.name,
      originalPageCount: pageCount,
      extractedPageCount: extractedCount,
      mode,
      outputSize: bytesSize
    };
    setHistory(prev => {
      const updated = [historyItem, ...prev].slice(0, 10);
      localStorage.setItem("pdf_extract_history", JSON.stringify(updated));
      return updated;
    });
  };

  // Clean actions
  const clearFile = () => {
    setFile(null);
    setPdfjsDoc(null);
    setSelectedPages([]);
    setPageCount(0);
    setFileSize(0);
    setLastSelectedIndex(null);
    setRangeInputText("");
    setRequiresPassword(false);
    setPassword("");
    setUploadStatus("idle");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("pdf_extract_history");
  };

  // Dynamic PDFJS loader script injection
  const loadPdfJs = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const windowAny = window as any;
      if (windowAny.pdfjsLib) {
        resolve(windowAny.pdfjsLib);
        return;
      }
      const existingScript = document.getElementById("pdfjs-cdn-script");
      if (existingScript) {
        let interval = setInterval(() => {
          if (windowAny.pdfjsLib) {
            clearInterval(interval);
            resolve(windowAny.pdfjsLib);
          }
        }, 100);
        setTimeout(() => {
          clearInterval(interval);
          reject(new Error("Timeout loading PDF.js"));
        }, 15000);
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
          reject(new Error("PDF.js global object missing after script load"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js from CDN. Check connection."));
      document.head.appendChild(script);
    });
  };

  // Preset utilities
  const handleApplyPreset = (pRange: string) => {
    applyRangeTextSelection(pRange);
  };

  const handleSavePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName.trim() || !rangeInputText) return;
    const newPreset: SelectionPreset = {
      id: Math.random().toString(36).substring(2, 9),
      name: newPresetName.trim(),
      rangeText: rangeInputText
    };
    const updated = [...presets, newPreset];
    savePresets(updated);
    setNewPresetName("");
    setShowSavePresetModal(false);
  };

  const deletePreset = (id: string) => {
    const updated = presets.filter(p => p.id !== id);
    savePresets(updated);
  };

  const selectedCount = selectedPages.filter(Boolean).length;
  // Est output size: originalSize * (selectedCount / pageCount)
  const estOutputSize = pageCount > 0 ? (fileSize * selectedCount) / pageCount : 0;

  return (
    <div className="space-y-8">
      {/* ─── SECURE INSTRUCTION HEADER ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-6 py-4 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#518231]/10 rounded-2xl text-[#518231]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-850 dark:text-slate-150">Local Safe Pages Extraction</h2>
            <p className="text-xs text-slate-550 dark:text-slate-400 font-bold mt-0.5">
              Zero-Trust compilation. Files never leave your browser.
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-350 dark:border-slate-700 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs cursor-pointer transition-all w-full sm:w-auto"
          >
            <History size={15} />
            History Log ({history.length})
          </button>
          
          {file && (
            <button
              onClick={clearFile}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 dark:text-red-400 font-extrabold text-xs rounded-2xl cursor-pointer transition-all w-full sm:w-auto"
            >
              <Trash2 size={15} />
              Remove PDF
            </button>
          )}
        </div>
      </div>

      {/* ─── HISTORY LOG PANEL ─── */}
      {showHistory && (
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-855 dark:text-slate-155 flex items-center gap-2">
              <History size={16} className="text-[#518231]" />
              Extraction History (Local Cache)
            </h3>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs font-black text-red-500 hover:text-red-655 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 size={12} /> Clear Cache
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-xs text-slate-555 dark:text-slate-400 py-3 font-semibold">
              No recent page extractions. Your past files will show here locally.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {history.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate w-4/5">{item.fileName}</p>
                    <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-450 font-bold border-t pt-2 border-slate-100 dark:border-slate-900">
                    <span>Selected {item.extractedPageCount} of {item.originalPageCount} pages</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-black text-[9px] uppercase">
                      {item.mode === "single" ? "Combined" : item.mode === "separate" ? "Separated" : "Ranges"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── UPLOADER SCREEN ─── */}
      {uploadStatus === "idle" && (
        <div
          ref={dropzoneRef}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-3 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center gap-5 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10 scale-[0.99]"
              : "border-slate-350 hover:border-[#518231]/70 dark:border-slate-800 dark:hover:border-[#518231]/70 bg-white hover:bg-slate-50/50 dark:bg-slate-900 dark:hover:bg-slate-900/60"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="p-5 bg-slate-100 dark:bg-slate-800 rounded-3xl text-slate-400 dark:text-slate-500 transition-all shadow-sm">
            <Upload size={36} className="text-[#518231]" />
          </div>
          <div className="space-y-1.5">
            <p className="text-base font-black text-slate-850 dark:text-slate-150">
              Drag and drop your PDF file here
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              or click to browse from your device
            </p>
          </div>
          
          {requiresPassword && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl max-w-sm mx-auto space-y-3 mt-4" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2 text-amber-500 text-xs font-black justify-center">
                <Lock size={14} /> Password Required
              </div>
              <form onSubmit={handleLockedPasswordSubmit} className="flex gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl text-xs font-extrabold outline-none text-center"
                />
                <button type="submit" className="px-4 py-1.5 bg-[#518231] hover:bg-[#416827] text-white rounded-xl text-xs font-extrabold cursor-pointer transition-all">
                  Decrypt
                </button>
              </form>
            </div>
          )}

          {errorMessage && (
            <div className="text-red-500 text-xs font-black flex items-center justify-center gap-1.5 mt-2">
              <AlertCircle size={14} /> {errorMessage}
            </div>
          )}
        </div>
      )}

      {/* ─── LOADING SCREEN ─── */}
      {uploadStatus === "reading" && (
        <div className="border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 p-16 rounded-3xl flex flex-col items-center justify-center gap-4 text-center">
          <Loader2 className="animate-spin text-[#518231]" size={36} />
          <p className="text-sm font-black text-slate-800 dark:text-slate-200">
            Parsing PDF Page structure & loading thumbnails...
          </p>
        </div>
      )}

      {/* ─── ERROR SCREEN ─── */}
      {uploadStatus === "error" && (
        <div className="border border-red-500/10 bg-red-500/5 dark:bg-red-950/10 p-16 rounded-3xl flex flex-col items-center justify-center gap-4 text-center max-w-xl mx-auto">
          <AlertCircle className="text-red-500" size={36} />
          <div>
            <p className="text-sm font-black text-slate-800 dark:text-slate-200">Failed to Load Document</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{errorMessage}</p>
          </div>
          <button
            onClick={clearFile}
            className="px-6 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-950 text-white rounded-xl font-bold text-xs cursor-pointer transition-all"
          >
            Start Over
          </button>
        </div>
      )}

      {/* ─── WORKSPACE (RIGHT & MAIN AREA) ─── */}
      {uploadStatus === "ready" && file && pdfjsDoc && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* MAIN COLUMN (LEFT 8 COLS) */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* THUMBNAILS HEADER BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-4 rounded-3xl">
              
              {/* Zoom & View Controls */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => setZoom(prev => Math.max(0.7, prev - 0.1))}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-all cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-[10px] font-black px-2 text-slate-650 min-w-10 text-center select-none">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-all cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>

                <div className="flex items-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === "grid" 
                        ? "bg-[#518231]/10 text-[#518231]" 
                        : "text-slate-450 hover:bg-slate-100"
                    }`}
                    title="Grid View"
                  >
                    <Grid size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === "list" 
                        ? "bg-[#518231]/10 text-[#518231]" 
                        : "text-slate-450 hover:bg-slate-100"
                    }`}
                    title="List View"
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>

              {/* Selection Presets Toolbar */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={applySelectAll}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] rounded-xl cursor-pointer transition-all"
                >
                  Select All
                </button>
                <button
                  onClick={applySelectNone}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] rounded-xl cursor-pointer transition-all"
                >
                  Deselect All
                </button>
                
                {/* Filters Dropdown */}
                <div className="relative group inline-block">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 text-slate-750 dark:text-slate-300 font-extrabold text-[10px] rounded-xl cursor-pointer transition-all">
                    <Filter size={10} /> Smart Filters
                  </button>
                  <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl py-2 w-40 shadow-lg z-20 text-left">
                    <button
                      onClick={applySelectOdd}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 text-[11px] font-extrabold text-slate-700 dark:text-slate-300"
                    >
                      Odd Pages
                    </button>
                    <button
                      onClick={applySelectEven}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 text-[11px] font-extrabold text-slate-700 dark:text-slate-300"
                    >
                      Even Pages
                    </button>
                    <button
                      onClick={() => applySelectFirstN(3)}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 text-[11px] font-extrabold text-slate-700 dark:text-slate-300"
                    >
                      First 3 Pages
                    </button>
                    <button
                      onClick={() => applySelectLastN(3)}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 text-[11px] font-extrabold text-slate-700 dark:text-slate-300"
                    >
                      Last 3 Pages
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* THUMBNAIL LAYOUT CONTAINER */}
            <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl shadow-inner min-h-[400px]">
              
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map(pageNum => {
                    const isSelected = selectedPages[pageNum - 1] || false;
                    return (
                      <Thumbnail
                        key={pageNum}
                        pageNumber={pageNum}
                        pdfDoc={pdfjsDoc}
                        zoom={zoom}
                        isSelected={isSelected}
                        onToggleSelect={(isShift) => handlePageToggle(pageNum - 1, isShift)}
                        viewMode="grid"
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map(pageNum => {
                    const isSelected = selectedPages[pageNum - 1] || false;
                    return (
                      <Thumbnail
                        key={pageNum}
                        pageNumber={pageNum}
                        pdfDoc={pdfjsDoc}
                        zoom={zoom}
                        isSelected={isSelected}
                        onToggleSelect={(isShift) => handlePageToggle(pageNum - 1, isShift)}
                        viewMode="list"
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* KEYBOARD SHORTCUTS TIP */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl text-[10px] text-slate-500 dark:text-slate-400 font-extrabold">
              <Keyboard size={14} className="text-[#518231]" />
              <span>Keyboard Shortcuts: **Ctrl + A** to select all • **Delete** to clear selection • **Shift + Click** to select page ranges • **Ctrl + S** to extract</span>
            </div>

          </div>

          {/* SIDEBAR PANEL (RIGHT 4 COLS) */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* FILE GENERAL STATS */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">
                Document Summary
              </h3>
              
              <div className="space-y-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-4 rounded-2xl shadow-sm text-xs font-bold">
                <div className="flex justify-between items-center truncate">
                  <span className="text-slate-500">File Name:</span>
                  <span className="text-slate-800 dark:text-white truncate max-w-40" title={file.name}>
                    {file.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">File Size:</span>
                  <span className="text-slate-800 dark:text-white">{(fileSize / 1024).toFixed(0)} KB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Total Pages:</span>
                  <span className="text-slate-800 dark:text-white">{pageCount}</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-900 pt-3">
                  <span className="text-[#518231]">Selected Pages:</span>
                  <span className="text-[#518231] font-black">{selectedCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Est. Output Size:</span>
                  <span className="text-slate-800 dark:text-white">
                    {selectedCount > 0 ? `${(estOutputSize / 1024).toFixed(0)} KB` : "0 KB"}
                  </span>
                </div>
              </div>
            </div>

            {/* SELECTION CONTROL PANEL */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-slate-500 dark:text-slate-450 uppercase tracking-widest pl-1">
                Page Selection
              </h3>

              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest pl-1">
                    Selected Ranges
                  </label>
                  <input
                    type="text"
                    value={rangeInputText}
                    onChange={(e) => {
                      setRangeInputText(e.target.value);
                      applyRangeTextSelection(e.target.value);
                    }}
                    placeholder="e.g. 1-3, 5, 8-10"
                    className="w-full px-4 py-3 border border-slate-350 dark:border-slate-800 bg-white dark:bg-slate-950 font-bold text-xs rounded-2xl outline-none focus:border-[#518231] transition-all"
                  />
                  <p className="text-[9px] text-slate-450 dark:text-slate-500 font-bold mt-1 pl-1">
                    Separate page numbers or ranges with commas.
                  </p>
                </div>

                {/* Preset List */}
                <div className="space-y-2 border-t pt-3.5 border-slate-200/50 dark:border-slate-850">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest pl-1">
                      Selection Presets
                    </span>
                    {rangeInputText && (
                      <button
                        onClick={() => setShowSavePresetModal(true)}
                        className="text-[9px] font-black text-[#518231] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Bookmark size={10} /> Save Current
                      </button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {presets.map(p => (
                      <div
                        key={p.id}
                        className="group flex items-center gap-1 bg-white hover:bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-2.5 py-1.5 rounded-xl text-[10px] font-extrabold cursor-pointer transition-all"
                      >
                        <span onClick={() => handleApplyPreset(p.rangeText)}>{p.name}</span>
                        {!p.id.startsWith("p-") && ( // Don't delete system default presets
                          <button
                            onClick={() => deletePreset(p.id)}
                            className="text-slate-405 hover:text-red-500 pl-1 font-bold cursor-pointer"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SAVE PRESET MODAL DIALOG */}
            {showSavePresetModal && (
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl space-y-4 shadow-md">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">Save Selection Preset</h4>
                  <button onClick={() => setShowSavePresetModal(false)} className="text-slate-400 font-bold">×</button>
                </div>
                <form onSubmit={handleSavePreset} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Preset Name (e.g. Chapter 1)"
                    value={newPresetName}
                    onChange={e => setNewPresetName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50 dark:bg-slate-900 outline-none"
                    autoFocus
                  />
                  <div className="text-[10px] text-slate-500 font-semibold bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border">
                    Range: {rangeInputText}
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowSavePresetModal(false)}
                      className="px-3 py-1.5 border rounded-lg text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#518231] text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Save Preset
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* EXTRACTION CONFIGURATION PANEL */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-slate-500 dark:text-slate-455 uppercase tracking-widest pl-1">
                Extraction Settings
              </h3>

              <div className="space-y-4">
                
                {/* Extraction Mode Selectors */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest pl-1">
                    Extraction Mode
                  </label>
                  
                  <div className="space-y-2">
                    {[
                      {
                        id: "single",
                        label: "Extract as Single PDF",
                        desc: "Selected pages are merged into one PDF document."
                      },
                      {
                        id: "separate",
                        label: "Extract Each Page Separately",
                        desc: "Each selected page becomes its own PDF. Packaged as a ZIP."
                      },
                      {
                        id: "ranges",
                        label: "Extract Ranges Separately",
                        desc: "Each contiguous range becomes its own PDF. Packaged as a ZIP."
                      }
                    ].map(mode => {
                      const isChecked = extractionMode === mode.id;
                      return (
                        <div
                          key={mode.id}
                          onClick={() => setExtractionMode(mode.id as any)}
                          className={`p-3.5 border rounded-2xl cursor-pointer text-left transition-all ${
                            isChecked
                              ? "bg-white dark:bg-slate-950 border-[#518231] shadow-sm"
                              : "bg-white hover:bg-slate-100/30 dark:bg-slate-900 border-slate-200 dark:border-slate-850"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="extract_mode"
                              checked={isChecked}
                              onChange={() => {}}
                              className="accent-[#518231]"
                            />
                            <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                              {mode.label}
                            </span>
                          </div>
                          <p className="text-[9px] text-slate-500 dark:text-slate-450 font-bold pl-5 mt-1 leading-normal">
                            {mode.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit action */}
                <button
                  onClick={handleExtractPages}
                  disabled={selectedCount === 0 || isProcessing}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#518231] hover:bg-[#436e29] disabled:bg-slate-200 disabled:dark:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-2xl cursor-pointer transition-all shadow-sm"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Extracting Pages...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Extract Pages ({selectedCount})
                    </>
                  )}
                </button>

              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
