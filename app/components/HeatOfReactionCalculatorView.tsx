"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "heat_from_enthalpy"
  | "formation_enthalpy"
  | "bond_energy"
  | "calorimetry_q_mc_dt"
  | "coffee_cup_calorimetry"
  | "bomb_calorimetry"
  | "hess_law"
  | "stoichiometric_heat";

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
  defaultCalorimeterConstKjC: number; // kJ/°C
  molarMassReactantG: number;
}

const HEAT_OF_REACTION_PRESETS: ThermochemistryPreset[] = [
  {
    id: "methane_combustion",
    name: "Combustion of Methane (CH4 + 2O2 ➔ CO2 + 2H2O)",
    reactionStr: "CH4(g) + 2O2(g) ➔ CO2(g) + 2H2O(l)",
    deltaHKjMol: -890.4,
    hReactantsKj: -74.8,
    hProductsKj: -965.2,
    isExothermic: true,
    defaultMassG: 16.04, // 1 mol CH4
    defaultSpecificHeat: 4.184,
    defaultDeltaTempC: 20.0,
    defaultCalorimeterConstKjC: 0.50,
    molarMassReactantG: 16.04
  },
  {
    id: "propane_combustion",
    name: "Combustion of Propane (C3H8 + 5O2 ➔ 3CO2 + 4H2O)",
    reactionStr: "C3H8(g) + 5O2(g) ➔ 3CO2(g) + 4H2O(l)",
    deltaHKjMol: -2220.0,
    hReactantsKj: -103.8,
    hProductsKj: -2323.8,
    isExothermic: true,
    defaultMassG: 44.1, // 1 mol C3H8
    defaultSpecificHeat: 4.184,
    defaultDeltaTempC: 35.0,
    defaultCalorimeterConstKjC: 1.20,
    molarMassReactantG: 44.1
  },
  {
    id: "acid_base_neutralization",
    name: "Acid-Base Neutralization (HCl + NaOH ➔ NaCl + H2O)",
    reactionStr: "HCl(aq) + NaOH(aq) ➔ NaCl(aq) + H2O(l)",
    deltaHKjMol: -57.1,
    hReactantsKj: -637.2,
    hProductsKj: -694.3,
    isExothermic: true,
    defaultMassG: 100.0,
    defaultSpecificHeat: 4.184,
    defaultDeltaTempC: 6.8,
    defaultCalorimeterConstKjC: 0.15,
    molarMassReactantG: 36.46
  },
  {
    id: "bomb_benzoic_acid",
    name: "Bomb Calorimetry of Benzoic Acid (C7H6O2)",
    reactionStr: "C7H6O2(s) + 7.5O2(g) ➔ 7CO2(g) + 3H2O(l)",
    deltaHKjMol: -3227.0,
    hReactantsKj: -385.2,
    hProductsKj: -3612.2,
    isExothermic: true,
    defaultMassG: 1.22, // ~0.01 mol
    defaultSpecificHeat: 4.184,
    defaultDeltaTempC: 3.12,
    defaultCalorimeterConstKjC: 10.35, // Bomb calorimeter heat capacity
    molarMassReactantG: 122.12
  },
  {
    id: "ammonium_nitrate_solution",
    name: "Dissolution of Ammonium Nitrate (Cold Pack)",
    reactionStr: "NH4NO3(s) ➔ NH4+(aq) + NO3-(aq)",
    deltaHKjMol: 25.7,
    hReactantsKj: -365.6,
    hProductsKj: -339.9,
    isExothermic: false,
    defaultMassG: 80.04, // 1 mol
    defaultSpecificHeat: 4.184,
    defaultDeltaTempC: -6.1,
    defaultCalorimeterConstKjC: 0.10,
    molarMassReactantG: 80.04
  }
];

export function HeatOfReactionCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("heat_from_enthalpy");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("methane_combustion");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [inputDeltaHKjMol, setInputDeltaHKjMol] = useState<number>(-890.4);
  const [inputReactantMoles, setInputReactantMoles] = useState<number>(1.0);
  const [inputMassG, setInputMassG] = useState<number>(16.04);
  const [inputSpecificHeat, setInputSpecificHeat] = useState<number>(4.184); // J/(g*°C)
  const [inputDeltaTempC, setInputDeltaTempC] = useState<number>(20.0); // °C
  const [inputCalorimeterConstKjC, setInputCalorimeterConstKjC] = useState<number>(0.50); // kJ/°C
  const [inputBondsBrokenKj, setInputBondsBrokenKj] = useState<number>(2648); // kJ to break bonds
  const [inputBondsFormedKj, setInputBondsFormedKj] = useState<number>(3466); // kJ released forming bonds

  // Current Preset
  const preset = useMemo(() => {
    return HEAT_OF_REACTION_PRESETS.find(p => p.id === selectedPresetId) || HEAT_OF_REACTION_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setInputDeltaHKjMol(preset.deltaHKjMol);
    setInputMassG(preset.defaultMassG);
    setInputSpecificHeat(preset.defaultSpecificHeat);
    setInputDeltaTempC(preset.defaultDeltaTempC);
    setInputCalorimeterConstKjC(preset.defaultCalorimeterConstKjC);
    setInputReactantMoles(preset.defaultMassG / preset.molarMassReactantG);
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

  // Main Heat of Reaction & Calorimetry Calculations Engine
  const results = useMemo(() => {
    // 1. Total Reaction Heat: q_rxn = n * ΔH_rxn (kJ)
    const totalHeatKj = inputReactantMoles * inputDeltaHKjMol;

    // 2. Calorimetry Heat Solution: q_sol = m * c * ΔT (Joules -> kJ)
    const qSolutionJoules = inputMassG * inputSpecificHeat * inputDeltaTempC;
    const qSolutionKj = qSolutionJoules / 1000;

    // 3. Calorimeter Hardware Heat: q_cal = C_cal * ΔT (kJ)
    const qCalorimeterKj = inputCalorimeterConstKjC * inputDeltaTempC;

    // 4. Coffee-Cup Total Reaction Heat: q_rxn = -(q_sol + q_cal)
    const coffeeCupQRxnKj = -(qSolutionKj + qCalorimeterKj);

    // 5. Bomb Calorimetry Constant Volume Heat: q_v = -C_cal * ΔT
    const bombQVKj = -qCalorimeterKj;

    // 6. Bond Energy Estimated ΔH = Σ(Broken) - Σ(Formed)
    const bondEnergyDeltaHKj = inputBondsBrokenKj - inputBondsFormedKj;

    // Classification
    const isExothermic = inputDeltaHKjMol < 0;
    const reactionTypeLabel = isExothermic 
      ? "Exothermic Reaction (Heat Released q < 0)" 
      : "Endothermic Reaction (Heat Absorbed q > 0)";
    const reactionTypeColor = isExothermic ? "text-[#518231]" : "text-amber-500";

    return {
      totalHeatKj,
      qSolutionKj,
      qCalorimeterKj,
      coffeeCupQRxnKj,
      bombQVKj,
      bondEnergyDeltaHKj,
      isExothermic,
      reactionTypeLabel,
      reactionTypeColor
    };
  }, [inputReactantMoles, inputDeltaHKjMol, inputMassG, inputSpecificHeat, inputDeltaTempC, inputCalorimeterConstKjC, inputBondsBrokenKj, inputBondsFormedKj]);

  // Recharts Calorimetry Sensitivity Data (Heat q vs Temperature Change ΔT)
  const calorimetryData = useMemo(() => {
    const data = [];
    const m = inputMassG;
    const c = inputSpecificHeat;
    const cCal = inputCalorimeterConstKjC;

    for (let dt = -20; dt <= 40; dt += 5) {
      const qSolKj = (m * c * dt) / 1000;
      const qCalKj = cCal * dt;
      const totalQKj = qSolKj + qCalKj;
      data.push({
        deltaTempC: dt,
        HeatTransferredKj: Number(totalQKj.toFixed(2))
      });
    }
    return data;
  }, [inputMassG, inputSpecificHeat, inputCalorimeterConstKjC]);

  // Flashcards Data
  const flashcards = [
    { title: "Heat of Reaction (q_rxn)", desc: "Total heat absorbed or released during a chemical reaction. At constant pressure, q_p = ΔH_rxn." },
    { title: "Exothermic Reaction (q < 0)", desc: "Heat is RELEASED to the surroundings (q_rxn is negative). Surroundings warm up (ΔT > 0)." },
    { title: "Endothermic Reaction (q > 0)", desc: "Heat is ABSORBED from the surroundings (q_rxn is positive). Surroundings cool down (ΔT < 0)." },
    { title: "Coffee-Cup Calorimetry", desc: "Constant-pressure calorimetry: q_rxn = -(q_solution + q_calorimeter), where q_sol = m * c * ΔT." },
    { title: "Bomb Calorimetry (q_v)", desc: "Constant-volume calorimetry: q_v = ΔU = -C_calorimeter * ΔT. Measures internal energy change of reaction." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Heat of Reaction & Thermochemistry Analysis (${preset.name})
------------------------------------
Reaction: ${preset.reactionStr}
Molar Enthalpy Change (ΔH_rxn): ${inputDeltaHKjMol} kJ/mol
Reactant Amount: ${inputReactantMoles.toFixed(3)} moles (${inputMassG} g)
Total Heat of Reaction (q_rxn): ${results.totalHeatKj.toFixed(2)} kJ
Reaction Classification: ${results.reactionTypeLabel}
Solution Calorimetry Heat (q_sol = mcΔT): ${results.qSolutionKj.toFixed(2)} kJ
Calorimeter Hardware Heat (q_cal): ${results.qCalorimeterKj.toFixed(2)} kJ
Coffee-Cup Reaction Heat: ${results.coffeeCupQRxnKj.toFixed(2)} kJ`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Heat of Reaction analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "Under Constant Pressure conditions, what thermodynamic quantity equals heat of reaction (q_p)?", correctAnswer: "DELTA H" },
      { q: "In Coffee-Cup Calorimetry, if the solution temperature INCREASES (ΔT > 0), is the chemical reaction Exothermic or Endothermic?", correctAnswer: "EXOTHERMIC" },
      { q: "What does Constant-Volume Bomb Calorimetry directly measure (q_v)?", correctAnswer: "DELTA U" }
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
          Thermochemistry Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Heat of Reaction Calculator
          </span>
          <Link href="/calculators/enthalpy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Enthalpy Calculator
          </Link>
          <Link href="/calculators/gibbs-free-energy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Gibbs Free Energy Calculator
          </Link>
          <Link href="/calculators/cell-potential-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Cell Potential Calculator
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
                Reaction Heat Cockpit
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
                <option value="heat_from_enthalpy">1. Heat of Reaction (q = n * ΔH_rxn)</option>
                <option value="calorimetry_q_mc_dt">2. Solution Calorimetry (q = m * c * ΔT)</option>
                <option value="coffee_cup_calorimetry">3. Coffee-Cup Calorimetry (q_rxn = -(q_sol + q_cal))</option>
                <option value="bomb_calorimetry">4. Bomb Calorimetry (q_v = -C_cal * ΔT)</option>
                <option value="stoichiometric_heat">5. Stoichiometric Total Heat from Mass</option>
                <option value="bond_energy">6. Bond Energy Method (Broken - Formed)</option>
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
                {HEAT_OF_REACTION_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Molar Reaction Enthalpy (ΔH_rxn)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={inputDeltaHKjMol}
                      onChange={(e) => setInputDeltaHKjMol(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">kJ/mol</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Reactant Moles (n)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputReactantMoles}
                      onChange={(e) => setInputReactantMoles(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">mol</span>
                  </div>
                </div>
              </div>

              {(calcMode === "calorimetry_q_mc_dt" || calcMode === "coffee_cup_calorimetry" || calcMode === "stoichiometric_heat") && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Solution / Substance Mass (m)</span>
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

              {(calcMode === "coffee_cup_calorimetry" || calcMode === "bomb_calorimetry") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Calorimeter Const (C_cal)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.01"
                        value={inputCalorimeterConstKjC}
                        onChange={(e) => setInputCalorimeterConstKjC(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">kJ/°C</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Total Heat of Reaction (q_rxn)" 
                val={`${results.totalHeatKj.toFixed(2)} kJ`} 
                icon={Flame} 
              />
              <ReadOnlyField 
                label="Solution Calorimetry Heat (q_sol)" 
                val={`${results.qSolutionKj.toFixed(2)} kJ`} 
                icon={Thermometer} 
              />

            </div>
          </div>

          {/* Integration Links to Enthalpy Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need Hess's Law or Bond Enthalpy analysis?</span>
              <span className="text-[11px] text-slate-500">Try our companion Enthalpy Calculator</span>
            </div>
            <Link
              href="/calculators/enthalpy-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Enthalpy Tool
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
                🧪 Reaction Heat Cockpit
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
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Total Heat (q_rxn)</span>
                <span className={`text-xs font-black ${results.reactionTypeColor}`}>{results.totalHeatKj.toFixed(2)} kJ</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Molar ΔH_rxn</span>
                <span className="text-xs font-black text-amber-400">{inputDeltaHKjMol.toFixed(1)} kJ/mol</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Reactant Moles</span>
                <span className="text-xs font-black text-white">{inputReactantMoles.toFixed(3)} mol</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Coffee-Cup q_rxn</span>
                <span className="text-xs font-black text-white">{results.coffeeCupQRxnKj.toFixed(2)} kJ</span>
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
                    {tab === "energy_profile" ? "⚡ Reaction Profile" : tab === "calorimetry_chart" ? "📊 Heat Plot" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Reaction Profile Diagram */}
                {visualTab === "energy_profile" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Reaction Potential Energy Profile ({preset.name})
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400">Reaction: {preset.reactionStr}</span>
                        <span className={`text-[11px] font-bold ${results.reactionTypeColor}`}>{results.reactionTypeLabel}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Molar ΔH_rxn</span>
                          <span className={`font-bold ${results.reactionTypeColor}`}>{inputDeltaHKjMol.toFixed(1)} kJ/mol</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Reactant Amount</span>
                          <span className="font-bold text-cyan-400">{inputReactantMoles.toFixed(3)} mol</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Total Heat q_rxn</span>
                          <span className={`font-bold ${results.reactionTypeColor}`}>{results.totalHeatKj.toFixed(2)} kJ</span>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Total Calorimetry Heat Transferred (kJ) vs Temperature Change ΔT (°C)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={calorimetryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="deltaTempC" label={{ value: "Temp Change (°C)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Heat Transferred (kJ)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="HeatTransferredKj" stroke="#10b981" strokeWidth={2} dot={true} name="Heat Transferred (kJ)" />
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
