"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type VariableMode = 
  | "solve_p" 
  | "solve_v" 
  | "solve_n" 
  | "solve_t" 
  | "solve_r" 
  | "density_molar_mass" 
  | "two_state" 
  | "compressibility_z";

interface GasPreset {
  id: string;
  name: string;
  desc: string;
  defaultPressureAtm: number;
  defaultVolumeL: number;
  defaultMoles: number;
  defaultTempC: number;
  defaultMolarMassGmol: number;
}

const GAS_PRESETS: GasPreset[] = [
  {
    id: "stp_air",
    name: "Air at Standard Temperature & Pressure (STP)",
    desc: "1 mole ideal gas at 0°C (273.15 K) and 1 atm occupying 22.414 L",
    defaultPressureAtm: 1.0,
    defaultVolumeL: 22.414,
    defaultMoles: 1.0,
    defaultTempC: 0.0,
    defaultMolarMassGmol: 28.97 // Air
  },
  {
    id: "satp_oxygen",
    name: "Oxygen (O2) Gas Cylinder at SATP",
    desc: "SATP conditions: 25°C (298.15 K) and 1 bar (0.9869 atm)",
    defaultPressureAtm: 0.9869,
    defaultVolumeL: 24.789,
    defaultMoles: 1.0,
    defaultTempC: 25.0,
    defaultMolarMassGmol: 32.00 // O2
  },
  {
    id: "helium_balloon",
    name: "Helium (He) Weather Balloon",
    desc: "5.0 L Helium balloon at 20°C and 1.0 atm",
    defaultPressureAtm: 1.0,
    defaultVolumeL: 5.0,
    defaultMoles: 0.208,
    defaultTempC: 20.0,
    defaultMolarMassGmol: 4.003 // He
  },
  {
    id: "unknown_gas_molar_mass",
    name: "Molar Mass Determination of Unknown Gas",
    desc: "Gas sample with density 1.429 g/L at STP (M = 32.0 g/mol, Oxygen)",
    defaultPressureAtm: 1.0,
    defaultVolumeL: 1.0,
    defaultMoles: 0.0446,
    defaultTempC: 0.0,
    defaultMolarMassGmol: 32.00
  },
  {
    id: "two_state_compression",
    name: "Two-State Gas Isothermal Compression",
    desc: "Boyle's Law compression: P1 = 1 atm, V1 = 10 L ➔ V2 = 2.5 L, P2 = 4 atm",
    defaultPressureAtm: 1.0,
    defaultVolumeL: 10.0,
    defaultMoles: 0.409,
    defaultTempC: 25.0,
    defaultMolarMassGmol: 28.013 // N2
  }
];

export function IdealGasLawCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [variableMode, setVariableMode] = useState<VariableMode>("solve_p");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("stp_air");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Gas Constant R selection (default 0.082057 L*atm/(mol*K))
  const [rConstantVal, setRConstantVal] = useState<number>(0.082057);

  // Primary Inputs
  const [inputPressureAtm, setInputPressureAtm] = useState<number>(1.0);
  const [inputVolumeL, setInputVolumeL] = useState<number>(22.414);
  const [inputMoles, setInputMoles] = useState<number>(1.0);
  const [inputTempC, setInputTempC] = useState<number>(0.0);
  const [inputMolarMassGmol, setInputMolarMassGmol] = useState<number>(28.97);

  // Two-State Inputs
  const [inputP2Atm, setInputP2Atm] = useState<number>(4.0);
  const [inputV2L, setInputV2L] = useState<number>(2.5);
  const [inputT2C, setInputT2C] = useState<number>(25.0);

  // Current Preset Loader
  const preset = useMemo(() => {
    return GAS_PRESETS.find(p => p.id === selectedPresetId) || GAS_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setInputPressureAtm(preset.defaultPressureAtm);
    setInputVolumeL(preset.defaultVolumeL);
    setInputMoles(preset.defaultMoles);
    setInputTempC(preset.defaultTempC);
    setInputMolarMassGmol(preset.defaultMolarMassGmol);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"isotherm_chart" | "gas_dashboard" | "flashcards" | "quiz">("isotherm_chart");

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

  // Main Ideal Gas Law Calculation Engine (PV = nRT)
  const results = useMemo(() => {
    const tempK = inputTempC + 273.15;
    const temp2K = inputT2C + 273.15;

    // 1. Solve Pressure P = (n * R * T) / V
    const calcPressureAtm = (inputVolumeL > 0) 
      ? (inputMoles * rConstantVal * tempK) / inputVolumeL 
      : 1.0;

    // 2. Solve Volume V = (n * R * T) / P
    const calcVolumeL = (inputPressureAtm > 0) 
      ? (inputMoles * rConstantVal * tempK) / inputPressureAtm 
      : 22.414;

    // 3. Solve Moles n = (P * V) / (R * T)
    const calcMoles = (rConstantVal > 0 && tempK > 0) 
      ? (inputPressureAtm * inputVolumeL) / (rConstantVal * tempK) 
      : 1.0;

    // 4. Solve Absolute Temperature T = (P * V) / (n * R)
    const calcTempK = (inputMoles > 0 && rConstantVal > 0) 
      ? (inputPressureAtm * inputVolumeL) / (inputMoles * rConstantVal) 
      : 273.15;
    const calcTempC = calcTempK - 273.15;

    // 5. Solve Gas Constant R = (P * V) / (n * T)
    const calcRVal = (inputMoles > 0 && tempK > 0) 
      ? (inputPressureAtm * inputVolumeL) / (inputMoles * tempK) 
      : 0.082057;

    // 6. Gas Density ρ = (P * M) / (R * T) in g/L
    const gasDensityGL = (rConstantVal > 0 && tempK > 0) 
      ? (inputPressureAtm * inputMolarMassGmol) / (rConstantVal * tempK) 
      : 1.429;

    // 7. Molar Volume V_m = V / n = (R * T) / P in L/mol
    const molarVolumeLmol = inputMoles > 0 ? inputVolumeL / inputMoles : 22.414;

    // 8. Compressibility Factor Z = (P * V) / (n * R * T)
    const compressibilityZ = (inputMoles > 0 && rConstantVal > 0 && tempK > 0) 
      ? (inputPressureAtm * inputVolumeL) / (inputMoles * rConstantVal * tempK) 
      : 1.0;

    // 9. Two-State Combined Gas Law Verification: P1*V1/T1 vs P2*V2/T2
    const state1Ratio = (inputPressureAtm * inputVolumeL) / tempK;
    const state2Ratio = (inputP2Atm * inputV2L) / temp2K;
    const isStateEquiv = Math.abs(state1Ratio - state2Ratio) < 0.01;

    return {
      tempK,
      calcPressureAtm,
      calcVolumeL,
      calcMoles,
      calcTempK,
      calcTempC,
      calcRVal,
      gasDensityGL,
      molarVolumeLmol,
      compressibilityZ,
      state1Ratio,
      state2Ratio,
      isStateEquiv
    };
  }, [inputPressureAtm, inputVolumeL, inputMoles, inputTempC, inputMolarMassGmol, rConstantVal, inputP2Atm, inputV2L, inputT2C]);

  // Recharts Boyle's Law Isotherm Plotter Data (P vs V at constant T)
  const isothermData = useMemo(() => {
    const data = [];
    const tempK = inputTempC + 273.15;
    for (let v = 5; v <= 50; v += 5) {
      const p = (inputMoles * rConstantVal * tempK) / v;
      data.push({
        VolumeL: v,
        PressureAtm: Number(p.toFixed(2))
      });
    }
    return data;
  }, [inputMoles, rConstantVal, inputTempC]);

  // Flashcards Data
  const flashcards = [
    { title: "Ideal Gas Law (PV = nRT)", desc: "Relates pressure (P), volume (V), moles (n), gas constant (R), and absolute temperature in Kelvin (T)." },
    { title: "Absolute Temperature in Kelvin", desc: "T(K) = T(°C) + 273.15. The ideal gas law REQUIRES absolute Kelvin temperature." },
    { title: "Molar Volume at STP (22.414 L/mol)", desc: "At 0°C and 1 atm, 1 mole of any ideal gas occupies exactly 22.414 Liters." },
    { title: "Gas Density Formula (ρ = PM / RT)", desc: "Gas density ρ (g/L) is directly proportional to pressure P and molar mass M, and inversely proportional to T." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Ideal Gas Law Analysis (${preset.name})
------------------------------------
Pressure (P): ${inputPressureAtm.toFixed(3)} atm
Volume (V): ${inputVolumeL.toFixed(3)} L
Amount of Gas (n): ${inputMoles.toFixed(3)} mol
Absolute Temperature (T): ${results.tempK.toFixed(2)} K (${inputTempC} °C)
Gas Constant (R): ${rConstantVal} L·atm/(mol·K)
Gas Density (ρ): ${results.gasDensityGL.toFixed(3)} g/L
Molar Volume (V_m): ${results.molarVolumeLmol.toFixed(3)} L/mol
Compressibility Factor (Z): ${results.compressibilityZ.toFixed(3)} (Ideal Z = 1.00)`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Ideal gas law analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "Why MUST temperature be converted to KELVIN (T = °C + 273.15) before using PV = nRT?", correctAnswer: "ABSOLUTE TEMPERATURE" },
      { q: "What is the molar volume of 1 mole of an ideal gas at STP (0°C, 1 atm)?", correctAnswer: "22.4 L" },
      { q: "In Boyle's Law (P1*V1 = P2*V2), if Volume is HALVED, what happens to Pressure?", correctAnswer: "DOUBLES" }
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
            Ideal Gas Law Calculator
          </span>
          <Link href="/calculators/specific-heat-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Specific Heat Calculator
          </Link>
          <Link href="/calculators/calorimetry-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Calorimetry Calculator
          </Link>
          <Link href="/calculators/hess-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Hess's Law Calculator
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
                <Gauge className="text-[#518231]" />
                Gas Property Solvers
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
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Target Variable Solver</label>
              <select
                value={variableMode}
                onChange={(e) => setVariableMode(e.target.value as VariableMode)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="solve_p">1. Calculate Pressure (P = nRT / V)</option>
                <option value="solve_v">2. Calculate Volume (V = nRT / P)</option>
                <option value="solve_n">3. Calculate Moles (n = PV / RT)</option>
                <option value="solve_t">4. Calculate Absolute Temp (T = PV / nR)</option>
                <option value="solve_r">5. Calculate Gas Constant (R = PV / nT)</option>
                <option value="density_molar_mass">6. Gas Density & Molar Mass</option>
                <option value="two_state">7. Compare Two Gas States (P1V1/T1 = P2V2/T2)</option>
                <option value="compressibility_z">8. Compressibility Factor Z</option>
              </select>
            </div>

            {/* Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Gas Laboratory Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {GAS_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* R Constant Selector */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Ideal Gas Constant (R)</label>
              <select
                value={rConstantVal}
                onChange={(e) => setRConstantVal(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value={0.082057}>0.082057 L·atm/(mol·K)</option>
                <option value={8.314462}>8.314462 J/(mol·K) or Pa·m³/(mol·K)</option>
                <option value={0.08314}>0.08314 L·bar/(mol·K)</option>
                <option value={62.3637}>62.3637 L·mmHg/(mol·K)</option>
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-4">
              
              {/* Pressure (atm) */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Pressure P (atm)</label>
                <input
                  type="number"
                  step="0.01"
                  value={inputPressureAtm}
                  onChange={(e) => setInputPressureAtm(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              {/* Volume (L) */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Volume V (Liters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputVolumeL}
                  onChange={(e) => setInputVolumeL(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              {/* Moles n */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Amount of Gas n (moles)</label>
                <input
                  type="number"
                  step="0.01"
                  value={inputMoles}
                  onChange={(e) => setInputMoles(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              {/* Temperature (°C) */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Temperature T (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputTempC}
                  onChange={(e) => setInputTempC(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 font-semibold block mt-1">Converted Absolute Temp: {results.tempK.toFixed(2)} K</span>
              </div>

              {/* Molar Mass M (g/mol) */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Molar Mass M (g/mol)</label>
                <input
                  type="number"
                  step="0.01"
                  value={inputMolarMassGmol}
                  onChange={(e) => setInputMolarMassGmol(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Calculated Pressure (P)" 
                val={`${results.calcPressureAtm.toFixed(3)} atm`} 
                icon={Gauge} 
              />
              <ReadOnlyField 
                label="Gas Density (ρ)" 
                val={`${results.gasDensityGL.toFixed(3)} g/L`} 
                icon={Atom} 
              />

            </div>
          </div>

          {/* Integration Links to Stoichiometry Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need molar mass or stoichiometry conversions?</span>
              <span className="text-[11px] text-slate-500">Try our companion Stoichiometry Calculator</span>
            </div>
            <Link
              href="/calculators/stoichiometry-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Stoich Tool
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Cockpit & Isotherm Plotter */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Ideal Gas State Cockpit
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg border bg-green-950 text-green-300 border-green-800">
                Ideal Gas (Z = 1.00)
              </span>
            </div>

            {/* Readout Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Pressure P</span>
                <span className="text-xs font-black text-[#518231]">{results.calcPressureAtm.toFixed(3)} atm</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Volume V</span>
                <span className="text-xs font-black text-amber-400">{results.calcVolumeL.toFixed(2)} L</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Molar Volume V_m</span>
                <span className="text-xs font-black text-cyan-400">{results.molarVolumeLmol.toFixed(2)} L/mol</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Gas Density ρ</span>
                <span className="text-xs font-black text-white">{results.gasDensityGL.toFixed(3)} g/L</span>
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
                {(["isotherm_chart", "gas_dashboard", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "isotherm_chart" ? "📊 Isotherm Chart" : tab === "gas_dashboard" ? "⚡ Gas Dashboard" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Recharts Isotherm Plotter */}
                {visualTab === "isotherm_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Boyle's Law Isotherm (Pressure atm vs Volume L at T = {results.tempK.toFixed(1)} K)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={isothermData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="VolumeL" label={{ value: "Volume (L)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Pressure (atm)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="PressureAtm" stroke="#10b981" strokeWidth={2} dot={true} name="Pressure (atm)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 2: Gas State Dashboard */}
                {visualTab === "gas_dashboard" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Gas State Thermodynamic Summary
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400">Ideal Gas Law: PV = nRT</span>
                        <span className="text-[11px] font-bold text-green-400">R = {rConstantVal} L·atm/(mol·K)</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Absolute Temp (T)</span>
                          <span className="font-bold text-amber-400">{results.tempK.toFixed(2)} K</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Molar Volume (V_m)</span>
                          <span className="font-bold text-cyan-400">{results.molarVolumeLmol.toFixed(2)} L/mol</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Compressibility Z</span>
                          <span className="font-bold text-[#518231]">{results.compressibilityZ.toFixed(3)}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        Gas State Equivalence: <span className="font-bold text-white">P·V / T = {(inputPressureAtm * inputVolumeL / results.tempK).toFixed(4)} L·atm/K</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Gas Law Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Gas Law Quiz</h4>
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
