"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

export const PresentValueCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("PresentValueCalculator");

  const [futureValue, setFutureValue] = useState(10000);
  const [periodicPayment, setPeriodicPayment] = useState(0);
  const [discountRate, setDiscountRate] = useState(5);
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
    const rate = discountRate / 100;
    
    // Present Value of Future Value: PV = FV / (1 + r)^n
    let pvFromFV = 0;
    if (futureValue > 0) {
      if (rate === 0) {
        pvFromFV = futureValue;
      } else {
        pvFromFV = futureValue / Math.pow(1 + rate, periods);
      }
    }

    // Present Value of Annuity (Periodic Payments)
    let pvFromPMT = 0;
    if (periodicPayment > 0) {
      if (rate === 0) {
        pvFromPMT = periodicPayment * periods;
      } else {
        pvFromPMT = periodicPayment * ((1 - Math.pow(1 + rate, -periods)) / rate);
        if (paymentTiming === "beginning") {
          pvFromPMT = pvFromPMT * (1 + rate);
        }
      }
    }

    const totalPV = pvFromFV + pvFromPMT;

    return {
      pvFromFV,
      pvFromPMT,
      totalPV
    };
  }, [futureValue, periodicPayment, discountRate, periods, paymentTiming]);

  return (
    <div className="flex flex-col gap-10 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "PresentValueCalculator.title" ? t("title") : "Present Value Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "PresentValueCalculator.desc" ? t("desc") : "Calculate the present value of a future sum or cash flows."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("futureValue") !== "PresentValueCalculator.futureValue" ? t("futureValue") : "Future Value (FV)"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={futureValue}
                  onChange={(e) => setFutureValue(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("periodicPayment") !== "PresentValueCalculator.periodicPayment" ? t("periodicPayment") : "Periodic Payment (PMT)"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={periodicPayment}
                  onChange={(e) => setPeriodicPayment(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <span className="text-xs text-slate-500">
                {t("pmtHelp") !== "PresentValueCalculator.pmtHelp" ? t("pmtHelp") : "Optional. Regular payment received each period."}
              </span>
            </div>
            
            {periodicPayment > 0 && (
              <div className="flex flex-col space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
                <label className="text-sm font-medium text-slate-700">
                  {t("paymentTiming") !== "PresentValueCalculator.paymentTiming" ? t("paymentTiming") : "Payment Timing"}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      checked={paymentTiming === "end"} 
                      onChange={() => setPaymentTiming("end")} 
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">{t("endOfPeriod") !== "PresentValueCalculator.endOfPeriod" ? t("endOfPeriod") : "End of Period"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      checked={paymentTiming === "beginning"} 
                      onChange={() => setPaymentTiming("beginning")}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">{t("beginningOfPeriod") !== "PresentValueCalculator.beginningOfPeriod" ? t("beginningOfPeriod") : "Beginning of Period"}</span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("discountRate") !== "PresentValueCalculator.discountRate" ? t("discountRate") : "Discount Rate (%)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value))}
                  className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="absolute end-3 top-2.5 text-slate-500">%</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("periods") !== "PresentValueCalculator.periods" ? t("periods") : "Number of Periods"}
              </label>
              <input
                type="number"
                value={periods}
                min={1}
                onChange={(e) => setPeriods(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 flex flex-col items-center justify-center text-center h-full">
              <span className="text-emerald-800 font-medium mb-2 uppercase tracking-wide text-sm">
                {t("totalPresentValue") !== "PresentValueCalculator.totalPresentValue" ? t("totalPresentValue") : "Total Present Value"}
              </span>
              <span className="text-5xl font-bold text-emerald-900 tracking-tight break-all">
                {formatCurrency(results.totalPV)}
              </span>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                {t("breakdown") !== "PresentValueCalculator.breakdown" ? t("breakdown") : "Value Breakdown"}
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">{t("pvFromFV") !== "PresentValueCalculator.pvFromFV" ? t("pvFromFV") : "PV of Future Value"}:</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(results.pvFromFV)}</span>
                </div>
                {periodicPayment > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">{t("pvFromPMT") !== "PresentValueCalculator.pvFromPMT" ? t("pvFromPMT") : "PV of Annuity (Payments)"}:</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(results.pvFromPMT)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">{t("totalFutureAmount") !== "PresentValueCalculator.totalFutureAmount" ? t("totalFutureAmount") : "Total Nominal amount"}:</span>
                  <span className="font-medium text-slate-700">{formatCurrency(futureValue + (periodicPayment * periods))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
