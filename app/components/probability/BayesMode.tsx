"use client";

import React, { useState } from "react";
import { calculateBayes, calculateConditional } from "@/lib/probabilityUtils";
import { InlineMath, BlockMath } from "@/app/components/KatexMath";
import 'katex/dist/katex.min.css';
import { LayoutGrid } from "lucide-react";
import { ProbabilityTree } from "./ProbabilityTree";

export function BayesMode() {
  const [subTab, setSubTab] = useState<"bayes" | "conditional">("bayes");
  
  // Bayes State
  const [prior, setPrior] = useState<number | "">(""); // P(A)
  const [likelihood, setLikelihood] = useState<number | "">(""); // P(B|A)
  const [evidence, setEvidence] = useState<number | "">(""); // P(B)
  const [bayesResult, setBayesResult] = useState<number | null>(null);

  // Conditional State
  const [pIntersection, setPIntersection] = useState<number | "">(""); // P(A ∩ B)
  const [pB, setPB] = useState<number | "">(""); // P(B)
  const [condResult, setCondResult] = useState<number | null>(null);

  const handleCalculateBayes = () => {
    if (prior !== "" && likelihood !== "" && evidence !== "") {
      const res = calculateBayes(Number(prior), Number(likelihood), Number(evidence));
      setBayesResult(res);
    }
  };

  const handleCalculateCond = () => {
    if (pIntersection !== "" && pB !== "") {
      const res = calculateConditional(Number(pIntersection), Number(pB));
      setCondResult(res);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Conditional Probability & Bayes' Theorem</h3>
        <p className="text-slate-600 mb-4">
          Calculate the probability of an event based on prior knowledge of conditions that might be related to the event.
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setSubTab("bayes")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${subTab === "bayes" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Bayes' Theorem
          </button>
          <button 
            onClick={() => setSubTab("conditional")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${subTab === "conditional" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Conditional Probability
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <LayoutGrid size={18} className="text-purple-600" />
            Input Values
          </h4>
          
          {subTab === "bayes" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Prior Probability <InlineMath math="P(A)" />
                </label>
                <input
                  type="number" step="0.001" min="0" max="1"
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  value={prior} onChange={(e) => setPrior(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g., 0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Likelihood <InlineMath math="P(B|A)" />
                </label>
                <input
                  type="number" step="0.001" min="0" max="1"
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  value={likelihood} onChange={(e) => setLikelihood(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g., 0.9"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Evidence Probability <InlineMath math="P(B)" />
                </label>
                <input
                  type="number" step="0.001" min="0" max="1"
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  value={evidence} onChange={(e) => setEvidence(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g., 0.05"
                />
              </div>
              <button
                onClick={handleCalculateBayes}
                disabled={prior === "" || likelihood === "" || evidence === ""}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate P(A|B)
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Intersection <InlineMath math="P(A \cap B)" />
                </label>
                <input
                  type="number" step="0.001" min="0" max="1"
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  value={pIntersection} onChange={(e) => setPIntersection(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g., 0.2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Probability of B <InlineMath math="P(B)" />
                </label>
                <input
                  type="number" step="0.001" min="0" max="1"
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  value={pB} onChange={(e) => setPB(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g., 0.5"
                />
              </div>
              <button
                onClick={handleCalculateCond}
                disabled={pIntersection === "" || pB === ""}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate P(A|B)
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {subTab === "bayes" && bayesResult !== null && (
          <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6">
            <h4 className="font-semibold text-slate-800 mb-4">Bayes' Theorem Results</h4>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <div className="text-sm font-medium text-slate-500 mb-2">Posterior Probability <InlineMath math="P(A|B)" /></div>
              <div className="text-2xl font-bold text-purple-600">
                {(bayesResult * 100).toFixed(2)}%
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Decimal: <span className="font-semibold">{bayesResult.toFixed(4)}</span>
              </div>
            </div>
            
            <div className="mt-6 border-t border-slate-200 pt-6">
              <h5 className="font-semibold text-slate-800 mb-3">Step-by-Step Solution</h5>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
                <BlockMath math={`P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}`} />
                <BlockMath math={`P(A|B) = \\frac{${likelihood} \\cdot ${prior}}{${evidence}}`} />
                <BlockMath math={`P(A|B) = \\frac{${(Number(likelihood)*Number(prior)).toFixed(4)}}{${evidence}}`} />
                <BlockMath math={`P(A|B) = ${bayesResult.toFixed(4)}`} />
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <ProbabilityTree 
                pA={Number(prior)} 
                pBgivenA={Number(likelihood)} 
                pBgivenNotA={Math.max(0, (Number(evidence) - Number(likelihood)*Number(prior)) / (1 - Number(prior)))} 
              />
            </div>
          </div>
        )}

        {subTab === "conditional" && condResult !== null && (
          <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6">
            <h4 className="font-semibold text-slate-800 mb-4">Conditional Results</h4>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <div className="text-sm font-medium text-slate-500 mb-2">Probability of A given B <InlineMath math="P(A|B)" /></div>
              <div className="text-2xl font-bold text-purple-600">
                {(condResult * 100).toFixed(2)}%
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Decimal: <span className="font-semibold">{condResult.toFixed(4)}</span>
              </div>
            </div>
            
            <div className="mt-6 border-t border-slate-200 pt-6">
              <h5 className="font-semibold text-slate-800 mb-3">Step-by-Step Solution</h5>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
                <BlockMath math={`P(A|B) = \\frac{P(A \\cap B)}{P(B)}`} />
                <BlockMath math={`P(A|B) = \\frac{${pIntersection}}{${pB}}`} />
                <BlockMath math={`P(A|B) = ${condResult.toFixed(4)}`} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
