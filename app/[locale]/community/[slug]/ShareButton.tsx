"use client";

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
}

export function ShareButton({ title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    
    // Check if navigator.share is supported
    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent || '')) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (err) {
        // Fallback if user cancels or it fails
        console.error("Error sharing via native API:", err);
      }
    } else {
      // Fallback to clipboard for desktop or unsupported browsers
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#518231] dark:hover:text-[#518231] transition-colors bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg shadow-sm hover:shadow"
      >
        {copied ? <Check size={16} className="text-[#518231]" /> : <Share2 size={16} />}
        {copied ? <span className="text-[#518231]">Copied!</span> : 'Share'}
      </button>
      
      {copied && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-lg shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
          Link copied to clipboard
        </div>
      )}
    </div>
  );
}
