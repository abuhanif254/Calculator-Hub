"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Upload, Trash2, Settings, AlertCircle, Loader2, Download, 
  RefreshCw, History, Check, ZoomIn, ZoomOut, FileText, 
  Eye, Sliders, Info, ShieldCheck, ArrowRight, Copy, RotateCw, Crop, Move, ChevronLeft, ChevronRight, X
} from "lucide-react";
import { jsPDF } from "jspdf";

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

interface JpgToPdfHistoryItem {
  id: string;
  timestamp: number;
  outputName: string;
  imageCount: number;
  pageSize: string;
  quality: string;
  fileSize: number;
}

export function JpgToPdfTool() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pdfjsLoaded, setPdfjsLoaded] = useState<boolean>(false);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  
  // Settings
  const [pageSize, setPageSize] = useState<string>("a4"); // a4, a3, a5, letter, legal, custom
  const [customWidth, setCustomWidth] = useState<string>("210"); // in mm
  const [customHeight, setCustomHeight] = useState<string>("297"); // in mm
  const [orientation, setOrientation] = useState<"portrait" | "landscape" | "auto">("auto");
  const [layoutMode, setLayoutMode] = useState<"fit" | "fill" | "original">("fit");
  const [margin, setMargin] = useState<"none" | "small" | "medium" | "large">("none");
  const [qualityPreset, setQualityPreset] = useState<string>("balanced"); // max, high, balanced, compressed, custom
  const [customQuality, setCustomQuality] = useState<number>(75); // 10 - 100
  const [imagesPerPage, setImagesPerPage] = useState<number>(1); // 1, 2, 4
  
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
  const [activeTab, setActiveTab] = useState<"editor" | "history">("editor");
  const [historyList, setHistoryList] = useState<JpgToPdfHistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  // Initialize history
  useEffect(() => {
    const saved = localStorage.getItem("jpg_to_pdf_history");
    if (saved) {
      try {
        setHistoryList(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Get current quality percentage
  const getQualityValue = useCallback((): number => {
    if (qualityPreset === "max") return 100;
    if (qualityPreset === "high") return 85;
    if (qualityPreset === "balanced") return 65;
    if (qualityPreset === "compressed") return 40;
    return customQuality;
  }, [qualityPreset, customQuality]);

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
    const supportedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const imageFiles = Array.from(files).filter(f => supportedTypes.includes(f.type) || /\.(jpg|jpeg|png|webp)$/i.test(f.name));
    
    if (imageFiles.length === 0) {
      alert("Please upload valid image files (JPG, PNG, WebP).");
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

  // Drag and drop events
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

  // Sort images alphabetically or by size
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

  // ─────────────────────────────────────────────────────────
  // IMAGE CROPPING SYSTEM
  // ─────────────────────────────────────────────────────────
  const openCropEditor = (id: string) => {
    setEditingImageId(id);
    setCropLeft(10);
    setCropRight(90);
    setCropTop(10);
    setCropBottom(90);
  };

  // Render Image Crop Overlay
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
      // Set canvas size fit to container
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

      // Draw crop overlay shaded rectangle
      context.fillStyle = "rgba(0, 0, 0, 0.55)";
      
      const x = (cropLeft / 100) * canvasW;
      const y = (cropTop / 100) * canvasH;
      const w = ((cropRight - cropLeft) / 100) * canvasW;
      const h = ((cropBottom - cropTop) / 100) * canvasH;

      // Top outer box
      context.fillRect(0, 0, canvasW, y);
      // Left outer box
      context.fillRect(0, y, x, h);
      // Right outer box
      context.fillRect(x + w, y, canvasW - (x + w), h);
      // Bottom outer box
      context.fillRect(0, y + h, canvasW, canvasH - (y + h));

      // Draw crop boundary border
      context.strokeStyle = "#518231";
      context.lineWidth = 2.5;
      context.strokeRect(x, y, w, h);

      // Draw handles corner squares
      context.fillStyle = "#518231";
      const size = 6;
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
      // Bounding box calculations in actual image pixels
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
            // Revoke old cropped URL
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

  // ─────────────────────────────────────────────────────────
  // PDF COMPILING PIPELINE
  // ─────────────────────────────────────────────────────────
  const getPageFormatDimensions = (): [number, number] => {
    if (pageSize === "a4") return [595.28, 841.89];
    if (pageSize === "a3") return [841.89, 1190.55];
    if (pageSize === "a5") return [419.53, 595.28];
    if (pageSize === "letter") return [612.00, 792.00];
    if (pageSize === "legal") return [612.00, 1008.00];
    
    // Custom sizes
    const w = parseFloat(customWidth);
    const h = parseFloat(customHeight);
    const wPt = isNaN(w) || w <= 0 ? 595.28 : w * 72 / 25.4;
    const hPt = isNaN(h) || h <= 0 ? 841.89 : h * 72 / 25.4;
    return [wPt, hPt];
  };

  const getMarginValue = (): number => {
    if (margin === "none") return 0;
    if (margin === "small") return 15;
    if (margin === "medium") return 36;
    return 54; // large
  };

  // Generate canvas rotated & cropped image data
  const processImageToJpegDataUrl = (item: ImageItem, quality: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = item.croppedUrl || item.url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas 2D context"));
          return;
        }

        const isRotated = item.rotation === 90 || item.rotation === 270;
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        canvas.width = isRotated ? height : width;
        canvas.height = isRotated ? width : height;

        // Apply rotation transformations
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((item.rotation * Math.PI) / 180);
        ctx.drawImage(img, -width / 2, -height / 2);

        // Compress and extract
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        
        // Clean memory
        canvas.width = 0;
        canvas.height = 0;
        resolve(dataUrl);
      };
      img.onerror = (e) => reject(e);
    });
  };

  // Compile PDF Document to Uint8Array
  const compilePdf = async (forPreview = false): Promise<Uint8Array | null> => {
    if (images.length === 0) return null;
    
    const [pageWidthPt, pageHeightPt] = getPageFormatDimensions();
    const marginPt = getMarginValue();
    const quality = getQualityValue() / 100;

    let doc: jsPDF | null = null;
    let imagesProcessed = 0;

    // Process layout logic
    for (let i = 0; i < images.length; i += imagesPerPage) {
      const itemsInPage = images.slice(i, i + imagesPerPage);
      
      // Determine page orientation for this page
      let activeWidth = pageWidthPt;
      let activeHeight = pageHeightPt;
      let targetOrientation: "p" | "l" = "p";

      if (orientation === "portrait") {
        targetOrientation = "p";
      } else if (orientation === "landscape") {
        targetOrientation = "l";
        activeWidth = pageHeightPt;
        activeHeight = pageWidthPt;
      } else {
        // Auto: detect orientation from the first image of this page
        const firstImg = itemsInPage[0];
        const isLandscape = firstImg.rotation === 90 || firstImg.rotation === 270 
          ? firstImg.width > firstImg.height 
          : firstImg.width < firstImg.height; // wait, rotation swaps width/height

        const imgRotWidth = firstImg.rotation === 90 || firstImg.rotation === 270 ? firstImg.height : firstImg.width;
        const imgRotHeight = firstImg.rotation === 90 || firstImg.rotation === 270 ? firstImg.width : firstImg.height;

        if (imgRotWidth > imgRotHeight) {
          targetOrientation = "l";
          activeWidth = pageHeightPt;
          activeHeight = pageWidthPt;
        } else {
          targetOrientation = "p";
        }
      }

      if (!doc) {
        doc = new jsPDF({
          orientation: targetOrientation,
          unit: "pt",
          format: [activeWidth, activeHeight]
        });
      } else {
        doc.addPage([activeWidth, activeHeight], targetOrientation);
      }

      // Metadata properties (set on first page creation)
      if (i === 0) {
        doc.setProperties({
          title: title || "Converted Images",
          author: author || "Platform User",
          subject: subject || "JPG to PDF Conversion",
          keywords: keywords || "images, pdf, converter"
        });
      }

      // Draw images inside page grid layout
      const gridCount = itemsInPage.length;
      let cols = 1;
      let rows = 1;

      if (gridCount === 2) {
        cols = 1;
        rows = 2; // split vertical
      } else if (gridCount === 4 || gridCount === 3) {
        cols = 2;
        rows = 2; // 2x2 grid
      }

      const cellWidth = (activeWidth - 2 * marginPt) / cols;
      const cellHeight = (activeHeight - 2 * marginPt) / rows;

      for (let j = 0; j < itemsInPage.length; j++) {
        const item = itemsInPage[j];
        
        // Render processed rotated and cropped image
        const imgDataUrl = await processImageToJpegDataUrl(item, quality);
        
        // Calculate image aspect ratios
        const imgRotWidth = item.rotation === 90 || item.rotation === 270 ? item.height : item.width;
        const imgRotHeight = item.rotation === 90 || item.rotation === 270 ? item.width : item.height;
        const imgAspect = imgRotWidth / imgRotHeight;
        
        // Grid cell layout placement
        const colIdx = j % cols;
        const rowIdx = Math.floor(j / cols);
        const cellX = marginPt + colIdx * cellWidth;
        const cellY = marginPt + rowIdx * cellHeight;

        // Content sizing inside cell
        let targetW = cellWidth;
        let targetH = cellHeight;
        let xOffset = 0;
        let yOffset = 0;

        if (layoutMode === "fit") {
          const cellAspect = cellWidth / cellHeight;
          if (imgAspect > cellAspect) {
            targetW = cellWidth;
            targetH = cellWidth / imgAspect;
            yOffset = (cellHeight - targetH) / 2;
          } else {
            targetH = cellHeight;
            targetW = cellHeight * imgAspect;
            xOffset = (cellWidth - targetW) / 2;
          }
        } else if (layoutMode === "fill") {
          // Fill layout wraps the image, center cropping overflow on canvas.
          // For simplicity, we center fit inside the cell.
          const cellAspect = cellWidth / cellHeight;
          if (imgAspect > cellAspect) {
            targetH = cellHeight;
            targetW = cellHeight * imgAspect;
            xOffset = (cellWidth - targetW) / 2;
          } else {
            targetW = cellWidth;
            targetH = cellWidth / imgAspect;
            yOffset = (cellHeight - targetH) / 2;
          }
        } else {
          // Original size
          targetW = imgRotWidth;
          targetH = imgRotHeight;
          if (targetW > cellWidth || targetH > cellHeight) {
            const cellAspect = cellWidth / cellHeight;
            if (imgAspect > cellAspect) {
              targetW = cellWidth;
              targetH = cellWidth / imgAspect;
            } else {
              targetH = cellHeight;
              targetW = cellHeight * imgAspect;
            }
          }
          xOffset = (cellWidth - targetW) / 2;
          yOffset = (cellHeight - targetH) / 2;
        }

        doc.addImage(
          imgDataUrl,
          "JPEG",
          cellX + xOffset,
          cellY + yOffset,
          targetW,
          targetH,
          undefined,
          "FAST"
        );

        imagesProcessed++;
      }
    }

    if (!doc) return null;
    const arrayBuffer = doc.output("arraybuffer");
    return new Uint8Array(arrayBuffer);
  };

  // Trigger preview compilation
  const refreshPreview = async () => {
    if (images.length === 0) return;
    setIsCompilingPreview(true);
    setPreviewRenderStatus("rendering");
    try {
      const bytes = await compilePdf(true);
      if (bytes) {
        setPdfBytes(bytes);
        
        // Render PDF pages with PDFJS
        const pdfjs = await loadPdfJs();
        setPdfjsLoaded(true);
        const doc = await pdfjs.getDocument({ data: bytes }).promise;
        setPdfjsDoc(doc);
        setPreviewTotalPages(doc.numPages);
        setPreviewPageIndex(0);
      }
    } catch (e) {
      console.error("Failed compiling PDF preview", e);
      setPreviewRenderStatus("error");
    } finally {
      setIsCompilingPreview(false);
    }
  };

  // Auto trigger preview update on setting updates
  useEffect(() => {
    if (images.length > 0) {
      const delayDebounce = setTimeout(() => {
        refreshPreview();
      }, 700);
      return () => clearTimeout(delayDebounce);
    }
  }, [pageSize, customWidth, customHeight, orientation, layoutMode, margin, qualityPreset, customQuality, imagesPerPage, images]);

  // Render preview page onto preview canvas
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

        // Cancel previous rendering if any
        if (previewRenderTaskRef.current) {
          previewRenderTaskRef.current.cancel();
        }

        // Background paint
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
        console.error("Preview render failed:", err);
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

  // Compile and Download PDF
  const handleDownload = async () => {
    if (images.length === 0) return;
    setIsCompiling(true);
    try {
      const bytes = await compilePdf(false);
      if (!bytes) throw new Error("PDF bytes empty");

      const blob = new Blob([bytes as any], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      
      let outName = pdfName.trim();
      if (!outName) outName = "converted-images.pdf";
      if (!outName.toLowerCase().endsWith(".pdf")) outName += ".pdf";

      link.download = outName;
      link.click();
      URL.revokeObjectURL(link.href);

      // Register in History
      const historyItem: JpgToPdfHistoryItem = {
        id: Math.random().toString(36).substring(2, 11),
        timestamp: Date.now(),
        outputName: outName,
        imageCount: images.length,
        pageSize: pageSize.toUpperCase(),
        quality: qualityPreset === "custom" ? `${customQuality}%` : qualityPreset.toUpperCase(),
        fileSize: blob.size
      };

      const updatedHistory = [historyItem, ...historyList].slice(0, 20);
      setHistoryList(updatedHistory);
      localStorage.setItem("jpg_to_pdf_history", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error(e);
      alert("Failed compiling PDF. Check image data or memory.");
    } finally {
      setIsCompiling(false);
    }
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your local history log?")) {
      setHistoryList([]);
      localStorage.removeItem("jpg_to_pdf_history");
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
      {/* ── Tabs Navigation ── */}
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
          Convert JPG
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
          Recent Conversions
          {historyList.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
              {historyList.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === "history" ? (
        // ── DEVICE CONVERSION HISTORY ──
        <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History size={18} className="text-[#518231]" />
              Image to PDF History (On This Device)
            </h3>
            {historyList.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-bold transition-all"
              >
                Clear History
              </button>
            )}
          </div>

          {historyList.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">No conversion history found on this device.</p>
              <button
                onClick={() => setActiveTab("editor")}
                className="text-xs text-[#518231] hover:underline font-bold"
              >
                Upload images and start converting
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[480px] overflow-y-auto custom-scrollbar pr-2">
              {historyList.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 break-all">
                      {item.outputName}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span>Images: <strong>{item.imageCount}</strong></span>
                      <span>Page: <strong>{item.pageSize}</strong></span>
                      <span>Quality: <strong>{item.quality}</strong></span>
                      <span>File Size: <strong>{formatBytes(item.fileSize)}</strong></span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-400 dark:text-slate-500 shrink-0">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // ── EDITOR DASHBOARD ──
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: CONTROLS & SETTINGS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* UPLOADER */}
            <div
              ref={dropzoneRef}
              onDragOver={onDragOverZone}
              onDragLeave={onDragLeaveZone}
              onDrop={onDropZone}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231]/70 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-50/50 dark:bg-slate-900/10 hover:bg-green-50/5 dark:hover:bg-green-950/5 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => e.target.files && addFilesToQueue(e.target.files)}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800/80 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Upload className="text-[#518231]" size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">
                    Drag & Drop images here
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Supports JPG, PNG, and WebP (Multiple selections allowed)
                  </p>
                </div>
              </div>
            </div>

            {/* QUEUE ACTIONS & QUICK SORT */}
            {images.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    Image Queue ({images.length} items)
                  </span>
                  <button
                    onClick={clearQueue}
                    className="text-[11px] font-bold text-red-500 hover:underline"
                  >
                    Clear Queue
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => sortImages("name")}
                    className="text-[10px] font-bold py-1 px-2.5 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Sort by Name
                  </button>
                  <button
                    onClick={() => sortImages("size")}
                    className="text-[10px] font-bold py-1 px-2.5 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Sort by Size
                  </button>
                </div>
              </div>
            )}

            {/* SETTINGS CARD */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-5">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Settings size={14} className="text-[#518231]" /> Page Configuration
              </h4>

              {/* Page Format Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Page Format Size</label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-[#518231]"
                >
                  <option value="a4">A4 (210 x 297 mm)</option>
                  <option value="a3">A3 (297 x 420 mm)</option>
                  <option value="a5">A5 (148 x 210 mm)</option>
                  <option value="letter">Letter (8.5 x 11 in)</option>
                  <option value="legal">Legal (8.5 x 14 in)</option>
                  <option value="custom">Custom Format Dimensions</option>
                </select>
                {pageSize === "custom" && (
                  <div className="grid grid-cols-2 gap-2 pt-1.5">
                    <div>
                      <input
                        type="number"
                        placeholder="Width (mm)"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-[#518231]"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Height (mm)"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-[#518231]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Orientation Setting */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Orientation Mode</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["portrait", "landscape", "auto"] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setOrientation(mode)}
                      className={`py-1.5 rounded-lg border text-[11px] font-extrabold transition-all capitalize ${
                        orientation === mode 
                          ? "bg-[#518231] border-[#518231] text-white" 
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Alignment & Margins */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Scale Mode</label>
                  <select
                    value={layoutMode}
                    onChange={(e) => setLayoutMode(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                  >
                    <option value="fit">Fit Image</option>
                    <option value="fill">Fill Page</option>
                    <option value="original">Original Size</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Margins</label>
                  <select
                    value={margin}
                    onChange={(e) => setMargin(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                  >
                    <option value="none">None (0pt)</option>
                    <option value="small">Small (15pt)</option>
                    <option value="medium">Medium (36pt)</option>
                    <option value="large">Large (54pt)</option>
                  </select>
                </div>
              </div>

              {/* Quality Preset */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <label>Image Compression Quality</label>
                  <span className="text-[#518231] font-extrabold">{getQualityValue()}%</span>
                </div>
                <select
                  value={qualityPreset}
                  onChange={(e) => setQualityPreset(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                >
                  <option value="max">Maximum (Prisinte, 100%)</option>
                  <option value="high">High (Good Detail, 85%)</option>
                  <option value="balanced">Balanced (Optimized, 65%)</option>
                  <option value="compressed">Compressed (Small Size, 40%)</option>
                  <option value="custom">Custom Percentage</option>
                </select>
                {qualityPreset === "custom" && (
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={customQuality}
                    onChange={(e) => setCustomQuality(parseInt(e.target.value, 10))}
                    className="w-full accent-[#518231] mt-1"
                  />
                )}
              </div>

              {/* Grid Images per page */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Layout Templates (Images per page)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 4].map(num => (
                    <button
                      key={num}
                      onClick={() => setImagesPerPage(num)}
                      className={`py-1.5 rounded-lg border text-[11px] font-extrabold transition-all ${
                        imagesPerPage === num 
                          ? "bg-[#518231] border-[#518231] text-white" 
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {num} {num === 1 ? "Image" : "Images"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* METADATA EDITOR */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <FileText size={14} className="text-[#518231]" /> PDF Document Metadata
              </h4>
              <div className="space-y-2.5">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-0.5">PDF Document Filename</label>
                  <input
                    type="text"
                    value={pdfName}
                    onChange={(e) => setPdfName(e.target.value)}
                    placeholder="converted-images.pdf"
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-[#518231]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-0.5">Author</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-0.5">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Graphic Portfolio"
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-0.5">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Expense Receipts"
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-0.5">Keywords</label>
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="e.g. invoice, receipt, tax"
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DOWNLOAD TRIGGER */}
            {images.length > 0 && (
              <button
                onClick={handleDownload}
                disabled={isCompiling}
                className="w-full bg-[#518231] hover:bg-[#436e29] disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#518231]/10 hover:shadow-xl hover:shadow-[#518231]/15 active:scale-98 transition-all"
              >
                {isCompiling ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Compiling PDF...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Generate & Download PDF
                  </>
                )}
              </button>
            )}

            {/* SECURITY/PRIVACY ASSURANCE BANNERS */}
            <div className="bg-green-50/20 dark:bg-green-950/5 border border-green-200/50 dark:border-green-950/20 p-4 rounded-xl flex items-start gap-3">
              <ShieldCheck size={20} className="text-[#518231] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">Images Remain Private</h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  Your photos are read locally. No servers are used to parse or store your file layouts, protecting personal IDs and document scans.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR: REORDERING GRID & LIVE PREVIEW */}
          <div className="lg:col-span-7 space-y-6">
            
            {images.length === 0 ? (
              // Empty State
              <div className="h-full min-h-[420px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-600 bg-slate-50/5 dark:bg-slate-900/5">
                <FileText size={38} className="stroke-1 mb-3 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No images uploaded</h4>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 max-w-[280px]">
                  Drag and drop JPG, PNG, or WebP images on the left to start compiling your document.
                </p>
              </div>
            ) : (
              // Active Dashboard Content
              <div className="space-y-6">
                
                {/* Visual Image Sorter Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    Drag and Drop Sorter (Image Order)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                    {images.map((item, index) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl flex flex-col items-center gap-2 shadow-2xs hover:shadow-xs transition-all relative group/card cursor-grab active:cursor-grabbing select-none"
                      >
                        {/* cover thumbnail */}
                        <div className="w-full h-24 bg-slate-50 dark:bg-slate-950/20 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
                          <img
                            src={item.croppedUrl || item.url}
                            alt={item.name}
                            className="w-full h-full object-contain transition-transform"
                            style={{ transform: `rotate(${item.rotation}deg)` }}
                          />
                          
                          {/* Quick delete float */}
                          <button
                            onClick={() => deleteImage(item.id)}
                            className="absolute top-1 right-1 p-1 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-850 rounded-md shadow-sm text-slate-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover/card:opacity-100 transition-opacity"
                            title="Delete image"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>

                        {/* file metadata name details */}
                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 w-full truncate text-center">
                          {item.name}
                        </p>

                        {/* actions bar */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => rotateImage(item.id)}
                            className="p-1 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-500 dark:text-slate-400"
                            title="Rotate 90 degrees"
                          >
                            <RotateCw size={11} />
                          </button>
                          <button
                            onClick={() => openCropEditor(item.id)}
                            className="p-1 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-500 dark:text-slate-400"
                            title="Crop image area"
                          >
                            <Crop size={11} />
                          </button>
                          <button
                            onClick={() => duplicateImage(item.id)}
                            className="p-1 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-500 dark:text-slate-400"
                            title="Duplicate image"
                          >
                            <Copy size={11} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live PDF Preview panel */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      Live PDF Preview
                    </h4>
                    {isCompilingPreview && (
                      <span className="flex items-center gap-1 text-[10px] text-[#518231] font-bold">
                        <Loader2 size={12} className="animate-spin" /> Compiling Preview...
                      </span>
                    )}
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center gap-4 relative min-h-[380px] justify-center">
                    
                    {previewRenderStatus === "rendering" && !pdfjsDoc && (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="animate-spin text-[#518231]" size={24} />
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-extrabold">Loading preview document...</span>
                      </div>
                    )}

                    <canvas
                      ref={previewCanvasRef}
                      className={`max-w-full rounded-lg border border-slate-200/50 dark:border-slate-800/50 shadow-md ${
                        previewRenderStatus === "done" ? "block" : "hidden"
                      }`}
                    />

                    {/* Preview controls */}
                    {previewTotalPages > 0 && (
                      <div className="flex flex-wrap items-center justify-between gap-4 w-full pt-4 border-t border-slate-200/40 dark:border-slate-850 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl shadow-xs shrink-0 z-10">
                        {/* Page navigate */}
                        <div className="flex items-center gap-2">
                          <button
                            disabled={previewPageIndex === 0}
                            onClick={() => setPreviewPageIndex(prev => Math.max(0, prev - 1))}
                            className="p-1 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg disabled:opacity-45"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Page {previewPageIndex + 1} of {previewTotalPages}
                          </span>
                          <button
                            disabled={previewPageIndex >= previewTotalPages - 1}
                            onClick={() => setPreviewPageIndex(prev => Math.min(previewTotalPages - 1, prev + 1))}
                            className="p-1 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg disabled:opacity-45"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>

                        {/* Zoom select */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreviewZoom(prev => Math.max(0.4, prev - 0.1))}
                            className="p-1 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                            title="Zoom Out"
                          >
                            <ZoomOut size={13} />
                          </button>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 w-12 text-center">
                            {Math.round(previewZoom * 100)}%
                          </span>
                          <button
                            onClick={() => setPreviewZoom(prev => Math.min(1.8, prev + 0.1))}
                            className="p-1 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                            title="Zoom In"
                          >
                            <ZoomIn size={13} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      )}

      {/* ── IMAGE CROP EDITOR MODAL ── */}
      {editingImageId && (
        <div className="fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Crop size={18} className="text-[#518231]" />
                Crop Image Bounding Box
              </h3>
              <button
                onClick={() => setEditingImageId(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Crop Canvas Display */}
            <div className="bg-slate-100 dark:bg-slate-950/40 rounded-xl p-3 flex items-center justify-center border border-slate-200/50 dark:border-slate-800/50 h-[300px]">
              <canvas ref={cropCanvasRef} className="max-w-full max-h-full rounded-lg shadow-sm border border-slate-300 dark:border-slate-800" />
            </div>

            {/* Bounding box percentage sliders */}
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Adjust Crop Bounding box</span>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Left Edge</span>
                    <span>{cropLeft}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={cropRight - 5}
                    value={cropLeft}
                    onChange={(e) => setCropLeft(parseInt(e.target.value, 10))}
                    className="w-full accent-[#518231]"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Right Edge</span>
                    <span>{cropRight}%</span>
                  </div>
                  <input
                    type="range"
                    min={cropLeft + 5}
                    max="100"
                    value={cropRight}
                    onChange={(e) => setCropRight(parseInt(e.target.value, 10))}
                    className="w-full accent-[#518231]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Top Edge</span>
                    <span>{cropTop}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={cropBottom - 5}
                    value={cropTop}
                    onChange={(e) => setCropTop(parseInt(e.target.value, 10))}
                    className="w-full accent-[#518231]"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Bottom Edge</span>
                    <span>{cropBottom}%</span>
                  </div>
                  <input
                    type="range"
                    min={cropTop + 5}
                    max="100"
                    value={cropBottom}
                    onChange={(e) => setCropBottom(parseInt(e.target.value, 10))}
                    className="w-full accent-[#518231]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-850">
              <button
                onClick={() => setEditingImageId(null)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={applyCrop}
                className="px-5 py-2 bg-[#518231] hover:bg-[#436e29] text-white text-xs font-bold rounded-xl shadow-md"
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
