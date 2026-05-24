"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles, ShieldCheck, Heart, Copy, Check, Download, RotateCcw,
  Search, ShieldAlert, BadgeInfo, Settings, ListFilter, Trash2,
  ChevronDown, ChevronUp, Share2, Star, CheckCircle, XCircle, Info, ExternalLink
} from 'lucide-react';

interface GeneratorSettings {
  mode: 'random' | 'brandable' | 'gamer' | 'professional' | 'aesthetic' | 'tech' | 'minimal' | 'secure';
  platform: 'all' | 'instagram' | 'tiktok' | 'youtube' | 'twitch' | 'discord' | 'github' | 'twitter' | 'reddit';
  preset: 'none' | 'cyberpunk' | 'anime' | 'hacker' | 'fantasy' | 'startup';
  baseWord: string;
  addNumbers: boolean;
  addSymbols: boolean;
  leetspeak: boolean;
  uppercaseStyle: 'lowercase' | 'uppercase' | 'none' | 'camel' | 'first' | 'random';
  lengthMin: number;
  lengthMax: number;
  separator: 'none' | 'dot' | 'underscore' | 'hyphen' | 'random';
  prefix: string;
  suffix: string;
  count: number;
}

interface ScoreDetails {
  uniqueness: number;
  memorability: number;
  simplicity: number;
  overall: number;
}

interface UsernameItem {
  name: string;
  scores: ScoreDetails;
  platforms: Record<string, 'available' | 'taken' | 'invalid'>;
  validationWarnings: string[];
}

const WORD_LISTS = {
  gamer: {
    verbs: ["Slay", "Crush", "Snipe", "Frag", "Dash", "Loot", "Spawn", "Dodge", "Parry", "Heal", "Buff", "Nerf", "Grind", "Rush", "Carry", "Flex", "Vanquish", "Reap", "Wrath", "Apex"],
    nouns: ["Noob", "Pro", "Clutch", "Ping", "Lag", "Skin", "Guild", "Clan", "Squad", "Rage", "Tilt", "Smurf", "Meta", "Hunter", "Slayer", "Beast", "Titan", "Phantom", "Rogue"]
  },
  cyberpunk: {
    adjectives: ["Neon", "Cyber", "Synth", "Chrome", "Retro", "Vector", "Digital", "Grid", "Matrix", "Holo", "Static", "Signal", "Laser", "Data", "Binary", "Quantum"],
    nouns: ["Glitch", "Runner", "Hacker", "Vapor", "Wave", "Net", "Ghost", "Specter", "Proxy", "Daemon", "Node", "Byte", "Codec", "Cipher", "Link", "Pixel"]
  },
  aesthetic: {
    words: ["Luna", "Dream", "Haze", "Mist", "Echo", "Glow", "Dusk", "Dawn", "Pastel", "Soft", "Cozy", "Cloud", "Blossom", "Peach", "Honey", "Silk", "Velvet", "Indigo", "Lilac", "Mint", "Breeze", "Whisper", "Melody", "Aura", "Ether", "Zen", "Oasis", "Bloom"]
  },
  tech: {
    words: ["Code", "Dev", "Stack", "Bit", "Byte", "Pixel", "Node", "Data", "Logic", "Host", "Port", "Kernel", "Script", "Web", "Cloud", "Git", "Bug", "Array", "Loop", "Void"]
  },
  professional: {
    suffixes: ["Consulting", "Solutions", "Studio", "Labs", "Dev", "Codes", "Design", "HQ", "Partners", "Co", "Media", "Agency", "Group", "Global", "Ventures", "Digital", "Systems"]
  },
  general: {
    adjectives: ["Silent", "Rogue", "Atomic", "Crystal", "Omega", "Alpha", "Wild", "Frozen", "Flaming", "Dark", "Golden", "Sonic", "Vortex", "Rapid", "Smooth", "Bold", "Epic", "Legendary", "Mystic", "Obsidian", "Spectral", "Lunar", "Solar", "Nebula", "Plasma", "Cryptic", "Urban", "Dynamic", "Infinite", "Blaze", "Storm", "Thunder"],
    nouns: ["Falcon", "Viper", "Coyote", "Wolf", "Panther", "Tiger", "Cobra", "Dragon", "Demon", "Angel", "Rebel", "Nomad", "Seeker", "Maker", "Crafter", "Builder", "Pilot", "Captain", "Scout", "Sentinel", "Guardian", "Agent", "Spark", "Fury", "Storm", "Wind", "Dust", "Ash", "Ember", "Wave", "Pulse", "Echo", "Mirage"]
  }
};

export function UsernameGeneratorTool() {
  // --- Main Generator Settings State ---
  const [settings, setSettings] = useState<GeneratorSettings>({
    mode: 'random',
    platform: 'all',
    preset: 'none',
    baseWord: '',
    addNumbers: false,
    addSymbols: false,
    leetspeak: false,
    uppercaseStyle: 'none',
    lengthMin: 3,
    lengthMax: 20,
    separator: 'none',
    prefix: '',
    suffix: '',
    count: 20
  });

  // --- Generated Output State ---
  const [usernames, setUsernames] = useState<UsernameItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedName, setExpandedName] = useState<string | null>(null);

  // --- Search / Filters / Sorting ---
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'default' | 'alphabetical' | 'uniqueness' | 'simplicity' | 'length'>('default');
  const [optionsOpen, setOptionsOpen] = useState(false);

  // --- Favorites & History ---
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [exportCopied, setExportCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  // --- Initialize Favorites & History ---
  useEffect(() => {
    const savedFavs = localStorage.getItem('username_generator_favorites');
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) {}
    }

    const savedHistory = localStorage.getItem('username_generator_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
    }

    // Generate initial batch
    handleGenerate();
  }, []);

  // --- Update Favorites in localStorage ---
  const saveFavsToLocalStorage = (newFavs: string[]) => {
    setFavorites(newFavs);
    localStorage.setItem('username_generator_favorites', JSON.stringify(newFavs));
  };

  // --- Toggle Favorite ---
  const toggleFavorite = (name: string) => {
    const isFav = favorites.includes(name);
    let updated: string[];
    if (isFav) {
      updated = favorites.filter(f => f !== name);
    } else {
      updated = [...favorites, name];
    }
    saveFavsToLocalStorage(updated);
  };

  // --- Copy Clipboard ---
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedName(text);
    setTimeout(() => setCopiedName(null), 2000);
  };

  // --- Copy Selected Favorites ---
  const copyAllFavorites = () => {
    if (favorites.length === 0) return;
    navigator.clipboard.writeText(favorites.join('\n'));
    setCopiedName('favorites_all');
    setTimeout(() => setCopiedName(null), 2000);
  };

  // --- Export File Trigger ---
  const handleExport = (format: 'txt' | 'csv' | 'json') => {
    let content = '';
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `generated-usernames-${dateStr}.${format}`;

    if (format === 'txt') {
      content = usernames.map(u => u.name).join('\n');
    } else if (format === 'csv') {
      content = 'Username,Uniqueness Score,Memorability Score,Simplicity Score,Overall Score\n' +
        usernames.map(u => `"${u.name}",${u.scores.uniqueness},${u.scores.memorability},${u.scores.simplicity},${u.scores.overall}`).join('\n');
    } else if (format === 'json') {
      content = JSON.stringify(usernames, null, 2);
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Generate Logic ---
  const generateSingleUsername = (currSettings: GeneratorSettings): string => {
    let base = "";
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Determine core base word
    if (currSettings.baseWord && currSettings.baseWord.trim()) {
      const inputWord = currSettings.baseWord.trim();
      if (currSettings.mode === 'professional') {
        const suff = pick(WORD_LISTS.professional.suffixes);
        base = `${inputWord}${suff}`;
      } else if (currSettings.mode === 'gamer') {
        const verb = pick(WORD_LISTS.gamer.verbs);
        const noun = pick(WORD_LISTS.gamer.nouns);
        base = Math.random() > 0.5 ? `${inputWord}${noun}` : `${verb}${inputWord}`;
      } else if (currSettings.mode === 'tech') {
        const tech = pick(WORD_LISTS.tech.words);
        base = Math.random() > 0.5 ? `${inputWord}${tech}` : `${tech}${inputWord}`;
      } else if (currSettings.mode === 'aesthetic') {
        const aes = pick(WORD_LISTS.aesthetic.words);
        base = Math.random() > 0.5 ? `${inputWord}${aes}` : `${aes}${inputWord}`;
      } else {
        const adj = pick(WORD_LISTS.general.adjectives);
        const noun = pick(WORD_LISTS.general.nouns);
        base = Math.random() > 0.5 ? `${adj}${inputWord}` : `${inputWord}${noun}`;
      }
    } else {
      // Completely generated from dictionaries
      if (currSettings.preset === 'cyberpunk' || currSettings.preset === 'hacker') {
        const adj = pick(WORD_LISTS.cyberpunk.adjectives);
        const noun = pick(WORD_LISTS.cyberpunk.nouns);
        base = `${adj}${noun}`;
      } else if (currSettings.preset === 'anime') {
        const w1 = pick(WORD_LISTS.aesthetic.words);
        const noun = pick(WORD_LISTS.general.nouns);
        base = `${w1}${noun}`;
      } else if (currSettings.preset === 'fantasy') {
        const adj = pick(WORD_LISTS.general.adjectives);
        const nouns = ["Knight", "Wizard", "Dragon", "Sage", "Mage", "Elf", "Orc", "Pixie", "Bard", "Ranger", "Beast", "Titan", "Phoenix", "Fairy", "Goblin", "Dwarf", "Rogue"];
        base = `${adj}${pick(nouns)}`;
      } else if (currSettings.preset === 'startup') {
        const w1 = pick(WORD_LISTS.cyberpunk.adjectives);
        const w2 = pick(WORD_LISTS.professional.suffixes);
        base = `${w1}${w2}`;
      } else if (currSettings.mode === 'gamer') {
        const adj = pick(WORD_LISTS.general.adjectives);
        const noun = pick(WORD_LISTS.gamer.nouns);
        base = `${adj}${noun}`;
      } else if (currSettings.mode === 'tech') {
        const tech = pick(WORD_LISTS.tech.words);
        const noun = pick(WORD_LISTS.general.nouns);
        base = `${tech}${noun}`;
      } else if (currSettings.mode === 'aesthetic') {
        const w1 = pick(WORD_LISTS.aesthetic.words);
        const w2 = pick(WORD_LISTS.aesthetic.words);
        base = w1 !== w2 ? `${w1}${w2}` : `${w1}Glow`;
      } else if (currSettings.mode === 'professional') {
        const adj = pick(WORD_LISTS.general.adjectives);
        const suff = pick(WORD_LISTS.professional.suffixes);
        base = `${adj}${suff}`;
      } else if (currSettings.mode === 'minimal') {
        const cons = "bcdfghjklmnprstvwxyz";
        const vows = "aeiouy";
        base = pick(cons.split("")) + pick(vows.split("")) + pick(cons.split("")) + pick(vows.split(""));
        base = base.charAt(0).toUpperCase() + base.slice(1);
      } else if (currSettings.mode === 'secure') {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        base = Array.from({ length: 12 }).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
      } else {
        const adj = pick(WORD_LISTS.general.adjectives);
        const noun = pick(WORD_LISTS.general.nouns);
        base = `${adj}${noun}`;
      }
    }

    if (currSettings.prefix) {
      base = `${currSettings.prefix}${base}`;
    }
    if (currSettings.suffix) {
      base = `${base}${currSettings.suffix}`;
    }

    // Leetspeak mutation
    if (currSettings.leetspeak) {
      const leetMap: Record<string, string> = {
        'a': '4', 'A': '4', 'e': '3', 'E': '3', 'i': '1', 'I': '1',
        'o': '0', 'O': '0', 's': '5', 'S': '5', 't': '7', 'T': '7'
      };
      base = base.split("").map(c => leetMap[c] ?? c).join("");
    }

    // Casing
    if (currSettings.uppercaseStyle === 'lowercase') {
      base = base.toLowerCase();
    } else if (currSettings.uppercaseStyle === 'uppercase') {
      base = base.toUpperCase();
    } else if (currSettings.uppercaseStyle === 'first') {
      base = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
    } else if (currSettings.uppercaseStyle === 'random') {
      base = base.split("").map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join("");
    }

    // Separators
    if (currSettings.separator !== 'none') {
      const sep = currSettings.separator === 'dot' ? '.'
                : currSettings.separator === 'underscore' ? '_'
                : currSettings.separator === 'hyphen' ? '-'
                : pick(['.', '_', '-']);
      base = base.replace(/([a-z0-9])([A-Z])/g, `$1${sep}$2`);
    }

    // Add numbers
    if (currSettings.addNumbers) {
      const num = Math.floor(Math.random() * 100);
      base = `${base}${num < 10 ? `0${num}` : num}`;
    }

    // Add symbols
    if (currSettings.addSymbols) {
      const allowedSymbols: string[] = [];
      if (currSettings.platform === 'all' || ['discord', 'instagram', 'tiktok'].includes(currSettings.platform)) {
        allowedSymbols.push('_', '.');
      }
      if (['twitter', 'twitch', 'reddit'].includes(currSettings.platform)) {
        allowedSymbols.push('_');
      }
      if (['github', 'youtube'].includes(currSettings.platform)) {
        allowedSymbols.push('-');
      }
      if (allowedSymbols.length > 0) {
        base = `${base}${pick(allowedSymbols)}`;
      }
    }

    // Platform Length Constraints
    let maxLength = currSettings.lengthMax;
    if (currSettings.platform === 'twitter') maxLength = Math.min(maxLength, 15);
    if (currSettings.platform === 'tiktok') maxLength = Math.min(maxLength, 24);
    if (currSettings.platform === 'reddit') maxLength = Math.min(maxLength, 20);
    if (currSettings.platform === 'instagram') maxLength = Math.min(maxLength, 30);
    if (currSettings.platform === 'youtube') maxLength = Math.min(maxLength, 30);
    if (currSettings.platform === 'github') maxLength = Math.min(maxLength, 39);

    if (base.length > maxLength) {
      base = base.slice(0, maxLength).replace(/[-_.]+$/, '');
    }

    return base;
  };

  const computeScores = (name: string): ScoreDetails => {
    // Uniqueness score calculation
    let uniqueness = 50;
    if (name.length > 10) uniqueness += 15;
    if (name.match(/[0-9]/)) uniqueness += 15;
    if (name.match(/[-_.]/)) uniqueness += 10;
    if (name.match(/[A-Z]/) && name.match(/[a-z]/)) uniqueness += 10;
    uniqueness = Math.min(uniqueness, 100);

    // Memorability score
    let memorability = 90;
    if (name.length > 12) memorability -= 20;
    if ((name.match(/[0-9]/g) || []).length > 2) memorability -= 15;
    if ((name.match(/[-_.]/g) || []).length > 1) memorability -= 10;
    memorability = Math.max(memorability, 30);

    // Simplicity score
    let simplicity = 100;
    simplicity -= name.length * 2.5;
    if (name.match(/[0-9]/)) simplicity -= 15;
    if (name.match(/[-_.]/)) simplicity -= 10;
    simplicity = Math.max(Math.min(simplicity, 100), 20);

    const overall = Math.round((uniqueness + memorability + simplicity) / 3);

    return { uniqueness, memorability, simplicity: Math.round(simplicity), overall };
  };

  const validateForPlatform = (name: string, plat: string): 'available' | 'taken' | 'invalid' => {
    // Format compatibility rules
    if (plat === 'instagram') {
      if (name.length > 30) return 'invalid';
      if (!/^[a-zA-Z0-9._]+$/.test(name)) return 'invalid';
    }
    if (plat === 'tiktok') {
      if (name.length < 2 || name.length > 24) return 'invalid';
      if (!/^[a-zA-Z0-9._]+$/.test(name)) return 'invalid';
    }
    if (plat === 'twitter') {
      if (name.length > 15) return 'invalid';
      if (!/^[a-zA-Z0-9_]+$/.test(name)) return 'invalid';
    }
    if (plat === 'github') {
      if (name.length > 39) return 'invalid';
      if (!/^[a-zA-Z0-9-]+$/.test(name)) return 'invalid';
      if (name.startsWith('-') || name.endsWith('-')) return 'invalid';
    }
    if (plat === 'reddit') {
      if (name.length < 3 || name.length > 20) return 'invalid';
      if (!/^[a-zA-Z0-9_]+$/.test(name)) return 'invalid';
    }

    // Availability simulation based on name uniqueness score
    const score = computeScores(name).uniqueness;
    // High uniqueness => Higher chance of simulation availability
    const threshold = 100 - score;
    return Math.random() * 100 > threshold ? 'available' : 'taken';
  };

  const handleGenerate = (customSettings?: GeneratorSettings) => {
    setLoading(true);
    const activeSettings = customSettings || settings;

    // Simulate load delay
    setTimeout(() => {
      const generatedList: UsernameItem[] = [];
      const set = new Set<string>();
      let attempts = 0;

      while (set.size < activeSettings.count && attempts < activeSettings.count * 10) {
        attempts++;
        const name = generateSingleUsername(activeSettings);
        if (name && name.length >= activeSettings.lengthMin && name.length <= activeSettings.lengthMax) {
          set.add(name);
        }
      }

      set.forEach(name => {
        const validationWarnings: string[] = [];
        if (activeSettings.platform === 'instagram' && name.includes('-')) {
          validationWarnings.push("Instagram does not support hyphens.");
        }
        if (activeSettings.platform === 'twitter' && name.length > 15) {
          validationWarnings.push("Twitter usernames cannot exceed 15 characters.");
        }

        const scores = computeScores(name);
        const platforms = {
          instagram: validateForPlatform(name, 'instagram'),
          tiktok: validateForPlatform(name, 'tiktok'),
          twitter: validateForPlatform(name, 'twitter'),
          github: validateForPlatform(name, 'github'),
          reddit: validateForPlatform(name, 'reddit'),
        };

        generatedList.push({ name, scores, platforms, validationWarnings });
      });

      setUsernames(generatedList);
      setLoading(false);

      // Save seed to history if present
      if (activeSettings.baseWord && !history.includes(activeSettings.baseWord)) {
        const nextHistory = [activeSettings.baseWord, ...history].slice(0, 10);
        setHistory(nextHistory);
        localStorage.setItem('username_generator_history', JSON.stringify(nextHistory));
      }
    }, 400);
  };

  // --- Handle presets apply ---
  const handleApplyPreset = (preset: GeneratorSettings['preset']) => {
    const updated = {
      ...settings,
      preset,
      mode: preset !== 'none' ? 'random' as any : settings.mode
    };
    setSettings(updated);
    handleGenerate(updated);
  };

  // --- Filtering & Sorting computation ---
  const processedUsernames = useMemo(() => {
    let result = [...usernames];

    if (searchTerm) {
      result = result.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (sortKey === 'alphabetical') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortKey === 'uniqueness') {
      result.sort((a, b) => b.scores.uniqueness - a.scores.uniqueness);
    } else if (sortKey === 'simplicity') {
      result.sort((a, b) => b.scores.simplicity - a.scores.simplicity);
    } else if (sortKey === 'length') {
      result.sort((a, b) => a.name.length - b.name.length);
    }

    return result;
  }, [usernames, searchTerm, sortKey]);

  return (
    <div className="w-full flex flex-col gap-8 text-slate-800 dark:text-slate-100">
      
      {/* ────────────────────────────────────────────────────────
          PRESET DESIGN CARDS
          ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { key: 'none', label: 'Custom Words' },
          { key: 'cyberpunk', label: 'Cyberpunk 🦾' },
          { key: 'anime', label: 'Anime 💮' },
          { key: 'hacker', label: 'Hacker 💻' },
          { key: 'fantasy', label: 'Fantasy 🧙‍♂️' },
          { key: 'startup', label: 'Startup 🚀' }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => handleApplyPreset(item.key as any)}
            className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all shadow-sm ${
              settings.preset === item.key
                ? 'bg-[#518231] border-[#518231] text-white'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-[#518231] hover:shadow-md'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ────────────────────────────────────────────────────────
          MAIN INTERACTIVE DASHBOARD
          ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Settings className="text-[#518231]" size={20} /> Parameters
            </h3>

            {/* Keyword Seed Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Base Keyword / Nickname</label>
              <div className="relative">
                <input
                  type="text"
                  value={settings.baseWord}
                  onChange={(e) => setSettings({ ...settings, baseWord: e.target.value })}
                  placeholder="e.g. Alex, Neon, Quantum"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm pr-10"
                />
                {settings.baseWord && (
                  <button
                    onClick={() => setSettings({ ...settings, baseWord: '' })}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Mode selection tabs */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Style Category</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'random', label: 'Random Mix' },
                  { key: 'brandable', label: 'Brandable' },
                  { key: 'gamer', label: 'Gamer Alias' },
                  { key: 'tech', label: 'Developer / Tech' },
                  { key: 'aesthetic', label: 'Aesthetic' },
                  { key: 'professional', label: 'Professional' },
                  { key: 'minimal', label: 'Short/Minimal' },
                  { key: 'secure', label: 'Encrypted/Secure' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setSettings({ ...settings, mode: item.key as any, preset: 'none' })}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      settings.mode === item.key && settings.preset === 'none'
                        ? 'bg-[#518231]/10 border-[#518231] text-[#518231] dark:text-green-400'
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform rules filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Optimize Platform Format</label>
              <select
                value={settings.platform}
                onChange={(e) => setSettings({ ...settings, platform: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm"
              >
                <option value="all">Universal (All Platforms)</option>
                <option value="instagram">Instagram (Letters, dots, underscores)</option>
                <option value="tiktok">TikTok (Max 24 chars, no spaces)</option>
                <option value="twitter">X / Twitter (Max 15 chars, alphanumeric, underscores)</option>
                <option value="github">GitHub (Max 39 chars, hyphens)</option>
                <option value="reddit">Reddit (Max 20 chars, underscores)</option>
                <option value="youtube">YouTube Handle (Max 30 chars)</option>
                <option value="discord">Discord (Lowercase, dots, underscores)</option>
                <option value="twitch">Twitch (Letters, numbers, underscores)</option>
              </select>
            </div>

            {/* Advanced accordion toggle */}
            <button
              onClick={() => setOptionsOpen(!optionsOpen)}
              className="w-full flex items-center justify-between text-sm font-semibold text-[#518231] border-t border-slate-100 dark:border-slate-800 pt-4"
            >
              <span>{optionsOpen ? "Hide Advanced Options" : "Show Advanced Options"}</span>
              {optionsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {optionsOpen && (
              <div className="space-y-4 pt-2 border-t border-slate-50 dark:border-slate-800/50">
                
                {/* Length Limits */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Min Length ({settings.lengthMin})</span>
                    <span>Max Length ({settings.lengthMax})</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min="3"
                      max="15"
                      value={settings.lengthMin}
                      onChange={(e) => setSettings({ ...settings, lengthMin: Number(e.target.value) })}
                      className="w-1/2 accent-[#518231]"
                    />
                    <input
                      type="range"
                      min="10"
                      max="35"
                      value={settings.lengthMax}
                      onChange={(e) => setSettings({ ...settings, lengthMax: Number(e.target.value) })}
                      className="w-1/2 accent-[#518231]"
                    />
                  </div>
                </div>

                {/* Case formatting */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Casing Style</label>
                  <select
                    value={settings.uppercaseStyle}
                    onChange={(e) => setSettings({ ...settings, uppercaseStyle: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none text-xs"
                  >
                    <option value="none">Standard Mixed (e.g. PixelWarrior)</option>
                    <option value="lowercase">lowercase (e.g. pixelwarrior)</option>
                    <option value="uppercase">UPPERCASE (e.g. PIXELWARRIOR)</option>
                    <option value="first">First letter caps (e.g. Pixelwarrior)</option>
                    <option value="random">RaNdOm CaSe (e.g. PiXeLwArRiOr)</option>
                  </select>
                </div>

                {/* Separators */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Separator Symbol</label>
                  <select
                    value={settings.separator}
                    onChange={(e) => setSettings({ ...settings, separator: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none text-xs"
                  >
                    <option value="none">None (No separator)</option>
                    <option value="dot">Dot / Period (.)</option>
                    <option value="underscore">Underscore (_)</option>
                    <option value="hyphen">Hyphen / Dash (-)</option>
                    <option value="random">Random Separators</option>
                  </select>
                </div>

                {/* Custom Prefix & Suffix */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Add Prefix</label>
                    <input
                      type="text"
                      value={settings.prefix}
                      onChange={(e) => setSettings({ ...settings, prefix: e.target.value })}
                      placeholder="e.g. The, Real"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Add Suffix</label>
                    <input
                      type="text"
                      value={settings.suffix}
                      onChange={(e) => setSettings({ ...settings, suffix: e.target.value })}
                      placeholder="e.g. YT, GG"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Checkbox Options */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={settings.addNumbers}
                      onChange={(e) => setSettings({ ...settings, addNumbers: e.target.checked })}
                      className="rounded accent-[#518231] w-4 h-4"
                    />
                    Append Numbers (e.g. 99, 07)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={settings.addSymbols}
                      onChange={(e) => setSettings({ ...settings, addSymbols: e.target.checked })}
                      className="rounded accent-[#518231] w-4 h-4"
                    />
                    Append Special Symbols
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={settings.leetspeak}
                      onChange={(e) => setSettings({ ...settings, leetspeak: e.target.checked })}
                      className="rounded accent-[#518231] w-4 h-4"
                    />
                    Enable Leetspeak Mutation (e.g. E→3, A→4)
                  </label>
                </div>
              </div>
            )}

            {/* Bulk size selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Names Count</label>
              <select
                value={settings.count}
                onChange={(e) => setSettings({ ...settings, count: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm"
              >
                <option value="10">Generate 10 Usernames</option>
                <option value="20">Generate 20 Usernames</option>
                <option value="55">Generate 55 Usernames</option>
                <option value="100">Generate 100 Usernames</option>
              </select>
            </div>

            {/* Trigger Button */}
            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className="w-full py-3 bg-[#518231] hover:bg-[#436e29] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              <Sparkles size={18} />
              {loading ? "Generating Handles..." : "Generate Usernames"}
            </button>
          </div>

          {/* Seed Words History */}
          {history.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <RotateCcw size={16} className="text-slate-400" /> Recent Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {history.map((histWord, hIdx) => (
                  <button
                    key={hIdx}
                    onClick={() => {
                      const updated = { ...settings, baseWord: histWord };
                      setSettings(updated);
                      handleGenerate(updated);
                    }}
                    className="text-xs bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 py-1.5 px-3 rounded-lg font-medium transition-all"
                  >
                    {histWord}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Output Lists */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6 min-h-[500px]">
            
            {/* Header controls toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter outputs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none text-sm"
                />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              </div>

              {/* Sorting options */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <ListFilter size={16} className="text-slate-400" />
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold focus:outline-none"
                >
                  <option value="default">Sort: Default Order</option>
                  <option value="alphabetical">Sort: Alphabetical</option>
                  <option value="uniqueness">Sort: High Uniqueness</option>
                  <option value="simplicity">Sort: Simplicity</option>
                  <option value="length">Sort: Shortest First</option>
                </select>

                {/* Export menu */}
                <div className="relative">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleExport(e.target.value as any);
                        e.target.value = "";
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold focus:outline-none cursor-pointer text-[#518231]"
                  >
                    <option value="">Export Lists</option>
                    <option value="txt">Export Plain Text (.txt)</option>
                    <option value="csv">Export Spreadsheet (.csv)</option>
                    <option value="json">Export Schema (.json)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Live List outputs */}
            {loading ? (
              <div className="flex-1 flex flex-col justify-center items-center py-20 gap-4">
                <div className="w-10 h-10 border-4 border-[#518231]/30 border-t-[#518231] rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-slate-400">Synthesizing usernames based on presets...</p>
              </div>
            ) : processedUsernames.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center py-20 text-center gap-2">
                <ShieldAlert className="text-slate-300 dark:text-slate-700" size={48} />
                <p className="text-sm font-bold text-slate-500">No matching usernames found.</p>
                <p className="text-xs text-slate-400 max-w-xs">Try clearing search filters or regenerate custom tags.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {processedUsernames.map((uItem, index) => {
                  const isFavorite = favorites.includes(uItem.name);
                  const isExpanded = expandedName === uItem.name;

                  return (
                    <div
                      key={index}
                      className={`border rounded-2xl transition-all flex flex-col ${
                        isExpanded
                          ? 'border-[#518231] bg-[#518231]/5 shadow-sm'
                          : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {/* Base Username Card */}
                      <div className="p-4 flex justify-between items-center">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => setExpandedName(isExpanded ? null : uItem.name)}
                        >
                          <h4 className="text-base font-bold text-slate-900 dark:text-white font-mono break-all">{uItem.name}</h4>
                          <div className="flex gap-2 items-center mt-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                              uItem.scores.overall >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400' :
                              uItem.scores.overall >= 50 ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400' :
                              'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                            }`}>
                              Overall Quality: {uItem.scores.overall}%
                            </span>
                            {uItem.validationWarnings.length > 0 && (
                              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold uppercase dark:bg-red-950/50 dark:text-red-400 flex items-center gap-1">
                                <BadgeInfo size={10} /> warning
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-1.5 shrink-0">
                          {/* Copy trigger */}
                          <button
                            onClick={() => copyToClipboard(uItem.name)}
                            className="p-2 rounded-lg text-slate-400 hover:text-[#518231] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Copy to Clipboard"
                          >
                            {copiedName === uItem.name ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                          </button>
                          
                          {/* Star trigger */}
                          <button
                            onClick={() => toggleFavorite(uItem.name)}
                            className={`p-2 rounded-lg transition-colors ${
                              isFavorite ? 'text-amber-500 hover:text-amber-600' : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                            title="Save to Favorites"
                          >
                            <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Analysis Drawer */}
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-800/80 pt-3 space-y-4 text-xs">
                          
                          {/* Warnings banner */}
                          {uItem.validationWarnings.length > 0 && (
                            <div className="bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 p-2.5 rounded-xl border border-red-100 dark:border-red-900/50 flex gap-2">
                              <ShieldAlert className="shrink-0 mt-0.5" size={14} />
                              <ul className="list-disc pl-3 space-y-0.5">
                                {uItem.validationWarnings.map((warning, wIdx) => <li key={wIdx}>{warning}</li>)}
                              </ul>
                            </div>
                          )}

                          {/* Detail metrics scores */}
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-white/50 dark:bg-slate-950/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Uniqueness</span>
                              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{uItem.scores.uniqueness}%</span>
                            </div>
                            <div className="bg-white/50 dark:bg-slate-950/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Memorability</span>
                              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{uItem.scores.memorability}%</span>
                            </div>
                            <div className="bg-white/50 dark:bg-slate-950/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Simplicity</span>
                              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{uItem.scores.simplicity}%</span>
                            </div>
                          </div>

                          {/* Platforms simulation checklist */}
                          <div className="space-y-2 bg-white/50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                            <span className="font-bold text-[10px] text-slate-400 uppercase flex items-center gap-1.5 mb-2">
                              <Info size={11} /> Simulated Platform Availability
                            </span>
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              {[
                                { name: 'Instagram', key: 'instagram' },
                                { name: 'TikTok', key: 'tiktok' },
                                { name: 'X / Twitter', key: 'twitter' },
                                { name: 'GitHub', key: 'github' },
                                { name: 'Reddit', key: 'reddit' }
                              ].map((plat) => {
                                const status = uItem.platforms[plat.key];
                                return (
                                  <div key={plat.key} className="flex justify-between items-center">
                                    <span className="text-slate-500 font-medium">{plat.name}</span>
                                    {status === 'available' ? (
                                      <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                                        Available <CheckCircle size={12} />
                                      </span>
                                    ) : status === 'taken' ? (
                                      <span className="text-slate-400 font-medium flex items-center gap-1">
                                        Taken <XCircle size={12} />
                                      </span>
                                    ) : (
                                      <span className="text-red-500 dark:text-red-400 font-medium flex items-center gap-1">
                                        Invalid <ShieldAlert size={12} />
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          FAVORITES MANAGEMENT ROW / DRAWER
          ──────────────────────────────────────────────────────── */}
      {favorites.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={20} /> Saved Favorites ({favorites.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={copyAllFavorites}
                className="py-1.5 px-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                {copiedName === 'favorites_all' ? (
                  <>Copied <Check size={12} className="text-green-500" /></>
                ) : (
                  <>Copy All <Copy size={12} /></>
                )}
              </button>
              <button
                onClick={() => saveFavsToLocalStorage([])}
                className="py-1.5 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-400 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                Clear All <Trash2 size={12} />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {favorites.map((fav, favIdx) => (
              <div
                key={favIdx}
                className="flex items-center gap-2 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-xs text-sm font-semibold font-mono"
              >
                <span>{fav}</span>
                <button
                  onClick={() => copyToClipboard(fav)}
                  className="text-slate-400 hover:text-[#518231] transition-colors ml-1"
                >
                  {copiedName === fav ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                </button>
                <button
                  onClick={() => toggleFavorite(fav)}
                  className="text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
