"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Gauge, Zap, Bike, Car, Train, Plane, 
  Rocket, Sliders, Activity, Sparkles, AlertTriangle, ArrowRight, Scale, Globe, Flame, Layers
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CalcMode = "ke" | "mass" | "velocity";

// Conversion factors to SI base units (J, kg, m/s)
const ENERGY_CONVERSIONS: Record<string, number> = {
  "J": 1,
  "kJ": 1000,
  "MJ": 1000000,
  "Wh": 3600,
  "kWh": 3600000
};

const MASS_CONVERSIONS: Record<string, number> = {
  "kg": 1,
  "g": 0.001,
  "mg": 0.000001,
  "lb": 0.453592,
  "oz": 0.0283495,
  "ton": 1000
};

const VELOCITY_CONVERSIONS: Record<string, number> = {
  "m/s": 1,
  "km/h": 1 / 3.6,
  "mph": 0.44704,
  "ft/s": 0.3048,
  "knots": 0.514444
};

// Real-world Presets
interface KEPreset {
  name: string;
  mass: number; // kg
  velocity: number; // m/s
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
}

const KE_PRESETS: KEPreset[] = [
  { name: "Fast Baseball", mass: 0.145, velocity: 40, icon: Zap, desc: "116 Joules (144 km/h pitch)" },
  { name: "Bowling Ball", mass: 6.0, velocity: 8.0, icon: Zap, desc: "192 Joules (28.8 km/h roll)" },
  { name: "Sprinting Athlete", mass: 75.0, velocity: 10.0, icon: Zap, desc: "3,750 Joules (3.75 kJ)" },
  { name: "Cyclist Sprint", mass: 85.0, velocity: 11.11, icon: Bike, desc: "5,246 Joules (5.25 kJ)" },
  { name: "Sports Motorcycle", mass: 220.0, velocity: 27.78, icon: Car, desc: "84,887 Joules (84.89 kJ)" },
  { name: "Family Sedan", mass: 1500.0, velocity: 27.78, icon: Car, desc: "578,773 Joules (578.8 kJ)" },
  { name: "Semi Truck", mass: 15000.0, velocity: 25.0, icon: Train, desc: "4,687,500 Joules (4.69 MJ)" },
  { name: "Bullet Train", mass: 400000.0, velocity: 83.33, icon: Train, desc: "1.388 Billion Joules (1.39 GJ)" },
  { name: "Commercial Jet", mass: 180000.0, velocity: 250.0, icon: Plane, desc: "5.625 Billion Joules (5.63 GJ)" },
  { name: "Space Rocket Cruise", mass: 2800000.0, velocity: 1000.0, icon: Rocket, desc: "1.4 Trillion Joules (1.4 TJ)" }
];

// Logarithmic Energy Tiers
const ENERGY_TIERS = [
  { name: "Very Low Energy", max: 10, color: "#10b981", label: "< 10 J (Small insect / feather)" },
  { name: "Low Energy", max: 1000, color: "#3b82f6", label: "10 J - 1 kJ (Sports balls / thrown objects)" },
  { name: "Medium Energy", max: 100000, color: "#8b5cf6", label: "1 kJ - 100 kJ (Athletes / Motorcycles)" },
  { name: "High Energy", max: 10000000, color: "#f59e0b", label: "100 kJ - 10 MJ (Cars / Semi Trucks)" },
  { name: "Extreme Energy", max: Infinity, color: "#ef4444", label: "> 10 MJ (Bullet trains / Aircraft / Rockets)" }
];

// Planet Context
const PLANETS = [
  { name: "Earth", g: 9.81, desc: "Standard Gravity & Atmosphere" },
  { name: "Moon", g: 1.62, desc: "Vacuum / 16.5% Earth Gravity" },
  { name: "Mars", g: 3.71, desc: "Thin Atmosphere / 38% Gravity" },
  { name: "Jupiter", g: 24.79, desc: "Dense Atmosphere / 253% Gravity" }
];

export function KineticEnergyCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("ke");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input states (in display units)
  const [massVal, setMassVal] = useState<number>(1500);
  const [massUnit, setMassUnit] = useState<string>("kg");

  const [velVal, setVelVal] = useState<number>(27.78);
  const [velUnit, setVelUnit] = useState<string>("m/s");

  const [energyVal, setEnergyVal] = useState<number>(578773);
  const [energyUnit, setEnergyUnit] = useState<string>("J");

  // Advanced Mode Tab Selection
  const [activeTab, setActiveTab] = useState<"visuals" | "quadratic" | "breakdown" | "planets" | "explanation" | "quiz">("visuals");

  // Selected Planet
  const [selectedPlanet, setSelectedPlanet] = useState(PLANETS[0]);

  // Animation timeline states
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
      if (params.get("v")) setVelVal(Number(params.get("v")));
      if (params.get("ke")) setEnergyVal(Number(params.get("ke")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (J, kg, m/s)
  const siInputs = useMemo(() => {
    const mSI = massVal * (MASS_CONVERSIONS[massUnit] || 1);
    const vSI = velVal * (VELOCITY_CONVERSIONS[velUnit] || 1);
    const keSI = energyVal * (ENERGY_CONVERSIONS[energyUnit] || 1);
    return { mSI, vSI, keSI };
  }, [massVal, massUnit, velVal, velUnit, energyVal, energyUnit]);

  // Perform Kinetic Energy Calculation: KE = 0.5 * m * v^2
  const results = useMemo(() => {
    let finalKESI = siInputs.keSI;
    let finalMSI = siInputs.mSI;
    let finalVSI = siInputs.vSI;

    if (calcMode === "ke") {
      finalKESI = 0.5 * siInputs.mSI * Math.pow(siInputs.vSI, 2);
    } else if (calcMode === "mass") {
      if (Math.abs(siInputs.vSI) > 0.000001) {
        finalMSI = (2 * siInputs.keSI) / Math.pow(siInputs.vSI, 2);
      } else {
        finalMSI = 0;
      }
    } else if (calcMode === "velocity") {
      if (Math.abs(siInputs.mSI) > 0.000001) {
        finalVSI = Math.sqrt((2 * siInputs.keSI) / siInputs.mSI);
      } else {
        finalVSI = 0;
      }
    }

    // Equivalent Linear Momentum: p = m * v = sqrt(2 * m * KE)
    const momentumSI = finalMSI * finalVSI;

    // Energy Breakdown: Contribution ratio of mass vs velocity squared
    // Since KE = 0.5 * m * v^2, doubling m doubles KE (+100%), but doubling v quadruples KE (+300%).
    const vFactor = Math.pow(finalVSI, 2);
    const totalFactor = finalMSI + vFactor;
    const massContribPercent = totalFactor > 0 ? (finalMSI / totalFactor) * 100 : 50;
    const velContribPercent = totalFactor > 0 ? (vFactor / totalFactor) * 100 : 50;

    // Convert results back to display units
    const keDisplay = finalKESI / (ENERGY_CONVERSIONS[energyUnit] || 1);
    const mDisplay = finalMSI / (MASS_CONVERSIONS[massUnit] || 1);
    const vDisplay = finalVSI / (VELOCITY_CONVERSIONS[velUnit] || 1);

    // Determine Energy Tier
    const tier = ENERGY_TIERS.find(t => finalKESI <= t.max) || ENERGY_TIERS[ENERGY_TIERS.length - 1];

    return {
      keSI: finalKESI,
      mSI: finalMSI,
      vSI: finalVSI,
      momentumSI,
      massContribPercent,
      velContribPercent,
      keDisplay,
      mDisplay,
      vDisplay,
      tier
    };
  }, [calcMode, siInputs, energyUnit, massUnit, velUnit]);

  // Recharts Quadratic Motion Curve Data (KE vs Velocity)
  const quadraticGraphData = useMemo(() => {
    const steps = 12;
    const data = [];
    const baseV = Math.max(1, results.vSI);
    const dV = (baseV * 2) / steps;
    for (let i = 0; i <= steps; i++) {
      const v = i * dV;
      const ke = 0.5 * results.mSI * Math.pow(v, 2);
      data.push({
        Velocity: Number(v.toFixed(1)),
        KineticEnergy: Number((ke / (ENERGY_CONVERSIONS[energyUnit] || 1)).toFixed(1)),
        Momentum: Number((results.mSI * v).toFixed(1))
      });
    }
    return data;
  }, [results, energyUnit]);

  // Animation timeline effect
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

  // Preset Applicator
  const applyPreset = (preset: KEPreset) => {
    setMassVal(preset.mass);
    setMassUnit("kg");
    setVelVal(preset.velocity);
    setVelUnit("m/s");
    setCalcMode("ke");
    triggerNotification("success", `Loaded ${preset.name} parameters!`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&m=${massVal}&v=${velVal}&ke=${energyVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable scenario link copied!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Kinetic Energy Calculation (KE = ½m·v²)
-----------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Calculated Kinetic Energy: ${results.keDisplay.toFixed(4)} ${energyUnit}
Mass: ${results.mDisplay.toFixed(3)} ${massUnit}
Velocity: ${results.vDisplay.toFixed(3)} ${velUnit}
Equivalent Linear Momentum: ${results.momentumSI.toFixed(2)} kg·m/s
-----------------------------------------
SI Base Values:
Kinetic Energy: ${results.keSI.toFixed(2)} Joules
Mass: ${results.mSI.toFixed(2)} kg
Velocity: ${results.vSI.toFixed(2)} m/s`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      {
        q: "What is the kinetic energy of a 1000 kg car driving at 20 m/s?",
        correctAnswer: 200000,
        units: "J",
        type: "ke" as CalcMode
      },
      {
        q: "An object moving at 10 m/s possesses 250 Joules of kinetic energy. What is its mass in kg?",
        correctAnswer: 5,
        units: "kg",
        type: "mass" as CalcMode
      },
      {
        q: "What velocity in m/s is required for a 2 kg bowling ball to have 100 Joules of kinetic energy?",
        correctAnswer: 10,
        units: "m/s",
        type: "velocity" as CalcMode
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

      {/* 🔄 Mechanical Energy Hub Top Pill Navigation */}
      <div className="bg-slate-100 dark:bg-slate-900/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex items-center justify-between overflow-x-auto gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 flex items-center gap-1.5 shrink-0">
          <Layers size={14} className="text-[#518231]" />
          Mechanical Energy Hub:
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Kinetic Energy
          </span>
          <Link href="/calculators/potential-energy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Potential Energy
          </Link>
          <Link href="/calculators/work-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Work
          </Link>
          <Link href="/calculators/power-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Power
          </Link>
          <Link href="/calculators/momentum-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Momentum
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
                <Flame className="text-[#518231]" />
                Kinetic Cockpit (KE = ½m·v²)
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
                { key: "ke", label: "Energy (KE)" },
                { key: "mass", label: "Mass (m)" },
                { key: "velocity", label: "Velocity (v)" }
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
              
              {/* Mass Input (m) */}
              {calcMode !== "mass" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Mass (m)
                      <InfoTooltip text="The mass of the moving body." />
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
                    step="5"
                    value={massVal}
                    onChange={(e) => setMassVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Mass (m - Calculated)" val={`${results.mDisplay.toFixed(3)} ${massUnit}`} icon={Scale} />
              )}

              {/* Velocity Input (v) */}
              {calcMode !== "velocity" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Velocity (v)
                      <InfoTooltip text="The speed of motion. Kinetic energy scales quadratically with velocity." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.1"
                        value={velVal}
                        onChange={(e) => setVelVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={velUnit}
                        onChange={(e) => setVelUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(VELOCITY_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="100"
                    step="0.5"
                    value={velVal}
                    onChange={(e) => setVelVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Velocity (v - Calculated)" val={`${results.vDisplay.toFixed(3)} ${velUnit}`} icon={Gauge} />
              )}

              {/* Kinetic Energy Input (KE) */}
              {calcMode !== "ke" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Kinetic Energy (KE)
                      <InfoTooltip text="The energy possessed by an object due to its motion (KE = ½m·v²)." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={energyVal}
                        onChange={(e) => setEnergyVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={energyUnit}
                        onChange={(e) => setEnergyUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(ENERGY_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000000"
                    step="1000"
                    value={energyVal}
                    onChange={(e) => setEnergyVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Kinetic Energy (KE - Calculated)" val={`${results.keDisplay.toFixed(3)} ${energyUnit}`} icon={Zap} />
              )}

            </div>
          </div>

          {/* Smart Conversion Table panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Zap size={16} className="text-[#518231]" />
              Smart Energy Conversion Table
            </h3>
            <div className="space-y-2">
              {Object.keys(ENERGY_CONVERSIONS).map(uKey => {
                const convVal = results.keSI / ENERGY_CONVERSIONS[uKey];
                return (
                  <div key={uKey} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 font-semibold">{uKey}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{convVal.toFixed(4)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Dashboard, Energy Gauge & Signature Extra Features */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                Energy Visualization & Logarithmic Arc Gauge
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{results.tier.name}</span>
              </div>
            </div>

            {/* Radial Arc Energy Gauge */}
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
                    strokeDashoffset={126 - Math.min(126, Math.max(5, (Math.log10(Math.max(1, results.keSI)) / 8) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.keSI)) / 8))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.keSI)) / 8))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center -mt-2">
                <div className="text-xl font-black text-white" style={{ color: results.tier.color }}>
                  {results.keDisplay.toFixed(2)} {energyUnit}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  {results.tier.label}
                </div>
              </div>
            </div>

            {/* Motion Canvas */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative h-32 flex items-center justify-between">
              <div 
                className="absolute top-4 left-6 flex items-center gap-1 transition-all duration-300"
                style={{ left: `${10 + currentPosRatio * 75}%` }}
              >
                <div className="bg-[#518231] text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                  <ArrowRight size={12} />
                  <span>KE = {results.keSI.toFixed(0)} J</span>
                </div>
              </div>

              <div className="w-full h-1 bg-slate-800 rounded-full relative mt-6">
                <div 
                  className="absolute -top-3.5 -translate-x-1/2 w-8 h-8 bg-[#518231] rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all ease-linear"
                  style={{ left: `${currentPosRatio * 100}%` }}
                >
                  <Car size={14} className="text-white" />
                </div>
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
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Kinetic Energy</span>
                <div className="text-xs sm:text-sm font-black text-[#518231] mt-1">{results.keDisplay.toFixed(2)} {energyUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Object Mass</span>
                <div className="text-xs sm:text-sm font-black text-amber-400 mt-1">{results.mDisplay.toFixed(2)} {massUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Velocity</span>
                <div className="text-xs sm:text-sm font-black text-blue-400 mt-1">{results.vDisplay.toFixed(2)} {velUnit}</div>
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

          {/* Advanced Mode Tabbed Panel containing Extra Features */}
          {isAdvancedMode && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in">
              
              {/* Header Tabs */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 flex-wrap">
                {(["visuals", "quadratic", "breakdown", "planets", "explanation", "quiz"] as const).map(tab => (
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
                    {tab === "visuals" ? "Presets" : tab === "quadratic" ? "🎬 v² Impact" : tab === "breakdown" ? "📊 Breakdown" : tab === "planets" ? "🌍 Planets" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Areas */}
              <div className="p-6">
                
                {/* Tab 1: Real-World Presets */}
                {activeTab === "visuals" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚡ Energy Comparison Scale Presets</h4>
                    <p className="text-xs text-slate-500">Click any real-world preset to inspect its kinetic energy values:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                      {KE_PRESETS.map((preset, idx) => {
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

                {/* Extra Feature 1: Velocity Impact Simulator (Quadratic Curve KE vs v) */}
                {activeTab === "quadratic" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      🎬 Velocity Impact Simulator (KE ∝ v²)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Kinetic energy grows <strong>quadratically</strong> with velocity. Doubling speed quadruples (4x) the kinetic energy!
                    </p>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={quadraticGraphData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Velocity" label={{ value: "Velocity (m/s)", position: "insideBottom", offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="KineticEnergy" stroke="#518231" strokeWidth={2.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                    )}
                  </div>
                )}

                {/* Extra Feature 2: Energy Breakdown Panel */}
                {activeTab === "breakdown" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Zap size={16} className="text-[#518231]" />
                      📊 Energy Influence Breakdown Panel
                    </h4>

                    <p className="text-xs text-slate-500">
                      Visualizing the dominant factor driving the current energy output:
                    </p>

                    <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Mass Influence (m): <strong>{results.massContribPercent.toFixed(1)}%</strong></span>
                        <span>Velocity² Influence (v²): <strong>{results.velContribPercent.toFixed(1)}%</strong></span>
                      </div>

                      <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="bg-amber-500 h-full transition-all" style={{ width: `${results.massContribPercent}%` }}></div>
                        <div className="bg-[#518231] h-full transition-all" style={{ width: `${results.velContribPercent}%` }}></div>
                      </div>

                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Linear Factor (m)</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#518231]"></span> Quadratic Factor (v²)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Extra Feature 3: Planet Mode Context */}
                {activeTab === "planets" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Globe size={16} className="text-[#518231]" />
                      🌍 Planetary Gravity & Drag Context
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PLANETS.map(planet => (
                        <button
                          key={planet.name}
                          type="button"
                          onClick={() => setSelectedPlanet(planet)}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            selectedPlanet.name === planet.name 
                              ? "bg-[#518231]/10 border-[#518231] text-[#518231] font-bold" 
                              : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600"
                          }`}
                        >
                          <div className="text-xs">{planet.name}</div>
                          <div className="text-[10px] text-slate-400 mt-1">{planet.desc}</div>
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div className="text-slate-400 font-bold text-[10px] uppercase">{selectedPlanet.name} Context Summary</div>
                      <div className="flex justify-between">
                        <span>Object Weight on {selectedPlanet.name}:</span>
                        <strong className="text-amber-400">{(results.mSI * selectedPlanet.g).toFixed(2)} N</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Kinetic Energy (KE = ½m·v²):</span>
                        <strong className="text-emerald-400">{results.keSI.toFixed(2)} Joules</strong>
                      </div>
                      <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                        Translational Kinetic Energy ($KE = \frac{1}{2}mv^2$) depends on mass and velocity, remaining identical across planets. However, stopping distances and aerodynamic energy losses vary based on local gravity and atmospheric density.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 5: Step-by-Step Solution */}
                {activeTab === "explanation" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-step Solution</h4>
                    
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Kinetic Energy Formula: KE = ½ · m · v²</div>
                      <div>2. Knowns: m = {results.mSI.toFixed(2)} kg, v = {results.vSI.toFixed(2)} m/s</div>
                      <div>3. v² = ({results.vSI.toFixed(2)})² = {Math.pow(results.vSI, 2).toFixed(2)} m²/s²</div>
                      <div>4. KE = 0.5 · {results.mSI.toFixed(2)} · {Math.pow(results.vSI, 2).toFixed(2)} = {results.keSI.toFixed(2)} Joules ({results.keDisplay.toFixed(3)} {energyUnit})</div>
                    </div>
                  </div>
                )}

                {/* Tab 6: Physics Quiz */}
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
