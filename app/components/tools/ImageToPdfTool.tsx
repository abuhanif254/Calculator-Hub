"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Upload, Trash2, Settings, AlertCircle, Loader2, Download, 
  RefreshCw, History, Check, ZoomIn, ZoomOut, FileText, 
  Eye, Sliders, Info, ShieldCheck, ArrowRight, Copy, RotateCw, Crop, Move, ChevronLeft, ChevronRight, X,
  Layers, Bookmark, Sparkles, Plus, Grid, List, Image as ImageIcon, Settings2, FileCode, CheckSquare
} from "lucide-react";
import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";

// PDF.js version for preview rendering
const PDFJS_VERSION = '3.11.174';

interface ImageItem {
  id: string;
  file: File;
  name: string;
  size: number;
  url: string; // Blob URL for thumbnail preview
  width: number;
  height: number;
  rotation: number; // 0, 90, 180, 270 degrees
  croppedBlob: Blob | null;
  croppedUrl: string | null;
}

interface ImageToPdfHistoryItem {
  id: string;
  timestamp: number;
  outputName: string;
  imageCount: number;
  pageSize: string;
  quality: string;
  fileSize: number;
}

export function ImageToPdfTool() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pdfjsLoaded, setPdfjsLoaded] = useState<boolean>(false);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  
  // Settings
  const [pageSize, setPageSize] = useState<string>("a4"); // a4, a3, a5, letter, legal, auto, custom
  const [customWidth, setCustomWidth] = useState<string>("210"); // in mm
  const [customHeight, setCustomHeight] = useState<string>("297"); // in mm
  const [orientation, setOrientation] = useState<"portrait" | "landscape" | "auto">("auto");
  const [layoutMode, setLayoutMode] = useState<"fit" | "fill" | "stretch" | "original" | "center">("fit");
  const [margin, setMargin] = useState<"none" | "small" | "medium" | "large" | "custom">("none");
  const [customMarginVal, setCustomMarginVal] = useState<string>("10"); // in mm
  const [qualityPreset, setQualityPreset] = useState<"original" | "high" | "balanced" | "compressed">("balanced");
  const [compilationMode, setCompilationMode] = useState<"single" | "separate">("single");
  
  // Header & Footer
  const [headerText, setHeaderText] = useState<string>("");
  const [footerText, setFooterText] = useState<string>("");
  const [includePageNumbers, setIncludePageNumbers] = useState<boolean>(false);

  // Watermarks
  const [enableWatermark, setEnableWatermark] = useState<boolean>(false);
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState<string>("CONFIDENTIAL");
  const [watermarkColor, setWatermarkColor] = useState<string>("#ef4444");
  const [watermarkFontSize, setWatermarkFontSize] = useState<number>(36);
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.2);
  const [watermarkRotation, setWatermarkRotation] = useState<number>(45);
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [watermarkImagePreview, setWatermarkImagePreview] = useState<string | null>(null);
  
  // Metadata settings
  const [pdfName, setPdfName] = useState<string>("converted-images.pdf");
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");

  // Crop Editor State
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [cropLeft, setCropLeft] = useState<number>(0); // 0 - 100%
  const [cropRight, setCropRight] = useState<number>(100); // 0 - 100%
  const [cropTop, setCropTop] = useState<number>(0); // 0 - 100%
  const [cropBottom, setCropBottom] = useState<number>(100); // 0 - 100%
  const cropCanvasRef = useRef<HTMLCanvasElement>(null);

  // Live PDF Preview Rendering State
  const [pdfjsDoc, setPdfjsDoc] = useState<any>(null);
  const [previewPageIndex, setPreviewPageIndex] = useState<number>(0);
  const [previewTotalPages, setPreviewTotalPages] = useState<number>(0);
  const [previewZoom, setPreviewZoom] = useState<number>(0.8);
  const [previewRenderStatus, setPreviewRenderStatus] = useState<"idle" | "rendering" | "done" | "error">("idle");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewRenderTaskRef = useRef<any>(null);

  // UI States
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [isCompilingPreview, setIsCompilingPreview] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"general" | "watermark" | "metadata" | "history">("general");
  const [historyList, setHistoryList] = useState<ImageToPdfHistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const watermarkImageInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // HTML5 Drag-and-drop list sorting
  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);

  // Load PDFJS CDN script
  const loadPdfJs = useCallback((): Promise<any> => {
    return new Promise((resolve, reject) => {
      const windowAny = window as any;
      if (windowAny.pdfjsLib) {
        resolve(windowAny.pdfjsLib);
        return;
      }
      const existingScript = document.getElementById("pdfjs-cdn-script");
      if (existingScript) {
        const checkInterval = setInterval(() => {
          if (windowAny.pdfjsLib) {
            clearInterval(checkInterval);
            resolve(windowAny.pdfjsLib);
          }
        }, 100);
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
          reject(new Error("pdfjsLib not found after CDN script load"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load PDFJS script from CDN"));
      document.body.appendChild(script);
    });
  }, []);

  // Initialize history and settings
  useEffect(() => {
    const savedHistory = localStorage.getItem("image_to_pdf_history");
    if (savedHistory) {
      try {
        setHistoryList(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    const savedSettings = localStorage.getItem("image_to_pdf_settings");
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.pageSize) setPageSize(settings.pageSize);
        if (settings.orientation) setOrientation(settings.orientation);
        if (settings.layoutMode) setLayoutMode(settings.layoutMode);
        if (settings.margin) setMargin(settings.margin);
        if (settings.qualityPreset) setQualityPreset(settings.qualityPreset);
        if (settings.enableWatermark) setEnableWatermark(settings.enableWatermark);
        if (settings.watermarkText) setWatermarkText(settings.watermarkText);
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  // Save settings when changed
  useEffect(() => {
    const settings = {
      pageSize,
      orientation,
      layoutMode,
      margin,
      qualityPreset,
      enableWatermark,
      watermarkText
    };
    localStorage.setItem("image_to_pdf_settings", JSON.stringify(settings));
  }, [pageSize, orientation, layoutMode, margin, qualityPreset, enableWatermark, watermarkText]);

  // Load image dimensions
  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        resolve({ width: 800, height: 600 }); // fallback
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Handle uploaded files
  const addFilesToQueue = async (files: FileList | File[]) => {
    const supportedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/bmp"];
    const imageFiles = Array.from(files).filter(f => supportedTypes.includes(f.type) || /\.(jpg|jpeg|png|webp|gif|bmp)$/i.test(f.name));
    
    if (imageFiles.length === 0) {
      alert("Please upload valid image files (JPG, PNG, WebP, GIF, BMP).");
      return;
    }

    const newItems: ImageItem[] = await Promise.all(imageFiles.map(async file => {
      const id = Math.random().toString(36).substring(2, 11);
      const url = URL.createObjectURL(file);
      const { width, height } = await getImageDimensions(file);
      
      return {
        id,
        file,
        name: file.name,
        size: file.size,
        url,
        width,
        height,
        rotation: 0,
        croppedBlob: null,
        croppedUrl: null
      };
    }));

    setImages(prev => [...prev, ...newItems]);
  };

  // Clipboard paste support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) files.push(file);
        }
      }
      if (files.length > 0) {
        addFilesToQueue(files);
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // Drag and drop dropzone events
  const onDragOverZone = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.add("border-[#518231]", "bg-green-50/10", "dark:bg-green-950/5");
    }
  };

  const onDragLeaveZone = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.remove("border-[#518231]", "bg-green-50/10", "dark:bg-green-950/5");
    }
  };

  const onDropZone = (e: React.DragEvent) => {
    e.preventDefault();
    onDragLeaveZone();
    if (e.dataTransfer.files) {
      addFilesToQueue(e.dataTransfer.files);
    }
  };

  // Grid Drag and Drop Reordering Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItemIndex.current = position;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault();
    dragOverItemIndex.current = position;
  };

  const handleDragEnd = () => {
    if (dragItemIndex.current !== null && dragOverItemIndex.current !== null && dragItemIndex.current !== dragOverItemIndex.current) {
      const copyListItems = [...images];
      const dragItemContent = copyListItems[dragItemIndex.current];
      copyListItems.splice(dragItemIndex.current, 1);
      copyListItems.splice(dragOverItemIndex.current, 0, dragItemContent);
      setImages(copyListItems);
    }
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
  };

  // Item adjustments
  const deleteImage = (id: string) => {
    setImages(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        URL.revokeObjectURL(item.url);
        if (item.croppedUrl) URL.revokeObjectURL(item.croppedUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const rotateImage = (id: string) => {
    setImages(prev => prev.map(img => {
      if (img.id !== id) return img;
      return {
        ...img,
        rotation: (img.rotation + 90) % 360
      };
    }));
  };

  const duplicateImage = (id: string) => {
    setImages(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      const copyId = Math.random().toString(36).substring(2, 11);
      
      const copy: ImageItem = {
        ...item,
        id: copyId,
        url: URL.createObjectURL(item.file),
        croppedUrl: item.croppedBlob ? URL.createObjectURL(item.croppedBlob) : null
      };
      
      const idx = prev.findIndex(i => i.id === id);
      const updated = [...prev];
      updated.splice(idx + 1, 0, copy);
      return updated;
    });
  };

  const clearQueue = () => {
    images.forEach(img => {
      URL.revokeObjectURL(img.url);
      if (img.croppedUrl) URL.revokeObjectURL(img.croppedUrl);
    });
    setImages([]);
    setPdfBytes(null);
    setPdfjsDoc(null);
    setPreviewTotalPages(0);
  };

  const sortImages = (type: "name" | "size") => {
    setImages(prev => {
      const copy = [...prev];
      if (type === "name") {
        copy.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        copy.sort((a, b) => b.size - a.size);
      }
      return copy;
    });
  };

  const openCropEditor = (id: string) => {
    setEditingImageId(id);
    setCropLeft(10);
    setCropRight(90);
    setCropTop(10);
    setCropBottom(90);
  };

  // Image crop canvas overlay rendering
  useEffect(() => {
    if (!editingImageId || !cropCanvasRef.current) return;
    const item = images.find(i => i.id === editingImageId);
    if (!item) return;

    const canvas = cropCanvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = new Image();
    img.src = item.url;
    img.onload = () => {
      const maxW = 380;
      const maxH = 280;
      const aspect = img.naturalWidth / img.naturalHeight;
      let canvasW = maxW;
      let canvasH = maxW / aspect;
      if (canvasH > maxH) {
        canvasH = maxH;
        canvasW = maxH * aspect;
      }

      canvas.width = canvasW;
      canvas.height = canvasH;

      // Draw base image
      context.drawImage(img, 0, 0, canvasW, canvasH);

      // Draw shaded overlay
      context.fillStyle = "rgba(0, 0, 0, 0.6)";
      
      const x = (cropLeft / 100) * canvasW;
      const y = (cropTop / 100) * canvasH;
      const w = ((cropRight - cropLeft) / 100) * canvasW;
      const h = ((cropBottom - cropTop) / 100) * canvasH;

      context.fillRect(0, 0, canvasW, y);
      context.fillRect(0, y, x, h);
      context.fillRect(x + w, y, canvasW - (x + w), h);
      context.fillRect(0, y + h, canvasW, canvasH - (y + h));

      // Draw crop boundary
      context.strokeStyle = "#518231";
      context.lineWidth = 2;
      context.strokeRect(x, y, w, h);

      // Draw corner handles
      context.fillStyle = "#518231";
      const size = 8;
      context.fillRect(x - size/2, y - size/2, size, size); // top-left
      context.fillRect(x + w - size/2, y - size/2, size, size); // top-right
      context.fillRect(x - size/2, y + h - size/2, size, size); // bottom-left
      context.fillRect(x + w - size/2, y + h - size/2, size, size); // bottom-right
    };
  }, [editingImageId, cropLeft, cropRight, cropTop, cropBottom, images]);

  const applyCrop = () => {
    if (!editingImageId || !cropCanvasRef.current) return;
    const item = images.find(i => i.id === editingImageId);
    if (!item) return;

    const img = new Image();
    img.src = item.url;
    img.onload = () => {
      const x = (cropLeft / 100) * img.naturalWidth;
      const y = (cropTop / 100) * img.naturalHeight;
      const w = ((cropRight - cropLeft) / 100) * img.naturalWidth;
      const h = ((cropBottom - cropTop) / 100) * img.naturalHeight;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const context = canvas.getContext("2d");
      if (!context) return;

      context.drawImage(img, x, y, w, h, 0, 0, w, h);

      canvas.toBlob((blob) => {
        if (blob) {
          const croppedUrl = URL.createObjectURL(blob);
          setImages(prev => prev.map(imgItem => {
            if (imgItem.id !== editingImageId) return imgItem;
            if (imgItem.croppedUrl) URL.revokeObjectURL(imgItem.croppedUrl);
            return {
              ...imgItem,
              croppedBlob: blob,
              croppedUrl,
              width: w,
              height: h
            };
          }));
        }
        setEditingImageId(null);
      }, "image/jpeg", 0.95);
    };
  };

  // Convert File or Blob URL to raw JPEG or PNG ArrayBuffer bytes after applying crop and rotation
  const processImageToBytes = async (item: ImageItem, preset: string): Promise<{ bytes: Uint8Array; isPng: boolean }> => {
    // 1) Apply optional image compression via browser-image-compression
    let fileToProcess = item.file;
    if (item.croppedBlob) {
      fileToProcess = new File([item.croppedBlob], item.name, { type: "image/jpeg" });
    }

    if (preset !== "original") {
      try {
        const compOptions = {
          maxSizeMB: preset === "compressed" ? 0.3 : preset === "balanced" ? 1.0 : 3.0,
          maxWidthOrHeight: preset === "compressed" ? 1200 : preset === "balanced" ? 1800 : 2500,
          useWebWorker: true
        };
        const compressed = await imageCompression(fileToProcess, compOptions);
        fileToProcess = new File([compressed], item.name, { type: compressed.type });
      } catch (e) {
        console.warn("Image compression skipped or failed:", e);
      }
    }

    // 2) Apply rotation on Canvas and extract standard JPG / PNG bytes
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = item.croppedUrl || URL.createObjectURL(fileToProcess);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas 2D Context failed"));
          return;
        }

        const isRotated = item.rotation === 90 || item.rotation === 270;
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        canvas.width = isRotated ? height : width;
        canvas.height = isRotated ? width : height;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((item.rotation * Math.PI) / 180);
        ctx.drawImage(img, -width / 2, -height / 2);

        // Serialize to JPG format by default (or PNG if original format was PNG and original quality selected)
        const format = (fileToProcess.type === "image/png" && preset === "original") ? "image/png" : "image/jpeg";
        const quality = preset === "compressed" ? 0.45 : preset === "balanced" ? 0.70 : preset === "high" ? 0.85 : 0.95;

        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                bytes: new Uint8Array(reader.result as ArrayBuffer),
                isPng: format === "image/png"
              });
            };
            reader.readAsArrayBuffer(blob);
          } else {
            reject(new Error("Blob compilation failed"));
          }
        }, format, quality);

        URL.revokeObjectURL(img.src);
      };
      img.onerror = (e) => reject(e);
    });
  };

  // Format dimensions (Width, Height in PostScript points)
  const getPageFormatDimensions = (item?: ImageItem): [number, number] => {
    if (pageSize === "a4") return [595.28, 841.89];
    if (pageSize === "a3") return [841.89, 1190.55];
    if (pageSize === "a5") return [419.53, 595.28];
    if (pageSize === "letter") return [612.00, 792.00];
    if (pageSize === "legal") return [612.00, 1008.00];
    if (pageSize === "auto") {
      if (item) {
        // Auto sizing: map pixel bounds to points assuming 72 DPI (72 points = 96 pixels)
        const imgRotWidth = item.rotation === 90 || item.rotation === 270 ? item.height : item.width;
        const imgRotHeight = item.rotation === 90 || item.rotation === 270 ? item.width : item.height;
        const wPt = imgRotWidth * 72 / 96;
        const hPt = imgRotHeight * 72 / 96;
        return [wPt, hPt];
      }
      return [595.28, 841.89]; // default fallback
    }

    const w = parseFloat(customWidth);
    const h = parseFloat(customHeight);
    const wPt = isNaN(w) || w <= 0 ? 595.28 : w * 72 / 25.4;
    const hPt = isNaN(h) || h <= 0 ? 841.89 : h * 72 / 25.4;
    return [wPt, hPt];
  };

  // Margining thickness values in points
  const getMarginValue = (): number => {
    if (margin === "none") return 0;
    if (margin === "small") return 15;
    if (margin === "medium") return 36;
    if (margin === "large") return 54;
    
    // Custom margin in mm
    const val = parseFloat(customMarginVal);
    return isNaN(val) || val < 0 ? 0 : val * 72 / 25.4;
  };

  // Compile individual or combined PDF documents
  const compilePdfDocument = async (forPreview = false, targetImgItem?: ImageItem): Promise<Uint8Array | null> => {
    const imagesToProcess = targetImgItem ? [targetImgItem] : images;
    if (imagesToProcess.length === 0) return null;

    const pdfDoc = await PDFDocument.create();
    
    // Set standard metadata
    pdfDoc.setTitle(title || "Converted Document");
    pdfDoc.setAuthor(author || "Platform User");
    pdfDoc.setSubject(subject || "Image to PDF Converter");
    pdfDoc.setKeywords(keywords ? keywords.split(",").map(k => k.trim()) : ["images", "pdf"]);

    const marginPt = getMarginValue();
    const preset = forPreview ? "balanced" : qualityPreset;

    // Load standard Helvetica font for page headers/footers
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Load Watermark Logo if active
    let embeddedWatermarkLogo: any = null;
    if (enableWatermark && watermarkType === "image" && watermarkImage) {
      try {
        const logoBytes = new Uint8Array(await watermarkImage.arrayBuffer());
        const isLogoPng = watermarkImage.type === "image/png" || watermarkImage.name.toLowerCase().endsWith(".png");
        embeddedWatermarkLogo = isLogoPng 
          ? await pdfDoc.embedPng(logoBytes) 
          : await pdfDoc.embedJpg(logoBytes);
      } catch (e) {
        console.error("Watermark logo embedding failed:", e);
      }
    }

    // Process every page sequentially
    for (let idx = 0; idx < imagesToProcess.length; idx++) {
      const item = imagesToProcess[idx];
      const [baseWidthPt, baseHeightPt] = getPageFormatDimensions(item);

      // Orientation overrides (ignored if auto Page Size or orientation set to auto)
      let pageW = baseWidthPt;
      let pageH = baseHeightPt;
      let activeOrientation: "portrait" | "landscape" = "portrait";

      if (pageSize !== "auto") {
        if (orientation === "portrait") {
          pageW = Math.min(baseWidthPt, baseHeightPt);
          pageH = Math.max(baseWidthPt, baseHeightPt);
        } else if (orientation === "landscape") {
          pageW = Math.max(baseWidthPt, baseHeightPt);
          pageH = Math.min(baseWidthPt, baseHeightPt);
          activeOrientation = "landscape";
        } else {
          // Auto orientation from dimensions
          const imgRotWidth = item.rotation === 90 || item.rotation === 270 ? item.height : item.width;
          const imgRotHeight = item.rotation === 90 || item.rotation === 270 ? item.width : item.height;
          if (imgRotWidth > imgRotHeight) {
            pageW = Math.max(baseWidthPt, baseHeightPt);
            pageH = Math.min(baseWidthPt, baseHeightPt);
            activeOrientation = "landscape";
          } else {
            pageW = Math.min(baseWidthPt, baseHeightPt);
            pageH = Math.max(baseWidthPt, baseHeightPt);
          }
        }
      } else {
        // Auto: matches rotated dimensions
        const imgRotWidth = item.rotation === 90 || item.rotation === 270 ? item.height : item.width;
        const imgRotHeight = item.rotation === 90 || item.rotation === 270 ? item.width : item.height;
        if (imgRotWidth > imgRotHeight) activeOrientation = "landscape";
      }

      // Add blank page
      const page = pdfDoc.addPage([pageW, pageH]);

      // Process image to standard bytes
      const { bytes, isPng } = await processImageToBytes(item, preset);
      const embeddedImage = isPng ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);

      const imgRotWidth = item.rotation === 90 || item.rotation === 270 ? item.height : item.width;
      const imgRotHeight = item.rotation === 90 || item.rotation === 270 ? item.width : item.height;
      const imgAspect = imgRotWidth / imgRotHeight;

      // Layout boundary math
      const clientW = pageW - 2 * marginPt;
      const clientH = pageH - 2 * marginPt;
      const clientAspect = clientW / clientH;

      let drawW = clientW;
      let drawH = clientH;
      let drawX = marginPt;
      let drawY = marginPt;

      if (layoutMode === "fit") {
        if (imgAspect > clientAspect) {
          drawW = clientW;
          drawH = clientW / imgAspect;
          drawY = marginPt + (clientH - drawH) / 2;
        } else {
          drawH = clientH;
          drawW = clientH * imgAspect;
          drawX = marginPt + (clientW - drawW) / 2;
        }
      } else if (layoutMode === "fill") {
        if (imgAspect > clientAspect) {
          drawH = clientH;
          drawW = clientH * imgAspect;
          drawX = marginPt + (clientW - drawW) / 2;
        } else {
          drawW = clientW;
          drawH = clientW / imgAspect;
          drawY = marginPt + (clientH - drawH) / 2;
        }
      } else if (layoutMode === "stretch") {
        drawW = clientW;
        drawH = clientH;
      } else if (layoutMode === "original") {
        drawW = imgRotWidth * 72 / 96;
        drawH = imgRotHeight * 72 / 96;
        drawX = marginPt + (clientW - drawW) / 2;
        drawY = marginPt + (clientH - drawH) / 2;
      } else {
        // Center Image
        drawW = imgRotWidth * 72 / 96;
        drawH = imgRotHeight * 72 / 96;
        if (drawW > clientW || drawH > clientH) {
          if (imgAspect > clientAspect) {
            drawW = clientW;
            drawH = clientW / imgAspect;
          } else {
            drawH = clientH;
            drawW = clientH * imgAspect;
          }
        }
        drawX = marginPt + (clientW - drawW) / 2;
        drawY = marginPt + (clientH - drawH) / 2;
      }

      // Draw the image
      page.drawImage(embeddedImage, {
        x: drawX,
        y: drawY,
        width: drawW,
        height: drawH
      });

      // Renders headers and footers
      if (headerText) {
        page.drawText(headerText, {
          x: marginPt > 10 ? marginPt : 20,
          y: pageH - 24,
          size: 10,
          font: helveticaFont,
          color: rgb(0.3, 0.4, 0.4)
        });
      }

      if (footerText) {
        page.drawText(footerText, {
          x: marginPt > 10 ? marginPt : 20,
          y: 15,
          size: 10,
          font: helveticaFont,
          color: rgb(0.3, 0.4, 0.4)
        });
      }

      if (includePageNumbers) {
        const pageNumString = `Page ${idx + 1} of ${imagesToProcess.length}`;
        const widthOfText = helveticaFont.widthOfTextAtSize(pageNumString, 10);
        page.drawText(pageNumString, {
          x: pageW - widthOfText - 20,
          y: 15,
          size: 10,
          font: helveticaFont,
          color: rgb(0.3, 0.4, 0.4)
        });
      }

      // Watermark layer drawing
      if (enableWatermark) {
        if (watermarkType === "text" && watermarkText) {
          // Simple sRGB parsing
          const hex = watermarkColor.replace("#", "");
          const rVal = parseInt(hex.substring(0, 2), 16) / 255 || 0;
          const gVal = parseInt(hex.substring(2, 4), 16) / 255 || 0;
          const bVal = parseInt(hex.substring(4, 6), 16) / 255 || 0;

          page.drawText(watermarkText, {
            x: pageW / 2 - 120,
            y: pageH / 2,
            size: watermarkFontSize,
            font: helveticaFont,
            color: rgb(rVal, gVal, bVal),
            opacity: watermarkOpacity,
            rotate: degrees(watermarkRotation)
          });
        } else if (watermarkType === "image" && embeddedWatermarkLogo) {
          const logoScale = 0.3; // Default scale multiplier
          const logoW = embeddedWatermarkLogo.width * logoScale;
          const logoH = embeddedWatermarkLogo.height * logoScale;
          page.drawImage(embeddedWatermarkLogo, {
            x: (pageW - logoW) / 2,
            y: (pageH - logoH) / 2,
            width: logoW,
            height: logoH,
            opacity: watermarkOpacity
          });
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    return new Uint8Array(pdfBytes);
  };

  // Trigger preview generation
  const refreshPreview = async () => {
    if (images.length === 0) return;
    setIsCompilingPreview(true);
    setPreviewRenderStatus("rendering");
    try {
      const bytes = await compilePdfDocument(true);
      if (bytes) {
        setPdfBytes(bytes);
        
        const pdfjs = await loadPdfJs();
        setPdfjsLoaded(true);
        const doc = await pdfjs.getDocument({ data: bytes }).promise;
        setPdfjsDoc(doc);
        setPreviewTotalPages(doc.numPages);
        setPreviewPageIndex(0);
      }
    } catch (e) {
      console.error("Preview compilation failed", e);
      setPreviewRenderStatus("error");
    } finally {
      setIsCompilingPreview(false);
    }
  };

  // Debounce preview rendering when settings change
  useEffect(() => {
    if (images.length > 0) {
      const delay = setTimeout(() => {
        refreshPreview();
      }, 700);
      return () => clearTimeout(delay);
    }
  }, [pageSize, customWidth, customHeight, orientation, layoutMode, margin, customMarginVal, qualityPreset, enableWatermark, watermarkText, watermarkColor, watermarkFontSize, watermarkOpacity, watermarkRotation, watermarkImage, headerText, footerText, includePageNumbers, images]);

  // Paint preview page onto canvas
  useEffect(() => {
    let active = true;
    const renderPreviewPage = async () => {
      if (!previewCanvasRef.current || !pdfjsDoc || previewTotalPages <= previewPageIndex) return;
      setPreviewRenderStatus("rendering");

      try {
        const page = await pdfjsDoc.getPage(previewPageIndex + 1);
        const viewport = page.getViewport({ scale: previewZoom });

        const canvas = previewCanvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not get context");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (previewRenderTaskRef.current) {
          previewRenderTaskRef.current.cancel();
        }

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        previewRenderTaskRef.current = renderTask;
        await renderTask.promise;

        if (active) {
          setPreviewRenderStatus("done");
        }
      } catch (err: any) {
        if (err.name === "RenderingCancelledException") return;
        console.error("Preview render error:", err);
        if (active) {
          setPreviewRenderStatus("error");
        }
      }
    };

    renderPreviewPage();

    return () => {
      active = false;
      if (previewRenderTaskRef.current) {
        previewRenderTaskRef.current.cancel();
      }
    };
  }, [pdfjsDoc, previewPageIndex, previewZoom, previewTotalPages]);

  // Execute export downloads
  const handleDownload = async () => {
    if (images.length === 0) return;
    setIsCompiling(true);
    try {
      let outName = pdfName.trim();
      if (!outName) outName = "converted-images.pdf";
      if (!outName.toLowerCase().endsWith(".pdf")) outName += ".pdf";

      if (compilationMode === "single") {
        // Compilation Mode: Single PDF
        const bytes = await compilePdfDocument(false);
        if (!bytes) throw new Error("PDF bytes compile empty");

        const blob = new Blob([bytes as any], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = outName;
        link.click();
        URL.revokeObjectURL(link.href);

        saveHistoryItem(outName, images.length, blob.size);
      } else {
        // Compilation Mode: Separate PDFs packaged as ZIP
        const zip = new JSZip();
        
        for (let i = 0; i < images.length; i++) {
          const item = images[i];
          const bytes = await compilePdfDocument(false, item);
          if (bytes) {
            const fileNameWithoutExt = item.name.replace(/\.[^/.]+$/, "");
            zip.file(`${fileNameWithoutExt}.pdf`, bytes);
          }
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(zipBlob);
        const zipName = outName.replace(/\.pdf$/i, ".zip");
        link.download = zipName;
        link.click();
        URL.revokeObjectURL(link.href);

        saveHistoryItem(zipName, images.length, zipBlob.size);
      }
    } catch (e) {
      console.error(e);
      alert("PDF compilation failed. Try reducing page counts or quality presets.");
    } finally {
      setIsCompiling(false);
    }
  };

  const saveHistoryItem = (outName: string, count: number, size: number) => {
    const historyItem: ImageToPdfHistoryItem = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: Date.now(),
      outputName: outName,
      imageCount: count,
      pageSize: pageSize.toUpperCase(),
      quality: qualityPreset.toUpperCase(),
      fileSize: size
    };

    const updated = [historyItem, ...historyList].slice(0, 20);
    setHistoryList(updated);
    localStorage.setItem("image_to_pdf_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your local history log?")) {
      setHistoryList([]);
      localStorage.removeItem("image_to_pdf_history");
    }
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
      {/* Visual Workspace Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Upload & Organizer Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div 
            ref={dropzoneRef}
            onDragOver={onDragOverZone}
            onDragLeave={onDragLeaveZone}
            onDrop={onDropZone}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center cursor-pointer hover:border-[#518231] dark:hover:border-[#518231] transition-all bg-slate-50 dark:bg-slate-900 group"
          >
            <input 
              ref={fileInputRef}
              type="file" 
              multiple 
              accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
              className="hidden" 
              onChange={(e) => e.target.files && addFilesToQueue(e.target.files)}
            />
            <Upload className="mx-auto h-12 w-12 text-slate-400 group-hover:text-[#518231] transition-colors mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">Drag & Drop Images Here</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">or click to browse from device (JPG, PNG, WebP, GIF, BMP)</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-200 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <CheckSquare size={12} className="text-[#518231]" />
              <span>Supports clipboard paste (Ctrl+V)</span>
            </div>
          </div>

          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Uploaded Images ({images.length})
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Total Raw Size: {formatBytes(images.reduce((acc, img) => acc + img.size, 0))}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => sortImages("name")}
                    className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    Sort Name
                  </button>
                  <button 
                    onClick={() => sortImages("size")}
                    className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    Sort Size
                  </button>
                  <button 
                    onClick={clearQueue}
                    className="px-2.5 py-1 text-xs font-semibold rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Clear All
                  </button>
                </div>
              </div>

              {/* Organizer Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-900/50">
                {images.map((item, index) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className="relative group bg-white dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow hover:border-[#518231] transition-all cursor-move select-none"
                  >
                    {/* Thumbnail Image Container */}
                    <div className="aspect-[3/4] rounded-md bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden relative">
                      <img 
                        src={item.croppedUrl || item.url} 
                        alt={item.name} 
                        className="max-w-full max-h-full object-contain transition-transform"
                        style={{ transform: `rotate(${item.rotation}deg)` }}
                      />
                      <span className="absolute top-1 left-1 bg-[#518231] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                        Page {index + 1}
                      </span>
                    </div>

                    {/* Image Details Overlay */}
                    <div className="mt-2 text-left">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate w-full" title={item.name}>
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-400 flex justify-between mt-0.5 font-medium">
                        <span>{formatBytes(item.size)}</span>
                        <span>{item.width}x{item.height}</span>
                      </div>
                    </div>

                    {/* Action buttons (Appear on hover) */}
                    <div className="absolute top-1.5 right-1.5 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => rotateImage(item.id)}
                        className="p-1 rounded bg-slate-900/80 hover:bg-slate-950 text-white shadow transition-colors"
                        title="Rotate Clockwise"
                      >
                        <RotateCw size={11} />
                      </button>
                      <button 
                        onClick={() => openCropEditor(item.id)}
                        className="p-1 rounded bg-slate-900/80 hover:bg-slate-950 text-white shadow transition-colors"
                        title="Crop Region"
                      >
                        <Crop size={11} />
                      </button>
                      <button 
                        onClick={() => duplicateImage(item.id)}
                        className="p-1 rounded bg-slate-900/80 hover:bg-slate-950 text-white shadow transition-colors"
                        title="Duplicate Page"
                      >
                        <Copy size={11} />
                      </button>
                      <button 
                        onClick={() => deleteImage(item.id)}
                        className="p-1 rounded bg-rose-600/95 hover:bg-rose-700 text-white shadow transition-colors"
                        title="Remove Image"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Options & Preview Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
          
          {/* Tabs header */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex-1 pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === "general" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab("watermark")}
              className={`flex-1 pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === "watermark" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              Watermark
            </button>
            <button
              onClick={() => setActiveTab("metadata")}
              className={`flex-1 pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === "metadata" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              Metadata
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === "history" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              History
            </button>
          </div>

          {/* TAB 1: General Settings */}
          {activeTab === "general" && (
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">PDF Compilation Mode</label>
                <select 
                  value={compilationMode} 
                  onChange={(e) => setCompilationMode(e.target.value as any)}
                  className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                >
                  <option value="single">Combine all images into one PDF</option>
                  <option value="separate">Convert each image to separate PDFs (ZIP)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Page Size</label>
                  <select 
                    value={pageSize} 
                    onChange={(e) => setPageSize(e.target.value)}
                    className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  >
                    <option value="a4">A4 (210 x 297mm)</option>
                    <option value="a3">A3 (297 x 420mm)</option>
                    <option value="a5">A5 (148 x 210mm)</option>
                    <option value="letter">Letter (8.5 x 11in)</option>
                    <option value="legal">Legal (8.5 x 14in)</option>
                    <option value="auto">Auto (Match image size)</option>
                    <option value="custom">Custom Dimensions</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Orientation</label>
                  <select 
                    value={orientation} 
                    disabled={pageSize === "auto"}
                    onChange={(e) => setOrientation(e.target.value as any)}
                    className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231] disabled:opacity-50"
                  >
                    <option value="auto">Auto Detect</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>

              {/* Custom Dimensions */}
              {pageSize === "custom" && (
                <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-lg">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Width (mm)</label>
                    <input 
                      type="number" 
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-1 px-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Height (mm)</label>
                    <input 
                      type="number" 
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-1 px-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Image Fit Option</label>
                  <select 
                    value={layoutMode} 
                    onChange={(e) => setLayoutMode(e.target.value as any)}
                    className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  >
                    <option value="fit">Fit to Page</option>
                    <option value="fill">Fill Page (Crop edge)</option>
                    <option value="stretch">Stretch</option>
                    <option value="original">Original Size</option>
                    <option value="center">Center Image</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Margins</label>
                  <select 
                    value={margin} 
                    onChange={(e) => setMargin(e.target.value as any)}
                    className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  >
                    <option value="none">No Margin (0)</option>
                    <option value="small">Small (15pt)</option>
                    <option value="medium">Medium (36pt)</option>
                    <option value="large">Large (54pt)</option>
                    <option value="custom">Custom Margin</option>
                  </select>
                </div>
              </div>

              {/* Custom Margin */}
              {margin === "custom" && (
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-lg">
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Margin Size (mm)</label>
                  <input 
                    type="number" 
                    value={customMarginVal}
                    onChange={(e) => setCustomMarginVal(e.target.value)}
                    className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-1 px-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Quality & Scale</label>
                  <select 
                    value={qualityPreset} 
                    onChange={(e) => setQualityPreset(e.target.value as any)}
                    className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  >
                    <option value="original">Original Quality</option>
                    <option value="high">High Quality</option>
                    <option value="balanced">Balanced Preset</option>
                    <option value="compressed">Compressed Preset</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Output Filename</label>
                  <input 
                    type="text" 
                    value={pdfName}
                    onChange={(e) => setPdfName(e.target.value)}
                    placeholder="converted-images.pdf"
                    className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                </div>
              </div>

              {/* Header and Footer configs */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Headers & Footers</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Header Text</label>
                    <input 
                      type="text"
                      value={headerText}
                      onChange={(e) => setHeaderText(e.target.value)}
                      placeholder="e.g. Project Invoice"
                      className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 px-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Footer Text</label>
                    <input 
                      type="text"
                      value={footerText}
                      onChange={(e) => setFooterText(e.target.value)}
                      placeholder="e.g. Page Title"
                      className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 px-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
                  <input 
                    type="checkbox"
                    checked={includePageNumbers}
                    onChange={(e) => setIncludePageNumbers(e.target.checked)}
                    className="rounded text-[#518231] focus:ring-[#518231] border-slate-300 dark:border-slate-800"
                  />
                  <span>Include dynamic page numbers in footer</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: Watermark settings */}
          {activeTab === "watermark" && (
            <div className="space-y-4 text-left">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={enableWatermark}
                  onChange={(e) => setEnableWatermark(e.target.checked)}
                  className="rounded text-[#518231] focus:ring-[#518231] border-slate-300 dark:border-slate-800"
                />
                <span>Enable Watermark Overlay</span>
              </label>

              {enableWatermark && (
                <div className="space-y-4 border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-900/50 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Watermark Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input 
                          type="radio" 
                          checked={watermarkType === "text"}
                          onChange={() => setWatermarkType("text")}
                          className="text-[#518231] focus:ring-[#518231]"
                        />
                        <span>Text Watermark</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input 
                          type="radio" 
                          checked={watermarkType === "image"}
                          onChange={() => setWatermarkType("image")}
                          className="text-[#518231] focus:ring-[#518231]"
                        />
                        <span>Image Watermark Logo</span>
                      </label>
                    </div>
                  </div>

                  {watermarkType === "text" ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Watermark Text</label>
                        <input 
                          type="text" 
                          value={watermarkText}
                          onChange={(e) => setWatermarkText(e.target.value)}
                          className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Color</label>
                          <input 
                            type="color" 
                            value={watermarkColor}
                            onChange={(e) => setWatermarkColor(e.target.value)}
                            className="block w-full h-8 rounded border border-slate-200 dark:border-slate-800 cursor-pointer bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Font Size (pt)</label>
                          <input 
                            type="number" 
                            value={watermarkFontSize}
                            onChange={(e) => setWatermarkFontSize(parseInt(e.target.value) || 24)}
                            className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-1 px-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Opacity: {watermarkOpacity}</label>
                          <input 
                            type="range"
                            min="0.05"
                            max="0.80"
                            step="0.05"
                            value={watermarkOpacity}
                            onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                            className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Rotation Angle: {watermarkRotation}°</label>
                          <input 
                            type="range"
                            min="-90"
                            max="90"
                            step="5"
                            value={watermarkRotation}
                            onChange={(e) => setWatermarkRotation(parseInt(e.target.value))}
                            className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div 
                        onClick={() => watermarkImageInputRef.current?.click()}
                        className="border border-dashed border-slate-300 dark:border-slate-800 rounded-lg p-4 text-center cursor-pointer hover:border-[#518231] bg-white dark:bg-slate-900"
                      >
                        <input 
                          ref={watermarkImageInputRef}
                          type="file" 
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              setWatermarkImage(f);
                              setWatermarkImagePreview(URL.createObjectURL(f));
                            }
                          }}
                        />
                        {watermarkImage ? (
                          <div className="flex items-center justify-center gap-2">
                            {watermarkImagePreview && (
                              <img src={watermarkImagePreview} className="w-8 h-8 object-contain rounded" alt="logo" />
                            )}
                            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold truncate max-w-[200px]">{watermarkImage.name}</span>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Click to upload company logo image</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Logo Opacity: {watermarkOpacity}</label>
                        <input 
                          type="range"
                          min="0.05"
                          max="0.80"
                          step="0.05"
                          value={watermarkOpacity}
                          onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Metadata Settings */}
          {activeTab === "metadata" && (
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scanned Document Pack"
                  className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Author</label>
                <input 
                  type="text" 
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Company Name"
                  className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Invoices"
                  className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Keywords (comma-separated)</label>
                <input 
                  type="text" 
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g. receipts, taxes, 2026"
                  className="block w-full border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                />
              </div>
            </div>
          )}

          {/* TAB 4: History Logs */}
          {activeTab === "history" && (
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Recent Conversions</span>
                {historyList.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {historyList.length === 0 ? (
                <div className="py-8 text-center text-slate-400 dark:text-slate-600 italic text-sm">
                  No recent conversions logged locally.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  {historyList.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      <div className="space-y-0.5 truncate max-w-[75%]">
                        <div className="truncate font-bold text-slate-900 dark:text-white" title={item.outputName}>
                          {item.outputName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.imageCount} image(s) • {item.pageSize} • {item.quality} Preset
                        </div>
                      </div>
                      <div className="text-right space-y-0.5">
                        <div className="font-bold text-slate-900 dark:text-white">{formatBytes(item.fileSize)}</div>
                        <div className="text-[9px] text-slate-400">{new Date(item.timestamp).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom compiling actions */}
          {images.length > 0 && (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
              <div className="p-3.5 bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-900/20 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="h-5 w-5 text-[#518231] shrink-0 mt-0.5" />
                <div className="text-xs text-left leading-relaxed">
                  <div className="font-bold text-[#518231]">Zero-Trust Secure Conversion</div>
                  <div className="text-slate-600 dark:text-slate-400">Images are processed entirely inside browser RAM. Files never leave your device.</div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={isCompiling}
                className="w-full py-3 px-4 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl font-bold transition-all shadow-md shadow-green-200 dark:shadow-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isCompiling ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>Compiling PDF Document...</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>{compilationMode === "single" ? "Convert & Download PDF" : "Convert & Download ZIP"}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slide / Page Preview Section */}
      {images.length > 0 && (
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="text-[#518231]" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Generated PDF Document Preview</h3>
            </div>
            {previewTotalPages > 0 && (
              <div className="flex items-center gap-3">
                {/* Navigation */}
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={previewPageIndex === 0}
                    onClick={() => setPreviewPageIndex(p => Math.max(0, p - 1))}
                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Page {previewPageIndex + 1} of {previewTotalPages}
                  </span>
                  <button
                    disabled={previewPageIndex >= previewTotalPages - 1}
                    onClick={() => setPreviewPageIndex(p => Math.min(previewTotalPages - 1, p + 1))}
                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Zoom */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewZoom(z => Math.max(0.4, z - 0.1))}
                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-xs font-semibold w-10 text-center text-slate-600 dark:text-slate-400">
                    {Math.round(previewZoom * 100)}%
                  </span>
                  <button
                    onClick={() => setPreviewZoom(z => Math.min(1.8, z + 0.1))}
                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Render target canvas container */}
          <div className="flex justify-center items-center py-6 bg-slate-100 dark:bg-slate-950/60 rounded-xl relative min-h-[350px]">
            {isCompilingPreview && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-slate-900/70 z-10">
                <Loader2 className="animate-spin h-8 w-8 text-[#518231] mb-2" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Rendering preview pages...</span>
              </div>
            )}

            {previewRenderStatus === "error" ? (
              <div className="text-slate-400 dark:text-slate-600 text-center space-y-1">
                <AlertCircle className="h-10 w-10 mx-auto text-rose-500 mb-2" />
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Preview rendering failed</div>
                <div className="text-xs">Document dimensions or formatting could not be painted on canvas.</div>
              </div>
            ) : (
              <div className="shadow-lg border border-slate-200 dark:border-slate-800 bg-white rounded overflow-hidden">
                <canvas ref={previewCanvasRef} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Crop Editor Modal */}
      {editingImageId && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-[420px] w-full p-6 shadow-2xl animate-scaleIn space-y-5 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Crop className="text-[#518231]" /> Crop Image Page
              </h3>
              <button 
                onClick={() => setEditingImageId(null)}
                className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex justify-center bg-slate-50 dark:bg-slate-950/40 rounded-xl py-4 overflow-hidden border border-slate-100 dark:border-slate-800">
              <canvas ref={cropCanvasRef} className="shadow rounded" />
            </div>

            {/* Boundary controls */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Boundary Selection (%)</h4>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <div className="space-y-1">
                  <div className="flex justify-between"><span>Left: {cropLeft}%</span></div>
                  <input 
                    type="range" 
                    min="0" 
                    max="40" 
                    value={cropLeft} 
                    onChange={(e) => setCropLeft(parseInt(e.target.value))} 
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between"><span>Right: {cropRight}%</span></div>
                  <input 
                    type="range" 
                    min="60" 
                    max="100" 
                    value={cropRight} 
                    onChange={(e) => setCropRight(parseInt(e.target.value))} 
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <div className="space-y-1">
                  <div className="flex justify-between"><span>Top: {cropTop}%</span></div>
                  <input 
                    type="range" 
                    min="0" 
                    max="40" 
                    value={cropTop} 
                    onChange={(e) => setCropTop(parseInt(e.target.value))} 
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between"><span>Bottom: {cropBottom}%</span></div>
                  <input 
                    type="range" 
                    min="60" 
                    max="100" 
                    value={cropBottom} 
                    onChange={(e) => setCropBottom(parseInt(e.target.value))} 
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setEditingImageId(null)}
                className="py-2.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-center transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={applyCrop}
                className="py-2.5 rounded-xl font-bold bg-[#518231] hover:bg-[#436a28] text-white text-center transition-colors text-sm"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
