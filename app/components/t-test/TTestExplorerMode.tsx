"use client";

import React, { useState } from "react";
import { TDistributionVisualizer } from "./TDistributionVisualizer";
import { calculatePValue } from "@/lib/math/tTestMath";

export function TTestExplorerMode() {
  const [df, setDf] = useState<number>(10);
  const [tStat, setTStat] = useState<number>(2.5);
  const [alpha, setAlpha] = useState<number>(0.05);
  const [tails, setTails] = useState<1 | 2>(2);

  const pValue = calculatePValue(tStat, df, tails);
  const isSignificant = pValue < alpha;

  return (
    <div className="space-y-8">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Interactive T-Distribution Explorer</h3>
        <p className="text-slate-600 mb-6">
          Adjust the parameters below to see how degrees of freedom, the t-statistic, and alpha levels affect the t-distribution and hypothesis testing results. 
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Degrees of Freedom Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">Degrees of Freedom (df)</label>
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">{df}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={df} 
              onChange={(e) => setDf(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-xs text-slate-500 mt-1">Controls the "fatness" of the tails. Lower df = fatter tails.</p>
          </div>

          {/* T-Statistic Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">T-Statistic</label>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-lg">{tStat.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="-5" 
              max="5" 
              step="0.1"
              value={tStat} 
              onChange={(e) => setTStat(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <p className="text-xs text-slate-500 mt-1">The calculated test statistic from your sample data.</p>
          </div>

          {/* Alpha Level */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">Alpha Level (α)</label>
              <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-lg">{alpha}</span>
            </div>
            <select 
              value={alpha} 
              onChange={(e) => setAlpha(Number(e.target.value))}
              className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value={0.10}>0.10 (90% Confidence)</option>
              <option value={0.05}>0.05 (95% Confidence)</option>
              <option value={0.01}>0.01 (99% Confidence)</option>
            </select>
          </div>

          {/* Tails */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">Tails</label>
              <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-lg">{tails}-Tailed</span>
            </div>
            <select 
              value={tails} 
              onChange={(e) => setTails(Number(e.target.value) as 1 | 2)}
              className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value={2}>Two-Tailed</option>
              <option value={1}>One-Tailed (Upper)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TDistributionVisualizer df={df} tStat={tStat} alpha={alpha} tails={tails} />
        </div>
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-center">
          <h4 className="text-slate-400 font-semibold mb-4 text-center tracking-widest uppercase text-sm">Results</h4>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-slate-500 text-sm mb-1">p-value</div>
              <div className="text-5xl font-bold">{pValue < 0.0001 ? pValue.toExponential(4) : pValue.toFixed(4)}</div>
            </div>

            <div className={`p-4 rounded-xl text-center border ${isSignificant ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
              <div className="font-bold text-lg mb-1">{isSignificant ? "Significant Result" : "Not Significant"}</div>
              <div className="text-sm">
                {isSignificant 
                  ? "The t-statistic falls in the rejection region." 
                  : "The t-statistic does not fall in the rejection region."}
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl text-sm text-slate-300 space-y-2">
              <p><strong>Rule:</strong> Reject H₀ if p-value &lt; α.</p>
              <p>Here, {pValue.toFixed(4)} {isSignificant ? '<' : '>='} {alpha}.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
