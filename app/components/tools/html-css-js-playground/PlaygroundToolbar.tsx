"use client";

import React, { useState } from 'react';
import { Play, Save, Download, Settings, Monitor, Smartphone, Tablet, LayoutTemplate, Zap, RefreshCw, Wand2, Share2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface PlaygroundToolbarProps {
  onRun: () => void;
  onSave: () => void;
  onShare: () => void;
  onExport: () => void;
  onFormat: () => void;
  autoRun: boolean;
  setAutoRun: (val: boolean) => void;
  useTailwind: boolean;
  setUseTailwind: (val: boolean) => void;
  useBootstrap: boolean;
  setUseBootstrap: (val: boolean) => void;
  layout: 'vertical' | 'horizontal';
  setLayout: (l: 'vertical' | 'horizontal') => void;
  previewSize: 'full' | 'mobile' | 'tablet';
  setPreviewSize: (s: 'full' | 'mobile' | 'tablet') => void;
  saveStatus: string;
  onReset: () => void;
  onSettingsClick: () => void;
}

export function PlaygroundToolbar({
  onRun, onSave, onShare, onExport, onFormat,
  autoRun, setAutoRun,
  useTailwind, setUseTailwind,
  useBootstrap, setUseBootstrap,
  layout, setLayout,
  previewSize, setPreviewSize,
  saveStatus, onReset, onSettingsClick
}: PlaygroundToolbarProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-2 sm:px-4 sm:py-3 gap-2 relative">
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#518231] hover:bg-[#436b28] text-white text-sm font-medium rounded-md transition-colors"
          title="Run Code (Ctrl+Enter)"
        >
          <Play size={14} fill="currentColor" /> Run
        </button>
        
        <button
          onClick={onSave}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-md transition-colors"
          title="Save Project (Ctrl+S)"
        >
          <Save size={14} /> 
          <span className="hidden sm:inline">Save</span>
        </button>

        <button
          onClick={onShare}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-md transition-colors border border-blue-200 dark:border-blue-800"
          title="Share & Embed"
        >
          <Share2 size={14} /> 
          <span className="hidden sm:inline">Share</span>
        </button>

        <button
          onClick={onFormat}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-md transition-colors"
          title="Format Code (Ctrl+Shift+F)"
        >
          <Wand2 size={14} /> 
          <span className="hidden sm:inline">Format</span>
        </button>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to reset to default code? All unsaved changes will be lost.')) {
              onReset();
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium rounded-md transition-colors"
          title="Reset to Default"
        >
          <RefreshCw size={14} /> 
          <span className="hidden sm:inline">Reset</span>
        </button>

        <span className="text-xs text-slate-500 ml-2 italic">{saveStatus}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Viewport size toggles */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md p-1 mr-2 hidden md:flex">
          <button
            onClick={() => setPreviewSize('mobile')}
            className={twMerge("p-1.5 rounded-md transition-colors", previewSize === 'mobile' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300')}
            title="Mobile View"
          >
            <Smartphone size={16} />
          </button>
          <button
            onClick={() => setPreviewSize('tablet')}
            className={twMerge("p-1.5 rounded-md transition-colors", previewSize === 'tablet' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300')}
            title="Tablet View"
          >
            <Tablet size={16} />
          </button>
          <button
            onClick={() => setPreviewSize('full')}
            className={twMerge("p-1.5 rounded-md transition-colors", previewSize === 'full' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300')}
            title="Desktop View"
          >
            <Monitor size={16} />
          </button>
        </div>

        {/* Layout Toggle */}
        <button
          onClick={() => setLayout(layout === 'vertical' ? 'horizontal' : 'vertical')}
          className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-md transition-colors"
          title="Toggle Layout"
        >
          <LayoutTemplate size={16} />
        </button>

        {/* Export */}
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-md transition-colors"
          title="Download as ZIP"
        >
          <Download size={14} /> <span className="hidden sm:inline">Export</span>
        </button>

        {/* Settings Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={twMerge("flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors", showSettings ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300")}
          >
            <Settings size={14} />
          </button>
          
          {showSettings && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-50 flex flex-col gap-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Playground Settings</h4>
              
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                  <RefreshCw size={14} className={autoRun ? "text-[#518231]" : ""} /> Auto-Run Code
                </div>
                <input type="checkbox" className="accent-[#518231]" checked={autoRun} onChange={(e) => setAutoRun(e.target.checked)} />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                  <Zap size={14} className={useTailwind ? "text-cyan-500" : ""} /> Tailwind CSS (CDN)
                </div>
                <input type="checkbox" className="accent-[#518231]" checked={useTailwind} onChange={(e) => setUseTailwind(e.target.checked)} />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                  <LayoutTemplate size={14} className={useBootstrap ? "text-purple-500" : ""} /> Bootstrap 5 (CDN)
                </div>
                <input type="checkbox" className="accent-[#518231]" checked={useBootstrap} onChange={(e) => setUseBootstrap(e.target.checked)} />
              </label>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => {
                    setShowSettings(false);
                    onSettingsClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium bg-slate-100 dark:bg-slate-700 hover:bg-blue-500 hover:text-white text-slate-700 dark:text-slate-200 py-2 rounded-lg transition-colors"
                >
                  <Settings size={14} /> Advanced Settings
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
      
      {/* Click outside to close settings */}
      {showSettings && (
        <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)}></div>
      )}
    </div>
  );
}
