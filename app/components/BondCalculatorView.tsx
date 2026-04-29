"use client";

import React, { useState, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

export const BondCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const { currency, locale } = useSettings();
  const t = useTranslations("BondCalculator");

  const [solveFor, setSolveFor] = useState<"price" | "ytm">("price");
  const [faceValue, setFaceValue] = useState(1000);
  const [couponRate, setCouponRate] = useState(5);
  const [yearsToMaturity, setYearsToMaturity] = useState(10);
  const [frequency, setFrequency] = useState(2); // 1 = Annual, 2 = Semi, 4 = Quarter, 12 = Monthly
  const [ytmInput, setYtmInput] = useState(6);
  const [marketPrice, setMarketPrice] = useState(900);

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
    const C = (faceValue * (couponRate / 100)) / frequency;
    const n = yearsToMaturity * frequency;
    let computedPrice = marketPrice;
    let computedYTM = ytmInput;

    if (solveFor === "price") {
      const r = (ytmInput / 100) / frequency;
      if (r === 0) {
        computedPrice = C * n + faceValue;
      } else {
        computedPrice = C * ((1 - Math.pow(1 + r, -n)) / r) + faceValue / Math.pow(1 + r, n);
      }
    } else {
      // Bisection to find YTM
      let low = 0.000001;
      let high = 2.0;

      const getPriceByYtm = (ytmPeriod: number) => {
        return C * ((1 - Math.pow(1 + ytmPeriod, -n)) / ytmPeriod) + faceValue / Math.pow(1 + ytmPeriod, n);
      };

      for (let i = 0; i < 100; i++) {
        const mid = (low + high) / 2;
        const midPrice = getPriceByYtm(mid / frequency);
        if (Math.abs(midPrice - marketPrice) < 0.0001) {
          low = mid;
          high = mid;
          break;
        }
        if (midPrice > marketPrice) {
          low = mid;
        } else {
          high = mid;
        }
      }
      computedYTM = ((low + high) / 2) * 100;
    }

    const currentYield = computedPrice > 0 ? ((faceValue * (couponRate / 100)) / computedPrice) * 100 : 0;
    const annualCouponPayment = faceValue * (couponRate / 100);

    return {
      price: computedPrice,
      ytm: computedYTM,
      currentYield,
      annualCouponPayment,
    };
  }, [solveFor, faceValue, couponRate, yearsToMaturity, frequency, ytmInput, marketPrice]);

  return (
    <div className="flex flex-col gap-12 pb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t("title") !== "BondCalculator.title" ? t("title") : "Bond Calculator"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t("desc") !== "BondCalculator.desc" ? t("desc") : "Calculate Bond Price, Current Yield, and Yield to Maturity."}
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("ytmOrPrice") !== "BondCalculator.ytmOrPrice" ? t("ytmOrPrice") : "Solve For"}
              </label>
              <select
                value={solveFor}
                onChange={(e) => setSolveFor(e.target.value as "price" | "ytm")}
                className="w-48 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="price">{t("solveForPrice") !== "BondCalculator.solveForPrice" ? t("solveForPrice") : "Bond Price"}</option>
                <option value="ytm">{t("solveForYtm") !== "BondCalculator.solveForYtm" ? t("solveForYtm") : "Yield to Maturity"}</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("faceValue") !== "BondCalculator.faceValue" ? t("faceValue") : "Face Value"}
              </label>
              <div className="relative w-48">
                <span className="absolute start-3 top-2 text-slate-500 font-medium">{cSym}</span>
                <input
                  type="number"
                  value={faceValue}
                  onChange={(e) => setFaceValue(Number(e.target.value))}
                  className="w-full ps-7 pe-3 py-2 border border-slate-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("couponRate") !== "BondCalculator.couponRate" ? t("couponRate") : "Coupon Rate (%)"}
              </label>
              <div className="relative w-48">
                <input
                  type="number"
                  step="0.1"
                  value={couponRate}
                  onChange={(e) => setCouponRate(Number(e.target.value))}
                  className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-md shadow-sm"
                />
                <span className="absolute end-3 top-2 text-slate-500">%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("yearsToMaturity") !== "BondCalculator.yearsToMaturity" ? t("yearsToMaturity") : "Years to Maturity"}
              </label>
              <div className="relative w-48">
                <input
                  type="number"
                  value={yearsToMaturity}
                  onChange={(e) => setYearsToMaturity(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                {t("paymentFrequency") !== "BondCalculator.paymentFrequency" ? t("paymentFrequency") : "Payment Frequency"}
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-48 px-3 py-2 border border-slate-300 rounded-md shadow-sm"
              >
                <option value={1}>{t("annual") !== "BondCalculator.annual" ? t("annual") : "Annual"}</option>
                <option value={2}>{t("semiAnnual") !== "BondCalculator.semiAnnual" ? t("semiAnnual") : "Semi-Annual"}</option>
                <option value={4}>{t("quarterly") !== "BondCalculator.quarterly" ? t("quarterly") : "Quarterly"}</option>
                <option value={12}>{t("monthly") !== "BondCalculator.monthly" ? t("monthly") : "Monthly"}</option>
              </select>
            </div>

            {solveFor === "price" ? (
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  {t("yieldToMaturityInput") !== "BondCalculator.yieldToMaturityInput" ? t("yieldToMaturityInput") : "Yield to Maturity (%)"}
                </label>
                <div className="relative w-48">
                  <input
                    type="number"
                    step="0.1"
                    value={ytmInput}
                    onChange={(e) => setYtmInput(Number(e.target.value))}
                    className="w-full pe-8 ps-3 py-2 border border-slate-300 rounded-md shadow-sm"
                  />
                  <span className="absolute end-3 top-2 text-slate-500">%</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  {t("marketPrice") !== "BondCalculator.marketPrice" ? t("marketPrice") : "Current Market Price"}
                </label>
                <div className="relative w-48">
                  <span className="absolute start-3 top-2 text-slate-500 font-medium">{cSym}</span>
                  <input
                    type="number"
                    value={marketPrice}
                    onChange={(e) => setMarketPrice(Number(e.target.value))}
                    className="w-full ps-7 pe-3 py-2 border border-slate-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-6 flex flex-col justify-center">
            {solveFor === "price" ? (
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 font-medium">
                  {t("calculatedPrice") !== "BondCalculator.calculatedPrice" ? t("calculatedPrice") : "Calculated Bond Price"}
                </span>
                <span className="text-2xl font-bold text-slate-900">{formatCurrency(results.price)}</span>
              </div>
            ) : (
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 font-medium">
                  {t("calculatedYTM") !== "BondCalculator.calculatedYTM" ? t("calculatedYTM") : "Yield to Maturity"}
                </span>
                <span className="text-2xl font-bold text-slate-900">{results.ytm.toFixed(3)}%</span>
              </div>
            )}

            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600 font-medium">
                {t("currentYield") !== "BondCalculator.currentYield" ? t("currentYield") : "Current Yield"}
              </span>
              <span className="text-lg font-bold text-slate-900">{results.currentYield.toFixed(3)}%</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">
                {t("annualCouponPayment") !== "BondCalculator.annualCouponPayment" ? t("annualCouponPayment") : "Annual Coupon Payment"}
              </span>
              <span className="text-lg font-bold text-slate-900">{formatCurrency(results.annualCouponPayment)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
