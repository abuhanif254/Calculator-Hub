"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { HeartHandshake, History, CalendarHeart, Stethoscope } from "lucide-react";

interface PregnancyConceptionCalculatorViewProps {
  calcDef: CalculatorDef;
}

type Mode = "dueDate" | "ultrasound" | "lmp";

export function PregnancyConceptionCalculatorView({ calcDef }: PregnancyConceptionCalculatorViewProps) {
  const t = useTranslations("PregnancyConceptionCalculator");

  const [mode, setMode] = useState<Mode>("dueDate");
  
  const [baseDate, setBaseDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [ultraWeeks, setUltraWeeks] = useState("");
  const [ultraDays, setUltraDays] = useState("");

  const [results, setResults] = useState<{
    conceptionDate: Date;
    dueDate: Date;
    windowStart: Date;
    windowEnd: Date;
  } | null>(null);

  const [errorObj, setErrorObj] = useState("");

  const calculate = () => {
    setErrorObj("");
    setResults(null);

    if (!baseDate) {
      setErrorObj(t("errorDate"));
      return;
    }

    const d = new Date(baseDate + "T00:00:00Z");
    if (isNaN(d.getTime())) {
      setErrorObj(t("errorDate"));
      return;
    }

    const msPerDay = 86400000;
    let conceptionMs = 0;
    let dueDateMs = 0;

    if (mode === "dueDate") {
      dueDateMs = d.getTime();
      // Conception is 266 days before due date
      conceptionMs = dueDateMs - (266 * msPerDay);
    } 
    else if (mode === "lmp") {
      const cycle = parseInt(cycleLength);
      if (isNaN(cycle) || cycle < 20 || cycle > 45) {
        setErrorObj(t("errorCycle"));
        return;
      }
      // LMP math: Conception occurs 14 days after LMP on average.
      // Adjusted by cycle length diff: LMP + 14 + (cycle - 28)
      conceptionMs = d.getTime() + ((14 + (cycle - 28)) * msPerDay);
      // Due Date = Conception + 266 days
      dueDateMs = conceptionMs + (266 * msPerDay);
    } 
    else if (mode === "ultrasound") {
      const w = parseInt(ultraWeeks) || 0;
      const ds = parseInt(ultraDays) || 0;
      
      if (w < 0 || w > 42 || ds < 0 || ds > 6 || (w === 0 && ds === 0)) {
        setErrorObj(t("errorUltrasound"));
        return;
      }
      // Ultrasound measures total gestational age (since LMP assumption).
      // So fetal absolute age = (weeks * 7 + days).
      // Conception = Date of Ultrasound - (total gestational days) + 14 days (ovulation margin).
      const totalGestationDays = (w * 7) + ds;
      const lmpEquivalentMs = d.getTime() - (totalGestationDays * msPerDay);
      
      conceptionMs = lmpEquivalentMs + (14 * msPerDay);
      dueDateMs = conceptionMs + (266 * msPerDay);
    }

    // Intercourse logic: Sperm survives ~5 days. Egg ~1 day. 
    // Conception is day 0. Window: -5 days to +1 day.
    const windowStartMs = conceptionMs - (5 * msPerDay);
    const windowEndMs = conceptionMs + (1 * msPerDay);

    setResults({
      conceptionDate: new Date(conceptionMs),
      dueDate: new Date(dueDateMs),
      windowStart: new Date(windowStartMs),
      windowEnd: new Date(windowEndMs)
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center shadow-inner">
            <History size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* INPUT FORM */}
        <div className="space-y-6">
          
          <div className="bg-slate-100 p-1.5 rounded-2xl w-full flex flex-col md:flex-row relative">
             <button 
                onClick={() => { setMode("dueDate"); setResults(null); setErrorObj(""); }}
                className={`flex-1 flex justify-center items-center gap-2 py-3 px-2 text-sm font-bold rounded-xl md:rounded-lg transition-all ${mode === "dueDate" ? "bg-white text-fuchsia-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
             >
               {t("modeDueDate")}
             </button>
             <button 
                onClick={() => { setMode("ultrasound"); setResults(null); setErrorObj(""); }}
                className={`flex-1 flex justify-center items-center gap-2 py-3 px-2 text-sm font-bold rounded-xl md:rounded-lg transition-all ${mode === "ultrasound" ? "bg-white text-fuchsia-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
             >
               {t("modeUltrasound")}
             </button>
             <button 
                onClick={() => { setMode("lmp"); setResults(null); setErrorObj(""); }}
                className={`flex-1 flex justify-center items-center gap-2 py-3 px-2 text-sm font-bold rounded-xl md:rounded-lg transition-all ${mode === "lmp" ? "bg-white text-fuchsia-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
             >
               {t("modeLmp")}
             </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              {mode === "dueDate" ? t("labelDueDate") : mode === "ultrasound" ? t("labelUltrasound") : t("labelLmp")}
            </label>
            <input 
              type="date" 
              value={baseDate} 
              onChange={(e) => setBaseDate(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 font-bold text-slate-700 h-[50px] date-input-picker" 
            />
          </div>

          {mode === "lmp" && (
            <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-slate-700">{t("cycleLength")}</label>
               <input 
                 type="number" 
                 value={cycleLength} 
                 onChange={(e) => setCycleLength(e.target.value)} 
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 font-bold text-slate-700" 
               />
            </div>
          )}

          {mode === "ultrasound" && (
            <div className="flex flex-col gap-3">
               <label className="text-sm font-semibold text-slate-700">{t("ultrasoundAge")}</label>
               <div className="flex gap-2">
                 <div className="flex flex-col flex-1">
                    <input type="number" value={ultraWeeks} onChange={(e) => setUltraWeeks(e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 font-bold text-slate-700 text-center text-lg" />
                    <span className="text-xs text-center text-slate-400 mt-1">{t("weeksTitle")}</span>
                 </div>
                 <div className="flex flex-col flex-1">
                    <input type="number" value={ultraDays} onChange={(e) => setUltraDays(e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-fuchsia-500 font-bold text-slate-700 text-center text-lg" />
                    <span className="text-xs text-center text-slate-400 mt-1">{t("daysTitle")}</span>
                 </div>
               </div>
            </div>
          )}

          {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

          <button onClick={calculate} className="w-full py-4 mt-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-lg shadow-fuchsia-600/30 transition-all flex items-center justify-center gap-2">
            <CalendarHeart size={18} /> {t("calculateButton")}
          </button>
        </div>

        {/* RESULTS CARD */}
        <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6">
           {!results ? (
             <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
               <Stethoscope size={64} className="mb-4" strokeWidth={1} />
               <p className="font-medium max-w-[250px]">{t("waiting")}</p>
             </div>
           ) : (
             <div className="flex flex-col h-full space-y-6 animate-in fade-in zoom-in duration-300">
               
               <div className="bg-white border-2 border-fuchsia-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden">
                 <div className="absolute -top-8 -right-8 w-32 h-32 bg-fuchsia-50 rounded-full opacity-50"></div>
                 
                 <span className="relative z-10 text-sm font-black text-fuchsia-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <CalendarHeart size={16} /> {t("conceptionTitle")}
                 </span>
                 
                 <span className="relative z-10 text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                   {formatDate(results.conceptionDate)}
                 </span>
               </div>

               <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                   <HeartHandshake size={14} className="text-fuchsia-400" /> {t("fertilityWindow")}
                 </span>
                 <div className="flex gap-2 items-center bg-slate-50 px-4 py-2 rounded-xl mt-1">
                   <span className="text-lg font-bold text-slate-800">{formatShortDate(results.windowStart)}</span>
                   <span className="text-slate-300 font-bold">—</span>
                   <span className="text-lg font-bold text-slate-800">{formatShortDate(results.windowEnd)}</span>
                 </div>
                 <div className="text-xs text-slate-400 mt-3 font-medium bg-slate-50 border border-slate-100 p-2 rounded-lg">
                   {t("windowInfo")}
                 </div>
               </div>

               {mode !== "dueDate" && (
                 <div className="mt-auto border border-emerald-100 bg-emerald-50 rounded-2xl p-4 flex justify-between items-center">
                   <span className="text-sm font-bold text-emerald-800">{t("estimatedDueDate")}</span>
                   <span className="text-sm font-black text-emerald-700 bg-white px-3 py-1 rounded-lg border border-emerald-200 shadow-sm">
                     {formatDate(results.dueDate)}
                   </span>
                 </div>
               )}

             </div>
           )}
        </div>

      </div>
    </div>
  );
}
