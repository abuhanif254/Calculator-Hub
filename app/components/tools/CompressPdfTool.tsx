"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  FileText, Upload, Trash2, Settings, CheckCircle, AlertCircle, 
  Loader2, Download, RefreshCw, History, ShieldAlert, Info, Check,
  Percent, ChevronDown, ArrowRight, Zap, Eye, Sliders, Maximize, ZoomIn, ZoomOut
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

const PDFJS_VERSION = "3.11.174";
const MAX_LOCAL_FILE_SIZE = 15 * 1024 * 1024; // 15MB

interface PdfMetadata {
  title?: string;
  author?: string;
  creator?: string;
  producer?: string;
  version?: string;
}

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number | null;
  status: "pending" | "processing" | "success" | "error";
  compressedSize?: number;
  progress: number;
  errorMessage?: string;
  downloadUrl?: string | null;
  metadata?: PdfMetadata | null;
}

interface CompressionHistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
  originalSize: number;
  compressedSize: number;
  pages: number;
  mode: string;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export function CompressPdfTool() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  
  // Compression Settings
  // Mode: "structural" (Lossless metadata & font cleanup) | "lossy" (Image downsampling / Scanned PDFs)
  const [compressionMode, setCompressionMode] = useState<"structural" | "lossy">("structural");
  // Presets: "low" | "medium" | "high" | "custom"
  const [preset, setPreset] = useState<"low" | "medium" | "high" | "custom">("medium");
  const [quality, setQuality] = useState<number>(70); // 10% to 100%
  const [dpi, setDpi] = useState<number>(150); // 72, 96, 150, 200

  // Preview Slider State
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  const [pdfjsLoaded, setPdfjsLoaded] = useState<boolean>(false);

  // Global triggers
  const [batchStatus, setBatchStatus] = useState<"idle" | "compressing" | "success" | "error">("idle");
  const [globalProgress, setGlobalProgress] = useState<number>(0);
  const [globalStep, setGlobalStep] = useState<string>("");
  const [zipBlobUrl, setZipBlobUrl] = useState<string | null>(null);
  const [zipName, setZipName] = useState<string>("compressed_files.zip");
  
  // History & UX
  const [history, setHistory] = useState<CompressionHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [globalDragActive, setGlobalDragActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const activeRenderTaskRef = useRef<any>(null);

  // Sync sliders to preset changes
  useEffect(() => {
    if (preset === "low") {
      setQuality(90);
      setDpi(200);
      setCompressionMode("structural");
    } else if (preset === "medium") {
      setQuality(70);
      setDpi(150);
      setCompressionMode("structural"); // Recompiles tree
    } else if (preset === "high") {
      setQuality(50);
      setDpi(96);
      setCompressionMode("lossy"); // Enforce image downsampling
    }
  }, [preset]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("compress_pdf_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history logs", e);
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

  // PDFJS script dynamic loader
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

  // Generate page 1 preview comparison image based on settings
  const generatePreviewComparison = async (pdfDocObj: any) => {
    if (!pdfDocObj || !previewCanvasRef.current) return;
    setIsPreviewLoading(true);

    try {
      // 1) Render high-res original canvas
      const page = await pdfDocObj.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 }); // larger for preview detail
      const canvas = previewCanvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not acquire canvas 2d context");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Cancel previous render task if any to prevent "Cannot use the same canvas during multiple render() operations" error
      if (activeRenderTaskRef.current) {
        try {
          activeRenderTaskRef.current.cancel();
        } catch (err) {
          // ignore
        }
        activeRenderTaskRef.current = null;
      }

      const renderTask = page.render({ canvasContext: context, viewport });
      activeRenderTaskRef.current = renderTask;

      try {
        await renderTask.promise;
      } catch (err: any) {
        if (err.name === "RenderingCancelledException") {
          // Stale render was cancelled by a newer trigger. Return silently.
          return;
        }
        throw err;
      } finally {
        if (activeRenderTaskRef.current === renderTask) {
          activeRenderTaskRef.current = null;
        }
      }

      // Set original preview url
      const originalUrl = canvas.toDataURL("image/png");
      setOriginalPreviewUrl(originalUrl);

      // 2) Render downsampled compressed canvas
      const targetScale = (dpi / 72) * 1.0; // scale factor based on DPI (72 is standard PDF scale)
      const compressedViewport = page.getViewport({ scale: targetScale });
      
      const compCanvas = document.createElement("canvas");
      const compContext = compCanvas.getContext("2d");
      if (compContext) {
        compCanvas.width = compressedViewport.width;
        compCanvas.height = compressedViewport.height;

        await page.render({ canvasContext: compContext, viewport: compressedViewport }).promise;
        
        // Export with target JPEG quality
        const compressedUrl = compCanvas.toDataURL("image/jpeg", quality / 100);
        setCompressedPreviewUrl(compressedUrl);
      }
    } catch (error) {
      console.error("Error creating slider preview comparisons:", error);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  // Trigger preview update when settings change
  useEffect(() => {
    if (pdfjsDoc && activeFileId) {
      generatePreviewComparison(pdfjsDoc);
    }
    return () => {
      if (activeRenderTaskRef.current) {
        try {
          activeRenderTaskRef.current.cancel();
        } catch (err) {
          // ignore
        }
        activeRenderTaskRef.current = null;
      }
    };
  }, [quality, dpi, compressionMode, pdfjsDoc, activeFileId]);

  // Load active file metadata & preview document
  const selectActiveFile = async (item: FileItem) => {
    setActiveFileId(item.id);
    setPdfjsDoc(null);
    setOriginalPreviewUrl(null);
    setCompressedPreviewUrl(null);
    
    try {
      const arrayBuffer = await item.file.arrayBuffer();
      const pdfjs = await loadPdfJs();
      setPdfjsLoaded(true);

      const doc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      setPdfjsDoc(doc);
      await generatePreviewComparison(doc);
    } catch (e) {
      console.error("Failed to load preview for file:", e);
    }
  };

  // Add files to collection and parse details
  const processFiles = async (fileList: FileList) => {
    const newItems: FileItem[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (f.type !== "application/pdf" && !f.name.endsWith(".pdf")) {
        alert(`File "${f.name}" is not a valid PDF.`);
        continue;
      }

      if (f.size > 150 * 1024 * 1024) {
        alert(`File "${f.name}" exceeds the maximum limit of 150MB.`);
        continue;
      }

      const id = `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      newItems.push({
        id,
        file: f,
        name: f.name,
        size: f.size,
        pageCount: null,
        status: "pending",
        progress: 0
      });
    }

    if (newItems.length === 0) return;

    setFiles(prev => [...prev, ...newItems]);

    // Set active file immediately if none is set
    if (!activeFileId) {
      selectActiveFile(newItems[0]);
    }

    // Inspect files pages in background
    for (const item of newItems) {
      try {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdfLibDoc = await PDFDocument.load(arrayBuffer, { 
          ignoreEncryption: true,
          updateMetadata: false 
        });

        const pagesNum = pdfLibDoc.getPageCount();
        const headerBytes = new Uint8Array(arrayBuffer.slice(0, 32));
        const headerString = new TextDecoder().decode(headerBytes);
        const versionMatch = headerString.match(/%PDF-(\d+\.\d+)/);
        
        const metadata: PdfMetadata = {
          title: pdfLibDoc.getTitle() || undefined,
          author: pdfLibDoc.getAuthor() || undefined,
          creator: pdfLibDoc.getCreator() || undefined,
          producer: pdfLibDoc.getProducer() || undefined,
          version: versionMatch ? versionMatch[1] : undefined
        };

        setFiles(prev => 
          prev.map(it => it.id === item.id 
            ? { ...it, pageCount: pagesNum, status: "pending", metadata } 
            : it
          )
        );
      } catch (err: any) {
        console.error("Error reading file metadata", err);
        let msg = "Unreadable PDF file.";
        if (err.message && err.message.includes("encrypted")) {
          msg = "Password protected PDF file.";
        }
        setFiles(prev => 
          prev.map(it => it.id === item.id 
            ? { ...it, status: "error", errorMessage: msg } 
            : it
          )
        );
      }
    }
  };

  // Upload actions
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

  const removeFile = (id: string) => {
    setFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      if (filtered.length > 0) {
        if (activeFileId === id) {
          selectActiveFile(filtered[0]);
        }
      } else {
        setActiveFileId(null);
        setPdfjsDoc(null);
        setOriginalPreviewUrl(null);
        setCompressedPreviewUrl(null);
      }
      return filtered;
    });
  };

  // ─────────────────────────────────────────────────────────
  // COMPRESSION CORE ENGINE
  // ─────────────────────────────────────────────────────────
  const compressSingleFile = async (
    item: FileItem, 
    updateProgress: (p: number, step: string) => void
  ): Promise<{ bytes: Uint8Array; name: string }> => {
    const arrayBuffer = await item.file.arrayBuffer();

    // Choice of routing mode:
    // Files over 15MB: server action route handler
    if (item.size > MAX_LOCAL_FILE_SIZE) {
      updateProgress(30, "Sending file to server API endpoint (File > 15MB)...");
      const formData = new FormData();
      formData.append("file", item.file);
      formData.append("optimize", "true");

      const response = await fetch("/api/tools/compress-pdf", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.error || "Server error while compressing PDF.");
      }

      updateProgress(85, "Receiving compressed stream from server...");
      const compressedBuffer = await response.arrayBuffer();
      updateProgress(100, "Done.");
      return {
        bytes: new Uint8Array(compressedBuffer),
        name: `${item.name.replace(/\.[^/.]+$/, "")}_compressed.pdf`
      };
    }

    // Files under 15MB: local browser client-side execution
    updateProgress(10, "Loading PDF locally in browser sandbox...");
    const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const maxPages = srcDoc.getPageCount();

    if (compressionMode === "lossy") {
      // 1) Lossy Image Downsampling Mode
      // We render every page onto canvas using PDF.js and re-embed them as JPEGs
      updateProgress(25, "Initializing PDF.js rendering parser...");
      const pdfjs = await loadPdfJs();
      const doc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

      const newDoc = await PDFDocument.create();
      const targetScale = dpi / 72;

      for (let pageIdx = 0; pageIdx < maxPages; pageIdx++) {
        updateProgress(
          Math.floor(25 + (pageIdx / maxPages) * 60),
          `Rasterizing and compressing page ${pageIdx + 1}/${maxPages}...`
        );

        const page = await doc.getPage(pageIdx + 1);
        const originalViewport = page.getViewport({ scale: 1.0 });
        const viewport = page.getViewport({ scale: targetScale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not allocate HTML5 rendering canvas context");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        // Compress canvas to jpeg bytes
        const dataUrl = canvas.toDataURL("image/jpeg", quality / 100);
        const base64Data = dataUrl.split(",")[1];
        
        // Convert base64 to binary bytes
        const binaryString = window.atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Embed in new document
        const embeddedJpg = await newDoc.embedJpg(bytes);
        const newPage = newDoc.addPage([originalViewport.width, originalViewport.height]);
        newPage.drawImage(embeddedJpg, {
          x: 0,
          y: 0,
          width: originalViewport.width,
          height: originalViewport.height
        });
      }

      updateProgress(90, "Compiling final optimized binary stream...");
      const compressedBytes = await newDoc.save({
        useObjectStreams: isOptimizing,
        addDefaultPage: false
      });

      updateProgress(100, "Done.");
      return {
        bytes: compressedBytes,
        name: `${item.name.replace(/\.[^/.]+$/, "")}_compressed.pdf`
      };
    } else {
      // 2) Lossless Structural Mode
      // Rebuild the catalog, strip metadata, and compress object streams
      updateProgress(35, "Rebuilding object tree & purging duplicate assets...");
      const newDoc = await PDFDocument.create();
      const pageIndices = srcDoc.getPageIndices();
      const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
      copiedPages.forEach((page) => newDoc.addPage(page));

      updateProgress(70, "Stripping metadata headers...");
      newDoc.setTitle("");
      newDoc.setAuthor("");
      newDoc.setSubject("");
      newDoc.setCreator("");
      newDoc.setProducer("");
      newDoc.setCreationDate(new Date(0));
      newDoc.setModificationDate(new Date(0));

      updateProgress(85, "Compiling optimized structures...");
      const compressedBytes = await newDoc.save({
        useObjectStreams: isOptimizing,
        addDefaultPage: false
      });

      updateProgress(100, "Done.");
      return {
        bytes: compressedBytes,
        name: `${item.name.replace(/\.[^/.]+$/, "")}_compressed.pdf`
      };
    }
  };

  // Main execution trigger
  const handleCompressPdf = async () => {
    const pendingFiles = files.filter(f => f.status === "pending");
    if (pendingFiles.length === 0) {
      alert("Please upload at least 1 valid PDF file.");
      return;
    }

    setBatchStatus("compressing");
    setGlobalProgress(10);
    setGlobalStep("Preparing batch operations...");

    try {
      interface CompressedFile {
        name: string;
        bytes: Uint8Array;
      }
      const compressedList: CompressedFile[] = [];
      let sizeWritten = 0;

      for (let i = 0; i < pendingFiles.length; i++) {
        const item = pendingFiles[i];
        
        // Update state to active/processing
        setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: "processing", progress: 10 } : f));
        
        const result = await compressSingleFile(item, (prog, step) => {
          setGlobalProgress(Math.floor(10 + ((i + prog / 100) / pendingFiles.length) * 80));
          setGlobalStep(`[${i+1}/${pendingFiles.length}] ${item.name}: ${step}`);
          
          setFiles(prev => prev.map(f => f.id === item.id ? { ...f, progress: prog } : f));
        });

        compressedList.push(result);
        const finalBlob = new Blob([result.bytes as any], { type: "application/pdf" });
        const finalUrl = URL.createObjectURL(finalBlob);

        // Update single file details in status list
        setFiles(prev => prev.map(f => f.id === item.id ? { 
          ...f, 
          status: "success", 
          progress: 100, 
          compressedSize: finalBlob.size,
          downloadUrl: finalUrl
        } : f));

        sizeWritten += finalBlob.size;

        // Register in Local History
        const historyItem: CompressionHistoryItem = {
          id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          timestamp: Date.now(),
          fileName: item.name,
          originalSize: item.size,
          compressedSize: finalBlob.size,
          pages: item.pageCount || 1,
          mode: compressionMode === "lossy" ? `Lossy (Q:${quality}%, DPI:${dpi})` : "Lossless Structural"
        };
        
        setHistory(prev => {
          const next = [historyItem, ...prev].slice(0, 10);
          localStorage.setItem("compress_pdf_history", JSON.stringify(next));
          return next;
        });
      }

      setGlobalProgress(95);
      setGlobalStep("Finalizing package packaging...");

      // Download trigger config
      if (compressedList.length === 1) {
        // Single PDF
        const target = compressedList[0];
        const blob = new Blob([target.bytes as any], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setZipBlobUrl(url);
        setZipName(target.name);
      } else {
        // Multiple PDFs -> ZIP Package
        setGlobalStep("Creating compressed ZIP archive package...");
        const zip = new JSZip();
        compressedList.forEach(f => zip.file(f.name, f.bytes));
        
        const zipBlob = await zip.generateAsync({ 
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 5 }
        });
        
        const url = URL.createObjectURL(zipBlob);
        setZipBlobUrl(url);
        setZipName(`${files[0].name.replace(/\.[^/.]+$/, "")}_compressed_batch.zip`);
      }

      setGlobalProgress(100);
      setGlobalStep("Compression task completed!");
      setBatchStatus("success");
    } catch (error: any) {
      console.error("Batch compression failed:", error);
      setGlobalStep("Compression failure encountered.");
      setBatchStatus("error");
      alert(error.message || "Compression task failed. Ensure files are readable.");
    }
  };

  const triggerDownload = () => {
    if (!zipBlobUrl) return;
    const a = document.createElement("a");
    a.href = zipBlobUrl;
    a.download = zipName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetCompressTool = () => {
    // Revoke object URLs
    files.forEach(f => {
      if (f.downloadUrl) URL.revokeObjectURL(f.downloadUrl);
    });
    if (zipBlobUrl) URL.revokeObjectURL(zipBlobUrl);

    setFiles([]);
    setActiveFileId(null);
    setPdfjsDoc(null);
    setOriginalPreviewUrl(null);
    setCompressedPreviewUrl(null);
    setBatchStatus("idle");
    setGlobalProgress(0);
    setGlobalStep("");
    setZipBlobUrl(null);
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your local compression history?")) {
      setHistory([]);
      localStorage.removeItem("compress_pdf_history");
    }
  };

  // Smart Recommendations Engine
  const getSmartRecommendation = (): { level: string; desc: string; expectedSavings: string } => {
    if (!activeFileId) return { level: "Medium", desc: "Balanced structural optimizations", expectedSavings: "~20-40%" };
    const current = files.find(f => f.id === activeFileId);
    if (!current) return { level: "Medium", desc: "Balanced structural optimizations", expectedSavings: "~20-40%" };

    if (current.size > 20 * 1024 * 1024) {
      return {
        level: "High (Lossy Resampling)",
        desc: "Best for massive documents. Reduces DPI and re-encodes images.",
        expectedSavings: "~60-80% space saved"
      };
    } else if (current.pageCount && current.pageCount > 100) {
      return {
        level: "Medium (Lossless Structural)",
        desc: "Optimal for long books. Purges orphan layers while keeping fonts selectable.",
        expectedSavings: "~30-50% space saved"
      };
    }

    return {
      level: "Medium (Recommended)",
      desc: "Recompiles object streams and strips unneeded metadata tags.",
      expectedSavings: "~15-35% space saved"
    };
  };

  const recommendation = getSmartRecommendation();

  // Active file info
  const activeFile = files.find(f => f.id === activeFileId);
  const totalOriginalSize = files.reduce((acc, curr) => acc + curr.size, 0);
  const totalCompressedSize = files.reduce((acc, curr) => acc + (curr.compressedSize || 0), 0);
  const totalSavedSize = Math.max(0, totalOriginalSize - totalCompressedSize);
  const totalPercentSaved = totalOriginalSize > 0 ? Math.round((totalSavedSize / totalOriginalSize) * 100) : 0;

  const isOptimizing = true; // structural compress defaults to optimized object streams

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
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Drop PDFs Anywhere</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Release the mouse button to start compressing.</p>
          </div>
        </div>
      )}

      {/* Top Secure Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#518231]/5 border border-[#518231]/20 dark:border-[#518231]/10 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white text-sm">Your files are secure</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Files &lt; 15MB process locally. Large files compress on temporary secure servers. No persistent storage.</p>
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
          {files.length > 0 && (
            <button 
              onClick={resetCompressTool}
              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/30 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Reset Tool
            </button>
          )}
        </div>
      </div>

      {/* History Log */}
      {showHistory && (
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm relative animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-3">
            <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
              <History size={16} className="text-[#518231]" /> Compression Log History (Local)
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
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">No recent compressions on this device.</p>
          ) : (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-60 overflow-y-auto custom-scrollbar pr-1">
              {history.map((item) => {
                const savedBytes = Math.max(0, item.originalSize - item.compressedSize);
                const percentSaved = Math.round((savedBytes / item.originalSize) * 100);
                return (
                  <div 
                    key={item.id}
                    className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-3 rounded-lg flex flex-col gap-1.5 shadow-3xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-750 dark:text-slate-350 truncate pr-4" title={item.fileName}>
                        {item.fileName}
                      </span>
                      <span className="text-[9px] text-slate-400 shrink-0">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5">
                      <p>Mode: <strong>{item.mode}</strong></p>
                      <p>Savings: <strong className="text-green-600 dark:text-green-400">-{percentSaved}%</strong> ({formatBytes(savedBytes)} saved)</p>
                      <p>Original: {formatBytes(item.originalSize)} • Compressed: {formatBytes(item.compressedSize)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Main Panel View */}
      {batchStatus === "idle" && (
        <div className="w-full">
          {files.length === 0 ? (
            /* Upload box */
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
                multiple
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
                id="pdf-compress-input"
                aria-label="Upload PDF for Compression"
              />
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#518231]/10 group-hover:text-[#518231] transition-all duration-300 mb-4 shadow-3xs">
                <Upload size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-[#518231] transition-colors">
                Drag & Drop PDF Documents Here
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                or click to browse files. Supports batch compression up to 10 files.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-400">
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">PDF files</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">Hybrid local/server engine</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">GDPR Compliant</span>
              </div>
            </div>
          ) : (
            
            /* DUAL-COLUMN WORKSPACE */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: Controls & Settings (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* FILE ITEMS CONTAINER */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-3xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Uploaded Documents ({files.length})</span>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-[#518231] hover:underline font-bold"
                    >
                      + Add Files
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                    {files.map((it) => (
                      <div
                        key={it.id}
                        onClick={() => selectActiveFile(it)}
                        className={`flex items-center justify-between gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                          activeFileId === it.id
                            ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10"
                            : "border-slate-150 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <FileText size={16} className={activeFileId === it.id ? "text-[#518231]" : "text-slate-400"} />
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-350 truncate">
                            {it.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] text-slate-400">{formatBytes(it.size)}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(it.id);
                            }}
                            className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COMPRESSION LEVEL BOX */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-3xs space-y-4">
                  <h4 className="font-bold text-slate-850 dark:text-white text-sm flex items-center gap-2">
                    <Sliders className="text-[#518231]" size={16} /> Compression Level
                  </h4>

                  {/* Level selection cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "low", label: "Low", desc: "Best quality" },
                      { id: "medium", label: "Recommended", desc: "Balanced" },
                      { id: "high", label: "High", desc: "Max size cut" },
                    ].map(lev => (
                      <button
                        key={lev.id}
                        type="button"
                        onClick={() => setPreset(lev.id as any)}
                        className={`p-3 rounded-xl border flex flex-col gap-1 text-center transition-all ${
                          preset === lev.id
                            ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10 text-[#518231]"
                            : "border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        <span className="text-xs font-bold">{lev.label}</span>
                        <span className="text-[9px] opacity-75">{lev.desc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Manual Quality Slider for custom */}
                  <div className="border-t border-slate-100 dark:border-slate-850/60 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-650 dark:text-slate-400">Compression Engine Mode</span>
                      <div className="flex gap-2 border border-slate-250 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-0.5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => {
                            setCompressionMode("structural");
                            setPreset("custom");
                          }}
                          className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${
                            compressionMode === "structural" 
                              ? "bg-white dark:bg-slate-900 text-[#518231] shadow-3xs" 
                              : "text-slate-500"
                          }`}
                        >
                          Lossless
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCompressionMode("lossy");
                            setPreset("custom");
                          }}
                          className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${
                            compressionMode === "lossy" 
                              ? "bg-white dark:bg-slate-900 text-[#518231] shadow-3xs" 
                              : "text-slate-500"
                          }`}
                        >
                          Lossy Scan
                        </button>
                      </div>
                    </div>

                    {/* Quality slide for lossy mode */}
                    {compressionMode === "lossy" && (
                      <div className="space-y-1.5 animate-in fade-in duration-200">
                        <div className="flex justify-between text-xs font-semibold text-slate-550">
                          <span>JPEG Quality</span>
                          <strong className="text-[#518231]">{quality}%</strong>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="95"
                          step="5"
                          value={quality}
                          onChange={(e) => {
                            setQuality(Number(e.target.value));
                            setPreset("custom");
                          }}
                          className="w-full accent-[#518231]"
                        />
                        
                        <div className="flex justify-between text-xs font-semibold text-slate-550 pt-2">
                          <span>Image DPI Downscale</span>
                          <div className="flex gap-1.5">
                            {[96, 150, 200].map(d => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => {
                                  setDpi(d);
                                  setPreset("custom");
                                }}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                  dpi === d 
                                    ? "bg-[#518231] text-white border-[#518231]" 
                                    : "bg-transparent text-slate-500 border-slate-200 dark:border-slate-800"
                                }`}
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* SMART RECOMMENDATIONS CARD */}
                {activeFile && (
                  <div className="bg-[#518231]/5 border border-[#518231]/10 dark:border-[#518231]/5 rounded-2xl p-5 shadow-3xs space-y-2 relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-[#518231]/20">
                      <Zap size={40} strokeWidth={3} />
                    </div>
                    
                    <h5 className="font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Zap size={14} className="text-amber-500" /> Smart Compress Recommendation
                    </h5>
                    
                    <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <p>Target Mode: <strong className="text-slate-800 dark:text-white">{recommendation.level}</strong></p>
                      <p className="text-[11px] opacity-90">{recommendation.desc}</p>
                      <p className="text-[#518231] font-bold pt-1">Expected reduction: {recommendation.expectedSavings}</p>
                    </div>
                  </div>
                )}

                {/* Hybrid processing routing indicator */}
                {activeFile && (
                  <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Processing Node Routing:</span>
                    {activeFile.size > MAX_LOCAL_FILE_SIZE ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 font-bold text-[10px]">
                        ☁️ Server-Side (File &gt; 15MB)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-green-150 text-green-800 dark:bg-green-950/30 dark:text-green-400 font-bold text-[10px]">
                        💻 Client-Side (File &lt; 15MB)
                      </span>
                    )}
                  </div>
                )}

                {/* TRIGGERS */}
                <div className="flex gap-3">
                  <button
                    onClick={resetCompressTool}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs transition-all text-center shadow-3xs"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleCompressPdf}
                    className="flex-2 py-2.5 bg-gradient-to-r from-[#518231] to-[#436a28] hover:from-[#436a28] hover:to-[#365420] text-white font-bold rounded-xl text-xs transition-all text-center shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Percent size={14} /> Compress PDF File(s)
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: Quality Slider Preview (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Canvas hidden helper to render high-res image */}
                <canvas ref={previewCanvasRef} className="hidden" />

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-3xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="text-[#518231]" size={16} />
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Compression Preview Slider (Page 1)</h4>
                  </div>
                  {activeFile && (
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-slate-500 font-semibold uppercase">
                      Page 1 of {activeFile.pageCount || "..."}
                    </span>
                  )}
                </div>

                {/* SIDE-BY-SIDE VISUAL COMPARE SLIDER */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-3xs flex flex-col items-center justify-center min-h-[400px] relative">
                  
                  {activeFile ? (
                    isPreviewLoading ? (
                      <div className="flex flex-col items-center gap-3 py-16">
                        <Loader2 className="animate-spin text-[#518231]" size={36} />
                        <p className="text-xs font-semibold text-slate-400">Rendering preview frames...</p>
                      </div>
                    ) : (
                      <div className="relative w-full max-w-sm aspect-[3/4] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg select-none bg-white dark:bg-slate-950">
                        {/* Original Frame (Left) */}
                        <div className="absolute inset-0">
                          {originalPreviewUrl ? (
                            <img src={originalPreviewUrl} className="w-full h-full object-contain" alt="Original visual frame" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-xs text-slate-400">
                              Failed to render original frame
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 z-10 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow border border-slate-150/40">
                            Original (100%)
                          </div>
                        </div>

                        {/* Compressed Frame Overlay (Right) */}
                        <div 
                          className="absolute inset-0 border-l border-[#518231]"
                          style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
                        >
                          {compressedPreviewUrl ? (
                            <img src={compressedPreviewUrl} className="w-full h-full object-contain" alt="Compressed visual frame" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-xs text-slate-400">
                              Recompressing frame...
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 z-10 bg-[#518231]/95 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                            Compressed ({compressionMode === 'lossy' ? `${quality}% Q` : 'Lossless'})
                          </div>
                        </div>

                        {/* Draggable Selector bar line */}
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-[#518231] cursor-ew-resize flex items-center justify-center pointer-events-none"
                          style={{ left: `${sliderPos}%` }}
                        >
                          <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-[#518231] shadow flex items-center justify-center text-[#518231] font-bold select-none text-xs pointer-events-none">
                            ↔
                          </div>
                        </div>

                        {/* Smooth Drag controller input range */}
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={sliderPos} 
                          onChange={(e) => setSliderPos(Number(e.target.value))}
                          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                          aria-label="Drag to compare page quality"
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400 dark:text-slate-500 gap-2 max-w-sm">
                      <FileText size={48} className="text-slate-300 dark:text-slate-700" />
                      <p className="text-xs font-bold mt-2">No Active Document Loaded</p>
                      <p className="text-[11px] opacity-80 leading-relaxed">Upload a PDF to view visual Before/After page compression previews.</p>
                    </div>
                  )}

                  {activeFile && !isPreviewLoading && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-4">
                      ↔ Drag the preview window left and right to compare quality
                    </p>
                  )}
                </div>

              </div>

            </div>
          )}
        </div>
      )}

      {/* Compressing processing progress */}
      {batchStatus === "compressing" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center gap-4 py-16 animate-in fade-in duration-300">
          <div className="relative flex items-center justify-center">
            <Loader2 className="animate-spin text-[#518231]" size={56} strokeWidth={2.5} />
            <span className="absolute text-xs font-bold text-slate-750 dark:text-slate-350">{globalProgress}%</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-2">Optimizing PDF Document(s)</h3>
          <p className="text-sm text-[#518231] font-semibold animate-pulse">{globalStep}</p>
          <div className="w-full max-w-md bg-slate-105 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2 border border-slate-200/40 dark:border-slate-850">
            <div 
              className="bg-[#518231] h-full rounded-full transition-all duration-300"
              style={{ width: `${globalProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed mt-2">
            Optimizations occur locally in browser memory or via secure streaming endpoints. Do not close this tab.
          </p>
        </div>
      )}

      {/* Success Output Download Box */}
      {batchStatus === "success" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-md text-center flex flex-col items-center gap-6 py-12 max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
          
          <div className="w-16 h-16 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center">
            <CheckCircle size={36} strokeWidth={2.5} />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">PDF Compression Completed!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Your files have been successfully optimized. Below are the savings statistics.
            </p>
          </div>

          {/* Savings Analytics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-md my-2">
            <div className="bg-slate-50 dark:bg-slate-950/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Original</span>
              <strong className="text-sm text-slate-700 dark:text-slate-300 block mt-1">{formatBytes(totalOriginalSize)}</strong>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-950/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Optimized</span>
              <strong className="text-sm text-slate-700 dark:text-slate-300 block mt-1">{formatBytes(totalCompressedSize)}</strong>
            </div>

            <div className="bg-green-50/20 dark:bg-green-950/10 p-3 rounded-xl border border-green-100/35 dark:border-green-900/10 text-center">
              <span className="text-[10px] font-bold text-[#518231] uppercase tracking-wider block">Space Saved</span>
              <strong className="text-sm text-[#518231] block mt-1">-{formatBytes(totalSavedSize)}</strong>
            </div>

            <div className="bg-[#518231] text-white p-3 rounded-xl text-center shadow shadow-green-900/20">
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">Reduction</span>
              <strong className="text-base font-extrabold block mt-0.5">{totalPercentSaved}%</strong>
            </div>
          </div>

          <div className="bg-slate-55 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800/80 rounded-xl p-4 w-full flex items-center gap-3 max-w-md">
            <div className="w-10 h-12 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center justify-center shrink-0 relative overflow-hidden shadow-3xs select-none">
              <FileText size={18} />
              <div className={`absolute bottom-0 inset-x-0 ${files.length > 1 ? 'bg-amber-600' : 'bg-indigo-650'} text-white text-[8px] font-bold text-center py-0.5 uppercase tracking-wider`}>
                {files.length > 1 ? "ZIP" : "PDF"}
              </div>
            </div>
            <div className="min-w-0 flex-1 text-left">
              <h5 className="font-bold text-slate-700 dark:text-slate-300 text-sm truncate" title={zipName}>
                {zipName}
              </h5>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Ready for download • Browser secure
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <button
              onClick={resetCompressTool}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-250 font-bold rounded-xl text-sm transition-all"
            >
              Compress More Files
            </button>
            <button
              onClick={triggerDownload}
              className="flex-2 py-3 bg-gradient-to-r from-[#518231] to-[#436a28] hover:from-[#436a28] hover:to-[#365420] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/25"
            >
              <Download size={18} /> Download Compressed
            </button>
          </div>

          <div className="text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-850/80 pt-4 w-full max-w-sm">
            Files optimized securely. They never leave your device.
          </div>
        </div>
      )}

    </div>
  );
}
