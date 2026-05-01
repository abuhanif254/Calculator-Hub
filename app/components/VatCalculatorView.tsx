"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

export const VatCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("VatCalculator");

  const [calcType, setCalcType] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState(100);
  const [vatRate, setVatRate] = useState(20);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
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
    const p = isNaN(amount) ? 0 : amount;
    const rate = isNaN(vatRate) ? 0 : vatRate;
    
    let netAmount = 0;
    let vatAmount = 0;
    let grossAmount = 0;

    if (calcType === "add") {
      netAmount = p;
      vatAmount = p * (rate / 100);
      grossAmount = netAmount + vatAmount;
    } else { // remove
      grossAmount = p;
      netAmount = p / (1 + (rate / 100));
      vatAmount = grossAmount - netAmount;
    }

    return {
      netAmount,
      vatAmount,
      grossAmount
    };
  }, [calcType, amount, vatRate]);

  return (
    <div className="flex flex-col gap-10 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "VatCalculator.title" ? t("title") : "VAT Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "VatCalculator.desc" ? t("desc") : "Calculate Value Added Tax (VAT) by adding it to a net amount or extracting it from a gross amount."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            
            <div className="flex flex-col space-y-1.5 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <label className="text-sm font-semibold text-slate-800 mb-2">
                {t("calculationType") !== "VatCalculator.calculationType" ? t("calculationType") : "What do you want to do?"}
              </label>
              <div className="flex flex-col gap-3">
                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg bg-white hover:bg-blue-50 transition-colors border-slate-200">
                  <input 
                    type="radio" 
                    checked={calcType === "add"} 
                    onChange={() => setCalcType("add")} 
                    className="text-blue-600 focus:ring-blue-500 mt-0.5"
                  />
                  <div>
                      <span className="text-sm font-medium text-slate-800 block">{t("addVatTitle") !== "VatCalculator.addVatTitle" ? t("addVatTitle") : "Add VAT"}</span>
                      <span className="text-xs text-slate-500 block">{t("addVatDesc") !== "VatCalculator.addVatDesc" ? t("addVatDesc") : "I have the net amount (before tax) and need the final price."}</span>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg bg-white hover:bg-blue-50 transition-colors border-slate-200">
                  <input 
                    type="radio" 
                    checked={calcType === "remove"} 
                    onChange={() => setCalcType("remove")}
                    className="text-blue-600 focus:ring-blue-500 mt-0.5"
                  />
                  <div>
                      <span className="text-sm font-medium text-slate-800 block">{t("removeVatTitle") !== "VatCalculator.removeVatTitle" ? t("removeVatTitle") : "Remove VAT"}</span>
                      <span className="text-xs text-slate-500 block">{t("removeVatDesc") !== "VatCalculator.removeVatDesc" ? t("removeVatDesc") : "I have the gross amount (after tax) and need to find the base price."}</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {calcType === "add" ? (t("amountNet") !== "VatCalculator.amountNet" ? t("amountNet") : "Net Amount (Price without VAT)") : (t("amountGross") !== "VatCalculator.amountGross" ? t("amountGross") : "Gross Amount (Price with VAT)")}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={amount}
                  min={0}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 pt-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-700">
                  {t("vatRate") !== "VatCalculator.vatRate" ? t("vatRate") : "VAT Rate (%)"}
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                />
                <span className="absolute end-3 top-2.5 text-slate-500">%</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
                {[5, 10, 15, 20, 21, 23, 25].map((rate) => (
                    <button 
                       key={rate} 
                       onClick={() => setVatRate(rate)}
                       className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-full transition-colors border border-slate-200 font-medium"
                    >
                        {rate}%
                    </button>
                ))}
            </div>

          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4">
                
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 flex flex-col justify-center text-center relative overflow-hidden">
                   <div className="absolute top-0 w-full h-1 bg-indigo-500 left-0"></div>
                  <span className="text-indigo-800 font-semibold mb-1 text-sm uppercase tracking-wider">
                    {calcType === 'add' ? (t("totalGross") !== "VatCalculator.totalGross" ? t("totalGross") : "Gross Amount (Total Price)") : (t("totalNet") !== "VatCalculator.totalNet" ? t("totalNet") : "Net Amount (Base Price)")}
                  </span>
                  <span className="text-4xl font-bold text-indigo-900 tracking-tight">
                    {calcType === 'add' ? formatCurrency(results.grossAmount) : formatCurrency(results.netAmount)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-center text-center shadow-sm">
                      <span className="text-slate-500 font-medium mb-1 text-sm">
                         {calcType === 'add' ? (t("originalNet") !== "VatCalculator.originalNet" ? t("originalNet") : "Net Amount") : (t("originalGross") !== "VatCalculator.originalGross" ? t("originalGross") : "Gross Amount")}
                      </span>
                      <span className="text-xl font-bold text-slate-800">
                        {calcType === 'add' ? formatCurrency(results.netAmount) : formatCurrency(results.grossAmount)}
                      </span>
                    </div>

                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 flex flex-col justify-center text-center shadow-sm">
                      <span className="text-rose-700 font-medium mb-1 text-sm">
                        {t("vatAmount") !== "VatCalculator.vatAmount" ? t("vatAmount") : "VAT Amount"}
                      </span>
                      <span className="text-xl font-bold text-rose-800">
                        {formatCurrency(results.vatAmount)}
                      </span>
                    </div>
                </div>
                
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                {t("breakdown") !== "VatCalculator.breakdown" ? t("breakdown") : "Visual Breakdown"}
              </h3>
              
              <div className="w-full bg-slate-200 rounded-full h-8 overflow-hidden flex mt-2 shadow-inner">
                  <div 
                      className="bg-slate-500 h-full flex items-center justify-center text-xs font-bold text-white transition-all duration-500" 
                      style={{ width: `${(results.netAmount / results.grossAmount) * 100}%` }}
                      title="Net Amount"
                  >
                      {results.grossAmount > 0 && ((results.netAmount / results.grossAmount) * 100) > 15 ? "Base Price" : ""}
                  </div>
                  <div 
                      className="bg-rose-500 h-full flex items-center justify-center text-xs font-bold text-white transition-all duration-500" 
                      style={{ width: `${(results.vatAmount / results.grossAmount) * 100}%` }}
                      title="VAT Amount"
                  >
                        {results.grossAmount > 0 && ((results.vatAmount / results.grossAmount) * 100) > 15 ? "Tax" : ""}
                  </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
                  <span>{formatCurrency(results.netAmount)} (Net)</span>
                  <span className="text-rose-600">+{formatCurrency(results.vatAmount)} (VAT)</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
