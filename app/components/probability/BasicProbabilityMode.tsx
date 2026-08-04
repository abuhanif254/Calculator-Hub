"use client";

import React, { useState } from "react";
import { calculateBasicProbability } from "@/lib/probabilityUtils";
import { InlineMath, BlockMath } from "@/app/components/KatexMath";
import 'katex/dist/katex.min.css';
import { Calculator } from "lucide-react";
import { ProbabilityVennDiagram } from "./ProbabilityVennDiagram";

export function BasicProbabilityMode() {
  const [pA, setPA] = useState<number | "">("");
  const [pB, setPB] = useState<number | "">("");
  const [pIntersection, setPIntersection] = useState<number | "">("");

  const handleReset = () => {
    setPA("");
    setPB("");
    setPIntersection("");
  };

  const showVenn = pA !== "" && pB !== "" && pIntersection !== "";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Basic Probability & Events</h3>
        <p className="text-slate-600">
          Calculate the probability of a single event occurring. Enter the number of favorable outcomes and the total possible outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calculator size={18} className="text-blue-600" />
            Input Values
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Probability of A <InlineMath math="P(A)" />
              </label>
              <input
                type="number" step="0.001" min="0" max="1"
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={pA}
                onChange={(e) => setPA(e.target.value ? Number(e.target.value) : "")}
                placeholder="e.g., 0.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Probability of B <InlineMath math="P(B)" />
              </label>
              <input
                type="number" step="0.001" min="0" max="1"
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={pB}
                onChange={(e) => setPB(e.target.value ? Number(e.target.value) : "")}
                placeholder="e.g., 0.4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Intersection <InlineMath math="P(A \cap B)" />
              </label>
              <input
                type="number" step="0.001" min="0" max="1"
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={pIntersection}
                onChange={(e) => setPIntersection(e.target.value ? Number(e.target.value) : "")}
                placeholder="e.g., 0.2"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={handleReset}
                className="w-full px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {showVenn && (
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
            <ProbabilityVennDiagram pA={Number(pA)} pB={Number(pB)} pIntersection={Number(pIntersection)} />
          </div>
        )}
      </div>
    </div>
  );
}
