"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Battery
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

type CalcMode = "voltage" | "current" | "resistance" | "power" | "analysis";

// Conversion factors to Base SI (V, A, Ω, W)
const VOLTAGE_CONVERSIONS: Record<string, number> = {
  "µV": 1e-6,
  "mV": 0.001,
  "V": 1,
  "kV": 1000
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

// Battery / Circuit Presets
interface CircuitPreset {
  name: string;
  voltage: number; // V
  resistance: number; // Ω
  desc: string;
}

const CIRCUIT_PRESETS: CircuitPreset[] = [
  { name: "AA Battery", voltage: 1.5, resistance: 10, desc: "1.5V (Small electronics)" },
  { name: "9V Battery", voltage: 9.0, resistance: 100, desc: "9.0V (Smoke detectors, pedals)" },
  { name: "USB 5V Port", voltage: 5.0, resistance: 50, desc: "5.0V (Phone charging / MCU)" },
  { name: "12V Car Battery", voltage: 12.0, resistance: 2.4, desc: "12.0V (Automotive electricals)" },
  { name: "19V Laptop Power", voltage: 19.0, resistance: 5, desc: "19.0V (Laptop adapter)" },
  { name: "US Outlet 120V", voltage: 120.0, resistance: 10, desc: "120V AC Household grid" },
  { name: "EU Outlet 230V", voltage: 230.0, resistance: 20, desc: "230V AC Household grid" },
  { name: "Arduino 5V / 220Ω LED", voltage: 5.0, resistance: 220, desc: "5V micro controller LED" }
];

// Resistor Color Code Helper
const COLOR_CODES: { name: string; hex: string }[] = [
  { name: "Black", hex: "#000000" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Red", hex: "#FF0000" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Green", hex: "#008000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Violet", hex: "#EE82EE" },
  { name: "Grey", hex: "#808080" },
  { name: "White", hex: "#FFFFFF" }
];

function getResistorColorBands(resistanceOhm: number) {
  if (resistanceOhm <= 0 || isNaN(resistanceOhm) || !isFinite(resistanceOhm)) {
    return [COLOR_CODES[0], COLOR_CODES[0], COLOR_CODES[0]];
  }

  // Convert to scientific notation
  const str = resistanceOhm.toExponential(2); // e.g. "2.20e+2"
  const parts = str.split("e");
  const mantissa = Math.round(parseFloat(parts[0]) * 10); // 22
  const exponent = parseInt(parts[1], 10) - 1; // 2 - 1 = 1

  const d1 = Math.floor(mantissa / 10) % 10;
  const d2 = mantissa % 10;
  const mult = Math.max(0, Math.min(9, exponent));

  return [
    COLOR_CODES[d1] || COLOR_CODES[0],
    COLOR_CODES[d2] || COLOR_CODES[0],
    COLOR_CODES[mult] || COLOR_CODES[0]
  ];
}

export function OhmsLawCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("analysis");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input states (in display units)
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

  // Perform Ohm's Law & Power Calculations (V = IR, P = VI = I²R = V²/R)
  const results = useMemo(() => {
    let vSI = siInputs.vSI;
    let iSI = siInputs.iSI;
    let rSI = siInputs.rSI;
    let pSI = siInputs.pSI;

    if (calcMode === "voltage") {
      vSI = iSI * rSI;
      pSI = vSI * iSI;
    } else if (calcMode === "current") {
      iSI = rSI > 0 ? vSI / rSI : 0;
      pSI = vSI * iSI;
    } else if (calcMode === "resistance") {
      rSI = iSI > 0 ? vSI / iSI : 0;
      pSI = vSI * iSI;
    } else if (calcMode === "power") {
      pSI = vSI * iSI;
      rSI = iSI > 0 ? vSI / iSI : 0;
    } else {
      // Analysis Mode: default V = IR, P = VI
      iSI = rSI > 0 ? vSI / rSI : 0;
      pSI = vSI * iSI;
    }

    // Convert back to display units
    const vDisplay = vSI / (VOLTAGE_CONVERSIONS[voltageUnit] || 1);
    const iDisplay = iSI / (CURRENT_CONVERSIONS[currentUnit] || 1);
    const rDisplay = rSI / (RESISTANCE_CONVERSIONS[resistanceUnit] || 1);
    const pDisplay = pSI / (POWER_CONVERSIONS[powerUnit] || 1);

    // Heat Glow Color (Power Dissipation)
    let heatColor = "#10b981"; // cool green
    let heatLabel = "Cool (< 0.25 W)";
    if (pSI >= 5.0) {
      heatColor = "#ef4444"; // burning red
      heatLabel = "Hot Heat Dissipation (> 5 W)";
    } else if (pSI >= 1.0) {
      heatColor = "#f59e0b"; // warm yellow/orange
      heatLabel = "Warm Heat (1 W - 5 W)";
    } else if (pSI >= 0.25) {
      heatColor = "#eab308";
      heatLabel = "Moderate (0.25 W - 1 W)";
    }

    // Resistor Color Bands
    const colorBands = getResistorColorBands(rSI);

    return {
      vSI, iSI, rSI, pSI,
      vDisplay, iDisplay, rDisplay, pDisplay,
      heatColor, heatLabel, colorBands
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

  const applyPreset = (preset: CircuitPreset) => {
    setVoltageVal(preset.voltage);
    setVoltageUnit("V");
    setResistanceVal(preset.resistance);
    setResistanceUnit("Ω");
    setCalcMode("analysis");
    triggerNotification("success", `Loaded ${preset.name} (${preset.voltage}V, ${preset.resistance}Ω)!`);
  };

  const handleCopyResults = () => {
    const text = `Ohm's Law Calculation (V = I · R, P = V · I)
-----------------------------------------
Voltage (V): ${results.vDisplay.toFixed(3)} ${voltageUnit} (${results.vSI.toFixed(2)} Volts)
Current (I): ${results.iDisplay.toFixed(3)} ${currentUnit} (${results.iSI.toFixed(3)} Amperes)
Resistance (R): ${results.rDisplay.toFixed(3)} ${resistanceUnit} (${results.rSI.toFixed(2)} Ohms)
Power (P): ${results.pDisplay.toFixed(3)} ${powerUnit} (${results.pSI.toFixed(2)} Watts)
-----------------------------------------
Heat Dissipation: ${results.heatLabel}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Circuit calculations copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "A 12V car battery is connected to a 4Ω resistor. What is the current (I) in Amperes?", correctAnswer: 3.0, units: "A" },
      { q: "An LED circuit draws 0.02A (20mA) at 5V. What is the resistance (R) in Ohms?", correctAnswer: 250.0, units: "Ω" },
      { q: "A heating element has 10Ω resistance and draws 10A current. What is the power (P) in Watts?", correctAnswer: 1000.0, units: "W" }
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
            Ohm's Law (V = IR)
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
                Ohm's Law Cockpit
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
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-3 gap-1 mb-6">
              {[
                { key: "analysis", label: "Circuit Analysis" },
                { key: "voltage", label: "Voltage (V)" },
                { key: "current", label: "Current (I)" },
                { key: "resistance", label: "Resistance (R)" },
                { key: "power", label: "Power (P)" }
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

            {/* 🔋 Circuit & Battery Presets */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Real-World Circuit Presets:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {CIRCUIT_PRESETS.map(p => (
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
              
              {/* Voltage Input (V) */}
              {calcMode !== "voltage" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Voltage (V - Electric Potential)</span>
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
              ) : (
                <ReadOnlyField label="Voltage (V - Calculated)" val={`${results.vDisplay.toFixed(3)} ${voltageUnit}`} icon={Zap} />
              )}

              {/* Current Input (I) */}
              {calcMode !== "current" && calcMode !== "analysis" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Current (I - Electron Flow)</span>
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
                </div>
              ) : (
                <ReadOnlyField label="Current (I - Calculated)" val={`${results.iDisplay.toFixed(3)} ${currentUnit}`} icon={Activity} />
              )}

              {/* Resistance Input (R) */}
              {calcMode !== "resistance" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Resistance (R - Opposing Force)</span>
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
                    max="1000"
                    step="5"
                    value={resistanceVal}
                    onChange={(e) => setResistanceVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Resistance (R - Calculated)" val={`${results.rDisplay.toFixed(3)} ${resistanceUnit}`} icon={Cpu} />
              )}

              {/* Power Output (P) */}
              <ReadOnlyField label="Power Dissipation (P = V·I)" val={`${results.pDisplay.toFixed(3)} ${powerUnit}`} icon={Flame} />

            </div>
          </div>

          {/* Resistor Color Code Band Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <Cpu size={16} className="text-[#518231]" />
              Resistor 4-Band Color Code Preview
            </h3>
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Bands:</span>
                <div className="flex items-center gap-1">
                  {results.colorBands.map((band, idx) => (
                    <div key={idx} className="w-5 h-8 rounded-sm shadow-sm border border-slate-400/40" style={{ backgroundColor: band.hex }} title={band.name}></div>
                  ))}
                  <div className="w-5 h-8 rounded-sm bg-amber-400 shadow-sm border border-slate-400/40" title="Gold (5% Tolerance)"></div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-slate-900 dark:text-white">{results.rDisplay.toFixed(1)} {resistanceUnit}</span>
                <span className="text-[10px] text-slate-400 block font-bold">±5% Tolerance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Falstad/PhET Style Circuit Simulator */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit: Animated Circuit Simulator */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                ⚡ Falstad / PhET Animated DC Circuit Simulator
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <Flame size={13} style={{ color: results.heatColor }} />
                <span style={{ color: results.heatColor }}>{results.heatLabel}</span>
              </div>
            </div>

            {/* SVG Interactive Circuit Simulator */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 relative h-64 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 500 250" className="w-full h-full">
                
                {/* Circuit Wires Outer Loop */}
                <rect x="50" y="40" width="400" height="170" rx="16" fill="none" stroke="#334155" strokeWidth="4" />

                {/* Animated Electron Current Flow Particles */}
                {isPlaying && Array.from({ length: 12 }).map((_, idx) => {
                  const progress = (currentTime * 2 + idx * 8.33) % 100;
                  let px = 50, py = 40;
                  if (progress < 35) {
                    px = 50 + (progress / 35) * 400;
                    py = 40;
                  } else if (progress < 50) {
                    px = 450;
                    py = 40 + ((progress - 35) / 15) * 170;
                  } else if (progress < 85) {
                    px = 450 - ((progress - 50) / 35) * 400;
                    py = 210;
                  } else {
                    px = 50;
                    py = 210 - ((progress - 85) / 15) * 170;
                  }

                  return (
                    <circle key={idx} cx={px} cy={py} r="4" fill="#60a5fa" className="shadow-lg animate-pulse" />
                  );
                })}

                {/* DC Battery Component (Left Branch) */}
                <g transform="translate(50, 125)">
                  <circle cx="0" cy="0" r="22" fill="#1e293b" stroke="#518231" strokeWidth="3" />
                  <text x="0" y="-4" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">+</text>
                  <text x="0" y="10" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">-</text>
                  <text x="-30" y="4" textAnchor="end" fill="#ffffff" fontSize="11" fontWeight="bold">{results.vDisplay.toFixed(1)} {voltageUnit}</text>
                </g>

                {/* Resistor Component (Top Branch) with Heat Dissipation Glow */}
                <g transform="translate(250, 40)">
                  <rect x="-40" y="-12" width="80" height="24" rx="6" fill="#1e293b" stroke={results.heatColor} strokeWidth="3" className="transition-colors duration-500" />
                  {/* Resistor Color Code Bands */}
                  <rect x="-25" y="-12" width="6" height="24" fill={results.colorBands[0].hex} />
                  <rect x="-12" y="-12" width="6" height="24" fill={results.colorBands[1].hex} />
                  <rect x="0" y="-12" width="6" height="24" fill={results.colorBands[2].hex} />
                  <rect x="15" y="-12" width="6" height="24" fill="#fbbf24" />
                  <text x="0" y="-20" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">R = {results.rDisplay.toFixed(1)} {resistanceUnit}</text>
                </g>

                {/* Ammeter Component (Right Branch) */}
                <g transform="translate(450, 125)">
                  <circle cx="0" cy="0" r="18" fill="#0f172a" stroke="#3b82f6" strokeWidth="3" />
                  <text x="0" y="4" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">A</text>
                  <text x="26" y="4" textAnchor="start" fill="#60a5fa" fontSize="11" fontWeight="bold">{results.iDisplay.toFixed(2)} {currentUnit}</text>
                </g>

                {/* Power Meter Label (Bottom Branch) */}
                <g transform="translate(250, 210)">
                  <rect x="-50" y="-12" width="100" height="24" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                  <text x="0" y="4" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Power: {results.pDisplay.toFixed(2)} {powerUnit}</text>
                </g>
              </svg>
            </div>

            {/* Animation Controls */}
            <div className="mt-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-[#518231] hover:bg-[#436a28] text-white p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? "Pause Flow" : "Play Flow"}</span>
              </button>

              <span className="text-xs font-semibold text-slate-400">
                Electron Speed: <strong className="text-white">{(results.iSI * 2).toFixed(1)}x</strong>
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
                    {tab === "circuit" ? "Circuit Specs" : tab === "graphs" ? "📊 Live Graph" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Circuit Specs */}
                {activeTab === "circuit" && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Electrical Circuit Diagnostics</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Voltage (V)</span>
                        <span className="text-sm font-black text-green-500">{results.vDisplay.toFixed(2)} {voltageUnit}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Current (I)</span>
                        <span className="text-sm font-black text-blue-500">{results.iDisplay.toFixed(3)} {currentUnit}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Resistance (R)</span>
                        <span className="text-sm font-black text-amber-500">{results.rDisplay.toFixed(1)} {resistanceUnit}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Power (P)</span>
                        <span className="text-sm font-black text-purple-500">{results.pDisplay.toFixed(2)} {powerUnit}</span>
                      </div>
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
                            <XAxis dataKey="Voltage" label={{ value: 'Voltage (V)', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="Current" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-Step Circuit Solution</h4>
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Formula: V = I · R  and  P = V · I</div>
                      <div>2. Knowns: Voltage V = {results.vSI.toFixed(2)} V, Resistance R = {results.rSI.toFixed(2)} Ω</div>
                      <div>3. Current Calculation: I = V / R = {results.vSI.toFixed(2)} / {results.rSI.toFixed(2)} = {results.iSI.toFixed(3)} Amperes</div>
                      <div>4. Power Dissipation: P = V · I = {results.vSI.toFixed(2)} · {results.iSI.toFixed(3)} = {results.pSI.toFixed(2)} Watts</div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Physics Quiz */}
                {activeTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Circuit Calculation Quiz</h4>
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
