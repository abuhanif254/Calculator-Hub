"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";

interface FractionCalculatorViewProps {
  calcDef: CalculatorDef;
}

// Math Helpers for Fractions
const getGCD = (a: number, b: number): number => {
  if (b === 0) return a;
  return getGCD(b, a % b);
};

export function FractionCalculatorView({ calcDef }: FractionCalculatorViewProps) {
  const t = useTranslations("FractionCalculator");
  
  // Fraction 1 state
  const [w1, setW1] = useState<string>("");
  const [n1, setN1] = useState<string>("");
  const [d1, setD1] = useState<string>("");
  
  // Operator
  const [operator, setOperator] = useState<"+" | "-" | "*" | "/">("+");

  // Fraction 2 state
  const [w2, setW2] = useState<string>("");
  const [n2, setN2] = useState<string>("");
  const [d2, setD2] = useState<string>("");

  const [result, setResult] = useState<{
    w: number;
    n: number;
    d: number;
    dec: number;
    isImproper: boolean;
    n_imp: number;
    d_imp: number;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState("");

  const calculate = () => {
    setErrorMsg("");
    
    // Parse inputs, defaulting empty strings to 0
    let whole1 = parseInt(w1) || 0;
    let num1 = parseInt(n1) || 0;
    let den1 = parseInt(d1) || 1; // Default to 1 to avoid division by zero early
    if (d1 === "") den1 = 1;

    let whole2 = parseInt(w2) || 0;
    let num2 = parseInt(n2) || 0;
    let den2 = parseInt(d2) || 1;
    if (d2 === "") den2 = 1;

    if (d1 === "0" || d2 === "0") {
      setErrorMsg(t("errorMessage"));
      setResult(null);
      return;
    }

    // Convert everything to proper improper fractions for calculation
    // Note: handling negative wholes requires pushing the negative into the numerator
    const sign1 = whole1 < 0 ? -1 : 1;
    const sign2 = whole2 < 0 ? -1 : 1;

    // F1 Improper
    let imp_n1 = (Math.abs(whole1) * den1 + num1) * sign1;
    let imp_d1 = den1;

    // F2 Improper
    let imp_n2 = (Math.abs(whole2) * den2 + num2) * sign2;
    let imp_d2 = den2;

    let res_n = 0;
    let res_d = 1;

    if (operator === "+") {
      res_n = (imp_n1 * imp_d2) + (imp_n2 * imp_d1);
      res_d = imp_d1 * imp_d2;
    } else if (operator === "-") {
      res_n = (imp_n1 * imp_d2) - (imp_n2 * imp_d1);
      res_d = imp_d1 * imp_d2;
    } else if (operator === "*") {
      res_n = imp_n1 * imp_n2;
      res_d = imp_d1 * imp_d2;
    } else if (operator === "/") {
      if (imp_n2 === 0) {
        setErrorMsg(t("errorMessage"));
        setResult(null);
        return;
      }
      res_n = imp_n1 * imp_d2;
      res_d = imp_d1 * imp_n2;
    }

    // Fix double negatives
    if (res_d < 0) {
      res_n = res_n * -1;
      res_d = res_d * -1;
    }

    // Simplify the improper fraction result
    const gcd = Math.abs(getGCD(res_n, res_d));
    res_n = res_n / gcd;
    res_d = res_d / gcd;

    // Convert back to mixed number if necessary
    let res_w = 0;
    let fin_n = res_n;
    
    // Check if it's heavy
    const isImproper = Math.abs(res_n) >= res_d && res_d !== 1;
    
    if (Math.abs(res_n) >= res_d) {
      res_w = Math.trunc(res_n / res_d);
      fin_n = Math.abs(res_n % res_d);
    }
    
    // Decimal
    const decimal = res_n / res_d;

    setResult({
      w: res_w,
      n: fin_n,
      d: res_d,
      dec: decimal,
      isImproper: isImproper,
      n_imp: res_n,
      d_imp: res_d
    });
  };

  const renderFractionInput = (
    wLabel: string, 
    nLabel: string, 
    dLabel: string,
    wSet: any, wVal: string,
    nSet: any, nVal: string,
    dSet: any, dVal: string
  ) => {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex flex-col">
          <label className="text-xs text-slate-500 font-semibold mb-1 ml-1 uppercase">{wLabel}</label>
          <input 
            type="number" 
            value={wVal}
            onChange={(e) => wSet(e.target.value)}
            className="w-20 md:w-24 h-24 text-center text-2xl font-bold bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-800"
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col relative">
            <label className="absolute -top-5 left-1 text-xs text-slate-500 font-semibold uppercase">{nLabel}</label>
            <input 
              type="number" 
              value={nVal}
              onChange={(e) => nSet(e.target.value)}
              className="w-16 md:w-20 h-11 text-center text-xl font-bold bg-white border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-800"
              style={{ padding: 0 }}
            />
          </div>
          <div className="w-full h-1 bg-slate-300 rounded-full my-[1px]"></div>
          <div className="flex flex-col relative">
            <input 
              type="number" 
              value={dVal}
              onChange={(e) => dSet(e.target.value)}
              className="w-16 md:w-20 h-11 text-center text-xl font-bold bg-white border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-800"
              style={{ padding: 0 }}
            />
            <label className="absolute -bottom-5 left-1 text-xs text-slate-500 font-semibold uppercase">{dLabel}</label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 flex flex-col space-y-10">

        {/* Inputs Area */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 pt-4 pb-4">
          
          {/* Fraction 1 */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center shadow-sm">
             {renderFractionInput(t('whole'), t('numerator'), t('denominator'), setW1, w1, setN1, n1, setD1, d1)}
          </div>

          {/* Operator Selector */}
          <div className="flex flex-row lg:flex-col gap-2">
             <button onClick={() => setOperator('+')} className={`w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl text-2xl font-black transition-all ${operator === '+' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-4 ring-blue-500/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>+</button>
             <button onClick={() => setOperator('-')} className={`w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl text-3xl font-black transition-all ${operator === '-' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-4 ring-blue-500/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>−</button>
             <button onClick={() => setOperator('*')} className={`w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl text-2xl font-black transition-all ${operator === '*' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-4 ring-blue-500/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>×</button>
             <button onClick={() => setOperator('/')} className={`w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl text-2xl font-black transition-all ${operator === '/' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-4 ring-blue-500/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>÷</button>
          </div>

          {/* Fraction 2 */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center shadow-sm">
            {renderFractionInput(t('whole'), t('numerator'), t('denominator'), setW2, w2, setN2, n2, setD2, d2)}
          </div>

        </div>

        <div className="flex flex-col gap-4 max-w-lg mx-auto w-full">
          {errorMsg && (
            <div className="bg-rose-50 text-rose-600 px-4 py-3 rounded-lg text-center font-medium border border-rose-100">
               {errorMsg}
            </div>
          )}
          <button 
            onClick={calculate} 
            className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1"
          >
            {t("calculate")}
          </button>
        </div>

        {/* Results Area */}
        {result && (
          <div className="mt-6 border-t border-slate-100 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center justify-center space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t("result")}</h3>
              
              <div className="flex items-center gap-6 p-6 md:p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
                
                {/* Result Display */}
                <div className="flex items-center gap-3">
                  {result.w !== 0 && (
                    <span className="text-6xl md:text-7xl font-extrabold text-blue-900">{result.w}</span>
                  )}
                  {result.n !== 0 && (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-3xl md:text-4xl font-bold text-blue-700 leading-none">{result.n}</span>
                      <div className="w-full h-1.5 bg-blue-300 rounded-full my-1"></div>
                      <span className="text-3xl md:text-4xl font-bold text-blue-700 leading-none">{result.d}</span>
                    </div>
                  )}
                  {result.w === 0 && result.n === 0 && (
                    <span className="text-6xl md:text-7xl font-extrabold text-blue-900">0</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl text-center">
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2">{t("decimalEquivalent")}</div>
                    <div className="text-2xl font-mono font-bold text-slate-800">{result.dec.toLocaleString(undefined, { maximumFractionDigits: 6 })}</div>
                 </div>
                 
                 {result.isImproper && (
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                      <div className="text-xs font-semibold text-slate-500 uppercase mb-2">{t("improperFraction")}</div>
                      <div className="flex flex-col items-center">
                          <span className="text-xl font-bold text-slate-700 leading-none">{result.n_imp}</span>
                          <div className="w-8 h-0.5 bg-slate-400 my-0.5"></div>
                          <span className="text-xl font-bold text-slate-700 leading-none">{result.d_imp}</span>
                      </div>
                   </div>
                 )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
