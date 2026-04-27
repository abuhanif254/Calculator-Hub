"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Timer, Route, Watch, ArrowRightCircle } from "lucide-react";

interface PaceCalculatorViewProps {
  calcDef: CalculatorDef;
}

type Mode = "pace" | "time" | "distance";

export function PaceCalculatorView({ calcDef }: PaceCalculatorViewProps) {
  const t = useTranslations("PaceCalculator");

  const [mode, setMode] = useState<Mode>("pace");

  // Time Inputs
  const [tHours, setTHours] = useState("");
  const [tMinutes, setTMinutes] = useState("");
  const [tSeconds, setTSeconds] = useState("");

  // Distance Inputs
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("kilometers");

  // Pace Inputs
  const [pMinutes, setPMinutes] = useState("");
  const [pSeconds, setPSeconds] = useState("");
  const [paceUnit, setPaceUnit] = useState("km");

  // Results Strings
  const [resultTitle, setResultTitle] = useState("");
  const [resultSub, setResultSub] = useState("");
  const [resultMain, setResultMain] = useState("");

  const [errorObj, setErrorObj] = useState("");

  const distanceOptions = {
    marathon: 42.195,
    halfMarathon: 21.0975,
    "10k": 10.0,
    "5k": 5.0,
  };

  const calculate = () => {
    setErrorObj("");
    setResultMain("");

    // Helpers
    const h = parseInt(tHours) || 0;
    const m = parseInt(tMinutes) || 0;
    const s = parseInt(tSeconds) || 0;
    const totalTimeSeconds = (h * 3600) + (m * 60) + s;

    const pm = parseInt(pMinutes) || 0;
    const ps = parseInt(pSeconds) || 0;
    const paceSeconds = (pm * 60) + ps;

    let distKm = 0;
    if (distanceUnit === "kilometers") distKm = parseFloat(distance);
    else if (distanceUnit === "miles") distKm = parseFloat(distance) * 1.60934;
    else if (distanceUnit === "meters") distKm = parseFloat(distance) / 1000;
    else if (distanceUnit in distanceOptions) {
      distKm = distanceOptions[distanceUnit as keyof typeof distanceOptions];
    }

    // Mathematical Modes
    if (mode === "pace") {
      if (totalTimeSeconds <= 0 || isNaN(distKm) || distKm <= 0) {
        setErrorObj(t("errorMsg"));
        return;
      }
      // Calculate Pace in both min/km and min/mi
      const secPerKm = totalTimeSeconds / distKm;
      const secPerMi = totalTimeSeconds / (distKm / 1.60934);

      const resKmStr = formatPace(secPerKm);
      const resMiStr = formatPace(secPerMi);

      setResultTitle(t("resPace"));
      setResultMain(`${resKmStr} / km`);
      setResultSub(`(${resMiStr} / mi)`);

    } else if (mode === "time") {
       if (paceSeconds <= 0 || isNaN(distKm) || distKm <= 0) {
        setErrorObj(t("errorMsg"));
        return;
       }
       // If pace unit is 'mi', convert the pace to 'km' equivalents for math
       let standardizedPaceSecPerKm = paceSeconds;
       if (paceUnit === "mi") {
         standardizedPaceSecPerKm = paceSeconds / 1.60934;
       }

       const totalSecs = distKm * standardizedPaceSecPerKm;
       setResultTitle(t("resTime"));
       setResultMain(formatTime(totalSecs));
       setResultSub("");

    } else if (mode === "distance") {
       if (totalTimeSeconds <= 0 || paceSeconds <= 0) {
          setErrorObj(t("errorMsg"));
          return;
       }

       let distOutput = totalTimeSeconds / paceSeconds;
       
       setResultTitle(t("resDistance"));
       
       if (paceUnit === "km") {
         setResultMain(`${distOutput.toFixed(2)} km`);
         setResultSub(`(${(distOutput / 1.60934).toFixed(2)} mi)`);
       } else {
         setResultMain(`${distOutput.toFixed(2)} mi`);
         setResultSub(`(${(distOutput * 1.60934).toFixed(2)} km)`);
       }
    }
  };

  const formatPace = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = Math.round(totalSec % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = Math.round(totalSec % 60);
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };

  const handleDistancePreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDistanceUnit(val);
    if (val in distanceOptions) {
      setDistance(distanceOptions[val as keyof typeof distanceOptions].toString());
    } else if (val === "kilometers" || val === "miles" || val === "meters") {
      setDistance("");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
          <Watch size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center">
         
         {/* Mode Selector */}
         <div className="bg-slate-100 p-1.5 rounded-2xl w-full max-w-2xl flex relative mb-8">
            <button 
               onClick={() => { setMode("pace"); setResultMain(""); setErrorObj(""); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "pace" ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Timer size={16} /> {t("modePace")}
            </button>
            <button 
               onClick={() => { setMode("time"); setResultMain(""); setErrorObj(""); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "time" ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Watch size={16} /> {t("modeTime")}
            </button>
            <button 
               onClick={() => { setMode("distance"); setResultMain(""); setErrorObj(""); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "distance" ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Route size={16} /> {t("modeDistance")}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl">
            {/* Input Form */}
            <div className="space-y-6">
              
              {/* TIME INPUT */}
              {mode !== "time" && (
                <div className="flex flex-col gap-3">
                   <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">{t("time")}</label>
                   <div className="flex gap-2">
                     <div className="flex flex-col flex-1">
                        <input type="number" value={tHours} onChange={(e) => setTHours(e.target.value)} placeholder="00" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 text-center text-lg" />
                        <span className="text-xs text-center text-slate-400 mt-1">{t("hours")}</span>
                     </div>
                     <div className="text-2xl font-bold text-slate-300 flex items-center mb-5">:</div>
                     <div className="flex flex-col flex-1">
                        <input type="number" value={tMinutes} onChange={(e) => setTMinutes(e.target.value)} placeholder="00" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 text-center text-lg" />
                        <span className="text-xs text-center text-slate-400 mt-1">{t("minutes")}</span>
                     </div>
                     <div className="text-2xl font-bold text-slate-300 flex items-center mb-5">:</div>
                     <div className="flex flex-col flex-1">
                        <input type="number" value={tSeconds} onChange={(e) => setTSeconds(e.target.value)} placeholder="00" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 text-center text-lg" />
                        <span className="text-xs text-center text-slate-400 mt-1">{t("seconds")}</span>
                     </div>
                   </div>
                </div>
              )}

              {/* DISTANCE INPUT */}
              {mode !== "distance" && (
                <div className="flex flex-col gap-3">
                   <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">{t("distance")}</label>
                   <div className="flex gap-2 relative">
                      <div className="w-1/2">
                         <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 h-[50px] text-lg" />
                      </div>
                      <div className="w-1/2">
                         <select value={distanceUnit} onChange={handleDistancePreset} className="w-full px-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 appearance-none h-[50px]">
                           <option value="miles">{t("miles")}</option>
                           <option value="kilometers">{t("kilometers")}</option>
                           <option value="meters">{t("meters")}</option>
                           <option disabled>─ {t("events")} ─</option>
                           <option value="marathon">{t("marathon")}</option>
                           <option value="halfMarathon">{t("halfMarathon")}</option>
                           <option value="10k">10K (6.21 mi)</option>
                           <option value="5k">5K (3.11 mi)</option>
                         </select>
                      </div>
                   </div>
                </div>
              )}

              {/* PACE INPUT */}
              {mode !== "pace" && (
                <div className="flex flex-col gap-3">
                   <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">{t("paceLabel")}</label>
                   <div className="flex gap-2">
                     <div className="flex flex-col w-[30%]">
                        <input type="number" value={pMinutes} onChange={(e) => setPMinutes(e.target.value)} placeholder="00" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 text-center text-lg" />
                        <span className="text-xs text-center text-slate-400 mt-1">{t("minutes")}</span>
                     </div>
                     <div className="text-2xl font-bold text-slate-300 flex items-center mb-5">:</div>
                     <div className="flex flex-col w-[30%]">
                        <input type="number" value={pSeconds} onChange={(e) => setPSeconds(e.target.value)} placeholder="00" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 text-center text-lg" />
                        <span className="text-xs text-center text-slate-400 mt-1">{t("seconds")}</span>
                     </div>
                     <div className="flex flex-col flex-1 pl-2">
                        <select value={paceUnit} onChange={(e) => setPaceUnit(e.target.value)} className="w-full px-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 appearance-none h-[50px] mt-0">
                           <option value="km">per km</option>
                           <option value="mi">per mile</option>
                        </select>
                     </div>
                   </div>
                </div>
              )}

              {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

              <button onClick={calculate} className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm">
                {t("calculateButton")} <ArrowRightCircle size={18} />
              </button>

            </div>

            {/* RESULTS UI */}
            <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6">
               {!resultMain ? (
                 <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
                   <TargetPlaceholder mode={mode} />
                   <p className="font-medium mt-4">{t("waiting")}</p>
                 </div>
               ) : (
                 <div className="flex flex-1 flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                    <div className="bg-white border-2 border-blue-200 w-full rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-md relative overflow-hidden h-full">
                       <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 pointer-events-none"></div>
                       <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-50 rounded-full opacity-50 pointer-events-none"></div>
                       
                       <h3 className="relative z-10 text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">
                         {resultTitle}
                       </h3>
                       <span className="relative z-10 text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
                         {resultMain}
                       </span>
                       {resultSub && (
                         <span className="relative z-10 mt-4 text-xl font-bold text-slate-400">
                           {resultSub}
                         </span>
                       )}
                    </div>
                 </div>
               )}
            </div>

         </div>
      </div>
    </div>
  );
}

const TargetPlaceholder = ({ mode }: { mode: Mode }) => {
  if (mode === "pace") return <Timer size={80} strokeWidth={1} />;
  if (mode === "time") return <Watch size={80} strokeWidth={1} />;
  return <Route size={80} strokeWidth={1} />;
}
