"use client";

import React, { useState } from "react";
import {
  parseDataset,
  getDescriptives,
  oneSampleTTest,
  independentTTest,
  welchsTTest,
  pairedTTest,
  calculatePValue,
  calculateConfidenceInterval
} from "@/lib/math/tTestMath";
import { Copy, Info, Table, AlertTriangle } from "lucide-react";

type DatasetMode = "one-sample" | "independent" | "paired";

export function TTestDatasetAnalyzer() {
  const [mode, setMode] = useState<DatasetMode>("independent");

  const [alpha, setAlpha] = useState<number>(0.05);
  const [tails, setTails] = useState<1 | 2>(2);
  const [assumeEqualVariance, setAssumeEqualVariance] = useState<boolean>(true);
  const [popMean, setPopMean] = useState<string>("0");

  const [dataset1, setDataset1] = useState<string>("");
  const [dataset2, setDataset2] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  let result: any = null;
  let pValue: number | null = null;
  let ci: any = null;
  let stats1: any = null;
  let stats2: any = null;
  let statsDiff: any = null;
  let errorMsg = "";
  let assumptionWarnings: string[] = [];

  try {
    const data1 = parseDataset(dataset1);
    const data2 = parseDataset(dataset2);
    const pM = parseFloat(popMean);

    if (data1.length > 0) {
      stats1 = getDescriptives(data1);
      if (stats1.n < 30) assumptionWarnings.push(`Dataset 1 size (n=${stats1.n}) < 30. Ensure normal distribution.`);
    }

    if (mode === "one-sample" && data1.length > 1 && !isNaN(pM)) {
      result = oneSampleTTest(stats1.mean, pM, stats1.sd, stats1.n);
      pValue = calculatePValue(result.tStat, result.df, tails);
      ci = calculateConfidenceInterval(stats1.mean - pM, result.se, result.df, alpha);
    } 
    else if (mode === "independent" && data1.length > 1 && data2.length > 1) {
      stats2 = getDescriptives(data2);
      if (stats2.n < 30) assumptionWarnings.push(`Dataset 2 size (n=${stats2.n}) < 30. Ensure normal distribution.`);

      const ratio = Math.max(stats1.variance, stats2.variance) / Math.min(stats1.variance, stats2.variance);
      if (assumeEqualVariance && ratio > 3) {
        assumptionWarnings.push("Variances appear unequal (ratio > 3). Consider unchecking 'Assume Equal Variance' (Welch's Test).");
      }

      if (assumeEqualVariance) {
        result = independentTTest(stats1.mean, stats1.sd, stats1.n, stats2.mean, stats2.sd, stats2.n);
      } else {
        result = welchsTTest(stats1.mean, stats1.sd, stats1.n, stats2.mean, stats2.sd, stats2.n);
      }
      pValue = calculatePValue(result.tStat, result.df, tails);
      ci = calculateConfidenceInterval(stats1.mean - stats2.mean, result.se, result.df, alpha);
    } 
    else if (mode === "paired" && data1.length > 1 && data2.length > 1) {
      if (data1.length !== data2.length) {
        errorMsg = "Paired t-test requires both datasets to have the exact same number of observations.";
      } else {
        const diffs = data1.map((val, idx) => val - data2[idx]);
        statsDiff = getDescriptives(diffs);
        
        result = pairedTTest(statsDiff.mean, statsDiff.sd, statsDiff.n);
        pValue = calculatePValue(result.tStat, result.df, tails);
        ci = calculateConfidenceInterval(statsDiff.mean, result.se, result.df, alpha);
      }
    }
  } catch (err: any) {
    errorMsg = err.message || "Could not parse datasets or perform calculation.";
  }

  const copyToClipboard = () => {
    if (result && pValue !== null) {
      navigator.clipboard.writeText(
        `T-Statistic: ${result.tStat.toFixed(4)}\np-value: ${pValue.toExponential(4)}\ndf: ${result.df.toFixed(2)}`
      );
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* Left Column: Data Input */}
      <div className="xl:col-span-5 space-y-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Dataset Analyzer</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Test Type</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as DatasetMode)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="independent">Independent Two-Sample T-Test</option>
                <option value="paired">Paired T-Test</option>
                <option value="one-sample">One-Sample T-Test</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tails</label>
                <select
                  value={tails}
                  onChange={(e) => setTails(Number(e.target.value) as 1 | 2)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={2}>Two-Tailed</option>
                  <option value={1}>One-Tailed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Alpha (α)</label>
                <select
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0.01}>0.01 (99%)</option>
                  <option value={0.05}>0.05 (95%)</option>
                  <option value={0.10}>0.10 (90%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          
          {mode === "one-sample" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Population Mean (μ)</label>
              <input
                type="number"
                step="any"
                value={popMean}
                onChange={(e) => setPopMean(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Dataset 1 {mode === "paired" ? "(Pre-test / Pair A)" : ""}
            </label>
            <p className="text-xs text-slate-500 mb-2">Paste numbers separated by commas, spaces, or newlines.</p>
            <textarea
              value={dataset1}
              onChange={(e) => setDataset1(e.target.value)}
              className="w-full h-32 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="e.g. 1.2, 3.4, 5.6..."
            ></textarea>
          </div>

          {(mode === "independent" || mode === "paired") && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Dataset 2 {mode === "paired" ? "(Post-test / Pair B)" : ""}
              </label>
              <textarea
                value={dataset2}
                onChange={(e) => setDataset2(e.target.value)}
                className="w-full h-32 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="e.g. 2.1, 4.3, 6.5..."
              ></textarea>
            </div>
          )}

          {mode === "independent" && (
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={assumeEqualVariance} 
                  onChange={(e) => setAssumeEqualVariance(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-slate-700 font-medium">Assume Equal Variances (Student's t-test)</span>
              </label>
            </div>
          )}
        </form>
      </div>

      {/* Right Column: Results & Descriptive Stats */}
      <div className="xl:col-span-7 space-y-6">
        
        {/* Descriptive Stats Panel */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-hidden">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Table className="text-blue-500" size={20} /> Descriptive Statistics
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 rounded-tl-lg">Group</th>
                  <th className="py-3 px-4">N</th>
                  <th className="py-3 px-4">Mean</th>
                  <th className="py-3 px-4">Variance</th>
                  <th className="py-3 px-4">Std Dev (s)</th>
                  <th className="py-3 px-4 rounded-tr-lg">Std Error</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats1 && (
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-medium text-slate-800">Dataset 1</td>
                    <td className="py-3 px-4">{stats1.n}</td>
                    <td className="py-3 px-4">{stats1.mean.toFixed(4)}</td>
                    <td className="py-3 px-4">{stats1.variance.toFixed(4)}</td>
                    <td className="py-3 px-4">{stats1.sd.toFixed(4)}</td>
                    <td className="py-3 px-4">{stats1.se.toFixed(4)}</td>
                  </tr>
                )}
                {stats2 && mode !== "paired" && (
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-medium text-slate-800">Dataset 2</td>
                    <td className="py-3 px-4">{stats2.n}</td>
                    <td className="py-3 px-4">{stats2.mean.toFixed(4)}</td>
                    <td className="py-3 px-4">{stats2.variance.toFixed(4)}</td>
                    <td className="py-3 px-4">{stats2.sd.toFixed(4)}</td>
                    <td className="py-3 px-4">{stats2.se.toFixed(4)}</td>
                  </tr>
                )}
                {statsDiff && mode === "paired" && (
                  <tr className="hover:bg-slate-50/50 bg-blue-50/30">
                    <td className="py-3 px-4 font-bold text-blue-800">Differences</td>
                    <td className="py-3 px-4 text-blue-900">{statsDiff.n}</td>
                    <td className="py-3 px-4 text-blue-900">{statsDiff.mean.toFixed(4)}</td>
                    <td className="py-3 px-4 text-blue-900">{statsDiff.variance.toFixed(4)}</td>
                    <td className="py-3 px-4 text-blue-900">{statsDiff.sd.toFixed(4)}</td>
                    <td className="py-3 px-4 text-blue-900">{statsDiff.se.toFixed(4)}</td>
                  </tr>
                )}
                {!stats1 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Enter data to view summary statistics
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* T-Test Dashboard (Reused style from Basic Mode) */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-xl font-bold flex items-center gap-2">
              Hypothesis Test Dashboard
            </h3>
            <button onClick={copyToClipboard} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white" title="Copy Results">
              <Copy size={18} />
            </button>
          </div>

          {errorMsg ? (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
              {errorMsg}
            </div>
          ) : result && pValue !== null ? (
            <div className="space-y-6 relative z-10">
              
              {assumptionWarnings.length > 0 && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                    <AlertTriangle size={16} /> Assumption Warnings
                  </div>
                  <ul className="list-disc pl-5 text-sm text-yellow-200/80 space-y-1">
                    {assumptionWarnings.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
              )}

              <div className={`p-6 rounded-2xl border backdrop-blur-sm ${pValue < alpha ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800/80 border-slate-700'}`}>
                <div className="text-sm font-medium text-slate-400 mb-1">
                  {pValue < alpha ? 'Statistical Significance Reached' : 'Fail to Reject Null Hypothesis'}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                  p = {pValue < 0.0001 ? pValue.toExponential(4) : pValue.toFixed(4)}
                </div>
                <div className={`flex items-center gap-2 text-sm font-medium ${pValue < alpha ? 'text-green-300' : 'text-slate-300'}`}>
                  {pValue < alpha ? `Reject H₀ at α = ${alpha}` : `Cannot reject H₀ at α = ${alpha}`}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">T-Statistic</div>
                  <div className="text-xl font-bold">{result.tStat.toFixed(4)}</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Degrees of Freedom</div>
                  <div className="text-xl font-bold">{result.df % 1 === 0 ? result.df : result.df.toFixed(2)}</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Standard Error</div>
                  <div className="text-xl font-bold">{result.se.toFixed(4)}</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Cohen's d</div>
                  <div className="text-xl font-bold">{Math.abs(result.cohensD).toFixed(2)}</div>
                </div>
              </div>

              {ci && (
                <div className="bg-blue-900/20 border border-blue-500/30 p-5 rounded-2xl flex items-start gap-4">
                  <Info className="text-blue-400 shrink-0 mt-0.5" size={20} />
                  <div className="text-sm text-blue-100/80 leading-relaxed space-y-2">
                    <p>
                      <strong>{(1 - alpha) * 100}% Confidence Interval for Mean Difference:</strong><br />
                      [{ci.lower.toFixed(4)}, {ci.upper.toFixed(4)}]
                    </p>
                    <p>
                      <strong>Effect Size (Cohen's d):</strong> {Math.abs(result.cohensD).toFixed(2)} — 
                      {Math.abs(result.cohensD) < 0.2 ? " Negligible effect" : 
                       Math.abs(result.cohensD) < 0.5 ? " Small effect" : 
                       Math.abs(result.cohensD) < 0.8 ? " Medium effect" : " Large effect"}.
                    </p>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-slate-500 relative z-10">
              <p>Analysis results will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
