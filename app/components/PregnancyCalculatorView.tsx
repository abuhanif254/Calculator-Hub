"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Baby, CalendarDays, Heart, Dna } from "lucide-react";

interface PregnancyCalculatorViewProps {
  calcDef: CalculatorDef;
}

type Mode = "lmp" | "conception" | "ivf";

export function PregnancyCalculatorView({ calcDef }: PregnancyCalculatorViewProps) {
  const t = useTranslations("PregnancyCalculator");

  const [mode, setMode] = useState<Mode>("lmp");
  
  const [baseDate, setBaseDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [ivfType, setIvfType] = useState("5"); // '3' or '5'

  const [results, setResults] = useState<{
    dueDate: Date;
    currentDate: Date;
    weeks: number;
    days: number;
    trimester: number;
    daysRemaining: number;
  } | null>(null);

  const [errorObj, setErrorObj] = useState("");

  const calculate = () => {
    setErrorObj("");
    setResults(null);

    if (!baseDate) {
      setErrorObj(t("errorDate"));
      return;
    }

    // Force date object into UTC to prevent local timezone weirdness on midnight selection
    const d = new Date(baseDate + "T00:00:00Z");
    if (isNaN(d.getTime())) {
      setErrorObj(t("errorDate"));
      return;
    }

    let dueDateMs = 0;
    const msPerDay = 86400000;

    if (mode === "lmp") {
      const cycle = parseInt(cycleLength);
      if (isNaN(cycle) || cycle < 20 || cycle > 45) {
        setErrorObj(t("errorCycle"));
        return;
      }
      // Naegele's rule adjusted for cycle length:
      // standard is 280 days. adjustment is (cycle - 28)
      dueDateMs = d.getTime() + ((280 + (cycle - 28)) * msPerDay);

    } else if (mode === "conception") {
      // 266 days from conception
      dueDateMs = d.getTime() + (266 * msPerDay);

    } else if (mode === "ivf") {
      // 266 days minus embryo age
      const age = parseInt(ivfType);
      dueDateMs = d.getTime() + ((266 - age) * msPerDay);
    }

    const dueDate = new Date(dueDateMs);
    const conceptualLmpDateMs = dueDateMs - (280 * msPerDay);
    
    // Get absolute current local time shifted to UTC baseline for diffing exactly days
    const now = new Date();
    const currentMs = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    // Fetal age mathematically starts at LMP conceptual date
    const elapsedMs = currentMs - conceptualLmpDateMs;
    const elapsedDays = Math.floor(elapsedMs / msPerDay);

    let weeks = Math.floor(elapsedDays / 7);
    let days = elapsedDays % 7;

    // Boundary rules: Cannot be negative weeks if they input future date for LMP
    if (elapsedDays < 0) {
      weeks = 0;
      days = 0;
    }

    let isPostTerm = false;
    if (elapsedDays >= 280) {
      isPostTerm = true;
      // We still map exactly how many days over they are
    }

    let tNum = 1;
    if (weeks >= 14 && weeks < 28) tNum = 2;
    else if (weeks >= 28) tNum = 3;

    const remaining = Math.max(0, 280 - elapsedDays);

    setResults({
      dueDate,
      currentDate: new Date(currentMs),
      weeks,
      days,
      trimester: tNum,
      daysRemaining: remaining,
    });
  };

  const getTrimesterUI = (trimester: number) => {
    switch (trimester) {
      case 1: return { color: "text-rose-500", bg: "bg-rose-50", label: `1${t("st")} ${t("trimester")}` };
      case 2: return { color: "text-amber-500", bg: "bg-amber-50", label: `2${t("nd")} ${t("trimester")}` };
      case 3: return { color: "text-emerald-500", bg: "bg-emerald-50", label: `3${t("rd")} ${t("trimester")}` };
      default: return { color: "text-slate-500", bg: "bg-slate-50", label: t("trimester") };
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center shadow-inner">
            <Baby size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* INPUT FORM */}
        <div className="space-y-6">
          
          <div className="bg-slate-100 p-1.5 rounded-2xl w-full flex relative grid-cols-3">
             <button 
                onClick={() => { setMode("lmp"); setResults(null); setErrorObj(""); }}
                className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "lmp" ? "bg-white text-pink-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
             >
               {t("modeLmp")}
             </button>
             <button 
                onClick={() => { setMode("conception"); setResults(null); setErrorObj(""); }}
                className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "conception" ? "bg-white text-pink-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
             >
               {t("modeConception")}
             </button>
             <button 
                onClick={() => { setMode("ivf"); setResults(null); setErrorObj(""); }}
                className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "ivf" ? "bg-white text-pink-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
             >
               {t("modeIvf")}
             </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              {mode === "lmp" ? t("labelLmp") : mode === "conception" ? t("labelConception") : t("labelIvf")}
            </label>
            <input 
              type="date" 
              value={baseDate} 
              onChange={(e) => setBaseDate(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 font-bold text-slate-700 h-[50px] date-input-picker" 
            />
          </div>

          {mode === "lmp" && (
            <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-slate-700">{t("cycleLength")}</label>
               <input 
                 type="number" 
                 value={cycleLength} 
                 onChange={(e) => setCycleLength(e.target.value)} 
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 font-bold text-slate-700" 
               />
            </div>
          )}

          {mode === "ivf" && (
            <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-slate-700">{t("embryoAge")}</label>
               <select 
                 value={ivfType} 
                 onChange={(e) => setIvfType(e.target.value)} 
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 font-bold text-slate-700 appearance-none h-[50px]"
               >
                 <option value="3">{t("day3")}</option>
                 <option value="5">{t("day5")}</option>
               </select>
            </div>
          )}

          {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

          <button onClick={calculate} className="w-full py-4 mt-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2">
            <Heart size={18} /> {t("calculateButton")}
          </button>
        </div>

        {/* RESULTS CARD */}
        <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6">
           {!results ? (
             <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
               <CalendarDays size={64} className="mb-4" strokeWidth={1} />
               <p className="font-medium max-w-[250px]">{t("waiting")}</p>
             </div>
           ) : (
             <div className="flex flex-col h-full space-y-6 animate-in fade-in zoom-in duration-300">
               
               <div className="bg-white border-2 border-pink-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden">
                 <div className="absolute -top-8 -right-8 w-32 h-32 bg-pink-50 rounded-full opacity-50"></div>
                 <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-rose-50 rounded-full opacity-50"></div>
                 
                 <span className="relative z-10 text-sm font-black text-pink-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <Baby size={16} /> {t("dueDateTitle")}
                 </span>
                 
                 <span className="relative z-10 text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                   {results.dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
                 </span>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 
                 <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                     {t("currentGestation")}
                   </span>
                   <div className="flex items-baseline gap-1 text-slate-800">
                     <span className="text-3xl font-extrabold">{results.weeks}</span>
                     <span className="text-sm font-semibold text-slate-400">{t("weeksTitle")}</span>
                     <span className="text-xl font-bold ml-1">{results.days}</span>
                     <span className="text-xs font-semibold text-slate-400">{t("daysTitle")}</span>
                   </div>
                 </div>

                 <div className={`border rounded-2xl p-5 flex flex-col items-center text-center ${getTrimesterUI(results.trimester).bg}`}>
                   <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${getTrimesterUI(results.trimester).color}`}>
                     {t("currentStage")}
                   </span>
                   <span className={`text-2xl font-extrabold ${getTrimesterUI(results.trimester).color}`}>
                     {getTrimesterUI(results.trimester).label}
                   </span>
                 </div>
               </div>

               <div className="mt-auto px-1">
                 <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                   <span>{t("progressStart")}</span>
                   <span>{t("progressEnd", { days: results.daysRemaining })}</span>
                 </div>
                 <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-1000 ease-out"
                     style={{ width: `${Math.min(100, (results.weeks / 40) * 100)}%` }}
                   ></div>
                 </div>
               </div>

             </div>
           )}
        </div>

      </div>
    </div>
  );
}
