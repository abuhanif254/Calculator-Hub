"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download,
  RefreshCw, History, ShieldCheck, Check, Columns, Layers, CheckSquare,
  ZoomIn, ZoomOut, Plus, X, List, Grid, Filter, Bookmark, Keyboard, ShieldAlert,
  Lock, Unlock, Copy, FileJson, Sparkles, BookOpen, AlertTriangle, HelpCircle,
  Eye, FileOutput
} from "lucide-react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import JSZip from "jszip";
import html2canvas from "html2canvas";

// Helper to temporarily intercept window.getComputedStyle to translate modern colors like OKLCH or OKLAB to sRGB.
// This prevents html2canvas from throwing an error since it does not support modern color formats.
const withOklchPolyfill = async <T,>(fn: () => any): Promise<T> => {
  if (typeof window === "undefined") return fn();

  const originalGetComputedStyle = window.getComputedStyle;
  
  // Create a canvas-based translator for accuracy
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  
  const convertColorToRgb = (colorStr: string): string => {
    if (!ctx) return "transparent";
    try {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillStyle = colorStr;
      ctx.fillRect(0, 0, 1, 1);
      const imgData = ctx.getImageData(0, 0, 1, 1).data;
      const r = imgData[0];
      const g = imgData[1];
      const b = imgData[2];
      const a = (imgData[3] / 255).toFixed(3);
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    } catch (e) {
      return "transparent";
    }
  };

  const translatePropertyValue = (val: string): string => {
    if (!val || typeof val !== "string") return val;
    if (
      !val.includes("oklch") && 
      !val.includes("oklab") && 
      !val.includes("color-mix") && 
      !val.includes("color(") && 
      !val.includes("hwb") && 
      !val.includes("lab") && 
      !val.includes("lch") && 
      !val.includes("light-dark")
    ) return val;
    
    let result = "";
    let i = 0;
    while (i < val.length) {
      if (
        val.startsWith("oklch(", i) || 
        val.startsWith("oklab(", i) || 
        val.startsWith("color-mix(", i) ||
        val.startsWith("color(", i) ||
        val.startsWith("hwb(", i) ||
        val.startsWith("lab(", i) ||
        val.startsWith("lch(", i) ||
        val.startsWith("light-dark(", i)
      ) {
        const start = i;
        let openBrackets = 1;
        let funcName = "";
        const prefixes = ["oklch(", "oklab(", "color-mix(", "color(", "hwb(", "lab(", "lch(", "light-dark("];
        for (const p of prefixes) {
          if (val.startsWith(p, i)) {
            funcName = p;
            break;
          }
        }
        i += funcName.length;
        while (i < val.length && openBrackets > 0) {
          if (val[i] === "(") openBrackets++;
          else if (val[i] === ")") openBrackets--;
          i++;
        }
        const fullFunc = val.slice(start, i);
        const resolved = convertColorToRgb(fullFunc);
        result += resolved;
      } else {
        result += val[i];
        i++;
      }
    }
    return result;
  };

  // Override getComputedStyle
  window.getComputedStyle = function (elt: Element, pseudoElt?: string | null) {
    const style = originalGetComputedStyle(elt, pseudoElt);
    
    return new Proxy(style, {
      get(target, prop, receiver) {
        const value = target[prop as any];
        if (typeof value === "function") {
          if (prop === "getPropertyValue") {
            return function (propertyName: string) {
              const val = target.getPropertyValue(propertyName);
              return translatePropertyValue(val);
            };
          }
          return (value as any).bind(target);
        }
        if (typeof value === "string") {
          return translatePropertyValue(value);
        }
        return value;
      }
    }) as CSSStyleDeclaration;
  };

  try {
    return await fn();
  } finally {
    window.getComputedStyle = originalGetComputedStyle;
  }
};


// --- Types ---

interface ConversionHistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
  originalSize: number;
  pdfSize: number;
  pageCount: number;
  mode: "standard" | "high" | "print" | "compact";
}

const PDFJS_VERSION = '3.11.174';

const PAGE_SIZES = [
  { id: "A4", name: "A4 (210 x 297mm)", width: 595, height: 842 },
  { id: "LETTER", name: "Letter (8.5 x 11in)", width: 612, height: 792 },
  { id: "LEGAL", name: "Legal (8.5 x 14in)", width: 612, height: 1008 },
  { id: "A3", name: "A3 (297 x 420mm)", width: 842, height: 1191 },
  { id: "A5", name: "A5 (148 x 210mm)", width: 420, height: 595 }
];

const MARGIN_SIZES = [
  { id: "normal", name: "Normal (1 inch)", value: 72 },
  { id: "narrow", name: "Narrow (0.5 inch)", value: 36 },
  { id: "wide", name: "Wide (2 inches)", value: 144 },
  { id: "none", name: "No Margins", value: 0 }
];

export function WordToPdfTool() {
  const [isMounted, setIsMounted] = useState(false);

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [isBatchMode, setIsBatchMode] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "reading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Preview State
  const [estimatedPages, setEstimatedPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1.0);
  
  // Settings Panel
  const [conversionMode, setConversionMode] = useState<"standard" | "high" | "print" | "compact">("standard");
  const [pageSize, setPageSize] = useState<string>("LETTER");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [marginType, setMarginType] = useState<string>("normal");
  
  // Watermark Settings
  const [enableWatermark, setEnableWatermark] = useState<boolean>(false);
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState<string>("CONFIDENTIAL");
  const [watermarkFontSize, setWatermarkFontSize] = useState<number>(48);
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.15);
  const [watermarkRotation, setWatermarkRotation] = useState<number>(45);
  const [watermarkColor, setWatermarkColor] = useState<string>("#ff0000");
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [watermarkImagePreview, setWatermarkImagePreview] = useState<string | null>(null);

  // Conversion Progress & Output PDF
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [progressMsg, setProgressMsg] = useState<string>("");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [outputPdfUrl, setOutputPdfUrl] = useState<string | null>(null);
  const [outputPdfBlob, setOutputPdfBlob] = useState<Blob | null>(null);
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);

  // Document Analytics
  const [analyticsReport, setAnalyticsReport] = useState({
    paragraphs: 0,
    headings: 0,
    tables: 0,
    lists: 0,
    images: 0
  });

  // History & Presets
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // DOM Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const wordRenderWrapperRef = useRef<HTMLDivElement>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const watermarkImageInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState<boolean>(false);

  // Hydration safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load Saved History
  useEffect(() => {
    if (!isMounted) return;
    const savedHistory = localStorage.getItem("word_to_pdf_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.warn("Failed to load conversion history", e);
      }
    }
  }, [isMounted]);

  const saveHistoryItem = (pdfBlob: Blob) => {
    if (!file) return;
    const historyItem: ConversionHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      fileName: file.name,
      originalSize: file.size,
      pdfSize: pdfBlob.size,
      pageCount: estimatedPages || 1,
      mode: conversionMode
    };
    setHistory(prev => {
      const updated = [historyItem, ...prev].slice(0, 10);
      localStorage.setItem("word_to_pdf_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("word_to_pdf_history");
  };

  // Load docx-preview script via CDN
  const loadDocxPreviewLib = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const windowAny = window as any;
      if (windowAny.docx) {
        resolve(windowAny.docx);
        return;
      }
      const existingScript = document.getElementById("docx-preview-script");
      if (existingScript) {
        let interval = setInterval(() => {
          if (windowAny.docx) {
            clearInterval(interval);
            resolve(windowAny.docx);
          }
        }, 100);
        setTimeout(() => {
          clearInterval(interval);
          reject(new Error("Timeout loading docx-preview library"));
        }, 15000);
        return;
      }
      const script = document.createElement("script");
      script.id = "docx-preview-script";
      script.src = "https://cdn.jsdelivr.net/npm/docx-preview/dist/docx-preview.min.js";
      script.onload = () => {
        resolve(windowAny.docx);
      };
      script.onerror = () => reject(new Error("Failed to load docx-preview script"));
      document.head.appendChild(script);
    });
  };

  // Load PDF.js script via CDN
  const loadPdfJsLib = (): Promise<any> => {
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
      script.onerror = () => reject(new Error("Failed to load PDF.js from CDN."));
      document.head.appendChild(script);
    });
  };

  // Document Analysis Helper
  const runDocumentAnalytics = (container: HTMLDivElement) => {
    const paragraphs = container.querySelectorAll("p").length;
    const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6").length;
    const tables = container.querySelectorAll("table").length;
    const lists = container.querySelectorAll("ul, ol").length;
    const images = container.querySelectorAll("img").length;

    setAnalyticsReport({
      paragraphs,
      headings,
      tables,
      lists,
      images
    });
  };

  // Load and Render Word Document
  const loadWordDocument = async (targetFile: File) => {
    setUploadStatus("reading");
    setErrorMessage(null);
    setOutputPdfUrl(null);
    setOutputPdfBlob(null);
    setPdfjsDoc(null);
    setEstimatedPages(0);

    try {
      // Validate format
      const isDocx = targetFile.name.endsWith(".docx");
      const isDoc = targetFile.name.endsWith(".doc");

      if (!isDocx && !isDoc) {
        throw new Error("Unsupported file format. Please upload a .docx or .doc file.");
      }

      if (isDoc) {
        // Warn about legacy .doc layout approximation
        console.warn("Legacy DOC uploaded. Proceeding with structural layout emulation.");
      }

      const docxLib = await loadDocxPreviewLib();
      const arrayBuffer = await targetFile.arrayBuffer();

      // Setup container
      if (wordRenderWrapperRef.current) {
        wordRenderWrapperRef.current.innerHTML = "";
        
        const renderOptions = {
          className: "docx-preview-node",
          inWrapper: false,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          experimental: true,
          useBase64URL: true
        };

        await docxLib.renderAsync(arrayBuffer, wordRenderWrapperRef.current, undefined, renderOptions);
        
        // Find pages
        const pages = wordRenderWrapperRef.current.querySelectorAll(".docx-preview-node article, .docx-preview-node .docx-page, section.docx-preview");
        const count = pages.length || 1;
        setEstimatedPages(count);
        runDocumentAnalytics(wordRenderWrapperRef.current);
      }

      setFileSize(targetFile.size);
      setFile(targetFile);
      setUploadStatus("ready");
      setCurrentPage(1);
    } catch (err: any) {
      console.error("Error parsing Word document:", err);
      setErrorMessage(err.message || "Failed to parse document. The file might be corrupted.");
      setUploadStatus("error");
    }
  };

  // Handle Drag & Drop
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
      if (isBatchMode) {
        const docFiles = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith(".docx") || f.name.endsWith(".doc"));
        setBatchFiles(prev => [...prev, ...docFiles]);
      } else {
        loadWordDocument(e.dataTransfer.files[0]);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (isBatchMode) {
        const docFiles = Array.from(e.target.files).filter(f => f.name.endsWith(".docx") || f.name.endsWith(".doc"));
        setBatchFiles(prev => [...prev, ...docFiles]);
      } else {
        loadWordDocument(e.target.files[0]);
      }
    }
  };

  // Watermark Image handler
  const handleWatermarkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgFile = e.target.files[0];
      setWatermarkImage(imgFile);
      const reader = new FileReader();
      reader.onload = () => {
        setWatermarkImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imgFile);
    }
  };

  const clearWatermarkImage = () => {
    setWatermarkImage(null);
    setWatermarkImagePreview(null);
    if (watermarkImageInputRef.current) {
      watermarkImageInputRef.current.value = "";
    }
  };

  // Convert Hex color to RGB object [0-1]
  const hexToRgbRatio = (hex: string) => {
    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return { r, g, b };
  };

  // Execute DOCX to PDF Conversion
  const handleStartConversion = async () => {
    if (!file || isConverting || !wordRenderWrapperRef.current) return;

    setIsConverting(true);
    setProgressPercent(0);
    setProgressMsg("Scanning Document Page Layouts...");

    try {
      const pageElements = wordRenderWrapperRef.current.querySelectorAll("article, .docx-page, section.docx-preview");
      const listToProcess = pageElements.length > 0 ? Array.from(pageElements) : [wordRenderWrapperRef.current];
      
      // Determine Scale Factor based on preset
      let scaleFactor = 1.5; // Standard
      if (conversionMode === "high") scaleFactor = 2.0;
      else if (conversionMode === "print") scaleFactor = 3.0;
      else if (conversionMode === "compact") scaleFactor = 1.0;

      // Determine page geometry properties
      const activeSizeConfig = PAGE_SIZES.find(s => s.id === pageSize) || PAGE_SIZES[0];
      const targetWidth = orientation === "portrait" ? activeSizeConfig.width : activeSizeConfig.height;
      const targetHeight = orientation === "portrait" ? activeSizeConfig.height : activeSizeConfig.width;

      const activeMarginConfig = MARGIN_SIZES.find(m => m.id === marginType) || MARGIN_SIZES[0];
      const marginPoints = activeMarginConfig.value;

      // Create pdf-lib instance
      const pdfDoc = await PDFDocument.create();

      // Prepare Image Watermark if applicable
      let watermarkImgBytes: Uint8Array | null = null;
      if (enableWatermark && watermarkType === "image" && watermarkImage) {
        const arrayBuf = await watermarkImage.arrayBuffer();
        watermarkImgBytes = new Uint8Array(arrayBuf);
      }

      for (let idx = 0; idx < listToProcess.length; idx++) {
        const pageEl = listToProcess[idx] as HTMLElement;
        setProgressMsg(`Rasterizing page layout ${idx + 1} of ${listToProcess.length}...`);
        setProgressPercent(Math.round((idx / listToProcess.length) * 100));

        // Render element to high-res canvas
        const canvas = await withOklchPolyfill<HTMLCanvasElement>(() => 
          html2canvas(pageEl, {
            scale: scaleFactor,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff"
          } as any)
        );

        // Convert canvas to compressed jpeg
        const imgDataUrl = canvas.toDataURL("image/jpeg", conversionMode === "compact" ? 0.70 : 0.88);
        const imgResponse = await fetch(imgDataUrl);
        const imgBytes = await imgResponse.arrayBuffer();

        // Embed in PDF
        const embeddedImg = await pdfDoc.embedJpg(new Uint8Array(imgBytes));
        
        // Add PDF Page
        const page = pdfDoc.addPage([targetWidth, targetHeight]);
        
        // Calculate image boundaries inside margins
        const drawWidth = targetWidth - (marginPoints * 2);
        const drawHeight = targetHeight - (marginPoints * 2);

        page.drawImage(embeddedImg, {
          x: marginPoints,
          y: marginPoints,
          width: drawWidth,
          height: drawHeight
        });

        // Apply Custom Watermarks
        if (enableWatermark) {
          if (watermarkType === "text" && watermarkText.trim()) {
            const rgbColor = hexToRgbRatio(watermarkColor);
            page.drawText(watermarkText, {
              x: targetWidth / 2,
              y: targetHeight / 2,
              size: watermarkFontSize,
              opacity: watermarkOpacity,
              rotate: degrees(watermarkRotation),
              color: rgb(rgbColor.r, rgbColor.g, rgbColor.b)
            });
          } else if (watermarkType === "image" && watermarkImgBytes) {
            try {
              // Attempt to embed PNG or JPG watermark
              const watermarkEmbedded = watermarkImage?.type.includes("png") 
                ? await pdfDoc.embedPng(watermarkImgBytes)
                : await pdfDoc.embedJpg(watermarkImgBytes);

              const wmWidth = 200; // default width
              const wmHeight = (watermarkEmbedded.height / watermarkEmbedded.width) * wmWidth;

              page.drawImage(watermarkEmbedded, {
                x: (targetWidth / 2) - (wmWidth / 2),
                y: (targetHeight / 2) - (wmHeight / 2),
                width: wmWidth,
                height: wmHeight,
                opacity: watermarkOpacity
              });
            } catch (err) {
              console.error("Error writing image watermark to PDF page", err);
            }
          }
        }
      }

      setProgressMsg("Assembling PDF document blocks...");
      setProgressPercent(95);

      const pdfBytes = await pdfDoc.save();
      const compiledBlob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(compiledBlob);

      setOutputPdfBlob(compiledBlob);
      setOutputPdfUrl(url);
      
      // Load into PDF.js doc for side-by-side comparison preview
      const pdfjsLib = await loadPdfJsLib();
      const docData = new Uint8Array(pdfBytes);
      const loadingTask = pdfjsLib.getDocument({ data: docData });
      const jsDoc = await loadingTask.promise;
      setPdfjsDoc(jsDoc);

      setProgressMsg("PDF Conversion completed successfully!");
      setProgressPercent(100);
      setIsConverting(false);

      // Save History Stats
      saveHistoryItem(compiledBlob);

      // Auto trigger download
      triggerDownload(url, file.name);
    } catch (e: any) {
      console.error("Conversion pipeline failed", e);
      alert("Conversion failed: " + e.message);
      setIsConverting(false);
    }
  };

  // Execute Batch Convert
  const handleStartBatchConversion = async () => {
    if (batchFiles.length === 0 || isConverting) return;

    setIsConverting(true);
    setProgressPercent(0);
    setProgressMsg("Initializing Batch Conversions...");

    try {
      const zip = new JSZip();
      
      // Load CDN dependencies
      const docxLib = await loadDocxPreviewLib();
      
      // Create hidden sandbox container for parsing batch nodes
      const sandbox = document.createElement("div");
      sandbox.style.position = "absolute";
      sandbox.style.left = "-9999px";
      sandbox.style.top = "-9999px";
      document.body.appendChild(sandbox);

      let scaleFactor = 1.5;
      if (conversionMode === "high") scaleFactor = 2.0;
      else if (conversionMode === "print") scaleFactor = 3.0;
      else if (conversionMode === "compact") scaleFactor = 1.0;

      const activeSizeConfig = PAGE_SIZES.find(s => s.id === pageSize) || PAGE_SIZES[0];
      const targetWidth = orientation === "portrait" ? activeSizeConfig.width : activeSizeConfig.height;
      const targetHeight = orientation === "portrait" ? activeSizeConfig.height : activeSizeConfig.width;
      const activeMarginConfig = MARGIN_SIZES.find(m => m.id === marginType) || MARGIN_SIZES[0];
      const marginPoints = activeMarginConfig.value;

      // Prepare Image Watermark bytes
      let watermarkImgBytes: Uint8Array | null = null;
      if (enableWatermark && watermarkType === "image" && watermarkImage) {
        const arrayBuf = await watermarkImage.arrayBuffer();
        watermarkImgBytes = new Uint8Array(arrayBuf);
      }

      for (let fIdx = 0; fIdx < batchFiles.length; fIdx++) {
        const batchFile = batchFiles[fIdx];
        setProgressMsg(`Processing File ${fIdx + 1} of ${batchFiles.length}: ${batchFile.name}...`);
        setProgressPercent(Math.round((fIdx / batchFiles.length) * 100));

        sandbox.innerHTML = "";
        const arrayBuffer = await batchFile.arrayBuffer();
        
        await docxLib.renderAsync(arrayBuffer, sandbox, undefined, {
          className: "batch-node",
          inWrapper: false,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          experimental: true,
          useBase64URL: true
        });

        const pages = sandbox.querySelectorAll("article, .docx-page, section.docx-preview");
        const listToProcess = pages.length > 0 ? Array.from(pages) : [sandbox];

        const pdfDoc = await PDFDocument.create();

        for (let pIdx = 0; pIdx < listToProcess.length; pIdx++) {
          const pageEl = listToProcess[pIdx] as HTMLElement;
          
          const canvas = await withOklchPolyfill<HTMLCanvasElement>(() => 
            html2canvas(pageEl, {
              scale: scaleFactor,
              useCORS: true,
              logging: false,
              backgroundColor: "#ffffff"
            } as any)
          );

          const imgDataUrl = canvas.toDataURL("image/jpeg", conversionMode === "compact" ? 0.70 : 0.88);
          const imgResponse = await fetch(imgDataUrl);
          const imgBytes = await imgResponse.arrayBuffer();

          const embeddedImg = await pdfDoc.embedJpg(new Uint8Array(imgBytes));
          const page = pdfDoc.addPage([targetWidth, targetHeight]);
          
          const drawWidth = targetWidth - (marginPoints * 2);
          const drawHeight = targetHeight - (marginPoints * 2);

          page.drawImage(embeddedImg, {
            x: marginPoints,
            y: marginPoints,
            width: drawWidth,
            height: drawHeight
          });

          // Overlay watermark
          if (enableWatermark) {
            if (watermarkType === "text" && watermarkText.trim()) {
              const rgbColor = hexToRgbRatio(watermarkColor);
              page.drawText(watermarkText, {
                x: targetWidth / 2,
                y: targetHeight / 2,
                size: watermarkFontSize,
                opacity: watermarkOpacity,
                rotate: degrees(watermarkRotation),
                color: rgb(rgbColor.r, rgbColor.g, rgbColor.b)
              });
            } else if (watermarkType === "image" && watermarkImgBytes) {
              try {
                const watermarkEmbedded = watermarkImage?.type.includes("png") 
                  ? await pdfDoc.embedPng(watermarkImgBytes)
                  : await pdfDoc.embedJpg(watermarkImgBytes);

                const wmWidth = 200;
                const wmHeight = (watermarkEmbedded.height / watermarkEmbedded.width) * wmWidth;

                page.drawImage(watermarkEmbedded, {
                  x: (targetWidth / 2) - (wmWidth / 2),
                  y: (targetHeight / 2) - (wmHeight / 2),
                  width: wmWidth,
                  height: wmHeight,
                  opacity: watermarkOpacity
                });
              } catch (err) {
                console.error("Error embedding batch watermark image", err);
              }
            }
          }
        }

        const pdfBytes = await pdfDoc.save();
        const baseName = batchFile.name.replace(/\.[^/.]+$/, "");
        zip.file(`${baseName}.pdf`, pdfBytes);
      }

      setProgressMsg("Compressing ZIP archive folder...");
      setProgressPercent(95);

      const zipContent = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipContent);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Converted_PDF_Documents.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      sandbox.remove();
      setProgressMsg("Batch conversions completed successfully!");
      setProgressPercent(100);
      setIsConverting(false);
    } catch (err: any) {
      console.error("Batch conversion run failed", err);
      alert("Batch processing failed: " + err.message);
      setIsConverting(false);
    }
  };

  const triggerDownload = (url: string, originalName: string) => {
    const baseName = originalName.replace(/\.[^/.]+$/, "");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}_converted.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Render Generated PDF Page to right canvas preview
  const renderPdfPreviewPage = async (pageNum: number, customDoc = pdfjsDoc) => {
    if (!customDoc || !pdfCanvasRef.current) return;

    try {
      const page = await customDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });
      const canvas = pdfCanvasRef.current;
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
      console.error("Error rendering PDF preview page", e);
    }
  };

  useEffect(() => {
    if (pdfjsDoc) {
      renderPdfPreviewPage(currentPage);
    }
  }, [currentPage, pdfjsDoc]);

  const clearFile = () => {
    setFile(null);
    setFileSize(0);
    setEstimatedPages(0);
    setCurrentPage(1);
    setOutputPdfUrl(null);
    setOutputPdfBlob(null);
    setPdfjsDoc(null);
    setUploadStatus("idle");
    setProgressPercent(0);
    setProgressMsg("");
    if (wordRenderWrapperRef.current) {
      wordRenderWrapperRef.current.innerHTML = "";
    }
  };

  const clearBatchFiles = () => {
    setBatchFiles([]);
    setProgressPercent(0);
    setProgressMsg("");
  };

  const removeBatchFileIndex = (idx: number) => {
    setBatchFiles(prev => prev.filter((_, i) => i !== idx));
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-8">
      {/* ─── SECURE INSTRUCTION HEADER ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-6 py-4 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#518231]/10 rounded-2xl text-[#518231]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-855 dark:text-slate-155">Safe Client-Side PDF Converter</h2>
            <p className="text-xs text-slate-555 dark:text-slate-400 font-bold mt-0.5">
              Files never leave your computer. Compiled 100% in-browser.
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-350 dark:border-slate-700 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs cursor-pointer transition-all w-full sm:w-auto"
          >
            <History size={15} />
            History ({history.length})
          </button>
          
          {(file || batchFiles.length > 0) && (
            <button
              onClick={isBatchMode ? clearBatchFiles : clearFile}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 dark:border-red-950/30 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 dark:text-red-400 font-extrabold text-xs rounded-2xl cursor-pointer transition-all w-full sm:w-auto"
            >
              <Trash2 size={15} />
              Reset Files
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
              Recent Word Conversions (Local Storage)
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
              No recent conversions found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {history.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-855 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate w-4/5">{item.fileName}</p>
                    <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-455 font-bold border-t pt-2 border-slate-100 dark:border-slate-900">
                    <span>{item.pageCount} pages ({(item.pdfSize / 1024).toFixed(1)} KB)</span>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-600 rounded font-black text-[9px] uppercase">
                      {item.mode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── UPLOADER SCREEN ─── */}
      {uploadStatus === "idle" && batchFiles.length === 0 && (
        <div className="space-y-6">
          {/* Mode Switcher */}
          <div className="flex justify-center">
            <div className="inline-flex bg-slate-100 dark:bg-slate-850 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800">
              <button 
                onClick={() => setIsBatchMode(false)}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${!isBatchMode ? 'bg-[#518231] text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
              >
                Single Document
              </button>
              <button 
                onClick={() => setIsBatchMode(true)}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${isBatchMode ? 'bg-[#518231] text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
              >
                Batch Uploads
              </button>
            </div>
          </div>

          <div
            ref={dropzoneRef}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => isBatchMode ? batchInputRef.current?.click() : fileInputRef.current?.click()}
            className={`border-3 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center gap-5 text-center cursor-pointer transition-all duration-300 ${
              dragActive
                ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10 scale-[0.99]"
                : "border-slate-350 hover:border-[#518231]/70 dark:border-slate-800 dark:hover:border-[#518231]/70 bg-white hover:bg-slate-50/50 dark:bg-slate-900 dark:hover:bg-slate-900/60"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".docx,.doc"
              onChange={handleFileInput}
              className="hidden"
            />
            <input
              ref={batchInputRef}
              type="file"
              accept=".docx,.doc"
              multiple
              onChange={handleFileInput}
              className="hidden"
            />
            <div className="p-5 bg-slate-100 dark:bg-slate-800 rounded-3xl text-slate-400 dark:text-slate-500 transition-all shadow-sm">
              <Upload size={36} className="text-[#518231]" />
            </div>
            <div className="space-y-1.5">
              <p className="text-base font-black text-slate-850 dark:text-slate-150">
                {isBatchMode ? "Drag and drop multiple Word files here" : "Drag and drop your Word document here"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                or click to upload from your local drive (.docx or .doc)
              </p>
            </div>
            
            {errorMessage && (
              <div className="text-red-500 text-xs font-black flex items-center justify-center gap-1.5 mt-2">
                <AlertCircle size={14} /> {errorMessage}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── READING STATUS SCREEN ─── */}
      {uploadStatus === "reading" && (
        <div className="border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 p-16 rounded-3xl flex flex-col items-center justify-center gap-4 text-center">
          <Loader2 className="animate-spin text-[#518231]" size={36} />
          <p className="text-sm font-black text-slate-800 dark:text-slate-200">
            Reading Word document layout trees...
          </p>
        </div>
      )}

      {/* ─── BATCH PROCESSING WORKSPACE ─── */}
      {isBatchMode && batchFiles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-5">
              <h3 className="text-sm font-black text-slate-850 dark:text-slate-150 flex items-center gap-2">
                <Settings size={16} className="text-[#518231]" />
                Batch Config settings
              </h3>

              {/* Conversion Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Conversion Quality Preset</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "standard", name: "Standard", desc: "Balanced files" },
                    { id: "high", name: "High Quality", desc: "Crisp graphics" },
                    { id: "print", name: "Print Ready", desc: "High resolution" },
                    { id: "compact", name: "Compact PDF", desc: "Minimal size" }
                  ].map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setConversionMode(mode.id as any)}
                      className={`flex flex-col text-left p-3 border rounded-xl cursor-pointer transition-all ${
                        conversionMode === mode.id
                          ? "border-[#518231] bg-[#518231]/5 text-[#518231]"
                          : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/40 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <span className="text-xs font-black">{mode.name}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">{mode.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Geometry overrides */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-500">Page Dimension Defaults</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold">PAGE SIZE</span>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value)}
                      className="w-full text-xs font-extrabold px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl outline-none mt-1"
                    >
                      {PAGE_SIZES.map(s => (
                        <option key={s.id} value={s.id}>{s.id} size</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold">ORIENTATION</span>
                    <select
                      value={orientation}
                      onChange={(e) => setOrientation(e.target.value as any)}
                      className="w-full text-xs font-extrabold px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl outline-none mt-1"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Batch Watermark Toggle */}
              <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-yellow-500" />
                    Apply Watermark Layer
                  </label>
                  <input
                    type="checkbox"
                    checked={enableWatermark}
                    onChange={(e) => setEnableWatermark(e.target.checked)}
                    className="w-4 h-4 text-[#518231] bg-slate-100 border-slate-300 rounded focus:ring-[#518231] cursor-pointer"
                  />
                </div>
                {enableWatermark && (
                  <div className="space-y-3 animate-in slide-in-from-top-1 duration-150">
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      placeholder="CONFIDENTIAL"
                      className="w-full text-xs font-extrabold px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-950 outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Convert Batch Action Button */}
              <button
                onClick={handleStartBatchConversion}
                disabled={isConverting}
                className="w-full flex items-center justify-center gap-2 bg-[#518231] hover:bg-[#416827] disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white font-extrabold py-3.5 rounded-2xl cursor-pointer transition-all shadow-sm"
              >
                {isConverting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Processing Batch...</span>
                  </>
                ) : (
                  <>
                    <FileOutput size={16} />
                    <span>Convert {batchFiles.length} files to PDF</span>
                  </>
                )}
              </button>

              {progressPercent > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span className="truncate max-w-[85%]">{progressMsg}</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#518231] transition-all duration-300" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Batch Files List */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-200">
                Uploaded Files Queue ({batchFiles.length})
              </h3>
              <button 
                onClick={() => batchInputRef.current?.click()}
                className="text-xs font-black text-[#518231] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} /> Add Files
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-850 max-h-[400px] overflow-y-auto pr-2 space-y-2">
              {batchFiles.map((f, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-700 dark:text-slate-300 max-w-[250px] truncate">{f.name}</p>
                      <span className="text-[10px] text-slate-400 font-semibold">{(f.size / 1024).toFixed(1)} KB</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeBatchFileIndex(idx)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── SINGLE WORKSPACE SCREEN ─── */}
      {uploadStatus === "ready" && file && !isBatchMode && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          {/* Left panel options */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-5">
              <h3 className="text-sm font-black text-slate-850 dark:text-slate-150 flex items-center gap-2">
                <Settings size={16} className="text-[#518231]" />
                Conversion Settings
              </h3>

              {/* Quality Settings */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Quality Preset</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: "standard", name: "Standard Quality", desc: "144 DPI balanced compression" },
                    { id: "high", name: "High Quality", desc: "192 DPI best visual structure" },
                    { id: "print", name: "Print Ready PDF", desc: "288 DPI high contrast layout" },
                    { id: "compact", name: "Compact PDF", desc: "96 DPI reduced file footprint" }
                  ].map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setConversionMode(mode.id as any)}
                      className={`flex flex-col text-left p-3 border rounded-xl cursor-pointer transition-all ${
                        conversionMode === mode.id
                          ? "border-[#518231] bg-[#518231]/5 text-[#518231]"
                          : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/40 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <span className="text-xs font-black">{mode.name}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{mode.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Geometry */}
              <div className="space-y-4 pt-1">
                <label className="text-xs font-bold text-slate-500">Output Geometry Overrides</label>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold">PAGE SIZE</span>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value)}
                      className="w-full text-xs font-extrabold px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl outline-none mt-1"
                    >
                      {PAGE_SIZES.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold">ORIENTATION</span>
                      <select
                        value={orientation}
                        onChange={(e) => setOrientation(e.target.value as any)}
                        className="w-full text-xs font-extrabold px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl outline-none mt-1"
                      >
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold">MARGINS</span>
                      <select
                        value={marginType}
                        onChange={(e) => setMarginType(e.target.value)}
                        className="w-full text-xs font-extrabold px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl outline-none mt-1"
                      >
                        {MARGIN_SIZES.map(m => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark Section */}
              <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-yellow-500" />
                    Layer Watermark
                  </label>
                  <input
                    type="checkbox"
                    checked={enableWatermark}
                    onChange={(e) => setEnableWatermark(e.target.checked)}
                    className="w-4 h-4 text-[#518231] bg-slate-100 border-slate-300 rounded focus:ring-[#518231] cursor-pointer"
                  />
                </div>

                {enableWatermark && (
                  <div className="space-y-4 p-4 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-850/50 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setWatermarkType("text")}
                        className={`flex-grow py-1 font-extrabold text-xs rounded-lg ${watermarkType === "text" ? "bg-[#518231] text-white" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500"}`}
                      >
                        Text
                      </button>
                      <button
                        onClick={() => setWatermarkType("image")}
                        className={`flex-grow py-1 font-extrabold text-xs rounded-lg ${watermarkType === "image" ? "bg-[#518231] text-white" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500"}`}
                      >
                        Logo Image
                      </button>
                    </div>

                    {watermarkType === "text" ? (
                      <div className="space-y-3">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold">WATERMARK TEXT</span>
                          <input
                            type="text"
                            value={watermarkText}
                            onChange={(e) => setWatermarkText(e.target.value)}
                            placeholder="CONFIDENTIAL"
                            className="w-full text-xs font-extrabold px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 outline-none mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold">COLOR</span>
                            <div className="flex items-center gap-1.5 mt-1 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 px-2 py-0.5">
                              <input
                                type="color"
                                value={watermarkColor}
                                onChange={(e) => setWatermarkColor(e.target.value)}
                                className="w-5 h-5 rounded cursor-pointer"
                              />
                              <span className="text-[10px] font-mono font-black uppercase text-slate-600 dark:text-slate-400">{watermarkColor}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold">FONT SIZE ({watermarkFontSize}pt)</span>
                            <input
                              type="range"
                              min="12"
                              max="72"
                              value={watermarkFontSize}
                              onChange={(e) => setWatermarkFontSize(parseInt(e.target.value))}
                              className="w-full mt-2 accent-[#518231]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold">OPACITY ({(watermarkOpacity*100).toFixed(0)}%)</span>
                            <input
                              type="range"
                              min="0.05"
                              max="0.80"
                              step="0.05"
                              value={watermarkOpacity}
                              onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                              className="w-full mt-2 accent-[#518231]"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold">ROTATION ({watermarkRotation}°)</span>
                            <input
                              type="range"
                              min="-90"
                              max="90"
                              value={watermarkRotation}
                              onChange={(e) => setWatermarkRotation(parseInt(e.target.value))}
                              className="w-full mt-2 accent-[#518231]"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <span className="text-[10px] text-slate-400 font-bold">WATERMARK LOGO</span>
                        {watermarkImagePreview ? (
                          <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl p-2 bg-white dark:bg-slate-900 flex items-center justify-between">
                            <img src={watermarkImagePreview} alt="watermark logo" className="h-10 w-10 object-contain rounded" />
                            <span className="text-[10px] text-slate-400 truncate max-w-[120px] font-bold">{watermarkImage?.name}</span>
                            <button onClick={clearWatermarkImage} className="text-red-500 hover:text-red-600 p-1">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => watermarkImageInputRef.current?.click()}
                            className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/40"
                          >
                            <input
                              ref={watermarkImageInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleWatermarkImageUpload}
                              className="hidden"
                            />
                            <Plus size={16} className="mx-auto text-slate-400 mb-1" />
                            <span className="text-[10px] text-slate-500 font-bold">Select Logo PNG/JPG</span>
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold">OPACITY ({(watermarkOpacity*100).toFixed(0)}%)</span>
                          <input
                            type="range"
                            min="0.05"
                            max="0.80"
                            step="0.05"
                            value={watermarkOpacity}
                            onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                            className="w-full mt-1 accent-[#518231]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action button */}
              <button
                onClick={handleStartConversion}
                disabled={isConverting}
                className="w-full flex items-center justify-center gap-2 bg-[#518231] hover:bg-[#416827] disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white font-extrabold py-3.5 rounded-2xl cursor-pointer transition-all shadow-sm"
              >
                {isConverting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} />
                    <span>Convert to PDF</span>
                  </>
                )}
              </button>

              {progressPercent > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span className="truncate max-w-[80%]">{progressMsg}</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#518231] transition-all duration-300" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Document Structure Analyzer */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-slate-850 dark:text-slate-150 flex items-center gap-1.5">
                <BookOpen size={15} className="text-[#518231]" />
                Word Elements Detected
              </h3>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { name: "Paragraphs", count: analyticsReport.paragraphs },
                  { name: "Headings", count: analyticsReport.headings },
                  { name: "Tables", count: analyticsReport.tables },
                  { name: "List Nodes", count: analyticsReport.lists },
                  { name: "Embedded Images", count: analyticsReport.images }
                ].map(el => (
                  <div key={el.name} className="bg-white dark:bg-slate-950 p-3 border border-slate-200 dark:border-slate-850 rounded-xl">
                    <div className="text-slate-400 font-bold text-[9px] uppercase">{el.name}</div>
                    <div className="text-base font-black text-slate-850 dark:text-slate-100 mt-1">{el.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* File Info */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-3.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">File Name</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[60%]">{file.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">File Size</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">{(fileSize / 1024).toFixed(1)} KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Estimated Pages</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">{estimatedPages}</span>
              </div>
            </div>

          </div>

          {/* Right Panel: Side-by-side workspace comparison */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Toolbar */}
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-855 px-5 py-3 rounded-2xl">
              <div className="flex items-center gap-3">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="px-2.5 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-lg text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                  Page {currentPage} of {estimatedPages || 1}
                </span>
                <button
                  disabled={currentPage >= (estimatedPages || 1)}
                  onClick={() => setCurrentPage(prev => Math.min(estimatedPages || 1, prev + 1))}
                  className="px-2.5 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 rounded-lg text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-lg text-slate-500 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-xs font-bold text-slate-500 w-10 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-855 rounded-lg text-slate-500 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>

            {/* Side-by-Side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
              
              {/* Left Panel: Original Word Preview */}
              <div className="border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-4 rounded-3xl flex flex-col justify-start overflow-hidden relative min-h-[500px]">
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-slate-900/60 backdrop-blur-sm text-white rounded-lg text-[10px] font-black uppercase flex items-center gap-1">
                  <Eye size={12} /> Original Word Preview
                </div>
                
                <div 
                  className="flex-1 overflow-auto max-w-full max-h-[600px] mt-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-inner text-slate-800 dark:text-slate-200 docx-preview-root"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <div ref={wordRenderWrapperRef} className="w-full text-xs" />
                </div>
              </div>

              {/* Right Panel: Compiled PDF Preview */}
              <div className="border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-4 rounded-3xl flex flex-col justify-between overflow-hidden relative min-h-[500px]">
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#2b6cb0]/15 text-[#2b6cb0] rounded-lg text-[10px] font-black uppercase flex items-center gap-1">
                  <FileOutput size={12} /> Generated PDF Preview
                </div>
                
                <div className="flex-1 overflow-auto max-w-full max-h-[600px] flex items-center justify-center mt-8">
                  {outputPdfUrl ? (
                    <div 
                      className="transition-transform duration-150"
                      style={{ transform: `scale(${zoom})` }}
                    >
                      <canvas ref={pdfCanvasRef} className="shadow-md rounded bg-white max-w-full" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full gap-2 text-slate-400 py-16">
                      <Layers size={36} className="text-slate-350 dark:text-slate-700" />
                      <p className="font-semibold text-xs">PDF Preview Not Generated</p>
                      <p className="text-[10px] font-bold text-slate-400 max-w-[200px]">
                        Click &apos;Convert to PDF&apos; to process layouts and render preview frames.
                      </p>
                    </div>
                  )}
                </div>

                {/* Exporter downloads */}
                {outputPdfUrl && (
                  <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-between gap-2">
                    <button
                      onClick={() => triggerDownload(outputPdfUrl, file.name)}
                      className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 bg-[#518231] hover:bg-[#416827] text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-sm"
                    >
                      <Download size={14} /> Download PDF
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
