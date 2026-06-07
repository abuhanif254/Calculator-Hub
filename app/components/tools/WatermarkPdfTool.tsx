"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download, 
  RefreshCw, History, Check, ZoomIn, ZoomOut, Sliders, Info, ShieldCheck, 
  Plus, Layers, Eye, EyeOff, X, File, CheckSquare, Square, ChevronDown, 
  ChevronRight, AlignLeft, AlignCenter, AlignRight, RotateCw, Play, ArrowRight,
  Sparkles
} from "lucide-react";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
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

interface UploadedPdf {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number | null;
  status: "loading" | "ready" | "error";
  errorMessage?: string;
  pdfjsDoc: any; // PDFJS Document object
  selectedPages: boolean[]; // true = selected for watermarking (if targetMode === "selected")
  rangeString: string;
  metadata: PdfMetadata | null;
  pageDetails: { width: number; height: number }[];
}

interface WatermarkLayer {
  id: string;
  type: "text" | "image";
  text: string;
  fontFamily: "Helvetica" | "Times" | "Courier";
  fontSize: number;
  fontWeight: "normal" | "bold";
  fontStyle: "normal" | "italic";
  color: string; // hex
  opacity: number; // 0.1 to 1.0
  rotation: number; // -180 to 180
  letterSpacing: number;
  lineHeight: number;
  imageFile: File | null;
  imagePreviewUrl: string | null;
  imageWidth: number;
  imageHeight: number;
  scale: number; // scale factor
  position: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center" | "custom";
  offsetX: number; // points
  offsetY: number; // points
  customXPercent: number; // 0 to 100
  customYPercent: number; // 0 to 100
  visible: boolean;
}

interface WatermarkHistoryItem {
  id: string;
  timestamp: number;
  inputFiles: { name: string; size: number; pageCount: number }[];
  layersCount: number;
  targetMode: string;
  totalSize: number;
}

const WATERMARK_PRESETS = [
  { name: "Confidential", text: "CONFIDENTIAL", color: "#EF4444", rotation: -45, opacity: 0.2, fontSize: 60, position: "center" as const },
  { name: "Draft", text: "DRAFT", color: "#6B7280", rotation: -45, opacity: 0.2, fontSize: 72, position: "center" as const },
  { name: "Sample", text: "SAMPLE", color: "#3B82F6", rotation: -45, opacity: 0.2, fontSize: 72, position: "center" as const },
  { name: "Approved", text: "APPROVED", color: "#10B981", rotation: -45, opacity: 0.2, fontSize: 60, position: "center" as const },
  { name: "Copy", text: "COPY", color: "#8B5CF6", rotation: -45, opacity: 0.2, fontSize: 72, position: "center" as const },
  { name: "Copyright", text: "© Copyright. All Rights Reserved.", color: "#1F2937", rotation: 0, opacity: 0.4, fontSize: 14, position: "bottom-center" as const }
];

export function WatermarkPdfTool() {
  const [pdfjsLoaded, setPdfjsLoaded] = useState<boolean>(false);
  const [files, setFiles] = useState<UploadedPdf[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  // Watermark layers
  const [layers, setLayers] = useState<WatermarkLayer[]>([
    {
      id: "layer-1",
      type: "text",
      text: "CONFIDENTIAL",
      fontFamily: "Helvetica",
      fontSize: 50,
      fontWeight: "bold",
      fontStyle: "normal",
      color: "#ef4444",
      opacity: 0.2,
      rotation: -45,
      letterSpacing: 2,
      lineHeight: 1.2,
      imageFile: null,
      imagePreviewUrl: null,
      imageWidth: 0,
      imageHeight: 0,
      scale: 1.0,
      position: "center",
      offsetX: 0,
      offsetY: 0,
      customXPercent: 50,
      customYPercent: 50,
      visible: true
    }
  ]);
  const [activeLayerId, setActiveLayerId] = useState<string>("layer-1");

  // Page targeting config
  const [targetMode, setTargetMode] = useState<"all" | "first" | "last" | "odd" | "even" | "range" | "selected">("all");
  const [customRangeString, setCustomRangeString] = useState<string>("");

  // Output settings
  const [outputNamePattern, setOutputNamePattern] = useState<string>("{filename}_watermarked");
  const [preserveMetadata, setPreserveMetadata] = useState<boolean>(true);

  // UI state
  const [previewPageNum, setPreviewPageNum] = useState<number>(1);
  const [previewZoom, setPreviewZoom] = useState<number>(100); // percentage
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "history">("editor");
  const [historyList, setHistoryList] = useState<WatermarkHistoryItem[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Preview elements references
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active file details
  const activeFile = files.find(f => f.id === activeFileId) || null;
  const activeLayer = layers.find(l => l.id === activeLayerId) || null;

  // Load history from local storage
  useEffect(() => {
    const saved = localStorage.getItem("watermark_pdf_history");
    if (saved) {
      try {
        setHistoryList(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local history for watermark pdf", e);
      }
    }
  }, []);

  // Safe CDN loader for PDF.js
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
          reject(new Error("PDF.js object not found on window"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js script from CDN"));
      document.head.appendChild(script);
    });
  }, []);

  // Process uploaded PDF files
  const processFiles = async (uploadedFiles: FileList | File[]) => {
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
        rangeString: "",
        metadata: null,
        pageDetails: []
      });
    }

    if (list.length === 0) return;

    setFiles(prev => [...prev, ...list]);
    if (!activeFileId) {
      setActiveFileId(list[0].id);
      setPreviewPageNum(1);
    }

    let pdfjs: any = null;
    try {
      pdfjs = await loadPdfJs();
      setPdfjsLoaded(true);
    } catch (e) {
      console.error(e);
      setErrorMessage("Could not load PDF.js renderer library. Please check your connection.");
      return;
    }

    for (const item of list) {
      try {
        const buffer = await item.file.arrayBuffer();

        // 1) Read details using pdf-lib
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

        const pageDetails: { width: number; height: number }[] = [];
        for (let pageIdx = 0; pageIdx < count; pageIdx++) {
          const page = pdfLibDoc.getPage(pageIdx);
          const { width, height } = page.getSize();
          pageDetails.push({ width, height });
        }

        // 2) Parse pages into PDFJS Document
        const pdfjsDoc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;

        setFiles(prev => prev.map(f => {
          if (f.id === item.id) {
            return {
              ...f,
              pageCount: count,
              status: "ready",
              pdfjsDoc,
              selectedPages: new Array(count).fill(true),
              metadata: meta,
              pageDetails
            };
          }
          return f;
        }));
      } catch (err: any) {
        console.warn("Failed to parse file", item.name, err.message || err);
        let msg = "Could not parse PDF. File might be corrupted.";
        if (err.message && err.message.includes("encrypted")) {
          msg = "Document is password protected. Please decrypt first.";
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

  // Live render single page onto main preview canvas
  const renderPreviewPage = useCallback(async () => {
    if (!previewCanvasRef.current || !activeFile || !activeFile.pdfjsDoc || activeFile.status !== "ready") return;

    try {
      const page = await activeFile.pdfjsDoc.getPage(previewPageNum);
      const canvas = previewCanvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      // Base viewport scaled for zoom percent
      const baseZoomFactor = 1.0;
      const scale = (previewZoom / 100) * baseZoomFactor;
      const viewport = page.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (e) {
      console.error("Failed to render preview page:", e);
    }
  }, [activeFile, previewPageNum, previewZoom]);

  // Hook to trigger preview rendering when state changes
  useEffect(() => {
    renderPreviewPage();
  }, [renderPreviewPage, activeFileId, previewPageNum, previewZoom]);

  // Handle Drag & Drop
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
        setPreviewPageNum(1);
      }
      return next;
    });
  };

  const clearAllFiles = () => {
    setFiles([]);
    setActiveFileId(null);
    setPreviewPageNum(1);
  };

  // Layers Manager
  const addTextLayer = () => {
    const id = `layer-${Date.now()}`;
    const newLayer: WatermarkLayer = {
      id,
      type: "text",
      text: "CONFIDENTIAL",
      fontFamily: "Helvetica",
      fontSize: 40,
      fontWeight: "bold",
      fontStyle: "normal",
      color: "#ef4444",
      opacity: 0.2,
      rotation: -45,
      letterSpacing: 2,
      lineHeight: 1.2,
      imageFile: null,
      imagePreviewUrl: null,
      imageWidth: 0,
      imageHeight: 0,
      scale: 1.0,
      position: "center",
      offsetX: 0,
      offsetY: 0,
      customXPercent: 50,
      customYPercent: 50,
      visible: true
    };
    setLayers(prev => [...prev, newLayer]);
    setActiveLayerId(id);
  };

  const addImageLayer = () => {
    const id = `layer-${Date.now()}`;
    const newLayer: WatermarkLayer = {
      id,
      type: "image",
      text: "",
      fontFamily: "Helvetica",
      fontSize: 16,
      fontWeight: "normal",
      fontStyle: "normal",
      color: "#000000",
      opacity: 0.5,
      rotation: 0,
      letterSpacing: 0,
      lineHeight: 1.0,
      imageFile: null,
      imagePreviewUrl: null,
      imageWidth: 0,
      imageHeight: 0,
      scale: 0.5,
      position: "center",
      offsetX: 0,
      offsetY: 0,
      customXPercent: 50,
      customYPercent: 50,
      visible: true
    };
    setLayers(prev => [...prev, newLayer]);
    setActiveLayerId(id);
  };

  const updateLayer = (id: string, updates: Partial<WatermarkLayer>) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const removeLayer = (id: string) => {
    if (layers.length <= 1) {
      alert("At least one watermark layer is required.");
      return;
    }
    setLayers(prev => {
      const next = prev.filter(l => l.id !== id);
      if (activeLayerId === id) {
        setActiveLayerId(next[0].id);
      }
      return next;
    });
  };

  const applyPreset = (preset: typeof WATERMARK_PRESETS[0]) => {
    if (!activeLayer || activeLayer.type !== "text") return;
    updateLayer(activeLayerId, {
      text: preset.text,
      color: preset.color,
      rotation: preset.rotation,
      opacity: preset.opacity,
      fontSize: preset.fontSize,
      position: preset.position,
      offsetX: 0,
      offsetY: 0
    });
  };

  // Image uploader with offscreen canvas fallback for non-native formats (SVG, WebP)
  const handleImageUpload = (layerId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      updateLayer(layerId, {
        imageFile: file,
        imagePreviewUrl: previewUrl,
        imageWidth: img.naturalWidth || 200,
        imageHeight: img.naturalHeight || 200
      });
    };
    img.src = previewUrl;
  };

  // Convert non-native SVG/WebP uploader images to PNG bytes client-side
  const convertToPngBytes = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || 800;
          canvas.height = img.naturalHeight || 600;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not construct 2D context"));
            return;
          }
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error("Canvas toBlob extraction failed"));
              return;
            }
            const blobReader = new FileReader();
            blobReader.onload = () => {
              if (blobReader.result instanceof ArrayBuffer) {
                resolve(new Uint8Array(blobReader.result));
              } else {
                reject(new Error("ArrayBuffer extraction failed"));
              }
            };
            blobReader.onerror = () => reject(blobReader.error);
            blobReader.readAsArrayBuffer(blob);
          }, "image/png");
        };
        img.onerror = () => reject(new Error("Failed to load image for canvas parsing"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  // Generate CSS style for overlays on live preview
  const getPreviewLayerStyle = (layer: WatermarkLayer) => {
    if (!activeFile || activeFile.pageDetails.length === 0) return {};
    const pageDetail = activeFile.pageDetails[previewPageNum - 1] || activeFile.pageDetails[0];
    if (!pageDetail) return {};

    const canvas = previewCanvasRef.current;
    if (!canvas) return {};

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const pageWidth = pageDetail.width;
    const pageHeight = pageDetail.height;

    const scaleRatio = canvasWidth / pageWidth;

    const style: React.CSSProperties = {
      position: "absolute",
      opacity: layer.opacity,
      transform: `rotate(${layer.rotation}deg)`,
      transformOrigin: "center center",
      visibility: layer.visible ? "visible" : "hidden",
      pointerEvents: "none",
      userSelect: "none"
    };

    if (layer.type === "text") {
      style.fontSize = `${layer.fontSize * scaleRatio}px`;
      style.fontFamily = layer.fontFamily === "Helvetica" ? "sans-serif" : layer.fontFamily === "Times" ? "serif" : "monospace";
      style.fontWeight = layer.fontWeight;
      style.fontStyle = layer.fontStyle;
      style.color = layer.color;
      style.letterSpacing = `${layer.letterSpacing * scaleRatio}px`;
      style.lineHeight = layer.lineHeight;
      style.whiteSpace = "pre-line";
    }

    let cssWidth = 0;
    let cssHeight = 0;

    if (layer.type === "image") {
      cssWidth = layer.imageWidth * scaleRatio * layer.scale;
      cssHeight = layer.imageHeight * scaleRatio * layer.scale;
    } else {
      // Approximate text watermark bounding box sizes
      const lines = layer.text.split("\n");
      const maxLineLength = Math.max(...lines.map(l => l.length));
      cssWidth = maxLineLength * layer.fontSize * scaleRatio * 0.55;
      cssHeight = lines.length * layer.fontSize * scaleRatio * layer.lineHeight;
    }

    let left = 0;
    let top = 0;
    const margin = 20 * scaleRatio;

    switch (layer.position) {
      case "center":
        left = (canvasWidth - cssWidth) / 2;
        top = (canvasHeight - cssHeight) / 2;
        break;
      case "top-left":
        left = margin;
        top = margin;
        break;
      case "top-right":
        left = canvasWidth - cssWidth - margin;
        top = margin;
        break;
      case "bottom-left":
        left = margin;
        top = canvasHeight - cssHeight - margin;
        break;
      case "bottom-right":
        left = canvasWidth - cssWidth - margin;
        top = canvasHeight - cssHeight - margin;
        break;
      case "top-center":
        left = (canvasWidth - cssWidth) / 2;
        top = margin;
        break;
      case "bottom-center":
        left = (canvasWidth - cssWidth) / 2;
        top = canvasHeight - cssHeight - margin;
        break;
      case "custom":
        left = (canvasWidth - cssWidth) * (layer.customXPercent / 100);
        top = (canvasHeight - cssHeight) * (1 - layer.customYPercent / 100);
        break;
    }

    // Offset X and Y (note: Y goes up in PDF coordinates, which translates to negative top offset in CSS)
    left += (layer.offsetX * scaleRatio);
    top -= (layer.offsetY * scaleRatio);

    style.left = `${left}px`;
    style.top = `${top}px`;

    if (layer.type === "image") {
      style.width = `${cssWidth}px`;
      style.height = `${cssHeight}px`;
    }

    return style;
  };

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

  // Compute targeted pages for watermarking based on selection mode
  const getTargetPagesIndices = (pdf: UploadedPdf): number[] => {
    if (!pdf.pageCount) return [];
    const max = pdf.pageCount;
    const indices: number[] = [];

    switch (targetMode) {
      case "all":
        return Array.from({ length: max }, (_, i) => i);
      case "first":
        return [0];
      case "last":
        return [max - 1];
      case "odd":
        return Array.from({ length: max }, (_, i) => i).filter(idx => (idx + 1) % 2 !== 0);
      case "even":
        return Array.from({ length: max }, (_, i) => i).filter(idx => (idx + 1) % 2 === 0);
      case "range":
        return parseRangeStr(customRangeString, max);
      case "selected":
        pdf.selectedPages.forEach((selected, idx) => {
          if (selected) indices.push(idx);
        });
        return indices;
      default:
        return [];
    }
  };

  const getPdfLibFont = (fontFamily: string, isBold: boolean, isItalic: boolean) => {
    if (fontFamily === "Helvetica") {
      if (isBold && isItalic) return StandardFonts.HelveticaBoldOblique;
      if (isBold) return StandardFonts.HelveticaBold;
      if (isItalic) return StandardFonts.HelveticaOblique;
      return StandardFonts.Helvetica;
    } else if (fontFamily === "Times") {
      if (isBold && isItalic) return StandardFonts.TimesRomanBoldItalic;
      if (isBold) return StandardFonts.TimesRomanBold;
      if (isItalic) return StandardFonts.TimesRomanItalic;
      return StandardFonts.TimesRoman;
    } else { // Courier
      if (isBold && isItalic) return StandardFonts.CourierBoldOblique;
      if (isBold) return StandardFonts.CourierBold;
      if (isItalic) return StandardFonts.CourierOblique;
      return StandardFonts.Courier;
    }
  };

  // Compile Watermarks into new PDF binary locally
  const compileWatermarkedPdfs = async () => {
    const readyFiles = files.filter(f => f.status === "ready");
    if (readyFiles.length === 0) return;

    // Validate uploader images are selected for image layers
    const visibleImageLayers = layers.filter(l => l.visible && l.type === "image");
    for (const layer of visibleImageLayers) {
      if (!layer.imageFile) {
        setErrorMessage("Please upload an image logo or stamp for all active image layers.");
        return;
      }
    }

    setIsProcessing(true);
    setProcessingProgress(5);
    setProcessingStep("Reading documents and parsing dictionaries...");
    setErrorMessage(null);

    try {
      const processedFiles: { name: string; bytes: Uint8Array }[] = [];

      for (let i = 0; i < readyFiles.length; i++) {
        const pdf = readyFiles[i];
        setProcessingStep(`Watermarking "${pdf.name}"...`);
        setProcessingProgress(Math.floor(10 + (i / readyFiles.length) * 75));
        await new Promise(r => setTimeout(r, 10));

        const buffer = await pdf.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const targetPageIndices = getTargetPagesIndices(pdf);

        if (targetPageIndices.length === 0) {
          throw new Error(`No pages selected for watermarking in "${pdf.name}". Check targeting settings.`);
        }

        // Apply layers watermark on PDF
        for (const layer of layers) {
          if (!layer.visible) continue;

          // 1) Embed resources if required
          let embeddedFont: any = null;
          let embeddedImage: any = null;

          if (layer.type === "text") {
            const fontName = getPdfLibFont(layer.fontFamily, layer.fontWeight === "bold", layer.fontStyle === "italic");
            embeddedFont = await pdfDoc.embedStandardFont(fontName);
          } else if (layer.type === "image" && layer.imageFile) {
            const ext = layer.imageFile.name.toLowerCase().split('.').pop();
            let imgBytes: Uint8Array;
            
            // SVG / WebP fallback conversion using HTML5 canvas
            if (ext === "svg" || ext === "webp") {
              imgBytes = await convertToPngBytes(layer.imageFile);
              embeddedImage = await pdfDoc.embedPng(imgBytes);
            } else if (ext === "png") {
              const arrayBuffer = await layer.imageFile.arrayBuffer();
              embeddedImage = await pdfDoc.embedPng(new Uint8Array(arrayBuffer));
            } else { // jpg, jpeg
              const arrayBuffer = await layer.imageFile.arrayBuffer();
              embeddedImage = await pdfDoc.embedJpg(new Uint8Array(arrayBuffer));
            }
          }

          // 2) Apply layer to target page layouts
          for (const pageIdx of targetPageIndices) {
            const page = pdfDoc.getPage(pageIdx);
            const { width: pageWidth, height: pageHeight } = page.getSize();

            let watermarkWidth = 0;
            let watermarkHeight = 0;

            if (layer.type === "image" && embeddedImage) {
              watermarkWidth = layer.imageWidth * layer.scale;
              watermarkHeight = layer.imageHeight * layer.scale;
            } else if (layer.type === "text" && embeddedFont) {
              const lines = layer.text.split("\n");
              const lineWidths = lines.map(line => embeddedFont.widthOfTextAtSize(line, layer.fontSize));
              watermarkWidth = Math.max(...lineWidths);
              watermarkHeight = lines.length * layer.fontSize * layer.lineHeight;
            }

            // Calculate anchor positions
            let baseX = 0;
            let baseY = 0;
            const margin = 20;

            switch (layer.position) {
              case "center":
                baseX = (pageWidth - watermarkWidth) / 2;
                baseY = (pageHeight - watermarkHeight) / 2;
                break;
              case "top-left":
                baseX = margin;
                baseY = pageHeight - watermarkHeight - margin;
                break;
              case "top-right":
                baseX = pageWidth - watermarkWidth - margin;
                baseY = pageHeight - watermarkHeight - margin;
                break;
              case "bottom-left":
                baseX = margin;
                baseY = margin;
                break;
              case "bottom-right":
                baseX = pageWidth - watermarkWidth - margin;
                baseY = margin;
                break;
              case "top-center":
                baseX = (pageWidth - watermarkWidth) / 2;
                baseY = pageHeight - watermarkHeight - margin;
                break;
              case "bottom-center":
                baseX = (pageWidth - watermarkWidth) / 2;
                baseY = margin;
                break;
              case "custom":
                baseX = (pageWidth - watermarkWidth) * (layer.customXPercent / 100);
                baseY = (pageHeight - watermarkHeight) * (layer.customYPercent / 100);
                break;
            }

            // Offset shifts
            const finalX = baseX + layer.offsetX;
            const finalY = baseY + layer.offsetY;

            // Draw content
            if (layer.type === "image" && embeddedImage) {
              page.drawImage(embeddedImage, {
                x: finalX,
                y: finalY,
                width: watermarkWidth,
                height: watermarkHeight,
                rotate: degrees(layer.rotation),
                opacity: layer.opacity
              });
            } else if (layer.type === "text" && embeddedFont) {
              const lines = layer.text.split("\n");
              const r = parseInt(layer.color.slice(1, 3), 16) || 0;
              const g = parseInt(layer.color.slice(3, 5), 16) || 0;
              const b = parseInt(layer.color.slice(5, 7), 16) || 0;

              lines.forEach((line, lineIdx) => {
                const lineY = finalY - (lineIdx * layer.fontSize * layer.lineHeight);
                page.drawText(line, {
                  x: finalX,
                  y: lineY,
                  size: layer.fontSize,
                  font: embeddedFont,
                  color: rgb(r / 255, g / 255, b / 255),
                  rotate: degrees(layer.rotation),
                  opacity: layer.opacity
                });
              });
            }
          }
        }

        // Preserve metadata
        if (preserveMetadata && pdf.metadata) {
          if (pdf.metadata.title) pdfDoc.setTitle(pdf.metadata.title);
          if (pdf.metadata.author) pdfDoc.setAuthor(pdf.metadata.author);
          if (pdf.metadata.creator) pdfDoc.setCreator(pdf.metadata.creator);
          if (pdf.metadata.subject) pdfDoc.setSubject(pdf.metadata.subject);
          if (pdf.metadata.producer) pdfDoc.setProducer(pdf.metadata.producer);
        }

        const compiledBytes = await pdfDoc.save({
          useObjectStreams: true,
          addDefaultPage: false
        });

        let outName = outputNamePattern
          .replace("{filename}", pdf.name.replace(/\.[^/.]+$/, ""))
          .replace("{date}", new Date().toISOString().split('T')[0]);
        if (!outName.endsWith(".pdf")) outName += ".pdf";

        processedFiles.push({ name: outName, bytes: compiledBytes });
      }

      setProcessingStep("Packaging files...");
      setProcessingProgress(90);
      await new Promise(r => setTimeout(r, 10));

      let totalSize = 0;
      if (processedFiles.length === 1) {
        const item = processedFiles[0];
        const blob = new Blob([item.bytes as any], { type: "application/pdf" });
        totalSize = blob.size;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = item.name;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        const zip = new JSZip();
        processedFiles.forEach(f => {
          zip.file(f.name, f.bytes);
        });
        const zipBlob = await zip.generateAsync({ type: "blob" });
        totalSize = zipBlob.size;
        const url = URL.createObjectURL(zipBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "watermarked_pdfs.zip";
        link.click();
        URL.revokeObjectURL(url);
      }

      // Add to history
      const historyItem: WatermarkHistoryItem = {
        id: `wtm-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: Date.now(),
        inputFiles: readyFiles.map(rf => ({ name: rf.name, size: rf.size, pageCount: rf.pageCount || 0 })),
        layersCount: layers.length,
        targetMode: targetMode === "all" ? "All Pages" :
                    targetMode === "first" ? "First Page Only" :
                    targetMode === "last" ? "Last Page Only" :
                    targetMode === "odd" ? "Odd Pages" :
                    targetMode === "even" ? "Even Pages" :
                    targetMode === "range" ? `Range: ${customRangeString}` : "Selected Pages",
        totalSize
      };

      setHistoryList(prev => {
        const next = [historyItem, ...prev].slice(0, 50);
        localStorage.setItem("watermark_pdf_history", JSON.stringify(next));
        return next;
      });

      setProcessingProgress(100);
      setIsProcessing(false);
    } catch (e: any) {
      console.error("Compilation error", e);
      setErrorMessage(e.message || "An error occurred during watermarking compilation.");
      setIsProcessing(false);
    }
  };

  const togglePageSelection = (fileId: string, idx: number) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId) {
        const nextSelected = [...f.selectedPages];
        nextSelected[idx] = !nextSelected[idx];
        return { ...f, selectedPages: nextSelected };
      }
      return f;
    }));
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab("editor")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all outline-none ${
            activeTab === "editor"
              ? "border-[#518231] text-[#518231]"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Sliders size={16} />
          Watermark Editor
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all outline-none ${
            activeTab === "history"
              ? "border-[#518231] text-[#518231]"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <History size={16} />
          Recent Operations
          {historyList.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
              {historyList.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === "history" ? (
        // HISTORY PANEL
        <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History size={18} className="text-[#518231]" />
              Operation History (Local Device Only)
            </h3>
            {historyList.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Clear history?")) {
                    setHistoryList([]);
                    localStorage.removeItem("watermark_pdf_history");
                  }
                }}
                className="text-xs text-red-500 hover:underline font-bold"
              >
                Clear History
              </button>
            )}
          </div>

          {historyList.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-10">No recent operations found.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[480px] overflow-y-auto custom-scrollbar pr-2">
              {historyList.map(item => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-md">
                      {item.inputFiles.map(f => f.name).join(", ")}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span>Layers: <strong>{item.layersCount}</strong></span>
                      <span>Targeting: <strong>{item.targetMode}</strong></span>
                      <span>Size: <strong>{formatBytes(item.totalSize)}</strong></span>
                      <span>Date: <strong>{new Date(item.timestamp).toLocaleString()}</strong></span>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 font-bold">
                    <Check size={14} /> Completed
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // EDITOR PANEL
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Dashboard Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Uploader Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <FileText size={16} className="text-[#518231]" />
                1. Upload PDF Documents
              </h3>

              {files.length === 0 ? (
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    dragActive 
                      ? "border-[#518231] bg-green-50/10 dark:bg-green-950/5" 
                      : "border-slate-300 dark:border-slate-700 hover:border-[#518231] dark:hover:border-[#518231] bg-slate-50/50 dark:bg-slate-950/10"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#518231]/10 flex items-center justify-center text-[#518231]">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Drag & Drop PDFs here, or click to browse
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Max file size: 150MB. Files never leave your browser.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="max-h-[220px] overflow-y-auto custom-scrollbar pr-1 space-y-2">
                    {files.map(pdf => (
                      <div 
                        key={pdf.id}
                        onClick={() => {
                          if (pdf.status === "ready") {
                            setActiveFileId(pdf.id);
                            setPreviewPageNum(1);
                          }
                        }}
                        className={`flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          pdf.id === activeFileId
                            ? "border-[#518231] bg-green-50/10 dark:bg-green-950/5"
                            : "border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 shrink-0">
                            <File size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                              {pdf.name}
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                              {formatBytes(pdf.size)} • {pdf.status === "ready" ? `${pdf.pageCount} pgs` : pdf.status === "loading" ? "Parsing..." : "Error"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {pdf.status === "loading" && (
                            <Loader2 className="animate-spin text-[#518231]" size={14} />
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(pdf.id);
                            }}
                            className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            aria-label="Remove document"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#518231] hover:underline font-bold"
                    >
                      + Add More Files
                    </button>
                    <button
                      type="button"
                      onClick={clearAllFiles}
                      className="text-red-500 hover:underline font-bold"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Watermark Layers Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers size={16} className="text-[#518231]" />
                  2. Watermark Layers
                </h3>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={addTextLayer}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md font-bold transition-all"
                  >
                    <Plus size={10} /> Text
                  </button>
                  <button
                    onClick={addImageLayer}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md font-bold transition-all"
                  >
                    <Plus size={10} /> Logo
                  </button>
                </div>
              </div>

              {/* Layers List */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                {layers.map((layer, index) => (
                  <div
                    key={layer.id}
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      layer.id === activeLayerId
                        ? "border-[#518231] bg-green-50/10 dark:bg-green-950/5"
                        : "border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 w-4">
                        #{index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[160px]">
                          {layer.type === "text" 
                            ? `Text: "${layer.text || "Empty"}"` 
                            : `Logo: ${layer.imageFile ? layer.imageFile.name : "No image selected"}`
                          }
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold truncate capitalize">
                          {layer.position} • {layer.type} • opacity: {Math.round(layer.opacity * 100)}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => updateLayer(layer.id, { visible: !layer.visible })}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        title={layer.visible ? "Hide layer" : "Show layer"}
                      >
                        {layer.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                      </button>
                      <button
                        onClick={() => removeLayer(layer.id)}
                        className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                        title="Delete layer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Layer Options Card */}
            {activeLayer && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    {activeLayer.type === "text" ? "Text Layer Settings" : "Logo Layer Settings"}
                  </h3>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-bold">
                    Active
                  </span>
                </div>

                {/* TEXT SETTINGS */}
                {activeLayer.type === "text" && (
                  <div className="space-y-4">
                    {/* Text Presets */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Smart Presets
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {WATERMARK_PRESETS.map(p => (
                          <button
                            key={p.name}
                            onClick={() => applyPreset(p)}
                            className="px-2 py-1 text-[10px] bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 rounded font-semibold transition-colors"
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Text */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Watermark Text
                      </label>
                      <textarea
                        rows={2}
                        value={activeLayer.text}
                        onChange={e => updateLayer(activeLayer.id, { text: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] outline-none transition-colors custom-scrollbar"
                        placeholder="Enter watermark text..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Font Family */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Font
                        </label>
                        <select
                          value={activeLayer.fontFamily}
                          onChange={e => updateLayer(activeLayer.id, { fontFamily: e.target.value as any })}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 outline-none"
                        >
                          <option value="Helvetica">Helvetica</option>
                          <option value="Times">Times Roman</option>
                          <option value="Courier">Courier</option>
                        </select>
                      </div>

                      {/* Font Size */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Font Size ({activeLayer.fontSize}pt)
                        </label>
                        <input
                          type="range"
                          min="8"
                          max="120"
                          value={activeLayer.fontSize}
                          onChange={e => updateLayer(activeLayer.id, { fontSize: parseInt(e.target.value, 10) })}
                          className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Font Styling Toggle */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Style
                        </label>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateLayer(activeLayer.id, { fontWeight: activeLayer.fontWeight === "bold" ? "normal" : "bold" })}
                            className={`flex-1 py-1 px-2 text-xs border rounded-md font-bold transition-all ${
                              activeLayer.fontWeight === "bold"
                                ? "bg-[#518231]/10 border-[#518231] text-[#518231]"
                                : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                            }`}
                          >
                            Bold
                          </button>
                          <button
                            type="button"
                            onClick={() => updateLayer(activeLayer.id, { fontStyle: activeLayer.fontStyle === "italic" ? "normal" : "italic" })}
                            className={`flex-1 py-1 px-2 text-xs border rounded-md italic transition-all ${
                              activeLayer.fontStyle === "italic"
                                ? "bg-[#518231]/10 border-[#518231] text-[#518231]"
                                : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                            }`}
                          >
                            Italic
                          </button>
                        </div>
                      </div>

                      {/* Font Color */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Color
                        </label>
                        <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-1 px-2 bg-white dark:bg-slate-950">
                          <input
                            type="color"
                            value={activeLayer.color}
                            onChange={e => updateLayer(activeLayer.id, { color: e.target.value })}
                            className="w-6 h-6 border-0 rounded cursor-pointer shrink-0 bg-transparent"
                          />
                          <input
                            type="text"
                            value={activeLayer.color}
                            onChange={e => updateLayer(activeLayer.id, { color: e.target.value })}
                            className="w-full text-xs bg-transparent border-0 outline-none uppercase font-semibold text-slate-700 dark:text-slate-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Letter Spacing */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Letter Spacing ({activeLayer.letterSpacing}px)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={activeLayer.letterSpacing}
                          onChange={e => updateLayer(activeLayer.id, { letterSpacing: parseInt(e.target.value, 10) })}
                          className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                        />
                      </div>

                      {/* Line Height */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Line Height ({activeLayer.lineHeight})
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="2.5"
                          step="0.1"
                          value={activeLayer.lineHeight}
                          onChange={e => updateLayer(activeLayer.id, { lineHeight: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                        />
                      </div>
                    </div>

                  </div>
                )}

                {/* IMAGE SETTINGS */}
                {activeLayer.type === "image" && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Upload Logo or Stamp (PNG, JPG, SVG, WebP)
                      </label>
                      
                      {!activeLayer.imagePreviewUrl ? (
                        <div
                          onClick={() => document.getElementById(`logo-file-${activeLayer.id}`)?.click()}
                          className="border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-5 text-center cursor-pointer hover:border-[#518231] dark:hover:border-[#518231] bg-slate-50/50 dark:bg-slate-950/10 transition-all"
                        >
                          <input
                            id={`logo-file-${activeLayer.id}`}
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
                            onChange={e => handleImageUpload(activeLayer.id, e)}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center gap-1.5">
                            <Upload className="text-[#518231]" size={18} />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Upload Image
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10">
                          <div className="flex items-center gap-2 min-w-0">
                            <img 
                              src={activeLayer.imagePreviewUrl} 
                              alt="Logo preview" 
                              className="w-10 h-10 object-contain bg-white border border-slate-200/50 dark:border-slate-800 rounded-md shrink-0" 
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[160px]">
                                {activeLayer.imageFile?.name}
                              </p>
                              <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                                {activeLayer.imageWidth} x {activeLayer.imageHeight} px
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => updateLayer(activeLayer.id, { imageFile: null, imagePreviewUrl: null, imageWidth: 0, imageHeight: 0 })}
                            className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0"
                            title="Remove image"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Scale */}
                    {activeLayer.imagePreviewUrl && (
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Logo Scale ({Math.round(activeLayer.scale * 100)}%)
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="2.5"
                          step="0.05"
                          value={activeLayer.scale}
                          onChange={e => updateLayer(activeLayer.id, { scale: parseFloat(e.target.value) })}
                          className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* COMMON PROPERTIES (Opacity, Rotation, Positioning) */}
                <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Opacity */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Opacity ({Math.round(activeLayer.opacity * 100)}%)
                      </label>
                      <input
                        type="range"
                        min="0.05"
                        max="1.0"
                        step="0.05"
                        value={activeLayer.opacity}
                        onChange={e => updateLayer(activeLayer.id, { opacity: parseFloat(e.target.value) })}
                        className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                      />
                    </div>

                    {/* Rotation */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Rotation ({activeLayer.rotation}°)
                      </label>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={activeLayer.rotation}
                        onChange={e => updateLayer(activeLayer.id, { rotation: parseInt(e.target.value, 10) })}
                        className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                      />
                    </div>
                  </div>

                  {/* Positioning Selection */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Position Placement
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { label: "Top Left", val: "top-left" as const },
                        { label: "Top Center", val: "top-center" as const },
                        { label: "Top Right", val: "top-right" as const },
                        { label: "Middle Left", val: "bottom-left" as const }, // visual layout alignment mappings
                        { label: "Center", val: "center" as const },
                        { label: "Middle Right", val: "bottom-right" as const },
                        { label: "Bottom Left", val: "bottom-left" as const },
                        { label: "Bottom Center", val: "bottom-center" as const },
                        { label: "Custom (X/Y)", val: "custom" as const }
                      ].map(p => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => updateLayer(activeLayer.id, { position: p.val })}
                          className={`py-1.5 px-2 text-[10px] font-semibold border rounded-md text-center transition-all ${
                            activeLayer.position === p.val
                              ? "bg-[#518231]/10 border-[#518231] text-[#518231]"
                              : "border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Percentage Sliders */}
                  {activeLayer.position === "custom" && (
                    <div className="space-y-3 p-3 bg-slate-50/50 dark:bg-slate-900/40 rounded-lg border border-slate-100 dark:border-slate-800/80">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                          <span>Horizontal X</span>
                          <span>{activeLayer.customXPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={activeLayer.customXPercent}
                          onChange={e => updateLayer(activeLayer.id, { customXPercent: parseInt(e.target.value, 10) })}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                          <span>Vertical Y</span>
                          <span>{activeLayer.customYPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={activeLayer.customYPercent}
                          onChange={e => updateLayer(activeLayer.id, { customYPercent: parseInt(e.target.value, 10) })}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Precise Point Offsets */}
                  <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50/50 dark:bg-slate-900/40 rounded-lg border border-slate-100 dark:border-slate-800/80 text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                        Offset X (Points)
                      </label>
                      <input
                        type="number"
                        value={activeLayer.offsetX}
                        onChange={e => updateLayer(activeLayer.id, { offsetX: parseInt(e.target.value, 10) || 0 })}
                        className="w-full p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                        Offset Y (Points)
                      </label>
                      <input
                        type="number"
                        value={activeLayer.offsetY}
                        onChange={e => updateLayer(activeLayer.id, { offsetY: parseInt(e.target.value, 10) || 0 })}
                        className="w-full p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Target Pages & Scope Selection */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckSquare size={16} className="text-[#518231]" />
                3. Page Targeting Range
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: "All Pages", val: "all" as const },
                    { label: "First Page Only", val: "first" as const },
                    { label: "Last Page Only", val: "last" as const },
                    { label: "Odd Pages", val: "odd" as const },
                    { label: "Even Pages", val: "even" as const },
                    { label: "Custom Range", val: "range" as const },
                    { label: "Select Manually", val: "selected" as const }
                  ].map(t => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setTargetMode(t.val)}
                      className={`py-2 px-2.5 text-xs font-bold border rounded-lg text-center transition-all ${
                        targetMode === t.val
                          ? "bg-[#518231]/10 border-[#518231] text-[#518231]"
                          : "border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {targetMode === "range" && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Custom page ranges (e.g. 1-3, 5, 7-10)
                    </label>
                    <input
                      type="text"
                      value={customRangeString}
                      onChange={e => setCustomRangeString(e.target.value)}
                      placeholder="e.g. 1-3, 5"
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] outline-none font-bold"
                    />
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT: Live Interactive Preview */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 p-4 bg-slate-50/30 dark:bg-slate-900/10">
                <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Real-time visual preview
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewZoom(z => Math.max(50, z - 10))}
                    className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 w-12 text-center">
                    {previewZoom}%
                  </span>
                  <button
                    onClick={() => setPreviewZoom(z => Math.min(180, z + 10))}
                    className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>

              {/* Preview Core */}
              <div className="p-8 flex items-center justify-center bg-slate-100 dark:bg-slate-950 min-h-[460px] overflow-auto max-h-[640px] custom-scrollbar relative">
                {!activeFile ? (
                  <div className="text-center space-y-2">
                    <Info className="text-slate-300 dark:text-slate-600 mx-auto" size={32} />
                    <p className="text-sm font-bold text-slate-400 dark:text-slate-500">
                      Upload a PDF document to preview layout watermarks
                    </p>
                  </div>
                ) : activeFile.status === "loading" ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-[#518231]" size={28} />
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Parsing document layouts...
                    </p>
                  </div>
                ) : activeFile.status === "error" ? (
                  <div className="text-center space-y-2 text-red-500 max-w-sm">
                    <AlertCircle className="mx-auto" size={28} />
                    <p className="text-xs font-bold uppercase tracking-wider">Parsing Failed</p>
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{activeFile.errorMessage}</p>
                  </div>
                ) : (
                  <div 
                    ref={previewContainerRef}
                    className="relative border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 rounded-lg overflow-hidden select-none"
                    style={{
                      width: previewCanvasRef.current?.width || "auto",
                      height: previewCanvasRef.current?.height || "auto"
                    }}
                  >
                    {/* Rendered PDF Page */}
                    <canvas ref={previewCanvasRef} className="block" />

                    {/* Watermark layers overlays */}
                    {layers.map(layer => {
                      if (!layer.visible) return null;
                      if (layer.type === "image" && !layer.imagePreviewUrl) return null;

                      // Check if this layer applies to the currently previewed page number
                      const appliedPageIndices = getTargetPagesIndices(activeFile);
                      const isApplied = appliedPageIndices.includes(previewPageNum - 1);

                      if (!isApplied) return null;

                      return (
                        <div
                          key={layer.id}
                          style={getPreviewLayerStyle(layer)}
                          className="flex items-center justify-center text-center transform"
                        >
                          {layer.type === "text" ? (
                            layer.text
                          ) : (
                            <img
                              src={layer.imagePreviewUrl!}
                              alt="Watermark watermark"
                              className="w-full h-full object-contain pointer-events-none"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Page selectors controls footer */}
              {activeFile && activeFile.pageCount && activeFile.pageCount > 0 && (
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50/30 dark:bg-slate-900/10 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={previewPageNum <= 1}
                      onClick={() => setPreviewPageNum(p => Math.max(1, p - 1))}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Prev Page
                    </button>
                    <span className="font-bold text-slate-600 dark:text-slate-300">
                      Page {previewPageNum} of {activeFile.pageCount}
                    </span>
                    <button
                      disabled={previewPageNum >= (activeFile.pageCount || 1)}
                      onClick={() => setPreviewPageNum(p => Math.min(activeFile.pageCount || 1, p + 1))}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Page
                    </button>
                  </div>

                  {targetMode === "selected" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePageSelection(activeFile.id, previewPageNum - 1)}
                        className={`flex items-center gap-1 px-3 py-1 text-xs border rounded-md font-bold transition-all ${
                          activeFile.selectedPages[previewPageNum - 1]
                            ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 text-red-500"
                            : "bg-[#518231]/10 border-[#518231] text-[#518231]"
                        }`}
                      >
                        {activeFile.selectedPages[previewPageNum - 1] ? (
                          <>
                            <Square size={12} /> Skip Page
                          </>
                        ) : (
                          <>
                            <CheckSquare size={12} /> Watermark Page
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Manual selected thumbnail list gallery */}
            {targetMode === "selected" && activeFile && activeFile.pageCount && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Gallery targeting selection
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                    Select pages to apply watermark
                  </span>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {Array.from({ length: activeFile.pageCount }).map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => togglePageSelection(activeFile.id, idx)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border cursor-pointer shrink-0 transition-all ${
                        activeFile.selectedPages[idx]
                          ? "border-[#518231] bg-green-50/10 dark:bg-green-950/5 shadow-[0_0_8px_-2px_rgba(81,130,49,0.2)]"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50/30"
                      }`}
                    >
                      <div className="w-12 h-16 bg-slate-50 dark:bg-slate-950 rounded flex items-center justify-center border border-slate-200/50 dark:border-slate-800 relative">
                        <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                        <div className={`absolute top-0.5 right-0.5 w-3 h-3 rounded border flex items-center justify-center ${
                          activeFile.selectedPages[idx] ? "bg-[#518231] border-[#518231] text-white" : "bg-white border-slate-300"
                        }`}>
                          {activeFile.selectedPages[idx] && <Check size={8} strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">Page {idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions Area */}
            {activeFile && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Output name settings
                    </span>
                    <input
                      type="text"
                      value={outputNamePattern}
                      onChange={e => setOutputNamePattern(e.target.value)}
                      placeholder="{filename}_watermarked"
                      className="p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-lg w-full md:w-64 font-bold outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preserveMetadata}
                        onChange={e => setPreserveMetadata(e.target.checked)}
                        className="w-4 h-4 text-[#518231] border-slate-300 dark:border-slate-700 rounded focus:ring-[#518231] cursor-pointer"
                      />
                      Preserve PDF Metadata
                    </label>
                  </div>
                </div>

                {/* Progress logger */}
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span>{processingStep}</span>
                      <span>{processingProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#518231] h-full transition-all duration-300"
                        style={{ width: `${processingProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Compile Error display */}
                {errorMessage && (
                  <div className="flex items-start gap-2.5 p-3 rounded-lg border border-red-200 dark:border-red-950/20 bg-red-50/50 dark:bg-red-950/5 text-red-600 dark:text-red-400 text-xs">
                    <AlertCircle className="shrink-0 mt-0.5" size={14} />
                    <div>
                      <p className="font-bold">Execution Failed</p>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={compileWatermarkedPdfs}
                  className="w-full py-4 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl text-sm transition-colors font-extrabold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-950/10"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Adding Watermarks...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} /> Watermark PDF ({files.length} {files.length === 1 ? "document" : "documents"})
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-bold">
                  🔒 Processing runs fully client-side. Files never leave your browser memory.
                </p>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
