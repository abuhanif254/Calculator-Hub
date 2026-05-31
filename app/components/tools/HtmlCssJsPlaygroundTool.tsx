"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { PlaygroundToolbar } from './html-css-js-playground/PlaygroundToolbar';
import { PlaygroundEditor } from './html-css-js-playground/PlaygroundEditor';
import { PlaygroundPreview, ConsoleMessage } from './html-css-js-playground/PlaygroundPreview';
import { PlaygroundConsole } from './html-css-js-playground/PlaygroundConsole';
import JSZip from 'jszip';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FileCode2, FileJson, Files, Search, GitBranch, Blocks, Settings, CheckCircle2, AlertCircle, X, Copy, Share2, Trash2 } from 'lucide-react';
import { savePlaygroundPen, PlaygroundPen } from '@/lib/playgroundService';

const STORAGE_KEY = 'nexus_html_css_js_playground_v1';

const DEFAULT_HTML = `<!-- Welcome to Nexus Playground -->
<div class="container">
  <h1>Hello, World!</h1>
  <p>Start editing to see some magic happen 🌟</p>
  <button id="magicBtn">Click Me</button>
</div>`;

const DEFAULT_CSS = `/* CSS Styles here */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: #f8fafc;
  color: #334155;
}

.container {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

button {
  margin-top: 16px;
  padding: 10px 20px;
  background: #518231;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s;
}

button:active {
  transform: scale(0.95);
}`;

const DEFAULT_JS = `// JavaScript logic here
const btn = document.getElementById('magicBtn');

btn.addEventListener('click', () => {
  console.log('Magic button clicked!');
  btn.textContent = "It works! 🎉";
  btn.style.background = "#10b981";
});

// Say hi to the console
console.info("Playground loaded successfully.");`;

interface PlaygroundProps {
  initialData?: PlaygroundPen;
  penId?: string;
}

export function HtmlCssJsPlaygroundToolBase({ initialData, penId }: PlaygroundProps = {}) {
  const [html, setHtml] = useState(initialData?.html || DEFAULT_HTML);
  const [css, setCss] = useState(initialData?.css || DEFAULT_CSS);
  const [js, setJs] = useState(initialData?.js || DEFAULT_JS);
  
  const [htmlMode, setHtmlMode] = useState<'html' | 'markdown'>(initialData?.htmlMode || 'html');
  const [cssMode, setCssMode] = useState<'css' | 'scss'>(initialData?.cssMode || 'css');
  const [jsMode, setJsMode] = useState<'javascript' | 'babel'>(initialData?.jsMode || 'javascript');
  
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');
  const [previewSize, setPreviewSize] = useState<'full' | 'mobile' | 'tablet'>('full');
  
  const [autoRun, setAutoRun] = useState(true);
  const [runTrigger, setRunTrigger] = useState(0);
  const [formatTrigger, setFormatTrigger] = useState(0);
  
  const [useTailwind, setUseTailwind] = useState(initialData?.useTailwind || false);
  const [useBootstrap, setUseBootstrap] = useState(initialData?.useBootstrap || false);
  
  const [externalStylesheets, setExternalStylesheets] = useState<string[]>(initialData?.externalStylesheets || []);
  const [externalScripts, setExternalScripts] = useState<string[]>(initialData?.externalScripts || []);
  
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on');
  
  const [mainPanelLayout, setMainPanelLayout] = useState<number[] | undefined>(undefined);
  const [previewPanelLayout, setPreviewPanelLayout] = useState<number[] | undefined>(undefined);
  
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [saveStatus, setSaveStatus] = useState(initialData ? 'Loaded from Cloud' : 'All changes saved locally');
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (initialData) return; // Do not load from localStorage if we have initial data from cloud
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.html) setHtml(parsed.html);
        if (parsed.css) setCss(parsed.css);
        if (parsed.js) setJs(parsed.js);
        if (parsed.htmlMode) setHtmlMode(parsed.htmlMode);
        if (parsed.cssMode) setCssMode(parsed.cssMode);
        if (parsed.jsMode) setJsMode(parsed.jsMode);
        if (parsed.useTailwind !== undefined) setUseTailwind(parsed.useTailwind);
        if (parsed.useBootstrap !== undefined) setUseBootstrap(parsed.useBootstrap);
        if (parsed.externalStylesheets) setExternalStylesheets(parsed.externalStylesheets);
        if (parsed.externalScripts) setExternalScripts(parsed.externalScripts);
        if (parsed.fontSize) setFontSize(parsed.fontSize);
        if (parsed.wordWrap) setWordWrap(parsed.wordWrap);
        if (parsed.mainPanelLayout) setMainPanelLayout(parsed.mainPanelLayout);
        if (parsed.previewPanelLayout) setPreviewPanelLayout(parsed.previewPanelLayout);
      } catch (e) {
        console.error("Failed to parse saved playground state");
      }
    }
  }, [initialData]);

  // Save to localStorage
  const saveToLocal = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      html, css, js, htmlMode, cssMode, jsMode, useTailwind, useBootstrap, externalStylesheets, externalScripts, fontSize, wordWrap, mainPanelLayout, previewPanelLayout 
    }));
    setSaveStatus('All changes saved locally');
  }, [html, css, js, htmlMode, cssMode, jsMode, useTailwind, useBootstrap, externalStylesheets, externalScripts, fontSize, wordWrap, mainPanelLayout, previewPanelLayout]);

  const saveToCloud = useCallback(async () => {
    setIsSaving(true);
    setSaveStatus('Saving to cloud...');
    try {
      const id = await savePlaygroundPen({
        title: 'Nexus Pen',
        html, css, js, htmlMode, cssMode, jsMode, useTailwind, useBootstrap, externalStylesheets, externalScripts
      }, penId);
      
      setSaveStatus('Saved to cloud');
      return id;
    } catch (e) {
      console.error(e);
      setSaveStatus('Failed to save to cloud');
      return null;
    } finally {
      setIsSaving(false);
    }
  }, [html, css, js, htmlMode, cssMode, jsMode, useTailwind, useBootstrap, externalStylesheets, externalScripts, penId]);

  const handleShare = async () => {
    try {
      const id = await saveToCloud();
      if (id) {
        let basePath = window.location.href.split('?')[0];
        if (basePath.endsWith('/')) basePath = basePath.slice(0, -1);
        
        const isAlreadyShared = penId != null || basePath.match(/[a-z0-9]{8,16}$/i);
        
        let newUrl = basePath;
        if (!isAlreadyShared) {
          newUrl = `${basePath}/${id}`;
          // Update URL without reloading if it's a new pen
          try {
            window.history.pushState({}, '', newUrl);
          } catch (e) {
            console.error('Failed to update URL history:', e);
          }
        }
        
        setShareUrl(newUrl);
        setShowShareModal(true);
      }
    } catch (e) {
      console.error('Share failed:', e);
    }
  };

  // Auto save trigger
  useEffect(() => {
    if (initialData) return; // Don't auto-save to local if it's a cloud pen, wait actually we might want to auto-save to cloud? No, let's not auto-save to cloud to avoid excessive writes.
    setSaveStatus('Unsaved changes...');
    const timeout = setTimeout(saveToLocal, 3000);
    return () => clearTimeout(timeout);
  }, [html, css, js, htmlMode, cssMode, jsMode, useTailwind, useBootstrap, saveToLocal, initialData]);

  const handleReset = () => {
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setJs(DEFAULT_JS);
    setRunTrigger(prev => prev + 1);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveToLocal();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        setRunTrigger(prev => prev + 1);
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        setFormatTrigger(prev => prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveToLocal]);

  const handleExport = async () => {
    const zip = new JSZip();
    
    const customCss = externalStylesheets.map(url => `<link href="${url}" rel="stylesheet">`).join('\n  ');
    const customJs = externalScripts.map(url => `<script src="${url}"></script>`).join('\n  ');
    
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexus Playground Export</title>
  ${useTailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
  ${useBootstrap ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">' : ''}
  ${customCss}
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  ${html}
  
  ${useBootstrap ? '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>' : ''}
  ${customJs}
  <script src="script.js"></script>
</body>
</html>`;

    zip.file("index.html", htmlContent);
    zip.file("styles.css", css);
    zip.file("script.js", js);
    
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nexus-playground-export.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleConsoleMessage = useCallback((msg: ConsoleMessage) => {
    setConsoleMessages(prev => [...prev, msg]);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] min-h-[600px] lg:h-[800px] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
      <PlaygroundToolbar
        onRun={() => setRunTrigger(prev => prev + 1)}
        onSave={initialData ? saveToCloud : saveToLocal}
        onShare={handleShare}
        onExport={handleExport}
        onFormat={() => setFormatTrigger(prev => prev + 1)}
        autoRun={autoRun}
        setAutoRun={setAutoRun}
        useTailwind={useTailwind}
        setUseTailwind={setUseTailwind}
        useBootstrap={useBootstrap}
        setUseBootstrap={setUseBootstrap}
        layout={layout}
        setLayout={setLayout}
        previewSize={previewSize}
        setPreviewSize={setPreviewSize}
        saveStatus={saveStatus}
        onReset={handleReset}
        onSettingsClick={() => setShowSettingsModal(true)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar (VS Code style) */}
        <div className="w-12 bg-[#333333] hidden md:flex flex-col items-center py-4 border-r border-[#252526] shrink-0 z-20 justify-between">
          <div className="flex flex-col gap-6 w-full items-center text-[#858585]">
            <button className="text-white relative hover:text-white transition-colors" title="Explorer">
              <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-[2px] h-8 bg-blue-500"></div>
              <Files size={24} strokeWidth={1.5} />
            </button>
            <button className="hover:text-white transition-colors" title="Search"><Search size={24} strokeWidth={1.5} /></button>
            <button className="hover:text-white transition-colors" title="Source Control"><GitBranch size={24} strokeWidth={1.5} /></button>
            <button className="hover:text-white transition-colors" title="Extensions"><Blocks size={24} strokeWidth={1.5} /></button>
          </div>
          <div className="flex flex-col gap-6 w-full items-center text-[#858585]">
            <button className="hover:text-white transition-colors" title="Settings"><Settings size={24} strokeWidth={1.5} /></button>
          </div>
        </div>

        <Group 
          orientation={layout === 'vertical' ? 'horizontal' : 'vertical'} 
          className="flex-1"
          onLayoutChange={(sizes: any) => setMainPanelLayout(sizes)}
        >
          {/* Editor Section */}
          <Panel 
            defaultSize={mainPanelLayout ? mainPanelLayout[0] : 50} 
            minSize={20} 
            className="flex flex-col border-slate-200 dark:border-[#252526] relative z-10 bg-[#1e1e1e]"
          >
            {/* Tabs (VS Code style) */}
            <div className="flex bg-[#252526] overflow-x-auto custom-scrollbar shrink-0 items-center">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('html')}
                  className={twMerge(
                    "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 relative", 
                    activeTab === 'html' ? "text-[#cccccc] bg-[#1e1e1e]" : "text-[#969696] hover:bg-[#2a2d2e] bg-[#2d2d2d]"
                  )}
                >
                  {activeTab === 'html' && <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500"></div>}
                  <FileCode2 size={16} className="text-[#e34c26]" />
                  <select 
                    value={htmlMode} 
                    onChange={(e) => setHtmlMode(e.target.value as 'html' | 'markdown')}
                    className="bg-transparent outline-none cursor-pointer appearance-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="html" className="bg-[#2d2d2d]">index.html</option>
                    <option value="markdown" className="bg-[#2d2d2d]">index.md</option>
                  </select>
                </button>
                
                <button
                  onClick={() => setActiveTab('css')}
                  className={twMerge(
                    "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 relative border-l border-[#1e1e1e]", 
                    activeTab === 'css' ? "text-[#cccccc] bg-[#1e1e1e]" : "text-[#969696] hover:bg-[#2a2d2e] bg-[#2d2d2d]"
                  )}
                >
                  {activeTab === 'css' && <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500"></div>}
                  <FileCode2 size={16} className="text-[#264de4]" />
                  <select 
                    value={cssMode} 
                    onChange={(e) => setCssMode(e.target.value as 'css' | 'scss')}
                    className="bg-transparent outline-none cursor-pointer appearance-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="css" className="bg-[#2d2d2d]">styles.css</option>
                    <option value="scss" className="bg-[#2d2d2d]">styles.scss</option>
                  </select>
                </button>
                
                <button
                  onClick={() => setActiveTab('js')}
                  className={twMerge(
                    "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 relative border-l border-[#1e1e1e]", 
                    activeTab === 'js' ? "text-[#cccccc] bg-[#1e1e1e]" : "text-[#969696] hover:bg-[#2a2d2e] bg-[#2d2d2d]"
                  )}
                >
                  {activeTab === 'js' && <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500"></div>}
                  <FileCode2 size={16} className="text-[#f7df1e]" />
                  <select 
                    value={jsMode} 
                    onChange={(e) => setJsMode(e.target.value as 'javascript' | 'babel')}
                    className="bg-transparent outline-none cursor-pointer appearance-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="javascript" className="bg-[#2d2d2d]">script.js</option>
                    <option value="babel" className="bg-[#2d2d2d]">script.jsx (Babel)</option>
                  </select>
                </button>
              </div>
              <div className="flex-1 bg-[#252526] h-full border-b border-[#1e1e1e]"></div>
            </div>
            
            {/* Active Editor */}
            <div className="flex-1 relative overflow-hidden bg-white dark:bg-[#1e1e1e]">
              <div className={twMerge("absolute inset-0", activeTab === 'html' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none')}>
                <PlaygroundEditor language={htmlMode} value={html} onChange={(v) => setHtml(v || '')} formatTrigger={activeTab === 'html' ? formatTrigger : 0} fontSize={fontSize} wordWrap={wordWrap} />
              </div>
              <div className={twMerge("absolute inset-0", activeTab === 'css' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none')}>
                <PlaygroundEditor language={cssMode} value={css} onChange={(v) => setCss(v || '')} formatTrigger={activeTab === 'css' ? formatTrigger : 0} fontSize={fontSize} wordWrap={wordWrap} />
              </div>
              <div className={twMerge("absolute inset-0", activeTab === 'js' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none')}>
                <PlaygroundEditor language="javascript" value={js} onChange={(v) => setJs(v || '')} formatTrigger={activeTab === 'js' ? formatTrigger : 0} fontSize={fontSize} wordWrap={wordWrap} />
              </div>
            </div>
            
            {/* Status Bar (VS Code style) */}
            <div className="h-[22px] bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] select-none shrink-0 font-sans">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded transition-colors"><GitBranch size={12}/> main</span>
                {saveStatus === 'Unsaved changes...' ? (
                  <span className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded transition-colors"><AlertCircle size={12}/> Unsaved</span>
                ) : (
                  <span className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded transition-colors"><CheckCircle2 size={12}/> Saved</span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">Ln 1, Col 1</span>
                <span className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">Spaces: 2</span>
                <span className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">UTF-8</span>
                <span className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors uppercase">{activeTab === 'js' ? 'JavaScript' : activeTab}</span>
                <span className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">Prettier</span>
              </div>
            </div>
          </Panel>

          <Separator className={twMerge(
            "bg-[#2d2d2d] hover:bg-blue-500 transition-colors z-20 flex items-center justify-center relative",
            layout === 'vertical' ? 'w-[4px] cursor-col-resize' : 'h-[4px] cursor-row-resize'
          )}>
            <div className={twMerge("bg-gray-400 absolute", layout === 'vertical' ? 'h-8 w-[2px]' : 'w-8 h-[2px]')} />
          </Separator>

          {/* Preview Section */}
            <Panel 
              defaultSize={mainPanelLayout ? mainPanelLayout[1] : 50} 
              minSize={20} 
              className={clsx(
                "bg-slate-100 dark:bg-[#1e1e1e] flex flex-col relative",
                layout === 'vertical' ? 'border-l border-slate-200 dark:border-slate-800' : 'border-t border-slate-200 dark:border-slate-800'
              )}
            >
              <Group orientation="vertical" onLayoutChange={(sizes: any) => setPreviewPanelLayout(sizes)}>
                <Panel defaultSize={previewPanelLayout ? previewPanelLayout[0] : 70} minSize={30} className="relative flex flex-col">
                <div className="flex-1 min-h-0 bg-white">
                  <div className={clsx(
                    "h-full w-full mx-auto transition-all duration-300",
                    previewSize === 'mobile' ? 'max-w-[375px] border-x border-slate-200 shadow-xl' :
                    previewSize === 'tablet' ? 'max-w-[768px] border-x border-slate-200 shadow-xl' :
                    'max-w-none'
                  )}>
                    <PlaygroundPreview 
                      html={html}
                      css={css}
                      js={js}
                      htmlMode={htmlMode}
                      cssMode={cssMode}
                      jsMode={jsMode}
                      autoRun={autoRun}
                      runTrigger={runTrigger}
                      useTailwind={useTailwind}
                      useBootstrap={useBootstrap}
                      externalStylesheets={externalStylesheets}
                      externalScripts={externalScripts}
                      onConsoleMessage={handleConsoleMessage}
                      onClearConsole={() => setConsoleMessages([])}
                    />
                  </div>
                </div>
              </Panel>
              
              <Separator className="h-[4px] bg-[#2d2d2d] hover:bg-blue-500 transition-colors z-20 flex items-center justify-center relative cursor-row-resize">
                 <div className="bg-gray-400 w-8 h-[2px] absolute" />
              </Separator>

              <Panel defaultSize={previewPanelLayout ? previewPanelLayout[1] : 30} minSize={10} className="shrink-0 border-slate-200 dark:border-slate-800">
                <PlaygroundConsole 
                  messages={consoleMessages} 
                  onClear={() => setConsoleMessages([])} 
                />
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
      
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Share2 size={18} className="text-blue-500" /> Share your Playground
              </h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Direct Link</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={shareUrl}
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl).then(() => {
                        alert('Link copied to clipboard!');
                      }).catch(e => {
                        console.error('Clipboard failed', e);
                        alert('Failed to copy. Please select the text manually.');
                      });
                    }}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex-shrink-0"
                    title="Copy Link"
                  >
                    <Copy size={18} />
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Share this link to let others view and edit your code.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Embed (iframe)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={`<iframe src="${shareUrl.replace('/html-css-js-playground/', '/html-css-js-playground/embed/')}" width="100%" height="500" frameborder="0"></iframe>`}
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`<iframe src="${shareUrl.replace('/html-css-js-playground/', '/html-css-js-playground/embed/')}" width="100%" height="500" frameborder="0"></iframe>`).then(() => {
                        alert('Embed code copied!');
                      }).catch(e => {
                        console.error('Clipboard failed', e);
                        alert('Failed to copy. Please select the text manually.');
                      });
                    }}
                    className="p-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors flex-shrink-0"
                    title="Copy Embed Code"
                  >
                    <Copy size={18} />
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Add this snippet to your blog or documentation.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button 
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Settings size={20} className="text-blue-500" />
                Playground Settings
              </h2>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">External Scripts (JS)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Add URLs to external JavaScript libraries (loaded in order before your code).</p>
                {externalScripts.map((script, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={script}
                      onChange={e => {
                        const newScripts = [...externalScripts];
                        newScripts[idx] = e.target.value;
                        setExternalScripts(newScripts);
                      }}
                      className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      placeholder="https://cdnjs.cloudflare.com/..."
                    />
                    <button 
                      onClick={() => setExternalScripts(externalScripts.filter((_, i) => i !== idx))}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setExternalScripts([...externalScripts, ''])}
                  className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  + Add Script
                </button>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-slate-500 py-1">Quick Add:</span>
                  <button onClick={() => setExternalScripts([...externalScripts, 'https://unpkg.com/react@18/umd/react.development.js', 'https://unpkg.com/react-dom@18/umd/react-dom.development.js'])} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs hover:bg-slate-200 dark:hover:bg-slate-700">React</button>
                  <button onClick={() => setExternalScripts([...externalScripts, 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'])} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs hover:bg-slate-200 dark:hover:bg-slate-700">GSAP</button>
                  <button onClick={() => setExternalScripts([...externalScripts, 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js'])} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs hover:bg-slate-200 dark:hover:bg-slate-700">Lodash</button>
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-slate-800" />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">External Stylesheets (CSS)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Add URLs to external CSS files.</p>
                {externalStylesheets.map((sheet, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={sheet}
                      onChange={e => {
                        const newSheets = [...externalStylesheets];
                        newSheets[idx] = e.target.value;
                        setExternalStylesheets(newSheets);
                      }}
                      className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      placeholder="https://cdnjs.cloudflare.com/..."
                    />
                    <button 
                      onClick={() => setExternalStylesheets(externalStylesheets.filter((_, i) => i !== idx))}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setExternalStylesheets([...externalStylesheets, ''])}
                  className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  + Add Stylesheet
                </button>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-slate-500 py-1">Quick Add:</span>
                  <button onClick={() => setExternalStylesheets([...externalStylesheets, 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'])} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs hover:bg-slate-200 dark:hover:bg-slate-700">FontAwesome</button>
                  <button onClick={() => setExternalStylesheets([...externalStylesheets, 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'])} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs hover:bg-slate-200 dark:hover:bg-slate-700">Animate.css</button>
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-slate-800" />

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Editor Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Font Size</label>
                    <select 
                      value={fontSize} 
                      onChange={e => setFontSize(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                      {[10, 12, 14, 16, 18, 20, 24].map(size => (
                        <option key={size} value={size}>{size}px</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Word Wrap</label>
                    <select 
                      value={wordWrap} 
                      onChange={e => setWordWrap(e.target.value as 'on' | 'off')}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="on">On</option>
                      <option value="off">Off</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button 
                onClick={() => {
                  setExternalScripts(externalScripts.filter(s => s.trim() !== ''));
                  setExternalStylesheets(externalStylesheets.filter(s => s.trim() !== ''));
                  setShowSettingsModal(false);
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HtmlCssJsPlaygroundTool() {
  return <HtmlCssJsPlaygroundToolBase />;
}
