"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Gauge
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CategoryTab = "dc" | "ac1" | "ac3" | "cost" | "solar";
type DcSubMode = "VI" | "VR" | "IR";

// Unit conversions to Base SI (W, VA, VAR, V, A, Ω, Joules, Seconds)
const POWER_CONVERSIONS: Record<string, number> = {
  "mW": 0.001,
  "W": 1,
  "kW": 1000,
  "MW": 1e6,
  "GW": 1e9
};

const APPARENT_CONVERSIONS: Record<string, number> = {
  "VA": 1,
  "kVA": 1000,
  "MVA": 1e6
};

const REACTIVE_CONVERSIONS: Record<string, number> = {
  "VAR": 1,
  "kVAR": 1000,
  "MVAR": 1e6
};

const VOLTAGE_CONVERSIONS: Record<string, number> = {
  "mV": 0.001,
  "V": 1,
  "kV": 1000
};

const CURRENT_CONVERSIONS: Record<string, number> = {
  "mA": 0.001,
  "A": 1,
  "kA": 1000
};

const ENERGY_CONVERSIONS: Record<string, number> = {
  "Wh": 3600,
  "kWh": 3.6e6,
  "MWh": 3.6e9,
  "J": 1,
  "kJ": 1000,
  "MJ": 1e6
};

// Appliance Presets
interface AppliancePreset {
  name: string;
  powerW: number;
  pf: number;
  category: string;
}

const APPLIANCE_PRESETS: AppliancePreset[] = [
  { name: "LED Bulb", powerW: 10, pf: 0.9, category: "Home" },
  { name: "Incandescent", powerW: 60, pf: 1.0, category: "Home" },
  { name: "Ceiling Fan", powerW: 75, pf: 0.8, category: "Home" },
  { name: "Refrigerator", powerW: 150, pf: 0.85, category: "Home" },
  { name: "Microwave", powerW: 1200, pf: 0.95, category: "Home" },
  { name: "Electric Kettle", powerW: 1500, pf: 1.0, category: "Home" },
  { name: "Air Conditioner", powerW: 2000, pf: 0.85, category: "Home" },
  { name: "EV Fast Charger", powerW: 7680, pf: 0.98, category: "EV" },
  { name: "3-Phase Motor", powerW: 15000, pf: 0.85, category: "Industrial" }
];

export function ElectricalPowerCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("dc");
  const [dcMode, setDcMode] = useState<DcSubMode>("VI");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // DC Inputs
  const [voltageVal, setVoltageVal] = useState<number>(120);
  const [voltageUnit, setVoltageUnit] = useState<string>("V");

  const [currentVal, setCurrentVal] = useState<number>(10);
  const [currentUnit, setCurrentUnit] = useState<string>("A");

  const [resistanceVal, setResistanceVal] = useState<number>(12);

  // AC Power Inputs
  const [powerFactor, setPowerFactor] = useState<number>(0.85); // 0 to 1

  // Cost Inputs
  const [usageHoursPerDay, setUsageHoursPerDay] = useState<number>(8);
  const [electricityRate, setElectricityRate] = useState<number>(0.15); // $/kWh

  // Solar Inputs
  const [solarPanelVolt, setSolarPanelVolt] = useState<number>(40);
  const [solarPanelCurr, setSolarPanelCurr] = useState<number>(10);
  const [solarPanelCount, setSolarPanelCount] = useState<number>(10);
  const [inverterEfficiency, setInverterEfficiency] = useState<number>(96); // %

  // Bottom Visual Tab
  const [visualTab, setVisualTab] = useState<"triangle" | "cost" | "graphs" | "explanation" | "quiz">("triangle");

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

  // Convert Inputs to SI Base (V, A, W, Ω)
  const siInputs = useMemo(() => {
    const vSI = voltageVal * (VOLTAGE_CONVERSIONS[voltageUnit] || 1);
    const iSI = currentVal * (CURRENT_CONVERSIONS[currentUnit] || 1);
    const rSI = resistanceVal;
    return { vSI, iSI, rSI };
  }, [voltageVal, voltageUnit, currentVal, currentUnit, resistanceVal]);

  // Calculations across all tabs & modes
  const results = useMemo(() => {
    let pWatts = 0; // Real Power (W)
    let sVA = 0;    // Apparent Power (VA)
    let qVAR = 0;   // Reactive Power (VAR)

    const pf = Math.min(1, Math.max(0, powerFactor));
    const phiRad = Math.acos(pf);
    const phiDeg = (phiRad * 180) / Math.PI;

    if (activeTab === "dc") {
      if (dcMode === "VI") {
        pWatts = siInputs.vSI * siInputs.iSI;
      } else if (dcMode === "VR") {
        pWatts = siInputs.rSI > 0 ? (siInputs.vSI * siInputs.vSI) / siInputs.rSI : 0;
      } else {
        pWatts = siInputs.iSI * siInputs.iSI * siInputs.rSI;
      }
      sVA = pWatts; // In DC, S = P and Q = 0
      qVAR = 0;
    } else if (activeTab === "ac1") {
      sVA = siInputs.vSI * siInputs.iSI;
      pWatts = sVA * pf;
      qVAR = Math.sqrt(Math.max(0, sVA * sVA - pWatts * pWatts));
    } else if (activeTab === "ac3") {
      sVA = Math.sqrt(3) * siInputs.vSI * siInputs.iSI;
      pWatts = sVA * pf;
      qVAR = Math.sqrt(Math.max(0, sVA * sVA - pWatts * pWatts));
    } else if (activeTab === "cost") {
      pWatts = siInputs.vSI * siInputs.iSI * pf;
      sVA = siInputs.vSI * siInputs.iSI;
      qVAR = Math.sqrt(Math.max(0, sVA * sVA - pWatts * pWatts));
    } else {
      // Solar Mode
      const dcTotalWatts = solarPanelVolt * solarPanelCurr * solarPanelCount;
      const acOutputWatts = dcTotalWatts * (inverterEfficiency / 100);
      const systemLossWatts = dcTotalWatts - acOutputWatts;
      pWatts = acOutputWatts;
      sVA = acOutputWatts;
      qVAR = 0;
      return {
        pWatts, sVA, qVAR, pf: 1.0, phiDeg: 0,
        dcTotalWatts, acOutputWatts, systemLossWatts
      };
    }

    // Energy & Cost Calculations
    const dailyKWh = (pWatts * usageHoursPerDay) / 1000;
    const monthlyKWh = dailyKWh * 30;
    const yearlyKWh = dailyKWh * 365;

    const dailyCost = dailyKWh * electricityRate;
    const monthlyCost = monthlyKWh * electricityRate;
    const yearlyCost = yearlyKWh * electricityRate;

    return {
      pWatts, sVA, qVAR, pf, phiDeg,
      dailyKWh, monthlyKWh, yearlyKWh,
      dailyCost, monthlyCost, yearlyCost
    };
  }, [activeTab, dcMode, siInputs, powerFactor, usageHoursPerDay, electricityRate, solarPanelVolt, solarPanelCurr, solarPanelCount, inverterEfficiency]);

  // Recharts Data
  const chartData = useMemo(() => {
    const data = [];
    const step = Math.max(1, siInputs.vSI / 10);
    for (let v = 1; v <= Math.max(20, siInputs.vSI * 1.5); v += step) {
      const p = v * siInputs.iSI * (results.pf || 1);
      data.push({
        Voltage: Number(v.toFixed(1)),
        Power: Number(p.toFixed(1))
      });
    }
    return data;
  }, [siInputs, results.pf]);

  const applyPreset = (preset: AppliancePreset) => {
    setVoltageVal(120);
    setVoltageUnit("V");
    setCurrentVal(Number((preset.powerW / (120 * preset.pf)).toFixed(2)));
    setCurrentUnit("A");
    setPowerFactor(preset.pf);
    setActiveTab("ac1");
    triggerNotification("success", `Loaded ${preset.name} (${preset.powerW}W)!`);
  };

  const handleCopyResults = () => {
    const text = `Electrical Power Calculation Summary
-----------------------------------------
Real Power (P): ${results.pWatts.toFixed(2)} W (${(results.pWatts / 1000).toFixed(3)} kW)
Apparent Power (S): ${results.sVA.toFixed(2)} VA (${(results.sVA / 1000).toFixed(3)} kVA)
Reactive Power (Q): ${results.qVAR.toFixed(2)} VAR (${(results.qVAR / 1000).toFixed(3)} kVAR)
Power Factor (PF): ${results.pf.toFixed(2)} (Phase Angle: ${results.phiDeg.toFixed(1)}°)
-----------------------------------------
Estimated Monthly Consumption: ${results.monthlyKWh?.toFixed(1)} kWh ($${results.monthlyCost?.toFixed(2)})`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Power calculation summary copied!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the Real Power (P) of a 120V circuit drawing 10A at 0.85 Power Factor (P = V·I·PF)?", correctAnswer: 1020.0, units: "W" },
      { q: "What is the Apparent Power (S) of a 230V circuit drawing 5A (S = V·I)?", correctAnswer: 1150.0, units: "VA" },
      { q: "A 3-phase AC circuit has 480V line voltage, 20A line current, and 0.9 PF. What is Real Power (P = √3·V·I·PF)?", correctAnswer: 14964.9, units: "W" }
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
    setQuizIsCorrect(diff < 5.0);
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
          <Link href="/calculators/resistance-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Resistance
          </Link>
          <Link href="/calculators/current-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Current
          </Link>
          <Link href="/calculators/voltage-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Voltage
          </Link>
          <Link href="/calculators/ohms-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ohm's Law
          </Link>
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Power
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
                Power Cockpit
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
                { key: "dc", label: "DC Power" },
                { key: "ac1", label: "1-Phase AC" },
                { key: "ac3", label: "3-Phase AC" },
                { key: "cost", label: "Energy & Cost" },
                { key: "solar", label: "Solar & Inverter" }
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

            {/* Appliance Presets */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Appliance & Load Presets:</span>
              <div className="grid grid-cols-3 gap-1.5">
                {APPLIANCE_PRESETS.map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="py-1.5 px-1 text-[11px] font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-center transition-all"
                  >
                    {p.name} ({p.powerW}W)
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Inputs per Tab */}
            <div className="space-y-5">
              
              {/* Primary Output Display */}
              <ReadOnlyField label="Calculated Real Power (P)" val={`${results.pWatts.toFixed(2)} W (${(results.pWatts / 1000).toFixed(3)} kW)`} icon={Zap} />

              {/* Standard Inputs (Voltage & Current) */}
              {activeTab !== "solar" && (
                <>
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
                      min="1"
                      max="480"
                      step="1"
                      value={voltageVal}
                      onChange={(e) => setVoltageVal(Number(e.target.value))}
                      className="w-full accent-[#518231] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Current (I)</span>
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <input
                          type="number"
                          step="0.1"
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
                      min="0.1"
                      max="50"
                      step="0.5"
                      value={currentVal}
                      onChange={(e) => setCurrentVal(Number(e.target.value))}
                      className="w-full accent-[#518231] cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Power Factor Input for AC Mode */}
              {(activeTab === "ac1" || activeTab === "ac3" || activeTab === "cost") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Power Factor (PF = cos φ)</span>
                    <span className="font-black text-[#518231]">{powerFactor.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.01"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              )}

              {/* Cost Inputs */}
              {activeTab === "cost" && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Hours/Day</span>
                      <input
                        type="number"
                        value={usageHoursPerDay}
                        onChange={(e) => setUsageHoursPerDay(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Rate ($/kWh)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={electricityRate}
                        onChange={(e) => setElectricityRate(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Solar Inputs */}
              {activeTab === "solar" && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Panel Voltage (V)</span>
                      <input
                        type="number"
                        value={solarPanelVolt}
                        onChange={(e) => setSolarPanelVolt(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Panel Current (A)</span>
                      <input
                        type="number"
                        value={solarPanelCurr}
                        onChange={(e) => setSolarPanelCurr(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Number of Panels</span>
                      <input
                        type="number"
                        value={solarPanelCount}
                        onChange={(e) => setSolarPanelCount(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Inverter Efficiency (%)</span>
                      <input
                        type="number"
                        value={inverterEfficiency}
                        onChange={(e) => setInverterEfficiency(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Real vs Apparent vs Reactive Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <Activity size={16} className="text-[#518231]" />
              Electrical Power Components Summary
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Real Power (P)</span>
                <span className="font-black text-[#518231]">{results.pWatts.toFixed(1)} W</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Apparent Power (S)</span>
                <span className="font-black text-blue-500">{results.sVA.toFixed(1)} VA</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Reactive Power (Q)</span>
                <span className="font-black text-amber-500">{results.qVAR.toFixed(1)} VAR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Power Triangle & Power Factor Gauge */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                📐 Interactive Power Triangle & Vector Visualizer
              </span>
              <span className="text-xs font-bold text-blue-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                Phase Angle φ: {results.phiDeg.toFixed(1)}°
              </span>
            </div>

            {/* Dynamic SVG Power Triangle */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              <div className="w-full max-w-sm h-48 relative flex items-center justify-center">
                <svg viewBox="0 0 300 200" className="w-full h-full">
                  {/* Triangle Path */}
                  <polygon
                    points="30,160 250,160 250,40"
                    fill="rgba(81, 130, 49, 0.15)"
                    stroke="#518231"
                    strokeWidth="3"
                  />

                  {/* Horizontal Leg: Real Power P */}
                  <line x1="30" y1="160" x2="250" y2="160" stroke="#10b981" strokeWidth="4" />
                  <text x="140" y="180" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Real Power P = {results.pWatts.toFixed(0)} W
                  </text>

                  {/* Vertical Leg: Reactive Power Q */}
                  <line x1="250" y1="160" x2="250" y2="40" stroke="#f59e0b" strokeWidth="4" />
                  <text x="260" y="100" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="start">
                    Q = {results.qVAR.toFixed(0)} VAR
                  </text>

                  {/* Hypotenuse: Apparent Power S */}
                  <line x1="30" y1="160" x2="250" y2="40" stroke="#3b82f6" strokeWidth="4" />
                  <text x="120" y="90" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="end">
                    Apparent S = {results.sVA.toFixed(0)} VA
                  </text>

                  {/* Arc for Phase Angle φ */}
                  <path d="M 60,160 A 30,30 0 0,0 55,145" fill="none" stroke="#60a5fa" strokeWidth="2" />
                  <text x="65" y="152" fill="#60a5fa" fontSize="10" fontWeight="bold">φ</text>
                </svg>
              </div>
            </div>

            {/* Power Factor Gauge Bar */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Power Factor Gauge (PF):</span>
                <span className="text-[#518231] font-black">{results.pf.toFixed(2)} ({results.pf >= 0.95 ? "Excellent" : results.pf >= 0.85 ? "Good" : "Moderate"})</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                <div 
                  className="bg-gradient-to-r from-red-500 via-amber-500 to-green-500 h-full transition-all duration-300" 
                  style={{ width: `${results.pf * 100}%` }} 
                />
              </div>
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
                {(["triangle", "cost", "graphs", "explanation", "quiz"] as const).map(tab => (
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
                    {tab === "triangle" ? "Power Vector" : tab === "cost" ? "💰 Electricity Cost" : tab === "graphs" ? "📊 Live Graph" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Power Vector Explanation */}
                {visualTab === "triangle" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">📐 Real vs Apparent vs Reactive Power</h4>
                    <p className="leading-relaxed">
                      In AC electrical systems, <strong>Real Power (P, Watts)</strong> is the actual work-performing energy consumed by resistive loads. <strong>Reactive Power (Q, VAR)</strong> sustains electromagnetic fields in inductive loads (motors, transformers). <strong>Apparent Power (S, VA)</strong> is the vector sum capacity (S = √(P² + Q²)).
                    </p>
                  </div>
                )}

                {/* Tab 2: Cost Estimator */}
                {visualTab === "cost" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <DollarSign size={16} className="text-[#518231]" />
                      Electricity Consumption & Cost Estimate
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                        <span className="font-bold text-slate-400 block text-[10px] uppercase">Daily</span>
                        <span className="font-black text-slate-900 dark:text-white">{results.dailyKWh?.toFixed(1)} kWh</span>
                        <span className="block text-xs font-bold text-[#518231]">${results.dailyCost?.toFixed(2)}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                        <span className="font-bold text-slate-400 block text-[10px] uppercase">Monthly (30 Days)</span>
                        <span className="font-black text-slate-900 dark:text-white">{results.monthlyKWh?.toFixed(1)} kWh</span>
                        <span className="block text-xs font-bold text-[#518231]">${results.monthlyCost?.toFixed(2)}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                        <span className="font-bold text-slate-400 block text-[10px] uppercase">Yearly (365 Days)</span>
                        <span className="font-black text-slate-900 dark:text-white">{results.yearlyKWh?.toFixed(1)} kWh</span>
                        <span className="block text-xs font-bold text-[#518231]">${results.yearlyCost?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Live Graph */}
                {visualTab === "graphs" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      Real Power vs Voltage Characteristic Curve
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Voltage" label={{ value: 'Voltage (V)', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="Power" stroke="#10b981" strokeWidth={2.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 4: Step-by-Step */}
                {visualTab === "explanation" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-Step Power Solution</h4>
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Real Power Formula: P = V · I · PF</div>
                      <div>2. Knowns: Voltage V = {siInputs.vSI} V, Current I = {siInputs.iSI} A, Power Factor PF = {results.pf}</div>
                      <div>3. Calculation: P = {siInputs.vSI} · {siInputs.iSI} · {results.pf}</div>
                      <div>4. Result: Real Power P = {results.pWatts.toFixed(2)} W (Apparent S = {results.sVA.toFixed(2)} VA)</div>
                    </div>
                  </div>
                )}

                {/* Tab 5: Physics Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Electrical Power Quiz</h4>
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
