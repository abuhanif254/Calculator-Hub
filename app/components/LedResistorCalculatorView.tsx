"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Thermometer, ShieldAlert, ArrowDown, ExternalLink, RefreshCw
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type CategoryTab = "single_series" | "parallel_branches" | "micro_auto" | "color_code" | "power_strip";

interface LedPreset {
  name: string;
  vf: number;
  colorHex: string;
}

const LED_PRESETS: LedPreset[] = [
  { name: "Red LED", vf: 2.0, colorHex: "#ef4444" },
  { name: "Green LED", vf: 2.2, colorHex: "#10b981" },
  { name: "Blue LED", vf: 3.2, colorHex: "#3b82f6" },
  { name: "White LED", vf: 3.2, colorHex: "#f8fafc" },
  { name: "Yellow LED", vf: 2.1, colorHex: "#eab308" },
  { name: "Orange LED", vf: 2.1, colorHex: "#f97316" },
  { name: "UV LED", vf: 3.4, colorHex: "#a855f7" },
  { name: "Infrared (IR) LED", vf: 1.3, colorHex: "#64748b" }
];

const E12_VALUES = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
const E24_VALUES = [10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91];

function getStandardResistor(targetOhms: number, series: "E12" | "E24" = "E24"): {
  lower: number;
  standard: number;
  higher: number;
} {
  if (targetOhms <= 0) return { lower: 10, standard: 10, higher: 10 };

  const mult = Math.pow(10, Math.floor(Math.log10(targetOhms)));
  const base = targetOhms / mult;
  const list = series === "E12" ? E12_VALUES : E24_VALUES;

  let lower = list[0] * mult;
  let standard = list[0] * mult;
  let higher = list[list.length - 1] * mult * 10;

  for (let i = 0; i < list.length; i++) {
    const val = list[i] * mult;
    if (val <= targetOhms) lower = val;
    if (val >= targetOhms && higher === list[list.length - 1] * mult * 10) higher = val;
  }

  // Pick closest for standard
  const diffLower = Math.abs(targetOhms - lower);
  const diffHigher = Math.abs(targetOhms - higher);
  standard = diffHigher < diffLower ? higher : lower;

  return { lower, standard, higher };
}

// Resistor Band Colors
const COLOR_BANDS: { [key: number]: { name: string; hex: string; fg: string } } = {
  0: { name: "Black", hex: "#000000", fg: "#ffffff" },
  1: { name: "Brown", hex: "#78350f", fg: "#ffffff" },
  2: { name: "Red", hex: "#dc2626", fg: "#ffffff" },
  3: { name: "Orange", hex: "#ea580c", fg: "#ffffff" },
  4: { name: "Yellow", hex: "#ca8a04", fg: "#000000" },
  5: { name: "Green", hex: "#16a34a", fg: "#ffffff" },
  6: { name: "Blue", hex: "#2563eb", fg: "#ffffff" },
  7: { name: "Violet", hex: "#9333ea", fg: "#ffffff" },
  8: { name: "Gray", hex: "#4b5563", fg: "#ffffff" },
  9: { name: "White", hex: "#ffffff", fg: "#000000" }
};

export function LedResistorCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("single_series");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Single & Series Inputs
  const [supplyVoltageVs, setSupplyVoltageVs] = useState<number>(5.0); // Volts
  const [ledCountN, setLedCountN] = useState<number>(1);
  const [ledForwardVoltageVf, setLedForwardVoltageVf] = useState<number>(2.0); // Red LED 2.0V
  const [ledCurrentMa, setLedCurrentMa] = useState<number>(20); // 20mA
  const [selectedPreset, setSelectedPreset] = useState<string>("Red LED");

  // Parallel & Branches Inputs
  const [parallelBranches, setParallelBranches] = useState<number>(3);
  const [isSharedResistor, setIsSharedResistor] = useState<boolean>(false);

  // Voltage Range Inputs (Automotive / Battery)
  const [supplyVoltageMin, setSupplyVoltageMin] = useState<number>(11.5);
  const [supplyVoltageNom, setSupplyVoltageNom] = useState<number>(12.0);
  const [supplyVoltageMax, setSupplyVoltageMax] = useState<number>(14.4);

  // Resistor Color Code Inputs
  const [band1, setBand1] = useState<number>(2); // Red (2)
  const [band2, setBand2] = useState<number>(2); // Red (2)
  const [band3Multiplier, setBand3Multiplier] = useState<number>(1); // x10 (1) = 220 Ω

  // Safety Margin & E-Series
  const [safetyMarginFactor, setSafetyMarginFactor] = useState<number>(1.5); // 1.5x
  const [eSeries, setESeries] = useState<"E12" | "E24">("E24");

  // Visual Tab
  const [visualTab, setVisualTab] = useState<"diagram" | "standard" | "charts" | "quiz">("diagram");

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

  const handleSelectPreset = (presetName: string) => {
    setSelectedPreset(presetName);
    const item = LED_PRESETS.find(p => p.name === presetName);
    if (item) {
      setLedForwardVoltageVf(item.vf);
    }
  };

  // Calculations Engine
  const results = useMemo(() => {
    const totalLedVf = ledCountN * ledForwardVoltageVf;
    const isVoltageInvalid = supplyVoltageVs <= totalLedVf;
    const voltageAcrossResistorVr = Math.max(0, supplyVoltageVs - totalLedVf);

    const ledCurrentAmps = ledCurrentMa / 1000;
    const requiredResistanceOhms = ledCurrentAmps > 0 ? voltageAcrossResistorVr / ledCurrentAmps : 0;

    // E-Series Standard Resistor Matching
    const standardMatching = getStandardResistor(requiredResistanceOhms, eSeries);
    const actualCurrentWithStandardAmps = standardMatching.standard > 0 ? voltageAcrossResistorVr / standardMatching.standard : 0;
    const actualCurrentWithStandardMa = actualCurrentWithStandardAmps * 1000;

    // Power calculations
    const resistorPowerWatts = ledCurrentAmps * ledCurrentAmps * requiredResistanceOhms;
    const resistorPowerWattsStandard = actualCurrentWithStandardAmps * actualCurrentWithStandardAmps * standardMatching.standard;
    const recommendedResistorPowerWatts = resistorPowerWatts * safetyMarginFactor;

    // Minimum Power Rating Classification
    let recommendedWattageRating = "1/4 W (0.25W)";
    if (recommendedResistorPowerWatts > 2.0) recommendedWattageRating = "5 W (Power Resistor)";
    else if (recommendedResistorPowerWatts > 1.0) recommendedWattageRating = "2 W";
    else if (recommendedResistorPowerWatts > 0.5) recommendedWattageRating = "1 W";
    else if (recommendedResistorPowerWatts > 0.25) recommendedWattageRating = "1/2 W (0.50W)";

    const totalLedPowerWatts = totalLedVf * ledCurrentAmps;
    const totalCircuitPowerWatts = supplyVoltageVs * ledCurrentAmps;
    const powerEfficiencyPct = totalCircuitPowerWatts > 0 ? (totalLedPowerWatts / totalCircuitPowerWatts) * 100 : 0;

    // Parallel Branch calculations
    const totalParallelCurrentMa = parallelBranches * ledCurrentMa;
    const sharedResistorOhms = totalParallelCurrentMa > 0 ? voltageAcrossResistorVr / (totalParallelCurrentMa / 1000) : 0;

    // Voltage Range Analysis
    const minCurrentMa = ((Math.max(0, supplyVoltageMin - totalLedVf)) / requiredResistanceOhms) * 1000;
    const nomCurrentMa = ((Math.max(0, supplyVoltageNom - totalLedVf)) / requiredResistanceOhms) * 1000;
    const maxCurrentMa = ((Math.max(0, supplyVoltageMax - totalLedVf)) / requiredResistanceOhms) * 1000;

    // Color Code Resistance Calculation (2-digit + multiplier)
    const colorCodeResistanceOhms = (band1 * 10 + band2) * Math.pow(10, band3Multiplier);

    return {
      totalLedVf,
      isVoltageInvalid,
      voltageAcrossResistorVr,
      requiredResistanceOhms,
      standardMatching,
      actualCurrentWithStandardMa,
      resistorPowerWatts,
      resistorPowerWattsStandard,
      recommendedResistorPowerWatts,
      recommendedWattageRating,
      totalLedPowerWatts,
      totalCircuitPowerWatts,
      powerEfficiencyPct,
      totalParallelCurrentMa,
      sharedResistorOhms,
      minCurrentMa,
      nomCurrentMa,
      maxCurrentMa,
      colorCodeResistanceOhms
    };
  }, [
    supplyVoltageVs, ledCountN, ledForwardVoltageVf, ledCurrentMa, eSeries, safetyMarginFactor, 
    parallelBranches, supplyVoltageMin, supplyVoltageNom, supplyVoltageMax, band1, band2, band3Multiplier
  ]);

  // Recharts Chart Data (Current vs Resistance)
  const chartData = useMemo(() => {
    const data = [];
    const targetR = Math.max(10, Math.round(results.requiredResistanceOhms));
    const startR = Math.max(10, Math.floor(targetR * 0.5));
    const endR = Math.ceil(targetR * 2.0);
    const step = Math.max(5, Math.floor((endR - startR) / 15));

    for (let r = startR; r <= endR; r += step) {
      const iMa = r > 0 ? (results.voltageAcrossResistorVr / r) * 1000 : 0;
      data.push({
        Resistance: r,
        Current: Number(iMa.toFixed(1))
      });
    }
    return data;
  }, [results.requiredResistanceOhms, results.voltageAcrossResistorVr]);

  const handleCopySummary = () => {
    const text = `LED Resistor Calculation Summary
-----------------------------------------
Supply Voltage (Vs): ${supplyVoltageVs} V
LED Count: ${ledCountN} in Series
LED Forward Voltage (Vf): ${ledForwardVoltageVf} V (Total Vf: ${results.totalLedVf.toFixed(2)} V)
Desired LED Current: ${ledCurrentMa} mA
-----------------------------------------
Calculated Resistor: ${results.requiredResistanceOhms.toFixed(1)} Ω
Nearest E24 Standard Resistor: ${results.standardMatching.standard} Ω (Actual Current: ${results.actualCurrentWithStandardMa.toFixed(1)} mA)
Voltage Across Resistor: ${results.voltageAcrossResistorVr.toFixed(2)} V
Resistor Power Loss: ${(results.resistorPowerWatts * 1000).toFixed(1)} mW
Recommended Resistor Rating: ${results.recommendedWattageRating} (${safetyMarginFactor}x safety factor)
Circuit Efficiency: ${results.powerEfficiencyPct.toFixed(1)}%`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "LED Resistor summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What resistor is required to power a 2.0V 20mA Red LED from a 5.0V supply?", correctAnswer: 150, units: "Ω" },
      { q: "What is the voltage drop across a resistor connected to a 12V battery powering three 3.2V LEDs in series?", correctAnswer: 2.4, units: "V" },
      { q: "What is the power dissipated in a 150Ω resistor carrying 20mA (0.02A) of current?", correctAnswer: 60, units: "mW" }
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
    setQuizIsCorrect(diff < 5);
    setQuizChecked(true);
  };

  return (
    <div className="w-full">
      {/* Alert Banner */}
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

      {/* 🔄 Physics & Electronics Hub Top Pill Navigation */}
      <div className="bg-slate-100 dark:bg-slate-900/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex items-center justify-between overflow-x-auto gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 flex items-center gap-1.5 shrink-0">
          <Layers size={14} className="text-[#518231]" />
          Electronics Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            LED Resistor
          </span>
          <Link href="/calculators/ohms-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ohm's Law
          </Link>
          <Link href="/calculators/voltage-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Voltage
          </Link>
          <Link href="/calculators/current-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Current
          </Link>
          <Link href="/calculators/wire-resistance-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Wire Resistance
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
                <Cpu className="text-[#518231]" />
                Circuit Cockpit
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

            {/* Category Select Tabs */}
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-5 gap-1 mb-6 text-center">
              {[
                { key: "single_series", label: "Series" },
                { key: "parallel_branches", label: "Parallel" },
                { key: "micro_auto", label: "Voltage" },
                { key: "color_code", label: "Bands" },
                { key: "power_strip", label: "Strips" }
              ].map(t => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveTab(t.key as CategoryTab)}
                  className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all capitalize ${
                    activeTab === t.key 
                      ? "bg-white dark:bg-slate-800 text-[#518231] shadow-sm font-black" 
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Voltage Alert Notice */}
            {results.isVoltageInvalid && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300 rounded-2xl text-xs flex items-center gap-2">
                <AlertTriangle size={16} className="shrink-0" />
                <span>Supply voltage ({supplyVoltageVs}V) must be greater than total LED forward voltage ({results.totalLedVf.toFixed(1)}V).</span>
              </div>
            )}

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              {/* Primary Output Display */}
              <ReadOnlyField 
                label="Calculated LED Resistor Value" 
                val={`${results.requiredResistanceOhms.toFixed(1)} Ω (Standard: ${results.standardMatching.standard} Ω)`} 
                icon={Zap} 
              />

              {/* Supply Voltage */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Supply Voltage (Vs in Volts)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={supplyVoltageVs}
                    onChange={(e) => setSupplyVoltageVs(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="48"
                  step="0.5"
                  value={supplyVoltageVs}
                  onChange={(e) => setSupplyVoltageVs(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* LED Forward Voltage & Preset Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Forward Voltage (Vf in Volts)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={ledForwardVoltageVf}
                    onChange={(e) => setLedForwardVoltageVf(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                
                {/* LED Color Preset Buttons */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {LED_PRESETS.map(p => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => handleSelectPreset(p.name)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all border ${
                        selectedPreset === p.name 
                          ? "bg-[#518231] text-white border-[#518231]" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {p.name.split(" ")[0]} ({p.vf}V)
                    </button>
                  ))}
                </div>
              </div>

              {/* LED Current in mA */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Desired Current (I in mA)</span>
                  <input
                    type="number"
                    value={ledCurrentMa}
                    onChange={(e) => setLedCurrentMa(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={ledCurrentMa}
                  onChange={(e) => setLedCurrentMa(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Number of LEDs in Series */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Number of Series LEDs (N)</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={ledCountN}
                    onChange={(e) => setLedCountN(Number(e.target.value))}
                    className="w-20 bg-slate-50 dark:bg-slate-950 text-right p-1 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-xs"
                  />
                </div>
              </div>

              {/* Advanced Mode: Color Code Band Inputs */}
              {activeTab === "color_code" && (
                <div className="space-y-3 pt-2 animate-fade-in text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Resistor Color Code Bands</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Digit 1</span>
                      <select
                        value={band1}
                        onChange={(e) => setBand1(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        {Object.entries(COLOR_BANDS).map(([k, v]) => (
                          <option key={k} value={k}>{k} - {v.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Digit 2</span>
                      <select
                        value={band2}
                        onChange={(e) => setBand2(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        {Object.entries(COLOR_BANDS).map(([k, v]) => (
                          <option key={k} value={k}>{k} - {v.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Multiplier</span>
                      <select
                        value={band3Multiplier}
                        onChange={(e) => setBand3Multiplier(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value={0}>×1 (10⁰)</option>
                        <option value={1}>×10 (10¹)</option>
                        <option value={2}>×100 (10²)</option>
                        <option value={3}>×1k (10³)</option>
                        <option value={4}>×10k (10⁴)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Quick Integration Link to Ohm's Law Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need general Ohm's Law formulas?</span>
              <span className="text-[11px] text-slate-500">Solve V = I · R across all electronics</span>
            </div>
            <Link
              href="/calculators/ohms-law-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Ohm's Law
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Schematic Diagram & Analytics */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit: Dynamic SVG Circuit Schematic Graphic */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                ⚡ Dynamic Interactive Circuit Schematic Diagram
              </span>
              <span className="text-xs font-bold text-green-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                I = {ledCurrentMa} mA
              </span>
            </div>

            {/* SVG Interactive Circuit Diagram */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              {/* Dynamic Formula Display */}
              <div className="text-center mb-4 font-mono text-xs sm:text-sm">
                <span className="text-slate-400">Formula: </span>
                <span className="text-white font-bold">R = (Vs - Vf) / I = ({supplyVoltageVs}V - {results.totalLedVf.toFixed(1)}V) / {ledCurrentMa}mA = </span>
                <span className="text-[#518231] font-black">{results.requiredResistanceOhms.toFixed(1)} Ω</span>
              </div>

              {/* Circuit Schematic SVG */}
              <div className="w-full max-w-md h-40 relative flex items-center justify-center">
                <svg viewBox="0 0 400 140" className="w-full h-full">
                  
                  {/* Outer Circuit Loop Wires */}
                  <path d="M 60 70 L 60 20 L 340 20 L 340 120 L 60 120 L 60 70" fill="none" stroke="#64748b" strokeWidth="2.5" />

                  {/* Battery Source (Left) */}
                  <rect x="40" y="45" width="40" height="50" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="6" />
                  <text x="60" y="65" fill="#3b82f6" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
                  <text x="60" y="85" fill="#94a3b8" fontSize="14" fontWeight="bold" textAnchor="middle">-</text>
                  <text x="30" y="70" fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="end">Vs = {supplyVoltageVs}V</text>

                  {/* Top Current Arrow */}
                  <line x1="130" y1="12" x2="190" y2="12" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="160" y="8" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">I = {ledCurrentMa} mA</text>

                  {/* Resistor Component (Top) */}
                  <g transform="translate(110, 10)">
                    <rect x="0" y="0" width="70" height="20" fill="#334155" stroke="#f59e0b" strokeWidth="2" rx="4" />
                    <text x="35" y="14" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">R = {results.requiredResistanceOhms.toFixed(0)} Ω</text>
                  </g>

                  {/* LED Component (Top Right) */}
                  <g transform="translate(240, 10)">
                    {/* Triangle Anode */}
                    <polygon points="10,2 10,18 25,10" fill="#ef4444" stroke="#ef4444" strokeWidth="1" />
                    <line x1="25" y1="2" x2="25" y2="18" stroke="#ef4444" strokeWidth="2" />
                    {/* Light Emission Arrows */}
                    <line x1="18" y1="-2" x2="24" y2="-8" stroke="#f59e0b" strokeWidth="1.5" />
                    <line x1="24" y1="-2" x2="30" y2="-8" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="18" y="32" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">Vf = {results.totalLedVf.toFixed(1)}V</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Resistor Voltage (Vr)</span>
                <span className="text-xs font-black text-white">{results.voltageAcrossResistorVr.toFixed(2)} V</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Resistor Power Loss</span>
                <span className="text-xs font-black text-amber-400">{(results.resistorPowerWatts * 1000).toFixed(1)} mW</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Rating Needed</span>
                <span className="text-xs font-black text-[#518231]">{results.recommendedWattageRating}</span>
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
                {(["diagram", "standard", "charts", "quiz"] as const).map(tab => (
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
                    {tab === "diagram" ? "Overview" : tab === "standard" ? "📏 E24 Standard" : tab === "charts" ? "📊 Live Graph" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Schematic Overview */}
                {visualTab === "diagram" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚡ Current-Limiting Resistor Engineering Theory</h4>
                    <p className="leading-relaxed">
                      LEDs are non-linear semiconductor diodes with negative temperature coefficients. Without a current-limiting resistor, current quickly exceeds thermal ratings and destroys the diode. Circuit efficiency is {results.powerEfficiencyPct.toFixed(1)}%.
                    </p>
                  </div>
                )}

                {/* Tab 2: E24 Standard Resistor Matching Table */}
                {visualTab === "standard" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sliders size={16} className="text-[#518231]" />
                      E-Series Standard Resistor Value Matching
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                            <th className="py-2 px-2">Option</th>
                            <th className="py-2 px-2">Resistor Value</th>
                            <th className="py-2 px-2">Actual LED Current</th>
                            <th className="py-2 px-2">Resistor Power</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100 dark:border-slate-800/50">
                            <td className="py-2 px-2 font-semibold text-slate-500">Nearest Lower</td>
                            <td className="py-2 px-2 font-bold">{results.standardMatching.lower} Ω</td>
                            <td className="py-2 px-2 text-amber-500 font-bold">{((results.voltageAcrossResistorVr / results.standardMatching.lower) * 1000).toFixed(1)} mA</td>
                            <td className="py-2 px-2">{((Math.pow(results.voltageAcrossResistorVr / results.standardMatching.lower, 2) * results.standardMatching.lower) * 1000).toFixed(0)} mW</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-800/50 bg-[#518231]/10 font-bold text-[#518231]">
                            <td className="py-2 px-2">Nearest Standard (Recommended)</td>
                            <td className="py-2 px-2">{results.standardMatching.standard} Ω</td>
                            <td className="py-2 px-2">{results.actualCurrentWithStandardMa.toFixed(1)} mA</td>
                            <td className="py-2 px-2">{(results.resistorPowerWattsStandard * 1000).toFixed(0)} mW</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-800/50">
                            <td className="py-2 px-2 font-semibold text-slate-500">Nearest Higher</td>
                            <td className="py-2 px-2 font-bold">{results.standardMatching.higher} Ω</td>
                            <td className="py-2 px-2 text-blue-500 font-bold">{((results.voltageAcrossResistorVr / results.standardMatching.higher) * 1000).toFixed(1)} mA</td>
                            <td className="py-2 px-2">{((Math.pow(results.voltageAcrossResistorVr / results.standardMatching.higher, 2) * results.standardMatching.higher) * 1000).toFixed(0)} mW</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab 3: Recharts Graph */}
                {visualTab === "charts" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      LED Current vs Series Resistance Curve
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Resistance" label={{ value: 'Resistance (Ω)', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis />
                            <Tooltip formatter={(val: any) => [`${val} mA`, "Current"]} />
                            <Line type="monotone" dataKey="Current" stroke="#10b981" strokeWidth={2.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 4: Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">LED Resistor Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="1"
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
