
'use client';

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Download, Activity, FileText, Settings, Upload, Save, Eye, Hash, Clock, AlignLeft, Type } from 'lucide-react';
import { jsPDF } from 'jspdf';

// --- Templates ---
const TEMPLATES: Record<string, string> = {
  blank: '',
  notes: `Meeting Notes
Date: October 10, 2024
Attendees: John, Jane, Bob

Agenda:
1. Review Q3 Performance
2. Discuss Q4 Marketing Strategy
3. Budget Approvals

Action Items:
- John: Finalize budget report by Friday.
- Jane: Schedule follow-up with the design team.`,
  letter: `Business Letter

Jane Doe
123 Corporate Blvd
Cityville, ST 12345

October 10, 2024

To Whom It May Concern:

It is my absolute pleasure to write this letter of recommendation...

Sincerely,

Jane Doe`
};

export function TextToPdfTool() {
  const t = useTranslations('Tools');
  
  // State
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Typography Settings
  const [fontFamily, setFontFamily] = useState<'helvetica' | 'times' | 'courier'>('helvetica');
  const [fontSize, setFontSize] = useState<number>(12);
  const [lineHeight, setLineHeight] = useState<number>(1.5);
  
  // Page Settings
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'a3' | 'a5' | 'legal'>('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [marginSetting, setMarginSetting] = useState<'small' | 'medium' | 'large'>('medium');
  const [showPageNumbers, setShowPageNumbers] = useState(true);

  // Statistics
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const readingTime = Math.ceil(wordCount / 200); // 200 WPM

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setText(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getMarginMM = () => {
    switch(marginSetting) {
        case 'small': return 12.7; // 0.5 inch
        case 'large': return 38.1; // 1.5 inch
        case 'medium': 
        default: return 25.4; // 1 inch
    }
  };

  const generatePDF = () => {
    setIsProcessing(true);
    
    // Use timeout to allow UI to update to loading state
    setTimeout(() => {
        try {
            const pdf = new jsPDF({
                orientation: orientation,
                unit: 'mm',
                format: pageSize
            });

            pdf.setFont(fontFamily);
            pdf.setFontSize(fontSize);
            
            const margin = getMarginMM();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const effectiveWidth = pdfWidth - (margin * 2);
            const effectiveHeight = pdfHeight - (margin * 2);

            // Split text to fit width
            const textLines = pdf.splitTextToSize(text, effectiveWidth);
            
            // Calculate vertical spacing based on font size and line height
            // jsPDF default line height is roughly fontSize * 0.3527 mm (1 pt = 0.3527 mm)
            const lineHeightMM = (fontSize * 0.3527) * lineHeight;
            
            let cursorY = margin;
            let pageNum = 1;

            const addPageNumber = () => {
                if (showPageNumbers) {
                    pdf.setFontSize(10);
                    pdf.setTextColor(150);
                    const pageString = `Page ${pageNum}`;
                    const textWidth = pdf.getTextWidth(pageString);
                    // Bottom center
                    pdf.text(pageString, (pdfWidth / 2) - (textWidth / 2), pdfHeight - (margin / 2));
                    // Reset font
                    pdf.setFontSize(fontSize);
                    pdf.setTextColor(0);
                }
            };

            for (let i = 0; i < textLines.length; i++) {
                // Check if we need a new page
                if (cursorY + lineHeightMM > pdfHeight - margin) {
                    addPageNumber();
                    pdf.addPage();
                    pageNum++;
                    cursorY = margin;
                }
                
                pdf.text(textLines[i], margin, cursorY + (fontSize * 0.3527));
                cursorY += lineHeightMM;
            }

            addPageNumber();
            pdf.save('document.pdf');
            
        } catch (error) {
            console.error("PDF Generation failed", error);
            alert("Failed to generate PDF. Please check your text input.");
        } finally {
            setIsProcessing(false);
        }
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-600">
          Text to PDF Studio
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Securely convert plain text to professional PDF documents entirely in your browser. Customize fonts, margins, and page sizes instantly.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Editor Area */}
        <div className="xl:col-span-3 space-y-4">
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={triggerFileUpload}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition"
                    >
                        <Upload className="w-4 h-4" /> Upload .txt
                    </button>
                    <input 
                        type="file" 
                        accept=".txt" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        className="hidden" 
                    />
                    <span className="text-gray-300 dark:text-gray-600 mx-2">|</span>
                    <select 
                        onChange={(e) => setText(TEMPLATES[e.target.value] || '')}
                        className="text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 outline-none"
                    >
                        <option value="blank">Blank Document</option>
                        <option value="notes">Meeting Notes</option>
                        <option value="letter">Business Letter</option>
                    </select>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Hash className="w-4 h-4"/> {wordCount} words</span>
                    <span className="flex items-center gap-1"><Type className="w-4 h-4"/> {charCount} chars</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {readingTime} min read</span>
                </div>
            </div>

            {/* Textarea */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-[600px]">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="flex-1 w-full p-6 resize-none outline-none bg-transparent text-gray-800 dark:text-gray-200"
                    style={{
                        fontFamily: fontFamily === 'times' ? '"Times New Roman", Times, serif' : fontFamily === 'courier' ? '"Courier New", Courier, monospace' : 'Arial, Helvetica, sans-serif',
                        fontSize: `${fontSize}px`,
                        lineHeight: lineHeight,
                    }}
                />
            </div>
        </div>

        {/* Configuration Panel */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
              <Settings className="w-5 h-5 text-teal-500" />
              PDF Settings
            </h3>
            
            <div className="space-y-5">
              
              {/* Typography Group */}
              <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Typography</h4>
                  
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Font Family</label>
                    <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value as any)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="helvetica">Helvetica (Sans-Serif)</option>
                        <option value="times">Times (Serif)</option>
                        <option value="courier">Courier (Monospace)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Size (pt)</label>
                        <input
                            type="number"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            min="8" max="72"
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Line Height</label>
                        <select
                            value={lineHeight}
                            onChange={(e) => setLineHeight(Number(e.target.value))}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value={1}>Single</option>
                            <option value={1.5}>1.5 lines</option>
                            <option value={2}>Double</option>
                        </select>
                      </div>
                  </div>
              </div>

              {/* Layout Group */}
              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Layout</h4>
                  
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Page Size</label>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value as any)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="a4">A4</option>
                        <option value="letter">Letter</option>
                        <option value="legal">Legal</option>
                        <option value="a3">A3</option>
                        <option value="a5">A5</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Orientation</label>
                        <select
                            value={orientation}
                            onChange={(e) => setOrientation(e.target.value as any)}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="portrait">Portrait</option>
                            <option value="landscape">Landscape</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Margins</label>
                        <select
                            value={marginSetting}
                            onChange={(e) => setMarginSetting(e.target.value as any)}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                      </div>
                  </div>
              </div>
              
              {/* Extras */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={showPageNumbers} 
                        onChange={(e) => setShowPageNumbers(e.target.checked)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Add Page Numbers</span>
                  </label>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={generatePDF}
                    disabled={isProcessing || !text.trim()}
                    className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <><Activity className="w-5 h-5 animate-spin" /> Generating PDF...</>
                    ) : (
                      <><Download className="w-5 h-5" /> Export PDF</>
                    )}
                  </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">100% Private. Processed locally.</p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
