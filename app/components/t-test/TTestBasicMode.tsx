"use client";

import React, { useState } from "react";
import {
  oneSampleTTest,
  independentTTest,
  welchsTTest,
  pairedTTest,
  calculatePValue,
  calculateConfidenceInterval
} from "@/lib/math/tTestMath";
import { Copy, Info, Activity, Calculator, AlertTriangle } from "lucide-react";

type TTestMode = "one-sample" | "independent" | "paired";

export function TTestBasicMode() {
  const [mode, setMode] = useState<TTestMode>("independent");

  // Alpha and Tails
  const [alpha, setAlpha] = useState<number>(0.05);
  const [tails, setTails] = useState<1 | 2>(2);

  // One Sample Inputs
  const [popMean, setPopMean] = useState<string>("0");
  
  // Group 1 / Differences Inputs
  const [mean1, setMean1] = useState<string>("");
  const [sd1, setSd1] = useState<string>("");
  const [n1, setN1] = useState<string>("");

  // Group 2 Inputs
  const [mean2, setMean2] = useState<string>("");
  const [sd2, setSd2] = useState<string>("");
  const [n2, setN2] = useState<string>("");

  const [assumeEqualVariance, setAssumeEqualVariance] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Calculation variables
  let result: any = null;
  let pValue: number | null = null;
  let ci: any = null;
  let errorMsg = "";
  let assumptionWarnings: string[] = [];

  try {
    const m1 = parseFloat(mean1);
    const s1 = parseFloat(sd1);
    const num1 = parseInt(n1, 10);

    const m2 = parseFloat(mean2);
    const s2 = parseFloat(sd2);
    const num2 = parseInt(n2, 10);

    const pM = parseFloat(popMean);

    if (mode === "one-sample" && !isNaN(m1) && !isNaN(s1) && !isNaN(num1) && !isNaN(pM)) {
      if (num1 < 30) assumptionWarnings.push("Sample size n < 30. Ensure data is approximately normally distributed.");
      result = oneSampleTTest(m1, pM, s1, num1);
      pValue = calculatePValue(result.tStat, result.df, tails);
      ci = calculateConfidenceInterval(m1 - pM, result.se, result.df, alpha);
    } 
    else if (mode === "paired" && !isNaN(m1) && !isNaN(s1) && !isNaN(num1)) {
      if (num1 < 30) assumptionWarnings.push("Sample size n < 30. Ensure differences are approximately normally distributed.");
      result = pairedTTest(m1, s1, num1);
      pValue = calculatePValue(result.tStat, result.df, tails);
      ci = calculateConfidenceInterval(m1, result.se, result.df, alpha);
    }
    else if (mode === "independent" && !isNaN(m1) && !isNaN(s1) && !isNaN(num1) && !isNaN(m2) && !isNaN(s2) && !isNaN(num2)) {
      if (num1 < 30 || num2 < 30) assumptionWarnings.push("Sample sizes are small (n < 30). Ensure populations are approximately normal.");
      
      // Check variance ratio rule of thumb (max var / min var > 4)
      const var1 = s1 * s1;
      const var2 = s2 * s2;
      const ratio = Math.max(var1, var2) / Math.min(var1, var2);
      if (assumeEqualVariance && ratio > 3) {
        assumptionWarnings.push("Variances appear unequal (ratio > 3). Consider unchecking 'Assume Equal Variance' (Welch's Test).");
      }

      if (assumeEqualVariance) {
        result = independentTTest(m1, s1, num1, m2, s2, num2);
      } else {
        result = welchsTTest(m1, s1, num1, m2, s2, num2);
      }
      pValue = calculatePValue(result.tStat, result.df, tails);
      ci = calculateConfidenceInterval(m1 - m2, result.se, result.df, alpha);
    }
  } catch (err: any) {
    errorMsg = err.message || "Invalid input parameters.";
  }

  const copyToClipboard = () => {
    if (result && pValue !== null) {
      navigator.clipboard.writeText(
        `T-Statistic: ${result.tStat.toFixed(4)}\np-value: ${pValue.toExponential(4)}\ndf: ${result.df.toFixed(2)}`
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">T-Test Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Test Type</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as TTestMode)}
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
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0.01}>0.01 (99%)</option>
                  <option value={0.05}>0.05 (95%)</option>
                  <option value={0.10}>0.10 (90%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {mode === "one-sample" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Population Mean (Hypothesized μ)</label>
              <input
                type="number"
                step="any"
                value={popMean}
                onChange={(e) => setPopMean(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <h4 className="font-semibold text-slate-700">
              {mode === "one-sample" ? "Sample Data" : mode === "paired" ? "Differences Data" : "Sample 1 Data"}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Mean {mode==="paired" && "(d̄)"}</label>
                <input type="number" step="any" value={mean1} onChange={(e) => setMean1(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="x̄" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Std Dev</label>
                <input type="number" step="any" value={sd1} onChange={(e) => setSd1(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="s" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Sample Size</label>
                <input type="number" min="2" value={n1} onChange={(e) => setN1(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="n" />
              </div>
            </div>
          </div>

          {mode === "independent" && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <h4 className="font-semibold text-slate-700">Sample 2 Data</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Mean</label>
                  <input type="number" step="any" value={mean2} onChange={(e) => setMean2(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="x̄2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Std Dev</label>
                  <input type="number" step="any" value={sd2} onChange={(e) => setSd2(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="s2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Sample Size</label>
                  <input type="number" min="2" value={n2} onChange={(e) => setN2(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="n2" />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={assumeEqualVariance} 
                    onChange={(e) => setAssumeEqualVariance(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-slate-700 font-medium">Assume Equal Variances (Student's t-test)</span>
                </label>
                {!assumeEqualVariance && (
                  <p className="text-xs text-slate-500 ml-6 mt-1">Using Welch's t-test for unequal variances.</p>
                )}
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Results Dashboard */}
      <div className="lg:col-span-7">
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white h-full shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Activity className="text-blue-400" />
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
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 relative z-10">
              <Calculator size={48} className="mb-4 opacity-20" />
              <p>Enter data parameters to run the t-test</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
