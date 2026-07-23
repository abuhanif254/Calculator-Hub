"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Scale, ExternalLink, ShieldCheck, Gauge, FlaskConical, Beaker, Atom, BookOpen, Snowflake, Compass, RefreshCw, Network, Layers3, Droplet, ArrowRightLeft, GitCommit, Binary, Dna, Table, Clock, Shield
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CalculationMode = 
  | "basic_q_mc_dt" 
  | "thermal_equilibrium" 
  | "coffee_cup" 
  | "bomb_calorimetry" 
  | "phase_change" 
  | "heating_curve";

interface CalorimetryPreset {
  id: string;
  name: string;
  desc: string;
  defaultMass1G: number;
  defaultSpecHeat1: number; // J/(g*°C)
  defaultTemp1C: number;
  defaultMass2G: number;
  defaultSpecHeat2: number; // J/(g*°C)
  defaultTemp2C: number;
  defaultCalorimeterConstKjC: number; // kJ/°C
  defaultLatentHeatJg: number; // J/g
}

const CALORIMETRY_PRESETS: CalorimetryPreset[] = [
  {
    id: "hot_metal_water",
    name: "Hot Copper Metal in Water (Thermal Equilibrium)",
    desc: "100g Copper at 100°C dropped into 200g Water at 20°C",
    defaultMass1G: 100.0, // Copper
    defaultSpecHeat1: 0.385, // Cu
    defaultTemp1C: 100.0,
    defaultMass2G: 200.0, // Water
    defaultSpecHeat2: 4.184, // H2O
    defaultTemp2C: 20.0,
    defaultCalorimeterConstKjC: 0.05,
    defaultLatentHeatJg: 334.0 // L_f ice
  },
  {
    id: "coffee_cup_neutralization",
    name: "Coffee-Cup Neutralization (HCl + NaOH)",
    desc: "100g Solution heated by exothermic neutralization reaction",
    defaultMass1G: 100.0,
    defaultSpecHeat1: 4.184,
    defaultTemp1C: 20.0,
    defaultMass2G: 0.0,
    defaultSpecHeat2: 4.184,
    defaultTemp2C: 26.8, // T_final
    defaultCalorimeterConstKjC: 0.15,
    defaultLatentHeatJg: 334.0
  },
  {
    id: "bomb_benzoic_acid",
    name: "Bomb Calorimetry of Benzoic Acid",
    desc: "Combustion in sealed bomb calorimeter (C_cal = 10.35 kJ/°C)",
    defaultMass1G: 1.22,
    defaultSpecHeat1: 4.184,
    defaultTemp1C: 22.0,
    defaultMass2G: 0.0,
    defaultSpecHeat2: 4.184,
    defaultTemp2C: 25.12, // T_final (ΔT = 3.12 °C)
    defaultCalorimeterConstKjC: 10.35,
    defaultLatentHeatJg: 334.0
  },
  {
    id: "cold_pack_dissolution",
    name: "Dissolution of Ammonium Nitrate (Cold Pack)",
    desc: "80g NH4NO3 in water cools solution endothermically",
    defaultMass1G: 100.0,
    defaultSpecHeat1: 4.184,
    defaultTemp1C: 25.0,
    defaultMass2G: 0.0,
    defaultSpecHeat2: 4.184,
    defaultTemp2C: 18.9, // T_final (ΔT = -6.1 °C)
    defaultCalorimeterConstKjC: 0.10,
    defaultLatentHeatJg: 334.0
  },
  {
    id: "ice_to_steam",
    name: "Ice Melting & Heating (-10°C Ice to 25°C Water)",
    desc: "Multi-step phase change: warm ice -> melt -> warm water",
    defaultMass1G: 50.0,
    defaultSpecHeat1: 2.09, // Ice spec heat
    defaultTemp1C: -10.0,
    defaultMass2G: 50.0,
    defaultSpecHeat2: 4.184, // Water spec heat
    defaultTemp2C: 25.0,
    defaultCalorimeterConstKjC: 0.0,
    defaultLatentHeatJg: 334.0 // L_f ice
  }
];

export function CalorimetryCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalculationMode>("basic_q_mc_dt");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("hot_metal_water");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [inputMass1G, setInputMass1G] = useState<number>(100.0);
  const [inputSpecHeat1, setInputSpecHeat1] = useState<number>(0.385); // J/(g*°C)
  const [inputTemp1C, setInputTemp1C] = useState<number>(100.0);

  const [inputMass2G, setInputMass2G] = useState<number>(200.0);
  const [inputSpecHeat2, setInputSpecHeat2] = useState<number>(4.184); // J/(g*°C)
  const [inputTemp2C, setInputTemp2C] = useState<number>(20.0);

  const [inputCalorimeterConstKjC, setInputCalorimeterConstKjC] = useState<number>(0.05); // kJ/°C
  const [inputLatentHeatJg, setInputLatentHeatJg] = useState<number>(334.0); // J/g

  // Current Preset
  const preset = useMemo(() => {
    return CALORIMETRY_PRESETS.find(p => p.id === selectedPresetId) || CALORIMETRY_PRESETS[0];
  }, [selectedPresetId]);

  useEffect(() => {
    setInputMass1G(preset.defaultMass1G);
    setInputSpecHeat1(preset.defaultSpecHeat1);
    setInputTemp1C(preset.defaultTemp1C);
    setInputMass2G(preset.defaultMass2G);
    setInputSpecHeat2(preset.defaultSpecHeat2);
    setInputTemp2C(preset.defaultTemp2C);
    setInputCalorimeterConstKjC(preset.defaultCalorimeterConstKjC);
    setInputLatentHeatJg(preset.defaultLatentHeatJg);
  }, [preset]);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"energy_profile" | "heating_chart" | "flashcards" | "quiz">("energy_profile");

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

  // Main Calorimetry & Thermal Equilibrium Engine
  const results = useMemo(() => {
    // 1. Basic Sensible Heat q = m * c * ΔT (Joules -> kJ)
    const deltaTemp1C = inputTemp2C - inputTemp1C;
    const basicQJoules = inputMass1G * inputSpecHeat1 * deltaTemp1C;
    const basicQKj = basicQJoules / 1000;

    // 2. Thermal Equilibrium Temperature T_eq between 2 substances:
    // m1*c1*(T_eq - T1) + m2*c2*(T_eq - T2) = 0
    // T_eq = (m1*c1*T1 + m2*c2*T2) / (m1*c1 + m2*c2)
    const num = (inputMass1G * inputSpecHeat1 * inputTemp1C) + (inputMass2G * inputSpecHeat2 * inputTemp2C);
    const den = (inputMass1G * inputSpecHeat1) + (inputMass2G * inputSpecHeat2);
    const equilibriumTempC = den > 0 ? num / den : inputTemp2C;

    // 3. Heat Lost by Hot Substance & Heat Gained by Cold Substance
    const heatLostJoules = inputMass1G * inputSpecHeat1 * (inputTemp1C - equilibriumTempC);
    const heatGainedJoules = inputMass2G * inputSpecHeat2 * (equilibriumTempC - inputTemp2C);

    // 4. Latent Heat q_phase = m * L
    const latentHeatJoules = inputMass1G * inputLatentHeatJg;
    const latentHeatKj = latentHeatJoules / 1000;

    // 5. Coffee-Cup Reaction Heat: q_rxn = -(q_sol + q_cal)
    const deltaT_solution = inputTemp2C - inputTemp1C;
    const qSolJoules = inputMass1G * inputSpecHeat1 * deltaT_solution;
    const qSolKj = qSolJoules / 1000;
    const qCalKj = inputCalorimeterConstKjC * deltaT_solution;
    const coffeeCupQRxnKj = -(qSolKj + qCalKj);

    const isExothermic = coffeeCupQRxnKj < 0;
    const reactionTypeLabel = isExothermic 
      ? "Exothermic Heat Flow (Heat Released q < 0)" 
      : "Endothermic Heat Flow (Heat Absorbed q > 0)";
    const reactionTypeColor = isExothermic ? "text-[#518231]" : "text-amber-500";

    return {
      basicQKj,
      equilibriumTempC,
      heatLostKj: heatLostJoules / 1000,
      heatGainedKj: heatGainedJoules / 1000,
      latentHeatKj,
      qSolKj,
      qCalKj,
      coffeeCupQRxnKj,
      isExothermic,
      reactionTypeLabel,
      reactionTypeColor
    };
  }, [inputMass1G, inputSpecHeat1, inputTemp1C, inputMass2G, inputSpecHeat2, inputTemp2C, inputCalorimeterConstKjC, inputLatentHeatJg]);

  // Recharts Multi-Stage Heating Curve Plotter Data
  const heatingCurveData = useMemo(() => {
    const data = [
      { Stage: "Solid Heating", HeatKj: 0, TemperatureC: -10 },
      { Stage: "Melting Point", HeatKj: 1.04, TemperatureC: 0 },
      { Stage: "Melting Complete", HeatKj: 17.74, TemperatureC: 0 },
      { Stage: "Liquid Heating", HeatKj: 22.97, TemperatureC: 25 }
    ];
    return data;
  }, []);

  // Flashcards Data
  const flashcards = [
    { title: "Calorimetry Equation (q = mcΔT)", desc: "Calculates sensible heat energy transferred during temperature changes without phase change." },
    { title: "Thermal Equilibrium (q_lost + q_gained = 0)", desc: "When two isolated substances at different temperatures mix, heat flows from hot to cold until T_final is uniform." },
    { title: "Latent Heat (q = mL)", desc: "Heat absorbed or released during phase transition (melting L_f or boiling L_v) at CONSTANT temperature." },
    { title: "Calorimeter Constant (C_cal)", desc: "Total heat capacity of calorimeter hardware (J/°C or kJ/°C). Hardware heat q_cal = C_cal * ΔT." }
  ];

  // Handlers
  const handleCopySummary = () => {
    const text = `Calorimetry & Heat Transfer Analysis (${preset.name})
------------------------------------
Substance 1: Mass = ${inputMass1G} g | Specific Heat = ${inputSpecHeat1} J/g·°C | T_init = ${inputTemp1C} °C
Substance 2: Mass = ${inputMass2G} g | Specific Heat = ${inputSpecHeat2} J/g·°C | T_init = ${inputTemp2C} °C
Thermal Equilibrium Temp (T_eq): ${results.equilibriumTempC.toFixed(2)} °C
Heat Lost by Hot: ${results.heatLostKj.toFixed(2)} kJ | Heat Gained by Cold: ${results.heatGainedKj.toFixed(2)} kJ
Basic Calorimetry Heat (q = mcΔT): ${results.basicQKj.toFixed(2)} kJ
Coffee-Cup Reaction Heat: ${results.coffeeCupQRxnKj.toFixed(2)} kJ`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calorimetry analysis copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "During a Phase Change (such as ice melting at 0°C), does temperature INCREASE, DECREASE, or STAY CONSTANT?", correctAnswer: "STAY CONSTANT" },
      { q: "What is the equation for sensible heat given mass m, specific heat c, and temperature change ΔT?", correctAnswer: "Q = MCΔT" },
      { q: "In an isolated thermal equilibrium system, what is the sum of Heat Lost and Heat Gained?", correctAnswer: "ZERO" }
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
            Calorimetry Calculator
          </span>
          <Link href="/calculators/hess-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Hess's Law Calculator
          </Link>
          <Link href="/calculators/heat-of-reaction-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Heat of Reaction Calculator
          </Link>
          <Link href="/calculators/enthalpy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Enthalpy Calculator
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
                <Thermometer className="text-[#518231]" />
                Calorimetry Cockpit
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
                <option value="basic_q_mc_dt">1. Basic Calorimetry (q = m * c * ΔT)</option>
                <option value="thermal_equilibrium">2. Thermal Equilibrium (Hot + Cold Mixing)</option>
                <option value="coffee_cup">3. Coffee-Cup Calorimetry</option>
                <option value="bomb_calorimetry">4. Bomb Calorimetry (q_v = ΔU)</option>
                <option value="phase_change">5. Latent Heat & Phase Change (q = m * L)</option>
                <option value="heating_curve">6. Multi-Step Heating Curve</option>
              </select>
            </div>

            {/* Preset Select */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Laboratory Preset</label>
              <select
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {CALORIMETRY_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              {/* Substance 1 Controls */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Substance 1 (or Solution)</span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Mass m1 (g)</label>
                    <input
                      type="number"
                      step="1"
                      value={inputMass1G}
                      onChange={(e) => setInputMass1G(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Spec Heat c1 (J/g·°C)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={inputSpecHeat1}
                      onChange={(e) => setInputSpecHeat1(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Initial Temp T1 (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputTemp1C}
                    onChange={(e) => setInputTemp1C(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-xs"
                  />
                </div>
              </div>

              {/* Substance 2 Controls (Mixing Mode) */}
              {(calcMode === "thermal_equilibrium" || inputMass2G > 0) && (
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Substance 2 (Water / Receiver)</span>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Mass m2 (g)</label>
                      <input
                        type="number"
                        step="1"
                        value={inputMass2G}
                        onChange={(e) => setInputMass2G(Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Spec Heat c2 (J/g·°C)</label>
                      <input
                        type="number"
                        step="0.001"
                        value={inputSpecHeat2}
                        onChange={(e) => setInputSpecHeat2(Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Initial Temp T2 (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputTemp2C}
                      onChange={(e) => setInputTemp2C(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Primary Output Readouts */}
              <ReadOnlyField 
                label="Thermal Equilibrium Temp (T_eq)" 
                val={`${results.equilibriumTempC.toFixed(2)} °C`} 
                icon={Thermometer} 
              />
              <ReadOnlyField 
                label="Basic Heat (q = mcΔT)" 
                val={`${results.basicQKj.toFixed(2)} kJ`} 
                icon={Flame} 
              />

            </div>
          </div>

          {/* Integration Links to Hess's Law Tool */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need multi-step Hess's Law algebra?</span>
              <span className="text-[11px] text-slate-500">Try our companion Hess's Law Calculator</span>
            </div>
            <Link
              href="/calculators/hess-law-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Hess Tool
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Cockpit & Recharts Heating Curve Plotter */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Cards */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧪 Calorimetry Experiment Cockpit
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
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Equilibrium T_eq</span>
                <span className="text-xs font-black text-[#518231]">{results.equilibriumTempC.toFixed(2)} °C</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Heat Lost (Hot)</span>
                <span className="text-xs font-black text-amber-400">{results.heatLostKj.toFixed(2)} kJ</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Heat Gained (Cold)</span>
                <span className="text-xs font-black text-cyan-400">{results.heatGainedKj.toFixed(2)} kJ</span>
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
                {(["energy_profile", "heating_chart", "flashcards", "quiz"] as const).map(tab => (
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
                    {tab === "energy_profile" ? "⚡ Thermal Energy" : tab === "heating_chart" ? "📊 Heating Curve" : tab === "flashcards" ? "🎴 Flashcards" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Thermal Energy Balance */}
                {visualTab === "energy_profile" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={16} className="text-[#518231]" />
                      Thermal Energy Balance ({preset.name})
                    </h4>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-white space-y-4 text-xs">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-amber-400">Isolated System: q_lost + q_gained = 0</span>
                        <span className={`text-[11px] font-bold ${results.reactionTypeColor}`}>{results.reactionTypeLabel}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Heat Lost by Hot</span>
                          <span className="font-bold text-amber-400">{results.heatLostKj.toFixed(2)} kJ</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Heat Gained by Cold</span>
                          <span className="font-bold text-cyan-400">{results.heatGainedKj.toFixed(2)} kJ</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Equilibrium T_eq</span>
                          <span className="font-bold text-[#518231]">{results.equilibriumTempC.toFixed(2)} °C</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        Energy Conservation: <span className="font-bold text-white">Heat Lost ({results.heatLostKj.toFixed(2)} kJ) = Heat Gained ({results.heatGainedKj.toFixed(2)} kJ)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Recharts Heating Curve Plotter */}
                {visualTab === "heating_chart" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Multi-Stage Heating Curve (Temperature °C vs Cumulative Heat added kJ)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={heatingCurveData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="HeatKj" label={{ value: "Heat Added (kJ)", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Temp (°C)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="TemperatureC" stroke="#10b981" strokeWidth={2} dot={true} name="Temperature (°C)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Tab 3: Chemistry Flashcards */}
                {visualTab === "flashcards" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Calorimetry Study Flashcards</h4>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Calorimetry Quiz</h4>
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
