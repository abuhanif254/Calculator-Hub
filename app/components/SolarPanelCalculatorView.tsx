"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Thermometer, ShieldAlert, ArrowDown, Plus, Trash2, Battery, Server, RefreshCw, ExternalLink, ShieldCheck, Gauge, HardDrive, Wifi, Tv, SunDim, Compass, Grid, TrendingUp, Leaf
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

type CategoryTab = "basic_sizing" | "appliance_builder" | "array_stringing" | "battery_storage" | "financial_eco";

interface CustomAppliance {
  id: string;
  name: string;
  powerW: number;
  hoursPerDay: number;
  quantity: number;
  dutyCyclePct: number;
}

const DEFAULT_SOLAR_LOADS: CustomAppliance[] = [
  { id: "1", name: "Refrigerator", powerW: 150, hoursPerDay: 24, quantity: 1, dutyCyclePct: 50 },
  { id: "2", name: "Ceiling Fans", powerW: 75, hoursPerDay: 8, quantity: 3, dutyCyclePct: 100 },
  { id: "3", name: "LED Household Lights", powerW: 12, hoursPerDay: 5, quantity: 8, dutyCyclePct: 100 },
  { id: "4", name: "LED TV & Router", powerW: 120, hoursPerDay: 6, quantity: 1, dutyCyclePct: 100 }
];

export function SolarPanelCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("basic_sizing");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Tab 1: Basic Solar Sizing Inputs
  const [dailyLoadKwh, setDailyLoadKwh] = useState<number>(15.0); // 15 kWh/day
  const [peakSunHours, setPeakSunHours] = useState<number>(5.0); // 5.0 hours/day
  const [panelWattageW, setPanelWattageW] = useState<number>(450); // 450W solar module
  const [systemDeratingPct, setSystemDeratingPct] = useState<number>(82); // 82% System efficiency (18% losses)

  // Tab 2: Appliance Builder Load State
  const [loadList, setLoadList] = useState<CustomAppliance[]>(DEFAULT_SOLAR_LOADS);
  const [newLoadName, setNewLoadName] = useState<string>("");
  const [newLoadW, setNewLoadW] = useState<number>(100);
  const [newLoadHours, setNewLoadHours] = useState<number>(6);

  // Tab 3: Panel Stringing & MPPT Range Inputs
  const [panelVmp, setPanelVmp] = useState<number>(41.5); // 41.5V Vmp
  const [panelVoc, setPanelVoc] = useState<number>(49.2); // 49.2V Voc
  const [panelImp, setPanelImp] = useState<number>(10.85); // 10.85A Imp
  const [panelIsc, setPanelIsc] = useState<number>(11.50); // 11.50A Isc
  const [seriesCount, setSeriesCount] = useState<number>(5); // 5 panels in series
  const [mpptVmin, setMpptVmin] = useState<number>(120); // 120V MPPT Min
  const [mpptVmax, setMpptVmax] = useState<number>(500); // 500V MPPT Max

  // Tab 4: Battery Storage Inputs
  const [autonomyDays, setAutonomyDays] = useState<number>(1.5); // 1.5 Days backup
  const [batteryBankVoltageV, setBatteryBankVoltageV] = useState<number>(48); // 48V Battery Bank
  const [batteryDodPct, setBatteryDodPct] = useState<number>(80); // 80% DoD

  // Tab 5: Financial ROI & Carbon Offsets
  const [elecRatePerKwh, setElecRatePerKwh] = useState<number>(0.16); // $0.16 / kWh
  const [installedCostPerWatt, setInstalledCostPerWatt] = useState<number>(2.80); // $2.80 / Watt installed

  // Visual Tab State
  const [visualTab, setVisualTab] = useState<"gauge" | "grid" | "string" | "payback" | "quiz">("gauge");

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
    // 1. Daily Load Determination
    let activeDailyLoadKwh = dailyLoadKwh;
    if (activeTab === "appliance_builder") {
      const dailyWh = loadList.reduce((sum, item) => sum + (item.powerW * item.hoursPerDay * item.quantity * (item.dutyCyclePct / 100)), 0);
      activeDailyLoadKwh = dailyWh / 1000;
    }

    // 2. Required Array Power (kW) & Panel Sizing
    const deratingDecimal = Math.max(0.1, systemDeratingPct / 100);
    const effectiveSunHours = Math.max(0.5, peakSunHours);

    const requiredArrayWatts = (activeDailyLoadKwh * 1000) / (effectiveSunHours * deratingDecimal);
    const requiredPanelCount = Math.ceil(requiredArrayWatts / Math.max(50, panelWattageW));
    const installedCapacityKw = (requiredPanelCount * panelWattageW) / 1000;

    // 3. Estimated Energy Generation
    const dailySolarGenKwh = installedCapacityKw * effectiveSunHours * deratingDecimal;
    const monthlySolarGenKwh = dailySolarGenKwh * 30;
    const annualSolarGenKwh = dailySolarGenKwh * 365;

    // 4. Roof Area Calculation
    const singlePanelAreaSqM = 1.95; // Standard 450W panel area ~1.95 m²
    const totalPanelAreaSqM = requiredPanelCount * singlePanelAreaSqM;
    const totalInstallationAreaSqM = totalPanelAreaSqM * 1.15; // 15% spacing margin

    // 5. Panel Stringing & MPPT Range Check
    const parallelStringsCount = Math.max(1, Math.ceil(requiredPanelCount / Math.max(1, seriesCount)));
    const actualPanelCount = seriesCount * parallelStringsCount;
    const actualInstalledCapacityKw = (actualPanelCount * panelWattageW) / 1000;

    const stringVmp = seriesCount * panelVmp;
    const stringVoc = seriesCount * panelVoc;
    const arrayImp = parallelStringsCount * panelImp;
    const arrayIsc = parallelStringsCount * panelIsc;

    const isMpptCompatible = stringVmp >= mpptVmin && stringVmp <= mpptVmax && stringVoc <= 600;

    // 6. Battery Storage Sizing
    const requiredBatteryEnergyKwh = (activeDailyLoadKwh * autonomyDays) / ((batteryDodPct / 100) * 0.90);
    const requiredBatteryCapacityAh = (requiredBatteryEnergyKwh * 1000) / Math.max(12, batteryBankVoltageV);

    // 7. Financial & Environmental Offset
    const totalSystemCostUsd = actualInstalledCapacityKw * 1000 * installedCostPerWatt;
    const annualGridLoadKwh = activeDailyLoadKwh * 365;
    const solarOffsetPct = Math.min(100, (annualSolarGenKwh / Math.max(1, annualGridLoadKwh)) * 100);
    const annualGrossSavingsUsd = Math.min(annualSolarGenKwh, annualGridLoadKwh) * elecRatePerKwh;
    const simplePaybackYears = annualGrossSavingsUsd > 0 ? totalSystemCostUsd / annualGrossSavingsUsd : 0;
    const annualCo2AvoidedTons = annualSolarGenKwh * 0.0007; // 0.0007 metric tons CO2 / kWh

    return {
      activeDailyLoadKwh,
      requiredArrayWatts,
      requiredPanelCount,
      installedCapacityKw,
      dailySolarGenKwh,
      monthlySolarGenKwh,
      annualSolarGenKwh,
      singlePanelAreaSqM,
      totalPanelAreaSqM,
      totalInstallationAreaSqM,
      parallelStringsCount,
      actualPanelCount,
      actualInstalledCapacityKw,
      stringVmp,
      stringVoc,
      arrayImp,
      arrayIsc,
      isMpptCompatible,
      requiredBatteryEnergyKwh,
      requiredBatteryCapacityAh,
      totalSystemCostUsd,
      annualGridLoadKwh,
      solarOffsetPct,
      annualGrossSavingsUsd,
      simplePaybackYears,
      annualCo2AvoidedTons
    };
  }, [
    dailyLoadKwh, activeTab, loadList, peakSunHours, panelWattageW, systemDeratingPct,
    panelVmp, panelVoc, panelImp, panelIsc, seriesCount, mpptVmin, mpptVmax,
    autonomyDays, batteryDodPct, batteryBankVoltageV, elecRatePerKwh, installedCostPerWatt
  ]);

  // Recharts Monthly Generation vs Demand Data
  const monthlyProductionData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const seasonalMultipliers = [0.75, 0.85, 1.0, 1.15, 1.25, 1.30, 1.28, 1.20, 1.05, 0.90, 0.78, 0.70];
    
    return months.map((m, idx) => {
      const monthGen = (results.monthlySolarGenKwh * seasonalMultipliers[idx]);
      const monthDemand = results.activeDailyLoadKwh * 30;
      return {
        Month: m,
        SolarGenKwh: Number(monthGen.toFixed(0)),
        LoadDemandKwh: Number(monthDemand.toFixed(0))
      };
    });
  }, [results.monthlySolarGenKwh, results.activeDailyLoadKwh]);

  // Recharts Payback Cash Flow Curve Data
  const paybackCurveData = useMemo(() => {
    const data = [];
    let cumulativeCash = -results.totalSystemCostUsd;
    for (let yr = 0; yr <= 15; yr++) {
      data.push({
        Year: `Yr ${yr}`,
        CashFlow: Number(cumulativeCash.toFixed(0))
      });
      cumulativeCash += results.annualGrossSavingsUsd;
    }
    return data;
  }, [results.totalSystemCostUsd, results.annualGrossSavingsUsd]);

  // Handlers for Multi-Appliance List
  const handleAddLoad = () => {
    if (!newLoadName.trim()) {
      triggerNotification("error", "Please enter a valid load description name.");
      return;
    }
    const newItem: CustomAppliance = {
      id: Date.now().toString(),
      name: newLoadName.trim(),
      powerW: newLoadW,
      hoursPerDay: newLoadHours,
      quantity: 1,
      dutyCyclePct: 100
    };
    setLoadList([...loadList, newItem]);
    setNewLoadName("");
    triggerNotification("success", `Added "${newItem.name}" to solar load profile!`);
  };

  const handleRemoveLoad = (id: string) => {
    setLoadList(loadList.filter(item => item.id !== id));
  };

  const handleCopySummary = () => {
    const text = `Solar Panel System Sizing & Energy Analysis Summary
-----------------------------------------
Daily Consumption Load: ${results.activeDailyLoadKwh.toFixed(1)} kWh/day (${(results.activeDailyLoadKwh * 365).toFixed(0)} kWh/year)
Peak Sun Hours: ${peakSunHours} Hours/day · System Efficiency: ${systemDeratingPct}%
-----------------------------------------
REQUIRED SOLAR ARRAY CAPACITY: ${results.actualInstalledCapacityKw.toFixed(2)} kWp (${results.actualPanelCount} × ${panelWattageW}W Panels)
Required Roof Area: ${results.totalInstallationAreaSqM.toFixed(1)} m² (${(results.totalInstallationAreaSqM * 10.764).toFixed(0)} sq ft)
-----------------------------------------
Array Wiring Configuration: ${seriesCount} Series × ${results.parallelStringsCount} Parallel Strings
Array Output: ${results.stringVmp.toFixed(1)}V Vmp · ${results.arrayImp.toFixed(1)}A Imp (MPPT Status: ${results.isMpptCompatible ? "COMPATIBLE" : "CHECK MPPT WINDOW"})
-----------------------------------------
Battery Bank Sizing (${batteryBankVoltageV}V Bank, ${autonomyDays} Days Autonomy):
Required Battery Capacity: ${results.requiredBatteryEnergyKwh.toFixed(1)} kWh (${results.requiredBatteryCapacityAh.toFixed(0)} Ah)
-----------------------------------------
FINANCIAL & CO2 SAVINGS:
Estimated System Cost: $${results.totalSystemCostUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
Annual Electricity Bill Savings: $${results.annualGrossSavingsUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}/year
Solar Offset: ${results.solarOffsetPct.toFixed(1)}% · Payback Period: ${results.simplePaybackYears.toFixed(1)} Years
Annual CO2 Emissions Offset: ${results.annualCo2AvoidedTons.toFixed(2)} Metric Tons/year`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Solar Panel analysis summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the required Solar Array Capacity (kW) for a 15 kWh/day load with 5 Peak Sun Hours at 80% system efficiency?", correctAnswer: 3.75, units: "kW" },
      { q: "How many 450W solar panels are required to meet a 3,750W (3.75 kW) DC solar array requirement?", correctAnswer: 9, units: "Panels" },
      { q: "What is the Vmp array voltage when 6 solar panels with a 41.5V Vmp are connected in series?", correctAnswer: 249, units: "Volts DC" }
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
    setQuizIsCorrect(diff < 1);
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
          Solar & Energy Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Solar Panel Sizing
          </span>
          <Link href="/calculators/inverter-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Inverter Sizing
          </Link>
          <Link href="/calculators/battery-runtime-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Battery Runtime
          </Link>
          <Link href="/calculators/ups-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            UPS Sizing
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
                <Sun className="text-[#518231]" />
                Solar System Cockpit
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
                { key: "appliance_builder", label: "Loads" },
                { key: "array_stringing", label: "Strings" },
                { key: "battery_storage", label: "Battery" },
                { key: "financial_eco", label: "ROI" }
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
                label="Required Array Capacity & Panel Count" 
                val={`${results.actualInstalledCapacityKw.toFixed(2)} kWp (${results.actualPanelCount} × ${panelWattageW}W Panels)`} 
                icon={Zap} 
              />

              {/* Daily Energy Consumption (kWh) for Tab 1 */}
              {activeTab === "basic_sizing" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>Daily Energy Demand (kWh/day)</span>
                    <input
                      type="number"
                      step="0.5"
                      value={dailyLoadKwh}
                      onChange={(e) => setDailyLoadKwh(Number(e.target.value))}
                      className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={dailyLoadKwh}
                    onChange={(e) => setDailyLoadKwh(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              )}

              {/* Peak Sun Hours (h/day) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Peak Sun Hours (Hours/day)</span>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="8"
                    value={peakSunHours}
                    onChange={(e) => setPeakSunHours(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {[3.5, 4.5, 5.0, 5.5, 6.0].map(h => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setPeakSunHours(h)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all border ${
                        peakSunHours === h 
                          ? "bg-[#518231] text-white border-[#518231]" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {h} Sun Hours
                    </button>
                  ))}
                </div>
              </div>

              {/* Panel Wattage (W) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-700 dark:text-slate-300">
                  <span>Solar Panel Module Rating (Watts)</span>
                  <input
                    type="number"
                    step="10"
                    value={panelWattageW}
                    onChange={(e) => setPanelWattageW(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {[350, 400, 450, 500, 550].map(w => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setPanelWattageW(w)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all border ${
                        panelWattageW === w 
                          ? "bg-[#518231] text-white border-[#518231]" 
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {w}W Module
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab 2: Appliance Builder */}
              {activeTab === "appliance_builder" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Household Appliance Breakdown</span>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {loadList.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                          <span className="text-[10px] text-slate-400">{item.powerW}W × {item.hoursPerDay}h/day ({item.dutyCyclePct}% duty)</span>
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

                  {/* Add New Appliance Form */}
                  <div className="grid grid-cols-3 gap-1 pt-1">
                    <input
                      type="text"
                      placeholder="Appliance Name"
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
                      placeholder="Hours/Day"
                      value={newLoadHours}
                      onChange={(e) => setNewLoadHours(Number(e.target.value))}
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

              {/* Tab 3: Panel Series Stringing & MPPT Inputs */}
              {activeTab === "array_stringing" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Panel Stringing & Inverter MPPT Limits</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Series Panels per String</span>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={seriesCount}
                        onChange={(e) => setSeriesCount(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Panel Vmp (Volts)</span>
                      <input
                        type="number"
                        step="0.5"
                        value={panelVmp}
                        onChange={(e) => setPanelVmp(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Battery Storage Inputs */}
              {activeTab === "battery_storage" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Battery Storage Autonomy</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Autonomy Days</span>
                      <input
                        type="number"
                        step="0.5"
                        value={autonomyDays}
                        onChange={(e) => setAutonomyDays(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Battery Bank Voltage</span>
                      <select
                        value={batteryBankVoltageV}
                        onChange={(e) => setBatteryBankVoltageV(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value={12}>12V Bank</option>
                        <option value={24}>24V Bank</option>
                        <option value={48}>48V Bank</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Financial ROI */}
              {activeTab === "financial_eco" && (
                <div className="space-y-3 pt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Financial & Installed Cost Parameters</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Utility Rate ($/kWh)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={elecRatePerKwh}
                        onChange={(e) => setElecRatePerKwh(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Installed Cost ($/Watt)</span>
                      <input
                        type="number"
                        step="0.10"
                        value={installedCostPerWatt}
                        onChange={(e) => setInstalledCostPerWatt(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Mode: System Derating Efficiency */}
              {isAdvancedMode && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">System Losses & Derating Factor</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Overall System Efficiency (%)</span>
                      <select
                        value={systemDeratingPct}
                        onChange={(e) => setSystemDeratingPct(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value={75}>75% (High Temperature / Shading)</option>
                        <option value={82}>82% (Standard Residential PV)</option>
                        <option value={88}>88% (Optimal MPPT / Microinverters)</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Battery DoD (%)</span>
                      <select
                        value={batteryDodPct}
                        onChange={(e) => setBatteryDodPct(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                      >
                        <option value={50}>50% (Lead-Acid / AGM)</option>
                        <option value={80}>80% (LiFePO4 Lithium Standard)</option>
                        <option value={90}>90% (LiFePO4 Deep Cycle Pro)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Integration Link to Inverter Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Sizing AC inverter capacity?</span>
              <span className="text-[11px] text-slate-500">Calculate inverter VA ratings, 12V/24V/48V current draw & surge loads</span>
            </div>
            <Link
              href="/calculators/inverter-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Inverter Calculator
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Solar Power Flow & Grid Layout Cockpit */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Cockpit: Dynamic Interactive Solar Power Flow & MPPT Pipeline */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                ☀️ Dynamic Solar Power Flow & MPPT Pipeline
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-[#518231]">
                Offset: {results.solarOffsetPct.toFixed(1)}% Grid
              </span>
            </div>

            {/* SVG Pipeline Visualizer */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              <div className="w-full max-w-md h-32 relative flex items-center justify-center">
                <svg viewBox="0 0 400 110" className="w-full h-full">
                  
                  {/* Sun Icon Node */}
                  <circle cx="50" cy="55" r="24" fill="#f59e0b" opacity="0.2" />
                  <circle cx="50" cy="55" r="16" fill="#f59e0b" />
                  <text x="50" y="90" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">{peakSunHours}h Sun</text>

                  {/* Flow Arrow */}
                  <line x1="75" y1="55" x2="130" y2="55" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />

                  {/* Solar Array Node */}
                  <rect x="130" y="20" width="100" height="70" fill="#0f172a" stroke="#518231" strokeWidth="2.5" rx="8" />
                  <text x="180" y="48" fill="#518231" fontSize="12" fontWeight="bold" textAnchor="middle">Solar Array</text>
                  <text x="180" y="65" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{results.actualInstalledCapacityKw.toFixed(2)} kWp</text>
                  <text x="180" y="78" fill="#94a3b8" fontSize="9" textAnchor="middle">{results.actualPanelCount} × {panelWattageW}W Panels</text>

                  {/* Flow Arrow */}
                  <line x1="230" y1="55" x2="285" y2="55" stroke="#10b981" strokeWidth="3" strokeDasharray="5 3" />

                  {/* Home & Battery Node */}
                  <rect x="285" y="25" width="95" height="60" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="8" />
                  <text x="332" y="50" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Home Load</text>
                  <text x="332" y="68" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">{results.activeDailyLoadKwh.toFixed(1)} kWh/day</text>
                </svg>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Daily Generation</span>
                <span className="text-xs font-black text-[#518231]">{results.dailySolarGenKwh.toFixed(1)} kWh/day</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Roof Installation Area</span>
                <span className="text-xs font-black text-amber-400">{results.totalInstallationAreaSqM.toFixed(1)} m²</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Payback Period</span>
                <span className="text-xs font-black text-white">{results.simplePaybackYears.toFixed(1)} Years</span>
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
                {(["gauge", "grid", "string", "payback", "quiz"] as const).map(tab => (
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
                    {tab === "gauge" ? "Overview" : tab === "grid" ? "🧩 Panel Grid" : tab === "string" ? "⚡ Stringing" : tab === "payback" ? "📈 Financial ROI" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Overview */}
                {visualTab === "gauge" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">☀️ Solar Array Sizing Engineering Principles</h4>
                    <p className="leading-relaxed">
                      Solar PV sizing calculates required DC Array Power (**P = Daily Load / (Sun Hours × Efficiency)**). Sizing includes an overall {100 - systemDeratingPct}% derating allowance for shading, temperature coefficients, inverter losses, and wiring voltage drop.
                    </p>
                  </div>
                )}

                {/* Tab 2: Interactive Solar Panel Grid Visualizer */}
                {visualTab === "grid" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Solar Array Physical Roof Layout ({results.actualPanelCount} Modules)</h4>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                      <div className="grid grid-cols-4 gap-1.5 max-w-xs mb-3">
                        {Array.from({ length: Math.min(16, results.actualPanelCount) }).map((_, idx) => (
                          <div key={idx} className="w-12 h-16 bg-[#518231]/30 border border-[#518231] rounded-lg flex items-center justify-center text-[9px] font-bold text-[#518231]">
                            #{idx + 1}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-semibold">
                        Total Panel Glass Area: {results.totalPanelAreaSqM.toFixed(1)} m² · Required Roof Area: {results.totalInstallationAreaSqM.toFixed(1)} m²
                      </span>
                    </div>
                  </div>
                )}

                {/* Tab 3: Stringing & MPPT Status */}
                {visualTab === "string" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">PV Panel Stringing & Inverter MPPT Validation</h4>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>String Voltage Vmp ({seriesCount} in Series):</span>
                        <span className="font-bold text-[#518231]">{results.stringVmp.toFixed(1)} V DC</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Open Circuit Voltage Voc:</span>
                        <span className="font-bold text-amber-400">{results.stringVoc.toFixed(1)} V DC</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Array Current Imp ({results.parallelStringsCount} Parallel Strings):</span>
                        <span className="font-bold text-white">{results.arrayImp.toFixed(1)} A DC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MPPT Range Status (120V - 500V Window):</span>
                        <span className={`font-bold ${results.isMpptCompatible ? "text-green-400" : "text-amber-400"}`}>
                          {results.isMpptCompatible ? "COMPATIBLE MPPT VOLTAGE" : "CHECK STRING LENGTH"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Financial Payback Curve Chart */}
                {visualTab === "payback" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cumulative Financial Payback Cash Flow ($ USD)</h4>
                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={paybackCurveData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Year" />
                            <YAxis />
                            <Tooltip formatter={(val: any) => [`$${val}`, "Net Cash Flow"]} />
                            <Line type="monotone" dataKey="CashFlow" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading payback chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 5: Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Solar Energy Engineering Quiz</h4>
                    {quizQuestion && (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">{quizQuestion.q}</p>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.1"
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
