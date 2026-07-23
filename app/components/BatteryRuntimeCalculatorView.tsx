"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Battery, Server, RefreshCw, ExternalLink, BatteryCharging, Clock
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

type CategoryTab = "basic_runtime" | "battery_bank" | "multi_load" | "peukert_chem" | "charging_ups";

interface CustomLoadItem {
  id: string;
  name: string;
  powerW: number;
  quantity: number;
  dutyCyclePct: number; // e.g. 50% for fridge, 100% continuous
}

const DEFAULT_BATTERY_LOADS: CustomLoadItem[] = [
  { id: "1", name: "Wi-Fi Router & Modem", powerW: 15, quantity: 1, dutyCyclePct: 100 },
  { id: "2", name: "Laptop Charger", powerW: 65, quantity: 1, dutyCyclePct: 50 },
  { id: "3", name: "LED Household Bulbs", powerW: 9, quantity: 4, dutyCyclePct: 100 },
  { id: "4", name: "DC Fan", powerW: 25, quantity: 1, dutyCyclePct: 75 }
];

interface ChemistryPreset {
  name: string;
  defaultDodPct: number;
  defaultEffPct: number;
  peukertExponent: number; // 1.0 for Lithium (no Peukert), 1.15-1.30 for Lead-Acid
  supportsPeukert: boolean;
}

const CHEM_PRESETS: { [key: string]: ChemistryPreset } = {
  lifepo4: { name: "LiFePO4 (Lithium Iron Phosphate)", defaultDodPct: 90, defaultEffPct: 95, peukertExponent: 1.0, supportsPeukert: false },
  liion: { name: "Lithium-Ion (NMC)", defaultDodPct: 80, defaultEffPct: 92, peukertExponent: 1.0, supportsPeukert: false },
  agm: { name: "AGM Sealed Lead-Acid", defaultDodPct: 50, defaultEffPct: 85, peukertExponent: 1.15, supportsPeukert: true },
  gel: { name: "Gel Lead-Acid", defaultDodPct: 50, defaultEffPct: 85, peukertExponent: 1.20, supportsPeukert: true },
  leadacid: { name: "Flooded Lead-Acid", defaultDodPct: 50, defaultEffPct: 80, peukertExponent: 1.30, supportsPeukert: true }
};

export function BatteryRuntimeCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("basic_runtime");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Tab 1: Single Battery & Inverter Inputs
  const [batteryVoltageV, setBatteryVoltageV] = useState<number>(12.0); // Volts DC
  const [batteryCapacityAh, setBatteryCapacityAh] = useState<number>(100.0); // Ah
  const [loadPowerW, setLoadPowerW] = useState<number>(200.0); // Watts Load
  const [inverterEffPct, setInverterEffPct] = useState<number>(90); // 90% Inverter Efficiency
  const [dodPct, setDodPct] = useState<number>(80); // 80% Depth of Discharge
  const [sohPct, setSohPct] = useState<number>(100); // 100% Health
  const [tempCelsius, setTempCelsius] = useState<number>(25); // 25°C

  // Tab 2: Battery Bank Setup
  const [seriesCount, setSeriesCount] = useState<number>(1);
  const [parallelCount, setParallelCount] = useState<number>(1);

  // Tab 3: Multi-Load State
  const [loadList, setLoadList] = useState<CustomLoadItem[]>(DEFAULT_BATTERY_LOADS);
  const [newLoadName, setNewLoadName] = useState<string>("");
  const [newLoadW, setNewLoadW] = useState<number>(30);
  const [newLoadDuty, setNewLoadDuty] = useState<number>(100);

  // Tab 4: Chemistry & Peukert State
  const [selectedChemKey, setSelectedChemKey] = useState<string>("lifepo4");
  const [peukertExponent, setPeukertExponent] = useState<number>(1.0);
  const [enablePeukert, setEnablePeukert] = useState<boolean>(false);

  // Tab 5: Charger State
  const [chargerCurrentA, setChargerCurrentA] = useState<number>(15.0); // 15A Charger
  const [currentSocPct, setCurrentSocPct] = useState<number>(20); // 20% SoC

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"diagram" | "waterfall" | "charts" | "quiz">("diagram");

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

  const handleSelectChemistry = (key: string) => {
    setSelectedChemKey(key);
    const chem = CHEM_PRESETS[key];
    if (chem) {
      setDodPct(chem.defaultDodPct);
      setPeukertExponent(chem.peukertExponent);
      setEnablePeukert(chem.supportsPeukert);
    }
  };

  // Calculations Engine
  const results = useMemo(() => {
    // Battery Bank Total Calculations
    const bankTotalVoltageV = batteryVoltageV * seriesCount;
    const bankTotalCapacityAh = batteryCapacityAh * parallelCount;
    const totalBatteryCount = seriesCount * parallelCount;
    const totalBatteryEnergyWh = bankTotalVoltageV * bankTotalCapacityAh;

    // Load Power Determination
    let activeSystemLoadW = loadPowerW;
    if (activeTab === "multi_load") {
      activeSystemLoadW = loadList.reduce((sum, item) => {
        return sum + item.powerW * item.quantity * (item.dutyCyclePct / 100);
      }, 0);
    }

    // Battery-Side Load Power (accounting for Inverter Losses)
    const invEffDecimal = Math.max(0.1, inverterEffPct / 100);
    const batterySidePowerW = activeSystemLoadW / invEffDecimal;
    const batteryDischargeCurrentA = bankTotalVoltageV > 0 ? batterySidePowerW / bankTotalVoltageV : 0;

    // Ideal Runtime (Theoretical 100% DoD & 100% Efficiency)
    const idealRuntimeHours = activeSystemLoadW > 0 ? totalBatteryEnergyWh / activeSystemLoadW : 0;

    // Temperature Derating Factor (approx 1% loss per °C below 25°C)
    let tempFactor = 1.0;
    if (tempCelsius < 25) {
      tempFactor = Math.max(0.5, 1.0 - (25 - tempCelsius) * 0.01);
    }

    // Usable Energy
    const dodDecimal = Math.min(1.0, Math.max(0.1, dodPct / 100));
    const sohDecimal = Math.min(1.0, Math.max(0.1, sohPct / 100));
    const usableEnergyWh = totalBatteryEnergyWh * dodDecimal * sohDecimal * tempFactor;

    // Realistic Runtime (Without Peukert)
    const realisticRuntimeHours = batterySidePowerW > 0 ? usableEnergyWh / batterySidePowerW : 0;

    // Peukert's Law Adjusted Runtime (For Lead-Acid batteries)
    let peukertRuntimeHours = realisticRuntimeHours;
    if (enablePeukert && peukertExponent > 1.0 && batteryDischargeCurrentA > 0) {
      const ratedHours = 20; // 20-hour rating standard
      const ratedCurrentA = bankTotalCapacityAh / ratedHours;
      if (batteryDischargeCurrentA > ratedCurrentA) {
        peukertRuntimeHours = ratedHours * Math.pow(bankTotalCapacityAh / (batteryDischargeCurrentA * ratedHours), peukertExponent);
        // Apply DoD & SOH scaling to Peukert runtime
        peukertRuntimeHours = peukertRuntimeHours * dodDecimal * sohDecimal * tempFactor;
      }
    }

    const finalEstimatedRuntimeHours = enablePeukert ? peukertRuntimeHours : realisticRuntimeHours;

    // Charging Time Calculation
    const capacityToChargeAh = bankTotalCapacityAh * (1 - Math.min(100, currentSocPct) / 100);
    const chargeTimeHours = chargerCurrentA > 0 ? (capacityToChargeAh * 1.15) / chargerCurrentA : 0;
    const cRate = bankTotalCapacityAh > 0 ? batteryDischargeCurrentA / bankTotalCapacityAh : 0;

    return {
      bankTotalVoltageV,
      bankTotalCapacityAh,
      totalBatteryCount,
      totalBatteryEnergyWh,
      activeSystemLoadW,
      batterySidePowerW,
      batteryDischargeCurrentA,
      idealRuntimeHours,
      usableEnergyWh,
      realisticRuntimeHours,
      peukertRuntimeHours,
      finalEstimatedRuntimeHours,
      chargeTimeHours,
      cRate
    };
  }, [
    batteryVoltageV, batteryCapacityAh, seriesCount, parallelCount, loadPowerW, activeTab, loadList,
    inverterEffPct, dodPct, sohPct, tempCelsius, enablePeukert, peukertExponent, chargerCurrentA, currentSocPct
  ]);

  // Recharts Chart Data (Discharge Curve: SoC over time)
  const dischargeCurveData = useMemo(() => {
    const data = [];
    const totalHours = Math.max(1, results.finalEstimatedRuntimeHours);
    const step = totalHours / 10;

    for (let h = 0; h <= totalHours; h += step) {
      const remainingPct = Math.max(0, 100 - (h / totalHours) * 100);
      data.push({
        TimeHours: Number(h.toFixed(1)),
        SoCPct: Number(remainingPct.toFixed(1))
      });
    }
    return data;
  }, [results.finalEstimatedRuntimeHours]);

  // Recharts Derating Waterfall Data
  const waterfallData = useMemo(() => {
    return [
      { Stage: "Ideal", Hours: Number(results.idealRuntimeHours.toFixed(1)) },
      { Stage: "Inverter Loss", Hours: Number((results.idealRuntimeHours * (inverterEffPct / 100)).toFixed(1)) },
      { Stage: "DoD Limit", Hours: Number((results.idealRuntimeHours * (inverterEffPct / 100) * (dodPct / 100)).toFixed(1)) },
      { Stage: "Final Realistic", Hours: Number(results.finalEstimatedRuntimeHours.toFixed(1)) }
    ];
  }, [results.idealRuntimeHours, results.finalEstimatedRuntimeHours, inverterEffPct, dodPct]);

  // Handlers for Multi-Load List
  const handleAddLoad = () => {
    if (!newLoadName.trim()) {
      triggerNotification("error", "Please enter a valid load description name.");
      return;
    }
    const newItem: CustomLoadItem = {
      id: Date.now().toString(),
      name: newLoadName.trim(),
      powerW: newLoadW,
      quantity: 1,
      dutyCyclePct: newLoadDuty
    };
    setLoadList([...loadList, newItem]);
    setNewLoadName("");
    triggerNotification("success", `Added "${newItem.name}" to load array!`);
  };

  const handleRemoveLoad = (id: string) => {
    setLoadList(loadList.filter(item => item.id !== id));
  };

  const handleCopySummary = () => {
    const hours = Math.floor(results.finalEstimatedRuntimeHours);
    const mins = Math.round((results.finalEstimatedRuntimeHours - hours) * 60);

    const text = `Battery Runtime Analysis Summary
-----------------------------------------
Battery Bank: ${results.bankTotalVoltageV}V ${results.bankTotalCapacityAh}Ah (${results.totalBatteryCount} Battery Cell/Pack)
Total Stored Energy: ${results.totalBatteryEnergyWh.toFixed(0)} Wh (${(results.totalBatteryEnergyWh / 1000).toFixed(2)} kWh)
Battery Chemistry: ${CHEM_PRESETS[selectedChemKey]?.name || "Custom"}
-----------------------------------------
Active System Load: ${results.activeSystemLoadW.toFixed(1)} W
Inverter Efficiency: ${inverterEffPct}% (Battery-Side Power: ${results.batterySidePowerW.toFixed(1)} W)
Discharge Current Draw: ${results.batteryDischargeCurrentA.toFixed(1)} A (C-Rate: ${results.cRate.toFixed(2)}C)
-----------------------------------------
Ideal Theoretical Runtime: ${results.idealRuntimeHours.toFixed(1)} Hours
Usable Energy (${dodPct}% DoD, ${sohPct}% SOH): ${results.usableEnergyWh.toFixed(0)} Wh
ESTIMATED REAL-WORLD RUNTIME: ${hours} Hours ${mins} Mins (${results.finalEstimatedRuntimeHours.toFixed(1)} Hours)`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Battery runtime summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the total energy in Watt-hours (Wh) stored in a 12V 100Ah battery?", correctAnswer: 1200, units: "Wh" },
      { q: "What is the ideal runtime for a 1200Wh battery powering a 200W load at 100% efficiency?", correctAnswer: 6, units: "Hours" },
      { q: "What is the usable energy in Wh of a 1200Wh Lead-Acid battery limited to 50% Depth of Discharge (DoD)?", correctAnswer: 600, units: "Wh" }
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

      {/* 🔄 Physics & Electrical Hub Top Pill Navigation */}
      <div className="bg-slate-100 dark:bg-slate-900/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex items-center justify-between overflow-x-auto gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 flex items-center gap-1.5 shrink-0">
          <Layers size={14} className="text-[#518231]" />
          Energy Storage Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Battery Runtime
          </span>
          <Link href="/calculators/power-supply-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Power Supply
          </Link>
          <Link href="/calculators/electrical-power-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electrical Power
          </Link>
          <Link href="/calculators/ohms-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ohm's Law
          </Link>
          <Link href="/calculators/electricity-cost-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electricity Cost
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
                <Battery className="text-[#518231]" />
                Battery Cockpit
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
                { key: "basic_runtime", label: "Runtime" },
                { key: "battery_bank", label: "Bank" },
                { key: "multi_load", label: "Loads" },
                { key: "peukert_chem", label: "Chemistry" },
                { key: "charging_ups", label: "Charger" }
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

            {/* Dynamic Inputs */}
            <div className="space-y-5">
              
              {/* Primary Output Display */}
              <ReadOnlyField 
                label="Estimated Real-World Runtime" 
                val={`${Math.floor(results.finalEstimatedRuntimeHours)}h ${Math.round((results.finalEstimatedRuntimeHours - Math.floor(results.finalEstimatedRuntimeHours)) * 60)}m (${results.finalEstimatedRuntimeHours.toFixed(1)} Hours)`} 
                icon={Clock} 
              />

              {/* Battery Voltage (Volts DC) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Battery Nominal Voltage (Volts)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={batteryVoltageV}
                    onChange={(e) => setBatteryVoltageV(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {[3.7, 12, 24, 48].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setBatteryVoltageV(v)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all border ${
                        batteryVoltageV === v 
                          ? "bg-[#518231] text-white border-[#518231]" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {v}V DC
                    </button>
                  ))}
                </div>
              </div>

              {/* Battery Capacity (Ah) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Battery Capacity (Amp-Hours / Ah)</span>
                  <input
                    type="number"
                    step="5"
                    value={batteryCapacityAh}
                    onChange={(e) => setBatteryCapacityAh(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={batteryCapacityAh}
                  onChange={(e) => setBatteryCapacityAh(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Connected Load Power (Watts) for Tab 1 */}
              {activeTab === "basic_runtime" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Connected Load Power (Watts)</span>
                    <input
                      type="number"
                      step="10"
                      value={loadPowerW}
                      onChange={(e) => setLoadPowerW(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    step="10"
                    value={loadPowerW}
                    onChange={(e) => setLoadPowerW(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              )}

              {/* Tab 2: Series & Parallel Bank Configuration */}
              {activeTab === "battery_bank" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Battery Bank Topology</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Series Batteries (Voltage × N)</span>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={seriesCount}
                        onChange={(e) => setSeriesCount(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Parallel Strings (Capacity × N)</span>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={parallelCount}
                        onChange={(e) => setParallelCount(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Multi-Load Builder Inputs */}
              {activeTab === "multi_load" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Multi-Device Household & Backup Loads</span>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {loadList.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                          <span className="text-[10px] text-slate-400">{item.powerW}W × {item.quantity} ({item.dutyCyclePct}% duty)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveLoad(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Load Form */}
                  <div className="grid grid-cols-3 gap-1 pt-1">
                    <input
                      type="text"
                      placeholder="Load Name"
                      value={newLoadName}
                      onChange={(e) => setNewLoadName(e.target.value)}
                      className="col-span-3 bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                    />
                    <input
                      type="number"
                      placeholder="Watts"
                      value={newLoadW}
                      onChange={(e) => setNewLoadW(Number(e.target.value))}
                      className="bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                    />
                    <input
                      type="number"
                      placeholder="Duty %"
                      value={newLoadDuty}
                      onChange={(e) => setNewLoadDuty(Number(e.target.value))}
                      className="bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleAddLoad}
                      className="bg-[#518231] hover:bg-[#436a28] text-white font-bold p-2 rounded-xl text-xs flex items-center justify-center gap-1"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 4: Chemistry & Peukert Law Inputs */}
              {activeTab === "peukert_chem" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Battery Chemistry Presets</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.entries(CHEM_PRESETS).map(([k, chem]) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => handleSelectChemistry(k)}
                        className={`p-2 rounded-xl text-left border transition-all ${
                          selectedChemKey === k 
                            ? "bg-[#518231]/10 border-[#518231] text-[#518231] font-bold" 
                            : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <span className="block font-bold text-[11px]">{chem.name.split(" ")[0]}</span>
                        <span className="text-[9px] text-slate-400">DoD: {chem.defaultDodPct}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Charging & UPS Inputs */}
              {activeTab === "charging_ups" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Charger Current & Current SoC</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Charger Current (Amps)</span>
                      <input
                        type="number"
                        value={chargerCurrentA}
                        onChange={(e) => setChargerCurrentA(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Current SoC (%)</span>
                      <input
                        type="number"
                        value={currentSocPct}
                        onChange={(e) => setCurrentSocPct(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Mode: Inverter Efficiency & Depth of Discharge (DoD) */}
              {isAdvancedMode && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Derating Factors (Inverter & DoD)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Inverter Efficiency (%)</span>
                      <select
                        value={inverterEffPct}
                        onChange={(e) => setInverterEffPct(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value={80}>80% (Basic Inverter)</option>
                        <option value={85}>85% (Standard Inverter)</option>
                        <option value={90}>90% (High-Efficiency Inverter)</option>
                        <option value={95}>95% (Pure Sine Wave Pro)</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Depth of Discharge / DoD (%)</span>
                      <select
                        value={dodPct}
                        onChange={(e) => setDodPct(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value={50}>50% (Lead-Acid / AGM Safe)</option>
                        <option value={80}>80% (Li-Ion Standard)</option>
                        <option value={90}>90% (LiFePO4 Standard)</option>
                        <option value={100}>100% (Theoretical Max)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Link to Power Supply Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need power supply wattage sizing?</span>
              <span className="text-[11px] text-slate-500">Calculate AC-DC adapter ratings with 25% safety headroom</span>
            </div>
            <Link
              href="/calculators/power-supply-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Power Supply
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Discharge Visualizer & Derating Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Dynamic Interactive Battery Discharge Visualizer */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🔋 Dynamic Interactive Battery Discharge Visualizer
              </span>
              <span className="text-xs font-bold text-green-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                Usable: {results.usableEnergyWh.toFixed(0)} Wh
              </span>
            </div>

            {/* SVG Interactive Battery Discharge Diagram */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              {/* Formula Readout */}
              <div className="text-center mb-4 font-mono text-xs sm:text-sm">
                <span className="text-slate-400">Formula: </span>
                <span className="text-white font-bold">Runtime = Usable Wh / P_load = ({results.usableEnergyWh.toFixed(0)}Wh) / ({results.batterySidePowerW.toFixed(0)}W) = </span>
                <span className="text-[#518231] font-black">{results.finalEstimatedRuntimeHours.toFixed(1)} Hours</span>
              </div>

              {/* SVG Battery Pipeline Visualizer */}
              <div className="w-full max-w-md h-36 relative flex items-center justify-center">
                <svg viewBox="0 0 400 120" className="w-full h-full">
                  
                  {/* Battery Body */}
                  <rect x="30" y="25" width="100" height="70" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" rx="8" />
                  <rect x="130" y="45" width="8" height="30" fill="#10b981" rx="2" />
                  <text x="80" y="55" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">{results.bankTotalVoltageV}V Bank</text>
                  <text x="80" y="75" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">{results.bankTotalCapacityAh} Ah</text>

                  {/* Flow Arrow Pipe */}
                  <path d="M 145 60 L 230 60" stroke="#3b82f6" strokeWidth="4" strokeDasharray="6 4" className="animate-[dash_10s_linear_infinite]" />

                  {/* Inverter Node */}
                  <g transform="translate(230, 30)">
                    <rect x="0" y="0" width="75" height="60" fill="#0f172a" stroke="#518231" strokeWidth="2" rx="8" />
                    <text x="37" y="25" fill="#518231" fontSize="11" fontWeight="bold" textAnchor="middle">Inverter</text>
                    <text x="37" y="42" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">{inverterEffPct}% Eff</text>
                  </g>

                  {/* Output Flow Arrow */}
                  <path d="M 310 60 L 345 60" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 2" />

                  {/* Load Node */}
                  <text x="370" y="64" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">{results.activeSystemLoadW.toFixed(0)}W</text>
                </svg>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Stored Energy</span>
                <span className="text-xs font-black text-white">{(results.totalBatteryEnergyWh / 1000).toFixed(2)} kWh</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Discharge Current</span>
                <span className="text-xs font-black text-amber-400">{results.batteryDischargeCurrentA.toFixed(1)} A</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Charge Time</span>
                <span className="text-xs font-black text-[#518231]">{results.chargeTimeHours.toFixed(1)} Hours</span>
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
                {(["diagram", "waterfall", "charts", "quiz"] as const).map(tab => (
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
                    {tab === "diagram" ? "Overview" : tab === "waterfall" ? "🪜 Derating Waterfall" : tab === "charts" ? "📊 SoC Curve" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Theory Overview */}
                {visualTab === "diagram" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚡ Battery Energy & Runtime Engineering Theory</h4>
                    <p className="leading-relaxed">
                      Calculating real-world battery runtime requires accounting for inverter conversion efficiency ({inverterEffPct}%), usable Depth of Discharge ({dodPct}% DoD), battery chemistry characteristics, and ambient temperature derating.
                    </p>
                  </div>
                )}

                {/* Tab 2: Derating Waterfall Bar Chart */}
                {visualTab === "waterfall" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Runtime Derating Waterfall Breakdown (Hours)</h4>
                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={waterfallData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Stage" />
                            <YAxis />
                            <Tooltip formatter={(val: any) => [`${val} Hours`, "Runtime"]} />
                            <Bar dataKey="Hours" fill="#518231" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading waterfall chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 3: SoC Discharge Line Chart */}
                {visualTab === "charts" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Battery State of Charge (%) Over Time</h4>
                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={dischargeCurveData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="TimeHours" label={{ value: 'Time (Hours)', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis />
                            <Tooltip formatter={(val: any) => [`${val}%`, "SoC"]} />
                            <Line type="monotone" dataKey="SoCPct" stroke="#10b981" strokeWidth={2.5} dot={false} />
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Battery Runtime Engineering Quiz</h4>
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
