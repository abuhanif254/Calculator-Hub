"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download,
  RefreshCw, History, ShieldCheck, Check, Columns, Layers, CheckSquare,
  ZoomIn, ZoomOut, Plus, X, List, Grid, Filter, Bookmark, Keyboard, ShieldAlert,
  Lock, Unlock, Copy, FileJson, Sparkles, BookOpen, AlertTriangle, HelpCircle,
  Eye, FileOutput, ChevronRight
} from "lucide-react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import JSZip from "jszip";
import html2canvas from "html2canvas";

// --- Types ---

interface ConversionHistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
  originalSize: number;
  pdfSize: number;
  pageCount: number;
  mode: "standard" | "high" | "print" | "compact";
  sheetCount: number;
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

// --- Parsed Spreadsheet Structures ---

interface SheetCell {
  address: string;
  value: string;
  formula?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: number;
  fontColor?: string;
  bgColor?: string;
  alignHorizontal?: "left" | "center" | "right" | "justify";
  alignVertical?: "top" | "middle" | "bottom";
  wrapText?: boolean;
  rowSpan?: number;
  colSpan?: number;
  isMaster?: boolean;
  borderLeft?: string;
  borderRight?: string;
  borderTop?: string;
  borderBottom?: string;
}

interface ParsedWorksheet {
  name: string;
  maxRow: number;
  maxCol: number;
  colsWidths: number[]; // col indices -> width in pixels
  rowsHeights: number[]; // row indices -> height in pixels
  cells: Record<string, SheetCell>; // "row_col" -> SheetCell
  chartsCount: number;
  imagesCount: number;
  formulasCount: number;
}

export function ExcelToPdfTool() {
  const [isMounted, setIsMounted] = useState(false);

  // File Upload States
  const [file, setFile] = useState<File | null>(null);
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [isBatchMode, setIsBatchMode] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "reading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Parsed sheets data
  const [parsedSheets, setParsedSheets] = useState<ParsedWorksheet[]>([]);
  const [selectedSheetIndex, setSelectedSheetIndex] = useState<number>(0);
  const [targetSheets, setTargetSheets] = useState<Record<number, boolean>>({}); // index -> converted or not

  // Preview States
  const [estimatedPages, setEstimatedPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1.0);

  // Settings panel
  const [conversionMode, setConversionMode] = useState<"standard" | "high" | "print" | "compact">("standard");
  const [pageSize, setPageSize] = useState<string>("LETTER");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape");
  const [marginType, setMarginType] = useState<string>("normal");
  
  // Spreadsheet-specific layout options
  const [scalingMode, setScalingMode] = useState<"fit-cols" | "fit-rows" | "fit-sheet" | "auto" | "custom">("fit-cols");
  const [customScale, setCustomScale] = useState<number>(100);
  const [displayFormulas, setDisplayFormulas] = useState<boolean>(false);
  const [showGridlines, setShowGridlines] = useState<boolean>(true);

  // Header & Footer
  const [customHeader, setCustomHeader] = useState<string>("");
  const [customFooter, setCustomFooter] = useState<string>("");
  const [includePageNumbers, setIncludePageNumbers] = useState<boolean>(true);
  const [includeDateTime, setIncludeDateTime] = useState<boolean>(false);
  const [includeFileName, setIncludeFileName] = useState<boolean>(true);

  // Watermarks
  const [enableWatermark, setEnableWatermark] = useState<boolean>(false);
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState<string>("CONFIDENTIAL");
  const [watermarkFontSize, setWatermarkFontSize] = useState<number>(48);
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.15);
  const [watermarkRotation, setWatermarkRotation] = useState<number>(45);
  const [watermarkColor, setWatermarkColor] = useState<string>("#ff0000");
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [watermarkImagePreview, setWatermarkImagePreview] = useState<string | null>(null);

  // Conversion Progress & Outputs
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [progressMsg, setProgressMsg] = useState<string>("");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [outputPdfUrl, setOutputPdfUrl] = useState<string | null>(null);
  const [outputPdfBlob, setOutputPdfBlob] = useState<Blob | null>(null);
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);

  // Local History & Storage Presets
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // DOM Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const excelRenderSandboxRef = useRef<HTMLDivElement>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const watermarkImageInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState<boolean>(false);

  // Hydration safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load saved configurations
  useEffect(() => {
    if (!isMounted) return;
    const savedHistory = localStorage.getItem("excel_to_pdf_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.warn("Failed to load history presets", e);
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
      sheetCount: parsedSheets.length
    };
    setHistory(prev => {
      const updated = [historyItem, ...prev].slice(0, 10);
      localStorage.setItem("excel_to_pdf_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("excel_to_pdf_history");
  };

  // Load PDF.js from CDN
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

  // Helper to convert range coordinate strings (e.g. "A1:C3")
  const parseRangeStr = (rangeStr: string) => {
    const [start, end] = rangeStr.split(':');
    const startCol = start.replace(/[0-9]/g, '');
    const startRow = parseInt(start.replace(/[^0-9]/g, ''));
    const endCol = end ? end.replace(/[0-9]/g, '') : startCol;
    const endRow = end ? parseInt(end.replace(/[^0-9]/g, '')) : startRow;
    
    const colToInt = (col: string) => {
      let val = 0;
      for (let i = 0; i < col.length; i++) {
        val = val * 26 + (col.charCodeAt(i) - 64);
      }
      return val;
    };
    
    return {
      top: startRow,
      bottom: endRow,
      left: colToInt(startCol),
      right: colToInt(endCol)
    };
  };

  // Extract ARGB colors from exceljs colors structure
  const resolveExcelColor = (colorObj: any): string | undefined => {
    if (!colorObj) return undefined;
    if (typeof colorObj === "string") return colorObj.length === 8 ? `#${colorObj.substring(2)}` : colorObj;
    if (colorObj.argb) {
      const argb = colorObj.argb;
      return argb.length === 8 ? `#${argb.substring(2)}` : `#${argb}`;
    }
    return undefined;
  };

  // Parse Excel file (both XLSX and XLS compatibility)
  const parseExcelDocument = async (targetFile: File) => {
    setUploadStatus("reading");
    setErrorMessage(null);
    setOutputPdfUrl(null);
    setOutputPdfBlob(null);
    setPdfjsDoc(null);
    setEstimatedPages(0);
    setParsedSheets([]);

    try {
      const isXlsx = targetFile.name.endsWith(".xlsx");
      const isXls = targetFile.name.endsWith(".xls");

      if (!isXlsx && !isXls) {
        throw new Error("Unsupported format. Please upload an .xlsx or .xls file.");
      }

      const arrayBuffer = await targetFile.arrayBuffer();
      const sheetsList: ParsedWorksheet[] = [];

      if (isXlsx) {
        // Use exceljs for XLSX style retention
        const ExcelJS = (await import("exceljs")).default;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        workbook.worksheets.forEach((ws) => {
          let maxRow = 1;
          let maxCol = 1;
          let formulasCount = 0;
          let imagesCount = 0;

          // Find actual boundaries
          ws.eachRow((row, rowNumber) => {
            if (rowNumber > maxRow) maxRow = rowNumber;
            row.eachCell((cell, colNumber) => {
              if (colNumber > maxCol) maxCol = colNumber;
              if (cell.formula) formulasCount++;
            });
          });

          // Detect column widths in pixels
          const colsWidths: number[] = [];
          for (let c = 1; c <= maxCol; c++) {
            const col = ws.getColumn(c);
            // Character width to pixels mapping approximation
            const charWidth = col.width !== undefined ? col.width : 10;
            colsWidths[c] = Math.round(charWidth * 8);
          }

          // Detect row heights in pixels
          const rowsHeights: number[] = [];
          for (let r = 1; r <= maxRow; r++) {
            const row = ws.getRow(r);
            const height = row.height !== undefined ? row.height : 20;
            rowsHeights[r] = Math.round(height * 1.3);
          }

          // Parse merges
          const mergeMap: Record<string, { rowSpan: number; colSpan: number; isMaster: boolean }> = {};
          
          // exceljs maintains merge ranges in ws.model.merges
          const merges = ws.model.merges || [];
          merges.forEach((mStr) => {
            try {
              const range = parseRangeStr(mStr);
              const rSpan = range.bottom - range.top + 1;
              const cSpan = range.right - range.left + 1;

              for (let r = range.top; r <= range.bottom; r++) {
                for (let c = range.left; c <= range.right; c++) {
                  const cellKey = `${r}_${c}`;
                  if (r === range.top && c === range.left) {
                    mergeMap[cellKey] = { rowSpan: rSpan, colSpan: cSpan, isMaster: true };
                  } else {
                    mergeMap[cellKey] = { rowSpan: rSpan, colSpan: cSpan, isMaster: false };
                  }
                }
              }
            } catch (err) {
              console.warn("Error parsing merge block range", err);
            }
          });

          // Parse cell styles & values
          const cells: Record<string, SheetCell> = {};
          for (let r = 1; r <= maxRow; r++) {
            for (let c = 1; c <= maxCol; c++) {
              const cell = ws.getCell(r, c);
              const cellKey = `${r}_${c}`;
              const mergeInfo = mergeMap[cellKey] || { rowSpan: 1, colSpan: 1, isMaster: true };

              let cellVal = "";
              if (cell.value !== null && cell.value !== undefined) {
                if (typeof cell.value === "object") {
                  if ("result" in cell.value) {
                    cellVal = String((cell.value as any).result || "");
                  } else if ("richText" in cell.value) {
                    cellVal = (cell.value as any).richText.map((rt: any) => rt.text).join("");
                  } else if ("text" in cell.value) {
                    cellVal = String((cell.value as any).text || "");
                  } else {
                    cellVal = JSON.stringify(cell.value);
                  }
                } else {
                  cellVal = String(cell.value);
                }
              }

              // Extract styles
              const cellStyle: SheetCell = {
                address: cell.address,
                value: cellVal,
                formula: cell.formula,
                bold: cell.font?.bold || false,
                italic: cell.font?.italic || false,
                underline: cell.font?.underline ? true : false,
                fontSize: cell.font?.size || 11,
                fontColor: resolveExcelColor(cell.font?.color),
                bgColor: resolveExcelColor(cell.fill && (cell.fill as any).fgColor),
                alignHorizontal: cell.alignment?.horizontal as any,
                alignVertical: cell.alignment?.vertical as any,
                wrapText: cell.alignment?.wrapText || false,
                rowSpan: mergeInfo.rowSpan,
                colSpan: mergeInfo.colSpan,
                isMaster: mergeInfo.isMaster
              };

              // Map explicit border flags
              if (cell.border) {
                if (cell.border.left) cellStyle.borderLeft = "1px solid #a1a1aa";
                if (cell.border.right) cellStyle.borderRight = "1px solid #a1a1aa";
                if (cell.border.top) cellStyle.borderTop = "1px solid #a1a1aa";
                if (cell.border.bottom) cellStyle.borderBottom = "1px solid #a1a1aa";
              }

              cells[cellKey] = cellStyle;
            }
          }

          sheetsList.push({
            name: ws.name,
            maxRow,
            maxCol,
            colsWidths,
            rowsHeights,
            cells,
            chartsCount: 0,
            imagesCount: ws.model.media?.length || 0,
            formulasCount
          });
        });

      } else {
        // Fallback to xlsx (SheetJS) for binary .xls
        const XLSX = await import("xlsx");
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        workbook.SheetNames.forEach((sheetName) => {
          const ws = workbook.Sheets[sheetName];
          const range = ws["!ref"] ? parseRangeStr(ws["!ref"]) : { top: 1, bottom: 1, left: 1, right: 1 };
          
          const maxRow = range.bottom;
          const maxCol = range.right;
          let formulasCount = 0;

          // Default column widths
          const colsWidths: number[] = [];
          const colsMeta = ws["!cols"] || [];
          for (let c = 1; c <= maxCol; c++) {
            const meta = colsMeta[c - 1];
            const charWidth = meta?.wch ?? 10;
            colsWidths[c] = Math.round(charWidth * 8);
          }

          // Default row heights
          const rowsHeights: number[] = [];
          const rowsMeta = ws["!rows"] || [];
          for (let r = 1; r <= maxRow; r++) {
            const meta = rowsMeta[r - 1];
            const height = meta?.hpt ?? 20;
            rowsHeights[r] = Math.round(height * 1.3);
          }

          // Parse merges
          const mergeMap: Record<string, { rowSpan: number; colSpan: number; isMaster: boolean }> = {};
          const merges = ws["!merges"] || [];
          merges.forEach((m) => {
            const startRow = m.s.r + 1;
            const startCol = m.s.c + 1;
            const endRow = m.e.r + 1;
            const endCol = m.e.c + 1;

            const rSpan = endRow - startRow + 1;
            const cSpan = endCol - startCol + 1;

            for (let r = startRow; r <= endRow; r++) {
              for (let c = startCol; c <= endCol; c++) {
                const cellKey = `${r}_${c}`;
                if (r === startRow && c === startCol) {
                  mergeMap[cellKey] = { rowSpan: rSpan, colSpan: cSpan, isMaster: true };
                } else {
                  mergeMap[cellKey] = { rowSpan: rSpan, colSpan: cSpan, isMaster: false };
                }
              }
            }
          });

          // Cell processing
          const cells: Record<string, SheetCell> = {};
          for (let r = 1; r <= maxRow; r++) {
            for (let c = 1; c <= maxCol; c++) {
              const cellKey = `${r}_${c}`;
              const mergeInfo = mergeMap[cellKey] || { rowSpan: 1, colSpan: 1, isMaster: true };

              // SheetJS addresses are 0-indexed column letter + row number
              const colLetter = XLSX.utils.encode_col(c - 1);
              const cellAddress = `${colLetter}${r}`;
              const cell = ws[cellAddress];

              let cellVal = "";
              let formula: string | undefined = undefined;

              if (cell) {
                cellVal = cell.w || String(cell.v || "");
                if (cell.f) {
                  formula = cell.f;
                  formulasCount++;
                }
              }

              cells[cellKey] = {
                address: cellAddress,
                value: cellVal,
                formula,
                bold: false,
                italic: false,
                underline: false,
                fontSize: 11,
                rowSpan: mergeInfo.rowSpan,
                colSpan: mergeInfo.colSpan,
                isMaster: mergeInfo.isMaster
              };
            }
          }

          sheetsList.push({
            name: sheetName,
            maxRow,
            maxCol,
            colsWidths,
            rowsHeights,
            cells,
            chartsCount: 0,
            imagesCount: 0,
            formulasCount
          });
        });
      }

      if (sheetsList.length === 0) {
        throw new Error("No worksheets found in spreadsheet file.");
      }

      setParsedSheets(sheetsList);
      setSelectedSheetIndex(0);

      // Select all sheets by default
      const defaultTargets: Record<number, boolean> = {};
      sheetsList.forEach((_, idx) => {
        defaultTargets[idx] = true;
      });
      setTargetSheets(defaultTargets);

      setFileSize(targetFile.size);
      setFile(targetFile);
      setUploadStatus("ready");
      setCurrentPage(1);

      // Estimate total output pages
      recalculateEstimatedPages(sheetsList, defaultTargets);

    } catch (err: any) {
      console.error("Spreadsheet parsing failed", err);
      setErrorMessage(err.message || "Failed to read Excel workbook layers.");
      setUploadStatus("error");
    }
  };

  // Recalculate Page Splits based on layout settings
  const recalculateEstimatedPages = (sheets = parsedSheets, targets = targetSheets) => {
    if (sheets.length === 0) return;

    let totalPages = 0;
    
    // Page printable dimensions
    const activeSizeConfig = PAGE_SIZES.find(s => s.id === pageSize) || PAGE_SIZES[0];
    const targetWidth = orientation === "portrait" ? activeSizeConfig.width : activeSizeConfig.height;
    const targetHeight = orientation === "portrait" ? activeSizeConfig.height : activeSizeConfig.width;
    const marginPoints = MARGIN_SIZES.find(m => m.id === marginType)?.value || 72;

    const printableWidth = (targetWidth - marginPoints * 2) * (96 / 72); // pixels
    const printableHeight = (targetHeight - marginPoints * 2) * (96 / 72); // pixels

    sheets.forEach((sheet, idx) => {
      if (!targets[idx]) return;

      // Cumulative dimension size in pixels
      const sheetWidth = sheet.colsWidths.slice(1).reduce((a, b) => a + (b || 80), 0);
      const sheetHeight = sheet.rowsHeights.slice(1).reduce((a, b) => a + (b || 20), 0);

      let scale = 1.0;
      if (scalingMode === "fit-cols") {
        scale = printableWidth / sheetWidth;
      } else if (scalingMode === "fit-rows") {
        scale = printableHeight / sheetHeight;
      } else if (scalingMode === "fit-sheet") {
        scale = Math.min(printableWidth / sheetWidth, printableHeight / sheetHeight);
      } else if (scalingMode === "custom") {
        scale = customScale / 100;
      }

      // Cap scaling to reasonable levels so it doesn't infinite loop or divide by zero
      scale = Math.max(0.1, Math.min(2.0, scale));

      const scaledPrintableHeight = printableHeight / scale;
      const scaledPrintableWidth = printableWidth / scale;

      // Vertical pagination (splits rows)
      let verticalPages = 1;
      let heightAccumulator = 0;
      for (let r = 1; r <= sheet.maxRow; r++) {
        const rh = sheet.rowsHeights[r] || 20;
        if (heightAccumulator + rh > scaledPrintableHeight) {
          verticalPages++;
          heightAccumulator = rh;
        } else {
          heightAccumulator += rh;
        }
      }

      // Horizontal pagination (splits columns - only if not fit columns/sheet)
      let horizontalPages = 1;
      if (scalingMode !== "fit-cols" && scalingMode !== "fit-sheet") {
        let widthAccumulator = 0;
        for (let c = 1; c <= sheet.maxCol; c++) {
          const cw = sheet.colsWidths[c] || 80;
          if (widthAccumulator + cw > scaledPrintableWidth) {
            horizontalPages++;
            widthAccumulator = cw;
          } else {
            widthAccumulator += cw;
          }
        }
      }

      totalPages += (verticalPages * horizontalPages);
    });

    setEstimatedPages(totalPages || 1);
  };

  useEffect(() => {
    if (parsedSheets.length > 0) {
      recalculateEstimatedPages();
    }
  }, [pageSize, orientation, marginType, scalingMode, customScale, targetSheets, parsedSheets]);

  // Handle drag uploads
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
        const xlsFiles = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith(".xlsx") || f.name.endsWith(".xls"));
        setBatchFiles(prev => [...prev, ...xlsFiles]);
      } else {
        parseExcelDocument(e.dataTransfer.files[0]);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (isBatchMode) {
        const xlsFiles = Array.from(e.target.files).filter(f => f.name.endsWith(".xlsx") || f.name.endsWith(".xls"));
        setBatchFiles(prev => [...prev, ...xlsFiles]);
      } else {
        parseExcelDocument(e.target.files[0]);
      }
    }
  };

  // Custom watermarks logo uploads
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

  const hexToRgbRatio = (hex: string) => {
    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return { r, g, b };
  };

  // Create paginated HTML sheets in memory and render to canvas
  const convertExcelToPdf = async () => {
    if (!file || isConverting || parsedSheets.length === 0) return;

    setIsConverting(true);
    setProgressPercent(0);
    setProgressMsg("Structuring Excel cells...");

    try {
      const activeSizeConfig = PAGE_SIZES.find(s => s.id === pageSize) || PAGE_SIZES[0];
      const targetWidth = orientation === "portrait" ? activeSizeConfig.width : activeSizeConfig.height;
      const targetHeight = orientation === "portrait" ? activeSizeConfig.height : activeSizeConfig.width;
      const marginPoints = MARGIN_SIZES.find(m => m.id === marginType)?.value || 72;

      const printableWidth = (targetWidth - marginPoints * 2) * (96 / 72); // pixels
      const printableHeight = (targetHeight - marginPoints * 2) * (96 / 72); // pixels

      // Determine Quality scale DPI multiplier
      let scaleDpiFactor = 1.5; // Standard
      if (conversionMode === "high") scaleDpiFactor = 2.0;
      else if (conversionMode === "print") scaleDpiFactor = 3.0;
      else if (conversionMode === "compact") scaleDpiFactor = 1.0;

      const pdfDoc = await PDFDocument.create();
      
      // Load watermark image bytes
      let watermarkImgBytes: Uint8Array | null = null;
      if (enableWatermark && watermarkType === "image" && watermarkImage) {
        const arrayBuf = await watermarkImage.arrayBuffer();
        watermarkImgBytes = new Uint8Array(arrayBuf);
      }

      // Create hidden sandbox container in DOM
      const sandbox = document.createElement("div");
      sandbox.className = "excel-pdf-sandbox-container";
      sandbox.style.position = "absolute";
      sandbox.style.left = "-9999px";
      sandbox.style.top = "-9999px";
      document.body.appendChild(sandbox);

      let globalPageIdx = 0;
      let totalEstimatedPagesToPrint = estimatedPages || 1;

      // Loop worksheets
      for (let sIdx = 0; sIdx < parsedSheets.length; sIdx++) {
        if (!targetSheets[sIdx]) continue;
        
        const sheet = parsedSheets[sIdx];
        setProgressMsg(`Generating Sheet Grid: ${sheet.name}...`);
        
        const sheetWidth = sheet.colsWidths.slice(1).reduce((a, b) => a + (b || 80), 0);
        const sheetHeight = sheet.rowsHeights.slice(1).reduce((a, b) => a + (b || 20), 0);

        let scale = 1.0;
        if (scalingMode === "fit-cols") {
          scale = printableWidth / sheetWidth;
        } else if (scalingMode === "fit-rows") {
          scale = printableHeight / sheetHeight;
        } else if (scalingMode === "fit-sheet") {
          scale = Math.min(printableWidth / sheetWidth, printableHeight / sheetHeight);
        } else if (scalingMode === "custom") {
          scale = customScale / 100;
        }
        
        scale = Math.max(0.1, Math.min(2.0, scale));

        const scaledPrintableHeight = printableHeight / scale;
        const scaledPrintableWidth = printableWidth / scale;

        // Perform row splitting ranges
        const rowRanges: { start: number; end: number }[] = [];
        let heightAccum = 0;
        let startRow = 1;
        for (let r = 1; r <= sheet.maxRow; r++) {
          const rh = sheet.rowsHeights[r] || 20;
          if (heightAccum + rh > scaledPrintableHeight) {
            rowRanges.push({ start: startRow, end: r - 1 });
            startRow = r;
            heightAccum = rh;
          } else {
            heightAccum += rh;
          }
        }
        rowRanges.push({ start: startRow, end: sheet.maxRow });

        // Perform column splitting ranges (only if not fit columns/sheet)
        const colRanges: { start: number; end: number }[] = [];
        if (scalingMode !== "fit-cols" && scalingMode !== "fit-sheet") {
          let widthAccum = 0;
          let startCol = 1;
          for (let c = 1; c <= sheet.maxCol; c++) {
            const cw = sheet.colsWidths[c] || 80;
            if (widthAccum + cw > scaledPrintableWidth) {
              colRanges.push({ start: startCol, end: c - 1 });
              startCol = c;
              widthAccum = cw;
            } else {
              widthAccum += cw;
            }
          }
          colRanges.push({ start: startCol, end: sheet.maxCol });
        } else {
          colRanges.push({ start: 1, end: sheet.maxCol });
        }

        // Render each segmented page block to HTML and snapshot
        for (let rRangeIdx = 0; rRangeIdx < rowRanges.length; rRangeIdx++) {
          const rRange = rowRanges[rRangeIdx];
          
          for (let cRangeIdx = 0; cRangeIdx < colRanges.length; cRangeIdx++) {
            const cRange = colRanges[cRangeIdx];
            globalPageIdx++;
            
            setProgressMsg(`Rasterizing Page ${globalPageIdx} of ${totalEstimatedPagesToPrint}...`);
            setProgressPercent(Math.round((globalPageIdx / totalEstimatedPagesToPrint) * 100));

            // Create outer page div to match page geometry
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

            // Headers segment
            const headerDiv = document.createElement("div");
            headerDiv.style.width = "100%";
            headerDiv.style.display = "flex";
            headerDiv.style.justifyContent = "space-between";
            headerDiv.style.fontSize = "8pt";
            headerDiv.style.color = "#71717a";
            headerDiv.style.marginBottom = "8px";
            headerDiv.style.borderBottom = "0.5px solid #e4e4e7";
            headerDiv.style.paddingBottom = "4px";

            const headerLeft = document.createElement("span");
            headerLeft.innerText = customHeader || (includeFileName ? file.name : "");
            headerDiv.appendChild(headerLeft);

            const headerRight = document.createElement("span");
            headerRight.innerText = sheet.name;
            headerDiv.appendChild(headerRight);
            pageDiv.appendChild(headerDiv);

            // Table content segment scaled
            const contentContainer = document.createElement("div");
            contentContainer.style.flex = "1";
            contentContainer.style.position = "relative";
            contentContainer.style.width = "100%";
            contentContainer.style.overflow = "hidden";

            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.tableLayout = "fixed";
            table.style.transform = `scale(${scale})`;
            table.style.transformOrigin = "top left";
            table.style.width = `${printableWidth / scale}px`;

            // Colgroup declaration
            const colgroup = document.createElement("colgroup");
            for (let colIdx = cRange.start; colIdx <= cRange.end; colIdx++) {
              const col = document.createElement("col");
              col.style.width = `${sheet.colsWidths[colIdx] || 80}px`;
              colgroup.appendChild(col);
            }
            table.appendChild(colgroup);

            const tbody = document.createElement("tbody");
            for (let r = rRange.start; r <= rRange.end; r++) {
              const tr = document.createElement("tr");
              tr.style.height = `${sheet.rowsHeights[r] || 20}px`;

              for (let c = cRange.start; c <= cRange.end; c++) {
                const cellKey = `${r}_${c}`;
                const cell = sheet.cells[cellKey];

                if (!cell) continue;
                if (cell.isMaster === false) {
                  // Skip cell rendering if it belongs to a merge range but is not master
                  continue;
                }

                const td = document.createElement("td");
                
                // Content display
                if (displayFormulas && cell.formula) {
                  td.innerText = `=${cell.formula}`;
                } else {
                  td.innerText = cell.value;
                }

                // Gridlines toggle
                if (showGridlines) {
                  td.style.border = "0.5px solid #d4d4d8";
                }

                // Inline cell stylings mapping
                if (cell.bold) td.style.fontWeight = "bold";
                if (cell.italic) td.style.fontStyle = "italic";
                if (cell.underline) td.style.textDecoration = "underline";
                if (cell.fontSize) td.style.fontSize = `${cell.fontSize}pt`;
                if (cell.fontColor) td.style.color = cell.fontColor;
                if (cell.bgColor) td.style.backgroundColor = cell.bgColor;
                
                if (cell.alignHorizontal) td.style.textAlign = cell.alignHorizontal;
                if (cell.alignVertical) td.style.verticalAlign = cell.alignVertical;
                
                if (cell.wrapText) {
                  td.style.whiteSpace = "normal";
                  td.style.wordBreak = "break-all";
                } else {
                  td.style.whiteSpace = "nowrap";
                  td.style.overflow = "hidden";
                  td.style.textOverflow = "ellipsis";
                }

                // Borders overrides
                if (cell.borderLeft) td.style.borderLeft = cell.borderLeft;
                if (cell.borderRight) td.style.borderRight = cell.borderRight;
                if (cell.borderTop) td.style.borderTop = cell.borderTop;
                if (cell.borderBottom) td.style.borderBottom = cell.borderBottom;

                // Spans configuration
                if (cell.colSpan && cell.colSpan > 1) {
                  // Adjust colSpan if boundary cut off
                  const maxPossibleColSpan = cRange.end - c + 1;
                  td.colSpan = Math.min(cell.colSpan, maxPossibleColSpan);
                }
                if (cell.rowSpan && cell.rowSpan > 1) {
                  const maxPossibleRowSpan = rRange.end - r + 1;
                  td.rowSpan = Math.min(cell.rowSpan, maxPossibleRowSpan);
                }

                tr.appendChild(td);
              }
              tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            contentContainer.appendChild(table);
            pageDiv.appendChild(contentContainer);

            // Footers segment
            const footerDiv = document.createElement("div");
            footerDiv.style.width = "100%";
            footerDiv.style.display = "flex";
            footerDiv.style.justifyContent = "space-between";
            footerDiv.style.fontSize = "8pt";
            footerDiv.style.color = "#71717a";
            footerDiv.style.marginTop = "8px";
            footerDiv.style.borderTop = "0.5px solid #e4e4e7";
            footerDiv.style.paddingTop = "4px";

            const footerLeft = document.createElement("span");
            footerLeft.innerText = customFooter || (includeDateTime ? new Date().toLocaleDateString() : "");
            footerDiv.appendChild(footerLeft);

            const footerRight = document.createElement("span");
            footerRight.innerText = includePageNumbers ? `Page ${globalPageIdx}` : "";
            footerDiv.appendChild(footerRight);
            pageDiv.appendChild(footerDiv);

            // Append to DOM to capture
            sandbox.appendChild(pageDiv);

            // Rasterize DOM via polyfilled canvas
            const canvas = await withOklchPolyfill<HTMLCanvasElement>(() => 
              html2canvas(pageDiv, {
                scale: scaleDpiFactor,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff"
              } as any)
            );

            // Remove from sandbox immediately to free memory
            pageDiv.remove();

            // Convert and embed
            const imgDataUrl = canvas.toDataURL("image/jpeg", conversionMode === "compact" ? 0.70 : 0.88);
            const imgResponse = await fetch(imgDataUrl);
            const imgBytes = await imgResponse.arrayBuffer();

            const embeddedImg = await pdfDoc.embedJpg(new Uint8Array(imgBytes));
            const page = pdfDoc.addPage([targetWidth, targetHeight]);

            // Draw captured image to fill page geometry
            page.drawImage(embeddedImg, {
              x: 0,
              y: 0,
              width: targetWidth,
              height: targetHeight
            });

            // Draw custom Watermarks
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
                } catch (e) {
                  console.error("Watermark logo embedding error", e);
                }
              }
            }
          }
        }
      }

      // Cleanup sandbox
      sandbox.remove();

      setProgressMsg("Assembling output PDF streams...");
      setProgressPercent(95);

      const pdfBytes = await pdfDoc.save();
      const compiledBlob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(compiledBlob);

      setOutputPdfBlob(compiledBlob);
      setOutputPdfUrl(url);

      // Load into PDF.js canvas preview
      const pdfjsLib = await loadPdfJsLib();
      const docData = new Uint8Array(pdfBytes);
      const loadingTask = pdfjsLib.getDocument({ data: docData });
      const jsDoc = await loadingTask.promise;
      setPdfjsDoc(jsDoc);

      setProgressMsg("Excel sheet conversion completed!");
      setProgressPercent(100);
      setIsConverting(false);

      // Save HistoryPreservation
      saveHistoryItem(compiledBlob, globalPageIdx);

      // Trigger auto download
      triggerDownload(url, file.name);

    } catch (err: any) {
      console.error("Excel conversion run crashed", err);
      alert("Spreadsheet conversion failed: " + err.message);
      setIsConverting(false);
    }
  };

  // Convert multiple spreadsheet files in batch and compile ZIP
  const convertBatchExcelToPdf = async () => {
    if (batchFiles.length === 0 || isConverting) return;

    setIsConverting(true);
    setProgressPercent(0);
    setProgressMsg("Starting Batch Conversions...");

    try {
      const zip = new JSZip();
      
      const activeSizeConfig = PAGE_SIZES.find(s => s.id === pageSize) || PAGE_SIZES[0];
      const targetWidth = orientation === "portrait" ? activeSizeConfig.width : activeSizeConfig.height;
      const targetHeight = orientation === "portrait" ? activeSizeConfig.height : activeSizeConfig.width;
      const marginPoints = MARGIN_SIZES.find(m => m.id === marginType)?.value || 72;

      const printableWidth = (targetWidth - marginPoints * 2) * (96 / 72);
      const printableHeight = (targetHeight - marginPoints * 2) * (96 / 72);

      let scaleDpiFactor = 1.5;
      if (conversionMode === "high") scaleDpiFactor = 2.0;
      else if (conversionMode === "print") scaleDpiFactor = 3.0;
      else if (conversionMode === "compact") scaleDpiFactor = 1.0;

      // Create hidden sandbox
      const sandbox = document.createElement("div");
      sandbox.style.position = "absolute";
      sandbox.style.left = "-9999px";
      sandbox.style.top = "-9999px";
      document.body.appendChild(sandbox);

      const ExcelJS = (await import("exceljs")).default;
      const XLSX = await import("xlsx");

      let watermarkImgBytes: Uint8Array | null = null;
      if (enableWatermark && watermarkType === "image" && watermarkImage) {
        const arrayBuf = await watermarkImage.arrayBuffer();
        watermarkImgBytes = new Uint8Array(arrayBuf);
      }

      for (let fIdx = 0; fIdx < batchFiles.length; fIdx++) {
        const batchFile = batchFiles[fIdx];
        setProgressMsg(`File ${fIdx + 1} of ${batchFiles.length}: ${batchFile.name}...`);
        setProgressPercent(Math.round((fIdx / batchFiles.length) * 100));

        const arrayBuffer = await batchFile.arrayBuffer();
        const sheetsList: ParsedWorksheet[] = [];

        if (batchFile.name.endsWith(".xlsx")) {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(arrayBuffer);

          workbook.worksheets.forEach((ws) => {
            let maxRow = 1;
            let maxCol = 1;
            ws.eachRow((row, rowNum) => {
              if (rowNum > maxRow) maxRow = rowNum;
              row.eachCell((_, colNum) => {
                if (colNum > maxCol) maxCol = colNum;
              });
            });

            const colsWidths: number[] = [];
            for (let c = 1; c <= maxCol; c++) {
              const col = ws.getColumn(c);
              const cw = col.width !== undefined ? col.width : 10;
              colsWidths[c] = Math.round(cw * 8);
            }

            const rowsHeights: number[] = [];
            for (let r = 1; r <= maxRow; r++) {
              const row = ws.getRow(r);
              const rh = row.height !== undefined ? row.height : 20;
              rowsHeights[r] = Math.round(rh * 1.3);
            }

            // Simple merges map
            const mergeMap: Record<string, { rowSpan: number; colSpan: number; isMaster: boolean }> = {};
            const merges = ws.model.merges || [];
            merges.forEach((mStr) => {
              try {
                const range = parseRangeStr(mStr);
                const rSpan = range.bottom - range.top + 1;
                const cSpan = range.right - range.left + 1;
                for (let r = range.top; r <= range.bottom; r++) {
                  for (let c = range.left; c <= range.right; c++) {
                    const k = `${r}_${c}`;
                    mergeMap[k] = { 
                      rowSpan: rSpan, 
                      colSpan: cSpan, 
                      isMaster: r === range.top && c === range.left 
                    };
                  }
                }
              } catch (e) {}
            });

            const cells: Record<string, SheetCell> = {};
            for (let r = 1; r <= maxRow; r++) {
              for (let c = 1; c <= maxCol; c++) {
                const cell = ws.getCell(r, c);
                const key = `${r}_${c}`;
                const mInfo = mergeMap[key] || { rowSpan: 1, colSpan: 1, isMaster: true };
                
                let cellVal = "";
                if (cell.value !== null && cell.value !== undefined) {
                  if (typeof cell.value === "object") {
                    cellVal = (cell.value as any).result || (cell.value as any).text || "";
                  } else {
                    cellVal = String(cell.value);
                  }
                }

                cells[key] = {
                  address: cell.address,
                  value: cellVal,
                  formula: cell.formula,
                  bold: cell.font?.bold || false,
                  italic: cell.font?.italic || false,
                  underline: cell.font?.underline ? true : false,
                  fontSize: cell.font?.size || 11,
                  fontColor: resolveExcelColor(cell.font?.color),
                  bgColor: resolveExcelColor(cell.fill && (cell.fill as any).fgColor),
                  alignHorizontal: cell.alignment?.horizontal as any,
                  alignVertical: cell.alignment?.vertical as any,
                  rowSpan: mInfo.rowSpan,
                  colSpan: mInfo.colSpan,
                  isMaster: mInfo.isMaster
                };
              }
            }

            sheetsList.push({
              name: ws.name,
              maxRow,
              maxCol,
              colsWidths,
              rowsHeights,
              cells,
              chartsCount: 0,
              imagesCount: 0,
              formulasCount: 0
            });
          });
        } else {
          // XLS parsing via SheetJS
          const workbook = XLSX.read(arrayBuffer, { type: "array" });
          workbook.SheetNames.forEach((sheetName) => {
            const ws = workbook.Sheets[sheetName];
            const range = ws["!ref"] ? parseRangeStr(ws["!ref"]) : { top: 1, bottom: 1, left: 1, right: 1 };
            const maxRow = range.bottom;
            const maxCol = range.right;

            const colsWidths: number[] = [];
            for (let c = 1; c <= maxCol; c++) {
              colsWidths[c] = 80;
            }

            const rowsHeights: number[] = [];
            for (let r = 1; r <= maxRow; r++) {
              rowsHeights[r] = 20;
            }

            const cells: Record<string, SheetCell> = {};
            for (let r = 1; r <= maxRow; r++) {
              for (let c = 1; c <= maxCol; c++) {
                const colLetter = XLSX.utils.encode_col(c - 1);
                const cellAddress = `${colLetter}${r}`;
                const cell = ws[cellAddress];
                cells[`${r}_${c}`] = {
                  address: cellAddress,
                  value: cell ? cell.w || String(cell.v || "") : "",
                  formula: cell?.f,
                  rowSpan: 1,
                  colSpan: 1,
                  isMaster: true
                };
              }
            }

            sheetsList.push({
              name: sheetName,
              maxRow,
              maxCol,
              colsWidths,
              rowsHeights,
              cells,
              chartsCount: 0,
              imagesCount: 0,
              formulasCount: 0
            });
          });
        }

        const pdfDoc = await PDFDocument.create();
        let pageIdx = 0;

        for (let sIdx = 0; sIdx < sheetsList.length; sIdx++) {
          const sheet = sheetsList[sIdx];
          
          const sheetWidth = sheet.colsWidths.slice(1).reduce((a, b) => a + (b || 80), 0);
          const sheetHeight = sheet.rowsHeights.slice(1).reduce((a, b) => a + (b || 20), 0);

          let scale = 1.0;
          if (scalingMode === "fit-cols") {
            scale = printableWidth / sheetWidth;
          } else if (scalingMode === "fit-rows") {
            scale = printableHeight / sheetHeight;
          } else if (scalingMode === "fit-sheet") {
            scale = Math.min(printableWidth / sheetWidth, printableHeight / sheetHeight);
          } else if (scalingMode === "custom") {
            scale = customScale / 100;
          }
          
          scale = Math.max(0.1, Math.min(2.0, scale));

          const scaledPrintableHeight = printableHeight / scale;
          const scaledPrintableWidth = printableWidth / scale;

          // Vertical Ranges splitting
          const rowRanges: { start: number; end: number }[] = [];
          let hAccum = 0;
          let sRow = 1;
          for (let r = 1; r <= sheet.maxRow; r++) {
            const rh = sheet.rowsHeights[r] || 20;
            if (hAccum + rh > scaledPrintableHeight) {
              rowRanges.push({ start: sRow, end: r - 1 });
              sRow = r;
              hAccum = rh;
            } else {
              hAccum += rh;
            }
          }
          rowRanges.push({ start: sRow, end: sheet.maxRow });

          // Horizontal Ranges splitting
          const colRanges: { start: number; end: number }[] = [];
          if (scalingMode !== "fit-cols" && scalingMode !== "fit-sheet") {
            let wAccum = 0;
            let sCol = 1;
            for (let c = 1; c <= sheet.maxCol; c++) {
              const cw = sheet.colsWidths[c] || 80;
              if (wAccum + cw > scaledPrintableWidth) {
                colRanges.push({ start: sCol, end: c - 1 });
                sCol = c;
                wAccum = cw;
              } else {
                wAccum += cw;
              }
            }
            colRanges.push({ start: sCol, end: sheet.maxCol });
          } else {
            colRanges.push({ start: 1, end: sheet.maxCol });
          }

          for (let rRangeIdx = 0; rRangeIdx < rowRanges.length; rRangeIdx++) {
            const rRange = rowRanges[rRangeIdx];
            for (let cRangeIdx = 0; cRangeIdx < colRanges.length; cRangeIdx++) {
              const cRange = colRanges[cRangeIdx];
              pageIdx++;

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

              // Headers segment
              const headerDiv = document.createElement("div");
              headerDiv.style.width = "100%";
              headerDiv.style.display = "flex";
              headerDiv.style.justifyContent = "space-between";
              headerDiv.style.fontSize = "8pt";
              headerDiv.style.color = "#71717a";
              headerDiv.style.marginBottom = "8px";
              headerDiv.style.borderBottom = "0.5px solid #e4e4e7";
              headerDiv.style.paddingBottom = "4px";

              const headerLeft = document.createElement("span");
              headerLeft.innerText = customHeader || (includeFileName ? batchFile.name : "");
              headerDiv.appendChild(headerLeft);

              const headerRight = document.createElement("span");
              headerRight.innerText = sheet.name;
              headerDiv.appendChild(headerRight);
              pageDiv.appendChild(headerDiv);

              const contentContainer = document.createElement("div");
              contentContainer.style.flex = "1";
              contentContainer.style.position = "relative";

              const table = document.createElement("table");
              table.style.borderCollapse = "collapse";
              table.style.tableLayout = "fixed";
              table.style.transform = `scale(${scale})`;
              table.style.transformOrigin = "top left";
              table.style.width = `${printableWidth / scale}px`;

              const colgroup = document.createElement("colgroup");
              for (let colIdx = cRange.start; colIdx <= cRange.end; colIdx++) {
                const col = document.createElement("col");
                col.style.width = `${sheet.colsWidths[colIdx] || 80}px`;
                colgroup.appendChild(col);
              }
              table.appendChild(colgroup);

              const tbody = document.createElement("tbody");
              for (let r = rRange.start; r <= rRange.end; r++) {
                const tr = document.createElement("tr");
                tr.style.height = `${sheet.rowsHeights[r] || 20}px`;

                for (let c = cRange.start; c <= cRange.end; c++) {
                  const key = `${r}_${c}`;
                  const cell = sheet.cells[key];
                  if (!cell || cell.isMaster === false) continue;

                  const td = document.createElement("td");
                  td.innerText = (displayFormulas && cell.formula) ? `=${cell.formula}` : cell.value;
                  
                  if (showGridlines) td.style.border = "0.5px solid #d4d4d8";
                  
                  if (cell.bold) td.style.fontWeight = "bold";
                  if (cell.italic) td.style.fontStyle = "italic";
                  if (cell.underline) td.style.textDecoration = "underline";
                  if (cell.fontSize) td.style.fontSize = `${cell.fontSize}pt`;
                  if (cell.fontColor) td.style.color = cell.fontColor;
                  if (cell.bgColor) td.style.backgroundColor = cell.bgColor;
                  if (cell.alignHorizontal) td.style.textAlign = cell.alignHorizontal;
                  if (cell.alignVertical) td.style.verticalAlign = cell.alignVertical;

                  if (cell.colSpan && cell.colSpan > 1) {
                    td.colSpan = Math.min(cell.colSpan, cRange.end - c + 1);
                  }
                  if (cell.rowSpan && cell.rowSpan > 1) {
                    td.rowSpan = Math.min(cell.rowSpan, rRange.end - r + 1);
                  }

                  tr.appendChild(td);
                }
                tbody.appendChild(tr);
              }
              table.appendChild(tbody);
              contentContainer.appendChild(table);
              pageDiv.appendChild(contentContainer);

              // Footers segment
              const footerDiv = document.createElement("div");
              footerDiv.style.width = "100%";
              footerDiv.style.display = "flex";
              footerDiv.style.justifyContent = "space-between";
              footerDiv.style.fontSize = "8pt";
              footerDiv.style.color = "#71717a";
              footerDiv.style.marginTop = "8px";
              footerDiv.style.borderTop = "0.5px solid #e4e4e7";
              footerDiv.style.paddingTop = "4px";

              const footerLeft = document.createElement("span");
              footerLeft.innerText = customFooter || (includeDateTime ? new Date().toLocaleDateString() : "");
              footerDiv.appendChild(footerLeft);

              const footerRight = document.createElement("span");
              footerRight.innerText = includePageNumbers ? `Page ${pageIdx}` : "";
              footerDiv.appendChild(footerRight);
              pageDiv.appendChild(footerDiv);

              sandbox.appendChild(pageDiv);

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

              const embeddedImg = await pdfDoc.embedJpg(new Uint8Array(imgBytes));
              const page = pdfDoc.addPage([targetWidth, targetHeight]);
              
              page.drawImage(embeddedImg, {
                x: 0,
                y: 0,
                width: targetWidth,
                height: targetHeight
              });

              // Apply custom watermark overlays
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
                  } catch (e) {}
                }
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
      link.download = `Converted_Spreadsheet_PDFs.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      sandbox.remove();
      setProgressMsg("Batch conversions completed successfully!");
      setProgressPercent(100);
      setIsConverting(false);

    } catch (err: any) {
      console.error("Batch spreadsheets conversion failed", err);
      alert("Batch conversion failed: " + err.message);
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

  // Render output PDF canvas preview
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
      console.error("Error rendering Excel PDF page preview", e);
    }
  };

  useEffect(() => {
    if (pdfjsDoc) {
      renderPdfPreviewPage(currentPage);
    }
  }, [currentPage, pdfjsDoc]);

  const toggleTargetSheet = (index: number) => {
    setTargetSheets(prev => {
      const updated = { ...prev, [index]: !prev[index] };
      recalculateEstimatedPages(parsedSheets, updated);
      return updated;
    });
  };

  const clearFile = () => {
    setFile(null);
    setFileSize(0);
    setEstimatedPages(0);
    setCurrentPage(1);
    setOutputPdfUrl(null);
    setOutputPdfBlob(null);
    setPdfjsDoc(null);
    setParsedSheets([]);
    setUploadStatus("idle");
    setProgressPercent(0);
    setProgressMsg("");
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

  // Active preview sheet cells extraction
  const activePreviewSheet = parsedSheets[selectedSheetIndex];

  return (
    <div className="space-y-8">
      {/* ─── SECURE INSTRUCTION HEADER ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-6 py-4 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#518231]/10 rounded-2xl text-[#518231]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-855 dark:text-slate-155">Safe Client-Side Excel Converter</h2>
            <p className="text-xs text-slate-555 dark:text-slate-400 font-bold mt-0.5">
              Spreadsheets are parsed locally in browser RAM. Files never travel online.
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
              Reset Workspace
            </button>
          )}
        </div>
      </div>

      {/* ─── HISTORY PRESENTS PANEL ─── */}
      {showHistory && (
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-855 dark:text-slate-155 flex items-center gap-2">
              <History size={16} className="text-[#518231]" />
              Recent Spreadsheet Conversions (Local Cache)
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
              No recent spreadsheet logs found.
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
                    <span>{item.sheetCount} sheets ({item.pageCount} printable pages)</span>
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

      {/* ─── UPLOADER COMPONENT ─── */}
      {uploadStatus === "idle" && batchFiles.length === 0 && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="inline-flex bg-slate-100 dark:bg-slate-850 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800">
              <button 
                onClick={() => setIsBatchMode(false)}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${!isBatchMode ? 'bg-[#518231] text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
              >
                Single Spreadsheet
              </button>
              <button 
                onClick={() => setIsBatchMode(true)}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${isBatchMode ? 'bg-[#518231] text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
              >
                Batch Spreadsheets
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
              accept=".xlsx,.xls"
              onChange={handleFileInput}
              className="hidden"
            />
            <input
              ref={batchInputRef}
              type="file"
              accept=".xlsx,.xls"
              multiple
              onChange={handleFileInput}
              className="hidden"
            />
            <div className="p-5 bg-slate-100 dark:bg-slate-800 rounded-3xl text-slate-400 dark:text-slate-500 transition-all shadow-sm">
              <Upload size={36} className="text-[#518231]" />
            </div>
            <div className="space-y-1.5">
              <p className="text-base font-black text-slate-850 dark:text-slate-150">
                {isBatchMode ? "Drag and drop multiple spreadsheet files here" : "Drag and drop your spreadsheet here"}
              </p>
              <p className="text-xs text-slate-555 dark:text-slate-400 font-bold">
                Supports Excel formats (.xlsx, .xls) processed 100% locally
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

      {/* ─── FILE READING SCREEN ─── */}
      {uploadStatus === "reading" && (
        <div className="border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 p-16 rounded-3xl flex flex-col items-center justify-center gap-4 text-center">
          <Loader2 className="animate-spin text-[#518231]" size={36} />
          <p className="text-sm font-black text-slate-800 dark:text-slate-200">
            Scanning spreadsheet structure and parsing worksheet grid cell layers...
          </p>
        </div>
      )}

      {/* ─── BATCH CONVERT INTERFACE ─── */}
      {isBatchMode && batchFiles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-5">
              <h3 className="text-sm font-black text-slate-850 dark:text-slate-150 flex items-center gap-2">
                <Settings size={16} className="text-[#518231]" />
                Batch Config Settings
              </h3>

              {/* Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Quality Preset</label>
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

              {/* Grid Auto-scaling */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Grid Auto-scaling Mode</label>
                <select
                  value={scalingMode}
                  onChange={(e) => setScalingMode(e.target.value as any)}
                  className="w-full text-xs font-extrabold px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl outline-none mt-1"
                >
                  <option value="fit-cols">Fit All Columns to Page Width</option>
                  <option value="fit-rows">Fit All Rows to Page Height</option>
                  <option value="fit-sheet">Fit Entire Worksheet to One Page</option>
                  <option value="auto">Automatic (No scaling splits)</option>
                </select>
              </div>

              {/* Page Layout options */}
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

              {/* Batch watermark */}
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
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="CONFIDENTIAL"
                    className="w-full text-xs font-extrabold px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-white dark:bg-slate-950 outline-none"
                  />
                )}
              </div>

              {/* Convert Button */}
              <button
                onClick={convertBatchExcelToPdf}
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
                    <span>Convert {batchFiles.length} Spreadsheets</span>
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

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-200">
                Uploaded Spreadsheets Queue ({batchFiles.length})
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
                    <div className="p-2 bg-green-500/10 text-[#518231] rounded-lg">
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
          {/* Left configurations */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sheet Selector */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-slate-850 dark:text-slate-150 flex items-center gap-1.5">
                <CheckSquare size={15} className="text-[#518231]" />
                Target Worksheet Selection
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-slate-850 max-h-[220px] overflow-y-auto pr-2 space-y-2.5">
                {parsedSheets.map((sheet, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2 max-w-[80%]">
                      <input 
                        type="checkbox"
                        checked={targetSheets[idx] || false}
                        onChange={() => toggleTargetSheet(idx)}
                        className="w-4 h-4 text-[#518231] bg-slate-150 border-slate-300 rounded focus:ring-[#518231] cursor-pointer shrink-0"
                      />
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 truncate">{sheet.name}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold shrink-0">
                      {sheet.maxRow}R × {sheet.maxCol}C
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-5">
              <h3 className="text-sm font-black text-slate-850 dark:text-slate-150 flex items-center gap-2">
                <Settings size={16} className="text-[#518231]" />
                Conversion Settings
              </h3>

              {/* Scaling mode */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Spreadsheet Scale Rules</label>
                <select
                  value={scalingMode}
                  onChange={(e) => setScalingMode(e.target.value as any)}
                  className="w-full text-xs font-extrabold px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl outline-none"
                >
                  <option value="fit-cols">Fit Columns to Page Width</option>
                  <option value="fit-rows">Fit Rows to Page Height</option>
                  <option value="fit-sheet">Fit Worksheet to One Page</option>
                  <option value="auto">Automatic Scaling (Split columns/rows)</option>
                  <option value="custom">Custom Scale Percentage</option>
                </select>

                {scalingMode === "custom" && (
                  <div className="flex items-center gap-2 pt-1 animate-in slide-in-from-top-1 duration-100">
                    <input
                      type="range"
                      min="20"
                      max="200"
                      step="5"
                      value={customScale}
                      onChange={(e) => setCustomScale(parseInt(e.target.value))}
                      className="w-full accent-[#518231]"
                    />
                    <span className="text-xs font-black text-slate-700 w-10 text-right">{customScale}%</span>
                  </div>
                )}
              </div>

              {/* Standard Options */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="flex items-center justify-between border border-slate-250 dark:border-slate-800 p-3 rounded-xl bg-white dark:bg-slate-950">
                  <span className="text-[10px] font-bold text-slate-500">GRIDLINES</span>
                  <input
                    type="checkbox"
                    checked={showGridlines}
                    onChange={(e) => setShowGridlines(e.target.checked)}
                    className="w-4 h-4 text-[#518231] cursor-pointer focus:ring-[#518231] rounded"
                  />
                </div>
                <div className="flex items-center justify-between border border-slate-250 dark:border-slate-800 p-3 rounded-xl bg-white dark:bg-slate-950">
                  <span className="text-[10px] font-bold text-slate-500">SHOW FORMULAS</span>
                  <input
                    type="checkbox"
                    checked={displayFormulas}
                    onChange={(e) => setDisplayFormulas(e.target.checked)}
                    className="w-4 h-4 text-[#518231] cursor-pointer focus:ring-[#518231] rounded"
                  />
                </div>
              </div>

              {/* Quality Settings */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-500">DPI Quality Preset</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "standard", name: "Standard", desc: "144 DPI balanced" },
                    { id: "high", name: "High", desc: "192 DPI graphic" },
                    { id: "print", name: "Print Ready", desc: "288 DPI text" },
                    { id: "compact", name: "Compact", desc: "96 DPI minimal" }
                  ].map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setConversionMode(mode.id as any)}
                      className={`flex flex-col text-left p-3.5 border rounded-xl cursor-pointer transition-all ${
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

              {/* Output overrides */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-500">Geometry Overrides</label>
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

              {/* Custom header footer */}
              <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-4 space-y-3">
                <label className="text-xs font-bold text-slate-500">Headers & Footers</label>
                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={customHeader}
                    onChange={(e) => setCustomHeader(e.target.value)}
                    placeholder="Custom Header text"
                    className="w-full text-xs font-extrabold px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 outline-none"
                  />
                  <input
                    type="text"
                    value={customFooter}
                    onChange={(e) => setCustomFooter(e.target.value)}
                    placeholder="Custom Footer text"
                    className="w-full text-xs font-extrabold px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 outline-none"
                  />
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={includePageNumbers}
                        onChange={(e) => setIncludePageNumbers(e.target.checked)}
                        className="rounded text-[#518231] focus:ring-[#518231]" 
                      />
                      Page Numbers
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={includeDateTime}
                        onChange={(e) => setIncludeDateTime(e.target.checked)}
                        className="rounded text-[#518231] focus:ring-[#518231]" 
                      />
                      Add Date Stamp
                    </label>
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
                  <div className="space-y-4 p-4 bg-slate-150 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-855/50 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setWatermarkType("text")}
                        className={`flex-grow py-1 font-extrabold text-xs rounded-lg ${watermarkType === "text" ? "bg-[#518231] text-white" : "bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 text-slate-500"}`}
                      >
                        Text
                      </button>
                      <button
                        onClick={() => setWatermarkType("image")}
                        className={`flex-grow py-1 font-extrabold text-xs rounded-lg ${watermarkType === "image" ? "bg-[#518231] text-white" : "bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 text-slate-500"}`}
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
                            <button onClick={clearWatermarkImage} className="text-red-500 hover:text-red-655 p-1">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => watermarkImageInputRef.current?.click()}
                            className="border border-dashed border-slate-350 dark:border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/40"
                          >
                            <input
                              ref={watermarkImageInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleWatermarkImageUpload}
                              className="hidden"
                            />
                            <Plus size={16} className="mx-auto text-slate-400 mb-1" />
                            <span className="text-[10px] text-slate-500 font-bold">Select PNG/JPG Image</span>
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

              {/* Convert Trigger */}
              <button
                onClick={convertExcelToPdf}
                disabled={isConverting}
                className="w-full flex items-center justify-center gap-2 bg-[#518231] hover:bg-[#416827] disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white font-extrabold py-3.5 rounded-2xl cursor-pointer transition-all shadow-sm"
              >
                {isConverting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Rasterizing Pages...</span>
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

            {/* Document Analytics */}
            {activePreviewSheet && (
              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4">
                <h3 className="text-xs font-black text-slate-850 dark:text-slate-150 flex items-center gap-1.5">
                  <BookOpen size={15} className="text-[#518231]" />
                  Active Worksheet Metrics
                </h3>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { name: "Max Row index", count: activePreviewSheet.maxRow },
                    { name: "Max Col index", count: activePreviewSheet.maxCol },
                    { name: "Formulas Found", count: activePreviewSheet.formulasCount },
                    { name: "Images Found", count: activePreviewSheet.imagesCount }
                  ].map(el => (
                    <div key={el.name} className="bg-white dark:bg-slate-950 p-3 border border-slate-200 dark:border-slate-850 rounded-xl">
                      <div className="text-slate-400 font-bold text-[9px] uppercase">{el.name}</div>
                      <div className="text-base font-black text-slate-850 dark:text-slate-100 mt-1">{el.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right panel Previews */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Sheet Tabs Selector & Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-855 px-5 py-3 rounded-2xl">
              <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
                {parsedSheets.map((sheet, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSheetIndex(index)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black shrink-0 transition-all cursor-pointer ${selectedSheetIndex === index ? 'bg-[#518231] text-white' : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'}`}
                  >
                    {sheet.name}
                  </button>
                ))}
              </div>

              {outputPdfUrl && (
                <div className="flex items-center gap-3 self-end sm:self-auto">
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
              )}
            </div>

            {/* Previews containers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
              
              {/* Left preview: HTML Excel table grid */}
              <div className="border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-4 rounded-3xl flex flex-col justify-start overflow-hidden relative min-h-[500px]">
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-slate-900/60 backdrop-blur-sm text-white rounded-lg text-[10px] font-black uppercase flex items-center gap-1">
                  <Eye size={12} /> Original Sheet Grid
                </div>

                <div className="flex-grow overflow-auto max-w-full max-h-[600px] mt-8 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-inner border border-slate-100 dark:border-slate-850">
                  {activePreviewSheet ? (
                    <div className="overflow-x-auto w-full">
                      <table className="border-collapse text-xs select-none w-full" style={{ tableLayout: "fixed" }}>
                        <colgroup>
                          {activePreviewSheet.colsWidths.slice(1).map((w, idx) => (
                            <col key={idx} style={{ width: `${w || 80}px` }} />
                          ))}
                        </colgroup>
                        <tbody>
                          {Array.from({ length: Math.min(100, activePreviewSheet.maxRow) }).map((_, rIdx) => {
                            const r = rIdx + 1;
                            return (
                              <tr key={r} style={{ height: `${activePreviewSheet.rowsHeights[r] || 20}px` }}>
                                {Array.from({ length: Math.min(50, activePreviewSheet.maxCol) }).map((_, cIdx) => {
                                  const c = cIdx + 1;
                                  const cellKey = `${r}_${c}`;
                                  const cell = activePreviewSheet.cells[cellKey];
                                  
                                  if (!cell) return <td key={c} className="border border-slate-200 dark:border-slate-800" />;
                                  if (cell.isMaster === false) return null;

                                  return (
                                    <td
                                      key={c}
                                      colSpan={cell.colSpan}
                                      rowSpan={cell.rowSpan}
                                      className={`border border-slate-200 dark:border-slate-800 p-1 text-slate-800 dark:text-slate-200 ${cell.bold ? 'font-bold' : ''} ${cell.italic ? 'italic' : ''}`}
                                      style={{
                                        backgroundColor: cell.bgColor || undefined,
                                        color: cell.fontColor || undefined,
                                        textAlign: cell.alignHorizontal || undefined,
                                        verticalAlign: cell.alignVertical || undefined,
                                        fontSize: cell.fontSize ? `${cell.fontSize}pt` : undefined
                                      }}
                                    >
                                      {cell.value}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {activePreviewSheet.maxRow > 100 && (
                        <p className="text-[10px] text-slate-400 font-bold mt-2 text-center italic">
                          Showing first 100 rows preview. Entire range will be converted to PDF.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 text-slate-400 font-semibold text-xs">
                      No sheet data parsed.
                    </div>
                  )}
                </div>
              </div>

              {/* Right preview: Compiled output PDF */}
              <div className="border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-4 rounded-3xl flex flex-col justify-between overflow-hidden relative min-h-[500px]">
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#2b6cb0]/15 text-[#2b6cb0] rounded-lg text-[10px] font-black uppercase flex items-center gap-1">
                  <FileOutput size={12} /> Generated PDF Preview
                </div>

                <div className="flex-1 overflow-auto max-w-full max-h-[600px] flex items-center justify-center mt-8">
                  {outputPdfUrl ? (
                    <div className="shadow-md rounded bg-white">
                      <canvas ref={pdfCanvasRef} className="max-w-full" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full gap-2 text-slate-400 py-16">
                      <Layers size={36} className="text-slate-350 dark:text-slate-700" />
                      <p className="font-semibold text-xs">PDF Output Not Generated</p>
                      <p className="text-[10px] font-bold text-slate-400 max-w-[200px]">
                        Configure page layout parameters and click &apos;Convert to PDF&apos; to compile vector sheets.
                      </p>
                    </div>
                  )}
                </div>

                {outputPdfUrl && (
                  <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-between gap-2">
                    <button
                      onClick={() => triggerDownload(outputPdfUrl, file.name)}
                      className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 bg-[#518231] hover:bg-[#416827] text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-sm"
                    >
                      <Download size={14} /> Download PDF Document
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Hidden DOM element playground container required to parse batch calculations during run */}
      <div ref={excelRenderSandboxRef} className="hidden" />
    </div>
  );
}
