"use client";

import React from "react";
import { InlineMath } from "@/app/components/KatexMath";
import 'katex/dist/katex.min.css';

interface ProbabilityTreeProps {
  pA: number; // Prior P(A)
  pBgivenA: number; // Likelihood P(B|A)
  pBgivenNotA: number; // Likelihood P(B|A')
}

export function ProbabilityTree({ pA, pBgivenA, pBgivenNotA }: ProbabilityTreeProps) {
  // Compute the complementary probabilities
  const pNotA = Math.max(0, 1 - pA);
  const pNotBgivenA = Math.max(0, 1 - pBgivenA);
  const pNotBgivenNotA = Math.max(0, 1 - pBgivenNotA);

  // Compute final path probabilities
  const pAandB = pA * pBgivenA;
  const pAandNotB = pA * pNotBgivenA;
  const pNotAandB = pNotA * pBgivenNotA;
  const pNotAandNotB = pNotA * pNotBgivenNotA;

  return (
    <div className="flex flex-col items-center">
      <h4 className="font-semibold text-slate-800 mb-4">Probability Tree Visualization</h4>
      
      <div className="w-full max-w-[600px] overflow-x-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 hide-scrollbar">
        <div className="min-w-[500px] h-[300px]">
          <svg viewBox="0 0 500 300" className="w-full h-full drop-shadow-sm">
            {/* Start Node */}
            <circle cx="40" cy="150" r="6" fill="#334155" />
            <text x="30" y="154" fontSize="12" fill="#334155" textAnchor="end" fontWeight="bold">Start</text>

            {/* Level 1: A and A' */}
            {/* Lines to Level 1 */}
            <path d="M 40 150 L 160 75" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <path d="M 40 150 L 160 225" stroke="#94a3b8" strokeWidth="2" fill="none" />
            
            {/* Level 1 Node A */}
            <circle cx="160" cy="75" r="24" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="160" y="79" fontSize="14" fill="#1d4ed8" textAnchor="middle" fontWeight="bold">A</text>
            <rect x="80" y="85" width="40" height="18" fill="white" rx="4" />
            <text x="100" y="98" fontSize="10" fill="#475569" textAnchor="middle">{(pA * 100).toFixed(1)}%</text>

            {/* Level 1 Node A' */}
            <circle cx="160" cy="225" r="24" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <text x="160" y="229" fontSize="14" fill="#475569" textAnchor="middle" fontWeight="bold">A'</text>
            <rect x="80" y="195" width="40" height="18" fill="white" rx="4" />
            <text x="100" y="208" fontSize="10" fill="#475569" textAnchor="middle">{(pNotA * 100).toFixed(1)}%</text>

            {/* Level 2: From A to B and B' */}
            <path d="M 184 75 L 320 35" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <path d="M 184 75 L 320 115" stroke="#94a3b8" strokeWidth="2" fill="none" />
            
            <circle cx="320" cy="35" r="24" fill="#faf5ff" stroke="#a855f7" strokeWidth="2" />
            <text x="320" y="39" fontSize="14" fill="#7e22ce" textAnchor="middle" fontWeight="bold">B</text>
            <rect x="235" y="30" width="40" height="18" fill="white" rx="4" />
            <text x="255" y="43" fontSize="10" fill="#475569" textAnchor="middle">{(pBgivenA * 100).toFixed(1)}%</text>

            <circle cx="320" cy="115" r="24" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <text x="320" y="119" fontSize="14" fill="#475569" textAnchor="middle" fontWeight="bold">B'</text>
            <rect x="235" y="100" width="40" height="18" fill="white" rx="4" />
            <text x="255" y="113" fontSize="10" fill="#475569" textAnchor="middle">{(pNotBgivenA * 100).toFixed(1)}%</text>

            {/* Level 2: From A' to B and B' */}
            <path d="M 184 225 L 320 185" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <path d="M 184 225 L 320 265" stroke="#94a3b8" strokeWidth="2" fill="none" />
            
            <circle cx="320" cy="185" r="24" fill="#faf5ff" stroke="#a855f7" strokeWidth="2" />
            <text x="320" y="189" fontSize="14" fill="#7e22ce" textAnchor="middle" fontWeight="bold">B</text>
            <rect x="235" y="180" width="40" height="18" fill="white" rx="4" />
            <text x="255" y="193" fontSize="10" fill="#475569" textAnchor="middle">{(pBgivenNotA * 100).toFixed(1)}%</text>

            <circle cx="320" cy="265" r="24" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <text x="320" y="269" fontSize="14" fill="#475569" textAnchor="middle" fontWeight="bold">B'</text>
            <rect x="235" y="250" width="40" height="18" fill="white" rx="4" />
            <text x="255" y="263" fontSize="10" fill="#475569" textAnchor="middle">{(pNotBgivenNotA * 100).toFixed(1)}%</text>

            {/* Final Outcomes */}
            <text x="370" y="39" fontSize="12" fill="#334155" fontWeight="bold">P(A ∩ B) = {(pAandB * 100).toFixed(1)}%</text>
            <text x="370" y="119" fontSize="12" fill="#334155" fontWeight="bold">P(A ∩ B') = {(pAandNotB * 100).toFixed(1)}%</text>
            <text x="370" y="189" fontSize="12" fill="#334155" fontWeight="bold">P(A' ∩ B) = {(pNotAandB * 100).toFixed(1)}%</text>
            <text x="370" y="269" fontSize="12" fill="#334155" fontWeight="bold">P(A' ∩ B') = {(pNotAandNotB * 100).toFixed(1)}%</text>
            
            {/* Total Check */}
            <line x1="360" y1="285" x2="480" y2="285" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 2" />
            <text x="420" y="296" fontSize="10" fill="#94a3b8" textAnchor="middle">Sum = 100%</text>
          </svg>
        </div>
      </div>
      
      <div className="text-xs text-slate-500 mt-3 text-center">
        The tree visualizes the sequential probabilities. Multiply along the branches to find the joint probabilities.
      </div>
    </div>
  );
}
