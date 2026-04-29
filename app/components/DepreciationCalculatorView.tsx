"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

export const DepreciationCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("DepreciationCalculator");

  const [assetCost, setAssetCost] = useState(10000);
  const [salvageValue, setSalvageValue] = useState(1000);
  const [usefulLife, setUsefulLife] = useState(5);
  const [method, setMethod] = useState<"straight" | "declining" | "double" | "syd">("straight");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(val);
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
    const cost = Math.max(0, assetCost);
    const salvage = Math.max(0, salvageValue);
    const life = Math.max(1, usefulLife);
    const depreciableCost = Math.max(0, cost - salvage);

    const schedule = [];
    let currentBookValue = cost;
    let totalDepreciation = 0;

    let straightLineRate = 1 / life;
    let decliningRate = straightLineRate * 1.5; // 150% declining balance
    let doubleRate = straightLineRate * 2.0;

    const sydDenominator = (life * (life + 1)) / 2;

    for (let year = 1; year <= life; year++) {
      let depreciationThisYear = 0;

      if (method === "straight") {
        depreciationThisYear = depreciableCost / life;
      } else if (method === "declining") {
        depreciationThisYear = currentBookValue * decliningRate;
        if (currentBookValue - depreciationThisYear < salvage) {
          depreciationThisYear = currentBookValue - salvage;
        }
      } else if (method === "double") {
        depreciationThisYear = currentBookValue * doubleRate;
        if (currentBookValue - depreciationThisYear < salvage) {
          depreciationThisYear = currentBookValue - salvage;
        }
      } else if (method === "syd") {
        const remainingLife = life - year + 1;
        depreciationThisYear = depreciableCost * (remainingLife / sydDenominator);
      }

      currentBookValue -= depreciationThisYear;
      totalDepreciation += depreciationThisYear;

      schedule.push({
        year,
        depreciationExpense: depreciationThisYear,
        accumulatedDepreciation: totalDepreciation,
        bookValue: currentBookValue
      });
    }

    return {
      depreciableCost,
      totalDepreciation,
      schedule
    };
  }, [assetCost, salvageValue, usefulLife, method]);

  return (
    <div className="flex flex-col gap-12 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "DepreciationCalculator.title" ? t("title") : "Depreciation Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "DepreciationCalculator.desc" ? t("desc") : "Calculate asset depreciation over time."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("assetCost") !== "DepreciationCalculator.assetCost" ? t("assetCost") : "Asset Cost"}
              </label>
              <div className="relative w-48">
                <span className="absolute start-3 top-2 text-slate-500 font-medium">{cSym}</span>
                <input
                  type="number"
                  value={assetCost}
                  onChange={(e) => setAssetCost(Number(e.target.value))}
                  className="w-full ps-7 pe-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("salvageValue") !== "DepreciationCalculator.salvageValue" ? t("salvageValue") : "Salvage Value"}
              </label>
              <div className="relative w-48">
                <span className="absolute start-3 top-2 text-slate-500 font-medium">{cSym}</span>
                <input
                  type="number"
                  value={salvageValue}
                  onChange={(e) => setSalvageValue(Number(e.target.value))}
                  className="w-full ps-7 pe-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("usefulLife") !== "DepreciationCalculator.usefulLife" ? t("usefulLife") : "Useful Life (Years)"}
              </label>
              <div className="relative w-48">
                <input
                  type="number"
                  value={usefulLife}
                  min={1}
                  onChange={(e) => setUsefulLife(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("method") !== "DepreciationCalculator.method" ? t("method") : "Depreciation Method"}
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-48 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="straight">{t("straightLine") !== "DepreciationCalculator.straightLine" ? t("straightLine") : "Straight-Line"}</option>
                <option value="declining">{t("decliningBalance") !== "DepreciationCalculator.decliningBalance" ? t("decliningBalance") : "Declining Balance (150%)"}</option>
                <option value="double">{t("doubleDeclining") !== "DepreciationCalculator.doubleDeclining" ? t("doubleDeclining") : "Double Declining Balance"}</option>
                <option value="syd">{t("syd") !== "DepreciationCalculator.syd" ? t("syd") : "Sum of the Years' Digits"}</option>
              </select>
            </div>
            
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-6 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600 font-medium">
                {t("depreciableCost") !== "DepreciationCalculator.depreciableCost" ? t("depreciableCost") : "Depreciable Cost"}
              </span>
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(results.depreciableCost)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">
                {t("firstYearDepreciation") !== "DepreciationCalculator.firstYearDepreciation" ? t("firstYearDepreciation") : "Year 1 Depreciation"}
              </span>
              <span className="text-lg font-bold text-slate-900">
                {results.schedule.length > 0 ? formatCurrency(results.schedule[0].depreciationExpense) : "$0"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("scheduleTitle") !== "DepreciationCalculator.scheduleTitle" ? t("scheduleTitle") : "Depreciation Schedule"}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">{t("year") !== "DepreciationCalculator.year" ? t("year") : "Year"}</th>
                <th className="px-6 py-3 font-medium text-right">{t("depreciationExpense") !== "DepreciationCalculator.depreciationExpense" ? t("depreciationExpense") : "Depreciation Expense"}</th>
                <th className="px-6 py-3 font-medium text-right">{t("accumulated") !== "DepreciationCalculator.accumulated" ? t("accumulated") : "Accumulated Depreciation"}</th>
                <th className="px-6 py-3 font-medium text-right">{t("bookValue") !== "DepreciationCalculator.bookValue" ? t("bookValue") : "Book Value"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.schedule.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{row.year}</td>
                  <td className="px-6 py-4 text-right text-slate-700">{formatCurrency(row.depreciationExpense)}</td>
                  <td className="px-6 py-4 text-right text-slate-700">{formatCurrency(row.accumulatedDepreciation)}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">{formatCurrency(row.bookValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
