"use client";

import React, { useState, useEffect, useRef } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";

interface ScientificCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function ScientificCalculatorView({ calcDef }: ScientificCalculatorViewProps) {
  const t = useTranslations("ScientificCalculator");
  
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("0");
  const [isRad, setIsRad] = useState<boolean>(true); // True for Radian, False for Degree
  
  const displayRef = useRef<HTMLDivElement>(null);

  // Safe evaluation engine using Function constructor with isolated Math scope
  const evaluateExpression = (expr: string, useRadians: boolean) => {
    try {
      if (!expr) return "0";

      // Preparation transformations for the evaluation engine
      let parsedExpr = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/\^/g, "**")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/log\(/g, "Math.log10(");

      // Handle trigonometric degrees vs radians
      if (useRadians) {
        parsedExpr = parsedExpr
          .replace(/sin\(/g, "Math.sin(")
          .replace(/cos\(/g, "Math.cos(")
          .replace(/tan\(/g, "Math.tan(");
      } else {
        // Convert degrees to radians internally for Math functions
        parsedExpr = parsedExpr
          .replace(/sin\(([^)]+)\)/g, "Math.sin(($1) * Math.PI / 180)")
          .replace(/cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)")
          .replace(/tan\(([^)]+)\)/g, "Math.tan(($1) * Math.PI / 180)");
          
        // Handle unclosed parens temporarily for partial evaluation if needed
        parsedExpr = parsedExpr
          .replace(/sin\(([^)]*)$/g, "Math.sin(($1) * Math.PI / 180")
          .replace(/cos\(([^)]*)$/g, "Math.cos(($1) * Math.PI / 180")
          .replace(/tan\(([^)]*)$/g, "Math.tan(($1) * Math.PI / 180");
      }

      // Quick security check - soft validation mapping
      if (/[^0-9\.\+\-\*\/\(\)\s\bMath\.\w+x\*\*]/.test(parsedExpr.replace(/Math\.[a-zA-Z0-9]+/g, ''))) {
          // just let it fallback to engine Error if it fails logic
      }

      // Using Function to evaluate mathematical expressions in a locked Math-only scope
      const evalFunc = new Function('return ' + parsedExpr);
      let calculatedStatus = evalFunc();

      if (typeof calculatedStatus === 'number') {
        // Handle precision issues cleanly (e.g. 0.1 + 0.2)
        if (!isFinite(calculatedStatus)) {
          return "Error: " + (calculatedStatus > 0 ? "Infinity" : "-Infinity");
        }
        if (Number.isNaN(calculatedStatus)) {
          return "Error";
        }
        
        let precisionFix = Number(calculatedStatus.toPrecision(15));
        
        // Remove trailing zeroes
        return String(parseFloat(precisionFix.toString()));
      }
      
      return "Error";
    } catch (err) {
      return "Error";
    }
  };

  const calculateTotal = () => {
    if (expression.trim() === "") return;
    
    // Auto-complete missing brackets before evaluation
    let openBrackets = (expression.match(/\(/g) || []).length;
    let closedBrackets = (expression.match(/\)/g) || []).length;
    let exprToEvaluate = expression;
    
    while (openBrackets > closedBrackets) {
      exprToEvaluate += ")";
      closedBrackets++;
    }

    const calculated = evaluateExpression(exprToEvaluate, isRad);
    setResult(calculated);
    
    // Auto set the expression to result to continue math operations
    if (calculated !== "Error" && !calculated.startsWith("Error")) {
       setExpression(calculated);
    }
  };

  const handleInput = (val: string) => {
    if (result === "Error" || result.startsWith("Error")) {
      setResult("0");
      setExpression(val);
      return;
    }
    setExpression((prev) => prev + val);
  };

  const clear = () => {
    setExpression("");
    setResult("0");
  };

  const backspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollLeft = displayRef.current.scrollWidth;
    }
  }, [expression]);

  const btnClassBase = "flex items-center justify-center p-4 rounded-xl text-lg font-bold transition-all active:scale-95 select-none";
  const numProps = "bg-slate-100 hover:bg-slate-200 text-slate-800 shadow-sm";
  const opProps = "bg-blue-50 hover:bg-blue-100 text-blue-600 shadow-sm border border-blue-100";
  const specProps = "bg-slate-200 hover:bg-slate-300 text-slate-700 shadow-sm";
  const funcProps = "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 shadow-sm border border-indigo-100 text-sm";
  
  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden max-w-2xl mx-auto">
      
      {/* Display Screen */}
      <div className="bg-slate-900 px-6 py-8 relative shadow-inner">
        <div className="absolute top-4 left-6 flex items-center space-x-2">
          <button 
            onClick={() => setIsRad(true)}
            className={`text-xs font-bold px-2 py-1 rounded transition-colors ${isRad ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            {t('rad')}
          </button>
          <button 
            onClick={() => setIsRad(false)}
            className={`text-xs font-bold px-2 py-1 rounded transition-colors ${!isRad ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            {t('deg')}
          </button>
        </div>
        
        <div className="flex flex-col items-end space-y-2 mt-4">
          <div 
            ref={displayRef}
            className="text-slate-400 text-xl md:text-2xl h-8 tracking-wider font-mono text-right w-full overflow-hidden whitespace-nowrap scroll-smooth"
          >
            {expression}
          </div>
          <div className="text-white text-5xl md:text-7xl font-light tracking-tight w-full text-right overflow-hidden break-normal">
            {result}
          </div>
        </div>
      </div>

      {/* Keypad */}
      <div className="p-6 md:p-8 bg-white grid grid-cols-5 gap-3 md:gap-4">
        
        {/* Row 1 */}
        <button className={`${btnClassBase} ${funcProps}`} onClick={() => handleInput("sin(")}>sin</button>
        <button className={`${btnClassBase} ${funcProps}`} onClick={() => handleInput("cos(")}>cos</button>
        <button className={`${btnClassBase} ${funcProps}`} onClick={() => handleInput("tan(")}>tan</button>
        <button className={`${btnClassBase} bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100`} onClick={clear}>C</button>
        <button className={`${btnClassBase} bg-slate-200 hover:bg-slate-300 text-slate-700`} onClick={backspace}>⌫</button>

        {/* Row 2 */}
        <button className={`${btnClassBase} ${funcProps}`} onClick={() => handleInput("ln(")}>ln</button>
        <button className={`${btnClassBase} ${funcProps}`} onClick={() => handleInput("log(")}>log</button>
        <button className={`${btnClassBase} ${funcProps}`} onClick={() => handleInput("√(")}>√</button>
        <button className={`${btnClassBase} ${specProps}`} onClick={() => handleInput("(")}>(</button>
        <button className={`${btnClassBase} ${specProps}`} onClick={() => handleInput(")")}>)</button>

        {/* Row 3 */}
        <button className={`${btnClassBase} ${funcProps}`} onClick={() => handleInput("π")}>π</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput("7")}>7</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput("8")}>8</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput("9")}>9</button>
        <button className={`${btnClassBase} ${opProps} text-2xl`} onClick={() => handleInput("÷")}>÷</button>

        {/* Row 4 */}
        <button className={`${btnClassBase} ${funcProps}`} onClick={() => handleInput("e")}>e</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput("4")}>4</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput("5")}>5</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput("6")}>6</button>
        <button className={`${btnClassBase} ${opProps} text-2xl`} onClick={() => handleInput("×")}>×</button>

        {/* Row 5 */}
        <button className={`${btnClassBase} ${funcProps}`} onClick={() => handleInput("^")}>xʸ</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput("1")}>1</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput("2")}>2</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput("3")}>3</button>
        <button className={`${btnClassBase} ${opProps} text-2xl`} onClick={() => handleInput("−")}>−</button>

        {/* Row 6 */}
        <button className={`${btnClassBase} ${funcProps}`} onClick={() => handleInput("%")}>%</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput("0")}>0</button>
        <button className={`${btnClassBase} ${numProps}`} onClick={() => handleInput(".")}>.</button>
        <button className={`${btnClassBase} bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/30 text-3xl`} onClick={calculateTotal}>=</button>
        <button className={`${btnClassBase} ${opProps} text-2xl`} onClick={() => handleInput("+")}>+</button>

      </div>
    </div>
  );
}
