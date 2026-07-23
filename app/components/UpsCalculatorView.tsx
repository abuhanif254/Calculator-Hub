"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Battery, Server, RefreshCw, ExternalLink, ShieldCheck, Gauge, HardDrive, Wifi, Tv
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

type CategoryTab = "basic_sizing" | "multi_load_surge" | "battery_runtime" | "n1_redundancy" | "generator_topology";

interface CustomUpsLoad {
  id: string;
  name: string;
  powerW: number;
  powerFactor: number;
  quantity: number;
  surgeMultiplier: number; // e.g. 1.0 for PC, 2.5 for printer/fridge
  isCritical: boolean;
}

const DEFAULT_UPS_LOADS: CustomUpsLoad[] = [
  { id: "1", name: "Rack Server", powerW: 450, powerFactor: 0.95, quantity: 1, surgeMultiplier: 1.1, isCritical: true },
  { id: "2", name: "Network Switch & Firewall", powerW: 80, powerFactor: 0.90, quantity: 1, surgeMultiplier: 1.0, isCritical: true },
  { id: "3", name: "Wi-Fi Router & Modem", powerW: 25, powerFactor: 0.85, quantity: 1, surgeMultiplier: 1.0, isCritical: true },
  { id: "4", name: "Workstation PC & Dual Monitors", powerW: 350, powerFactor: 0.90, quantity: 1, surgeMultiplier: 1.2, isCritical: false }
];

export function UpsCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("basic_sizing");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Tab 1: Basic Sizing Inputs
  const [loadPowerW, setLoadPowerW] = useState<number>(500); // Watts
  const [systemPf, setSystemPf] = useState<number>(0.85); // 0.85 PF
  const [safetyMarginPct, setSafetyMarginPct] = useState<number>(25); // 25% safety margin
  const [futureExpansionPct, setFutureExpansionPct] = useState<number>(20); // 20% future expansion

  // Selected Installed UPS Capacity (for Utilization Gauge)
  const [installedUpsVa, setInstalledUpsVa] = useState<number>(1500); // 1500 VA UPS

  // Tab 2: Multi-Load State
  const [loadList, setLoadList] = useState<CustomUpsLoad[]>(DEFAULT_UPS_LOADS);
  const [newLoadName, setNewLoadName] = useState<string>("");
  const [newLoadW, setNewLoadW] = useState<number>(100);
  const [newLoadPf, setNewLoadPf] = useState<number>(0.90);
  const [newLoadSurge, setNewLoadSurge] = useState<number>(1.5);
  const [newLoadCritical, setNewLoadCritical] = useState<boolean>(true);

  // Tab 3: Battery Bank State
  const [batteryVoltageV, setBatteryVoltageV] = useState<number>(12.0); // 12V batteries
  const [batteryCapacityAh, setBatteryCapacityAh] = useState<number>(100.0); // 100Ah
  const [seriesCount, setSeriesCount] = useState<number>(2); // 2 in series = 24V bank
  const [parallelCount, setParallelCount] = useState<number>(1); // 1 parallel string
  const [upsEffPct, setUpsEffPct] = useState<number>(90); // 90% UPS inverter efficiency
  const [dodPct, setDodPct] = useState<number>(80); // 80% Depth of discharge

  // Tab 4: N+1 Enterprise Redundancy State
  const [upsModuleCapacityKva, setUpsModuleCapacityKva] = useState<number>(10.0); // 10 kVA modules
  const [redundantModulesCount, setRedundantModulesCount] = useState<number>(1); // N+1

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"gauge" | "battery" | "redundancy" | "charts" | "quiz">("gauge");

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
    // 1. Total Load Power Determination
    let activeContinuousPowerW = loadPowerW;
    let activeContinuousVa = loadPowerW / Math.max(0.1, systemPf);
    let activePeakPowerW = loadPowerW;
    let criticalPowerW = loadPowerW;

    if (activeTab === "multi_load_surge") {
      activeContinuousPowerW = loadList.reduce((sum, item) => sum + item.powerW * item.quantity, 0);
      activeContinuousVa = loadList.reduce((sum, item) => sum + (item.powerW / Math.max(0.1, item.powerFactor)) * item.quantity, 0);
      activePeakPowerW = loadList.reduce((sum, item) => sum + (item.powerW * item.surgeMultiplier) * item.quantity, 0);
      criticalPowerW = loadList.filter(item => item.isCritical).reduce((sum, item) => sum + item.powerW * item.quantity, 0);
    }

    const calculatedOverallPf = activeContinuousVa > 0 ? activeContinuousPowerW / activeContinuousVa : systemPf;

    // 2. Recommended UPS Sizing (VA & Watts)
    const safetyMultiplier = 1 + (safetyMarginPct / 100);
    const expansionMultiplier = 1 + (futureExpansionPct / 100);
    const totalSizingMultiplier = safetyMultiplier * expansionMultiplier;

    const requiredUpsVa = activeContinuousVa * totalSizingMultiplier;
    const requiredUpsW = activeContinuousPowerW * totalSizingMultiplier;

    // Nearest Standard UPS VA Rating (e.g. 600, 1000, 1500, 2200, 3000, 5000, 10000)
    const standardVaRatings = [600, 1000, 1500, 2000, 3000, 5000, 8000, 10000, 15000, 20000, 30000];
    const recommendedStandardVa = standardVaRatings.find(r => r >= requiredUpsVa) || Math.ceil(requiredUpsVa / 1000) * 1000;

    // 3. UPS Utilization Gauge Analysis
    const effectiveInstalledVa = Math.max(1, installedUpsVa);
    const upsUtilizationPct = (activeContinuousVa / effectiveInstalledVa) * 100;

    let utilizationStatus: "low" | "optimal" | "high" | "capacity" | "overload" = "optimal";
    if (upsUtilizationPct < 40) utilizationStatus = "low";
    else if (upsUtilizationPct <= 75) utilizationStatus = "optimal";
    else if (upsUtilizationPct <= 90) utilizationStatus = "high";
    else if (upsUtilizationPct <= 100) utilizationStatus = "capacity";
    else utilizationStatus = "overload";

    // 4. Battery Bank & Runtime Sizing
    const bankTotalVoltageV = batteryVoltageV * seriesCount;
    const bankTotalCapacityAh = batteryCapacityAh * parallelCount;
    const totalBatteryCount = seriesCount * parallelCount;
    const totalBatteryEnergyWh = bankTotalVoltageV * bankTotalCapacityAh;

    const usableEnergyWh = totalBatteryEnergyWh * (dodPct / 100);
    const batterySidePowerW = activeContinuousPowerW / (upsEffPct / 100);
    const estimatedRuntimeHours = batterySidePowerW > 0 ? usableEnergyWh / batterySidePowerW : 0;

    // 5. N+1 Enterprise Redundancy Sizing
    const activeLoadKva = activeContinuousVa / 1000;
    const activeModulesNeeded = Math.ceil(activeLoadKva / Math.max(0.1, upsModuleCapacityKva));
    const totalModulesInstalled = activeModulesNeeded + redundantModulesCount;
    const totalN1InstalledKva = totalModulesInstalled * upsModuleCapacityKva;
    const capacityAfterSingleFailureKva = (totalModulesInstalled - 1) * upsModuleCapacityKva;

    // Generator Sizing Recommendation (1.5x - 2.0x of UPS Rating)
    const recommendedGeneratorKva = (recommendedStandardVa / 1000) * 1.5;

    return {
      activeContinuousPowerW,
      activeContinuousVa,
      activePeakPowerW,
      criticalPowerW,
      calculatedOverallPf,
      requiredUpsVa,
      requiredUpsW,
      recommendedStandardVa,
      upsUtilizationPct,
      utilizationStatus,
      bankTotalVoltageV,
      bankTotalCapacityAh,
      totalBatteryCount,
      totalBatteryEnergyWh,
      usableEnergyWh,
      batterySidePowerW,
      estimatedRuntimeHours,
      activeLoadKva,
      activeModulesNeeded,
      totalModulesInstalled,
      totalN1InstalledKva,
      capacityAfterSingleFailureKva,
      recommendedGeneratorKva
    };
  }, [
    loadPowerW, systemPf, activeTab, loadList, safetyMarginPct, futureExpansionPct, installedUpsVa,
    batteryVoltageV, batteryCapacityAh, seriesCount, parallelCount, upsEffPct, dodPct,
    upsModuleCapacityKva, redundantModulesCount
  ]);

  // Recharts Chart Data (Runtime vs Load Power)
  const runtimeVsLoadData = useMemo(() => {
    const data = [];
    for (let p = 100; p <= 1500; p += 100) {
      const batSideW = p / (upsEffPct / 100);
      const hours = batSideW > 0 ? results.usableEnergyWh / batSideW : 0;
      data.push({
        LoadPowerW: p,
        RuntimeHours: Number(hours.toFixed(1)),
        RuntimeMins: Math.round(hours * 60)
      });
    }
    return data;
  }, [results.usableEnergyWh, upsEffPct]);

  // Handlers for Multi-Load List
  const handleAddLoad = () => {
    if (!newLoadName.trim()) {
      triggerNotification("error", "Please enter a valid load description name.");
      return;
    }
    const newItem: CustomUpsLoad = {
      id: Date.now().toString(),
      name: newLoadName.trim(),
      powerW: newLoadW,
      powerFactor: newLoadPf,
      quantity: 1,
      surgeMultiplier: newLoadSurge,
      isCritical: newLoadCritical
    };
    setLoadList([...loadList, newItem]);
    setNewLoadName("");
    triggerNotification("success", `Added "${newItem.name}" to UPS load profile!`);
  };

  const handleRemoveLoad = (id: string) => {
    setLoadList(loadList.filter(item => item.id !== id));
  };

  const handleCopySummary = () => {
    const hours = Math.floor(results.estimatedRuntimeHours);
    const mins = Math.round((results.estimatedRuntimeHours - hours) * 60);

    const text = `UPS Sizing & Backup Analysis Summary
-----------------------------------------
Continuous Load: ${results.activeContinuousPowerW.toFixed(0)} W / ${results.activeContinuousVa.toFixed(0)} VA (PF: ${results.calculatedOverallPf.toFixed(2)})
Peak Load (with surge): ${results.activePeakPowerW.toFixed(0)} W
-----------------------------------------
RECOMMENDED UPS CAPACITY: ${results.recommendedStandardVa} VA (${(results.recommendedStandardVa * systemPf).toFixed(0)} W)
Safety Margin: ${safetyMarginPct}% · Future Expansion: ${futureExpansionPct}%
Utilization Rate (${installedUpsVa} VA UPS): ${results.upsUtilizationPct.toFixed(1)}% (${results.utilizationStatus.toUpperCase()})
-----------------------------------------
UPS Battery Bank: ${results.bankTotalVoltageV}V ${results.bankTotalCapacityAh}Ah (${results.totalBatteryEnergyWh.toFixed(0)} Wh Total Stored)
ESTIMATED BACKUP RUNTIME: ${hours} Hours ${mins} Mins (${results.estimatedRuntimeHours.toFixed(1)} Hours)
N+1 Redundancy: ${results.activeModulesNeeded}+${redundantModulesCount} Modules (${results.totalN1InstalledKva} kVA Total Installed)
Recommended Generator Capacity: ${results.recommendedGeneratorKva.toFixed(1)} kVA`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "UPS analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the Apparent Power (VA) required for a 600W server load operating at a 0.85 Power Factor?", correctAnswer: 706, units: "VA" },
      { q: "What is the recommended UPS VA capacity for a 706 VA load with a 25% safety headroom margin?", correctAnswer: 883, units: "VA" },
      { q: "What is the backup runtime (Hours) of a 1200Wh usable battery bank supplying a 300W load at 90% UPS efficiency (333W draw)?", correctAnswer: 3.6, units: "Hours" }
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
          UPS & Power Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            UPS Calculator
          </span>
          <Link href="/calculators/battery-runtime-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Battery Runtime
          </Link>
          <Link href="/calculators/power-supply-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Power Supply
          </Link>
          <Link href="/calculators/power-factor-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Power Factor
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
                <ShieldCheck className="text-[#518231]" />
                UPS Cockpit
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
                { key: "basic_sizing", label: "Sizing" },
                { key: "multi_load_surge", label: "Loads" },
                { key: "battery_runtime", label: "Runtime" },
                { key: "n1_redundancy", label: "N+1" },
                { key: "generator_topology", label: "Gen/Topo" }
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
                label="Recommended UPS Sizing" 
                val={`${results.recommendedStandardVa} VA (${results.requiredUpsW.toFixed(0)} W)`} 
                icon={Zap} 
              />

              {/* Connected Load Power (Watts) for Tab 1 */}
              {activeTab === "basic_sizing" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Total Continuous Load (Watts)</span>
                    <input
                      type="number"
                      step="25"
                      value={loadPowerW}
                      onChange={(e) => setLoadPowerW(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="3000"
                    step="25"
                    value={loadPowerW}
                    onChange={(e) => setLoadPowerW(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              )}

              {/* Power Factor (PF) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Equipment Power Factor (PF)</span>
                  <input
                    type="number"
                    step="0.05"
                    min="0.5"
                    max="1.0"
                    value={systemPf}
                    onChange={(e) => setSystemPf(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {[0.7, 0.8, 0.85, 0.9, 0.95].map(pf => (
                    <button
                      key={pf}
                      type="button"
                      onClick={() => setSystemPf(pf)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all border ${
                        systemPf === pf 
                          ? "bg-[#518231] text-white border-[#518231]" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      PF {pf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Installed UPS Capacity (for Gauge) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Target UPS VA Rating (Gauge Target)</span>
                  <input
                    type="number"
                    step="100"
                    value={installedUpsVa}
                    onChange={(e) => setInstalledUpsVa(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
              </div>

              {/* Tab 2: Multi-Load & Surge Builder */}
              {activeTab === "multi_load_surge" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Multi-Device UPS Load Breakdown</span>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {loadList.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {item.name} {item.isCritical && <span className="text-[9px] bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 px-1.5 py-0.5 rounded-md ml-1 font-extrabold">CRITICAL</span>}
                          </span>
                          <span className="text-[10px] text-slate-400">{item.powerW}W × {item.quantity} · Surge: {item.surgeMultiplier}x</span>
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
                      placeholder="Device Description"
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
                      placeholder="Surge Multiplier"
                      step="0.1"
                      value={newLoadSurge}
                      onChange={(e) => setNewLoadSurge(Number(e.target.value))}
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

              {/* Tab 3: UPS Battery Bank Runtime */}
              {activeTab === "battery_runtime" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">UPS Internal/External Battery Bank</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Batteries in Series (Voltage × N)</span>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        value={seriesCount}
                        onChange={(e) => setSeriesCount(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Battery Ah Rating</span>
                      <input
                        type="number"
                        value={batteryCapacityAh}
                        onChange={(e) => setBatteryCapacityAh(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: N+1 Redundancy */}
              {activeTab === "n1_redundancy" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Enterprise Modular UPS Sizing (N+1)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Module Capacity (kVA)</span>
                      <input
                        type="number"
                        value={upsModuleCapacityKva}
                        onChange={(e) => setUpsModuleCapacityKva(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Redundant Modules (+1 / +2)</span>
                      <input
                        type="number"
                        min="1"
                        max="3"
                        value={redundantModulesCount}
                        onChange={(e) => setRedundantModulesCount(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Mode: Safety & Expansion Margins */}
              {isAdvancedMode && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Headroom Margins (Safety & Expansion)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Safety Headroom (%)</span>
                      <select
                        value={safetyMarginPct}
                        onChange={(e) => setSafetyMarginPct(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value={15}>15% (Minimum)</option>
                        <option value={20}>20% (Standard)</option>
                        <option value={25}>25% (Recommended)</option>
                        <option value={30}>30% (High Margin)</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Future Expansion (%)</span>
                      <select
                        value={futureExpansionPct}
                        onChange={(e) => setFutureExpansionPct(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value={10}>10% Growth</option>
                        <option value={20}>20% Recommended Growth</option>
                        <option value={30}>30% Enterprise Growth</option>
                        <option value={50}>50% High Expansion</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Link to Battery Runtime Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need deep battery chemistry analysis?</span>
              <span className="text-[11px] text-slate-500">Analyze Peukert's Law & LiFePO4 vs Lead-Acid discharge curves</span>
            </div>
            <Link
              href="/calculators/battery-runtime-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Battery Runtime
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive UPS Power Flow & Load Utilization Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Dynamic Interactive UPS Power Flow & Load Gauge */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                ⚡ Dynamic Interactive UPS Load & Power Flow Gauge
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                results.utilizationStatus === "overload" ? "bg-red-900 text-red-200 animate-pulse" :
                results.utilizationStatus === "capacity" ? "bg-amber-900 text-amber-200" :
                "bg-slate-800 text-green-400"
              }`}>
                Util: {results.upsUtilizationPct.toFixed(1)}% ({results.utilizationStatus.toUpperCase()})
              </span>
            </div>

            {/* SVG Interactive UPS Power Flow Pipeline */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              {/* Load Bar Gauge */}
              <div className="w-full mb-4">
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span className="text-slate-400">UPS Utilization ({results.activeContinuousVa.toFixed(0)} VA / {installedUpsVa} VA)</span>
                  <span className={results.upsUtilizationPct > 100 ? "text-red-400 font-black" : "text-[#518231]"}>
                    {results.upsUtilizationPct.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      results.upsUtilizationPct > 100 ? "bg-red-500" :
                      results.upsUtilizationPct > 80 ? "bg-amber-500" : "bg-[#518231]"
                    }`}
                    style={{ width: `${Math.min(100, results.upsUtilizationPct)}%` }}
                  />
                </div>
              </div>

              {/* SVG Pipeline Visualizer */}
              <div className="w-full max-w-md h-32 relative flex items-center justify-center">
                <svg viewBox="0 0 400 110" className="w-full h-full">
                  
                  {/* Utility AC Node */}
                  <rect x="20" y="25" width="80" height="60" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="8" />
                  <text x="60" y="55" fill="#3b82f6" fontSize="11" fontWeight="bold" textAnchor="middle">Utility AC</text>
                  <text x="60" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle">230V Mains</text>

                  {/* Flow Arrow */}
                  <line x1="100" y1="55" x2="160" y2="55" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5 3" />

                  {/* UPS Node */}
                  <rect x="160" y="20" width="100" height="70" fill="#0f172a" stroke="#518231" strokeWidth="2.5" rx="8" />
                  <text x="210" y="50" fill="#518231" fontSize="12" fontWeight="bold" textAnchor="middle">UPS Inverter</text>
                  <text x="210" y="68" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">{results.recommendedStandardVa} VA</text>

                  {/* Flow Arrow */}
                  <line x1="260" y1="55" x2="310" y2="55" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />

                  {/* Connected Load Node */}
                  <rect x="310" y="25" width="75" height="60" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" rx="8" />
                  <text x="347" y="52" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Load</text>
                  <text x="347" y="68" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">{results.activeContinuousPowerW.toFixed(0)}W</text>
                </svg>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Recommended VA</span>
                <span className="text-xs font-black text-white">{results.recommendedStandardVa} VA</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Peak Load (Surge)</span>
                <span className="text-xs font-black text-amber-400">{results.activePeakPowerW.toFixed(0)} W</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Backup Runtime</span>
                <span className="text-xs font-black text-[#518231]">{results.estimatedRuntimeHours.toFixed(1)} Hours</span>
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
                {(["gauge", "battery", "redundancy", "charts", "quiz"] as const).map(tab => (
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
                    {tab === "gauge" ? "Overview" : tab === "battery" ? "🔋 Battery Bank" : tab === "redundancy" ? "🛡️ N+1 Modular" : tab === "charts" ? "📊 Curves" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Overview */}
                {visualTab === "gauge" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚡ UPS Capacity Sizing Engineering Principles</h4>
                    <p className="leading-relaxed">
                      UPS sizing calculates both **Apparent Power (S = P / PF)** and **Real Power (P)**. Sizing includes a {safetyMarginPct}% safety headroom and {futureExpansionPct}% expansion margin to prevent tripping during startup surges.
                    </p>
                  </div>
                )}

                {/* Tab 2: Battery Bank Diagram */}
                {visualTab === "battery" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">UPS Series-Parallel Battery Bank Configurator</h4>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Total Battery Bank Voltage:</span>
                        <span className="font-bold text-[#518231]">{results.bankTotalVoltageV} V DC</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Total Battery Capacity:</span>
                        <span className="font-bold text-white">{results.bankTotalCapacityAh} Ah</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Total Stored Energy:</span>
                        <span className="font-bold text-amber-400">{results.totalBatteryEnergyWh.toFixed(0)} Wh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cell Count / Wiring:</span>
                        <span className="font-bold text-slate-400">{seriesCount} Series × {parallelCount} Parallel ({results.totalBatteryCount} Units)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: N+1 Redundancy Diagram */}
                {visualTab === "redundancy" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Data Center N+1 Modular Redundancy Layout</h4>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-center font-bold">
                        <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Active Needed</span>
                          <span className="text-sm text-white">{results.activeModulesNeeded} Modules</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Redundant (+1)</span>
                          <span className="text-sm text-[#518231]">+{redundantModulesCount} Module</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Installed Capacity</span>
                          <span className="text-sm text-amber-400">{results.totalN1InstalledKva} kVA</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        In N+{redundantModulesCount} configuration, if 1 module fails, the remaining {results.totalModulesInstalled - 1} modules maintain full {results.activeLoadKva.toFixed(1)} kVA load with zero downtime.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 4: Recharts Graph */}
                {visualTab === "charts" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">UPS Runtime vs Load Power (W)</h4>
                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={runtimeVsLoadData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="LoadPowerW" label={{ value: 'Load Power (W)', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis />
                            <Tooltip formatter={(val: any) => [`${val} Hours`, "Runtime"]} />
                            <Line type="monotone" dataKey="RuntimeHours" stroke="#518231" strokeWidth={2.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 5: Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">UPS Sizing & Engineering Quiz</h4>
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
