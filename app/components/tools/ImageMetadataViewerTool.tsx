"use client";

import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, FileText, Camera, MapPin, Palette, ShieldAlert, Download, 
  Trash2, Search, Info, Map, Copy, CheckCircle, AlertTriangle
} from 'lucide-react';
import exifr from 'exifr';
import { useTranslations } from 'next-intl';

interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  width?: number;
  height?: number;
}

interface ParsedMetadata {
  fileInfo: FileInfo;
  exif: any | null;
  gps: { latitude: number; longitude: number; altitude?: number } | null;
  icc: any | null;
  iptc: any | null;
  privacyScore: number;
}

export function ImageMetadataViewerTool() {
  const t = useTranslations('Tools');
  
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ParsedMetadata | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'camera' | 'gps' | 'privacy'>('general');
  const [searchQuery, setSearchQuery] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    processFile(e.target.files[0]);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const calculatePrivacyScore = (exifData: any, gpsData: any, iptcData: any) => {
    let risk = 0;
    // GPS is highest risk
    if (gpsData) risk += 50;
    
    // Identifiable hardware
    if (exifData?.SerialNumber || exifData?.InternalSerialNumber) risk += 15;
    if (exifData?.OwnerName) risk += 10;
    
    // Software traces
    if (exifData?.Software) risk += 5;

    // IPTC copyright/author
    if (iptcData?.Creator || iptcData?.Byline) risk += 10;
    
    // Extreme metadata bloat (usually implies heavy tracking history)
    if (Object.keys(exifData || {}).length > 100) risk += 10;

    return Math.min(risk, 100);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Please upload a valid image file.");
      return;
    }

    setIsProcessing(true);
    setMetadata(null);
    setActiveTab('general');
    
    try {
      const url = URL.createObjectURL(file);
      setActiveImage(url);

      // Load image to get width/height
      const img = new Image();
      img.src = url;
      await new Promise(resolve => img.onload = resolve);

      const fileInfo: FileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        width: img.width,
        height: img.height
      };

      // Parse metadata with exifr
      // We request multiple blocks: TIFF, EXIF, GPS, IPTC, ICC
      const parsedData = await exifr.parse(file, {
        tiff: true,
        xmp: true,
        icc: true,
        iptc: true,
        jfif: true,
        translateKeys: true,
        translateValues: true
      }).catch(() => null);

      let gpsData = null;
      if (parsedData?.latitude && parsedData?.longitude) {
        gpsData = {
          latitude: parsedData.latitude,
          longitude: parsedData.longitude,
          altitude: parsedData.GPSAltitude
        };
      }

      // Separate blocks if available (exifr mixes them usually, we can filter or just display the whole object)
      const privacyScore = calculatePrivacyScore(parsedData, gpsData, parsedData);

      setMetadata({
        fileInfo,
        exif: parsedData || {},
        gps: gpsData,
        icc: parsedData?.ColorSpace ? { ColorSpace: parsedData.ColorSpace } : null,
        iptc: null,
        privacyScore
      });

    } catch (err) {
      console.error(err);
      alert("Failed to parse metadata.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    if (activeImage) URL.revokeObjectURL(activeImage);
    setActiveImage(null);
    setMetadata(null);
  };

  const exportData = (format: 'json' | 'csv' | 'txt') => {
    if (!metadata) return;

    let content = '';
    let mimeType = 'text/plain';

    // Flatten data for export
    const flatData = {
      ...metadata.fileInfo,
      ...(metadata.exif || {}),
      PrivacyRiskScore: metadata.privacyScore
    };

    if (format === 'json') {
      content = JSON.stringify(flatData, null, 2);
      mimeType = 'application/json';
    } else if (format === 'csv') {
      const headers = Object.keys(flatData).join(',');
      const values = Object.values(flatData).map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
      content = `${headers}\n${values}`;
      mimeType = 'text/csv';
    } else if (format === 'txt') {
      content = Object.entries(flatData).map(([k, v]) => `${k}: ${v}`).join('\n');
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `metadata_${metadata.fileInfo.name.split('.')[0]}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const renderMetadataList = (data: any) => {
    if (!data || Object.keys(data).length === 0) {
      return <div className="text-sm text-slate-500 py-4 italic text-center bg-slate-50 dark:bg-slate-800/50 rounded-lg">No data found in this category.</div>;
    }

    const filteredKeys = Object.keys(data).filter(k => 
      k.toLowerCase().includes(searchQuery.toLowerCase()) || 
      String(data[k]).toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredKeys.length === 0) {
      return <div className="text-sm text-slate-500 py-4 text-center">No results match your search.</div>;
    }

    // Filter out Uint8Arrays and long complex objects for clean display
    return (
      <div className="space-y-2">
        {filteredKeys.map(key => {
          let val = data[key];
          if (val instanceof Uint8Array || val instanceof ArrayBuffer) val = '[Binary Data]';
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) val = JSON.stringify(val);
          if (Array.isArray(val)) val = val.join(', ');

          return (
            <div key={key} className="flex flex-col sm:flex-row sm:items-start justify-between py-2.5 px-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:border-slate-300 transition-colors group">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 w-full sm:w-1/3 break-words pr-4 uppercase tracking-wider mb-1 sm:mb-0">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="w-full sm:w-2/3 flex items-start gap-2">
                <span className="text-sm text-slate-900 dark:text-white font-medium break-all flex-1">
                  {String(val)}
                </span>
                <button onClick={() => copyToClipboard(String(val))} className="text-slate-400 hover:text-[#518231] opacity-0 group-hover:opacity-100 transition-opacity p-1">
                  <Copy size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
      
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Search className="text-[#518231]" />
            Image Metadata Analyzer
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Extract EXIF, GPS, and Camera data safely. 100% private client-side processing.
          </p>
        </div>
        {metadata && (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => exportData('json')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 text-slate-700 dark:text-slate-200"><Download size={14}/> JSON</button>
            <button onClick={() => exportData('csv')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 text-slate-700 dark:text-slate-200"><Download size={14}/> CSV</button>
            <button onClick={() => exportData('txt')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 text-slate-700 dark:text-slate-200"><Download size={14}/> TXT</button>
            <button onClick={handleClear} className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"><Trash2 size={14}/> Clear</button>
          </div>
        )}
      </div>

      {!activeImage ? (
        <div 
          className="w-full h-[400px] sm:h-[500px] border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-20 h-20 bg-white dark:bg-slate-700 shadow-sm rounded-full flex items-center justify-center mb-6">
            <Upload className="text-[#518231]" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload Photo for Analysis</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-md text-center">
            Drag and drop any JPG, PNG, WEBP, TIFF, or HEIC file. Your image remains secure on your device and is never uploaded to any server.
          </p>
          <button className="px-6 py-2.5 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl font-semibold shadow-sm transition-colors">
            Browse Files
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : isProcessing ? (
        <div className="w-full h-[400px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#518231] mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 font-medium animate-pulse">Extracting Binary Metadata...</p>
        </div>
      ) : metadata && (
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side: Image Preview & Privacy Score */}
          <div className="w-full lg:w-[350px] shrink-0 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZmZmZiI+PC9yZWN0Pgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiPjwvcmVjdD4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiPjwvcmVjdD4KPC9zdmc+')] w-full h-[250px] flex items-center justify-center relative border-b border-slate-200 dark:border-slate-800">
                <img src={activeImage} alt="Uploaded preview" className="max-w-full max-h-full object-contain" />
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="text-slate-400" size={16} />
                  <span className="text-sm font-semibold text-slate-800 dark:text-white truncate" title={metadata.fileInfo.name}>
                    {metadata.fileInfo.name}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                    <span className="block text-slate-400 uppercase tracking-wider mb-0.5 text-[10px] font-bold">Size</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{formatSize(metadata.fileInfo.size)}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                    <span className="block text-slate-400 uppercase tracking-wider mb-0.5 text-[10px] font-bold">Format</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{metadata.fileInfo.type.split('/')[1]?.toUpperCase() || 'UNKNOWN'}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg col-span-2 flex justify-between items-center">
                    <div>
                      <span className="block text-slate-400 uppercase tracking-wider mb-0.5 text-[10px] font-bold">Resolution</span>
                      <span className="font-medium text-slate-700 dark:text-slate-200">{metadata.fileInfo.width} × {metadata.fileInfo.height} px</span>
                    </div>
                    {metadata.fileInfo.width && metadata.fileInfo.height && (
                      <span className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-xs text-slate-500 font-mono">
                        {Math.round((metadata.fileInfo.width / metadata.fileInfo.height) * 100) / 100}:1
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Score Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                  <ShieldAlert size={16} className={metadata.privacyScore > 40 ? "text-red-500" : "text-green-500"} />
                  Privacy Risk Score
                </h3>
                <span className={`text-xl font-black ${metadata.privacyScore > 40 ? "text-red-500" : "text-green-500"}`}>
                  {metadata.privacyScore}/100
                </span>
              </div>
              
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                <div 
                  className={`h-full transition-all duration-1000 ${metadata.privacyScore > 40 ? 'bg-red-500' : 'bg-green-500'}`} 
                  style={{ width: `${metadata.privacyScore}%` }}
                />
              </div>
              
              <ul className="space-y-2 text-xs">
                {metadata.gps && (
                  <li className="flex gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-2 rounded border border-red-100 dark:border-red-900/30">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <span>Exact GPS coordinates detected. Location is exposed.</span>
                  </li>
                )}
                {metadata.exif?.SerialNumber && (
                  <li className="flex gap-2 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/10 p-2 rounded border border-orange-100 dark:border-orange-900/30">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <span>Unique camera serial number detected.</span>
                  </li>
                )}
                {metadata.privacyScore <= 10 && (
                  <li className="flex gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 p-2 rounded border border-green-100 dark:border-green-900/30">
                    <CheckCircle size={14} className="shrink-0 mt-0.5" />
                    <span>Metadata appears clean. Safe for sharing.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Right Side: Data Explorer */}
          <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            
            {/* Explorer Header / Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-800 px-2 py-2 flex flex-wrap gap-1 bg-slate-50 dark:bg-slate-900/50">
              <button 
                onClick={() => setActiveTab('general')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'general' ? 'bg-white dark:bg-slate-800 text-[#518231] shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <Info size={16} /> File Properties
              </button>
              <button 
                onClick={() => setActiveTab('camera')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'camera' ? 'bg-white dark:bg-slate-800 text-[#518231] shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <Camera size={16} /> Camera EXIF
                {metadata.exif && Object.keys(metadata.exif).length > 0 && (
                  <span className="bg-[#518231]/10 text-[#518231] px-1.5 py-0.5 rounded text-[10px] leading-none ml-1">{Object.keys(metadata.exif).length}</span>
                )}
              </button>
              <button 
                onClick={() => setActiveTab('gps')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'gps' ? 'bg-white dark:bg-slate-800 text-[#518231] shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <MapPin size={16} /> GPS Data
                {metadata.gps && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-1" title="GPS Data Present"></span>}
              </button>
              <div className="flex-1 min-w-[200px] ml-auto">
                <div className="relative h-full flex items-center px-2">
                  <Search size={14} className="absolute left-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search metadata..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-[#518231] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Explorer Content Area */}
            <div className="p-4 flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900">
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">Operating System Properties</h3>
                  {renderMetadataList(metadata.fileInfo)}
                  
                  {metadata.icc && (
                    <>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mt-8 mb-3 flex items-center gap-2">
                        <Palette size={16} /> Embedded Color Profile
                      </h3>
                      {renderMetadataList(metadata.icc)}
                    </>
                  )}
                </div>
              )}

              {activeTab === 'camera' && (
                <div className="space-y-4">
                  {metadata.exif && Object.keys(metadata.exif).length > 0 ? (
                    renderMetadataList(metadata.exif)
                  ) : (
                    <div className="text-center py-16 text-slate-500">
                      <Camera size={48} className="mx-auto mb-4 opacity-20" />
                      <p className="font-medium text-slate-700 dark:text-slate-300">No EXIF Data Found</p>
                      <p className="text-sm mt-1 max-w-md mx-auto">This image was likely downloaded from social media (which strips metadata), saved via a screenshot, or scrubbed for privacy.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'gps' && (
                <div className="space-y-4">
                  {metadata.gps ? (
                    <div>
                      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 mb-6 flex gap-3">
                        <MapPin className="text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-amber-800 dark:text-amber-500 text-sm">Location Found</h4>
                          <p className="text-amber-700 dark:text-amber-400 text-xs mt-1">This image contains exact geographical coordinates.</p>
                        </div>
                        <a 
                          href={`https://www.google.com/maps?q=${metadata.gps.latitude},${metadata.gps.longitude}`} 
                          target="_blank" rel="noopener noreferrer"
                          className="ml-auto bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2 h-fit"
                        >
                          <Map size={14} /> Open in Maps
                        </a>
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">Extracted Coordinates</h3>
                      {renderMetadataList(metadata.gps)}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-slate-500">
                      <MapPin size={48} className="mx-auto mb-4 opacity-20" />
                      <p className="font-medium text-slate-700 dark:text-slate-300">No GPS Data Found</p>
                      <p className="text-sm mt-1">This image does not contain location coordinates.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
