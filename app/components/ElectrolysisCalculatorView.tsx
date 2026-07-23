"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "analysis" 
  | "mass_produced" 
  | "gas_volume" 
  | "charge_time_current" 
  | "energy_consumption" 
  | "water_electrolysis";

interface ElectrolysisPreset {
  id: string;
  name: string;
  type: "aqueous" | "molten" | "water";
  electrolyteStr: string;
  cathodeReaction: string;
  cathodeProduct: string;
  anodeReaction: string;
  anodeProduct: string;
  molarMassProduct: number; // g/mol
  nElectrons: number;
  isGas: boolean;
  defaultCurrentA: number;
  defaultTimeSec: number;
  defaultVoltageV: number;
}

const ELECTROLYSIS_PRESETS: ElectrolysisPreset[] = [
  {
    id: "water_splitting",
    name: "Water Electrolysis (2H2O ➔ 2H2 + O2)",
    type: "water",
    electrolyteStr: "Dilute H2SO4 / NaOH in Water (H2O)",
    cathodeReaction: "2H2O(l) + 2e- ➔ H2(g) + 2OH-(aq)",
    cathodeProduct: "Hydrogen Gas (H2)",
    anodeReaction: "2H2O(l) ➔ O2(g) + 4H+(aq) + 4e-",
    anodeProduct: "Oxygen Gas (O2)",
    molarMassProduct: 2.016, // H2 g/mol
    nElectrons: 2,
    isGas: true,
    defaultCurrentA: 5.0,
    defaultTimeSec: 3600,
    defaultVoltageV: 2.5
  },
  {
    id: "molten_nacl",
    name: "Molten NaCl (2NaCl ➔ 2Na + Cl2)",
    type: "molten",
    electrolyteStr: "Molten Sodium Chloride (NaCl at 801°C)",
    cathodeReaction: "Na+(l) + e- ➔ Na(l)",
    cathodeProduct: "Sodium Metal (Na)",
    anodeReaction: "2Cl-(l) ➔ Cl2(g) + 2e-",
    anodeProduct: "Chlorine Gas (Cl2)",
    molarMassProduct: 22.99, // Na g/mol
    nElectrons: 1,
    isGas: false,
    defaultCurrentA: 10.0,
    defaultTimeSec: 3600,
    defaultVoltageV: 4.0
  },
  {
    id: "aqueous_nacl",
    name: "Aqueous Brine (2NaCl + 2H2O ➔ H2 + Cl2 + 2NaOH)",
    type: "aqueous",
    electrolyteStr: "Concentrated Sodium Chloride Solution (Brine)",
    cathodeReaction: "2H2O(l) + 2e- ➔ H2(g) + 2OH-(aq)",
    cathodeProduct: "Hydrogen Gas (H2)",
    anodeReaction: "2Cl-(aq) ➔ Cl2(g) + 2e-",
    anodeProduct: "Chlorine Gas (Cl2)",
    molarMassProduct: 70.90, // Cl2 g/mol
    nElectrons: 2,
    isGas: true,
    defaultCurrentA: 5.0,
    defaultTimeSec: 3600,
    defaultVoltageV: 3.5
  },
  {
    id: "copper_refining",
    name: "Copper Electrorefining (CuSO4)",
    type: "aqueous",
    electrolyteStr: "Aqueous Copper(II) Sulfate (CuSO4 + H2SO4)",
    cathodeReaction: "Cu2+(aq) + 2e- ➔ Cu(s)",
    cathodeProduct: "Pure Copper Metal (Cu)",
    anodeReaction: "Cu(s, impure) ➔ Cu2+(aq) + 2e-",
    anodeProduct: "Copper Ion Dissolution (Cu2+)",
    molarMassProduct: 63.55, // Cu g/mol
    nElectrons: 2,
    isGas: false,
    defaultCurrentA: 5.0,
    defaultTimeSec: 3600,
    defaultVoltageV: 0.5
  }
];

export function ElectrolysisCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("analysis");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("water_splitting");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Constants
  const FARADAY = 96485.33212; // C/mol e-
  const R_GAS = 0.082057; // L atm / (mol K)

  // Inputs
  const [inputCurrentA, setInputCurrentA] = useState<number>(5.0); // A
  const [inputTimeSec, setInputTimeSec] = useState<number>(3600); // s
  const [inputVoltageV, setInputVoltageV] = useState<number>(2.5); // V
  const [inputTempC, setInputTempC] = useState<number>(25); // °C
  const [inputPressureAtm, setInputPressureAtm] = useState<number>(1.0); // atm
  const [inputEfficiencyPercent, setInputEfficiencyPercent] = useState<number>(100); // %

  // Current Preset
  const preset = useMemo(() => {
    return ELECTROLYSIS_PRESETS.find(p => p.id === selectedPresetId) || ELECTROLYSIS_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setInputCurrentA(preset.defaultCurrentA);
    setInputTimeSec(preset.defaultTimeSec);
    setInputVoltageV(preset.defaultVoltageV);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"cell_diagram" | "preferential_discharge" | "temp_chart" | "flashcards" | "quiz">("cell_diagram");

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

  // Main Electrolysis Calculations Engine
  const results = useMemo(() => {
    const current = Math.max(0.001, inputCurrentA);
    const timeS = Math.max(1, inputTimeSec);
    const voltage = Math.max(0.1, inputVoltageV);
    const tempK = Math.max(1, inputTempC + 273.15);
    const press = Math.max(0.01, inputPressureAtm);
    const eff = Math.min(100, Math.max(1, inputEfficiencyPercent)) / 100;
    const M = preset.molarMassProduct;
    const n = preset.nElectrons;

    // Electric Charge Q = I * t (Coulombs)
    const chargeC = current * timeS;

    // Moles of electrons: n_e = Q / F
    const molesElectrons = chargeC / FARADAY;

    // Moles of primary product: n_prod = n_e / n
    const molesProduct = (molesElectrons / n) * eff;

    // Mass of primary product in grams
    const massG = molesProduct * M;

    // Ideal Gas Law Volume V = n * R * T / P (Liters)
    const gasVolumeL = (molesProduct * R_GAS * tempK) / press;

    // Water Electrolysis H2 vs O2 volume ratio (2:1)
    const h2VolumeL = (molesElectrons / 2) * eff * R_GAS * tempK / press;
    const o2VolumeL = (molesElectrons / 4) * eff * R_GAS * tempK / press;

    // Energy Consumption: E = V * I * t (Joules -> kWh)
    const energyJoules = voltage * current * timeS;
    const energyKWh = energyJoules / (3600 * 1000);

    return {
      chargeC,
      molesElectrons,
      molesProduct,
      massG,
      gasVolumeL,
      h2VolumeL,
      o2VolumeL,
      energyJoules,
      energyKWh
    };
  }, [inputCurrentA, inputTimeSec, inputVoltageV, inputTempC, inputPressureAtm, inputEfficiencyPercent, preset]);

  // Recharts Time Sensitivity Data (Gas Volume / Mass vs Time 0 to 2 hours)
  const timeSensitivityData = useMemo(() => {
    const data = [];
    const current = inputCurrentA;
    const tempK = inputTempC + 273.15;
    const press = inputPressureAtm;
    const eff = inputEfficiencyPercent / 100;

    for (let tMin = 0; tMin <= 120; tMin += 15) {
      const tSec = tMin * 60;
      const charge = current * tSec;
      const molesE = charge / FARADAY;
      const molesH2 = (molesE / 2) * eff;
      const volH2 = (molesH2 * R_GAS * tempK) / press;

      data.push({
        timeMin: tMin,
        GasVolumeL: Number(volH2.toFixed(3))
      });
    }
    return data;
  }, [inputCurrentA, inputTempC, inputPressureAtm, inputEfficiencyPercent]);

  // Flashcards Data
  const flashcards = [
    { title: "Electrolytic Cell Sign Convention", desc: "In Electrolysis, ANODE IS POSITIVE (+), CATHODE IS NEGATIVE (-). Electrons are pumped by an external power supply." },
    { title: "Where Oxidation / Reduction Occurs", desc: "OXIDATION ALWAYS OCCURS AT THE ANODE (anions lose electrons). REDUCTION ALWAYS OCCURS AT THE CATHODE (cations gain electrons)." },
    { title: "Water Electrolysis Volume Ratio", desc: "2H2O(l) ➔ 2H2(g) + O2(g). Hydrogen gas produced at cathode is exactly DOUBLE the volume of oxygen gas produced at anode (2:1 ratio)." },
    { title: "Preferential Ion Discharge", desc: "In aqueous electrolysis, species with HIGHER reduction potential (like Cu2+, Ag+, H+) reduce preferentially at cathode over alkali metals (Na+, K+)." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Electrolysis Analysis (${preset.name})
------------------------------------
Electrolyte: ${preset.electrolyteStr}
Cathode Product: ${preset.cathodeProduct} [Reaction: ${preset.cathodeReaction}]
Anode Product: ${preset.anodeProduct} [Reaction: ${preset.anodeReaction}]
Current (I): ${inputCurrentA} A
Time (t): ${inputTimeSec} s (${(inputTimeSec / 60).toFixed(1)} min)
Applied Voltage: ${inputVoltageV} V
Electric Charge (Q): ${results.chargeC.toFixed(2)} Coulombs
Primary Product Mass: ${results.massG.toFixed(4)} g
Gas Volume (STP/Actual): ${results.gasVolumeL.toFixed(3)} L
Energy Consumed: ${results.energyKWh.toFixed(4)} kWh (${results.energyJoules.toFixed(0)} J)`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Electrolysis analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What gas is produced at the Cathode (-) during Water Electrolysis?", correctAnswer: "HYDROGEN" },
      { q: "In an Electrolytic Cell, what is the sign (+) or (-) of the Anode?", correctAnswer: "POSITIVE" },
      { q: "What is the stoichiometric volume ratio of H2 to O2 gas in water splitting?", correctAnswer: "2:1" }
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
            Electrolysis Calculator
          </span>
          <Link href="/calculators/faradays-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Faraday's Law Calculator
          </Link>
          <Link href="/calculators/cell-potential-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Cell Potential Calculator
          </Link>
          <Link href="/calculators/electrochemical-cell-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electrochemical Cell Calculator
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
                Electrolysis System Cockpit
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
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Electrolysis Mode</label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as CalculationMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="analysis">1. Full Electrolysis Analysis & Product Prediction</option>
                <option value="mass_produced">2. Mass Produced (m = MIt/nF)</option>
                <option value="gas_volume">3. Gas Volume Produced (V = nRT/P)</option>
                <option value="water_electrolysis">4. Water Electrolysis (2H2O ➔ 2H2 + O2)</option>
                <option value="energy_consumption">5. Electrical Energy Consumed (E = VIt)</option>
              </select>
            </div>

            {/* Electrolysis System Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Electrolyte System Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {ELECTROLYSIS_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Current (I)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={inputCurrentA}
                      onChange={(e) => setInputCurrentA(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">A</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Electrolysis Time (t)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="60"
                      value={inputTimeSec}
                      onChange={(e) => setInputTimeSec(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">s</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Applied Cell Voltage</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.1"
                      value={inputVoltageV}
                      onChange={(e) => setInputVoltageV(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-black text-xs"
                    />
                    <span className="text-xs font-bold text-slate-400">V</span>
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
                label="Product Mass (m)" 
                val={`${results.massG.toFixed(4)} g`} 
                icon={Scale} 
              />
              <ReadOnlyField 
                label="Gas Volume (V)" 
                val={`${results.gasVolumeL.toFixed(3)} Liters`} 
                icon={Droplet} 
              />

            </div>
          </div>

          {/* Integration Links to Faraday's Law Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Quantitative electroplating & thickness?</span>
              <span className="text-[11px] text-slate-500">Try our companion Faraday's Law Calculator</span>
            </div>
            <Link
              href="/calculators/faradays-law-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Faraday Tool
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
                🧪 Electrolytic Cell Cockpit
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg border bg-green-950 text-green-300 border-green-800">
                {preset.name}
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Cathode Product</span>
                <span className="text-xs font-black text-[#518231]">{preset.cathodeProduct.split(' ')[0]}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Anode Product</span>
                <span className="text-xs font-black text-amber-400">{preset.anodeProduct.split(' ')[0]}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Gas Vol (L)</span>
                <span className="text-xs font-black text-white">{results.gasVolumeL.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Energy (kWh)</span>
                <span className="text-xs font-black text-white">{results.energyKWh.toFixed(4)}</span>
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
                {(["cell_diagram", "preferential_discharge", "temp_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "cell_diagram" ? "🧪 Cell Diagram" : tab === "preferential_discharge" ? "⚖️ Discharge Order" : tab === "temp_chart" ? "📊 Time Plot" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Interactive Cell Diagram */}
                {visualTab === "cell_diagram" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Electrolytic Cell Reactions & Electron Flow ({preset.name})
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400 flex items-center gap-1">
                          <Zap size={14} className="text-[#518231]" />
                          External Power Source: DC Voltage = {inputVoltageV} V
                        </span>
                        <span className="text-[10px] text-slate-400">Total Charge Q = {results.chargeC.toFixed(0)} C</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900 p-3.5 rounded-xl border border-red-900/60 space-y-1">
                          <span className="text-xs font-bold text-red-400 block">ANODE (+) [Oxidation]</span>
                          <span className="text-[11px] text-slate-200 font-bold block">{preset.anodeProduct}</span>
                          <p className="text-[10px] text-slate-400 font-mono">{preset.anodeReaction}</p>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-green-900/60 space-y-1">
                          <span className="text-xs font-bold text-green-400 block">CATHODE (-) [Reduction]</span>
                          <span className="text-[11px] text-slate-200 font-bold block">{preset.cathodeProduct}</span>
                          <p className="text-[10px] text-slate-400 font-mono">{preset.cathodeReaction}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        Electrolyte System: <span className="font-bold text-white">{preset.electrolyteStr}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Preferential Ion Discharge Ranking Table */}
                {visualTab === "preferential_discharge" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Aqueous Preferential Discharge Series</h4>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                            <th className="p-2.5 text-left">Ion Species</th>
                            <th className="p-2.5 text-left">Electrode</th>
                            <th className="p-2.5 text-center">Discharge Ease</th>
                            <th className="p-2.5 text-right">Resulting Product</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">Cu2+ / Ag+</td>
                            <td className="p-2.5 text-green-600 font-bold">Cathode (-)</td>
                            <td className="p-2.5 text-center text-[#518231] font-bold">Very High (Discharges 1st)</td>
                            <td className="p-2.5 text-right">Pure Metal (Cu, Ag)</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">H+ (Water)</td>
                            <td className="p-2.5 text-green-600 font-bold">Cathode (-)</td>
                            <td className="p-2.5 text-center text-amber-500 font-bold">High (Over Alkali Metals)</td>
                            <td className="p-2.5 text-right">Hydrogen Gas (H2)</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">Na+ / K+</td>
                            <td className="p-2.5 text-green-600 font-bold">Cathode (-)</td>
                            <td className="p-2.5 text-center text-red-500 font-bold">Very Low (Remains in Solution)</td>
                            <td className="p-2.5 text-right">No Metal (H2 forms)</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-slate-900 dark:text-white">Cl- / Br-</td>
                            <td className="p-2.5 text-red-600 font-bold">Anode (+)</td>
                            <td className="p-2.5 text-center text-[#518231] font-bold">High (Over SO42-)</td>
                            <td className="p-2.5 text-right">Halogen Gas (Cl2, Br2)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab 3: Recharts Time Plotter */}
                {visualTab === "temp_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Gas Volume V (L) vs Electrolysis Time t (min)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeSensitivityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="timeMin" label={{ value: "Time (minutes)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Volume (L)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="GasVolumeL" stroke="#10b981" strokeWidth={2} dot={true} name="Produced Gas Volume (L)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 4: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Electrolysis Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Electrolysis Quiz</h4>
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
