"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, BarChart3
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "standard_potential" 
  | "non_standard_potential" 
  | "reaction_quotient" 
  | "electrode_potentials" 
  | "gibbs_equilibrium";

interface RedoxPairPreset {
  id: string;
  name: string;
  anodeName: string;
  anodeHalfStr: string;
  anodeE0: number; // V
  anodeConc: number; // M
  cathodeName: string;
  cathodeHalfStr: string;
  cathodeE0: number; // V
  cathodeConc: number; // M
  nElectrons: number;
}

const REDOX_PAIR_PRESETS: RedoxPairPreset[] = [
  {
    id: "daniell",
    name: "Daniell Cell (Zn / Cu2+)",
    anodeName: "Zinc Anode (Zn)",
    anodeHalfStr: "Zn(s) ⇌ Zn2+(aq) + 2e-",
    anodeE0: -0.763,
    anodeConc: 0.10,
    cathodeName: "Copper Cathode (Cu)",
    cathodeHalfStr: "Cu2+(aq) + 2e- ⇌ Cu(s)",
    cathodeE0: +0.337,
    cathodeConc: 1.00,
    nElectrons: 2
  },
  {
    id: "cu_ag",
    name: "Copper-Silver Cell (Cu / Ag+)",
    anodeName: "Copper Anode (Cu)",
    anodeHalfStr: "Cu(s) ⇌ Cu2+(aq) + 2e-",
    anodeE0: +0.337,
    anodeConc: 0.10,
    cathodeName: "Silver Cathode (Ag)",
    cathodeHalfStr: "Ag+(aq) + e- ⇌ Ag(s)",
    cathodeE0: +0.7996,
    cathodeConc: 1.00,
    nElectrons: 2
  },
  {
    id: "fe_cu",
    name: "Iron-Copper Cell (Fe / Cu2+)",
    anodeName: "Iron Anode (Fe)",
    anodeHalfStr: "Fe(s) ⇌ Fe2+(aq) + 2e-",
    anodeE0: -0.440,
    anodeConc: 0.05,
    cathodeName: "Copper Cathode (Cu)",
    cathodeHalfStr: "Cu2+(aq) + 2e- ⇌ Cu(s)",
    cathodeE0: +0.337,
    cathodeConc: 1.00,
    nElectrons: 2
  },
  {
    id: "h2_cu",
    name: "Hydrogen-Copper Cell (H2 / Cu2+)",
    anodeName: "Standard Hydrogen Anode (SHE)",
    anodeHalfStr: "H2(g) ⇌ 2H+(aq) + 2e-",
    anodeE0: 0.000,
    anodeConc: 1.00,
    cathodeName: "Copper Cathode (Cu)",
    cathodeHalfStr: "Cu2+(aq) + 2e- ⇌ Cu(s)",
    cathodeE0: +0.337,
    cathodeConc: 1.00,
    nElectrons: 2
  }
];

export function CellPotentialCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("standard_potential");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("daniell");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Constants
  const R_GAS = 8.31446; // J/(mol K)
  const FARADAY = 96485.33; // C/mol

  // Inputs
  const [inputTempC, setInputTempC] = useState<number>(25);
  const [inputCathodeE0, setInputCathodeE0] = useState<number>(0.337);
  const [inputAnodeE0, setInputAnodeE0] = useState<number>(-0.763);
  const [inputCathodeConc, setInputCathodeConc] = useState<number>(1.00);
  const [inputAnodeConc, setInputAnodeConc] = useState<number>(0.10);
  const [inputNElectrons, setInputNElectrons] = useState<number>(2);

  // Current Preset
  const preset = useMemo(() => {
    return REDOX_PAIR_PRESETS.find(p => p.id === selectedPresetId) || REDOX_PAIR_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setInputCathodeE0(preset.cathodeE0);
    setInputAnodeE0(preset.anodeE0);
    setInputCathodeConc(preset.cathodeConc);
    setInputAnodeConc(preset.anodeConc);
    setInputNElectrons(preset.nElectrons);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"potential_scale" | "temp_chart" | "flashcards" | "quiz">("potential_scale");

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

  // Main Cell Potential Calculations Engine
  const results = useMemo(() => {
    const tempK = Math.max(1, inputTempC + 273.15);
    const n = Math.max(1, inputNElectrons);
    const cCathode = Math.max(1e-6, inputCathodeConc);
    const cAnode = Math.max(1e-6, inputAnodeConc);

    // Standard Cell Potential: E0_cell = E0_cathode - E0_anode
    const e0Cell = inputCathodeE0 - inputAnodeE0;

    // Reaction Quotient Q = [Anode] / [Cathode]
    const qVal = cAnode / cCathode;

    // Nernst Pre-factor: (R * T) / (n * F)
    const nernstFactor = (R_GAS * tempK) / (n * FARADAY);

    // Non-Standard Cell Potential: E_cell = E0_cell - (RT/nF) * ln(Q)
    const eCell = e0Cell - (nernstFactor * Math.log(qVal));

    // Gibbs Free Energy: ΔG = -n * F * E_cell (kJ/mol)
    const gibbsEnergyKJ = (-n * FARADAY * eCell) / 1000;
    const gibbsStandardKJ = (-n * FARADAY * e0Cell) / 1000;

    // Equilibrium Constant K: K = exp(n * F * E0_cell / (R * T))
    const lnK = (n * FARADAY * e0Cell) / (R_GAS * tempK);
    const log10K = lnK / Math.LN10;

    // Spontaneity Classification
    let spontaneityText = "Spontaneous Reaction (Galvanic / Voltaic Mode)";
    let spontaneityBadge = "bg-green-950 text-green-300 border-green-800";

    if (eCell < -0.001) {
      spontaneityText = "Non-Spontaneous Reaction (Requires External Potential)";
      spontaneityBadge = "bg-red-950 text-red-300 border-red-800";
    } else if (Math.abs(eCell) <= 0.001) {
      spontaneityText = "At Equilibrium (E_cell = 0 V)";
      spontaneityBadge = "bg-blue-950 text-blue-300 border-blue-800";
    }

    // IUPAC Cell Notation
    const cellNotation = `${preset.anodeName.split(' ')[0]}(s) | [${cAnode.toFixed(2)}M] || [${cCathode.toFixed(2)}M] | ${preset.cathodeName.split(' ')[0]}(s)`;

    return {
      tempK,
      e0Cell,
      eCell,
      qVal,
      gibbsEnergyKJ,
      gibbsStandardKJ,
      log10K,
      spontaneityText,
      spontaneityBadge,
      cellNotation
    };
  }, [inputTempC, inputNElectrons, inputCathodeE0, inputAnodeE0, inputCathodeConc, inputAnodeConc, preset]);

  // Recharts Temperature Sensitivity Data (E_cell vs T)
  const tempSensitivityData = useMemo(() => {
    const data = [];
    const n = Math.max(1, inputNElectrons);
    const e0Cell = results.e0Cell;
    const qVal = results.qVal;

    for (let tC = 0; tC <= 100; tC += 10) {
      const tK = tC + 273.15;
      const factor = (R_GAS * tK) / (n * FARADAY);
      const eVal = e0Cell - (factor * Math.log(qVal));

      data.push({
        tempC: tC,
        CellPotentialV: Number(eVal.toFixed(4))
      });
    }
    return data;
  }, [inputNElectrons, results.e0Cell, results.qVal]);

  // Flashcards Data
  const flashcards = [
    { title: "Standard Cell Potential Formula", desc: "E°cell = E°cathode - E°anode. Both electrode potentials must be standard reduction potentials." },
    { title: "Why Subtraction?", desc: "Subtracting E°anode reverses its reduction half-reaction into an oxidation half-reaction." },
    { title: "Nernst Equation", desc: "E_cell = E°_cell - (RT/nF) * ln(Q). Account for temperature T and non-standard concentration ratio Q." },
    { title: "Gibbs Free Energy & E_cell", desc: "ΔG = -nFE. A positive cell potential (E > 0 V) means ΔG < 0, indicating a spontaneous redox reaction." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Cell Potential Analysis (${preset.name})
------------------------------------
Cell Notation: ${results.cellNotation}
Cathode E°: ${inputCathodeE0.toFixed(4)} V
Anode E°: ${inputAnodeE0.toFixed(4)} V
Standard Cell Potential (E°cell): ${results.e0Cell.toFixed(4)} V
Non-Standard Cell Potential (Ecell): ${results.eCell.toFixed(4)} V
Reaction Quotient (Q): ${results.qVal.toFixed(4)}
Gibbs Free Energy (ΔG): ${results.gibbsEnergyKJ.toFixed(2)} kJ/mol
Equilibrium Constant (log10 K): ${results.log10K.toFixed(2)}
Spontaneity: ${results.spontaneityText}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Cell potential analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the formula for standard cell potential E°cell?", correctAnswer: "E°CATHODE - E°ANODE" },
      { q: "If E°cell > 0 V, is the standard redox reaction spontaneous?", correctAnswer: "YES" },
      { q: "True or False: Standard electrode potentials are multiplied by reaction coefficients.", correctAnswer: "FALSE" }
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
          Electrochemistry Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Cell Potential Calculator
          </span>
          <Link href="/calculators/electrochemical-cell-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electrochemical Cell Calculator
          </Link>
          <Link href="/calculators/nernst-equation-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Nernst Equation Calculator
          </Link>
          <Link href="/calculators/equilibrium-constant-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Equilibrium Constant Calculator
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
                <Zap className="text-[#518231]" />
                Cell Potential Cockpit
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

            {/* Calculation Mode Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Calculation Mode</label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as CalculationMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="standard_potential">1. Standard Cell Potential (E°cell = E°cathode - E°anode)</option>
                <option value="non_standard_potential">2. Non-Standard Cell Potential (Nernst Ecell)</option>
                <option value="reaction_quotient">3. Reaction Quotient Q Analyzer</option>
                <option value="electrode_potentials">4. Cathode vs Anode Reduction Potentials</option>
                <option value="gibbs_equilibrium">5. Gibbs Free Energy (ΔG) & Equilibrium Constant (K)</option>
              </select>
            </div>

            {/* Redox Pair Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Redox System Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {REDOX_PAIR_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Cathode Standard Reduction Potential (E°_cathode)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputCathodeE0}
                      onChange={(e) => setInputCathodeE0(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">V</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Anode Standard Reduction Potential (E°_anode)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputAnodeE0}
                      onChange={(e) => setInputAnodeE0(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">V</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Cathode Concentration</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputCathodeConc}
                      onChange={(e) => setInputCathodeConc(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">M</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Anode Concentration</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={inputAnodeConc}
                      onChange={(e) => setInputAnodeConc(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">M</span>
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

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Standard Cell Potential (E°_cell)" 
                val={`${results.e0Cell.toFixed(4)} V`} 
                icon={Zap} 
              />
              <ReadOnlyField 
                label="Non-Standard Cell Potential (E_cell)" 
                val={`${results.eCell.toFixed(4)} V`} 
                icon={Activity} 
              />

            </div>
          </div>

          {/* Integration Links to Electrochemical Cell Analyzer */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Complete Cell Builder & Salt Bridge Analysis?</span>
              <span className="text-[11px] text-slate-500">Try our companion Electrochemical Cell Calculator</span>
            </div>
            <Link
              href="/calculators/electrochemical-cell-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Cell Builder
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
                🧪 Cell Potential Analysis Cockpit
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${results.spontaneityBadge}`}>
                {results.spontaneityText}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">E_cell</span>
                <span className="text-xs font-black text-[#518231]">{results.eCell.toFixed(4)} V</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">E°_cell</span>
                <span className="text-xs font-black text-amber-400">{results.e0Cell.toFixed(4)} V</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">ΔG (kJ/mol)</span>
                <span className="text-xs font-black text-white">{results.gibbsEnergyKJ.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">log10 K</span>
                <span className="text-xs font-black text-white">{results.log10K.toFixed(2)}</span>
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
                {(["potential_scale", "temp_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "potential_scale" ? "📊 Potential Scale" : tab === "temp_chart" ? "📈 Temperature Plot" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Vertical Potential Scale */}
                {visualTab === "potential_scale" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <BarChart3 size={16} className="text-[#518231]" />
                      Vertical Electrochemical Reduction Potential Scale
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-amber-400 font-bold">Stronger Reduction Tendency (Higher E°) ⬆</span>
                        <span className="text-slate-400 text-[10px]">Reference: SHE (0.00 V)</span>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-slate-900 rounded-xl border border-green-800 flex justify-between items-center">
                          <div>
                            <span className="font-bold text-[#518231] block">CATHODE (+): {preset.cathodeName}</span>
                            <span className="text-[10px] text-slate-400">{preset.cathodeHalfStr}</span>
                          </div>
                          <span className="font-black text-sm text-[#518231]">{inputCathodeE0.toFixed(4)} V</span>
                        </div>

                        <div className="text-center text-[10px] font-bold text-amber-400 py-1">
                          ↕ Potential Difference (E°cell) = {results.e0Cell.toFixed(4)} V
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-amber-800 flex justify-between items-center">
                          <div>
                            <span className="font-bold text-amber-400 block">ANODE (-): {preset.anodeName}</span>
                            <span className="text-[10px] text-slate-400">{preset.anodeHalfStr}</span>
                          </div>
                          <span className="font-black text-sm text-amber-400">{inputAnodeE0.toFixed(4)} V</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        IUPAC Cell Notation: <span className="font-bold text-white font-mono">{results.cellNotation}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Recharts Temperature Plotter */}
                {visualTab === "temp_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cell Potential E_cell (V) vs Temperature T (°C)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={tempSensitivityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="tempC" label={{ value: "Temperature (°C)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "E_cell (V)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="CellPotentialV" stroke="#eab308" strokeWidth={2} dot={true} name="Cell Potential E_cell (V)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cell Potential Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cell Potential Quiz</h4>
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
