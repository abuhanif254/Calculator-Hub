"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";

interface ScientificNotationCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function ScientificNotationCalculatorView({ calcDef }: ScientificNotationCalculatorViewProps) {
  const [activeTab, setActiveTab] = useState<'convert' | 'math'>('convert');

  // Convert state
  const [convertInput, setConvertInput] = useState<string>('');
  const [convertResult, setConvertResult] = useState<{ scientific: string; e_notation: string; decimal: string; error?: string } | null>(null);

  // Math state
  const [num1, setNum1] = useState<string>('');
  const [op, setOp] = useState<string>('+');
  const [num2, setNum2] = useState<string>('');
  const [mathResult, setMathResult] = useState<{ scientific: string; decimal: string; error?: string } | null>(null);

  const handleConvert = () => {
    if (!convertInput.trim()) {
      setConvertResult(null);
      return;
    }
    try {
      const val = Number(convertInput);
      if (isNaN(val)) {
        setConvertResult({ error: "Invalid number format", scientific: "", e_notation: "", decimal: "" });
        return;
      }
      
      const eNotation = val.toExponential();
      const [significand, exponent] = eNotation.split('e');
      
      let sciNotation = "";
      if (exponent === undefined) {
         sciNotation = val.toString();
      } else {
         sciNotation = `${significand} × 10^${exponent.replace('+', '')}`;
      }
      
      // Try to get a proper decimal string avoiding scientific notation if possible
      let decString = "";
      try {
        decString = BigInt(val).toString(); // For large integers
      } catch {
        // For floats or non-integers, use normal formatting or simple fixed
        decString = val.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 20 });
      }

      setConvertResult({
        scientific: sciNotation,
        e_notation: eNotation.replace('+', ''),
        decimal: decString
      });
    } catch {
      setConvertResult({ error: "Calculation error", scientific: "", e_notation: "", decimal: "" });
    }
  };

  const handleMath = () => {
    if (!num1.trim() || !num2.trim()) return;
    try {
      const val1 = Number(num1);
      const val2 = Number(num2);
      if (isNaN(val1) || isNaN(val2)) {
         setMathResult({ error: "Invalid number inputs", scientific: "", decimal: "" });
         return;
      }

      let res = 0;
      switch(op) {
        case '+': res = val1 + val2; break;
        case '-': res = val1 - val2; break;
        case '*': res = val1 * val2; break;
        case '/': 
          if(val2 === 0) {
            setMathResult({ error: "Division by zero", scientific: "", decimal: "" });
            return;
          }
          res = val1 / val2; 
          break;
      }

      const eNotation = res.toExponential();
      const parts = eNotation.split('e');
      let sciNotation = "";
      if (parts.length === 2) {
         sciNotation = `${parts[0]} × 10^${parts[1].replace('+', '')}`;
      } else {
         sciNotation = res.toString();
      }

      let decString = "";
      try { decString = res.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 20 }) } 
      catch { decString = res.toString(); }

      setMathResult({
        scientific: sciNotation,
        decimal: decString
      });
    } catch {
      setMathResult({ error: "Calculation error", scientific: "", decimal: "" });
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{calcDef.title}</h2>
        <p className="text-slate-600">{calcDef.description}</p>
      </div>

      <div className="border-b border-slate-200 flex">
        <button 
          onClick={() => setActiveTab('convert')}
          className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${activeTab === 'convert' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-slate-50 text-slate-500 hover:text-slate-700'}`}
        >
          Converter
        </button>
        <button 
          onClick={() => setActiveTab('math')}
          className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${activeTab === 'math' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-slate-50 text-slate-500 hover:text-slate-700'}`}
        >
          Math Operations
        </button>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === 'convert' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Enter Number (Decimal or Scientific)</label>
              <input 
                type="text" 
                value={convertInput} 
                onChange={e => setConvertInput(e.target.value)}
                placeholder="e.g. 12345 or 1.2345e4"
                className="w-full h-14 bg-slate-50 border-slate-200 border rounded-xl px-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-slate-500">Supports standard numbers or e-notation.</p>
            </div>

            <button 
              onClick={handleConvert} 
              className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-colors"
            >
              Convert
            </button>

            {convertResult && (
              <div className="mt-8 bg-blue-50/50 rounded-2xl p-6 border border-blue-100 space-y-4">
                {convertResult.error ? (
                  <div className="text-red-500 font-medium">{convertResult.error}</div>
                ) : (
                  <>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">Scientific Notation</div>
                      <div className="text-2xl font-bold text-slate-800">{convertResult.scientific}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">E-Notation</div>
                      <div className="text-lg font-medium text-slate-700">{convertResult.e_notation}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">Decimal Number</div>
                      <div className="text-lg font-medium text-slate-700 break-all">{convertResult.decimal}</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'math' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-1">
                <label className="block text-sm font-semibold text-slate-700">Number 1</label>
                <input 
                  type="text" 
                  value={num1} 
                  onChange={e => setNum1(e.target.value)}
                  placeholder="e.g. 5e4"
                  className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Operator</label>
                <select 
                  value={op} 
                  onChange={e => setOp(e.target.value)}
                  className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="+">Add (+)</option>
                  <option value="-">Subtract (-)</option>
                  <option value="*">Multiply (×)</option>
                  <option value="/">Divide (÷)</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-1">
                <label className="block text-sm font-semibold text-slate-700">Number 2</label>
                <input 
                  type="text" 
                  value={num2} 
                  onChange={e => setNum2(e.target.value)}
                  placeholder="e.g. 2e3"
                  className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <button 
              onClick={handleMath} 
              className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-colors"
            >
              Calculate
            </button>

            {mathResult && (
              <div className="mt-8 bg-blue-50/50 rounded-2xl p-6 border border-blue-100 space-y-4">
                {mathResult.error ? (
                  <div className="text-red-500 font-medium">{mathResult.error}</div>
                ) : (
                  <>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">Result (Scientific)</div>
                      <div className="text-2xl font-bold text-slate-800">{mathResult.scientific}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">Result (Decimal)</div>
                      <div className="text-lg font-medium text-slate-700 break-all">{mathResult.decimal}</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
