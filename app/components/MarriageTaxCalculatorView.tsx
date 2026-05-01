"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

// 2024 US Federal Tax Brackets for generalized estimation
const SINGLE_BRACKETS = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];
const SINGLE_STD_DED = 14600;

const MARRIED_JOINT_BRACKETS = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 760400, rate: 0.35 },
  { min: 760400, max: Infinity, rate: 0.37 },
];
const MARRIED_JOINT_STD_DED = 29200;

const calculateTax = (income: number, deductions: number, brackets: { min: number, max: number, rate: number }[]) => {
    let taxableIncome = Math.max(0, income - deductions);
    let tax = 0;
    for (const b of brackets) {
       if (taxableIncome > b.min) {
           const taxableAtThisBracket = Math.min(taxableIncome, b.max) - b.min;
           tax += taxableAtThisBracket * b.rate;
       }
    }
    return tax;
};

export const MarriageTaxCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("MarriageTaxCalculator");

  const [partner1Income, setPartner1Income] = useState(80000);
  const [partner2Income, setPartner2Income] = useState(70000);

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
    const p1 = isNaN(partner1Income) ? 0 : partner1Income;
    const p2 = isNaN(partner2Income) ? 0 : partner2Income;
    const jointIncome = p1 + p2;

    const p1Tax = calculateTax(p1, SINGLE_STD_DED, SINGLE_BRACKETS);
    const p2Tax = calculateTax(p2, SINGLE_STD_DED, SINGLE_BRACKETS);
    const totalSingleTax = p1Tax + p2Tax;

    const jointTax = calculateTax(jointIncome, MARRIED_JOINT_STD_DED, MARRIED_JOINT_BRACKETS);

    const difference = jointTax - totalSingleTax;
    const isPenalty = difference > 0;
    const isBonus = difference < 0;
    
    return {
      p1Tax,
      p2Tax,
      totalSingleTax,
      jointTax,
      difference: Math.abs(difference),
      isPenalty,
      isBonus,
      jointIncome,
      p1EffectiveRate: p1 > 0 ? (p1Tax / p1) * 100 : 0,
      p2EffectiveRate: p2 > 0 ? (p2Tax / p2) * 100 : 0,
      singleEffectiveRate: jointIncome > 0 ? (totalSingleTax / jointIncome) * 100 : 0,
      jointEffectiveRate: jointIncome > 0 ? (jointTax / jointIncome) * 100 : 0
    };
  }, [partner1Income, partner2Income]);

  return (
    <div className="flex flex-col gap-10 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "MarriageTaxCalculator.title" ? t("title") : "Marriage Tax Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "MarriageTaxCalculator.desc" ? t("desc") : "Estimate if filing jointly yields a tax bonus or penalty."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
               {t("incomeInput") !== "MarriageTaxCalculator.incomeInput" ? t("incomeInput") : "Annual Incomes"}
            </h3>
            
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("partner1Income") !== "MarriageTaxCalculator.partner1Income" ? t("partner1Income") : "Partner 1 Income"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={partner1Income}
                  min={0}
                  onChange={(e) => setPartner1Income(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("partner2Income") !== "MarriageTaxCalculator.partner2Income" ? t("partner2Income") : "Partner 2 Income"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={partner2Income}
                  min={0}
                  onChange={(e) => setPartner2Income(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            
            <div className="bg-blue-50/50 p-4 border border-blue-100 rounded-lg text-sm text-slate-600">
              <p>{t("disclaimer") !== "MarriageTaxCalculator.disclaimer" ? t("disclaimer") : "Note: This is an estimation based on generalized progressive tax brackets (simulating US 2024 standards). Real-world outcomes may vary based on exact tax codes, local state taxes, and other deductions."}</p>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
               <h3 className="text-sm font-semibold text-slate-800 mb-3">{t("totalIncome") !== "MarriageTaxCalculator.totalIncome" ? t("totalIncome") : "Combined Total Income"}</h3>
               <span className="text-2xl font-bold text-slate-900">{formatCurrency(results.jointIncome)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className={`border rounded-xl p-8 flex flex-col items-center justify-center text-center ${results.isBonus ? 'bg-emerald-50 border-emerald-200' : results.isPenalty ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`font-medium mb-2 uppercase tracking-wide text-sm ${results.isBonus ? 'text-emerald-800' : results.isPenalty ? 'text-rose-800' : 'text-slate-800'}`}>
                {results.isBonus ? (t("marriageBonus") !== "MarriageTaxCalculator.marriageBonus" ? t("marriageBonus") : "Marriage Bonus") : results.isPenalty ? (t("marriagePenalty") !== "MarriageTaxCalculator.marriagePenalty" ? t("marriagePenalty") : "Marriage Penalty") : (t("neutral") !== "MarriageTaxCalculator.neutral" ? t("neutral") : "No Difference")}
              </span>
              <span className={`text-5xl font-bold tracking-tight ${results.isBonus ? 'text-emerald-900' : results.isPenalty ? 'text-rose-900' : 'text-slate-900'}`}>
                {formatCurrency(results.difference)}
              </span>
              <span className={`text-sm mt-3 px-3 py-1 rounded-full ${results.isBonus ? 'text-emerald-700 bg-emerald-100/50' : results.isPenalty ? 'text-rose-700 bg-rose-100/50' : 'text-slate-600 bg-slate-200/50'}`}>
                {results.isBonus 
                    ? (t("bonusDesc") !== "MarriageTaxCalculator.bonusDesc" ? t("bonusDesc") : "Filing jointly saves you money compared to filing single.") 
                    : results.isPenalty 
                        ? (t("penaltyDesc") !== "MarriageTaxCalculator.penaltyDesc" ? t("penaltyDesc") : "Filing jointly costs more than filing separately as singles.") 
                        : (t("neutralDesc") !== "MarriageTaxCalculator.neutralDesc" ? t("neutralDesc") : "There is no tax difference.")}
              </span>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex-1">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                {t("taxComparison") !== "MarriageTaxCalculator.taxComparison" ? t("taxComparison") : "Tax Comparison"}
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col gap-1 p-3 bg-white border border-slate-200 rounded-lg text-center">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("filingSingle") !== "MarriageTaxCalculator.filingSingle" ? t("filingSingle") : "If Filing Single (Combined)"}</span>
                      <span className="text-xl font-bold text-slate-800">{formatCurrency(results.totalSingleTax)}</span>
                      <span className="text-xs text-slate-400">{results.singleEffectiveRate.toFixed(1)}% {t("effectiveRate") !== "MarriageTaxCalculator.effectiveRate" ? t("effectiveRate") : "effective rate"}</span>
                  </div>
                  <div className="flex flex-col gap-1 p-3 bg-white border border-slate-200 rounded-lg text-center">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("filingJointly") !== "MarriageTaxCalculator.filingJointly" ? t("filingJointly") : "If Filing Jointly"}</span>
                      <span className="text-xl font-bold text-slate-800">{formatCurrency(results.jointTax)}</span>
                      <span className="text-xs text-slate-400">{results.jointEffectiveRate.toFixed(1)}% {t("effectiveRate") !== "MarriageTaxCalculator.effectiveRate" ? t("effectiveRate") : "effective rate"}</span>
                  </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-200">
                  <h4 className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">{t("singleBreakdown") !== "MarriageTaxCalculator.singleBreakdown" ? t("singleBreakdown") : "Single Filing Breakdown"}</h4>
                  <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-slate-600">Partner 1 Tax:</span>
                      <span className="font-medium text-slate-800">{formatCurrency(results.p1Tax)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Partner 2 Tax:</span>
                      <span className="font-medium text-slate-800">{formatCurrency(results.p2Tax)}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
