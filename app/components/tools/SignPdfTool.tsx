"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, Download, X,
  PenTool, Keyboard, Image as ImageIcon, ChevronLeft, ChevronRight,
  ZoomIn, ZoomOut, Save, Plus, Type, Calendar, GripHorizontal
} from "lucide-react";
import SignatureCanvas from "react-signature-canvas";
import { PDFDocument, rgb } from "pdf-lib";

const PDFJS_VERSION = "3.11.174";
const MAX_LOCAL_FILE_SIZE = 150 * 1024 * 1024; // 150MB

interface PlacedItem {
  id: string;
  type: "signature" | "text" | "date";
  content: string; // Base64 for signature, raw string for text/date
  page: number;
  x: number; // percentage of container width (0-100)
  y: number; // percentage of container height (0-100)
  width: number; // percentage of container width
  height: number; // percentage of container height
  fontFamily?: string;
  color?: string;
}

interface SavedSignature {
  id: string;
  dataUrl: string;
  timestamp: number;
}

export function SignPdfTool() {
  // Global Setup
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  
  // Viewer State
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0); // Viewer scale
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [viewerDimensions, setViewerDimensions] = useState({ width: 0, height: 0 });
  
  // Placements & Signatures
  const [savedSignatures, setSavedSignatures] = useState<SavedSignature[]>([]);
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  
  // Modals & UI
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [signatureMode, setSignatureMode] = useState<"draw" | "type" | "upload">("draw");
  const [typedName, setTypedName] = useState("");
  const [typedFont, setTypedFont] = useState("Caveat, cursive");
  const [sigColor, setSigColor] = useState("#0f172a"); // Default slate-900 / black ink
  const [exporting, setExporting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);
  const sigCanvasRef = useRef<any>(null); // react-signature-canvas ref
  const typeCanvasRef = useRef<HTMLCanvasElement>(null); // For generating typed signature image
  const containerRef = useRef<HTMLDivElement>(null);

  // Dragging state
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0, itemX: 0, itemY: 0 });

  // Load saved signatures on mount
  useEffect(() => {
    const saved = localStorage.getItem("saved_pdf_signatures");
    if (saved) {
      try {
        setSavedSignatures(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved signatures");
      }
    }

    // Preload fonts for typed signatures
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Dancing+Script:wght@600&family=Pacifico&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const saveSignatureLocal = (sigs: SavedSignature[]) => {
    setSavedSignatures(sigs);
    localStorage.setItem("saved_pdf_signatures", JSON.stringify(sigs));
  };

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
      setPlacedItems([]);
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
      
      // Target max width depending on container (approx 800px max for desktop readability)
      const targetWidth = Math.min(unscaledViewport.width, 800);
      const baseScale = targetWidth / unscaledViewport.width;
      const finalScale = baseScale * scale;
      
      const viewport = page.getViewport({ scale: finalScale });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      
      // Update dimensions for overlay mapping
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

  // Handle Drag Events for Upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // -- Signature Creation Logic --
  const saveDrawSignature = () => {
    if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) return;
    const dataUrl = sigCanvasRef.current.getCanvas().toDataURL("image/png");
    addNewSignature(dataUrl);
  };

  const saveTypeSignature = () => {
    if (!typedName.trim() || !typeCanvasRef.current) return;
    const canvas = typeCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear and set up
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `60px ${typedFont}`;
    ctx.fillStyle = sigColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    
    ctx.fillText(typedName, canvas.width / 2, canvas.height / 2);
    
    const dataUrl = canvas.toDataURL("image/png");
    addNewSignature(dataUrl);
  };

  const handleUploadSignature = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          addNewSignature(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addNewSignature = (dataUrl: string) => {
    const newSig: SavedSignature = {
      id: `sig-${Date.now()}`,
      dataUrl,
      timestamp: Date.now()
    };
    saveSignatureLocal([newSig, ...savedSignatures].slice(0, 10)); // Keep last 10
    setIsSignatureModalOpen(false);
  };

  // -- Placing Items --
  const placeItemOnPage = (type: "signature" | "text" | "date", content: string) => {
    // Determine default size based on type
    let initW = 25; // 25% of width
    let initH = 10; // 10% of height
    if (type === "text" || type === "date") {
      initW = 20;
      initH = 5;
    }

    const newItem: PlacedItem = {
      id: `item-${Date.now()}`,
      type,
      content,
      page: currentPage,
      x: 35, // Center-ish
      y: 45,
      width: initW,
      height: initH,
      color: sigColor
    };
    setPlacedItems([...placedItems, newItem]);
  };

  const removeItem = (id: string) => {
    setPlacedItems(placedItems.filter(i => i.id !== id));
  };

  // -- Drag & Drop Placed Items --
  const onMouseDownItem = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    // Only allow dragging if left click (0) or touch
    if ('button' in e && e.button !== 0) return;
    e.stopPropagation();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const item = placedItems.find(i => i.id === id);
    if (!item) return;

    setDraggingItemId(id);
    dragStartPos.current = { x: clientX, y: clientY, itemX: item.x, itemY: item.y };
  };

  useEffect(() => {
    if (!draggingItemId || !containerRef.current) return;

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault(); // prevent scroll while dragging
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      const dx = clientX - dragStartPos.current.x;
      const dy = clientY - dragStartPos.current.y;
      
      const rect = containerRef.current!.getBoundingClientRect();
      // convert pixel delta to percentage delta
      const dPercentX = (dx / rect.width) * 100;
      const dPercentY = (dy / rect.height) * 100;

      let newX = dragStartPos.current.itemX + dPercentX;
      let newY = dragStartPos.current.itemY + dPercentY;

      // Bounds checking (approximate)
      newX = Math.max(0, Math.min(100, newX));
      newY = Math.max(0, Math.min(100, newY));

      setPlacedItems(prev => prev.map(item => 
        item.id === draggingItemId ? { ...item, x: newX, y: newY } : item
      ));
    };

    const onMouseUp = () => {
      setDraggingItemId(null);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: false });
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onMouseMove, { passive: false });
    document.addEventListener("touchend", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, [draggingItemId]);

  const handleExport = async () => {
    if (!pdfFile || placedItems.length === 0) return;
    setExporting(true);
    
    try {
      // 1. Load original PDF
      const freshBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(freshBuffer);
      const pages = pdfDoc.getPages();

      // 2. Map items by page
      for (const item of placedItems) {
        if (item.page < 1 || item.page > pages.length) continue;
        const targetPage = pages[item.page - 1];
        const { width: pdfPageW, height: pdfPageH } = targetPage.getSize();

        // Convert percentage coords to PDF points
        // PDF-lib origin (0,0) is bottom-left. 
        // Our overlay (0,0) is top-left.
        
        const itemWPt = (item.width / 100) * pdfPageW;
        const itemHPt = (item.height / 100) * pdfPageH;
        
        const xPt = (item.x / 100) * pdfPageW;
        const yTopDownPt = (item.y / 100) * pdfPageH;
        
        // Convert y to bottom-up
        const yPt = pdfPageH - yTopDownPt - itemHPt;

        if (item.type === "signature") {
          // Embed image
          const isPng = item.content.startsWith("data:image/png");
          const imageBuffer = Uint8Array.from(atob(item.content.split(",")[1]), c => c.charCodeAt(0));
          
          let embeddedImage;
          if (isPng) embeddedImage = await pdfDoc.embedPng(imageBuffer);
          else embeddedImage = await pdfDoc.embedJpg(imageBuffer);

          targetPage.drawImage(embeddedImage, {
            x: xPt,
            y: yPt,
            width: itemWPt,
            height: itemHPt
          });
        } 
        else if (item.type === "text" || item.type === "date") {
          // For simplicity, we draw standard Helvetica text
          // Note: Full rich text requires embedding fonts, we use standard font
          targetPage.drawText(item.content, {
            x: xPt,
            y: yPt + (itemHPt / 2), // Adjust baseline
            size: 14,
            color: rgb(0, 0, 0),
          });
        }
      }

      // 3. Save and Download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFile?.name ? `${pdfFile.name.replace(".pdf", "")}_signed.pdf` : "signed_document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (e) {
      console.error("Export failed", e);
      alert("Failed to export PDF. Please ensure the file is not encrypted.");
    } finally {
      setExporting(false);
    }
  };


  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Hidden canvas for generating typed signatures */}
      <canvas ref={typeCanvasRef} width={600} height={200} className="hidden" />

      {/* Intro Banner */}
      {!pdfFile && (
        <div className="bg-[#518231]/5 border border-[#518231]/20 dark:border-[#518231]/10 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <PenTool className="text-[#518231]" />
              Secure Electronic Signatures
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Add legally binding signatures to your PDFs. Your documents are completely secure—all signing and rendering happens entirely within your local browser. No uploads. No tracking.
            </p>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      {!pdfFile ? (
        // Upload State
        <div 
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          className={`
            flex flex-col items-center justify-center w-full min-h-[350px] rounded-3xl border-2 border-dashed transition-all duration-300
            ${dragActive ? "border-[#518231] bg-[#518231]/5" : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-[#518231]/50"}
          `}
        >
          <input 
            type="file" accept=".pdf,application/pdf" className="hidden" ref={fileInputRef}
            onChange={(e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); }}
          />
          <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-6 shadow-inner">
            <Upload size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Upload a PDF to Sign</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Drag and drop your document here, or click to browse.</p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3.5 bg-[#518231] hover:bg-[#436b28] text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
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
                  onClick={() => { setPdfFile(null); setPlacedItems([]); }}
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

            {/* Actions */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col gap-3">
              <button 
                onClick={() => setIsSignatureModalOpen(true)}
                className="w-full py-3 bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/20 border border-[#518231]/30 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Plus size={18} /> Add New Signature
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => placeItemOnPage("date", new Date().toLocaleDateString())}
                  className="py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Calendar size={14} /> Date
                </button>
                <button 
                  onClick={() => placeItemOnPage("text", "Text Note")}
                  className="py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Type size={14} /> Text
                </button>
              </div>
            </div>

            {/* Saved Signatures Gallery */}
            {savedSignatures.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col flex-grow">
                <h4 className="font-semibold text-sm text-slate-800 dark:text-white mb-3">Saved Signatures</h4>
                <div className="space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar pr-1">
                  {savedSignatures.map(sig => (
                    <div key={sig.id} className="relative group rounded-xl border border-slate-200 dark:border-slate-700 p-2 hover:border-[#518231] transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/50">
                      <img 
                        src={sig.dataUrl} 
                        alt="Saved Signature" 
                        className="w-full h-16 object-contain"
                        onClick={() => placeItemOnPage("signature", sig.dataUrl)}
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const next = savedSignatures.filter(s => s.id !== sig.id);
                          saveSignatureLocal(next);
                        }}
                        className="absolute top-1 right-1 p-1.5 bg-red-100 text-red-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export Action */}
            <button 
              onClick={handleExport}
              disabled={exporting || placedItems.length === 0}
              className="mt-auto w-full py-4 bg-[#518231] hover:bg-[#436b28] disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {exporting ? "Finalizing..." : "Export Signed PDF"}
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
                className="relative shadow-xl bg-white select-none origin-top"
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
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-4 border-[#518231]/30 border-t-[#518231] rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Placed Elements Overlay */}
                {placedItems.filter(item => item.page === currentPage).map(item => (
                  <div 
                    key={item.id}
                    onMouseDown={(e) => onMouseDownItem(e, item.id)}
                    onTouchStart={(e) => onMouseDownItem(e, item.id)}
                    className={`absolute z-20 group border-2 ${draggingItemId === item.id ? 'border-indigo-500 border-dashed' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600 hover:border-dashed'} cursor-grab active:cursor-grabbing`}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: `${item.width}%`,
                      height: `${item.height}%`,
                      touchAction: 'none' // Prevent scroll while dragging on mobile
                    }}
                  >
                    {/* Render Content */}
                    {item.type === "signature" ? (
                      <img src={item.content} alt="Signature" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-slate-800" style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
                        {item.content}
                      </div>
                    )}

                    {/* Delete Button (Visible on hover) */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                      className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-30"
                    >
                      <X size={12} />
                    </button>
                    
                    {/* Drag Handle UI Hint */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-500/5 pointer-events-none flex items-center justify-center">
                      <GripHorizontal size={24} className="text-indigo-900/20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signature Creation Modal */}
      {isSignatureModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Create Signature</h3>
              <button onClick={() => setIsSignatureModalOpen(false)} className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500">
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800">
              <button onClick={() => setSignatureMode("draw")} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${signatureMode === "draw" ? "text-[#518231] border-b-2 border-[#518231] bg-[#518231]/5" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                <PenTool size={18} /> Draw
              </button>
              <button onClick={() => setSignatureMode("type")} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${signatureMode === "type" ? "text-[#518231] border-b-2 border-[#518231] bg-[#518231]/5" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                <Keyboard size={18} /> Type
              </button>
              <button onClick={() => setSignatureMode("upload")} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${signatureMode === "upload" ? "text-[#518231] border-b-2 border-[#518231] bg-[#518231]/5" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                <ImageIcon size={18} /> Upload
              </button>
            </div>

            {/* Color Picker common */}
            {(signatureMode === "draw" || signatureMode === "type") && (
              <div className="px-6 pt-4 flex gap-3">
                <button onClick={() => setSigColor("#0f172a")} className={`w-8 h-8 rounded-full bg-slate-900 border-2 ${sigColor === "#0f172a" ? "border-[#518231] ring-2 ring-[#518231]/30" : "border-transparent"}`} aria-label="Black Ink" />
                <button onClick={() => setSigColor("#1d4ed8")} className={`w-8 h-8 rounded-full bg-blue-700 border-2 ${sigColor === "#1d4ed8" ? "border-[#518231] ring-2 ring-[#518231]/30" : "border-transparent"}`} aria-label="Blue Ink" />
                <button onClick={() => setSigColor("#b91c1c")} className={`w-8 h-8 rounded-full bg-red-700 border-2 ${sigColor === "#b91c1c" ? "border-[#518231] ring-2 ring-[#518231]/30" : "border-transparent"}`} aria-label="Red Ink" />
              </div>
            )}

            {/* Content Area */}
            <div className="p-6 h-64 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
              
              {signatureMode === "draw" && (
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden relative cursor-crosshair">
                  <SignatureCanvas 
                    ref={sigCanvasRef}
                    penColor={sigColor}
                    canvasProps={{ className: "w-full h-full absolute inset-0" }}
                    minWidth={2} maxWidth={4}
                  />
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <button onClick={() => sigCanvasRef.current?.clear()} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg transition-colors">Clear</button>
                  </div>
                </div>
              )}

              {signatureMode === "type" && (
                <div className="w-full max-w-md space-y-4">
                  <input 
                    type="text" 
                    value={typedName} 
                    onChange={e => setTypedName(e.target.value)} 
                    placeholder="Type your name here..."
                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-lg focus:ring-2 focus:ring-[#518231] outline-none"
                  />
                  <div className="bg-white dark:bg-slate-900 h-32 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 overflow-hidden">
                    {typedName ? (
                      <span style={{ fontFamily: typedFont, color: sigColor, fontSize: '48px', lineHeight: '1' }}>{typedName}</span>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-700 italic">Preview</span>
                    )}
                  </div>
                  <div className="flex justify-center gap-2">
                    <button onClick={() => setTypedFont("Caveat, cursive")} className={`px-3 py-1 text-xs rounded-full border ${typedFont.includes('Caveat') ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600'}`}>Style 1</button>
                    <button onClick={() => setTypedFont("Dancing Script, cursive")} className={`px-3 py-1 text-xs rounded-full border ${typedFont.includes('Dancing') ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600'}`}>Style 2</button>
                    <button onClick={() => setTypedFont("Pacifico, cursive")} className={`px-3 py-1 text-xs rounded-full border ${typedFont.includes('Pacifico') ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600'}`}>Style 3</button>
                  </div>
                </div>
              )}

              {signatureMode === "upload" && (
                <div className="w-full h-full flex items-center justify-center">
                  <label className="flex flex-col items-center justify-center w-full max-w-sm h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors bg-white dark:bg-slate-800/50">
                    <Upload className="w-10 h-10 text-slate-400 mb-3" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Browse Image</span>
                    <span className="text-xs text-slate-500 mt-1">Supports PNG, JPG, WEBP (Transparent PNG recommended)</span>
                    <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleUploadSignature} />
                  </label>
                </div>
              )}

            </div>

            {/* Footer Actions */}
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-white dark:bg-slate-900">
              <button onClick={() => setIsSignatureModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">Cancel</button>
              <button 
                onClick={() => {
                  if (signatureMode === "draw") saveDrawSignature();
                  else if (signatureMode === "type") saveTypeSignature();
                }}
                disabled={signatureMode === "upload"} // Upload saves immediately via onChange
                className="px-6 py-2.5 rounded-xl font-bold bg-[#518231] hover:bg-[#436b28] text-white transition-colors disabled:opacity-50 disabled:hidden flex items-center gap-2"
              >
                <Save size={18} /> Save & Use
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
