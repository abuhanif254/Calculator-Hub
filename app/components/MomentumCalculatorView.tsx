"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Gauge, Clock, Zap, Bike, Car, Train, Plane, 
  Rocket, Sliders, Activity, Sparkles, AlertTriangle, ArrowRight, Compass, Globe, Scale
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CalcMode = "momentum" | "mass" | "velocity";

// Conversion factors to SI base units (kg·m/s, kg, m/s)
const MOMENTUM_CONVERSIONS: Record<string, number> = {
  "kg·m/s": 1,
  "N·s": 1
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
interface MomentumPreset {
  name: string;
  mass: number; // kg
  velocity: number; // m/s
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
}

const MOMENTUM_PRESETS: MomentumPreset[] = [
  { name: "Fast Baseball", mass: 0.145, velocity: 40, icon: Zap, desc: "0.145 kg @ 144 km/h (5.8 kg·m/s)" },
  { name: "Bowling Ball", mass: 6.0, velocity: 8.0, icon: Zap, desc: "6 kg @ 28.8 km/h (48 kg·m/s)" },
  { name: "Sprinting Athlete", mass: 75.0, velocity: 10.0, icon: Zap, desc: "75 kg @ 36 km/h (750 kg·m/s)" },
  { name: "Cyclist at Speed", mass: 85.0, velocity: 8.33, icon: Bike, desc: "85 kg @ 30 km/h (708 kg·m/s)" },
  { name: "Sports Motorcycle", mass: 220.0, velocity: 27.78, icon: Car, desc: "220 kg @ 100 km/h (6.11 k kg·m/s)" },
  { name: "Family Sedan", mass: 1500.0, velocity: 27.78, icon: Car, desc: "1,500 kg @ 100 km/h (41.67 k kg·m/s)" },
  { name: "Semi Truck", mass: 15000.0, velocity: 25.0, icon: Train, desc: "15,000 kg @ 90 km/h (375 k kg·m/s)" },
  { name: "Bullet Train", mass: 400000.0, velocity: 83.33, icon: Train, desc: "400,000 kg @ 300 km/h (33.33 M kg·m/s)" },
  { name: "Commercial Airliner", mass: 180000.0, velocity: 250.0, icon: Plane, desc: "180,000 kg @ 900 km/h (45.0 M kg·m/s)" },
  { name: "Space Rocket Cruise", mass: 2800000.0, velocity: 1000.0, icon: Rocket, desc: "2.8M kg @ 3,600 km/h (2.8 B kg·m/s)" }
];

// Logarithmic Momentum Tiers
const MOMENTUM_TIERS = [
  { name: "Very Low Momentum", max: 1, color: "#10b981", label: "< 1 kg·m/s (Light insect / feather)" },
  { name: "Low Momentum", max: 100, color: "#3b82f6", label: "1 - 100 kg·m/s (Sports balls / thrown objects)" },
  { name: "Medium Momentum", max: 10000, color: "#8b5cf6", label: "100 - 10,000 kg·m/s (Athletes / Motorcycles)" },
  { name: "High Momentum", max: 1000000, color: "#f59e0b", label: "10k - 1M kg·m/s (Cars / Semi Trucks)" },
  { name: "Extreme Momentum", max: Infinity, color: "#ef4444", label: "> 1M kg·m/s (Bullet trains / Aircraft / Rockets)" }
];

// Planet Gravity Context Data
const PLANETS = [
  { name: "Earth", g: 9.81, desc: "Standard Gravity (g = 9.81 m/s²)" },
  { name: "Moon", g: 1.62, desc: "16.5% Earth Gravity (g = 1.62 m/s²)" },
  { name: "Mars", g: 3.71, desc: "38% Earth Gravity (g = 3.71 m/s²)" },
  { name: "Jupiter", g: 24.79, desc: "253% Earth Gravity (g = 24.79 m/s²)" }
];

export function MomentumCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("momentum");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input states (in display units)
  const [massVal, setMassVal] = useState<number>(1500);
  const [massUnit, setMassUnit] = useState<string>("kg");

  const [velVal, setVelVal] = useState<number>(27.78);
  const [velUnit, setVelUnit] = useState<string>("m/s");

  const [momentumVal, setMomentumVal] = useState<number>(41670);
  const [momentumUnit, setMomentumUnit] = useState<string>("kg·m/s");

  // Advanced Mode Tab Selection
  const [activeTab, setActiveTab] = useState<"visuals" | "collision" | "ke_compare" | "planets" | "explanation" | "quiz">("visuals");

  // Collision Explorer States (Object 1 & Object 2)
  const [colM1, setColM1] = useState<number>(1500);
  const [colV1, setColV1] = useState<number>(20);
  const [colM2, setColM2] = useState<number>(1000);
  const [colV2, setColV2] = useState<number>(0);
  const [colType, setColType] = useState<"elastic" | "inelastic">("elastic");

  // Selected Planet State
  const [selectedPlanet, setSelectedPlanet] = useState(PLANETS[0]);

  // Animation Timeline States
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
      if (params.get("p")) setMomentumVal(Number(params.get("p")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (kg·m/s, kg, m/s)
  const siInputs = useMemo(() => {
    const mSI = massVal * (MASS_CONVERSIONS[massUnit] || 1);
    const vSI = velVal * (VELOCITY_CONVERSIONS[velUnit] || 1);
    const pSI = momentumVal * (MOMENTUM_CONVERSIONS[momentumUnit] || 1);
    return { mSI, vSI, pSI };
  }, [massVal, massUnit, velVal, velUnit, momentumVal, momentumUnit]);

  // Perform Momentum Calculation: p = m * v
  const results = useMemo(() => {
    let finalPSI = siInputs.pSI;
    let finalMSI = siInputs.mSI;
    let finalVSI = siInputs.vSI;

    if (calcMode === "momentum") {
      finalPSI = siInputs.mSI * siInputs.vSI;
    } else if (calcMode === "mass") {
      if (Math.abs(siInputs.vSI) > 0.000001) {
        finalMSI = siInputs.pSI / siInputs.vSI;
      } else {
        finalMSI = 0;
      }
    } else if (calcMode === "velocity") {
      if (Math.abs(siInputs.mSI) > 0.000001) {
        finalVSI = siInputs.pSI / siInputs.mSI;
      } else {
        finalVSI = 0;
      }
    }

    // Kinetic Energy: KE = 0.5 * m * v^2 = p^2 / (2 * m)
    const kineticEnergyJoules = 0.5 * finalMSI * Math.pow(finalVSI, 2);

    // Convert results back to selected display units
    const pDisplay = finalPSI / (MOMENTUM_CONVERSIONS[momentumUnit] || 1);
    const mDisplay = finalMSI / (MASS_CONVERSIONS[massUnit] || 1);
    const vDisplay = finalVSI / (VELOCITY_CONVERSIONS[velUnit] || 1);

    // Determine Momentum Tier
    const tier = MOMENTUM_TIERS.find(t => Math.abs(finalPSI) <= t.max) || MOMENTUM_TIERS[MOMENTUM_TIERS.length - 1];

    return {
      pSI: finalPSI,
      mSI: finalMSI,
      vSI: finalVSI,
      kineticEnergyJoules,
      pDisplay,
      mDisplay,
      vDisplay,
      tier
    };
  }, [calcMode, siInputs, momentumUnit, massUnit, velUnit]);

  // Collision Explorer Calculations
  const collisionResults = useMemo(() => {
    const pInitialTotal = colM1 * colV1 + colM2 * colV2;
    let v1Final = 0;
    let v2Final = 0;

    if (colType === "elastic") {
      // 1D Elastic Collision formulas:
      // v1' = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2)
      // v2' = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)
      const totalM = colM1 + colM2;
      v1Final = ((colM1 - colM2) * colV1 + 2 * colM2 * colV2) / totalM;
      v2Final = ((colM2 - colM1) * colV2 + 2 * colM1 * colV1) / totalM;
    } else {
      // Perfectly Inelastic Collision (objects stick together):
      // v' = (m1 * v1 + m2 * v2) / (m1 + m2)
      const vFinal = pInitialTotal / (colM1 + colM2);
      v1Final = vFinal;
      v2Final = vFinal;
    }

    const pFinalTotal = colM1 * v1Final + colM2 * v2Final;
    const keInitial = 0.5 * colM1 * Math.pow(colV1, 2) + 0.5 * colM2 * Math.pow(colV2, 2);
    const keFinal = 0.5 * colM1 * Math.pow(v1Final, 2) + 0.5 * colM2 * Math.pow(v2Final, 2);
    const keLost = Math.max(0, keInitial - keFinal);

    return { v1Final, v2Final, pInitialTotal, pFinalTotal, keInitial, keFinal, keLost };
  }, [colM1, colV1, colM2, colV2, colType]);

  // Recharts Motion Graph Data (Momentum vs Velocity)
  const graphData = useMemo(() => {
    const steps = 10;
    const data = [];
    const baseV = Math.max(1, results.vSI);
    const dV = (baseV * 2) / steps;
    for (let i = 1; i <= steps; i++) {
      const v = i * dV;
      const p = results.mSI * v;
      const ke = 0.5 * results.mSI * Math.pow(v, 2);
      data.push({
        Velocity: Number(v.toFixed(1)),
        Momentum: Number((p / (MOMENTUM_CONVERSIONS[momentumUnit] || 1)).toFixed(1)),
        KineticEnergy: Number(ke.toFixed(1))
      });
    }
    return data;
  }, [results, momentumUnit]);

  // Animation timeline effect
  const durationSim = 4; // 4 seconds animation loop
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
  const applyPreset = (preset: MomentumPreset) => {
    setMassVal(preset.mass);
    setMassUnit("kg");
    setVelVal(preset.velocity);
    setVelUnit("m/s");
    setCalcMode("momentum");
    triggerNotification("success", `Loaded ${preset.name} parameters!`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&m=${massVal}&v=${velVal}&p=${momentumVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable parameters URL copied!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Linear Momentum Calculation (p = m · v)
-----------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Calculated Momentum: ${results.pDisplay.toFixed(4)} ${momentumUnit}
Mass: ${results.mDisplay.toFixed(3)} ${massUnit}
Velocity: ${results.vDisplay.toFixed(3)} ${velUnit}
Associated Kinetic Energy: ${results.kineticEnergyJoules.toFixed(2)} Joules
-----------------------------------------
SI Base Values:
Momentum: ${results.pSI.toFixed(2)} kg·m/s
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
        q: "What is the momentum of a 1500 kg car moving at a velocity of 20 m/s?",
        correctAnswer: 30000,
        units: "kg·m/s",
        type: "momentum" as CalcMode
      },
      {
        q: "A rolling bowling ball has a momentum of 48 kg·m/s and a velocity of 8 m/s. What is its mass in kg?",
        correctAnswer: 6,
        units: "kg",
        type: "mass" as CalcMode
      },
      {
        q: "A 0.5 kg football has a momentum of 15 kg·m/s. What is its velocity in m/s?",
        correctAnswer: 30,
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

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Cockpit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="text-[#518231]" />
                Momentum Cockpit (p = m · v)
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
                { key: "momentum", label: "Momentum (p)" },
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

            {/* Parameter Fields based on Calculation Mode */}
            <div className="space-y-6">
              
              {/* Mass Input (m) */}
              {calcMode !== "mass" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Mass (m)
                      <InfoTooltip text="The mass of the moving object." />
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
                      <InfoTooltip text="The velocity magnitude of the object." />
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

              {/* Momentum Input (p) */}
              {calcMode !== "momentum" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Linear Momentum (p)
                      <InfoTooltip text="The product of mass and velocity (p = m · v)." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={momentumVal}
                        onChange={(e) => setMomentumVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={momentumUnit}
                        onChange={(e) => setMomentumUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(MOMENTUM_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100000"
                    step="100"
                    value={momentumVal}
                    onChange={(e) => setMomentumVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Momentum (p - Calculated)" val={`${results.pDisplay.toFixed(3)} ${momentumUnit}`} icon={Zap} />
              )}

            </div>
          </div>

          {/* Smart Conversion Table panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Zap size={16} className="text-[#518231]" />
              Smart Momentum Conversion Table
            </h3>
            <div className="space-y-2">
              {Object.keys(MOMENTUM_CONVERSIONS).map(uKey => {
                const convVal = results.pSI / MOMENTUM_CONVERSIONS[uKey];
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

        {/* Right Column: Visual Dashboard, Motion Canvas & 5 Premium Feature Tabs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                Momentum Vector & Logarithmic Radial Gauge
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{results.tier.name}</span>
              </div>
            </div>

            {/* Radial Arc Momentum Gauge */}
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
                    strokeDashoffset={126 - Math.min(126, Math.max(5, (Math.log10(Math.max(1, results.pSI)) / 8) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.pSI)) / 8))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.pSI)) / 8))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center -mt-2">
                <div className="text-xl font-black text-white" style={{ color: results.tier.color }}>
                  {results.pDisplay.toFixed(2)} {momentumUnit}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  {results.tier.label}
                </div>
              </div>
            </div>

            {/* Object Motion Canvas */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative h-32 flex items-center justify-between">
              
              {/* Momentum Vector Arrow Header */}
              <div 
                className="absolute top-4 left-6 flex items-center gap-1 transition-all duration-300"
                style={{ left: `${10 + currentPosRatio * 75}%` }}
              >
                <div className="bg-[#518231] text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                  <ArrowRight size={12} />
                  <span>p = {results.pSI.toFixed(1)} kg·m/s</span>
                </div>
              </div>

              {/* Track Line */}
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
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Momentum</span>
                <div className="text-xs sm:text-sm font-black text-[#518231] mt-1">{results.pDisplay.toFixed(2)} {momentumUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Mass</span>
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

          {/* Advanced Mode Tabbed Panel containing 5 Premium Signature Features */}
          {isAdvancedMode && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in">
              
              {/* Header Tabs */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 flex-wrap">
                {(["visuals", "collision", "ke_compare", "planets", "explanation", "quiz"] as const).map(tab => (
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
                    {tab === "visuals" ? "Graphs" : tab === "collision" ? "🚗 Collision" : tab === "ke_compare" ? "⚖️ p vs KE" : tab === "planets" ? "🌍 Planets" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Areas */}
              <div className="p-6">
                
                {/* Tab 1: Recharts Graphs & Real-World Momentum Scale */}
                {activeTab === "visuals" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Momentum vs Velocity Curve (at {results.mDisplay.toFixed(1)} {massUnit})</h4>
                      <p className="text-xs text-slate-500 mb-2">Linear momentum scales directly with object velocity:</p>
                      
                      {isClient ? (
                        <div className="h-52 w-full mt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={graphData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="Velocity" label={{ value: "Velocity (m/s)", position: "insideBottom", offset: -5 }} />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="Momentum" stroke="#518231" strokeWidth={2.5} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                      )}
                    </div>

                    {/* Real-World Presets */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">🎯 Real-World Momentum Scale Presets</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                        {MOMENTUM_PRESETS.map((preset, idx) => {
                          const IconComp = preset.icon;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => applyPreset(preset)}
                              className="flex items-start gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-950 hover:bg-[#518231]/10 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 text-left transition-all group"
                            >
                              <div className="p-1.5 bg-white dark:bg-slate-900 text-[#518231] rounded-xl shadow-sm group-hover:scale-105 transition-transform">
                                <IconComp size={14} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{preset.name}</div>
                                <div className="text-[10px] text-slate-400">{preset.desc}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Signature Feature 1: Collision Explorer */}
                {activeTab === "collision" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Car size={16} className="text-[#518231]" />
                        🚗 Interactive 1D Collision Simulator
                      </h4>

                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setColType("elastic")}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                            colType === "elastic" ? "bg-white dark:bg-slate-800 text-[#518231] shadow-sm" : "text-slate-500"
                          }`}
                        >
                          Elastic
                        </button>
                        <button
                          type="button"
                          onClick={() => setColType("inelastic")}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                            colType === "inelastic" ? "bg-white dark:bg-slate-800 text-[#518231] shadow-sm" : "text-slate-500"
                          }`}
                        >
                          Inelastic
                        </button>
                      </div>
                    </div>

                    {/* Collision inputs */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-emerald-600 block">Object 1</span>
                        <div className="text-[10px] text-slate-500">Mass: <strong>{colM1} kg</strong></div>
                        <input
                          type="range"
                          min="100"
                          max="3000"
                          step="50"
                          value={colM1}
                          onChange={(e) => setColM1(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <div className="text-[10px] text-slate-500">Initial Velocity: <strong>{colV1} m/s</strong></div>
                        <input
                          type="range"
                          min="-40"
                          max="40"
                          step="1"
                          value={colV1}
                          onChange={(e) => setColV1(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-blue-600 block">Object 2</span>
                        <div className="text-[10px] text-slate-500">Mass: <strong>{colM2} kg</strong></div>
                        <input
                          type="range"
                          min="100"
                          max="3000"
                          step="50"
                          value={colM2}
                          onChange={(e) => setColM2(Number(e.target.value))}
                          className="w-full accent-blue-500 cursor-pointer"
                        />
                        <div className="text-[10px] text-slate-500">Initial Velocity: <strong>{colV2} m/s</strong></div>
                        <input
                          type="range"
                          min="-40"
                          max="40"
                          step="1"
                          value={colV2}
                          onChange={(e) => setColV2(Number(e.target.value))}
                          className="w-full accent-blue-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Collision Results Card */}
                    <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
                      <div className="text-slate-400 font-sans font-bold text-[10px] uppercase">Collision Velocity Outputs</div>
                      <div className="flex justify-between">
                        <span>Object 1 Final Velocity (v1'):</span>
                        <strong className="text-emerald-400">{collisionResults.v1Final.toFixed(2)} m/s</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Object 2 Final Velocity (v2'):</span>
                        <strong className="text-blue-400">{collisionResults.v2Final.toFixed(2)} m/s</strong>
                      </div>
                      <div className="flex justify-between border-t border-slate-800 pt-2 text-slate-400">
                        <span>Kinetic Energy Lost:</span>
                        <strong className="text-amber-400">{collisionResults.keLost.toFixed(1)} Joules</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Signature Feature 2: Momentum vs Kinetic Energy Comparison */}
                {activeTab === "ke_compare" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Scale size={16} className="text-[#518231]" />
                      ⚖️ Momentum (p) vs Kinetic Energy (KE) Comparison
                    </h4>

                    <p className="text-xs text-slate-500">
                      While Momentum scales linearly with velocity ($p = mv$), Kinetic Energy scales quadratically with velocity ($KE = \frac{1}{2}mv^2$).
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Linear Momentum (p)</span>
                        <div className="text-lg font-black text-[#518231] mt-1">{results.pSI.toFixed(2)} kg·m/s</div>
                        <p className="text-[10px] text-slate-500 mt-2">Formula: p = m · v</p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Kinetic Energy (KE)</span>
                        <div className="text-lg font-black text-amber-500 mt-1">{results.kineticEnergyJoules.toFixed(2)} Joules</div>
                        <p className="text-[10px] text-slate-500 mt-2">Formula: KE = ½m·v² = p²/(2m)</p>
                      </div>
                    </div>

                    <div className="bg-[#518231]/5 border border-[#518231]/20 p-4 rounded-2xl text-xs leading-relaxed">
                      <strong>Insight:</strong> Doubling velocity doubles momentum ($2\times p$), but quadruples kinetic energy ($4\times KE$).
                    </div>
                  </div>
                )}

                {/* Signature Feature 3: Planet Environment Context */}
                {activeTab === "planets" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Globe size={16} className="text-[#518231]" />
                      🌍 Planetary Weight vs Momentum Context
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
                          <div className="text-[10px] text-slate-400 mt-1">g = {planet.g} m/s²</div>
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div className="text-slate-400 font-bold text-[10px] uppercase">{selectedPlanet.name} Environmental Impact</div>
                      <div className="flex justify-between">
                        <span>Object Weight on {selectedPlanet.name}:</span>
                        <strong className="text-amber-400">{(results.mSI * selectedPlanet.g).toFixed(2)} Newtons</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Horizontal Linear Momentum (p = mv):</span>
                        <strong className="text-emerald-400">{results.pSI.toFixed(2)} kg·m/s</strong>
                      </div>
                      <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                        Linear momentum depends strictly on mass and velocity ($p = mv$), remaining identical across Earth, Moon, or Mars. However, stopping distances vary due to differing normal forces and gravitational friction.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 5: Step-by-Step Derivations */}
                {activeTab === "explanation" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-step Solution</h4>
                    
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Formula: p = m · v</div>
                      <div>2. Knowns: m = {results.mSI.toFixed(2)} kg, v = {results.vSI.toFixed(2)} m/s</div>
                      <div>3. Calculation: p = {results.mSI.toFixed(2)} · {results.vSI.toFixed(2)}</div>
                      <div>4. Result: p = {results.pSI.toFixed(2)} kg·m/s ({results.pDisplay.toFixed(3)} {momentumUnit})</div>
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
