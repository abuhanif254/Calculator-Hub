"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

export const AnnuityCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("AnnuityCalculator");

  const [paymentAmount, setPaymentAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(5);
  const [periods, setPeriods] = useState(10);
  const [paymentTiming, setPaymentTiming] = useState<"end" | "beginning">("end");

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
    const rate = interestRate / 100;
    const n = periods;
    const pmt = paymentAmount;

    let pv = 0;
    let fv = 0;

    if (rate === 0) {
      pv = pmt * n;
      fv = pmt * n;
    } else {
      // Ordinary Annuity (End of Period)
      pv = pmt * ((1 - Math.pow(1 + rate, -n)) / rate);
      fv = pmt * ((Math.pow(1 + rate, n) - 1) / rate);

      // Annuity Due (Beginning of Period)
      if (paymentTiming === "beginning") {
        pv = pv * (1 + rate);
        fv = fv * (1 + rate);
      }
    }

    const totalPrincipal = pmt * n;

    return {
      presentValue: pv,
      futureValue: fv,
      totalPrincipal
    };
  }, [paymentAmount, interestRate, periods, paymentTiming]);

  return (
    <div className="flex flex-col gap-10 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "AnnuityCalculator.title" ? t("title") : "Annuity Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "AnnuityCalculator.desc" ? t("desc") : "Calculate Present and Future Value of regular payments."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("paymentAmount") !== "AnnuityCalculator.paymentAmount" ? t("paymentAmount") : "Payment Amount (per period)"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("interestRate") !== "AnnuityCalculator.interestRate" ? t("interestRate") : "Interest Rate (per period %)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="absolute end-3 top-2.5 text-slate-500">%</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("periods") !== "AnnuityCalculator.periods" ? t("periods") : "Number of Periods"}
              </label>
              <input
                type="number"
                value={periods}
                min={1}
                onChange={(e) => setPeriods(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex flex-col space-y-1.5 bg-slate-50 p-4 rounded-lg border border-slate-200 mt-2">
              <label className="text-sm font-medium text-slate-700">
                {t("paymentTiming") !== "AnnuityCalculator.paymentTiming" ? t("paymentTiming") : "Payment Timing"}
              </label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={paymentTiming === "end"} 
                    onChange={() => setPaymentTiming("end")} 
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{t("endOfPeriod") !== "AnnuityCalculator.endOfPeriod" ? t("endOfPeriod") : "End of Period (Ordinary)"}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={paymentTiming === "beginning"} 
                    onChange={() => setPaymentTiming("beginning")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{t("beginningOfPeriod") !== "AnnuityCalculator.beginningOfPeriod" ? t("beginningOfPeriod") : "Beginning of Period (Due)"}</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <span className="text-emerald-800 font-medium mb-2 uppercase tracking-wide text-sm">
                {t("futureValue") !== "AnnuityCalculator.futureValue" ? t("futureValue") : "Future Value"}
              </span>
              <span className="text-4xl font-bold text-emerald-900 tracking-tight break-all">
                {formatCurrency(results.futureValue)}
              </span>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <span className="text-blue-800 font-medium mb-2 uppercase tracking-wide text-sm">
                {t("presentValue") !== "AnnuityCalculator.presentValue" ? t("presentValue") : "Present Value"}
              </span>
              <span className="text-4xl font-bold text-blue-900 tracking-tight break-all">
                {formatCurrency(results.presentValue)}
              </span>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex-1">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                {t("breakdown") !== "AnnuityCalculator.breakdown" ? t("breakdown") : "Breakdown"}
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{t("totalPrincipal") !== "AnnuityCalculator.totalPrincipal" ? t("totalPrincipal") : "Total Principal Paid"}:</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(results.totalPrincipal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{t("totalInterestEarned") !== "AnnuityCalculator.totalInterestEarned" ? t("totalInterestEarned") : "Total Interest (Future Growth)"}:</span>
                  <span className="font-medium text-emerald-700">+{formatCurrency(results.futureValue - results.totalPrincipal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
