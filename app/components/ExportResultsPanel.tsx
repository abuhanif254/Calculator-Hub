"use client";

import React, { useState, useRef } from "react";
import { 
  Copy, Printer, Share2, Download, FileText, Check, 
  QrCode, ExternalLink, Mail, Image as ImageIcon, X, Code, Globe
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { serializeCalculatorInputs } from "@/lib/hooks/useCalculatorUrlHydration";

interface ExportResultsPanelProps {
  targetId?: string;
  fileName?: string;
  title?: string;
}

export function ExportResultsPanel({ 
  targetId = "calculator-export-target", 
  fileName = "nexus-calculation-results",
  title = "Calculation Results"
}: ExportResultsPanelProps) {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingPNG, setIsExportingPNG] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"link" | "embed">("link");
  const [shareUrl, setShareUrl] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // Generate shareable link with inputs encoded
  const handleOpenShare = async () => {
    if (typeof window === 'undefined') return;

    try {
      const inputsParams = serializeCalculatorInputs(targetId);
      const url = new URL(window.location.href);

      // Merge current URL params with active calculator inputs
      inputsParams.forEach((val, key) => {
        url.searchParams.set(key, val);
      });

      const fullUrl = url.toString();
      setShareUrl(fullUrl);

      // Update address bar quietly so the URL matches the share link
      window.history.replaceState({ ...window.history.state }, '', fullUrl);

      // Generate QR Code
      const qr = await QRCode.toDataURL(fullUrl, {
        width: 240,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      });
      setQrCodeDataUrl(qr);
      setShowShareModal(true);
    } catch (err) {
      console.error("Error preparing share modal:", err);
      // Fallback
      setShareUrl(window.location.href);
      setShowShareModal(true);
    }
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.error("Failed to copy link:", e);
    }
  };

  const copyEmbedCode = async () => {
    try {
      const url = new URL(shareUrl || window.location.href);
      const pathParts = url.pathname.split('/');
      const lang = pathParts[1] || 'en';
      const category = pathParts[2] || 'calculators';
      const slug = pathParts[3] || '';
      const embedUrl = `${url.origin}/${lang}/embed/${category}/${slug}${url.search}`;
      
      const code = `<iframe src="${embedUrl}" width="100%" height="800" frameborder="0" allowfullscreen style="border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);"></iframe>`;
      await navigator.clipboard.writeText(code);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2500);
    } catch (e) {
      console.error("Failed to copy embed code:", e);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Nexus Calculator Hub`,
          text: `Here is the customized calculation for ${title}:`,
          url: shareUrl || window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Helper to generate a clean, branded report canvas
  const createReportCanvas = async () => {
    const element = document.getElementById(targetId);
    if (!element) throw new Error("Export target element not found");

    // Temporarily add a class to clean up scrollbars and animations during capture
    element.classList.add("pdf-exporting");

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Retina resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff', // Always export with clean white background
        onclone: (clonedDoc) => {
          const clonedTarget = clonedDoc.getElementById(targetId);
          if (clonedTarget) {
            // Remove dark mode classes from cloned target for pristine contrast
            clonedDoc.documentElement.classList.remove('dark');
            clonedTarget.classList.remove('dark');
            clonedTarget.style.background = '#ffffff';
            clonedTarget.style.color = '#0f172a';
            clonedTarget.style.padding = '24px';
            clonedTarget.style.borderRadius = '16px';

            // Insert a branded report header at the top of the cloned calculation
            const header = clonedDoc.createElement('div');
            header.style.borderBottom = '2px solid #518231';
            header.style.paddingBottom = '16px';
            header.style.marginBottom = '24px';
            header.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-size: 20px; font-weight: 800; color: #518231; letter-spacing: -0.5px;">NEXUS CALCULATOR HUB</div>
                  <div style="font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 2px;">${title}</div>
                </div>
                <div style="text-align: right; font-size: 11px; color: #64748b;">
                  <div>Date: ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                  <div>Verified Calculation Report</div>
                </div>
              </div>
            `;
            clonedTarget.insertBefore(header, clonedTarget.firstChild);

            // Insert a branded report footer
            const footer = clonedDoc.createElement('div');
            footer.style.borderTop = '1px solid #e2e8f0';
            footer.style.paddingTop = '12px';
            footer.style.marginTop = '24px';
            footer.style.textAlign = 'center';
            footer.style.fontSize = '11px';
            footer.style.color = '#94a3b8';
            footer.innerHTML = `Calculated on <strong>nexuscalculator.net</strong> • Free, confidential, client-side tools`;
            clonedTarget.appendChild(footer);
          }
        }
      });
      return canvas;
    } finally {
      element.classList.remove("pdf-exporting");
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExportingPDF(true);
      const canvas = await createReportCanvas();
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      // Handle multi-page overflow cleanly
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${fileName}.pdf`);
    } catch (err) {
      console.error("Error generating PDF report:", err);
      // Fallback to print dialog if canvas rendering fails
      window.print();
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportPNG = async () => {
    try {
      setIsExportingPNG(true);
      const canvas = await createReportCanvas();
      const imgData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error generating image:", err);
    } finally {
      setIsExportingPNG(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl mt-6 shadow-sm print:hidden">
      <span className="hidden sm:inline text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mr-1">
        Save &amp; Share:
      </span>

      {/* Share Calculation Button */}
      <button 
        onClick={handleOpenShare}
        className="flex items-center gap-2 px-3.5 sm:px-4 py-2 min-h-[40px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-emerald-600/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        title="Share your customized calculation via URL or QR Code"
      >
        <Share2 className="w-4 h-4 shrink-0" />
        <span>Share Calculation</span>
      </button>

      {/* Export PDF Button */}
      <button 
        onClick={handleExportPDF}
        disabled={isExportingPDF}
        className="flex items-center gap-1.5 px-3 sm:px-4 py-2 min-h-[40px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
        title="Download official PDF report"
      >
        <FileText className={`w-4 h-4 text-red-500 shrink-0 ${isExportingPDF ? 'animate-pulse' : ''}`} />
        <span className="hidden sm:inline">{isExportingPDF ? 'Generating...' : 'Export PDF'}</span>
      </button>

      {/* Export Image (PNG) Button */}
      <button 
        onClick={handleExportPNG}
        disabled={isExportingPNG}
        className="flex items-center gap-1.5 px-3 sm:px-4 py-2 min-h-[40px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        title="Download high-resolution image"
      >
        <ImageIcon className={`w-4 h-4 text-blue-500 shrink-0 ${isExportingPNG ? 'animate-pulse' : ''}`} />
        <span className="hidden sm:inline">{isExportingPNG ? 'Saving...' : 'PNG Image'}</span>
      </button>

      {/* Print Button */}
      <button 
        onClick={handlePrint}
        className="flex items-center gap-1.5 px-3 sm:px-4 py-2 min-h-[40px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
        title="Print calculation results"
      >
        <Printer className="w-4 h-4 text-slate-600 dark:text-slate-300 shrink-0" />
        <span className="hidden sm:inline">Print</span>
      </button>

      {/* ── Modern Share & Embed Modal ── */}
      {showShareModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowShareModal(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/60 dark:bg-slate-800/40">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Share Your Calculation
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Recipients will see your exact inputs and calculations
                </p>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Switcher */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-3 gap-6 text-sm font-semibold">
              <button
                onClick={() => setActiveTab("link")}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === "link"
                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                }`}
              >
                <Globe className="w-4 h-4" />
                Share Link &amp; QR
              </button>
              <button
                onClick={() => setActiveTab("embed")}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === "embed"
                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                }`}
              >
                <Code className="w-4 h-4" />
                Embed Widget
              </button>
            </div>

            <div className="p-6 space-y-6">
              {activeTab === "link" ? (
                <>
                  {/* Shareable URL Input Box */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Deep-Linked URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 truncate focus:outline-none"
                      />
                      <button
                        onClick={copyShareLink}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white shrink-0 transition-all ${
                          copiedLink 
                            ? "bg-emerald-700 shadow-md shadow-emerald-700/20" 
                            : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* QR Code & Mobile Scan */}
                  {qrCodeDataUrl && (
                    <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                      <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">
                        <img 
                          src={qrCodeDataUrl} 
                          alt="QR Code to open calculation on mobile" 
                          className="w-28 h-28 rounded-lg"
                        />
                      </div>
                      <div className="space-y-1.5 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-slate-800 dark:text-slate-200 text-sm">
                          <QrCode className="w-4 h-4 text-emerald-600" />
                          Scan with your phone
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          Point your mobile camera at this QR code to instantly open and continue this calculation on your smartphone.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Quick Social Share Buttons */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Quick Share
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {/* WhatsApp */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} calculation: ${shareUrl}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors text-xs font-semibold"
                      >
                        <span className="font-bold text-base">WA</span>
                        <span className="text-[10px] mt-0.5">WhatsApp</span>
                      </a>

                      {/* X / Twitter */}
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${title} calculation on Nexus:`)}&url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold"
                      >
                        <span className="font-bold text-base">𝕏</span>
                        <span className="text-[10px] mt-0.5">Twitter/X</span>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors text-xs font-semibold"
                      >
                        <span className="font-bold text-base">in</span>
                        <span className="text-[10px] mt-0.5">LinkedIn</span>
                      </a>

                      {/* Native / More */}
                      <button
                        onClick={handleNativeShare}
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors text-xs font-semibold"
                      >
                        <Share2 className="w-4 h-4 mt-0.5" />
                        <span className="text-[10px] mt-1">More...</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Embed Tab */
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Copy and paste the HTML snippet below to embed this customized calculation widget on your own website, blog, or intranet.
                  </p>
                  <textarea 
                    readOnly
                    rows={4}
                    value={`<iframe src="${(() => {
                      const url = new URL(shareUrl || window.location.href);
                      const parts = url.pathname.split('/');
                      const lang = parts[1] || 'en';
                      const cat = parts[2] || 'calculators';
                      const slug = parts[3] || '';
                      return `${url.origin}/${lang}/embed/${cat}/${slug}${url.search}`;
                    })()}" width="100%" height="800" frameborder="0" allowfullscreen style="border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);"></iframe>`}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-300 resize-none focus:outline-none"
                  />
                  <button 
                    onClick={copyEmbedCode}
                    className={`w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-colors ${
                      copiedEmbed 
                        ? "bg-purple-700 shadow-md shadow-purple-700/20" 
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    {copiedEmbed ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Embed Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Embed Code</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
