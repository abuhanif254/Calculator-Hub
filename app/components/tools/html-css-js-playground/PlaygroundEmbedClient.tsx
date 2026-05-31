"use client";

import React, { useState } from 'react';
import { PlaygroundPreview } from '@/app/components/tools/html-css-js-playground/PlaygroundPreview';
import { PlaygroundPen } from '@/lib/playgroundService';
import { ExternalLink, Code2 } from 'lucide-react';
import Link from 'next/link';

interface EmbedProps {
  pen: PlaygroundPen;
  penId: string;
}

export function PlaygroundEmbedClient({ pen, penId }: EmbedProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css' | 'js'>('preview');

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e] text-slate-300 font-sans overflow-hidden border border-slate-700">
      {/* Header Tabs */}
      <div className="flex items-center justify-between bg-[#252526] border-b border-slate-800 px-2 h-10 shrink-0">
        <div className="flex items-center h-full">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 h-full text-sm font-medium transition-colors ${activeTab === 'preview' ? 'bg-[#1e1e1e] text-white border-t-2 border-blue-500' : 'hover:bg-[#2a2d2e]'}`}
          >
            Result
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`px-4 h-full text-sm font-medium transition-colors ${activeTab === 'html' ? 'bg-[#1e1e1e] text-white border-t-2 border-orange-500' : 'hover:bg-[#2a2d2e]'}`}
          >
            HTML
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`px-4 h-full text-sm font-medium transition-colors ${activeTab === 'css' ? 'bg-[#1e1e1e] text-white border-t-2 border-blue-400' : 'hover:bg-[#2a2d2e]'}`}
          >
            CSS
          </button>
          <button
            onClick={() => setActiveTab('js')}
            className={`px-4 h-full text-sm font-medium transition-colors ${activeTab === 'js' ? 'bg-[#1e1e1e] text-white border-t-2 border-yellow-400' : 'hover:bg-[#2a2d2e]'}`}
          >
            JS
          </button>
        </div>
        
        <a 
          href={`/tools/html-css-js-playground/${penId}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition-colors"
        >
          Edit on Nexus <ExternalLink size={12} />
        </a>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden bg-white">
        {activeTab === 'preview' ? (
          <PlaygroundPreview 
            html={pen.html}
            css={pen.css}
            js={pen.js}
            htmlMode={pen.htmlMode || 'html'}
            cssMode={pen.cssMode || 'css'}
            jsMode={pen.jsMode || 'javascript'}
            autoRun={true}
            runTrigger={1}
            useTailwind={pen.useTailwind || false}
            useBootstrap={pen.useBootstrap || false}
            onConsoleMessage={() => {}}
            onClearConsole={() => {}}
          />
        ) : (
          <div className="w-full h-full p-4 overflow-auto bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm whitespace-pre">
            {activeTab === 'html' && pen.html}
            {activeTab === 'css' && pen.css}
            {activeTab === 'js' && pen.js}
          </div>
        )}
      </div>
    </div>
  );
}
