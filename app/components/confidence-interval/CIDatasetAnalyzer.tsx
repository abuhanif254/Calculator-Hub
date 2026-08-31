'use client';

import React, { useState, useMemo } from 'react';
import { Copy, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { parseDatasetInput, analyzeRawDataset } from '@/lib/math/confidenceIntervalMath';

export function CIDatasetAnalyzer() {
  const [mode, setMode] = useState<'single' | 'paired'>('single');
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [confLevel, setConfLevel] = useState<number>(95);
  const [customConf, setCustomConf] = useState<string>('95');
  const [precision, setPrecision] = useState<number>(4);
  const [copied, setCopied] = useState(false);

  const activeConfLevel = confLevel === -1 ? (parseFloat(customConf) || 95) : confLevel;

  const results = useMemo(() => {
    try {
      const dataA = parseDatasetInput(textA);
      
      if (mode === 'single') {
        if (dataA.length === 0) return { error: null, empty: true };
        if (dataA.length < 2) return { error: 'At least 2 data points are required.', empty: false };
        const res = analyzeRawDataset(dataA, activeConfLevel);
        return { data: dataA, stats: res.stats, ci: res.ci, error: null, empty: false };
      } else {
        const dataB = parseDatasetInput(textB);
        if (dataA.length === 0 && dataB.length === 0) return { error: null, empty: true };
        if (dataA.length !== dataB.length) return { error: `Datasets must have the same number of observations (A: ${dataA.length}, B: ${dataB.length}).`, empty: false };
        if (dataA.length < 2) return { error: 'At least 2 data pairs are required.', empty: false };
        
        const diffs = dataA.map((val, i) => val - dataB[i]);
        const res = analyzeRawDataset(diffs, activeConfLevel);
        return { data: diffs, stats: res.stats, ci: res.ci, error: null, empty: false };
      }
    } catch (e: any) {
      return { error: 'Invalid data format. Please check your inputs.', empty: false };
    }
  }, [mode, textA, textB, activeConfLevel]);

  const handleCopy = () => {
    if (!results.stats || !results.ci) return;
    const { stats, ci } = results;
    const text = `
Confidence Interval Results (${activeConfLevel}%)
--------------------------------
Point Estimate (Mean): ${stats.mean.toFixed(precision)}
Lower Bound: ${ci.lower.toFixed(precision)}
Upper Bound: ${ci.upper.toFixed(precision)}
Margin of Error: ±${ci.marginOfError.toFixed(precision)}

Dataset Statistics:
n = ${stats.n}
SD = ${stats.sd.toFixed(precision)}
SE = ${stats.se.toFixed(precision)}
Min = ${stats.min.toFixed(precision)}, Max = ${stats.max.toFixed(precision)}
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasDuplicates = results.data && new Set(results.data).size !== results.data.length;
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Raw Dataset Analysis</h2>
        
        <div className="flex gap-4 mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" checked={mode === 'single'} onChange={() => setMode('single')} className="text-[#518231] focus:ring-[#518231]" />
            <span className="text-slate-700 font-medium">Single Dataset</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" checked={mode === 'paired'} onChange={() => setMode('paired')} className="text-[#518231] focus:ring-[#518231]" />
            <span className="text-slate-700 font-medium">Paired Differences</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {mode === 'paired' ? 'Dataset A' : 'Data Values'}
            </label>
            <textarea
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm h-32"
              placeholder="e.g. 12.5, 14.2, 11.8, 15.1"
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
            />
          </div>
          {mode === 'paired' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Dataset B</label>
              <textarea
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm h-32"
                placeholder="e.g. 11.2, 13.1, 10.5, 14.0"
                value={textB}
                onChange={(e) => setTextB(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confidence Level</label>
            <div className="flex gap-2">
              {[90, 95, 99].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setConfLevel(lvl)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors \${confLevel === lvl ? 'bg-[#518231] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {lvl}%
                </button>
              ))}
              <button
                onClick={() => setConfLevel(-1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors \${confLevel === -1 ? 'bg-[#518231] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Custom
              </button>
            </div>
            {confLevel === -1 && (
              <input
                type="number"
                min="1"
                max="99.99"
                step="0.01"
                value={customConf}
                onChange={e => setCustomConf(e.target.value)}
                className="mt-2 w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#518231] focus:outline-none text-sm"
                placeholder="e.g. 97.5"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Decimal Precision</label>
            <select
              value={precision}
              onChange={(e) => setPrecision(Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            >
              {[2, 3, 4, 5, 6].map(p => (
                <option key={p} value={p}>{p} decimal places</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {results.error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{results.error}</p>
        </div>
      )}

      {results.empty && !results.error && (
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center text-slate-500">
          <Info className="w-8 h-8 mx-auto mb-3 text-slate-400" />
          <p>Enter your dataset values above to see the analysis.</p>
        </div>
      )}

      {results.stats && results.ci && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-[#518231]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">Confidence Interval Results</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col justify-center items-center text-center col-span-1 lg:col-span-2">
                <p className="text-sm font-semibold text-blue-800 mb-1">{activeConfLevel}% Confidence Interval</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-2xl font-bold text-blue-950">
                    [{results.ci.lower.toFixed(precision)}, {results.ci.upper.toFixed(precision)}]
                  </span>
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  Margin of Error: ±{results.ci.marginOfError.toFixed(precision)}
                </p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Point Estimate:</span>
                  <span className="font-semibold">{results.ci.pointEstimate.toFixed(precision)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Critical {results.ci.distribution} Value:</span>
                  <span className="font-semibold">{results.ci.criticalValue.toFixed(precision)}</span>
                </div>
                {results.ci.df !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Degrees of Freedom:</span>
                    <span className="font-semibold">{results.ci.df}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-slate-700 text-sm leading-relaxed mb-6">
              <span className="font-semibold">Interpretation: </span>
              We are {activeConfLevel}% confident that the true {mode === 'paired' ? 'mean difference' : 'population mean'} falls between {results.ci.lower.toFixed(precision)} and {results.ci.upper.toFixed(precision)}.
              This interval was calculated using the {results.ci.distribution}-distribution method.
            </div>

            <h4 className="font-semibold text-slate-800 mb-4 border-b pb-2">Dataset Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-xs text-slate-500 uppercase font-semibold">Count (n)</span>
                <span className="block text-lg font-bold text-slate-800">{results.stats.n}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-xs text-slate-500 uppercase font-semibold">Mean</span>
                <span className="block text-lg font-bold text-slate-800">{results.stats.mean.toFixed(precision)}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-xs text-slate-500 uppercase font-semibold">Median</span>
                <span className="block text-lg font-bold text-slate-800">{results.stats.median.toFixed(precision)}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-xs text-slate-500 uppercase font-semibold">Standard Dev</span>
                <span className="block text-lg font-bold text-slate-800">{results.stats.sd.toFixed(precision)}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-xs text-slate-500 uppercase font-semibold">Standard Error</span>
                <span className="block text-lg font-bold text-slate-800">{results.stats.se.toFixed(precision)}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-xs text-slate-500 uppercase font-semibold">Variance</span>
                <span className="block text-lg font-bold text-slate-800">{results.stats.variance.toFixed(precision)}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-xs text-slate-500 uppercase font-semibold">Minimum</span>
                <span className="block text-lg font-bold text-slate-800">{results.stats.min.toFixed(precision)}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-xs text-slate-500 uppercase font-semibold">Maximum</span>
                <span className="block text-lg font-bold text-slate-800">{results.stats.max.toFixed(precision)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              {results.stats.n < 30 && (
                <div className="flex items-center gap-2 text-amber-700 text-sm bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>Small sample size (n &lt; 30). T-distribution is used, but results assume the population is normally distributed.</span>
                </div>
              )}
              {hasDuplicates && (
                <div className="flex items-center gap-2 text-blue-700 text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <Info className="w-5 h-5 shrink-0" />
                  <span>Duplicate values were detected in your dataset. Detected N={results.stats.n} values.</span>
                </div>
              )}
              {results.ci.warnings && results.ci.warnings.map((w, i) => (
                <div key={i} className="flex items-center gap-2 text-amber-700 text-sm bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
