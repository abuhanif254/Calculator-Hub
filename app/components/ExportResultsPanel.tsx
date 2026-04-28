"use client";
import { Copy, Printer, Share2 } from "lucide-react";
import React from "react";

export function ExportResultsPanel() {
  const handlePrint = () => {
    window.print();
  };
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl mt-6 print:hidden">
      <span className="text-sm font-semibold text-slate-600 mr-2">Save & Share:</span>
      <button 
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Print or Save as PDF"
      >
        <Printer className="w-4 h-4 text-emerald-600" />
        Print / PDF
      </button>
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Share2 className="w-4 h-4 text-blue-600" />
        Share Link
      </button>
    </div>
  );
}
