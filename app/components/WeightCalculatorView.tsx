"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Gauge, Zap, Car, Plane, 
  Rocket, Sliders, Activity, Sparkles, AlertTriangle, ArrowRight, Scale, Globe, Layers, User, Compass
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

type CalcMode = "weight" | "mass" | "gravity";

// Unit conversion maps to Base SI (N, kg, m/s²)
const WEIGHT_CONVERSIONS: Record<string, number> = {
  "N": 1,
  "kN": 1000,
  "lbf": 4.44822,
  "kgf": 9.80665
};

const MASS_CONVERSIONS: Record<string, number> = {
  "kg": 1,
  "g": 0.001,
  "mg": 0.000001,
  "lb": 0.453592,
  "oz": 0.0283495,
  "ton": 1000
};

const GRAVITY_CONVERSIONS: Record<string, number> = {
  "m/s²": 1,
  "ft/s²": 0.3048
};

// Solar System Planet Gravity Presets
interface PlanetPreset {
  name: string;
  gravity: number; // m/s²
  color: string;
  desc: string;
}

const PLANETS: PlanetPreset[] = [
  { name: "Earth", gravity: 9.81, color: "#3b82f6", desc: "1.00g (Home planet)" },
  { name: "Moon", gravity: 1.62, color: "#94a3b8", desc: "0.166g (1/6th Earth gravity)" },
  { name: "Mars", gravity: 3.71, color: "#ef4444", desc: "0.378g (Red planet)" },
  { name: "Mercury", gravity: 3.70, color: "#f59e0b", desc: "0.377g (Innermost planet)" },
  { name: "Venus", gravity: 8.87, color: "#eab308", desc: "0.904g (Earth twin)" },
  { name: "Jupiter", gravity: 24.79, color: "#8b5cf6", desc: "2.528g (Gas giant monster)" },
  { name: "Saturn", gravity: 10.44, color: "#d97706", desc: "1.064g (Ringed giant)" },
  { name: "Uranus", gravity: 8.69, color: "#06b6d4", desc: "0.886g (Ice giant)" },
  { name: "Neptune", gravity: 11.15, color: "#2563eb", desc: "1.137g (Windiest planet)" },
  { name: "Pluto", gravity: 0.62, color: "#64748b", desc: "0.063g (Dwarf planet)" }
];

// Weight Presets
interface ObjectPreset {
  name: string;
  mass: number; // kg
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
}

const OBJECT_PRESETS: ObjectPreset[] = [
  { name: "Average Human", mass: 70, icon: User, desc: "70 kg (686.7 N on Earth)" },
  { name: "School Backpack", mass: 10, icon: Layers, desc: "10 kg (98.1 N on Earth)" },
  { name: "Sedan Passenger Car", mass: 1500, icon: Car, desc: "1,500 kg (14.7 kN on Earth)" },
  { name: "Commercial Semi Truck", mass: 18000, icon: Car, desc: "18,000 kg (176.6 kN on Earth)" },
  { name: "Communications Satellite", mass: 3000, icon: Globe, desc: "3,000 kg (29.4 kN on Earth)" },
  { name: "Starship Rocket (Fuelled)", mass: 5000000, icon: Rocket, desc: "5,000,000 kg (49.05 MN on Earth)" },
  { name: "Shipping Container (Full)", mass: 30000, icon: Layers, desc: "30,000 kg (294.3 kN on Earth)" },
  { name: "African Elephant", mass: 6000, icon: Scale, desc: "6,000 kg (58.9 kN on Earth)" }
];

// Weight Meter Tiers
const WEIGHT_TIERS = [
  { name: "Very Light", max: 10, color: "#10b981", label: "< 10 N (Light objects, feathers)" },
  { name: "Light", max: 500, color: "#3b82f6", label: "10 - 500 N (Backpacks, pets)" },
  { name: "Medium", max: 5000, color: "#f59e0b", label: "500 - 5,000 N (Humans, motorcycles)" },
  { name: "Heavy", max: 100000, color: "#ef4444", label: "5,000 - 100,000 N (Cars, trucks)" },
  { name: "Extreme Weight", max: Infinity, color: "#8b5cf6", label: "> 100,000 N (Satellites, rockets)" }
];

export function WeightCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("weight");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Input states (in display units)
  const [massVal, setMassVal] = useState<number>(70);
  const [massUnit, setMassUnit] = useState<string>("kg");

  const [gravVal, setGravVal] = useState<number>(9.81);
  const [gravUnit, setGravUnit] = useState<string>("m/s²");

  const [weightVal, setWeightVal] = useState<number>(686.7);
  const [weightUnit, setWeightUnit] = useState<string>("N");

  // Selected Planet
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPreset>(PLANETS[0]);

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
      if (params.get("g")) setGravVal(Number(params.get("g")));
      if (params.get("w")) setWeightVal(Number(params.get("w")));
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to Base SI (N, kg, m/s²)
  const siInputs = useMemo(() => {
    const mSI = massVal * (MASS_CONVERSIONS[massUnit] || 1);
    const gSI = gravVal * (GRAVITY_CONVERSIONS[gravUnit] || 1);
    const wSI = weightVal * (WEIGHT_CONVERSIONS[weightUnit] || 1);
    return { mSI, gSI, wSI };
  }, [massVal, massUnit, gravVal, gravUnit, weightVal, weightUnit]);

  // Perform Weight Calculation across 3 Modes (W = m · g)
  const results = useMemo(() => {
    let finalWSI = siInputs.wSI;
    let finalMSI = siInputs.mSI;
    let finalGSI = siInputs.gSI;

    if (calcMode === "weight") {
      finalWSI = siInputs.mSI * siInputs.gSI;
    } else if (calcMode === "mass") {
      finalMSI = siInputs.gSI > 0 ? siInputs.wSI / siInputs.gSI : 0;
    } else if (calcMode === "gravity") {
      finalGSI = siInputs.mSI > 0 ? siInputs.wSI / siInputs.mSI : 0;
    }

    // Convert results back to display units
    const wDisplay = finalWSI / (WEIGHT_CONVERSIONS[weightUnit] || 1);
    const mDisplay = finalMSI / (MASS_CONVERSIONS[massUnit] || 1);
    const gDisplay = finalGSI / (GRAVITY_CONVERSIONS[gravUnit] || 1);

    // Planet Comparison Table (Weight on all 10 planets)
    const planetWeights = PLANETS.map(p => {
      const pWSI = finalMSI * p.gravity;
      const pWDisplay = pWSI / (WEIGHT_CONVERSIONS[weightUnit] || 1);
      return {
        planet: p.name,
        gravity: p.gravity,
        color: p.color,
        weightDisplay: pWDisplay
      };
    });

    // Weight Tier
    let tier = WEIGHT_TIERS[0];
    if (finalWSI <= 10) tier = WEIGHT_TIERS[0];
    else if (finalWSI <= 500) tier = WEIGHT_TIERS[1];
    else if (finalWSI <= 5000) tier = WEIGHT_TIERS[2];
    else if (finalWSI <= 100000) tier = WEIGHT_TIERS[3];
    else tier = WEIGHT_TIERS[4];

    return {
      wSI: finalWSI,
      mSI: finalMSI,
      gSI: finalGSI,
      wDisplay,
      mDisplay,
      gDisplay,
      planetWeights,
      tier
    };
  }, [calcMode, siInputs, weightUnit, massUnit, gravUnit]);

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

  // Recharts Motion Graph Data (Planet Comparison)
  const chartData = useMemo(() => {
    return results.planetWeights.map(pw => ({
      name: pw.planet,
      Weight: Number(pw.weightDisplay.toFixed(1))
    }));
  }, [results]);

  // Planet Select Handler
  const applyPlanet = (p: PlanetPreset) => {
    setSelectedPlanet(p);
    setGravVal(p.gravity);
    setGravUnit("m/s²");
    triggerNotification("success", `Selected ${p.name} gravity (${p.gravity} m/s²)!`);
  };

  // Object Preset Applicator
  const applyObjectPreset = (preset: ObjectPreset) => {
    setMassVal(preset.mass);
    setMassUnit("kg");
    setCalcMode("weight");
    triggerNotification("success", `Loaded ${preset.name} (${preset.mass} kg)!`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${calcMode}&m=${massVal}&g=${gravVal}&w=${weightVal}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerNotification("success", "Shareable scenario parameters link copied!");
      });
    }
  };

  const handleCopyResults = () => {
    const text = `Weight Calculation (W = m · g)
-----------------------------------------
Calculation Mode: ${calcMode.toUpperCase()}
Calculated Weight: ${results.wDisplay.toFixed(3)} ${weightUnit}
Mass (Invariant): ${results.mDisplay.toFixed(3)} ${massUnit}
Surface Gravity: ${results.gDisplay.toFixed(3)} ${gravUnit} (${selectedPlanet.name})
-----------------------------------------
Weight Across Planets:
${results.planetWeights.map(pw => `${pw.planet}: ${pw.weightDisplay.toFixed(1)} ${weightUnit}`).join("\n")}
-----------------------------------------
SI Base Values:
Weight: ${results.wSI.toFixed(2)} Newtons
Mass: ${results.mSI.toFixed(2)} kg
Gravity: ${results.gSI.toFixed(2)} m/s²`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary copied to clipboard!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      {
        q: "What is the weight of a 70 kg human standing on Earth (g = 9.81 m/s²)?",
        correctAnswer: 686.7,
        units: "N",
        type: "weight" as CalcMode
      },
      {
        q: "What is the weight of the same 70 kg human on the Moon (g = 1.62 m/s²)?",
        correctAnswer: 113.4,
        units: "N",
        type: "weight" as CalcMode
      },
      {
        q: "If an object weighs 371 N on Mars (g = 3.71 m/s²), what is its mass in kg?",
        correctAnswer: 100,
        units: "kg",
        type: "mass" as CalcMode
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
    setQuizIsCorrect(diff < 0.2);
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
          <Link href="/calculators/density-calculator" className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors">
            Density
          </Link>
          <span className="px-3 py-1.5 bg-[#518231] text-white rounded-xl text-xs font-bold shadow-sm">
            Weight
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
                <Scale className="text-[#518231]" />
                Weight Cockpit (W = m · g)
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
            <div className="bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl grid grid-cols-3 gap-1 mb-6">
              {[
                { key: "weight", label: "Weight (W)" },
                { key: "mass", label: "Mass (m)" },
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

            {/* 🪐 Planet Selection Bar */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">10 Solar System Planet Presets:</span>
              <div className="grid grid-cols-5 gap-1.5">
                {PLANETS.map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => applyPlanet(p)}
                    className={`py-1.5 px-1 text-[11px] font-bold rounded-xl border transition-all text-center ${
                      selectedPlanet.name === p.name
                        ? "bg-[#518231] text-white border-[#518231] shadow-sm"
                        : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Input Fields */}
            <div className="space-y-6">
              
              {/* Weight Input (W) */}
              {calcMode !== "weight" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Weight (W)
                      <InfoTooltip text="Gravitational pull force (W = mg)." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        value={weightVal}
                        onChange={(e) => setWeightVal(Number(e.target.value))}
                        className="w-24 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={weightUnit}
                        onChange={(e) => setWeightUnit(e.target.value)}
                        className="bg-transparent font-bold text-xs text-slate-500 focus:outline-none"
                      >
                        {Object.keys(WEIGHT_CONVERSIONS).map(u => (
                          <option key={u} value={u} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50000"
                    step="50"
                    value={weightVal}
                    onChange={(e) => setWeightVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Weight (W - Calculated)" val={`${results.wDisplay.toFixed(3)} ${weightUnit}`} icon={Scale} />
              )}

              {/* Mass Input (m) */}
              {calcMode !== "mass" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Mass (m - Invariant)
                      <InfoTooltip text="Amount of matter (constant everywhere)." />
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
                    max="1000"
                    step="5"
                    value={massVal}
                    onChange={(e) => setMassVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Mass (m - Calculated)" val={`${results.mDisplay.toFixed(3)} ${massUnit}`} icon={User} />
              )}

              {/* Gravity Input (g) */}
              {calcMode !== "gravity" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      Gravity Acceleration (g)
                      <InfoTooltip text="Gravitational acceleration field strength." />
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <input
                        type="number"
                        step="0.01"
                        value={gravVal}
                        onChange={(e) => setGravVal(Number(e.target.value))}
                        className="w-20 bg-transparent text-right font-black focus:outline-none text-slate-900 dark:text-white"
                      />
                      <select
                        value={gravUnit}
                        onChange={(e) => setGravUnit(e.target.value)}
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
                    min="0.1"
                    max="30"
                    step="0.1"
                    value={gravVal}
                    onChange={(e) => setGravVal(Number(e.target.value))}
                    className="w-full accent-[#518231] cursor-pointer"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Gravity (g - Calculated)" val={`${results.gDisplay.toFixed(3)} ${gravUnit}`} icon={Globe} />
              )}

            </div>
          </div>

          {/* Smart Conversion Table panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Zap size={16} className="text-[#518231]" />
              Smart Weight Conversion Table
            </h3>
            <div className="space-y-2">
              {Object.keys(WEIGHT_CONVERSIONS).map(uKey => {
                const convVal = results.wSI / WEIGHT_CONVERSIONS[uKey];
                return (
                  <div key={uKey} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 font-semibold">{uKey}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{convVal.toFixed(3)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Astronaut Mode & Planet Explorer */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit & 🎯 Competitor Killer "Astronaut Mode & Planet Weight Explorer" */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                🧑‍🚀 Astronaut Mode & Weight Meter
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{results.tier.name}</span>
              </div>
            </div>

            {/* Radial Arc Weight Meter */}
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
                    strokeDashoffset={126 - Math.min(126, Math.max(5, (Math.log10(Math.max(1, results.wSI)) / 5) * 126))}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Indicator Needle */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 32 * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.wSI)) / 5))))}
                    y2={50 - 32 * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, Math.log10(Math.max(1, results.wSI)) / 5))))}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="4" fill="#ffffff" />
                </svg>
              </div>

              <div className="text-center -mt-2">
                <div className="text-xl font-black text-white" style={{ color: results.tier.color }}>
                  {results.wDisplay.toFixed(2)} {weightUnit}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  Mass: {results.mDisplay.toFixed(1)} {massUnit} (Invariant) | {selectedPlanet.name} ({selectedPlanet.gravity} m/s²)
                </div>
              </div>
            </div>

            {/* 🧑‍🚀 ASTRONAUT LANDSCAPE CANVAS */}
            <div 
              className="rounded-2xl border border-slate-800 p-6 relative h-40 flex items-center justify-between overflow-hidden transition-colors duration-500"
              style={{ backgroundColor: `${selectedPlanet.color}22` }}
            >
              {/* Planetary Ground */}
              <div 
                className="w-full h-8 absolute bottom-0 left-0 border-t border-slate-700/60 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-slate-300"
                style={{ backgroundColor: `${selectedPlanet.color}44` }}
              >
                {selectedPlanet.name} Surface Ground (g = {selectedPlanet.gravity} m/s²)
              </div>

              {/* Astronaut Avatar Icon */}
              <div className="absolute left-12 bottom-8 flex flex-col items-center">
                <div className="p-3 bg-slate-800 border-2 border-slate-400 rounded-full shadow-xl animate-bounce">
                  <User size={24} className="text-white" />
                </div>
                <span className="text-[10px] font-black text-white mt-1">Astronaut</span>
              </div>

              {/* Weight Scale Digital Display */}
              <div className="absolute right-12 bottom-10 bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-xl text-right backdrop-blur-md">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Scale Reading:</span>
                <span className="text-sm font-black text-emerald-400">{results.wDisplay.toFixed(1)} {weightUnit}</span>
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
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Weight (W)</span>
                <div className="text-xs font-black text-[#518231] mt-0.5">{results.wDisplay.toFixed(1)} {weightUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Mass (m)</span>
                <div className="text-xs font-black text-amber-400 mt-0.5">{results.mDisplay.toFixed(1)} {massUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Gravity (g)</span>
                <div className="text-xs font-black text-blue-400 mt-0.5">{results.gDisplay.toFixed(2)} {gravUnit}</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-800/60 p-2.5 rounded-2xl">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Planet</span>
                <div className="text-xs font-black text-emerald-400 mt-0.5">{selectedPlanet.name}</div>
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
                    {tab === "visuals" ? "Planet Weight Explorer" : tab === "graphs" ? "📊 Planet Ranking" : tab === "explanation" ? "Step-by-Step" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Areas */}
              <div className="p-6">
                
                {/* Tab 1: Planet Weight Explorer */}
                {activeTab === "visuals" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">🌍 10 Solar System Planets Weight Explorer</h4>
                    <p className="text-xs text-slate-500">Your exact weight across all celestial bodies for mass = {results.mDisplay.toFixed(1)} {massUnit}:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                      {results.planetWeights.map((pw, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-800/80"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pw.color }}></div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{pw.planet}</span>
                            <span className="text-[10px] text-slate-400">({pw.gravity} m/s²)</span>
                          </div>
                          <span className="text-xs font-black text-[#518231]">{pw.weightDisplay.toFixed(1)} {weightUnit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Planet Weight Bar Chart */}
                {activeTab === "graphs" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Activity size={16} className="text-[#518231]" />
                      📊 Planet Weight Comparison Chart
                    </h4>

                    {isClient ? (
                      <div className="h-52 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Weight" fill="#518231" radius={[4, 4, 0, 0]} />
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
                      <div>1. Weight Formula: W = m · g</div>
                      <div>2. Knowns: Mass m = {results.mSI.toFixed(2)} kg, Surface Gravity g = {results.gSI.toFixed(2)} m/s² ({selectedPlanet.name})</div>
                      <div>3. Calculation: W = {results.mSI.toFixed(2)} · {results.gSI.toFixed(2)}</div>
                      <div>4. Result: W = {results.wSI.toFixed(2)} Newtons ({results.wDisplay.toFixed(3)} {weightUnit})</div>
                      <div>5. Note: Mass (m) is invariant, while Weight (W) varies directly with gravitational field strength (g).</div>
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
