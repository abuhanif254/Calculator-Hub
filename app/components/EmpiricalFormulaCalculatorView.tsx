"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "percent_composition" 
  | "elemental_mass" 
  | "elemental_analysis" 
  | "mole_data" 
  | "molecular_formula" 
  | "simplest_ratio_solver" 
  | "fractional_multiplier" 
  | "formula_mass_analyzer";

interface ElementRow {
  symbol: string;
  name: string;
  atomicMass: number;
  val: number; // Percent % or Mass g or Moles mol
}

const COMMON_ELEMENTS: { [key: string]: { name: string; mass: number } } = {
  C: { name: "Carbon", mass: 12.011 },
  H: { name: "Hydrogen", mass: 1.008 },
  O: { name: "Oxygen", mass: 15.999 },
  N: { name: "Nitrogen", mass: 14.007 },
  S: { name: "Sulfur", mass: 32.06 },
  P: { name: "Phosphorus", mass: 30.974 },
  Cl: { name: "Chlorine", mass: 35.45 },
  Fe: { name: "Iron", mass: 55.845 },
  Na: { name: "Sodium", mass: 22.990 },
  K: { name: "Potassium", mass: 39.098 }
};

const CHART_COLORS = ["#518231", "#eab308", "#3b82f6", "#ec4899", "#8b5cf6", "#14b8a6", "#f97316"];

export function EmpiricalFormulaCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("percent_composition");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Dynamic Element Table Rows
  const [elements, setElements] = useState<ElementRow[]>([
    { symbol: "C", name: "Carbon", atomicMass: 12.011, val: 40.00 },
    { symbol: "H", name: "Hydrogen", atomicMass: 1.008, val: 6.71 },
    { symbol: "O", name: "Oxygen", atomicMass: 15.999, val: 53.29 }
  ]);

  // Molecular Formula Target Molar Mass Input
  const [targetMolarMass, setTargetMolarMass] = useState<number>(180.16); // e.g. Glucose = 180.16 g/mol

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"composition" | "ratios" | "flashcards" | "quiz">("composition");

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

  // Add Element Row
  const handleAddElement = (symbol: string) => {
    if (elements.some(e => e.symbol === symbol)) {
      triggerNotification("error", `${symbol} is already added to the table!`);
      return;
    }
    const info = COMMON_ELEMENTS[symbol] || { name: symbol, mass: 12.0 };
    setElements([...elements, { symbol, name: info.name, atomicMass: info.mass, val: 10.0 }]);
  };

  // Remove Element Row
  const handleRemoveElement = (symbol: string) => {
    if (elements.length <= 2) {
      triggerNotification("error", "Empirical formula requires at least 2 elements!");
      return;
    }
    setElements(elements.filter(e => e.symbol !== symbol));
  };

  // Update Element Val
  const handleUpdateVal = (symbol: string, val: number) => {
    setElements(elements.map(e => e.symbol === symbol ? { ...e, val } : e));
  };

  // Load Preset (e.g., Glucose)
  const handleLoadPresetGlucose = () => {
    setElements([
      { symbol: "C", name: "Carbon", atomicMass: 12.011, val: 40.00 },
      { symbol: "H", name: "Hydrogen", atomicMass: 1.008, val: 6.71 },
      { symbol: "O", name: "Oxygen", atomicMass: 15.999, val: 53.29 }
    ]);
    setTargetMolarMass(180.16);
    triggerNotification("success", "Loaded Glucose (C: 40%, H: 6.71%, O: 53.29%)!");
  };

  // Load Preset Iron Oxide (Fe2O3)
  const handleLoadPresetFe2O3 = () => {
    setElements([
      { symbol: "Fe", name: "Iron", atomicMass: 55.845, val: 69.94 },
      { symbol: "O", name: "Oxygen", atomicMass: 15.999, val: 30.06 }
    ]);
    setTargetMolarMass(159.69);
    triggerNotification("success", "Loaded Iron(III) Oxide (Fe: 69.94%, O: 30.06%)!");
  };

  // Calculations Engine
  const results = useMemo(() => {
    // Total % validation
    const totalVal = elements.reduce((sum, e) => sum + e.val, 0);

    // Moles calculation (assuming 100g sample for percent mode)
    const moleCalculations = elements.map(e => {
      const moles = e.atomicMass > 0 ? e.val / e.atomicMass : 0;
      return { ...e, moles };
    });

    // Smallest mole value
    const smallestMole = Math.min(...moleCalculations.map(m => m.moles).filter(m => m > 0)) || 1;

    // Relative ratios (raw)
    const rawRatios = moleCalculations.map(m => {
      const rawRatio = m.moles / smallestMole;
      return { ...m, rawRatio };
    });

    // Fractional Multiplier Detection Engine
    let multiplier = 1;
    for (const item of rawRatios) {
      const frac = item.rawRatio % 1;
      if (Math.abs(frac - 0.5) < 0.12) {
        multiplier = Math.max(multiplier, 2);
      } else if (Math.abs(frac - 0.333) < 0.12 || Math.abs(frac - 0.667) < 0.12) {
        multiplier = Math.max(multiplier, 3);
      } else if (Math.abs(frac - 0.25) < 0.12 || Math.abs(frac - 0.75) < 0.12) {
        multiplier = Math.max(multiplier, 4);
      } else if (Math.abs(frac - 0.2) < 0.1 || Math.abs(frac - 0.4) < 0.1 || Math.abs(frac - 0.6) < 0.1 || Math.abs(frac - 0.8) < 0.1) {
        multiplier = Math.max(multiplier, 5);
      }
    }

    // Final Integer Subscripts
    const finalElements = rawRatios.map(item => {
      const finalSubscript = Math.max(1, Math.round(item.rawRatio * multiplier));
      return { ...item, finalSubscript };
    });

    // Organic Hill System Ordering: C, H, then alphabetical
    const sortedHill = [...finalElements].sort((a, b) => {
      if (a.symbol === "C") return -1;
      if (b.symbol === "C") return 1;
      if (a.symbol === "H") return -1;
      if (b.symbol === "H") return 1;
      return a.symbol.localeCompare(b.symbol);
    });

    // Construct Empirical Formula String
    const empiricalFormulaStr = sortedHill
      .map(e => `${e.symbol}${e.finalSubscript > 1 ? e.finalSubscript : ""}`)
      .join("");

    // Calculate Empirical Formula Mass
    const empiricalFormulaMass = finalElements.reduce((sum, e) => sum + e.finalSubscript * e.atomicMass, 0);

    // Calculate Molecular Formula Multiplier (n = targetMolarMass / empiricalFormulaMass)
    const molecularN = empiricalFormulaMass > 0 ? Math.max(1, Math.round(targetMolarMass / empiricalFormulaMass)) : 1;

    // Construct Molecular Formula String
    const molecularFormulaStr = sortedHill
      .map(e => `${e.symbol}${e.finalSubscript * molecularN > 1 ? e.finalSubscript * molecularN : ""}`)
      .join("");

    const molecularFormulaMass = empiricalFormulaMass * molecularN;

    return {
      totalVal,
      smallestMole,
      multiplier,
      finalElements,
      empiricalFormulaStr,
      empiricalFormulaMass,
      molecularN,
      molecularFormulaStr,
      molecularFormulaMass
    };
  }, [elements, targetMolarMass]);

  // Recharts Composition Donut Chart Data
  const chartData = elements.map(e => ({
    name: e.symbol,
    value: Number(e.val.toFixed(2))
  }));

  // Flashcards Data
  const flashcards = [
    { title: "Empirical Formula Definition", desc: "The empirical formula represents the simplest whole-number ratio of atoms in a chemical compound." },
    { title: "Molecular Formula vs Empirical Formula", desc: "The molecular formula shows the actual number of atoms of each element in a molecule: Molecular Formula = (Empirical Formula) × n." },
    { title: "Fractional Multipliers", desc: "If relative mole ratios yield 1.5, multiply all ratios by 2. If 1.333 or 1.667, multiply by 3. If 1.25, multiply by 4." },
    { title: "Hill System Formula Convention", desc: "Organic chemical formulas list Carbon (C) first, Hydrogen (H) second, followed by remaining elements in alphabetical order." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Empirical & Molecular Formula Analysis Summary
-----------------------------------------
Input Composition: ${elements.map(e => `${e.symbol}: ${e.val}%`).join(", ")}
Calculated Empirical Formula: ${results.empiricalFormulaStr}
Empirical Formula Mass: ${results.empiricalFormulaMass.toFixed(3)} g/mol
-----------------------------------------
Target Molecular Molar Mass: ${targetMolarMass.toFixed(2)} g/mol
Molecular Multiplier (n): ${results.molecularN}
Calculated Molecular Formula: ${results.molecularFormulaStr} (${results.molecularFormulaMass.toFixed(3)} g/mol)
-----------------------------------------
Simplest Ratio Multiplier Applied: ${results.multiplier}x`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Formula analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the empirical formula of Glucose (C₆H₁₂O₆)?", correctAnswer: "CH2O" },
      { q: "What is the empirical formula of Hydrogen Peroxide (H₂O₂)?", correctAnswer: "HO" },
      { q: "If relative mole ratios are 1.0 C and 1.5 O, what multiplier should be applied to find whole numbers?", correctAnswer: "2" }
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
            Empirical Formula
          </span>
          <Link href="/calculators/percent-composition-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Percent Composition
          </Link>
          <Link href="/calculators/molar-mass-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molar Mass
          </Link>
          <Link href="/calculators/mole-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Mole Solver
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
                Element Input Cockpit
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

            {/* Quick Presets Buttons */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={handleLoadPresetGlucose}
                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold py-2 px-3 rounded-xl transition-colors"
              >
                Glucose (CH₂O)
              </button>
              <button
                type="button"
                onClick={handleLoadPresetFe2O3}
                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold py-2 px-3 rounded-xl transition-colors"
              >
                Iron Oxide (Fe₂O₃)
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
                <option value="percent_composition">1. Percent Composition (% by mass)</option>
                <option value="elemental_mass">2. Elemental Mass (g)</option>
                <option value="mole_data">3. Direct Mole Data (mol)</option>
                <option value="molecular_formula">4. Molecular Formula from Molar Mass</option>
              </select>
            </div>

            {/* Dynamic Element Table */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Element Breakdown</span>

              <div className="space-y-2">
                {elements.map((e) => (
                  <div key={e.symbol} className="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-[#518231] text-white flex items-center justify-center font-black text-xs shrink-0">
                        {e.symbol}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">{e.name}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{e.atomicMass.toFixed(3)} g/mol</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        step="0.01"
                        value={e.val}
                        onChange={(ev) => handleUpdateVal(e.symbol, Number(ev.target.value))}
                        className="w-20 bg-white dark:bg-slate-900 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">{calcMode === "elemental_mass" ? "g" : calcMode === "mole_data" ? "mol" : "%"}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveElement(e.symbol)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Element Quick Selector */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Add Element:</span>
                <div className="flex flex-wrap gap-1">
                  {Object.keys(COMMON_ELEMENTS).map(sym => (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => handleAddElement(sym)}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-[#518231] hover:text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      +{sym}
                    </button>
                  ))}
                </div>
              </div>

              {/* Molecular Formula Molar Mass Input */}
              {calcMode === "molecular_formula" && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Target Molecular Molar Mass</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.1"
                        value={targetMolarMass}
                        onChange={(e) => setTargetMolarMass(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">g/mol</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Links to Percent Composition Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Calculate mass percents from formulas?</span>
              <span className="text-[11px] text-slate-500">Try our Percent Composition Calculator</span>
            </div>
            <Link
              href="/calculators/percent-composition-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Percent Comp
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Formula Breakdown & Donut Chart */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Empirical & Molecular Formula Display */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Chemical Formula Analysis Cockpit
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                {results.multiplier}x Multiplier Applied
              </span>
            </div>

            {/* Empirical & Molecular Formula Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs font-bold text-slate-400 block mb-1">Calculated Empirical Formula</span>
                <span className="text-2xl font-black text-[#518231] tracking-widest">{results.empiricalFormulaStr}</span>
                <span className="text-[10px] font-bold text-slate-400 block mt-1">Mass: {results.empiricalFormulaMass.toFixed(2)} g/mol</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs font-bold text-slate-400 block mb-1">Calculated Molecular Formula</span>
                <span className="text-2xl font-black text-amber-400 tracking-widest">{results.molecularFormulaStr}</span>
                <span className="text-[10px] font-bold text-slate-400 block mt-1">n = {results.molecularN} ({results.molecularFormulaMass.toFixed(2)} g/mol)</span>
              </div>
            </div>

            {/* Simplest Mole Ratio Step Table */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Mole Ratio & Integer Multiplier Matrix</span>
              <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Element</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Moles</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Raw Ratio</div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 font-bold">Integer Subscript</div>

                {results.finalElements.map((item) => (
                  <React.Fragment key={item.symbol}>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white font-bold">{item.symbol}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white">{item.moles.toFixed(3)}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-white">{item.rawRatio.toFixed(3)}</div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[#518231] font-black">{item.finalSubscript}</div>
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
                {(["composition", "ratios", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "composition" ? "📊 Element Donut" : tab === "ratios" ? "🧪 Ratio Steps" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Recharts Donut Pie Chart */}
                {visualTab === "composition" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Element Composition Mass Distribution</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={75}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 2: Ratio Step Analysis */}
                {visualTab === "ratios" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Simplest Whole-Number Multiplier Rules</h4>
                    <p className="leading-relaxed">
                      Smallest Mole Value = <span className="font-bold text-[#518231]">{results.smallestMole.toFixed(3)} mol</span>.
                      {results.multiplier > 1 ? ` Ratios contained fractional values (e.g. .5, .33). Multiplied all ratios by ${results.multiplier}.` : " All ratios were close to integers."}
                    </p>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Empirical Formula Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Empirical Formula Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. CH2O)"
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
                                <span>Correct! The empirical formula is {quizQuestion.correctAnswer}.</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={16} className="text-red-600 shrink-0" />
                                <span>Incorrect. The correct formula is {quizQuestion.correctAnswer}. Try again!</span>
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
