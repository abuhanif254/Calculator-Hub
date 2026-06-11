"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Camera, Upload, Download, Trash2, RefreshCw, 
  Settings, Image as ImageIcon, Plus, X, Maximize,
  ArrowRight, GripVertical
} from "lucide-react";
import { PDFDocument, PageSizes } from "pdf-lib";

type FilterType = "original" | "grayscale" | "bw";
type PageSizeOption = "A4" | "Letter" | "Fit";

interface ScannedPage {
  id: string;
  originalDataUrl: string;
  processedDataUrl: string;
  filter: FilterType;
  rotation: number;
}

export function ScanToPdfTool() {
  // State
  const [pages, setPages] = useState<ScannedPage[]>([]);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  // Settings
  const [pageSize, setPageSize] = useState<PageSizeOption>("A4");
  const [globalFilter, setGlobalFilter] = useState<FilterType>("bw");
  
  // Progress & Export
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Drag and Drop State
  const [draggedPageId, setDraggedPageId] = useState<string | null>(null);

  // --- Camera Management ---
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } } 
      });
      setStream(mediaStream);
      setIsCameraMode(true);
    } catch (e: any) {
      console.error("Camera access failed", e);
      alert("Unable to access camera. Please check permissions or use the Upload option.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
    setIsCameraMode(false);
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, isCameraMode]);

  useEffect(() => {
    return () => stopCamera(); // Cleanup on unmount
  }, []);

  // --- Image Capture & Processing ---
  const captureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    addPage(dataUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          addPage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addPage = async (dataUrl: string) => {
    const id = Math.random().toString(36).substring(7);
    const processed = await processImage(dataUrl, globalFilter, 0);
    
    setPages(prev => [...prev, {
      id,
      originalDataUrl: dataUrl,
      processedDataUrl: processed,
      filter: globalFilter,
      rotation: 0
    }]);
    setPdfBlob(null); // invalidate previous pdf
  };

  const processImage = (dataUrl: string, filter: FilterType, rotation: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(dataUrl);

        // Handle rotation sizing
        if (rotation === 90 || rotation === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        // Apply rotation
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        // Apply filters
        if (filter !== "original") {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          for (let i = 0; i < data.length; i += 4) {
            // Luminance formula
            const gray = data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114;
            
            if (filter === "grayscale") {
              data[i] = data[i+1] = data[i+2] = gray;
            } else if (filter === "bw") {
              // High contrast B&W Document mode
              // Push mid-tones to extremes to simulate photocopying
              const threshold = 140; 
              const value = gray > threshold ? 255 : (gray * 0.7); // Darken darks, clip lights
              data[i] = data[i+1] = data[i+2] = value;
            }
          }
          ctx.putImageData(imgData, 0, 0);
        }

        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = dataUrl;
    });
  };

  const updatePage = async (id: string, updates: Partial<ScannedPage>) => {
    setPages(prev => {
      const target = prev.find(p => p.id === id);
      if (!target) return prev;
      return prev.map(p => p.id === id ? { ...p, ...updates } : p);
    });

    // Re-process image
    const target = pages.find(p => p.id === id);
    if (!target) return;
    
    const nextFilter = updates.filter !== undefined ? updates.filter : target.filter;
    const nextRotation = updates.rotation !== undefined ? updates.rotation : target.rotation;
    
    const processed = await processImage(target.originalDataUrl, nextFilter, nextRotation);
    setPages(prev => prev.map(p => p.id === id ? { ...p, processedDataUrl: processed } : p));
    setPdfBlob(null);
  };

  const removePage = (id: string) => {
    setPages(prev => prev.filter(p => p.id !== id));
    setPdfBlob(null);
  };

  // --- HTML5 Drag and Drop Reordering ---
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedPageId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (!draggedPageId || draggedPageId === id) return;

    setPages(prev => {
      const newPages = [...prev];
      const draggedIndex = newPages.findIndex(p => p.id === draggedPageId);
      const targetIndex = newPages.findIndex(p => p.id === id);
      
      const [draggedItem] = newPages.splice(draggedIndex, 1);
      newPages.splice(targetIndex, 0, draggedItem);
      return newPages;
    });
    setDraggedPageId(null);
    setPdfBlob(null);
  };

  // --- PDF Generation ---
  const generatePdf = async () => {
    if (pages.length === 0) return;
    setIsGenerating(true);
    
    try {
      const pdfDoc = await PDFDocument.create();

      for (const page of pages) {
        // Fetch raw bytes of dataURL
        const imgBytes = await fetch(page.processedDataUrl).then(res => res.arrayBuffer());
        let embeddedImage;
        try {
          embeddedImage = await pdfDoc.embedJpg(imgBytes);
        } catch {
          embeddedImage = await pdfDoc.embedPng(imgBytes);
        }

        const imgDims = embeddedImage.scale(1);
        let pdfPage;
        
        if (pageSize === "Fit") {
          pdfPage = pdfDoc.addPage([imgDims.width, imgDims.height]);
          pdfPage.drawImage(embeddedImage, {
            x: 0, y: 0, width: imgDims.width, height: imgDims.height
          });
        } else {
          // Standard size (A4 / Letter)
          const stdSize = pageSize === "A4" ? PageSizes.A4 : PageSizes.Letter;
          pdfPage = pdfDoc.addPage(stdSize);
          
          // Calculate scale to fit within page with margins
          const margin = 20;
          const maxWidth = stdSize[0] - (margin * 2);
          const maxHeight = stdSize[1] - (margin * 2);
          
          const scale = Math.min(maxWidth / imgDims.width, maxHeight / imgDims.height);
          const drawWidth = imgDims.width * scale;
          const drawHeight = imgDims.height * scale;
          
          pdfPage.drawImage(embeddedImage, {
            x: (stdSize[0] - drawWidth) / 2,
            y: (stdSize[1] - drawHeight) / 2,
            width: drawWidth,
            height: drawHeight
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      setPdfBlob(blob);

    } catch (e) {
      console.error("PDF generation failed", e);
      alert("Failed to generate PDF. Images may be too large or corrupted.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPdf = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Scanned_Document_${new Date().getTime()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Intro / Privacy Banner */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Camera className="text-emerald-500" />
            Scanner Engine
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Transform your device into a professional document scanner. Capture, enhance, and compile PDFs securely inside your browser. Your images are <strong>never uploaded</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Capture & Dashboard */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Capture Area */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 overflow-hidden shadow-sm relative">
            
            {isCameraMode ? (
              <div className="relative bg-black rounded-2xl overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                  <button onClick={stopCamera} className="w-14 h-14 bg-slate-800/80 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-slate-700">
                    <X size={24} />
                  </button>
                  <button onClick={captureFrame} className="w-20 h-20 bg-white border-4 border-slate-300 text-slate-800 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-xl">
                    <Camera size={32} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full min-h-[300px] flex flex-col items-center justify-center gap-6 py-10">
                <div className="flex gap-4">
                  <button 
                    onClick={startCamera}
                    className="flex flex-col items-center gap-3 p-6 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors w-40"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Camera size={28} />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">Start Camera</span>
                  </button>
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-3 p-6 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors w-40"
                  >
                    <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Upload size={28} />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">Upload Images</span>
                  </button>
                  <input 
                    type="file" multiple accept="image/*" className="hidden" ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                </div>
                <p className="text-sm text-slate-500 text-center px-4 max-w-sm">
                  Use your webcam/smartphone camera, or upload JPEGs and PNGs from your device.
                </p>
              </div>
            )}
          </div>

          {/* Page Organization (Thumbnails) */}
          {pages.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <ImageIcon size={20} className="text-emerald-500"/> Scanned Pages ({pages.length})
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {pages.map((page, index) => (
                  <div 
                    key={page.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, page.id)}
                    onDragOver={(e) => handleDragOver(e, page.id)}
                    onDrop={(e) => handleDrop(e, page.id)}
                    className="relative group rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-move hover:border-emerald-500 transition-colors"
                  >
                    <div className="aspect-[3/4] relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={page.processedDataUrl} 
                        alt={`Scanned page ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Page Number Badge */}
                      <div className="absolute top-2 left-2 w-6 h-6 bg-slate-900/80 text-white text-xs font-bold rounded flex items-center justify-center">
                        {index + 1}
                      </div>

                      {/* Controls Overlay */}
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <div className="flex justify-end">
                          <button onClick={() => removePage(page.id)} className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center bg-slate-900/90 rounded-lg p-1.5 gap-1">
                          <button 
                            onClick={() => updatePage(page.id, { rotation: (page.rotation + 90) % 360 })}
                            className="p-1.5 text-white hover:bg-slate-700 rounded flex-1 flex justify-center"
                            title="Rotate"
                          >
                            <RefreshCw size={16} />
                          </button>
                          <div className="h-4 w-px bg-slate-600"></div>
                          <button 
                            onClick={() => {
                              const filters: FilterType[] = ["original", "grayscale", "bw"];
                              const next = filters[(filters.indexOf(page.filter) + 1) % filters.length];
                              updatePage(page.id, { filter: next });
                            }}
                            className="p-1.5 text-white hover:bg-slate-700 rounded flex-1 flex flex-col items-center justify-center gap-1"
                            title="Filter"
                          >
                            <span className="text-[10px] font-bold uppercase leading-none">{page.filter === 'bw' ? 'B&W' : page.filter === 'original' ? 'Orig' : 'Gray'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add Page Button */}
                {!isCameraMode && (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-[3/4] rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-colors"
                  >
                    <Plus size={32} />
                    <span className="text-sm font-semibold">Add Page</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Settings & Export */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col gap-6 sticky top-6">
            
            <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
              <Settings size={20} className="text-indigo-500" /> Output Settings
            </h3>

            {/* Global Filters */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Global Enhancement Filter</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
                {(['original', 'grayscale', 'bw'] as FilterType[]).map(f => (
                  <button
                    key={f}
                    onClick={() => {
                      setGlobalFilter(f);
                      pages.forEach(p => updatePage(p.id, { filter: f }));
                    }}
                    className={`py-2 text-xs font-bold rounded-lg capitalize transition-colors ${globalFilter === f ? 'bg-white dark:bg-slate-900 shadow text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                  >
                    {f === 'bw' ? 'B&W Doc' : f}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-1">B&W Doc maximizes text contrast and removes shadows.</p>
            </div>

            {/* Page Size */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">PDF Page Size</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
                {(['A4', 'Letter', 'Fit'] as PageSizeOption[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setPageSize(s)}
                    className={`py-2 text-xs font-bold rounded-lg transition-colors ${pageSize === s ? 'bg-white dark:bg-slate-900 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-slate-200 dark:bg-slate-800"></div>

            {/* Generate Button */}
            <button
              onClick={generatePdf}
              disabled={pages.length === 0 || isGenerating}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? "Compiling PDF..." : `Generate PDF (${pages.length} Pages)`}
              {!isGenerating && <ArrowRight size={18} />}
            </button>

            {/* Download Button */}
            {pdfBlob && (
              <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-200 dark:border-emerald-900/30 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-400">
                  <span className="font-bold text-sm">Ready to Download</span>
                  <span className="text-xs font-semibold bg-emerald-200 dark:bg-emerald-800 px-2 py-1 rounded">
                    {(pdfBlob.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button
                  onClick={downloadPdf}
                  className="w-full py-3 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Download Scanned PDF <Download size={16} />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
