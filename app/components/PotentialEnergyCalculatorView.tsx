"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Gauge, Zap, Bike, Car, Train, Plane, 
  Rocket, Sliders, Activity, Sparkles, AlertTriangle, ArrowDown, Scale, Globe, Layers, Building
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CalcMode = "pe" | "mass" | "height" | "gravity";

// Conversion factors to SI base units (J, kg, m, m/s²)
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

const HEIGHT_CONVERSIONS: Record<string, number> = {
  "m": 1,
  "cm": 0.01,
  "mm": 0.001,
  "km": 1000,
  "ft": 0.3048,
  "in": 0.0254
};

const GRAVITY_CONVERSIONS: Record<string, number> = {
  "m/s²": 1,
  "ft/s²": 0.3048
};

// Planet Gravity Presets
interface PlanetPreset {
  name: string;
  g: number; // m/s²
  desc: string;
}

const PLANET_PRESETS: PlanetPreset[] = [
  { name: "Earth", g: 9.81, desc: "Standard Earth Gravity (9.81 m/s²)" },
  { name: "Moon", g: 1.62, desc: "Lunar Gravity (1.62 m/s²)" },
  { name: "Mars", g: 3.71, desc: "Martian Gravity (3.71 m/s²)" },
  { name: "Mercury", g: 3.70, desc: "Mercurian Gravity (3.70 m/s²)" },
  { name: "Venus", g: 8.87, desc: "Cytherean Gravity (8.87 m/s²)" },
  { name: "Jupiter", g: 24.79, desc: "Jovian Gravity (24.79 m/s²)" },
  { name: "Saturn", g: 10.44, desc: "Saturnian Gravity (10.44 m/s²)" },
  { name: "Uranus", g: 8.69, desc: "Uranian Gravity (8.69 m/s²)" },
  { name: "Neptune", g: 11.15, desc: "Neptunian Gravity (11.15 m/s²)" },
  { name: "Pluto", g: 0.62, desc: "Plutonian Gravity (0.62 m/s²)" }
];

// Real-world Presets
interface PEPreset {
  name: string;
  mass: number; // kg
  height: number; // m
  g: number; // m/s²
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
}

const PE_PRESETS: PEPreset[] = [
  { name: "Book on Desk", mass: 1.5, height: 0.75, g: 9.81, icon: Zap, desc: "11 Joules (0.75m high desk)" },
  { name: "Person on Ladder", mass: 75, height: 3.0, g: 9.81, icon: Zap, desc: "2,207 Joules (2.21 kJ)" },
  { name: "Water Tank on Roof", mass: 1000, height: 15.0, g: 9.81, icon: Building, desc: "147,150 Joules (147.15 kJ)" },
  { name: "Roller Coaster Peak", mass: 800, height: 45.0, g: 9.81, icon: Car, desc: "353,160 Joules (353.16 kJ)" },
  { name: "Tower Crane Load", mass: 5000, height: 60.0, g: 9.81, icon: Building, desc: "2.94 Megajoules (2.94 MJ)" },
  { name: "Hydroelectric Dam", mass: 100000, height: 100.0, g: 9.81, icon: Globe, desc: "98.1 Megajoules (98.1 MJ)" },
  { name: "Hiker on Mountain", mass: 80, height: 2500.0, g: 9.81, icon: Zap, desc: "1.96 Megajoules (1.96 MJ)" },
  { name: "Space Rocket on Pad", mass: 2800000, height: 110.0, g: 9.81, icon: Rocket, desc: "3.02 Gigajoules (3.02 GJ)" }
];

// Logarithmic Energy Tiers
const ENERGY_TIERS = [
  { name: "Very Low Energy", max: 10, color: "#10b981", label: "< 10 J (Book or small item)" },
  { name: "Low Energy", max: 1000, color: "#3b82f6", label: "10 J - 1 kJ (Person on chair / step)" },
  { name: "Medium Energy", max: 100000, color: "#8b5cf6", label: "1 kJ - 100 kJ (Person on ladder / small crane)" },
  { name: "High Energy", max: 10000000, color: "#f59e0b", label: "100 kJ - 10 MJ (Water tanks / Heavy loads)" },
  { name: "Extreme Energy", max: Infinity, color: "#ef4444", label: "> 10 MJ (Hydroelectric dams / Rockets)" }
];

export function PotentialEnergyCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("pe");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input states (in display units)
  const [massVal, setMassVal] = useState<number>(1000);
  const [massUnit, setMassUnit] = useState<string>("kg");

  const [heightVal, setHeightVal] = useState<number>(15.0);
  const [heightUnit, setHeightUnit] = useState<string>("m");

  const [gravityVal, setGravityVal] = useState<number>(9.81);
  const [gravityUnit, setGravityUnit] = useState<string>("m/s²");

  const [energyVal, setEnergyVal] = useState<number>(147150);
  const [energyUnit, setEnergyUnit] = useState<string>("J");

  // Advanced Mode Tab Selection
  const [activeTab, setActiveTab] = useState<"visuals" | "freefall" | "planets" | "explanation" | "quiz">("visuals");

  // Selected Planet
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPreset>(PLANET_PRESETS[0]);

  // Animation Free-Fall states
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
      if (params.get("h")) setHeightVal(Number(params.get("h")));
      if (params.get("g")) setGravityVal(Number(params.get("g")));
      if (params.get("pe")) setEnergyVal(Number(params.get("pe")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (J, kg, m, m/s²)
  const siInputs = useMemo(() => {
    const mSI = massVal * (MASS_CONVERSIONS[massUnit] || 1);
    const hSI = heightVal * (HEIGHT_CONVERSIONS[heightUnit] || 1);
    const gSI = gravityVal * (GRAVITY_CONVERSIONS[gravityUnit] || 1);
    const peSI = energyVal * (ENERGY_CONVERSIONS[energyUnit] || 1);
    return { mSI, hSI, gSI, peSI };
  }, [massVal, massUnit, heightVal, heightUnit, gravityVal, gravityUnit, energyVal, energyUnit]);

  // Perform Gravitational Potential Energy Calculation: PE = m * g * h
  const results = useMemo(() => {
    let finalPESI = siInputs.peSI;
    let finalMSI = siInputs.mSI;
    let finalHSI = siInputs.hSI;
    let finalGSI = siInputs.gSI;

    if (calcMode === "pe") {
      finalPESI = siInputs.mSI * siInputs.gSI * siInputs.hSI;
    } else if (calcMode === "mass") {
      const denom = siInputs.gSI * siInputs.hSI;
      finalMSI = Math.abs(denom) > 0.000001 ? siInputs.peSI / denom : 0;
    } else if (calcMode === "height") {
      const denom = siInputs.mSI * siInputs.gSI;
      finalHSI = Math.abs(denom) > 0.000001 ? siInputs.peSI / denom : 0;
    } else if (calcMode === "gravity") {
      const denom = siInputs.mSI * siInputs.hSI;
      finalGSI = Math.abs(denom) > 0.000001 ? siInputs.peSI / denom : 0;
    }

    // Equivalent Free-Fall Terminal Impact Velocity: v_impact = sqrt(2 * g * h)
    const impactVelocitySI = Math.sqrt(Math.max(0, 2 * finalGSI * finalHSI));

    // Convert results back to display units
    const peDisplay = finalPESI / (ENERGY_CONVERSIONS[energyUnit] || 1);
    const mDisplay = finalMSI / (MASS_CONVERSIONS[massUnit] || 1);
    const hDisplay = finalHSI / (HEIGHT_CONVERSIONS[heightUnit] || 1);
    const gDisplay = finalGSI / (GRAVITY_CONVERSIONS[gravityUnit] || 1);

    // Determine Energy Tier
    const tier = ENERGY_TIERS.find(t => finalPESI <= t.max) || ENERGY_TIERS[ENERGY_TIERS.length - 1];

    return {
      peSI: finalPESI,
      mSI: finalMSI,
      hSI: finalHSI,
      gSI: finalGSI,
      impactVelocitySI,
      peDisplay,
      mDisplay,
      hDisplay,
      gDisplay,
      tier
    };
  }, [calcMode, siInputs, energyUnit, massUnit, heightUnit, gravityUnit]);

  // Free Fall Animation Duration: t_fall = sqrt(2 * h / g)
  const durationSim = useMemo(() => {
    if (results.gSI <= 0 || results.hSI <= 0) return 2;
    return Math.min(5, Math.max(1, Math.sqrt((2 * results.hSI) / results.gSI)));
  }, [results]);

  // Free Fall Simulation tick
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
  }, [isPlaying, playbackSpeed, durationSim]);

  // Height fallen ratio at currentTime: y(t) = 0.5 * g * t^2
  const fallRatio = useMemo(() => {
    if (durationSim <= 0) return 0;
    const t = Math.min(durationSim, currentTime);
    return Math.min(1, Math.pow(t / durationSim, 2));
  }, [currentTime, durationSim]);

  // Instantaneous Potential vs Kinetic Energy during free fall
  const currentPEInst = useMemo(() => {
    return results.peSI * (1 - fallRatio);
  }, [fallRatio, results.peSI]);

  const currentKEInst = useMemo(() => {
    return results.peSI * fallRatio;
  }, [fallRatio, results.peSI]);

  // Recharts Motion Graph Data (PE vs Height)
  const graphData = useMemo(() => {
    const steps = 10;
    const data = [];
    const baseH = Math.max(1, results.hSI);
    const dH = (baseH * 2) / steps;
    for (let i = 0; i <= steps; i++) {
      const h = i * dH;
      const pe = results.mSI * results.gSI * h;
      data.push({
        Height: Number(h.toFixed(1)),
        PotentialEnergy: Number((pe / (ENERGY_CONVERSIONS[energyUnit] || 1)).toFixed(1))
      });
    }
    return data;
  }, [results, energyUnit]);

  // Preset Applicator
  const applyPreset = (preset: PEPreset) => {
    setMassVal(preset.mass);
    setMassUnit("kg");
    setHeightVal(preset.height);
    setHeightUnit("m");
    setGravityVal(preset.g);
    setGravityUnit("m/s²");
    setCalcMode("pe");
    triggerNotification("success", `Loaded ${preset.name} parameters!`);
  };

  const applyPlanet = (planet: PlanetPreset) => {
    setSelectedPlanet(planet);
    setGravityVal(planet.g);
    setGravityUnit("m/s²");
    triggerNotification("success", `Applied ${planet.name} gravity (${planet.g} m/s²)!`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&m=${massVal}&h=${heightVal}&g=${gravityVal}&pe=${energyVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable scenario parameters link copied!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Gravitational Potential Energy (PE = m · g · h)
-----------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Calculated Potential Energy: ${results.peDisplay.toFixed(4)} ${energyUnit}
Mass: ${results.mDisplay.toFixed(3)} ${massUnit}
Height: ${results.hDisplay.toFixed(3)} ${heightUnit}
Gravity: ${results.gDisplay.toFixed(3)} ${gravityUnit}
Terminal Free-Fall Impact Velocity: ${results.impactVelocitySI.toFixed(2)} m/s (${(results.impactVelocitySI * 3.6).toFixed(1)} km/h)
-----------------------------------------
SI Base Values:
Potential Energy: ${results.peSI.toFixed(2)} Joules
Mass: ${results.mSI.toFixed(2)} kg
Height: ${results.hSI.toFixed(2)} m
Gravity: ${results.gSI.toFixed(2)} m/s²`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      {
        q: "What is the gravitational potential energy of a 2 kg book placed on a shelf 3 meters high on Earth (g = 9.81 m/s²)?",
        correctAnswer: 58.86,
        units: "J",
        type: "pe" as CalcMode
      },
      {
        q: "A water tank on a building has 147,150 Joules of potential energy at a height of 15 m on Earth. What is the mass of water in kg?",
        correctAnswer: 1000,
        units: "kg",
        type: "mass" as CalcMode
      },
      {
        q: "How high in meters must a 100 kg load be lifted on Earth to gain 9,810 Joules of potential energy?",
        correctAnswer: 10,
        units: "m",
        type: "height" as CalcMode
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
          <Link href="/calculators/kinetic-energy-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Kinetic Energy
          </Link>
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Potential Energy
          </span>
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
                <Building className="text-[#518231]" />
                Potential Cockpit (PE = m·g·h)
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
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-2 gap-1 mb-8">
              {[
                { key: "pe", label: "Energy (PE)" },
                { key: "mass", label: "Mass (m)" },
                { key: "height", label: "Height (h)" },
                { key: "gravity", label: "Gravity (g)" }
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

            {/* Dynamic Inputs */}
            <div className="space-y-6">
              
              {/* Mass Input (m) */}
              {calcMode !== "mass" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Mass (m)
                      <InfoTooltip text="The mass of the object elevated above ground level." />
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

              {/* Height Input (h) */}
              {calcMode !== "height" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Height (h)
                      <InfoTooltip text="Vertical distance above the reference ground plane." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.1"
                        value={heightVal}
                        onChange={(e) => setHeightVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={heightUnit}
                        onChange={(e) => setHeightUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(HEIGHT_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="200"
                    step="0.5"
                    value={heightVal}
                    onChange={(e) => setHeightVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Height (h - Calculated)" val={`${results.hDisplay.toFixed(3)} ${heightUnit}`} icon={Building} />
              )}

              {/* Gravity Input (g) */}
              {calcMode !== "gravity" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Gravitational Acceleration (g)
                      <InfoTooltip text="Local acceleration due to gravity field." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.01"
                        value={gravityVal}
                        onChange={(e) => setGravityVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={gravityUnit}
                        onChange={(e) => setGravityUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(GRAVITY_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="30"
                    step="0.1"
                    value={gravityVal}
                    onChange={(e) => setGravityVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Gravity (g - Calculated)" val={`${results.gDisplay.toFixed(3)} ${gravityUnit}`} icon={Globe} />
              )}

              {/* Potential Energy Input (PE) */}
              {calcMode !== "pe" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Potential Energy (PE)
                      <InfoTooltip text="Stored energy due to vertical elevation (PE = m·g·h)." />
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
                <ReadOnlyField label="Potential Energy (PE - Calculated)" val={`${results.peDisplay.toFixed(3)} ${energyUnit}`} icon={Zap} />
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
                const convVal = results.peSI / ENERGY_CONVERSIONS[uKey];
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

        {/* Right Column: Visual Cockpit & Pro Features */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                Height Visualization & Logarithmic Arc Gauge
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
                    strokeDashoffset={126 - Math.min(126, Math.max(5, (Math.log10(Math.max(1, results.peSI)) / 8) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.peSI)) / 8))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.peSI)) / 8))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center -mt-2">
                <div className="text-xl font-black text-white" style={{ color: results.tier.color }}>
                  {results.peDisplay.toFixed(2)} {energyUnit}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  {results.tier.label}
                </div>
              </div>
            </div>

            {/* Height & Free Fall Simulation Canvas */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative h-36 flex items-center justify-between overflow-hidden">
              <div className="absolute left-4 top-3 text-[10px] text-slate-400 font-bold">Height: {results.hDisplay.toFixed(1)} {heightUnit}</div>
              <div className="absolute left-4 bottom-3 text-[10px] text-slate-500 font-bold">Ground Level (h = 0)</div>
              
              {/* Vertical Height Pole */}
              <div className="w-1 bg-slate-800 h-24 mx-auto relative rounded-full">
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-7 h-7 bg-[#518231] rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all ease-linear"
                  style={{ top: `${fallRatio * 85}%` }}
                >
                  <ArrowDown size={14} className="text-white" />
                </div>
              </div>

              <div className="absolute right-4 top-4 text-right space-y-1">
                <div className="text-[10px] text-emerald-400 font-mono font-bold">PE: {currentPEInst.toFixed(0)} J</div>
                <div className="text-[10px] text-amber-400 font-mono font-bold">KE: {currentKEInst.toFixed(0)} J</div>
                <div className="text-[9px] text-slate-400 font-mono">Impact V: {results.impactVelocitySI.toFixed(1)} m/s</div>
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
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Potential E.</span>
                <div className="text-xs font-black text-[#518231] mt-0.5">{results.peDisplay.toFixed(1)} {energyUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Mass</span>
                <div className="text-xs font-black text-amber-400 mt-0.5">{results.mDisplay.toFixed(1)} {massUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Height</span>
                <div className="text-xs font-black text-blue-400 mt-0.5">{results.hDisplay.toFixed(1)} {heightUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Impact V</span>
                <div className="text-xs font-black text-emerald-400 mt-0.5">{results.impactVelocitySI.toFixed(1)} m/s</div>
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
                {(["visuals", "freefall", "planets", "explanation", "quiz"] as const).map(tab => (
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
                    {tab === "visuals" ? "Presets" : tab === "freefall" ? "⚡ PE ↔ KE" : tab === "planets" ? "🪐 Planets" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Areas */}
              <div className="p-6">
                
                {/* Tab 1: Real-World Presets */}
                {activeTab === "visuals" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">PE vs Height Curve (at {results.mDisplay.toFixed(1)} {massUnit})</h4>
                      <p className="text-xs text-slate-500 mb-2">Gravitational potential energy scales linearly with elevation height:</p>
                      
                      {isClient ? (
                        <div className="h-48 w-full mt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={graphData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="Height" label={{ value: "Height (m)", position: "insideBottom", offset: -5 }} />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="PotentialEnergy" stroke="#518231" strokeWidth={2.5} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="h-44 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">🎯 Real-World Potential Energy Presets</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                        {PE_PRESETS.map((preset, idx) => {
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

                {/* Extra Feature 1: Potential ↔ Kinetic Energy Free-Fall Converter Simulator */}
                {activeTab === "freefall" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Zap size={16} className="text-[#518231]" />
                      ⚡ Mechanical Energy Conversion (PE ↔ KE)
                    </h4>

                    <p className="text-xs text-slate-500">
                      As an object falls freely from height $h$, potential energy ($PE = mgh$) converts losslessly into kinetic energy ($KE = \frac{1}{2}mv^2$) until impact:
                    </p>

                    <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Top Elevation (h = {results.hDisplay.toFixed(1)} m)</span>
                        <div className="text-sm font-black text-[#518231]">PE = {results.peSI.toFixed(1)} J</div>
                        <div className="text-[10px] text-slate-400">KE = 0 J (v = 0 m/s)</div>
                      </div>

                      <div className="space-y-1 text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Ground Impact (h = 0 m)</span>
                        <div className="text-sm font-black text-amber-500">KE = {results.peSI.toFixed(1)} J</div>
                        <div className="text-[10px] text-emerald-500 font-mono font-bold">v_impact = {results.impactVelocitySI.toFixed(2)} m/s</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Extra Feature 2: Solar System Planet Gravity Presets */}
                {activeTab === "planets" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Globe size={16} className="text-[#518231]" />
                      🪐 Solar System Planet Gravity Presets
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {PLANET_PRESETS.map(planet => (
                        <button
                          key={planet.name}
                          type="button"
                          onClick={() => applyPlanet(planet)}
                          className={`p-2.5 rounded-2xl border text-center transition-all ${
                            selectedPlanet.name === planet.name 
                              ? "bg-[#518231]/10 border-[#518231] text-[#518231] font-bold" 
                              : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600"
                          }`}
                        >
                          <div className="text-xs">{planet.name}</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">{planet.g} m/s²</div>
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div className="text-slate-400 font-bold text-[10px] uppercase">{selectedPlanet.name} Energy Output</div>
                      <div className="flex justify-between">
                        <span>PE at {results.hDisplay.toFixed(1)} m on {selectedPlanet.name}:</span>
                        <strong className="text-emerald-400">{(results.mSI * selectedPlanet.g * results.hSI).toFixed(2)} Joules</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Free-Fall Impact Velocity:</span>
                        <strong className="text-amber-400">{Math.sqrt(2 * selectedPlanet.g * results.hSI).toFixed(2)} m/s</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 5: Step-by-Step Solution */}
                {activeTab === "explanation" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-step Solution</h4>
                    
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Potential Energy Formula: PE = m · g · h</div>
                      <div>2. Knowns: m = {results.mSI.toFixed(2)} kg, g = {results.gSI.toFixed(2)} m/s², h = {results.hSI.toFixed(2)} m</div>
                      <div>3. PE = {results.mSI.toFixed(2)} · {results.gSI.toFixed(2)} · {results.hSI.toFixed(2)}</div>
                      <div>4. Result: PE = {results.peSI.toFixed(2)} Joules ({results.peDisplay.toFixed(3)} {energyUnit})</div>
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
