"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, ShieldAlert, ShieldCheck, Plus, Trash2, Gauge
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CalcMode = "fromVI" | "fromPI" | "fromVP" | "series" | "parallel" | "wire";

// Unit conversion factors to Base SI (Ω, V, A, W, m, m²)
const RESISTANCE_CONVERSIONS: Record<string, number> = {
  "µΩ": 1e-6,
  "mΩ": 0.001,
  "Ω": 1,
  "kΩ": 1000,
  "MΩ": 1e6
};

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

const POWER_CONVERSIONS: Record<string, number> = {
  "mW": 0.001,
  "W": 1,
  "kW": 1000
};

const LENGTH_CONVERSIONS: Record<string, number> = {
  "mm": 0.001,
  "cm": 0.01,
  "m": 1,
  "km": 1000,
  "ft": 0.3048
};

const AREA_CONVERSIONS: Record<string, number> = {
  "mm²": 1e-6,
  "cm²": 1e-4,
  "m²": 1
};

// Wire Materials
interface WireMaterial {
  name: string;
  resistivity: number; // Ω·m at 20°C
  alpha: number; // temp coefficient per °C
}

const WIRE_MATERIALS: WireMaterial[] = [
  { name: "Copper", resistivity: 1.68e-8, alpha: 0.00386 },
  { name: "Aluminum", resistivity: 2.82e-8, alpha: 0.00429 },
  { name: "Silver", resistivity: 1.59e-8, alpha: 0.00380 },
  { name: "Gold", resistivity: 2.44e-8, alpha: 0.00340 },
  { name: "Iron", resistivity: 9.71e-8, alpha: 0.00650 },
  { name: "Nickel", resistivity: 6.99e-8, alpha: 0.00600 }
];

// Resistor Color Code Maps
const COLOR_CODES: Record<number, { name: string; hex: string }> = {
  0: { name: "Black", hex: "#18181b" },
  1: { name: "Brown", hex: "#78350f" },
  2: { name: "Red", hex: "#dc2626" },
  3: { name: "Orange", hex: "#ea580c" },
  4: { name: "Yellow", hex: "#eab308" },
  5: { name: "Green", hex: "#16a34a" },
  6: { name: "Blue", hex: "#2563eb" },
  7: { name: "Violet", hex: "#9333ea" },
  8: { name: "Grey", hex: "#4b5563" },
  9: { name: "White", hex: "#f8fafc" }
};

// Function to calculate Resistor Color Bands for 4-band resistor
function getResistorBands(ohmicVal: number) {
  if (ohmicVal <= 0 || !isFinite(ohmicVal)) {
    return { band1: COLOR_CODES[1], band2: COLOR_CODES[0], multiplier: COLOR_CODES[0], tol: "#eab308" };
  }

  // Convert to scientific notation
  const str = ohmicVal.toExponential(2);
  const sig = Math.round(parseFloat(str.split("e")[0]) * 10); // 2 digits
  const exp = parseInt(str.split("e")[1], 10) - 1;

  const d1 = Math.floor(sig / 10) % 10;
  const d2 = sig % 10;

  // Multiplier color
  let multColor = COLOR_CODES[0];
  if (exp >= 0 && exp <= 9) multColor = COLOR_CODES[exp] || COLOR_CODES[0];
  else if (exp === -1) multColor = { name: "Gold", hex: "#eab308" };
  else if (exp === -2) multColor = { name: "Silver", hex: "#94a3b8" };

  return {
    band1: COLOR_CODES[d1] || COLOR_CODES[1],
    band2: COLOR_CODES[d2] || COLOR_CODES[0],
    multiplier: multColor,
    tol: "#eab308" // Gold ±5% default
  };
}

export function ResistanceCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("fromVI");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Mode 1-3 Inputs
  const [resistanceVal, setResistanceVal] = useState<number>(6);
  const [resistanceUnit, setResistanceUnit] = useState<string>("Ω");

  const [voltageVal, setVoltageVal] = useState<number>(12);
  const [voltageUnit, setVoltageUnit] = useState<string>("V");

  const [currentVal, setCurrentVal] = useState<number>(2);
  const [currentUnit, setCurrentUnit] = useState<string>("A");

  const [powerVal, setPowerVal] = useState<number>(24);
  const [powerUnit, setPowerUnit] = useState<string>("W");

  // Mode 4-5 Network Builder Resistors List
  const [networkResistors, setNetworkResistors] = useState<number[]>([10, 20, 30]);

  // Mode 6 Wire Inputs
  const [selectedMaterial, setSelectedMaterial] = useState<WireMaterial>(WIRE_MATERIALS[0]);
  const [wireLength, setWireLength] = useState<number>(10); // m
  const [wireLengthUnit, setWireLengthUnit] = useState<string>("m");
  const [wireArea, setWireArea] = useState<number>(2.5); // mm²
  const [wireAreaUnit, setWireAreaUnit] = useState<string>("mm²");
  const [wireTemp, setWireTemp] = useState<number>(20); // °C

  // Tab Selection
  const [activeTab, setActiveTab] = useState<"colorcode" | "network" | "graphs" | "explanation" | "quiz">("colorcode");

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

  // Base SI Calculations
  const siInputs = useMemo(() => {
    const vSI = voltageVal * (VOLTAGE_CONVERSIONS[voltageUnit] || 1);
    const iSI = currentVal * (CURRENT_CONVERSIONS[currentUnit] || 1);
    const pSI = powerVal * (POWER_CONVERSIONS[powerUnit] || 1);
    const lSI = wireLength * (LENGTH_CONVERSIONS[wireLengthUnit] || 1);
    const aSI = wireArea * (AREA_CONVERSIONS[wireAreaUnit] || 1e-6);
    return { vSI, iSI, pSI, lSI, aSI };
  }, [voltageVal, voltageUnit, currentVal, currentUnit, powerVal, powerUnit, wireLength, wireLengthUnit, wireArea, wireAreaUnit]);

  // Main Calculation Logic
  const results = useMemo(() => {
    let rSI = 0;
    let vSI = siInputs.vSI;
    let iSI = siInputs.iSI;
    let pSI = siInputs.pSI;

    if (calcMode === "fromVI") {
      rSI = iSI > 0 ? vSI / iSI : 0;
      pSI = vSI * iSI;
    } else if (calcMode === "fromPI") {
      rSI = iSI > 0 ? pSI / (iSI * iSI) : 0;
      vSI = iSI * rSI;
    } else if (calcMode === "fromVP") {
      rSI = pSI > 0 ? (vSI * vSI) / pSI : 0;
      iSI = rSI > 0 ? vSI / rSI : 0;
    } else if (calcMode === "series") {
      rSI = networkResistors.reduce((acc, val) => acc + val, 0);
      iSI = rSI > 0 ? vSI / rSI : 0;
      pSI = vSI * iSI;
    } else if (calcMode === "parallel") {
      const invSum = networkResistors.reduce((acc, val) => acc + (val > 0 ? 1 / val : 0), 0);
      rSI = invSum > 0 ? 1 / invSum : 0;
      iSI = rSI > 0 ? vSI / rSI : 0;
      pSI = vSI * iSI;
    } else {
      // Wire Resistance
      const tempFactor = 1 + selectedMaterial.alpha * (wireTemp - 20);
      rSI = (selectedMaterial.resistivity * tempFactor * siInputs.lSI) / (siInputs.aSI > 0 ? siInputs.aSI : 1e-6);
      iSI = rSI > 0 ? vSI / rSI : 0;
      pSI = vSI * iSI;
    }

    // Convert display values
    const rDisplay = rSI / (RESISTANCE_CONVERSIONS[resistanceUnit] || 1);
    const vDisplay = vSI / (VOLTAGE_CONVERSIONS[voltageUnit] || 1);
    const iDisplay = iSI / (CURRENT_CONVERSIONS[currentUnit] || 1);
    const pDisplay = pSI / (POWER_CONVERSIONS[powerUnit] || 1);

    // Color bands for resistor
    const colorBands = getResistorBands(rSI);

    // Recommended Resistor Wattage Rating (with 2x safety factor)
    const reqWattage = pSI * 2;
    let recWattRating = "0.25 W (1/4W)";
    if (reqWattage > 25) recWattRating = "50 W Chassis Mount";
    else if (reqWattage > 10) recWattRating = "25 W Chassis Mount";
    else if (reqWattage > 5) recWattRating = "10 W Power Resistor";
    else if (reqWattage > 2) recWattRating = "5 W Ceramic";
    else if (reqWattage > 1) recWattRating = "2 W Metal Film";
    else if (reqWattage > 0.5) recWattRating = "1 W Metal Film";
    else if (reqWattage > 0.25) recWattRating = "0.5 W (1/2W)";

    return {
      rSI, vSI, iSI, pSI,
      rDisplay, vDisplay, iDisplay, pDisplay,
      colorBands, recWattRating
    };
  }, [calcMode, siInputs, networkResistors, selectedMaterial, wireTemp, resistanceUnit, voltageUnit, currentUnit, powerUnit]);

  // Recharts Chart Data
  const chartData = useMemo(() => {
    const data = [];
    const step = Math.max(0.1, results.iSI / 10);
    for (let i = 0.1; i <= Math.max(10, results.iSI * 2); i += step) {
      const v = i * results.rSI;
      const p = i * i * results.rSI;
      data.push({
        Current: Number(i.toFixed(2)),
        Voltage: Number(v.toFixed(1)),
        Power: Number(p.toFixed(1))
      });
    }
    return data;
  }, [results]);

  const handleAddResistor = () => {
    setNetworkResistors(prev => [...prev, 10]);
  };

  const handleRemoveResistor = (index: number) => {
    setNetworkResistors(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateNetworkResistor = (index: number, val: number) => {
    setNetworkResistors(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleCopyResults = () => {
    const text = `Resistance Calculation Summary (R = V / I = P / I² = V² / P)
-----------------------------------------
Calculated Resistance: ${results.rDisplay.toFixed(3)} ${resistanceUnit} (${results.rSI.toFixed(3)} Ohms)
Voltage Drop: ${results.vDisplay.toFixed(3)} ${voltageUnit} (${results.vSI.toFixed(2)} Volts)
Current: ${results.iDisplay.toFixed(3)} ${currentUnit} (${results.iSI.toFixed(3)} Amperes)
Power Loss: ${results.pDisplay.toFixed(3)} ${powerUnit} (${results.pSI.toFixed(2)} Watts)
Recommended Wattage Rating: ${results.recWattRating}
-----------------------------------------
Color Code Bands: [${results.colorBands.band1.name}, ${results.colorBands.band2.name}, ${results.colorBands.multiplier.name}, Gold]`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Resistance calculation summary copied!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the resistance of a circuit with 120V supply drawing 2A (R = V/I)?", correctAnswer: 60.0, units: "Ω" },
      { q: "A 100W resistor dissipates power at 5A current. What is its resistance (R = P/I²)?", correctAnswer: 4.0, units: "Ω" },
      { q: "What is the equivalent resistance of two 20Ω resistors connected in parallel?", correctAnswer: 10.0, units: "Ω" }
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
          <Link href="/calculators/current-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Current
          </Link>
          <Link href="/calculators/voltage-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Voltage
          </Link>
          <Link href="/calculators/ohms-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ohm's Law
          </Link>
          <Link href="/calculators/power-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Power
          </Link>
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Resistance
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
                <Gauge className="text-[#518231]" />
                Resistance Cockpit
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
                { key: "fromVI", label: "R = V / I" },
                { key: "fromPI", label: "R = P / I²" },
                { key: "fromVP", label: "R = V² / P" },
                { key: "series", label: "Series ∑R" },
                { key: "parallel", label: "Parallel ||R" },
                { key: "wire", label: "Wire Analysis" }
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

            {/* Dynamic Inputs per Mode */}
            <div className="space-y-5">
              
              {/* Resistance Output (Calculated Display) */}
              <ReadOnlyField label="Calculated Resistance (R)" val={`${results.rDisplay.toFixed(3)} ${resistanceUnit}`} icon={Gauge} />

              {/* Voltage Input */}
              {(calcMode === "fromVI" || calcMode === "fromVP" || calcMode === "series" || calcMode === "parallel" || calcMode === "wire") && (
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

              {/* Current Input */}
              {(calcMode === "fromVI" || calcMode === "fromPI") && (
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

              {/* Power Input */}
              {(calcMode === "fromPI" || calcMode === "fromVP") && (
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
                    max="1000"
                    step="5"
                    value={powerVal}
                    onChange={(e) => setPowerVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              )}

              {/* Series / Parallel Network Inputs */}
              {(calcMode === "series" || calcMode === "parallel") && (
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Resistors Network List</span>
                    <button
                      type="button"
                      onClick={handleAddResistor}
                      className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
                    >
                      <Plus size={13} />
                      Add Resistor
                    </button>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {networkResistors.map((r, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-400 w-8">R{idx + 1}:</span>
                        <input
                          type="number"
                          value={r}
                          onChange={(e) => handleUpdateNetworkResistor(idx, Number(e.target.value))}
                          className="flex-1 bg-transparent font-black text-sm text-slate-900 dark:text-white focus:outline-none"
                        />
                        <span className="text-xs font-semibold text-slate-500">Ω</span>
                        {networkResistors.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveResistor(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wire Analysis Inputs */}
              {calcMode === "wire" && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase">Conductor Material</span>
                    <select
                      value={selectedMaterial.name}
                      onChange={(e) => setSelectedMaterial(WIRE_MATERIALS.find(m => m.name === e.target.value) || WIRE_MATERIALS[0])}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs text-slate-900 dark:text-white focus:outline-none"
                    >
                      {WIRE_MATERIALS.map(m => (
                        <option key={m.name} value={m.name}>{m.name} (ρ = {m.resistivity.toExponential(2)} Ω·m)</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Length</span>
                      <input
                        type="number"
                        value={wireLength}
                        onChange={(e) => setWireLength(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Area (mm²)</span>
                      <input
                        type="number"
                        step="0.1"
                        value={wireArea}
                        onChange={(e) => setWireArea(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* 🔥 Resistor Power Dissipation Rating Engine */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <Flame size={16} className="text-amber-500" />
              Power Loss & Resistor Wattage Rating
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Heat Dissipation</span>
                <span className="text-sm font-black text-amber-500">{results.pDisplay.toFixed(2)} W</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Recommended Rating</span>
                <span className="text-xs font-black text-[#518231]">{results.recWattRating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live 4-Band Resistor Color Code & Ohmmeter Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🎨 Resistor Color Code & Digital Ohmmeter
              </span>
            </div>

            {/* Live 4-Band Resistor Image */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              {/* SVG Resistor Body */}
              <div className="w-full max-w-sm h-24 relative flex items-center justify-center">
                <svg viewBox="0 0 300 80" className="w-full h-full">
                  {/* Lead Wires */}
                  <line x1="10" y1="40" x2="60" y2="40" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                  <line x1="240" y1="40" x2="290" y2="40" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />

                  {/* Ceramic Body */}
                  <path d="M 60 20 L 75 10 L 225 10 L 240 20 L 240 60 L 225 70 L 75 70 L 60 60 Z" fill="#d97706" stroke="#b45309" strokeWidth="2" />

                  {/* Band 1 */}
                  <rect x="90" y="10" width="14" height="60" fill={results.colorBands.band1.hex} rx="2" />
                  {/* Band 2 */}
                  <rect x="120" y="10" width="14" height="60" fill={results.colorBands.band2.hex} rx="2" />
                  {/* Band 3 Multiplier */}
                  <rect x="150" y="10" width="14" height="60" fill={results.colorBands.multiplier.hex} rx="2" />
                  {/* Band 4 Tolerance */}
                  <rect x="200" y="10" width="14" height="60" fill={results.colorBands.tol} rx="2" />
                </svg>
              </div>

              {/* Color Code Legend */}
              <div className="flex gap-3 text-[11px] font-bold mt-2">
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: results.colorBands.band1.hex }} />
                  {results.colorBands.band1.name}
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: results.colorBands.band2.hex }} />
                  {results.colorBands.band2.name}
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: results.colorBands.multiplier.hex }} />
                  {results.colorBands.multiplier.name}
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full inline-block bg-amber-400" />
                  Gold (±5%)
                </span>
              </div>
            </div>

            {/* LCD Digital Ohmmeter Display */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="bg-[#1e1b4b] border-2 border-[#3730a3] px-5 py-2.5 rounded-xl font-mono">
                <span className="text-2xl font-black text-[#a78bfa] tracking-wider">
                  {results.rDisplay.toFixed(2)} <span className="text-sm text-[#8b5cf6]">{resistanceUnit}</span>
                </span>
                <span className="text-[9px] text-[#8b5cf6] block font-bold uppercase tracking-widest mt-0.5">
                  Ohmmeter Probe Reading
                </span>
              </div>

              <span className="text-xs font-semibold text-slate-400">
                Heat Loss: <strong className="text-amber-400">{results.pDisplay.toFixed(1)} W</strong>
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
                {(["colorcode", "network", "graphs", "explanation", "quiz"] as const).map(tab => (
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
                    {tab === "colorcode" ? "Color Bands" : tab === "network" ? "Network Summary" : tab === "graphs" ? "📊 Live Graph" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Color Bands */}
                {activeTab === "colorcode" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🎨 4-Band Resistor Color Code Explanation</h4>
                    <p className="leading-relaxed">
                      Resistor color bands read from left to right. The first 2 bands specify digits, the 3rd band specifies the power-of-10 multiplier, and the 4th band specifies tolerance margin.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200 space-y-1">
                      <div>1st Digit: {results.colorBands.band1.name}</div>
                      <div>2nd Digit: {results.colorBands.band2.name}</div>
                      <div>Multiplier: × {results.colorBands.multiplier.name}</div>
                      <div>Tolerance: ± 5% (Gold)</div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Network Summary */}
                {activeTab === "network" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🔗 Series vs Parallel Network Comparison</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                        <span className="font-bold text-slate-900 dark:text-white block mb-1">Series Network (∑R)</span>
                        <span>R_eq = R1 + R2 + ... + Rn</span>
                        <span className="block mt-2 font-black text-[#518231]">
                          R_series = {networkResistors.reduce((acc, v) => acc + v, 0)} Ω
                        </span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                        <span className="font-bold text-slate-900 dark:text-white block mb-1">Parallel Network (||R)</span>
                        <span>1/R_eq = 1/R1 + 1/R2 + ...</span>
                        <span className="block mt-2 font-black text-amber-500">
                          R_parallel = {(1 / networkResistors.reduce((acc, v) => acc + (v > 0 ? 1 / v : 0), 0)).toFixed(2)} Ω
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Live Graph */}
                {activeTab === "graphs" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      Resistance Power & Voltage Characteristic Curve
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Current" label={{ value: 'Current (A)', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="Voltage" stroke="#a78bfa" strokeWidth={2.5} dot={false} />
                            <Line type="monotone" dataKey="Power" stroke="#f59e0b" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 4: Step-by-Step */}
                {activeTab === "explanation" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-Step Resistance Solution</h4>
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Resistance Formula: R = V / I</div>
                      <div>2. Knowns: Voltage V = {results.vSI.toFixed(2)} V, Current I = {results.iSI.toFixed(3)} A</div>
                      <div>3. Calculation: R = {results.vSI.toFixed(2)} / {results.iSI.toFixed(3)}</div>
                      <div>4. Result: R = {results.rSI.toFixed(2)} Ohms ({results.rDisplay.toFixed(3)} {resistanceUnit})</div>
                      <div>5. Recommended Wattage Rating: {results.recWattRating}</div>
                    </div>
                  </div>
                )}

                {/* Tab 5: Physics Quiz */}
                {activeTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Resistance Calculation Quiz</h4>
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
