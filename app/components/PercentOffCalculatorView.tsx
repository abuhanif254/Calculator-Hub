"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

export const PercentOffCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("PercentOffCalculator");

  const [originalPrice, setOriginalPrice] = useState(100);
  const [discountPercent, setDiscountPercent] = useState(20);
  const [salesTax, setSalesTax] = useState(0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 }).format(val);
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
    const orig = isNaN(originalPrice) ? 0 : originalPrice;
    const discInput = isNaN(discountPercent) ? 0 : discountPercent;
    const discPct = discInput / 100;
    const taxInput = isNaN(salesTax) ? 0 : salesTax;
    const taxPct = taxInput / 100;

    const discountAmount = orig * discPct;
    const priceAfterDiscount = Math.max(0, orig - discountAmount);
    const taxAmount = priceAfterDiscount * taxPct;
    const finalPrice = priceAfterDiscount + taxAmount;

    return {
      discountAmount,
      priceAfterDiscount,
      taxAmount,
      finalPrice
    };
  }, [originalPrice, discountPercent, salesTax]);

  return (
    <div className="flex flex-col gap-10 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "PercentOffCalculator.title" ? t("title") : "Percent Off Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "PercentOffCalculator.desc" ? t("desc") : "Calculate the final price after a discount, including optional sales tax."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("originalPrice") !== "PercentOffCalculator.originalPrice" ? t("originalPrice") : "Original Price"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 border-t border-slate-100 pt-4">
              <label className="text-sm font-medium text-slate-700">
                {t("discountPercent") !== "PercentOffCalculator.discountPercent" ? t("discountPercent") : "Discount Percent (%)"}
              </label>
              <div className="relative flex items-center gap-3">
                <div className="relative flex-1">
                    <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full pe-8 ps-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 font-medium"
                    />
                    <span className="absolute end-3 top-2.5 text-slate-500">%</span>
                </div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={discountPercent} 
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600 mt-2" 
              />
              <div className="flex justify-between text-xs text-slate-400">
                 <span>0%</span>
                 <span>50%</span>
                 <span>100%</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1.5 border-t border-slate-100 pt-4">
              <label className="text-sm font-medium text-slate-700">
                {t("salesTax") !== "PercentOffCalculator.salesTax" ? t("salesTax") : "Sales Tax (%)"} <span className="text-slate-400 font-normal">({t("optional") !== "PercentOffCalculator.optional" ? t("optional") : "Optional"})</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={salesTax}
                  onChange={(e) => setSalesTax(Number(e.target.value))}
                  className="w-full pe-8 ps-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
                <span className="absolute end-3 top-2.5 text-slate-500">%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <span className="text-rose-800 font-medium mb-2 uppercase tracking-wide text-sm">
                {t("finalPrice") !== "PercentOffCalculator.finalPrice" ? t("finalPrice") : "Final Price"}
              </span>
              <span className="text-5xl font-bold text-rose-900 tracking-tight break-all">
                {formatCurrency(results.finalPrice)}
              </span>
              <span className="text-sm text-rose-600/80 mt-3 font-medium bg-rose-100/50 px-3 py-1 rounded-full">
                {t("youSave") !== "PercentOffCalculator.youSave" ? t("youSave") : "You save"}: {formatCurrency(results.discountAmount)}
              </span>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex-1">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                {t("breakdown") !== "PercentOffCalculator.breakdown" ? t("breakdown") : "Price Breakdown"}
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">{t("originalPrice") !== "PercentOffCalculator.originalPrice" ? t("originalPrice") : "Original Price"}:</span>
                  <span className="font-medium text-slate-900">{formatCurrency(isNaN(originalPrice) ? 0 : originalPrice)}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600">
                  <span className="text-sm">{t("discountAmount") !== "PercentOffCalculator.discountAmount" ? t("discountAmount") : "Discount Amount"} ({discountPercent}%):</span>
                  <span className="font-medium">-{formatCurrency(results.discountAmount)}</span>
                </div>
                
                <div className="flex justify-between items-center border-t border-slate-200 pt-2 opacity-75">
                  <span className="text-slate-600 text-sm">{t("priceBeforeTax") !== "PercentOffCalculator.priceBeforeTax" ? t("priceBeforeTax") : "Price Before Tax"}:</span>
                  <span className="font-medium text-slate-900">{formatCurrency(results.priceAfterDiscount)}</span>
                </div>
                
                {salesTax > 0 && (
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="text-sm">{t("taxAmount") !== "PercentOffCalculator.taxAmount" ? t("taxAmount") : "Tax Amount"} ({salesTax}%):</span>
                    <span className="font-medium">+{formatCurrency(results.taxAmount)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
