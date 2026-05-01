"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

export const CollegeCostCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("CollegeCostCalculator");

  const [yearsUntilCollege, setYearsUntilCollege] = useState(10);
  const [yearsInCollege, setYearsInCollege] = useState(4);
  const [currentTuition, setCurrentTuition] = useState(10000);
  const [currentRoomBoard, setCurrentRoomBoard] = useState(12000);
  const [currentOtherCosts, setCurrentOtherCosts] = useState(3000);
  const [inflationRate, setInflationRate] = useState(4);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(val);
  };

  const getCurrencySymbol = () => {
    try {
      const parts = new Intl.NumberFormat(locale, { style: "currency", currency }).formatToParts(0);
      return parts.find((p) => p.type === "currency")?.value || "$";
    } catch {
      return "$";
    }
  };
  const cSym = getCurrencySymbol();

  const results = useMemo(() => {
    const tuition = isNaN(currentTuition) ? 0 : currentTuition;
    const roomBoard = isNaN(currentRoomBoard) ? 0 : currentRoomBoard;
    const other = isNaN(currentOtherCosts) ? 0 : currentOtherCosts;
    const totalCurrentAnnual = tuition + roomBoard + other;

    const rate = (isNaN(inflationRate) ? 0 : inflationRate) / 100;
    const waitYears = isNaN(yearsUntilCollege) ? 0 : yearsUntilCollege;
    const collegeYears = isNaN(yearsInCollege) ? 0 : yearsInCollege;

    let totalProjectedCost = 0;
    const yearlyBreakdown = [];

    let costForCurrentYear = totalCurrentAnnual * Math.pow(1 + rate, waitYears);

    for (let i = 0; i < collegeYears; i++) {
        totalProjectedCost += costForCurrentYear;
        yearlyBreakdown.push({
            year: i + 1,
            cost: costForCurrentYear
        });
        costForCurrentYear *= (1 + rate);
    }

    return {
      totalCurrentAnnual,
      totalCurrentCost: totalCurrentAnnual * collegeYears,
      totalProjectedCost,
      yearlyBreakdown
    };
  }, [yearsUntilCollege, yearsInCollege, currentTuition, currentRoomBoard, currentOtherCosts, inflationRate]);

  return (
    <div className="flex flex-col gap-10 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "CollegeCostCalculator.title" ? t("title") : "College Cost Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "CollegeCostCalculator.desc" ? t("desc") : "Estimate the total future cost of a college education."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
               {t("timeline") !== "CollegeCostCalculator.timeline" ? t("timeline") : "Timeline"}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 leading-tight">
                    {t("yearsUntilCollege") !== "CollegeCostCalculator.yearsUntilCollege" ? t("yearsUntilCollege") : "Years Until College"}
                  </label>
                  <input
                    type="number"
                    value={yearsUntilCollege}
                    min={0}
                    onChange={(e) => setYearsUntilCollege(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 leading-tight">
                    {t("yearsInCollege") !== "CollegeCostCalculator.yearsInCollege" ? t("yearsInCollege") : "Years in College"}
                  </label>
                  <input
                    type="number"
                    value={yearsInCollege}
                    min={1}
                    max={10}
                    onChange={(e) => setYearsInCollege(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
            </div>

            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2 pt-2">
               {t("currentCosts") !== "CollegeCostCalculator.currentCosts" ? t("currentCosts") : "Current Annual Costs"}
            </h3>

             <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("currentTuition") !== "CollegeCostCalculator.currentTuition" ? t("currentTuition") : "Tuition & Fees (Annual)"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={currentTuition}
                  min={0}
                  onChange={(e) => setCurrentTuition(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("currentRoomBoard") !== "CollegeCostCalculator.currentRoomBoard" ? t("currentRoomBoard") : "Room & Board (Annual)"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={currentRoomBoard}
                  min={0}
                  onChange={(e) => setCurrentRoomBoard(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("currentOtherCosts") !== "CollegeCostCalculator.currentOtherCosts" ? t("currentOtherCosts") : "Books & Other Expenses (Annual)"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={currentOtherCosts}
                  min={0}
                  onChange={(e) => setCurrentOtherCosts(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2 pt-2">
               {t("inflation") !== "CollegeCostCalculator.inflation" ? t("inflation") : "Education Inflation"}
            </h3>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("inflationRate") !== "CollegeCostCalculator.inflationRate" ? t("inflationRate") : "Expected Annual Inflation Rate (%)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <span className="absolute end-3 top-2.5 text-slate-500">%</span>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <span className="text-amber-800 font-medium mb-1 uppercase tracking-wide text-sm">
                {t("projectedTotalCost") !== "CollegeCostCalculator.projectedTotalCost" ? t("projectedTotalCost") : "Total Projected Cost"}
              </span>
              <span className="text-4xl font-bold text-amber-900 tracking-tight">
                {formatCurrency(results.totalProjectedCost)}
              </span>
              <span className="text-sm text-amber-700/80 mt-2">
                 {t("forNumberYears") !== "CollegeCostCalculator.forNumberYears" ? t("forNumberYears") : "For"} {yearsInCollege} {t("yearsOfCollege") !== "CollegeCostCalculator.yearsOfCollege" ? t("yearsOfCollege") : "years of college"}
              </span>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex-1">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                {t("yearlyBreakdown") !== "CollegeCostCalculator.yearlyBreakdown" ? t("yearlyBreakdown") : "Projected Yearly Cost"}
              </h3>
              
              <div className="flex flex-col gap-2 mt-4">
                  {results.yearlyBreakdown.map((item) => (
                      <div key={item.year} className="flex justify-between items-center text-sm p-2 bg-white rounded border border-slate-100">
                          <span className="text-slate-600 font-medium">{t("yearLabel") !== "CollegeCostCalculator.yearLabel" ? t("yearLabel") : "Year"} {item.year}:</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(item.cost)}</span>
                      </div>
                  ))}
                  
                  <div className="mt-4 pt-3 border-t border-slate-200">
                      <div className="flex justify-between items-center text-sm text-slate-500 italic">
                          <span>{t("currentCostEquivalent") !== "CollegeCostCalculator.currentCostEquivalent" ? t("currentCostEquivalent") : "If college started today:"}</span>
                          <span>{formatCurrency(results.totalCurrentCost)}</span>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
