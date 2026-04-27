"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Scale, CheckCircle, Info, Activity } from "lucide-react";

interface IdealWeightCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function IdealWeightCalculatorView({ calcDef }: IdealWeightCalculatorViewProps) {
  const t = useTranslations("IdealWeightCalculator");

  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const [results, setResults] = useState<{
    robinson: number;
    miller: number;
    hamwi: number;
    devine: number;
    bmiMin: number;
    bmiMax: number;
  } | null>(null);

  const [errorObj, setErrorObj] = useState("");

  const calculate = () => {
    setErrorObj("");
    setResults(null);

    let hInch = 0;
    let hMeter = 0;

    if (unit === "metric") {
      const cm = parseFloat(heightCm);
      if (isNaN(cm) || cm <= 100 || cm >= 250) {
        setErrorObj(t("errorHeight"));
        return;
      }
      hInch = cm / 2.54;
      hMeter = cm / 100;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inc = parseFloat(heightIn) || 0;
      hInch = (ft * 12) + inc;
      if (hInch < 40 || hInch > 100) {
        setErrorObj(t("errorHeight"));
        return;
      }
      hMeter = (hInch * 2.54) / 100;
    }

    // Formulas are based on inches over 5 ft (60 inches).
    // If under 60 inches, let d be negative to naturally lower the requirement slightly, or floor to 0.
    // Clinically, these formulas are 5ft+. We'll just use raw math diff.
    const d = hInch - 60;
    
    let wRob, wMil, wHam, wDev;

    if (gender === "male") {
      wRob = 52.0 + 1.9 * d;
      wMil = 56.2 + 1.41 * d;
      wHam = 48.0 + 2.7 * d;
      wDev = 50.0 + 2.3 * d;
    } else {
      wRob = 49.0 + 1.7 * d;
      wMil = 53.1 + 1.36 * d;
      wHam = 45.5 + 2.2 * d;
      wDev = 45.5 + 2.3 * d;
    }

    // Healthy BMI Range [18.5 - 25] = weight / (height^2)
    // weight = bmi * (height^2)
    const bmiMin = 18.5 * (hMeter * hMeter);
    const bmiMax = 25.0 * (hMeter * hMeter);

    setResults({
      robinson: wRob,
      miller: wMil,
      hamwi: wHam,
      devine: wDev,
      bmiMin: bmiMin,
      bmiMax: bmiMax
    });
  };

  const getW = (kgVal: number) => {
    if (unit === "metric") return `${kgVal.toFixed(1)} kg`;
    return `${(kgVal * 2.20462).toFixed(1)} lbs`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner">
          <Scale size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* INPUT FORM */}
        <div className="space-y-6">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full md:w-fit">
            <button 
              onClick={() => { setUnit("metric"); setResults(null); setErrorObj(""); }}
              className={`flex-1 md:w-32 py-2 text-sm font-bold rounded-lg transition-colors ${unit === 'metric' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t("metric")}
            </button>
            <button 
              onClick={() => { setUnit("imperial"); setResults(null); setErrorObj(""); }}
              className={`flex-1 md:w-32 py-2 text-sm font-bold rounded-lg transition-colors ${unit === 'imperial' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t("imperial")}
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">{t("gender")}</label>
            <select value={gender} onChange={(e) => setGender(e.target.value as "male" | "female")} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700 appearance-none">
              <option value="male">{t("male")}</option>
              <option value="female">{t("female")}</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
             {unit === "metric" ? (
               <>
                  <label className="text-sm font-semibold text-slate-700">{t("height")} (cm)</label>
                  <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="175" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700" />
               </>
             ) : (
               <>
                  <label className="text-sm font-semibold text-slate-700">{t("height")} (ft / in)</label>
                  <div className="flex gap-2">
                    <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="ft" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700" />
                    <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="in" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700" />
                  </div>
               </>
             )}
          </div>

          {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

          <button onClick={calculate} className="w-full py-4 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2">
            <CheckCircle size={18} /> {t("calculate")}
          </button>
        </div>

        {/* RESULTS CARD */}
        <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6">
           {!results ? (
             <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
               <Scale size={64} className="mb-4" strokeWidth={1} />
               <p className="font-medium max-w-[250px]">{t("waiting")}</p>
             </div>
           ) : (
             <div className="flex flex-col h-full space-y-6 animate-in fade-in zoom-in duration-300">
               
               <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden">
                 <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-50 rounded-full opacity-50"></div>
                 <span className="relative z-10 text-sm font-bold text-slate-500 uppercase flex items-center gap-2 mb-2 tracking-wider">
                   {t("healthyBmiRange")}
                 </span>
                 <span className="relative z-10 text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
                   {getW(results.bmiMin)} - {getW(results.bmiMax)}
                 </span>
                 <span className="relative z-10 font-semibold text-emerald-600 mt-2 text-sm bg-emerald-50 px-3 py-1 rounded-full">{t("clinicallyHealthy")}</span>
               </div>

               <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                 <div className="bg-slate-100/50 p-4 border-b border-slate-200 text-sm font-bold text-slate-700 flex items-center gap-2">
                   <Activity size={16} className="text-slate-400" /> {t("formulasTitle")}
                 </div>
                 <div className="divide-y divide-slate-100">
                    <div className="flex justify-between items-center p-4">
                      <span className="text-slate-600 font-medium">J.D. Robinson</span>
                      <span className="font-bold text-slate-800 text-lg">{getW(results.robinson)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4">
                      <span className="text-slate-600 font-medium">D.R. Miller</span>
                      <span className="font-bold text-slate-800 text-lg">{getW(results.miller)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4">
                      <span className="text-slate-600 font-medium">G.J. Hamwi</span>
                      <span className="font-bold text-slate-800 text-lg">{getW(results.hamwi)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4">
                      <span className="text-slate-600 font-medium">B.J. Devine</span>
                      <span className="font-bold text-slate-800 text-lg">{getW(results.devine)}</span>
                    </div>
                 </div>
               </div>

               <div className="mt-auto pt-4 flex gap-2 text-xs text-slate-600 font-medium items-start p-2">
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
