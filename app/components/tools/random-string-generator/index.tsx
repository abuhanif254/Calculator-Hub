"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles, ShieldCheck, Heart, Copy, Check, Download, RotateCcw,
  Search, ShieldAlert, BadgeInfo, Settings, ListFilter, Trash2,
  ChevronDown, ChevronUp, Star, CheckCircle, Info, Cpu
} from 'lucide-react';

interface GeneratorSettings {
  mode: 'character' | 'pattern' | 'preset';
  preset: 'api-token' | 'jwt-secret' | 'db-id' | 'password' | 'invite-code' | 'coupon-code' | 'session-token' | 'gaming-code';
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
  excludeRepeated: boolean;
  customChars: string;
  removeChars: string;
  pattern: string;
  count: number;
  preventDuplicates: boolean;
}

interface ScoreDetails {
  entropyBits: number;
  complexity: 'Low' | 'Medium' | 'High' | 'Cryptographic';
  strengthPercent: number; // 0 to 100
  poolSize: number;
}

interface StringItem {
  value: string;
  entropy: ScoreDetails;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>?/";
const AMBIGUOUS = ["O", "0", "I", "l", "1", "8"];

// Secure CSPRNG Fallback
const getRandomValues = (array: Uint32Array): Uint32Array => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    return window.crypto.getRandomValues(array);
  }
  // Fallback for SSR/Pre-render static pages phase
  for (let i = 0; i < array.length; i++) {
    array[i] = Math.floor(Math.random() * 4294967296);
  }
  return array;
};

const pickSecureChar = (pool: string[]): string => {
  if (pool.length === 0) return '';
  const randArr = new Uint32Array(1);
  getRandomValues(randArr);
  const index = randArr[0] % pool.length;
  return pool[index];
};

export function RandomStringGeneratorTool() {
  // --- State Configuration ---
  const [settings, setSettings] = useState<GeneratorSettings>({
    mode: 'character',
    preset: 'api-token',
    length: 32,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
    excludeAmbiguous: false,
    excludeRepeated: false,
    customChars: '',
    removeChars: '',
    pattern: 'DEV-XXXX-####-****',
    count: 10,
    preventDuplicates: true
  });

  const [generatedStrings, setGeneratedStrings] = useState<StringItem[]>([]);
  const [loading, setLoading] = useState(false);

  // --- Filtering / Searching ---
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'alphabetical' | 'entropy' | 'length'>('default');
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // --- Favorites & Caches ---
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  // --- Load localStorage Data ---
  useEffect(() => {
    const savedFavs = localStorage.getItem('random_string_favorites');
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) {}
    }
    const savedHistory = localStorage.getItem('random_string_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
    }
    handleGenerate();
  }, []);

  const saveFavorites = (newFavs: string[]) => {
    setFavorites(newFavs);
    localStorage.setItem('random_string_favorites', JSON.stringify(newFavs));
  };

  const toggleFavorite = (val: string) => {
    const isFav = favorites.includes(val);
    const updated = isFav ? favorites.filter(f => f !== val) : [...favorites, val];
    saveFavorites(updated);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const copyAll = (format: 'txt' | 'json' | 'csv') => {
    const values = generatedStrings.map(s => s.value);
    let out = "";
    if (format === 'txt') {
      out = values.join('\n');
    } else if (format === 'json') {
      out = JSON.stringify(values, null, 2);
    } else if (format === 'csv') {
      out = values.map(v => `"${v}"`).join(',');
    }
    copyToClipboard(out);
  };

  // --- File Exporter ---
  const handleExport = (format: 'txt' | 'csv' | 'json') => {
    let content = "";
    const filename = `random-strings-${new Date().toISOString().slice(0, 10)}.${format}`;
    const values = generatedStrings.map(s => s.value);

    if (format === 'txt') {
      content = values.join('\n');
    } else if (format === 'csv') {
      content = 'Index,Random String,Entropy Bits,Complexity\n' +
        generatedStrings.map((s, idx) => `${idx + 1},"${s.value}",${s.entropy.entropyBits},${s.entropy.complexity}`).join('\n');
    } else if (format === 'json') {
      content = JSON.stringify(generatedStrings, null, 2);
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

  // --- Entropy Math Math Engine ---
  const calculateEntropy = (length: number, poolSize: number): ScoreDetails => {
    if (poolSize <= 0 || length <= 0) {
      return { entropyBits: 0, complexity: 'Low', strengthPercent: 0, poolSize: 0 };
    }
    const entropyBits = Math.round(length * Math.log2(poolSize));
    let complexity: 'Low' | 'Medium' | 'High' | 'Cryptographic' = 'Low';
    let strengthPercent = Math.min(Math.round((entropyBits / 128) * 100), 100);

    if (entropyBits >= 128) {
      complexity = 'Cryptographic';
    } else if (entropyBits >= 75) {
      complexity = 'High';
    } else if (entropyBits >= 45) {
      complexity = 'Medium';
    }

    return { entropyBits, complexity, strengthPercent, poolSize };
  };

  // --- Build Pool Size for Caching ---
  const computePoolSize = (currSettings: GeneratorSettings): number => {
    let pool = "";
    if (currSettings.includeUppercase) pool += UPPERCASE;
    if (currSettings.includeLowercase) pool += LOWERCASE;
    if (currSettings.includeNumbers) pool += NUMBERS;
    if (currSettings.includeSymbols) pool += SYMBOLS;
    if (currSettings.customChars) pool += currSettings.customChars;

    let poolArray = pool.split("");
    if (currSettings.removeChars) {
      const toRemove = currSettings.removeChars.split("");
      poolArray = poolArray.filter(c => !toRemove.includes(c));
    }
    if (currSettings.excludeAmbiguous) {
      poolArray = poolArray.filter(c => !AMBIGUOUS.includes(c));
    }
    return new Set(poolArray).size;
  };

  // --- Generate Generator logic ---
  const generateString = (currSettings: GeneratorSettings, poolSize: number): string => {
    if (currSettings.mode === 'pattern') {
      let result = "";
      const pickFromPool = (poolStr: string) => {
        let arr = poolStr.split("");
        if (currSettings.excludeAmbiguous) {
          arr = arr.filter(c => !AMBIGUOUS.includes(c));
        }
        return pickSecureChar(arr);
      };

      for (let i = 0; i < currSettings.pattern.length; i++) {
        const char = currSettings.pattern[i];
        if (char === 'X' || char === 'U') {
          result += pickFromPool(UPPERCASE);
        } else if (char === 'x' || char === 'L') {
          result += pickFromPool(LOWERCASE);
        } else if (char === '9' || char === '#' || char === 'N') {
          result += pickFromPool(NUMBERS);
        } else if (char === 'S') {
          result += pickFromPool(SYMBOLS);
        } else if (char === '*') {
          result += pickFromPool(UPPERCASE + LOWERCASE + NUMBERS);
        } else {
          result += char;
        }
      }
      return result;
    }

    // Standard character pool generation
    let pool = "";
    if (currSettings.includeUppercase) pool += UPPERCASE;
    if (currSettings.includeLowercase) pool += LOWERCASE;
    if (currSettings.includeNumbers) pool += NUMBERS;
    if (currSettings.includeSymbols) pool += SYMBOLS;
    if (currSettings.customChars) pool += currSettings.customChars;

    let poolArray = pool.split("");
    if (currSettings.removeChars) {
      const toRemove = currSettings.removeChars.split("");
      poolArray = poolArray.filter(c => !toRemove.includes(c));
    }
    if (currSettings.excludeAmbiguous) {
      poolArray = poolArray.filter(c => !AMBIGUOUS.includes(c));
    }

    // Deduplicate
    poolArray = Array.from(new Set(poolArray));

    if (poolArray.length === 0) return "Configuration pool is empty!";

    let result = "";
    const usedChars = new Set<string>();

    for (let i = 0; i < currSettings.length; i++) {
      let availableChars = [...poolArray];
      if (currSettings.excludeRepeated) {
        availableChars = availableChars.filter(c => !usedChars.has(c));
      }
      if (availableChars.length === 0) break; // pool exhausted

      const char = pickSecureChar(availableChars);
      result += char;
      if (currSettings.excludeRepeated) {
        usedChars.add(char);
      }
    }

    return result;
  };

  const handleGenerate = (customSettings?: GeneratorSettings) => {
    setLoading(true);
    const activeSettings = customSettings || settings;

    setTimeout(() => {
      const results: StringItem[] = [];
      const set = new Set<string>();
      const poolSize = computePoolSize(activeSettings);
      let attempts = 0;

      const targetCount = activeSettings.count;
      while (set.size < targetCount && attempts < targetCount * 10) {
        attempts++;
        const val = generateString(activeSettings, poolSize);
        if (val) {
          set.add(val);
        }
      }

      set.forEach(value => {
        const entropy = calculateEntropy(value.length, poolSize);
        results.push({ value, entropy });
      });

      setGeneratedStrings(results);
      setLoading(false);

      // Save log index configuration key for history logs
      const confSummary = `${activeSettings.mode === 'pattern' ? 'Pattern: ' + activeSettings.pattern : 'Len: ' + activeSettings.length + ' (' + poolSize + ' pool)'}`;
      if (!history.includes(confSummary)) {
        const nextHistory = [confSummary, ...history].slice(0, 10);
        setHistory(nextHistory);
        localStorage.setItem('random_string_history', JSON.stringify(nextHistory));
      }
    }, 300);
  };

  // --- Apply Preset configs ---
  const handleApplyPreset = (presetKey: GeneratorSettings['preset']) => {
    let updated: GeneratorSettings = {
      ...settings,
      mode: 'character',
      preset: presetKey
    };

    if (presetKey === 'api-token') {
      updated.length = 32;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = false;
    } else if (presetKey === 'jwt-secret') {
      updated.length = 64;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = true;
    } else if (presetKey === 'db-id') {
      updated.length = 16;
      updated.includeUppercase = false;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = false;
    } else if (presetKey === 'password') {
      updated.length = 20;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = true;
      updated.excludeAmbiguous = true;
    } else if (presetKey === 'invite-code') {
      updated.mode = 'pattern';
      updated.pattern = 'XXXX-XXXX';
      updated.excludeAmbiguous = true;
    } else if (presetKey === 'coupon-code') {
      updated.mode = 'pattern';
      updated.pattern = 'PROMO-XXXX-2026';
      updated.excludeAmbiguous = true;
    } else if (presetKey === 'session-token') {
      updated.length = 48;
      updated.includeUppercase = false;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = false;
      updated.customChars = 'abcdef'; // Hex limit
    } else if (presetKey === 'gaming-code') {
      updated.mode = 'pattern';
      updated.pattern = 'XXXX-XXXX-XXXX-XXXX';
    }

    setSettings(updated);
    handleGenerate(updated);
  };

  // --- Sorting & Filtering ---
  const processedStrings = useMemo(() => {
    let result = [...generatedStrings];
    if (searchTerm) {
      result = result.filter(s => s.value.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (sortOrder === 'alphabetical') {
      result.sort((a, b) => a.value.localeCompare(b.value));
    } else if (sortOrder === 'entropy') {
      result.sort((a, b) => b.entropy.entropyBits - a.entropy.entropyBits);
    } else if (sortOrder === 'length') {
      result.sort((a, b) => a.value.length - b.value.length);
    }
    return result;
  }, [generatedStrings, searchTerm, sortOrder]);

  return (
    <div className="w-full flex flex-col gap-8 text-slate-800 dark:text-slate-100 font-sans">
      
      {/* PRESETS BUTTONS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {[
          { key: 'api-token', label: 'API Key 🔑' },
          { key: 'jwt-secret', label: 'JWT Secret 🔒' },
          { key: 'db-id', label: 'Database ID 💾' },
          { key: 'password', label: 'Password 🛡️' },
          { key: 'invite-code', label: 'Invite Code 🎟️' },
          { key: 'coupon-code', label: 'Coupon Code 🏷️' },
          { key: 'session-token', label: 'Hex Hash 🚀' },
          { key: 'gaming-code', label: 'Game Tag 🕹️' }
        ].map((p) => (
          <button
            key={p.key}
            onClick={() => handleApplyPreset(p.key as any)}
            className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all shadow-xs ${
              settings.preset === p.key && settings.mode === 'character'
                ? 'bg-[#518231] border-[#518231] text-white'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-[#518231] hover:shadow-xs'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT PANEL: Inputs & Toggles */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Settings className="text-[#518231]" size={20} /> Settings
            </h3>

            {/* Generator Mode Selector */}
            <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl gap-2 border border-slate-100 dark:border-slate-850">
              <button
                onClick={() => setSettings({ ...settings, mode: 'character' })}
                className={`w-1/2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  settings.mode === 'character' ? 'bg-[#518231] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Char Pool
              </button>
              <button
                onClick={() => setSettings({ ...settings, mode: 'pattern' })}
                className={`w-1/2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  settings.mode === 'pattern' ? 'bg-[#518231] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Mask Pattern
              </button>
            </div>

            {/* Character Pool Customization */}
            {settings.mode === 'character' ? (
              <div className="space-y-4">
                
                {/* Length Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <label>String Length</label>
                    <span className="text-[#518231] font-bold font-mono">{settings.length} chars</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="128"
                    value={settings.length}
                    onChange={(e) => setSettings({ ...settings, length: Number(e.target.value) })}
                    className="w-full accent-[#518231]"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-2.5 pt-2 border-t border-slate-50 dark:border-slate-850">
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={settings.includeUppercase}
                      onChange={(e) => setSettings({ ...settings, includeUppercase: e.target.checked })}
                      className="rounded accent-[#518231] w-4.5 h-4.5"
                    />
                    Include Uppercase (A-Z)
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={settings.includeLowercase}
                      onChange={(e) => setSettings({ ...settings, includeLowercase: e.target.checked })}
                      className="rounded accent-[#518231] w-4.5 h-4.5"
                    />
                    Include Lowercase (a-z)
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={settings.includeNumbers}
                      onChange={(e) => setSettings({ ...settings, includeNumbers: e.target.checked })}
                      className="rounded accent-[#518231] w-4.5 h-4.5"
                    />
                    Include Numbers (0-9)
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={settings.includeSymbols}
                      onChange={(e) => setSettings({ ...settings, includeSymbols: e.target.checked })}
                      className="rounded accent-[#518231] w-4.5 h-4.5"
                    />
                    Include Symbols (!@#$...)
                  </label>
                </div>
              </div>
            ) : (
              // Pattern Mode Config
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Custom Pattern Mask</label>
                  <input
                    type="text"
                    value={settings.pattern}
                    onChange={(e) => setSettings({ ...settings, pattern: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm font-mono"
                  />
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850 text-xs space-y-2">
                  <div className="font-bold text-slate-500 uppercase flex items-center gap-1"><Info size={12} /> Pattern Legend</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div><b className="text-[#518231]">X</b> or <b className="text-[#518231]">U</b> : Uppercase</div>
                    <div><b className="text-[#518231]">x</b> or <b className="text-[#518231]">L</b> : Lowercase</div>
                    <div><b className="text-[#518231]">9</b> or <b className="text-[#518231]">#</b> : Numbers</div>
                    <div><b className="text-[#518231]">S</b> : Special Symbols</div>
                    <div><b className="text-[#518231]">*</b> : Alphanumeric</div>
                    <div className="col-span-2 text-slate-400 italic">Other chars are output as literals.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced accordion toggle */}
            <button
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="w-full flex items-center justify-between text-sm font-semibold text-[#518231] border-t border-slate-100 dark:border-slate-800 pt-4"
            >
              <span>{advancedOpen ? "Hide Advanced Filters" : "Show Advanced Filters"}</span>
              {advancedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {advancedOpen && (
              <div className="space-y-4 pt-2 border-t border-slate-50 dark:border-slate-850 text-xs">
                
                {/* Ambiguous characters exclusion */}
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={settings.excludeAmbiguous}
                    onChange={(e) => setSettings({ ...settings, excludeAmbiguous: e.target.checked })}
                    className="rounded accent-[#518231] w-4 h-4"
                  />
                  Exclude Ambiguous (e.g. O, 0, I, l, 1)
                </label>

                {/* Exclude Repeated characters */}
                {settings.mode === 'character' && (
                  <label className="flex items-center gap-2 cursor-pointer font-semibold">
                    <input
                      type="checkbox"
                      checked={settings.excludeRepeated}
                      onChange={(e) => setSettings({ ...settings, excludeRepeated: e.target.checked })}
                      className="rounded accent-[#518231] w-4 h-4"
                    />
                    Avoid Repeating Characters
                  </label>
                )}

                {/* Custom characters additions */}
                {settings.mode === 'character' && (
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-500">Inject Custom Characters</label>
                    <input
                      type="text"
                      value={settings.customChars}
                      onChange={(e) => setSettings({ ...settings, customChars: e.target.value })}
                      placeholder="e.g. ABCXYZ"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                    />
                  </div>
                )}

                {/* Remove characters */}
                {settings.mode === 'character' && (
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-500">Remove Specific Characters</label>
                    <input
                      type="text"
                      value={settings.removeChars}
                      onChange={(e) => setSettings({ ...settings, removeChars: e.target.value })}
                      placeholder="e.g. a, b, c"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Bulk size count selector */}
            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Count Bulk</label>
              <select
                value={settings.count}
                onChange={(e) => setSettings({ ...settings, count: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm"
              >
                <option value="1">Generate 1 String</option>
                <option value="10">Generate 10 Strings</option>
                <option value="50">Generate 50 Strings</option>
                <option value="250">Generate 250 Strings</option>
                <option value="1000">Generate 1000 Strings</option>
              </select>
            </div>

            {/* Generate Trigger */}
            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className="w-full py-3 bg-[#518231] hover:bg-[#436e29] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              <Sparkles size={18} />
              {loading ? "Computing CSPRNG Pool..." : "Generate Strings"}
            </button>
          </div>

          {/* History configurations */}
          {history.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
              <h4 className="text-sm font-bold flex items-center gap-2 text-slate-400">
                <RotateCcw size={16} /> Config History
              </h4>
              <div className="flex flex-col gap-2">
                {history.map((histConf, idx) => (
                  <div key={idx} className="text-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-2 rounded-lg font-mono flex justify-between items-center">
                    <span>{histConf}</span>
                    <CheckCircle size={12} className="text-[#518231]" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Generated Strings lists */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6 min-h-[500px]">
            
            {/* Toolbar filter */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              
              {/* Search filter */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter strings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none text-sm font-mono"
                />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              </div>

              {/* Sorting toolbar */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <ListFilter size={16} className="text-slate-400" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold focus:outline-none"
                >
                  <option value="default">Default Order</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="entropy">Highest Entropy</option>
                  <option value="length">Length</option>
                </select>

                {/* Exporter menu selection */}
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      if (e.target.value.startsWith('copy-')) {
                        copyAll(e.target.value.replace('copy-', '') as any);
                      } else {
                        handleExport(e.target.value as any);
                      }
                      e.target.value = "";
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold focus:outline-none cursor-pointer text-[#518231]"
                >
                  <option value="">Bulk Actions</option>
                  <option value="copy-txt">Copy list (Text)</option>
                  <option value="copy-json">Copy JSON Array</option>
                  <option value="copy-csv">Copy CSV String</option>
                  <option value="txt">Download Text (.txt)</option>
                  <option value="csv">Download CSV (.csv)</option>
                  <option value="json">Download JSON (.json)</option>
                </select>
              </div>
            </div>

            {/* List entries */}
            {loading ? (
              <div className="flex-1 flex flex-col justify-center items-center py-20 gap-4">
                <div className="w-10 h-10 border-4 border-[#518231]/30 border-t-[#518231] rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-slate-400">Computing CSPRNG secure arrays...</p>
              </div>
            ) : processedStrings.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center py-20 text-center gap-2">
                <ShieldAlert className="text-slate-300 dark:text-slate-700" size={48} />
                <p className="text-sm font-bold text-slate-500">No generated outputs found.</p>
                <p className="text-xs text-slate-400">Apply presets or configure character rules, then click generate.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-1">
                {processedStrings.map((item, index) => {
                  const isFav = favorites.includes(item.value);
                  const strengthColor = item.entropy.complexity === 'Cryptographic' ? 'text-green-600 dark:text-green-400'
                                      : item.entropy.complexity === 'High' ? 'text-blue-500'
                                      : item.entropy.complexity === 'Medium' ? 'text-amber-500'
                                      : 'text-red-500';

                  return (
                    <div
                      key={index}
                      className="border border-slate-100 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-900/40 p-4 rounded-xl flex justify-between items-center transition-all hover:border-slate-350 dark:hover:border-slate-700"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="text-sm font-mono font-semibold break-all text-slate-900 dark:text-white select-all">{item.value}</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 items-center mt-2 text-[10px] text-slate-400 font-semibold uppercase">
                          <span>Length: <b className="text-slate-600 dark:text-slate-300 font-mono">{item.value.length}</b></span>
                          <span>Pool Size: <b className="text-slate-600 dark:text-slate-300 font-mono">{item.entropy.poolSize}</b></span>
                          <span>Entropy: <b className="text-slate-600 dark:text-slate-300 font-mono">{item.entropy.entropyBits} bits</b></span>
                          <span className="flex items-center gap-1 font-bold">
                            Complexity: <span className={strengthColor}>{item.entropy.complexity}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        {/* Copy button */}
                        <button
                          onClick={() => copyToClipboard(item.value)}
                          className="p-2 rounded-lg text-slate-400 hover:text-[#518231] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Copy to Clipboard"
                        >
                          {copiedValue === item.value ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                        
                        {/* Star button */}
                        <button
                          onClick={() => toggleFavorite(item.value)}
                          className={`p-2 rounded-lg transition-colors ${
                            isFav ? 'text-amber-500 hover:text-amber-600' : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                          title="Add to Favorites"
                        >
                          <Star size={16} fill={isFav ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAVORITES BAR */}
      {favorites.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={20} /> Saved Favorites ({favorites.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(favorites.join('\n'));
                  setCopiedValue('fav-all');
                  setTimeout(() => setCopiedValue(null), 2000);
                }}
                className="py-1.5 px-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                {copiedValue === 'fav-all' ? <>Copied <Check size={12} className="text-green-500" /></> : <>Copy All <Copy size={12} /></>}
              </button>
              <button
                onClick={() => saveFavorites([])}
                className="py-1.5 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-400 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                Clear All <Trash2 size={12} />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {favorites.map((fav, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-xs text-sm font-semibold font-mono"
              >
                <span>{fav}</span>
                <button
                  onClick={() => copyToClipboard(fav)}
                  className="text-slate-400 hover:text-[#518231] transition-colors ml-1"
                >
                  {copiedValue === fav ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
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
