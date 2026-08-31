"use client";

import React, { useMemo } from "react";
import { CalculatorDef } from "../../lib/types";
import { InputGroup } from "./InputGroup";
import { ResultDisplay } from "./ResultDisplay";
import { useUrlObjectState } from "../../lib/hooks/useUrlState";

// Math logic is now dynamically imported in useEffect based on logicModule to reduce bundle size.

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

  const [values, setValues] = useUrlObjectState<Record<string, string | number>>(initialValues);
  
  const [result, setResult] = React.useState<any>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function computeResult() {
      try {
        if (calcDef.logicModule === "financial") {
          const financialModule = await import("../../lib/formulas/financial");
          if (!isMounted) return;

          if (calcDef.slug === "mortgage-calculator") {
            setResult(financialModule.calculateMortgage(values as any));
          } else if (calcDef.slug === "canadian-mortgage-calculator") {
            setResult(financialModule.calculateCanadianMortgage(values as any));
          } else {
            setResult(null);
          }
        } else {
          if (isMounted) setResult(null);
        }
      } catch (err) {
        console.error("Error computing result:", err);
      }
    }

    computeResult();

    return () => {
      isMounted = false;
    };
  }, [values, calcDef]);

  const handleChange = (id: string, value: string | number) => {
    setValues(id, value);
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
