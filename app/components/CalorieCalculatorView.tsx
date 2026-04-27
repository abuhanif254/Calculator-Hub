"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Flame, Info, ArrowUpCircle, ArrowDownCircle, Equal } from "lucide-react";

interface CalorieCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function CalorieCalculatorView({ calcDef }: CalorieCalculatorViewProps) {
  const t = useTranslations("CalorieCalculator");

  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  
  // Metric
  const [heightCm, setHeightCm] = useState("");
  // Imperial
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  
  const [activity, setActivity] = useState("1.2");

  const [tdee, setTdee] = useState<number | null>(null);
  const [errorObj, setErrorObj] = useState("");

  const calculate = () => {
    setErrorObj("");
    setTdee(null);

    const a = parseInt(age);
    if (isNaN(a) || a < 15 || a > 120) {
      setErrorObj(t("errorMsg"));
      return;
    }

    let wKg = 0;
    let hCm = 0;

    if (unit === "metric") {
      wKg = parseFloat(weight);
      hCm = parseFloat(heightCm);
    } else {
      const lbs = parseFloat(weight);
      wKg = lbs * 0.453592;
      
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      hCm = (ft * 30.48) + (inch * 2.54);
    }

    if (isNaN(wKg) || isNaN(hCm) || wKg <= 0 || hCm <= 0) {
      setErrorObj(t("errorMsg"));
      return;
    }

    // Mifflin-St Jeor
    let bmr = (10 * wKg) + (6.25 * hCm) - (5 * a);
    if (gender === "male") bmr += 5;
    else bmr -= 161;

    const multiplier = parseFloat(activity);
    const finalTdee = bmr * multiplier;

    setTdee(finalTdee);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shadow-inner">
            <Flame size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <div className="space-y-6">
          
          <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full md:w-fit">
            <button 
              onClick={() => { setUnit("metric"); setTdee(null); setErrorObj(""); }}
              className={`flex-1 md:w-32 py-2 text-sm font-bold rounded-lg transition-colors ${unit === 'metric' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t("metric")}
            </button>
            <button 
              onClick={() => { setUnit("imperial"); setTdee(null); setErrorObj(""); }}
              className={`flex-1 md:w-32 py-2 text-sm font-bold rounded-lg transition-colors ${unit === 'imperial' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t("imperial")}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">{t("gender")}</label>
              <select value={gender} onChange={(e) => setGender(e.target.value as "male" | "female")} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-slate-700 appearance-none">
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">{t("age")}</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Years" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-slate-700" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {unit === "metric" ? (
               <>
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("height")} (cm)</label>
                    <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="cm" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-slate-700" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("weight")} (kg)</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="kg" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-slate-700" />
                 </div>
               </>
             ) : (
               <>
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("height")}</label>
                    <div className="flex gap-2">
                      <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="ft" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-slate-700" />
                      <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="in" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-slate-700" />
                    </div>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("weight")} (lbs)</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="lbs" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-slate-700" />
                 </div>
               </>
             )}
          </div>

          <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">{t("activity")}</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-slate-700 appearance-none">
                <option value="1.2">{t("sedentary")}</option>
                <option value="1.375">{t("light")}</option>
                <option value="1.55">{t("moderate")}</option>
                <option value="1.725">{t("active")}</option>
                <option value="1.9">{t("veryActive")}</option>
              </select>
          </div>

          {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

          <button onClick={calculate} className="w-full py-4 mt-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all flex justify-center items-center gap-2">
            <Flame size={18} /> {t("calculate")}
          </button>

        </div>

        {/* Results Graph Base */}
        <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6">
          {!tdee ? (
            <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
              <Flame size={64} className="mb-4" strokeWidth={1} />
              <p className="font-medium max-w-[250px]">{t("resultWarning")}</p>
            </div>
          ) : (
            <div className="flex flex-col h-full space-y-6 animate-in fade-in zoom-in duration-300">
               
               <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden">
                 <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-50 rounded-full opacity-50"></div>
                 <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-rose-50 rounded-full opacity-50"></div>
                 <span className="relative z-10 text-sm font-bold text-slate-500 uppercase flex items-center gap-2 mb-2">
                   <Equal size={16} className="text-slate-400" /> {t("maintain")}
                 </span>
                 <span className="relative z-10 text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                   {Math.round(tdee).toLocaleString()}
                 </span>
                 <span className="relative z-10 text-sm font-semibold text-orange-500 mt-1">{t("caloriesDay")}</span>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 
                 <div className="bg-white border border-emerald-200 rounded-2xl p-5 flex flex-col items-center text-center">
                   <span className="text-xs font-bold text-emerald-600 uppercase flex items-center gap-1 mb-2">
                     <ArrowDownCircle size={14} /> {t("lose")}
                   </span>
                   <span className="text-3xl font-extrabold text-slate-800">
                     {Math.round(tdee - 500).toLocaleString()}
                   </span>
                   <span className="text-xs font-medium text-emerald-500 mt-1">{t("caloriesDay")}</span>
                   <div className="mt-3 text-[10px] text-slate-400 font-semibold bg-slate-50 w-full py-1 rounded-md text-center">~0.5 kg/week</div>
                 </div>

                 <div className="bg-white border border-rose-200 rounded-2xl p-5 flex flex-col items-center text-center">
                   <span className="text-xs font-bold text-rose-600 uppercase flex items-center gap-1 mb-2">
                     <ArrowUpCircle size={14} /> {t("gain")}
                   </span>
                   <span className="text-3xl font-extrabold text-slate-800">
                     {Math.round(tdee + 500).toLocaleString()}
                   </span>
                   <span className="text-xs font-medium text-rose-500 mt-1">{t("caloriesDay")}</span>
                   <div className="mt-3 text-[10px] text-slate-400 font-semibold bg-slate-50 w-full py-1 rounded-md text-center">~0.5 kg/week</div>
                 </div>

               </div>

               <div className="mt-auto pt-4 flex gap-2 text-xs text-slate-500 font-medium items-start bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <p>{t("resultWarning")}</p>
               </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
