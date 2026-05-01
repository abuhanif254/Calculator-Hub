"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

export const DebtPayoffCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("DebtPayoffCalculator");

  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(18);
  const [monthlyPayment, setMonthlyPayment] = useState(300);
  const [extraPayment, setExtraPayment] = useState(100);

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

  const calculatePayoff = (principal: number, rate: number, payment: number) => {
    let currentBalance = principal;
    const monthlyRate = rate / 100 / 12;
    let months = 0;
    let totalInterest = 0;

    if (payment <= currentBalance * monthlyRate) {
      return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
    }

    // Safety for infinite loops
    let maxIter = 1200; // max 100 years
    while (currentBalance > 0 && maxIter > 0) {
      const interestCharge = currentBalance * monthlyRate;
      totalInterest += interestCharge;
      let principalPaid = payment - interestCharge;

      if (principalPaid > currentBalance) {
        principalPaid = currentBalance;
      }
      currentBalance -= principalPaid;
      months++;
      maxIter--;
    }

    return { 
      months: maxIter === 0 ? Infinity : months, 
      totalInterest, 
      totalPaid: principal + totalInterest 
    };
  };

  const results = useMemo(() => {
    const principal = loanAmount > 0 ? loanAmount : 0;
    const rate = interestRate > 0 ? interestRate : 0;
    const standardPayment = monthlyPayment > 0 ? monthlyPayment : 0;
    const additional = extraPayment > 0 ? extraPayment : 0;

    const basePayoff = calculatePayoff(principal, rate, standardPayment);
    const extraPayoff = calculatePayoff(principal, rate, standardPayment + additional);

    return {
      base: basePayoff,
      extra: extraPayoff,
      willIncrease: basePayoff.months === Infinity,
      interestSaved: basePayoff.totalInterest !== Infinity && extraPayoff.totalInterest !== Infinity 
        ? Math.max(0, basePayoff.totalInterest - extraPayoff.totalInterest)
        : 0,
    };
  }, [loanAmount, interestRate, monthlyPayment, extraPayment]);

  const formatTime = (months: number) => {
    if (months === Infinity) return "Never";
    const years = Math.floor(months / 12);
    const m = months % 12;
    if (years === 0) return `${m} ${t("monthsLabel")}`;
    if (m === 0) return `${years} ${t("yearsLabel")}`;
    return `${years} ${t("yearsLabel")}, ${m} ${t("monthsLabel")}`;
  };

  return (
    <div className="flex flex-col gap-10 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "DebtPayoffCalculator.title" ? t("title") : "Debt Payoff Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "DebtPayoffCalculator.desc" ? t("desc") : "Determine how long it will take to pay off your debt and how much interest you will pay."}
          </p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("loanAmount") !== "DebtPayoffCalculator.loanAmount" ? t("loanAmount") : "Current Debt Balance"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  value={loanAmount}
                  min={0}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("interestRate") !== "DebtPayoffCalculator.interestRate" ? t("interestRate") : "Interest Rate (APR %)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
                <span className="absolute end-3 top-2.5 text-slate-500">%</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                {t("monthlyPayment") !== "DebtPayoffCalculator.monthlyPayment" ? t("monthlyPayment") : "Expected Monthly Payment"}
              </label>
              <div className="relative">
                <span className="absolute start-3 top-2.5 text-slate-500">{cSym}</span>
                <input
                  type="number"
                  min={0}
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>
            
            <div className="flex flex-col space-y-1.5 p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
              <label className="text-sm font-medium text-emerald-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                {t("extraPayment") !== "DebtPayoffCalculator.extraPayment" ? t("extraPayment") : "Extra Monthly Payment"}
              </label>
              <div className="relative mt-2">
                <span className="absolute start-3 top-2.5 text-emerald-800">{cSym}</span>
                <input
                  type="number"
                  min={0}
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full ps-8 pe-3 py-2 bg-white border border-emerald-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-900"
                />
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-6">
            {results.willIncrease && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium flex items-start gap-3">
                 <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                 <p>{t("warningMinPayment") !== "DebtPayoffCalculator.warningMinPayment" ? t("warningMinPayment") : "Warning: The payment amount is lower than the interest charge. Debt will increase."}</p>
              </div>
            )}
          
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <span className="text-rose-800 font-medium mb-2 uppercase tracking-wide text-sm">
                {t("payoffTimeTitle") !== "DebtPayoffCalculator.payoffTimeTitle" ? t("payoffTimeTitle") : "Time to Payoff"}
              </span>
              <span className="text-4xl font-bold text-rose-900 tracking-tight">
                {extraPayment > 0 && results.extra.months !== Infinity ? formatTime(results.extra.months) : formatTime(results.base.months)}
              </span>
              {(extraPayment > 0 && results.base.months !== Infinity && results.extra.months !== Infinity && results.base.months > results.extra.months) && (
                  <span className="text-xs bg-rose-200 text-rose-800 px-2 py-1 rounded mt-3">
                     Without extra payment: {formatTime(results.base.months)}
                  </span>
              )}
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex-1">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                {t("breakdown") !== "DebtPayoffCalculator.breakdown" ? t("breakdown") : "Payment Breakdown"}
              </h3>
              
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{t("totalInterestPaid") !== "DebtPayoffCalculator.totalInterestPaid" ? t("totalInterestPaid") : "Total Interest Paid"}:</span>
                  <span className="font-semibold text-rose-600">
                    {extraPayment > 0 && results.extra.totalInterest !== Infinity ? formatCurrency(results.extra.totalInterest) : results.base.totalInterest !== Infinity ? formatCurrency(results.base.totalInterest) : "∞"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{t("totalPaid") !== "DebtPayoffCalculator.totalPaid" ? t("totalPaid") : "Total Amount Paid"}:</span>
                  <span className="font-bold text-slate-900">
                    {extraPayment > 0 && results.extra.totalPaid !== Infinity ? formatCurrency(results.extra.totalPaid) : results.base.totalPaid !== Infinity ? formatCurrency(results.base.totalPaid) : "∞"}
                  </span>
                </div>

                {extraPayment > 0 && results.interestSaved > 0 && (
                    <div className="mt-2 p-3 bg-emerald-50 rounded border border-emerald-100 flex justify-between items-center text-sm">
                        <span className="text-emerald-800 font-medium">{t("interestSavings") !== "DebtPayoffCalculator.interestSavings" ? t("interestSavings") : "Interest Savings (with extra payment):"}</span>
                        <span className="font-bold text-emerald-700">{formatCurrency(results.interestSaved)}</span>
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
