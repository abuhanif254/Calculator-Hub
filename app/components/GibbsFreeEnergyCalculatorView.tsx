"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "delta_g" 
  | "delta_h" 
  | "delta_s" 
  | "temperature" 
  | "k_from_delta_g" 
  | "delta_g_from_k" 
  | "non_standard_q" 
  | "electrochemistry";

interface ThermodynamicsPreset {
  id: string;
  name: string;
  reactionStr: string;
  deltaHKjMol: number; // kJ/mol
  deltaSJMolK: number; // J/(mol*K)
  defaultTempC: number; // °C
  defaultK: number;
  defaultQ: number;
  defaultEcellV: number;
  nElectrons: number;
}

const THERMODYNAMICS_PRESETS: ThermodynamicsPreset[] = [
  {
    id: "methane_combustion",
    name: "Combustion of Methane (CH4 + 2O2 ➔ CO2 + 2H2O)",
    reactionStr: "CH4(g) + 2O2(g) ➔ CO2(g) + 2H2O(l)",
    deltaHKjMol: -890.4,
    deltaSJMolK: -242.8,
    defaultTempC: 25,
    defaultK: 1e140,
    defaultQ: 1.0,
    defaultEcellV: 1.15,
    nElectrons: 8
  },
  {
    id: "ammonia_synthesis",
    name: "Haber-Bosch Ammonia Synthesis (N2 + 3H2 ➔ 2NH3)",
    reactionStr: "N2(g) + 3H2(g) ➔ 2NH3(g)",
    deltaHKjMol: -91.8,
    deltaSJMolK: -198.1,
    defaultTempC: 25,
    defaultK: 5.8e5,
    defaultQ: 1.0,
    defaultEcellV: 0.16,
    nElectrons: 6
  },
  {
    id: "ammonium_nitrate_dissolution",
    name: "Dissolution of Ammonium Nitrate (Cold Pack)",
    reactionStr: "NH4NO3(s) ➔ NH4+(aq) + NO3-(aq)",
    deltaHKjMol: 25.7,
    deltaSJMolK: 108.7,
    defaultTempC: 25,
    defaultK: 0.084,
    defaultQ: 1.0,
    defaultEcellV: -0.07,
    nElectrons: 1
  },
  {
    id: "water_splitting",
    name: "Water Splitting (2H2O ➔ 2H2 + O2)",
    reactionStr: "2H2O(l) ➔ 2H2(g) + O2(g)",
    deltaHKjMol: 571.6,
    deltaSJMolK: 327.2,
    defaultTempC: 25,
    defaultK: 1e-83,
    defaultQ: 1.0,
    defaultEcellV: -1.23,
    nElectrons: 4
  },
  {
    id: "daniell_cell",
    name: "Daniell Cell Redox (Zn + Cu2+ ➔ Zn2+ + Cu)",
    reactionStr: "Zn(s) + Cu2+(aq) ➔ Zn2+(aq) + Cu(s)",
    deltaHKjMol: -218.7,
    deltaSJMolK: -21.0,
    defaultTempC: 25,
    defaultK: 1.5e37,
    defaultQ: 1.0,
    defaultEcellV: 1.10,
    nElectrons: 2
  }
];

export function GibbsFreeEnergyCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("delta_g");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("methane_combustion");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Constants
  const R_GAS = 8.314462618; // J/(mol*K)
  const FARADAY = 96485.33212; // C/mol e-

  // Inputs
  const [inputDeltaHKj, setInputDeltaHKj] = useState<number>(-890.4); // kJ/mol
  const [inputDeltaSJ, setInputDeltaSJ] = useState<number>(-242.8); // J/(mol*K)
  const [inputTempC, setInputTempC] = useState<number>(25); // °C
  const [inputK, setInputK] = useState<number>(1e10);
  const [inputQ, setInputQ] = useState<number>(1.0);
  const [inputNElectrons, setInputNElectrons] = useState<number>(2);
  const [inputEcellV, setInputEcellV] = useState<number>(1.10); // V

  // Current Preset
  const preset = useMemo(() => {
    return THERMODYNAMICS_PRESETS.find(p => p.id === selectedPresetId) || THERMODYNAMICS_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setInputDeltaHKj(preset.deltaHKjMol);
    setInputDeltaSJ(preset.deltaSJMolK);
    setInputTempC(preset.defaultTempC);
    setInputK(preset.defaultK);
    setInputQ(preset.defaultQ);
    setInputNElectrons(preset.nElectrons);
    setInputEcellV(preset.defaultEcellV);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"energy_profile" | "thermodynamic_cases" | "temp_chart" | "flashcards" | "quiz">("energy_profile");

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

  // Main Gibbs Free Energy Calculations Engine
  const results = useMemo(() => {
    const H_J = inputDeltaHKj * 1000; // J/mol
    const S_J = inputDeltaSJ; // J/(mol*K)
    const T_K = Math.max(0.1, inputTempC + 273.15); // K
    const n = Math.max(1, inputNElectrons);
    const Ecell = inputEcellV;

    // Standard Gibbs Free Energy: ΔG = ΔH - T * ΔS (J/mol -> kJ/mol)
    const deltaGJ = H_J - T_K * S_J;
    const deltaGKj = deltaGJ / 1000;

    // Enthalpy contribution: ΔH (kJ/mol)
    const enthalpyContribKj = inputDeltaHKj;

    // Entropy contribution: -T * ΔS (kJ/mol)
    const entropyContribKj = -(T_K * S_J) / 1000;

    // Crossover Temperature (where ΔG = 0): T = ΔH / ΔS
    let crossoverTempK: number | null = null;
    let crossoverTempC: number | null = null;
    if (S_J !== 0) {
      const T_cross = H_J / S_J;
      if (T_cross > 0) {
        crossoverTempK = T_cross;
        crossoverTempC = T_cross - 273.15;
      }
    }

    // Equilibrium Constant K from ΔG°: K = exp(-ΔG° / (R * T))
    const calcK = Math.exp(-deltaGJ / (R_GAS * T_K));

    // Non-standard ΔG from Q: ΔG = ΔG° + R * T * ln(Q)
    const safeQ = Math.max(1e-20, inputQ);
    const nonStandardDeltaGKj = deltaGKj + (R_GAS * T_K * Math.log(safeQ)) / 1000;

    // Electrochemical ΔG = -n * F * E_cell (Joules -> kJ/mol)
    const electrochemDeltaGKj = (-n * FARADAY * Ecell) / 1000;

    // Spontaneity Status
    let spontaneityStatus = "At Equilibrium (ΔG = 0)";
    let spontaneityColor = "text-[#518231]";

    if (deltaGKj < -0.01) {
      spontaneityStatus = "Thermodynamically Spontaneous (ΔG < 0)";
      spontaneityColor = "text-[#518231]";
    } else if (deltaGKj > 0.01) {
      spontaneityStatus = "Non-Spontaneous (ΔG > 0)";
      spontaneityColor = "text-red-500";
    }

    // 4 Thermodynamic Cases Classification
    let caseLabel = "Custom Case";
    let caseDesc = "";

    if (inputDeltaHKj < 0 && S_J > 0) {
      caseLabel = "Case 1: Exothermic & Entropy Increasing (ΔH < 0, ΔS > 0)";
      caseDesc = "Spontaneous at ALL temperatures (ΔG is always negative).";
    } else if (inputDeltaHKj > 0 && S_J < 0) {
      caseLabel = "Case 2: Endothermic & Entropy Decreasing (ΔH > 0, ΔS < 0)";
      caseDesc = "Non-spontaneous at ALL temperatures (ΔG is always positive).";
    } else if (inputDeltaHKj < 0 && S_J < 0) {
      caseLabel = "Case 3: Exothermic & Entropy Decreasing (ΔH < 0, ΔS < 0)";
      caseDesc = "Spontaneous ONLY at LOW temperatures (below crossover T).";
    } else if (inputDeltaHKj > 0 && S_J > 0) {
      caseLabel = "Case 4: Endothermic & Entropy Increasing (ΔH > 0, ΔS > 0)";
      caseDesc = "Spontaneous ONLY at HIGH temperatures (above crossover T).";
    }

    return {
      T_K,
      deltaGKj,
      enthalpyContribKj,
      entropyContribKj,
      crossoverTempK,
      crossoverTempC,
      calcK,
      nonStandardDeltaGKj,
      electrochemDeltaGKj,
      spontaneityStatus,
      spontaneityColor,
      caseLabel,
      caseDesc
    };
  }, [inputDeltaHKj, inputDeltaSJ, inputTempC, inputNElectrons, inputEcellV, inputQ]);

  // Recharts Temperature Sensitivity Data (ΔG vs Temperature 0 to 1000 K)
  const tempSensitivityData = useMemo(() => {
    const data = [];
    const H_J = inputDeltaHKj * 1000;
    const S_J = inputDeltaSJ;

    for (let tK = 50; tK <= 1000; tK += 50) {
      const deltaG = (H_J - tK * S_J) / 1000;
      data.push({
        tempK: tK,
        DeltaGKj: Number(deltaG.toFixed(2))
      });
    }
    return data;
  }, [inputDeltaHKj, inputDeltaSJ]);

  // Flashcards Data
  const flashcards = [
    { title: "Gibbs Free Energy Equation", desc: "ΔG = ΔH - T * ΔS. Combines enthalpy (heat ΔH) and entropy (disorder ΔS) at absolute temperature T in Kelvin." },
    { title: "Spontaneity Rule (ΔG < 0)", desc: "If ΔG is NEGATIVE, the reaction is thermodynamically spontaneous in the forward direction. If ΔG is POSITIVE, it is non-spontaneous." },
    { title: "Gibbs Energy & Equilibrium (K)", desc: "ΔG° = -R * T * ln(K). If K > 1, ΔG° is negative (products favored at equilibrium). If K < 1, ΔG° is positive." },
    { title: "Gibbs Energy & Cell Potential (E)", desc: "ΔG = -n * F * E_cell. A positive cell voltage (+E_cell) produces a negative free energy change (-ΔG) in a spontaneous cell." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Gibbs Free Energy Analysis (${preset.name})
------------------------------------
Reaction: ${preset.reactionStr}
Enthalpy Change (ΔH): ${inputDeltaHKj} kJ/mol
Entropy Change (ΔS): ${inputDeltaSJ} J/(mol·K)
Temperature (T): ${inputTempC} °C (${results.T_K.toFixed(2)} K)
Standard Gibbs Free Energy (ΔG°): ${results.deltaGKj.toFixed(2)} kJ/mol
Status: ${results.spontaneityStatus}
Equilibrium Constant (K): ${results.calcK.toExponential(4)}
Crossover Temperature: ${results.crossoverTempC ? `${results.crossoverTempC.toFixed(1)} °C (${results.crossoverTempK?.toFixed(1)} K)` : "N/A"}
Electrochemical Potential: ${inputEcellV} V (ΔG = ${results.electrochemDeltaGKj.toFixed(2)} kJ/mol)`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Gibbs Free Energy analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the sign of ΔG for a thermodynamically spontaneous reaction?", correctAnswer: "NEGATIVE" },
      { q: "If ΔH is negative and ΔS is positive, at what temperatures is the reaction spontaneous?", correctAnswer: "ALL" },
      { q: "What unit of temperature MUST be used in thermodynamic equations?", correctAnswer: "KELVIN" }
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
            Gibbs Free Energy Calculator
          </span>
          <Link href="/calculators/cell-potential-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Cell Potential Calculator
          </Link>
          <Link href="/calculators/electrolysis-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electrolysis Calculator
          </Link>
          <Link href="/calculators/nernst-equation-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Nernst Equation Calculator
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
                Thermodynamics Cockpit
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
                <option value="delta_g">1. Calculate ΔG (ΔG = ΔH - T * ΔS)</option>
                <option value="k_from_delta_g">2. Equilibrium Constant K from ΔG° (ΔG° = -RT ln K)</option>
                <option value="non_standard_q">3. Non-Standard ΔG from Reaction Quotient Q</option>
                <option value="electrochemistry">4. Electrochemical ΔG from Ecell (ΔG = -nFEcell)</option>
              </select>
            </div>

            {/* Thermodynamics Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Reaction Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {THERMODYNAMICS_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Enthalpy Change (ΔH)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={inputDeltaHKj}
                      onChange={(e) => setInputDeltaHKj(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">kJ/mol</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Entropy Change (ΔS)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={inputDeltaSJ}
                      onChange={(e) => setInputDeltaSJ(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">J/(mol·K)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Temperature (T)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="1"
                      value={inputTempC}
                      onChange={(e) => setInputTempC(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">°C</span>
                  </div>
                </div>
              </div>

              {calcMode === "non_standard_q" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Reaction Quotient (Q)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={inputQ}
                      onChange={(e) => setInputQ(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                  </div>
                </div>
              )}

              {calcMode === "electrochemistry" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Cell Voltage (Ecell)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.01"
                        value={inputEcellV}
                        onChange={(e) => setInputEcellV(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                      />
                      <span className="text-xs font-bold text-slate-400">V</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Gibbs Free Energy (ΔG°)" 
                val={`${results.deltaGKj.toFixed(2)} kJ/mol`} 
                icon={Flame} 
              />
              <ReadOnlyField 
                label="Equilibrium Constant (K)" 
                val={results.calcK > 1e6 || results.calcK < 1e-6 ? results.calcK.toExponential(4) : results.calcK.toFixed(4)} 
                icon={Scale} 
              />

            </div>
          </div>

          {/* Integration Links to Cell Potential Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need Nernst or cell potential solver?</span>
              <span className="text-[11px] text-slate-500">Try our companion Cell Potential Calculator</span>
            </div>
            <Link
              href="/calculators/cell-potential-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Cell Potential
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
                🧪 Thermodynamics Analysis Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                results.deltaGKj < 0 
                  ? "bg-green-950 text-green-300 border-green-800" 
                  : "bg-red-950 text-red-300 border-red-800"
              }`}>
                {results.deltaGKj < 0 ? "Spontaneous" : "Non-Spontaneous"}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">ΔG° (kJ/mol)</span>
                <span className={`text-xs font-black ${results.spontaneityColor}`}>{results.deltaGKj.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Enthalpy ΔH</span>
                <span className="text-xs font-black text-amber-400">{inputDeltaHKj.toFixed(1)} kJ</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Entropy -TΔS</span>
                <span className="text-xs font-black text-white">{results.entropyContribKj.toFixed(2)} kJ</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Crossover T</span>
                <span className="text-xs font-black text-white">{results.crossoverTempC !== null ? `${results.crossoverTempC.toFixed(0)}°C` : "N/A"}</span>
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
                {(["energy_profile", "thermodynamic_cases", "temp_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "energy_profile" ? "⚡ Energy Profile" : tab === "thermodynamic_cases" ? "⚖️ 4 Cases Matrix" : tab === "temp_chart" ? "📊 Temp Plot" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Energy Profile Diagram */}
                {visualTab === "energy_profile" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Reaction Energy Profile ({preset.name})
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400">Reaction: {preset.reactionStr}</span>
                        <span className="text-[10px] text-slate-400">T = {results.T_K.toFixed(1)} K</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Enthalpy ΔH</span>
                          <span className="font-bold text-amber-400">{inputDeltaHKj.toFixed(1)} kJ/mol</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Entropy -TΔS</span>
                          <span className="font-bold text-cyan-400">{results.entropyContribKj.toFixed(2)} kJ/mol</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Net ΔG°</span>
                          <span className={`font-bold ${results.spontaneityColor}`}>{results.deltaGKj.toFixed(2)} kJ/mol</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        Status: <span className="font-bold text-white">{results.spontaneityStatus}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: 4 Thermodynamic Cases Matrix */}
                {visualTab === "thermodynamic_cases" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Four Thermodynamic Sign Cases Matrix</h4>
                    
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white space-y-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="font-bold text-[#518231] block mb-1">{results.caseLabel}</span>
                        <p className="text-slate-300">{results.caseDesc}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                        <div>Exothermic (ΔH &lt; 0): Releases heat</div>
                        <div>Endothermic (ΔH &gt; 0): Absorbs heat</div>
                        <div>Entropy Increase (ΔS &gt; 0): More disorder</div>
                        <div>Entropy Decrease (ΔS &lt; 0): Less disorder</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Recharts Temperature Plotter */}
                {visualTab === "temp_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Gibbs Free Energy ΔG (kJ/mol) vs Temperature T (K)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={tempSensitivityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="tempK" label={{ value: "Temperature (K)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "ΔG (kJ/mol)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="DeltaGKj" stroke="#10b981" strokeWidth={2} dot={true} name="ΔG (kJ/mol)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 4: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Thermodynamics Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Thermodynamics Quiz</h4>
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
