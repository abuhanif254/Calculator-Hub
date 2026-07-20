"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, ShieldAlert, ShieldCheck, ToggleLeft, ToggleRight
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

type CalcMode = "fromVR" | "fromPV" | "fromPR" | "analysis";
type CurrentFlowDirection = "electron" | "conventional";

// Unit conversion factors to Base SI (A, V, Ω, W)
const CURRENT_CONVERSIONS: Record<string, number> = {
  "µA": 1e-6,
  "mA": 0.001,
  "A": 1,
  "kA": 1000
};

const VOLTAGE_CONVERSIONS: Record<string, number> = {
  "µV": 1e-6,
  "mV": 0.001,
  "V": 1,
  "kV": 1000,
  "MV": 1e6
};

const RESISTANCE_CONVERSIONS: Record<string, number> = {
  "mΩ": 0.001,
  "Ω": 1,
  "kΩ": 1000,
  "MΩ": 1e6
};

const POWER_CONVERSIONS: Record<string, number> = {
  "mW": 0.001,
  "W": 1,
  "kW": 1000,
  "MW": 1e6
};

// Device Current Explorer Presets
interface DevicePreset {
  name: string;
  voltage: number; // V
  resistance: number; // Ω
  typicalCurrent: string;
  desc: string;
}

const DEVICE_PRESETS: DevicePreset[] = [
  { name: "LED Indicator", voltage: 2.0, resistance: 100, typicalCurrent: "20 mA", desc: "Low power status LED" },
  { name: "Arduino Board", voltage: 5.0, resistance: 100, typicalCurrent: "50 mA", desc: "ATmega microcontroller" },
  { name: "USB 2.0 Device", voltage: 5.0, resistance: 10, typicalCurrent: "500 mA", desc: "Standard USB port load" },
  { name: "Phone Fast Charger", voltage: 9.0, resistance: 3, typicalCurrent: "3.0 A", desc: "Fast charge adapter" },
  { name: "Laptop Adapter", voltage: 19.0, resistance: 4.2, typicalCurrent: "4.5 A", desc: "Standard notebook power" },
  { name: "Refrigerator", voltage: 120.0, resistance: 24, typicalCurrent: "5.0 A", desc: "Home kitchen appliance" },
  { name: "Electric Kettle", voltage: 120.0, resistance: 12, typicalCurrent: "10.0 A", desc: "High resistive load" },
  { name: "Air Conditioner", voltage: 230.0, resistance: 15.3, typicalCurrent: "15.0 A", desc: "Cooling compressor" },
  { name: "EV Fast Charger", voltage: 240.0, resistance: 7.5, typicalCurrent: "32.0 A", desc: "Level 2 EV charger" },
  { name: "Industrial Motor", voltage: 480.0, resistance: 4.8, typicalCurrent: "100.0 A", desc: "Heavy industrial drive" }
];

// Current Safety Tiers
const SAFETY_TIERS = [
  { name: "Safe Low Current", max: 1, color: "#10b981", badge: "🟢 Low Current", desc: "Touch safe for small signal electronics (< 1A)" },
  { name: "Moderate Current", max: 5, color: "#eab308", badge: "🟡 Moderate", desc: "Standard appliance level (1A - 5A)" },
  { name: "High Current", max: 15, color: "#f59e0b", badge: "🟠 High Load", desc: "Dedicated circuit recommended (5A - 15A)" },
  { name: "Overload Current", max: 30, color: "#ef4444", badge: "🔴 Overload Risk", desc: "High heat hazard; heavy gauge required (15A - 30A)" },
  { name: "Dangerous Heavy Load", max: Infinity, color: "#8b5cf6", badge: "⚫ Heavy Industrial", desc: "Industrial breaker & disconnect required (> 30A)" }
];

// Fuse & Wire Gauge Recommender Logic
function getFuseAndWireRating(currentA: number) {
  const FUSES = [0.5, 1, 2, 3, 5, 10, 15, 20, 30, 40, 50, 100, 150, 200];
  const recFuse = FUSES.find(f => f >= currentA * 1.25) || Math.ceil(currentA * 1.25);

  let awg = "24 AWG (0.2 mm²)";
  if (currentA > 50) awg = "4 AWG (21.2 mm²)";
  else if (currentA > 30) awg = "8 AWG (8.4 mm²)";
  else if (currentA > 20) awg = "10 AWG (5.3 mm²)";
  else if (currentA > 15) awg = "12 AWG (3.3 mm²)";
  else if (currentA > 5) awg = "14 AWG (2.1 mm²)";
  else if (currentA > 1) awg = "20 AWG (0.5 mm²)";

  return { recFuse: `${recFuse} A`, awg };
}

export function CurrentCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("fromVR");
  const [flowDirection, setFlowDirection] = useState<CurrentFlowDirection>("electron");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [currentVal, setCurrentVal] = useState<number>(2);
  const [currentUnit, setCurrentUnit] = useState<string>("A");

  const [voltageVal, setVoltageVal] = useState<number>(12);
  const [voltageUnit, setVoltageUnit] = useState<string>("V");

  const [resistanceVal, setResistanceVal] = useState<number>(6);
  const [resistanceUnit, setResistanceUnit] = useState<string>("Ω");

  const [powerVal, setPowerVal] = useState<number>(24);
  const [powerUnit, setPowerUnit] = useState<string>("W");

  // Advanced Mode Tab Selection
  const [activeTab, setActiveTab] = useState<"circuit" | "graphs" | "explanation" | "quiz">("circuit");

  // Circuit animation states
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const animationRef = useRef<number | null>(null);

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState<{
    q: string;
    correctAnswer: number;
    units: string;
  } | null>(null);
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

  // Convert inputs to Base SI (A, V, Ω, W)
  const siInputs = useMemo(() => {
    const iSI = currentVal * (CURRENT_CONVERSIONS[currentUnit] || 1);
    const vSI = voltageVal * (VOLTAGE_CONVERSIONS[voltageUnit] || 1);
    const rSI = resistanceVal * (RESISTANCE_CONVERSIONS[resistanceUnit] || 1);
    const pSI = powerVal * (POWER_CONVERSIONS[powerUnit] || 1);
    return { iSI, vSI, rSI, pSI };
  }, [currentVal, currentUnit, voltageVal, voltageUnit, resistanceVal, resistanceUnit, powerVal, powerUnit]);

  // Current Calculations across 4 Modes
  const results = useMemo(() => {
    let iSI = 0;
    let vSI = siInputs.vSI;
    let rSI = siInputs.rSI;
    let pSI = siInputs.pSI;

    if (calcMode === "fromVR") {
      iSI = rSI > 0 ? vSI / rSI : 0;
      pSI = vSI * iSI;
    } else if (calcMode === "fromPV") {
      iSI = vSI > 0 ? pSI / vSI : 0;
      rSI = iSI > 0 ? vSI / iSI : 0;
    } else if (calcMode === "fromPR") {
      iSI = Math.sqrt(Math.max(0, pSI / (rSI > 0 ? rSI : 1)));
      vSI = iSI * rSI;
    } else {
      // Analysis Mode
      iSI = rSI > 0 ? vSI / rSI : 0;
      pSI = vSI * iSI;
    }

    // Convert back to display units
    const iDisplay = iSI / (CURRENT_CONVERSIONS[currentUnit] || 1);
    const vDisplay = vSI / (VOLTAGE_CONVERSIONS[voltageUnit] || 1);
    const rDisplay = rSI / (RESISTANCE_CONVERSIONS[resistanceUnit] || 1);
    const pDisplay = pSI / (POWER_CONVERSIONS[powerUnit] || 1);

    // Safety Tier
    let safety = SAFETY_TIERS[0];
    if (iSI <= 1) safety = SAFETY_TIERS[0];
    else if (iSI <= 5) safety = SAFETY_TIERS[1];
    else if (iSI <= 15) safety = SAFETY_TIERS[2];
    else if (iSI <= 30) safety = SAFETY_TIERS[3];
    else safety = SAFETY_TIERS[4];

    // Fuse & Wire Gauge Recommendation
    const protection = getFuseAndWireRating(iSI);

    return {
      iSI, vSI, rSI, pSI,
      iDisplay, vDisplay, rDisplay, pDisplay,
      safety, protection
    };
  }, [calcMode, siInputs, currentUnit, voltageUnit, resistanceUnit, powerUnit]);

  // Live Current Animation Loop for SVG Circuit Simulator
  useEffect(() => {
    let lastTime = performance.now();
    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      if (isPlaying) {
        setCurrentTime(prev => (prev + delta * Math.min(10, Math.max(0.5, results.iSI * 2))) % 100);
      }
      animationRef.current = requestAnimationFrame(tick);
    };
    animationRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, results.iSI]);

  // Recharts Graph Data
  const chartData = useMemo(() => {
    const data = [];
    const step = Math.max(1, results.vSI / 10);
    for (let v = 1; v <= Math.max(20, results.vSI * 1.5); v += step) {
      const current = results.rSI > 0 ? v / results.rSI : 0;
      const power = v * current;
      data.push({
        Voltage: Number(v.toFixed(1)),
        Current: Number(current.toFixed(2)),
        Power: Number(power.toFixed(1))
      });
    }
    return data;
  }, [results]);

  const applyPreset = (preset: DevicePreset) => {
    setVoltageVal(preset.voltage);
    setVoltageUnit("V");
    setResistanceVal(preset.resistance);
    setResistanceUnit("Ω");
    setCalcMode("fromVR");
    triggerNotification("success", `Loaded ${preset.name} (${preset.typicalCurrent})!`);
  };

  const handleCopyResults = () => {
    const text = `Current Calculation (I = V / R = P / V = √(P / R))
-----------------------------------------
Calculated Current: ${results.iDisplay.toFixed(3)} ${currentUnit} (${results.iSI.toFixed(3)} Amperes)
Voltage: ${results.vDisplay.toFixed(3)} ${voltageUnit} (${results.vSI.toFixed(2)} Volts)
Resistance: ${results.rDisplay.toFixed(3)} ${resistanceUnit} (${results.rSI.toFixed(2)} Ohms)
Power Dissipation: ${results.pDisplay.toFixed(3)} ${powerUnit} (${results.pSI.toFixed(2)} Watts)
-----------------------------------------
Recommended Fuse: ${results.protection.recFuse}
Recommended Wire Gauge: ${results.protection.awg}
Safety Rating: ${results.safety.badge} - ${results.safety.desc}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Current calculation summary copied!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What current flows through a 240V circuit with a 12Ω resistor (I = V/R)?", correctAnswer: 20.0, units: "A" },
      { q: "A 1200W electric kettle operates at 120V. What is the current draw (I = P/V)?", correctAnswer: 10.0, units: "A" },
      { q: "A 50W heating resistor has a resistance of 200Ω. What is the current (I = √(P/R))?", correctAnswer: 0.5, units: "A" }
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
    setQuizIsCorrect(diff < 0.2);
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

      {/* 🔄 Physics Hub Top Pill Navigation */}
      <div className="bg-slate-100 dark:bg-slate-900/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex items-center justify-between overflow-x-auto gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 flex items-center gap-1.5 shrink-0">
          <Layers size={14} className="text-[#518231]" />
          Physics Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <Link href="/calculators/voltage-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Voltage
          </Link>
          <Link href="/calculators/ohms-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ohm's Law
          </Link>
          <Link href="/calculators/power-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Power
          </Link>
          <Link href="/calculators/density-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Density
          </Link>
          <Link href="/calculators/weight-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Weight
          </Link>
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Current
          </span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Cockpit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="text-[#518231]" />
                Current Cockpit
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

            {/* Mode Select Segmented Control */}
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-1 mb-6">
              {[
                { key: "fromVR", label: "I = V / R" },
                { key: "fromPV", label: "I = P / V" },
                { key: "fromPR", label: "I = √(P/R)" },
                { key: "analysis", label: "Analysis" }
              ].map(m => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setCalcMode(m.key as CalcMode)}
                  className={`py-2 px-1 text-center text-[11px] font-bold rounded-xl transition-all capitalize ${
                    calcMode === m.key 
                      ? "bg-white dark:bg-slate-800 text-[#518231] shadow-sm font-black" 
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* 🔌 Device Presets */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Device Current Explorer:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {DEVICE_PRESETS.slice(0, 8).map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="py-1.5 px-1 text-[11px] font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-center transition-all"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              {/* Current Output (Calculated Display) */}
              <ReadOnlyField label="Calculated Current (I)" val={`${results.iDisplay.toFixed(3)} ${currentUnit}`} icon={Activity} />

              {/* Voltage Input (V) */}
              {calcMode !== "fromPR" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Voltage (V)</span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={voltageVal}
                        onChange={(e) => setVoltageVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={voltageUnit}
                        onChange={(e) => setVoltageUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(VOLTAGE_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="240"
                    step="0.5"
                    value={voltageVal}
                    onChange={(e) => setVoltageVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              )}

              {/* Resistance Input (R) */}
              {calcMode !== "fromPV" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Resistance (R)</span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={resistanceVal}
                        onChange={(e) => setResistanceVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={resistanceUnit}
                        onChange={(e) => setResistanceUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(RESISTANCE_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    step="1"
                    value={resistanceVal}
                    onChange={(e) => setResistanceVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              )}

              {/* Power Input (P) */}
              {(calcMode === "fromPV" || calcMode === "fromPR") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Power (P)</span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={powerVal}
                        onChange={(e) => setPowerVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={powerUnit}
                        onChange={(e) => setPowerUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(POWER_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="2000"
                    step="10"
                    value={powerVal}
                    onChange={(e) => setPowerVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              )}

            </div>
          </div>

          {/* 🧯 Fuse & Wire Recommendation Engine */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#518231]" />
              Smart Fuse & Wire Size Recommender
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Recommended Fuse</span>
                <span className="text-sm font-black text-[#518231]">{results.protection.recFuse}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Recommended Wire</span>
                <span className="text-xs font-black text-amber-500">{results.protection.awg}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Digital Ammeter & Dual Current Flow Visualizer */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                📟 Digital Ammeter & Dual Current Flow Simulator
              </span>
              
              {/* Dual Flow Toggle */}
              <button
                type="button"
                onClick={() => setFlowDirection(flowDirection === "electron" ? "conventional" : "electron")}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-bold text-blue-400 border border-slate-700 transition-all"
              >
                <span>{flowDirection === "electron" ? "Electron (- → +)" : "Conventional (+ → -)"}</span>
              </button>
            </div>

            {/* Ammeter Display & Arc Needle */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative">
              
              {/* LCD Digital Readout */}
              <div className="bg-[#0b2436] border-2 border-[#174668] px-6 py-3 rounded-xl shadow-inner font-mono text-center mb-4">
                <span className="text-3xl font-black text-[#38bdf8] tracking-wider">
                  {results.iDisplay.toFixed(3)} <span className="text-lg text-[#0284c7]">{currentUnit}</span>
                </span>
                <span className="text-[10px] text-[#0284c7] block font-bold uppercase tracking-widest mt-1">
                  Digital Ammeter Series Probe
                </span>
              </div>

              {/* Arc Needle Gauge */}
              <div className="w-56 h-28 relative overflow-hidden flex justify-center">
                <svg viewBox="0 0 100 50" className="w-52 h-26">
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
                  
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke={results.safety.color}
                    strokeWidth="10"
                    strokeDasharray="126"
                    strokeDashoffset={126 - Math.min(126, Math.max(5, (Math.log10(Math.max(0.001, results.iSI)) + 3) / 6 * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, (Math.log10(Math.max(0.001, results.iSI)) + 3) / 6))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, (Math.log10(Math.max(0.001, results.iSI)) + 3) / 6))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center mt-2 text-xs font-bold" style={{ color: results.safety.color }}>
                <span>{results.safety.badge} - {results.safety.desc}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-[#518231] hover:bg-[#436a28] text-white p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? "Pause Flow" : "Simulate Flow"}</span>
              </button>

              <span className="text-xs font-semibold text-slate-400">
                Mode: <strong className="text-sky-400 capitalize">{flowDirection} Flow</strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleCopyResults}
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
                {(["circuit", "graphs", "explanation", "quiz"] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all capitalize ${
                      activeTab === tab
                        ? "bg-white dark:bg-slate-900 text-[#518231] shadow-sm"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {tab === "circuit" ? "Device Explorer" : tab === "graphs" ? "📊 Live Graph" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Device Explorer */}
                {activeTab === "circuit" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🔌 Device Current Reference Table</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                      {DEVICE_PRESETS.map((dp, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{dp.name}</span>
                            <span className="text-[10px] text-slate-400">{dp.desc}</span>
                          </div>
                          <span className="font-black text-[#518231]">{dp.typicalCurrent}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Live Graph */}
                {activeTab === "graphs" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      Current vs Voltage & Power Characteristic Curve
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Voltage" label={{ value: 'Voltage (V)', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="Current" stroke="#38bdf8" strokeWidth={2.5} dot={false} />
                            <Line type="monotone" dataKey="Power" stroke="#f59e0b" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 3: Step-by-Step */}
                {activeTab === "explanation" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-Step Current Solution</h4>
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Current Formula: I = V / R</div>
                      <div>2. Knowns: Voltage V = {results.vSI.toFixed(2)} V, Resistance R = {results.rSI.toFixed(2)} Ω</div>
                      <div>3. Calculation: I = {results.vSI.toFixed(2)} / {results.rSI.toFixed(2)}</div>
                      <div>4. Result: I = {results.iSI.toFixed(3)} Amperes ({results.iDisplay.toFixed(3)} {currentUnit})</div>
                      <div>5. Recommended Fuse Rating: {results.protection.recFuse}</div>
                      <div>6. Recommended Wire Gauge: {results.protection.awg}</div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Physics Quiz */}
                {activeTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Current Calculation Quiz</h4>
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
