"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Info, Printer, Copy, Share2, 
  CheckCircle2, ChevronRight, Zap, Activity, Sparkles, AlertTriangle, ArrowRight, Layers, Sliders, Cpu, Flame, Sun, DollarSign, TrendingDown, Thermometer, ShieldAlert, ArrowDown
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type CategoryTab = "dc" | "ac1" | "ac3" | "solar" | "automotive";

interface WireGaugeData {
  awg: string;
  mm2: number;
  rPerKmCu: number; // Resistance per km @ 20°C in Ohms
}

const WIRE_GAUGES: WireGaugeData[] = [
  { awg: "14 AWG", mm2: 2.08, rPerKmCu: 8.286 },
  { awg: "12 AWG", mm2: 3.31, rPerKmCu: 5.211 },
  { awg: "10 AWG", mm2: 5.26, rPerKmCu: 3.277 },
  { awg: "8 AWG",  mm2: 8.37, rPerKmCu: 2.061 },
  { awg: "6 AWG",  mm2: 13.30, rPerKmCu: 1.296 },
  { awg: "4 AWG",  mm2: 21.15, rPerKmCu: 0.815 },
  { awg: "2 AWG",  mm2: 33.63, rPerKmCu: 0.513 },
  { awg: "1/0 AWG", mm2: 53.49, rPerKmCu: 0.323 },
  { awg: "2/0 AWG", mm2: 67.43, rPerKmCu: 0.256 },
  { awg: "4/0 AWG", mm2: 107.2, rPerKmCu: 0.161 }
];

const MATERIALS: Record<string, { name: string; rho20: number; alpha: number }> = {
  "copper": { name: "Copper", rho20: 1.68e-8, alpha: 0.00393 },
  "aluminum": { name: "Aluminum", rho20: 2.82e-8, alpha: 0.00403 },
  "silver": { name: "Silver", rho20: 1.59e-8, alpha: 0.00380 },
  "gold": { name: "Gold", rho20: 2.44e-8, alpha: 0.00340 }
};

export function VoltageDropCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("dc");
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(true);

  // Common Inputs
  const [sourceVoltage, setSourceVoltage] = useState<number>(120);
  const [currentVal, setCurrentVal] = useState<number>(15);
  const [oneWayLengthFt, setOneWayLengthFt] = useState<number>(100);
  const [selectedAwg, setSelectedAwg] = useState<string>("12 AWG");
  const [materialKey, setMaterialKey] = useState<string>("copper");
  const [operatingTempC, setOperatingTempC] = useState<number>(75); // °C

  // AC Inputs
  const [powerFactor, setPowerFactor] = useState<number>(0.90);
  const [reactancePerKm, setReactancePerKm] = useState<number>(0.15); // Ω/km

  // Visual Tab
  const [visualTab, setVisualTab] = useState<"profile" | "wireCompare" | "stepByStep" | "quiz">("profile");

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

  // Temperature Correction Factor
  const matInfo = MATERIALS[materialKey] || MATERIALS["copper"];
  const tempCorrection = 1 + matInfo.alpha * (operatingTempC - 20);

  // Calculations
  const results = useMemo(() => {
    const gauge = WIRE_GAUGES.find(g => g.awg === selectedAwg) || WIRE_GAUGES[1]; // default 12 AWG
    
    // Base resistance at operating temp per meter
    const lengthMeters = oneWayLengthFt * 0.3048;
    const baseRPerKm20 = gauge.rPerKmCu * (matInfo.rho20 / MATERIALS["copper"].rho20);
    const rPerKmMTemp = baseRPerKm20 * tempCorrection;
    const rOneWay = (rPerKmMTemp / 1000) * lengthMeters;

    let vDrop = 0;
    let phaseAngleRad = Math.acos(Math.min(1, Math.max(0, powerFactor)));
    let sinPhi = Math.sin(phaseAngleRad);

    if (activeTab === "dc") {
      vDrop = 2 * currentVal * rOneWay;
    } else if (activeTab === "ac1") {
      const xOneWay = (reactancePerKm / 1000) * lengthMeters;
      vDrop = 2 * currentVal * (rOneWay * powerFactor + xOneWay * sinPhi);
    } else if (activeTab === "ac3") {
      const xOneWay = (reactancePerKm / 1000) * lengthMeters;
      vDrop = Math.sqrt(3) * currentVal * (rOneWay * powerFactor + xOneWay * sinPhi);
    } else if (activeTab === "solar") {
      vDrop = 2 * currentVal * rOneWay; // Solar DC path
    } else {
      // Automotive 12V/24V DC
      vDrop = 2 * currentVal * rOneWay;
    }

    const vDropPct = (vDrop / Math.max(1, sourceVoltage)) * 100;
    const vLoad = Math.max(0, sourceVoltage - vDrop);
    const powerLossWatts = activeTab === "ac3" ? 3 * currentVal * currentVal * rOneWay : 2 * currentVal * currentVal * rOneWay;

    // NEC 3% Branch / 5% Total Circuit Limit Classifier
    let statusMsg = "🟢 Within NEC 3% Guideline (Excellent)";
    let statusClass = "text-green-600 bg-green-50 dark:bg-green-950/40 dark:text-green-300 border-green-200 dark:border-green-800";
    if (vDropPct > 5.0) {
      statusMsg = "🔴 Exceeds 5% Total Circuit Limit (High Voltage Drop)";
      statusClass = "text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-300 border-red-200 dark:border-red-800";
    } else if (vDropPct > 3.0) {
      statusMsg = "🟡 Exceeds 3% Branch Circuit Limit (Warning)";
      statusClass = "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    }

    return {
      vDrop,
      vDropPct,
      vLoad,
      rOneWay,
      totalResistance: 2 * rOneWay,
      powerLossWatts,
      statusMsg,
      statusClass,
      gauge
    };
  }, [activeTab, sourceVoltage, currentVal, oneWayLengthFt, selectedAwg, materialKey, tempCorrection, powerFactor, reactancePerKm, matInfo.rho20]);

  // Recharts Voltage Profile Data (Source to Load)
  const profileData = useMemo(() => {
    const data = [];
    const steps = 10;
    const lengthMeters = oneWayLengthFt * 0.3048;
    for (let i = 0; i <= steps; i++) {
      const distFt = (oneWayLengthFt / steps) * i;
      const dropAtDist = (results.vDrop / steps) * i;
      const vAtDist = Math.max(0, sourceVoltage - dropAtDist);
      data.push({
        Distance: Number(distFt.toFixed(0)),
        Voltage: Number(vAtDist.toFixed(2))
      });
    }
    return data;
  }, [oneWayLengthFt, sourceVoltage, results.vDrop]);

  // Wire Comparison Table Data (14 AWG to 6 AWG)
  const wireComparisonData = useMemo(() => {
    const lengthMeters = oneWayLengthFt * 0.3048;
    return WIRE_GAUGES.slice(0, 5).map(g => {
      const baseRPerKm20 = g.rPerKmCu * (matInfo.rho20 / MATERIALS["copper"].rho20);
      const rOneWay = ((baseRPerKm20 * tempCorrection) / 1000) * lengthMeters;
      const vDrop = 2 * currentVal * rOneWay;
      const vDropPct = (vDrop / Math.max(1, sourceVoltage)) * 100;
      const pLoss = 2 * currentVal * currentVal * rOneWay;
      return {
        awg: g.awg,
        vDrop: vDrop.toFixed(2),
        vDropPct: vDropPct.toFixed(1),
        pLoss: pLoss.toFixed(1),
        vLoad: (sourceVoltage - vDrop).toFixed(1)
      };
    });
  }, [oneWayLengthFt, currentVal, sourceVoltage, tempCorrection, matInfo.rho20]);

  const handleCopySummary = () => {
    const text = `Voltage Drop Calculation Summary
-----------------------------------------
Source Voltage: ${sourceVoltage} V
Load Current: ${currentVal} A
Wire Length (One-Way): ${oneWayLengthFt} ft (${(oneWayLengthFt * 0.3048).toFixed(1)} m)
Conductor Size: ${selectedAwg} (${results.gauge.mm2} mm²) - ${matInfo.name} @ ${operatingTempC}°C
-----------------------------------------
Voltage Drop: ${results.vDrop.toFixed(2)} V (${results.vDropPct.toFixed(2)}%)
End-of-Line Load Voltage: ${results.vLoad.toFixed(2)} V
Power Loss in Conductor: ${results.powerLossWatts.toFixed(1)} W
Status: ${results.statusMsg}`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Voltage drop calculation copied!");
    });
  };

  // Quiz Generator
  const generateQuiz = () => {
    const questions = [
      { q: "What is the voltage drop of a 120V 2-wire DC circuit carrying 15A over a conductor with 0.2 Ω total resistance (Vdrop = I · Rtotal)?", correctAnswer: 3.0, units: "V" },
      { q: "If source voltage is 240V and voltage drop is 7.2V, what is the voltage drop percentage?", correctAnswer: 3.0, units: "%" },
      { q: "What is the end-of-line load voltage if source voltage is 120V and voltage drop is 4.8V?", correctAnswer: 115.2, units: "V" }
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
    setQuizIsCorrect(diff < 0.5);
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
            Voltage Drop
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
                <TrendingDown className="text-[#518231]" />
                Voltage Drop Cockpit
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
                { key: "dc", label: "DC 2-Wire" },
                { key: "ac1", label: "1-Phase AC" },
                { key: "ac3", label: "3-Phase AC" },
                { key: "solar", label: "Solar PV" },
                { key: "automotive", label: "Automotive" }
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

            {/* Inputs */}
            <div className="space-y-5">
              
              {/* Primary Output Display */}
              <ReadOnlyField label="Calculated Voltage Drop (Vdrop)" val={`${results.vDrop.toFixed(2)} V (${results.vDropPct.toFixed(2)}%)`} icon={TrendingDown} />

              {/* Source Voltage */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Source Voltage (V)</span>
                  <input
                    type="number"
                    value={sourceVoltage}
                    onChange={(e) => setSourceVoltage(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="12"
                  max="480"
                  step="1"
                  value={sourceVoltage}
                  onChange={(e) => setSourceVoltage(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Load Current */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>Load Current (I)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={currentVal}
                    onChange={(e) => setCurrentVal(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={currentVal}
                  onChange={(e) => setCurrentVal(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* One-Way Distance */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>One-Way Distance (ft)</span>
                  <input
                    type="number"
                    value={oneWayLengthFt}
                    onChange={(e) => setOneWayLengthFt(Number(e.target.value))}
                    className="w-24 bg-slate-50 dark:bg-slate-950 text-right p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 font-black text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={oneWayLengthFt}
                  onChange={(e) => setOneWayLengthFt(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Wire Gauge Selector */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Wire Size (AWG)</span>
                  <select
                    value={selectedAwg}
                    onChange={(e) => setSelectedAwg(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                  >
                    {WIRE_GAUGES.map(g => (
                      <option key={g.awg} value={g.awg}>{g.awg} ({g.mm2} mm²)</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Conductor Material</span>
                  <select
                    value={materialKey}
                    onChange={(e) => setMaterialKey(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                  >
                    {Object.keys(MATERIALS).map(m => (
                      <option key={m} value={m}>{MATERIALS[m].name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Temperature & AC Inputs */}
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

                    {(activeTab === "ac1" || activeTab === "ac3") && (
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Power Factor (PF)</span>
                        <input
                          type="number"
                          step="0.01"
                          value={powerFactor}
                          onChange={(e) => setPowerFactor(Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800 font-bold text-xs"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Code Status Classifier Card */}
          <div className={`p-4 rounded-3xl border ${results.statusClass}`}>
            <span className="text-xs font-bold uppercase tracking-wider block mb-1">NEC Code Voltage Drop Status:</span>
            <span className="text-sm font-black">{results.statusMsg}</span>
          </div>
        </div>

        {/* Right Column: Live Voltage Profile Graph & Wire Comparison */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Cockpit */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles size={13} className="text-[#518231]" />
                📉 Interactive Voltage Profile Graph (Source → Load)
              </span>
              <span className="text-xs font-bold text-green-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                Load Voltage: {results.vLoad.toFixed(1)} V
              </span>
            </div>

            {/* Recharts Voltage Profile Line Chart */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col items-center justify-center min-h-[220px]">
              {isClient ? (
                <div className="w-full h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={profileData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                      <XAxis dataKey="Distance" label={{ value: 'Distance (ft)', position: 'insideBottomRight', offset: -5, fill: '#94a3b8' }} stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip formatter={(val: any) => [`${val} V`, "Voltage"]} />
                      <Line type="monotone" dataKey="Voltage" stroke="#10b981" strokeWidth={3} dot={true} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-xs text-slate-400">Loading chart...</div>
              )}
            </div>

            {/* Voltage Drop Summary Cards */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Source Voltage</span>
                <span className="text-sm font-black text-white">{sourceVoltage} V</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Voltage Drop</span>
                <span className="text-sm font-black text-amber-400">{results.vDrop.toFixed(2)} V</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">End Load Voltage</span>
                <span className="text-sm font-black text-[#518231]">{results.vLoad.toFixed(1)} V</span>
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
                {(["profile", "wireCompare", "stepByStep", "quiz"] as const).map(tab => (
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
                    {tab === "profile" ? "Overview" : tab === "wireCompare" ? "📏 Wire Size Table" : tab === "stepByStep" ? "Step-by-Step" : "Quiz"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                
                {/* Tab 1: Profile Overview */}
                {visualTab === "profile" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">⚡ Conductor Resistance & Power Loss</h4>
                    <p className="leading-relaxed">
                      Conductor resistance increases with distance (L) and operating temperature (α(T)). Total power lost as thermal heat in the wiring is P_loss = I² · R_total = {results.powerLossWatts.toFixed(1)} Watts.
                    </p>
                  </div>
                )}

                {/* Tab 2: Wire Size Comparison Table */}
                {visualTab === "wireCompare" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sliders size={16} className="text-[#518231]" />
                      Wire Size Comparison Table (14 AWG to 6 AWG)
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                            <th className="py-2 px-2">Size</th>
                            <th className="py-2 px-2">Vdrop (V)</th>
                            <th className="py-2 px-2">Drop %</th>
                            <th className="py-2 px-2">Power Loss (W)</th>
                            <th className="py-2 px-2">Load Voltage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wireComparisonData.map(row => (
                            <tr key={row.awg} className={`border-b border-slate-100 dark:border-slate-800/50 ${row.awg === selectedAwg ? "bg-[#518231]/10 font-bold text-[#518231]" : ""}`}>
                              <td className="py-2 px-2">{row.awg}</td>
                              <td className="py-2 px-2">{row.vDrop} V</td>
                              <td className="py-2 px-2">{row.vDropPct}%</td>
                              <td className="py-2 px-2">{row.pLoss} W</td>
                              <td className="py-2 px-2">{row.vLoad} V</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab 3: Step-by-Step */}
                {visualTab === "stepByStep" && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Step-by-Step Voltage Drop Derivation</h4>
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-2 font-mono text-slate-800 dark:text-slate-200">
                      <div>1. Knowns: Source = {sourceVoltage}V, Load = {currentVal}A, Length = {oneWayLengthFt}ft</div>
                      <div>2. Conductor: {selectedAwg} ({matInfo.name}) @ {operatingTempC}°C (Temp Factor = {tempCorrection.toFixed(3)})</div>
                      <div>3. One-Way Resistance: R_oneway = {results.rOneWay.toFixed(4)} Ω</div>
                      <div>4. Total 2-Wire Resistance: R_total = {results.totalResistance.toFixed(4)} Ω</div>
                      <div>5. Voltage Drop: Vdrop = 2 · I · R_oneway = 2 · {currentVal} · {results.rOneWay.toFixed(4)} = {results.vDrop.toFixed(2)} V</div>
                      <div>6. Voltage Drop %: ({results.vDrop.toFixed(2)} / {sourceVoltage}) · 100 = {results.vDropPct.toFixed(2)}%</div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Quiz */}
                {visualTab === "quiz" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Voltage Drop Quiz</h4>
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
