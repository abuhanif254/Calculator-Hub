"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  FileText, Upload, Trash2, Settings, CheckCircle, AlertCircle, 
  Loader2, Download, RefreshCw, History, ShieldAlert, Info, Check,
  ChevronDown, ArrowRight, Zap, Eye, Sliders, Type, Square, Circle, 
  Edit3, Image as ImageIcon, Signature as SignatureIcon, HelpCircle, 
  Search, Undo2, Redo2, RotateCw, Copy, Plus, FileSpreadsheet, Layers, 
  Minus, ZoomIn, ZoomOut, Maximize2, Move, HelpCircle as HelpIcon, ArrowUpRight,
  MessageSquare, Eraser, Highlighter, X
} from "lucide-react";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

const PDFJS_VERSION = "3.11.174";

// ─────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────
interface PdfMetadata {
  title?: string;
  author?: string;
  creator?: string;
  producer?: string;
  version?: string;
}

interface PdfPageConfig {
  originalIndex: number;
  rotation: number; // 0, 90, 180, 270
  id: string;
}

interface EditorObject {
  id: string;
  pageIndex: number; // the page index relative to active order
  type: "text" | "rect" | "circle" | "line" | "drawing" | "image" | "signature" | "sticky" | "arrow" | "checkmark" | "crossmark";
  x: number; // percentage coordinate relative to page width (0 to 100)
  y: number; // percentage coordinate relative to page height (0 to 100)
  width: number; // percentage width
  height: number; // percentage height
  rotation?: number; // degrees (0-360)
  
  // Text specific
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: string;
  color?: string;

  // Shapes & Drawing specific
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
  svgPath?: string; // For drawings/freehand paths

  // Image & Signature specific
  imageSrc?: string; // Data URL or Object URL
  
  // Sticky Notes
  author?: string;
  comment?: string;

  // Redaction for editing existing text
  redact?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface HistoryState {
  objects: EditorObject[];
  pagesOrder: PdfPageConfig[];
}

export function EditPdfTool() {
  // ─────────────────────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────────────────────
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pdfVersion, setPdfVersion] = useState<string>("1.7");
  const [metadata, setMetadata] = useState<PdfMetadata | null>(null);
  
  const [parsedPageText, setParsedPageText] = useState<{ [key: number]: any[] }>({});
  const [activeViewport, setActiveViewport] = useState<any>(null);
  
  const [pagesOrder, setPagesOrder] = useState<PdfPageConfig[]>([]);
  const [objects, setObjects] = useState<EditorObject[]>([]);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  
  // History Undo/Redo stack
  const [historyStack, setHistoryStack] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Editor Workspace Configs
  const [activeTool, setActiveTool] = useState<string>("select"); // select, text, rect, circle, line, pencil, marker, sticky, image, signature
  const [zoom, setZoom] = useState<number>(1.0); // 0.5 to 2.0
  const [zoomMode, setZoomMode] = useState<"custom" | "fitWidth" | "fitPage">("fitWidth");
  const [sidebarTab, setSidebarTab] = useState<"thumbnails" | "layers" | "search" | "help">("thumbnails");

  // Search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{ pageIndex: number; text: string }[]>([]);

  // Drawing settings
  const [strokeColor, setStrokeColor] = useState<string>("#518231");
  const [fillColor, setFillColor] = useState<string>("#e2f0d9");
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [opacity, setOpacity] = useState<number>(100);
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState<string>("Helvetica");
  const [fontWeight, setFontWeight] = useState<string>("normal");
  const [fontStyle, setFontStyle] = useState<string>("normal");
  const [color, setColor] = useState<string>("#000000");

  // Drawing tracking
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawingPoints, setDrawingPoints] = useState<{ x: number; y: number }[]>([]);
  const [drawingPathStr, setDrawingPathStr] = useState<string>("");

  // Signature Modal states
  const [showSigModal, setShowSigModal] = useState<boolean>(false);
  const [sigMode, setSigMode] = useState<"draw" | "type" | "upload">("draw");
  const [typedSigName, setTypedSigName] = useState<string>("");
  const [typedSigFont, setTypedSigFont] = useState<string>("Alex Brush");
  const [sigFileUrl, setSigFileUrl] = useState<string | null>(null);

  // File Upload drag states
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [globalDragActive, setGlobalDragActive] = useState<boolean>(false);
  
  // PDF.js Document references
  const [pdfjsLoaded, setPdfjsLoaded] = useState<boolean>(false);
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  
  // UI Status
  const [processingStatus, setProcessingStatus] = useState<"idle" | "loading" | "saving" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Signature canvas ref
  const sigCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const activeRenderTaskRef = useRef<any>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // Clipboard (for Copy/Paste)
  const [clipboardObject, setClipboardObject] = useState<EditorObject | null>(null);

  // Script loader ref
  const scriptLoadedRef = useRef<boolean>(false);

  // Load PDF.js CDN
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
      script.onerror = () => reject(new Error("Failed to load PDF.js from CDN."));
      document.head.appendChild(script);
    });
  };

  // Drag and drop sorting list sorting refs
  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);

  // ─────────────────────────────────────────────────────────
  // HISTORY UTILITIES (UNDO/REDO)
  // ─────────────────────────────────────────────────────────
  const saveHistoryState = (updatedObjects: EditorObject[], updatedPages: PdfPageConfig[]) => {
    const newState: HistoryState = {
      objects: JSON.parse(JSON.stringify(updatedObjects)),
      pagesOrder: JSON.parse(JSON.stringify(updatedPages))
    };
    
    const nextStack = historyStack.slice(0, historyIndex + 1);
    const newStack = [...nextStack, newState].slice(-50); // limit to 50 undo levels
    
    setHistoryStack(newStack);
    setHistoryIndex(newStack.length - 1);

    // Auto save draft locally
    localStorage.setItem("edit_pdf_draft_objects", JSON.stringify(updatedObjects));
    localStorage.setItem("edit_pdf_draft_pages", JSON.stringify(updatedPages));
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      const state = historyStack[prevIdx];
      setObjects(JSON.parse(JSON.stringify(state.objects)));
      setPagesOrder(JSON.parse(JSON.stringify(state.pagesOrder)));
      setHistoryIndex(prevIdx);
      setSelectedObjectId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const nextIdx = historyIndex + 1;
      const state = historyStack[nextIdx];
      setObjects(JSON.parse(JSON.stringify(state.objects)));
      setPagesOrder(JSON.parse(JSON.stringify(state.pagesOrder)));
      setHistoryIndex(nextIdx);
      setSelectedObjectId(null);
    }
  };

  // ─────────────────────────────────────────────────────────
  // GLOBAL LISTENERS & SHORTCUTS
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setGlobalDragActive(true);
    };
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setGlobalDragActive(false);
      }
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setGlobalDragActive(false);
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  // Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+S, Delete, Ctrl+C, Ctrl+V)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;

      if (isCtrl && e.key.toLowerCase() === "z") {
        e.preventDefault();
        handleUndo();
      }
      if (isCtrl && e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
      }
      if (isCtrl && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleExportPdf();
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        // Only trigger delete if not typing in an input field
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag !== "input" && activeTag !== "textarea" && selectedObjectId) {
          e.preventDefault();
          const filtered = objects.filter(o => o.id !== selectedObjectId);
          setObjects(filtered);
          setSelectedObjectId(null);
          saveHistoryState(filtered, pagesOrder);
        }
      }
      if (isCtrl && e.key.toLowerCase() === "c") {
        // Copy object
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag !== "input" && activeTag !== "textarea" && selectedObjectId) {
          const obj = objects.find(o => o.id === selectedObjectId);
          if (obj) {
            e.preventDefault();
            setClipboardObject(obj);
          }
        }
      }
      if (isCtrl && e.key.toLowerCase() === "v") {
        // Paste object
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag !== "input" && activeTag !== "textarea" && clipboardObject) {
          e.preventDefault();
          const pasted: EditorObject = {
            ...clipboardObject,
            id: `obj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            pageIndex: activePageIndex,
            x: Math.min(85, clipboardObject.x + 5),
            y: Math.min(85, clipboardObject.y + 5)
          };
          const nextObjects = [...objects, pasted];
          setObjects(nextObjects);
          setSelectedObjectId(pasted.id);
          saveHistoryState(nextObjects, pagesOrder);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [objects, selectedObjectId, pagesOrder, activePageIndex, clipboardObject, historyIndex, historyStack]);

  // Load draft from localStorage on mount (Client-only check)
  useEffect(() => {
    const savedObjs = localStorage.getItem("edit_pdf_draft_objects");
    const savedPages = localStorage.getItem("edit_pdf_draft_pages");
    if (savedObjs && savedPages) {
      try {
        const parsedObjs = JSON.parse(savedObjs);
        const parsedPages = JSON.parse(savedPages);
        if (Array.isArray(parsedObjs) && Array.isArray(parsedPages)) {
          setObjects(parsedObjs);
          setPagesOrder(parsedPages);
          // Initialize history stack with recovered state
          setHistoryStack([{ objects: parsedObjs, pagesOrder: parsedPages }]);
          setHistoryIndex(0);
        }
      } catch (e) {
        console.error("Failed to parse saved drafts", e);
      }
    }
  }, []);

  // ─────────────────────────────────────────────────────────
  // FILE LOADING & PARSING
  // ─────────────────────────────────────────────────────────
  const processUploadFile = async (f: File) => {
    if (f.type !== "application/pdf" && !f.name.endsWith(".pdf")) {
      alert("Invalid format. Please select a valid PDF file.");
      return;
    }

    setProcessingStatus("loading");
    setStatusMessage("Reading document bytes...");
    setFile(f);
    setFileName(f.name);
    setFileSize(f.size);

    try {
      const arrayBuffer = await f.arrayBuffer();
      
      // Load source details via pdf-lib
      const pdfLibDoc = await PDFDocument.load(arrayBuffer, { 
        ignoreEncryption: true,
        updateMetadata: false 
      });

      const count = pdfLibDoc.getPageCount();
      setPageCount(count);

      // Check header info
      const headerBytes = new Uint8Array(arrayBuffer.slice(0, 32));
      const headerString = new TextDecoder().decode(headerBytes);
      const versionMatch = headerString.match(/%PDF-(\d+\.\d+)/);
      if (versionMatch) setPdfVersion(versionMatch[1]);

      const initialPages: PdfPageConfig[] = Array.from({ length: count }, (_, i) => ({
        originalIndex: i,
        rotation: 0,
        id: `page-${i}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
      }));

      setPagesOrder(initialPages);
      setObjects([]);
      setActivePageIndex(0);
      setSelectedObjectId(null);

      // Initialize history stack
      const initialHistory: HistoryState = {
        objects: [],
        pagesOrder: initialPages
      };
      setHistoryStack([initialHistory]);
      setHistoryIndex(0);

      // Render details in PDF.js
      setStatusMessage("Loading page rendering engines...");
      const pdfjs = await loadPdfJs();
      setPdfjsLoaded(true);

      const doc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      setPdfjsDoc(doc);
      
      setProcessingStatus("idle");
    } catch (err: any) {
      console.warn("Failed to load PDF file", err.message || err);
      let msg = "Could not parse PDF file structure.";
      if (err.message && err.message.includes("encrypted")) {
        msg = "Password protected PDF file. Please unlock before editing.";
      }
      setProcessingStatus("error");
      setStatusMessage(msg);
    }
  };

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
    setGlobalDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadFile(e.target.files[0]);
    }
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ─────────────────────────────────────────────────────────
  // VISUAL CANVAS RENDERING (PAGE VIEW)
  // ─────────────────────────────────────────────────────────
  const renderSinglePageCanvas = async (
    pageIndex: number, 
    canvasElement: HTMLCanvasElement | null,
    zoomFactor: number
  ) => {
    if (!canvasElement || !pdfjsDoc || pagesOrder.length <= pageIndex) return;

    try {
      const pageConfig = pagesOrder[pageIndex];
      const pageNumber = pageConfig.originalIndex + 1;
      const page = await pdfjsDoc.getPage(pageNumber);

      // Determine correct viewport size matching rotation
      const rotationAngle = (((page.rotation || 0) + (pageConfig.rotation || 0)) % 360);
      const viewport = page.getViewport({ scale: 1.5 * zoomFactor, rotation: rotationAngle });
      setActiveViewport(viewport);

      const context = canvasElement.getContext("2d");
      if (!context) return;

      canvasElement.width = viewport.width;
      canvasElement.height = viewport.height;

      // Handle active renders cancellation
      if (activeRenderTaskRef.current) {
        try {
          activeRenderTaskRef.current.cancel();
        } catch (e) {}
      }

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      const renderTask = page.render(renderContext);
      activeRenderTaskRef.current = renderTask;

      await renderTask.promise;
      activeRenderTaskRef.current = null;
    } catch (e: any) {
      if (e.name !== "RenderingCancelledException") {
        console.error("PDF page rendering failed:", e);
      }
    }
  };

  // Trigger canvas renders when page or zoom configs change
  const activeCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (pdfjsDoc && file && pagesOrder.length > 0) {
      renderSinglePageCanvas(activePageIndex, activeCanvasRef.current, zoom);
    }
  }, [pdfjsDoc, activePageIndex, pagesOrder, zoom]);

  // Handle zoom presets
  useEffect(() => {
    if (zoomMode === "fitWidth" && pageContainerRef.current) {
      const containerWidth = pageContainerRef.current.clientWidth;
      const targetZoom = Math.max(0.6, Math.min(1.8, (containerWidth - 64) / 900));
      setZoom(targetZoom);
    } else if (zoomMode === "fitPage") {
      setZoom(0.8);
    }
  }, [zoomMode, activePageIndex]);

  const loadActivePageText = async () => {
    if (!pdfjsDoc || parsedPageText[activePageIndex]) return;
    try {
      const pageConfig = pagesOrder[activePageIndex];
      const page = await pdfjsDoc.getPage(pageConfig.originalIndex + 1);
      const textContent = await page.getTextContent();
      setParsedPageText(prev => ({
        ...prev,
        [activePageIndex]: textContent.items
      }));
    } catch (e) {
      console.error("Failed to parse page text", e);
    }
  };

  useEffect(() => {
    if (activeTool === "edit-text") {
      loadActivePageText();
    }
  }, [activeTool, activePageIndex]);

  // ─────────────────────────────────────────────────────────
  // LAYERING & INTERACTIVE OBJECTS MANIPULATION
  // ─────────────────────────────────────────────────────────
  const handlePageOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === "select") {
      // Clear selection if clicking page backdrop directly
      if (e.target === e.currentTarget) {
        setSelectedObjectId(null);
      }
      return;
    }

    // Capture coordinates in percent offsets relative to current element boundaries
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    let newObj: EditorObject | null = null;
    const id = `obj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    if (activeTool === "text") {
      newObj = {
        id,
        pageIndex: activePageIndex,
        type: "text",
        x: clickX,
        y: clickY,
        width: 30,
        height: 8,
        text: "Double click to edit",
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        fontStyle: fontStyle,
        color: color,
        textAlign: "left"
      };
    } else if (activeTool === "rect") {
      newObj = {
        id,
        pageIndex: activePageIndex,
        type: "rect",
        x: clickX - 10,
        y: clickY - 5,
        width: 20,
        height: 10,
        fillColor: fillColor,
        strokeColor: strokeColor,
        strokeWidth: strokeWidth,
        opacity: opacity
      };
    } else if (activeTool === "circle") {
      newObj = {
        id,
        pageIndex: activePageIndex,
        type: "circle",
        x: clickX - 8,
        y: clickY - 8,
        width: 16,
        height: 16,
        fillColor: fillColor,
        strokeColor: strokeColor,
        strokeWidth: strokeWidth,
        opacity: opacity
      };
    } else if (activeTool === "sticky") {
      newObj = {
        id,
        pageIndex: activePageIndex,
        type: "sticky",
        x: clickX - 3,
        y: clickY - 3,
        width: 6,
        height: 6,
        color: "#fef08a",
        comment: "Add comment details here..."
      };
    } else if (activeTool === "line") {
      newObj = {
        id,
        pageIndex: activePageIndex,
        type: "line",
        x: clickX - 10,
        y: clickY - 2,
        width: 20,
        height: 4,
        strokeColor: strokeColor,
        strokeWidth: strokeWidth,
        opacity: opacity
      };
    } else if (activeTool === "arrow") {
      newObj = {
        id,
        pageIndex: activePageIndex,
        type: "arrow",
        x: clickX - 10,
        y: clickY - 2,
        width: 20,
        height: 4,
        strokeColor: strokeColor,
        strokeWidth: strokeWidth,
        opacity: opacity
      };
    } else if (activeTool === "checkmark") {
      newObj = {
        id,
        pageIndex: activePageIndex,
        type: "checkmark",
        x: clickX - 4,
        y: clickY - 4,
        width: 8,
        height: 8,
        strokeColor: strokeColor === "#000000" ? "#22c55e" : strokeColor,
        strokeWidth: 4,
        opacity: opacity
      };
    } else if (activeTool === "crossmark") {
      newObj = {
        id,
        pageIndex: activePageIndex,
        type: "crossmark",
        x: clickX - 4,
        y: clickY - 4,
        width: 8,
        height: 8,
        strokeColor: strokeColor === "#000000" ? "#ef4444" : strokeColor,
        strokeWidth: 4,
        opacity: opacity
      };
    }

    if (newObj) {
      const nextObjs = [...objects, newObj];
      setObjects(nextObjs);
      setSelectedObjectId(id);
      saveHistoryState(nextObjs, pagesOrder);
      
      // Auto switch tool back to select
      setActiveTool("select");
    }
  };

  // Freehand pencil drawing handling
  const handlePageMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool !== "pencil" && activeTool !== "marker") return;
    
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const ptX = ((e.clientX - rect.left) / rect.width) * 100;
    const ptY = ((e.clientY - rect.top) / rect.height) * 100;
    
    setDrawingPoints([{ x: ptX, y: ptY }]);
    setDrawingPathStr(`M ${ptX.toFixed(1)} ${ptY.toFixed(1)}`);
  };

  const handlePageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ptX = ((e.clientX - rect.left) / rect.width) * 100;
    const ptY = ((e.clientY - rect.top) / rect.height) * 100;
    
    const nextPts = [...drawingPoints, { x: ptX, y: ptY }];
    setDrawingPoints(nextPts);
    
    // Build path coordinates string
    const path = drawingPathStr + ` L ${ptX.toFixed(1)} ${ptY.toFixed(1)}`;
    setDrawingPathStr(path);
  };

  const handlePageMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (drawingPoints.length > 1) {
      const id = `obj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const drawingObj: EditorObject = {
        id,
        pageIndex: activePageIndex,
        type: "drawing",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        svgPath: drawingPathStr,
        strokeColor: strokeColor,
        strokeWidth: activeTool === "marker" ? strokeWidth * 2.5 : strokeWidth,
        opacity: activeTool === "marker" ? 40 : opacity
      };

      const nextObjs = [...objects, drawingObj];
      setObjects(nextObjs);
      saveHistoryState(nextObjs, pagesOrder);
    }
    
    setDrawingPoints([]);
    setDrawingPathStr("");
  };

  const handleObjectDragStart = (e: React.MouseEvent, objId: string) => {
    e.stopPropagation();
    
    if (activeTool === "eraser") {
      const filtered = objects.filter(o => o.id !== objId);
      setObjects(filtered);
      setSelectedObjectId(null);
      saveHistoryState(filtered, pagesOrder);
      return;
    }

    setSelectedObjectId(objId);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const obj = objects.find(o => o.id === objId);
    if (!obj) return;
    
    const initialX = obj.x;
    const initialY = obj.y;

    const handleDragMove = (moveEvent: MouseEvent) => {
      const container = document.getElementById(`overlay-page-${activePageIndex}`);
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const deltaX = ((moveEvent.clientX - startX) / containerRect.width) * 100;
      const deltaY = ((moveEvent.clientY - startY) / containerRect.height) * 100;

      setObjects(prev => 
        prev.map(o => o.id === objId 
          ? { 
              ...o, 
              x: Math.max(0, Math.min(100 - o.width, initialX + deltaX)), 
              y: Math.max(0, Math.min(100 - o.height, initialY + deltaY)) 
            } 
          : o
        )
      );
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      saveHistoryState(objects, pagesOrder);
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleObjectResizeStart = (e: React.MouseEvent, objId: string, handleDir: string) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const obj = objects.find(o => o.id === objId);
    if (!obj) return;

    const initialW = obj.width;
    const initialH = obj.height;
    const initialX = obj.x;
    const initialY = obj.y;

    const handleResizeMove = (moveEvent: MouseEvent) => {
      const container = document.getElementById(`overlay-page-${activePageIndex}`);
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const deltaW = ((moveEvent.clientX - startX) / containerRect.width) * 100;
      const deltaH = ((moveEvent.clientY - startY) / containerRect.height) * 100;

      setObjects(prev => 
        prev.map(o => {
          if (o.id !== objId) return o;
          
          let nextW = initialW;
          let nextH = initialH;
          let nextX = initialX;
          let nextY = initialY;

          if (handleDir.includes("e")) nextW = Math.max(2, initialW + deltaW);
          if (handleDir.includes("s")) nextH = Math.max(2, initialH + deltaH);
          
          if (handleDir.includes("w")) {
            const possibleW = initialW - deltaW;
            if (possibleW > 2) {
              nextW = possibleW;
              nextX = initialX + deltaW;
            }
          }
          
          if (handleDir.includes("n")) {
            const possibleH = initialH - deltaH;
            if (possibleH > 2) {
              nextH = possibleH;
              nextY = initialY + deltaH;
            }
          }

          return { ...o, width: nextW, height: nextH, x: nextX, y: nextY };
        })
      );
    };

    const handleResizeEnd = () => {
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
      saveHistoryState(objects, pagesOrder);
    };

    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const updateSelectedObjectText = (val: string) => {
    if (!selectedObjectId) return;
    const nextList = objects.map(o => o.id === selectedObjectId ? { ...o, text: val } : o);
    setObjects(nextList);
    // Don't save to history on every keystroke, just locally update. History will update on blur.
  };

  const bringToFront = (id: string) => {
    const target = objects.find(o => o.id === id);
    if (!target) return;
    const rest = objects.filter(o => o.id !== id);
    const next = [...rest, target];
    setObjects(next);
    saveHistoryState(next, pagesOrder);
  };

  const sendToBack = (id: string) => {
    const target = objects.find(o => o.id === id);
    if (!target) return;
    const rest = objects.filter(o => o.id !== id);
    const next = [target, ...rest];
    setObjects(next);
    saveHistoryState(next, pagesOrder);
  };

  const moveUp = (id: string) => {
    const idx = objects.findIndex(o => o.id === id);
    if (idx === -1) return;
    const target = objects[idx];
    let nextIdx = -1;
    for (let i = idx + 1; i < objects.length; i++) {
      if (objects[i].pageIndex === target.pageIndex) {
        nextIdx = i;
        break;
      }
    }
    if (nextIdx === -1) return;
    const next = [...objects];
    next[idx] = next[nextIdx];
    next[nextIdx] = target;
    setObjects(next);
    saveHistoryState(next, pagesOrder);
  };

  const moveDown = (id: string) => {
    const idx = objects.findIndex(o => o.id === id);
    if (idx === -1) return;
    const target = objects[idx];
    let prevIdx = -1;
    for (let i = idx - 1; i >= 0; i--) {
      if (objects[i].pageIndex === target.pageIndex) {
        prevIdx = i;
        break;
      }
    }
    if (prevIdx === -1) return;
    const next = [...objects];
    next[idx] = next[prevIdx];
    next[prevIdx] = target;
    setObjects(next);
    saveHistoryState(next, pagesOrder);
  };

  // Image insertion triggers
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const src = fileReader.result as string;
        const id = `obj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const imgObj: EditorObject = {
          id,
          pageIndex: activePageIndex,
          type: "image",
          x: 25,
          y: 25,
          width: 25,
          height: 20,
          imageSrc: src,
          opacity: 100
        };
        const nextObjs = [...objects, imgObj];
        setObjects(nextObjs);
        setSelectedObjectId(id);
        saveHistoryState(nextObjs, pagesOrder);
        setActiveTool("select");
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };

  // ─────────────────────────────────────────────────────────
  // PAGE MANAGEMENT (SIDEBAR HANDLERS)
  // ─────────────────────────────────────────────────────────
  const rotatePageAction = (pageIdx: number) => {
    const nextPages = pagesOrder.map((p, idx) => 
      idx === pageIdx ? { ...p, rotation: (p.rotation + 90) % 360 } : p
    );
    setPagesOrder(nextPages);
    saveHistoryState(objects, nextPages);
  };

  const deletePageAction = (pageIdx: number) => {
    if (pagesOrder.length <= 1) {
      alert("A PDF must contain at least 1 page.");
      return;
    }
    const nextPages = pagesOrder.filter((_, idx) => idx !== pageIdx);
    
    // Delete objects on this page, and shift indexes of objects on subsequent pages
    const nextObjects = objects
      .filter(o => o.pageIndex !== pageIdx)
      .map(o => o.pageIndex > pageIdx ? { ...o, pageIndex: o.pageIndex - 1 } : o);

    setPagesOrder(nextPages);
    setObjects(nextObjects);
    saveHistoryState(nextObjects, nextPages);
    
    // Reset active page index safely
    setActivePageIndex(prev => Math.min(nextPages.length - 1, prev));
    setSelectedObjectId(null);
  };

  const duplicatePageAction = (pageIdx: number) => {
    const pageToDup = pagesOrder[pageIdx];
    const newPage: PdfPageConfig = {
      originalIndex: pageToDup.originalIndex,
      rotation: pageToDup.rotation,
      id: `page-dup-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
    };

    const nextPages = [...pagesOrder];
    nextPages.splice(pageIdx + 1, 0, newPage);

    // Shift indexes of objects on subsequent pages
    const nextObjects = objects.map(o => o.pageIndex > pageIdx ? { ...o, pageIndex: o.pageIndex + 1 } : o);

    setPagesOrder(nextPages);
    setObjects(nextObjects);
    saveHistoryState(nextObjects, nextPages);
    
    setActivePageIndex(pageIdx + 1);
    setSelectedObjectId(null);
  };

  // Sidebar drag sorting
  const handlePageDragStart = (position: number) => {
    dragItemIndex.current = position;
  };

  const handlePageDragOver = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    dragOverItemIndex.current = position;
  };

  const handlePageDragEnd = () => {
    if (dragItemIndex.current !== null && dragOverItemIndex.current !== null && dragItemIndex.current !== dragOverItemIndex.current) {
      const nextPages = [...pagesOrder];
      const dragItem = nextPages[dragItemIndex.current];
      
      nextPages.splice(dragItemIndex.current, 1);
      nextPages.splice(dragOverItemIndex.current, 0, dragItem);

      // Re-map objects pageIndex matching the swap
      const fromIdx = dragItemIndex.current;
      const toIdx = dragOverItemIndex.current;
      const nextObjects = objects.map(obj => {
        if (obj.pageIndex === fromIdx) {
          return { ...obj, pageIndex: toIdx };
        }
        if (fromIdx < toIdx) {
          if (obj.pageIndex > fromIdx && obj.pageIndex <= toIdx) {
            return { ...obj, pageIndex: obj.pageIndex - 1 };
          }
        } else {
          if (obj.pageIndex >= toIdx && obj.pageIndex < fromIdx) {
            return { ...obj, pageIndex: obj.pageIndex + 1 };
          }
        }
        return obj;
      });

      setPagesOrder(nextPages);
      setObjects(nextObjects);
      saveHistoryState(nextObjects, nextPages);
      setActivePageIndex(toIdx);
    }
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
  };

  // ─────────────────────────────────────────────────────────
  // SEARCH FUNCTIONALITY
  // ─────────────────────────────────────────────────────────
  const runSearch = async () => {
    if (!searchQuery.trim() || !pdfjsDoc) return;
    
    setProcessingStatus("loading");
    setStatusMessage("Searching page contents...");
    const results: { pageIndex: number; text: string }[] = [];

    try {
      for (let i = 0; i < pagesOrder.length; i++) {
        const origPageIdx = pagesOrder[i].originalIndex;
        const page = await pdfjsDoc.getPage(origPageIdx + 1);
        const textContent = await page.getTextContent();
        const fullText = textContent.items.map((item: any) => item.str).join(" ");
        
        if (fullText.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({
            pageIndex: i,
            text: fullText.substring(0, 100) + "..."
          });
        }
      }
      setSearchResults(results);
      setProcessingStatus("idle");
    } catch (e) {
      console.error("Search failed", e);
      setProcessingStatus("idle");
    }
  };

  // ─────────────────────────────────────────────────────────
  // SIGNATURE CREATION HANDLERS
  // ─────────────────────────────────────────────────────────
  // Setup signature drawing canvas
  useEffect(() => {
    if (showSigModal && sigMode === "draw" && sigCanvasRef.current) {
      const canvas = sigCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
      }
    }
  }, [showSigModal, sigMode]);

  const startSigDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    
    const handleMove = (moveEvt: MouseEvent) => {
      ctx.lineTo(moveEvt.clientX - rect.left, moveEvt.clientY - rect.top);
      ctx.stroke();
    };

    const handleUp = () => {
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleUp);
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleUp);
  };

  const clearSigDraw = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const applySignature = () => {
    let sigSrc = "";
    
    if (sigMode === "draw" && sigCanvasRef.current) {
      sigSrc = sigCanvasRef.current.toDataURL("image/png");
    } else if (sigMode === "type" && typedSigName.trim()) {
      // Draw text to an offline canvas to compile to PNG
      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 150;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#000000";
        ctx.font = `italic 40px ${typedSigFont === "Alex Brush" ? "Brush Script MT" : "cursive"}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(typedSigName, 250, 75);
        
        sigSrc = canvas.toDataURL("image/png");
      }
    } else if (sigMode === "upload" && sigFileUrl) {
      sigSrc = sigFileUrl;
    }

    if (sigSrc) {
      const id = `obj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const sigObj: EditorObject = {
        id,
        pageIndex: activePageIndex,
        type: "signature",
        x: 35,
        y: 65,
        width: 25,
        height: 10,
        imageSrc: sigSrc
      };

      const nextObjs = [...objects, sigObj];
      setObjects(nextObjs);
      setSelectedObjectId(id);
      saveHistoryState(nextObjs, pagesOrder);
      
      setShowSigModal(false);
      setTypedSigName("");
      setSigFileUrl(null);
      setActiveTool("select");
    }
  };

  const handleSigFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setSigFileUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  // ─────────────────────────────────────────────────────────
  // EXPORT / COMPILATION ENGINE (pdf-lib)
  // ─────────────────────────────────────────────────────────
  const handleExportPdf = async () => {
    if (!file || pagesOrder.length === 0) return;
    setProcessingStatus("saving");
    setStatusMessage("Re-assembling page coordinates...");

    try {
      const srcArrayBuffer = await file.arrayBuffer();
      
      // Load source PDF
      const srcDoc = await PDFDocument.load(srcArrayBuffer, { ignoreEncryption: true });
      const newDoc = await PDFDocument.create();

      // Helper: Convert hex colors to RGB arrays (0 to 1)
      const hexToRgbColor = (hexStr: string) => {
        if (!hexStr || hexStr === "transparent") return undefined;
        const cleanHex = hexStr.replace("#", "");
        if (cleanHex.length !== 6) return rgb(0, 0, 0);
        const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
        const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
        const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
        return rgb(r, g, b);
      };

      // Helper: Get PDF point in unrotated coordinates
      const getPdfPoint = (sx: number, sy: number, pageRotation: number, pageW: number, pageH: number) => {
        const u = sx / 100;
        const v = sy / 100;
        const rot = (pageRotation % 360 + 360) % 360;
        if (rot === 90) {
          return { x: v * pageW, y: u * pageH };
        } else if (rot === 180) {
          return { x: (1 - u) * pageW, y: v * pageH };
        } else if (rot === 270) {
          return { x: (1 - v) * pageW, y: (1 - u) * pageH };
        } else {
          return { x: u * pageW, y: (1 - v) * pageH };
        }
      };

      // Helper: Get PDF bounding box coordinates mapped to unrotated page coordinate space
      const getPdfCoords = (obj: EditorObject, pageRotation: number, pageW: number, pageH: number) => {
        const u = obj.x / 100;
        const v = obj.y / 100;
        const uw = obj.width / 100;
        const vh = obj.height / 100;
        const rot = (pageRotation % 360 + 360) % 360;

        if (rot === 90) {
          return {
            x: v * pageW,
            y: u * pageH,
            width: vh * pageW,
            height: uw * pageH
          };
        } else if (rot === 180) {
          return {
            x: (1 - u - uw) * pageW,
            y: v * pageH,
            width: uw * pageW,
            height: vh * pageH
          };
        } else if (rot === 270) {
          return {
            x: (1 - v - vh) * pageW,
            y: (1 - u - uw) * pageH,
            width: vh * pageW,
            height: uw * pageH
          };
        } else {
          return {
            x: u * pageW,
            y: (1 - v - vh) * pageH,
            width: uw * pageW,
            height: vh * pageH
          };
        }
      };

      // Helper: Rotate a point around a center (cx, cy) in PDF coordinate system
      const rotatePt = (px: number, py: number, cx: number, cy: number, angleDegrees: number) => {
        const rad = angleDegrees * Math.PI / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const dx = px - cx;
        const dy = py - cy;
        return {
          x: cx + dx * cos - dy * sin,
          y: cy + dx * sin + dy * cos
        };
      };

      // Helper: Parse SVG path string (simple M / L commands)
      const parseSvgPath = (pathStr: string) => {
        const commands = pathStr.split(/(?=[ML])/);
        const points: { cmd: string; x: number; y: number }[] = [];
        for (const cmd of commands) {
          const parts = cmd.trim().split(/\s+/);
          if (parts.length >= 3) {
            points.push({
              cmd: parts[0],
              x: parseFloat(parts[1]),
              y: parseFloat(parts[2])
            });
          }
        }
        return points;
      };

      // 1) Copy configured pages in target order and apply rotations
      for (let i = 0; i < pagesOrder.length; i++) {
        const pageConfig = pagesOrder[i];
        
        setStatusMessage(`Compiling page ${i + 1}/${pagesOrder.length}...`);
        
        // Copy original page
        const [copiedPage] = await newDoc.copyPages(srcDoc, [pageConfig.originalIndex]);
        const newPage = newDoc.addPage(copiedPage);

        // Apply rotation
        const currentRotation = newPage.getRotation().angle;
        newPage.setRotation(degrees((currentRotation + pageConfig.rotation) % 360));

        // Get actual dimensions
        const { width, height } = newPage.getSize();

        // 2) First apply white redaction blocks to hide original text
        const pageObjs = objects.filter(o => o.pageIndex === i);
        for (const obj of pageObjs) {
          if (obj.redact) {
            newPage.drawRectangle({
              x: obj.redact.x - 1,
              y: obj.redact.y - 1.5,
              width: obj.redact.w + 2,
              height: obj.redact.h + 3,
              color: rgb(1, 1, 1),
              opacity: 1
            });
          }
        }

        // 3) Render overlay objects (Text, Shapes, Drawings, Images, Signatures)
        for (const obj of pageObjs) {
          const coords = getPdfCoords(obj, pageConfig.rotation, width, height);
          const pdf_rotation = (obj.rotation || 0) - pageConfig.rotation;
          
          // Compute bounding box center for rotation alignments
          const cx = coords.x + coords.width / 2;
          const cy = coords.y + coords.height / 2;

          if (obj.type === "text" && obj.text) {
            const font = await newDoc.embedFont(StandardFonts.Helvetica);
            
            // For center rotated text positioning
            const rad = pdf_rotation * Math.PI / 180;
            const halfW = coords.width / 2;
            const halfH = coords.height / 2;
            const textYOffset = obj.fontSize || 16;
            
            const new_x = cx - (halfW * Math.cos(rad) - (halfH - textYOffset) * Math.sin(rad));
            const new_y = cy - (halfW * Math.sin(rad) + (halfH - textYOffset) * Math.cos(rad));

            newPage.drawText(obj.text, {
              x: pdf_rotation !== 0 ? new_x : coords.x,
              y: pdf_rotation !== 0 ? new_y : coords.y + coords.height - textYOffset,
              size: obj.fontSize || 16,
              color: hexToRgbColor(obj.color || "#000000"),
              font: font,
              rotate: degrees(pdf_rotation % 360)
            });
          } 
          else if (obj.type === "rect") {
            const rad = pdf_rotation * Math.PI / 180;
            const halfW = coords.width / 2;
            const halfH = coords.height / 2;
            const new_x = cx - (halfW * Math.cos(rad) - halfH * Math.sin(rad));
            const new_y = cy - (halfW * Math.sin(rad) + halfH * Math.cos(rad));

            newPage.drawRectangle({
              x: pdf_rotation !== 0 ? new_x : coords.x,
              y: pdf_rotation !== 0 ? new_y : coords.y,
              width: coords.width,
              height: coords.height,
              color: obj.fillColor && obj.fillColor !== "transparent" ? hexToRgbColor(obj.fillColor) : undefined,
              borderColor: obj.strokeColor ? hexToRgbColor(obj.strokeColor) : undefined,
              borderWidth: obj.strokeWidth || 1,
              opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100,
              rotate: degrees(pdf_rotation % 360)
            });
          } 
          else if (obj.type === "circle") {
            newPage.drawEllipse({
              x: cx,
              y: cy,
              xScale: coords.width / 2,
              yScale: coords.height / 2,
              color: obj.fillColor && obj.fillColor !== "transparent" ? hexToRgbColor(obj.fillColor) : undefined,
              borderColor: obj.strokeColor ? hexToRgbColor(obj.strokeColor) : undefined,
              borderWidth: obj.strokeWidth || 1,
              opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100,
              rotate: degrees(pdf_rotation % 360)
            });
          }
          else if (obj.type === "line") {
            const rad = pdf_rotation * Math.PI / 180;
            const halfW = coords.width / 2;
            
            const startPt = {
              x: cx - halfW * Math.cos(rad),
              y: cy - halfW * Math.sin(rad)
            };
            const endPt = {
              x: cx + halfW * Math.cos(rad),
              y: cy + halfW * Math.sin(rad)
            };

            newPage.drawLine({
              start: startPt,
              end: endPt,
              color: hexToRgbColor(obj.strokeColor || "#000000"),
              thickness: obj.strokeWidth || 2,
              opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100
            });
          }
          else if (obj.type === "arrow") {
            const rad = pdf_rotation * Math.PI / 180;
            const halfW = coords.width / 2;
            
            const startPt = {
              x: cx - halfW * Math.cos(rad),
              y: cy - halfW * Math.sin(rad)
            };
            const endPt = {
              x: cx + halfW * Math.cos(rad),
              y: cy + halfW * Math.sin(rad)
            };

            // Draw line segment
            newPage.drawLine({
              start: startPt,
              end: endPt,
              color: hexToRgbColor(obj.strokeColor || "#000000"),
              thickness: obj.strokeWidth || 2,
              opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100
            });

            // Draw arrowhead triangle
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            const L_arrow = Math.max(8, (obj.strokeWidth || 2) * 3);
            const W_arrow = L_arrow / 2;

            const x_left = endPt.x - L_arrow * cos - W_arrow * sin;
            const y_left = endPt.y - L_arrow * sin + W_arrow * cos;
            const x_right = endPt.x - L_arrow * cos + W_arrow * sin;
            const y_right = endPt.y - L_arrow * sin - W_arrow * cos;

            const arrowPath = `M ${endPt.x.toFixed(1)} ${endPt.y.toFixed(1)} L ${x_left.toFixed(1)} ${y_left.toFixed(1)} L ${x_right.toFixed(1)} ${y_right.toFixed(1)} Z`;
            
            newPage.drawSvgPath(arrowPath, {
              color: hexToRgbColor(obj.strokeColor || "#000000"),
              opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100
            });
          }
          else if (obj.type === "checkmark") {
            const ptA = rotatePt(coords.x + 0.2 * coords.width, coords.y + 0.5 * coords.height, cx, cy, pdf_rotation);
            const ptB = rotatePt(coords.x + 0.4 * coords.width, coords.y + 0.3 * coords.height, cx, cy, pdf_rotation);
            const ptC = rotatePt(coords.x + 0.8 * coords.width, coords.y + 0.7 * coords.height, cx, cy, pdf_rotation);

            const color_val = hexToRgbColor(obj.strokeColor || "#22c55e") || rgb(0.13, 0.77, 0.36);

            newPage.drawLine({
              start: ptA,
              end: ptB,
              color: color_val,
              thickness: obj.strokeWidth || 4,
              opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100
            });
            newPage.drawLine({
              start: ptB,
              end: ptC,
              color: color_val,
              thickness: obj.strokeWidth || 4,
              opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100
            });
          }
          else if (obj.type === "crossmark") {
            const pt1S = rotatePt(coords.x + 0.3 * coords.width, coords.y + 0.7 * coords.height, cx, cy, pdf_rotation);
            const pt1E = rotatePt(coords.x + 0.7 * coords.width, coords.y + 0.3 * coords.height, cx, cy, pdf_rotation);
            const pt2S = rotatePt(coords.x + 0.3 * coords.width, coords.y + 0.3 * coords.height, cx, cy, pdf_rotation);
            const pt2E = rotatePt(coords.x + 0.7 * coords.width, coords.y + 0.7 * coords.height, cx, cy, pdf_rotation);

            const color_val = hexToRgbColor(obj.strokeColor || "#ef4444") || rgb(0.93, 0.26, 0.26);

            newPage.drawLine({
              start: pt1S,
              end: pt1E,
              color: color_val,
              thickness: obj.strokeWidth || 4,
              opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100
            });
            newPage.drawLine({
              start: pt2S,
              end: pt2E,
              color: color_val,
              thickness: obj.strokeWidth || 4,
              opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100
            });
          }
          else if (obj.type === "drawing" && obj.svgPath) {
            const points = parseSvgPath(obj.svgPath);
            let prevPt: { x: number; y: number } | null = null;
            for (const pt of points) {
              const pdfPt = getPdfPoint(pt.x, pt.y, pageConfig.rotation, width, height);
              if (pt.cmd === "M") {
                prevPt = pdfPt;
              } else if (pt.cmd === "L" && prevPt) {
                newPage.drawLine({
                  start: prevPt,
                  end: pdfPt,
                  color: hexToRgbColor(obj.strokeColor || "#000000") || rgb(0, 0, 0),
                  thickness: obj.strokeWidth || 2,
                  opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100
                });
                prevPt = pdfPt;
              }
            }
          }
          else if ((obj.type === "image" || obj.type === "signature") && obj.imageSrc) {
            try {
              // Convert data url back to binary bytes
              const base64Data = obj.imageSrc.split(",")[1];
              const binaryString = window.atob(base64Data);
              const bytes = new Uint8Array(binaryString.length);
              for (let k = 0; k < binaryString.length; k++) {
                bytes[k] = binaryString.charCodeAt(k);
              }

              // Embed and draw image (default png format check)
              const embeddedImage = obj.imageSrc.includes("image/jpeg") 
                ? await newDoc.embedJpg(bytes)
                : await newDoc.embedPng(bytes);

              const rad = pdf_rotation * Math.PI / 180;
              const halfW = coords.width / 2;
              const halfH = coords.height / 2;
              const new_x = cx - (halfW * Math.cos(rad) - halfH * Math.sin(rad));
              const new_y = cy - (halfW * Math.sin(rad) + halfH * Math.cos(rad));

              newPage.drawImage(embeddedImage, {
                x: pdf_rotation !== 0 ? new_x : coords.x,
                y: pdf_rotation !== 0 ? new_y : coords.y,
                width: coords.width,
                height: coords.height,
                opacity: (obj.opacity !== undefined ? obj.opacity : 100) / 100,
                rotate: degrees(pdf_rotation % 360)
              });
            } catch (imageErr) {
              console.error("Failed to embed object image layer during PDF compile:", imageErr);
            }
          }
        }
      }

      setStatusMessage("Saving final binary stream...");
      const finalPdfBytes = await newDoc.save({ useObjectStreams: true });
      
      const blob = new Blob([finalPdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName.replace(/\.[^/.]+$/, "")}_edited.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setProcessingStatus("success");
      setStatusMessage("PDF edited and saved successfully!");
      
      setTimeout(() => setProcessingStatus("idle"), 3000);
    } catch (e: any) {
      console.error("PDF Export compilation failed:", e);
      setProcessingStatus("error");
      setStatusMessage(e.message || "Failed to compile modifications into final PDF.");
    }
  };

  const resetEditor = () => {
    if (confirm("Are you sure you want to discard your edits and close the file?")) {
      setFile(null);
      setFileName("");
      setObjects([]);
      setPagesOrder([]);
      setHistoryStack([]);
      setHistoryIndex(-1);
      setSelectedObjectId(null);
      localStorage.removeItem("edit_pdf_draft_objects");
      localStorage.removeItem("edit_pdf_draft_pages");
    }
  };

  // Active object selection checks
  const activeObj = objects.find(o => o.id === selectedObjectId);

  return (
    <div className="w-full flex flex-col gap-6 relative">
      
      {/* Top Secure Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#518231]/5 border border-[#518231]/20 dark:border-[#518231]/10 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white text-sm">Privacy Guaranteed</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Files process entirely in your browser memory. Files never leave your device.</p>
          </div>
        </div>
        {file && (
          <button 
            onClick={resetEditor}
            className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/30 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw size={14} /> Close Editor
          </button>
        )}
      </div>

      {/* Global Drag Overlay */}
      {globalDragActive && (
        <div className="fixed inset-0 z-50 bg-indigo-900/30 dark:bg-slate-950/70 backdrop-blur-sm border-4 border-dashed border-[#518231] flex flex-col items-center justify-center pointer-events-none animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center border border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center animate-bounce">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Drop PDF to Edit</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Release to start loading editor workspace.</p>
          </div>
        </div>
      )}

      {processingStatus === "loading" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center gap-4 shadow-sm">
          <Loader2 size={40} className="text-[#518231] animate-spin" />
          <p className="text-sm text-slate-700 dark:text-slate-350 font-semibold">{statusMessage}</p>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          UPLOAD VIEW
          ───────────────────────────────────────────────────────── */}
      {!file && processingStatus !== "loading" && (
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerUploadClick}
          className={`border-3 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
            dragActive 
              ? 'border-[#518231] bg-[#518231]/5 dark:bg-[#518231]/10' 
              : 'border-slate-300 hover:border-[#518231] bg-slate-50 hover:bg-[#518231]/5 dark:bg-slate-900/50 dark:hover:bg-slate-900'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileInput} 
            accept=".pdf" 
            className="hidden" 
          />
          <div className="w-16 h-16 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center mb-2">
            <Upload size={28} />
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">Drag & Drop PDF Here</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">Or click to browse files from your device. Secure client-side loading sandbox.</p>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          EDITOR DASHBOARD WORKSPACE
          ───────────────────────────────────────────────────────── */}
      {file && processingStatus !== "loading" && (
        <div className="w-full flex flex-col border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-lg animate-in fade-in duration-300">
          
          {/* A. WORKSPACE TOP TOOLBAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3">
            
            {/* Toolbar Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button 
                onClick={() => setActiveTool("select")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "select" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Select & Move Objects"
              >
                <Move size={14} /> <span className="hidden sm:inline">Select</span>
              </button>

              <button 
                onClick={() => setActiveTool("edit-text")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "edit-text" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Edit Existing PDF Text"
              >
                <FileText size={14} /> <span className="hidden sm:inline">Edit Text</span>
              </button>

              <button 
                onClick={() => setActiveTool("eraser")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "eraser" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Erase Placed Elements"
              >
                <Eraser size={14} /> <span className="hidden sm:inline">Eraser</span>
              </button>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

              <button 
                onClick={() => setActiveTool("text")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "text" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Add New Text Box"
              >
                <Type size={14} /> <span className="hidden sm:inline">Add Text</span>
              </button>

              <button 
                onClick={() => setActiveTool("pencil")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "pencil" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Pencil Drawing"
              >
                <Edit3 size={14} /> <span className="hidden sm:inline">Pencil</span>
              </button>
              
              <button 
                onClick={() => setActiveTool("marker")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "marker" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Marker Highlighter"
              >
                <Highlighter size={14} /> <span className="hidden sm:inline">Highlight</span>
              </button>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

              {/* Shapes */}
              <button 
                onClick={() => setActiveTool("rect")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "rect" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Add Rectangle"
              >
                <Square size={14} /> <span className="hidden sm:inline">Rect</span>
              </button>
              <button 
                onClick={() => setActiveTool("circle")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "circle" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Add Circle"
              >
                <Circle size={14} /> <span className="hidden sm:inline">Circle</span>
              </button>
              <button 
                onClick={() => setActiveTool("line")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "line" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Add Line"
              >
                <Minus size={14} /> <span className="hidden sm:inline">Line</span>
              </button>
              <button 
                onClick={() => setActiveTool("arrow")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "arrow" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Add Arrow"
              >
                <ArrowUpRight size={14} /> <span className="hidden sm:inline">Arrow</span>
              </button>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

              {/* Stamps */}
              <button 
                onClick={() => setActiveTool("checkmark")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "checkmark" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-400"
                }`}
                title="Add Checkmark Stamp"
              >
                <Check size={14} /> <span className="hidden sm:inline">Check ✔</span>
              </button>
              <button 
                onClick={() => setActiveTool("crossmark")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "crossmark" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-red-600 dark:text-red-400"
                }`}
                title="Add Crossmark Stamp"
              >
                <X size={14} /> <span className="hidden sm:inline">Cross ✖</span>
              </button>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

              {/* Advanced insertions */}
              <button 
                onClick={triggerImageUpload}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-semibold transition-all"
                title="Insert Image"
              >
                <input 
                  type="file" 
                  ref={imageInputRef} 
                  onChange={handleImageSelect} 
                  accept="image/*" 
                  className="hidden" 
                />
                <ImageIcon size={14} /> <span className="hidden sm:inline">Image</span>
              </button>
              
              <button 
                onClick={() => setShowSigModal(true)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-semibold transition-all"
                title="Sign Document"
              >
                <SignatureIcon size={14} /> <span className="hidden sm:inline">Sign</span>
              </button>
              
              <button 
                onClick={() => setActiveTool("sticky")}
                className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  activeTool === "sticky" 
                    ? "bg-[#518231] text-white" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                title="Drop Sticky Note Comment"
              >
                <MessageSquare size={14} /> <span className="hidden sm:inline">Note</span>
              </button>
            </div>

            {/* Undo/Redo & Save Action */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handleUndo} 
                disabled={historyIndex <= 0}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 size={16} />
              </button>
              <button 
                onClick={handleRedo} 
                disabled={historyIndex >= historyStack.length - 1}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="Redo (Ctrl+Y)"
              >
                <Redo2 size={16} />
              </button>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

              <button 
                onClick={handleExportPdf}
                disabled={processingStatus === "saving"}
                className="px-4 py-2 bg-[#518231] hover:bg-[#416827] text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
              >
                {processingStatus === "saving" ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Download size={14} /> Export PDF
                  </>
                )}
              </button>
            </div>

          </div>

          {/* B. MIDDLE WORKSPACE VIEWPORTS (SIDEBAR + MAIN CANVAS + SETTINGS) */}
          <div className="flex flex-col lg:flex-row min-h-[600px] relative">
            
            {/* 1. LEFT SIDEBAR PANEL */}
            <div className="w-full lg:w-64 bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
              
              {/* Sidebar Tabs */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 text-center">
                <button 
                  onClick={() => setSidebarTab("thumbnails")}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 ${
                    sidebarTab === "thumbnails" 
                      ? "border-[#518231] text-[#518231]" 
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800"
                  }`}
                >
                  Pages
                </button>
                <button 
                  onClick={() => setSidebarTab("layers")}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 ${
                    sidebarTab === "layers" 
                      ? "border-[#518231] text-[#518231]" 
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800"
                  }`}
                >
                  Layers
                </button>
                <button 
                  onClick={() => setSidebarTab("search")}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 ${
                    sidebarTab === "search" 
                      ? "border-[#518231] text-[#518231]" 
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800"
                  }`}
                >
                  Search
                </button>
                <button 
                  onClick={() => setSidebarTab("help")}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 ${
                    sidebarTab === "help" 
                      ? "border-[#518231] text-[#518231]" 
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800"
                  }`}
                >
                  Help
                </button>
              </div>

              {/* Sidebar Tab Contents */}
              <div className="flex-1 p-3 overflow-y-auto max-h-[300px] lg:max-h-[550px] custom-scrollbar">
                
                {/* TAB A: Page Thumbnails */}
                {sidebarTab === "thumbnails" && (
                  <div className="space-y-4">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Drag pages to rearrange</p>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                      {pagesOrder.map((page, idx) => {
                        const isActive = idx === activePageIndex;
                        return (
                          <div 
                            key={page.id}
                            draggable
                            onDragStart={() => handlePageDragStart(idx)}
                            onDragOver={(e) => handlePageDragOver(e, idx)}
                            onDragEnd={handlePageDragEnd}
                            onClick={() => setActivePageIndex(idx)}
                            className={`p-2 rounded-xl border flex flex-col gap-2 cursor-pointer transition-all ${
                              isActive 
                                ? "border-[#518231] bg-[#518231]/5 shadow-sm" 
                                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                              <span>Page {idx + 1}</span>
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); rotatePageAction(idx); }}
                                  className="p-1 hover:text-[#518231] rounded"
                                  title="Rotate Page"
                                >
                                  <RotateCw size={12} />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); duplicatePageAction(idx); }}
                                  className="p-1 hover:text-blue-500 rounded"
                                  title="Duplicate Page"
                                >
                                  <Copy size={12} />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); deletePageAction(idx); }}
                                  className="p-1 hover:text-red-500 rounded"
                                  title="Delete Page"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                            <div className="h-28 bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-semibold text-slate-400 rounded-lg shadow-3xs overflow-hidden relative">
                              <span className="z-10">Render Page {page.originalIndex + 1}</span>
                              {page.rotation > 0 && (
                                <span className="absolute bottom-1 right-1 text-[9px] bg-slate-800 text-white px-1.5 py-0.5 rounded">
                                  {page.rotation}°
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB B: Objects Layer List */}
                {sidebarTab === "layers" && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-3">Elements on current page</p>
                    {objects.filter(o => o.pageIndex === activePageIndex).length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">No added elements on this page.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {objects.filter(o => o.pageIndex === activePageIndex).map((obj) => {
                          const isSel = obj.id === selectedObjectId;
                          return (
                            <div 
                              key={obj.id}
                              onClick={() => setSelectedObjectId(obj.id)}
                              className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                                isSel 
                                  ? "border-[#518231] bg-[#518231]/5 text-slate-800 dark:text-white" 
                                  : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400"
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate pr-2">
                                {obj.type === "text" && <Type size={12} className="text-blue-500 shrink-0" />}
                                {obj.type === "rect" && <Square size={12} className="text-amber-500 shrink-0" />}
                                {obj.type === "circle" && <Circle size={12} className="text-emerald-500 shrink-0" />}
                                {obj.type === "drawing" && <Edit3 size={12} className="text-indigo-500 shrink-0" />}
                                {obj.type === "signature" && <SignatureIcon size={12} className="text-teal-500 shrink-0" />}
                                {obj.type === "sticky" && <MessageSquare size={12} className="text-yellow-500 shrink-0" />}
                                <span className="truncate">
                                  {obj.type === "text" ? obj.text : `${obj.type.toUpperCase()} Layer`}
                                </span>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const filtered = objects.filter(o => o.id !== obj.id);
                                  setObjects(filtered);
                                  if (selectedObjectId === obj.id) setSelectedObjectId(null);
                                  saveHistoryState(filtered, pagesOrder);
                                }}
                                className="p-1 text-slate-400 hover:text-red-500"
                                title="Remove Layer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB C: Page Content Search */}
                {sidebarTab === "search" && (
                  <div className="space-y-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Search Document Text</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter keyword..."
                        className="flex-1 px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-slate-800 dark:text-white"
                        onKeyDown={(e) => { if (e.key === "Enter") runSearch(); }}
                      />
                      <button 
                        onClick={runSearch}
                        className="p-1.5 bg-[#518231] text-white rounded-lg hover:bg-[#416827]"
                      >
                        <Search size={14} />
                      </button>
                    </div>
                    {searchResults.length > 0 ? (
                      <div className="space-y-2 pt-2">
                        {searchResults.map((res, i) => (
                          <div 
                            key={i}
                            onClick={() => setActivePageIndex(res.pageIndex)}
                            className="p-2 border border-slate-150 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 cursor-pointer text-[11px]"
                          >
                            <span className="font-bold text-[#518231] block mb-0.5">Page {res.pageIndex + 1}</span>
                            <span className="text-slate-500 dark:text-slate-400 line-clamp-2">{res.text}</span>
                          </div>
                        ))}
                      </div>
                    ) : searchQuery.trim() && (
                      <p className="text-xs text-slate-400 text-center py-4">No matching results found.</p>
                    )}
                  </div>
                )}

                {/* TAB D: Help Instructions */}
                {sidebarTab === "help" && (
                  <div className="text-xs text-slate-600 dark:text-slate-400 space-y-3">
                    <h5 className="font-bold text-slate-800 dark:text-white text-sm">Keyboard Shortcuts</h5>
                    <ul className="space-y-1.5 list-disc pl-4">
                      <li><strong>Ctrl + Z</strong>: Undo</li>
                      <li><strong>Ctrl + Y</strong>: Redo</li>
                      <li><strong>Ctrl + S</strong>: Export PDF</li>
                      <li><strong>Delete</strong>: Remove selected</li>
                      <li><strong>Ctrl + C</strong>: Copy</li>
                      <li><strong>Ctrl + V</strong>: Paste</li>
                    </ul>
                    <hr className="border-slate-100 dark:border-slate-850" />
                    <h5 className="font-bold text-slate-800 dark:text-white text-sm">Tools Guide</h5>
                    <p>Click a tool (Text, Square, Circle) to place elements. Select objects to move, resize, rotate, or edit properties in the right settings panel.</p>
                  </div>
                )}

              </div>

              {/* Sidebar Footer Details */}
              <div className="border-t border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/60 text-[10px] text-slate-400 space-y-0.5">
                <p>File: <strong className="text-slate-600 dark:text-slate-300">{fileName}</strong></p>
                <p>Pages: <strong>{pageCount}</strong> • Size: <strong>{(fileSize / (1024 * 1024)).toFixed(2)} MB</strong></p>
                <p>PDF Version: <strong>{pdfVersion}</strong></p>
              </div>

            </div>

            {/* 2. CENTRAL INTERACTIVE PAGE CANVAS WORKSPACE */}
            <div 
              ref={pageContainerRef}
              className="flex-1 bg-slate-200 dark:bg-slate-950 p-6 flex flex-col items-center gap-6 overflow-y-auto max-h-[650px] custom-scrollbar relative"
            >
              
              {/* Floating Zoom Bar */}
              <div className="absolute top-3 right-3 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5">
                <button 
                  onClick={() => { setZoomMode("custom"); setZoom(z => Math.max(0.5, z - 0.1)); }}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-450"
                  title="Zoom Out"
                >
                  <Minus size={14} />
                </button>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button 
                  onClick={() => { setZoomMode("custom"); setZoom(z => Math.min(2.0, z + 0.1)); }}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-450"
                  title="Zoom In"
                >
                  <Plus size={14} />
                </button>
                
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-0.5"></div>

                <button 
                  onClick={() => setZoomMode(zoomMode === "fitWidth" ? "fitPage" : "fitWidth")}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-all ${
                    zoomMode !== "custom" 
                      ? "bg-[#518231]/10 text-[#518231]" 
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {zoomMode === "fitWidth" ? "Fit Page" : "Fit Width"}
                </button>
              </div>

              {/* PDF rendered page canvas card */}
              <div 
                id={`overlay-page-${activePageIndex}`}
                onMouseDown={handlePageMouseDown}
                onMouseMove={handlePageMouseMove}
                onMouseUp={handlePageMouseUp}
                onClick={handlePageOverlayClick}
                className="relative bg-white dark:bg-slate-900 shadow-xl border border-slate-250 dark:border-slate-850 rounded-xs select-none max-w-full overflow-hidden transition-all duration-150"
                style={{ 
                  width: activeCanvasRef.current ? activeCanvasRef.current.width : "600px",
                  height: activeCanvasRef.current ? activeCanvasRef.current.height : "800px"
                }}
              >
                {/* PDFJS render canvas */}
                <canvas 
                  ref={activeCanvasRef} 
                  className="absolute top-0 left-0 w-full h-full z-0" 
                />

                {/* SVG & HTML Interactive Drawing Overlay Layer */}
                <div 
                  className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto"
                >
                  {/* Render freehand pencil points path currently drawing */}
                  {isDrawing && drawingPathStr && (
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      <path 
                        d={drawingPathStr}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={activeTool === "marker" ? strokeWidth * 2.5 : strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={activeTool === "marker" ? 0.4 : opacity / 100}
                      />
                    </svg>
                  )}

                  {/* Render saved objects */}
                  {objects.filter(o => o.pageIndex === activePageIndex).map((obj) => {
                    const isSelected = obj.id === selectedObjectId;
                    
                    return (
                      <div 
                        key={obj.id}
                        onMouseDown={(e) => handleObjectDragStart(e, obj.id)}
                        className={`absolute cursor-move select-none ${
                          isSelected 
                            ? "ring-2 ring-[#518231] z-20" 
                            : activeTool === "eraser" 
                              ? "hover:ring-2 hover:ring-red-500 z-20 cursor-cell" 
                              : "z-10 hover:ring-1 hover:ring-slate-350"
                        }`}
                        style={{
                          left: `${obj.x}%`,
                          top: `${obj.y}%`,
                          width: `${obj.width}%`,
                          height: `${obj.height}%`,
                          transform: obj.rotation ? `rotate(${obj.rotation}deg)` : undefined,
                          opacity: obj.opacity !== undefined ? obj.opacity / 100 : 1
                        }}
                      >
                        {/* Text Layer */}
                        {obj.type === "text" && (
                          <textarea
                            value={obj.text}
                            onChange={(e) => updateSelectedObjectText(e.target.value)}
                            onBlur={() => saveHistoryState(objects, pagesOrder)}
                            className={`w-full h-full border-none outline-none resize-none overflow-hidden custom-scrollbar font-medium pointer-events-auto ${obj.redact ? "bg-white dark:bg-slate-900 border border-slate-350 dark:border-slate-800 shadow-2xs" : "bg-transparent"}`}
                            style={{
                              fontSize: `${(obj.fontSize || 16) * zoom}px`,
                              fontFamily: obj.fontFamily || "Helvetica",
                              fontWeight: obj.fontWeight || "normal",
                              fontStyle: obj.fontStyle || "normal",
                              color: obj.color || "#000000",
                              textAlign: (obj.textAlign as any) || "left"
                            }}
                          />
                        )}

                        {/* Rectangle Layer */}
                        {obj.type === "rect" && (
                          <div 
                            className="w-full h-full"
                            style={{
                              backgroundColor: obj.fillColor || "transparent",
                              borderColor: obj.strokeColor || "#000000",
                              borderWidth: `${(obj.strokeWidth || 1) * zoom}px`,
                              borderStyle: obj.strokeWidth ? "solid" : "none"
                            }}
                          />
                        )}

                        {/* Circle Layer */}
                        {obj.type === "circle" && (
                          <div 
                            className="w-full h-full rounded-full"
                            style={{
                              backgroundColor: obj.fillColor || "transparent",
                              borderColor: obj.strokeColor || "#000000",
                              borderWidth: `${(obj.strokeWidth || 1) * zoom}px`,
                              borderStyle: obj.strokeWidth ? "solid" : "none"
                            }}
                          />
                        )}

                        {/* Line Layer */}
                        {obj.type === "line" && (
                          <svg className="w-full h-full overflow-visible">
                            <line 
                              x1="0" 
                              y1="50%" 
                              x2="100%" 
                              y2="50%" 
                              stroke={obj.strokeColor || "#000000"} 
                              strokeWidth={(obj.strokeWidth || 3) * zoom} 
                            />
                          </svg>
                        )}

                        {/* Arrow Layer */}
                        {obj.type === "arrow" && (
                          <svg className="w-full h-full overflow-visible">
                            <defs>
                              <marker 
                                id={`arrow-head-${obj.id}`} 
                                markerWidth="6" 
                                markerHeight="6" 
                                refX="6" 
                                refY="3" 
                                orient="auto"
                              >
                                <path d="M0,0 L0,6 L6,3 Z" fill={obj.strokeColor || "#000000"} />
                              </marker>
                            </defs>
                            <line 
                              x1="0" 
                              y1="50%" 
                              x2="100%" 
                              y2="50%" 
                              stroke={obj.strokeColor || "#000000"} 
                              strokeWidth={(obj.strokeWidth || 3) * zoom} 
                              markerEnd={`url(#arrow-head-${obj.id})`}
                            />
                          </svg>
                        )}

                        {/* Checkmark Layer */}
                        {obj.type === "checkmark" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <path 
                              d="M20,50 L40,70 L80,30" 
                              fill="none" 
                              stroke={obj.strokeColor || "#22c55e"} 
                              strokeWidth={(obj.strokeWidth || 6) * zoom} 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                          </svg>
                        )}

                        {/* Crossmark Layer */}
                        {obj.type === "crossmark" && (
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <path 
                              d="M30,30 L70,70 M70,30 L30,70" 
                              fill="none" 
                              stroke={obj.strokeColor || "#ef4444"} 
                              strokeWidth={(obj.strokeWidth || 6) * zoom} 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                          </svg>
                        )}

                        {/* Drawing Pencil Layer */}
                        {obj.type === "drawing" && obj.svgPath && (
                          <svg className="w-full h-full pointer-events-none">
                            <path 
                              d={obj.svgPath}
                              fill="none"
                              stroke={obj.strokeColor || "#000000"}
                              strokeWidth={(obj.strokeWidth || 2) * zoom}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}

                        {/* Image & Signature Layer */}
                        {(obj.type === "image" || obj.type === "signature") && obj.imageSrc && (
                          <img 
                            src={obj.imageSrc} 
                            alt="layer object" 
                            className="w-full h-full object-contain pointer-events-none" 
                          />
                        )}

                        {/* Sticky Notes Layer */}
                        {obj.type === "sticky" && (
                          <div className="w-full h-full bg-yellow-250 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 rounded shadow-3xs flex items-center justify-center relative pointer-events-auto">
                            <MessageSquare size={16} className="text-yellow-600 dark:text-yellow-400" />
                            {isSelected && (
                              <div className="absolute top-full left-0 mt-1 z-30 bg-slate-900 text-white p-2 rounded text-[10px] w-40 shadow-md">
                                <textarea 
                                  value={obj.comment}
                                  onChange={(e) => {
                                    setObjects(prev => prev.map(o => o.id === obj.id ? { ...o, comment: e.target.value } : o));
                                  }}
                                  onBlur={() => saveHistoryState(objects, pagesOrder)}
                                  className="w-full bg-transparent border-none outline-none resize-none h-12"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Resize Handles (Only show when selected) */}
                        {isSelected && obj.type !== "drawing" && obj.type !== "sticky" && (
                          <>
                            <div 
                              onMouseDown={(e) => handleObjectResizeStart(e, obj.id, "nw")}
                              className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#518231] rounded-full border border-white cursor-nwse-resize z-30" 
                            />
                            <div 
                              onMouseDown={(e) => handleObjectResizeStart(e, obj.id, "ne")}
                              className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#518231] rounded-full border border-white cursor-nesw-resize z-30" 
                            />
                            <div 
                              onMouseDown={(e) => handleObjectResizeStart(e, obj.id, "se")}
                              className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#518231] rounded-full border border-white cursor-nwse-resize z-30" 
                            />
                            <div 
                              onMouseDown={(e) => handleObjectResizeStart(e, obj.id, "sw")}
                              className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#518231] rounded-full border border-white cursor-nesw-resize z-30" 
                            />
                            {/* Rotate handle top center */}
                            <div 
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                const startY = e.clientY;
                                const initialRot = obj.rotation || 0;
                                const handleRotate = (rotEvt: MouseEvent) => {
                                  const rot = (initialRot + (rotEvt.clientY - startY)) % 360;
                                  setObjects(prev => prev.map(o => o.id === obj.id ? { ...o, rotation: rot } : o));
                                };
                                const handleRotateEnd = () => {
                                  document.removeEventListener("mousemove", handleRotate);
                                  document.removeEventListener("mouseup", handleRotateEnd);
                                  saveHistoryState(objects, pagesOrder);
                                };
                                document.addEventListener("mousemove", handleRotate);
                                document.addEventListener("mouseup", handleRotateEnd);
                              }}
                              className="absolute -top-6 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-indigo-500 rounded-full border border-white cursor-row-resize z-30 flex items-center justify-center text-[8px] text-white"
                              title="Rotate object"
                            >
                              ⟳
                            </div>
                            {/* Quick delete trash shortcut */}
                            <button
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                const filtered = objects.filter(o => o.id !== obj.id);
                                setObjects(filtered);
                                setSelectedObjectId(null);
                                saveHistoryState(filtered, pagesOrder);
                              }}
                              className="absolute -bottom-7 left-1/2 -translate-x-1/2 p-1 bg-red-600 text-white rounded shadow-sm hover:bg-red-700 z-30 pointer-events-auto"
                              title="Remove Object"
                            >
                              <Trash2 size={10} />
                            </button>
                          </>
                        )}

                      </div>
                    );
                  })}
                </div>
                
                {/* Dotted outlines for editing existing PDF text blocks */}
                {activeTool === "edit-text" && parsedPageText[activePageIndex] && (
                  <div className="absolute inset-0 pointer-events-none z-30">
                    {parsedPageText[activePageIndex]
                      .filter(item => item.str.trim().length > 0)
                      .map((item, idx) => {
                        if (!activeViewport) return null;
                        
                        const transform = item.transform;
                        const tx = transform[4];
                        const ty = transform[5];
                        const fontHeight = Math.abs(transform[0] || transform[3] || 12);
                        
                        const [x1, y1] = activeViewport.convertToViewportPoint(tx, ty);
                        const [x2, y2] = activeViewport.convertToViewportPoint(tx + item.width, ty + fontHeight);
                        
                        const left = Math.min(x1, x2);
                        const top = Math.min(y1, y2);
                        const w = Math.abs(x1 - x2);
                        const h = Math.abs(y1 - y2);

                        const px = (left / activeViewport.width) * 100;
                        const py = (top / activeViewport.height) * 100;
                        const pw = (w / activeViewport.width) * 100;
                        const ph = (h / activeViewport.height) * 100;

                        const isAlreadyConverted = objects.some(
                          o => o.pageIndex === activePageIndex && 
                               o.redact && 
                               Math.abs(o.redact.x - tx) < 1 && 
                               Math.abs(o.redact.y - ty) < 1
                        );

                        if (isAlreadyConverted) return null;

                        return (
                          <div 
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              
                              const id = `obj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                              const newObj: EditorObject = {
                                id,
                                pageIndex: activePageIndex,
                                type: "text",
                                x: px,
                                y: py,
                                width: pw + 2,
                                height: ph + 1.2,
                                text: item.str,
                                fontSize: fontHeight,
                                fontFamily: "Helvetica",
                                color: "#000000",
                                redact: { x: tx, y: ty, w: item.width, h: fontHeight }
                              };
                              
                              const nextObjs = [...objects, newObj];
                              setObjects(nextObjs);
                              setSelectedObjectId(id);
                              saveHistoryState(nextObjs, pagesOrder);
                              setActiveTool("select");
                            }}
                            className="absolute border border-dashed border-indigo-500 hover:border-indigo-600 bg-indigo-500/5 hover:bg-indigo-500/20 rounded cursor-text pointer-events-auto"
                            style={{
                              left: `${px}%`,
                              top: `${py}%`,
                              width: `${pw}%`,
                              height: `${ph}%`
                            }}
                            title="Click to edit this text"
                          />
                        );
                      })}
                  </div>
                )}

              </div>

              {/* Bottom Page Navigation Bar */}
              {pagesOrder.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-xs flex items-center justify-between gap-6 z-20 shrink-0">
                  <button 
                    onClick={() => setActivePageIndex(prev => Math.max(0, prev - 1))}
                    disabled={activePageIndex === 0}
                    className="px-3 py-1.5 rounded-lg border border-[#518231]/25 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-slate-700 dark:text-slate-350 transition-all flex items-center gap-1"
                  >
                    &larr; Prev
                  </button>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    Page {activePageIndex + 1} of {pagesOrder.length}
                  </span>
                  <button 
                    onClick={() => setActivePageIndex(prev => Math.min(pagesOrder.length - 1, prev + 1))}
                    disabled={activePageIndex === pagesOrder.length - 1}
                    className="px-3 py-1.5 rounded-lg border border-[#518231]/25 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-slate-700 dark:text-slate-350 transition-all flex items-center gap-1"
                  >
                    Next &rarr;
                  </button>
                </div>
              )}

              {/* Status Message Panel */}
              {statusMessage && processingStatus !== "idle" && (
                <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md animate-bounce flex items-center gap-1.5">
                  <Loader2 size={12} className="animate-spin" /> {statusMessage}
                </div>
              )}

            </div>

            {/* 3. RIGHT SETTINGS & CONTEXT EDITOR OPTIONS PANEL */}
            <div className="w-full lg:w-64 bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-4 shrink-0">
              
              <h4 className="font-bold text-slate-850 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                <Sliders size={14} className="text-[#518231]" /> Properties
              </h4>

              {/* Context options depending on selection */}
              {!activeObj ? (
                <div className="text-xs text-slate-400 space-y-3">
                  <p>No element selected.</p>
                  <p className="text-[11px] text-slate-450 italic">Click an object on the page canvas to configure font weights, stroke sizes, colors, and opacity layers.</p>
                  
                  <hr className="border-slate-100 dark:border-slate-800" />
                  
                  {/* Default tools config */}
                  <div className="space-y-3.5">
                    <h5 className="font-bold text-slate-700 dark:text-slate-300">Tool Options</h5>
                    <div className="space-y-2.5">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Color Palette</label>
                        <div className="flex flex-wrap gap-1.5">
                          {["#000000", "#518231", "#1d4ed8", "#b91c1c", "#d97706"].map(c => (
                            <button 
                              key={c}
                              onClick={() => { setStrokeColor(c); setColor(c); }}
                              className="w-5 h-5 rounded-full border border-white ring-1 ring-slate-300 transition-all scale-100 hover:scale-110"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {activeTool === "rect" || activeTool === "circle" ? (
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Fill Color</label>
                          <div className="flex flex-wrap gap-1.5">
                            {["#ffffff", "#e2f0d9", "#dbeafe", "#fee2e2", "#fef3c7"].map(c => (
                              <button 
                                key={c}
                                onClick={() => setFillColor(c)}
                                className="w-5 h-5 rounded-full border border-white ring-1 ring-slate-300 transition-all"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-[#518231]">
                    Selected: {activeObj.type.toUpperCase()} object
                  </div>

                  {/* 1. TEXT PROPERTIES */}
                  {activeObj.type === "text" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Font Family</label>
                        <select 
                          value={activeObj.fontFamily || "Helvetica"}
                          onChange={(e) => {
                            setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, fontFamily: e.target.value } : o));
                            saveHistoryState(objects, pagesOrder);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300"
                        >
                          <option value="Helvetica">Helvetica</option>
                          <option value="Times New Roman">Times Roman</option>
                          <option value="Courier">Courier</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Font Size ({activeObj.fontSize || 16}px)</label>
                        <input 
                          type="range" 
                          min="8" 
                          max="72"
                          value={activeObj.fontSize || 16}
                          onChange={(e) => {
                            setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, fontSize: parseInt(e.target.value) } : o));
                          }}
                          onMouseUp={() => saveHistoryState(objects, pagesOrder)}
                          className="w-full accent-[#518231]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Text Color</label>
                        <div className="flex flex-wrap gap-1.5">
                          {["#000000", "#518231", "#1d4ed8", "#b91c1c", "#d97706", "#ffffff"].map(c => (
                            <button 
                              key={c}
                              onClick={() => {
                                setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, color: c } : o));
                                saveHistoryState(objects, pagesOrder);
                              }}
                              className={`w-5 h-5 rounded-full border border-white ring-1 ring-slate-300 transition-all ${activeObj.color === c ? "scale-110 ring-[#518231]" : ""}`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Formatting</label>
                        <div className="flex gap-1.5">
                          <button 
                            onClick={() => {
                              const weight = activeObj.fontWeight === "bold" ? "normal" : "bold";
                              setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, fontWeight: weight } : o));
                              saveHistoryState(objects, pagesOrder);
                            }}
                            className={`flex-1 py-1 rounded-lg border text-xs font-bold transition-all ${
                              activeObj.fontWeight === "bold" 
                                ? "bg-[#518231] text-white border-transparent" 
                                : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                            }`}
                          >
                            B
                          </button>
                          <button 
                            onClick={() => {
                              const style = activeObj.fontStyle === "italic" ? "normal" : "italic";
                              setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, fontStyle: style } : o));
                              saveHistoryState(objects, pagesOrder);
                            }}
                            className={`flex-1 py-1 rounded-lg border text-xs italic font-bold transition-all ${
                              activeObj.fontStyle === "italic" 
                                ? "bg-[#518231] text-white border-transparent" 
                                : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                            }`}
                          >
                            I
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. SHAPES & STAMPS (RECT, CIRCLE, LINE, ARROW, CHECKMARK, CROSSMARK) PROPERTIES */}
                  {(activeObj.type === "rect" || activeObj.type === "circle" || activeObj.type === "line" || activeObj.type === "arrow" || activeObj.type === "checkmark" || activeObj.type === "crossmark") && (
                    <div className="space-y-3">
                      {(activeObj.type === "rect" || activeObj.type === "circle") && (
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Fill Color</label>
                          <div className="flex flex-wrap gap-1.5">
                            {["transparent", "#ffffff", "#e2f0d9", "#dbeafe", "#fee2e2", "#fef3c7"].map(c => (
                              <button 
                                key={c}
                                onClick={() => {
                                  setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, fillColor: c } : o));
                                  saveHistoryState(objects, pagesOrder);
                                }}
                                className={`w-5 h-5 rounded-full border border-white ring-1 ring-slate-300 transition-all ${activeObj.fillColor === c ? "scale-110 ring-[#518231]" : ""}`}
                                style={{ backgroundColor: c === "transparent" ? "#cccccc" : c }}
                                title={c === "transparent" ? "No fill" : c}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Color / Border Color</label>
                        <div className="flex flex-wrap gap-1.5">
                          {["#000000", "#518231", "#1d4ed8", "#b91c1c", "#d97706", "#ffffff"].map(c => (
                            <button 
                              key={c}
                              onClick={() => {
                                setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, strokeColor: c } : o));
                                saveHistoryState(objects, pagesOrder);
                              }}
                              className={`w-5 h-5 rounded-full border border-white ring-1 ring-slate-300 transition-all ${activeObj.strokeColor === c ? "scale-110 ring-[#518231]" : ""}`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Thickness / Border Width ({activeObj.strokeWidth || 1}px)</label>
                        <input 
                          type="range" 
                          min={activeObj.type === "rect" || activeObj.type === "circle" ? "0" : "1"}
                          max="15"
                          value={activeObj.strokeWidth || 1}
                          onChange={(e) => {
                            setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, strokeWidth: parseInt(e.target.value) } : o));
                          }}
                          onMouseUp={() => saveHistoryState(objects, pagesOrder)}
                          className="w-full accent-[#518231]"
                        />
                      </div>
                    </div>
                  )}

                  {/* 3. DRAWINGS PROPERTIES */}
                  {activeObj.type === "drawing" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Line Color</label>
                        <div className="flex flex-wrap gap-1.5">
                          {["#000000", "#518231", "#1d4ed8", "#b91c1c", "#d97706", "#ffffff"].map(c => (
                            <button 
                              key={c}
                              onClick={() => {
                                setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, strokeColor: c } : o));
                                saveHistoryState(objects, pagesOrder);
                              }}
                              className={`w-5 h-5 rounded-full border border-white ring-1 ring-slate-300 transition-all ${activeObj.strokeColor === c ? "scale-110 ring-[#518231]" : ""}`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Line Width ({activeObj.strokeWidth || 2}px)</label>
                        <input 
                          type="range" 
                          min="1" 
                          max="20"
                          value={activeObj.strokeWidth || 2}
                          onChange={(e) => {
                            setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, strokeWidth: parseInt(e.target.value) } : o));
                          }}
                          onMouseUp={() => saveHistoryState(objects, pagesOrder)}
                          className="w-full accent-[#518231]"
                        />
                      </div>
                    </div>
                  )}

                  {/* 4. OPACITY CONTROLLER (ALL EXCEPT TEXT & STICKY NOTES) */}
                  {activeObj.type !== "text" && activeObj.type !== "sticky" && (
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Opacity ({activeObj.opacity !== undefined ? activeObj.opacity : 100}%)</label>
                      <input 
                        type="range" 
                        min="10" 
                        max="100"
                        value={activeObj.opacity !== undefined ? activeObj.opacity : 100}
                        onChange={(e) => {
                          setObjects(prev => prev.map(o => o.id === activeObj.id ? { ...o, opacity: parseInt(e.target.value) } : o));
                        }}
                        onMouseUp={() => saveHistoryState(objects, pagesOrder)}
                        className="w-full accent-[#518231]"
                      />
                    </div>
                  )}

                  {/* Layer Z-Index Reordering */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1 font-extrabold">Layering Order</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button 
                        onClick={() => bringToFront(activeObj.id)}
                        className="py-1 px-2 border border-[#518231]/20 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 hover:bg-[#518231]/10 rounded text-[10px] font-bold text-slate-700 dark:text-slate-350 transition-all"
                        title="Bring Layer to Front"
                      >
                        Bring to Front
                      </button>
                      <button 
                        onClick={() => sendToBack(activeObj.id)}
                        className="py-1 px-2 border border-[#518231]/20 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 hover:bg-[#518231]/10 rounded text-[10px] font-bold text-slate-700 dark:text-slate-350 transition-all"
                        title="Send Layer to Back"
                      >
                        Send to Back
                      </button>
                      <button 
                        onClick={() => moveUp(activeObj.id)}
                        className="py-1 px-2 border border-[#518231]/20 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 hover:bg-[#518231]/10 rounded text-[10px] font-bold text-slate-700 dark:text-slate-350 transition-all"
                        title="Move Layer Up"
                      >
                        Move Up
                      </button>
                      <button 
                        onClick={() => moveDown(activeObj.id)}
                        className="py-1 px-2 border border-[#518231]/20 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 hover:bg-[#518231]/10 rounded text-[10px] font-bold text-slate-700 dark:text-slate-350 transition-all"
                        title="Move Layer Down"
                      >
                        Move Down
                      </button>
                    </div>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-800 my-1" />

                  {/* Duplicate / Delete Buttons */}
                  <div className="flex gap-2 text-xs font-semibold">
                    <button 
                      onClick={() => {
                        const copy: EditorObject = {
                          ...activeObj,
                          id: `obj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                          x: Math.min(85, activeObj.x + 4),
                          y: Math.min(85, activeObj.y + 4)
                        };
                        const nextList = [...objects, copy];
                        setObjects(nextList);
                        setSelectedObjectId(copy.id);
                        saveHistoryState(nextList, pagesOrder);
                      }}
                      className="flex-1 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 transition-all"
                    >
                      Duplicate
                    </button>
                    <button 
                      onClick={() => {
                        const filtered = objects.filter(o => o.id !== activeObj.id);
                        setObjects(filtered);
                        setSelectedObjectId(null);
                        saveHistoryState(filtered, pagesOrder);
                      }}
                      className="flex-1 py-1.5 rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          SIGNATURE MODAL
          ───────────────────────────────────────────────────────── */}
      {showSigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden">
            
            <div className="px-6 py-4 border-b border-slate-150 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <SignatureIcon className="text-[#518231]" size={16} /> Create Signature
              </h3>
              <button 
                onClick={() => setShowSigModal(false)}
                className="text-slate-400 hover:text-slate-650"
              >
                ✕
              </button>
            </div>

            {/* Modal sig modes tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 text-center">
              <button 
                onClick={() => setSigMode("draw")}
                className={`flex-1 py-2 text-xs font-bold border-b-2 ${
                  sigMode === "draw" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Draw
              </button>
              <button 
                onClick={() => setSigMode("type")}
                className={`flex-1 py-2 text-xs font-bold border-b-2 ${
                  sigMode === "type" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Type
              </button>
              <button 
                onClick={() => setSigMode("upload")}
                className={`flex-1 py-2 text-xs font-bold border-b-2 ${
                  sigMode === "upload" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Upload
              </button>
            </div>

            <div className="p-6">
              
              {/* Draw Signature Canvas */}
              {sigMode === "draw" && (
                <div className="space-y-3">
                  <div className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden relative h-40">
                    <canvas 
                      ref={sigCanvasRef}
                      width={450}
                      height={160}
                      onMouseDown={startSigDraw}
                      className="w-full h-full cursor-crosshair"
                    />
                    <button 
                      onClick={clearSigDraw}
                      className="absolute bottom-2 right-2 px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold text-slate-600 rounded-lg shadow-3xs"
                    >
                      Clear
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-405 italic">Use stylus, trackpad, or mouse to draw signature cleanly.</p>
                </div>
              )}

              {/* Type Signature */}
              {sigMode === "type" && (
                <div className="space-y-4">
                  <input 
                    type="text" 
                    value={typedSigName}
                    onChange={(e) => setTypedSigName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm"
                  />
                  
                  {typedSigName.trim() && (
                    <div className="border border-slate-100 bg-slate-50 p-6 rounded-xl flex items-center justify-center text-3xl font-normal tracking-wide text-slate-800 shadow-3xs">
                      <span style={{ fontFamily: typedSigFont === "Alex Brush" ? "Brush Script MT" : "cursive", fontStyle: "italic" }}>
                        {typedSigName}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {["Alex Brush", "Cursive"].map(f => (
                      <button 
                        key={f}
                        onClick={() => setTypedSigFont(f)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                          typedSigFont === f 
                            ? "bg-[#518231]/10 text-[#518231] border-[#518231]" 
                            : "bg-white hover:bg-slate-50 border-slate-200"
                        }`}
                      >
                        {f === "Alex Brush" ? "Alex Brush script" : "Standard cursive"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Signature PNG */}
              {sigMode === "upload" && (
                <div className="space-y-3">
                  <div className="border border-dashed border-slate-300 bg-slate-50 dark:bg-slate-950 rounded-xl p-6 text-center flex flex-col items-center gap-3">
                    <input 
                      type="file" 
                      onChange={handleSigFileSelect}
                      accept="image/*"
                      className="hidden" 
                      id="signature-file-uploader"
                    />
                    <label 
                      htmlFor="signature-file-uploader"
                      className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-3xs cursor-pointer text-xs font-bold text-slate-700"
                    >
                      Browse Signature Image
                    </label>
                    {sigFileUrl && (
                      <div className="h-16 w-full max-w-xs border rounded bg-white p-2">
                        <img src={sigFileUrl} alt="uploaded signature thumbnail" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 italic">PNG format with transparent background is recommended for clean placement.</p>
                </div>
              )}

            </div>

            <div className="px-6 py-4 border-t border-slate-150 dark:border-slate-800 flex items-center justify-end gap-2 bg-slate-50 dark:bg-slate-900/60">
              <button 
                onClick={() => setShowSigModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-3xs"
              >
                Cancel
              </button>
              <button 
                onClick={applySignature}
                disabled={sigMode === "type" ? !typedSigName.trim() : sigMode === "upload" ? !sigFileUrl : false}
                className="px-4 py-2 bg-[#518231] hover:bg-[#416827] text-white rounded-lg font-bold text-xs shadow-sm disabled:opacity-50"
              >
                Apply Signature
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
