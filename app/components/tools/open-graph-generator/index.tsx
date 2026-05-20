"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  Globe, Eye, Code, Settings, Copy, Download, Check, Trash2, 
  History, Save, Upload, X, AlertTriangle, CheckCircle2, 
  FileJson, Share2, Info, ArrowRight, HelpCircle, Layers, Zap
} from 'lucide-react';

interface OgState {
  title: string;
  description: string;
  url: string;
  type: string;
  siteName: string;
  locale: string;
  image: string;
  imageWidth: string;
  imageHeight: string;
  imageAlt: string;
  
  // Article fields
  articlePublishedTime: string;
  articleModifiedTime: string;
  articleAuthor: string;
  articleSection: string;
  articleTags: string;

  // Product fields
  productPriceAmount: string;
  productPriceCurrency: string;
  productAvailability: string;
  productCondition: string;
  productItemId: string;

  // Profile fields
  profileFirstName: string;
  profileLastName: string;
  profileUsername: string;
  profileGender: string;

  // Video fields
  videoActors: string;
  videoDirectors: string;
  videoDuration: string;
  videoReleaseDate: string;
  videoTags: string;

  // Music fields
  musicDuration: string;
  musicAlbum: string;
  musicMusicians: string;
  musicSong: string;
}

interface HistoryItem {
  id: string;
  name: string;
  timestamp: string;
  state: OgState;
}

const initialFields: OgState = {
  title: "",
  description: "",
  url: "",
  type: "website",
  siteName: "",
  locale: "en_US",
  image: "",
  imageWidth: "",
  imageHeight: "",
  imageAlt: "",
  articlePublishedTime: "",
  articleModifiedTime: "",
  articleAuthor: "",
  articleSection: "",
  articleTags: "",
  productPriceAmount: "",
  productPriceCurrency: "USD",
  productAvailability: "instock",
  productCondition: "new",
  productItemId: "",
  profileFirstName: "",
  profileLastName: "",
  profileUsername: "",
  profileGender: "male",
  videoActors: "",
  videoDirectors: "",
  videoDuration: "",
  videoReleaseDate: "",
  videoTags: "",
  musicDuration: "",
  musicAlbum: "",
  musicMusicians: "",
  musicSong: ""
};

const presets: Record<string, Partial<OgState>> = {
  saas: {
    title: "MetricsFlow - Analytics Platform",
    description: "Instantly analyze and optimize your company key metrics with our privacy-first dashboard tool.",
    url: "https://metricsflow.com",
    type: "website",
    siteName: "MetricsFlow",
    locale: "en_US",
    image: "https://placehold.co/1200x630/0f172a/38bdf8?text=MetricsFlow+Analytics",
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "MetricsFlow Dashboard Analytics Mockup"
  },
  blog: {
    title: "Mastering Next.js 15 App Router: A Comprehensive Guide",
    description: "Learn how to build faster React apps using server actions, caching strategies, and dynamic parameters.",
    url: "https://nextdev.com/blog/mastering-nextjs-15",
    type: "article",
    siteName: "NextDev Blog",
    locale: "en_US",
    image: "https://placehold.co/1200x630/020617/10b981?text=Next.js+15+Guide",
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "Mastering Next.js 15 Blog Cover Image",
    articlePublishedTime: "2026-05-21T09:00",
    articleAuthor: "https://nextdev.com/authors/dan-abramov",
    articleSection: "Web Development",
    articleTags: "Next.js, React, SEO"
  },
  product: {
    title: "Zenith Pro Ergonomic Keyboard",
    description: "Hot-swappable tactile mechanical keyboard featuring gasket-mounted structure and premium aluminum case.",
    url: "https://ergokeys.com/products/zenith-pro",
    type: "product",
    siteName: "ErgoKeys",
    locale: "en_US",
    image: "https://placehold.co/1200x630/1e293b/f59e0b?text=Zenith+Pro+Keyboard",
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "Zenith Pro Mechanical Keyboard Showcase",
    productPriceAmount: "189.99",
    productPriceCurrency: "USD",
    productAvailability: "instock",
    productCondition: "new",
    productItemId: "EK-ZENITH-PRO"
  },
  portfolio: {
    title: "Alex Rivera | Creative Designer Portfolio",
    description: "Creative frontend UX developer portfolio featuring state-of-the-art interactive WebGL interfaces and responsive apps.",
    url: "https://alexrivera.dev",
    type: "profile",
    siteName: "Alex Rivera Portfolio",
    locale: "en_US",
    image: "https://placehold.co/1200x630/1e1b4b/a855f7?text=Alex+Rivera+Portfolio",
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "Alex Rivera UX Portfolio Banner",
    profileFirstName: "Alex",
    profileLastName: "Rivera",
    profileUsername: "alexriveradev",
    profileGender: "male"
  },
  business: {
    title: "Apex Venture Capital - Scale vision",
    description: "Apex Venture VC partners with early-stage visionary startups to accelerate growth and scale world-changing systems.",
    url: "https://apexvc.com",
    type: "website",
    siteName: "Apex Venture Capital",
    locale: "en_US",
    image: "https://placehold.co/1200x630/064e3b/34d399?text=Apex+Venture+Capital",
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "Apex Venture Capital Office Building Banner"
  },
  news: {
    title: "Tech Summit 2026: Quantum Computing Takes Center Stage",
    description: "Leading physics research teams gather to unveil breakthroughs in commercial quantum logic processors.",
    url: "https://technewsdaily.com/tech-summit-quantum-2026",
    type: "article",
    siteName: "TechNewsDaily",
    locale: "en_US",
    image: "https://placehold.co/1200x630/030712/f43f5e?text=Quantum+Summit+2026",
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "Tech Summit Quantum Computation Feature",
    articlePublishedTime: "2026-05-21T07:15",
    articleAuthor: "https://technewsdaily.com/reporters/sarah-connor",
    articleSection: "Technology",
    articleTags: "Quantum, Tech Summit, Futures"
  },
  devtool: {
    title: "Open Graph Generator & Social Previewer - Nexus Calculator",
    description: "Create, validate, and preview Open Graph metadata tags for Facebook, LinkedIn, Slack, and Discord.",
    url: "https://nexuscalculator.net/tools/open-graph-generator",
    type: "website",
    siteName: "Nexus Calculator",
    locale: "en_US",
    image: "https://placehold.co/1200x630/518231/ffffff?text=Open+Graph+Generator",
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "Open Graph Generator Interface"
  }
};

export function OpenGraphGeneratorTool() {
  const [fields, setFields] = useState<OgState>(initialFields);
  const [activeTab, setActiveTab] = useState<"basic" | "image" | "specialized" | "import">("basic");
  const [previewTab, setPreviewTab] = useState<"facebook" | "linkedin" | "discord" | "slack" | "whatsapp" | "telegram" | "imessage">("facebook");
  const [copied, setCopied] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageMetrics, setImageMetrics] = useState<{ width: number; height: number; size: number; ratio: number } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize initial client-only hooks
  useEffect(() => {
    const savedFields = localStorage.getItem("og_generator_current_fields");
    if (savedFields) {
      try {
        setFields(JSON.parse(savedFields));
      } catch (e) {
        console.error(e);
      }
    }
    const savedHistory = localStorage.getItem("og_generator_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCurrentFieldsToLocal = (updatedFields: OgState) => {
    localStorage.setItem("og_generator_current_fields", JSON.stringify(updatedFields));
  };

  const handleFieldChange = (key: keyof OgState, value: string) => {
    const updated = { ...fields, [key]: value };
    setFields(updated);
    saveCurrentFieldsToLocal(updated);
  };

  // Reset tool
  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all parameters?")) {
      setFields(initialFields);
      setImageMetrics(null);
      saveCurrentFieldsToLocal(initialFields);
      showTemporarySuccess("Parameters cleared successfully.");
    }
  };

  // Preset loading
  const handlePresetSelect = (presetKey: string) => {
    const preset = presets[presetKey];
    if (preset) {
      const merged = { ...initialFields, ...preset };
      setFields(merged);
      saveCurrentFieldsToLocal(merged);
      setImageMetrics(null);
      showTemporarySuccess(`Loaded ${presetKey.toUpperCase()} preset.`);
    }
  };

  // Drag and drop custom image
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPEG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Url = e.target?.result as string;
      
      // Load image object to extract dimensions
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const sizeKb = Math.round(file.size / 1024);
        const ratio = width / height;

        setImageMetrics({ width, height, size: sizeKb, ratio });
        
        const updated = { 
          ...fields, 
          image: base64Url,
          imageWidth: width.toString(),
          imageHeight: height.toString()
        };
        setFields(updated);
        saveCurrentFieldsToLocal(updated);
        showTemporarySuccess(`Successfully loaded image: ${width}x${height} (${sizeKb} KB)`);
      };
      img.src = base64Url;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  // URL parsing helper
  const getDomainName = (urlString: string) => {
    if (!urlString) return "example.com";
    try {
      const parsed = new URL(urlString);
      return parsed.hostname;
    } catch {
      return urlString.replace(/^https?:\/\//i, '').split('/')[0] || "example.com";
    }
  };

  // Generated code markup block
  const generatedHtml = useMemo(() => {
    let code = `<!-- Open Graph / Facebook -->\n`;
    code += `<meta property="og:type" content="${fields.type || 'website'}" />\n`;
    if (fields.title) code += `<meta property="og:title" content="${fields.title}" />\n`;
    if (fields.description) code += `<meta property="og:description" content="${fields.description}" />\n`;
    if (fields.url) code += `<meta property="og:url" content="${fields.url}" />\n`;
    
    // Image properties
    if (fields.image) {
      code += `<meta property="og:image" content="${fields.image.startsWith("data:") ? "https://example.com/assets/og-image.png" : fields.image}" />\n`;
      if (fields.imageWidth) code += `<meta property="og:image:width" content="${fields.imageWidth}" />\n`;
      if (fields.imageHeight) code += `<meta property="og:image:height" content="${fields.imageHeight}" />\n`;
      if (fields.imageAlt) code += `<meta property="og:image:alt" content="${fields.imageAlt}" />\n`;
    }

    if (fields.siteName) code += `<meta property="og:site_name" content="${fields.siteName}" />\n`;
    if (fields.locale) code += `<meta property="og:locale" content="${fields.locale}" />\n`;

    // Type specific additions
    if (fields.type === "article") {
      code += `\n<!-- Article Specific Metadata -->\n`;
      if (fields.articlePublishedTime) code += `<meta property="article:published_time" content="${new Date(fields.articlePublishedTime).toISOString()}" />\n`;
      if (fields.articleModifiedTime) code += `<meta property="article:modified_time" content="${new Date(fields.articleModifiedTime).toISOString()}" />\n`;
      if (fields.articleAuthor) code += `<meta property="article:author" content="${fields.articleAuthor}" />\n`;
      if (fields.articleSection) code += `<meta property="article:section" content="${fields.articleSection}" />\n`;
      if (fields.articleTags) {
        fields.articleTags.split(',').forEach(tag => {
          code += `<meta property="article:tag" content="${tag.trim()}" />\n`;
        });
      }
    } else if (fields.type === "product") {
      code += `\n<!-- Product Specific Metadata -->\n`;
      if (fields.productPriceAmount) code += `<meta property="product:price:amount" content="${fields.productPriceAmount}" />\n`;
      if (fields.productPriceCurrency) code += `<meta property="product:price:currency" content="${fields.productPriceCurrency}" />\n`;
      if (fields.productAvailability) code += `<meta property="product:availability" content="${fields.productAvailability}" />\n`;
      if (fields.productCondition) code += `<meta property="product:condition" content="${fields.productCondition}" />\n`;
      if (fields.productItemId) code += `<meta property="product:retailer_item_id" content="${fields.productItemId}" />\n`;
    } else if (fields.type === "profile") {
      code += `\n<!-- Profile Specific Metadata -->\n`;
      if (fields.profileFirstName) code += `<meta property="profile:first_name" content="${fields.profileFirstName}" />\n`;
      if (fields.profileLastName) code += `<meta property="profile:last_name" content="${fields.profileLastName}" />\n`;
      if (fields.profileUsername) code += `<meta property="profile:username" content="${fields.profileUsername}" />\n`;
      if (fields.profileGender) code += `<meta property="profile:gender" content="${fields.profileGender}" />\n`;
    } else if (fields.type === "video") {
      code += `\n<!-- Video Specific Metadata -->\n`;
      if (fields.videoDuration) code += `<meta property="video:duration" content="${fields.videoDuration}" />\n`;
      if (fields.videoReleaseDate) code += `<meta property="video:release_date" content="${fields.videoReleaseDate}" />\n`;
      if (fields.videoActors) {
        fields.videoActors.split(',').forEach(actor => {
          code += `<meta property="video:actor" content="${actor.trim()}" />\n`;
        });
      }
      if (fields.videoDirectors) {
        fields.videoDirectors.split(',').forEach(dir => {
          code += `<meta property="video:director" content="${dir.trim()}" />\n`;
        });
      }
      if (fields.videoTags) {
        fields.videoTags.split(',').forEach(tag => {
          code += `<meta property="video:tag" content="${tag.trim()}" />\n`;
        });
      }
    } else if (fields.type === "music") {
      code += `\n<!-- Music Specific Metadata -->\n`;
      if (fields.musicDuration) code += `<meta property="music:duration" content="${fields.musicDuration}" />\n`;
      if (fields.musicAlbum) code += `<meta property="music:album" content="${fields.musicAlbum}" />\n`;
      if (fields.musicSong) code += `<meta property="music:song" content="${fields.musicSong}" />\n`;
      if (fields.musicMusicians) {
        fields.musicMusicians.split(',').forEach(mus => {
          code += `<meta property="music:musician" content="${mus.trim()}" />\n`;
        });
      }
    }

    return code.trim();
  }, [fields]);

  // Action: Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    showTemporarySuccess("HTML code block copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  // Action: Download
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedHtml], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "opengraph-meta-tags.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showTemporarySuccess("HTML tags downloaded successfully.");
  };

  const showTemporarySuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // JSON Import & Export
  const handleJsonExport = () => {
    const stateJson = JSON.stringify(fields, null, 2);
    const element = document.createElement("a");
    const file = new Blob([stateJson], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `og-config-${fields.siteName || "export"}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showTemporarySuccess("Configuration JSON exported.");
  };

  const handleJsonImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const merged = { ...initialFields, ...parsed };
        setFields(merged);
        saveCurrentFieldsToLocal(merged);
        setImageMetrics(null);
        showTemporarySuccess("JSON Configuration imported successfully.");
      } catch (err) {
        alert("Invalid JSON file. Please make sure the file is a valid configuration object.");
      }
    };
    reader.readAsText(file);
  };

  // History operations
  const handleSaveState = useCallback((id: string, timestamp: string) => {
    if (!saveName.trim()) {
      alert("Please provide a name for this session.");
      return;
    }
    const newItem: HistoryItem = {
      id,
      name: saveName.trim(),
      timestamp,
      state: fields
    };
    const updatedHistory = [newItem, ...history].slice(0, 30);
    setHistory(updatedHistory);
    localStorage.setItem("og_generator_history", JSON.stringify(updatedHistory));
    setSaveName("");
    setShowSaveModal(false);
    showTemporarySuccess(`Saved session "${newItem.name}".`);
  }, [saveName, fields, history]);

  const loadHistoryItem = (item: HistoryItem) => {
    setFields(item.state);
    saveCurrentFieldsToLocal(item.state);
    setImageMetrics(null);
    showTemporarySuccess(`Restored session "${item.name}".`);
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem("og_generator_history", JSON.stringify(updated));
    showTemporarySuccess("Session deleted.");
  };

  // Completeness score & suggestions
  const validationSummary = useMemo(() => {
    let score = 0;
    const checklist: { type: 'success' | 'warn' | 'error'; msg: string; tip?: string }[] = [];

    // Title (20%)
    if (fields.title.trim()) {
      const len = fields.title.length;
      if (len >= 40 && len <= 60) {
        score += 20;
        checklist.push({ type: 'success', msg: `Title looks optimized (${len} chars).` });
      } else {
        score += 10;
        checklist.push({ 
          type: 'warn', 
          msg: `Title is ${len} chars. Recommended 40-60 characters for best display on Facebook/LinkedIn.`, 
          tip: "Truncated headlines lower user interest." 
        });
      }
    } else {
      checklist.push({ type: 'error', msg: "Missing og:title. Add a descriptive headline." });
    }

    // Description (20%)
    if (fields.description.trim()) {
      const len = fields.description.length;
      if (len >= 60 && len <= 90) {
        score += 20;
        checklist.push({ type: 'success', msg: `Description is optimized (${len} chars).` });
      } else {
        score += 10;
        checklist.push({ 
          type: 'warn', 
          msg: `Description is ${len} chars. Recommended 60-90 characters.`, 
          tip: "Social streams truncate cards more aggressively than Google SERPs." 
        });
      }
    } else {
      checklist.push({ type: 'error', msg: "Missing og:description. Write an enticing hook summary." });
    }

    // Canonical URL (10%)
    if (fields.url.trim()) {
      if (fields.url.startsWith("http://") || fields.url.startsWith("https://")) {
        score += 10;
        checklist.push({ type: 'success', msg: "Canonical og:url is valid and absolute." });
      } else {
        checklist.push({ type: 'error', msg: "Invalid og:url format. Must start with http:// or https://." });
      }
    } else {
      checklist.push({ type: 'error', msg: "Missing og:url. Specify page identity." });
    }

    // Image (20%)
    if (fields.image.trim()) {
      score += 20;
      if (fields.image.startsWith("data:")) {
        checklist.push({ 
          type: 'warn', 
          msg: "Using uploaded local image. Absolute server URL required for live social indexing.",
          tip: "Export to production server, then host images at absolute URLs." 
        });
      } else if (!fields.image.startsWith("http")) {
        checklist.push({ type: 'error', msg: "og:image must be an absolute URL (e.g. starting with https://)." });
      } else {
        checklist.push({ type: 'success', msg: "Absolute og:image configured." });
      }

      // Alt description accessibility (10%)
      if (fields.imageAlt.trim()) {
        score += 10;
        checklist.push({ type: 'success', msg: "Accessibility og:image:alt text provided." });
      } else {
        checklist.push({ 
          type: 'warn', 
          msg: "Missing image accessibility description (og:image:alt).", 
          tip: "LinkedIn and accessibility bots look for alt parameters for display." 
        });
      }
    } else {
      checklist.push({ type: 'error', msg: "Missing og:image. No visual sharing card will render." });
    }

    // Type (10%)
    if (fields.type) {
      score += 10;
    }

    // Extras: siteName, dimensions (10%)
    let extrasCount = 0;
    if (fields.siteName.trim()) extrasCount += 4;
    if (fields.locale.trim()) extrasCount += 2;
    if (fields.imageWidth.trim() && fields.imageHeight.trim()) extrasCount += 4;
    score += extrasCount;

    // Image aspect ratio verification (if metrics exist)
    if (imageMetrics) {
      const isWidescreen = imageMetrics.ratio >= 1.8 && imageMetrics.ratio <= 2.0;
      if (!isWidescreen) {
        checklist.push({ 
          type: 'warn', 
          msg: `Uploaded image aspect ratio is ${imageMetrics.ratio.toFixed(2)} (Dimensions: ${imageMetrics.width}x${imageMetrics.height}).`, 
          tip: "Standard layouts use 1.91:1 (e.g. 1200x630). Other ratios may be cropped or padded."
        });
      }
      if (imageMetrics.size > 300) {
        checklist.push({ 
          type: 'warn', 
          msg: `Image size is ${imageMetrics.size} KB. This exceeds the 300 KB limit for WhatsApp.`, 
          tip: "WhatsApp will omit links preview thumbnail if image size is above 300KB. Compress image."
        });
      }
    } else if (fields.image && fields.imageWidth && fields.imageHeight) {
      const w = parseInt(fields.imageWidth);
      const h = parseInt(fields.imageHeight);
      if (!isNaN(w) && !isNaN(h)) {
        const ratio = w / h;
        if (ratio < 1.8 || ratio > 2.0) {
          checklist.push({ 
            type: 'warn', 
            msg: `Declared dimensions ${w}x${h} have aspect ratio ${ratio.toFixed(2)}.`, 
            tip: "Optimal is 1.91:1 (1200x630)." 
          });
        }
      }
    }

    return { score, checklist };
  }, [fields, imageMetrics]);

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      
      {/* PRESETS PANEL */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Zap size={14} className="text-[#518231]" /> Fast Preset Templates
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "saas", label: "SaaS Web" },
            { id: "blog", label: "Blog Article" },
            { id: "product", label: "Product Shop" },
            { id: "portfolio", label: "Portfolio Profile" },
            { id: "business", label: "Business Corp" },
            { id: "news", label: "News Feed" },
            { id: "devtool", label: "Developer Tool" }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => handlePresetSelect(p.id)}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border border-slate-200/40 dark:border-slate-700/40 cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* CORE UTILITIES HEADER (ACTIONS & HISTORY) */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Live Client Workspace</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={handleJsonExport} 
            className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Export JSON Configuration"
          >
            <FileJson size={16} /> Export JSON
          </button>

          <button 
            onClick={() => setShowHistory(!showHistory)} 
            className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-semibold ${showHistory ? 'bg-green-50 text-[#518231] dark:bg-green-950/30' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
          >
            <History size={16} /> Sessions ({history.length})
          </button>

          <button 
            onClick={() => setShowSaveModal(true)} 
            className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Save current config"
          >
            <Save size={16} /> Save Session
          </button>

          <button 
            onClick={handleReset} 
            className="p-2 text-red-600 hover:bg-red-55/10 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* SESSION SAVING POPUP */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm w-full p-6 rounded-3xl shadow-xl animate-in scale-in duration-150">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">Save Metadata Session</h3>
            <p className="text-xs text-slate-400 mb-4">Store this configuration locally to load it later.</p>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="e.g. Product Page Variant"
              className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-3 text-sm focus:outline-none mb-4 text-slate-850 dark:text-white"
            />
            <div className="flex justify-end gap-2 text-xs font-bold">
              <button 
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleSaveState(Date.now().toString(), new Date().toLocaleString())}
                className="px-4 py-2 bg-[#518231] text-white hover:bg-[#406827] rounded-xl shadow-sm"
              >
                Save State
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY MANAGER */}
      {showHistory && (
        <div className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-inner relative animate-in slide-in-from-top-2">
          <button onClick={() => setShowHistory(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={16} /></button>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2"><History size={16} className="text-[#518231]" /> Saved Config History</h3>
          {history.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No saved history sessions. Save your configurations to recall them quickly.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-[#518231] cursor-pointer flex flex-col justify-between group transition-all"
                >
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate pr-4">{item.name}</h4>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{item.state.title || "Untitled"}</p>
                  </div>
                  <button 
                    onClick={(e) => deleteHistoryItem(item.id, e)}
                    className="self-end mt-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete session"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FEEDBACK TOASTS */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-850 dark:text-green-300 p-3 rounded-2xl flex items-center gap-2 text-xs font-semibold shadow-sm animate-in fade-in">
          <CheckCircle2 size={16} className="text-green-500" /> {successMsg}
        </div>
      )}

      {/* WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT WORKSPACE: PARAMETERS INPUTS */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col">
          
          {/* Tab Navigation */}
          <div className="flex bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
            {[
              { id: "basic", label: "Basic Info", icon: Globe },
              { id: "image", label: "Sharing Image", icon: Upload },
              { id: "specialized", label: "Specialized OG Type", icon: Layers },
              { id: "import", label: "Import JSON", icon: FileJson }
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.id ? 'border-[#518231] text-[#518231] bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  <TabIcon size={14} /> {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6 space-y-6">
            
            {/* TAB 1: BASIC INFORMATION */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                
                {/* Title */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">og:title</label>
                    <span className={`text-[10px] font-mono font-bold ${fields.title.length >= 40 && fields.title.length <= 60 ? 'text-green-600' : 'text-slate-400'}`}>
                      {fields.title.length} / 60
                    </span>
                  </div>
                  <input
                    type="text"
                    value={fields.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    placeholder="e.g. Zenith Keyboard | ErgoKeys Store"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Recommended length: 40-60 characters for proper presentation on feeds.</p>
                </div>

                {/* Description */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">og:description</label>
                    <span className={`text-[10px] font-mono font-bold ${fields.description.length >= 60 && fields.description.length <= 90 ? 'text-green-600' : 'text-slate-400'}`}>
                      {fields.description.length} / 90
                    </span>
                  </div>
                  <textarea
                    value={fields.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    placeholder="Brief description summarizing the content of the shared page..."
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Recommended length: 60-90 characters. Kept shorter than search meta descriptions.</p>
                </div>

                {/* URL */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">og:url (Canonical URL)</label>
                  <input
                    type="url"
                    value={fields.url}
                    onChange={(e) => handleFieldChange("url", e.target.value)}
                    placeholder="https://example.com/page-path"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Absolute canonical URL representing the identity of this resource.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Type */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">og:type</label>
                    <select
                      value={fields.type}
                      onChange={(e) => handleFieldChange("type", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white dark:bg-slate-900 cursor-pointer"
                    >
                      <option value="website">website (default)</option>
                      <option value="article">article (blog / news)</option>
                      <option value="product">product (e-commerce)</option>
                      <option value="profile">profile (biography)</option>
                      <option value="video">video (movies / streams)</option>
                      <option value="music">music (songs / albums)</option>
                    </select>
                  </div>

                  {/* Site Name */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">og:site_name</label>
                    <input
                      type="text"
                      value={fields.siteName}
                      onChange={(e) => handleFieldChange("siteName", e.target.value)}
                      placeholder="e.g. My Website Brand"
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    />
                  </div>
                </div>

                {/* Locale */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">og:locale</label>
                  <input
                    type="text"
                    value={fields.locale}
                    onChange={(e) => handleFieldChange("locale", e.target.value)}
                    placeholder="en_US"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Declares the language. Default is en_US. Alternate format: es_ES, fr_FR, de_DE.</p>
                </div>

              </div>
            )}

            {/* TAB 2: SHARING IMAGE CONFIGURATION */}
            {activeTab === "image" && (
              <div className="space-y-5">
                
                {/* UPLOADER ZONE */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">Upload Social Image Preview</label>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                      dragActive 
                        ? "border-[#518231] bg-green-50/50 dark:bg-green-950/10" 
                        : "border-slate-200 hover:border-slate-350 dark:border-slate-850 dark:hover:border-slate-750 bg-slate-50/50 dark:bg-slate-950/20"
                    }`}
                  >
                    <Upload size={32} className="text-slate-400 dark:text-slate-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Drag & Drop Image Here or Click to Browse</span>
                    <span className="text-[10px] text-slate-400">Supports PNG, JPG, JPEG, WebP. Max 300KB (for WhatsApp compatibility).</span>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Direct Image URL input */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">og:image (Direct URL)</label>
                  <input
                    type="url"
                    value={fields.image}
                    onChange={(e) => {
                      handleFieldChange("image", e.target.value);
                      setImageMetrics(null); // Reset file metrics when URL is typed
                    }}
                    placeholder="https://example.com/assets/og-sharing-banner.png"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Must be an absolute URL. Relative paths like &quot;/assets/og.png&quot; will fail to parse on social networks.</p>
                </div>

                {/* Image extensions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">og:image:width</label>
                    <input
                      type="number"
                      value={fields.imageWidth}
                      onChange={(e) => handleFieldChange("imageWidth", e.target.value)}
                      placeholder="1200"
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none text-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1 font-mono">og:image:height</label>
                    <input
                      type="number"
                      value={fields.imageHeight}
                      onChange={(e) => handleFieldChange("imageHeight", e.target.value)}
                      placeholder="630"
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none text-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">og:image:alt (Accessibility description)</label>
                  <input
                    type="text"
                    value={fields.imageAlt}
                    onChange={(e) => handleFieldChange("imageAlt", e.target.value)}
                    placeholder="e.g. Zenith Pro mechanical keyboard resting on a wooden workspace"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Describe the image contents. Strongly recommended for SEO and screen reader accessibility.</p>
                </div>

              </div>
            )}

            {/* TAB 3: SPECIALIZED PROPERTIES */}
            {activeTab === "specialized" && (
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block mb-1">Active specialized template:</span>
                  <span className="text-xs font-mono font-bold text-[#518231] uppercase">{fields.type}</span>
                </div>

                {/* ARTICLE FIELDS */}
                {fields.type === "article" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="font-bold text-sm text-[#518231]">Article Specifications</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Published Time</label>
                        <input
                          type="datetime-local"
                          value={fields.articlePublishedTime}
                          onChange={(e) => handleFieldChange("articlePublishedTime", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Modified Time</label>
                        <input
                          type="datetime-local"
                          value={fields.articleModifiedTime}
                          onChange={(e) => handleFieldChange("articleModifiedTime", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Author Profile URL</label>
                      <input
                        type="url"
                        value={fields.articleAuthor}
                        onChange={(e) => handleFieldChange("articleAuthor", e.target.value)}
                        placeholder="https://facebook.com/authorprofile"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Section</label>
                        <input
                          type="text"
                          value={fields.articleSection}
                          onChange={(e) => handleFieldChange("articleSection", e.target.value)}
                          placeholder="e.g. SEO tips"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Tags (Comma Separated)</label>
                        <input
                          type="text"
                          value={fields.articleTags}
                          onChange={(e) => handleFieldChange("articleTags", e.target.value)}
                          placeholder="e.g. SEO, OpenGraph, WebDev"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PRODUCT FIELDS */}
                {fields.type === "product" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="font-bold text-sm text-[#518231]">Product Specifications</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Price Amount</label>
                        <input
                          type="text"
                          value={fields.productPriceAmount}
                          onChange={(e) => handleFieldChange("productPriceAmount", e.target.value)}
                          placeholder="49.99"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Currency Code</label>
                        <input
                          type="text"
                          value={fields.productPriceCurrency}
                          onChange={(e) => handleFieldChange("productPriceCurrency", e.target.value)}
                          placeholder="USD"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none text-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Availability</label>
                        <select
                          value={fields.productAvailability}
                          onChange={(e) => handleFieldChange("productAvailability", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer"
                        >
                          <option value="instock">In Stock</option>
                          <option value="oos">Out of Stock</option>
                          <option value="preorder">Pre-order</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Condition</label>
                        <select
                          value={fields.productCondition}
                          onChange={(e) => handleFieldChange("productCondition", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="used">Used</option>
                          <option value="refurbished">Refurbished</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Retailer Item ID</label>
                      <input
                        type="text"
                        value={fields.productItemId}
                        onChange={(e) => handleFieldChange("productItemId", e.target.value)}
                        placeholder="SKU-1004"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* PROFILE FIELDS */}
                {fields.type === "profile" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="font-bold text-sm text-[#518231]">Profile Specifications</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">First Name</label>
                        <input
                          type="text"
                          value={fields.profileFirstName}
                          onChange={(e) => handleFieldChange("profileFirstName", e.target.value)}
                          placeholder="John"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Last Name</label>
                        <input
                          type="text"
                          value={fields.profileLastName}
                          onChange={(e) => handleFieldChange("profileLastName", e.target.value)}
                          placeholder="Doe"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Username</label>
                        <input
                          type="text"
                          value={fields.profileUsername}
                          onChange={(e) => handleFieldChange("profileUsername", e.target.value)}
                          placeholder="johndoe"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Gender</label>
                        <select
                          value={fields.profileGender}
                          onChange={(e) => handleFieldChange("profileGender", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* VIDEO FIELDS */}
                {fields.type === "video" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="font-bold text-sm text-[#518231]">Video Specifications</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Duration (Seconds)</label>
                        <input
                          type="number"
                          value={fields.videoDuration}
                          onChange={(e) => handleFieldChange("videoDuration", e.target.value)}
                          placeholder="e.g. 7200"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none text-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Release Date</label>
                        <input
                          type="date"
                          value={fields.videoReleaseDate}
                          onChange={(e) => handleFieldChange("videoReleaseDate", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Actors Profiles (Comma Separated URLs)</label>
                      <input
                        type="text"
                        value={fields.videoActors}
                        onChange={(e) => handleFieldChange("videoActors", e.target.value)}
                        placeholder="https://example.com/actor1, https://example.com/actor2"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Directors Profiles (Comma Separated URLs)</label>
                      <input
                        type="text"
                        value={fields.videoDirectors}
                        onChange={(e) => handleFieldChange("videoDirectors", e.target.value)}
                        placeholder="https://example.com/director1"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Video Tags (Comma Separated)</label>
                      <input
                        type="text"
                        value={fields.videoTags}
                        onChange={(e) => handleFieldChange("videoTags", e.target.value)}
                        placeholder="e.g. Comedy, Sci-Fi"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* MUSIC FIELDS */}
                {fields.type === "music" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h4 className="font-bold text-sm text-[#518231]">Music Specifications</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Song Duration (Seconds)</label>
                        <input
                          type="number"
                          value={fields.musicDuration}
                          onChange={(e) => handleFieldChange("musicDuration", e.target.value)}
                          placeholder="e.g. 240"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none text-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Album URL</label>
                        <input
                          type="url"
                          value={fields.musicAlbum}
                          onChange={(e) => handleFieldChange("musicAlbum", e.target.value)}
                          placeholder="https://example.com/album"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Song URL</label>
                      <input
                        type="url"
                        value={fields.musicSong}
                        onChange={(e) => handleFieldChange("musicSong", e.target.value)}
                        placeholder="https://example.com/song"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Musicians (Comma Separated Profile URLs)</label>
                      <input
                        type="text"
                        value={fields.musicMusicians}
                        onChange={(e) => handleFieldChange("musicMusicians", e.target.value)}
                        placeholder="https://example.com/artist"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* WEBSITE FIELDS */}
                {fields.type === "website" && (
                  <div className="py-4 text-center text-slate-400 text-xs italic">
                    Standard website pages use global inputs. No specialized fields are required for the general website type.
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: IMPORT CONFIGURATION */}
            {activeTab === "import" && (
              <div className="space-y-4 text-center py-6">
                <FileJson size={44} className="text-slate-300 dark:text-slate-600 mx-auto" />
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Import Workspace Configuration</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">Upload a previously exported JSON configuration file to restore your workspace parameters.</p>
                
                <div className="pt-2">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleJsonImport}
                    id="json-import-file"
                    className="hidden"
                  />
                  <label
                    htmlFor="json-import-file"
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs rounded-xl cursor-pointer border border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-colors inline-block"
                  >
                    Select JSON Configuration File
                  </label>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT WORKSPACE: CODE & SOCIAL PREVIEWS */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* A. LIVE SEO COMPLETENESS SCORE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completeness Score</span>
              <span className="text-lg font-extrabold text-[#518231] font-mono">{validationSummary.score}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden mb-4">
              <div 
                className="bg-[#518231] h-full rounded-full transition-all duration-300"
                style={{ width: `${validationSummary.score}%` }}
              ></div>
            </div>

            {/* Checklist recommendations */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {validationSummary.checklist.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-xl border text-xs flex gap-2 items-start ${
                    item.type === 'success' 
                      ? 'bg-green-50/50 border-green-200 text-green-800 dark:bg-green-950/10 dark:border-green-900/30 dark:text-green-300' 
                      : item.type === 'warn'
                      ? 'bg-amber-50/50 border-amber-200 text-amber-800 dark:bg-amber-950/10 dark:border-amber-900/30 dark:text-amber-300'
                      : 'bg-red-50/50 border-red-200 text-red-800 dark:bg-red-950/10 dark:border-red-900/30 dark:text-red-300'
                  }`}
                >
                  {item.type === 'success' ? (
                    <CheckCircle2 size={15} className="shrink-0 text-green-500 mt-0.5" />
                  ) : (
                    <AlertTriangle size={15} className={`shrink-0 mt-0.5 ${item.type === 'warn' ? 'text-amber-500' : 'text-red-500'}`} />
                  )}
                  <div>
                    <p className="font-semibold">{item.msg}</p>
                    {item.tip && <p className="text-[10px] opacity-80 mt-0.5">{item.tip}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B. VISUAL SHARING PREVIEWS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col">
            
            {/* Header select */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/20">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Eye size={14} /> Social Snippets</h3>
              
              <select
                value={previewTab}
                onChange={(e) => setPreviewTab(e.target.value as any)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="facebook">Facebook Card</option>
                <option value="linkedin">LinkedIn Post</option>
                <option value="discord">Discord Embed</option>
                <option value="slack">Slack Attachment</option>
                <option value="whatsapp">WhatsApp Bubble</option>
                <option value="telegram">Telegram Post</option>
                <option value="imessage">iMessage Bubble</option>
              </select>
            </div>

            {/* Preview Box Container */}
            <div className="p-6 bg-slate-100/50 dark:bg-slate-950/40 flex items-center justify-center min-h-64">
              
              {/* 1. FACEBOOK PREVIEW */}
              {previewTab === "facebook" && (
                <div className="bg-white dark:bg-[#242526] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden w-full max-w-sm shadow-sm text-left">
                  {/* Fake Header */}
                  <div className="p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-500">FB</div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Page Publisher</div>
                      <div className="text-[10px] text-slate-400">Just now · 🌐</div>
                    </div>
                  </div>
                  {/* Share Card Content */}
                  <div className="relative aspect-[1.91/1] bg-slate-100 dark:bg-slate-850 w-full overflow-hidden flex items-center justify-center border-y border-slate-200/50 dark:border-slate-800/50">
                    {fields.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={fields.image} alt="Facebook Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as any).src = "https://placehold.co/600x315/f8fafc/64748b?text=Broken+Image+Link"; }} />
                    ) : (
                      <div className="text-slate-400 dark:text-slate-600 flex flex-col items-center gap-1 p-4">
                        <Eye size={24} />
                        <span className="text-[9px] uppercase font-bold tracking-wider">No Preview Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-[#242526]">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{getDomainName(fields.url)}</span>
                    <h4 className="text-xs font-bold text-slate-850 dark:text-slate-200 line-clamp-1 mt-0.5">{fields.title || "My Web Page Headline"}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{fields.description || "Enter an Open Graph description hook to customize this."}</p>
                  </div>
                </div>
              )}

              {/* 2. LINKEDIN PREVIEW */}
              {previewTab === "linkedin" && (
                <div className="bg-white dark:bg-[#1d2226] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden w-full max-w-sm shadow-sm text-left">
                  {/* Fake Author */}
                  <div className="p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-500">IN</div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Corporate Publisher</div>
                      <div className="text-[10px] text-slate-400">1st · Professional Network</div>
                    </div>
                  </div>
                  {/* Card Block */}
                  <div className="border border-slate-200/60 dark:border-slate-800 mx-3 mb-3 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950">
                    <div className="relative aspect-[1.91/1] bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                      {fields.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={fields.image} alt="LinkedIn Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-slate-400 dark:text-slate-600 flex flex-col items-center gap-1">
                          <Eye size={20} />
                          <span className="text-[9px] uppercase font-bold">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-slate-200/60 dark:border-slate-800">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{fields.title || "My Web Page Headline"}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{getDomainName(fields.url)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. DISCORD PREVIEW */}
              {previewTab === "discord" && (
                <div className="bg-[#2f3136] border border-[#202225] rounded-lg p-4 w-full max-w-sm text-left shadow-md flex gap-3">
                  {/* Accent stripe color */}
                  <div className="w-1 bg-[#518231] rounded-full shrink-0"></div>
                  
                  <div className="flex-1 space-y-1.5 min-w-0">
                    {/* Site name */}
                    <div className="text-[11px] text-slate-300 font-semibold">{fields.siteName || "Web Site Provider"}</div>
                    
                    {/* Title Link */}
                    <a href="#" className="text-xs font-bold text-[#00b0f4] hover:underline line-clamp-1 block">
                      {fields.title || "My Web Page Headline"}
                    </a>
                    
                    {/* Description */}
                    <p className="text-[11px] text-slate-350 line-clamp-3 leading-relaxed">
                      {fields.description || "Enter an Open Graph description hook to render inside this Discord embed preview block."}
                    </p>

                    {/* Image banner */}
                    {fields.image && (
                      <div className="relative aspect-[1.91/1] bg-[#202225] rounded-md overflow-hidden mt-2 border border-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={fields.image} alt="Discord Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. SLACK PREVIEW */}
              {previewTab === "slack" && (
                <div className="bg-white dark:bg-[#1a1d21] border border-slate-200 dark:border-slate-800 rounded-xl p-4 w-full max-w-sm text-left shadow-sm flex gap-3">
                  {/* Slack vertical stripe bar */}
                  <div className="w-1.5 bg-slate-300 dark:bg-slate-700 rounded-full shrink-0"></div>

                  <div className="flex-1 space-y-1.5 min-w-0">
                    {/* Site branding */}
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <span className="w-4 h-4 rounded bg-[#518231] text-[9px] text-white flex items-center justify-center font-bold">N</span>
                      {fields.siteName || getDomainName(fields.url)}
                    </div>

                    {/* Title */}
                    <h4 className="text-xs font-bold text-[#1d74b3] hover:underline line-clamp-1">
                      {fields.title || "My Web Page Headline"}
                    </h4>

                    {/* Description */}
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-3">
                      {fields.description || "Enter description details to see how Slack constructs your text snippet."}
                    </p>

                    {/* Slack Preview Banner */}
                    {fields.image && (
                      <div className="relative aspect-[1.91/1] bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={fields.image} alt="Slack Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 5. WHATSAPP PREVIEW */}
              {previewTab === "whatsapp" && (
                <div className="bg-[#efeae2] dark:bg-[#0b141a] p-4 rounded-2xl w-full max-w-sm text-left shadow-sm flex flex-col items-end">
                  {/* WhatsApp Chat bubble */}
                  <div className="bg-white dark:bg-[#1f2c34] text-slate-900 dark:text-slate-100 p-2.5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] text-xs space-y-1">
                    
                    {/* Preview embed segment */}
                    <div className="bg-[#f0f2f5] dark:bg-[#111b21] rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-800 flex items-center h-20">
                      
                      {/* Left Thumbnail (WhatsApp crops to square 1:1) */}
                      <div className="w-20 h-20 bg-slate-200 dark:bg-slate-900 flex items-center justify-center shrink-0 border-r border-slate-200/50 dark:border-slate-800 overflow-hidden">
                        {fields.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={fields.image} alt="WhatsApp Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Eye size={16} className="text-slate-400" />
                        )}
                      </div>

                      {/* Text details */}
                      <div className="p-2.5 flex-1 min-w-0 flex flex-col justify-center">
                        <span className="text-[9px] text-[#518231] font-semibold tracking-wide truncate">{fields.siteName || getDomainName(fields.url).toUpperCase()}</span>
                        <h4 className="font-bold text-slate-850 dark:text-white truncate text-[11px] mt-0.5">{fields.title || "My Web Page Headline"}</h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-450 line-clamp-1 mt-0.5">{fields.description || "Enticing share text"}</p>
                      </div>
                    </div>

                    {/* Shared URL text in bubble */}
                    <div className="text-blue-500 hover:underline text-[11px] break-all pt-1 font-mono">{fields.url || "https://example.com/item"}</div>
                  </div>
                </div>
              )}

              {/* 6. TELEGRAM PREVIEW */}
              {previewTab === "telegram" && (
                <div className="bg-[#537a9f]/10 dark:bg-[#182533] p-4 rounded-2xl w-full max-w-sm text-left shadow-sm flex flex-col">
                  {/* Telegram Bubble */}
                  <div className="bg-white dark:bg-[#182533] border border-slate-200/50 dark:border-slate-800 p-3 rounded-2xl shadow-sm text-xs space-y-1.5">
                    {/* Provider */}
                    <span className="text-[10px] text-sky-500 font-bold block">{fields.siteName || getDomainName(fields.url)}</span>
                    
                    {/* Widescreen Banner */}
                    {fields.image && (
                      <div className="relative aspect-[1.91/1] bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={fields.image} alt="Telegram Preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Title and Description */}
                    <h4 className="font-bold text-slate-900 dark:text-white text-[11.5px] mt-1">{fields.title || "My Web Page Headline"}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{fields.description || "Enter an Open Graph description details."}</p>
                  </div>
                </div>
              )}

              {/* 7. IMESSAGE PREVIEW */}
              {previewTab === "imessage" && (
                <div className="p-4 rounded-2xl w-full max-w-sm text-left flex flex-col items-end">
                  <div className="bg-[#1f8cff] text-white px-3 py-2 rounded-2xl max-w-[85%] text-xs shadow-sm mb-1.5 break-all font-mono">
                    {fields.url || "https://example.com/share"}
                  </div>
                  
                  {/* Apple iMessage link card bubble */}
                  <div className="bg-[#e9e9eb] dark:bg-[#1c1c1e] text-slate-900 dark:text-white rounded-2xl overflow-hidden max-w-[85%] text-xs shadow-sm border border-slate-200 dark:border-slate-800">
                    
                    {/* Card banner */}
                    <div className="relative aspect-[1.91/1] bg-slate-200 dark:bg-slate-900 flex items-center justify-center">
                      {fields.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={fields.image} alt="iMessage Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-slate-400 flex flex-col items-center gap-1">
                          <Eye size={20} />
                        </div>
                      )}
                    </div>

                    {/* Description labels */}
                    <div className="p-3 space-y-0.5">
                      <span className="text-[9px] uppercase tracking-wide text-slate-400 block">{getDomainName(fields.url)}</span>
                      <h4 className="font-bold text-slate-950 dark:text-white text-[11px] truncate">{fields.title || "My Web Page Headline"}</h4>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* C. CODE BLOCK PREVIEW */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/20">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Code size={14} /> Generated HTML Meta</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1.5 bg-[#518231] hover:bg-[#406827] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy Code"}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-850 rounded-lg transition-colors cursor-pointer"
                  title="Download HTML tags"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
            <div className="p-4 bg-slate-950 text-slate-200 overflow-x-auto text-[11px] font-mono leading-relaxed max-h-72 select-all whitespace-pre text-left">
              {generatedHtml}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
