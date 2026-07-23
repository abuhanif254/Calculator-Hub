"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Grid
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

type CalculationMode = 
  | "molar_mass_from_formula" 
  | "molecular_mass" 
  | "formula_mass" 
  | "percentage_composition" 
  | "elemental_contribution" 
  | "hydrate_molar_mass" 
  | "mass_from_moles" 
  | "moles_from_mass" 
  | "particles_from_mass" 
  | "chemical_formula_builder" 
  | "reverse_composition" 
  | "molar_mass_comparison";

// Avogadro's Constant
const AVOGADRO_NUMBER = 6.02214076e23;

// Periodic Table Dataset
interface PeriodicElement {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: "nonmetal" | "noble" | "alkali" | "alkaline" | "metalloid" | "halogen" | "transition" | "post-transition" | "lanthanide" | "actinide";
}

const PERIODIC_ELEMENTS: Record<string, PeriodicElement> = {
  H: { number: 1, symbol: "H", name: "Hydrogen", mass: 1.008, category: "nonmetal" },
  He: { number: 2, symbol: "He", name: "Helium", mass: 4.0026, category: "noble" },
  Li: { number: 3, symbol: "Li", name: "Lithium", mass: 6.94, category: "alkali" },
  Be: { number: 4, symbol: "Be", name: "Beryllium", mass: 9.0122, category: "alkaline" },
  B: { number: 5, symbol: "B", name: "Boron", mass: 10.81, category: "metalloid" },
  C: { number: 6, symbol: "C", name: "Carbon", mass: 12.011, category: "nonmetal" },
  N: { number: 7, symbol: "N", name: "Nitrogen", mass: 14.007, category: "nonmetal" },
  O: { number: 8, symbol: "O", name: "Oxygen", mass: 15.999, category: "nonmetal" },
  F: { number: 9, symbol: "F", name: "Fluorine", mass: 18.998, category: "halogen" },
  Ne: { number: 10, symbol: "Ne", name: "Neon", mass: 20.180, category: "noble" },
  Na: { number: 11, symbol: "Na", name: "Sodium", mass: 22.990, category: "alkali" },
  Mg: { number: 12, symbol: "Mg", name: "Magnesium", mass: 24.305, category: "alkaline" },
  Al: { number: 13, symbol: "Al", name: "Aluminum", mass: 26.982, category: "post-transition" },
  Si: { number: 14, symbol: "Si", name: "Silicon", mass: 28.085, category: "metalloid" },
  P: { number: 15, symbol: "P", name: "Phosphorus", mass: 30.974, category: "nonmetal" },
  S: { number: 16, symbol: "S", name: "Sulfur", mass: 32.06, category: "nonmetal" },
  Cl: { number: 17, symbol: "Cl", name: "Chlorine", mass: 35.45, category: "halogen" },
  Ar: { number: 18, symbol: "Ar", name: "Argon", mass: 39.948, category: "noble" },
  K: { number: 19, symbol: "K", name: "Potassium", mass: 39.098, category: "alkali" },
  Ca: { number: 20, symbol: "Ca", name: "Calcium", mass: 40.078, category: "alkaline" },
  Cr: { number: 24, symbol: "Cr", name: "Chromium", mass: 51.996, category: "transition" },
  Mn: { number: 25, symbol: "Mn", name: "Manganese", mass: 54.938, category: "transition" },
  Fe: { number: 26, symbol: "Fe", name: "Iron", mass: 55.845, category: "transition" },
  Co: { number: 27, symbol: "Co", name: "Cobalt", mass: 58.933, category: "transition" },
  Ni: { number: 28, symbol: "Ni", name: "Nickel", mass: 58.693, category: "transition" },
  Cu: { number: 29, symbol: "Cu", name: "Copper", mass: 63.546, category: "transition" },
  Zn: { number: 30, symbol: "Zn", name: "Zinc", mass: 65.38, category: "transition" },
  Br: { number: 35, symbol: "Br", name: "Bromine", mass: 79.904, category: "halogen" },
  Ag: { number: 47, symbol: "Ag", name: "Silver", mass: 107.87, category: "transition" },
  I: { number: 53, symbol: "I", name: "Iodine", mass: 126.90, category: "halogen" },
  Ba: { number: 56, symbol: "Ba", name: "Barium", mass: 137.33, category: "alkaline" },
  Au: { number: 79, symbol: "Au", name: "Gold", mass: 196.97, category: "transition" },
  Pb: { number: 82, symbol: "Pb", name: "Lead", mass: 207.2, category: "post-transition" }
};

const CHART_COLORS = ["#518231", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#14b8a6", "#6366f1"];

interface ElementContribution {
  element: string;
  name: string;
  count: number;
  atomicWeight: number;
  totalMass: number;
  percentage: number;
}

// Parser for Chemical Formulas (e.g. H2O, NaCl, H2SO4, C6H12O6, Ca(OH)2, CuSO4.5H2O)
function parseChemicalFormula(formulaStr: string): { 
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
        } else if (PERIODIC_ELEMENTS[token]) {
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
      const weight = PERIODIC_ELEMENTS[el]?.mass || 0;
      const totalMass = weight * count;
      totalMolarMass += totalMass;
      totalAtomCount += count;
    }

    const breakdown: ElementContribution[] = [];
    for (const [el, count] of Object.entries(counts)) {
      const weight = PERIODIC_ELEMENTS[el]?.mass || 0;
      const name = PERIODIC_ELEMENTS[el]?.name || el;
      const totalMass = weight * count;
      const percentage = totalMolarMass > 0 ? (totalMass / totalMolarMass) * 100 : 0;
      breakdown.push({ element: el, name, count, atomicWeight: weight, totalMass, percentage });
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

export function MolarMassCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("molar_mass_from_formula");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Chemical Formula Input
  const [chemicalFormulaInput, setChemicalFormulaInput] = useState<string>("CuSO4.5H2O");
  
  // Mass & Moles Conversion Inputs
  const [substanceMassG, setSubstanceMassG] = useState<number>(249.685); // 1 mol CuSO4.5H2O
  const [substanceMoles, setSubstanceMoles] = useState<number>(1.0);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"periodic" | "composition" | "hydrate" | "flashcards" | "quiz">("periodic");

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
    const activeMolarMass = parsedFormulaData.totalMolarMass;
    const computedMoles = activeMolarMass > 0 ? substanceMassG / activeMolarMass : 0;
    const computedMassG = substanceMoles * activeMolarMass;
    const computedParticles = computedMoles * AVOGADRO_NUMBER;

    return {
      activeMolarMass,
      computedMoles,
      computedMassG,
      computedParticles
    };
  }, [parsedFormulaData, substanceMassG, substanceMoles]);

  // Flashcards Data
  const flashcards = [
    { title: "Molar Mass (M)", desc: "Molar mass is the mass of 1 mole of a chemical compound expressed in grams per mole (g/mol)." },
    { title: "Molecular vs Formula Mass", desc: "Use 'Molecular Mass' (u or Da) for covalent molecules. Use 'Formula Mass' for ionic compounds based on formula units." },
    { title: "Percentage Composition", desc: "% Element = [ (Atom Count × Atomic Mass) / Total Molar Mass ] × 100%" },
    { title: "Hydrates (· xH₂O)", desc: "Hydrates contain water molecules bound in their crystal structure (e.g. CuSO₄·5H₂O water of crystallization)." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Molar Mass & Chemical Composition Analysis Summary
-----------------------------------------
Selected Formula: ${chemicalFormulaInput}
Molar Mass: ${results.activeMolarMass.toFixed(3)} g/mol
Total Atom Count: ${parsedFormulaData.totalAtomCount} atoms
Hydrate Status: ${parsedFormulaData.isHydrate ? `Hydrate (${parsedFormulaData.hydrateWaterCount} H₂O, ${parsedFormulaData.waterPercentage.toFixed(2)}% Water)` : "Anhydrous Compound"}
-----------------------------------------
Elemental Composition:
${parsedFormulaData.breakdown.map(b => `${b.element} (${b.name}): ${b.count} atoms, ${b.totalMass.toFixed(2)} g/mol (${b.percentage.toFixed(2)}%)`).join("\n")}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Molar mass summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the Molar Mass of Water (H2O)? (H = 1.008, O = 15.999 g/mol)", correctAnswer: 18.015, units: "g/mol" },
      { q: "What is the Molar Mass of Sodium Chloride (NaCl)? (Na = 22.990, Cl = 35.45 g/mol)", correctAnswer: 58.44, units: "g/mol" },
      { q: "What is the percentage of Oxygen by mass in Water (H2O)?", correctAnswer: 88.81, units: "%" }
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
            Molar Mass
          </span>
          <Link href="/calculators/mole-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Mole Calculator
          </Link>
          <Link href="/calculators/molarity-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molarity
          </Link>
          <Link href="/calculators/molality-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molality
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
                <Atom className="text-[#518231]" />
                Molar Mass Lab Cockpit
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
                <option value="molar_mass_from_formula">1. Molar Mass from Chemical Formula</option>
                <option value="molecular_mass">2. Molecular Mass (Covalent - Daltons / u)</option>
                <option value="formula_mass">3. Formula Mass (Ionic Formula Units)</option>
                <option value="percentage_composition">4. Percentage Mass Composition Breakdown</option>
                <option value="elemental_contribution">5. Elemental Mass Contribution Table</option>
                <option value="hydrate_molar_mass">6. Hydrate Molar Mass & Water Percentage</option>
                <option value="mass_from_moles">7. Calculate Mass from Moles (m = n × M)</option>
                <option value="moles_from_mass">8. Calculate Moles from Mass (n = m / M)</option>
              </select>
            </div>

            {/* Dynamic Input Controls */}
            <div className="space-y-5">
              
              {/* Primary Output Field */}
              <ReadOnlyField 
                label="Calculated Molar Mass" 
                val={`${parsedFormulaData.totalMolarMass.toFixed(3)} g/mol (${parsedFormulaData.totalMolarMass.toFixed(3)} Da)`} 
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
                    placeholder="e.g. H2O, NaCl, CuSO4.5H2O"
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

              {/* Mass & Moles Conversion Fields */}
              {(calcMode === "moles_from_mass" || calcMode === "mass_from_moles") && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Substance Mass (g)</span>
                    <input
                      type="number"
                      step="1.0"
                      value={substanceMassG}
                      onChange={(e) => setSubstanceMassG(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Moles (n)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={substanceMoles}
                      onChange={(e) => setSubstanceMoles(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Links to Chemistry Hub */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Converting chemical quantities?</span>
              <span className="text-[11px] text-slate-500">Explore Avogadro particle counts and stoichiometry solvers</span>
            </div>
            <Link
              href="/calculators/mole-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Mole Solver
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Periodic Table & Percentage Composition Visualizer */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Percentage Mass Composition Chart */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                📊 Percentage Mass Composition Breakdown
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                {parsedFormulaData.totalAtomCount} Total Atoms
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
                      formatter={(val: any, name: any, item: any) => [`${item.payload.percentage.toFixed(2)}% (${item.payload.totalMass.toFixed(2)} g/mol)`, item.payload.name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <span className="text-xs text-slate-500">Enter a valid formula to render composition chart</span>
              )}
            </div>

            {/* Element Mass Contribution List */}
            <div className="space-y-1.5">
              {parsedFormulaData.breakdown.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}></span>
                    <span className="font-bold">{item.element} ({item.name}) ×{item.count}</span>
                  </div>
                  <span className="font-black text-[#518231]">{item.totalMass.toFixed(2)} g/mol ({item.percentage.toFixed(2)}%)</span>
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
                {(["periodic", "composition", "hydrate", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "periodic" ? "⚛️ Periodic" : tab === "composition" ? "📊 Composition" : tab === "hydrate" ? "💧 Hydrate" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Interactive Periodic Element Quick Picker */}
                {visualTab === "periodic" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚛️ Periodic Table Element Quick Picker</h4>
                    <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                      {Object.values(PERIODIC_ELEMENTS).map((el) => (
                        <button
                          key={el.symbol}
                          type="button"
                          onClick={() => setChemicalFormulaInput(prev => prev + el.symbol)}
                          className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-[#518231] transition-all flex flex-col items-center justify-center shrink-0"
                        >
                          <span className="text-[9px] text-slate-400 font-semibold">{el.number}</span>
                          <span className="text-xs font-black text-slate-900 dark:text-white">{el.symbol}</span>
                          <span className="text-[8px] text-[#518231] font-bold">{el.mass.toFixed(1)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Mass Contribution Breakdown */}
                {visualTab === "composition" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Elemental Composition Analysis</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Molar mass is calculated by multiplying each element's atomic mass by its subscript count and summing the results.
                    </p>
                  </div>
                )}

                {/* Tab 3: Hydrate Analysis */}
                {visualTab === "hydrate" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Hydrate Water of Crystallization Analysis</h4>
                    {parsedFormulaData.isHydrate ? (
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300 space-y-2">
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Anhydrous Compound Mass:</span>
                          <span className="font-bold text-[#518231]">{parsedFormulaData.anhydrousMass.toFixed(2)} g/mol</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Water Mass ({parsedFormulaData.hydrateWaterCount} H₂O):</span>
                          <span className="font-bold text-amber-400">{parsedFormulaData.waterMass.toFixed(2)} g/mol</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Water Percentage by Mass:</span>
                          <span className="font-bold text-white">{parsedFormulaData.waterPercentage.toFixed(2)}%</span>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molar Mass Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Molar Mass & Composition Quiz</h4>
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
