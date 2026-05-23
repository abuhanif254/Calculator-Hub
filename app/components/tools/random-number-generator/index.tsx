"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Dices, Hash, Shield, List, Settings2, Download, Copy, RefreshCw, 
  Table, Check, Activity, BarChart2 
} from 'lucide-react';
import { 
  RandomMode, StandardOptions, DiceOptions, PasswordOptions, PickerOptions, Statistics,
  generateStandard, generateDice, generatePasswordTokens, calculateStatistics, downloadFile 
} from './utils';

export function RandomNumberGenerator() {
  const [mode, setMode] = useState<RandomMode>('standard');

  // State Options
  const [standardOpts, setStandardOpts] = useState<StandardOptions>({
    min: 1,
    max: 100,
    amount: 1,
    decimals: 0,
    unique: false,
    oddOnly: false,
    evenOnly: false,
    exclude: ''
  });

  const [diceOpts, setDiceOpts] = useState<DiceOptions>({
    amount: 1,
    type: 'd6'
  });

  const [passwordOpts, setPasswordOpts] = useState<PasswordOptions>({
    amount: 1,
    length: 6
  });

  const [pickerOpts, setPickerOpts] = useState<PickerOptions>({
    amount: 1,
    pool: 'Apple, Banana, Cherry, Date, Elderberry, Fig, Grape',
    unique: true
  });

  // Results
  const [resultsNum, setResultsNum] = useState<number[]>([]);
  const [resultsStr, setResultsStr] = useState<string[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    
    // Simulate slight delay for animation effect
    setTimeout(() => {
      let nums: number[] = [];
      let strs: string[] = [];

      if (mode === 'standard') {
        nums = generateStandard(standardOpts);
        setStats(calculateStatistics(nums));
      } 
      else if (mode === 'dice') {
        nums = generateDice(diceOpts);
        setStats(calculateStatistics(nums));
      }
      else if (mode === 'password') {
        strs = generatePasswordTokens(passwordOpts);
        setStats(null);
      }
      else if (mode === 'picker') {
        const poolItems = pickerOpts.pool.split(',').map(s => s.trim()).filter(s => s !== '');
        if (poolItems.length > 0) {
          const picked: string[] = [];
          const usedIndices = new Set<number>();
          let attempts = 0;
          
          while (picked.length < pickerOpts.amount && attempts < pickerOpts.amount * 100) {
            attempts++;
            const idx = Math.floor(Math.random() * poolItems.length);
            if (pickerOpts.unique && usedIndices.has(idx)) continue;
            picked.push(poolItems[idx]);
            if (pickerOpts.unique) usedIndices.add(idx);
          }
          strs = picked;
        }
        setStats(null);
      }

      setResultsNum(nums);
      setResultsStr(strs);
      setIsGenerating(false);
    }, 150); // flicker delay
  }, [mode, standardOpts, diceOpts, passwordOpts, pickerOpts]);

  useEffect(() => {
    handleGenerate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const displayData = useMemo(() => {
    if (resultsStr.length > 0) return resultsStr.map(String);
    if (standardOpts.decimals > 0 && mode === 'standard') {
      return resultsNum.map(n => n.toFixed(standardOpts.decimals));
    }
    return resultsNum.map(String);
  }, [resultsNum, resultsStr, standardOpts.decimals, mode]);

  const handleCopy = () => {
    const text = displayData.join(', ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyJSON = () => {
    const text = JSON.stringify(mode === 'password' || mode === 'picker' ? resultsStr : resultsNum, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const csvContent = "Result\\n" + displayData.map(v => `"${v}"`).join("\\n");
    downloadFile(csvContent, 'random_data.csv', 'text/csv');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Sidebar Controls */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Settings2 size={18} className="text-[#518231]" />
            Generator Mode
          </h3>
          
          <div className="space-y-2 mb-6">
            <button 
              onClick={() => setMode('standard')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${mode === 'standard' ? 'bg-[#518231]/10 text-[#518231] border border-[#518231]/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Hash size={16} /> Range Generator
            </button>
            <button 
              onClick={() => setMode('dice')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${mode === 'dice' ? 'bg-[#518231]/10 text-[#518231] border border-[#518231]/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Dices size={16} /> RPG Dice Roller
            </button>
            <button 
              onClick={() => setMode('password')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${mode === 'password' ? 'bg-[#518231]/10 text-[#518231] border border-[#518231]/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Shield size={16} /> OTP / Tokens
            </button>
            <button 
              onClick={() => setMode('picker')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${mode === 'picker' ? 'bg-[#518231]/10 text-[#518231] border border-[#518231]/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <List size={16} /> Random Picker
            </button>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            {mode === 'standard' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Min</label>
                    <input type="number" value={standardOpts.min} onChange={e => setStandardOpts({...standardOpts, min: parseInt(e.target.value) || 0})} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Max</label>
                    <input type="number" value={standardOpts.max} onChange={e => setStandardOpts({...standardOpts, max: parseInt(e.target.value) || 0})} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Amount</label>
                  <input type="number" min="1" max="10000" value={standardOpts.amount} onChange={e => setStandardOpts({...standardOpts, amount: parseInt(e.target.value) || 1})} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Decimals: {standardOpts.decimals}</label>
                  <input type="range" min="0" max="10" value={standardOpts.decimals} onChange={e => setStandardOpts({...standardOpts, decimals: parseInt(e.target.value)})} className="w-full accent-[#518231]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Exclude Numbers (comma separated)</label>
                  <input type="text" placeholder="e.g. 5, 10, 15" value={standardOpts.exclude} onChange={e => setStandardOpts({...standardOpts, exclude: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                    <input type="checkbox" checked={standardOpts.unique} onChange={e => setStandardOpts({...standardOpts, unique: e.target.checked})} className="rounded text-[#518231] focus:ring-[#518231]" />
                    Unique Only
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                    <input type="checkbox" checked={standardOpts.oddOnly} onChange={e => setStandardOpts({...standardOpts, oddOnly: e.target.checked, evenOnly: false})} disabled={standardOpts.decimals > 0} className="rounded text-[#518231] focus:ring-[#518231]" />
                    Odd Only (Integers)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                    <input type="checkbox" checked={standardOpts.evenOnly} onChange={e => setStandardOpts({...standardOpts, evenOnly: e.target.checked, oddOnly: false})} disabled={standardOpts.decimals > 0} className="rounded text-[#518231] focus:ring-[#518231]" />
                    Even Only (Integers)
                  </label>
                </div>
              </>
            )}

            {mode === 'dice' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Number of Dice</label>
                  <input type="number" min="1" max="1000" value={diceOpts.amount} onChange={e => setDiceOpts({...diceOpts, amount: parseInt(e.target.value) || 1})} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Dice Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['d4', 'd6', 'd8', 'd10', 'd12', 'd20'].map(d => (
                      <button 
                        key={d} 
                        onClick={() => setDiceOpts({...diceOpts, type: d as any})}
                        className={`py-1.5 rounded text-sm font-medium border ${diceOpts.type === d ? 'bg-[#518231] text-white border-[#518231]' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600'}`}
                      >
                        {d.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {mode === 'password' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Amount</label>
                  <input type="number" min="1" max="1000" value={passwordOpts.amount} onChange={e => setPasswordOpts({...passwordOpts, amount: parseInt(e.target.value) || 1})} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Token Length (Digits)</label>
                  <input type="number" min="1" max="128" value={passwordOpts.length} onChange={e => setPasswordOpts({...passwordOpts, length: parseInt(e.target.value) || 1})} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm" />
                </div>
              </>
            )}

            {mode === 'picker' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Items to Pick</label>
                  <input type="number" min="1" value={pickerOpts.amount} onChange={e => setPickerOpts({...pickerOpts, amount: parseInt(e.target.value) || 1})} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Item Pool (comma separated)</label>
                  <textarea 
                    rows={4}
                    value={pickerOpts.pool} 
                    onChange={e => setPickerOpts({...pickerOpts, pool: e.target.value})} 
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm resize-none custom-scrollbar" 
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                  <input type="checkbox" checked={pickerOpts.unique} onChange={e => setPickerOpts({...pickerOpts, unique: e.target.checked})} className="rounded text-[#518231] focus:ring-[#518231]" />
                  Pick Unique Items Only
                </label>
              </>
            )}

            <button
              onClick={handleGenerate}
              className="w-full mt-4 py-2.5 bg-[#518231] hover:bg-[#426a27] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <RefreshCw size={18} className={isGenerating ? "animate-spin" : ""} />
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        
        {/* Results Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Activity size={18} className="text-[#518231]" /> Output Results ({displayData.length})
            </h3>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />} Copy
              </button>
              <button onClick={handleCopyJSON} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                JSON
              </button>
              <button onClick={handleDownloadCSV} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Download size={14} /> CSV
              </button>
            </div>
          </div>
          
          <div className={`flex-grow p-6 overflow-y-auto custom-scrollbar ${isGenerating ? 'opacity-50' : 'opacity-100'} transition-opacity duration-150`}>
            {displayData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500 italic">
                No results generated or parameters invalid.
              </div>
            ) : displayData.length === 1 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-6xl md:text-8xl font-bold text-slate-800 dark:text-slate-100 font-mono tracking-tight text-center break-all">
                  {displayData[0]}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {displayData.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-center font-mono text-lg font-semibold text-slate-800 dark:text-slate-200 break-all shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (mode === 'standard' || mode === 'dice') && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Min</div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{stats.min !== null ? stats.min : '-'}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Max</div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{stats.max !== null ? stats.max : '-'}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Sum</div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{stats.sum}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Average</div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{stats.avg !== null ? stats.avg.toFixed(2) : '-'}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Median</div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{stats.median !== null ? stats.median : '-'}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Range</div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{stats.range !== null ? stats.range : '-'}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
