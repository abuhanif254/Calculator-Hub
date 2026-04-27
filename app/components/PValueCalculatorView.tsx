"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
// @ts-ignore
import jstat from "jstat";

interface PValueCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function PValueCalculatorView({ calcDef }: PValueCalculatorViewProps) {
  const [testType, setTestType] = useState<"z" | "t" | "chi" | "f">("z");
  const [tails, setTails] = useState<1 | 2>(2);
  
  // Inputs
  const [zScore, setZScore] = useState<string>("");
  const [tScore, setTScore] = useState<string>("");
  const [dfT, setDfT] = useState<string>("");
  
  const [chiScore, setChiScore] = useState<string>("");
  const [dfChi, setDfChi] = useState<string>("");

  const [fScore, setFScore] = useState<string>("");
  const [dfNum, setDfNum] = useState<string>("");
  const [dfDen, setDfDen] = useState<string>("");

  const [result, setResult] = useState<{ pValue: number; interpretation: string; error?: string } | null>(null);
  const [significanceLevel, setSignificanceLevel] = useState<number>(0.05);

  const calculate = () => {
    try {
      let p: number | null = null;
      let scoreNum = 0;

      if (testType === "z") {
        scoreNum = Number(zScore);
        if (isNaN(scoreNum) || zScore === "") throw new Error("Invalid Z-score.");
        
        // Z-test
        const cdf = jstat.normal.cdf(scoreNum, 0, 1);
        p = tails === 1 
          ? (scoreNum > 0 ? 1 - cdf : cdf) 
          : 2 * (1 - jstat.normal.cdf(Math.abs(scoreNum), 0, 1));
      } 
      else if (testType === "t") {
        scoreNum = Number(tScore);
        const df = Number(dfT);
        if (isNaN(scoreNum) || tScore === "" || isNaN(df) || dfT === "" || df <= 0) throw new Error("Invalid T-score or degrees of freedom.");
        
        const cdf = jstat.studentt.cdf(scoreNum, df);
        p = tails === 1 
          ? (scoreNum > 0 ? 1 - cdf : cdf) 
          : 2 * (1 - jstat.studentt.cdf(Math.abs(scoreNum), df));
      }
      else if (testType === "chi") {
        scoreNum = Number(chiScore);
        const df = Number(dfChi);
        if (isNaN(scoreNum) || chiScore === "" || isNaN(df) || dfChi === "" || df <= 0) throw new Error("Invalid Chi-square score or degrees of freedom.");
        if (scoreNum < 0) throw new Error("Chi-square score cannot be negative.");

        const cdf = jstat.chisquare.cdf(scoreNum, df);
        p = 1 - cdf; // Chi-square is typically right-tailed
      }
      else if (testType === "f") {
        scoreNum = Number(fScore);
        const df1 = Number(dfNum);
        const df2 = Number(dfDen);
        if (isNaN(scoreNum) || fScore === "" || isNaN(df1) || dfNum === "" || df1 <= 0 || isNaN(df2) || dfDen === "" || df2 <= 0) {
          throw new Error("Invalid F-score or degrees of freedom.");
        }
        if (scoreNum < 0) throw new Error("F-score cannot be negative.");

        const cdf = jstat.centralF.cdf(scoreNum, df1, df2);
        p = 1 - cdf; // F-test is right-tailed usually for ANOVA
      }

      if (p !== null) {
        if (p < 0) p = 0;
        if (p > 1) p = 1;
        
        let interp = "";
        if (p < significanceLevel) {
          interp = "The p-value is less than your significance level. This indicates strong evidence against the null hypothesis, so you reject the null hypothesis.";
        } else {
          interp = "The p-value is greater than or equal to your significance level. This indicates weak evidence against the null hypothesis, so you fail to reject the null hypothesis.";
        }
        
        setResult({ pValue: p, interpretation: interp });
      }
    } catch (err: any) {
      setResult({ pValue: 0, interpretation: "", error: err.message || "An error occurred during calculation." });
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{calcDef.title}</h2>
        <p className="text-slate-600">{calcDef.description}</p>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Test Type</label>
            <select 
              value={testType} 
              onChange={e => {
                setTestType(e.target.value as any);
                setResult(null);
                if (e.target.value === "chi" || e.target.value === "f") {
                  setTails(1); // Typically one-tailed for these
                }
              }}
              className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="z">Z-Test</option>
              <option value="t">T-Test</option>
              <option value="chi">Chi-Square Test</option>
              <option value="f">F-Test</option>
            </select>
          </div>

          {(testType === "z" || testType === "t") && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Tails</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={tails === 1} onChange={() => setTails(1)} name="tails" className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-700">One-tailed</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={tails === 2} onChange={() => setTails(2)} name="tails" className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-700">Two-tailed</span>
                </label>
              </div>
            </div>
          )}

          {testType === "z" && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Z-Score</label>
              <input type="number" step="any" value={zScore} onChange={e => setZScore(e.target.value)} placeholder="e.g. 1.96" className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          )}

          {testType === "t" && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">T-Score</label>
                <input type="number" step="any" value={tScore} onChange={e => setTScore(e.target.value)} placeholder="e.g. 2.14" className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Degrees of Freedom (df)</label>
                <input type="number" step="any" value={dfT} onChange={e => setDfT(e.target.value)} placeholder="e.g. 14" className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </>
          )}

          {testType === "chi" && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Chi-Square Score (χ²)</label>
                <input type="number" step="any" value={chiScore} onChange={e => setChiScore(e.target.value)} placeholder="e.g. 7.81" className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Degrees of Freedom (df)</label>
                <input type="number" step="any" value={dfChi} onChange={e => setDfChi(e.target.value)} placeholder="e.g. 3" className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </>
          )}

          {testType === "f" && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">F-Score</label>
                <input type="number" step="any" value={fScore} onChange={e => setFScore(e.target.value)} placeholder="e.g. 3.24" className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Numerator Degrees of Freedom (df1)</label>
                <input type="number" step="any" value={dfNum} onChange={e => setDfNum(e.target.value)} placeholder="e.g. 2" className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Denominator Degrees of Freedom (df2)</label>
                <input type="number" step="any" value={dfDen} onChange={e => setDfDen(e.target.value)} placeholder="e.g. 27" className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </>
          )}

          <div className="space-y-2 mt-4 pt-4 border-t border-slate-200">
            <label className="block text-sm font-semibold text-slate-700">Significance Level (α)</label>
            <input 
              type="number" 
              step="0.01" 
              min="0"
              max="1"
              value={significanceLevel} 
              onChange={e => setSignificanceLevel(Number(e.target.value))}
              placeholder="e.g. 0.05"
              className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
            <p className="text-xs text-slate-500">Usually 0.05</p>
          </div>

          <button onClick={calculate} className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-colors">
            Calculate P-Value
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col justify-center border border-slate-100">
          {!result ? (
            <div className="text-slate-400 font-medium text-lg text-center">
              Enter your test statistics<br/>to calculate the p-value
            </div>
          ) : result.error ? (
            <div className="text-red-500 font-medium text-lg text-center">
              {result.error}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center pb-6 border-b border-slate-200">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">P-Value</div>
                <div className="text-4xl md:text-5xl font-extrabold text-blue-600">
                  {result.pValue < 0.00001 ? "< 0.00001" : result.pValue.toFixed(5)}
                </div>
              </div>
              <div className="space-y-4">
                <div className={`${result.pValue < significanceLevel ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"} p-4 rounded-xl border`}>
                  <div className={`text-sm font-bold ${result.pValue < significanceLevel ? "text-green-800" : "text-amber-800"} mb-1`}>
                    {result.pValue < significanceLevel ? "Statistically Significant" : "Not Statistically Significant"}
                  </div>
                  <p className={`text-sm leading-relaxed ${result.pValue < significanceLevel ? "text-green-900" : "text-amber-900"}`}>
                    {result.interpretation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
