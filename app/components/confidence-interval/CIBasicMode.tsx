'use client';

import React, { useState, useMemo } from 'react';
import { Copy, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import {
  calculateZInterval,
  calculateTInterval,
  calculateProportionCI,
  calculateTwoMeansDiffCI,
  calculateTwoPropsDiffCI,
  calculatePairedCI,
  CIResult,
} from '@/lib/math/confidenceIntervalMath';

type Mode = 'z-mean' | 't-mean' | 'proportion' | 'two-means' | 'two-props' | 'paired' | 'summary';

const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 hover:bg-slate-100 transition-colors text-base";
const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

export function CIBasicMode() {
  const [mode, setMode] = useState<Mode>('t-mean');
  const [confidenceLevel, setConfidenceLevel] = useState<string>('95');
  const [customConfidence, setCustomConfidence] = useState<string>('');
  const [precision, setPrecision] = useState<number>(4);
  const [showTechnical, setShowTechnical] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  // Inputs
  const [zMean, setZMean] = useState({ x: '', sigma: '', n: '' });
  const [tMean, setTMean] = useState({ x: '', s: '', n: '' });
  const [prop, setProp] = useState({ x: '', n: '' });
  const [twoMeans, setTwoMeans] = useState({ m1: '', s1: '', n1: '', m2: '', s2: '', n2: '', method: 'welch' as 'welch' | 'pooled' });
  const [twoProps, setTwoProps] = useState({ x1: '', n1: '', x2: '', n2: '' });
  const [paired, setPaired] = useState({ d: '', sd: '', n: '' });
  const [summary, setSummary] = useState({ est: '', se: '', n: '' });

  const currentConfidence = useMemo(() => {
    if (confidenceLevel === 'custom') {
      const parsed = parseFloat(customConfidence);
      return !isNaN(parsed) && parsed > 0 && parsed < 100 ? parsed : null;
    }
    return parseFloat(confidenceLevel);
  }, [confidenceLevel, customConfidence]);

  const result = useMemo<{ data: CIResult | null; error: string | null }>(() => {
    if (currentConfidence === null) return { data: null, error: 'Invalid confidence level' };
    
    try {
      if (mode === 'z-mean') {
        const mean = parseFloat(zMean.x);
        const sigma = parseFloat(zMean.sigma);
        const n = parseInt(zMean.n);
        if (isNaN(mean) || isNaN(sigma) || isNaN(n)) throw new Error('');
        return { data: calculateZInterval(mean, sigma, n, currentConfidence), error: null };
      }
      if (mode === 't-mean') {
        const mean = parseFloat(tMean.x);
        const s = parseFloat(tMean.s);
        const n = parseInt(tMean.n);
        if (isNaN(mean) || isNaN(s) || isNaN(n)) throw new Error('');
        return { data: calculateTInterval(mean, s, n, currentConfidence), error: null };
      }
      if (mode === 'proportion') {
        const x = parseInt(prop.x);
        const n = parseInt(prop.n);
        if (isNaN(x) || isNaN(n)) throw new Error('');
        return { data: calculateProportionCI(x, n, currentConfidence), error: null };
      }
      if (mode === 'two-means') {
        const m1 = parseFloat(twoMeans.m1), s1 = parseFloat(twoMeans.s1), n1 = parseInt(twoMeans.n1);
        const m2 = parseFloat(twoMeans.m2), s2 = parseFloat(twoMeans.s2), n2 = parseInt(twoMeans.n2);
        if (isNaN(m1) || isNaN(s1) || isNaN(n1) || isNaN(m2) || isNaN(s2) || isNaN(n2)) throw new Error('');
        return { data: calculateTwoMeansDiffCI(m1, s1, n1, m2, s2, n2, currentConfidence, twoMeans.method), error: null };
      }
      if (mode === 'two-props') {
        const x1 = parseInt(twoProps.x1), n1 = parseInt(twoProps.n1);
        const x2 = parseInt(twoProps.x2), n2 = parseInt(twoProps.n2);
        if (isNaN(x1) || isNaN(n1) || isNaN(x2) || isNaN(n2)) throw new Error('');
        return { data: calculateTwoPropsDiffCI(x1, n1, x2, n2, currentConfidence), error: null };
      }
      if (mode === 'paired') {
        const d = parseFloat(paired.d), sd = parseFloat(paired.sd), n = parseInt(paired.n);
        if (isNaN(d) || isNaN(sd) || isNaN(n)) throw new Error('');
        return { data: calculatePairedCI(d, sd, n, currentConfidence), error: null };
      }
      if (mode === 'summary') {
        const est = parseFloat(summary.est), se = parseFloat(summary.se), n = parseInt(summary.n);
        if (isNaN(est) || isNaN(se) || isNaN(n)) throw new Error('');
        // SD = SE * sqrt(n)
        const sd = se * Math.sqrt(n);
        const ci = calculateTInterval(est, sd, n, currentConfidence);
        ci.method = 'T-Interval from Summary Stats';
        return { data: ci, error: null };
      }
    } catch (err: any) {
      return { data: null, error: err.message || 'Awaiting valid inputs...' };
    }
    return { data: null, error: 'Unknown mode' };
  }, [mode, currentConfidence, zMean, tMean, prop, twoMeans, twoProps, paired, summary]);

  const modes: { id: Mode; label: string }[] = [
    { id: 'z-mean', label: 'Z-Interval (Mean)' },
    { id: 't-mean', label: 'T-Interval (Mean)' },
    { id: 'proportion', label: 'Proportion' },
    { id: 'two-means', label: 'Two Means' },
    { id: 'two-props', label: 'Two Proportions' },
    { id: 'paired', label: 'Paired Samples' },
    { id: 'summary', label: 'Summary Stats' },
  ];

  const handleCopy = () => {
    if (result.data) {
      const text = `Confidence Interval: [${result.data.lower.toFixed(precision)}, ${result.data.upper.toFixed(precision)}]\nMethod: ${result.data.method}\nPoint Estimate: ${result.data.pointEstimate.toFixed(precision)}\nMargin of Error: ${result.data.marginOfError.toFixed(precision)}`;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Mode Selector */}
      <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-thin scrollbar-thumb-slate-200">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${
              mode === m.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel - Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Confidence Level</h3>
            <div className="flex flex-wrap gap-3">
              {['90', '95', '99', 'custom'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setConfidenceLevel(lvl)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    confidenceLevel === lvl ? 'bg-[#518231] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lvl === 'custom' ? 'Custom' : `${lvl}%`}
                </button>
              ))}
            </div>
            {confidenceLevel === 'custom' && (
              <div>
                <label className={labelClass}>Custom Confidence Level (%)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="99.99"
                  value={customConfidence}
                  onChange={(e) => setCustomConfidence(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. 97.5"
                />
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Data Inputs</h3>
            
            {mode === 'z-mean' && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Sample Mean (x̄)</label>
                  <input type="number" step="any" value={zMean.x} onChange={(e) => setZMean({...zMean, x: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Population SD (σ) - Known</label>
                  <input type="number" step="any" min="0" value={zMean.sigma} onChange={(e) => setZMean({...zMean, sigma: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Sample Size (n)</label>
                  <input type="number" step="1" min="1" value={zMean.n} onChange={(e) => setZMean({...zMean, n: e.target.value})} className={inputClass} />
                </div>
              </div>
            )}

            {mode === 't-mean' && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Sample Mean (x̄)</label>
                  <input type="number" step="any" value={tMean.x} onChange={(e) => setTMean({...tMean, x: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Sample SD (s)</label>
                  <input type="number" step="any" min="0" value={tMean.s} onChange={(e) => setTMean({...tMean, s: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Sample Size (n)</label>
                  <input type="number" step="1" min="2" value={tMean.n} onChange={(e) => setTMean({...tMean, n: e.target.value})} className={inputClass} />
                </div>
                {parseInt(tMean.n) > 1 && (
                  <div className="text-sm text-slate-500 font-medium">Degrees of Freedom: {parseInt(tMean.n) - 1}</div>
                )}
              </div>
            )}

            {mode === 'proportion' && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Number of Successes (x)</label>
                  <input type="number" step="1" min="0" value={prop.x} onChange={(e) => setProp({...prop, x: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Sample Size (n)</label>
                  <input type="number" step="1" min="1" value={prop.n} onChange={(e) => setProp({...prop, n: e.target.value})} className={inputClass} />
                </div>
                {parseInt(prop.n) > 0 && parseInt(prop.x) >= 0 && (
                  <div className="text-sm text-slate-500 font-medium">Sample Proportion (p̂): {(parseInt(prop.x) / parseInt(prop.n)).toFixed(4)}</div>
                )}
              </div>
            )}

            {mode === 'two-means' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-700">Group 1</h4>
                  <div><label className={labelClass}>Mean 1</label><input type="number" step="any" value={twoMeans.m1} onChange={(e) => setTwoMeans({...twoMeans, m1: e.target.value})} className={inputClass} /></div>
                  <div><label className={labelClass}>SD 1</label><input type="number" step="any" min="0" value={twoMeans.s1} onChange={(e) => setTwoMeans({...twoMeans, s1: e.target.value})} className={inputClass} /></div>
                  <div><label className={labelClass}>n 1</label><input type="number" step="1" min="2" value={twoMeans.n1} onChange={(e) => setTwoMeans({...twoMeans, n1: e.target.value})} className={inputClass} /></div>
                </div>
                <div className="space-y-4 border-t border-slate-100 pt-4">
                  <h4 className="font-semibold text-blue-700">Group 2</h4>
                  <div><label className={labelClass}>Mean 2</label><input type="number" step="any" value={twoMeans.m2} onChange={(e) => setTwoMeans({...twoMeans, m2: e.target.value})} className={inputClass} /></div>
                  <div><label className={labelClass}>SD 2</label><input type="number" step="any" min="0" value={twoMeans.s2} onChange={(e) => setTwoMeans({...twoMeans, s2: e.target.value})} className={inputClass} /></div>
                  <div><label className={labelClass}>n 2</label><input type="number" step="1" min="2" value={twoMeans.n2} onChange={(e) => setTwoMeans({...twoMeans, n2: e.target.value})} className={inputClass} /></div>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <label className={labelClass}>Method</label>
                  <select value={twoMeans.method} onChange={(e) => setTwoMeans({...twoMeans, method: e.target.value as any})} className={inputClass}>
                    <option value="welch">Welch (Unequal Variances - Default)</option>
                    <option value="pooled">Pooled (Equal Variances)</option>
                  </select>
                </div>
              </div>
            )}

            {mode === 'two-props' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-700">Group 1</h4>
                  <div><label className={labelClass}>Successes 1</label><input type="number" step="1" min="0" value={twoProps.x1} onChange={(e) => setTwoProps({...twoProps, x1: e.target.value})} className={inputClass} /></div>
                  <div><label className={labelClass}>n 1</label><input type="number" step="1" min="1" value={twoProps.n1} onChange={(e) => setTwoProps({...twoProps, n1: e.target.value})} className={inputClass} /></div>
                </div>
                <div className="space-y-4 border-t border-slate-100 pt-4">
                  <h4 className="font-semibold text-blue-700">Group 2</h4>
                  <div><label className={labelClass}>Successes 2</label><input type="number" step="1" min="0" value={twoProps.x2} onChange={(e) => setTwoProps({...twoProps, x2: e.target.value})} className={inputClass} /></div>
                  <div><label className={labelClass}>n 2</label><input type="number" step="1" min="1" value={twoProps.n2} onChange={(e) => setTwoProps({...twoProps, n2: e.target.value})} className={inputClass} /></div>
                </div>
              </div>
            )}

            {mode === 'paired' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-500 mb-2">Enter summary statistics for paired differences (Post - Pre, etc.)</p>
                <div>
                  <label className={labelClass}>Mean of Differences (d̄)</label>
                  <input type="number" step="any" value={paired.d} onChange={(e) => setPaired({...paired, d: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>SD of Differences (s_d)</label>
                  <input type="number" step="any" min="0" value={paired.sd} onChange={(e) => setPaired({...paired, sd: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Number of Pairs (n)</label>
                  <input type="number" step="1" min="2" value={paired.n} onChange={(e) => setPaired({...paired, n: e.target.value})} className={inputClass} />
                </div>
              </div>
            )}

            {mode === 'summary' && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Point Estimate</label>
                  <input type="number" step="any" value={summary.est} onChange={(e) => setSummary({...summary, est: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Standard Error (SE)</label>
                  <input type="number" step="any" min="0" value={summary.se} onChange={(e) => setSummary({...summary, se: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Sample Size (n)</label>
                  <input type="number" step="1" min="2" value={summary.n} onChange={(e) => setSummary({...summary, n: e.target.value})} className={inputClass} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="lg:col-span-7">
          <div className="sticky top-6 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 mb-1">Results</h2>
                  <p className="text-slate-400 text-sm">Real-time calculations</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-slate-800 rounded-lg p-1">
                    <span className="text-xs text-slate-400 px-2">Decimals</span>
                    <select 
                      value={precision} 
                      onChange={(e) => setPrecision(Number(e.target.value))}
                      className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                    >
                      {[2,3,4,5,6].map(p => <option key={p} value={p} className="bg-slate-800">{p}</option>)}
                    </select>
                  </div>
                  <button onClick={handleCopy} className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-300 hover:text-white">
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {result.error && !result.data ? (
                <div className="py-12 text-center text-slate-400 border border-slate-700 border-dashed rounded-2xl">
                  {result.error}
                </div>
              ) : result.data && (
                <div className="space-y-6">
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                    <div className="text-sm font-medium text-blue-400 mb-2">{currentConfidence}% Confidence Interval</div>
                    <div className="text-3xl md:text-4xl font-bold text-white tracking-tight break-all">
                      [{result.data.lower.toFixed(precision)}, {result.data.upper.toFixed(precision)}]
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                      <div className="text-xs text-slate-400 mb-1">Point Estimate</div>
                      <div className="text-lg font-semibold">{result.data.pointEstimate.toFixed(precision)}</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                      <div className="text-xs text-slate-400 mb-1">Margin of Error</div>
                      <div className="text-lg font-semibold">±{result.data.marginOfError.toFixed(precision)}</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                      <div className="text-xs text-slate-400 mb-1">Standard Error</div>
                      <div className="text-lg font-semibold">{result.data.se.toFixed(precision)}</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                      <div className="text-xs text-slate-400 mb-1">Critical Value ({result.data.distribution}*)</div>
                      <div className="text-lg font-semibold">{result.data.criticalValue.toFixed(precision)}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-2 pt-2">
                    <span>Method: {result.data.method}</span>
                    {result.data.df !== undefined && <span>df: {result.data.df.toFixed(2)}</span>}
                    <span>Dist: {result.data.distribution}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Interpretation */}
            {result.data && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h4 className="font-bold text-blue-900 mb-2">Interpretation</h4>
                <p className="text-blue-800 text-sm">
                  We are {currentConfidence}% confident that the true population parameter lies between {result.data.lower.toFixed(precision)} and {result.data.upper.toFixed(precision)}.
                </p>
                
                <button 
                  onClick={() => setShowTechnical(!showTechnical)}
                  className="mt-3 text-xs font-semibold text-blue-600 flex items-center hover:text-blue-800 transition-colors"
                >
                  {showTechnical ? 'Hide Technical Interpretation' : 'Show Technical Interpretation'}
                  {showTechnical ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                </button>

                {showTechnical && (
                  <div className="mt-3 p-3 bg-white/60 rounded-xl text-xs text-slate-700 italic border border-blue-100">
                    Under repeated sampling, approximately {currentConfidence}% of intervals constructed using this procedure would contain the true population parameter, assuming the model assumptions are satisfied. Note that the parameter is fixed; the interval is what varies between samples.
                  </div>
                )}
              </div>
            )}

            {/* Warnings */}
            {result.data && result.data.warnings && result.data.warnings.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h4 className="font-bold text-amber-900 flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 mr-2" /> Assumptions & Warnings
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-amber-800">
                  {result.data.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Step-by-step */}
            {result.data && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setShowSteps(!showSteps)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <h4 className="font-bold text-slate-800">Step-by-Step Solution</h4>
                  {showSteps ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </button>
                
                {showSteps && (
                  <div className="p-6 space-y-4 text-sm text-slate-700">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <strong>Point Estimate:</strong> The best estimate for the parameter is {result.data.pointEstimate.toFixed(precision)}.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <strong>Alpha (α):</strong> For a {currentConfidence}% confidence level, α = {(1 - currentConfidence! / 100).toFixed(3)}.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <strong>Standard Error (SE):</strong> The standard error of the estimate is {result.data.se.toFixed(precision)}.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <div>
                        <strong>Critical Value:</strong> {result.data.distribution}* = {result.data.criticalValue.toFixed(precision)}. 
                        {result.data.df !== undefined ? ` (with df = ${result.data.df.toFixed(2)})` : ''}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">5</div>
                      <div>
                        <strong>Margin of Error (MOE):</strong> Critical Value × SE = {result.data.marginOfError.toFixed(precision)}.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">6</div>
                      <div>
                        <strong>Confidence Interval:</strong> Point Estimate ± MOE = [{result.data.lower.toFixed(precision)}, {result.data.upper.toFixed(precision)}].
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
