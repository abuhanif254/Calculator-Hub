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

  const result: BmiResult = calculateBmi(weightKg, heightCm);

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

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{t("title")}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t("weightPrm", { unit: unitSystem === 'metric' ? 'kg' : 'lbs' })}
            </label>
            <input 
              type="number" 
              value={displayWeight ? Math.round(displayWeight * 10) / 10 : ''}
              onChange={handleWeightChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
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
                    className="w-full ps-3 pe-10 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                  />
                  <span className="absolute end-3 top-2 text-slate-500">cm</span>
                </div>
             ) : (
                <div className="flex gap-4">
                  <div className="relative w-1/2">
                    <input 
                      type="number" 
                      value={displayFeet}
                      onChange={(e) => handleHeightImperialChange(Number(e.target.value), displayInches)}
                      className="w-full ps-3 pe-8 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                    />
                    <span className="absolute end-3 top-2 text-slate-500">ft</span>
                  </div>
                  <div className="relative w-1/2">
                    <input 
                      type="number" 
                      value={displayInches}
                      onChange={(e) => handleHeightImperialChange(displayFeet, Number(e.target.value))}
                      className="w-full ps-3 pe-8 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                    />
                    <span className="absolute end-3 top-2 text-slate-500">in</span>
                  </div>
                </div>
             )}
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
            <strong>{t("systemEngine")}:</strong> {t("systemDesc1")}{unitSystem === 'metric' ? t("metric") : t("imperial")}{t("systemDesc2")}
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
            <h3 className="text-lg font-semibold text-slate-600 mb-2">{t("yourBmi")}</h3>
            <div className="text-5xl font-extrabold text-blue-600 mb-2">
              {result.bmi > 0 ? result.bmi.toFixed(1) : '---'}
            </div>
            
            <div className={`px-4 py-1.5 rounded-full text-sm font-bold mb-6
               ${result.category === 'Normal weight' ? 'bg-green-100 text-green-700' : ''}
               ${result.category === 'Underweight' ? 'bg-yellow-100 text-yellow-700' : ''}
               ${result.category === 'Overweight' ? 'bg-orange-100 text-orange-700' : ''}
               ${result.category === 'Obesity' ? 'bg-red-100 text-red-700' : ''}
               ${result.category === 'Invalid input' ? 'hidden' : ''}
            `}>
              {getTranslatedCategory(result.category)}
            </div>

            {result.bmi > 0 && (
              <div className="text-sm text-slate-600 border-t border-slate-200 w-full pt-4 mt-2">
                {t("healthyWeightRange")}:<br/>
                <strong className="text-slate-800 text-base">
                  {formatWeightResult(result.healthyWeightRange.min)} - {formatWeightResult(result.healthyWeightRange.max)}
                </strong>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
