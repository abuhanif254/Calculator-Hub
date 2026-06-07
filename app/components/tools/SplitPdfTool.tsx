"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  FileText, Upload, Trash2, Settings, CheckCircle, AlertCircle, 
  Loader2, Download, RefreshCw, History, ShieldAlert, Info, Check, 
  Columns, Layers, Scissors, FileCode, CheckSquare, Square, ZoomIn, ZoomOut, Plus, X,
  ChevronDown
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

// PDF.js dynamic loading configuration
const PDFJS_VERSION = '3.11.174';

interface PdfMetadata {
  title?: string;
  author?: string;
  creator?: string;
  producer?: string;
  subject?: string;
  version?: string;
}

interface SplitHistoryItem {
  id: string;
  timestamp: number;
  inputName: string;
  totalPageCount: number;
  operationType: string;
  outputCount: number;
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
}

function Thumbnail({ pageNumber, pdfDoc, zoom, isSelected, onToggleSelect }: ThumbnailProps) {
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
        const scale = (140 * zoom) / originalViewport.width;
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
      <div className="w-36 h-48 flex items-center justify-center bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-800/50 relative shadow-3xs">
        {renderStatus === "idle" && (
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Loading...</div>
        )}
        {renderStatus === "rendering" && (
          <div className="flex flex-col items-center gap-1.5">
            <Loader2 className="animate-spin text-[#518231]" size={18} />
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Rendering</span>
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
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export function SplitPdfTool() {
  // File management
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<PdfMetadata | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [fileSize, setFileSize] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "reading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // PDFJS Objects
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);

  // Interactive controls
  const [selectedPages, setSelectedPages] = useState<boolean[]>([]);
  const [zoom, setZoom] = useState<number>(1.0);

  // Tabs: "extract" | "ranges" | "every" | "interval"
  const [activeTab, setActiveTab] = useState<"extract" | "ranges" | "every" | "interval">("extract");

  // Options configuration
  const [customRangeString, setCustomRangeString] = useState<string>("");
  const [customRanges, setCustomRanges] = useState<{ id: string; start: string; end: string }[]>([
    { id: "1", start: "1", end: "" }
  ]);
  const [intervalPages, setIntervalPages] = useState<string>("5");
  const [outputPrefix, setOutputPrefix] = useState<string>("");
  const [isOptimizing, setIsOptimizing] = useState<boolean>(true);

  // Processing state
  const [splitStatus, setSplitStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [splitProgress, setSplitProgress] = useState<number>(0);
  const [splitStep, setSplitStep] = useState<string>("");
  
  // Download URLs
  const [downloadBlobUrl, setDownloadBlobUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("");
  const [downloadType, setDownloadType] = useState<"pdf" | "zip">("pdf");
  const [isMultipleOutputs, setIsMultipleOutputs] = useState<boolean>(false);

  // History & UX
  const [history, setHistory] = useState<SplitHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [globalDragActive, setGlobalDragActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("split_pdf_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse split history", e);
      }
    }
  }, []);

  // Window drag over handlers
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

  // Update output filename prefix when file loaded
  useEffect(() => {
    if (file) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      setOutputPrefix(cleanName);
    }
  }, [file]);

  // Synchronize customRangeString and selectedPages for visual selection
  useEffect(() => {
    if (activeTab === "extract" && pageCount > 0) {
      // Build selected indices from selectedPages array
      const indices: number[] = [];
      selectedPages.forEach((selected, idx) => {
        if (selected) indices.push(idx + 1);
      });

      if (indices.length === 0) {
        setCustomRangeString("");
        return;
      }

      // Format array of numbers to ranges (e.g. [1, 2, 3, 5, 7, 8] -> "1-3, 5, 7-8")
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
      setCustomRangeString(ranges.join(", "));
    }
  }, [selectedPages, activeTab, pageCount]);

  // Dynamic PDFJS Script Loader
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
          reject(new Error("PDF.js global library object not found on window"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js from CDN. Check connection."));
      document.head.appendChild(script);
    });
  };

  // Process file upload
  const handleFile = async (uploadedFile: File) => {
    if (uploadedFile.type !== "application/pdf" && !uploadedFile.name.endsWith(".pdf")) {
      alert("Invalid format. Please upload a PDF file.");
      return;
    }

    if (uploadedFile.size > 150 * 1024 * 1024) {
      alert("File size exceeds the 150MB limit. Please compress files before splitting.");
      return;
    }

    // Clean old URLs
    if (downloadBlobUrl) {
      URL.revokeObjectURL(downloadBlobUrl);
      setDownloadBlobUrl(null);
    }

    setFile(uploadedFile);
    setFileSize(uploadedFile.size);
    setUploadStatus("reading");
    setErrorMessage(null);
    setSplitStatus("idle");

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();

      // 1) Read metadata and count pages using pdf-lib
      const pdfLibDoc = await PDFDocument.load(arrayBuffer, { 
        ignoreEncryption: true,
        updateMetadata: false 
      });

      const pagesNum = pdfLibDoc.getPageCount();
      setPageCount(pagesNum);
      setSelectedPages(new Array(pagesNum).fill(false));

      // Extract PDF version from header bytes directly
      const headerBytes = new Uint8Array(arrayBuffer.slice(0, 32));
      const headerString = new TextDecoder().decode(headerBytes);
      const versionMatch = headerString.match(/%PDF-(\d+\.\d+)/);
      const pdfVersion = versionMatch ? versionMatch[1] : undefined;

      // Retrieve PDF Metadata safely
      const parsedMeta: PdfMetadata = {
        title: pdfLibDoc.getTitle() || undefined,
        author: pdfLibDoc.getAuthor() || undefined,
        creator: pdfLibDoc.getCreator() || undefined,
        producer: pdfLibDoc.getProducer() || undefined,
        subject: pdfLibDoc.getSubject() || undefined,
        version: pdfVersion
      };
      setMetadata(parsedMeta);

      // 2) Load PDFJS for canvas rendering
      setUploadStatus("reading");
      const pdfjs = await loadPdfJs();
      setPdfjsLoaded(true);

      const doc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      setPdfjsDoc(doc);
      setUploadStatus("ready");
    } catch (err: any) {
      console.error("Upload process error:", err);
      let msg = "Could not parse PDF. Ensure it is not password protected or corrupted.";
      if (err.message && err.message.includes("encrypted")) {
        msg = "Document is password protected. Please unlock it before uploading.";
      }
      setErrorMessage(msg);
      setUploadStatus("error");
    }
  };

  // Upload handlers
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Helper format utilities
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Selection control shortcuts
  const togglePageSelect = (index: number) => {
    setSelectedPages(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const selectAllPages = () => {
    setSelectedPages(new Array(pageCount).fill(true));
  };

  const clearSelection = () => {
    setSelectedPages(new Array(pageCount).fill(false));
    setCustomRangeString("");
  };

  const invertSelection = () => {
    setSelectedPages(prev => prev.map(val => !val));
  };

  // Presets
  const applyPreset = (type: "odd" | "even" | "half1" | "half2") => {
    if (pageCount === 0) return;
    const nextSelect = new Array(pageCount).fill(false);
    
    if (type === "odd") {
      for (let i = 0; i < pageCount; i += 2) nextSelect[i] = true;
    } else if (type === "even") {
      for (let i = 1; i < pageCount; i += 2) nextSelect[i] = true;
    } else if (type === "half1") {
      const mid = Math.ceil(pageCount / 2);
      for (let i = 0; i < mid; i++) nextSelect[i] = true;
    } else if (type === "half2") {
      const mid = Math.ceil(pageCount / 2);
      for (let i = mid; i < pageCount; i++) nextSelect[i] = true;
    }

    setSelectedPages(nextSelect);
  };

  // Custom range lists (Tab Ranges)
  const addCustomRange = () => {
    const nextId = (customRanges.length + 1).toString();
    setCustomRanges([...customRanges, { id: nextId, start: "", end: "" }]);
  };

  const removeCustomRange = (id: string) => {
    if (customRanges.length === 1) return;
    setCustomRanges(customRanges.filter(r => r.id !== id));
  };

  const updateRange = (id: string, field: "start" | "end", val: string) => {
    const cleanVal = val.replace(/[^0-9]/g, "");
    setCustomRanges(prev => prev.map(r => r.id === id ? { ...r, [field]: cleanVal } : r));
  };

  // Custom parser range strings (e.g. "1-3, 5")
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

  // ─────────────────────────────────────────────────────────
  // SPLITTING FLOW
  // ─────────────────────────────────────────────────────────
  const handleSplitPdf = async () => {
    if (!file) return;

    setErrorMessage(null);
    setSplitStatus("processing");
    setSplitProgress(10);
    setSplitStep("Loading binary document buffer...");

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Load source document
      const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const maxPages = srcPdf.getPageCount();

      setSplitProgress(25);
      setSplitStep("Parsing split instructions...");

      interface OutputEntry {
        name: string;
        indices: number[];
      }
      const outputs: OutputEntry[] = [];
      const basePrefix = outputPrefix.trim() ? outputPrefix.trim() : "document";

      // Tab selection logic
      if (activeTab === "extract") {
        let indicesToExtract = parseRangeStr(customRangeString, maxPages);
        if (indicesToExtract.length === 0) {
          // Fallback to selectedPages boolean array
          selectedPages.forEach((val, idx) => {
            if (val) indicesToExtract.push(idx);
          });
        }

        if (indicesToExtract.length === 0) {
          throw new Error("No pages selected for extraction. Check visual boxes or type custom pages.");
        }

        outputs.push({
          name: `${basePrefix}_extracted.pdf`,
          indices: indicesToExtract
        });
      }
      else if (activeTab === "ranges") {
        // Parse the list of customRanges
        customRanges.forEach((range, idx) => {
          const start = parseInt(range.start, 10);
          const end = parseInt(range.end, 10);
          if (!isNaN(start) && start > 0 && start <= maxPages) {
            const finalEnd = (!isNaN(end) && end >= start && end <= maxPages) ? end : start;
            const indices: number[] = [];
            for (let i = start; i <= finalEnd; i++) {
              indices.push(i - 1);
            }
            outputs.push({
              name: `${basePrefix}_range_${start}-${finalEnd}.pdf`,
              indices
            });
          }
        });

        if (outputs.length === 0) {
          throw new Error("Please enter at least one valid page range.");
        }
      }
      else if (activeTab === "every") {
        for (let i = 0; i < maxPages; i++) {
          outputs.push({
            name: `${basePrefix}_page_${i + 1}.pdf`,
            indices: [i]
          });
        }
      }
      else if (activeTab === "interval") {
        const size = parseInt(intervalPages, 10);
        if (isNaN(size) || size < 1) {
          throw new Error("Please enter a valid page interval size (must be 1 or greater).");
        }

        for (let i = 0; i < maxPages; i += size) {
          const indices: number[] = [];
          const endLimit = Math.min(i + size, maxPages);
          for (let k = i; k < endLimit; k++) {
            indices.push(k);
          }
          outputs.push({
            name: `${basePrefix}_interval_${i + 1}-${endLimit}.pdf`,
            indices
          });
        }
      }

      setSplitProgress(40);
      setSplitStep(`Generating split outputs (0/${outputs.length})...`);

      interface CreatedFile {
        name: string;
        bytes: Uint8Array;
      }
      const filesCreated: CreatedFile[] = [];

      // Loop and split pages chunk-by-chunk to prevent freezing browser thread
      for (let i = 0; i < outputs.length; i++) {
        const out = outputs[i];
        
        // Chunk processing: give browser room to breathe on massive lists
        if (i % 25 === 0 && i > 0) {
          setSplitStep(`Generating split outputs (${i}/${outputs.length})...`);
          setSplitProgress(Math.floor(40 + (i / outputs.length) * 40));
          await new Promise(r => setTimeout(r, 0)); 
        }

        const subPdf = await PDFDocument.create();
        const copiedPages = await subPdf.copyPages(srcPdf, out.indices);
        copiedPages.forEach(page => subPdf.addPage(page));

        const pdfBytes = await subPdf.save({
          useObjectStreams: isOptimizing,
          addDefaultPage: false
        });

        filesCreated.push({
          name: out.name,
          bytes: pdfBytes
        });
      }

      setSplitProgress(85);
      setSplitStep("Finalizing output packaging...");

      let finalBlobUrl = "";
      let finalName = "";
      let isMultiple = filesCreated.length > 1;
      let totalBytesWritten = 0;

      if (!isMultiple) {
        // Single PDF
        const target = filesCreated[0];
        const blob = new Blob([target.bytes as any], { type: "application/pdf" });
        finalBlobUrl = URL.createObjectURL(blob);
        finalName = target.name;
        totalBytesWritten = blob.size;
        setDownloadType("pdf");
      } else {
        // Multiple PDFs -> ZIP Archive
        setSplitStep("Creating ZIP archive package...");
        const zip = new JSZip();
        
        filesCreated.forEach(f => {
          zip.file(f.name, f.bytes);
          totalBytesWritten += f.bytes.length;
        });

        const zipBlob = await zip.generateAsync({ 
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 6 }
        });

        finalBlobUrl = URL.createObjectURL(zipBlob);
        finalName = `${basePrefix}_split_files.zip`;
        totalBytesWritten = zipBlob.size;
        setDownloadType("zip");
      }

      setDownloadBlobUrl(finalBlobUrl);
      setDownloadName(finalName);
      setIsMultipleOutputs(isMultiple);
      setSplitProgress(100);
      setSplitStatus("success");

      // Register in Local History
      const newHistoryItem: SplitHistoryItem = {
        id: `split-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: Date.now(),
        inputName: file.name,
        totalPageCount: maxPages,
        operationType: activeTab === "extract" ? "Page Extraction" :
                       activeTab === "ranges" ? "Split by Ranges" :
                       activeTab === "every" ? "Split Every Page" : "Interval Split",
        outputCount: filesCreated.length,
        totalSize: totalBytesWritten
      };

      const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("split_pdf_history", JSON.stringify(updatedHistory));

    } catch (err: any) {
      console.error("PDF splitting execution error:", err);
      setErrorMessage(err.message || "An unexpected error occurred during processing. Please try again.");
      setSplitStatus("error");
    }
  };

  const triggerDownload = () => {
    if (!downloadBlobUrl) return;
    const a = document.createElement("a");
    a.href = downloadBlobUrl;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetSplitTool = () => {
    if (downloadBlobUrl) {
      URL.revokeObjectURL(downloadBlobUrl);
    }
    setFile(null);
    setMetadata(null);
    setPageCount(0);
    setFileSize(0);
    setUploadStatus("idle");
    setErrorMessage(null);
    setPdfjsDoc(null);
    setSelectedPages([]);
    setCustomRangeString("");
    setCustomRanges([{ id: "1", start: "1", end: "" }]);
    setSplitStatus("idle");
    setSplitProgress(0);
    setDownloadBlobUrl(null);
    setIsMultipleOutputs(false);
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your local split history?")) {
      setHistory([]);
      localStorage.removeItem("split_pdf_history");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Global Drag Overlay */}
      {globalDragActive && (
        <div 
          className="fixed inset-0 z-50 bg-indigo-900/30 dark:bg-slate-950/70 backdrop-blur-sm border-4 border-dashed border-[#518231] flex flex-col items-center justify-center pointer-events-none animate-in fade-in duration-200"
          aria-hidden="true"
        >
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-md mx-4 border border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-[#518231]/10 flex items-center justify-center text-[#518231] animate-bounce">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Drop PDF Anywhere</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Release to start loading your document pages.</p>
          </div>
        </div>
      )}

      {/* Top Privacy/Security Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#518231]/5 border border-[#518231]/20 dark:border-[#518231]/10 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white text-sm">Secure Browser Processing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Files never leave your device. All operations are run locally in sandboxed memory.</p>
          </div>
        </div>
        
        <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-end">
          <button 
            onClick={() => setShowHistory(!showHistory)} 
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showHistory 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700' 
                : 'bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
            }`}
          >
            <History size={14} /> History
          </button>
          {file && (
            <button 
              onClick={resetSplitTool}
              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/30 text-xs font-semibold text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Reset Tool
            </button>
          )}
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm relative animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-3">
            <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
              <History size={16} className="text-[#518231]" /> Recent Splits (Device History)
            </h4>
            {history.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
              >
                <Trash2 size={12} /> Clear Logs
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">No recent splits on this browser.</p>
          ) : (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-60 overflow-y-auto custom-scrollbar pr-1">
              {history.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-3 rounded-lg flex flex-col gap-1.5 shadow-3xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-750 dark:text-slate-350 truncate pr-4" title={item.inputName}>
                      {item.inputName}
                    </span>
                    <span className="text-[9px] text-slate-400 shrink-0">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5">
                    <p>Mode: <strong>{item.operationType}</strong></p>
                    <p>Split Size: <strong>{formatBytes(item.totalSize)}</strong> ({item.outputCount} files generated)</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Upload / Control Panel Interface */}
      {splitStatus === "idle" && (
        <div className="w-full">
          {uploadStatus === "idle" || uploadStatus === "reading" || uploadStatus === "error" ? (
            <div className="w-full flex flex-col gap-4">
              
              {/* UPLOAD BOX */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-3 border-dashed rounded-2xl p-10 md:p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group ${
                  dragActive 
                    ? "border-[#518231] bg-[#518231]/5 shadow-[0_0_20px_-3px_rgba(81,130,49,0.2)]" 
                    : "border-slate-300 dark:border-slate-850 hover:border-[#518231] dark:hover:border-[#518231] bg-white dark:bg-slate-900/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/80"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  id="pdf-split-input"
                  aria-label="Upload PDF for Splitting"
                />
                
                {uploadStatus === "reading" ? (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <Loader2 className="animate-spin text-[#518231]" size={36} />
                    <h3 className="text-lg font-bold text-slate-850 dark:text-white">Analyzing Document...</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Reading page boundaries and preparing preview panels.</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#518231]/10 group-hover:text-[#518231] transition-all duration-300 mb-4 shadow-3xs">
                      <Upload size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-[#518231] transition-colors">
                      Drag & Drop Your PDF File Here
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                      or click to browse local files. Splits happen instantly on your device.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-400">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">PDF format</span>
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">Up to 150MB</span>
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">Privacy Protected</span>
                    </div>
                  </>
                )}
              </div>

              {/* Error Box */}
              {errorMessage && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-4 rounded-xl flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-red-800 dark:text-red-300">Analysis Error</h5>
                    <p className="text-xs text-red-600 dark:text-red-400/90 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            
            /* DUAL-COLUMN WORKSPACE */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: Controls & Configurations (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* PDF INFO BLOCK */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-3xs space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-9 h-11 rounded bg-red-50 dark:bg-red-950/30 text-red-500 border border-red-100 dark:border-red-900/30 flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-3xs select-none">
                      <FileText size={18} />
                      <div className="absolute bottom-0 inset-x-0 bg-red-650 text-white text-[7px] font-bold text-center py-0.5 uppercase tracking-wider">
                        PDF
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate" title={file?.name}>
                        {file?.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {formatBytes(fileSize)} • <strong className="text-slate-700 dark:text-slate-350">{pageCount} Pages</strong>
                      </p>
                    </div>
                  </div>

                  {/* Metadata fields inspector */}
                  {metadata && (metadata.title || metadata.author || metadata.producer) && (
                    <details className="group border border-slate-100 dark:border-slate-800/80 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 overflow-hidden">
                      <summary className="flex items-center justify-between px-3 py-2 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-400 list-none [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-1.5"><Info size={12} /> Document Metadata</span>
                        <ChevronDown size={12} className="transform group-open:rotate-180 transition-transform text-slate-400" />
                      </summary>
                      <div className="px-3 pb-3 pt-1 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5 border-t border-slate-100 dark:border-slate-850">
                        {metadata.title && <p>Title: <strong className="text-slate-700 dark:text-slate-350">{metadata.title}</strong></p>}
                        {metadata.author && <p>Author: <strong className="text-slate-700 dark:text-slate-350">{metadata.author}</strong></p>}
                        {metadata.creator && <p>Creator: <strong className="text-slate-700 dark:text-slate-350">{metadata.creator}</strong></p>}
                        {metadata.producer && <p>Producer: <strong className="text-slate-700 dark:text-slate-350">{metadata.producer}</strong></p>}
                        {metadata.version && <p>PDF Version: <strong className="text-slate-700 dark:text-slate-350">{metadata.version}</strong></p>}
                      </div>
                    </details>
                  )}
                </div>

                {/* OPERATION CONTROLLER CARDS */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-3xs overflow-hidden">
                  
                  {/* Tab list header */}
                  <div className="grid grid-cols-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 p-1">
                    {[
                      { id: "extract", label: "Extract", icon: Scissors, tooltip: "Extract specific pages" },
                      { id: "ranges", label: "Ranges", icon: Columns, tooltip: "Split into page ranges" },
                      { id: "every", label: "Every", icon: Layers, tooltip: "Split page-by-page" },
                      { id: "interval", label: "Interval", icon: FileCode, tooltip: "Split at intervals" }
                    ].map(tab => {
                      const IconComp = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id as any);
                            setErrorMessage(null);
                          }}
                          className={`flex flex-col items-center gap-1 py-2 px-1 text-[10px] font-bold rounded-lg transition-all ${
                            activeTab === tab.id
                              ? "bg-white dark:bg-slate-900 text-[#518231] shadow-2xs"
                              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                          }`}
                          title={tab.tooltip}
                        >
                          <IconComp size={14} />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab details view */}
                  <div className="p-5 space-y-4">
                    
                    {/* 1) EXTRACT PAGES TAB */}
                    {activeTab === "extract" && (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Pages to Extract
                          </label>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            Type range (e.g. <strong>1, 3, 5-8</strong>) or click pages in the grid.
                          </p>
                          <input
                            type="text"
                            value={customRangeString}
                            onChange={(e) => setCustomRangeString(e.target.value)}
                            placeholder="e.g. 1-3, 5, 8-10"
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 focus:bg-white border border-slate-250 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none font-mono"
                          />
                        </div>

                        {/* Presets row */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Selection Presets</span>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => applyPreset("odd")}
                              className="px-2 py-1.5 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-950/20 dark:hover:bg-slate-900/20 transition-all text-center"
                            >
                              Odd Pages Only
                            </button>
                            <button
                              onClick={() => applyPreset("even")}
                              className="px-2 py-1.5 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-950/20 dark:hover:bg-slate-900/20 transition-all text-center"
                            >
                              Even Pages Only
                            </button>
                            <button
                              onClick={() => applyPreset("half1")}
                              className="px-2 py-1.5 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-950/20 dark:hover:bg-slate-900/20 transition-all text-center"
                            >
                              First Half (1 - {Math.ceil(pageCount/2)})
                            </button>
                            <button
                              onClick={() => applyPreset("half2")}
                              className="px-2 py-1.5 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-950/20 dark:hover:bg-slate-900/20 transition-all text-center"
                            >
                              Second Half
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2) CUSTOM RANGE SPLITTING TAB */}
                    {activeTab === "ranges" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Page Ranges To Create
                          </label>
                          <button
                            onClick={addCustomRange}
                            className="text-[11px] text-[#518231] hover:underline font-bold flex items-center gap-0.5"
                          >
                            <Plus size={11} /> Add Range
                          </button>
                        </div>
                        
                        <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                          {customRanges.map((range, index) => (
                            <div key={range.id} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950/40 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                              <span className="text-[10px] font-bold text-slate-400 w-5 text-center shrink-0">#{index+1}</span>
                              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                <input
                                  type="text"
                                  placeholder="Start"
                                  value={range.start}
                                  onChange={(e) => updateRange(range.id, "start", e.target.value)}
                                  className="w-16 px-2 py-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs font-mono text-center rounded focus:outline-none"
                                />
                                <span className="text-slate-400 text-xs">to</span>
                                <input
                                  type="text"
                                  placeholder="End"
                                  value={range.end}
                                  onChange={(e) => updateRange(range.id, "end", e.target.value)}
                                  className="w-16 px-2 py-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs font-mono text-center rounded focus:outline-none"
                                />
                              </div>
                              <button
                                onClick={() => removeCustomRange(range.id)}
                                disabled={customRanges.length === 1}
                                className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-20 transition-all shrink-0"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3) SPLIT EVERY PAGE TAB */}
                    {activeTab === "every" && (
                      <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 rounded-xl p-4 space-y-2">
                        <h5 className="font-bold text-xs text-slate-700 dark:text-slate-300">Separate All Pages</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          This operation will decompose the PDF into <strong>{pageCount} separate single-page files</strong>. They will be bundled into a compressed ZIP file automatically.
                        </p>
                      </div>
                    )}

                    {/* 4) SPLIT BY INTERVAL TAB */}
                    {activeTab === "interval" && (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            Split Every N Pages
                          </label>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            Enter the page size interval for output slices.
                          </p>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min="1"
                              max={pageCount}
                              value={intervalPages}
                              onChange={(e) => setIntervalPages(e.target.value.replace(/[^0-9]/g, ""))}
                              className="w-24 px-3 py-2 bg-slate-50 dark:bg-slate-950 focus:bg-white border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none font-mono"
                            />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              Creates ~{Math.ceil(pageCount / (parseInt(intervalPages, 10) || 1))} documents.
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OUTPUT NAME CUSTOMIZER */}
                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 space-y-3">
                      <h5 className="font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Settings className="text-[#518231]" size={14} /> Output Configuration
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Custom filename prefix */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            Output Prefix Name
                          </label>
                          <input
                            type="text"
                            value={outputPrefix}
                            onChange={(e) => setOutputPrefix(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                            placeholder="prefix-name"
                            className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 focus:bg-white border border-slate-250 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>

                        {/* File size optimizations toggle */}
                        <div className="flex items-center">
                          <label className="flex items-start gap-2 cursor-pointer mt-4">
                            <input
                              type="checkbox"
                              checked={isOptimizing}
                              onChange={(e) => setIsOptimizing(e.target.checked)}
                              className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-950 border-slate-350 dark:border-slate-800 w-4 h-4 mt-0.5"
                            />
                            <div className="-mt-0.5">
                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">
                                Optimize Output Size
                              </span>
                              <p className="text-[10px] text-slate-400 leading-tight">Consolidate font objects and streams</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    {errorMessage && (
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-3 rounded-lg text-[11px] text-red-650 flex items-center gap-1.5">
                        <AlertCircle size={14} className="shrink-0" /> {errorMessage}
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={resetSplitTool}
                        className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs transition-all text-center shadow-3xs"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={handleSplitPdf}
                        className="flex-2 py-2.5 bg-gradient-to-r from-[#518231] to-[#436a28] hover:from-[#436a28] hover:to-[#365420] text-white font-bold rounded-xl text-xs transition-all text-center shadow-md flex items-center justify-center gap-1.5"
                      >
                        <Scissors size={14} /> Split PDF Document
                      </button>
                    </div>

                  </div>
                </div>

              </div>
              
              {/* RIGHT COLUMN: Interactive Page Grid Previews (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* TOOLBAR CONTROLS */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-3xs flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-[#518231]" />
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Visual Page Selector</h4>
                  </div>
                  
                  {/* Zoom, selectors */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Selector triggers */}
                    <div className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-0.5 rounded-lg">
                      <button
                        type="button"
                        onClick={selectAllPages}
                        className="px-2 py-1 text-[10px] font-bold text-slate-650 hover:bg-white dark:hover:bg-slate-900 rounded-md transition-all flex items-center gap-0.5"
                        title="Select All Pages"
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="px-2 py-1 text-[10px] font-bold text-slate-650 hover:bg-white dark:hover:bg-slate-900 rounded-md transition-all flex items-center gap-0.5"
                        title="Deselect All Pages"
                      >
                        None
                      </button>
                      <button
                        type="button"
                        onClick={invertSelection}
                        className="px-2 py-1 text-[10px] font-bold text-slate-650 hover:bg-white dark:hover:bg-slate-900 rounded-md transition-all flex items-center gap-0.5"
                        title="Invert Selection"
                      >
                        Invert
                      </button>
                    </div>

                    {/* Zoom actions */}
                    <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-950">
                      <button
                        type="button"
                        onClick={() => setZoom(z => Math.max(0.6, z - 0.2))}
                        disabled={zoom <= 0.6}
                        className="p-1 rounded-md text-slate-500 hover:bg-white dark:hover:bg-slate-900 disabled:opacity-20 transition-all"
                        title="Zoom Out"
                      >
                        <ZoomOut size={12} />
                      </button>
                      <span className="text-[9px] font-bold text-slate-500 w-8 text-center">{Math.round(zoom * 100)}%</span>
                      <button
                        type="button"
                        onClick={() => setZoom(z => Math.min(1.8, z + 0.2))}
                        disabled={zoom >= 1.8}
                        className="p-1 rounded-md text-slate-500 hover:bg-white dark:hover:bg-slate-900 disabled:opacity-20 transition-all"
                        title="Zoom In"
                      >
                        <ZoomIn size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* VISUAL GRID container */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-3xs max-h-[600px] overflow-y-auto custom-scrollbar">
                  {pdfjsDoc ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
                      {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
                        <Thumbnail
                          key={pageNum}
                          pageNumber={pageNum}
                          pdfDoc={pdfjsDoc}
                          zoom={zoom}
                          isSelected={selectedPages[pageNum - 1] || false}
                          onToggleSelect={() => togglePageSelect(pageNum - 1)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20 gap-3 text-slate-405">
                      <Loader2 className="animate-spin text-[#518231]" size={24} />
                      <p className="text-xs font-semibold">Loading thumbnail viewer...</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}
        </div>
      )}

      {/* Merging processing state */}
      {splitStatus === "processing" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center gap-4 py-16 animate-in fade-in duration-300">
          <div className="relative flex items-center justify-center">
            <Loader2 className="animate-spin text-[#518231]" size={56} strokeWidth={2.5} />
            <span className="absolute text-xs font-bold text-slate-700 dark:text-slate-350">{splitProgress}%</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-2">Splitting PDF Document</h3>
          <p className="text-sm text-[#518231] font-semibold animate-pulse">{splitStep}</p>
          <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2 border border-slate-200/40 dark:border-slate-850">
            <div 
              className="bg-[#518231] h-full rounded-full transition-all duration-300"
              style={{ width: `${splitProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed mt-2">
            Do not close this page. This process runs locally in memory and will finish shortly.
          </p>
        </div>
      )}

      {/* Success Output Download Box */}
      {splitStatus === "success" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-md text-center flex flex-col items-center gap-6 py-12 max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
          
          <div className="w-16 h-16 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center">
            <CheckCircle size={36} strokeWidth={2.5} />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">PDF Split Completed!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Your document was split successfully into <strong>{isMultipleOutputs ? "multiple PDF files" : "a single PDF document"}</strong>. Download is ready.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800/80 rounded-xl p-4 w-full flex items-center gap-3 max-w-md">
            <div className="w-10 h-12 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-3xs select-none">
              <FileText size={18} />
              <div className={`absolute bottom-0 inset-x-0 ${downloadType === 'zip' ? 'bg-amber-600' : 'bg-indigo-600'} text-white text-[8px] font-bold text-center py-0.5 uppercase tracking-wider`}>
                {downloadType}
              </div>
            </div>
            <div className="min-w-0 flex-1 text-left">
              <h5 className="font-bold text-slate-700 dark:text-slate-300 text-sm truncate" title={downloadName}>
                {downloadName}
              </h5>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Ready for download • Browser safe
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <button
              onClick={resetSplitTool}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-250 font-bold rounded-xl text-sm transition-all"
            >
              Split Another File
            </button>
            <button
              onClick={triggerDownload}
              className="flex-2 py-3 bg-gradient-to-r from-[#518231] to-[#436a28] hover:from-[#436a28] hover:to-[#365420] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/25"
            >
              <Download size={18} /> Download Now
            </button>
          </div>

          <div className="text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-850/80 pt-4 w-full max-w-sm">
            Files processed locally. They never leave your device.
          </div>
        </div>
      )}

    </div>
  );
}
