"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Gauge, Zap, Car, Plane, 
  Rocket, Sliders, Activity, Sparkles, AlertTriangle, ArrowRight, Scale, Globe, Layers, Droplets, Box, Building, Anchor
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

type CalcMode = "density" | "mass" | "volume";

// Unit conversion maps to Base SI (kg/m³, kg, m³)
const DENSITY_CONVERSIONS: Record<string, number> = {
  "kg/m³": 1,
  "g/cm³": 1000,
  "g/mL": 1000,
  "lb/ft³": 16.0185,
  "lb/in³": 27679.9
};

const MASS_CONVERSIONS: Record<string, number> = {
  "kg": 1,
  "g": 0.001,
  "mg": 0.000001,
  "lb": 0.453592,
  "oz": 0.0283495,
  "ton": 1000
};

const VOLUME_CONVERSIONS: Record<string, number> = {
  "m³": 1,
  "cm³": 0.000001,
  "mm³": 1e-9,
  "L": 0.001,
  "mL": 0.000001,
  "ft³": 0.0283168,
  "in³": 0.0000163871
};

// Liquids for Buoyancy Simulator
interface LiquidPreset {
  name: string;
  density: number; // kg/m³
  color: string;
}

const LIQUID_PRESETS: LiquidPreset[] = [
  { name: "Fresh Water (20°C)", density: 1000, color: "#3b82f6" },
  { name: "Sea Water (Saltwater)", density: 1025, color: "#1d4ed8" },
  { name: "Cooking Oil (Vegetable)", density: 920, color: "#eab308" },
  { name: "Ethanol (Alcohol)", density: 789, color: "#a855f7" },
  { name: "Liquid Mercury", density: 13540, color: "#94a3b8" }
];

// Material Database
interface MaterialPreset {
  name: string;
  density: number; // kg/m³
  category: "Gas" | "Liquid" | "Solid" | "Metal";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
  industry: string;
}

const MATERIAL_PRESETS: MaterialPreset[] = [
  { name: "Air (Sea Level, 20°C)", density: 1.225, category: "Gas", icon: WindIcon, desc: "1.225 kg/m³ (Light ambient gas)", industry: "Aerospace & Meteorology" },
  { name: "Oak Wood", density: 700, category: "Solid", icon: Box, desc: "700 kg/m³ (Floats in water)", industry: "Construction & Furniture" },
  { name: "Ethanol", density: 789, category: "Liquid", icon: Droplets, desc: "789 kg/m³ (Volatile alcohol)", industry: "Chemical & Fuel" },
  { name: "Ice (0°C)", density: 917, category: "Solid", icon: Box, desc: "917 kg/m³ (Floats in water with ~9% above surface)", industry: "Glaciology & Cryogenics" },
  { name: "Cooking Oil", density: 920, category: "Liquid", icon: Droplets, desc: "920 kg/m³ (Floats on water)", industry: "Food Processing" },
  { name: "Fresh Water (4°C)", density: 1000, category: "Liquid", icon: Droplets, desc: "1,000 kg/m³ (Standard baseline reference)", industry: "Universal Reference" },
  { name: "Sea Water", density: 1025, category: "Liquid", icon: Anchor, desc: "1,025 kg/m³ (Saline ocean water)", industry: "Marine & Naval" },
  { name: "Concrete", density: 2400, category: "Solid", icon: Building, desc: "2,400 kg/m³ (Heavy construction aggregate)", industry: "Civil Engineering" },
  { name: "Window Glass", density: 2500, category: "Solid", icon: Box, desc: "2,500 kg/m³ (Soda-lime silicate glass)", industry: "Architecture & Optics" },
  { name: "Aluminum", density: 2700, category: "Metal", icon: Scale, desc: "2,700 kg/m³ (Lightweight structural metal)", industry: "Aviation & Automotive" },
  { name: "Iron", density: 7870, category: "Metal", icon: Scale, desc: "7,870 kg/m³ (Pure elemental iron)", industry: "Metallurgy" },
  { name: "Structural Steel", density: 7850, category: "Metal", icon: Building, desc: "7,850 kg/m³ (Carbon steel alloy)", industry: "Heavy Construction" },
  { name: "Copper", density: 8960, category: "Metal", icon: Scale, desc: "8,960 kg/m³ (High electrical conductivity)", industry: "Electronics & Plumbing" },
  { name: "Silver", density: 10490, category: "Metal", icon: Scale, desc: "10,490 kg/m³ (Precious metal)", industry: "Jewelry & Electronics" },
  { name: "Lead", density: 11340, category: "Metal", icon: Scale, desc: "11,340 kg/m³ (Dense radiation shielding)", industry: "Medical & Nuclear" },
  { name: "Liquid Mercury", density: 13540, category: "Liquid", icon: Droplets, desc: "13,540 kg/m³ (Dense liquid metal)", industry: "Barometers & Thermometers" },
  { name: "Gold", density: 19300, category: "Metal", icon: Sparkles, desc: "19,300 kg/m³ (Dense precious metal)", industry: "Bullion & Luxury" },
  { name: "Platinum", density: 21450, category: "Metal", icon: Sparkles, desc: "21,450 kg/m³ (Catalytic noble metal)", industry: "Chemical Catalysts" },
  { name: "Osmium", density: 22590, category: "Metal", icon: Sparkles, desc: "22,590 kg/m³ (Densest naturally occurring element)", industry: "Specialized Alloys" }
];

function WindIcon(props: { size?: number; className?: string }) {
  return <Globe {...props} />;
}

// Density Meter Tiers
const DENSITY_TIERS = [
  { name: "Very Low Density", max: 10, color: "#10b981", label: "< 10 kg/m³ (Gases, Aerogels)" },
  { name: "Low Density", max: 1000, color: "#3b82f6", label: "10 - 1,000 kg/m³ (Wood, Oils, Ice)" },
  { name: "Medium Density", max: 5000, color: "#f59e0b", label: "1,000 - 5,000 kg/m³ (Water, Concrete, Aluminum)" },
  { name: "High Density", max: 15000, color: "#ef4444", label: "5,000 - 15,000 kg/m³ (Steel, Copper, Lead, Mercury)" },
  { name: "Very High Density", max: Infinity, color: "#8b5cf6", label: "> 15,000 kg/m³ (Gold, Platinum, Osmium)" }
];

export function DensityCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("density");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input states (in display units)
  const [massVal, setMassVal] = useState<number>(1000);
  const [massUnit, setMassUnit] = useState<string>("kg");

  const [volVal, setVolVal] = useState<number>(1.0);
  const [volUnit, setVolUnit] = useState<string>("m³");

  const [densityVal, setDensityVal] = useState<number>(1000);
  const [densityUnit, setDensityUnit] = useState<string>("kg/m³");

  // Selected Liquid for Buoyancy Simulator
  const [selectedLiquid, setSelectedLiquid] = useState<LiquidPreset>(LIQUID_PRESETS[0]);

  // Advanced Mode Tab Selection
  const [activeTab, setActiveTab] = useState<"visuals" | "graphs" | "explanation" | "quiz">("visuals");

  // Animation states
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState<{
    q: string;
    correctAnswer: number;
    units: string;
    type: CalcMode;
  } | null>(null);
  const [quizUserAnswer, setQuizUserAnswer] = useState<string>("");
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);

  // Alert Banner
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setIsClient(true);
    generateQuiz();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mode")) setCalcMode(params.get("mode") as CalcMode);
      if (params.get("m")) setMassVal(Number(params.get("m")));
      if (params.get("v")) setVolVal(Number(params.get("v")));
      if (params.get("d")) setDensityVal(Number(params.get("d")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (kg, m³, kg/m³)
  const siInputs = useMemo(() => {
    const mSI = massVal * (MASS_CONVERSIONS[massUnit] || 1);
    const vSI = volVal * (VOLUME_CONVERSIONS[volUnit] || 1);
    const dSI = densityVal * (DENSITY_CONVERSIONS[densityUnit] || 1);
    return { mSI, vSI, dSI };
  }, [massVal, massUnit, volVal, volUnit, densityVal, densityUnit]);

  // Perform Density Calculation across 3 Modes
  const results = useMemo(() => {
    let finalMSI = siInputs.mSI;
    let finalVSI = siInputs.vSI;
    let finalDSI = siInputs.dSI;

    if (calcMode === "density") {
      finalDSI = siInputs.vSI > 0 ? siInputs.mSI / siInputs.vSI : 0;
    } else if (calcMode === "mass") {
      finalMSI = siInputs.dSI * siInputs.vSI;
    } else if (calcMode === "volume") {
      finalVSI = siInputs.dSI > 0 ? siInputs.mSI / siInputs.dSI : 0;
    }

    // Convert results back to display units
    const dDisplay = finalDSI / (DENSITY_CONVERSIONS[densityUnit] || 1);
    const mDisplay = finalMSI / (MASS_CONVERSIONS[massUnit] || 1);
    const vDisplay = finalVSI / (VOLUME_CONVERSIONS[volUnit] || 1);

    // Specific Gravity (relative to water 1000 kg/m³)
    const specificGravity = finalDSI / 1000;

    // Buoyancy Behavior against selected liquid
    let buoyancyStatus = "Floats";
    let submergedRatio = finalDSI / selectedLiquid.density;
    if (Math.abs(submergedRatio - 1) < 0.005) {
      buoyancyStatus = "Neutral Buoyancy";
      submergedRatio = 1.0;
    } else if (finalDSI > selectedLiquid.density) {
      buoyancyStatus = "Sinks";
      submergedRatio = 1.0;
    } else {
      buoyancyStatus = `Floats (${((1 - submergedRatio) * 100).toFixed(1)}% above surface)`;
    }

    // Density Tier
    let tier = DENSITY_TIERS[0];
    if (finalDSI <= 10) tier = DENSITY_TIERS[0];
    else if (finalDSI <= 1000) tier = DENSITY_TIERS[1];
    else if (finalDSI <= 5000) tier = DENSITY_TIERS[2];
    else if (finalDSI <= 15000) tier = DENSITY_TIERS[3];
    else tier = DENSITY_TIERS[4];

    return {
      dSI: finalDSI,
      mSI: finalMSI,
      vSI: finalVSI,
      dDisplay,
      mDisplay,
      vDisplay,
      specificGravity,
      buoyancyStatus,
      submergedRatio: Math.min(1.0, submergedRatio),
      tier
    };
  }, [calcMode, siInputs, densityUnit, massUnit, volUnit, selectedLiquid]);

  // Simulation Duration
  const durationSim = 4;
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      const tick = (now: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = now;
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;

        setCurrentTime(prev => {
          const nextVal = prev + delta * playbackSpeed;
          if (nextVal >= durationSim) {
            setIsPlaying(false);
            return durationSim;
          }
          return nextVal;
        });

        animationRef.current = requestAnimationFrame(tick);
      };
      animationRef.current = requestAnimationFrame(tick);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      lastTimeRef.current = null;
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const currentPosRatio = useMemo(() => {
    return Math.min(1, currentTime / durationSim);
  }, [currentTime]);

  // Recharts Motion Graph Data (Material Comparison)
  const chartData = useMemo(() => {
    return MATERIAL_PRESETS.slice(0, 10).map(m => ({
      name: m.name.split(" ")[0],
      Density: Number((m.density / (DENSITY_CONVERSIONS[densityUnit] || 1)).toFixed(2))
    }));
  }, [densityUnit]);

  // Preset Applicator
  const applyPreset = (preset: MaterialPreset) => {
    setDensityVal(preset.density);
    setDensityUnit("kg/m³");
    setCalcMode("density");
    triggerNotification("success", `Loaded ${preset.name} (${preset.density} kg/m³)!`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&d=${densityVal}&m=${massVal}&v=${volVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable scenario parameters link copied!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Density Calculation (ρ = m / V)
-----------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Calculated Density: ${results.dDisplay.toFixed(3)} ${densityUnit}
Mass: ${results.mDisplay.toFixed(3)} ${massUnit}
Volume: ${results.vDisplay.toFixed(3)} ${volUnit}
Specific Gravity (vs Water): ${results.specificGravity.toFixed(4)}
Buoyancy Behavior in ${selectedLiquid.name}: ${results.buoyancyStatus}
-----------------------------------------
SI Base Values:
Density: ${results.dSI.toFixed(2)} kg/m³
Mass: ${results.mSI.toFixed(2)} kg
Volume: ${results.vSI.toFixed(4)} m³`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      {
        q: "What is the density of an object with a mass of 500 kg and a volume of 0.2 m³?",
        correctAnswer: 2500,
        units: "kg/m³",
        type: "density" as CalcMode
      },
      {
        q: "What is the mass of 2 m³ of concrete with a density of 2,400 kg/m³?",
        correctAnswer: 4800,
        units: "kg",
        type: "mass" as CalcMode
      },
      {
        q: "What is the volume occupied by 19,300 kg of pure gold (density = 19,300 kg/m³)?",
        correctAnswer: 1,
        units: "m³",
        type: "volume" as CalcMode
      }
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
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm transition-all duration-300 animate-slide-in ${
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
          <Link href="/calculators/kinetic-energy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Kinetic Energy
          </Link>
          <Link href="/calculators/potential-energy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Potential Energy
          </Link>
          <Link href="/calculators/work-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Work
          </Link>
          <Link href="/calculators/power-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Power
          </Link>
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Density
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
                <Droplets className="text-[#518231]" />
                Density Cockpit (ρ = m / V)
              </h2>

              {/* Simple vs Advanced Mode Toggle */}
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
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-3 gap-1 mb-8">
              {[
                { key: "density", label: "Density (ρ)" },
                { key: "mass", label: "Mass (m)" },
                { key: "volume", label: "Volume (V)" }
              ].map(m => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setCalcMode(m.key as CalcMode)}
                  className={`py-2 px-1 text-center text-xs font-bold rounded-xl transition-all capitalize ${
                    calcMode === m.key 
                      ? "bg-white dark:bg-slate-800 text-[#518231] shadow-sm font-black" 
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Dynamic Input Fields */}
            <div className="space-y-6">
              
              {/* Density Input (ρ) */}
              {calcMode !== "density" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Density (ρ)
                      <InfoTooltip text="Mass per unit volume." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={densityVal}
                        onChange={(e) => setDensityVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={densityUnit}
                        onChange={(e) => setDensityUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(DENSITY_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20000"
                    step="50"
                    value={densityVal}
                    onChange={(e) => setDensityVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Density (ρ - Calculated)" val={`${results.dDisplay.toFixed(3)} ${densityUnit}`} icon={Droplets} />
              )}

              {/* Mass Input (m) */}
              {calcMode !== "mass" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Mass (m)
                      <InfoTooltip text="Amount of matter in the object." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={massVal}
                        onChange={(e) => setMassVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={massUnit}
                        onChange={(e) => setMassUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(MASS_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5000"
                    step="10"
                    value={massVal}
                    onChange={(e) => setMassVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Mass (m - Calculated)" val={`${results.mDisplay.toFixed(3)} ${massUnit}`} icon={Scale} />
              )}

              {/* Volume Input (V) */}
              {calcMode !== "volume" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Volume (V)
                      <InfoTooltip text="Three-dimensional space occupied." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.01"
                        value={volVal}
                        onChange={(e) => setVolVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={volUnit}
                        onChange={(e) => setVolUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(VOLUME_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="10"
                    step="0.05"
                    value={volVal}
                    onChange={(e) => setVolVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Volume (V - Calculated)" val={`${results.vDisplay.toFixed(3)} ${volUnit}`} icon={Box} />
              )}

            </div>
          </div>

          {/* Smart Conversion Table panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Zap size={16} className="text-[#518231]" />
              Smart Density & Specific Gravity Conversions
            </h3>
            <div className="space-y-2">
              {Object.keys(DENSITY_CONVERSIONS).map(uKey => {
                const convVal = results.dSI / DENSITY_CONVERSIONS[uKey];
                return (
                  <div key={uKey} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 font-semibold">{uKey}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{convVal.toFixed(4)}</span>
                  </div>
                );
              })}
              <div className="flex justify-between items-center py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-3">
                <span>Specific Gravity (vs Water @ 4°C)</span>
                <span>{results.specificGravity.toFixed(4)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Buoyancy Simulator, Meter & Material Explorer */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit & 🎯 Competitor Killer "Floating vs Sinking Buoyancy Simulator" */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🌊 Floating vs Sinking Buoyancy Simulator
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{results.buoyancyStatus}</span>
              </div>
            </div>

            {/* Liquid Selector Control */}
            <div className="flex items-center justify-between mb-4 bg-slate-950 p-2.5 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-semibold">Surrounding Liquid Medium:</span>
              <select
                value={selectedLiquid.name}
                onChange={(e) => {
                  const found = LIQUID_PRESETS.find(l => l.name === e.target.value);
                  if (found) setSelectedLiquid(found);
                }}
                className="bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none cursor-pointer"
              >
                {LIQUID_PRESETS.map(liq => (
                  <option key={liq.name} value={liq.name}>{liq.name} ({liq.density} kg/m³)</option>
                ))}
              </select>
            </div>

            {/* Radial Arc Density Meter */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 mb-4 flex flex-col items-center justify-center relative">
              <div className="w-48 h-24 relative overflow-hidden flex justify-center">
                <svg viewBox="0 0 100 50" className="w-44 h-22">
                  <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
                  
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke={results.tier.color}
                    strokeWidth="10"
                    strokeDasharray="126"
                    strokeDashoffset={126 - Math.min(126, Math.max(5, (Math.log10(Math.max(1, results.dSI)) / 4.5) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.dSI)) / 4.5))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.dSI)) / 4.5))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center -mt-2">
                <div className="text-xl font-black text-white" style={{ color: results.tier.color }}>
                  {results.dDisplay.toFixed(2)} {densityUnit}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  Specific Gravity: {results.specificGravity.toFixed(4)}
                </div>
              </div>
            </div>

            {/* 🎯 BUOYANCY ANIMATED CANVAS */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative h-48 flex flex-col justify-end overflow-hidden">
              {/* Liquid Tank */}
              <div 
                className="w-full h-36 rounded-xl border border-slate-700/60 relative overflow-hidden flex justify-center transition-colors duration-500"
                style={{ backgroundColor: `${selectedLiquid.color}33` }}
              >
                {/* Liquid Fill Level */}
                <div 
                  className="w-full absolute bottom-0 transition-all duration-500 opacity-60"
                  style={{ height: '80%', backgroundColor: selectedLiquid.color }}
                ></div>

                {/* Submerged Object */}
                <div 
                  className="w-16 h-16 bg-slate-800 border-2 border-slate-400 rounded-2xl shadow-2xl absolute flex flex-col items-center justify-center transition-all duration-700 ease-out"
                  style={{ 
                    top: `${Math.min(65, Math.max(10, results.submergedRatio * 55))}%`
                  }}
                >
                  <span className="text-[10px] font-black text-white">Object</span>
                  <span className="text-[9px] text-emerald-400 font-bold">{results.dSI.toFixed(0)}</span>
                </div>
              </div>

              <div className="mt-2 text-center text-[11px] font-semibold text-slate-300">
                {results.dSI < selectedLiquid.density ? (
                  <span className="text-emerald-400">✅ Object FLOATS in {selectedLiquid.name} (Object density &lt; Liquid density)</span>
                ) : results.dSI > selectedLiquid.density ? (
                  <span className="text-amber-400">⚠️ Object SINKS in {selectedLiquid.name} (Object density &gt; Liquid density)</span>
                ) : (
                  <span className="text-blue-400">⚖️ NEUTRAL BUOYANCY in {selectedLiquid.name} (Object density = Liquid density)</span>
                )}
              </div>
            </div>

            {/* Animation Controls Panel */}
            <div className="mt-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-[#518231] hover:bg-[#436a28] text-white p-2.5 rounded-xl transition-colors"
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-xl transition-colors"
                >
                  <RotateCcw size={15} />
                </button>
              </div>

              {/* Speed control buttons */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-xl">
                {[
                  { label: "0.25x", value: 0.25 },
                  { label: "0.5x", value: 0.5 },
                  { label: "1x", value: 1.0 },
                  { label: "2x", value: 2.0 }
                ].map((speedOpt) => (
                  <button
                    key={speedOpt.value}
                    type="button"
                    onClick={() => setPlaybackSpeed(speedOpt.value)}
                    className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                      playbackSpeed === speedOpt.value
                        ? "bg-[#518231] text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {speedOpt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard Stat Cards */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Density (ρ)</span>
                <div className="text-xs font-black text-[#518231] mt-0.5">{results.dDisplay.toFixed(1)} {densityUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Specific Gravity</span>
                <div className="text-xs font-black text-amber-400 mt-0.5">{results.specificGravity.toFixed(3)}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Mass (m)</span>
                <div className="text-xs font-black text-blue-400 mt-0.5">{results.mDisplay.toFixed(1)} {massUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Volume (V)</span>
                <div className="text-xs font-black text-emerald-400 mt-0.5">{results.vDisplay.toFixed(2)} {volUnit}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Share2 size={13} />
                Share Link
              </button>
              <button
                type="button"
                onClick={handleCopyResults}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Copy size={13} />
                Copy text
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
              
              {/* Header Tabs */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 flex-wrap">
                {(["visuals", "graphs", "explanation", "quiz"] as const).map(tab => (
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
                    {tab === "visuals" ? "Material Database" : tab === "graphs" ? "📊 Material Ranking" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Areas */}
              <div className="p-6">
                
                {/* Tab 1: Material Database */}
                {activeTab === "visuals" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🧱 17+ Common Materials Database</h4>
                    <p className="text-xs text-slate-500">Click any material to load its reference density automatically:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                      {MATERIAL_PRESETS.map((preset, idx) => {
                        const IconComp = preset.icon;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-950 hover:bg-[#518231]/10 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 text-left transition-all group"
                          >
                            <div className="p-2 bg-white dark:bg-slate-900 text-[#518231] rounded-xl shadow-sm group-hover:scale-105 transition-transform">
                              <IconComp size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{preset.name}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{preset.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tab 2: Material Density Bar Chart */}
                {activeTab === "graphs" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      📊 Density Comparison Across Common Materials
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Density" fill="#518231" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Tab 3: Step-by-Step Solution */}
                {activeTab === "explanation" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-step Solution</h4>
                    
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Density Formula: ρ = m / V</div>
                      <div>2. Knowns: Mass m = {results.mSI.toFixed(2)} kg, Volume V = {results.vSI.toFixed(4)} m³</div>
                      <div>3. Calculation: ρ = {results.mSI.toFixed(2)} / {results.vSI.toFixed(4)}</div>
                      <div>4. Result: ρ = {results.dSI.toFixed(2)} kg/m³ ({results.dDisplay.toFixed(3)} {densityUnit})</div>
                      <div>5. Specific Gravity (vs Water @ 4°C): {results.dSI.toFixed(2)} / 1000 = {results.specificGravity.toFixed(4)}</div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Physics Quiz */}
                {activeTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Practice Physics Quiz</h4>
                    
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

interface InfoTooltipProps {
  text: string;
}

function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <div className="group relative inline-block text-slate-400 hover:text-slate-600 cursor-pointer">
      <Info size={13} />
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl pointer-events-none z-50 leading-relaxed font-normal">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
      </div>
    </div>
  );
}
