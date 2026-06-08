"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download,
  RefreshCw, History, ShieldCheck, Check, Columns, Layers, CheckSquare,
  ZoomIn, ZoomOut, Plus, X, List, Grid, Filter, Bookmark, Keyboard, ShieldAlert,
  Lock, Copy, FileJson, Sparkles, BookOpen, AlertTriangle
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import Tesseract from "tesseract.js";
import { decryptPDF } from "@pdfsmaller/pdf-decrypt";

// --- Types ---

interface OcrPageResult {
  pageNumber: number;
  text: string;
  confidence: number;
  words: Array<{
    text: string;
    confidence: number;
    bbox: { x0: number; y0: number; x1: number; y1: number };
  }>;
  lines: string[];
}

interface OcrHistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
  originalPageCount: number;
  processedPagesCount: number;
  avgConfidence: number;
  detectedLang: string;
}

const PDFJS_VERSION = '3.11.174';

const OCR_LANGUAGES = [
  { code: "eng", name: "English" },
  { code: "spa", name: "Spanish" },
  { code: "fra", name: "French" },
  { code: "deu", name: "German" },
  { code: "ita", name: "Italian" },
  { code: "por", name: "Portuguese" },
  { code: "nld", name: "Dutch" },
  { code: "rus", name: "Russian" },
  { code: "ara", name: "Arabic" },
  { code: "hin", name: "Hindi" },
  { code: "ben", name: "Bengali" },
  { code: "chi_sim", name: "Chinese (Simplified)" },
  { code: "chi_tra", name: "Chinese (Traditional)" },
  { code: "jpn", name: "Japanese" },
  { code: "kor", name: "Korean" },
  { code: "tur", name: "Turkish" }
];

export function PdfOcrTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [fileSize, setFileSize] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "reading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [requiresPassword, setRequiresPassword] = useState<boolean>(false);

  // PDF.js objects
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<"side" | "grid">("side");

  // OCR Configurations
  const [primaryLang, setPrimaryLang] = useState<string>("eng");
  const [selectedLangs, setSelectedLangs] = useState<string[]>(["eng"]);
  const [ocrMode, setOcrMode] = useState<"text" | "searchable" | "table">("text");
  const [accuracyMode, setAccuracyMode] = useState<"fast" | "balanced" | "max">("balanced");
  const [targetPages, setTargetPages] = useState<"all" | "selected" | "range">("all");
  const [customRangeText, setCustomRangeText] = useState<string>("");
  const [selectedPreviewPages, setSelectedPreviewPages] = useState<Record<number, boolean>>({});

  // Image Preprocessing Filters
  const [autoContrast, setAutoContrast] = useState<boolean>(true);
  const [binarizeThreshold, setBinarizeThreshold] = useState<boolean>(false);

  // OCR Results & Progress States
  const [ocrResults, setOcrResults] = useState<Record<number, OcrPageResult>>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressMsg, setProgressMsg] = useState<string>("");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // History Log
  const [history, setHistory] = useState<OcrHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [dragActive, setDragActive] = useState<boolean>(false);

  // Load Saved History
  useEffect(() => {
    const savedHistory = localStorage.getItem("pdf_ocr_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.warn("Failed to load OCR history", e);
      }
    }
  }, []);

  const saveHistoryItem = (processedCount: number, avgConf: number) => {
    if (!file) return;
    const historyItem: OcrHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      fileName: file.name,
      originalPageCount: pageCount,
      processedPagesCount: processedCount,
      avgConfidence: avgConf,
      detectedLang: selectedLangs.join("+")
    };
    setHistory(prev => {
      const updated = [historyItem, ...prev].slice(0, 10);
      localStorage.setItem("pdf_ocr_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("pdf_ocr_history");
  };

  // Setup Document details via pdf-lib and PDF.js
  const loadPdfDocument = async (targetFile: File, pass = "") => {
    setUploadStatus("reading");
    setErrorMessage(null);
    setRequiresPassword(false);
    setOcrResults({});

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
      
      setCurrentPage(1);

      // Default select all preview pages
      const selectionMap: Record<number, boolean> = {};
      for (let i = 1; i <= pagesCount; i++) {
        selectionMap[i] = true;
      }
      setSelectedPreviewPages(selectionMap);
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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadPdfDocument(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadPdfDocument(e.target.files[0]);
    }
  };

  const handleLockedPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      loadPdfDocument(file, password);
    }
  };

  // Render preview canvas
  const renderPreviewPage = async (pageNum: number, customDoc = pdfjsDoc) => {
    if (!customDoc || !previewCanvasRef.current) return;

    try {
      const page = await customDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = previewCanvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext).promise;
      }
    } catch (e) {
      console.error("Error rendering preview page", e);
    }
  };

  useEffect(() => {
    if (uploadStatus === "ready" && pdfjsDoc) {
      renderPreviewPage(currentPage);
    }
  }, [currentPage, pdfjsDoc, uploadStatus]);

  // Load PDFjs script from CDN
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

  // Canvas Image Preprocessing
  const applyImagePreprocessing = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    if (binarizeThreshold) {
      // Grayscale Threshold filter
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const val = gray > 130 ? 255 : 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      }
    } else if (autoContrast) {
      // Contrast boost filter
      const factor = 1.6;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
        data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
        data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  };

  // Run Tesseract.js client side OCR
  const handleRunOcr = async () => {
    if (!pdfjsDoc || isProcessing) return;

    setIsProcessing(true);
    setProgressPercent(0);
    setProgressMsg("Initializing Tesseract OCR worker thread pool...");

    try {
      // Resolve targeted page numbers
      const targetPagesList: number[] = [];
      if (targetPages === "all") {
        for (let i = 1; i <= pageCount; i++) targetPagesList.push(i);
      } else if (targetPages === "selected") {
        Object.entries(selectedPreviewPages).forEach(([pStr, isSelected]) => {
          if (isSelected) targetPagesList.push(parseInt(pStr, 10));
        });
      } else if (targetPages === "range") {
        const blocks = customRangeText.split(",");
        blocks.forEach(block => {
          const trimmed = block.trim();
          if (!trimmed) return;
          if (trimmed.includes("-")) {
            const parts = trimmed.split("-");
            const start = parseInt(parts[0], 10);
            const end = parseInt(parts[1], 10);
            if (!isNaN(start) && !isNaN(end)) {
              const min = Math.min(start, end);
              const max = Math.max(start, end);
              for (let i = Math.max(1, min); i <= Math.min(pageCount, max); i++) {
                targetPagesList.push(i);
              }
            }
          } else {
            const pageNum = parseInt(trimmed, 10);
            if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pageCount) {
              targetPagesList.push(pageNum);
            }
          }
        });
      }

      if (targetPagesList.length === 0) {
        alert("Please select or specify at least one page to process.");
        setIsProcessing(false);
        return;
      }

      // Initialize Tesseract Worker
      const langsString = selectedLangs.join("+");
      const worker = await Tesseract.createWorker(langsString, undefined, {
        logger: (m: Tesseract.LoggerMessage) => {
          if (m.status === "recognizing text") {
            setProgressMsg(`Recognizing page text...`);
            setProgressPercent(Math.round(m.progress * 100));
          } else {
            setProgressMsg(m.status);
          }
        }
      });

      // Adjust Tesseract parameter parameters based on accuracy profiles
      if (accuracyMode === "fast") {
        await worker.setParameters({
          tessedit_ocr_engine_mode: "1" as any // fast legacy mode
        });
      } else if (accuracyMode === "max") {
        await worker.setParameters({
          tessedit_char_whitelist: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?@()[]{}<>:;-\"'/\\&*%#+=_$"
        });
      }

      const resultsMap: Record<number, OcrPageResult> = { ...ocrResults };
      let sumConfidence = 0;

      for (let idx = 0; idx < targetPagesList.length; idx++) {
        const pageNum = targetPagesList[idx];
        setProgressMsg(`Rendering Page ${pageNum} for recognition...`);
        setProgressPercent(Math.round((idx / targetPagesList.length) * 100));

        // Render page to off-screen canvas
        const page = await pdfjsDoc.getPage(pageNum);
        // Render at 150 DPI for balanced speed/accuracy balance
        const scale = accuracyMode === "max" ? 2.2 : 1.5;
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get context");
        await page.render({ canvasContext: ctx, viewport }).promise;

        // Apply pre-processing filters
        applyImagePreprocessing(canvas);

        setProgressMsg(`Running OCR scan on Page ${pageNum}...`);
        
        // Run character recognition
        const { data } = await worker.recognize(canvas);
        
        const pageWords: Array<{
          text: string;
          confidence: number;
          bbox: { x0: number; y0: number; x1: number; y1: number };
        }> = [];
        const lines: string[] = [];

        if (data.blocks) {
          data.blocks.forEach((block: Tesseract.Block) => {
            if (block.paragraphs) {
              block.paragraphs.forEach((para: Tesseract.Paragraph) => {
                if (para.lines) {
                  para.lines.forEach((line: Tesseract.Line) => {
                    lines.push(line.text);
                    if (line.words) {
                      line.words.forEach((w: Tesseract.Word) => {
                        pageWords.push({
                          text: w.text,
                          confidence: w.confidence,
                          bbox: {
                            x0: w.bbox.x0 / scale,
                            y0: w.bbox.y0 / scale,
                            x1: w.bbox.x1 / scale,
                            y1: w.bbox.y1 / scale
                          }
                        });
                      });
                    }
                  });
                }
              });
            }
          });
        }
        
        resultsMap[pageNum] = {
          pageNumber: pageNum,
          text: data.text,
          confidence: data.confidence,
          words: pageWords,
          lines
        };

        sumConfidence += data.confidence;
      }

      await worker.terminate();

      setOcrResults(resultsMap);
      setProgressMsg("OCR completed successfully!");
      setProgressPercent(100);
      
      const avgConf = sumConfidence / targetPagesList.length;
      saveHistoryItem(targetPagesList.length, avgConf);
    } catch (e: any) {
      console.error("OCR execution failed", e);
      alert("OCR process failed: " + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Compile final Searchable PDF using pdf-lib (Overlay invisible text layers)
  const handleDownloadSearchablePdf = async () => {
    if (!file || Object.keys(ocrResults).length === 0) return;

    setIsProcessing(true);
    setProgressMsg("Compiling Searchable PDF document layers...");
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      let loadTarget: ArrayBuffer | Uint8Array = arrayBuffer;
      if (password) {
        loadTarget = await decryptPDF(new Uint8Array(arrayBuffer), password);
      }

      const srcDoc = await PDFDocument.load(loadTarget, { ignoreEncryption: true });
      const pages = srcDoc.getPages();

      // Loop and draw invisible words overlay
      Object.entries(ocrResults).forEach(([pageStr, result]) => {
        const pageIndex = parseInt(pageStr, 10) - 1;
        if (pageIndex >= 0 && pageIndex < pages.length) {
          const page = pages[pageIndex];
          const { width, height } = page.getSize();
          
          // Render width details from PDFJS Viewport size parameters
          // We calculate the scale factors relative to Tesseract coordinates
          // Since we already normalized word bounding boxes relative to scale,
          // we use the original PDF page size boundaries.
          // Tesseract box coordinates were divided by scale, so they are in original PDF scale!
          result.words.forEach(word => {
            const wWidth = word.bbox.x1 - word.bbox.x0;
            const wHeight = word.bbox.y1 - word.bbox.y0;

            const pdfX = word.bbox.x0;
            const pdfY = height - word.bbox.y0 - wHeight;

            // Draw text with 0 opacity (renders invisible text layer which remains selectable/searchable)
            try {
              page.drawText(word.text, {
                x: pdfX,
                y: pdfY,
                size: Math.max(2, wHeight * 0.82), // size matching bounding box height
                opacity: 0
              });
            } catch (err) {
              console.warn("Could not draw word bounding box text overlay", word.text, err);
            }
          });
        }
      });

      const bytes = await srcDoc.save();
      const blob = new Blob([bytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${baseName}_searchable.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert("Failed to export Searchable PDF: " + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Export raw text as .TXT
  const handleDownloadTextFile = () => {
    if (!file) return;
    const sortedEntries = Object.entries(ocrResults).sort((a, b) => parseInt(a[0], 10) - parseInt(b[0], 10));
    if (sortedEntries.length === 0) return;

    let fullText = "";
    sortedEntries.forEach(([pageStr, res]) => {
      fullText += `--- PAGE ${pageStr} ---\n\n${res.text}\n\n`;
    });

    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}_extracted_ocr.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  // Copy full text
  const handleCopyText = () => {
    const sortedEntries = Object.entries(ocrResults).sort((a, b) => parseInt(a[0], 10) - parseInt(b[0], 10));
    if (sortedEntries.length === 0) return;

    let fullText = "";
    sortedEntries.forEach(([pageStr, res]) => {
      fullText += res.text + "\n";
    });

    navigator.clipboard.writeText(fullText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Export tables as CSV file
  const handleDownloadCsv = () => {
    if (!file) return;
    const currentResult = ocrResults[currentPage];
    if (!currentResult) return;

    // Table recognition mockup: segment lines by tabulations/spaces or double-spaces
    let csvContent = "";
    currentResult.lines.forEach(line => {
      // Split by multiple spaces to approximate column structures
      const cols = line.split(/\s{2,}/).map(col => `"${col.trim().replace(/"/g, '""')}"`);
      csvContent += cols.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}_page_${currentPage}_table.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  // Export results as JSON
  const handleDownloadJson = () => {
    if (!file) return;
    const dataStr = JSON.stringify(ocrResults, null, 2);
    const blob = new Blob([dataStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}_ocr_report.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const clearFile = () => {
    setFile(null);
    setPdfjsDoc(null);
    setPageCount(0);
    setFileSize(0);
    setCurrentPage(1);
    setOcrResults({});
    setPassword("");
    setRequiresPassword(false);
    setUploadStatus("idle");
    setProgressPercent(0);
    setProgressMsg("");
  };

  const toggleLanguageSelection = (code: string) => {
    setSelectedLangs(prev => {
      if (prev.includes(code)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter(c => c !== code);
      } else {
        return [...prev, code];
      }
    });
  };

  const activeResult = ocrResults[currentPage];

  return (
    <div className="space-y-8">
      {/* ─── SECURE INSTRUCTION HEADER ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-6 py-4 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#518231]/10 rounded-2xl text-[#518231]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-855 dark:text-slate-155">Local Safe PDF OCR Engine</h2>
            <p className="text-xs text-slate-555 dark:text-slate-400 font-bold mt-0.5">
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
              className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 dark:border-red-950/30 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 dark:text-red-400 font-extrabold text-xs rounded-2xl cursor-pointer transition-all w-full sm:w-auto"
            >
              <Trash2 size={15} />
              Remove PDF
            </button>
          )}
        </div>
      </div>

      {/* ─── HISTORY LOG PANEL ─── */}
      {showHistory && (
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-855 dark:text-slate-155 flex items-center gap-2">
              <History size={16} className="text-[#518231]" />
              OCR Processing History (Local Cache)
            </h3>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs font-black text-red-550 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 size={12} /> Clear Cache
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-xs text-slate-555 dark:text-slate-400 py-3 font-semibold">
              No recent PDF digitizations. Your past files will show here locally.
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
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-455 font-bold border-t pt-2 border-slate-100 dark:border-slate-900">
                    <span>Processed {item.processedPagesCount} pages</span>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-600 rounded font-black text-[9px] uppercase">
                      {Math.round(item.avgConfidence)}% Conf
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
              Drag and drop your scanned PDF here
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
            Parsing PDF Page structure & loading renderer...
          </p>
        </div>
      )}

      {/* ─── ERROR SCREEN ─── */}
      {uploadStatus === "error" && (
        <div className="border border-red-500/10 bg-red-500/5 dark:bg-red-950/10 p-16 rounded-3xl flex flex-col items-center justify-center gap-4 text-center max-w-xl mx-auto">
          <AlertCircle className="text-red-500" size={36} />
          <div>
            <p className="text-sm font-black text-slate-800 dark:text-slate-200">Failed to Load Document</p>
            <p className="text-xs text-slate-555 dark:text-slate-400 mt-1">{errorMessage}</p>
          </div>
          <button
            onClick={clearFile}
            className="px-6 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-950 text-white rounded-xl font-bold text-xs cursor-pointer transition-all"
          >
            Start Over
          </button>
        </div>
      )}

      {/* ─── WORKSPACE ─── */}
      {uploadStatus === "ready" && file && pdfjsDoc && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* MAIN PREVIEW PANEL (LEFT 8 COLS) */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* WORKSPACE HEADER TOOLBAR */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-4 rounded-3xl">
              
              {/* Zoom & Page navigation */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl p-1.5 shrink-0 text-xs font-black select-none">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 rounded-lg text-slate-500 transition-all cursor-pointer"
                  >
                    Prev
                  </button>
                  <span className="px-2 text-slate-700 dark:text-slate-300">
                    Page {currentPage} of {pageCount}
                  </span>
                  <button
                    disabled={currentPage === pageCount}
                    onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                    className="px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 rounded-lg text-slate-500 transition-all cursor-pointer"
                  >
                    Next
                  </button>
                </div>

                <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))}
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
              </div>

              {/* View Toggle */}
              <div className="flex items-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setViewMode("side")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === "side" 
                      ? "bg-[#518231]/10 text-[#518231]" 
                      : "text-slate-450 hover:bg-slate-100"
                  }`}
                  title="Side-by-Side Live Viewer"
                >
                  <Columns size={14} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === "grid" 
                      ? "bg-[#518231]/10 text-[#518231]" 
                      : "text-slate-450 hover:bg-slate-100"
                  }`}
                  title="Preview Selection Grid"
                >
                  <Grid size={14} />
                </button>
              </div>

            </div>

            {/* SIDE-BY-SIDE / GRID workspace container */}
            {viewMode === "side" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* ORIGINAL SCAN VIEWER */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-450 uppercase tracking-widest pl-1">
                    Original Scanned Page
                  </span>
                  <div 
                    className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-3xl p-4 flex items-center justify-center overflow-auto shadow-inner min-h-[400px]"
                  >
                    <div 
                      className="bg-white dark:bg-slate-900 shadow border rounded-xl overflow-hidden"
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "center center",
                        transition: "transform 0.15s ease-out"
                      }}
                    >
                      <canvas ref={previewCanvasRef} className="max-w-full" />
                    </div>
                  </div>
                </div>

                {/* RECOGNIZED TEXT VIEWER */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center pl-1">
                    <span className="text-[10px] font-black text-slate-450 uppercase tracking-widest">
                      Recognized Text Output
                    </span>
                    {activeResult && (
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-green-600">
                        <Check size={12} strokeWidth={3} />
                        <span>OCR Active ({Math.round(activeResult.confidence)}% Confidence)</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 flex flex-col justify-between shadow-inner min-h-[400px] h-full relative">
                    
                    {activeResult ? (
                      <div className="space-y-4 h-full flex flex-col justify-between">
                        <div className="overflow-y-auto max-h-[380px] custom-scrollbar space-y-4">
                          {/* Confidence Analysis highlighting low confidence words in red */}
                          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs leading-relaxed font-bold text-slate-700 dark:text-slate-350 whitespace-pre-wrap">
                            {activeResult.text}
                          </div>
                          
                          {/* Confidence Analysis View */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider pl-1">
                              Confidence Analysis (Word-by-word)
                            </span>
                            <div className="flex flex-wrap gap-1 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-h-40 overflow-y-auto custom-scrollbar">
                              {activeResult.words.map((w, wIdx) => {
                                const isLowConf = w.confidence < 70;
                                return (
                                  <span 
                                    key={wIdx} 
                                    className={`px-1 rounded text-[10px] font-extrabold ${
                                      isLowConf 
                                        ? "bg-red-500/10 text-red-500 border border-red-500/20" 
                                        : "text-slate-600 dark:text-slate-400"
                                    }`}
                                    title={`Confidence: ${Math.round(w.confidence)}%`}
                                  >
                                    {w.text}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Text Actions */}
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200/50 dark:border-slate-850">
                          <button
                            onClick={handleCopyText}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] rounded-xl cursor-pointer transition-all"
                          >
                            <Copy size={12} />
                            {copySuccess ? "Copied!" : "Copy Full Text"}
                          </button>
                          <button
                            onClick={handleDownloadTextFile}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] rounded-xl cursor-pointer transition-all"
                          >
                            <Download size={12} />
                            Save TXT
                          </button>
                          {ocrMode === "table" && (
                            <button
                              onClick={handleDownloadCsv}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#518231] hover:bg-[#436e29] text-white font-extrabold text-[10px] rounded-xl cursor-pointer transition-all"
                            >
                              <Download size={12} />
                              Export Cell Grid (CSV)
                            </button>
                          )}
                          <button
                            onClick={handleDownloadJson}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] rounded-xl cursor-pointer transition-all"
                          >
                            <FileJson size={12} />
                            Export JSON Report
                          </button>
                        </div>

                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 text-center h-full py-20">
                        <div className="p-3 bg-slate-200 dark:bg-slate-900 text-slate-400 dark:text-slate-500 rounded-2xl">
                          <BookOpen size={24} />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-extrabold max-w-[200px]">
                          Select language options in the sidebar and click "Run OCR" to generate copyable text.
                        </p>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            ) : (
              /* GRID PAGE SELECTION VIEW */
              <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl shadow-inner min-h-[400px]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map(pageNum => {
                    const isSelected = selectedPreviewPages[pageNum] || false;
                    const hasOcr = !!ocrResults[pageNum];
                    return (
                      <div
                        key={pageNum}
                        onClick={() => setSelectedPreviewPages(prev => ({ ...prev, [pageNum]: !prev[pageNum] }))}
                        className={`relative rounded-xl border-2 p-2 flex flex-col items-center gap-2 cursor-pointer bg-white dark:bg-slate-900 transition-all select-none group/thumb ${
                          isSelected
                            ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10 shadow-sm"
                            : "border-slate-200 dark:border-slate-850 hover:border-[#518231]/40"
                        }`}
                      >
                        <div className={`absolute top-2 right-2 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          isSelected 
                            ? "bg-[#518231] border-[#518231] text-white" 
                            : "bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-transparent"
                        }`}>
                          <Check size={12} strokeWidth={3} />
                        </div>

                        <div className="w-24 h-32 bg-slate-50 dark:bg-slate-950 rounded border flex items-center justify-center overflow-hidden">
                          <span className="text-[10px] text-slate-400 font-bold">Page {pageNum}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[11px] font-black text-slate-700 dark:text-slate-300">
                            Page {pageNum}
                          </span>
                          {hasOcr && (
                            <span className="text-[8px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded font-black uppercase">
                              {Math.round(ocrResults[pageNum].confidence)}% Conf
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* OCR PROGRESS AREA */}
            {isProcessing && (
              <div className="bg-[#518231]/5 border border-[#518231]/20 p-5 rounded-3xl space-y-3">
                <div className="flex justify-between items-center text-xs font-black">
                  <span className="text-[#518231] flex items-center gap-1.5">
                    <Loader2 className="animate-spin" size={14} />
                    {progressMsg}
                  </span>
                  <span className="text-[#518231]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#518231] h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

          </div>

          {/* SIDEBAR PANEL (RIGHT 4 COLS) */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* FILE GENERAL DETAILS */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-slate-500 dark:text-slate-450 uppercase tracking-widest pl-1">
                Document Details
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
              </div>
            </div>

            {/* OCR ENGINE CONFIGURATION PANEL */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-slate-500 dark:text-slate-450 uppercase tracking-widest pl-1">
                OCR Configurations
              </h3>

              <div className="space-y-4">
                
                {/* Language list multi-select selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest pl-1">
                    Recognition Languages
                  </label>
                  
                  <div className="relative group">
                    <div className="w-full flex flex-wrap gap-1 px-3 py-2.5 border border-slate-350 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-2xl text-xs font-bold min-h-11">
                      {selectedLangs.map(code => {
                        const langObj = OCR_LANGUAGES.find(l => l.code === code);
                        return (
                          <span key={code} className="flex items-center gap-1 bg-[#518231]/10 text-[#518231] px-2 py-0.5 rounded-lg text-[10px] font-black">
                            {langObj?.name || code}
                            <button
                              type="button"
                              onClick={() => toggleLanguageSelection(code)}
                              className="hover:text-red-500 font-bold ml-0.5"
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}
                      {selectedLangs.length === 0 && (
                        <span className="text-slate-400">Select language...</span>
                      )}
                    </div>
                    
                    {/* Collapsible language options list */}
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl py-2 max-h-56 overflow-y-auto custom-scrollbar z-30 shadow-lg hidden group-hover:block hover:block">
                      {OCR_LANGUAGES.map(lang => {
                        const isChecked = selectedLangs.includes(lang.code);
                        return (
                          <div
                            key={lang.code}
                            onClick={() => toggleLanguageSelection(lang.code)}
                            className="flex items-center justify-between px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 text-[11px] font-extrabold text-slate-700 dark:text-slate-350 cursor-pointer"
                          >
                            <span>{lang.name}</span>
                            {isChecked && <Check size={12} className="text-[#518231]" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <p className="text-[8px] text-slate-400 dark:text-slate-500 font-bold mt-1 pl-1">
                    Hover dropdown box to select multiple languages for bilingual scans.
                  </p>
                </div>

                {/* OCR Mode Radio Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest pl-1">
                    OCR Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "text", label: "Text Only", desc: "Raw Text" },
                      { id: "searchable", label: "Searchable PDF", desc: "PDF sandwich" },
                      { id: "table", label: "Table cells", desc: "Extract grids" }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => setOcrMode(mode.id as any)}
                        className={`flex flex-col items-center justify-center p-2.5 border rounded-xl transition-all text-center gap-1 cursor-pointer ${
                          ocrMode === mode.id
                            ? "border-[#518231] bg-white dark:bg-slate-950 shadow-xs"
                            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                        }`}
                      >
                        <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 leading-tight">
                          {mode.label}
                        </span>
                        <span className="text-[8px] text-slate-400 font-semibold leading-none">
                          {mode.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preprocessing Toggles */}
                <div className="space-y-2 border-t pt-3.5 border-slate-200/50 dark:border-slate-850">
                  <label className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest pl-1">
                    Image Preprocessing
                  </label>
                  
                  <div className="space-y-2 text-xs font-bold">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Boost Text Contrast</span>
                      <input
                        type="checkbox"
                        checked={autoContrast}
                        onChange={e => setAutoContrast(e.target.checked)}
                        className="accent-[#518231] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Apply Grayscale Threshold (Binarize)</span>
                      <input
                        type="checkbox"
                        checked={binarizeThreshold}
                        onChange={e => setBinarizeThreshold(e.target.checked)}
                        className="accent-[#518231] w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Target Page range selections */}
                <div className="space-y-2.5 border-t pt-3.5 border-slate-200/50 dark:border-slate-850">
                  <label className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest pl-1">
                    Target Pages
                  </label>
                  <div className="space-y-2.5">
                    {[
                      { id: "all", label: "Entire Document" },
                      { id: "selected", label: "Selected Preview Pages" },
                      { id: "range", label: "Custom Page Range" }
                    ].map(opt => {
                      const isChecked = targetPages === opt.id;
                      return (
                        <div key={opt.id} className="space-y-2">
                          <div
                            onClick={() => setTargetPages(opt.id as any)}
                            className={`p-3 border rounded-xl cursor-pointer text-left transition-all ${
                              isChecked
                                ? "bg-white dark:bg-slate-950 border-[#518231] shadow-xs"
                                : "bg-white hover:bg-slate-100/30 dark:bg-slate-900 border-slate-200 dark:border-slate-850"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="target_pages"
                                checked={isChecked}
                                onChange={() => {}}
                                className="accent-[#518231]"
                              />
                              <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                                {opt.label}
                              </span>
                            </div>
                          </div>

                          {opt.id === "range" && isChecked && (
                            <div className="pl-1 animate-in slide-in-from-top-1 duration-150">
                              <input
                                type="text"
                                value={customRangeText}
                                onChange={e => setCustomRangeText(e.target.value)}
                                placeholder="e.g. 1-5, 8, 12-15"
                                className="w-full px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-950 outline-none focus:border-[#518231]"
                              />
                              <p className="text-[8px] text-slate-400 font-semibold mt-1">
                                Separate limits with commas and hyphens.
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* ACTION TRIGGERS */}
            <div className="space-y-3.5">
              <button
                onClick={handleRunOcr}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#518231] hover:bg-[#436e29] disabled:bg-slate-200 disabled:dark:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-2xl cursor-pointer transition-all shadow-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Processing OCR...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Run Character Recognition (OCR)
                  </>
                )}
              </button>

              {ocrMode === "searchable" && Object.keys(ocrResults).length > 0 && (
                <button
                  onClick={handleDownloadSearchablePdf}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 py-4 border-2 border-[#518231] hover:bg-[#518231]/10 disabled:opacity-50 text-[#518231] font-extrabold text-sm rounded-2xl cursor-pointer transition-all shadow-xs"
                >
                  <Download size={16} />
                  Download Searchable PDF
                </button>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
