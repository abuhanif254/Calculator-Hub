"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import JSZip from "jszip";
import { 
  FileText, Upload, Loader2, Check, AlertCircle, Trash2, 
  Settings, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Maximize, Download, Sparkles, HelpCircle, Type, 
  AlignLeft, History, FileDown
} from "lucide-react";

const PDFJS_VERSION = '3.11.174';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  pdfLibDoc: PDFDocument;
  pdfjsDoc: any;
  pageCount: number;
  status: "ready" | "loading" | "error";
  errorMessage?: string;
  originalBytes: Uint8Array;
}

interface PageNumberHistoryItem {
  id: string;
  timestamp: number;
  filesCount: number;
  filesList: string[];
  totalSize: number;
  style: string;
  position: string;
  font: string;
}

// ─────────────────────────────────────────────────────────
// HELPER FUNCTIONS FOR PAGINATION STYLES
// ─────────────────────────────────────────────────────────

function toRoman(num: number): string {
  if (num <= 0 || num > 3999) return String(num);
  const romanMap: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let result = '';
  let remaining = num;
  for (const [val, char] of romanMap) {
    while (remaining >= val) {
      result += char;
      remaining -= val;
    }
  }
  return result;
}

function toAlphabetical(num: number): string {
  if (num <= 0) return String(num);
  let result = '';
  let temp = num - 1;
  while (temp >= 0) {
    result = String.fromCharCode((temp % 26) + 65) + result;
    temp = Math.floor(temp / 26) - 1;
  }
  return result;
}

function formatPageString(
  index: number, // 0-indexed page in document
  startNum: number,
  style: string,
  totalPages: number,
  prefix: string,
  suffix: string
): string {
  const currentNum = index + startNum;
  let formatted = "";

  switch (style) {
    case "padded":
      formatted = String(currentNum).padStart(2, "0");
      break;
    case "roman-upper":
      formatted = toRoman(currentNum);
      break;
    case "roman-lower":
      formatted = toRoman(currentNum).toLowerCase();
      break;
    case "alpha":
      formatted = toAlphabetical(currentNum);
      break;
    case "alpha-lower":
      formatted = toAlphabetical(currentNum).toLowerCase();
      break;
    case "prefix":
      formatted = `Page ${currentNum}`;
      break;
    case "of-total":
      formatted = `Page ${currentNum} of ${totalPages}`;
      break;
    case "standard":
    default:
      formatted = String(currentNum);
      break;
  }

  return `${prefix}${formatted}${suffix}`;
}

// ─────────────────────────────────────────────────────────
// PAGINATION RANGE PARSER
// ─────────────────────────────────────────────────────────

function parsePageRange(rangeStr: string, totalPages: number): number[] {
  const result: number[] = [];
  const parts = rangeStr.split(',');
  for (const part of parts) {
    const cleanPart = part.trim();
    if (!cleanPart) continue;
    if (cleanPart.includes('-')) {
      const [startStr, endStr] = cleanPart.split('-');
      const start = parseInt(startStr.trim(), 10);
      const end = parseInt(endStr.trim(), 10);
      if (!isNaN(start) && !isNaN(end)) {
        const lower = Math.min(start, end);
        const upper = Math.max(start, end);
        for (let i = lower; i <= upper; i++) {
          if (i >= 1 && i <= totalPages) {
            result.push(i - 1); // 0-indexed page index
          }
        }
      }
    } else {
      const val = parseInt(cleanPart, 10);
      if (!isNaN(val) && val >= 1 && val <= totalPages) {
        result.push(val - 1);
      }
    }
  }
  return Array.from(new Set(result)).sort((a, b) => a - b);
}

// ─────────────────────────────────────────────────────────
// PHYSICAL COORDINATE MAPPING FOR ROTATED PAGES
// ─────────────────────────────────────────────────────────

function getPhysicalCoordsAndRotation(
  vx: number,
  vy: number,
  visualWidth: number,
  visualHeight: number,
  rotationAngle: number
) {
  const angle = (rotationAngle % 360 + 360) % 360;
  if (angle === 0) {
    return { px: vx, py: vy, rotateDegrees: 0 };
  }
  if (angle === 90) {
    // Physical origin (0,0) is visual bottom-right (visualWidth, 0)
    // px goes in Y, py goes in X
    return { px: visualHeight - vy, py: vx, rotateDegrees: 90 };
  }
  if (angle === 180) {
    // Physical origin (0,0) is visual top-right (visualWidth, visualHeight)
    return { px: visualWidth - vx, py: visualHeight - vy, rotateDegrees: 180 };
  }
  if (angle === 270) {
    // Physical origin (0,0) is visual top-left (0, visualHeight)
    return { px: vy, py: visualWidth - vx, rotateDegrees: 270 };
  }
  return { px: vx, py: vy, rotateDegrees: 0 };
}

// ─────────────────────────────────────────────────────────
// COMPONENT IMPLEMENTATION
// ─────────────────────────────────────────────────────────

export function AddPageNumbersPdfTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [previewPageNum, setPreviewPageNum] = useState<number>(1);
  const [previewZoom, setPreviewZoom] = useState<number>(100);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [pdfjsLoaded, setPdfjsLoaded] = useState<boolean>(false);

  // Pagination Settings
  const [stylePreset, setStylePreset] = useState<string>("standard");
  const [prefixText, setPrefixText] = useState<string>("");
  const [suffixText, setSuffixText] = useState<string>("");

  const [positionPreset, setPositionPreset] = useState<string>("bottom-center");
  const [customMargin, setCustomMargin] = useState<number>(30);
  const [customOffsetX, setCustomOffsetX] = useState<number>(0);
  const [customOffsetY, setCustomOffsetY] = useState<number>(0);

  // Typography Settings
  const [fontFamily, setFontFamily] = useState<string>("sans-serif");
  const [fontSize, setFontSize] = useState<number>(12);
  const [fontColor, setFontColor] = useState<string>("#000000");
  const [fontOpacity, setFontOpacity] = useState<number>(100);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);

  // Range and Start Settings
  const [rangeType, setRangeType] = useState<string>("all");
  const [customRangeString, setCustomRangeString] = useState<string>("");
  const [startFromNumber, setStartFromNumber] = useState<number>(1);
  const [skipFirstPage, setSkipFirstPage] = useState<boolean>(false);
  const [skipLastPage, setSkipLastPage] = useState<boolean>(false);

  // Processing State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // History List
  const [historyList, setHistoryList] = useState<PageNumberHistoryItem[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const activeFile = files.find(f => f.id === activeFileId);

  // Script Loader for pdf.js via CDN
  const loadPdfJs = useCallback((): Promise<any> => {
    return new Promise((resolve, reject) => {
      const windowAny = window as any;
      if (windowAny.pdfjsLib) {
        resolve(windowAny.pdfjsLib);
        return;
      }
      const existingScript = document.getElementById("pdfjs-cdn-script");
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          if (windowAny.pdfjsLib) resolve(windowAny.pdfjsLib);
          else reject(new Error("pdfjsLib not found on window"));
        });
        existingScript.addEventListener("error", (e) => reject(e));
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
          reject(new Error("pdfjsLib failed to load on window"));
        }
      };
      script.onerror = (e) => reject(e);
      document.body.appendChild(script);
    });
  }, []);

  // Check saved preferences & history on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("pdf_page_number_prefs");
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        if (prefs.stylePreset) setStylePreset(prefs.stylePreset);
        if (prefs.positionPreset) setPositionPreset(prefs.positionPreset);
        if (prefs.customMargin) setCustomMargin(prefs.customMargin);
        if (prefs.fontFamily) setFontFamily(prefs.fontFamily);
        if (prefs.fontSize) setFontSize(prefs.fontSize);
        if (prefs.fontColor) setFontColor(prefs.fontColor);
        if (prefs.fontOpacity) setFontOpacity(prefs.fontOpacity);
        if (prefs.isBold !== undefined) setIsBold(prefs.isBold);
        if (prefs.isItalic !== undefined) setIsItalic(prefs.isItalic);
      } catch (e) {
        console.warn("Failed to parse settings cache", e);
      }
    }

    const savedHistory = localStorage.getItem("pdf_page_number_history");
    if (savedHistory) {
      try {
        setHistoryList(JSON.parse(savedHistory));
      } catch (e) {
        console.warn("Failed to parse history cache", e);
      }
    }
  }, []);

  // Save preferences when settings update
  useEffect(() => {
    const prefs = {
      stylePreset, positionPreset, customMargin, fontFamily,
      fontSize, fontColor, fontOpacity, isBold, isItalic
    };
    localStorage.setItem("pdf_page_number_prefs", JSON.stringify(prefs));
  }, [stylePreset, positionPreset, customMargin, fontFamily, fontSize, fontColor, fontOpacity, isBold, isItalic]);

  // File Upload Handlers
  const processFiles = async (list: FileList) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setProcessingStep("Loading rendering libraries...");
    setProcessingProgress(15);

    let pdfjs: any = null;
    try {
      pdfjs = await loadPdfJs();
      setPdfjsLoaded(true);
    } catch (e) {
      console.warn("Could not load PDF.js renderer:", e);
      setErrorMessage("Failed to load PDF rendering engines. Check your connection.");
      setIsProcessing(false);
      return;
    }

    const newUploaded: UploadedFile[] = [];
    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        continue;
      }

      setProcessingStep(`Parsing file metadata: ${file.name}`);
      setProcessingProgress(30 + Math.round((i / list.length) * 40));

      try {
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        // Load document bytes to check metadata & validation
        const pdfLibDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const count = pdfLibDoc.getPageCount();

        // Render in PDF.js as well
        const pdfjsDoc = await pdfjs.getDocument({ data: bytes }).promise;

        newUploaded.push({
          id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          size: file.size,
          pdfLibDoc,
          pdfjsDoc,
          pageCount: count,
          status: "ready",
          originalBytes: bytes
        });
      } catch (err: any) {
        console.warn("Failed to parse file", file.name, err.message || err);
        let msg = "Could not parse PDF. File might be corrupted.";
        if (err.message && err.message.includes("encrypted")) {
          msg = "Document is password protected. Please unlock it first.";
        }
        newUploaded.push({
          id: `doc-err-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          size: file.size,
          pdfLibDoc: null as any,
          pdfjsDoc: null as any,
          pageCount: 0,
          status: "error",
          errorMessage: msg,
          originalBytes: new Uint8Array()
        });
      }
    }

    if (newUploaded.length > 0) {
      setFiles(prev => [...prev, ...newUploaded]);
      const firstReady = newUploaded.find(f => f.status === "ready");
      if (firstReady && !activeFileId) {
        setActiveFileId(firstReady.id);
        setPreviewPageNum(1);
      }
    }

    setIsProcessing(false);
  };

  // Preview Page Drawing
  const renderPreviewPage = useCallback(async () => {
    if (!previewCanvasRef.current || !activeFile || !activeFile.pdfjsDoc || activeFile.status !== "ready") return;

    try {
      const page = await activeFile.pdfjsDoc.getPage(previewPageNum);
      const canvas = previewCanvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      const scale = (previewZoom / 100);
      const viewport = page.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (e) {
      console.warn("Failed to render preview page:", e);
    }
  }, [activeFile, previewPageNum, previewZoom]);

  useEffect(() => {
    renderPreviewPage();
  }, [renderPreviewPage, activeFileId, previewPageNum, previewZoom]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
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
    setFiles(prev => prev.filter(f => f.id !== id));
    if (activeFileId === id) {
      const remaining = files.filter(f => f.id !== id && f.status === "ready");
      if (remaining.length > 0) {
        setActiveFileId(remaining[0].id);
        setPreviewPageNum(1);
      } else {
        setActiveFileId(null);
      }
    }
  };

  const clearAllFiles = () => {
    setFiles([]);
    setActiveFileId(null);
    setPreviewPageNum(1);
  };

  // ─────────────────────────────────────────────────────────
  // COMPILATION PIPELINE
  // ─────────────────────────────────────────────────────────
  const compilePaginator = async () => {
    const readyFiles = files.filter(f => f.status === "ready");
    if (readyFiles.length === 0) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setProcessingProgress(10);
    setProcessingStep("Initializing PDF processor...");

    try {
      const processed: { name: string; bytes: Uint8Array }[] = [];

      for (let fileIdx = 0; fileIdx < readyFiles.length; fileIdx++) {
        const item = readyFiles[fileIdx];
        setProcessingStep(`Processing: ${item.name}`);
        setProcessingProgress(15 + Math.round((fileIdx / readyFiles.length) * 70));
        await new Promise(r => setTimeout(r, 10));

        // Load fresh document instance to avoid altering original state reference
        const pdfDoc = await PDFDocument.load(item.originalBytes, { ignoreEncryption: true });
        const totalPages = pdfDoc.getPageCount();

        // 1) Match Font
        let fontName: StandardFonts;
        if (fontFamily === "serif") {
          if (isBold && isItalic) fontName = StandardFonts.TimesRomanBoldItalic;
          else if (isBold) fontName = StandardFonts.TimesRomanBold;
          else if (isItalic) fontName = StandardFonts.TimesRomanItalic;
          else fontName = StandardFonts.TimesRoman;
        } else if (fontFamily === "monospace") {
          if (isBold && isItalic) fontName = StandardFonts.CourierBoldOblique;
          else if (isBold) fontName = StandardFonts.CourierBold;
          else if (isItalic) fontName = StandardFonts.CourierOblique;
          else fontName = StandardFonts.Courier;
        } else {
          if (isBold && isItalic) fontName = StandardFonts.HelveticaBoldOblique;
          else if (isBold) fontName = StandardFonts.HelveticaBold;
          else if (isItalic) fontName = StandardFonts.HelveticaOblique;
          else fontName = StandardFonts.Helvetica;
        }
        const embeddedFont = await pdfDoc.embedFont(fontName);

        // 2) Parse Page Targeting Range
        let pagesToNumber: number[] = [];
        if (rangeType === "odd") {
          pagesToNumber = Array.from({ length: totalPages }, (_, i) => i).filter(idx => idx % 2 === 0); // 1st page is odd (0-idx)
        } else if (rangeType === "even") {
          pagesToNumber = Array.from({ length: totalPages }, (_, i) => i).filter(idx => idx % 2 !== 0); // 2nd page is even (1-idx)
        } else if (rangeType === "range") {
          pagesToNumber = parsePageRange(customRangeString, totalPages);
        } else {
          pagesToNumber = Array.from({ length: totalPages }, (_, i) => i);
        }

        // Apply margins exclusions
        if (skipFirstPage) {
          pagesToNumber = pagesToNumber.filter(idx => idx !== 0);
        }
        if (skipLastPage) {
          pagesToNumber = pagesToNumber.filter(idx => idx !== totalPages - 1);
        }

        // 3) Embed Numbers
        for (let i = 0; i < totalPages; i++) {
          if (!pagesToNumber.includes(i)) continue;

          // Find the order index in targeted list for sequential numbers
          const pageOrderIndex = pagesToNumber.indexOf(i);
          const formattedNumber = formatPageString(
            pageOrderIndex,
            startFromNumber,
            stylePreset,
            totalPages,
            prefixText,
            suffixText
          );

          const page = pdfDoc.getPage(i);
          const { width: pageWidth, height: pageHeight } = page.getSize();
          const rotationAngle = page.getRotation().angle;

          // Swap logic for rotated page visual boundaries
          const isLandscape = rotationAngle === 90 || rotationAngle === 270;
          const visualWidth = isLandscape ? pageHeight : pageWidth;
          const visualHeight = isLandscape ? pageWidth : pageHeight;

          // Compute size of text box
          const textWidth = embeddedFont.widthOfTextAtSize(formattedNumber, fontSize);
          const textHeight = fontSize;

          // Calculate visual (vx, vy) based on margins and offsets
          let vx = 0;
          let vy = 0;

          switch (positionPreset) {
            case "top-left":
              vx = customMargin;
              vy = visualHeight - textHeight - customMargin;
              break;
            case "top-center":
              vx = (visualWidth - textWidth) / 2;
              vy = visualHeight - textHeight - customMargin;
              break;
            case "top-right":
              vx = visualWidth - textWidth - customMargin;
              vy = visualHeight - textHeight - customMargin;
              break;
            case "bottom-left":
              vx = customMargin;
              vy = customMargin;
              break;
            case "bottom-right":
              vx = visualWidth - textWidth - customMargin;
              vy = customMargin;
              break;
            case "bottom-center":
            default:
              vx = (visualWidth - textWidth) / 2;
              vy = customMargin;
              break;
          }

          // Apply offset shifts
          vx += customOffsetX;
          vy += customOffsetY;

          // Convert visual coordinates to physical ones
          const { px, py, rotateDegrees } = getPhysicalCoordsAndRotation(
            vx, vy, visualWidth, visualHeight, rotationAngle
          );

          const r = parseInt(fontColor.slice(1, 3), 16) || 0;
          const g = parseInt(fontColor.slice(3, 5), 16) || 0;
          const b = parseInt(fontColor.slice(5, 7), 16) || 0;

          page.drawText(formattedNumber, {
            x: px,
            y: py,
            size: fontSize,
            font: embeddedFont,
            color: rgb(r / 255, g / 255, b / 255),
            opacity: fontOpacity / 100,
            rotate: degrees(rotateDegrees)
          });
        }

        const compiledBytes = await pdfDoc.save();
        
        let outName = item.name.replace(/\.[^/.]+$/, "");
        outName = `${outName}_numbered.pdf`;

        processed.push({ name: outName, bytes: compiledBytes });
      }

      setProcessingStep("Packaging files for download...");
      setProcessingProgress(90);
      await new Promise(r => setTimeout(r, 10));

      let totalBytesSize = 0;
      if (processed.length === 1) {
        const doc = processed[0];
        const blob = new Blob([doc.bytes as any], { type: "application/pdf" });
        totalBytesSize = blob.size;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = doc.name;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        const zip = new JSZip();
        processed.forEach(doc => {
          zip.file(doc.name, doc.bytes);
        });
        const zipBlob = await zip.generateAsync({ type: "blob" });
        totalBytesSize = zipBlob.size;
        const url = URL.createObjectURL(zipBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "numbered_pdfs.zip";
        link.click();
        URL.revokeObjectURL(url);
      }

      // Add to history list
      const newHistoryItem: PageNumberHistoryItem = {
        id: `pgh-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        filesCount: readyFiles.length,
        filesList: readyFiles.map(rf => rf.name),
        totalSize: totalBytesSize,
        style: stylePreset,
        position: positionPreset,
        font: fontFamily
      };

      setHistoryList(prev => {
        const next = [newHistoryItem, ...prev].slice(0, 30);
        localStorage.setItem("pdf_page_number_history", JSON.stringify(next));
        return next;
      });

      setProcessingProgress(100);
      setIsProcessing(false);
    } catch (e: any) {
      console.warn("Compilation failed:", e);
      setErrorMessage(e.message || "An unexpected error occurred during page numbering.");
      setIsProcessing(false);
    }
  };

  // Render Visual Overlay values in Preview Pane
  const getVisualOverlayStyle = () => {
    if (!activeFile || activeFile.status !== "ready") return {};

    const baseMargin = customMargin;
    const sizeOffset = fontSize;

    let styleObj: React.CSSProperties = {
      position: "absolute",
      fontSize: `${fontSize}px`,
      color: fontColor,
      opacity: fontOpacity / 100,
      fontFamily: fontFamily === "serif" ? "Georgia, serif" : fontFamily === "monospace" ? "monospace" : "sans-serif",
      fontWeight: isBold ? "bold" : "normal",
      fontStyle: isItalic ? "italic" : "normal",
      pointerEvents: "none",
      transition: "all 0.1s ease",
      whiteSpace: "nowrap"
    };

    const topPos = `calc(${baseMargin}px - ${customOffsetY}px)`;
    const bottomPos = `calc(${baseMargin}px + ${customOffsetY}px)`;
    const leftPos = `calc(${baseMargin}px + ${customOffsetX}px)`;
    const rightPos = `calc(${baseMargin}px - ${customOffsetX}px)`;

    switch (positionPreset) {
      case "top-left":
        styleObj.top = topPos;
        styleObj.left = leftPos;
        break;
      case "top-center":
        styleObj.top = topPos;
        styleObj.left = "50%";
        styleObj.transform = `translateX(-50%) translate(${customOffsetX}px)`;
        break;
      case "top-right":
        styleObj.top = topPos;
        styleObj.right = rightPos;
        break;
      case "bottom-left":
        styleObj.bottom = bottomPos;
        styleObj.left = leftPos;
        break;
      case "bottom-right":
        styleObj.bottom = bottomPos;
        styleObj.right = rightPos;
        break;
      case "bottom-center":
      default:
        styleObj.bottom = bottomPos;
        styleObj.left = "50%";
        styleObj.transform = `translateX(-50%) translate(${customOffsetX}px)`;
        break;
    }

    return styleObj;
  };

  const getPageNumberPreviewText = (): string => {
    if (!activeFile) return "1";

    let targetIndices: number[] = [];
    if (rangeType === "odd") {
      targetIndices = Array.from({ length: activeFile.pageCount }, (_, i) => i).filter(idx => idx % 2 === 0);
    } else if (rangeType === "even") {
      targetIndices = Array.from({ length: activeFile.pageCount }, (_, i) => i).filter(idx => idx % 2 !== 0);
    } else if (rangeType === "range") {
      targetIndices = parsePageRange(customRangeString, activeFile.pageCount);
    } else {
      targetIndices = Array.from({ length: activeFile.pageCount }, (_, i) => i);
    }

    if (skipFirstPage) targetIndices = targetIndices.filter(idx => idx !== 0);
    if (skipLastPage) targetIndices = targetIndices.filter(idx => idx !== activeFile.pageCount - 1);

    const zeroIndexedCurrent = previewPageNum - 1;
    if (!targetIndices.includes(zeroIndexedCurrent)) {
      return ""; // No number visual overlay on skipped page
    }

    const relativeOrderIndex = targetIndices.indexOf(zeroIndexedCurrent);
    return formatPageString(
      relativeOrderIndex,
      startFromNumber,
      stylePreset,
      activeFile.pageCount,
      prefixText,
      suffixText
    );
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const readyFiles = files.filter(f => f.status === "ready");

  return (
    <div className="w-full">
      {/* ── TOOL HEADER ── */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings size={20} className="text-[#518231]" />
            Insert PDF Page Numbers
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sequence, format, style, and print page coordinates securely inside your browser.
          </p>
        </div>

        {files.length > 0 && (
          <button
            onClick={clearAllFiles}
            className="self-start px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Trash2 size={13} />
            Clear All Files
          </button>
        )}
      </div>

      {files.length === 0 ? (
        // UPLOADER DROPZONE
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? "border-[#518231] bg-green-50/15 dark:bg-green-950/5"
              : "border-slate-300 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231] bg-white dark:bg-slate-900 shadow-sm"
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
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#518231]/10 flex items-center justify-center text-[#518231] shadow-xs">
              <Upload size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Drag & Drop PDF files here, or click to browse
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                Maximum file size: 100MB. Batch processing supported. Files never leave your browser.
              </p>
            </div>
          </div>
        </div>
      ) : (
        // EDITOR PANEL
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Dashboard Controls */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Uploaded Files Selection */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <FileText size={14} className="text-[#518231]" />
                1. Uploaded Documents ({files.length})
              </h3>

              <div className="space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar pr-1">
                {files.map(pdf => (
                  <div
                    key={pdf.id}
                    onClick={() => {
                      if (pdf.status === "ready") {
                        setActiveFileId(pdf.id);
                        setPreviewPageNum(1);
                      }
                    }}
                    className={`flex items-center justify-between gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      pdf.id === activeFileId
                        ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10"
                        : "border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">
                        <FileText size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[170px]">
                          {pdf.name}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                          {formatBytes(pdf.size)} • {pdf.status === "ready" ? `${pdf.pageCount} pages` : pdf.status === "loading" ? "Loading..." : "Error"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {pdf.status === "error" && (
                        <div className="text-red-500" title={pdf.errorMessage}>
                          <AlertCircle size={14} />
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(pdf.id);
                        }}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-1.5 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:border-[#518231] hover:text-[#518231] dark:hover:text-[#518231] transition-all flex items-center justify-center gap-1.5"
                >
                  <Upload size={13} />
                  Add More Files
                </button>
              </div>
            </div>

            {/* Pagination Style Settings */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                <Type size={14} className="text-[#518231]" />
                2. Style Settings
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Number Format
                  </label>
                  <select
                    value={stylePreset}
                    onChange={(e) => setStylePreset(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#518231]"
                  >
                    <option value="standard">1, 2, 3</option>
                    <option value="padded">01, 02, 03</option>
                    <option value="prefix">Page 1</option>
                    <option value="of-total">Page 1 of X</option>
                    <option value="roman-upper">I, II, III (Roman)</option>
                    <option value="roman-lower">i, ii, iii (Roman)</option>
                    <option value="alpha">A, B, C (Alpha)</option>
                    <option value="alpha-lower">a, b, c (Alpha)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Position Preset
                  </label>
                  <select
                    value={positionPreset}
                    onChange={(e) => setPositionPreset(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#518231]"
                  >
                    <option value="top-left">Top Left</option>
                    <option value="top-center">Top Center</option>
                    <option value="top-right">Top Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-center">Bottom Center</option>
                    <option value="bottom-right">Bottom Right</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Text Prefix
                  </label>
                  <input
                    type="text"
                    value={prefixText}
                    onChange={(e) => setPrefixText(e.target.value)}
                    placeholder="e.g. Doc -"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#518231]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Text Suffix
                  </label>
                  <input
                    type="text"
                    value={suffixText}
                    onChange={(e) => setSuffixText(e.target.value)}
                    placeholder="e.g. - Draft"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#518231]"
                  />
                </div>
              </div>
            </div>

            {/* Typography controls */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                <AlignLeft size={14} className="text-[#518231]" />
                3. Typography & Spacing
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Font Family
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#518231]"
                  >
                    <option value="sans-serif">Helvetica</option>
                    <option value="serif">Times Roman</option>
                    <option value="monospace">Courier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Font Size (pt)
                  </label>
                  <input
                    type="number"
                    min="6"
                    max="48"
                    value={fontSize}
                    onChange={(e) => setFontSize(Math.max(6, parseInt(e.target.value, 10) || 12))}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#518231]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Color picker
                  </label>
                  <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-950">
                    <input
                      type="color"
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                      className="w-7 h-7 rounded-md cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-[10px] font-bold font-mono text-slate-600 dark:text-slate-400 select-all">
                      {fontColor.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Opacity and Margin sliders */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    <span>Opacity</span>
                    <span className="text-[#518231] font-semibold">{fontOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={fontOpacity}
                    onChange={(e) => setFontOpacity(parseInt(e.target.value, 10))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    <span>Margin Spacing</span>
                    <span className="text-[#518231] font-semibold">{customMargin} px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={customMargin}
                    onChange={(e) => setCustomMargin(parseInt(e.target.value, 10))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                </div>

                {/* X/Y Custom Shifts */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                      X Offset Shift ({customOffsetX > 0 ? `+${customOffsetX}` : customOffsetX}px)
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={customOffsetX}
                      onChange={(e) => setCustomOffsetX(parseInt(e.target.value, 10))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                      Y Offset Shift ({customOffsetY > 0 ? `+${customOffsetY}` : customOffsetY}px)
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={customOffsetY}
                      onChange={(e) => setCustomOffsetY(parseInt(e.target.value, 10))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                    />
                  </div>
                </div>

                {/* Bold & Italic checkboxes */}
                <div className="flex items-center gap-5 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={isBold}
                      onChange={(e) => setIsBold(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-[#518231] focus:ring-[#518231]/50 w-4 h-4 cursor-pointer"
                    />
                    Bold
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={isItalic}
                      onChange={(e) => setIsItalic(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-[#518231] focus:ring-[#518231]/50 w-4 h-4 cursor-pointer"
                    />
                    Italic
                  </label>
                </div>
              </div>
            </div>

            {/* Target Page Range and Start Indices */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles size={14} className="text-[#518231]" />
                4. Ranges & Offset Settings
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Apply to Pages
                  </label>
                  <select
                    value={rangeType}
                    onChange={(e) => setRangeType(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#518231]"
                  >
                    <option value="all">All Pages</option>
                    <option value="odd">Odd Pages Only</option>
                    <option value="even">Even Pages Only</option>
                    <option value="range">Custom Page Range</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Start From Number
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={startFromNumber}
                    onChange={(e) => setStartFromNumber(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#518231]"
                  />
                </div>
              </div>

              {rangeType === "range" && (
                <div className="mb-3">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Custom Range
                  </label>
                  <input
                    type="text"
                    value={customRangeString}
                    onChange={(e) => setCustomRangeString(e.target.value)}
                    placeholder="e.g. 1-5, 8, 10-12"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#518231]"
                  />
                </div>
              )}

              {/* Cover/Footer exclusions */}
              <div className="flex flex-col gap-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={skipFirstPage}
                    onChange={(e) => setSkipFirstPage(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-700 text-[#518231] focus:ring-[#518231]/50 w-4 h-4 cursor-pointer"
                  />
                  Skip first page (Cover sheet)
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={skipLastPage}
                    onChange={(e) => setSkipLastPage(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-700 text-[#518231] focus:ring-[#518231]/50 w-4 h-4 cursor-pointer"
                  />
                  Skip last page (Back sheet)
                </label>
              </div>
            </div>

            {/* Run Action */}
            <div className="pt-2">
              <button
                disabled={readyFiles.length === 0 || isProcessing}
                onClick={compilePaginator}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-[#518231] hover:bg-[#436e29] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing PDFs...
                  </>
                ) : (
                  <>
                    <FileDown size={16} />
                    Add Page Numbers ({readyFiles.length} file{readyFiles.length > 1 ? "s" : ""})
                  </>
                )}
              </button>
            </div>

          </div>

          {/* RIGHT: Live Preview Canvas Workspace */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col items-center">
            
            {/* Top Workspace Bar */}
            <div className="w-full border-b border-slate-100 dark:border-slate-800 pb-3 mb-4 flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Live Preview:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                  {activeFile ? activeFile.name : "Select a file"}
                </span>
              </div>

              {activeFile && (
                <div className="flex items-center gap-2">
                  <button
                    disabled={previewPageNum <= 1}
                    onClick={() => setPreviewPageNum(prev => Math.max(1, prev - 1))}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 select-none">
                    Page {previewPageNum} of {activeFile.pageCount}
                  </span>
                  <button
                    disabled={previewPageNum >= activeFile.pageCount}
                    onClick={() => setPreviewPageNum(prev => Math.min(activeFile.pageCount, prev + 1))}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPreviewZoom(prev => Math.max(50, prev - 10))}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={15} />
                </button>
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 w-10 text-center">
                  {previewZoom}%
                </span>
                <button
                  onClick={() => setPreviewZoom(prev => Math.min(180, prev + 10))}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={15} />
                </button>
                <button
                  onClick={() => setPreviewZoom(100)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  title="Reset Zoom"
                >
                  <Maximize size={15} />
                </button>
              </div>
            </div>

            {/* PDF Canvas with Visual Overlay */}
            {activeFile ? (
              <div className="relative border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950 p-2 shadow-inner max-w-full flex items-center justify-center">
                
                {/* Visual Overlay representation */}
                <div className="relative" style={{ display: "inline-block" }}>
                  <canvas ref={previewCanvasRef} className="shadow-md max-w-full block" />
                  
                  {/* Dynamic HTML Page Number Visual Overlay */}
                  <div style={getVisualOverlayStyle()}>
                    {getPageNumberPreviewText()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full py-20 flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500 gap-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <FileText size={40} className="stroke-1 text-slate-300 dark:text-slate-700" />
                <p className="text-xs font-semibold">
                  Upload a PDF document to activate interactive live previews.
                </p>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ── LOADER OVERLAY ── */}
      {isProcessing && (
        <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm w-full rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <Loader2 className="animate-spin text-[#518231] mx-auto" size={36} />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {processingStep || "Executing PDF Pipeline..."}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Please wait. All compilations happen locally in memory.
              </p>
            </div>
            
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#518231] h-1.5 transition-all duration-200 ease-out"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
              {processingProgress}% completed
            </span>
          </div>
        </div>
      )}

      {/* ── RECENT SESSION HISTORY ── */}
      {historyList.length > 0 && (
        <div className="mt-8 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-900/50 rounded-xl p-4">
          <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <History size={13} />
            Recent Pagination History
          </h4>

          <div className="space-y-2">
            {historyList.map(item => (
              <div 
                key={item.id}
                className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 p-3 bg-white dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/80 rounded-lg text-xs"
              >
                <div>
                  <p className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-md">
                    {item.filesList.join(", ")}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                    Style: <strong className="text-slate-500 dark:text-slate-400">{item.style}</strong> • Position: <strong className="text-slate-500 dark:text-slate-400">{item.position}</strong> • Size: <strong className="text-slate-500 dark:text-slate-400">{formatBytes(item.totalSize)}</strong> • {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-green-600 dark:text-green-400 flex items-center gap-1 font-bold text-[10px] uppercase tracking-wide">
                  <Check size={12} /> Processed
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
