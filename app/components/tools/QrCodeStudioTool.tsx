"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Download, QrCode, Link as LinkIcon, Type, Mail, MessageSquare, Phone, 
  Wifi, Contact, Calendar, Share2, Upload, Trash2, Image as ImageIcon, 
  Layers, Settings, Loader2, Maximize2, Archive
} from "lucide-react";
import QRCode from "qrcode";
import JSZip from "jszip";
import { jsPDF } from "jspdf";

type QrType = "url" | "text" | "email" | "sms" | "phone" | "whatsapp" | "wifi" | "vcard" | "event" | "social";
type ExportFormat = "png" | "webp" | "svg" | "pdf";

export function QrCodeStudioTool() {
  const [activeTab, setActiveTab] = useState<"create" | "batch">("create");
  const [qrType, setQrType] = useState<QrType>("url");
  
  // Data States
  const [urlData, setUrlData] = useState("https://nexuscalculator.net");
  const [textData, setTextData] = useState("");
  
  // WiFi States
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);
  
  // vCard States
  const [vcardName, setVcardName] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [vcardEmail, setVcardEmail] = useState("");
  const [vcardCompany, setVcardCompany] = useState("");
  const [vcardWebsite, setVcardWebsite] = useState("");

  // Styling States
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [dotStyle, setDotStyle] = useState<"square" | "rounded">("square");
  const [exportSize, setExportSize] = useState<number>(1024);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("png");

  // Batch State
  const [batchData, setBatchData] = useState("");
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR String based on active type
  const getQrString = useCallback(() => {
    switch (qrType) {
      case "url": return urlData || "https://nexuscalculator.net";
      case "text": return textData || "Hello World";
      case "wifi": 
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};${wifiHidden ? 'H:true' : ''};`;
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nORG:${vcardCompany}\nURL:${vcardWebsite}\nEND:VCARD`;
      default: return urlData; // Fallback
    }
  }, [qrType, urlData, textData, wifiSsid, wifiPassword, wifiEncryption, wifiHidden, vcardName, vcardPhone, vcardEmail, vcardCompany, vcardWebsite]);

  // Render QR Code onto Canvas
  const renderQRCode = useCallback(async (dataString: string, canvas: HTMLCanvasElement, size: number) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get Raw Matrix
    const qrData = QRCode.create(dataString, { errorCorrectionLevel: logoUrl ? 'H' : 'M' });
    const moduleCount = qrData.modules.size;
    
    // We want some margin
    const margin = 2;
    const totalModules = moduleCount + margin * 2;
    const cellSize = Math.floor(size / totalModules);
    const actualSize = totalModules * cellSize; // Prevent decimal anti-aliasing issues

    canvas.width = actualSize;
    canvas.height = actualSize;

    // Fill Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, actualSize, actualSize);

    ctx.fillStyle = fgColor;

    // Logo prep (calculate safe zone)
    let logoImage: HTMLImageElement | null = null;
    let safeZoneStart = -1;
    let safeZoneEnd = -1;
    
    if (logoUrl) {
      logoImage = new Image();
      logoImage.src = logoUrl;
      await new Promise(resolve => { logoImage!.onload = resolve; });
      
      // Calculate a central safe zone (e.g., center 30% of modules)
      const logoModules = Math.floor(moduleCount * 0.3);
      safeZoneStart = Math.floor((moduleCount - logoModules) / 2) + margin;
      safeZoneEnd = safeZoneStart + logoModules;
    }

    // Draw Modules
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        // Skip drawing module if it's in the logo safe zone
        const r = row + margin;
        const c = col + margin;
        if (logoUrl && r >= safeZoneStart && r <= safeZoneEnd && c >= safeZoneStart && c <= safeZoneEnd) {
          continue; 
        }

        const isDark = qrData.modules.data[row * moduleCount + col];
        if (isDark) {
          const x = c * cellSize;
          const y = r * cellSize;

          if (dotStyle === "rounded") {
            ctx.beginPath();
            ctx.arc(x + cellSize/2, y + cellSize/2, cellSize/2 * 0.8, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            // Add a tiny gap for better rendering sometimes, or just solid squares
            ctx.fillRect(x, y, cellSize, cellSize);
          }
        }
      }
    }

    // Draw Logo
    if (logoImage) {
      const logoSize = (safeZoneEnd - safeZoneStart) * cellSize;
      const logoX = safeZoneStart * cellSize;
      const logoY = safeZoneStart * cellSize;
      
      // Optional: Draw a white background for the logo
      ctx.fillStyle = bgColor;
      ctx.fillRect(logoX, logoY, logoSize, logoSize);
      ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
    }

  }, [fgColor, bgColor, logoUrl, dotStyle]);

  // Main UI update trigger
  useEffect(() => {
    if (activeTab === "create" && canvasRef.current) {
      renderQRCode(getQrString(), canvasRef.current, 1024); // Internal render size always 1024 for sharp preview
    }
  }, [getQrString, renderQRCode, activeTab]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    const url = URL.createObjectURL(file);
    setLogoUrl(url);
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    
    // We might need to render at the requested Export Size first on a temporary canvas
    const tempCanvas = document.createElement("canvas");
    await renderQRCode(getQrString(), tempCanvas, exportSize);

    if (exportFormat === "pdf") {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [exportSize, exportSize]
      });
      const dataUrl = tempCanvas.toDataURL("image/png", 1.0);
      doc.addImage(dataUrl, "PNG", 0, 0, exportSize, exportSize);
      doc.save(`nexus-qr-${Date.now()}.pdf`);
      return;
    }

    if (exportFormat === "svg") {
      alert("SVG export is not supported for custom canvas rendering natively yet. Please export as High-Res PNG.");
      return;
    }

    const dataUrl = tempCanvas.toDataURL(`image/${exportFormat}`, 1.0);
    const link = document.createElement("a");
    link.download = `nexus-qr-${Date.now()}.${exportFormat}`;
    link.href = dataUrl;
    link.click();
  };

  const handleBatchDownload = async () => {
    const lines = batchData.split("\n").map(l => l.trim()).filter(l => l);
    if (lines.length === 0) {
      alert("Please enter some data for batch generation.");
      return;
    }
    if (lines.length > 500) {
      alert("Batch generation is limited to 500 items at a time.");
      return;
    }

    setIsProcessingBatch(true);
    const zip = new JSZip();
    const tempCanvas = document.createElement("canvas");

    for (let i = 0; i < lines.length; i++) {
      await renderQRCode(lines[i], tempCanvas, exportSize);
      const dataUrl = tempCanvas.toDataURL(`image/${exportFormat}`, 1.0);
      const base64Data = dataUrl.replace(/^data:image\/(png|webp);base64,/, "");
      zip.file(`qr-code-${i + 1}.${exportFormat}`, base64Data, { base64: true });
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `nexus-qr-batch-${Date.now()}.zip`;
      link.click();
      setIsProcessingBatch(false);
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      
      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        <button 
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === "create" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
        >
          <QrCode className="inline-block w-4 h-4 mr-2" />
          Single QR
        </button>
        <button 
          onClick={() => setActiveTab("batch")}
          className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === "batch" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
        >
          <Layers className="inline-block w-4 h-4 mr-2" />
          Batch Generator
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Inputs & Settings */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === "create" ? (
            <>
              {/* QR Type Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Data Type</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(["url", "text", "wifi", "vcard"] as QrType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => setQrType(type)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        qrType === type 
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Dynamic Data Inputs */}
                {qrType === "url" && (
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Website URL</label>
                    <input 
                      type="url" 
                      value={urlData} 
                      onChange={e => setUrlData(e.target.value)} 
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                      placeholder="https://example.com"
                    />
                  </div>
                )}

                {qrType === "text" && (
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Text Content</label>
                    <textarea 
                      value={textData} 
                      onChange={e => setTextData(e.target.value)} 
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your text here..."
                      rows={3}
                    />
                  </div>
                )}

                {qrType === "wifi" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1 dark:text-gray-300">Network Name (SSID)</label>
                      <input type="text" value={wifiSsid} onChange={e => setWifiSsid(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
                      <input type="password" value={wifiPassword} onChange={e => setWifiPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium mb-1 dark:text-gray-300">Encryption</label>
                      <select value={wifiEncryption} onChange={e => setWifiEncryption(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white">
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">None</option>
                      </select>
                    </div>
                  </div>
                )}

                {qrType === "vcard" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium mb-1 dark:text-gray-300">Full Name</label>
                      <input type="text" value={vcardName} onChange={e => setVcardName(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium mb-1 dark:text-gray-300">Phone</label>
                      <input type="tel" value={vcardPhone} onChange={e => setVcardPhone(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
                      <input type="email" value={vcardEmail} onChange={e => setVcardEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium mb-1 dark:text-gray-300">Company</label>
                      <input type="text" value={vcardCompany} onChange={e => setVcardCompany(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Design Customization */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Design Customization</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Colors */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Foreground Color</label>
                    <div className="flex items-center space-x-2">
                      <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                      <input type="text" value={fgColor} onChange={e => setFgColor(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Background Color</label>
                    <div className="flex items-center space-x-2">
                      <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                      <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm dark:bg-gray-900 dark:border-gray-600 dark:text-white" />
                    </div>
                  </div>
                  
                  {/* Shapes */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Dot Style</label>
                    <select value={dotStyle} onChange={e => setDotStyle(e.target.value as any)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white">
                      <option value="square">Standard Squares</option>
                      <option value="rounded">Rounded Dots</option>
                    </select>
                  </div>

                  {/* Logo Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Center Logo</label>
                    <div className="flex items-center space-x-2">
                      <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors dark:text-white w-full text-center border border-dashed border-gray-300 dark:border-gray-500">
                        <Upload className="inline-block w-4 h-4 mr-2" />
                        {logoUrl ? 'Change Logo' : 'Upload Logo'}
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      </label>
                      {logoUrl && (
                        <button onClick={() => setLogoUrl(null)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // BATCH GENERATION TAB
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
               <h3 className="text-lg font-semibold mb-4 dark:text-white">Batch Generator</h3>
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                 Enter one URL or text string per line. The styles defined in the "Single QR" tab will be applied to all generated QR codes.
               </p>
               <textarea 
                  value={batchData} 
                  onChange={e => setBatchData(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white font-mono text-sm"
                  placeholder="https://example.com\nhttps://nexuscalculator.net\nText string 3..."
                  rows={12}
                />
            </div>
          )}

        </div>

        {/* Right Column: Preview & Export */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center justify-between">
              Preview
              <Maximize2 className="w-4 h-4 text-gray-400" />
            </h3>
            
            {/* Canvas Container */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 flex items-center justify-center aspect-square mb-6 overflow-hidden shadow-inner border border-gray-200 dark:border-gray-700">
              {activeTab === "create" ? (
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full object-contain max-w-[280px] max-h-[280px] shadow-sm bg-white"
                />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Archive className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Batch Output Preview</p>
                </div>
              )}
            </div>

            {/* Export Settings */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Export Size (px)</label>
                <input 
                  type="range" 
                  min="256" max="4096" step="256" 
                  value={exportSize} 
                  onChange={e => setExportSize(Number(e.target.value))} 
                  className="w-full accent-blue-600"
                />
                <div className="text-right text-xs font-medium dark:text-gray-300 mt-1">{exportSize} x {exportSize} px</div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Format</label>
                <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {(["png", "webp", "pdf"] as ExportFormat[]).map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setExportFormat(fmt)}
                      className={`flex-1 py-1.5 text-xs font-medium uppercase transition-colors ${exportFormat === fmt ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" : "bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Download Button */}
            {activeTab === "create" ? (
              <button 
                onClick={handleDownload}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm"
              >
                <Download className="w-5 h-5" />
                <span>Download {exportFormat.toUpperCase()}</span>
              </button>
            ) : (
              <button 
                onClick={handleBatchDownload}
                disabled={isProcessingBatch}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm"
              >
                {isProcessingBatch ? <Loader2 className="w-5 h-5 animate-spin" /> : <Archive className="w-5 h-5" />}
                <span>{isProcessingBatch ? "Processing ZIP..." : "Download ZIP Archive"}</span>
              </button>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
