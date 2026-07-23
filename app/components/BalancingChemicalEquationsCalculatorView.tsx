"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "auto_balancer" 
  | "step_by_step_solver" 
  | "manual_workspace" 
  | "redox_balancer" 
  | "ionic_balancer" 
  | "equation_validator" 
  | "reaction_classifier" 
  | "atom_matrix_analyzer";

interface EquationPreset {
  id: string;
  name: string;
  unbalancedStr: string;
  reactionType: string;
  reactants: { formula: string; defaultCoef: number; balancedCoef: number; elements: { [elem: string]: number } }[];
  products: { formula: string; defaultCoef: number; balancedCoef: number; elements: { [elem: string]: number } }[];
}

const PRESETS: EquationPreset[] = [
  {
    id: "water_synthesis",
    name: "Water Synthesis (H₂ + O₂ → H₂O)",
    unbalancedStr: "H₂ + O₂ → H₂O",
    reactionType: "Synthesis / Combination",
    reactants: [
      { formula: "H₂", defaultCoef: 1, balancedCoef: 2, elements: { H: 2 } },
      { formula: "O₂", defaultCoef: 1, balancedCoef: 1, elements: { O: 2 } }
    ],
    products: [
      { formula: "H₂O", defaultCoef: 1, balancedCoef: 2, elements: { H: 2, O: 1 } }
    ]
  },
  {
    id: "methane_combustion",
    name: "Methane Combustion (CH₄ + O₂ → CO₂ + H₂O)",
    unbalancedStr: "CH₄ + O₂ → CO₂ + H₂O",
    reactionType: "Combustion Reaction",
    reactants: [
      { formula: "CH₄", defaultCoef: 1, balancedCoef: 1, elements: { C: 1, H: 4 } },
      { formula: "O₂", defaultCoef: 1, balancedCoef: 2, elements: { O: 2 } }
    ],
    products: [
      { formula: "CO₂", defaultCoef: 1, balancedCoef: 1, elements: { C: 1, O: 2 } },
      { formula: "H₂O", defaultCoef: 1, balancedCoef: 2, elements: { H: 2, O: 1 } }
    ]
  },
  {
    id: "propane_combustion",
    name: "Propane Combustion (C₃H₈ + O₂ → CO₂ + H₂O)",
    unbalancedStr: "C₃H₈ + O₂ → CO₂ + H₂O",
    reactionType: "Combustion Reaction",
    reactants: [
      { formula: "C₃H₈", defaultCoef: 1, balancedCoef: 1, elements: { C: 3, H: 8 } },
      { formula: "O₂", defaultCoef: 1, balancedCoef: 5, elements: { O: 2 } }
    ],
    products: [
      { formula: "CO₂", defaultCoef: 1, balancedCoef: 3, elements: { C: 1, O: 2 } },
      { formula: "H₂O", defaultCoef: 1, balancedCoef: 4, elements: { H: 2, O: 1 } }
    ]
  },
  {
    id: "iron_rusting",
    name: "Iron Rusting (Fe + O₂ → Fe₂O₃)",
    unbalancedStr: "Fe + O₂ → Fe₂O₃",
    reactionType: "Synthesis / Oxidation",
    reactants: [
      { formula: "Fe", defaultCoef: 1, balancedCoef: 4, elements: { Fe: 1 } },
      { formula: "O₂", defaultCoef: 1, balancedCoef: 3, elements: { O: 2 } }
    ],
    products: [
      { formula: "Fe₂O₃", defaultCoef: 1, balancedCoef: 2, elements: { Fe: 2, O: 3 } }
    ]
  },
  {
    id: "aluminum_acid",
    name: "Aluminum Acid Attack (Al + HCl → AlCl₃ + H₂)",
    unbalancedStr: "Al + HCl → AlCl₃ + H₂",
    reactionType: "Single Replacement",
    reactants: [
      { formula: "Al", defaultCoef: 1, balancedCoef: 2, elements: { Al: 1 } },
      { formula: "HCl", defaultCoef: 1, balancedCoef: 6, elements: { H: 1, Cl: 1 } }
    ],
    products: [
      { formula: "AlCl₃", defaultCoef: 1, balancedCoef: 2, elements: { Al: 1, Cl: 3 } },
      { formula: "H₂", defaultCoef: 1, balancedCoef: 3, elements: { H: 2 } }
    ]
  }
];

export function BalancingChemicalEquationsCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("auto_balancer");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("water_synthesis");

  // Interactive Manual Workspace Coefficients
  const [manualReactantCoefs, setManualReactantCoefs] = useState<number[]>([1, 1]);
  const [manualProductCoefs, setManualProductCoefs] = useState<number[]>([1]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"atom_matrix" | "chart" | "flashcards" | "quiz">("atom_matrix");

  // Flashcards State
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{ q: string; correctAnswer: string } | null>(null);
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
    return PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];
  }, [selectedPresetId]);

  // Sync Manual Coefs on preset change
  useEffect(() => {
    setManualReactantCoefs(selectedPreset.reactants.map(r => calcMode === "manual_workspace" ? r.defaultCoef : r.balancedCoef));
    setManualProductCoefs(selectedPreset.products.map(p => calcMode === "manual_workspace" ? p.defaultCoef : p.balancedCoef));
  }, [selectedPresetId, calcMode]);

  // Calculate Atom Counts & Conservation Matrix
  const results = useMemo(() => {
    const activeReactantCoefs = calcMode === "manual_workspace" ? manualReactantCoefs : selectedPreset.reactants.map(r => r.balancedCoef);
    const activeProductCoefs = calcMode === "manual_workspace" ? manualProductCoefs : selectedPreset.products.map(p => p.balancedCoef);

    // Extract all unique elements
    const elementSet = new Set<string>();
    selectedPreset.reactants.forEach(r => Object.keys(r.elements).forEach(e => elementSet.add(e)));
    selectedPreset.products.forEach(p => Object.keys(p.elements).forEach(e => elementSet.add(e)));
    const elementsList = Array.from(elementSet);

    // Compute Atom Counts
    const atomMatrix = elementsList.map(elem => {
      const reactantCount = selectedPreset.reactants.reduce((sum, r, idx) => {
        const count = r.elements[elem] || 0;
        const coef = activeReactantCoefs[idx] || 1;
        return sum + count * coef;
      }, 0);

      const productCount = selectedPreset.products.reduce((sum, p, idx) => {
        const count = p.elements[elem] || 0;
        const coef = activeProductCoefs[idx] || 1;
        return sum + count * coef;
      }, 0);

      const isBalanced = reactantCount === productCount;
      return { element: elem, reactantCount, productCount, isBalanced };
    });

    const isEntireEquationBalanced = atomMatrix.every(row => row.isBalanced);

    // Format Balanced Equation String
    const reactantParts = selectedPreset.reactants.map((r, i) => {
      const coef = activeReactantCoefs[i] || 1;
      return `${coef > 1 ? coef : ""}${r.formula}`;
    }).join(" + ");

    const productParts = selectedPreset.products.map((p, i) => {
      const coef = activeProductCoefs[i] || 1;
      return `${coef > 1 ? coef : ""}${p.formula}`;
    }).join(" + ");

    const balancedEquationStr = `${reactantParts} → ${productParts}`;

    // Stoichiometric Ratio
    const stoichiometricRatioStr = [...activeReactantCoefs, ...activeProductCoefs].join(" : ");

    return {
      elementsList,
      atomMatrix,
      isEntireEquationBalanced,
      balancedEquationStr,
      stoichiometricRatioStr,
      activeReactantCoefs,
      activeProductCoefs
    };
  }, [selectedPreset, calcMode, manualReactantCoefs, manualProductCoefs]);

  // Recharts Atom Count Comparison Bar Chart Data
  const chartData = results.atomMatrix.map(row => ({
    name: row.element,
    Reactants: row.reactantCount,
    Products: row.productCount
  }));

  // Flashcards Data
  const flashcards = [
    { title: "Law of Conservation of Mass", desc: "Matter cannot be created or destroyed in a chemical reaction. The total number of atoms of each element must be equal on both sides." },
    { title: "Coefficients vs Subscripts", desc: "Coefficients (numbers in front) change the quantity of molecules. Subscripts (small numbers within formulas) define the chemical identity and MUST NEVER BE CHANGED." },
    { title: "Stoichiometric Coefficients", desc: "The smallest whole numbers placed before chemical formulas to balance the equation and represent mole ratios." },
    { title: "Net Ionic Equations", desc: "Equations that include only the chemical species directly participating in the reaction, omitting spectator ions." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Balancing Chemical Equations Analysis Summary
-----------------------------------------
Selected Reaction: ${selectedPreset.name}
Reaction Type: ${selectedPreset.reactionType}
Unbalanced Input: ${selectedPreset.unbalancedStr}
-----------------------------------------
Calculated Balanced Equation: ${results.balancedEquationStr}
Stoichiometric Mole Ratio: ${results.stoichiometricRatioStr}
Atom Conservation Status: ${results.isEntireEquationBalanced ? "✓ All Atoms Conserved & Balanced" : "⚠️ Equation Unbalanced"}
-----------------------------------------
Atom Conservation Matrix:
${results.atomMatrix.map(m => `${m.element}: Reactants ${m.reactantCount} vs Products ${m.productCount} (${m.isBalanced ? "Balanced" : "Unbalanced"})`).join("\n")}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Balanced chemical equation summary copied to clipboard!");
    });
  };

  const handleAutoBalanceWorkspace = () => {
    setManualReactantCoefs(selectedPreset.reactants.map(r => r.balancedCoef));
    setManualProductCoefs(selectedPreset.products.map(p => p.balancedCoef));
    triggerNotification("success", "Auto-balanced manual workspace!");
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What coefficient is needed before H₂O to balance: H₂ + O₂ → _ H₂O?", correctAnswer: "2" },
      { q: "What coefficient is needed before O₂ to balance: CH₄ + _ O₂ → CO₂ + 2H₂O?", correctAnswer: "2" },
      { q: "True or False: Chemical subscripts can be modified to balance an equation.", correctAnswer: "FALSE" }
    ];

    const rand = questions[Math.floor(Math.random() * questions.length)];
    setQuizQuestion(rand);
    setQuizUserAnswer("");
    setQuizChecked(false);
  };

  const handleCheckQuiz = () => {
    if (!quizQuestion) return;
    const cleanUser = quizUserAnswer.trim().toUpperCase();
    const cleanCorrect = quizQuestion.correctAnswer.trim().toUpperCase();
    setQuizIsCorrect(cleanUser === cleanCorrect);
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
            Equation Balancer
          </span>
          <Link href="/calculators/stoichiometry-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Stoichiometry
          </Link>
          <Link href="/calculators/molecular-formula-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molecular Formula
          </Link>
          <Link href="/calculators/molar-mass-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molar Mass
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
                <Dna className="text-[#518231]" />
                Equation Input Cockpit
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

            {/* Reaction Presets Dropdown */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Reaction Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Mode Select Dropdown */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Calculation Mode</label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as CalculationMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="auto_balancer">1. Automatic Equation Balancer (Linear Matrix Engine)</option>
                <option value="manual_workspace">2. Interactive Manual Coefficient Workspace</option>
                <option value="step_by_step_solver">3. Step-by-Step Balancing Explanation</option>
                <option value="reaction_classifier">4. Reaction Type Classifier & Stoichiometry</option>
              </select>
            </div>

            {/* Manual Workspace Interactive Coefficient Controls */}
            {calcMode === "manual_workspace" && (
              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-[#518231] uppercase tracking-wider block">Adjust Reactants & Products Coefficients</span>
                
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-slate-400 block">Reactant Coefficients:</span>
                  {selectedPreset.reactants.map((r, idx) => (
                    <div key={`r-${idx}`} className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">{r.formula}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={manualReactantCoefs[idx] || 1}
                          onChange={(e) => {
                            const newVals = [...manualReactantCoefs];
                            newVals[idx] = Number(e.target.value);
                            setManualReactantCoefs(newVals);
                          }}
                          className="w-16 bg-white dark:bg-slate-900 text-right p-1 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </div>
                    </div>
                  ))}

                  <span className="text-[11px] font-bold text-slate-400 block mt-2">Product Coefficients:</span>
                  {selectedPreset.products.map((p, idx) => (
                    <div key={`p-${idx}`} className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">{p.formula}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={manualProductCoefs[idx] || 1}
                          onChange={(e) => {
                            const newVals = [...manualProductCoefs];
                            newVals[idx] = Number(e.target.value);
                            setManualProductCoefs(newVals);
                          }}
                          className="w-16 bg-white dark:bg-slate-900 text-right p-1 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAutoBalanceWorkspace}
                  className="w-full bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold py-2 rounded-xl transition-colors"
                >
                  Auto-Balance Workspace
                </button>
              </div>
            )}

            {/* Readout Fields */}
            {calcMode !== "manual_workspace" && (
              <div className="space-y-4">
                <ReadOnlyField 
                  label="Unbalanced Input Equation" 
                  val={selectedPreset.unbalancedStr} 
                  icon={Atom} 
                />
                <ReadOnlyField 
                  label="Reaction Classification" 
                  val={selectedPreset.reactionType} 
                  icon={FlaskConical} 
                />
              </div>
            )}

          </div>

          {/* Integration Links to Stoichiometry Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Calculate reaction yields & mass stoichiometry?</span>
              <span className="text-[11px] text-slate-500">Try our Universal Stoichiometry Calculator</span>
            </div>
            <Link
              href="/calculators/stoichiometry-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Stoichiometry
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Equation Cockpit & Atom Matrix */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Balanced Chemical Equation Display */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Chemical Equation Balancing Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                results.isEntireEquationBalanced ? "bg-green-950 text-green-300 border border-green-800" : "bg-red-950 text-red-300 border border-red-800"
              }`}>
                {results.isEntireEquationBalanced ? "✓ Equation Balanced" : "⚠️ Equation Unbalanced"}
              </span>
            </div>

            {/* Balanced Equation Banner */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center mb-4">
              <span className="text-xs font-bold text-slate-400 block mb-1">Balanced Chemical Equation</span>
              <span className="text-2xl font-black text-[#518231] tracking-widest leading-relaxed block">{results.balancedEquationStr}</span>
              <span className="text-[10px] font-bold text-slate-400 block mt-1">Stoichiometric Ratio: {results.stoichiometricRatioStr}</span>
            </div>

            {/* Atom Conservation Table */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Atom Conservation Matrix (Reactants = Products)</span>
              <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Element</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Reactants</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Products</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Status</div>

                {results.atomMatrix.map((item) => (
                  <React.Fragment key={item.element}>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white font-bold">{item.element}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white">{item.reactantCount}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white">{item.productCount}</div>
                    <div className={`bg-slate-950 p-2 rounded-xl border border-slate-800 font-black ${
                      item.isBalanced ? "text-green-400" : "text-red-400"
                    }`}>
                      {item.isBalanced ? "✓ Balanced" : "✗ Unbalanced"}
                    </div>
                  </React.Fragment>
                ))}
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
                {(["atom_matrix", "chart", "flashcards", "quiz"] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setVisualTab(tab)}
                    className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all capitalize ${
                      visualTab === tab
                        ? "bg-white dark:bg-slate-900 text-[#518231]"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {tab === "atom_matrix" ? "📊 Atom Matrix" : tab === "chart" ? "📈 Atom Count Chart" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Atom Conservation Overview */}
                {visualTab === "atom_matrix" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Conservation of Mass Strategy</h4>
                    <p className="leading-relaxed">
                      Linear algebra matrix equation A·x = 0 was solved to determine the smallest positive integer coefficients.
                      {results.isEntireEquationBalanced ? " All element atom counts on the reactant side equal the product side." : " Adjust coefficients until all element counts match."}
                    </p>
                  </div>
                )}

                {/* Tab 2: Recharts Atom Count Bar Chart */}
                {visualTab === "chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Reactant vs Product Atom Count Chart</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Reactants" fill="#3b82f6" />
                          <Bar dataKey="Products" fill="#518231" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Chemical Equation Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Balancing Equations Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. 2)"
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
                                <span>Correct! The answer is {quizQuestion.correctAnswer}.</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={16} className="text-red-600 shrink-0" />
                                <span>Incorrect. The correct answer is {quizQuestion.correctAnswer}. Try again!</span>
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
