"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Sigma, Calculator, Trash2 } from "lucide-react";

interface StandardDeviationCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function StandardDeviationCalculatorView({ calcDef }: StandardDeviationCalculatorViewProps) {
  const t = useTranslations("StandardDeviationCalculator");

  const [inputData, setInputData] = useState("");
  const [results, setResults] = useState<{
    sampleSD: number;
    popSD: number;
    mean: number;
    sampleVariance: number;
    popVariance: number;
    count: number;
    sum: number;
  } | null>(null);

  const [errorObj, setErrorObj] = useState("");

  const calculate = () => {
    setErrorObj("");
    setResults(null);

    if (!inputData.trim()) return;

    // Parse data: split by commas or spaces, filter out empties, parse to numbers
    const rawParts = inputData.replace(/[^\d.,\-eE ]/g, " ").split(/[\s,]+/);
    const nums: number[] = [];

    for (const p of rawParts) {
      if (p.trim() === "") continue;
      const val = parseFloat(p);
      if (isNaN(val)) {
        setErrorObj(t("invalidInput"));
        return;
      }
      nums.push(val);
    }

    const count = nums.length;
    if (count < 2) {
      setErrorObj(t("notEnoughData"));
      return;
    }

    let sum = 0;
    for (const num of nums) sum += num;

    const mean = sum / count;

    let sqDiffSum = 0;
    for (const num of nums) {
      sqDiffSum += (num - mean) * (num - mean);
    }

    const popVariance = sqDiffSum / count;
    const sampleVariance = sqDiffSum / (count - 1);

    const popSD = Math.sqrt(popVariance);
    const sampleSD = Math.sqrt(sampleVariance);

    setResults({
      sampleSD,
      popSD,
      mean,
      sampleVariance,
      popVariance,
      count,
      sum
    });
  };

  const clear = () => {
    setInputData("");
    setResults(null);
    setErrorObj("");
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center shadow-inner">
            <Sigma size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
        </div>
        <div className="flex gap-2">
           <button onClick={clear} className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl font-bold transition-colors flex items-center gap-2 text-sm shadow-sm">
             <Trash2 size={16} /> <span className="hidden sm:inline">{t("clear")}</span>
           </button>
           <button onClick={calculate} className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-2 text-sm">
             <Calculator size={16} /> {t("calculate")}
           </button>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Area */}
        <div className="flex flex-col gap-4">
          <label className="font-bold text-slate-700">{t("dataInputLabel")}</label>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder={t("inputPlaceholder")}
            className="w-full h-48 md:h-64 p-4 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-teal-500 font-mono text-lg resize-none"
          />
          {errorObj && <div className="p-3 bg-red-50 text-red-600 border border-red-200 font-semibold text-sm rounded-xl">{errorObj}</div>}
          <p className="text-sm text-slate-500">{t("inputHelp")}</p>
        </div>

        {/* Results Area */}
        <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full">
          <div className="p-4 border-b border-slate-200 bg-white rounded-t-2xl">
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span> {t("results")}
            </h3>
          </div>
          
          <div className="p-4 flex-1 flex flex-col justify-center">
            {!results && !errorObj && (
              <div className="flex flex-col items-center justify-center opacity-40 py-12">
                <Sigma size={64} className="mb-4" strokeWidth={1} />
                <p className="font-medium">{t("waiting")}</p>
              </div>
            )}

            {results && (
              <div className="space-y-4">
                
                {/* Primary Metric Box */}
                <div className="bg-white border-2 border-teal-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -mr-12 -mt-12 z-0"></div>
                  <div className="flex flex-col relative z-10 w-full">
                     <span className="text-sm font-bold text-teal-600 uppercase mb-1">{t("sampleSD")} (s)</span>
                     <span className="text-3xl md:text-4xl font-extrabold text-slate-800 break-all">{results.sampleSD.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex flex-col w-full">
                     <span className="text-sm font-bold text-slate-500 uppercase mb-1">{t("popSD")} (σ)</span>
                     <span className="text-2xl font-bold text-slate-800 break-all">{results.popSD.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col">
                     <span className="text-xs font-semibold text-slate-500 uppercase">{t("mean")} (μ)</span>
                     <span className="text-xl font-bold text-slate-800 mt-1">{results.mean.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col">
                     <span className="text-xs font-semibold text-slate-500 uppercase">{t("count")} (N)</span>
                     <span className="text-xl font-bold text-slate-800 mt-1">{results.count.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col">
                     <span className="text-xs font-semibold text-slate-500 uppercase">{t("sampleVariance")}</span>
                     <span className="text-lg font-bold text-slate-800 mt-1 break-all">{results.sampleVariance.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col">
                     <span className="text-xs font-semibold text-slate-500 uppercase">{t("popVariance")}</span>
                     <span className="text-lg font-bold text-slate-800 mt-1 break-all">{results.popVariance.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                  </div>
                </div>

                 <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col">
                     <span className="text-xs font-semibold text-slate-500 uppercase">{t("sum")}</span>
                     <span className="text-lg font-bold text-slate-800 mt-1 break-all">{results.sum.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                  </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
