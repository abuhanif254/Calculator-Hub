"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { InputGroup } from "./InputGroup";
import { ResultDisplay } from "./ResultDisplay";

// This simulates the dynamic import of our math logic.
// In a real 200+ calculator app, we would use next/dynamic or an async import map here
// rather than statically bundling all formulas.
import { calculateMortgage, calculateCanadianMortgage } from "../../lib/formulas/financial";

interface CalculatorProps {
  calcDef: CalculatorDef;
}

export const Calculator: React.FC<CalculatorProps> = ({ calcDef }) => {
  const initialValues = useMemo(() => {
    const vals: Record<string, string | number> = {};
    calcDef.fields.forEach((f) => {
      vals[f.id] = f.defaultValue;
    });
    return vals;
  }, [calcDef]);

  const [values, setValues] = useState<Record<string, string | number>>(initialValues);
  const result = useMemo(() => {
    if (calcDef.logicModule === "financial") {
      if (calcDef.slug === "mortgage-calculator") {
        return calculateMortgage(values as any);
      }
      if (calcDef.slug === "canadian-mortgage-calculator") {
        return calculateCanadianMortgage(values as any);
      }
    }
    return null;
  }, [values, calcDef]);

  const handleChange = (id: string, value: string | number) => {
    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative pb-12">
      <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Inputs</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {calcDef.fields.map((field) => (
            <InputGroup 
              key={field.id} 
              field={field} 
              value={values[field.id]} 
              onChange={handleChange} 
            />
          ))}
        </form>
      </div>
      
      <div className="lg:col-span-7 lg:sticky lg:top-8 h-full min-h-[500px]">
        <ResultDisplay result={result} />
      </div>
    </div>
  );
};
