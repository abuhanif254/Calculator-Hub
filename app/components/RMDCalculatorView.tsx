"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

const rmdFactors: Record<number, number> = {
  73: 26.5,
  74: 25.5,
  75: 24.6,
  76: 23.7,
  77: 22.9,
  78: 22.0,
  79: 21.1,
  80: 20.2,
  81: 19.4,
  82: 18.5,
  83: 17.7,
  84: 16.8,
  85: 16.0,
  86: 15.2,
  87: 14.4,
  88: 13.7,
  89: 12.9,
  90: 12.2,
  91: 11.5,
  92: 10.8,
  93: 10.1,
  94: 9.5,
  95: 8.9,
  96: 8.4,
  97: 7.8,
  98: 7.3,
  99: 6.8,
  100: 6.4,
  101: 6.0,
  102: 5.6,
  103: 5.2,
  104: 4.9,
  105: 4.6,
  106: 4.3,
  107: 4.1,
  108: 3.9,
  109: 3.7,
  110: 3.5,
  111: 3.4,
  112: 3.3,
  113: 3.1,
  114: 3.0,
  115: 2.9,
  116: 2.8,
  117: 2.7,
  118: 2.5,
  119: 2.3,
  120: 2.0,
};

export const RMDCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("RMDCalculator");

  const [age, setAge] = useState(73);
  const [balance, setBalance] = useState(100000);

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
    let factor = rmdFactors[age];
    if (!factor) {
      if (age < 73) factor = rmdFactors[73] + (73 - age); // Estimate for ages below 73
      else factor = 2.0; // Estimate for > 120
    }

    const rmd = balance / factor;
    const remainingBalance = balance - rmd;

    return {
      rmd,
      factor,
      remainingBalance,
    };
  }, [age, balance]);

  return (
    <div className="flex flex-col gap-12 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "RMDCalculator.title" ? t("title") : "RMD Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "RMDCalculator.desc" ? t("desc") : "Calculate your Required Minimum Distribution (RMD) from retirement accounts."}
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("currentAge") !== "RMDCalculator.currentAge" ? t("currentAge") : "Current Age"}
              </label>
              <div className="relative w-48">
                <input
                  type="number"
                  value={age}
                  min={70}
                  max={120}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("accountBalance") !== "RMDCalculator.accountBalance" ? t("accountBalance") : "Account Balance"}
              </label>
              <div className="relative w-48">
                <span className="absolute start-3 top-2 text-slate-500 font-medium">{cSym}</span>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full ps-7 pe-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-6 text-sm text-slate-500 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p>
                {t("disclaimer") !== "RMDCalculator.disclaimer" ? t("disclaimer") : "Note: This calculator uses the standard IRS Uniform Lifetime Table (typically for unmarried owners, or owners whose spouse is not more than 10 years younger). Consult a qualified tax professional to ensure compliance with current laws."}
              </p>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-6 flex flex-col justify-center">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600 font-medium">
                {t("requiredDistribution") !== "RMDCalculator.requiredDistribution" ? t("requiredDistribution") : "Required Distribution (RMD)"}
              </span>
              <span className="text-3xl font-bold text-slate-900">{formatCurrency(results.rmd)}</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600 font-medium">
                {t("lifeExpectancyFactor") !== "RMDCalculator.lifeExpectancyFactor" ? t("lifeExpectancyFactor") : "Life Expectancy Factor"}
              </span>
              <span className="text-lg font-bold text-slate-900">{results.factor.toFixed(1)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">
                {t("balanceAfterRmd") !== "RMDCalculator.balanceAfterRmd" ? t("balanceAfterRmd") : "Balance After RMD"}
              </span>
              <span className="text-lg font-bold text-slate-900">{formatCurrency(results.remainingBalance)}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
