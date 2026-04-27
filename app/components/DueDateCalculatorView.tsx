"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { CalendarHeart, Star, Sparkles, Dna, ArrowRightCircle } from "lucide-react";

interface DueDateCalculatorViewProps {
  calcDef: CalculatorDef;
}

type Mode = "lmp" | "conception" | "ivf";

export function DueDateCalculatorView({ calcDef }: DueDateCalculatorViewProps) {
  const t = useTranslations("DueDateCalculator");

  const [mode, setMode] = useState<Mode>("lmp");
  
  const [baseDate, setBaseDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [ivfType, setIvfType] = useState("5"); // '3' or '5'

  const [results, setResults] = useState<{
    dueDate: Date;
    zodiac: string;
    birthstone: string;
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

    let dueDateMs = 0;
    const msPerDay = 86400000;

    if (mode === "lmp") {
      const cycle = parseInt(cycleLength);
      if (isNaN(cycle) || cycle < 20 || cycle > 45) {
        setErrorObj(t("errorCycle"));
        return;
      }
      dueDateMs = d.getTime() + ((280 + (cycle - 28)) * msPerDay);
    } else if (mode === "conception") {
      dueDateMs = d.getTime() + (266 * msPerDay);
    } else if (mode === "ivf") {
      const age = parseInt(ivfType);
      dueDateMs = d.getTime() + ((266 - age) * msPerDay);
    }

    const dueDate = new Date(dueDateMs);

    // Zodiac & Birthstone Logic
    const month = dueDate.getUTCMonth() + 1; // 1-12
    const day = dueDate.getUTCDate();
    
    let zodiacSign = "";
    let birthStone = "";

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacSign = t("aries");
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacSign = t("taurus");
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiacSign = t("gemini");
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiacSign = t("cancer");
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacSign = t("leo");
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacSign = t("virgo");
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiacSign = t("libra");
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiacSign = t("scorpio");
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiacSign = t("sagittarius");
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiacSign = t("capricorn");
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacSign = t("aquarius");
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) zodiacSign = t("pisces");

    switch(month) {
      case 1: birthStone = t("garnet"); break;
      case 2: birthStone = t("amethyst"); break;
      case 3: birthStone = t("aquamarine"); break;
      case 4: birthStone = t("diamond"); break;
      case 5: birthStone = t("emerald"); break;
      case 6: birthStone = t("pearl"); break;
      case 7: birthStone = t("ruby"); break;
      case 8: birthStone = t("peridot"); break;
      case 9: birthStone = t("sapphire"); break;
      case 10: birthStone = t("opal"); break;
      case 11: birthStone = t("topaz"); break;
      case 12: birthStone = t("turquoise"); break;
    }

    setResults({
      dueDate,
      zodiac: zodiacSign,
      birthstone: birthStone
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
          <CalendarHeart size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center">
         
         {/* Mode Selector */}
         <div className="bg-slate-100 p-1.5 rounded-2xl w-full max-w-2xl flex relative mb-8">
            <button 
               onClick={() => { setMode("lmp"); setResults(null); setErrorObj(""); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "lmp" ? "bg-white text-indigo-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               {t("modeLmp")}
            </button>
            <button 
               onClick={() => { setMode("conception"); setResults(null); setErrorObj(""); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "conception" ? "bg-white text-indigo-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               {t("modeConception")}
            </button>
            <button 
               onClick={() => { setMode("ivf"); setResults(null); setErrorObj(""); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "ivf" ? "bg-white text-indigo-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               {t("modeIvf")}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl">
            {/* Input Form */}
            <div className="space-y-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  {mode === "lmp" ? t("labelLmp") : mode === "conception" ? t("labelConception") : t("labelIvf")}
                </label>
                <input 
                  type="date" 
                  value={baseDate} 
                  onChange={(e) => setBaseDate(e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 h-[50px] date-input-picker" 
                />
              </div>

              {mode === "lmp" && (
                <div className="flex flex-col gap-2">
                   <label className="text-sm font-semibold text-slate-700">{t("cycleLength")}</label>
                   <input 
                     type="number" 
                     value={cycleLength} 
                     onChange={(e) => setCycleLength(e.target.value)} 
                     className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700" 
                   />
                </div>
              )}

              {mode === "ivf" && (
                <div className="flex flex-col gap-2">
                   <label className="text-sm font-semibold text-slate-700">{t("embryoAge")}</label>
                   <select 
                     value={ivfType} 
                     onChange={(e) => setIvfType(e.target.value)} 
                     className="w-full px-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 appearance-none h-[50px]"
                   >
                     <option value="3">{t("day3")}</option>
                     <option value="5">{t("day5")}</option>
                   </select>
                </div>
              )}

              {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

              <button onClick={calculate} className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2">
                 {t("calculateButton")} <ArrowRightCircle size={18} />
              </button>

            </div>

            {/* RESULTS UI */}
            <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6">
               {!results ? (
                 <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
                   <CalendarHeart size={80} className="mb-4" strokeWidth={1} />
                   <p className="font-medium mt-2">{t("waiting")}</p>
                 </div>
               ) : (
                 <div className="flex flex-col h-full space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="bg-white border-2 border-indigo-200 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-md relative overflow-hidden">
                       <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full opacity-50 pointer-events-none"></div>
                       <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-50 rounded-full opacity-50 pointer-events-none"></div>
                       
                       <h3 className="relative z-10 text-sm font-bold text-indigo-500 uppercase tracking-widest mb-4 flex gap-2 items-center">
                         <Sparkles size={16} /> {t("dueDateTitle")}
                       </h3>
                       <span className="relative z-10 text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                         {formatDate(results.dueDate)}
                       </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-auto">
                       <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center shadow-sm">
                          <Star size={24} className="text-amber-400 mb-2" />
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t("zodiac")}</span>
                          <span className="text-xl font-extrabold text-slate-800">{results.zodiac}</span>
                       </div>
                       <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 mb-2 shadow-sm border border-slate-100"></div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t("birthstone")}</span>
                          <span className="text-xl font-extrabold text-slate-800">{results.birthstone}</span>
                       </div>
                    </div>
                 </div>
               )}
            </div>

         </div>
      </div>
    </div>
  );
}
