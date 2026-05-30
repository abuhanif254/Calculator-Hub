"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Hash, Sliders, Copy, Check, Bookmark, Trash2, History, Sparkles, 
  Download, RefreshCw, AlertCircle, CheckCircle2, Layers, Search, 
  SlidersHorizontal, Award, FileText, Smartphone, Laptop, Star, Plus, Minus
} from "lucide-react";
import { 
  generateHashtags, mixHashtags, downloadFile, generateJSONReport,
  HASHTAG_DATABASE, CAPTION_TEMPLATES, Hashtag, Platform, SavedGroup 
} from "./utils";

const POPULAR_CATEGORIES = [
  { id: "fitness", name: "💪 Fitness" },
  { id: "travel", name: "✈️ Travel" },
  { id: "food", name: "🍔 Food & Recipes" },
  { id: "technology", name: "💻 Technology" },
  { id: "business", name: "📈 Business" },
  { id: "finance", name: "💰 Finance & Money" },
  { id: "education", name: "🎓 Education" },
  { id: "gaming", name: "🎮 Gaming" },
  { id: "fashion", name: "👗 Fashion" },
  { id: "beauty", name: "💅 Beauty & Skincare" },
  { id: "health", name: "❤️ Health & Wellness" },
  { id: "lifestyle", name: "☕ Lifestyle & Vlog" },
  { id: "photography", name: "📷 Photography" },
  { id: "motivation", name: "🔥 Motivation" },
  { id: "sports", name: "⚽ Sports" },
  { id: "pets", name: "🐶 Pets & Animals" },
  { id: "music", name: "🎵 Music" },
  { id: "marketing", name: "📢 Marketing & SEO" }
];

export function InstagramTiktokHashtagGeneratorTool() {
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [targetCount, setTargetCount] = useState<number>(20);
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Mixer presets
  const [mixTrending, setMixTrending] = useState<number>(3);
  const [mixPopular, setMixPopular] = useState<number>(5);
  const [mixMedium, setMixMedium] = useState<number>(7);
  const [mixNiche, setMixNiche] = useState<number>(5);
  const [mixedHashtags, setMixedHashtags] = useState<string[]>([]);

  // Caption Studio state
  const [activeNicheCategory, setActiveNicheCategory] = useState<string>("fitness");
  const [selectedCaptionTemplateIndex, setSelectedCaptionTemplateIndex] = useState<number>(0);
  const [captionHook, setCaptionHook] = useState<string>("");
  const [captionBody, setCaptionBody] = useState<string>("");
  const [captionCta, setCaptionCta] = useState<string>("");

  // History & Saved states
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favoriteTags, setFavoriteTags] = useState<string[]>([]);
  const [savedGroups, setSavedGroups] = useState<SavedGroup[]>([]);
  const [groupNameInput, setGroupNameInput] = useState<string>("");

  // Selection states
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // UI notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const savedHistory = localStorage.getItem("hashtag-search-history");
      if (savedHistory) setSearchHistory(JSON.parse(savedHistory));

      const savedFavs = localStorage.getItem("hashtag-favorites");
      if (savedFavs) setFavoriteTags(JSON.parse(savedFavs));

      const savedGroupsData = localStorage.getItem("hashtag-saved-groups");
      if (savedGroupsData) setSavedGroups(JSON.parse(savedGroupsData));

      // Trigger default generation to display something beautiful immediately
      const defaultList = generateHashtags("fitness", "instagram", 20);
      setHashtags(defaultList);
      setKeywordInput("fitness");
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Update mixer total count when individual values change
  useEffect(() => {
    const total = mixTrending + mixPopular + mixMedium + mixNiche;
    if (total !== targetCount) {
      setTargetCount(total);
    }
    if (hashtags.length > 0) {
      const mixed = mixHashtags(hashtags, {
        trending: mixTrending,
        popular: mixPopular,
        medium: mixMedium,
        niche: mixNiche
      });
      setMixedHashtags(mixed);
    }
  }, [mixTrending, mixPopular, mixMedium, mixNiche, hashtags]);

  // Adjust individual sliders when target count changes
  const handleTargetCountChange = (newCount: number) => {
    setTargetCount(newCount);
    // Recalculate mixed ratios proportionally
    const t = Math.max(1, Math.round(newCount * 0.15));
    const p = Math.max(1, Math.round(newCount * 0.25));
    const m = Math.max(1, Math.round(newCount * 0.35));
    const n = Math.max(1, newCount - (t + p + m));

    setMixTrending(t);
    setMixPopular(p);
    setMixMedium(m);
    setMixNiche(n);
  };

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const handleGenerate = (keyword: string = keywordInput) => {
    if (!keyword.trim()) {
      showToast("Please enter a keyword first.");
      return;
    }
    setIsGenerating(true);
    try {
      const results = generateHashtags(keyword, platform, 60); // generate a pool of 60 for mixing
      setHashtags(results);
      
      // Update history list
      setSearchHistory(prev => {
        const filtered = prev.filter(h => h.toLowerCase() !== keyword.toLowerCase());
        const updated = [keyword, ...filtered].slice(0, 10);
        if (isClient) localStorage.setItem("hashtag-search-history", JSON.stringify(updated));
        return updated;
      });

      // Update mixer outcomes
      const mixed = mixHashtags(results, {
        trending: mixTrending,
        popular: mixPopular,
        medium: mixMedium,
        niche: mixNiche
      });
      setMixedHashtags(mixed);
      setSelectedTags(new Set());
      showToast("Hashtags generated successfully!");
    } catch (e) {
      console.error(e);
      showToast("Failed to generate hashtags.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Preset loading helpers
  const handleCategoryClick = (catName: string) => {
    setKeywordInput(catName);
    setActiveNicheCategory(catName);
    
    // Auto load template caption
    const templates = CAPTION_TEMPLATES[catName] || CAPTION_TEMPLATES["fitness"];
    if (templates && templates.length > 0) {
      const tmpl = templates[0];
      setCaptionHook(tmpl.hook);
      setCaptionBody(tmpl.body);
      setCaptionCta(tmpl.cta);
    }
    handleGenerate(catName);
  };

  // Copy functionalities
  const copyToClipboard = async (textToCopy: string, key: string) => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Copied to clipboard!");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = (tag: string) => {
    setFavoriteTags(prev => {
      let updated;
      if (prev.includes(tag)) {
        updated = prev.filter(t => t !== tag);
        showToast("Removed from favorites.");
      } else {
        updated = [...prev, tag];
        showToast("Saved to favorites!");
      }
      if (isClient) localStorage.setItem("hashtag-favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // Selection toggle
  const toggleSelectTag = (tag: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  // Saving custom groups
  const handleSaveGroup = () => {
    if (!groupNameInput.trim()) {
      showToast("Enter a name for the group.");
      return;
    }
    const tagsToSave = selectedTags.size > 0 
      ? Array.from(selectedTags) 
      : mixedHashtags.slice(0, targetCount);

    if (tagsToSave.length === 0) {
      showToast("No hashtags to save.");
      return;
    }

    const newGroup: SavedGroup = {
      id: "group-" + Date.now(),
      name: groupNameInput.trim(),
      hashtags: tagsToSave,
      platform: platform,
      timestamp: Date.now()
    };

    setSavedGroups(prev => {
      const updated = [newGroup, ...prev];
      if (isClient) localStorage.setItem("hashtag-saved-groups", JSON.stringify(updated));
      return updated;
    });
    setGroupNameInput("");
    showToast(`Saved group '${newGroup.name}'!`);
  };

  const handleDeleteGroup = (id: string) => {
    setSavedGroups(prev => {
      const updated = prev.filter(g => g.id !== id);
      if (isClient) localStorage.setItem("hashtag-saved-groups", JSON.stringify(updated));
      return updated;
    });
    showToast("Group deleted.");
  };

  const handleLoadGroup = (group: SavedGroup) => {
    setKeywordInput(group.name);
    setPlatform(group.platform);
    
    // Map array to Hashtag structures
    const loadedTags: Hashtag[] = group.hashtags.map(name => {
      const clean = "#" + name.replace(/#/g, "");
      const stats = generateHashtags(clean, group.platform, 1)[0] || {
        name: clean,
        volume: 12000,
        competition: "low",
        reachScore: 40,
        engagementScore: 5.5,
        trendScore: 60,
        category: "custom",
        tier: "niche"
      };
      return stats;
    });

    setHashtags(loadedTags);
    setMixedHashtags(group.hashtags);
    setTargetCount(group.hashtags.length);
    showToast(`Loaded group '${group.name}'!`);
  };

  // Bulk generated caption compiling
  const compiledCaption = useMemo(() => {
    const activeTagsString = mixedHashtags.slice(0, targetCount).join(" ");
    return `${captionHook ? captionHook + "\n\n" : ""}${captionBody ? captionBody + "\n\n" : ""}${captionCta ? captionCta + "\n\n" : ""}${activeTagsString}`;
  }, [captionHook, captionBody, captionCta, mixedHashtags, targetCount]);

  // Export functions
  const downloadJSONReport = () => {
    const json = generateJSONReport(keywordInput, hashtags, platform);
    downloadFile(json, "hashtag-report.json", "application/json");
    showToast("Downloaded JSON report!");
  };

  const downloadCSVReport = () => {
    let csv = "Hashtag,Platform,Difficulty,Reach Score,Engagement Score,Trend Score,Est Post Volume\n";
    hashtags.forEach(h => {
      csv += `"${h.name}","${platform}","${h.competition}",${h.reachScore},${h.engagementScore},${h.trendScore},${h.volume}\n`;
    });
    downloadFile(csv, "hashtag-analytics.csv", "text/csv");
    showToast("Downloaded CSV metrics report!");
  };

  // Preset load for Caption Templates
  const handleLoadCaptionTemplate = (index: number) => {
    setSelectedCaptionTemplateIndex(index);
    const templates = CAPTION_TEMPLATES[activeNicheCategory] || CAPTION_TEMPLATES["fitness"];
    if (templates && templates[index]) {
      const tmpl = templates[index];
      setCaptionHook(tmpl.hook);
      setCaptionBody(tmpl.body);
      setCaptionCta(tmpl.cta);
      showToast("Caption template loaded!");
    }
  };

  if (!isClient) {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Initializing Hashtag Library...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={16} className="text-[#518231]" />
          {toastMessage}
        </div>
      )}

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Input Configuration (Spans 5 columns) */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          
          {/* Main Controls Panel */}
          <div className="bg-slate-55 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Search size={16} className="text-[#518231]" /> Hashtag Finder
            </h3>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-450 uppercase">Topic Keywords</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  placeholder="e.g. gym workout, travel blogger"
                  className="flex-1 px-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#518231]"
                />
                <button
                  onClick={() => handleGenerate()}
                  disabled={isGenerating || !keywordInput.trim()}
                  className="px-5 py-2.5 bg-[#518231] hover:bg-[#436a28] text-white font-bold text-xs rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center gap-1 shrink-0"
                >
                  {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} className="text-amber-300" />}
                  Generate
                </button>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Separate multiple niches/keywords with commas for bulk combinations.</p>
            </div>

            {/* Platform selection toggle */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-450 uppercase">Optimization Target</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                <button
                  onClick={() => setPlatform("instagram")}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${platform === "instagram" ? "bg-white dark:bg-slate-800 text-[#518231] shadow-sm" : "text-slate-500"}`}
                >
                  📷 Instagram
                </button>
                <button
                  onClick={() => setPlatform("tiktok")}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${platform === "tiktok" ? "bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm" : "text-slate-500"}`}
                >
                  🎵 TikTok
                </button>
              </div>
            </div>

            {/* Target Limit configuration */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-450 uppercase">Hashtags Count Limit</span>
                <span className="font-bold font-mono text-[#518231]">{targetCount} Tags</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={targetCount}
                onChange={(e) => handleTargetCountChange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono">
                <span>5</span>
                <span>15</span>
                <span>30</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Quick Categories preset chips */}
          <div className="bg-slate-55 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450">Trending Categories</h4>
            <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
              {POPULAR_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${keywordInput === cat.id ? 'bg-[#518231] border-[#518231] text-white' : 'bg-white hover:bg-slate-100 border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-350'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Local state: Favorite Hashtags list */}
          <div className="bg-slate-55 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-center pb-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450 flex items-center gap-1"><Star size={12} className="text-amber-500" /> Favorites Bucket</h4>
              {favoriteTags.length > 0 && (
                <button
                  onClick={() => { setFavoriteTags([]); localStorage.removeItem("hashtag-favorites"); showToast("Favorites cleared."); }}
                  className="text-[9px] font-extrabold text-red-500 uppercase hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            {favoriteTags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto custom-scrollbar pr-1">
                {favoriteTags.map(tag => (
                  <div key={tag} className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg px-2 py-1 text-xs">
                    <span className="font-bold text-amber-700 dark:text-amber-400">{tag}</span>
                    <button 
                      onClick={() => toggleFavorite(tag)}
                      className="text-amber-400 hover:text-red-500 font-bold text-[10px] ml-1 select-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-slate-400 italic">No favorited hashtags stored.</div>
            )}
          </div>

          {/* Local state: Saved Groups list */}
          <div className="bg-slate-55 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450">Saved Custom Groups</h4>
            {savedGroups.length > 0 ? (
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                {savedGroups.map(group => (
                  <div key={group.id} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{group.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{group.hashtags.length} tags | {group.platform === "instagram" ? "📷 IG" : "🎵 TikTok"}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleLoadGroup(group)}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[10px] font-bold text-[#518231] rounded"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(group.id)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded"
                        title="Delete Group"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-slate-400 italic">No saved groups stored.</div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Output Dashboard & Analytics (Spans 7 columns) */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          
          {/* Main List panel */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm gap-0">
            
            {/* Header controls toolbar */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-3">
              <span className="text-xs font-bold text-[#518231] uppercase tracking-wider flex items-center gap-1">
                <Hash size={14} /> Generated Results Pool
              </span>
              
              <div className="flex items-center gap-2">
                {selectedTags.size > 0 ? (
                  <button
                    onClick={() => copyToClipboard(Array.from(selectedTags).join(" "), "selected")}
                    className="px-3 py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-[10px] font-bold rounded-lg flex items-center gap-1"
                  >
                    {copiedKey === "selected" ? <Check size={11} /> : <Copy size={11} />}
                    Copy Selected ({selectedTags.size})
                  </button>
                ) : (
                  <button
                    onClick={() => copyToClipboard(mixedHashtags.slice(0, targetCount).join(" "), "mix")}
                    className="px-3 py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-[10px] font-bold rounded-lg flex items-center gap-1"
                  >
                    {copiedKey === "mix" ? <Check size={11} /> : <Copy size={11} />}
                    Copy Bundle ({targetCount})
                  </button>
                )}
                
                <button
                  onClick={downloadJSONReport}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-500 rounded-lg"
                  title="Download JSON Report"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>

            {/* Generated grid lists */}
            <div className="p-5 flex-1 min-h-[380px] max-h-[580px] overflow-y-auto custom-scrollbar">
              {hashtags.length > 0 ? (
                <div className="space-y-6">
                  
                  {/* Categorized subsets */}
                  {["trending", "popular", "medium", "niche"].map(tier => {
                    const tierTags = hashtags.filter(t => t.tier === tier);
                    if (tierTags.length === 0) return null;
                    
                    return (
                      <div key={tier} className="space-y-2">
                        <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 pb-1">
                          {tier === "trending" ? "🚀 Viral / Trending Tiers" : tier === "popular" ? "🔥 High Competition (1M+)" : tier === "medium" ? "📈 Medium Authority (100k-1M)" : "🎯 Niche Tiers (<100k)"}
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {tierTags.map(tag => {
                            const isSelected = selectedTags.has(tag.name);
                            const isFav = favoriteTags.includes(tag.name);
                            return (
                              <div
                                key={tag.name}
                                onClick={() => toggleSelectTag(tag.name)}
                                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all hover:-translate-y-0.5 ${isSelected ? 'bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'}`}
                              >
                                <div className="flex-1 min-w-0 pr-2">
                                  <div className={`text-xs font-bold truncate ${isSelected ? 'text-green-700 dark:text-green-400' : 'text-slate-700 dark:text-slate-200'}`}>
                                    {tag.name}
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5 text-[9px] text-slate-400 font-mono">
                                    <span>Vol: {tag.volume > 1000000 ? `${(tag.volume/1000000).toFixed(1)}M` : `${Math.round(tag.volume/1000)}k`}</span>
                                    <span>•</span>
                                    <span>Reach: {tag.reachScore}%</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => toggleFavorite(tag.name)}
                                    className={`p-1 rounded hover:bg-slate-150 dark:hover:bg-slate-800 ${isFav ? 'text-amber-500' : 'text-slate-350'}`}
                                  >
                                    <Star size={11} fill={isFav ? "currentColor" : "none"} />
                                  </button>
                                  <div className={`w-1.5 h-1.5 rounded-full ${tag.competition === 'high' ? 'bg-red-500' : tag.competition === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`} title={`Competition: ${tag.competition}`} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  
                </div>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-slate-400 py-16">
                  <Hash size={42} className="mb-2 opacity-30 text-[#518231]" />
                  <p className="text-xs font-medium">Generate or load hashtag structures to start analysis...</p>
                </div>
              )}
            </div>

            {/* Quick custom group saver */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <input
                  type="text"
                  value={groupNameInput}
                  onChange={(e) => setGroupNameInput(e.target.value)}
                  placeholder="custom-group-name"
                  className="px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none w-36 sm:w-48"
                />
                <button
                  onClick={handleSaveGroup}
                  className="px-3 py-1 bg-[#518231] hover:bg-[#436a28] text-white text-[10px] font-bold rounded"
                >
                  Save Group
                </button>
              </div>
              <div className="text-[10px] text-slate-400 font-bold font-mono">
                Click cards to select specific hashtags.
              </div>
            </div>

          </div>

          {/* Viral Mixer Controller */}
          <div className="bg-slate-55 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Layers size={13} className="text-[#518231]" /> Viral Mixer (Balanced Sets Builder)
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-450 uppercase font-bold">Trending</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setMixTrending(m => Math.max(0, m - 1))} className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"><Minus size={10} /></button>
                  <span className="font-bold font-mono text-[#518231]">{mixTrending}</span>
                  <button onClick={() => setMixTrending(m => Math.min(15, m + 1))} className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"><Plus size={10} /></button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-450 uppercase font-bold">Popular</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setMixPopular(m => Math.max(0, m - 1))} className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"><Minus size={10} /></button>
                  <span className="font-bold font-mono text-[#518231]">{mixPopular}</span>
                  <button onClick={() => setMixPopular(m => Math.min(15, m + 1))} className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"><Plus size={10} /></button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-450 uppercase font-bold">Medium</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setMixMedium(m => Math.max(0, m - 1))} className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"><Minus size={10} /></button>
                  <span className="font-bold font-mono text-[#518231]">{mixMedium}</span>
                  <button onClick={() => setMixMedium(m => Math.min(20, m + 1))} className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"><Plus size={10} /></button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-450 uppercase font-bold">Niche</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setMixNiche(m => Math.max(0, m - 1))} className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"><Minus size={10} /></button>
                  <span className="font-bold font-mono text-[#518231]">{mixNiche}</span>
                  <button onClick={() => setMixNiche(m => Math.min(20, m + 1))} className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"><Plus size={10} /></button>
                </div>
              </div>
            </div>

            {/* Active Mixed Set display */}
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                <span>Active Mixed Set ({mixedHashtags.slice(0, targetCount).length} tags)</span>
                <button
                  onClick={() => copyToClipboard(mixedHashtags.slice(0, targetCount).join(" "), "active-mix")}
                  className="text-[#518231] hover:underline"
                >
                  {copiedKey === "active-mix" ? "Copied!" : "Copy Mixed Set"}
                </button>
              </div>
              <div className="text-xs font-mono break-all text-slate-600 dark:text-slate-350 select-all font-medium leading-relaxed max-h-[80px] overflow-y-auto custom-scrollbar select-text">
                {mixedHashtags.slice(0, targetCount).join(" ") || "No hashtags loaded in mix buffer."}
              </div>
            </div>
          </div>

          {/* Caption + Hashtag composer Panel */}
          <div className="bg-slate-55 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <FileText size={13} className="text-[#518231]" /> Caption Studio
              </h4>
              
              <div className="flex gap-1">
                {[0, 1].map(idx => (
                  <button
                    key={idx}
                    onClick={() => handleLoadCaptionTemplate(idx)}
                    className={`px-2 py-0.5 text-[9px] font-bold rounded ${selectedCaptionTemplateIndex === idx ? 'bg-[#518231] text-white' : 'bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-500'}`}
                  >
                    Template {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-450 uppercase">Hook line</label>
                  <input
                    type="text"
                    value={captionHook}
                    onChange={(e) => setCaptionHook(e.target.value)}
                    placeholder="e.g. Stop wasting hours on writing code."
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-450 uppercase">Call to Action (CTA)</label>
                  <input
                    type="text"
                    value={captionCta}
                    onChange={(e) => setCaptionCta(e.target.value)}
                    placeholder="e.g. Click link in bio for templates! 👇"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-450 uppercase">Body Context</label>
                <textarea
                  value={captionBody}
                  onChange={(e) => setCaptionBody(e.target.value)}
                  placeholder="Enter details explaining what the post or video showcases..."
                  className="w-full min-h-[90px] text-xs px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none resize-none custom-scrollbar"
                />
              </div>

              {/* Combined Outflow Preview */}
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl space-y-2 relative group">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                  <span>Compiled Caption Output</span>
                  <button
                    onClick={() => copyToClipboard(compiledCaption, "compiled-caption")}
                    className="text-[#518231] hover:underline"
                  >
                    {copiedKey === "compiled-caption" ? "Copied!" : "Copy Full Caption"}
                  </button>
                </div>
                <pre className="text-[11px] font-sans whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200 max-h-[140px] overflow-y-auto custom-scrollbar select-all pr-1 select-text">
                  {compiledCaption}
                </pre>
              </div>
            </div>
          </div>

          {/* Social Preview simulation mock */}
          <div className="bg-slate-55 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Smartphone size={13} className="text-[#518231]" /> Social Feed Preview Simulation
            </h4>
            
            <div className="max-w-[340px] mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-md">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-850 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center font-bold text-xs">A</div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">your_creator_name</div>
                  <div className="text-[9px] text-slate-400">Sponsored/Organic • 2026</div>
                </div>
              </div>
              
              {/* Dummy Image frame */}
              <div className="aspect-square bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400 p-4 border-b border-slate-100 dark:border-slate-850">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Post Visual Mock</span>
                <span className="text-[9px] text-slate-400/80 text-center leading-normal">Simulates a standard mobile layout viewport on {platform === 'instagram' ? 'Instagram Feed' : 'TikTok Screen'}.</span>
              </div>
              
              <div className="p-3 space-y-1.5 text-[11px] leading-relaxed">
                <div className="text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white mr-1.5">your_creator_name</span>
                  {captionHook || "No hook text set."}
                </div>
                <div className="text-slate-500 line-clamp-3">
                  {captionBody || "Body description loaded here..."}
                </div>
                <div className="text-[#518231] font-mono select-all truncate">
                  {mixedHashtags.slice(0, Math.min(8, targetCount)).join(" ")}...
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
