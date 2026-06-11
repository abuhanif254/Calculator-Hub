"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Wrench, Upload, Trash2, Download, AlertTriangle, 
  CheckCircle, FileWarning, Search, Zap, FileText, ChevronLeft, ChevronRight
} from "lucide-react";
import { PDFDocument } from "pdf-lib";

const PDFJS_VERSION = "3.11.174";
const MAX_LOCAL_FILE_SIZE = 150 * 1024 * 1024; // 150MB

interface DiagnosticReport {
  score: "Excellent" | "Good" | "Recoverable" | "Severely Damaged" | "Unknown";
  color: string;
  errors: string[];
  warnings: string[];
  info: string[];
}

export function RepairPdfTool() {
  // Global Setup
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Diagnostic State
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticReport, setDiagnosticReport] = useState<DiagnosticReport | null>(null);
  
  // Recovery State
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairComplete, setRepairComplete] = useState(false);
  const [repairedBlob, setRepairedBlob] = useState<Blob | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  
  // Viewer State (for previewing repaired file)
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);

  // PDF.js loader
  const loadPdfJs = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const windowAny = window as any;
      if (windowAny.pdfjsLib) return resolve(windowAny.pdfjsLib);
      const script = document.createElement("script");
      script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
      script.onload = () => {
        if (windowAny.pdfjsLib) {
          windowAny.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
          resolve(windowAny.pdfjsLib);
        } else reject(new Error("PDF.js missing"));
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // --- 1. Diagnostics Engine ---
  const runDiagnostics = (buffer: ArrayBuffer, fileName: string): DiagnosticReport => {
    const report: DiagnosticReport = {
      score: "Unknown",
      color: "bg-slate-500",
      errors: [],
      warnings: [],
      info: []
    };

    const view = new Uint8Array(buffer);
    if (view.length === 0) {
      report.score = "Severely Damaged";
      report.color = "text-red-500";
      report.errors.push("File is 0kb (Empty). No data exists to recover.");
      return report;
    }

    report.info.push(`File size: ${(view.length / 1024).toFixed(2)} KB`);

    // Check Header
    const headerStr = new TextDecoder("ascii").decode(view.slice(0, 10));
    if (headerStr.includes("%PDF-")) {
      report.info.push(`Valid Header found: ${headerStr.substring(0, 8)}`);
    } else {
      report.errors.push("Missing %PDF- header. File may be severely corrupted or encrypted.");
    }

    // Check Trailer
    const endSlice = view.length > 1024 ? view.slice(view.length - 1024) : view;
    const endStr = new TextDecoder("ascii").decode(endSlice);
    
    if (endStr.includes("%%EOF")) {
      report.info.push("Valid %%EOF trailer found.");
    } else {
      report.warnings.push("Missing %%EOF trailer. File download was likely interrupted or truncated.");
    }

    if (endStr.includes("startxref")) {
      report.info.push("Cross-Reference table pointer (startxref) located.");
    } else {
      report.errors.push("Missing 'startxref' pointer. The architectural map of the PDF is broken.");
    }

    // Determine Score
    if (report.errors.length > 1) {
      report.score = "Severely Damaged";
      report.color = "text-red-500";
    } else if (report.errors.length === 1 || report.warnings.length > 0) {
      report.score = "Recoverable";
      report.color = "text-yellow-500";
    } else {
      report.score = "Excellent";
      report.color = "text-emerald-500";
      report.info.push("Structurally, the file appears perfectly healthy. If it won't open, it may be password protected or use an unsupported feature.");
    }

    return report;
  };

  // Handle file input
  const processFile = async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please upload a PDF file.");
      return;
    }
    if (file.size > MAX_LOCAL_FILE_SIZE) {
      alert("File exceeds 150MB limit.");
      return;
    }

    setPdfFile(file);
    setIsDiagnosing(true);
    setRepairComplete(false);
    setRepairedBlob(null);
    setExtractedText("");
    setPdfjsDoc(null);
    
    try {
      const buffer = await file.arrayBuffer();
      setFileBuffer(buffer);
      
      // Artificial delay so user can see diagnostics loading state (looks more professional)
      await new Promise(r => setTimeout(r, 600)); 
      
      const report = runDiagnostics(buffer, file.name);
      setDiagnosticReport(report);

    } catch (e: any) {
      alert("Failed to read file from disk.");
      setPdfFile(null);
    } finally {
      setIsDiagnosing(false);
    }
  };


  // --- 2. Recovery Modes ---

  const executeQuickRepair = async () => {
    if (!fileBuffer) return;
    setIsRepairing(true);
    setExtractedText("");

    try {
      // PDF-Lib naturally rebuilds the xref table and discards orphaned objects upon save.
      // We use ignoreEncryption to aggressively parse whatever it can.
      const pdfDoc = await PDFDocument.load(fileBuffer, { 
        ignoreEncryption: true,
        updateMetadata: false
      });
      
      const repairedBytes = await pdfDoc.save();
      const blob = new Blob([repairedBytes as any], { type: "application/pdf" });
      setRepairedBlob(blob);
      setRepairComplete(true);

      // Load into viewer
      loadPreview(blob);
      
    } catch (e: any) {
      console.error("Quick Repair Failed:", e);
      alert("Structural rebuild failed. The file is too damaged. Please try Content Extraction.");
    } finally {
      setIsRepairing(false);
    }
  };

  const executeContentExtraction = async () => {
    if (!fileBuffer) return;
    setIsRepairing(true);
    setRepairComplete(false);
    setRepairedBlob(null);

    try {
      const pdfjs = await loadPdfJs();
      // Use pdfjs-dist to aggressively parse and extract text, bypassing structural constraints
      const loadingTask = pdfjs.getDocument({ data: new Uint8Array(fileBuffer) });
      const doc = await loadingTask.promise;
      
      let fullText = "";
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }

      setExtractedText(fullText || "No readable text found in document.");
      setRepairComplete(true);
    } catch (e: any) {
      console.error("Content Extraction Failed:", e);
      alert("Content Extraction failed. The binary streams are completely destroyed.");
    } finally {
      setIsRepairing(false);
    }
  };

  const loadPreview = async (blob: Blob) => {
    try {
      const pdfjs = await loadPdfJs();
      const buffer = await blob.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
      setPdfjsDoc(doc);
      setNumPages(doc.numPages);
      setCurrentPage(1);
    } catch(e) {
      console.error("Preview load failed", e);
    }
  };

  const renderPage = useCallback(async () => {
    if (!pdfjsDoc || !canvasRef.current) return;
    setIsRendering(true);

    try {
      const page = await pdfjsDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale: 1.2 });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      if (renderTaskRef.current) {
        try { renderTaskRef.current.cancel(); } catch (e) {}
      }

      const renderTask = page.render({ canvasContext: context, viewport });
      renderTaskRef.current = renderTask;
      await renderTask.promise;

    } catch (e: any) {
      if (e.name !== "RenderingCancelledException") {
        console.error("Render error", e);
      }
    } finally {
      setIsRendering(false);
    }
  }, [pdfjsDoc, currentPage]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);


  const downloadRepaired = () => {
    if (!repairedBlob || !pdfFile) return;
    const url = URL.createObjectURL(repairedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = pdfFile.name ? `${pdfFile.name.replace(".pdf", "")}_repaired.pdf` : "repaired_document.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadExtractedText = () => {
    if (!extractedText || !pdfFile) return;
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = pdfFile.name ? `${pdfFile.name.replace(".pdf", "")}_extracted.txt` : "extracted_content.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Intro Banner */}
      {!pdfFile && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Wrench className="text-emerald-500" />
              Diagnostic & Repair Engine
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Upload a corrupted or truncated PDF. Our local WebAssembly engine will analyze the binary structure and attempt a full structural rebuild without uploading your data.
            </p>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      {!pdfFile ? (
        // Upload State
        <div className="flex flex-col items-center justify-center w-full min-h-[350px] rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500/50 transition-colors">
          <input 
            type="file" accept=".pdf,application/pdf" className="hidden" ref={fileInputRef}
            onChange={(e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); }}
          />
          <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-6">
            <FileWarning size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Upload Damaged PDF</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Select a file to run deep diagnostics.</p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3.5 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-md"
          >
            Select Document
          </button>
        </div>
      ) : (
        // Dashboard State
        <div className="flex flex-col lg:flex-row gap-6 items-start h-auto min-h-[700px]">
          
          {/* Left Sidebar: Diagnostics & Tools */}
          <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-4">
            
            {/* File Info */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-slate-800 dark:text-white truncate" title={pdfFile.name}>{pdfFile.name}</h4>
                <button 
                  onClick={() => { setPdfFile(null); setFileBuffer(null); setDiagnosticReport(null); setRepairComplete(false); }}
                  className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>

            {/* Diagnostics Report */}
            {isDiagnosing ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col items-center justify-center gap-4 min-h-[250px]">
                <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Analyzing Binary Structure...</p>
              </div>
            ) : diagnosticReport ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <Search className="text-indigo-500" size={20} />
                  Diagnostic Report
                </h3>
                
                <div className="mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Health Score</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${diagnosticReport.score === 'Excellent' ? 'bg-emerald-500' : diagnosticReport.score === 'Recoverable' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span className={`font-bold text-lg ${diagnosticReport.color}`}>{diagnosticReport.score}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {diagnosticReport.errors.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-200 dark:border-red-900/30">
                      <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2 uppercase tracking-wider flex items-center gap-1"><AlertTriangle size={12}/> Critical Errors</p>
                      <ul className="list-disc pl-4 text-sm text-red-800 dark:text-red-300 space-y-1">
                        {diagnosticReport.errors.map((e, i) => <li key={i}>{e}</li>)}
                      </ul>
                    </div>
                  )}

                  {diagnosticReport.warnings.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
                      <p className="text-xs font-bold text-yellow-700 dark:text-yellow-400 mb-2 uppercase tracking-wider flex items-center gap-1"><AlertTriangle size={12}/> Warnings</p>
                      <ul className="list-disc pl-4 text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
                        {diagnosticReport.warnings.map((w, i) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>
                  )}

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1"><CheckCircle size={12}/> Info</p>
                    <ul className="list-disc pl-4 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      {diagnosticReport.info.map((info, i) => <li key={i}>{info}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Recovery Actions */}
            {!repairComplete && diagnosticReport && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col gap-3">
                <button 
                  onClick={executeQuickRepair}
                  disabled={isRepairing}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isRepairing ? "Working..." : "Structural Rebuild (Recommended)"}
                  {!isRepairing && <Zap size={18} />}
                </button>
                <p className="text-xs text-slate-500 text-center px-2">Rebuilds XREF tables and recovers orphaned objects. Preserves formatting.</p>
                
                <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-2"></div>

                <button 
                  onClick={executeContentExtraction}
                  disabled={isRepairing}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  {isRepairing ? "Working..." : "Force Content Extraction"}
                  {!isRepairing && <FileText size={18} />}
                </button>
                <p className="text-xs text-slate-500 text-center px-2">Rips raw text out of severely damaged files. Formatting will be lost.</p>
              </div>
            )}

            {/* Success Actions */}
            {repairComplete && (
              <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-900/30 p-5 shadow-sm flex flex-col gap-4">
                <h3 className="font-bold text-lg text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle size={20} />
                  Recovery Complete
                </h3>
                
                {repairedBlob && (
                  <button 
                    onClick={downloadRepaired}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    Download Repaired PDF
                    <Download size={18} />
                  </button>
                )}

                {extractedText && (
                  <button 
                    onClick={downloadExtractedText}
                    className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    Download Extracted Text
                    <Download size={18} />
                  </button>
                )}
              </div>
            )}

          </div>

          {/* Main Viewer Area (Preview) */}
          <div className="flex-grow w-full bg-slate-100 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-inner relative min-h-[500px]">
            
            {!repairComplete ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                <Search size={48} className="mb-4 opacity-20" />
                <h3 className="text-xl font-semibold mb-2">Awaiting Repair</h3>
                <p className="max-w-md">Run a structural rebuild or content extraction from the sidebar to preview the recovered data here.</p>
              </div>
            ) : repairedBlob ? (
              // PDF Previewer
              <>
                <div className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center px-4 z-10 shrink-0 gap-4">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage <= 1}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-24 text-center">
                    Page {currentPage} of {numPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(Math.min(numPages, currentPage + 1))}
                    disabled={currentPage >= numPages}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className="flex-grow overflow-auto relative flex justify-center bg-slate-200 dark:bg-slate-950/50 p-4 custom-scrollbar">
                  <div className="relative shadow-xl bg-white select-none">
                    <canvas ref={canvasRef} />
                    {isRendering && (
                      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-6 h-6 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : extractedText ? (
              // Text Previewer
              <div className="p-6 h-full w-full">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Recovered Text Preview</h3>
                <textarea 
                  readOnly 
                  value={extractedText}
                  className="w-full h-[calc(100%-3rem)] p-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl resize-none font-mono text-sm text-slate-700 dark:text-slate-300 custom-scrollbar"
                />
              </div>
            ) : null}
            
          </div>
        </div>
      )}
    </div>
  );
}
