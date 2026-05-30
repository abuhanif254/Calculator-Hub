"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  FileText, Copy, Download, Trash2, Check, Sparkles, RefreshCw, 
  HelpCircle, Eye, Share2, Award, Zap, Sliders, Smartphone, Laptop, 
  Plus, Minus, ArrowRight, Grid3X3, Layers, Settings, Globe, Link as LinkIcon,
  ChevronDown, Upload, Code, Star, CheckCircle2, AlertCircle, Palette
} from "lucide-react";
import { 
  TEMPLATE_LIBRARY, SOCIAL_BRAND_META, compileStaticHtml, generateQrCodeUrl,
  downloadFile, BioPageConfig, LinkItem, SocialLinks, CustomStyle, ProfileInfo
} from "./utils";

export function BioLinkPageGeneratorTool() {
  // Preset Templates selection
  const [activeTemplate, setActiveTemplate] = useState<string>("influencer");

  // Core state config
  const [profile, setProfile] = useState<ProfileInfo>(TEMPLATE_LIBRARY.influencer.profile);
  const [links, setLinks] = useState<LinkItem[]>(TEMPLATE_LIBRARY.influencer.links);
  const [socials, setSocials] = useState<SocialLinks>(TEMPLATE_LIBRARY.influencer.socials);
  const [styles, setStyles] = useState<CustomStyle>(TEMPLATE_LIBRARY.influencer.styles);
  const [seoTitle, setSeoTitle] = useState<string>(TEMPLATE_LIBRARY.influencer.seoTitle);
  const [seoDescription, setSeoDescription] = useState<string>(TEMPLATE_LIBRARY.influencer.seoDescription);

  // QR Code base64 data
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // Editor Tabs
  const [activeEditorTab, setActiveEditorTab] = useState<"profile" | "links" | "socials" | "design" | "qr" | "export">("profile");

  // Preview simulations
  const [previewPlatform, setPreviewPlatform] = useState<"facebook" | "twitter" | "linkedin">("facebook");

  // UI state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Drag and Drop tracking index
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Synchronize localStorage drafts
  useEffect(() => {
    setIsClient(true);
    try {
      const savedConfig = localStorage.getItem("bio-link-config");
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig) as BioPageConfig;
        setProfile(parsed.profile);
        setLinks(parsed.links);
        setSocials(parsed.socials);
        setStyles(parsed.styles);
        setSeoTitle(parsed.seoTitle);
        setSeoDescription(parsed.seoDescription);
      }
    } catch (e) {
      console.error("Local draft restoration failed:", e);
    }
  }, []);

  // Update localStorage when configs change
  const saveLocalDraft = useCallback((currentConfig: BioPageConfig) => {
    if (!isClient) return;
    try {
      localStorage.setItem("bio-link-config", JSON.stringify(currentConfig));
    } catch (e) {
      console.error(e);
    }
  }, [isClient]);

  const activeConfig = useMemo((): BioPageConfig => ({
    profile,
    links,
    socials,
    styles,
    seoTitle,
    seoDescription
  }), [profile, links, socials, styles, seoTitle, seoDescription]);

  useEffect(() => {
    saveLocalDraft(activeConfig);
  }, [activeConfig, saveLocalDraft]);

  // Compile QR Code representing the page configuration
  useEffect(() => {
    const compileQR = async () => {
      try {
        const url = await generateQrCodeUrl(`https://nexuscalculator.net/tools/bio-link-page-generator?preview=${profile.username}`);
        setQrCodeUrl(url);
      } catch (e) {
        console.error(e);
      }
    };
    compileQR();
  }, [profile.username]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Load a starter template
  const handleLoadTemplate = (key: string) => {
    const tmpl = TEMPLATE_LIBRARY[key];
    if (tmpl) {
      setActiveTemplate(key);
      setProfile(tmpl.profile);
      setLinks(tmpl.links);
      setSocials(tmpl.socials);
      setStyles(tmpl.styles);
      setSeoTitle(tmpl.seoTitle);
      setSeoDescription(tmpl.seoDescription);
      showToast(`Loaded ${key} starter layout!`);
    }
  };

  // Add Link Card
  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: "link-" + Date.now(),
      title: "New Link Title",
      url: "https://yourwebsite.com",
      enabled: true,
      color: styles.buttonColor,
      textColor: styles.buttonTextColor,
      description: "Short details explaining link context",
      isFeatured: false,
      mediaType: "link"
    };
    setLinks(prev => [...prev, newLink]);
    showToast("Added new link card!");
  };

  // Duplicate Link Card
  const handleDuplicateLink = (id: string) => {
    const targetIndex = links.findIndex(l => l.id === id);
    if (targetIndex !== -1) {
      const orig = links[targetIndex];
      const dup: LinkItem = {
        ...orig,
        id: "link-dup-" + Date.now(),
        title: orig.title + " (Copy)"
      };
      setLinks(prev => {
        const next = [...prev];
        next.splice(targetIndex + 1, 0, dup);
        return next;
      });
      showToast("Link duplicated.");
    }
  };

  // Remove Link Card
  const handleRemoveLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
    showToast("Link card removed.");
  };

  // Toggle Link enabled
  const handleToggleLink = (id: string) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l));
  };

  // Update individual Link parameters
  const handleUpdateLink = (id: string, updates: Partial<LinkItem>) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  // HTML5 Drag and Drop array reorder implementation (zero extra bundle bloat)
  const handleDragStart = (idx: number) => {
    setDraggedIndex(idx);
  };

  const handleDragOver = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIdx) return;
    
    // Swap indexes instantly in state for a smooth UI reordering drag animation
    setLinks(prev => {
      const next = [...prev];
      const draggedItem = next[draggedIndex];
      next.splice(draggedIndex, 1);
      next.splice(targetIdx, 0, draggedItem);
      return next;
    });
    setDraggedIndex(targetIdx);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    showToast("Reordered links!");
  };

  // Export handlers
  const handleExportHtml = () => {
    const html = compileStaticHtml(activeConfig);
    downloadFile(html, "index.html", "text/html");
    showToast("Downloaded fully self-contained landing page!");
  };

  const handleExportJson = () => {
    downloadFile(JSON.stringify(activeConfig, null, 2), "bio-page-config.json", "application/json");
    showToast("Downloaded JSON configuration file!");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as BioPageConfig;
        if (parsed.profile && parsed.links && parsed.styles) {
          setProfile(parsed.profile);
          setLinks(parsed.links);
          setSocials(parsed.socials);
          setStyles(parsed.styles);
          setSeoTitle(parsed.seoTitle);
          setSeoDescription(parsed.seoDescription);
          showToast("Configuration JSON imported successfully!");
        } else {
          showToast("Invalid configuration file format.");
        }
      } catch (err) {
        showToast("Error parsing configuration JSON.");
      }
    };
    reader.readAsText(file);
  };

  // Copy shareable mock URL
  const copyShareLink = async () => {
    const link = `https://nexuscalculator.net/links/${profile.username}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopiedKey("share");
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Share link copied!");
    } catch (err) {
      console.error(err);
    }
  };

  // Memoized Font Families mappings
  const fontClassNames = {
    inter: "font-sans",
    roboto: "font-sans",
    playfair: "font-serif",
    space: "font-mono"
  };

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={16} className="text-[#518231]" />
          {toastMessage}
        </div>
      )}

      {/* Starter Templates Selection */}
      <div className="bg-slate-100/80 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0 pl-1">
          <Sparkles size={14} className="text-[#518231]" /> Quick Setup Templates:
        </span>
        <div className="flex gap-2">
          {Object.keys(TEMPLATE_LIBRARY).map(key => (
            <button
              key={key}
              onClick={() => handleLoadTemplate(key)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition-all border ${activeTemplate === key ? 'bg-white border-[#518231] text-[#518231] dark:bg-slate-800 shadow-sm' : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Split Grid: Left Editor | Right Phone preview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Builder Forms Tab Container (Spans 7 columns) */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          
          {/* Sub Tab Navigation bar */}
          <div className="bg-slate-100 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-0.5 max-w-lg flex-wrap">
            {[
              { id: "profile", label: "Profile", icon: Settings },
              { id: "links", label: "Links", icon: LinkIcon },
              { id: "socials", label: "Social Grid", icon: Globe },
              { id: "design", label: "Design", icon: Palette },
              { id: "qr", label: "QR Code", icon: Grid3X3 },
              { id: "export", label: "Export", icon: Download }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveEditorTab(tab.id as any)}
                className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${activeEditorTab === tab.id ? "bg-white dark:bg-slate-800 text-[#518231] dark:text-[#7ab056] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Form Content Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[460px] flex flex-col justify-between">
            
            <div>
              {/* TAB 1: Profile Builder */}
              {activeEditorTab === "profile" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">Profile branding</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-450 uppercase">Public Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-450 uppercase">Username / Handle</label>
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value.toLowerCase().replace(/\s+/g, '') }))}
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-450 uppercase">Tagline Title</label>
                      <input
                        type="text"
                        value={profile.tagline}
                        onChange={(e) => setProfile(prev => ({ ...prev, tagline: e.target.value }))}
                        placeholder="e.g. Full Stack Developer"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-450 uppercase">Location</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g. San Francisco, CA"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-450 uppercase">Bio Description</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Write a short summary about who you are and what you publish..."
                      className="w-full min-h-[90px] px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-450 uppercase">Profile Picture URL</label>
                      <input
                        type="text"
                        value={profile.avatarUrl}
                        onChange={(e) => setProfile(prev => ({ ...prev, avatarUrl: e.target.value }))}
                        placeholder="Paste image address URL"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-450 uppercase">Cover Banner Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={profile.coverColor}
                          onChange={(e) => setProfile(prev => ({ ...prev, coverColor: e.target.value }))}
                          className="h-10 w-16 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer"
                        />
                        <input
                          type="text"
                          value={profile.coverColor}
                          onChange={(e) => setProfile(prev => ({ ...prev, coverColor: e.target.value }))}
                          className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Link Management & List reordering */}
              {activeEditorTab === "links" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">Button Link List</h3>
                    <button
                      onClick={handleAddLink}
                      className="px-3.5 py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-xl flex items-center gap-1"
                    >
                      <Plus size={13} /> Add Button Link
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
                    {links.map((link, idx) => (
                      <div
                        key={link.id}
                        draggable
                        onDragStart={() => handleDragStart(idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDragEnd={handleDragEnd}
                        className={`p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 cursor-move transition-all relative ${draggedIndex === idx ? 'opacity-50 scale-95 border-dashed border-[#518231]' : ''}`}
                      >
                        {/* Title block */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono">#{idx + 1}</span>
                            <input
                              type="text"
                              value={link.title}
                              onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                              className="text-xs font-bold bg-transparent border-0 focus:ring-0 p-0 text-slate-800 dark:text-white w-48"
                            />
                          </div>
                          
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleUpdateLink(link.id, { isFeatured: !link.isFeatured })}
                              className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 ${link.isFeatured ? 'text-amber-500' : 'text-slate-350'}`}
                              title="Feature (Add pulse highlight)"
                            >
                              <Star size={12} fill={link.isFeatured ? "currentColor" : "none"} />
                            </button>
                            <button
                              onClick={() => handleDuplicateLink(link.id)}
                              className="p-1 text-slate-350 hover:text-[#518231]"
                              title="Duplicate Link"
                            >
                              <Layers size={12} />
                            </button>
                            <button
                              onClick={() => handleRemoveLink(link.id)}
                              className="p-1 text-slate-350 hover:text-red-500"
                              title="Delete Link"
                            >
                              <Trash2 size={12} />
                            </button>
                            <input
                              type="checkbox"
                              checked={link.enabled}
                              onChange={() => handleToggleLink(link.id)}
                              className="rounded border-slate-300 text-[#518231] focus:ring-[#518231] h-3.5 w-3.5"
                            />
                          </div>
                        </div>

                        {/* Input options details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-450 uppercase font-bold">Link URL</span>
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                              className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-450 uppercase font-bold">Display Layout Embed</span>
                            <select
                              value={link.mediaType || "link"}
                              onChange={(e) => handleUpdateLink(link.id, { mediaType: e.target.value as any })}
                              className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                            >
                              <option value="link">Standard Button Link</option>
                              <option value="youtube">YouTube Video Iframe</option>
                              <option value="spotify">Spotify Song Iframe</option>
                              <option value="donation">Donation CTA</option>
                            </select>
                          </div>
                        </div>

                        {/* Additional Description fields */}
                        <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
                          <span className="text-[9px] text-slate-450 uppercase font-bold">Sub-description (Optional)</span>
                          <input
                            type="text"
                            value={link.description || ""}
                            onChange={(e) => handleUpdateLink(link.id, { description: e.target.value })}
                            className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                            placeholder="e.g. Free downloadable PDF checklist"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Social Profile Links */}
              {activeEditorTab === "socials" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">Social Icon Grid Handles</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
                    {Object.keys(socials).map(key => {
                      const meta = SOCIAL_BRAND_META[key as keyof SocialLinks];
                      return (
                        <div key={key} className="p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                          <span className="text-[9px] font-bold uppercase" style={{ color: meta.color }}>
                            {meta.label}
                          </span>
                          <input
                            type="text"
                            value={socials[key as keyof SocialLinks]}
                            onChange={(e) => setSocials(prev => ({ ...prev, [key]: e.target.value.trim() }))}
                            placeholder="username"
                            className="w-full px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: Styling & Themes Customizer */}
              {activeEditorTab === "design" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">Layout Design Studio</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Theme Presets */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-450 uppercase">Background Theme Style</label>
                      <select
                        value={styles.theme}
                        onChange={(e) => setStyles(prev => ({ ...prev, theme: e.target.value as any }))}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl focus:outline-none"
                      >
                        <option value="minimal">Minimalist Light</option>
                        <option value="modern">Modern Clean</option>
                        <option value="glass">Glassmorphism Frost</option>
                        <option value="creator">Creator warm gradients</option>
                        <option value="neon">Neon Cyberpunk</option>
                        <option value="dark">Dark Slate</option>
                      </select>
                    </div>

                    {/* Font Selection */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-450 uppercase">Font Family typography</label>
                      <select
                        value={styles.fontFamily}
                        onChange={(e) => setStyles(prev => ({ ...prev, fontFamily: e.target.value as any }))}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl focus:outline-none"
                      >
                        <option value="inter">Inter (Sans-Serif)</option>
                        <option value="roboto">Roboto (Geometric)</option>
                        <option value="playfair">Playfair Display (Elegant Serif)</option>
                        <option value="space">Space Mono (Console Coder)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Button Shape */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-450 uppercase">Button Shape & Glow</label>
                      <select
                        value={styles.buttonShape}
                        onChange={(e) => setStyles(prev => ({ ...prev, buttonShape: e.target.value as any }))}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl focus:outline-none"
                      >
                        <option value="rounded">Rounded Box</option>
                        <option value="square">Sharp Square</option>
                        <option value="pill">Pill Shape</option>
                        <option value="gradient">Linear Gradient</option>
                        <option value="shadow">Box Shadow Border</option>
                      </select>
                    </div>

                    {/* Border radius sliders */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-450 uppercase">Button Rounded radius</span>
                        <span className="font-mono font-bold text-[#518231]">{styles.borderRadius}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="32"
                        value={styles.borderRadius}
                        onChange={(e) => setStyles(prev => ({ ...prev, borderRadius: parseInt(e.target.value) }))}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 appearance-none cursor-pointer accent-[#518231]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-450 uppercase font-bold">Background</span>
                      <input
                        type="color"
                        value={styles.backgroundColor}
                        onChange={(e) => setStyles(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="h-8 w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-450 uppercase font-bold">Buttons</span>
                      <input
                        type="color"
                        value={styles.buttonColor}
                        onChange={(e) => setStyles(prev => ({ ...prev, buttonColor: e.target.value }))}
                        className="h-8 w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-450 uppercase font-bold">Text</span>
                      <input
                        type="color"
                        value={styles.textColor}
                        onChange={(e) => setStyles(prev => ({ ...prev, textColor: e.target.value }))}
                        className="h-8 w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Advanced custom CSS panel */}
                  <div className="space-y-1.5 pt-2">
                    <label className="block text-xs font-bold text-slate-450 uppercase">Advanced Custom CSS Overrides</label>
                    <textarea
                      value={styles.customCss}
                      onChange={(e) => setStyles(prev => ({ ...prev, customCss: e.target.value }))}
                      placeholder="/* Advanced: add custom classes or overrides here. */ .link-card { transition: all 0.3s ease; }"
                      className="w-full min-h-[90px] px-3.5 py-2 text-xs font-mono bg-slate-55 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: QR Code generator */}
              {activeEditorTab === "qr" && (
                <div className="space-y-4 animate-in fade-in duration-150 flex flex-col items-center">
                  <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2 w-full text-center">Vector QR Code Generator</h3>
                  
                  {qrCodeUrl ? (
                    <div className="p-4 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg flex flex-col items-center gap-4 mt-4">
                      <img src={qrCodeUrl} alt="QR Code Link" className="w-52 h-52 bg-slate-50 dark:bg-slate-900 rounded-xl" />
                      <button
                        onClick={() => downloadFile(qrCodeUrl.split(",")[1], "bio-link-qr.png", "image/png")}
                        className="px-5 py-2 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow"
                      >
                        <Download size={13} /> Download QR Image
                      </button>
                    </div>
                  ) : (
                    <div className="py-12 italic text-xs text-slate-400">Loading QR builder...</div>
                  )}

                  <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center max-w-sm mt-4">Generate and print this QR code on flyers, packaging, menus, or cards to direct offline traffic directly to your social links hub page.</p>
                </div>
              )}

              {/* TAB 6: Code Export Options */}
              {activeEditorTab === "export" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">Export Codes & Files</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    
                    {/* HTML export card */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all gap-4">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 text-[8px] font-extrabold uppercase">Static Bundle</span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2">Export Self-Contained HTML</h4>
                        <p className="text-[11px] text-slate-450 mt-1 leading-normal">Compiles your profile settings, social grids, styles, and links into a single index.html file that you can host for free.</p>
                      </div>
                      
                      <button
                        onClick={handleExportHtml}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
                      >
                        <Code size={13} /> Export index.html
                      </button>
                    </div>

                    {/* JSON config card */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all gap-4">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 text-[8px] font-extrabold uppercase">Backup Draft</span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2">Export Config JSON</h4>
                        <p className="text-[11px] text-slate-450 mt-1 leading-normal">Saves your current builder selections as a JSON file. Import this file later to restore your work session.</p>
                      </div>
                      
                      <button
                        onClick={handleExportJson}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
                      >
                        <Download size={13} /> Export config.json
                      </button>
                    </div>

                  </div>

                  {/* JSON Import file dropzone */}
                  <div className="p-5 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231] rounded-2xl flex flex-col items-center justify-center bg-slate-50/40 dark:bg-slate-950/20 text-center gap-3 transition-colors mt-4">
                    <Upload size={24} className="text-slate-400 group-hover:text-[#518231]" />
                    <div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-350">Restore config file backup</div>
                      <div className="text-[10px] text-slate-400 mt-1">Select a previously saved bio-page-config.json file to load.</div>
                    </div>
                    <input 
                      type="file" 
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden" 
                      id="json-file-input"
                    />
                    <label 
                      htmlFor="json-file-input"
                      className="px-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-[11px] font-bold text-[#518231] rounded-lg shadow-sm cursor-pointer hover:bg-slate-50 transition-all"
                    >
                      Choose Backup File
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom SEO parameters controller */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-450 uppercase font-bold">SEO Title Tag</span>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-250 dark:bg-slate-950 dark:border-slate-800 rounded-lg focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-450 uppercase font-bold">SEO Meta Description</span>
                <input
                  type="text"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-250 dark:bg-slate-950 dark:border-slate-800 rounded-lg focus:outline-none"
                />
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Mobile Phone Preview Viewport simulator (Spans 5 columns) */}
        <div className="xl:col-span-5 flex flex-col gap-6 items-center">
          
          {/* Phone Frame Simulator container */}
          <div className="bg-slate-55 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center w-full max-w-sm relative">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase w-full mb-3 pb-1 border-b border-slate-150 dark:border-slate-850">
              <span className="flex items-center gap-1"><Smartphone size={12} /> Live Mobile View</span>
              <button onClick={copyShareLink} className="text-[#518231] hover:underline font-mono">
                {copiedKey === "share" ? "Copied!" : `links/${profile.username}`}
              </button>
            </div>

            {/* Physical phone shell */}
            <div className="relative w-full aspect-[9/18.5] max-w-[280px] bg-slate-950 border-[6px] border-slate-900 rounded-[36px] shadow-2xl flex flex-col overflow-hidden">
              {/* Speaker pill notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
                <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
              </div>

              {/* Scrollable interior viewport */}
              <div 
                className={`w-full h-full p-4 overflow-y-auto custom-scrollbar flex flex-col items-center gap-4 pt-10 select-none pb-8 ${fontClassNames[styles.fontFamily]}`}
                style={{ backgroundColor: styles.backgroundColor, color: styles.textColor }}
              >
                
                {/* Visual Cover Banner preview */}
                <div 
                  className="w-full h-20 rounded-xl shrink-0 -mt-2 bg-slate-200 dark:bg-slate-800 relative overflow-hidden"
                  style={{ 
                    backgroundColor: profile.coverColor,
                    backgroundImage: profile.coverImageUrl ? `url('${profile.coverImageUrl}')` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                ></div>

                {/* Profile Picture */}
                <div className="flex flex-col items-center -mt-9 text-center w-full">
                  {profile.avatarUrl ? (
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name} 
                      className="w-16 h-16 rounded-full border-2 border-white dark:border-slate-900 shadow-md object-cover bg-slate-100" 
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-slate-300 dark:bg-slate-700 shadow-md flex items-center justify-center"></div>
                  )}
                  
                  {/* Verified name */}
                  <div className="text-sm font-extrabold mt-1.5 flex items-center gap-0.5 justify-center">
                    {profile.name || "Username"}
                    <span className="text-blue-500 text-[10px]" title="Verified">✓</span>
                  </div>
                  
                  {profile.tagline && <div className="text-[10px] opacity-80 mt-0.5 font-medium">{profile.tagline}</div>}
                  {profile.bio && <div className="text-[10px] opacity-90 mt-2 leading-relaxed px-2 font-medium">{profile.bio}</div>}
                  {profile.location && <div className="text-[8px] opacity-60 mt-1">📍 {profile.location}</div>}
                </div>

                {/* Social links grid icons block */}
                <div className="flex flex-wrap justify-center gap-1.5 w-full">
                  {Object.entries(socials)
                    .filter(([_, value]) => value && value.trim().length > 0)
                    .map(([key, value]) => {
                      const meta = SOCIAL_BRAND_META[key as keyof SocialLinks];
                      return (
                        <a 
                          key={key} 
                          href={`https://${key}.com/${value}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:scale-105 transition-all text-white font-bold text-[9px]"
                          style={{ backgroundColor: meta.color }}
                        >
                          {key.charAt(0).toUpperCase()}
                        </a>
                      );
                    })}
                </div>

                {/* Vertical links list */}
                <div className="w-full flex flex-col gap-2.5 mt-2">
                  {links.filter(l => l.enabled).map(link => {
                    // Feature pulse highlight
                    const pulseClass = link.isFeatured ? "animate-pulse" : "";
                    
                    return (
                      <div 
                        key={link.id}
                        className={`w-full p-3 text-center flex flex-col items-center justify-center border border-slate-200/10 shadow-sm transition-all hover:scale-[1.01] ${pulseClass}`}
                        style={{ 
                          backgroundColor: link.color || styles.buttonColor, 
                          color: link.textColor || styles.buttonTextColor,
                          borderRadius: styles.borderRadius
                        }}
                      >
                        <div className="text-xs font-bold leading-normal">{link.title}</div>
                        {link.description && <div className="text-[9px] mt-0.5 opacity-90 leading-normal">{link.description}</div>}
                        
                        {/* Embed mockup previews inside phone screen */}
                        {link.mediaType === "youtube" && (
                          <div className="w-full aspect-video bg-slate-900 rounded-lg overflow-hidden mt-1.5 flex items-center justify-center text-[9px] text-slate-400 font-mono border border-slate-800">
                            [YouTube Video Player]
                          </div>
                        )}
                        {link.mediaType === "spotify" && (
                          <div className="w-full h-8 bg-slate-950 rounded-lg overflow-hidden mt-1.5 flex items-center justify-center text-[9px] text-[#1db954] font-mono border border-slate-900">
                            [Spotify Audio Embed]
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

          {/* Social Meta OpenGraph Previews widgets */}
          <div className="bg-slate-55 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center w-full max-w-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-850 pb-2 w-full">
              <Share2 size={13} className="text-[#518231]" /> Social Search Meta Previews
            </h4>
            
            <div className="flex gap-1 w-full mt-3 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
              {["facebook", "twitter", "linkedin"].map(p => (
                <button
                  key={p}
                  onClick={() => setPreviewPlatform(p as any)}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all capitalize ${previewPlatform === p ? 'bg-white dark:bg-slate-800 text-[#518231] shadow-sm' : 'text-slate-500'}`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Social card previews */}
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden mt-4 shadow-sm text-xs">
              {profile.avatarUrl ? (
                <div className="aspect-[1.91/1] bg-slate-50 dark:bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-slate-100 dark:border-slate-850">
                  <img src={profile.avatarUrl} alt="SEO Cover" className="w-24 h-24 rounded-full border-2 border-white shadow object-cover bg-white" />
                </div>
              ) : (
                <div className="aspect-[1.91/1] bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-400">No Image Set</div>
              )}
              
              <div className="p-3 space-y-1">
                <div className="text-[10px] text-slate-450 uppercase tracking-wide font-mono">nexuscalculator.net</div>
                <div className="font-bold text-slate-850 dark:text-slate-100 truncate">{seoTitle || `${profile.name} (@${profile.username}) | Link in Bio`}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{seoDescription || profile.bio || "View my social pages, newsletter, products, and channels in one link."}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
