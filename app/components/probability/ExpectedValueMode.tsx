"use client";

import React, { useState } from "react";
import { calculateExpectedValue, probToOdds } from "@/lib/probabilityUtils";
import { InlineMath, BlockMath } from "@/app/components/KatexMath";
import 'katex/dist/katex.min.css';
import { BarChart, Plus, Trash2 } from "lucide-react";

export function ExpectedValueMode() {
  const [subTab, setSubTab] = useState<"ev" | "odds">("ev");

  // Expected Value State
  const [rows, setRows] = useState<{ outcome: string; probability: string }[]>([
    { outcome: "", probability: "" },
    { outcome: "", probability: "" }
  ]);
  const [evResult, setEvResult] = useState<number | { error: string } | null>(null);

  // Odds State
  const [probInput, setProbInput] = useState<string>("");
  const [oddsResult, setOddsResult] = useState<{ oddsFor: string; oddsAgainst: string } | null>(null);

  const addRow = () => {
    setRows([...rows, { outcome: "", probability: "" }]);
  };

  const removeRow = (index: number) => {
    if (rows.length > 2) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const updateRow = (index: number, field: "outcome" | "probability", value: string) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleCalculateEV = () => {
    const outcomes = rows.map(r => Number(r.outcome));
    const probabilities = rows.map(r => Number(r.probability));
    
    // basic validation
    if (outcomes.some(isNaN) || probabilities.some(isNaN)) {
      setEvResult({ error: "Please enter valid numbers for all fields." });
      return;
    }

    setEvResult(calculateExpectedValue(outcomes, probabilities));
  };

  const handleCalculateOdds = () => {
    const p = Number(probInput);
    if (!isNaN(p) && p >= 0 && p <= 1) {
      setOddsResult(probToOdds(p));
    } else {
      setOddsResult(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Expected Value & Odds</h3>
        <p className="text-slate-600 mb-4">
          Calculate the expected value of a discrete random variable, or convert between probability and odds.
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setSubTab("ev")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${subTab === "ev" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Expected Value
          </button>
          <button 
            onClick={() => setSubTab("odds")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${subTab === "odds" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Probability to Odds
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart size={18} className="text-emerald-600" />
            Input Values
          </h4>
          
          {subTab === "ev" ? (
            <div className="space-y-4">
              <div className="text-sm font-medium text-slate-700 mb-2">Outcomes (X) & Probabilities (P(X))</div>
              {rows.map((row, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="number" step="any"
                    className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder={`Outcome ${i+1} (e.g., 100)`}
                    value={row.outcome} onChange={(e) => updateRow(i, "outcome", e.target.value)}
                  />
                  <input
                    type="number" step="0.001" min="0" max="1"
                    className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder={`Prob ${i+1} (e.g., 0.5)`}
                    value={row.probability} onChange={(e) => updateRow(i, "probability", e.target.value)}
                  />
                  {rows.length > 2 && (
                    <button onClick={() => removeRow(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
              
              <button onClick={addRow} className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 mt-2">
                <Plus size={16} /> Add Outcome
              </button>
              
              <button
                onClick={handleCalculateEV}
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Calculate E(X)
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Probability (0 to 1) <InlineMath math="P(A)" />
                </label>
                <input
                  type="number" step="0.001" min="0" max="1"
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  value={probInput} onChange={(e) => setProbInput(e.target.value)}
                  placeholder="e.g., 0.25"
                />
              </div>
              <button
                onClick={handleCalculateOdds}
                disabled={probInput === ""}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Convert to Odds
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {subTab === "ev" && evResult !== null && (
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6">
            <h4 className="font-semibold text-slate-800 mb-4">Expected Value Results</h4>
            {typeof evResult === 'object' && evResult.error ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                {evResult.error}
              </div>
            ) : (
              <>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <div className="text-sm font-medium text-slate-500 mb-2">Expected Value <InlineMath math="E(X)" /></div>
                  <div className="text-3xl font-bold text-emerald-600">
                    {(evResult as number).toFixed(4)}
                  </div>
                </div>
                
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <h5 className="font-semibold text-slate-800 mb-3">Step-by-Step Solution</h5>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 overflow-x-auto text-sm">
                    <BlockMath math={`E(X) = \\sum x_i P(x_i)`} />
                    <BlockMath math={`E(X) = ${rows.map(r => `(${r.outcome})(${r.probability})`).join(' + ')}`} />
                    <BlockMath math={`E(X) = ${(evResult as number).toFixed(4)}`} />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {subTab === "odds" && oddsResult !== null && (
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6">
            <h4 className="font-semibold text-slate-800 mb-4">Odds Results</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="text-sm font-medium text-slate-500 mb-1">Odds For</div>
                <div className="text-2xl font-bold text-emerald-600">{oddsResult.oddsFor}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="text-sm font-medium text-slate-500 mb-1">Odds Against</div>
                <div className="text-2xl font-bold text-emerald-600">{oddsResult.oddsAgainst}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
