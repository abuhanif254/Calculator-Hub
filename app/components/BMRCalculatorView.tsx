"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { BatteryCharging, Info, Calendar, Clock, Activity } from "lucide-react";

interface BMRCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function BMRCalculatorView({ calcDef }: BMRCalculatorViewProps) {
  const t = useTranslations("BMRCalculator");

  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  
  // Heights
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const [bmr, setBmr] = useState<number | null>(null);
  const [errorObj, setErrorObj] = useState("");

  const calculate = () => {
    setErrorObj("");
    setBmr(null);

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

    // Mifflin-St Jeor Equation
    let val = (10 * wKg) + (6.25 * hCm) - (5 * a);
    if (gender === "male") {
      val += 5;
    } else {
      val -= 161;
    }

    if (val < 500 || val > 6000) {
      setErrorObj(t("errorRealistic"));
      return;
    }

    setBmr(val);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-lime-100 text-lime-600 rounded-xl flex items-center justify-center shadow-inner">
          <BatteryCharging size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* INPUT FORM */}
        <div className="space-y-6">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full md:w-fit">
            <button 
              onClick={() => { setUnit("metric"); setBmr(null); setErrorObj(""); }}
              className={`flex-1 md:w-32 py-2 text-sm font-bold rounded-lg transition-colors ${unit === 'metric' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t("metric")}
            </button>
            <button 
              onClick={() => { setUnit("imperial"); setBmr(null); setErrorObj(""); }}
              className={`flex-1 md:w-32 py-2 text-sm font-bold rounded-lg transition-colors ${unit === 'imperial' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t("imperial")}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">{t("gender")}</label>
              <select value={gender} onChange={(e) => setGender(e.target.value as "male" | "female")} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-bold text-slate-700 appearance-none">
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">{t("age")}</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder={t("ageExample")} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-bold text-slate-700" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {unit === "metric" ? (
               <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("height")} (cm)</label>
                  <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="cm" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-bold text-slate-700" />
               </div>
             ) : (
               <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("height")} (ft / in)</label>
                  <div className="flex gap-2">
                    <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="ft" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-bold text-slate-700" />
                    <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="in" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-bold text-slate-700" />
                  </div>
               </div>
             )}
             <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">{t("weight")} ({unit === "metric" ? "kg" : "lbs"})</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-bold text-slate-700" />
             </div>
          </div>

          {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

          <button onClick={calculate} className="w-full py-4 mt-2 bg-lime-600 hover:bg-lime-700 text-white font-bold rounded-xl shadow-lg shadow-lime-600/30 transition-all flex items-center justify-center gap-2">
            <Activity size={18} /> {t("calculate")}
          </button>
        </div>

        {/* RESULTS CARD */}
        <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6">
           {!bmr ? (
             <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
               <BatteryCharging size={64} className="mb-4" strokeWidth={1} />
               <p className="font-medium max-w-[250px]">{t("waiting")}</p>
             </div>
           ) : (
             <div className="flex flex-col h-full space-y-6 animate-in fade-in zoom-in duration-300">
               
               <div className="bg-white border-2 border-lime-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden">
                 <div className="absolute -top-8 -right-8 w-32 h-32 bg-lime-50 rounded-full opacity-50"></div>
                 <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-50 rounded-full opacity-50"></div>
                 <span className="relative z-10 text-sm font-bold text-slate-500 uppercase flex items-center gap-2 mb-2 tracking-wider">
                   {t("dailyBMR")}
                 </span>
                 <span className="relative z-10 text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
                   {Math.round(bmr).toLocaleString()}
                 </span>
                 <span className="relative z-10 font-semibold text-lime-600 mt-2 text-sm">{t("caloriesPerDay")}</span>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center">
                   <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-2 tracking-wider">
                     <Calendar size={14} className="text-slate-400" /> {t("weeklyBMR")}
                   </span>
                   <span className="text-2xl font-extrabold text-slate-800">
                     {Math.round(bmr * 7).toLocaleString()}
                   </span>
                   <span className="text-xs font-medium text-slate-400 mt-1">{t("caloriesPerWeek")}</span>
                 </div>

                 <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center">
                   <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mb-2 tracking-wider">
                     <Clock size={14} className="text-slate-400" /> {t("hourlyBMR")}
                   </span>
                   <span className="text-2xl font-extrabold text-slate-800">
                     {Math.round(bmr / 24).toLocaleString()}
                   </span>
                   <span className="text-xs font-medium text-slate-400 mt-1">{t("caloriesPerHour")}</span>
                 </div>
               </div>

               <div className="mt-auto pt-4 flex gap-2 text-xs text-slate-600 font-medium items-start bg-slate-100 p-4 rounded-xl border border-slate-200">
                  <Info size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <p>{t("infoText")}</p>
               </div>

             </div>
           )}
        </div>

      </div>
    </div>
  );
}
