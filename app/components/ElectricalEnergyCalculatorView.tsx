"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Battery, BatteryCharging, Plus, Trash2, PieChart as PieIcon, ShieldAlert
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

type CategoryTab = "core" | "multidevice" | "tariff" | "solar" | "battery" | "ev" | "savings";
type CoreSubMode = "EPt font-mono" | "EVIt" | "EV2R" | "EI2R" | "PEt" | "tEP";

// Unit conversions to Base SI (Joules for Energy, Watts for Power, Seconds for Time)
const ENERGY_CONVERSIONS: Record<string, number> = {
  "J": 1,
  "kJ": 1000,
  "MJ": 1e6,
  "Wh": 3600,
  "kWh": 3.6e6,
  "MWh": 3.6e9,
  "GWh": 3.6e12
};

const POWER_CONVERSIONS: Record<string, number> = {
  "mW": 0.001,
  "W": 1,
  "kW": 1000,
  "MW": 1e6,
  "GW": 1e9
};

const TIME_CONVERSIONS: Record<string, number> = {
  "sec": 1,
  "min": 60,
  "hrs": 3600,
  "days": 86400,
  "weeks": 604800,
  "months": 2.592e6,
  "years": 3.1536e7
};

// Appliance Items for Multi-Device Mode
interface DeviceItem {
  id: string;
  name: string;
  powerW: number;
  qty: number;
  hoursPerDay: number;
  standbyW: number;
}

const DEFAULT_DEVICES: DeviceItem[] = [
  { id: "1", name: "Air Conditioner", powerW: 1500, qty: 1, hoursPerDay: 8, standbyW: 5 },
  { id: "2", name: "Refrigerator", powerW: 150, qty: 1, hoursPerDay: 24, standbyW: 2 },
  { id: "3", name: "LED Bulbs", powerW: 10, qty: 8, hoursPerDay: 6, standbyW: 0 },
  { id: "4", name: "Gaming PC & Monitor", powerW: 400, qty: 1, hoursPerDay: 5, standbyW: 3 },
  { id: "5", name: "Television", powerW: 120, qty: 1, hoursPerDay: 4, standbyW: 2 }
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#64748b"];

export function ElectricalEnergyCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("core");
  const [coreMode, setCoreMode] = useState<CoreSubMode>("EPt font-mono");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Core Inputs
  const [powerVal, setPowerVal] = useState<number>(1000);
  const [powerUnit, setPowerUnit] = useState<string>("W");

  const [timeVal, setTimeVal] = useState<number>(8);
  const [timeUnit, setTimeUnit] = useState<string>("hrs");

  const [voltageVal, setVoltageVal] = useState<number>(120);
  const [currentVal, setCurrentVal] = useState<number>(8.33);
  const [resistanceVal, setResistanceVal] = useState<number>(14.4);

  // Cost Inputs
  const [electricityRate, setElectricityRate] = useState<number>(0.15); // $/kWh

  // Multi-Device State
  const [deviceList, setDeviceList] = useState<DeviceItem[]>(DEFAULT_DEVICES);
  const [newDeviceName, setNewDeviceName] = useState<string>("");
  const [newDeviceWatts, setNewDeviceWatts] = useState<number>(100);

  // Solar State
  const [solarPanelWatts, setSolarPanelWatts] = useState<number>(400);
  const [solarPanelCount, setSolarPanelCount] = useState<number>(10);
  const [peakSunHours, setPeakSunHours] = useState<number>(5.5);
  const [solarSystemEff, setSolarSystemEff] = useState<number>(85); // %

  // Battery State
  const [battVolt, setBattVolt] = useState<number>(12);
  const [battAh, setBattAh] = useState<number>(100);
  const [battDoD, setBattDoD] = useState<number>(80); // %
  const [battEff, setBattEff] = useState<number>(90); // %
  const [battLoadWatts, setBattLoadWatts] = useState<number>(120);

  // EV State
  const [evBattCapacity, setEvBattCapacity] = useState<number>(75); // kWh
  const [evChargeEff, setEvChargeEff] = useState<number>(92); // %
  const [evEfficiencyWhPerMile, setEvEfficiencyWhPerMile] = useState<number>(280); // Wh/mile

  // Energy Savings (Before vs After)
  const [beforeWatts, setBeforeWatts] = useState<number>(1500); // Old AC
  const [afterWatts, setAfterWatts] = useState<number>(800);   // New Inverter AC
  const [savingsHoursPerDay, setSavingsHoursPerDay] = useState<number>(8);

  // Bottom Visual Tab
  const [visualTab, setVisualTab] = useState<"summary" | "pie" | "projections" | "quiz">("summary");

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

  // Convert Core Inputs to Base SI (W, sec)
  const pSI = useMemo(() => powerVal * (POWER_CONVERSIONS[powerUnit] || 1), [powerVal, powerUnit]);
  const tSI = useMemo(() => timeVal * (TIME_CONVERSIONS[timeUnit] || 1), [timeVal, timeUnit]);

  // Core Calculation Result
  const coreEnergyJoules = useMemo(() => pSI * tSI, [pSI, tSI]);
  const coreEnergyKWh = useMemo(() => coreEnergyJoules / 3.6e6, [coreEnergyJoules]);

  // Multi-Device Calculation Summary
  const deviceSummary = useMemo(() => {
    let totalDailyKWh = 0;
    const items = deviceList.map(d => {
      const activeDailyWh = d.powerW * d.qty * d.hoursPerDay;
      const standbyDailyWh = d.standbyW * d.qty * (24 - d.hoursPerDay);
      const dailyKWh = (activeDailyWh + standbyDailyWh) / 1000;
      totalDailyKWh += dailyKWh;
      return {
        ...d,
        dailyKWh,
        monthlyKWh: dailyKWh * 30,
        monthlyCost: dailyKWh * 30 * electricityRate
      };
    });

    const totalMonthlyKWh = totalDailyKWh * 30;
    const totalYearlyKWh = totalDailyKWh * 365;
    const totalMonthlyCost = totalMonthlyKWh * electricityRate;
    const totalYearlyCost = totalYearlyKWh * electricityRate;

    const pieData = items.map(i => ({
      name: i.name,
      value: Number(i.monthlyKWh.toFixed(1))
    }));

    return {
      items,
      totalDailyKWh,
      totalMonthlyKWh,
      totalYearlyKWh,
      totalMonthlyCost,
      totalYearlyCost,
      pieData
    };
  }, [deviceList, electricityRate]);

  // Solar Analysis Results
  const solarSummary = useMemo(() => {
    const totalArrayWatts = solarPanelWatts * solarPanelCount;
    const dailyGrossKWh = (totalArrayWatts * peakSunHours) / 1000;
    const dailyUsableKWh = dailyGrossKWh * (solarSystemEff / 100);
    const monthlyUsableKWh = dailyUsableKWh * 30;
    const yearlyUsableKWh = dailyUsableKWh * 365;
    const yearlySavingsCost = yearlyUsableKWh * electricityRate;

    return {
      totalArrayWatts,
      dailyGrossKWh,
      dailyUsableKWh,
      monthlyUsableKWh,
      yearlyUsableKWh,
      yearlySavingsCost
    };
  }, [solarPanelWatts, solarPanelCount, peakSunHours, solarSystemEff, electricityRate]);

  // Battery Energy Results
  const batterySummary = useMemo(() => {
    const nominalWh = battVolt * battAh;
    const usableWh = nominalWh * (battDoD / 100) * (battEff / 100);
    const usableKWh = usableWh / 1000;
    const runtimeHours = battLoadWatts > 0 ? usableWh / battLoadWatts : 0;

    return {
      nominalWh,
      usableWh,
      usableKWh,
      runtimeHours
    };
  }, [battVolt, battAh, battDoD, battEff, battLoadWatts]);

  // EV Charging Results
  const evSummary = useMemo(() => {
    const energyRequiredKWh = evBattCapacity / (evChargeEff / 100);
    const chargingLossKWh = energyRequiredKWh - evBattCapacity;
    const totalChargeCost = energyRequiredKWh * electricityRate;
    const estimatedRangeMiles = evEfficiencyWhPerMile > 0 ? (evBattCapacity * 1000) / evEfficiencyWhPerMile : 0;
    const costPerMile = estimatedRangeMiles > 0 ? totalChargeCost / estimatedRangeMiles : 0;

    return {
      energyRequiredKWh,
      chargingLossKWh,
      totalChargeCost,
      estimatedRangeMiles,
      costPerMile
    };
  }, [evBattCapacity, evChargeEff, electricityRate, evEfficiencyWhPerMile]);

  // Energy Savings Results (Before vs After)
  const savingsSummary = useMemo(() => {
    const beforeDailyKWh = (beforeWatts * savingsHoursPerDay) / 1000;
    const afterDailyKWh = (afterWatts * savingsHoursPerDay) / 1000;
    const savedDailyKWh = Math.max(0, beforeDailyKWh - afterDailyKWh);

    const savedMonthlyKWh = savedDailyKWh * 30;
    const savedYearlyKWh = savedDailyKWh * 365;

    const savedMonthlyCost = savedMonthlyKWh * electricityRate;
    const savedYearlyCost = savedYearlyKWh * electricityRate;
    const percentReduction = beforeWatts > 0 ? ((beforeWatts - afterWatts) / beforeWatts) * 100 : 0;

    return {
      beforeDailyKWh,
      afterDailyKWh,
      savedDailyKWh,
      savedMonthlyKWh,
      savedYearlyKWh,
      savedMonthlyCost,
      savedYearlyCost,
      percentReduction
    };
  }, [beforeWatts, afterWatts, savingsHoursPerDay, electricityRate]);

  // Projections Chart Data (1 to 10 Years)
  const projectionData = useMemo(() => {
    const data = [];
    const yearlyKWh = activeTab === "multidevice" ? deviceSummary.totalYearlyKWh : (coreEnergyKWh * 365 / timeVal);
    const yearlyCost = yearlyKWh * electricityRate;

    for (let yr = 1; yr <= 10; yr++) {
      data.push({
        Year: `Year ${yr}`,
        Energy: Number((yearlyKWh * yr).toFixed(0)),
        Cost: Number((yearlyCost * yr).toFixed(0))
      });
    }
    return data;
  }, [activeTab, deviceSummary, coreEnergyKWh, timeVal, electricityRate]);

  // Device Add/Remove Functions
  const handleAddDevice = () => {
    if (!newDeviceName.trim() || newDeviceWatts <= 0) return;
    const newDev: DeviceItem = {
      id: Date.now().toString(),
      name: newDeviceName.trim(),
      powerW: newDeviceWatts,
      qty: 1,
      hoursPerDay: 4,
      standbyW: 0
    };
    setDeviceList([...deviceList, newDev]);
    setNewDeviceName("");
    setNewDeviceWatts(100);
    triggerNotification("success", `Added ${newDev.name}!`);
  };

  const handleRemoveDevice = (id: string) => {
    setDeviceList(deviceList.filter(d => d.id !== id));
    triggerNotification("error", "Device removed.");
  };

  const handleCopySummary = () => {
    const text = `Electrical Energy Calculation Summary
-----------------------------------------
Active Mode: ${activeTab.toUpperCase()}
Total Monthly Consumption: ${deviceSummary.totalMonthlyKWh.toFixed(1)} kWh
Estimated Monthly Cost ($0.15/kWh): $${deviceSummary.totalMonthlyCost.toFixed(2)}
Estimated Yearly Cost: $${deviceSummary.totalYearlyCost.toFixed(2)}
-----------------------------------------
Calculated by Electrical Energy Calculator Hub`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary copied!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "How much energy (kWh) is consumed by a 2000W space heater running for 5 hours? (E = P · t)", correctAnswer: 10.0, units: "kWh" },
      { q: "What is the energy in Joules of a 100W light bulb running for 1 hour? (1 Wh = 3,600 J)", correctAnswer: 360000.0, units: "J" },
      { q: "A 12V battery with 100Ah capacity is discharged to 80% DoD. How much usable energy (Wh) is available? (Wh = V · Ah · DoD)", correctAnswer: 960.0, units: "Wh" }
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
          <Link href="/calculators/electrical-power-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Power
          </Link>
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Energy
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
                Energy Cockpit
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
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-4 sm:grid-cols-7 gap-1 mb-6 text-center">
              {[
                { key: "core", label: "Core" },
                { key: "multidevice", label: "Devices" },
                { key: "tariff", label: "Tariff" },
                { key: "solar", label: "Solar" },
                { key: "battery", label: "Battery" },
                { key: "ev", label: "EV" },
                { key: "savings", label: "Savings" }
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

            {/* Dynamic Inputs per Category Tab */}
            <div className="space-y-5">
              
              {/* Tab 1: Core Energy Solvers */}
              {activeTab === "core" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Power Rating (P)</span>
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
                      min="10"
                      max="10000"
                      step="50"
                      value={powerVal}
                      onChange={(e) => setPowerVal(Number(e.target.value))}
                      className="w-full accent-[#518231] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>Operating Time (t)</span>
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                        <input
                          type="number"
                          value={timeVal}
                          onChange={(e) => setTimeVal(Number(e.target.value))}
                          className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                        />
                        <select
                          value={timeUnit}
                          onChange={(e) => setTimeUnit(e.target.value)}
                          className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                        >
                          {Object.keys(TIME_CONVERSIONS).map(u => (
                            <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="24"
                      step="1"
                      value={timeVal}
                      onChange={(e) => setTimeVal(Number(e.target.value))}
                      className="w-full accent-[#518231] cursor-pointer"
                    />
                  </div>

                  <ReadOnlyField label="Calculated Energy (E)" val={`${coreEnergyKWh.toFixed(2)} kWh (${(coreEnergyJoules / 1e6).toFixed(2)} MJ)`} icon={Zap} />
                </>
              )}

              {/* Tab 2: Multi-Device Dashboard */}
              {activeTab === "multidevice" && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Add Custom Device:</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Device Name (e.g. Heater)"
                      value={newDeviceName}
                      onChange={(e) => setNewDeviceName(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none font-semibold"
                    />
                    <input
                      type="number"
                      placeholder="Watts"
                      value={newDeviceWatts}
                      onChange={(e) => setNewDeviceWatts(Number(e.target.value))}
                      className="w-20 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none font-black"
                    />
                    <button
                      type="button"
                      onClick={handleAddDevice}
                      className="bg-[#518231] hover:bg-[#436a28] text-white p-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                    {deviceList.map(d => (
                      <div key={d.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800 text-xs">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{d.name}</span>
                          <span className="text-slate-400 text-[10px]">{d.powerW}W × {d.hoursPerDay}h/day</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-[#518231]">{((d.powerW * d.hoursPerDay * 30) / 1000).toFixed(1)} kWh/mo</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveDevice(d.id)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Tariff & Cost */}
              {activeTab === "tariff" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Electricity Tariff Rate ($/kWh)</span>
                    <input
                      type="number"
                      step="0.01"
                      value={electricityRate}
                      onChange={(e) => setElectricityRate(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-sm"
                    />
                  </div>
                  <ReadOnlyField label="Estimated Monthly Cost" val={`$${deviceSummary.totalMonthlyCost.toFixed(2)} (${deviceSummary.totalMonthlyKWh.toFixed(1)} kWh)`} icon={DollarSign} />
                  <ReadOnlyField label="Estimated Yearly Cost" val={`$${deviceSummary.totalYearlyCost.toFixed(2)} (${deviceSummary.totalYearlyKWh.toFixed(1)} kWh)`} icon={DollarSign} />
                </div>
              )}

              {/* Tab 4: Solar Mode */}
              {activeTab === "solar" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Panel Wattage (W)</span>
                      <input
                        type="number"
                        value={solarPanelWatts}
                        onChange={(e) => setSolarPanelWatts(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Panel Count</span>
                      <input
                        type="number"
                        value={solarPanelCount}
                        onChange={(e) => setSolarPanelCount(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Peak Sun Hours (h/day)</span>
                      <input
                        type="number"
                        step="0.1"
                        value={peakSunHours}
                        onChange={(e) => setPeakSunHours(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">System Eff (%)</span>
                      <input
                        type="number"
                        value={solarSystemEff}
                        onChange={(e) => setSolarSystemEff(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                  <ReadOnlyField label="Daily Solar Output" val={`${solarSummary.dailyUsableKWh.toFixed(2)} kWh/day`} icon={Sun} />
                </div>
              )}

              {/* Tab 5: Battery Mode */}
              {activeTab === "battery" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Battery Voltage (V)</span>
                      <input
                        type="number"
                        value={battVolt}
                        onChange={(e) => setBattVolt(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Capacity (Ah)</span>
                      <input
                        type="number"
                        value={battAh}
                        onChange={(e) => setBattAh(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Depth of Discharge (%)</span>
                      <input
                        type="number"
                        value={battDoD}
                        onChange={(e) => setBattDoD(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Load Power (W)</span>
                      <input
                        type="number"
                        value={battLoadWatts}
                        onChange={(e) => setBattLoadWatts(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                  <ReadOnlyField label="Estimated Load Runtime" val={`${batterySummary.runtimeHours.toFixed(1)} Hours (${batterySummary.usableWh.toFixed(0)} Wh)`} icon={Battery} />
                </div>
              )}

              {/* Tab 6: EV Charging */}
              {activeTab === "ev" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Battery Capacity (kWh)</span>
                      <input
                        type="number"
                        value={evBattCapacity}
                        onChange={(e) => setEvBattCapacity(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Charging Eff (%)</span>
                      <input
                        type="number"
                        value={evChargeEff}
                        onChange={(e) => setEvChargeEff(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                  <ReadOnlyField label="Total Full Charge Cost" val={`$${evSummary.totalChargeCost.toFixed(2)} (${evSummary.energyRequiredKWh.toFixed(1)} kWh req)`} icon={BatteryCharging} />
                </div>
              )}

              {/* Tab 7: Energy Savings Comparison */}
              {activeTab === "savings" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Current Appliance (W)</span>
                      <input
                        type="number"
                        value={beforeWatts}
                        onChange={(e) => setBeforeWatts(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Efficient Appliance (W)</span>
                      <input
                        type="number"
                        value={afterWatts}
                        onChange={(e) => setAfterWatts(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                  <ReadOnlyField label="Annual Electricity Saved" val={`$${savingsSummary.savedYearlyCost.toFixed(2)} / year (${savingsSummary.percentReduction.toFixed(0)}% reduction)`} icon={Sparkles} />
                </div>
              )}

            </div>
          </div>

          {/* Quick Metrics Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <Activity size={16} className="text-[#518231]" />
              Energy Consumption Overview
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Daily</span>
                <span className="font-black text-[#518231]">{deviceSummary.totalDailyKWh.toFixed(1)} kWh</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Monthly</span>
                <span className="font-black text-blue-500">{deviceSummary.totalMonthlyKWh.toFixed(1)} kWh</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Monthly Cost</span>
                <span className="font-black text-amber-500">${deviceSummary.totalMonthlyCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recharts Pie Chart & Analytics */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <PieIcon size={14} className="text-[#518231]" />
                📊 Multi-Device Household Energy Breakdown
              </span>
              <span className="text-xs font-bold text-green-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                Total: {deviceSummary.totalMonthlyKWh.toFixed(1)} kWh/mo
              </span>
            </div>

            {/* Recharts Pie Chart */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-center justify-center min-h-[220px]">
              {isClient ? (
                <div className="w-full h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceSummary.pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {deviceSummary.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any) => [`${val} kWh/mo`, "Energy"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-xs text-slate-400">Loading chart...</div>
              )}
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

          {/* Advanced Analytics Tabbed Panel */}
          {isAdvancedMode && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in">
              
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 flex-wrap">
                {(["summary", "projections", "quiz"] as const).map(tab => (
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
                    {tab === "summary" ? "Energy Math" : tab === "projections" ? "📈 10-Yr Cost Projection" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Summary */}
                {visualTab === "summary" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚡ Electrical Energy Formulas</h4>
                    <p className="leading-relaxed">
                      Electrical energy (E) measures total power integrated over operating time (E = P · t). In Joules: 1 kWh = 3,600,000 Joules = 3.6 MJ.
                    </p>
                  </div>
                )}

                {/* Tab 2: Projections */}
                {visualTab === "projections" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <DollarSign size={16} className="text-[#518231]" />
                      10-Year Cumulative Cost Projection
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={projectionData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Year" />
                            <YAxis />
                            <Tooltip formatter={(val: any) => [`$${val}`, "Cost"]} />
                            <Line type="monotone" dataKey="Cost" stroke="#518231" strokeWidth={2.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 3: Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Electrical Energy Quiz</h4>
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
