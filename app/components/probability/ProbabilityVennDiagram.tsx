"use client";

import React from "react";
import { InlineMath } from "@/app/components/KatexMath";
import 'katex/dist/katex.min.css';

interface VennDiagramProps {
  pA: number;
  pB: number;
  pIntersection: number;
}

export function ProbabilityVennDiagram({ pA, pB, pIntersection }: VennDiagramProps) {
  // Validate inputs for Venn diagram logic
  const validPA = Math.max(0, Math.min(1, pA));
  const validPB = Math.max(0, Math.min(1, pB));
  const validIntersection = Math.max(0, Math.min(validPA, validPB, pIntersection));

  const pAOnly = validPA - validIntersection;
  const pBOnly = validPB - validIntersection;
  const pUnion = pAOnly + pBOnly + validIntersection;
  const pNeither = Math.max(0, 1 - pUnion);

  return (
    <div className="flex flex-col items-center">
      <h4 className="font-semibold text-slate-800 mb-4">Venn Diagram Visualization</h4>
      
      {/* SVG Venn Diagram Container */}
      <div className="relative w-full max-w-[400px] aspect-[4/3] bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-hidden">
        <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-sm">
          {/* Universe (Background) */}
          <rect x="5" y="5" width="190" height="140" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <text x="12" y="20" fontSize="10" fill="#64748b" fontWeight="bold">S (Universe)</text>
          <text x="12" y="140" fontSize="10" fill="#64748b">Neither: {(pNeither * 100).toFixed(1)}%</text>

          {/* Circle A */}
          <circle cx="80" cy="75" r="45" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
          {/* Circle B */}
          <circle cx="120" cy="75" r="45" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2" />

          {/* Labels */}
          {/* A only */}
          <text x="60" y="72" fontSize="10" fill="#1d4ed8" textAnchor="middle" fontWeight="bold">A Only</text>
          <text x="60" y="85" fontSize="10" fill="#1d4ed8" textAnchor="middle">{(pAOnly * 100).toFixed(1)}%</text>

          {/* B only */}
          <text x="140" y="72" fontSize="10" fill="#7e22ce" textAnchor="middle" fontWeight="bold">B Only</text>
          <text x="140" y="85" fontSize="10" fill="#7e22ce" textAnchor="middle">{(pBOnly * 100).toFixed(1)}%</text>

          {/* Intersection */}
          <text x="100" y="72" fontSize="9" fill="#4338ca" textAnchor="middle" fontWeight="bold">A ∩ B</text>
          <text x="100" y="85" fontSize="9" fill="#4338ca" textAnchor="middle">{(validIntersection * 100).toFixed(1)}%</text>
        </svg>
      </div>

      {/* Legend / Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 w-full text-sm">
        <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl">
          <div className="text-slate-500 mb-1"><InlineMath math="P(A)" /></div>
          <div className="font-bold text-blue-700">{(validPA * 100).toFixed(1)}%</div>
        </div>
        <div className="bg-purple-50 border border-purple-100 p-3 rounded-xl">
          <div className="text-slate-500 mb-1"><InlineMath math="P(B)" /></div>
          <div className="font-bold text-purple-700">{(validPB * 100).toFixed(1)}%</div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl">
          <div className="text-slate-500 mb-1"><InlineMath math="P(A \cap B)" /></div>
          <div className="font-bold text-indigo-700">{(validIntersection * 100).toFixed(1)}%</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
          <div className="text-slate-500 mb-1"><InlineMath math="P(A \cup B)" /></div>
          <div className="font-bold text-emerald-700">{(pUnion * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}
