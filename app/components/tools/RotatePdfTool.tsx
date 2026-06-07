"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download, 
  RefreshCw, History, Check, ZoomIn, ZoomOut, Sliders, Info, ShieldCheck, 
  RotateCw, RotateCcw, X, File, CheckSquare, Square, ChevronDown, 
  RefreshCcw, Undo2, Redo2, FlipHorizontal
} from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import JSZip from "jszip";

// PDF.js version for preview rendering
const PDFJS_VERSION = '3.11.174';

interface PdfMetadata {
  title?: string;
  author?: string;
  creator?: string;
  producer?: string;
  subject?: string;
  version?: string;
}

interface PageDetail {
  index: number;
  width: number;
  height: number;
  isLandscape: boolean;
}

interface UploadedPdf {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number | null;
  status: "loading" | "ready" | "error";
  errorMessage?: string;
  pdfjsDoc: any; // PDFJS Document object
  selectedPages: boolean[]; // true = highlighted
  pageRotations: number[]; // relative rotation angles (0, 90, 180, 270)
  rangeString: string;
  metadata: PdfMetadata | null;
  pageDetails: PageDetail[];
  historyStack: number[][]; // Undo/Redo stack
  historyIndex: number;
}

interface RotateHistoryItem {
  id: string;
  timestamp: number;
  inputFiles: { name: string; size: number; pageCount: number; rotatedCount: number }[];
  totalRotated: number;
  totalSize: number;
}

// ─────────────────────────────────────────────────────────
// THUMBNAIL SUB-COMPONENT (Lazy-rendered Canvas with rotation)
// ─────────────────────────────────────────────────────────
interface ThumbnailProps {
  pageNumber: number;
  pdfDoc: any; // PDFJS Document
  zoom: number;
  isSelected: boolean;
  userRotation: number; // 0, 90, 180, 270
  onToggleSelect: (e: React.MouseEvent) => void;
  onRotateCW: () => void;
  onRotateCCW: () => void;
}

function Thumbnail({ 
  pageNumber, pdfDoc, zoom, isSelected, userRotation, 
  onToggleSelect, onRotateCW, onRotateCCW 
}: ThumbnailProps) {
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
        
        // Base viewport scaled for a 130px thumbnail width
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
  }, [pageNumber, pdfDoc, zoom]);

  return (
    <div
      ref={containerRef}
      onClick={onToggleSelect}
      className={`relative rounded-xl border-2 p-2 flex flex-col items-center gap-2 transition-all cursor-pointer bg-slate-50 dark:bg-slate-950/40 select-none group/thumb ${
        isSelected
          ? "border-[#518231] bg-green-50/20 dark:bg-green-950/10 shadow-[0_0_12px_-2px_rgba(81,130,49,0.25)]"
          : "border-slate-200 dark:border-slate-800 hover:border-[#518231]/45 dark:hover:border-[#518231]/45 hover:bg-slate-100/40 dark:hover:bg-slate-900/40"
      }`}
    >
      {/* Visual Checkbox Indicator */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleSelect(e as any);
        }}
        className={`absolute top-3 right-3 z-10 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
          isSelected 
            ? "bg-[#518231] border-[#518231] text-white" 
            : "bg-white/80 dark:bg-slate-900/80 border-slate-300 dark:border-slate-600 text-transparent hover:text-slate-400"
        }`}
        aria-label={`Select page ${pageNumber}`}
      >
        <Check size={12} strokeWidth={3} />
      </button>

      {/* Page Canvas Box with CSS Transform for rotation */}
      <div className="w-32 h-44 flex items-center justify-center bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-800/50 relative shadow-3xs">
        {renderStatus === "idle" && (
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Loading...</div>
        )}
        {renderStatus === "rendering" && (
          <div className="flex flex-col items-center gap-1">
            <Loader2 className="animate-spin text-[#518231]" size={16} />
            <span className="text-[8px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Drawing</span>
          </div>
        )}
        {renderStatus === "error" && (
          <div className="text-[9px] text-red-500 font-bold flex flex-col items-center gap-1">
            <AlertCircle size={12} /> Error
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain ${
            renderStatus === "done" ? "opacity-100" : "opacity-0 absolute pointer-events-none"
          } transition-all duration-300`}
          style={{ transform: `rotate(${userRotation}deg)` }}
        />

        {/* Hover Highlight Overlay & Quick Rotate controls */}
        {renderStatus === "done" && (
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRotateCCW();
              }}
              className="p-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-lg shadow-md hover:scale-105 transition-all"
              title="Rotate Counter-Clockwise"
            >
              <RotateCcw size={14} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRotateCW();
              }}
              className="p-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-lg shadow-md hover:scale-105 transition-all"
              title="Rotate Clockwise"
            >
              <RotateCw size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
          Page {pageNumber}
        </span>
        {userRotation !== 0 && (
          <span className="text-[9px] font-extrabold text-[#518231] bg-green-50 dark:bg-green-950/30 px-1 py-0.2 rounded">
            {userRotation}°
          </span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export function RotatePdfTool() {
  const [files, setFiles] = useState<UploadedPdf[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  
  // Settings
  const [outputNamePattern, setOutputNamePattern] = useState<string>("{filename}_rotated");
  const [preserveMetadata, setPreserveMetadata] = useState<boolean>(true);
  
  // UI states
  const [pdfjsLoaded, setPdfjsLoaded] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [globalDragActive, setGlobalDragActive] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // View mode
  const [zoom, setZoom] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<"editor" | "history">("editor");
  const [historyList, setHistoryList] = useState<RotateHistoryItem[]>([]);
  
  // Export output
  const [downloadBlobUrl, setDownloadBlobUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("");
  const [downloadType, setDownloadType] = useState<"pdf" | "zip">("pdf");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Get active file object
  const activeFile = files.find(f => f.id === activeFileId) || null;

  // Load history from local storage
  useEffect(() => {
    const saved = localStorage.getItem("rotate_pdf_history");
    if (saved) {
      try {
        setHistoryList(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local history for rotate PDF pages", e);
      }
    }
  }, []);

  // Set up global drag overlay listeners
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setGlobalDragActive(true);
    };
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
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

  // Safe page range parsing helper (e.g. "1-3, 5")
  const parseRangeStr = (rangeStr: string, maxPages: number): number[] => {
    const indices: number[] = [];
    const cleanStr = rangeStr.replace(/\s+/g, "");
    if (!cleanStr) return [];

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
    return Array.from(new Set(indices)).sort((a, b) => a - b);
  };

  // Convert array of selected indices to a range string (e.g. [0, 1, 2, 4, 6, 7] -> "1-3, 5, 7-8")
  const makeRangeString = (selected: boolean[]): string => {
    const indices: number[] = [];
    selected.forEach((val, idx) => {
      if (val) indices.push(idx + 1);
    });

    if (indices.length === 0) return "";

    const ranges: string[] = [];
    let start = indices[0];
    let end = indices[0];

    for (let i = 1; i < indices.length; i++) {
      if (indices[i] === end + 1) {
        end = indices[i];
      } else {
        ranges.push(start === end ? `${start}` : `${start}-${end}`);
        start = indices[i];
        end = indices[i];
      }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    return ranges.join(", ");
  };

  // Dynamic PDFJS Script Loader
  const loadPdfJs = useCallback((): Promise<any> => {
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
          reject(new Error("Timeout loading PDF.js library"));
        }, 15005);
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
          reject(new Error("PDF.js object not found on window"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js script from CDN"));
      document.head.appendChild(script);
    });
  }, []);

  // Process uploaded PDF files
  const processFiles = async (uploadedFiles: FileList) => {
    const list: UploadedPdf[] = [];
    setErrorMessage(null);

    for (let i = 0; i < uploadedFiles.length; i++) {
      const f = uploadedFiles[i];
      if (f.type !== "application/pdf" && !f.name.endsWith(".pdf")) {
        alert(`File "${f.name}" is not a valid PDF.`);
        continue;
      }
      if (f.size > 150 * 1024 * 1024) {
        alert(`File "${f.name}" exceeds the 150MB maximum size limit.`);
        continue;
      }

      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      list.push({
        id,
        file: f,
        name: f.name,
        size: f.size,
        pageCount: null,
        status: "loading",
        pdfjsDoc: null,
        selectedPages: [],
        pageRotations: [],
        rangeString: "",
        metadata: null,
        pageDetails: [],
        historyStack: [[]],
        historyIndex: 0
      });
    }

    if (list.length === 0) return;

    // Flush any old compiled blob URLs
    if (downloadBlobUrl) {
      URL.revokeObjectURL(downloadBlobUrl);
      setDownloadBlobUrl(null);
    }

    setFiles(prev => [...prev, ...list]);
    
    if (!activeFileId) {
      setActiveFileId(list[0].id);
    }

    let pdfjs: any = null;
    try {
      pdfjs = await loadPdfJs();
      setPdfjsLoaded(true);
    } catch (e) {
      console.error(e);
      setErrorMessage("Could not load PDF.js renderer. Please check your network connection.");
      return;
    }

    for (const item of list) {
      try {
        const buffer = await item.file.arrayBuffer();
        
        const pdfLibDoc = await PDFDocument.load(buffer, {
          ignoreEncryption: true,
          updateMetadata: false
        });
        
        const count = pdfLibDoc.getPageCount();
        const headerBytes = new Uint8Array(buffer.slice(0, 32));
        const headerString = new TextDecoder().decode(headerBytes);
        const versionMatch = headerString.match(/%PDF-(\d+\.\d+)/);
        const pdfVersion = versionMatch ? versionMatch[1] : undefined;

        const meta: PdfMetadata = {
          title: pdfLibDoc.getTitle() || undefined,
          author: pdfLibDoc.getAuthor() || undefined,
          creator: pdfLibDoc.getCreator() || undefined,
          producer: pdfLibDoc.getProducer() || undefined,
          subject: pdfLibDoc.getSubject() || undefined,
          version: pdfVersion
        };

        const pdfjsDoc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;

        // Extract orientation/aspect ratio for smart filter detection
        const pageDetails: PageDetail[] = [];
        for (let idx = 1; idx <= count; idx++) {
          const page = await pdfjsDoc.getPage(idx);
          const viewport = page.getViewport({ scale: 1.0 });
          pageDetails.push({
            index: idx - 1,
            width: viewport.width,
            height: viewport.height,
            isLandscape: viewport.width > viewport.height
          });
        }

        const initialRotations = new Array(count).fill(0);

        setFiles(prev => prev.map(f => {
          if (f.id === item.id) {
            return {
              ...f,
              pageCount: count,
              status: "ready",
              pdfjsDoc,
              selectedPages: new Array(count).fill(false),
              pageRotations: initialRotations,
              metadata: meta,
              pageDetails,
              historyStack: [initialRotations],
              historyIndex: 0
            };
          }
          return f;
        }));
      } catch (err: any) {
        console.error("Failed to parse file", item.name, err);
        let msg = "Could not parse PDF. File might be corrupted.";
        if (err.message && err.message.includes("encrypted")) {
          msg = "Document is password protected. Please unlock it first.";
        }
        setFiles(prev => prev.map(f => {
          if (f.id === item.id) {
            return { ...f, status: "error", errorMessage: msg };
          }
          return f;
        }));
      }
    }
  };

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const next = prev.filter(f => f.id !== id);
      if (activeFileId === id) {
        setActiveFileId(next.length > 0 ? next[0].id : null);
      }
      return next;
    });
    if (downloadBlobUrl) {
      URL.revokeObjectURL(downloadBlobUrl);
      setDownloadBlobUrl(null);
    }
  };

  const clearAllFiles = () => {
    setFiles([]);
    setActiveFileId(null);
    if (downloadBlobUrl) {
      URL.revokeObjectURL(downloadBlobUrl);
      setDownloadBlobUrl(null);
    }
  };

  // Visual selection mechanics
  const togglePageSelection = (fileId: string, index: number, e?: React.MouseEvent) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId) {
        const selected = [...f.selectedPages];
        
        // Multi-select shift-click range logic
        if (e && e.shiftKey) {
          const activeIndex = selected.findIndex((val) => val);
          if (activeIndex !== -1) {
            const start = Math.min(activeIndex, index);
            const end = Math.max(activeIndex, index);
            for (let i = start; i <= end; i++) {
              selected[i] = true;
            }
          } else {
            selected[index] = !selected[index];
          }
        } else {
          selected[index] = !selected[index];
        }

        const rangeStr = makeRangeString(selected);
        return { ...f, selectedPages: selected, rangeString: rangeStr };
      }
      return f;
    }));
  };

  // Bulk filters
  const selectAll = (fileId: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId && f.pageCount) {
        const selected = new Array(f.pageCount).fill(true);
        return { ...f, selectedPages: selected, rangeString: makeRangeString(selected) };
      }
      return f;
    }));
  };

  const deselectAll = (fileId: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId && f.pageCount) {
        return { ...f, selectedPages: new Array(f.pageCount).fill(false), rangeString: "" };
      }
      return f;
    }));
  };

  const invertSelection = (fileId: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId && f.pageCount) {
        const selected = f.selectedPages.map(val => !val);
        return { ...f, selectedPages: selected, rangeString: makeRangeString(selected) };
      }
      return f;
    }));
  };

  // Orientation filter selections
  const selectByOrientation = (fileId: string, orientationMode: "landscape" | "portrait") => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId && f.pageCount) {
        const selected = f.selectedPages.map((_, idx) => {
          const detail = f.pageDetails[idx];
          if (!detail) return false;
          return orientationMode === "landscape" ? detail.isLandscape : !detail.isLandscape;
        });
        return { ...f, selectedPages: selected, rangeString: makeRangeString(selected) };
      }
      return f;
    }));
  };

  const selectOddEven = (fileId: string, filterMode: "odd" | "even") => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId && f.pageCount) {
        const selected = f.selectedPages.map((_, idx) => {
          const pageNum = idx + 1;
          return filterMode === "odd" ? pageNum % 2 !== 0 : pageNum % 2 === 0;
        });
        return { ...f, selectedPages: selected, rangeString: makeRangeString(selected) };
      }
      return f;
    }));
  };

  // Synchronize Typed range changes with checkbox states
  const handleRangeTextChange = (fileId: string, value: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId && f.pageCount) {
        const matchingIndices = parseRangeStr(value, f.pageCount);
        const selected = new Array(f.pageCount).fill(false);
        matchingIndices.forEach(idx => {
          selected[idx] = true;
        });
        return { ...f, rangeString: value, selectedPages: selected };
      }
      return f;
    }));
  };

  // Rotation Core Logic - applies relative offset (e.g. +90, -90/270, 180, etc.)
  const applyRotationDelta = useCallback((fileId: string, deltaAngle: number, applyToAllIfNoSelection = true) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId && f.pageCount) {
        const hasSelection = f.selectedPages.some(v => v);
        
        const nextRotations = f.pageRotations.map((val, idx) => {
          // Rotate either selected pages, or ALL pages if no visual selection is highlighted
          if (!hasSelection && applyToAllIfNoSelection) {
            return (val + deltaAngle + 360) % 360;
          }
          if (f.selectedPages[idx]) {
            return (val + deltaAngle + 360) % 360;
          }
          return val;
        });

        // Push to Undo/Redo stack history list
        const nextStack = f.historyStack.slice(0, f.historyIndex + 1);
        nextStack.push(nextRotations);

        return {
          ...f,
          pageRotations: nextRotations,
          historyStack: nextStack,
          historyIndex: nextStack.length - 1
        };
      }
      return f;
    }));
  }, []);

  const resetRotation = useCallback((fileId: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId && f.pageCount) {
        const hasSelection = f.selectedPages.some(v => v);
        const nextRotations = f.pageRotations.map((val, idx) => {
          if (!hasSelection || f.selectedPages[idx]) {
            return 0; // reset
          }
          return val;
        });

        const nextStack = f.historyStack.slice(0, f.historyIndex + 1);
        nextStack.push(nextRotations);

        return {
          ...f,
          pageRotations: nextRotations,
          historyStack: nextStack,
          historyIndex: nextStack.length - 1
        };
      }
      return f;
    }));
  }, []);

  // Undo/Redo operations
  const triggerUndo = (fileId: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId && f.historyIndex > 0) {
        const nextIdx = f.historyIndex - 1;
        return {
          ...f,
          pageRotations: f.historyStack[nextIdx],
          historyIndex: nextIdx
        };
      }
      return f;
    }));
  };

  const triggerRedo = (fileId: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId && f.historyIndex < f.historyStack.length - 1) {
        const nextIdx = f.historyIndex + 1;
        return {
          ...f,
          pageRotations: f.historyStack[nextIdx],
          historyIndex: nextIdx
        };
      }
      return f;
    }));
  };

  // Keyboard shortcut listener integration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "editor" || !activeFileId) return;

      // Avoid capturing hotkeys when user is focused inside input forms
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === "INPUT" || 
        activeEl.tagName === "TEXTAREA" || 
        activeEl.getAttribute("contenteditable") === "true"
      )) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        applyRotationDelta(activeFileId, 270, true); // CCW is +270
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        applyRotationDelta(activeFileId, 90, true); // CW is +90
      } else if (e.key === "Delete") {
        e.preventDefault();
        resetRotation(activeFileId);
      } else if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleRotatePdf();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, activeFileId, applyRotationDelta, resetRotation]);

  // Statistics summaries
  const getFileStats = (f: UploadedPdf) => {
    if (!f.pageCount) return { rotatedCount: 0 };
    const rotatedCount = f.pageRotations.filter(angle => angle !== 0).length;
    return { rotatedCount };
  };

  // PDF Compiling Action
  const handleRotatePdf = async () => {
    const readyFiles = files.filter(f => f.status === "ready");
    if (readyFiles.length === 0) return;

    setIsProcessing(true);
    setProcessingProgress(10);
    setProcessingStep("Reading files and parsing catalog orientations...");
    setErrorMessage(null);

    try {
      const processedFiles: { name: string; bytes: Uint8Array; originalFile: UploadedPdf; rotatedCount: number }[] = [];

      for (let i = 0; i < readyFiles.length; i++) {
        const f = readyFiles[i];
        setProcessingStep(`Processing "${f.name}"...`);
        setProcessingProgress(Math.floor(10 + (i / readyFiles.length) * 70));
        await new Promise(r => setTimeout(r, 0));

        const buffer = await f.file.arrayBuffer();
        const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        
        // Loop pages and apply rotation modifiers
        const pages = srcDoc.getPages();
        let currentRotated = 0;

        f.pageRotations.forEach((offsetAngle, idx) => {
          if (offsetAngle !== 0) {
            const page = pages[idx];
            const originalAngle = page.getRotation().angle;
            // setRotation expects multiple of 90 wrapped in degrees()
            const finalAngle = (originalAngle + offsetAngle) % 360;
            page.setRotation(degrees(finalAngle));
            currentRotated++;
          }
        });

        // Preserve metadata if enabled
        if (preserveMetadata && f.metadata) {
          if (f.metadata.title) srcDoc.setTitle(f.metadata.title);
          if (f.metadata.author) srcDoc.setAuthor(f.metadata.author);
          if (f.metadata.creator) srcDoc.setCreator(f.metadata.creator);
          if (f.metadata.subject) srcDoc.setSubject(f.metadata.subject);
          if (f.metadata.producer) srcDoc.setProducer(f.metadata.producer);
        }

        const pdfBytes = await srcDoc.save({
          useObjectStreams: true,
          addDefaultPage: false
        });

        // Resolve custom output name pattern
        let customName = outputNamePattern
          .replace("{filename}", f.name.replace(/\.[^/.]+$/, ""))
          .replace("{date}", new Date().toISOString().split('T')[0]);
        if (!customName.endsWith(".pdf")) customName += ".pdf";

        processedFiles.push({
          name: customName,
          bytes: pdfBytes,
          originalFile: f,
          rotatedCount: currentRotated
        });
      }

      setProcessingStep("Packaging files for download...");
      setProcessingProgress(90);
      await new Promise(r => setTimeout(r, 10));

      let finalBlobUrl = "";
      let finalName = "";
      let isMultiple = processedFiles.length > 1;
      let totalOutputSize = 0;

      if (!isMultiple) {
        const target = processedFiles[0];
        const blob = new Blob([target.bytes as any], { type: "application/pdf" });
        finalBlobUrl = URL.createObjectURL(blob);
        finalName = target.name;
        totalOutputSize = blob.size;
        setDownloadType("pdf");
      } else {
        const zip = new JSZip();
        processedFiles.forEach(f => {
          zip.file(f.name, f.bytes);
          totalOutputSize += f.bytes.length;
        });

        const zipBlob = await zip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 6 }
        });

        finalBlobUrl = URL.createObjectURL(zipBlob);
        finalName = "rotated_documents.zip";
        totalOutputSize = zipBlob.size;
        setDownloadType("zip");
      }

      setDownloadBlobUrl(finalBlobUrl);
      setDownloadName(finalName);
      setProcessingProgress(100);
      setIsProcessing(false);

      // Save to localStorage history
      const historyItem: RotateHistoryItem = {
        id: `rotate-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: Date.now(),
        inputFiles: processedFiles.map(pf => ({
          name: pf.originalFile.name,
          size: pf.originalFile.size,
          pageCount: pf.originalFile.pageCount || 0,
          rotatedCount: pf.rotatedCount
        })),
        totalRotated: processedFiles.reduce((acc, pf) => acc + pf.rotatedCount, 0),
        totalSize: totalOutputSize
      };

      setHistoryList(prev => {
        const updated = [historyItem, ...prev].slice(0, 50);
        localStorage.setItem("rotate_pdf_history", JSON.stringify(updated));
        return updated;
      });

    } catch (e: any) {
      console.error(e);
      setErrorMessage("An error occurred during page rotation: " + (e.message || "Unknown error"));
      setIsProcessing(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full space-y-8 py-2">
      {/* ── TOOL NAVIGATION HEADER ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold text-[#518231] uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck size={12} />
            SECURE CLIENT-SIDE ORIENTATION FIXER
          </span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <RotateCw size={22} className="text-[#518231]" />
            Rotate PDF
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Rotate individual pages or entire documents. Fix misoriented landscape scans instantly.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
          <button
            onClick={() => setActiveTab("editor")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "editor"
                ? "bg-white dark:bg-slate-900 text-[#518231] shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <Sliders size={13} />
            Editor
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "history"
                ? "bg-white dark:bg-slate-900 text-[#518231] shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <History size={13} />
            History
          </button>
        </div>
      </div>

      {activeTab === "history" ? (
        // ─── LOCAL HISTORY PANEL ───
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Local Processing History</h3>
            {historyList.length > 0 && (
              <button
                onClick={() => {
                  localStorage.removeItem("rotate_pdf_history");
                  setHistoryList([]);
                }}
                className="text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-wider flex items-center gap-1"
              >
                <Trash2 size={12} /> Clear Logs
              </button>
            )}
          </div>

          {historyList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-500 gap-3 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <History size={32} strokeWidth={1.5} className="text-slate-300 dark:text-slate-700" />
              <div className="space-y-1">
                <p className="text-xs font-bold">No history logs found</p>
                <p className="text-[10px] text-slate-500">Your processed rotation logs will be listed here.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-850">
              {historyList.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-800 dark:text-slate-200">
                      {item.inputFiles.map(f => f.name).join(", ")}
                    </div>
                    <div className="text-[10px] text-slate-400 flex flex-wrap gap-x-3 gap-y-1 font-semibold">
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                      <span>Rotated: {item.totalRotated} pages</span>
                      <span>Size: {formatBytes(item.totalSize)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // ─── EDITOR CONTAINER ───
        <div className="space-y-8">
          {/* File Upload zone */}
          {files.length === 0 ? (
            <div
              ref={dropzoneRef}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-3 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center gap-4 text-center cursor-pointer transition-all duration-300 ${
                dragActive
                  ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10 scale-[0.99]"
                  : "border-slate-300 hover:border-[#518231]/70 dark:border-slate-755 dark:hover:border-[#518231]/70 bg-white hover:bg-slate-50/50 dark:bg-slate-900 dark:hover:bg-slate-900/60"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="application/pdf"
                onChange={handleFileInput}
                className="hidden"
              />
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl text-slate-400 dark:text-slate-500">
                <Upload size={32} className="text-[#518231]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-800 dark:text-slate-200">
                  Drag and drop your PDF files here
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  or click to select from your computer
                </p>
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                Maximum 150MB per file • 100% Local Processing
              </div>
            </div>
          ) : (
            // Editor Dashboard grid layout
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: List & settings */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      Uploaded Documents ({files.length})
                    </h3>
                    <button
                      onClick={clearAllFiles}
                      className="text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest flex items-center gap-0.5"
                    >
                      <Trash2 size={11} /> Clear All
                    </button>
                  </div>

                  {/* Batch Upload List */}
                  <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-1">
                    {files.map((f) => {
                      const isActive = f.id === activeFileId;
                      const { rotatedCount } = getFileStats(f);
                      return (
                        <div
                          key={f.id}
                          onClick={() => {
                            if (f.status === "ready") setActiveFileId(f.id);
                          }}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                            isActive
                              ? "border-[#518231] bg-green-50/10 dark:bg-[#518231]/5 shadow-xs"
                              : "border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/25"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden w-full">
                            <div className="p-1.5 bg-slate-100 dark:bg-slate-850 rounded-lg text-slate-400 dark:text-slate-500 shrink-0">
                              <FileText size={16} className={isActive ? "text-[#518231]" : ""} />
                            </div>
                            <div className="overflow-hidden w-full space-y-0.5">
                              <div className="text-xs font-black text-slate-800 dark:text-slate-200 truncate pr-4">
                                {f.name}
                              </div>
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 flex justify-between font-bold">
                                <span>{formatBytes(f.size)}</span>
                                {f.status === "loading" && (
                                  <span className="text-amber-500 flex items-center gap-1 animate-pulse">
                                    <Loader2 size={8} className="animate-spin" /> Parsing
                                  </span>
                                )}
                                {f.status === "error" && <span className="text-red-500">Error</span>}
                                {f.status === "ready" && (
                                  <span className="text-slate-500 font-bold">
                                    {f.pageCount} pgs ({rotatedCount} rot)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(f.id);
                            }}
                            className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 shrink-0 p-1"
                            title="Remove file"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border border-slate-200/20"
                  >
                    <Upload size={12} /> Add More Files
                  </button>
                </div>

                {/* Settings Panel */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5">
                  <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
                    Output Settings
                  </h3>

                  {/* Custom filename preset */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Output Naming Pattern</label>
                    <input
                      type="text"
                      value={outputNamePattern}
                      onChange={(e) => setOutputNamePattern(e.target.value)}
                      placeholder="{filename}_rotated"
                      className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#518231]"
                    />
                    <span className="text-[8px] text-slate-400 block font-semibold">
                      Use <code className="bg-slate-100 dark:bg-slate-800 px-0.5 py-0.2 rounded font-bold">{'{filename}'}</code> or <code className="bg-slate-100 dark:bg-slate-800 px-0.5 py-0.2 rounded font-bold">{'{date}'}</code> presets.
                    </span>
                  </div>

                  {/* Metadata preservation */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950/30 border border-slate-150 dark:border-slate-800">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 block">Preserve PDF Metadata</span>
                      <span className="text-[8px] text-slate-400 dark:text-slate-500 block">Retain original fields</span>
                    </div>
                    <button
                      onClick={() => setPreserveMetadata(prev => !prev)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-all focus:outline-none relative ${
                        preserveMetadata ? "bg-[#518231]" : "bg-slate-300 dark:bg-slate-700"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full bg-white shadow-sm block transition-transform ${
                        preserveMetadata ? "translate-x-4" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Compilation action panel */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                  <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
                    Action Panel
                  </h3>

                  {isProcessing ? (
                    <div className="space-y-2 py-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        <span className="truncate pr-4">{processingStep}</span>
                        <span>{processingProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#518231] h-full transition-all duration-300"
                          style={{ width: `${processingProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {errorMessage && (
                        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-[11px] font-bold flex gap-2">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Summary calculations */}
                      <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/80 rounded-xl p-3 space-y-2">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block font-sans">Batch Summary</span>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-bold text-slate-700 dark:text-slate-350">
                          <div>
                            <span className="text-slate-400 font-semibold block text-[10px]">TOTAL FILES</span>
                            <span>{files.length} PDF(s)</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold block text-[10px]">PAGES ROTATED</span>
                            <span className="text-[#518231] font-black">
                              {files.reduce((acc, f) => acc + getFileStats(f).rotatedCount, 0)}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-400 font-semibold block text-[10px]">TOTAL INPUT SIZE</span>
                            <span>{formatBytes(files.reduce((acc, f) => acc + f.size, 0))}</span>
                          </div>
                        </div>
                      </div>

                      {/* Download compiled links */}
                      {downloadBlobUrl ? (
                        <div className="space-y-2">
                          <a
                            href={downloadBlobUrl}
                            download={downloadName}
                            className="w-full py-3 bg-[#518231] hover:bg-[#6fa844] text-white rounded-xl text-xs font-black tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm"
                          >
                            <Download size={14} />
                            Download {downloadType === "zip" ? "ZIP Archive" : "Rotated PDF"}
                          </a>
                          <button
                            onClick={() => {
                              if (downloadBlobUrl) URL.revokeObjectURL(downloadBlobUrl);
                              setDownloadBlobUrl(null);
                            }}
                            className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-755 text-slate-650 dark:text-slate-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                          >
                            <RefreshCcw size={12} /> Reset Download
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={handleRotatePdf}
                          className="w-full py-3 bg-[#518231] hover:bg-[#6fa844] text-white rounded-xl text-xs font-black tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <RotateCw size={13} />
                          Apply Rotation angles
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Secure Client Sandbox Notice */}
                <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-850 p-4 rounded-2xl flex gap-3 text-left">
                  <ShieldCheck size={18} className="text-[#518231] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-[11px] font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wide">Files never leave your device</h4>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-normal font-semibold">
                      Your files stay secure. All metadata edits and page rotations take place locally in memory.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Visual Rotation Grid */}
              <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs min-h-[500px] flex flex-col">
                
                {activeFile ? (
                  <div className="flex-1 flex flex-col space-y-6">
                    
                    {/* Header bar: Active document details & selection controls */}
                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div className="text-left space-y-0.5">
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest font-sans">Active Document</div>
                        <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 truncate max-w-[280px]">
                          {activeFile.name}
                        </h2>
                      </div>

                      {/* Interactive Selection Toggles */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide">
                        <button
                          onClick={() => selectAll(activeFile.id)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg transition-all"
                        >
                          All
                        </button>
                        <button
                          onClick={() => deselectAll(activeFile.id)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg transition-all"
                        >
                          Clear
                        </button>
                        <button
                          onClick={() => invertSelection(activeFile.id)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg transition-all"
                        >
                          Invert
                        </button>

                        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 shrink-0" />

                        <button
                          onClick={() => selectOddEven(activeFile.id, "odd")}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-[#518231] rounded-lg transition-all"
                        >
                          Odds
                        </button>
                        <button
                          onClick={() => selectOddEven(activeFile.id, "even")}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-[#518231] rounded-lg transition-all"
                        >
                          Evens
                        </button>

                        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 shrink-0" />

                        {/* Smart orientation selectors */}
                        <button
                          onClick={() => selectByOrientation(activeFile.id, "landscape")}
                          className="px-2.5 py-1.5 bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/15 rounded-lg transition-all"
                          title="Select sideways scanner pages"
                        >
                          Landscape
                        </button>
                        <button
                          onClick={() => selectByOrientation(activeFile.id, "portrait")}
                          className="px-2.5 py-1.5 bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/15 rounded-lg transition-all"
                        >
                          Portrait
                        </button>
                      </div>
                    </div>

                    {/* Rotation Action Toolbar & shortcuts hints */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-850 p-3 rounded-xl">
                      
                      {/* Bulk rotation triggers */}
                      <div className="flex flex-wrap items-center gap-1">
                        <button
                          onClick={() => applyRotationDelta(activeFile.id, 270, true)} // CCW is +270
                          className="flex items-center gap-1 px-3 py-2 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold shadow-xs hover:scale-102 transition-all"
                          title="Rotate 90 degrees Left (Arrow Left)"
                        >
                          <RotateCcw size={12} />
                          Rotate Left
                        </button>
                        <button
                          onClick={() => applyRotationDelta(activeFile.id, 90, true)} // CW is +90
                          className="flex items-center gap-1 px-3 py-2 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold shadow-xs hover:scale-102 transition-all"
                          title="Rotate 90 degrees Right (Arrow Right)"
                        >
                          <RotateCw size={12} />
                          Rotate Right
                        </button>
                        <button
                          onClick={() => applyRotationDelta(activeFile.id, 180, true)}
                          className="flex items-center gap-1 px-3 py-2 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold shadow-xs hover:scale-102 transition-all"
                          title="Flip page upside down (180 degrees)"
                        >
                          <FlipHorizontal size={12} />
                          180° Flip
                        </button>
                        <button
                          onClick={() => resetRotation(activeFile.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:scale-102 transition-all"
                          title="Reset selected pages rotations (Delete)"
                        >
                          <RefreshCcw size={12} />
                          Reset
                        </button>

                        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-850 mx-2 shrink-0" />

                        {/* Undo / Redo controls */}
                        <button
                          onClick={() => triggerUndo(activeFile.id)}
                          disabled={activeFile.historyIndex === 0}
                          className="p-1.5 bg-white hover:bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg disabled:opacity-40 disabled:hover:scale-100 hover:scale-105 transition-all text-slate-650 dark:text-slate-350"
                          title="Undo last change"
                        >
                          <Undo2 size={13} />
                        </button>
                        <button
                          onClick={() => triggerRedo(activeFile.id)}
                          disabled={activeFile.historyIndex >= activeFile.historyStack.length - 1}
                          className="p-1.5 bg-white hover:bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg disabled:opacity-40 disabled:hover:scale-100 hover:scale-105 transition-all text-slate-650 dark:text-slate-350"
                          title="Redo next change"
                        >
                          <Redo2 size={13} />
                        </button>
                      </div>

                      {/* Zoom control bar */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 rounded-lg text-slate-500"
                        >
                          <ZoomOut size={13} />
                        </button>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 w-10 text-center select-none">
                          {Math.round(zoom * 100)}%
                        </span>
                        <button
                          onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 rounded-lg text-slate-500"
                        >
                          <ZoomIn size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Text field page range and keyboard helper tips */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-950/10 border border-slate-150 dark:border-slate-850/50 p-2.5 rounded-xl text-left">
                      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest shrink-0">
                          Custom Page Selection:
                        </label>
                        <input
                          type="text"
                          value={activeFile.rangeString}
                          onChange={(e) => handleRangeTextChange(activeFile.id, e.target.value)}
                          placeholder="e.g. 1-3, 5, 8-10"
                          className="w-full md:max-w-[220px] text-xs font-bold px-2 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#518231] text-slate-850 dark:text-slate-100"
                        />
                      </div>
                      <div className="text-[9px] text-slate-400 font-bold tracking-normal self-end md:self-auto uppercase flex items-center gap-1 shrink-0">
                        <Info size={11} className="text-[#518231]" />
                        <span>Keys: ←/→ to rotate selected • Del to reset • Ctrl+S to save</span>
                      </div>
                    </div>

                    {/* Rendering loader if parsing */}
                    {activeFile.status === "loading" && (
                      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-3 py-16">
                        <Loader2 className="animate-spin text-[#518231]" size={36} />
                        <span className="text-xs font-black uppercase tracking-wider">Loading Document pages...</span>
                      </div>
                    )}

                    {/* Grid view showing thumbnail list */}
                    {activeFile.status === "ready" && activeFile.pdfjsDoc && (
                      <div className="flex-1 overflow-y-auto max-h-[460px] pr-2 custom-scrollbar border-2 border-slate-100/50 dark:border-slate-850/50 rounded-xl p-4 bg-slate-50/20 dark:bg-slate-950/10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {Array.from({ length: activeFile.pageCount || 0 }).map((_, idx) => {
                            const pageNum = idx + 1;
                            const isSelected = activeFile.selectedPages[idx] || false;
                            const rotation = activeFile.pageRotations[idx] || 0;
                            
                            return (
                              <Thumbnail
                                key={`${activeFile.id}-page-${pageNum}`}
                                pageNumber={pageNum}
                                pdfDoc={activeFile.pdfjsDoc}
                                zoom={zoom}
                                isSelected={isSelected}
                                userRotation={rotation}
                                onToggleSelect={(e) => togglePageSelection(activeFile.id, idx, e)}
                                onRotateCW={() => applyRotationDelta(activeFile.id, 90, false)}
                                onRotateCCW={() => applyRotationDelta(activeFile.id, 270, false)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Page rendering failure errors */}
                    {activeFile.status === "error" && (
                      <div className="flex-1 flex flex-col items-center justify-center text-red-500 gap-2 py-16 text-center">
                        <AlertCircle size={32} />
                        <span className="text-xs font-black uppercase tracking-wider">Failed to Load Page Preview</span>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-[280px]">
                          {activeFile.errorMessage}
                        </p>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-3 py-16 text-center">
                    <FileText size={48} strokeWidth={1} className="text-slate-300 dark:text-slate-700" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold font-sans">No document currently selected</p>
                      <p className="text-[10px] text-slate-500">Add files and select one from the upload queue to begin rotating pages.</p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
