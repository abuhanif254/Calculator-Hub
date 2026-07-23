"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

type CalculationMode = 
  | "general_stoichiometry" 
  | "equation_balancer" 
  | "mole_ratio" 
  | "mass_to_mass" 
  | "mass_to_mole" 
  | "mole_to_mass" 
  | "particle_stoichiometry" 
  | "limiting_reactant" 
  | "excess_reactant" 
  | "theoretical_yield" 
  | "actual_yield" 
  | "percent_yield" 
  | "solution_stoichiometry" 
  | "titration_stoichiometry" 
  | "gas_stoichiometry";

interface PresetReaction {
  id: string;
  name: string;
  equation: string;
  reactants: { formula: string; coeff: number; molarMass: number }[];
  products: { formula: string; coeff: number; molarMass: number }[];
  atoms: { element: string; reactantCount: number; productCount: number }[];
}

const PRESET_REACTIONS: PresetReaction[] = [
  {
    id: "water_synthesis",
    name: "Synthesis of Water (2H₂ + O₂ → 2H₂O)",
    equation: "2H₂ + O₂ → 2H₂O",
    reactants: [
      { formula: "H₂", coeff: 2, molarMass: 2.016 },
      { formula: "O₂", coeff: 1, molarMass: 31.998 }
    ],
    products: [
      { formula: "H₂O", coeff: 2, molarMass: 18.015 }
    ],
    atoms: [
      { element: "H", reactantCount: 4, productCount: 4 },
      { element: "O", reactantCount: 2, productCount: 2 }
    ]
  },
  {
    id: "methane_combustion",
    name: "Combustion of Methane (CH₄ + 2O₂ → CO₂ + 2H₂O)",
    equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    reactants: [
      { formula: "CH₄", coeff: 1, molarMass: 16.04 },
      { formula: "O₂", coeff: 2, molarMass: 31.998 }
    ],
    products: [
      { formula: "CO₂", coeff: 1, molarMass: 44.01 },
      { formula: "H₂O", coeff: 2, molarMass: 18.015 }
    ],
    atoms: [
      { element: "C", reactantCount: 1, productCount: 1 },
      { element: "H", reactantCount: 4, productCount: 4 },
      { element: "O", reactantCount: 4, productCount: 4 }
    ]
  },
  {
    id: "haber_process",
    name: "Haber Ammonia Process (N₂ + 3H₂ → 2NH₃)",
    equation: "N₂ + 3H₂ → 2NH₃",
    reactants: [
      { formula: "N₂", coeff: 1, molarMass: 28.014 },
      { formula: "H₂", coeff: 3, molarMass: 2.016 }
    ],
    products: [
      { formula: "NH₃", coeff: 2, molarMass: 17.031 }
    ],
    atoms: [
      { element: "N", reactantCount: 2, productCount: 2 },
      { element: "H", reactantCount: 6, productCount: 6 }
    ]
  },
  {
    id: "neutralization",
    name: "Acid-Base Neutralization (HCl + NaOH → NaCl + H₂O)",
    equation: "HCl + NaOH → NaCl + H₂O",
    reactants: [
      { formula: "HCl", coeff: 1, molarMass: 36.46 },
      { formula: "NaOH", coeff: 1, molarMass: 39.997 }
    ],
    products: [
      { formula: "NaCl", coeff: 1, molarMass: 58.44 },
      { formula: "H₂O", coeff: 1, molarMass: 18.015 }
    ],
    atoms: [
      { element: "H", reactantCount: 2, productCount: 2 },
      { element: "Cl", reactantCount: 1, productCount: 1 },
      { element: "Na", reactantCount: 1, productCount: 1 },
      { element: "O", reactantCount: 1, productCount: 1 }
    ]
  }
];

export function StoichiometryCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("general_stoichiometry");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("water_synthesis");

  // Reactant Inputs
  const [r1Mass, setR1Mass] = useState<number>(10.0); // 10 g H2
  const [r2Mass, setR2Mass] = useState<number>(32.0); // 32 g O2
  const [actualYieldGrams, setActualYieldGrams] = useState<number>(30.0); // 30 g H2O actual yield

  // Solution Stoichiometry Inputs
  const [molarityM, setMolarityM] = useState<number>(1.0); // 1.0 M
  const [volLiters, setVolLiters] = useState<number>(0.5); // 0.5 L

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"matrix" | "yield_chart" | "flashcards" | "quiz">("matrix");

  // Flashcards State
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{ q: string; correctAnswer: number; units: string } | null>(null);
  const [quizUserAnswer, setQuizUserAnswer] = useState<string>("");
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);

  // Notification Banner
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setIsClient(true);
    generateQuiz();
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const selectedPreset = useMemo(() => {
    return PRESET_REACTIONS.find(p => p.id === selectedPresetId) || PRESET_REACTIONS[0];
  }, [selectedPresetId]);

  // Main Calculations Engine
  const results = useMemo(() => {
    const rxn = selectedPreset;
    const r1 = rxn.reactants[0];
    const r2 = rxn.reactants[1] || rxn.reactants[0];
    const p1 = rxn.products[0];

    // Moles available
    const r1Moles = r1.molarMass > 0 ? r1Mass / r1.molarMass : 0;
    const r2Moles = r2.molarMass > 0 ? r2Mass / r2.molarMass : 0;

    // Stoichiometric equivalence ratio (moles / coeff)
    const r1Ratio = r1Moles / r1.coeff;
    const r2Ratio = r2Moles / r2.coeff;

    // Identify Limiting Reactant
    let limitingReactantFormula = r1.formula;
    let excessReactantFormula = r2.formula;
    let maxProductMoles = r1Ratio * p1.coeff;

    if (rxn.reactants.length > 1 && r2Ratio < r1Ratio) {
      limitingReactantFormula = r2.formula;
      excessReactantFormula = r1.formula;
      maxProductMoles = r2Ratio * p1.coeff;
    }

    // Theoretical Yield
    const theoreticalYieldGrams = maxProductMoles * p1.molarMass;

    // Percent Yield
    const percentYieldPct = theoreticalYieldGrams > 0 ? (actualYieldGrams / theoreticalYieldGrams) * 100 : 0;

    // Excess Reactant Consumed & Remaining
    const isR1Limiting = limitingReactantFormula === r1.formula;
    const limitingMoles = isR1Limiting ? r1Moles : r2Moles;
    const limitingCoeff = isR1Limiting ? r1.coeff : r2.coeff;

    const excessInitialMoles = isR1Limiting ? r2Moles : r1Moles;
    const excessCoeff = isR1Limiting ? r2.coeff : r1.coeff;
    const excessMolarMass = isR1Limiting ? r2.molarMass : r1.molarMass;

    const excessConsumedMoles = limitingMoles * (excessCoeff / limitingCoeff);
    const excessRemainingMoles = Math.max(0, excessInitialMoles - excessConsumedMoles);
    const excessRemainingGrams = excessRemainingMoles * excessMolarMass;

    // Solution Stoichiometry
    const solutionMoles = molarityM * volLiters;
    const solutionProductGrams = (solutionMoles * (p1.coeff / r1.coeff)) * p1.molarMass;

    return {
      r1Moles,
      r2Moles,
      limitingReactantFormula,
      excessReactantFormula,
      maxProductMoles,
      theoreticalYieldGrams,
      percentYieldPct,
      excessConsumedMoles,
      excessRemainingMoles,
      excessRemainingGrams,
      solutionMoles,
      solutionProductGrams
    };
  }, [selectedPreset, r1Mass, r2Mass, actualYieldGrams, molarityM, volLiters]);

  // Recharts Yield Chart Data
  const chartData = [
    { name: "Theoretical Yield", grams: Number(results.theoreticalYieldGrams.toFixed(2)) },
    { name: "Actual Yield", grams: Number(actualYieldGrams.toFixed(2)) }
  ];

  // Flashcards Data
  const flashcards = [
    { title: "Stoichiometric Coefficients", desc: "Coefficients in a balanced equation represent the exact mole ratios in which reactants react and products form." },
    { title: "Limiting Reactant", desc: "The limiting reactant is completely consumed first in a chemical reaction, determining maximum product yield." },
    { title: "Theoretical Yield", desc: "The maximum amount of product that can be generated assuming 100% reaction efficiency and zero loss." },
    { title: "Percent Yield", desc: "Percent Yield = (Actual Yield / Theoretical Yield) × 100%. Measures laboratory reaction efficiency." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Stoichiometry Reaction Analysis Summary (${selectedPreset.equation})
-----------------------------------------
Selected Reaction: ${selectedPreset.name}
Limiting Reactant: ${results.limitingReactantFormula}
Excess Reactant: ${results.excessReactantFormula} (Remaining: ${results.excessRemainingGrams.toFixed(2)} g)
Theoretical Yield (${selectedPreset.products[0].formula}): ${results.theoreticalYieldGrams.toFixed(2)} g
Actual Yield (${selectedPreset.products[0].formula}): ${actualYieldGrams.toFixed(2)} g
Percent Yield: ${results.percentYieldPct.toFixed(2)}%
-----------------------------------------
Mole Ratios: ${selectedPreset.reactants.map(r => `${r.coeff} mol ${r.formula}`).join(" : ")} → ${selectedPreset.products.map(p => `${p.coeff} mol ${p.formula}`).join(" : ")}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Stoichiometry analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "In 2H₂ + O₂ → 2H₂O, how many moles of H₂O are produced from 4 moles of H₂?", correctAnswer: 4.0, units: "moles" },
      { q: "If the theoretical yield of a reaction is 50.0 g and 40.0 g of product is recovered, what is the Percent Yield?", correctAnswer: 80.0, units: "%" },
      { q: "What is the molar mass of H₂O?", correctAnswer: 18.015, units: "g/mol" }
    ];

    const rand = questions[Math.floor(Math.random() * questions.length)];
    setQuizQuestion(rand);
    setQuizUserAnswer("");
    setQuizChecked(false);
  };

  const handleCheckQuiz = () => {
    if (!quizQuestion) return;
    const userVal = parseFloat(quizUserAnswer);
    const diff = Math.abs(userVal - quizQuestion.correctAnswer);
    setQuizIsCorrect(diff < 0.05);
    setQuizChecked(true);
  };

  return (
    <div className="w-full">
      {/* Notification Banner */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm transition-all duration-300 ${
          notification.type === "success" 
            ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200" 
            : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
        }`}>
          <CheckCircle2 size={18} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* 🔄 Chemistry Hub Top Pill Navigation */}
      <div className="bg-slate-100 dark:bg-slate-900/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex items-center justify-between overflow-x-auto gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 flex items-center gap-1.5 shrink-0">
          <FlaskConical size={14} className="text-[#518231]" />
          Chemistry Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Stoichiometry Solver
          </span>
          <Link href="/calculators/mole-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Mole Solver
          </Link>
          <Link href="/calculators/molar-mass-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molar Mass
          </Link>
          <Link href="/calculators/molarity-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molarity
          </Link>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Cockpit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GitCommit className="text-[#518231]" />
                Reaction Cockpit
              </h2>

              <button
                type="button"
                onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isAdvancedMode 
                    ? "bg-[#518231]/10 text-[#518231] border-[#518231]/30 dark:bg-[#518231]/20" 
                    : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                }`}
              >
                <Sliders size={13} />
                {isAdvancedMode ? "Advanced Mode" : "Simple Mode"}
              </button>
            </div>

            {/* Select Chemical Reaction Preset */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Chemical Reaction</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {PRESET_REACTIONS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Calculation Mode Dropdown */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Calculation Mode</label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as CalculationMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="general_stoichiometry">1. General Mass-to-Mass Reaction Solver</option>
                <option value="equation_balancer">2. Chemical Equation Balancer & Atom Matrix</option>
                <option value="mole_ratio">3. Mole Ratio Calculator</option>
                <option value="limiting_reactant">4. Limiting & Excess Reactant Analysis</option>
                <option value="theoretical_yield">5. Theoretical Yield Solver</option>
                <option value="percent_yield">6. Percent Yield Calculator (Actual / Theoretical)</option>
                <option value="solution_stoichiometry">7. Solution Stoichiometry (n = M × V)</option>
              </select>
            </div>

            {/* Dynamic Reactant Mass Inputs */}
            <div className="space-y-5">
              
              {/* Primary Output Field */}
              <ReadOnlyField 
                label={`Theoretical Yield (${selectedPreset.products[0].formula})`} 
                val={`${results.theoreticalYieldGrams.toFixed(2)} g`} 
                icon={Atom} 
              />

              {/* Reactant 1 Mass Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Mass of {selectedPreset.reactants[0].formula}</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="1"
                      value={r1Mass}
                      onChange={(e) => setR1Mass(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">g</span>
                  </div>
                </div>
              </div>

              {/* Reactant 2 Mass Input */}
              {selectedPreset.reactants.length > 1 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Mass of {selectedPreset.reactants[1].formula}</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="1"
                        value={r2Mass}
                        onChange={(e) => setR2Mass(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">g</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actual Yield Input */}
              {calcMode === "percent_yield" && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Actual Recovered Yield ({selectedPreset.products[0].formula})</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="1"
                        value={actualYieldGrams}
                        onChange={(e) => setActualYieldGrams(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">g</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Links to Mole and Molar Mass Tools */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need compound molar masses?</span>
              <span className="text-[11px] text-slate-500">Explore chemical formula weights in our Molar Mass Tool</span>
            </div>
            <Link
              href="/calculators/molar-mass-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Molar Mass
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Reaction Cockpit & Atom Matrix */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Balanced Equation & Limiting Reactant Analysis */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Balanced Chemical Reaction Cockpit
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                Mass Conserved
              </span>
            </div>

            {/* Balanced Equation Display */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 text-center mb-4">
              <span className="text-sm font-bold text-slate-400 block mb-1">Balanced Chemical Equation</span>
              <span className="text-lg sm:text-xl font-black text-[#518231] tracking-wide">{selectedPreset.equation}</span>
            </div>

            {/* Atom Count Conservation Matrix Table */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Atom Count Conservation Matrix</span>
              <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Element</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Reactant Atoms</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Product Atoms</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Status</div>

                {selectedPreset.atoms.map((atom) => (
                  <React.Fragment key={atom.element}>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white font-bold">{atom.element}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white">{atom.reactantCount}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white">{atom.productCount}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-green-400 font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 size={13} />
                      Balanced
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Limiting & Excess Reactant Cards */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Limiting Reactant</span>
                <span className="text-xs font-black text-amber-400">{results.limitingReactantFormula} (Consumed First)</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Excess Remaining</span>
                <span className="text-xs font-black text-[#518231]">{results.excessRemainingGrams.toFixed(2)} g {results.excessReactantFormula}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleCopySummary}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Copy size={13} />
                Copy Summary
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center justify-center gap-1.5 bg-[#518231] hover:bg-[#436a28] text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-[#436a28]"
              >
                <Printer size={13} />
                Print PDF
              </button>
            </div>
          </div>

          {/* Advanced Mode Tabbed Panel */}
          {isAdvancedMode && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in">
              
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 flex-wrap">
                {(["matrix", "yield_chart", "flashcards", "quiz"] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setVisualTab(tab)}
                    className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all capitalize ${
                      visualTab === tab
                        ? "bg-white dark:bg-slate-900 text-[#518231] shadow-sm"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {tab === "matrix" ? "⚛️ Species Breakdown" : tab === "yield_chart" ? "📊 Yield Chart" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Overview */}
                {visualTab === "matrix" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Stoichiometric Species & Molar Mass Breakdown</h4>
                    <div className="space-y-1.5">
                      {selectedPreset.reactants.map(r => (
                        <div key={r.formula} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-slate-300">
                          <span>Reactant: {r.formula} (Coeff: {r.coeff})</span>
                          <span className="font-bold text-[#518231]">{r.molarMass.toFixed(3)} g/mol</span>
                        </div>
                      ))}
                      {selectedPreset.products.map(p => (
                        <div key={p.formula} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-slate-300">
                          <span>Product: {p.formula} (Coeff: {p.coeff})</span>
                          <span className="font-bold text-amber-400">{p.molarMass.toFixed(3)} g/mol</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Recharts Yield Comparison Chart */}
                {visualTab === "yield_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Theoretical vs Actual Yield Comparison (g)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                          <YAxis stroke="#94a3b8" fontSize={11} />
                          <Tooltip />
                          <Bar dataKey="grams" fill="#518231" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Stoichiometry Study Flashcards</h4>
                    <div 
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center cursor-pointer transition-all duration-300 min-h-32 flex flex-col items-center justify-center"
                    >
                      <span className="text-[10px] font-bold text-[#518231] uppercase tracking-wider block mb-1">
                        {isFlipped ? "Definition (Click to Flip)" : "Concept (Click to Flip)"}
                      </span>
                      <p className="text-sm font-bold text-white leading-relaxed">
                        {isFlipped ? flashcards[flashcardIndex].desc : flashcards[flashcardIndex].title}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <button
                        type="button"
                        onClick={() => { setIsFlipped(false); setFlashcardIndex((flashcardIndex - 1 + flashcards.length) % flashcards.length); }}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold"
                      >
                        Previous
                      </button>
                      <span className="text-slate-400 font-semibold">{flashcardIndex + 1} of {flashcards.length}</span>
                      <button
                        type="button"
                        onClick={() => { setIsFlipped(false); setFlashcardIndex((flashcardIndex + 1) % flashcards.length); }}
                        className="px-3 py-1.5 bg-[#518231] text-white rounded-xl font-bold"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 4: Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Stoichiometry Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.01"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer"
                            className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleCheckQuiz}
                            className="bg-[#518231] hover:bg-[#436a28] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                          >
                            Submit
                          </button>
                        </div>

                        {quizChecked && (
                          <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                            quizIsCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
                          }`}>
                            {quizIsCorrect ? (
                              <>
                                <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                                <span>Correct! The answer is {quizQuestion.correctAnswer} {quizQuestion.units}.</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={16} className="text-red-600 shrink-0" />
                                <span>Incorrect. The correct answer is {quizQuestion.correctAnswer} {quizQuestion.units}. Try again!</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={generateQuiz}
                      className="flex items-center gap-1 text-xs font-bold text-[#518231] hover:underline"
                    >
                      Next Question
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Sub-component Helper
interface ReadOnlyFieldProps {
  label: string;
  val: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

function ReadOnlyField({ label, val, icon: IconComp }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <div className="w-full flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-inner">
        <span className="text-sm font-black text-slate-900 dark:text-slate-100">{val}</span>
        <IconComp size={16} className="text-[#518231]" />
      </div>
    </div>
  );
}
