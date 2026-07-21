"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Thermometer, ShieldAlert, ArrowDown, ExternalLink, Plus, Trash2, Car, BatteryCharging, TrendingUp, PieChart as PieChartIcon
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

type CategoryTab = "simple" | "multi_appliance" | "tariff_tou" | "solar_ev_battery" | "savings_projection";

interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}

const CURRENCIES: CurrencyOption[] = [
  { code: "USD", symbol: "$", name: "US Dollar ($)" },
  { code: "EUR", symbol: "€", name: "Euro (€)" },
  { code: "GBP", symbol: "£", name: "British Pound (£)" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka (৳)" },
  { code: "INR", symbol: "₹", name: "Indian Rupee (₹)" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen (¥)" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar ($)" },
  { code: "AUD", symbol: "$", name: "Australian Dollar ($)" }
];

interface ApplianceItem {
  id: string;
  name: string;
  powerWatts: number;
  qty: number;
  hoursPerDay: number;
  standbyWatts: number;
}

const APPLIANCE_PRESETS: { name: string; powerWatts: number; hoursPerDay: number; standbyWatts: number }[] = [
  { name: "Air Conditioner (1.5 Ton)", powerWatts: 1500, hoursPerDay: 8, standbyWatts: 5 },
  { name: "Refrigerator", powerWatts: 150, hoursPerDay: 24, standbyWatts: 2 },
  { name: "Television (55\" LED)", powerWatts: 100, hoursPerDay: 5, standbyWatts: 3 },
  { name: "Gaming PC", powerWatts: 450, hoursPerDay: 4, standbyWatts: 5 },
  { name: "Ceiling Fan", powerWatts: 75, hoursPerDay: 12, standbyWatts: 0 },
  { name: "LED Bulb", powerWatts: 10, hoursPerDay: 8, standbyWatts: 0 },
  { name: "Water Heater (Geyser)", powerWatts: 3000, hoursPerDay: 1.5, standbyWatts: 0 },
  { name: "Washing Machine", powerWatts: 500, hoursPerDay: 1, standbyWatts: 2 },
  { name: "Microwave Oven", powerWatts: 1200, hoursPerDay: 0.5, standbyWatts: 3 },
  { name: "Level 2 EV Charger", powerWatts: 7200, hoursPerDay: 3, standbyWatts: 10 },
  { name: "Wi-Fi Router", powerWatts: 12, hoursPerDay: 24, standbyWatts: 0 }
];

const PIE_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#6366f1"];

export function ElectricityCostCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("simple");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);
  const [currency, setCurrency] = useState<string>("USD");

  // Simple Mode Inputs
  const [simplePowerWatts, setSimplePowerWatts] = useState<number>(1000); // 1000W = 1kW
  const [simpleHoursPerDay, setSimpleHoursPerDay] = useState<number>(8);
  const [electricityRate, setElectricityRate] = useState<number>(0.15); // $/kWh

  // Multi-Appliance Dashboard State
  const [appliances, setAppliances] = useState<ApplianceItem[]>([
    { id: "1", name: "Air Conditioner", powerWatts: 1500, qty: 1, hoursPerDay: 8, standbyWatts: 5 },
    { id: "2", name: "Refrigerator", powerWatts: 150, qty: 1, hoursPerDay: 24, standbyWatts: 2 },
    { id: "3", name: "Television", powerWatts: 100, qty: 2, hoursPerDay: 5, standbyWatts: 3 },
    { id: "4", name: "LED Bulbs", powerWatts: 10, qty: 6, hoursPerDay: 8, standbyWatts: 0 }
  ]);

  // Tariff & TOU State
  const [tariffType, setTariffType] = useState<"single" | "tiered" | "tou">("single");
  const [tier1Limit, setTier1Limit] = useState<number>(100);
  const [tier1Rate, setTier1Rate] = useState<number>(0.10);
  const [tier2Rate, setTier2Rate] = useState<number>(0.18);
  
  const [touPeakPct, setTouPeakPct] = useState<number>(30); // 30% usage peak
  const [touPeakRate, setTouPeakRate] = useState<number>(0.28);
  const [touOffPeakRate, setTouOffPeakRate] = useState<number>(0.10);

  // Billing Extras
  const [demandKw, setDemandKw] = useState<number>(0);
  const [demandRate, setDemandRate] = useState<number>(10.0); // $/kW demand charge
  const [fixedServiceFee, setFixedServiceFee] = useState<number>(12.0); // $/month
  const [taxPercent, setTaxPercent] = useState<number>(5); // 5% tax

  // Solar & EV State
  const [evBatteryKwh, setEvBatteryKwh] = useState<number>(60);
  const [evSocPercent, setEvSocPercent] = useState<number>(80); // 20% -> 100% = 80% charge
  const [evEfficiencyWhKm, setEvEfficiencyWhKm] = useState<number>(180); // 180 Wh/km
  const [solarGenKwhDay, setSolarGenKwhDay] = useState<number>(15);

  // Before vs After Savings & Inflation State
  const [oldApplianceWatts, setOldApplianceWatts] = useState<number>(2000);
  const [newApplianceWatts, setNewApplianceWatts] = useState<number>(1200);
  const [savingsHoursDay, setSavingsHoursDay] = useState<number>(8);
  const [annualInflationRatePct, setAnnualInflationRatePct] = useState<number>(3.5);

  // Visual Tab
  const [visualTab, setVisualTab] = useState<"bill" | "breakdown" | "projections" | "quiz">("bill");

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

  const currSymbol = useMemo(() => {
    return CURRENCIES.find(c => c.code === currency)?.symbol || "$";
  }, [currency]);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add / Remove Appliance Helpers
  const handleAddAppliance = (presetIndex?: number) => {
    const preset = presetIndex !== undefined ? APPLIANCE_PRESETS[presetIndex] : { name: "Custom Load", powerWatts: 500, hoursPerDay: 4, standbyWatts: 0 };
    const newItem: ApplianceItem = {
      id: Date.now().toString(),
      name: preset.name,
      powerWatts: preset.powerWatts,
      qty: 1,
      hoursPerDay: preset.hoursPerDay,
      standbyWatts: preset.standbyWatts
    };
    setAppliances([...appliances, newItem]);
    triggerNotification("success", `Added ${preset.name} to multi-appliance list.`);
  };

  const handleRemoveAppliance = (id: string) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  const handleUpdateAppliance = (id: string, field: keyof ApplianceItem, val: any) => {
    setAppliances(appliances.map(a => a.id === id ? { ...a, [field]: val } : a));
  };

  // Calculations Engine
  const results = useMemo(() => {
    // Mode 1: Simple calculation
    const simpleDailyKwh = (simplePowerWatts / 1000) * simpleHoursPerDay;
    const simpleMonthlyKwh = simpleDailyKwh * 30;
    const simpleYearlyKwh = simpleDailyKwh * 365;

    const simpleDailyCost = simpleDailyKwh * electricityRate;
    const simpleMonthlyCost = simpleMonthlyKwh * electricityRate;
    const simpleYearlyCost = simpleYearlyKwh * electricityRate;

    // Mode 2: Multi-appliance totals
    let multiTotalDailyKwh = 0;
    let multiTotalStandbyKwh = 0;

    const applianceBreakdown = appliances.map(a => {
      const activeKwhDay = (a.powerWatts * a.qty * a.hoursPerDay) / 1000;
      const standbyKwhDay = (a.standbyWatts * a.qty * (24 - a.hoursPerDay)) / 1000;
      const totalKwhDay = activeKwhDay + standbyKwhDay;
      const monthlyCost = totalKwhDay * 30 * electricityRate;

      multiTotalDailyKwh += totalKwhDay;
      multiTotalStandbyKwh += standbyKwhDay;

      return {
        ...a,
        totalKwhDay,
        monthlyCost
      };
    });

    const multiMonthlyKwh = multiTotalDailyKwh * 30;
    const multiYearlyKwh = multiTotalDailyKwh * 365;

    // Tariff Engine
    let tariffEnergyCostMonth = 0;
    if (tariffType === "single") {
      tariffEnergyCostMonth = multiMonthlyKwh * electricityRate;
    } else if (tariffType === "tiered") {
      const tier1Kwh = Math.min(multiMonthlyKwh, tier1Limit);
      const tier2Kwh = Math.max(0, multiMonthlyKwh - tier1Limit);
      tariffEnergyCostMonth = (tier1Kwh * tier1Rate) + (tier2Kwh * tier2Rate);
    } else if (tariffType === "tou") {
      const peakKwh = multiMonthlyKwh * (touPeakPct / 100);
      const offPeakKwh = multiMonthlyKwh * ((100 - touPeakPct) / 100);
      tariffEnergyCostMonth = (peakKwh * touPeakRate) + (offPeakKwh * touOffPeakRate);
    }

    // Commercial Demand & Fixed Charges
    const monthDemandCharge = demandKw * demandRate;
    const monthSubtotal = tariffEnergyCostMonth + monthDemandCharge + fixedServiceFee;
    const monthTax = monthSubtotal * (taxPercent / 100);
    const finalMonthlyBill = monthSubtotal + monthTax;
    const finalYearlyBill = finalMonthlyBill * 12;

    const effectiveCostPerKwh = multiMonthlyKwh > 0 ? finalMonthlyBill / multiMonthlyKwh : electricityRate;

    // EV Charging calculation
    const evEnergyNeededKwh = evBatteryKwh * (evSocPercent / 100);
    const evGridEnergyKwh = evEnergyNeededKwh / 0.90; // 90% charging efficiency
    const evChargeCost = evGridEnergyKwh * electricityRate;
    const evCostPer100Km = (evEfficiencyWhKm * 100 / 1000) * electricityRate;

    // Solar Offset
    const solarGenKwhMonth = solarGenKwhDay * 30;
    const netGridKwhMonth = Math.max(0, multiMonthlyKwh - solarGenKwhMonth);
    const solarSavingsMonth = (multiMonthlyKwh - netGridKwhMonth) * electricityRate;

    // Before vs After Savings
    const oldMonthlyKwh = (oldApplianceWatts / 1000) * savingsHoursDay * 30;
    const newMonthlyKwh = (newApplianceWatts / 1000) * savingsHoursDay * 30;
    const kwhSavedMonth = oldMonthlyKwh - newMonthlyKwh;
    const costSavedMonth = kwhSavedMonth * electricityRate;
    const costSavedYear = costSavedMonth * 12;

    return {
      simpleDailyKwh,
      simpleMonthlyKwh,
      simpleYearlyKwh,
      simpleDailyCost,
      simpleMonthlyCost,
      simpleYearlyCost,
      multiTotalDailyKwh,
      multiTotalStandbyKwh,
      multiMonthlyKwh,
      multiYearlyKwh,
      applianceBreakdown,
      tariffEnergyCostMonth,
      monthDemandCharge,
      fixedServiceFee,
      monthTax,
      finalMonthlyBill,
      finalYearlyBill,
      effectiveCostPerKwh,
      evEnergyNeededKwh,
      evChargeCost,
      evCostPer100Km,
      solarGenKwhMonth,
      netGridKwhMonth,
      solarSavingsMonth,
      kwhSavedMonth,
      costSavedMonth,
      costSavedYear
    };
  }, [
    simplePowerWatts, simpleHoursPerDay, electricityRate, appliances, tariffType, 
    tier1Limit, tier1Rate, tier2Rate, touPeakPct, touPeakRate, touOffPeakRate,
    demandKw, demandRate, fixedServiceFee, taxPercent, evBatteryKwh, evSocPercent,
    evEfficiencyWhKm, solarGenKwhDay, oldApplianceWatts, newApplianceWatts, savingsHoursDay
  ]);

  // Pie Chart Data (Multi-Appliance Cost Breakdown)
  const pieData = useMemo(() => {
    return results.applianceBreakdown.map((a, i) => ({
      name: a.name,
      value: Number(a.monthlyCost.toFixed(2)),
      color: PIE_COLORS[i % PIE_COLORS.length]
    }));
  }, [results.applianceBreakdown]);

  // Recharts 10-Year Cumulative Cost Projections Line Chart
  const projectionChartData = useMemo(() => {
    const data = [];
    let cumulativeNoInflation = 0;
    let cumulativeInflation = 0;
    const baseYearCost = results.finalYearlyBill;

    for (let yr = 1; yr <= 10; yr++) {
      cumulativeNoInflation += baseYearCost;
      const yrFactor = Math.pow(1 + annualInflationRatePct / 100, yr - 1);
      cumulativeInflation += baseYearCost * yrFactor;

      data.push({
        Year: `Yr ${yr}`,
        Standard: Number(cumulativeNoInflation.toFixed(0)),
        WithInflation: Number(cumulativeInflation.toFixed(0))
      });
    }
    return data;
  }, [results.finalYearlyBill, annualInflationRatePct]);

  const handleCopySummary = () => {
    const text = `Electricity Cost Summary
-----------------------------------------
Base Electricity Rate: ${currSymbol}${electricityRate.toFixed(3)} / kWh
Total Monthly Usage: ${results.multiMonthlyKwh.toFixed(1)} kWh
Total Monthly Bill (${currency}): ${currSymbol}${results.finalMonthlyBill.toFixed(2)}
Total Annual Bill (${currency}): ${currSymbol}${results.finalYearlyBill.toFixed(2)}
Effective Cost per kWh: ${currSymbol}${results.effectiveCostPerKwh.toFixed(3)}
-----------------------------------------
Energy Charge: ${currSymbol}${results.tariffEnergyCostMonth.toFixed(2)}
Demand Charge: ${currSymbol}${results.monthDemandCharge.toFixed(2)}
Fixed Fees: ${currSymbol}${results.fixedServiceFee.toFixed(2)}
Taxes (${taxPercent}%): ${currSymbol}${results.monthTax.toFixed(2)}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Electricity cost summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "If a 1,500W Air Conditioner runs 8 hours daily at $0.15/kWh, what is its daily electricity cost?", correctAnswer: 1.80, units: "$" },
      { q: "What is the monthly kWh consumption of a 100W TV running 5 hours per day for 30 days?", correctAnswer: 15.0, units: "kWh" },
      { q: "If a total monthly bill is $120 for 800 kWh of energy, what is the effective cost per kWh?", correctAnswer: 0.15, units: "$/kWh" }
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
    setQuizIsCorrect(diff < 0.05);
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
          Physics & Energy Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Electricity Cost
          </span>
          <Link href="/calculators/electrical-energy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electrical Energy
          </Link>
          <Link href="/calculators/electrical-power-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Electrical Power
          </Link>
          <Link href="/calculators/voltage-drop-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Voltage Drop
          </Link>
          <Link href="/calculators/wire-resistance-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Wire Resistance
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
                <DollarSign className="text-[#518231]" />
                Energy Cockpit
              </h2>

              <div className="flex items-center gap-2">
                {/* Currency Selector */}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold py-1.5 px-2 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                  ))}
                </select>

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
            </div>

            {/* Category Select Tabs */}
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-5 gap-1 mb-6 text-center">
              {[
                { key: "simple", label: "Simple" },
                { key: "multi_appliance", label: "Devices" },
                { key: "tariff_tou", label: "Tariff/TOU" },
                { key: "solar_ev_battery", label: "Solar/EV" },
                { key: "savings_projection", label: "Savings" }
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
                label="Estimated Monthly Electricity Cost" 
                val={`${currSymbol}${results.finalMonthlyBill.toFixed(2)} / month (${results.multiMonthlyKwh.toFixed(1)} kWh)`} 
                icon={DollarSign} 
              />

              {/* Base Electricity Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Electricity Rate ({currSymbol}/kWh)</span>
                  <input
                    type="number"
                    step="0.01"
                    value={electricityRate}
                    onChange={(e) => setElectricityRate(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.60"
                  step="0.01"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* TAB 1: Simple Mode */}
              {activeTab === "simple" && (
                <div className="space-y-4 pt-2 animate-fade-in">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>Appliance Power (Watts)</span>
                      <input
                        type="number"
                        value={simplePowerWatts}
                        onChange={(e) => setSimplePowerWatts(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>Usage Hours Per Day</span>
                      <input
                        type="number"
                        step="0.5"
                        value={simpleHoursPerDay}
                        onChange={(e) => setSimpleHoursPerDay(Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Multi-Appliance List */}
              {activeTab === "multi_appliance" && (
                <div className="space-y-4 pt-2 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Household Devices ({appliances.length})</span>
                    <button
                      type="button"
                      onClick={() => handleAddAppliance()}
                      className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <Plus size={13} />
                      Add Device
                    </button>
                  </div>

                  {/* Preset Quick Add Buttons */}
                  <div className="flex flex-wrap gap-1">
                    {APPLIANCE_PRESETS.slice(0, 5).map((p, idx) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => handleAddAppliance(idx)}
                        className="text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg font-semibold transition-colors"
                      >
                        + {p.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>

                  {/* Appliance List Items */}
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {appliances.map(a => (
                      <div key={a.id} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={a.name}
                            onChange={(e) => handleUpdateAppliance(a.id, "name", e.target.value)}
                            className="bg-transparent font-bold text-slate-900 dark:text-white border-b border-transparent hover:border-slate-300 focus:border-[#518231] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveAppliance(a.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Watts</span>
                            <input
                              type="number"
                              value={a.powerWatts}
                              onChange={(e) => handleUpdateAppliance(a.id, "powerWatts", Number(e.target.value))}
                              className="w-full bg-white dark:bg-slate-900 p-1 rounded-md border border-slate-200 dark:border-slate-700 font-bold"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Hrs/Day</span>
                            <input
                              type="number"
                              step="0.5"
                              value={a.hoursPerDay}
                              onChange={(e) => handleUpdateAppliance(a.id, "hoursPerDay", Number(e.target.value))}
                              className="w-full bg-white dark:bg-slate-900 p-1 rounded-md border border-slate-200 dark:border-slate-700 font-bold"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Qty</span>
                            <input
                              type="number"
                              value={a.qty}
                              onChange={(e) => handleUpdateAppliance(a.id, "qty", Number(e.target.value))}
                              className="w-full bg-white dark:bg-slate-900 p-1 rounded-md border border-slate-200 dark:border-slate-700 font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Tariff & TOU */}
              {activeTab === "tariff_tou" && (
                <div className="space-y-3 pt-2 animate-fade-in text-xs">
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Tariff Structure</span>
                    <select
                      value={tariffType}
                      onChange={(e) => setTariffType(e.target.value as any)}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                    >
                      <option value="single">Flat Single Rate</option>
                      <option value="tiered">Tiered Rate (Block Tariff)</option>
                      <option value="tou">Time-of-Use (Peak / Off-Peak)</option>
                    </select>
                  </div>

                  {tariffType === "tiered" && (
                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Tier 1 Limit (kWh)</span>
                        <input
                          type="number"
                          value={tier1Limit}
                          onChange={(e) => setTier1Limit(Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Tier 2 Rate ({currSymbol})</span>
                        <input
                          type="number"
                          step="0.01"
                          value={tier2Rate}
                          onChange={(e) => setTier2Rate(Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </div>
                    </div>
                  )}

                  {tariffType === "tou" && (
                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Peak Usage %</span>
                        <input
                          type="number"
                          value={touPeakPct}
                          onChange={(e) => setTouPeakPct(Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Peak Rate ({currSymbol})</span>
                        <input
                          type="number"
                          step="0.01"
                          value={touPeakRate}
                          onChange={(e) => setTouPeakRate(Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </div>
                    </div>
                  )}

                  {/* Commercial Extras */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Fixed Fee ({currSymbol}/mo)</span>
                      <input
                        type="number"
                        value={fixedServiceFee}
                        onChange={(e) => setFixedServiceFee(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Tax / Surcharge %</span>
                      <input
                        type="number"
                        value={taxPercent}
                        onChange={(e) => setTaxPercent(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Solar, EV & Battery */}
              {activeTab === "solar_ev_battery" && (
                <div className="space-y-3 pt-2 animate-fade-in text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <Car size={14} className="text-[#518231]" />
                      EV Charging Cost Analysis
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Battery Size (kWh)</span>
                        <input
                          type="number"
                          value={evBatteryKwh}
                          onChange={(e) => setEvBatteryKwh(Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Efficiency (Wh/km)</span>
                        <input
                          type="number"
                          value={evEfficiencyWhKm}
                          onChange={(e) => setEvEfficiencyWhKm(Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <Sun size={14} className="text-amber-500" />
                      Solar PV Offset Analysis
                    </span>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Daily Solar Generation (kWh/day)</span>
                      <input
                        type="number"
                        value={solarGenKwhDay}
                        onChange={(e) => setSolarGenKwhDay(Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Savings & 10-Year Projections */}
              {activeTab === "savings_projection" && (
                <div className="space-y-3 pt-2 animate-fade-in text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <TrendingUp size={14} className="text-[#518231]" />
                      Before vs After Savings Simulator
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Old Appliance (W)</span>
                        <input
                          type="number"
                          value={oldApplianceWatts}
                          onChange={(e) => setOldApplianceWatts(Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">New Appliance (W)</span>
                        <input
                          type="number"
                          value={newApplianceWatts}
                          onChange={(e) => setNewApplianceWatts(Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white">Annual Tariff Inflation Rate (%)</span>
                    <input
                      type="number"
                      step="0.5"
                      value={annualInflationRatePct}
                      onChange={(e) => setAnnualInflationRatePct(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Quick Integration Link to Electrical Energy Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Calculate detailed energy usage?</span>
              <span className="text-[11px] text-slate-500">Solve kWh, Joules & battery runtime</span>
            </div>
            <Link
              href="/calculators/electrical-energy-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Solve Energy
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Bill Breakdown & Analytics */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit: Bill Breakdown Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧾 Electricity Utility Bill Breakdown
              </span>
              <span className="text-xs font-bold text-green-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                {currSymbol}{results.finalMonthlyBill.toFixed(2)} / month
              </span>
            </div>

            {/* Bill Breakdown Stack */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-3 mb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Energy Consumption Charge:</span>
                <span className="font-bold text-white">{currSymbol}{results.tariffEnergyCostMonth.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Fixed Monthly Service Charge:</span>
                <span className="font-bold text-white">{currSymbol}{results.fixedServiceFee.toFixed(2)}</span>
              </div>
              {results.monthDemandCharge > 0 && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Demand Charge ({demandKw} kW @ {currSymbol}{demandRate}/kW):</span>
                  <span className="font-bold text-amber-400">{currSymbol}{results.monthDemandCharge.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Taxes & Surcharges ({taxPercent}%):</span>
                <span className="font-bold text-white">{currSymbol}{results.monthTax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-black">
                <span className="text-[#518231]">Total Estimated Bill:</span>
                <span className="text-green-400 text-base">{currSymbol}{results.finalMonthlyBill.toFixed(2)}</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Daily Cost</span>
                <span className="text-xs font-black text-white">{currSymbol}{(results.finalMonthlyBill / 30).toFixed(2)}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Annual Bill</span>
                <span className="text-xs font-black text-[#518231]">{currSymbol}{results.finalYearlyBill.toFixed(2)}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Effective Rate</span>
                <span className="text-xs font-black text-amber-400">{currSymbol}{results.effectiveCostPerKwh.toFixed(3)} / kWh</span>
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

          {/* Advanced Mode Visual Tabs */}
          {isAdvancedMode && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in">
              
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 flex-wrap">
                {(["bill", "breakdown", "projections", "quiz"] as const).map(tab => (
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
                    {tab === "bill" ? "Overview" : tab === "breakdown" ? "📊 Device Pie" : tab === "projections" ? "📈 10-Yr Inflation" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Overview */}
                {visualTab === "bill" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚡ Electricity Cost Physics & Tariff Engine</h4>
                    <p className="leading-relaxed">
                      Total energy cost equals power multiplied by time (kWh) multiplied by utility rate. Fixed service fees and taxes raise the effective rate from {currSymbol}{electricityRate.toFixed(3)} to {currSymbol}{results.effectiveCostPerKwh.toFixed(3)} per kWh.
                    </p>
                  </div>
                )}

                {/* Tab 2: Appliance Pie Chart */}
                {visualTab === "breakdown" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <PieChartIcon size={16} className="text-[#518231]" />
                      Multi-Device Household Monthly Cost Breakdown
                    </h4>

                    {isClient && pieData.length > 0 ? (
                      <div className="h-56 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={75}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(val: any) => [`${currSymbol}${val}`, "Monthly Cost"]} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">No devices added.</div>
                    )}
                  </div>
                )}

                {/* Tab 3: 10-Year Projections Line Chart */}
                {visualTab === "projections" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      10-Year Cumulative Cost Projection ({annualInflationRatePct}% Annual Inflation)
                    </h4>

                    {isClient ? (
                      <div className="h-56 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={projectionChartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Year" />
                            <YAxis />
                            <Tooltip formatter={(val: any) => [`${currSymbol}${val}`, "Cumulative Cost"]} />
                            <Legend />
                            <Line type="monotone" dataKey="Standard" stroke="#94a3b8" strokeWidth={2} name="Flat Rate" />
                            <Line type="monotone" dataKey="WithInflation" stroke="#10b981" strokeWidth={2.5} name="With Inflation" />
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Electricity Cost Quiz</h4>
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
