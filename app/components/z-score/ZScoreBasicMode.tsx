"use client";

import React, { useState } from "react";
import { solveForZ, solveForX, normalCDF, inverseNormalCDF, detectOutlier } from "@/lib/math/zScoreMath";
import { Copy, Share2, Info, ArrowRight, Activity, Calculator } from "lucide-react";

type CalcMode = "z-from-raw" | "raw-from-z" | "z-from-percentile" | "percentile-from-z";

export function ZScoreBasicMode() {
  const [mode, setMode] = useState<CalcMode>("z-from-raw");

  // Inputs
  const [rawScore, setRawScore] = useState<string>("");
  const [zScoreIn, setZScoreIn] = useState<string>("");
  const [mean, setMean] = useState<string>("0");
  const [sd, setSd] = useState<string>("1");
  const [percentileIn, setPercentileIn] = useState<string>("");

  // Handler for form submission to prevent default reload
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Compute Results dynamically based on mode and inputs
  let zResult: number | null = null;
  let rawResult: number | null = null;
  let pValue: number | null = null;
  let errorMsg = "";

  try {
    const x = parseFloat(rawScore);
    const z = parseFloat(zScoreIn);
    const m = parseFloat(mean);
    const s = parseFloat(sd);
    const pIn = parseFloat(percentileIn);

    if (s <= 0 && (mode === "z-from-raw" || mode === "raw-from-z")) {
      errorMsg = "Standard Deviation must be greater than 0.";
    } else {
      if (mode === "z-from-raw" && !isNaN(x) && !isNaN(m) && !isNaN(s)) {
        zResult = solveForZ(x, m, s);
        rawResult = x;
        pValue = normalCDF(zResult);
      } else if (mode === "raw-from-z" && !isNaN(z) && !isNaN(m) && !isNaN(s)) {
        zResult = z;
        rawResult = solveForX(z, m, s);
        pValue = normalCDF(zResult);
      } else if (mode === "z-from-percentile" && !isNaN(pIn)) {
        if (pIn <= 0 || pIn >= 100) {
          errorMsg = "Percentile must be strictly between 0 and 100.";
        } else {
          zResult = inverseNormalCDF(pIn / 100);
          pValue = pIn / 100;
        }
      } else if (mode === "percentile-from-z" && !isNaN(z)) {
        zResult = z;
        pValue = normalCDF(z);
      }
    }
  } catch (err: any) {
    errorMsg = err.message || "Invalid calculation";
  }

  const copyToClipboard = () => {
    if (zResult !== null) {
      navigator.clipboard.writeText(`Z-Score: ${zResult.toFixed(4)}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Inputs */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Calculation Mode</h3>
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as CalcMode);
              setRawScore("");
              setZScoreIn("");
              setPercentileIn("");
            }}
            className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700"
          >
            <option value="z-from-raw">Find Z-Score from Raw Score</option>
            <option value="raw-from-z">Find Raw Score from Z-Score</option>
            <option value="percentile-from-z">Find Percentile from Z-Score</option>
            <option value="z-from-percentile">Find Z-Score from Percentile</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          {(mode === "z-from-raw" || mode === "raw-from-z") && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mean (μ)</label>
                <input
                  type="number"
                  step="any"
                  value={mean}
                  onChange={(e) => setMean(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Standard Deviation (σ)</label>
                <input
                  type="number"
                  step="any"
                  value={sd}
                  onChange={(e) => setSd(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 15"
                />
              </div>
            </div>
          )}

          {mode === "z-from-raw" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Raw Score (x)</label>
              <input
                type="number"
                step="any"
                value={rawScore}
                onChange={(e) => setRawScore(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Enter raw score..."
              />
            </div>
          )}

          {(mode === "raw-from-z" || mode === "percentile-from-z") && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Z-Score (z)</label>
              <input
                type="number"
                step="any"
                value={zScoreIn}
                onChange={(e) => setZScoreIn(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Enter z-score..."
              />
            </div>
          )}

          {mode === "z-from-percentile" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Percentile (0 - 100)</label>
              <input
                type="number"
                step="any"
                value={percentileIn}
                onChange={(e) => setPercentileIn(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="e.g. 95"
              />
            </div>
          )}
        </form>
      </div>

      {/* Right Column: Dashboard */}
      <div className="lg:col-span-7">
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white h-full shadow-xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Activity className="text-blue-400" />
              Result Dashboard
            </h3>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white" title="Copy Z-Score">
                <Copy size={18} />
              </button>
            </div>
          </div>

          {errorMsg ? (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
              {errorMsg}
            </div>
          ) : zResult !== null ? (
            <div className="space-y-6 relative z-10">
              {/* Primary Output */}
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <div className="text-sm font-medium text-slate-400 mb-1">Calculated Z-Score</div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  {zResult.toFixed(4)}
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    detectOutlier(zResult) === 'Normal' ? 'bg-green-500/20 text-green-300' :
                    detectOutlier(zResult) === 'Moderately Unusual' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {detectOutlier(zResult)}
                  </span>
                  • {Math.abs(zResult).toFixed(2)} standard deviations {zResult >= 0 ? "above" : "below"} the mean
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {rawResult !== null && (
                  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Raw Score (x)</div>
                    <div className="text-2xl font-bold">{rawResult.toFixed(4)}</div>
                  </div>
                )}
                {pValue !== null && (
                  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Percentile</div>
                    <div className="text-2xl font-bold">{(pValue * 100).toFixed(2)}<span className="text-lg text-slate-500">%</span></div>
                  </div>
                )}
                {pValue !== null && (
                  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">P(X &lt; x) Left Tail</div>
                    <div className="text-2xl font-bold">{pValue.toFixed(4)}</div>
                  </div>
                )}
                {pValue !== null && (
                  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">P(X &gt; x) Right Tail</div>
                    <div className="text-2xl font-bold">{(1 - pValue).toFixed(4)}</div>
                  </div>
                )}
              </div>

              {/* Interpretation Box */}
              <div className="bg-blue-900/20 border border-blue-500/30 p-5 rounded-2xl flex items-start gap-4 mt-6">
                <Info className="text-blue-400 shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-blue-100/80 leading-relaxed">
                  <strong>Interpretation:</strong> This value is located at the <strong>{(pValue! * 100).toFixed(2)}th percentile</strong> of the standard normal distribution. 
                  This means it is higher than {(pValue! * 100).toFixed(1)}% of all data points in a normally distributed dataset.
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 relative z-10">
              <Calculator size={48} className="mb-4 opacity-20" />
              <p>Enter values to calculate Z-score</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
