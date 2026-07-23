"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "mass_vs_molar" 
  | "unit_converter" 
  | "solubility_from_ksp" 
  | "ksp_from_solubility" 
  | "max_dissolved" 
  | "saturation_analyzer";

interface CompoundPreset {
  id: string;
  name: string;
  formula: string;
  molarMass: number; // g/mol
  defaultMassSolubility: number; // g/L at 20C
  ksp?: number;
  type: "solid_endo" | "solid_retro" | "sparingly_soluble" | "gas";
  thermalPoints: { tempC: number; solGL: number }[];
}

const COMPOUND_PRESETS: CompoundPreset[] = [
  {
    id: "kno3",
    name: "Potassium Nitrate (KNO3)",
    formula: "KNO3",
    molarMass: 101.10,
    defaultMassSolubility: 316, // g/L
    type: "solid_endo",
    thermalPoints: [
      { tempC: 0, solGL: 133 },
      { tempC: 20, solGL: 316 },
      { tempC: 40, solGL: 639 },
      { tempC: 60, solGL: 1100 },
      { tempC: 80, solGL: 1690 },
      { tempC: 100, solGL: 2460 }
    ]
  },
  {
    id: "nacl",
    name: "Sodium Chloride (NaCl)",
    formula: "NaCl",
    molarMass: 58.44,
    defaultMassSolubility: 360, // g/L
    type: "solid_endo",
    thermalPoints: [
      { tempC: 0, solGL: 357 },
      { tempC: 20, solGL: 360 },
      { tempC: 40, solGL: 366 },
      { tempC: 60, solGL: 373 },
      { tempC: 80, solGL: 384 },
      { tempC: 100, solGL: 398 }
    ]
  },
  {
    id: "agcl",
    name: "Silver Chloride (AgCl)",
    formula: "AgCl",
    molarMass: 143.32,
    defaultMassSolubility: 0.00191, // g/L
    ksp: 1.77e-10,
    type: "sparingly_soluble",
    thermalPoints: [
      { tempC: 0, solGL: 0.00089 },
      { tempC: 20, solGL: 0.00191 },
      { tempC: 50, solGL: 0.0052 },
      { tempC: 100, solGL: 0.021 }
    ]
  },
  {
    id: "caf2",
    name: "Calcium Fluoride (CaF2)",
    formula: "CaF2",
    molarMass: 78.07,
    defaultMassSolubility: 0.0160, // g/L
    ksp: 3.45e-11,
    type: "sparingly_soluble",
    thermalPoints: [
      { tempC: 0, solGL: 0.015 },
      { tempC: 20, solGL: 0.016 },
      { tempC: 60, solGL: 0.018 },
      { tempC: 100, solGL: 0.023 }
    ]
  },
  {
    id: "ce2so43",
    name: "Cerium(III) Sulfate (Ce2(SO4)3)",
    formula: "Ce2(SO4)3",
    molarMass: 568.42,
    defaultMassSolubility: 101, // g/L at 20C (retrograde!)
    type: "solid_retro",
    thermalPoints: [
      { tempC: 0, solGL: 208 },
      { tempC: 20, solGL: 101 },
      { tempC: 40, solGL: 44 },
      { tempC: 60, solGL: 23 },
      { tempC: 80, solGL: 13 },
      { tempC: 100, solGL: 7 }
    ]
  },
  {
    id: "o2_gas",
    name: "Dissolved Oxygen Gas (O2)",
    formula: "O2",
    molarMass: 32.00,
    defaultMassSolubility: 0.0091, // g/L at 20C (9.1 mg/L)
    type: "gas",
    thermalPoints: [
      { tempC: 0, solGL: 0.0146 },
      { tempC: 10, solGL: 0.0113 },
      { tempC: 20, solGL: 0.0091 },
      { tempC: 30, solGL: 0.0075 },
      { tempC: 40, solGL: 0.0065 }
    ]
  }
];

export function SolubilityCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("mass_vs_molar");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);
  const [selectedCompoundId, setSelectedCompoundId] = useState<string>("kno3");

  // Inputs
  const [inputMassSolubility, setInputMassSolubility] = useState<number>(316); // g/L
  const [inputMolarSolubility, setInputMolarSolubility] = useState<number>(3.125); // mol/L
  const [inputMolarMass, setInputMolarMass] = useState<number>(101.10); // g/mol
  const [inputSolventVolume, setInputSolventVolume] = useState<number>(0.50); // L
  const [inputTotalAddedMass, setInputTotalAddedMass] = useState<number>(200); // g
  const [inputCurrentConcGL, setInputCurrentConcGL] = useState<number>(200); // g/L
  const [inputKspVal, setInputKspVal] = useState<number>(1.77e-10);

  // Current Compound Preset
  const compound = useMemo(() => {
    return COMPOUND_PRESETS.find(c => c.id === selectedCompoundId) || COMPOUND_PRESETS[0];
  }, [selectedCompoundId]);

  // Sync inputs when compound changes
  useEffect(() => {
    setInputMolarMass(compound.molarMass);
    setInputMassSolubility(compound.defaultMassSolubility);
    setInputMolarSolubility(compound.defaultMassSolubility / compound.molarMass);
    if (compound.ksp) {
      setInputKspVal(compound.ksp);
    }
  }, [compound]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"thermal_chart" | "units_table" | "flashcards" | "quiz">("thermal_chart");

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

  // Main Calculations Engine
  const results = useMemo(() => {
    const M = Math.max(1, inputMolarMass);
    const S_mass = Math.max(0, inputMassSolubility);
    const S_molar = S_mass / M;

    // Unit conversions
    const sol_gL = S_mass;
    const sol_mgL = S_mass * 1000;
    const sol_g100mL = S_mass / 10;
    const sol_molL = S_molar;
    const sol_mmolL = S_molar * 1000;

    // Max Dissolved Amount for Volume V
    const volL = Math.max(0.001, inputSolventVolume);
    const maxDissolvedMass = S_mass * volL;
    const totalAdded = Math.max(0, inputTotalAddedMass);
    const actualDissolvedMass = Math.min(totalAdded, maxDissolvedMass);
    const remainingUndissolvedMass = Math.max(0, totalAdded - maxDissolvedMass);
    const percentDissolved = totalAdded > 0 ? (actualDissolvedMass / totalAdded) * 100 : 100;

    // Saturation Analyzer
    const currentConcGL = Math.max(0, inputCurrentConcGL);
    const saturationRatio = S_mass > 0 ? currentConcGL / S_mass : 0;
    let saturationState = "Unsaturated (Dissolves completely)";
    let saturationBadge = "bg-blue-950 text-blue-300 border-blue-800";

    if (saturationRatio > 1.01) {
      saturationState = "Supersaturated (Precipitation Thermodynamically Favored)";
      saturationBadge = "bg-[#518231]/20 text-[#518231] border-[#518231]/30";
    } else if (saturationRatio >= 0.99) {
      saturationState = "Saturated (At Dissolution Equilibrium)";
      saturationBadge = "bg-[#518231]/20 text-[#518231] border-[#518231]/30";
    }

    // Solubility from Ksp (assuming 1:1 salt e.g. AgCl => s = sqrt(Ksp))
    const KspInput = Math.max(1e-45, inputKspVal);
    const ksp_molar_s = Math.sqrt(KspInput);
    const ksp_mass_s = ksp_molar_s * M;

    return {
      sol_gL,
      sol_mgL,
      sol_g100mL,
      sol_molL,
      sol_mmolL,
      maxDissolvedMass,
      actualDissolvedMass,
      remainingUndissolvedMass,
      percentDissolved,
      saturationRatio,
      saturationState,
      saturationBadge,
      ksp_molar_s,
      ksp_mass_s
    };
  }, [inputMassSolubility, inputMolarMass, inputSolventVolume, inputTotalAddedMass, inputCurrentConcGL, inputKspVal]);

  // Flashcards Data
  const flashcards = [
    { title: "Molar Solubility vs Mass Solubility", desc: "Molar Solubility (mol/L) measures moles of dissolved solute per liter. Mass Solubility (g/L or g/100 mL) measures mass of solute per volume. Convert via Molar Mass: S_mass = S_molar * M." },
    { title: "Saturated vs Supersaturated Solutions", desc: "Saturated: Solution holds maximum solute at dynamic equilibrium. Supersaturated: Contains more dissolved solute than equilibrium solubility due to careful cooling." },
    { title: "Temperature Dependence", desc: "Most solid dissolution is endothermic (solubility increases with T). Gas dissolution is exothermic (solubility decreases with increasing temperature!)." },
    { title: "Solubility vs Ksp", desc: "Ksp is the equilibrium constant for sparingly soluble salts. Molar solubility s depends on both Ksp and reaction stoichiometry (s = sqrt(Ksp) for 1:1 salt, s = (Ksp/4)^(1/3) for 1:2 salt)." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Solubility Analysis Summary (${compound.name})
------------------------------------
Formula: ${compound.formula}
Molar Mass: ${compound.molarMass} g/mol
Mass Solubility: ${results.sol_gL.toFixed(3)} g/L (${results.sol_g100mL.toFixed(3)} g/100 mL)
Molar Solubility: ${results.sol_molL.toExponential(3)} mol/L (${results.sol_mmolL.toFixed(2)} mmol/L)
Max Dissolved in ${inputSolventVolume} L: ${results.maxDissolvedMass.toFixed(2)} g
Saturation State: ${results.saturationState}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Solubility analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "True or False: Gas solubility in water increases as temperature rises.", correctAnswer: "FALSE" },
      { q: "What is the formula to convert Molar Solubility (mol/L) to Mass Solubility (g/L)?", correctAnswer: "S_MASS = S_MOLAR * MOLAR_MASS" },
      { q: "If a solution contains 150 g/L solute and its solubility is 100 g/L, is it saturated or supersaturated?", correctAnswer: "SUPERSATURATED" }
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
            Solubility Calculator
          </span>
          <Link href="/calculators/ksp-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ksp Calculator
          </Link>
          <Link href="/calculators/equilibrium-constant-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Equilibrium Constant Calculator
          </Link>
          <Link href="/calculators/molarity-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Molarity Calculator
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
                Solubility Input Cockpit
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
                <option value="mass_vs_molar">1. Mass Solubility (g/L) ↔ Molar Solubility (mol/L)</option>
                <option value="unit_converter">2. Multi-Unit Solubility Converter</option>
                <option value="max_dissolved">3. Maximum Dissolved Mass for Volume (V)</option>
                <option value="saturation_analyzer">4. Saturation Analyzer (Unsaturated vs Supersaturated)</option>
                <option value="solubility_from_ksp">5. Solubility from Ksp (Ionic Salts)</option>
              </select>
            </div>

            {/* Compound Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Chemical Compound Preset</label>
              <select
                value={selectedCompoundId}
                onChange={(e) => setSelectedCompoundId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {COMPOUND_PRESETS.map(c => (
                  <option key={c.id} value={c.id}>{c.name} [{c.formula}]</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Mass Solubility</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputMassSolubility}
                      onChange={(e) => setInputMassSolubility(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">g/L</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Molar Mass (M)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputMolarMass}
                      onChange={(e) => setInputMolarMass(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">g/mol</span>
                  </div>
                </div>
              </div>

              {calcMode === "max_dissolved" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Solvent Volume (V)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.05"
                          value={inputSolventVolume}
                          onChange={(e) => setInputSolventVolume(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">L</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Total Added Solute Mass</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="1"
                          value={inputTotalAddedMass}
                          onChange={(e) => setInputTotalAddedMass(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">g</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {calcMode === "saturation_analyzer" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Current Concentration</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="1"
                        value={inputCurrentConcGL}
                        onChange={(e) => setInputCurrentConcGL(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">g/L</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Molar Solubility (S_molar)" 
                val={`${results.sol_molL.toExponential(3)} mol/L`} 
                icon={Atom} 
              />
              <ReadOnlyField 
                label="Mass Solubility (S_mass)" 
                val={`${results.sol_g100mL.toFixed(3)} g/100 mL`} 
                icon={Zap} 
              />

            </div>
          </div>

          {/* Integration Links to Ksp Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Sparingly soluble salt equilibria & Qsp?</span>
              <span className="text-[11px] text-slate-500">Try our companion Ksp Solubility Product Calculator</span>
            </div>
            <Link
              href="/calculators/ksp-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Ksp Tool
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Cockpit & Recharts Thermal Plotter */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Solubility Analysis Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${results.saturationBadge}`}>
                {results.saturationState}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Mass Sol.</span>
                <span className="text-xs font-black text-[#518231]">{results.sol_gL.toFixed(2)} g/L</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Molar Sol.</span>
                <span className="text-xs font-black text-amber-400">{results.sol_molL.toExponential(2)} M</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Max Dissolved ({inputSolventVolume}L)</span>
                <span className="text-xs font-black text-white">{results.maxDissolvedMass.toFixed(1)} g</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">g / 100 mL</span>
                <span className="text-xs font-black text-white">{results.sol_g100mL.toFixed(2)} g</span>
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
                {(["thermal_chart", "units_table", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "thermal_chart" ? "📊 Temperature Curve" : tab === "units_table" ? "📋 Multi-Unit Table" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Recharts Thermal Plotter */}
                {visualTab === "thermal_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Solubility vs Temperature Curve ({compound.name})</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={compound.thermalPoints}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="tempC" label={{ value: "Temperature (°C)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Solubility (g/L)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="solGL" stroke="#10b981" strokeWidth={2} dot={true} name="Solubility (g/L)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 2: Multi-Unit Summary Table */}
                {visualTab === "units_table" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Table size={16} className="text-[#518231]" />
                      Multi-Unit Solubility Summary ({compound.formula})
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                            <th className="p-2.5 text-left">Solubility Unit</th>
                            <th className="p-2.5 text-center">Calculated Value</th>
                            <th className="p-2.5 text-left">Unit Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">g/L</td>
                            <td className="p-2.5 text-center text-[#518231] font-bold">{results.sol_gL.toFixed(3)}</td>
                            <td className="p-2.5 text-slate-500">Grams of solute per liter of solvent</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">g/100 mL</td>
                            <td className="p-2.5 text-center text-amber-600 dark:text-amber-400 font-bold">{results.sol_g100mL.toFixed(3)}</td>
                            <td className="p-2.5 text-slate-500">Standard handbook solubility concentration</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">mg/L (ppm)</td>
                            <td className="p-2.5 text-center text-slate-900 dark:text-white font-bold">{results.sol_mgL.toFixed(1)}</td>
                            <td className="p-2.5 text-slate-500">Milligrams per liter (environmental concentration)</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">mol/L (M)</td>
                            <td className="p-2.5 text-center text-[#518231] font-bold">{results.sol_molL.toExponential(3)}</td>
                            <td className="p-2.5 text-slate-500">Molar solubility (moles per liter)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Solubility Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Solubility Chemistry Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={quizUserAnswer}
                            onChange={(e) => setQuizUserAnswer(e.target.value)}
                            placeholder="Your answer (e.g. FALSE)"
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
