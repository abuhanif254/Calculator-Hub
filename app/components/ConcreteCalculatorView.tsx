"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { HardHat, Square, Circle, Calculator, ArrowRightCircle } from "lucide-react";

interface ConcreteCalculatorViewProps {
  calcDef: CalculatorDef;
}

type ShapeMode = "slab" | "hole";
type UnitSystem = "imperial" | "metric";

export function ConcreteCalculatorView({ calcDef }: ConcreteCalculatorViewProps) {
  const t = useTranslations("ConcreteCalculator");

  const [shape, setShape] = useState<ShapeMode>("slab");
  const [unit, setUnit] = useState<UnitSystem>("imperial");

  // Inputs
  const [lengthInput, setLengthInput] = useState("");
  const [widthInput, setWidthInput] = useState("");
  const [depthInput, setDepthInput] = useState(""); // usually inches or cm
  
  const [diameterInput, setDiameterInput] = useState("");
  const [columnDepthInput, setColumnDepthInput] = useState("");

  const [errorObj, setErrorObj] = useState("");
  const [results, setResults] = useState<{
    cubicYards: number;
    cubicMeters: number;
    bags80lb: number;
    bags60lb: number;
  } | null>(null);

  const calculateConcrete = () => {
    setErrorObj("");
    setResults(null);

    let cubicFeet = 0;
    
    // Constant: 1 cubic meter = 35.3147 cubic feet
    // Constant: 1 cubic yard = 27 cubic feet

    if (shape === "slab") {
        const len = parseFloat(lengthInput);
        const wdt = parseFloat(widthInput);
        const dep = parseFloat(depthInput);

        if (isNaN(len) || isNaN(wdt) || isNaN(dep) || len <= 0 || wdt <= 0 || dep <= 0) {
           setErrorObj(t("errorInputs"));
           return;
        }

        if (unit === "imperial") {
           // length (ft) * width (ft) * depth (inches -> ft)
           cubicFeet = (len * wdt * (dep / 12));
        } else {
           // len (m), wdt (m), dep (cm) -> m3
           const cubicMeters = len * wdt * (dep / 100);
           cubicFeet = cubicMeters * 35.3147;
        }
    } else {
        const dia = parseFloat(diameterInput);
        const dpt = parseFloat(columnDepthInput);

        if (isNaN(dia) || isNaN(dpt) || dia <= 0 || dpt <= 0) {
           setErrorObj(t("errorInputs"));
           return;
        }

        if (unit === "imperial") {
           // dia (inches -> ft), dpt (ft)
           const radF = (dia / 12) / 2;
           cubicFeet = Math.PI * Math.pow(radF, 2) * dpt;
        } else {
           // dia (cm -> m), dpt (m)
           const radM = (dia / 100) / 2;
           const cubicMeters = Math.PI * Math.pow(radM, 2) * dpt;
           cubicFeet = cubicMeters * 35.3147;
        }
    }

    const cubicYards = cubicFeet / 27;
    const cubicMeters = cubicFeet / 35.3147;

    // 80lb bag yields ~0.60 cubic feet
    // 60lb bag yields ~0.45 cubic feet
    const bags80lb = cubicFeet / 0.60;
    const bags60lb = cubicFeet / 0.45;

    setResults({
       cubicYards,
       cubicMeters,
       bags80lb: Math.ceil(bags80lb),
       bags60lb: Math.ceil(bags60lb)
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-stone-100 text-stone-600 rounded-xl flex items-center justify-center shadow-inner">
            <HardHat size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 hidden md:block">{calcDef.title}</h2>
        </div>
        <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
           <button onClick={() => setUnit("imperial")} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${unit === "imperial" ? "bg-slate-800 text-white" : "text-slate-500 hover:bg-slate-100"}`}>Imperial</button>
           <button onClick={() => setUnit("metric")} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${unit === "metric" ? "bg-slate-800 text-white" : "text-slate-500 hover:bg-slate-100"}`}>Metric</button>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center">
         
         <div className="bg-slate-100 p-1.5 rounded-2xl w-full max-w-2xl flex relative mb-8">
            <button 
               onClick={() => { setShape("slab"); setErrorObj(""); setResults(null); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${shape === "slab" ? "bg-white text-stone-700 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               <Square size={16} /> {t("modeSlab")}
            </button>
            <button 
               onClick={() => { setShape("hole"); setErrorObj(""); setResults(null); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${shape === "hole" ? "bg-white text-stone-700 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               <Circle size={16} /> {t("modeHole")}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl">
            
            <div className="space-y-6">
              
              {shape === "slab" && (
                <div className="grid gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 flex justify-between">
                       <span>{t("length")}</span>
                       <span className="text-slate-400">{unit === "imperial" ? "ft" : "m"}</span>
                    </label>
                    <input type="number" min="0" value={lengthInput} onChange={(e) => setLengthInput(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-stone-500 font-bold text-slate-700" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 flex justify-between">
                       <span>{t("width")}</span>
                       <span className="text-slate-400">{unit === "imperial" ? "ft" : "m"}</span>
                    </label>
                    <input type="number" min="0" value={widthInput} onChange={(e) => setWidthInput(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-stone-500 font-bold text-slate-700" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 flex justify-between">
                       <span>{t("thickness")}</span>
                       <span className="text-slate-400">{unit === "imperial" ? "in" : "cm"}</span>
                    </label>
                    <input type="number" min="0" value={depthInput} onChange={(e) => setDepthInput(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-stone-500 font-bold text-slate-700" />
                  </div>
                </div>
              )}

              {shape === "hole" && (
                <div className="grid gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 flex justify-between">
                       <span>{t("diameter")}</span>
                       <span className="text-slate-400">{unit === "imperial" ? "in" : "cm"}</span>
                    </label>
                    <input type="number" min="0" value={diameterInput} onChange={(e) => setDiameterInput(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-stone-500 font-bold text-slate-700" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 flex justify-between">
                       <span>{t("depth")}</span>
                       <span className="text-slate-400">{unit === "imperial" ? "ft" : "m"}</span>
                    </label>
                    <input type="number" min="0" value={columnDepthInput} onChange={(e) => setColumnDepthInput(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-stone-500 font-bold text-slate-700" />
                  </div>
                </div>
              )}

              {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

              <button onClick={calculateConcrete} className="w-full py-4 mt-2 bg-stone-700 hover:bg-stone-800 text-white font-bold rounded-xl shadow-lg shadow-stone-600/30 transition-all flex items-center justify-center gap-2">
                 {t("calcConcrete")} <ArrowRightCircle size={18} />
              </button>
            </div>

            {/* RESULTS UI */}
            <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6 min-h-[300px]">
               {!results ? (
                 <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
                   <Calculator size={80} className="mb-4" strokeWidth={1} />
                   <p className="font-medium mt-2 max-w-[200px]">{t("waiting")}</p>
                 </div>
               ) : (
                 <div className="flex flex-col h-full space-y-4 animate-in fade-in zoom-in duration-300">
                    
                    <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-md flex-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 inline-block">{unit === "imperial" ? t("cubicYardsOut") : t("cubicMetersOut")}</span>
                      
                      <span className="text-6xl font-black text-stone-700 tracking-tighter">
                         {unit === "imperial" ? results.cubicYards.toFixed(2) : results.cubicMeters.toFixed(2)}
                      </span>
                      <span className="text-sm font-bold text-stone-400 mt-1">
                         {unit === "imperial" ? "yd³" : "m³"}
                      </span>
                    </div>

                    <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-center shadow-sm">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t("bagEst")}</span>
                       <div className="grid grid-cols-2 gap-4 w-full text-center">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                             <span className="text-2xl font-black text-slate-800 block">{results.bags80lb}</span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase">80 lb (36kg) {t("bagsWord")}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                             <span className="text-2xl font-black text-slate-800 block">{results.bags60lb}</span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase">60 lb (27kg) {t("bagsWord")}</span>
                          </div>
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
