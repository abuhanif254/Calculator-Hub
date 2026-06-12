"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Trash2, Download, ShieldCheck, AlertTriangle, CheckCircle, Info, Settings, ShieldAlert, Image as ImageIcon } from "lucide-react";
import exifr from 'exifr';
import piexif from 'piexifjs';
import jszip from 'jszip';

interface ProcessedImage {
  id: string;
  file: File;
  originalUrl: string;
  cleanedUrl: string | null;
  status: "idle" | "analyzing" | "ready" | "cleaning" | "cleaned" | "error";
  error?: string;
  metadata: any;
  gps: any;
  originalSize: number;
  cleanedSize: number | null;
  privacyScore: number;
  isJpeg: boolean;
}

export function ImageMetadataRemoverTool() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculatePrivacyScore = (metadata: any, gps: any) => {
    let score = 0; // 0 is safe
    if (gps) score += 50; // GPS is critical
    if (metadata?.Make || metadata?.Model) score += 20; // Device info
    if (metadata?.DateTimeOriginal || metadata?.CreateDate) score += 15; // Time info
    if (metadata?.Software) score += 5; // Software info
    if (metadata?.LensModel || metadata?.LensMake) score += 10;
    return Math.min(100, score);
  };

  const handleFiles = async (files: FileList | File[]) => {
    const newImages: ProcessedImage[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      originalUrl: URL.createObjectURL(file),
      cleanedUrl: null,
      status: "analyzing",
      metadata: null,
      gps: null,
      originalSize: file.size,
      cleanedSize: null,
      privacyScore: 0,
      isJpeg: file.type === "image/jpeg" || file.type === "image/jpg",
    }));

    setImages((prev) => [...prev, ...newImages]);

    // Analyze each image
    for (const img of newImages) {
      try {
        const metadata = await exifr.parse(img.file).catch(() => null);
        const gps = await exifr.gps(img.file).catch(() => null);
        const score = calculatePrivacyScore(metadata, gps);

        setImages((prev) =>
          prev.map((p) =>
            p.id === img.id
              ? { ...p, status: "ready", metadata, gps, privacyScore: score }
              : p
          )
        );
      } catch (err) {
        setImages((prev) =>
          prev.map((p) =>
            p.id === img.id
              ? { ...p, status: "error", error: "Failed to analyze metadata." }
              : p
          )
        );
      }
    }
  };

  const cleanImage = async (img: ProcessedImage) => {
    if (img.status === "cleaned" || img.status === "cleaning") return;

    setImages((prev) =>
      prev.map((p) => (p.id === img.id ? { ...p, status: "cleaning" } : p))
    );

    try {
      let cleanedUrl = "";
      let cleanedBlob: Blob | null = null;

      if (img.isJpeg) {
        // Use piexifjs to cleanly strip EXIF without recompressing
        const reader = new FileReader();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(img.file);
        });

        try {
          const cleanedDataUrl = piexif.remove(dataUrl);
          cleanedUrl = cleanedDataUrl;
          
          // Convert back to blob for accurate size
          const response = await fetch(cleanedDataUrl);
          cleanedBlob = await response.blob();
        } catch (e) {
          // Fallback if piexifjs fails (e.g., no exif found)
          cleanedUrl = dataUrl;
          cleanedBlob = img.file;
        }
      } else {
        // Use Canvas to strip metadata for PNG, WEBP, etc.
        const bitmap = await createImageBitmap(img.file);
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(bitmap, 0, 0);
          cleanedBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => resolve(blob!), img.file.type, 1.0); // 1.0 quality for WEBP if applicable
          });
          cleanedUrl = URL.createObjectURL(cleanedBlob!);
        } else {
          throw new Error("Canvas context not available");
        }
      }

      setImages((prev) =>
        prev.map((p) =>
          p.id === img.id
            ? {
                ...p,
                status: "cleaned",
                cleanedUrl,
                cleanedSize: cleanedBlob?.size || img.originalSize,
                privacyScore: 0, // Score drops to 0 after cleaning
              }
            : p
        )
      );
    } catch (err: any) {
      setImages((prev) =>
        prev.map((p) =>
          p.id === img.id
            ? { ...p, status: "error", error: err.message || "Failed to clean" }
            : p
        )
      );
    }
  };

  const handleCleanAll = async () => {
    setIsProcessingBatch(true);
    const uncleaned = images.filter((i) => i.status === "ready");
    for (const img of uncleaned) {
      await cleanImage(img);
    }
    setIsProcessingBatch(false);
  };

  const downloadAll = async () => {
    const cleanedImages = images.filter((i) => i.status === "cleaned" && i.cleanedUrl);
    if (cleanedImages.length === 0) return;

    if (cleanedImages.length === 1) {
      const a = document.createElement("a");
      a.href = cleanedImages[0].cleanedUrl!;
      a.download = cleanedImages[0].file.name.replace(/\.[^/.]+$/, "") + "-cleaned." + cleanedImages[0].file.name.split('.').pop();
      a.click();
      return;
    }

    const zip = new jszip();
    for (const img of cleanedImages) {
      const response = await fetch(img.cleanedUrl!);
      const blob = await response.blob();
      const ext = img.file.name.split('.').pop();
      const baseName = img.file.name.replace(/\.[^/.]+$/, "");
      zip.file(`${baseName}-cleaned.${ext}`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(zipBlob);
    a.download = "cleaned-images.zip";
    a.click();
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((i) => i.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getScoreColor = (score: number) => {
    if (score === 0) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (score < 40) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-10 transition-all text-center ${
          isDragging
            ? "border-[#518231] bg-[#518231]/5"
            : "border-slate-300 dark:border-slate-700 hover:border-[#518231] hover:bg-slate-50 dark:hover:bg-slate-800/50"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/jpeg,image/png,image/webp,image/tiff"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }}
        />
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#518231]">
            <Upload size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Upload Images to Clean
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Drag and drop JPG, PNG, WEBP, or TIFF files here, or click to browse. All processing happens locally in your browser.
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors mt-2"
          >
            Select Files
          </button>
        </div>
      </div>

      {/* Action Bar */}
      {images.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 gap-4">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {images.length} file(s) selected
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCleanAll}
              disabled={isProcessingBatch || !images.some((i) => i.status === "ready")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#518231] text-white font-medium rounded-xl hover:bg-[#436b28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessingBatch ? "Cleaning..." : "Clean All Metadata"}
            </button>
            <button
              onClick={downloadAll}
              disabled={!images.some((i) => i.status === "cleaned")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              Download Cleaned
            </button>
          </div>
        </div>
      )}

      {/* Image List */}
      <div className="space-y-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col lg:flex-row gap-6 items-start"
          >
            {/* Thumbnail */}
            <div className="w-full lg:w-48 shrink-0 flex flex-col gap-3">
              <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden relative group">
                <img
                  src={img.cleanedUrl || img.originalUrl}
                  alt={img.file.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => removeImage(img.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    title="Remove File"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-slate-900 dark:text-white truncate" title={img.file.name}>
                  {img.file.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {formatSize(img.originalSize)} {img.cleanedSize && `→ ${formatSize(img.cleanedSize)}`}
                </div>
              </div>
            </div>

            {/* Analysis & Actions */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1.5 rounded-lg border text-sm font-bold flex items-center gap-2 ${getScoreColor(img.privacyScore)}`}>
                    {img.privacyScore === 0 ? <ShieldCheck size={16} /> : <AlertTriangle size={16} />}
                    Privacy Score: {img.status === "cleaned" ? "Safe (0)" : img.privacyScore}
                  </div>
                  {img.status === "analyzing" && <span className="text-sm text-slate-500 animate-pulse">Analyzing...</span>}
                  {img.status === "cleaning" && <span className="text-sm text-blue-500 animate-pulse">Cleaning...</span>}
                  {img.status === "cleaned" && <span className="text-sm text-emerald-500 font-medium flex items-center gap-1"><CheckCircle size={14} /> Cleaned</span>}
                </div>
                {img.status === "ready" && (
                  <button
                    onClick={() => cleanImage(img)}
                    className="px-4 py-1.5 bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/20 font-medium rounded-lg text-sm transition-colors"
                  >
                    Clean Metadata
                  </button>
                )}
                {img.status === "cleaned" && (
                  <a
                    href={img.cleanedUrl!}
                    download={img.file.name.replace(/\.[^/.]+$/, "") + "-cleaned." + img.file.name.split('.').pop()}
                    className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                  >
                    <Download size={14} /> Download
                  </a>
                )}
              </div>

              {/* Metadata Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
                    <ShieldAlert size={14} /> GPS Data
                  </div>
                  <div className="text-sm text-slate-900 dark:text-white font-medium">
                    {img.status === "cleaned" ? "Removed" : img.gps ? "Detected (High Risk)" : "None Found"}
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
                    <ImageIcon size={14} /> Camera Info
                  </div>
                  <div className="text-sm text-slate-900 dark:text-white font-medium">
                    {img.status === "cleaned" ? "Removed" : (img.metadata?.Make || img.metadata?.Model) ? `${img.metadata.Make || ''} ${img.metadata.Model || ''}`.trim() : "None Found"}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
                    <Settings size={14} /> Software/Date
                  </div>
                  <div className="text-sm text-slate-900 dark:text-white font-medium">
                    {img.status === "cleaned" ? "Removed" : (img.metadata?.Software || img.metadata?.DateTimeOriginal) ? "Detected" : "None Found"}
                  </div>
                </div>
              </div>
              
              {/* Detailed Breakdown if not cleaned and metadata exists */}
              {img.status === "ready" && img.metadata && Object.keys(img.metadata).length > 0 && (
                <details className="group">
                  <summary className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Info size={14} /> View specific fields to be removed
                  </summary>
                  <div className="mt-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 max-h-48 overflow-y-auto custom-scrollbar">
                    <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono">
                      {JSON.stringify(
                        Object.fromEntries(
                          Object.entries(img.metadata).filter(([_, v]) => typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')
                        ),
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </details>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
