"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  ShieldAlert, Upload, Trash2, Download, X,
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  MousePointer2, Square, ScanEye, Brush
} from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";

const PDFJS_VERSION = "3.11.174";
const MAX_LOCAL_FILE_SIZE = 150 * 1024 * 1024; // 150MB

interface RedactionBox {
  id: string;
  page: number;
  x: number; // percentage (0-100)
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
  color: string;
}

export function RedactPdfTool() {
  // Global Setup
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  
  // Viewer State
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0); // Viewer scale
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [viewerDimensions, setViewerDimensions] = useState({ width: 0, height: 0 });
  
  // Redactions
  const [redactions, setRedactions] = useState<RedactionBox[]>([]);
  const [redactionColor, setRedactionColor] = useState<string>("#000000");
  const [exporting, setExporting] = useState(false);

  // Drawing State
  const [isDrawing, setIsDrawing] = useState(false);
  const drawStartPos = useRef({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState<{ x: number, y: number, w: number, h: number } | null>(null);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Handle file input
  const processFile = async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please upload a valid PDF.");
      return;
    }
    if (file.size > MAX_LOCAL_FILE_SIZE) {
      alert("File exceeds 150MB limit.");
      return;
    }

    setPdfFile(file);
    const buffer = await file.arrayBuffer();
    
    try {
      const pdfjs = await loadPdfJs();
      const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
      setPdfjsDoc(doc);
      setNumPages(doc.numPages);
      setCurrentPage(1);
      setRedactions([]);
    } catch (e: any) {
      alert("Failed to read PDF. It might be corrupted or password protected.");
      setPdfFile(null);
    }
  };

  // Render PDF Page
  const renderPage = useCallback(async () => {
    if (!pdfjsDoc || !canvasRef.current) return;
    setIsRendering(true);

    try {
      const page = await pdfjsDoc.getPage(currentPage);
      // Calculate responsive scale
      const unscaledViewport = page.getViewport({ scale: 1.0 });
      
      const targetWidth = Math.min(unscaledViewport.width, 800);
      const baseScale = targetWidth / unscaledViewport.width;
      const finalScale = baseScale * scale;
      
      const viewport = page.getViewport({ scale: finalScale });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      
      setViewerDimensions({ width: viewport.width, height: viewport.height });
      
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
  }, [pdfjsDoc, currentPage, scale]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // -- Drawing Logic --
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if ('button' in e && e.button !== 0) return; // Only left click
    if (!containerRef.current) return;
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setIsDrawing(true);
    drawStartPos.current = { x, y };
    setCurrentBox({ x, y, w: 0, h: 0 });
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing || !containerRef.current) return;
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const currentX = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const currentY = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

    const newX = Math.min(drawStartPos.current.x, currentX);
    const newY = Math.min(drawStartPos.current.y, currentY);
    const newW = Math.abs(currentX - drawStartPos.current.x);
    const newH = Math.abs(currentY - drawStartPos.current.y);

    setCurrentBox({ x: newX, y: newY, w: newW, h: newH });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentBox && currentBox.w > 1 && currentBox.h > 1) { // Minimum size threshold
      const newRedaction: RedactionBox = {
        id: `redact-${Date.now()}`,
        page: currentPage,
        x: currentBox.x,
        y: currentBox.y,
        width: currentBox.w,
        height: currentBox.h,
        color: redactionColor
      };
      setRedactions([...redactions, newRedaction]);
    }
    setCurrentBox(null);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove, { passive: false });
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDrawing, currentBox]);

  const removeRedaction = (id: string) => {
    setRedactions(redactions.filter(r => r.id !== id));
  };

  // -- True Redaction Export Logic --
  const handleExport = async () => {
    if (!pdfFile || !pdfjsDoc) return;
    setExporting(true);
    
    try {
      // 1. Create a brand new empty PDF document via pdf-lib
      const newPdfDoc = await PDFDocument.create();

      // 2. Iterate through every page of the original document
      for (let i = 1; i <= numPages; i++) {
        const page = await pdfjsDoc.getPage(i);
        
        // Render to high-res offscreen canvas
        // Scale of 3.0 gives roughly 216 DPI (assuming 72dpi base), good for printing/reading
        const viewport = page.getViewport({ scale: 3.0 });
        
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = viewport.width;
        offscreenCanvas.height = viewport.height;
        const ctx = offscreenCanvas.getContext('2d');
        if (!ctx) continue;

        // Fill background white (in case of transparent PDFs)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

        // Render PDF page into canvas
        await page.render({ canvasContext: ctx, viewport }).promise;

        // 3. Draw Redactions directly onto the canvas pixels
        const pageRedactions = redactions.filter(r => r.page === i);
        for (const redaction of pageRedactions) {
          ctx.fillStyle = redaction.color;
          
          // Convert percentage back to high-res pixels
          const px = (redaction.x / 100) * viewport.width;
          const py = (redaction.y / 100) * viewport.height;
          const pw = (redaction.width / 100) * viewport.width;
          const ph = (redaction.height / 100) * viewport.height;
          
          ctx.fillRect(px, py, pw, ph);
        }

        // 4. Convert canvas to JPEG (to compress file size)
        // We use JPEG instead of PNG because full-page PNGs are massive
        const imgDataUrl = offscreenCanvas.toDataURL('image/jpeg', 0.90);
        const imgBytes = Uint8Array.from(atob(imgDataUrl.split(',')[1]), c => c.charCodeAt(0));
        
        // 5. Embed image and add to new PDF
        const embeddedImage = await newPdfDoc.embedJpg(imgBytes);
        
        // Get original unscaled dimensions to size the PDF page correctly
        const originalViewport = page.getViewport({ scale: 1.0 });
        const newPage = newPdfDoc.addPage([originalViewport.width, originalViewport.height]);
        
        // Draw the image to fit the new page
        newPage.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: originalViewport.width,
          height: originalViewport.height,
        });
      }

      // 6. Save and Download the flattened, sanitized document
      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFile.name ? `${pdfFile.name.replace(".pdf", "")}_redacted.pdf` : "redacted_document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (e) {
      console.error("Export failed", e);
      alert("Failed to export PDF. Your browser may have run out of memory for a large file.");
    } finally {
      setExporting(false);
    }
  };


  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Intro Banner */}
      {!pdfFile && (
        <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <ShieldAlert className="text-red-500" />
              Secure, Permanent Redaction
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Permanently destroy sensitive information. We use total document rasterization to ensure redacted text and hidden metadata cannot be recovered.
            </p>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      {!pdfFile ? (
        // Upload State
        <div className="flex flex-col items-center justify-center w-full min-h-[350px] rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-red-500/50 transition-colors">
          <input 
            type="file" accept=".pdf,application/pdf" className="hidden" ref={fileInputRef}
            onChange={(e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); }}
          />
          <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-6">
            <Upload size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Upload PDF to Redact</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Drag and drop your document here, or click to browse.</p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3.5 bg-slate-900 dark:bg-red-600 hover:bg-slate-800 dark:hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-md"
          >
            Select Document
          </button>
        </div>
      ) : (
        // Dashboard State
        <div className="flex flex-col lg:flex-row gap-6 items-start h-auto min-h-[700px]">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
            
            {/* File Info */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-slate-800 dark:text-white truncate" title={pdfFile.name}>{pdfFile.name}</h4>
                <button 
                  onClick={() => { setPdfFile(null); setRedactions([]); }}
                  className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</span>
                <span>•</span>
                <span>{numPages} Pages</span>
              </div>
            </div>

            {/* Redaction Tools */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col gap-4">
              
              <div>
                <h4 className="font-semibold text-sm text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Brush size={16} /> Redaction Color
                </h4>
                <div className="flex gap-2">
                  <button onClick={() => setRedactionColor("#000000")} className={`flex-1 py-2 rounded-lg border-2 ${redactionColor === "#000000" ? 'border-indigo-500 bg-slate-100 dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700'} flex items-center justify-center gap-2`}>
                    <div className="w-4 h-4 bg-black rounded-sm border border-slate-300"></div> <span className="text-xs font-semibold">Black</span>
                  </button>
                  <button onClick={() => setRedactionColor("#ffffff")} className={`flex-1 py-2 rounded-lg border-2 ${redactionColor === "#ffffff" ? 'border-indigo-500 bg-slate-100 dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700'} flex items-center justify-center gap-2`}>
                    <div className="w-4 h-4 bg-white rounded-sm border border-slate-300"></div> <span className="text-xs font-semibold">White</span>
                  </button>
                  <button onClick={() => setRedactionColor("#ef4444")} className={`flex-1 py-2 rounded-lg border-2 ${redactionColor === "#ef4444" ? 'border-indigo-500 bg-slate-100 dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700'} flex items-center justify-center gap-2`}>
                    <div className="w-4 h-4 bg-red-500 rounded-sm border border-slate-300"></div> <span className="text-xs font-semibold">Red</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-500/20 text-sm text-indigo-800 dark:text-indigo-300 flex items-start gap-2">
                <MousePointer2 className="shrink-0 mt-0.5" size={16} />
                <p>Click and drag your mouse over the document to draw redaction zones.</p>
              </div>

            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col flex-grow">
              <h4 className="font-semibold text-sm text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                <ScanEye size={16} /> Redaction Summary
              </h4>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-2">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Zones Marked</span>
                <span className="font-bold text-slate-900 dark:text-white">{redactions.length}</span>
              </div>

              {redactions.length > 0 && (
                <button 
                  onClick={() => setRedactions([])}
                  className="mt-2 text-sm text-red-500 hover:text-red-600 font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Export Action */}
            <button 
              onClick={handleExport}
              disabled={exporting}
              className="mt-auto w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {exporting ? "Sanitizing..." : "Apply & Export PDF"}
              {!exporting && <Download size={20} />}
            </button>
          </div>

          {/* Main Viewer Area */}
          <div className="flex-grow w-full bg-slate-100 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-inner relative">
            
            {/* Toolbar */}
            <div className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-10 shrink-0">
              <div className="flex items-center gap-2">
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

              <div className="flex items-center gap-1">
                <button onClick={() => setScale(s => Math.max(0.5, s - 0.2))} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <ZoomOut size={18} />
                </button>
                <span className="text-xs font-mono w-12 text-center text-slate-500">{Math.round(scale * 100)}%</span>
                <button onClick={() => setScale(s => Math.min(2.5, s + 0.2))} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>

            {/* Canvas Container */}
            <div className="flex-grow overflow-auto relative flex justify-center bg-slate-200 dark:bg-slate-950/50 p-4 custom-scrollbar">
              
              <div 
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                className="relative shadow-xl bg-white select-none origin-top cursor-crosshair"
                style={{ 
                  width: viewerDimensions.width, 
                  height: viewerDimensions.height,
                  transition: isRendering ? 'none' : 'width 0.2s, height 0.2s'
                }}
              >
                {/* PDF Background Canvas */}
                <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none" />

                {/* Loading Overlay */}
                {isRendering && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-8 h-8 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Placed Redaction Zones */}
                {redactions.filter(item => item.page === currentPage).map(item => (
                  <div 
                    key={item.id}
                    className="absolute z-20 group border-2 border-red-500/50 flex items-center justify-center overflow-hidden pointer-events-auto"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: `${item.width}%`,
                      height: `${item.height}%`,
                      backgroundColor: item.color,
                      opacity: 0.85
                    }}
                  >
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeRedaction(item.id); }}
                      className="opacity-0 group-hover:opacity-100 w-6 h-6 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 shadow-sm transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}

                {/* Active Drawing Box */}
                {isDrawing && currentBox && (
                  <div 
                    className="absolute z-30 border-2 border-indigo-500 bg-indigo-500/20 pointer-events-none"
                    style={{
                      left: `${currentBox.x}%`,
                      top: `${currentBox.y}%`,
                      width: `${currentBox.w}%`,
                      height: `${currentBox.h}%`,
                    }}
                  />
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
