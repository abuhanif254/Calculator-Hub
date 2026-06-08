"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download,
  RefreshCw, History, ShieldCheck, Check, Columns, Layers, CheckSquare,
  ZoomIn, ZoomOut, Plus, X, List, Grid, Filter, Bookmark, Keyboard, ShieldAlert,
  Lock, Undo, Redo, Maximize2, Crop, Sparkles, HelpCircle
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { decryptPDF } from "@pdfsmaller/pdf-decrypt";

// --- Types ---

interface Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface CropHistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
  originalPageCount: number;
  mode: string;
  outputSize: number;
}

interface CropPreset {
  id: string;
  name: string;
  margins: Margins;
  unit: "pt" | "mm" | "px";
}

interface HistoryState {
  margins: Margins;
  pageCustomMargins: Record<number, Margins>;
}

const PDFJS_VERSION = '3.11.174';

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export function PdfCropPagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [fileSize, setFileSize] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "reading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [requiresPassword, setRequiresPassword] = useState<boolean>(false);

  // PDFJS Objects
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageWidthPoints, setPageWidthPoints] = useState<number>(612);
  const [pageHeightPoints, setPageHeightPoints] = useState<number>(792);

  // Crop configuration states
  const [margins, setMargins] = useState<Margins>({ top: 40, bottom: 40, left: 40, right: 40 });
  const [pageCustomMargins, setPageCustomMargins] = useState<Record<number, Margins>>({});
  const [unit, setUnit] = useState<"pt" | "mm" | "px">("pt");
  const [targetPages, setTargetPages] = useState<"all" | "selected" | "odd" | "even" | "range">("all");
  const [customRangeText, setCustomRangeText] = useState<string>("");
  const [selectedPreviewPages, setSelectedPreviewPages] = useState<Record<number, boolean>>({});

  // Editor workspace layout
  const [zoom, setZoom] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<"edit" | "grid">("edit");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isAutoDetecting, setIsAutoDetecting] = useState<boolean>(false);

  // Undo/Redo Stacks
  const [undoStack, setUndoStack] = useState<HistoryState[]>([]);
  const [redoStack, setRedoStack] = useState<HistoryState[]>([]);

  // Presets and local logs
  const [history, setHistory] = useState<CropHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [presets, setPresets] = useState<CropPreset[]>([]);
  const [showSavePresetModal, setShowSavePresetModal] = useState<boolean>(false);
  const [newPresetName, setNewPresetName] = useState<string>("");

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const cropWorkspaceRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<string | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; initialMargins: Margins }>({
    x: 0,
    y: 0,
    initialMargins: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  const [dragActive, setDragActive] = useState<boolean>(false);

  // Load Saved Presets & History
  useEffect(() => {
    const savedHistory = localStorage.getItem("pdf_crop_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.warn("Failed to load crop history", e);
      }
    }

    const savedPresets = localStorage.getItem("pdf_crop_presets");
    if (savedPresets) {
      try {
        setPresets(JSON.parse(savedPresets));
      } catch (e) {
        console.warn("Failed to load presets", e);
      }
    } else {
      const defaultPresets: CropPreset[] = [
        { id: "p-0.5in", name: "0.5 Inch Margins", margins: { top: 36, bottom: 36, left: 36, right: 36 }, unit: "pt" },
        { id: "p-1.0in", name: "1.0 Inch Margins", margins: { top: 72, bottom: 72, left: 72, right: 72 }, unit: "pt" },
        { id: "p-trimA4", name: "A4 Margins (15mm)", margins: { top: 42.5, bottom: 42.5, left: 42.5, right: 42.5 }, unit: "pt" }
      ];
      setPresets(defaultPresets);
      localStorage.setItem("pdf_crop_presets", JSON.stringify(defaultPresets));
    }
  }, []);

  // Sync presets helper
  const savePresets = (updated: CropPreset[]) => {
    setPresets(updated);
    localStorage.setItem("pdf_crop_presets", JSON.stringify(updated));
  };

  // Unit conversions: converts points (pt) to selected unit
  const ptToUnit = (points: number) => {
    if (unit === "mm") return Number((points / 2.8346).toFixed(1));
    if (unit === "px") return Number((points / 0.75).toFixed(0));
    return Number(points.toFixed(0));
  };

  // Converts selected unit back to points (pt)
  const unitToPt = (val: number) => {
    if (unit === "mm") return val * 2.8346;
    if (unit === "px") return val * 0.75;
    return val;
  };

  // Capture current state for Undo History
  const pushToUndo = (currentMargins: Margins, currentCustom: Record<number, Margins>) => {
    const state: HistoryState = {
      margins: { ...currentMargins },
      pageCustomMargins: JSON.parse(JSON.stringify(currentCustom))
    };
    setUndoStack(prev => [...prev, state]);
    setRedoStack([]); // Clear redo stack on new action
  };

  // Handle Undo Operation
  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previousState = undoStack[undoStack.length - 1];
    
    // Save current state to redo stack
    const currentState: HistoryState = {
      margins: { ...margins },
      pageCustomMargins: JSON.parse(JSON.stringify(pageCustomMargins))
    };
    setRedoStack(prev => [...prev, currentState]);

    // Restore previous state
    setMargins(previousState.margins);
    setPageCustomMargins(previousState.pageCustomMargins);
    setUndoStack(prev => prev.slice(0, -1));
  };

  // Handle Redo Operation
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];

    // Save current state to undo stack
    const currentState: HistoryState = {
      margins: { ...margins },
      pageCustomMargins: JSON.parse(JSON.stringify(pageCustomMargins))
    };
    setUndoStack(prev => [...prev, currentState]);

    // Restore next state
    setMargins(nextState.margins);
    setPageCustomMargins(nextState.pageCustomMargins);
    setRedoStack(prev => prev.slice(0, -1));
  };

  // Fetch page width/height in points and render the preview canvas
  const renderWorkspacePage = async (pageNum: number, customDoc = pdfjsDoc) => {
    if (!customDoc || !previewCanvasRef.current) return;

    try {
      const page = await customDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      
      // Update page dimension labels
      setPageWidthPoints(viewport.width / 1.5);
      setPageHeightPoints(viewport.height / 1.5);

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

  // Render workspace on page or doc changes
  useEffect(() => {
    if (uploadStatus === "ready" && pdfjsDoc) {
      renderWorkspacePage(currentPage);
    }
  }, [currentPage, pdfjsDoc, uploadStatus]);

  // Load PDFjs library
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

  // Setup Document details via pdf-lib and PDF.js
  const loadPdfDocument = async (targetFile: File, pass = "") => {
    setUploadStatus("reading");
    setErrorMessage(null);
    setRequiresPassword(false);

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
      
      // Select first page
      setCurrentPage(1);

      // Reset selection maps
      const selectionMap: Record<number, boolean> = {};
      for (let i = 1; i <= pagesCount; i++) {
        selectionMap[i] = true; // Select all preview pages by default
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

  // Active margins getter for the current visible page
  const getPageMargins = (): Margins => {
    return pageCustomMargins[currentPage] || margins;
  };

  // Helper to update margins safely
  const updateMargins = (updated: Margins, isCustom = false) => {
    if (isCustom) {
      setPageCustomMargins(prev => ({
        ...prev,
        [currentPage]: updated
      }));
    } else {
      setMargins(updated);
    }
  };

  // Drag interaction math: drag and resize the crop box relative to width/height
  const handleWorkspaceMouseDown = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    if (uploadStatus !== "ready" || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const activeMargins = getPageMargins();

    isDraggingRef.current = handle;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialMargins: { ...activeMargins }
    };

    // Push history state
    pushToUndo(margins, pageCustomMargins);

    document.addEventListener("mousemove", handleWorkspaceMouseMove);
    document.addEventListener("mouseup", handleWorkspaceMouseUp);
  };

  const handleWorkspaceMouseMove = (e: MouseEvent) => {
    const handle = isDraggingRef.current;
    if (!handle || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    
    // Scaling ratio between actual PDF points and on-screen canvas display
    const scaleX = pageWidthPoints / canvasRect.width;
    const scaleY = pageHeightPoints / canvasRect.height;

    // Delta movement in points
    const deltaX = (e.clientX - dragStartRef.current.x) * scaleX;
    const deltaY = (e.clientY - dragStartRef.current.y) * scaleY;

    const initial = dragStartRef.current.initialMargins;
    const current = { ...initial };

    // Apply updates based on handles
    if (handle === "top-left") {
      current.left = Math.max(0, initial.left + deltaX);
      current.top = Math.max(0, initial.top + deltaY);
    } else if (handle === "top-right") {
      current.right = Math.max(0, initial.right - deltaX);
      current.top = Math.max(0, initial.top + deltaY);
    } else if (handle === "bottom-left") {
      current.left = Math.max(0, initial.left + deltaX);
      current.bottom = Math.max(0, initial.bottom - deltaY);
    } else if (handle === "bottom-right") {
      current.right = Math.max(0, initial.right - deltaX);
      current.bottom = Math.max(0, initial.bottom - deltaY);
    } else if (handle === "top") {
      current.top = Math.max(0, initial.top + deltaY);
    } else if (handle === "bottom") {
      current.bottom = Math.max(0, initial.bottom - deltaY);
    } else if (handle === "left") {
      current.left = Math.max(0, initial.left + deltaX);
    } else if (handle === "right") {
      current.right = Math.max(0, initial.right - deltaX);
    } else if (handle === "move") {
      // Calculate delta offsets for whole box movement
      const widthPoints = pageWidthPoints - initial.left - initial.right;
      const heightPoints = pageHeightPoints - initial.top - initial.bottom;

      let newLeft = initial.left + deltaX;
      let newRight = initial.right - deltaX;
      let newTop = initial.top + deltaY;
      let newBottom = initial.bottom - deltaY;

      // Restrict movement within page boundaries
      if (newLeft < 0) {
        newLeft = 0;
        newRight = pageWidthPoints - widthPoints;
      }
      if (newRight < 0) {
        newRight = 0;
        newLeft = pageWidthPoints - widthPoints;
      }
      if (newTop < 0) {
        newTop = 0;
        newBottom = pageHeightPoints - heightPoints;
      }
      if (newBottom < 0) {
        newBottom = 0;
        newTop = pageHeightPoints - heightPoints;
      }

      current.left = newLeft;
      current.right = newRight;
      current.top = newTop;
      current.bottom = newBottom;
    }

    // Boundary locks: enforce a minimum page size of 20 points
    if (pageWidthPoints - current.left - current.right >= 20 &&
        pageHeightPoints - current.top - current.bottom >= 20) {
      updateMargins(current, !!pageCustomMargins[currentPage]);
    }
  };

  const handleWorkspaceMouseUp = () => {
    isDraggingRef.current = null;
    document.removeEventListener("mousemove", handleWorkspaceMouseMove);
    document.removeEventListener("mouseup", handleWorkspaceMouseUp);
  };

  // Keyboard fine adjustments by 1pt on arrow presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (uploadStatus !== "ready" || viewMode !== "edit") return;

      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.getAttribute("contenteditable") === "true")) {
        return;
      }

      // Undo: Ctrl + Z
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
        return;
      }
      // Redo: Ctrl + Y
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
        return;
      }
      // Save: Ctrl + S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleCropExport();
        return;
      }

      // Arrow fine-tuning (moves crop box margins)
      const current = { ...getPageMargins() };
      const step = e.shiftKey ? 10 : 1; // 10 points on shift, 1 point otherwise
      let changed = false;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        current.top = Math.max(0, current.top - step);
        current.bottom = Math.min(pageHeightPoints - current.top - 20, current.bottom + step);
        changed = true;
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        current.bottom = Math.max(0, current.bottom - step);
        current.top = Math.min(pageHeightPoints - current.bottom - 20, current.top + step);
        changed = true;
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        current.left = Math.max(0, current.left - step);
        current.right = Math.min(pageWidthPoints - current.left - 20, current.right + step);
        changed = true;
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        current.right = Math.max(0, current.right - step);
        current.left = Math.min(pageWidthPoints - current.right - 20, current.left + step);
        changed = true;
      }

      if (changed) {
        pushToUndo(margins, pageCustomMargins);
        updateMargins(current, !!pageCustomMargins[currentPage]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [uploadStatus, margins, pageCustomMargins, currentPage, viewMode]);

  // Client-side auto margin detection scan
  const handleAutoCropDetect = async () => {
    if (!pdfjsDoc || isAutoDetecting) return;
    setIsAutoDetecting(true);

    try {
      const page = await pdfjsDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale: 1.5 }); // render at decent resolution
      
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get context");
      
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      await page.render(renderContext).promise;

      // Extract pixel matrix
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const width = canvas.width;
      const height = canvas.height;

      // Helper to check if a pixel is blank background (white/off-white or scanner borders)
      const isBackground = (x: number, y: number) => {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const isWhite = r > 240 && g > 240 && b > 240;
        const isBlackBorder = r < 35 && g < 35 && b < 35; // scanner shadows
        return isWhite || isBlackBorder;
      };

      let minX = 0;
      let maxX = width - 1;
      let minY = 0;
      let maxY = height - 1;

      // Scan Left Edge
      let found = false;
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          if (!isBackground(x, y)) {
            minX = x;
            found = true;
            break;
          }
        }
        if (found) break;
      }

      // Scan Right Edge
      found = false;
      for (let x = width - 1; x >= 0; x--) {
        for (let y = 0; y < height; y++) {
          if (!isBackground(x, y)) {
            maxX = x;
            found = true;
            break;
          }
        }
        if (found) break;
      }

      // Scan Top Edge
      found = false;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (!isBackground(x, y)) {
            minY = y;
            found = true;
            break;
          }
        }
        if (found) break;
      }

      // Scan Bottom Edge
      found = false;
      for (let y = height - 1; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
          if (!isBackground(x, y)) {
            maxY = y;
            found = true;
            break;
          }
        }
        if (found) break;
      }

      // Scaling ratio back to points
      const scaleX = pageWidthPoints / width;
      const scaleY = pageHeightPoints / height;

      // Buffer spacing to prevent cutting into characters (e.g. 15 points)
      const buffer = 15;

      const detected = {
        left: Math.max(0, (minX * scaleX) - buffer),
        right: Math.max(0, ((width - 1 - maxX) * scaleX) - buffer),
        top: Math.max(0, (minY * scaleY) - buffer),
        bottom: Math.max(0, ((height - 1 - maxY) * scaleY) - buffer)
      };

      // Ensure sanity of detected ranges
      if (pageWidthPoints - detected.left - detected.right >= 40 &&
          pageHeightPoints - detected.top - detected.bottom >= 40) {
        pushToUndo(margins, pageCustomMargins);
        updateMargins(detected, false); // Applies global margins for simplicity
      } else {
        alert("Could not detect clean borders. Pages might be completely black/white or complex visual elements are too close to edges.");
      }
    } catch (e: any) {
      alert("Auto crop detection failed: " + e.message);
    } finally {
      setIsAutoDetecting(false);
    }
  };

  // Apply crop preset margins
  const handleApplyPreset = (p: CropPreset) => {
    pushToUndo(margins, pageCustomMargins);
    setUnit(p.unit);
    setMargins(p.margins);
  };

  // Save selection presets
  const handleSavePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName.trim()) return;

    const newPreset: CropPreset = {
      id: Math.random().toString(36).substring(2, 9),
      name: newPresetName.trim(),
      margins: { ...getPageMargins() },
      unit
    };

    const updated = [...presets, newPreset];
    savePresets(updated);
    setNewPresetName("");
    setShowSavePresetModal(false);
  };

  const deletePreset = (id: string) => {
    const updated = presets.filter(p => p.id !== id);
    savePresets(updated);
  };

  // Clear workspace
  const clearFile = () => {
    setFile(null);
    setPdfjsDoc(null);
    setPageCount(0);
    setFileSize(0);
    setMargins({ top: 40, bottom: 40, left: 40, right: 40 });
    setPageCustomMargins({});
    setUndoStack([]);
    setRedoStack([]);
    setPassword("");
    setRequiresPassword(false);
    setUploadStatus("idle");
  };

  // Compile crop ranges via pdf-lib
  const handleCropExport = async () => {
    if (!file || pageCount === 0) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      let loadTarget: ArrayBuffer | Uint8Array = arrayBuffer;

      if (password) {
        loadTarget = await decryptPDF(new Uint8Array(arrayBuffer), password);
      }

      const srcDoc = await PDFDocument.load(loadTarget, { ignoreEncryption: true });
      const totalPages = srcDoc.getPageCount();

      // Resolve targeted page indices
      const targetIndices: number[] = [];
      
      if (targetPages === "all") {
        for (let i = 0; i < totalPages; i++) targetIndices.push(i);
      } else if (targetPages === "odd") {
        for (let i = 0; i < totalPages; i += 2) targetIndices.push(i);
      } else if (targetPages === "even") {
        for (let i = 1; i < totalPages; i += 2) targetIndices.push(i);
      } else if (targetPages === "selected") {
        Object.entries(selectedPreviewPages).forEach(([pageStr, isSelected]) => {
          if (isSelected) {
            const pageNum = parseInt(pageStr, 10);
            if (pageNum >= 1 && pageNum <= totalPages) {
              targetIndices.push(pageNum - 1);
            }
          }
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
              const min = Math.min(start, end) - 1;
              const max = Math.max(start, end) - 1;
              for (let i = Math.max(0, min); i <= Math.min(totalPages - 1, max); i++) {
                targetIndices.push(i);
              }
            }
          } else {
            const pageNum = parseInt(trimmed, 10);
            if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
              targetIndices.push(pageNum - 1);
            }
          }
        });
      }

      if (targetIndices.length === 0) {
        alert("Please target at least one page to apply crop box boundaries.");
        setIsProcessing(false);
        return;
      }

      // Loop page and set CropBox & MediaBox boundaries
      for (let i = 0; i < totalPages; i++) {
        if (!targetIndices.includes(i)) continue;

        const page = srcDoc.getPage(i);
        const { width, height } = page.getSize();

        // Check if there are custom page specific margins
        const activeMargins = pageCustomMargins[i + 1] || margins;

        const newX = activeMargins.left;
        const newY = activeMargins.bottom;
        const newWidth = Math.max(10, width - activeMargins.left - activeMargins.right);
        const newHeight = Math.max(10, height - activeMargins.top - activeMargins.bottom);

        // Apply visual boundaries (CropBox defines the display crop)
        page.setCropBox(newX, newY, newWidth, newHeight);
        
        // Also apply MediaBox to enforce hard-clipping bounds in all standard readers
        page.setMediaBox(newX, newY, newWidth, newHeight);
      }

      const bytes = await srcDoc.save();
      const blob = new Blob([bytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${baseName}_cropped.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      saveHistoryItem(bytes.length);
    } catch (e: any) {
      console.error("PDF Crop failed", e);
      alert("Cropping failed: " + (e.message || e));
    } finally {
      setIsProcessing(false);
    }
  };

  const saveHistoryItem = (bytesSize: number) => {
    if (!file) return;
    const historyItem: CropHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      fileName: file.name,
      originalPageCount: pageCount,
      mode: "Local Crop",
      outputSize: bytesSize
    };
    setHistory(prev => {
      const updated = [historyItem, ...prev].slice(0, 10);
      localStorage.setItem("pdf_crop_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("pdf_crop_history");
  };

  // Dimensions math
  const activeMargins = getPageMargins();
  const croppedWidth = Math.max(0, pageWidthPoints - activeMargins.left - activeMargins.right);
  const croppedHeight = Math.max(0, pageHeightPoints - activeMargins.top - activeMargins.bottom);
  
  const originalArea = pageWidthPoints * pageHeightPoints;
  const croppedArea = croppedWidth * croppedHeight;
  const areaRemovedPercent = originalArea > 0 ? ((originalArea - croppedArea) / originalArea) * 100 : 0;

  // Render on-screen SVG relative positioning of crop boxes
  const screenScale = zoom;
  const leftPct = (activeMargins.left / pageWidthPoints) * 100;
  const rightPct = (activeMargins.right / pageWidthPoints) * 100;
  const topPct = (activeMargins.top / pageHeightPoints) * 100;
  const bottomPct = (activeMargins.bottom / pageHeightPoints) * 100;

  return (
    <div className="space-y-8">
      {/* ─── SECURE INSTRUCTION HEADER ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-6 py-4 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#518231]/10 rounded-2xl text-[#518231]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-855 dark:text-slate-155">Local Safe PDF Margins Trimmer</h2>
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
              Margin Crop History (Local Cache)
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
              No recent page crops. Your past files will show here locally.
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
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-450 font-bold border-t pt-2 border-slate-100 dark:border-slate-900">
                    <span>Pages: {item.originalPageCount}</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-black text-[9px] uppercase">
                      {(item.outputSize / 1024).toFixed(0)} KB
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
              Drag and drop your PDF file here
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
            Parsing document boundaries & rendering views...
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
          
          {/* MAIN CROP WORKSPACE COLUMN (LEFT 8 COLS) */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* WORKSPACE HEADER TOOLBAR */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-4 rounded-3xl">
              
              {/* Zoom & Page Nav controls */}
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

              {/* Undo / Redo / Auto-detect toolbar */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div className="flex items-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl p-1">
                  <button
                    disabled={undoStack.length === 0}
                    onClick={handleUndo}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-45 rounded-lg text-slate-500 transition-all cursor-pointer"
                    title="Undo (Ctrl + Z)"
                  >
                    <Undo size={14} />
                  </button>
                  <button
                    disabled={redoStack.length === 0}
                    onClick={handleRedo}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-45 rounded-lg text-slate-500 transition-all cursor-pointer"
                    title="Redo (Ctrl + Y)"
                  >
                    <Redo size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAutoCropDetect}
                  disabled={isAutoDetecting}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/20 font-black text-xs rounded-xl cursor-pointer transition-all disabled:opacity-50"
                  title="Automatically detect margins & scanner edges"
                >
                  {isAutoDetecting ? (
                    <>
                      <Loader2 className="animate-spin" size={13} />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} />
                      Auto-Crop Detect
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* VISUAL INTERACTIVE CROP CANVAS WORKSPACE */}
            <div 
              ref={cropWorkspaceRef}
              className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 flex items-center justify-center overflow-auto shadow-inner relative min-h-[480px]"
            >
              
              <div 
                className="relative bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-md select-none transition-transform duration-150"
                style={{
                  transform: `scale(${screenScale})`,
                  transformOrigin: "center center",
                  width: `${pageWidthPoints}px`,
                  height: `${pageHeightPoints}px`
                }}
              >
                
                {/* PDF Page Canvas */}
                <canvas 
                  ref={previewCanvasRef} 
                  className="w-full h-full object-contain pointer-events-none"
                />

                {/* SVG/HTML Crop Box Dragging Overlay Wrapper */}
                <div 
                  className="absolute inset-0 z-20 cursor-default"
                  onMouseDown={(e) => handleWorkspaceMouseDown(e, "move")}
                >
                  {/* Crop bounds (outer dimmed layer) */}
                  <div className="absolute inset-0 bg-black/45 pointer-events-none" style={{
                    clipPath: `polygon(
                      0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
                      ${leftPct}% ${topPct}%, ${leftPct}% ${100 - bottomPct}%, ${100 - rightPct}% ${100 - bottomPct}%, ${100 - rightPct}% ${topPct}%, ${leftPct}% ${topPct}%
                    )`
                  }} />

                  {/* Active Crop Box Rect */}
                  <div 
                    className="absolute border-2 border-dashed border-[#518231] bg-[#518231]/5 cursor-move"
                    style={{
                      left: `${leftPct}%`,
                      right: `${rightPct}%`,
                      top: `${topPct}%`,
                      bottom: `${bottomPct}%`
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation(); // prevent handles from firing move action
                      handleWorkspaceMouseDown(e, "move");
                    }}
                  >
                    {/* Dimension Badge */}
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#518231] text-white text-[8px] font-black rounded shadow pointer-events-none select-none">
                      {Math.round(croppedWidth)} x {Math.round(croppedHeight)} pt
                    </div>

                    {/* Resizing Handles (8 points) */}
                    {[
                      { name: "top-left", className: "-top-1.5 -left-1.5 cursor-nwse-resize" },
                      { name: "top-right", className: "-top-1.5 -right-1.5 cursor-nesw-resize" },
                      { name: "bottom-left", className: "-bottom-1.5 -left-1.5 cursor-nesw-resize" },
                      { name: "bottom-right", className: "-bottom-1.5 -right-1.5 cursor-nwse-resize" },
                      { name: "top", className: "-top-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize" },
                      { name: "bottom", className: "-bottom-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize" },
                      { name: "left", className: "top-1/2 -translate-y-1/2 -left-1.5 cursor-ew-resize" },
                      { name: "right", className: "top-1/2 -translate-y-1/2 -right-1.5 cursor-ew-resize" }
                    ].map(h => (
                      <div
                        key={h.name}
                        className={`absolute w-3.5 h-3.5 bg-white border-2 border-[#518231] rounded-full z-30 shadow-xs hover:scale-110 active:scale-125 transition-transform ${h.className}`}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleWorkspaceMouseDown(e, h.name);
                        }}
                      />
                    ))}
                  </div>

                </div>

              </div>

            </div>

            {/* KEYBOARD SHORTCUTS INFO FOOTER */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl text-[10px] text-slate-500 dark:text-slate-400 font-extrabold">
              <Keyboard size={14} className="text-[#518231]" />
              <span>Shortcuts: **Ctrl + Z** to Undo • **Ctrl + Y** to Redo • **Arrow Keys** to nudge box bounds • **Shift + Arrow** to shift 10pt • **Ctrl + S** to save output</span>
            </div>

          </div>

          {/* SIDEBAR PARAMETERS CONTROL PANEL (RIGHT 4 COLS) */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* DIMENSIONS ANALYSIS STATS */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-slate-550 dark:text-slate-450 uppercase tracking-widest pl-1">
                Dimension Analysis
              </h3>
              
              <div className="space-y-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-4 rounded-2xl shadow-sm text-xs font-bold">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Original Size:</span>
                  <span className="text-slate-800 dark:text-white">
                    {Math.round(pageWidthPoints)} x {Math.round(pageHeightPoints)} pt
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-900 pt-2">
                  <span className="text-[#518231]">Cropped Size:</span>
                  <span className="text-[#518231] font-black">
                    {Math.round(croppedWidth)} x {Math.round(croppedHeight)} pt
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Removed Area:</span>
                  <span className="text-red-500 font-black">
                    {areaRemovedPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* MARGIN MEASUREMENTS CONTROLS */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4">
              
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-550 dark:text-slate-450 uppercase tracking-widest pl-1">
                  Margin Trims
                </h3>
                
                {/* Unit Switcher */}
                <div className="flex border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg p-0.5 text-[9px] font-black">
                  {(["pt", "mm", "px"] as const).map(u => (
                    <button
                      key={u}
                      onClick={() => setUnit(u)}
                      className={`px-2 py-1 rounded transition-all cursor-pointer ${
                        unit === u ? "bg-[#518231] text-white shadow-xs" : "text-slate-500"
                      }`}
                    >
                      {u.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bounded margin parameters */}
              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { key: "top", label: "Top Margin" },
                  { key: "bottom", label: "Bottom Margin" },
                  { key: "left", label: "Left Margin" },
                  { key: "right", label: "Right Margin" }
                ].map(m => {
                  const val = ptToUnit(activeMargins[m.key as keyof Margins]);
                  return (
                    <div key={m.key} className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 pl-1 uppercase tracking-wide">
                        {m.label}
                      </label>
                      <div className="flex items-center border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl px-3 py-2">
                        <input
                          type="number"
                          value={val}
                          onChange={(e) => {
                            const num = parseFloat(e.target.value) || 0;
                            const points = unitToPt(num);
                            
                            const nextMargins = { ...activeMargins };
                            nextMargins[m.key as keyof Margins] = Math.max(0, points);

                            // Validate dimensions boundary block
                            if (pageWidthPoints - nextMargins.left - nextMargins.right >= 20 &&
                                pageHeightPoints - nextMargins.top - nextMargins.bottom >= 20) {
                              pushToUndo(margins, pageCustomMargins);
                              updateMargins(nextMargins, !!pageCustomMargins[currentPage]);
                            }
                          }}
                          className="w-full text-xs font-extrabold outline-none text-slate-800 dark:text-white"
                          min={0}
                        />
                        <span className="text-[10px] text-slate-400 font-bold select-none ml-1 uppercase">
                          {unit}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Set page specific crop toggle */}
              <div className="flex items-center justify-between border-t pt-3.5 border-slate-200/50 dark:border-slate-850">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide pl-1">
                  Custom Page-Specific Crop
                </span>
                <input
                  type="checkbox"
                  checked={!!pageCustomMargins[currentPage]}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    pushToUndo(margins, pageCustomMargins);
                    if (isChecked) {
                      setPageCustomMargins(prev => ({
                        ...prev,
                        [currentPage]: { ...margins }
                      }));
                    } else {
                      setPageCustomMargins(prev => {
                        const updated = { ...prev };
                        delete updated[currentPage];
                        return updated;
                      });
                    }
                  }}
                  className="accent-[#518231] w-4 h-4 cursor-pointer"
                />
              </div>

            </div>

            {/* PRESETS TEMPLATES */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-550 dark:text-slate-450 uppercase tracking-widest pl-1">
                  Margin Presets
                </h3>
                <button
                  onClick={() => setShowSavePresetModal(true)}
                  className="text-[9px] font-black text-[#518231] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Bookmark size={10} /> Save Current
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {presets.map(p => (
                  <div
                    key={p.id}
                    className="group flex items-center gap-1 bg-white hover:bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-2.5 py-1.5 rounded-xl text-[10px] font-extrabold cursor-pointer transition-all"
                  >
                    <span onClick={() => handleApplyPreset(p)}>{p.name}</span>
                    {!p.id.startsWith("p-") && ( // default presets can't be deleted
                      <button
                        onClick={() => deletePreset(p.id)}
                        className="text-slate-400 hover:text-red-500 pl-1 font-bold cursor-pointer"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SAVE PRESET DIALOG MODAL */}
            {showSavePresetModal && (
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl space-y-4 shadow-md">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">Save Margin Preset</h4>
                  <button onClick={() => setShowSavePresetModal(false)} className="text-slate-400 font-bold">×</button>
                </div>
                <form onSubmit={handleSavePreset} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Preset Name (e.g. Textbook Margins)"
                    value={newPresetName}
                    onChange={e => setNewPresetName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50 dark:bg-slate-900 outline-none"
                    autoFocus
                  />
                  <div className="text-[10px] text-slate-500 font-semibold bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border">
                    L: {ptToUnit(activeMargins.left)} • R: {ptToUnit(activeMargins.right)} • T: {ptToUnit(activeMargins.top)} • B: {ptToUnit(activeMargins.bottom)} {unit}
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowSavePresetModal(false)}
                      className="px-3 py-1.5 border rounded-lg text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#518231] text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* PAGE TARGETING PANEL */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-slate-555 dark:text-slate-450 uppercase tracking-widest pl-1">
                Target Pages
              </h3>

              <div className="space-y-2.5">
                {[
                  { id: "all", label: "Apply to All Pages" },
                  { id: "odd", label: "Apply to Odd Pages Only" },
                  { id: "even", label: "Apply to Even Pages Only" },
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
                            name="target_option"
                            checked={isChecked}
                            onChange={() => {}}
                            className="accent-[#518231]"
                          />
                          <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                            {opt.label}
                          </span>
                        </div>
                      </div>

                      {/* Display custom range box if active */}
                      {opt.id === "range" && isChecked && (
                        <div className="pl-1 animate-in slide-in-from-top-1 duration-150">
                          <input
                            type="text"
                            value={customRangeText}
                            onChange={e => setCustomRangeText(e.target.value)}
                            placeholder="e.g. 1-10, 15, 20-30"
                            className="w-full px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-950 outline-none focus:border-[#518231]"
                          />
                          <p className="text-[9px] text-slate-400 font-semibold mt-1">
                            Separate page index limits using commas and dashes.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ACTION EXPORT BUTTON */}
            <button
              onClick={handleCropExport}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#518231] hover:bg-[#436e29] disabled:bg-slate-200 disabled:dark:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-2xl cursor-pointer transition-all shadow-sm"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Cropping Pages...
                </>
              ) : (
                <>
                  <Crop size={16} />
                  Crop & Save PDF
                </>
              )}
            </button>

          </div>

        </div>
      )}
    </div>
  );
}
