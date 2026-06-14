"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Upload, Trash2, Download, Copy, RefreshCw, AlertCircle, CheckCircle2, Sparkles, X, Check, 
  Eye, HelpCircle, Code, FileCode, Layers, History, ShieldCheck, Info, FileText, 
  ChevronRight, ArrowRight, Smartphone, Monitor, Maximize2, ZoomIn, ZoomOut, Maximize, Minimize2
} from "lucide-react";

// Interfaces
interface DecodedItem {
  id: string;
  name: string;
  sizeEncoded: number;
  sizeDecoded: number;
  type: string; // MIME type
  width: number;
  height: number;
  dataUri: string;
  rawBase64: string;
  status: 'decoding' | 'success' | 'error';
  errorMsg?: string;
}

interface DecodeHistoryItem {
  id: string;
  name: string;
  sizeEncoded: number;
  type: string;
  timestamp: number;
  dataUri: string; // Truncated or stored fully depending on size
}

export function Base64ToImageTool() {
  // Mode state
  const [mode, setMode] = useState<'single' | 'batch'>('single');
  
  // Single mode state
  const [singleInput, setSingleInput] = useState<string>('');
  const [singleDecoded, setSingleDecoded] = useState<DecodedItem | null>(null);
  
  // Batch mode state
  const [batchQueue, setBatchQueue] = useState<DecodedItem[]>([]);
  const [activeBatchId, setActiveBatchId] = useState<string | null>(null);
  
  // UI states
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'react' | 'nextjs' | 'json' | 'api'>('html');
  const [activeSubView, setActiveSubView] = useState<'workspace' | 'history' | 'analyzer'>('workspace');
  const [lineWrap, setLineWrap] = useState<boolean>(true);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [recentDecodes, setRecentDecodes] = useState<DecodeHistoryItem[]>([]);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  
  // Preview Zoom & Styling settings
  const [zoom, setZoom] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showCheckerboard, setShowCheckerboard] = useState<boolean>(true);
  const [jpegBgColor, setJpegBgColor] = useState<string>('#ffffff');
  const [showBgPicker, setShowBgPicker] = useState<boolean>(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchFileInputRef = useRef<HTMLInputElement>(null);

  // Load history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedHistory = localStorage.getItem('base64_to_image_history');
        if (storedHistory) {
          setRecentDecodes(JSON.parse(storedHistory));
        }
      } catch (err) {
        console.error('Failed to load local storage logs', err);
      }
    }
  }, []);

  // Show copy checkmark helper
  const handleCopyText = (text: string, tabId: string) => {
    navigator.clipboard.writeText(text);
    setCopied(tabId);
    triggerNotification('success', 'Copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  // Helper: show toast notification
  const triggerNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Retrieve active item (single item or active batch item)
  const activeItem = useMemo(() => {
    if (mode === 'single') {
      return singleDecoded;
    } else {
      return batchQueue.find(item => item.id === activeBatchId) || null;
    }
  }, [mode, singleDecoded, batchQueue, activeBatchId]);

  // Clean and pad Base64 string helper
  const cleanAndPadBase64 = (str: string): string => {
    let clean = str.trim().replace(/^data:image\/[a-zA-Z+.-]+;base64,/, '');
    // Replace URL-safe characters
    clean = clean.replace(/-/g, '+').replace(/_/g, '/');
    
    // Pad with '=' if length is not a multiple of 4
    const mod = clean.length % 4;
    if (mod === 2) {
      clean += '==';
    } else if (mod === 3) {
      clean += '=';
    }
    return clean;
  };

  // Detect MIME type by checking the magic bytes at the beginning of the Base64 data
  const detectMimeTypeFromBase64 = (base64Clean: string): string => {
    try {
      const binaryString = window.atob(base64Clean.substring(0, 32));
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Check signatures
      // PNG: 89 50 4E 47
      if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
        return 'image/png';
      }
      // JPEG: FF D8 FF
      if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
        return 'image/jpeg';
      }
      // GIF: 47 49 46 38
      if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
        return 'image/gif';
      }
      // WEBP: RIFF + WEBP
      if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
          bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
        return 'image/webp';
      }
      // SVG: check text markup
      const textStart = binaryString.substring(0, 30).toLowerCase();
      if (textStart.includes('<svg') || textStart.includes('<?xml') || textStart.includes('<!doctype svg')) {
        return 'image/svg+xml';
      }
      // BMP: BM (42 4D)
      if (bytes[0] === 0x42 && bytes[1] === 0x4D) {
        return 'image/bmp';
      }
      // ICO: 00 00 01 00
      if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x01 && bytes[3] === 0x00) {
        return 'image/x-icon';
      }
    } catch (e) {
      // fail silently and fallback
    }
    return ''; // fallback to default parsing
  };

  // Get image dimensions dynamically in browser RAM
  const getImageDimensions = (dataUri: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        resolve({ width: 0, height: 0 });
      };
      img.src = dataUri;
    });
  };

  // Run decoding flow on single item
  const decodeBase64String = async (inputStr: string, name: string = 'decoded_image') => {
    if (!inputStr.trim()) {
      setSingleDecoded(null);
      return;
    }

    const id = `dec-${Date.now()}`;
    const cleanStr = inputStr.trim();
    
    // Auto-detect if input contains Data URI headers
    let mimeType = '';
    const match = cleanStr.match(/^data:(image\/[a-zA-Z+.-]+);base64,/);
    if (match) {
      mimeType = match[1];
    }

    const payload = cleanAndPadBase64(cleanStr);
    
    // Auto-detect format if not explicitly stated in header
    if (!mimeType) {
      mimeType = detectMimeTypeFromBase64(payload) || 'image/png'; // PNG fallback
    }

    const dataUri = cleanStr.startsWith('data:') ? cleanStr : `data:${mimeType};base64,${payload}`;

    const tempItem: DecodedItem = {
      id,
      name,
      sizeEncoded: cleanStr.length,
      sizeDecoded: Math.floor((payload.length * 3) / 4) - (payload.endsWith('==') ? 2 : payload.endsWith('=') ? 1 : 0),
      type: mimeType,
      width: 0,
      height: 0,
      dataUri,
      rawBase64: payload,
      status: 'decoding'
    };

    setSingleDecoded(tempItem);

    try {
      const { width, height } = await getImageDimensions(dataUri);
      
      // If width & height are both 0, the image is likely corrupted or unsupported format
      if (width === 0 && height === 0 && mimeType !== 'image/svg+xml') {
        throw new Error('Unsupported image format or corrupted base64 data.');
      }

      const successItem: DecodedItem = {
        ...tempItem,
        width,
        height,
        status: 'success'
      };

      setSingleDecoded(successItem);

      // Save to history log
      saveToHistory(successItem);
    } catch (err: any) {
      setSingleDecoded({
        ...tempItem,
        status: 'error',
        errorMsg: err.message || 'Failed to decode image string.'
      });
    }
  };

  // Save successful decode to localStorage history
  const saveToHistory = (item: DecodedItem) => {
    const truncatedDataUri = item.dataUri.length < 150000 ? item.dataUri : item.dataUri.substring(0, 100) + '...[truncated]';
    const historyItem: DecodeHistoryItem = {
      id: item.id,
      name: item.name,
      sizeEncoded: item.sizeEncoded,
      type: item.type,
      timestamp: Date.now(),
      dataUri: truncatedDataUri
    };

    setRecentDecodes(prev => {
      const next = [historyItem, ...prev].slice(0, 15);
      localStorage.setItem('base64_to_image_history', JSON.stringify(next));
      return next;
    });
  };

  // Handle single mode text change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (mode === 'single') {
        decodeBase64String(singleInput);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [singleInput, mode]);

  // Decode file from upload
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        if (mode === 'single') {
          setSingleInput(text);
          triggerNotification('success', 'File loaded into workspace.');
        } else {
          // Parse as batch input
          processBatchInputs([{ content: text, name: file.name }]);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.json')) {
        handleFileUpload(file);
      } else {
        triggerNotification('error', 'Only text files (.txt, .json) containing Base64 are supported.');
      }
    }
  };

  // Process batch inputs (supports multiple string blocks/files)
  const processBatchInputs = async (inputs: { content: string; name: string }[]) => {
    const newItems: DecodedItem[] = [];

    for (let i = 0; i < inputs.length; i++) {
      const { content, name } = inputs[i];
      const cleanStr = content.trim();
      if (!cleanStr) continue;

      // Check if it's a JSON file containing multiple payloads
      if (name.endsWith('.json')) {
        try {
          const parsed = JSON.parse(cleanStr);
          if (typeof parsed === 'object') {
            Object.entries(parsed).forEach(([key, val], idx) => {
              if (typeof val === 'string') {
                const subId = `batch-${Date.now()}-${i}-${idx}`;
                const subPayload = cleanAndPadBase64(val);
                const subMime = detectMimeTypeFromBase64(subPayload) || 'image/png';
                newItems.push({
                  id: subId,
                  name: `${name.replace('.json', '')}_${key}`,
                  sizeEncoded: val.length,
                  sizeDecoded: Math.floor((subPayload.length * 3) / 4) - (subPayload.endsWith('==') ? 2 : subPayload.endsWith('=') ? 1 : 0),
                  type: subMime,
                  width: 0,
                  height: 0,
                  dataUri: val.startsWith('data:') ? val : `data:${subMime};base64,${subPayload}`,
                  rawBase64: subPayload,
                  status: 'decoding'
                });
              }
            });
            continue;
          }
        } catch (e) {
          // Fallback to reading JSON as a raw Base64 string
        }
      }

      // Normal base64 text file
      const id = `batch-${Date.now()}-${i}`;
      const payload = cleanAndPadBase64(cleanStr);
      let mimeType = '';
      const match = cleanStr.match(/^data:(image\/[a-zA-Z+.-]+);base64,/);
      if (match) {
        mimeType = match[1];
      } else {
        mimeType = detectMimeTypeFromBase64(payload) || 'image/png';
      }

      newItems.push({
        id,
        name: name.replace(/\.[^/.]+$/, ""), // remove extension
        sizeEncoded: cleanStr.length,
        sizeDecoded: Math.floor((payload.length * 3) / 4) - (payload.endsWith('==') ? 2 : payload.endsWith('=') ? 1 : 0),
        type: mimeType,
        width: 0,
        height: 0,
        dataUri: cleanStr.startsWith('data:') ? cleanStr : `data:${mimeType};base64,${payload}`,
        rawBase64: payload,
        status: 'decoding'
      });
    }

    if (newItems.length === 0) return;

    setBatchQueue(prev => [...prev, ...newItems]);
    if (!activeBatchId) {
      setActiveBatchId(newItems[0].id);
    }

    // Process dimensions in background
    newItems.forEach(async (item) => {
      try {
        const { width, height } = await getImageDimensions(item.dataUri);
        setBatchQueue(prev => prev.map(q => {
          if (q.id === item.id) {
            return {
              ...q,
              width,
              height,
              status: (width > 0 || item.type === 'image/svg+xml') ? 'success' : 'error',
              errorMsg: (width > 0 || item.type === 'image/svg+xml') ? undefined : 'Corrupted base64 payload.'
            };
          }
          return q;
        }));
      } catch (err) {
        setBatchQueue(prev => prev.map(q => {
          if (q.id === item.id) {
            return { ...q, status: 'error', errorMsg: 'Failed to render image preview.' };
          }
          return q;
        }));
      }
    });

    triggerNotification('success', `Added ${newItems.length} item(s) to queue.`);
  };

  // Handle upload selection
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Handle batch multiple file upload
  const handleBatchFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const inputsPromise = fileList.map(file => {
        return new Promise<{ content: string; name: string }>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({ content: event.target?.result as string || '', name: file.name });
          };
          reader.readAsText(file);
        });
      });

      Promise.all(inputsPromise).then(inputs => {
        processBatchInputs(inputs);
      });
    }
  };

  // Download converted image files
  const downloadConvertedFile = (format: 'png' | 'jpeg' | 'webp') => {
    if (!activeItem || activeItem.status !== 'success') return;
    
    // For SVG format to vector, SVG file download is better as raw text.
    if (activeItem.type === 'image/svg+xml' && format === 'png' && zoom === 100) {
      // SVGs can be directly downloaded as svg, but let's render it on canvas for conversion
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 500;
      canvas.height = img.naturalHeight || 500;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (format === 'jpeg') {
        ctx.fillStyle = jpegBgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      try {
        const converted = canvas.toDataURL(`image/${format}`, 0.92);
        const a = document.createElement('a');
        a.href = converted;
        a.download = `${activeItem.name}_decoded.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        triggerNotification('success', `Image downloaded as ${format.toUpperCase()}`);
      } catch (err) {
        console.error(err);
        triggerNotification('error', 'Browser canvas security blocked local download.');
      }
    };
    img.src = activeItem.dataUri;
  };

  // Download original format directly
  const downloadOriginalFile = () => {
    if (!activeItem || activeItem.status !== 'success') return;

    // Check if SVG - we can download direct string representation
    if (activeItem.type === 'image/svg+xml') {
      try {
        const svgText = window.atob(activeItem.rawBase64);
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeItem.name}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        triggerNotification('success', 'Original SVG downloaded.');
        return;
      } catch (e) {
        // Fallback to normal download
      }
    }

    // Direct byte download
    try {
      const byteCharacters = window.atob(activeItem.rawBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: activeItem.type });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Determine file extension
      let ext = 'png';
      if (activeItem.type.includes('jpeg') || activeItem.type.includes('jpg')) ext = 'jpg';
      else if (activeItem.type.includes('webp')) ext = 'webp';
      else if (activeItem.type.includes('gif')) ext = 'gif';
      else if (activeItem.type.includes('x-icon') || activeItem.type.includes('microsoft.icon')) ext = 'ico';
      else if (activeItem.type.includes('bmp')) ext = 'bmp';

      a.download = `${activeItem.name}_original.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      triggerNotification('success', 'Downloaded original image!');
    } catch (err) {
      console.error(err);
      triggerNotification('error', 'Failed to compile original binary file.');
    }
  };

  // ZIP download for batch queue using JSZip
  const downloadBatchZip = async () => {
    if (batchQueue.length === 0) return;
    setIsZipping(true);
    try {
      const JSZipLib = (await import('jszip')).default;
      const zip = new JSZipLib();
      
      batchQueue.forEach((item, index) => {
        if (item.status === 'success') {
          try {
            const byteCharacters = window.atob(item.rawBase64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            
            let ext = 'png';
            if (item.type.includes('jpeg') || item.type.includes('jpg')) ext = 'jpg';
            else if (item.type.includes('webp')) ext = 'webp';
            else if (item.type.includes('gif')) ext = 'gif';
            else if (item.type.includes('svg')) ext = 'svg';
            else if (item.type.includes('x-icon')) ext = 'ico';
            else if (item.type.includes('bmp')) ext = 'bmp';

            zip.file(`${item.name || `image_${index}`}.${ext}`, byteArray);
          } catch (e) {
            console.error('Failed to add file to ZIP', item.name, e);
          }
        }
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'decoded_images_archive.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      triggerNotification('success', 'ZIP archive generated and downloaded!');
    } catch (err) {
      console.error(err);
      triggerNotification('error', 'Failed to generate ZIP archive.');
    } finally {
      setIsZipping(false);
    }
  };

  // Export batch queue details as JSON mapping
  const downloadBatchJsonManifest = () => {
    if (batchQueue.length === 0) return;
    const manifestObj: Record<string, string> = {};
    batchQueue.forEach(item => {
      if (item.status === 'success') {
        manifestObj[item.name] = item.dataUri;
      }
    });

    const blob = new Blob([JSON.stringify(manifestObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'decoded_batch_manifest.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerNotification('success', 'JSON manifest downloaded.');
  };

  // Code snippets generation
  const generatedCode = useMemo(() => {
    if (!activeItem || activeItem.status !== 'success') return '';
    const uri = activeItem.dataUri;
    const name = activeItem.name;
    const cleanBase64 = activeItem.rawBase64;
    const type = activeItem.type;

    switch (activeTab) {
      case 'html':
        return `<img src="${uri}" alt="${name}" width="${activeItem.width}" height="${activeItem.height}" />`;
      case 'css':
        return `.embedded-image {\n  background-image: url("${uri}");\n  background-size: contain;\n  background-repeat: no-repeat;\n  width: ${activeItem.width}px;\n  height: ${activeItem.height}px;\n}`;
      case 'react':
        return `import React from 'react';\n\nconst EMBEDDED_IMAGE = "${uri}";\n\nexport function DecodedPreview() {\n  return (\n    <img \n      src={EMBEDDED_IMAGE} \n      alt="${name}" \n      width={${activeItem.width}} \n      height={${activeItem.height}} \n      loading="lazy" \n    />\n  );\n}`;
      case 'nextjs':
        return `import Image from 'next/image';\n\nexport function NextImageBlurPlaceholder() {\n  return (\n    <Image\n      src="/path-to-your-real-image.png"\n      alt="${name}"\n      width={${activeItem.width || 500}}\n      height={${activeItem.height || 500}}\n      placeholder="blur"\n      blurDataURL="${uri}"\n    />\n  );\n}`;
      case 'json':
        return `{\n  "status": "success",\n  "fileName": "${name}",\n  "mimeType": "${type}",\n  "encodedLength": ${activeItem.sizeEncoded},\n  "decodedLength": ${activeItem.sizeDecoded},\n  "dataUri": "${uri}"\n}`;
      case 'api':
        return `// POST request sending base64 payload to endpoints\nfetch('/api/v1/upload-avatar', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    image: "${uri}",\n    fileName: "${name}.${type.split('/')[1] || 'png'}"\n  })\n})\n.then(res => res.json())\n.then(data => console.log('Upload successful:', data));`;
      default:
        return '';
    }
  }, [activeItem, activeTab]);

  // Truncation optimizer for displaying long base64 strings in UI
  const MAX_DISPLAY_CHARS = 10000;
  const isDisplayTruncated = generatedCode.length > MAX_DISPLAY_CHARS;
  const displayCode = useMemo(() => {
    if (isDisplayTruncated) {
      return generatedCode.substring(0, MAX_DISPLAY_CHARS) + `\n\n... [Code truncated for browser performance. Showing ${MAX_DISPLAY_CHARS.toLocaleString()} of ${generatedCode.length.toLocaleString()} characters. Click "Copy" above to copy the full integration code.]`;
    }
    return generatedCode;
  }, [generatedCode, isDisplayTruncated]);

  // Analytics comparison data
  const sizeComparison = useMemo(() => {
    if (!activeItem || activeItem.status !== 'success') return null;
    const encoded = activeItem.sizeEncoded;
    const decoded = activeItem.sizeDecoded;
    const difference = encoded - decoded;
    const percentage = ((difference / decoded) * 100).toFixed(1);
    
    let advice = 'Excellent for inlining.';
    let adviceColor = 'text-emerald-500';
    if (decoded > 15360) {
      advice = 'File size is large. Inlining inside HTML/CSS will bloat your bundles and impact site load times. Consider using standard static linking instead.';
      adviceColor = 'text-amber-500 dark:text-amber-400';
    } else if (decoded > 5120) {
      advice = 'Moderate size. Inlining is okay for isolated components, but avoid using too many base64 images of this size on a single page.';
      adviceColor = 'text-blue-500';
    }

    return {
      encoded: activeItem.sizeEncoded,
      decoded: activeItem.sizeDecoded,
      diff: difference,
      percent: percentage,
      advice,
      adviceColor
    };
  }, [activeItem]);

  // Load a demo string
  const loadDemo = (inputVal: string, nameVal: string) => {
    if (mode === 'single') {
      setSingleInput(inputVal);
    } else {
      processBatchInputs([{ content: inputVal, name: nameVal }]);
    }
    triggerNotification('success', 'Demo Base64 image loaded.');
  };

  // Load history item back to queue/workspace
  const loadFromHistory = (histItem: DecodeHistoryItem) => {
    if (histItem.dataUri.includes('[truncated]')) {
      triggerNotification('error', 'Original Base64 data was too large for history cache. Please upload or paste it again.');
      return;
    }

    if (mode === 'single') {
      setSingleInput(histItem.dataUri);
      setActiveSubView('workspace');
    } else {
      // Check if already in queue
      const existing = batchQueue.find(q => q.id === histItem.id);
      if (existing) {
        setActiveBatchId(histItem.id);
      } else {
        const payload = cleanAndPadBase64(histItem.dataUri);
        const newItem: DecodedItem = {
          id: histItem.id,
          name: histItem.name,
          sizeEncoded: histItem.sizeEncoded,
          sizeDecoded: Math.floor((payload.length * 3) / 4) - (payload.endsWith('==') ? 2 : payload.endsWith('=') ? 1 : 0),
          type: histItem.type,
          width: 0,
          height: 0,
          dataUri: histItem.dataUri,
          rawBase64: payload,
          status: 'decoding'
        };
        setBatchQueue(prev => [...prev, newItem]);
        setActiveBatchId(newItem.id);
        
        // Find dimensions
        getImageDimensions(histItem.dataUri).then(({ width, height }) => {
          setBatchQueue(prev => prev.map(q => {
            if (q.id === newItem.id) {
              return { ...q, width, height, status: 'success' };
            }
            return q;
          }));
        });
      }
      setActiveSubView('workspace');
    }
    triggerNotification('success', 'Loaded item from cache.');
  };

  // Zoom helpers
  const zoomIn = () => setZoom(prev => Math.min(prev + 25, 500));
  const zoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const resetZoom = () => setZoom(100);
  const fitToScreen = () => {
    // Arbitrary auto scale for fitting workspace
    setZoom(85);
  };

  // Clear single mode
  const handleClearSingle = () => {
    setSingleInput('');
    setSingleDecoded(null);
    triggerNotification('success', 'Workspace cleared.');
  };

  // Clear batch mode queue
  const handleClearBatch = () => {
    setBatchQueue([]);
    setActiveBatchId(null);
    triggerNotification('success', 'Batch queue cleared.');
  };

  // Delete individual batch item
  const handleDeleteBatchItem = (id: string) => {
    setBatchQueue(prev => prev.filter(item => item.id !== id));
    if (activeBatchId === id) {
      const remaining = batchQueue.filter(item => item.id !== id);
      setActiveBatchId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl text-white animate-fade-in transition-all ${
          notification.type === 'success' ? 'bg-[#518231]' : 'bg-red-600'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Primary Toolbar / Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
        {/* Modes */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
          <button
            onClick={() => {
              setMode('single');
              setActiveSubView('workspace');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              mode === 'single' && activeSubView === 'workspace'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye size={16} />
            Single Decoder
          </button>
          <button
            onClick={() => {
              setMode('batch');
              setActiveSubView('workspace');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              mode === 'batch' && activeSubView === 'workspace'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers size={16} />
            Batch Decoder
          </button>
        </div>

        {/* Dashboard Sub-tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubView('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border transition-all ${
              activeSubView === 'history'
                ? 'bg-[#518231]/10 border-[#518231] text-[#518231]'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <History size={16} />
            History Log
          </button>
          
          <button
            onClick={() => setActiveSubView('analyzer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border transition-all ${
              activeSubView === 'analyzer'
                ? 'bg-blue-500/10 border-blue-500 text-blue-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Info size={16} />
            Size Analyzer
          </button>

          {/* Demos */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900">
              <Sparkles size={14} className="text-amber-500" />
              Load Example
            </button>
            <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-lg py-1.5 w-56 z-30">
              <button 
                onClick={() => loadDemo('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'transparent_red_dot.png')}
                className="w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                1x1 Red transparent PNG
              </button>
              <button 
                onClick={() => loadDemo('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==', 'blue_square.png')}
                className="w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                5x5 Blue square PNG
              </button>
              <button 
                onClick={() => loadDemo('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iIzUxODIzMSIvPjwvc3ZnPg==', 'green_circle.svg')}
                className="w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Vector Green Circle SVG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-emerald-800 dark:text-emerald-300">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Privacy First: All decoding occurs locally in your browser. Your base64 strings and files are never uploaded.</span>
        </div>
      </div>

      {/* Main workspaces */}
      {activeSubView === 'workspace' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Input Panel (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {mode === 'single' ? 'Base64 Input String' : 'Batch File Upload'}
              </label>
              <div className="flex items-center gap-2">
                {mode === 'single' && (
                  <button 
                    onClick={() => setLineWrap(!lineWrap)}
                    className={`text-xs px-2 py-1 rounded transition-colors ${lineWrap ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}
                  >
                    Line Wrap
                  </button>
                )}
                <button
                  onClick={mode === 'single' ? handleClearSingle : handleClearBatch}
                  className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-medium transition-colors"
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              </div>
            </div>

            {/* Input fields */}
            {mode === 'single' ? (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl transition-all ${
                  dragActive 
                    ? 'border-[#518231] bg-[#518231]/5' 
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40'
                }`}
              >
                <textarea
                  value={singleInput}
                  onChange={(e) => setSingleInput(e.target.value)}
                  placeholder="Paste your Base64 string or Data URI here (e.g. data:image/png;base64,iVBORw0KGgoAAA...)... or drag and drop a .txt/.json file."
                  className={`w-full h-80 p-4 text-xs font-mono bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none custom-scrollbar ${
                    lineWrap ? 'break-all whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto'
                  }`}
                  aria-label="Base64 Input"
                />
                
                {singleInput.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-400 p-6 text-center space-y-3">
                    <Upload size={32} className="text-slate-300 dark:text-slate-700" />
                    <div>
                      <p className="text-sm font-medium text-slate-500">Drag & drop a text file here</p>
                      <p className="text-xs text-slate-400 mt-1">Or paste a Base64 string inside the box</p>
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="pointer-events-auto px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-slate-50 text-slate-700 dark:text-slate-300 shadow-sm"
                    >
                      Browse File
                    </button>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileInputChange} 
                  accept=".txt,.json" 
                  className="hidden" 
                />
              </div>
            ) : (
              // Batch mode files queue & drag drop
              <div className="space-y-4">
                <div 
                  onClick={() => batchFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#518231] hover:bg-[#518231]/5 transition-all group"
                >
                  <Upload size={36} className="text-slate-400 group-hover:text-[#518231] mb-3 transition-colors" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Select Multiple Files to Decode</p>
                  <p className="text-xs text-slate-400 mt-1">Upload multiple .txt or .json files containing Base64 strings</p>
                  <input
                    type="file"
                    ref={batchFileInputRef}
                    onChange={handleBatchFileInputChange}
                    accept=".txt,.json"
                    multiple
                    className="hidden"
                  />
                </div>

                {/* Queue list */}
                {batchQueue.length > 0 && (
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Decoding Queue ({batchQueue.length} files)</div>
                    {batchQueue.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => setActiveBatchId(item.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                          activeBatchId === item.id 
                            ? 'bg-[#518231]/10 border-[#518231]' 
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {item.status === 'success' ? (
                            <img 
                              src={item.dataUri} 
                              alt="thumb" 
                              className="w-10 h-10 object-cover rounded border border-slate-200 dark:border-slate-800 bg-slate-100"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-400 shrink-0">
                              {item.status === 'decoding' ? <RefreshCw className="animate-spin text-blue-500" size={16} /> : <AlertCircle className="text-red-500" size={16} />}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-bold truncate text-slate-800 dark:text-slate-200">{item.name}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {item.status === 'success' ? `${item.width}x${item.height} • ${item.type.split('/')[1]?.toUpperCase()}` : item.status === 'decoding' ? 'Decoding...' : 'Error decoding'}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBatchItem(item.id);
                          }}
                          className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                          aria-label="Remove"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Error notifications */}
            {activeItem && activeItem.status === 'error' && (
              <div className="flex gap-2.5 p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-700 dark:text-red-300">
                <AlertCircle className="shrink-0 text-red-500 mt-0.5" size={18} />
                <div className="text-xs space-y-1">
                  <p className="font-bold">Decoding Error</p>
                  <p>{activeItem.errorMsg || 'Failed to decode the Base64 input. Please make sure the string is valid Base64 or a properly formatted Data URI.'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <span>Decoded Image Preview</span>
                {activeItem?.status === 'success' && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#518231]/10 text-[#518231] rounded">
                    {activeItem.type.split('/')[1]?.toUpperCase()}
                  </span>
                )}
              </h2>
              
              {/* Zoom controls */}
              {activeItem?.status === 'success' && (
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                  <button onClick={zoomOut} className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded transition-all text-slate-500" title="Zoom Out">
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-xs font-mono px-2 text-slate-700 dark:text-slate-300 min-w-[44px] text-center">{zoom}%</span>
                  <button onClick={zoomIn} className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded transition-all text-slate-500" title="Zoom In">
                    <ZoomIn size={14} />
                  </button>
                  <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-1"></div>
                  <button onClick={resetZoom} className="text-[10px] font-medium px-2 py-0.5 hover:bg-white dark:hover:bg-slate-800 rounded transition-all text-slate-600 dark:text-slate-400">
                    Reset
                  </button>
                  <button onClick={fitToScreen} className="text-[10px] font-medium px-2 py-0.5 hover:bg-white dark:hover:bg-slate-800 rounded transition-all text-slate-600 dark:text-slate-400">
                    Fit
                  </button>
                </div>
              )}
            </div>

            {/* Preview Box */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col h-96 relative">
              {/* Background Toggles */}
              {activeItem?.status === 'success' && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 p-1 border border-slate-200 dark:border-slate-800 shadow-sm rounded-lg">
                  <button
                    onClick={() => setShowCheckerboard(!showCheckerboard)}
                    className={`text-[10px] px-2 py-1 rounded transition-all font-semibold ${
                      showCheckerboard 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Checkerboard
                  </button>
                  
                  {/* JPG Background Picker */}
                  <div className="relative">
                    <button
                      onClick={() => setShowBgPicker(!showBgPicker)}
                      className="text-[10px] px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 font-semibold"
                    >
                      JPG BG Color
                    </button>
                    {showBgPicker && (
                      <div className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-lg p-2.5 z-40 w-36">
                        <div className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase">Set JPEG BG</div>
                        <div className="flex gap-1 mb-2">
                          {['#ffffff', '#000000', '#f1f5f9', '#ef4444', '#3b82f6'].map(color => (
                            <button
                              key={color}
                              onClick={() => {
                                setJpegBgColor(color);
                                setShowBgPicker(false);
                              }}
                              className={`w-5 h-5 rounded-full border border-slate-200 ${
                                jpegBgColor === color ? 'ring-2 ring-[#518231]' : ''
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <input 
                          type="color" 
                          value={jpegBgColor}
                          onChange={(e) => setJpegBgColor(e.target.value)}
                          className="w-full h-6 rounded cursor-pointer border border-slate-200 p-0"
                        />
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => setIsFullscreen(true)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500"
                    title="Fullscreen"
                  >
                    <Maximize2 size={12} />
                  </button>
                </div>
              )}

              {/* View workspace */}
              <div 
                className="flex-1 overflow-auto flex items-center justify-center p-6 custom-scrollbar"
                style={showCheckerboard ? {
                  backgroundImage: 'conic-gradient(rgba(0,0,0,0.06) 0.25turn, transparent 0.25turn 0.5turn, rgba(0,0,0,0.06) 0.5turn 0.75turn, transparent 0.75turn)',
                  backgroundSize: '20px 20px',
                  backgroundColor: 'rgba(255,255,255,0.05)'
                } : { backgroundColor: 'transparent' }}
              >
                {activeItem?.status === 'success' ? (
                  activeItem.type === 'image/svg+xml' ? (
                    // Vector SVG rendering directly
                    <div 
                      style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center', transition: 'transform 0.1s' }}
                      dangerouslySetInnerHTML={{ __html: window.atob(activeItem.rawBase64) }}
                      className="max-w-full max-h-full"
                    />
                  ) : (
                    <img
                      src={activeItem.dataUri}
                      alt="Decoded output"
                      style={{ 
                        transform: `scale(${zoom / 100})`, 
                        transition: 'transform 0.1s',
                        transformOrigin: 'center center' 
                      }}
                      className="max-w-full max-h-full object-contain shadow-sm border border-slate-200/40 dark:border-slate-800/40"
                    />
                  )
                ) : activeItem?.status === 'decoding' ? (
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <RefreshCw className="animate-spin text-[#518231]" size={36} />
                    <p className="text-sm font-medium">Decoding image in RAM...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400 text-center max-w-sm px-6">
                    <Monitor size={48} className="text-slate-300 dark:text-slate-800 mb-2" />
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Awaiting Valid Base64 Input</p>
                    <p className="text-xs text-slate-400">Paste an encoded string on the left panel or load a demo file to render the live image canvas.</p>
                  </div>
                )}
              </div>
              
              {/* Info ribbon at bottom */}
              {activeItem?.status === 'success' && (
                <div className="bg-slate-100/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <div className="flex items-center gap-4">
                    <span>MIME: <span className="font-bold text-slate-700 dark:text-slate-300">{activeItem.type}</span></span>
                    <span>Resolution: <span className="font-bold text-slate-700 dark:text-slate-300">{activeItem.width}x{activeItem.height} px</span></span>
                  </div>
                  <span>Size: <span className="font-bold text-[#518231]">{activeItem.sizeDecoded.toLocaleString()} B</span></span>
                </div>
              )}
            </div>

            {/* Export Toolbar (Downloads) */}
            {activeItem?.status === 'success' && (
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadOriginalFile}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#518231] hover:bg-[#518231]/90 rounded-lg shadow-sm transition-all"
                  >
                    <Download size={14} />
                    Download Original
                  </button>
                  <button
                    onClick={() => downloadConvertedFile('png')}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg shadow-sm transition-all"
                  >
                    Download PNG
                  </button>
                  <button
                    onClick={() => downloadConvertedFile('jpeg')}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg shadow-sm transition-all"
                  >
                    Download JPG
                  </button>
                  <button
                    onClick={() => downloadConvertedFile('webp')}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg shadow-sm transition-all"
                  >
                    Download WEBP
                  </button>
                </div>

                {/* Batch buttons */}
                {mode === 'batch' && batchQueue.length > 0 && (
                  <div className="flex items-center gap-2 border-t md:border-t-0 md:pt-0 pt-3 border-slate-100 dark:border-slate-800 w-full md:w-auto justify-end">
                    <button
                      onClick={downloadBatchZip}
                      disabled={isZipping}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all disabled:opacity-50"
                    >
                      <Download size={14} />
                      {isZipping ? 'Zipping...' : 'Download ZIP'}
                    </button>
                    <button
                      onClick={downloadBatchJsonManifest}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-all"
                    >
                      Export Manifest
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      )}

      {/* History Log view */}
      {activeSubView === 'history' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">Local Decode History</h3>
              <p className="text-xs text-slate-400 mt-0.5">Your recently decoded images logs stored locally in your browser cache.</p>
            </div>
            <button
              onClick={() => {
                setRecentDecodes([]);
                localStorage.removeItem('base64_to_image_history');
                triggerNotification('success', 'History purged.');
              }}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 size={12} />
              Purge History
            </button>
          </div>

          {recentDecodes.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <History size={36} className="mx-auto text-slate-300 dark:text-slate-800 mb-3" />
              <p className="text-sm font-semibold">No recent decodes found</p>
              <p className="text-xs mt-1">Successfully decoded strings will populate here for quick recovery.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {recentDecodes.map(item => (
                <div 
                  key={item.id}
                  onClick={() => loadFromHistory(item)}
                  className="flex items-center gap-4 p-3 border border-slate-100 dark:border-slate-800 hover:border-[#518231] bg-slate-50/50 dark:bg-slate-950/20 hover:bg-[#518231]/5 rounded-lg cursor-pointer transition-all"
                >
                  {!item.dataUri.includes('[truncated]') ? (
                    <img 
                      src={item.dataUri} 
                      alt={item.name} 
                      className="w-12 h-12 object-cover rounded border border-slate-200 dark:border-slate-800 bg-white"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-slate-200 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 font-mono text-[9px] text-center font-bold">
                      LARGE
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      {item.type} • {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Size Analyzer View */}
      {activeSubView === 'analyzer' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">Developer Analytics Dashboard</h3>
            <p className="text-xs text-slate-400 mt-0.5">Analyze Base64 text inflation ratios, network overhead, and loading recommendations.</p>
          </div>

          {sizeComparison ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Original Binary Size</div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">
                    {sizeComparison.decoded.toLocaleString()} <span className="text-xs font-medium text-slate-500">Bytes</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Decoded pure data</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Base64 Encoded Size</div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">
                    {sizeComparison.encoded.toLocaleString()} <span className="text-xs font-medium text-slate-500">Chars</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Including URI metadata tags</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overhead Increase</div>
                  <div className="text-2xl font-black text-red-500 mt-1">
                    +{sizeComparison.percent}%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Inflated data size</div>
                </div>
              </div>

              {/* Progress visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">Size comparison index</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Decoded ({Math.round((sizeComparison.decoded / sizeComparison.encoded) * 100)}%) vs Encoded (100%)
                  </span>
                </div>
                <div className="w-full h-3 bg-red-100 dark:bg-red-950/30 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-emerald-500" 
                    style={{ width: `${(sizeComparison.decoded / sizeComparison.encoded) * 100}%` }}
                  />
                </div>
              </div>

              {/* Audit recommendation */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                <div className="flex gap-2.5 items-start">
                  <Info className="text-[#518231] shrink-0 mt-0.5" size={18} />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-800 dark:text-slate-200">Network Performance Recommendation</p>
                    <p className={sizeComparison.adviceColor}>{sizeComparison.advice}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400">
              <Info size={36} className="mx-auto text-slate-300 dark:text-slate-800 mb-3" />
              <p className="text-sm font-semibold">No active file to analyze</p>
              <p className="text-xs mt-1">Decode a Base64 string to analyze file size performance comparisons.</p>
            </div>
          )}
        </div>
      )}

      {/* Code Exporter Panel */}
      {activeItem?.status === 'success' && activeSubView === 'workspace' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'html', label: 'HTML <img>' },
                { id: 'css', label: 'CSS Background' },
                { id: 'react', label: 'React JSX' },
                { id: 'nextjs', label: 'Next.js Image' },
                { id: 'json', label: 'JSON Payload' },
                { id: 'api', label: 'API Example' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs px-3 py-1.5 font-semibold rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => handleCopyText(generatedCode, activeTab)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/20 rounded-md transition-all"
              >
                {copied === activeTab ? <Check size={14} /> : <Copy size={14} />}
                {copied === activeTab ? 'Copied' : 'Copy Snippet'}
              </button>
              
              <button
                onClick={() => {
                  const blob = new Blob([generatedCode], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${activeItem.name}_snippet.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  triggerNotification('success', 'Snippet text downloaded.');
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-700 dark:text-slate-300 transition-all"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>

          {/* Snippet box */}
          <div className="relative">
            <pre className="p-4 bg-slate-950 dark:bg-slate-950/80 text-slate-300 rounded-xl text-xs font-mono overflow-x-auto custom-scrollbar max-h-72 whitespace-pre leading-relaxed select-all">
              <code>{displayCode}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Fullscreen view modal */}
      {isFullscreen && activeItem && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          {/* Header toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-900 bg-slate-950/80">
            <span className="text-xs font-mono text-slate-400">{activeItem.name} • {activeItem.width}x{activeItem.height} px</span>
            <button 
              onClick={() => setIsFullscreen(false)}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
              aria-label="Close Fullscreen"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* View workspace */}
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-950 overflow-auto">
            {activeItem.type === 'image/svg+xml' ? (
              <div 
                dangerouslySetInnerHTML={{ __html: window.atob(activeItem.rawBase64) }}
                className="max-w-full max-h-full"
              />
            ) : (
              <img 
                src={activeItem.dataUri} 
                alt="Decoded fullscreen" 
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
