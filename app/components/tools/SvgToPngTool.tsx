"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, Eye, EyeOff, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, X, 
  ShieldCheck, Info, FileImage, FileDown, Check, Play, Settings,
  Lock, Copy, ChevronDown, ChevronRight, Code, Columns, Layers,
  Sparkle, Maximize, FileCode, CheckSquare, Palette, RefreshCcw
} from "lucide-react";
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import JSZip from 'jszip';

interface QueueItem {
  id: string;
  file?: File;
  name: string;
  size: number; // original size in bytes
  svgCode: string;
  status: 'idle' | 'converting' | 'success' | 'error';
  progress: number;
  width: number | null;
  height: number | null;
  viewBox: string | null;
  convertedUrl: string | null;
  convertedBlob: Blob | null;
  convertedSize: number | null;
  errorMsg?: string;
}

interface SvgAnalysis {
  width: number | null;
  height: number | null;
  viewBox: string | null;
  elementCount: number;
  pathCount: number;
  shapeCount: number;
  textCount: number;
  defsCount: number;
  hasMetadata: boolean;
  hasComments: boolean;
  hasEmptyGroups: boolean;
  complexity: 'Simple' | 'Medium' | 'Complex';
}

export function SvgToPngTool() {
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === 'dark' ? 'vs-dark' : 'light';

  // Queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Settings for the active/focused item or default batch settings
  const [backgroundType, setBackgroundType] = useState<'transparent' | 'white' | 'black' | 'custom'>('transparent');
  const [customBgColor, setCustomBgColor] = useState<string>('#3b82f6');
  const [scaleFactor, setScaleFactor] = useState<number>(1); // 1, 2, 4, 8
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [sizePreset, setSizePreset] = useState<string>('original'); // 'original', 'favicon-16', 'favicon-32', 'favicon-48', 'social-icon', 'app-icon', 'youtube', 'instagram', 'twitter', 'custom'

  // Editor and validation states
  const [editorCode, setEditorCode] = useState<string>('');
  const [xmlError, setXmlError] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optStats, setOptStats] = useState<{ original: number; optimized: number; saved: number; percent: number } | null>(null);

  // UI state
  const [isProcessingAll, setIsProcessingAll] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'diagnostic' | 'suggestions'>('editor');
  const [showUrlImport, setShowUrlImport] = useState<boolean>(false);
  const [importUrl, setImportUrl] = useState<string>('');
  const [isFetchingUrl, setIsFetchingUrl] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Retrieve active item
  const activeItem = useMemo(() => {
    return queue.find(item => item.id === activeItemId) || null;
  }, [queue, activeItemId]);

  // Synchronize editor code and resolution presets when active item changes
  useEffect(() => {
    if (activeItem) {
      setEditorCode(activeItem.svgCode);
      setXmlError(null);
      setOptStats(null);
      
      // Auto populate dimension fields based on active item metadata
      if (sizePreset === 'original') {
        setCustomWidth(activeItem.width ? String(Math.round(activeItem.width)) : '');
        setCustomHeight(activeItem.height ? String(Math.round(activeItem.height)) : '');
      }
    } else {
      setEditorCode('');
      setXmlError(null);
      setOptStats(null);
    }
  }, [activeItemId]);

  // Parse SVG metadata to help calculate dimensions
  const parseSvgMetadata = (svgText: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, 'image/svg+xml');
      const parserError = doc.querySelector('parsererror');
      if (parserError) return { width: null, height: null, viewBox: null };

      const svgEl = doc.querySelector('svg');
      if (!svgEl) return { width: null, height: null, viewBox: null };

      let width: number | null = null;
      let height: number | null = null;
      const wAttr = svgEl.getAttribute('width');
      const hAttr = svgEl.getAttribute('height');
      
      if (wAttr) width = parseFloat(wAttr);
      if (hAttr) height = parseFloat(hAttr);

      const viewBox = svgEl.getAttribute('viewBox');
      if (viewBox) {
        const parts = viewBox.split(/[\s,]+/).map(parseFloat);
        if (parts.length === 4) {
          if (width === null) width = parts[2];
          if (height === null) height = parts[3];
        }
      }

      // Default fallback if dimensions cannot be retrieved
      if (width === null) width = 512;
      if (height === null) height = 512;

      return { width, height, viewBox };
    } catch {
      return { width: 512, height: 512, viewBox: null };
    }
  };

  // Perform lightweight check and counts of SVG elements
  const analyzeSvgCode = (svgText: string): SvgAnalysis | null => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, 'image/svg+xml');
      const parserError = doc.querySelector('parsererror');
      if (parserError) return null;

      const svgEl = doc.querySelector('svg');
      if (!svgEl) return null;

      const metadata = parseSvgMetadata(svgText);
      const allElements = svgEl.querySelectorAll('*');
      const elementCount = allElements.length + 1; // plus svg root

      const pathCount = svgEl.querySelectorAll('path').length;
      const shapeCount = svgEl.querySelectorAll('rect, circle, ellipse, line, polygon, polyline').length;
      const textCount = svgEl.querySelectorAll('text, tspan').length;
      const defsCount = svgEl.querySelectorAll('defs').length;

      const hasMetadata = !!(
        svgEl.querySelector('metadata') ||
        svgText.includes('http://ns.adobe.com') ||
        svgText.includes('inkscape') ||
        svgText.includes('sodipodi')
      );

      const hasComments = svgText.includes('<!--');

      let hasEmptyGroups = false;
      const groups = svgEl.querySelectorAll('g');
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].children.length === 0) {
          hasEmptyGroups = true;
          break;
        }
      }

      const complexity = elementCount > 500 ? 'Complex' : elementCount > 50 ? 'Medium' : 'Simple';

      return {
        ...metadata,
        elementCount,
        pathCount,
        shapeCount,
        textCount,
        defsCount,
        hasMetadata,
        hasComments,
        hasEmptyGroups,
        complexity
      };
    } catch {
      return null;
    }
  };

  const activeItemAnalysis = useMemo(() => {
    if (!editorCode) return null;
    return analyzeSvgCode(editorCode);
  }, [editorCode]);

  // Handle preset resolutions change
  useEffect(() => {
    if (!activeItem) return;
    
    const baseW = activeItem.width || 512;
    const baseH = activeItem.height || 512;
    
    switch (sizePreset) {
      case 'original':
        setCustomWidth(String(Math.round(baseW)));
        setCustomHeight(String(Math.round(baseH)));
        break;
      case 'favicon-16':
        setCustomWidth('16');
        setCustomHeight('16');
        break;
      case 'favicon-32':
        setCustomWidth('32');
        setCustomHeight('32');
        break;
      case 'favicon-48':
        setCustomWidth('48');
        setCustomHeight('48');
        break;
      case 'social-icon':
        setCustomWidth('256');
        setCustomHeight('256');
        break;
      case 'app-icon':
        setCustomWidth('512');
        setCustomHeight('512');
        break;
      case 'youtube':
        setCustomWidth('800');
        setCustomHeight('800');
        break;
      case 'instagram':
        setCustomWidth('1080');
        setCustomHeight('1080');
        break;
      case 'twitter':
        setCustomWidth('400');
        setCustomHeight('400');
        break;
      default:
        // custom
        break;
    }
  }, [sizePreset, activeItemId]);

  // Handle custom width / height changes with ratio locking
  const handleWidthChange = (val: string) => {
    setCustomWidth(val);
    setSizePreset('custom');
    if (lockAspectRatio && activeItem) {
      const baseW = activeItem.width || 512;
      const baseH = activeItem.height || 512;
      const num = parseFloat(val);
      if (!isNaN(num) && baseW > 0) {
        setCustomHeight(String(Math.round((num * baseH) / baseW)));
      } else {
        setCustomHeight('');
      }
    }
  };

  const handleHeightChange = (val: string) => {
    setCustomHeight(val);
    setSizePreset('custom');
    if (lockAspectRatio && activeItem) {
      const baseW = activeItem.width || 512;
      const baseH = activeItem.height || 512;
      const num = parseFloat(val);
      if (!isNaN(num) && baseH > 0) {
        setCustomWidth(String(Math.round((num * baseW) / baseH)));
      } else {
        setCustomWidth('');
      }
    }
  };

  // Helper: Decompress SVGZ files natively in modern browsers
  const decompressSvgz = async (file: File): Promise<string> => {
    if (typeof DecompressionStream !== 'undefined') {
      try {
        const stream = file.stream().pipeThrough(new DecompressionStream('gzip'));
        return await new Response(stream).text();
      } catch (err) {
        throw new Error("Local decompression stream failed.");
      }
    }
    throw new Error("SVGZ compressed files are not supported on legacy web browsers.");
  };

  // File loading handler
  const loadFiles = async (files: File[]) => {
    const newItems: QueueItem[] = [];
    
    for (const file of files) {
      const isSvgz = file.name.endsWith('.svgz');
      const isSvg = file.name.endsWith('.svg') || file.type === 'image/svg+xml';
      
      if (!isSvg && !isSvgz) {
        setErrorMsg(`Unsupported file type: ${file.name}. Only SVG and SVGZ vector graphics are accepted.`);
        continue;
      }
      
      try {
        let code = '';
        if (isSvgz) {
          code = await decompressSvgz(file);
        } else {
          code = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string || '');
            reader.onerror = () => reject(new Error("File read error"));
            reader.readAsText(file);
          });
        }

        // Quick syntax check
        const parser = new DOMParser();
        const doc = parser.parseFromString(code, 'image/svg+xml');
        const parserError = doc.querySelector('parsererror');
        if (parserError) {
          throw new Error(`XML Validation failed: ${parserError.textContent}`);
        }

        const metadata = parseSvgMetadata(code);
        const id = crypto.randomUUID();
        
        newItems.push({
          id,
          file,
          name: file.name,
          size: file.size,
          svgCode: code,
          status: 'idle',
          progress: 0,
          width: metadata.width,
          height: metadata.height,
          viewBox: metadata.viewBox,
          convertedUrl: null,
          convertedBlob: null,
          convertedSize: null
        });
      } catch (err: any) {
        setErrorMsg(`Failed to parse file "${file.name}": ${err.message}`);
      }
    }

    if (newItems.length > 0) {
      setQueue(prev => [...prev, ...newItems]);
      setActiveItemId(newItems[0].id);
      setErrorMsg(null);
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadFiles(Array.from(e.target.files));
    }
  };

  // URL Import Handler
  const handleUrlImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl) return;
    
    setIsFetchingUrl(true);
    setErrorMsg(null);
    
    try {
      const response = await fetch(importUrl);
      if (!response.ok) {
        throw new Error(`Failed to load resource (Status: ${response.status})`);
      }
      
      const text = await response.text();
      if (!text.includes('<svg')) {
        throw new Error("Fetched resource does not contain valid SVG tags.");
      }

      // Quick validation
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'image/svg+xml');
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        throw new Error(`XML Validation failed: ${parserError.textContent}`);
      }

      const metadata = parseSvgMetadata(text);
      const urlFileName = importUrl.substring(importUrl.lastIndexOf('/') + 1) || 'downloaded.svg';
      const id = crypto.randomUUID();

      const newItem: QueueItem = {
        id,
        name: urlFileName.endsWith('.svg') ? urlFileName : `${urlFileName}.svg`,
        size: new Blob([text]).size,
        svgCode: text,
        status: 'idle',
        progress: 0,
        width: metadata.width,
        height: metadata.height,
        viewBox: metadata.viewBox,
        convertedUrl: null,
        convertedBlob: null,
        convertedSize: null
      };

      setQueue(prev => [...prev, newItem]);
      setActiveItemId(id);
      setShowUrlImport(false);
      setImportUrl('');
      setSuccessMsg("Vector file successfully imported from URL.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(`URL Fetch Failed: ${err.message}. Note that server CORS configurations might block client browser fetch requests. If so, download the file and drag it here instead.`);
    } finally {
      setIsFetchingUrl(false);
    }
  };

  // Monaco Editor Change Listener with debounced XML validation
  const handleEditorChange = (value: string | undefined) => {
    const code = value || '';
    setEditorCode(code);
    
    // Update active item in queue
    if (activeItemId) {
      setQueue(prev => prev.map(item => {
        if (item.id === activeItemId) {
          const metadata = parseSvgMetadata(code);
          return {
            ...item,
            svgCode: code,
            width: metadata.width,
            height: metadata.height,
            viewBox: metadata.viewBox,
            status: 'idle', // Reset status if edited
            convertedUrl: null,
            convertedBlob: null,
            convertedSize: null
          };
        }
        return item;
      }));
    }
    
    // Validate XML syntax
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'image/svg+xml');
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        setXmlError(parserError.textContent || "XML Syntax Error");
      } else {
        setXmlError(null);
      }
    } catch (err: any) {
      setXmlError(err.message || "Invalid XML Markup");
    }
  };

  // Clean and optimize SVG code helper
  const handleOptimizeSvg = () => {
    if (!editorCode) return;
    setIsOptimizing(true);
    
    setTimeout(() => {
      try {
        const originalBytes = new Blob([editorCode]).size;
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(editorCode, 'image/svg+xml');
        const parserError = doc.querySelector('parsererror');
        if (parserError) throw new Error("Fix syntax errors before optimizing.");

        // Remove comments
        const iterator = doc.createNodeIterator(doc, NodeFilter.SHOW_COMMENT);
        let commentNode;
        while ((commentNode = iterator.nextNode())) {
          commentNode.parentNode?.removeChild(commentNode);
        }

        // Remove metadata
        const metadataElements = doc.querySelectorAll('metadata');
        metadataElements.forEach(el => el.parentNode?.removeChild(el));

        // Remove editor namespaces and custom attributes from svg tag
        const svgEl = doc.querySelector('svg');
        if (svgEl) {
          const attributesToRemove: string[] = [];
          for (let i = 0; i < svgEl.attributes.length; i++) {
            const attr = svgEl.attributes[i];
            if (
              attr.name.startsWith('xmlns:custom') ||
              attr.name.startsWith('xmlns:sodipodi') ||
              attr.name.startsWith('xmlns:inkscape') ||
              attr.name.startsWith('xmlns:illustrator') ||
              attr.name.startsWith('sodipodi:') ||
              attr.name.startsWith('inkscape:') ||
              attr.name.startsWith('illustrator:')
            ) {
              attributesToRemove.push(attr.name);
            }
          }
          attributesToRemove.forEach(name => svgEl.removeAttribute(name));
        }

        // Remove empty groups
        const groups = doc.querySelectorAll('g');
        groups.forEach(g => {
          if (g.children.length === 0 && g.attributes.length === 0) {
            g.parentNode?.removeChild(g);
          }
        });

        // Serialize optimized XML
        const serializer = new XMLSerializer();
        let optimized = serializer.serializeToString(doc);

        // Regex post clean-up
        optimized = optimized
          .replace(/\s*xmlns:sodipodi="[^"]*"/g, '')
          .replace(/\s*xmlns:inkscape="[^"]*"/g, '')
          .replace(/\s*xmlns:illustrator="[^"]*"/g, '')
          .replace(/<sodipodi:namedview[^>]*>([\s\S]*?)<\/sodipodi:namedview>/g, '')
          .replace(/<sodipodi:namedview[^>]*\/>/g, '')
          .trim();

        const optimizedBytes = new Blob([optimized]).size;
        const savedBytes = Math.max(0, originalBytes - optimizedBytes);
        const savedPercent = originalBytes > 0 ? (savedBytes / originalBytes) * 100 : 0;

        setEditorCode(optimized);
        setOptStats({
          original: originalBytes,
          optimized: optimizedBytes,
          saved: savedBytes,
          percent: savedPercent
        });
        
        // Update queue item
        if (activeItemId) {
          setQueue(prev => prev.map(item => {
            if (item.id === activeItemId) {
              const metadata = parseSvgMetadata(optimized);
              return {
                ...item,
                svgCode: optimized,
                width: metadata.width,
                height: metadata.height,
                viewBox: metadata.viewBox,
                status: 'idle',
                convertedUrl: null,
                convertedBlob: null,
                convertedSize: null
              };
            }
            return item;
          }));
        }

        setSuccessMsg("SVG markup successfully optimized.");
        setTimeout(() => setSuccessMsg(null), 3000);
      } catch (err: any) {
        setErrorMsg(`Optimization failed: ${err.message}`);
      } finally {
        setIsOptimizing(false);
      }
    }, 150);
  };

  // Convert a single item using HTML5 Canvas pipeline
  const processSingleConversion = async (item: QueueItem): Promise<boolean> => {
    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'converting', progress: 30 } : q));
    
    // Determine dimension metrics
    const baseWidth = item.width || 512;
    const baseHeight = item.height || 512;
    
    let targetWidth = baseWidth;
    let targetHeight = baseHeight;

    if (sizePreset === 'custom') {
      const parsedW = parseFloat(customWidth);
      const parsedH = parseFloat(customHeight);
      if (!isNaN(parsedW) && parsedW > 0) targetWidth = parsedW;
      if (!isNaN(parsedH) && parsedH > 0) targetHeight = parsedH;
    } else if (sizePreset !== 'original') {
      const presetW = parseFloat(customWidth);
      const presetH = parseFloat(customHeight);
      if (!isNaN(presetW)) targetWidth = presetW;
      if (!isNaN(presetH)) targetHeight = presetH;
    } else {
      // Use scaling factors
      targetWidth = baseWidth * scaleFactor;
      targetHeight = baseHeight * scaleFactor;
    }

    try {
      const resultBlob = await new Promise<Blob>((resolve, reject) => {
        const img = new Image();
        
        // Ensure standard namespaces exist
        let rawCode = item.svgCode;
        if (!rawCode.includes('xmlns="http://www.w3.org/2000/svg"')) {
          rawCode = rawCode.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        }

        const svgBlob = new Blob([rawCode], { type: 'image/svg+xml;charset=utf-8' });
        const blobUrl = URL.createObjectURL(svgBlob);

        img.onload = () => {
          URL.revokeObjectURL(blobUrl);

          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error("Failed to get 2D rendering context."));
            return;
          }

          // Render selected background options
          if (backgroundType === 'white') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, targetWidth, targetHeight);
          } else if (backgroundType === 'black') {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, targetWidth, targetHeight);
          } else if (backgroundType === 'custom') {
            ctx.fillStyle = customBgColor;
            ctx.fillRect(0, 0, targetWidth, targetHeight);
          } else {
            // transparent grid clearing
            ctx.clearRect(0, 0, targetWidth, targetHeight);
          }

          // Paint image
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas serialization failed."));
            }
          }, 'image/png');
        };

        img.onerror = () => {
          URL.revokeObjectURL(blobUrl);
          reject(new Error("Invalid SVG code or missing core namespaces. Please verify markup syntax."));
        };

        img.src = blobUrl;
      });

      const convertedUrl = URL.createObjectURL(resultBlob);

      setQueue(prev => prev.map(q => {
        if (q.id === item.id) {
          // revoke previous URL to free up memory
          if (q.convertedUrl) URL.revokeObjectURL(q.convertedUrl);
          return {
            ...q,
            status: 'success',
            progress: 100,
            convertedUrl,
            convertedBlob: resultBlob,
            convertedSize: resultBlob.size
          };
        }
        return q;
      }));

      return true;
    } catch (err: any) {
      setQueue(prev => prev.map(q => q.id === item.id ? { 
        ...q, 
        status: 'error', 
        progress: 0, 
        errorMsg: err.message || "Rendering failed" 
      } : q));
      return false;
    }
  };

  // Convert currently focused file
  const handleSingleConversion = async () => {
    if (!activeItem) return;
    await processSingleConversion(activeItem);
  };

  // Convert all files in queue sequentially
  const handleConvertAll = async () => {
    if (queue.length === 0) return;
    setIsProcessingAll(true);
    setErrorMsg(null);

    let successCount = 0;
    for (const item of queue) {
      const isSuccess = await processSingleConversion(item);
      if (isSuccess) successCount++;
    }

    setIsProcessingAll(false);
    if (successCount === queue.length) {
      setSuccessMsg(`Successfully converted all ${queue.length} files to PNG!`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } else if (successCount > 0) {
      setErrorMsg(`Completed with errors. Converted ${successCount} out of ${queue.length} files successfully.`);
    } else {
      setErrorMsg("Failed to convert the uploaded files. Check queue for individual logs.");
    }
  };

  // Trigger browser download for individual items
  const downloadSinglePng = (item: QueueItem) => {
    if (!item.convertedUrl || !item.convertedBlob) return;
    const cleanName = item.name.replace(/\.(svg|svgz)$/i, '');
    const a = document.createElement('a');
    a.href = item.convertedUrl;
    a.download = `${cleanName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Zip and download all compiled outputs
  const downloadAllAsZip = async () => {
    const completedItems = queue.filter(item => item.status === 'success' && item.convertedBlob);
    if (completedItems.length === 0) return;

    const zip = new JSZip();
    completedItems.forEach((item, index) => {
      const cleanName = item.name.replace(/\.(svg|svgz)$/i, '');
      const uniqueName = `${cleanName || `converted_image_${index + 1}`}.png`;
      zip.file(uniqueName, item.convertedBlob!);
    });

    try {
      const content = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(content);
      
      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = "svg_conversions_png.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(zipUrl);
    } catch (err: any) {
      setErrorMsg(`ZIP compilation failed: ${err.message}`);
    }
  };

  // Remove single file from queue
  const removeQueueItem = (id: string) => {
    const target = queue.find(q => q.id === id);
    if (target) {
      if (target.convertedUrl) URL.revokeObjectURL(target.convertedUrl);
    }
    setQueue(prev => prev.filter(q => q.id !== id));
    if (activeItemId === id) {
      const remaining = queue.filter(q => q.id !== id);
      setActiveItemId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Clear all items from queue
  const clearAllQueue = () => {
    queue.forEach(q => {
      if (q.convertedUrl) URL.revokeObjectURL(q.convertedUrl);
    });
    setQueue([]);
    setActiveItemId(null);
    setXmlError(null);
    setOptStats(null);
  };

  // Format bytes into readable string
  const formatBytes = (bytes: number | null) => {
    if (bytes === null || bytes === undefined) return '0 B';
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Top action header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm"
          >
            <Upload size={16} /> Upload SVG/SVGZ
          </button>
          <input
            type="file"
            multiple
            accept=".svg,.svgz,image/svg+xml"
            ref={fileInputRef}
            onChange={handleManualUpload}
            className="hidden"
          />

          <button
            onClick={() => setShowUrlImport(!showUrlImport)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border ${showUrlImport ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700' : 'bg-transparent text-slate-600 hover:bg-slate-50 border-slate-200 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800/50'}`}
          >
            <Code size={16} /> Import from URL
          </button>

          {queue.length > 0 && (
            <button
              onClick={clearAllQueue}
              className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border border-transparent hover:border-red-200 dark:hover:border-red-900/50 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} /> Clear Queue
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-[#518231] mr-2">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Client-Side</span>
          <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Private Processing</span>
        </div>
      </div>

      {/* URL Import Overlay */}
      {showUrlImport && (
        <form onSubmit={handleUrlImportSubmit} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <Upload className="text-slate-400" size={20} />
          <input
            type="url"
            required
            placeholder="https://example.com/vector-asset.svg"
            value={importUrl}
            onChange={e => setImportUrl(e.target.value)}
            className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#518231] text-slate-900 dark:text-white"
          />
          <button 
            type="submit" 
            disabled={isFetchingUrl} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            {isFetchingUrl && <Loader2 size={14} className="animate-spin" />} Fetch
          </button>
          <button type="button" onClick={() => setShowUrlImport(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={18} />
          </button>
        </form>
      )}

      {/* Notifications */}
      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="text-sm font-bold text-red-900 dark:text-red-300">Error Occurred</h5>
            <p className="text-xs text-red-700 dark:text-red-400 mt-1">{errorMsg}</p>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-600 dark:hover:text-red-200">
            <X size={16} />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 dark:bg-green-950/10 border-l-4 border-green-500 p-4 rounded-r-xl flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="text-sm font-bold text-green-900 dark:text-green-300 font-semibold">Success</h5>
            <p className="text-xs text-green-700 dark:text-green-400 mt-0.5">{successMsg}</p>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-green-400 hover:text-green-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Empty drop-zone container */}
      {queue.length === 0 ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-16 transition-all min-h-[450px] ${dragActive ? 'border-[#518231] bg-[#518231]/5' : 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
        >
          <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-full mb-6 border border-slate-200 dark:border-slate-700 shadow-inner">
            <FileImage size={48} className="text-[#518231] animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">SVG to PNG Converter Studio</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
            Drag and drop vector `.svg` or `.svgz` files here, paste vector markup directly, or upload from your device to begin local rasterization.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-[#518231] hover:bg-[#436a28] text-white font-semibold rounded-xl shadow-md transition-colors flex items-center gap-2 text-sm"
            >
              <Upload size={18} /> Browse Vector Files
            </button>
            <button
              onClick={() => {
                const sampleSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="50" cy="50" r="40" fill="#3b82f6" />\n  <rect x="35" y="35" width="30" height="30" fill="#ffffff" rx="5" />\n</svg>`;
                const sampleId = crypto.randomUUID();
                setQueue([{
                  id: sampleId,
                  name: "sample-vector.svg",
                  size: new Blob([sampleSvg]).size,
                  svgCode: sampleSvg,
                  status: 'idle',
                  progress: 0,
                  width: 100,
                  height: 100,
                  viewBox: "0 0 100 100",
                  convertedUrl: null,
                  convertedBlob: null,
                  convertedSize: null
                }]);
                setActiveItemId(sampleId);
              }}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-200 font-semibold rounded-xl transition-colors flex items-center gap-2 text-sm border border-slate-700"
            >
              <Sparkles size={18} className="text-yellow-400" /> Load Sample Vector
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDE: Queue, settings and code details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Batch queue container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers size={16} className="text-[#518231]" /> Upload Queue ({queue.length})
                </h3>
                {queue.length > 1 && (
                  <button
                    onClick={handleConvertAll}
                    disabled={isProcessingAll}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-sm disabled:opacity-50"
                  >
                    {isProcessingAll ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />} Convert All
                  </button>
                )}
              </div>

              {/* Items scroll zone */}
              <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1.5 custom-scrollbar">
                {queue.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveItemId(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${activeItemId === item.id ? 'bg-[#518231]/5 border-[#518231] shadow-sm' : 'bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-900/50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800'}`}
                  >
                    <FileCode size={24} className={activeItemId === item.id ? 'text-[#518231]' : 'text-slate-400'} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {formatBytes(item.size)} {item.width && item.height ? `• ${Math.round(item.width)}×${Math.round(item.height)}` : ''}
                      </p>
                      {item.status === 'converting' && (
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                          <div className="bg-[#518231] h-full transition-all duration-300" style={{ width: `${item.progress}%` }} />
                        </div>
                      )}
                      {item.status === 'success' && item.convertedSize && (
                        <p className="text-[9px] text-[#518231] font-semibold mt-0.5 flex items-center gap-0.5">
                          <Check size={10} /> PNG Generated ({formatBytes(item.convertedSize)})
                        </p>
                      )}
                      {item.status === 'error' && (
                        <p className="text-[9px] text-red-500 font-semibold mt-0.5 truncate" title={item.errorMsg}>
                          Error: {item.errorMsg}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                      {item.status === 'success' && (
                        <button
                          onClick={() => downloadSinglePng(item)}
                          className="p-1.5 text-slate-600 hover:text-[#518231] hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Download PNG"
                        >
                          <Download size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => removeQueueItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Settings */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Settings size={16} className="text-[#518231]" /> Export Settings
              </h3>

              {/* Background Option */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Palette size={14} className="text-slate-400" /> Background Fill
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['transparent', 'white', 'black', 'custom'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBackgroundType(type)}
                      className={`px-2 py-1.5 text-xs font-semibold rounded-lg border transition-all capitalize ${backgroundType === type ? 'bg-[#518231]/10 border-[#518231] text-[#518231]' : 'bg-transparent border-slate-200 hover:bg-slate-50 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-800/50 dark:text-slate-400'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {backgroundType === 'custom' && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="color"
                      value={customBgColor}
                      onChange={e => setCustomBgColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={customBgColor}
                      onChange={e => setCustomBgColor(e.target.value)}
                      className="flex-1 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Preset Sizes */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Maximize size={14} className="text-slate-400" /> Dimension Presets
                </label>
                <div className="relative">
                  <select
                    value={sizePreset}
                    onChange={(e) => setSizePreset(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 appearance-none focus:outline-none focus:ring-2 focus:ring-[#518231] cursor-pointer"
                  >
                    <option value="original">Original Aspect Ratio</option>
                    <option value="favicon-16">Favicon Standard (16×16)</option>
                    <option value="favicon-32">Favicon High-DPI (32×32)</option>
                    <option value="favicon-48">Favicon Large (48×48)</option>
                    <option value="social-icon">Social Avatar (256×256)</option>
                    <option value="app-icon">App Store Icon (512×512)</option>
                    <option value="youtube">YouTube Channel Icon (800×800)</option>
                    <option value="instagram">Instagram Post (1080×1080)</option>
                    <option value="twitter">Twitter Profile (400×400)</option>
                    <option value="custom">Custom Dimensions</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>

              {/* Resolution Sizing */}
              {sizePreset === 'original' ? (
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                    <Sliders size={14} className="text-slate-400" /> Resolution Scale Multiplier
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {([1, 2, 4, 8] as const).map((factor) => (
                      <button
                        key={factor}
                        type="button"
                        onClick={() => setScaleFactor(factor)}
                        className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all ${scaleFactor === factor ? 'bg-[#518231]/10 border-[#518231] text-[#518231]' : 'bg-transparent border-slate-200 hover:bg-slate-50 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-800/50 dark:text-slate-400'}`}
                      >
                        {factor}x {factor > 1 && factor <= 4 ? '(Retina)' : factor > 4 ? '(Super)' : '(Standard)'}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Width (px)</label>
                    <input
                      type="number"
                      min="1"
                      max="8192"
                      value={customWidth}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#518231]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Height (px)</label>
                    <input
                      type="number"
                      min="1"
                      max="8192"
                      value={customHeight}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#518231]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                      <input
                        type="checkbox"
                        checked={lockAspectRatio}
                        onChange={(e) => setLockAspectRatio(e.target.checked)}
                        className="rounded border-slate-300 dark:border-slate-800 text-[#518231] focus:ring-[#518231] w-3.5 h-3.5"
                      />
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Lock original aspect ratio</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Conversion Actions */}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  disabled={!activeItem || activeItem.status === 'converting'}
                  onClick={handleSingleConversion}
                  className="flex-1 py-3 bg-[#518231] hover:bg-[#436a28] text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {activeItem && activeItem.status === 'converting' ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />} Render PNG
                </button>
              </div>
            </div>

            {/* Vector metrics details */}
            {activeItemAnalysis && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <Layers size={16} className="text-[#518231]" /> Diagnostic Metrics
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Complexity</span>
                    <span className={`text-sm font-bold ${activeItemAnalysis.complexity === 'Complex' ? 'text-amber-500' : 'text-[#518231]'}`}>
                      {activeItemAnalysis.complexity}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Elements</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{activeItemAnalysis.elementCount}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">viewBox</span>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate block mt-0.5">
                      {activeItemAnalysis.viewBox || 'None'}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Original Resolution</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
                      {activeItemAnalysis.width ? Math.round(activeItemAnalysis.width) : '512'} × {activeItemAnalysis.height ? Math.round(activeItemAnalysis.height) : '512'} px
                    </span>
                  </div>
                </div>

                {/* Sub Element breakdown */}
                <div className="flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-350 bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-100 dark:border-slate-800 font-mono">
                  <div className="flex justify-between">
                    <span>Path tags (&lt;path&gt;):</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{activeItemAnalysis.pathCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Basic shapes (rect, circle):</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{activeItemAnalysis.shapeCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Text labels (&lt;text&gt;):</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{activeItemAnalysis.textCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resource Defs (&lt;defs&gt;):</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{activeItemAnalysis.defsCount}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Dynamic live preview, editor or optimization panels */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Main Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 shrink-0">
              <button 
                onClick={() => setActiveTab("editor")} 
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'editor' ? 'border-[#518231] text-[#518231] bg-[#518231]/5' : 'border-transparent text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-slate-200'}`}
              >
                <FileCode size={16} /> Code Editor & Live Preview
              </button>
              <button 
                onClick={() => setActiveTab("suggestions")} 
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'suggestions' ? 'border-[#518231] text-[#518231] bg-[#518231]/5' : 'border-transparent text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-slate-200'}`}
              >
                <Sparkle size={16} /> SVG Optimizer
              </button>
            </div>

            {/* TAB 1: CODE EDITOR & PREVIEW */}
            {activeTab === 'editor' && (
              <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden min-h-[550px]">
                
                {/* Visual Viewport Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 flex-1 min-h-[350px]">
                  
                  {/* Original SVG Visualizer */}
                  <div className="flex flex-col bg-slate-50 dark:bg-slate-950 p-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Scalable Vector (SVG)</span>
                    <div className="flex-1 flex items-center justify-center min-h-[220px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl relative overflow-hidden pattern-checkerboard">
                      {editorCode ? (
                        <div 
                          className="max-w-full max-h-[260px] p-2 flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: editorCode }}
                        />
                      ) : (
                        <div className="text-slate-400 text-xs italic">No vector loaded</div>
                      )}
                    </div>
                  </div>

                  {/* Rendered Output PNG */}
                  <div className="flex flex-col bg-slate-50 dark:bg-slate-950 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rasterized Image (PNG)</span>
                      {activeItem?.status === 'success' && activeItem.convertedSize && (
                        <span className="text-[10px] font-bold text-[#518231] uppercase tracking-wider">
                          Size: {formatBytes(activeItem.convertedSize)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-center min-h-[220px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl relative overflow-hidden pattern-checkerboard">
                      {activeItem?.convertedUrl ? (
                        <img
                          src={activeItem.convertedUrl}
                          alt="Converted PNG Output"
                          className="max-w-full max-h-[260px] p-2 object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-1.5 text-slate-400 text-xs italic">
                          <span>Pending Render</span>
                          <button
                            onClick={handleSingleConversion}
                            className="px-2.5 py-1.5 bg-[#518231]/10 hover:bg-[#518231]/20 text-[#518231] font-semibold text-[10px] rounded-lg transition-colors not-italic mt-1"
                          >
                            Click to Render
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Monaco Editor Section */}
                <div className="flex flex-col border-t border-slate-200 dark:border-slate-800 h-[280px]">
                  <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-350 flex items-center gap-1.5">
                      <Code size={14} /> Source XML Markup
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          try {
                            if (typeof navigator !== 'undefined' && navigator.clipboard) {
                              const text = await navigator.clipboard.readText();
                              handleEditorChange(text);
                            }
                          } catch {}
                        }}
                        className="text-[10px] font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded transition-colors"
                      >
                        Paste Code
                      </button>
                      <button
                        onClick={() => {
                          if (editorCode) {
                            navigator.clipboard.writeText(editorCode);
                            setSuccessMsg("SVG markup copied to clipboard!");
                            setTimeout(() => setSuccessMsg(null), 2000);
                          }
                        }}
                        className="text-[10px] font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded transition-colors"
                      >
                        Copy Code
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    <Editor
                      height="100%"
                      language="xml"
                      theme={monacoTheme}
                      value={editorCode}
                      onChange={handleEditorChange}
                      options={{
                        minimap: { enabled: false },
                        wordWrap: 'on',
                        fontSize: 13,
                        padding: { top: 12, bottom: 12 },
                        lineNumbersMinChars: 3
                      }}
                    />
                  </div>

                  {xmlError && (
                    <div className="bg-red-500/10 text-red-500 px-4 py-2 border-t border-red-500/20 text-xs font-mono truncate">
                      XML Parsing Warning: {xmlError}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: SVG OPTIMIZER */}
            {activeTab === 'suggestions' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-5 min-h-[550px]">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Sparkle size={16} className="text-[#518231]" /> SVG Code Optimizer
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Analyze XML tree and strip non-standard code tags (Adobe, Inkscape, comments, namespace tags).
                    </p>
                  </div>
                  <button
                    onClick={handleOptimizeSvg}
                    disabled={!editorCode || isOptimizing}
                    className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white font-bold rounded-xl text-xs shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isOptimizing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />} Optimize Code
                  </button>
                </div>

                {optStats && (
                  <div className="grid grid-cols-4 gap-3 bg-green-50 dark:bg-green-950/10 border border-green-200/50 dark:border-green-900/20 p-4 rounded-xl">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Before Size</span>
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">{formatBytes(optStats.original)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Optimized Size</span>
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">{formatBytes(optStats.optimized)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bytes Saved</span>
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">{formatBytes(optStats.saved)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#518231] uppercase tracking-wider block">Saved Ratio</span>
                      <span className="text-xs font-mono font-bold text-[#518231]">{optStats.percent.toFixed(1)}%</span>
                    </div>
                  </div>
                )}

                {/* Optimization audit checklist */}
                {activeItemAnalysis && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Optimization Suggestions Audit:</h4>
                    
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        {activeItemAnalysis.hasMetadata ? (
                          <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Redundant Editor Metadata</h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {activeItemAnalysis.hasMetadata 
                              ? "Detected namespaces/tags from Adobe Illustrator or Inkscape. Storing these inside the vector adds extra bytes." 
                              : "Clean. No proprietary graphics editor metadata detected."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        {activeItemAnalysis.hasComments ? (
                          <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">XML Comments</h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {activeItemAnalysis.hasComments 
                              ? "XML comments (<!-- -->) are present. These can be stripped to reduce coordinate payload weight." 
                              : "Clean. No comments detected inside file body."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        {activeItemAnalysis.hasEmptyGroups ? (
                          <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Empty Element Groups</h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {activeItemAnalysis.hasEmptyGroups 
                              ? "Empty groups (<g></g>) or unreferenced definitions found. These tags serve no visual purpose." 
                              : "Clean. No empty nodes or groups detected."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Batch actions bar at the bottom */}
            {queue.filter(item => item.status === 'success').length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center shadow-inner animate-in fade-in slide-in-from-bottom-2">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-[#518231]">
                    {queue.filter(item => item.status === 'success').length}
                  </span> of {queue.length} files successfully converted.
                </div>
                <button
                  onClick={downloadAllAsZip}
                  className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white font-bold rounded-lg text-xs shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <FileDown size={14} /> Download All (ZIP)
                </button>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
