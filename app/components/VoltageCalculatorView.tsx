"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Battery, ShieldAlert
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

type CalcMode = "fromIR" | "fromPI" | "fromPR" | "analysis";

// Unit conversion factors to Base SI (V, A, Ω, W)
const VOLTAGE_CONVERSIONS: Record<string, number> = {
  "µV": 1e-6,
  "mV": 0.001,
  "V": 1,
  "kV": 1000,
  "MV": 1e6
};

const CURRENT_CONVERSIONS: Record<string, number> = {
  "µA": 1e-6,
  "mA": 0.001,
  "A": 1,
  "kA": 1000
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

// Battery / System Presets
interface BatteryPreset {
  name: string;
  voltage: number; // V
  resistance: number; // Ω
  category: string;
  desc: string;
}

const BATTERY_PRESETS: BatteryPreset[] = [
  { name: "AA Battery", voltage: 1.5, resistance: 10, category: "SELV", desc: "1.5V Alkaline Cell" },
  { name: "AAA Battery", voltage: 1.5, resistance: 15, category: "SELV", desc: "1.5V Small Penlight" },
  { name: "CR2032 Coin", voltage: 3.0, resistance: 100, category: "SELV", desc: "3.0V Lithium Button Cell" },
  { name: "9V Battery", voltage: 9.0, resistance: 100, category: "SELV", desc: "9.0V Transistor Radio" },
  { name: "USB 5V Port", voltage: 5.0, resistance: 50, category: "SELV", desc: "5.0V Standard USB" },
  { name: "USB-C PD", voltage: 20.0, resistance: 4, category: "LV", desc: "20V USB-C Fast Charger" },
  { name: "12V Car Battery", voltage: 12.0, resistance: 2.4, category: "LV", desc: "12V Lead-Acid Starter" },
  { name: "24V Truck Battery", voltage: 24.0, resistance: 4.8, category: "LV", desc: "24V Commercial Heavy Duty" },
  { name: "Laptop Charger", voltage: 19.0, resistance: 5.0, category: "LV", desc: "19V AC/DC Laptop Adapter" },
  { name: "Solar Panel Array", voltage: 24.0, resistance: 12.0, category: "LV", desc: "24V PV Solar System" },
  { name: "US 120V Outlet", voltage: 120.0, resistance: 10.0, category: "HV", desc: "120V AC Household Grid" },
  { name: "EU 230V Outlet", voltage: 230.0, resistance: 20.0, category: "HV", desc: "230V AC Household Grid" },
  { name: "Industrial 480V", voltage: 480.0, resistance: 50.0, category: "Extreme", desc: "480V 3-Phase Industrial" }
];

// Safety Tiers
const SAFETY_TIERS = [
  { name: "Safe Extra Low Voltage (SELV)", max: 12, color: "#10b981", badge: "🟢 SELV Safe", desc: "Touch safe for human contact (< 12V)" },
  { name: "Low Voltage (LV)", max: 50, color: "#eab308", badge: "🟡 Low Voltage", desc: "Low hazard under dry conditions (12V - 50V)" },
  { name: "Standard Mains Voltage", max: 120, color: "#f59e0b", badge: "🟠 Mains Voltage", desc: "Requires insulation; shock hazard (50V - 120V)" },
  { name: "High Voltage (HV)", max: 600, color: "#ef4444", badge: "🔴 High Voltage", desc: "Lethal shock hazard; PPE required (120V - 600V)" },
  { name: "Dangerous Extreme Voltage", max: Infinity, color: "#8b5cf6", badge: "⚫ Extreme Voltage", desc: "Arc flash & high voltage hazard (> 600V)" }
];

export function VoltageCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("fromIR");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Inputs
  const [voltageVal, setVoltageVal] = useState<number>(12);
  const [voltageUnit, setVoltageUnit] = useState<string>("V");

  const [currentVal, setCurrentVal] = useState<number>(2);
  const [currentUnit, setCurrentUnit] = useState<string>("A");

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

  // Convert inputs to Base SI (V, A, Ω, W)
  const siInputs = useMemo(() => {
    const vSI = voltageVal * (VOLTAGE_CONVERSIONS[voltageUnit] || 1);
    const iSI = currentVal * (CURRENT_CONVERSIONS[currentUnit] || 1);
    const rSI = resistanceVal * (RESISTANCE_CONVERSIONS[resistanceUnit] || 1);
    const pSI = powerVal * (POWER_CONVERSIONS[powerUnit] || 1);
    return { vSI, iSI, rSI, pSI };
  }, [voltageVal, voltageUnit, currentVal, currentUnit, resistanceVal, resistanceUnit, powerVal, powerUnit]);

  // Voltage Calculations across 4 Modes
  const results = useMemo(() => {
    let vSI = 0;
    let iSI = siInputs.iSI;
    let rSI = siInputs.rSI;
    let pSI = siInputs.pSI;

    if (calcMode === "fromIR") {
      vSI = iSI * rSI;
      pSI = vSI * iSI;
    } else if (calcMode === "fromPI") {
      vSI = iSI > 0 ? pSI / iSI : 0;
      rSI = iSI > 0 ? vSI / iSI : 0;
    } else if (calcMode === "fromPR") {
      vSI = Math.sqrt(Math.max(0, pSI * rSI));
      iSI = rSI > 0 ? vSI / rSI : 0;
    } else {
      // Analysis Mode
      vSI = iSI * rSI;
      pSI = vSI * iSI;
    }

    // Convert back to display units
    const vDisplay = vSI / (VOLTAGE_CONVERSIONS[voltageUnit] || 1);
    const iDisplay = iSI / (CURRENT_CONVERSIONS[currentUnit] || 1);
    const rDisplay = rSI / (RESISTANCE_CONVERSIONS[resistanceUnit] || 1);
    const pDisplay = pSI / (POWER_CONVERSIONS[powerUnit] || 1);

    // Safety Tier
    let safety = SAFETY_TIERS[0];
    if (vSI <= 12) safety = SAFETY_TIERS[0];
    else if (vSI <= 50) safety = SAFETY_TIERS[1];
    else if (vSI <= 120) safety = SAFETY_TIERS[2];
    else if (vSI <= 600) safety = SAFETY_TIERS[3];
    else safety = SAFETY_TIERS[4];

    return {
      vSI, iSI, rSI, pSI,
      vDisplay, iDisplay, rDisplay, pDisplay,
      safety
    };
  }, [calcMode, siInputs, voltageUnit, currentUnit, resistanceUnit, powerUnit]);

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
    const step = Math.max(0.1, results.iSI / 10);
    for (let i = 0.1; i <= Math.max(10, results.iSI * 2); i += step) {
      const v = i * results.rSI;
      const p = v * i;
      data.push({
        Current: Number(i.toFixed(2)),
        Voltage: Number(v.toFixed(1)),
        Power: Number(p.toFixed(1))
      });
    }
    return data;
  }, [results]);

  const applyPreset = (preset: BatteryPreset) => {
    setVoltageVal(preset.voltage);
    setVoltageUnit("V");
    setResistanceVal(preset.resistance);
    setResistanceUnit("Ω");
    setCalcMode("fromIR");
    triggerNotification("success", `Loaded ${preset.name} (${preset.voltage}V)!`);
  };

  const handleCopyResults = () => {
    const text = `Voltage Calculation (V = I · R = P / I = √(P · R))
-----------------------------------------
Calculated Voltage: ${results.vDisplay.toFixed(3)} ${voltageUnit} (${results.vSI.toFixed(2)} Volts)
Current: ${results.iDisplay.toFixed(3)} ${currentUnit} (${results.iSI.toFixed(3)} Amperes)
Resistance: ${results.rDisplay.toFixed(3)} ${resistanceUnit} (${results.rSI.toFixed(2)} Ohms)
Power Dissipation: ${results.pDisplay.toFixed(3)} ${powerUnit} (${results.pSI.toFixed(2)} Watts)
-----------------------------------------
Safety Rating: ${results.safety.badge} - ${results.safety.desc}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Voltage calculation summary copied!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the voltage across a 5Ω resistor carrying a 3A current (V = I·R)?", correctAnswer: 15.0, units: "V" },
      { q: "A 100W light bulb draws 0.833A of current. What is the line voltage (V = P/I)?", correctAnswer: 120.0, units: "V" },
      { q: "A 50W heating resistor has a resistance of 18Ω. What is the operating voltage (V = √(P·R))?", correctAnswer: 30.0, units: "V" }
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
            Voltage
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
                <Zap className="text-[#518231]" />
                Voltage Cockpit
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
                { key: "fromIR", label: "V = I · R" },
                { key: "fromPI", label: "V = P / I" },
                { key: "fromPR", label: "V = √(P·R)" },
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

            {/* 🔋 Battery Presets */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">13 Battery & System Presets:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {BATTERY_PRESETS.slice(0, 8).map(p => (
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

            {/* Dynamic Input Fields */}
            <div className="space-y-5">
              
              {/* Voltage Output (Calculated Display) */}
              <ReadOnlyField label="Calculated Voltage (V)" val={`${results.vDisplay.toFixed(3)} ${voltageUnit}`} icon={Zap} />

              {/* Current Input (I) */}
              {calcMode !== "fromPR" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Current (I)</span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.01"
                        value={currentVal}
                        onChange={(e) => setCurrentVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={currentUnit}
                        onChange={(e) => setCurrentUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(CURRENT_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="50"
                    step="0.1"
                    value={currentVal}
                    onChange={(e) => setCurrentVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              )}

              {/* Resistance Input (R) */}
              {calcMode !== "fromPI" && (
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
              {(calcMode === "fromPI" || calcMode === "fromPR") && (
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

          {/* Smart Conversion Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Zap size={16} className="text-[#518231]" />
              Smart Voltage Conversion Table
            </h3>
            <div className="space-y-2">
              {Object.keys(VOLTAGE_CONVERSIONS).map(uKey => {
                const convVal = results.vSI / VOLTAGE_CONVERSIONS[uKey];
                return (
                  <div key={uKey} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 font-semibold">{uKey}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{convVal.toFixed(3)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Animated Voltmeter & Safety Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit: Animated Multimeter Voltmeter */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                📟 Digital Multimeter & Voltage Safety Gauge
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ color: results.safety.color }}>
                <span>{results.safety.badge}</span>
              </div>
            </div>

            {/* LCD Digital Voltmeter & Arc Needle Visualizer */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative">
              
              {/* LCD Display Readout */}
              <div className="bg-[#0f2818] border-2 border-[#1c4d2d] px-6 py-3 rounded-xl shadow-inner font-mono text-center mb-4">
                <span className="text-3xl font-black text-[#34d399] tracking-wider">
                  {results.vDisplay.toFixed(2)} <span className="text-lg text-[#10b981]">{voltageUnit}</span>
                </span>
                <span className="text-[10px] text-[#059669] block font-bold uppercase tracking-widest mt-1">
                  DC Voltmeter Probe Reading
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
                    strokeDashoffset={126 - Math.min(126, Math.max(5, (Math.log10(Math.max(1, results.vSI)) / 4) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.vSI)) / 4))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.vSI)) / 4))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center mt-2 text-xs text-slate-400">
                <span>{results.safety.desc}</span>
              </div>
            </div>

            {/* Animation Controls */}
            <div className="mt-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-[#518231] hover:bg-[#436a28] text-white p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? "Pause Probe" : "Measure Flow"}</span>
              </button>

              <span className="text-xs font-semibold text-slate-400">
                Power Dissipation: <strong className="text-amber-400">{results.pDisplay.toFixed(1)} {powerUnit}</strong>
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
                    {tab === "circuit" ? "Battery Explorer" : tab === "graphs" ? "📊 Live Graph" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Battery Explorer */}
                {activeTab === "circuit" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🔋 13 Battery & System Reference Table</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                      {BATTERY_PRESETS.map((bp, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{bp.name}</span>
                            <span className="text-[10px] text-slate-400">{bp.desc}</span>
                          </div>
                          <span className="font-black text-[#518231]">{bp.voltage} V</span>
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
                      Voltage vs Current & Power Characteristic Curve
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Current" label={{ value: 'Current (A)', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="Voltage" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-Step Voltage Solution</h4>
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Voltage Formula: V = I · R</div>
                      <div>2. Knowns: Current I = {results.iSI.toFixed(3)} A, Resistance R = {results.rSI.toFixed(2)} Ω</div>
                      <div>3. Calculation: V = {results.iSI.toFixed(3)} · {results.rSI.toFixed(2)}</div>
                      <div>4. Result: V = {results.vSI.toFixed(2)} Volts ({results.vDisplay.toFixed(3)} {voltageUnit})</div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Physics Quiz */}
                {activeTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Voltage Calculation Quiz</h4>
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
