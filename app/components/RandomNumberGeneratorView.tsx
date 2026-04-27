"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Dices, RefreshCw, Copy, Check } from "lucide-react";

interface RandomNumberGeneratorViewProps {
  calcDef: CalculatorDef;
}

export function RandomNumberGeneratorView({ calcDef }: RandomNumberGeneratorViewProps) {
  const t = useTranslations("RandomNumberGenerator");

  const [min, setMin] = useState<string>("1");
  const [max, setMax] = useState<string>("100");
  const [count, setCount] = useState<string>("1");
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  
  const [results, setResults] = useState<number[] | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setErrorMsg("");
    setCopied(false);
    
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const countVal = parseInt(count);

    if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal)) {
      return;
    }

    if (minVal > maxVal) {
      setErrorMsg(t("errorMinMax"));
      setResults(null);
      return;
    }

    if (countVal < 1 || countVal > 1000) {
      setCount("1");
    }

    const c = Math.min(Math.max(countVal, 1), 1000); // cap realistically at 1000 to prevent infinite loops

    if (!allowDuplicates) {
      const range = maxVal - minVal + 1;
      if (range < c) {
        setErrorMsg(t("errorCount"));
        setResults(null);
        return;
      }

      // Generate unique randomly (Fisher-Yates style or via Set if count is small relative to range)
      const resSet = new Set<number>();
      
      // If we need a lot of numbers out of a small range, generate array and shuffle
      if (c > range / 2 && range <= 100000) {
        let pool = Array.from({length: range}, (_, i) => minVal + i);
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        setResults(pool.slice(0, c));
      } else {
        // Use Set to gather unique
        while(resSet.size < c) {
          const r = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
          resSet.add(r);
        }
        setResults(Array.from(resSet));
      }
    } else {
      // Allow duplicates
      const resArray = [];
      for(let i=0; i<c; i++) {
        const r = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
        resArray.push(r);
      }
      setResults(resArray);
    }
  };

  const copyToClipboard = () => {
    if (results) {
      navigator.clipboard.writeText(results.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
          <Dices size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controls */}
          <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">{t("min")}</label>
                <input 
                  type="number" 
                  value={min} 
                  onChange={(e) => setMin(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">{t("max")}</label>
                <input 
                  type="number" 
                  value={max} 
                  onChange={(e) => setMax(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-lg"
                />
              </div>
            </div>

            <div className="h-px w-full bg-slate-200 my-4"></div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">{t("count")}</label>
              <input 
                type="number" 
                value={count} 
                min="1"
                max="1000"
                onChange={(e) => setCount(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-lg"
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                <span className="ms-3 text-sm font-semibold text-slate-700">{t("allowDuplicates")}</span>
              </label>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-sm font-semibold">
                {errorMsg}
              </div>
            )}

            <button 
              onClick={generate}
              className="w-full py-4 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              {parseInt(count) > 1 ? t('generatePlural') : t('generate')}
            </button>

          </div>

          {/* Results Area */}
          <div className="flex flex-col bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 min-h-[300px]">
             <div className="flex items-center justify-between mb-4 pb-4 border-b border-indigo-100">
               <h3 className="text-sm border border-indigo-200 bg-white px-3 py-1 rounded-full font-bold text-indigo-800 uppercase tracking-wider">{t("result")}</h3>
               
               {results && (
                 <button 
                   onClick={copyToClipboard}
                   className="flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-white hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors"
                 >
                   {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                   {copied ? t("copied") : t("copy")}
                 </button>
               )}
             </div>

             <div className="flex-1 flex items-center justify-center">
                {!results && (
                  <div className="text-slate-400 font-medium flex flex-col items-center gap-3 opacity-50">
                    <Dices size={48} strokeWidth={1} />
                    <span>Click Generate</span>
                  </div>
                )}
                
                {results && results.length === 1 && (
                  <div className="text-8xl md:text-9xl font-black text-indigo-900 drop-shadow-sm tracking-tighter animation-bounce-short">
                    {results[0]}
                  </div>
                )}

                {results && results.length > 1 && (
                  <div className="w-full max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                    <div className="flex flex-wrap gap-3 justify-center">
                      {results.map((r, idx) => (
                        <div key={idx} className="bg-white border-2 border-indigo-100 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold text-indigo-900 shadow-sm">
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
