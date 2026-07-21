"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, Thermometer, ShieldAlert, ArrowDown, ExternalLink
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CategoryTab = "core" | "awg" | "temp" | "circuit" | "solar_auto";

interface MaterialItem {
  key: string;
  name: string;
  rho20: number; // Ω·m
  alpha: number; // /°C
  iacs: number; // % IACS
  density: number; // g/cm³
}

const MATERIALS: MaterialItem[] = [
  { key: "copper", name: "Copper", rho20: 1.68e-8, alpha: 0.00393, iacs: 100, density: 8.96 },
  { key: "aluminum", name: "Aluminum", rho20: 2.82e-8, alpha: 0.00403, iacs: 61, density: 2.70 },
  { key: "silver", name: "Silver", rho20: 1.59e-8, alpha: 0.00380, iacs: 105, density: 10.49 },
  { key: "gold", name: "Gold", rho20: 2.44e-8, alpha: 0.00340, iacs: 70, density: 19.32 },
  { key: "iron", name: "Iron", rho20: 9.71e-8, alpha: 0.00651, iacs: 17, density: 7.87 },
  { key: "tungsten", name: "Tungsten", rho20: 5.60e-8, alpha: 0.00450, iacs: 30, density: 19.25 },
  { key: "nickel", name: "Nickel", rho20: 6.99e-8, alpha: 0.00600, iacs: 24, density: 8.90 },
  { key: "constantan", name: "Constantan", rho20: 4.90e-7, alpha: 0.00001, iacs: 3.5, density: 8.90 },
  { key: "nichrome", name: "Nichrome", rho20: 1.10e-6, alpha: 0.00040, iacs: 1.5, density: 8.40 }
];

interface WireGaugeData {
  awg: string;
  mm2: number;
  diameterMm: number;
  rPerMeterCu: number; // Ω/m @ 20°C
  rPerKmCu: number;    // Ω/km @ 20°C
}

const AWG_DATABASE: WireGaugeData[] = [
  { awg: "14 AWG", mm2: 2.08, diameterMm: 1.63, rPerMeterCu: 0.008286, rPerKmCu: 8.286 },
  { awg: "12 AWG", mm2: 3.31, diameterMm: 2.05, rPerMeterCu: 0.005211, rPerKmCu: 5.211 },
  { awg: "10 AWG", mm2: 5.26, diameterMm: 2.59, rPerMeterCu: 0.003277, rPerKmCu: 3.277 },
  { awg: "8 AWG",  mm2: 8.37, diameterMm: 3.26, rPerMeterCu: 0.002061, rPerKmCu: 2.061 },
  { awg: "6 AWG",  mm2: 13.30, diameterMm: 4.11, rPerMeterCu: 0.001296, rPerKmCu: 1.296 },
  { awg: "4 AWG",  mm2: 21.15, diameterMm: 5.19, rPerMeterCu: 0.000815, rPerKmCu: 0.815 },
  { awg: "2 AWG",  mm2: 33.63, diameterMm: 6.54, rPerMeterCu: 0.000513, rPerKmCu: 0.513 },
  { awg: "1/0 AWG", mm2: 53.49, diameterMm: 8.25, rPerMeterCu: 0.000323, rPerKmCu: 0.323 },
  { awg: "2/0 AWG", mm2: 67.43, diameterMm: 9.27, rPerMeterCu: 0.000256, rPerKmCu: 0.256 },
  { awg: "4/0 AWG", mm2: 107.2, diameterMm: 11.68, rPerMeterCu: 0.000161, rPerKmCu: 0.161 }
];

export function WireResistanceCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("core");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Core Inputs
  const [wireLengthM, setWireLengthM] = useState<number>(10); // meters
  const [wireAreaMm2, setWireAreaMm2] = useState<number>(2.08); // mm²
  const [selectedMaterial, setSelectedMaterial] = useState<string>("copper");
  const [operatingTempC, setOperatingTempC] = useState<number>(20); // °C

  // AWG Database Selector
  const [selectedAwg, setSelectedAwg] = useState<string>("14 AWG");

  // Circuit Inputs
  const [isTwoWireLoop, setIsTwoWireLoop] = useState<boolean>(true);
  const [parallelConductors, setParallelConductors] = useState<number>(1);
  const [loadCurrentA, setLoadCurrentA] = useState<number>(15);

  // Visual Tab
  const [visualTab, setVisualTab] = useState<"cylinder" | "compare" | "charts" | "quiz">("cylinder");

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

  const matInfo = useMemo(() => {
    return MATERIALS.find(m => m.key === selectedMaterial) || MATERIALS[0];
  }, [selectedMaterial]);

  // AWG selection sync
  const handleSelectAwg = (awgStr: string) => {
    setSelectedAwg(awgStr);
    const item = AWG_DATABASE.find(a => a.awg === awgStr);
    if (item) {
      setWireAreaMm2(item.mm2);
    }
  };

  // Calculations
  const results = useMemo(() => {
    // Temperature adjustment factor
    const tempFactor = 1 + matInfo.alpha * (operatingTempC - 20);
    const rhoTemp = matInfo.rho20 * tempFactor; // Ω·m

    // Area in m² (1 mm² = 1e-6 m²)
    const areaM2 = Math.max(1e-9, wireAreaMm2 * 1e-6);
    const lengthM = Math.max(0.1, wireLengthM);

    // Single conductor resistance R = ρL/A
    const rSingleConductor = (rhoTemp * lengthM) / areaM2;

    // Two-Wire loop vs single
    const rTotalPath = isTwoWireLoop ? 2 * rSingleConductor : rSingleConductor;

    // Parallel conductors equivalent R_eq = R / N
    const rEquivalent = rTotalPath / Math.max(1, parallelConductors);

    // Resistance per meter and per kilometer
    const rPerMeter = rSingleConductor / lengthM;
    const rPerKm = rPerMeter * 1000;
    const rPerFoot = rPerMeter * 0.3048;

    // Thermal Power Loss P = I² R
    const powerLossWatts = loadCurrentA * loadCurrentA * rEquivalent;

    // Conductivity S/m = 1 / rho
    const conductivitySm = 1 / rhoTemp;

    return {
      rhoTemp,
      tempFactor,
      rSingleConductor,
      rTotalPath,
      rEquivalent,
      rPerMeter,
      rPerKm,
      rPerFoot,
      powerLossWatts,
      conductivitySm
    };
  }, [matInfo, operatingTempC, wireAreaMm2, wireLengthM, isTwoWireLoop, parallelConductors, loadCurrentA]);

  // Recharts Chart Data (Resistance vs Length)
  const chartData = useMemo(() => {
    const data = [];
    const step = Math.max(1, wireLengthM / 10);
    for (let l = 1; l <= Math.max(20, wireLengthM * 1.5); l += step) {
      const areaM2 = wireAreaMm2 * 1e-6;
      const r = (results.rhoTemp * l) / areaM2;
      data.push({
        Length: Number(l.toFixed(1)),
        Resistance: Number(r.toFixed(3))
      });
    }
    return data;
  }, [wireLengthM, wireAreaMm2, results.rhoTemp]);

  // Material Comparison Data (Copper vs Aluminum vs Silver vs Gold)
  const materialCompareData = useMemo(() => {
    const areaM2 = wireAreaMm2 * 1e-6;
    return MATERIALS.slice(0, 4).map(m => {
      const rhoT = m.rho20 * (1 + m.alpha * (operatingTempC - 20));
      const r = (rhoT * wireLengthM) / areaM2;
      const pLoss = loadCurrentA * loadCurrentA * r * (isTwoWireLoop ? 2 : 1);
      return {
        name: m.name,
        rho: (m.rho20 * 1e8).toFixed(2), // 10^-8 Ω·m
        iacs: m.iacs,
        resistance: r.toFixed(3),
        powerLoss: pLoss.toFixed(1)
      };
    });
  }, [wireAreaMm2, wireLengthM, operatingTempC, loadCurrentA, isTwoWireLoop]);

  const handleCopySummary = () => {
    const text = `Wire Resistance Calculation Summary
-----------------------------------------
Material: ${matInfo.name} (Resistivity: ${(results.rhoTemp * 1e8).toFixed(2)} × 10⁻⁸ Ω·m @ ${operatingTempC}°C)
Conductor Length: ${wireLengthM} m (${(wireLengthM * 3.28084).toFixed(1)} ft)
Cross-Sectional Area: ${wireAreaMm2} mm² (${selectedAwg})
-----------------------------------------
Single Conductor Resistance: ${results.rSingleConductor.toFixed(4)} Ω
Total Circuit Resistance (${isTwoWireLoop ? "2-Wire Loop" : "1-Way"}): ${results.rEquivalent.toFixed(4)} Ω
Resistance per km: ${results.rPerKm.toFixed(3)} Ω/km
Thermal Power Loss (@ ${loadCurrentA}A): ${results.powerLossWatts.toFixed(2)} W`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Wire resistance summary copied!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the resistance of 100m of 2.08 mm² (14 AWG) copper wire at 20°C (ρ = 1.68×10⁻⁸ Ω·m)?", correctAnswer: 0.808, units: "Ω" },
      { q: "If wire length doubles while cross-sectional area remains unchanged, what happens to wire resistance?", correctAnswer: 2.0, units: "x (Doubles)" },
      { q: "If wire diameter doubles (4x area), how does resistance change?", correctAnswer: 0.25, units: "x (Quarters)" }
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
    setQuizIsCorrect(diff < 0.1);
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
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Wire Resistance
          </span>
          <Link href="/calculators/voltage-drop-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Voltage Drop
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
                Wire Cockpit
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
                { key: "core", label: "Core R" },
                { key: "awg", label: "AWG Table" },
                { key: "temp", label: "Temp R(T)" },
                { key: "circuit", label: "Circuit" },
                { key: "solar_auto", label: "Solar/Auto" }
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
              <ReadOnlyField label="Calculated Wire Resistance (R)" val={`${results.rEquivalent.toFixed(4)} Ω (${results.rPerKm.toFixed(2)} Ω/km)`} icon={Zap} />

              {/* Wire Length */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Wire Length (L in meters)</span>
                  <input
                    type="number"
                    value={wireLengthM}
                    onChange={(e) => setWireLengthM(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="500"
                  step="1"
                  value={wireLengthM}
                  onChange={(e) => setWireLengthM(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Wire Area / AWG */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Cross-Sectional Area (mm²)</span>
                  <input
                    type="number"
                    step="0.01"
                    value={wireAreaMm2}
                    onChange={(e) => setWireAreaMm2(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="50"
                  step="0.5"
                  value={wireAreaMm2}
                  onChange={(e) => setWireAreaMm2(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Material & AWG Selection Dropdowns */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">AWG Preset</span>
                  <select
                    value={selectedAwg}
                    onChange={(e) => handleSelectAwg(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                  >
                    {AWG_DATABASE.map(a => (
                      <option key={a.awg} value={a.awg}>{a.awg} ({a.mm2} mm²)</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Conductor Material</span>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                  >
                    {MATERIALS.map(m => (
                      <option key={m.key} value={m.key}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Advanced Inputs */}
              {isAdvancedMode && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Operating Temp (°C)</span>
                      <input
                        type="number"
                        value={operatingTempC}
                        onChange={(e) => setOperatingTempC(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Load Current (A)</span>
                      <input
                        type="number"
                        value={loadCurrentA}
                        onChange={(e) => setLoadCurrentA(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-800 text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">2-Wire Loop Path (2x Length)</span>
                    <button
                      type="button"
                      onClick={() => setIsTwoWireLoop(!isTwoWireLoop)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        isTwoWireLoop 
                          ? "bg-[#518231] text-white" 
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {isTwoWireLoop ? "Enabled (2x)" : "One-Way"}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Quick Integration Link to Voltage Drop Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Need Voltage Drop for this wire?</span>
              <span className="text-[11px] text-slate-500">Pass calculated resistance to Voltage Drop Calculator</span>
            </div>
            <Link
              href="/calculators/voltage-drop-calculator"
              className="flex items-center gap-1 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              Solve Drop
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive 3D Wire Cylinder & Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit: 3D Wire Cylinder Visualizer */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧠 Core Engineering Wire Cylinder Graphic
              </span>
              <span className="text-xs font-bold text-green-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                R = {(results.rSingleConductor).toFixed(4)} Ω
              </span>
            </div>

            {/* SVG 3D Green Wire Cylinder Graphic */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center relative mb-4">
              
              {/* Dynamic Formula Display */}
              <div className="text-center mb-4 font-mono text-sm">
                <span className="text-slate-400">Formula: </span>
                <span className="text-white font-bold">R = (ρ · L) / A = </span>
                <span className="text-[#518231] font-black">{results.rSingleConductor.toFixed(4)} Ω</span>
              </div>

              {/* Wire Cylinder Illustration */}
              <div className="w-full max-w-md h-36 relative flex items-center justify-center">
                <svg viewBox="0 0 400 120" className="w-full h-full">
                  {/* Length Arrow Above */}
                  <line x1="80" y1="20" x2="320" y2="20" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="80" y1="15" x2="80" y2="25" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="320" y1="15" x2="320" y2="25" stroke="#94a3b8" strokeWidth="2" />
                  <text x="200" y="15" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Length L = {wireLengthM} m
                  </text>

                  {/* 3D Wire Body Cylinder */}
                  <rect x="80" y="35" width="240" height="50" fill="url(#wireGrad)" rx="4" stroke="#10b981" strokeWidth="2" />

                  {/* Right Face Ellipse (Cross Section A) */}
                  <ellipse cx="320" cy="60" rx="12" ry="25" fill="#047857" stroke="#34d399" strokeWidth="2" />
                  <text x="340" y="64" fill="#34d399" fontSize="11" fontWeight="bold">
                    A = {wireAreaMm2} mm²
                  </text>

                  {/* Left Face Ellipse */}
                  <ellipse cx="80" cy="60" rx="12" ry="25" fill="#065f46" stroke="#10b981" strokeWidth="2" />

                  {/* Internal Material Resistivity Particles */}
                  <circle cx="130" cy="50" r="3" fill="#6EE7B7" />
                  <circle cx="180" cy="70" r="3" fill="#6EE7B7" />
                  <circle cx="230" cy="45" r="3" fill="#6EE7B7" />
                  <circle cx="270" cy="65" r="3" fill="#6EE7B7" />
                </svg>

                {/* SVG Gradient Defs */}
                <svg className="absolute w-0 h-0">
                  <defs>
                    <linearGradient id="wireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Resistivity ρ</span>
                <span className="text-xs font-black text-white">{(results.rhoTemp * 1e8).toFixed(2)} × 10⁻⁸ Ω·m</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Single Wire R</span>
                <span className="text-xs font-black text-[#518231]">{results.rSingleConductor.toFixed(4)} Ω</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Power Loss (@ {loadCurrentA}A)</span>
                <span className="text-xs font-black text-amber-400">{results.powerLossWatts.toFixed(1)} W</span>
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
                {(["cylinder", "compare", "charts", "quiz"] as const).map(tab => (
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
                    {tab === "cylinder" ? "Overview" : tab === "compare" ? "⚡ Cu vs Al Table" : tab === "charts" ? "📊 Live Graph" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Cylinder Overview */}
                {visualTab === "cylinder" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚡ Conductor Resistance Engineering Physics</h4>
                    <p className="leading-relaxed">
                      Conductor resistance is proportional to length (L) and inversely proportional to area (A). Temperature increases metallic lattice vibrations, raising resistance by {((results.tempFactor - 1) * 100).toFixed(1)}% at {operatingTempC}°C.
                    </p>
                  </div>
                )}

                {/* Tab 2: Copper vs Aluminum Side-by-Side Comparison */}
                {visualTab === "compare" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sliders size={16} className="text-[#518231]" />
                      Copper vs Aluminum Side-by-Side Material Comparison
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                            <th className="py-2 px-2">Material</th>
                            <th className="py-2 px-2">Resistivity ρ</th>
                            <th className="py-2 px-2">IACS %</th>
                            <th className="py-2 px-2">Resistance (Ω)</th>
                            <th className="py-2 px-2">Power Loss (W)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {materialCompareData.map(row => (
                            <tr key={row.name} className={`border-b border-slate-100 dark:border-slate-800/50 ${row.name.toLowerCase() === selectedMaterial ? "bg-[#518231]/10 font-bold text-[#518231]" : ""}`}>
                              <td className="py-2 px-2">{row.name}</td>
                              <td className="py-2 px-2">{row.rho} × 10⁻⁸ Ω·m</td>
                              <td className="py-2 px-2">{row.iacs}%</td>
                              <td className="py-2 px-2">{row.resistance} Ω</td>
                              <td className="py-2 px-2">{row.powerLoss} W</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab 3: Live Recharts Graph */}
                {visualTab === "charts" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      Wire Resistance vs Length Characteristic Curve
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Length" label={{ value: 'Length (m)', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis />
                            <Tooltip formatter={(val: any) => [`${val} Ω`, "Resistance"]} />
                            <Line type="monotone" dataKey="Resistance" stroke="#10b981" strokeWidth={2.5} dot={false} />
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Wire Resistance Quiz</h4>
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
