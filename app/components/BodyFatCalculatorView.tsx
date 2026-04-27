"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Activity, Target, BrainCircuit, Waves } from "lucide-react";

interface BodyFatCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function BodyFatCalculatorView({ calcDef }: BodyFatCalculatorViewProps) {
  const t = useTranslations("BodyFatCalculator");

  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  
  // Height
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  // Circumferences
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const [results, setResults] = useState<{
    bfPercent: number;
    fatMass: number;
    leanMass: number;
    category: string;
  } | null>(null);

  const [errorObj, setErrorObj] = useState("");

  const getCategory = (bf: number, sex: "male" | "female") => {
    if (sex === "male") {
      if (bf < 2) return "Too Low";
      if (bf <= 5) return t("catEssential");
      if (bf <= 13) return t("catAthletes");
      if (bf <= 17) return t("catFitness");
      if (bf <= 24) return t("catAverage");
      return t("catObese");
    } else {
      if (bf < 10) return "Too Low";
      if (bf <= 13) return t("catEssential");
      if (bf <= 20) return t("catAthletes");
      if (bf <= 24) return t("catFitness");
      if (bf <= 31) return t("catAverage");
      return t("catObese");
    }
  };

  const calculate = () => {
    setErrorObj("");
    setResults(null);

    const a = parseInt(age);
    if (isNaN(a) || a < 15 || a > 120) {
      setErrorObj(t("errorMsg"));
      return;
    }

    let wKg = 0;
    let hCm = 0;
    let neckCm = 0;
    let waistCm = 0;
    let hipCm = 0;

    if (unit === "metric") {
      wKg = parseFloat(weight);
      hCm = parseFloat(heightCm);
      neckCm = parseFloat(neck);
      waistCm = parseFloat(waist);
      hipCm = parseFloat(hip);
    } else {
      wKg = parseFloat(weight) * 0.453592;
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      hCm = (ft * 30.48) + (inch * 2.54);
      neckCm = parseFloat(neck) * 2.54;
      waistCm = parseFloat(waist) * 2.54;
      hipCm = parseFloat(hip) * 2.54;
    }

    if (
      isNaN(wKg) || isNaN(hCm) || isNaN(neckCm) || isNaN(waistCm) ||
      wKg <= 0 || hCm <= 0 || neckCm <= 0 || waistCm <= 0 || 
      (gender === "female" && (isNaN(hipCm) || hipCm <= 0))
    ) {
      setErrorObj(t("errorMsg"));
      return;
    }

    // Mathematical guards to prevent bad log computation
    let bfPercent = 0;
    if (gender === "male") {
      if (waistCm <= neckCm) {
        setErrorObj(t("errorWaistNeck"));
        return;
      }
      bfPercent = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(hCm)) - 450;
    } else {
      if (waistCm + hipCm <= neckCm) {
        setErrorObj(t("errorWaistNeck"));
        return;
      }
      bfPercent = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(hCm)) - 450;
    }

    if (isNaN(bfPercent) || bfPercent < 0 || bfPercent > 100) {
      setErrorObj(t("errorUnrealistic"));
      return;
    }

    const wUnitVal = unit === "metric" ? wKg : parseFloat(weight);
    const fatMass = wUnitVal * (bfPercent / 100);
    const leanMass = wUnitVal - fatMass;

    setResults({
      bfPercent: bfPercent,
      fatMass: fatMass,
      leanMass: leanMass,
      category: getCategory(bfPercent, gender)
    });
  };

  const getWeightUnit = () => unit === "metric" ? "kg" : "lbs";

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
          <Activity size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* INPUTS */}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">{t("gender")}</label>
              <select value={gender} onChange={(e) => { setGender(e.target.value as "male" | "female"); setResults(null); setErrorObj(""); }} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 appearance-none">
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">{t("age")}</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {unit === "metric" ? (
               <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("height")} (cm)</label>
                  <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700" />
               </div>
             ) : (
               <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">{t("height")} (ft / in)</label>
                  <div className="flex gap-2">
                    <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="ft" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700" />
                    <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="in" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700" />
                  </div>
               </div>
             )}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">{t("weight")} ({getWeightUnit()})</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700" />
              </div>
          </div>

          <div className="h-px bg-slate-200 my-4 w-full"></div>

          <div className="grid grid-cols-2 gap-4">
             <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-slate-700">{t("neck")} ({unit === 'metric' ? 'cm' : 'in'})</label>
               <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700" />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-slate-700">{t("waist")} ({unit === 'metric' ? 'cm' : 'in'})</label>
               <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700" />
             </div>
          </div>

          {gender === "female" && (
            <div className="flex flex-col gap-2 w-1/2 pr-2">
              <label className="text-sm font-semibold text-slate-700">{t("hip")} ({unit === 'metric' ? 'cm' : 'in'})</label>
              <input type="number" value={hip} onChange={(e) => setHip(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700" />
            </div>
          )}

          {errorObj && <div className="text-sm text-rose-500 font-semibold p-3 border border-rose-200 bg-rose-50 rounded-xl">{errorObj}</div>}

          <button onClick={calculate} className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex justify-center items-center gap-2">
            <Target size={18} /> {t("calculate")}
          </button>
        </div>

        {/* RESULTS */}
        <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6">
           {!results ? (
             <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
               <BrainCircuit size={64} className="mb-4" strokeWidth={1} />
               <p className="font-medium max-w-[250px]">{t("waiting")}</p>
             </div>
           ) : (
             <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-300">
                <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-50 rounded-full opacity-50"></div>
                  <span className="relative z-10 text-sm font-bold text-slate-500 uppercase flex items-center gap-2 mb-2">
                    <Activity size={16} className="text-indigo-400" /> {t("bodyFat")}
                  </span>
                  <span className="relative z-10 text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
                    {results.bfPercent.toFixed(1)}<span className="text-3xl text-slate-400">%</span>
                  </span>
                  <span className="relative z-10 font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-4 text-sm tracking-widest uppercase">
                    {results.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {t("fatMass")}
                    </span>
                    <span className="text-2xl font-extrabold text-slate-800">
                      {results.fatMass.toFixed(1)} <span className="text-sm font-semibold text-slate-400">{getWeightUnit()}</span>
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Waves size={12} className="text-sky-500" /> {t("leanMass")}
                    </span>
                    <span className="text-2xl font-extrabold text-slate-800">
                      {results.leanMass.toFixed(1)} <span className="text-sm font-semibold text-slate-400">{getWeightUnit()}</span>
                    </span>
                  </div>
                </div>

             </div>
           )}
        </div>

      </div>
    </div>
  );
}
