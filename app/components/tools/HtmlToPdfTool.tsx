
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Download, Activity, Monitor, Layout, FileType, ZoomIn, Maximize2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  .invoice-box {
    border: 1px solid #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    padding: 30px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid #3b82f6;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .header h1 {
    color: #3b82f6;
    margin: 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f8fafc;
  }
  .total {
    text-align: right;
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 20px;
  }
</style>
</head>
<body>
  <div class="invoice-box">
    <div class="header">
      <div>
        <h1>INVOICE</h1>
        <p>Invoice #: 12345<br>Created: October 1, 2024<br>Due: October 15, 2024</p>
      </div>
      <div>
        <strong>Acme Corp</strong><br>
        123 Business Rd.<br>
        Tech City, TC 90210
      </div>
    </div>
    
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Web Design</td>
          <td>Frontend UI/UX implementation</td>
          <td>1</td>
          <td>$1,500.00</td>
        </tr>
        <tr>
          <td>Hosting</td>
          <td>1 Year Cloud Hosting</td>
          <td>1</td>
          <td>$120.00</td>
        </tr>
      </tbody>
    </table>
    
    <div class="total">
      Total: $1,620.00
    </div>
  </div>
</body>
</html>`;

export function HtmlToPdfTool() {
  const t = useTranslations('Tools');
  const [htmlCode, setHtmlCode] = useState(DEFAULT_HTML);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Settings
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<number>(10); // mm

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const renderTargetRef = useRef<HTMLDivElement>(null);

  // Sync the iframe document with the code editor
  useEffect(() => {
    const iframe = previewContainerRef.current?.querySelector('iframe');
    if (iframe && iframe.contentDocument) {
       const doc = iframe.contentDocument;
       doc.open();
       doc.write(htmlCode);
       doc.close();
    }
  }, [htmlCode]);

  // Sync the hidden render target that we actually screenshot
  // We do this because html2canvas cannot screenshot cross-origin or highly restricted iframes easily,
  // so we render the HTML into a shadowed / isolated div on the main page right before rendering.
  // Actually, standard div might leak styles. Let's use Shadow DOM for the render target to isolate CSS.
  useEffect(() => {
      if (renderTargetRef.current) {
          // Clear it
          renderTargetRef.current.innerHTML = '';
          const shadow = renderTargetRef.current.attachShadow({mode: 'open'});
          shadow.innerHTML = htmlCode;
      }
  }, []);

  const generatePDF = async () => {
    setIsProcessing(true);
    let tempIframe: HTMLIFrameElement | null = null;
    
    try {
      tempIframe = document.createElement('iframe');
      tempIframe.style.position = 'absolute';
      tempIframe.style.left = '-9999px';
      tempIframe.style.top = '0';
      tempIframe.style.border = 'none';
      
      const isPortrait = orientation === 'portrait';
      const widthPx = pageSize === 'a4' ? (isPortrait ? 794 : 1123) : (isPortrait ? 816 : 1056);
      tempIframe.style.width = `${widthPx}px`;
      
      // Give it a massive height to ensure no scrollbars appear inside the iframe
      tempIframe.style.height = '10000px'; 
      
      document.body.appendChild(tempIframe);

      const doc = tempIframe.contentDocument;
      if (!doc) throw new Error("Could not access rendering iframe");

      doc.open();
      doc.write(htmlCode);
      doc.close();

      // Wait for rendering and any external resources to load
      await new Promise(r => setTimeout(r, 800));

      // We capture the documentElement (the <html> tag) of the iframe
      const canvas = await html2canvas(doc.documentElement, {
         scale: 2,
         useCORS: true,
         logging: true,
         backgroundColor: '#ffffff',
         windowWidth: widthPx
      } as any);

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      
      const pdf = new jsPDF({
         orientation: orientation,
         unit: 'mm',
         format: pageSize
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth - (margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - margin * 2);

      while (heightLeft >= 0) {
         position = heightLeft - imgHeight + margin;
         pdf.addPage();
         pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
         heightLeft -= (pdfHeight - margin * 2);
      }

      pdf.save('document.pdf');
      
    } catch (err: any) {
      console.error('PDF Generation Error fully:', err);
      alert(`Failed to generate PDF. Error: ${err.message}`);
    } finally {
       if (tempIframe && document.body.contains(tempIframe)) {
           document.body.removeChild(tempIframe);
       }
       setIsProcessing(false);
    }
  };

  const loadTemplate = (type: string) => {
      if (type === 'invoice') {
         setHtmlCode(DEFAULT_HTML);
      } else if (type === 'letter') {
         setHtmlCode(`<!DOCTYPE html>
<html>
<body style="font-family: serif; padding: 40px; line-height: 1.8;">
  <p><strong>Jane Doe</strong><br>123 Corporate Blvd<br>City, State, 12345</p>
  <br><p>Date: October 10, 2024</p><br>
  <p><strong>Subject: Letter of Recommendation</strong></p>
  <br>
  <p>To Whom It May Concern,</p>
  <p>It is my absolute pleasure to recommend...</p>
</body>
</html>`);
      }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
          HTML to PDF Studio
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Write or paste HTML/CSS and instantly generate professional, print-ready PDF documents directly in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Main Interface Area */}
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 h-[700px]">
          
          {/* Code Editor */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col bg-white dark:bg-[#1e1e1e]">
             <div className="bg-gray-100 dark:bg-[#2d2d2d] p-3 text-sm font-mono flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <span className="flex items-center gap-2"><FileType className="w-4 h-4 text-blue-500"/> index.html</span>
                <div className="flex gap-2">
                   <button onClick={() => loadTemplate('invoice')} className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition">Invoice Template</button>
                   <button onClick={() => loadTemplate('letter')} className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition">Letter Template</button>
                </div>
             </div>
             <div className="flex-1">
                <Editor
                  height="100%"
                  defaultLanguage="html"
                  theme="vs-dark"
                  value={htmlCode}
                  onChange={(val) => setHtmlCode(val || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    padding: { top: 16 }
                  }}
                />
             </div>
          </div>

          {/* Live Preview */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col bg-white dark:bg-gray-800">
             <div className="bg-gray-100 dark:bg-gray-900 p-3 text-sm font-mono flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <span className="flex items-center gap-2"><Layout className="w-4 h-4 text-indigo-500"/> Live Render Preview</span>
             </div>
             <div className="flex-1 bg-gray-300 dark:bg-gray-700 p-4 overflow-auto flex justify-center" ref={previewContainerRef}>
                {/* We use an iframe to isolate the preview's CSS from bleeding into our app's Tailwind */}
                <iframe 
                   title="HTML Preview" 
                   className="bg-white shadow-lg w-full max-w-[800px] h-full min-h-[800px] border-0"
                />
             </div>
          </div>

        </div>

        {/* Configuration Panel */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
              <Monitor className="w-5 h-5 text-blue-500" />
              PDF Export Settings
            </h3>
            
            <div className="space-y-5">
              
              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Page Size
                 </label>
                 <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as any)}
                    disabled={isProcessing}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                 >
                    <option value="a4">A4 (210 x 297 mm)</option>
                    <option value="letter">Letter (8.5 x 11 in)</option>
                 </select>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Orientation
                 </label>
                 <select
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value as any)}
                    disabled={isProcessing}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                 >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                 </select>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Margin (mm)
                 </label>
                 <select
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    disabled={isProcessing}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                 >
                    <option value={0}>None</option>
                    <option value={10}>Small (10mm)</option>
                    <option value={20}>Medium (20mm)</option>
                    <option value={30}>Large (30mm)</option>
                 </select>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={generatePDF}
                    disabled={isProcessing}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <><Activity className="w-5 h-5 animate-spin" /> Rendering PDF...</>
                    ) : (
                      <><Download className="w-5 h-5" /> Export to PDF</>
                    )}
                  </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 flex items-center gap-1"><Monitor className="w-3 h-3"/> Canvas Rasterization Engine</p>
                <p className="text-xs text-gray-400 mt-1">DOM nodes are cloned and painted onto an HTML5 Canvas, then losslessly embedded into the PDF binary via jsPDF.</p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
