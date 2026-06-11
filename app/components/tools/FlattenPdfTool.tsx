"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  FileText, Upload, Trash2, Settings, CheckCircle, AlertCircle, 
  Loader2, Download, RefreshCw, History, ShieldAlert, Info,
  Layers, Lock, FileSignature, Check
} from "lucide-react";
import { PDFDocument, PDFName, PDFArray, PDFDict } from "pdf-lib";
import JSZip from "jszip";

const PDFJS_VERSION = "3.11.174";
const MAX_LOCAL_FILE_SIZE = 150 * 1024 * 1024; // 150MB

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
  formFieldsCount: number;
  annotationsCount: number;
  status: "pending" | "processing" | "success" | "error";
  compressedSize?: number;
  progress: number;
  errorMessage?: string;
  downloadUrl?: string | null;
  metadata?: PdfMetadata | null;
}

interface FlattenHistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
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

export function FlattenPdfTool() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  
  // Settings
  const [flattenForms, setFlattenForms] = useState<boolean>(true);
  const [removeAnnotations, setRemoveAnnotations] = useState<boolean>(true);
  const [stripMetadata, setStripMetadata] = useState<boolean>(false);

  // Preview State
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  const [pdfjsLoaded, setPdfjsLoaded] = useState<boolean>(false);

  // Global triggers
  const [batchStatus, setBatchStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [globalProgress, setGlobalProgress] = useState<number>(0);
  const [globalStep, setGlobalStep] = useState<string>("");
  const [zipBlobUrl, setZipBlobUrl] = useState<string | null>(null);
  const [zipName, setZipName] = useState<string>("flattened_files.zip");
  
  // History & UX
  const [history, setHistory] = useState<FlattenHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [globalDragActive, setGlobalDragActive] = useState<boolean>(false);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeRenderTaskRef = useRef<any>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("flatten_pdf_history");
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
  const generatePreview = async (pdfDocObj: any) => {
    if (!pdfDocObj || !previewCanvasRef.current) return;
    setIsPreviewLoading(true);

    try {
      const page = await pdfDocObj.getPage(1);
      const viewport = page.getViewport({ scale: 1.0 }); // Standard scale
      const canvas = previewCanvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not acquire canvas 2d context");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Cancel previous render task if any
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
          return;
        }
        throw err;
      } finally {
        if (activeRenderTaskRef.current === renderTask) {
          activeRenderTaskRef.current = null;
        }
      }

      const originalUrl = canvas.toDataURL("image/jpeg", 0.8);
      setOriginalPreviewUrl(originalUrl);

    } catch (error) {
      console.error("Error creating preview:", error);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  // Load active file metadata & preview document
  const selectActiveFile = async (item: FileItem) => {
    setActiveFileId(item.id);
    setPdfjsDoc(null);
    setOriginalPreviewUrl(null);
    
    try {
      const arrayBuffer = await item.file.arrayBuffer();
      const pdfjs = await loadPdfJs();
      setPdfjsLoaded(true);

      const doc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      setPdfjsDoc(doc);
      await generatePreview(doc);
    } catch (e) {
      console.error("Failed to load preview for file:", e);
    }
  };

  // Add files to collection and parse details
  const processFiles = async (fileList: FileList) => {
    const newItems: FileItem[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
        alert(`File "${f.name}" is not a valid PDF.`);
        continue;
      }

      if (f.size > MAX_LOCAL_FILE_SIZE) {
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
        formFieldsCount: 0,
        annotationsCount: 0,
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
        
        let formCount = 0;
        try {
          const form = pdfLibDoc.getForm();
          formCount = form.getFields().length;
        } catch (e) {
          // Form might be missing or unreadable
        }

        let annotsCount = 0;
        pdfLibDoc.getPages().forEach(p => {
          const annots = p.node.Annots();
          if (annots && annots instanceof PDFArray) {
            annotsCount += annots.size();
          }
        });

        // Subtract form widget annotations from total annotations to avoid double counting
        const nonFormAnnots = Math.max(0, annotsCount - formCount);

        setFiles(prev => 
          prev.map(it => it.id === item.id 
            ? { ...it, pageCount: pagesNum, formFieldsCount: formCount, annotationsCount: nonFormAnnots, status: "pending" } 
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
      }
      return filtered;
    });
  };

  // ─────────────────────────────────────────────────────────
  // FLATTEN CORE ENGINE
  // ─────────────────────────────────────────────────────────
  const processSingleFile = async (
    item: FileItem, 
    updateProgress: (p: number, step: string) => void
  ): Promise<{ bytes: Uint8Array; name: string }> => {
    const arrayBuffer = await item.file.arrayBuffer();

    updateProgress(10, "Loading PDF locally in browser sandbox...");
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    if (flattenForms) {
      updateProgress(40, "Flattening form fields and drawing data to canvas...");
      try {
        const form = pdfDoc.getForm();
        form.flatten();
      } catch (err) {
        console.warn("Could not flatten form, it might be missing or corrupted", err);
      }
    }

    if (removeAnnotations) {
      updateProgress(60, "Scanning and purging unflattened interactive annotations...");
      pdfDoc.getPages().forEach(page => {
         const annots = page.node.Annots();
         if (annots && annots instanceof PDFArray) {
           // We clear the annotations array to remove sticky notes, highlights, etc.
           // Form widgets were already baked by form.flatten() and their widget annotations removed.
           page.node.set(PDFName.of('Annots'), pdfDoc.context.obj([]));
         }
      });
    }

    if (stripMetadata) {
      updateProgress(75, "Stripping metadata headers...");
      pdfDoc.setTitle("");
      pdfDoc.setAuthor("");
      pdfDoc.setSubject("");
      pdfDoc.setCreator("");
      pdfDoc.setProducer("");
      pdfDoc.setKeywords([]);
      pdfDoc.setCreationDate(new Date(0));
      pdfDoc.setModificationDate(new Date(0));
    }

    updateProgress(90, "Compiling final optimized binary stream...");
    const outBytes = await pdfDoc.save({ useObjectStreams: false });

    updateProgress(100, "Done.");
    return {
      bytes: outBytes,
      name: `${item.name.replace(/\.[^/.]+$/, "")}_flattened.pdf`
    };
  };

  // Main execution trigger
  const handleProcess = async () => {
    const pendingFiles = files.filter(f => f.status === "pending" || f.status === "error");
    if (pendingFiles.length === 0) {
      alert("Please upload at least 1 valid PDF file.");
      return;
    }

    setBatchStatus("processing");
    setGlobalProgress(10);
    setGlobalStep("Preparing batch operations...");

    try {
      interface OutFile {
        name: string;
        bytes: Uint8Array;
      }
      const outList: OutFile[] = [];

      for (let i = 0; i < pendingFiles.length; i++) {
        const item = pendingFiles[i];
        
        setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: "processing", progress: 10, errorMessage: undefined } : f));
        
        try {
          const result = await processSingleFile(item, (prog, step) => {
            setGlobalProgress(Math.floor(10 + ((i + prog / 100) / pendingFiles.length) * 80));
            setGlobalStep(`[${i+1}/${pendingFiles.length}] ${item.name}: ${step}`);
            
            setFiles(prev => prev.map(f => f.id === item.id ? { ...f, progress: prog } : f));
          });

          outList.push(result);
          const finalBlob = new Blob([result.bytes as any], { type: "application/pdf" });
          const finalUrl = URL.createObjectURL(finalBlob);

          setFiles(prev => prev.map(f => f.id === item.id ? { 
            ...f, 
            status: "success", 
            progress: 100, 
            compressedSize: finalBlob.size,
            downloadUrl: finalUrl
          } : f));

          // Register in Local History
          let modeDesc = [];
          if (flattenForms) modeDesc.push("Forms");
          if (removeAnnotations) modeDesc.push("Annotations");
          if (stripMetadata) modeDesc.push("Metadata");

          const historyItem: FlattenHistoryItem = {
            id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            timestamp: Date.now(),
            fileName: item.name,
            pages: item.pageCount || 1,
            mode: modeDesc.length > 0 ? modeDesc.join(" + ") : "None"
          };
          
          setHistory(prev => {
            const next = [historyItem, ...prev].slice(0, 10);
            localStorage.setItem("flatten_pdf_history", JSON.stringify(next));
            return next;
          });

        } catch (err: any) {
          setFiles(prev => prev.map(f => f.id === item.id ? { 
            ...f, 
            status: "error", 
            errorMessage: err.message || "Failed to flatten document."
          } : f));
        }
      }

      if (outList.length === 0) {
        throw new Error("All files failed to process.");
      }

      setGlobalProgress(95);
      setGlobalStep("Finalizing package packaging...");

      // Download trigger config
      if (outList.length === 1) {
        const target = outList[0];
        const blob = new Blob([target.bytes as any], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setZipBlobUrl(url);
        setZipName(target.name);
      } else {
        setGlobalStep("Creating compressed ZIP archive package...");
        const zip = new JSZip();
        outList.forEach(f => zip.file(f.name, f.bytes));
        
        const zipBlob = await zip.generateAsync({ 
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 5 }
        });
        
        const url = URL.createObjectURL(zipBlob);
        setZipBlobUrl(url);
        setZipName(`flattened_batch_${Date.now()}.zip`);
      }

      setGlobalProgress(100);
      setGlobalStep("Flattening task completed!");
      setBatchStatus("success");
    } catch (error: any) {
      console.error("Batch flatten failed:", error);
      setGlobalStep("Failure encountered during processing.");
      setBatchStatus("error");
      alert(error.message || "Task failed. Ensure files are readable and not encrypted.");
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

  const resetTool = () => {
    files.forEach(f => {
      if (f.downloadUrl) URL.revokeObjectURL(f.downloadUrl);
    });
    if (zipBlobUrl) URL.revokeObjectURL(zipBlobUrl);

    setFiles([]);
    setActiveFileId(null);
    setPdfjsDoc(null);
    setOriginalPreviewUrl(null);
    setBatchStatus("idle");
    setGlobalProgress(0);
    setGlobalStep("");
    setZipBlobUrl(null);
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your local history?")) {
      setHistory([]);
      localStorage.removeItem("flatten_pdf_history");
    }
  };

  const activeFile = files.find(f => f.id === activeFileId);

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
            <p className="text-sm text-slate-500 dark:text-slate-400">Release the mouse button to start flattening.</p>
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
            <h4 className="font-semibold text-slate-800 dark:text-white text-sm">Your files never leave your device</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Powered by WebAssembly, all flattening happens locally in your browser memory for 100% privacy.</p>
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
              onClick={resetTool}
              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/30 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* History Log */}
      {showHistory && (
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm relative animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-3">
            <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
              <History size={16} className="text-[#518231]" /> Flattening Log History (Local)
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
            <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center py-4">No recent history found on this device.</p>
          ) : (
            <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
              {history.map((h) => (
                <div key={h.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-sm gap-2">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-[#518231]" />
                    <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px] sm:max-w-[300px]" title={h.fileName}>{h.fileName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="whitespace-nowrap">{h.pages} Pages</span>
                    <span className="whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                      {h.mode}
                    </span>
                    <span className="whitespace-nowrap hidden sm:block">{new Date(h.timestamp).toLocaleDateString()} {new Date(h.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Uploader & List */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Uploader Box */}
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              relative flex flex-col items-center justify-center w-full min-h-[220px] rounded-2xl border-2 border-dashed transition-all duration-200 ease-in-out cursor-pointer overflow-hidden
              ${dragActive 
                ? "border-[#518231] bg-[#518231]/5" 
                : "border-slate-300 dark:border-slate-700 hover:border-[#518231] hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-white dark:bg-slate-900"
              }
            `}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".pdf,application/pdf" 
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              multiple
              disabled={batchStatus === "processing"}
            />
            
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${dragActive ? 'bg-[#518231] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                <Upload size={28} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
                  {dragActive ? "Drop PDF files here" : "Click or drag PDFs to upload"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Process up to 10 files securely in your browser.
                </p>
              </div>
              <button 
                type="button" 
                className="pointer-events-none mt-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-medium text-sm transition-all shadow-sm"
              >
                Select Files
              </button>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
                  <FileText size={16} className="text-[#518231]" /> 
                  Queue ({files.length})
                </h3>
                {files.length > 1 && batchStatus !== "processing" && (
                  <button 
                    onClick={() => { setFiles([]); setActiveFileId(null); setOriginalPreviewUrl(null); }}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium"
                  >
                    <Trash2 size={12} /> Clear All
                  </button>
                )}
              </div>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[400px] overflow-y-auto custom-scrollbar">
                {files.map((file) => (
                  <div 
                    key={file.id} 
                    className={`flex items-center gap-4 p-4 transition-colors relative ${activeFileId === file.id ? 'bg-indigo-50/50 dark:bg-indigo-500/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
                  >
                    {/* Active Indicator Line */}
                    {activeFileId === file.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#518231]" />
                    )}

                    <div 
                      className="cursor-pointer shrink-0 w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700"
                      onClick={() => selectActiveFile(file)}
                    >
                      <FileText size={20} className={activeFileId === file.id ? "text-[#518231]" : "text-slate-500"} />
                    </div>
                    
                    <div className="flex-grow min-w-0 cursor-pointer" onClick={() => selectActiveFile(file)}>
                      <p className={`text-sm font-semibold truncate ${activeFileId === file.id ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                        {file.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span>{formatBytes(file.size)}</span>
                        {file.pageCount && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                            <span>{file.pageCount} pages</span>
                          </>
                        )}
                        {file.formFieldsCount !== undefined && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                            <span className={file.formFieldsCount > 0 ? "text-amber-600 dark:text-amber-400 font-medium" : ""}>
                              {file.formFieldsCount} forms
                            </span>
                          </>
                        )}
                      </div>
                      
                      {/* Individual Progress Bar */}
                      {batchStatus === "processing" && file.status === "processing" && (
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="h-full bg-[#518231] transition-all duration-300 ease-out" 
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}

                      {file.status === "error" && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {file.errorMessage}
                        </p>
                      )}
                    </div>
                    
                    <div className="shrink-0 flex items-center gap-2">
                      {file.status === "success" && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            <CheckCircle size={14} />
                          </span>
                        </div>
                      )}
                      
                      {file.status === "pending" && batchStatus !== "processing" && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Remove file"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Settings & Preview */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            
            <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 px-5 py-4">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Settings size={18} className="text-[#518231]" /> 
                Flattening Settings
              </h3>
            </div>
            
            <div className="p-5 space-y-6">
              
              {/* Checkbox Options */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      checked={flattenForms}
                      onChange={(e) => setFlattenForms(e.target.checked)}
                      className="w-4 h-4 rounded text-[#518231] focus:ring-[#518231] border-slate-300 dark:border-slate-600"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Flatten Form Fields</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">Converts editable inputs, checkboxes, and signatures into static vectors.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      checked={removeAnnotations}
                      onChange={(e) => setRemoveAnnotations(e.target.checked)}
                      className="w-4 h-4 rounded text-[#518231] focus:ring-[#518231] border-slate-300 dark:border-slate-600"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Remove Extraneous Annotations</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">Purges sticky notes, unflattened highlights, and interactive links to sanitize the file.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      checked={stripMetadata}
                      onChange={(e) => setStripMetadata(e.target.checked)}
                      className="w-4 h-4 rounded text-[#518231] focus:ring-[#518231] border-slate-300 dark:border-slate-600"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Strip Metadata</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">Removes author, creator, and edit history logs for maximum privacy.</span>
                  </div>
                </label>
              </div>

              {/* Action Area */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                {batchStatus === "processing" ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                      <span>Processing...</span>
                      <span>{globalProgress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#518231] transition-all duration-300 ease-out relative" 
                        style={{ width: `${globalProgress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_1s_infinite] -skew-x-12" style={{backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'}}></div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center animate-pulse">{globalStep}</p>
                  </div>
                ) : batchStatus === "success" ? (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-900/30 text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center">
                        <Check size={24} strokeWidth={3} />
                      </div>
                      <h4 className="font-bold text-green-800 dark:text-green-300">Flattening Complete!</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">All interactive elements have been locked.</p>
                    </div>
                    <button
                      onClick={triggerDownload}
                      className="w-full py-3.5 px-4 bg-[#518231] hover:bg-[#436b28] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
                    >
                      <Download size={20} />
                      Download {files.length > 1 ? "ZIP Archive" : "Flattened PDF"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleProcess}
                    disabled={files.length === 0}
                    className="w-full py-3.5 px-4 bg-[#518231] hover:bg-[#436b28] disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 text-white rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2 text-lg group"
                  >
                    <Layers size={20} className="group-hover:scale-110 transition-transform" />
                    Flatten PDF {files.length > 1 ? `(${files.length} files)` : ""}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Smart Analysis Panel */}
          {activeFile && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
                  <Info size={16} className="text-[#518231]" /> 
                  Smart Analysis
                </h3>
                <span className="text-xs font-mono text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">{activeFile.name}</span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <FileSignature size={16} />
                    <span className="text-xs font-semibold uppercase">Form Fields</span>
                  </div>
                  <span className="text-2xl font-black text-amber-800 dark:text-amber-300">{activeFile.formFieldsCount ?? 0}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <Lock size={16} />
                    <span className="text-xs font-semibold uppercase">Annotations</span>
                  </div>
                  <span className="text-2xl font-black text-blue-800 dark:text-blue-300">{activeFile.annotationsCount ?? 0}</span>
                </div>
              </div>
            </div>
          )}

          {/* Hidden Canvas for Preview Rendering */}
          <canvas ref={previewCanvasRef} className="hidden" />
          
        </div>
      </div>
    </div>
  );
}
