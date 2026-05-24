"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles, ShieldCheck, Heart, Copy, Check, Download, RotateCcw,
  Search, ShieldAlert, BadgeInfo, Settings, ListFilter, Trash2,
  ChevronDown, ChevronUp, Star, CheckCircle, XCircle, Info, Lock, Eye, EyeOff
} from 'lucide-react';

interface PasswordSettings {
  mode: 'random' | 'passphrase' | 'pin';
  preset: 'standard' | 'enterprise' | 'banking' | 'wifi' | 'db' | 'admin' | 'government' | 'developer';
  length: number;
  wordCount: number;
  wordSeparator: string;
  wordCasing: 'lowercase' | 'uppercase' | 'title';
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
  excludeRepeated: boolean;
  customSymbols: string;
  removeChars: string;
  count: number;
}

interface ScoreDetails {
  entropyBits: number;
  complexity: 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Cryptographic';
  crackTimeStr: string;
  strengthPercent: number; // 0 to 100
  warnings: string[];
  recommendations: string[];
}

interface PasswordItem {
  value: string;
  scores: ScoreDetails;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>?/";
const AMBIGUOUS = ["O", "0", "I", "l", "1", "8"];

// Offline Wordlist for XKCD Diceware Passphrase (100 secure, common words)
const DICTIONARY = [
  "apple", "banana", "rocket", "sunset", "window", "gravity", "shadow", "cyber", "quantum", "stellar",
  "silent", "toxic", "rogue", "retro", "atomic", "crystal", "omega", "alpha", "ghost", "wild",
  "frozen", "flaming", "dark", "golden", "pixel", "digital", "analog", "hybrid", "sonic", "vortex",
  "rapid", "smooth", "bold", "epic", "legendary", "mystic", "obsidian", "spectral", "lunar", "solar",
  "nebula", "plasma", "cryptic", "urban", "dynamic", "infinite", "blaze", "storm", "thunder", "knight",
  "wizard", "dragon", "falcon", "viper", "wolf", "panther", "tiger", "cobra", "rebel", "nomad",
  "seeker", "maker", "crafter", "builder", "pilot", "captain", "scout", "agent", "spark", "fury",
  "wind", "dust", "ash", "ember", "wave", "pulse", "echo", "mirage", "specter", "reaper",
  "forest", "river", "mountain", "ocean", "valley", "canyon", "desert", "jungle", "oasis", "summit",
  "beacon", "anchor", "compass", "shield", "sword", "armor", "helmet", "crown", "relic", "mirror"
];

// Secure Random Generator Fallback for SSR/Static Pre-render
const getRandomValues = (array: Uint32Array): Uint32Array => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    return window.crypto.getRandomValues(array);
  }
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

export function StrongPasswordGeneratorTool() {
  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState<'generator' | 'checker'>('generator');

  // --- Generator Config State ---
  const [settings, setSettings] = useState<PasswordSettings>({
    mode: 'random',
    preset: 'standard',
    length: 16,
    wordCount: 4,
    wordSeparator: '-',
    wordCasing: 'lowercase',
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeAmbiguous: false,
    excludeRepeated: false,
    customSymbols: '',
    removeChars: '',
    count: 10
  });

  const [generatedList, setGeneratedList] = useState<PasswordItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // --- Password Checker State ---
  const [checkValue, setCheckValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --- Favorites & Local Storage Cache ---
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  // --- Load localStorage data ---
  useEffect(() => {
    const savedFavs = localStorage.getItem('strong_password_favorites');
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) {}
    }
    const savedHistory = localStorage.getItem('strong_password_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
    }
    handleGenerate();
  }, []);

  const saveFavorites = (newFavs: string[]) => {
    setFavorites(newFavs);
    localStorage.setItem('strong_password_favorites', JSON.stringify(newFavs));
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

  // --- File Exporter ---
  const handleExport = (format: 'txt' | 'csv' | 'json') => {
    let content = "";
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `strong-passwords-${dateStr}.${format}`;
    const values = generatedList.map(p => p.value);

    if (format === 'txt') {
      content = values.join('\n');
    } else if (format === 'csv') {
      content = 'Password,Entropy Bits,Complexity,Estimated Crack Time\n' +
        generatedList.map(p => `"${p.value}",${p.scores.entropyBits},${p.scores.complexity},"${p.scores.crackTimeStr}"`).join('\n');
    } else if (format === 'json') {
      content = JSON.stringify(generatedList, null, 2);
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

  // --- Password Strength Evaluator Math Engine ---
  const evaluatePasswordStrength = (pwd: string): ScoreDetails => {
    const warnings: string[] = [];
    const recommendations: string[] = [];
    
    if (!pwd) {
      return { entropyBits: 0, complexity: 'Very Weak', crackTimeStr: '0 seconds', strengthPercent: 0, warnings: [], recommendations: [] };
    }

    // Determine character pool size
    let poolSize = 0;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLower) poolSize += LOWERCASE.length;
    if (hasUpper) poolSize += UPPERCASE.length;
    if (hasDigit) poolSize += NUMBERS.length;
    if (hasSymbol) poolSize += SYMBOLS.length;

    // Default to at least 10 if abstract characters are inputted
    if (poolSize === 0) poolSize = 10;

    const entropyBits = Math.round(pwd.length * Math.log2(poolSize));

    // Crack-time calculation
    // Assume consumer-grade cracking cluster (100 billion guesses/second)
    const guessesPerSec = 1e11;
    const totalPossibilities = Math.pow(poolSize, pwd.length);
    const crackTimeSeconds = totalPossibilities / guessesPerSec;

    let crackTimeStr = "Instant";
    if (crackTimeSeconds > 31536000 * 1e9) {
      crackTimeStr = "Trillions of years";
    } else if (crackTimeSeconds > 31536000 * 1000) {
      crackTimeStr = `${Math.round(crackTimeSeconds / (31536000 * 1000))} Thousand Years`;
    } else if (crackTimeSeconds > 31536000) {
      crackTimeStr = `${Math.round(crackTimeSeconds / 31536000)} Years`;
    } else if (crackTimeSeconds > 86400) {
      crackTimeStr = `${Math.round(crackTimeSeconds / 86400)} Days`;
    } else if (crackTimeSeconds > 3600) {
      crackTimeStr = `${Math.round(crackTimeSeconds / 3600)} Hours`;
    } else if (crackTimeSeconds > 60) {
      crackTimeStr = `${Math.round(crackTimeSeconds / 60)} Mins`;
    } else if (crackTimeSeconds > 0) {
      crackTimeStr = `${Math.round(crackTimeSeconds)} Secs`;
    }

    // Warnings and rules
    if (pwd.length < 8) {
      warnings.push("Password length is too short.");
      recommendations.push("Increase length to at least 14-16 characters.");
    }
    if (!hasDigit) {
      recommendations.push("Inject numeric digits to increase entropy.");
    }
    if (!hasSymbol) {
      recommendations.push("Inject special symbols to increase pool diversity.");
    }
    if (!hasUpper || !hasLower) {
      recommendations.push("Blend uppercase and lowercase letters.");
    }

    // Repetitions check
    if (/(.)\1\1/.test(pwd)) {
      warnings.push("Contains three or more repeating characters.");
      recommendations.push("Avoid consecutive repeating characters (e.g., 'aaa').");
    }

    // Keyboard walk walk check
    const keyboardWalks = ["qwerty", "asdfgh", "123456", "zxcvbn", "qazwsx"];
    keyboardWalks.forEach(walk => {
      if (pwd.toLowerCase().includes(walk)) {
        warnings.push(`Contains predictable keyboard walk pattern ('${walk}').`);
        recommendations.push("Avoid sequential keys on the keyboard.");
      }
    });

    let complexity: ScoreDetails['complexity'] = 'Very Weak';
    let strengthPercent = Math.min(Math.round((entropyBits / 100) * 100), 100);

    if (entropyBits >= 85) {
      complexity = 'Cryptographic';
    } else if (entropyBits >= 65) {
      complexity = 'Strong';
    } else if (entropyBits >= 45) {
      complexity = 'Medium';
    } else if (entropyBits >= 28) {
      complexity = 'Weak';
    }

    return { entropyBits, complexity, crackTimeStr, strengthPercent, warnings, recommendations };
  };

  // --- Main password generator engine ---
  const generateSinglePassword = (currSettings: PasswordSettings): string => {
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // 1) DICWARE PASSPHRASE MODE
    if (currSettings.mode === 'passphrase') {
      const words: string[] = [];
      for (let i = 0; i < currSettings.wordCount; i++) {
        let w = pick(DICTIONARY);
        if (currSettings.wordCasing === 'uppercase') {
          w = w.toUpperCase();
        } else if (currSettings.wordCasing === 'title') {
          w = w.charAt(0).toUpperCase() + w.slice(1);
        }
        words.push(w);
      }
      return words.join(currSettings.wordSeparator);
    }

    // 2) PIN MODE
    if (currSettings.mode === 'pin') {
      let pin = "";
      for (let i = 0; i < currSettings.length; i++) {
        pin += pick(NUMBERS.split(""));
      }
      return pin;
    }

    // 3) STANDARD RANDOM CHARACTER MODE
    let pool = "";
    if (currSettings.includeUppercase) pool += UPPERCASE;
    if (currSettings.includeLowercase) pool += LOWERCASE;
    if (currSettings.includeNumbers) pool += NUMBERS;
    if (currSettings.includeSymbols) pool += SYMBOLS;
    if (currSettings.customSymbols) pool += currSettings.customSymbols;

    let poolArray = pool.split("");
    if (currSettings.removeChars) {
      const toRemove = currSettings.removeChars.split("");
      poolArray = poolArray.filter(c => !toRemove.includes(c));
    }
    if (currSettings.excludeAmbiguous) {
      poolArray = poolArray.filter(c => !AMBIGUOUS.includes(c));
    }

    poolArray = Array.from(new Set(poolArray));

    if (poolArray.length === 0) return "Pool is empty!";

    let result = "";
    const usedChars = new Set<string>();

    for (let i = 0; i < currSettings.length; i++) {
      let availableChars = [...poolArray];
      if (currSettings.excludeRepeated) {
        availableChars = availableChars.filter(c => !usedChars.has(c));
      }
      if (availableChars.length === 0) break;

      const char = pickSecureChar(availableChars);
      result += char;
      if (currSettings.excludeRepeated) {
        usedChars.add(char);
      }
    }

    return result;
  };

  const handleGenerate = (customSettings?: PasswordSettings) => {
    setLoading(true);
    const activeSettings = customSettings || settings;

    setTimeout(() => {
      const results: PasswordItem[] = [];
      const set = new Set<string>();
      let attempts = 0;

      while (set.size < activeSettings.count && attempts < activeSettings.count * 10) {
        attempts++;
        const val = generateSinglePassword(activeSettings);
        if (val) {
          set.add(val);
        }
      }

      set.forEach(value => {
        const scores = evaluatePasswordStrength(value);
        results.push({ value, scores });
      });

      setGeneratedList(results);
      setLoading(false);

      // Save to history config key
      const summary = `${activeSettings.mode === 'passphrase' ? 'Passphrase: ' + activeSettings.wordCount + ' words' : 'Length: ' + activeSettings.length}`;
      if (!history.includes(summary)) {
        const nextHistory = [summary, ...history].slice(0, 10);
        setHistory(nextHistory);
        localStorage.setItem('strong_password_history', JSON.stringify(nextHistory));
      }
    }, 300);
  };

  // --- Preset loading ---
  const handleApplyPreset = (preset: PasswordSettings['preset']) => {
    let updated: PasswordSettings = {
      ...settings,
      mode: 'random',
      preset
    };

    if (preset === 'standard') {
      updated.length = 16;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = true;
    } else if (preset === 'enterprise') {
      updated.length = 20;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = true;
      updated.excludeRepeated = true;
    } else if (preset === 'banking') {
      updated.length = 12;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = false;
      updated.excludeAmbiguous = true;
    } else if (preset === 'wifi') {
      updated.length = 16;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = false;
      updated.excludeAmbiguous = true;
    } else if (preset === 'db') {
      updated.length = 32;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = false;
    } else if (preset === 'admin') {
      updated.length = 24;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = true;
    } else if (preset === 'government') {
      updated.length = 32;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = true;
      updated.excludeAmbiguous = true;
    } else if (preset === 'developer') {
      updated.length = 64;
      updated.includeUppercase = true;
      updated.includeLowercase = true;
      updated.includeNumbers = true;
      updated.includeSymbols = true;
    }

    setSettings(updated);
    handleGenerate(updated);
  };

  // --- Password Checker Analysis ---
  const checkerScores = useMemo(() => {
    return evaluatePasswordStrength(checkValue);
  }, [checkValue]);

  return (
    <div className="w-full flex flex-col gap-8 text-slate-800 dark:text-slate-100 font-sans">
      
      {/* TABS SELECTOR */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 pb-1 gap-6">
        <button
          onClick={() => setActiveTab('generator')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'generator' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Password Generator ⚙️
        </button>
        <button
          onClick={() => setActiveTab('checker')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'checker' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Offline Password Checker 🛡️
        </button>
      </div>

      {activeTab === 'generator' ? (
        // ==========================================
        // GENERATOR VIEW
        // ==========================================
        <div className="space-y-6 animate-fade-in">
          
          {/* Preset templates Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {[
              { key: 'standard', label: 'Standard 🛡️' },
              { key: 'enterprise', label: 'Enterprise 🏦' },
              { key: 'banking', label: 'Banking 💳' },
              { key: 'wifi', label: 'WiFi Key 📶' },
              { key: 'db', label: 'Database 💾' },
              { key: 'admin', label: 'Admin Key 🔑' },
              { key: 'government', label: 'Gov-Grade 🏛️' },
              { key: 'developer', label: 'Dev Secret 💻' }
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => handleApplyPreset(p.key as any)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all shadow-xs ${
                  settings.preset === p.key && settings.mode === 'random'
                    ? 'bg-[#518231] border-[#518231] text-white'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-[#518231] hover:shadow-xs'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <Settings className="text-[#518231]" size={20} /> Parameters
                </h3>

                {/* Generator Mode Toggles */}
                <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl gap-2 border border-slate-150 dark:border-slate-850">
                  {['random', 'passphrase', 'pin'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSettings({ ...settings, mode: m as any })}
                      className={`w-1/3 py-2 px-2 rounded-lg text-[11px] font-bold transition-all uppercase ${
                        settings.mode === m ? 'bg-[#518231] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {m === 'random' ? 'Symbols' : m === 'passphrase' ? 'Diceware' : 'PIN Code'}
                    </button>
                  ))}
                </div>

                {/* Dynamic sliders based on Mode */}
                {settings.mode === 'random' || settings.mode === 'pin' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <label>Character Length</label>
                      <span className="text-[#518231] font-bold font-mono">{settings.length} chars</span>
                    </div>
                    <input
                      type="range"
                      min={settings.mode === 'pin' ? "4" : "6"}
                      max="128"
                      value={settings.length}
                      onChange={(e) => setSettings({ ...settings, length: Number(e.target.value) })}
                      className="w-full accent-[#518231]"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <label>Number of Words</label>
                      <span className="text-[#518231] font-bold font-mono">{settings.wordCount} words</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="12"
                      value={settings.wordCount}
                      onChange={(e) => setSettings({ ...settings, wordCount: Number(e.target.value) })}
                      className="w-full accent-[#518231]"
                    />
                  </div>
                )}

                {/* Standard char pool selection */}
                {settings.mode === 'random' && (
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
                )}

                {/* Passphrase settings */}
                {settings.mode === 'passphrase' && (
                  <div className="space-y-4 pt-2 border-t border-slate-50 dark:border-slate-850">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Separator</label>
                      <input
                        type="text"
                        value={settings.wordSeparator}
                        onChange={(e) => setSettings({ ...settings, wordSeparator: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 focus:outline-none text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Word Casing</label>
                      <select
                        value={settings.wordCasing}
                        onChange={(e) => setSettings({ ...settings, wordCasing: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 focus:outline-none text-xs"
                      >
                        <option value="lowercase">lowercase (e.g. apple-banana)</option>
                        <option value="uppercase">UPPERCASE (e.g. APPLE-BANANA)</option>
                        <option value="title">TitleCase (e.g. Apple-Banana)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Advanced Accoridon toggle */}
                {settings.mode === 'random' && (
                  <>
                    <button
                      onClick={() => setAdvancedOpen(!advancedOpen)}
                      className="w-full flex items-center justify-between text-sm font-semibold text-[#518231] border-t border-slate-100 dark:border-slate-800 pt-4"
                    >
                      <span>{advancedOpen ? "Hide Advanced Options" : "Show Advanced Options"}</span>
                      {advancedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {advancedOpen && (
                      <div className="space-y-4 pt-2 border-t border-slate-50 dark:border-slate-850 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer font-semibold">
                          <input
                            type="checkbox"
                            checked={settings.excludeAmbiguous}
                            onChange={(e) => setSettings({ ...settings, excludeAmbiguous: e.target.checked })}
                            className="rounded accent-[#518231] w-4 h-4"
                          />
                          Exclude Ambiguous (e.g. O, 0, I, l, 1)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer font-semibold">
                          <input
                            type="checkbox"
                            checked={settings.excludeRepeated}
                            onChange={(e) => setSettings({ ...settings, excludeRepeated: e.target.checked })}
                            className="rounded accent-[#518231] w-4 h-4"
                          />
                          Avoid Repeating Characters
                        </label>
                        <div className="space-y-1">
                          <label className="font-semibold text-slate-500">Inject Custom Symbols</label>
                          <input
                            type="text"
                            value={settings.customSymbols}
                            onChange={(e) => setSettings({ ...settings, customSymbols: e.target.value })}
                            placeholder="e.g. #$%_-"
                            className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-slate-500">Remove Specific Characters</label>
                          <input
                            type="text"
                            value={settings.removeChars}
                            onChange={(e) => setSettings({ ...settings, removeChars: e.target.value })}
                            placeholder="e.g. a, b, c"
                            className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Bulk count */}
                <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Generate Bulk Size</label>
                  <select
                    value={settings.count}
                    onChange={(e) => setSettings({ ...settings, count: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm"
                  >
                    <option value="1">Generate 1 Password</option>
                    <option value="10">Generate 10 Passwords</option>
                    <option value="50">Generate 50 Passwords</option>
                    <option value="100">Generate 100 Passwords</option>
                  </select>
                </div>

                <button
                  onClick={() => handleGenerate()}
                  disabled={loading}
                  className="w-full py-3 bg-[#518231] hover:bg-[#436e29] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  <Sparkles size={18} />
                  {loading ? "Calculating Entropy Arrays..." : "Generate Passwords"}
                </button>
              </div>
            </div>

            {/* Password outputs column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6 min-h-[500px]">
                
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <Lock className="text-[#518231]" size={20} /> Generated Credentials
                  </h3>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleExport(e.target.value as any);
                        e.target.value = "";
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold focus:outline-none cursor-pointer text-[#518231]"
                  >
                    <option value="">Export Session</option>
                    <option value="txt">Export Text (.txt)</option>
                    <option value="csv">Export CSV (.csv)</option>
                    <option value="json">Export JSON (.json)</option>
                  </select>
                </div>

                {loading ? (
                  <div className="flex-1 flex flex-col justify-center items-center py-20 gap-4">
                    <div className="w-10 h-10 border-4 border-[#518231]/30 border-t-[#518231] rounded-full animate-spin"></div>
                    <p className="text-sm font-semibold text-slate-400">Pulling entropy from window.crypto...</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1">
                    {generatedList.map((item, index) => {
                      const isFav = favorites.includes(item.value);
                      const complexityColor = item.scores.complexity === 'Cryptographic' ? 'text-green-600 dark:text-green-400'
                                            : item.scores.complexity === 'Strong' ? 'text-blue-500'
                                            : item.scores.complexity === 'Medium' ? 'text-amber-500'
                                            : 'text-red-500';

                      return (
                        <div
                          key={index}
                          className="border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/40 p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all hover:border-slate-350 dark:hover:border-slate-700"
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="text-sm font-mono font-bold break-all text-slate-900 dark:text-white select-all">{item.value}</div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 items-center mt-2 text-[10px] text-slate-400 font-semibold uppercase">
                              <span>Length: <b className="text-slate-600 dark:text-slate-300 font-mono">{item.value.length}</b></span>
                              <span>Entropy: <b className="text-slate-600 dark:text-slate-300 font-mono">{item.scores.entropyBits} bits</b></span>
                              <span>Crack Time: <b className="text-slate-600 dark:text-slate-300 font-mono">{item.scores.crackTimeStr}</b></span>
                              <span>Complexity: <span className={complexityColor + " font-bold"}>{item.scores.complexity}</span></span>
                            </div>
                          </div>

                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => copyToClipboard(item.value)}
                              className="p-2 rounded-lg text-slate-400 hover:text-[#518231] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Copy Password"
                            >
                              {copiedValue === item.value ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
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
        </div>
      ) : (
        // ==========================================
        // PASSWORD CHECKER VIEW
        // ==========================================
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8 animate-fade-in max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">Offline Password Strength Analyzer</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Test your password's entropy and estimate brute-force crack-time completely locally inside your browser. No strings are ever transmitted over the network.</p>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Enter Password to Analyze</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={checkValue}
                onChange={(e) => setCheckValue(e.target.value)}
                placeholder="Type or paste your password here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm pr-12 font-mono"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {checkValue && (
            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              
              {/* Strength Level Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>Complexity Strength</span>
                  <span className={
                    checkerScores.complexity === 'Cryptographic' ? 'text-green-600 dark:text-green-400' :
                    checkerScores.complexity === 'Strong' ? 'text-blue-500' :
                    checkerScores.complexity === 'Medium' ? 'text-amber-500' :
                    'text-red-500'
                  }>{checkerScores.complexity} ({checkerScores.entropyBits} bits)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      checkerScores.entropyBits >= 85 ? 'bg-green-500' :
                      checkerScores.entropyBits >= 65 ? 'bg-blue-500' :
                      checkerScores.entropyBits >= 45 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${checkerScores.strengthPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Basic analysis metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Length</span>
                  <span className="text-base font-bold font-mono">{checkValue.length} chars</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Entropy</span>
                  <span className="text-base font-bold font-mono">{checkerScores.entropyBits} bits</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850 col-span-2">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Est. Crack Time</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-100 break-words">{checkerScores.crackTimeStr}</span>
                </div>
              </div>

              {/* Actionable recommendations and Warnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Warnings List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                    <ShieldAlert size={14} /> Warnings & Alerts ({checkerScores.warnings.length})
                  </h4>
                  {checkerScores.warnings.length === 0 ? (
                    <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1.5 font-semibold">
                      <CheckCircle size={14} /> No structural weaknesses detected.
                    </div>
                  ) : (
                    <ul className="space-y-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
                      {checkerScores.warnings.map((w, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <XCircle size={14} className="shrink-0 mt-0.5" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Recommendations List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Info size={14} /> Security Checklist ({checkerScores.recommendations.length})
                  </h4>
                  {checkerScores.recommendations.length === 0 ? (
                    <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1.5 font-semibold">
                      <CheckCircle size={14} /> Excellent password construction. Satisfies all criteria.
                    </div>
                  ) : (
                    <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      {checkerScores.recommendations.map((r, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#518231] shrink-0 mt-2"></div>
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>

            </div>
          )}
        </div>
      )}

      {/* FAVORITES BAR */}
      {favorites.length > 0 && activeTab === 'generator' && (
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
