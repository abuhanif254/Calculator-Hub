"use client";

import React, { useState } from "react";
import { analyzeDataset, solveForZ, detectOutlier, normalCDF, DatasetStats } from "@/lib/math/zScoreMath";
import { Table, Copy, AlertTriangle, CheckCircle2 } from "lucide-react";

export function ZScoreDatasetMode() {
  const [inputData, setInputData] = useState<string>("");
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [results, setResults] = useState<{ val: number, z: number, outlier: string, p: number }[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = () => {
    setErrorMsg("");
    setStats(null);
    setResults([]);

    if (!inputData.trim()) {
      setErrorMsg("Please enter a dataset.");
      return;
    }

    // Parse data: split by commas, spaces, or newlines
    const rawVals = inputData
      .split(/[\s,]+/)
      .map(v => parseFloat(v))
      .filter(v => !isNaN(v));

    if (rawVals.length === 0) {
      setErrorMsg("No valid numbers found in the input.");
      return;
    }
    if (rawVals.length < 2) {
      setErrorMsg("Please enter at least 2 numbers for dataset analysis.");
      return;
    }

    const calculatedStats = analyzeDataset(rawVals);
    if (!calculatedStats) return;
    
    // We default to Sample SD for bulk data Z-scores unless specified, 
    // but typically standard scores use population SD if it's the whole dataset.
    // We'll use Sample SD to match typical textbook problems, but we show both.
    const sd = calculatedStats.sampleSD;

    if (sd === 0) {
      setErrorMsg("Standard Deviation is zero. All values are identical; Z-scores cannot be computed.");
      return;
    }

    const itemResults = rawVals.map(val => {
      const z = solveForZ(val, calculatedStats.mean, sd);
      const outlier = detectOutlier(z);
      const p = normalCDF(z);
      return { val, z, outlier, p };
    });

    setStats(calculatedStats);
    setResults(itemResults);
  };

  const outlierCount = results.filter(r => r.outlier !== "Normal").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Inputs */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Dataset Input</h3>
          <p className="text-sm text-slate-500 mb-4">Paste a list of numbers separated by commas, spaces, or newlines.</p>
          
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full h-48 p-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="e.g. 45, 52, 61, 78, 41, 99, 54, 49"
          ></textarea>
          
          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
              {errorMsg}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Table size={18} />
            Analyze Dataset
          </button>
        </div>
      </div>

      {/* Right Column: Dashboard */}
      <div className="lg:col-span-7">
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white h-full shadow-xl relative overflow-hidden flex flex-col">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
          
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6 relative z-10">
            <Table className="text-blue-400" />
            Dataset Analytics
          </h3>

          {!stats ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 relative z-10">
              <Table size={48} className="mb-4 opacity-20" />
              <p>Paste a dataset and click analyze</p>
            </div>
          ) : (
            <div className="relative z-10 flex-1 flex flex-col">
              {/* Summary Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-xs font-semibold mb-1">Count (N)</div>
                  <div className="text-xl font-bold">{stats.n}</div>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-xs font-semibold mb-1">Mean (μ)</div>
                  <div className="text-xl font-bold">{stats.mean.toFixed(2)}</div>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-xs font-semibold mb-1">Sample SD (s)</div>
                  <div className="text-xl font-bold">{stats.sampleSD.toFixed(2)}</div>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-xs font-semibold mb-1">Pop SD (σ)</div>
                  <div className="text-xl font-bold">{stats.popSD.toFixed(2)}</div>
                </div>
              </div>

              {/* Advanced Stats */}
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-6 bg-slate-800/30 p-3 rounded-lg">
                <div><strong>Median:</strong> {stats.median}</div>
                <div><strong>Range:</strong> {stats.range}</div>
                <div><strong>Skewness:</strong> {stats.skewness.toFixed(2)}</div>
                <div><strong>Kurtosis:</strong> {stats.kurtosis.toFixed(2)}</div>
              </div>

              {/* Alerts */}
              {outlierCount > 0 ? (
                <div className="bg-yellow-500/20 border border-yellow-500/30 p-4 rounded-xl flex items-start gap-3 mb-6">
                  <AlertTriangle className="text-yellow-400 shrink-0 mt-0.5" size={18} />
                  <div className="text-sm text-yellow-200/90">
                    <strong>{outlierCount} Potential Outliers Detected:</strong> {outlierCount} data point{outlierCount > 1 ? 's' : ''} have a Z-score with an absolute value greater than 2.
                  </div>
                </div>
              ) : (
                <div className="bg-green-500/20 border border-green-500/30 p-4 rounded-xl flex items-start gap-3 mb-6">
                  <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={18} />
                  <div className="text-sm text-green-200/90">
                    <strong>Normal Distribution:</strong> No significant outliers detected (all |Z| &lt; 2).
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden flex-1 flex flex-col min-h-[300px]">
                <div className="overflow-x-auto overflow-y-auto max-h-[350px] custom-scrollbar">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-800/80 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Value (x)</th>
                        <th className="px-4 py-3 font-semibold">Z-Score (z)</th>
                        <th className="px-4 py-3 font-semibold">Percentile</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {results.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-4 py-3 font-medium text-white">{r.val}</td>
                          <td className={`px-4 py-3 font-mono ${r.z < 0 ? 'text-red-300' : r.z > 0 ? 'text-green-300' : 'text-slate-300'}`}>
                            {r.z > 0 ? '+' : ''}{r.z.toFixed(3)}
                          </td>
                          <td className="px-4 py-3 text-slate-300">{(r.p * 100).toFixed(1)}%</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              r.outlier === 'Normal' ? 'bg-slate-700 text-slate-300' :
                              r.outlier === 'Moderately Unusual' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-red-500/20 text-red-300'
                            }`}>
                              {r.outlier}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
