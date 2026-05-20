"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { 
  ShieldCheck, Copy, RefreshCw, Sliders, Settings, History, 
  Download, QrCode, Eye, EyeOff, Lock, Sparkles, Trash2, 
  AlertTriangle, Check, Info, FileText
} from "lucide-react";
import { WORDLIST } from "./wordlist";
import { drawQRCode } from "./qrcode";

interface PasswordHistoryItem {
  id: string;
  password: string;
  strength: number;
  entropy: number;
  mode: string;
  timestamp: number;
}

export default function PasswordGenerator() {
  const t = useTranslations("PasswordGenerator");

  // Mode Selection: 'random' | 'memorable' | 'passphrase'
  const [mode, setMode] = useState<'random' | 'memorable' | 'passphrase'>('random');
  
  // Basic configuration
  const [length, setLength] = useState<number>(16);
  const [wordCount, setWordCount] = useState<number>(4);
  const [separator, setSeparator] = useState<string>("-");
  const [capitalizeWords, setCapitalizeWords] = useState<boolean>(true);
  const [includeWordsNumber, setIncludeWordsNumber] = useState<boolean>(true);

  // Character Sets (for 'random' mode)
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [customSymbols, setCustomSymbols] = useState<string>("!@#$%^&*()_+-=[]{}|;:,.<>?");

  // Filters / Advanced (for 'random' mode)
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(false); // i, l, 1, I, o, 0, O, o, etc.
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false); // {}[]()/\'"`~,;:.<>
  const [avoidRepeated, setAvoidRepeated] = useState<boolean>(false);
  const [avoidSequential, setAvoidSequential] = useState<boolean>(false);

  // Bulking
  const [generateCount, setGenerateCount] = useState<number>(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  // Settings / UI Toggles
  const [autoCopy, setAutoCopy] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [history, setHistory] = useState<PasswordHistoryItem[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>("custom");

  // QR Code Modal State
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);
  const [qrPassword, setQrPassword] = useState<string>("");
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // History management
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nexus_password_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load password history", e);
    }
  }, []);

  const addHistory = useCallback((items: Omit<PasswordHistoryItem, "id" | "timestamp">[]) => {
    setHistory((prev) => {
      const newItems = items.map(item => ({
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now()
      }));
      const combined = [...newItems, ...prev].slice(0, 30); // limit to 30 items
      try {
        localStorage.setItem("nexus_password_history", JSON.stringify(combined));
      } catch (e) {
        console.error("Failed to save history", e);
      }
      return combined;
    });
  }, []);

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("nexus_password_history");
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  };

  // Cryptographically Secure Character Pool Builder
  const getCharacterPool = useCallback(() => {
    let pool = "";
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = customSymbols || "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (excludeSimilar) {
      // similar-looking characters: i, l, 1, I, o, 0, O, o, etc.
      uppercase = uppercase.replace(/[IO]/g, "");
      lowercase = lowercase.replace(/[ilo]/g, "");
      numbers = numbers.replace(/[01]/g, "");
      symbols = symbols.replace(/[|]/g, "");
    }

    if (excludeAmbiguous) {
      // ambiguous characters: {}[]()/\'"`~,;:.<>
      symbols = symbols.replace(/[{}[\]()\/\\'"~,;:.<>]/g, "");
    }

    if (includeUppercase) pool += uppercase;
    if (includeLowercase) pool += lowercase;
    if (includeNumbers) pool += numbers;
    if (includeSymbols) pool += symbols;

    return pool;
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols, customSymbols, excludeSimilar, excludeAmbiguous]);

  // Syllable generator for pronounceable words
  const generateSyllable = (randomVal: number): string => {
    const consonants = "bcdfghjklmnpqrstvwxyz";
    const vowels = "aeiou";
    
    const c1 = consonants[randomVal % consonants.length];
    const v = vowels[(randomVal >> 8) % vowels.length];
    const c2 = consonants[(randomVal >> 16) % consonants.length];
    
    // Return CVC syllable
    return c1 + v + c2;
  };

  // Password analysis algorithm
  const analyzePassword = useCallback((pwd: string) => {
    if (!pwd) return { score: 0, entropy: 0, timeOnline: "Instant", timeOffline: "Instant", warnings: [], strengthLabel: "Empty", strengthColor: "text-slate-400 bg-slate-100 border-slate-200" };

    // 1. Calculate pool size (R)
    let poolSize = 0;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSymbol) poolSize += 32;

    // Wordlist based modes pool calculations
    let entropy = 0;
    if (mode === 'passphrase' || mode === 'memorable') {
      const parts = pwd.split(separator);
      const isWordMatch = parts.every(part => /^[A-Z]?[a-z]+$/.test(part) || /^\d+$/.test(part));
      if (isWordMatch) {
        // Calculate based on word entropy (R = WORDLIST size ~ 1000)
        entropy = parts.reduce((acc, part) => {
          if (/^\d+$/.test(part)) return acc + Math.log2(100); // 2-digit number
          return acc + Math.log2(WORDLIST.length); // words
        }, 0);
      } else {
        // Standard character calculation fallback
        entropy = pwd.length * Math.log2(poolSize || 2);
      }
    } else {
      entropy = pwd.length * Math.log2(poolSize || 2);
    }

    // Round entropy
    entropy = Math.round(entropy * 10) / 10;

    // 2. Score mapping (0 - 100)
    let score = Math.min(100, Math.round((entropy / 120) * 100));
    if (pwd.length < 6) score = Math.min(score, 15);
    else if (pwd.length < 10) score = Math.min(score, 45);

    // Diffs based on custom rules
    const warnings: string[] = [];
    if (pwd.length < 12) {
      warnings.push("Password is shorter than 12 characters.");
    }
    
    // Check repeating characters (3 in a row)
    if (/(.)\1\1/.test(pwd)) {
      warnings.push("Repeated character sequences detected.");
      score = Math.max(0, score - 15);
    }

    // Check sequential characters (3 in a row e.g. abc, 123)
    let hasSeq = false;
    for (let i = 0; i < pwd.length - 2; i++) {
      const c1 = pwd.charCodeAt(i);
      const c2 = pwd.charCodeAt(i + 1);
      const c3 = pwd.charCodeAt(i + 2);
      if ((c2 - c1 === 1 && c3 - c2 === 1) || (c1 - c2 === 1 && c2 - c3 === 1)) {
        hasSeq = true;
        break;
      }
    }
    if (hasSeq) {
      warnings.push("Sequential keyboard patterns (e.g., 'abc' or '123') detected.");
      score = Math.max(0, score - 15);
    }

    if (!hasSymbol && mode === 'random') {
      warnings.push("Add special characters (symbols) to boost cryptanalysis defense.");
    }

    // 3. Crack time calculations
    // Offline attack speed: 1 Trillion (10^12) keys/sec
    // Online attack speed: 100 keys/sec (with locks/rate limiting)
    const totalCombinations = Math.pow(2, entropy);
    
    const getCrackTimeLabel = (seconds: number) => {
      if (seconds < 1) return "Instant";
      if (seconds < 60) return `${Math.round(seconds)} seconds`;
      if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
      if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
      if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
      if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
      if (seconds < 315360000000) return `${Math.round(seconds / 3153600000)} centuries`;
      return "Trillions of years";
    };

    const timeOnline = getCrackTimeLabel(totalCombinations / 100);
    const timeOffline = getCrackTimeLabel(totalCombinations / 1e12);

    let strengthLabel = "Weak";
    let strengthColor = "text-rose-500 bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50";
    if (score >= 80) {
      strengthLabel = "Very Strong";
      strengthColor = "text-emerald-500 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50";
    } else if (score >= 60) {
      strengthLabel = "Strong";
      strengthColor = "text-teal-500 bg-teal-50 border-teal-200 dark:bg-teal-950/20 dark:border-teal-900/50";
    } else if (score >= 40) {
      strengthLabel = "Good";
      strengthColor = "text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-emerald-900/50";
    }

    return {
      score,
      entropy,
      timeOnline,
      timeOffline,
      warnings,
      strengthLabel,
      strengthColor
    };
  }, [mode, separator]);

  // Main Generator Function
  const generate = useCallback(() => {
    const list: string[] = [];

    for (let count = 0; count < generateCount; count++) {
      let pwd = "";

      if (mode === 'random') {
        const pool = getCharacterPool();
        if (!pool) {
          list.push("");
          continue;
        }

        const buffer = new Uint32Array(length * 4); // Oversample to filter repeats/sequences
        window.crypto.getRandomValues(buffer);
        let bufferIdx = 0;

        for (let i = 0; i < length; i++) {
          if (bufferIdx >= buffer.length - 1) {
            window.crypto.getRandomValues(buffer);
            bufferIdx = 0;
          }

          let nextChar = pool[buffer[bufferIdx] % pool.length];
          bufferIdx++;

          // Apply filters
          if (avoidRepeated && pwd.includes(nextChar)) {
            // Find a unique character from pool
            let attempts = 0;
            while (pwd.includes(nextChar) && attempts < 50) {
              if (bufferIdx >= buffer.length) {
                window.crypto.getRandomValues(buffer);
                bufferIdx = 0;
              }
              nextChar = pool[buffer[bufferIdx] % pool.length];
              bufferIdx++;
              attempts++;
            }
          }

          if (avoidSequential && pwd.length > 0) {
            const lastCode = pwd.charCodeAt(pwd.length - 1);
            const nextCode = nextChar.charCodeAt(0);
            
            // Check if sequential: e.g. 'a' -> 'b' or '1' -> '2'
            let attempts = 0;
            while ((Math.abs(lastCode - nextCode) === 1) && attempts < 50) {
              if (bufferIdx >= buffer.length) {
                window.crypto.getRandomValues(buffer);
                bufferIdx = 0;
              }
              nextChar = pool[buffer[bufferIdx] % pool.length];
              bufferIdx++;
              attempts++;
            }
          }

          pwd += nextChar;
        }
      } else if (mode === 'memorable') {
        // Pronounceable or Word-based memorable password
        const words: string[] = [];
        const buffer = new Uint32Array(wordCount + 5);
        window.crypto.getRandomValues(buffer);

        for (let i = 0; i < wordCount; i++) {
          let word = WORDLIST[buffer[i] % WORDLIST.length];
          
          if (capitalizeWords) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
          }
          words.push(word);
        }

        pwd = words.join(separator);

        if (includeWordsNumber) {
          // Append 2-digit secure number
          const numBuf = new Uint32Array(1);
          window.crypto.getRandomValues(numBuf);
          pwd += separator + (numBuf[0] % 90 + 10).toString();
        }
      } else if (mode === 'passphrase') {
        // Diceware passphrase (simple rolls from our wordlist)
        const words: string[] = [];
        const buffer = new Uint32Array(wordCount);
        window.crypto.getRandomValues(buffer);

        for (let i = 0; i < wordCount; i++) {
          let word = WORDLIST[buffer[i] % WORDLIST.length];
          if (capitalizeWords) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
          }
          words.push(word);
        }
        pwd = words.join(separator);
      }

      list.push(pwd);
    }

    setPasswords(list);

    // Save first password generated to history
    if (list.length > 0 && list[0] !== "") {
      const stats = analyzePassword(list[0]);
      addHistory([
        {
          password: list[0],
          strength: stats.score,
          entropy: stats.entropy,
          mode: mode.toUpperCase()
        }
      ]);

      if (autoCopy) {
        navigator.clipboard.writeText(list[0]);
        setCopiedIndex(0);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    }
  }, [
    mode, length, wordCount, separator, capitalizeWords, includeWordsNumber,
    getCharacterPool, avoidRepeated, avoidSequential, generateCount, addHistory, autoCopy,
    analyzePassword
  ]);

  // Apply Security Presets
  const applyPreset = useCallback((preset: string) => {
    setSelectedPreset(preset);
    if (preset === "gaming") {
      setMode("random");
      setLength(12);
      setIncludeUppercase(true);
      setIncludeLowercase(true);
      setIncludeNumbers(true);
      setIncludeSymbols(true);
      setExcludeAmbiguous(true);
      setExcludeSimilar(true);
      setAvoidRepeated(false);
      setAvoidSequential(true);
    } else if (preset === "banking") {
      setMode("random");
      setLength(16);
      setIncludeUppercase(true);
      setIncludeLowercase(true);
      setIncludeNumbers(true);
      setIncludeSymbols(false);
      setExcludeAmbiguous(false);
      setExcludeSimilar(false);
      setAvoidRepeated(false);
      setAvoidSequential(false);
    } else if (preset === "wifi") {
      setMode("random");
      setLength(20);
      setIncludeUppercase(true);
      setIncludeLowercase(true);
      setIncludeNumbers(true);
      setIncludeSymbols(false);
      setExcludeAmbiguous(true);
      setExcludeSimilar(true); // Exclude similar characters to make typing easy
      setAvoidRepeated(false);
      setAvoidSequential(false);
    } else if (preset === "developer") {
      setMode("random");
      setLength(32);
      setIncludeUppercase(true);
      setIncludeLowercase(true);
      setIncludeNumbers(true);
      setIncludeSymbols(true);
      setExcludeAmbiguous(false);
      setExcludeSimilar(false);
      setAvoidRepeated(false);
      setAvoidSequential(false);
    } else if (preset === "enterprise") {
      setMode("random");
      setLength(20);
      setIncludeUppercase(true);
      setIncludeLowercase(true);
      setIncludeNumbers(true);
      setIncludeSymbols(true);
      setExcludeAmbiguous(false);
      setExcludeSimilar(true);
      setAvoidRepeated(true);
      setAvoidSequential(true);
    }
  }, []);

  // Initial trigger
  useEffect(() => {
    generate();
  }, [mode, length, wordCount, separator, capitalizeWords, includeWordsNumber, selectedPreset]);

  // Trigger preset side effects
  const handlePresetChange = (preset: string) => {
    applyPreset(preset);
  };



  const activeStats = analyzePassword(passwords[0]);

  // Export functions
  const copyPassword = (pwd: string, index: number) => {
    navigator.clipboard.writeText(pwd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(passwords.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const downloadTextFile = () => {
    const text = passwords.join("\r\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `passwords_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // QR Code Rendering Trigger
  const openQRModal = (pwd: string) => {
    setQrPassword(pwd);
    setQrModalOpen(true);
  };

  useEffect(() => {
    if (qrModalOpen && qrCanvasRef.current && qrPassword) {
      // Draw offline QR code immediately to canvas
      drawQRCode(qrPassword, qrCanvasRef.current, {
        size: 256,
        margin: 2,
        darkColor: "#0f172a", // slate 900
        lightColor: "#ffffff"
      });
    }
  }, [qrModalOpen, qrPassword]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Dynamic Security Badge Header */}
      <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-6 md:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute left-0 top-0 -translate-x-12 -translate-y-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              <ShieldCheck size={32} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">{t("title") || "Advanced Password Generator"}</h2>
              <p className="text-slate-400 text-sm mt-1">{t("subtitle") || "Generate cryptographically secure, offline passwords instantly."}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'custom', name: 'Custom' },
              { id: 'gaming', name: 'Gaming' },
              { id: 'banking', name: 'Banking' },
              { id: 'wifi', name: 'WiFi' },
              { id: 'developer', name: 'Developer' },
              { id: 'enterprise', name: 'Enterprise' }
            ].map(preset => (
              <button
                key={preset.id}
                onClick={() => handlePresetChange(preset.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  selectedPreset === preset.id
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Settings Panel */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Controls Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
            
            {/* Mode Tab Headers */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-1">
              {[
                { id: 'random', label: 'Random Char' },
                { id: 'memorable', label: 'Memorable Word' },
                { id: 'passphrase', label: 'Diceware Passphrase' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMode(tab.id as any)}
                  className={`flex-1 py-3 text-center rounded-2xl text-xs font-black transition-all ${
                    mode === tab.id
                      ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm border border-slate-100 dark:border-slate-700'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8 space-y-6">
              
              {/* Length / Word count sliders */}
              {mode === 'random' ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Password Length</label>
                    <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white px-3 py-1 rounded-xl text-lg font-black font-mono">
                      {length}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="128"
                    value={length}
                    onChange={(e) => {
                      setLength(parseInt(e.target.value, 10));
                      setSelectedPreset("custom");
                    }}
                    className="w-full accent-emerald-500 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-2xs font-bold text-slate-400 font-mono">
                    <span>6 chars</span>
                    <span>32 chars</span>
                    <span>64 chars</span>
                    <span>128 chars</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Word Count</label>
                    <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white px-3 py-1 rounded-xl text-lg font-black font-mono">
                      {wordCount}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    value={wordCount}
                    onChange={(e) => setWordCount(parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-2xs font-bold text-slate-400 font-mono">
                    <span>3 words</span>
                    <span>6 words</span>
                    <span>9 words</span>
                    <span>12 words</span>
                  </div>
                </div>
              )}

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Mode Specific Checkboxes */}
              {mode === 'random' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Character Options</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'upper', label: 'Uppercase Letters', desc: 'A-Z', state: includeUppercase, set: setIncludeUppercase },
                      { id: 'lower', label: 'Lowercase Letters', desc: 'a-z', state: includeLowercase, set: setIncludeLowercase },
                      { id: 'numbers', label: 'Numbers', desc: '0-9', state: includeNumbers, set: setIncludeNumbers },
                      { id: 'symbols', label: 'Special Symbols', desc: '!@#$', state: includeSymbols, set: setIncludeSymbols },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          opt.set(!opt.state);
                          setSelectedPreset("custom");
                        }}
                        className={`flex items-center gap-3 p-3 text-left rounded-2xl border transition-all ${
                          opt.state
                            ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white'
                            : 'bg-transparent border-slate-100 dark:border-slate-800/40 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                          opt.state ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-300 dark:border-slate-700'
                        }`}>
                          {opt.state && <Check size={14} strokeWidth={3} />}
                        </div>
                        <div>
                          <span className="text-xs font-black block">{opt.label}</span>
                          <span className="text-3xs font-mono opacity-80">{opt.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {includeSymbols && (
                    <div className="space-y-2 mt-4">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Custom Symbols String</label>
                      <input
                        type="text"
                        value={customSymbols}
                        onChange={(e) => {
                          setCustomSymbols(e.target.value);
                          setSelectedPreset("custom");
                        }}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  )}
                </div>
              )}

              {mode === 'memorable' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Memorable Options</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setCapitalizeWords(!capitalizeWords)}
                      className={`flex items-center gap-3 p-3 text-left rounded-2xl border transition-all ${
                        capitalizeWords
                          ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white'
                          : 'bg-transparent border-slate-100 dark:border-slate-800/40 text-slate-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        capitalizeWords ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {capitalizeWords && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <span className="text-xs font-black block">Capitalize Words</span>
                        <span className="text-3xs opacity-80">e.g. Banana-Sunset</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setIncludeWordsNumber(!includeWordsNumber)}
                      className={`flex items-center gap-3 p-3 text-left rounded-2xl border transition-all ${
                        includeWordsNumber
                          ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white'
                          : 'bg-transparent border-slate-100 dark:border-slate-800/40 text-slate-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        includeWordsNumber ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {includeWordsNumber && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <span className="text-xs font-black block">Append Number</span>
                        <span className="text-3xs opacity-80">Add secure digits</span>
                      </div>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Custom Separator Character</label>
                    <div className="flex gap-2">
                      {["-", ".", "_", "/"].map(char => (
                        <button
                          key={char}
                          onClick={() => setSeparator(char)}
                          className={`w-10 h-10 rounded-xl text-xs font-black border transition-all ${
                            separator === char 
                              ? 'bg-slate-900 dark:bg-slate-700 text-white border-slate-800 dark:border-slate-650'
                              : 'bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-750'
                          }`}
                        >
                          {char}
                        </button>
                      ))}
                      <input
                        type="text"
                        maxLength={1}
                        value={["-", ".", "_", "/"].includes(separator) ? "" : separator}
                        placeholder="Other"
                        onChange={(e) => setSeparator(e.target.value)}
                        className="w-16 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-xl text-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {mode === 'passphrase' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Passphrase Options</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setCapitalizeWords(!capitalizeWords)}
                      className={`flex items-center gap-3 p-3 text-left rounded-2xl border transition-all ${
                        capitalizeWords
                          ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white'
                          : 'bg-transparent border-slate-100 dark:border-slate-800/40 text-slate-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        capitalizeWords ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {capitalizeWords && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <span className="text-xs font-black block">Capitalize Words</span>
                        <span className="text-3xs opacity-80">e.g. Banana-Sunset</span>
                      </div>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Custom Separator Character</label>
                    <div className="flex gap-2">
                      {["-", ".", "_", " "].map(char => (
                        <button
                          key={char}
                          onClick={() => setSeparator(char)}
                          className={`w-10 h-10 rounded-xl text-xs font-black border transition-all ${
                            separator === char 
                              ? 'bg-slate-900 dark:bg-slate-700 text-white border-slate-800 dark:border-slate-650'
                              : 'bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-750'
                          }`}
                        >
                          {char === " " ? "Space" : char}
                        </button>
                      ))}
                      <input
                        type="text"
                        maxLength={1}
                        value={["-", ".", "_", " "].includes(separator) ? "" : separator}
                        placeholder="Other"
                        onChange={(e) => setSeparator(e.target.value)}
                        className="w-16 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-xl text-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Collapse Button */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-850">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  <Settings size={14} className={`transition-transform duration-300 ${showAdvanced ? 'rotate-90' : ''}`} />
                  {showAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings"}
                </button>
              </div>

              {/* Advanced Panel details */}
              {showAdvanced && (
                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-4 animate-fadeIn">
                  
                  {mode === 'random' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: 'similar', label: 'Exclude Similar Chars', desc: 'Avoids i, l, 1, o, 0, I, O', state: excludeSimilar, set: setExcludeSimilar },
                        { id: 'ambig', label: 'Exclude Ambiguous', desc: 'Avoids brackets, quotes, etc.', state: excludeAmbiguous, set: setExcludeAmbiguous },
                        { id: 'repeats', label: 'Avoid Repeated Chars', desc: 'No characters used twice', state: avoidRepeated, set: setAvoidRepeated },
                        { id: 'seq', label: 'Avoid Sequential Chars', desc: 'No consecutive abc, 123 patterns', state: avoidSequential, set: setAvoidSequential },
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            opt.set(!opt.state);
                            setSelectedPreset("custom");
                          }}
                          className={`flex items-center gap-3 p-3 text-left rounded-xl border bg-white dark:bg-slate-900 transition-all ${
                            opt.state ? 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white' : 'border-slate-100 dark:border-slate-800/50 text-slate-400'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            opt.state ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-350 dark:border-slate-750'
                          }`}>
                            {opt.state && <Check size={10} strokeWidth={3} />}
                          </div>
                          <div>
                            <span className="text-xs font-black block leading-none">{opt.label}</span>
                            <span className="text-3xs opacity-85 mt-1 block">{opt.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Multiple Generation Counter */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Generate Multiple At Once</label>
                      <select
                        value={generateCount}
                        onChange={(e) => setGenerateCount(parseInt(e.target.value, 10))}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      >
                        {[1, 2, 5, 10, 15, 20].map(cnt => (
                          <option key={cnt} value={cnt}>{cnt} Password{cnt > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    {/* Auto-copy Toggle */}
                    <button
                      onClick={() => setAutoCopy(!autoCopy)}
                      className={`flex items-center gap-3 p-3 text-left rounded-xl border bg-white dark:bg-slate-900 transition-all ${
                        autoCopy ? 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white' : 'border-slate-100 dark:border-slate-800/50 text-slate-400'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        autoCopy ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-350 dark:border-slate-750'
                      }`}>
                        {autoCopy && <Check size={10} strokeWidth={3} />}
                      </div>
                      <div>
                        <span className="text-xs font-black block leading-none">Auto-Copy On Generate</span>
                        <span className="text-3xs opacity-85 mt-1 block">Copies automatically to clipboard</span>
                      </div>
                    </button>

                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

        {/* Right Output and Analytics Panel */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Output Display Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-6">
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generated Passwords</span>
              
              <div className="flex gap-2">
                {passwords.length > 1 && (
                  <button
                    onClick={copyAll}
                    title="Copy all to clipboard"
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 transition-colors"
                  >
                    {copiedAll ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                )}
                {passwords.length > 1 && (
                  <button
                    onClick={downloadTextFile}
                    title="Export as TXT file"
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 transition-colors"
                  >
                    <Download size={14} />
                  </button>
                )}
                <button
                  onClick={generate}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                >
                  <RefreshCw size={12} />
                  Regen
                </button>
              </div>
            </div>

            {/* Password outputs layout */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {passwords.map((pwd, idx) => (
                <div 
                  key={idx} 
                  className={`w-full bg-slate-50 dark:bg-slate-950/60 border rounded-2xl p-4 flex items-center justify-between gap-4 group transition-colors hover:border-emerald-200 dark:hover:border-emerald-900/40 ${
                    idx === 0 ? 'border-slate-200 dark:border-slate-800' : 'border-slate-100 dark:border-slate-900'
                  }`}
                >
                  <div className="font-mono text-sm md:text-base text-slate-800 dark:text-slate-200 break-all select-all font-semibold tracking-wider">
                    {pwd || "No password generated"}
                  </div>
                  
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => copyPassword(pwd, idx)}
                      title="Copy to clipboard"
                      className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors shadow-sm"
                    >
                      {copiedIndex === idx ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                    <button
                      onClick={() => openQRModal(pwd)}
                      title="Show QR Code"
                      className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors shadow-sm"
                    >
                      <QrCode size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Strength Analysis Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Security Analysis</span>

            {/* Strength meter gauge */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-black">
                <span className="text-slate-500 dark:text-slate-400">Password Strength</span>
                <span className={activeStats.strengthLabel.toLowerCase().includes('weak') ? 'text-rose-500' : activeStats.strengthLabel.toLowerCase().includes('strong') ? 'text-emerald-500' : 'text-amber-500'}>
                  {activeStats.strengthLabel} ({activeStats.score}%)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${
                    activeStats.score >= 80 ? 'bg-emerald-500' : activeStats.score >= 60 ? 'bg-teal-500' : activeStats.score >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                  }`} 
                  style={{ width: `${activeStats.score}%` }}
                ></div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-850">
                <span className="text-3xs font-bold text-slate-400 uppercase block">Entropy Bits</span>
                <span className="text-sm font-black text-slate-800 dark:text-white font-mono mt-1 block">{activeStats.entropy} bits</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-850">
                <span className="text-3xs font-bold text-slate-400 uppercase block font-sans">Offline Crack Time</span>
                <span className="text-xs font-black text-slate-800 dark:text-white mt-1 block">{activeStats.timeOffline}</span>
              </div>
            </div>

            {/* Offline vs Online Info collapse */}
            <div className="text-3xs font-bold text-slate-400 flex items-start gap-1.5 p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-950/30 text-blue-600 dark:text-blue-400">
              <Info size={14} className="shrink-0 mt-0.5" />
              <div>
                Estimated offline crack times are calculated based on hashcat CPU/GPU cluster cracking arrays executing 1 Trillion guesses per second.
              </div>
            </div>

            {/* Warnings list */}
            {activeStats.warnings.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-2xs font-bold text-slate-400 uppercase block">Warnings / Weaknesses</span>
                <div className="space-y-1.5">
                  {activeStats.warnings.map((warn, i) => (
                    <div key={i} className="flex gap-2 text-rose-600 dark:text-rose-400 font-bold text-3xs p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-950/30">
                      <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* History log block */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-4">
        
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <History size={16} className="text-slate-400" />
            <span className="text-xs font-black text-slate-700 dark:text-slate-200">Session Generation Log</span>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-rose-500 hover:text-rose-700 text-3xs font-bold"
            >
              <Trash2 size={12} />
              Clear Log
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-6 text-2xs text-slate-400 font-bold">
            No history recorded in this session. Generate a password to start logging.
          </div>
        ) : (
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {history.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-850 hover:border-slate-250 dark:hover:border-slate-750 transition-colors">
                <div className="font-mono text-2xs text-slate-700 dark:text-slate-300 break-all select-all font-semibold">
                  {item.password}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-3xs text-slate-400 font-mono font-bold uppercase">{item.mode}</span>
                  <div className={`px-2 py-0.5 rounded text-3xs font-black ${
                    item.strength >= 80 ? 'bg-emerald-500/10 text-emerald-500' : item.strength >= 50 ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    {item.strength}% Strength
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(item.password)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                    title="Copy Password"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* QR Code Modal dialog */}
      {qrModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 max-w-sm w-full space-y-6">
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Password QR Code</span>
              <button 
                onClick={() => setQrModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-inner">
                <canvas ref={qrCanvasRef} className="w-[180px] h-[180px] block" />
              </div>
              <div className="text-center">
                <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Scannable Text</span>
                <p className="font-mono text-2xs text-slate-700 dark:text-slate-350 break-all select-all font-semibold mt-1">
                  {qrPassword}
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-850 flex gap-2 text-slate-500 dark:text-slate-400 text-3xs font-bold">
              <Info size={14} className="shrink-0 mt-0.5" />
              <div>
                This QR Code is generated 100% client-side inside your browser sandbox. The credential was not sent to any remote server or API.
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
