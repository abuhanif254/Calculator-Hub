"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { ArrowLeftRight, Ruler, Weight, Thermometer, Droplet, Calculator } from "lucide-react";

interface ConversionCalculatorViewProps {
  calcDef: CalculatorDef;
}

type CategoryType = "length" | "weight" | "temperature" | "volume";

const CONVERSION_RATES = {
  length: {
    base: "m",
    units: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.344
    }
  },
  weight: {
    base: "kg",
    units: {
      mg: 0.000001,
      g: 0.001,
      kg: 1,
      oz: 0.028349523125,
      lb: 0.45359237,
    }
  },
  volume: {
    base: "l",
    units: {
      ml: 0.001,
      l: 1,
      fl_oz: 0.0295735,
      cup: 0.236588,
      pt: 0.473176,
      qt: 0.946353,
      gal: 3.78541
    }
  }
};

export function ConversionCalculatorView({ calcDef }: ConversionCalculatorViewProps) {
  const t = useTranslations("ConversionCalculator");

  const [category, setCategory] = useState<CategoryType>("length");
  
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("ft");
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("");

  useEffect(() => {
    if (category === "length") { setFromUnit("m"); setToUnit("ft"); }
    if (category === "weight") { setFromUnit("kg"); setToUnit("lb"); }
    if (category === "temperature") { setFromUnit("c"); setToUnit("f"); }
    if (category === "volume") { setFromUnit("l"); setToUnit("gal"); }
  }, [category]);

  const updateConversion = (valueStr: string, isFrom: boolean) => {
    if (!valueStr || isNaN(Number(valueStr))) {
      if (isFrom) {
         setFromValue(valueStr);
         setToValue("");
      } else {
         setToValue(valueStr);
         setFromValue("");
      }
      return;
    }

    const val = parseFloat(valueStr);

    if (category === "temperature") {
      let tempC = 0;
      if (isFrom) {
         if (fromUnit === "c") tempC = val;
         else if (fromUnit === "f") tempC = (val - 32) * 5/9;
         else if (fromUnit === "k") tempC = val - 273.15;
         
         let result = 0;
         if (toUnit === "c") result = tempC;
         else if (toUnit === "f") result = (tempC * 9/5) + 32;
         else if (toUnit === "k") result = tempC + 273.15;

         setFromValue(valueStr);
         setToValue(result.toFixed(4).replace(/\.?0+$/, ''));
      } else {
         if (toUnit === "c") tempC = val;
         else if (toUnit === "f") tempC = (val - 32) * 5/9;
         else if (toUnit === "k") tempC = val - 273.15;

         let result = 0;
         if (fromUnit === "c") result = tempC;
         else if (fromUnit === "f") result = (tempC * 9/5) + 32;
         else if (fromUnit === "k") result = tempC + 273.15;

         setToValue(valueStr);
         setFromValue(result.toFixed(4).replace(/\.?0+$/, ''));
      }
    } else {
      const rates = CONVERSION_RATES[category as keyof typeof CONVERSION_RATES].units as Record<string, number>;
      if (isFrom) {
         const baseVal = val * rates[fromUnit];
         const resVal = baseVal / rates[toUnit];
         setFromValue(valueStr);
         setToValue(resVal.toPrecision(7).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1"));
      } else {
         const baseVal = val * rates[toUnit];
         const resVal = baseVal / rates[fromUnit];
         setToValue(valueStr);
         setFromValue(resVal.toPrecision(7).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1"));
      }
    }
  };

  useEffect(() => {
    updateConversion(fromValue, true);
   
  }, [fromUnit, toUnit, category]);

  const handleSwap = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    const tempVal = fromValue;
    setFromValue(toValue);
    setToValue(tempVal);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
            <ArrowLeftRight size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
         <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {[
               { id: "length", icon: Ruler, label: t("catLength") },
               { id: "weight", icon: Weight, label: t("catWeight") },
               { id: "temperature", icon: Thermometer, label: t("catTemp") },
               { id: "volume", icon: Droplet, label: t("catVolume") }
            ].map(cat => (
               <button 
                  key={cat.id}
                  onClick={() => setCategory(cat.id as CategoryType)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${category === cat.id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
               >
                  <cat.icon size={18} />
                  <span>{cat.label}</span>
               </button>
            ))}
         </div>

         <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200">
            
            <div className="flex-1 w-full space-y-4">
               <div className="relative">
                  <input 
                     type="number" 
                     value={fromValue}
                     onChange={(e) => updateConversion(e.target.value, true)}
                     className="w-full text-3xl font-bold text-slate-800 bg-white border-2 border-slate-200 rounded-2xl px-6 py-5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                  />
               </div>
               <select 
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full bg-slate-200 text-slate-700 font-bold px-4 py-3 rounded-xl outline-none border-r-8 border-transparent cursor-pointer hover:bg-slate-300 transition-colors"
               >
                  {category === "length" && (
                     <>
                        <option value="mm">{t("unit_mm")} (mm)</option>
                        <option value="cm">{t("unit_cm")} (cm)</option>
                        <option value="m">{t("unit_m")} (m)</option>
                        <option value="km">{t("unit_km")} (km)</option>
                        <option value="in">{t("unit_in")} (in)</option>
                        <option value="ft">{t("unit_ft")} (ft)</option>
                        <option value="yd">{t("unit_yd")} (yd)</option>
                        <option value="mi">{t("unit_mi")} (mi)</option>
                     </>
                  )}
                  {category === "weight" && (
                     <>
                        <option value="mg">{t("unit_mg")} (mg)</option>
                        <option value="g">{t("unit_g")} (g)</option>
                        <option value="kg">{t("unit_kg")} (kg)</option>
                        <option value="oz">{t("unit_oz")} (oz)</option>
                        <option value="lb">{t("unit_lb")} (lb)</option>
                     </>
                  )}
                  {category === "temperature" && (
                     <>
                        <option value="c">{t("unit_c")} (°C)</option>
                        <option value="f">{t("unit_f")} (°F)</option>
                        <option value="k">{t("unit_k")} (K)</option>
                     </>
                  )}
                  {category === "volume" && (
                     <>
                        <option value="ml">{t("unit_ml")} (mL)</option>
                        <option value="l">{t("unit_l")} (L)</option>
                        <option value="fl_oz">{t("unit_floz")} (fl oz)</option>
                        <option value="cup">{t("unit_cup")}</option>
                        <option value="pt">{t("unit_pt")} (pt)</option>
                        <option value="qt">{t("unit_qt")} (qt)</option>
                        <option value="gal">{t("unit_gal")} (gal)</option>
                     </>
                  )}
               </select>
            </div>

            <button 
               onClick={handleSwap}
               className="shrink-0 w-14 h-14 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 z-10"
            >
               <ArrowLeftRight size={24} />
            </button>

            <div className="flex-1 w-full space-y-4">
               <div className="relative">
                  <input 
                     type="number" 
                     value={toValue}
                     onChange={(e) => updateConversion(e.target.value, false)}
                     className="w-full text-3xl font-bold text-slate-800 bg-white border-2 border-slate-200 rounded-2xl px-6 py-5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                  />
               </div>
               <select 
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full bg-slate-200 text-slate-700 font-bold px-4 py-3 rounded-xl outline-none border-r-8 border-transparent cursor-pointer hover:bg-slate-300 transition-colors"
               >
                  {category === "length" && (
                     <>
                        <option value="mm">{t("unit_mm")} (mm)</option>
                        <option value="cm">{t("unit_cm")} (cm)</option>
                        <option value="m">{t("unit_m")} (m)</option>
                        <option value="km">{t("unit_km")} (km)</option>
                        <option value="in">{t("unit_in")} (in)</option>
                        <option value="ft">{t("unit_ft")} (ft)</option>
                        <option value="yd">{t("unit_yd")} (yd)</option>
                        <option value="mi">{t("unit_mi")} (mi)</option>
                     </>
                  )}
                  {category === "weight" && (
                     <>
                        <option value="mg">{t("unit_mg")} (mg)</option>
                        <option value="g">{t("unit_g")} (g)</option>
                        <option value="kg">{t("unit_kg")} (kg)</option>
                        <option value="oz">{t("unit_oz")} (oz)</option>
                        <option value="lb">{t("unit_lb")} (lb)</option>
                     </>
                  )}
                  {category === "temperature" && (
                     <>
                        <option value="c">{t("unit_c")} (°C)</option>
                        <option value="f">{t("unit_f")} (°F)</option>
                        <option value="k">{t("unit_k")} (K)</option>
                     </>
                  )}
                  {category === "volume" && (
                     <>
                        <option value="ml">{t("unit_ml")} (mL)</option>
                        <option value="l">{t("unit_l")} (L)</option>
                        <option value="fl_oz">{t("unit_floz")} (fl oz)</option>
                        <option value="cup">{t("unit_cup")}</option>
                        <option value="pt">{t("unit_pt")} (pt)</option>
                        <option value="qt">{t("unit_qt")} (qt)</option>
                        <option value="gal">{t("unit_gal")} (gal)</option>
                     </>
                  )}
               </select>
            </div>

         </div>
      </div>
    </div>
  );
}
