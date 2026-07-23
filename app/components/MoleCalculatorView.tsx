"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

type CalculationMode = 
  | "moles_from_mass" 
  | "mass_from_moles" 
  | "moles_from_particles" 
  | "particles_from_moles" 
  | "molar_mass" 
  | "moles_from_formula_mass" 
  | "number_of_atoms" 
  | "number_of_molecules" 
  | "formula_units" 
  | "number_of_ions" 
  | "mole_conversion_map" 
  | "moles_vs_molarity_vs_molality";

// Avogadro's Constant
const AVOGADRO_NUMBER = 6.02214076e23;

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
  percentage: number;
}

// Parser for Chemical Formulas
function parseChemicalFormula(formulaStr: string): { totalMolarMass: number; breakdown: ElementContribution[]; totalAtomCount: number; isValid: boolean; errorMsg?: string } {
  try {
    const cleanFormula = formulaStr.trim().replace(/\s+/g, "");
    if (!cleanFormula) return { totalMolarMass: 0, breakdown: [], totalAtomCount: 0, isValid: false, errorMsg: "Formula is empty" };

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
    const breakdown: ElementContribution[] = [];

    for (const [el, count] of Object.entries(counts)) {
      const weight = ATOMIC_WEIGHTS[el] || 0;
      const totalMass = weight * count;
      totalMolarMass += totalMass;
      totalAtomCount += count;
    }

    for (const [el, count] of Object.entries(counts)) {
      const weight = ATOMIC_WEIGHTS[el] || 0;
      const totalMass = weight * count;
      const percentage = totalMolarMass > 0 ? (totalMass / totalMolarMass) * 100 : 0;
      breakdown.push({ element: el, count, atomicWeight: weight, totalMass, percentage });
    }

    return { totalMolarMass, breakdown, totalAtomCount, isValid: true };
  } catch (err: any) {
    return { totalMolarMass: 0, breakdown: [], totalAtomCount: 0, isValid: false, errorMsg: err.message || "Invalid chemical formula" };
  }
}

export function MoleCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("moles_from_mass");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Common Inputs
  const [soluteMassG, setSoluteMassG] = useState<number>(18.015); // 18.015 g (1 mol H2O)
  const [soluteMoles, setSoluteMoles] = useState<number>(1.0); // 1.0 mol
  const [particleCountInput, setParticleCountInput] = useState<number>(6.02214076e23);
  const [molarMassGmol, setMolarMassGmol] = useState<number>(18.015); // H2O

  // Chemical Formula Input
  const [chemicalFormulaInput, setChemicalFormulaInput] = useState<string>("H2O");
  const [particleType, setParticleType] = useState<"molecules" | "formula_units" | "atoms" | "ions">("molecules");

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"flow" | "avogadro" | "composition" | "flashcards" | "quiz">("flow");

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
    let calculatedMoles = soluteMoles;
    let calculatedMassG = soluteMassG;
    let calculatedParticles = particleCountInput;

    const activeMolarMass = parsedFormulaData.isValid ? parsedFormulaData.totalMolarMass : molarMassGmol;

    if (calcMode === "moles_from_mass" || calcMode === "moles_from_formula_mass") {
      calculatedMoles = activeMolarMass > 0 ? soluteMassG / activeMolarMass : 0;
      calculatedParticles = calculatedMoles * AVOGADRO_NUMBER;
    } else if (calcMode === "mass_from_moles") {
      calculatedMassG = soluteMoles * activeMolarMass;
      calculatedParticles = soluteMoles * AVOGADRO_NUMBER;
    } else if (calcMode === "moles_from_particles") {
      calculatedMoles = particleCountInput / AVOGADRO_NUMBER;
      calculatedMassG = calculatedMoles * activeMolarMass;
    } else if (calcMode === "particles_from_moles") {
      calculatedParticles = soluteMoles * AVOGADRO_NUMBER;
      calculatedMassG = soluteMoles * activeMolarMass;
    }

    // Atom / Ion Counting Breakdown
    const totalAtomsCount = calculatedMoles * parsedFormulaData.totalAtomCount * AVOGADRO_NUMBER;

    return {
      calculatedMoles,
      calculatedMassG,
      calculatedParticles,
      activeMolarMass,
      totalAtomsCount
    };
  }, [calcMode, soluteMoles, soluteMassG, particleCountInput, molarMassGmol, parsedFormulaData]);

  // Flashcards Data
  const flashcards = [
    { title: "The Mole (n)", desc: "1 mole is the exact amount of substance containing 6.02214076 × 10²³ elementary entities (atoms, molecules, formula units, or ions)." },
    { title: "Avogadro's Constant (Nₐ)", desc: "Nₐ = 6.02214076 × 10²³ mol⁻¹. Connects macroscopic mass in grams to submicroscopic particle count!" },
    { title: "Molar Mass (M)", desc: "Molar mass (g/mol) is the mass of 1 mole of a chemical substance, calculated by summing elemental atomic weights." },
    { title: "Molecules vs Formula Units", desc: "Use 'Molecules' for covalent substances (e.g. H₂O). Use 'Formula Units' for ionic crystal lattices (e.g. NaCl, CaCl₂)." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Mole & Chemistry Quantity Analysis Summary
-----------------------------------------
Selected Mode: ${calcMode.toUpperCase()}
Chemical Formula: ${chemicalFormulaInput}
Molar Mass: ${results.activeMolarMass.toFixed(3)} g/mol
Moles (n): ${results.calculatedMoles.toFixed(4)} mol
Mass (m): ${results.calculatedMassG.toFixed(3)} grams
Total Particles (N): ${results.calculatedParticles.toExponential(4)} ${particleType}
Total Atoms: ${results.totalAtomsCount.toExponential(4)} atoms`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Mole quantity summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "How many moles of water (H2O, MM = 18.015 g/mol) are present in 36.03 grams of water?", correctAnswer: 2.0, units: "moles" },
      { q: "How many molecules are in 1.0 mole of Carbon Dioxide (CO2)? (Avogadro's constant = 6.022 × 10²³)", correctAnswer: 6.022e23, units: "molecules" },
      { q: "What is the total mass (grams) of 0.50 moles of NaCl (Molar Mass = 58.44 g/mol)?", correctAnswer: 29.22, units: "grams" }
    ];

    const rand = questions[Math.floor(Math.random() * questions.length)];
    setQuizQuestion(rand);
    setQuizUserAnswer("");
    setQuizChecked(false);
  };

  const handleCheckQuiz = () => {
    if (!quizQuestion) return;
    const userVal = parseFloat(quizUserAnswer);
    const diff = Math.abs(userVal - quizQuestion.correctAnswer) / (quizQuestion.correctAnswer || 1);
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
            Mole Solver
          </span>
          <Link href="/calculators/molarity-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molarity
          </Link>
          <Link href="/calculators/molality-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molality
          </Link>
          <Link href="/calculators/solar-panel-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Solar Panel
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
                Mole Quantity Cockpit
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
                <option value="moles_from_mass">1. Calculate Moles from Mass (n = m / M)</option>
                <option value="mass_from_moles">2. Calculate Mass from Moles (m = n × M)</option>
                <option value="moles_from_particles">3. Calculate Moles from Particles (n = N / Na)</option>
                <option value="particles_from_moles">4. Calculate Particles from Moles (N = n × Na)</option>
                <option value="molar_mass">5. Molar Mass Assistant & Formula Parser</option>
                <option value="moles_from_formula_mass">6. Moles & Particles from Formula + Mass</option>
                <option value="number_of_atoms">7. Calculate Total & Element Atom Count</option>
                <option value="number_of_molecules">8. Calculate Number of Molecules</option>
                <option value="formula_units">9. Calculate Formula Units (Ionic Compounds)</option>
                <option value="number_of_ions">10. Calculate Cation & Anion Ion Count</option>
                <option value="mole_conversion_map">11. Mole Conversion Map Flow Assistant</option>
              </select>
            </div>

            {/* Dynamic Input Controls */}
            <div className="space-y-5">
              
              {/* Primary Output Field */}
              <ReadOnlyField 
                label="Calculated Moles (n)" 
                val={`${results.calculatedMoles.toFixed(4)} mol`} 
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
                    placeholder="e.g. H2O, NaCl, H2SO4"
                    className="w-32 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-xs uppercase"
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {["H2O", "NaCl", "H2SO4", "C6H12O6", "Al2(SO4)3"].map(f => (
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

              {/* Solute Mass Input (Grams) */}
              {(calcMode === "moles_from_mass" || calcMode === "moles_from_formula_mass" || calcMode === "number_of_atoms") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Substance Mass (Grams)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={soluteMassG}
                      onChange={(e) => setSoluteMassG(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Moles Input */}
              {(calcMode === "mass_from_moles" || calcMode === "particles_from_moles") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Substance Amount (Moles)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={soluteMoles}
                      onChange={(e) => setSoluteMoles(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Particle Count Input */}
              {calcMode === "moles_from_particles" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Particle Count (N)</span>
                    <input
                      type="number"
                      step="1e22"
                      value={particleCountInput}
                      onChange={(e) => setParticleCountInput(Number(e.target.value))}
                      className="w-32 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Links to Solution Concentration Tools */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Calculating solution concentrations?</span>
              <span className="text-[11px] text-slate-500">Explore Molarity (mol/L) and Molality (mol/kg) calculators</span>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/calculators/molarity-calculator"
                className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-2.5 py-1.5 rounded-xl transition-colors shrink-0"
              >
                Molarity
              </Link>
              <Link
                href="/calculators/molality-calculator"
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl transition-colors shrink-0"
              >
                Molality
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Conversion Map & Avogadro Visualizer Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Mass-Mole-Particle Conversion Flow Map */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🗺️ Mass ↔ Moles ↔ Avogadro Particle Conversion Flow
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                Nₐ = 6.022 × 10²³
              </span>
            </div>

            {/* Interactive SVG Conversion Pathway Map */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              <div className="w-full max-w-md h-36 relative flex items-center justify-center">
                <svg viewBox="0 0 400 120" className="w-full h-full">
                  
                  {/* Mass Node */}
                  <rect x="20" y="35" width="90" height="50" rx="12" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                  <text x="65" y="58" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Mass (g)</text>
                  <text x="65" y="74" fill="#94a3b8" fontSize="10" textAnchor="middle">{results.calculatedMassG.toFixed(2)}g</text>

                  {/* Flow Arrow 1 */}
                  <line x1="115" y1="60" x2="145" y2="60" stroke="#518231" strokeWidth="3" markerEnd="url(#arrow)" />
                  <text x="130" y="50" fill="#518231" fontSize="9" fontWeight="bold" textAnchor="middle">÷ MM</text>

                  {/* Moles Node */}
                  <rect x="150" y="30" width="100" height="60" rx="14" fill="#518231" opacity="0.25" stroke="#518231" strokeWidth="3" />
                  <text x="200" y="56" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Moles (n)</text>
                  <text x="200" y="74" fill="#10b981" fontSize="11" fontWeight="black" textAnchor="middle">{results.calculatedMoles.toFixed(3)} mol</text>

                  {/* Flow Arrow 2 */}
                  <line x1="255" y1="60" x2="285" y2="60" stroke="#518231" strokeWidth="3" />
                  <text x="270" y="50" fill="#518231" fontSize="9" fontWeight="bold" textAnchor="middle">× Nₐ</text>

                  {/* Particles Node */}
                  <rect x="290" y="35" width="95" height="50" rx="12" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                  <text x="337" y="58" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Particles (N)</text>
                  <text x="337" y="74" fill="#f59e0b" fontSize="9" textAnchor="middle">{results.calculatedParticles.toExponential(2)}</text>
                </svg>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Substance Mass</span>
                <span className="text-xs font-black text-white">{results.calculatedMassG.toFixed(2)} Grams</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Moles (n)</span>
                <span className="text-xs font-black text-[#518231]">{results.calculatedMoles.toFixed(3)} Moles</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Molar Mass</span>
                <span className="text-xs font-black text-amber-400">{results.activeMolarMass.toFixed(2)} g/mol</span>
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
                {(["flow", "avogadro", "composition", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "flow" ? "Overview" : tab === "avogadro" ? "🔬 Avogadro" : tab === "composition" ? "⚛️ Composition" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Overview */}
                {visualTab === "flow" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚛️ The Mole Concept & Avogadro's Number</h4>
                    <p className="leading-relaxed">
                      1 mole of any substance contains exactly **6.02214076 × 10²³** entities. Moles serve as the fundamental bridge linking macroscopic mass (grams) to molecular particle counts.
                    </p>
                  </div>
                )}

                {/* Tab 2: Avogadro's Number Visualization */}
                {visualTab === "avogadro" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Avogadro's Particle Scale Solver</h4>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300 space-y-2">
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Avogadro's Constant (Nₐ):</span>
                        <span className="font-bold text-[#518231]">6.02214076 × 10²³ mol⁻¹</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Calculated Entities ({particleType}):</span>
                        <span className="font-bold text-amber-400">{results.calculatedParticles.toExponential(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Constituent Atoms:</span>
                        <span className="font-bold text-white">{results.totalAtomsCount.toExponential(4)} Atoms</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Elemental Composition */}
                {visualTab === "composition" && (
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Elemental Composition Breakdown ({chemicalFormulaInput})</h4>
                    {parsedFormulaData.isValid && (
                      <div className="space-y-1">
                        {parsedFormulaData.breakdown.map((item, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <span>{item.element} (×{item.count}): {item.totalMass.toFixed(2)} g/mol</span>
                            <span className="font-bold text-[#518231]">{item.percentage.toFixed(2)}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 4: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mole Concept Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mole Concept Quiz</h4>
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
                                <span>Correct! The answer is {quizQuestion.correctAnswer.toPrecision(4)} {quizQuestion.units}.</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={16} className="text-red-600 shrink-0" />
                                <span>Incorrect. The correct answer is {quizQuestion.correctAnswer.toPrecision(4)} {quizQuestion.units}. Try again!</span>
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
