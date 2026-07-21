"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Battery, Server, HardDrive, Monitor, Fan, RefreshCw, ExternalLink
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

type CategoryTab = "basic_dc_ac" | "multi_load" | "pc_server" | "led_motor" | "battery_ups";

interface CustomLoadItem {
  id: string;
  name: string;
  voltage: number;
  current: number; // Amps
  quantity: number;
  isPeak: boolean;
  surgeMultiplier: number; // 1x to 5x
}

const DEFAULT_LOADS: CustomLoadItem[] = [
  { id: "1", name: "Arduino / Microcontroller", voltage: 5, current: 0.2, quantity: 1, isPeak: false, surgeMultiplier: 1.0 },
  { id: "2", name: "5mm Indicator LEDs", voltage: 5, current: 0.1, quantity: 5, isPeak: false, surgeMultiplier: 1.0 },
  { id: "3", name: "Wi-Fi Router / AP", voltage: 12, current: 1.5, quantity: 1, isPeak: false, surgeMultiplier: 1.2 },
  { id: "4", name: "DC Cooling Fan", voltage: 12, current: 0.35, quantity: 2, isPeak: false, surgeMultiplier: 1.5 }
];

const COLORS = ["#518231", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#64748b"];

export function PowerSupplyCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("basic_dc_ac");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Tab 1: Basic Single PSU Inputs
  const [voltageV, setVoltageV] = useState<number>(12.0); // Volts DC
  const [currentA, setCurrentA] = useState<number>(5.0); // Amps
  const [safetyMarginPct, setSafetyMarginPct] = useState<number>(25); // 25% safety headroom
  const [powerFactorPf, setPowerFactorPf] = useState<number>(0.90); // 0.90
  const [efficiencyPct, setEfficiencyPct] = useState<number>(85); // 85% efficiency

  // Tab 2: Multi-Load System Builder State
  const [loadList, setLoadList] = useState<CustomLoadItem[]>(DEFAULT_LOADS);
  const [newLoadName, setNewLoadName] = useState<string>("");
  const [newLoadVoltage, setNewLoadVoltage] = useState<number>(12);
  const [newLoadCurrent, setNewLoadCurrent] = useState<number>(1.0);

  // Tab 3: PC / Server PSU State
  const [cpuPowerW, setCpuPowerW] = useState<number>(125);
  const [gpuPowerW, setGpuPowerW] = useState<number>(250);
  const [ramDrivesPowerW, setRamDrivesPowerW] = useState<number>(50);
  const [fansCoolingPowerW, setFansCoolingPowerW] = useState<number>(30);
  const [isServerRedundant, setIsServerRedundant] = useState<boolean>(false);
  const [redundancyMode, setRedundancyMode] = useState<"N+1" | "N+N">("N+1");

  // Tab 4: LED Strip & Motor Inrush State
  const [ledLengthMeters, setLedLengthMeters] = useState<number>(5.0);
  const [ledWattsPerMeter, setLedWattsPerMeter] = useState<number>(14.4); // 14.4 W/m (RGB 5050)
  const [motorRunningCurrentA, setMotorRunningCurrentA] = useState<number>(3.0);
  const [motorInrushFactor, setMotorInrushFactor] = useState<number>(4.0); // 4x starting surge

  // Tab 5: Battery & UPS Runtime State
  const [batteryVoltageV, setBatteryVoltageV] = useState<number>(12.0);
  const [batteryCapacityAh, setBatteryCapacityAh] = useState<number>(100.0); // 100 Ah
  const [upsTargetBackupMinutes, setUpsTargetBackupMinutes] = useState<number>(30);

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"flow" | "breakdown" | "charts" | "quiz">("flow");

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

  // Calculations Engine
  const results = useMemo(() => {
    // 1. Basic Single Load DC/AC
    const basicLoadPowerW = voltageV * currentA;
    const safetyMultiplier = 1 + safetyMarginPct / 100;
    
    const minPsuWattageW = basicLoadPowerW;
    const recommendedPsuWattageW = basicLoadPowerW * safetyMultiplier;
    const highHeadroomPsuWattageW = basicLoadPowerW * 1.5;

    const recommendedCurrentA = voltageV > 0 ? recommendedPsuWattageW / voltageV : 0;

    // AC Power Factor & Apparent Power
    const apparentPowerVa = powerFactorPf > 0 ? basicLoadPowerW / powerFactorPf : basicLoadPowerW;
    
    // Efficiency Loss & Input Power
    const effDecimal = efficiencyPct / 100;
    const inputPowerW = effDecimal > 0 ? basicLoadPowerW / effDecimal : basicLoadPowerW;
    const powerLossHeatW = Math.max(0, inputPowerW - basicLoadPowerW);

    // 2. Multi-Load Builder Calculations
    let multiTotalContinuousW = 0;
    let multiTotalPeakW = 0;
    let multiTotalCurrentA = 0;
    let voltageMismatchDetected = false;

    loadList.forEach(item => {
      const itemP = item.voltage * item.current * item.quantity;
      multiTotalContinuousW += itemP;
      multiTotalPeakW += itemP * (item.isPeak ? item.surgeMultiplier : 1.0);
      multiTotalCurrentA += item.current * item.quantity;

      if (item.voltage !== voltageV && item.voltage > 0 && voltageV > 0) {
        voltageMismatchDetected = true;
      }
    });

    const multiRecommendedPsuW = multiTotalPeakW * safetyMultiplier;

    // 3. PC / Server PSU Calculations
    const pcTotalW = cpuPowerW + gpuPowerW + ramDrivesPowerW + fansCoolingPowerW;
    const pcRecommendedPsuW = pcTotalW * 1.3; // 30% headroom for GPU transient spikes
    let serverRedundantPsuCount = 1;
    if (isServerRedundant) {
      serverRedundantPsuCount = redundancyMode === "N+1" ? 2 : 2;
    }

    // 4. LED Strip & Motor Calculations
    const ledTotalW = ledLengthMeters * ledWattsPerMeter;
    const ledRecommendedPsuW = ledTotalW * 1.25; // 20% safety margin standard
    const motorRunningW = voltageV * motorRunningCurrentA;
    const motorPeakW = motorRunningW * motorInrushFactor;

    // 5. Battery & UPS Runtime Calculations
    const batteryEnergyWh = batteryVoltageV * batteryCapacityAh;
    const activeLoadW = activeTab === "multi_load" ? multiTotalContinuousW : basicLoadPowerW;
    const batteryRuntimeHours = activeLoadW > 0 ? (batteryEnergyWh * 0.85) / activeLoadW : 0; // 85% depth of discharge
    const requiredUpsVa = activeLoadW / 0.7; // Standard 0.7 UPS power factor

    return {
      basicLoadPowerW,
      minPsuWattageW,
      recommendedPsuWattageW,
      highHeadroomPsuWattageW,
      recommendedCurrentA,
      apparentPowerVa,
      inputPowerW,
      powerLossHeatW,
      multiTotalContinuousW,
      multiTotalPeakW,
      multiTotalCurrentA,
      multiRecommendedPsuW,
      voltageMismatchDetected,
      pcTotalW,
      pcRecommendedPsuW,
      serverRedundantPsuCount,
      ledTotalW,
      ledRecommendedPsuW,
      motorRunningW,
      motorPeakW,
      batteryEnergyWh,
      batteryRuntimeHours,
      requiredUpsVa
    };
  }, [
    voltageV, currentA, safetyMarginPct, powerFactorPf, efficiencyPct, 
    loadList, cpuPowerW, gpuPowerW, ramDrivesPowerW, fansCoolingPowerW, isServerRedundant, redundancyMode,
    ledLengthMeters, ledWattsPerMeter, motorRunningCurrentA, motorInrushFactor,
    batteryVoltageV, batteryCapacityAh, activeTab
  ]);

  // Recharts Chart Data (PSU Headroom Comparison)
  const psuComparisonData = useMemo(() => {
    const targetLoad = activeTab === "multi_load" ? results.multiTotalContinuousW : results.basicLoadPowerW;
    return [
      { name: "Continuous Load", Wattage: Number(targetLoad.toFixed(1)) },
      { name: "Minimum PSU", Wattage: Number(targetLoad.toFixed(1)) },
      { name: "Recommended PSU", Wattage: Number((targetLoad * 1.25).toFixed(1)) },
      { name: "High Headroom", Wattage: Number((targetLoad * 1.50).toFixed(1)) }
    ];
  }, [results.basicLoadPowerW, results.multiTotalContinuousW, activeTab]);

  // Recharts Pie Chart Data (Multi-load breakdown)
  const pieData = useMemo(() => {
    return loadList.map(item => ({
      name: item.name,
      value: Number((item.voltage * item.current * item.quantity).toFixed(1))
    }));
  }, [loadList]);

  // Handlers for Multi-Load List
  const handleAddLoad = () => {
    if (!newLoadName.trim()) {
      triggerNotification("error", "Please enter a valid load description name.");
      return;
    }
    const newItem: CustomLoadItem = {
      id: Date.now().toString(),
      name: newLoadName.trim(),
      voltage: newLoadVoltage,
      current: newLoadCurrent,
      quantity: 1,
      isPeak: false,
      surgeMultiplier: 1.0
    };
    setLoadList([...loadList, newItem]);
    setNewLoadName("");
    triggerNotification("success", `Added "${newItem.name}" to load list!`);
  };

  const handleRemoveLoad = (id: string) => {
    setLoadList(loadList.filter(item => item.id !== id));
  };

  const handleCopySummary = () => {
    const activeLoadW = activeTab === "multi_load" ? results.multiTotalContinuousW : results.basicLoadPowerW;
    const recommendedW = activeTab === "multi_load" ? results.multiRecommendedPsuW : results.recommendedPsuWattageW;

    const text = `Power Supply Sizing Summary
-----------------------------------------
Active Operating Mode: ${activeTab.toUpperCase()}
System Supply Voltage: ${voltageV} V DC
Total Continuous Load Power: ${activeLoadW.toFixed(1)} W
Total Continuous Load Current: ${(voltageV > 0 ? activeLoadW / voltageV : 0).toFixed(2)} A
-----------------------------------------
Minimum Required PSU Rating: ${activeLoadW.toFixed(1)} W
Recommended PSU Capacity (${safetyMarginPct}% Headroom): ${recommendedW.toFixed(1)} W
Recommended PSU Current Rating: ${(voltageV > 0 ? recommendedW / voltageV : 0).toFixed(2)} A
Input Power Required (${efficiencyPct}% Efficiency): ${results.inputPowerW.toFixed(1)} W
Heat Dissipation Loss: ${results.powerLossHeatW.toFixed(1)} W
Apparent Power Rating: ${results.apparentPowerVa.toFixed(1)} VA (PF: ${powerFactorPf})`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Power Supply sizing summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What recommended power supply wattage is needed for a 12V 4A DC load with a 25% safety margin?", correctAnswer: 60, units: "W" },
      { q: "What is the heat dissipation loss of a 100W load powered by an 80% efficient power supply?", correctAnswer: 25, units: "W" },
      { q: "What Apparent Power (VA) is required for a 450W Real Power load with a 0.90 Power Factor?", correctAnswer: 500, units: "VA" }
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
    setQuizIsCorrect(diff < 3);
    setQuizChecked(true);
  };

  return (
    <div className="w-full">
      {/* Alert Notification */}
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
          Power Engineering Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Power Supply
          </span>
          <Link href="/calculators/electrical-power-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electrical Power
          </Link>
          <Link href="/calculators/ohms-law-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Ohm's Law
          </Link>
          <Link href="/calculators/led-resistor-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            LED Resistor
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
                <Cpu className="text-[#518231]" />
                PSU Design Cockpit
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
                { key: "basic_dc_ac", label: "Single" },
                { key: "multi_load", label: "Multi" },
                { key: "pc_server", label: "PC/Server" },
                { key: "led_motor", label: "Strip/Motor" },
                { key: "battery_ups", label: "UPS" }
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

            {/* Voltage Mismatch Warning */}
            {results.voltageMismatchDetected && activeTab === "multi_load" && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-300 rounded-2xl text-xs flex items-center gap-2">
                <AlertTriangle size={16} className="shrink-0" />
                <span>Voltage Mismatch Warning: Some connected loads have voltages differing from system supply voltage ({voltageV}V). Ensure buck/boost regulators are present!</span>
              </div>
            )}

            {/* Dynamic Tab Inputs */}
            <div className="space-y-5">
              
              {/* Primary Recommended PSU Output */}
              <ReadOnlyField 
                label="Recommended PSU Capacity" 
                val={`${(activeTab === "multi_load" ? results.multiRecommendedPsuW : activeTab === "pc_server" ? results.pcRecommendedPsuW : results.recommendedPsuWattageW).toFixed(0)} Watts (${safetyMarginPct}% Safety Headroom)`} 
                icon={Zap} 
              />

              {/* Supply Voltage (Volts DC) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Supply Voltage (Volts DC/AC)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={voltageV}
                    onChange={(e) => setVoltageV(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                
                {/* Voltage Presets */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {[5, 9, 12, 19, 24, 48].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVoltageV(v)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all border ${
                        voltageV === v 
                          ? "bg-[#518231] text-white border-[#518231]" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {v}V DC
                    </button>
                  ))}
                </div>
              </div>

              {/* Single Load Current (Amps) for Tab 1 */}
              {activeTab === "basic_dc_ac" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Continuous Load Current (Amps)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={currentA}
                      onChange={(e) => setCurrentA(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="50"
                    step="0.5"
                    value={currentA}
                    onChange={(e) => setCurrentA(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              )}

              {/* Safety Margin Headroom Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Safety Margin Headroom (%)</span>
                  <span className="font-bold text-[#518231]">{safetyMarginPct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  {[10, 20, 25, 30, 50].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSafetyMarginPct(m)}
                      className={`flex-1 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                        safetyMarginPct === m 
                          ? "bg-[#518231] text-white border-[#518231]" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {m}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab 2: Multi-Load Builder Inputs */}
              {activeTab === "multi_load" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white text-xs block">Multi-Device System Builder</span>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {loadList.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2 rounded-xl text-xs border border-slate-200/50 dark:border-slate-800">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                          <span className="text-[10px] text-slate-400">{item.voltage}V · {item.current}A ({item.voltage * item.current}W)</span>
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
                      placeholder="Volts"
                      value={newLoadVoltage}
                      onChange={(e) => setNewLoadVoltage(Number(e.target.value))}
                      className="bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Amps"
                      value={newLoadCurrent}
                      onChange={(e) => setNewLoadCurrent(Number(e.target.value))}
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

              {/* Tab 3: PC / Server Sizing Inputs */}
              {activeTab === "pc_server" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">PC & Workstation Component Power</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400">CPU Power (Watts)</span>
                      <input
                        type="number"
                        value={cpuPowerW}
                        onChange={(e) => setCpuPowerW(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">GPU Power (Watts)</span>
                      <input
                        type="number"
                        value={gpuPowerW}
                        onChange={(e) => setGpuPowerW(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Mode: Efficiency & Power Factor Inputs */}
              {isAdvancedMode && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">PSU Efficiency & AC Power Factor</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Efficiency (%)</span>
                      <select
                        value={efficiencyPct}
                        onChange={(e) => setEfficiencyPct(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value={75}>75% (Standard Adapter)</option>
                        <option value={80}>80% (80 Plus White)</option>
                        <option value={85}>85% (80 Plus Bronze)</option>
                        <option value={90}>90% (80 Plus Gold)</option>
                        <option value={94}>94% (80 Plus Platinum)</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Power Factor (PF)</span>
                      <select
                        value={powerFactorPf}
                        onChange={(e) => setPowerFactorPf(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value={0.70}>0.70 (Non-PFC)</option>
                        <option value={0.90}>0.90 (Active PFC)</option>
                        <option value={0.99}>0.99 (Industrial High-PFC)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Link to Electrical Power Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need electrical energy & power conversions?</span>
              <span className="text-[11px] text-slate-500">Calculate P = V · I · PF across 3-phase systems</span>
            </div>
            <Link
              href="/calculators/electrical-power-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Electrical Power
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Power Flow & Analytics Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Dynamic Interactive Power Flow Visualizer */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                ⚡ Dynamic Interactive Power Flow Diagram
              </span>
              <span className="text-xs font-bold text-green-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                Eff: {efficiencyPct}%
              </span>
            </div>

            {/* Interactive SVG Power Flow Pipeline */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              {/* Formula Readout */}
              <div className="text-center mb-4 font-mono text-xs sm:text-sm">
                <span className="text-slate-400">Formula: </span>
                <span className="text-white font-bold">P_input = P_load / η = {results.inputPowerW.toFixed(1)}W (Heat Loss: </span>
                <span className="text-amber-400 font-bold">{results.powerLossHeatW.toFixed(1)}W</span>
                <span className="text-white font-bold">)</span>
              </div>

              {/* SVG Node Pipeline Diagram */}
              <div className="w-full max-w-md h-36 relative flex items-center justify-center">
                <svg viewBox="0 0 400 120" className="w-full h-full">
                  
                  {/* Flow Arrow Pipes */}
                  <path d="M 80 60 L 160 60" stroke="#3b82f6" strokeWidth="4" strokeDasharray="6 4" className="animate-[dash_10s_linear_infinite]" />
                  <path d="M 240 60 L 320 60" stroke="#10b981" strokeWidth="4" strokeDasharray="6 4" className="animate-[dash_10s_linear_infinite]" />
                  
                  {/* Heat Dissipation Chimney Pipe */}
                  <path d="M 200 45 L 200 15" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 2" />

                  {/* AC Input Node */}
                  <g transform="translate(10, 35)">
                    <rect x="0" y="0" width="70" height="50" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="8" />
                    <text x="35" y="22" fill="#3b82f6" fontSize="11" fontWeight="bold" textAnchor="middle">AC Input</text>
                    <text x="35" y="38" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">{results.inputPowerW.toFixed(0)} W</text>
                  </g>

                  {/* PSU Conversion Node */}
                  <g transform="translate(160, 30)">
                    <rect x="0" y="0" width="80" height="60" fill="#0f172a" stroke="#518231" strokeWidth="2.5" rx="10" />
                    <text x="40" y="24" fill="#518231" fontSize="12" fontWeight="bold" textAnchor="middle">PSU</text>
                    <text x="40" y="42" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">{efficiencyPct}% Eff</text>
                  </g>

                  {/* Heat Loss Indicator (Top) */}
                  <text x="200" y="10" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">Heat: {results.powerLossHeatW.toFixed(0)}W</text>

                  {/* Connected Load Node */}
                  <g transform="translate(320, 35)">
                    <rect x="0" y="0" width="70" height="50" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="8" />
                    <text x="35" y="22" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">DC Load</text>
                    <text x="35" y="38" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">{(activeTab === "multi_load" ? results.multiTotalContinuousW : results.basicLoadPowerW).toFixed(0)} W</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Min PSU Needed</span>
                <span className="text-xs font-black text-white">{(activeTab === "multi_load" ? results.multiTotalContinuousW : results.basicLoadPowerW).toFixed(0)} W</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Recommended</span>
                <span className="text-xs font-black text-green-400">{(activeTab === "multi_load" ? results.multiRecommendedPsuW : results.recommendedPsuWattageW).toFixed(0)} W</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Apparent Power</span>
                <span className="text-xs font-black text-amber-400">{results.apparentPowerVa.toFixed(0)} VA</span>
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
                {(["flow", "breakdown", "charts", "quiz"] as const).map(tab => (
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
                    {tab === "flow" ? "Overview" : tab === "breakdown" ? "📊 Multi Breakdown" : tab === "charts" ? "📈 PSU Capacity" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Overview Theory */}
                {visualTab === "flow" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚡ Power Supply Sizing Engineering Principles</h4>
                    <p className="leading-relaxed">
                      Sizing a power supply requires accounting for peak continuous load power, AC power factor (PF), conversion efficiency losses (η), and thermal headroom margins (1.25x). Operating PSUs at 50% - 80% load maximizes lifetime and thermal stability.
                    </p>
                  </div>
                )}

                {/* Tab 2: Recharts Pie Chart (Multi-load breakdown) */}
                {visualTab === "breakdown" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Multi-Device Load Power Distribution</h4>
                    {isClient ? (
                      <div className="h-52 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(val: any) => [`${val} W`, "Power"]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading breakdown chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 3: Recharts Bar Chart (PSU Capacity Headroom) */}
                {visualTab === "charts" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">PSU Headroom Comparison (Watts)</h4>
                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={psuComparisonData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(val: any) => [`${val} W`, "Capacity"]} />
                            <Bar dataKey="Wattage" fill="#518231" radius={[6, 6, 0, 0]} />
                          </BarChart>
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Power Supply Engineering Quiz</h4>
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
