"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, PieChart as PieChartIcon
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

type CalculationMode = 
  | "percent_composition_formula" 
  | "elemental_mass_contribution" 
  | "molar_mass_analysis" 
  | "hydrate_percent_composition" 
  | "sample_element_mass" 
  | "atom_vs_mass_percent" 
  | "reverse_composition" 
  | "composition_comparison" 
  | "empirical_formula_connection" 
  | "molecular_formula_connection" 
  | "visual_formula_builder" 
  | "what_if_analysis";

// Atomic Mass Table (g/mol)
const ATOMIC_WEIGHTS: Record<string, { name: string; mass: number }> = {
  H: { name: "Hydrogen", mass: 1.008 },
  He: { name: "Helium", mass: 4.0026 },
  Li: { name: "Lithium", mass: 6.94 },
  Be: { name: "Beryllium", mass: 9.0122 },
  B: { name: "Boron", mass: 10.81 },
  C: { name: "Carbon", mass: 12.011 },
  N: { name: "Nitrogen", mass: 14.007 },
  O: { name: "Oxygen", mass: 15.999 },
  F: { name: "Fluorine", mass: 18.998 },
  Na: { name: "Sodium", mass: 22.990 },
  Mg: { name: "Magnesium", mass: 24.305 },
  Al: { name: "Aluminum", mass: 26.982 },
  Si: { name: "Silicon", mass: 28.085 },
  P: { name: "Phosphorus", mass: 30.974 },
  S: { name: "Sulfur", mass: 32.06 },
  Cl: { name: "Chlorine", mass: 35.45 },
  K: { name: "Potassium", mass: 39.098 },
  Ca: { name: "Calcium", mass: 40.078 },
  Cr: { name: "Chromium", mass: 51.996 },
  Mn: { name: "Manganese", mass: 54.938 },
  Fe: { name: "Iron", mass: 55.845 },
  Cu: { name: "Copper", mass: 63.546 },
  Zn: { name: "Zinc", mass: 65.38 },
  Br: { name: "Bromine", mass: 79.904 },
  Ag: { name: "Silver", mass: 107.87 },
  I: { name: "Iodine", mass: 126.90 },
  Ba: { name: "Barium", mass: 137.33 },
  Au: { name: "Gold", mass: 196.97 },
  Pb: { name: "Lead", mass: 207.2 }
};

const CHART_COLORS = ["#518231", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#14b8a6", "#6366f1"];

interface ElementContribution {
  element: string;
  name: string;
  count: number;
  atomicWeight: number;
  totalMass: number;
  massPercentage: number;
  atomPercentage: number;
  sampleMassG?: number;
}

// Chemical Formula Parser Engine
function parseChemicalFormula(formulaStr: string, sampleMassGInput: number = 100): { 
  totalMolarMass: number; 
  breakdown: ElementContribution[]; 
  totalAtomCount: number; 
  isHydrate: boolean; 
  hydrateWaterCount: number;
  anhydrousMass: number;
  waterMass: number;
  waterPercentage: number;
  isValid: boolean; 
  errorMsg?: string 
} {
  try {
    const cleanFormula = formulaStr.trim().replace(/\s+/g, "");
    if (!cleanFormula) return { totalMolarMass: 0, breakdown: [], totalAtomCount: 0, isHydrate: false, hydrateWaterCount: 0, anhydrousMass: 0, waterMass: 0, waterPercentage: 0, isValid: false, errorMsg: "Formula is empty" };

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
    let totalAtomCount = 0;

    for (const [el, count] of Object.entries(counts)) {
      const weight = ATOMIC_WEIGHTS[el]?.mass || 0;
      const totalMass = weight * count;
      totalMolarMass += totalMass;
      totalAtomCount += count;
    }

    const breakdown: ElementContribution[] = [];
    for (const [el, count] of Object.entries(counts)) {
      const weight = ATOMIC_WEIGHTS[el]?.mass || 0;
      const name = ATOMIC_WEIGHTS[el]?.name || el;
      const totalMass = weight * count;
      const massPercentage = totalMolarMass > 0 ? (totalMass / totalMolarMass) * 100 : 0;
      const atomPercentage = totalAtomCount > 0 ? (count / totalAtomCount) * 100 : 0;
      const sampleMassG = (massPercentage / 100) * sampleMassGInput;

      breakdown.push({ element: el, name, count, atomicWeight: weight, totalMass, massPercentage, atomPercentage, sampleMassG });
    }

    // Hydrate Analysis
    const isHydrate = hydrateMultiplier > 0;
    const waterMolarMass = 18.015;
    const waterMass = isHydrate ? hydrateMultiplier * waterMolarMass : 0;
    const anhydrousMass = Math.max(0, totalMolarMass - waterMass);
    const waterPercentage = totalMolarMass > 0 ? (waterMass / totalMolarMass) * 100 : 0;

    return { 
      totalMolarMass, 
      breakdown, 
      totalAtomCount, 
      isHydrate, 
      hydrateWaterCount: hydrateMultiplier,
      anhydrousMass, 
      waterMass, 
      waterPercentage,
      isValid: true 
    };
  } catch (err: any) {
    return { 
      totalMolarMass: 0, 
      breakdown: [], 
      totalAtomCount: 0, 
      isHydrate: false, 
      hydrateWaterCount: 0,
      anhydrousMass: 0, 
      waterMass: 0, 
      waterPercentage: 0,
      isValid: false, 
      errorMsg: err.message || "Invalid chemical formula" 
    };
  }
}

export function PercentCompositionCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("percent_composition_formula");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Chemical Formula Input
  const [chemicalFormulaInput, setChemicalFormulaInput] = useState<string>("H2SO4");
  
  // Sample Mass Input (g)
  const [sampleMassG, setSampleMassG] = useState<number>(100);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"donut" | "atom_vs_mass" | "hydrate" | "flashcards" | "quiz">("donut");

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
    return parseChemicalFormula(chemicalFormulaInput, sampleMassG);
  }, [chemicalFormulaInput, sampleMassG]);

  // Flashcards Data
  const flashcards = [
    { title: "Percent Composition Formula", desc: "% Element = [ (Number of Atoms × Atomic Mass of Element) / Total Molar Mass of Compound ] × 100%" },
    { title: "Atom Percent vs Mass Percent", desc: "Atom Percent is the fraction of total atom count. Mass Percent is the fraction of total compound mass. In H₂O, H is 66.7% of atoms but only 11.19% of mass!" },
    { title: "Sample Mass Analyzer", desc: "Mass of Element in Sample = Sample Mass (g) × ( % Element / 100 ). In 100g H₂O, Hydrogen accounts for exactly 11.19 grams." },
    { title: "Hydrate Percent Water", desc: "% Water = [ (Number of Water Molecules × 18.015 g/mol) / Total Hydrate Molar Mass ] × 100%" }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Percent Composition & Chemical Analysis Summary
-----------------------------------------
Selected Formula: ${chemicalFormulaInput}
Total Molar Mass: ${parsedFormulaData.totalMolarMass.toFixed(3)} g/mol
Total Atom Count: ${parsedFormulaData.totalAtomCount} atoms
Sample Mass: ${sampleMassG} grams
-----------------------------------------
Elemental Breakdown:
${parsedFormulaData.breakdown.map(b => `${b.element} (${b.name}): ${b.massPercentage.toFixed(2)}% Mass (${b.sampleMassG?.toFixed(2)}g in sample), ${b.atomPercentage.toFixed(2)}% Atom Ratio`).join("\n")}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Percent composition summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the percentage of Oxygen by mass in Water (H2O)? (H = 1.008, O = 15.999 g/mol)", correctAnswer: 88.81, units: "%" },
      { q: "What is the percentage of Hydrogen by mass in Water (H2O)?", correctAnswer: 11.19, units: "%" },
      { q: "In a 100g sample of Glucose (C6H12O6, %O = 53.28%), how many grams of Oxygen are present?", correctAnswer: 53.28, units: "grams" }
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
            Percent Composition
          </span>
          <Link href="/calculators/molar-mass-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molar Mass
          </Link>
          <Link href="/calculators/mole-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Mole Solver
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
                <PieChartIcon className="text-[#518231]" />
                Percent Composition Cockpit
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
                <option value="percent_composition_formula">1. Percent Composition from Chemical Formula</option>
                <option value="elemental_mass_contribution">2. Element Mass Contribution Table</option>
                <option value="molar_mass_analysis">3. Total Molar Mass Analysis</option>
                <option value="hydrate_percent_composition">4. Hydrate Percent Water Analysis</option>
                <option value="sample_element_mass">5. Sample Mass Analyzer (Element Mass in Sample)</option>
                <option value="atom_vs_mass_percent">6. Atom Percent vs Mass Percent Comparison</option>
              </select>
            </div>

            {/* Dynamic Input Controls */}
            <div className="space-y-5">
              
              {/* Primary Output Field */}
              <ReadOnlyField 
                label="Total Molar Mass" 
                val={`${parsedFormulaData.totalMolarMass.toFixed(3)} g/mol`} 
                icon={Atom} 
              />

              {/* Chemical Formula Parser Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Chemical Formula</span>
                  <input
                    type="text"
                    value={chemicalFormulaInput}
                    onChange={(e) => setChemicalFormulaInput(e.target.value)}
                    placeholder="e.g. H2O, H2SO4, C6H12O6"
                    className="w-36 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-xs uppercase"
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {["H2O", "NaCl", "H2SO4", "C6H12O6", "CuSO4.5H2O", "Al2(SO4)3"].map(f => (
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

              {/* Sample Mass Input Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Total Sample Mass (Grams)</span>
                  <input
                    type="number"
                    step="1.0"
                    value={sampleMassG}
                    onChange={(e) => setSampleMassG(Number(e.target.value))}
                    className="w-28 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Integration Links to Molar Mass Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need full molecular weights?</span>
              <span className="text-[11px] text-slate-500">Explore atomic weight tables and ionic formula mass solvers</span>
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

        {/* Right Column: Percentage Mass Donut Chart & Sample Mass Visualizer */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Percentage Mass Composition Donut Chart */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                📊 Percentage Composition by Mass
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                Sample: {sampleMassG}g
              </span>
            </div>

            {/* Recharts Donut Pie Chart */}
            <div className="h-44 w-full bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center mb-4">
              {parsedFormulaData.isValid && parsedFormulaData.breakdown.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={parsedFormulaData.breakdown}
                      dataKey="totalMass"
                      nameKey="element"
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={4}
                    >
                      {parsedFormulaData.breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(val: any, name: any, item: any) => [`${item.payload.massPercentage.toFixed(2)}% (${item.payload.sampleMassG?.toFixed(2)}g in sample)`, item.payload.name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <span className="text-xs text-slate-500">Enter a valid formula to render composition chart</span>
              )}
            </div>

            {/* Element Mass Breakdown List */}
            <div className="space-y-1.5">
              {parsedFormulaData.breakdown.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}></span>
                    <span className="font-bold">{item.element} ({item.name}) ×{item.count}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-[#518231] block">{item.massPercentage.toFixed(2)}% Mass</span>
                    <span className="text-[10px] text-slate-400">{item.sampleMassG?.toFixed(2)}g in {sampleMassG}g sample</span>
                  </div>
                </div>
              ))}
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
                {(["donut", "atom_vs_mass", "hydrate", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "donut" ? "📊 Donut" : tab === "atom_vs_mass" ? "⚛️ Atom vs Mass" : tab === "hydrate" ? "💧 Hydrate" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Donut Summary */}
                {visualTab === "donut" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">📊 Percent Composition by Mass Formula</h4>
                    <p className="leading-relaxed">
                      % Element = [ (Number of Atoms × Atomic Mass of Element) / Total Molar Mass of Compound ] × 100%. The sum of all elemental mass percentages equals 100%.
                    </p>
                  </div>
                )}

                {/* Tab 2: Atom Percent vs Mass Percent Comparison */}
                {visualTab === "atom_vs_mass" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Atom Count Ratio vs Mass Percentage Matrix</h4>
                    <div className="space-y-1.5">
                      {parsedFormulaData.breakdown.map((item, idx) => (
                        <div key={idx} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center text-slate-300">
                          <div>
                            <span className="font-bold text-white block">{item.element} ({item.name})</span>
                            <span className="text-[10px] text-slate-400">{item.count} Atom(s) out of {parsedFormulaData.totalAtomCount}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#518231] block">{item.massPercentage.toFixed(2)}% Mass</span>
                            <span className="text-amber-400 text-[11px] font-semibold">{item.atomPercentage.toFixed(2)}% Atom Ratio</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Hydrate Analysis */}
                {visualTab === "hydrate" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Hydrate Water of Crystallization Analysis</h4>
                    {parsedFormulaData.isHydrate ? (
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300 space-y-2">
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Anhydrous Mass Percentage:</span>
                          <span className="font-bold text-[#518231]">{(100 - parsedFormulaData.waterPercentage).toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Water Percentage ({parsedFormulaData.hydrateWaterCount} H₂O):</span>
                          <span className="font-bold text-amber-400">{parsedFormulaData.waterPercentage.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Water Mass in {sampleMassG}g Sample:</span>
                          <span className="font-bold text-white">{((parsedFormulaData.waterPercentage / 100) * sampleMassG).toFixed(2)} Grams</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500">
                        The current formula is an anhydrous compound. Add a dot hydrate notation (e.g. CuSO4.5H2O) to analyze water of crystallization.
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 4: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Percent Composition Study Flashcards</h4>
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

                {/* Tab 5: Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Percent Composition Quiz</h4>
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
