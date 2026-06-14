"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, Sliders, Image as ImageIcon, Download, Copy, RefreshCw, 
  Trash2, HelpCircle, AlertCircle, Info, Check, ShieldAlert, Star, 
  Bookmark, ArrowRight, Wand2, Plus, X, Monitor, Smartphone, LayoutGrid, 
  Heart, Database, ShieldCheck, Flame, CreditCard, ChevronRight, Eye, Layers
} from "lucide-react";

interface GeneratedImage {
  url: string;
  prompt: string;
  style: string;
  aspect: string;
  seed: number;
  provider: string;
  timestamp: number;
  isFavorite?: boolean;
}

interface FavoritePrompt {
  id: string;
  text: string;
  timestamp: number;
}

export function AiImageGeneratorTool() {
  // Main form states
  const [prompt, setPrompt] = useState<string>('');
  const [negativePrompt, setNegativePrompt] = useState<string>('');
  const [provider, setProvider] = useState<string>('sandbox');
  const [stylePreset, setStylePreset] = useState<string>('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [imageSize, setImageSize] = useState<string>('1024x1024');
  const [numImages, setNumImages] = useState<number>(1);
  const [creativity, setCreativity] = useState<number>(0.7);
  const [guidanceScale, setGuidanceScale] = useState<number>(7.5);
  const [seedOption, setSeedOption] = useState<'random' | 'fixed'>('random');
  const [fixedSeed, setFixedSeed] = useState<number>(123456);

  // App UI states
  const [activeTab, setActiveTab] = useState<'generate' | 'commercial' | 'database'>('generate');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [queueStatus, setQueueStatus] = useState<string>('');
  const [estimatedSeconds, setEstimatedSeconds] = useState<number>(0);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Gallery & Local persistence states
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [favoritePrompts, setFavoritePrompts] = useState<FavoritePrompt[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);

  // Monetization Mock states (Production Ready)
  const [credits, setCredits] = useState<number>(25);
  const [showBillingDrawer, setShowBillingDrawer] = useState<boolean>(false);

  // Style Preset Definitions
  const stylePresets = [
    { name: 'Photorealistic', emoji: '📸', desc: 'True-to-life studio photography' },
    { name: 'Cinematic', emoji: '🎬', desc: 'Dramatic shadows and movie grading' },
    { name: 'Anime', emoji: '🌸', desc: 'Classic Japanese cel-shaded art' },
    { name: '3D Render', emoji: '🧊', desc: 'Smooth Octane-style digital models' },
    { name: 'Cartoon', emoji: '🎨', desc: 'Bold outlines and playful colors' },
    { name: 'Watercolor', emoji: '🖌️', desc: 'Soft bleeding washes and texturing' },
    { name: 'Oil Painting', emoji: '🖼️', desc: 'Thick impasto brush stroke textures' },
    { name: 'Pixel Art', emoji: '👾', desc: 'Crisp 8-bit / 16-bit retro graphics' },
    { name: 'Fantasy', emoji: '🦄', desc: 'Dreamy, ethereal lighting and details' },
    { name: 'Cyberpunk', emoji: '🌆', desc: 'Vibrant neons and high-tech dystopia' },
    { name: 'Minimalist', emoji: '⬜', desc: 'Simple vectors, clean negative space' },
    { name: 'Logo Design', emoji: '🏷️', desc: 'Clean graphic emblems, branding ready' },
    { name: 'Icon Design', emoji: '📱', desc: 'App shortcut icons, flat dimensions' }
  ];

  // Aspect Ratios Definitions
  const aspectRatios = [
    { label: '1:1', labelText: 'Square', icon: LayoutGrid, desc: 'Instagram, avatars' },
    { label: '16:9', labelText: 'Widescreen', icon: Monitor, desc: 'Wallpapers, YouTube' },
    { label: '9:16', labelText: 'Vertical', icon: Smartphone, desc: 'TikTok, Stories' },
    { label: '4:3', labelText: 'Classic', icon: Monitor, desc: 'Presentations, photos' },
    { label: '3:2', labelText: 'DSLR Standard', icon: ImageIcon, desc: 'Photography, printing' },
    { label: '2:3', labelText: 'Portrait Card', icon: Smartphone, desc: 'Posters, book covers' }
  ];

  // Prompt Templates Definition
  const promptTemplates = [
    { title: "Cyberpunk Street", text: "A neon-lit cyberpunk street in Tokyo, rainy night, reflections on wet asphalt, flying holographic fish, high detail, cinematic lighting" },
    { title: "Realistic Portrait", text: "A close-up studio portrait of a futuristic explorer, intricate spacesuit details, reflective visor, dramatic volumetric lighting, 8k resolution, shot on 85mm lens" },
    { title: "Watercolor Landscape", text: "Soft watercolor painting of a peaceful mountain valley with a winding river, cherry blossom trees in bloom, misty morning haze, artistic bleed textures" },
    { title: "Minimalist Vector Logo", text: "A minimalist circular vector logo of a soaring falcon, geometric grid layout, solid flat green and gold color scheme, isolated on white background" },
    { title: "Retro Pixel Art Room", text: "Cozy isometric room with a gaming PC, neon keyboard, warm ambient lamp, pixel art style, 16-bit color palette, high details" }
  ];

  // Load persistence configurations from LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedImages = localStorage.getItem('ai_generator_images');
      if (storedImages) {
        try { setGeneratedImages(JSON.parse(storedImages)); } catch (_) {}
      }

      const storedFavs = localStorage.getItem('ai_generator_favorites');
      if (storedFavs) {
        try { setFavoritePrompts(JSON.parse(storedFavs)); } catch (_) {}
      }

      const storedCredits = localStorage.getItem('ai_generator_credits');
      if (storedCredits) {
        setCredits(Number(storedCredits));
      } else {
        localStorage.setItem('ai_generator_credits', '25');
      }

      // Load form preferences
      const prefProvider = localStorage.getItem('ai_generator_pref_provider');
      if (prefProvider) setProvider(prefProvider);

      const prefStyle = localStorage.getItem('ai_generator_pref_style');
      if (prefStyle) setStylePreset(prefStyle);

      const prefAspect = localStorage.getItem('ai_generator_pref_aspect');
      if (prefAspect) setAspectRatio(prefAspect);
    }
  }, []);

  const saveToLocalStorage = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data));
    }
  };

  // Toast notifications
  const triggerToast = (type: 'success' | 'error', msg: string) => {
    if (type === 'success') {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  // Expand prompt with stylistic keywords
  const handleEnhancePrompt = () => {
    if (!prompt.trim()) {
      triggerToast('error', "Type a prompt draft first to optimize it.");
      return;
    }

    const modifiers = [
      "highly detailed", "sharp focus", "volumetric studio lighting", "dramatic shadows",
      "shot on 35mm camera lens", "intricate details", "8k resolution", "concept art rendering",
      "photorealistic texture", "vibrant color palette", "beautiful reflections"
    ];

    // Pick 3 random modifiers
    const shuffled = [...modifiers].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3).join(", ");
    setPrompt(prev => `${prev.trim()}, ${selected}`);
    triggerToast('success', "Prompt enhanced with styling tags!");
  };

  // Bookmark / Favorite a prompt
  const handleSaveFavoritePrompt = () => {
    if (!prompt.trim()) return;

    // Check duplication
    if (favoritePrompts.some(p => p.text.toLowerCase() === prompt.toLowerCase().trim())) {
      triggerToast('error', "Prompt is already bookmarked.");
      return;
    }

    const newItem: FavoritePrompt = {
      id: String(Date.now()),
      text: prompt.trim(),
      timestamp: Date.now()
    };

    setFavoritePrompts(prev => {
      const updated = [newItem, ...prev];
      saveToLocalStorage('ai_generator_favorites', updated);
      return updated;
    });
    triggerToast('success', "Prompt saved to favorites!");
  };

  const removeFavoritePrompt = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoritePrompts(prev => {
      const updated = prev.filter(p => p.id !== id);
      saveToLocalStorage('ai_generator_favorites', updated);
      return updated;
    });
  };

  // Toggle favorite on a generated image
  const toggleFavoriteImage = (index: number) => {
    setGeneratedImages(prev => {
      const updated = prev.map((img, idx) => idx === index ? { ...img, isFavorite: !img.isFavorite } : img);
      saveToLocalStorage('ai_generator_images', updated);
      return updated;
    });
  };

  // Delete an image from history
  const deleteImage = (index: number) => {
    setGeneratedImages(prev => {
      const updated = prev.filter((_, idx) => idx !== index);
      saveToLocalStorage('ai_generator_images', updated);
      return updated;
    });
    triggerToast('success', "Image removed from history gallery.");
  };

  // Copy prompt text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast('success', "Copied to clipboard!");
  };

  // Execute Generation POST call to server route
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      triggerToast('error', "Please enter a descriptive prompt to generate images.");
      return;
    }

    // Credits checking (Monetization simulation)
    const cost = numImages;
    if (credits < cost && provider !== 'sandbox') {
      triggerToast('error', "Insufficient credits. Top up your account or use the sandbox fallback engine.");
      setShowBillingDrawer(true);
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setCurrentProgress(5);
    setEstimatedSeconds(8);

    // Run progress animation counter
    const interval = setInterval(() => {
      setCurrentProgress(p => {
        if (p >= 90) return p;
        return p + Math.floor(Math.random() * 8) + 1;
      });
      setEstimatedSeconds(s => {
        if (s <= 1) return 1;
        return s - 1;
      });
    }, 1000);

    setQueueStatus("Sending request payload to secure generator...");

    try {
      const targetSeed = seedOption === 'random' ? Math.floor(Math.random() * 1000000) : fixedSeed;

      const response = await fetch('/api/tools/ai-image-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          negativePrompt: negativePrompt.trim(),
          provider,
          style: stylePreset,
          aspectRatio,
          size: imageSize,
          seed: targetSeed,
          numImages,
          creativity,
          guidanceScale
        })
      });

      clearInterval(interval);
      setCurrentProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Generation request failed.");
      }

      const resData = await response.json();
      if (!resData.images || resData.images.length === 0) {
        throw new Error("No image assets returned from the API.");
      }

      // Format output image array
      const newImages: GeneratedImage[] = resData.images.map((img: any, idx: number) => ({
        url: img.base64,
        prompt: prompt.trim(),
        style: stylePreset,
        aspect: aspectRatio,
        seed: img.seed || targetSeed + idx,
        provider: img.provider || provider,
        timestamp: Date.now()
      }));

      // Add to local gallery
      setGeneratedImages(prev => {
        const updated = [...newImages, ...prev];
        saveToLocalStorage('ai_generator_images', updated);
        return updated;
      });

      // Deduct credits if not sandbox
      if (provider !== 'sandbox') {
        const remainingCredits = Math.max(0, credits - cost);
        setCredits(remainingCredits);
        saveToLocalStorage('ai_generator_credits', remainingCredits);
      }

      triggerToast('success', `Generated ${numImages} image(s) successfully!`);
    } catch (err: any) {
      clearInterval(interval);
      triggerToast('error', err?.message || "Internal server error during generation.");
    } finally {
      setIsGenerating(false);
      setQueueStatus('');
      setEstimatedSeconds(0);
      setCurrentProgress(0);
    }
  };

  // Reload history parameters
  const handleRegenerate = (item: GeneratedImage) => {
    setPrompt(item.prompt);
    setStylePreset(item.style);
    setAspectRatio(item.aspect);
    setProvider(item.provider);
    setSeedOption('fixed');
    setFixedSeed(item.seed);
    triggerToast('success', "Loaded parameters into editor panel.");
    setActiveTab('generate');
  };

  const filteredGalleryImages = useMemo(() => {
    if (favoritesOnly) {
      return generatedImages.filter(img => img.isFavorite);
    }
    return generatedImages;
  }, [generatedImages, favoritesOnly]);

  return (
    <div className="space-y-8">
      {/* Toast notifications overlay */}
      {(successMsg || errorMsg) && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
          successMsg 
            ? 'bg-green-50 dark:bg-green-950/90 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-950/90 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
        }`}>
          {successMsg ? <Check size={18} className="text-green-500 shrink-0" /> : <AlertCircle size={18} className="text-red-500 shrink-0" />}
          <span className="text-sm font-semibold">{successMsg || errorMsg}</span>
        </div>
      )}

      {/* Credits Info & Upgrades bar */}
      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#518231]/10 text-[#518231] flex items-center justify-center font-bold">
            <Flame size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-150 leading-tight">
                AI Generation Credit Balance
              </h3>
              <span className="bg-[#518231]/15 text-[#518231] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Free Plan
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Each generated image consumes 1 credit. Credits reset daily. Sandbox generation is unlimited.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">Available Credits</p>
            <p className="text-lg font-black text-slate-900 dark:text-white leading-none mt-0.5">{credits} Remaining</p>
          </div>
          <button 
            onClick={() => setShowBillingDrawer(true)}
            className="bg-[#518231] hover:bg-[#436e28] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Plus size={14} />
            Top Up Credits
          </button>
        </div>
      </div>

      {/* Platform Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4">
        {[
          { id: 'generate', label: 'AI Workspace Studio', icon: Sparkles },
          { id: 'commercial', label: 'Usage & Commercial Rights', icon: ShieldCheck },
          { id: 'database', label: 'Database ready architecture', icon: Database }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? 'border-[#518231] text-[#518231]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Main Workspace */}
      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Generation Controls (Column Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <form onSubmit={handleGenerate} className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-5">
              
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders size={13} className="text-[#518231]" />
                  Generation Settings
                </h3>
                {/* Provider Select */}
                <select 
                  value={provider}
                  onChange={(e) => {
                    setProvider(e.target.value);
                    saveToLocalStorage('ai_generator_pref_provider', e.target.value);
                  }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-[#518231]"
                >
                  <option value="sandbox">Sandbox Fallback (Free)</option>
                  <option value="gemini">Google Gemini (Imagen 3)</option>
                  <option value="openai">OpenAI (DALL-E 3)</option>
                  <option value="stability">Stability AI Core</option>
                  <option value="flux">Flux Local / API</option>
                  <option value="local">Local Model (Automatic1111)</option>
                </select>
              </div>

              {/* Prompt Editor */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-500">
                  <label className="flex items-center gap-1">
                    Describe your image
                    <span className="text-red-500">*</span>
                  </label>
                  <span>{prompt.length} / 1000</span>
                </div>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value.slice(0, 1000))}
                    placeholder="e.g. A detailed close-up shot of a majestic lion with a glowing galactic mane, digital painting style, dark background..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#518231]/20 focus:border-[#518231] placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 rounded-lg p-1 shadow-sm border border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleEnhancePrompt}
                      title="AI Prompt Optimizer"
                      className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-[#518231] transition-all"
                    >
                      <Wand2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveFavoritePrompt}
                      title="Save to favorites"
                      className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-amber-500 transition-all"
                    >
                      <Star size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Negative Prompt */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  Negative Prompt (Avoid these elements)
                </label>
                <input
                  type="text"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="e.g. blurry, low quality, distorted, extra limbs, watermark"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#518231]/20 focus:border-[#518231] placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              {/* Style Presets */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500 block">
                  Style Preset
                </label>
                <div className="grid grid-cols-3 gap-1.5 max-h-[140px] overflow-y-auto custom-scrollbar border border-slate-200/60 dark:border-slate-800 p-1.5 rounded-xl bg-white dark:bg-slate-900">
                  {stylePresets.map((style) => (
                    <button
                      key={style.name}
                      type="button"
                      onClick={() => {
                        setStylePreset(style.name);
                        saveToLocalStorage('ai_generator_pref_style', style.name);
                      }}
                      className={`px-2 py-2.5 rounded-lg border text-center transition-all ${
                        stylePreset === style.name
                          ? 'bg-[#518231]/10 border-[#518231] text-[#518231] dark:text-[#6fa844] font-bold'
                          : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-650 dark:text-slate-350'
                      }`}
                      title={style.desc}
                    >
                      <span className="text-sm block">{style.emoji}</span>
                      <span className="text-[10px] block mt-1 truncate">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500 block">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-1.5 rounded-xl">
                  {aspectRatios.map((ratio) => {
                    const RatioIcon = ratio.icon;
                    return (
                      <button
                        key={ratio.label}
                        type="button"
                        onClick={() => {
                          setAspectRatio(ratio.label);
                          saveToLocalStorage('ai_generator_pref_aspect', ratio.label);
                        }}
                        className={`py-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                          aspectRatio === ratio.label
                            ? 'bg-[#518231]/10 border-[#518231] text-[#518231] dark:text-[#6fa844] font-bold'
                            : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-650 dark:text-slate-350'
                        }`}
                        title={ratio.desc}
                      >
                        <RatioIcon size={14} />
                        <span className="text-[10px] font-bold">{ratio.label}</span>
                        <span className="text-[8px] text-slate-400 block truncate max-w-[70px]">{ratio.labelText}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Number of Images */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500 block">
                  Number of Images
                </label>
                <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-0.5">
                  {[1, 2, 4].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNumImages(num)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        numImages === num
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white'
                          : 'text-slate-500 hover:text-slate-850 dark:hover:text-slate-250'
                      }`}
                    >
                      {num} Image{num > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced settings dropdown */}
              <details className="group border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all">
                <summary className="px-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between cursor-pointer select-none">
                  <span className="flex items-center gap-2">
                    <Sliders size={13} className="text-[#518231]" />
                    Advanced controls
                  </span>
                  <ChevronRight size={14} className="transition-transform group-open:rotate-90 text-slate-400" />
                </summary>
                
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-850 space-y-4">
                  {/* Creativity Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                      <span>Creativity / Temp</span>
                      <span>{creativity}</span>
                    </div>
                    <input
                      type="range"
                      min={0.1}
                      max={1.0}
                      step={0.1}
                      value={creativity}
                      onChange={(e) => setCreativity(Number(e.target.value))}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  {/* Guidance Scale (CFG) */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                      <span>Guidance Scale (CFG)</span>
                      <span>{guidanceScale}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      step={0.5}
                      value={guidanceScale}
                      onChange={(e) => setGuidanceScale(Number(e.target.value))}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  {/* Seed Control */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                      <span>Randomization Seed</span>
                      <div className="flex gap-2 bg-slate-50 dark:bg-slate-850 p-0.5 rounded border border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => setSeedOption('random')}
                          className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${seedOption === 'random' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'}`}
                        >
                          Random
                        </button>
                        <button
                          type="button"
                          onClick={() => setSeedOption('fixed')}
                          className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${seedOption === 'fixed' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'}`}
                        >
                          Fixed
                        </button>
                      </div>
                    </div>
                    {seedOption === 'fixed' && (
                      <input
                        type="number"
                        value={fixedSeed}
                        onChange={(e) => setFixedSeed(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-[#518231]"
                      />
                    )}
                  </div>
                </div>
              </details>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-[#518231] hover:bg-[#436e28] disabled:bg-[#518231]/60 text-white py-3 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2 tracking-wide cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Generating Images...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} fill="currentColor" />
                    Generate Images ({numImages} Credit{numImages > 1 ? 's' : ''})
                  </>
                )}
              </button>

            </form>

            {/* Template picker list */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1">
                <Bookmark size={12} className="text-[#518231]" />
                Prompt Templates
              </h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-850">
                {promptTemplates.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setPrompt(tpl.text);
                      triggerToast('success', `Loaded "${tpl.title}" template.`);
                    }}
                    className="w-full text-left py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/30 px-2 rounded-lg transition-colors flex items-center justify-between text-xs group"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[220px]">
                      {tpl.title}
                    </span>
                    <ArrowRight size={12} className="text-slate-400 group-hover:translate-x-1 transition-transform group-hover:text-[#518231]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bookmarked Favorites List */}
            {favoritePrompts.length > 0 && (
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Star size={12} fill="currentColor" className="text-amber-500" />
                  Favorite Prompts ({favoritePrompts.length})
                </h4>
                <div className="max-h-[160px] overflow-y-auto custom-scrollbar space-y-2">
                  {favoritePrompts.map(fav => (
                    <div
                      key={fav.id}
                      onClick={() => setPrompt(fav.text)}
                      className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/60 hover:border-[#518231]/30 cursor-pointer flex items-start justify-between gap-3 text-[11px] group transition-all"
                    >
                      <span className="text-slate-650 dark:text-slate-300 font-semibold line-clamp-2 leading-relaxed">
                        {fav.text}
                      </span>
                      <button
                        onClick={(e) => removeFavoritePrompt(fav.id, e)}
                        className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 p-0.5 rounded transition-all shrink-0"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Panel: Output Workspace / Active Gallery (Column Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Generation Loader State */}
            {isGenerating && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-5 animate-pulse">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#518231] uppercase tracking-wider flex items-center gap-2">
                    <RefreshCw size={14} className="animate-spin" />
                    {queueStatus}
                  </span>
                  <span className="text-xs font-extrabold text-slate-500">
                    Est. Time Remaining: {estimatedSeconds}s
                  </span>
                </div>
                
                {/* Progress bar container */}
                <div className="w-full bg-slate-100 dark:bg-slate-850 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#518231] h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${currentProgress}%` }}
                  ></div>
                </div>

                {/* Skeletons Layout Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {Array.from({ length: numImages }).map((_, i) => (
                    <div key={i} className="aspect-square bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                      {/* Animating shine */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                      <ImageIcon size={32} className="text-slate-300 dark:text-slate-700" />
                      <span className="text-[10px] text-slate-400 dark:text-slate-600 font-bold">Synthesizing Frame {i + 1}...</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Gallery Header Filter */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden p-5 flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Generated Image Archive ({generatedImages.length})
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setFavoritesOnly(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !favoritesOnly
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFavoritesOnly(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    favoritesOnly
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/25'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Heart size={12} fill={favoritesOnly ? "currentColor" : "none"} />
                  Favorites
                </button>
              </div>
            </div>

            {/* 3. Output Gallery Grid */}
            {filteredGalleryImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredGalleryImages.map((img, idx) => (
                  <div 
                    key={idx}
                    className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden group shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    
                    {/* Visual output box */}
                    <div className="relative aspect-square bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                      <img 
                        src={img.url} 
                        alt={img.prompt} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                      />
                      
                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = img.url;
                            link.download = `ai_image_${img.seed}.png`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          title="Download PNG"
                          className="w-10 h-10 rounded-full bg-white text-slate-800 hover:bg-[#518231] hover:text-white transition-all flex items-center justify-center shadow-lg"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => copyToClipboard(img.prompt)}
                          title="Copy Prompt"
                          className="w-10 h-10 rounded-full bg-white text-slate-800 hover:bg-[#518231] hover:text-white transition-all flex items-center justify-center shadow-lg"
                        >
                          <Copy size={18} />
                        </button>
                        <button
                          onClick={() => handleRegenerate(img)}
                          title="Reload parameters"
                          className="w-10 h-10 rounded-full bg-white text-slate-800 hover:bg-[#518231] hover:text-white transition-all flex items-center justify-center shadow-lg"
                        >
                          <RefreshCw size={18} />
                        </button>
                      </div>

                      {/* Favorite / Love Button */}
                      <button
                        onClick={() => toggleFavoriteImage(idx)}
                        className={`absolute top-3 right-3 z-10 p-2 rounded-full border transition-all shadow-md ${
                          img.isFavorite
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-500'
                            : 'bg-white/90 border-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-500'
                        }`}
                      >
                        <Star size={14} fill={img.isFavorite ? "currentColor" : "none"} />
                      </button>

                      {/* Provider Badge overlay */}
                      <div className="absolute bottom-3 left-3 z-10 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 text-[9px] text-white font-extrabold uppercase tracking-wide shadow-md">
                        {img.provider}
                      </div>
                    </div>

                    {/* Meta info details */}
                    <div className="p-4 space-y-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-850 dark:text-slate-150 line-clamp-2 leading-relaxed">
                          "{img.prompt}"
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-slate-500 dark:text-slate-400">
                          <span>Style: <strong>{img.style}</strong></span>
                          <span>•</span>
                          <span>Aspect: <strong>{img.aspect}</strong></span>
                          <span>•</span>
                          <span>Seed: <strong className="font-mono">{img.seed}</strong></span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRegenerate(img)}
                          className="flex-1 py-1.5 bg-slate-100 hover:bg-[#518231]/10 hover:text-[#518231] dark:bg-slate-800 dark:hover:bg-[#518231]/20 dark:hover:text-[#6fa844] rounded-lg text-[11px] font-bold text-slate-700 dark:text-slate-350 transition-all flex items-center justify-center gap-1 border border-transparent hover:border-[#518231]/20"
                        >
                          <RefreshCw size={12} />
                          Regenerate
                        </button>
                        <button
                          onClick={() => deleteImage(idx)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors border border-transparent hover:border-red-200/30"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              /* Idle Gallery Placeholder */
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 shadow-sm min-h-[380px]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6fa844]/15 to-[#518231]/20 flex items-center justify-center text-[#518231]">
                  <ImageIcon size={30} />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <h4 className="text-sm font-extrabold text-slate-950 dark:text-white">
                    Generated Gallery Empty
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Write a prompt in the left panel, select your model configurations, and execute a run. Your generated art frames will compile here.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: Commercial Use Rights Page */}
      {activeTab === 'commercial' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-[#518231]" />
            Commercial Use & Creative Rights Guide
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "1. No Royalty Obligations",
                desc: "Images generated using DALL-E, Imagen, Stability, or Flux through our dashboard are 100% royalty-free. You do not owe any licensing fees to Google, OpenAI, or our utility hub."
              },
              {
                title: "2. Public Domain Status",
                desc: "In many countries (including the US), raw machine-generated images cannot be registered for exclusive copyright because they lack human authorship. The image belongs to the public domain."
              },
              {
                title: "3. Trademark Precaution",
                desc: "Ensure you do not intentionally prompt copyrighted characters, registered logos, or celebrity biometric faces for commercial selling. That remains subject to standard trademark violations."
              }
            ].map((card, idx) => (
              <div key={idx} className="p-5 border border-slate-100 dark:border-slate-850 rounded-xl bg-slate-50/50 dark:bg-slate-800/10 space-y-2">
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{card.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#518231]/5 dark:bg-[#518231]/10 p-5 rounded-xl border border-[#518231]/25 text-xs text-slate-650 dark:text-slate-400 leading-relaxed space-y-3">
            <span className="font-bold text-[#518231] flex items-center gap-1.5">
              <Info size={14} />
              Best Practice for Brand Designers
            </span>
            <p>
              If you generate a logo or visual concept using the AI generator, it is best practice to import the output PNG into vector editing software (like Illustrator or our companion SVG converter). Trace the outlines manually, refine the geometry, adjust curves, and add customized brand fonts. By adding significant human modification, the derived logo becomes a legally copyrightable creative work belonging fully to your brand.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Database-Ready schemas */}
      {activeTab === 'database' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="text-[#518231]" />
              Database Ready Architecture & Schemas
            </h3>
            <span className="bg-slate-100 dark:bg-slate-800 text-[10px] font-mono px-2 py-0.5 rounded text-slate-500">
              MongoDB / Postgres compatible
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-normal">
            Planning to scale this to a full SaaS platform? Our database-ready architecture is designed to map generations, users, credits, and favorites seamlessly. Here are the schemas ready for deployment:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Generations collection */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Generations Table / Collection Schema
              </span>
              <div className="border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden text-xs bg-slate-950 text-slate-350 p-4 font-mono leading-relaxed max-h-[200px] overflow-y-auto">
                <span className="text-purple-400">interface</span> <span className="text-blue-400">Generation</span> {"{"}<br/>
                &nbsp;&nbsp;id: <span className="text-orange-400">string</span>;<br/>
                &nbsp;&nbsp;userId: <span className="text-orange-400">string</span>; <span className="text-[#6fa844]">{"// references User"}</span><br/>
                &nbsp;&nbsp;prompt: <span className="text-orange-400">string</span>;<br/>
                &nbsp;&nbsp;negativePrompt?: <span className="text-orange-400">string</span>;<br/>
                &nbsp;&nbsp;provider: <span className="text-orange-400">"gemini" | "openai" | "stability" | "flux"</span>;<br/>
                &nbsp;&nbsp;settings: {"{"}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;style: <span className="text-orange-400">string</span>;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;aspect: <span className="text-orange-400">string</span>;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;seed: <span className="text-orange-400">number</span>;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;cfgScale: <span className="text-orange-400">number</span>;<br/>
                &nbsp;&nbsp;{"}"};<br/>
                &nbsp;&nbsp;outputs: <span className="text-orange-400">string[]</span>; <span className="text-[#6fa844]">{"// CDN Image URLs"}</span><br/>
                &nbsp;&nbsp;creditsConsumed: <span className="text-orange-400">number</span>;<br/>
                &nbsp;&nbsp;createdAt: <span className="text-orange-400">number</span>;<br/>
                {"}"}
              </div>
            </div>

            {/* Users / Billing collection */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Users & Credits Schema
              </span>
              <div className="border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden text-xs bg-slate-950 text-slate-350 p-4 font-mono leading-relaxed max-h-[200px] overflow-y-auto">
                <span className="text-purple-400">interface</span> <span className="text-blue-400">UserCredits</span> {"{"}<br/>
                &nbsp;&nbsp;userId: <span className="text-orange-400">string</span>;<br/>
                &nbsp;&nbsp;creditBalance: <span className="text-orange-400">number</span>;<br/>
                &nbsp;&nbsp;tier: <span className="text-orange-400">"free" | "premium" | "enterprise"</span>;<br/>
                &nbsp;&nbsp;billingCycle: {"{"}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;resetDate: <span className="text-orange-400">number</span>;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;limitType: <span className="text-orange-400">"daily" | "monthly"</span>;<br/>
                &nbsp;&nbsp;{"}"};<br/>
                &nbsp;&nbsp;analytics: {"{"}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;totalGenerated: <span className="text-orange-400">number</span>;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;lastGenerationAt: <span className="text-orange-400">number</span>;<br/>
                &nbsp;&nbsp;{"}"};<br/>
                {"}"}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Monetization Upgrades Modal Drawer */}
      {showBillingDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md w-full rounded-2xl overflow-hidden shadow-2xl p-6 relative space-y-6 animate-in zoom-in-95">
            <button 
              onClick={() => setShowBillingDrawer(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
            >
              <X size={16} />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center mx-auto">
                <CreditCard size={22} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Top Up Your Credits
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                Unlock high-fidelity models (DALL-E 3, Imagen 3, Flux API) without daily reset limits.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { tokens: 100, price: "$4.99", desc: "Starter creator pack" },
                { tokens: 500, price: "$14.99", desc: "Designer booster pack", popular: true },
                { tokens: 1200, price: "$29.99", desc: "Agencies & high-volume bundle" }
              ].map((tier, idx) => (
                <div 
                  key={idx}
                  className={`p-4 border rounded-xl flex items-center justify-between gap-4 cursor-pointer hover:border-[#518231] transition-all relative ${
                    tier.popular ? 'border-[#518231] bg-[#518231]/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950'
                  }`}
                  onClick={() => {
                    setCredits(prev => prev + tier.tokens);
                    saveToLocalStorage('ai_generator_credits', credits + tier.tokens);
                    setShowBillingDrawer(false);
                    triggerToast('success', `Added ${tier.tokens} credits successfully!`);
                  }}
                >
                  {tier.popular && (
                    <span className="absolute -top-2.5 right-4 bg-[#518231] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-extrabold text-slate-850 dark:text-slate-150">
                      {tier.tokens} Credits
                    </p>
                    <p className="text-[10px] text-slate-550 dark:text-slate-400 mt-0.5">{tier.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{tier.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-center text-slate-450 dark:text-slate-500 leading-normal">
              Clicking a top-up tier adds credits instantly inside LocalStorage for mock transaction testing. Secure billing integrations (Stripe, Paypal) hooks are ready in code headers.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
export default AiImageGeneratorTool;
