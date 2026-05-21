'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Globe, FileText, Download, Copy, Check, Info, Server, Activity, 
  FileJson, AlertTriangle, RefreshCw, Eye, Laptop, Smartphone,
  Cpu, Compass, Settings, AlertCircle, ArrowLeftRight, CheckCircle2,
  XCircle, Terminal
} from 'lucide-react';
import { UAParser } from 'ua-parser-js';

// Predefined presets
const PRESETS = [
  {
    name: 'Chrome (Windows)',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    category: 'Desktop'
  },
  {
    name: 'Safari (iPhone)',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
    category: 'Mobile'
  },
  {
    name: 'Chrome (Android)',
    ua: 'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
    category: 'Mobile'
  },
  {
    name: 'Firefox (macOS)',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0',
    category: 'Desktop'
  },
  {
    name: 'Googlebot',
    ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    category: 'Search Engine'
  },
  {
    name: 'GPTBot (ChatGPT)',
    ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)',
    category: 'AI Crawler'
  },
  {
    name: 'ClaudeBot',
    ua: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
    category: 'AI Crawler'
  },
  {
    name: 'Bingbot',
    ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    category: 'Search Engine'
  }
];

interface BotInfo {
  isBot: boolean;
  name: string;
  type: string;
  purpose: string;
  link: string | null;
}

interface BrowserCapabilities {
  webp: boolean;
  es6: boolean;
  cssGrid: boolean;
  pwa: boolean;
}

// Bot Detection Helper
function detectBot(ua: string): BotInfo {
  const lower = ua.toLowerCase();
  if (lower.includes('googlebot')) {
    return {
      isBot: true,
      name: 'Googlebot',
      type: 'Search Engine Crawler',
      purpose: 'Official crawler representing Google Search indices. Scans and indexes web pages for relevance.',
      link: 'https://developers.google.com/search/docs/crawling-indexing/googlebot'
    };
  }
  if (lower.includes('bingbot')) {
    return {
      isBot: true,
      name: 'Bingbot',
      type: 'Search Engine Crawler',
      purpose: 'Microsoft\'s web crawling robot for the Bing search search index.',
      link: 'https://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c205f3a'
    };
  }
  if (lower.includes('gptbot')) {
    return {
      isBot: true,
      name: 'GPTBot',
      type: 'AI Training Scraper',
      purpose: 'OpenAI\'s autonomous crawler designed to harvest natural language data for training models like GPT-4.',
      link: 'https://platform.openai.com/docs/gptbot'
    };
  }
  if (lower.includes('claudebot')) {
    return {
      isBot: true,
      name: 'ClaudeBot',
      type: 'AI Training Scraper',
      purpose: 'Anthropic\'s data scraper utilized to index internet databases for training Claude AI models.',
      link: 'https://support.anthropic.com/en/articles/8896518-what-is-claudebot-and-how-to-block-it'
    };
  }
  if (lower.includes('ahrefsbot')) {
    return {
      isBot: true,
      name: 'AhrefsBot',
      type: 'SEO Marketing Crawler',
      purpose: 'Commercial web crawler operated by Ahrefs to build search analytics, backlinks database, and index tracking.',
      link: 'https://ahrefs.com/robot'
    };
  }
  if (lower.includes('semrushbot')) {
    return {
      isBot: true,
      name: 'SemrushBot',
      type: 'SEO Marketing Crawler',
      purpose: 'Commercial SEO crawler used by Semrush to audit architectures, monitor traffic rank, and map search positions.',
      link: 'https://www.semrush.com/bot/'
    };
  }
  if (lower.includes('applebot')) {
    return {
      isBot: true,
      name: 'Applebot',
      type: 'Search / Assistant Crawler',
      purpose: 'Crawl spider utilized by Apple Siri and Spotlight to supply web recommendations and index database records.',
      link: 'https://support.apple.com/en-us/HT204683'
    };
  }
  if (lower.includes('twitterbot')) {
    return {
      isBot: true,
      name: 'Social Media Link Previewer',
      type: 'Social Scraper',
      purpose: 'Fetches HTML open graph metadata properties to construct content cards shared in Twitter/X timeline posts.',
      link: 'https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started'
    };
  }
  if (lower.includes('facebookexternalhit')) {
    return {
      isBot: true,
      name: 'Facebook Link Previewer',
      type: 'Social Scraper',
      purpose: 'Retrieves website thumbnails, preview summaries, and headers when shared on Meta networks (Facebook/Instagram).',
      link: 'https://developers.facebook.com/docs/sharing/webmasters/crawler'
    };
  }
  if (lower.includes('yandexbot') || lower.includes('yandex')) {
    return {
      isBot: true,
      name: 'YandexBot',
      type: 'Search Engine Crawler',
      purpose: 'Primary indexing agent supporting the Yandex Russian and Eastern European search index portal.',
      link: 'https://yandex.com/support/webmaster/robot-workings/yandex-robots.html'
    };
  }
  if (lower.includes('baiduspider')) {
    return {
      isBot: true,
      name: 'Baiduspider',
      type: 'Search Engine Crawler',
      purpose: 'Crawl engine supporting the Chinese Baidu internet search services.',
      link: 'https://www.baidu.com/search/spider.html'
    };
  }
  
  // Generic bot detection
  const botKeywords = ['bot', 'crawler', 'spider', 'scrap', 'fetcher', 'curl', 'wget', 'python', 'http-client', 'headless'];
  if (botKeywords.some(keyword => lower.includes(keyword))) {
    return {
      isBot: true,
      name: 'Automated Bot / Script',
      type: 'Generic Scraper or Script',
      purpose: 'Identified as an automated HTTP agent, library, curl utility, or background headless parser script.',
      link: null
    };
  }

  return {
    isBot: false,
    name: '',
    type: '',
    purpose: '',
    link: null
  };
}

// Capability Predictor
function predictCapabilities(browserName: string | undefined, browserVersion: string | undefined): BrowserCapabilities {
  if (!browserName || !browserVersion) {
    return { webp: false, es6: false, cssGrid: false, pwa: false };
  }
  
  const version = parseFloat(browserVersion);
  if (isNaN(version)) {
    return { webp: true, es6: true, cssGrid: true, pwa: true };
  }
  
  const name = browserName.toLowerCase();
  
  let webp = false;
  let es6 = false;
  let cssGrid = false;
  let pwa = false;
  
  if (name.includes('chrome') || name.includes('chromium') || name.includes('opera') || name.includes('edge')) {
    webp = version >= 9;
    es6 = version >= 51;
    cssGrid = version >= 57;
    pwa = version >= 40;
  } else if (name.includes('firefox')) {
    webp = version >= 65;
    es6 = version >= 54;
    cssGrid = version >= 52;
    pwa = version >= 44;
  } else if (name.includes('safari') || name.includes('mobile safari')) {
    webp = version >= 14;
    es6 = version >= 10;
    cssGrid = version >= 10.1;
    pwa = version >= 11.1;
  } else {
    webp = true;
    es6 = true;
    cssGrid = true;
    pwa = true;
  }
  
  return { webp, es6, cssGrid, pwa };
}

export function UserAgentParserTool() {
  const [activeTab, setActiveTab] = useState<'parse' | 'compare'>('parse');
  const [uaInput, setUaInput] = useState('');
  const [detectedUa, setDetectedUa] = useState('');
  
  // Comparative Inputs
  const [uaA, setUaA] = useState('');
  const [uaB, setUaB] = useState('');

  // UI status hooks
  const [copiedAction, setCopiedAction] = useState<'json' | 'txt' | 'copy' | 'copyA' | 'copyB' | null>(null);

  // Parse result states
  const [result, setResult] = useState<any>(null);
  const [botInfo, setBotInfo] = useState<BotInfo>({ isBot: false, name: '', type: '', purpose: '', link: null });
  const [capabilities, setCapabilities] = useState<BrowserCapabilities>({ webp: false, es6: false, cssGrid: false, pwa: false });
  const [warnings, setWarnings] = useState<string[]>([]);

  // Side-by-side parsed structures
  const [resultA, setResultA] = useState<any>(null);
  const [resultB, setResultB] = useState<any>(null);
  const [botA, setBotA] = useState<BotInfo>({ isBot: false, name: '', type: '', purpose: '', link: null });
  const [botB, setBotB] = useState<BotInfo>({ isBot: false, name: '', type: '', purpose: '', link: null });

  // Core Parsing Handler
  const executeParse = useCallback((uaStr: string) => {
    if (!uaStr.trim()) return;
    const parser = new UAParser(uaStr);
    const parsed = parser.getResult();
    setResult(parsed);
    
    // Evaluate Bot
    const bot = detectBot(uaStr);
    setBotInfo(bot);

    // Predict Capabilities
    const caps = predictCapabilities(parsed.browser.name, parsed.browser.version);
    setCapabilities(caps);

    // Formulate legacy warnings
    const legacyAlerts: string[] = [];
    const bName = parsed.browser.name?.toLowerCase() || '';
    const bVer = parseFloat(parsed.browser.version || '0');
    const osName = parsed.os.name?.toLowerCase() || '';
    const engineName = parsed.engine.name?.toLowerCase() || '';

    if (bName.includes('internet explorer') || bName === 'ie' || engineName.includes('trident')) {
      legacyAlerts.push('Trident (Internet Explorer) is a deprecated rendering engine. Expect layout breakages and severe script issues.');
    }
    if (bName.includes('safari') && bVer < 14) {
      legacyAlerts.push(`Safari v${parsed.browser.version} is outdated. Modern layout grids and WebP media compression may fail.`);
    }
    if (bName.includes('chrome') && bVer < 80) {
      legacyAlerts.push(`Chrome v${parsed.browser.version} is legacy. Consider upgrading to avoid web standards limitations.`);
    }
    if (osName.includes('windows xp') || osName.includes('windows 7')) {
      legacyAlerts.push(`Operating System (${parsed.os.name}) is no longer supported by vendors. High security vulnerability index.`);
    }
    setWarnings(legacyAlerts);

    // Sync query parameters for shareability
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('ua', uaStr);
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
  }, []);

  // Comparative Parser Handler
  const executeCompare = useCallback((valA: string, valB: string) => {
    const parserA = new UAParser(valA);
    const parserB = new UAParser(valB);

    setResultA(parserA.getResult());
    setResultB(parserB.getResult());

    setBotA(detectBot(valA));
    setBotB(detectBot(valB));
  }, []);

  // Initialization & URL Detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUa = navigator.userAgent;
      setDetectedUa(currentUa);

      const params = new URLSearchParams(window.location.search);
      const urlUa = params.get('ua') || params.get('query');

      if (urlUa) {
        setUaInput(urlUa);
        executeParse(urlUa);
      } else {
        setUaInput(currentUa);
        executeParse(currentUa);
      }

      // Default comparison inputs
      setUaA(currentUa);
      setUaB(PRESETS[4].ua); // Pre-load Googlebot for quick visual diff comparison
      executeCompare(currentUa, PRESETS[4].ua);
    }
  }, [executeParse, executeCompare]);

  // Handle Preset Click
  const handlePresetSelect = (presetUa: string) => {
    if (activeTab === 'parse') {
      setUaInput(presetUa);
      executeParse(presetUa);
    } else {
      // Comparison active - load into slot A or B based on which is blank or overwrite A
      setUaA(presetUa);
      executeCompare(presetUa, uaB);
    }
  };

  const handleDetectMyBrowser = () => {
    setUaInput(detectedUa);
    executeParse(detectedUa);
  };

  // Clipboard Copier
  const handleCopy = (text: string, actionId: 'json' | 'txt' | 'copy' | 'copyA' | 'copyB') => {
    navigator.clipboard.writeText(text);
    setCopiedAction(actionId);
    setTimeout(() => setCopiedAction(null), 2000);
  };

  // Export handlers
  const handleDownload = (type: 'json' | 'txt') => {
    if (!result) return;
    let content = '';
    let filename = 'user-agent-report';

    if (type === 'json') {
      content = JSON.stringify({ result, botInfo, capabilities, warnings }, null, 2);
      filename += '.json';
    } else {
      content = `====================================================\n`;
      content += `USER AGENT PARSER DIAGNOSTIC REPORT\n`;
      content += `Generated: ${new Date().toLocaleString()}\n`;
      content += `====================================================\n\n`;
      content += `[RAW USER AGENT STRING]\n${result.ua}\n\n`;
      content += `[PARSED SPECIFICATIONS]\n`;
      content += `- Browser: ${result.browser.name || 'Unknown'} (Version: ${result.browser.version || 'Unknown'})\n`;
      content += `- Operating System: ${result.os.name || 'Unknown'} (Version: ${result.os.version || 'Unknown'})\n`;
      content += `- Engine: ${result.engine.name || 'Unknown'} (Version: ${result.engine.version || 'Unknown'})\n`;
      content += `- Device Type: ${result.device.type || 'Desktop'}\n`;
      content += `- Device Vendor: ${result.device.vendor || 'Generic'}\n`;
      content += `- Device Model: ${result.device.model || 'Generic'}\n`;
      content += `- CPU Architecture: ${result.cpu.architecture || 'Unknown'}\n\n`;

      content += `[BOT & CRAWLER AUDIT]\n`;
      content += `- Bot Flag: ${botInfo.isBot ? 'Yes' : 'No'}\n`;
      if (botInfo.isBot) {
        content += `- Bot Identifier: ${botInfo.name}\n`;
        content += `- Bot Classification: ${botInfo.type}\n`;
        content += `- Bot Purpose: ${botInfo.purpose}\n`;
      }
      content += `\n`;

      content += `[CAPABILITY & WEB STANDARDS SUPPORT]\n`;
      content += `- WebP Media: ${capabilities.webp ? 'Supported' : 'Not Supported'}\n`;
      content += `- ES6 JavaScript: ${capabilities.es6 ? 'Supported' : 'Not Supported'}\n`;
      content += `- CSS Grid: ${capabilities.cssGrid ? 'Supported' : 'Not Supported'}\n`;
      content += `- Progressive Web App (PWA): ${capabilities.pwa ? 'Supported' : 'Not Supported'}\n\n`;

      if (warnings.length > 0) {
        content += `[SECURITY & DEPRECATION WARNINGS]\n`;
        warnings.forEach((warn, index) => {
          content += `  ${index + 1}. [!] ${warn}\n`;
        });
      }
      filename += '.txt';
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Re-run comparison execution
  const runComparison = (e: React.FormEvent) => {
    e.preventDefault();
    executeCompare(uaA, uaB);
  };

  return (
    <div className="space-y-8">
      {/* Quick Preset Selector */}
      <div className="p-4 bg-slate-50/70 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select User Agent Preset
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePresetSelect(preset.ua)}
              className="px-3 py-1.5 bg-white dark:bg-slate-950 hover:bg-[#518231]/10 dark:hover:bg-[#518231]/20 border border-slate-200 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231] text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg transition-all shadow-sm cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('parse')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-all select-none cursor-pointer ${
            activeTab === 'parse'
              ? 'border-[#518231] text-[#518231]'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Compass size={18} />
          <span>Parser Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-all select-none cursor-pointer ${
            activeTab === 'compare'
              ? 'border-[#518231] text-[#518231]'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <ArrowLeftRight size={18} />
          <span>Compare User Agents</span>
        </button>
      </div>

      {/* parser Tab Workspace */}
      {activeTab === 'parse' && (
        <div className="space-y-6 animate-fade-in">
          {/* Input Section */}
          <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-inner">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Raw User Agent String
                </label>
                <button
                  onClick={handleDetectMyBrowser}
                  className="px-3 py-1 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-xs font-bold text-[#518231] dark:text-[#6fa844] border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Eye size={14} />
                  <span>My Browser</span>
                </button>
              </div>

              <div className="relative">
                <textarea
                  value={uaInput}
                  onChange={(e) => setUaInput(e.target.value)}
                  placeholder="Paste User Agent string here..."
                  className="w-full min-h-[100px] p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] dark:focus:ring-[#6fa844] focus:border-transparent text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all font-mono text-sm shadow-sm leading-relaxed"
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  {uaInput.length} characters
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUaInput('')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => executeParse(uaInput)}
                    className="px-5 py-2 bg-[#518231] hover:bg-[#436c29] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={14} className="hover:rotate-45 transition-transform" />
                    <span>Parse Agent</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Dashboard */}
          {result && (
            <div className="space-y-6">
              {/* Bot detection callout (if applicable) */}
              {botInfo.isBot && (
                <div className="p-5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-start gap-4 shadow-sm">
                  <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                    <Server size={22} />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-amber-800 dark:text-amber-300 text-lg">
                        {botInfo.name} Detected
                      </span>
                      <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-xs font-bold rounded">
                        {botInfo.type}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {botInfo.purpose}
                    </p>
                    {botInfo.link && (
                      <a
                        href={botInfo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#518231] hover:underline font-bold"
                      >
                        <span>Learn about this bot</span>
                        <Terminal size={12} />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Legacy warnings banner (if applicable) */}
              {warnings.length > 0 && (
                <div className="p-5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-start gap-4 shadow-sm">
                  <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                    <AlertTriangle size={22} />
                  </div>
                  <div className="space-y-1">
                    <div className="font-extrabold text-red-800 dark:text-red-300 text-lg">
                      Compatibility & Security Warnings
                    </div>
                    <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      {warnings.map((warn, index) => (
                        <li key={index}>{warn}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Core Dashboard Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Browser Card */}
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Globe size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Browser
                    </div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-lg">
                      {result.browser.name || 'Unknown'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Version {result.browser.version || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Operating System Card */}
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <Laptop size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      OS / Platform
                    </div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-lg">
                      {result.os.name || 'Unknown'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Version {result.os.version || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Device Category Card */}
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-xl">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Device Type
                    </div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-lg capitalize">
                      {result.device.type || (botInfo.isBot ? 'Bot / Scraper' : 'Desktop')}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {result.device.vendor || 'Generic'} {result.device.model || ''}
                    </div>
                  </div>
                </div>

                {/* Rendering Engine Card */}
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-xl">
                    <Compass size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Layout Engine
                    </div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-lg">
                      {result.engine.name || 'Unknown'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Version {result.engine.version || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware specifications & Engine details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Card: Spec details */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Settings className="text-[#518231]" size={18} />
                    <span>Technical Architecture Specs</span>
                  </h3>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">CPU Architecture</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                        {result.cpu.architecture || 'Unknown / Mixed'}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Device Vendor</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">
                        {result.device.vendor || 'Generic / Universal'}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Device Model</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">
                        {result.device.model || 'N/A'}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Primary Browser Agent</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">
                        {result.browser.name || 'Unknown Engine'}
                      </span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Major Version</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                        {result.browser.major || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Card: Capability predictions */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Activity className="text-emerald-500" size={18} />
                    <span>Estimated Feature Support Matrix</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-400">WebP Support</div>
                      {capabilities.webp ? (
                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      ) : (
                        <XCircle size={18} className="text-red-500 shrink-0" />
                      )}
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-400">ES6 JavaScript</div>
                      {capabilities.es6 ? (
                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      ) : (
                        <XCircle size={18} className="text-red-500 shrink-0" />
                      )}
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-400">CSS Grid Layout</div>
                      {capabilities.cssGrid ? (
                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      ) : (
                        <XCircle size={18} className="text-red-500 shrink-0" />
                      )}
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-400">PWA Service Workers</div>
                      {capabilities.pwa ? (
                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      ) : (
                        <XCircle size={18} className="text-red-500 shrink-0" />
                      )}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 italic mt-2 leading-relaxed">
                    Note: Feature support flags are estimated using parsed version thresholds of the rendering engine. Physical capabilities may vary based on hardware limitations.
                  </div>
                </div>
              </div>

              {/* JSON raw response payload viewer */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FileJson size={18} className="text-green-400" />
                    <span className="text-xs font-extrabold text-white uppercase tracking-wider">Raw Parsed JSON Metadata</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(JSON.stringify(result, null, 2), 'json')}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    >
                      {copiedAction === 'json' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      <span>{copiedAction === 'json' ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => handleDownload('json')}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download JSON</span>
                    </button>
                    <button
                      onClick={() => handleDownload('txt')}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>Export TXT</span>
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-slate-950">
                  <pre className="text-xs text-slate-300 font-mono overflow-x-auto max-h-[300px] leading-relaxed custom-scrollbar">
                    <code>{JSON.stringify({
                      browser: result.browser,
                      cpu: result.cpu,
                      device: result.device,
                      engine: result.engine,
                      os: result.os,
                      ua: result.ua,
                      bot: botInfo,
                      estimatedCapabilities: capabilities
                    }, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Comparison Tab Workspace */}
      {activeTab === 'compare' && (
        <div className="space-y-6 animate-fade-in">
          {/* Comparative Input Forms */}
          <form onSubmit={runComparison} className="bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-inner space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Agent A */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    User Agent A (Base)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy(uaA, 'copyA')}
                    className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1.5 font-bold cursor-pointer"
                  >
                    {copiedAction === 'copyA' ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    <span>{copiedAction === 'copyA' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <textarea
                  value={uaA}
                  onChange={(e) => setUaA(e.target.value)}
                  placeholder="Paste User Agent A string..."
                  className="w-full min-h-[90px] p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all font-mono text-xs leading-relaxed"
                />
              </div>

              {/* Agent B */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    User Agent B (Compare)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy(uaB, 'copyB')}
                    className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1.5 font-bold cursor-pointer"
                  >
                    {copiedAction === 'copyB' ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    <span>{copiedAction === 'copyB' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <textarea
                  value={uaB}
                  onChange={(e) => setUaB(e.target.value)}
                  placeholder="Paste User Agent B string..."
                  className="w-full min-h-[90px] p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all font-mono text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#518231] hover:bg-[#436c29] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeftRight size={16} />
                <span>Run Comparison Diff</span>
              </button>
            </div>
          </form>

          {/* Comparison Details Grid */}
          {resultA && resultB && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/4">Spec Property</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/3">User Agent A</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/3">User Agent B</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center w-1/12">Diff</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                    {/* Raw String */}
                    <tr>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Raw User Agent</td>
                      <td className="p-4 font-mono text-xs text-slate-800 dark:text-slate-300 break-all select-all">{resultA.ua}</td>
                      <td className="p-4 font-mono text-xs text-slate-800 dark:text-slate-300 break-all select-all">{resultB.ua}</td>
                      <td className="p-4 text-center">
                        {resultA.ua === resultB.ua ? (
                          <span className="text-green-500 font-bold text-xs px-2 py-1 rounded bg-green-50 dark:bg-green-950/20">Match</span>
                        ) : (
                          <span className="text-red-500 font-bold text-xs px-2 py-1 rounded bg-red-50 dark:bg-red-950/20">Diff</span>
                        )}
                      </td>
                    </tr>

                    {/* Browser name */}
                    <tr>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Browser Name</td>
                      <td className="p-4 font-extrabold text-slate-800 dark:text-slate-200">{resultA.browser.name || 'Unknown'}</td>
                      <td className="p-4 font-extrabold text-slate-800 dark:text-slate-200">{resultB.browser.name || 'Unknown'}</td>
                      <td className="p-4 text-center">
                        {resultA.browser.name === resultB.browser.name ? (
                          <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                        ) : (
                          <XCircle className="text-red-500 mx-auto" size={18} />
                        )}
                      </td>
                    </tr>

                    {/* Browser Version */}
                    <tr>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Browser Version</td>
                      <td className="p-4 font-mono text-slate-800 dark:text-slate-200">{resultA.browser.version || 'Unknown'}</td>
                      <td className="p-4 font-mono text-slate-800 dark:text-slate-200">{resultB.browser.version || 'Unknown'}</td>
                      <td className="p-4 text-center">
                        {resultA.browser.version === resultB.browser.version ? (
                          <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                        ) : (
                          <XCircle className="text-red-500 mx-auto" size={18} />
                        )}
                      </td>
                    </tr>

                    {/* OS name */}
                    <tr>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Operating System</td>
                      <td className="p-4 font-extrabold text-slate-800 dark:text-slate-200">{resultA.os.name || 'Unknown'}</td>
                      <td className="p-4 font-extrabold text-slate-800 dark:text-slate-200">{resultB.os.name || 'Unknown'}</td>
                      <td className="p-4 text-center">
                        {resultA.os.name === resultB.os.name ? (
                          <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                        ) : (
                          <XCircle className="text-red-500 mx-auto" size={18} />
                        )}
                      </td>
                    </tr>

                    {/* OS Version */}
                    <tr>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">OS Version</td>
                      <td className="p-4 font-mono text-slate-800 dark:text-slate-200">{resultA.os.version || 'Unknown'}</td>
                      <td className="p-4 font-mono text-slate-800 dark:text-slate-200">{resultB.os.version || 'Unknown'}</td>
                      <td className="p-4 text-center">
                        {resultA.os.version === resultB.os.version ? (
                          <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                        ) : (
                          <XCircle className="text-red-500 mx-auto" size={18} />
                        )}
                      </td>
                    </tr>

                    {/* Device Type */}
                    <tr>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Device Category</td>
                      <td className="p-4 text-slate-800 dark:text-slate-200 capitalize">
                        {resultA.device.type || (botA.isBot ? 'Bot / Scraper' : 'Desktop')}
                      </td>
                      <td className="p-4 text-slate-800 dark:text-slate-200 capitalize">
                        {resultB.device.type || (botB.isBot ? 'Bot / Scraper' : 'Desktop')}
                      </td>
                      <td className="p-4 text-center">
                        {(resultA.device.type || (botA.isBot ? 'bot' : 'desktop')) === (resultB.device.type || (botB.isBot ? 'bot' : 'desktop')) ? (
                          <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                        ) : (
                          <XCircle className="text-red-500 mx-auto" size={18} />
                        )}
                      </td>
                    </tr>

                    {/* Device Vendor */}
                    <tr>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Device Vendor</td>
                      <td className="p-4 text-slate-800 dark:text-slate-200">{resultA.device.vendor || 'Generic'}</td>
                      <td className="p-4 text-slate-800 dark:text-slate-200">{resultB.device.vendor || 'Generic'}</td>
                      <td className="p-4 text-center">
                        {resultA.device.vendor === resultB.device.vendor ? (
                          <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                        ) : (
                          <XCircle className="text-red-500 mx-auto" size={18} />
                        )}
                      </td>
                    </tr>

                    {/* Engine */}
                    <tr>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Rendering Engine</td>
                      <td className="p-4 font-extrabold text-slate-800 dark:text-slate-200">{resultA.engine.name || 'Unknown'}</td>
                      <td className="p-4 font-extrabold text-slate-800 dark:text-slate-200">{resultB.engine.name || 'Unknown'}</td>
                      <td className="p-4 text-center">
                        {resultA.engine.name === resultB.engine.name ? (
                          <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                        ) : (
                          <XCircle className="text-red-500 mx-auto" size={18} />
                        )}
                      </td>
                    </tr>

                    {/* CPU Architecture */}
                    <tr>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">CPU Architecture</td>
                      <td className="p-4 font-mono text-slate-800 dark:text-slate-200">{resultA.cpu.architecture || 'Unknown'}</td>
                      <td className="p-4 font-mono text-slate-800 dark:text-slate-200">{resultB.cpu.architecture || 'Unknown'}</td>
                      <td className="p-4 text-center">
                        {resultA.cpu.architecture === resultB.cpu.architecture ? (
                          <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                        ) : (
                          <XCircle className="text-red-500 mx-auto" size={18} />
                        )}
                      </td>
                    </tr>

                    {/* Bot identification */}
                    <tr>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Crawler / Bot Status</td>
                      <td className="p-4">
                        {botA.isBot ? (
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold rounded">
                            {botA.name} ({botA.type})
                          </span>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400">Human Client</span>
                        )}
                      </td>
                      <td className="p-4">
                        {botB.isBot ? (
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold rounded">
                            {botB.name} ({botB.type})
                          </span>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400">Human Client</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {botA.isBot === botB.isBot && botA.name === botB.name ? (
                          <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                        ) : (
                          <XCircle className="text-red-500 mx-auto" size={18} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
