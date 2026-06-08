"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download,
  RefreshCw, History, ShieldCheck, Check, Columns, Layers, CheckSquare,
  ZoomIn, ZoomOut, Plus, X, List, Grid, Filter, Bookmark, Keyboard, ShieldAlert,
  Lock, Unlock, Copy, FileJson, Sparkles, BookOpen, AlertTriangle, HelpCircle,
  Eye, FileOutput, Play
} from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
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

// --- Custom Presentation Types ---

interface ParsedTextRun {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: number; // pt
  fontColor?: string;
}

interface ParsedParagraph {
  alignHorizontal?: "left" | "center" | "right" | "justify";
  textRuns: ParsedTextRun[];
}

interface ParsedTableCell {
  textParagraphs: ParsedParagraph[];
  fillColor?: string;
  rowSpan?: number;
  colSpan?: number;
  isMaster?: boolean;
}

interface ParsedTable {
  rows: ParsedTableCell[][];
  colWidths: number[]; // pixels
  rowHeights: number[]; // pixels
}

interface ParsedChart {
  title?: string;
  type: 'bar' | 'pie' | 'line' | 'area';
  series: string[];
  categories: string[];
  data: number[][]; // series x categories
}

interface ParsedElement {
  id: string;
  type: 'shape' | 'image' | 'table' | 'chart';
  x: number; // pixels
  y: number; // pixels
  width: number; // pixels
  height: number; // pixels
  shapeType?: string;
  fillColor?: string;
  borderColor?: string;
  borderWidth?: number;
  textParagraphs?: ParsedParagraph[];
  imageSrc?: string;
  tableData?: ParsedTable;
  chartData?: ParsedChart;
}

interface ParsedSlide {
  slideNumber: number;
  width: number;
  height: number;
  background?: string;
  elements: ParsedElement[];
  notes?: string;
}

interface ConversionHistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
  originalSize: number;
  pdfSize: number;
  pageCount: number;
  mode: "standard" | "high" | "print" | "compact";
  slideCount: number;
}

const PDFJS_VERSION = '3.11.174';

const PAGE_SIZES = [
  { id: "LETTER", name: "Letter (8.5 x 11in)", width: 612, height: 792 },
  { id: "A4", name: "A4 (210 x 297mm)", width: 595, height: 842 },
  { id: "A3", name: "A3 (297 x 420mm)", width: 842, height: 1191 },
  { id: "LEGAL", name: "Legal (8.5 x 14in)", width: 612, height: 1008 }
];

const MARGIN_SIZES = [
  { id: "none", name: "No Margins", value: 0 },
  { id: "narrow", name: "Narrow (0.25 inch)", value: 18 },
  { id: "normal", name: "Normal (0.5 inch)", value: 36 },
  { id: "wide", name: "Wide (1 inch)", value: 72 }
];

// Helper to look up tags in a namespace-agnostic way
const getElementsByTagName = (element: Document | Element, tagName: string): Element[] => {
  const localName = tagName.includes(':') ? tagName.split(':')[1] : tagName;
  const list = element.getElementsByTagName('*');
  const results: Element[] = [];
  for (let i = 0; i < list.length; i++) {
    const node = list[i];
    if (node.localName === localName) {
      results.push(node);
    }
  }
  return results;
};

// Render charts as SVGs for high resolution snapshot support
const renderChartAsSvg = (chart: ParsedChart, width: number, height: number) => {
  const { title, type, series, categories, data } = chart;
  const colors = ["#4f46e5", "#10b981", "#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6"];
  
  if (type === 'pie') {
    const serData = data[0] || [];
    const total = serData.reduce((a, b) => a + b, 0) || 1;
    let accumulatedAngle = 0;
    const slices = serData.map((val, idx) => {
      const percentage = val / total;
      const angle = percentage * 360;
      const x1 = 50 + 40 * Math.cos((accumulatedAngle - 90) * Math.PI / 180);
      const y1 = 50 + 40 * Math.sin((accumulatedAngle - 90) * Math.PI / 180);
      accumulatedAngle += angle;
      const x2 = 50 + 40 * Math.cos((accumulatedAngle - 90) * Math.PI / 180);
      const y2 = 50 + 40 * Math.sin((accumulatedAngle - 90) * Math.PI / 180);
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathD = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      return (
        <path key={idx} d={pathD} fill={colors[idx % colors.length]} stroke="#ffffff" strokeWidth="0.5" />
      );
    });
    
    return (
      <div className="w-full h-full p-2 bg-white rounded border border-slate-100 dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center justify-between overflow-hidden">
        <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate w-full text-center">{title || "Pie Chart"}</div>
        <div className="flex-1 flex items-center justify-center min-h-0 w-full gap-2">
          <svg viewBox="0 0 100 100" className="h-full max-h-[120px] max-w-[120px]">
            {slices}
          </svg>
          <div className="text-[9px] text-slate-500 dark:text-slate-400 flex flex-col justify-center gap-0.5 overflow-hidden max-w-[50%]">
            {categories.slice(0, 4).map((cat, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="w-2 h-2 shrink-0 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
                <span className="truncate">{cat}: {serData[idx] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (type === 'bar') {
    const serData = data[0] || [];
    const maxVal = Math.max(...serData, 1);
    const bars = serData.map((val, idx) => {
      const hPercent = (val / maxVal) * 70;
      return (
        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full relative group">
          <div className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mb-0.5">{val}</div>
          <div 
            className="w-full rounded-t transition-all" 
            style={{ 
              height: `${hPercent}%`, 
              backgroundColor: colors[idx % colors.length] 
            }} 
          />
          <div className="text-[8px] text-slate-500 dark:text-slate-400 truncate max-w-full mt-1 text-center w-full">{categories[idx] || ""}</div>
        </div>
      );
    });
    
    return (
      <div className="w-full h-full p-2.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden">
        <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate w-full mb-1">{title || "Bar Chart"}</div>
        <div className="flex-1 flex items-end justify-between gap-1.5 min-h-0 pb-1 border-b border-slate-200 dark:border-slate-800">
          {bars}
        </div>
        <div className="flex justify-center gap-2 mt-1 shrink-0">
          {series.slice(0, 3).map((serName, idx) => (
            <div key={idx} className="flex items-center gap-0.5 text-[8px] text-slate-500 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
              <span className="truncate">{serName}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Line / Area Default Fallback
  return (
    <div className="w-full h-full p-2.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate w-full mb-1">{title || "Presentation Chart"}</div>
      <div className="flex-1 flex items-center justify-center w-full min-h-0 text-[9px] text-slate-400 dark:text-slate-500 italic">
        {type.toUpperCase()} Visual Layout ({categories.length} segments)
      </div>
    </div>
  );
};

export function PowerPointToPdfTool() {
  const [isMounted, setIsMounted] = useState(false);

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [isBatchMode, setIsBatchMode] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "reading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Parsed slides data
  const [parsedSlides, setParsedSlides] = useState<ParsedSlide[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [selectedSlides, setSelectedSlides] = useState<Record<number, boolean>>({}); // index -> boolean

  // Preview Settings
  const [estimatedPages, setEstimatedPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1.0);

  // Settings
  const [conversionMode, setConversionMode] = useState<"standard" | "high" | "print" | "compact">("standard");
  const [pageSize, setPageSize] = useState<string>("LETTER");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape");
  const [marginType, setMarginType] = useState<string>("none");
  const [slidesPerPage, setSlidesPerPage] = useState<"1" | "2" | "4" | "6" | "notes">("1");
  const [includeNotes, setIncludeNotes] = useState<boolean>(false);
  const [slideRangeString, setSlideRangeString] = useState<string>("");

  // Headers & Footers
  const [customHeader, setCustomHeader] = useState<string>("");
  const [customFooter, setCustomFooter] = useState<string>("");
  const [includePageNumbers, setIncludePageNumbers] = useState<boolean>(true);
  const [includeDateTime, setIncludeDateTime] = useState<boolean>(false);
  const [includeFileName, setIncludeFileName] = useState<boolean>(true);

  // Watermarks
  const [enableWatermark, setEnableWatermark] = useState<boolean>(false);
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState<string>("CONFIDENTIAL");
  const [watermarkFontSize, setWatermarkFontSize] = useState<number>(40);
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.15);
  const [watermarkRotation, setWatermarkRotation] = useState<number>(45);
  const [watermarkColor, setWatermarkColor] = useState<string>("#ff0000");
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [watermarkImagePreview, setWatermarkImagePreview] = useState<string | null>(null);

  // Conversion Progress & Output
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [progressMsg, setProgressMsg] = useState<string>("");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [outputPdfUrl, setOutputPdfUrl] = useState<string | null>(null);
  const [outputPdfBlob, setOutputPdfBlob] = useState<Blob | null>(null);
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);

  // Local Preset History
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // DOM Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const watermarkImageInputRef = useRef<HTMLInputElement>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);

  const [dragActive, setDragActive] = useState<boolean>(false);

  // Hydration safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Local storage logs
  useEffect(() => {
    if (!isMounted) return;
    const saved = localStorage.getItem("ppt_to_pdf_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to load history items", e);
      }
    }
  }, [isMounted]);

  const saveHistoryItem = (pdfBlob: Blob, pageCount: number) => {
    if (!file) return;
    const historyItem: ConversionHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      fileName: file.name,
      originalSize: file.size,
      pdfSize: pdfBlob.size,
      pageCount: pageCount || 1,
      mode: conversionMode,
      slideCount: parsedSlides.length
    };
    setHistory(prev => {
      const updated = [historyItem, ...prev].slice(0, 10);
      localStorage.setItem("ppt_to_pdf_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("ppt_to_pdf_history");
  };

  // Load PDFJS CDN
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
      script.onerror = () => reject(new Error("Failed to load PDF.js from CDN"));
      document.head.appendChild(script);
    });
  };

  // Parse custom slide ranges (e.g. "1-3, 5")
  const parseRangeString = (rangeStr: string, maxSlides: number): Record<number, boolean> => {
    const activeMap: Record<number, boolean> = {};
    if (!rangeStr.trim()) {
      for (let i = 0; i < maxSlides; i++) activeMap[i] = true;
      return activeMap;
    }
    
    const parts = rangeStr.split(",");
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [startStr, endStr] = trimmed.split("-");
        const start = parseInt(startStr.trim());
        const end = parseInt(endStr.trim());
        if (!isNaN(start) && !isNaN(end)) {
          const sIdx = Math.max(1, start) - 1;
          const eIdx = Math.min(maxSlides, end) - 1;
          for (let i = sIdx; i <= eIdx; i++) {
            activeMap[i] = true;
          }
        }
      } else {
        const val = parseInt(trimmed);
        if (!isNaN(val) && val >= 1 && val <= maxSlides) {
          activeMap[val - 1] = true;
        }
      }
    });
    return activeMap;
  };

  // Parse PowerPoint file client-side
  const parsePowerPointDocument = async (targetFile: File) => {
    setUploadStatus("reading");
    setErrorMessage(null);
    setOutputPdfUrl(null);
    setOutputPdfBlob(null);
    setPdfjsDoc(null);
    setEstimatedPages(0);
    setParsedSlides([]);

    try {
      const isPptx = targetFile.name.endsWith(".pptx");
      const isPpt = targetFile.name.endsWith(".ppt");

      if (isPpt) {
        throw new Error("Legacy binary .ppt conversion is not supported natively in browser. Please save the presentation as .pptx first.");
      }

      if (!isPptx) {
        throw new Error("Unsupported format. Please upload a valid .pptx file.");
      }

      const arrayBuffer = await targetFile.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      const parser = new DOMParser();

      // Read presentation dimensions
      let slideWidth = 960; // baseline widescreen pixels
      let slideHeight = 540;
      const presXmlStr = await zip.file("ppt/presentation.xml")?.async("text");
      if (presXmlStr) {
        const presDoc = parser.parseFromString(presXmlStr, "application/xml");
        const sldSz = getElementsByTagName(presDoc, "sldSz")[0];
        if (sldSz) {
          const cx = parseInt(sldSz.getAttribute("cx") || "12192000");
          const cy = parseInt(sldSz.getAttribute("cy") || "6858000");
          slideWidth = Math.round(cx / 9525);
          slideHeight = Math.round(cy / 9525);
        }
      }

      // Read slides
      const slideKeys = Object.keys(zip.files).filter(k => k.startsWith("ppt/slides/slide") && k.endsWith(".xml"));
      slideKeys.sort((a, b) => {
        const numA = parseInt(a.replace(/[^0-9]/g, ''));
        const numB = parseInt(b.replace(/[^0-9]/g, ''));
        return numA - numB;
      });

      const slidesList: ParsedSlide[] = [];

      for (let idx = 0; idx < slideKeys.length; idx++) {
        const slideKey = slideKeys[idx];
        const slideNum = slideKey.replace(/[^0-9]/g, '');
        
        // Relationships map to extract graphics & charts
        const relsKey = `ppt/slides/_rels/slide${slideNum}.xml.rels`;
        const relsFile = zip.file(relsKey);
        const relsMap = new Map<string, string>();
        if (relsFile) {
          const relsXmlStr = await relsFile.async("text");
          const relsDoc = parser.parseFromString(relsXmlStr, "application/xml");
          const relationships = getElementsByTagName(relsDoc, "Relationship");
          for (const rel of relationships) {
            const id = rel.getAttribute("Id");
            const target = rel.getAttribute("Target");
            if (id && target) {
              relsMap.set(id, target);
            }
          }
        }

        // Speaker notes slide extraction
        let speakerNotes = "";
        const notesFile = zip.file(`ppt/notesSlides/notesSlide${slideNum}.xml`);
        if (notesFile) {
          const notesXmlStr = await notesFile.async("text");
          const notesDoc = parser.parseFromString(notesXmlStr, "application/xml");
          const tNodes = getElementsByTagName(notesDoc, "t");
          speakerNotes = tNodes.map(node => node.textContent || "").join(" ").trim();
        }

        // Parse slide elements
        const slideXmlStr = await zip.file(slideKey)?.async("text");
        if (!slideXmlStr) continue;
        const slideDoc = parser.parseFromString(slideXmlStr, "application/xml");

        // Parse slide background color
        let slideBgColor = "#ffffff";
        const bgPrs = getElementsByTagName(slideDoc, "bgPr");
        if (bgPrs.length > 0) {
          const solidFills = getElementsByTagName(bgPrs[0], "solidFill");
          if (solidFills.length > 0) {
            const srgb = getElementsByTagName(solidFills[0], "srgbClr");
            if (srgb.length > 0) slideBgColor = "#" + (srgb[0].getAttribute("val") || "ffffff");
          }
        }

        const elements: ParsedElement[] = [];

        // Parse standard shapes
        const shapes = getElementsByTagName(slideDoc, "sp");
        for (const sp of shapes) {
          const xfrms = getElementsByTagName(sp, "xfrm");
          if (xfrms.length === 0) continue;
          const xfrm = xfrms[0];
          const offs = getElementsByTagName(xfrm, "off");
          const exts = getElementsByTagName(xfrm, "ext");
          if (offs.length === 0 || exts.length === 0) continue;
          
          const x = Math.round(parseInt(offs[0].getAttribute("x") || "0") / 9525);
          const y = Math.round(parseInt(offs[0].getAttribute("y") || "0") / 9525);
          const width = Math.round(parseInt(exts[0].getAttribute("cx") || "0") / 9525);
          const height = Math.round(parseInt(exts[0].getAttribute("cy") || "0") / 9525);
          
          if (width === 0 || height === 0) continue;

          // Fill color
          let fillColor = "transparent";
          const solidFills = getElementsByTagName(sp, "solidFill");
          if (solidFills.length > 0) {
            const srgb = getElementsByTagName(solidFills[0], "srgbClr");
            if (srgb.length > 0) fillColor = "#" + (srgb[0].getAttribute("val") || "ffffff");
            else {
              const scheme = getElementsByTagName(solidFills[0], "schemeClr");
              if (scheme.length > 0) {
                const val = scheme[0].getAttribute("val");
                if (val === "bg1") fillColor = "#ffffff";
                else if (val === "tx1") fillColor = "#1e293b";
                else if (val === "accent1") fillColor = "#4f46e5";
                else if (val === "accent2") fillColor = "#f59e0b";
                else fillColor = "#f1f5f9";
              }
            }
          }

          // Borders
          let borderColor = "transparent";
          let borderWidth = 0;
          const lns = getElementsByTagName(sp, "ln");
          if (lns.length > 0) {
            const ln = lns[0];
            const lnFills = getElementsByTagName(ln, "solidFill");
            if (lnFills.length > 0) {
              const srgb = getElementsByTagName(lnFills[0], "srgbClr");
              borderColor = srgb.length > 0 ? "#" + srgb[0].getAttribute("val") : "#cbd5e1";
            }
            borderWidth = Math.round(parseInt(ln.getAttribute("w") || "9525") / 9525);
          }

          // Text Paragraphs
          const textParagraphs: ParsedParagraph[] = [];
          const txBodys = getElementsByTagName(sp, "txBody");
          if (txBodys.length > 0) {
            const paragraphs = getElementsByTagName(txBodys[0], "p");
            for (const p of paragraphs) {
              const pPrs = getElementsByTagName(p, "pPr");
              const align = pPrs.length > 0 ? pPrs[0].getAttribute("algn") : "left";
              const alignHorizontal = align === "ctr" ? "center" : align === "r" ? "right" : "left";
              
              const textRuns: ParsedTextRun[] = [];
              const runs = getElementsByTagName(p, "r");
              for (const r of runs) {
                const rPrs = getElementsByTagName(r, "rPr");
                const ts = getElementsByTagName(r, "t");
                if (ts.length > 0) {
                  const text = ts[0].textContent || "";
                  let fontSize = 14;
                  let bold = false;
                  let italic = false;
                  let underline = false;
                  let fontColor = "#000000";
                  
                  if (rPrs.length > 0) {
                    const sz = rPrs[0].getAttribute("sz");
                    if (sz) fontSize = Math.round(parseInt(sz) / 100);
                    bold = rPrs[0].getAttribute("b") === "1";
                    italic = rPrs[0].getAttribute("i") === "1";
                    underline = rPrs[0].getAttribute("u") === "sng";
                    
                    const rFills = getElementsByTagName(rPrs[0], "solidFill");
                    if (rFills.length > 0) {
                      const srgb = getElementsByTagName(rFills[0], "srgbClr");
                      if (srgb.length > 0) fontColor = "#" + srgb[0].getAttribute("val");
                    }
                  }
                  textRuns.push({ text, bold, italic, underline, fontSize, fontColor });
                }
              }
              
              if (textRuns.length === 0) {
                const ts = getElementsByTagName(p, "t");
                for (const t of ts) {
                  textRuns.push({ text: t.textContent || "", fontSize: 14, fontColor: "#000000" });
                }
              }
              textParagraphs.push({ alignHorizontal, textRuns });
            }
          }

          elements.push({
            id: `sp_${Math.random().toString(36).substr(2, 9)}`,
            type: 'shape',
            x, y, width, height,
            shapeType: "rect",
            fillColor,
            borderColor,
            borderWidth,
            textParagraphs
          });
        }

        // Parse pictures
        const pics = getElementsByTagName(slideDoc, "pic");
        for (const pic of pics) {
          const xfrms = getElementsByTagName(pic, "xfrm");
          if (xfrms.length === 0) continue;
          const xfrm = xfrms[0];
          const offs = getElementsByTagName(xfrm, "off");
          const exts = getElementsByTagName(xfrm, "ext");
          if (offs.length === 0 || exts.length === 0) continue;
          
          const x = Math.round(parseInt(offs[0].getAttribute("x") || "0") / 9525);
          const y = Math.round(parseInt(offs[0].getAttribute("y") || "0") / 9525);
          const width = Math.round(parseInt(exts[0].getAttribute("cx") || "0") / 9525);
          const height = Math.round(parseInt(exts[0].getAttribute("cy") || "0") / 9525);
          
          if (width === 0 || height === 0) continue;

          const blips = getElementsByTagName(pic, "blip");
          if (blips.length === 0) continue;
          const rId = blips[0].getAttribute("r:embed") || blips[0].getAttribute("embed");
          
          let imageSrc = "";
          if (rId) {
            let imgPath = relsMap.get(rId);
            if (imgPath) {
              if (imgPath.startsWith("../")) {
                imgPath = "ppt/" + imgPath.substring(3);
              }
              const imgZip = zip.file(imgPath);
              if (imgZip) {
                const imgBase64 = await imgZip.async("base64");
                const ext = imgPath.split('.').pop()?.toLowerCase();
                const mime = ext === "png" ? "image/png" : ext === "gif" ? "image/gif" : "image/jpeg";
                imageSrc = `data:${mime};base64,${imgBase64}`;
              }
            }
          }
          
          if (imageSrc) {
            elements.push({
              id: `pic_${Math.random().toString(36).substr(2, 9)}`,
              type: 'image',
              x, y, width, height,
              imageSrc
            });
          }
        }

        // Parse tables and charts inside graphicFrames
        const gFrames = getElementsByTagName(slideDoc, "graphicFrame");
        for (const gf of gFrames) {
          const xfrms = getElementsByTagName(gf, "xfrm");
          if (xfrms.length === 0) continue;
          const xfrm = xfrms[0];
          const offs = getElementsByTagName(xfrm, "off");
          const exts = getElementsByTagName(xfrm, "ext");
          if (offs.length === 0 || exts.length === 0) continue;
          
          const x = Math.round(parseInt(offs[0].getAttribute("x") || "0") / 9525);
          const y = Math.round(parseInt(offs[0].getAttribute("y") || "0") / 9525);
          const width = Math.round(parseInt(exts[0].getAttribute("cx") || "0") / 9525);
          const height = Math.round(parseInt(exts[0].getAttribute("cy") || "0") / 9525);
          
          if (width === 0 || height === 0) continue;

          // Check if table
          const tbls = getElementsByTagName(gf, "tbl");
          if (tbls.length > 0) {
            const tbl = tbls[0];
            const colWidths: number[] = [];
            const rowHeights: number[] = [];
            const rows: ParsedTableCell[][] = [];
            
            const tblGrid = getElementsByTagName(tbl, "tblGrid")[0];
            if (tblGrid) {
              const gridCols = getElementsByTagName(tblGrid, "gridCol");
              for (const col of gridCols) {
                colWidths.push(Math.round(parseInt(col.getAttribute("w") || "95250") / 9525));
              }
            }
            
            const trs = getElementsByTagName(tbl, "tr");
            for (const tr of trs) {
              rowHeights.push(Math.round(parseInt(tr.getAttribute("h") || "19050") / 9525));
              
              const rowCells: ParsedTableCell[] = [];
              const tcs = getElementsByTagName(tr, "tc");
              for (const tc of tcs) {
                let cellBg = "transparent";
                const tcPrs = getElementsByTagName(tc, "tcPr");
                if (tcPrs.length > 0) {
                  const solidFills = getElementsByTagName(tcPrs[0], "solidFill");
                  if (solidFills.length > 0) {
                    const srgb = getElementsByTagName(solidFills[0], "srgbClr");
                    cellBg = srgb.length > 0 ? "#" + srgb[0].getAttribute("val") : "transparent";
                  }
                }
                
                const rowSpan = parseInt(tc.getAttribute("rowSpan") || "1");
                const colSpan = parseInt(tc.getAttribute("gridSpan") || "1");
                
                const cellParagraphs: ParsedParagraph[] = [];
                const txBodys = getElementsByTagName(tc, "txBody");
                if (txBodys.length > 0) {
                  const paragraphs = getElementsByTagName(txBodys[0], "p");
                  for (const p of paragraphs) {
                    const pPrs = getElementsByTagName(p, "pPr");
                    const align = pPrs.length > 0 ? pPrs[0].getAttribute("algn") : "left";
                    const alignHorizontal = align === "ctr" ? "center" : align === "r" ? "right" : "left";
                    
                    const textRuns: ParsedTextRun[] = [];
                    const runs = getElementsByTagName(p, "r");
                    for (const r of runs) {
                      const rPrs = getElementsByTagName(r, "rPr");
                      const ts = getElementsByTagName(r, "t");
                      if (ts.length > 0) {
                        let fontSize = 12;
                        let bold = false;
                        let italic = false;
                        let fontColor = "#000000";
                        if (rPrs.length > 0) {
                          const sz = rPrs[0].getAttribute("sz");
                          if (sz) fontSize = Math.round(parseInt(sz) / 100);
                          bold = rPrs[0].getAttribute("b") === "1";
                          italic = rPrs[0].getAttribute("i") === "1";
                          const solidFill = getElementsByTagName(rPrs[0], "solidFill")[0];
                          if (solidFill) {
                            const srgb = getElementsByTagName(solidFill, "srgbClr")[0];
                            if (srgb) fontColor = "#" + srgb.getAttribute("val");
                          }
                        }
                        textRuns.push({ text: ts[0].textContent || "", fontSize, bold, italic, fontColor });
                      }
                    }
                    if (textRuns.length === 0) {
                      const ts = getElementsByTagName(p, "t");
                      for (const t of ts) {
                        textRuns.push({ text: t.textContent || "", fontSize: 12, fontColor: "#000000" });
                      }
                    }
                    cellParagraphs.push({ alignHorizontal, textRuns });
                  }
                }
                
                rowCells.push({
                  textParagraphs: cellParagraphs,
                  fillColor: cellBg,
                  rowSpan,
                  colSpan,
                  isMaster: true
                });
              }
              rows.push(rowCells);
            }
            
            elements.push({
              id: `tbl_${Math.random().toString(36).substr(2, 9)}`,
              type: 'table',
              x, y, width, height,
              tableData: { rows, colWidths, rowHeights }
            });
          }

          // Check if chart
          const charts = getElementsByTagName(gf, "chart");
          if (charts.length > 0) {
            const chartId = charts[0].getAttribute("r:id") || charts[0].getAttribute("id");
            let chartData: ParsedChart | undefined = undefined;
            
            if (chartId) {
              let chartPath = relsMap.get(chartId);
              if (chartPath) {
                if (chartPath.startsWith("../")) {
                  chartPath = "ppt/" + chartPath.substring(3);
                }
                const chartZip = zip.file(chartPath);
                if (chartZip) {
                  const chartXmlStr = await chartZip.async("text");
                  const chartDoc = parser.parseFromString(chartXmlStr, "application/xml");
                  
                  let type: 'bar' | 'pie' | 'line' | 'area' = 'bar';
                  if (getElementsByTagName(chartDoc, "barChart").length > 0) type = 'bar';
                  else if (getElementsByTagName(chartDoc, "pieChart").length > 0) type = 'pie';
                  else if (getElementsByTagName(chartDoc, "lineChart").length > 0) type = 'line';
                  else if (getElementsByTagName(chartDoc, "areaChart").length > 0) type = 'area';
                  
                  let title = "Statistics Chart";
                  const titles = getElementsByTagName(chartDoc, "title");
                  if (titles.length > 0) {
                    const ts = getElementsByTagName(titles[0], "t");
                    if (ts.length > 0) title = ts[0].textContent || "Statistics Chart";
                  }
                  
                  const seriesList: string[] = [];
                  const categoriesList: string[] = [];
                  const numericData: number[][] = [];
                  
                  const sers = getElementsByTagName(chartDoc, "ser");
                  for (let sIdx = 0; sIdx < sers.length; sIdx++) {
                    const ser = sers[sIdx];
                    let serTitle = `Series ${sIdx + 1}`;
                    const txs = getElementsByTagName(ser, "tx");
                    if (txs.length > 0) {
                      const vs = getElementsByTagName(txs[0], "v");
                      if (vs.length > 0) serTitle = vs[0].textContent || serTitle;
                    }
                    seriesList.push(serTitle);
                    
                    if (sIdx === 0) {
                      const cats = getElementsByTagName(ser, "cat");
                      if (cats.length > 0) {
                        const vs = getElementsByTagName(cats[0], "v");
                        for (let c = 0; c < vs.length; c++) {
                          categoriesList.push(vs[c].textContent || `Category ${c + 1}`);
                        }
                      }
                    }
                    
                    const vals = getElementsByTagName(ser, "val");
                    const serVals: number[] = [];
                    if (vals.length > 0) {
                      const vs = getElementsByTagName(vals[0], "v");
                      for (let v = 0; v < vs.length; v++) {
                        serVals.push(parseFloat(vs[v].textContent || "0"));
                      }
                    }
                    numericData.push(serVals);
                  }
                  
                  if (categoriesList.length === 0 && numericData.length > 0) {
                    const maxLen = Math.max(...numericData.map(d => d.length));
                    for (let c = 0; c < maxLen; c++) {
                      categoriesList.push(`Item ${c + 1}`);
                    }
                  }
                  
                  chartData = {
                    title,
                    type,
                    series: seriesList,
                    categories: categoriesList,
                    data: numericData
                  };
                }
              }
            }
            
            if (chartData) {
              elements.push({
                id: `chart_${Math.random().toString(36).substr(2, 9)}`,
                type: 'chart',
                x, y, width, height,
                chartData
              });
            }
          }
        }

        slidesList.push({
          slideNumber: idx + 1,
          width: slideWidth,
          height: slideHeight,
          background: slideBgColor,
          elements,
          notes: speakerNotes || undefined
        });
      }

      if (slidesList.length === 0) {
        throw new Error("No slide XML resources found in presentation archive.");
      }

      setParsedSlides(slidesList);
      setActiveSlideIndex(0);

      // Select all slides by default
      const defaultSelect: Record<number, boolean> = {};
      slidesList.forEach((_, sIdx) => {
        defaultSelect[sIdx] = true;
      });
      setSelectedSlides(defaultSelect);

      setFileSize(targetFile.size);
      setFile(targetFile);
      setUploadStatus("ready");
      setCurrentPage(1);

      recalculateEstimatedPages(slidesList, defaultSelect);

    } catch (err: any) {
      console.error("PPTX reading crahsed", err);
      setErrorMessage(err.message || "Failed to read presentation structural layers.");
      setUploadStatus("error");
    }
  };

  const recalculateEstimatedPages = (slides = parsedSlides, targets = selectedSlides) => {
    if (slides.length === 0) return;
    
    const selectedCount = slides.filter((_, idx) => targets[idx]).length;
    let pages = 0;
    
    if (slidesPerPage === "1") {
      pages = selectedCount;
    } else if (slidesPerPage === "2") {
      pages = Math.ceil(selectedCount / 2);
    } else if (slidesPerPage === "4") {
      pages = Math.ceil(selectedCount / 4);
    } else if (slidesPerPage === "6") {
      pages = Math.ceil(selectedCount / 6);
    } else if (slidesPerPage === "notes") {
      pages = selectedCount;
    }
    
    setEstimatedPages(pages || 1);
  };

  useEffect(() => {
    recalculateEstimatedPages();
  }, [pageSize, orientation, marginType, slidesPerPage, includeNotes, selectedSlides, parsedSlides]);

  // Handle slide selection text ranges
  useEffect(() => {
    if (parsedSlides.length > 0) {
      const activeMap = parseRangeString(slideRangeString, parsedSlides.length);
      setSelectedSlides(activeMap);
    }
  }, [slideRangeString]);

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
        const pptxFiles = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith(".pptx"));
        setBatchFiles(prev => [...prev, ...pptxFiles]);
      } else {
        parsePowerPointDocument(e.dataTransfer.files[0]);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (isBatchMode) {
        const pptxFiles = Array.from(e.target.files).filter(f => f.name.endsWith(".pptx"));
        setBatchFiles(prev => [...prev, ...pptxFiles]);
      } else {
        parsePowerPointDocument(e.target.files[0]);
      }
    }
  };

  const handleWatermarkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setWatermarkImage(img);
      const reader = new FileReader();
      reader.onload = () => {
        setWatermarkImagePreview(reader.result as string);
      };
      reader.readAsDataURL(img);
    }
  };

  const clearWatermarkImage = () => {
    setWatermarkImage(null);
    setWatermarkImagePreview(null);
    if (watermarkImageInputRef.current) {
      watermarkImageInputRef.current.value = "";
    }
  };

  // Convert presentation to PDF Blobs
  const convertPowerPointToPdf = async () => {
    if (!file || isConverting || parsedSlides.length === 0) return;

    setIsConverting(true);
    setProgressPercent(0);
    setProgressMsg("Structuring slide nodes...");

    try {
      const activeSizeConfig = PAGE_SIZES.find(s => s.id === pageSize) || PAGE_SIZES[0];
      const targetWidth = orientation === "portrait" ? activeSizeConfig.width : activeSizeConfig.height;
      const targetHeight = orientation === "portrait" ? activeSizeConfig.height : activeSizeConfig.width;
      const marginPoints = MARGIN_SIZES.find(m => m.id === marginType)?.value || 0;

      const printableWidth = (targetWidth - marginPoints * 2) * (96 / 72); // pixels
      const printableHeight = (targetHeight - marginPoints * 2) * (96 / 72); // pixels

      let scaleDpiFactor = 1.5;
      if (conversionMode === "high") scaleDpiFactor = 2.0;
      else if (conversionMode === "print") scaleDpiFactor = 3.0;
      else if (conversionMode === "compact") scaleDpiFactor = 1.0;

      const pdfDoc = await PDFDocument.create();

      // Create DOM Sandbox container
      const sandbox = document.createElement("div");
      sandbox.className = "pptx-pdf-sandbox-container";
      sandbox.style.position = "absolute";
      sandbox.style.left = "-9999px";
      sandbox.style.top = "-9999px";
      document.body.appendChild(sandbox);

      const activeSlides = parsedSlides.filter((_, idx) => selectedSlides[idx]);
      let globalPageIdx = 0;
      let totalPagesToPrint = estimatedPages || 1;

      // Split active slides into pages depending on arrangement
      let slidesGroups: ParsedSlide[][] = [];
      const slidesPerGroup = slidesPerPage === "notes" ? 1 : parseInt(slidesPerPage);
      
      for (let i = 0; i < activeSlides.length; i += slidesPerGroup) {
        slidesGroups.push(activeSlides.slice(i, i + slidesPerGroup));
      }

      for (let gIdx = 0; gIdx < slidesGroups.length; gIdx++) {
        const group = slidesGroups[gIdx];
        globalPageIdx++;

        setProgressMsg(`Rasterizing Page ${globalPageIdx} of ${totalPagesToPrint}...`);
        setProgressPercent(Math.round((globalPageIdx / totalPagesToPrint) * 100));

        // Create page div
        const pageDiv = document.createElement("div");
        pageDiv.style.width = `${targetWidth}pt`;
        pageDiv.style.height = `${targetHeight}pt`;
        pageDiv.style.padding = `${marginPoints}pt`;
        pageDiv.style.boxSizing = "border-box";
        pageDiv.style.backgroundColor = "#ffffff";
        pageDiv.style.position = "relative";
        pageDiv.style.overflow = "hidden";
        pageDiv.style.display = "flex";
        pageDiv.style.flexDirection = "column";
        pageDiv.style.justifyContent = "center";
        pageDiv.style.alignItems = "center";

        // Headers & Footers HTML
        const headerDiv = document.createElement("div");
        headerDiv.style.position = "absolute";
        headerDiv.style.top = `${marginPoints > 10 ? marginPoints - 15 : 8}pt`;
        headerDiv.style.left = `${marginPoints > 10 ? marginPoints : 15}pt`;
        headerDiv.style.right = `${marginPoints > 10 ? marginPoints : 15}pt`;
        headerDiv.style.display = "flex";
        headerDiv.style.justifyContent = "space-between";
        headerDiv.style.fontSize = "7.5pt";
        headerDiv.style.color = "#64748b";
        headerDiv.style.borderBottom = "0.5px solid #e2e8f0";
        headerDiv.style.paddingBottom = "3px";
        headerDiv.style.boxSizing = "border-box";

        const hLeft = document.createElement("span");
        hLeft.innerText = customHeader || (includeFileName ? file.name : "");
        headerDiv.appendChild(hLeft);

        const hRight = document.createElement("span");
        hRight.innerText = includeDateTime ? new Date().toLocaleDateString() : "";
        headerDiv.appendChild(hRight);
        pageDiv.appendChild(headerDiv);

        // Grid Container for slides
        const gridContainer = document.createElement("div");
        gridContainer.style.width = "100%";
        gridContainer.style.height = "100%";
        gridContainer.style.display = "grid";
        gridContainer.style.gap = "10px";
        gridContainer.style.justifyContent = "center";
        gridContainer.style.alignContent = "center";
        gridContainer.style.boxSizing = "border-box";

        if (slidesPerPage === "1") {
          gridContainer.style.gridTemplateColumns = "1fr";
        } else if (slidesPerPage === "2") {
          gridContainer.style.gridTemplateColumns = "1fr";
          gridContainer.style.gridTemplateRows = "1fr 1fr";
        } else if (slidesPerPage === "4") {
          gridContainer.style.gridTemplateColumns = "1fr 1fr";
          gridContainer.style.gridTemplateRows = "1fr 1fr";
        } else if (slidesPerPage === "6") {
          gridContainer.style.gridTemplateColumns = "1fr 1fr";
          gridContainer.style.gridTemplateRows = "1fr 1fr 1fr";
        } else if (slidesPerPage === "notes") {
          gridContainer.style.gridTemplateColumns = "1fr";
          gridContainer.style.gridTemplateRows = "3.2fr 1.8fr";
        }
        
        // Add slides to grid
        for (const slide of group) {
          const slideOuter = document.createElement("div");
          slideOuter.style.width = "100%";
          slideOuter.style.height = "100%";
          slideOuter.style.display = "flex";
          slideOuter.style.justifyContent = "center";
          slideOuter.style.alignItems = "center";
          slideOuter.style.boxSizing = "border-box";
          slideOuter.style.position = "relative";
          slideOuter.style.overflow = "hidden";
          
          if (slidesPerPage !== "1") {
            slideOuter.style.border = "1px solid #cbd5e1";
            slideOuter.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
          }

          // HTML slide rendering
          const slideInner = document.createElement("div");
          slideInner.className = "pptx-slide-canvas-node";
          slideInner.style.width = `${slide.width}px`;
          slideInner.style.height = `${slide.height}px`;
          slideInner.style.backgroundColor = slide.background || "#ffffff";
          slideInner.style.position = "relative";
          slideInner.style.overflow = "hidden";
          slideInner.style.flexShrink = "0";

          // Parse and render elements
          for (const el of slide.elements) {
            const elNode = document.createElement("div");
            elNode.style.position = "absolute";
            elNode.style.left = `${el.x}px`;
            elNode.style.top = `${el.y}px`;
            elNode.style.width = `${el.width}px`;
            elNode.style.height = `${el.height}px`;
            elNode.style.boxSizing = "border-box";
            elNode.style.overflow = "hidden";

            if (el.type === 'shape') {
              elNode.style.backgroundColor = el.fillColor || "transparent";
              if (el.borderWidth && el.borderWidth > 0) {
                elNode.style.border = `${el.borderWidth}px solid ${el.borderColor || "#000"}`;
              }
              // Text body rendering
              if (el.textParagraphs) {
                const textContainer = document.createElement("div");
                textContainer.style.width = "100%";
                textContainer.style.height = "100%";
                textContainer.style.padding = "4px";
                textContainer.style.boxSizing = "border-box";
                textContainer.style.display = "flex";
                textContainer.style.flexDirection = "column";
                textContainer.style.justifyContent = "center";
                
                el.textParagraphs.forEach(para => {
                  const paraNode = document.createElement("div");
                  paraNode.style.textAlign = para.alignHorizontal || "left";
                  paraNode.style.margin = "0";
                  paraNode.style.padding = "1px 0";
                  paraNode.style.minHeight = "1.2em";
                  
                  para.textRuns.forEach(run => {
                    const span = document.createElement("span");
                    span.innerText = run.text;
                    span.style.fontSize = `${run.fontSize || 14}px`;
                    span.style.color = run.fontColor || "#000000";
                    span.style.fontWeight = run.bold ? "bold" : "normal";
                    span.style.fontStyle = run.italic ? "italic" : "normal";
                    span.style.textDecoration = run.underline ? "underline" : "none";
                    span.style.fontFamily = "Calibri, Arial, sans-serif";
                    paraNode.appendChild(span);
                  });
                  textContainer.appendChild(paraNode);
                });
                elNode.appendChild(textContainer);
              }
            } else if (el.type === 'image' && el.imageSrc) {
              const imgNode = document.createElement("img");
              imgNode.src = el.imageSrc;
              imgNode.style.width = "100%";
              imgNode.style.height = "100%";
              imgNode.style.objectFit = "cover";
              elNode.appendChild(imgNode);
            } else if (el.type === 'table' && el.tableData) {
              const table = document.createElement("table");
              table.style.width = "100%";
              table.style.height = "100%";
              table.style.borderCollapse = "collapse";
              table.style.tableLayout = "fixed";
              
              el.tableData.rows.forEach((row, rIdx) => {
                const tr = document.createElement("tr");
                if (el.tableData?.rowHeights[rIdx]) {
                  tr.style.height = `${el.tableData.rowHeights[rIdx]}px`;
                }
                
                row.forEach((cell, cIdx) => {
                  if (!cell.isMaster) return;
                  const td = document.createElement("td");
                  td.style.backgroundColor = cell.fillColor || "transparent";
                  td.style.border = "1px solid #cbd5e1";
                  td.style.padding = "4px";
                  td.style.verticalAlign = "middle";
                  
                  if (cell.rowSpan && cell.rowSpan > 1) td.rowSpan = cell.rowSpan;
                  if (cell.colSpan && cell.colSpan > 1) td.colSpan = cell.colSpan;
                  
                  cell.textParagraphs.forEach(para => {
                    const pNode = document.createElement("div");
                    pNode.style.textAlign = para.alignHorizontal || "left";
                    pNode.style.margin = "0";
                    
                    para.textRuns.forEach(run => {
                      const span = document.createElement("span");
                      span.innerText = run.text;
                      span.style.fontSize = `${run.fontSize || 12}px`;
                      span.style.color = run.fontColor || "#000000";
                      span.style.fontWeight = run.bold ? "bold" : "normal";
                      span.style.fontStyle = run.italic ? "italic" : "normal";
                      span.style.fontFamily = "Calibri, Arial, sans-serif";
                      pNode.appendChild(span);
                    });
                    td.appendChild(pNode);
                  });
                  tr.appendChild(td);
                });
                table.appendChild(tr);
              });
              elNode.appendChild(table);
            } else if (el.type === 'chart' && el.chartData) {
              // Create SVG chart representation
              const chart = el.chartData;
              const colors = ["#4f46e5", "#10b981", "#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6"];
              
              if (chart.type === 'pie') {
                const total = chart.data[0]?.reduce((a, b) => a + b, 0) || 1;
                let accumulatedAngle = 0;
                let slicesSvg = "";
                chart.data[0]?.forEach((val, idx) => {
                  const percentage = val / total;
                  const angle = percentage * 360;
                  const x1 = 50 + 40 * Math.cos((accumulatedAngle - 90) * Math.PI / 180);
                  const y1 = 50 + 40 * Math.sin((accumulatedAngle - 90) * Math.PI / 180);
                  accumulatedAngle += angle;
                  const x2 = 50 + 40 * Math.cos((accumulatedAngle - 90) * Math.PI / 180);
                  const y2 = 50 + 40 * Math.sin((accumulatedAngle - 90) * Math.PI / 180);
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  slicesSvg += `<path d="M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z" fill="${colors[idx % colors.length]}" stroke="#ffffff" stroke-width="0.5" />`;
                });

                elNode.innerHTML = `
                  <div style="width:100%;height:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:4px;display:flex;flex-direction:column;align-items:center;padding:5px;box-sizing:border-box;">
                    <div style="font-size:9px;font-weight:bold;color:#475569;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;text-align:center;">${chart.title || "Data Chart"}</div>
                    <div style="flex:1;display:flex;align-items:center;justify-content:center;width:100%;gap:5px;min-height:0;">
                      <svg viewBox="0 0 100 100" style="height:100%;max-height:100px;max-width:100px;">${slicesSvg}</svg>
                      <div style="font-size:8px;color:#64748b;display:flex;flex-direction:column;justify-content:center;gap:2px;">
                        ${chart.categories.slice(0, 3).map((cat, idx) => `
                          <div style="display:flex;align-items:center;gap:3px;">
                            <span style="width:6px;height:6px;background:${colors[idx % colors.length]};border-radius:50%;display:inline-block;"></span>
                            <span>${cat}</span>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  </div>
                `;
              } else {
                // Default bar chart SVG represent
                const maxVal = Math.max(...(chart.data[0] || [1]), 1);
                let barsHtml = "";
                chart.data[0]?.forEach((val, idx) => {
                  const h = (val / maxVal) * 70;
                  barsHtml += `
                    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:end;height:100%;">
                      <span style="font-size:7px;color:#64748b;margin-bottom:1px;">${val}</span>
                      <div style="width:80%;height:${h}%;background:${colors[idx % colors.length]};border-radius:1px 1px 0 0;"></div>
                      <span style="font-size:7px;color:#94a3b8;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;text-align:center;">${chart.categories[idx] || ""}</span>
                    </div>
                  `;
                });

                elNode.innerHTML = `
                  <div style="width:100%;height:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:4px;display:flex;flex-direction:column;padding:6px;box-sizing:border-box;">
                    <div style="font-size:9px;font-weight:bold;color:#475569;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;">${chart.title || "Chart Overview"}</div>
                    <div style="flex:1;display:flex;align-items:end;justify-content:space-between;gap:4px;border-bottom:0.5px solid #cbd5e1;padding-bottom:1px;min-height:0;">
                      ${barsHtml}
                    </div>
                  </div>
                `;
              }
            }
            slideInner.appendChild(elNode);
          }
          slideOuter.appendChild(slideInner);
          gridContainer.appendChild(slideOuter);

          // Calculate scaling factor to fit slideInner into grid slot
          setTimeout(() => {
            const containerW = slideOuter.clientWidth || (targetWidth * (96/72));
            const containerH = slideOuter.clientHeight || (targetHeight * (96/72));
            
            let scaling = Math.min(containerW / slide.width, containerH / slide.height);
            // Cap scaling if notes layout is active
            if (slidesPerPage === "notes") {
              scaling = Math.min(containerW / slide.width, (containerH * 0.6) / slide.height);
            }
            
            slideInner.style.transform = `scale(${scaling * 0.96})`;
            slideInner.style.transformOrigin = "center center";
          }, 0);
        }

        // Notes view display text segment
        if (slidesPerPage === "notes" && group[0].notes) {
          const notesBox = document.createElement("div");
          notesBox.style.width = "100%";
          notesBox.style.marginTop = "10px";
          notesBox.style.padding = "10px";
          notesBox.style.border = "1px dashed #cbd5e1";
          notesBox.style.borderRadius = "4px";
          notesBox.style.backgroundColor = "#f8fafc";
          notesBox.style.fontSize = "9.5pt";
          notesBox.style.color = "#334155";
          notesBox.style.lineHeight = "1.4";
          notesBox.style.maxHeight = "35%";
          notesBox.style.overflow = "hidden";
          notesBox.style.boxSizing = "border-box";
          
          const notesTitle = document.createElement("div");
          notesTitle.style.fontWeight = "bold";
          notesTitle.style.fontSize = "8pt";
          notesTitle.style.color = "#475569";
          notesTitle.style.marginBottom = "4px";
          notesTitle.innerText = "SPEAKER NOTES:";
          notesBox.appendChild(notesTitle);

          const notesContent = document.createElement("p");
          notesContent.style.margin = "0";
          notesContent.innerText = group[0].notes;
          notesBox.appendChild(notesContent);
          
          pageDiv.appendChild(gridContainer);
          pageDiv.appendChild(notesBox);
        } else {
          pageDiv.appendChild(gridContainer);
        }

        // Custom Watermark
        if (enableWatermark) {
          const wNode = document.createElement("div");
          wNode.style.position = "absolute";
          wNode.style.left = "0";
          wNode.style.top = "0";
          wNode.style.width = "100%";
          wNode.style.height = "100%";
          wNode.style.display = "flex";
          wNode.style.justifyContent = "center";
          wNode.style.alignItems = "center";
          wNode.style.pointerEvents = "none";
          wNode.style.zIndex = "999";
          wNode.style.opacity = String(watermarkOpacity);

          if (watermarkType === "text") {
            const wText = document.createElement("span");
            wText.innerText = watermarkText;
            wText.style.fontSize = `${watermarkFontSize}pt`;
            wText.style.color = watermarkColor;
            wText.style.fontWeight = "bold";
            wText.style.transform = `rotate(-${watermarkRotation}deg)`;
            wText.style.whiteSpace = "nowrap";
            wNode.appendChild(wText);
          } else if (watermarkType === "image" && watermarkImagePreview) {
            const wImg = document.createElement("img");
            wImg.src = watermarkImagePreview;
            wImg.style.width = "200px";
            wImg.style.height = "auto";
            wImg.style.transform = `rotate(-${watermarkRotation}deg)`;
            wNode.appendChild(wImg);
          }
          pageDiv.appendChild(wNode);
        }

        // Footer segment
        const footerDiv = document.createElement("div");
        footerDiv.style.position = "absolute";
        footerDiv.style.bottom = `${marginPoints > 10 ? marginPoints - 15 : 8}pt`;
        footerDiv.style.left = `${marginPoints > 10 ? marginPoints : 15}pt`;
        footerDiv.style.right = `${marginPoints > 10 ? marginPoints : 15}pt`;
        footerDiv.style.display = "flex";
        footerDiv.style.justifyContent = "space-between";
        footerDiv.style.fontSize = "7.5pt";
        footerDiv.style.color = "#64748b";
        footerDiv.style.borderTop = "0.5px solid #e2e8f0";
        footerDiv.style.paddingTop = "3px";
        footerDiv.style.boxSizing = "border-box";

        const fLeft = document.createElement("span");
        fLeft.innerText = customFooter || "";
        footerDiv.appendChild(fLeft);

        const fRight = document.createElement("span");
        fRight.innerText = includePageNumbers ? `Page ${globalPageIdx} of ${totalPagesToPrint}` : "";
        footerDiv.appendChild(fRight);
        pageDiv.appendChild(footerDiv);

        // Append to DOM to snap
        sandbox.appendChild(pageDiv);

        // Snap via polyfilled canvas
        const canvas = await withOklchPolyfill<HTMLCanvasElement>(() => 
          html2canvas(pageDiv, {
            scale: scaleDpiFactor,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff"
          } as any)
        );

        pageDiv.remove();

        const imgDataUrl = canvas.toDataURL("image/jpeg", conversionMode === "compact" ? 0.70 : 0.88);
        const imgResponse = await fetch(imgDataUrl);
        const imgBytes = await imgResponse.arrayBuffer();

        const pdfPage = pdfDoc.addPage([targetWidth, targetHeight]);
        const pdfImg = await pdfDoc.embedJpg(imgBytes);
        pdfPage.drawImage(pdfImg, {
          x: 0,
          y: 0,
          width: targetWidth,
          height: targetHeight
        });
      }

      // Cleanup hidden container
      sandbox.remove();

      // Compile final PDF blob
      setProgressMsg("Compiling document layers...");
      const pdfBytes = await pdfDoc.save();
      const compiledBlob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(compiledBlob);

      setOutputPdfBlob(compiledBlob);
      setOutputPdfUrl(url);

      // Load PDF.js canvas preview
      const pdfjsLib = await loadPdfJsLib();
      const docData = new Uint8Array(pdfBytes);
      const loadingTask = pdfjsLib.getDocument({ data: docData });
      const jsDoc = await loadingTask.promise;
      setPdfjsDoc(jsDoc);

      setProgressMsg("PowerPoint slides converted successfully!");
      setProgressPercent(100);
      setIsConverting(false);

      saveHistoryItem(compiledBlob, globalPageIdx);
      triggerDownload(url, file.name);

    } catch (err: any) {
      console.error("PPTX conversion run crashed", err);
      alert("Presentation conversion failed: " + err.message);
      setIsConverting(false);
    }
  };

  const convertBatchPowerPointToPdf = async () => {
    if (batchFiles.length === 0 || isConverting) return;

    setIsConverting(true);
    setProgressPercent(0);
    setProgressMsg("Starting Batch Conversions...");

    try {
      const zip = new JSZip();
      
      const activeSizeConfig = PAGE_SIZES.find(s => s.id === pageSize) || PAGE_SIZES[0];
      const targetWidth = orientation === "portrait" ? activeSizeConfig.width : activeSizeConfig.height;
      const targetHeight = orientation === "portrait" ? activeSizeConfig.height : activeSizeConfig.width;
      const marginPoints = MARGIN_SIZES.find(m => m.id === marginType)?.value || 0;

      const scaleDpiFactor = 1.5;

      for (let fIdx = 0; fIdx < batchFiles.length; fIdx++) {
        const batchFile = batchFiles[fIdx];
        setProgressMsg(`Parsing Slide File ${fIdx + 1} of ${batchFiles.length}: ${batchFile.name}...`);
        setProgressPercent(Math.round((fIdx / batchFiles.length) * 100));

        // Unzip and parse slide sizes and keys
        const batchBuffer = await batchFile.arrayBuffer();
        const batchZip = await JSZip.loadAsync(batchBuffer);
        const parser = new DOMParser();

        let slideWidth = 960;
        let slideHeight = 540;
        const presXmlStr = await batchZip.file("ppt/presentation.xml")?.async("text");
        if (presXmlStr) {
          const presDoc = parser.parseFromString(presXmlStr, "application/xml");
          const sldSz = getElementsByTagName(presDoc, "sldSz")[0];
          if (sldSz) {
            const cx = parseInt(sldSz.getAttribute("cx") || "12192000");
            const cy = parseInt(sldSz.getAttribute("cy") || "6858000");
            slideWidth = Math.round(cx / 9525);
            slideHeight = Math.round(cy / 9525);
          }
        }

        const slideKeys = Object.keys(batchZip.files).filter(k => k.startsWith("ppt/slides/slide") && k.endsWith(".xml"));
        slideKeys.sort((a, b) => {
          const numA = parseInt(a.replace(/[^0-9]/g, ''));
          const numB = parseInt(b.replace(/[^0-9]/g, ''));
          return numA - numB;
        });

        const tempSlides: ParsedSlide[] = [];
        
        // Loop slides inside this file
        for (let idx = 0; idx < slideKeys.length; idx++) {
          const slideKey = slideKeys[idx];
          const slideNum = slideKey.replace(/[^0-9]/g, '');

          // Relations
          const relsKey = `ppt/slides/_rels/slide${slideNum}.xml.rels`;
          const relsFile = batchZip.file(relsKey);
          const relsMap = new Map<string, string>();
          if (relsFile) {
            const relsXml = await relsFile.async("text");
            const relsDoc = parser.parseFromString(relsXml, "application/xml");
            const rels = getElementsByTagName(relsDoc, "Relationship");
            for (const r of rels) {
              const id = r.getAttribute("Id");
              const target = r.getAttribute("Target");
              if (id && target) relsMap.set(id, target);
            }
          }

          const slideXml = await batchZip.file(slideKey)?.async("text");
          if (!slideXml) continue;
          const slideDoc = parser.parseFromString(slideXml, "application/xml");

          // Background
          let slideBg = "#ffffff";
          const bgPrs = getElementsByTagName(slideDoc, "bgPr");
          if (bgPrs.length > 0) {
            const solidFills = getElementsByTagName(bgPrs[0], "solidFill");
            if (solidFills.length > 0) {
              const srgb = getElementsByTagName(solidFills[0], "srgbClr");
              if (srgb.length > 0) slideBg = "#" + (srgb[0].getAttribute("val") || "ffffff");
            }
          }

          const elements: ParsedElement[] = [];

          // Shapes
          const shapes = getElementsByTagName(slideDoc, "sp");
          for (const sp of shapes) {
            const xfrms = getElementsByTagName(sp, "xfrm");
            if (xfrms.length === 0) continue;
            const xfrm = xfrms[0];
            const offs = getElementsByTagName(xfrm, "off");
            const exts = getElementsByTagName(xfrm, "ext");
            if (offs.length === 0 || exts.length === 0) continue;

            const x = Math.round(parseInt(offs[0].getAttribute("x") || "0") / 9525);
            const y = Math.round(parseInt(offs[0].getAttribute("y") || "0") / 9525);
            const width = Math.round(parseInt(exts[0].getAttribute("cx") || "0") / 9525);
            const height = Math.round(parseInt(exts[0].getAttribute("cy") || "0") / 9525);

            if (width === 0 || height === 0) continue;

            let fillColor = "transparent";
            const solidFills = getElementsByTagName(sp, "solidFill");
            if (solidFills.length > 0) {
              const srgb = getElementsByTagName(solidFills[0], "srgbClr");
              if (srgb.length > 0) fillColor = "#" + (srgb[0].getAttribute("val") || "ffffff");
            }

            const textParagraphs: ParsedParagraph[] = [];
            const txBodys = getElementsByTagName(sp, "txBody");
            if (txBodys.length > 0) {
              const paragraphs = getElementsByTagName(txBodys[0], "p");
              for (const p of paragraphs) {
                const textRuns: ParsedTextRun[] = [];
                const runs = getElementsByTagName(p, "r");
                for (const r of runs) {
                  const ts = getElementsByTagName(r, "t");
                  if (ts.length > 0) {
                    textRuns.push({ text: ts[0].textContent || "", fontSize: 14, fontColor: "#000000" });
                  }
                }
                if (textRuns.length === 0) {
                  const ts = getElementsByTagName(p, "t");
                  for (const t of ts) {
                    textRuns.push({ text: t.textContent || "", fontSize: 14, fontColor: "#000000" });
                  }
                }
                textParagraphs.push({ textRuns });
              }
            }

            elements.push({
              id: `sp_${Math.random().toString(36).substr(2, 9)}`,
              type: 'shape',
              x, y, width, height,
              shapeType: "rect",
              fillColor,
              textParagraphs
            });
          }

          // Pictures
          const pics = getElementsByTagName(slideDoc, "pic");
          for (const pic of pics) {
            const xfrms = getElementsByTagName(pic, "xfrm");
            if (xfrms.length === 0) continue;
            const xfrm = xfrms[0];
            const offs = getElementsByTagName(xfrm, "off");
            const exts = getElementsByTagName(xfrm, "ext");
            if (offs.length === 0 || exts.length === 0) continue;

            const x = Math.round(parseInt(offs[0].getAttribute("x") || "0") / 9525);
            const y = Math.round(parseInt(offs[0].getAttribute("y") || "0") / 9525);
            const width = Math.round(parseInt(exts[0].getAttribute("cx") || "0") / 9525);
            const height = Math.round(parseInt(exts[0].getAttribute("cy") || "0") / 9525);

            if (width === 0 || height === 0) continue;

            const blips = getElementsByTagName(pic, "blip");
            if (blips.length === 0) continue;
            const rId = blips[0].getAttribute("r:embed") || blips[0].getAttribute("embed");
            
            let imageSrc = "";
            if (rId) {
              let imgPath = relsMap.get(rId);
              if (imgPath) {
                if (imgPath.startsWith("../")) {
                  imgPath = "ppt/" + imgPath.substring(3);
                }
                const imgZip = batchZip.file(imgPath);
                if (imgZip) {
                  const imgBase64 = await imgZip.async("base64");
                  imageSrc = `data:image/png;base64,${imgBase64}`;
                }
              }
            }
            if (imageSrc) {
              elements.push({
                id: `pic_${Math.random().toString(36).substr(2, 9)}`,
                type: 'image',
                x, y, width, height,
                imageSrc
              });
            }
          }

          tempSlides.push({
            slideNumber: idx + 1,
            width: slideWidth,
            height: slideHeight,
            background: slideBg,
            elements
          });
        }

        // Build individual PDF
        const batchPdf = await PDFDocument.create();
        const sandbox = document.createElement("div");
        sandbox.className = "pptx-batch-sandbox-container";
        sandbox.style.position = "absolute";
        sandbox.style.left = "-9999px";
        sandbox.style.top = "-9999px";
        document.body.appendChild(sandbox);

        for (let sIdx = 0; sIdx < tempSlides.length; sIdx++) {
          const slide = tempSlides[sIdx];
          
          const pageDiv = document.createElement("div");
          pageDiv.style.width = `${targetWidth}pt`;
          pageDiv.style.height = `${targetHeight}pt`;
          pageDiv.style.padding = `${marginPoints}pt`;
          pageDiv.style.boxSizing = "border-box";
          pageDiv.style.backgroundColor = "#ffffff";
          pageDiv.style.position = "relative";
          pageDiv.style.overflow = "hidden";
          pageDiv.style.display = "flex";
          pageDiv.style.justifyContent = "center";
          pageDiv.style.alignItems = "center";

          const slideInner = document.createElement("div");
          slideInner.style.width = `${slide.width}px`;
          slideInner.style.height = `${slide.height}px`;
          slideInner.style.backgroundColor = slide.background || "#ffffff";
          slideInner.style.position = "relative";
          slideInner.style.overflow = "hidden";

          for (const el of slide.elements) {
            const elNode = document.createElement("div");
            elNode.style.position = "absolute";
            elNode.style.left = `${el.x}px`;
            elNode.style.top = `${el.y}px`;
            elNode.style.width = `${el.width}px`;
            elNode.style.height = `${el.height}px`;
            elNode.style.boxSizing = "border-box";

            if (el.type === 'shape') {
              elNode.style.backgroundColor = el.fillColor || "transparent";
              if (el.textParagraphs) {
                el.textParagraphs.forEach(para => {
                  const pNode = document.createElement("div");
                  pNode.style.margin = "0";
                  para.textRuns.forEach(run => {
                    const span = document.createElement("span");
                    span.innerText = run.text;
                    span.style.fontSize = `${run.fontSize || 14}px`;
                    pNode.appendChild(span);
                  });
                  elNode.appendChild(pNode);
                });
              }
            } else if (el.type === 'image' && el.imageSrc) {
              const img = document.createElement("img");
              img.src = el.imageSrc;
              img.style.width = "100%";
              img.style.height = "100%";
              elNode.appendChild(img);
            }
            slideInner.appendChild(elNode);
          }

          pageDiv.appendChild(slideInner);
          sandbox.appendChild(pageDiv);

          // Calculate scaling
          const scaling = Math.min(targetWidth * (96/72) / slide.width, targetHeight * (96/72) / slide.height);
          slideInner.style.transform = `scale(${scaling * 0.98})`;
          slideInner.style.transformOrigin = "center center";

          const canvas = await withOklchPolyfill<HTMLCanvasElement>(() => 
            html2canvas(pageDiv, {
              scale: scaleDpiFactor,
              useCORS: true,
              logging: false
            } as any)
          );

          pageDiv.remove();

          const imgDataUrl = canvas.toDataURL("image/jpeg", 0.82);
          const imgResponse = await fetch(imgDataUrl);
          const imgBytes = await imgResponse.arrayBuffer();

          const pdfPage = batchPdf.addPage([targetWidth, targetHeight]);
          const pdfImg = await batchPdf.embedJpg(imgBytes);
          pdfPage.drawImage(pdfImg, { x: 0, y: 0, width: targetWidth, height: targetHeight });
        }

        sandbox.remove();

        const pdfBytes = await batchPdf.save();
        const baseName = batchFile.name.replace(/\.[^/.]+$/, "");
        zip.file(`${baseName}.pdf`, pdfBytes);
      }

      setProgressMsg("Compiling ZIP package...");
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipBlob);
      
      triggerDownload(zipUrl, "PowerPoint_PDFs_Archive.zip");

      setProgressMsg("Batch slide conversions complete!");
      setProgressPercent(100);
      setIsConverting(false);

    } catch (err: any) {
      console.error("Batch pptx conversion failed", err);
      alert("Batch conversion failed: " + err.message);
      setIsConverting(false);
    }
  };

  const triggerDownload = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name.replace(/\.[^/.]+$/, "") + ".pdf";
    if (name.endsWith(".zip")) {
      a.download = name;
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Render current selected PDF page preview
  const renderPdfPreview = async () => {
    if (!pdfjsDoc || !pdfCanvasRef.current) return;
    
    try {
      const page = await pdfjsDoc.getPage(currentPage);
      const canvas = pdfCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const viewport = page.getViewport({ scale: zoom * 1.5 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderCtx = {
        canvasContext: ctx,
        viewport: viewport
      };

      await page.render(renderCtx).promise;

    } catch (err) {
      console.error("PDF preview rendering crashed", err);
    }
  };

  useEffect(() => {
    if (pdfjsDoc) {
      renderPdfPreview();
    }
  }, [pdfjsDoc, currentPage, zoom]);

  // Handle active slide preview
  const activeSlide = parsedSlides[activeSlideIndex];

  // Helper count totals
  const totalChartsCount = parsedSlides.reduce((acc, s) => acc + s.elements.filter(el => el.type === 'chart').length, 0);
  const totalImagesCount = parsedSlides.reduce((acc, s) => acc + s.elements.filter(el => el.type === 'image').length, 0);
  const totalTablesCount = parsedSlides.reduce((acc, s) => acc + s.elements.filter(el => el.type === 'table').length, 0);
  const totalNotesCount = parsedSlides.reduce((acc, s) => acc + (s.notes ? 1 : 0), 0);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
      {/* Platform Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <Layers size={14} />
            PDF Conversion Suite
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">PowerPoint to PDF</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
            Convert PowerPoint presentations (.pptx, .ppt) to standard, print-ready PDF files in high fidelity. Safe and 100% local.
          </p>
        </div>
        
        {/* Zero-Trust Security Badge */}
        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl shrink-0">
          <div className="p-2 bg-emerald-500 text-white rounded-lg">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400">100% Client-Side Mode</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-500">Files never leave your local browser.</div>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Dropzone Upload Section */}
        {uploadStatus === "idle" && (
          <div className="lg:col-span-12 flex flex-col gap-6">
            <div 
              ref={dropzoneRef}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-3 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[360px] bg-white dark:bg-slate-900 ${
                dragActive 
                  ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-900/10 scale-[0.99] shadow-inner" 
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".pptx"
                className="hidden" 
                onChange={handleFileInput}
              />
              <div className="p-5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform">
                <Upload size={36} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drag & drop your presentation</h3>
              <p className="text-slate-400 dark:text-slate-500 text-sm mb-6 max-w-sm">
                Supports PowerPoint .pptx files. Processing runs in browser memory under a Zero-Trust shield.
              </p>
              <button 
                type="button" 
                className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-colors text-sm"
              >
                Browse Files
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex justify-center gap-4 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl self-center">
              <button 
                onClick={() => setIsBatchMode(false)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${!isBatchMode ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                Single Document
              </button>
              <button 
                onClick={() => setIsBatchMode(true)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${isBatchMode ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                Batch Processing
              </button>
            </div>

            {/* Local Storage Preset History */}
            {history.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mt-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 text-sm">
                    <History size={16} />
                    Recent Presentations Converted
                  </span>
                  <button onClick={clearHistory} className="text-xs font-semibold text-rose-600 hover:text-rose-500">
                    Clear History
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {history.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/30 text-xs">
                      <div className="flex flex-col gap-0.5 truncate pr-4">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{item.fileName}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(item.timestamp).toLocaleDateString()} &bull; {(item.originalSize / 1024 / 1024).toFixed(2)} MB &bull; {item.pageCount} page(s)
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-md font-bold text-[9px] uppercase shrink-0">
                        {item.mode}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading Spinner */}
        {uploadStatus === "reading" && (
          <div className="lg:col-span-12 flex flex-col items-center justify-center min-h-[300px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Decompressing presentation package...</h3>
            <p className="text-slate-400 text-xs">Reading PowerPoint layers from slides XML, shapes, tables, and images.</p>
          </div>
        )}

        {/* Error Notification */}
        {uploadStatus === "error" && (
          <div className="lg:col-span-12 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
            <AlertCircle className="text-rose-600 mb-4" size={40} />
            <h3 className="text-lg font-bold text-rose-800 dark:text-rose-400 mb-2">Decompiling PowerPoint failed</h3>
            <p className="text-rose-600 dark:text-rose-500 text-sm mb-6 max-w-sm leading-relaxed">{errorMessage}</p>
            <button 
              onClick={() => setUploadStatus("idle")}
              className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-6 py-2 rounded-xl transition-colors text-sm shadow-md"
            >
              Try Another File
            </button>
          </div>
        )}

        {/* Dynamic Presentation Editor Workspace */}
        {uploadStatus === "ready" && (
          <>
            {/* Sidebar Settings Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                  <Settings className="text-indigo-600" size={18} />
                  <span className="font-bold text-slate-800 dark:text-white text-sm">Export Settings Profile</span>
                </div>

                <div className="space-y-5">
                  {/* Quality Settings */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Conversion Profile Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: "standard", label: "Standard", desc: "144 DPI" },
                        { id: "high", label: "High Qual", desc: "288 DPI" },
                        { id: "print", label: "Print Ready", desc: "Crisp lines" },
                        { id: "compact", label: "Compact", desc: "Small Size" }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setConversionMode(opt.id as any)}
                          className={`p-2.5 border rounded-lg flex flex-col text-left transition-all ${
                            conversionMode === opt.id
                              ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-400 font-bold"
                              : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-300"
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-normal">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid Layout Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Slide Layout Arrangement
                    </label>
                    <select
                      value={slidesPerPage}
                      onChange={(e) => setSlidesPerPage(e.target.value as any)}
                      className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                    >
                      <option value="1">1 Slide Per PDF Page</option>
                      <option value="2">2 Slides Per PDF Page (Vertical Layout)</option>
                      <option value="4">4 Slides Per PDF Page (2x2 Grid)</option>
                      <option value="6">6 Slides Per PDF Page (2x3 Grid)</option>
                      <option value="notes">Speaker Notes Handout Layout</option>
                    </select>
                  </div>

                  {/* Page Geometry Overrides */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Geometry Overrides
                    </label>
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Target Page Size</span>
                        <select
                          value={pageSize}
                          onChange={(e) => setPageSize(e.target.value)}
                          className="w-full text-xs p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                        >
                          {PAGE_SIZES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block mb-1">Orientation</span>
                          <select
                            value={orientation}
                            onChange={(e) => setOrientation(e.target.value as any)}
                            className="w-full text-xs p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                          >
                            <option value="landscape">Landscape</option>
                            <option value="portrait">Portrait</option>
                          </select>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block mb-1">Margins</span>
                          <select
                            value={marginType}
                            onChange={(e) => setMarginType(e.target.value)}
                            className="w-full text-xs p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                          >
                            {MARGIN_SIZES.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide Range Filter */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Slide Ranges
                      </label>
                      <span className="text-[10px] text-slate-400">Total: {parsedSlides.length} slides</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 1-3, 5, 8-10"
                      value={slideRangeString}
                      onChange={(e) => setSlideRangeString(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  {/* Headers & Footers options */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Headers & Footers
                    </label>
                    <div className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Custom Header Text"
                        value={customHeader}
                        onChange={(e) => setCustomHeader(e.target.value)}
                        className="w-full text-xs p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                      />
                      <input
                        type="text"
                        placeholder="Custom Footer Text"
                        value={customFooter}
                        onChange={(e) => setCustomFooter(e.target.value)}
                        className="w-full text-xs p-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                      />
                      <div className="space-y-1.5 pt-1">
                        <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includePageNumbers}
                            onChange={(e) => setIncludePageNumbers(e.target.checked)}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>Show Page Numbers</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeDateTime}
                            onChange={(e) => setIncludeDateTime(e.target.checked)}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>Show Current Date</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Watermarks */}
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer mb-3">
                      <input
                        type="checkbox"
                        checked={enableWatermark}
                        onChange={(e) => setEnableWatermark(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Layer Watermark Overlay</span>
                    </label>

                    {enableWatermark && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-xs">
                        <div className="flex gap-2 mb-2">
                          <button
                            type="button"
                            onClick={() => setWatermarkType("text")}
                            className={`flex-1 py-1 text-center rounded text-[11px] font-bold ${watermarkType === "text" ? "bg-indigo-600 text-white" : "bg-slate-150 text-slate-600 hover:bg-slate-200"}`}
                          >
                            Text Label
                          </button>
                          <button
                            type="button"
                            onClick={() => setWatermarkType("image")}
                            className={`flex-1 py-1 text-center rounded text-[11px] font-bold ${watermarkType === "image" ? "bg-indigo-600 text-white" : "bg-slate-150 text-slate-600 hover:bg-slate-200"}`}
                          >
                            Logo Graphic
                          </button>
                        </div>

                        {watermarkType === "text" ? (
                          <input
                            type="text"
                            value={watermarkText}
                            onChange={(e) => setWatermarkText(e.target.value)}
                            className="w-full p-2 border rounded bg-white text-xs dark:bg-slate-900"
                          />
                        ) : (
                          <div className="space-y-2">
                            <input
                              ref={watermarkImageInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleWatermarkImageUpload}
                              className="w-full text-[10px] text-slate-400"
                            />
                            {watermarkImagePreview && (
                              <div className="relative w-16 h-16 border rounded bg-white flex items-center justify-center p-1">
                                <img src={watermarkImagePreview} className="max-w-full max-h-full object-contain" />
                                <button
                                  type="button"
                                  onClick={clearWatermarkImage}
                                  className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-0.5 hover:bg-rose-500"
                                >
                                  <X size={10} />
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Opacity</span>
                            <span>{Math.round(watermarkOpacity * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0.05"
                            max="0.8"
                            step="0.05"
                            value={watermarkOpacity}
                            onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                            className="w-full accent-indigo-600"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                disabled={isConverting}
                onClick={convertPowerPointToPdf}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Rasterizing Presentation...</span>
                  </>
                ) : (
                  <>
                    <Play size={16} fill="white" />
                    <span>Convert to PDF</span>
                  </>
                )}
              </button>
            </div>

            {/* Left and Right Side-by-Side Visual Workspace */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Info Metrics summary */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400 justify-between items-center">
                <div className="flex flex-wrap gap-4">
                  <span>File: <strong className="text-slate-800 dark:text-slate-200">{file?.name}</strong></span>
                  <span>Slides: <strong className="text-slate-800 dark:text-slate-200">{parsedSlides.length}</strong></span>
                  {totalImagesCount > 0 && <span>Images: <strong className="text-slate-800 dark:text-slate-200">{totalImagesCount}</strong></span>}
                  {totalTablesCount > 0 && <span>Tables: <strong className="text-slate-800 dark:text-slate-200">{totalTablesCount}</strong></span>}
                  {totalChartsCount > 0 && <span>Charts: <strong className="text-slate-800 dark:text-slate-200">{totalChartsCount}</strong></span>}
                  {totalNotesCount > 0 && <span>Notes: <strong className="text-slate-800 dark:text-slate-200">{totalNotesCount}</strong></span>}
                </div>
                <button
                  type="button"
                  onClick={() => setUploadStatus("idle")}
                  className="text-rose-600 hover:text-rose-500 flex items-center gap-1 font-bold"
                >
                  <Trash2 size={13} />
                  <span>Remove</span>
                </button>
              </div>

              {/* Conversion Progress Bar */}
              {isConverting && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-2.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">{progressMsg}</span>
                    <span className="text-indigo-600">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Workspace Split Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                
                {/* Left Preview Pane: original PPTX slides */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col min-h-[460px]">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                    <span className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">
                      Original Slide Preview
                    </span>
                    <span className="text-slate-400 text-xs">
                      Slide {activeSlideIndex + 1} of {parsedSlides.length}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl p-4 overflow-hidden relative border border-slate-100 dark:border-slate-800 min-h-[280px]">
                    {activeSlide && (
                      <div 
                        className="shadow-md relative overflow-hidden transition-all shrink-0 select-none border border-slate-200 dark:border-slate-800"
                        style={{
                          width: `${activeSlide.width}px`,
                          height: `${activeSlide.height}px`,
                          backgroundColor: activeSlide.background || "#ffffff",
                          transform: `scale(${zoom * 0.35})`,
                          transformOrigin: "center center",
                        }}
                      >
                        {activeSlide.elements.map(el => (
                          <div
                            key={el.id}
                            style={{
                              position: "absolute",
                              left: `${el.x}px`,
                              top: `${el.y}px`,
                              width: `${el.width}px`,
                              height: `${el.height}px`,
                              boxSizing: "border-box",
                              overflow: "hidden"
                            }}
                          >
                            {el.type === 'shape' && (
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  backgroundColor: el.fillColor || "transparent",
                                  border: el.borderWidth ? `${el.borderWidth}px solid ${el.borderColor || "#000"}` : "none",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  padding: "4px",
                                  boxSizing: "border-box"
                                }}
                              >
                                {el.textParagraphs?.map((p, pIdx) => (
                                  <div key={pIdx} style={{ textAlign: p.alignHorizontal || "left", margin: 0, padding: "1px 0" }}>
                                    {p.textRuns.map((r, rIdx) => (
                                      <span
                                        key={rIdx}
                                        style={{
                                          fontSize: `${r.fontSize || 14}px`,
                                          color: r.fontColor || "#000000",
                                          fontWeight: r.bold ? "bold" : "normal",
                                          fontStyle: r.italic ? "italic" : "normal",
                                          textDecoration: r.underline ? "underline" : "none",
                                          fontFamily: "Calibri, Arial, sans-serif"
                                        }}
                                      >
                                        {r.text}
                                      </span>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            )}

                            {el.type === 'image' && el.imageSrc && (
                              <img src={el.imageSrc} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            )}

                            {el.type === 'table' && el.tableData && (
                              <table style={{ width: "100%", height: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                                <tbody>
                                  {el.tableData.rows.map((row, rIdx) => (
                                    <tr key={rIdx} style={{ height: el.tableData?.rowHeights[rIdx] ? `${el.tableData.rowHeights[rIdx]}px` : "auto" }}>
                                      {row.map((cell, cIdx) => {
                                        if (!cell.isMaster) return null;
                                        return (
                                          <td
                                            key={cIdx}
                                            colSpan={cell.colSpan}
                                            rowSpan={cell.rowSpan}
                                            style={{
                                              backgroundColor: cell.fillColor || "transparent",
                                              border: "1px solid #cbd5e1",
                                              padding: "4px",
                                              verticalAlign: "middle"
                                            }}
                                          >
                                            {cell.textParagraphs.map((para, pIdx) => (
                                              <div key={pIdx} style={{ textAlign: para.alignHorizontal || "left", margin: 0 }}>
                                                {para.textRuns.map((run, rIdx) => (
                                                  <span
                                                    key={rIdx}
                                                    style={{
                                                      fontSize: `${run.fontSize || 12}px`,
                                                      color: run.fontColor || "#000000",
                                                      fontWeight: run.bold ? "bold" : "normal",
                                                      fontStyle: run.italic ? "italic" : "normal",
                                                      fontFamily: "Calibri, Arial, sans-serif"
                                                    }}
                                                  >
                                                    {run.text}
                                                  </span>
                                                ))}
                                              </div>
                                            ))}
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}

                            {el.type === 'chart' && el.chartData && renderChartAsSvg(el.chartData, el.width, el.height)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Slide Speaker Notes rendering panel */}
                  {activeSlide?.notes && (
                    <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl max-h-[120px] overflow-y-auto">
                      <span className="text-[9px] font-bold text-slate-400 block mb-1">Speaker Slide Notes</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{activeSlide.notes}</p>
                    </div>
                  )}

                  {/* Navigation carousel */}
                  <div className="flex items-center justify-between mt-4">
                    <button
                      type="button"
                      disabled={activeSlideIndex === 0}
                      onClick={() => setActiveSlideIndex(prev => prev - 1)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold disabled:opacity-50"
                    >
                      Prev Slide
                    </button>
                    <div className="flex gap-2">
                      <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2 border rounded-lg bg-white dark:bg-slate-900 text-slate-500">
                        <ZoomOut size={14} />
                      </button>
                      <button onClick={() => setZoom(z => Math.min(2.0, z + 0.1))} className="p-2 border rounded-lg bg-white dark:bg-slate-900 text-slate-500">
                        <ZoomIn size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      disabled={activeSlideIndex === parsedSlides.length - 1}
                      onClick={() => setActiveSlideIndex(prev => prev + 1)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold disabled:opacity-50"
                    >
                      Next Slide
                    </button>
                  </div>
                </div>

                {/* Right Preview Pane: generated PDF canvas preview */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col min-h-[460px]">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                    <span className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">
                      Generated PDF Preview
                    </span>
                    {outputPdfUrl && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
                        <Check size={14} /> Ready
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl p-4 overflow-auto relative border border-slate-100 dark:border-slate-800 min-h-[280px]">
                    {outputPdfUrl ? (
                      <canvas ref={pdfCanvasRef} className="max-w-full shadow-md border border-slate-200 dark:border-slate-800 bg-white" />
                    ) : (
                      <div className="text-slate-400 text-xs text-center p-6 flex flex-col items-center">
                        <Eye size={36} className="text-slate-350 mb-3" />
                        <span>PDF page preview will load once slides are compiled.</span>
                      </div>
                    )}
                  </div>

                  {outputPdfUrl && (
                    <div className="flex items-center justify-between mt-4">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold disabled:opacity-50"
                      >
                        Prev Page
                      </button>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Page {currentPage} of {estimatedPages}
                      </span>
                      <button
                        type="button"
                        disabled={currentPage === estimatedPages}
                        onClick={() => setCurrentPage(p => Math.min(estimatedPages, p + 1))}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold disabled:opacity-50"
                      >
                        Next Page
                      </button>
                    </div>
                  )}

                  {outputPdfUrl && (
                    <a
                      href={outputPdfUrl}
                      download={file?.name.replace(/\.[^/.]+$/, "") + ".pdf"}
                      className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-center font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download size={15} />
                      Download Compiled PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Batch Conversion Workspace */}
        {uploadStatus === "ready" && isBatchMode && (
          <div className="lg:col-span-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <span className="font-bold text-slate-800 dark:text-white text-sm">Batch Convert Files</span>
              <button onClick={() => setBatchFiles([])} className="text-xs text-rose-600 font-bold hover:text-rose-500">
                Clear All
              </button>
            </div>
            
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {batchFiles.map((f, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 text-xs">
                  <div className="flex items-center gap-3 truncate">
                    <FileText className="text-indigo-500 shrink-0" size={16} />
                    <span className="font-semibold text-slate-700 dark:text-slate-350 truncate">{f.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                    <button 
                      onClick={() => setBatchFiles(prev => prev.filter((_, idx) => idx !== index))}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={convertBatchPowerPointToPdf}
              disabled={isConverting || batchFiles.length === 0}
              className="mt-6 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:bg-slate-200 disabled:text-slate-400"
            >
              {isConverting ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} fill="white" />}
              <span>Convert Batch to ZIP Archive</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
