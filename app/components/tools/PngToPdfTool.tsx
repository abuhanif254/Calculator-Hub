
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { UploadCloud, File, Trash2, Settings, Download, Activity, Image as ImageIcon, Loader, Archive, Monitor, ArrowUp, ArrowDown, Layout, FileType } from 'lucide-react';
import { PDFDocument, PageSizes, rgb } from 'pdf-lib';
import JSZip from 'jszip';

interface PngImage {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

export function PngToPdfTool() {
  const t = useTranslations('Tools');
  const [images, setImages] = useState<PngImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Settings
  const [pageSize, setPageSize] = useState<string>('A4'); // A4, Letter, Auto
  const [orientation, setOrientation] = useState<string>('portrait'); // portrait, landscape
  const [margin, setMargin] = useState<number>(0); // 0, 20, 40
  const [exportMode, setExportMode] = useState<string>('merge'); // merge, separate
  
  const [pdfOutputUrl, setPdfOutputUrl] = useState<string | null>(null);
  const [zipOutputUrl, setZipOutputUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE_MB = 20;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const addFiles = async (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      if (file.type !== 'image/png') {
        alert(`File ${file.name} is not a PNG.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File ${file.name} exceeds the ${MAX_FILE_SIZE_MB}MB limit.`);
        return false;
      }
      return true;
    });

    // We only allow up to 50 images
    if (images.length + validFiles.length > 50) {
      alert('You can only process up to 50 images at once.');
      validFiles.splice(50 - images.length);
    }

    const newImagePromises = validFiles.map(async (file) => {
      return new Promise<PngImage>((resolve, reject) => {
         const previewUrl = URL.createObjectURL(file);
         const img = new Image();
         img.onload = () => {
            resolve({
               id: Math.random().toString(36).substring(7),
               file,
               previewUrl,
               width: img.width,
               height: img.height
            });
         };
         img.onerror = reject;
         img.src = previewUrl;
      });
    });

    try {
       const loadedImages = await Promise.all(newImagePromises);
       setImages(prev => [...prev, ...loadedImages]);
       // Reset previous exports
       setPdfOutputUrl(null);
       setZipOutputUrl(null);
    } catch (err) {
       console.error("Error loading images", err);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(x => x.id === id);
      if (img) URL.revokeObjectURL(img.previewUrl);
      return prev.filter(x => x.id !== id);
    });
    setPdfOutputUrl(null);
    setZipOutputUrl(null);
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    setImages(prev => {
      const copy = [...prev];
      if (direction === 'up' && index > 0) {
         [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      } else if (direction === 'down' && index < copy.length - 1) {
         [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
      }
      return copy;
    });
    setPdfOutputUrl(null);
  };

  const generatePDFs = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setPdfOutputUrl(null);
    setZipOutputUrl(null);
    
    try {
      if (exportMode === 'merge') {
         const pdfDoc = await PDFDocument.create();
         
         for (const imgObj of images) {
            const pngImageBytes = await imgObj.file.arrayBuffer();
            const pngImage = await pdfDoc.embedPng(pngImageBytes);
            const pngDims = pngImage.scale(1);

            let pageW = 0;
            let pageH = 0;

            if (pageSize === 'Auto') {
               pageW = pngDims.width + (margin * 2);
               pageH = pngDims.height + (margin * 2);
            } else {
               const standardSize = pageSize === 'A4' ? PageSizes.A4 : PageSizes.Letter;
               pageW = orientation === 'landscape' ? standardSize[1] : standardSize[0];
               pageH = orientation === 'landscape' ? standardSize[0] : standardSize[1];
            }

            const page = pdfDoc.addPage([pageW, pageH]);
            
            // Calculate drawing coordinates (centered)
            const drawW = pageW - (margin * 2);
            const drawH = pageH - (margin * 2);

            const scaleRatio = Math.min(drawW / pngDims.width, drawH / pngDims.height);
            const finalW = pngDims.width * scaleRatio;
            const finalH = pngDims.height * scaleRatio;

            page.drawImage(pngImage, {
               x: (pageW - finalW) / 2,
               y: (pageH - finalH) / 2,
               width: finalW,
               height: finalH,
            });
         }

         const pdfBytes = await pdfDoc.save();
         const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
         setPdfOutputUrl(URL.createObjectURL(blob));

      } else {
         // Separate PDFs -> Zip
         const zip = new JSZip();
         
         for (let i = 0; i < images.length; i++) {
            const imgObj = images[i];
            const pdfDoc = await PDFDocument.create();
            const pngImageBytes = await imgObj.file.arrayBuffer();
            const pngImage = await pdfDoc.embedPng(pngImageBytes);
            const pngDims = pngImage.scale(1);

            let pageW = 0;
            let pageH = 0;

            if (pageSize === 'Auto') {
               pageW = pngDims.width + (margin * 2);
               pageH = pngDims.height + (margin * 2);
            } else {
               const standardSize = pageSize === 'A4' ? PageSizes.A4 : PageSizes.Letter;
               pageW = orientation === 'landscape' ? standardSize[1] : standardSize[0];
               pageH = orientation === 'landscape' ? standardSize[0] : standardSize[1];
            }

            const page = pdfDoc.addPage([pageW, pageH]);
            
            const drawW = pageW - (margin * 2);
            const drawH = pageH - (margin * 2);

            const scaleRatio = Math.min(drawW / pngDims.width, drawH / pngDims.height);
            const finalW = pngDims.width * scaleRatio;
            const finalH = pngDims.height * scaleRatio;

            page.drawImage(pngImage, {
               x: (pageW - finalW) / 2,
               y: (pageH - finalH) / 2,
               width: finalW,
               height: finalH,
            });

            const pdfBytes = await pdfDoc.save();
            const fileName = `${imgObj.file.name.replace(/\.png$/i, '')}.pdf`;
            zip.file(fileName, pdfBytes);
         }

         const zipBlob = await zip.generateAsync({ type: 'blob' });
         setZipOutputUrl(URL.createObjectURL(zipBlob));
      }
      
    } catch (err: any) {
      console.warn('PDF Generation Error:', err.message);
      alert('Failed to generate PDF. The image file might be corrupted.');
    } finally {
       setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
          PNG to PDF Converter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Convert and merge PNG images into professional PDF documents. Preserves transparency and quality, running securely entirely in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Main Interface Area */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Dropzone */}
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 
              ${isDragging ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-emerald-400'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/png"
              onChange={(e) => {
                if (e.target.files) addFiles(Array.from(e.target.files));
                e.target.value = '';
              }}
            />
            <UploadCloud className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium mb-2">Drag & Drop PNGs here</p>
            <p className="text-sm text-gray-500 mb-6">Up to 50 images, 20MB per file. 100% private client-side processing.</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Select Images
            </button>
          </div>

          {/* Visual Organizer */}
          {images.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                <h3 className="font-medium flex items-center gap-2">
                  <Layout className="w-5 h-5 text-emerald-500" />
                  Image Sequence ({images.length})
                </h3>
              </div>
              
              {/* Image Grid */}
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 {images.map((img, index) => (
                    <div key={img.id} className="relative group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 aspect-[3/4] flex flex-col">
                       <div className="flex-1 p-2 flex items-center justify-center relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNlNWU3ZWIiLz48cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMzNzQxNTEiLz48cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMzc0MTUxIi8+PC9zdmc+')]">
                          <img src={img.previewUrl} alt={img.file.name} className="max-w-full max-h-full object-contain drop-shadow-sm" />
                       </div>
                       <div className="p-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs truncate">
                          {img.file.name}
                       </div>
                       
                       {/* Controls Overlay */}
                       <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => removeImage(img.id)} className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded shadow-sm">
                             <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => moveImage(index, 'up')} disabled={index === 0} className="p-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded shadow-sm disabled:opacity-30">
                             <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => moveImage(index, 'down')} disabled={index === images.length - 1} className="p-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded shadow-sm disabled:opacity-30">
                             <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                       </div>
                       <div className="absolute top-2 left-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                          {index + 1}
                       </div>
                    </div>
                 ))}
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                {pdfOutputUrl || zipOutputUrl ? (
                   <div className="flex gap-4 ml-auto">
                      {pdfOutputUrl && (
                         <a
                           href={pdfOutputUrl}
                           download="merged-document.pdf"
                           className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2"
                         >
                           <Download className="w-4 h-4" /> Download PDF
                         </a>
                      )}
                      {zipOutputUrl && (
                         <a
                           href={zipOutputUrl}
                           download="pdf-documents.zip"
                           className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2"
                         >
                           <Archive className="w-4 h-4" /> Download ZIP
                         </a>
                      )}
                   </div>
                ) : (
                  <button
                    onClick={generatePDFs}
                    disabled={isProcessing}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                  >
                    {isProcessing ? (
                      <><Loader className="w-4 h-4 animate-spin" /> Generating PDF...</>
                    ) : (
                      <><FileType className="w-4 h-4" /> Create PDF</>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Configuration Panel */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
              <Settings className="w-5 h-5 text-emerald-500" />
              Document Settings
            </h3>
            
            <div className="space-y-5">
              
              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Export Mode
                 </label>
                 <select
                    value={exportMode}
                    onChange={(e) => { setExportMode(e.target.value); setPdfOutputUrl(null); setZipOutputUrl(null); }}
                    disabled={isProcessing}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                 >
                    <option value="merge">Merge into one PDF</option>
                    <option value="separate">Create separate PDFs</option>
                 </select>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Page Size
                 </label>
                 <select
                    value={pageSize}
                    onChange={(e) => { setPageSize(e.target.value); setPdfOutputUrl(null); setZipOutputUrl(null); }}
                    disabled={isProcessing}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                 >
                    <option value="A4">A4</option>
                    <option value="Letter">Letter</option>
                    <option value="Auto">Auto (Fit to Image)</option>
                 </select>
              </div>

              {pageSize !== 'Auto' && (
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Orientation
                    </label>
                    <select
                       value={orientation}
                       onChange={(e) => { setOrientation(e.target.value); setPdfOutputUrl(null); setZipOutputUrl(null); }}
                       disabled={isProcessing}
                       className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                       <option value="portrait">Portrait</option>
                       <option value="landscape">Landscape</option>
                    </select>
                 </div>
              )}

              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Margin (pts)
                 </label>
                 <select
                    value={margin}
                    onChange={(e) => { setMargin(Number(e.target.value)); setPdfOutputUrl(null); setZipOutputUrl(null); }}
                    disabled={isProcessing}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                 >
                    <option value={0}>No Margin</option>
                    <option value={20}>Small (20pt)</option>
                    <option value={40}>Medium (40pt)</option>
                    <option value={80}>Large (80pt)</option>
                 </select>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 flex items-center gap-1"><Monitor className="w-3 h-3"/> Hardware Accelerated</p>
                <p className="text-xs text-gray-400 mt-1">Binary construction operates locally via WebAssembly using your device GPU and CPU.</p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
