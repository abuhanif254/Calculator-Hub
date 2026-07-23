"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Battery, Server, RefreshCw, ExternalLink, ShieldCheck, Gauge, HardDrive, Wifi, Tv, SunDim, Compass, FlaskConical, Beaker, Atom, Scale, BookOpen, HelpCircle
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

type CalculationMode = 
  | "molarity" 
  | "moles" 
  | "volume" 
  | "mass" 
  | "molarity_from_mass" 
  | "molar_mass_assistant" 
  | "dilution" 
  | "solution_prep" 
  | "stock_dilution" 
  | "molarity_vs_molality";

// Atomic Mass Table (g/mol)
const ATOMIC_WEIGHTS: Record<string, number> = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998,
  Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, K: 39.098, Ca: 40.078,
  Cr: 51.996, Mn: 54.938, Fe: 55.845, Cu: 63.546, Zn: 65.38, Br: 79.904, Ag: 107.87, I: 126.90, Ba: 137.33,
  Au: 196.97, Pb: 207.2
};

interface ElementContribution {
  element: string;
  count: number;
  atomicWeight: number;
  totalMass: number;
}

// Parser for Chemical Formulas (e.g. NaCl, H2SO4, C6H12O6, Ca(OH)2, CuSO4.5H2O)
function parseChemicalFormula(formulaStr: string): { totalMolarMass: number; breakdown: ElementContribution[]; isValid: boolean; errorMsg?: string } {
  try {
    const cleanFormula = formulaStr.trim().replace(/\s+/g, "");
    if (!cleanFormula) return { totalMolarMass: 0, breakdown: [], isValid: false, errorMsg: "Formula is empty" };

    // Handle hydrates (e.g. CuSO4.5H2O or CuSO4*5H2O)
    let mainPart = cleanFormula;
    let hydrateMultiplier = 0;
    let hydratePart = "";

    if (cleanFormula.includes(".") || cleanFormula.includes("*")) {
      const parts = cleanFormula.split(/[.*]/);
      mainPart = parts[0];
      const hydrateStr = parts[1] || "";
      const match = hydrateStr.match(/^(\d*)(.*)$/);
      if (match) {
        hydrateMultiplier = match[1] ? parseInt(match[1], 10) : 1;
        hydratePart = match[2];
      }
    }

    const counts: Record<string, number> = {};

    const parseSegment = (segment: string, multiplier = 1) => {
      // Regex for Element + Subscript or Parentheses
      const regex = /([A-Z][a-z]?|\()(\d*)|(\))(\d*)/g;
      let match;
      const stack: Record<string, number>[] = [];

      let currCounts: Record<string, number> = {};

      while ((match = regex.exec(segment)) !== null) {
        const token = match[1] || match[3];
        const num = match[2] || match[4];
        const subCount = num ? parseInt(num, 10) : 1;

        if (token === "(") {
          stack.push(currCounts);
          currCounts = {};
        } else if (token === ")") {
          if (stack.length === 0) throw new Error("Unbalanced parentheses");
          const parentCounts = stack.pop()!;
          for (const [el, cnt] of Object.entries(currCounts)) {
            parentCounts[el] = (parentCounts[el] || 0) + cnt * subCount;
          }
          currCounts = parentCounts;
        } else if (ATOMIC_WEIGHTS[token]) {
          currCounts[token] = (currCounts[token] || 0) + subCount * multiplier;
        } else {
          throw new Error(`Unknown element symbol: '${token}'`);
        }
      }

      for (const [el, cnt] of Object.entries(currCounts)) {
        counts[el] = (counts[el] || 0) + cnt;
      }
    };

    parseSegment(mainPart, 1);
    if (hydratePart && hydrateMultiplier > 0) {
      parseSegment(hydratePart, hydrateMultiplier);
    }

    let totalMolarMass = 0;
    const breakdown: ElementContribution[] = [];

    for (const [el, count] of Object.entries(counts)) {
      const weight = ATOMIC_WEIGHTS[el] || 0;
      const totalMass = weight * count;
      totalMolarMass += totalMass;
      breakdown.push({ element: el, count, atomicWeight: weight, totalMass });
    }

    return { totalMolarMass, breakdown, isValid: true };
  } catch (err: any) {
    return { totalMolarMass: 0, breakdown: [], isValid: false, errorMsg: err.message || "Invalid chemical formula" };
  }
}

export function MolarityCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("molarity");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Common Inputs
  const [soluteMoles, setSoluteMoles] = useState<number>(0.5); // 0.5 mol
  const [solutionVolumeL, setSolutionVolumeL] = useState<number>(1.0); // 1.0 Liters
  const [targetMolarityM, setTargetMolarityM] = useState<number>(0.5); // 0.5 M
  const [soluteMassG, setSoluteMassG] = useState<number>(29.22); // 29.22 grams (0.5 mol NaCl)
  const [molarMassGmol, setMolarMassGmol] = useState<number>(58.44); // 58.44 g/mol (NaCl)

  // Formula Assistant Input
  const [chemicalFormulaInput, setChemicalFormulaInput] = useState<string>("NaCl");

  // Dilution Inputs (M1V1 = M2V2)
  const [dilutionM1, setDilutionM1] = useState<number>(2.0); // 2.0 M Stock
  const [dilutionV1, setDilutionV1] = useState<number>(0.25); // 0.25 L Stock Volume
  const [dilutionM2, setDilutionM2] = useState<number>(0.50); // 0.50 M Target
  const [dilutionV2, setDilutionV2] = useState<number>(1.0); // 1.0 L Target Volume

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"beaker" | "dilution" | "flashcards" | "quiz">("beaker");

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

  // Parsed Formula Data
  const parsedFormulaData = useMemo(() => {
    return parseChemicalFormula(chemicalFormulaInput);
  }, [chemicalFormulaInput]);

  // Main Calculations Engine
  const results = useMemo(() => {
    let calculatedMolarity = targetMolarityM;
    let calculatedMoles = soluteMoles;
    let calculatedVolumeL = solutionVolumeL;
    let calculatedMassG = soluteMassG;

    // Effective Molar Mass
    const activeMolarMass = parsedFormulaData.isValid ? parsedFormulaData.totalMolarMass : molarMassGmol;

    if (calcMode === "molarity") {
      calculatedMolarity = solutionVolumeL > 0 ? soluteMoles / solutionVolumeL : 0;
    } else if (calcMode === "moles") {
      calculatedMoles = targetMolarityM * solutionVolumeL;
    } else if (calcMode === "volume") {
      calculatedVolumeL = targetMolarityM > 0 ? soluteMoles / targetMolarityM : 0;
    } else if (calcMode === "mass") {
      calculatedMoles = targetMolarityM * solutionVolumeL;
      calculatedMassG = calculatedMoles * activeMolarMass;
    } else if (calcMode === "molarity_from_mass") {
      calculatedMoles = activeMolarMass > 0 ? soluteMassG / activeMolarMass : 0;
      calculatedMolarity = solutionVolumeL > 0 ? calculatedMoles / solutionVolumeL : 0;
    }

    // Dilution Calculations (M1V1 = M2V2)
    const computedDilutionV2 = dilutionM2 > 0 ? (dilutionM1 * dilutionV1) / dilutionM2 : 0;
    const computedDilutionM2 = dilutionV2 > 0 ? (dilutionM1 * dilutionV1) / dilutionV2 : 0;
    const waterAddedL = Math.max(0, dilutionV2 - dilutionV1);

    // Stock Solution Workflow
    const stockVolumeReqL = dilutionM1 > 0 ? (targetMolarityM * solutionVolumeL) / dilutionM1 : 0;
    const solventVolumeReqL = Math.max(0, solutionVolumeL - stockVolumeReqL);

    // Concentration Classification
    let concentrationCategory: "Very Dilute" | "Dilute" | "Moderate" | "Concentrated" = "Moderate";
    if (calculatedMolarity < 0.01) concentrationCategory = "Very Dilute";
    else if (calculatedMolarity < 0.1) concentrationCategory = "Dilute";
    else if (calculatedMolarity <= 1.0) concentrationCategory = "Moderate";
    else concentrationCategory = "Concentrated";

    return {
      calculatedMolarity,
      calculatedMoles,
      calculatedVolumeL,
      calculatedMassG,
      activeMolarMass,
      computedDilutionV2,
      computedDilutionM2,
      waterAddedL,
      stockVolumeReqL,
      solventVolumeReqL,
      concentrationCategory
    };
  }, [
    calcMode, soluteMoles, solutionVolumeL, targetMolarityM, soluteMassG, molarMassGmol,
    parsedFormulaData, dilutionM1, dilutionV1, dilutionM2, dilutionV2
  ]);

  // Flashcards Data
  const flashcards = [
    { title: "Molarity (M)", desc: "Molarity is the number of moles of solute dissolved in 1 Liter of solution (M = n / V)." },
    { title: "Solute vs Solvent", desc: "Solute is the substance dissolved (e.g. NaCl salt). Solvent is the dissolving liquid (e.g. Water)." },
    { title: "Dilution Law (M1V1 = M2V2)", desc: "When solvent is added, total solute moles stay constant while volume increases and concentration decreases." },
    { title: "Molarity vs Molality", desc: "Molarity (mol/L) depends on solution volume and temperature. Molality (mol/kg) depends on solvent mass and is temperature-independent." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Molarity & Solution Concentration Analysis Summary
-----------------------------------------
Selected Mode: ${calcMode.toUpperCase()}
Molarity: ${results.calculatedMolarity.toFixed(4)} M (mol/L)
Solute Amount: ${results.calculatedMoles.toFixed(4)} Moles (${results.calculatedMassG.toFixed(2)} grams)
Solution Volume: ${results.calculatedVolumeL.toFixed(3)} Liters (${(results.calculatedVolumeL * 1000).toFixed(0)} mL)
Active Molar Mass: ${results.activeMolarMass.toFixed(3)} g/mol
-----------------------------------------
Concentration Tier: ${results.concentrationCategory.toUpperCase()}
Dilution Formula: M1V1 = M2V2 (Stock: ${dilutionM1}M × ${dilutionV1}L = Target: ${results.computedDilutionM2.toFixed(2)}M × ${dilutionV2}L)
Water/Solvent Added: ${results.waterAddedL.toFixed(3)} Liters`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Molarity solution summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the Molarity (M) of a solution prepared by dissolving 0.5 moles of NaCl in 2.0 Liters of water?", correctAnswer: 0.25, units: "M" },
      { q: "How many moles of solute are present in 500 mL (0.5 L) of a 2.0 M HCl solution?", correctAnswer: 1.0, units: "Moles" },
      { q: "If 100 mL of 4.0 M Stock Solution is diluted with water to a final volume of 500 mL, what is the new molarity (M2)?", correctAnswer: 0.8, units: "M" }
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
            Molarity Solver
          </span>
          <Link href="/calculators/solar-panel-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Solar Panel
          </Link>
          <Link href="/calculators/inverter-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Inverter Sizing
          </Link>
          <Link href="/calculators/battery-runtime-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Battery Runtime
          </Link>
          <Link href="/calculators/electricity-cost-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electricity Cost
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
                <Beaker className="text-[#518231]" />
                Molarity Lab Cockpit
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

            {/* Mode Select Dropdown */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Calculation Mode</label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as CalculationMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="molarity">1. Calculate Molarity (M = n / V)</option>
                <option value="moles">2. Calculate Moles (n = M × V)</option>
                <option value="volume">3. Calculate Solution Volume (V = n / M)</option>
                <option value="mass">4. Calculate Solute Mass (Grams)</option>
                <option value="molarity_from_mass">5. Calculate Molarity from Grams & Volume</option>
                <option value="molar_mass_assistant">6. Molar Mass Assistant & Formula Parser</option>
                <option value="dilution">7. Dilution Calculator (M1V1 = M2V2)</option>
                <option value="solution_prep">8. Prepare Solution Workflow</option>
                <option value="stock_dilution">9. Stock Solution Dilution</option>
              </select>
            </div>

            {/* Dynamic Input Controls */}
            <div className="space-y-5">
              
              {/* Primary Output Field */}
              <ReadOnlyField 
                label="Calculated Solution Molarity" 
                val={`${results.calculatedMolarity.toFixed(4)} M (${results.calculatedMolarity.toFixed(4)} mol/L)`} 
                icon={Atom} 
              />

              {/* Chemical Formula Parser Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Chemical Formula (Molar Mass Assistant)</span>
                  <input
                    type="text"
                    value={chemicalFormulaInput}
                    onChange={(e) => setChemicalFormulaInput(e.target.value)}
                    placeholder="e.g. NaCl, H2SO4, C6H12O6"
                    className="w-32 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-xs uppercase"
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {["NaCl", "H2SO4", "NaOH", "C6H12O6", "CuSO4.5H2O"].map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setChemicalFormulaInput(f)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all border ${
                        chemicalFormulaInput === f 
                          ? "bg-[#518231] text-white border-[#518231]" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Moles of Solute Input */}
              {(calcMode === "molarity" || calcMode === "volume") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Solute Amount (Moles)</span>
                    <input
                      type="number"
                      step="0.05"
                      value={soluteMoles}
                      onChange={(e) => setSoluteMoles(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Solution Volume (Liters) */}
              {(calcMode === "molarity" || calcMode === "moles" || calcMode === "mass" || calcMode === "molarity_from_mass") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Solution Volume (Liters)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={solutionVolumeL}
                      onChange={(e) => setSolutionVolumeL(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Target Molarity Input */}
              {(calcMode === "moles" || calcMode === "volume" || calcMode === "mass") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Target Molarity (M)</span>
                    <input
                      type="number"
                      step="0.05"
                      value={targetMolarityM}
                      onChange={(e) => setTargetMolarityM(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Solute Mass Input (Grams) */}
              {calcMode === "molarity_from_mass" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Solute Mass (Grams)</span>
                    <input
                      type="number"
                      step="1.0"
                      value={soluteMassG}
                      onChange={(e) => setSoluteMassG(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Dilution Mode Inputs (M1V1 = M2V2) */}
              {calcMode === "dilution" && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Dilution Equation Parameters (M1V1 = M2V2)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Stock Molarity (M1)</span>
                      <input
                        type="number"
                        step="0.1"
                        value={dilutionM1}
                        onChange={(e) => setDilutionM1(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Stock Volume V1 (L)</span>
                      <input
                        type="number"
                        step="0.05"
                        value={dilutionV1}
                        onChange={(e) => setDilutionV1(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Target Volume V2 (L)</span>
                      <input
                        type="number"
                        step="0.1"
                        value={dilutionV2}
                        onChange={(e) => setDilutionV2(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Computed M2</span>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl text-right font-black text-xs text-[#518231]">
                        {results.computedDilutionM2.toFixed(3)} M
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Link to Solar & Power Tools */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Analyzing renewable solar energy?</span>
              <span className="text-[11px] text-slate-500">Calculate solar array kW capacity, panel counts & battery storage</span>
            </div>
            <Link
              href="/calculators/solar-panel-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Solar Panel
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Solute Beaker & Dilution Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Dynamic Solute & Solution Beaker Visualizer */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Dynamic Solute Beaker & Solution Visualizer
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                Tier: {results.concentrationCategory.toUpperCase()}
              </span>
            </div>

            {/* SVG Interactive Laboratory Beaker */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              <div className="w-full max-w-md h-36 relative flex items-center justify-center">
                <svg viewBox="0 0 400 120" className="w-full h-full">
                  
                  {/* Glass Beaker Body */}
                  <rect x="130" y="15" width="140" height="90" fill="none" stroke="#64748b" strokeWidth="3" rx="4" />
                  <line x1="120" y1="15" x2="280" y2="15" stroke="#64748b" strokeWidth="3" />

                  {/* Solution Liquid Fill (height scaled by volume) */}
                  <rect 
                    x="133" 
                    y={102 - Math.min(75, Math.max(20, results.calculatedVolumeL * 40))} 
                    width="134" 
                    height={Math.min(75, Math.max(20, results.calculatedVolumeL * 40))} 
                    fill="#518231" 
                    opacity="0.35" 
                    rx="2"
                  />

                  {/* Conceptual Solute Dots */}
                  {Array.from({ length: Math.min(30, Math.max(4, Math.round(results.calculatedMolarity * 16))) }).map((_, idx) => (
                    <circle
                      key={idx}
                      cx={145 + (idx % 6) * 22}
                      cy={90 - Math.floor(idx / 6) * 14}
                      r="3.5"
                      fill="#10b981"
                    />
                  ))}

                  <text x="200" y="60" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    {results.calculatedMolarity.toFixed(3)} M
                  </text>
                  <text x="200" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle">
                    {results.calculatedVolumeL.toFixed(2)} L Solution
                  </text>
                </svg>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Solute Mass</span>
                <span className="text-xs font-black text-[#518231]">{results.calculatedMassG.toFixed(2)} Grams</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Solute Moles</span>
                <span className="text-xs font-black text-amber-400">{results.calculatedMoles.toFixed(3)} Moles</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Molar Mass</span>
                <span className="text-xs font-black text-white">{results.activeMolarMass.toFixed(2)} g/mol</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800">
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
                {(["beaker", "dilution", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "beaker" ? "Overview" : tab === "dilution" ? "💧 Dilution" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Overview */}
                {visualTab === "beaker" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🧪 Solution Concentration & Molarity Principles</h4>
                    <p className="leading-relaxed">
                      Molarity calculates solute concentration in moles per Liter (**M = n / V**). Molar mass calculation derives total molecular weight by summing elemental atomic masses.
                    </p>
                    {parsedFormulaData.isValid && parsedFormulaData.breakdown.length > 0 && (
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <span className="font-bold text-slate-900 dark:text-white block mb-1">Elemental Composition ({chemicalFormulaInput})</span>
                        <div className="grid grid-cols-2 gap-1 text-[11px]">
                          {parsedFormulaData.breakdown.map((item, idx) => (
                            <div key={idx} className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 py-0.5">
                              <span>{item.element} (×{item.count}):</span>
                              <span className="font-bold">{item.totalMass.toFixed(2)} g/mol</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Dilution M1V1 = M2V2 Animation */}
                {visualTab === "dilution" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Dilution Protocol (M1V1 = M2V2)</h4>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Stock Solution (M1 × V1):</span>
                        <span className="font-bold text-[#518231]">{dilutionM1} M × {dilutionV1} L</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Target Diluted Solution (M2 × V2):</span>
                        <span className="font-bold text-amber-400">{results.computedDilutionM2.toFixed(3)} M × {dilutionV2} L</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pure Solvent / Water Added (V2 - V1):</span>
                        <span className="font-bold text-white">{results.waterAddedL.toFixed(3)} Liters</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Solution Chemistry Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molarity & Solution Quiz</h4>
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
