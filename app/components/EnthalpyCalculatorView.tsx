"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "delta_h" 
  | "formation_enthalpy" 
  | "bond_energy" 
  | "calorimetry" 
  | "hess_law" 
  | "combustion";

interface ThermochemistryPreset {
  id: string;
  name: string;
  reactionStr: string;
  deltaHKjMol: number; // kJ/mol
  hReactantsKj: number;
  hProductsKj: number;
  isExothermic: boolean;
  defaultMassG: number;
  defaultSpecificHeat: number; // J/(g*°C)
  defaultDeltaTempC: number;
}

const THERMOCHEMISTRY_PRESETS: ThermochemistryPreset[] = [
  {
    id: "methane_combustion",
    name: "Combustion of Methane (CH4 + 2O2 ➔ CO2 + 2H2O)",
    reactionStr: "CH4(g) + 2O2(g) ➔ CO2(g) + 2H2O(l)",
    deltaHKjMol: -890.4,
    hReactantsKj: -74.8,
    hProductsKj: -965.2,
    isExothermic: true,
    defaultMassG: 100,
    defaultSpecificHeat: 4.184,
    defaultDeltaTempC: 15.0
  },
  {
    id: "propane_combustion",
    name: "Combustion of Propane (C3H8 + 5O2 ➔ 3CO2 + 4H2O)",
    reactionStr: "C3H8(g) + 5O2(g) ➔ 3CO2(g) + 4H2O(l)",
    deltaHKjMol: -2220.0,
    hReactantsKj: -103.8,
    hProductsKj: -2323.8,
    isExothermic: true,
    defaultMassG: 200,
    defaultSpecificHeat: 4.184,
    defaultDeltaTempC: 25.0
  },
  {
    id: "acid_base_neutralization",
    name: "Acid-Base Neutralization (HCl + NaOH ➔ NaCl + H2O)",
    reactionStr: "HCl(aq) + NaOH(aq) ➔ NaCl(aq) + H2O(l)",
    deltaHKjMol: -57.1,
    hReactantsKj: -637.2,
    hProductsKj: -694.3,
    isExothermic: true,
    defaultMassG: 100,
    defaultSpecificHeat: 4.184,
    defaultDeltaTempC: 6.8
  },
  {
    id: "water_vaporization",
    name: "Water Vaporization (H2O(l) ➔ H2O(g))",
    reactionStr: "H2O(l) ➔ H2O(g)",
    deltaHKjMol: 40.7,
    hReactantsKj: -285.8,
    hProductsKj: -241.8,
    isExothermic: false,
    defaultMassG: 50,
    defaultSpecificHeat: 4.184,
    defaultDeltaTempC: -5.0
  },
  {
    id: "ammonium_nitrate_solution",
    name: "Dissolution of Ammonium Nitrate (Cold Pack)",
    reactionStr: "NH4NO3(s) ➔ NH4+(aq) + NO3-(aq)",
    deltaHKjMol: 25.7,
    hReactantsKj: -365.6,
    hProductsKj: -339.9,
    isExothermic: false,
    defaultMassG: 100,
    defaultSpecificHeat: 4.184,
    defaultDeltaTempC: -6.1
  }
];

export function EnthalpyCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("delta_h");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("methane_combustion");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [inputHProductsKj, setInputHProductsKj] = useState<number>(-965.2);
  const [inputHReactantsKj, setInputHReactantsKj] = useState<number>(-74.8);
  const [inputMassG, setInputMassG] = useState<number>(100);
  const [inputSpecificHeat, setInputSpecificHeat] = useState<number>(4.184); // J/(g*°C)
  const [inputDeltaTempC, setInputDeltaTempC] = useState<number>(15.0); // °C
  const [inputBondsBrokenKj, setInputBondsBrokenKj] = useState<number>(2648); // J to break bonds
  const [inputBondsFormedKj, setInputBondsFormedKj] = useState<number>(3466); // J released forming bonds

  // Current Preset
  const preset = useMemo(() => {
    return THERMOCHEMISTRY_PRESETS.find((p: ThermochemistryPreset) => p.id === selectedPresetId) || THERMOCHEMISTRY_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setInputHProductsKj(preset.hProductsKj);
    setInputHReactantsKj(preset.hReactantsKj);
    setInputMassG(preset.defaultMassG);
    setInputSpecificHeat(preset.defaultSpecificHeat);
    setInputDeltaTempC(preset.defaultDeltaTempC);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"energy_profile" | "calorimetry_chart" | "temp_chart" | "flashcards" | "quiz">("energy_profile");

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

  // Main Enthalpy & Calorimetry Calculations Engine
  const results = useMemo(() => {
    // ΔH = H_products - H_reactants (kJ/mol)
    const deltaHKj = inputHProductsKj - inputHReactantsKj;

    // Calorimetry Heat: q = m * c * ΔT (Joules -> kJ)
    const heatJoules = inputMassG * inputSpecificHeat * inputDeltaTempC;
    const heatKj = heatJoules / 1000;

    // Bond Energy ΔH = Σ(Bonds Broken) - Σ(Bonds Formed) (kJ/mol)
    const bondEnergyDeltaHKj = inputBondsBrokenKj - inputBondsFormedKj;

    // Classification
    const isExothermic = deltaHKj < 0;
    const reactionTypeLabel = isExothermic 
      ? "Exothermic Reaction (Heat Released ΔH < 0)" 
      : "Endothermic Reaction (Heat Absorbed ΔH > 0)";
    const reactionTypeColor = isExothermic ? "text-[#518231]" : "text-amber-500";

    return {
      deltaHKj,
      heatJoules,
      heatKj,
      bondEnergyDeltaHKj,
      isExothermic,
      reactionTypeLabel,
      reactionTypeColor
    };
  }, [inputHProductsKj, inputHReactantsKj, inputMassG, inputSpecificHeat, inputDeltaTempC, inputBondsBrokenKj, inputBondsFormedKj]);

  // Recharts Calorimetry Sensitivity Data (Heat q vs Temperature Change ΔT)
  const calorimetryData = useMemo(() => {
    const data = [];
    const m = inputMassG;
    const c = inputSpecificHeat;

    for (let dt = -20; dt <= 40; dt += 5) {
      const qKj = (m * c * dt) / 1000;
      data.push({
        deltaTempC: dt,
        HeatKj: Number(qKj.toFixed(2))
      });
    }
    return data;
  }, [inputMassG, inputSpecificHeat]);

  // Flashcards Data
  const flashcards = [
    { title: "Enthalpy Change (ΔH)", desc: "ΔH = H_products - H_reactants. Represents the net heat energy absorbed or released by a chemical system at constant pressure." },
    { title: "Exothermic Reaction (ΔH < 0)", desc: "Heat is RELEASED to the surroundings. Products have LOWER energy than reactants (ΔH is negative)." },
    { title: "Endothermic Reaction (ΔH > 0)", desc: "Heat is ABSORBED from the surroundings. Products have HIGHER energy than reactants (ΔH is positive)." },
    { title: "Calorimetry Equation (q = mcΔT)", desc: "q = mass * specific_heat * ΔT. Calculates total heat energy transferred during temperature changes in water or solution." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Enthalpy & Thermochemistry Analysis (${preset.name})
------------------------------------
Reaction: ${preset.reactionStr}
Reactants Enthalpy: ${inputHReactantsKj} kJ/mol
Products Enthalpy: ${inputHProductsKj} kJ/mol
Enthalpy Change (ΔH): ${results.deltaHKj.toFixed(2)} kJ/mol
Reaction Classification: ${results.reactionTypeLabel}
Calorimetry Heat (q = mcΔT): ${results.heatKj.toFixed(2)} kJ (${results.heatJoules.toFixed(0)} J)
Mass: ${inputMassG} g | Specific Heat: ${inputSpecificHeat} J/(g·°C) | ΔT: ${inputDeltaTempC} °C`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Enthalpy analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the sign of ΔH for an EXOTHERMIC reaction that releases heat?", correctAnswer: "NEGATIVE" },
      { q: "What is the formula for heat in calorimetry given mass m, specific heat c, and temperature change ΔT?", correctAnswer: "Q = MCΔT" },
      { q: "In an Endothermic reaction, do Products have HIGHER or LOWER energy than Reactants?", correctAnswer: "HIGHER" }
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
          Thermodynamics Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Enthalpy Calculator
          </span>
          <Link href="/calculators/gibbs-free-energy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Gibbs Free Energy Calculator
          </Link>
          <Link href="/calculators/cell-potential-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Cell Potential Calculator
          </Link>
          <Link href="/calculators/electrolysis-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electrolysis Calculator
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
                <Flame className="text-[#518231]" />
                Enthalpy Cockpit
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

            {/* Mode Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Calculation Mode</label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as CalculationMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="delta_h">1. Calculate ΔH (H_products - H_reactants)</option>
                <option value="calorimetry">2. Calorimetry Heat (q = m * c * ΔT)</option>
                <option value="bond_energy">3. Bond Energy ΔH (Broken - Formed)</option>
                <option value="combustion">4. Enthalpy of Combustion</option>
              </select>
            </div>

            {/* Reaction Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Reaction Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {THERMOCHEMISTRY_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Products Enthalpy (H_prod)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={inputHProductsKj}
                      onChange={(e) => setInputHProductsKj(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">kJ/mol</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Reactants Enthalpy (H_react)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={inputHReactantsKj}
                      onChange={(e) => setInputHReactantsKj(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">kJ/mol</span>
                  </div>
                </div>
              </div>

              {calcMode === "calorimetry" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Substance Mass (m)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="1"
                          value={inputMassG}
                          onChange={(e) => setInputMassG(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">g</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Specific Heat (c)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.001"
                          value={inputSpecificHeat}
                          onChange={(e) => setInputSpecificHeat(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">J/g·°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Temp Change (ΔT)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.1"
                          value={inputDeltaTempC}
                          onChange={(e) => setInputDeltaTempC(Number(e.target.value))}
                          className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                        />
                        <span className="text-xs font-bold text-slate-400">°C</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Enthalpy Change (ΔH)" 
                val={`${results.deltaHKj.toFixed(2)} kJ/mol`} 
                icon={Flame} 
              />
              <ReadOnlyField 
                label="Calorimetry Heat (q)" 
                val={`${results.heatKj.toFixed(2)} kJ`} 
                icon={Thermometer} 
              />

            </div>
          </div>

          {/* Integration Links to Gibbs Free Energy Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need Gibbs free energy or spontaneity?</span>
              <span className="text-[11px] text-slate-500">Try our companion Gibbs Free Energy Calculator</span>
            </div>
            <Link
              href="/calculators/gibbs-free-energy-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Gibbs Tool
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
                🧪 Thermochemistry Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                results.isExothermic 
                  ? "bg-green-950 text-green-300 border-green-800" 
                  : "bg-amber-950 text-amber-300 border-amber-800"
              }`}>
                {results.isExothermic ? "Exothermic" : "Endothermic"}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">ΔH (kJ/mol)</span>
                <span className={`text-xs font-black ${results.reactionTypeColor}`}>{results.deltaHKj.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">H_reactants</span>
                <span className="text-xs font-black text-amber-400">{inputHReactantsKj.toFixed(1)} kJ</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">H_products</span>
                <span className="text-xs font-black text-white">{inputHProductsKj.toFixed(1)} kJ</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Calorimetry q</span>
                <span className="text-xs font-black text-white">{results.heatKj.toFixed(2)} kJ</span>
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
                {(["energy_profile", "calorimetry_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "energy_profile" ? "⚡ Enthalpy Profile" : tab === "calorimetry_chart" ? "📊 Heat Plot" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Energy Profile Diagram */}
                {visualTab === "energy_profile" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Reaction Enthalpy Profile ({preset.name})
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400">Reaction: {preset.reactionStr}</span>
                        <span className={`text-[11px] font-bold ${results.reactionTypeColor}`}>{results.reactionTypeLabel}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Reactants Energy</span>
                          <span className="font-bold text-amber-400">{inputHReactantsKj.toFixed(1)} kJ/mol</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Products Energy</span>
                          <span className="font-bold text-cyan-400">{inputHProductsKj.toFixed(1)} kJ/mol</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Enthalpy Change ΔH</span>
                          <span className={`font-bold ${results.reactionTypeColor}`}>{results.deltaHKj.toFixed(2)} kJ/mol</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        Heat Flow: <span className="font-bold text-white">{results.isExothermic ? "Heat Released to Surroundings" : "Heat Absorbed from Surroundings"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Recharts Calorimetry Plotter */}
                {visualTab === "calorimetry_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Calorimetry Heat q (kJ) vs Temperature Change ΔT (°C)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={calorimetryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="deltaTempC" label={{ value: "Temp Change (°C)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Heat q (kJ)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="HeatKj" stroke="#10b981" strokeWidth={2} dot={true} name="Heat Transferred q (kJ)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Thermochemistry Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Thermochemistry Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
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
