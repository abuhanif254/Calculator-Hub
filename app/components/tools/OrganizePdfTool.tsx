"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download, 
  RefreshCw, History, Check, ZoomIn, ZoomOut, Eye, Sliders, Info, 
  ShieldCheck, ArrowRight, Copy, ChevronLeft, ChevronRight, X, File,
  CheckSquare, Square, FileMinus, Layers, ChevronDown, RefreshCcw,
  Undo2, Redo2, Plus, GripVertical, RotateCw, RotateCcw, LayoutGrid, List
} from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import JSZip from "jszip";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// PDF.js version for preview rendering
const PDFJS_VERSION = '3.11.174';

interface PageItem {
  id: string; // Unique sorting ID, e.g. "fileId-pageIndex-random"
  sourceFileId: string; // "blank" or file ID
  originalIndex: number; // 0-indexed page in original file, -1 for blank
  userRotation: number; // 0, 90, 180, 270 relative rotation
  label: string; // e.g. "Page 1", "Blank Page"
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  pdfLibDoc: PDFDocument; // Loaded pdf-lib object
  pdfjsDoc: any; // Loaded PDFJS doc
  pageCount: number;
}

interface SessionHistoryState {
  pages: PageItem[];
}

interface HistoryItem {
  id: string;
  timestamp: number;
  name: string;
  pageCount: number;
}

// ─────────────────────────────────────────────────────────
// INDEXEDDB DRAFT CACHE HELPERS
// ─────────────────────────────────────────────────────────
const DB_NAME = "organize_pdf_db";
const STORE_NAME = "session_store";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Browser environment required"));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

async function saveSessionToDB(files: { id: string; name: string; size: number; bytes: Uint8Array }[], pages: PageItem[]) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(files, "files");
    store.put(pages, "pages");
    store.put(Date.now(), "timestamp");
  } catch (e) {
    console.error("Failed to save draft to IndexedDB:", e);
  }
}

async function loadSessionFromDB(): Promise<{ files: { id: string; name: string; size: number; bytes: Uint8Array }[]; pages: PageItem[] } | null> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const filesReq = store.get("files");
    const pagesReq = store.get("pages");
    
    return new Promise((resolve) => {
      tx.oncomplete = () => {
        if (filesReq.result && pagesReq.result) {
          resolve({ files: filesReq.result, pages: pagesReq.result });
        } else {
          resolve(null);
        }
      };
      tx.onerror = () => resolve(null);
    });
  } catch (e) {
    console.error("Failed to load draft from IndexedDB:", e);
    return null;
  }
}

async function clearSessionDB() {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).clear();
  } catch (e) {
    console.error("Failed to clear IndexedDB session:", e);
  }
}

// ─────────────────────────────────────────────────────────
// LAZY VIEW THUMBNAIL SUB-COMPONENT
// ─────────────────────────────────────────────────────────
interface ThumbnailProps {
  page: PageItem;
  pdfjsDoc: any; // PDFJS Doc
  zoom: number;
  viewMode: "grid" | "list";
}

function Thumbnail({ page, pdfjsDoc, zoom, viewMode }: ThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "rendering" | "done" | "error">("idle");
  const renderTaskRef = useRef<any>(null);

  useEffect(() => {
    let active = true;
    let observer: IntersectionObserver | null = null;

    const renderPage = async () => {
      if (page.sourceFileId === "blank") {
        setStatus("done");
        return;
      }
      if (!canvasRef.current || !pdfjsDoc) return;
      
      setStatus("rendering");
      try {
        const pdfPage = await pdfjsDoc.getPage(page.originalIndex + 1);
        
        // Target width based on zoom (base width 110px in grid, 180px in list)
        const baseWidth = viewMode === "grid" ? 110 : 180;
        const originalViewport = pdfPage.getViewport({ scale: 1.0 });
        const scale = (baseWidth * zoom) / originalViewport.width;
        const viewport = pdfPage.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas context is unavailable");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        const renderTask = pdfPage.render(renderContext);
        renderTaskRef.current = renderTask;
        
        await renderTask.promise;
        if (active) {
          setStatus("done");
        }
      } catch (err: any) {
        if (err.name === "RenderingCancelledException") return;
        console.error("Error rendering page thumbnail:", err);
        if (active) {
          setStatus("error");
        }
      }
    };

    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          if (entries[0].isIntersecting) {
            obs.unobserve(entries[0].target);
            renderPage();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      active = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
      if (observer && containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [page.originalIndex, page.sourceFileId, pdfjsDoc, zoom, viewMode]);

  if (page.sourceFileId === "blank") {
    return (
      <div className="w-full h-full bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-lg flex flex-col items-center justify-center p-4">
        <FileText size={28} className="text-slate-400 dark:text-slate-650" />
        <span className="text-[10px] font-bold text-slate-400 mt-2">Blank Page</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative bg-slate-50 dark:bg-slate-950/20 rounded-lg overflow-hidden">
      {status === "rendering" && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50">
          <Loader2 size={16} className="animate-spin text-[#518231]" />
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
          <AlertCircle size={16} className="text-red-500 mb-1" />
          <span className="text-[9px] text-slate-400 font-semibold">Render Error</span>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        style={{ transform: `rotate(${page.userRotation}deg)` }}
        className="max-w-full max-h-full shadow-sm transition-transform duration-200" 
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SORTABLE ITEM COMPONENT
// ─────────────────────────────────────────────────────────
interface SortableItemProps {
  page: PageItem;
  pdfjsDoc: any;
  zoom: number;
  isSelected: boolean;
  viewMode: "grid" | "list";
  onToggleSelect: (id: string, e: React.MouseEvent) => void;
  onRotateCW: (id: string) => void;
  onRotateCCW: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

function SortableItem({
  page, pdfjsDoc, zoom, isSelected, viewMode,
  onToggleSelect, onRotateCW, onRotateCCW, onDuplicate, onDelete
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 50 : undefined
  };

  const cardClasses = `group/card relative bg-white dark:bg-slate-900 border-2 rounded-2xl p-2.5 flex flex-col shadow-sm transition-all ${
    isSelected
      ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10 shadow-[0_0_12px_-2px_rgba(81,130,49,0.2)]"
      : "border-slate-200 dark:border-slate-800 hover:border-[#518231]/40 dark:hover:border-[#518231]/40 hover:shadow-md"
  } ${viewMode === "list" ? "flex-row gap-4 items-center" : "aspect-[3/4] justify-between"}`;

  return (
    <div ref={setNodeRef} style={style} className={cardClasses}>
      
      {/* Selection checkbox overlay */}
      <button 
        type="button"
        onClick={(e) => onToggleSelect(page.id, e)}
        className="absolute top-2 left-2 z-10 p-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded-lg shadow-sm cursor-pointer text-[#518231]"
      >
        {isSelected ? <CheckSquare size={14} /> : <Square size={14} className="text-slate-400" />}
      </button>

      {/* Drag handle */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <GripVertical size={13} />
      </div>

      {/* Thumbnail view */}
      <div className={`flex-1 overflow-hidden mt-8 ${viewMode === "list" ? "max-w-[120px] h-[160px] mt-0" : "mb-2 h-[65%]"}`}>
        <Thumbnail page={page} pdfjsDoc={pdfjsDoc} zoom={zoom} viewMode={viewMode} />
      </div>

      {/* Details & Actions Footer */}
      <div className={`space-y-1.5 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black text-slate-850 dark:text-slate-150 truncate max-w-[80px]" title={page.label}>
            {page.label}
          </span>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            {page.originalIndex !== -1 ? `#${page.originalIndex + 1}` : "BLANK"}
          </span>
        </div>

        {/* Action Button Row */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-850 pt-2 gap-1.5">
          <div className="flex gap-1">
            <button 
              type="button" 
              onClick={() => onRotateCCW(page.id)}
              className="p-1 hover:bg-slate-50 dark:hover:bg-slate-950 rounded text-slate-500 hover:text-[#518231] cursor-pointer"
              title="Rotate Left"
            >
              <RotateCcw size={12} />
            </button>
            <button 
              type="button" 
              onClick={() => onRotateCW(page.id)}
              className="p-1 hover:bg-slate-50 dark:hover:bg-slate-950 rounded text-slate-500 hover:text-[#518231] cursor-pointer"
              title="Rotate Right"
            >
              <RotateCw size={12} />
            </button>
            <button 
              type="button" 
              onClick={() => onDuplicate(page.id)}
              className="p-1 hover:bg-slate-50 dark:hover:bg-slate-950 rounded text-slate-500 hover:text-[#518231] cursor-pointer"
              title="Duplicate Page"
            >
              <Copy size={12} />
            </button>
          </div>
          <button 
            type="button" 
            onClick={() => onDelete(page.id)}
            className="p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded text-slate-400 hover:text-red-500 cursor-pointer"
            title="Delete Page"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN ORGANIZE PDF TOOL COMPONENT
// ─────────────────────────────────────────────────────────
export function OrganizePdfTool() {
  const [files, setFiles] = useState<Record<string, UploadedFile>>({});
  const [pages, setPages] = useState<PageItem[]>([]);
  const [selectedPageIds, setSelectedPageIds] = useState<Set<string>>(new Set());
  
  // History Undo/Redo stacks
  const [historyStack, setHistoryStack] = useState<SessionHistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // View states
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [zoom, setZoom] = useState<number>(1.0);
  const [rangeString, setRangeString] = useState<string>("");
  const [hasRecoverableSession, setHasRecoverableSession] = useState<boolean>(false);
  const [pdfjsLoaded, setPdfjsLoaded] = useState<boolean>(false);
  
  // Local history of exports
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const insertFileInputRef = useRef<HTMLInputElement>(null);

  // Initialize sensors for dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5 // Prevents drag activation on click
      }
    })
  );

  // 1. Script dynamic loader for pdf.js
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
          if (windowAny.pdfjsLib) {
            resolve(windowAny.pdfjsLib);
          } else {
            reject(new Error("pdfjsLib not found on window"));
          }
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

  // Check for recovered draft on mount
  useEffect(() => {
    const checkRecoverable = async () => {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, "readonly");
      const timestamp = await new Promise<any>((resolve) => {
        const req = tx.objectStore(STORE_NAME).get("timestamp");
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      });
      if (timestamp) {
        setHasRecoverableSession(true);
      }
    };
    checkRecoverable();

    // Load exports history
    const savedHistory = localStorage.getItem("organize_pdf_history");
    if (savedHistory) {
      try { setHistoryItems(JSON.parse(savedHistory)); } catch (e) { console.error(e); }
    }
  }, []);

  // Save current workspace state to IndexedDB (autosave) and history stack
  const saveStateToHistory = useCallback((newPages: PageItem[], forceDbSave = true) => {
    const nextHistory = historyStack.slice(0, historyIndex + 1);
    const updatedHistory = [...nextHistory, { pages: newPages }];
    setHistoryStack(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);

    if (forceDbSave) {
      // Serialize files that are stored
      const filesToSave = Object.values(files).map(async (f) => {
        const bytes = await f.pdfLibDoc.save();
        return {
          id: f.id,
          name: f.name,
          size: f.size,
          bytes
        };
      });
      Promise.all(filesToSave).then((savedFilesList) => {
        saveSessionToDB(savedFilesList, newPages);
      });
    }
  }, [files, historyStack, historyIndex]);

  // Restore Recovered Session
  const handleRestoreSession = async () => {
    setIsProcessing(true);
    setHasRecoverableSession(false);
    try {
      const data = await loadSessionFromDB();
      if (!data) throw new Error("No draft data found");
      
      const pdfjs = await loadPdfJs();
      setPdfjsLoaded(true);
      
      const newFiles: Record<string, UploadedFile> = {};
      for (const f of data.files) {
        const fileBytes = f.bytes;
        const pdfLibDoc = await PDFDocument.load(fileBytes);
        const pdfjsDoc = await pdfjs.getDocument({ data: fileBytes }).promise;
        newFiles[f.id] = {
          id: f.id,
          name: f.name,
          size: f.size,
          pdfLibDoc,
          pdfjsDoc,
          pageCount: pdfLibDoc.getPageCount()
        };
      }
      
      setFiles(newFiles);
      setPages(data.pages);
      
      const initHistory = [{ pages: data.pages }];
      setHistoryStack(initHistory);
      setHistoryIndex(0);
    } catch (e) {
      console.error("Failed to restore session:", e);
      alert("Failed to restore draft: " + (e as Error).message);
      clearSessionDB();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDiscardSession = () => {
    clearSessionDB();
    setHasRecoverableSession(false);
  };

  // Upload handler
  const processFilesList = async (incomingFiles: FileList | null, isInsertion = false) => {
    if (!incomingFiles || incomingFiles.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfjs = await loadPdfJs();
      setPdfjsLoaded(true);

      const targetFiles: UploadedFile[] = [];
      for (let i = 0; i < incomingFiles.length; i++) {
        const file = incomingFiles[i];
        if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
          continue;
        }

        const arrayBuffer = await file.arrayBuffer();
        let pdfLibDoc: PDFDocument;
        let pdfjsDoc: any;
        
        try {
          pdfLibDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });
          pdfjsDoc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
        } catch (err: any) {
          console.warn("Corrupted or encrypted PDF:", err.message || err);
          alert(`Could not load "${file.name}": The file may be password-protected or corrupted.`);
          continue;
        }

        const id = Math.random().toString(36).substring(2, 9);
        targetFiles.push({
          id,
          name: file.name,
          size: file.size,
          pdfLibDoc,
          pdfjsDoc,
          pageCount: pdfLibDoc.getPageCount()
        });
      }

      if (targetFiles.length === 0) return;

      const updatedFiles = { ...files };
      targetFiles.forEach(f => {
        updatedFiles[f.id] = f;
      });

      // Map pages to workspace items
      const newPagesList: PageItem[] = [];
      targetFiles.forEach(f => {
        for (let idx = 0; idx < f.pageCount; idx++) {
          newPagesList.push({
            id: `${f.id}-page-${idx}-${Math.random().toString(36).substring(2, 8)}`,
            sourceFileId: f.id,
            originalIndex: idx,
            userRotation: 0,
            label: targetFiles.length > 1 || isInsertion ? `${f.name.substring(0, 10)}... (P. ${idx + 1})` : `Page ${idx + 1}`
          });
        }
      });

      const nextPages = isInsertion ? [...pages, ...newPagesList] : newPagesList;
      setFiles(updatedFiles);
      setPages(nextPages);

      // Save to history and IndexedDB
      const nextHistory = historyStack.slice(0, historyIndex + 1);
      const updatedHistory = [...nextHistory, { pages: nextPages }];
      setHistoryStack(updatedHistory);
      setHistoryIndex(updatedHistory.length - 1);

      // Save files to DB
      const filesToSave = Object.values(updatedFiles).map(async (f) => {
        const bytes = await f.pdfLibDoc.save();
        return { id: f.id, name: f.name, size: f.size, bytes };
      });
      Promise.all(filesToSave).then((savedList) => {
        saveSessionToDB(savedList, nextPages);
      });

    } catch (e) {
      console.error(e);
      alert("Failed to parse PDF file.");
    } finally {
      setIsProcessing(false);
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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFilesList(e.dataTransfer.files, pages.length > 0);
    }
  }, [pages]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFilesList(e.target.files, false);
    }
  };

  const handleInsertFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFilesList(e.target.files, true);
    }
  };

  // Page selection handlers
  const handleToggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSelected = new Set(selectedPageIds);
    if (nextSelected.has(id)) {
      nextSelected.delete(id);
    } else {
      nextSelected.add(id);
    }
    setSelectedPageIds(nextSelected);
  };

  const selectAll = () => {
    setSelectedPageIds(new Set(pages.map(p => p.id)));
  };

  const deselectAll = () => {
    setSelectedPageIds(new Set());
  };

  const selectOddPages = () => {
    const oddIds = pages.filter((_, idx) => (idx + 1) % 2 !== 0).map(p => p.id);
    setSelectedPageIds(new Set(oddIds));
  };

  const selectEvenPages = () => {
    const evenIds = pages.filter((_, idx) => (idx + 1) % 2 === 0).map(p => p.id);
    setSelectedPageIds(new Set(evenIds));
  };

  const applyRangeSelection = () => {
    if (!rangeString) return;
    const selected = new Set<string>();
    
    // Parse range string e.g. "1-5, 8, 11-14"
    const blocks = rangeString.split(",");
    blocks.forEach(block => {
      const cleanBlock = block.trim();
      if (cleanBlock.includes("-")) {
        const [startStr, endStr] = cleanBlock.split("-");
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const fromIdx = Math.min(start, end) - 1;
          const toIdx = Math.max(start, end) - 1;
          for (let idx = fromIdx; idx <= toIdx; idx++) {
            if (pages[idx]) selected.add(pages[idx].id);
          }
        }
      } else {
        const pageNum = parseInt(cleanBlock, 10);
        if (!isNaN(pageNum) && pages[pageNum - 1]) {
          selected.add(pages[pageNum - 1].id);
        }
      }
    });

    setSelectedPageIds(selected);
    setRangeString("");
  };

  // Undo / Redo mechanics
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      setPages(historyStack[nextIdx].pages);
      setSelectedPageIds(new Set());
    }
  }, [historyStack, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < historyStack.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setPages(historyStack[nextIdx].pages);
      setSelectedPageIds(new Set());
    }
  }, [historyStack, historyIndex]);

  // Page Action operations
  const handleRotateCW = (id: string) => {
    const nextPages = pages.map(p => p.id === id ? { ...p, userRotation: (p.userRotation + 90) % 360 } : p);
    setPages(nextPages);
    saveStateToHistory(nextPages);
  };

  const handleRotateCCW = (id: string) => {
    const nextPages = pages.map(p => p.id === id ? { ...p, userRotation: (p.userRotation - 90 + 360) % 360 } : p);
    setPages(nextPages);
    saveStateToHistory(nextPages);
  };

  const handleDuplicate = (id: string) => {
    const idx = pages.findIndex(p => p.id === id);
    if (idx === -1) return;
    const original = pages[idx];
    const clone: PageItem = {
      ...original,
      id: `${original.sourceFileId}-page-${original.originalIndex}-${Math.random().toString(36).substring(2, 8)}`,
      label: original.label.includes("(Copy)") ? original.label : `${original.label} (Copy)`
    };
    const nextPages = [...pages];
    nextPages.splice(idx + 1, 0, clone);
    setPages(nextPages);
    saveStateToHistory(nextPages);
  };

  const handleDelete = (id: string) => {
    const nextPages = pages.filter(p => p.id !== id);
    setPages(nextPages);
    saveStateToHistory(nextPages);
    // remove from selection
    const nextSelected = new Set(selectedPageIds);
    nextSelected.delete(id);
    setSelectedPageIds(nextSelected);
  };

  // Bulk Actions
  const handleBulkDelete = () => {
    if (selectedPageIds.size === 0) return;
    const nextPages = pages.filter(p => !selectedPageIds.has(p.id));
    setPages(nextPages);
    setSelectedPageIds(new Set());
    saveStateToHistory(nextPages);
  };

  const handleBulkRotate = (degreesCW: number) => {
    if (selectedPageIds.size === 0) return;
    const nextPages = pages.map(p => 
      selectedPageIds.has(p.id) 
        ? { ...p, userRotation: (p.userRotation + degreesCW + 360) % 360 } 
        : p
    );
    setPages(nextPages);
    saveStateToHistory(nextPages);
  };

  const handleBulkDuplicate = () => {
    if (selectedPageIds.size === 0) return;
    const nextPages: PageItem[] = [];
    pages.forEach(p => {
      nextPages.push(p);
      if (selectedPageIds.has(p.id)) {
        nextPages.push({
          ...p,
          id: `${p.sourceFileId}-page-${p.originalIndex}-${Math.random().toString(36).substring(2, 8)}`,
          label: p.label.includes("(Copy)") ? p.label : `${p.label} (Copy)`
        });
      }
    });
    setPages(nextPages);
    saveStateToHistory(nextPages);
  };

  // Page Insertion
  const handleInsertBlank = () => {
    const blankId = `blank-page-${Math.random().toString(36).substring(2, 8)}`;
    const blankPage: PageItem = {
      id: blankId,
      sourceFileId: "blank",
      originalIndex: -1,
      userRotation: 0,
      label: "Blank Page"
    };

    // If a page is selected, insert after the first selected page. Otherwise insert at the end.
    const selectedList = Array.from(selectedPageIds);
    let insertIndex = pages.length;
    if (selectedList.length > 0) {
      const firstSelectedIdx = pages.findIndex(p => p.id === selectedList[0]);
      if (firstSelectedIdx !== -1) {
        insertIndex = firstSelectedIdx + 1;
      }
    }

    const nextPages = [...pages];
    nextPages.splice(insertIndex, 0, blankPage);
    setPages(nextPages);
    saveStateToHistory(nextPages);
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in input
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      // Undo: Ctrl + Z
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        handleUndo();
      }
      // Redo: Ctrl + Y
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
      }
      // Duplicate: Ctrl + D
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        handleBulkDuplicate();
      }
      // Save: Ctrl + S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleExportPdf();
      }
      // Delete: Delete key
      if (e.key === "Delete") {
        e.preventDefault();
        handleBulkDelete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pages, selectedPageIds, historyIndex, historyStack]);

  // Drag and drop sorting mechanics
  const handleDragStart = (e: DragStartEvent) => {
    setActiveDragId(e.active.id as string);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveDragId(null);
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = pages.findIndex(p => p.id === active.id);
      const newIndex = pages.findIndex(p => p.id === over.id);
      const nextPages = arrayMove(pages, oldIndex, newIndex);
      setPages(nextPages);
      saveStateToHistory(nextPages);
    }
  };

  // Final PDF compilation & export engine using pdf-lib
  const handleExportPdf = async () => {
    if (pages.length === 0) return;
    setIsProcessing(true);
    setExportProgress(10);
    try {
      const outDoc = await PDFDocument.create();
      setExportProgress(30);

      const pageCount = pages.length;
      for (let i = 0; i < pageCount; i++) {
        const item = pages[i];
        if (item.sourceFileId === "blank") {
          // Add standard Letter size page
          outDoc.addPage([612, 792]);
        } else {
          const source = files[item.sourceFileId];
          if (source) {
            const [copiedPage] = await outDoc.copyPages(source.pdfLibDoc, [item.originalIndex]);
            
            // Get original page rotation, add user rotation, and normalize to 0-360 degrees
            const currentRotationAngle = copiedPage.getRotation().angle;
            const targetRotation = (currentRotationAngle + item.userRotation) % 360;
            copiedPage.setRotation(degrees(targetRotation));

            outDoc.addPage(copiedPage);
          }
        }
        setExportProgress(Math.min(30 + Math.floor((i / pageCount) * 50), 90));
      }

      setExportProgress(95);
      const pdfBytes = await outDoc.save();
      setExportProgress(100);

      // Trigger download
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      const primaryFileName = Object.values(files)[0]?.name || "organized";
      const cleanName = primaryFileName.toLowerCase().endsWith(".pdf") 
        ? primaryFileName.slice(0, -4) 
        : primaryFileName;
      link.download = `${cleanName}_organized.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Log export history item
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
        name: `${cleanName}_organized.pdf`,
        pageCount: pages.length
      };
      const nextHistoryItems = [newHistoryItem, ...historyItems].slice(0, 10);
      setHistoryItems(nextHistoryItems);
      localStorage.setItem("organize_pdf_history", JSON.stringify(nextHistoryItems));

      // Clear DB session after export
      clearSessionDB();
      setHasRecoverableSession(false);
    } catch (e) {
      console.error("Failed to compile output document:", e);
      alert("Error compiling output document: " + (e as Error).message);
    } finally {
      setIsProcessing(false);
      setExportProgress(0);
    }
  };

  const handleStartOver = () => {
    if (confirm("Are you sure you want to clear your current progress and start over?")) {
      setFiles({});
      setPages([]);
      setSelectedPageIds(new Set());
      setHistoryStack([]);
      setHistoryIndex(-1);
      clearSessionDB();
    }
  };

  // Helper size formatter
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Calculate changes count (modified pages)
  const modifiedCount = useMemo(() => {
    let count = 0;
    // Check if pages are rotated, added (originalIndex is -1 or order has changed)
    pages.forEach((p, idx) => {
      if (p.userRotation !== 0 || p.originalIndex !== idx || p.sourceFileId === "blank") {
        count++;
      }
    });
    return count;
  }, [pages]);

  const activeDragItem = useMemo(() => {
    return pages.find(p => p.id === activeDragId) || null;
  }, [activeDragId, pages]);

  return (
    <div className="w-full space-y-6">
      
      {/* Privacy disclaimer */}
      <div className="flex items-center justify-between p-4 bg-[#518231]/10 rounded-2xl border border-[#518231]/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#518231]/20 rounded-xl text-[#518231]">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              100% Secure Client-Side PDF Reorganization
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              All rotations, deletions, and page sorting operations are calculated locally. Your document contents never leave your device.
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowHistory(!showHistory)} 
          className="text-xs font-semibold text-[#518231] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <History size={14} /> History
        </button>
      </div>

      {/* Recover Draft Dialog banner */}
      {hasRecoverableSession && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-amber-600" />
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Unsaved Session Recovered</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">We found an unsaved PDF drafting session from a previous tab crash or refresh.</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={handleRestoreSession}
              className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600 cursor-pointer"
            >
              Restore Draft
            </button>
            <button 
              onClick={handleDiscardSession}
              className="px-3 py-1.5 border border-slate-350 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-lg text-xs font-bold cursor-pointer"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Export history overlay */}
      {showHistory && (
        <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="text-[#518231]" /> Export History (Recent 10)
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setHistoryItems([]);
                  localStorage.removeItem("organize_pdf_history");
                }}
                className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer font-semibold"
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowHistory(false)}
                className="text-xs px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-350 rounded-lg dark:bg-slate-800 dark:text-slate-300 cursor-pointer font-semibold"
              >
                Close
              </button>
            </div>
          </div>

          {historyItems.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No files exported yet.</p>
          ) : (
            <div className="grid gap-3 max-h-60 overflow-y-auto">
              {historyItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-850 dark:text-slate-150">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      {new Date(item.timestamp).toLocaleString()} • {item.pageCount} page(s)
                    </p>
                  </div>
                  <span className="text-[10px] bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 px-2.5 py-1 rounded-full font-bold">
                    Successful
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main flow wrapper */}
      {pages.length === 0 ? (
        
        // ─── INITIAL DRAG & DROP UPLOADER SCREEN ───
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-3 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center gap-4 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10 scale-[0.99]"
              : "border-slate-300 hover:border-[#518231]/70 dark:border-slate-800 dark:hover:border-[#518231]/70 bg-white hover:bg-slate-50/50 dark:bg-slate-900 dark:hover:bg-slate-900/60"
          }`}
        >
          <input 
            ref={fileInputRef}
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[#518231]">
            <Upload size={36} />
          </div>
          <div className="space-y-1">
            <p className="text-base font-black text-slate-850 dark:text-slate-150">
              Drag & Drop your PDF file here to organize
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              or click to browse files from your computer
            </p>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-4 bg-slate-100 dark:bg-slate-800 px-3.5 py-1 rounded-full">
            Supports multiple documents & blank page assembly
          </div>
        </div>

      ) : (

        // ─── INTERACTIVE PAGE BOARD WORKSPACE ───
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT: SORTABLE BOARD & HEADER TOOLBAR */}
          <div className="flex-1 space-y-4">
            
            {/* Header toolbar */}
            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-wrap gap-4 items-center justify-between shadow-sm">
              
              {/* History & Zoom tools */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleUndo} 
                  disabled={historyIndex <= 0}
                  className="p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded-xl text-slate-600 dark:text-slate-400 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Undo (Ctrl + Z)"
                >
                  <Undo2 size={16} />
                </button>
                <button 
                  onClick={handleRedo} 
                  disabled={historyIndex >= historyStack.length - 1}
                  className="p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded-xl text-slate-600 dark:text-slate-400 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Redo (Ctrl + Y)"
                >
                  <Redo2 size={16} />
                </button>
                
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                
                {/* View toggles */}
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl cursor-pointer ${viewMode === "grid" ? "bg-[#518231] text-white" : "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-500 hover:text-slate-700"}`}
                  title="Grid View"
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl cursor-pointer ${viewMode === "list" ? "bg-[#518231] text-white" : "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-500 hover:text-slate-700"}`}
                  title="List View"
                >
                  <List size={16} />
                </button>

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-950 rounded text-slate-500"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-[10px] font-bold text-slate-500 w-10 text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button 
                    onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-950 rounded text-slate-500"
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>

              {/* Selection & Insertion tools */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleInsertBlank}
                  className="px-3.5 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded-xl text-xs font-black text-slate-700 dark:text-slate-350 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus size={14} className="text-[#518231]" /> Blank Page
                </button>
                
                <button 
                  onClick={() => insertFileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-[#518231] hover:bg-[#518231]/95 text-white rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Upload size={14} /> Insert PDF
                </button>
                <input 
                  ref={insertFileInputRef}
                  type="file"
                  multiple
                  accept="application/pdf"
                  onChange={handleInsertFileInput}
                  className="hidden"
                />
              </div>

            </div>

            {/* Drag and drop grid mapping container */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={pages.map(p => p.id)} strategy={rectSortingStrategy}>
                <div className={`grid gap-4 ${
                  viewMode === "list" 
                    ? "grid-cols-1" 
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5"
                }`}>
                  {pages.map((page) => {
                    const source = files[page.sourceFileId];
                    return (
                      <SortableItem
                        key={page.id}
                        page={page}
                        pdfjsDoc={source ? source.pdfjsDoc : null}
                        zoom={zoom}
                        isSelected={selectedPageIds.has(page.id)}
                        viewMode={viewMode}
                        onToggleSelect={handleToggleSelect}
                        onRotateCW={handleRotateCW}
                        onRotateCCW={handleRotateCCW}
                        onDuplicate={handleDuplicate}
                        onDelete={handleDelete}
                      />
                    );
                  })}
                </div>
              </SortableContext>

              {/* Drag overlay thumbnail */}
              <DragOverlay>
                {activeDragId && activeDragItem ? (
                  <div className="w-[130px] h-[173px] bg-white dark:bg-slate-900 border-2 border-[#518231] rounded-2xl shadow-xl p-2 flex flex-col justify-between opacity-80 scale-105">
                    <div className="flex-1 overflow-hidden">
                      <Thumbnail 
                        page={activeDragItem} 
                        pdfjsDoc={files[activeDragItem.sourceFileId]?.pdfjsDoc || null} 
                        zoom={0.8}
                        viewMode="grid"
                      />
                    </div>
                    <div className="text-[9px] font-black text-slate-800 dark:text-slate-200 truncate mt-1">
                      {activeDragItem.label}
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>

          </div>

          {/* RIGHT: CONTROL PANEL & INFORMATION PANEL */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            
            {/* Action panel card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-6 shadow-sm">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Settings className="text-[#518231]" /> Page Controls
              </h3>

              {/* Bulk operations mapping */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-3">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Bulk Selections
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={selectAll}
                    className="py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-350 cursor-pointer shadow-sm hover:border-[#518231]"
                  >
                    Select All
                  </button>
                  <button 
                    onClick={deselectAll}
                    className="py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-350 cursor-pointer shadow-sm hover:border-red-400"
                  >
                    Clear Select
                  </button>
                  <button 
                    onClick={selectOddPages}
                    className="py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-350 cursor-pointer shadow-sm hover:border-[#518231]"
                  >
                    Select Odds
                  </button>
                  <button 
                    onClick={selectEvenPages}
                    className="py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-350 cursor-pointer shadow-sm hover:border-[#518231]"
                  >
                    Select Evens
                  </button>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-850">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Select Page Range</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="e.g. 1-4, 6"
                      value={rangeString}
                      onChange={(e) => setRangeString(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs outline-none focus:border-[#518231]"
                    />
                    <button 
                      onClick={applyRangeSelection}
                      className="px-3 bg-[#518231] hover:bg-[#518231]/95 text-white rounded-lg text-[10px] font-black cursor-pointer shadow-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Bulk Actions card */}
              {selectedPageIds.size > 0 && (
                <div className="p-4 bg-green-500/5 dark:bg-[#518231]/5 border border-[#518231]/20 rounded-2xl space-y-3">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[#518231]">
                    Actions on Selected ({selectedPageIds.size})
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => handleBulkRotate(-90)}
                      className="py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-350 flex items-center justify-center gap-1 cursor-pointer hover:border-[#518231]"
                    >
                      <RotateCcw size={10} /> Rotate -90°
                    </button>
                    <button 
                      onClick={() => handleBulkRotate(90)}
                      className="py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-350 flex items-center justify-center gap-1 cursor-pointer hover:border-[#518231]"
                    >
                      <RotateCw size={10} /> Rotate 90°
                    </button>
                    <button 
                      onClick={handleBulkDuplicate}
                      className="py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-350 flex items-center justify-center gap-1 cursor-pointer hover:border-[#518231]"
                    >
                      <Copy size={10} /> Duplicate
                    </button>
                    <button 
                      onClick={handleBulkDelete}
                      className="py-2 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-lg text-[10px] font-bold text-red-650 flex items-center justify-center gap-1 cursor-pointer hover:bg-red-100"
                    >
                      <Trash2 size={10} /> Delete
                    </button>
                  </div>
                </div>
              )}

              {/* PDF Structure Preview Comparator */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                  <Sliders size={13} className="text-[#518231]" /> Structure Preview
                </h4>
                <div className="space-y-1.5 text-[11px] leading-relaxed font-semibold">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Original Document(s):</span>
                    <span>
                      {Object.values(files).reduce((acc, f) => acc + f.pageCount, 0)} page(s)
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#518231]">
                    <span>Assembled Order:</span>
                    <span>{pages.length} page(s)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Modified Changes:</span>
                    <span>{modifiedCount} page(s)</span>
                  </div>
                </div>
              </div>

              {/* Information Panel */}
              <div className="space-y-2 border-t border-slate-150 dark:border-slate-850 pt-4">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">File Information</div>
                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400 font-semibold">
                  <p className="truncate" title={Object.values(files).map(f => f.name).join(", ")}>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Name:</span> {Object.values(files).map(f => f.name).join(", ")}
                  </p>
                  <p>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Size:</span> {formatBytes(Object.values(files).reduce((acc, f) => acc + f.size, 0))}
                  </p>
                </div>
              </div>

              {/* Export Actions */}
              <div className="space-y-3 pt-4 border-t border-slate-150 dark:border-slate-850">
                {isProcessing && exportProgress > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Exporting PDF...</span>
                      <span>{exportProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#518231] h-full transition-all duration-300" style={{ width: `${exportProgress}%` }} />
                    </div>
                  </div>
                )}
                
                <button
                  onClick={handleExportPdf}
                  disabled={isProcessing || pages.length === 0}
                  className="w-full py-4 bg-[#518231] hover:bg-[#518231]/95 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing && exportProgress > 0 ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Compiling...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Export organized PDF
                    </>
                  )}
                </button>
                <button
                  onClick={handleStartOver}
                  disabled={isProcessing}
                  className="w-full py-3 border border-slate-250 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-2xl text-xs font-bold transition-all cursor-pointer"
                >
                  Clear Workspace
                </button>
              </div>

            </div>

          </div>

        </div>

      )}
      
    </div>
  );
}
