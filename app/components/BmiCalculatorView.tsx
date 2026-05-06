"use client";

import React, { useState } from "react";
import { calculateBmi, BmiResult } from "../../lib/formulas/health";
import { useSettings } from "../context/SettingsContext";
import { CalculatorDef } from "../../lib/types";
import { useTranslations } from "next-intl";

// Helper conversions
const kgToLbs = (kg: number) => kg * 2.20462;
const lbsToKg = (lbs: number) => lbs / 2.20462;
const cmToInches = (cm: number) => cm / 2.54;
const inchesToCm = (inches: number) => inches * 2.54;

export const BmiCalculatorView: React.FC<{ calcDef: CalculatorDef }> = ({ calcDef }) => {
  const { unitSystem } = useSettings();
  const t = useTranslations("BmiCalculator");

  // Internal state always stores metric (kg and cm)
  const [weightKg, setWeightKg] = useState(70); 
  const [heightCm, setHeightCm] = useState(175); 
  const [age, setAge] = useState<number | ''>(25);
  const [gender, setGender] = useState<"male" | "female">("male");

  // Handle Input Changes correctly parsing conversions back to metric state
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (unitSystem === 'metric') {
      setWeightKg(val);
    } else {
      setWeightKg(lbsToKg(val));
    }
  };

  const handleHeightImperialChange = (feet: number, inches: number) => {
    const totalInches = (feet * 12) + inches;
    setHeightCm(inchesToCm(totalInches));
  };

  const handleHeightMetricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeightCm(Number(e.target.value));
  };

  // Convert for display
  const displayWeight = unitSystem === 'metric' ? weightKg : kgToLbs(weightKg);
  const totalInches = cmToInches(heightCm);
  const displayFeet = Math.floor(totalInches / 12);
  const displayInches = Math.round(totalInches % 12);

  const result: BmiResult = calculateBmi(
    weightKg, 
    heightCm, 
    typeof age === 'number' ? age : undefined, 
    gender
  );

  // Format Results
  const formatWeightResult = (kg: number) => {
    if (unitSystem === 'metric') return `${kg.toFixed(1)} kg`;
    return `${kgToLbs(kg).toFixed(1)} lbs`;
  };

  const getTranslatedCategory = (category: string) => {
    switch (category) {
      case 'Normal weight': return t("normalWeight");
      case 'Underweight': return t("underweight");
      case 'Overweight': return t("overweight");
      case 'Obesity': return t("obesity");
      default: return t("invalidInput");
    }
  };

  // Gauge calculation (Mapping BMI 10 to 45 to 0-100%)
  const gaugeMin = 10;
  const gaugeMax = 45;
  const clampedBmi = Math.max(gaugeMin, Math.min(gaugeMax, result.bmi));
  const pointerPosition = ((clampedBmi - gaugeMin) / (gaugeMax - gaugeMin)) * 100;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{t("title")}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("age")}
              </label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
                min="2"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("gender")}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as "male" | "female")}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white"
              >
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t("weightPrm", { unit: unitSystem === 'metric' ? 'kg' : 'lbs' })}
            </label>
            <input 
              type="number" 
              value={displayWeight ? Math.round(displayWeight * 10) / 10 : ''}
              onChange={handleWeightChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">{t("height")}</label>
             {unitSystem === 'metric' ? (
                <div className="relative">
                  <input 
                    type="number" 
                    value={heightCm ? Math.round(heightCm) : ''}
                    onChange={handleHeightMetricChange}
                    className="w-full ps-3 pe-10 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
                  />
                  <span className="absolute end-4 top-2.5 text-slate-500 text-sm">cm</span>
                </div>
             ) : (
                <div className="flex gap-4">
                  <div className="relative w-1/2">
                    <input 
                      type="number" 
                      value={displayFeet}
                      onChange={(e) => handleHeightImperialChange(Number(e.target.value), displayInches)}
                      className="w-full ps-3 pe-8 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
                    />
                    <span className="absolute end-3 top-2.5 text-slate-500 text-sm">ft</span>
                  </div>
                  <div className="relative w-1/2">
                    <input 
                      type="number" 
                      value={displayInches}
                      onChange={(e) => handleHeightImperialChange(displayFeet, Number(e.target.value))}
                      className="w-full ps-3 pe-8 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
                    />
                    <span className="absolute end-3 top-2.5 text-slate-500 text-sm">in</span>
                  </div>
                </div>
             )}
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800 leading-relaxed shadow-sm">
            <strong>{t("systemEngine")}:</strong> {t("systemDesc1")}<span className="underline decoration-blue-300 underline-offset-2">{unitSystem === 'metric' ? t("metric") : t("imperial")}</span>{t("systemDesc2")}
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-inner flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-50"></div>
              
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{t("yourBmi")}</h3>
              <div className="text-6xl md:text-7xl font-black text-slate-800 mb-4 tracking-tighter drop-shadow-sm">
                {result.bmi > 0 ? result.bmi.toFixed(1) : '---'}
              </div>
              
              <div className={`px-6 py-2 rounded-full text-sm md:text-base font-bold shadow-sm mb-10 transition-colors
                 ${result.category === 'Normal weight' ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200' : ''}
                 ${result.category === 'Underweight' ? 'bg-sky-100 text-sky-800 ring-1 ring-sky-200' : ''}
                 ${result.category === 'Overweight' ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-200' : ''}
                 ${result.category === 'Obesity' ? 'bg-rose-100 text-rose-800 ring-1 ring-rose-200' : ''}
                 ${result.category === 'Invalid input' ? 'hidden' : ''}
              `}>
                {getTranslatedCategory(result.category)}
              </div>

              {/* BMI Gauge */}
              {result.bmi > 0 && (
                <div className="w-full max-w-lg mb-8 relative">
                  <div className="flex h-3 md:h-4 w-full rounded-full overflow-hidden shadow-inner bg-slate-200">
                    <div className="bg-sky-400 h-full" style={{ width: '24.28%' }} title="Underweight (<18.5)"></div> {/* (18.5-10)/35 */}
                    <div className="bg-emerald-400 h-full" style={{ width: '18.57%' }} title="Normal (18.5-25)"></div> {/* (25-18.5)/35 */}
                    <div className="bg-amber-400 h-full" style={{ width: '14.28%' }} title="Overweight (25-30)"></div> {/* (30-25)/35 */}
                    <div className="bg-rose-400 h-full" style={{ width: '42.87%' }} title="Obese (>30)"></div> {/* (45-30)/35 */}
                  </div>
                  
                  {/* Gauge Pointer */}
                  <div 
                    className="absolute top-0 -mt-2 md:-mt-3 flex flex-col items-center justify-center transition-all duration-700 ease-out"
                    style={{ left: `calc(${pointerPosition}% - 12px)` }}
                  >
                     <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-slate-800"></div>
                     <div className="w-1 h-5 md:h-6 bg-slate-800 rounded-b-md shadow-md"></div>
                  </div>
                  
                  <div className="flex justify-between text-[10px] md:text-xs font-semibold text-slate-400 mt-3 px-1">
                    <span>10</span>
                    <span className="ml-[12%]">18.5</span>
                    <span className="ml-[6%]">25</span>
                    <span className="ml-[5%]">30</span>
                    <span>45+</span>
                  </div>
                </div>
              )}

              {result.bmi > 0 && (
                <div className="pt-6 mt-2 w-full border-t border-slate-200/60 max-w-md mx-auto">
                  <span className="text-slate-500 text-sm md:text-base block mb-1">
                    {t("healthyWeightRange")}:
                  </span>
                  <span className="text-slate-800 text-lg md:text-xl font-bold bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm inline-block">
                    {formatWeightResult(result.healthyWeightRange.min)} - {formatWeightResult(result.healthyWeightRange.max)}
                  </span>
                </div>
              )}
          </div>

          {/* Advanced Stats Row */}
          {result.bmi > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t("bfp")}</div>
                  <div className="text-2xl font-black text-slate-700">
                    {result.bodyFatPercentage ? `${result.bodyFatPercentage.toFixed(1)}%` : '---'}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t("ponderalIndex")}</div>
                  <div className="text-2xl font-black text-slate-700">
                    {result.ponderalIndex ? `${result.ponderalIndex.toFixed(2)}` : '---'} <span className="text-sm font-normal text-slate-400">kg/m³</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center text-violet-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

